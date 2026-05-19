# P-063 — Productive-Use Extraction Limit: Pay-Ratio Disqualification (Draft v3)

> **DRAFT — Not published. Not committed. Not corpus-registered.**
> Do not add to Patch_Log.md, ANNEX_D.md, or INDEX.md until reviewed and approved.
> Supersedes draft v2. Incorporates 5-agent red-team findings (Constitutional Purist, Behavioral Economist, Implementation Skeptic, Labor Advocate, Gaming Strategist).

---

- **Proposed Patch ID:** P-063
- **Status:** PROPOSED
- **Priority:** High
- **Related threat / pressure:** T-025 (Demurrage Sector-Capture) / extraction-through-labor within productive-use exemption
- **Constitutional text target:** ANNEX_D.md — amendment to §D6.2(d) clause text; new §D6.9 (tightened eligibility); new §D6.10 (labor-displacement limit); conforming note to §D6.7; informational note to §D8
- **Linked patches:** P-017 (oracle independence), P-023 (contract-commitment architecture), P-029 (PFCR demurrage routing), P-031 (anti-dynasty ownership), P-033 (worker-owned enterprise preference), P-045 (enforcement panel)
- **Tier classification:** The 5.0 extraction cap and 3.0 floor-proximity cap are **Tier 3 calibration parameters** subject to oracle-calibrated adjustment within the ranges specified below. They are not Tier 2 founding commitments. The existence of an extraction-limit eligibility condition on §D6.2(d) is a **Tier 3 amendment** to the eligibility conditions of that exemption, not a change to its basic terms. See §P-063.1(a) for the constitutional basis.
- **Operative status prerequisite:** This patch remains at status **Designed** until the Technical Specifications Package confirms that oracle payroll data pipelines, extraction reporting, deferred-compensation disclosure, and affiliated-entity consolidation protocols are operational. It does not become Active on adoption alone. The TSP prerequisite has no expiration; if the TSP is not published within 36 months of adoption, the Constitutional Review Panel shall conduct a status review and publish findings.

---

## Purpose and Constitutional Grounding

The §D6.2(d) productive-use exemption shields active enterprise assets from the assessed net worth base used to calculate demurrage. This is correct: capital genuinely at work in productive enterprise should not carry the same carrying cost as passive hoarded wealth.

However, the exemption does not currently distinguish between an enterprise that shares productive surplus broadly and one that concentrates it entirely at the top. An owner who personally extracts fifty times what the median worker earns receives identical constitutional protection to an owner who extracts three times what workers earn — even though one relationship is productive and mutual, and the other is extraction using the enterprise form as a vehicle.

The Jubilee Directive (§D8) names as its purpose the transfer of productive assets — land, tools, enterprise equity — toward households near the participation floor S. The demurrage system as a whole is designed to prevent static wealth accumulation. A productive-use exemption that shelters extraction ratios of 50:1 or 100:1 is inconsistent with both principles: it uses the constitution's own protective mechanism to shield the precise behavior the constitution is designed to discipline.

**Constitutional framing:** This patch operates as a tightened eligibility test for the existing §D6.2(d) exemption. It does not create a new instrument or a new rate. It narrows the category of enterprise relationships that qualify as "active productive use" rather than "extraction through labor." Assets that no longer qualify re-enter assessed net worth at full oracle value and face standard demurrage tiers. This is consistent with §D9.1 (the demurrage schedule is the sole carrying-cost instrument) because no new charge is introduced — the existing charge applies to a narrower class of sheltered assets. The eligibility conditions of §D6.2(d) are Tier 3 parameters; narrowing them does not require the Founding Amendment Process.

**Jubilee and Christ-centered grounding:** The Jubilee in Leviticus 25 was not an incentive for good behavior — it was a structural limit on how far accumulation could go before the system reset. It did not offer partial credit for partial compliance. It set a categorical boundary: past this point, the concentration is not stewardship; it is dispossession. This patch encodes that same logic. The 5.0 threshold says: an enterprise relationship in which the owner's personal extraction exceeds five times the median worker's cash compensation is, by constitutional definition, no longer primarily a productive enterprise — it is an extraction vehicle. The exemption designed to protect productive enterprise does not extend to extraction vehicles.

---

## Patch Clauses

### P-063.1 — Amendment to §D6.2(d): Productive-Use Eligibility Condition

**Amend §D6.2(d) of ANNEX_D to read:**

> **(d) Active enterprise assets.** The net assessed value of an operating business in which the holder is a material participant, not a passive investor, is excluded from the net worth base. A holder is a material participant if they actively direct operations, contribute substantial personal services, and hold a beneficial ownership interest in the enterprise. **This exclusion is subject to the productive-use extraction limit in §D6.9. A holder whose personal extraction ratio exceeds the limits in §D6.9 does not qualify for this exclusion with respect to the affected enterprise during the period of disqualification.**

*This amendment incorporates the §D6.9 eligibility condition directly into the operative §D6.2(d) clause text. The eligibility condition is a Tier 3 parameter; this amendment does not require the Founding Amendment Process.*

---

### P-063.2 — New §D6.9: Productive-Use Extraction Limit

**Add to ANNEX_D as §D6.9, immediately following §D6.8:**

> **§D6.9 Productive-Use Extraction Limit**
>
> **(a) Purpose.** This section establishes the eligibility conditions for the §D6.2(d) enterprise-asset exclusion. An enterprise in which the holder's personal extraction ratio exceeds the limits below does not, for purposes of §D6.2(d), constitute a productive enterprise relationship with respect to the holder's net worth. Enterprise assets of a disqualified holder re-enter assessed net worth and face standard demurrage tiers.
>
> **(b) Scope.** This section applies to any holder claiming the §D6.2(d) exclusion on enterprise assets of an operating business in which the holder is a material participant. It applies to the holder's share of enterprise assets, not to the enterprise entity itself. Enterprises with fewer than 10 workers (as defined in §P-063.5) are outside scope, subject to the worker-count aggregation rule in §P-063.5(d).
>
> **(c) Standard extraction cap.** Where the holder's three-year rolling average personal extraction ratio R exceeds 5.0, the §D6.2(d) exclusion is fully disqualified for the current assessment period. Enterprise assets claimed under §D6.2(d) re-enter assessed net worth in full.
>
> The 5.0 cap is a Tier 3 calibration value. The oracle may adjust the cap within the range [3.0, 8.0], with 5.0 as the default founding value. Adjustments require a calibration review process as specified in the TSP, publication 90 days before taking effect, a public challenge window, and publication of findings to the corpus. The oracle may not lower the cap below 3.0 or raise it above 8.0 without a Founding Amendment Process.
>
> **(d) Floor-proximity cap.** Where the median worker's FTE cash compensation (as defined in §P-063.3(e)) is within 20% of the participation floor S — that is, where median worker compensation falls between S and 1.2×S — the extraction cap tightens to 3.0. The standard 5.0 cap does not apply in this condition. The 3.0 floor-proximity cap is a Tier 3 calibration value with range [2.0, 5.0].
>
> **(e) Suspension window.** A holder whose ratio first exceeds the applicable cap in a given assessment period receives oracle notification. The §D6.2(d) disqualification is suspended for 12 months from the date of oracle notification (the suspension window) to allow the holder to cure the breach. During the suspension window:
>
> - The holder's §D6.2(d) exclusion is suspended with respect to the breaching fraction of enterprise assets. Demurrage accrues on the breaching fraction at standard assessed net worth rates from the date of oracle notification.
> - Demurrage accrued during the suspension window is owed and is not reversed upon cure. The carrying cost of the cure window is the incentive for early compliance.
> - If the holder returns to compliance before the suspension window expires, disqualification does not trigger. The suspension lifts and the full §D6.2(d) exclusion is restored prospectively from the date of compliance. No further cure-window demurrage accrues after the compliance date.
> - If cure does not occur within 12 months, full disqualification triggers from the oracle notification date and continues until compliance is achieved.
>
> The suspension window may be used for retroactive exemption restoration only once per 7-year period per holder per enterprise. A holder who has used a suspension window within the prior 7 years is not entitled to a new suspension window; upon breach detection, disqualification applies immediately from the oracle notification date. A holder who breaches more than twice in any 10-year period incurs a permanent 0.5 reduction in their applicable cap.
>
> **(f) Disqualification scope.** Disqualification applies to the holder's entire §D6.2(d) enterprise-asset exclusion claim for the affected enterprise. It is not partial. The holder either qualifies (R ≤ cap) or does not (R > cap).
>
> **(g) D6.7 aggregate shelter cap interaction.** Disqualified enterprise assets re-enter assessed net worth. This disqualification does not by itself constitute a §D6.7 aggregate shelter cap breach. The oracle shall not treat the re-entry of disqualified enterprise assets as a §D6.7 violation for 12 months following the disqualification date, giving the holder time to adjust other shelter channels. After 12 months, the full assessed net worth base including re-entered enterprise assets is used for §D6.7 calculations.
>
> **(h) Oracle appeal rights.** The TSP shall specify an independent appeal mechanism for each category of oracle determination under §D6.9 and §P-063.3–P-063.6, consistent with the independence requirements of §D7.5. Appeals shall not require oracle approval to initiate and shall be decided by a body independent of the oracle panel. This requirement is a condition of the TSP prerequisite for Active status.

---

### P-063.3 — Personal Extraction Definition

**(a) Functional definition.** The extraction numerator includes any transfer of economic value from the enterprise or from affiliated entities (as defined in §P-063.6) that accrues to the benefit of the holder, the holder's household members, or any entity in which the holder holds a beneficial interest of any percentage — net of bona fide enterprise expenses paid to arm's-length third parties. The enumerated forms below are illustrative, not exhaustive.

**(b) Forms of extraction include:**

- (i) Cash salary, wages, and officer compensation;
- (ii) Cash bonuses, performance payments, and distributions;
- (iii) Dividends paid to the holder as beneficial owner;
- (iv) Non-cash personal benefits with imputed cash value above the constitutional de minimis floor of $5,000 per year — including but not limited to: personal-use corporate aircraft, corporate-funded housing, personal vehicle provision, family member compensation above documented market rate, and entertainment benefits classified as business expense but primarily serving personal consumption. The TSP shall specify valuation methodology above the $5,000 floor;
- (v) Net draws and principal amounts received under loans from the enterprise or affiliated entities where the interest rate is below arm's-length commercial terms, or where repayment is not being made on schedule — treated as constructive distributions;
- (vi) Compensation deferred into non-qualified deferred compensation plans (NQDCs), synthetic equity, phantom stock, performance units, split-dollar life insurance cash value accruals, or any structured instrument that accrues based on enterprise performance or the holder's personal services — counted in the extraction numerator in the year economically earned (i.e., the service year in which the compensation accrued), not the year of payment. Annual disclosure of aggregate deferred balances is required to the oracle;
- (vii) Employer contributions to defined-benefit pension or retirement plans that disproportionately benefit the holder relative to workers — the excess above what workers receive proportionally is counted as extraction;
- (viii) Equity appreciation in affiliated entities that the holder controls, to the extent not reinvested in operations;
- (ix) Payments from a consolidated enterprise to any entity in which the holder holds any beneficial interest, to the extent such payments exceed independently determined fair-value pricing. The holder bears the burden of demonstrating arm's-length fair value for such transactions, supported by contemporaneous third-party valuation for payments exceeding the TSP-specified materiality threshold;
- (x) Any other transfer of economic value from the enterprise or affiliated entities to the holder, holder's household, or holder-adjacent entities that reduces enterprise assets for personal benefit.

**(c) Reinvestment exclusion (not counted as extraction).** The following are excluded from the extraction numerator when supported by oracle-verified documentation:

- Wages, salaries, and benefits paid to workers other than the highest-compensated participant;
- Capitalized equipment, machinery, and tools used in operations, subject to the labor-displacement limit in §D6.10;
- Facility lease payments, build-out costs, and utilities;
- Inventory purchases and raw material inputs;
- Documented research and development expenditures;
- Marketing and customer acquisition costs at arm's-length rates to independent third parties;
- Retained earnings held within the enterprise and not distributed or constructively received.

**(d) Measurement period.** The extraction ratio R is the three-year rolling average of annual extraction ratios. The annual extraction ratio for a given year is (total extraction per (b) in that year) ÷ (median worker FTE cash compensation per (e) in that year). The rolling average reduces single-year gaming.

For new enterprises: R defaults to the current-year ratio until three years of data have accumulated. A successor enterprise — defined as any enterprise that receives more than 50% of the revenue-generating assets or more than 50% of the workforce of an enterprise previously subject to this section — inherits the prior enterprise's extraction history for rolling-average purposes. Oracle certification is required before the new-enterprise default applies to any enterprise that cannot demonstrate a bona fide greenfield commercial origin.

**(e) Denominator: median worker FTE cash compensation.** The denominator is the median annual cash compensation — salary, wages, and cash bonuses only; no imputed equity — of all workers in the enterprise as defined in §P-063.5, measured at full-time equivalent annualized rates. Part-time workers are annualized.

Anti-manipulation rules:
- The oracle may exclude worker classes added within 18 months that represent less than 20% of total worker-hours but whose compensation is more than twice the existing workforce median (prevents both upward and downward denominator manipulation);
- If the consolidated FTE count changes by more than 15% in a single assessment period, automatic oracle audit is triggered;
- If total FTE headcount declines by more than 15% from the baseline assessment year due to workforce reduction, the denominator is floored at: prior-period median × prior-period FTE count ÷ current FTE count. This prevents the denominator from rising mechanically through elimination of lower-paid workers.

---

### P-063.4 — New §D6.10: Labor-Displacement Limit

**Add to ANNEX_D as §D6.10, immediately following §D6.9:**

> **§D6.10 Labor-Displacement Limit on Productive-Use Exclusion**
>
> **(a) Purpose.** The §D6.2(d) productive-use exclusion is conditioned on the enterprise relationship being genuinely productive for the workforce, not merely substituting capital for labor to extract wealth while displacing workers. This section establishes a separate and independent eligibility condition alongside the extraction ratio limit in §D6.9.
>
> **(b) Single-window limit.** Automation capital expenditures — defined as capital investment whose primary function is substituting capital equipment for human labor rather than expanding capacity — do not qualify as reinvestment under §P-063.3(c) if they result in a decline of more than 10% in the enterprise's FTE headcount in the 24 months following the investment.
>
> **(c) Cumulative limit.** Regardless of single-window compliance, automation capital expenditures do not qualify as reinvestment if cumulative FTE reduction attributable to automation exceeds 20% of the baseline FTE count over any rolling 60-month window. The 60-month cumulative tracker closes the staged-reduction gaming vector.
>
> **(d) Baseline.** The FTE baseline is measured at the beginning of each 24-month and 60-month window. The oracle shall maintain a continuous FTE baseline record for each enterprise subject to this section.
>
> **(e) Appeal.** A holder may demonstrate to the oracle that headcount decline was attributable to factors other than automation capex (market contraction, voluntary attrition, business exit). The holder bears the burden of proof. This is an appealable oracle determination subject to the appeal mechanism in §D6.9(h).

*This clause separates the labor-displacement concern from the extraction-ratio measurement, addressing the Constitutional Purist finding that embedding it in the reinvestment definition created a misframed independent prohibition.*

---

### P-063.5 — Worker Definition and Employee Threshold

**(a) Who counts as a worker.** "Worker" means any natural person performing labor for the enterprise on an ongoing basis, including:

- Full-time and part-time direct employees;
- Independent contractors who perform more than 90 cumulative work days (not calendar days of engagement) for the enterprise in any rolling 12-month period and derive more than 50% of their annual income from the enterprise;
- Workers employed by staffing agencies, subcontractors, or franchise operators where the enterprise directs the work and the labor is integral to the enterprise's primary operations (functional-employee test).

**(b) Who does not count as a worker.** The highest-compensated participant (the person whose extraction forms the numerator) is excluded from the denominator. Independent contractors engaged for discrete, non-recurring projects with less than 30 cumulative work days in any rolling 12-month period are excluded.

**(c) Minimum threshold.** §D6.9 applies only to enterprises with 10 or more workers as defined in (a). This threshold is a Tier 3 calibration parameter with range [5, 15].

**(d) Worker-count aggregation.** For purposes of the 10-worker threshold only, all workers across enterprises in which the holder holds any beneficial ownership interest — regardless of the 25% consolidation trigger in §P-063.6 — are aggregated. A holder may not use sub-threshold entity structures to escape scope when the total workforce under their economic control meets or exceeds the threshold.

---

### P-063.6 — Affiliated-Entity Consolidation

**(a) Control-plus-aggregation test.** The extraction ratio must be computed on a consolidated basis across enterprises where:

- (i) The holder's combined direct and indirect beneficial ownership interest (including interests held through trusts, nominees, family members acting in concert, or tiered ownership structures) exceeds 25% in any single enterprise; or
- (ii) The holder is the largest single economic participant in the enterprise regardless of formal ownership percentage; or
- (iii) Two or more enterprises share any of the following: common governance or board representation controlled by the holder, pooled treasury or intercompany cash transfers exceeding 10% of either entity's revenues, intercompany receivables on non-arm's-length terms, or shared key personnel whose primary operational authority spans both entities.

**(b) Retroactive consolidation presumption.** Any restructuring executed within 36 months of P-063's proposal date that results in any ownership stake being reduced below 25% triggers a rebuttable presumption of consolidation evasion. The holder must demonstrate a pre-existing commercial rationale predating this patch's proposal date to rebut the presumption.

**(c) Substance-over-form.** Entities with shared beneficial ownership, shared operational management, shared cash flow, or shared workforce are treated as a single enterprise for ratio purposes regardless of formal corporate structure.

**(d) Highest-compensated participant on consolidated basis.** The extraction numerator is the holder's total personal extraction from all consolidated entities combined.

**(e) Worker denominator on consolidated basis.** The denominator is the median FTE cash compensation across the full consolidated workforce.

---

### P-063.7 — Anti-Gaming Provisions

**(a) Compensation reclassification.** Any instrument or arrangement whose economic substance is the transfer of value from the enterprise to the holder — regardless of its formal label — is included in the extraction numerator per §P-063.3(b). The oracle applies substance-over-form analysis. Instruments whose terms are commercially unreasonable are treated as constructive distributions.

**(b) Workforce reduction gaming.** Reducing the enterprise's worker headcount to improve the extraction ratio — whether through layoffs, contractor reclassification, or displacement — is subject to the wage-floor lock: if the median worker's FTE cash compensation declines in absolute terms in the year following an oracle ratio assessment, the applicable cap tightens by 0.5 for the subsequent assessment period.

**(c) Strategic fragmentation.** Deliberately splitting an operating enterprise to evade the §P-063.6 consolidation requirement is an audit trigger and grounds for retroactive consolidation from the date of fragmentation.

**(d) Timing arbitrage.** A holder who accelerates distributions in advance of, or delays them beyond, the measurement window to game the rolling average is subject to oracle re-timing authority: the oracle may reallocate distributions to the period in which they were economically earned. Deferred compensation counted under §P-063.3(b)(vi) is always attributed to the year earned, not the year paid, and oracle re-timing does not override that rule.

**(e) Oracle calibration constraints.** Calibration officers responsible for Tier 3 parameter adjustments under §D6.9(c) and §D6.9(d) may not hold a material beneficial ownership interest in any enterprise subject to this section. Proposed calibration adjustments must be published 90 days before taking effect, accompanied by the oracle data supporting the adjustment. A public challenge window of 60 days shall precede any adjustment taking effect. All calibration decisions and supporting data are published to the corpus.

**(f) Enforcement.** Material misrepresentation in extraction or payroll data supplied to the oracle is grounds for: (i) retroactive §D6.2(d) disqualification for the affected period; (ii) demurrage back-accrual from the first misrepresented period; (iii) referral to the Enforcement Panel under P-045 protocols; and (iv) a 24-month enhanced-audit designation during which the oracle reviews all extraction reporting quarterly rather than annually.

---

### P-063.8 — Transitional Relief

**(a) Notification window.** Any holder currently operating above the applicable cap has 12 months from the date this patch is designated Active to restructure toward compliance. During this notification window, the §D6.9 disqualification does not apply and the §D6.2(d) exclusion continues in full at its prior level. The notification window and the §D6.9(e) suspension window are sequential, not concurrent: the notification window applies to holders who are already over cap at the Active date; the suspension window applies to holders who breach the cap after the Active date. A holder compliant at the Active date is not in a notification window.

**(b) Cure credit.** Wage increases implemented during the notification window that reduce the extraction ratio are credited retroactively against the prior three-year rolling average at the oracle's next annual assessment.

**(c) No retroactive clawback.** Extraction that occurred before the patch's Active date is not subject to retroactive demurrage assessment solely because it exceeds the cap. Prior conduct is not penalized; only future conduct is governed.

**(d) Asset fire-sale protection.** A holder whose §D6.2(d) exclusion is disqualified does not have an immediate obligation to sell enterprise assets. The disqualified assets re-enter assessed net worth and demurrage accrues at standard rates going forward. The holder may return to compliance at any time by reducing the extraction ratio, at which point the exclusion is restored prospectively.

---

### P-063.9 — Conforming Amendments

**(a) §D6.2(d) operative text.** See §P-063.1 above. The operative text of §D6.2(d) is amended on its face to incorporate the §D6.9 eligibility condition.

**(b) §D6.7 aggregate shelter cap conforming note.** Add to §D6.7: *"Enterprise assets that have been disqualified under §D6.9 re-enter assessed net worth and are included in the base against which all shelter channels are calculated after the 12-month hold period specified in §D6.9(g). Disqualification under §D6.9 does not by itself constitute a §D6.7 cap breach during the hold period."*

**(c) §D8 Jubilee Directive informational note.** Add to §D8.2 as a non-operative note: *"Demurrage revenue collected from enterprise assets re-entering assessed net worth due to §D6.9 disqualification is constitutionally appropriate for inclusion in the Jubilee productive-asset restoration tranche. Operative routing requires a conforming §D8 amendment outside the scope of this patch."*

**(d) Technical Specifications Package delegation.** The TSP shall define:
- (i) Valuation methodology for non-cash personal benefits above the $5,000 constitutional floor (§P-063.3(b)(iv));
- (ii) Oracle payroll data submission requirements, cadence, and audit protocols;
- (iii) The arm's-length interest rate standard for constructive distribution analysis (§P-063.3(b)(v));
- (iv) Annual deferred-compensation disclosure format and filing requirements (§P-063.3(b)(vi));
- (v) The materiality threshold for related-party payment fair-value certification (§P-063.3(b)(ix));
- (vi) Affiliated-entity beneficial ownership tracing protocol and nominee/trust attribution rules;
- (vii) FTE baseline tracking methodology for the labor-displacement limit (§D6.10(d));
- (viii) Successor-enterprise oracle certification process (§P-063.3(d));
- (ix) Independent appeal mechanism for all oracle adjudicative powers under this patch (§D6.9(h)), including appellate body composition and independence requirements consistent with §D7.5.

All TSP provisions implementing this patch are Tier 3 parameters. The TSP prerequisite for Active status is not satisfied until item (ix) — the independent appeal mechanism — is fully specified and operational.

**(e) P-017 oracle conformance mandate.** The TSP shall confirm that all payroll, extraction, deferred-compensation, and affiliated-entity data pipelines established under this patch fall within the scope of P-017 oracle independence standards and the §D7.5 Oracle Governance Protocol. If existing oracle governance does not cover these data classes, a conforming amendment to the Oracle Governance Protocol is a prerequisite for this patch reaching Active status.

---

## Open Questions for Evidence Review at First Pilot Cycle

1. **5.0 founding cap:** Is 5.0 the right standard cap? This is a provisional Tier 3 threshold, not an evidence-backed finding. The oracle shall collect actual extraction ratios from participating enterprises and the Constitutional Review Panel shall publish a calibration report within 24 months of activation. The cap may be adjusted within [3.0, 8.0] via the oracle calibration process.

2. **3.0 floor-proximity cap:** Does the 20% of S band correctly identify the most vulnerable worker populations? Both the band and the tightened ratio are provisional.

3. **Automation capex thresholds:** The 10%/24-month and 20%/60-month thresholds for labor-replacing capex are approximate. Pilot data will determine whether these are well-calibrated.

4. **Subcontracting functional-employee scope:** The 90 cumulative work-day test and 50%-income test for contractor inclusion are approximate. Pilot enforcement will reveal whether they are too loose or too tight.

5. **Deferred-compensation fair-value methodology:** The accrual rule for NQDCs and similar instruments requires annual fair-value accounting. The TSP must specify the methodology; market-standard approaches (e.g., actuarial present value for defined benefit, Black-Scholes for options, notional account balance for phantom stock) are the reference point.

6. **Graduated partial disqualification:** The Implementation Skeptic recommended a formula `exempt_value = total_enterprise_assets × f(ratio)` where f declines from 1.0 as the ratio rises, rather than a binary cliff-edge. This would reduce adversarial compliance behavior at threshold. The panel should consider whether a graduated structure better serves the Jubilee purpose while reducing cliff-edge gaming pressure. This is an open architectural question for v4 if pilot data shows the binary structure is producing gaming rather than genuine pay-equity behavior.

---

## New Risks Introduced

| Risk | Severity | Mitigation in v3 |
|---|---|---|
| Oracle calibration capture | High | §P-063.7(e) independence requirements, publication mandate, challenge window, corpus publication |
| 25% consolidation threshold fragmentation | High | §P-063.6(a) control-plus-aggregation test; §P-063.6(b) 36-month retroactive presumption |
| Deferred compensation timing arbitrage | High | §P-063.3(b)(vi) accrual-year rule; annual disclosure |
| Staged automation cycling | High | §D6.10(c) 60-month cumulative tracker; §P-063.3(e) denominator floor |
| Cure-window oscillation (breach-and-cure cycling) | High | §D6.9(e) once-per-7-years limit; demurrage owed during window not reversed; recidivism cap reduction |
| 4.9:1 lock-in equilibrium | Medium | Wage-floor lock (§P-063.7(b)); open question on graduated structure (Q6 above) |
| Compensation reclassification ladder | Medium | §P-063.3(a) functional definition (not enumerated list); related-party look-through §P-063.3(b)(ix) |
| Median worker classification arbitrage | Medium | Anti-manipulation rules §P-063.3(e); 15% FTE-change audit trigger; 90 work-day (not calendar-day) threshold |
| 9-worker structural cap evasion | Medium | §P-063.5(d) worker-count aggregation rule independent of consolidation threshold |
| Related-party revenue laundering | Medium | §P-063.3(b)(ix) look-through rule; holder bears burden of fair-value proof |
| New-enterprise baseline harvest | Medium | §P-063.3(d) successor-enterprise rule; oracle certification prerequisite |
| §D6.7 double-jeopardy when assets re-enter | Medium | §D6.9(g) 12-month hold before §D6.7 re-tests against expanded base |
| TSP provisions not published / delayed indefinitely | Low | §P-063 operative prerequisite; 36-month CRP status review trigger |
| Transitional asset fire-sales | Low | §P-063.8(d) no immediate asset-sale obligation; demurrage accrues, exclusion restorable |

---

## Dependencies

- P-017 (oracle independence standards) — all payroll, extraction, deferred-compensation, and consolidation data; P-017 conformance is a TSP prerequisite per §P-063.9(e)
- P-023 (contract-commitment, demurrage universality) — this patch operates on exclusion eligibility, not rate; no conflict
- P-029 (PFCR) — Jubilee routing informational note in §P-063.9(c)
- P-031 / P-033 (ownership, enterprise preference) — §D6.10 labor-displacement limit is distinct from P-033; does not subsume P-033
- P-045 (enforcement panel) — §P-063.7(f) misrepresentation referral
- ANNEX_D §D6.2(d), §D6.7, §D8, §D9.1 — direct constitutional text targets

---

## v2 → v3 Change Summary

| Area | v2 | v3 |
|---|---|---|
| §D6.2(d) amendment | Note only in §P-063.7(a) | Operative clause text amended on its face (§P-063.1) |
| Tier classification | 5:1 and 3:1 labeled Tier 2 (contradicted by calibration review) | Reclassified as Tier 3 with explicit [3.0, 8.0] and [2.0, 5.0] ranges |
| Cure window | Retroactive restoration (violated §D7.1) | Suspension model: disqualification deferred, demurrage accrues during window, not reversed on cure |
| Cure recidivism | No limit | Once per 7 years; third breach in 10 years = permanent -0.5 cap |
| Consolidation | 25% bright-line | Control-plus-aggregation test; 36-month retroactive presumption |
| Deferred compensation | Not captured | Accrual-year rule; annual disclosure requirement |
| Automation displacement | Single 10%/24-month window; embedded in reinvestment definition | Separated into §D6.10; added 60-month cumulative tracker; denominator floor |
| Extraction definition | Enumerated list | Functional definition; related-party look-through; pension/insurance/equity appreciation captured |
| Median manipulation | Anti-median-inflation rule (below-median only) | Extended to above-median; 15% FTE-change audit trigger; denominator floor |
| Worker threshold | Hard 10-worker scope limit | 10-worker threshold + worker-count aggregation across all holder enterprises |
| §D6.7 interaction | Disqualification re-enters base immediately | 12-month hold before §D6.7 re-tests |
| Oracle appeal rights | Not specified | Mandatory TSP specification; prerequisite for Active status |
| Oracle calibration | No constraints | Independence requirement; 90-day publication; 60-day challenge window; corpus publication |
| New-enterprise baseline | Defaults to current year | Successor-enterprise rule; oracle certification prerequisite |
| Transitional/cure window | "Concurrent" (contradictory) | Sequential: notification window for pre-Active holders; suspension window for post-Active breaches |
| P-017 conformance | Mentioned as dependency only | Explicit TSP conformance mandate; prerequisite for Active status |
| Non-cash de minimis | Fully TSP-delegated | $5,000 constitutional floor set in patch text |
| Labor-displacement limit | Embedded in reinvestment exclusion | Separate §D6.10 clause with independent purpose statement |
