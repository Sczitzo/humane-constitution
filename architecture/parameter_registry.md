# Architecture — Tier 1 Invariant Enforcement

**Status:** ACTIVE — founding-layer architectural specification (Proposal 1 close-out, 2026-04-18)
**Authority:** Tier 1 (H-3 Refounding Convention). This file, the amendment protocol (`amendment_protocol.md`), and the drift chain (`drift_chain.md`) together constitute the architectural-layer enforcement that prevents the Tier 1 invariants from being hollowed out through code, configuration, or implementation drift.

**Anchors:** Humane Constitution §0 Non-negotiable Invariants; Annex Y §Y5 CSM Amendment Lock; `/founding/commitments.md` Tier 1 rows.

---

## Why an Architectural Layer

The Tier 1 invariants stated at Humane Constitution §0 — survival is unconditional, CSM floor, human worth not measured, separation of concerns, influence cannot be purchased, reality anchoring, due process — are textual. Text is amendable. The H-3 Refounding Convention requirement states who may amend and under what process, but the day-to-day operation of the protocol is in running systems: the Essential Access issuance service, the Voice decay scheduler, the demurrage calculator, the oracle quorum checker, the Scarcity Protocol activator, the identity ledger, and the Service Record tabulator.

**If the Tier 1 invariants are enforced only in text, they are protected only to the extent that the implementors agree to read the text.** An implementor who does not read the text — or who reads it and is instructed by a captured governance body to deploy a parameter change that implicitly narrows an invariant — has no architectural obstacle. The H-3 process protects against explicit repeal; it does not protect against silent drift at the implementation layer.

This architectural layer closes the silent-drift gap by making Tier 1 invariants **mechanically inviolable** — encoded as cryptographic locks, multi-signature thresholds, and timelock gates that execute independently of any single operating body's intentions.

The design takes the pattern from financial-grade custody (M-of-N signing) and public-blockchain governance (on-chain timelocks with public visibility), not because the protocol is a blockchain but because those systems solved the same problem: how to make a critical parameter changeable in principle but not changeable by any single actor or coalition below the required threshold.

---

## The Architectural Enforcement Model

Four elements, each addressed in a dedicated file:

| Element | File | Enforces |
| :--- | :--- | :--- |
| **Invariant registry** | `invariants.md` (this file) | Enumerates every architecturally-locked parameter and value with references to Tier classification, source commitment, and enforcement mechanism. |
| **Amendment protocol** | `amendment_protocol.md` | Specifies M-of-N signature threshold (FC-110), timelock (FC-111), and procedural gates for changing any Tier 1 entry in this registry. |
| **Drift chain** | `drift_chain.md` | Version-chained hash history of `/founding/commitments.md`, `Humane_Constitution.md` §0, and Annex Y §Y1, published to a tamper-evident ledger so that silent modification is detectable. |
| **Implementation binding** | `implementation_binding.md` | Requirement that every operational service component (Essential Access issuer, Voice scheduler, oracle gate, etc.) verifies the current drift-chain hash of this registry at startup and refuses to operate if the hash does not match the operator's pinned reference. |

---

## Tier 1 Invariant Registry

The following parameters are **Tier 1 architecturally locked**. Change requires the full amendment protocol (M=7 signatures from N=9 geographically-distributed holders, 180-day timelock, H-3 Refounding Convention authority per Humane Constitution Annex H). No operational body, including the CRP, the REB, the Enforcement Panel, or the federated Ombuds, may modify these values.

### Category A — Survival Floor (CSM)

| Parameter | Current Value | Source | Change Authority |
| :--- | :--- | :--- | :--- |
| CSM Caloric minimum (adult) | 2,100 kcal/day | Annex Y §Y1.1 | Tier 1 (H-3) downward; Tier 2 upward |
| CSM Water minimum | 50 L/person/day | Annex Y §Y1.2 | Tier 1 (H-3) downward |
| CSM Shelter minimum | 3.5 m²/person, 16–28°C | Annex Y §Y1.3 | Tier 1 (H-3) downward |
| CSM Medical response floor (urban) | 60 min | Annex Y §Y1.4 | Tier 1 (H-3) downward |
| CSM Sanitation minimum | 1 toilet / 20 persons | Annex Y §Y1.5 | Tier 1 (H-3) downward |
| CSM Mental-health response (crisis) | 24/7 availability, ≤4h in-person | Annex Y §Y1.6 | Tier 1 (H-3) downward |
| CSM Essential medicines continuity | 30-day WHO Model List | Annex Y §Y1.7 | Tier 1 (H-3) downward |
| Reserve window | 45 days × CSM × population | FC-070 | Tier 1 (H-3) |
| CSM issuance independence | Governance-actor-independent (automatic) | Annex Y §Y2 | Tier 1 (H-3) |
| Substitution protocol | Specified schedule only (no discretionary exchange) | Annex Y §Y3 | Tier 1 (H-3) |

### Category B — Instrument Separation (Non-Convertibility)

| Parameter | Current Value | Source | Change Authority |
| :--- | :--- | :--- | :--- |
| Flow ↔ Essential Access boundary | No direct or proxy conversion; violations governed by Annex AJ §4 | Humane Constitution §II non-convertibility | Tier 1 (H-3) |
| Voice / Service Record ↔ Flow boundary | No civic standing as allocation preference in non-civic domains | Annex AJ §AJ-2 | Tier 1 (H-3) |
| Scarcity Protocol ↔ Flow boundary | No Flow premium for scarcity-rationed access | Annex AJ §AJ-3 | Tier 1 (H-3) |
| Protected Pause floor | 0.30 Voice | FC-020 | Tier 1 (H-3) |
| Voice sector ceiling | 0.20 | FC-060 | Tier 1 (H-3) |

### Category C — Measurement Architecture

| Parameter | Current Value | Source | Change Authority |
| :--- | :--- | :--- | :--- |
| Oracle N_MIN | 5 | FC-030 | Tier 1 (H-3) |
| Methodology-class minimum | 3 distinct classes per cohort | FC-031 | Tier 1 (H-3) |
| Pairwise oracle error correlation max | 0.30 Pearson | FC-032 | Tier 1 (H-3) |
| Adversarial oracle seats minimum | 1 per cohort | FC-033 | Tier 1 (H-3) |
| Oracle quorum-loss restoration window | 14 days | FC-100 | Tier 1 (H-3) |
| Acceptable measurement error (food, water, energy, medicine) | ±5%, ±3%, ±5%, ±5% | FC-001, FC-002, FC-004, FC-005 | Tier 1 (H-3) |
| CSM cluster failure threshold | 3 per 10,000 residents per 30 days | FC-071 | Tier 1 (H-3) |

### Category D — Governance & Exit

| Parameter | Current Value | Source | Change Authority |
| :--- | :--- | :--- | :--- |
| Tier 1 amendment signature threshold | 7 of 9 (M-of-N) | FC-110 | Tier 1 (H-3, recursive) |
| Tier 1 amendment timelock | 180 days | FC-111 | Tier 1 (H-3, recursive) |
| Ombuds sub-count minimum | 5 sub-nodes | FC-090 | Tier 1 (H-3) |
| Ombuds supermajority threshold | 4 of 5 | FC-091 | Tier 1 (H-3) |
| Founding Order exit supermajority threshold | 2/3 resident personhood | FC-120 | Tier 1 (H-3) |
| Founding Order exit unwind window | 730 days (2 years) | FC-121 | Tier 1 (H-3) |
| Founding Order subsidiarity scales | household / neighborhood / locality / region / federation | FC-122 | Tier 1 (H-3) |

---

## Enforcement: How Architectural Locking Works

### Invariant Hash Chain

1. At each amendment (including founding): a canonical serialization of this file, `Humane_Constitution.md §0`, `Annex Y §Y1`, and `/founding/commitments.md` is produced and SHA-256 hashed.
2. The hash is recorded in `drift_chain.md` as a new version row, with the prior-version hash chained into the new-version commitment (standard hash-chain construction).
3. Every operating node — Essential Access issuer, oracle gate, Voice scheduler, enforcement dashboard — on startup retrieves the current drift-chain head and compares against the operator-pinned reference. Mismatch triggers refuse-to-operate with an alert to Article VII monitoring.
4. Changes to any Tier 1 parameter require a new version with M-of-N signatures per `amendment_protocol.md`. Unsigned or insufficiently-signed changes cannot advance the drift chain.

### Why Cryptographic and Not Merely Textual

Text-only invariants are protected by the good-faith reading of the text. Cryptographic invariants are protected by:
- **Any operator node can detect tampering** — startup hash check is a small, deterministic operation.
- **Tampering is public** — the drift chain is published; silent unilateral change produces visible chain divergence.
- **Valid amendment requires threshold of holders** — the 7-of-9 signature requirement means no single captured holder or pair can force a change; M-of-N with distributed holders is resilient to coercion of a minority.
- **Timelock creates response window** — the 180-day delay between proposal and effect means even a valid amendment provides civil society, the federated Ombuds, and uncaptured jurisdictions 6 months to respond (e.g., by proposing a counter-amendment, by exercising Founding Order exit rights, or by alerting the public).

### What This Layer Does Not Do

It does not prevent a coalition from meeting the M-of-N threshold and waiting out the timelock. That coalition, by construction, represents the required authority under the protocol's own amendment rules. This layer prevents **capture below the amendment threshold** from silently narrowing the invariants. Defense against legitimate-but-hostile amendment through the valid M-of-N process relies on:
- The 180-day timelock (time for response),
- The Founding Order exit pathway (ability to leave — FC-120, FC-121),
- The federated Ombuds annual integrity audit (Proposal 8),
- Public scrutiny via the drift chain's published divergence.

---

## Relationship to Other Architecture Files

- **`amendment_protocol.md`** — defines the mechanical amendment procedure (who signs, with what keys, under what timelock, with what public-notice requirements).
- **`drift_chain.md`** — the append-only version history of this registry's hash, with each row signed per the amendment protocol.
- **`implementation_binding.md`** — technical requirement that every operational component verify the drift-chain head on startup and refuse to operate on a hash it cannot verify against its pinned reference.

All three files, plus this one, are themselves Tier 1 commitments. Changing the amendment protocol, the drift chain structure, or the implementation binding requirements requires the same 7-of-9 threshold and 180-day timelock as any other Tier 1 change. This is recursive and intentional — the lock itself cannot be quietly unlocked.

---

*This document is part of the Humane Constitution's architectural-enforcement layer. Operative as of Proposal 1 close-out (2026-04-18). It is read on startup by every operational node and verified against the drift chain before any Tier 1-affecting operation is permitted.*
