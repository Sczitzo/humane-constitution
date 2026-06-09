# Monitoring Administrative Safety Packet

**Status:** Designed

This packet is not field evidence. It is an operating safety specification for any monitoring stream the corpus later pilots or deploys.

**Purpose:** Prevent protective monitoring from becoming a general-purpose surveillance, ranking, punishment, or administrative-control system.

**Governs with:** [Monitoring Repurposing Evidence Test Package](./Monitoring_Repurposing_Evidence_Test_Package.md), [Capture Dashboard Specification](./Capture_Dashboard_Specification.md), [ANNEX_C](../annexes/ANNEX_C.md), [ANNEX_D](../annexes/ANNEX_D.md), [ANNEX_X](../annexes/ANNEX_X.md), [Threat Register](./Threat_Register.md) T-032, and [Patch Log](./Patch_Log.md) P-069.

---

## Plain-Language Summary

The project needs some monitoring. It must know whether food reaches people, whether providers refuse essential service, whether public money is being misused, whether legal wrappers hide control, and whether dashboards are being gamed.

But monitoring creates power. A record built to protect someone can later be used to locate them, rank them, shame them, deny them housing, pressure their employer, expose their immigration risk, or punish a community.

This packet sets the operating rule:

> No monitoring stream may exist first and find its limits later.

Before a stream operates, the project must name exactly why it exists, what it collects, who can see it, when it dies, who can challenge it, and what uses are forbidden.

---

## Governing Rule

Monitoring is permitted only as a bounded protective instrument.

It is void if it becomes:

- a score of human worth;
- a civic eligibility shortcut;
- a housing, employment, credit, insurance, school, vendor, immigration, policing, or political-screening input;
- a permanent behavioral file;
- a hidden enforcement feed;
- a dashboard that exposes vulnerable people through small cells, timing, location, or repeated-route patterns;
- an operating-office self-certification tool without independent review.

The burden is on the monitoring sponsor to prove the stream is necessary, narrow, challengeable, and deletion-bound.

---

## Pre-Operation Gate

No monitoring stream may collect live data, issue a flag, feed a dashboard, support a quarantine, or trigger an adverse action until all seven gate items are complete.

| Gate | Required artifact | Failure rule |
|---|---|---|
| 1. Named purpose | Monitoring Purpose Register row | A stream without a named purpose is void. |
| 2. Minimum-data design | Field list with why each field is necessary | Any field without a necessity reason is removed. |
| 3. Lane assignment | Data lane, access roles, and raw-access rule | Raw access without lane assignment is prohibited. |
| 4. Retention clock | Deletion, aggregation, or irreversible unlinking schedule | No retention clock means no collection. |
| 5. Appeal path | Plain notice, helper right, reviewer, and maximum clock | Individual flags cannot operate without appeal. |
| 6. Independent reviewer | Reviewer outside the operating office | Self-certification is not enough. |
| 7. Forbidden-use list | Explicit secondary uses barred before operation | Unnamed reuse is forbidden by default. |

Emergency collection may not bypass this gate except under the narrow emergency rule in this packet.

---

## Monitoring Purpose Register

The Monitoring Purpose Register is the operating ledger for monitoring powers. It must be public in aggregate, inspectable by independent reviewers, and understandable to ordinary readers.

Each row must include:

| Field | Required content |
|---|---|
| Stream ID | Stable identifier that appears in dashboards, appeals, and audit reports |
| Plain-language name | What ordinary people would call the stream |
| Control purpose | The exact threat, patch, annex, metric, or evidence test it supports |
| Sponsor | Office asking for the stream |
| Operator | Office or vendor collecting or processing the stream |
| Independent reviewer | Office or body authorized to inspect the stream |
| Data fields | Exact fields, source, frequency, and format |
| Data lane | One of the lanes in this packet |
| Personal linkability | None, low, medium, or high, with reason |
| Small-cell risk | Whether small groups, places, routes, or vulnerable cohorts could be exposed |
| Raw-access rule | Who may see raw records and under what written finding |
| Retention clock | Deletion, aggregation, or unlinking schedule |
| Join limits | Which other streams may not be joined |
| Forbidden uses | Uses barred even if convenient |
| Flag effects | Whether a flag is advisory, review-triggering, or adverse-action capable |
| Notice and appeal | How affected people are told, helped, and reviewed |
| Public output | What aggregate information may be published |
| Evidence status | Designed, paper-tested, pilot-tested, failed, or suspended |

If the row is incomplete, the stream cannot operate.

---

## Data Lanes

Monitoring data must be assigned to the least powerful lane that can do the job.

| Lane | Use | Access rule | Public output |
|---|---|---|---|
| Lane 0 - Public aggregate | Counts, rates, trend lines, and published thresholds | Public | Published with small-cell suppression and delay |
| Lane 1 - Reviewer aggregate | Aggregate records with more detail for independent review | Independent reviewer and dashboard method auditor | Published only after suppression |
| Lane 2 - Entity review | Provider, office, contractor, sponsor, or institutional records | Purpose-bound reviewers with written need | Entity findings only after notice and response where feasible |
| Lane 3 - Individual flag | Person- or household-linkable flag | Human reviewer, appeal path, and least-harm interim status required | No public person-level output |
| Lane 4 - Sealed emergency | Temporary raw records during immediate CSM harm or security incident | Time-limited emergency reviewers only | Post-event public summary without identifying details |

Lane escalation requires a written finding that lower lanes cannot answer the control purpose. Convenience is not a reason to escalate.

---

## Raw-Access Rule

Raw data is the most dangerous monitoring form. It may be accessed only when all conditions are met:

1. the Monitoring Purpose Register row permits raw access;
2. the requested access matches the named purpose;
3. the requester states the exact fields needed;
4. an independent reviewer records why aggregate or entity-level data is insufficient;
5. access is time-limited;
6. access is logged;
7. the affected person receives notice if the access can support an individual adverse action, unless a short emergency delay is independently justified.

Raw data may not be copied into a general repository, training dataset, search index, permanent risk model, or cross-office file.

---

## Flag Lifecycle

A flag is not proof. It is a claim that must be handled carefully.

Every flag must move through this lifecycle:

1. **Signal:** a rule-defined pattern is detected.
2. **Triage:** a human or independent reviewer decides whether the signal is likely error, benign variance, abuse risk, or immediate harm.
3. **Notice:** if the flag can affect a person, household, provider, or protected ordinary use, the affected party receives a plain-language explanation.
4. **Least-harm interim status:** unresolved suspicion may not freeze Essential Access, ordinary household access, wage receipt, essential-provider continuity, protected ordinary use, or necessary care.
5. **Review:** the affected party may challenge the flag with a human reviewer and trusted helper.
6. **Decision:** the reviewer records the evidence, rule, remedy, and appeal result.
7. **Correction:** wrong data is corrected at the source and propagated to every dependent record.
8. **Expiration:** unresolved or cleared flags expire and cannot be reused.

Cleared flags may not become hidden suspicion. They cannot be used later for civic standing, housing, employment, lending, vendor access, provider exclusion, ranking, immigration action, policing, or unrelated enforcement.

---

## Appeal And Helper Rights

Any person affected by an individual-level flag, quarantine, assessment, source-base review, identity decision, delivery denial, provider refusal claim, or monitoring-derived adverse action has the right to:

- plain-language notice;
- the exact rule and evidence basis;
- oral explanation where needed;
- translation and offline access;
- a named human reviewer;
- a trusted helper, navigator, advocate, family member, faith-community support, or community representative;
- review before the same flag is treated as proof;
- correction of erroneous data;
- a written outcome;
- escalation to the relevant Ombuds path.

Appeal design must be tested with elderly, disabled, low-literacy, rural, undocumented, safety-shielded, caregiver, digitally fragile, and low-income users.

---

## Emergency Use

Emergency monitoring may occur only to prevent immediate CSM harm, preserve essential delivery, contain active fraud causing direct survival harm, or respond to a live security incident.

Emergency use is bounded by:

- shortest feasible duration;
- narrowest field set;
- no unrelated enforcement use;
- no public person-level output;
- independent after-action review;
- public post-mortem within the ordinary emergency-reporting window;
- deletion or irreversible aggregation after the emergency window closes.

Emergency monitoring may not become a standing feed. Renewal requires a new written finding and review.

---

## Dashboard Publication Limits

Dashboards exist to show institutional power and system health, not to expose ordinary people.

Dashboard publication must use:

- aggregation-first reporting;
- small-cell suppression;
- delay where live data would expose people or help adversaries;
- method publication;
- threshold publication;
- clear distinction between absence of evidence and clean status;
- no ranking of ordinary persons;
- no household, route, whistleblower, or vulnerable-cohort exposure;
- no hidden raw-data access by the dashboard office.

If a dashboard cannot publish a metric safely, it must publish the reason the metric is suppressed rather than silently omitting the domain.

---

## Vendor And Tool Controls

No vendor, contractor, model provider, analytics tool, fraud tool, identity service, payment processor, dashboard host, or data warehouse may receive monitoring data unless the contract includes:

- purpose limitation;
- no secondary use;
- no model training or product improvement from protected data without explicit public approval;
- no sale, brokerage, enrichment, or external matching;
- deletion and return obligations;
- audit access;
- breach notice;
- subcontractor disclosure;
- jurisdiction and remedy terms;
- no claim that vendor policy overrides corpus protections.

Vendor convenience cannot justify expanding monitoring powers.

---

## Public-Reader Promise

An ordinary person should be able to read the public version of the Monitoring Purpose Register and know:

- what is being watched;
- why it is being watched;
- whether people can be identified;
- who can see it;
- when it disappears;
- what uses are forbidden;
- how to challenge a flag;
- who reviews the office doing the watching.

If a reader cannot understand that, the monitoring design has failed its public-comprehension gate.

---

## Required Evidence Artifacts

Before the project may claim that monitoring is bounded and non-surveillant, it must produce:

1. complete Monitoring Purpose Register;
2. lane-assignment table for every stream;
3. raw-access log sample and review standard;
4. retention and deletion proof;
5. flag-lifecycle drill results;
6. cleared-flag reuse test;
7. small-cell and linkability test;
8. purpose-creep red-team report;
9. office-separation drill;
10. emergency-use after-action sample;
11. vendor contract standard;
12. public-comprehension test with ordinary readers.

Until those artifacts exist, the honest claim is:

> The corpus has designed administrative safety rules for monitoring, but it has not proven that monitoring can operate without surveillance or coercive reuse.

---

## Christ-Centered Dignity Test

This packet is a human-made guardrail. It does not baptize monitoring as righteous. It asks whether a necessary civil instrument remains subordinate to love of neighbor, care for the poor, truthful witness, and refusal to treat people as inventory.

For any monitoring stream, reviewers must ask:

- Does this protect the person in need, or make them legible for control?
- Does it expose the poor more than the powerful?
- Does it make the watched person able to answer, appeal, and be heard?
- Does it preserve mercy for error, disability, confusion, displacement, and hardship?
- Would the same rule restrain the powerful office that wants the data?

The fruit test is not a cleaner dashboard. The fruit test is whether people are fed, housed, healed, heard, and protected without being watched, ranked, priced, or managed as objects.

---

## Residual Risk

Monitoring always creates danger. The safest stream is the one never collected. When monitoring is necessary, it should be narrow, temporary, reviewable, and humble.

This packet reduces administrative danger. It does not eliminate it. If tests show that monitoring cannot protect people without building coercive infrastructure, the corpus must prefer less monitoring, slower enforcement, or redesigned protections over a system that sees everyone too well.
