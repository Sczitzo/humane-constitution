# Threat Register

**Running adversarial control layer aligned to the master protocol · Updated: Session 2 (T-005, T-006, T-008 addressed; statuses updated)**

---

**Purpose.** This register tracks the adversarial risks identified during the current hardening cycle and aligns them to the master protocol. It is the running control layer for red-team work, not a replacement for the master protocol.

**Status key.** 
- **OPEN** = not yet structurally addressed. 
- **PARTIAL** = mitigation path defined but not fully integrated/tested.
- **ACTIVE** = mitigation integrated, requires simulation and tuning. 
- **RESOLVED** = closed after evidence-backed testing.

**Scoring convention.** Risk Score = I × L × (6 − D) where I = Impact, L = Likelihood, D = Detectability (each 1–5; higher D = more detectable = lower risk multiplier).

---

## Summary by Priority

| Threat ID | Title | Severity | Status | Core Point | Score |
| :--- | :--- | :--- | :--- | :--- | :--- |
| T-001 | Shadow Convertibility | **Critical** | **PARTIAL** | Contain scalable LC↔EC arbitrage without authoritarian overreach. | 60 |
| T-002 | Identity Exploits | **Critical** | **PARTIAL** | Treat identity as a permanent adversarial surface; preserve the humane floor. | 60 |
| T-004 | Incentive Collapse | **Critical** | **PARTIAL** | Guarantee dignity while keeping contribution materially and psychologically real. | 48 |
| T-005 | Governance Throughput Failure | High | **ADDRESSED*** | Prevent review layers from becoming bottlenecks that trigger bypass normalization. | 40 |
| T-006 | Measurement Lag / Supply Shock | **Critical** | **ADDRESSED*** | Force graceful degradation when reality data is noisy, incomplete, or lagged. | 60 |
| T-007 | Political Definition Drift | **Critical** | **PARTIAL** | Stop semantic capture through definitions, classifications, and technical relabeling. | 60 |
| T-008 | Bureaucratic Elite Formation | High | **ADDRESSED*** | Prevent process insiders from becoming a durable managerial class. | 64 |
| T-009 | Grace Exploitation Loop | Med-High | **OPEN** | Keep humane recovery paths from becoming durable exploit channels. | — |
| T-010 | Narrative Attack Surface | **Critical** | **OPEN** | Make the system intelligible before hostile framing fixes public perception. | — |

*\* ADDRESSED = mitigation patch designed (PROPOSED) but not yet ACTIVE. Status will update to ACTIVE when patches are integrated into master protocol.*

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
- **Mitigation direction:** LC-only essential access, non-delegable redemption, context-locked use, tolerance for low-level leakage, and broker-focused enforcement. → P-001 ACTIVE.
- **Open problem:** define the acceptable leakage threshold and verify that containment does not quietly become surveillance.

---

### T-002 — Identity Exploits
- **Layer:** Identity / access / civic activation
- **Severity:** Critical
- **Status:** PARTIAL
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** duplicate identities, account takeover, synthetic identities, proxy use, and recovery fraud.
- **Impact:** drains LC, corrupts CR/DW legitimacy, and can exclude vulnerable people if controls become too harsh.
- **Detection:** cross-signal deduplication, recovery anomaly review, impossible-use patterns, and staged assurance mismatches.
- **Mitigation direction:** four-tier identity assurance model, multi-evidence thresholding, no master credential, recovery safety ladder, humane-floor continuity during disputes. → P-003 ACTIVE.
- **Open problem:** calibrate fraud tolerance without making the system unusable for displaced, undocumented, or digitally fragile people.

---

### T-004 — Incentive Collapse
- **Layer:** Economic / behavioral / civic motivation
- **Severity:** Critical
- **Status:** PARTIAL
- **Risk Score:** 5×3×(6-3)=48 (updated)
- **Mechanism:** universal LC reduces desperation, but weak reward gradients can flatten initiative, excellence, and long-horizon effort.
- **Impact:** slow stagnation, mediocre output equilibrium, and declining willingness to take on hard or high-skill work.
- **Detection:** participation decline, lower high-skill throughput, concentration of difficult work into narrow groups, and weak innovation rates.
- **Mitigation direction:** nonlinear reward curves, multi-channel rewards (EC, civic standing, status/recognition), opportunity access, and anti-gaming scoring. → P-002 ACTIVE.
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
- **Open problem:** Operational sub-panel capture risk; throughput theater detection limits; interim bridge scope creep. Ombuds Office concentration risk inherited from P-008.
- **Compound linkages:** T-005 × T-006 (PCRP window sync); T-005 × T-008 (PCRP as power locus); T-005 × T-001 (paralysis extends exploit windows).

---

### T-006 — Measurement Lag / Supply Shock
- **Layer:** Measurement / oracle / scarcity logic
- **Severity:** Critical
- **Status:** ADDRESSED (P-006 PROPOSED)
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** mixed-cadence oracle architecture creates exploitable measurement speed hierarchy. Two failure modes: lag-induced over-issuance (LC issued into depleting pool) and lag-induced false restriction (SQ maintained after recovery). First-responder authority undefined for inter-cycle shocks.
- **Impact:** over-issuance into real scarcity; prolonged unjustified restriction after recovery; black-market opportunity windows during cadence exploit gaps.
- **Detection:** forecast-vs-actual variance, LC redemption velocity spikes, cross-category co-movement signals, fill-rate tracking, cross-publisher divergence.
- **Mitigation direction:** P-006 PROPOSED: sentinel indicator mandate (max lag by volatility class); Pre-Confirmation Response Protocol (PCRP) defining first-responder authority; SQ unwind symmetry / recovery fast-track; cadence-adjusted U8 bridge (48h high-volatility). [Ambitious] LC redemption velocity as native sentinel; cross-category demand surge detector. See Patch Log P-006 and Annex AC2.
- **Open problem:** PCRP scope must be a protected term under P-004. Inter-cycle gap compressed not eliminated. False PCRP activation risk requires false-trigger tracking.
- **Compound linkages:** T-006 × T-001 (cadence windows = black market windows); T-006 × T-005 (PCRP timing sync); T-006 × T-008 (PCRP REB authority = elite formation risk).

---

### T-007 — Political Definition Drift
- **Layer:** Governance semantics / hidden capture
- **Severity:** Critical
- **Status:** PARTIAL
- **Risk Score:** 5×4×(6-3)=60
- **Mechanism:** redefine 'essential,' 'capacity,' 'contribution,' 'scarcity,' or 'clarification' in ways that alter outcomes without overt repeal.
- **Impact:** the architecture stays on paper while the humane floor shrinks or civic legitimacy skews.
- **Detection:** semantic impact audits, worked examples, quality-floor changes, and cumulative narrowing triggers.
- **Mitigation direction:** protected term classes, semantic effect test, public definition registry, anti-laundering rule, upward default on ambiguity. → P-004 ACTIVE. P-006 extends: 'supply shock' added as protected term. P-008 extends: qualification standard criteria added as protected specification.
- **Open problem:** institutionalize without creating a semantic bureaucracy that freezes useful iteration.

---

### T-008 — Bureaucratic Elite Formation
- **Layer:** Civic / verification / oversight layer
- **Severity:** High
- **Status:** ADDRESSED (P-008 PROPOSED)
- **Risk Score:** 4×4×(6-2)=64
- **Mechanism:** three pipelines: (1) Verification Control Loop — CR → verifier eligibility → CR minting control; (2) Positional Entrenchment — low-DW/high-CR actors hold enforcement and audit positions invisibly; (3) Expertise Pool Homogenization — 'demonstrated competence' requirements produce a professionally connected class. Proceeds entirely through legitimate behavior — no anomaly signals under current monitoring.
- **Impact:** capture of verification, oversight, and constitutional interpretation infrastructure. Does not directly harm LC floor but undermines every other safeguard over time.
- **Detection:** Very low (D=2). Visible only in aggregate metrics over multi-year horizon. P-008 creates the first detection infrastructure: legibility gap audit, concentration dashboard, cohort overlap index.
- **Mitigation direction:** P-008 PROPOSED: legibility gap audit; CR sector ceiling specification (founding precondition); epistemic diversity requirement (three-axis); verification independence rule; cooling-off cohort rule; [ambitious] qualification standard governance; concentration dashboard with auto-escalation. See Patch Log P-008 and Annex AC3.
- **Open problem:** Ombuds Office carries three load-bearing P-008 functions — if Ombuds becomes elite formation site, all three fail simultaneously. Open question: who audits the auditors of elite formation?
- **Compound linkages:** T-008 × T-011 (elite formation creates narrative attack surface); T-008 × T-005 (PCRP authority); T-008 × T-006 (REB PCRP authority).

---

### T-009 — Grace Exploitation Loop (Updated Entry)
- **Layer:** Hardship / continuity / civic standing
- **Severity:** Med-High
- **Status:** ADDRESSED* (P-009)
- **Risk Score:** 4×3×(6-2)=48
- **Mechanism:** Four exploit classes: (1) Category Rotator — switches qualifying hardship category at each renewal to restart the clock; (2) Network Pause Ring — 8-person group rotates pause/contribution cycles, all maintaining high CR indefinitely; (3) Involuntary Unemployment Farmer — manufactured evidence of involuntary separation; (4) Civic Position Extender — uses pause to freeze CR above service eligibility threshold without ongoing contribution. T-009 is also the primary bypass route for P-008 cohort cooling controls.
- **Impact:** Institutional position preservation without genuine contribution. Elite formation (T-008) persists even when P-008 controls are nominally active. Civic pool diversity requirements (P-008 AC3.3) are satisfied on paper while the same coordination class maintains eligibility through coordinated pause.
- **Detection:** D=2 before P-009 (invisible — proceeds through legitimate channels). After P-009: cross-quarter history review, hardship attestation collusion graph (AF3), pool saturation monitoring (AF5), CR slow-decay trajectory analysis.
- **Mitigation direction:** P-009 PROPOSED: graduated renewal intensity (AF1); cross-quarter history review (AF2); hardship attestation collusion detection (AF3); CR slow-decay at 20% of normal (AF4); service pool pause-saturation monitoring (AF5); [ambitious] capability development pathway (AF6); [ambitious] T-009 × P-008 explicit closure (AF7). See Annex AF.
- **Residual risk:** Involuntary unemployment category remains the most exploitable qualifying condition. Contains but does not eliminate low-level grace exploitation (1-2 quarter use by actors who don't genuinely need it) — accepted as system leakage, cost of frictionless access for genuine hardship.
- **Compound linkages:** T-009 × T-008 (primary bypass for P-008 — AF7 closes it). T-009 × T-011 (graduated renewal must be communicated via P-011 CFRL or becomes 'system punishes sick people' narrative attack).

---

### T-010 / T-011 — Narrative Attack Surface (Updated Entry)
- **Layer:** Public communication / legitimacy perception
- **Severity:** Critical
- **Status:** ADDRESSED (P-011 PROPOSED)
- **Risk Score:** 5×4×(6-2)=80
- **Note on risk score:** T-011 carries a D=2 (low detectability) score — narrative attacks are difficult to detect early and the damage (fixed hostile framing) is largely irreversible once established. The risk score of 80 is the highest in the register, reflecting the asymmetric nature of narrative risk: low cost to attack, high cost to defend, and time-bounded defense window.
- **Mechanism:** hostile framing fixes public perception before the system can demonstrate real-world outcomes. Six vectors: social credit framing (DW/CR mischaracterized), elite capture narrative (T-008 provides factual hook), complexity-as-illegitimacy (12 pillars / 87-page master), failure amplification (any operational event), technocracy framing (expertise requirements), and 'untested' (true pre-launch).
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
- **Impact:** Mandatory emergency decision cannot be made; humane floor at risk if Level 4 continuity provisions are not explicitly activated during deadlock.
- **Detection:** Low (L=2) — requires simultaneous independent conditions. Deadlock auto-declaration (AE2.3) creates first detection mechanism.
- **Mitigation:** P-012 AE2.3 — emergency deadlock resolution protocol; humane floor bridge unconditional; 3-member arbitration panel within 6 hours.
- **Residual risk:** Second-generation deadlock (arbitration panel itself blocked) escalates to Level 5 structural review — no sub-Level-5 resolution path defined.

---

### T-015 — Demand-Side Oracle Poisoning
- **Layer:** Measurement / PCRP / issuance
- **Severity:** High
- **Status:** ADDRESSED* (P-012)
- **Risk Score:** 4×3×(6-2)=48
- **Mechanism:** LC redemption velocity oracle and other demand-sensitive measurement systems cannot distinguish genuine supply shocks from demand surges caused by: EC enforcement unwinds; mass re-verification campaigns; coordinated spending by issuance-capture entities before unwind. Demand spikes trigger supply-shortage responses (PCRP, reserve release) that are wrong for the actual condition.
- **Impact:** False PCRP activated during enforcement action; LC issuance reduced during period when supply is actually adequate but demand is elevated. Double-deprivation risk: enforcement reduces EC availability while false PCRP reduces LC availability simultaneously.
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
- **Residual risk:** Desk review case selection; founding panel capture during 14-day window; post-activation audit self-reference if activation was compromised. All mitigated by adversarial member, external verification, and Formal Acceptance Protocol fallback during any suspension.
- **Compound linkages:** T-017 × T-016 (bootstrap paradox is the exploit surface T-016 bad actors use for indefinite delay). T-017 × T-011 (bootstrap paradox is a narrative attack surface — P-014 converts it into a transparency demonstration).

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
- If two patches conflict, the conflict belongs in the patch log and must be resolved explicitly in the master protocol.
- Threat IDs remain stable across versions. The wording may sharpen; the ID should not drift.
- **ADDRESSED** status indicates a patch has been designed (**PROPOSED**). Status moves to ACTIVE when integrated into master. **RESOLVED** requires evidence-backed test passage.
- Compound threat linkages must be logged in both threat entries when identified.
- Detectability scores must be reviewed quarterly — new monitoring infrastructure (e.g., P-008 concentration dashboard) may raise D scores and reduce risk scores.

---

## Complete Register Summary — Session 5

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

Highest risk score: T-011 (Narrative Surface, score 80). Hardest to detect: T-008 and T-016 (D=2 on key exploit surfaces). All 14 threats have mitigation designs. 4 ACTIVE, 10 PROPOSED.

---

*Session 4 complete. All named threats now have mitigation designs.*

*Next priority: White Paper sync (mandatory pre-launch gate), Technical Reference diagram update, then formal acceptance process for Annexes AC–AF.*
