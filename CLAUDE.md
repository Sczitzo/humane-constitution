# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `app/` directory.

```bash
npm run generate:corpus      # regenerate after any markdown change (REQUIRED before commit)
npm run dev                  # dev server (auto-regenerates corpus on start)
npm run build
npm run check:corpus         # verify corpus is in sync (used in CI)
npm run test:e2e             # builds first, then runs against preview server on :1420
npm run test:e2e:headed
npx playwright test tests/e2e/reader-shell.spec.ts   # single test file
python3 ../scripts/validate_corpus.py                # validate links, identifiers, annex index
```

E2E tests take ~30s to start. Port 1420 must be free unless `PLAYWRIGHT_REUSE_SERVER=true`.

## Corpus pipeline

`scripts/export_corpus.py` → `app/src/generated/corpus.ts` + `app/public/generated/corpus.json`

Never edit `corpus.ts` or `corpus.json` by hand. Current count: 100 docs.

**Adding new docs:**
- `docs/annexes/ANNEX_*.md` — auto-discovered via glob. Also add a row to `docs/annexes/INDEX.md`.
- Everything else (`docs/governance/*.md`, etc.) — must be registered in **three places** in `scripts/export_corpus.py`: the `CORE_DOCS` tuple, the `section_for()` list, and `FEATURED_PATHS` if it should appear on the home screen.

See [`.claude/rules/corpus-contracts.md`](.claude/rules/corpus-contracts.md) for validator gotchas and full registration rules.

## Status vocabulary

All governance docs use this exact vocabulary — no synonyms:

| Status | Meaning |
|---|---|
| `Proposed` | Suggested but not formally incorporated |
| `Designed` | Specified in corpus, not yet active |
| `Active — unproven` | Incorporated, no field evidence |
| `Partly tested` | Some pilot/analogue evidence, not sufficient |
| `Evidence-backed` | Sufficient external evidence |
| `Resolved` | Evidence-backed controls + documented residual risk |

Never use: Closed, Addressed, Partial, Complete, Open (as a status).

## Annex opening block

Every annex must have this block immediately after the H1 title:

```
> **At a glance**
> | | |
> |---|---|
> | **Purpose** | ... |
> | **Who it protects** | ... |
> | **Failure risk** | ... |
> | **Evidence status** | ... |
> | **Linked risks** | T-NNN, P-NNN |
```

Full template in [`.claude/rules/corpus-contracts.md`](.claude/rules/corpus-contracts.md).

## Document model

Every threat (T-NNN) has a patch (P-NNN) and an annex (ANNEX_XX.md) with the resulting constitutional text. Master linkage table: `ANNEX_AH.md § AH8`. Human-readable entry point: `docs/governance/Provenance_Map.md`.

**Annex naming:** "AH2" is not a file — it refers to sections AH2.1–AH2.4 inside `ANNEX_AH.md` added by P-020.

## Reader architecture

`Dashboard.tsx` is ~4000 lines. Internal order: ref-chip system (`buildRefLookup`, `RefChip`, `RefNavContext`) → utility functions → `parseMarkdown()` → `renderInline()` → `resolveInternalDoc()` → `MarkdownDocument` → `ReaderOutline` → `ReaderPanel` → `ReaderWorkspace` → `Dashboard` (default export).

All prose styles are in `index.css` under `.reader-prose`. `--font-serif` is misnamed — controls body prose, points to Inter stack.

During planning, do not read all of `Dashboard.tsx` into context at once. Use grep, symbols, file outlines, and targeted line ranges.

Before extracting `parseMarkdown()`, ref-chip logic, or localStorage helpers, add or update regression coverage first.

If a fix fails 3 times, stop and report: command, error, files touched, suspected cause, safest next step.

See [`.claude/rules/reader-refactor.md`](.claude/rules/reader-refactor.md) for full refactor protocol.

## Reading paths

Path metadata lives in two arrays that must stay in sync by `id`:

- `app/src/components/LandingPage.tsx` — `PATHS` array: `id`, `emoji`, `title`, `desc`, `time`, `color`.
- `app/src/components/Dashboard.tsx` — `READING_PATHS` array: `id`, `title`, `description`, `steps[]`.

Current order: First-Time → Skeptic → Economic → Founding → Identity → Governance → Implementer → Pilot → Architectural.

## Critical rules

- Run `npm run generate:corpus` after every markdown change.
- Do not modify `docs/constitution/Humane_Constitution.md`, `Acceptance_Protocol.md`, or `INVARIANTS.md` without explicit instruction.
- Vercel deployment root is `app/`, not the repo root. Deploy with `vercel --prod` from inside `app/`.
- For any proposed change to `docs/constitution/`, apply the Christ-centered ethical review — see [`.claude/rules/constitution-review.md`](.claude/rules/constitution-review.md).
