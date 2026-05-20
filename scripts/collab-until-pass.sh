#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage:"
  echo "  ./scripts/collab-until-pass.sh \"Your task\""
  echo
  echo "Optional:"
  echo "  MAX_PASSES=8 ./scripts/collab-until-pass.sh \"Your task\""
  exit 1
fi

TASK="$*"
MAX_PASSES="${MAX_PASSES:-5}"

RUN_ID="$(date +%Y%m%d-%H%M%S)"
RUN_DIR=".agent/runs/$RUN_ID"
mkdir -p "$RUN_DIR"

TASK_FILE="$RUN_DIR/task.md"
CURRENT_PROMPT="$RUN_DIR/current-claude-prompt.md"
FINAL_REPORT="$RUN_DIR/final-report.md"

cat > "$TASK_FILE" <<TASK_EOF
$TASK
TASK_EOF

cat > "$CURRENT_PROMPT" <<PROMPT_EOF
You are working in this repository.

Goal:
$TASK

Rules:
- Inspect relevant files before editing.
- Make the smallest correct change that satisfies the goal.
- Do not broaden scope.
- Do not refactor unrelated code.
- Do not edit generated files unless explicitly required.
- Run relevant validation commands.
- If ambiguity blocks completion, stop and report the exact ambiguity.
- At the end, report:
  1. Files changed
  2. What changed
  3. Validation commands run
  4. Whether the goal is complete
  5. Remaining risks
PROMPT_EOF

echo
echo "=== Claude ↔ Codex goal loop ==="
echo "Run folder: $RUN_DIR"
echo "Max passes: $MAX_PASSES"
echo

PASS_NUM=1
VERDICT="REVISE"

while [ "$PASS_NUM" -le "$MAX_PASSES" ]; do
  echo
  echo "========================================"
  echo "PASS $PASS_NUM / $MAX_PASSES"
  echo "Claude implementing or revising..."
  echo "========================================"
  echo

  CLAUDE_OUT="$RUN_DIR/claude-pass-$PASS_NUM.md"
  DIFF_OUT="$RUN_DIR/diff-pass-$PASS_NUM.diff"
  CODEX_OUT="$RUN_DIR/codex-review-pass-$PASS_NUM.md"
  VERDICT_FILE="$RUN_DIR/verdict-pass-$PASS_NUM.txt"
  NEXT_PROMPT="$RUN_DIR/next-claude-prompt-pass-$PASS_NUM.md"

  claude -p "$(cat "$CURRENT_PROMPT")" --output-format text | tee "$CLAUDE_OUT"

  echo
  echo "Capturing git diff..."
  git diff > "$DIFF_OUT"

  echo
  echo "Codex reviewing pass $PASS_NUM..."
  codex exec "
You are a strict senior code reviewer and completion judge.

Original goal:
$(cat "$TASK_FILE")

Claude report for this pass:
$(cat "$CLAUDE_OUT")

Current git diff:
$(cat "$DIFF_OUT")

Judge whether the original goal is fully met.

Return exactly this structure:

## Verdict
PASS / REVISE / FAIL

## Reason
Explain briefly.

## Blocking Issues
- List only issues that prevent completion.
- If none, write: None.

## Validation Status
- List validation commands that were run or still need to run.

## Prompt Back To Claude
Write the exact next prompt for Claude Code.
If Verdict is PASS, write: No further implementation needed. Verify final status and summarize.
If Verdict is REVISE, tell Claude exactly what to fix next.
If Verdict is FAIL, tell Claude to stop and explain why the task cannot safely be completed.
" | tee "$CODEX_OUT"

  VERDICT="$(awk '
    /^## Verdict/ {getline; gsub(/^[ \t]+|[ \t]+$/, "", $0); print $0; exit}
  ' "$CODEX_OUT" | tr '[:lower:]' '[:upper:]' | awk '{print $1}')"

  echo "$VERDICT" > "$VERDICT_FILE"

  echo
  echo "Codex verdict: $VERDICT"

  awk '
    /^## Prompt Back To Claude/ {flag=1; next}
    flag {print}
  ' "$CODEX_OUT" > "$NEXT_PROMPT"

  if [ "$VERDICT" = "PASS" ]; then
    echo
    echo "Goal accepted by Codex. Stopping loop."
    break
  fi

  if [ "$VERDICT" = "FAIL" ]; then
    echo
    echo "Codex marked the task as FAIL. Stopping loop."
    break
  fi

  if [ ! -s "$NEXT_PROMPT" ]; then
    echo
    echo "No next prompt was generated. Stopping for human review."
    VERDICT="NEEDS_HUMAN_REVIEW"
    break
  fi

  cat > "$CURRENT_PROMPT" <<PROMPT_EOF
You are continuing work in this repository.

Original goal:
$(cat "$TASK_FILE")

Codex review from pass $PASS_NUM:
$(cat "$CODEX_OUT")

Instructions:
- Apply only the blocking fixes Codex identified.
- Do not broaden scope.
- Do not refactor unrelated code.
- Run the validation commands Codex requested where applicable.
- If the review says the work is complete, only verify and summarize.
- Stop and report if ambiguity appears.

Next prompt from Codex:
$(cat "$NEXT_PROMPT")
PROMPT_EOF

  PASS_NUM=$((PASS_NUM + 1))
done

echo
echo "========================================"
echo "FINAL SUMMARY"
echo "========================================"

git diff > "$RUN_DIR/final.diff"

codex exec "
You are producing the final collaboration report.

Original goal:
$(cat "$TASK_FILE")

Final verdict from loop:
$VERDICT

Final git diff:
$(cat "$RUN_DIR/final.diff")

Review files in the run folder if needed:
$RUN_DIR

Return:

## Final Verdict
PASS / NEEDS HUMAN REVIEW / FAIL

## What Changed
- Concise list.

## Validation Status
- What appears validated.
- What still needs manual validation.

## Remaining Risks
- Concise list.

## Recommended Next Action
- Commit / continue loop / inspect specific files / run specific command.
" | tee "$FINAL_REPORT"

echo
echo "Run folder: $RUN_DIR"
echo "Final report: $FINAL_REPORT"
