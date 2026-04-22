# ANNEX AC — Session 2 Hardening Clauses

**Purpose.** This annex introduces the operative clauses produced during the second hardening cycle, covering T-005 Governance Throughput Failure (P-005), T-006 Measurement Lag and Supply Shock Behavior (P-006), and T-008 Bureaucratic Elite Formation (P-008). Where clauses in this annex conflict with earlier language, this annex governs. Clauses are PROPOSED and become operative only when formally accepted into the constitution.

**Interpretive rule.** These clauses follow the same interpretive hierarchy as Annex AB. Unconditional survival, non-convertibility, and humane-floor protections are unaffected by any clause in this annex.

### AC1. Governance Throughput Hardening (P-005)
The following clauses extend Article VI, Article I, Annex L, and the emergency cascade table.

#### AC1.1 CRP Dual-Queue Separation
The Constitutional Review Panel shall operate two formally separated queues:
- **Constitutional Queue.** Handles H-1/H-2/H-3 amendment classifications, mandatory pre-clearance items under Annex H, and any matter touching Tier 1 or Tier 2 invariants. Staffed by the full 11-member panel. No operational queue item may displace or delay a constitutional queue item.
- **Operational Queue.** Handles Tier 3 operational adjustments that do not materially burden rights or cross article boundaries. Staffed by a 3-member rotating sub-panel drawn from the full CRP pool. Sub-panel composition must rotate each quarter; no member may sit on the same queue in consecutive quarters. Maximum SLA: 7 days from queue entry to decision. Operational queue decisions are subject to full-panel review on petition by any CRP member, the Federated Ombuds, or a 1/3 minority bloc within 14 days of publication.

#### AC1.2 Minimum Operational Throughput Floor
At minimum, the five highest-priority operational proposals per quarterly cycle must reach a decision — approve, reject, or return for clarification with written reasons — regardless of pending constitutional challenges. Priority ranking uses the scoring defined in AC2.1 (impact × urgency × reversibility). Pending constitutional challenges suspend constitutional queue processing but do not suspend the operational floor. Failure to meet the operational floor triggers automatic Level 1 watch under the emergency cascade.

#### AC1.3 Sequential Emergency Re-Declaration Cap
No region or deliberative body may declare a Level 3 or higher emergency in the same domain for more than two consecutive quarters without: (a) an independent audit of the original declaration's evidentiary basis, published before the third declaration takes effect; and (b) a mandatory written justification for continuation, published simultaneously. A third consecutive declaration that does not satisfy both conditions is void. This rule applies per-domain — concurrent emergencies in different domains are not affected.

#### AC1.4 Proposal Intake Throttle and Priority Scoring
All proposals entering the Article VI deliberation pipeline must receive a priority score before queue placement. Priority score = impact × urgency × reversibility, each rated 1–5. The deliberative body sets total intake capacity per quarter. Proposals below the capacity threshold defer to the following quarter with published reasoning. Overflow proposals are published immediately — making congestion attacks visible as a public record. Voice-weighted urgency preference signals may inform urgency scoring but may not override the impact or reversibility components. The priority scoring methodology is a published document subject to P-004 definition drift protections.

#### AC1.5 Cross-Quarter Interim Authorization Bridge
For Level 3 and Level 4 emergencies only, an Interim Operational Authority is constituted automatically upon emergency declaration. Composition: the Federated Ombuds, one rotating CRP member drawn by lot from the full panel, and the relevant regional executive body — all acting jointly. No single actor may activate interim authority unilaterally.

**Permitted actions.** The Interim Operational Authority may: (a) authorize affirmative operational decisions strictly within the scope stated in the emergency declaration; (b) reduce above-baseline Essential Access issuance rate (survival floor issuance remains at 100%); (c) activate reserve release protocols for the declared domain; (d) issue public notices and operational directives within the declared scope.

**Prohibited actions.** The Interim Operational Authority may not: (a) make any decision touching constitutional matters, Tier 1 or Tier 2 invariants, or Essential Access rule changes; (b) narrow the survival floor or reduce any survival-adjacent access; (c) extend its own authority beyond the declared emergency scope; (d) act beyond 72 hours without oracle confirmation (for supply matters) or CRP ratification (for governance matters).

All interim decisions are provisional, published within 1 hour of issuance, and subject to full quarterly cycle ratification or reversal. Any interim decision that exceeds declared scope is automatically void upon finding and triggers a CRP capture review.

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
- **Permitted:** Reduce Essential Access issuance to 70% of above-baseline for the affected category only. Humane floor issuance remains at 100%. Activate reserve release protocol for the affected category. Trigger expedited oracle review — must complete within 48 hours, not the normal cycle. Issue public notice that PCRP is active, specifying the category, trigger evidence, and named sources.
- **Prohibited:** Activate full Shared Storehouse — requires oracle confirmation. Narrow survival floor access below 85% of baseline. Affect any category other than the one named in the trigger. Extend beyond 72 hours without oracle confirmation.

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

---

### AC4. Updated Threat/Patch Linkage (Session 2)

| Threat ID | Patch ID | Status | Annex |
| :--- | :--- | :--- | :--- |
| T-001 | P-001 | ACTIVE | AB |
| T-002 | P-003 | ACTIVE | AB |
| T-004 | P-002 | ACTIVE | AB |
| T-007 | P-004 | ACTIVE | AB |
| T-005 | P-005 | PROPOSED | AC1 |
| T-006 | P-006 | PROPOSED | AC2 |
| T-008 | P-008 | PROPOSED | AC3 |

*Green rows: ACTIVE patches from Session 1 (Annex AB). Yellow rows: PROPOSED patches from Session 2 (Annex AC). PROPOSED patches are not yet operative.*

---

### AC5. Next Hardening Queue
The following threats remain in the hardening queue following Session 2:
- **T-011 — Narrative Attack Surface.** Compound threat with T-008: elite formation creates the narrative vulnerability; P-008 concentration dashboard provides the evidence base for defense.
- **Compound interface tests** — identity × scarcity × issuance × civic weighting. Annual simulation requirement extended per P-005 AC1 and P-006 AC2.
- **Ombuds Office concentration risk** (open question from P-008) — who audits the auditors of elite formation?
- **T-006 cross-threat validation** — PCRP authority at Regional Executive Body level assessed for T-008 elite formation risk.

*This annex is part of the Humane Constitution document set. It must be integrated into the Humane Constitution before public distribution. Where this annex conflicts with earlier language, this annex governs. The patch log extension (P-005, P-006, P-008) and threat register additions (T-005, T-006, T-008) are companion documents to this annex.*

---
