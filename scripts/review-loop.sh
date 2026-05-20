#!/usr/bin/env bash
set -euo pipefail

TASK_FILE=".agent/task.md"
CLAUDE_RESULT=".agent/claude-result.md"
DIFF_FILE=".agent/latest.diff"
REVIEW_FILE=".agent/reviewer-next-prompt.md"

if [ ! -s "$TASK_FILE" ]; then
  echo "ERROR: .agent/task.md is empty."
  echo "Put the original Claude task in .agent/task.md first."
  exit 1
fi

echo "Saving current git diff..."
git diff > "$DIFF_FILE"

echo "Reviewing with Codex..."
codex exec "
You are acting as a strict senior code reviewer and agent-orchestration strategist.

Claude Code just completed a task in this repository.

Original task:
$(cat "$TASK_FILE")

Claude's claimed result:
$(cat "$CLAUDE_RESULT")

Git diff:
$(cat "$DIFF_FILE")

Evaluate the result.

Return exactly this structure:

## Verdict
PASS / PARTIAL / FAIL

## What Claude did correctly
- Bullet list only.

## Problems found
Rank by severity:
- BLOCKER:
- HIGH:
- MEDIUM:
- LOW:

## Missing validation
List exact commands/tests that should be run.

## Architectural drift check
Identify whether the result violates project rules, hidden assumptions, naming conventions, generated-file rules, or state-management contracts.

## Next Claude Code Prompt
Write one copy-ready prompt that tells Claude exactly what to do next.

Constraints for the next prompt:
- No vague language.
- No broad refactors unless required.
- Tell Claude what files to inspect first.
- Tell Claude what files it may edit.
- Tell Claude what validation commands to run.
- Tell Claude to stop and report if ambiguity appears.
" > "$REVIEW_FILE"

echo
echo "Review written to $REVIEW_FILE"
echo
cat "$REVIEW_FILE"
