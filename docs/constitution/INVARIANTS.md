# INVARIANTS.md — Constitutional Invariants of The Humane Constitution

**Status:** Tier 1 Protected (changeable only via the Tier 1 amendment process — 7-of-9 keyholder signatures and 180-day timelock; amendment of the amendment mechanism itself requires H-3 refounding authority; P-014 was the founding instrument and is now permanently closed)  
**Source authority:** Humane_Constitution.md, Article I  
**Last reviewed:** See Patch_Log.md

---

## Purpose

This document extracts the core invariants — the non-negotiable laws of the system that no patch, amendment, or governing body may override. Any proposed change that would violate an invariant in this document is categorically rejected by the Formal Acceptance Protocol (FAP) regardless of support level.

Invariants are distinguished from policy parameters (which may be tuned) and founding commitments (which require pilot data). An invariant is a structural constraint whose removal would collapse the architectural guarantee the system is built on.

## Plain-Language Guide

An invariant is a rule the system is never allowed to break. These are not normal policy choices. They are the load-bearing promises.

In plain terms:

- Everyone keeps enough Essential Access to survive.
- The five instruments cannot be traded into each other.
- The system cannot score a person's worth.
- Money cannot buy governing power.
- Survival access can only be issued when real food, shelter, care, and transport capacity exists.
- The people checking the system cannot also be the people who benefit from changing the numbers.
- These rules cannot be weakened by ordinary votes or inside procedures.

If a proposed change breaks one of these promises, the answer is no before the detailed review even starts.

---

## INV-001 — Survival Is Unconditional

**Statement:** Every confirmed identity holder receives a non-zero Essential Access allocation sufficient to meet the Constitutional Survival Minimum (CSM) at all times. No behavioral condition, contribution record, civic standing, outstanding obligation, or system state may reduce Essential Access below the CSM floor.

**Mechanical boundary:** Essential Access allocation ≥ CSM at all times. The floor is a hard lower bound, not a target.

**Why this matters:** If survival can be used as a reward or punishment, people can be forced to obey. Essential Access would become another form of money or power, and the whole separation between survival and markets would fail.

**Attack vectors that target this invariant:** T-001 (shadow convertibility), T-007 (definition drift on "essential"), T-018 (PCRP false-trigger exhaustion), T-022 (electoral cycle capture)

---

## INV-002 — Instrument Non-Convertibility

**Statement:** The five instruments — Flow, Essential Access, Voice, Service Record, and Shared Storehouse — cannot be directly or indirectly converted into one another. No market mechanism, contractual arrangement, proxy transaction, or system state may create a conversion pathway between instruments.

**Mechanical boundary:**
- Essential Access → Flow conversion: prohibited
- Flow → Essential Access conversion: prohibited (Essential Access is issued by the system, not purchased)
- Voice and Service Record → Flow, Essential Access, or Shared Storehouse conversion: prohibited
- Shared Storehouse → Flow or Essential Access conversion: prohibited
- Cross-instrument collateralization: prohibited

**Why this matters:** If survival access can be bought, sold, pledged, or traded for other instruments, people with money can gain power over people's basic needs. Essential Access avoids this by staying outside the price system. Even one narrow workaround would reopen the problem.

**Attack vectors that target this invariant:** T-001, T-025, residual above-ledger bypass

---

## INV-003 — Human Worth Is Not Measured

**Statement:** No instrument, record, score, or system output may represent a quantitative assessment of a person's inherent worth, social value, or moral standing. The Service Record records service history and eligibility; it does not score personhood.

**Mechanical boundary:** Service Record is a eligibility-gating record, not a ranking. No total score, percentile, or comparative metric may be derived from Service Record and applied to Essential Access access or survival floor eligibility.

**Why this matters:** A human-worth score becomes a threat. People can be pushed around by the fear of losing status, access, or eligibility. The Service Record may show service history, but it must never become a score for human value.

**Attack vectors that target this invariant:** T-007 (definition drift reframing Service Record as a worth score), T-008 (bureaucratic elite using verification authority to construct implicit rankings)

---

## INV-004 — Influence Cannot Be Purchased

**Statement:** Flow holdings, Essential Access allocation level, and any quantity of any instrument may not be exchanged for, converted into, or used to acquire Voice or any other formal governance standing.

**Mechanical boundary:** Voice is issued by the system on contribution and participation criteria only. No secondary market for Voice may exist. No Flow expenditure pathway to governance influence may exist.

**Why this matters:** If money can buy formal influence, wealthy actors can buy the rules. Voice and Service Record must stay separate from the market lane.

**Attack vectors that target this invariant:** T-016 (FAP capture), T-022 (electoral cycle capture)

---

## INV-005 — Reality Anchoring

**Statement:** Essential Access issuance is capped by verified physical delivery capacity. No Essential Access may be issued against commitments, promises, projections, or financial instruments. Issuance requires physical ground-truth confirmation from at least one oracle node using direct sampling methodology.

**Mechanical boundary:** Essential Access issued ≤ verified physical capacity at time of issuance. The capacity figure must be confirmed by at least one Tier-3 (physical sampling) oracle node.

**Plain grounding:** A system cannot feed, house, or treat people with promises on paper. It needs real capacity: food, shelter, healthcare, and transit that can actually be delivered. Essential Access must be tied to that real-world capacity, not to forecasts, loans, prices, or political confidence. At least one oracle must use direct physical checking so the numbers cannot drift away from reality. *(Philosophical grounding: Wolf, Economic Trilogy Part 1: Foundation, 2026)*

**Why this matters:** If Essential Access is issued without real capacity behind it, it becomes only a promise. The survival floor would look valid on paper while failing in real life.

**Attack vectors that target this invariant:** T-006 (measurement lag), T-012 (PCRP oracle poisoning), T-020/T-021 (epistemological/algorithmic oracle capture), T-024 (Shared Storehouse oracle failure)

---

## INV-006 — Separation of Verification and Benefit

**Statement:** No entity that administers, verifies, or governs Essential Access issuance or identity confirmation may simultaneously be a beneficiary of the outcomes it controls. Verification infrastructure must be structurally independent of benefit delivery infrastructure.

**Mechanical boundary:** No individual or organization may hold both verification authority and primary beneficiary status in the same subsystem. Structural independence is required, not just disclosed conflict-of-interest.

**Why this matters:** The same actor should not be able to check the numbers and benefit from changing them. That creates a strong temptation to bend definitions, hide failures, or build an insider class.

**Attack vectors that target this invariant:** T-008, T-016

---

## INV-007 — Temporal Asymmetry of Amendment

**Statement:** Constitutional invariants (Tier 1) may not be amended by any Tier 2 or Tier 3 process. They are changeable only via the Tier 1 amendment process — 7-of-9 keyholder signatures (FC-110) and a 180-day timelock (FC-111). Policy parameters (Tier 3) may be amended by standard FAP process. Founding commitments (Tier 2) require supermajority plus adversarial panel review.

"Unamendable by any in-system process" is a shorthand that means: no process *below* the Tier 1 threshold may alter any Tier 1 parameter. It does not mean unamendable absolutely. The 7-of-9 + 180-day process IS the in-system Tier 1 mechanism. FC-110 and FC-111 are themselves Tier 1 parameters — the amendment procedure cannot be weakened by any process below its own threshold.

For changes that would themselves alter the amendment mechanism (FC-110 or FC-111), H-3 refounding authority — a full constitutional convention — is required. P-014 was the founding instrument used once at system genesis; it is now permanently closed. H-3 refounding authority is the permanent successor path for constitutional reconstitution.

**Mechanical boundary:**
- Tier 1 (invariants): changeable only via the Tier 1 amendment process (7-of-9 keyholder signatures, FC-110; and 180-day timelock, FC-111). No Tier 2 or Tier 3 process may alter any Tier 1 parameter. FC-110 and FC-111 are themselves Tier 1 parameters — changes to the amendment mechanism itself require H-3 refounding authority.
  - **Two-key architectural precondition (P-034):** Any patch proposal tagged `modifies_tier1=True` must carry a cryptographic attestation from the standing adversarial panel member (nominated per AH2.3) before it enters FAP intake. The FAP reviewer's authority does not include the ability to override the absence of this attestation. Absence = automatic non-reviewable rejection at intake. A captured or mistaken FAP reviewer cannot unilaterally admit a Tier-1-touching proposal.

  > The two-key precondition is a structural hardening measure: it raises the practical cost of amending Tier 1 invariants to near-prohibitive levels within the system. It is not a legitimacy guarantee. The bootstrap problem (T-017) is a residual risk that structural preconditions cannot resolve — the authority of these invariants ultimately derives from the voluntary agreement of participating communities, not from any pre-existing constitutional mandate. The two-key precondition protects against capture and opportunistic revision; it does not substitute for ongoing democratic legitimation of the founding design.

- Tier 2 (founding commitments): amendable by supermajority + adversarial panel
- Tier 3 (operational parameters): amendable by standard FAP

**Why this matters:** A rule that insiders can weaken is not truly protected. Tier 1 rules need a second independent check so one captured reviewer cannot open the door to changing the system's core promises.

**Attack vectors that target this invariant:** T-007, T-016, T-022

![Amendment Tier Pyramid](/images/V-004.png)

---

## Invariant Violation Detection

**Structural precondition check (P-034 — applied before all items below):**  
Any patch tagged `modifies_tier1=True` must carry a valid cryptographic attestation from the standing adversarial panel member before it can be accepted for review. If the attestation is absent or invalid, the patch is returned to the submitter without any invariant analysis. The FAP reviewer has no authority to waive this precondition.

Any patch proposal submitted to FAP is evaluated against this document before technical review. A proposal that:

1. Reduces the CSM floor (violates INV-001)
2. Creates a conversion pathway between instruments (violates INV-002)
3. Introduces a personhood scoring mechanism (violates INV-003)
4. Creates an Flow-to-governance pathway (violates INV-004)
5. Permits issuance without physical verification (violates INV-005)
6. Merges verification and beneficiary authority (violates INV-006)
7. Proposes Tier 1 amendment through in-system process (violates INV-007)

...is rejected at intake without proceeding to technical review. The FAP reviewer documents the violation by invariant ID.

Implementation drift counts as an invariant-warning event when deployed code, generated corpus, runtime configuration, operator pinned reference, or binary hash operationally narrows a Tier 1 invariant without a valid Tier 1 amendment. The warning path is governed by the architecture implementation binding and the Implementation Drift Audit Package. A drift warning does not by itself prove bad faith, but it blocks affected Tier 1-dependent operation until the last valid state, exception rule, or amendment record is established.

---

## Open Question

The invariants in this document are themselves subject to the bootstrap problem (T-017): their authority derives from the founding instrument (P-014), which was itself constituted by a founding coalition whose legitimacy cannot be fully grounded without circularity. This is documented as a known residual risk, not a resolved problem. See Acceptance_Protocol.md Section 2 and Threat_Register.md T-017.
