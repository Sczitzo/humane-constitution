#!/usr/bin/env bash
# Review-loop: run a saved Claude prompt by task name with guardrails.
# Usage: scripts/review-loop.sh <task-name>
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TASKS_FILE="$REPO_ROOT/review-tasks.json"
REPORTS_DIR="$REPO_ROOT/reports"

# ── argument check ─────────────────────────────────────────────────────────────

if [ $# -lt 1 ]; then
  echo "Usage: scripts/review-loop.sh <task-name>" >&2
  echo "" >&2
  echo "Available tasks:" >&2
  python3 -c "
import json, sys
with open('$TASKS_FILE') as f:
    d = json.load(f)
for name, t in d['tasks'].items():
    print(f'  {name:30s}  {t[\"description\"]}')
"
  exit 1
fi

TASK_NAME="$1"

# ── load task config from JSON ─────────────────────────────────────────────────

TASK_JSON="$(python3 -c "
import json, sys
with open('$TASKS_FILE') as f:
    config = json.load(f)
name = '$TASK_NAME'
if name not in config['tasks']:
    print(f'ERROR: task not found: {name}', file=sys.stderr)
    sys.exit(1)
task = config['tasks'][name]
out = {
    'prompt_file':        task['prompt_file'],
    'mode':               task['mode'],
    'allow_constitution': task.get('allow_constitution', False),
    'allow_p063':         task.get('allow_p063', False),
    'allowed_changes':    task.get('allowed_changes', []),
    'validation':         task.get('validation', []),
    'description':        task.get('description', ''),
    'protected_files':    config.get('protected_files', []),
}
print(json.dumps(out))
")"

PROMPT_FILE_REL="$(echo "$TASK_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['prompt_file'])")"
TASK_MODE="$(echo "$TASK_JSON"       | python3 -c "import json,sys; print(json.load(sys.stdin)['mode'])")"
TASK_DESC="$(echo "$TASK_JSON"       | python3 -c "import json,sys; print(json.load(sys.stdin)['description'])")"
PROMPT_FILE="$REPO_ROOT/$PROMPT_FILE_REL"

if [ ! -f "$PROMPT_FILE" ]; then
  echo "ERROR: prompt file not found: $PROMPT_FILE" >&2
  exit 1
fi

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
REPORT_FILE="$REPORTS_DIR/${TASK_NAME}_${TIMESTAMP}.md"

echo "=== review-loop: $TASK_NAME ==="
echo "Mode:   $TASK_MODE"
echo "Prompt: $PROMPT_FILE_REL"
echo "Report: $REPORT_FILE"
echo ""

# ── snapshot tracked changed files before run ──────────────────────────────────

BEFORE_SNAPSHOT="$(git -C "$REPO_ROOT" diff --name-only HEAD 2>/dev/null || true)"

# ── run Claude ─────────────────────────────────────────────────────────────────

if ! command -v claude &>/dev/null; then
  echo "ERROR: 'claude' CLI not found. Install Claude Code." >&2
  exit 1
fi

echo "Running Claude..."
CLAUDE_OUTPUT="$(claude --print "$(cat "$PROMPT_FILE")" 2>&1)" || {
  echo "ERROR: claude invocation failed." >&2
  echo "$CLAUDE_OUTPUT" >&2
  exit 1
}

# ── detect new changes since run ──────────────────────────────────────────────

AFTER_SNAPSHOT="$(git -C "$REPO_ROOT" diff --name-only HEAD 2>/dev/null || true)"
CHANGED_FILES="$(comm -13 \
  <(echo "$BEFORE_SNAPSHOT" | sort) \
  <(echo "$AFTER_SNAPSHOT"  | sort))"

# ── guardrail check (Python reads task JSON + changed file list) ───────────────

GUARDRAIL_VIOLATIONS=""
if [ -n "$CHANGED_FILES" ]; then
  GUARDRAIL_VIOLATIONS="$(python3 -c "
import json, sys, fnmatch

config    = json.loads(sys.stdin.read())
mode      = config['mode']
protected = config['protected_files']
allowed   = config['allowed_changes']
allow_c   = config['allow_constitution']
allow_p   = config['allow_p063']
changed   = [f for f in '''$CHANGED_FILES'''.split('\n') if f]

violations = []
for rel in changed:
    if mode == 'controlled-edit' and rel in allowed:
        continue
    if rel.startswith('docs/constitution/'):
        if not allow_c:
            violations.append(f'PROTECTED (constitution): {rel}')
        continue
    if 'P-063' in rel:
        if not allow_p:
            violations.append(f'PROTECTED (P-063): {rel}')
        continue
    blocked = False
    for pat in protected:
        if pat.endswith('/') and rel.startswith(pat):
            violations.append(f'PROTECTED (global): {rel}'); blocked = True; break
        elif fnmatch.fnmatch(rel, pat) or rel == pat:
            violations.append(f'PROTECTED (global): {rel}'); blocked = True; break
    if not blocked and mode == 'read-only':
        violations.append(f'UNEXPECTED CHANGE (read-only mode): {rel}')

print('\n'.join(violations))
" <<< "$TASK_JSON")"
fi

# ── run validation commands ────────────────────────────────────────────────────

VALIDATION_RESULTS=""
VALIDATION_VERDICT="PASS"

VALIDATION_CMDS="$(echo "$TASK_JSON" | python3 -c "
import json, sys
cmds = json.load(sys.stdin)['validation']
print('\n'.join(cmds))
")"

if [ -n "$VALIDATION_CMDS" ]; then
  while IFS= read -r cmd; do
    [ -z "$cmd" ] && continue
    echo "Validation: $cmd"
    set +e
    V_OUT="$(cd "$REPO_ROOT" && eval "$cmd" 2>&1)"
    V_EXIT=$?
    set -e
    [ $V_EXIT -ne 0 ] && VALIDATION_VERDICT="HOLD"
    VALIDATION_RESULTS="${VALIDATION_RESULTS}
### \`$cmd\` (exit $V_EXIT)

\`\`\`
$V_OUT
\`\`\`
"
  done <<< "$VALIDATION_CMDS"
fi

# ── determine final verdict ────────────────────────────────────────────────────

FINAL_VERDICT="PASS"
[ -n "$GUARDRAIL_VIOLATIONS" ] && FINAL_VERDICT="FAIL"
[ "$FINAL_VERDICT" = "PASS" ] && [ "$VALIDATION_VERDICT" = "HOLD" ] && FINAL_VERDICT="HOLD"

# incorporate Claude's own verdict if it reported FAIL
CLAUDE_VERDICT="$(echo "$CLAUDE_OUTPUT" | grep -oE '\bFAIL\b' | head -1 || true)"
[ "$CLAUDE_VERDICT" = "FAIL" ] && [ "$FINAL_VERDICT" = "PASS" ] && FINAL_VERDICT="FAIL"

# ── write report ───────────────────────────────────────────────────────────────

{
printf "# Review Report: %s\n\n" "$TASK_NAME"
printf "**Task:** %s  \n" "$TASK_NAME"
printf "**Description:** %s  \n" "$TASK_DESC"
printf "**Mode:** %s  \n" "$TASK_MODE"
printf "**Timestamp:** %s  \n" "$TIMESTAMP"
printf "**Verdict:** %s\n\n" "$FINAL_VERDICT"
printf '%s\n\n' "---"
printf "## Claude Output\n\n%s\n\n" "$CLAUDE_OUTPUT"
printf '%s\n\n' "---"
printf "## Files Changed During Run\n\n"
[ -n "$CHANGED_FILES" ] && printf "%s\n\n" "$CHANGED_FILES" || printf "_None_\n\n"
printf "## Guardrail Violations\n\n"
[ -n "$GUARDRAIL_VIOLATIONS" ] && printf "%s\n\n" "$GUARDRAIL_VIOLATIONS" || printf "_None_\n\n"
printf "## Validation Results\n\n"
[ -n "$VALIDATION_RESULTS" ] && printf "%s\n\n" "$VALIDATION_RESULTS" || printf "_No validation commands configured._\n\n"
printf '%s\n\n' "---"
printf "**Final Verdict: %s**\n" "$FINAL_VERDICT"
} > "$REPORT_FILE"

# ── print summary ──────────────────────────────────────────────────────────────

echo ""
echo "─────────────────────────────────────────"
echo "Verdict: $FINAL_VERDICT"
echo "Report:  $REPORT_FILE"
echo "─────────────────────────────────────────"

if [ -n "$GUARDRAIL_VIOLATIONS" ]; then
  echo ""
  echo "GUARDRAIL VIOLATIONS:"
  echo "$GUARDRAIL_VIOLATIONS"
fi

[ "$FINAL_VERDICT" = "FAIL" ] && exit 1 || exit 0
