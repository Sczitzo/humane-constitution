# Capacity Measurement Evidence Test Package

This package defines what must be true before the project can make strong claims about measuring real essential capacity.

Capacity measurement is a constitutional safety system. Essential Access, Shared Storehouse activation, reserves, emergency response, and public trust all depend on whether the system can tell the difference between real abundance, hidden shortage, temporary logistics failure, forecast error, and manipulated data. Bad measurement can harm people even when every institution is acting in good faith.

Current status: **active-unproven control, needs field evidence**.

See also: [Claims and Evidence Register](./Claims_Evidence_Register.md), [External Evidence Register](./External_Evidence_Register.md), [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md), [Threat Resolution Matrix](./Threat_Resolution_Matrix.md), [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md), [Annex M](../annexes/ANNEX_M.md), [Annex AL](../annexes/ANNEX_AL.md), and [Annex AQ](../annexes/ANNEX_AQ.md).

---

## Honest Claim Boundary

The project may currently claim:

> The measurement architecture requires evidence classes, confidence bands, methodology-class diversity, direct physical sampling, and conservative defaults during oracle failure.

The project may not yet claim:

- essential capacity is reliably measurable at deployment scale;
- oracle independence has been proven in the field;
- confidence bands will be understood by ordinary readers;
- physical sampling is frequent enough to anchor the categories it claims to verify;
- suppliers, agencies, vendors, standards bodies, or AI systems cannot bias measurement;
- Shared Storehouse activation and unwind thresholds are operationally safe;
- measurement can avoid both false abundance and false scarcity under stress.

Evidence-backed claims require the tests below plus a residual-risk update.

---

## Source Base

| Source | What it supports | What it does not prove |
|---|---|---|
| [Sphere Handbook](https://spherestandards.org/handbook/) | Humanitarian response uses minimum standards and indicators for WASH, food security, shelter, and health. | Emergency standards are not a full ordinary-life capacity measurement system. |
| [IPC Manual 3.1](https://www.ipcinfo.org/ipcinfo-website/resources/ipc-manual/en/) | Food insecurity classification uses evidence convergence, international standards, and severity thresholds. | IPC does not measure all essential categories or solve supplier manipulation. |
| [WHO Service Availability and Readiness Assessment](https://www.who.int/data/data-collection-tools/service-availability-and-readiness-assessment-%28sara%29?ua=1) | Health service capacity requires facility lists, surveys, tracer indicators, equipment, medicines, staffing, and readiness measures. | SARA does not prove actual real-time care availability or quality under crisis. |
| [WHO/UNICEF JMP and WHO WASH monitoring](https://www.who.int/activities/monitoring-water-sanitation-and-hygiene) | Water, sanitation, and hygiene monitoring depends on comparable indicators, system monitoring, and availability/safety dimensions. | Global WASH monitoring does not provide local real-time scarcity triggers. |
| [UN-Water SDG 6 monitoring](https://www.unwater.org/publications/sdg-6-monitoring) | Water data supports accountability, investment, and effective decision-making; indicator methods need explicit definitions. | SDG monitoring cadence is not fast enough for emergency rationing decisions. |
| [IEA energy data and statistics](https://www.iea.org/data-and-statistics/about) | Energy security policy depends on consistent, accurate, timely supply and demand data, including near-term data collections. | IEA data frameworks do not prove local Essential Access energy availability. |
| [UN Fundamental Principles of Official Statistics](https://unstats.un.org/fpos) | Public statistics require integrity, professional independence, confidentiality, relevance, transparency, and equal access. | Official-statistics principles do not prevent political or supplier capture by themselves. |
| [OECD Good Statistical Practice](https://www.oecd.org/en/toolkits/good-statistical-practice.html) | Statistical systems need quality, transparency, accountability, and institutional good practice. | Good statistical practice does not resolve adversarial oracle design. |
| [OECD AI Principles](https://www.oecd.org/en/topics/ai-principles.html) | AI systems need transparency, robustness, safety, accountability, and risk management. | AI principles do not prove algorithmic oracle independence or correctness. |

---

## Abuse Model

Assume capacity numbers will be attacked because they move survival access, rationing, funding, procurement, and political legitimacy.

| Actor | Likely attack or failure route | What the test must expose |
|---|---|---|
| Supplier or distributor | Under-reports inventory to trigger public procurement or over-reports inventory to avoid Shared Storehouse. | Whether physical sampling and logistics data catch strategic reporting. |
| Public agency | Smooths bad news, delays publication, changes denominators, or hides uncertainty to protect reputation. | Whether dashboards publish uncertainty and revision history. |
| Standards body | Defines quality, capacity, or readiness in a way that favors incumbents or lowers obligations. | Whether methodology-class and standards-funding audits detect capture. |
| Oracle vendor | Optimizes model performance on stale or biased data while satisfying formal reporting requirements. | Whether direct physical sampling and error-correlation tests catch shared blind spots. |
| Political operator | Pressures oracles to avoid scarcity declarations before elections or to overstate scarcity for emergency powers. | Whether independence and publication duties survive political stress. |
| Local official | Reports favorable local capacity while appeals, queues, and missed deliveries reveal access failure. | Whether delivery outcomes can contradict top-line capacity claims. |
| Black-market actor | Exploits cadence gaps, logistics delays, or false scarcity signals to hoard or arbitrage essentials. | Whether sentinel indicators compress exploit windows. |
| Well-meaning technocrat | Treats modeled estimates as reality because direct measurement is expensive or messy. | Whether evidence classes prevent false precision. |

---

## Required Models

### 1. Category Definition Model

**Question:** Does each essential category measure the thing people actually need, not a convenient proxy?

**Minimum categories:**

- food;
- potable water;
- shelter and heat;
- essential medicines;
- basic healthcare and care capacity;
- sanitation;
- basic transit;
- essential energy;
- communications needed for access and emergency coordination.

**Required outputs:**

- operational definition;
- unit of measurement;
- minimum quality floor;
- perishability or service-life assumption;
- substitutability rule;
- geographic resolution;
- time resolution;
- who is counted;
- what is missing;
- policy actions allowed at each evidence class.

**Failure criteria:**

- food capacity ignores distribution, spoilage, storage, or transport;
- water capacity ignores availability, contamination, or access distance;
- shelter capacity counts raw units rather than habitable, heated, accessible, placeable units;
- health capacity counts licensed facilities rather than staffed, equipped, reachable, ready services;
- medicine capacity counts inventory without continuity, cold chain, substitution, or expiry;
- category definitions can be changed without a public semantic-impact test.

### 2. Latency and Cadence Model

**Question:** Are measurements fast enough for decisions that can harm people?

**Minimum tests:**

- high-volatility category update interval;
- low-volatility category update interval;
- sentinel indicator detection delay;
- forecast-vs-actual variance;
- publication delay;
- revision delay;
- appeal and challenge timing;
- Shared Storehouse activation and unwind timing.

**Failure criteria:**

- data arrives after the harm window has passed;
- one category updates quickly while a dependent category lags;
- Shared Storehouse remains active after verified recovery because unwind is slower than activation;
- dashboard publication lags operational decision-making;
- first-responder authority relies on stale evidence;
- cadence gaps create predictable arbitrage windows.

### 3. Evidence-Class and Confidence-Band Model

**Question:** Does the public know how strong the evidence is, and what uncertainty remains?

**Required evidence classes:**

- direct physical observation;
- audited administrative estimate;
- modeled forecast;
- community or affected-population report;
- expert judgment;
- emergency physical indicator.

**Required outputs:**

- confidence interval or uncertainty band;
- source count;
- methodology class;
- data age;
- last revision;
- known missing data;
- direction of likely bias;
- decision consequence allowed.

**Failure criteria:**

- confidence bands are absent, hidden, or incomprehensible;
- modeled forecasts are presented as observed capacity;
- expert judgment can trigger scarcity without corroboration;
- uncertainty always resolves in favor of institutional convenience;
- public readers cannot explain what the number means;
- old data is displayed as current.

### 4. Methodology-Class Independence Model

**Question:** Do different oracle nodes actually fail in different ways?

**Required tests:**

- Annex AL methodology-class registry review;
- pairwise error-correlation test;
- standards-body concentration audit;
- funding-source lookback;
- AI supply-chain dependency audit;
- direct physical sampling comparison;
- adversarial-seat dissent analysis.

**Failure criteria:**

- formally different nodes share data, standards, vendors, AI models, funders, or professional assumptions;
- pairwise error correlation exceeds FC-032 without corrective action;
- adversarial seats produce no meaningful dissent because their incentives are captured;
- standards-body concentration review is delayed until after decisions;
- direct physical sampling is too rare to detect model drift;
- divergence between methodology classes is suppressed as inconvenience rather than investigated as signal.

### 5. Direct Physical Sampling Model

**Question:** Is there enough ground truth to keep models and administrative data honest?

**Minimum sampling domains:**

- food warehouses, distributors, and retail shelves;
- water quality and availability points;
- shelter habitability and placement sites;
- essential medicine inventories and cold-chain integrity;
- healthcare staffing, equipment, and readiness;
- energy supply continuity for essential uses;
- transit availability at point of service.

**Required outputs:**

- sampling frame;
- randomization method;
- inspection frequency;
- inspector independence;
- tamper-evidence method;
- cost per category;
- detected discrepancy rate;
- follow-up enforcement;
- public summary of findings.

**Failure criteria:**

- sampling can be predicted or staged around;
- inspectors depend financially on measured actors;
- sampling covers only easy locations;
- discrepancy findings do not update oracle confidence;
- cost pressure causes sampling to become symbolic;
- field data is too sparse to challenge administrative claims.

### 6. Activation, Hold, and Unwind Model

**Question:** Do scarcity controls activate quickly enough, hold conservatively under uncertainty, and unwind when recovery is real?

**Minimum scenarios:**

- genuine sudden food disruption;
- false food disruption caused by demand surge;
- water contamination with uncertain geography;
- medicine shortage with substitution dispute;
- shelter loss after disaster;
- healthcare staffing collapse;
- oracle quorum loss during active Shared Storehouse;
- fast recovery after short shock;
- politically sensitive pre-election shortage.

**Required outputs:**

- trigger threshold crossed;
- evidence class supporting trigger;
- decision time;
- affected population;
- CSM continuity;
- rationing scope;
- challenge path used;
- unwind signal;
- post-mortem discrepancy.

**Failure criteria:**

- Shared Storehouse activates on vague scarcity claims;
- activation is fast but unwind is slow;
- oracle failure becomes a deprivation vector;
- Conservative Hold normalizes permanent emergency administration;
- challenge paths cannot operate inside the harm window;
- recovery is ignored because officials fear being blamed for a premature lapse.

### 7. Dashboard and Public Comprehension Model

**Question:** Can ordinary skeptical readers understand the difference between measured fact, estimate, forecast, uncertainty, and policy choice?

**Required tests:**

- plain-language dashboard comprehension;
- confidence-band explanation test;
- revision-history visibility;
- "what changed since last update" test;
- scarcity trigger explanation test;
- oracle disagreement explanation test;
- appeal-path visibility.

**Failure criteria:**

- readers treat confidence bands as decoration;
- readers cannot tell which values are modeled;
- dashboards hide disagreement behind a single consensus score;
- public notices do not explain what action follows from a threshold;
- people cannot find how to challenge a measurement that affects them;
- dashboard design creates false certainty.

---

## Calibration Rules

Capacity parameters should be bound from evidence, not convenience.

**Minimum parameter set:**

| Parameter | What it controls | Evidence needed before binding |
|---|---|---|
| FC-001 through FC-005 measurement error bounds | Acceptable error for food, water, shelter, energy, and medicine | Field measurement pilot, physical sampling discrepancy rate, harm model by category. |
| FC-030 oracle node floor | Minimum oracle cohort size | Availability, cost, BFT tolerance, independence stress test. |
| FC-031 methodology-class floor | Minimum distinct methodology classes | Error-correlation and standards-concentration review. |
| FC-032 pairwise error-correlation maximum | Maximum shared error pattern | Historical overlap, ground-truth sample, stress scenario. |
| FC-033 adversarial seat floor | Required dissent capacity | Dissent usefulness, capture review, procurement independence. |
| FC-072 Shared Storehouse activation threshold rule | Category-specific scarcity trigger | Category definition model, latency test, CSM harm model, unwind test. |
| FC-100 oracle restoration window | Post-failure verification period | Oracle-failure drill, flash-recovery manipulation test, reconciliation results. |

**Calibration must satisfy all five constraints:**

1. evidence strength rises with policy consequence;
2. uncertainty is published before decisions are made;
3. direct physical sampling can contradict administrative and modeled data;
4. activation and unwind are symmetric enough to prevent permanent emergency;
5. ordinary readers can understand the measurement's limits.

---

## Test Sequence

### Stage 0 - Desk Evidence Review

Output: source memo separating humanitarian standards, food-security classification, WASH monitoring, health facility readiness, energy data practice, official-statistics principles, and AI/data-governance cautions.

Pass condition: the memo identifies what outside sources support and what they do not prove.

### Stage 1 - Category Definition Audit

Output: one measurement sheet per essential category, including unit, quality floor, evidence class, cadence, uncertainty, and allowed policy consequence.

Pass condition: no category relies on a proxy that can look adequate while access fails.

### Stage 2 - Synthetic Shock Simulation

Output: simulated genuine shortage, false shortage, demand surge, logistics failure, and recovery scenarios across at least three categories.

Pass condition: measurement latency, activation, hold, challenge, and unwind behavior are visible and timed.

### Stage 3 - Field Sampling Pilot

Output: direct physical samples compared with administrative reports, modeled forecasts, and community reports.

Pass condition: discrepancy rates are published and used to update confidence bands.

### Stage 4 - Methodology Independence Audit

Output: standards-body, funding, AI supply-chain, and pairwise error-correlation review for each oracle cohort.

Pass condition: every high-volatility category satisfies Annex AL requirements before it can gate Shared Storehouse.

### Stage 5 - Oracle-Failure Drill

Output: live tabletop or bounded operational drill using Annex AQ Conservative Hold, REB first-responder window, governance handoff, restoration, and reconciliation.

Pass condition: CSM continuity holds, public dashboard shows oracle failure, and reconciliation explains discrepancies.

### Stage 6 - Public Dashboard Test

Output: ordinary-reader comprehension results for capacity values, confidence bands, evidence classes, and challenge paths.

Pass condition: readers can tell what is known, what is estimated, what is uncertain, and what decision follows.

---

## Minimum Evidence Tables

The project should not move capacity measurement from **active-unproven** to **partly tested** until these tables exist.

| Table | Required columns |
|---|---|
| Category definition | Category, unit, quality floor, evidence class, cadence, geographic resolution, missing data, allowed policy consequence. |
| Error and latency | Category, reported value, ground-truth sample, error band, update delay, publication delay, decision delay. |
| Oracle independence | Category, node, methodology class, standards body, funding source, AI dependency, pairwise correlation, adversarial-seat status. |
| Physical sampling | Category, sampling frame, sample size, inspection date, discrepancy, suspected manipulation, follow-up action. |
| Activation/unwind | Scenario, trigger, evidence class, action, CSM effect, challenge path, unwind signal, post-mortem finding. |
| Dashboard comprehension | User group, value interpreted, confidence-band interpretation, challenge-path recall, confusion pattern. |
| Oracle failure | Failure type, hold entry time, REB decision, handoff time, restoration date, reconciliation discrepancy, root cause. |

---

## Decision Rule

Capacity measurement may support scale-up only if the tests show that it is:

- category-specific rather than proxy-driven;
- timely enough for the harm window;
- honest about uncertainty;
- independently challengeable;
- anchored by direct physical sampling;
- methodologically diverse under Annex AL;
- resilient to oracle failure under Annex AQ;
- clear enough for public accountability;
- symmetric between activation and unwind;
- capable of admitting "we do not know" without silently depriving people.

If those conditions fail, the project must pause scale-up for the affected category, restrict policy consequences to lower-stakes actions, increase direct sampling, revise category definitions, alter activation thresholds, or explicitly downgrade the claim from "measured capacity" to "estimated capacity under review."

---

## Residual Risk Statement

Even if the tests pass, essential capacity will never be perfectly measurable. Physical reality changes faster than dashboards, and people with power will try to shape the numbers that govern obligations. The correct goal is not perfect knowledge. The goal is a measurement system that is humble, adversarially tested, physically anchored, publicly legible, and unable to quietly convert uncertainty into deprivation.

