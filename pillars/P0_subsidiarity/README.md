# Founding Order — Subsidiarity, Consent & Exit

**Status:** ACTIVE — Proposal 5 close-out, 2026-04-18
**Authority:** Tier 1 (FC-120 exit supermajority, FC-121 unwind window, FC-122 scale tiers).
**Scope:** Foundational layer beneath every constitutional article. The Founding Order defines *who consents to be governed by this protocol, at what scale, on what matters, and how they withdraw.*

---

## The Problem the Founding Order Resolves

Every major operating component in the prior protocol operated under an implicit assumption: that the continental federation is the default scale of decision, and that participation is a standing condition rather than a renewable act. That assumption had three costs:

1. **It presumed consent without producing it.** A protocol that binds units which have not affirmatively consented is, in classical-liberal terms, coercive regardless of how just its internal rules are.
2. **It centralized by default.** Decisions flowed upward unless the protocol explicitly authorized a smaller scale — the inverse of Ostrom's principle 2 (rules match local conditions) and of subsidiarity as articulated from Althusius through Catholic social teaching.
3. **It had no exit.** Any internal protection is only as robust as the captors' willingness to honor it. Without a defined exit, a captured federation could narrow every protection to the point of meaninglessness and no unit would have a legitimate, published pathway out.

The Founding Order closes all three gaps at the architectural layer.

---

## The Three Rules

### Rule 1 — Subsidiarity

Decisions default to the smallest viable unit. The **Federation** (continental scope) is the exception, not the default. See `subsidiarity_rule.md` for the test that determines when a matter may be escalated above the smallest competent scale.

### Rule 2 — Consent-of-Founding

No unit is bound by the protocol without an affirmative, published consent event. Dissenting units retain pre-protocol arrangements, with a narrow carve-out for Tier 1 human-dignity invariants (survival floor / CSM) that bind everywhere regardless. See `consent_protocol.md`.

### Rule 3 — Exit

Any unit of locality scale or larger may, by **2/3 resident-personhood supermajority** (FC-120), initiate a **730-day graceful-exit unwind** (FC-121). During unwind, LC continuity is preserved for individuals, EC is convertible, civic balances decay normally. Re-entry is permitted by the same mechanism in reverse. See `exit_protocol.md` and `reentry_protocol.md`.

---

## Jurisdictional Scales (FC-122)

| Scale | Upper bound | Typical decision domain |
| :--- | :--- | :--- |
| **Household** | Family unit (no formal ceiling) | Intra-household resource allocation, substitution choices within Annex Y schedule, private voluntary exchange |
| **Neighborhood** | ≤500 persons | Local coordination, shared-infrastructure stewardship, first-tier dispute mediation |
| **Locality** | ≤5,000 persons | Local SQ adaptation (within federation envelopes), local CRP representation, municipal-equivalent civic process |
| **Region** | ≤500,000 persons | Regional measurement infrastructure (oracle cohort support), regional enforcement, regional CRP delegation |
| **Federation** | Continental scope | Tier 1 invariants, EC/LC non-convertibility, inter-regional dispute resolution, cross-unit externalities |

See `jurisdictional_scales.md` for boundary rules, population-threshold behavior at scale boundaries, and the "multi-scale competence" test.

---

## What the Founding Order Does NOT Touch

The Founding Order is a scale-and-consent layer. It does **not**:

- Repeal any Tier 1 human-dignity invariant. CSM (Annex Y §Y1) binds everywhere the protocol reaches, including during exit unwind. A unit cannot vote to starve its residents.
- Repeal EC/LC non-convertibility. The instrument-level architecture is federation-scale by design (cross-unit externalities require a federation-level rule).
- Create new central authority. Every Founding Order rule reduces or constrains the federation's default reach; no rule extends it.
- Override individual personhood. Exit is a unit-level right but does not override the individual's right to remain within the protocol by relocation. The unwind window exists precisely to make individual relocation feasible.

---

## How the Founding Order Interacts with the Rest of the Protocol

- **Master Protocol §0** — the Founding Order is the foundational layer beneath the current seven articles. The §0 invariants (survival unconditional, CSM floor, separation of concerns, etc.) are federation-scale and not subject to unit-level modification or unit-level exit.
- **Articles I–VII** — each article is read through the Founding Order: its default scale is the smallest competent unit; its exceptions-to-smallest-scale are specified with subsidiarity rationale.
- **Founding commitments** — FC-120, FC-121, FC-122 are the numerical anchors for the Founding Order. They are Tier 1 protected per `/architecture/invariants.md` (Category D — Governance & Exit).
- **Architecture layer** — the Founding Order integrates with the drift chain: a unit-exit event is drift-chain-logged (new row, federation scope reduced, signatures of the exiting unit's representatives and 7 of 9 Tier 1 holders acknowledging). An exit cannot proceed silently.
- **Threat Register** — two new threat classes: T-026 "Exit Denial" and T-027 "Subsidiarity Violation." See the register for mechanism and mitigation.

---

## Files in This Directory

| File | Purpose |
| :--- | :--- |
| `README.md` | This overview |
| `subsidiarity_rule.md` | Smallest-unit-first decision rule and escalation test |
| `consent_protocol.md` | Founding-consent event requirements |
| `exit_protocol.md` | FC-120 supermajority + FC-121 730-day unwind procedure |
| `reentry_protocol.md` | Rejoining protocol after prior exit |
| `jurisdictional_scales.md` | FC-122 scale-tier definitions with boundary behavior |

---

## Governance of the Founding Order

This entire directory is Tier 1 protected per `/architecture/invariants.md`. Changes to the subsidiarity rule, consent rule, exit threshold (FC-120), unwind window (FC-121), or scale tiers (FC-122) require the full amendment protocol (7-of-9 signatures, 180-day timelock).

Extension — adding finer-grained scales (e.g., sub-neighborhood clusters for specific decision classes), adding consent mechanisms, or strengthening exit rights — may proceed by Tier 2 amendment. **Weakening any Founding Order right requires Tier 1 amendment with the full H-3 Refounding Convention.**

---

*The Founding Order is the answer to "does this protocol respect the people it governs?" The answer is: only to the extent that they can decline it, customize it at their own scale, and leave it at bounded cost. The Founding Order makes all three operative.*
