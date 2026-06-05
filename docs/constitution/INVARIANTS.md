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
- A wrongful denial of survival access can be appealed to a person, and the floor is provided while the appeal is reviewed.
- The five instruments cannot be traded into each other.
- The system cannot score a person's worth.
- Money cannot buy governing power.
- Survival access can only be issued when real food, shelter, care, and transport capacity exists.
- The people checking the system cannot also be the people who benefit from changing the numbers.
- These rules cannot be weakened by ordinary votes or inside procedures.
- This is a fiscal-civic layer, not a whole government: it does not run the police, the courts, or decide who belongs — but it binds whoever does, so force can never starve a person, punishment can never breach the floor, belonging can never be bought, and the people who hold force live inside the same walls as everyone else.

If a proposed change breaks one of these promises, the answer is no before the detailed review even starts.

---

## Foundational Premise

Every person has inherent and equal worth that this system does not confer and cannot revoke — a worth the founders understand as belonging to each person as a bearer of the image of God, which they do not claim the authority to define, only the duty to protect. These invariants exist to serve persons; no rule or institution may be revered above the people it was made to protect.

---

## Scope — What This Constitution Is, and Is Not

The Humane Constitution is a fiscal-civic layer. It governs market money (Flow), the survival floor (Essential Access), accumulated wealth, scarcity rationing (Shared Storehouse), and civic priority and public-role eligibility (Voice, Service Record). It does **not** supply, and does not claim, the monopoly on legitimate force, a criminal or civil justice system, or the authority to define who is a member of the polity. It presupposes a host rule-of-law order to provide these, and it binds that order with the interface invariants (INV-014 through INV-019) below. Where a host order violates those invariants, this design does not claim legitimacy or operability within it.

This boundary is scope-independent: it holds for a pilot inside an existing state and for a full society coexisting with a rule-of-law polity. The layer never itself becomes the sovereign that wields force. Declaring this is not a retreat from the design's ambition but its humility made structural — a framework that claimed the power to police and punish as well as to allocate would be exactly the concentration the walls exist to prevent.

This Scope section is descriptive of the boundary; the interface invariants below carry its binding force. It elevates to a scale-independent constitutional statement what the Jurisdiction Interface Clause already concedes at pilot scale (that this design "does not establish a sovereign state, a court of law, or a law enforcement authority"), and it adds the interface invariants that clause lacks.

---

## INV-001 — Survival Is Unconditional

**Statement:** Every person receives a non-zero Essential Access allocation sufficient to meet the Constitutional Survival Minimum (CSM) at all times. No behavioral condition, contribution record, civic standing, outstanding obligation, or system state may reduce Essential Access below the CSM floor. Confirmation of identity is required to access civic instruments (Voice, Service Record, and deliberative standing) but is never a precondition for survival access.

**Mechanical boundary:** Essential Access allocation ≥ CSM at all times. The floor is a hard lower bound, not a target.

**Why this matters:** If survival can be used as a reward or punishment, people can be forced to obey. Essential Access would become another form of money or power, and the whole separation between survival and markets would fail.

**Attack vectors that target this invariant:** T-001 (shadow convertibility), T-007 (definition drift on "essential"), T-018 (PCRP false-trigger exhaustion), T-022 (electoral cycle capture)

**Implementation:** The two-tier access model (ANNEX_AK §AK8) operationalizes this invariant by separating non-duplication (required for CSM) from identity verification (required only for above-floor services and civic instruments). Tier 0 access is open-access or pseudonymous; no real-world identity is ever a precondition for receiving a CSM allocation.

**Anonymity for safety:** A person may freely and reversibly choose to remain unidentified for their own safety. That choice costs only civic Voice — never survival, never dignity, and never the ability to report harm or seek help through the Ombuds or safety-shielded path. Voice requires confirmed identity solely to resist Sybil capture (INV-004); it is the single instrument so gated. A person may confirm identity to gain Voice at any time, and return to anonymity if safety requires. Voicelessness chosen for safety is not a penalty, and it creates no class deprived of survival, dignity, or redress.

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

**Plain grounding:** A system cannot feed, house, or treat people with promises on paper. It needs real capacity: food, shelter, healthcare, and transit that can actually be delivered. Essential Access must be tied to that real-world capacity, not to forecasts, loans, prices, or political confidence. At least one oracle must use direct physical checking so the numbers cannot drift away from reality. *(Cited descriptively, not as binding authority: Wolf, Economic Trilogy Part 1: Foundation, 2026 — one influence among the evidence base, subordinate to this document's own corrigibility.)*

**Why this matters:** If Essential Access is issued without real capacity behind it, it becomes only a promise. The survival floor would look valid on paper while failing in real life.

**Reconciliation with INV-001 under genuine scarcity.** INV-001 (survival ≥ CSM at all times) and INV-005 (issuance ≤ verified physical capacity) can appear to collide when real capacity falls below aggregate CSM need. They do not in fact contradict; together they forbid the two dishonest responses to famine. The system may not issue survival claims against capacity that does not exist (INV-005 holds — no fictional tokens), and it may not abandon any person to zero while real capacity exists (INV-001 holds — no one is cut off so that others are filled). When verified capacity is insufficient for the full floor, the available real capacity is distributed by equal share to need — the manna rule, "he that gathered much had nothing over, and he that gathered little had no lack" — a System Failure is declared honestly (ANNEX_Y §Y4) rather than concealed, and a named human bears accountability for the response (INV-011). What is forbidden absolutely is silence: the system may not represent the floor as met when it is not. This is a confessed hard case, not a solved one (see Open Question).

**Attack vectors that target this invariant:** T-006 (measurement lag), T-012 (PCRP oracle poisoning), T-020/T-021 (epistemological/algorithmic oracle capture), T-024 (Shared Storehouse oracle failure)

---

## INV-006 — Separation of Verification and Benefit

**Statement:** No entity that administers, verifies, or governs Essential Access issuance or identity confirmation may simultaneously be a beneficiary of the outcomes it controls. Verification infrastructure must be structurally independent of benefit delivery infrastructure.

**Mechanical boundary:** No individual or organization may hold both verification authority and primary beneficiary status in the same subsystem. Structural independence is required, not just disclosed conflict-of-interest.

**Why this matters:** The same actor should not be able to check the numbers and benefit from changing them. That creates a strong temptation to bend definitions, hide failures, or build an insider class.

**No class is its own final auditor.** Every body holding verification, override, or governing authority — including the oracle nodes (INV-005) and the keyholder set (INV-007) — is subject to audit by a party structurally independent of it. No apex may sit unaudited.

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

**Keyholder authority is custodial and removable.** The 7-of-9 keyholder set is a custodial trust, not a proprietary office. Keyholder identities are public; each carries a published conflict-of-interest disclosure; the set is subject to a fixed-schedule rotation and a defined recall mechanism administered by a body structurally external to the keyholders. No keyholder may hold the position secretly, indefinitely, or without an active path to removal. The rotation cadence and recall thresholds are calibrated below Tier 1; the *rule that the set must rotate and be recallable* is itself Tier 1.

**Attack vectors that target this invariant:** T-007, T-016, T-022

![Amendment Tier Pyramid](/images/V-004.png)

---

## INV-008 — Money Creation Is Public

**Statement:** No person, enterprise, or institution other than the constitutionally authorized issuance architecture may create Flow or any instrument that functions as Flow. A FAP proposal that would permit private issuance is rejected at intake without proceeding to technical review.

**Mechanical boundary:** Flow issuance is a public function governed by [ANNEX_X](../annexes/ANNEX_X.md). Any instrument — digital, contractual, or otherwise — that circulates as a medium of exchange, store of value, or unit of account within the protocol is treated as Flow for purposes of this invariant regardless of its legal label.

**Why this matters:** Private money creation is the primary mechanism by which financial power escapes public accountability. If private actors can issue Flow-equivalents, the non-convertibility firewall fails from outside.

**Attack vectors that target this invariant:** T-001 (shadow convertibility), above-ledger bypass routes

**Progressive net-worth demurrage:** Concentrated wealth holdings above the household savings floor (S) carry a progressive annual demurrage charge calibrated to approach the expected return on capital at the equilibrium ceiling (W\*). This is a public carrying cost on the *stock* of net worth — not a tax on income or labor — and is constitutional under Article V. The rate function, consolidated beneficial ownership rules, and corporate unassigned-balance demurrage are specified in [ANNEX_D](../annexes/ANNEX_D.md), the sole carrying-cost instrument on accumulated wealth. Demurrage revenue routes to the Essential Access commons pool and public infrastructure. No credit offset is permitted; holdings through nominees, trusts, or shell structures are attributed to the ultimate beneficial owner.

---

## INV-009 — No Fees on Survival

**Statement:** Survival access, Essential Access transactions, and labor income below the household savings floor may not be taxed, charged, or subjected to any system fee — including demurrage — regardless of the instrument used to access them or the administrative form the charge takes.

**Mechanical boundary:** No system process may apply a fee, carrying cost, or deduction to: (a) CSM-tier Essential Access allocations, (b) any Flow balance below the published household savings floor, or (c) any labor income transaction where the income source brings the recipient's balance to or below the floor.

**Why this matters:** A fee on survival is a survival condition in disguise. Even a small carrying cost on the survival floor erodes the unconditional guarantee over time and converts Essential Access into a timed benefit rather than a floor.

**The exemption boundary is structurally protected.** The boundary below which no fee, carrying cost, or demurrage may apply (the household savings floor, S) may never be lowered, redefined, or eroded so as to bring any carrying cost onto a household at or below the floor. The specific value of S is calibrated below Tier 1; the *rule that S may never be set or moved to defeat this invariant's protection of below-floor households* is itself Tier 1. A change to S that subjects a previously-protected household to demurrage is an INV-009 violation regardless of its administrative form.

**Attack vectors that target this invariant:** T-007 (definition drift on "essential"), demurrage miscalibration against low-balance households

---

## INV-010 — Succession Serves Continuity

**Statement:** Inheritance mechanisms may transfer primary residence and working tools without limit. All other Flow-equivalent transfers above the household savings floor route through a published commons-return process at the rate defined in [Article V](Humane_Constitution.md#article-v-markets-commons--public-finance). The rate is a Tier 2 founding commitment that must be set before deployment.

**Mechanical boundary:** A transfer is a succession transfer if it occurs at death or through an irrevocable inter-vivos trust that removes the transferor's beneficial control. Succession transfers of primary-residence use-rights and working tools (productive capital in active use by the decedent) are exempt. All other succession transfers above the household savings floor are subject to the commons-return rate in [Article V](Humane_Constitution.md#article-v-markets-commons--public-finance).

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
13. Would allow a survival-floor denial or reduction to stand without an accessible human appeal, or would withhold the survival floor during that appeal (violates INV-013)
14. Would permit a coercive, policing, or justice authority to reduce Essential Access below the CSM floor as punishment, coercion, leverage, or control (violates INV-014)
15. Would permit punishment to push a person below the survival floor, or confiscation below the participation floor (violates INV-015)
16. Would create or sanction a market, inheritance, or proxy pathway in polity membership (violates INV-016)
17. Would convert legitimate force into Flow, wealth, Voice, or survival advantage, or exempt a force-holding body from independent audit (violates INV-017)
18. Would permit a host authority to withhold a survival-floor entitlement without a contemporaneous human appeal, or withhold the floor during that appeal (violates INV-018)
19. Would gate, reduce, or condition the floor for a child or incapacitated person on guardian status, or leave them without a guardian of last resort (violates INV-019)

...is rejected at intake without proceeding to technical review. The FAP reviewer documents the violation by invariant ID.

Implementation drift counts as an invariant-warning event when deployed code, generated corpus, runtime configuration, operator pinned reference, or binary hash operationally narrows a Tier 1 invariant without a valid Tier 1 amendment. The warning path is governed by the architecture implementation binding and the Implementation Drift Audit Package. A drift warning does not by itself prove bad faith, but it blocks affected Tier 1-dependent operation until the last valid state, exception rule, or amendment record is established.

---

## INV-LAUNCH-1 — Survival Floor Activation Gate

**Statement:** The system may not begin any operational phase in which survival-floor access is extended to real persons until [FC-YT1](../annexes/ANNEX_Y.md#y4-csm-failure-as-critical-incident) (CSM failure pattern-detection trigger) and [FC-YT2](../annexes/ANNEX_Y.md#y7-interaction-with-other-articles) (90-day CSM reserve requirement) are confirmed as bound values in `/founding/commitments.md` and independently verified by the Federated Ombuds. The Ombuds verification must publish the specific confirmed values, not merely confirm that confirmation occurred.

**Mechanical boundary:** Any launch, pilot, or soft-start phase that enrolls real persons and issues real Essential Access is blocked until both [FC-YT1](../annexes/ANNEX_Y.md#y4-csm-failure-as-critical-incident) and [FC-YT2](../annexes/ANNEX_Y.md#y7-interaction-with-other-articles) are: (a) assigned specific numeric values in `/founding/commitments.md`, (b) independently reviewed by the Federated Ombuds with published findings, and (c) incorporated into the CSM failure response protocol in ANNEX_Y §Y4. This gate cannot be waived by the founding coalition, the CRP, or any single governing body — it requires the Ombuds verification as a structural co-condition.

**Why this matters:** [FC-YT1](../annexes/ANNEX_Y.md#y4-csm-failure-as-critical-incident) and [FC-YT2](../annexes/ANNEX_Y.md#y7-interaction-with-other-articles) are the tripwires that convert survival-floor failures into constitutional emergencies. Launching without them means the system can experience CSM failures with no automatic escalation path. People can fall through the floor and the governance architecture has no mechanism to respond.

**Relationship to INV-001's "at all times."** This gate is what gives INV-001's "at all times" its operative force. Until FC-YT1 and FC-YT2 are bound and independently verified, the survival floor has no automatic escalation behind it, so the system may not extend survival-floor access to real persons and then claim a guarantee it cannot yet keep — until then, the honest statement is that the floor is *designed, not yet operative*. INV-LAUNCH-1 is a one-time activation condition, not a perpetual operating rule: it is satisfied permanently once cleared at genesis, after which INV-001 governs. It is placed in this core because the floor's promise must have force before any person relies on it.

**Attack vectors that target this invariant:** Founding-coalition time pressure to launch before evidence is ready; informal tolerance of unconfirmed parameters during transition

---

---

## INV-012 — Founding Order Files Are Tier 1 Protected

**Statement:** The five Founding Order operational documents — `founding/order/subsidiarity_rule.md`, `founding/order/consent_protocol.md`, `founding/order/exit_protocol.md`, `founding/order/reentry_protocol.md`, and `founding/order/jurisdictional_scales.md` — are Tier 1 protected. They may not be amended, superseded, or removed by any Tier 2 or Tier 3 process. Changes to these files require the same 7-of-9 keyholder signatures (FC-110) and 180-day timelock (FC-111) as any other Tier 1 amendment.

**Mechanical boundary:** The five listed files are explicitly included in the Tier 1 amendment scope alongside `Humane_Constitution.md §0`, `architecture/parameter_registry.md Tier 1 rows`, `Annex Y §Y1`, and `/founding/commitments.md Tier 1 rows`. The exit right (FC-120/121) and the consent threshold governing community adoption are Tier 1 parameters. Any patch tagged `modifies_tier1=True` that touches these files is subject to the two-key precondition ([ANNEX_AV §AV1](../annexes/ANNEX_AV.md#av1--two-key-precondition)) before FAP intake.

**Why this matters:** The consent and exit rules are the foundational legitimacy architecture. A Tier 2 amendment process that could restructure exit rights or consent thresholds without the 7-of-9 + 180-day gate would allow the governing coalition to entrench itself or block community departure through ordinary political process — precisely the threat these documents are designed to prevent.

**Attack vectors:** T-022 (electoral cycle capture targeting the exit mechanism); PRD-009 (dynasty formation securing permanent institutional control by eliminating exit as a check).

**Violation detection:** Any patch that modifies a Founding Order file without a valid Tier 1 attestation envelope ([ANNEX_AV §AV8](../annexes/ANNEX_AV.md#av8--attestation-envelope-format)) is rejected at FAP intake as a Tier 1 violation under INV-007. Implementation drift that operationally narrows exit rights or consent thresholds without a valid Tier 1 amendment record is a drift-warning event per [ANNEX_AV §AV9](../annexes/ANNEX_AV.md#av9--intake-verification-procedure).

---

## INV-013 — Survival Access Has a Human Remedy

**Statement:** Any denial, reduction, suspension, delay, or flag that withholds a person's Constitutional Survival Minimum — for any reason, including suspected fraud, identity-verification failure, non-duplication conflict, or capacity dispute — carries an accessible, timely, human-reviewed appeal; and survival access is provided *during* the appeal, not withheld pending it.

**Mechanical boundary:** No survival-floor denial may stand on automated determination alone. Every withholding generates an appeal right that is (a) reachable without identity, documents, literacy, or fee; (b) decided by a named human within a published maximum window; and (c) resolved toward provision while pending — the person receives the floor during review, not after it. A denial issued with no open appeal path is void.

**Why this matters:** An unconditional floor with no remedy is unconditional only until the machinery makes a mistake. False fraud-flags, failed scans, and mismatched records *will* occur; without a fast human appeal that provides first and verifies second, the error itself becomes the new condition on survival. The remedy is what makes "unconditional" true in operation, not only on paper.

**Attack vectors that target this invariant:** T-007 (definition drift), implementation drift turning provisional flags into de facto denials, fraud-control overreach.

---

## Interface Invariants — Binding the Host Order

INV-014 through INV-019 are *interface invariants*. They do not govern the five instruments directly; they bind whatever host order supplies force, justice, and membership — the functions this layer deliberately does not constitute (see Scope). They are the contract the host must meet for the walls to mean anything. A host that breaches them voids this design's claim to legitimacy and operability within it. They are Tier 1 and carry the same protection and amendment threshold as INV-001 through INV-013.

## INV-014 — Force May Never Gate Survival

**Statement:** No coercive, policing, or justice authority — host or layer — may use deprivation of Essential Access (food, water, shelter, medicine) as a tool of punishment, coercion, leverage, or control. The Constitutional Survival Minimum reaches the imprisoned, the accused, the convicted, and the sanctioned without exception. Survival is never a lever.

**Mechanical boundary:** Detention, sanction, conviction, accusation, or any exercise of legitimate force may not reduce a person's Essential Access below the CSM floor. The floor follows the person into custody and through punishment. No host process may condition restoration of the floor on compliance, confession, or cooperation.

**Why this matters:** A justice system that can starve is a justice system that can compel anything. If the host may withhold survival as part of punishment, every wall this layer builds around survival is decorative — the coercive apparatus reopens the Survival-Trade Bind from outside the layer. The floor must reach precisely the people a system is most tempted to treat as exceptions.

**Attack vectors that target this invariant:** Host-side punitive deprivation (carceral starvation, sanction-by-withholding); definition drift reclassifying punishment as a capacity dispute to evade INV-001; implementation drift treating custody as a survival-floor exemption.

## INV-015 — Punishment May Suspend Liberty, Never Breach the Floor

**Statement:** A host justice system may restrict liberty, movement, and Voice as punishment. It may never push a person below the survival floor, nor confiscate a person below the participation floor. There is no civil or criminal death by starvation or by destitution.

**Mechanical boundary:** Permitted punitive measures: restriction of liberty and movement; suspension of Voice and civic standing. Prohibited as punishment: any reduction of Essential Access below CSM (INV-001, INV-014); any fine, forfeiture, restitution, or asset confiscation that brings the person below the household savings floor (S) as protected under INV-009. Confiscation above the floor is a host matter; confiscation through the floor is void.

**Why this matters:** Liberty can be restored; a person starved or stripped to destitution as punishment is harmed in a way the system promises never to inflict. Distinguishing what punishment *may* take (liberty, Voice) from what it *may never* take (survival, the participation floor) keeps the floor unconditional even against legitimate judgment.

**Attack vectors that target this invariant:** Punitive fines or restitution calibrated to breach the floor; forfeiture regimes that strip below-floor households; sanction structures that suspend liberty in name but starvation in effect.

## INV-016 — Membership Is Non-Convertible

**Statement:** The host order defines who belongs to the polity. Membership — and the Voice, survival floor, and any commons dividend that attach to it — may never be bought, sold, rented, pledged, or inherited as a tradable asset. Citizenship is not a market good.

**Mechanical boundary:** No market, contract, proxy transaction, or system state may create a conversion pathway between Flow or wealth and membership standing, by analogy to and extension of INV-002 (instrument non-convertibility) and INV-004 (influence cannot be purchased). The host may grant, define, or revoke membership by its own lawful process; it may not operate or sanction a market in it. Membership obtained or transferred through a prohibited conversion confers no Voice, floor priority, or dividend within the layer.

**Why this matters:** If belonging itself becomes purchasable, the wealthy buy the demos and every downstream non-convertibility wall fails at its root. The floor and Voice are attached to personhood-in-the-polity, not to a saleable title; a market in membership would convert the Power-Wealth Convergence the layer exists to prevent into a one-step purchase.

**Attack vectors that target this invariant:** Citizenship-by-investment schemes routed through the host; inheritance of membership-as-asset; rental or proxy arrangements that lease civic standing for Flow.

## INV-017 — The Holders of Force Are Inside the Walls, Not Above Them

**Statement:** Whoever wields legitimate force is bound by the same non-convertibility as every other person and is subject to the same audit. Force may not be converted into Flow, wealth, Voice, or survival advantage — no extortion, no sale of protection, no purchase of immunity — and the coercive apparatus is subject to the "no apex sits unaudited" rule (INV-006).

**Mechanical boundary:** No entity holding coercive or justice authority may (a) convert that authority into Flow, wealth, Voice, Service Record standing, or above-floor survival advantage, or accept any such conversion; or (b) sit unaudited. Every body holding force is auditable by a party structurally independent of it, on the same terms INV-006 imposes on verification, oracle, and keyholder authority. Immunity from audit is itself a prohibited conversion of force into standing.

**Why this matters:** The capstone's gravest finding was that capturing the coercive apparatus makes every other wall decorative. This invariant places the holders of force *inside* the same non-convertibility and audit walls as everyone else, so legitimate force cannot become a private revenue or a private immunity. It is the structural form of authority-as-service rather than authority-as-lordship.

**Attack vectors that target this invariant:** Protection rackets and shakedowns by force-holders; purchased immunity or selective enforcement; an unaudited security or carceral apex; force converted into civic or market advantage.

## INV-018 — Due Process Before Any Withholding

**Statement:** No instrument or authority — host or layer — may withhold a survival-floor entitlement without a contemporaneous, accessible, human-reviewed appeal path, and the floor is provided during that appeal, not withheld pending it. This extends INV-013 (survival access has a human remedy) across the layer's boundary to every host authority that can touch the floor.

**Mechanical boundary:** Any host-side denial, reduction, suspension, delay, or flag that withholds a person's CSM — including for suspected crime, security designation, immigration status, or identity-verification failure — carries an appeal that is (a) reachable without identity, documents, literacy, or fee; (b) decided by a named human within a published maximum window; and (c) resolved toward provision while pending. A withholding issued with no open appeal path is void, regardless of which authority issued it.

**Why this matters:** An unconditional floor with no remedy is unconditional only until the machinery — or a host authority — makes a mistake. Carrying INV-013's "provide first, verify second" guarantee across the interface keeps the host from doing through process what INV-014 forbids it to do by punishment.

**Attack vectors that target this invariant:** Host authorities withholding the floor under security or fraud exceptions with no appeal; provisional flags hardening into de facto denials at the boundary; appeal paths that exist on paper but require identity, fee, or literacy.

## INV-019 — Children and the Incapacitated Retain the Floor and a Guardian of Last Resort

**Statement:** The survival floor reaches children and persons unable to act for themselves regardless of guardian status, custody, documentation, or identity. The host order must supply child protection and guardianship of last resort, but may never use guardianship, custody, or protective authority to gate, reduce, or condition the floor.

**Mechanical boundary:** A child's or incapacitated person's CSM allocation is presence-triggered and is never contingent on a guardian's status, conduct, identity, or cooperation. Where no competent guardian exists or a guardian is the source of harm, the host must provide a guardian of last resort; the absence or failure of a guardian may not interrupt the floor. Protective or custodial authority over the person may not be exercised so as to withhold survival access.

**Why this matters:** Children and the incapacitated are the people most easily made exceptions, because they cannot assert their own claim. Attaching the floor to their presence rather than to a guardian's standing, and requiring a guardian of last resort the host must fill, keeps the most vulnerable inside the unconditional guarantee rather than at the mercy of whoever holds custody.

**Attack vectors that target this invariant:** Floor withheld for want of guardian documentation; custody disputes used to interrupt a child's survival access; protective authority weaponized to coerce a guardian by depriving a dependent.

---

## Open Question

The invariants in this document are themselves subject to the bootstrap problem (T-017): their authority derives from the founding instrument (P-014), which was itself constituted by a founding coalition whose legitimacy cannot be fully grounded without circularity. This is documented as a known residual risk, not a resolved problem. See Acceptance_Protocol.md Section 2 and Threat_Register.md T-017.

Two further hard cases are named here rather than concealed, in keeping with the same honesty — for a contradiction confessed is safer than a contradiction hidden:

- **The scarcity collision (INV-001 vs INV-005).** In genuine famine the unconditional floor and the reality-anchoring cap point in opposite directions. The reconciliation under INV-005 (equal-share-to-need, honest System-Failure declaration, named accountability) is the system's answer for *how* an insufficiency is faced; it does not make the food exist, and it does not pretend to. This remains a confessed limit, not a solved problem.
- **The activation dependency (INV-001 vs INV-LAUNCH-1).** INV-001 promises survival "at all times," yet that promise has no operative force until the FC-YT1/FC-YT2 tripwires are bound. INV-LAUNCH-1 exists precisely so the guarantee is never extended to real persons before it can be kept; until then the honest statement is that the floor is designed, not yet operative.
