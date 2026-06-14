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

## Minimization And Purpose-Limitation Doctrine (P-075)

This is the corpus's one master statement of data minimization and purpose limitation. Domain texts keep domain substance; this doctrine states the rule. It carries the six-condition baseline formerly stated in the [Monitoring Repurposing Evidence Test Package](./Monitoring_Repurposing_Evidence_Test_Package.md) — conditions verbatim, with two declared strengthenings: scope broadened from monitoring to any collection of data about persons, and conditions 5–6 bound to the appeal spine and the ANNEX_AM §AM7 stripping standard. That package now tests this doctrine rather than restating it.

Any collection of data about persons, households, providers, or support networks under this corpus is permitted only when all six conditions hold:

1. **Purpose-bound:** the data is collected for a named control and cannot be reused for another purpose without explicit review — published before reuse, by a reviewer independent of the operating office (for cross-domain joins, the Cross-Domain Linkage Rule below; otherwise [ANNEX_C](../annexes/ANNEX_C.md)'s secondary-use challenge standard).
2. **Minimum necessary:** the monitoring uses the least personal, least durable, least linkable data that can do the job.
3. **Aggregation-first:** population, route, office, provider, and category metrics are preferred over individual tracking.
4. **Office-separated:** the body that operates a service may not be the sole body that interprets its monitoring performance.
5. **Appealable:** any person affected by an individual-level flag receives notice, plain-language reasons, and a path to human review ([ANNEX_C](../annexes/ANNEX_C.md); appeal spine, [ANNEX_L §L7](../annexes/ANNEX_L.md)).
6. **Deletion-bound:** raw monitoring data expires or is transformed into non-identifying aggregate records on a published schedule. Where publication is involved, PII stripping follows the [ANNEX_AM §AM7](../annexes/ANNEX_AM.md) standard. The default retention spine is: identifiable data is deleted at appeal-window-close + 30 days, with a hard cap and no collection absent a published schedule; FC-211–FC-214 are the per-domain deviations from this spine (bypass-detection retains longest, vulnerable-person datasets least).

A tool that cannot satisfy these conditions must be redesigned, narrowed, or explicitly recorded as a residual risk before it is used.

---

## Per-Domain Calibration Table (P-075)

This table records each domain's actual current rule from live text. Where a domain is stricter than the doctrine, the stricter rule governs — calibration never averages a protection down. "Unspecified — gap" is an honest gap, not permission. A domain operating inside a gap cell is governed by the doctrine's defaults until the gap is closed: no published retention schedule means no collection of identifiable data, and unnamed reuse is forbidden. A gap cell may be cited only as a reason to close the gap, never as authority to act within it. Where no appeal is filed, the L7 appeal window is deemed closed for retention-clock purposes 30 days after constructive receipt of the adverse or closure notice ([ANNEX_L §L7.1](../annexes/ANNEX_L.md)); the L7.1 defective-notice extension tolls the re-opening of an appeal but does not suspend the retention clock, and a later-revived appeal triggers re-collection from the source rather than retention of the stripped record.

| Domain | Data | PII-stripping point | Retention | Access role | Purpose boundary |
|---|---|---|---|---|---|
| Monitoring streams generally (this packet) | Per-stream register field list | Set per register row; no global point — unspecified — gap pending register | "Deletion, aggregation, or unlinking schedule" per row; "No retention clock means no collection" | Per data lane (Lanes 0–4) and register row | Named control purpose; forbidden-use list; unnamed reuse forbidden by default |
| Bypass detection ([ANNEX_AJ](../annexes/ANNEX_AJ.md), P-004 protected) | Vendor-level and population-level bypass-pattern data | "PII-stripped at the earliest point consistent with detection (per Annex AM)" | "Retained only for the bounded period necessary to establish patterns and adjudicate findings and is then deleted"; Reserved (FC-211): finality + 90d; 180d open-build ceiling; 365d hard cap | Enforcement Panel and mandated detection staff (ANNEX_AJ) | Bypass-detection and AJ §4 enforcement only; "never repurposed for general population surveillance, civic scoring, eligibility determination, commercial use" (P-004-protected clause, quoted unmodified) |
| Hardship attestation graph ([ANNEX_AF §AF3](../annexes/ANNEX_AF.md)) | Support-network attestation graph | Inherently identifying in use; access narrowed to "only the subgraph relevant to the case under review"; Reserved (FC-212): case-pseudonym at intake; full purge at appeal-close + 30d (per AM7) | "Purged on a fixed retention schedule once a review and its appeal window have closed"; safe-harbor and innocent-explanation cases "purged at closure"; Reserved (FC-212): appeal-close + 30d; 180d ceiling | Reviewing bodies in active review only; access logged (ANNEX_AF §AF3) | Exploitation review only; no export, sale, or sharing (ANNEX_AF §AF3) |
| Tier-0 identity ([ANNEX_AK §AK8.1](../annexes/ANNEX_AK.md)) | Single-session pseudonymous token; allocation count | By construction: "No persistent identifier is created"; node records consumption "not by whom" | None beyond session; "infrastructure cannot reconstruct session linkage after the session closes" | Issuing node; Federated Ombuds aggregate-only after 30+ days of anomaly (ANNEX_AK §AK8.1) | Tier-0 allocation accounting; individual-level investigation prohibited (ANNEX_AK §AK8.1) |
| Commons Return assessment ([ANNEX_D §D6](../annexes/ANNEX_D.md)) | "Only the data needed to determine the named source base, protected ordinary use, and beneficial control" | Reserved (FC-213): at assessment finality (D6.5 records first) | Reserved (FC-213): appeal-close + 30d to strip; 18-month cap | Assessors; household-linkable escalation only via D6.5 independent finding | Named source-base determination; forbidden-reuse list (ANNEX_D §D6.1) |
| Monitored-person flags ([ANNEX_C](../annexes/ANNEX_C.md) + flag lifecycle above) | Anomaly, fraud, and coercion flags on identifiable people | Unspecified — gap | "Unresolved or cleared flags expire and cannot be reused"; Reserved (FC-214): resolution + 30d; 180d max age; 365d cap | Named human reviewer; Federated Ombuds escalation | Register-named control purpose; secondary use requires published review (ANNEX_C) |
| Capture Dashboard ([Capture Dashboard Specification](./Capture_Dashboard_Specification.md)) | Aggregate capture metrics from register-cited streams only | Before publication: "aggregation, small-cell suppression, delay, and privacy-preserving methods" | Per the cited register row | Dashboard office with no hidden raw-data access (this packet's dashboard rules); dashboard method auditor | Public accountability metrics only; every metric cites a register row before publication (Capture Dashboard Specification) |

---

## Cross-Domain Linkage Rule (P-075)

Joining two domains' data is never an operational decision. Before use, a join requires: (1) both domains' register rows (or domain-equivalent governing clauses) permit the join — silence forbids; (2) a written finding by an independent reviewer outside both operating offices that no less-intrusive method answers the named purpose (the [ANNEX_D §D6.5](../annexes/ANNEX_D.md) standard, generalized); (3) publication of the finding before use, challengeable under [ANNEX_C](../annexes/ANNEX_C.md)'s secondary-use challenge, with the challenged join paused unless an emergency finding — published by a reviewer independent of both operating offices — states why delay would create immediate CSM harm. An emergency finding expires after 30 days unless renewed by the same standard, and the underlying challenge is resolved on its merits regardless of the emergency; if the challenge succeeds, the join's products fall under the inadmissibility rule from that point. A join executed without these is void and its products are inadmissible in any adverse action. Inadmissibility attaches to the join's products, not to the underlying facts: evidence independently obtained through an authorized process is unaffected, and executing an unauthorized join is itself a sanctionable act that confers no immunity on anyone.

---

## Drift Rule (P-075)

This doctrine is the canonical home for data minimization and purpose limitation (P-073 canonical-home discipline); domains cite this standard and keep only domain-specific substance — their data, thresholds, reviewer, purpose boundary. The discipline's stricter-text exception is most load-bearing here, because a domain may always guard a person's data more tightly than the floor: notably ANNEX_AJ's P-004-protected purpose-limitation clause is recorded in the calibration table unmodified and never relaxed from here. Enforcement: a weaker domain data rule yields to the stricter, per the burden and appealability the discipline sets.

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
8. **Expiration:** unresolved or cleared flags expire and cannot be reused. A flag expires — irreversibly unlinked, not archived — at the earlier of resolution + 30 days or a 180-day max age, with a 365-day absolute cap (FC-214, RESERVED).

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
