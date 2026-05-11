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

**Statement:** Every person receives a non-zero Essential Access allocation sufficient to meet the Constitutional Survival Minimum (CSM) at all times. No behavioral condition, contribution record, civic standing, outstanding obligation, or system state may reduce Essential Access below the CSM floor. Confirmation of identity is required to access civic instruments (Voice, Service Record, and deliberative standing) but is never a precondition for survival access.

**Mechanical boundary:** Essential Access allocation ≥ CSM at all times. The floor is a hard lower bound, not a target.

**Why this matters:** If survival can be used as a reward or punishment, people can be forced to obey. Essential Access would become another form of money or power, and the whole separation between survival and markets would fail.

**Attack vectors that target this invariant:** T-001 (shadow convertibility), T-007 (definition drift on "essential"), T-018 (PCRP false-trigger exhaustion), T-022 (electoral cycle capture)

**Implementation:** The two-tier access model (ANNEX_AK §AK8) operationalizes this invariant by separating non-duplication (required for CSM) from identity verification (required only for above-floor services and civic instruments). Tier 0 access is open-access or pseudonymous; no real-world identity is ever a precondition for receiving a CSM allocation.

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

## INV-008 — Money Creation Is Public

**Statement:** No person, enterprise, or institution other than the constitutionally authorized issuance architecture may create Flow or any instrument that functions as Flow. A FAP proposal that would permit private issuance is rejected at intake without proceeding to technical review.

**Mechanical boundary:** Flow issuance is a public function governed by ANNEX_X. Any instrument — digital, contractual, or otherwise — that circulates as a medium of exchange, store of value, or unit of account within the protocol is treated as Flow for purposes of this invariant regardless of its legal label.

**Why this matters:** Private money creation is the primary mechanism by which financial power escapes public accountability. If private actors can issue Flow-equivalents, the non-convertibility firewall fails from outside.

**Attack vectors that target this invariant:** T-001 (shadow convertibility), above-ledger bypass routes

---

## INV-009 — No Fees on Survival

**Statement:** Survival access, Essential Access transactions, and labor income below the household savings floor may not be taxed, charged, or subjected to any system fee — including demurrage — regardless of the instrument used to access them or the administrative form the charge takes.

**Mechanical boundary:** No system process may apply a fee, carrying cost, or deduction to: (a) CSM-tier Essential Access allocations, (b) any Flow balance below the published household savings floor, or (c) any labor income transaction where the income source brings the recipient's balance to or below the floor.

**Why this matters:** A fee on survival is a survival condition in disguise. Even a small carrying cost on the survival floor erodes the unconditional guarantee over time and converts Essential Access into a timed benefit rather than a floor.

**Attack vectors that target this invariant:** T-007 (definition drift on "essential"), demurrage miscalibration against low-balance households

---

## INV-010 — Succession Serves Continuity

**Statement:** Inheritance mechanisms may transfer primary residence and working tools without limit. All other Flow-equivalent transfers above the household savings floor route through a published commons-return process at the rate defined in Article V. The rate is a Tier 2 founding commitment that must be set before deployment.

**Mechanical boundary:** A transfer is a succession transfer if it occurs at death or through an irrevocable inter-vivos trust that removes the transferor's beneficial control. Succession transfers of primary-residence use-rights and working tools (productive capital in active use by the decedent) are exempt. All other succession transfers above the household savings floor are subject to the commons-return rate in Article V.

**Why this matters:** Succession is the primary mechanism by which dynastic wealth recreates itself across generations without labor. The exemption for home and tools protects genuine continuity; the commons-return rate on everything else prevents the accumulation of heritable economic dominance.

**Attack vectors that target this invariant:** PRD-009 (dynasty formation), trust and foundation bypass routes

---

## INV-011 — Legitimacy Requires Human Attestation

**Statement:** No constitutional decision — amendment, activation, founding commitment, or Tier 1 parameter change — may execute by automated process alone. A named, conflict-screened human or panel must attest with full published disclosure before any such decision takes effect.

**Mechanical boundary:** An automated process may prepare, route, draft, or summarize a constitutional decision. It may not execute one. Execution requires: (a) a named natural person or named panel composition, (b) a conflict disclosure published before attestation, and (c) the attestation record publicly available within 24 hours of execution.

**Why this matters:** Automated systems can be captured, misconfigured, or weaponized without visible human decision. Constitutional changes require visible human accountability so that responsibility can be traced, challenged, and corrected.

**Attack vectors that target this invariant:** T-016 (FAP capture through process automation), implementation drift at the execution layer

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
8. Would permit private Flow or Flow-equivalent creation (violates INV-008)
9. Applies any fee, tax, or carrying cost to survival-floor access or below-floor balances (violates INV-009)
10. Would create an uncapped succession transfer mechanism above the household savings floor (violates INV-010)
11. Would permit a constitutional decision to execute without named human attestation (violates INV-011)
12. Would amend any Founding Order file (`founding/order/`) through a sub-Tier-1 process (violates INV-012)

...is rejected at intake without proceeding to technical review. The FAP reviewer documents the violation by invariant ID.

Implementation drift counts as an invariant-warning event when deployed code, generated corpus, runtime configuration, operator pinned reference, or binary hash operationally narrows a Tier 1 invariant without a valid Tier 1 amendment. The warning path is governed by the architecture implementation binding and the Implementation Drift Audit Package. A drift warning does not by itself prove bad faith, but it blocks affected Tier 1-dependent operation until the last valid state, exception rule, or amendment record is established.

---

## INV-LAUNCH-1 — Survival Floor Activation Gate

**Statement:** The system may not begin any operational phase in which survival-floor access is extended to real persons until FC-YT1 (CSM failure pattern-detection trigger) and FC-YT2 (90-day CSM reserve requirement) are confirmed as bound values in `/founding/commitments.md` and independently verified by the Federated Ombuds. The Ombuds verification must publish the specific confirmed values, not merely confirm that confirmation occurred.

**Mechanical boundary:** Any launch, pilot, or soft-start phase that enrolls real persons and issues real Essential Access is blocked until both FC-YT1 and FC-YT2 are: (a) assigned specific numeric values in `/founding/commitments.md`, (b) independently reviewed by the Federated Ombuds with published findings, and (c) incorporated into the CSM failure response protocol in ANNEX_Y §Y4. This gate cannot be waived by the founding coalition, the CRP, or any single governing body — it requires the Ombuds verification as a structural co-condition.

**Why this matters:** FC-YT1 and FC-YT2 are the tripwires that convert survival-floor failures into constitutional emergencies. Launching without them means the system can experience CSM failures with no automatic escalation path. People can fall through the floor and the governance architecture has no mechanism to respond.

**Attack vectors that target this invariant:** Founding-coalition time pressure to launch before evidence is ready; informal tolerance of unconfirmed parameters during transition

---

---

## INV-012 — Founding Order Files Are Tier 1 Protected

**Statement:** The five Founding Order operational documents — `founding/order/subsidiarity_rule.md`, `founding/order/consent_protocol.md`, `founding/order/exit_protocol.md`, `founding/order/reentry_protocol.md`, and `founding/order/jurisdictional_scales.md` — are Tier 1 protected. They may not be amended, superseded, or removed by any Tier 2 or Tier 3 process. Changes to these files require the same 7-of-9 keyholder signatures (FC-110) and 180-day timelock (FC-111) as any other Tier 1 amendment.

**Mechanical boundary:** The five listed files are explicitly included in the Tier 1 amendment scope alongside `Humane_Constitution.md §0`, `architecture/parameter_registry.md Tier 1 rows`, `Annex Y §Y1`, and `/founding/commitments.md Tier 1 rows`. The exit right (FC-120/121) and the consent threshold governing community adoption are Tier 1 parameters. Any patch tagged `modifies_tier1=True` that touches these files is subject to the two-key precondition (ANNEX_AV §AV1) before FAP intake.

**Why this matters:** The consent and exit rules are the foundational legitimacy architecture. A Tier 2 amendment process that could restructure exit rights or consent thresholds without the 7-of-9 + 180-day gate would allow the governing coalition to entrench itself or block community departure through ordinary political process — precisely the threat these documents are designed to prevent.

**Attack vectors:** T-022 (electoral cycle capture targeting the exit mechanism); PRD-009 (dynasty formation securing permanent institutional control by eliminating exit as a check).

**Violation detection:** Any patch that modifies a Founding Order file without a valid Tier 1 attestation envelope (ANNEX_AV §AV8) is rejected at FAP intake as a Tier 1 violation under INV-007. Implementation drift that operationally narrows exit rights or consent thresholds without a valid Tier 1 amendment record is a drift-warning event per ANNEX_AV §AV9.

---

## Open Question

The invariants in this document are themselves subject to the bootstrap problem (T-017): their authority derives from the founding instrument (P-014), which was itself constituted by a founding coalition whose legitimacy cannot be fully grounded without circularity. This is documented as a known residual risk, not a resolved problem. See Acceptance_Protocol.md Section 2 and Threat_Register.md T-017.
