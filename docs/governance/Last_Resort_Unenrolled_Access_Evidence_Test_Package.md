# Last-Resort Unenrolled Access Evidence Test Package

**Status:** Active — unproven  
**Patch:** P-068  
**Threat:** T-031 — Last-Resort Unenrolled Access Failure  
**Primary abuse case:** ACL-016 — Last-Resort Floor Paper Compliance  
**Primary question:** Can a person who cannot enroll, cannot keep a wallet, cannot hold a digital credential, cannot safely disclose identity, and cannot navigate a normal administrative path still receive the Constitutional Survival Minimum?

---

## Plain-Language Purpose

The constitution says survival access must not depend on identity. That promise fails if the only practical door still assumes a person can enroll, hold a credential, carry a phone, remember a process, travel to a digital access point, or cooperate with an identity workflow.

This package tests the floor beneath the floor: the last-resort path for someone who is present, hungry, unsafe, undocumented, disabled, cognitively overwhelmed, digitally excluded, or otherwise unable to become legible to the system.

The design may use Tier 0 tokens, paper vouchers, trusted intermediaries, mobile delivery, staffed access points, community kitchens, emergency shelters, clinics, religious institutions, mutual-aid groups, or other local channels. The method is not assumed successful until a pilot shows that real people can use it without hidden identity coercion.

---

## Scope

This package covers the person who is not merely recovering from a lost credential, but who may never be able to enter or maintain the normal identity layer.

Covered cases include:

- no phone, device, card, wallet, stable address, or document;
- disability, age, cognitive condition, language barrier, or trauma that makes digital self-service unusable;
- domestic violence, trafficking, stalking, undocumented status, or persecution risk that makes identity disclosure unsafe;
- religious, cultural, or conscience refusal to join the system's ordinary infrastructure;
- acute crisis, homelessness, disaster displacement, incarceration transition, institutional discharge, or severe mental health crisis;
- communities reachable only through trusted intermediaries rather than direct protocol infrastructure.

This package does not replace the [Identity and Recovery Evidence Test Package](./Identity_Recovery_Evidence_Test_Package.md). That package tests enrollment, continuity, recovery, and identity error. This one tests whether survival access still works when enrollment never happens.

---

## Relationship To Existing Controls

| Control | What it already covers | What this package adds |
|---|---|---|
| T-002 / P-003 | identity fraud, loss, recovery, and exclusion | a distinct failure mode where the person never reaches or cannot maintain the identity layer |
| P-054 / Annex AX | confidential and safety-shielded enrollment | emergency and safety access that may still route toward enrollment |
| P-055 / Annex AY | delivery sufficiency register for populations with incomplete delivery paths | a falsifiable test for the most fragile delivery path: no credential, no wallet, no digital channel |
| P-056 / Annex AK §AK8 / Annex AZ | designed Tier 0 open-access survival floor and pseudonymous token constraints | pilot evidence that a non-digital or analog floor works before universality is claimed |
| P-067 | outage and cyber continuity | continuity when systems fail; this package covers persons who cannot use normal systems even when they work |

---

## Minimum Test Design

### 1. Access-Point Map

The pilot must publish a map of last-resort access points and routes before testing begins:

- walk-in physical sites;
- mobile delivery routes;
- trusted intermediary organizations;
- emergency shelters, clinics, schools, mutual-aid sites, religious institutions, or local service partners;
- no-network fallback sites;
- language and disability access coverage;
- hours, transit distance, and after-hours emergency paths.

The map must say who is responsible for each route and what CSM categories each route can deliver.

### 2. No-Credential Intake Drill

The pilot must test people presenting with no identity document, phone, wallet, card, app, remembered account, stable address, or prior enrollment.

The person must be able to receive the applicable survival floor without:

- disclosing real-world identity;
- naming an abuser, employer, relative, landlord, officer, or institution as a verifier;
- accepting persistent tracking;
- waiting for a digital credential;
- agreeing to future enrollment as a condition of immediate food, water, shelter, urgent care, or medicine access.

### 3. Trusted-Intermediary Drill

At least one route must operate through an intermediary trusted by the affected community rather than selected only by the protocol.

The drill must test:

- how trustedness is established;
- whether the community can reject or replace an intermediary;
- whether the intermediary can access goods without exposing recipients;
- whether the intermediary can be audited without turning recipients into a list.

### 4. Analog Reconciliation Drill

The pilot must reconcile last-resort delivery without creating durable identity records.

Acceptable records may include category, time window, access point, quantity, and anonymized event count. The record must not include name, biometric, address, device identifier, persistent token, face image, or repeated personal descriptor unless a separate safety exception is documented and independently approved.

### 5. Abuse And Diversion Drill

The pilot must test predictable abuse without turning the floor into surveillance:

- repeated same-day attempts at the same access point;
- organized pickup by a broker;
- staff pressure to demand identity "just to be safe";
- intermediary capture or favoritism;
- provider refusal because no ordinary settlement account exists;
- emergency scarcity where staff are tempted to ration by legibility.

### 6. Dignity Interview

Participants and affected-community advocates must be asked whether the route felt like help, coercion, investigation, humiliation, or a hidden enrollment funnel.

Abandonment counts as exclusion. A person who leaves because the path is confusing, degrading, unsafe, or identity-demanding is not a successful access case.

---

## Required Metrics

| Metric | Required reporting |
|---|---|
| Successful no-credential access rate | by access route and CSM category |
| Time to first aid | median, 90th percentile, and emergency outliers |
| Abandonment rate | with reason categories |
| Identity-disclosure pressure | number and description of staff, provider, or intermediary requests for unnecessary identity |
| Digital-dependency failure | cases where phone, app, card, account, QR code, or network access was still required |
| Intermediary trust challenge | number of objections, replacement requests, or conflict reports |
| Privacy exposure | any recorded personal data beyond the approved analog reconciliation fields |
| Fraud/diversion signal | aggregate anomaly and broker-pattern findings without individual tracking |
| Provider settlement failure | cases where providers refused or delayed because ordinary rails were absent |
| Vulnerable-cohort disparity | elderly, disabled, undocumented, displaced, crisis, language, rural, and digitally fragile cohorts |

---

## Failure Criteria

The pilot fails if any of the following occurs:

- a person who cannot enroll or hold a credential has no documented route to the survival floor;
- survival access is conditioned on identity disclosure, future enrollment, a device, a biometric, a stable address, or a persistent account;
- staff discretion becomes the real gate;
- trusted intermediaries expose recipient identities as the price of access;
- analog records become a shadow registry;
- abandonment is not counted as exclusion;
- any tracked vulnerable cohort fails materially more often than ordinary users without immediate correction;
- fraud control moves from aggregate anomaly detection into individual surveillance at the survival tier;
- providers refuse last-resort delivery because settlement or reimbursement is unavailable.

Any failure blocks claims that Essential Access is universal in practice.

---

## Evidence Standard

Before the corpus may claim that last-resort unenrolled access is operational:

1. at least one no-credential access drill must pass;
2. at least one trusted-intermediary route must pass;
3. at least one analog reconciliation drill must pass privacy review;
4. at least one abuse/diversion drill must show aggregate controls that do not become individual surveillance;
5. dignity interviews must show no systematic pattern of humiliation, coercion, hidden enrollment pressure, or unsafe disclosure;
6. the Delivery Sufficiency Register must publish responsible parties, timelines, route coverage, and unresolved gaps.

Until then, the honest claim is:

> The corpus has designed a Tier 0 and last-resort survival-access path, but it has not proven that a person outside identity and digital infrastructure can reliably receive the floor.

---

## Residual Risk

Even a passing pilot will not remove the tension. A fully open floor can be abused; a tightly verified floor can exclude the person Christ's teachings place in front of us first. The design choice is to keep the survival tier open, monitor aggregate strain, punish organized brokers rather than desperate persons, and tell the truth when the path is not yet reachable.

The route must stay a servant of the person, not a machine for making the person legible.
