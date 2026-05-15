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

For doc registration rules, validator gotchas, status vocabulary, annex block standard, and document model, see [`.claude/rules/corpus-contracts.md`](.claude/rules/corpus-contracts.md).

## Reader architecture

`Dashboard.tsx` is ~4000 lines. For component order, reading-path sync, large-file handling rules, and safe refactor protocol, see [`.claude/rules/reader-refactor.md`](.claude/rules/reader-refactor.md).

## Critical rules

- Run `npm run generate:corpus` after every markdown change.
- Do not modify `docs/constitution/Humane_Constitution.md`, `Acceptance_Protocol.md`, or `INVARIANTS.md` without explicit instruction.
- Vercel deployment root is `app/`, not the repo root. Deploy with `vercel --prod` from inside `app/`.
- For any proposed change to `docs/constitution/`, apply the Christ-centered ethical review in [`.claude/rules/constitution-review.md`](.claude/rules/constitution-review.md).
