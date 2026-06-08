# Capacity Measurement Evidence Test Package

This package defines what must be true before the project can make strong claims about real-capacity measurement.

Capacity measurement is the mechanism by which the system determines whether essential categories — food, water, shelter, healthcare, transit, energy, communications — are available in sufficient supply to sustain Essential Access promises, trigger Shared Storehouse activation, and govern scarcity-mode escalation. Bad measurement can harm people even when every institution is acting in good faith.

Current status: **active-unproven control, needs evidence**.

---

## 1. Honest Claim Boundary

The project may currently claim:

> The measurement architecture requires evidence classes, confidence bands, methodology-class diversity, direct physical sampling, and conservative defaults during oracle failure.

The project may not yet claim:

- essential capacity is reliably measurable at deployment scale;
- oracle independence has been demonstrated in practice — independence requirements exist in design only;
- confidence bands will be understood by ordinary readers;
- physical sampling is frequent or wide enough to anchor the categories it claims to verify;
- suppliers, agencies, vendors, standards bodies, or AI systems cannot bias measurement;
- Shared Storehouse activation and unwind thresholds are operationally safe;
- measurement can avoid both false abundance and false scarcity under adversarial stress.

Evidence-backed claims require the tests in Section 4 plus a residual-risk update to this document.

---

## 2. Source Base

| Source | What it supports | What it does not prove |
|---|---|---|
| [Sphere Handbook](https://spherestandards.org/handbook/) | Minimum humanitarian standards for food, water, shelter, health — shows that category definitions and quantitative thresholds matter | Does not validate the specific oracle architecture or measurement independence methods |
| [IPC Manual 3.1](https://www.ipcinfo.org/ipcinfo-website/resources/ipc-manual/en/) | Integrated Food Security Phase Classification — shows how expert consensus, phased thresholds, and multi-source evidence work in practice | Local-context classification does not prove scalability or oracle-independence |
| [WHO SARA](https://www.who.int/data/data-collection-tools/service-availability-and-readiness-assessment-%28sara%29) | Service Availability and Readiness Assessment — shows structured survey methodology for healthcare capacity | Health service surveys do not generalise to food, energy, or water measurement |
| [WHO/UNICEF WASH monitoring](https://www.who.int/activities/monitoring-water-sanitation-and-hygiene) | Joint Monitoring Programme for water/sanitation — shows multi-source, multi-indicator measurement methodology | Not designed for real-time ledger-linked threshold activation |
| [IEA energy data](https://www.iea.org/data-and-statistics/about) | Structured multi-source energy statistics with defined categories and revision cycles | IEA publishes with lag; not designed for real-time oracle architecture |
| [UN Official Statistics Principles](https://unstats.un.org/fpos) | Fundamental principles for official statistics: independence, transparency, quality standards, revision policies | Principles do not guarantee implementation; political independence may still be compromised |
| [OECD Good Statistical Practice](https://www.oecd.org/en/toolkits/good-statistical-practice.html) | Operational good practice for statistical organisations — governance, methodology, audit, data quality | Does not prove oracle independence under adversarial conditions |

---

## 3. Abuse Model

Assume capacity numbers will be attacked because they move survival access, rationing, funding, procurement, and political legitimacy.

| Actor | Likely attack or failure route | What the test must expose |
|---|---|---|
| Political actor | Suppresses shortage signals before elections or during politically sensitive periods to avoid emergency activation and the accountability that follows | Whether independence requirements and mandatory publication duties survive direct political pressure |
| Commercial supplier | Inflates reported available capacity to retain supply contracts, avoid Shared Storehouse activation, and prevent investigation of logistics failures | Whether physical sampling and delivery-outcome data can contradict administrative self-reporting |
| Measurement body insider | Biases methodology toward category definitions that favor incumbents, lower measured obligations, or obscure access failure behind acceptable-looking aggregates | Whether methodology-class audits and standards-body concentration reviews detect capture before it affects decisions |
| Oracle council captor | Builds institutional alignment across a majority of oracle seats through shared funders, professional culture, or AI supply-chain dependency — making formal independence nominal | Whether pairwise error-correlation tests catch shared blind spots and whether adversarial seats produce genuine dissent |
| Directional-bias cartel | Keeps pairwise correlations low while several nodes consistently overstate or understate capacity in the same direction | Whether the test checks direction of error, not only correlation strength |
| Adversarial simulation designer | Selects test scenarios that avoid the edge cases most likely to expose measurement failure — logistics breakdowns, rapid supply shocks, uneven geographic access | Whether test design is reviewed by parties with no stake in a passing result |
| Oracle vendor | Shares AI models, data feeds, or calibration training across multiple oracle nodes, creating correlated errors that defeat diversity requirements without violating formal rules | Whether supply-chain audits and independent physical sampling can detect correlated drift before it affects live decisions |

---

## 4. Required Tests

### 4.1 Category Definition Audit

**What is being tested:** Does each essential category measure the thing people actually need, or a convenient proxy that can look adequate while access fails?

**Method:** For each category — food, potable water, shelter, healthcare, transit, energy, communications — produce a written measurement sheet that specifies: unit of measurement, minimum quality floor, perishability or service-life assumption, substitutability rule, geographic resolution, time resolution, evidence class required to trigger threshold actions, and what the category excludes.

**Pass condition:** Every category has an operational definition that an independent observer unfamiliar with the project could use to verify a reported value against a physical sample.

**Failure criteria:**

- food capacity ignores distribution, spoilage, storage, or last-mile transport;
- water capacity ignores contamination, access distance, or seasonal variation;
- shelter capacity counts raw units rather than habitable, heated, accessible, placeable units;
- health capacity counts licensed facilities rather than staffed, equipped, reachable, ready services;
- any category definition can be changed without a public semantic-impact test.

### 4.2 Latency and Lag Test

**What is being tested:** How quickly does the measurement system detect a real shortage? Is detection fast enough to protect people?

**Method:** Inject a simulated supply decline for food and water (fast-volatility categories) and for shelter and energy (slower-volatility categories). Measure time from decline onset to: oracle detection, dashboard update, public publication, and any threshold activation.

**Benchmark:** Sphere Handbook minimum thresholds for food and water — 2,100 kcal/person/day and 15 litres/person/day — provide an external anchor against which oracle outputs should be evaluated.

**Failure criteria:**

- detection delay exceeds 48 hours for food or water shortage reaching Sphere minimum threshold;
- detection delay exceeds 7 days for shelter or energy shortage;
- one category updates quickly while a dependent category lags;
- dashboard publication trails operational decision-making by more than one update cycle.

### 4.3 Physical Sampling Pilot

**What is being tested:** Do oracle-reported figures agree with independent physical measurement?

**Method:** Conduct direct physical measurement of at least one high-stakes category (food or water) in a bounded geographic area. Sample a sufficient number of locations to support a confidence interval. Compare physical sample results to oracle-reported figures for the same period and geography.

**Required output:** A comparison table showing physical sample value, oracle-reported value, difference, direction of discrepancy, and confidence interval on the physical estimate.

**Pass condition:** The pilot is completed and results are published, including cases where the physical sample contradicts the oracle.

**Failure criteria:**

- sampling sites can be predicted in advance by measured actors;
- inspectors are financially dependent on the entities being measured;
- discrepancy findings are not used to update oracle confidence bands;
- pilot covers only locations expected to show agreement.

### 4.4 Methodology Independence Audit

**What is being tested:** Are measurement sources genuinely independent, or do they share data feeds, AI supply chains, funding, or professional culture in ways that make formal diversity nominal?

**Method:** For each oracle node pair, document: data feed sources, AI model provenance, primary funding body, standards bodies relied upon, and key personnel professional training. Compute pairwise error correlation on historical category readings for any period where at least two nodes operated.

**Pass condition:** Audit report is published. Correlation findings are shared with governance before any Shared Storehouse activation test.

**Failure criteria:**

- pairwise error correlation between any two oracle nodes exceeds 0.30 on historical category data without a documented corrective action;
- two or more nodes share a primary AI model vendor or data provider;
- adversarial oracle seats produce no meaningful dissent across any recorded disagreement period.

### 4.5 Oracle Failure Drill

**What is being tested:** Does the system continue to protect Essential Access when oracle nodes fail?

**Method:** Simulate simultaneous failure of 2 of the required oracle node minimum. Record: whether Essential Access issuance continues under Conservative Hold, whether Shared Storehouse activates or holds, how the public dashboard reflects the failure state, and whether restoration and reconciliation procedures are documented and followed.

**Pass condition:** Conservative Hold activates correctly, public dashboard shows oracle failure explicitly, and the documented protocol is followed without improvisation.

**Failure criteria:**

- no documented protocol exists for quorum failure before the drill;
- oracle failure silently causes access deprivation without a dashboard indication;
- Conservative Hold either fails to activate or cannot be unwound within the restoration window;
- reconciliation after restoration does not explain discrepancies produced during the failure period.

### 4.6 Dashboard Comprehension Test

**What is being tested:** Can ordinary readers understand what the measurement dashboard is telling them about their access rights?

**Method:** Show the capacity measurement dashboard to at least 20 readers with no technical background in statistics or logistics. Ask each reader to identify: current supply level for at least two categories, what the confidence band means, which categories are in watch or scarcity mode, and how they would challenge a measurement they believe is wrong.

**Pass condition:** At least 75% of readers correctly identify current supply level, interpret the confidence band as uncertainty rather than error, and can name one way to challenge a measurement.

**Failure criteria:**

- fewer than 75% of readers correctly identify current supply level;
- fewer than 75% correctly interpret the confidence band;
- no reader can identify a challenge path;
- dashboard design creates false certainty by hiding uncertainty bands or revision history.

### 4.7 Synthetic Shock Simulation

**What is being tested:** Does the scarcity escalation ladder activate at the correct thresholds and de-escalate when the shock resolves?

**Method:** Inject a simulated rapid supply drop into oracle inputs — a drop that crosses the Shared Storehouse activation threshold — and observe system response. After a defined interval, inject a recovery signal and observe de-escalation. Test at least two categories with different volatility profiles.

**Pass condition:** Activation occurs at the designed threshold, not before and not after. De-escalation occurs within the mandatory 14-day sunset window once recovery conditions are met.

**Failure criteria:**

- activation threshold is incorrect — the system activates too early or fails to activate at the designed threshold;
- system fails to de-escalate within 14 days of recovery conditions being met;
- de-escalation is slower than activation without a documented justification;
- Conservative Hold persists after recovery conditions are verified, normalizing permanent emergency administration.

### 4.8 Adversarial Oracle Seat Test

**What is being tested:** Does the adversarial oracle seat have practical ability to trigger a quorum challenge and exercise real dissent, not nominal dissent?

**Method:** Using the adversarial oracle seat, attempt to: (a) register a formal dissent on a capacity reading; (b) trigger a quorum challenge; (c) access the same source data as other nodes; (d) publish a minority report visible to the public dashboard. Separately, test whether a 4-of-4 vote by non-adversarial seats can override the adversarial seat and whether that override is publicly logged.

**Pass condition:** Adversarial seat can complete all four actions without being blocked by procedural barriers. Override mechanism works correctly and is logged transparently.

**Failure criteria:**

- adversarial seat cannot register dissent or trigger a quorum challenge in practice;
- adversarial seat lacks access to source data available to other nodes;
- minority report is not visible on the public dashboard;
- override mechanism works but the override is not logged or explained publicly.

### 4.9 Directional Bias Test

**What is being tested:** Can formally independent oracle nodes produce errors in the same direction while staying below the FC-032 pairwise-correlation ceiling?

**Method:** For each essential category in the pilot, compare each oracle node's readings against the ensemble median and against any independent physical-sampling result. Classify each material error as overstatement, understatement, or neutral. Test whether three or more nodes repeatedly overstate or understate capacity in the same direction, even if their pairwise Pearson correlations remain ≤0.30.

**Pass condition:** Directional error is measured and published. Any same-direction pattern receives a written explanation, adversarial-seat review, and corrective action before the affected category can support Shared Storehouse activation or scale-up claims.

**Failure criteria:**

- three or more nodes materially overstate capacity in the same category and period;
- three or more nodes materially understate capacity in the same category and period;
- same-direction material error recurs across two consecutive quarters without corrective action;
- the adversarial seat cannot access source data needed to test directional bias;
- public reporting publishes pairwise correlation but omits direction-of-error analysis.

### 4.10 Small-Population Oracle Calibration

**What is being tested:** Can Cohort 1 or any pilot population below 500 persons satisfy reality-anchoring requirements without pretending a small local group can support a full independent oracle ecosystem by itself?

**Method:** Before enrollment, publish a small-population oracle plan for populations below 500 persons. The plan must state which capacity measurements are local, which are regional or pooled, how the FC-030 five-node requirement is met, how FC-031 methodology-class diversity is met, how FC-032 and directional-bias tests will be computed despite low sample size, and which claims remain blocked until larger-population evidence exists.

**Pass condition:** The plan shows that physical sampling, methodology diversity, and adversarial-seat review are meaningful at pilot scale, or explicitly downgrades the claim and blocks Shared Storehouse/issuance credibility claims that require larger samples.

**Failure criteria:**

- the pilot treats a population under 500 as if it can validate FC-030/FC-032 locally without pooled or regional infrastructure;
- physical sampling is too small to produce usable confidence bands;
- the plan uses administrative self-reporting as a substitute for Tier-3 physical sampling;
- the public dashboard reports precise capacity figures without disclosing small-sample uncertainty;
- scale-up claims rely on Cohort 1 capacity results without naming the external-validity limit.

---

## 5. Test Criteria

This section defines the standing operational thresholds that govern whether the measurement system is functioning within acceptable bounds during live operation — as distinct from the one-time tests in Section 4. These criteria apply once measurement is operational. Breach of any criterion below triggers a defined response without requiring a full test re-run.

---

### TC-1 — Oracle Latency Threshold

**Criterion:** Every measurement update must occur within **30 calendar days** of a material change in essential category capacity.

**Definition of material change:** A change is material if it moves the measured capacity of any essential basket category by **5% or more** from the most recently published figure, or if it moves any category across a governance threshold (e.g., from adequate to watch, from watch to scarcity). Changes below 5% that do not cross a threshold may be captured in the next scheduled update cycle without triggering the 30-day requirement.

**Proposed value basis:** The 30-day ceiling is proposed precautionary — no field analogue. The IPC Phase Classification process operates on roughly monthly cycles for food security assessment in crisis contexts; IEA energy data publishes with 6–8 week lag. Thirty days is tighter than most analogues and is proposed as a forcing function to prevent slow drift going undetected across multiple update cycles. Evidence from a pilot deployment should be used to test whether 30 days is achievable without overstating precision.

**Rationale:** The issuance mechanism and Shared Storehouse thresholds respond to published capacity figures. If published figures lag physical reality by more than one month, the system can issue at rates inconsistent with actual supply, or fail to trigger rationing that physical shortage already requires. The 48-hour detection threshold in Test 4.2 governs simulated shock response; TC-1 governs routine update discipline under non-emergency conditions.

**Evidence basis:** Proposed precautionary — no field analogue for a ledger-linked capacity oracle system. The 30-day figure is drawn from analogy to IPC and IEA update cycles, not from operational experience with this architecture.

**Breach response:** If a material change is not reflected in a published update within 30 days: (1) the oracle council must publish a written explanation of the delay within 5 business days of the breach being identified; (2) the conservative prior (most recently published figure, or a downward-adjusted estimate if shortage direction is known) governs issuance and threshold decisions until the update is published; (3) three consecutive latency breaches in any 12-month period trigger a mandatory governance review of oracle resourcing, measurement methodology, and update obligations.

---

### TC-2 — Disagreement Resolution Protocol

**Criterion:** When two or more independent measurement sources report values for the same essential basket category that diverge by more than **5%** for the same period and geography, a formal disagreement review is triggered.

**Trigger threshold:** A **5% divergence** between any two oracle node outputs for the same category, period, and geographic unit initiates the review process. The 5% threshold is proposed precautionary — no field analogue. It is chosen to be tight enough to catch systematic drift before it propagates into issuance decisions, while being loose enough to accommodate legitimate methodological variation between sources.

**Who adjudicates:** The oracle council (as defined in ANNEX_AL.md), including the adversarial oracle seat. The adversarial seat may not be excluded from disagreement review. If the oracle council cannot reach resolution within 10 business days, the matter escalates to the independent Measurement Oversight Body (or equivalent governance body defined in the constitutional architecture).

**Fallback while review is underway:** The **conservative estimate** applies. For categories where lower capacity is harmful (food, water, energy), the lower of the two divergent values governs issuance and threshold decisions during review. For categories where over-reporting triggers premature rationing (shelter count), the lower value likewise applies, because false scarcity is preferable to false abundance during unresolved disagreement. The fallback value and its basis must be published on the public dashboard for the duration of the review, explicitly labeled as "under disagreement review."

**Review outputs:** The oracle council must publish: the two divergent source values, the resolution method used, the agreed figure (or the continued conservative prior if resolution fails), and whether the disagreement exposed a methodological defect requiring protocol revision.

**Evidence basis:** The 5% threshold is proposed precautionary. The IPC classification process uses structured expert consensus to resolve inter-analyst disagreement, but does not specify a numeric divergence trigger. The conservative-estimate fallback is consistent with the Conservative Hold principle already present in the oracle failure architecture.

**Breach response:** Failure to initiate a formal review within 5 business days of a detected 5% divergence constitutes a process breach. The conservative estimate continues to apply and the breach is logged in the public disagreement register. Repeated failures to initiate review trigger an audit of the oracle council's operating procedures.

---

### TC-3 — Physical Sampling Requirement

**Criterion:** At least **20%** of essential basket categories, by count, must be verified through direct physical or transactional sampling in each **calendar quarter**. No quarter may pass in which zero physical sampling occurs across any category that has triggered a watch or scarcity designation in the prior quarter.

**Definition of physical or transactional sampling:** Direct physical sampling means in-person measurement, site inspection, or direct transaction-level data collection (e.g., point-of-sale records, delivery manifests, facility inspection checklists) conducted by parties independent of the entities being measured and independent of oracle node funding. Purely modeled estimates, satellite inference without ground-truth validation, or administrative self-reporting by suppliers do not qualify as physical sampling for this criterion.

**Proposed minimum — 20% per quarter:** This is proposed precautionary — no field analogue at this coverage rate for a multi-category essential basket system. The Sphere Handbook requires direct field surveys to validate humanitarian response thresholds. WHO SARA requires on-site facility assessments. Neither specifies a quarterly coverage rate. 20% per quarter means that across four quarters, at least 80% of categories receive at least one physical sample per year, with the expectation that high-risk or watch-status categories are prioritized for repeat sampling.

**Sampling failure definition:** Sampling failure occurs when: (a) fewer than 20% of categories are physically sampled in a calendar quarter; (b) a category that is in watch or scarcity status receives no physical sampling in a quarter; (c) the sampling party has a financial relationship with the entity being measured; (d) sampling locations are disclosed to the measured entity in advance with sufficient specificity to allow selective preparation; or (e) sampling results are not published within 30 days of collection.

**Rationale:** Model-only measurement is gameable by anyone who understands the model's inputs. Physical sampling is the primary mechanism for detecting administrative self-reporting inflation by suppliers (see Abuse Model §3). Coverage of 20% per quarter is the minimum necessary to provide a credible deterrent signal.

**Evidence basis:** Proposed precautionary. The 20% figure has no field precedent for this architecture. It should be refined based on actual cost and logistical findings from the Physical Sampling Pilot (Test 4.3).

**Breach response:** (1) Immediate publication of the sampling gap and affected categories on the public dashboard; (2) conservative priors apply to all under-sampled categories that are in watch or scarcity status; (3) oracle council must publish a corrective plan within 15 business days; (4) three consecutive quarterly sampling failures trigger a mandatory external audit of the oracle council's physical verification capacity.

---

### TC-4 — Standards Concentration Risk

**Criterion:** No single entity — vendor, agency, methodology provider, AI model supplier, or standards body — may control more than **33%** of essential basket measurement for any single basket category, where control is measured by: primary data provision, primary methodology determination, or AI model supply for oracle node computation.

**Definition of control:** An entity controls a measurement dimension if its data, methodology, or AI model is the primary input used by the oracle to produce a published capacity figure for that category. Control is assessed at the oracle-input level, not at the public-facing output level. Shared funding is a yellow flag, not a bright-line trigger, but must be documented.

**Audit mechanism:** The oracle council must publish an annual **Measurement Concentration Report** that maps, for each essential basket category: the entities providing primary data, primary methodology, and AI model supply; their estimated share of oracle input; and any financial or institutional connections between them. The adversarial oracle seat has the right to commission an independent audit of the Measurement Concentration Report at any time.

**Rationale:** Standards bodies and AI model vendors can concentrate influence across formally independent oracle nodes without violating diversity requirements (see Abuse Model §3, "Oracle vendor" row). A 33% ceiling per category prevents any single entity from controlling more than one-third of any category's measurement without triggering a review. This does not guarantee independence, but it creates a surface against which concentration can be measured.

**Proposed value basis:** The 33% ceiling is proposed precautionary — no field analogue for oracle-linked measurement systems. It is derived by analogy from antitrust concepts of significant market influence (typically 25–33% in concentrated-market analysis) rather than from measurement-specific precedent. It should be reviewed after the first Measurement Concentration Report is produced.

**Evidence basis:** Proposed precautionary. No analogous concentration threshold exists in the IPC, WHO SARA, or IEA frameworks reviewed in Section 2.

**Breach response:** If any entity exceeds 33% concentration in any category: (1) the breach is published in the Measurement Concentration Report with the affected category and entity named; (2) the oracle council must submit a de-concentration plan within 60 days; (3) issuance and threshold decisions for the affected category shift to conservative priors until concentration falls below 33% or the governance body approves a documented exception with time-limited justification; (4) the exception cannot be renewed more than twice without a constitutional review.

---

### TC-5 — Public Confidence-Band Readability

**Criterion:** All published capacity measurements must include explicit uncertainty bands. A publication that omits any required element below is non-compliant and must be retracted and reissued.

**Minimum required elements for a compliant capacity measurement publication:**

| Element | Required content |
|---|---|
| Point estimate | The single best estimate of current category capacity, expressed in the category's defined unit (e.g., kcal/person/day, litres/person/day, habitable units available) |
| Low bound | The lower bound of the uncertainty range at a stated confidence level (minimum: 80% confidence interval) |
| High bound | The upper bound of the uncertainty range at the same confidence level as the low bound |
| Method description | A plain-language statement (maximum 150 words) of how the estimate was produced, including whether it is model-derived, physically sampled, administratively reported, or a composite |
| Data sources | A list of primary data sources used, with the date range of data collection |
| Revision flag | Whether this figure has been revised from the previously published estimate, and if so, the direction and magnitude of revision |
| Oracle status | Whether the figure was produced under normal oracle operation, Conservative Hold, or disagreement-review conditions |

**Non-compliant publication definition:** A publication is non-compliant if it omits any of the seven elements above, presents the confidence band in a format that a non-specialist reader would interpret as an error range rather than an uncertainty range (e.g., a "±" notation without explanation), or presents only the point estimate without bounds.

**Rationale:** The Dashboard Comprehension Test (4.6) requires that 75% of non-technical readers correctly interpret the confidence band as uncertainty rather than error. Non-compliant publication formats make this threshold harder to reach and give measured actors a false picture of precision that suppresses challenge.

**Evidence basis:** The UN Fundamental Principles of Official Statistics require transparency about quality and uncertainty. The OECD Good Statistical Practice recommends explicit quality indicators. Neither specifies the seven-element minimum above; that requirement is proposed based on the comprehension-test standard in §4.6.

**Breach response:** (1) Non-compliant publications must be retracted and reissued with all required elements within 5 business days of the deficiency being identified; (2) during the reissue period, the prior compliant publication remains the operative figure for issuance and threshold decisions; (3) three non-compliance events in any 12-month period trigger a mandatory review of oracle publication procedures and dashboard design; (4) all non-compliance events are logged in a public compliance register.

---

### TC-6 — Directional Bias Control

**Criterion:** Every quarterly oracle audit must publish direction-of-error analysis for each category and node, alongside the FC-032 pairwise correlation matrix.

**Failure definition:** Directional-bias failure occurs when three or more nodes materially overstate or understate capacity in the same direction for the same category and period, or when two or more nodes repeat the same-direction material error for two consecutive quarters.

**Breach response:** Same-direction biased nodes are treated as structurally dependent for the affected category. If effective N falls below FC-030 after dependency treatment, the affected category loses Shared Storehouse activation authority until the bias is explained and corrected. During unresolved overstatement bias, issuance and threshold decisions use the lower physical-sampling or conservative estimate.

---

## 6. Failure Criteria Summary

| Test | Failure criterion |
|---|---|
| 4.1 Category Definition Audit | Any category lacks an operational definition an independent observer could verify against physical sample |
| 4.2 Latency and Lag Test | Detection delay exceeds 48 hours for food/water shortage at Sphere threshold, or 7 days for shelter/energy |
| 4.3 Physical Sampling Pilot | Discrepancy findings are not published or not used to update oracle confidence bands |
| 4.4 Methodology Independence Audit | Pairwise error correlation between any two oracle nodes exceeds 0.30 without corrective action |
| 4.5 Oracle Failure Drill | No documented protocol for quorum failure exists before the drill is conducted |
| 4.6 Dashboard Comprehension Test | Fewer than 75% of ordinary readers correctly identify current supply level and confidence band |
| 4.7 Synthetic Shock Simulation | Incorrect activation threshold, or failure to de-escalate within 14-day mandatory sunset window |
| 4.8 Adversarial Oracle Seat Test | Adversarial seat cannot register dissent, trigger a challenge, or publish a minority report in practice |
| 4.9 Directional Bias Test | Multiple nodes produce same-direction material error while pairwise correlation appears acceptable |
| 4.10 Small-Population Oracle Calibration | Pilot population below 500 lacks a published plan for pooled/regional oracle support, small-sample uncertainty, and blocked claims |
| TC-1 Oracle Latency Threshold | Material capacity change not reflected in a published update within 30 days |
| TC-2 Disagreement Resolution Protocol | Formal review not initiated within 5 business days of a detected 5% divergence between sources |
| TC-3 Physical Sampling Requirement | Fewer than 20% of basket categories physically sampled in a calendar quarter; or any watch/scarcity category receives zero sampling |
| TC-4 Standards Concentration Risk | Any single entity controls more than 33% of essential basket measurement for any single category without an approved exception |
| TC-5 Public Confidence-Band Readability | Any publication omits a required element, or presents bounds in a format that implies error rather than uncertainty |
| TC-6 Directional Bias Control | Direction-of-error analysis is omitted, or same-direction material error is not treated as structural dependency |

---

## 7. Evidence Priority

The following sequence reflects dependency order: later tests depend on work done in earlier stages.

**Priority 1 — Category Definition Audit (Test 4.1)**

Run first. Every other test depends on knowing what is being measured. Until category definitions are locked and independently reviewable, latency tests, physical sampling, and shock simulations cannot be interpreted correctly. Update [Claims\_Evidence\_Register.md](./Claims_Evidence_Register.md) when category sheets are published.

**Priority 2 — Methodology Independence Audit (Test 4.4)**

Run second. The oracle cohort design must be validated before physical sampling is used to anchor it. If correlation findings reveal that nodes are not independent, the oracle architecture must be revised before further tests have evidentiary weight.

**Priority 3 — Physical Sampling Pilot (Test 4.3)**

Run third. Physical sampling provides the external ground-truth anchor for all subsequent oracle validation. Without at least one completed pilot, there is no basis for claiming oracles are calibrated against reality. Update [External\_Evidence\_Register.md](./External_Evidence_Register.md) with pilot results.

**Priority 4 — Latency and Lag Test (Test 4.2)**

Run fourth, after category definitions and at least one physical sampling cycle are complete. Latency is only interpretable against defined thresholds and categories.

**Priority 5 — Oracle Failure Drill (Test 4.5)**

Run fifth. Requires that the Conservative Hold protocol is documented and that at least one oracle cohort is operational or simulated. Update [Threat\_Resolution\_Matrix.md](./Threat_Resolution_Matrix.md) with drill findings for T-006 and T-021.

**Priority 6 — Adversarial Oracle Seat Test (Test 4.8)**

Run sixth, concurrent with or immediately after the oracle failure drill. Requires an operational adversarial seat. Update [Hardening\_Queue.md](./Hardening_Queue.md) with any procedural barrier findings.

**Priority 7 — Directional Bias Test (Test 4.9)**

Run seventh, before synthetic shock activation tests. A cohort that can pass pairwise correlation while drifting in the same direction is not trustworthy enough to run scarcity activation tests.

**Priority 8 — Small-Population Oracle Calibration (Test 4.10)**

Run before any Cohort 1 enrollment if the pilot population is below 500 persons. This test may run earlier if the pilot design fixes the population size during site planning.

**Priority 9 — Synthetic Shock Simulation (Test 4.7)**

Run ninth. Requires category definitions, oracle architecture, and threshold parameters to be in place.

**Priority 10 — Dashboard Comprehension Test (Test 4.6)**

Run last. Requires a near-final dashboard implementation. Comprehension test results should feed directly into dashboard revisions before any public launch.

---

## 8. See Also

- [Claims and Evidence Register](./Claims_Evidence_Register.md) — status taxonomy and evidence tracking for all capacity measurement claims
- [External Evidence Register](./External_Evidence_Register.md) — source review and evidence classes supporting capacity measurement design
- [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md) — open problems relating to oracle independence and measurement lag
- [Threat Resolution Matrix](./Threat_Resolution_Matrix.md) — control status for T-006, T-020, T-021, T-024
- [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md) — sequencing and resource requirements for physical sampling and oracle drills
- [Hardening Queue](./Hardening_Queue.md) — items pending constitutional hardening that depend on measurement evidence
- [ANNEX\_AL.md](../annexes/ANNEX_AL.md) — capacity measurement annex: methodology-class requirements, oracle architecture, and evidence class rules
- [Threat Register — T-006](./Threat_Register.md) — Measurement Lag / Supply Shock
- [Threat Register — T-020](./Threat_Register.md) — Epistemological Oracle Capture
- [Threat Register — T-021](./Threat_Register.md) — Algorithmic Oracle Capture
- [Threat Register — T-024](./Threat_Register.md) — Shared Storehouse Oracle-Failure During Active Rationing
