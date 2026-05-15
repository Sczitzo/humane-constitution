# Identity and Recovery Evidence Test Package

This package defines what must be true before the project can make strong claims about identity, recovery, and access continuity.

Identity is a load-bearing precondition. Essential Access, Voice, Service Record, exit rights, consent records, and anti-fraud enforcement all depend on knowing whether a person is a unique living person and whether they are continuous with an earlier record. But identity controls can also become surveillance, exclusion, family coercion, bureaucratic discretion, or quiet denial of survival access.

Current status: **unresolved prerequisite, designed direction, needs evidence**.

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

**Minimum scenarios:**

- duplicate enrollment by one person;
- synthetic identity with partial real evidence;
- takeover of a real person's record;
- rented identity;
- family proxy use;
- staff-assisted fraud;
- cross-region duplicate enrollment;
- post-disaster mass re-enrollment.

**Required outputs:**

- false acceptance rate by assurance tier;
- confirmed fraud rate by instrument tier;
- suspected-but-unconfirmed fraud trend;
- detection latency;
- investigation burden;
- false-positive burden;
- data used per detection event;
- whether detection requires generalized behavioral monitoring.

**Failure criteria:**

- fraud is only detectable through broad activity surveillance;
- staff-assisted fraud is not separately measurable;
- duplicate detection works only for well-documented users;
- false positives interrupt the Constitutional Survival Minimum;
- suspected fraud data is treated as confirmed fraud in public dashboards;
- fraud prevention creates a permanent unified behavioral graph.

### 2. False-Exclusion and Abandonment Model

**Question:** Who fails to enroll or recover, and is failure hidden because only successful users are counted?

**Minimum segmentation:**

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

**Required outputs:**

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

**Failure criteria:**

- vulnerable groups fail at materially higher rates than ordinary users;
- abandonment is not counted as exclusion;
- users must pay, travel repeatedly, own a smartphone, or expose unnecessary data to obtain survival access;
- identity uncertainty reduces the CSM floor rather than only higher-consequence privileges;
- staff discretion becomes the real eligibility rule;
- denial reasons are too vague to appeal.

### 3. Recovery and Continuity Model

**Question:** Can a real person recover after device loss, document loss, displacement, disaster, abuse, incapacity, or data error?

**Minimum scenarios:**

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

**Required outputs:**

- time to provisional restoration;
- time to full restoration;
- CSM continuity during recovery;
- number of required interactions;
- independent corroboration options;
- unsafe evidence avoided;
- appeal path completion;
- data exposure during recovery;
- post-recovery correction of harmful flags.

**Failure criteria:**

- recovery requires contacting an abuser, employer, landlord, sponsor, or hostile institution;
- survival access is interrupted while recovery is pending;
- recovery depends on a single device, biometric, document, or authority;
- unresolved flags remain visible to unrelated service providers;
- people cannot understand what evidence is required;
- recovery is technically possible but too slow for food, shelter, medicine, or safety.

### 4. Privacy and Data-Minimization Model

**Question:** Does the identity stack prove what is needed without building a lifelong surveillance dossier?

**Required tests:**

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

**Failure criteria:**

- service use is routinely linkable across survival, market, civic, health, housing, and recovery contexts;
- identity verification and activity monitoring fuse into a single graph;
- recovery events expose sensitive histories to ordinary providers;
- data minimization is described but not measurable;
- breach impact would reveal enough to coerce, profile, or politically target users;
- privacy controls depend mainly on trust in administrators.

### 5. Coercion and Delegation Model

**Question:** Can identity be protected when a powerful person or institution controls the user's practical life?

**Minimum scenarios:**

- family member controls phone, documents, or appointments;
- employer or sponsor holds documents;
- landlord conditions housing on credential access;
- institution manages identity for residents;
- caregiver acts for dependent adult;
- parent or guardian acts for child;
- trafficker or abusive partner monitors communications;
- community witness system is captured by local power holders.

**Required outputs:**

- coercion detection channels;
- safe alternate contact path;
- protected interview availability;
- emergency manual access;
- independent advocate access;
- custody-of-credential incidents;
- delegation audit trail;
- reversal speed when coercion is found.

**Failure criteria:**

- delegation becomes ownership;
- credential custody by third parties becomes normal;
- a user cannot safely report coercion;
- identity recovery forces disclosure to the coercive actor;
- community attestation systems reproduce local domination;
- guardianship rules erase the person's own standing when supported decision-making would suffice.

### 6. Governance Calibration Model

**Question:** Does Annex AK's Asymmetric Error Doctrine bind real decisions, or does politics override it?

**Required tests:**

- bind FC-140 through FC-150 from pilot evidence;
- publish fraud and exclusion rates with confidence intervals;
- audit abandonment and denied access separately;
- simulate a fraud panic;
- simulate an exclusion scandal;
- simulate simultaneous fraud and exclusion breaches;
- test recalibration panel independence;
- test Article VII dashboard comprehension.

**Failure criteria:**

- thresholds remain reserved at scale-up;
- a fraud incident causes emergency tightening outside Annex AK;
- exclusion data depends on self-reporting by excluded people who cannot access the system;
- vulnerable-category estimates are manipulated to make exclusion look lower;
- dashboards hide confidence intervals or denominator uncertainty;
- recalibration is controlled by identity-system operators.

---

## Calibration Rules

Identity parameters should not be set by political mood, vendor preference, or fear of headlines.

**Minimum parameter set:**

| Parameter | What it controls | Evidence needed before binding |
|---|---|---|
| FC-140 Essential Access fraud band | Maximum tolerated Essential Access identity fraud | Fraud simulation, staff-assisted fraud test, physical-supply impact model. |
| FC-141 Voice fraud band | Maximum tolerated civic agenda fraud | Duplicate civic activation and agenda-distortion simulation. |
| FC-142 Service Record fraud band | Maximum tolerated public-service eligibility fraud | Role-selection and contribution-verification red team. |
| FC-143 through FC-147 exclusion bands | Maximum tolerated exclusion by vulnerable group and overall population | Enrollment, abandonment, recovery, and appeals pilot by group. |
| FC-148 exclusion priority multiplier | When exclusion reduction must outrank fraud tightening | Joint fraud/exclusion trade-off simulation. |
| FC-149 fraud priority bound | When fraud reduction must outrank inclusion loosening | Supply-impact and civic-integrity model. |
| FC-150 simultaneous breach default | Default when fraud and exclusion both breach upper bounds | Public legitimacy review and independent panel recommendation. |

**Calibration must satisfy all five constraints:**

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

## Failure Thresholds

This section defines specific numeric thresholds that constitute failure. These are not aspirational targets. They are ceilings: breach means the system has failed in a constitutional sense and must trigger the escalation path described below. Thresholds without empirical analogues are marked **precautionary — no field analogue**.

Auditors should treat any threshold left as "TBD" at scale-up as a governance failure in itself.

---

### T-1: False Exclusion Ceiling

**Threshold:** Fewer than 0.5% of Essential Access attempts denied per quarter due to identity verification failure, across the full eligible population including abandonment.

**Rationale:** Essential Access is the Constitutional Survival Minimum. A system that correctly identifies 99.5% of users still excludes thousands at population scale. The 0.5% ceiling is not lenient — it is chosen because lower thresholds are not achievable with current best-practice ID systems in low-documentation contexts (see: UNHCR registration data, World Bank ID4D exclusion audits). Anything above 0.5% at scale implies structural exclusion, not edge-case error. The ceiling applies to the full denominator including people who abandoned the enrollment or recovery process, not only people who completed it.

**Measurement:** Requires enrollment-attempt tracking from the moment of first contact, not from the moment of enrollment completion. Abandonment must be coded by point of exit and reason where ascertainable. Stage 2 pilot must produce this data disaggregated by vulnerable group. Confidence intervals required; point estimates alone do not pass.

**Evidence basis:** Precautionary — no field analogue in a survival-floor context. 0.5% is borrowed from NHS digital access failure rate targets and EU eIDAS high-assurance rejection benchmarks, neither of which concerns survival access. The value is conservatively tight because the consequence of false exclusion here is not inconvenience but denial of survival resources.

**Breach escalation:** Any quarter where measured false exclusion exceeds 0.5% triggers:
1. Immediate mandatory override to manual-human review pathway for all affected categories;
2. Public notification within 72 hours via Article VII dashboard;
3. Independent audit panel convened within 14 days;
4. Scale-up halt until two consecutive quarters show compliance;
5. Annex AK FC-143 through FC-147 recalibration hearing if the breach is in a vulnerable category.

---

### T-2: Recovery Delay Ceiling

**Threshold (tiered):**

| Recovery tier | Ceiling |
|---|---|
| Emergency provisional access (food, medicine, shelter) | 4 hours from dispute filing |
| Standard provisional access (all Essential Access) | 24 hours from dispute filing |
| Full identity restoration with clean record | 14 calendar days from dispute filing |
| Complex cases (displacement, abuse, statelessness, guardianship) | 30 calendar days with mandatory human case manager |

The survival floor must be maintained at provisional access level throughout the recovery window regardless of outcome. A disputed identity does not reduce Essential Access below the Constitutional Survival Minimum while the dispute is open.

**Rationale for 4-hour emergency tier:** Food and medicine access delays beyond one missed meal cycle constitute a health harm. Four hours is the minimum operationally credible emergency manual pathway; faster is better but must be tested. This is based on humanitarian registration precedent (UNHCR same-day food ration access targets) adapted to a non-disaster context.

**Rationale for 14-day full restoration:** Longer recovery windows create persistent second-class status. Identity flags left unresolved past 14 days begin to compound: credit, housing, civic, and health records may degrade based on unresolved status. 14 days matches the outer bound of UK Universal Credit identity dispute resolution targets, which is itself considered too long by welfare advocates.

**Rationale for 30-day complex cases:** Some cases require independent corroboration, document reconstruction, or specialist interviews. 30 days is the ceiling, not the target. Every complex case must have a named human case manager, a written status update every 5 days, and a documented reason if the 30-day ceiling is missed.

**Evidence basis:** Emergency tier — precautionary adapted from UNHCR field data. Standard and full tiers — adapted from UK Universal Credit and EU eIDAS dispute resolution benchmarks. Complex case tier — precautionary, no direct analogue for survival-floor context.

**Breach escalation:** Any case that breaches the applicable tier ceiling:
1. Triggers an immediate case flag and supervisor review within 2 hours;
2. Is logged in the Article VII dashboard as a recovery failure event;
3. Counts toward the quarterly appeal failure rate (T-4 below);
4. Is subject to independent audit if five or more breach events occur in the same quarter.

If the survival floor is interrupted during recovery (i.e., Essential Access falls below CSM while dispute is pending), this is a Category A constitutional failure regardless of whether subsequent restoration occurs.

---

### T-3: Data Exposure Failure Conditions

**Threshold:** Zero tolerance for any of the following; each is a discrete failure event triggering immediate audit:

| Failure event | Definition |
|---|---|
| Unauthorized access | Any access to identity or recovery data by a party not listed in the purpose-limitation map at the time of access |
| Scope creep use | Identity data used for a purpose not stated at the time of collection, including internal analytics, law enforcement disclosure, or inter-agency sharing not authorized in the data inventory |
| Unconsented sharing | Any identification data — including recovery metadata, dispute history, or biometric indicators — shared with a third party without the subject's explicit, specific, and revocable consent |
| Linkage attack success | A successful test demonstrating that a realistic adversary can re-link sector-tokenized identifiers across two or more service domains |
| Retention breach | Any data retained past its scheduled deletion date without a documented and subject-notified extension |

**Rationale:** Identity and recovery data in a survival-floor system is among the most sensitive data a system can hold. It reveals displacement, abuse, disability, undocumented status, and dependency relationships. Zero-tolerance is appropriate here because the harm of exposure is not merely financial but can include deportation, domestic violence escalation, and denial of protection. A single unauthorized access event can enable an abuser, an employer, or a hostile state actor to locate and target a person.

**Evidence basis:** Zero-tolerance for unauthorized access is standard in HIPAA, GDPR Article 5, and NIST SP 800-53 high-impact controls. Applying it here is consistent with those frameworks adapted to a higher harm context.

**Breach escalation:** Each failure event triggers:
1. Immediate system audit covering the full scope of the compromised data class;
2. Subject notification within 24 hours if the person can be safely contacted;
3. Public summary report within 7 days (redacted for safety);
4. Independent privacy panel review within 30 days;
5. Scale-up halt until the audit is complete and remediation is verified;
6. If linkage attack succeeds: mandatory architecture review of the tokenization and compartmentalization design before resuming operations.

---

### T-4: Appeal Failure Rate Ceiling

**Threshold:**

| Metric | Ceiling |
|---|---|
| Appeals resolved without any human review | 0% — all appeals must have at least one human decision-maker |
| Appeals denied past the applicable recovery delay ceiling (T-2) | Less than 2% per quarter |
| Appeals with no written reason provided | 0% — denial without written reason is void |
| Appeals reviewed exclusively by identity-system operators | 0% — at least one reviewer must be organizationally independent of the identity system |

**Rationale for 0% no-human-review:** Automated denial of an appeal in a survival-floor system is constitutionally incompatible with Voice rights and the right to challenge denial. There is no exclusion-risk acceptable enough to justify machine-only appeal resolution. This is not aspirational; it is a design constraint.

**Rationale for 2% breach-ceiling on delayed appeals:** Some cases will be genuinely hard. A 2% allowance acknowledges operational reality. Anything above 2% suggests systemic processing failure rather than case complexity. The 2% is per quarter of all appeals filed, not per quarter of contested appeals.

**Who audits:** Appeal outcomes must be reviewed by an independent body that includes:
- at least one person with no institutional affiliation with the identity system operators;
- at least one person with lived experience of identity exclusion, displacement, or documentation barriers;
- access to the full appeal record including staff notes and reason codes.

**Evidence basis:** Human-review requirement — adapted from EU AI Act Article 14 (human oversight for high-risk AI decisions). Delay ceiling — precautionary, no direct analogue. Independent reviewer requirement — adapted from ombudsman and tribunal independence standards (UK Administrative Court practice direction).

**Breach escalation:** Exceeding any appeal failure ceiling:
1. Triggers an immediate internal audit of the appeal processing pipeline;
2. Results in all pending appeals being reassigned to independent reviewers;
3. Is reported in the Article VII dashboard by category and quarter;
4. Counts as a governance failure for purposes of the Annex AK FC-150 simultaneous breach assessment.

---

### T-5: Discretion Floor

**Threshold:** Every staff-discretion decision in identity verification or recovery must meet all of the following minimum documentation requirements:

| Required element | Standard |
|---|---|
| Decision reason | At least one of a defined reason-code set; free-text supplemental required if reason is "other" |
| Evidence considered | List of specific evidence types reviewed; "insufficient evidence" is not sufficient without specifying what was present and why it was inadequate |
| Alternatives offered | Documentation that at least one alternative pathway was offered or explicitly determined inapplicable, with reason |
| Supervisor flag | Flag required if the decision contradicts the default outcome for this evidence combination |
| Audit log | Timestamped, tamper-evident, accessible to independent auditors |

**Audit rate:** 10% of all staff-discretion decisions must be independently audited per quarter. Audits must specifically test for pattern discrimination: whether denial rates differ by demographic group controlling for documented evidence quality.

**Threshold for pattern finding:** If any demographic subgroup shows a denial rate more than 1.5x the baseline denial rate after controlling for evidence quality, this constitutes a pattern finding and triggers escalation.

**Rationale for 10% audit rate:** Below 10%, pattern discrimination can persist invisibly for years. Above 10%, audit burden may distort frontline behavior in ways that reduce documentation honesty. 10% is the threshold used in healthcare implicit-bias audits (Joint Commission standard) and adapted here. The 1.5x disparity threshold matches EEOC adverse impact analysis standards (the "four-fifths rule" adapted for ratio rather than proportion).

**Evidence basis:** Audit rate — adapted from Joint Commission healthcare audit standards. Disparity threshold — adapted from EEOC adverse impact doctrine. Documentation requirements — adapted from UK administrative law procedural fairness standards.

**Breach escalation:** Pattern finding triggers:
1. Mandatory retraining for affected staff within 30 days;
2. Increased audit rate (25%) for the affected decision category for two subsequent quarters;
3. Review of training materials and reason-code design for structural bias;
4. Public summary report (anonymized) in the Article VII dashboard within 60 days;
5. If the pattern persists through two consecutive escalated-audit quarters, the discretion point must be redesigned or removed.

---

### Threshold Summary Table

| ID | Metric | Ceiling | Breach trigger |
|---|---|---|---|
| T-1 | False exclusion rate (Essential Access) | <0.5% per quarter | Manual override, public notice, audit panel, scale-up halt |
| T-2a | Emergency access restoration | 4 hours | Case flag, supervisor review, dashboard log |
| T-2b | Full Essential Access restoration | 24 hours | Case flag, supervisor review, dashboard log |
| T-2c | Full identity restoration | 14 calendar days | Case flag, supervisor review, dashboard log |
| T-2d | Complex case restoration | 30 calendar days | As T-2c, plus mandatory case manager review |
| T-2e | CSM interruption during recovery | 0 instances | Category A constitutional failure, immediate escalation |
| T-3 | Unauthorized data access or scope creep | 0 instances | Immediate audit, subject notification, scale-up halt |
| T-4a | Appeals without human review | 0% | Pipeline audit, reassignment, dashboard report |
| T-4b | Appeals denied past delay ceiling | <2% per quarter | Internal audit, independent reviewer reassignment |
| T-4c | Denials without written reason | 0% | Decision void, reprocess |
| T-5a | Staff discretion audit rate | ≥10% per quarter | Governance failure flag |
| T-5b | Demographic disparity in denial rate | <1.5x baseline | Retraining, increased audit, dashboard report |

---

Even if the tests pass, identity will remain a permanent danger surface. A humane identity system must fight fraud and protect access at the same time, and those goals will always conflict under stress. The correct goal is not perfect identity. The goal is a bounded, appealable, privacy-preserving system that makes fraud costly while making exclusion visible, reversible, and unable to interrupt the survival floor.

