# Threat Register

**Running adversarial control layer aligned to the Humane Constitution · Updated: Session 8 (Red Team — T-018 through T-023 added; T-001/T-002/T-017 updated; Register Disclosure Protocol introduced)**

---

**Purpose.** This register tracks the adversarial risks identified during the current hardening cycle and aligns them to the Humane Constitution. It is the running control layer for red-team work, not a replacement for the constitution.

**Status key.** 
- **OPEN** = not yet structurally addressed. 
- **PARTIAL** = mitigation path defined but not fully integrated/tested.
- **ACTIVE** = mitigation integrated, requires simulation and tuning. 
- **RESOLVED** = closed after evidence-backed testing.

**Scoring convention.** Risk Score = I × L × (6 − D) where I = Impact, L = Likelihood, D = Detectability (each 1–5; higher D = more detectable = lower risk multiplier).

**Disclosure policy.** This register is bifurcated per the Register Disclosure Protocol (see `docs/annexes/ANNEX_AO.md`). Specific detection thresholds, timing windows, and operational exploit paths are published only in the Restricted Annex, available to auditors, oversight panels, and adversarial panel members. This public version records threat categories, mechanisms, mitigations, and risk scores. The restricted version adds precise calibration data. Both versions must remain consistent; any discrepancy is treated as a T-007 definition-drift event.

---

## Open Problems Dashboard

The single working list of unsolved threats. Read this first before scanning the rest of the register. A threat appears here if it is `OPEN`, `PARTIAL`, or otherwise unresolved at the structural level. `ADDRESSED*` items below the dashboard exist in the broader summary but are not active design loopholes.

### Fully open (no structural mitigation yet)

| ID | Title | Severity | Score | Why it matters in one line | Proposed patch |
| :--- | :--- | :--- | :--- | :--- | :--- |
| T-022 | Electoral Cycle Capture | **Critical** | 60 | Hostile successor government repeals or hollows out the constitutional architecture. | P-018 (Annex AM — to be written) |
| T-019 | Demand-Context Flag Suppression | High | 48 | Strategically timed enforcement actions suppress legitimate PCRP activation. | P-015 (Annex AP — to be written) |
| T-025 | Demurrage Sector-Capture via Investment Channel | High | 48 | Flow investment exemptions become milking instruments for capital-intensive sectors. | P-023 |
| T-023 | Pilot External Validity Collapse | Med-High | 32 | Scale-up rests on pilot evidence that did not include adversarial or crisis conditions. | P-019 (Annex AN — to be written) |

### Partial (mitigation path defined; not fully integrated or tested)

| ID | Title | Severity | Score | What still needs work |
| :--- | :--- | :--- | :--- | :--- |
| T-001 | Shadow Convertibility | **Critical** | 60 | Above-ledger residual: scale-arbitrage containment without authoritarian overreach. |
| T-002 | Identity Exploits | **Critical** | 60 | Non-coercive identity stack remains the largest unresolved precondition. |
| T-007 | Political Definition Drift | **Critical** | 60 | Semantic capture defenses depend on a registry that is not yet enforced in production. |
| T-004 | Incentive Collapse | **Critical** | 48 | Real contribution model that rewards output without recreating coercive hierarchy. |
| T-018 | PCRP False-Trigger Exhaustion | High | 36 | Attestation-vector closed by P-024; false-trigger-at-scale residual still on P-015. |

### Open sub-problems with no T-ID

These appear inside detailed entries below as "Open problem:" lines and are not yet promoted to the priority table:

- **Identity-stack fraud calibration** — fraud tolerance that does not exclude displaced, undocumented, or digitally fragile people (under T-002).
- **Contribution model definition** — reward output without coercive hierarchy or burnout pressure (under T-004).
- **Semantic bureaucracy risk** — institutionalize definition control without freezing useful iteration (under T-007).
- **Subsidiarity aggregate drift** — individual escalations look reasonable while cumulative drift toward federation-scale venue is substantial (under T-008/T-027).

### Maintenance rules for this dashboard

- Move a threat off the dashboard only when its row in `Summary by Priority` flips to `ADDRESSED` AND the closing patch has reached `ACTIVE` in `Patch_Log.md`.
- When a threat is fully `RESOLVED` (evidence-backed), strike it through here in one update cycle, then remove on the next.
- Newly added threats go on this dashboard at creation, not at resolution.

---

## Summary by Priority

| Threat ID | Title | Severity | Status | Core Point | Score |
| :--- | :--- | :--- | :--- | :--- | :--- |
| T-001 | Shadow Convertibility | **Critical** | **PARTIAL** | Contain scalable Essential Access↔Flow arbitrage without authoritarian overreach. | 60 |
| T-002 | Identity Exploits | **Critical** | **PARTIAL** | Treat identity as a permanent adversarial surface; preserve the survival floor. | 60 |
| T-004 | Incentive Collapse | **Critical** | **PARTIAL** | Guarantee dignity while keeping contribution materially and psychologically real. | 48 |
| T-005 | Governance Throughput Failure | High | **ADDRESSED*** | Prevent review layers from becoming bottlenecks that trigger bypass normalization. | 40 |
| T-006 | Measurement Lag / Supply Shock | **Critical** | **ADDRESSED*** | Force graceful degradation when reality data is noisy, incomplete, or lagged. | 60 |
| T-007 | Political Definition Drift | **Critical** | **PARTIAL** | Stop semantic capture through definitions, classifications, and technical relabeling. | 60 |
| T-008 | Bureaucratic Elite Formation | High | **ADDRESSED*** | Prevent process insiders from becoming a durable managerial class. | 64 |
| T-009 | Grace Exploitation Loop | Med-High | **ADDRESSED*** | Keep humane recovery paths from becoming durable exploit channels. | 48 |
| T-010 | Narrative Attack Surface | **Critical** | **ADDRESSED*** | Make the system intelligible before hostile framing fixes public perception. | 80 |
| T-011 | Narrative Attack Surface | **Critical** | **ADDRESSED*** | (See T-010/T-011 combined entry.) | 80 |
| T-012 | PCRP Oracle Poisoning | **Critical** | **ADDRESSED*** | Prevent single-source oracle corruption from triggering false public emergency. | 60 |
| T-013 | Throughput Starvation | High | **ADDRESSED*** | Prevent multi-crisis competition from starving guaranteed governance capacity. | 48 |
| T-014 | Triple Deadlock | **Critical** | **ADDRESSED*** | Prevent simultaneous protective mechanisms from creating un-resolvable governance block. | 30 |
| T-015 | Demand Oracle Poisoning | High | **ADDRESSED*** | Distinguish genuine supply shocks from demand-side distortions in oracle signals. | 48 |
| T-016 | FAP Capture | **Critical** | **ADDRESSED*** | Prevent capture of the patch acceptance process itself. | 60 |
| T-017 | Bootstrap Problem | **Critical** | **ADDRESSED*** | Resolve P-013 circular dependency without normalizing urgency bypass. | 45 |
| T-018 | PCRP False-Trigger Exhaustion | High | **PARTIAL** | Prevent deliberate engineering of false triggers to exhaust the audit-cap and suppress real responses. Attestation-vector component addressed by P-024 (Annex AS, FC-080/081/082); false-trigger-at-scale residual remains with P-015. | 36 |
| T-019 | Demand-Context Flag Suppression | High | **OPEN** | Prevent strategically timed enforcement actions from suppressing legitimate PCRP activation. | 48 |
| T-020 | Epistemological Oracle Capture | **Critical** | **ADDRESSED** | Prevent methodology-standard capture that biases oracle outputs without touching data directly. | 60 |
| T-021 | Algorithmic Oracle Capture | **Critical** | **ADDRESSED** | Prevent AI/algorithmic manipulation of measurement systems that satisfies formal independence while being systematically biased. | 60 |
| T-022 | Electoral Cycle Capture | **Critical** | **OPEN** | Prevent a hostile successor government from repealing or hollowing out the constitutional architecture. | 60 |
| T-023 | Pilot External Validity Collapse | Med-High | **OPEN** | Prevent scale-up based on pilot evidence that does not include adversarial or crisis conditions. | 32 |
| T-024 | Shared Storehouse Oracle-Failure During Active Rationing | **Critical** | **ADDRESSED** | Define system behaviour when the oracle goes dark while Shared Storehouse is already active — no current resolution path. Closed by P-022 ACTIVE + Annex AQ ACTIVE + FC-100 (Proposal 6, 2026-04-18). | 60 |
| T-025 | Demurrage Sector-Capture via Investment Channel | High | **OPEN** | Prevent Flow investment-channel exemptions from becoming milking instruments for construction and capital-intensive sectors. | 48 |
| T-026 | Exit Denial | **Critical** | **ADDRESSED** | Prevent federation actors from blocking or delaying a valid unit exit (FC-120/FC-121). Closed by the Founding Order exit protocol + Annex AI §3.4 automatic Plenum convocation + Annex AJ §4 severity 3 remedies. | 48 |
| T-027 | Subsidiarity Violation | High | **ADDRESSED** | Prevent federation action at a scale larger than the smallest-competent scale under the Founding Order subsidiarity rule. Closed by Founding Order subsidiarity rule + Federated Ombuds §3.2 challenge process + Proportionality Principle. | 36 |

*\* ADDRESSED = mitigation patch designed (PROPOSED) but not yet ACTIVE. Status will update to ACTIVE when patches are integrated into the Humane Constitution.*

---

## Detailed Threat Entries

### T-001 — Shadow Convertibility
- **Layer:** Currency boundary / essential access
- **Severity:** Critical
- **Status:** PARTIAL
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** off-ledger trades, proxy redemption, household or broker-mediated exchanges, and service-for-redemption deals.
- **Impact:** collapses the separation between survival access and market money, recreating leverage and inequality.
- **Detection:** cluster anomalies, synchronized redemption patterns, broker signatures, and consumption deviation scoring.
- **Mitigation direction:** Essential Access-only channels, non-delegable redemption, context-locked use, tolerance for low-level leakage, and broker-focused enforcement. → P-001 ACTIVE.
- **Open problem (resolved):** ~~define the acceptable leakage threshold~~ — resolved by FC-010 in `/founding/commitments.md`: 3%/annum routine operational target; 7%/annum systemic-review trigger. Surveillance-vs-containment verification continues as an Article VII annual audit responsibility.
- **Session 8 addition (resolved):** Informal convertibility that does not touch the ledger is now covered by Annex AJ ACTIVE with nine worked prohibited patterns across Essential Access/Flow, Voice-Service Record/resource, and Shared Storehouse/Flow boundaries. **Proposal 7 close-out (2026-04-18)** added Annex AJ §4 Penalty Schedule binding detected violations to a 5.0× base multiplier (FC-040) at assumed 0.85 detection probability (FC-041), with severity factors per pattern (1.0×–2.0×) and escalation ladder for repeat and systemic violations. Annex AJ is promoted from PROPOSED to ACTIVE. Enforcement Panel publishes Annual Deterrence Audit to verify EV-negative regime holds empirically. → See Annex AJ §4; Penalty Schedule.

---

### T-002 — Identity Exploits
- **Layer:** Identity / access / civic activation
- **Severity:** Critical
- **Status:** PARTIAL
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** duplicate identities, account takeover, synthetic identities, proxy use, and recovery fraud.
- **Impact:** drains Essential Access, corrupts Voice and Service Record legitimacy, and can exclude vulnerable people if controls become too harsh.
- **Detection:** cross-signal deduplication, recovery anomaly review, impossible-use patterns, and staged assurance mismatches.
- **Mitigation direction:** four-tier identity assurance model, multi-evidence thresholding, no single universal credential, recovery safety ladder, survival-floor continuity during disputes. → P-003 ACTIVE.
- **Open problem:** calibrate fraud tolerance without making the system unusable for displaced, undocumented, or digitally fragile people.
- **Session 8 addition — Asymmetric Error Doctrine required:** The current mitigation does not specify quantified targets. Before deployment, the founding coalition must publish and formally adopt an Asymmetric Error Doctrine that specifies: (a) maximum acceptable fraud rate per instrument tier (Essential Access, Voice, Service Record); (b) maximum acceptable exclusion rate for vulnerable populations (displaced, undocumented, digitally fragile) per tier; (c) the review trigger when either rate is exceeded; (d) the decision rule when the two error types trade off. Without explicit numbers, calibration is permanently subject to political pressure. The Asymmetric Error Doctrine is a Tier 2 founding commitment. → See P-016 (Annex AK).

---

### T-004 — Incentive Collapse
- **Layer:** Economic / behavioral / civic motivation
- **Severity:** Critical
- **Status:** PARTIAL
- **Risk Score:** 5×3×(6-3)=48 (updated)
- **Mechanism:** universal Essential Access reduces desperation, but weak reward gradients can flatten initiative, excellence, and long-horizon effort.
- **Impact:** slow stagnation, mediocre output equilibrium, and declining willingness to take on hard or high-skill work.
- **Detection:** participation decline, lower high-skill throughput, concentration of difficult work into narrow groups, and weak innovation rates.
- **Mitigation direction:** nonlinear reward curves, multi-channel rewards (Flow, civic standing, status/recognition), opportunity access, and anti-gaming scoring. → P-002 ACTIVE.
- **Open problem:** define a real contribution model that rewards output without recreating coercive hierarchy or burnout pressure.

---

### T-005 — Governance Throughput Failure
- **Layer:** Decision flow / implementation latency
- **Severity:** High
- **Status:** ADDRESSED (P-005 PROPOSED)
- **Risk Score:** 5×4×(6-4)=40
- **Mechanism:** layered review, challenge rights, audit loops, and safety gates create cumulative delay. Dual attack surface: slowdown attacks (proposal flooding, minority veto loops) and speedup attacks (emergency bypass normalization, deliberation theater).
- **Impact:** essential decisions slow down, frustrations rise, emergency governance is normalized, anti-capture mechanisms are bypassed.
- **Detection:** decision latency, review backlog, unresolved appeals, emergency path overuse, rising informal workaround rates, deliberation quality metrics.
- **Mitigation direction:** P-005 PROPOSED: CRP dual-queue separation; minimum operational throughput floor; sequential emergency re-declaration cap; intake throttle with priority scoring; cross-quarter interim authorization bridge; decision quality audit metrics. See Patch Log P-005 and Annex AC1.
- **Open problem:** Operational sub-panel capture risk; throughput theater detection limits; interim bridge scope creep. Legacy single-Ombuds concentration risk inherited from the pre-federation design was the relevant P-008 concern.
- **Compound linkages:** T-005 × T-006 (PCRP window sync); T-005 × T-008 (PCRP as power locus); T-005 × T-001 (paralysis extends exploit windows).

---

### T-006 — Measurement Lag / Supply Shock
- **Layer:** Measurement / oracle / scarcity logic
- **Severity:** Critical
- **Status:** ADDRESSED (P-006 PROPOSED)
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** mixed-cadence oracle architecture creates exploitable measurement speed hierarchy. Two failure modes: lag-induced over-issuance (Essential Access issued into depleting pool) and lag-induced false restriction (Shared Storehouse maintained after recovery). First-responder authority undefined for inter-cycle shocks.
- **Impact:** over-issuance into real scarcity; prolonged unjustified restriction after recovery; black-market opportunity windows during cadence exploit gaps.
- **Detection:** forecast-vs-actual variance, Essential Access redemption velocity spikes, cross-category co-movement signals, fill-rate tracking, cross-publisher divergence.
- **Mitigation direction:** P-006 PROPOSED: sentinel indicator mandate (max lag by volatility class); Pre-Confirmation Response Protocol (PCRP) defining first-responder authority; Shared Storehouse unwind symmetry / recovery fast-track; cadence-adjusted U8 bridge (48h high-volatility). [Ambitious] Essential Access redemption velocity as native sentinel; cross-category demand surge detector. See Patch Log P-006 and Annex AC2.
- **Open problem:** PCRP scope must be a protected term under P-004. Inter-cycle gap compressed not eliminated. False PCRP activation risk requires false-trigger tracking.
- **Compound linkages:** T-006 × T-001 (cadence windows = black market windows); T-006 × T-005 (PCRP timing sync); T-006 × T-008 (PCRP REB authority = elite formation risk).

---

### T-007 — Political Definition Drift
- **Layer:** Governance semantics / hidden capture
- **Severity:** Critical
- **Status:** PARTIAL
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** redefine 'essential,' 'capacity,' 'contribution,' 'scarcity,' or 'clarification' in ways that alter outcomes without overt repeal.
- **Impact:** the architecture stays on paper while the survival floor shrinks or civic legitimacy skews.
- **Detection:** semantic impact audits, worked examples, quality-floor changes, and cumulative narrowing triggers.
- **Mitigation direction:** protected term classes, semantic effect test, public definition registry, anti-laundering rule, upward default on ambiguity. → P-004 ACTIVE. P-006 extends: 'supply shock' added as protected term. P-008 extends: qualification standard criteria added as protected specification.
- **Open problem:** institutionalize without creating a semantic bureaucracy that freezes useful iteration.

---

### T-008 — Bureaucratic Elite Formation
- **Layer:** Civic / verification / oversight layer
- **Severity:** High
- **Status:** ADDRESSED (P-008 PROPOSED)
- **Risk Score:** 4×4×(6-2)=64
- **Mechanism:** three pipelines: (1) Verification Control Loop — Service Record → verifier eligibility → Service Record minting control; (2) Positional Entrenchment — low-Voice/high-Service Record actors hold enforcement and audit positions invisibly; (3) Expertise Pool Homogenization — 'demonstrated competence' requirements produce a professionally connected class. Proceeds entirely through legitimate behavior — no anomaly signals under current monitoring.
- **Impact:** capture of verification, oversight, and constitutional interpretation infrastructure. Does not directly harm Essential Access floor but undermines every other safeguard over time.
- **Detection:** Very low (D=2). Visible only in aggregate metrics over multi-year horizon. P-008 creates the first detection infrastructure: legibility gap audit, concentration dashboard, cohort overlap index.
- **Mitigation direction:** P-008 PROPOSED: legibility gap audit; Service Record sector ceiling specification (founding precondition); epistemic diversity requirement (three-axis); verification independence rule; cooling-off cohort rule; [ambitious] qualification standard governance; concentration dashboard with auto-escalation. See Patch Log P-008 and Annex AC3.
- **Open problem (resolved Session 9):** ~~The prior single-Ombuds design carried three load-bearing P-008 functions — if the Ombuds became an elite-formation site, all three failed simultaneously. Open question: who audits the auditors of elite formation?~~ **Closed by P-025 (Federated Ombuds, Annex AI ACTIVE).** The five-node federation with FC-090 = 5, FC-091 = 4/5 supermajority, and the Oversight Assembly (5-of-7) distributes the auditor function across structurally dispersed sub-nodes (§1.2 dispersal criteria) and subjects the federation itself to external oversight for dispersal compliance (§5). "Who audits the auditors" resolves to: the Oversight Assembly audits dispersal; the Plenum audits operational determinations post-hoc; the public record (§6 publication commitment) audits voting patterns. Residual-risk path is now informal coordination across nominally dispersed sub-Ombuds, mitigated by §5.1 institutional-health reporting on voting-pattern concentration.
- **Compound linkages:** T-008 × T-011 (elite formation creates narrative attack surface); T-008 × T-005 (PCRP authority); T-008 × T-006 (REB PCRP authority); T-008 × P-025 (federation is the structural answer to the auditor-of-auditors open problem).

---

### T-009 — Grace Exploitation Loop (Updated Entry)
- **Layer:** Hardship / continuity / civic standing
- **Severity:** Med-High
- **Status:** ADDRESSED* (P-009)
- **Risk Score:** 4×3×(6-2)=48
- **Mechanism:** Four exploit classes: (1) Category Rotator — switches qualifying hardship category at each renewal to restart the clock; (2) Network Pause Ring — 8-person group rotates pause/contribution cycles, all maintaining high Service Record indefinitely; (3) Involuntary Unemployment Farmer — manufactured evidence of involuntary separation; (4) Civic Position Extender — uses pause to freeze Service Record above service eligibility threshold without ongoing contribution. T-009 is also the primary bypass route for P-008 cohort cooling controls.
- **Impact:** Institutional position preservation without genuine contribution. Elite formation (T-008) persists even when P-008 controls are nominally active. Civic pool diversity requirements (P-008 AC3.3) are satisfied on paper while the same coordination class maintains eligibility through coordinated pause.
- **Detection:** D=2 before P-009 (invisible — proceeds through legitimate channels). After P-009: cross-quarter history review, hardship attestation collusion graph (AF3), pool saturation monitoring (AF5), Service Record slow-decay trajectory analysis.
- **Mitigation direction:** P-009 PROPOSED: graduated renewal intensity (AF1); cross-quarter history review (AF2); hardship attestation collusion detection (AF3); Service Record slow-decay at 20% of normal (AF4); service pool pause-saturation monitoring (AF5); [ambitious] capability development pathway (AF6); [ambitious] T-009 × P-008 explicit closure (AF7). See Annex AF.
- **Residual risk:** Involuntary unemployment category remains the most exploitable qualifying condition. Contains but does not eliminate low-level grace exploitation (1-2 quarter use by actors who don't genuinely need it) — accepted as system leakage, cost of frictionless access for genuine hardship.
- **Compound linkages:** T-009 × T-008 (primary bypass for P-008 — AF7 closes it). T-009 × T-011 (graduated renewal must be communicated via P-011 CFRL or becomes 'system punishes sick people' narrative attack).

---

### T-010 / T-011 — Narrative Attack Surface (Updated Entry)
- **Layer:** Public communication / legitimacy perception
- **Severity:** Critical
- **Status:** ADDRESSED (P-011 PROPOSED)
- **Risk Score:** 5×4×(6-2)=80
- **Note on risk score:** T-011 carries a D=2 (low detectability) score — narrative attacks are difficult to detect early and the damage (fixed hostile framing) is largely irreversible once established. The risk score of 80 is the highest in the register, reflecting the asymmetric nature of narrative risk: low cost to attack, high cost to defend, and time-bounded defense window.
- **Mechanism:** hostile framing fixes public perception before the system can demonstrate real-world outcomes. Six vectors: social credit framing (Voice and Service Record mischaracterized), elite capture narrative (T-008 provides factual hook), complexity-as-illegitimacy (large constitutional corpus), failure amplification (any operational event), technocracy framing (expertise requirements), and 'untested' (true pre-launch).
- **Impact:** legitimacy collapse prevents deployment or continuation even if the system is technically functioning correctly. Narrative failure is not recoverable through technical means — it requires sustained communication effort over months to years.
- **Detection:** D=2 (very low pre-launch). Post-launch: media sentiment monitoring, public understanding accuracy surveys (P-011 narrative health dashboard), hostile framing prevalence index. Narrative attacks detectable only after established.
- **Mitigation direction:** P-011 PROPOSED: RPCP (4-hour public communication SLA); pre-committed failure communication doctrine; Citizen-Facing Rights Layer; adversarial narrative simulation; hostile frame pre-emption registry; [ambitious] narrative health dashboard and pre-launch narrative audit. See Patch Log P-011 and Annex AD.
- **Open problem:** Pre-launch framing window (18+ months before launch) cannot be closed by protocol — only by early deployment of CFRL and pre-commitment doctrine. Narrative defense is bounded by actual performance: no communication architecture survives sustained operational failure.
- **Compound linkages:** T-011 × T-008 (elite formation provides factual basis for 'captured by professionals'; P-008 dashboard is the counter-narrative evidence base — P-008 is prerequisite for T-011 narrative defense). T-011 × T-006 (PCRP false triggers are predictable high-visibility events). T-011 × T-005 (governance paralysis generates narrative events).

---

## Session 3 Interface Threats — Detailed Entries

*New threats identified at patch interfaces during compound interface testing. All ADDRESSED via P-012.*

### T-012 — PCRP Poisoning via Oracle-Corroboration Collapse
- **Layer:** PCRP / oracle / measurement
- **Severity:** Critical
- **Status:** ADDRESSED* (P-012)
- **Risk Score:** 5×3×(6-2)=60
- **Mechanism:** Oracle manipulation attack simultaneously corrupts the sentinel indicator and corroboration source. PCRP two-source requirement is satisfied by two channels carrying the same corrupted data. System activates false emergency, publishes RPCP, then must retract — producing a more damaging narrative event than an unmitigated false trigger.
- **Impact:** False emergency declared publicly; RPCP retraction proves system can be made to announce fake emergencies; narrative damage exceeds operational harm.
- **Detection:** Oracle manipulation detection (existing); PCRP oracle independence certification failure (new — AE2.1).
- **Mitigation:** P-012 AE2.1 — structural independence requirement for PCRP corroboration sources.
- **Residual risk:** Two genuinely independent sources can still both be wrong. Independence is necessary but not sufficient for accuracy.

---

### T-013 — Compound Crisis Throughput Starvation
- **Layer:** Governance / throughput / multi-crisis
- **Severity:** High
- **Status:** ADDRESSED* (P-012)
- **Risk Score:** 4×4×(6-3)=48
- **Mechanism:** Multiple simultaneous crises of different types compete for P-005 throughput floor. All 5 floor slots consumed by one crisis type; second simultaneous crisis receives no guaranteed governance capacity. Unlike T-005 (single-thread paralysis), T-013 is multi-thread competition for a shared minimum-guarantee resource.
- **Impact:** Identity fraud response, enforcement decisions, or constitutional matters queue without guaranteed floor during compound emergencies — exactly when they are most needed.
- **Detection:** Categorical floor monitoring — track slot consumption by category per quarter.
- **Mitigation:** P-012 AE2.2 — categorical throughput minimums; single-category cap of 3 of 5.
- **Residual risk:** Categorical gaming — proposals reframed to occupy minimum slots without matching the category's genuine purpose.

---

### T-014 — Emergency Governance Triple Deadlock
- **Layer:** Governance / emergency / institutional
- **Severity:** Critical
- **Status:** ADDRESSED* (P-012)
- **Risk Score:** 5×2×(6-3)=30
- **Mechanism:** Mandatory emergency decision simultaneously blocked by: (a) sequential emergency cap audit requirement (P-005); (b) CRP split defaulting to upward Tier 2 classification; (c) P-008 cohort cooling understaffing the audit body. No authorized actor has both authority and capacity to resolve within survivable timeframes. A designed attack could deliberately engineer all three conditions simultaneously.
- **Impact:** Mandatory emergency decision cannot be made; survival floor at risk if Level 4 continuity provisions are not explicitly activated during deadlock.
- **Detection:** Low (L=2) — requires simultaneous independent conditions. Deadlock auto-declaration (AE2.3) creates first detection mechanism.
- **Mitigation:** P-012 AE2.3 — emergency deadlock resolution protocol; survival floor bridge unconditional; 3-member arbitration panel within 6 hours.
- **Residual risk:** Second-generation deadlock (arbitration panel itself blocked) escalates to Level 5 structural review — no sub-Level-5 resolution path defined.

---

### T-015 — Demand-Side Oracle Poisoning
- **Layer:** Measurement / PCRP / issuance
- **Severity:** High
- **Status:** ADDRESSED* (P-012)
- **Risk Score:** 4×3×(6-2)=48
- **Mechanism:** Essential Access redemption velocity oracle and other demand-sensitive measurement systems cannot distinguish genuine supply shocks from demand surges caused by: Flow enforcement unwinds; mass re-verification campaigns; coordinated spending by issuance-capture entities before unwind. Demand spikes trigger supply-shortage responses (PCRP, reserve release) that are wrong for the actual condition.
- **Impact:** False PCRP activated during enforcement action; Essential Access issuance reduced during period when supply is actually adequate but demand is elevated. Double-deprivation risk: enforcement reduces Flow availability while false PCRP reduces Essential Access availability simultaneously.
- **Detection:** Demand-context register (new — AE2.4); cross-reference velocity signal against active enforcement action registry.
- **Mitigation:** P-012 AE2.4 — demand-context flag; Ombuds co-certification required for PCRP activation during demand-context period.
- **Residual risk:** Demand-context flag can be deliberately triggered by initiating a small enforcement action to suppress legitimate PCRP activation during a genuine supply shock. Mitigation: Ombuds co-certification process must assess whether demand-context flag is genuine before blocking PCRP.

---

### T-016 — Formal Acceptance Process Capture
- **Layer:** Patch acceptance / governance evolution
- **Severity:** Critical
- **Status:** ADDRESSED* (P-013)
- **Risk Score:** 5×3×(6-2)=60
- **Note on threat class:** T-016 is a second-order threat — it targets the process that activates all other patches rather than the patches themselves. Capturing T-016 is equivalent to capturing the system's ability to evolve. A system whose acceptance process is captured cannot fix itself.
- **Mechanism:** Five exploit classes operating on the FAP: (1) Evidence Farming — piloting in favorable regions that produce clean metrics by construction, not by proof. (2) Sign-Off Deadlocker — coordinated bloc holds positions across two sign-off authorities, orchestrates procedurally correct disagreement, produces indefinite paralysis. (3) Urgency Exploiter — creates genuine operational pressure to waive evidence requirements; precedent established once becomes normalized. (4) Audit Captor — auditors who satisfy the conflict-of-interest rule but share the designers' interpretive framework (intellectual-cousin exploit). (5) Stagnation Filer — files technically valid documentation of 'why pilot remains impossible' indefinitely without resolution.
- **Impact:** No PROPOSED patches ever reach ACTIVE. The system is frozen at its current design state indefinitely. Or: patches reach ACTIVE through compromised evidence, producing controls that fail under adversarial conditions at scale. The FAP creates a new power locus — whoever controls the four sign-off authorities controls system evolution.
- **Detection:** D=2 (low) for evidence farming and stagnation (proceed through legitimate channels). D=3 for deadlocker (published refusals create a visible record). D=2 for audit captor (epistemic monoculture is invisible without diversity metrics). P-013's representativeness assessment, deadlock timeline, and FAP concentration controls are the primary detection mechanisms introduced.
- **Mitigation direction:** P-013 PROPOSED: pilot representativeness standard (AG1); deadlock resolution timeline (AG2); audit epistemic independence with adversarial member (AG3); anti-gaming constitutional upgrade to Tier 2 (AG4); stagnation quality standard with bootstrap review trigger (AG5); [ambitious] bootstrap resolution protocol (AG6); [ambitious] FAP concentration controls (AG7). See Annex AG.
- **Residual risk:** Evidence farming in stress-tested regions; CRP deadlock resolution congestion (T-016 × T-005 interface); definition-stage gaming of representativeness criteria. At root: the FAP cannot be made exploitation-proof without being made unusable. P-013 calibrates friction without paralysis.
- **Compound linkages:** T-016 × T-005 (deadlock resolution adds to CRP load; P-005 categorical floor must include FAP deadlock slot). T-016 × T-008 (intellectual-cousin audit capture — closed by AG3 adversarial member requirement). T-016 × T-011 (patch stagnation is the factual basis for 'the system cannot fix itself' narrative attack).

---

### T-017 — P-013 Bootstrap Problem (First-Mover Circular Dependency)
- **Layer:** Patch acceptance / system evolution
- **Severity:** Critical
- **Status:** ADDRESSED* (P-014)
- **Risk Score:** 5×3×(6-3)=45
- **Note on threat class:** T-017 is a third-order threat: it does not attack the system directly (first order) or the patch acceptance process (second order, T-016). It attacks the ability to activate the patch that hardens the acceptance process. It is an existential threat to system evolution if unresolved — the entire PROPOSED patch stack is permanently frozen without it.
- **Mechanism:** P-013 governs the Formal Acceptance Protocol — the acceptance process that would normally activate it. Using the unhardened process to activate P-013 (the hardening patch) is structurally incoherent: the evidence standard, audit independence requirements, and sign-off concentration controls that P-013 introduces are not operative during its own activation. This creates three specific exploits: (1) Procedural Objection Loop — any actor can correctly object that the prior acceptance process does not satisfy P-013's standards, blocking activation indefinitely with technically valid objections. (2) Exception-as-Precedent — a founding exception to activate P-013, if not explicitly sealed, becomes authority for urgency bypass of other patches. (3) Founding Capture Window — during the prior activation process, before P-013's controls are operative, the sign-off cluster can be populated with intellectual cousins.
- **Impact:** Without resolution: all 10 PROPOSED patches remain frozen permanently. The system is locked at its current design state. With uncontrolled resolution: a founding exception normalizes urgency bypass, defeating P-013's core purpose before it takes effect.
- **Detection:** D=3 — the bootstrap problem is logically visible once the FAP and P-013 are examined together. It does not require adversarial action to surface.
- **Mitigation direction:** P-014 PROPOSED: 5-stage founding instrument with 14-day pre-activation disclosure, heightened 5-member panel with external conflict verification and adversarial member, substitute evidence standard (desk review + red-team analysis), permanent sealing with Tier 2 non-precedent statement, mandatory post-activation audit within 90 days. See Annex AH.
- **Residual risk:** Desk review case selection; founding panel capture during 14-day window; post-activation audit self-reference if activation was compromised. All mitigated by adversarial member, external verification, and Formal Acceptance Protocol fallback during any suspension. **Session 8 update:** The 14-day pre-activation disclosure window is insufficient for independent critique to organize against a coordinated founding capture attempt. P-020 (Founding Window Extension, Annex AH2) extends this to 60 days minimum and requires the adversarial panel member to be nominated by a body structurally *opposed* to the founding coalition's interests — not appointed by the same process as the other four panel members.
- **Compound linkages:** T-017 × T-016 (bootstrap paradox is the exploit surface T-016 bad actors use for indefinite delay). T-017 × T-011 (bootstrap paradox is a narrative attack surface — P-014 converts it into a transparency demonstration). T-017 × T-022 (a successful T-022 attack requires a new founding moment — T-017 recurs; recursive bootstrap is a second-order T-022 consequence).

---

## Session 7 Threats — Detailed Entries

*New threats identified during corpus audit (Session 7). Both are OPEN pending patch design. They represent second-order attacks on existing mitigations rather than attacks on the system directly.*

### T-018 — PCRP False-Trigger Exhaustion Attack
- **Layer:** PCRP / governance / measurement
- **Status:** PARTIAL — attestation-vector residual addressed by P-024 / Annex AS (FC-080/081/082, 2026-04-18 Proposal 9 close-out). False-trigger-at-scale remains with P-015.
- **Severity:** High
- **Risk Score:** 4×3×(6-3)=36
- **Mechanism:** P-006 introduces false-trigger tracking: 3 false PCRP activations within 4 quarters triggers a mandatory independent audit. A coordinated actor *deliberately engineers* 3 false triggers in rapid succession to (a) trigger an audit that consumes governance bandwidth, (b) drain the system's capacity to respond during a concurrent genuine crisis, or (c) exhaust the 3-trigger threshold so operators hesitate to activate PCRP during a real supply shock.
- **Impact:** PCRP hesitation during a genuine supply shock; governance bandwidth drain; audit as a distraction weapon during compound crises.
- **Detection:** D=3. Coordination-pattern flag on back-to-back PCRP activations within short windows detectable post-hoc.
- **Mitigation direction:** (1) False triggers accompanied by oracle manipulation evidence or coordination signatures do not count toward the 3-trigger cap — escalate directly to enforcement. (2) Cap reset available via independent audit finding of deliberate manipulation. (3) "Trigger exhaustion alert" fires when 2 of 3 cap slots consumed within a single quarter. → P-015 PROPOSED.
- **Open problem:** Distinguishing genuine oracle failure from engineered false trigger requires post-hoc forensics; real-time distinction is not reliable. Mitigation accepts this and applies escalation retroactively.
- **Compound linkages:** T-018 × T-006 (false-trigger exhaustion defeats PCRP during real supply shock). T-018 × T-013 (audit load from T-018 consumes CRP capacity during multi-crisis). T-018 × T-011 (publicly visible false-trigger manipulation is a narrative attack surface). T-018 × T-019 (compound execution of both is highest-risk PCRP attack surface).

---

### T-019 — Demand-Context Flag Suppression Attack
- **Layer:** PCRP / enforcement / measurement
- **Severity:** High
- **Status:** OPEN
- **Risk Score:** 4×3×(6-2)=48
- **Note:** Identified as residual risk in T-015 (P-012 AE2.4) but requires separate registration — distinct mechanism and control profile.
- **Mechanism:** A coordinated actor *initiates a small, technically valid enforcement action* strategically timed to activate the demand-context flag, which then blocks PCRP Ombuds co-certification during a genuine supply shock. The enforcement action itself causes no significant harm; its purpose is flag activation to suppress emergency response.
- **Impact:** PCRP blocked during a genuine supply shock. Potential double-deprivation: enforcement reduces Flow availability while false demand-context flag reduces Essential Access availability simultaneously.
- **Detection:** D=2. The enforcement action is legitimate by construction; manipulation visible only by examining *timing* relative to supply indicators — requires cross-register monitoring not currently specified.
- **Mitigation direction:** (1) Ombuds co-certification during demand-context periods must explicitly assess whether the triggering enforcement action was manufactured or strategically timed — required step, not optional. (2) Cross-register timing monitor flags enforcement actions initiated within 48 hours of sentinel indicator movement. (3) If Ombuds finds deliberate flag manufacture, demand-context designation is lifted. → P-015 PROPOSED.
- **Open problem:** Ombuds assessment of "deliberate manufacture" requires judgment under time pressure. Criteria must be specified in advance in Annex AI (Federated Ombuds constitution) with explicit authority and defined timeline.
- **Compound linkages:** T-019 × T-015 (demand-context flag is the legitimate mitigation T-019 exploits). T-019 × T-008 (Ombuds determination quality depends on Ombuds independence). T-019 × T-018 (compound execution is highest-risk PCRP attack surface).

---

## Session 8 Threats — Detailed Entries

*New threats identified during red-team review (Session 8). All are OPEN pending patch design. T-020 and T-021 target the measurement architecture's epistemological foundations. T-022 targets the political durability of the constitutional architecture. T-023 targets the evidentiary basis for scale-up decisions.*

### T-020 — Epistemological Oracle Capture
- **Layer:** Measurement / RCS / oracle accreditation
- **Severity:** Critical
- **Status:** ADDRESSED by P-017 ACTIVE + Annex AL ACTIVE + Founding Commitments FC-030/FC-031/FC-032/FC-033 (Proposal 3 close-out, 2026-04-18)
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** A well-resourced actor does not manipulate oracle outputs directly (addressed by T-012). Instead, they fund and shape the *methodological standards bodies* that define what counts as valid measurement for RCS accreditation. Three pipelines: (1) Standards Funding — sustained funding of the academic and technical bodies that define housing price indices, nutritional equivalence standards, and care-delivery measurement frameworks, gradually orienting methodology toward favorable outputs. (2) Peer Review Capture — dominating the journals and conference venues whose approval is required for methodological legitimacy. (3) Technical Vocabulary Absorption — introducing new technical terms through legitimate standards processes that encode favorable assumptions without appearing to change definitions. None of these require illegal action or direct oracle contact.
- **Impact:** Oracle outputs are systematically biased while satisfying all formal independence requirements. The measurement layer reports what the captor wants while appearing to report physical reality. Every downstream system (Essential Access issuance, Shared Storehouse activation, RCS confidence bands) is corrupted. T-012 (oracle independence) and T-015 (demand-context) protections become ineffective because the manipulation precedes the data, not the channel.
- **Detection:** D=2 (very low). Epistemic monoculture is invisible under current monitoring. Methodological homogeneity across formally independent oracle nodes is not currently tracked. The P-008 concentration dashboard (PROPOSED) tracks human diversity; it does not track *methodological* diversity.
- **Mitigation direction:** P-017 PROPOSED: (1) Methodology-class diversity mandate — RCS accreditation must include at least one measurement node using a fundamentally different methodology class (community-based participatory research vs. institutional statistical modeling vs. independent physical sampling). (2) Methodological divergence signal — systematic divergence between methodology classes is a first-order sentinel indicator, not a failure requiring suppression. (3) Standards-funding transparency requirement — any RCS accredited node must disclose funding sources for the methodological standards it relies on, with a three-year lookback. (4) Anti-monoculture review trigger — if three or more oracle nodes rely on the same standards body for a given category, an independent methodological review is required before that category can be used for Shared Storehouse activation. See Annex AL.
- **Open problem (resolved):** ~~Defining "fundamentally different methodology class" is itself subject to definition drift (T-007). 'Methodology class' must be a P-004 protected term with worked examples.~~ Resolved in Annex AL Sections 1–3: "methodology class" and "fundamentally different" are P-004 protected terms with three-component definition, three canonical classes, worked examples including disqualifying variants, and annual audit restricted to Sections 3–4 (Sections 1–2 require H-2). Numerical floors (N≥5, ≥3 classes, pairwise correlation ≤0.30, ≥1 adversarial seat) bound in `/founding/commitments.md` under Tier 1 amendment authority.
- **Compound linkages:** T-020 × T-007 (methodology-class definition is subject to definitional capture). T-020 × T-012 (structural oracle independence is necessary but not sufficient — epistemological independence is the missing layer). T-020 × T-008 (epistemic monoculture in oracle methodology parallels epistemic monoculture in oversight bodies). T-020 × T-011 (a revealed epistemological capture event would be a catastrophic narrative attack surface).

---

### T-021 — Algorithmic Oracle Capture
- **Layer:** Measurement / RCS / algorithmic systems
- **Severity:** Critical
- **Status:** ADDRESSED by P-017 ACTIVE + Annex AL §4.2 (AI supply-chain concentration threshold = 2) + Founding Commitments FC-030/FC-031 (Proposal 3 close-out, 2026-04-18)
- **Risk Score:** 5×3×(6-2)=60
- **Mechanism:** The measurement layer is a concentration point for AI-driven manipulation at scale. A sophisticated actor who controls training data, model weights, or fine-tuning pipelines for any RCS measurement system can produce oracle outputs that satisfy formal independence requirements (different institutions, different hardware, different personnel) while being systematically biased through shared upstream AI infrastructure. Three specific attack surfaces: (1) Training Data Poisoning — gradual corruption of the historical datasets used to train forecasting models, producing models that systematically underestimate or overestimate specific categories. (2) Model Weight Manipulation — supply chain compromise of pre-trained model components used across multiple oracle nodes. (3) Shared API Exploitation — multiple "independent" oracle nodes that rely on a common commercial AI API introduce a shared dependency that is not visible in institutional independence audits.
- **Impact:** Systematic measurement bias that passes oracle independence certification because the manipulation precedes the institutional layer. The oracle system reports false physical capacity with high internal consistency (making cross-publisher divergence detection fail). Shared Storehouse activations, Essential Access issuance, and PCRP triggers are all corrupted. This attack is increasingly realistic as measurement systems adopt ML pipelines.
- **Detection:** D=2. Standard oracle independence checks do not examine upstream AI infrastructure. The attack is only detectable through cross-methodology comparison (T-020 mitigation) or direct audit of AI supply chains — neither of which is currently required.
- **Mitigation direction:** P-017 PROPOSED (shared with T-020): (1) AI supply chain transparency requirement — any oracle node using ML or AI components must disclose: model provenance, training data sources, and any shared upstream dependencies with other oracle nodes. (2) Algorithmic independence certification — oracle independence audit must include explicit verification that no two corroborating oracle nodes share a common upstream AI model, training dataset, or fine-tuning pipeline. (3) Physical ground-truth requirement — at least one measurement node per high-volatility category must use direct physical sampling (not model-derived estimates) as its primary measurement method. See Annex AL.
- **Open problem (partially resolved):** AI supply chains are complex and often opaque. Annex AL §4.2 binds the AI concentration threshold to 2 nodes (tighter than the standards-body threshold of 3) and requires disclosure of upstream AI model, training dataset, and API dependencies. Physical sampling expense remains a practical constraint — Annex AL Section 3 Class 3 specifies canonical examples and permits phased scale-up where physical sampling is not initially feasible, with Shared Storehouse activation gated on methodology-class coverage being in place first.
- **Compound linkages:** T-021 × T-020 (both target the epistemological foundations of the measurement layer; P-017 addresses both). T-021 × T-012 (oracle independence requirements do not currently cover algorithmic supply chains). T-021 × T-006 (corrupted oracle outputs defeat measurement lag controls because the corruption precedes the signal). T-021 × T-016 (evidence farming for patch acceptance could use algorithmically biased measurement systems).

---

### T-022 — Electoral Cycle Capture
- **Layer:** Constitutional architecture / political durability
- **Severity:** Critical
- **Status:** OPEN
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** The protocol assumes durable institutional commitment from the political coalitions that implement it. It does not model what happens when a hostile successor government — one that campaigned against the protocol — wins a democratic election and has both the political mandate and the institutional access to dismantle or hollow out the architecture. Four specific routes: (1) Direct Constitutional Repeal — the Tier 1 invariants are designed to resist this, but constitutional repeal via supermajority is legally possible. (2) Administrative Hollowing — the successor government does not formally repeal anything; it appoints adversarial actors to founding institutions, defunds oracle nodes, and stops publishing post-mortems until the system becomes non-functional without any formal change. (3) Jurisdictional Fragmentation — the successor government transfers authority to sub-jurisdictional entities that are not bound by the protocol. (4) Treaty Override — the successor government signs international agreements that require modifications to the non-convertibility architecture as a condition of participation, triggering Tier 3 changes that accumulate into Tier 2 impact (T-012 cumulative drift trigger, applied to treaty obligations). The amendment ladder (Tier 1/2/3) was calibrated for incremental drift, not organized political reversal.
- **Impact:** The most complete failure mode. If a hostile successor government succeeds in dismantling the protocol through legal means, the system has no recovery path short of a new founding moment — with all the bootstrap problems that entails (T-017 recurrence). The people who depended on Essential Access floor guarantees face sudden withdrawal after having structured their lives around the system.
- **Detection:** D=3. Electoral outcomes are public. The threat is visible in advance through normal political monitoring. The problem is not detection but *structural response*.
- **Mitigation direction:** P-018 PROPOSED: (1) Entrenchment ladder — Tier 1 invariants require not just supermajority legislative amendment but concurrent ratification by an independent constitutional body (not appointable by the current governing coalition). (2) Essential Access floor minimum persistence — regardless of political change, a minimum Essential Access floor (70% of founding basket) is constitutionally self-executing: it does not require legislative appropriation and cannot be suspended by executive action. (3) Administrative hollowing triggers — if a founding institution is unfilled for >90 days, or if post-mortem publication lapses for >30 days, or if oracle accreditation count drops below a specified minimum, an automatic constitutional review is triggered that does not require the governing coalition's initiation. (4) Transition continuity protocol — when a new governing coalition takes office, a mandatory 180-day transition audit is required before any changes to Tier 2 or Tier 1 provisions. The audit is conducted by the constitutional body, not the incoming government. See Annex AM.
- **Open problem:** A government with sufficient political will can repeal constitutional entrenchment. The designed defense buys time and raises the political cost; it cannot prevent determined repeal. The residual risk is that the protocol's durability depends on political culture as well as constitutional design.
- **Compound linkages:** T-022 × T-011 (hostile electoral narrative is a T-011 attack that succeeds — T-022 is T-011 operating through democratic channels). T-022 × T-008 (elite formation inside founding institutions may accelerate administrative hollowing if the elite aligns with the successor government). T-022 × T-016 (a hostile government can capture the FAP by appointing aligned sign-off authorities). T-022 × T-017 (a successful T-022 attack requires a new founding moment — recursive bootstrap problem).

---

### T-023 — Pilot External Validity Collapse
- **Layer:** Evidence base / scale-up decision-making
- **Severity:** Med-High
- **Status:** OPEN
- **Risk Score:** 4×4×(6-4)=32
- **Note on impact:** The risk score understates the consequence of acting on false confidence. A scale-up decision based on a pilot that did not include crisis conditions is not a statistical error — it is a structural commitment that may be irreversible.
- **Mechanism:** T-016 (FAP Capture) addresses evidence farming — deliberately piloting in favorable regions. T-023 is distinct: an *honest* pilot that succeeds, is genuinely representative, and produces valid evidence — but in a pre-crisis period. The evidence base does not include: (a) economic shock or recession; (b) compound supply disruption across multiple categories simultaneously; (c) an organized political opposition campaign against the system; (d) a hostile successor government transition; (e) a technology failure in an oracle or identity system at scale. When the system is deployed at scale and the first real compound crisis hits, the pilot evidence does not apply. This is the fundamental problem of external validity in social systems: controlled conditions do not generalize to adversarial conditions.
- **Impact:** Scale-up proceeds based on Year 1 smooth-operation data. Year 3 encounters the first genuine compound crisis. The system's untested responses fail at scale in ways the pilot never revealed. The narrative attack (N-008: "too complex to work") is now supported by evidence.
- **Detection:** D=4 (relatively detectable — the absence of adversarial conditions in the pilot is visible in the evidence record). The problem is that the absence of adverse conditions looks like evidence of robustness, not evidence of an evidence gap.
- **Mitigation direction:** P-019 PROPOSED: (1) Stress-condition pilot gate — scale-up approval requires the pilot evidence record to include at least one of each: an economic stress event, a compound supply disruption, and a formal political opposition campaign, or explicit documentation of why each condition could not be tested and a designated substitute evidence source. (2) Red-team challenge window — before any scale-up vote, a mandatory 30-day adversarial challenge window allows independent reviewers to contest the external validity of the evidence base. (3) Crisis simulation requirement — the Annual Compound Simulation (this document) must include at least one compound-crisis scenario not previously simulated before each scale-up gate. See Annex AN.
- **Open problem:** It is not possible to pilot a hostile successor government or a large-scale economic recession deliberately. Some external validity gaps cannot be filled; they can only be acknowledged and planned for explicitly.
- **Compound linkages:** T-023 × T-016 (evidence farming produces favorable pilot data; T-023 is the honest-but-insufficient version of the same failure). T-023 × T-011 (scale-up failure after smooth pilot is a maximum-impact narrative attack). T-023 × T-022 (electoral cycle hostility is one of the hardest conditions to include in a controlled pilot).

---

## Session 9 Threats — Detailed Entries

*Gaps identified after Session 8 implementation review. T-024 is an operational void with no current mitigation path. T-025 is registered pending design discussion.*

---

### T-024 — Shared Storehouse Oracle-Failure During Active Rationing
- **Layer:** Shared Storehouse / oracle / scarcity management
- **Severity:** Critical
- **Status:** ADDRESSED by P-022 ACTIVE + Annex AQ ACTIVE + FC-100 `ORACLE_QUORUM_LOSS_RESTORATION_WINDOW` = 14 days (Proposal 6 close-out, 2026-04-18)
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** The existing oracle architecture (T-006 / P-006) addresses measurement lag and measurement manipulation. It does not address the specific failure mode where Shared Storehouse rationing is already active and the oracle system then fails completely — going dark, losing quorum, or entering an unresolvable dispute. In that state: (a) the system has no authoritative measurement of whether the shortage is improving, stable, or worsening; (b) the conservative default (maintain access during disputes) conflicts with the Shared Storehouse architecture (rationing was activated because supply is genuinely constrained); (c) there is no designated decision-maker with defined authority to escalate, de-escalate, or hold Shared Storehouse without oracle confirmation; (d) the 90-day Shared Storehouse maximum has no mechanism to renew or lapse when the renewal justification cannot be verified.
- **Impact:** Shared Storehouse rationing either continues without verification (potentially prolonging restriction after recovery) or lapses without verification (potentially removing rationing during ongoing shortage). Both outcomes are harmful; neither is currently governed. If oracle failure is deliberate (manufactured during active Shared Storehouse), the attacker can force either a false lapse or a false extension depending on which default the system applies.
- **Detection:** D=4 — oracle failure is observable; the gap is the absence of a decision protocol, not a hidden event.
- **Mitigation direction (P-022 PROPOSED):** (1) *Shared Storehouse oracle-failure default:* when the oracle system loses quorum or enters unresolvable dispute while Shared Storehouse is active, Shared Storehouse holds at its current level — no escalation, no expansion. This is the conservative hold. (2) *48-hour first-responder window:* the Regional Executive Body (REB, P-006 first-responder authority) may use available non-oracle physical indicators (fill rates, distribution logs, vendor inventory reports) to issue a provisional continuation or provisional lapse within 48 hours. The REB decision is published immediately with the evidence base. (3) *72-hour governance handoff:* if the oracle system is not restored within 72 hours of failure, authority transfers to the emergency deadlock resolution protocol (P-012 AE2.3) for a binding decision. The survival floor bridge is unconditional throughout. (4) *Oracle restoration trigger:* when the oracle system is restored, a mandatory 24-hour reconciliation review assesses whether the provisional decisions were consistent with restored oracle data. Discrepancies are published and trigger a post-mortem. See Annex AQ.
- **Open problem (partially resolved):** The REB's use of non-oracle physical indicators remains a controlled exception. Annex AQ §2.1 bounds REB authority to hold-or-lapse decisions only (no scope expansion), requires immediate public publication with named decision-makers (§2.3), requires personal Service Record stake under the Annex AS attestation-at-risk mechanism, and subjects every REB decision to the §4.3 Reconciliation Review comparing against restored oracle readings. Residual normalization risk is bounded by the FC-100 14-day verification window enforcing public comparison before restored-oracle readings resume consensus-binding authority.
- **Compound linkages:** T-024 × T-006 (oracle failure during Shared Storehouse is the worst-case T-006 scenario — P-006 does not fully cover it). T-024 × T-014 (triple deadlock can coincide with oracle failure — survival floor bridge must be unconditional regardless). T-024 × T-011 (Shared Storehouse rationing continuing without oracle verification is a high-visibility narrative attack surface). T-024 × T-018 (deliberate oracle disruption timed to active Shared Storehouse is the highest-consequence T-018 compound).

---

### T-025 — Demurrage Sector-Capture via Investment Channel
- **Layer:** Flow monetary architecture / demurrage / productive investment
- **Severity:** High
- **Status:** PROPOSED — *P-023 (contract-commitment architecture, zero exemptions)*
- **Risk Score:** 4×4×(6-3)=48
- **Mechanism:** Demurrage (idle Flow decay) is designed to discourage passive hoarding and rentier accumulation. The threat: any investment-channel exemption from demurrage creates a classification that capital-intensive sectors (construction, infrastructure, heavy industry) can exploit. Firms apply for project-account status, escrow windows, or term-pool designation not to build productive capacity but to park Flow without decay. The exemption designed for productive planning becomes a hoarding instrument with a legitimating label. Four specific mechanisms: (1) *Project account cycling* — a firm maintains a continuous chain of overlapping project accounts, each nominally productive, such that no Flow balance ever becomes "idle." (2) *Escrow window abuse* — firms use escrow windows to hold balances during periods of market uncertainty, effectively suspending demurrage during adverse conditions. (3) *Infrastructure designation capture* — lobbying to broaden the definition of "infrastructure" to include asset classes economically closer to rent-extraction than productive construction. (4) *Subsidiary fragmentation* — a single economic actor fragments into multiple legal entities, each holding a project account, collectively holding far more demurrage-exempt Flow than any single entity would be permitted.
- **Impact:** Demurrage fails to break passive accumulation among sophisticated actors while continuing to penalise unsophisticated savers (workers, small enterprises) who cannot access investment-channel exemptions. This recreates the wealth concentration the protocol was designed to prevent, through the mechanism designed to prevent it.
- **Detection:** D=3 — investment channel utilisation is observable in aggregate; cycling and fragmentation patterns are detectable with cross-entity tracking.
- **Resolution (P-023):** Investment-channel exemptions are removed entirely. Long-horizon projects use contract-commitment architecture: commissioning authority holds capital in milestone escrow (demurrage applies to escrowed Flow, incentivizing timely contracting); releases trigger only on independently verified physical deliverables; contractor holds only current working capital; demurrage is the price-signal discipline throughout the supply chain. No sector-specific carve-outs. Force majeure escrow freeze available for verified external delays (independently certified, time-limited, capped). All key terms P-004-protected.
- **Residual risk:** (1) Force majeure certification panel is a new oracle (T-020/T-021 capture vector); mitigated by P-017 independence standards. (2) Deployment timeline pressure on commissioning authorities may incentivize rushed contracting; mitigated by procurement integrity check requirement. (3) Universal scope at deeply nested subcontractor levels is declared policy; enforcement requires cross-entity tracking — D=3 assumed, but may be harder in practice for complex project structures. (4) Novel infrastructure categories not anticipatable at founding may not fit the output-milestone standard; changes require H-2 amendment (P-004 protection).
- **Compound linkages:** T-025 × T-001 resolved by P-023 (no investment-channel exemptions means no above-ledger boundary manipulation through exemption classification). T-025 × T-007 mitigated by P-023.10 (P-004 protection on all P-023 key terms). T-025 × T-008 mitigated by P-023.6 (sector identity irrelevant to escrow eligibility — no classification to capture).

---

## T-008 / T-009 / T-016 / T-017 Capture Triad Extended

*The connected capture triad from Session 5 is now a quadruplet:*

| Threat | Route | Patch | Closes |
| :--- | :--- | :--- | :--- |
| T-008 | Elite formation captures institutions | P-008 | P-008 |
| T-009 | Grace exploitation bypasses T-008 controls | P-009 | P-009 (+ AF7 closes T-008 bypass) |
| T-016 | Acceptance process capture prevents patches from reaching ACTIVE | P-013 | P-013 |
| T-017 | Bootstrap paradox prevents P-013 from activating | P-014 | Unblocks the entire sequence |

**The quadruplet is now fully addressed. P-014 → P-013 → P-009/P-008 → P-006 is the critical activation sequence. Each step clears the path for the next.**

---

## Register Management Rules

- Do not mark a threat resolved because the idea sounds good. Resolution requires evidence, tests, and a residual-risk statement.
- Every patch must name the threat it addresses and the new risk it introduces.
- If two patches conflict, the conflict belongs in the patch log and must be resolved explicitly in the Humane Constitution.
- Threat IDs remain stable across versions. The wording may sharpen; the ID should not drift.
- **ADDRESSED** status indicates a patch has been designed (**PROPOSED**). Status moves to ACTIVE when integrated into the Humane Constitution. **RESOLVED** requires evidence-backed test passage.
- Compound threat linkages must be logged in both threat entries when identified.
- Detectability scores must be reviewed quarterly — new monitoring infrastructure (e.g., P-008 concentration dashboard) may raise D scores and reduce risk scores.

---

## Complete Register Summary — Session 8

| ID | Title | Severity | Status | Patch | Score |
| :--- | :--- | :--- | :--- | :--- | :--- |
| T-001 | Shadow Convertibility | **Critical** | **ACTIVE** | P-001 | 60 |
| T-002 | Identity Exploits | **Critical** | **ACTIVE** | P-003 | 60 |
| T-004 | Incentive Collapse | **Critical** | **ACTIVE** | P-002 | 48 |
| T-007 | Definition Drift | **Critical** | **ACTIVE** | P-004 | 60 |
| T-005 | Governance Throughput | High | **PROPOSED** | P-005 | 40 |
| T-006 | Measurement Lag | **Critical** | **PROPOSED** | P-006 | 60 |
| T-008 | Bureaucratic Elite | High | **PROPOSED** | P-008 | 64 |
| T-009 | Grace Exploitation | Med-High | **PROPOSED** | P-009 | 48 |
| T-011 | Narrative Surface | **Critical** | **PROPOSED** | P-011 | 80 |
| T-012 | PCRP Oracle Poisoning | **Critical** | **PROPOSED** | P-012 | 60 |
| T-013 | Throughput Starvation | High | **PROPOSED** | P-012 | 48 |
| T-014 | Triple Deadlock | **Critical** | **PROPOSED** | P-012 | 30 |
| T-015 | Demand Oracle Poisoning | High | **PROPOSED** | P-012 | 48 |
| T-016 | FAP Capture | **Critical** | **PROPOSED** | P-013 | 60 |
| T-017 | Bootstrap Problem | **Critical** | **PROPOSED** | P-014 / P-020 | 45 |
| T-018 | PCRP False-Trigger Exhaustion | High | **OPEN** | P-015 | 36 |
| T-019 | Demand-Context Suppression | High | **OPEN** | P-015 | 48 |
| T-020 | Epistemological Oracle Capture | **Critical** | **ADDRESSED** | P-017 | 60 |
| T-021 | Algorithmic Oracle Capture | **Critical** | **ADDRESSED** | P-017 | 60 |
| T-022 | Electoral Cycle Capture | **Critical** | **OPEN** | P-018 | 60 |
| T-023 | Pilot External Validity Collapse | Med-High | **OPEN** | P-019 | 32 |

| T-024 | Shared Storehouse Oracle-Failure During Active Rationing | **Critical** | **ADDRESSED** | P-022 | 60 |
| T-025 | Demurrage Sector-Capture via Investment Channel | High | **PROPOSED** | P-023 | 48 |
| T-026 | Exit Denial | **Critical** | **ADDRESSED** | Founding Order `exit_protocol.md` + Annex AI §3.4 + Annex AJ §4 | 48 |
| T-027 | Subsidiarity Violation | High | **ADDRESSED** | Founding Order `subsidiarity_rule.md` + Annex AI §3.2 | 36 |

Highest risk score: T-011 (Narrative Surface, score 80). Hardest to detect: T-008, T-016, T-019, T-020, T-021 (D=2). 4 ACTIVE, 12 PROPOSED, 5 OPEN, 4 ADDRESSED. 27 total IDs — 25 active, 2 retired (T-003, T-010). T-017 (Bootstrap Problem) is PROPOSED status; its patch P-014 is the FOUNDING instrument. T-001 and T-002 carry Session 8 open-problem additions (Annexes AJ and AK). T-020 and T-021 addressed by P-017 ACTIVE + Annex AL ACTIVE + FC-030/FC-031/FC-032/FC-033 (Proposal 3). T-025 addressed by P-023 (contract-commitment architecture, zero exemptions). T-026 and T-027 are new Session 9 Proposal 5 threat classes, both ADDRESSED by the Founding Order subsidiarity/consent/exit layer and the Federated Ombuds appeal infrastructure (Annex AI).

---

## Retired and Reserved IDs

| ID | Status | Reason |
| :--- | :--- | :--- |
| T-003 | **RETIRED** | Scope fully absorbed into T-002 (Identity Exploits) before formal register versioning. ID permanently retired. |
| T-010 | **RENUMBERED** | Consolidated with T-011 (Narrative Attack Surface) during Session 3. References to T-010 resolve to T-011. |

---

*Session 9 complete. T-024 → P-022 (Shared Storehouse oracle-failure fallback). T-025 → P-023 (contract-commitment architecture, zero demurrage exemptions). P-016 (identity AED) and P-021 (register disclosure) remain next-priority after P-022 and P-023.*

*Session 10 resolution: T-025 design question resolved. Direction B adopted — investment-channel exemptions removed entirely. Contract-commitment architecture serves genuine long-horizon capital needs without creating exploitable classifications. Ten red-team attack vectors identified and resolved before patch was written. Annex AR governs threshold values, deployment windows, and force majeure freeze caps.*

---

### T-026 — Exit Denial
- **Layer:** Governance / federation-scope layer
- **Severity:** Critical
- **Status:** ADDRESSED (Founding Order `exit_protocol.md` + Annex AI §3.4 + Annex AJ §4)
- **Risk Score:** 4×3×(6-2)=48
- **Mechanism:** A federation subset (captured CRP faction, captured enforcement body, or coordinated infrastructure operators) attempts to block, delay, or corrupt a valid exit event by: (a) refusing to publish the exit proposal on the federation record; (b) withholding Essential Access during the FC-121 730-day unwind, in violation of the unconditional Essential Access-continuity rule; (c) preemptively withdrawing federation infrastructure before day 730+90; (d) filing pretextual enforcement actions against exiting-unit representatives to suppress the exit vote; (e) manipulating the exit impact assessment beyond factual description; (f) refusing to update the drift chain with the exit row; (g) blocking re-apportionment of CRP seats held by delegates from the exiting unit.
- **Impact:** Defeats the fundamental non-coercion guarantee. An exit right that cannot be exercised is a trapdoor with a false label. A federation that denies exit while retaining the appearance of offering it converts to soft occupation; every internal protection becomes contingent on the captors' willingness to honor it — the exact failure mode the Founding Order was designed to prevent.
- **Detection:** Medium-high (D=2). Exit events are public drift-chain entries with Ombuds attestation; delay or refusal against a valid exit creates observable procedural-compliance gaps. Most attack surfaces (infrastructure withdrawal, Essential Access withholding) are measurable in real time.
- **Mitigation:** Founding Order `exit_protocol.md §Exit Denial — T-026` enumerates prohibited conduct. Annex AI §3.4 auto-convenes the Federated Ombuds Plenum on exit-denial complaints; Plenum finding under FC-091 (4-of-5) triggers Annex AJ §4 severity 3 (Institutional) penalties plus order of specific performance compelling the federation action. Unwind window auto-extends by the period of denial at federation cost (not exiting-unit cost).
- **Residual risk:** Slow-motion exit denial — federation action that is individually within the rules but cumulatively obstructive (e.g., slow publication, narrowly compliant impact-assessment language that misleads without violating). Mitigated by the drift-chain audit trail and the 180-day deliberation window that gives time for procedural integrity claims to be raised and adjudicated before the vote.
- **Compound linkages:** T-026 × T-008 (captured elite formation in federation-level bodies is the primary attack surface for exit denial; P-025 Federated Ombuds dispersal is the counter). T-026 × T-022 (hostile successor government attempting exit denial to prevent resource loss). T-026 × T-007 (definition drift around "valid exit vote" standards — closed by P-004 + publication of FC-120 threshold in Tier 1 architecture).

---

### T-027 — Subsidiarity Violation
- **Layer:** Governance / scale-decision layer
- **Severity:** High
- **Status:** ADDRESSED (Founding Order `subsidiarity_rule.md` + Annex AI §3.2 challenge; Proportionality Principle)
- **Risk Score:** 3×3×(6-2)=36
- **Mechanism:** The federation (or a region acting above its scale competence) decides a matter that is properly resolvable at a smaller scale, imposing uniform rules where scale-appropriate differentiation is competent. Pathway vectors: (a) expanding the "federation-scale by construction" list without Tier 1 amendment; (b) using soft exceptions (cross-unit externality claims, measurement coordination claims) as a routine basis for federation preemption rather than last-resort; (c) declining to express federation rules as floors-plus-local-customization where floor-expression would suffice; (d) inconclusive subsidiarity challenge reviews resolving toward the larger scale despite the default-against-escalation rule; (e) slow erosion of the three-prong competence test through precedent accumulation.
- **Impact:** The protocol drifts toward centralization without any single amendment being visibly centralizing. Ostrom's principle 2 (rules match local conditions) is violated by default. Units that would have handled matters competently are preempted, reducing local competence over time (principle-erosion feedback loop). The federation's default reach grows; every article that depends on local adaptation (Article III capacity measurement, Article V enterprise scaling, Article I enforcement) loses calibration to local context.
- **Detection:** Medium (D=2). Requires cross-scale comparison over time — which smaller-scale decisions were preempted when they could have been competent? The Federated Ombuds §4.3 cohort concentration tracking extended to decision-scale concentration (§4.3 "concentration of decision venue at federation scale") provides the detection infrastructure.
- **Mitigation:** The subsidiarity rule (`subsidiarity_rule.md §Three-Prong Competence Test`) is Tier 1 protected. Federation-scale-by-construction list is exhaustive and Tier 1-locked; extensions require 7-of-9 amendment. Soft-exception invocations are logged and audited. The Proportionality Principle is enforceable by Ombuds appeal: a federation action adopting a uniform rule where a floor would suffice is challengeable, and the Plenum (Annex AI §3.2) may remand for reconsideration under FC-091.
- **Residual risk:** The three-prong test applied at the margin can accommodate reasonable-seeming expansion over many individual decisions. Mitigation is aggregate monitoring — the Ombuds §4.3 federation-decision-concentration report is an Article VII metric published annually; significant drift toward federation-scale decision venue is itself a trigger event.
- **Compound linkages:** T-027 × T-022 (electoral cycle capture often operates through subsidiarity violation — a captured federation adopts uniform rules that would otherwise be local prerogatives). T-027 × T-008 (centralization of decision venue is an elite-formation vector; decisions concentrated in federation bodies produce concentrated expertise pools). T-027 × T-007 (definition drift around "federation-scale by construction" categories; closed by explicit enumeration).*
