# Reading Paths Redesign

**Date:** 2026-05-14
**Status:** Approved — ready for implementation

## Summary

Reorder the 9 reading paths on the landing page to front-load conceptual paths and push operational/technical paths to the end. Fix step ordering inside 4 paths. No paths are added or removed. No doc content changes.

## Context

The reader app (`app/src/components/`) has 9 guided reading paths. Path metadata lives in two places:

- `app/src/components/LandingPage.tsx` — `PATHS` array: id, emoji, title, desc, time, color
- `app/src/components/Dashboard.tsx` — `READING_PATHS` array: id, title, steps (docId + note per step)

Both arrays must be reordered in sync. The landing page renders paths in `PATHS` array order; the dashboard resolves them by id so order there is less critical but should match for maintainability.

## Changes

### 1. Landing page path order

**Current:** First-Time → Skeptic → Implementer → Economic → Founding → Pilot → Identity → Architectural → Governance

**Proposed:** First-Time → Skeptic → Economic → Founding → Identity → Governance → Implementer → Pilot → Architectural

**Rationale:** Current order puts Implementer at position 3, implying the average visitor is a builder. Most are not. The proposed order front-loads conceptual understanding paths and clusters the three operational/technical paths (Implementer, Pilot Readiness, Architectural Integrity) at the end as a specialist tier.

| # | Path | Change |
|---|------|--------|
| 1 | 🌱 First-Time Reader | unchanged |
| 2 | 🔍 The Skeptic | unchanged |
| 3 | 💰 Economic Instruments | ↑ from 4 |
| 4 | 🏛️ Founding Order | ↑ from 5 |
| 5 | 🪪 Identity & Personhood | ↑ from 7 |
| 6 | 🗳️ Governance Deep Dive | ↑ from 9 |
| 7 | 📐 Implementer | ↓ from 3 |
| 8 | 🚀 Pilot Readiness | ↓ from 6 |
| 9 | 🏗️ Architectural Integrity | ↓ from 8 |

### 2. Step order fixes inside 4 paths

#### The Skeptic — swap steps 1 and 2

**Problem:** Reader evaluates claims before understanding what the project considers valid evidence.

| Step | Current | Proposed |
|------|---------|----------|
| 1 | Claims_Evidence_Register.md | **Evidence_Ladder.md** |
| 2 | Evidence_Ladder.md | **Claims_Evidence_Register.md** |
| 3–5 | unchanged | unchanged |

**Rationale:** Evidence_Ladder defines the evaluation standard. It must precede the Claims_Evidence_Register so the reader knows what grading system they're using before they see the grades.

#### Implementer — swap steps 3 and 4

**Problem:** Reader hits the locked parameter numbers before understanding what the annex landscape covers.

| Step | Current | Proposed |
|------|---------|----------|
| 1–2 | unchanged | unchanged |
| 3 | founding/commitments.md | **annexes/INDEX.md** |
| 4 | annexes/INDEX.md | **founding/commitments.md** |
| 5–6 | unchanged | unchanged |

**Rationale:** INDEX.md orients the implementer to the full extension layer. The locked values in commitments.md land better once the reader knows what they're committing to.

#### Pilot Readiness — swap steps 3 and 4

**Problem:** Steps 3 and 4 are inverted relative to logical dependency — and inconsistent with the Implementer path which correctly orders N before Q.

| Step | Current | Proposed |
|------|---------|----------|
| 1–2 | unchanged | unchanged |
| 3 | ANNEX_Q.md (min viable stack) | **ANNEX_N.md** (genesis preconditions) |
| 4 | ANNEX_N.md (genesis preconditions) | **ANNEX_Q.md** (min viable stack) |
| 5–6 | unchanged | unchanged |

**Rationale:** ANNEX_N defines the go/no-go gate (preconditions for activation). ANNEX_Q defines what to build. Know whether you're allowed to launch before knowing what to build. Also aligns both paths to consistent N→Q ordering.

#### Founding Order — move jurisdictional_scales from step 6 to step 2

**Problem:** The jurisdictional scales doc is the structural backbone — it defines the 5 governance scales that make subsidiarity, consent, and exit make sense. Currently buried at the end.

| Step | Current | Proposed |
|------|---------|----------|
| 1 | founding/order/README.md | unchanged |
| 2 | founding/order/subsidiarity_rule.md | **founding/order/jurisdictional_scales.md** |
| 3 | founding/order/consent_protocol.md | founding/order/subsidiarity_rule.md |
| 4 | founding/order/exit_protocol.md | founding/order/consent_protocol.md |
| 5 | founding/order/reentry_protocol.md | founding/order/exit_protocol.md |
| 6 | founding/order/jurisdictional_scales.md | founding/order/reentry_protocol.md |

**Rationale:** Jurisdictional scales is the frame, not the conclusion. Once the reader knows the 5 scales, subsidiarity and consent slot into them naturally. Reentry is a reasonable endpoint — it's the edge case that tests exit rights under pressure.

## Paths with no changes

- **First-Time Reader** — arc is well-designed end-to-end
- **Economic Instruments** — floor → currency → civic → calibration → measurement is correct
- **Identity & Personhood** — tightest path in the set, no changes needed
- **Architectural Integrity** — internal order is well-sequenced (docs confirmed in corpus)
- **Governance Deep Dive** — three-tier arc (operational → epistemic → founding governance) holds up

## Out of scope

- Adding new paths
- Changing path descriptions, times, colors, or emojis
- Editing any doc content
- Changing how the reader renders paths (UI unchanged)
