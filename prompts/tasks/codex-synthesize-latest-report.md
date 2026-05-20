# Task: Codex Synthesize Latest Report

Locate the most recent report in `reports/` and prepare context for the Codex synthesis step.

## Steps

1. List all files in `reports/` sorted by modification time, newest first. Identify the most recent `*.md` file that is NOT a `-codex.md` secondary report.

2. Report:
   - the report path
   - the task name it corresponds to (from the filename)
   - the primary verdict (PASS / HOLD / FAIL) from the report header

3. Do not modify any files.

4. The Codex synthesis step will run automatically after this Claude step completes. The review-loop will pass the report path, task name, and repo root to Codex using the prompt at `prompts/codex/synthesize-latest-report.md`.

5. Report where the Codex synthesis output will be saved (the runner appends `-codex` to the report filename before the extension).

## Output format

```
## Codex Synthesis Preparation

**Latest report:** [path]
**Source task:** [task name]
**Primary verdict:** [PASS / HOLD / FAIL]
**Codex output will be saved to:** [path with -codex suffix]

Ready for Codex synthesis.
```

Do not modify files. Do not run Codex directly — the review-loop script handles invocation.
