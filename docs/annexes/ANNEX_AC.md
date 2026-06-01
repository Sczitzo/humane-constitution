# ANNEX AC — Governance Throughput, Measurement Lag, and Elite Formation Clauses

> **Provenance:** Implements [P-005 — Governance Throughput Hardening] (§AC1), [P-006 — Measurement Lag and Supply Shock Hardening] (§AC2), [P-008 — Bureaucratic Elite Formation Hardening] (§AC3) · Status: **ACTIVE**

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Hardens the three systemic failure modes identified in the second adversarial cycle: governance queues that stall under crisis, supply oracles too slow to detect shocks, and elite professional networks that capture oversight bodies. |
> | **Who it protects** | Everyone whose Essential Access depends on timely governance decisions; populations vulnerable to supply shortfalls that lag in measurement; contributors in informal, care, and non-institutional categories excluded from verification. |
> | **Failure risk** | A single crisis consumes all governance capacity; a supply shock is not detected until after harm; credentialed professionals monopolize audit and review pools through slow concentration rather than overt capture. |
> | **Evidence status** | Active — unproven |
> | **Linked risks** | T-005 / P-005 (governance throughput); T-006 / P-006 (measurement lag); T-008 / P-008 (bureaucratic elite formation) |

**Purpose.** This annex introduces the operative clauses covering T-005 Governance Throughput Failure (P-005), T-006 Measurement Lag and Supply Shock Behavior (P-006), and T-008 Bureaucratic Elite Formation (P-008). Where clauses in this annex conflict with earlier language, this annex governs.

**Interpretive rule.** These clauses follow the same interpretive hierarchy as Annex AB. Unconditional survival, non-convertibility, and survival-floor protections are unaffected by any clause in this annex.

### AC1. Governance Throughput Clauses (P-005)
The following clauses extend Article VI, Article I, Annex L, and the emergency cascade table.

#### AC1.1 CRP Dual-Queue Separation
The Constitutional Review Panel shall operate two formally separated queues:
- **Constitutional Queue.** Handles H-1/H-2/H-3 amendment classifications, mandatory pre-clearance items under Annex H, and any matter touching Tier 1 or Tier 2 invariants. Staffed by the full 11-member panel. No operational queue item may displace or delay a constitutional queue item.
- **Operational Queue.** Handles Tier 3 operational adjustments that do not materially burden rights or cross article boundaries. Staffed by a 3-member rotating sub-panel drawn from the full CRP pool. Sub-panel composition must rotate each quarter; no member may sit on the same queue in consecutive quarters. Maximum SLA: 7 days from queue entry to decision. Operational queue decisions are subject to full-panel review on petition by any CRP member, the Federated Ombuds, or a 1/3 minority bloc within 14 days of publication.

#### AC1.2 Minimum Operational Throughput Floor
At minimum, the five highest-priority operational proposals per quarterly cycle must reach a decision — approve, reject, or return for clarification with written reasons — regardless of pending constitutional challenges. Priority ranking uses the scoring defined in AC2.1 (impact × urgency × reversibility). Pending constitutional challenges suspend constitutional queue processing but do not suspend the operational floor. Failure to meet the operational floor triggers automatic Level 1 watch under the emergency cascade.

#### AC1.3 Sequential Emergency Re-Declaration Cap
No region or deliberative body may declare a Level 3 or higher emergency in the same domain for more than two consecutive quarters without: (a) an independent audit of the original declaration's evidentiary basis, published before the third declaration takes effect; and (b) a mandatory written justification for continuation, published simultaneously. A third consecutive declaration that does not satisfy both conditions is void. This rule applies per-domain — concurrent emergencies in different domains are not affected.

**Cumulative cross-domain duration cap.** If a region or deliberative body has been under Interim Operational Authority (AC1.5) across all domains combined for more than **4 quarters in any rolling 8-quarter window**, the CRP must convene a supermajority review of continued emergency governance necessity within **30 days** of the threshold being crossed. The review must produce written findings published to the Article VII dashboard within that 30-day window. Any new IOA domain declaration filed during a pending cumulative-cap review requires advance CRP written confirmation that the cumulative-duration threshold does not bar the new declaration.

#### AC1.4 Proposal Intake Throttle and Priority Scoring
All proposals entering the Article VI deliberation pipeline must receive a priority score before queue placement. Priority score = impact × urgency × reversibility, each rated 1–5. The deliberative body sets total intake capacity per quarter. Proposals below the capacity threshold defer to the following quarter with published reasoning. Overflow proposals are published immediately — making congestion attacks visible as a public record. Voice-weighted urgency preference signals may inform urgency scoring but may not override the impact or reversibility components. The priority scoring methodology is a published document subject to P-004 definition drift protections.

**Least-of-these tiebreaker.** Where two or more proposals receive priority scores within a published proximity band of one another, the proposal whose benefit accrues primarily to the more vulnerable or worse-served population ranks higher. Vulnerability and service level are determined using the legibility-gap data of AC3.1 — the contribution categories and populations showing lower verification approval rates, higher evidence burden, or higher claim abandonment are treated as worse-served for this purpose. This tiebreaker operates only above the survival floor, which is protected unconditionally and is never subject to ranking; it ensures that a diffuse harm falling on many poorly-served people is not silently outranked by a sharp but narrowly-held institutional matter of comparable score. The proximity band and the data used to apply it are published with the priority scoring methodology and are subject to the same P-004 definition drift protections.

#### AC1.5 Cross-Quarter Interim Authorization Bridge
For Level 3 and Level 4 emergencies only, an Interim Operational Authority is constituted automatically upon emergency declaration. Composition: the Federated Ombuds, one rotating CRP member drawn by lot from the full panel, and the relevant regional executive body — all acting jointly. No single actor may activate interim authority unilaterally.

**Permitted actions.** The Interim Operational Authority may: (a) authorize affirmative operational decisions strictly within the scope stated in the emergency declaration; (b) reduce above-baseline Essential Access issuance rate (survival floor issuance remains at 100%); (c) activate reserve release protocols for the declared domain; (d) issue public notices and operational directives within the declared scope.

**Prohibited actions.** The Interim Operational Authority may not: (a) make any decision touching constitutional matters, Tier 1 or Tier 2 invariants, or Essential Access rule changes; (b) narrow the survival floor or reduce any survival-adjacent access; (c) extend its own authority beyond the declared emergency scope; (d) act beyond 72 hours without oracle confirmation (for supply matters) or CRP ratification (for governance matters).

All interim decisions are provisional, published within 1 hour of issuance, and subject to full quarterly cycle ratification or reversal. Any interim decision that exceeds declared scope is automatically void upon finding and triggers a CRP capture review.

**Declaration record requirement.** At the time of joint IOA constitution, the declaring actors must publish, within 1 hour, a declaration record that includes: (a) a written statement of the factual conditions asserted to constitute a Level 3 or Level 4 emergency; and (b) at least two independent oracle measurements or named independent sources corroborating those conditions. A declaration record that omits (a) or (b) is deficient. The CRP may issue a deficiency finding on its own motion within **5 days** of the declaration record's publication; a CRP deficiency finding entered as a public record in the Article VII dashboard suspends further IOA action in that declaration until the record is cured or the CRP closes the finding.

**Scope-exceedance challenge and capture review.** The CRP is the body authorized to make a scope-exceedance finding for any published interim decision. Any person may submit a written scope-exceedance challenge to the CRP within **14 days** of publication of an interim decision. The CRP may also self-initiate a capture review on its own motion. The CRP must complete the capture review within **30 days** of challenge filing or self-initiation. A finding that an interim decision exceeded declared scope voids that decision retroactively; the Federated Ombuds must publish a remediation record within **14 days** of the CRP finding.

**Termination audit artifact.** Within **14 days** of IOA authority terminating, the declaring actors must publish to the Article VII dashboard: a complete log of all IOA decisions taken, the evidentiary basis cited for each decision's authorization, and confirmation that each decision fell within the declared emergency scope. This publication is mandatory regardless of whether any scope-exceedance challenge was filed.

**No urgency bypass.** No urgency claim or emergency condition may waive the 1-hour declaration record requirement, the evidentiary basis publication, the termination audit artifact, or any CRP capture review process. Urgency is a reason to constitute the IOA quickly; it is not grounds for omitting the publication and oversight requirements established in this section.

#### AC1.6 Decision Quality Metrics (Article VI Extension)
The Article VI quarterly compliance report shall include the following decision quality metrics: (a) ratio of agenda items with substantive alternatives formally presented versus items with single-track framing — target floor: 50%; (b) decision reversal rate: proportion of decisions formally reversed or substantially amended within two subsequent quarterly cycles — published as a rolling 8-quarter metric; (c) minority dissent rate: proportion of decisions with published minority dissent — target floor: at least 15% of significant decisions. Material deviation from published targets for two consecutive quarters triggers a mandatory deliberation quality review conducted by an independent panel not drawn from the incumbent deliberative body.

---

### AC2. Measurement Lag and Supply Shock Hardening (P-006)
The following clauses extend Annex M (Oracle, Physical Reality, and Measurement Limits), Annex U8 (Dispute-Deprivation Shared Storehouse Bridge), and the Essential Access scarcity-mode threshold table.

#### AC2.1 Sentinel Indicator Mandate
Every essential category on a periodic audit cycle must maintain at least one sentinel indicator — a faster, lower-fidelity signal capable of providing early warning without replacing the full audit. Sentinel indicators do not trigger Shared Storehouse activation; they trigger expedited oracle review only.

| Volatility Class | Examples | Max Audit Lag | Sentinel Requirement |
| :--- | :--- | :--- | :--- |
| High | Food/staples, acute medicine, fuel/energy | 48 hours | Mandatory — minimum daily signal |
| Medium | Housing, durable goods, non-acute medicine | 7 days | Mandatory — minimum weekly signal |
| Low | Infrastructure, long-cycle goods | 30 days | Recommended — not mandatory |

Essential Access redemption velocity is a native sentinel for all essential categories. A spike exceeding 150% of the rolling 7-day average per essential category per region constitutes an automatic sentinel signal requiring no external reporting. Anomaly detection for abnormal redemption suppression patterns must be maintained to prevent gaming of the velocity signal.

#### AC2.2 Pre-Confirmation Response Protocol (PCRP)
**Trigger conditions (all must be met simultaneously):**
- A sentinel indicator or credible operational report — with named source and named evidence — suggests an essential category has crossed into Scarcity (L2) or Emergency (L3) territory.
- The report is corroborated by at least two independent sources (e.g., provider system report plus regional logistics authority, or two independent operators).
- The next scheduled oracle publication for the affected category is more than 24 hours away.

**Authority and activation:**
PCRP authority rests with the Regional Executive Body. Activation requires joint action — no single actor may activate unilaterally. The Federated Ombuds must be notified within 1 hour of activation. PCRP activation is published immediately as a public record.

**Permitted and prohibited actions:**
- **Permitted:** Reduce Essential Access issuance to 70% of above-baseline for the affected category only (see definition below). CSM-floor issuance remains at 100% per INV-001 — this is absolute and is not subject to PCRP reduction. Activate reserve release protocol for the affected category. Trigger expedited oracle review — must complete within 48 hours, not the normal cycle. Issue public notice that PCRP is active, specifying the category, trigger evidence, and named sources.
- **Prohibited:** Activate full Shared Storehouse — requires oracle confirmation. Reduce aggregate Essential Access delivery (CSM-floor + above-baseline combined, across all categories and all persons in the affected jurisdiction) below 85% of the normal delivery baseline. Affect any category other than the one named in the trigger. Extend beyond 72 hours without oracle confirmation.

**Terminology clarification:** "Above-baseline Essential Access" means the issuance above the CSM floor (the additional Essential Access allocated beyond the Constitutional Survival Minimum). The permitted 70% reduction applies only to above-baseline issuance for the single affected category. The CSM floor itself is never reduced — this is governed by INV-001, which is absolute and applies regardless of PCRP status. The 85% prohibition threshold in the prohibited actions applies to *aggregate* Essential Access delivery across all categories and persons combined; it is a separate ceiling protecting against excessive above-baseline reduction compounding across multiple simultaneous PCRP activations. These are distinct protections at different levels, neither of which supersedes the other.

**Oracle confirmation outcomes:**
If oracle confirms crisis: full Shared Storehouse activates; PCRP is superseded; oracle process governs. If oracle contradicts (supply is adequate): PCRP immediately terminates; full issuance restored; mandatory post-mortem published within 7 days; activation is logged as a false trigger. Three false PCRP activations within four quarters by the same Regional Executive Body triggers mandatory independent audit of that body's measurement access and decision process.

#### AC2.3 Shared Storehouse Unwind Symmetry — Recovery Fast-Track
When a sentinel indicator shows sustained recovery signals for 48 hours after a scarcity declaration, the oracle must publish within 24 hours whether Shared Storehouse should unwind. The conservative default bias established in Annex M applies to Shared Storehouse activation; it does NOT apply to prolonged restriction after unambiguous recovery signals. The burden of demonstrating continued scarcity rests on the authority resisting unwind, who must publish alternative continuity measures with equal or better protection. This rule is symmetric with PCRP: what can be activated quickly can be deactivated quickly on equivalent evidence.

#### AC2.4 Cadence-Adjusted U8 Bridge (Supersedes Annex U8)
Annex U8 is amended as follows. The 7-day trigger is replaced by a volatility-class-adjusted trigger: for High-volatility essential categories, if effective Essential Access falls below 85% of the normal baseline for more than 48 consecutive hours, this automatically constitutes a provisional scarcity finding sufficient to activate narrow Shared Storehouse for that category. For Medium-volatility categories, the 7-day trigger from Annex U8 is retained. For Low-volatility categories, the 7-day trigger from Annex U8 is retained. All other conditions and constraints of Annex U8 remain in force.

#### AC2.5 'Supply Shock' as Protected Term (P-004 Extension)
The term 'supply shock' as used in AC2.2 and any implementing documentation is a protected term subject to the semantic anti-capture controls of Annex AB5. Worked examples of what constitutes a qualifying supply shock versus a demand shock, an oracle dispute, or a contested scarcity finding must be published before PCRP implementation. Expanding the PCRP trigger to cover demand shocks, political disruptions, or contested oracle findings is a substantive change requiring full substantive review under P-004.

---

### AC3. Bureaucratic Elite Formation Hardening (P-008)
The following clauses extend Article VI, Annex Z (Voice and Service Record civic architecture), Annex K (Basket and Civic Fairness), Annex N (Transition Preconditions), and the P-004 protected terms registry.

#### AC3.1 Legibility Gap Audit
The Article VI quarterly report shall include the following legibility gap metrics, published in aggregate form with privacy-preserving suppression of small cells:
- Verification approval rate by contribution category (institutional, informal, care, ecological, civic operations, other).
- Average evidence burden imposed per claim, by category and by verifier pool — measured as number of evidence elements required and time to decision.
- Appeals rate by category — proportion of verification decisions formally challenged.
- Claim abandonment rate by category — proportion of initiated claims not completed.

If any informal, care, or non-institutional contribution category shows a persistent verification approval rate more than 20 percentage points below the median institutional category approval rate for two consecutive quarters, a mandatory verification process audit is triggered automatically. The audit is conducted by an independently drawn cross-category review panel — not the incumbent verifier pool. Findings are published within 60 days.

#### AC3.2 Service Record Sector Ceiling Specification — Founding Precondition
Service Record sector pool ceiling values must be specified and published before any implementing body is constituted. This is a founding precondition under Annex N. The following baseline values apply unless superseded by the founding constitutional body through the amendment process:
- No single contribution sector may hold more than 25% of seats in any Service Record-governed service pool (juries, audit pools, review boards, oversight bodies).
- No cross-sector cluster identifiable by shared institutional origin — defined as same employer type, same training program cohort, or same founding working group — may hold more than 35% of seats in any Service Record-governed service pool.

Network concentration is a governed constraint in addition to sector concentration. The 35% cluster ceiling applies to observable institutional co-service patterns, not to inferred social relationships.

#### AC3.3 Epistemic Diversity Requirement
Any Service Record-governed service pool, audit body, or review panel with more than five members must meet a published epistemic diversity standard before its composition is certified for service. The standard has three axes:
- **Institutional origin diversity:** no more than 30% of members from the same employer type (government, academic institution, non-governmental organization, enterprise).
- **Contribution-type diversity:** at least 30% of members must have their primary Service Record earned through informal, care, or non-institutional contribution categories as defined in Annex K3.
- **Geographic diversity:** at least 25% of members from regions outside the nationally identified high-density professional class concentrations, as published by the Article VII dashboard.

Epistemic diversity is a pool design requirement, not a draw-moment requirement. The eligible pool must be structured to produce diverse draws through normal sortition. Pool-depth targets for each axis are a system health metric published quarterly. A seat vacancy may not be filled if doing so would bring the body below the published diversity standard; the seat must remain temporarily vacant until a compliant draw is possible.

#### AC3.4 Verification Independence Rule (Article VI / Annex U7 Extension)
A verifier may not review contribution claims in their own primary contribution category. A verifier's primary category is the category that constitutes the largest single share of their lifetime Service Record balance. Cross-category verification is required for all mid-range and high-impact claims as defined in Annex U7. Cross-regional verification is additionally required for high-impact claims when the claimant's region shares more than 30% of its active verifier pool with the verifier's region of primary service. This rule does not apply to lightweight attestation for small claims, which retains community attestation as defined in Annex K3.

#### AC3.5 Cooling-Off Cohort Rule
In addition to individual cooling-off periods already established in Annex L and Annex S, the protocol establishes cohort cooling. A service cohort is defined as all individuals who held a significant governance role — CRP member, verifier pool lead, audit body chair, or Federated Ombuds officer — within the same 12-month window. No more than two members of the same cohort may simultaneously hold positions that share review authority over the same subject matter. Cohort membership is determined by institutional co-service record, not inferred social relationship, and is maintained by the Federated Ombuds in a published aggregate registry.

#### AC3.6 Qualification Standard Governance (P-004 Extension)
The criteria for 'demonstrated competence' required for CRP systems reviewer seats, certified pool membership, and verifier eligibility are added to the P-004 protected terms registry as Class H-1 protected specifications. Any change to what constitutes qualifying experience, qualifying training, or qualifying institutional background is a substantive change requiring full review under Annex AB5. The body that defines or revises qualification standards must include at least 40% of members from contribution backgrounds that would have been classified as non-qualifying under the prior standard — ensuring that exclusionary effects of prior standards are reviewed by people who experienced them.

#### AC3.7 Concentration Dashboard (Article VII Extension)
The Article VII transparency infrastructure shall publish the following elite concentration metrics on a rolling basis, with a 30-day publication lag to prevent threshold gaming:
- Sector distribution of active members in each Service Record-governed service pool (aggregate, privacy-preserving, small-cell suppressed).
- Institutional origin diversity score per major oversight body — measured against the AC3.3 standard.
- Cohort overlap index: proportion of currently active governance role holders who share a service cohort with one or more other currently active holders.
- Legibility gap metrics from AC3.1: approval rate differential between institutional and informal contribution categories.
- Pool-depth health metrics: current pool size versus minimum required size for each axis of the AC3.3 diversity standard.

When the concentration dashboard shows the cohort overlap index exceeding the published threshold for any major oversight body, automatic Level 1 watch escalation is triggered without requiring human initiation — using the same mechanism as the throughput dashboard established in AC1. Thresholds are published and subject to P-004 definitional protections.

#### AC3.8 Epistemic Monoculture Red-Team
The institutional-origin, cohort, and sector ceilings of AC3.2, AC3.3, and AC3.5 constrain observable co-service patterns but do not by themselves detect a pool that shares values, vocabulary, and tacit deference while satisfying every numeric ceiling. To guard against a class that functions as a closed guild without tripping any institutional-label limit, each major Service Record-governed oversight body is subject to a periodic external red-team review of the reasoning diversity of its pool — diversity of mind, not only of institutional origin.

- **Conduct.** The review is performed by an independently drawn panel not part of the pool under review and not sharing its primary contribution categories. It examines whether the pool reaches homogeneous conclusions on contested, genuinely two-sided questions in patterns not explained by the merits of those questions — for example, convergence that tracks shared training lineage or professional formation rather than the evidence and arguments on record.
- **Method constraints.** The review tests reasoning and conclusion patterns, not the protected viewpoints or beliefs of individual members. It may not be used to penalize good-faith dissent, to enforce a preferred conclusion, or to compel uniformity; its purpose is to detect uniformity that the merits do not justify. Methodology is published and is a P-004 protected specification subject to Annex AB5 review before any change.
- **Effect of findings.** A finding of epistemic monoculture is treated as a concentration signal under the existing AC3 triggers: it is published on the AC3.7 concentration dashboard subject to the standard 30-day lag, and a sustained or severe finding escalates through the same automatic Level 1 watch mechanism that AC3.7 applies to the cohort overlap index. Remediation follows the verification-audit pathway of AC3.1 — an independently drawn cross-category panel, with findings published within 60 days — and may include widening the eligible pool along the AC3.3 axes rather than removing members for the conclusions they hold.

---

### AC4. Threat and Patch Linkage

| Threat ID | Patch ID | Status | Annex |
| :--- | :--- | :--- | :--- |
| T-001 | P-001 | ACTIVE | AB |
| T-002 | P-003 | ACTIVE | AB |
| T-004 | P-002 | ACTIVE | AB |
| T-007 | P-004 | ACTIVE | AB |
| T-005 | P-005 | ACTIVE | AC1 |
| T-006 | P-006 | ACTIVE | AC2 |
| T-008 | P-008 | ACTIVE | AC3 |

---

*This annex is part of the Humane Constitution document set. It must be integrated into the Humane Constitution before public distribution. Where this annex conflicts with earlier language, this annex governs. The patch log extension (P-005, P-006, P-008) and threat register additions (T-005, T-006, T-008) are companion documents to this annex.*

---
