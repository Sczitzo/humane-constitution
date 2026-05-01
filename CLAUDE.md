# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A public constitutional design document set with a reader app. The markdown files in `docs/` are the primary artefacts — the app is a reader built on top of them. Changes to markdown must always be followed by a corpus regeneration.

## Commands

All commands run from the `app/` directory.

```bash
# Regenerate the corpus after any markdown change (REQUIRED before commit)
npm run generate:corpus

# Dev server (auto-regenerates corpus on start)
npm run dev

# Production build
npm run build

# Verify corpus is in sync with markdown (used in CI)
npm run check:corpus

# E2E tests (builds first, then runs against preview server on :1420)
npm run test:e2e

# E2E tests with browser visible
npm run test:e2e:headed

# Run a single test file
npx playwright test tests/e2e/reader-shell.spec.ts

# Validate corpus links, identifiers, and annex index
python3 ../scripts/validate_corpus.py
```

The E2E tests build the app before running — expect ~30s startup. The preview server must not already be running on port 1420 unless `PLAYWRIGHT_REUSE_SERVER=true`.

## Architecture

### The corpus pipeline

Markdown files → `scripts/export_corpus.py` → `app/src/generated/corpus.ts` + `app/public/generated/corpus.json`

The script reads all markdown from a hardcoded `CORE_DOCS` list plus every file in `docs/annexes/`. It extracts headings, word counts, summaries, and section tags, then writes typed TypeScript and a JSON payload. **Never edit `corpus.ts` or `corpus.json` by hand** — they are fully regenerated each time.

`scripts/validate_corpus.py` checks that internal links resolve, heading anchors exist, annex index coverage is complete, and identifier references (T-NNN, P-NNN, FC-NNN) resolve to real entries.

### App structure

```
app/src/
  main.tsx              — mounts App
  App.tsx               — loads corpus, manages active view, top-level nav handlers
  components/
    Layout.tsx          — nav bar, reading progress bar, settings panel (font/width/theme)
    Dashboard.tsx       — all reader logic (~4000 lines, see below)
    StatechartDiagram.tsx — mermaid statechart renderer
  generated/
    corpus.ts           — auto-generated, do not edit
index.css               — all custom CSS classes (reader-prose, reader-list, etc.)
```

### Dashboard.tsx — internal organisation

This single file contains the entire reader. Sections in order:

1. **Ref-chip system** — `buildRefLookup()`, `RefChip`, `RefNavContext`. Parses every doc for T-NNN / P-NNN / Annex XX references and renders them as hoverable chips that navigate to the referenced doc.
2. **Utility functions** — `docsForView()`, `viewForDoc()`, markdown line classifiers.
3. **`parseMarkdown()`** — converts raw markdown string into typed `MarkdownBlock[]` (heading / paragraph / list / table / code / quote / rule / mermaid / statechart).
4. **`renderInline()`** — renders a markdown inline string to React nodes. Handles bold, italic, code, `[text](href)` links. Internal `.md` links call `onInternalLink` (navigates within the reader); external links open in a new tab.
5. **`resolveInternalDoc()`** — resolves a relative `.md` href against the current doc's path to find the target `CorpusDoc`.
6. **`MarkdownDocument`** — renders a full doc using `parseMarkdown` + `renderInline`. Receives `allDocs` and `onSelectDoc` to wire internal link navigation.
7. **`ReaderOutline`** — right-hand heading outline, tracks active heading via IntersectionObserver.
8. **`ReaderPanel`** — assembles MarkdownDocument + ReaderOutline + search bar + ReadNext.
9. **`ReaderWorkspace`** — three-pane layout: shelf (doc list) | reader | outline.
10. **`Dashboard`** (default export) — top-level. Manages selected doc, scroll positions, search, pins, recents, keyboard shortcuts, and deep-link hash routing.

### CSS conventions

All prose styles live in `index.css` under `.reader-prose`. Tailwind is used for layout and spacing outside the prose area. CSS custom properties (`--ink`, `--accent`, `--page-bg`, etc.) are defined per theme in `:root` / `[data-theme="dark"]`. The variable `--font-serif` is misnamed — it controls all body prose and points to the Inter stack.

### Document sections and views

Each corpus doc has a `section` field that maps it to a nav view:

| Section | View | What it contains |
|---|---|---|
| `constitution` | Constitution | Humane_Constitution.md, INVARIANTS, SPECIFICATIONS, Acceptance_Protocol |
| `annexes` | Annexes | All ANNEX_*.md files |
| `registry` | Threats & Patches | Threat_Register, Patch_Log, Claims & Evidence, etc. |
| `public` | Home / Reading Paths | 01_overview through 05_rights_layer |
| `simulation` | Topics | Simulation docs |

### Document provenance model

Every threat (T-NNN) has a patch (P-NNN) and an annex (ANNEX_XX.md) containing the resulting constitutional text. This chain is the permanent record of why each constitutional clause exists. The master linkage table lives in `ANNEX_AH.md § AH8`. A `docs/governance/Provenance_Map.md` is planned as the human-readable entry point to this chain.

**Annex naming note:** "AH2" is not a separate file — it refers to sections AH2.1–AH2.4 inside `ANNEX_AH.md`, added by patch P-020. References like "(P-020 / Annex AH2)" mean: patch P-020, whose clauses live in `ANNEX_AH.md` under the AH2 subsections.

## Critical rules

- **Always run `npm run generate:corpus` after any markdown change.** The corpus is not auto-watched in production builds. CI will catch drift via `check:corpus`, but locally it must be done manually.
- **Do not modify `docs/constitution/Humane_Constitution.md`, `Acceptance_Protocol.md`, or `INVARIANTS.md`** without explicit instruction — these are the constitutional source of truth.
- **The Vercel deployment root is `app/`**, not the repo root. `app/vercel.json` and `app/vite.config.ts` govern the build. Deploy with `vercel --prod` from inside `app/`.
