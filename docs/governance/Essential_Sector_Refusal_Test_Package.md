# Essential-Sector Refusal Test Package

This package turns the essential-sector refusal problem into practical drills for oil and fuel, medicines and PBM-style intermediaries, grid and logistics operators, and other firms whose assets can become survival chokepoints.

It extends the [Conglomerate Transition Dossier](./Conglomerate_Transition_Dossier.md), uses the strategic-floor architecture in [Annex AT](../annexes/ANNEX_AT.md), reports capture signals through the [Capture Dashboard Specification](./Capture_Dashboard_Specification.md), calibrates thresholds through the [Parameter Calibration Register](./Parameter_Calibration_Register.md), and supplies the Phase 8 evidence package for the [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md).

The test question is plain:

> If the largest essential-sector actor refuses, delays, litigates, lobbies, or exits, can the CSM floor still hold without giving that actor rule power?

This is not a prediction that incumbents will refuse. It is a refusal-survivability test. A system that cannot survive refusal should not claim that survival access is protected.

---

## Claim Boundary

The project may claim an essential sector is refusal-tested only when:

- the largest-supplier exit drill has been run for the relevant category;
- reserves, substitute supply, treaty capacity, public capacity, cooperative capacity, or compliant private capacity can bridge the full test window;
- beneficial ownership is traced through prime contractors, affiliates, subcontractors, trusts, and foreign entities;
- lobbying and capture exposure are disclosed before procurement awards;
- at least three independent compliant bidders exist, or a public/cooperative fallback can operate at published cost;
- pass/fail results and evidence packets are public, with privacy and security redactions justified.

The project should not claim:

- that voluntary compliance is enough;
- that paper procurement authority is the same as physical capacity;
- that strategic reserves solve indefinite refusal;
- that affiliates, PBMs, standards bodies, or logistics intermediaries are harmless because they do not manufacture the final good;
- that a sector is secure when compliant bidders exist only on paper.

Formal compliance is not enough. A sector can fail while the incumbent keeps signing forms, answering emails, and performing narrow contract duties. The test therefore treats **compliance-masked refusal** as refusal when lawful-looking behavior practically blocks CSM delivery, fallback activation, or patient access.

---

## Drill Scope Specification

Required drill coverage — each sector must be tested at the specific chokepoints listed below. Generic sector names are not sufficient. The drill must identify the firm or firm type being simulated (e.g., "Firm A, which controls 58% of natural gas transmission in the region"). Named firms are redacted in public publication if they are not public entities, but the Capture Dashboard operator and the Federated Ombuds Plenum receive unredacted versions.

### Energy sector chokepoints

- **Natural gas transmission:** The single largest pipeline operator serving the test jurisdiction must be included in the refusal simulation. A 90-day absence must be modeled.
- **Electricity dispatch:** The largest generation dispatcher by capacity share must be included. Fallback must demonstrate that reserve generation, imports, and demand response together can sustain the CSM energy floor.
- **Petroleum refining:** At least one refinery serving the jurisdiction's motor fuel supply must be modeled as unavailable. The strategic reserve release timeline must be published. FC-185 is currently reserved; the drill must produce a provisional timeline even if FC-185 is not yet bound.

### Medicine sector chokepoints

- **CSM-designated medicine supply:** Each CSM-designated medicine must be individually tested. If the largest single supplier exits, the system must demonstrate 365-day stockpile coverage. The drill must name the specific medicine classes, not the sector in aggregate.
- **PBM concentration:** If three PBMs process more than 80% of prescriptions in the jurisdiction, the drill must simulate the largest PBM exiting and document how prescriptions are rerouted.
- **Complete access paths:** CASP medicine capacity requires at least two complete access paths, not merely two suppliers: manufacturer or API source, distributor, pharmacy or specialty pharmacy, claims/formulary data, cold chain, prescribing interface, appeal route, and patient-support contact path.

### Logistics sector chokepoints

- **Port access:** If a single port handles more than 40% of essential goods imports, a 90-day port closure must be simulated. Fallback routes must be named and verified as operational.
- **Last-mile distribution:** At least one scenario must test rural or low-density distribution failure, not only urban logistics.

### Data and communications sector chokepoints

- **ISP and cloud concentration:** If a single ISP or cloud provider controls more than 50% of critical infrastructure connections in the jurisdiction, a 30-day outage must be simulated. Essential Access delivery must be demonstrated via alternative channels.

### Reserve drawdown timeline requirements

For each sector, the drill must produce:

1. **Days-to-zero:** How many days does the strategic reserve sustain the CSM floor without the primary supplier?
2. **Days-to-alternative:** How many days does it take to bring a CASP-registered alternative supplier to full CSM-floor delivery capacity?
3. **Gap window:** Days-to-zero minus days-to-alternative. If the gap window is greater than zero, the reserve is insufficient and the drill is a failure for that sector.
4. The published gap window must be signed off by the Capture Dashboard operator and made public before any sector is classified as secure.

### Pass condition for drill-secure classification

A sector is classified as drill-secure only when all three conditions hold:

- Gap window is zero or negative for all chokepoints in that sector.
- At least two CASP-registered alternatives exist with pre-committed contracts.
- The drill was conducted under adversarial observation: an independent party attempted to identify drill preparation in advance.

The drill must also include a cold-start variant in which the fallback operator receives no friendly advance preparation from the incumbent. A fallback path that depends on incumbent goodwill, undocumented staff cooperation, proprietary software access, or emergency concessions is not drill-secure.

---

## Drill 1 - Largest Oil/Fuel Supplier Exit

**Purpose:** Test whether fuel, heating, cooking, emergency transport, refining, pipeline, port, storage, and industrial-feedstock access can survive the largest supplier's refusal.

**Scenario:** The largest controlled oil/fuel supplier and its known affiliates exit or suspend service for 90 days. The drill must include refusal by direct supply, refinery scheduling, port access, pipeline allocation, storage release, emergency-fuel logistics, and foreign affiliate routing where relevant.

**Required model inputs:**

- CSM fuel and essential-energy demand by region and use case;
- current inventory and strategic reserve by fuel type and location;
- refinery and blending constraints;
- transport bottlenecks, including ports, pipelines, rail, trucking, and last-mile emergency delivery;
- treaty or regional supply commitments;
- substitute capacity, including electrified emergency transport, demand curtailment, and priority routing;
- legal time to activate reserve release, emergency procurement, or public receiver authority.

**Pass condition:** The CSM floor is maintained for the full 90-day exit window without discretionary survival gatekeeping, unlawful seizure, hidden price leverage, or waiver of Annex AT strategic floors.

**Fail condition:** Any region, protected group, or essential use loses CSM-level fuel or energy access because the largest supplier withheld capacity, delayed logistics, controlled a chokepoint, or forced an unreviewed concession.

---

## Drill 2 - Largest Medicine Supplier/PBM Refusal

**Purpose:** Test whether CSM-designated medicines remain available when the largest manufacturer, distributor, PBM, specialty pharmacy, formulary manager, or patent holder refuses cooperation.

**Scenario:** The largest medicine-access actor for each CSM-designated medicine stops supplying, excludes coverage, delays prior authorization, raises access conditions, withholds active pharmaceutical ingredients, blocks generic substitution, or routes access through affiliated entities for 365 days.

**Required model inputs:**

- forecast demand for each CSM-designated medicine;
- current stockpile, shelf life, cold-chain needs, and regional inventory;
- domestic manufacturing capacity and ramp time;
- API source concentration and single-country exposure;
- compulsory licensing, public manufacturing, cooperative manufacturing, and treaty supply options;
- PBM formulary control, specialty-pharmacy control, reimbursement delay, and affiliate self-preferencing routes;
- clinical substitution rules approved by independent medical review.

**Pass condition:** Every CSM-designated medicine remains available at the published clinical floor for 365 days, including vulnerable and high-need populations, without granting a PBM or patent holder rule authority.

**Fail condition:** Access depends on the refusing actor, a single opaque affiliate chain, a non-reviewable formulary decision, or a stockpile that cannot cover forecast demand and replacement lead time.

**Hidden compliance variants:** The drill must test refusal that appears as ordinary administration:

- prior authorization pending past the clinical clock for emergency, urgent-continuation, chronic-maintenance, or new-start cases;
- step therapy, non-preferred tiering, documentation loops, refill quantity limits, reauthorization churn, or formulary exclusions that create soft denial while nominal coverage remains;
- affiliated specialty-only routing that delays independent fills or raises the share of PBM-owned dispensing during the refusal window;
- claims, eligibility, formulary, prior-authorization status, prescription-transfer, refill-history, prescriber-contact, cold-chain inventory, or adverse-event-hold data that cannot be exported in time for a fallback path;
- REMS, patent, exclusivity, API, settlement, or litigation posture that delays fallback activation before a visible shortage appears.

**Patient continuity floor:** A medicine category does not pass merely because pills exist in inventory. It passes only when the right patient can receive the clinically appropriate medicine on time without PBM, patent, formulary, data, or affiliate control becoming a private veto. Existing patients on life-sustaining, pregnancy-related, disability-stabilizing, pediatric, oncology, transplant, HIV, diabetes, seizure, psychiatric-stabilizing, or rare-disease therapies may not be forced into interruption or substitution while a dispute or review is pending unless an independent clinician certifies equivalence for that patient class.

**Medicine metrics:** The evidence packet must report median and p95 time-to-fill by acuity and region, missed-dose rate, prior-authorization clock breach rate, independent formulary-override success, affiliated-routing share, API/export readiness, substitution harm signals, litigation-delay days, and continuity by vulnerable cohort. No aggregate pass is allowed if disabled, rural, elderly, pediatric, undocumented, safety-shielded, or high-complexity patients fail separately.

---

## Drill 3 - Largest Grid/Logistics Operator Delay

**Purpose:** Test whether delay, not only exit, can break survival access. Grid and logistics actors can create leverage by slow-walking interconnection, repair, dispatch, warehousing, route allocation, transformer replacement, outage restoration, or emergency delivery.

**Scenario:** The largest grid operator, logistics operator, or critical infrastructure maintenance contractor stays formally compliant but delays priority work by 30, 60, and 90 days. The drill must include plausible explanations: labor dispute, litigation, safety review, data migration, permit challenge, standards-body objection, cyber incident, or subcontractor failure.

**Required model inputs:**

- essential-load map and outage restoration hierarchy;
- spare transformer, switchgear, fuel, battery, cold-chain, fleet, warehouse, and route capacity;
- mutual-aid compacts and public receiver authority;
- independent maintenance crews and credentialed substitutes;
- logistics reroute capacity by corridor and commodity;
- maximum tolerable delay before CSM failure by region;
- telemetry needed to distinguish legitimate delay from coercive delay.

**Pass condition:** A 90-day delay by the largest operator does not break CSM delivery, and the system can shift dispatch, repair, transport, or warehousing to independent, public, cooperative, treaty, or compliant private capacity within the published maximum delay.

**Fail condition:** Formal compliance masks practical refusal, delay is not counted as a failure, or the public must accept concessions because no substitute operator can take over critical functions.

**Hidden compliance variants:** The drill must test partial compliance patterns: one corridor restored while low-value regions wait, transformer or spare-part paperwork completed but not released, emergency delivery accepted but deprioritized, safety-standard objections that block substitutes, data migration delays, workforce attrition or poaching, affiliate fallback substitution, and selective regional degradation.

**Transfer-control metrics:** The evidence packet must report time-to-transfer-control for dispatch, routing, warehouse, outage, grid, fleet, inventory, and credentialing functions; emergency operational data delivery within 24 hours; full operating package delivery within 30 days; named workforce coverage for at least 90 days without incumbent-controlled payroll, staffing firms, licenses, or training systems; and regional floor variance. Any injunction, standards objection, permit challenge, or appeal that blocks CSM continuity beyond 14 days counts as refusal unless independently cleared.

---

## Reserve Drawdown Model

Each drill must publish a reserve drawdown model before the drill begins.

| Field | Required content |
|---|---|
| Baseline demand | CSM demand by category, region, season, and protected use. |
| Initial reserve | Verified physical inventory, usable share, location, shelf life, and release authority. |
| Drawdown rate | Daily draw by normal demand, emergency demand, spoilage, losses, and substitution. |
| Replacement inflow | Domestic production, treaty supply, public/cooperative ramp, compliant private supply, and realistic lead time. |
| Bottleneck constraint | The limiting asset: refinery, API, cold chain, transformer, port, route, workforce, license, or data system. |
| Confidence band | Best, expected, and adverse-case duration before the reserve falls below the CSM floor. |
| Trigger points | Dates or thresholds for conservation, substitution, procurement escalation, public receiver authority, and Annex AT export caps. |
| Unwind rule | How emergency measures end without normalizing rationing or favored-vendor control. |

Drawdown models must separate physical capacity from legal authority. A reserve that exists but cannot be released in time does not count as available capacity.

---

## Fallback Capacity Checklist

No essential category passes unless fallback capacity is identified, contactable, legally usable, and periodically drilled.

| Capacity type | Checklist |
|---|---|
| Public capacity | Public inventory, public manufacturing, public utility receiver team, emergency procurement authority, staffing plan, operating budget, and activation timeline. |
| Cooperative capacity | Producer, pharmacy, logistics, energy, or community utility cooperatives with verified equipment, trained staff, insurance, and governance free from incumbent control. |
| Treaty capacity | Binding supply commitments with reciprocal essential-access guarantees, force majeure terms, origin verification, and transport plans. |
| Independent private capacity | Compliant firms with beneficial-owner traceability, no controlling affiliate overlap with the refusing actor, and published cost-plus or performance-margin terms. |
| Technical substitutes | Clinically approved medicine substitutes, fuel substitutes, microgrid capacity, alternate routes, alternate warehouses, and demand-reduction protocols that do not lower the CSM floor. |
| Workforce substitutes | Licensed operators, pharmacists, line crews, drivers, dispatchers, engineers, and maintenance staff available outside the refusing actor's control. |
| Data and control systems | Access to routing, dispatch, inventory, formulary, grid, and procurement data needed to operate fallback capacity without vendor lock-in. |

Fallback capacity that depends on the same beneficial owners, lenders, PBMs, standards bodies, software vendors, or foreign chokepoints as the refusing actor must be treated as correlated capacity, not independent capacity.

Independence review must include lenders, insurers, software vendors, staffing agencies, labor brokers, standards memberships, emergency subcontractors, PBMs, critical input suppliers, and affiliate-controlled data systems. A fallback path that shares any critical dependency with the primary supplier must be scored as correlated until an independent reviewer finds the dependency non-controlling.

---

## Compliant-Bidder Count

Every essential procurement category must publish a compliant-bidder count before award and after each refusal drill.

| Count | Meaning | Required response |
|---:|---|---|
| 0 | No compliant provider and no public/cooperative fallback. | Category fails. Scale claim must be downgraded. |
| 1 | One provider or one fallback path. | Category remains hostage-prone. Emergency diversification plan required. |
| 2 | Some redundancy, but collusion and correlated failure remain plausible. | Conditional pass only if beneficial-owner and dependency review shows independence. |
| 3+ | Minimum competitive resilience. | Pass if reserve and fallback tests also pass. |

The count must include controlled affiliates as one bidder. A bidder is independent only if beneficial ownership, financing, critical inputs, logistics, data systems, and governance influence are not controlled by the same actor or coordinated network.

---

## Lobbying And Capture Exposure Disclosure Standard

Any firm, affiliate, trade association, foundation, standards-body participant, PBM, or subcontractor seeking essential-sector public contracts must disclose capture exposure connected to the regulated category.

Minimum disclosure:

- direct lobbying spend and topic areas;
- trade association dues, board seats, policy committees, and funded campaigns;
- foundation grants, academic funding, think-tank funding, media sponsorship, and expert-panel support;
- standards-body funding, drafting roles, voting roles, and methodology influence;
- revolving-door hires, secondments, advisory roles, and family financial interests involving public offices, regulators, procurement bodies, or oracle nodes;
- litigation funding and coordinated legal strategy related to refusal, pricing, patents, procurement, export caps, strategic floors, or measurement;
- political spending where legally reportable, plus any legally hidden channel that can be disclosed as an aggregate without violating law;
- foreign affiliate, sovereign wealth, creditor, or parent-company influence over essential-category decisions.

Disclosure failure is a test failure if the missing information could change bidder independence, capture risk, reserve access, strategic-floor compliance, or public trust in the award.

The [Capture Dashboard Specification](./Capture_Dashboard_Specification.md) should publish aggregate exposure by category, award value, and trend. It must not rank ordinary workers or expose small-cell personal data.

---

## Pass/Fail Criteria

An essential category passes only if all conditions below are met:

- CSM delivery continues through the relevant refusal window: 90 days for fuel and grid/logistics drills, 365 days for CSM-designated medicines unless a higher Annex AT floor applies.
- Reserve drawdown stays above the CSM floor in adverse-case modeling.
- Fallback capacity can be activated before the reserve crosses the CSM floor.
- The compliant-bidder count is at least three, or a public/cooperative fallback can operate at published cost.
- Beneficial-owner trace completeness covers prime contractors, subcontractors, affiliates, trusts, foreign entities, lenders, and critical software/data vendors.
- Lobbying and capture exposure disclosure is complete enough for public challenge.
- Delay, litigation, standards-body obstruction, PBM formulary action, and affiliate routing are counted as refusal paths, not administrative noise.
- Compliance-masked refusal exposure stays below the [Capture Dashboard Specification](./Capture_Dashboard_Specification.md) watch threshold, or the sector is downgraded until remediation is complete.
- Emergency measures have a published unwind rule.

Compliance-masked refusal includes slow confirmations, narrow contract performance, "pending" substitutions, reserve-access paperwork, standards-body delay, PBM formulary action, affiliated routing, selective regional degradation, workforce poaching, data withholding, and litigation timed to exhaust fallback windows. A delay is refusal when it causes missed CSM service-level baselines, blocks transfer to fallback operators, prevents reserve or CASP activation within the published deadline, requires a waiver or secrecy concession, or forces a favorable contract extension to maintain continuity.

A conditional pass is allowed only when the CSM floor holds but one non-critical evidence element is incomplete. Conditional passes expire after 180 days unless the missing evidence is supplied.

A fail requires public downgrade of the relevant claim in the evidence register, a remediation owner, a deadline, and a retest date. Failed pilots may not be rebranded as success.

---

## Evidence Packet Requirements

Each drill must leave an evidence packet that an outside reviewer can inspect without trusting the operating team.

Required packet:

- drill scenario, date, scope, and refusal actor definition;
- sector map, including largest supplier, affiliates, chokepoints, PBMs, logistics intermediaries, critical software, and standards bodies;
- reserve drawdown model and assumptions;
- fallback capacity checklist with activation proof;
- compliant-bidder count and independence analysis;
- beneficial-owner trace report;
- lobbying and capture exposure disclosure;
- procurement terms, cost-plus or performance-margin formula, and escrow treatment;
- legal authority memo for reserve release, public receiver authority, compulsory licensing, treaty activation, or emergency procurement;
- telemetry and operational logs showing delivery continuity, delay, substitution, and outage or shortage events;
- compliance-masked refusal log, including pending approvals, paperwork delay, data export status, standards objections, legal stays, affiliate routing, workforce movements, PBM actions, and concession requests;
- patient transition packet for medicine drills: who was switched, who was not, who missed doses, who needed appeal help, who abandoned care, and which protected groups saw delays;
- affected-population analysis, including vulnerable groups and regional disparities;
- public communications, appeals, and complaint logs;
- independent reviewer findings, dissent, and unresolved questions;
- pass, conditional pass, or fail determination with remediation plan.

Sensitive operational details may be redacted when publication would create a security risk, but the redaction reason, reviewer, and expiry date must be published.

---

## Residual Risk

Passing this package does not prove that essential-sector capture is solved. It proves only that the tested refusal scenario did not break the CSM floor under the published assumptions.

Residual risks remain:

- firms can coordinate below disclosure thresholds;
- foreign affiliates can create pressure outside domestic enforcement reach;
- treaty capacity can fail during simultaneous regional crises;
- strategic reserves can be physically present but operationally inaccessible;
- PBM, patent, data, and standards-body leverage can move faster than procurement review;
- public fallback capacity can become inefficient, captured, or under-maintained;
- emergency authority can drift into normal governance;
- compliant-bidder counts can look healthy while sharing lenders, suppliers, software, workforce pipelines, or beneficial owners.

For that reason, refusal drills should recur at least annually for every essential category and after any material change in supplier concentration, strategic-floor status, treaty dependency, PBM structure, grid/logistics control, or lobbying exposure. Results should feed the [Parameter Calibration Register](./Parameter_Calibration_Register.md) and the Phase 8 gate in the [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md).
