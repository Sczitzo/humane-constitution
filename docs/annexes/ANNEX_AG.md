# ANNEX AG — Formal Acceptance Process Integrity Clauses

> **Provenance:** Implements [P-013 — Formal Acceptance Process Integrity] · Addresses T-016 · Status: see Patch Log

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Hardens the Formal Acceptance Protocol against the exploit surfaces in T-016: cherry-picked pilot regions, sign-off deadlocks, intellectual-cousin auditors, urgency bypass, stagnation documentation gaming, circular bootstrap dependencies, and concentration in the sign-off cluster itself. |
> | **Who it protects** | Everyone who depends on patches being genuinely tested before activation; the protocol's constitutional architecture from being degraded by hastily accepted or captured acceptance decisions. |
> | **Failure risk** | Urgency arguments bypass evidence requirements; audit teams are staffed by professionals who share the same assumptions as designers; favorable pilot regions produce evidence that does not hold in stress-tested populations. |
> | **Evidence status** | Designed |
> | **Linked risks** | T-016 / P-013 (acceptance process capture); AG1 pilot representativeness; AG3 epistemic independence; AG4 anti-gaming Tier 2 reclassification |

**Purpose.** This annex strengthens the Formal Acceptance Protocol (FAP) against the exploit surfaces identified in T-016 (P-013). It amends the FAP directly and adds constitutional protections to its anti-gaming rules. Where this annex conflicts with the FAP document, this annex governs. Status: PROPOSED.

**Sections:** AG1 Pilot Representativeness · AG2 Deadlock Resolution · AG3 Audit Epistemic Independence · AG3.1 Ordinary Challenger Parity · AG4 Anti-Gaming Upgrade · AG5 Stagnation Documentation · AG6 Bootstrap Protocol · AG7 Concentration Controls · AG-LATENCY Emergency Time Bounds · AG8 Linkage Table

### AG1. Pilot Representativeness Standard (FAP Amendment)
Pilot region designation requires a published representativeness assessment before the pilot begins. The assessment must document four dimensions against the national median:

| Dimension | Measurement | Favorable bias threshold |
| :--- | :--- | :--- |
| **Fraud pressure** | Historical benefit coordination fraud rate | If >30% below national median fraud rate, region is flagged as favorable |
| **Institutional trust** | Public trust index in local institutions | If >30% above national median trust, region is flagged as favorable |
| **Demographic composition** | Distribution across contribution categories | Must match national distribution within ±20% per category |
| **Infrastructure capacity** | Patch-specific minimum operational requirements | Must be documented and verifiable; gaps are stop conditions |

If the pilot region is flagged as favorable on more than one dimension, a second stress-tested pilot region must be designated from below-median regions before evidence is considered complete. Evidence from a single favorable region produces PILOT status only — not ACTIVE. Evidence from two regions (one favorable, one stress-tested) is required for ACTIVE status. Representativeness assessment criteria are protected terms under P-004.

Representativeness may not be satisfied only at the aggregate level. Each pilot assessment must publish disaggregated evidence for the most exposed subgroups affected by the patch, including low-wealth residents, disabled residents, newcomers, residents dependent on Essential Access, caregivers, and dissenting or opposition communities where relevant. A pilot that performs well at the median but fails a named exposed subgroup is not representative for ACTIVE status until the subgroup failure is corrected or a second stress-tested pilot demonstrates that the failure was local rather than structural.

### AG2. Sign-Off Deadlock Resolution Timeline (FAP Amendment)

| Timeline | Stage | Action |
| :--- | :--- | :--- |
| **Days 1–30** | Direct negotiation | Disputing authorities negotiate directly, facilitated by the Federated Ombuds (if the Ombuds is not a party). |
| **Days 31–60** | Published mediation | Both positions published in full with written reasoning. Public comment window open for 20 days. Mediator proposes non-binding settlement. |
| **Day 61** | CRP escalation | If unresolved, the dispute is classified as a constitutional boundary question and escalates to the CRP full panel as a first-priority item. |
| **Days 61–75** | CRP ruling | CRP issues binding ruling within 14 days of escalation. Ruling is binding on all sign-off authorities. If CRP is tied, status quo ante is maintained. |
| **Day 76+** | Execution | Sign-off authorities comply with CRP ruling within 7 days or file a formal constitutional challenge through the judicial layer. |

The deadlock resolution timeline applies only to the FAP PROPOSED→ACTIVE pathway. Emergency provisional activation under Annex C-6 remains a separate pathway for genuine operational emergencies and is not affected by FAP deadlocks. **Scope constraint on C-6 in this context:** Annex C-6 may not be invoked to resolve a FAP sign-off dispute or to advance a PROPOSED patch past the PROPOSED→ACTIVE threshold. C-6 is scoped to operational continuity measures only — actions necessary to maintain service delivery or prevent immediate physical harm that do not require constitutional status change. Invoking C-6 to activate a patch that has failed to clear the normal FAP process is an urgency-bypass exploit of the type AG4 is designed to prevent. This restriction is a Tier 2 protected rule: it may not be removed by the same FAP process that governs patch activation, and any proposal to remove it requires the same supermajority-plus-adversarial-panel process as any other Tier 2 amendment.

### AG3. Audit Epistemic Independence (FAP Amendment)
The existing audit independence rule ('must not be a member of the team that designed the patch') is extended with three additional requirements:
- **No institutional affiliation** — employment, advisory role, or published co-authorship — with any member of the design team within the past 4 years.
- **Domain-diversity requirement** — the auditor's primary professional formation must be in a different domain than the patch's primary subject matter. A governance throughput patch requires an auditor whose primary expertise is not governance process design.
- **Adversarial audit member for critical patches** — for any patch with Impact score = 5, the audit team must include at least one member with a demonstrated adversarial professional background: someone who has professionally argued against similar mechanisms, not for them. The adversarial auditor is one member of a multi-person audit team and does not hold veto authority.

The purpose of the adversarial member is to ensure that at least one auditor is professionally incentivized to find problems rather than confirm adequacy. This directly closes the intellectual-cousin exploit.

**Auditor-qualification authority.** Verifying that an auditor meets these independence requirements — no institutional affiliation, domain diversity, and demonstrated adversarial professional background — is itself a power that can be captured. The Auditor Qualification Body certifies auditors against these requirements before they may be seated:
- The Body is structurally independent of the design team and the sponsor of any patch for which it qualifies auditors. A member who has any institutional affiliation (under the AG3 4-year standard) with that design team or sponsor recuses from the qualification of auditors for that patch.
- The Body is itself a sign-off-adjacent institutional cluster and is subject in full to the AG7 concentration and anti-cohort controls, including cohort cooling and the three-axis epistemic-diversity standard.
- Each qualification decision is published with the evidence relied upon and the written reasons for finding the adversarial and domain-diverse criteria satisfied. Independence is established by verifiable record, not by assertion. A qualification decision lacking published reasons is void, and any auditor seated on it is unseated.

### AG3.1. Ordinary Challenger Parity and Non-Priesthood Review
Formal expertise is evidence of competence, not a priestly credential. No FAP audit, reviewer qualification, or ACTIVE-status decision may treat professional formation, academic status, prior governance service, or Service Record standing as the only valid source of challenge knowledge.

For any patch that affects Voice, Service Record, role eligibility, survival-adjacent access, founding legitimacy, enforcement discretion, or review-body composition, the FAP record must include an ordinary challenger window:

- Any affected resident, low-wealth participant, newcomer, caregiver, dissenter, opposition-community representative, or person with direct lived experience of the affected system may file a challenger brief without needing institutional sponsorship.
- The challenger receives the same non-private evidence packet, response deadline, publication status, and appeal route as a professional auditor or institutional reviewer.
- The FAP secretariat must provide plain-language instructions, language access, offline filing, and fee-free submission. A challenge may not be dismissed because it lacks technical vocabulary if it identifies a concrete rule, decision, harm, missing evidence, or factual error.
- A material challenger brief must receive a written response before PROPOSED may advance to ACTIVE. If the response rejects the challenge, it must state the evidence relied upon and the appeal route.
- Where confidentiality or security limits evidence access, the limiting body must publish the restriction, the reason, and a substitute disclosure sufficient for the challenger to understand the issue being decided.

Critical patches and all Service Record-gating patches must include at least one lay or lived-experience reviewer on the audit team, in addition to the professional and adversarial auditors required by AG3. Lack of credentials may not disqualify this reviewer; conflict of interest, confidentiality capacity, and inability to perform the defined role may disqualify, with written reasons and appeal.

The FAP concentration dashboard must annually compare professional-auditor challenges and ordinary-challenger briefs by filing rate, response time, sustain rate, publication quality, and appeal success. A pattern in which ordinary challengers are procedurally slower, less answered, or categorically less sustained without written merits reasons is an AG7 concentration signal and triggers external procedural audit.

### AG4. Anti-Gaming Constitutional Upgrade (Tier 2 Reclassification)
The FAP's anti-gaming rules — specifically the prohibition on waiving evidence requirements due to urgency ('urgency is a reason to accelerate the pilot, not to skip it') — are reclassified from Tier 3 operational document status to Tier 2 charter-level protection. Consequences:
- The evidence waiver prohibition cannot be amended through the operational queue. Any change requires the H-2 amendment process: 90-day notice, two comment rounds, 2/3 Voice placement, and public ratification.
- The urgency bypass exploit therefore requires a 90-day public notice window and referendum-level approval to execute — making it politically costly enough to deter except in genuine constitutional emergencies.
- The reclassification itself is subject to mandatory CRP pre-clearance review under Annex H4.

### AG5. Stagnation Documentation Quality Standard (FAP Amendment)
The 8-quarter stagnation documentation must satisfy a three-question quality review before acceptance:
- **Q1: Factually accurate and verifiable?** The stated obstacle must be independently verifiable. Self-reported infrastructure gaps require at least one independent confirmatory assessment.
- **Q2: Progress made since last filing?** The filing must document what steps were taken toward resolving the obstacle in the prior 8 quarters. No steps taken = the explanation fails Q2.
- **Q3: Resolvable within 4 quarters with reasonable effort?** If yes → the filing is accepted; a resolution plan is required. If no → the obstacle is structural and triggers a bootstrap review rather than continued documentation.

A filing that fails any of the three questions is returned for revision. A filing returned twice without resolution is escalated to the CRP for a binding determination on whether the stagnation is legitimate.

### AG6. Bootstrap Resolution Protocol [Ambitious]
For genuine circular dependencies — patches that require infrastructure that only exists after the patch is active — the following protocol applies:
- **Step 1 — Confirm circularity.** The bootstrap review (triggered by Q3 failure) confirms the dependency is genuinely circular, not merely inconvenient.
- **Step 2 — Identify minimum viable bootstrap.** The smallest subset of the patch's clauses that: (a) can be activated without the circular infrastructure; (b) preserves the survival floor; and (c) creates enough infrastructure for the full patch to be piloted.
- **Step 3 — Submit as micro-patch.** The minimum viable bootstrap is submitted as a separate temporary operational measure — not a full patch — through expedited 2-authority sign-off: Threat Register Owner + Ombuds Office only.
- **Step 4 — Full patch proceeds.** Once the micro-patch creates the necessary infrastructure, the full patch proceeds through the standard FAP pathway.
- **Step 5 — Auto-sunset.** The micro-patch automatically sunsets when the full patch reaches ACTIVE status. Micro-patches cannot be renewed independently.

First bootstrap candidate: P-008 legibility gap audit (Annex AC3.1). This clause requires no diversity infrastructure to implement and creates the data needed to designate stress-tested pilot regions for the full P-008 package.

### AG7. FAP Concentration Controls [Ambitious]
The four FAP sign-off authorities collectively constitute a new institutional cluster. The following controls apply to this cluster:
- **Cohort cooling:** no more than 2 members of any co-service cohort (co-service within 12 months) may simultaneously hold sign-off positions across all four FAP authorities combined.
- **Epistemic diversity:** the audit body must satisfy the same three-axis diversity standard as P-008 oversight bodies (Annex AC3.3: institutional origin, contribution type, geography).
- **Published quarterly:** FAP sign-off cluster composition is published in the Article VII concentration dashboard (extending AC3.7). A separate concentration monitoring function — independent of the Federated Ombuds — maintains this publication, because the Ombuds is itself a sign-off authority.
- The FAP concentration controls are self-executing from Article VII infrastructure. They do not require a separate acceptance process.

### AG-LATENCY — Emergency FAP Time Bounds

**Purpose:** The FAP is designed to prevent hasty patches from degrading the constitutional architecture. But an FAP that has no maximum review time under emergency conditions creates inverse pressure: urgency becomes a bypass argument. This section locks maximum latency for each urgency class.

**Urgency classification (for FAP intake):**

| Class | Trigger condition | Maximum FAP review period |
| :--- | :--- | :--- |
| **Class E1 — Survival-floor threat** | Active PCRP or Shared Storehouse event; Essential Access delivery failure affecting >1% of enrolled population | 72 hours from intake to disposition |
| **Class E2 — Structural control failure** | Oracle quorum loss; Ombuds Plenum unable to convene; Enforcement Panel unable to act | 7 days from intake to disposition |
| **Class E3 — High-severity governance gap** | Newly identified Critical threat with no current mitigation; Tier 1 inconsistency discovered | 30 days from intake to disposition |
| **Class S — Standard** | All other patches | Existing FAP timelines apply |

**Urgency-class assignment accountability:** The authority that assigns a patch's urgency class holds the same bypass power AG4 removes from the urgency argument, because class assignment governs the review window and, for Class E1, a reduced quorum. That power is constrained:
- At intake, the assigned class is published together with a written rationale identifying the trigger condition relied upon and the classifier of record. An assignment published without rationale defaults to Class S until a rationale is filed.
- The assignment is challengeable. Any sign-off authority, the concentration monitoring function, or an affected party may contest it; while a challenge is pending, the longer of the assigned and the contested review windows applies, and the survival floor bridge remains in force.
- A sustained finding of mis-classification — assigning a higher urgency class than the trigger conditions support — counts toward the AG7 concentration-review trigger and bars the classifier of record from assigning the urgency class of similar patches for a 12-month cooling period.

**Disposition options within time bound:**
- **Accept** — patch enters PROPOSED or ACTIVE status per standard FAP rules
- **Emergency provisional** — patch enters a 14-day provisional-active status, subject to full FAP review within 30 days; automatically lapses if full review is not completed
- **Defer with documented rationale** — patch is acknowledged but deferred; the deferral reason is published and the patch is re-queued within the class time bound
- **Reject** — patch is declined with written published rationale

**Anti-bypass rule:** Emergency provisional status may not be invoked more than 3 times in any 12-month period without a mandatory FAP concentration review (applying the AG7 concentration controls). If 3 provisional activations occur within 12 months, the 4th must go through full review regardless of urgency class.

**Quorum under emergency conditions:**
- For Class E1: 3-of-4 FAP sign-off authorities required (reduced from standard 4-of-4). Reduced quorum finding is published with the names of present and absent authorities.
- For Class E2 and E3: standard quorum requirements apply.

**Survival floor bridge:** Regardless of FAP disposition or timing, any patch touching Essential Access delivery must include an unconditional survival floor bridge clause: the current Essential Access level is maintained at minimum during any review period, regardless of outcome.

---

### AG8. Complete Threat/Patch Linkage — All Sessions

| Threat | Patch | Status | Annex | Session |
| :--- | :--- | :--- | :--- | :--- |
| T-001 | P-001 | ACTIVE | AB | S1 |
| T-002 | P-003 | ACTIVE | AB | S1 |
| T-004 | P-002 | ACTIVE | AB | S1 |
| T-007 | P-004 | ACTIVE | AB | S1 |
| T-005 | P-005 | ACTIVE | AC1 | S2 |
| T-006 | P-006 | ACTIVE | AC2 | S2 |
| T-008 | P-008 | ACTIVE | AC3 | S2 |
| T-011 | P-011 | ACTIVE | AD | S2 |
| T-012 | P-012 | ACTIVE | AE2.1 | S3 |
| T-013 | P-012 | ACTIVE | AE2.2 | S3 |
| T-014 | P-012 | ACTIVE | AE2.3 | S3 |
| T-015 | P-012 | ACTIVE | AE2.4 | S3 |
| T-009 | P-009 | ACTIVE | AF | S4 |
| T-016 | P-013 | ACTIVE | AG | S5 |

*T-016 is addressed via P-013. The Formal Acceptance Protocol is protected against the exploit surfaces documented in T-016.*

---
