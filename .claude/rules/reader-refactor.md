# Reader Refactor Rules

Rules for working safely with the large Dashboard.tsx reader component.

## Dashboard.tsx architecture

`Dashboard.tsx` is ~4000 lines and contains the entire reader. Internal order:

1. ref-chip system (`buildRefLookup`, `RefChip`, `RefNavContext`)
2. utility functions
3. `parseMarkdown()`
4. `renderInline()`
5. `resolveInternalDoc()`
6. `MarkdownDocument`
7. `ReaderOutline`
8. `ReaderPanel`
9. `ReaderWorkspace`
10. `Dashboard` (default export, manages state/routing)

All prose styles are in `index.css` under `.reader-prose`. `--font-serif` is misnamed — it controls body prose and points to the Inter stack.

## Reading paths sync

Path metadata lives in two arrays that must stay in sync by `id`:

- `app/src/components/LandingPage.tsx` — `PATHS` array: `id`, `emoji`, `title`, `desc`, `time`, `color`. Controls landing page display order and card metadata. `desc` only renders in a hover tooltip, not the main SVG tree.
- `app/src/components/Dashboard.tsx` — `READING_PATHS` array: `id`, `title`, `description`, `steps[]`. Each step has `path` (doc path) and `note` (reader guidance). Controls step sequences.

Current path order (conceptual → operational): First-Time → Skeptic → Economic → Founding → Identity → Governance → Implementer → Pilot → Architectural.

If you add or rename a path in one array, update the other in the same commit.

## Large-file handling

`Dashboard.tsx` is too large to read into context at once. During planning and implementation:

- Use grep, symbol search, and file outlines to locate the relevant section.
- Use targeted line ranges when reading — never read the whole file.
- Before proposing refactors, confirm the exact line range affected.

## Regression coverage before extraction

Before extracting `parseMarkdown()`, ref-chip logic (`buildRefLookup`, `RefChip`, `RefNavContext`), or localStorage helpers into separate modules:

1. Add or update E2E or unit regression tests that exercise the behavior being moved.
2. Confirm tests pass before moving code.
3. Confirm tests still pass after moving code.

Prefer automated validation over convention.

## 3-strikes rule

If a fix fails 3 times in a row, stop. Report:
- exact command run
- exact error output
- files touched so far
- suspected root cause
- safest next step

Do not attempt a fourth approach without explicit user approval.
