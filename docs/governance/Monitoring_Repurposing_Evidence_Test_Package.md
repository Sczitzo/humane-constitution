# Monitoring Repurposing Evidence Test Package

**Status:** Active — unproven  
**Patch:** P-069  
**Threat:** T-032 — Monitoring Repurposing and Enforcement-Observation Failure  
**Primary abuse case:** ACL-017 — Monitoring Repurposing  
**Primary question:** Can the system enforce non-convertibility, fraud control, delivery sufficiency, capacity measurement, and capture detection without turning the required monitoring into a general-purpose surveillance or coercion layer?

**Administrative companion:** [Monitoring Administrative Safety Packet](./Monitoring_Administrative_Safety_Packet.md). This package tests whether monitoring can resist repurposing; the administrative packet defines the pre-operation gates, register fields, data lanes, raw-access limits, flag lifecycle, emergency limits, vendor controls, and public-comprehension artifacts that must exist before a monitoring stream operates.

---

## Plain-Language Purpose

The project needs some monitoring. Without it, brokers can convert Essential Access into money, providers can hide refusal, officials can fake delivery, dashboards can be gamed, and fraud controls can be blind.

But monitoring has its own danger. The same data that helps protect the floor can be reused to track, rank, punish, pressure, profile, or exclude people. A system can say "we do not surveil people" while slowly building the tools to do exactly that.

This package tests that danger directly.

---

## Scope

This package applies to every monitoring surface used by the corpus:

- Essential Access redemption and delivery monitoring;
- Flow / Essential Access non-convertibility enforcement;
- identity, recovery, Tier 0, and last-resort access monitoring;
- Capture Dashboard metrics;
- capacity, oracle, Shared Storehouse, and scarcity dashboards;
- Service Record, Voice, attestation, and contribution misuse monitoring;
- essential-sector refusal, procurement, provider settlement, and CASP monitoring;
- implementation drift, key custody, cyber availability, and public-status monitoring.

It does not ban monitoring. It requires proof that monitoring is bounded by purpose, minimized by design, separated by office, reviewable by affected persons, and technically or procedurally hard to repurpose.

---

## Baseline Rule

Monitoring is constitutional only when it satisfies all six conditions:

1. **Purpose-bound:** the data is collected for a named control and cannot be reused for another purpose without explicit review.
2. **Minimum necessary:** the monitoring uses the least personal, least durable, least linkable data that can do the job.
3. **Aggregation-first:** population, route, office, provider, and category metrics are preferred over individual tracking.
4. **Office-separated:** the body that operates a service may not be the sole body that interprets its monitoring performance.
5. **Appealable:** any person affected by an individual-level flag receives notice, plain-language reasons, and a path to human review.
6. **Deletion-bound:** raw monitoring data expires or is transformed into non-identifying aggregate records on a published schedule.

If a monitoring tool cannot satisfy these conditions, the tool must be redesigned, narrowed, or explicitly recorded as a residual risk before it is used.

---

## Required Monitoring Inventory

Before any pilot or deployment claims monitoring is safe, the project must publish a Monitoring Purpose Register.

The register is governed by the [Monitoring Administrative Safety Packet](./Monitoring_Administrative_Safety_Packet.md). A stream that lacks the packet's pre-operation gate, lane assignment, raw-access rule, retention clock, appeal path, independent reviewer, and forbidden-use list is not merely incomplete; it is non-operative.

For each monitoring stream:

| Field | Required content |
|---|---|
| Stream name | Plain-language name of the data or signal |
| Control purpose | Which threat, patch, annex, or dashboard metric it supports |
| Data collected | Exact fields, source, frequency, and retention |
| Personal linkability | Whether the stream can identify, re-identify, track, or infer a person |
| Reuse prohibition | Which secondary uses are forbidden |
| Access roles | Who can see raw data, aggregates, alerts, and exceptions |
| Appeal path | How an affected person challenges a flag or adverse use |
| Deletion / aggregation rule | When raw data expires or becomes non-identifying |
| Independent reviewer | Who verifies compliance outside the operating office |

---

## Minimum Test Design

### 1. Purpose-Creep Red Team

Reviewers attempt to reuse a monitoring stream for a purpose adjacent to, but outside, its approved use.

Examples:

- use redemption anomaly data to identify undocumented persons;
- use Tier 0 access patterns to infer residence, religion, disability, or domestic situation;
- use Service Record monitoring to screen workers, renters, students, or vendors;
- use provider-settlement data to retaliate against dissenting clinics or suppliers;
- use dashboard exceptions to build a list of "risky" neighborhoods or households;
- use cyber incident logs to justify broader identity controls.

### 2. Linkability And Re-Identification Test

Reviewers test whether supposedly aggregated, delayed, or anonymized data can be recombined to identify people, households, providers, access routes, whistleblowers, or vulnerable cohorts.

The test must include:

- small-cell leakage;
- time-and-location linkage;
- repeated route fingerprinting;
- cross-dashboard joins;
- device, token, account, or provider metadata;
- insider access to raw exception records.

### 3. Office-Separation Drill

The pilot must prove that the office operating a service cannot quietly grade its own performance.

The drill tests:

- whether operators can suppress adverse monitoring results;
- whether dashboard methods can be changed without public record;
- whether an independent reviewer can access enough information to verify the claim;
- whether an affected person can challenge a flag without appealing to the same office that created it.

### 4. Individual-Flag Appeal Drill

Any monitoring system that can produce an individual-level flag must be tested with real or simulated adverse cases.

The drill measures:

- notice clarity;
- time to human review;
- whether adverse action pauses or remains reversible during appeal;
- correction of erroneous data;
- whether staff treat a flag as suspicion rather than proof;
- whether vulnerable users can complete the appeal without legal or technical expertise.

### 5. Data-Minimization And Retention Audit

Reviewers inspect whether each monitoring stream collects more data than needed, keeps it too long, or stores raw fields when aggregate or salted, unlinkable forms would suffice.

The audit must identify:

- fields to remove;
- retention periods to shorten;
- raw streams that can become aggregates;
- joins that must be technically blocked;
- access roles that are too broad.

### 6. Coercive-Use Scenario

Reviewers simulate a hostile successor government, captured office, abusive official, funder, provider, employer, landlord, law-enforcement body, immigration authority, or sector incumbent trying to use monitoring data for coercion.

The test fails if the actor can obtain, infer, or pressure access to data that lets them punish, rank, locate, identify, exclude, or threaten protected persons.

### 7. Administrative Expansion Drill

Reviewers simulate an administrator trying to expand a stream without calling it a new use.

The drill tests whether the administrator can:

- add a field without necessity review;
- extend retention without public record;
- move a stream into a higher data lane without written finding;
- preserve cleared flags as hidden suspicion;
- join datasets across dashboards;
- change a dashboard method while keeping the public metric name;
- add a vendor, contractor, model, or data warehouse without the required contract terms;
- relabel the same stream under a broader purpose.

The test fails if any expansion can operate before the Monitoring Purpose Register row is amended, independently reviewed, and published at the appropriate level of detail.

### 8. Lawful-Pressure Scenario

Reviewers simulate a subpoena, immigration request, policing request, national-security request, funder demand, provider demand, civil-litigation request, insurer request, employer request, landlord request, school request, or vendor demand for raw monitoring data.

The test fails if pressure can obtain person-linkable or cohort-linkable data outside the registered purpose, without independent review, without notice where notice is safe and legally possible, or without a public residual-risk record.

---

## Required Metrics

| Metric | Required reporting |
|---|---|
| Monitoring streams inventoried | count and coverage by control purpose |
| Personal-linkability rating | none / low / medium / high for each stream |
| Reuse attempts blocked | by purpose-creep scenario |
| Re-identification success | whether reviewers can identify persons, routes, households, providers, or cohorts |
| Small-cell leakage | number and severity of leakage findings |
| Raw-data access roles | count by office and reviewer |
| Retention breaches | streams exceeding published retention or deletion rules |
| Individual-flag appeals | notice time, review time, reversal rate, abandonment rate |
| Office-separation failures | cases where operator and reporter are not meaningfully independent |
| Coercive-use exposure | whether hostile actors can use monitoring data for punishment, ranking, location, exclusion, or pressure |
| Administrative expansion attempts | field additions, retention extensions, lane escalations, joins, method changes, vendor additions, and purpose relabeling blocked or approved |
| Lawful-pressure exposure | whether legal, funder, provider, employer, landlord, school, insurer, policing, immigration, or vendor pressure can obtain raw or linkable data outside purpose |

---

## Failure Criteria

The monitoring design fails if any of the following occurs:

- a monitoring stream has no named purpose, owner, retention rule, or independent reviewer;
- raw data can be reused for a materially different purpose without explicit review;
- aggregated or anonymized outputs can identify protected persons or vulnerable cohorts;
- the operating office can suppress, relabel, or grade its own monitoring result without independent review;
- an individual-level flag produces adverse action without notice and appeal;
- monitoring records are kept longer than needed or joined across domains without a published legal basis;
- a hostile or captured actor can use monitoring data to locate, punish, rank, exclude, threaten, or pressure a person or community;
- an administrator can expand fields, retention, access roles, data lanes, dashboard methods, vendors, joins, or purposes without triggering independent review;
- lawful or contractual pressure can obtain raw, person-linkable, route-linkable, whistleblower-linkable, or vulnerable-cohort data outside the registered purpose;
- public claims say monitoring is safe without a passed purpose-creep, linkability, office-separation, appeal, retention, and coercive-use test.

---

## Evidence Standard

Before the corpus may claim that enforcement monitoring is bounded and non-surveillant:

1. the Monitoring Purpose Register must exist;
2. every monitoring stream must have a purpose, retention rule, access role, independent reviewer, and appeal path;
3. the purpose-creep red team must fail to repurpose streams outside approved use;
4. the linkability test must show that public and reviewer-facing outputs do not identify protected persons or vulnerable cohorts;
5. the office-separation drill must prove operating offices cannot mark themselves clean;
6. the individual-flag appeal drill must pass notice, review, reversibility, and correction tests;
7. the coercive-use scenario must fail to produce usable punishment, ranking, location, exclusion, or pressure data.
8. the administrative expansion drill must prove changes to fields, retention, lanes, joins, methods, vendors, and purposes cannot operate quietly;
9. the lawful-pressure scenario must prove external pressure cannot obtain raw or linkable data outside the registered purpose without review and public residual-risk handling.

Until then, the honest claim is:

> The corpus requires monitoring to enforce its protections, but it has not yet proven that monitoring cannot be repurposed into surveillance or coercive control.

---

## Residual Risk

Monitoring always creates power. The design can narrow that power, split it across offices, aggregate it, delete it, audit it, and let people challenge it. It cannot make monitoring morally neutral.

The project should prefer underpowered monitoring with honest residual risk over a perfect-looking dashboard that quietly teaches the system how to watch everyone.
