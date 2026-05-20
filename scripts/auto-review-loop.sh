#!/usr/bin/env bash
# Autonomous Claude + Codex collaboration loop.
# Runs a Claude task, synthesizes with Codex, and acts on Codex's structured
# recommendation — continuing automatically until a defined stop condition.
#
# Usage: scripts/auto-review-loop.sh <task-name>
#
# Stop conditions (prints HUMAN_DECISION_REQUIRED and exits 0):
#   - Codex recommends HUMAN_DECISION_REQUIRED or PUSH_READY
#   - Codex output malformed / action unknown
#   - Guardrail violation (protected file touched)
#   - Validation fails with a new error
#   - Codex unavailable when required
#   - Loop iteration limit reached
#   - Any task attempts to push, stash, reset, or hide diffs
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TASKS_FILE="$REPO_ROOT/review-tasks.json"
REPORTS_DIR="$REPO_ROOT/reports"
LOOP_SCRIPT="$REPO_ROOT/scripts/review-loop.sh"
MAX_ITERATIONS=10

# ── protected files — never touch these automatically ─────────────────────────

PROTECTED=(
  "docs/constitution/"
  "docs/governance/P-063_draft.md"
  "docs/annexes/ANNEX_D.md"
  "docs/governance/Patch_Log.md"
  "scripts/export_corpus.py"
  "app/src/generated/corpus.ts"
  "app/public/generated/corpus.json"
)

# ── helpers ───────────────────────────────────────────────────────────────────

stop() {
  local reason="$1"
  echo ""
  echo "════════════════════════════════════════════"
  echo "HUMAN_DECISION_REQUIRED"
  echo "Reason: $reason"
  echo "════════════════════════════════════════════"
  exit 0
}

log() { echo "[auto] $*"; }

task_exists() {
  python3 -c "
import json, sys
with open('$TASKS_FILE') as f:
    d = json.load(f)
sys.exit(0 if '$1' in d['tasks'] else 1)
" 2>/dev/null
}

_decision_block() {
  # Extract the action block from after ## DECISION sentinel (or last ACTION block)
  python3 -c "
import re, sys
text = open(sys.argv[1]).read()
valid = ['RUN_EXISTING_TASK','CREATE_AND_RUN_TASK','SAFE_EDIT','PUSH_READY','HUMAN_DECISION_REQUIRED']
m = re.search(r'## DECISION.*?(ACTION: (?:' + '|'.join(valid) + r').*?)(?:\Z)', text, re.DOTALL)
if m:
    print(m.group(1)); sys.exit(0)
# fallback: last ACTION block
for v in valid:
    idx = text.rfind(f'ACTION: {v}')
    if idx >= 0:
        print(text[idx:]); sys.exit(0)
print('')
" "$1" 2>/dev/null || echo ""
}

parse_action_field() {
  local report="$1" field="$2"
  python3 -c "
import sys, re
block = open('/dev/stdin').read()
fm = re.search(r'^${field}:\s*(.+)$', block, re.MULTILINE)
print(fm.group(1).strip() if fm else '')
" <<< "$(_decision_block "$report")" 2>/dev/null || echo ""
}

parse_multiline_field() {
  local report="$1" field="$2"
  python3 -c "
import sys, re
block = open('/dev/stdin').read()
fm = re.search(r'^${field}:\s*\|\n((?:  .+\n?)*)', block, re.MULTILINE)
if fm:
    lines = [l[2:] if l.startswith('  ') else l for l in fm.group(1).splitlines()]
    print('\n'.join(lines))
else:
    fm2 = re.search(r'^${field}:\s*(.+)$', block, re.MULTILINE)
    print(fm2.group(1).strip() if fm2 else '')
" <<< "$(_decision_block "$report")" 2>/dev/null || echo ""
}

parse_list_field() {
  local report="$1" field="$2"
  python3 -c "
import sys, re
block = open('/dev/stdin').read()
fm = re.search(r'^${field}:\s*\[(.+?)\]', block, re.MULTILINE | re.DOTALL)
if fm:
    inner = fm.group(1).strip()
    items = [x.strip().strip('\"\'') for x in re.split(r',\s*', inner) if x.strip()]
    for item in items:
        print(item)
" <<< "$(_decision_block "$report")" 2>/dev/null || echo ""
}

check_protected() {
  local file="$1"
  python3 -c "
import fnmatch, sys
rel = '$file'
protected = $(python3 -c "import json; p=json.load(open('$TASKS_FILE'))['protected_files']; print(repr(p))")
for pat in protected:
    if pat.endswith('/') and rel.startswith(pat):
        print('PROTECTED'); sys.exit(0)
    if fnmatch.fnmatch(rel, pat) or rel == pat:
        print('PROTECTED'); sys.exit(0)
if rel.startswith('docs/constitution/'):
    print('PROTECTED'); sys.exit(0)
if 'P-063' in rel:
    print('PROTECTED'); sys.exit(0)
print('OK')
" 2>/dev/null || echo "PROTECTED"
}

# ── main ──────────────────────────────────────────────────────────────────────

if [ $# -lt 1 ]; then
  echo "Usage: scripts/auto-review-loop.sh <task-name>" >&2
  exit 1
fi

CURRENT_TASK="$1"
ITERATION=0
ALL_REPORTS=()

echo "════════════════════════════════════════════"
echo "AUTO REVIEW LOOP: $CURRENT_TASK"
echo "Max iterations: $MAX_ITERATIONS"
echo "════════════════════════════════════════════"

if ! command -v codex &>/dev/null; then
  stop "Codex is not on PATH. Install codex CLI before running the auto loop."
fi

while [ $ITERATION -lt $MAX_ITERATIONS ]; do
  ITERATION=$((ITERATION + 1))
  log "── Iteration $ITERATION: task=$CURRENT_TASK ──"

  if ! task_exists "$CURRENT_TASK"; then
    stop "Task '$CURRENT_TASK' not found in review-tasks.json. Cannot continue."
  fi

  # ── run the Claude task via review-loop ──────────────────────────────────────
  CODEX_REPORT_PTR="$(mktemp)"

  set +e
  bash "$LOOP_SCRIPT" "$CURRENT_TASK" --codex-report-out "$CODEX_REPORT_PTR" 2>&1
  LOOP_EXIT=$?
  set -e

  if [ $LOOP_EXIT -eq 1 ]; then
    stop "Task '$CURRENT_TASK' exited FAIL (guardrail violation or Claude error). Review the report."
  fi
  if [ $LOOP_EXIT -eq 2 ]; then
    stop "Codex unavailable for task '$CURRENT_TASK'."
  fi

  # ── read the Codex report path ───────────────────────────────────────────────
  CODEX_REPORT=""
  if [ -s "$CODEX_REPORT_PTR" ]; then
    CODEX_REPORT="$(cat "$CODEX_REPORT_PTR")"
  fi
  rm -f "$CODEX_REPORT_PTR"

  if [ -z "$CODEX_REPORT" ] || [ ! -f "$CODEX_REPORT" ]; then
    # Task has no inline Codex — chain to the synthesis task to get a Codex
    # second pass on the report that was just produced.
    if task_exists "codex-synthesize-latest-report"; then
      log "No inline Codex for '$CURRENT_TASK' — chaining to codex-synthesize-latest-report"
      CODEX_REPORT_PTR2="$(mktemp)"
      set +e
      bash "$LOOP_SCRIPT" "codex-synthesize-latest-report" --codex-report-out "$CODEX_REPORT_PTR2" 2>&1
      SYNTH_EXIT=$?
      set -e
      if [ $SYNTH_EXIT -ne 0 ] && [ $SYNTH_EXIT -ne 2 ]; then
        stop "codex-synthesize-latest-report failed (exit $SYNTH_EXIT). Review the report."
      fi
      CODEX_REPORT=""
      [ -s "$CODEX_REPORT_PTR2" ] && CODEX_REPORT="$(cat "$CODEX_REPORT_PTR2")"
      rm -f "$CODEX_REPORT_PTR2"
      if [ -z "$CODEX_REPORT" ] || [ ! -f "$CODEX_REPORT" ]; then
        stop "codex-synthesize-latest-report produced no Codex report. Cannot continue."
      fi
    else
      stop "Task '$CURRENT_TASK' has no Codex integration and codex-synthesize-latest-report does not exist."
    fi
  fi

  ALL_REPORTS+=("$CODEX_REPORT")
  log "Codex report: $CODEX_REPORT"

  # ── parse Codex action ───────────────────────────────────────────────────────
  # Parse the DECISION block — look for ACTION after the ## DECISION sentinel,
  # not the first occurrence (which may be template text reproduced by the model).
  ACTION="$(python3 -c "
import re, sys
text = open('$CODEX_REPORT').read()
# Find last occurrence of ACTION: keyword to skip any echoed template
valid = ['RUN_EXISTING_TASK','CREATE_AND_RUN_TASK','SAFE_EDIT','PUSH_READY','HUMAN_DECISION_REQUIRED']
# Prefer action after ## DECISION sentinel
m = re.search(r'## DECISION.*?ACTION: (\w+)', text, re.DOTALL)
if m and m.group(1) in valid:
    print(m.group(1)); sys.exit(0)
# Fall back: last ACTION: line in file
for line in reversed(text.splitlines()):
    for v in valid:
        if f'ACTION: {v}' in line:
            print(v); sys.exit(0)
print('')
" 2>/dev/null || echo "")"

  if [ -z "$ACTION" ]; then
    stop "Codex output malformed — no ACTION line found after ## DECISION in $CODEX_REPORT."
  fi

  log "Codex action: $ACTION"

  # ── dispatch ─────────────────────────────────────────────────────────────────

  case "$ACTION" in

    HUMAN_DECISION_REQUIRED)
      REASON="$(parse_action_field "$CODEX_REPORT" "reason")"
      QUESTION="$(parse_action_field "$CODEX_REPORT" "recommended_question")"
      echo ""
      echo "════════════════════════════════════════════"
      echo "HUMAN_DECISION_REQUIRED"
      echo "Reason: $REASON"
      [ -n "$QUESTION" ] && echo "Question: $QUESTION"
      echo "Codex report: $CODEX_REPORT"
      echo "════════════════════════════════════════════"
      exit 0
      ;;

    PUSH_READY)
      HASH="$(parse_action_field "$CODEX_REPORT" "commit_hash")"
      stop "Codex recommends PUSH_READY (commit $HASH). Push is manual — confirm and run: git push origin main"
      ;;

    RUN_EXISTING_TASK)
      NEXT_TASK="$(parse_action_field "$CODEX_REPORT" "task_name")"
      REASON="$(parse_action_field "$CODEX_REPORT" "reason")"
      if [ -z "$NEXT_TASK" ]; then
        stop "Codex recommended RUN_EXISTING_TASK but did not supply task_name."
      fi
      if ! task_exists "$NEXT_TASK"; then
        stop "Codex recommended task '$NEXT_TASK' which does not exist in review-tasks.json."
      fi
      log "→ Running existing task: $NEXT_TASK ($REASON)"
      CURRENT_TASK="$NEXT_TASK"
      ;;

    CREATE_AND_RUN_TASK)
      NEXT_TASK="$(parse_action_field "$CODEX_REPORT" "task_name")"
      PROMPT_PATH="$(parse_action_field "$CODEX_REPORT" "prompt_path")"
      PROMPT_CONTENT="$(parse_multiline_field "$CODEX_REPORT" "prompt_content")"
      CONFIG_ENTRY="$(parse_multiline_field "$CODEX_REPORT" "config_entry")"
      COMMIT_MSG="$(parse_action_field "$CODEX_REPORT" "commit_message")"
      REASON="$(parse_action_field "$CODEX_REPORT" "reason")"

      if [ -z "$NEXT_TASK" ] || [ -z "$PROMPT_PATH" ] || [ -z "$PROMPT_CONTENT" ] || [ -z "$CONFIG_ENTRY" ]; then
        stop "Codex recommended CREATE_AND_RUN_TASK but output was incomplete (missing task_name, prompt_path, prompt_content, or config_entry)."
      fi

      # Validate prompt path is under prompts/
      if [[ "$PROMPT_PATH" != prompts/* ]]; then
        stop "Codex CREATE_AND_RUN_TASK: prompt_path '$PROMPT_PATH' is outside prompts/ — not allowed."
      fi

      log "→ Creating task: $NEXT_TASK ($REASON)"

      # Write prompt file
      FULL_PROMPT_PATH="$REPO_ROOT/$PROMPT_PATH"
      mkdir -p "$(dirname "$FULL_PROMPT_PATH")"
      printf "%s\n" "$PROMPT_CONTENT" > "$FULL_PROMPT_PATH"
      log "  Wrote prompt: $PROMPT_PATH"

      # Inject config entry into review-tasks.json
      python3 -c "
import json, sys, re

tasks_file = '$TASKS_FILE'
new_entry_str = '''$CONFIG_ENTRY'''
task_name = '$NEXT_TASK'

with open(tasks_file) as f:
    config = json.load(f)

if task_name in config['tasks']:
    print(f'Task {task_name} already exists — skipping config inject', file=sys.stderr)
    sys.exit(0)

# Parse new entry
try:
    new_entry = json.loads('{' + new_entry_str + '}')
except Exception as e:
    print(f'Failed to parse config_entry JSON: {e}', file=sys.stderr)
    sys.exit(1)

config['tasks'][task_name] = new_entry[task_name]
with open(tasks_file, 'w') as f:
    json.dump(config, f, indent=2)
    f.write('\n')
print(f'Injected task {task_name} into review-tasks.json')
" || stop "Failed to inject Codex-created task config into review-tasks.json."

      log "  Injected config for $NEXT_TASK"
      CURRENT_TASK="$NEXT_TASK"
      ;;

    SAFE_EDIT)
      ALLOWED_FILES_RAW="$(parse_list_field "$CODEX_REPORT" "allowed_files")"
      EDIT_DESC="$(parse_action_field "$CODEX_REPORT" "edit_description")"
      VALIDATION_CMDS_RAW="$(parse_list_field "$CODEX_REPORT" "validation_commands")"
      COMMIT_MSG="$(parse_action_field "$CODEX_REPORT" "commit_message")"
      REASON="$(parse_action_field "$CODEX_REPORT" "reason")"

      if [ -z "$ALLOWED_FILES_RAW" ]; then
        stop "Codex recommended SAFE_EDIT but allowed_files is empty."
      fi

      # Check every proposed file against protected list
      while IFS= read -r f; do
        [ -z "$f" ] && continue
        STATUS="$(check_protected "$f")"
        if [ "$STATUS" = "PROTECTED" ]; then
          stop "Codex SAFE_EDIT proposes modifying protected file: $f"
        fi
      done <<< "$ALLOWED_FILES_RAW"

      log "→ SAFE_EDIT: $EDIT_DESC ($REASON)"
      log "  Files: $ALLOWED_FILES_RAW"

      # SAFE_EDIT requires a Claude task to do the actual edit — we cannot
      # execute raw edits here without a verified prompt. Stop for human review.
      stop "Codex recommended SAFE_EDIT ($EDIT_DESC). A human should verify the edit and run it manually, or configure a dedicated controlled-edit task. Allowed files: $ALLOWED_FILES_RAW. Commit message: $COMMIT_MSG"
      ;;

    *)
      stop "Codex returned unknown action '$ACTION'. Cannot continue."
      ;;
  esac

  # ── guard: do not re-run the synthesis task on itself ────────────────────────
  if [ "$CURRENT_TASK" = "codex-synthesize-latest-report" ] && [ $ITERATION -gt 1 ]; then
    stop "Loop would re-enter codex-synthesize-latest-report after iteration $ITERATION. Stopping to avoid meta-loop."
  fi

done

# ── iteration limit ───────────────────────────────────────────────────────────
stop "Reached maximum iteration limit ($MAX_ITERATIONS). Review accumulated reports."
