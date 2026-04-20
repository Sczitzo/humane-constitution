# INVARIANTS.md — Constitutional Invariants of The Humane Constitution

**Status:** Tier 1 Protected (unamendable by any supermajority; amendment requires full constitutional refounding under P-014 procedure)  
**Source authority:** Master_Protocol.md, Article I  
**Last reviewed:** See Patch_Log.md

---

## Purpose

This document extracts the core invariants — the non-negotiable laws of the system that no patch, amendment, or governing body may override. Any proposed change that would violate an invariant in this document is categorically rejected by the Formal Acceptance Protocol (FAP) regardless of support level.

Invariants are distinguished from policy parameters (which may be tuned) and founding commitments (which require pilot data). An invariant is a structural constraint whose removal would collapse the architectural guarantee the system is built on.

---

## INV-001 — Survival Is Unconditional

**Statement:** Every confirmed identity holder receives a non-zero LC allocation sufficient to meet the Constitutional Survival Minimum (CSM) at all times. No behavioral condition, contribution record, civic standing, outstanding obligation, or system state may reduce LC below the CSM floor.

**Mechanical boundary:** LC allocation ≥ CSM at all times. The floor is a hard lower bound, not a target.

**Why this is load-bearing:** If survival can be conditioned, it becomes a coercion instrument. Once coercible, the LC lane collapses into EC-equivalence and the instrument separation fails entirely. All downstream guarantees depend on this invariant holding.

**Attack vectors that target this invariant:** T-001 (shadow convertibility), T-007 (definition drift on "essential"), T-018 (PCRP false-trigger exhaustion), T-022 (electoral cycle capture)

---

## INV-002 — Instrument Non-Convertibility

**Statement:** The four instruments — EC, LC, DW, CR — cannot be directly or indirectly converted into one another. No market mechanism, contractual arrangement, proxy transaction, or system state may create a conversion pathway between instruments.

**Mechanical boundary:**
- LC → EC conversion: prohibited
- EC → LC conversion: prohibited (LC is issued by the system, not purchased)
- DW/CR → EC or LC conversion: prohibited
- Cross-instrument collateralization: prohibited

**Why this is load-bearing:** When survival and market participation ride the same instrument, currency becomes a mechanism for imposing prior claims on future labor — the structural transformation Wolf's Economic Trilogy (Part 2) traces as the terminal condition of debt-based monetary systems. A single conversion pathway, however narrow, restores that mechanism. The LC escapes this failure mode precisely because it is non-monetary: it never enters the price system and therefore cannot carry the coercive structure that money inherits from its reflexive domain. The above-ledger bypass (T-001 residual) exploits proximity to this boundary without crossing it; the invariant defines where the boundary is.

**Attack vectors that target this invariant:** T-001, T-025, residual above-ledger bypass

---

## INV-003 — Human Worth Is Not Measured

**Statement:** No instrument, record, score, or system output may represent a quantitative assessment of a person's inherent worth, social value, or moral standing. The Civic Record (CR) records service history and eligibility; it does not score personhood.

**Mechanical boundary:** CR is a eligibility-gating record, not a ranking. No total score, percentile, or comparative metric may be derived from CR and applied to LC access or survival floor eligibility.

**Why this is load-bearing:** A worth-measurement system is a coercion instrument. It creates leverage over behavior by threatening score reduction. This reintroduces the conditional survival failure mode through a non-monetary channel.

**Attack vectors that target this invariant:** T-007 (definition drift reframing CR as a worth score), T-008 (bureaucratic elite using verification authority to construct implicit rankings)

---

## INV-004 — Influence Cannot Be Purchased

**Statement:** EC holdings, LC allocation level, and any quantity of any instrument may not be exchanged for, converted into, or used to acquire Deliberation Weight (DW) or any other formal governance standing.

**Mechanical boundary:** DW is issued by the system on contribution and participation criteria only. No secondary market for DW may exist. No EC expenditure pathway to governance influence may exist.

**Why this is load-bearing:** If economic position translates to governance weight, the system reproduces the failure mode of purchased political influence through a legitimated channel. The civic layer loses independence from the market layer.

**Attack vectors that target this invariant:** T-016 (FAP capture), T-022 (electoral cycle capture)

---

## INV-005 — Reality Anchoring

**Statement:** LC issuance is capped by verified physical delivery capacity. No LC may be issued against commitments, promises, projections, or financial instruments. Issuance requires physical ground-truth confirmation from at least one oracle node using direct sampling methodology.

**Mechanical boundary:** LC issued ≤ verified physical capacity at time of issuance. The capacity figure must be confirmed by at least one Tier-3 (physical sampling) oracle node.

**Philosophical grounding:** A legitimate system must be constrained by conditions it did not produce and cannot redefine. The physical delivery capacity of food, shelter, healthcare, and transit exists independently of the monetary system and cannot be inflated by belief, expectation, or financial engineering. LC issuance against verified physical capacity keeps the survival floor anchored to the non-reflexive domain — the domain of facts that exist whether or not anyone believes in them. This distinction, between the reflexive domain (prices, credit, expectations shaped by participant beliefs) and the non-reflexive domain (physical resources and capacity that exist independently), provides the foundational justification for this invariant. A system that issues survival claims against reflexive-domain assets — against financial instruments, projections, or promises — inherits those assets' susceptibility to measurement drift and self-referential failure. The Tier-3 physical sampling requirement ensures that at least one grounding point cannot be relocated into the reflexive domain through methodological redefinition. *(Philosophical grounding: Wolf, Economic Trilogy Part 1: Foundation, 2026)*

**Why this is load-bearing:** If issuance is decoupled from physical capacity, LC becomes a financial instrument subject to inflation, speculation, and supply manipulation. The survival floor becomes nominal rather than real — a promise denominated in a unit that drifts from what it claims to represent, precisely the failure mode this protocol was designed to correct.

**Attack vectors that target this invariant:** T-006 (measurement lag), T-012 (PCRP oracle poisoning), T-020/T-021 (epistemological/algorithmic oracle capture), T-024 (SQ oracle failure)

---

## INV-006 — Separation of Verification and Benefit

**Statement:** No entity that administers, verifies, or governs LC issuance or identity confirmation may simultaneously be a beneficiary of the outcomes it controls. Verification infrastructure must be structurally independent of benefit delivery infrastructure.

**Mechanical boundary:** No individual or organization may hold both verification authority and primary beneficiary status in the same subsystem. Structural independence is required, not just disclosed conflict-of-interest.

**Why this is load-bearing:** Verification authority over survival-linked systems is a concentrated leverage point. Combined with beneficiary status, it creates the conditions for bureaucratic elite formation (T-008) and definition drift (T-007) within a single actor.

**Attack vectors that target this invariant:** T-008, T-016

---

## INV-007 — Temporal Asymmetry of Amendment

**Statement:** Constitutional invariants (Tier 1) may not be amended by any process available to current governance actors. Policy parameters (Tier 3) may be amended by standard FAP process. Founding commitments (Tier 2) require supermajority plus adversarial panel review.

**Mechanical boundary:**
- Tier 1 (invariants): unamendable by any in-system process
  - **Two-key architectural precondition (P-034):** Any patch proposal tagged `modifies_tier1=True` must carry a cryptographic attestation from the standing adversarial panel member (nominated per AH2.3) before it enters FAP intake. The FAP reviewer's authority does not include the ability to override the absence of this attestation. Absence = automatic non-reviewable rejection at intake. A captured or mistaken FAP reviewer cannot unilaterally admit a Tier-1-touching proposal.
- Tier 2 (founding commitments): amendable by supermajority + adversarial panel
- Tier 3 (operational parameters): amendable by standard FAP

**Why this is load-bearing:** An amendable invariant is not an invariant. The amendment pathway itself becomes an attack surface. Tier 1 protection converts an invariant from a policy commitment to a structural constraint. Without the two-key precondition, a single captured FAP reviewer constitutes the entire enforcement gate — a single point of failure that voids all seven invariants simultaneously (T-016). The precondition adds a structurally independent second key that no in-system actor can override.

**Attack vectors that target this invariant:** T-007, T-016, T-022

---

## Invariant Violation Detection

**Structural precondition check (P-034 — applied before all items below):**  
Any patch tagged `modifies_tier1=True` must carry a valid cryptographic attestation from the standing adversarial panel member before it can be accepted for review. If the attestation is absent or invalid, the patch is returned to the submitter without any invariant analysis. The FAP reviewer has no authority to waive this precondition.

Any patch proposal submitted to FAP is evaluated against this document before technical review. A proposal that:

1. Reduces the CSM floor (violates INV-001)
2. Creates a conversion pathway between instruments (violates INV-002)
3. Introduces a personhood scoring mechanism (violates INV-003)
4. Creates an EC-to-governance pathway (violates INV-004)
5. Permits issuance without physical verification (violates INV-005)
6. Merges verification and beneficiary authority (violates INV-006)
7. Proposes Tier 1 amendment through in-system process (violates INV-007)

...is rejected at intake without proceeding to technical review. The FAP reviewer documents the violation by invariant ID.

---

## Open Question

The invariants in this document are themselves subject to the bootstrap problem (T-017): their authority derives from the founding instrument (P-014), which was itself constituted by a founding coalition whose legitimacy cannot be fully grounded without circularity. This is documented as a known residual risk, not a resolved problem. See Acceptance_Protocol.md Section 2 and Threat_Register.md T-017.
