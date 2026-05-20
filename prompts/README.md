# Review Prompts

Saved prompts for `scripts/review-loop.sh`. Each file corresponds to a task in `review-tasks.json`.

## Usage

```bash
# Run an ordinary Claude task
scripts/review-loop.sh <task-name>

# Run Codex synthesis on the latest report
scripts/review-loop.sh codex-synthesize-latest-report
```

Task names match keys in `review-tasks.json`. Reports are written to `reports/` and gitignored.

## Tasks

| Task | Mode | Codex | Description |
|---|---|---|---|
| `corpus-triage` | read-only | no | Corpus health check: links, identifiers, opening blocks, index coverage |
| `taxonomy-validate` | read-only | no | Validate TAXONOMY.md decimal labels against actual annex H1 titles |
| `christ-centered-session7-review` | read-only | no | Christ-centered review of ANNEX_AW, ANNEX_AX, ANNEX_AY |
| `codex-synthesize-latest-report` | read-only | yes | Locate latest report; invoke Codex as secondary synthesizer |
| `pre-commit-verification` | controlled-edit | no | Verify staged changes before commit |

## Reports

- Primary Claude reports: `reports/<task>_<YYYYMMDD_HHMMSS>.md`
- Codex secondary reports: `reports/<task>_<YYYYMMDD_HHMMSS>-codex.md`
- All `reports/*.md` are gitignored; `reports/.gitkeep` tracks the directory.

## Codex integration

When a task has `"codex": { "enabled": true }` in `review-tasks.json`, the runner:

1. Runs the Claude prompt and saves the primary report.
2. Invokes `codex exec` with the task's Codex prompt, passing `TASK_NAME`, `REPORT_PATH`, and `REPO_ROOT`.
3. Saves Codex output as a `-codex.md` secondary report.

Codex output is advisory. It cannot modify files unless the task's `allowed_changes` explicitly permits it. Push remains manual in all cases.

If `codex` is not on PATH and a task requires it, the runner exits with `HOLD` and a plain explanation.

## Codex prompts

Stored in `prompts/codex/`. See `prompts/codex/README.md`.

## Adding tasks

1. Add a prompt file under `prompts/tasks/<name>.md`.
2. Add a task entry in `review-tasks.json` with `prompt_file`, `mode`, and `validation`.
3. To add Codex synthesis, add a prompt under `prompts/codex/` and a `"codex"` block in the task config.
