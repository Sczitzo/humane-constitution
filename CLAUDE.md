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

Never edit `corpus.ts` or `corpus.json` by hand.

**Adding new docs:**
- `docs/annexes/ANNEX_*.md` — auto-discovered via glob. Also add a row to `docs/annexes/INDEX.md`.
- Everything else (`docs/governance/*.md`, etc.) — must be registered in **three places** in `scripts/export_corpus.py`: the `CORE_DOCS` tuple, the `section_for()` list, and `FEATURED_PATHS` if it should appear on the home screen.

**Validator gotcha:** `validate_corpus.py` parses markdown links even inside code fences. Avoid `[text](path.md)` syntax in docs outside `docs/` (e.g. plan files) — use inline code instead, or the validator will try to resolve the path from the wrong directory.

## Architecture

`Dashboard.tsx` is ~4000 lines and contains the entire reader. Internal order: ref-chip system (`buildRefLookup`, `RefChip`, `RefNavContext`) → utility functions → `parseMarkdown()` → `renderInline()` → `resolveInternalDoc()` → `MarkdownDocument` → `ReaderOutline` → `ReaderPanel` → `ReaderWorkspace` → `Dashboard` (default export, manages state/routing).

All prose styles are in `index.css` under `.reader-prose`. `--font-serif` is misnamed — it controls body prose and points to the Inter stack.

## Document model

Every threat (T-NNN) has a patch (P-NNN) and an annex (ANNEX_XX.md) with the resulting constitutional text. Master linkage table: `ANNEX_AH.md § AH8`. Human-readable entry point: `docs/governance/Provenance_Map.md`.

**Annex naming:** "AH2" is not a file — it refers to sections AH2.1–AH2.4 inside `ANNEX_AH.md` added by P-020. "(P-020 / Annex AH2)" means: patch P-020, clauses in `ANNEX_AH.md` under the AH2 subsections.

Section → nav view mapping lives in `section_for()` in the export script.

## Critical rules

- Run `npm run generate:corpus` after every markdown change.
- Do not modify `docs/constitution/Humane_Constitution.md`, `Acceptance_Protocol.md`, or `INVARIANTS.md` without explicit instruction.
- Vercel deployment root is `app/`, not the repo root. Deploy with `vercel --prod` from inside `app/`.

## Standing evaluative requirement: Christ-centered ethical review

When evaluating or proposing changes to any document in `docs/constitution/`, use the teachings of Jesus Christ as the interpretive lens. Treat the Humane Constitution as a human-made framework — humble, accountable, corrigible, and subordinate to Christ's teachings. Do not treat it as Scripture or revelation.

Evaluate each area against these eight questions:

1. Does this reflect love of God and love of neighbor? (Matt 22:37–40)
2. Does this serve people rather than exalt the system or its authorities? (Mark 10:42–45; John 13:12–17)
3. Does this protect the vulnerable, the poor, the outcast, and the burdened? (Matt 25:35–40; Luke 4:18–19)
4. Does this honor truth, mercy, justice, forgiveness, and reconciliation? (Matt 5–7; Matt 18:21–35)
5. Does this preserve human dignity rather than reducing people to data or compliance? (Gen 1:26–27; Matt 7:12)
6. Does this resist Babel-like temptations: pride, domination, coercive unity, replacing dependence on God? (Gen 11:1–9; Matt 6:1–6)
7. Does this produce good fruit in practice? (Matt 7:15–20; Gal 5:22–23)
8. Does this remain open to correction, repentance, and wise counsel? (Matt 18:15–20; Prov 11:14)

For each area, provide: **Christ-centered alignment** · **Babel-risk warning** · **Human dignity test** · **Revision proposal** · **Fruit test**

Do not say "God endorses this Constitution." Assess consistency with Jesus' teachings as found in Scripture.

*The Humane Constitution must serve humanity under God; it must never become humanity's substitute for God.*
