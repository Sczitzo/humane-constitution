# Architecture — Tier 1 Amendment Protocol

**Status:** ACTIVE — Proposal 1 close-out, 2026-04-18
**Authority:** Tier 1 (H-3 Refounding Convention)
**Governs:** Every modification to entries in `architecture/parameter_registry.md`, to `Humane_Constitution.md §0`, to `Annex Y §Y1`, and to Tier 1 rows of `/founding/commitments.md`.

**Bound commitments:**
- **FC-110** `TIER1_AMENDMENT_SIGNATURES_MIN` = **7 of 9** (M-of-N)
- **FC-111** `TIER1_AMENDMENT_TIMELOCK_DAYS` = **180 days**

---

## Purpose

The amendment protocol is the mechanical procedure by which the Tier 1 invariants can legitimately be changed. Its design goal is to make amendment **possible but difficult**, with difficulty calibrated to the stakes — Tier 1 invariants govern survival floors, instrument separation, measurement architecture, and governance thresholds, and hostile modification of any of them would be a category of failure the protocol exists to prevent.

The protocol borrows the M-of-N signature pattern from financial-grade custody and the timelock pattern from on-chain governance. Neither pattern originates on blockchains; both formalize long-standing constitutional-engineering ideas (e.g., supermajority requirements with delayed effect). The innovation is making these mechanical, publicly verifiable, and independent of any single operating body's compliance.

---

## Section 1 — The M-of-N Signature Requirement (FC-110)

### 1.1 — Holder Count (N = 9)

The full set of **dispersed Tier 1 key-holders** is nine individuals, named at founding and rotated on a schedule specified in §4. These nine are:

- Geographically distributed: no two holders may reside in the same locality (≤5,000 persons per Annex Y scale definitions at FC-122) during their term. At most 2 holders per region (≤500,000 persons).
- Institutionally diverse: no three holders may share affiliation with a single institution (governmental body, corporation, NGO, religious body, academic institution).
- Subject-area diverse: at least one holder from each of: measurement/technical methodology; legal/constitutional expertise; community/civic-practice expertise; adversarial/red-team methodology (this seat parallels FC-033 oracle adversarial seats and Annex AL §5.1 panel adversarial seat); international/federation perspective (for multi-jurisdiction protocols).

Holder identity is public. Holder cryptographic keys are maintained under the holder's personal custody using hardware security modules or equivalent, with recovery procedures documented per §4.3.

### 1.2 — Signature Threshold (M = 7)

A valid Tier 1 amendment requires **7 of 9** holder signatures. The choice of M = 7 balances:

- **Resilience against loss.** Up to 2 holders can be unavailable (death, incapacity, unavailability, corrupted key material) without breaking the amendment pathway. Amendment remains possible at N=7 of N_available=7 or N_available=8.
- **Resistance to capture.** An adversary must capture at least 7 of 9 holders to force an amendment. Capturing 3 is sufficient to *block* amendments (since N − 3 = 6 < 7), but blocking is not the same as forcing — a captured minority cannot alter the invariants, only prevent their improvement.
- **Resistance to coercion.** With N = 9 distributed, captured, or coerced holders can be identified and publicly named (since the identity set is public). A holder acting under coercion has the option to refuse signing, reducing available holders below 7 and forcing the amendment into the Founding Order exit / federated Ombuds response path rather than succeeding.

Simulations and derivation notes are preserved in `/founding/commitments.md` FC-110.

### 1.3 — Signing Process

Each holder, upon receiving a proposed amendment:
1. Receives the full text of the proposed amendment, the existing registry, and the proposed new registry state.
2. Computes, independently, the SHA-256 hash of the proposed new state (per `invariants.md` §Invariant Hash Chain).
3. Verifies the hash against the hash included in the amendment proposal; refuses to sign any proposal where these do not match.
4. Verifies the procedural requirements (§2) have been met.
5. Signs the hash with their personal key if and only if they affirm the amendment.
6. Publishes the signature to the public amendment log.

The amendment becomes eligible for the timelock only when 7 distinct holder signatures are published on the public log, each verifying the same hash.

### 1.4 — Key Rotation and Recovery

- **Routine rotation.** Every 24 months, each holder rotates their key; prior keys are formally revoked. Rotation is staggered (no more than 2 holders rotating in any single 90-day window) to preserve continuous threshold availability.
- **Emergency rotation.** If a holder's key is compromised, lost, or the holder is reasonably believed to be under coercion, an emergency rotation is initiated through the remaining holders. The emergency rotation itself requires 6-of-8 signatures from the remaining holders and the federated Ombuds certification that the circumstances warrant emergency rotation.
- **Succession.** Holders serve fixed terms (see §4); succession is through a federation-level nominating process with no single body able to appoint more than 2 holders in any 24-month window. Succession candidates are vetted for the geographic / institutional / subject-area diversity criteria in §1.1.

---

## Section 2 — Procedural Requirements

A valid Tier 1 amendment proposal must include:

1. **Plain-language summary.** A lay-readable description of what the amendment changes, who is affected, and the coalition proposing it. Minimum: 500 words; maximum: 2000.
2. **Redline text.** Exact current text and exact proposed text for every file affected (invariants.md, Humane_Constitution.md §0, Annex Y §Y1, commitments.md Tier 1 rows, as applicable).
3. **Invariant impact statement.** Which Humane Constitution §0 invariants the amendment affects; whether the amendment narrows, broadens, or holds constant each invariant.
4. **Threat impact.** Registered threats (Threat Register) whose risk score changes; new threats introduced; residual risks after amendment.
5. **Migration plan.** Operational transition — how running services update their pinned references (per `implementation_binding.md`), how in-flight transactions are handled, whether the amendment has retroactive effect.
6. **Rollback plan.** Under what conditions the amendment would be rolled back and through what process.
7. **Asymmetric error analysis.** For amendments affecting survival floors, identity, or measurement: the specific population affected and the direction of error (false-positive exclusion vs. false-negative inclusion) and the trade-off decision rule.
8. **Fiscal / capacity note.** Resource implications for CSM reserves, operating budget, infrastructure capacity.
9. **Privacy / surveillance note.** Whether the amendment creates or requires new data collection; whether existing data uses are narrowed or broadened.

Missing or materially-deficient sections are grounds for holders to refuse signing. The federated Ombuds (Annex AI) may also issue a formal deficiency finding, though the Ombuds cannot veto a proposal — only the holders' refusal to sign or the timelock procedural gates can prevent a defective proposal from advancing.

---

## Section 3 — Timelock (FC-111)

Once 7 holder signatures are registered on the public amendment log, the amendment enters a **180-day timelock** before taking effect.

### 3.1 — What the Timelock Does

During the 180-day window:
- The amendment is published on the drift chain as a **proposed-but-not-effective** version.
- All operational components continue to enforce the prior (current) state.
- Counter-proposals may be submitted through the standard amendment process.
- Founding Order jurisdictional exit proposals (§FC-120/121) may be initiated in response.
- The federated Ombuds (Annex AI) produces a formal Tier 1 Amendment Integrity Report within 60 days of signature registration, covering: procedural compliance, substantive analysis of invariant impact, adversarial-pressure assessment (was any holder coerced? was the threshold manufactured?).
- Public comment is collected and archived on the amendment log.
- Holders may revoke their signatures at any time before the timelock expires. A signature revocation that drops the count below 7 aborts the amendment.

### 3.2 — Why 180 Days

180 days is six calendar months. The derivation (preserved in `/founding/commitments.md` FC-111):
- A captured supermajority (7 of 9 holders aligned with a hostile coalition) cannot typically survive unchanged for 180 days in a healthy polity — political cycles, public scrutiny, and normal information flows produce reactive pressure within that window.
- Shorter windows (30, 60, 90 days) are insufficient for the federated Ombuds to complete its integrity report and for civil society to respond at scale.
- Longer windows (365 days, 2 years) create a governance paralysis surface where any proposed change becomes impossible in practice even when genuinely needed.
- 180 days is calibrated to the protocol's observation that significant institutional capture tends to weaken or reveal itself within one standard political-cycle length.

### 3.3 — Timelock Completion

At the end of the 180-day window:
- If 7 signatures remain valid (no revocations dropped count below threshold) and no procedural deficiency has been found, the amendment takes effect.
- The drift chain records the new version as the current head.
- Operational components, on their next startup or scheduled hash recheck, adopt the new pinned reference.
- The prior version is archived (not deleted) in the drift chain.

If signatures have dropped below threshold, procedural deficiency is found, or the amendment has been withdrawn: the amendment does not take effect; the drift chain records the failed attempt in an audit-archive section (publicly visible) but does not advance the head.

---

## Section 4 — Holder Terms and Continuity

### 4.1 — Term Length

Holder term length: **6 years**, staggered such that no more than 2 seats are up for succession in any 18-month window. This preserves continuous threshold availability during transitions.

### 4.2 — Term Limits

No holder may serve more than 2 consecutive terms (12 years). After a term limit is reached, a minimum 6-year gap before the individual may be re-nominated. This prevents the formation of entrenched holder dynasties that could accumulate undue influence over the amendment process.

### 4.3 — Recovery

If a holder's key is lost, compromised, or the holder is incapacitated:
- Emergency rotation per §1.4 replaces the key.
- If the holder themselves cannot continue, their term ends early; succession per §4.4 fills the seat.
- During the emergency rotation window (typically ≤30 days), the M threshold is reduced proportionally: with 8 active holders, M = 6 of 8 remains a 75% threshold (the same ratio as 7 of 9 — 77.8%, approximately); with 7 active, M = 5 of 7 (71%) is used, preserving the supermajority principle but recognizing reduced redundancy. Amendments during such windows require additional scrutiny per the federated Ombuds integrity report.

### 4.4 — Succession

Succession candidates are nominated through a federation-level process that:
- Accepts nominations from any federated jurisdiction (no single government or institution may monopolize nomination).
- Vets candidates against the diversity criteria in §1.1.
- Produces a slate of 3 candidates per vacancy.
- Final selection is by a supermajority vote of the sitting holders (this is *not* a Tier 1 amendment — it is the operational selection of successor holders, governed by the amendment protocol itself rather than by Tier 1 invariant amendment).

---

## Section 5 — Failure Modes and Responses

### 5.1 — Insufficient Holders Available

If fewer than 7 holders are ever simultaneously available (e.g., a mass-casualty event affecting multiple holders in a short window), **no Tier 1 amendments can be made until the threshold is restored through emergency rotation and succession**. Operational components continue to enforce the current state. This is a designed feature: if the holder set cannot reach a quorum, the protocol holds at its current state rather than permitting amendment by a reduced-quorum subset.

### 5.2 — Captured Majority

If ≥7 holders are captured by a hostile coalition, the amendment process remains procedurally valid — the protocol's own rules allow this coalition to propose and carry an amendment. Response paths:
- **Timelock** (180 days) provides response window.
- **Federated Ombuds** Integrity Report will surface concerns.
- **Founding Order exit** (FC-120, FC-121) allows jurisdictions to exit the federation in response rather than accept the amendment.
- **Drift chain public visibility** ensures the amendment cannot be concealed.

The protocol does not claim to prevent capture by a majority-of-holders coalition with sufficient political will — that is the scope of constitutional politics, not architectural enforcement. The architectural enforcement guarantees **visibility** and **response time**, not immunity.

### 5.3 — Coerced Single Holder

If a single holder is coerced (e.g., threats to family), the holder's best response is to **decline signing**. A declined signature reduces available holders relative to the threshold, which either:
- Prevents the amendment (if available holders drop below 7).
- Forces the coalition to seek additional holders, each of whom provides another coercion-resistance checkpoint.

Coerced holders may also confidentially alert the federated Ombuds, who issues a finding and initiates emergency rotation (§1.4) to replace the compromised key without revealing the coercion publicly (to prevent retaliation).

---

## Section 6 — Governance of This Protocol Itself

Changes to this amendment protocol (M, N, timelock days, procedural requirements, holder diversity criteria) are themselves **Tier 1 amendments** requiring 7-of-9 signatures and a 180-day timelock. This is recursive — the protocol cannot be amended into a weaker protocol through a weaker process.

The only exception is the **Refounding Convention** authority (H-3 per Humane Constitution Annex H), which can restructure the amendment protocol itself but is itself a Tier 1-grade collective action requiring supermajority ratification at the federation level.

---

*This document is part of the Humane Constitution's architectural-enforcement layer. Operative as of Proposal 1 close-out (2026-04-18). It is the mechanical specification by which the Tier 1 invariants in `invariants.md` and Humane Constitution §0 may be legitimately changed.*
