# Cyber Resilience and Availability Evidence Test Package

This package defines what must be proven before the project may claim that a digital survival floor remains reachable during ransomware, key compromise, regional outage, supply-chain compromise, or payment-rail failure.

The honest current claim is narrow: the corpus has drift/tamper controls, oracle-failure controls, and some continuity doctrines. It does not yet prove that Essential Access can survive a hostile cyber event at population scale.

---

## Claim Boundary

The project may say:

- cyber availability is now a registered threat under T-030;
- P-067 defines the evidence path for ransomware, key compromise, outage, and offline continuity;
- any scale claim is blocked until a cyber continuity drill proves floor delivery can continue inside the published tolerance.

The project may not say:

- the survival rail is cyber-resilient in practice;
- offline continuity is solved;
- key compromise cannot interrupt delivery;
- cryptographic drift controls are enough to keep groceries, shelter, medicine, or care reachable during an outage.

---

## External Evidence Base

| Source | What it contributes | Limit |
|---|---|---|
| [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework) | Organizes cyber risk around Govern, Identify, Protect, Detect, Respond, and Recover functions. | It is a framework, not proof that this protocol can recover. |
| [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) | Contingency planning treats recovery, backup, alternate processing, and continuity as planned and tested functions. | Federal information-system guidance does not define a constitutional survival-floor fallback by itself. |
| [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) | Key management requires lifecycle controls, custody, rotation, access control, inventory, and recovery discipline. | It does not certify this project's key custody or breach response. |
| [CISA StopRansomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide) | Ransomware resilience depends on tested backup, recovery, hardening, and incident-response practice, including offline backup discipline. | Backups alone do not prove survival-floor continuity or protect sensitive data from exposure. |

---

## Abuse Model

| Abuse path | What the actor wants | Why it matters |
|---|---|---|
| Ransomware against payment or eligibility rails | Freeze redemption, records, provider settlement, or delivery dispatch until concessions are made. | The survival floor becomes a hostage surface. |
| Key compromise | Issue false approvals, revoke valid access, forge operator authority, or block recovery. | A valid-looking signature can become a weapon if key custody is centralized or poorly rotated. |
| Regional network outage | Cut off rural, elderly, disabled, disaster-affected, or low-connectivity users. | A universal floor that depends on network reach is not universal in practice. |
| Supply-chain implant | Ship software that preserves dashboard appearances while degrading delivery or recovery. | The public sees compliance while affected people lose access. |
| Cloud/provider dependency failure | Make the floor depend on one vendor, region, identity provider, or administrative console. | Centralized control-plane failure can defeat polycentric social design. |
| Data extortion | Threaten release of sensitive identity, safety-shielded, medical, or household data. | The system may trade privacy or concessions to restore service. |

---

## Required Test Sequence

### Stage 0 - Critical Service Inventory

List every system required to deliver Essential Access: eligibility, redemption, provider settlement, basket availability, identity proof where applicable, appeal intake, cash/offline bearer conversion, delivery dispatch, and public status publication.

Failure criterion: any CSM-critical function lacks a named owner, fallback mode, recovery target, and manual/offline continuity procedure.

### Stage 1 - Ransomware Continuity Drill

Simulate ransomware that disables ordinary digital redemption and provider settlement in one region.

Required proof:

- affected persons can still receive CSM food, water, shelter, medicine, transit, and urgent care inside the published continuity tolerance;
- providers have a manual settlement or emergency reimbursement path;
- backup restoration is tested, not merely asserted;
- the public receives a plain-language status update.

Failure criterion: CSM delivery pauses beyond the tolerance, or provider refusal becomes rational because settlement is unavailable.

### Stage 2 - Key Compromise and Rotation Drill

Simulate compromise of an issuance, provider, operator, or amendment-adjacent key.

Required proof:

- compromise detection path;
- emergency revocation;
- replacement-key ceremony;
- dual-control or threshold confirmation for restored authority;
- evidence that compromised keys cannot approve new survival-floor denial, false issuance, or dashboard suppression.

Failure criterion: one compromised actor can deny access, approve false access, or block recovery without independent detection.

### Stage 3 - Offline / Analog Continuity Drill

Run a no-network redemption and delivery test.

Required proof:

- physical/offline bearer instruments or manual provider vouchers;
- fraud-bounded reconciliation after service restoration;
- non-digital appeal intake;
- delivery for digitally fragile persons;
- privacy limits so offline fallback does not become a permanent surveillance file.

Failure criterion: a person without network access, device access, or digital literacy cannot obtain the CSM floor during the outage window.

### Stage 4 - Regional Outage and Cross-Region Failover

Disable a region, cloud zone, vendor system, or core network dependency.

Required proof:

- failover works without central discretionary approval;
- local delivery continues under last-known-valid state;
- public status publication uses at least two independent channels;
- rural and vulnerable cohorts are separately measured.

Failure criterion: aggregate service appears restored while a vulnerable region, cohort, or provider class remains cut off.

### Stage 5 - Supply-Chain and Dashboard Integrity Drill

Attempt to ship a compliant-looking update that weakens recovery, offline access, or publication.

Required proof:

- independent code review;
- reproducible build or equivalent attestation;
- dashboard and audit logs reveal the exception;
- rollback to last-known-valid state is practiced.

Failure criterion: a degraded implementation can become trusted while preserving public appearance of compliance.

---

## Evidence Packet Requirements

Every test packet must publish:

- scope and affected population;
- systems disabled;
- recovery time objective and actual recovery time;
- CSM delivery continuity by category;
- vulnerable-cohort outcomes;
- provider-settlement continuity;
- data exposure findings;
- key custody and rotation findings;
- offline reconciliation error rate;
- public communication artifacts;
- residual risk and required patch updates.

---

## Minimum Evidence Before Stronger Claim

The project may strengthen the cyber-resilience claim only after the evidence packet shows:

- no CSM category was interrupted beyond the published tolerance;
- vulnerable cohorts did not fail behind aggregate averages;
- key compromise did not enable unilateral denial, false issuance, or recovery blockade;
- offline access worked for persons without devices or network access;
- recovery was tested from backup or alternate processing, not assumed;
- dashboard and public-status channels remained usable or had tested fallback publication.

---

## Decision Rule

Cyber resilience remains **Active — unproven** until ransomware, key compromise, regional outage, offline fallback, and supply-chain drills pass and residual risks are updated in the Claims and Evidence Register, Threat Register, Hardening Queue, and Pilot Evidence Roadmap.

If any drill fails, no public document may claim the survival rail is scale-ready.
