# Annual Compound Simulation

*A structured walkthrough of how the protocol behaves over a full year of operation — covering delivery cycles, scarcity events, governance processes, patch progression, and compounding interactions between pillars.*

This is not a prediction. It is a stress-test: running the system through a plausible operational year to expose timing conflicts, resource dependencies, and compound failure modes not visible in static design review.

---

## Assumptions

- The protocol is operating in a bounded pilot jurisdiction (city-scale or regional)
- All ACTIVE patches are in force; PROPOSED patches are under evaluation
- The founding instrument (P-014) has executed and foundational institutions are operational
- Baseline LC basket has been defined and initial RCS measurement is complete
- Approximate population: 500,000 persons enrolled

---

## Quarter 1 (Months 1–3): Baseline operation

### Month 1
**LC delivery:** First full delivery cycle. Wallets credited with baseline basket allocations. Early friction expected at points of redemption — vendors not yet fully integrated, transit operators calibrating acceptance.

**Observed issues:**
- ~3% of enrollees report redemption failures at transit nodes
- Two vendor disputes over EC/LC boundary (vendors attempting to charge LC surcharges)

**System response:**
- Enforcement branch (Pillar 10) issues vendor compliance notices
- Partitioned wallet protections prevent affected individuals from losing access during dispute resolution
- RCS flags the transit integration gap; corrective SLA clock starts

**Patch relevance:** P-001 (Shadow Convertibility) surveillance detects the surcharge attempts; both are classified as T-001 low-severity instances and logged.

---

### Month 2
**Civic deliberation:** First CRP (Civic Review Panel) session. Agenda items submitted via DW/CR system. Early diversity controls triggered — over-representation from one demographic cluster identified and weighted.

**Oracle measurement:** First quarterly RCS report published. Confidence bands are wide (first-cycle data). Two pillars (housing, healthcare) show measurement uncertainty above threshold.

**System response:**
- Measurement uncertainty published with explicit confidence bands per protocol commitment
- Second-source measurement commissioned for housing and healthcare components
- CRP proceeds with conservative defaults on uncertain basket components

---

### Month 3
**First PCRP alert:** A regional drought is flagged by two independent RCS nodes as potentially meeting SQ threshold. Alert does not yet meet the activation threshold (requires three nodes).

**Governance:** CRP produces first formal priority-setting output — three agenda items advanced to operational implementation. One item (transit frequency increase) requires EC budget approval; formal pathway initiated.

**Patch log review:** Formal Acceptance Committee meets for first scheduled review. No patches ready for ACTIVE status — all in evidence-gathering phase.

---

## Quarter 2 (Months 4–6): First stress event

### Month 4
**SQ activation — drought:** Third RCS node confirms drought threshold. SQ activated for water-intensive food basket components in affected sub-region. Public log entry created. Rationing parameters published within 24 hours of activation.

**Impact:** ~45,000 persons in affected sub-region receive modified basket (substitutions for water-intensive items). EC market for those items continues unrestricted outside the SQ scope.

**Compound effect:** LC delivery system routes substitution allocations through existing vendor network. Two vendors in the sub-region lack the substitute items. Emergency vendor expansion initiated.

**Monitoring:** Post-activation, daily RCS reports for affected components. Termination procedure clock running (maximum 90-day activation without renewed justification).

---

### Month 5
**Oracle dispute:** One RCS measurement node disputes the drought severity assessment of another. Conservative default applied — SQ remains active while dispute resolves. Affected persons retain access throughout.

**Resolution timeline:** Dispute resolution protocol gives 21 days. Resolved on day 14 — original activation confirmed as valid.

**Governance parallel:** CRP deliberating on whether the SQ basket substitutions adequately meet nutritional equivalence. Contested. Resolution refers to independent nutritional assessment (Pillar 3 sub-process).

**EC market observation:** EC prices for drought-affected crops spike in regional market. This is expected and permitted — EC operates freely. No spillover into LC delivery detected at this stage.

---

### Month 6
**SQ deactivation:** Drought conditions ease. SQ deactivated on day 74 of 90-day maximum. Public post-mortem published within 7 days: activation was valid, substitutions were nutritionally adequate, two vendor gaps identified and addressed. One process improvement recommended.

**Patch relevance:** Post-mortem feeds into T-003 (SQ Scope Creep) monitoring — no scope creep detected. P-003 (SQ Termination Procedure) performed as designed.

**Governance:** CRP completes second session. EC budget approval for transit frequency increase clears — implementation scheduled for Q3.

---

## Quarter 3 (Months 7–9): Governance cycle and patch progression

### Month 7
**Identity continuity event:** 127 persons flagged by Pillar 2 identity system as requiring continuity review (life change events — relocation, household change, incapacity). Standard review process initiated; LC access maintained throughout.

**Compound note:** One relocation case involves cross-jurisdictional movement (outside pilot boundary). Edge case exposed: no protocol coverage for cross-boundary continuity. Logged as a gap; addressed under existing grace provisions.

**Patch progression:** Formal Acceptance Committee reviews evidence for P-005 (Governance Throughput Enhancement). Six months of CRP operation data available. Committee votes to advance from PROPOSED to ACTIVE pending one additional evidence cycle.

---

### Month 8
**Bureaucratic elite formation indicator:** Pillar 9 diversity monitoring flags that CRP panel composition has drifted — three consecutive panels have drawn from overlapping networks. Anti-capture weighting automatically adjusted. Panel recomposition for next session.

**This is expected.** The patch for T-008 (Bureaucratic Elite Formation) is functioning as designed. The alert itself is the system working.

**LC delivery — 8-month review:** Cumulative redemption success rate: 96.8%. Transit integration failure rate dropped from 3% (Month 1) to 0.4%. Vendor surcharge attempts: 7 total, all resolved, all logged.

---

### Month 9
**Annual RCS calibration begins:** Full measurement cycle for basket adequacy assessment. Cross-pillar dependency mapping updated. Confidence bands have narrowed significantly from Q1 (more data, better calibration).

**Governance:** Third CRP session. First formally contested agenda item — a proposed LC basket expansion (adding a mental health services component). Contested on measurement grounds (how to verify delivery). Referred for pilot study rather than immediate inclusion.

**EC market integration check:** No evidence of systematic LC/EC convertibility attempts beyond the Month 1 cases. Shadow convertibility monitoring (T-001) shows low activity.

---

## Quarter 4 (Months 10–12): Year-end processes

### Month 10
**Compound stress test — concurrent events:** Three things happen in the same 30-day window:
1. A public health event (flu outbreak) increases healthcare LC demand by ~15%
2. A vendor dispute escalates to formal enforcement
3. A patch acceptance vote is scheduled

**System response:**
- Healthcare demand surge absorbed within existing LC delivery capacity (within confidence band)
- Vendor enforcement proceeds independently through Pillar 10; does not affect LC delivery to end users
- Patch acceptance vote proceeds on schedule — no emergency provisions invoked

**Finding:** Concurrent minor events do not compound into a crisis. Modular pillar design prevents cross-contamination.

---

### Month 11
**Patch acceptance vote:** P-005 (Governance Throughput) advances to ACTIVE. First patch to complete the full evidence-based acceptance cycle. Public record updated.

**Compound simulation — attempted double-event:** Model a scenario where the flu outbreak had been more severe (hospitalisation surge) coinciding with the drought SQ from Q2.

**Finding:** The two systems (SQ for food, healthcare LC delivery surge) operate on separate tracks. Compound activation is possible but does not create a single point of failure. The load on the enforcement and review system would be significant — two concurrent post-mortems plus a patch vote. Operational capacity is the constraint, not architectural failure.

**Recommendation logged:** Pilot should include an explicit compound-event operational test before any scale-up.

---

### Month 12
**Annual review cycle:**

| Metric | Target | Observed |
|---|---|---|
| LC redemption success rate | ≥ 95% | 96.8% |
| SQ activations | — | 1 (valid, resolved) |
| PCRP false triggers | — | 0 |
| Oracle disputes | — | 1 (resolved within protocol) |
| Vendor enforcement actions | — | 7 (all resolved) |
| Patches advanced to ACTIVE | — | 1 (P-005) |
| Cross-boundary gaps logged | — | 1 (under review) |
| Bureaucratic elite formation alerts | — | 1 (auto-corrected) |

**Patch log update:** One patch advanced. Thirteen remaining PROPOSED patches require additional evidence cycles — estimated 2–3 years at current pace for full portfolio.

**Formal Acceptance Protocol trigger:** Year-end review initiates formal evidence synthesis for three additional patches (P-002, P-008, P-011). Each requires one more evidence cycle before vote-readiness.

---

## Compound failure scenarios not triggered (and why)

The following compounding failure modes were monitored but did not materialise. They remain live risks.

**Double SQ + governance deadlock:** A second SQ activation during an active CRP dispute could create a situation where rationing is in force but its legitimacy is contested. The conservative default (maintain access; continue SQ while dispute resolves) is the designed response, but it has not been tested in practice.

**Identity system failure during LC delivery cycle:** If Pillar 2 (identity) experiences a systematic failure during monthly LC delivery, affected persons may not receive allocations on schedule. Contingency provisioning covers 30 days, but a sustained outage would require emergency governance action. Not modelled in current pilot.

**Shadow convertibility at scale:** Seven low-severity instances in Year 1 is manageable. The question is whether the rate scales linearly or exponentially with economic pressure. The current monitoring infrastructure (T-001 patches) has not been tested at high economic stress.

---

## Key findings

1. **Modular design holds under concurrent minor events.** Cross-pillar contamination did not occur in any of the simulated scenarios.

2. **Post-mortem cadence is the operational bottleneck.** Two concurrent post-mortems plus routine governance operations would strain a small founding team. Staff capacity for transparency obligations is a real constraint.

3. **Conservative defaults protect individuals consistently.** In every dispute and uncertainty scenario, access was maintained. The defaults are doing their structural job.

4. **Patch progression is slow by design.** One patch in twelve months is not a failure — it is the evidence standard working. Stakeholders should be prepared for a multi-year patch acceptance timeline.

5. **Cross-boundary gaps require early attention.** The pilot boundary creates artificial clean edges. Real-world deployment will need cross-jurisdiction continuity protocols before scale.

6. **The compound-event operational capacity question is unresolved.** Architecture handles compound events; human operational capacity may not. Explicit compound-event drills are recommended before any scale-up decision.

---

---

## Session 8 Scenarios — Pre-Scale-Up Stress Tests

*Required by P-019 (Pilot External Validity Gate, Annex AN): the Annual Compound Simulation must include at least one compound-crisis scenario not previously simulated before each scale-up gate. The following two scenarios fulfill this requirement for the first scale-up gate.*

---

### Scenario A — Talent Drain Under Sustained Incentive Pressure

**Purpose:** Test whether the LC floor remains deliverable when high-skill productive capacity exits the jurisdiction, and whether the incentive architecture produces meaningful containment. Addresses T-004 (Incentive Collapse) and the red-team finding that sector-specific productivity collapse and brain drain are undermodelled.

**Starting conditions:** Year 3 of operation. System is functioning as designed. The pilot jurisdiction is adjacent to a comparable jurisdiction that does not operate the protocol and offers full property ownership, uncapped EC accumulation, and no demurrage. A sustained media narrative in the non-protocol jurisdiction characterizes the protocol as restricting economic potential.

**Stress parameters:**
- 5% of the top-quartile productive capacity exits the jurisdiction per year for 3 consecutive years (cumulative: approximately 14% reduction in top-quartile labor supply).
- Exits are concentrated in housing construction (already supply-constrained), healthcare delivery, and specialized food production.
- EC market wages for remaining high-skill labor rise in response, increasing pressure on firms to relocate rather than pay.

**Year 1 of stress (Year 3 of operation):**

LC basket deliverability check: Is housing supply adequate with 5% reduction in construction capacity?

*Simulation finding:* Housing LC delivery falls to 93.2% success rate (below the 95% target). The shortfall is in construction completion rate, not in distribution logistics. The RCS flags it as a supply-side capacity event; conservative defaults maintain access for existing enrollees while new enrollment intake slows. An SQ-adjacent review is triggered for housing. No formal SQ activation yet — shortage is projected, not confirmed.

*Governance response:* CRP deliberates on whether the housing shortfall constitutes a structural threat requiring a root-cause review. Contested: some members argue the protocol's demurrage rules are contributing to the construction investment shortage (T-004 feedback loop). A root-cause working group is convened. This consumes governance bandwidth — 2 of the 5 quarterly CRP floor slots occupied.

**Year 2 of stress (Year 4 of operation):**

Cumulative 10% top-quartile exit. Housing construction capacity now 10% below Year 0 baseline. Healthcare delivery is operating at 96% capacity but specialist availability has dropped measurably.

*LC delivery:* Housing basket success rate: 91.4%. Healthcare basket success rate: 94.8% (below target). Both categories now below the 95% floor — dual-category shortfall. SQ consideration for both simultaneously.

*Compound governance load:* Root-cause review on housing from Year 1 is ongoing. Healthcare shortfall triggers a second root-cause review. Patch acceptance vote for P-017 (oracle independence) was scheduled this quarter — postponed due to governance bandwidth constraint. This is T-005 (Governance Throughput) emerging under compound load.

*Economic signal:* EC market shows rising wage pressure in housing and healthcare. EC pricing is functioning as designed (markets adjusting to scarcity). But the LC basket now requires delivering goods whose production is constrained — the floor guarantee is in tension with capacity reality.

**Year 3 of stress (Year 5 of operation):**

Cumulative 14% top-quartile exit. Confidence interval on housing capacity has widened. Oracle dispute emerges between two measurement nodes on whether housing shortage is structural or cyclical.

*Failure mode exposed:* The system's conservative default (maintain access during oracle disputes) is now being maintained for an extended oracle dispute in a category with genuine supply constraint. The conservative default is simultaneously correct (protecting access) and unsustainable (issuing access entitlements into a constrained supply pool).

*Critical finding:* The incentive architecture (P-002) assumes the contribution reward gradient is sufficient to retain high-skill labor. The simulation reveals that the gradient is insufficient when the adjacent jurisdiction offers uncapped upside. The gap between "meaningful opportunity and recognition" (P-002 language) and "uncapped accumulation" is larger than the original incentive model assumed.

**Findings and recommendations:**

1. **The incentive architecture has a jurisdiction-relative failure mode.** P-002's nonlinear reward curves must be calibrated against the attractiveness of exit options in comparable jurisdictions, not just against internal incentive psychology. Add a "talent mobility index" to the Pillar 11 dashboard as an early warning metric.

2. **The conservative default for oracle disputes is not calibrated for sustained supply constraint.** When a category is both genuinely supply-constrained and in an oracle dispute, the current design has no mechanism to reconcile access maintenance with physical delivery limits. P-006 must add a "sustained constraint conservative bridge" — a protocol for when conservative defaults cannot be maintained indefinitely. Logged as open problem for next patch cycle.

3. **Demurrage calibration requires sector-specific review.** Housing construction requires long-horizon investment. The current demurrage rules may be penalizing patient productive planning in exactly the sectors most critical for LC basket delivery. The patch log's investment channel provisions (P-002) must be tested against construction-sector capital requirements before scale-up.

4. **The 5%-per-year threshold is not a cliff.** Below approximately 8% cumulative exit of top-quartile capacity, the system degrades but maintains above-threshold performance. The failure is gradual, which is both reassuring (time to respond) and dangerous (hard to detect before it is severe — D=3 for talent drain under current monitoring).

**Recommendation logged:** Pilot should track top-quartile labor mobility as a Pillar 11 metric before scale-up. A quarterly talent retention indicator is required. Threshold for mandatory incentive architecture review: 3% cumulative exit in any single essential-delivery sector within 12 months.

---

### Scenario B — Civic Legibility Crisis

**Purpose:** Test whether DW/CR participants who are not protocol specialists can meaningfully participate in agenda-setting on a contested issue. If the answer is no, the system's civic layer is de facto technocratic regardless of its formal design. Addresses T-008 (Bureaucratic Elite Formation) and the red-team finding that complexity-legitimacy gap in the civic layer is undermodelled.

**Starting conditions:** Year 2 of operation. First full CRP cycle complete. DW/CR enrollment is at 67% of adult population. However, active participation in agenda-setting (DW exercise) is concentrated: the top 20% of DW holders account for 71% of agenda-item submissions.

**Test event:** A contested agenda item reaches the CRP floor: whether to add a mental health services component to the LC basket. This item is technically and normatively complex — it requires understanding of: (a) what "mental health services" means in the basket context; (b) how the RCS measures delivery capacity for this category; (c) how the protection against DW/CR gating dignitarian access applies; (d) how the contribution system would recognize mental health service provision; and (e) what the oracle confidence bands mean for this category.

**Legibility test administered:** Before the CRP session, a structured legibility assessment is conducted with a stratified sample of DW holders (n=200, stratified by DW balance quintile, contribution category, and urban/non-urban geography). Participants are asked to:

1. In plain language, describe what the agenda item proposes.
2. Identify one argument for and one against the proposed addition.
3. Describe what information they would need to make a decision.
4. Indicate their confidence in their understanding (1–5 scale).

**Results:**

| Quintile by DW balance | Accurate item description | Could articulate both sides | Confidence ≥ 3 |
|---|---|---|---|
| Top 20% | 84% | 79% | 91% |
| Quintiles 2–4 | 51% | 38% | 62% |
| Bottom 20% | 23% | 14% | 31% |

**Finding:** The civic layer produces a 61-percentage-point gap in legibility between the top and bottom quintiles. Bottom-quintile participants — who hold the lowest DW balances and are least likely to have participated in prior CRP processes — have a 23% accurate understanding of the item on which they nominally have civic weight.

This is not a design failure of the DW/CR system's rules. It is a legibility failure: the agenda-setting process produces items that are not legible to the majority of the people whose DW weight is intended to represent their civic preferences.

**Governance response simulated:** The CRP proceeds with the contested item. Voting weight is distributed by DW balance. The item passes narrowly. Post-vote survey: 44% of DW holders who voted report they were "not sure" what they were voting on.

**Implications for civic design:**

1. **The DW/CR system needs a legibility standard, not just a representation standard.** Current P-008 diversity requirements ensure diverse people hold DW/CR; they do not ensure diverse people can meaningfully exercise it. A legibility floor — a minimum required proportion of DW holders who can accurately describe an agenda item before it proceeds to a vote — is not currently specified.

2. **The agenda submission process concentrates legibility.** Submissions come from high-DW holders who understand the system. The deliberation process takes that submission and asks lower-DW holders to evaluate it. The deliberation design should include a "legibility translation" step: converting technical agenda items into plain-language summaries vetted for accuracy before the vote.

3. **Confidence ≠ accuracy.** Top-quintile participants have both high accuracy and high confidence. Bottom-quintile participants have low accuracy and low confidence. This is actually a good sign: the bottom quintile knows it doesn't understand, which means it may defer or abstain rather than vote in ignorance. But abstention concentrates effective voting weight further in the top quintile — recreating the inequality the DW system was designed to avoid.

4. **The CFRL and Pillar 11 dashboard must include agenda-item translations.** Plain-language summaries of every CRP agenda item, vetted for accuracy by a body that includes non-specialist participants, should be a mandatory pre-vote publication. This is an extension of the P-011 (Narrative) architecture into the internal civic process.

**Recommendation logged:** Add a "civic legibility review" to the standard CRP agenda process: a structured 7-day period before any vote during which a plain-language item summary is published, feedback from a stratified participant panel is collected, and the summary is revised if accuracy is below 60% for non-specialist participants. This is not a veto mechanism — it is a deliberation-quality requirement. The legibility review does not delay votes if the threshold is met; it only extends the timeline if it is not.

**Pre-scale-up gate:** A civic legibility audit — measuring the gap in legibility across DW quintiles — is required before any scale-up decision. If the bottom-quintile legibility rate is below 40% for contested agenda items, the scale-up gate requires a remediation plan before proceeding.

---

## Updated Key Findings (incorporating Session 8 scenarios)

7. **The incentive architecture has a jurisdiction-relative failure mode not captured by internal incentive psychology.** P-002's contribution model must be calibrated against the exit options available in comparable jurisdictions. A talent mobility index is required as a Pillar 11 metric before scale-up.

8. **The conservative default for oracle disputes is not calibrated for sustained supply constraint.** A "sustained constraint conservative bridge" protocol is required in P-006 for categories that are simultaneously genuinely supply-constrained and in oracle dispute.

9. **The civic layer produces a significant legibility gap across DW quintiles.** The P-008 diversity requirements address representation; they do not address legibility. A civic legibility standard and agenda-item translation process must be added before scale-up.

10. **Pilot external validity requires stress-condition evidence.** Neither scenario was testable in a smooth Year 1 operation. P-019 (Pilot External Validity Gate) requires explicit documentation of conditions that could not be tested and designated substitute evidence. These two scenarios fulfill the Session 8 simulation requirement per P-019; they do not substitute for live observation of the conditions they simulate.

---

*This simulation is an input to the scale readiness assessment, not a deployment plan. It should be updated with actual pilot data as it becomes available. Session 8 scenarios fulfill the P-019 pre-scale-up simulation requirement for the first scale-up gate.*
