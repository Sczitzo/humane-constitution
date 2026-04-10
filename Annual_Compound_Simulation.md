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

*This simulation is an input to the scale readiness assessment, not a deployment plan. It should be updated with actual pilot data as it becomes available.*
