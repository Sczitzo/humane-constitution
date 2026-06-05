# Capture Dashboard Specification

This specification defines the public indicators needed to see elite formation, institutional self-protection, and control-plane capture early.

It is not a surveillance mandate. It is a public accountability specification. Dashboards must use aggregation, small-cell suppression, delay, and privacy-preserving methods consistent with Article VII.

---

## Dashboard Principles

1. Measure power, not personal worth.
2. Track institutions and role pools, not ordinary people.
3. Publish methods and thresholds.
4. Count abandonment and delay as failures.
5. Show concentration over time, not only current composition.
6. Separate operating offices from reporting offices.
7. Treat dashboard gaming as a reportable capture signal.

---

## Domains And Metrics

### 1. Civic Role Concentration

| Metric | Purpose | Failure signal |
|---|---|---|
| Sector share of Service Record-governed roles | Detect dominance by one contribution sector. | One sector stays near cap across cycles or cap is evaded by relabeling. |
| Institutional-origin share | Detect school, employer, NGO, party, platform, or agency pipelines. | Same origin cluster repeats across offices. |
| Repeat-role frequency | Detect rotating seats that do not actually rotate. | Same people or close associates return repeatedly. |
| Reviewer/reviewed overlap | Detect guild review. | Reviewers frequently assess people from their own category or network. |
| Care/informal-work representation | Detect exclusion of less legible service. | Care, mutual aid, rural, disability, spiritual, and informal work remain underrepresented. |

### 2. Ombuds And Review-Body Independence

| Metric | Purpose | Failure signal |
|---|---|---|
| Voting-pattern concentration | Detect coordinated blocs. | Persistent unanimity or stable faction alignment without public reasons. |
| Staffing overlap | Detect shared professional pipelines. | Sub-Ombuds draw from the same institutions. |
| Funding dependence | Detect financial leverage over auditors. | One funder or budget authority can pressure multiple nodes. |
| Dissent publication rate | Detect suppressed disagreement. | Complex cases show no dissent or dissent lacks substance. |
| Reversal and correction rate | Detect rubber-stamp review. | Appeals almost never change outcomes. |

### 3. Definition And Standards Capture

| Metric | Purpose | Failure signal |
|---|---|---|
| Protected-term change attempts | Detect semantic pressure. | Repeated narrowing of survival, contribution, scarcity, or capacity. |
| Standards-body overlap | Detect methodological monoculture. | Same experts define measurement across formally independent bodies. |
| Worked-example impact | Detect quiet outcome changes. | Examples change practical access while words stay constant. |
| Ambiguity default usage | Detect strategic ambiguity. | Ambiguity frequently benefits the same office, sector, or class. |

### 4. Money, Procurement, And Legal Wrapper Capture

| Metric | Purpose | Failure signal |
|---|---|---|
| Beneficial-ownership concentration | Detect shell and trust control. | Natural-person control clusters behind many entities. |
| Project escrow rollover rate | Detect pseudo-permanent exemption. | Escrows repeatedly extend without delivery. |
| Commons Return burden by source base | Detect hidden ordinary-life tax or source-base gaming. | Ordinary households pay more relative burden than concentrated control of land value, concessions, monopoly rents, or extraction rights. |
| Procurement award concentration | Detect favored vendors. | Awards cluster among connected entities. |
| Subcontractor opacity | Detect control hidden below prime contractors. | Beneficial owners unresolved below second tier. |
| Essential-sector refusal exposure | Detect survival leverage by oil, energy, medicine, logistics, or medicine-access intermediaries. | Largest-supplier exit can break a CSM category before reserve or fallback capacity is ready. |
| Lobbying/capture exposure by contract value | Detect rule-shaping around essential public contracts. | Contract recipients fund lobbying, trade associations, standards bodies, foundations, or revolving-door pipelines tied to the regulated category without public disclosure. |

### 5. Identity And Access Gatekeeping

| Metric | Purpose | Failure signal |
|---|---|---|
| False exclusion by vulnerable group | Detect survival gatekeeping. | Displaced, disabled, elderly, undocumented, or digitally fragile users fail more often. |
| Recovery time | Detect practical exclusion. | Recovery exceeds published limits. |
| Staff-discretion concentration | Detect office-level gatekeeping. | A few offices account for high denial or delay rates. |
| Abandonment rate | Detect hidden paperwork exclusion. | Users leave before decision. |

### 6. Implementation Drift

| Metric | Purpose | Failure signal |
|---|---|---|
| Drift-chain channel divergence | Detect publication split. | Channels disagree or stale heads persist. |
| Startup refusal events | Detect protected-state mismatch. | Refusal events are hidden, ignored, or waived. |
| Operator pinned-reference age | Detect stale operators. | Operators lag beyond the compliance window. |
| Binary hash publication | Detect supply-chain opacity. | Operators do not publish deployed hashes. |
| Non-compliant implementation exceptions | Detect normalization of bypass. | Exceptions repeat or become permanent. |

---

## Required Public Outputs

| Output | Cadence | Minimum content |
|---|---|---|
| Capture dashboard | Quarterly | Metrics above, methods, thresholds, suppression rules, trend lines. |
| Integrity exception report | Event-triggered | What failed, who is affected, immediate containment, next review date. |
| Annual capture audit | Annual | Cross-domain patterns, dashboard gaming, recommended patch changes. |
| Ordinary-reader summary | Quarterly | Plain-language explanation of what looks healthy and what does not. |

---

## Dashboard Abuse Controls

Dashboards can become tools of capture. Therefore:

- no dashboard may publish small-cell identity data;
- dashboards may not rank ordinary persons;
- delayed publication is allowed where live data would help adversaries;
- raw data access requires independent authorization;
- methodology changes must be logged and challengeable;
- failure to publish is itself a reportable Article VII failure.

---

## Minimum Evidence Before Stronger Claim

This dashboard operates within the Evidence Ladder framework (see `Evidence_Ladder.md`). The following Evidence Ladder levels govern what claims the dashboard may publish:

| Dashboard action | Minimum Evidence Ladder level required |
|---|---|
| Publish metric readings and trend lines | Level 3 — Designed mechanism (dashboard exists and methodology is published) |
| Flag a domain as "elevated concern" or "watch" | Level 4 — Adversarial paper test (an independent reviewer has tested the metric against the known failure modes in the Abuse Case Library) |
| Flag a domain as "active capture signal" | Level 5 — Simulation or controlled test (the metric has been tested against a simulated capture scenario and detected the signal) |
| Publish a formal finding of systemic capture | Level 7 — Independent audit (an independent audit has confirmed the finding using the Claims and Evidence Register standard) |
| Claim a domain is "healthy" or "controlled" | Level 6 — Limited pilot evidence (at least one pilot round has produced data showing the metric behaved as designed under live conditions) |

**Escalation rule:** The dashboard office may not upgrade a domain's claim level without publishing the evidence that supports the upgrade, cross-referenced against the Evidence Ladder. Downgrades (moving from a stronger to a weaker claim) do not require new evidence — they should happen automatically when prior evidence is superseded or found insufficient.

**Absence-of-evidence rule:** If a domain cannot currently be assessed at Level 3 or above, the dashboard must publish this explicitly rather than omitting the domain. An unpublished domain is not a clean domain.

---

---

## Threshold Anchors

A dashboard without published thresholds is decorative. The failure-signal column in each domain describes qualitative patterns; this section gives starting numeric anchors for when each pattern rises to a formal watch or active-capture-signal finding. Anchors are Tier 3 parameters and may be revised by standard FAP process. They must be published before any capture dashboard round is run.

| Domain | Metric | Watch threshold | Active-capture-signal threshold |
|---|---|---|---|
| Civic Role Concentration | Sector share of Service Record-governed roles | >20% (aligned with FC-060) | >30% or any sector evading cap through relabeling for 2+ review cycles |
| Civic Role Concentration | Institutional-origin share | >35% from a single origin cluster in any governing pool | >50% from a single origin cluster |
| Civic Role Concentration | Repeat-role frequency | Same person holds 3+ service-record-governed roles in any rolling 24-month window | Same person holds 2+ simultaneous governing roles with overlapping authority |
| Ombuds & Review-Body Independence | Voting-pattern unanimity on contested cases | >80% unanimity rate over 12 consecutive months | >95% unanimity rate over 6 consecutive months |
| Ombuds & Review-Body Independence | Staffing overlap (shared institutional origin) | >40% of sub-Ombuds nodes share a common employer, funder, or professional school cohort | >60% share common institutional origin |
| Ombuds & Review-Body Independence | Reversal and correction rate | <5% of appeals change outcomes across 100+ cases | <2% reversal rate across 100+ cases |
| Money, Procurement & Legal Wrapper | Procurement award concentration | >30% of essential-category spend to a single vendor or controlled group (aligned with FC-198) | >40% concentration or mandatory remediation threshold breached for 2 consecutive review periods |
| Money, Procurement & Legal Wrapper | Beneficial-ownership concentration | Any natural person controls >5% of regional essential throughput across all entities | >10% concentration or sustained breach above 5% for 2+ review periods |
| Money, Procurement & Legal Wrapper | Project escrow rollover rate | >20% of active escrows renew without milestone delivery for 2+ consecutive terms | >35% rollover rate or any escrow renews more than 3 times without delivery |
| Identity & Access Gatekeeping | False exclusion rate by vulnerable group | False-exclusion rate for a tracked group exceeds 2× the overall population rate | 3× or greater disparity persisting across 2 consecutive measurement periods |
| Identity & Access Gatekeeping | Abandonment rate | >15% of initiated recovery proceedings abandoned before decision | >25% abandonment rate or systematic abandonment in a specific office or region |
| Implementation Drift | Operator pinned-reference age | Any operator lag exceeds the published compliance window | 10%+ of operators exceed the compliance window or any operator exceeds 2× the window |

**How thresholds are used:** Crossing a Watch threshold requires the dashboard office to flag the domain in the quarterly report with a written explanation. Crossing an Active-capture-signal threshold requires: (a) a published finding within 14 days, (b) automatic referral to the Federated Ombuds for review, and (c) notation in the Evidence Ladder Claims and Evidence Register.

**Threshold gaming rule:** Any pattern of metrics staying systematically just below a threshold — particularly across multiple domains simultaneously — is itself a reportable finding. The dashboard office must assess gaming suspicion as a standalone signal each quarter and publish its assessment. A gaming suspicion finding may escalate directly to Active-capture-signal without requiring any individual metric to cross its own threshold.

**Annual calibration:** Threshold anchors are reviewed annually against pilot data and adjusted if they are causing either false-positive churn or systematic under-detection. Calibration changes require FAP approval and must be published with a comparison to the prior values and a plain-language explanation of why the change was made.

---

## Residual Risk

Capture dashboards can create a false sense of control. A sophisticated class can stay below thresholds, split labels, use informal networks, or pressure the dashboard office. The dashboard is an early-warning system, not proof that capture is solved.
