# ANNEX C. Threat Register Operations (Workflow and Evidence)
This annex defines how the Threat Register is maintained, tested, audited, and patched over time. It converts the register from a static table into an operational control system.

### C-1. Purpose
- Ensure every named threat has a clear owner, active controls, and passing tests.
- Make failures detectable quickly and reversible with minimal collateral harm.
- Prevent silent scope creep (especially civic-layer scope creep) by tying changes to approvals and evidence.
- Create audit-ready artifacts for independent oversight and public trust (at appropriate aggregation levels).

### C-2. Roles and ownership model
Each Threat ID must have a named Owner accountable for controls and test evidence. Owners may delegate implementation, but not accountability.

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
5. **Specify tests:** define automated tests and monitoring signals that prove controls are active and effective.
6. **Implement + verify:** deploy controls behind staged rollout; require test pass + evidence package.
7. **Operate:** monitor continuously; patch quickly; update residual risk; close only when root causes are addressed or risk is explicitly accepted by oversight.

### C-4. Cadence (Option B with quarterly Voice cycles)
Quarterly cycles reduce governance noise while keeping the system responsive. Monitoring and audits remain more frequent than the decision cycle.

| Frequency | Activities | Outputs |
| :--- | :--- | :--- |
| **Continuous** | Telemetry collection; anomaly detection; alerting; fraud/coercion flags. | Alerts; incident tickets; dashboards. |
| **Weekly** | Operational review of anomalies; Essential Access coercion/hoarding monitoring review; backlog grooming. | Weekly ops note; escalations; patch queue. |
| **Monthly** | Control health review; test flakiness review; oracle volatility sampling; threshold tuning proposals. | Control health report; tuning proposals. |
| **Quarterly** | Full Threat Register review; re-score I/L/D; verify evidence packages; Voice and Service Record decision cycle execution (bounded scope). | Quarterly register sign-off; updated scores; public summary (aggregated). |
| **Annually** | System-wide red-team exercise; privacy/security audit; constitutional constraint review. | Annual red-team report; audit report; constraint reaffirmation. |

### C-5. Evidence requirements (audit-ready)
- **Control Specification:** what the control does, who it affects, and why it reduces risk.
- **Test Evidence:** automated tests + manual checks (where required) with pass/fail status and dates.
- **Monitoring Evidence:** dashboards, alert thresholds, and mean-time-to-detect (MTTD) targets.
- **Change Log:** what changed, when, who approved, and how rollback works.
- **Incident Records:** for any triggered alert or exploit, include timeline, root cause, and patch verification.

### C-6. Change control and emergency patching
All material changes to Essential Access basket, scarcity triggers, Flow demurrage, Voice scope, Service Record service eligibility rules, or identity/oracle mechanisms must use a controlled change process.
1. **Change Proposal (CP)** created with: intent, affected invariants, threat impact, migration plan, and rollback plan.
2. **Two-layer review:** (1) technical/security review, then (2) oversight review for rights/survival impacts.
3. **Staged rollout with kill-switch:** deploy to a pilot region/segment; expand only after evidence passes.
4. **Emergency actions** are narrow and time-limited: pause/throttle only the affected subsystem; never global freeze without due process.
5. **Post-mortem required** within 7 days for any emergency activation; patches become permanent only after oversight sign-off.

### C-7. Readiness gates (pilot and scale)
- **Pilot gate:** top 10 risks have controls implemented and passing tests; emergency processes rehearsed; oracle quorum operational; identity recovery proven.
- **Scale gate:** demonstrated MTTD/MTTR targets; independent audit passed; coercion/fraud false-positive rates within tolerance; public transparency reports live.

---
