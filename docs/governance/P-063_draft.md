# P-063 — Productive-Use Extraction Limit: Pay-Ratio Disqualification (Draft v5)

> **DRAFT — Not published. Not committed. Not corpus-registered.**
> Do not add to Patch_Log.md, ANNEX_D.md, or INDEX.md until reviewed and approved.
> Supersedes drafts v1, v2, v3, v4. Incorporates 5-agent red-team findings from v4 round.

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
> Where R is the holder's personal extraction ratio as defined in §P-063.3(f).
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
> **(e) Cure window — two-stage, 30 days.** A holder whose ratio first exceeds the applicable upper bound receives oracle notification. The holder has 30 days from notification to cure the breach before disqualification is formally confirmed.
>
> Stage 1 (days 1–7): The holder files a binding cure commitment with the oracle — a signed legal instrument specifying the wage increases or extraction reductions committed to, together with an escrow deposit equal to the demurrage accrued through day 7. Filing a cure commitment by day 7 sets day 1 as the cure initiation date for any safe-harbor purposes.
>
> Stage 2 (days 8–30): The actual compensation changes take effect. Cure is valid only if both conditions are met: (i) the holder's personal extraction ratio returns below the applicable upper bound, AND (ii) the lowest-paid worker's wage increases by at least 10% within the cure period. Cure achieved solely by reducing the holder's own extraction without raising the lowest-paid worker's wage is not valid. The holder must file a sworn attestation confirming the improvement came from wage increases or reduced extraction — not from accounting reclassification, temporary schedule changes, or entity restructuring.
>
> During the cure window, demurrage accrues on the disqualified fraction at standard assessed net worth rates from the date of oracle notification. This accrual is owed regardless of cure outcome and is not reversed on cure. If cure is achieved, the graduated exclusion is restored prospectively from the compliance date.
>
> If cure does not occur within 30 days, full disqualification (0% exclusion) applies from the oracle notification date and continues until compliance is achieved.
>
> The 30-day cure window may not be used as a recurring mechanism. A holder who has used the cure window within the prior 7 years is not entitled to a new window; upon breach detection, disqualification applies immediately from the notification date. A holder who breaches more than twice in any 10-year period is ineligible for future cure windows for 10 years; any future breach results in immediate disqualification from notification date. After 10 years of ineligibility, the holder may seek reinstatement per §D6.9(j).
>
> **(f) Disqualification and graduated partial loss.** Below the upper bound, disqualification is proportional per the formula in (c) and (d). At or above the upper bound, disqualification is total — the holder claims 0% of the §D6.2(d) exclusion for the affected enterprise.
>
> **(g) D6.7 aggregate shelter cap interaction.** Enterprise assets re-entering assessed net worth due to partial or full disqualification do not by themselves constitute a §D6.7 cap breach. The oracle shall not treat re-entry as a §D6.7 violation for 12 months following the disqualification date. After 12 months, the full assessed net worth base is used for §D6.7 calculations.
>
> **(h) Demurrage revenue routing — Jubilee.** One hundred percent of demurrage collected under this section from disqualified enterprise assets shall be routed to the Jubilee productive-asset restoration fund established under §D8. This is an operative routing clause. The purpose is restitution: revenue generated by extraction disparity returns to the workers and households harmed by it. No portion is retained for administrative overhead; oracle and enforcement costs are funded separately through the TSP operational budget.
>
> The Jubilee fund shall be governed by a tripartite board: one-third of members drawn by lot from verified priority beneficiary households (those within 50% of S lacking productive assets); one-third independent fiduciaries with documented obligation to priority beneficiaries; one-third public nominees confirmed through a non-partisan public process. Disbursement from the fund must begin within 18 months of receipt. "Productive assets" includes but is not limited to: tools, equipment, vehicles, business equity, vocational training, and housing equity — and explicitly excludes purely speculative assets. Annual public reporting is required in a format accessible to eligible beneficiaries. A worker-accessible complaint mechanism shall be established to challenge violation of priority rules. TSP shall specify full governance terms as a prerequisite for Active status.
>
> **(i) Oracle appeal rights.** The TSP shall specify an independent appeal mechanism for all oracle determinations under §D6.9, §D6.10, and §P-063.3–P-063.6. Appeals shall not require oracle approval to initiate and shall be decided by a body independent of the oracle panel. For enterprises in the 5–9 worker tier under §P-063.5(e), the appeal window is 15 days from oracle notification — the appeal contests the oracle's factual determination but does not suspend demurrage accrual pending resolution. This is a prerequisite condition for Active status.
>
> **(j) Reinstatement after ineligibility.** After 10 years of cure-window ineligibility, a holder may seek reinstatement by demonstrating: (a) a third-party worker-dignity audit conducted with meaningful worker participation, confirming the enterprise meets basic standards; (b) sustained R below the applicable upper bound for 3 consecutive years prior to application; and (c) a one-time Jubilee fund contribution equal to 150% of the demurrage that would have accrued on the disqualified assets during the 10-year ineligibility period. Upon certification by the oracle, a single future cure window is granted.

---

### P-063.3 — Personal Extraction Definition

**(a) Functional definition.** The extraction numerator includes any transfer of economic value from the enterprise or affiliated entities that accrues to the benefit of the holder, the holder's household, or any entity in which the holder, or any household member, holds any beneficial interest — net of bona fide enterprise expenses paid to arm's-length third parties.

**(b) Household aggregate rule.** The extraction numerator aggregates compensation received by the holder and all members of the holder's household from the enterprise and affiliated entities. Compensation paid to household members in their own names — as employees, officers, or contractors — is included in the numerator if the role was created or materially expanded after this patch's proposal date, or if the compensation exceeds documented market rate for that role. The holder may not split extraction across household members to reduce the apparent ratio. For market-rate determination, the oracle applies the 25th–50th percentile of the relevant industry and geography survey band. A safe harbor exists if the enterprise produces two bona fide external hire offers at or above the paid rate for an equivalent role. Non-cash household benefits (health coverage, vehicle allowance, housing) are included at imputed value using TSP-specified published tables.

**(c) Forms of extraction include (illustrative, not exhaustive):**

- (i) Cash salary, wages, and officer compensation;
- (ii) Cash bonuses, performance payments, and distributions;
- (iii) Dividends paid to the holder or any household member as beneficial owner;
- (iv) Non-cash personal benefits with imputed value above $5,000 per year (indexed to S: 10% of S annually). Includes: personal-use corporate aircraft, housing, vehicles, family compensation above market rate, personal entertainment booked as business expense. For assets used partly personally and partly commercially, the personal-use fraction (personal use days ÷ total days) is counted as extraction — the commercial fraction is not. **Personal use of assets held by private foundations, donor-advised funds, charitable LLCs, or similar charitable vehicles in which the holder or any household member serves as officer, director, trustee, or exercises any governance authority is included at fair market use rates**, regardless of whether the holder has formal ownership of the vehicle;
- (v) Below-market loans from the enterprise or affiliated entities — treated as constructive distributions in the period the below-market benefit is received;
- (vi) **No deferred compensation recognition.** Any promise of future payment from an enterprise to a material participant — including non-qualified deferred compensation plans (NQDCs), phantom stock, synthetic equity, performance units, and split-dollar life insurance arrangements — is counted as extraction in the year the services giving rise to the entitlement are performed, valued at the face value of the promise or, where face value is contingent, at the minimum guaranteed value. Deferred compensation arrangements that obscure extraction timing are not recognized. The oracle does not accept "I'll be paid later" as a reason to exclude current-year extraction;
- (vii) Employer contributions to defined-benefit pension or retirement plans, to the extent they exceed proportional contributions made for workers;
- (viii) Payments from any consolidated enterprise to any entity in which the holder or any household member holds any beneficial interest, to the extent exceeding independently determined fair-value pricing. The holder bears the burden of demonstrating fair value with contemporaneous third-party valuation for transactions exceeding the TSP-specified materiality threshold;
- (ix) **Related-party conduit rule.** Distributions or payments from the enterprise or affiliated entities to any non-household person who receives more than 15% of the holder's total disclosed extraction in the same measurement year are presumed nominee arrangements. The holder bears the burden to rebut this presumption by demonstrating the payments reflect genuine arm's-length economic activity independent of the holder's benefit. This rule applies regardless of the recipient's ownership percentage, title, or formal relationship to the enterprise.

**(d) Worldwide disclosure obligation.** To claim the §D6.2(d) exclusion in any assessment period, the holder must file a sworn annual worldwide disclosure certifying: (i) all entities worldwide in which the holder or any household member holds any beneficial interest; (ii) all value received by the holder or household from any such entity in the measurement year, regardless of the entity's jurisdiction; and (iii) all charitable vehicles — including private foundations, donor-advised funds, and charitable LLCs — in which the holder or any household member serves in a governance capacity. The disclosure is filed under oath with the oracle and is subject to random audit. Any foreign entity comprising more than 5% of the consolidated group's revenues must submit annual audited financials from an oracle-approved auditor; absent such audited financials, the holder's disclosure for that entity is treated as incomplete.

If a subsequent oracle investigation or third-party disclosure reveals that the holder failed to disclose any entity or receipt in a prior year, the §D6.2(d) exclusion is void prospectively from the date the incompleteness is discovered, and a 5-year lookback applies: back-demurrage accrues for the 5 years immediately preceding discovery for any year in which the exclusion was claimed and the disclosure was incomplete. Intentional false certification is referred to the Enforcement Panel under P-045 as a separate enforcement action, which may result in additional penalties beyond demurrage back-accrual. The prospective void and 5-year lookback are not the same as the Enforcement Panel action; both may apply simultaneously.

**(e) Reinvestment exclusions (not counted as extraction).**

- Worker wages, salaries, and benefits for all workers other than the highest-compensated participant;
- Capitalized equipment, machinery, and tools used in operations (subject to §D6.10 labor-displacement limit);
- Facility lease payments, build-out costs, and utilities;
- Inventory purchases and raw material inputs;
- Documented research and development expenditures;
- Marketing and customer acquisition costs at arm's-length rates to independent third parties;
- Retained earnings held within the enterprise and not distributed or constructively received.

**(f) Measurement — extraction ratio R.** R is the three-year rolling average of annual extraction ratios. The annual extraction ratio for a year is (total extraction per (c) in that year) ÷ (lowest-paid worker's annual cash compensation per §P-063.4 in that year).

For new enterprises: R defaults to the current-year ratio until three years of data accumulate. A successor enterprise (as defined in (g)) inherits the prior enterprise's extraction history.

**(g) Successor-enterprise rule.** An enterprise that receives more than 33% of the revenue-generating assets or more than 33% of the workforce of an enterprise previously subject to this section inherits the prior enterprise's extraction history, active disqualification status, breach count, and cure window eligibility. Oracle certification is required before the new-enterprise default applies to any enterprise that cannot demonstrate a bona fide greenfield commercial origin predating this patch's proposal date. If a legacy enterprise reduces below 10 FTE within 36 months of transferring assets or workers to a new entity, the oracle presumes succession unless the holder proves the enterprises serve materially different markets.

---

### P-063.4 — Denominator: Lowest-Paid Worker

**(a) Primary denominator.** The extraction ratio denominator is the annual cash compensation of the lowest-paid worker in the enterprise, as defined in §P-063.5, measured over the full 12-month assessment period.

**(b) What counts.** Cash wages and cash bonuses only. No imputed equity. No non-cash benefits. For tipped workers: cash compensation includes tip credits counted at the applicable statutory minimum, not the employer-declared subminimum base. For commissioned workers: commissions are included at the 12-month trailing realized average, not at estimated or projected figures. Items the worker is required to purchase to perform the job (tools, uniforms, required equipment rental) are excluded from any non-cash benefit calculation that would reduce apparent cash compensation. Company-store or employer-controlled housing arrangements are included in compensation at market rate.

Part-time workers are annualized at their actual expected annual earnings: **actual hours worked × hourly rate × realized-hours factor** — not at a 2,080-hour FTE equivalent.

**(c) Realized-hours factor — definition and floor.**

The realized-hours factor is defined as:

**(hours actually worked + employer-cancelled scheduled hours) ÷ employer-scheduled hours**

Employer-cancelled scheduled hours means shifts posted on the official schedule and cancelled by the employer fewer than 24 hours before the shift start. Worker-initiated cancellations, approved leave, and mutual schedule adjustments are excluded from the employer-cancelled count.

The realized-hours factor has a floor of 0.85: the denominator may not fall below 85% of total employer-scheduled hours regardless of actual realization, unless the shortfall is fully documented as worker-initiated. The holder bears the burden of proof on any claimed worker-initiated reduction.

**(d) Anti-manipulation rules.**

- **Ghost-worker floor anchor.** If the count of workers in the enterprise's lowest-wage quartile (measured against the enterprise's own prior-period wage distribution) declines by more than 15% between the current assessment year and the year three periods prior, the denominator is the higher of: (i) the actual current lowest-paid worker's compensation, or (ii) the wage that would have been paid to the missing lowest-wage-quartile workers at their prior-period rate. This prevents the owner from improving the ratio by eliminating the workers who anchor it. Burden of proof for workforce reduction attributable to legitimate business contraction (not denominator optimization) lies with the holder.

- **Staffing-firm presumption.** Workers employed by staffing agencies, subcontractors, or other intermediaries where the enterprise directs day-to-day work are presumptively included in the denominator workforce. The holder bears the burden of demonstrating the arrangement is arm's-length and does not substitute for direct employment.

- **Pre-assessment surge rule.** If the lowest-paid worker's compensation increases by more than 20% in the 3 calendar months preceding an assessment date, the oracle presumes manipulation. The denominator for that year reverts to the pre-increase figure unless the holder demonstrates: (i) the increase was unconditional and ongoing (not contingent on post-assessment continuation), and (ii) the worker remained employed at the increased rate for at least 6 months after the assessment date. The oracle applies this rule retroactively if manipulation is discovered post-assessment.

- **12-month trailing average.** The denominator for the lowest-paid worker is the 12-month trailing average of monthly cash compensation within the assessment year, not any single point-in-time snapshot. This eliminates single-month manipulation.

- **Q4 schedule suppression rule.** If the lowest-paid worker's actual hours in Q4 (October–December) fall more than 15% below the Q1–Q3 average for that year, and the same worker's hours return to within 10% of the Q1–Q3 average in Q1 of the following year, the oracle presumes the Q4 reduction was employer-directed scheduling manipulation. The denominator is calculated using the Q1–Q3 annualized figure for that year rather than the realized Q4 hours. Holder may rebut with documented business seasonality if Q4 reduction can be demonstrated across the full workforce (not limited to the lowest-paid worker).

- **Termination anti-avoidance.** Terminating the lowest-paid worker does not change the denominator: the next-lowest-paid worker becomes the denominator, and the ghost-worker floor anchor applies as described above.

- **General headcount floor.** If total worker count declines by more than 15% from the baseline assessment year, the denominator is floored at the prior-period lowest-paid worker's compensation, regardless of current workforce composition, unless the holder demonstrates the reduction arose from genuine business contraction.

- **Contractor-threshold clustering.** Scheduling and assignment patterns that systematically produce worker engagements at 85–92 days — near the contractor inclusion threshold — shift the burden of proof to the holder to demonstrate a legitimate operational rationale.

**(e) International workers.** Workers employed by foreign subsidiaries, affiliated entities, or controlled operations over which the beneficial owner exercises functional control are included in the denominator workforce regardless of jurisdiction. Where foreign workers cannot be individually verified, the oracle applies the living-wage benchmark for the relevant jurisdiction as the imputed lowest-paid worker compensation for those workers. The denominator is then the lowest figure across: domestic lowest-paid worker, verified foreign lowest-paid worker, or jurisdiction living-wage floor — whichever is least. The holder may not improve the denominator by concentrating domestic employment in higher-wage roles while maintaining lower-paid operations abroad.

**(f) Floor-proximity condition.** The floor-proximity tightening in §D6.9(d) applies whenever any worker in the denominator workforce earns below S. There is no band or threshold — if anyone earns below S, the tighter formula governs.

---

### P-063.5 — Worker Definition and Threshold

**(a) Who counts as a worker.**

- Full-time and part-time direct employees;
- Independent contractors who perform more than 90 cumulative work days (not calendar days of engagement) in any rolling 12-month period, OR who derive more than 30% of their annual income from the enterprise AND meet the functional-employee test;
- Workers employed by staffing agencies, subcontractors, or franchise operators where the enterprise directs the work and the labor is integral to the enterprise's primary operations (functional-employee test).

**(b) Who does not count.** The highest-compensated participant. Contractors with fewer than 30 cumulative work days in a rolling 12-month period with no ongoing operational dependency.

**(c) Minimum threshold.** §D6.9 applies to enterprises with 10 or more workers. Tier 3 calibration parameter, range [5, 15].

**(d) Worker-count aggregation.** For purposes of the 10-worker threshold, all workers across all enterprises in which the holder holds any beneficial ownership interest are aggregated, regardless of the consolidation threshold in §P-063.6.

**(e) Small enterprise tier (5–9 workers).** Enterprises with 5–9 workers are not outside scope. They face a modified formula with tighter bounds: lower bound 2.0, upper bound 4.0 (the floor-proximity formula applies by default). The 30-day cure window does not apply to enterprises in this tier — disqualification is immediate upon breach detection, because the power asymmetry in small enterprises is greater and the harm more direct.

Notwithstanding the absence of a cure window, a holder in the 5–9-worker tier may contest the oracle's factual determination through an expedited 15-day appeal. The appeal may challenge: (i) whether the worker count correctly falls in the 5–9 tier, (ii) arithmetic errors in the extraction ratio calculation, or (iii) classification of specific income items. The appeal does not stay demurrage accrual. The appeal must be decided within 30 days of filing by an independent appellate body per §D6.9(i). This appeal right is not a cure window and does not restore the exemption pending decision.

**Phased entry for first-time threshold crossings.** An enterprise crossing from 4 workers to 5 workers for the first time shall be treated as follows: in the first 12 months at or above 5 workers, the enterprise remains subject to the tighter 5–9 formula, but the holder receives a single cure window under the conditions of §D6.9(e) (adapted for the 5–9 tier). The cure must satisfy the wage-increase condition in §D6.9(e). After 12 months, the 5–9 tier rules apply without modification. This phased entry is available only once; subsequent returns to the 5–9 tier after a drop to 4 or fewer workers do not re-open the phased entry.

Enterprises below 5 workers are excluded from scope only if the holder can demonstrate they are genuinely below scale, not structured to evade.

---

### P-063.6 — Affiliated-Entity Consolidation

**(a) Control-plus-aggregation test.** Extraction ratio computed on consolidated basis across enterprises where:

- (i) The holder's combined direct and indirect beneficial ownership (including interests held through trusts, nominees, family members acting in concert, or tiered structures) exceeds 25% in any single enterprise; or
- (ii) The holder is the largest single economic participant measured by share of gross revenue contractually dependent on the holder or by share of equity controlled; or
- (iii) Two or more enterprises share: common governance controlled by the holder, pooled treasury or intercompany cash transfers exceeding 10% of either entity's revenues, intercompany receivables on non-arm's-length terms, or shared key personnel whose authority spans both entities.

**(b) Retroactive consolidation presumption.** Any restructuring executed within 36 months of this patch's proposal date that reduces any ownership stake below 25% triggers a rebuttable presumption of consolidation evasion. Prospective effect only — no retroactive recharacterization of prior-period extraction ratios.

**(c) Substance-over-form.** Shared ownership, management, cash flow, or workforce = single enterprise regardless of formal structure.

**(d) Extraction numerator on consolidated basis.** Total personal extraction from all consolidated entities combined.

**(e) Denominator on consolidated basis.** Lowest-paid worker across the full consolidated workforce, including international workers per §P-063.4(e).

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

**(f) Enforcement.** Material misrepresentation in extraction or payroll data, or false worldwide disclosure certification, is grounds for: (i) prospective §D6.2(d) disqualification plus 5-year lookback per §P-063.3(d); (ii) demurrage back-accrual for the 5-year lookback period; (iii) referral to the Enforcement Panel under P-045 protocols; (iv) 24-month enhanced-audit designation. The Enforcement Panel action under P-045 is a separate proceeding and may impose additional penalties beyond the demurrage consequences.

**(g) Geographic wage floor arbitrage.** An owner may not improve the extraction ratio by locating the lowest-paid workers exclusively in high-wage domestic jurisdictions while employing lower-paid workers in foreign subsidiaries. The full consolidated workforce, including all international workers per §P-063.4(e), constitutes the denominator workforce. Where a foreign entity's worker compensation cannot be individually verified, the oracle uses the jurisdiction's living-wage benchmark as a floor for those workers in the denominator calculation.

---

### P-063.9 — Transitional Relief

**(a) Notification window.** Holders currently operating above the applicable upper bound have 12 months from Active date to restructure. During this window the §D6.9 disqualification does not apply and the §D6.2(d) exclusion continues at its prior level. This window is distinct from the 30-day cure window — the notification window applies to holders already over cap at Active date; the 30-day cure window applies to future breaches.

**(b) No retroactive clawback.** Extraction before the Active date is not subject to retroactive demurrage assessment solely because it exceeds the cap.

**(c) Asset fire-sale protection.** A disqualified holder has no immediate obligation to sell enterprise assets. Disqualified assets re-enter assessed net worth; demurrage accrues at standard rates. The holder may cure at any time by reducing the extraction ratio.

---

### P-063.10 — Conforming Amendments

**(a) §D6.2(d) operative text.** Amended on its face per §P-063.1.

**(b) §D6.7 conforming note.** Add: *"Enterprise assets partially or fully disqualified under §D6.9 re-enter assessed net worth. This re-entry does not by itself constitute a §D6.7 breach for 12 months following disqualification. After 12 months, the full assessed net worth base applies to §D6.7 calculations."*

**(c) §D8 Jubilee routing — operative amendment.** Amend §D8 to add as an operative clause: *"Demurrage collected from enterprise assets disqualified under §D6.9 is routed in full (100%) to the Jubilee productive-asset restoration fund. No portion is retained for administrative costs. Oracle and enforcement costs under this section are funded through the TSP operational budget. The purpose of this routing is restitution: revenue generated by extraction disparity returns to the workers and households from whom it was extracted. The fund is governed per §D6.9(h)."*

**(d) Technical Specifications Package delegation.** TSP shall define:
- (i) Valuation methodology for non-cash personal benefits above the 10%-of-S floor;
- (ii) Oracle payroll data submission requirements, cadence, and audit protocols;
- (iii) Arm's-length interest rate standard for constructive distribution analysis;
- (iv) Materiality threshold for related-party payment fair-value certification;
- (v) Affiliated-entity beneficial ownership tracing protocol;
- (vi) Realized-hours factor verification and audit methodology; employer-cancelled-shift tracking requirements; schedule-suppression audit protocol;
- (vii) Successor-enterprise oracle certification process and timeline (90-day deemed-approval if oracle takes no action on complete application);
- (viii) Worldwide disclosure form, submission process, foreign entity audit requirements, and random audit selection protocol;
- (ix) Independent appeal mechanism and expedited 15-day appeal mechanism for §P-063.5(e), consistent with §D7.5 — prerequisite condition for Active status;
- (x) Jubilee fund governance structure, board selection process, disbursement criteria, beneficiary qualification, and annual reporting format — prerequisite condition for Active status;
- (xi) Living-wage benchmark sources by jurisdiction for international denominator floor purposes;
- (xii) Market-rate compensation methodology for household-member roles, including safe-harbor process.

**(e) P-017 oracle conformance mandate.** TSP shall confirm that all payroll, extraction, deferred-compensation, affiliated-entity, worldwide-disclosure, and international-denominator data pipelines fall under P-017 oracle independence standards. If not currently covered, a conforming P-017 amendment is a prerequisite for Active status.

---

## Open Questions for Evidence Review

1. **Graduated formula bounds:** [3.0, 5.0] are provisional. Oracle to collect actual extraction ratio distributions from pilot enterprises and publish calibration report within 24 months of activation.
2. **Ghost-worker 15% threshold:** Provisional. Pilot data will reveal whether 15% is the right trigger or whether a different quartile-decline figure better captures manipulation without penalizing organic contraction.
3. **5–9 worker sliding scale:** Tighter formula and phased entry are provisional. Pilot enforcement will reveal whether 12 months is sufficient for phased entry and whether immediate disqualification (with expedited appeal) is proportionate.
4. **Jubilee fund governance:** TSP must specify the full governance structure as a prerequisite for Active status. Priority: households within 50% of S who lack productive assets. Living-wage definitions per jurisdiction must be established before international denominator floor is operational.
5. **Related-party 15% conduit threshold:** Provisional. Oracle may calibrate within [10%, 25%] after pilot data.

---

## New Risks Introduced

| Risk | Severity | Mitigation |
|---|---|---|
| Ghost-worker floor over-captures organic contraction | Medium | Holder can rebut with documented business reasons; 15% threshold provides headroom |
| Two-stage cure adds complexity for small operators | Medium | §P-063.5(e) phased entry; TSP to provide simplified cure form |
| International denominator floor is hard to verify | Medium | Living-wage benchmark is a floor, not a precise measure; benefits the worker directionally |
| Tripartite Jubilee board governance lag | Medium | TSP prerequisite; board must be constituted before Active status |
| Charitable vehicle rule creates chilling on genuine philanthropy | Low | Rule limited to governance participation + personal-use benefit; passive donors not covered |
| Pre-assessment surge rule could capture genuine wage improvements | Low | 6-month post-assessment continuity requirement as safe harbor; rebuttable presumption |

---

## Dependencies

- P-017 — oracle independence; conformance mandate in §P-063.10(e)
- P-023 — demurrage universality; no conflict
- P-029 (PFCR) — §D8 Jubilee routing now operative
- P-031 / P-033 — consistent; §D6.10 is distinct from P-033
- P-045 — enforcement panel; §P-063.8(f) misrepresentation referral
- ANNEX_D §D6.2(d), §D6.7, §D8, §D9.1 — direct text targets

---

## v4 → v5 Change Summary

| Area | v4 | v5 |
|---|---|---|
| Realized-hours factor | Undefined; delegated to TSP | Defined: (worked + employer-cancelled) ÷ scheduled; floor 0.85; Q4 suppression rule added |
| Pre-assessment denominator surge | 6-month post-assessment audit only | 12-month trailing average; >20% in 3 months before assessment = rebuttable presumption; 6-month post-assessment continuity safe harbor |
| Ghost-worker denominator gaming | Termination anti-avoidance + 15% headcount floor | Ghost-worker floor anchor: lowest-wage quartile decline >15% vs. 3 years prior → denominator uses what missing workers would have earned |
| Staffing-firm attribution | Claimant must prove functional-employee status | Presumptive: holder must disprove arm's-length arrangement |
| Related-party conduit | Not addressed | Distributions to any non-household person >15% of disclosed extraction = presumed nominee |
| Charitable vehicle extraction | Not addressed | Personal use of foundation/DAF assets with governance role = extraction at fair market use rate |
| International workers in denominator | Not addressed | Full consolidated workforce including foreign; living-wage benchmark floor if unverifiable |
| Foreign entity audit verification | Sworn disclosure only; no verification mechanism | Foreign entities >5% of revenues must supply oracle-approved audited financials |
| Retroactive void — disclosure | All prior years, no limit | Prospective from discovery + 5-year lookback; intentional fraud → separate Enforcement Panel action |
| Cure window — structure | 30-day, single stage | Two-stage: day 1–7 binding commitment + escrow; day 8–30 actual changes |
| Cure window — worker benefit | Not required; ratio could improve via owner pay cut | Required: lowest-paid worker wage must increase ≥10% within cure period; accounting reclassification invalid |
| Small enterprise appeal | No appeal, no cure | Expedited 15-day factual appeal (not cure window); demurrage accrual not stayed |
| 5-to-9 cliff | Immediate full application at 5 workers | 12-month phased entry for first-time crossings; single cure window in year 1 only |
| Permanent ineligibility | After 3rd breach: permanent | After 3rd breach: 10-year ineligibility; reinstatement pathway at year 10 (dignity audit + 3yr sustained compliance + 150% Jubilee contribution) |
| Jubilee fund governance | Priority class stated; governance delegated to TSP as open question | Tripartite board (lot-drawn beneficiaries, independent fiduciaries, public nominees); 18-month disbursement requirement; public annual report; complaint mechanism; TSP prerequisite for Active status |
| Household member market-rate | Oracle methodology not specified | 25th–50th percentile survey band; safe harbor for documented external offers; non-cash benefits at imputed value |
| Tip/commission denominator | Not addressed | Tip credits at statutory minimum; commissions at 12-month trailing realized average |
| Geographic wage floor arbitrage | Not addressed | Full consolidated denominator including international; living-wage floor for unverifiable foreign workers |
