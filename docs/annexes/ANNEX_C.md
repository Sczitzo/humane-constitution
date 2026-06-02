# ANNEX C — Threat Register Operations (Workflow and Evidence)

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Converts the Threat Register from a static table into a living operational control system — defining intake, triage, ownership, evidence requirements, review cadence, change control, and scale readiness gates. |
> | **Who it protects** | Anyone who relies on system controls actually being maintained and tested rather than existing only on paper. |
> | **Failure risk** | Without an operational workflow, the Threat Register degrades into compliance theater — entries accumulate, ownership drifts, tests go stale, and real vulnerabilities are missed until they cause harm. |
> | **Evidence status** | Designed |
> | **Linked risks** | All TR-01 through TR-13 entries in Annex B; pilot gate and scale gate criteria; Annex A §A3–A4. |

> **Provenance:** Foundational constitutional annex · Defines threat-register workflow and evidence discipline · Status: **ACTIVE**
This annex defines how the Threat Register is maintained, tested, audited, and patched over time. It converts the register from a static table into an operational control system.

### C-1. Purpose
- Ensure every named threat has a clear owner, active controls, and passing tests.
- Make failures detectable quickly and reversible with minimal collateral harm.
- Prevent silent scope creep (especially civic-layer scope creep) by tying changes to approvals and evidence.
- Create audit-ready artifacts for independent oversight and public trust (at appropriate aggregation levels).

### C-2. Roles and ownership model
Each Threat ID must have a named Owner accountable for controls and test evidence. Owners may delegate implementation, but not accountability.

No accountability role may sit empty. A vacated Threat Owner role must be reassigned to a named successor within 10 business days. While the role is vacant, accountability defaults upward to Independent Oversight, which holds it as interim Threat Owner and records the vacancy. If the role remains unfilled past the deadline, every threat under it reverts to a degraded status (per C-4) until a successor is named, and the lapse is escalated to oversight and logged. The same time-to-reassign and default-escalation rule applies to Control Owner and Test/Monitoring Owner roles.

| Role | Accountability | Required artifacts (minimum) |
| :--- | :--- | :--- |
| **Threat Owner** | Keeps entry current; ensures controls exist; ensures tests/monitoring pass; drives remediation. | Control spec; test plan; monitoring plan; quarterly review note; residual-risk statement. |
| **Control Owner** | Implements and maintains specific controls (policy, software, ops). | Control implementation record; change log; rollback plan. |
| **Test/Monitoring Owner** | Maintains automated tests, dashboards, anomaly detection, alert routing. | Automated test cases; alert thresholds; incident runbook; on-call rota. |
| **Independent Oversight/Audit** | Verifies evidence, sampling, and data integrity; publishes audit summaries. | Audit reports; sampling methodology; findings and required patches. |
| **Emergency Authority (Narrow)** | Can trigger limited emergency pause or throttles under defined conditions. | Emergency activation record; scope/time limit; post-mortem within 7 days. |

### C-3. Threat lifecycle (intake to closure)
1. **Intake:** log new threat, exploit report, or incident as a candidate Threat ID.
2. **Triage:** assign initial Impact/Likelihood/Detectability (I/L/D) and decide whether to merge with an existing entry.
3. **Assign ownership:** name Threat Owner + Control Owner(s) + Test/Monitoring Owner.
4. **Specify controls:** document controls that reduce incentive, increase detection, increase cost, and limit blast radius.
5. **Specify abuse cases and tests:** cite relevant patterns from the [Abuse Case Library](../governance/Abuse_Case_Library.md), then define automated tests and monitoring signals that prove controls are active and effective.
6. **Implement + verify:** deploy controls behind staged rollout; require test pass + evidence package.
7. **Operate:** monitor continuously; patch quickly; update residual risk; close only when root causes are addressed or risk is explicitly accepted by oversight.

### C-4. Review Cadence
Quarterly cycles reduce governance noise while keeping the system responsive. Monitoring and audits remain more frequent than the decision cycle.

| Frequency | Activities | Outputs |
| :--- | :--- | :--- |
| **Continuous** | Telemetry collection; anomaly detection; alerting; fraud/coercion flags. | Alerts; incident tickets; dashboards. |
| **Weekly** | Operational review of anomalies; Essential Access coercion/hoarding monitoring review; backlog grooming. | Weekly ops note; escalations; patch queue. |
| **Monthly** | Control health review; test flakiness review; oracle volatility sampling; threshold tuning proposals. | Control health report; tuning proposals. |
| **Quarterly** | Full Threat Register review; re-score I/L/D; verify evidence packages; Voice and Service Record decision cycle execution (bounded scope). | Quarterly register sign-off; updated scores; public summary (aggregated). |
| **Annually** | System-wide red-team exercise; privacy/security audit; constitutional constraint review. | Annual red-team report; audit report; constraint reaffirmation. |

**Breach of cadence is not advisory.** When a required cadence event is missed or its outputs are not produced by the scheduled date, the lapse triggers automatic escalation to Independent Oversight and is recorded in an audit-visible lapse log. Every threat that depended on the missed event reverts to a degraded, unverified status — its prior evidence is no longer treated as current — until the event is completed and fresh evidence is filed. A threat may not be reported as having passing controls while any of its cadence obligations are overdue. This makes compliance theater costly and visible rather than silent.

**Recourse for the monitored person.** Continuous monitoring includes anomaly detection and fraud/coercion flags applied to identifiable people. Any person flagged by such monitoring receives notice of the flag in plain language and an accessible path to appeal it, including human review and correction of erroneous data. Adverse action that rests on a contested flag is paused or made reversible while the appeal is pending, except where a narrow, time-limited emergency action under C-6 is justified. The dignity of the monitored is protected alongside the integrity of the monitoring; see also Annex A §A3–A4.

### C-5. Evidence requirements (audit-ready)
- **Control Specification:** what the control does, who it affects, and why it reduces risk.
- **Abuse Case Mapping:** actor incentive, attack path, affected collapse state, false reassurance, and failure criterion.
- **Test Evidence:** automated tests + manual checks (where required) with pass/fail status and dates.
- **Monitoring Evidence:** dashboards, alert thresholds, and mean-time-to-detect (MTTD) targets.
- **Change Log:** what changed, when, who approved, and how rollback works.
- **Incident Records:** for any triggered alert or exploit, include timeline, root cause, and patch verification.

Each evidence package carries an explicit validity date. When a package lapses that date without being refreshed, the controls it backs are no longer treated as verified: the affected threat reverts to a degraded, unverified status, the lapse is escalated to oversight and recorded in the lapse log, and the package must be renewed before the threat may be reported as passing again. Stale evidence counts as no evidence.

### C-6. Change control and emergency patching
All material changes to Essential Access basket, scarcity triggers, Flow demurrage, Voice scope, Service Record service eligibility rules, or identity/oracle mechanisms must use a controlled change process.
1. **Change Proposal (CP)** created with: intent, affected invariants, threat impact, migration plan, and rollback plan.
2. **Two-layer review:** (1) technical/security review, then (2) oversight review for rights/survival impacts.
3. **Staged rollout with kill-switch:** deploy to a pilot region/segment; expand only after evidence passes.
4. **Emergency actions** are narrow and time-limited: pause/throttle only the affected subsystem; never global freeze without due process.
5. **Post-mortem required** within 7 days for any emergency activation; patches become permanent only after oversight sign-off.

### C-7. Readiness gates (pilot and scale)
- **Pilot gate:** top 10 risks have controls implemented and passing tests; emergency processes rehearsed; oracle quorum operational; identity recovery tested against the published evidence package.
- **Scale gate:** demonstrated MTTD/MTTR targets; independent audit passed; coercion/fraud false-positive rates within tolerance; public transparency reports live.

No gate may be silently waived under launch pressure. Any exception to a pilot or scale-readiness gate requires a named approver with authority to grant it, a written justification, an explicit time limit after which the exception expires, and an audit-visible record of the waiver — mirroring the emergency discipline in C-6. An unrecorded or anonymous waiver is void, and a gate it purported to clear is treated as unmet.

---
