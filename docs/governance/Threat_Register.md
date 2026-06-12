# Threat Register

**Running adversarial control layer aligned to the Humane Constitution · Current through T-033**

---

How could the system fail, be gamed, or be captured? Each threat names a failure path, the harm it could cause, and the current mitigation status.

**Status key.** 
- **Proposed** = a response has been suggested but not yet formally incorporated.
- **Designed** = the mechanism is specified in the corpus but not yet active.
- **Active — unproven** = the mechanism is incorporated and referenced, but has no field evidence.
- **Partly tested** = some evidence exists from pilots or analogues, but not sufficient for resolution.
- **Evidence-backed** = sufficient external evidence to support the claim.
- **Resolved** = the threat has been addressed with evidence-backed controls AND residual risk is documented.

**Status discipline.** This register tracks design posture, not deployment proof. `Active — unproven` means a control is integrated into the document set; it does not mean the control has been proven in field conditions. `Resolved` should be used only after defined tests, pilots, or audits produce evidence and the residual risk is updated.

**Resolution discipline.** Use the [Threat Resolution Matrix](./Threat_Resolution_Matrix.md), [Collapse-State Crosswalk](./Collapse_State_Crosswalk.md), [Abuse Case Library](./Abuse_Case_Library.md), and [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md) as the working plan for moving threats toward evidence-backed resolution. A threat is not solved merely because it has a patch; it needs a corruption model, outside evidence, a test path, failure criteria, abuse-case mapping, evidence level, and a residual-risk statement. Threats may also be read through the [Architecture Source Map](./Architecture_Source_Map.md) collapse-state lens: Survival-Trade Bind, Power-Wealth Convergence, Static-Advantage Loop, and control-plane or compound failures.

**Scoring convention.** Risk Score = I × L × (6 − D) where I = Impact, L = Likelihood, D = Detectability (each 1–5; higher D = more detectable = lower risk multiplier).

**Disclosure policy.** This register is bifurcated per the Register Disclosure Protocol (see `docs/annexes/ANNEX_AO.md`). Specific detection thresholds, timing windows, and operational exploit paths are published only in the Restricted Annex, available to auditors, oversight panels, and adversarial panel members. This public version records threat categories, mechanisms, mitigations, and risk scores. The restricted version adds precise calibration data. Both versions must remain consistent; any discrepancy is treated as a T-007 definition-drift event.

---

## Plain-Language Threat Map

Read this table first if you do not work in law, policy, security, or systems design. For the threat-by-threat solution plan, see the [Threat Resolution Matrix](./Threat_Resolution_Matrix.md). For source-backed open-problem work, see the [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md) and [External Evidence Register](./External_Evidence_Register.md).

| Threats | Plain meaning |
| :--- | :--- |
| T-001 | People try to turn Essential Access into money through side deals. |
| T-002 | People fake, steal, duplicate, or lose identity in ways that either drain the system or exclude real people. |
| T-004 | The system protects survival but fails to keep work, excellence, and contribution meaningful. |
| T-005 / T-013 / T-014 | Review bodies get clogged, deadlocked, or overloaded during crisis. |
| T-006 / T-012 / T-015 / T-018 / T-019 / T-024 | Measurement and emergency signals are wrong, manipulated, suppressed, or unavailable when decisions matter. |
| T-007 | Powerful actors quietly change definitions so the rules still sound the same but work differently. |
| T-008 / T-009 | A professional insider class captures review, verification, hardship rules, or service roles. |
| T-010 / T-011 | The public misunderstands the system, or opponents define it before it can explain itself. |
| T-016 / T-017 | The patch process itself gets captured or cannot activate its own safeguards. |
| T-020 / T-021 | Measurement sources look independent but share the same assumptions, standards, data, or AI supply chain. |
| T-022 | A later hostile government keeps the words but hollows out the system. |
| T-023 | A pilot works in calm conditions but fails when scaled into real stress. |
| T-025 | Protected-capital and investment-channel rules become a way for powerful sectors to shelter idle control without real deployment. |
| T-026 | A valid exit is blocked, delayed, or punished. |
| T-027 | Decisions drift upward to larger bodies when local people could handle them. |
| T-028 | Essential-sector suppliers use food, energy, medicine, logistics, data, or grid control to demand concessions. |
| T-029 | The survival floor and public rails are promised without a proven way to fund them without inflation, hidden debt, or burden shift. |
| T-030 | A hostile cyber event, key compromise, outage, or software dependency makes the survival floor unreachable. |
| T-031 | A person who can never enroll, hold a wallet, or keep a digital credential still cannot reach the survival floor. |
| T-032 | Monitoring required to protect the system is reused to surveil, rank, punish, or coerce people. |
| T-033 | Founders use vague consent or friendly reviewers to claim legitimacy before real evidence exists. |

---

## Open Problems Dashboard

The single working list of unsolved threats. Read this first before scanning the rest of the register. A threat appears here if it is `Proposed`, `Designed`, or `Active — unproven` with significant remaining work. Threats that have been `Resolved` (evidence-backed controls with documented residual risk) are not tracked here.

### Fully open (no structural mitigation yet)

| ID | Title | Severity | Score | Why it matters in one line | Proposed patch |
| :--- | :--- | :--- | :--- | :--- | :--- |
| _None currently registered_ | — | — | — | Every registered threat currently has at least a mitigation path, proposed annex, or active control. | — |

### Partial (mitigation path defined; not fully integrated or tested)

| ID | Title | Severity | Score | What still needs work |
| :--- | :--- | :--- | :--- | :--- |
| T-001 | Shadow Convertibility | **Critical** | 60 | Above-ledger residual: scale-arbitrage containment without authoritarian overreach. |
| T-002 | Identity Exploits | **Critical** | 60 | Non-coercive identity stack remains the largest unresolved precondition. |
| T-007 | Political Definition Drift | **Critical** | 60 | Semantic capture defenses depend on a registry that is not yet enforced in production. |
| T-004 | Incentive Collapse | **Critical** | 48 | Real contribution model that rewards output without recreating coercive hierarchy, social-credit ranking, or proxy employability scoring. |
| T-018 | PCRP False-Trigger Exhaustion | High | 36 | Attestation-vector bounded by P-024; false-trigger-at-scale residual still on P-015. |
| T-019 | Demand-Context Flag Suppression | High | 48 | P-015 / Annex AP defines a mitigation path; Annex AI gates and timing-monitor infrastructure still need activation. |
| T-022 | Electoral Cycle Capture | **Critical** | 60 | P-051 (Constitutional Integrity Panel, Annex AM §AM8) is the ACTIVE primary structural control; P-065 is ACTIVE anti-hollowing hardening; P-018 / Annex AM remains PROPOSED for the broader entrenchment and transition-continuity path. CIP staffing, funding, trigger infrastructure, vacancy repair, and transition simulations still need evidence before any evidence-backed claim. |
| T-023 | Pilot External Validity Collapse | Med-High | 32 | P-019 / Annex AN defines the scale-up evidence gate; pilot evidence and challenge infrastructure still need execution. |
| T-025 | Investment and Capital-Deployment Shelter Capture | High | 48 | P-023 / Annex AR defines the zero-exemption contract-commitment architecture; founding parameters and inspector pool still need activation. |
| T-030 | Cyber Resilience and Availability Failure | **Critical** | 72 | P-067 defines the test path, but ransomware, key-compromise, regional-outage, offline-continuity, supply-chain, and public-status drills have not run. |
| T-031 | Last-Resort Unenrolled Access Failure | **Critical** | 72 | P-068 defines the test path, but no no-credential, trusted-intermediary, analog-reconciliation, or dignity-interview pilot has proven the floor reaches people outside identity and digital infrastructure. |
| T-032 | Monitoring Repurposing and Enforcement-Observation Failure | **Critical** | 72 | P-069 defines the test path, and the Monitoring Administrative Safety Packet defines the operating gate, but no purpose-creep, administrative-expansion, lawful-pressure, linkability, office-separation, individual-flag appeal, retention, cleared-flag, or coercive-use drill has proven monitoring cannot become surveillance. |
| T-033 | Founding Consent Evidence and Civil-Society Review Definition Failure | **Critical** | 72 | P-070 defines the prerequisite-definition gate, but no consent evidence packet, threshold certification, reviewer qualification register, reviewer challenge log, or independent findings exist. |

### Load-bearing sub-problems

These appear inside detailed entries below as "Open problem:" or residual-risk lines. They are not all separate threat IDs, but they are important enough to govern the next refinement cycle.

| Sub-problem | Parent threat | Current posture | Why it matters |
| :--- | :--- | :--- | :--- |
| Identity-stack fraud calibration | T-002 | **Proposed** | Fraud tolerance must not exclude displaced, undocumented, disabled, elderly, or digitally fragile people. |
| Contribution model definition | T-004 | **Designed** | Contribution must remain real without recreating coercive hierarchy, burnout pressure, or a worth score. |
| Semantic bureaucracy risk | T-007 | **Active — unproven** | Definition protection can itself become capture, freezing, or expert-class gatekeeping. |
| Subsidiarity aggregate drift | T-027 | **Active — unproven** | Individual escalations can look reasonable while cumulative governance drifts upward. |
| Founding legitimacy | T-017/T-022/T-026/T-033 | **Proposed** | A non-coercive constitution cannot be legitimated by vague consent evidence, friendly reviewers, or a self-interested founding process. |
| Institutional self-protection | T-005/T-008/T-016 | **Active — unproven** | Review bodies can become a class that protects its own authority rather than the people. |

### Maintenance rules for this dashboard

- Move a threat off the dashboard only when its remaining work is tracked in the Hardening Queue as `Active — unproven` or `Evidence-backed`, with a named test or audit path.
- Threats with partial mitigations should also have an entry in the Open Problems Resolution Docket before they are removed from this dashboard.
- When a threat is fully `Resolved` (evidence-backed, residual risk documented), strike it through here in one update cycle, then remove on the next.
- Newly added threats go on this dashboard at creation, not at resolution.

---

## Summary by Priority

| Threat ID | Title | Severity | Status | Core Point | Score | Owner | Last reviewed | Trend |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| T-001 | Shadow Convertibility | **Critical** | **Active — unproven** | Contain scalable Essential Access↔Flow arbitrage without authoritarian overreach. | 60 | P8 + Essential Access/Identity | 2026-05-01 *(placeholder)* | Steady |
| T-002 | Identity Exploits | **Critical** | **Active — unproven** | Treat identity as a permanent adversarial surface; preserve the survival floor. | 60 | P3 (Identity) | 2026-05-01 *(placeholder)* | Rising |
| T-004 | Incentive Collapse | **Critical** | **Active — unproven** | Guarantee dignity while keeping contribution materially and psychologically real. | 48 | P4 (Voice & Service Record) | 2026-05-01 *(placeholder)* | Steady |
| T-005 | Governance Throughput Failure | High | **Active — unproven** | Prevent review layers from becoming bottlenecks that trigger bypass normalization. | 40 | P8 (Oversight) | 2026-05-01 *(placeholder)* | Steady |
| T-006 | Measurement Lag / Supply Shock | **Critical** | **Active — unproven** | Force graceful degradation when reality data is noisy, incomplete, or lagged. | 60 | P7 (Oracle) + P8 | 2026-05-01 *(placeholder)* | Rising |
| T-007 | Political Definition Drift | **Critical** | **Active — unproven** | Stop semantic capture through definitions, classifications, and technical relabeling. | 60 | P8 (Oversight) | 2026-05-01 *(placeholder)* | Rising |
| T-008 | Bureaucratic Elite Formation | High | **Active — unproven** | Prevent process insiders from becoming a durable managerial class. | 64 | P8 + Oversight | 2026-05-01 *(placeholder)* | Rising |
| T-009 | Grace Exploitation Loop | Med-High | **Active — unproven** | Keep humane recovery paths from becoming durable exploit channels. | 48 | P4 (Voice & Service Record) | 2026-05-01 *(placeholder)* | Steady |
| T-010 | Narrative Attack Surface | **Critical** | **Active — unproven** | Make the system intelligible before hostile framing fixes public perception. | 80 | P8 + Communications | 2026-05-01 *(placeholder)* | Rising |
| T-011 | Narrative Attack Surface | **Critical** | **Active — unproven** | (See T-010/T-011 combined entry.) | 80 | P8 + Communications | 2026-05-01 *(placeholder)* | Rising |
| T-012 | PCRP Oracle Poisoning | **Critical** | **Active — unproven** | Prevent single-source oracle corruption from triggering false public emergency. | 60 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Rising |
| T-013 | Throughput Starvation | High | **Active — unproven** | Prevent multi-crisis competition from starving guaranteed governance capacity. | 48 | P8 (Oversight) | 2026-05-01 *(placeholder)* | Steady |
| T-014 | Triple Deadlock | **Critical** | **Active — unproven** | Prevent simultaneous protective mechanisms from creating un-resolvable governance block. | 30 | P8 + Judiciary | 2026-05-01 *(placeholder)* | Steady |
| T-015 | Demand Oracle Poisoning | High | **Active — unproven** | Distinguish genuine supply shocks from demand-side distortions in oracle signals. | 48 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Rising |
| T-016 | FAP Capture | **Critical** | **Active — unproven** | Prevent capture of the patch acceptance process itself. | 60 | P8 (Oversight) | 2026-05-01 *(placeholder)* | Rising |
| T-017 | Bootstrap Problem | **Critical** | **Active — unproven** | Resolve P-013 circular dependency without normalizing urgency bypass. | 45 | P8 + Founding Coalition | 2026-05-01 *(placeholder)* | Steady |
| T-018 | PCRP False-Trigger Exhaustion | High | **Active — unproven** | Prevent deliberate engineering of false triggers to exhaust the audit-cap and suppress real responses. Attestation-vector component addressed by P-024 (Annex AS, FC-080/081/082); false-trigger-at-scale residual remains with P-015. | 36 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Steady |
| T-019 | Demand-Context Flag Suppression | High | **Active — unproven** | Prevent strategically timed enforcement actions from suppressing legitimate PCRP activation. | 48 | P7 (Oracle) + Federated Ombuds | 2026-05-01 *(placeholder)* | Steady |
| T-020 | Epistemological Oracle Capture | **Critical** | **Active — unproven** | Prevent methodology-standard capture that biases oracle outputs without touching data directly. | 60 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Rising |
| T-021 | Algorithmic Oracle Capture | **Critical** | **Active — unproven** | Prevent AI/algorithmic manipulation of measurement systems that satisfies formal independence while being systematically biased. | 60 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Rising |
| T-022 | Electoral Cycle Capture | **Critical** | **Active — unproven** | Prevent a hostile successor government from repealing or hollowing out the constitutional architecture. | 60 | Constitutional Integrity Panel (CIP) | 2026-05-01 *(placeholder)* | Rising |
| T-023 | Pilot External Validity Collapse | Med-High | **Active — unproven** | Prevent scale-up based on pilot evidence that does not include adversarial or crisis conditions. | 32 | P8 + Oversight | 2026-05-01 *(placeholder)* | Steady |
| T-024 | Shared Storehouse Oracle-Failure During Active Rationing | **Critical** | **Active — unproven** | Define system behaviour when the oracle goes dark while Shared Storehouse is already active. Mechanism specified in design by P-022 ACTIVE + Annex AQ ACTIVE + FC-100 (Proposal 6, 2026-04-18); no field evidence yet. | 60 | P7 (Oracle) + REB | 2026-05-01 *(placeholder)* | Rising |
| T-025 | Investment and Capital-Deployment Shelter Capture | High | **Active — unproven** | Prevent protected-capital labels from becoming milking instruments for construction and capital-intensive sectors. | 48 | P2 (Housing/Flow) + P8 | 2026-05-01 *(placeholder)* | Steady |
| T-026 | Exit Denial | **Critical** | **Active — unproven** | Prevent federation actors from blocking or delaying a valid unit exit (FC-120/FC-121). Mechanism specified in design by the Founding Order exit protocol + Annex AI §3.4 automatic Plenum convocation + Annex AJ §4 severity 3 remedies; no field evidence yet. | 48 | Federated Ombuds | 2026-05-01 *(placeholder)* | Steady |
| T-027 | Subsidiarity Violation | High | **Active — unproven** | Prevent federation action at a scale larger than the smallest-competent scale under the Founding Order subsidiarity rule. Mechanism specified in design by Founding Order subsidiarity rule + Federated Ombuds §3.2 challenge process + Proportionality Principle; no field evidence yet. | 36 | Federated Ombuds | 2026-05-01 *(placeholder)* | Steady |
| T-028 | Essential-Sector Refusal Leverage | **Critical** | **Active — unproven** | Prevent survival-leverage conglomerates from holding the Essential Access floor hostage, including through compliance-masked degradation. Primary structural control P-050 (CASP) ACTIVE; P-047/P-048 related. | 72 | P1 (Essential Access) + P8 | 2026-05-01 *(placeholder)* | Rising |
| T-029 | Fiscal Sustainability and Currency Debasement | **Critical** | **Active — unproven** | Prevent the survival floor, Universal Stake, public rails, and governance operations from depending on inflation, hidden debt, prohibited tax bases, or uncosted Commons Return assumptions. | 72 | P5 (Public Finance / Flow) + P8 | 2026-06-08 | Rising |
| T-030 | Cyber Resilience and Availability Failure | **Critical** | **Active — unproven** | Prevent ransomware, key compromise, regional outage, provider dependency, or supply-chain compromise from interrupting survival-floor access. | 72 | P6 (Implementation / Security) + P1 (Essential Access) | 2026-06-08 | Rising |
| T-031 | Last-Resort Unenrolled Access Failure | **Critical** | **Active — unproven** | Prevent the survival floor from becoming reachable only by people who can enroll, hold a wallet, use digital credentials, or navigate ordinary administration. | 72 | P1 (Essential Access) + P3 (Identity) + Federated Ombuds | 2026-06-08 | Rising |
| T-032 | Monitoring Repurposing and Enforcement-Observation Failure | **Critical** | **Active — unproven** | Prevent protective monitoring from becoming a general-purpose surveillance, ranking, punishment, or coercion layer. | 72 | P8 (Oversight) + P3 (Identity) + Capture Dashboard operator | 2026-06-08 | Rising |
| T-033 | Founding Consent Evidence and Civil-Society Review Definition Failure | **Critical** | **Active — unproven** | Prevent the founding process from claiming legitimacy through vague consent standards, lower-threshold consultation, or friendly civil-society review. | 72 | Founding Coalition + adversarial panel member + civil-society reviewers | 2026-06-08 | Rising |

*Status definitions: **Proposed** = a response has been suggested but not yet formally incorporated. **Designed** = the mechanism is specified in the corpus but not yet active. **Active — unproven** = the mechanism is incorporated and referenced, but has no field evidence. **Partly tested** = some evidence exists from pilots or analogues, but not sufficient for resolution. **Evidence-backed** = sufficient external evidence to support the claim. **Resolved** = the threat has been addressed with evidence-backed controls AND residual risk is documented. No threat currently meets the Resolved threshold.*

---

## Detailed Threat Entries

### T-001 — Shadow Convertibility

- **Patch:** [P-001 — Shadow Convertibility Containment](../governance/Patch_Log.md) · [ANNEX_AB.md](../annexes/ANNEX_AB.md) · Patch status: **ACTIVE**
- **Layer:** Currency boundary / essential access
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×4×(6-3)=60
- **Owner:** P8 + Essential Access/Identity
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** off-ledger trades, proxy redemption, household or broker-mediated exchanges, and service-for-redemption deals.
- **Impact:** collapses the separation between survival access and market money, recreating leverage and inequality.
- **Detection:** cluster anomalies, synchronized redemption patterns, broker signatures, and consumption deviation scoring.
- **Mitigation direction:** Essential Access-only channels, non-delegable redemption, context-locked use, tolerance for low-level leakage, and broker-focused enforcement. → P-001 ACTIVE.
- **Leakage parameter:** FC-010 in `/founding/commitments.md` defines a 3%/annum routine operational target and 7%/annum systemic-review trigger. Surveillance-vs-containment verification continues as an Article VII annual audit responsibility.
- **Informal convertibility control:** Informal convertibility that does not touch the ledger is covered by Annex AJ ACTIVE with nine worked prohibited patterns across Essential Access/Flow, Voice-Service Record/resource, and Shared Storehouse/Flow boundaries. Annex AJ §4 Penalty Schedule binds detected violations to a 5.0× base multiplier (FC-040) at assumed 0.85 detection probability (FC-041), with severity factors per pattern (1.0×–2.0×) and escalation ladder for repeat and systemic violations. Enforcement Panel publishes Annual Deterrence Audit to test whether the EV-negative regime holds empirically. → See Annex AJ §4; Penalty Schedule.
- **P-045 addition:** P-045 adds a structural derivation formula grounding FC-010 thresholds in enforcement capacity (N÷P formula), designates audit participation as a qualified civic duty, and prevents resourcing limitations from being used to justify threshold increases.

---

### T-002 — Identity Exploits

- **Active patch:** [P-003 — Identity System Hardening](../governance/Patch_Log.md) · [ANNEX_AB.md](../annexes/ANNEX_AB.md)
- **Pre-ratification design:** [P-016 — Identity Asymmetric Error Doctrine](../governance/Patch_Log.md) · [ANNEX_AK.md](../annexes/ANNEX_AK.md) remains **PROPOSED** until founding adoption and pilot-calibrated rate confirmation.
- **Layer:** Identity / access / civic activation
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×4×(6-3)=60
- **Owner:** P3 (Identity)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** duplicate identities, account takeover, synthetic identities, proxy use, and recovery fraud.
- **Impact:** drains Essential Access, corrupts Voice and Service Record legitimacy, and can exclude vulnerable people if controls become too harsh.
- **Detection:** cross-signal deduplication, recovery anomaly review, impossible-use patterns, and staged assurance mismatches.
- **Mitigation direction:** four-tier identity assurance model, multi-evidence thresholding, no single universal credential, recovery safety ladder, survival-floor continuity during disputes. → P-003 ACTIVE.
- **Open problem:** prove that the published fraud/exclusion calibration works without making the system unusable for displaced, undocumented, digitally fragile, recovery/crisis, or other vulnerable people.
- **Evidence package:** [Identity and Recovery Evidence Test Package](./Identity_Recovery_Evidence_Test_Package.md)
- **Asymmetric Error Doctrine required (see P-016):** Annex AK now publishes bound starting values for FC-140 through FC-145 and proposed/reserved values for FC-146 through FC-150, but those values are not evidence-backed. Before scale-up, the founding coalition must formally adopt the doctrine, complete the Identity and Recovery Evidence Test Package, bind the remaining FC values, and document whether the pilot rates satisfy the published gates. Without that evidence, calibration remains subject to political pressure even when numbers are written down.
- **P-045 addition:** P-045 §7 adds the Asymmetric Default Rule: system bears burden of proof for exclusion decisions; 14-day independent review required before any Essential Access exclusion is final; exclusions without timely determination automatically reversed. P-045 §8 adds the Independent Identity Auditor: mandatory quarterly public reports on fraud/exclusion rates per tier and vulnerable category; absence of data for 2 consecutive quarters triggers Federated Ombuds referral; IIA appointment/removal requires Tier 2 amendment.

---

### T-004 — Incentive Collapse

- **Patch:** [P-002 — Incentive System Stabilization](../governance/Patch_Log.md) · [ANNEX_AB.md](../annexes/ANNEX_AB.md) · Patch status: **ACTIVE**
- **Layer:** Economic / behavioral / civic motivation
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×3×(6-3)=48 (updated)
- **Owner:** P4 (Voice & Service Record)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** universal Essential Access reduces desperation, but weak reward gradients can flatten initiative, excellence, and long-horizon effort; if the correction overreaches, Service Record can become rank, employability, pricing, civic-insider preference, or social-credit proxy.
- **Impact:** slow stagnation, mediocre output equilibrium, declining willingness to take on hard or high-skill work, or coercive pressure to perform visible contribution for non-civic advantage.
- **Detection:** participation decline, lower high-skill throughput, concentration of difficult work into narrow groups, weak innovation rates, non-civic requests for Service Record, proxy-inference success, and ordinary-reader confusion between civic eligibility and human worth.
- **Mitigation direction:** nonlinear reward curves, multi-channel rewards (Flow, opportunity, role-specific recognition), contribution-category equity, anti-gaming scoring, non-civic misuse enforcement, and proxy-inference controls. → P-002 ACTIVE.
- **Open problem:** define a real contribution model that rewards output without recreating coercive hierarchy, social credit, proxy employability, or burnout pressure.
- **Evidence package:** [Service Record Misuse Evidence Test Package](./Service_Record_Misuse_Evidence_Test_Package.md)
- **P-045 addition:** P-045 adds an enumerated contribution floor of six founding categories (primary caregiving, elder care, mutual aid, spiritual community leadership, unpaid household management, informal health work) with burden reversal — self-attestation accepted unless affirmatively disproved. Extension via Tier 2; removal requires Tier 1 + published impact assessment.

---

### T-005 — Governance Throughput Failure

- **Patch:** [P-005 — Governance Throughput Hardening](../governance/Patch_Log.md) · [ANNEX_AC.md](../annexes/ANNEX_AC.md) · Patch status: **ACTIVE**
- **Layer:** Decision flow / implementation latency
- **Severity:** High
- **Status:** Active — unproven
- **Risk Score:** 5×4×(6-4)=40
- **Owner:** P8 (Oversight)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** layered review, challenge rights, audit loops, and safety gates create cumulative delay. Dual attack surface: slowdown attacks (proposal flooding, minority veto loops) and speedup attacks (emergency bypass normalization, deliberation theater).
- **Impact:** essential decisions slow down, frustrations rise, emergency governance is normalized, anti-capture mechanisms are bypassed.
- **Detection:** decision latency, review backlog, unresolved appeals, emergency path overuse, rising informal workaround rates, deliberation quality metrics.
- **Mitigation direction:** P-005 ACTIVE: CRP dual-queue separation; minimum operational throughput floor; sequential emergency re-declaration cap; intake throttle with priority scoring; cross-quarter interim authorization bridge; decision quality audit metrics. See Patch Log P-005 and Annex AC1.
- **Open problem:** Operational sub-panel capture risk; throughput theater detection limits; interim bridge scope creep. Legacy single-Ombuds concentration risk inherited from the pre-federation design was the relevant P-008 concern.
- **Compound linkages:** T-005 × T-006 (PCRP window sync); T-005 × T-008 (PCRP as power locus); T-005 × T-001 (paralysis extends exploit windows).

---

### T-006 — Measurement Lag / Supply Shock

- **Patch:** [P-006 — Measurement Lag and Supply Shock Hardening](../governance/Patch_Log.md) · [ANNEX_AC.md](../annexes/ANNEX_AC.md) · Patch status: **ACTIVE**
- **Layer:** Measurement / oracle / scarcity logic
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×4×(6-3)=60
- **Owner:** P7 (Oracle) + P8
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** mixed-cadence oracle architecture creates exploitable measurement speed hierarchy. Two failure modes: lag-induced over-issuance (Essential Access issued into depleting pool) and lag-induced false restriction (Shared Storehouse maintained after recovery). First-responder authority undefined for inter-cycle shocks.
- **Impact:** over-issuance into real scarcity; prolonged unjustified restriction after recovery; black-market opportunity windows during cadence exploit gaps.
- **Detection:** forecast-vs-actual variance, Essential Access redemption velocity spikes, cross-category co-movement signals, fill-rate tracking, cross-publisher divergence.
- **Mitigation direction:** P-006 (status per Patch Log): sentinel indicator mandate (max lag by volatility class); Pre-Confirmation Response Protocol (PCRP) defining first-responder authority; Shared Storehouse unwind symmetry / recovery fast-track; cadence-adjusted U8 bridge (48h high-volatility). [Ambitious] Essential Access redemption velocity as native sentinel; cross-category demand surge detector. See Patch Log P-006 and Annex AC2.
- **Open problem:** PCRP scope must be a protected term under P-004. Inter-cycle gap compressed not eliminated. False PCRP activation risk requires false-trigger tracking.
- **Compound linkages:** T-006 × T-001 (cadence windows = black market windows); T-006 × T-005 (PCRP timing sync); T-006 × T-008 (PCRP REB authority = elite formation risk).

---

### T-007 — Political Definition Drift

- **Patch:** [P-004 — Definition Drift Protection](../governance/Patch_Log.md) · [ANNEX_AB.md](../annexes/ANNEX_AB.md) · Patch status: **ACTIVE**
- **Layer:** Governance semantics / hidden capture
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×4×(6-3)=60
- **Owner:** P8 (Oversight)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** redefine 'essential,' 'capacity,' 'contribution,' 'scarcity,' or 'clarification' in ways that alter outcomes without overt repeal.
- **Impact:** the architecture stays on paper while the survival floor shrinks or civic legitimacy skews.
- **Detection:** semantic impact audits, worked examples, quality-floor changes, and cumulative narrowing triggers.
- **Mitigation direction:** protected term classes, semantic effect test, public definition registry, anti-laundering rule, upward default on ambiguity. → P-004 ACTIVE. P-006 extends: 'supply shock' added as protected term. P-008 extends: qualification standard criteria added as protected specification.
- **Open problem:** institutionalize without creating a semantic bureaucracy that freezes useful iteration.
- **P-045 addition:** P-045 adds a founding seed list of 14 Tier 2 protected terms (survival, survival floor, personhood, Essential Access, Flow, Voice, Service Record, non-convertibility, coercion, scarcity, contribution, identity, dignity, capacity) locked at founding, with a mandatory adversarial review requirement before ratification. The registry is no longer empty at launch.

---

### T-008 — Bureaucratic Elite Formation

- **Patch:** [P-008 — Bureaucratic Elite Formation Hardening](../governance/Patch_Log.md) · [ANNEX_AC.md](../annexes/ANNEX_AC.md); related: [P-025 — Federated Ombuds Constitution](../governance/Patch_Log.md) · [ANNEX_AI.md](../annexes/ANNEX_AI.md) · Patch status: **ACTIVE**
- **Layer:** Civic / verification / oversight layer
- **Severity:** High
- **Status:** Active — unproven
- **Risk Score:** 4×4×(6-2)=64
- **Owner:** P8 + Oversight
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** three pipelines: (1) Verification Control Loop — Service Record → verifier eligibility → Service Record minting control; (2) Positional Entrenchment — low-Voice/high-Service Record actors hold enforcement and audit positions invisibly; (3) Expertise Pool Homogenization — 'demonstrated competence' requirements produce a professionally connected class. Proceeds entirely through legitimate behavior — no anomaly signals under current monitoring.
- **Impact:** capture of verification, oversight, and constitutional interpretation infrastructure. Does not directly harm Essential Access floor but undermines every other safeguard over time.
- **Detection:** Very low (D=2). Visible only in aggregate metrics over multi-year horizon. P-008 creates the first detection infrastructure: legibility gap audit, concentration dashboard, cohort overlap index.
- **Mitigation direction:** P-008 PROPOSED: legibility gap audit; Service Record sector ceiling specification (founding precondition); epistemic diversity requirement (three-axis); verification independence rule; cooling-off cohort rule; [ambitious] qualification standard governance; concentration dashboard with auto-escalation. See Patch Log P-008 and Annex AC3.
- **Evidence package:** [Service Record Misuse Evidence Test Package](./Service_Record_Misuse_Evidence_Test_Package.md)
- **Auditor-of-auditors design path:** The prior single-Ombuds design carried three load-bearing P-008 functions; if the Ombuds became an elite-formation site, all three failed simultaneously. P-025 (Federated Ombuds, Annex AI ACTIVE) addresses this in design through a five-node federation with FC-090 = 5, FC-091 = 4/5 supermajority, and an Oversight Assembly (5-of-7). The design distributes the auditor function across structurally dispersed sub-nodes (§1.2 dispersal criteria) and subjects the federation itself to external oversight for dispersal compliance (§5). "Who audits the auditors" is designed as: the Oversight Assembly audits dispersal; the Plenum audits operational determinations post-hoc; the public record (§6 publication commitment) audits voting patterns. Residual-risk path is informal coordination across nominally dispersed sub-Ombuds, mitigated but not eliminated by §5.1 institutional-health reporting on voting-pattern concentration.
- **Compound linkages:** T-008 × T-011 (elite formation creates narrative attack surface); T-008 × T-005 (PCRP authority); T-008 × T-006 (REB PCRP authority); T-008 × P-025 (federation is the structural answer to the auditor-of-auditors open problem).

---

### T-009 — Grace Exploitation Loop (Updated Entry)

- **Patch:** [P-009 — Grace Exploitation Loop Hardening](../governance/Patch_Log.md) · [ANNEX_AF.md](../annexes/ANNEX_AF.md); related: [P-024 — Attestation-at-Risk Stake Mechanism](../governance/Patch_Log.md) · [ANNEX_AS.md](../annexes/ANNEX_AS.md) · Patch status: **ACTIVE**
- **Layer:** Hardship / continuity / civic standing
- **Severity:** Med-High
- **Status:** Active — unproven
- **Risk Score:** 4×3×(6-2)=48
- **Owner:** P4 (Voice & Service Record)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** Four exploit classes: (1) Category Rotator — switches qualifying hardship category at each renewal to restart the clock; (2) Network Pause Ring — 8-person group rotates pause/contribution cycles, all maintaining high Service Record indefinitely; (3) Involuntary Unemployment Farmer — manufactured evidence of involuntary separation; (4) Civic Position Extender — uses pause to freeze Service Record above service eligibility threshold without ongoing contribution. T-009 is also the primary bypass route for P-008 cohort cooling controls.
- **Impact:** Institutional position preservation without genuine contribution. Elite formation (T-008) persists even when P-008 controls are nominally active. Civic pool diversity requirements (P-008 AC3.3) are satisfied on paper while the same coordination class maintains eligibility through coordinated pause.
- **Detection:** D=2 before P-009 (invisible — proceeds through legitimate channels). After P-009: cross-quarter history review, hardship attestation collusion graph (AF3), pool saturation monitoring (AF5), Service Record slow-decay trajectory analysis.
- **Mitigation direction:** P-009 (status per Patch Log): graduated renewal intensity (AF1); cross-quarter history review (AF2); hardship attestation collusion detection (AF3); Service Record slow-decay at 20% of normal (AF4); service pool pause-saturation monitoring (AF5); [ambitious] capability development pathway (AF6); [ambitious] T-009 × P-008 explicit closure (AF7). See Annex AF.
- **Evidence package:** [Service Record Misuse Evidence Test Package](./Service_Record_Misuse_Evidence_Test_Package.md)
- **Residual risk:** Involuntary unemployment category remains the most exploitable qualifying condition. Contains but does not eliminate low-level grace exploitation (1-2 quarter use by actors who don't genuinely need it) — accepted as system leakage, cost of frictionless access for genuine hardship.
- **Compound linkages:** T-009 × T-008 (primary bypass for P-008 — AF7 addresses it at design level; evidence remains pending). T-009 × T-011 (graduated renewal must be communicated via P-011 CFRL or becomes 'system punishes sick people' narrative attack).

---

### T-010 / T-011 — Narrative Attack Surface (Updated Entry)

- **Patch:** [P-011 — Narrative Attack Surface Hardening](../governance/Patch_Log.md) · [ANNEX_AD.md](../annexes/ANNEX_AD.md) · Patch status: **ACTIVE**
- **Layer:** Public communication / legitimacy perception
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×4×(6-2)=80
- **Owner:** P8 + Communications
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Note on risk score:** T-011 carries a D=2 (low detectability) score — narrative attacks are difficult to detect early and the damage (fixed hostile framing) is largely irreversible once established. The risk score of 80 is the highest in the register, reflecting the asymmetric nature of narrative risk: low cost to attack, high cost to defend, and time-bounded defense window.
- **Mechanism:** hostile framing fixes public perception before the system can demonstrate real-world outcomes. Six vectors: social credit framing (Voice and Service Record mischaracterized), elite capture narrative (T-008 provides factual hook), complexity-as-illegitimacy (large constitutional corpus), failure amplification (any operational event), technocracy framing (expertise requirements), and 'untested' (true pre-launch).
- **Impact:** legitimacy collapse prevents deployment or continuation even if the system is technically functioning correctly. Narrative failure is not recoverable through technical means — it requires sustained communication effort over months to years.
- **Detection:** D=2 (very low pre-launch). Post-launch: media sentiment monitoring, public understanding accuracy surveys (P-011 narrative health dashboard), hostile framing prevalence index. Narrative attacks detectable only after established.
- **Mitigation direction:** P-011 (status per Patch Log): RPCP (4-hour public communication SLA); pre-committed failure communication doctrine; Citizen-Facing Rights Layer; adversarial narrative simulation; hostile frame pre-emption registry; [ambitious] narrative health dashboard and pre-launch narrative audit. See Patch Log P-011 and Annex AD.
- **Open problem:** Pre-launch framing window (18+ months before launch) cannot be closed by protocol — only by early deployment of CFRL and pre-commitment doctrine. Narrative defense is bounded by actual performance: no communication architecture survives sustained operational failure.
- **Compound linkages:** T-011 × T-008 (elite formation provides factual basis for 'captured by professionals'; P-008 dashboard is the counter-narrative evidence base — P-008 is prerequisite for T-011 narrative defense). T-011 × T-006 (PCRP false triggers are predictable high-visibility events). T-011 × T-005 (governance paralysis generates narrative events).

---

## T-012 through T-017 — Interface and Coordination Threats

*New threats identified at patch interfaces during compound interface testing. All have controls specified via P-012 (Active — unproven).*

### T-012 — PCRP Poisoning via Oracle-Corroboration Collapse

- **Patch:** [P-012 — Interface Hardening and Deadlock Prevention](../governance/Patch_Log.md) · [ANNEX_AE.md](../annexes/ANNEX_AE.md) · Patch status: **ACTIVE**
- **Layer:** PCRP / oracle / measurement
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×3×(6-2)=60
- **Owner:** P7 (Oracle)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** Oracle manipulation attack simultaneously corrupts the sentinel indicator and corroboration source. PCRP two-source requirement is satisfied by two channels carrying the same corrupted data. System activates false emergency, publishes RPCP, then must retract — producing a more damaging narrative event than an unmitigated false trigger.
- **Impact:** False emergency declared publicly; RPCP retraction proves system can be made to announce fake emergencies; narrative damage exceeds operational harm.
- **Detection:** Oracle manipulation detection (existing); PCRP oracle independence certification failure (new — AE2.1).
- **Mitigation:** P-012 AE2.1 — structural independence requirement for PCRP corroboration sources.
- **Residual risk:** Two genuinely independent sources can still both be wrong. Independence is necessary but not sufficient for accuracy.

---

### T-013 — Compound Crisis Throughput Starvation

- **Patch:** [P-012 — Interface Hardening and Deadlock Prevention](../governance/Patch_Log.md) · [ANNEX_AE.md](../annexes/ANNEX_AE.md) · Patch status: **ACTIVE**
- **Layer:** Governance / throughput / multi-crisis
- **Severity:** High
- **Status:** Active — unproven
- **Risk Score:** 4×4×(6-3)=48
- **Owner:** P8 (Oversight)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** Multiple simultaneous crises of different types compete for P-005 throughput floor. All 5 floor slots consumed by one crisis type; second simultaneous crisis receives no guaranteed governance capacity. Unlike T-005 (single-thread paralysis), T-013 is multi-thread competition for a shared minimum-guarantee resource.
- **Impact:** Identity fraud response, enforcement decisions, or constitutional matters queue without guaranteed floor during compound emergencies — exactly when they are most needed.
- **Detection:** Categorical floor monitoring — track slot consumption by category per quarter.
- **Mitigation:** P-012 AE2.2 — categorical throughput minimums; single-category cap of 3 of 5.
- **Residual risk:** Categorical gaming — proposals reframed to occupy minimum slots without matching the category's genuine purpose.

---

### T-014 — Emergency Governance Triple Deadlock

- **Patch:** [P-012 — Interface Hardening and Deadlock Prevention](../governance/Patch_Log.md) · [ANNEX_AE.md](../annexes/ANNEX_AE.md) · Patch status: **ACTIVE**
- **Layer:** Governance / emergency / institutional
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×2×(6-3)=30
- **Owner:** P8 + Judiciary
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** Mandatory emergency decision simultaneously blocked by: (a) sequential emergency cap audit requirement (P-005); (b) CRP split defaulting to upward Tier 2 classification; (c) P-008 cohort cooling understaffing the audit body. No authorized actor has both authority and capacity to resolve within survivable timeframes. A designed attack could deliberately engineer all three conditions simultaneously.
- **Impact:** Mandatory emergency decision cannot be made; survival floor at risk if Level 4 continuity provisions are not explicitly activated during deadlock.
- **Detection:** Low (L=2) — requires simultaneous independent conditions. Deadlock auto-declaration (AE2.3) creates first detection mechanism.
- **Mitigation:** P-012 AE2.3 — emergency deadlock resolution protocol; survival floor bridge unconditional; 3-member arbitration panel within 6 hours.
- **Residual risk:** Second-generation deadlock (arbitration panel itself blocked) escalates to Level 5 structural review — no sub-Level-5 resolution path defined.

---

### T-015 — Demand-Side Oracle Poisoning

- **Patch:** [P-012 — Interface Hardening and Deadlock Prevention](../governance/Patch_Log.md) · [ANNEX_AE.md](../annexes/ANNEX_AE.md) · Patch status: **ACTIVE**
- **Layer:** Measurement / PCRP / issuance
- **Severity:** High
- **Status:** Active — unproven
- **Risk Score:** 4×3×(6-2)=48
- **Owner:** P7 (Oracle)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** Essential Access redemption velocity oracle and other demand-sensitive measurement systems cannot distinguish genuine supply shocks from demand surges caused by: Flow enforcement unwinds; mass re-verification campaigns; coordinated spending by issuance-capture entities before unwind. Demand spikes trigger supply-shortage responses (PCRP, reserve release) that are wrong for the actual condition.
- **Impact:** False PCRP activated during enforcement action; Essential Access issuance reduced during period when supply is actually adequate but demand is elevated. Double-deprivation risk: enforcement reduces Flow availability while false PCRP reduces Essential Access availability simultaneously.
- **Detection:** Demand-context register (new — AE2.4); cross-reference velocity signal against active enforcement action registry.
- **Mitigation:** P-012 AE2.4 — demand-context flag; Ombuds co-certification required for PCRP activation during demand-context period.
- **Residual risk:** Demand-context flag can be deliberately triggered by initiating a small enforcement action to suppress legitimate PCRP activation during a genuine supply shock. Mitigation: Ombuds co-certification process must assess whether demand-context flag is genuine before blocking PCRP.

---

### T-016 — Formal Acceptance Process Capture

- **Patch:** [P-013 — Formal Acceptance Process Integrity](../governance/Patch_Log.md) · [ANNEX_AG.md](../annexes/ANNEX_AG.md); related: [P-034 — Two-Key Architectural Precondition for Tier-1 Invariant Enforcement](../governance/Patch_Log.md) · [ANNEX_AV.md](../annexes/ANNEX_AV.md) · Status: **PROPOSED**
- **Layer:** Patch acceptance / governance evolution
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×3×(6-2)=60
- **Owner:** P8 (Oversight)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Note on threat class:** T-016 is a second-order threat — it targets the process that activates all other patches rather than the patches themselves. Capturing T-016 is equivalent to capturing the system's ability to evolve. A system whose acceptance process is captured cannot fix itself.
- **Mechanism:** Five exploit classes operating on the FAP: (1) Evidence Farming — piloting in favorable regions that produce clean metrics by construction, not by proof. (2) Sign-Off Deadlocker — coordinated bloc holds positions across two sign-off authorities, orchestrates procedurally correct disagreement, produces indefinite paralysis. (3) Urgency Exploiter — creates genuine operational pressure to waive evidence requirements; precedent established once becomes normalized. (4) Audit Captor — auditors who satisfy the conflict-of-interest rule but share the designers' interpretive framework (intellectual-cousin exploit). (5) Stagnation Filer — files technically valid documentation of 'why pilot remains impossible' indefinitely without resolution.
- **Impact:** No PROPOSED patches ever reach ACTIVE. The system is frozen at its current design state indefinitely. Or: patches reach ACTIVE through compromised evidence, producing controls that fail under adversarial conditions at scale. The FAP creates a new power locus — whoever controls the four sign-off authorities controls system evolution.
- **Detection:** D=2 (low) for evidence farming and stagnation (proceed through legitimate channels). D=3 for deadlocker (published refusals create a visible record). D=2 for audit captor (epistemic monoculture is invisible without diversity metrics). P-013's representativeness assessment, deadlock timeline, and FAP concentration controls are the primary detection mechanisms introduced.
- **Mitigation direction:** P-013 (status per Patch Log): pilot representativeness standard (AG1); deadlock resolution timeline (AG2); audit epistemic independence with adversarial member (AG3); anti-gaming constitutional upgrade to Tier 2 (AG4); stagnation quality standard with bootstrap review trigger (AG5); [ambitious] bootstrap resolution protocol (AG6); [ambitious] FAP concentration controls (AG7). See Annex AG.
- **Residual risk:** Evidence farming in stress-tested regions; CRP deadlock resolution congestion (T-016 × T-005 interface); definition-stage gaming of representativeness criteria. At root: the FAP cannot be made exploitation-proof without being made unusable. P-013 calibrates friction without paralysis.
- **Compound linkages:** T-016 × T-005 (deadlock resolution adds to CRP load; P-005 categorical floor must include FAP deadlock slot). T-016 × T-008 (intellectual-cousin audit capture — mitigated by AG3 adversarial member requirement). T-016 × T-011 (patch stagnation is the factual basis for 'the system cannot fix itself' narrative attack).

---

### T-017 — P-013 Bootstrap Problem (First-Mover Circular Dependency)

- **Patch:** [P-014 — P-013 Bootstrap Activation (One-Time Founding Instrument)](../governance/Patch_Log.md) · [ANNEX_AH.md](../annexes/ANNEX_AH.md); amended by [P-020 — Founding Window Extension](../governance/Patch_Log.md) · Status: **PROPOSED**
- **Layer:** Patch acceptance / system evolution
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 5×3×(6-3)=45
- **Owner:** P8 + Founding Coalition
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Note on threat class:** T-017 is a third-order threat: it does not attack the system directly (first order) or the patch acceptance process (second order, T-016). It attacks the ability to activate the patch that hardens the acceptance process. It is an existential threat to system evolution if unresolved — the entire PROPOSED patch stack is permanently frozen without it.
- **Mechanism:** P-013 governs the Formal Acceptance Protocol — the acceptance process that would normally activate it. Using the unhardened process to activate P-013 (the hardening patch) is structurally incoherent: the evidence standard, audit independence requirements, and sign-off concentration controls that P-013 introduces are not operative during its own activation. This creates three specific exploits: (1) Procedural Objection Loop — any actor can correctly object that the prior acceptance process does not satisfy P-013's standards, blocking activation indefinitely with technically valid objections. (2) Exception-as-Precedent — a founding exception to activate P-013, if not explicitly sealed, becomes authority for urgency bypass of other patches. (3) Founding Capture Window — during the prior activation process, before P-013's controls are operative, the sign-off cluster can be populated with intellectual cousins.
- **Impact:** Without resolution: all 10 PROPOSED patches remain frozen permanently. The system is locked at its current design state. With uncontrolled resolution: a founding exception normalizes urgency bypass, defeating P-013's core purpose before it takes effect.
- **Detection:** D=3 — the bootstrap problem is logically visible once the FAP and P-013 are examined together. It does not require adversarial action to surface.
- **Mitigation direction:** P-014 (status per Patch Log): 5-stage founding instrument with 60-day minimum pre-activation disclosure (per P-020/AH2), heightened 5-member panel with external conflict verification and adversarial member, substitute evidence standard (desk review + red-team analysis), permanent sealing with Tier 2 non-precedent statement, mandatory post-activation audit within 90 days. See Annex AH.
- **Residual risk:** Desk review case selection; founding panel capture during pre-activation window; post-activation audit self-reference if activation was compromised. All mitigated by adversarial member, external verification, and Formal Acceptance Protocol fallback during any suspension. P-020 (Founding Window Extension, Annex AH2) extends the pre-activation disclosure period to 60 days minimum and requires the adversarial panel member to be nominated by a body structurally opposed to the founding coalition's interests.
- **Compound linkages:** T-017 × T-016 (bootstrap paradox is the exploit surface T-016 bad actors use for indefinite delay). T-017 × T-011 (bootstrap paradox is a narrative attack surface — P-014 converts it into a transparency demonstration). T-017 × T-022 (a successful T-022 attack requires a new founding moment — T-017 recurs; recursive bootstrap is a second-order T-022 consequence).

---

## T-018 through T-019 — Resilience and Deadlock Threats

*Both are second-order attacks on existing mitigations rather than attacks on the system directly.*

### T-018 — PCRP False-Trigger Exhaustion Attack

- **Patch:** [P-015 — PCRP Attack Surface Hardening](../governance/Patch_Log.md) · [ANNEX_AP.md](../annexes/ANNEX_AP.md); related: [P-024 — Attestation-at-Risk Stake Mechanism](../governance/Patch_Log.md) · [ANNEX_AS.md](../annexes/ANNEX_AS.md) · Status: **PROPOSED**
- **Layer:** PCRP / governance / measurement
- **Status:** Active — unproven — attestation-vector residual addressed by P-024 / Annex AS (FC-080/081/082, 2026-04-18 Proposal 9 close-out). False-trigger-at-scale remains with P-015.
- **Severity:** High
- **Risk Score:** 4×3×(6-3)=36
- **Owner:** P7 (Oracle)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** P-006 introduces false-trigger tracking: 3 false PCRP activations within 4 quarters triggers a mandatory independent audit. A coordinated actor *deliberately engineers* 3 false triggers in rapid succession to (a) trigger an audit that consumes governance bandwidth, (b) drain the system's capacity to respond during a concurrent genuine crisis, or (c) exhaust the 3-trigger threshold so operators hesitate to activate PCRP during a real supply shock.
- **Impact:** PCRP hesitation during a genuine supply shock; governance bandwidth drain; audit as a distraction weapon during compound crises.
- **Detection:** D=3. Coordination-pattern flag on back-to-back PCRP activations within short windows detectable post-hoc.
- **Mitigation direction:** (1) False triggers accompanied by oracle manipulation evidence or coordination signatures do not count toward the 3-trigger cap — escalate directly to enforcement. (2) Cap reset available via independent audit finding of deliberate manipulation. (3) "Trigger exhaustion alert" fires when 2 of 3 cap slots consumed within a single quarter. → P-015 PROPOSED.
- **Open problem:** Distinguishing genuine oracle failure from engineered false trigger requires post-hoc forensics; real-time distinction is not reliable. Mitigation accepts this and applies escalation retroactively.
- **Compound linkages:** T-018 × T-006 (false-trigger exhaustion defeats PCRP during real supply shock). T-018 × T-013 (audit load from T-018 consumes CRP capacity during multi-crisis). T-018 × T-011 (publicly visible false-trigger manipulation is a narrative attack surface). T-018 × T-019 (compound execution of both is highest-risk PCRP attack surface).

---

### T-019 — Demand-Context Flag Suppression Attack

- **Patch:** [P-015 — PCRP Attack Surface Hardening](../governance/Patch_Log.md) · [ANNEX_AP.md](../annexes/ANNEX_AP.md) · Status: **Active — unproven** (Axis 1, per Patch Log) · **Pre-ratification** (Axis 2)
- **Layer:** PCRP / enforcement / measurement
- **Severity:** High
- **Status:** Active — unproven (P-015 / Annex AP; criteria in Annex AI §4.12)
- **Risk Score:** 4×3×(6-2)=48
- **Owner:** P7 (Oracle) + Federated Ombuds
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Note:** Identified as residual risk in T-015 (P-012 AE2.4) but requires separate registration — distinct mechanism and control profile.
- **Mechanism:** A coordinated actor *initiates a small, technically valid enforcement action* strategically timed to activate the demand-context flag, which then blocks PCRP Ombuds co-certification during a genuine supply shock. The enforcement action itself causes no significant harm; its purpose is flag activation to suppress emergency response.
- **Impact:** PCRP blocked during a genuine supply shock. Potential double-deprivation: enforcement reduces Flow availability while false demand-context flag reduces Essential Access availability simultaneously.
- **Detection:** D=2. The enforcement action is legitimate by construction; manipulation visible only by examining *timing* relative to supply indicators — requires cross-register monitoring not currently specified.
- **Mitigation direction:** (1) Ombuds co-certification during demand-context periods must explicitly assess whether the triggering enforcement action was manufactured or strategically timed — required step, not optional. (2) Cross-register timing monitor flags enforcement actions initiated within 48 hours of sentinel indicator movement. (3) If Ombuds finds deliberate flag manufacture, demand-context designation is lifted. → P-015 PROPOSED.
- **Open problem:** Criteria specified in Annex AI §4.12. Plenum assessment required within 24 hours; asymmetric default favors PCRP activation when evidence is inconclusive.
- **Compound linkages:** T-019 × T-015 (demand-context flag is the legitimate mitigation T-019 exploits). T-019 × T-008 (Ombuds determination quality depends on Ombuds independence). T-019 × T-018 (compound execution is highest-risk PCRP attack surface).

---

## T-020 through T-023 — Oracle and Epistemological Threats

*T-020 and T-021 target the measurement architecture's epistemological foundations. T-022 targets the political durability of the constitutional architecture. T-023 targets the evidentiary basis for scale-up decisions.*

### T-020 — Epistemological Oracle Capture

- **Patch:** [P-017 — Oracle Epistemological and Algorithmic Independence](../governance/Patch_Log.md) · [ANNEX_AL.md](../annexes/ANNEX_AL.md) · Status: **ACTIVE**
- **Layer:** Measurement / RCS / oracle accreditation
- **Severity:** Critical
- **Status:** Active — unproven — P-017 ACTIVE + Annex AL ACTIVE + FC-030/FC-031/FC-032/FC-033 bound; methodology pilots and adversarial standards review still required before evidence-backed resolution.
- **Risk Score:** 5×4×(6-3)=60
- **Owner:** P7 (Oracle)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** A well-resourced actor does not manipulate oracle outputs directly (addressed by T-012). Instead, they fund and shape the *methodological standards bodies* that define what counts as valid measurement for RCS accreditation. Three pipelines: (1) Standards Funding — sustained funding of the academic and technical bodies that define housing price indices, nutritional equivalence standards, and care-delivery measurement frameworks, gradually orienting methodology toward favorable outputs. (2) Peer Review Capture — dominating the journals and conference venues whose approval is required for methodological legitimacy. (3) Technical Vocabulary Absorption — introducing new technical terms through legitimate standards processes that encode favorable assumptions without appearing to change definitions. None of these require illegal action or direct oracle contact.
- **Impact:** Oracle outputs are systematically biased while satisfying all formal independence requirements. The measurement layer reports what the captor wants while appearing to report physical reality. Every downstream system (Essential Access issuance, Shared Storehouse activation, RCS confidence bands) is corrupted. T-012 (oracle independence) and T-015 (demand-context) protections become ineffective because the manipulation precedes the data, not the channel.
- **Detection:** D=2 (very low). Epistemic monoculture is invisible under current monitoring. Methodological homogeneity across formally independent oracle nodes is not currently tracked. The P-008 concentration dashboard (PROPOSED) tracks human diversity; it does not track *methodological* diversity.
- **Mitigation direction:** P-017 / Annex AL: (1) Methodology-class diversity mandate — RCS accreditation must include at least one measurement node using a fundamentally different methodology class (community-based participatory research vs. institutional statistical modeling vs. independent physical sampling). (2) Methodological divergence signal — systematic divergence between methodology classes is a first-order sentinel indicator, not a failure requiring suppression. (3) Directional-bias review — oracle cohorts must publish direction-of-error analysis so same-direction overstatement or understatement cannot evade FC-032 pairwise-correlation checks. (4) Standards-funding transparency requirement — any RCS accredited node must disclose funding sources for the methodological standards it relies on, with a three-year lookback. (5) Anti-monoculture review trigger — if three or more oracle nodes rely on the same standards body for a given category, an independent methodological review is required before that category can be used for Shared Storehouse activation. See Annex AL.
- **Definition-control design:** Defining "fundamentally different methodology class" is itself subject to definition drift (T-007). Annex AL Sections 1–3 address this in design by making "methodology class" and "fundamentally different" P-004 protected terms with three-component definition, three canonical classes, worked examples including disqualifying variants, and annual audit restricted to Sections 3–4 (Sections 1–2 require H-2). Numerical floors (N≥5, ≥3 classes, pairwise correlation ≤0.30, ≥1 adversarial seat) are bound in `/founding/commitments.md` under Tier 1 amendment authority. This still requires methodology pilots and adversarial standards review before evidence-backed resolution.
- **Compound linkages:** T-020 × T-007 (methodology-class definition is subject to definitional capture). T-020 × T-012 (structural oracle independence is necessary but not sufficient — epistemological independence is the missing layer). T-020 × T-008 (epistemic monoculture in oracle methodology parallels epistemic monoculture in oversight bodies). T-020 × T-011 (a revealed epistemological capture event would be a catastrophic narrative attack surface).

---

### T-021 — Algorithmic Oracle Capture

- **Patch:** [P-017 — Oracle Epistemological and Algorithmic Independence](../governance/Patch_Log.md) · [ANNEX_AL.md](../annexes/ANNEX_AL.md) · Status: **ACTIVE**
- **Layer:** Measurement / RCS / algorithmic systems
- **Severity:** Critical
- **Status:** Active — unproven — P-017 ACTIVE + Annex AL §4.2 (AI supply-chain concentration threshold = 2) + FC-030/FC-031 bound; physical sampling pilots and AI supply-chain audit required before evidence-backed resolution.
- **Risk Score:** 5×3×(6-2)=60
- **Owner:** P7 (Oracle)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** The measurement layer is a concentration point for AI-driven manipulation at scale. A sophisticated actor who controls training data, model weights, or fine-tuning pipelines for any RCS measurement system can produce oracle outputs that satisfy formal independence requirements (different institutions, different hardware, different personnel) while being systematically biased through shared upstream AI infrastructure. Three specific attack surfaces: (1) Training Data Poisoning — gradual corruption of the historical datasets used to train forecasting models, producing models that systematically underestimate or overestimate specific categories. (2) Model Weight Manipulation — supply chain compromise of pre-trained model components used across multiple oracle nodes. (3) Shared API Exploitation — multiple "independent" oracle nodes that rely on a common commercial AI API introduce a shared dependency that is not visible in institutional independence audits.
- **Impact:** Systematic measurement bias that passes oracle independence certification because the manipulation precedes the institutional layer. The oracle system reports false physical capacity with high internal consistency (making cross-publisher divergence detection fail). Shared Storehouse activations, Essential Access issuance, and PCRP triggers are all corrupted. This attack is increasingly realistic as measurement systems adopt ML pipelines.
- **Detection:** D=2. Standard organizational independence checks may miss upstream AI infrastructure, shared training data, and same-direction model bias. The attack is detectable only through cross-methodology comparison (T-020 mitigation), direct audit of AI supply chains, physical sampling, and Annex AL directional-bias review.
- **Mitigation direction:** P-017 / Annex AL (shared with T-020): (1) AI supply chain transparency requirement — any oracle node using ML or AI components must disclose: model provenance, training data sources, and any shared upstream dependencies with other oracle nodes. (2) Algorithmic independence certification — oracle independence audit must include explicit verification that no two corroborating oracle nodes share a common upstream AI model, training dataset, or fine-tuning pipeline. (3) Directional-bias review — formally independent nodes producing same-direction material error are treated as structurally dependent for the affected category. (4) Physical ground-truth requirement — at least one measurement node per high-volatility category must use direct physical sampling (not model-derived estimates) as its primary measurement method. See Annex AL.
- **Open problem (bounded in design):** AI supply chains are complex and often opaque. Annex AL §4.2 binds the AI concentration threshold to 2 nodes (tighter than the standards-body threshold of 3) and requires disclosure of upstream AI model, training dataset, and API dependencies. Physical sampling expense remains a practical constraint — Annex AL Section 3 Class 3 specifies canonical examples and permits phased scale-up where physical sampling is not initially feasible, with Shared Storehouse activation gated on methodology-class coverage being in place first.
- **Compound linkages:** T-021 × T-020 (both target the epistemological foundations of the measurement layer; P-017 addresses both). T-021 × T-012 (oracle independence requirements do not currently cover algorithmic supply chains). T-021 × T-006 (corrupted oracle outputs defeat measurement lag controls because the corruption precedes the signal). T-021 × T-016 (evidence farming for patch acceptance could use algorithmically biased measurement systems).

---

### T-022 — Electoral Cycle Capture

- **Patch:** [P-051 — Constitutional Integrity Panel (CIP)](../governance/Patch_Log.md) · [ANNEX_AM.md § AM8](../annexes/ANNEX_AM.md) · Status: **ACTIVE** (primary structural control); [P-065 — CIP Vacancy-Starvation Hardening](../governance/Patch_Log.md) · [ANNEX_AM.md § AM3 / § AM8.5–AM8.7](../annexes/ANNEX_AM.md) · Status: **ACTIVE** (anti-hollowing hardening); related: [P-018 — Electoral Cycle Resilience](../governance/Patch_Log.md) · [ANNEX_AM.md](../annexes/ANNEX_AM.md) · Status: **PROPOSED** (supplement)
- **Layer:** Constitutional architecture / political durability
- **Severity:** Critical
- **Status:** Active — unproven (P-051 / Annex AM §AM8 ACTIVE primary control; P-065 ACTIVE anti-hollowing hardening; P-018 PROPOSED supplement; no field evidence yet)
- **Risk Score:** 5×4×(6-3)=60
- **Owner:** Constitutional Integrity Panel (CIP)
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** The protocol assumes durable institutional commitment from the political coalitions that implement it. It does not model what happens when a hostile successor government — one that campaigned against the protocol — wins a democratic election and has both the political mandate and the institutional access to dismantle or hollow out the architecture. Four specific routes: (1) Direct Constitutional Repeal — the Tier 1 invariants are designed to resist this, but constitutional repeal via supermajority is legally possible. (2) Administrative Hollowing — the successor government does not formally repeal anything; it appoints adversarial actors to founding institutions, defunds oracle nodes, and stops publishing post-mortems until the system becomes non-functional without any formal change. (3) Jurisdictional Fragmentation — the successor government transfers authority to sub-jurisdictional entities that are not bound by the protocol. (4) Treaty Override — the successor government signs international agreements that require modifications to the non-convertibility architecture as a condition of participation, triggering Tier 3 changes that accumulate into Tier 2 impact (T-012 cumulative drift trigger, applied to treaty obligations). The amendment ladder (Tier 1/2/3) was calibrated for incremental drift, not organized political reversal.
- **Impact:** The most complete failure mode. If a hostile successor government succeeds in dismantling the protocol through legal means, the system has no recovery path short of a new founding moment — with all the bootstrap problems that entails (T-017 recurrence). The people who depended on Essential Access floor guarantees face sudden withdrawal after having structured their lives around the system.
- **Detection:** D=3. Electoral outcomes are public. The threat is visible in advance through normal political monitoring. The problem is not detection but *structural response*.
- **Mitigation direction:** P-051 ACTIVE (primary): the Constitutional Integrity Panel (Annex AM §AM8) is a 7-member independent body with staggered terms, constitutionally fixed funding (0.01% of annual Flow issuance), multi-body appointment structure that prevents governing-coalition control, a 5-of-7 quorum requirement for Tier 1 ratification, and automatic review triggers on institutional vacancy or publication lapse — the structural answer to administrative hollowing and concurrent-ratification entrenchment. P-065 ACTIVE (hardening): vacancy publication within 7 days, qualified-nominee transmission deadlines, 45-day fallback nomination, void mass appointments, below-quorum self-repair limits, no vacancy/nonconstitution waiver, dashboard publication fallback, and Ombuds integrity-report suspension. P-018 PROPOSED (supplement): (1) Entrenchment ladder. (2) Essential Access floor minimum persistence. (3) Administrative hollowing triggers. (4) Transition continuity protocol. See Annex AM.
- **Open problem:** A government with sufficient political will can repeal constitutional entrenchment. The designed defense buys time and raises the political cost; it cannot prevent determined repeal. The residual risk is that the protocol's durability depends on political culture as well as constitutional design. CIP repair authority must also remain conduct-based, published, challengeable, and subordinate to immediate Essential Access relief so it does not become a guardian class.
- **Compound linkages:** T-022 × T-011 (hostile electoral narrative is a T-011 attack that succeeds — T-022 is T-011 operating through democratic channels). T-022 × T-008 (elite formation inside founding institutions may accelerate administrative hollowing if the elite aligns with the successor government). T-022 × T-016 (a hostile government can capture the FAP by appointing aligned sign-off authorities). T-022 × T-017 (a successful T-022 attack requires a new founding moment — recursive bootstrap problem).

---

### T-023 — Pilot External Validity Collapse

- **Patch:** [P-019 — Pilot External Validity Gate](../governance/Patch_Log.md) · [ANNEX_AN.md](../annexes/ANNEX_AN.md) · Status: **Active — unproven** (Axis 1, per Patch Log) · **Pre-ratification** (Axis 2)
- **Layer:** Evidence base / scale-up decision-making
- **Severity:** Med-High
- **Status:** Active — unproven (P-019 / Annex AN)
- **Risk Score:** 4×4×(6-4)=32
- **Owner:** P8 + Oversight
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Note on impact:** The risk score understates the consequence of acting on false confidence. A scale-up decision based on a pilot that did not include crisis conditions is not a statistical error — it is a structural commitment that may be irreversible.
- **Mechanism:** T-016 (FAP Capture) addresses evidence farming — deliberately piloting in favorable regions. T-023 is distinct: an *honest* pilot that succeeds, is genuinely representative, and produces valid evidence — but in a pre-crisis period. The evidence base does not include: (a) economic shock or recession; (b) compound supply disruption across multiple categories simultaneously; (c) an organized political opposition campaign against the system; (d) a hostile successor government transition; (e) a technology failure in an oracle or identity system at scale. When the system is deployed at scale and the first real compound crisis hits, the pilot evidence does not apply. This is the fundamental problem of external validity in social systems: controlled conditions do not generalize to adversarial conditions.
- **Impact:** Scale-up proceeds based on Year 1 smooth-operation data. Year 3 encounters the first genuine compound crisis. The system's untested responses fail at scale in ways the pilot never revealed. The narrative attack (N-008: "too complex to work") is now supported by evidence.
- **Detection:** D=4 (relatively detectable — the absence of adversarial conditions in the pilot is visible in the evidence record). The problem is that the absence of adverse conditions looks like evidence of robustness, not evidence of an evidence gap.
- **Mitigation direction:** P-019 (status per Patch Log): (1) Stress-condition pilot gate — scale-up approval requires the pilot evidence record to include at least one of each: an economic stress event, a compound supply disruption, and a formal political opposition campaign, or explicit documentation of why each condition could not be tested and a designated substitute evidence source. (2) Red-team challenge window — before any scale-up vote, a mandatory 30-day adversarial challenge window allows independent reviewers to contest the external validity of the evidence base. (3) Crisis simulation requirement — the Annual Compound Simulation (this document) must include at least one compound-crisis scenario not previously simulated before each scale-up gate. See Annex AN.
- **Open problem:** It is not possible to pilot a hostile successor government or a large-scale economic recession deliberately. Some external validity gaps cannot be filled; they can only be acknowledged and planned for explicitly.
- **Compound linkages:** T-023 × T-016 (evidence farming produces favorable pilot data; T-023 is the honest-but-insufficient version of the same failure). T-023 × T-011 (scale-up failure after smooth pilot is a maximum-impact narrative attack). T-023 × T-022 (electoral cycle hostility is one of the hardest conditions to include in a controlled pilot).

---

## T-024 through T-025 — Operational and Systemic Threats

*T-024 is an operational void addressed in design by P-022. T-025 is addressed in design by P-023 (contract-commitment architecture).*

---

### T-024 — Shared Storehouse Oracle-Failure During Active Rationing

- **Patch:** [P-022 — Shared Storehouse Oracle-Failure Fallback Protocol](../governance/Patch_Log.md) · [ANNEX_AQ.md](../annexes/ANNEX_AQ.md) · Status: **ACTIVE**
- **Layer:** Shared Storehouse / oracle / scarcity management
- **Severity:** Critical
- **Status:** Active — unproven — P-022 ACTIVE + Annex AQ ACTIVE + FC-100 `ORACLE_QUORUM_LOSS_RESTORATION_WINDOW` = 14 days (Proposal 6 close-out, 2026-04-18); no field evidence yet
- **Risk Score:** 5×4×(6-3)=60
- **Owner:** P7 (Oracle) + REB
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Mechanism:** The existing oracle architecture (T-006 / P-006) addresses measurement lag and measurement manipulation. It does not address the specific failure mode where Shared Storehouse rationing is already active and the oracle system then fails completely — going dark, losing quorum, or entering an unresolvable dispute. In that state: (a) the system has no authoritative measurement of whether the shortage is improving, stable, or worsening; (b) the conservative default (maintain access during disputes) conflicts with the Shared Storehouse architecture (rationing was activated because supply is genuinely constrained); (c) there is no designated decision-maker with defined authority to escalate, de-escalate, or hold Shared Storehouse without oracle confirmation; (d) the 90-day Shared Storehouse maximum has no mechanism to renew or lapse when the renewal justification cannot be verified.
- **Impact:** Shared Storehouse rationing either continues without verification (potentially prolonging restriction after recovery) or lapses without verification (potentially removing rationing during ongoing shortage). Both outcomes are harmful; neither is currently governed. If oracle failure is deliberate (manufactured during active Shared Storehouse), the attacker can force either a false lapse or a false extension depending on which default the system applies.
- **Detection:** D=4 — oracle failure is observable; the gap is the absence of a decision protocol, not a hidden event.
- **Mitigation direction (P-022 / Annex AQ):** (1) *Shared Storehouse oracle-failure default:* when the oracle system loses quorum or enters unresolvable dispute while Shared Storehouse is active, Shared Storehouse holds at its current level — no escalation, no expansion. This is the conservative hold. (2) *48-hour first-responder window:* the Regional Executive Body (REB, P-006 first-responder authority) may use available non-oracle physical indicators (fill rates, distribution logs, vendor inventory reports) to issue a provisional continuation or provisional lapse within 48 hours. The REB decision is published immediately with the evidence base. (3) *72-hour governance handoff:* if the oracle system is not restored within 72 hours of failure, authority transfers to the emergency deadlock resolution protocol (P-012 AE2.3) for a binding decision. The survival floor bridge is unconditional throughout. (4) *Oracle restoration trigger:* when the oracle system begins restoration, a 24-hour preliminary reconciliation notice publishes restored-node status and visible discrepancies; after the 14-day FC-100 verification window, the final Reconciliation Review is published within 7 days. See Annex AQ.
- **Open problem (bounded in design):** The REB's use of non-oracle physical indicators remains a controlled exception. Annex AQ §2.1 bounds REB authority to hold-or-lapse decisions only (no scope expansion), requires immediate public publication with named decision-makers (§2.3), requires personal Service Record stake under the Annex AS attestation-at-risk mechanism, and subjects every REB decision to the §4.3 Reconciliation Review comparing against restored oracle readings. Residual normalization risk is bounded by the FC-100 14-day verification window enforcing public comparison before restored-oracle readings resume consensus-binding authority.
- **Compound linkages:** T-024 × T-006 (oracle failure during Shared Storehouse is the worst-case T-006 scenario — P-006 does not fully cover it). T-024 × T-014 (triple deadlock can coincide with oracle failure — survival floor bridge must be unconditional regardless). T-024 × T-011 (Shared Storehouse rationing continuing without oracle verification is a high-visibility narrative attack surface). T-024 × T-018 (deliberate oracle disruption timed to active Shared Storehouse is the highest-consequence T-018 compound).

---

### T-025 — Investment and Capital-Deployment Shelter Capture

- **Patch:** [P-023 — Contract-Commitment Architecture (Zero Exemptions)](../governance/Patch_Log.md) · [ANNEX_AR.md](../annexes/ANNEX_AR.md) · Status: **Active — unproven** (Axis 1, per Patch Log) · **Pre-ratification** (Axis 2)
- **Layer:** Flow monetary architecture / protected capital / productive investment
- **Severity:** High
- **Status:** Active — unproven — P-023 (contract-commitment architecture, zero exemptions); no field evidence yet
- **Risk Score:** 4×4×(6-3)=48
- **Owner:** P2 (Housing/Flow) + P8
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** The former demurrage-exemption framing is superseded, but the capture route remains: any protected-capital, project-account, escrow, term-pool, infrastructure, or public-benefit label can become a classification that capital-intensive sectors exploit. Firms apply for protected status not to build productive capacity but to park Flow, control source bases, or avoid Commons Return review. Four specific mechanisms: (1) *Project account cycling* — a firm maintains a continuous chain of overlapping project accounts, each nominally productive. (2) *Escrow window abuse* — firms use escrow windows to hold balances during periods of market uncertainty. (3) *Infrastructure designation capture* — lobbying to broaden "infrastructure" to include rent-extraction assets. (4) *Subsidiary fragmentation* — a single economic actor fragments into multiple legal entities, each holding a protected project status.
- **Impact:** Protected-capital treatment shelters passive accumulation among sophisticated actors while ordinary households, workers, and small enterprises cannot access equivalent relief. This recreates the wealth concentration the protocol was designed to prevent, through the mechanism designed to preserve productive investment.
- **Detection:** D=3 — investment channel utilisation is observable in aggregate; cycling and fragmentation patterns are detectable with cross-entity tracking.
- **Mitigation design (P-023 / P-066):** Investment-channel exemptions are removed as a shelter category. Long-horizon projects use contract-commitment architecture: commissioning authority holds capital in milestone escrow; releases trigger only on independently verified physical deliverables; contractor holds only current working capital; source-base and beneficial-control review follows Annex D where Commons Return is implicated. No sector-specific carve-outs. Force majeure freeze available for verified external delays only when independently certified, time-limited, and capped. All key terms P-004-protected.
- **Evidence package:** [Commons Return and Universal Stake Evidence Test Package](./Commons_Return_Universal_Stake_Evidence_Test_Package.md) plus Annex AR project-finance simulation and procurement red team.
- **Residual risk:** (1) Force majeure certification panel is a new oracle (T-020/T-021 capture vector); mitigated by P-017 independence standards. (2) Deployment timeline pressure on commissioning authorities may incentivize rushed contracting; mitigated by procurement integrity check requirement. (3) Universal scope at deeply nested subcontractor levels is declared policy; enforcement requires cross-entity tracking — D=3 assumed, but may be harder in practice for complex project structures. (4) Novel infrastructure categories not anticipatable at founding may not fit the output-milestone standard; changes require H-2 amendment (P-004 protection).
- **Compound linkages:** T-025 × T-001 mitigated by P-023 (no investment-channel exemptions means no above-ledger boundary manipulation through exemption classification). T-025 × T-007 mitigated by P-023.10 (P-004 protection on all P-023 key terms). T-025 × T-008 mitigated by P-023.6 (sector identity irrelevant to escrow eligibility — no classification to capture).
- **Companion control (designed, pilot-gated):** P-072 — the [Productive Status Register](./Productive_Status_Register.md) closes the residual *cross-instrument and temporal* T-025 variant P-023 does not reach: the same activity classified "productive" by the looser of two tests to claim both Flow issuance (ANNEX_X) and the Commons Return exemption (ANNEX_D §D3), and the timing attack of exiting productive use after Flow mints but before settlement (settle-forward escrow: the exemption vests only after verified continued productive use). Status: Proposed (PROPOSED per Patch Log); binds nothing until its evidence test passes.

---

## T-008 / T-009 / T-016 / T-017 Capture Triad Extended

*The capture triad is now a quadruplet:*

| Threat | Route | Patch | Design effect |
| :--- | :--- | :--- | :--- |
| T-008 | Elite formation captures institutions | P-008 | P-008 |
| T-009 | Grace exploitation bypasses T-008 controls | P-009 | P-009 (+ AF7 specifies the T-008 bypass control; evidence remains pending) |
| T-016 | Acceptance process capture prevents patches from reaching ACTIVE | P-013 | P-013 |
| T-017 | Bootstrap paradox prevents P-013 from activating | P-014 | Unblocks the entire sequence |

**The quadruplet now has a designed activation sequence: P-014 → P-013 → P-009/P-008 → P-006. Each step is intended to clear the path for the next, but the sequence still requires activation, adversarial testing, and residual-risk review before any evidence-backed resolution claim.**

---

## Register Management Rules

- Do not mark a threat resolved because the idea sounds good. Resolution requires evidence, tests, and a residual-risk statement.
- Every patch must name the threat it addresses and the new risk it introduces.
- If two patches conflict, the conflict belongs in the patch log and must be resolved explicitly in the Humane Constitution.
- Threat IDs remain stable across versions. The wording may sharpen; the ID should not drift.
- **Active — unproven** status indicates a control is integrated into the document set but not evidence-backed. **Resolved** requires defined test passage, pilot evidence, or audit results with documented residual risk.
- Compound threat linkages must be logged in both threat entries when identified.
- Detectability scores must be reviewed quarterly — new monitoring infrastructure (e.g., P-008 concentration dashboard) may raise D scores and reduce risk scores.

### Review Cadence, Staleness & Lapse Log

This register carries the same review discipline its constitutional anchors require (Annex B; Annex C §C-4, §C-5). Every threat carries a named Owner, a Last-reviewed date, and a Trend indicator, and each is bound to a fixed review cadence.

**Per-threat review cadence.** Each threat is reviewed on a quarterly cadence: its I/L/D scores are re-scored, its evidence package is checked against its validity date, and its Owner, Last-reviewed date, and Trend are refreshed. Continuous monitoring and monthly control-health review run more frequently than this decision cycle; a system-wide red-team exercise and constraint review run annually. The Trend indicator is recorded independently of the static score, because a threat may hold the same number while its residual risk rises, falls, or holds steady — an escalating threat (capture, narrative, oracle, Sybil-at-scale) must not present the same frozen figure as a contained one. Any contradiction between Trend and score is itself a finding and is reconciled at review.

**Staleness rule — stale evidence counts as no evidence.** A threat whose Last-reviewed date has aged past its review cadence, or whose evidence package has lapsed its validity date without renewal, is **stale**. A stale threat reverts to a **degraded, unverified status**: its prior score and its controls lose standing until the review is completed and fresh evidence is filed. No threat may be reported as having passing controls while any of its cadence obligations are overdue. A register that silently freezes manufactures the false assurance this discipline exists to prevent, so staleness is treated as a reportable condition, not a quiet gap.

**Lapse Log.** Missed reviews and lapsed evidence packages are recorded here in an audit-visible table, escalated to Independent Oversight, and cleared only when the review or evidence is refreshed. The log is part of the public record; an empty log is a claim that must itself be verifiable, not an assumption.

| Date noted | Threat ID | Lapse type (missed review / lapsed evidence) | Owner at lapse | Degraded status applied | Escalated to | Resolved date |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| _none recorded_ | — | — | — | — | — | — |

### Owner Vacancy and No-Silent-Waiver Rules

These rules mirror Annex C §C-2 (roles and ownership) and §C-7 (readiness gates).

**No accountability role sits empty.** When a threat's Owner role is vacated, it must be reassigned to a named successor within 10 business days. While the role is vacant, accountability defaults upward to Independent Oversight, which holds it as interim Owner and records the vacancy. If the role remains unfilled past the deadline, every threat under it reverts to a degraded, unverified status until a successor is named, and the lapse is escalated to oversight and recorded in the Lapse Log. The same time-to-reassign and default-escalation rule applies to any delegated control or test/monitoring ownership beneath the Threat Owner.

**No silent waiver of a pilot or scale gate.** Any exception to a pilot or scale-readiness gate for a registered threat requires a named approver with authority to grant it, a written justification, an explicit expiry after which the exception lapses, and an audit-visible record of the waiver. An unrecorded or anonymous waiver is void, and any gate it purported to clear is treated as unmet. This keeps gate exceptions visible and time-bounded rather than allowing launch pressure to erode the readiness discipline silently.

---

## Complete Register Summary

| ID | Title | Severity | Status | Patch | Score | Owner | Last reviewed | Trend |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| T-001 | Shadow Convertibility | **Critical** | **Active — unproven** | P-001 | 60 | P8 + Essential Access/Identity | 2026-05-01 *(placeholder)* | Steady |
| T-002 | Identity Exploits | **Critical** | **Active — unproven** | P-003 | 60 | P3 (Identity) | 2026-05-01 *(placeholder)* | Rising |
| T-004 | Incentive Collapse | **Critical** | **Active — unproven** | P-002 | 48 | P4 (Voice & Service Record) | 2026-05-01 *(placeholder)* | Steady |
| T-007 | Definition Drift | **Critical** | **Active — unproven** | P-004 | 60 | P8 (Oversight) | 2026-05-01 *(placeholder)* | Rising |
| T-005 | Governance Throughput | High | **Active — unproven** | P-005 | 40 | P8 (Oversight) | 2026-05-01 *(placeholder)* | Steady |
| T-006 | Measurement Lag | **Critical** | **Active — unproven** | P-006 | 60 | P7 (Oracle) + P8 | 2026-05-01 *(placeholder)* | Rising |
| T-008 | Bureaucratic Elite | High | **Active — unproven** | P-008 | 64 | P8 + Oversight | 2026-05-01 *(placeholder)* | Rising |
| T-009 | Grace Exploitation | Med-High | **Active — unproven** | P-009 | 48 | P4 (Voice & Service Record) | 2026-05-01 *(placeholder)* | Steady |
| T-011 | Narrative Surface | **Critical** | **Active — unproven** | P-011 | 80 | P8 + Communications | 2026-05-01 *(placeholder)* | Rising |
| T-012 | PCRP Oracle Poisoning | **Critical** | **Active — unproven** | P-012 | 60 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Rising |
| T-013 | Throughput Starvation | High | **Active — unproven** | P-012 | 48 | P8 (Oversight) | 2026-05-01 *(placeholder)* | Steady |
| T-014 | Triple Deadlock | **Critical** | **Active — unproven** | P-012 | 30 | P8 + Judiciary | 2026-05-01 *(placeholder)* | Steady |
| T-015 | Demand Oracle Poisoning | High | **Active — unproven** | P-012 | 48 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Rising |
| T-016 | FAP Capture | **Critical** | **Active — unproven** | P-013 | 60 | P8 (Oversight) | 2026-05-01 *(placeholder)* | Rising |
| T-017 | Bootstrap Problem | **Critical** | **Active — unproven** | P-014 / P-020 | 45 | P8 + Founding Coalition | 2026-05-01 *(placeholder)* | Steady |
| T-018 | PCRP False-Trigger Exhaustion | High | **Active — unproven** | P-015 | 36 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Steady |
| T-019 | Demand-Context Suppression | High | **Active — unproven** | P-015 | 48 | P7 (Oracle) + Federated Ombuds | 2026-05-01 *(placeholder)* | Steady |
| T-020 | Epistemological Oracle Capture | **Critical** | **Active — unproven** | P-017 | 60 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Rising |
| T-021 | Algorithmic Oracle Capture | **Critical** | **Active — unproven** | P-017 | 60 | P7 (Oracle) | 2026-05-01 *(placeholder)* | Rising |
| T-022 | Electoral Cycle Capture | **Critical** | **Active — unproven** | P-051 (CIP, ACTIVE, primary) / P-065 (ACTIVE hardening) / P-018 (PROPOSED) | 60 | Constitutional Integrity Panel (CIP) | 2026-05-01 *(placeholder)* | Rising |
| T-023 | Pilot External Validity Collapse | Med-High | **Active — unproven** | P-019 | 32 | P8 + Oversight | 2026-05-01 *(placeholder)* | Steady |
| T-024 | Shared Storehouse Oracle-Failure During Active Rationing | **Critical** | **Active — unproven** | P-022 | 60 | P7 (Oracle) + REB | 2026-05-01 *(placeholder)* | Rising |
| T-025 | Investment and Capital-Deployment Shelter Capture | High | **Active — unproven** | P-023 / P-066 | 48 | P2 (Housing/Flow) + P8 | 2026-06-08 | Steady |
| T-026 | Exit Denial | **Critical** | **Active — unproven** | Founding Order `exit_protocol.md` + Annex AI §3.4 + Annex AJ §4 | 48 | Federated Ombuds | 2026-05-01 *(placeholder)* | Steady |
| T-027 | Subsidiarity Violation | High | **Active — unproven** | Founding Order `subsidiarity_rule.md` + Annex AI §3.2 | 36 | Federated Ombuds | 2026-05-01 *(placeholder)* | Steady |
| T-028 | Essential-Sector Refusal Leverage | **Critical** | **Active — unproven** | P-050 (CASP, ACTIVE, primary); related P-047/P-048 | 72 | P1 (Essential Access) + P8 | 2026-05-01 *(placeholder)* | Rising |
| T-029 | Fiscal Sustainability and Currency Debasement | **Critical** | **Active — unproven** | P-066 (Commons Return and Universal Stake fiscal gate) | 72 | P5 (Public Finance / Flow) + P8 | 2026-06-08 | Rising |
| T-030 | Cyber Resilience and Availability Failure | **Critical** | **Active — unproven** | P-067 | 72 | P6 (Implementation / Security) + P1 (Essential Access) | 2026-06-08 | Rising |
| T-031 | Last-Resort Unenrolled Access Failure | **Critical** | **Active — unproven** | P-068 | 72 | P1 (Essential Access) + P3 (Identity) + Federated Ombuds | 2026-06-08 | Rising |
| T-032 | Monitoring Repurposing and Enforcement-Observation Failure | **Critical** | **Active — unproven** | P-069 | 72 | P8 (Oversight) + P3 (Identity) + Capture Dashboard operator | 2026-06-08 | Rising |
| T-033 | Founding Consent Evidence and Civil-Society Review Definition Failure | **Critical** | **Active — unproven** | P-070 | 72 | Founding Coalition + adversarial panel member + civil-society reviewers | 2026-06-08 | Rising |

Highest risk score: T-011 (Narrative Surface, score 80). Hardest to detect: T-008, T-016, T-019, T-020, T-021, T-032, and T-033 (D=2). 33 total IDs — 31 active, 2 retired (T-003, T-010). All active threats are at `Active — unproven` status. These counts are design-state counts, not evidence-backed resolution counts. T-022's primary structural control P-051 (Constitutional Integrity Panel, ANNEX_AM §AM8) and P-065 anti-hollowing hardening are ACTIVE, with P-018 remaining PROPOSED as a supplement; the threat is therefore `Active — unproven` rather than `Designed`. T-020 and T-021 still require measurement pilots and adversarial methodology review before any evidence-backed resolution claim. T-025 still needs parameter binding and legal/economic testing. T-026 and T-027 remain dependent on founding legitimacy, exit rehearsal, and aggregate-drift monitoring. T-029 through T-033 are structurally registered through P-066 through P-070, but cannot support scale or legitimacy claims until their evidence packages produce passing results and residual-risk updates.

---

## Retired and Reserved IDs

| ID | Status | Reason |
| :--- | :--- | :--- |
| T-003 | **RETIRED** | Scope fully absorbed into T-002 (Identity Exploits) before formal register versioning. ID permanently retired. |
| T-010 | **RENUMBERED** | Consolidated with T-011 (Narrative Attack Surface). References to T-010 resolve to T-011. |

---

### T-026 — Exit Denial

- **Patch:** [P-026 — Founding Order: Subsidiarity, Consent & Exit](../governance/Patch_Log.md) · [Founding Order](../../founding/order/README.md) · [ANNEX_AI.md](../annexes/ANNEX_AI.md) · [ANNEX_AJ.md](../annexes/ANNEX_AJ.md) · Status: **ACTIVE**
- **Layer:** Governance / federation-scope layer
- **Severity:** Critical
- **Status:** Active — unproven (Founding Order `exit_protocol.md` + Annex AI §3.4 + Annex AJ §4; no field evidence yet)
- **Risk Score:** 4×3×(6-2)=48
- **Owner:** Federated Ombuds
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** A federation subset (captured CRP faction, captured enforcement body, or coordinated infrastructure operators) attempts to block, delay, or corrupt a valid exit event by: (a) refusing to publish the exit proposal on the federation record; (b) withholding Essential Access during the FC-121 730-day unwind, in violation of the unconditional Essential Access-continuity rule; (c) preemptively withdrawing federation infrastructure before day 730+90; (d) filing pretextual enforcement actions against exiting-unit representatives to suppress the exit vote; (e) manipulating the exit impact assessment beyond factual description; (f) refusing to update the drift chain with the exit row; (g) blocking re-apportionment of CRP seats held by delegates from the exiting unit.
- **Impact:** Defeats the fundamental non-coercion guarantee. An exit right that cannot be exercised is a trapdoor with a false label. A federation that denies exit while retaining the appearance of offering it converts to soft occupation; every internal protection becomes contingent on the captors' willingness to honor it — the exact failure mode the Founding Order was designed to prevent.
- **Detection:** Low / hard-to-detect (D=2). Blatant exit events are public drift-chain entries with Ombuds attestation, and the most overt attack surfaces (infrastructure withdrawal, Essential Access withholding) are measurable in real time — but the genuinely dangerous form is slow-motion exit denial, which proceeds through individually compliant conduct and is hard to detect, consistent with the D=2 score.
- **Mitigation:** Founding Order `exit_protocol.md §Exit Denial — T-026` enumerates prohibited conduct. Annex AI §3.4 auto-convenes the Federated Ombuds Plenum on exit-denial complaints; Plenum finding under FC-091 (4-of-5) triggers Annex AJ §4 severity 3 (Institutional) penalties plus order of specific performance compelling the federation action. Unwind window auto-extends by the period of denial at federation cost (not exiting-unit cost).
- **Residual risk:** Slow-motion exit denial — federation action that is individually within the rules but cumulatively obstructive (e.g., slow publication, narrowly compliant impact-assessment language that misleads without violating). Mitigated by the drift-chain audit trail and the 180-day deliberation window that gives time for procedural integrity claims to be raised and adjudicated before the vote.
- **Compound linkages:** T-026 × T-008 (captured elite formation in federation-level bodies is the primary attack surface for exit denial; P-025 Federated Ombuds dispersal is the counter). T-026 × T-022 (hostile successor government attempting exit denial to prevent resource loss). T-026 × T-007 (definition drift around "valid exit vote" standards — bounded by P-004 + publication of FC-120 threshold in Tier 1 architecture).

---

### T-027 — Subsidiarity Violation

- **Patch:** [P-026 — Founding Order: Subsidiarity, Consent & Exit](../governance/Patch_Log.md) · [Founding Order](../../founding/order/README.md) · [ANNEX_AI.md](../annexes/ANNEX_AI.md) · Status: **ACTIVE**
- **Layer:** Governance / scale-decision layer
- **Severity:** High
- **Status:** Active — unproven (Founding Order `subsidiarity_rule.md` + Annex AI §3.2 challenge; Proportionality Principle; no field evidence yet)
- **Risk Score:** 3×3×(6-2)=36
- **Owner:** Federated Ombuds
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Steady
- **Mechanism:** The federation (or a region acting above its scale competence) decides a matter that is properly resolvable at a smaller scale, imposing uniform rules where scale-appropriate differentiation is competent. Pathway vectors: (a) expanding the "federation-scale by construction" list without Tier 1 amendment; (b) using soft exceptions (cross-unit externality claims, measurement coordination claims) as a routine basis for federation preemption rather than last-resort; (c) declining to express federation rules as floors-plus-local-customization where floor-expression would suffice; (d) inconclusive subsidiarity challenge reviews resolving toward the larger scale despite the default-against-escalation rule; (e) slow erosion of the three-prong competence test through precedent accumulation.
- **Impact:** The protocol drifts toward centralization without any single amendment being visibly centralizing. Ostrom's principle 2 (rules match local conditions) is violated by default. Units that would have handled matters competently are preempted, reducing local competence over time (principle-erosion feedback loop). The federation's default reach grows; every article that depends on local adaptation (Article III capacity measurement, Article V enterprise scaling, Article I enforcement) loses calibration to local context.
- **Detection:** Medium (D=2). Requires cross-scale comparison over time — which smaller-scale decisions were preempted when they could have been competent? The Federated Ombuds §4.3 cohort concentration tracking extended to decision-scale concentration (§4.3 "concentration of decision venue at federation scale") provides the detection infrastructure.
- **Mitigation:** The subsidiarity rule (`subsidiarity_rule.md §Three-Prong Competence Test`) is Tier 1 protected. Federation-scale-by-construction list is exhaustive and Tier 1-locked; extensions require 7-of-9 amendment. Soft-exception invocations are logged and audited. The Proportionality Principle is enforceable by Ombuds appeal: a federation action adopting a uniform rule where a floor would suffice is challengeable, and the Plenum (Annex AI §3.2) may remand for reconsideration under FC-091.
- **Residual risk:** The three-prong test applied at the margin can accommodate reasonable-seeming expansion over many individual decisions. Mitigation is aggregate monitoring — the Ombuds §4.3 federation-decision-concentration report is an Article VII metric published annually; significant drift toward federation-scale decision venue is itself a trigger event.
- **Compound linkages:** T-027 × T-022 (electoral cycle capture often operates through subsidiarity violation — a captured federation adopts uniform rules that would otherwise be local prerogatives). T-027 × T-008 (centralization of decision venue is an elite-formation vector; decisions concentrated in federation bodies produce concentrated expertise pools). T-027 × T-007 (definition drift around "federation-scale by construction" categories; bounded by explicit enumeration).

### T-028 — Essential-Sector Refusal Leverage

- **Patch:** [P-050 — Compliant Alternative Supplier Pre-Registration (CASP)](../governance/Patch_Log.md) · [ANNEX_AT.md § AT6.6](../annexes/ANNEX_AT.md) · Patch status: **ACTIVE** (primary structural control); related: [P-047 / P-048](../governance/Patch_Log.md) · [ANNEX_AT.md §AT2–AT6.5](../annexes/ANNEX_AT.md)
- **Layer:** Essential-sector supply / survival-floor delivery / external dependency
- **Severity:** Critical
- **Status:** Active — unproven (P-050 / Annex AT §AT6.6 ACTIVE primary control; P-047/P-048 related; no field evidence yet)
- **Risk Score:** 4×4×(6-2)=72
- **Owner:** P1 (Essential Access) + P8
- **Last reviewed:** 2026-05-01 *(placeholder)*
- **Trend:** Rising
- **Summary:** A conglomerate controlling essential-sector supply (food, energy, medicine, logistics, data infrastructure) refuses to participate in the protocol's Essential Access delivery unless granted exemptions, reduced obligations, or political concessions. The threat is not market exit — it is survival leverage: holding the CSM floor hostage to extract constitutional concessions, including through lawful-looking degradation while the actor remains formally compliant.
- **Mechanism:** The actor controls a chokepoint in a CSM-delivery chain. Refusal to supply, credible threat of refusal, or compliance-masked degradation produces emergency political pressure to grant carve-outs, waive concentration rules, extend favorable contract terms, hide procurement terms, or suspend Annex AT floors. Each concession normalizes leverage as a negotiating tool. Hidden routes include data withholding, standards-body obstruction, PBM formulary friction, affiliated fallback capture, workforce poaching, litigation, reserve-access paperwork, and selective regional degradation.
- **Detection:** D=2 — overt refusal events are observable, but distinguishing genuine operational difficulty from strategic leverage requires the supply-chain concentration metrics in the Capture Dashboard, the compliance-masked refusal exposure metric, and the Essential_Sector_Refusal_Test_Package audit trail.
- **Mitigation direction:** P-050 ACTIVE (primary): Compliant Alternative Supplier Pre-Registration (CASP — ANNEX_AT §AT6.6) with pre-committed automatic-activation contracts and annual capacity verification; activation is automatic on trigger, not discretionary. Related P-047/P-048 (ANNEX_AT §AT2–AT6.5) supply: public receiver authority and compulsory licensing triggers as fallback, strategic reserve floors (FC-185–FC-201), multi-supplier mandates, and beneficial-ownership tracing through subcontractors.
- **Residual risk:** Strategic reserves are provisional (FC-185–FC-193 reserved). CASP pre-committed contracts remove the need for political will in the primary mitigation path; political will is now required only for the fallback public receiver authority if CASP alternatives also fail or refuse. Oracle and measurement capture (ACL-009, ACL-012) could allow a conglomerate to influence supply-chain concentration metrics and avoid Watch/Critical classification. Compliance-masked refusal can also keep headline contract performance intact while patients, regions, fallback operators, or vulnerable cohorts lose actual continuity. No pilot evidence yet.
- **Compound linkages:** T-028 × T-007 (definitional capture of "essential sector" and "survival leverage" determines when AT6.5 triggers). T-028 × T-001 (refusal leverage exploits the same Essential Access delivery chain that shadow convertibility targets). T-028 × T-022 (a captured government may decline to invoke public receiver authority).

### T-029 — Fiscal Sustainability and Currency Debasement

- **Patch:** [P-066 — Commons Return and Universal Stake Fiscal Sustainability Gate](../governance/Patch_Log.md) · [ANNEX_D.md](../annexes/ANNEX_D.md) · [Commons Return and Universal Stake Evidence Test Package](./Commons_Return_Universal_Stake_Evidence_Test_Package.md) · Patch status: **ACTIVE**
- **Layer:** Public finance / Flow issuance / Essential Access funding
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 4×4×(6-2)=72
- **Owner:** P5 (Public Finance / Flow) + P8
- **Last reviewed:** 2026-06-08
- **Trend:** Rising
- **Summary:** The system promises an unconditional survival floor, public rails, resilience reserves, governance operations, and Universal Stake. If those promises are not costed against real resources and reliable public-return sources, the system will drift toward inflation, hidden debt, ordinary-labor taxation, survival-access erosion, or politically managed scarcity.
- **Mechanism:** Commons Return receipts underperform; land, resource, license, platform, or succession bases are overestimated; Essential Access costs rise faster than source receipts; Flow issuance backfills deficits without real productive capacity; Universal Stake becomes politically hard to reduce; public bodies hide future obligations off-ledger; or officials reintroduce taxes on ordinary labor, basic household exchange, modest savings, or survival access under new names.
- **Impact:** The survival floor becomes fiscally performative rather than real. Inflation or debasement quietly taxes the poor and fixed-income households. Hidden debt binds future residents without consent. Revenue pressure turns the system against the ordinary households it was designed to protect.
- **Detection:** D=2 — formal budgets can balance while real-resource shortages, inflation, deferred maintenance, unpaid obligations, or prohibited-base migration accumulate slowly. Detection requires a costed fiscal model, source-by-source revenue reporting, inflation/debasement tolerance, incidence analysis, lockbox reporting, and independent audit.
- **Mitigation direction:** P-066 ACTIVE: Annex D now replaces routine progressive net-worth demurrage with Commons Return and Universal Stake, defines protected ordinary use, names eligible source bases, creates a Public Commons Lockbox, requires a fiscal adequacy gate, and states that taxes are not declared unnecessary unless a costed model proves it. The Commons Return and Universal Stake Evidence Test Package is the required test path.
- **Residual risk:** Commons Return may still be insufficient, volatile, hard to assess, or politically captured. Valuation and beneficial-control review can become surveillance or bureaucracy. Residual taxes or fees may remain necessary; the honest control is to name them, cost them, screen them against prohibited bases, and block scale claims until the burden is public.
- **Compound linkages:** T-029 × T-006 (bad capacity measurement corrupts cost models). T-029 × T-016 (patch process may accept optimistic fiscal evidence). T-029 × T-022 (successor governments may hollow the fiscal model while preserving promises). T-029 × T-028 (essential-sector refusal can create sudden cost spikes). T-029 × T-001 (shadow conversion can distort demand and revenue assumptions).

### T-030 — Cyber Resilience and Availability Failure

- **Patch:** [P-067 — Cyber Resilience and Availability Gate](../governance/Patch_Log.md) · [Cyber Resilience and Availability Evidence Test Package](./Cyber_Resilience_Availability_Evidence_Test_Package.md) · Patch status: **ACTIVE**
- **Layer:** Control-plane availability / Essential Access delivery / public rails
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 4×4×(6-2)=72
- **Owner:** P6 (Implementation / Security) + P1 (Essential Access)
- **Last reviewed:** 2026-06-08
- **Trend:** Rising
- **Summary:** A ransomware event, breached key, supply-chain implant, regional outage, cloud/provider dependency, DDoS, or payment-rail failure interrupts the survival floor. The constitutional text may remain correct while people cannot redeem food, medicine, shelter, transit, or urgent care.
- **Mechanism:** An attacker or infrastructure failure disables eligibility, redemption, provider settlement, public status publication, delivery dispatch, identity verification, or cash/offline conversion. A compromised key issues false approvals, denies valid access, suppresses dashboard warnings, or blocks recovery. A supply-chain implant preserves apparent compliance while weakening recovery, offline fallback, or vulnerable-cohort delivery. A provider or cloud dependency fails at the same time as local network access, making last-known-valid state unusable.
- **Impact:** The survival floor becomes technically unreachable; providers refuse service because settlement is unavailable; vulnerable users are excluded behind aggregate uptime claims; emergency actors trade privacy, concessions, or hidden debt to restore service; public confidence collapses because a guaranteed floor fails like an ordinary website.
- **Detection:** D=2 — ordinary uptime dashboards can show recovery while specific cohorts, regions, providers, or categories remain cut off. Detection requires CSM-category continuity metrics, vulnerable-cohort reporting, key-compromise logs, offline reconciliation error rates, provider-settlement continuity, and public incident disclosure.
- **Mitigation direction:** P-067 ACTIVE: the Cyber Resilience and Availability Evidence Test Package requires a critical-service inventory, ransomware continuity drill, key-compromise and emergency-rotation drill, offline/analog continuity drill, regional failover drill, and supply-chain/dashboard integrity drill. Implementation Drift Audit Package remains the tamper-evidence home; T-030 is the availability and recovery home.
- **Residual risk:** Offline fallback can become fraud-prone or privacy-invasive. Emergency key rotation can concentrate authority. Manual provider settlement can create hidden bailout pressure. No field evidence yet proves recovery time, offline access, key custody under breach, or supply-chain resilience.
- **Compound linkages:** T-030 × T-002 (identity outage or credential loss can exclude vulnerable persons). T-030 × T-006 (capacity dashboards may fail during the same shock they need to measure). T-030 × T-024 (Shared Storehouse oracle failure plus rail outage can break rationing continuity). T-030 × T-028 (essential-sector actors can exploit outage dependency). T-030 × T-022 (successor government can underfund resilience while preserving formal promises).

### T-031 — Last-Resort Unenrolled Access Failure

- **Patch:** [P-068 — Last-Resort Unenrolled Access Gate](../governance/Patch_Log.md) · [Last-Resort Unenrolled Access Evidence Test Package](./Last_Resort_Unenrolled_Access_Evidence_Test_Package.md) · Patch status: **ACTIVE**
- **Layer:** Essential Access delivery / identity boundary / analog floor
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 4×4×(6-2)=72
- **Owner:** P1 (Essential Access) + P3 (Identity) + Federated Ombuds
- **Last reviewed:** 2026-06-08
- **Trend:** Rising
- **Summary:** The constitution promises that identity is never a precondition for survival access, and the corpus specifies Tier 0, emergency access, delivery sufficiency, and pseudonymous tokens. The remaining failure is practical: a person who cannot enroll, cannot hold a credential or wallet, cannot safely disclose identity, cannot use digital interfaces, or cannot navigate ordinary administration may still have no working route to food, water, shelter, medicine, urgent care, transit, or emergency stabilization.
- **Mechanism:** Staff require a phone, card, app, QR code, stable address, biometric, document, persistent token, future enrollment, or advocate-mediated proof as the practical condition of access. Physical access points are too far away, closed, language-inaccessible, disability-inaccessible, or unknown. Trusted intermediaries expose recipient identity or are selected by the protocol rather than trusted by the community. Analog reconciliation becomes a shadow registry. Fraud fear pushes the survival tier back into individual surveillance.
- **Impact:** The floor becomes formally unconditional but operationally conditional. The people most likely to need the floor — undocumented, displaced, disabled, elderly, digitally fragile, trafficked, abused, homeless, incarcerated-transition, crisis, rural, or conscience-refusing persons — become least able to reach it. Public claims of universality become false.
- **Detection:** D=2 — ordinary enrollment, recovery, delivery, or uptime metrics can look healthy while the never-enrolled are invisible. Detection requires no-credential access drills, trusted-intermediary route tests, analog reconciliation audits, abandonment counting, dignity interviews, and Delivery Sufficiency Register rows for Tier 0 access points.
- **Mitigation direction:** P-068 ACTIVE: the Last-Resort Unenrolled Access Evidence Test Package requires access-point mapping, no-credential intake drills, trusted-intermediary drills, analog reconciliation privacy tests, abuse/diversion drills, and dignity interviews before any claim that Essential Access is universal in practice.
- **Residual risk:** An open floor can be abused; a tightly verified floor can exclude. Aggregate anomaly controls may miss organized brokers, while stronger controls can become surveillance. Trusted intermediaries can be captured. Analog records can become a shadow registry. No field evidence yet proves the last-resort path works without identity coercion.
- **Compound linkages:** T-031 × T-002 (identity hardening can still exclude people who never enroll). T-031 × T-030 (offline fallback can fail for people outside normal rails). T-031 × T-028 (providers may refuse no-account or no-settlement access). T-031 × T-007 (definitions of "access" can drift from reachable help into paperwork availability). T-031 × T-022 (hostile successors may preserve formal Tier 0 text while starving physical routes).

### T-032 — Monitoring Repurposing and Enforcement-Observation Failure

- **Patch:** [P-069 — Monitoring Repurposing Gate](../governance/Patch_Log.md) · [Monitoring Administrative Safety Packet](./Monitoring_Administrative_Safety_Packet.md) · [Monitoring Repurposing Evidence Test Package](./Monitoring_Repurposing_Evidence_Test_Package.md) · Patch status: **ACTIVE**
- **Layer:** Enforcement monitoring / privacy boundary / capture dashboard / identity and delivery controls
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 4×4×(6-2)=72
- **Owner:** P8 (Oversight) + P3 (Identity) + Capture Dashboard operator
- **Last reviewed:** 2026-06-08
- **Trend:** Rising
- **Summary:** The system needs monitoring to enforce non-convertibility, fraud limits, delivery sufficiency, capacity truth, provider continuity, cyber availability, and capture detection. The same monitoring can become the surveillance layer the system opposes if data collected for protection is reused to locate, rank, punish, exclude, pressure, or coerce people.
- **Mechanism:** Redemption, identity, Tier 0, Service Record, delivery, provider, oracle, dashboard, cyber, or enforcement data is collected for a narrow purpose and later joined, retained, subpoenaed, sold, leaked, relabeled, or repurposed. Small cells, time/location patterns, repeated routes, provider metadata, device identifiers, exception logs, and individual flags make people or vulnerable cohorts identifiable. Operating offices grade their own monitoring performance or suppress adverse signals.
- **Impact:** Survival access becomes conditional on being watched. People avoid help to avoid exposure. Employers, landlords, officials, providers, or hostile governments gain a practical ranking and control tool. Public dashboards become a source of false legitimacy while coercive data infrastructure grows underneath.
- **Detection:** D=2 — dashboards can appear privacy-preserving while raw data, joins, exceptions, access roles, vendors, retention changes, and cleared flags create hidden surveillance capacity. Detection requires a Monitoring Purpose Register, data-lane assignment, raw-access log standard, purpose-creep red team, administrative-expansion drill, lawful-pressure scenario, linkability/re-identification test, office-separation drill, individual-flag appeal drill, retention audit, cleared-flag reuse test, and coercive-use scenario.
- **Mitigation direction:** P-069 ACTIVE: the Monitoring Administrative Safety Packet and Monitoring Repurposing Evidence Test Package require every monitoring stream to have a named purpose, minimum-data rule, data lane, raw-access rule, retention rule, access role, independent reviewer, appeal path, cleared-flag expiration, vendor controls, lawful-pressure limits, and explicit reuse prohibition before claims that enforcement monitoring is bounded and non-surveillant.
- **Residual risk:** Monitoring always creates power. Aggregation can hide harms; individual flags can punish the innocent; deletion can conflict with auditability; raw records can be pressured by lawful authorities or captured insiders. This patch is a gate, not proof.
- **Compound linkages:** T-032 × T-001 (non-convertibility enforcement can become household surveillance). T-032 × T-002 (identity fraud controls can become identity surveillance). T-032 × T-031 (last-resort access records can become a shadow registry). T-032 × T-008 (monitoring offices can become an expert class). T-032 × T-022 (hostile successors can preserve formal privacy language while repurposing raw data).

### T-033 — Founding Consent Evidence and Civil-Society Review Definition Failure

- **Patch:** [P-070 — Founding Legitimacy Prerequisite Definition Gate](../governance/Patch_Log.md) · [Founding Consent and Civil-Society Review Evidence Test Package](./Founding_Consent_Civil_Society_Review_Evidence_Test_Package.md) · Patch status: **ACTIVE**
- **Layer:** Founding legitimacy / consent evidence / independent review
- **Severity:** Critical
- **Status:** Active — unproven
- **Risk Score:** 4×4×(6-2)=72
- **Owner:** Founding Coalition + adversarial panel member + civil-society reviewers
- **Last reviewed:** 2026-06-08
- **Trend:** Rising
- **Summary:** The corpus already names founding consent, objection, exit, vulnerable-population consent, and civil-society review. The remaining failure is definitional: founders can claim consent from low participation, treat non-binding consultation as activation authority, or select outside reviewers who are friendly, dependent, prestigious but unaccountable, or unable to block the founding claim.
- **Mechanism:** The founding team uses vague phrases such as community support, public consultation, no objections, or independent review without publishing a consent evidence packet. A lower consultation threshold is substituted for the Founding Order's binding 2/3 participation and 2/3 affirmative resident-personhood rule. Reviewers are selected through funder networks, vendor ties, prestige organizations, or founder-adjacent advisors; dissenting findings are merged, summarized, delayed, or treated as non-binding.
- **Impact:** The founding process becomes legitimacy theater. A technically elegant constitution can be imposed by actors who benefit from activation, and affected people may lose practical refusal, abstention, or exit while the public record says consent was obtained.
- **Detection:** D=2 — public documents and meeting attendance can look legitimate while consent evidence and reviewer independence remain weak. Detection requires threshold certification, opt-out and exit-cost proof, aid-nonconditioning proof, pressure survey, coercion complaint log, reviewer qualification register, public challenge log, and independent findings.
- **Mitigation direction:** P-070 ACTIVE: the Founding Consent and Civil-Society Review Evidence Test Package reconciles the consent threshold conflict, defines admissible consent evidence, defines civil-society reviewer qualification, and blocks Gate A if consent or review cannot be independently evidenced.
- **Residual risk:** No founding process can prove perfect legitimacy. People can consent under hard circumstances, civil-society bodies can share class interests without formal conflicts, and reviewers can miss informal pressure. P-070 makes these risks visible and falsifiable; it does not remove the bootstrap problem.
- **Compound linkages:** T-033 × T-017 (bootstrap legitimacy can be asserted before evidence exists). T-033 × T-022 (future hostile actors can exploit a weak founding record). T-033 × T-026 (exit can be formally available but materially costly). T-033 × T-027 (central actors can claim local consent while real local competence was bypassed). T-033 × T-008 (reviewer networks can become a civil-society expert class).
