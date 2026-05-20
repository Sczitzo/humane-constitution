# Task: Pre-Commit Verification

You are verifying that staged changes are safe to commit. Allowed edits: `app/src/generated/corpus.ts`, `app/public/generated/corpus.json` (corpus regeneration only).

## Steps

### 1. Inspect staged changes

Run `git diff --name-only HEAD` and `git diff HEAD` to see what changed and what the diffs look like.

Report every changed file. Flag immediately if any protected file appears:
- `docs/constitution/` (any file)
- `docs/governance/P-063_draft.md`
- `docs/annexes/ANNEX_D.md`
- `docs/governance/Patch_Log.md`
- `scripts/export_corpus.py`

If a protected file appears in the diff, set verdict to FAIL and stop.

### 2. Corpus sync check

Run `npm run check:corpus --prefix app`. Report output verbatim. A non-zero exit → HOLD.

### 3. Validator

Run `python3 scripts/validate_corpus.py`. Report output verbatim. A non-zero exit or new failures (not present in baseline) → HOLD or FAIL depending on severity.

### 4. Markdown links in changed docs

For each changed `docs/` markdown file, scan for markdown links to other `docs/` files. Check that every linked path exists on disk. Flag dead links.

### 5. Status vocabulary in changed docs

For each changed governance or annex doc, check that no invalid status values were introduced.

### 6. Annex opening block (if annex file changed)

If any `docs/annexes/ANNEX_*.md` was modified, verify the "At a glance" block is still present and complete.

## Output format

```
## Pre-Commit Verification Report

### Changed files
[list]

### Protected file violations
[list or "None"]

### Corpus sync
[PASS / FAIL — output]

### Validator
[PASS / HOLD — output]

### Dead links in changed docs
[list or "None"]

### Status vocabulary
[violations or "None"]

### Opening block integrity
[issues or "N/A"]

### Summary
PASS / HOLD / FAIL

Verdict explanation: [one sentence]
Next step: [one sentence — safe to commit, or what to fix first]
```

Do not auto-stash, auto-reset, or hide any failure. Stop and report if you encounter ambiguity.
