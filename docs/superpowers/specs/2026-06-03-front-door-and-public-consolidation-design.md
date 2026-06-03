# Design: Front Door + Public-Layer Consolidation (Phase 1)

**Date:** 2026-06-03
**Status:** Draft — awaiting user approval
**Phase:** 1 (the reviewer/public front door), with a folded-in public-layer consolidation

---

## Goal

Give a serious reviewer (academic, funder/policy) and the general public a single, credible entry point that survives a skeptical first read — and consolidate the redundant public layer (8 docs → 5) so the front door doesn't add to the sprawl. Success = a reader takes it seriously instead of pattern-matching it to a manifesto.

## Why (panel findings this answers)

A three-lens critique (academic, funder, hostile reader) of the current public docs converged:
- It reads as a design corpus/manifesto, not a positioned contribution; the **honesty layer is the differentiator but arrives after the jargon**.
- **Acronym firehose** on the first screen (CASP, CIP, AED, Annex AM §AM8) detonates the BS detector — and **CASP is expanded two different ways** across docs (a real bug).
- **No engagement with prior work** (Walzer's blocked exchanges, UBI/minimum-core rights, Ostrom, Gesell demurrage, Sen entitlements, the socialist-calculation debate ≈ the "capacity measurement" problem).
- The **core claim isn't a falsifiable conditional**, and the **#1 objection (proxy-market re-convergence)** is logged as a risk but never walked through.
- **Anonymous "we", hidden AI-assistance, no concrete next step.**
- The intro is told 3× (01, 02, 04); the honesty layer 2× (03, 04); daily-life/rights 3× (05, 06, 07).

## Decisions (settled)

- **Consolidation depth:** Option B — real consolidation, keep genuinely distinct views.
- **Front door shape:** one document, shared spine + two tailored exits (researchers / funders-partners). Not two separate docs (avoids the drift we just eliminated in Phase 0).
- **Funder exit:** stubbed to the Phase-2 pilot (the deep ask depends on the pilot existing; faking it now would be hollow).
- **Anchor claim:** *"Survival, market power, and political power can be kept structurally non-convertible — and whether the walls actually hold is testable, not yet tested."*
- **Attribution:** named solo author + AI-assistance owned as a feature (fast iteration + adversarial self-critique). **Author: Cameron Matthew** (confirmed).
- **Redundant docs are retired, not stubbed.** `01_overview` and `03_readiness` are removed; `06`/`07` merge into Life & Rights. Every reference to a retired doc — in other docs, in `export_corpus.py`, and **inside the reader app** (reading paths, ref-chips, `resolveInternalDoc`, landing/header path arrays) — is repointed to the merged/front-door target in the same change. `validate_corpus.py` (0 errors) is the safety net for dangling links.

---

## Target public layer (8 → 5)

| New set | Source | Job |
|---|---|---|
| **`00_start_here.md`** *(new — Front Door)* | new; subsumes 01 + intro/honesty of 03, 04 | the entry: hook, claim, honesty, objection, positioning, who, next step, doc-map |
| **`04_white_paper.md`** *(slimmed)* | 04 minus the re-intro | the deep argument: prior-work positioning, objection walked, design in depth |
| **`02_faq.md`** *(trimmed)* | 02 minus front-door overlap | objection-handling Q&A |
| **`05_life_and_rights.md`** *(new merge)* | 05 + 07 + 06-as-section | one lived-reality doc: rights you'd get, shown via personas, how firms operate |
| **`08_useful_history.md`** *(unchanged)* | 08 | historical evidence |

**Retired:** `01_overview.md` (→ subsumed by front door), `03_readiness.md` (honesty → front door; "what would change" → front door; nav → front-door doc-map), `06_big_companies.md` (→ section of Life & Rights), `07_life_under_the_system.md` (→ merged into Life & Rights). Renumber is optional; keep stable filenames where possible to limit churn (the merged file reuses `05_`).

## Front Door structure (`00_start_here.md`)

The spine is audience-universal; only the last section branches.

1. **First screen (the 15-second test):**
   - The felt problem — the lost-job vignette (the panel's favorite existing asset).
   - **The anchor claim**, in plain words, **zero acronyms**.
   - The disqualifier, up front: no pilot evidence yet; partly AI-built; published so you can break it.
2. **What this is / is not** — one tight pass (absorbs 01's "what it's not").
3. **Where it sits in prior work, and what's actually novel** — names the traditions (Walzer blocked exchanges; UBI vs in-kind & minimum-core rights; Ostrom; Gesell demurrage & wealth-tax incidence; Sen entitlements; the calculation debate) and states the claimed contribution: the specific *conjunction* of non-convertible instruments + a falsifiable incidence gate.
4. **The hardest objection, walked** — proxy/black-market re-convergence: the attack, the design's answer (non-convertibility enforcement, expiry, monitoring), and the honest residual (it's a detection-and-cost claim, unproven at scale).
5. **Honesty layer** — claimed / designed / unproven, linking the Claims & Evidence Register; named open problems linking the Hardening Queue. "What would change the assessment" (from 03).
6. **Who's behind it & how it was built** — named author; AI-assistance owned; open/CC-licensed; invites reviewers and challenge.
7. **Two exits:**
   - *For researchers* — the contribution claim + the open research questions.
   - *For funders/partners* — "the concrete next step" (**stub** now → becomes the Phase-2 pilot prospectus when it exists).
8. **Doc-map** — a short "where to go next" index (absorbs 03's navigation): White Paper (depth), FAQ, Life & Rights, Useful History, governance spine.

## Corpus fixes folded into Phase 1

- **CASP single naming:** pick one canonical expansion corpus-wide and fix every occurrence (the two current expansions are a credibility bug). Determine the intended one from Annex AT / Patch_Log P-050 before changing.
- **Illustrative-parameter tagging:** where public docs cite invented specifics (`72h` expiry, burden ratio `≤1.0`, `7-member` CIP), tag them once as illustrative design parameters, not empirical findings.
- **Prior-work positioning:** lives in the front door (§3) and is referenced from the white paper.

## Sync requirements (must not drift)

Any doc merge/retire is a multi-file change kept in one commit each:
- `scripts/export_corpus.py` — `CORE_DOCS`, `section_for()`, `FEATURED_PATHS`.
- `app/src/components/LandingPage.tsx` `PATHS` and `app/src/components/Dashboard.tsx` `READING_PATHS` (+ steps that reference retired docs) — keep the two in sync by `id`.
- `app/src/components/Layout.tsx` `HEADER_PATHS` if a path is added/removed (+ reading times).
- Any internal links/ref-chips pointing at retired docs → repoint to the merged/front-door target. `validate_corpus.py` (0 errors) enforces no dangling links — it is the safety net for the merge.
- Regenerate the corpus after every markdown change; `check:corpus` in sync; `check_status_consistency.py` + `gen_status_tables.py` stay green.

## Verification (before marking complete)

- `validate_corpus.py`: 0 errors (catches dangling links from retires).
- `check:corpus` in sync; status gate + linkage generator green.
- `npm run build` + e2e (`landing-flow`, `reader-shell`, `footnote-citations`) pass; reading-path arrays in sync.
- Front door reads cleanly in the reader (renders, links resolve, no acronym on first screen).
- A fresh skeptical re-read (panel or self) confirms the first screen passes the 15-second test.

## Resolved

1. **Attribution:** Cameron Matthew, AI-assistance owned. (A one-line bio can be refined during drafting.)
2. **Renumbering:** keep existing numbers; add `00_start_here.md`; reuse `05_` for the merged Life & Rights. Minimal churn.
3. **Retire, don't stub:** `01_overview` and `03_readiness` removed; `06`/`07` merged. All references repointed (corpus + reader) in the same change; validator guarantees nothing dangles.

## Out of scope (later phases)

- The full pilot prospectus (Phase 2) — the funder exit only stubs to it.
- Deep per-doc rewrites beyond consolidation + the panel fixes (Phase 3).
