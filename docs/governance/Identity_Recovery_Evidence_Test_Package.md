# Identity and Recovery Evidence Test Package

This package defines what must be true before the project can make strong claims about identity, recovery, and access continuity.

Identity is a load-bearing precondition. Essential Access, Voice, Service Record, exit rights, consent records, and anti-fraud enforcement all depend on knowing whether a person is a unique living person and whether they are continuous with an earlier record. But identity controls can also become surveillance, exclusion, family coercion, bureaucratic discretion, or quiet denial of survival access.

Current status: **unresolved prerequisite, designed direction, needs evidence**.

See also: [Claims and Evidence Register](./Claims_Evidence_Register.md), [External Evidence Register](./External_Evidence_Register.md), [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md), [Threat Resolution Matrix](./Threat_Resolution_Matrix.md), [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md), [Patch Log P-003/P-016](./Patch_Log.md), [Annex P](../annexes/ANNEX_P.md), and [Annex AK](../annexes/ANNEX_AK.md).

---

## Honest Claim Boundary

The project may currently claim:

> The identity architecture rejects a single master credential, preserves the survival floor during disputes, and requires quantified fraud/exclusion trade-offs before scale-up.

The project may not yet claim:

- the identity stack is proven;
- fraud controls will not exclude vulnerable people;
- recovery works for displaced, undocumented, disabled, elderly, digitally fragile, coerced, trafficked, or abused people;
- privacy-preserving credentials are sufficient by themselves;
- biometric, device, community, or document evidence can safely dominate the stack;
- staff discretion is controlled in practice;
- the survival floor cannot be interrupted by administrative failure.

Evidence-backed claims require the tests below plus a residual-risk update.

---

## Source Base

| Source | What it supports | What it does not prove |
|---|---|---|
| [NIST SP 800-63-4 Digital Identity Guidelines](https://pages.nist.gov/800-63-4/) | Identity systems need risk management, assurance levels, fraud controls, privacy, customer experience, and continuous evaluation. | It does not prove a survival-floor identity system can be both fraud-resistant and non-exclusionary. |
| [World Bank ID4D Practitioner's Guide](https://id4d.worldbank.org/guide) | Foundational ID systems need inclusion, accessibility, privacy, institutional accountability, and risk assessment. | It does not supply this project's fraud/exclusion thresholds or recovery doctrine. |
| [Principles on Identification for Sustainable Development](https://id4d.worldbank.org/guide/1-principles) | ID systems should pursue universal coverage, accessibility, privacy, user rights, accountability, and grievance mechanisms. | Principles are not evidence that any implementation protects vulnerable users. |
| [World Bank ID4D exclusion-risk guidance](https://id4d.worldbank.org/guide/assess-risks) | ID systems can exclude poor, rural, elderly, disabled, displaced, refugee, stateless, digitally fragile, and other vulnerable groups if barriers are not designed around. | It does not prove which local groups will fail or what threshold is acceptable. |
| [World Bank ID4D privacy and security guidance](https://id4d.worldbank.org/guide/privacy-security) | Privacy-by-design, data minimization, separation, tokenization, federation, and compartmentalization are real design disciplines. | It does not prove this project can enforce them against hostile administrators. |
| [UNHCR registration and identity management guidance](https://www.unhcr.org/registration-guidance/chapter3/access-to-registration/) | Registration for displaced people must be accessible, non-arbitrary, and attentive to barriers. | Refugee registration doctrine does not solve ordinary civic identity, fraud, or long-term recovery. |
| [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/news/2025/the-verifiable-credentials-2-0-family-of-specifications-is-now-a-w3c-recommendation/) | Cryptographically verifiable, privacy-respecting credentials are a mature technical design space. | Verifiable credentials do not by themselves solve enrollment, coercion, device loss, issuer capture, or exclusion. |

---

## Abuse Model

Assume every identity mechanism will be attacked from both sides: by people seeking extra access and by institutions seeking easier denial.

| Actor | Likely attack or failure route | What the test must expose |
|---|---|---|
| Fraud ring | Synthetic identities, duplicate enrollments, rented identities, proxy redemption, stolen recovery credentials. | Whether fraud is caught without turning all users into surveillance subjects. |
| Insider operator | Approves friends, sells recovery, suppresses appeals, or flags inconvenient users as suspicious. | Whether staff discretion is bounded, logged, rotated, and appealable. |
| Abusive household member | Controls devices, documents, biometrics, appointments, transport, or recovery contact channels. | Whether recovery can happen without evidence controlled by the abuser. |
| Employer, landlord, sponsor, or institution | Uses dependency to force identity sharing, credential custody, or false attestations. | Whether coercive third-party control is detectable and reversible. |
| Hostile administrator | Tightens identity rules after fraud panic to reduce caseload, exclude disliked groups, or punish dissent. | Whether Annex AK thresholds bind under political pressure. |
| Vendor or platform | Optimizes for low fraud metrics while hiding abandonment, inaccessible UX, or biased failure. | Whether exclusion is measured outside successful enrollment data. |
| Data broker or attacker | Links identifiers, service traces, biometrics, and recovery events into a behavioral dossier. | Whether compartmentalization and minimization survive realistic data-access pressure. |
| Well-meaning bureaucracy | Adds forms, proof categories, case reviews, and escalation steps until recovery becomes unusable. | Whether ordinary people can recover access fast enough without expert help. |

---

## Required Models

### 1. Fraud and Duplicate-Identity Model

**Question:** Can the system prevent scalable duplicate personhood without making every ordinary user continuously legible?

Minimum scenarios:

- duplicate enrollment by one person;
- synthetic identity with partial real evidence;
- takeover of a real person's record;
- rented identity;
- family proxy use;
- staff-assisted fraud;
- cross-region duplicate enrollment;
- post-disaster mass re-enrollment.

Required outputs:

- false acceptance rate by assurance tier;
- confirmed fraud rate by instrument tier;
- suspected-but-unconfirmed fraud trend;
- detection latency;
- investigation burden;
- false-positive burden;
- data used per detection event;
- whether detection requires generalized behavioral monitoring.

Failure criteria:

- fraud is only detectable through broad activity surveillance;
- staff-assisted fraud is not separately measurable;
- duplicate detection works only for well-documented users;
- false positives interrupt the Constitutional Survival Minimum;
- suspected fraud data is treated as confirmed fraud in public dashboards;
- fraud prevention creates a permanent unified behavioral graph.

### 2. False-Exclusion and Abandonment Model

**Question:** Who fails to enroll or recover, and is failure hidden because only successful users are counted?

Minimum segmentation:

- displaced people;
- undocumented people;
- stateless people;
- elderly people;
- disabled people;
- digitally fragile people;
- people without smartphone or reliable internet;
- people with low literacy;
- rural or remote users;
- guardianship and dependent cases;
- coercive-control and trafficking contexts;
- people with name, gender, family, or document inconsistencies.

Required outputs:

- enrollment success rate;
- abandonment rate;
- reason for abandonment;
- time to first decision;
- appeal completion rate;
- staff-discretion points;
- required travel/time/cost;
- language and accessibility failures;
- denial reason distribution;
- survival-floor continuity during unresolved status.

Failure criteria:

- vulnerable groups fail at materially higher rates than ordinary users;
- abandonment is not counted as exclusion;
- users must pay, travel repeatedly, own a smartphone, or expose unnecessary data to obtain survival access;
- identity uncertainty reduces the CSM floor rather than only higher-consequence privileges;
- staff discretion becomes the real eligibility rule;
- denial reasons are too vague to appeal.

### 3. Recovery and Continuity Model

**Question:** Can a real person recover after device loss, document loss, displacement, disaster, abuse, incapacity, or data error?

Minimum scenarios:

- lost phone and no backup device;
- stolen credentials;
- abusive partner controls documents;
- elder loses memory or physical access;
- disabled person cannot use default interface;
- person flees domestic violence, trafficking, or institutional abuse;
- disaster destroys documents and local records;
- refugee or displaced person lacks recognized state documents;
- conflicting records across regions;
- legal name or gender marker change;
- death, birth, guardianship, and dependent coverage transition.

Required outputs:

- time to provisional restoration;
- time to full restoration;
- CSM continuity during recovery;
- number of required interactions;
- independent corroboration options;
- unsafe evidence avoided;
- appeal path completion;
- data exposure during recovery;
- post-recovery correction of harmful flags.

Failure criteria:

- recovery requires contacting an abuser, employer, landlord, sponsor, or hostile institution;
- survival access is interrupted while recovery is pending;
- recovery depends on a single device, biometric, document, or authority;
- unresolved flags remain visible to unrelated service providers;
- people cannot understand what evidence is required;
- recovery is technically possible but too slow for food, shelter, medicine, or safety.

### 4. Privacy and Data-Minimization Model

**Question:** Does the identity stack prove what is needed without building a lifelong surveillance dossier?

Required tests:

- data inventory by evidence type;
- purpose-limitation map;
- retention schedule;
- identifier-compartment test;
- sector-tokenization test;
- breach-impact simulation;
- insider-query audit;
- selective-disclosure test;
- zero-knowledge or attribute-proof feasibility where useful;
- behavioral-linkage red team.

Failure criteria:

- service use is routinely linkable across survival, market, civic, health, housing, and recovery contexts;
- identity verification and activity monitoring fuse into a single graph;
- recovery events expose sensitive histories to ordinary providers;
- data minimization is described but not measurable;
- breach impact would reveal enough to coerce, profile, or politically target users;
- privacy controls depend mainly on trust in administrators.

### 5. Coercion and Delegation Model

**Question:** Can identity be protected when a powerful person or institution controls the user's practical life?

Minimum scenarios:

- family member controls phone, documents, or appointments;
- employer or sponsor holds documents;
- landlord conditions housing on credential access;
- institution manages identity for residents;
- caregiver acts for dependent adult;
- parent or guardian acts for child;
- trafficker or abusive partner monitors communications;
- community witness system is captured by local power holders.

Required outputs:

- coercion detection channels;
- safe alternate contact path;
- protected interview availability;
- emergency manual access;
- independent advocate access;
- custody-of-credential incidents;
- delegation audit trail;
- reversal speed when coercion is found.

Failure criteria:

- delegation becomes ownership;
- credential custody by third parties becomes normal;
- a user cannot safely report coercion;
- identity recovery forces disclosure to the coercive actor;
- community attestation systems reproduce local domination;
- guardianship rules erase the person's own standing when supported decision-making would suffice.

### 6. Governance Calibration Model

**Question:** Does Annex AK's Asymmetric Error Doctrine bind real decisions, or does politics override it?

Required tests:

- bind FC-140 through FC-150 from pilot evidence;
- publish fraud and exclusion rates with confidence intervals;
- audit abandonment and denied access separately;
- simulate a fraud panic;
- simulate an exclusion scandal;
- simulate simultaneous fraud and exclusion breaches;
- test recalibration panel independence;
- test Article VII dashboard comprehension.

Failure criteria:

- thresholds remain reserved at scale-up;
- a fraud incident causes emergency tightening outside Annex AK;
- exclusion data depends on self-reporting by excluded people who cannot access the system;
- vulnerable-category estimates are manipulated to make exclusion look lower;
- dashboards hide confidence intervals or denominator uncertainty;
- recalibration is controlled by identity-system operators.

---

## Calibration Rules

Identity parameters should not be set by political mood, vendor preference, or fear of headlines.

Minimum parameter set:

| Parameter | What it controls | Evidence needed before binding |
|---|---|---|
| FC-140 Essential Access fraud band | Maximum tolerated Essential Access identity fraud | Fraud simulation, staff-assisted fraud test, physical-supply impact model. |
| FC-141 Voice fraud band | Maximum tolerated civic agenda fraud | Duplicate civic activation and agenda-distortion simulation. |
| FC-142 Service Record fraud band | Maximum tolerated public-service eligibility fraud | Role-selection and contribution-verification red team. |
| FC-143 through FC-147 exclusion bands | Maximum tolerated exclusion by vulnerable group and overall population | Enrollment, abandonment, recovery, and appeals pilot by group. |
| FC-148 exclusion priority multiplier | When exclusion reduction must outrank fraud tightening | Joint fraud/exclusion trade-off simulation. |
| FC-149 fraud priority bound | When fraud reduction must outrank inclusion loosening | Supply-impact and civic-integrity model. |
| FC-150 simultaneous breach default | Default when fraud and exclusion both breach upper bounds | Public legitimacy review and independent panel recommendation. |

Calibration must satisfy all five constraints:

1. CSM access continues during identity uncertainty;
2. fraud controls are stronger for higher-consequence privileges;
3. vulnerable groups have separately visible failure rates;
4. recovery is possible without a single master credential;
5. identity verification does not become generalized surveillance.

---

## Test Sequence

### Stage 0 - Desk Evidence Review

Output: source memo separating technical identity standards, development/inclusion guidance, refugee registration lessons, privacy-preserving credential standards, and gaps.

Pass condition: the memo identifies what outside sources support and what they do not prove.

### Stage 1 - Synthetic Identity Attack Simulation

Output: duplicate, synthetic, takeover, rented-identity, and staff-assisted fraud scenarios across instrument tiers.

Pass condition: fraud controls identify scalable attacks without requiring broad behavioral surveillance.

### Stage 2 - Exclusion and Abandonment Pilot

Output: voluntary enrollment/recovery exercise with protected participants and independent advocates.

Pass condition: abandonment, denial, time cost, data exposure, and appeal outcomes are measured by vulnerable group.

### Stage 3 - Recovery Stress Drill

Output: device-loss, document-loss, disaster, abuse, incapacity, and displacement recovery drills.

Pass condition: provisional access is restored fast enough to preserve survival needs, and full restoration has recorded reasons and appeal rights.

### Stage 4 - Privacy and Coercion Red Team

Output: insider-query audit, data-linkage attack, coercive-control scenario, credential-custody scenario, and community-attestation capture test.

Pass condition: sensitive recovery and service-use data cannot be casually linked, and coerced users have safe alternate routes.

### Stage 5 - Annex AK Calibration Hearing

Output: public calibration package proposing FC-140 through FC-150, with confidence intervals, dissenting views, and plain-language explanation.

Pass condition: the public can see the trade-off, vulnerable groups can challenge it, and scale-up is blocked if the numbers remain reserved.

---

## Minimum Evidence Tables

The project should not move identity from **unresolved prerequisite** to **partly tested** until these tables exist.

| Table | Required columns |
|---|---|
| Fraud by tier | Instrument tier, fraud type, confirmed cases, suspected cases, detection method, false positives, investigation time. |
| Exclusion by group | Group, attempted enrollments, successful enrollments, abandonment, denials, denial reason, appeal outcome, confidence interval. |
| Recovery events | Scenario, provisional restoration time, full restoration time, CSM continuity, data exposed, unsafe evidence avoided, unresolved flags. |
| Staff discretion | Decision point, role, override authority, reason code, audit log, appeal availability, concentration by staff/team. |
| Privacy inventory | Data type, purpose, retention, compartment, who can query, breach harm, minimization alternative. |
| Coercion incidents | Coercion route, reporter, safe contact path, protective action, restoration time, repeat-risk control. |
| AED calibration | FC parameter, proposed value, evidence basis, uncertainty, dissent, review trigger, residual risk. |

---

## Decision Rule

Identity may support scale-up only if the tests show that it is:

- multi-evidence rather than single-credential;
- stronger at higher-consequence tiers;
- continuous for CSM during disputes;
- measurable for fraud and exclusion;
- recoverable after realistic life disruptions;
- usable by vulnerable groups;
- resistant to insider and family coercion;
- privacy-preserving by architecture, not promise;
- governed by bound Annex AK thresholds;
- understandable enough that denial and recovery can be appealed.

If those conditions fail, the project must pause scale-up, keep survival access provisional where necessary, revise Annex AK parameters, change enrollment/recovery procedures, or explicitly downgrade the claim from "identity architecture" to "unproven design candidate."

---

## Residual Risk Statement

Even if the tests pass, identity will remain a permanent danger surface. A humane identity system must fight fraud and protect access at the same time, and those goals will always conflict under stress. The correct goal is not perfect identity. The goal is a bounded, appealable, privacy-preserving system that makes fraud costly while making exclusion visible, reversible, and unable to interrupt the survival floor.

