# Codex Prompts

Prompts used when `scripts/review-loop.sh` invokes Codex as a secondary reviewer or synthesizer.

## How Codex integration works

When a task in `review-tasks.json` includes a `"codex"` block with `"enabled": true`, the review loop:

1. Runs the Claude prompt normally and saves a primary report.
2. Invokes `codex exec` with the Codex prompt, passing the primary report path and task name.
3. Saves Codex output as a secondary report: `reports/<task>_<timestamp>-codex.md`.

Codex output is advisory. It does not modify files unless the task explicitly permits controlled edits and the Codex prompt requests a specific change within `allowed_changes`.

## Availability

Codex integration requires `codex` on PATH and a valid authentication context. If `codex` is missing or the task requires it, the runner emits `HOLD` with a plain explanation — it never silently skips Codex and reports PASS.

## Prompts

| File | Purpose |
|---|---|
| `synthesize-latest-report.md` | Summarize the latest Claude report, classify findings, and recommend the next action |

## Adding Codex prompts

Write the prompt to `prompts/codex/<name>.md` and reference it in `review-tasks.json` under `"codex": { "prompt": "prompts/codex/<name>.md" }`.
