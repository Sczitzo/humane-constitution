# ANNEX AE — Compound Interface Tests (Session 3) + P-012 Interface Hardening

**Purpose.** This annex records the compound interface test results from Session 3, the new threats identified at patch interfaces (T-012 through T-015), and the operative clauses for P-012 (Interface Hardening and Deadlock Prevention). Where clauses here conflict with Annexes AC or AD, this annex governs.

**Status:** PROPOSED. Clauses become operative only when formally accepted.

### AE1. Interface Vulnerability Register
The following vulnerabilities were identified by running Annex T scenarios against Session 2 patches:

| Interface | Vulnerability | Severity |
| :--- | :--- | :--- |
| **PCRP × Oracle Manipulation** | Manipulated oracle poisons sentinel and corroboration simultaneously; two-source requirement satisfied by single corrupted source. | Critical |
| **PCRP × Essential Access Velocity Oracle** | Demand-side velocity spikes (issuance unwind) trigger supply-shortage PCRP incorrectly. | High |
| **Throughput Floor × Compound Crisis** | Single aggregate floor consumed by one crisis type; second simultaneous crisis receives no guaranteed governance capacity. | High |
| **P-008 Cohort Cooling × Emergency Audit** | Audit body understaffed exactly when urgency is highest; independence rules reduce capacity under stress. | High |
| **T3 Triple Deadlock** | Sequential cap audit + CRP split + sub-panel authority limit simultaneously block mandatory emergency decision. | Critical |
| **RPCP × Contested Emergency** | 4-hour communication required when system cannot accurately state legal status of the emergency. | High |
| **P-004 × Procedural Accumulation** | Definition drift controls catch semantic changes but not 20-decision procedural attrition of constitutional space. | Med-High |
| **Velocity Oracle × Demand Surge** | Essential Access velocity oracle has no demand-side context; cannot distinguish supply shock from Flow enforcement unwind spending surge. | High |

### AE2. P-012 Operative Clauses
The following clauses amend Annex AC (P-005, P-006), Annex AD (P-011), and Annex AB (P-004) to close interface vulnerabilities identified in AE1.

#### AE2.1 PCRP Oracle Independence Requirement
Before PCRP can activate, the triggering authority must certify that the sentinel indicator and the corroboration source are drawn from structurally independent measurement systems — defined as: they do not share a common data source, a common publisher, or a common oracle quorum participant. A manipulated oracle satisfies at most one source regardless of downstream channel count.

When only one independent source is available, PCRP activates at reduced scope: reserve release only; no issuance adjustment; 24-hour maximum; mandatory Ombuds notification with written statement of why second independent source is unavailable.

#### AE2.2 Categorical Throughput Minimums
The P-005 operational throughput floor (AC1.2) is amended. The single aggregate floor of 5 decisions per quarter is replaced by 5 categorical minimum slots:

| Category | Minimum per Quarter | Cap |
| :--- | :--- | :--- |
| Identity and access continuity | 1 | — |
| Supply and essential services | 1 | — |
| Enforcement and fraud response | 1 | — |
| Governance and institutional | 1 | — |
| Unreserved (highest priority score) | 1 | — |
| **Single-category maximum** | — | 3 of 5 slots |

No single category may consume more than 3 of the 5 floor slots per quarter. Categorical minimums are non-waivable even if the 5 highest-priority proposals are all in the same category.

#### AE2.3 Emergency Deadlock Resolution Protocol
An Emergency Deadlock is declared automatically when a mandatory emergency decision is simultaneously blocked by two or more independent legitimate processes. Resolution sequence:
- **Immediate survival-floor bridge:** Level 4 regional continuity provisions activate unconditionally. Survival access is maintained regardless of deadlock status.
- **Deadlock arbitration panel:** Constituted within 6 hours — one Ombuds Office officer, one reserve CRP member not involved in the contested classification, one regional judicial officer. Authority limited to: (a) establishing a temporary operational baseline that maintains survival floor; (b) setting a binding resolution timeline for the blocking processes.
- **Scope freeze:** No expansion of powers, no new Shared Storehouse activations, no new PCRP activations during the deadlock period.
- **Mandatory root-cause review:** Post-resolution post-mortem identifies which procedural rules enabled the triple-block and whether amendment is required.

The arbitration panel has no authority over constitutional classification. It ensures the survival floor survives while the classification dispute resolves through normal channels. Second-generation deadlock (arbitration panel itself blocked) escalates immediately to Level 5 structural review.

#### AE2.4 Demand-Context Flag for Essential Access Velocity Oracle
The Article I operations layer must maintain a demand-context register. When any of the following conditions are active, the Essential Access velocity oracle applies a demand-surge discount before triggering sentinel signals:
- Any active Flow enforcement action or issuance unwind affecting more than the published population threshold.
- Any active mass identity re-verification campaign affecting more than the published threshold.
- Any declared regional defection or inter-regional supply route disruption.

The discount flags the signal as 'demand-context modified' — it does not suppress it. Federated Ombuds co-certification is required for any PCRP activation during a demand-context period. Single-authority PCRP activation is suspended until demand-context flag clears or the Ombuds co-certifies.

#### AE2.5 RPCP Contested-Status Template
When an operational event requiring RPCP communication has legally contested status — meaning classification, scope, or continuation is under active CRP review — the contested-status template must be used:
- **What happened** — factual statement of the physical event only; no legal characterization.
- **Current access status** — survival floor condition right now, not legal status of the emergency.
- **What is contested** — one sentence: the legal classification is under review by [named body].
- **Where to see updates** — link to CRP review status, updated in real time.

This template separates physical fact from legal characterization and prevents RPCP from prejudging active CRP review while meeting the 4-hour communication obligation.

#### AE2.6 Cumulative Procedural Drift Trigger
The P-004 definition drift controls (Annex AB5) are extended to procedural accumulation. When 20 or more Tier 3 operational decisions within a rolling 8-quarter window have collectively reduced the effective decision space for any Tier 2 or Tier 1 matter — measured by the range of options still available for future constitutional decisions — a mandatory CRP cumulative review is triggered. If the CRP finds the cumulative procedural record constitutes de facto constitutional change by operational attrition, the decisions collectively require retroactive H-2 classification and a public correction process.

---

### AE3. Complete Threat/Patch Linkage — All Sessions

| Threat ID | Patch ID | Status | Annex | Session |
| :--- | :--- | :--- | :--- | :--- |
| T-001 | P-001 | ACTIVE | AB | S1 |
| T-002 | P-003 | ACTIVE | AB | S1 |
| T-004 | P-002 | ACTIVE | AB | S1 |
| T-007 | P-004 | ACTIVE | AB | S1 |
| T-005 | P-005 | PROPOSED | AC1 | S2 |
| T-006 | P-006 | PROPOSED | AC2 | S2 |
| T-008 | P-008 | PROPOSED | AC3 | S2 |
| T-011 | P-011 | PROPOSED | AD | S2 |
| T-012 | P-012 | PROPOSED | AE2.1 | S3 |
| T-013 | P-012 | PROPOSED | AE2.2 | S3 |
| T-014 | P-012 | PROPOSED | AE2.3 | S3 |
| T-015 | P-012 | PROPOSED | AE2.4 | S3 |

*P-012 addresses four threats (T-012 through T-015) through six interface hardening clauses. T-009 (Grace Exploitation Loop) remains OPEN — next hardening target.*

---
