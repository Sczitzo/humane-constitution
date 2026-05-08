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

---

## 5. Failure Criteria Summary

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

---

## 6. Evidence Priority

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

**Priority 7 — Synthetic Shock Simulation (Test 4.7)**

Run seventh. Requires category definitions, oracle architecture, and threshold parameters to be in place.

**Priority 8 — Dashboard Comprehension Test (Test 4.6)**

Run last. Requires a near-final dashboard implementation. Comprehension test results should feed directly into dashboard revisions before any public launch.

---

## 7. See Also

- [Claims and Evidence Register](./Claims_Evidence_Register.md) — status taxonomy and evidence tracking for all capacity measurement claims
- [External Evidence Register](./External_Evidence_Register.md) — source review and evidence classes supporting capacity measurement design
- [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md) — open problems relating to oracle independence and measurement lag
- [Threat Resolution Matrix](./Threat_Resolution_Matrix.md) — control status for T-006, T-020, T-021, T-024
- [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md) — sequencing and resource requirements for physical sampling and oracle drills
- [Hardening Queue](./Hardening_Queue.md) — items pending constitutional hardening that depend on measurement evidence
- [ANNEX\_AL.md](../annexes/ANNEX_AL.md) — capacity measurement annex: methodology-class requirements, oracle architecture, and evidence class rules
- [Threat Register — T-006](./Threat_Register.md) — Measurement Lag / Supply Shock
- [Threat Register — T-020](./Threat_Register.md) — Measurement Source Corruption
- [Threat Register — T-021](./Threat_Register.md) — Measurement Independence Collapse
- [Threat Register — T-024](./Threat_Register.md) — Shared Storehouse Capture via false oracle signals
