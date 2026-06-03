# Task: Corpus Triage

You are doing a read-only health check of the Humane Constitution constitutional corpus. Do not modify any files.

## Scope

Working directory: repo root. Corpus source: `docs/`.

## Checks to perform

Run each check and report findings. For each finding, record: file path, line number (if applicable), issue type, and severity (BLOCKER / HIGH / MEDIUM / LOW).

### 1. Validator

Run `python3 scripts/validate_corpus.py` and capture all output. Report every failure line verbatim.

### 2. Annex opening blocks

Every file matching `docs/annexes/ANNEX_*.md` must have an "At a glance" block immediately after the H1 title with these rows: Purpose, Who it protects, Failure risk, Evidence status, Linked risks.

Report any annex missing the block or missing a row.

### 3. Status vocabulary

Scan all files under `docs/governance/` and `docs/annexes/` for status values. Only these are valid: Proposed, Designed, Active — unproven, Partly tested, Evidence-backed, Resolved.

Flag any use of: Closed, Addressed, Partial, Complete, Open (as a status label).

### 4. Dead links in governance docs

In `docs/governance/Patch_Log.md` and `docs/governance/Provenance_Map.md`, check every markdown link that points to `docs/annexes/`. Flag links to annex files that do not exist on disk.

### 5. TAXONOMY.md coverage

Check that every `docs/annexes/ANNEX_*.md` file appears exactly once in `docs/annexes/TAXONOMY.md`.

## Output format

```
## Corpus Triage Report

### Validator output
[verbatim output or "PASS"]

### Opening block gaps
[list or "None"]

### Status vocabulary violations
[list or "None"]

### Dead annex links
[list or "None"]

### TAXONOMY.md coverage gaps
[list or "None"]

### Summary
PASS / HOLD / FAIL

Verdict explanation: [one sentence]
```

PASS = no blockers, no highs. HOLD = validator errors that are pre-existing baseline (not introduced by recent changes). FAIL = new blockers introduced by recent changes.

Do not modify any files. Stop and report if you encounter ambiguity.
