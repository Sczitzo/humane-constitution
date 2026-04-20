# Patch Log

**Running change ledger aligned to the master protocol · Updated: Session 9 economic-governance integration (P-029 through P-033 added)**

---

**Purpose.** This log records the hardening changes introduced during the current cycle and keeps a traceable link between threats, mitigations, introduced risks, and remaining open questions.

**Rule.** The patch log is not a substitute for the master. The master holds the law-like text; the patch log explains how and why the hardening evolved.

**Pillar nomenclature note (Proposal 2 close-out, 2026-04-18).** The operational architecture was restructured from twelve pillars into **Seven Pillars + P0** (v13). Patch entries authored before the restructure continue to reference v12 pillar numbers in dependencies and integration sections (e.g., "Pillar 10 demand-context register", "Pillar 11 dashboard", "Pillar 8 / Annex K4"). Those references resolve to v13 pillars via the crosswalk in `Master_Protocol.md` §III:

| v12 reference | v13 pillar |
| :--- | :--- |
| Pillar 1 (Constitutional Invariants) | P1. Rights & Rule of Law |
| Pillar 2 (Personhood) | P2. Personhood & Continuity |
| Pillar 3 (RCS) | P3. Physics & Reserves |
| Pillar 4 (Life Support / LC delivery) | P4. Survival (LC Instrument + Delivery) |
| Pillar 5 (Monetary Architecture) | split: LC→P4, EC→P5, DW/CR→P6 |
| Pillar 6 (Land/Housing/Commons) | P5. Markets, Commons & Public Finance |
| Pillar 7 (Enterprise) | P5. Markets, Commons & Public Finance |
| Pillar 8 (Contribution/Capability) | P6. Civic Layer |
| Pillar 9 (Civic Deliberation) | P6. Civic Layer |
| Pillar 10 (Operations/Oversight) | P1. Rights & Rule of Law (rule-bound execution) |
| Pillar 11 (Transparency) | P7. Transparency & Environmental Scanning |
| Pillar 12 (PFCR) | P5. Markets, Commons & Public Finance |

Inline dependencies are preserved as-authored for audit traceability; the mapping above is authoritative.

**Patch status convention:** 
- **ACTIVE** = adopted and awaiting simulation/tuning. 
- **SUPERSEDED** = replaced by a later patch. 
- **PROPOSED** = designed but not yet accepted into the master. 
- **RETIRED** = intentionally removed.

---

## Patch Inventory

| Patch ID | Related Threat | Status | Priority | Core Change |
| :--- | :--- | :--- | :--- | :--- |
| P-001 | T-001 | **ACTIVE** | Critical | Contain shadow convertibility through friction, detection, and broker-focused enforcement. |
| P-002 | T-004 | **ACTIVE** | Critical | Stabilize incentives with nonlinear reward architecture and anti-gaming design. |
| P-003 | T-002 | **ACTIVE** | Critical | Replace single-gate identity with differential assurance and recovery-safe continuity. |
| P-004 | T-007 | **ACTIVE** | Critical | Stop semantic capture through definition governance and anti-laundering rules. |
| P-005 | T-005 | **PROPOSED** | Critical | Governance throughput: tiered CRP queues, throughput floor, emergency re-declaration. |
| P-006 | T-006 | **PROPOSED** | Critical | Measurement lag: sentinel mandate, PCRP first-responder authority, SQ unwind symmetry. |
| P-008 | T-008 | **PROPOSED** | High | Elite formation: legibility audit, diversity mandates, verification independence, cohort cooling. |
| P-009 | T-009 | **PROPOSED** | Med-High | Grace exploitation: graduated renewal, cross-quarter history, collusion detection, CR slow-decay. |
| P-011 | T-011 | **PROPOSED** | Critical | Narrative hardening: RPCP, pre-committed failure doctrine, CFRL, adversarial narrative simulation. |
| P-012 | T-012–T-015 | **PROPOSED** | Critical | Interface hardening: oracle independence, categorical throughput floors, deadlock protocol, demand-context flag. |
| P-013 | T-016 | **PROPOSED** | Critical | FAP integrity: representativeness standard, deadlock timeline, audit epistemic independence, anti-gaming Tier 2. |
| P-014 | T-017 | **PROPOSED** | Critical | Bootstrap activation: one-time founding instrument for P-013 activation only. |
| P-015 | T-018 / T-019 | **PROPOSED** | High | PCRP attack surface: false-trigger escalation path, exhaustion alert, manufactured flag assessment. |
| P-016 | T-002 | **PROPOSED** | Critical | Identity asymmetric error doctrine: quantified fraud/exclusion rate targets, Tier 2 founding commitment. |
| P-017 | T-020 / T-021 | **ACTIVE** | Critical | Oracle epistemological and algorithmic independence: methodology-class diversity, AI supply chain transparency, physical ground-truth requirement. Numerical floors (N≥5, ≥3 classes, ≤0.30 pairwise correlation, ≥1 adversarial seat) bound in `/founding/commitments.md` FC-030/FC-031/FC-032/FC-033. |
| P-018 | T-022 | **PROPOSED** | Critical | Electoral cycle resilience: entrenchment ladder, LC floor minimum persistence, administrative hollowing triggers, transition continuity protocol. |
| P-019 | T-023 | **PROPOSED** | Med-High | Pilot external validity gate: stress-condition pilot requirement, red-team challenge window, crisis simulation mandate. |
| P-020 | T-017 (residual) | **PROPOSED** | Critical | Founding window extension: 60-day pre-activation disclosure, oppose-coalition adversarial member nomination. |
| P-021 | — | **PROPOSED** | High | Register disclosure protocol: bifurcation into public and restricted versions; operational security for detection thresholds. |
| P-022 | T-024 | **ACTIVE** | Critical | SQ oracle-failure fallback: conservative hold, 48h REB first-responder window, 72h governance handoff, FC-100 14-day restoration verification, reconciliation review. Annex AQ ACTIVE. |
| P-023 | T-025 | **PROPOSED** | High | Demurrage sector-capture: contract-commitment architecture, zero exemptions, demurrage-as-discipline, milestone escrow. |
| P-024 | T-009 / TR-07 / T-018 (residual) | **ACTIVE** | Critical | Attestation-at-risk stake mechanism: FC-080 stake ratio, FC-081 audit window, FC-082 graph density threshold, slashed-stake redistribution, graph-density safe harbor for legitimate close-knit communities. Annex AS. |
| P-025 | T-008 (residual) / meta-capture | **ACTIVE** | Critical | Federated Ombuds constitution: 5 sub-Ombuds (FC-090), 4-of-5 Plenum supermajority (FC-091), 730-day staggered terms (FC-092), Oversight Assembly (7 members, 5-of-7), structural-dispersal criteria, Concentration Response. Annex AI rewritten. Supersedes single-commissioner draft. |
| P-026 | T-026 / T-027 | **ACTIVE** | Critical | P0 Subsidiarity, Consent & Exit layer: smallest-scale default with three-prong competence test; affirmative consent events at 2/3 supermajority (FC-120); 730-day graceful exit unwind (FC-121) with LC continuity preserved; five-scale hierarchy (FC-122: household/neighborhood ≤500/locality ≤5,000/region ≤500,000/federation); re-entry symmetric, no penalty. `/pillars/P0_subsidiarity/` directory. |
| P-027 | structural simplification / T-005 / T-008 (residual) | **ACTIVE** | Critical | Proposal 2 pillar consolidation: twelve pillars → Seven Pillars + P0 (v13). Five redundant pairs collapsed (P1/P10, P4/P5-LC, P6/P7, P11/P10 S3-S3*, P3/P12-as-reserves); Beer-VSM S4 environmental-scanning function added; PFCR (external v12 P12) absorbed into new P5 Markets, Commons & Public Finance. Legacy v12 nomenclature preserved in crosswalk tables. `Master_Protocol.md` §III, `White_Paper.md` §4. |
| P-029 | T-016 / public-funding architecture | **ACTIVE** | Critical | Public Finance & Commons Revenue (PFCR): structural non-tax public funding, demurrage routing, public banking rails as infrastructure, and anti-hidden-debt discipline. |
| P-030 | PRD-004 / household coercion | **ACTIVE** | Critical | Protocol-only money creation + household finance boundaries: no private EC creation, no compounding household ordinary-life debt, no survival-floor securitization. |
| P-031 | PRD-009 / dynastic capture | **ACTIVE** | Critical | Anti-dynasty ownership: count-through beneficial ownership, trust prohibition for extractive continuity, succession limited to continuity and stewardship. |
| P-032 | PRD-009 / rent extraction | **ACTIVE** | High | Stewardship ownership rule: land, housing, and enterprise rights may not become perpetual passive extraction claims. |
| P-033 | PRD-008 / enterprise governance | **ACTIVE** | High | Worker-owned and mission-locked enterprise preference: financing, procurement, and succession pathways structurally favor stewardship forms over absentee control. |

---

## Session 9 Patches — Integrated Constitutional Direction

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-029 | T-016 / public-funding architecture | **ACTIVE** | Critical | constitutional fiscal redesign |
| P-030 | PRD-004 / household coercion | **ACTIVE** | Critical | monetary + retail-finance boundary |
| P-031 | PRD-009 / dynastic capture | **ACTIVE** | Critical | ownership + succession + anti-circumvention |
| P-032 | PRD-009 / rent extraction | **ACTIVE** | High | constitutional ownership standard |
| P-033 | PRD-008 / enterprise governance | **ACTIVE** | High | enterprise-preference and succession design |

### P-029 — Public Finance & Commons Revenue (PFCR)

- **Introduced design:** replaces the former catch-all resilience pillar with a dedicated public-funding pillar. PFCR funds public operations through demurrage routing, commons and land-use charges, asset carrying costs, gateway fees, and bounded public issuance tied to real public production.
- **Clauses integrated:** no taxes on survival access, ordinary labor, or basic household exchange; public banking rails funded as infrastructure; postal-bank/public-bank option; anti-hidden-debt rules; source-by-source public reporting.
- **Dependencies:** demurrage routing rule, asset carrying cost enforcement, gateway registry, and budget transparency stack.
- **New risks introduced:** fiscal dependence on poorly calibrated demurrage or gateway flows; naming disputes over what counts as a prohibited tax. Mitigated by judicial review trigger and source registry.

### P-030 — Protocol-Only Money Creation and Household Finance Boundaries

- **Introduced design:** only protocol-authorized issuance bodies may create EC or EC-equivalent purchasing power. Private institutions may lend existing EC, but may not create new EC, deposit substitutes, or debt-expanded currency-like claims.
- **Clauses integrated:** compounding interest prohibited on household ordinary-life debt; no securitization of survival-linked household claims; no revolving survival traps; public retail banking floor on the common rail.
- **Dependencies:** retail-rail charter, prudential supervision of licensed providers, and public option continuity.
- **New risks introduced:** shadow-credit attempts outside the chartered rail, and pressure to relabel hidden fees as service charges. Mitigated by common-rail enforcement and anti-equivalence review.

### P-031 — Anti-Dynasty Ownership

- **Introduced design:** beneficial ownership always counts through to natural persons or mission-locked/community bodies. Perpetual trusts, shell chains, and equivalent structures may not preserve extractive control across generations.
- **Clauses integrated:** family continuity protected in modest form, but dynastic landlordism, absentee succession structures, and perpetual extractive wrappers are prohibited.
- **Dependencies:** beneficial-ownership registry, succession review rules, and housing / enterprise stewardship standards.
- **New risks introduced:** harder succession planning for legitimate family continuity cases. Mitigated by explicit continuity allowances for homes, tools, dependents, and mission-locked stewardship bodies.

### P-032 — Stewardship Ownership Standard

- **Introduced design:** ownership across land, housing, and enterprise is reframed as stewardship rather than a perpetual tribute right. Capital may be rewarded for risk and contribution, but not for endless passive extraction from necessity or labor.
- **Clauses integrated:** bounded capital claims, anti-rent use-right logic, and judicially reviewable passive-extraction prohibitions.
- **Dependencies:** Pillar 6 use-right enforcement, Pillar 7 capital-instrument redesign, and ACC / anti-monopoly enforcement.
- **New risks introduced:** valuation disputes around what counts as productive stewardship. Mitigated by published criteria, appeal paths, and mission-lock documentation.

### P-033 — Worker-Owned and Mission-Locked Enterprise Preference

- **Introduced design:** worker-owned, cooperative, and mission-locked firms receive structural preference in PFCR-backed finance, procurement, retained-earnings treatment, worker buyout pathways, and founder-exit conversion rules.
- **Clauses integrated:** natural monopolies moved to a separate regulated-utility track; outside capital claims must be capped, redeemable, sunset, or otherwise bounded.
- **Dependencies:** procurement rules, cooperative finance tools, public venture / buyout facilities, and utility-governance charter.
- **New risks introduced:** preferential treatment could be gamed by sham cooperatives. Mitigated by governance-proof requirements, payout constraints, and beneficial-ownership transparency.

## Session 1 Patches — Detailed Entries

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-001 | T-001 | **ACTIVE** | Critical | structural + behavioral detection + targeted enforcement. |

### P-001 — Shadow Convertibility Containment

- **Introduced design:** LC-only essential access, non-delegable redemption, context-locking where proportionate, anomaly detection, broker targeting, and an explicit leakage-tolerance concept.
- **Clauses to integrate:** Essential Access Exclusivity, Non-Delegable Consumption, Leakage Tolerance, Broker-Focused Enforcement.
- **Dependencies:** identity assurance, coercion reporting pathways, and sufficiently accurate essential-supply management.
- **New risks introduced:** over-surveillance, false positives, user friction, and migration of abuse into proxy-identity channels.
- **Residual risk:** small-scale favors and informal pooling remain acceptable if they do not scale into arbitrage infrastructure.

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-002 | T-004 | **ACTIVE** | Critical | economic + behavioral + contribution architecture. |

### P-002 — Incentive System Stabilization

- **Introduced design:** nonlinear reward curves, multi-channel rewards (EC, civic standing, status/recognition), opportunity access, time/flexibility rewards, and anti-gaming contribution assessment.
- **Clauses to integrate:** Incentive Nonlinearity, Multi-Channel Reward, Outcome-Based Contribution, Anti-Gaming Contribution.
- **Dependencies:** identity attribution, contribution verification, and governance rules for how civic standing can matter without becoming coercive privilege.
- **New risks introduced:** status hierarchy, burnout optimization, and domain bias toward easier-to-measure work.
- **Residual risk:** optimization behavior remains, but the design goal is to align it with contribution rather than suppress it.

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-003 | T-002 | **ACTIVE** | Critical | structural + security + continuity protection. |

### P-003 — Identity System Hardening

- **Introduced design:** four assurance tiers (humane floor, provisional, core, civic activation), multi-evidence thresholding, no master credential, hardened recovery, anti-Sybil controls, and no-survival-lockout under uncertainty.
- **Clauses to integrate:** Identity Adversarial Reality, Differential Assurance, Recovery Safety, No Master Credential, Identity Failure Continuity.
- **Dependencies:** appeals architecture, ombuds/advocate pathways, and clear separation between verification and monitoring.
- **New risks introduced:** complexity, onboarding friction, and slower recovery for legitimate edge cases if poorly implemented.
- **Residual risk:** low-level fraud remains possible and should be contained rather than denied in theory.

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-004 | T-007 | **ACTIVE** | Critical | governance + constitutional anti-capture control. |

### P-004 — Definition Drift Protection

- **Introduced design:** protected term classes, semantic effect test, worked-example requirement, public definition registry, upward classification default, and anti-laundering control across code, vendor, and standards layers.
- **Clauses to integrate:** Definition Integrity, Semantic Effect, Upward Classification Default, Worked Example Requirement, Definition Registry, Anti-Laundering.
- **Dependencies:** classification authority, change-control process, and review capacity.
- **New risks introduced:** process friction, slower iteration, and semantic bureaucracy if overbuilt.
- **Residual risk:** subtle drift can still occur unless registry, examples, and challenge windows are actually used.

---

## Session 2 Patches — Detailed Entries

**Status: PROPOSED.** These patches are not yet operative. They become operative only when formally integrated into the master protocol and status updated to ACTIVE.

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-005 | T-005 | **PROPOSED** | Critical | structural + procedural + monitoring |

### P-005 — Governance Throughput Hardening

- **Change type:** structural + procedural + monitoring.
- **Introduced design:** CRP dual-queue separation (constitutional vs. operational); minimum operational throughput floor (5 priority decisions per quarter, non-blockable by constitutional challenges); sequential emergency re-declaration cap (2 consecutive quarters max, requires independent audit and public justification to extend); intake throttle with priority scoring (impact × urgency × reversibility; DW-signal for urgency; overflow is public); cross-quarter interim authorization bridge (Ombuds + 1 rotating CRP member + regional exec; scope-locked to emergency declaration; provisional only; cannot narrow LC access or touch constitutional matters); decision quality audit metrics (alternatives-presented ratio, reversal rate, minority dissent rate); [Ambitious] real-time throughput dashboard with auto-escalation trigger.
- **Clauses to integrate:** CRP Dual-Queue Separation; Minimum Throughput Floor; Sequential Emergency Cap; Intake Throttle and Priority Scoring; Cross-Quarter Interim Bridge; Decision Quality Metrics. See Annex AC1.
- **Dependencies:** Annex L (CRP sub-panel composition); Annex T (simulation mandate extension); Pillar 5 compliance matrix; Level 3–4 emergency cascade table.
- **New risks introduced:** Operational sub-panel capture if composition predictable; interim bridge scope creep; priority scoring gaming; [ambitious] throughput dashboard exposure of vulnerability windows (mitigated by 48-hour publication lag).
- **Residual risk:** Throughput theater remains hard to detect. Patient actor can operate within throughput floors while maintaining effective paralysis through distributed delay across proposals.
- **Compound linkages:** T-005 × T-006 (PCRP window synchronization); T-005 × T-008 (PCRP authority as new power locus); T-005 × T-001 (paralysis extends cadence exploit windows).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-006 | T-006 | **PROPOSED** | Critical | structural + authority definition + measurement architecture |

### P-006 — Measurement Lag and Supply Shock Hardening

- **Change type:** structural + authority definition + measurement architecture.
- **Introduced design:** Sentinel indicator mandate — every slow-audit essential category requires a faster low-fidelity signal; max lag by volatility class (48h high / 7d medium / 30d low). Pre-Confirmation Response Protocol (PCRP) — defined first-responder authority (Regional Executive Body, joint activation); permitted: 70% above-baseline issuance reduction, reserve release, expedited oracle review (humane floor issuance stays 100%); prohibited: full SQ, humane floor narrowing, other categories, beyond 72h without oracle confirmation; false-trigger tracking — 3 false activations per 4 quarters triggers mandatory independent audit. SQ unwind symmetry — recovery fast-track mirrors PCRP; conservative bias applies to activation, not prolonged restriction after recovery. Cadence-adjusted U8 bridge — 48-hour trigger for high-volatility categories; 7-day retained for medium-volatility. [Ambitious] LC redemption velocity as native sentinel (150% spike threshold). [Ambitious] Cross-category demand surge detector.
- **Clauses to integrate:** Sentinel Indicator Mandate; PCRP; PCRP Scope Definition (protected term under P-004); SQ Unwind Symmetry; Cadence-Adjusted U8 Bridge. See Annex AC2.
- **Dependencies:** Regional Executive Body formally constituted with joint-activation rules. LC ledger redemption velocity in privacy-preserving aggregate form. Annex M extended with cadence floors. Annex U8 modified.
- **New risks introduced:** PCRP soft-power weaponization; two-source corroboration gaming; recovery fast-track exploit via manufactured sentinel signals; [ambitious] LC velocity oracle suppression gaming (mitigated by anomaly detection on suppression patterns).
- **Residual risk:** Inter-cycle gap is compressed not eliminated. 'Supply shock' must be a protected term under P-004 with worked examples to prevent scope creep.
- **Compound linkages:** T-006 × T-001 (cadence windows = black market opportunity); T-006 × T-005 (PCRP window synchronization); T-006 × T-008 (PCRP authority at REB = elite formation risk).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-008 | T-008 | **PROPOSED** | High | structural + measurement + institutional design |

### P-008 — Bureaucratic Elite Formation Hardening

- **Change type:** structural + measurement + institutional design.
- **Introduced design:** Legibility gap audit — quarterly Pillar 8 report tracks verification approval rate, evidence burden, appeals rate, and abandonment rate by contribution category; 20-point disparity triggers independent process audit (not by incumbent verifier pool). CR sector ceiling specification mandate — max 25% per sector, max 35% per identifiable institutional-origin cluster in any CR-governed service pool; specified at founding as precondition under Annex N. Epistemic diversity requirement — three-axis standard (institutional origin ≤30%, contribution-type diversity ≥30% informal/care, geography ≥25% non-urban-dense) for all oversight bodies >5 members; pool design requirement. Verification independence rule — verifiers cannot review claims in own primary contribution category; applies to mid-range and above claims. Cooling-off cohort rule — cohort tracking by Ombuds Office; max 2 cohort members sharing review authority over same subject simultaneously. [Ambitious] Qualification standard governance — competence criteria added to P-004 protected terms registry; standard-setting body must include ≥40% from non-qualifying backgrounds. [Ambitious] Real-time concentration dashboard.
- **Clauses to integrate:** Legibility Gap Audit; CR Sector Ceiling Specification (founding precondition Annex N); Epistemic Diversity Requirement; Verification Independence Rule; Cooling-Off Cohort Rule; Qualification Standard Governance (P-004 extension); Concentration Dashboard. See Annex AC3.
- **Dependencies:** CR sector ceilings specified at founding (pre-CRP constitution). Pillar 8 U7 extended for verifier category independence. P-004 protected terms registry extended. Pool-depth health metrics added to Pillar 11.
- **New risks introduced:** Epistemic diversity pool-depth constraint interacts with P-005 throughput vulnerability. Verification independence adds legitimate friction to high-impact claims. Cohort tracking system is a power locus if Ombuds Office itself captured. [Ambitious] concentration dashboard gaming below thresholds (mitigated by 30-day data lag).
- **Residual risk:** Class formation through informal social networks has no hard control. Open question: Ombuds Office carries three load-bearing functions (cohort tracking, legibility audit, diversity certification) — if Ombuds becomes an elite formation site all three are compromised. Who audits the auditors of elite formation?
- **Compound linkages:** T-008 × T-011 (elite formation creates narrative attack surface; P-008 dashboard provides defense evidence base); T-008 × T-005 (PCRP authority concentration); T-008 × T-006 (PCRP regional bodies subject to elite formation).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-011 | T-011 | **PROPOSED** | Critical | communication architecture + transparency + pre-commitment |

### P-011 — Narrative Attack Surface Hardening

- **Change type:** communication architecture + transparency + pre-commitment doctrine.
- **Introduced design:** Rapid Public Communication Protocol (RPCP) — 4-hour structured template for any public-visibility operational event; covers what happened, system response, access status, next steps; does not replace 7-day post-mortem; pre-authorized publication authority required. Pre-committed failure communication doctrine — published pre-launch document acknowledging expected failures (PCRP false triggers, oracle disputes, SQ activations, enforcement errors, measurement uncertainty) with containment mechanisms; converts failures from surprises to acknowledged expected events. Citizen-Facing Rights Layer (CFRL) — one page, 8th-grade level, pre-launch, translated; governed as P-004 protected specification. Adversarial Narrative Simulation — added to Annex T annual mandate; hostile framing team publishes simulated attack; system responds within 4 hours; report published. Hostile Frame Pre-emption Registry — top 10 mischaracterizations with accurate rebuttals and Pillar 11 evidence; updated quarterly; published as 'Common Misunderstandings.' [Ambitious] Narrative Health Dashboard — public understanding accuracy surveys, hostile framing prevalence index, RPCP response time metric; Level 1 watch auto-trigger. [Ambitious] Pre-Launch Narrative Audit — independent adversarial audit by communications professionals; findings and mitigations published simultaneously.
- **Clauses to integrate:** RPCP; Pre-Committed Failure Doctrine; CFRL (P-004 protected spec); Adversarial Narrative Simulation (Annex T extension); Hostile Frame Registry. See Annex AD.
- **Dependencies:** P-008 ACTIVE is prerequisite for elite formation narrative rebuttal. Pillar 11 infrastructure must support 4-hour publication SLA. White Paper sync required before launch (AD6). CFRL added to P-004 protected terms registry.
- **New risks introduced:** Pre-committed failure document weaponized to prime failure expectation — mitigated by simultaneous publication of containment mechanisms. CFRL creates false certainty — mitigated by 'master protocol governs' disclaimer. ANS report as hostile playbook — mitigated by publishing after exercise completion. Hostile frame registry amplifies framings — mitigated by 'common misunderstandings' framing.
- **Residual risk:** Narrative defense is bounded by actual system performance. No communication architecture survives sustained failure. Pre-launch framing window (18+ months before launch) cannot be closed by protocol — only by early CFRL and pre-commitment doctrine deployment.
- **Compound linkages:** T-011 × T-008 (elite formation is factual hook for 'captured by professionals' narrative; P-008 concentration dashboard is the counter-narrative evidence base). T-011 × T-006 (PCRP false triggers are the highest-visibility predictable failure). T-011 × T-005 (governance paralysis generates narrative events).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-012 | T-012/013/014/015 | **PROPOSED** | Critical | structural + protocol + measurement |

### P-012 — Interface Hardening and Deadlock Prevention

- **Change type:** structural + protocol + measurement architecture.
- **Introduced design:** PCRP oracle independence requirement — two-source corroboration must use structurally independent measurement systems; manipulated oracle counts as one source regardless of downstream channels; single-source PCRP activates at reduced scope with Ombuds co-certification. Categorical throughput minimums — P-005 floor amended from single aggregate to 5 categorical minimums (identity, supply, enforcement, governance, unreserved); single category capped at 3 of 5 slots. Emergency deadlock resolution protocol — auto-declaration when mandatory decision is blocked by 2+ valid processes; 3-member arbitration panel within 6 hours; humane floor bridge unconditional; scope freeze; mandatory root-cause review. Demand-context flag for LC velocity oracle — discount applied during EC enforcement actions, mass re-verification campaigns, or regional defection; Ombuds co-certification required for PCRP. RPCP contested-status template — separates physical event from legal characterization during active CRP review. Cumulative procedural drift trigger — extends P-004 to 20 Tier 3 decisions in 8 quarters reducing Tier 2/1 decision space; triggers mandatory CRP cumulative review.
- **Clauses to integrate:** AE2.1–AE2.6. Amends AC1.2 (throughput floor), AC2.2 (PCRP), AD1 (RPCP), AB5 (P-004 drift).
- **Dependencies:** Pillar 10 demand-context register (new data feed); RPCP contested-status template library extension; CRP cumulative review procedure.
- **New risks introduced:** Deadlock panel engineered as bypass route — bad actors deliberately trigger triple-block to force panel arbitration. Demand-context flag delays legitimate PCRP during enforcement periods. Categorical floor gaming — proposals reframed to occupy minimum category slots. Cumulative drift review weaponized against legitimate operational evolution.
- **Residual risk:** Second-generation deadlock has no defined resolution beyond Level 5 structural review. T-009 (Grace Exploitation Loop) remains OPEN and is the next hardening target.
- **Compound linkages:** All of T-012/013/014/015 inter-linked through PCRP, throughput floor, and deadlock protocol.

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-009 | T-009 | **PROPOSED** | Med-High | behavioral + verification + structural |

### P-009 — Grace Exploitation Loop Hardening

- **Change type:** behavioral + verification architecture + structural.
- **Introduced design:** Graduated renewal intensity — first activation lightweight; first renewal structured; second renewal mid-intensity with support service confirmation; third+ renewal high-intensity independent panel. All qualifying hardship approved under any standard. Cross-quarter history review — full pause history assessed at every renewal; category switching flagged for elevated scrutiny at next renewal. Hardship attestation collusion detection — P-002 analytics extended to hardship networks; detects mutual pairs, star clusters, temporal clustering; community-disaster safe harbor for 2 quarters on oracle-verified regional emergency. CR slow-decay at 20% of normal rate during pause — DW freeze unchanged; 4-quarter pause produces ~8% CR loss (negligible); 12-quarter rotation produces ~22% loss (drains high-impact threshold). Service pool pause-saturation monitoring — >20% simultaneous pause triggers pool-health alert and review; never bars individual activation. [Ambitious] Capability development pathway — up to 15% quarterly CR earnable through pause-appropriate stewardship during pause. [Ambitious] T-009 × P-008 explicit closure — paused cohort members count toward P-008 cohort cooling concurrent maximum; active members accommodate, not paused person.
- **Clauses to integrate:** AF1–AF7. Annex K4 amended (graduated renewal; CR slow-decay). P-002 analytics extended (AF3). AC3.5 amended (AF7). Pillar 11 dashboard extended (AF5).
- **Dependencies:** P-002 collusion analytics infrastructure extended to hardship attestation graph. CR slow-decay rate requires Pillar 8 / Annex K4 protocol-level calibration. P-011 CFRL must communicate graduated renewal clearly before launch. [Ambitious] P-004 registry: 'pause-appropriate stewardship' as protected term. [Ambitious] P-008 AC3.5 amended per AF7.
- **New risks introduced:** Graduated renewal deters genuine long-term hardship if perceived as punitive — mitigated by CFRL communication and calibration. CR slow-decay may deter activation — mitigated by clear communication and negligible 4-quarter loss. Community-disaster safe harbor exploitable by manufactured disaster claims — mitigated by oracle verification requirement. Pool saturation monitoring creates perverse incentive against legitimate pause at bad timing — mitigated by review-only trigger.
- **Residual risk:** Involuntary unemployment category remains most exploitable — disproof requires intrusive investigation incompatible with non-surveillance commitment. Accept as contained leakage: graduate renewal intensity is the best available control. Low-level 1-2 quarter grace exploitation is acceptable system leakage — the cost of genuinely frictionless access for legitimate hardship.
- **Compound linkages:** T-009 × T-008 (primary bypass route for P-008 controls — AF7 closes it); T-009 × T-011 (graduated renewal must be communicated through CFRL or becomes narrative attack surface).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-013 | T-016 | **PROPOSED** | Critical | structural + governance + audit architecture |

### P-013 — Formal Acceptance Process Integrity

- **Change type:** structural + governance + audit architecture.
- **Introduced design:** Pilot representativeness standard — pilot region requires published 4-dimension assessment; >1 favorable dimension requires second stress-tested region; single favorable region = PILOT only, not ACTIVE. Deadlock resolution timeline — 30d negotiation, 60d published mediation, day 61 CRP binding ruling (14-day SLA); substitute review if CRP is party. Audit epistemic independence — 4-year institutional affiliation bar; domain-diversity requirement; adversarial audit member for I=5 patches (multi-member team, no veto). Anti-gaming constitutional upgrade — evidence waiver prohibition reclassified Tier 2; urgency bypass now requires H-2 amendment process. Stagnation documentation quality — 3-question review (accurate? progress? resolvable?); structural obstacles trigger bootstrap review not continued documentation. [Ambitious] Bootstrap Resolution Protocol — minimum viable bootstrap micro-patch for circular dependencies; 2-authority expedited sign-off; auto-sunset; P-008 legibility gap audit as first bootstrap candidate. [Ambitious] FAP concentration controls — cohort cooling on sign-off cluster; audit body meets AC3.3 diversity standard; independent Pillar 11 monitoring (not Ombuds-managed).
- **Clauses to integrate:** AG1–AG7. FAP document amended directly. Anti-gaming rules reclassified Tier 2 (H-2 required for amendment). Representativeness criteria added to P-004 protected terms registry.
- **Dependencies:** P-005 categorical floor extended to include FAP deadlock resolution slot. P-004 protected terms registry extended for representativeness criteria. P-008 AC3.3 epistemic diversity standard referenced for audit body. Pillar 11 AC3.7 concentration dashboard extended for FAP sign-off cluster. Independent concentration monitoring (not Ombuds) required before FAP becomes operative.
- **New risks introduced:** Two-region pilot requirement increases cost and time; 'close enough' stress-tested region designation risk (mitigated by published representativeness assessment). 60-day deadlock window creates operational gap (mitigated by Annex C-6 emergency patching remaining available as separate pathway). Adversarial auditor produces hostile reports (mitigated by multi-member team). [Ambitious] Bootstrap micro-patch normalized as general bypass channel (mitigated by 2-authority sign-off, humane floor requirement, auto-sunset). [Ambitious] FAP concentration controls risk infinite regress (mitigated by self-executing Pillar 11 publication).
- **Residual risk:** Evidence farming in stress-tested pilot region remains possible if representativeness assessment criteria are gamed at the definition stage — criteria require P-004 protection. Deadlock resolution creates new CRP workload at day 61; if CRP is congested (T-005 risk), the deadline may not be met — P-005 categorical floor must include FAP deadlock as a guaranteed slot. At root: the FAP cannot be made exploitation-proof without being made unusable. P-013 accepts this and chooses calibrated friction over either extreme.
- **Compound linkages:** T-016 × T-005 (deadlock resolution congests CRP; P-005 floor must accommodate). T-016 × T-008 (audit capture via intellectual-cousin exploit — closed by AG3). T-016 × T-011 (stagnation of critical patches is narrative attack: 'the system cannot fix itself').

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-014 | T-017 | **PROPOSED** | Critical | founding governance + one-time exception |

### P-014 — P-013 Bootstrap Activation (One-Time Founding Instrument)

**Special status.** P-014 is not a standing patch. It is a one-time founding instrument. It has no standing effect after P-013 reaches ACTIVE. It closes permanently upon P-013 activation.

- **Nature:** One-time founding instrument, not a standing patch. Closes permanently upon P-013 ACTIVE.
- **Change type:** founding governance + constitutional one-time exception.
- **Introduced design:** 5-stage process: (1) Pre-activation disclosure — 14-day public challenge window; circular dependency analysis published; founding exception statement from Threat Register Owner; panel composition disclosed before sign-off. (2) Heightened 5-member panel — Threat Register Owner, 1 CRP reserve member (lot-drawn, not involved in P-013 design), 1 external systems reviewer from outside design-team domain, 1 Ombuds officer, 1 public-interest advocate (lot-drawn). All attest no 5-year affiliation with design team (externally verified). Adversarial member required; dissent published. 4/5 votes required. (3) Substitute evidence — desk review of 3+ real-world analogue cases; adversarial red-team analysis; scope-limitation certification; sunset compatibility check. (4) Activation and permanent sealing — P-013 ACTIVE; P-014 closes permanently; full activation record published; non-precedent statement embedded with Tier 2 protection; P-006 and P-009 immediately enter the Formal Acceptance Protocol pilot stage. (5) Post-activation audit within 90 days — using P-013's own now-operative standards; adversarial member required; if compromised → P-013 suspended and re-submitted through the now-operative Formal Acceptance Protocol.
- **Non-precedent statement (Tier 2 protected):** 'P-014 was invoked once, for P-013 only, because no other process was available. It may not be cited as authority for any future activation, exception, or urgency bypass. Any invocation of P-014 logic for any purpose requires H-2 amendment process.'
- **Clauses to integrate:** AH1–AH7. Annex N/U2 as constitutional anchor.
- **New risks introduced:** Founding panel subject to capture during 14-day pre-activation window (mitigated by lot-drawing, external conflict verification, adversarial member). Post-activation audit finding of compromise suspends P-013 — creates a window where the Formal Acceptance Protocol is operative but its governing patch is suspended (mitigated by the prior Formal Acceptance Protocol fallback during suspension; suspension published immediately). Pre-activation disclosure creates 14-day hostile narrative window (mitigated by framing as transparency demonstration).
- **Residual risk:** Desk review cases may be selected to confirm rather than challenge P-013 — adversarial member's case selection is the primary control; cases published for independent scrutiny. Second-order self-reference if post-activation audit finds compromise — accepted as less circular than the original bootstrap problem.
- **Auto-close clause:** P-014 closes permanently upon P-013 ACTIVE status. No re-opening, no emergency extension, no analogical application. This clause is Tier 2 protected.
- **Compound linkages:** T-017 × T-016 (bootstrap paradox is the exploit surface T-016 bad actors use for indefinite delay of P-013). T-017 × T-011 (bootstrap paradox is a narrative attack surface — P-014 pre-activation disclosure converts it into a transparency demonstration).

---

## Session 8 Patches — Detailed Entries

*Red-team hardening cycle. All patches PROPOSED. Addresses T-018 through T-023 and closes residual risks identified in T-001, T-002, T-017, and the register's own operational security posture.*

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-015 | T-018 / T-019 | **PROPOSED** | High | structural + protocol + escalation path |

### P-015 — PCRP Attack Surface Hardening

- **Change type:** structural + protocol + escalation path.
- **Addresses:** T-018 (False-Trigger Exhaustion Attack), T-019 (Demand-Context Flag Suppression Attack).
- **Introduced design:**
  - *False-trigger escalation path (T-018):* False PCRP triggers accompanied by oracle manipulation evidence or coordination timing signatures do not count toward the 3-trigger audit cap — they escalate immediately to the enforcement track with formal investigation. Cap reset is available via independent audit finding of deliberate manipulation. A "trigger exhaustion alert" fires when 2 of 3 cap slots are consumed within a single quarter, prompting pre-emptive review before the third activation.
  - *Demand-context manufactured flag assessment (T-019):* Ombuds co-certification during demand-context periods must include an explicit assessment of whether the triggering enforcement action was manufactured or strategically timed; this assessment is a required step with a defined 4-hour timeline, not an optional judgment. A cross-register timing monitor flags any enforcement action initiated within 48 hours of sentinel indicator movement — this does not block the enforcement action but elevates scrutiny on any resulting demand-context flag. If Ombuds finds deliberate flag manufacture, the demand-context designation is lifted and PCRP activation proceeds at standard scope.
  - *Ombuds constitution pre-condition:* Annex AI (Ombuds Office constitution) specifies explicit authority, decision criteria, and the 4-hour determination timeline for manufactured-flag assessments. **Annex AI is a pre-launch blocking gate — P-015 is not operative until the Ombuds Commissioner is appointed and the Ombuds Oversight Panel is seated.**
- **Clauses to integrate:** AP1–AP4. Amends AC2.3 (false-trigger cap rules). Amends AE2.4 (demand-context Ombuds certification procedure). See Annex AI for full Ombuds mandate and independence requirements.
- **Dependencies:** Ombuds Office formally constituted per Annex AI (Commissioner appointed, Oversight Panel seated, manufactured-flag criteria published). P-006 PCRP false-trigger tracking infrastructure operative. P-012 demand-context flag register operative. Cross-register timing monitor (Annex AI Section 3.3) technically implemented and tested.
- **New risks introduced:** False-trigger escalation path can be weaponized in reverse — a genuine false trigger attributed to manipulation to avoid the audit cap. Mitigated by: escalation requires two independent evidence types (oracle manipulation evidence AND timing cluster), not a single officer judgment. Manufactured-flag assessment timeline (4 hours) creates pressure that could produce errors; mitigated by conservative default (maintain demand-context designation while assessment runs, but PCRP can activate at reduced scope with single-source authorization).
- **Residual risk:** Real-time distinction between genuine oracle failure and engineered false trigger remains unreliable; escalation path applies retroactively. Low-level demand-context flag suppression using a genuinely valid enforcement action remains possible — accepted as operational leakage below detection threshold.
- **Compound linkages:** T-018 × T-019 (compound PCRP attack — both simultaneously executed is highest-risk scenario; P-015 must address the compound case explicitly). T-018 × T-013 (audit load from false-trigger investigation consumes CRP capacity).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-016 | T-002 (residual) | **PROPOSED** | Critical | constitutional commitment + quantified doctrine |

### P-016 — Identity Asymmetric Error Doctrine

- **Change type:** constitutional commitment + quantified doctrine.
- **Addresses:** T-002 open problem — calibrating fraud tolerance without making the system unusable for vulnerable populations. Extends P-003.
- **Introduced design:** The founding coalition must publish and formally adopt an **Asymmetric Error Doctrine** (AED) as a Tier 2 founding commitment before deployment. The AED must specify:
  - (a) Maximum acceptable fraud rate per instrument tier (LC, DW, CR) — expressed as a percentage of enrolled population per quarter, with confidence interval.
  - (b) Maximum acceptable exclusion rate for vulnerable populations (displaced, undocumented, digitally fragile persons) per tier — expressed as a percentage of estimated vulnerable population.
  - (c) The review trigger when either rate is exceeded — automatic publication and independent audit within 30 days.
  - (d) The decision rule when the two error types trade off: when reducing fraud exclusion would increase vulnerable-population exclusion by more than a specified ratio, the exclusion reduction takes priority unless the fraud rate exceeds a specified ceiling.
  - (e) Annual recalibration review by an independent panel with at least one member from a vulnerable-population advocacy organization.
- **Clauses to integrate:** AK1–AK5. Annex B (identity architecture) extended. AED added to P-004 protected terms registry. Founding preconditions checklist extended (Annex N).
- **Dependencies:** Identity system operational data required for calibration (cannot be specified without pilot evidence). AED is therefore a Tier 2 *design commitment* at founding — specific numbers are filled in after first-year pilot data, before scale-up gate. The commitment to publish and honor the doctrine is the founding obligation; the specific numbers are an evidence gate.
- **New risks introduced:** Quantified targets create goodhart's-law gaming — operators optimize to the metric rather than the underlying goal. Mitigated by: AED specifies both rates and requires independent measurement (not self-reported). Published targets also create narrative attack surface ("the system allows X% fraud"). Mitigated by: pre-committed publication converts this from a vulnerability into a transparency demonstration consistent with P-011.
- **Residual risk:** Some exclusion is structurally unavoidable with any identity system. The AED does not solve this; it makes the trade-off explicit and governable rather than implicit and subject to political manipulation.
- **Compound linkages:** T-002 × T-011 (AED publication is a narrative attack surface — simultaneously the correct response). T-002 × T-008 (vulnerable population exclusion rates must be tracked independently from the same bodies that operate the identity system — Ombuds Office or equivalent).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-017 | T-020 / T-021 | **ACTIVE** | Critical | measurement architecture + accreditation + supply-chain transparency |

### P-017 — Oracle Epistemological and Algorithmic Independence
**Status: ACTIVE (promoted 2026-04-18 via Proposal 3 close-out).** Numerical floors bound in `/founding/commitments.md` FC-030 (N≥5), FC-031 (≥3 methodology classes), FC-032 (pairwise correlation ≤0.30), FC-033 (≥1 adversarial seat), FC-100 (14-day quorum-loss restoration window). Annex AL promoted to ACTIVE with all [FOUNDING COMMITMENT] placeholders resolved.

- **Change type:** measurement architecture + accreditation standards + supply-chain transparency.
- **Addresses:** T-020 (Epistemological Oracle Capture), T-021 (Algorithmic Oracle Capture).
- **Introduced design:**
  - *Methodology-class diversity mandate (T-020):* RCS accreditation must include at least one measurement node per high-volatility essential category using a fundamentally different methodology class (e.g., community-based participatory research vs. institutional statistical modeling vs. independent physical sampling). The specific methodology classes are defined as a P-004 protected term (Annex AL — "methodology class" definition with worked examples).
  - *Methodological divergence signal (T-020):* Systematic divergence between methodology classes is a first-order sentinel indicator requiring investigation, not an anomaly requiring suppression. A divergence above a defined threshold triggers an independent methodological review before that category can be used for SQ activation.
  - *Standards-funding transparency (T-020):* Any RCS-accredited node must disclose funding sources for the methodological standards it relies on, with a three-year lookback. Funding from parties with material interest in oracle outputs triggers additional scrutiny.
  - *Anti-monoculture review trigger (T-020):* If three or more oracle nodes rely on the same standards body for a given category, an independent methodological review is required before that category can be used for SQ activation.
  - *AI supply chain transparency (T-021):* Any oracle node using ML or AI components must disclose model provenance, training data sources, and any shared upstream dependencies with other oracle nodes. This disclosure is published and part of the independence certification.
  - *Algorithmic independence certification (T-021):* Oracle independence audit must include explicit verification that no two corroborating oracle nodes share a common upstream AI model, training dataset, or fine-tuning pipeline.
  - *Physical ground-truth requirement (T-021):* At least one measurement node per high-volatility category must use direct physical sampling (not model-derived estimates) as its primary measurement method.
- **Clauses to integrate:** AL1–AL7. Annex M (oracle architecture) extended. "Methodology class" and "algorithmic independence" added to P-004 protected terms registry per Annex AL. RCS accreditation standards document updated.
- **Dependencies:** Annex AL (methodology-class definitions) published and initial methodology-class registry populated before first oracle set is accredited. **Annex AL is a pre-launch blocking gate — P-017 is not operative until the methodology-class registry is published and the standards-body concentration tracking system is built.** P-004 protected terms registry must be operative. Oracle independence audit capacity must include algorithmic supply chain review — new capability requirement. Physical sampling for high-volatility categories requires resource commitment from founding coalition.
- **New risks introduced:** Methodology-class diversity requirement increases oracle system cost and coordination complexity. Physical sampling is expensive; cost pressure may produce under-investment that weakens the ground-truth requirement over time — addressed by Pillar 11 publication of sampling frequency and method per category. AI supply chain disclosure creates competitive sensitivity concerns for oracle node operators — mitigated by: disclosure is to auditors, not publicly; methodology-level information is published but not proprietary implementation details.
- **Residual risk:** Defining "fundamentally different methodology class" is subject to T-007 definition drift. Annex AL Sections 1 and 2 are P-004 protected; Sections 3 and 4 are updated through annual audit (Annex AL Section 5). The annual review panel must include an adversarial methodologist whose role is to find exploitation paths in the current definitions.
- **Compound linkages:** T-020 × T-021 (both target oracle epistemological foundations; P-017 addresses both). T-020 × T-012 (structural oracle independence is necessary but not sufficient; P-017 adds the epistemological layer). T-020 × T-008 (epistemic monoculture in oracle methodology parallels elite formation in oversight — P-008 and P-017 share the diversity-mandate logic).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-018 | T-022 | **PROPOSED** | Critical | constitutional architecture + political durability |

### P-018 — Electoral Cycle Resilience

- **Change type:** constitutional architecture + political durability + transition protocol.
- **Addresses:** T-022 (Electoral Cycle Capture).
- **Introduced design:**
  - *Entrenchment ladder (direct repeal route):* Tier 1 invariants require not just a legislative supermajority but concurrent ratification by an independent constitutional body. The constitutional body's composition must be specified at founding such that it cannot be reconstituted entirely by the governing coalition within a single electoral term.
  - *LC floor minimum persistence (administrative hollowing route):* A minimum LC floor — defined at founding as 70% of the founding basket — is constitutionally self-executing: it does not require legislative appropriation and cannot be suspended by executive action. This floor persists through any governing coalition transition unless repealed via the full Tier 1 amendment process.
  - *Administrative hollowing triggers:* If a founding institution is unfilled for more than 90 days, or post-mortem publication lapses for more than 30 days, or oracle accreditation count drops below a specified minimum, an automatic constitutional review is triggered that does not require the governing coalition's initiation. The review is initiated by the constitutional body and is self-executing.
  - *Transition continuity protocol:* When a new governing coalition takes office, a mandatory 180-day transition audit is required before any changes to Tier 2 or Tier 1 provisions. The audit is conducted by the constitutional body, not the incoming government. During the 180-day window, no Tier 2 or higher changes may be made except through emergency deadlock resolution (P-012 AE2.3).
  - *Treaty override protection (jurisdictional fragmentation route):* International agreements that require modification to the non-convertibility architecture trigger a mandatory Tier 2 impact assessment before ratification. An agreement that would produce cumulative Tier 2 impact (by T-007/P-012 cumulative drift trigger standards) requires the full Tier 2 amendment process for each applicable provision.
- **Clauses to integrate:** AM1–AM6. Tier 1 amendment process modified (Annex A). LC floor persistence clause added to Pillar 4. Administrative hollowing triggers added to Pillar 11 dashboard as auto-publication requirements. Transition continuity protocol added to Pillar 10.
- **Dependencies:** Independent constitutional body formally constituted at founding with staggered terms and confirmed independence from governing coalition appointment. LC floor minimum definition requires RCS capacity confirmation.
- **New risks introduced:** Self-executing LC floor minimum requires RCS capacity to be maintained regardless of political will — if oracle system degrades, the self-executing floor has no measurement basis. Mitigated by: oracle degradation itself triggers an administrative hollowing review. Transition continuity audit creates 180-day governance window — addressed by: audit has a defined 30-day maximum scope for routine transitions; extensions require independent authorization.
- **Residual risk:** A government with sufficient political will and supermajority can repeal constitutional entrenchment. The designed defense buys time and raises political cost; it cannot prevent determined repeal. Ultimate residual risk: protocol durability depends on political culture. No design can substitute for a political culture that values the commitments.
- **Compound linkages:** T-022 × T-011 (hostile electoral success often follows narrative attack — P-011 and P-018 are jointly necessary). T-022 × T-008 (elite formation inside institutions may assist administrative hollowing by a hostile government). T-022 × T-017 (T-022 success produces a new bootstrap problem — recursive T-017). T-022 × T-016 (hostile government can capture FAP sign-off authorities).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-019 | T-023 | **PROPOSED** | Med-High | evidence architecture + scale-up gating |

### P-019 — Pilot External Validity Gate

- **Change type:** evidence architecture + scale-up gating + simulation mandate.
- **Addresses:** T-023 (Pilot External Validity Collapse).
- **Introduced design:**
  - *Stress-condition pilot gate:* Scale-up approval requires the pilot evidence record to include at least one each of: an economic stress event (recession, significant unemployment spike, or supply price shock affecting the pilot region); a compound supply disruption (two or more essential categories simultaneously below adequate levels); and documented operation during a formal political opposition campaign against the system. Where a condition could not be tested in the pilot, the evidence record must include: (a) explicit documentation of why it could not be tested; (b) a designated substitute evidence source (e.g., analogous case from another jurisdiction, red-team analysis); (c) a residual-risk statement acknowledging the gap; and (d) a post-scale monitoring commitment specific to the untested condition.
  - *Red-team challenge window (T-016 companion):* Before any scale-up vote, a mandatory 30-day adversarial challenge window allows independent reviewers to contest the external validity of the evidence base. Challengers must have access to the full evidence record, not just the summary. Responses to challenges are published before the vote.
  - *Crisis simulation mandate:* The Annual Compound Simulation must include at least one compound-crisis scenario not previously simulated before each scale-up gate. The talent drain scenario and civic legibility scenario added to the simulation in this session fulfill this requirement for the first scale-up gate only.
- **Clauses to integrate:** AN1–AN5. FAP (Formal Acceptance Protocol) extended — scale-up gate conditions added to evidence requirements. Annex T (simulation mandate) extended. P-013 representativeness standard cross-referenced (stress-condition pilot is a representativeness requirement).
- **Dependencies:** Annual Compound Simulation must be updated to include new scenarios before each scale-up gate. Red-team challenge window requires independent reviewer access infrastructure.
- **New risks introduced:** Stress-condition requirement may delay scale-up indefinitely if adverse conditions do not occur in the pilot region within a reasonable window. Mitigated by: substitute evidence pathway is explicitly available; the requirement is for good-faith engagement with external validity, not for a manufactured crisis. Red-team challenge window creates a blocking mechanism — mitigated by: challengers must propose specific residual-risk mitigations, not merely object.
- **Residual risk:** Some external validity gaps cannot be filled by any pilot. A deliberately engineered crisis to satisfy the stress-condition requirement would satisfy the letter but not the spirit of P-019. Ultimate residual risk: the evidence base for a system of this scale will always be incomplete.
- **Compound linkages:** T-023 × T-016 (honest insufficient pilot is the complement to dishonest evidence farming — both require evidence quality controls). T-023 × T-011 (scale-up failure after smooth pilot is a maximum-impact narrative attack). T-023 × T-022 (hostile electoral challenge is one of the hardest conditions to include in a controlled pilot; substitute evidence pathway must address this explicitly).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-020 | T-017 (residual) | **PROPOSED** | Critical | founding governance + window extension |

### P-020 — Founding Window Extension

- **Change type:** founding governance amendment — extends P-014 Annex AH.
- **Addresses:** T-017 residual risk — 14-day pre-activation disclosure window is insufficient for independent critique to organize against a coordinated founding capture attempt.
- **Introduced design (Annex AH2, amending AH1):**
  - *60-day pre-activation disclosure (replacing 14-day):* The P-014 pre-activation challenge window is extended from 14 days to 60 days minimum. The 60-day clock begins when the circular dependency analysis, founding exception statement, and panel composition are simultaneously published. No stage of P-014 may proceed until the 60-day window closes with no unresolved structural objections requiring response.
  - *Oppose-coalition adversarial member nomination:* The adversarial panel member required by P-014 may not be appointed by the same nominating process as the other four panel members. The adversarial member must be nominated by a body that is structurally opposed to or independent from the founding coalition's interests — specifically: (a) a civil liberties or human rights organization not affiliated with the founding coalition; (b) a registered opposition political party or civic organization; or (c) an independent academic institution with no material funding relationship with founding coalition members. The nominating body's selection rationale must be published as part of the founding record.
  - *Objection response requirement:* Any structural objection submitted during the 60-day window that identifies a specific P-013 standard not met by the P-014 process must receive a written response from the founding panel before the window closes. Unresponded objections extend the window by 14 days, non-cumulatively.
- **Non-precedent statement (extends AH1 Tier 2 protection):** 'P-020 amends P-014. The 60-day window and oppose-coalition nomination are P-014 requirements only. They do not set a precedent for other patch activations, emergency processes, or governance decisions. Any invocation of P-020 logic for any other purpose requires H-2 amendment process.'
- **Clauses to integrate:** AH2.1–AH2.4. P-014 founding checklist extended. Annex N founding preconditions updated.
- **Dependencies:** Oppose-coalition nominating body must be identified before P-014 stage 1 begins. 60-day window requires that the founding timeline allow for this — founding planning should budget 90 days for the P-014 process from first public disclosure to panel sign-off.
- **New risks introduced:** 60-day window provides more time for coordinated opposition to manufacture procedural objections that are technically valid but strategically motivated. Mitigated by: objection response requirement specifies that only structural objections (identifying a specific P-013 standard not met) require response; procedural objections without structural grounding do not extend the window. Oppose-coalition nomination process requires identifying a legitimate opposition body — in contexts without organized opposition, this may be difficult. Mitigated by: the three pathways (civil liberties org, opposition party, academic institution) provide alternatives.
- **Residual risk:** A 60-day window with published panel composition still allows founding panel capture if the oppose-coalition nomination process is itself captured. Ultimate residual: founding legitimacy depends on the quality of the political culture and civil society present at the founding moment. No procedural design fully compensates for absent civil society.
- **Compound linkages:** T-017 × T-022 (T-022 attack recurs as T-017 after a successful dismantling — P-020 hardened founding reduces risk of both initial capture and post-T-022 refounding capture). T-017 × T-011 (60-day public window converts founding moment into sustained transparency demonstration).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-021 | — (operational security) | **PROPOSED** | High | register architecture + disclosure policy |

### P-021 — Register Disclosure Protocol

- **Change type:** register architecture + operational security + transparency calibration.
- **Addresses:** Open threat register as attack surface — the current register publishes specific detection thresholds, timing windows, and exploit paths that constitute an operational manual for sophisticated attackers. This is not a new threat ID (the vulnerability is architectural, not a distinct attack class); it is a structural change to how the register is maintained.
- **Introduced design:** The register is bifurcated into:
  - *Public Register:* Threat categories, mechanisms (described at class level, not with specific thresholds), mitigation approaches, residual risks, risk scores, and compound linkages. The public register is published in the open GitHub repository and is the primary accountability and transparency artifact. The current `Threat_Register.md` is the public register.
  - *Restricted Register Annex:* Specific detection thresholds (e.g., exact trigger counts and time windows), precise timing windows for exploitation, operational detection patterns and signatures, and calibration data used to set automated alerts. The Restricted Annex is available to: credentialed auditors under NDA; adversarial panel members in the P-013/P-014 acceptance process; the constitutional review body; and Ombuds Office staff. It is not published publicly. It is version-controlled privately with access logs.
  - *Consistency requirement:* Both versions must be updated simultaneously. Any discrepancy between the public and restricted versions triggers a T-007 definition-drift review. The restricted version is the authoritative operational document; the public version is the transparency artifact.
  - *Reclassification review:* Annually, the Threat Register Owner reviews whether any restricted-version content can be declassified to the public version (because the window of operational sensitivity has passed) or whether any public-version content should be reclassified to restricted (because specific operational details have been added).
- **Clauses to integrate:** AO1–AO5. Annex AO (Register Disclosure Protocol) — see `docs/annexes/REGISTER_DISCLOSURE_PROTOCOL.md`. P-004 protected terms registry: 'restricted annex' and 'public register' defined.
- **Dependencies:** Restricted Annex infrastructure (private version-controlled repository with access controls) must be established before P-021 is operative. Threat Register Owner role must be formally constituted with authority to manage both versions.
- **New risks introduced:** Bifurcation creates an accountability gap — the public cannot verify that the restricted version is consistent with stated mitigations. Mitigated by: credentialed auditors can access restricted version and publish a consistency attestation (not the content) annually. Restricted version existence itself creates an information asymmetry that could be used to claim mitigations are more robust than they are. Mitigated by: consistency attestation is published; any disclosed gap between public claims and restricted reality is a T-007 event.
- **Residual risk:** The bifurcation design assumes that restricted content stays restricted. Leaks are possible. The design accepts this and treats the restricted version as reducing adversarial advantage, not eliminating it — full security through obscurity is not the goal.
- **Compound linkages:** P-021 × T-011 (restricted register removes some transparency — P-021 must be communicated publicly as a deliberate operational security choice, not a transparency failure, or it becomes a narrative attack surface).

---

## Session 9 Patches — Detailed Entries

*Operational gap closure (P-022) and design-discussion registration (P-023).*

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-022 | T-024 | **ACTIVE** | Critical | protocol + authority definition + FC-100 restoration verification + reconciliation |

### P-022 — SQ Oracle-Failure Fallback Protocol
**Status: ACTIVE (promoted 2026-04-18 via Proposal 6 close-out).** FC-100 `ORACLE_QUORUM_LOSS_RESTORATION_WINDOW` = 14 days bound in `/founding/commitments.md`. Annex AQ promoted to ACTIVE with full protocol detail, humane floor unconditionality confirmed, Reconciliation Review specified.

- **Change type:** protocol + authority definition + oracle reconciliation procedure.
- **Addresses:** T-024 (SQ Oracle-Failure During Active Rationing) — the operational void where SQ is active and the oracle system fails, loses quorum, or enters an unresolvable dispute with no defined decision path.
- **Introduced design:**
  - *Conservative hold default:* When the oracle system loses quorum or enters an unresolvable dispute while SQ is active, SQ holds at its current activation level. No escalation. No expansion to new categories. No automatic lapse. The conservative hold is the designed default — not doing nothing, but doing the least-harm thing until authority is restored.
  - *48-hour REB first-responder window:* The Regional Executive Body (REB), using its existing P-006 first-responder authority, may issue a provisional continuation or provisional lapse within 48 hours of oracle failure based on non-oracle physical indicators: distribution fill rates, vendor inventory reports, and logistics data. The REB decision is published immediately with the full evidence base. The REB may not expand SQ scope under this authority — only hold or begin a managed lapse. Expansion requires oracle quorum.
  - *72-hour governance handoff:* If the oracle system is not restored within 72 hours of failure, the matter transfers to the emergency deadlock resolution protocol (P-012 AE2.3) for a binding decision. The 3-member arbitration panel has authority to issue a time-bound SQ continuation or staged lapse. The humane floor bridge (P-012 AE2.3) is unconditional throughout oracle failure — LC baseline access is never contingent on oracle availability.
  - *Oracle restoration reconciliation:* When the oracle system is restored, a mandatory 24-hour reconciliation review assesses whether provisional REB decisions were consistent with the restored oracle data. Where the provisional decision was inconsistent with what the oracle would have indicated, the discrepancy is published as a post-mortem with a root-cause analysis. Persistent REB-oracle divergence triggers an independent review of the non-oracle physical indicator methodology.
  - *Deliberate-failure escalation:* If oracle failure during active SQ is found to be deliberately engineered (oracle manipulation evidence per T-012/T-018), the matter escalates immediately to enforcement — the conservative hold and first-responder window both continue, but the investigation runs in parallel without waiting for oracle restoration.
- **Clauses to integrate:** AQ1–AQ5. Amends Annex U (SQ termination and continuation procedures). Amends AC2 (P-006 PCRP/REB authority — SQ oracle failure is a distinct REB authority from PCRP). Pillar 11 dashboard extended: oracle status must include a live SQ-active indicator so oracle failure during active SQ is publicly visible in real time.
- **Dependencies:** REB formally constituted with defined authority for non-oracle physical indicator assessments. Non-oracle physical indicator methodology must be published and reviewed annually. P-012 AE2.3 emergency deadlock protocol must be operative before P-022 is operative.
- **New risks introduced:** REB use of non-oracle physical indicators creates a soft-oracle channel not subject to the independence requirements of the main oracle system. Mitigated by: (1) REB authority under P-022 is explicitly scoped to hold-or-lapse decisions only — no scope expansion; (2) REB decisions are published immediately with evidence base; (3) reconciliation review after oracle restoration creates accountability for REB accuracy; (4) the non-oracle indicator methodology is published and periodically reviewed. Risk: consistent REB-oracle agreement could be engineered by an adversary who also controls the physical indicator sources. Mitigated by: physical indicators (fill rates, inventory reports) are collected from distributed vendor networks — harder to simultaneously compromise than a concentrated oracle system.
- **Residual risk:** A deliberate oracle failure timed to active SQ, combined with physical indicator manipulation, could force a harmful REB decision during the 48-hour window. This is the highest-consequence compound attack on the SQ system. The 72-hour governance handoff provides a backstop, but 72 hours of incorrect SQ operation during a genuine shortage is a real harm. Accepted as the best available outcome given the operational constraint that a governance decision cannot be made faster than the arbitration panel can convene.
- **Compound linkages:** T-024 × T-006 (P-022 extends P-006 to cover oracle failure during SQ — P-006 covers measurement lag; P-022 covers measurement absence). T-024 × T-014 (triple deadlock during SQ oracle failure is the worst-case scenario — humane floor bridge must be explicitly unconditional regardless of deadlock status). T-024 × T-018 (deliberate false-trigger exhaustion designed to overlap with active SQ is the highest-risk T-018 compound).

---

| Patch ID | Related Threat | Status | Priority | Change Type |
| :--- | :--- | :--- | :--- | :--- |
| P-023 | T-025 | **PROPOSED** | High | EC monetary architecture / demurrage design |

### P-023 — Contract-Commitment Architecture (Demurrage, Zero Exemptions)

- **Status:** PROPOSED
- **Threat addressed:** T-025 (Demurrage Sector-Capture via Investment Channel).
- **Direction adopted:** Direction B — deployment-speed architecture. Investment-channel exemptions are removed entirely. Genuine long-horizon capital needs are served by contract-commitment architecture; demurrage pressure remains universal.
- **Red-team pre-analysis:** Ten attack vectors identified and resolved before this patch was written. Vectors: (1) escrow control ambiguity, (2) milestone definition gaming, (3) "working capital" as new exemption label, (4) advance procurement rebranded as hoarding, (5) subcontractor chain gaming, (6) essential-sector carve-out pressure, (7) multi-jurisdiction pooling ambiguity, (8) force majeure as wedge for permanent exemptions, (9) sector definitional creep, (10) milestone oracle capture. All resolved in patch rules below.

**P-023.1 — Zero Exemption Principle**
No entity, sector, or project type receives an exemption from EC demurrage. The investment-channel exemption architecture from the original P-002 design is deprecated. The concept of "investment-channel status" is removed. No project account, escrow window, or term pool designation may shield EC from demurrage.

**P-023.2 — Contract-Commitment Architecture**
Long-horizon projects are financed through milestone escrow:
- The commissioning authority deposits EC into an independent escrow account at project initiation.
- Demurrage applies to escrowed EC at the standard rate. The commissioning authority bears the carrying cost, creating institutional incentive for timely contracting and completion.
- EC is released to the contractor only upon independently verified milestone completion.
- The contractor holds only current working capital. Demurrage is the natural discipline — no ceiling rule is defined; the price signal is the mechanism.

**P-023.3 — Independent Escrow Agent**
Escrow accounts are administered by an independent escrow agent designated by the CRP. The contractor, any entity in the contractor's supply chain, and any entity with a financial interest in the project's outcome may not administer, co-administer, or materially influence the escrow account.

**P-023.4 — Output Milestone Standard**
Milestones eligible to trigger escrow releases must satisfy all of the following:
- Physical deliverables only — no process milestones, no self-certified planning stages, no administrative completions.
- Independently inspected and certified by a rotating inspector pool; the contractor does not select inspectors. Pool is administered by the escrow agent under P-017 oracle-independence standards.
- Defined at contract signing and P-004-locked. No renegotiation of milestone definitions after contract execution.
- High-value releases (above the threshold defined in Annex AR) require multiple independent verifiers and physical inspection with full audit trail.

**P-023.5 — Procurement Clarification**
Advance procurement of materials means actual purchase: EC exits the contractor's hands at the transaction. Holding EC "in reserve for future procurement" is hoarding and receives no protective treatment. Supply chain uncertainty is addressed through competitive procurement, staged purchasing, and futures commitments — not EC balance reserves.

**P-023.6 — Universal Scope**
P-023 applies at every tier of the supply chain: prime contractors, subcontractors, sub-subcontractors, and all entities receiving EC for project work are subject to the same architecture. There is no sector-specific carve-out. Eligibility for contract-commitment structure is determined by deliverable characteristics (verifiable physical milestones + commissioning authority), not sector identity.

**P-023.7 — Mandatory Deployment Timeline (Commissioning Authorities)**
Commissioning authorities must contract idle escrowed funds within the deployment window defined in Annex AR. Funds held beyond this window without active contracting trigger mandatory CRP review. Demurrage continues regardless. This is an accountability mechanism, not an exemption.

**P-023.8 — Multi-Jurisdiction Lead Authority**
For projects with multiple commissioning authorities pooling EC, a lead authority must be designated at contract signing. The lead authority bears all demurrage on pooled escrow. Internal cost-sharing between participating authorities is a private arrangement; external accountability runs through the lead authority only.

**P-023.9 — Force Majeure Escrow Freeze**
Verified external delays may trigger a temporary escrow freeze:
- Qualifying events: permitting delays attributable to regulatory bodies outside the project's control; certified supply chain disruptions (independent third-party certification required); declared natural disasters.
- Process: contractor applies with documented evidence; an independent assessment panel certifies the external cause and its temporal scope. Panel composition and selection use P-017 oracle-independence standards.
- Effect: demurrage on the affected escrow account is paused for the certified duration only.
- Limits: freeze is time-limited to the verified external condition; total cumulative freeze time per project is capped at the period defined in Annex AR; freeze does not stack across overlapping events.
- Gaming deterrent: misrepresentation in a freeze application is an audit trigger and grounds for contractor disqualification from future escrow eligibility.

**P-023.10 — P-004 Protected Terms**
The following terms are added to the P-004 protected vocabulary: *milestone*, *physical deliverable*, *commissioning authority*, *independent escrow agent*, *force majeure* (for protocol purposes), *lead authority*, *verified external delay*, *deployment window*. Definitions may not be modified without a Tier 2 (H-2) amendment.

- **Risk introduced:** (1) Force majeure certification panel is a new oracle — capture target per T-020/T-021; mitigated by P-017 independence requirements. (2) Mandatory deployment timelines may pressure commissioning authorities to rush contracting rather than hold idle; mitigated by requiring contracts to pass standard procurement integrity checks before they satisfy the timeline. (3) Inspector pool is a new oracle; mitigated by rotating pool under P-017 standards and escrow-agent administration. (4) P-023.4 output-only milestone standard may be challenged as too rigid for novel infrastructure categories; mitigated by P-004 protection — any redefinition requires H-2 amendment, raising the cost of definitional drift.
- **Annex:** AR (contract-commitment architecture specification — high-value release thresholds, deployment window periods, force majeure cumulative freeze cap, inspector pool governance, escrow agent designation process).
- **Compound linkages:** T-025 × T-001 resolved (no investment-channel exemptions means no above-ledger boundary manipulation through exemption classification). T-025 × T-007 mitigated (P-004 protection on all P-023.10 terms). T-025 × T-008 mitigated (no classification to capture — sector identity is irrelevant to escrow eligibility).

---

## Operating Rules for the Patch Log

- Every future patch must reference a threat ID and specify the new risk it creates.
- If a patch only exists in the log and not in the master, it is not yet operative.
- If a patch changes public explanation, the white paper and technical reference must be synced in the same cycle.
- When a patch materially changes user experience or institutional authority, the diagram set must be updated too.
- **PROPOSED** patches become ACTIVE only after formal master protocol integration and oversight sign-off.
- If two patches conflict, the conflict belongs in the patch log and must be resolved explicitly in the master protocol.

---

## Current Threat/Patch Linkage

| Threat ID | Patch ID | Status | Master Reference |
| :--- | :--- | :--- | :--- |
| T-001 | P-001 | **ACTIVE** | Annex AB |
| T-002 | P-003 | **ACTIVE** | Annex AB |
| T-004 | P-002 | **ACTIVE** | Annex AB |
| T-007 | P-004 | **ACTIVE** | Annex AB |
| T-005 | P-005 | **PROPOSED** | Annex AC1 |
| T-006 | P-006 | **PROPOSED** | Annex AC2 |
| T-008 | P-008 | **PROPOSED** | Annex AC3 |
| T-009 | P-009 | **PROPOSED** | Annex AF |
| T-011 | P-011 | **PROPOSED** | Annex AD |
| T-012–T-015 | P-012 | **PROPOSED** | Annex AE |
| T-016 | P-013 | **PROPOSED** | Annex AG |
| T-017 | P-014 | **PROPOSED** | Annex AH |
| T-018 / T-019 | P-015 | **PROPOSED** | Annex AP; pre-launch gate: Annex AI |
| T-002 (residual) | P-016 | **PROPOSED** | Annex AK |
| T-020 / T-021 | P-017 | **ACTIVE** | Annex AL ACTIVE · FC-030/031/032/033/100 |
| T-022 | P-018 | **PROPOSED** | Annex AM |
| T-023 | P-019 | **PROPOSED** | Annex AN |
| T-017 (residual) | P-020 | **PROPOSED** | Annex AH2 |
| — (opsec) | P-021 | **PROPOSED** | Annex AO |
| T-024 | P-022 | **ACTIVE** | Annex AQ ACTIVE · FC-100 |
| T-025 | P-023 | **PROPOSED** | Annex AR |
| T-009 / TR-07 / T-018 residual | P-024 | **ACTIVE** | Annex AS · FC-080/081/082 |
| T-008 residual / meta-capture | P-025 | **ACTIVE** | Annex AI ACTIVE (rewritten) · FC-090/091/092 |
| T-026 / T-027 | P-026 | **ACTIVE** | `/pillars/P0_subsidiarity/` ACTIVE · FC-120/121/122 |
| structural simplification / T-005 residual / T-008 residual | P-027 | **ACTIVE** | `Master_Protocol.md` §III Seven Pillars + P0 · `White_Paper.md` §4 |

---

## Session 9 — Proposal 8 Close-out Detailed Entry

### P-025 — Federated Ombuds Constitution

- **Introduced design:** Single-commissioner Ombuds replaced with a five-node federation. Each sub-Ombuds is structurally dispersed along at least four of five dimensions (jurisdictional, institutional-origin, funding, infrastructure, personnel-recruitment). Operational decisions are handled by a rotating Duty Sub-Ombuds; protocol-level decisions require a 4-of-5 Plenum supermajority (FC-091). Staggered 730-day terms (FC-092) with two-consecutive-term limit. Oversight Assembly of 7 members (5-of-7 threshold) certifies structural dispersal annually and activates Concentration Response on loss of dispersal.
- **Clauses to integrate:** Full rewrite of Annex AI (previously PROPOSED single-commissioner draft) to Annex AI ACTIVE federated constitution. References from Master Protocol, Threat Register, and other Annexes read through to the federation acting per §3 (operational vs protocol-level classes).
- **Load-bearing integrations:**
  - **Proposal 1** — Tier 1 Amendment Integrity Report (Plenum 4-of-5 within 60 days of signature registration under `/architecture/amendment_protocol.md`).
  - **Proposal 3** — Adversarial oracle seat certification (Annex AL §3.3).
  - **Proposal 6** — Arbitration panel seat on Annex AQ §3 SQ oracle-failure arbitration.
  - **Proposal 7** — Enforcement Panel appeals on Annex AJ §4 penalty determinations.
  - **Proposal 9** — Final adjudication of Annex AS attestation false-claim findings and stake-slashing classification.
- **Dependencies:** At least four sub-Ombuds seated before any Ombuds-dependent function is operative (§2.1 pre-launch gate). Oversight Assembly seated with ≥5 of 7 before first Plenum vote. Duty rotation schedule published for first 90 days before operational activation. Federation secretariat built before operational activation.
- **New risks introduced:** Duty rotation scheduling is itself a power locus (mitigated by published-in-advance rotation, non-party-choice rule). Five-node federation increases coordination cost on time-sensitive operational decisions (mitigated by operational/protocol-level bifurcation in §3.1). Plenum deadlock (2 of 5 or 3 of 5) may stall matters (mitigated by conservative-default rule in §3.3 — deadlock favours protection).
- **Residual risk:** Structural-dispersal criteria can be met formally while capture is achieved through informal coordination (mitigated by Oversight Assembly §5.1 institutional-health reporting; voting-pattern concentration is a published metric). Oversight Assembly itself can be captured at small scale (mitigated by §5.4 meta-capture controls).
- **Compound linkages:** P-025 × P-008 (federation closes the T-008 open question — "who audits the auditors of elite formation?" — by making the auditor a federation subject to its own dispersal rule); P-025 × P-015 (Ombuds-dependent PCRP flag determinations now robust to single-node capture); P-025 × P-017 (methodology-class adversarial seat certification now clears 4-of-5 threshold rather than single-commissioner signature); P-025 × P-022 (Annex AQ arbitration panel seat rotation is Plenum-certified).
- **Auto-close clause:** P-025 is standing. It does not auto-close. Changes to the federation structure (FC-090, FC-091, FC-092) require Tier 1 amendment (7-of-9, 180-day timelock).

---

## Session 9 — Proposal 5 Close-out Detailed Entry

### P-026 — P0 Subsidiarity, Consent & Exit Layer

- **Introduced design:** The protocol acquires a foundational scale-and-consent layer beneath the operational pillars. P0 defines *who* consents to be governed, *at what scale*, and *how they withdraw*. Six files under `/pillars/P0_subsidiarity/` cover: (1) README orientation, (2) five-tier scale hierarchy (FC-122: household / neighborhood ≤500 / locality ≤5,000 / region ≤500,000 / federation), (3) three-prong subsidiarity competence test (informational, adjudicative, externality-containment) with default-against-escalation rule, (4) affirmative consent protocol (2/3 supermajority, 90-day notice, 60-day deliberation, roll-call, 2/3 minimum participation), (5) exit protocol (FC-120 2/3 supermajority, FC-121 730-day graceful unwind with LC continuity, no exit tax, no forfeiture, T-026 Exit Denial enforcement), (6) re-entry protocol (procedurally symmetric, no penalty, 365-day floor between cycles).
- **Clauses to integrate:** Master Protocol §0 P0 paragraph (lines 140–149); every operational pillar reads through P0 (smallest-competent-scale default).
- **Load-bearing integrations:**
  - Federated Ombuds (Annex AI §3.2 challenge process; §3.4 automatic Plenum convocation on exit denial).
  - Annex AJ §4 severity 3 (Institutional) penalties for Exit Denial violations.
  - CSM (Annex Y) as the single Tier 1 exception that binds regardless of consent.
  - Architectural enforcement layer (Proposal 1) locks FC-120/121/122 under Tier 1 process.
- **Dependencies:** Federated Ombuds seated (four of five sub-Ombuds) before any P0 challenge procedure is operative. Drift chain must support federation-scope expansion and contraction events. Scale registry (household through federation) must be initialized at founding.
- **New risks introduced:** Re-entry 365-day floor could be gamed through individual-personhood cycling (mitigated by individual consent being distinct from unit consent, with the floor applying only to unit cycles). Exit-cost asymmetry — the 730-day unwind is generous for the unit but introduces a period of dual-authority — could produce enforcement ambiguity (mitigated by published unwind schedule and Ombuds oversight).
- **Residual risk:** Subsidiarity is an aggregate property; any single decision's escalation may look reasonable while the cumulative drift toward federation-scale venue is substantial. Aggregate monitoring via the Ombuds §4.3 federation-decision-concentration report is the mitigation — a threshold breach is itself a T-027 trigger.
- **Compound linkages:** P-026 × P-025 (Ombuds is the P0 enforcement organ — subsidiarity and exit both depend on Ombuds independence); P-026 × P-018 (LC-floor-persistence clause is reinforced by LC continuity preservation during the 730-day unwind); P-026 × P-008 (exit right structurally constrains elite formation — elites cannot form a federation they cannot lose).
- **Auto-close clause:** P-026 is standing. Changes to FC-120/121/122 and the no-exit-tax rule require Tier 1 amendment (7-of-9, 180-day timelock). Strengthening (shorter unwind, lower supermajority) is Tier 2.

---

## Session 9 — Proposal 2 Close-out Detailed Entry

### P-027 — Seven Pillars + P0 Structural Consolidation

- **Introduced design:** The operational architecture is restructured from twelve pillars into Seven Pillars on a P0 foundation (v13). Five redundant v12 pairs are consolidated: (a) P1 Constitutional Invariants + P10 Operations/Oversight → new P1 Rights & Rule of Law (rights-definition and rule-bound execution as one function); (b) P4 Life Support + LC-instrument portion of P5 → new P4 Survival (LC instrument AND delivery, closing the T-007 drift gap); (c) P6 Land/Housing + P7 Enterprise + EC-instrument portion of P5 + P12 PFCR → new P5 Markets, Commons & Public Finance (four faces of the economic surface unified); (d) DW/CR-instrument portion of P5 + P8 Contribution + P9 Civic Deliberation → new P6 Civic Layer (instruments, minting, and deliberation as one closed loop); (e) P11 Transparency with new Beer-VSM S4 environmental-scanning → new P7 Transparency & Environmental Scanning (S3*/S3 architecturally independent of P1 control). P3 Physics & Reserves is unchanged in content (resilience reserves were already in-pillar). The v12 resilience/reserves function that Proposal 2 anticipated in P12 was supplanted by the PFCR integration (external merge `00c5ca7`); PFCR is absorbed into new P5 as the commons-revenue-and-public-banking sub-function.
- **Clauses to integrate:** Master Protocol §III fully rewritten (Architecture-at-a-glance, Pillar interfaces, Pillar-by-pillar detail, Legacy mapping tables); White Paper §4 restructured; banner notes in Threat Register and Patch Log providing v12 → v13 crosswalk for in-flight references.
- **Load-bearing integrations:**
  - **Proposal 5 (P-026)** — P0 is the foundation of the v13 architecture; every operational pillar reads through P0.
  - **Proposal 1** — Architectural enforcement layer (Tier 1 invariants, 7-of-9 amendment, drift chain) now lives functionally inside new P1 Rights & Rule of Law.
  - **Proposal 3** — Oracle requirements (N≥5, three methodology classes, adversarial seat) land in new P3 Physics & Reserves.
  - **Proposal 7** — Enforcement severity ladder integrates with new P1 rule-bound execution.
  - **Proposal 9** — Attestation stake (P-024) integrates with new P6 Civic Layer contribution minting.
  - **PFCR (P-029 through P-033)** — commons-revenue and anti-dynasty architecture land in new P5 Markets, Commons & Public Finance.
- **Dependencies:** v12 → v13 crosswalk must be published and stable before any downstream documents (annexes, PRDs) are rewritten. Legacy mapping table is the authoritative bridge during the transition.
- **New risks introduced:** Consolidation concentrates four former pillars into new P5; this increases the attack surface of any single P5-integrity failure. Mitigation: new P5 contains explicit internal boundaries (EC vs housing-commons vs enterprise vs PFCR) with non-convertibility rules between them, and the Pillar interface table specifies the inputs each sub-function may accept. A second risk is naming drift — "Twelve-Pillar Protocol" as external project identity versus "Seven Pillars + P0" as operational reality. Mitigation: the project name is retained for continuity; §III is the authoritative operational definition; external communications will transition on a case-by-case basis.
- **Residual risk:** Annexes authored under v12 structure may reference pillar numbers that now span multiple v13 pillars (e.g., an Annex referencing "Pillar 5" could mean LC, EC, or DW/CR depending on context). Mitigation is the crosswalk banner in the Threat Register and Patch Log, plus the Master Protocol §III crosswalk table. A future housekeeping pass will rewrite inline annex references to v13.
- **Compound linkages:** P-027 × P-026 (P0 + 7-pillar collapse is one conceptual move — subsidiarity provides the foundation; consolidation removes redundant capture targets); P-027 × P-017 (oracle architecture in new P3 inherits the N=5/3-class/adversarial-seat requirements); P-027 × P-029 (PFCR function lands in new P5, not as a separate pillar); P-027 × P-008 (reduced pillar count reduces elite-formation surface area by eliminating redundant institutional homes).
- **Auto-close clause:** P-027 is standing. The seven-pillar structure itself is Tier 1 architectural. Any subsequent collapse (e.g., to six or fewer) or expansion (to eight or more) requires Tier 1 amendment (7-of-9, 180-day timelock). Content within pillars may be amended by ordinary process subject to the existing Tier classifications of each clause.
