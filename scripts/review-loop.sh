#!/usr/bin/env bash
# Review-loop: run a saved Claude prompt by task name with guardrails.
# Optionally invokes Codex as a secondary reviewer when the task config enables it.
#
# Usage:
#   scripts/review-loop.sh <task-name>
#   scripts/review-loop.sh <task-name> --codex-report-out <file>
#     (auto-loop uses --codex-report-out to learn where the Codex report was saved)
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TASKS_FILE="$REPO_ROOT/review-tasks.json"
REPORTS_DIR="$REPO_ROOT/reports"

# ── argument parsing ───────────────────────────────────────────────────────────

TASK_NAME=""
CODEX_REPORT_OUT_FILE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --codex-report-out)
      CODEX_REPORT_OUT_FILE="$2"; shift 2 ;;
    -*)
      echo "Unknown option: $1" >&2; exit 1 ;;
    *)
      if [ -z "$TASK_NAME" ]; then TASK_NAME="$1"; else
        echo "Unexpected argument: $1" >&2; exit 1
      fi
      shift ;;
  esac
done

if [ -z "$TASK_NAME" ]; then
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
codex_cfg = task.get('codex', {})
out = {
    'prompt_file':        task['prompt_file'],
    'mode':               task['mode'],
    'allow_constitution': task.get('allow_constitution', False),
    'allow_p063':         task.get('allow_p063', False),
    'allowed_changes':    task.get('allowed_changes', []),
    'validation':         task.get('validation', []),
    'description':        task.get('description', ''),
    'protected_files':    config.get('protected_files', []),
    'auto_commit':        task.get('auto_commit', False),
    'commit_message':     task.get('commit_message', ''),
    'codex_enabled':      codex_cfg.get('enabled', False),
    'codex_prompt':       codex_cfg.get('prompt', ''),
    'codex_mode':         codex_cfg.get('mode', 'review'),
    'codex_target':       codex_cfg.get('target', 'own_report'),
}
print(json.dumps(out))
")"

PROMPT_FILE_REL="$(echo "$TASK_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['prompt_file'])")"
TASK_MODE="$(echo "$TASK_JSON"       | python3 -c "import json,sys; print(json.load(sys.stdin)['mode'])")"
TASK_DESC="$(echo "$TASK_JSON"       | python3 -c "import json,sys; print(json.load(sys.stdin)['description'])")"
CODEX_ENABLED="$(echo "$TASK_JSON"   | python3 -c "import json,sys; print('1' if json.load(sys.stdin)['codex_enabled'] else '0')")"
CODEX_PROMPT_REL="$(echo "$TASK_JSON"| python3 -c "import json,sys; print(json.load(sys.stdin)['codex_prompt'])")"
CODEX_TARGET="$(echo "$TASK_JSON"    | python3 -c "import json,sys; print(json.load(sys.stdin)['codex_target'])")"
PROMPT_FILE="$REPO_ROOT/$PROMPT_FILE_REL"

if [ ! -f "$PROMPT_FILE" ]; then
  echo "ERROR: prompt file not found: $PROMPT_FILE" >&2
  exit 1
fi

# ── Codex availability check (fail early if task requires it) ──────────────────

if [ "$CODEX_ENABLED" = "1" ]; then
  if ! command -v codex &>/dev/null; then
    echo ""
    echo "HOLD: task '$TASK_NAME' requires Codex but 'codex' is not on PATH."
    echo "      Install the Codex CLI: https://github.com/openai/codex"
    echo "      Re-run after installation and authentication."
    exit 2
  fi
  CODEX_PROMPT_FILE="$REPO_ROOT/$CODEX_PROMPT_REL"
  if [ ! -f "$CODEX_PROMPT_FILE" ]; then
    echo "ERROR: Codex prompt file not found: $CODEX_PROMPT_FILE" >&2
    exit 1
  fi
fi

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
REPORT_FILE="$REPORTS_DIR/${TASK_NAME}_${TIMESTAMP}.md"
CODEX_REPORT_FILE="$REPORTS_DIR/${TASK_NAME}_${TIMESTAMP}-codex.md"

echo "=== review-loop: $TASK_NAME ==="
echo "Mode:   $TASK_MODE"
echo "Prompt: $PROMPT_FILE_REL"
echo "Report: $REPORT_FILE"
[ "$CODEX_ENABLED" = "1" ] && echo "Codex:  enabled ($(command -v codex)), target=$CODEX_TARGET"
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

# ── detect new changes since Claude run ───────────────────────────────────────

AFTER_SNAPSHOT="$(git -C "$REPO_ROOT" diff --name-only HEAD 2>/dev/null || true)"
CHANGED_FILES="$(comm -13 \
  <(echo "$BEFORE_SNAPSHOT" | sort) \
  <(echo "$AFTER_SNAPSHOT"  | sort))"

# ── guardrail check ────────────────────────────────────────────────────────────

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

# ── determine Claude-phase verdict ────────────────────────────────────────────

FINAL_VERDICT="PASS"
[ -n "$GUARDRAIL_VIOLATIONS" ] && FINAL_VERDICT="FAIL"
[ "$FINAL_VERDICT" = "PASS" ] && [ "$VALIDATION_VERDICT" = "HOLD" ] && FINAL_VERDICT="HOLD"

CLAUDE_VERDICT="$(echo "$CLAUDE_OUTPUT" | grep -oE '\bFAIL\b' | head -1 || true)"
[ "$CLAUDE_VERDICT" = "FAIL" ] && [ "$FINAL_VERDICT" = "PASS" ] && FINAL_VERDICT="FAIL"

# ── write primary report ───────────────────────────────────────────────────────

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

# ── optional Codex second pass ─────────────────────────────────────────────────

CODEX_VERDICT=""
CODEX_OUTPUT=""

if [ "$CODEX_ENABLED" = "1" ] && [ "$FINAL_VERDICT" != "FAIL" ]; then

  # Resolve which report Codex should synthesize
  if [ "$CODEX_TARGET" = "latest_session_report" ]; then
    # Find the latest *.md in reports/ that is:
    # - not a -codex.md secondary report
    # - not a report for the codex-synthesize-latest-report task itself
    CODEX_ACTUAL_REPORT="$(python3 -c "
import os, glob, sys

reports_dir = '$REPORTS_DIR'
pattern = os.path.join(reports_dir, '*.md')
candidates = [
    f for f in glob.glob(pattern)
    if not f.endswith('-codex.md')
    and '/codex-synthesize-latest-report_' not in f
]
if not candidates:
    print('', end='')
else:
    print(sorted(candidates, key=os.path.getmtime)[-1])
")"
    if [ -z "$CODEX_ACTUAL_REPORT" ]; then
      echo "HOLD: codex_target=latest_session_report but no qualifying report found in $REPORTS_DIR" >&2
      CODEX_ACTUAL_REPORT="$REPORT_FILE"
    fi
  else
    CODEX_ACTUAL_REPORT="$REPORT_FILE"
  fi

  echo ""
  echo "Running Codex synthesis ($(basename "$CODEX_PROMPT_REL"))..."
  echo "Codex command: codex exec [prompt with REPORT_PATH=$(basename "$CODEX_ACTUAL_REPORT")]"

  CODEX_FULL_PROMPT="TASK_NAME=$TASK_NAME
REPORT_PATH=$CODEX_ACTUAL_REPORT
REPO_ROOT=$REPO_ROOT

$(cat "$CODEX_PROMPT_FILE")"

  set +e
  CODEX_OUTPUT="$(codex exec "$CODEX_FULL_PROMPT" 2>&1)"
  CODEX_EXIT=$?
  set -e

  if [ $CODEX_EXIT -ne 0 ]; then
    CODEX_VERDICT="HOLD"
    CODEX_OUTPUT="Codex exited with code $CODEX_EXIT.

$CODEX_OUTPUT"
  else
    CODEX_VERDICT="$(echo "$CODEX_OUTPUT" | grep -oE '\bACTION: (RUN_EXISTING_TASK|CREATE_AND_RUN_TASK|SAFE_EDIT|PUSH_READY|HUMAN_DECISION_REQUIRED)\b' | head -1 | sed 's/ACTION: //' || echo "UNKNOWN")"
    [ -z "$CODEX_VERDICT" ] && CODEX_VERDICT="UNKNOWN"
  fi

  # write Codex report
  {
  printf "# Codex Synthesis Report: %s\n\n" "$TASK_NAME"
  printf "**Source report:** %s  \n" "$CODEX_ACTUAL_REPORT"
  printf "**Codex prompt:** %s  \n" "$CODEX_PROMPT_REL"
  printf "**Timestamp:** %s  \n" "$TIMESTAMP"
  printf "**Codex action:** %s\n\n" "$CODEX_VERDICT"
  printf '%s\n\n' "---"
  printf "%s\n" "$CODEX_OUTPUT"
  } > "$CODEX_REPORT_FILE"

  echo "Codex action: $CODEX_VERDICT"
  echo "Codex report: $CODEX_REPORT_FILE"

  # If caller wants the codex report path written to a file (used by auto-loop)
  if [ -n "$CODEX_REPORT_OUT_FILE" ]; then
    echo "$CODEX_REPORT_FILE" > "$CODEX_REPORT_OUT_FILE"
  fi
fi

# ── print summary ──────────────────────────────────────────────────────────────

echo ""
echo "─────────────────────────────────────────"
echo "Verdict:      $FINAL_VERDICT"
echo "Report:       $REPORT_FILE"
[ "$CODEX_ENABLED" = "1" ] && echo "Codex report: $CODEX_REPORT_FILE"
echo "─────────────────────────────────────────"

if [ -n "$GUARDRAIL_VIOLATIONS" ]; then
  echo ""
  echo "GUARDRAIL VIOLATIONS:"
  echo "$GUARDRAIL_VIOLATIONS"
fi

[ "$FINAL_VERDICT" = "FAIL" ] && exit 1 || exit 0
