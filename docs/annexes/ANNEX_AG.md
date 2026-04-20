# ANNEX AG — Formal Acceptance Process Integrity (P-013 / T-016)

**Purpose.** This annex hardens the Formal Acceptance Protocol (FAP) against the exploit surfaces identified in T-016. It amends the FAP directly and adds constitutional protections to its anti-gaming rules. Where this annex conflicts with the FAP document, this annex governs. Status: PROPOSED.

### AG1. Pilot Representativeness Standard (FAP Amendment)
Pilot region designation requires a published representativeness assessment before the pilot begins. The assessment must document four dimensions against the national median:

| Dimension | Measurement | Favorable bias threshold |
| :--- | :--- | :--- |
| **Fraud pressure** | Historical benefit coordination fraud rate | If >30% below national median fraud rate, region is flagged as favorable |
| **Institutional trust** | Public trust index in local institutions | If >30% above national median trust, region is flagged as favorable |
| **Demographic composition** | Distribution across contribution categories | Must match national distribution within ±20% per category |
| **Infrastructure capacity** | Patch-specific minimum operational requirements | Must be documented and verifiable; gaps are stop conditions |

If the pilot region is flagged as favorable on more than one dimension, a second stress-tested pilot region must be designated from below-median regions before evidence is considered complete. Evidence from a single favorable region produces PILOT status only — not ACTIVE. Evidence from two regions (one favorable, one stress-tested) is required for ACTIVE status. Representativeness assessment criteria are protected terms under P-004.

### AG2. Sign-Off Deadlock Resolution Timeline (FAP Amendment)

| Timeline | Stage | Action |
| :--- | :--- | :--- |
| **Days 1–30** | Direct negotiation | Disputing authorities negotiate directly, facilitated by the Ombuds Office (if Ombuds is not a party). |
| **Days 31–60** | Published mediation | Both positions published in full with written reasoning. Public comment window open for 20 days. Mediator proposes non-binding settlement. |
| **Day 61** | CRP escalation | If unresolved, the dispute is classified as a constitutional boundary question and escalates to the CRP full panel as a first-priority item. |
| **Days 61–75** | CRP ruling | CRP issues binding ruling within 14 days of escalation. Ruling is binding on all sign-off authorities. If CRP is tied, status quo ante is maintained. |
| **Day 76+** | Execution | Sign-off authorities comply with CRP ruling within 7 days or file a formal constitutional challenge through the judicial layer. |

The deadlock resolution timeline applies only to the FAP PROPOSED→ACTIVE pathway. Emergency provisional activation under Annex C-6 remains a separate pathway for genuine operational emergencies and is not affected by FAP deadlocks.

### AG3. Audit Epistemic Independence (FAP Amendment)
The existing audit independence rule ('must not be a member of the team that designed the patch') is extended with three additional requirements:
- **No institutional affiliation** — employment, advisory role, or published co-authorship — with any member of the design team within the past 4 years.
- **Domain-diversity requirement** — the auditor's primary professional formation must be in a different domain than the patch's primary subject matter. A governance throughput patch requires an auditor whose primary expertise is not governance process design.
- **Adversarial audit member for critical patches** — for any patch with Impact score = 5, the audit team must include at least one member with a demonstrated adversarial professional background: someone who has professionally argued against similar mechanisms, not for them. The adversarial auditor is one member of a multi-person audit team and does not hold veto authority.

The purpose of the adversarial member is to ensure that at least one auditor is professionally incentivized to find problems rather than confirm adequacy. This directly closes the intellectual-cousin exploit.

### AG4. Anti-Gaming Constitutional Upgrade (Tier 2 Reclassification)
The FAP's anti-gaming rules — specifically the prohibition on waiving evidence requirements due to urgency ('urgency is a reason to accelerate the pilot, not to skip it') — are reclassified from Tier 3 operational document status to Tier 2 charter-level protection. Consequences:
- The evidence waiver prohibition cannot be amended through the operational queue. Any change requires the H-2 amendment process: 90-day notice, two comment rounds, 2/3 DW placement, and public ratification.
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
- **Step 2 — Identify minimum viable bootstrap.** The smallest subset of the patch's clauses that: (a) can be activated without the circular infrastructure; (b) preserves the humane floor; and (c) creates enough infrastructure for the full patch to be piloted.
- **Step 3 — Submit as micro-patch.** The minimum viable bootstrap is submitted as a separate temporary operational measure — not a full patch — through expedited 2-authority sign-off: Threat Register Owner + Ombuds Office only.
- **Step 4 — Full patch proceeds.** Once the micro-patch creates the necessary infrastructure, the full patch proceeds through the standard FAP pathway.
- **Step 5 — Auto-sunset.** The micro-patch automatically sunsets when the full patch reaches ACTIVE status. Micro-patches cannot be renewed independently.

First bootstrap candidate: P-008 legibility gap audit (Annex AC3.1). This clause requires no diversity infrastructure to implement and creates the data needed to designate stress-tested pilot regions for the full P-008 package.

### AG7. FAP Concentration Controls [Ambitious]
The four FAP sign-off authorities collectively constitute a new institutional cluster. The following controls apply to this cluster:
- **Cohort cooling:** no more than 2 members of any co-service cohort (co-service within 12 months) may simultaneously hold sign-off positions across all four FAP authorities combined.
- **Epistemic diversity:** the audit body must satisfy the same three-axis diversity standard as P-008 oversight bodies (Annex AC3.3: institutional origin, contribution type, geography).
- **Published quarterly:** FAP sign-off cluster composition is published in the Pillar 11 concentration dashboard (extending AC3.7). A separate concentration monitoring function — independent of the Ombuds Office — maintains this publication, because the Ombuds is itself a sign-off authority.
- The FAP concentration controls are self-executing from Pillar 11 infrastructure. They do not require a separate acceptance process.

---

### AG8. Complete Threat/Patch Linkage — All Sessions

| Threat | Patch | Status | Annex | Session |
| :--- | :--- | :--- | :--- | :--- |
| T-001 | P-001 | ACTIVE | AB | S1 |
| T-002 | P-003 | ACTIVE | AB | S1 |
| T-004 | P-002 | ACTIVE | AB | S1 |
| T-007 | P-004 | ACTIVE | AB | S1 |
| T-005 | P-005 | PROPOSED | AC1 | S2 |
| T-006 | P-006 | PROPOSED | AC2 | S2 |
| T-008 | P-008 | PROPOSED | AC3 | S2 |
| T-011 | P-011 | PROPOSED | AD | S2 |
| T-012 | P-012 | PROPOSED | AE2.1 | S3 |
| T-013 | P-012 | PROPOSED | AE2.2 | S3 |
| T-014 | P-012 | PROPOSED | AE2.3 | S3 |
| T-015 | P-012 | PROPOSED | AE2.4 | S3 |
| T-009 | P-009 | PROPOSED | AF | S4 |
| T-016 | P-013 | PROPOSED | AG | S5 |

*Session 5 complete. T-016 addressed via P-013. 14 threats total: 4 ACTIVE, 10 PROPOSED. The FAP itself is now hardened against the exploit surfaces identified in T-016.*

---

# The Humane Constitution — Annex AH
