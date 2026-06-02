# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A **constitutional design corpus** (not running software) — Markdown under `docs/` — plus a React/Vite reader app under `app/` that renders it. The design separates what most societies merge into money — survival, market exchange, and public power — into **five walled instruments**: Flow (market money), Essential Access (an unbuyable survival floor), Voice (bounded civic priority), Service Record (rotating public-role eligibility), and Shared Storehouse (temporary verified-shortage rationing). The walls between them *are* the system. It targets three named failure modes: Survival-Trade Bind, Power-Wealth Convergence, Static-Advantage Loop. There is no pilot evidence yet, and the corpus is deliberately honest about that everywhere (see Status vocabulary).

## Operating posture

- Preserve existing behavior unless the user explicitly approves a change.
- Prefer small, reversible diffs over broad rewrites.
- Use existing repo patterns before introducing new libraries or architecture.
- Do not introduce new frameworks, libraries, or major architecture patterns without explicit user approval.
- Treat source docs and validation scripts as source of truth; generated corpus outputs are build artifacts.
- When unsure, inspect narrowly and report the uncertainty before editing.

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

Never hand-edit `app/src/generated/corpus.ts` or `app/public/generated/corpus.json` (the generator prints the live doc count — treat that as truth, ~104). `validate_corpus.py` should pass with **0 errors**: it carries documented allowlists (`RESERVED_IDENTIFIERS` = P-007/P-010/P-028 never-assigned; `DRAFT_IDENTIFIERS` = P-063 draft-only; `GOVERNANCE_REGISTRATION_EXEMPTIONS` = the P-063 draft family + not-yet-adopted CRP/Ombuds working packets). These exemptions are intentional — do not "fix" them by registering drafts into the reader.

**Adding new docs:**
- `docs/annexes/ANNEX_*.md` — auto-discovered via glob. Also add a row to `docs/annexes/INDEX.md`.
- Everything else (`docs/governance/*.md`, etc.) — must be registered in **three places** in `scripts/export_corpus.py`: the `CORE_DOCS` tuple, the `section_for()` list, and `FEATURED_PATHS` if it should appear on the home screen.

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

Full template in `.claude/rules/corpus-contracts.md`.

## Document model

Every threat (T-NNN) has a patch (P-NNN) and an annex (ANNEX_XX.md) with the resulting constitutional text. Master linkage table: `ANNEX_AH.md § AH8`. Human-readable entry point: `docs/governance/Provenance_Map.md`.

**Annex naming:** "AH2" is not a file — it refers to sections AH2.1–AH2.4 inside `ANNEX_AH.md` added by P-020.

**Demurrage lives only in `ANNEX_D`** (the sole carrying-cost instrument on accumulated wealth, §D9). There is no separate idle-money / per-balance Flow fee — that earlier model was removed corpus-wide; any demurrage reference should point to ANNEX_D.

## Constitution layering and amendment tiers

The corpus is layered, outermost = most aspirational, innermost = most fixed. Understanding this requires reading across all four `docs/constitution/` files:

- `Humane_Constitution.md` — the vision (Philosophical Preamble, §0A) **and** the operative Articles I–VII. Self-describes as "a design under development."
- `INVARIANTS.md` — the **Tier-1 non-negotiable core** (a Foundational Premise + INV-001…INV-013). "Rules the system is never allowed to break"; a violating proposal is rejected at FAP intake before review.
- `SPECIFICATIONS.md` — the machine room (state machines, formulas, parameter tables); the technical realization of the Constitution.
- `Acceptance_Protocol.md` — how a proposed change becomes active (the Formal Acceptance Protocol / FAP, pre-launch blocking gates).

Everything maps to **three amendment tiers**: **Tier 1** = invariants (changeable only by 7-of-9 keyholder signatures + 180-day timelock; the amendment mechanism itself needs H-3 refounding). **Tier 2** = founding commitments (supermajority + adversarial panel; pilot evidence required). **Tier 3** = operational parameters (standard FAP tuning). A patch tagged `modifies_tier1=True` requires a two-key adversarial attestation (`ANNEX_AV`) before FAP intake. Annexes implement and extend the Articles; INVARIANTS is the bedrock the whole annex set exists to guard.

## Provenance spine and evaluation

Two governance systems run alongside the corpus and must stay internally consistent:

- **Security/provenance spine:** `docs/governance/Threat_Register.md` (T-NNN) → `Patch_Log.md` (P-NNN) → annex. ~35 of 44 annexes cite T-/P- IDs to record what attack each clause defends against and which patch introduced it. `Provenance_Map.md` is the human entry point. A status (e.g. `Active — unproven`, `Resolved`) must read the same across all three files; the threat register requires per-threat owners, review dates, and a staleness rule (`ANNEX_B`/`ANNEX_C`).
- **Christ-centered evaluation:** `docs/governance/Christ_Centered_Evaluation.md` is a large append-only theological review of the whole corpus (Sessions 5–21 cover every annex; Sessions 17–20 cover the constitution core via a three-pass expert panel). It is the moral-accountability layer — distinct from, not a replacement for, the threat/patch security layer. Any change to `docs/constitution/` must add the review per `.claude/rules/constitution-review.md`.

## Reader architecture

`Dashboard.tsx` is ~4000 lines. Internal order: ref-chip system (`buildRefLookup`, `RefChip`, `RefNavContext`) → utility functions → `parseMarkdown()` → `renderInline()` → `resolveInternalDoc()` → `MarkdownDocument` → `ReaderOutline` → `ReaderPanel` → `ReaderWorkspace` → `Dashboard` (default export).

All prose styles are in `index.css` under `.reader-prose`. `--font-serif` is misnamed — controls body prose, points to Inter stack.

During planning, do not read all of `Dashboard.tsx` into context at once. Use grep, symbols, file outlines, and targeted line ranges.

Before extracting `parseMarkdown()`, ref-chip logic, or localStorage helpers, add or update regression coverage first.

If a fix fails 3 times, stop and report: command, error, files touched, suspected cause, safest next step.

## Reading paths

Path metadata lives in two arrays that must stay in sync by `id`:

- `app/src/components/LandingPage.tsx` — `PATHS` array: `id`, `emoji`, `title`, `desc`, `time`, `color`.
- `app/src/components/Dashboard.tsx` — `READING_PATHS` array: `id`, `title`, `description`, `steps[]`.

Current order: First-Time → Skeptic → Economic → Founding → Identity → Governance → Implementer → Pilot → Architectural.

## Critical rules

- Run `npm run generate:corpus` after every markdown change under `docs/` or any corpus-registered markdown source.
- Do not modify these **protected files** without explicit instruction (authoritative list in `review-tasks.json`):
  - `docs/constitution/` (all — including `Humane_Constitution.md`, `Acceptance_Protocol.md`, `INVARIANTS.md`, `SPECIFICATIONS.md`)
  - `docs/governance/Patch_Log.md`
  - `docs/governance/P-063_draft.md` (P-063 stays draft-only and not corpus-registered)
  - `docs/annexes/ANNEX_D.md`
  - `scripts/export_corpus.py`
  - `app/src/generated/corpus.ts`, `app/public/generated/corpus.json` (regenerate, never hand-edit)
- Vercel deployment root is `app/`, not the repo root. Deploy with `vercel --prod` from inside `app/`.
- For any proposed change to `docs/constitution/`, apply the Christ-centered ethical review in `.claude/rules/constitution-review.md`.
- Run relevant verification before marking any code or corpus task complete.

## Scoped protocols

Before work in these areas, read the matching rule file first:

- Corpus validation, governance docs, annexes, statuses, or links: `.claude/rules/corpus-contracts.md`
- Reader app, `Dashboard.tsx`, parser, ref chips, localStorage, or reading paths: `.claude/rules/reader-refactor.md`
- Proposed changes to `docs/constitution/`: `.claude/rules/constitution-review.md`

Root `CLAUDE.md` contains global rules only. Area-specific protocols live in `.claude/rules/`.

## Review-loop automation

```bash
scripts/review-loop.sh <task-name>
```

Runs a saved Claude prompt by task name with guardrails. Tasks defined in `review-tasks.json`. Prompts in `prompts/tasks/`. Reports written to `reports/`. Never modifies protected files; exits non-zero on guardrail violation. Tasks with `"codex": { "enabled": true }` invoke `codex exec` as a secondary synthesizer after the Claude run; Codex output is advisory and saved as a `-codex.md` secondary report. Push is always manual.
