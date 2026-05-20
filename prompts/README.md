# Review Prompts

Saved prompts for `scripts/review-loop.sh`. Each file corresponds to a task in `review-tasks.json`.

## Usage

```bash
scripts/review-loop.sh <task-name>
```

Task names match keys in `review-tasks.json`. Reports are written to `reports/`.

## Tasks

| Task | Mode | Description |
|---|---|---|
| `corpus-triage` | read-only | Corpus health check: links, identifiers, opening blocks, index coverage |
| `taxonomy-validate` | read-only | Validate TAXONOMY.md decimal labels against actual annex H1 titles |
| `pre-commit-verification` | controlled-edit | Verify staged changes before commit |

## Adding tasks

1. Add a prompt file here under `prompts/tasks/<name>.md`.
2. Add a task entry in `review-tasks.json` with matching `prompt_file`, `mode`, and `validation` commands.
3. Set `allowed_changes` to the exact file paths Claude may modify (empty for read-only tasks).
