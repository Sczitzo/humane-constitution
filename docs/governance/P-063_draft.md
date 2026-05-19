# P-063 — Productive-Use Extraction Limit: Pay-Ratio Disqualification (Draft v4)

> **DRAFT — Not published. Not committed. Not corpus-registered.**
> Do not add to Patch_Log.md, ANNEX_D.md, or INDEX.md until reviewed and approved.
> Supersedes drafts v1, v2, v3. Incorporates 5-agent red-team findings from v3 round plus founder policy decisions.

---

- **Proposed Patch ID:** P-063
- **Status:** PROPOSED
- **Priority:** High
- **Related threat / pressure:** T-025 (Demurrage Sector-Capture) / extraction-through-labor within productive-use exemption
- **Constitutional text target:** ANNEX_D.md — amendment to §D6.2(d) clause text; new §D6.9 (graduated extraction limit); new §D6.10 (labor-displacement limit); conforming notes to §D6.7 and §D8
- **Linked patches:** P-017 (oracle independence), P-023 (contract-commitment architecture), P-029 (PFCR demurrage routing), P-031 (anti-dynasty ownership), P-033 (worker-owned enterprise preference), P-045 (enforcement panel)
- **Tier classification:** Extraction caps and graduation formula are **Tier 3 calibration parameters** subject to oracle-calibrated adjustment within stated ranges. The existence of an extraction-limit eligibility condition on §D6.2(d) is a Tier 3 amendment to eligibility conditions, not a change to its basic terms.
- **Operative status prerequisite:** This patch remains at status **Designed** until the TSP confirms that oracle payroll pipelines, extraction reporting, worldwide disclosure processing, and affiliated-entity consolidation protocols are operational. TSP prerequisite has no expiration; if not published within 36 months of adoption, the CRP shall conduct a status review.

---

## Purpose and Constitutional Grounding

The §D6.2(d) productive-use exclusion shields active enterprise assets from demurrage. This is correct: capital genuinely at work should not carry the same cost as passive hoarded wealth.

But the exclusion does not currently distinguish between an enterprise that shares its surplus broadly and one that concentrates it entirely at the top. An owner extracting fifty times what a worker earns gets the same constitutional protection as one extracting three times — even though one relationship is productive and mutual, and the other is dispossession wearing the clothes of enterprise.

The Jubilee Directive (§D8) exists to transfer productive assets toward households near the participation floor S. The demurrage system exists to prevent static wealth accumulation. A productive-use exclusion that shelters 50:1 or 100:1 extraction ratios undermines both.

**Constitutional framing:** This patch narrows the eligibility test for §D6.2(d). No new instrument or rate is created. Assets that no longer qualify re-enter assessed net worth and face standard demurrage tiers. This is consistent with §D9.1 — no new charge is introduced; the existing charge applies to a narrower class of sheltered assets.

**Jubilee and Christ-centered grounding:** The Jubilee in Leviticus 25 set a categorical boundary — past this point, accumulation is not stewardship, it is dispossession. This patch encodes the same logic. The graduated structure below says: the further you are from sharing the surplus, the less of your business is shielded. And the penalties for gaming the rule flow entirely back to the workers who were harmed — not to administrative overhead, not to the state, but to the people whose labor generated the disparity.

---

## Patch Clauses

### P-063.1 — Amendment to §D6.2(d): Productive-Use Eligibility Condition

**Amend §D6.2(d) of ANNEX_D to read:**

> **(d) Active enterprise assets.** The net assessed value of an operating business in which the holder is a material participant, not a passive investor, is excluded from the net worth base. A holder is a material participant if they actively direct operations, contribute substantial personal services, and hold a beneficial ownership interest in the enterprise. **This exclusion is graduated based on the holder's personal extraction ratio as defined in §D6.9. A holder whose extraction ratio exceeds the disqualification threshold in §D6.9 does not qualify for any portion of this exclusion with respect to the affected enterprise during the period of disqualification.**

*The eligibility condition is a Tier 3 parameter. This amendment does not require the Founding Amendment Process.*

---

### P-063.2 — New §D6.9: Productive-Use Extraction Limit

**Add to ANNEX_D as §D6.9, immediately following §D6.8:**

> **§D6.9 Productive-Use Extraction Limit**
>
> **(a) Purpose.** This section establishes graduated eligibility conditions for the §D6.2(d) enterprise-asset exclusion, calibrated to the relationship between the holder's personal extraction and the compensation of the enterprise's lowest-paid worker.
>
> **(b) Scope.** Applies to any holder claiming the §D6.2(d) exclusion as a material participant. Applies to the holder's share of enterprise assets. Enterprises with fewer than 10 workers (per §P-063.5) are outside scope, subject to the worker-count aggregation rule in §P-063.5(d).
>
> **(c) Graduated exclusion formula.** The fraction of the §D6.2(d) exclusion the holder may claim is:
>
> **exempt_fraction = max(0, 1 − (R − 3.0) / 2.0)**
>
> Where R is the holder's personal extraction ratio as defined in §P-063.3(d).
>
> - At R ≤ 3.0: full exclusion (100%)
> - At R = 4.0: 50% exclusion
> - At R ≥ 5.0: no exclusion (0%) — full disqualification
> - Between 3.0 and 5.0: proportional exclusion declining linearly
>
> The 3.0 lower bound and 5.0 upper bound are Tier 3 calibration values. Oracle may adjust within [2.0, 5.0] for the lower bound and [4.0, 8.0] for the upper bound. Oracle may not simultaneously calibrate both bounds to their respective minimums without FAP approval.
>
> **(d) Floor-proximity tightening.** Where the enterprise's lowest-paid worker earns below the participation floor S, the lower bound tightens to 2.0 and the upper bound tightens to 4.0. The formula narrows to:
>
> **exempt_fraction = max(0, 1 − (R − 2.0) / 2.0)**
>
> This condition is evaluated per worker. If any worker in the enterprise earns below S, the tighter formula applies to the entire exclusion claim for that holder.
>
> **(e) Cure window — 30 days.** A holder whose ratio first exceeds the applicable upper bound receives oracle notification. The holder has 30 days from notification to cure the breach before disqualification is formally confirmed. During the 30-day window:
>
> - Demurrage accrues on the disqualified fraction at standard assessed net worth rates from the date of oracle notification. This accrual is owed regardless of cure outcome and is not reversed.
> - If the holder returns to compliance within 30 days, formal disqualification does not trigger. The graduated exclusion is restored prospectively from the compliance date.
> - If cure does not occur within 30 days, full disqualification (0% exclusion) applies from the oracle notification date and continues until compliance is achieved.
>
> The 30-day cure window may not be used as a recurring mechanism. A holder who has used the cure window within the prior 7 years is not entitled to a new window; upon breach detection, disqualification applies immediately from the notification date. A holder who breaches more than twice in any 10-year period is permanently ineligible for future cure windows; any future breach results in immediate disqualification from notification date.
>
> **(f) Disqualification and graduated partial loss.** Below the upper bound, disqualification is proportional per the formula in (c) and (d). At or above the upper bound, disqualification is total — the holder claims 0% of the §D6.2(d) exclusion for the affected enterprise.
>
> **(g) D6.7 aggregate shelter cap interaction.** Enterprise assets re-entering assessed net worth due to partial or full disqualification do not by themselves constitute a §D6.7 cap breach. The oracle shall not treat re-entry as a §D6.7 violation for 12 months following the disqualification date. After 12 months, the full assessed net worth base is used for §D6.7 calculations.
>
> **(h) Demurrage revenue routing — Jubilee.** One hundred percent of demurrage collected under this section from disqualified enterprise assets shall be routed to the Jubilee productive-asset restoration fund established under §D8. This is an operative routing clause. The purpose is restitution: revenue generated by extraction disparity returns to the workers and households harmed by it. No portion is retained for administrative overhead; oracle and enforcement costs are funded separately through the TSP operational budget.
>
> **(i) Oracle appeal rights.** The TSP shall specify an independent appeal mechanism for all oracle determinations under §D6.9, §D6.10, and §P-063.3–P-063.6. Appeals shall not require oracle approval to initiate and shall be decided by a body independent of the oracle panel. This is a prerequisite condition for Active status.

---

### P-063.3 — Personal Extraction Definition

**(a) Functional definition.** The extraction numerator includes any transfer of economic value from the enterprise or affiliated entities that accrues to the benefit of the holder, the holder's household, or any entity in which the holder, or any household member, holds any beneficial interest — net of bona fide enterprise expenses paid to arm's-length third parties.

**(b) Household aggregate rule.** The extraction numerator aggregates compensation received by the holder and all members of the holder's household from the enterprise and affiliated entities. Compensation paid to household members in their own names — as employees, officers, or contractors — is included in the numerator if the role was created or materially expanded after this patch's proposal date, or if the compensation exceeds documented market rate for that role. The holder may not split extraction across household members to reduce the apparent ratio.

**(c) Forms of extraction include (illustrative, not exhaustive):**

- (i) Cash salary, wages, and officer compensation;
- (ii) Cash bonuses, performance payments, and distributions;
- (iii) Dividends paid to the holder or any household member as beneficial owner;
- (iv) Non-cash personal benefits with imputed value above $5,000 per year (indexed to S: 10% of S annually). Includes: personal-use corporate aircraft, housing, vehicles, family compensation above market rate, personal entertainment booked as business expense. For assets used partly personally and partly commercially, the personal-use fraction (personal use days ÷ total days) is counted as extraction — the commercial fraction is not;
- (v) Below-market loans from the enterprise or affiliated entities — treated as constructive distributions in the period the below-market benefit is received;
- (vi) **No deferred compensation recognition.** Any promise of future payment from an enterprise to a material participant — including non-qualified deferred compensation plans (NQDCs), phantom stock, synthetic equity, performance units, and split-dollar life insurance arrangements — is counted as extraction in the year the services giving rise to the entitlement are performed, valued at the face value of the promise or, where face value is contingent, at the minimum guaranteed value. Deferred compensation arrangements that obscure extraction timing are not recognized. The oracle does not accept "I'll be paid later" as a reason to exclude current-year extraction;
- (vii) Employer contributions to defined-benefit pension or retirement plans, to the extent they exceed proportional contributions made for workers;
- (viii) Payments from any consolidated enterprise to any entity in which the holder or any household member holds any beneficial interest, to the extent exceeding independently determined fair-value pricing. The holder bears the burden of demonstrating fair value with contemporaneous third-party valuation for transactions exceeding the TSP-specified materiality threshold.

**(d) Worldwide disclosure obligation.** To claim the §D6.2(d) exclusion in any assessment period, the holder must file a sworn annual worldwide disclosure certifying: (i) all entities worldwide in which the holder or any household member holds any beneficial interest; and (ii) all value received by the holder or household from any such entity in the measurement year, regardless of the entity's jurisdiction. The disclosure is filed under oath with the oracle and is subject to random audit. If a subsequent oracle investigation or third-party disclosure reveals that the holder failed to disclose any entity or receipt — in any prior year in which the exclusion was claimed — the holder's §D6.2(d) exclusion is retroactively void for every year in which the disclosure was incomplete, all back-demurrage accrues from the first year of incomplete disclosure, and the holder is referred to the Enforcement Panel. There is no statute of limitations on this consequence. The deterrent is the totality of the penalty, not the probability of detection.

**(e) Reinvestment exclusions (not counted as extraction).**

- Worker wages, salaries, and benefits for all workers other than the highest-compensated participant;
- Capitalized equipment, machinery, and tools used in operations (subject to §D6.10 labor-displacement limit);
- Facility lease payments, build-out costs, and utilities;
- Inventory purchases and raw material inputs;
- Documented research and development expenditures;
- Marketing and customer acquisition costs at arm's-length rates to independent third parties;
- Retained earnings held within the enterprise and not distributed or constructively received.

**(f) Measurement — extraction ratio R.** R is the three-year rolling average of annual extraction ratios. The annual extraction ratio for a year is (total extraction per (c) in that year) ÷ (lowest-paid worker's FTE cash compensation per §P-063.4(b) in that year).

For new enterprises: R defaults to the current-year ratio until three years of data accumulate. A successor enterprise (as defined in (g)) inherits the prior enterprise's extraction history.

**(g) Successor-enterprise rule.** An enterprise that receives more than 33% of the revenue-generating assets or more than 33% of the workforce of an enterprise previously subject to this section inherits the prior enterprise's extraction history, active disqualification status, breach count, and suspension window eligibility. Oracle certification is required before the new-enterprise default applies to any enterprise that cannot demonstrate a bona fide greenfield commercial origin predating this patch's proposal date. If a legacy enterprise reduces below 10 FTE within 36 months of transferring assets or workers to a new entity, the oracle presumes succession unless the holder proves the enterprises serve materially different markets.

---

### P-063.4 — Denominator: Lowest-Paid Worker

**(a) Primary denominator.** The extraction ratio denominator is the FTE annual cash compensation of the lowest-paid worker in the enterprise, as defined in §P-063.5.

**(b) What counts.** Cash wages and cash bonuses only. No imputed equity. No non-cash benefits. Part-time workers are annualized at their actual expected annual earnings — hours worked × hourly rate × realistic realized-hours factor — not at a 2,080-hour FTE equivalent. The use of actual hours prevents artificial denominator inflation via part-time workforce structures.

**(c) Floor-proximity condition.** The floor-proximity tightening in §D6.9(d) applies whenever any worker earns below S in the enterprise. There is no band or threshold — if anyone earns below S, the tighter formula governs.

**(d) Anti-manipulation rules.**

- If the lowest-paid worker's compensation increases in the 6 months following a ratio assessment, the oracle verifies the increase reflects genuine wage improvement and not reclassification or temporary manipulation;
- Terminating the lowest-paid worker does not change the denominator: the next-lowest-paid worker becomes the denominator, and the denominator floor rule (below) applies;
- If total FTE headcount declines by more than 15% from the baseline assessment year, the denominator is floored at the prior-period lowest-paid worker's compensation, regardless of current workforce composition;
- Scheduling and assignment patterns that systematically produce worker engagements at 85–92 days — near the contractor inclusion threshold — shift the burden of proof to the holder to demonstrate a legitimate operational rationale.

---

### P-063.5 — Worker Definition and Threshold

**(a) Who counts as a worker.**

- Full-time and part-time direct employees;
- Independent contractors who perform more than 90 cumulative work days (not calendar days of engagement) in any rolling 12-month period, OR who derive more than 30% of their annual income from the enterprise AND meet the functional-employee test;
- Workers employed by staffing agencies, subcontractors, or franchise operators where the enterprise directs the work and the labor is integral to the enterprise's primary operations (functional-employee test).

**(b) Who does not count.** The highest-compensated participant. Contractors with fewer than 30 cumulative work days in a rolling 12-month period with no ongoing operational dependency.

**(c) Minimum threshold.** §D6.9 applies to enterprises with 10 or more workers. Tier 3 calibration parameter, range [5, 15].

**(d) Worker-count aggregation.** For purposes of the 10-worker threshold, all workers across all enterprises in which the holder holds any beneficial ownership interest are aggregated, regardless of the consolidation threshold in §P-063.6.

**(e) Sliding-scale for smaller enterprises.** Enterprises with 5–9 workers are not outside scope. They face a modified formula with tighter bounds: lower bound 2.0, upper bound 4.0 (the floor-proximity formula). The 30-day cure window does not apply to enterprises in this tier — disqualification is immediate upon breach detection, because the power asymmetry in small enterprises is greater and the harm more direct. Enterprises below 5 workers are excluded from scope only if the holder can demonstrate they are genuinely below scale, not structured to evade.

---

### P-063.6 — Affiliated-Entity Consolidation

**(a) Control-plus-aggregation test.** Extraction ratio computed on consolidated basis across enterprises where:

- (i) The holder's combined direct and indirect beneficial ownership (including interests held through trusts, nominees, family members acting in concert, or tiered structures) exceeds 25% in any single enterprise; or
- (ii) The holder is the largest single economic participant measured by share of gross revenue contractually dependent on the holder or by share of equity controlled; or
- (iii) Two or more enterprises share: common governance controlled by the holder, pooled treasury or intercompany cash transfers exceeding 10% of either entity's revenues, intercompany receivables on non-arm's-length terms, or shared key personnel whose authority spans both entities.

**(b) Retroactive consolidation presumption.** Any restructuring executed within 36 months of this patch's proposal date that reduces any ownership stake below 25% triggers a rebuttable presumption of consolidation evasion. Prospective effect only — no retroactive recharacterization of prior-period extraction ratios.

**(c) Substance-over-form.** Shared ownership, management, cash flow, or workforce = single enterprise regardless of formal structure.

**(d) Extraction numerator on consolidated basis.** Total personal extraction from all consolidated entities combined.

**(e) Denominator on consolidated basis.** Lowest-paid worker across the full consolidated workforce.

---

### P-063.7 — New §D6.10: Labor-Displacement Limit

**Add to ANNEX_D as §D6.10:**

> **§D6.10 Labor-Displacement Limit on Productive-Use Exclusion**
>
> **(a) Purpose.** The §D6.2(d) exclusion is conditioned on the enterprise relationship being genuinely productive for workers, not merely substituting capital for labor to extract wealth while displacing people. This is an independent eligibility condition alongside the extraction ratio in §D6.9.
>
> **(b) Single-window limit.** Automation capital expenditures whose primary function is substituting capital for human labor do not qualify as reinvestment under §P-063.3(e) if they result in a decline of more than 10% in the enterprise's FTE headcount in the 24 months following the investment.
>
> **(c) Cumulative limit.** Automation capex does not qualify as reinvestment if cumulative FTE reduction attributable to automation exceeds 20% of the baseline FTE count over any rolling 60-month window. This closes the staged-reduction strategy.
>
> **(d) Tracker follows beneficial owner.** The 60-month cumulative FTE tracker is attached to the beneficial owner, not the enterprise entity. If the owner holds a beneficial interest in a successor enterprise, the predecessor's FTE history aggregates into the 60-month window.
>
> **(e) Baseline.** Oracle maintains a continuous FTE baseline from the patch's Active date. The 60-month cumulative test applies only prospectively; the 24-month single-window test applies prospectively for capex made after the Active date.
>
> **(f) Appeal.** Holder may demonstrate that headcount decline was attributable to voluntary attrition, business-line exit, or market contraction rather than automation capex. Holder bears burden of proof. This is an appealable oracle determination subject to §D6.9(i).

---

### P-063.8 — Anti-Gaming Provisions

**(a) Compensation reclassification.** Substance-over-form analysis. Commercially unreasonable instruments treated as constructive distributions.

**(b) Workforce reduction gaming.** If the lowest-paid worker's compensation declines in absolute terms after a ratio assessment, the applicable upper bound tightens by 0.5 for the subsequent assessment period. Cutting the lowest-paid worker to clean the ratio makes the formula harder to satisfy.

**(c) Strategic fragmentation.** Deliberately splitting an operating enterprise to evade §P-063.6 consolidation is an audit trigger and grounds for retroactive consolidation from fragmentation date.

**(d) Timing arbitrage.** Oracle may reallocate distributions to the period economically earned. Deferred compensation is always attributed to the year earned — oracle re-timing does not override or double-count.

**(e) Oracle calibration independence.** Calibration officers responsible for Tier 3 parameter adjustments under §D6.9 may not hold any beneficial ownership interest in any enterprise subject to this section. Proposed calibration adjustments must be published 90 days before taking effect with supporting oracle data. 60-day public challenge window precedes any adjustment. All calibration decisions and supporting data are published to the corpus. Post-service restriction: oracle personnel who issued findings on a specific holder may not receive compensation from that holder or any enterprise they control for 3 years following service. Oracle firms must rotate off a holder after 5 consecutive years of service.

**(f) Enforcement.** Material misrepresentation in extraction or payroll data, or false worldwide disclosure certification, is grounds for: (i) retroactive §D6.2(d) disqualification for every year in which the exclusion was claimed; (ii) demurrage back-accrual from the first year of misrepresentation; (iii) referral to the Enforcement Panel under P-045 protocols; (iv) 24-month enhanced-audit designation. No statute of limitations applies to enforcement actions arising from false disclosure certification.

---

### P-063.9 — Transitional Relief

**(a) Notification window.** Holders currently operating above the applicable upper bound have 12 months from Active date to restructure. During this window the §D6.9 disqualification does not apply and the §D6.2(d) exclusion continues at its prior level. This window is distinct from the 30-day cure window — the notification window applies to holders already over cap at Active date; the 30-day cure window applies to future breaches.

**(b) No retroactive clawback.** Extraction before the Active date is not subject to retroactive demurrage assessment solely because it exceeds the cap.

**(c) Asset fire-sale protection.** A disqualified holder has no immediate obligation to sell enterprise assets. Disqualified assets re-enter assessed net worth; demurrage accrues at standard rates. The holder may cure at any time by reducing the extraction ratio.

---

### P-063.10 — Conforming Amendments

**(a) §D6.2(d) operative text.** Amended on its face per §P-063.1.

**(b) §D6.7 conforming note.** Add: *"Enterprise assets partially or fully disqualified under §D6.9 re-enter assessed net worth. This re-entry does not by itself constitute a §D6.7 breach for 12 months following disqualification. After 12 months, the full assessed net worth base applies to §D6.7 calculations."*

**(c) §D8 Jubilee routing — operative amendment.** Amend §D8 to add as an operative clause: *"Demurrage collected from enterprise assets disqualified under §D6.9 is routed in full (100%) to the Jubilee productive-asset restoration fund. No portion is retained for administrative costs. Oracle and enforcement costs under this section are funded through the TSP operational budget. The purpose of this routing is restitution: revenue generated by extraction disparity returns to the workers and households from whom it was extracted."*

**(d) Technical Specifications Package delegation.** TSP shall define:
- (i) Valuation methodology for non-cash personal benefits above the 10%-of-S floor;
- (ii) Oracle payroll data submission requirements, cadence, and audit protocols;
- (iii) Arm's-length interest rate standard for constructive distribution analysis;
- (iv) Materiality threshold for related-party payment fair-value certification;
- (v) Affiliated-entity beneficial ownership tracing protocol;
- (vi) FTE baseline tracking methodology and part-time realized-hours factor;
- (vii) Successor-enterprise oracle certification process and timeline (90-day deemed-approval if oracle takes no action on complete application);
- (viii) Worldwide disclosure form, submission process, and random audit selection protocol;
- (ix) Independent appeal mechanism for all oracle adjudicative powers under this patch, consistent with §D7.5 — prerequisite condition for Active status.

**(e) P-017 oracle conformance mandate.** TSP shall confirm that all payroll, extraction, deferred-compensation, and affiliated-entity data pipelines fall under P-017 oracle independence standards. If not currently covered, a conforming P-017 amendment is a prerequisite for Active status.

---

## Open Questions for Evidence Review

1. **Graduated formula bounds:** [3.0, 5.0] are provisional. Oracle to collect actual extraction ratio distributions from pilot enterprises and publish calibration report within 24 months of activation.
2. **Lowest-paid worker vs. 25th-percentile:** The patch uses lowest-paid worker. Pilot data will reveal if a single outlier worker creates unintended volatility in the denominator for large enterprises — if so, the calibration review may consider a 5th-percentile floor.
3. **5–9 worker sliding scale:** The tighter formula for small enterprises is provisional. Pilot enforcement will reveal whether immediate disqualification (no cure window) is proportionate at the small-enterprise tier.
4. **Jubilee fund structure:** §D8 routes demurrage revenue to the Jubilee productive-asset restoration fund. The TSP must specify the fund's governance, disbursement criteria, and recipient qualification. Priority: households within 50% of S who lack productive assets.

---

## New Risks Introduced

| Risk | Severity | Mitigation |
|---|---|---|
| Foreign entity extraction | High | §P-063.3(d) sworn worldwide disclosure; retroactive void consequence |
| Household income splitting | High | §P-063.3(b) household aggregate rule |
| Unrealized equity appreciation | Medium | Deferred-comp ban closes most of this; residual risk flagged for pilot monitoring |
| Oracle revolving-door | Medium | §P-063.8(e) 3-year post-service restriction; 5-year rotation |
| Dual-use capex (personal benefit) | Medium | §P-063.3(c)(iv) personal-use fraction rule |
| Adverse selection in pilot | Medium | §D8 operative Jubilee routing creates positive incentive to participate |
| Successor-enterprise extraction-history laundering | Low | §P-063.3(g) 33% threshold + enforcement-status inheritance |
| Organic contraction triggering denominator floor | Medium | §P-063.4(d) floor applies only alongside oracle audit trigger |

---

## Dependencies

- P-017 — oracle independence; conformance mandate in §P-063.10(e)
- P-023 — demurrage universality; no conflict
- P-029 (PFCR) — §D8 Jubilee routing now operative
- P-031 / P-033 — consistent; §D6.10 is distinct from P-033
- P-045 — enforcement panel; §P-063.8(f) misrepresentation referral
- ANNEX_D §D6.2(d), §D6.7, §D8, §D9.1 — direct text targets

---

## v3 → v4 Change Summary

| Area | v3 | v4 |
|---|---|---|
| Disqualification structure | Binary cliff (R > 5.0 = full loss) | Graduated linear ramp (full at R ≤ 3.0, zero at R ≥ 5.0) |
| Denominator | Median worker FTE cash | Lowest-paid worker FTE cash (actual hours, not 2,080-hr FTE) |
| Floor-proximity trigger | When median within 20% of S | When *any* worker earns below S |
| Cure window | 12 months | 30 days; accrued demurrage not reversed regardless |
| Deferred compensation | Accrual-year rule with TSP-delegated valuation | Eliminated entirely; extraction counted in year services performed at face/minimum value |
| Jubilee routing | Non-operative informational note | Operative clause — 100% of disqualification demurrage to Jubilee fund |
| Household compensation | Transfers to household covered | Household aggregate: all household member compensation from enterprise aggregated |
| Worldwide disclosure | Functional look-through with holder burden | Sworn annual worldwide disclosure; incomplete disclosure = retroactive void of all prior exclusion claims |
| Successor threshold | >50% asset or workforce | >33% asset or workforce |
| Enforcement-status transfer | Not specified | Active disqualification, breach count, and window eligibility transfer to successor |
| FTE displacement tracker | Followed enterprise entity | Follows beneficial owner across entities |
| Small enterprise (5–9 workers) | Outside scope (below 10-worker threshold) | In scope with tighter formula and no cure window |
| Oracle independence | Independence requirement in §P-063.7(e) | Independence requirement + 3-year post-service restriction + 5-year rotation + cross-reference to P-017 only |
| §D8 operative amendment | Deferred to separate patch | Included as operative conforming amendment in §P-063.10(c) |
