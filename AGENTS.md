# AGENTS.md

## Scope

These instructions apply to the whole repository.

## Commands

Run reader-app commands from `app/`:

```bash
npm run generate:corpus
npm run dev
npm run build
npm run check:corpus
npm run test:e2e
npm run test:e2e:headed
npx playwright test tests/e2e/reader-shell.spec.ts
```

Run repository validation from the repo root:

```bash
node scripts/run_python.mjs scripts/validate_corpus.py
```

## Corpus Rules

- After every Markdown change, regenerate the corpus before committing: `cd app && npm run generate:corpus`.
- Do not edit `app/src/generated/corpus.ts` or `app/public/generated/corpus.json` by hand.
- `scripts/export_corpus.py` is the source of truth for corpus registration.
- New `docs/annexes/ANNEX_*.md` files are auto-discovered, but must also be added to `docs/annexes/INDEX.md`.
- New non-annex documents must be registered in `scripts/export_corpus.py` in `CORE_DOCS`, `section_for()`, and `FEATURED_PATHS` if they should appear on the home screen.
- `scripts/validate_corpus.py` parses Markdown links inside code fences. Avoid bare Markdown-link examples outside `docs/`; use inline code instead.

## File Constraints

- Do not modify `docs/constitution/Humane_Constitution.md`, `docs/constitution/Acceptance_Protocol.md`, or `docs/constitution/INVARIANTS.md` without explicit instruction.
- Vercel deployment root is `app/`, not the repo root.
- Deploy production from `app/` with `vercel --prod`.

## Reader Architecture

- `app/src/Dashboard.tsx` contains the reader shell and most reader logic.
- Keep the established internal order in `Dashboard.tsx`: ref-chip system, utilities, Markdown parsing/rendering, document resolution, document/panel/workspace components, then `Dashboard`.
- Reader prose styling belongs in `app/src/index.css` under `.reader-prose`.
- `--font-serif` is a legacy name; it controls body prose and points to the Inter stack.

## Document Model

- Every threat `T-NNN` should have a corresponding patch `P-NNN` and annex text.
- The master threat/patch/annex linkage table is `docs/annexes/ANNEX_AH.md` section `AH8`.
- `AH2`-style references usually mean sections inside `ANNEX_AH.md`, not separate files.
- Section-to-navigation mapping lives in `section_for()` in `scripts/export_corpus.py`.

## Constitution Review Rule

When evaluating or proposing changes under `docs/constitution/`, use the teachings of Jesus Christ as the interpretive lens. Treat the Humane Constitution as human-made, corrigible, and subordinate to Christ's teachings; never imply divine endorsement.

For each reviewed area, cover:

- Christ-centered alignment
- Babel-risk warning
- Human dignity test
- Revision proposal
- Fruit test
