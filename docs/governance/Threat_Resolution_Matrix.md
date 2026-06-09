# Threat Resolution Matrix

This matrix is the working plan for moving every registered threat from "named" to "controlled under evidence."

The word **solve** is used here in a strict way: a threat is solved only when the system has a plausible mechanism, a corruption-aware abuse model, a test path, and an honest residual-risk statement. No institutional design can eliminate greed, coercion, collusion, political opportunism, or legal arbitrage. The goal is to make those pressures visible, costly, bounded, and correctable before they can quietly become normal.

---

## Resolution Standard

A threat may move toward **RESOLVED** only when all seven tests are satisfied:

1. **Mechanism:** the control exists in a patch, annex, Founding Order rule, pilot protocol, or operational standard.
2. **Corruption model:** the record names how greedy, frightened, ambitious, or corrupt actors would route around the control.
3. **Evidence path:** the project names a simulation, pilot, legal review, audit, or red-team exercise that could falsify the control.
4. **Failure criteria:** the project names what would count as failure before deployment pressure can relabel failure as success.
5. **Residual risk:** the project states what remains unsafe, uncertain, or permanently contested after the control is adopted.
6. **Abuse cases:** critical and unresolved threats cite relevant patterns from the Abuse Case Library or explain why no existing pattern fits.
7. **Evidence level:** claim-strength changes follow the Evidence Ladder and update the Claims and Evidence Register.

Until those tests are met, the honest status is **designed**, **active-unproven**, **partial**, or **ongoing**, not resolved.

---

## Workstream Sequence

| Order | Workstream | Threats | Why this order |
|---|---|---|---|
| 1 | Identity, monitoring, and measurement truth | T-002, T-006, T-012, T-015, T-018, T-019, T-020, T-021, T-024, T-031, T-032 | If identity, last-resort access, monitoring, or capacity measurement fails, the rest of the system can be gamed while appearing compliant. |
| 2 | Economic boundary integrity | T-001, T-004, T-007, T-025 | If civic instruments become money, status, rent, or legal wrappers, the core separation collapses. |
| 3 | Institutional anti-capture | T-005, T-008, T-009, T-013, T-014, T-016, T-017 | If the repair machinery captures itself, the system cannot adapt honestly. |
| 4 | Legitimacy, narrative, transition, and scale | T-010/T-011, T-022, T-023, T-026, T-027, T-033 | If consent, explanation, pilot validity, exit, subsidiarity, or independent review fails, the constitution becomes coercive in practice. |

---

## Collapse-State Lens

The [Architecture Source Map](./Architecture_Source_Map.md) groups threats by the three collapse states the project is trying to prevent. This lens does not replace threat IDs or status labels; it shows which first-principles failure each threat pressures.

| Collapse state | Meaning in this matrix |
|---|---|
| **Survival-Trade Bind** | Survival access, identity, scarcity response, contribution, or exit becomes entangled with market leverage, coercion, deprivation, or exchange. |
| **Power-Wealth Convergence** | Money, office, technical expertise, verification authority, sectoral influence, or institutional control begins reinforcing rule-power. |
| **Static-Advantage Loop** | Incumbents preserve advantage by freezing definitions, evidence standards, procedures, pilot interpretations, entry gates, or political defaults. |
| **Control-plane failure** | The machinery that observes, decides, patches, legitimates, or routes authority fails or is captured, often compounding the three main collapse states. |

| Threat | Collapse-state pressure |
|---|---|
| T-001 Shadow Convertibility | Survival-Trade Bind; secondary Power-Wealth Convergence through brokers, employers, lenders, landlords, and platforms. |
| T-002 Identity Exploits | Survival-Trade Bind plus control-plane identity gate. |
| T-004 Incentive Collapse | Survival-Trade Bind; risk is avoiding coercive contribution while preserving real work incentives. |
| T-005 Governance Throughput Failure | Control-plane failure; secondary Static-Advantage Loop if delay normalizes procedural incumbency. |
| T-006 Measurement Lag / Supply Shock | Control-plane failure; secondary Survival-Trade Bind when bad scarcity signals harm access. |
| T-007 Political Definition Drift | Static-Advantage Loop; secondary Power-Wealth Convergence when experts or lawyers control meanings. |
| T-008 Bureaucratic Elite Formation | Power-Wealth Convergence plus Static-Advantage Loop. |
| T-009 Grace Exploitation Loop | Power-Wealth Convergence when hardship rules become status-preservation tools. |
| T-010/T-011 Narrative Attack Surface | Legitimacy control-plane failure that can accelerate any collapse state. |
| T-012 PCRP Oracle Poisoning | Control-plane failure in the emergency truth layer. |
| T-013 Compound Crisis Throughput Starvation | Control-plane failure where governance capacity becomes scarce and gameable. |
| T-014 Emergency Governance Triple Deadlock | Compound control-plane failure where safeguards block each other. |
| T-015 Demand-Side Oracle Poisoning | Control-plane failure; secondary Survival-Trade Bind through false scarcity or deprivation. |
| T-016 Formal Acceptance Process Capture | Static-Advantage Loop plus patch-process control-plane failure. |
| T-017 Bootstrap Problem | Control-plane failure; secondary Static-Advantage Loop through founding precedent. |
| T-018 PCRP False-Trigger Exhaustion | Compound control-plane failure through exhausted emergency response. |
| T-019 Demand-Context Flag Suppression | Compound control-plane failure through valid process suppressing valid emergency response. |
| T-020 Epistemological Oracle Capture | Power-Wealth Convergence plus Static-Advantage Loop when standards bodies define reality. |
| T-021 Algorithmic Oracle Capture | Power-Wealth Convergence plus AI/oracle supply-chain control-plane failure. |
| T-022 Electoral Cycle Capture | Static-Advantage Loop plus constitutional-durability control-plane failure. |
| T-023 Pilot External Validity Collapse | Static-Advantage Loop when calm-condition evidence locks in false confidence. |
| T-024 Shared Storehouse Oracle-Failure | Control-plane failure plus Survival-Trade Bind during rationing. |
| T-025 Investment and Capital-Deployment Shelter Capture | Power-Wealth Convergence; secondary Static-Advantage Loop through protected-capital definitions. |
| T-026 Exit Denial | Survival-Trade Bind plus federation-coercion control-plane failure. |
| T-027 Subsidiarity Violation | Static-Advantage Loop plus Power-Wealth Convergence through upward venue drift. |
| T-028 Essential-Sector Refusal Leverage | Survival-Trade Bind plus Power-Wealth Convergence through private survival chokepoints. |
| T-029 Fiscal Sustainability and Currency Debasement | Survival-Trade Bind plus control-plane failure; public promises become coercive or inflationary when not costed against real resources. |
| T-030 Cyber Resilience and Availability Failure | Control-plane failure plus Survival-Trade Bind when digital rails, keys, providers, or networks make the floor unreachable. |
| T-031 Last-Resort Unenrolled Access Failure | Survival-Trade Bind plus identity/delivery control-plane failure when the floor is reachable only by the already-legible. |
| T-032 Monitoring Repurposing and Enforcement-Observation Failure | Control-plane failure plus Power-Wealth Convergence and Survival-Trade Bind when protective monitoring becomes surveillance or coercive control. |
| T-033 Founding Consent Evidence and Civil-Society Review Definition Failure | Control-plane founding failure plus Static-Advantage Loop when vague consent or friendly review locks in founding authority. |

---

## Threat-by-Threat Resolution Plan

### T-001 - Shadow Convertibility

- **Current control:** [P-001](./Patch_Log.md), [Annex AB](../annexes/ANNEX_AB.md), [Annex AJ](../annexes/ANNEX_AJ.md)
- **Resolution path:** keep Essential Access non-delegable and context-locked, tolerate low-level informal leakage, and target organized brokers, employers, landlords, lenders, platforms, and repeat facilitators rather than ordinary households.
- **Corruption route to assume:** professional actors will package conversion inside service contracts, employment pressure, queue priority, household coercion, side payments, or "helpful" brokerage.
- **External evidence:** FATF beneficial ownership guidance anchors the risk that companies, trusts, and other legal arrangements can hide true control and route around enforcement.
- **Proof needed:** proxy-market red team, broker profitability model, household-coercion cases, annual deterrence audit, and surveillance-burden review.
- **Residual risk:** enforcement can become overbroad; low-level leakage is tolerated, but scalable markets must stay uneconomic.

### T-002 - Identity Exploits

- **Current control:** [P-003](./Patch_Log.md), [P-016](./Patch_Log.md), [Annex AB](../annexes/ANNEX_AB.md), [Annex AK](../annexes/ANNEX_AK.md)
- **Resolution path:** use layered identity assurance, recovery continuity, asymmetric error thresholds, and human appeal so fraud control does not become the survival gate.
- **Corruption route to assume:** insiders sell credentials, abusive relatives or employers control recovery, administrators over-tighten rules to protect themselves, and vulnerable people are blamed as "risk."
- **External evidence:** NIST SP 800-63-4 and World Bank ID4D anchor identity assurance, fraud, privacy, inclusion, and service-access concerns.
- **Proof needed:** the [Identity and Recovery Evidence Test Package](./Identity_Recovery_Evidence_Test_Package.md): false-exclusion pilots, false-acceptance pilots, recovery drills for displaced and digitally fragile users, coercion and delegation tests, data-minimization audit, staff-discretion audit, and insider fraud scenario testing.
- **Residual risk:** identity cannot be made frictionless and fraud-proof at the same time; the survival floor must remain continuous while disputes are reviewed.

### T-004 - Incentive Collapse

- **Current control:** [P-002](./Patch_Log.md), [Annex AB](../annexes/ANNEX_AB.md)
- **Resolution path:** preserve real reward gradients through Flow, opportunity, recognition, and contribution pathways while banning conversion of Service Record into worth, coercive hierarchy, or access to survival.
- **Corruption route to assume:** employers, schools, vendors, civic bodies, and ambitious insiders will treat contribution records as rank or employability scores.
- **External evidence:** OECD public integrity guidance anchors incentives and accountability; EU AI Act social-scoring prohibitions, EEOC employment-selection guidance, ILO forced-labour indicators, and ICO workplace-monitoring guidance anchor the misuse boundary.
- **Proof needed:** [Service Record Misuse Evidence Test Package](./Service_Record_Misuse_Evidence_Test_Package.md), contribution-model simulation, employer/vendor/school/housing misuse tests, high-skill participation metrics, burnout and coercion review, and ordinary-user comprehension testing.
- **Residual risk:** contribution incentives remain culturally fragile; rewards can motivate without becoming a moral ranking only if misuse is monitored and punished by effect, not label.

### T-005 - Governance Throughput Failure

- **Current control:** [P-005](./Patch_Log.md), [Annex AC](../annexes/ANNEX_AC.md)
- **Resolution path:** split ordinary and urgent queues, define throughput floors, cap emergency redeclarations, and publish delay reasons so slowdown and speedup attacks are visible.
- **Corruption route to assume:** actors flood review queues, file procedural objections in bad faith, manufacture urgency, or use interim bridges to normalize bypass.
- **Proof needed:** backlog simulation, emergency-bypass audit, proposal-flood exercise, ordinary-reader authority tracing, and review-body workload stress test.
- **Residual risk:** throughput tools can become procedural theater; the project must test whether decisions improve or only appear processed.

### T-006 - Measurement Lag / Supply Shock

- **Current control:** [P-006](./Patch_Log.md), [Annex AC](../annexes/ANNEX_AC.md)
- **Resolution path:** tie issuance and scarcity response to sentinel indicators, confidence bands, physical sampling, first-responder authority, and fast recovery unwinding.
- **Corruption route to assume:** suppliers hide shortages, agencies massage data, local officials delay bad news, and market actors exploit cadence gaps before the system catches up.
- **External evidence:** Sphere, IPC, WHO SARA, WHO/UNICEF WASH monitoring, IEA energy data, and UN/OECD statistical-practice standards anchor category-specific measurement, evidence classes, readiness indicators, and public statistical integrity.
- **Proof needed:** the [Capacity Measurement Evidence Test Package](./Capacity_Measurement_Evidence_Test_Package.md): category definition audit, supply-shock drills, forecast-vs-actual review, physical inventory sampling, oracle latency tests, methodology independence audit, oracle-failure drill, and public explanation tests for uncertainty bands.
- **Residual risk:** real-time scarcity measurement will always lag reality; the control must bound harm during uncertainty rather than pretend precision.

### T-007 - Political Definition Drift

- **Current control:** [P-004](./Patch_Log.md), [Annex AB](../annexes/ANNEX_AB.md)
- **Resolution path:** protect load-bearing terms, require semantic effect tests, publish worked examples, and treat cumulative narrowing as a constitutional event.
- **Corruption route to assume:** lawyers and officials will keep the old words while changing classifications, thresholds, examples, or technical definitions.
- **External evidence:** OECD public integrity indicators support the discipline of testing whether formal rules are implemented in practice.
- **Proof needed:** semantic red-team review, registry usability test, ambiguity-case audit, and review of whether definition protection blocks needed iteration.
- **Residual risk:** the anti-drift system can become a semantic bureaucracy; flexibility needs a governed path without laundering capture as clarification.

### T-008 - Bureaucratic Elite Formation

- **Current control:** [P-008](./Patch_Log.md), [P-025](./Patch_Log.md), [Annex AC](../annexes/ANNEX_AC.md), [Annex AI](../annexes/ANNEX_AI.md)
- **Resolution path:** track verifier concentration, cohort overlap, expertise homogenization, Service Record loops, and Ombuds dispersal before insiders become a durable class.
- **Corruption route to assume:** credentialed insiders coordinate informally, rotate through offices, define competence in their own image, and protect each other through legitimate procedure.
- **Proof needed:** [Service Record Misuse Evidence Test Package](./Service_Record_Misuse_Evidence_Test_Package.md), concentration dashboard, cohort-overlap audit, voting-pattern review, funding-dependence review, and external anti-capture audit.
- **Residual risk:** informal elite coordination cannot be eliminated by structural dispersal alone; recurring disclosure and outside review remain necessary.

### T-009 - Grace Exploitation Loop

- **Current control:** [P-009](./Patch_Log.md), [P-024](./Patch_Log.md), [Annex AF](../annexes/ANNEX_AF.md), [Annex AS](../annexes/ANNEX_AS.md)
- **Resolution path:** use graduated renewal, collusion detection, slow decay, pause-saturation monitoring, and capability pathways while preserving real hardship protection.
- **Corruption route to assume:** networks rotate hardship categories, manufacture employment evidence, freeze eligibility for civic positions, or use compassion rules as a status-preservation channel.
- **Proof needed:** [Service Record Misuse Evidence Test Package](./Service_Record_Misuse_Evidence_Test_Package.md), hardship-ring simulation, attestation collusion audit, involuntary-unemployment verification test, and narrative test for humane communication.
- **Residual risk:** some low-level exploitation is the price of humane access; the unresolved danger is organized status preservation.

### T-010/T-011 - Narrative Attack Surface

- **Current control:** [P-011](./Patch_Log.md), [Annex AD](../annexes/ANNEX_AD.md)
- **Resolution path:** publish claim discipline, failure communication doctrine, citizen-facing rights language, and hostile-frame simulations before opponents define the project.
- **Corruption route to assume:** supporters overclaim, opponents exploit real flaws, institutions hide failures to protect legitimacy, and complexity becomes evidence of technocracy.
- **Proof needed:** hostile public review, comprehension testing, crisis communication drill, failure post-mortem rehearsal, and public claim audit.
- **Residual risk:** communication cannot compensate for operational failure; the project must stay willing to say "not proven."

### T-012 - PCRP Poisoning via Oracle-Corroboration Collapse

- **Current control:** [P-012](./Patch_Log.md), [Annex AE](../annexes/ANNEX_AE.md)
- **Resolution path:** require structural independence among PCRP corroboration sources, not merely separate data channels carrying the same assumptions.
- **Corruption route to assume:** vendors, standards bodies, agencies, and AI tools share inputs or methods while presenting as independent.
- **Proof needed:** oracle independence certification, common-method audit, false-emergency drill, and post-retraction narrative impact review.
- **Residual risk:** independent sources can still be wrong together during genuine confusion; independence reduces capture, not uncertainty.

### T-013 - Compound Crisis Throughput Starvation

- **Current control:** [P-012](./Patch_Log.md), [Annex AE](../annexes/ANNEX_AE.md)
- **Resolution path:** reserve throughput by crisis category and cap single-category consumption of guaranteed slots.
- **Corruption route to assume:** actors reframe proposals into protected categories to occupy scarce governance capacity.
- **Proof needed:** multi-crisis tabletop, category-gaming red team, throughput fairness audit, and appeal-path timing review.
- **Residual risk:** category floors can be gamed; the control needs public category reasons and post-hoc correction.

### T-014 - Emergency Governance Triple Deadlock

- **Current control:** [P-012](./Patch_Log.md), [Annex AE](../annexes/ANNEX_AE.md)
- **Resolution path:** auto-declare deadlock, preserve the survival floor bridge, and convene a small arbitration panel inside a defined time limit.
- **Corruption route to assume:** attackers create procedural conflict among emergency caps, classification defaults, and understaffed audit bodies.
- **Proof needed:** timed deadlock exercise, second-generation arbitration-block scenario, survival-floor continuity audit, and public record review.
- **Residual risk:** no sub-Level-5 design can eliminate every recursive deadlock; the key is preventing people from losing essentials while governance catches up.

### T-015 - Demand-Side Oracle Poisoning

- **Current control:** [P-012](./Patch_Log.md), [Annex AE](../annexes/ANNEX_AE.md)
- **Resolution path:** maintain a demand-context register and require co-certification when demand spikes may be enforcement-driven rather than supply-driven.
- **Corruption route to assume:** enforcement actions, re-verification campaigns, or coordinated spending are timed to distort demand signals.
- **Proof needed:** demand-shock simulation, enforcement-overlay drill, double-deprivation scenario, and Ombuds decision-timing test.
- **Residual risk:** demand and supply signals can overlap; the control must preserve access while avoiding false scarcity response.

### T-016 - Formal Acceptance Process Capture

- **Current control:** [P-013](./Patch_Log.md), [P-034](./Patch_Log.md), [Annex AG](../annexes/ANNEX_AG.md), [Annex AV](../annexes/ANNEX_AV.md)
- **Resolution path:** harden representativeness, audit independence, adversarial membership, deadlock timelines, concentration controls, and two-key invariant preconditions.
- **Corruption route to assume:** actors farm friendly evidence, deadlock sign-offs, select intellectual cousins as auditors, or file endless "not ready" documentation.
- **Proof needed:** acceptance-process red team, evidence-farming simulation, auditor-network analysis, deadlock exercise, and ordinary-reader traceability test.
- **Residual risk:** the FAP cannot be made exploitation-proof without becoming unusable; the goal is calibrated friction plus visible disagreement.

### T-017 - Bootstrap Problem

- **Current control:** [P-014](./Patch_Log.md), [P-020](./Patch_Log.md), [Annex AH](../annexes/ANNEX_AH.md)
- **Resolution path:** treat bootstrap activation as a one-time founding instrument, disclose it in advance, require adversarial membership, seal non-precedent, and audit after activation.
- **Corruption route to assume:** founders populate the panel with aligned actors, use urgency as precedent, or select desk-review cases that flatter the design.
- **Proof needed:** founding-panel conflict audit, public objection review, substitute-evidence review, post-activation audit, and legitimacy dossier.
- **Residual risk:** a founding exception is always dangerous; the record must make it harder to repeat, not easier.

### T-018 - PCRP False-Trigger Exhaustion Attack

- **Current control:** [P-015](./Patch_Log.md), [P-024](./Patch_Log.md), [Annex AP](../annexes/ANNEX_AP.md), [Annex AS](../annexes/ANNEX_AS.md)
- **Resolution path:** distinguish engineered false triggers from ordinary false positives after the fact, reset caps when manipulation is proven, and escalate coordinated false triggers directly.
- **Corruption route to assume:** actors create false emergencies to consume audit capacity, damage public trust, and make operators hesitate during real shocks.
- **External evidence:** Sphere humanitarian standards anchor the requirement that emergency response preserve minimum life-supporting functions even when signals are uncertain.
- **Proof needed:** false-trigger-at-scale simulation, forensic delay audit, compound crisis exercise, and public narrative response test.
- **Residual risk:** real-time distinction will remain unreliable; the protocol must be conservative during emergencies and exacting afterward.

### T-019 - Demand-Context Flag Suppression Attack

- **Current control:** [P-015](./Patch_Log.md), [Annex AP](../annexes/ANNEX_AP.md)
- **Resolution path:** require Ombuds assessment of whether a demand-context flag was manufactured, supported by a cross-register timing monitor and fast-lift authority.
- **Corruption route to assume:** technically valid enforcement is launched at the exact moment needed to block legitimate PCRP response.
- **External evidence:** OECD public integrity sources anchor the risk that formally valid processes can still be manipulated without monitoring, conflict controls, and enforcement.
- **Proof needed:** timing-monitor false-positive test, Ombuds four-hour decision drill, enforcement-manufacture red team, and appeal review.
- **Residual risk:** intent is hard to prove under time pressure; precommitted criteria matter more than confidence after the fact.
- **Resolution update:** Deliberate-manufacture criteria now specified in Annex AI §4.12 (P-052 ACTIVE). 24-hour Plenum window; asymmetric default favors PCRP. Design closure achieved; evidence closure remains pending until timing-monitor, red-team, and appeal drills run.

### T-020 - Epistemological Oracle Capture

- **Current control:** [P-017](./Patch_Log.md), [Annex AL](../annexes/ANNEX_AL.md)
- **Resolution path:** require independent methodology classes, standards-diversity review, direct physical sampling, and visible uncertainty rather than relying on formal vendor independence.
- **Corruption route to assume:** measurement actors share standards, funders, professional assumptions, datasets, and model architecture while passing independence checks.
- **Proof needed:** Capacity Measurement Evidence Test Package; methodology-class audit, standards-body capture review, direct-sampling pilot, directional-bias review, small-population oracle plan where applicable, and confidence-band comprehension test.
- **Residual risk:** independence is partly social and epistemic, not just organizational; recurring review is permanent.
- **Status note:** Design closure achieved; evidence closure pending — methodology pilots and adversarial standards review still required.

### T-021 - Algorithmic Oracle Capture

- **Current control:** [P-017](./Patch_Log.md), [Annex AL](../annexes/ANNEX_AL.md)
- **Resolution path:** inspect AI supply chains, training data dependencies, model-update governance, pairwise correlation, and same-direction bias across oracle systems.
- **Corruption route to assume:** vendors deploy shared models, hidden data pipelines, biased optimization targets, or contract incentives that satisfy formal independence while producing correlated error.
- **Proof needed:** Capacity Measurement Evidence Test Package; AI supply-chain audit, model-correlation test, vendor conflict review, and manual fallback drill.
- **Residual risk:** algorithmic systems can drift silently; the system needs recurring model review and non-AI physical anchors.
- **Status note:** Design closure achieved; evidence closure pending — methodology pilots, AI supply-chain audit, and adversarial standards review still required.

### T-022 - Electoral Cycle Capture

- **Current control:** [P-051](./Patch_Log.md) primary CIP control + [P-065](./Patch_Log.md) AM8 anti-hollowing hardening; [P-018](./Patch_Log.md) remains the proposed electoral-resilience supplement. See [Annex AM](../annexes/ANNEX_AM.md).
- **Resolution path:** entrench survival-floor persistence, transition continuity, conduct-based hostile-administration triggers, independent constitutional-body authority, vacancy self-repair, publication fallback, and no-waiver effectiveness rules.
- **Corruption route to assume:** a successor government keeps constitutional language while starving staff, delaying appointments, batching loyalist appointments, suppressing dashboard publication, withholding Ombuds integrity reports, rewriting administrative standards, or capturing enforcement.
- **External evidence:** OECD public integrity indicators anchor the gap between formal rules and implementation capacity, especially when institutions are under political pressure.
- **Proof needed:** transition-of-power simulation, administrative hollowing trigger test, budget-starvation scenario, independent-body legitimacy review, vacancy-as-waiver test, below-quorum continuity test, appointment-batching test, dashboard-publication-lapse test, and Ombuds-integrity-report-unavailable test.
- **Residual risk:** no constitutional design can fully prevent determined democratic repeal or authoritarian seizure; the project can only make hollowing visible and contested. CIP repair authority can itself become guardian-class power if not kept conduct-based, published, challengeable, and subordinate to immediate Essential Access relief.
- **Resolution update:** CIP specification in Annex AM §AM8 (P-051 ACTIVE): 7 members, staggered terms, constitutionally fixed funding, automatic hollowing triggers. P-065 adds vacancy deadlines, fallback nomination, void mass appointments, below-quorum self-repair limits, publication fallback, integrity-report suspension, servant-authority limits, and relief-first rules.

### T-023 - Pilot External Validity Collapse

- **Current control:** [P-019](./Patch_Log.md), [Annex AN](../annexes/ANNEX_AN.md)
- **Resolution path:** require stress evidence, substitute evidence, adversarial challenge, and a rule that failed pilots cannot be renamed success.
- **Corruption route to assume:** sponsors select friendly sites, exclude hard cases, optimize metrics, and scale from calm conditions because failure is politically costly.
- **External evidence:** Sphere standards and OECD integrity sources anchor why calm-condition success is insufficient for emergency and adversarial governance claims.
- **Proof needed:** pilot representativeness review, stress-evidence dossier, independent challenge response, and no-rebrand audit.
- **Residual risk:** some large-scale conditions cannot be ethically reproduced; substitute evidence must be explicit about what it cannot prove.

### T-024 - Shared Storehouse Oracle-Failure During Active Rationing

- **Current control:** [P-022](./Patch_Log.md), [Annex AQ](../annexes/ANNEX_AQ.md)
- **Resolution path:** hold current rationing level during oracle blackout, restrict provisional REB authority, publish physical-indicator evidence, and reconcile after oracle restoration.
- **Corruption route to assume:** actors disrupt oracle quorum during rationing to force false lapse, false extension, or normalization of non-oracle emergency discretion.
- **Proof needed:** Capacity Measurement Evidence Test Package; oracle-blackout drill, physical-indicator review, 14-day restoration-window test, reconciliation post-mortem, and public explanation review.
- **Residual risk:** emergency exceptions can normalize; reconciliation must be public, timely, and reputationally costly.

### T-025 - Investment and Capital-Deployment Shelter Capture

- **Current control:** [P-023](./Patch_Log.md), [Annex AR](../annexes/ANNEX_AR.md)
- **Resolution path:** use contract-commitment architecture, release funds on verified physical deliverables, and protect capital-deployment terms from definition drift now that routine demurrage is no longer the active wealth spine.
- **Corruption route to assume:** firms use subsidiaries, project cycling, force-majeure claims, infrastructure labels, escrow windows, procurement pressure, or protected-capital labels to park Flow or public-return source rights without real deployment.
- **External evidence:** OECD procurement and FATF beneficial ownership guidance anchor capture routes through procurement and legal wrappers. Historical demurrage evidence is retained only as superseded design context, not as the active instrument.
- **Proof needed:** project-finance simulation, procurement integrity review, legal-wrapper red team, force-majeure panel capture audit, nested subcontractor tracing test, and source-base avoidance tests in the [Commons Return and Universal Stake Evidence Test Package](./Commons_Return_Universal_Stake_Evidence_Test_Package.md).
- **Residual risk:** tight parameters can block real infrastructure while loose parameters recreate hoarding; parameter setting must be evidence-based.

### T-026 - Exit Denial

- **Current control:** [P-026](./Patch_Log.md), [Founding Order](../../founding/order/README.md), [Annex AI](../annexes/ANNEX_AI.md), [Annex AJ](../annexes/ANNEX_AJ.md)
- **Resolution path:** make exit publication, deliberation, unwind, Essential Access continuity, infrastructure continuity, no-exit-tax, and re-entry symmetry enforceable.
- **Corruption route to assume:** federation actors delay paperwork, weaponize impact assessments, withhold infrastructure, file pretextual enforcement, or make exit formally possible but practically punitive.
- **Proof needed:** exit rehearsal, procedural-delay audit, infrastructure-continuity drill, impact-assessment review, and Ombuds specific-performance test.
- **Residual risk:** slow-motion exit denial can occur through many individually compliant acts; aggregate obstruction monitoring is required.

### T-027 - Subsidiarity Violation

- **Current control:** [P-026](./Patch_Log.md), [Founding Order](../../founding/order/README.md), [Annex AI](../annexes/ANNEX_AI.md)
- **Resolution path:** enforce the smallest-competent-scale default, lock federation-scale categories, require three-prong competence findings, and publish aggregate venue-drift metrics.
- **Corruption route to assume:** central bodies expand "externality" claims, prefer uniform rules, turn coordination into preemption, or let precedent accumulate upward one reasonable case at a time.
- **External evidence:** Ostrom's commons research and the International Association for the Study of the Commons anchor the value and limits of local rule-making for shared-resource governance.
- **Proof needed:** subsidiarity challenge simulation, aggregate-drift audit, soft-exception review, and floor-versus-uniform-rule case study.
- **Residual risk:** centralization often happens through plausible individual decisions; only aggregate monitoring exposes the drift.

### T-028 - Essential-Sector Refusal Leverage

- **Current control:** [Annex AT](../annexes/ANNEX_AT.md) §AT6.6, [P-050](./Patch_Log.md)
- **Resolution path:** CASP (Compliant Alternative Supplier Pre-Registration) establishes pre-committed automatic-activation contracts as primary mitigation. Public receiver authority demoted to fallback. Drill scope operationalized with 9 chokepoints and gap-window calculation requirement.
- **Corruption route to assume:** essential-sector actors use refusal, credible threat of refusal, or compliance-masked degradation to extract constitutional concessions, regulatory forbearance, favorable contract extensions, secrecy concessions, or survival-floor policy changes. The actor may remain technically compliant while delaying actual CSM delivery through data withholding, standards-body obstruction, PBM formulary friction, affiliate fallback capture, workforce poaching, litigation, reserve-access paperwork, or selective regional degradation.
- **Proof needed:** CASP activation drill, chokepoint coverage audit, gap-window calculation review, alternative-supplier readiness test, and compliance-masked refusal red team using the [Essential-Sector Refusal Test Package](./Essential_Sector_Refusal_Test_Package.md), [Capture Dashboard Specification](./Capture_Dashboard_Specification.md), dashboard telemetry, procurement logs, bidder-independence review, delay windows, and affected-population impact.
- **Residual risk:** pre-registration contracts can degrade if not tested; activation speed under real refusal conditions remains unproven until drilled. The hardest residual is lawful-looking obstruction that never announces itself as refusal but still makes survival delivery depend on incumbent data, staff, software, affiliates, standards bodies, PBMs, lenders, insurers, or subcontractors.
- **Resolution update:** CASP (ANNEX_AT §AT6.6, P-050 ACTIVE) establishes pre-committed automatic-activation contracts as primary mitigation. Public receiver authority demoted to fallback. Drill scope operationalized with 9 chokepoints and gap-window calculation requirement.

### T-029 - Fiscal Sustainability and Currency Debasement

- **Current control:** [P-066](./Patch_Log.md), [Annex D](../annexes/ANNEX_D.md), [Commons Return and Universal Stake Evidence Test Package](./Commons_Return_Universal_Stake_Evidence_Test_Package.md)
- **Resolution path:** require a costed fiscal model before scale claims; route public value through Commons Return, Universal Stake, and a Public Commons Lockbox; name any residual taxes instead of pretending they disappear; and block scale if the floor depends on inflation, hidden debt, prohibited tax bases, or downward burden shift.
- **Corruption route to assume:** officials overestimate Commons Return receipts, use Flow issuance to hide deficits, time Universal Stake distributions for politics, defer maintenance, issue off-ledger obligations, or shift costs onto ordinary labor, basic household exchange, modest savings, or survival access under new labels.
- **External evidence:** public-finance history, sovereign-debt crises, inflation episodes, resource-revenue volatility, and land-value / resource-rent literature all warn that revenue design can fail through optimism, volatility, capture, or burden shift. The project must cite concrete analogues in the fiscal sustainability dossier before scale.
- **Proof needed:** fiscal adequacy model, incidence and dignity review, source-base valuation red team, legal-wrapper avoidance review, Universal Stake capture simulation, Essential Access lockbox sufficiency test, privacy audit, external-capital arbitrage test, remaining-tax necessity review, and public comprehension test.
- **Residual risk:** Commons Return may be morally better targeted than routine demurrage but still insufficient or volatile. Some taxes or fees may remain necessary. The control is not a claim that taxation disappears; it is a discipline that public burdens must be named, costed, dignity-screened, and prevented from migrating onto survival or ordinary household life.
- **Resolution update:** P-066 registers fiscal sustainability as T-029 and makes the costed model a scale-blocking gate rather than a later implementation detail.

### T-030 - Cyber Resilience and Availability Failure

- **Current control:** [P-067](./Patch_Log.md), [Cyber Resilience and Availability Evidence Test Package](./Cyber_Resilience_Availability_Evidence_Test_Package.md), [Implementation Drift Audit Package](./Implementation_Drift_Audit_Package.md) for tamper-adjacent controls.
- **Resolution path:** distinguish tamper evidence from availability; inventory every CSM-critical service; require ransomware, key-compromise, regional-failover, offline/analog continuity, and supply-chain/dashboard integrity drills before any scale-ready survival-rail claim.
- **Corruption route to assume:** attackers, insiders, vendors, or hostile states disable redemption, settlement, identity, public status publication, delivery dispatch, or offline conversion; compromised keys approve false state, deny valid access, or block recovery; supply-chain implants preserve dashboard compliance while degrading actual delivery.
- **External evidence:** NIST Cybersecurity Framework 2.0, NIST SP 800-34 contingency planning, NIST SP 800-57 key-management guidance, and CISA ransomware guidance all show that cyber recovery, key custody, offline backup, and incident response must be designed and tested rather than assumed.
- **Proof needed:** critical-service inventory, ransomware continuity drill, emergency key-revocation and rotation test, no-network redemption test, regional failover drill, provider-settlement continuity test, vulnerable-cohort continuity report, public-status publication fallback, and supply-chain implant red team.
- **Residual risk:** offline fallback may create fraud or privacy exposure; emergency key rotation may concentrate authority; manual settlement may create bailout pressure. P-067 is a test gate, not proof of resilience.
- **Resolution update:** P-067 registers cyber availability as T-030 so it is no longer hidden under oracle failure, drift/tamper, or identity recovery.

### T-031 - Last-Resort Unenrolled Access Failure

- **Current control:** [P-068](./Patch_Log.md), [Last-Resort Unenrolled Access Evidence Test Package](./Last_Resort_Unenrolled_Access_Evidence_Test_Package.md), [Annex AK](../annexes/ANNEX_AK.md) §AK8, [Annex AZ](../annexes/ANNEX_AZ.md), and [Annex AY](../annexes/ANNEX_AY.md)
- **Resolution path:** distinguish ordinary identity recovery from a true last-resort floor. A person who cannot enroll, hold a wallet, use digital credentials, disclose identity, or navigate ordinary administration must still have a documented route to the CSM through no-credential intake, trusted intermediaries, physical access points, mobile delivery, or other analog paths.
- **Corruption route to assume:** staff and providers will demand identity for convenience; intermediaries may expose or favor recipients; brokers may exploit open access; reconciliation records may become a shadow registry; officials may count a written policy as access even when the person cannot reach it.
- **External evidence:** NIST SP 800-63-4, World Bank ID4D, UNHCR registration guidance, and Sphere standards anchor the reality that identity, service access, and humanitarian minimums fail when practical barriers are ignored.
- **Proof needed:** Last-Resort Unenrolled Access Evidence Test Package; no-credential intake drill, trusted-intermediary drill, analog reconciliation privacy audit, abuse/diversion drill, provider-settlement continuity check, abandonment accounting, and dignity interviews.
- **Abuse cases:** ACL-016 — Last-Resort Floor Paper Compliance; related ACL-015 — Tier 0 Token De-Anonymization.
- **Residual risk:** the last-resort floor must tolerate some low-level leakage to avoid excluding the person in front of it. Aggregate controls may miss organized abuse; stronger individual controls can become surveillance. The system may not claim practical universality until this gate passes.
- **Resolution update:** P-068 makes the last-resort unenrolled case a distinct evidence gate instead of burying it under T-002 identity recovery or T-030 outage continuity.

### T-032 - Monitoring Repurposing and Enforcement-Observation Failure

- **Current control:** [P-069](./Patch_Log.md), [Monitoring Administrative Safety Packet](./Monitoring_Administrative_Safety_Packet.md), [Monitoring Repurposing Evidence Test Package](./Monitoring_Repurposing_Evidence_Test_Package.md), [Annex C](../annexes/ANNEX_C.md), [Capture Dashboard Specification](./Capture_Dashboard_Specification.md), [Annex AK](../annexes/ANNEX_AK.md), and [Annex AY](../annexes/ANNEX_AY.md)
- **Resolution path:** treat every monitoring stream as a power-bearing instrument. Each stream needs a named purpose, minimum-data design, data-lane assignment, raw-access rule, aggregation-first rule, access-role boundary, independent reviewer, appeal path, retention limit, cleared-flag expiration, vendor control, lawful-pressure handling, and explicit secondary-use prohibition.
- **Corruption route to assume:** offices collect data for protection, then reuse it for convenience, enforcement expansion, immigration or policing cooperation, provider leverage, worker/renter screening, local retaliation, dashboard self-protection, or successor-government control. Small cells, metadata, time/location traces, and cross-dashboard joins make people identifiable despite formal aggregation.
- **External evidence:** OECD public-integrity and implementation-gap sources, NIST identity/privacy guidance, and the corpus's own Capture Dashboard and Annex C controls all warn that formal rules do not prove monitoring practice.
- **Proof needed:** Monitoring Administrative Safety Packet and Monitoring Repurposing Evidence Test Package; Monitoring Purpose Register, lane-assignment table, raw-access log standard, purpose-creep red team, administrative-expansion drill, lawful-pressure scenario, linkability/re-identification test, office-separation drill, individual-flag appeal drill, data-minimization and retention audit, cleared-flag reuse test, and coercive-use scenario.
- **Abuse cases:** ACL-017 — Monitoring Repurposing; related ACL-009 — Dashboard Gaming and ACL-015 — Tier 0 Token De-Anonymization.
- **Residual risk:** monitoring creates power even when purpose-bound. Under-monitoring can miss organized harm; over-monitoring can chill access and build coercive infrastructure. The system may not claim monitoring is non-surveillant until repurposing resistance has evidence.
- **Resolution update:** P-069 registers the enforcement-observation paradox as T-032 so it is no longer only a scattered privacy concern inside identity, dashboards, Annex C, or non-convertibility enforcement.

### T-033 - Founding Consent Evidence and Civil-Society Review Definition Failure

- **Current control:** [P-070](./Patch_Log.md), [Founding Consent and Civil-Society Review Evidence Test Package](./Founding_Consent_Civil_Society_Review_Evidence_Test_Package.md), [Founding Legitimacy Dossier](./Founding_Legitimacy_Dossier.md), [Founding Order](../../founding/order/README.md), [Vulnerable Population Consent Protocol](./Vulnerable_Population_Consent_Protocol.md), and [Founding Team Composition Standard](./Founding_Team_Composition_Standard.md)
- **Resolution path:** define consent evidence and civil-society reviewer qualification before any Gate A claim. Binding unit consent must follow the Founding Order's 2/3 participation and 2/3 affirmative eligible-resident threshold; reviewer independence must be shown through financial, governance, affected-community, dissent-capacity, conflict-disclosure, and public-challenge records.
- **Corruption route to assume:** founders substitute public consultation, silence, aid acceptance, or friendly review for consent; funders and vendors steer reviewer selection; prestige organizations with no affected-community accountability certify the process; dissenting reviewer findings are summarized away.
- **External evidence:** Ostrom commons evidence anchors the importance of local consent and community-governance legitimacy; OECD public-integrity sources anchor the risk that formal rules and institutional trust fail without conflict controls, transparency, and independent review.
- **Proof needed:** Founding Consent and Civil-Society Review Evidence Test Package; threshold certification, opt-out proof, aid-nonconditioning proof, pressure survey, coercion complaint log, exit-cost report, reviewer qualification register, public challenge log, and separate independent reviewer findings.
- **Abuse cases:** ACL-018 — Founding Prerequisite Definition Capture; related ACL-010 — Founding consent theater and ACL-005 — Keyholder social capture.
- **Residual risk:** no founding record can remove the bootstrap problem. The control prevents vague consent and friendly review from being counted as proof; it does not prove that all affected people felt free, understood the project, or trusted the right reviewers.
- **Resolution update:** P-070 makes the two Founding Legitimacy Dossier unresolved-prerequisite rows testable instead of leaving "consent evidence" and "civil society" as undefined terms.

---

## Definition of Completion

The threat register is not complete when every row has a patch. It is complete enough for the next stage only when every registered threat has:

- a linked control,
- an adversarial abuse model,
- a test or audit path,
- failure criteria,
- residual risk,
- and a status that does not overclaim.

The practical aim is not a perfect constitution. The practical aim is a constitution that keeps telling the truth about where power can still get in.
