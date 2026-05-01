# Threat Resolution Matrix

This matrix is the working plan for moving every registered threat from "named" to "controlled under evidence."

The word **solve** is used here in a strict way: a threat is solved only when the system has a plausible mechanism, a corruption-aware abuse model, a test path, and an honest residual-risk statement. No institutional design can eliminate greed, coercion, collusion, political opportunism, or legal arbitrage. The goal is to make those pressures visible, costly, bounded, and correctable before they can quietly become normal.

See also: [Threat Register](./Threat_Register.md), [Hardening Queue](./Hardening_Queue.md), [Claims and Evidence Register](./Claims_Evidence_Register.md), [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md), and [Conceptual Refinement Audit](./Conceptual_Refinement_Audit.md).

---

## Resolution Standard

A threat may move toward **RESOLVED** only when all five tests are satisfied:

1. **Mechanism:** the control exists in a patch, annex, Founding Order rule, pilot protocol, or operational standard.
2. **Corruption model:** the record names how greedy, frightened, ambitious, or corrupt actors would route around the control.
3. **Evidence path:** the project names a simulation, pilot, legal review, audit, or red-team exercise that could falsify the control.
4. **Failure criteria:** the project names what would count as failure before deployment pressure can relabel failure as success.
5. **Residual risk:** the project states what remains unsafe, uncertain, or permanently contested after the control is adopted.

Until those tests are met, the honest status is **designed**, **active-unproven**, **partial**, or **ongoing**, not resolved.

---

## Workstream Sequence

| Order | Workstream | Threats | Why this order |
|---|---|---|---|
| 1 | Identity and measurement truth | T-002, T-006, T-012, T-015, T-018, T-019, T-020, T-021, T-024 | If identity or capacity measurement fails, the rest of the system can be gamed while appearing compliant. |
| 2 | Economic boundary integrity | T-001, T-004, T-007, T-025 | If civic instruments become money, status, rent, or legal wrappers, the core separation collapses. |
| 3 | Institutional anti-capture | T-005, T-008, T-009, T-013, T-014, T-016, T-017 | If the repair machinery captures itself, the system cannot adapt honestly. |
| 4 | Legitimacy, narrative, transition, and scale | T-010/T-011, T-022, T-023, T-026, T-027 | If consent, explanation, pilot validity, exit, or subsidiarity fails, the constitution becomes coercive in practice. |

---

## Threat-by-Threat Resolution Plan

### T-001 - Shadow Convertibility

- **Current control:** [P-001](./Patch_Log.md), [Annex AB](../annexes/ANNEX_AB.md), [Annex AJ](../annexes/ANNEX_AJ.md)
- **Resolution path:** keep Essential Access non-delegable and context-locked, tolerate low-level informal leakage, and target organized brokers, employers, landlords, lenders, platforms, and repeat facilitators rather than ordinary households.
- **Corruption route to assume:** professional actors will package conversion inside service contracts, employment pressure, queue priority, household coercion, side payments, or "helpful" brokerage.
- **Proof needed:** proxy-market red team, broker profitability model, household-coercion cases, annual deterrence audit, and surveillance-burden review.
- **Residual risk:** enforcement can become overbroad; low-level leakage is tolerated, but scalable markets must stay uneconomic.

### T-002 - Identity Exploits

- **Current control:** [P-003](./Patch_Log.md), [P-016](./Patch_Log.md), [Annex AB](../annexes/ANNEX_AB.md), [Annex AK](../annexes/ANNEX_AK.md)
- **Resolution path:** use layered identity assurance, recovery continuity, asymmetric error thresholds, and human appeal so fraud control does not become the survival gate.
- **Corruption route to assume:** insiders sell credentials, abusive relatives or employers control recovery, administrators over-tighten rules to protect themselves, and vulnerable people are blamed as "risk."
- **Proof needed:** false-exclusion pilots, false-acceptance pilots, recovery drills for displaced and digitally fragile users, data-minimization audit, and insider fraud scenario testing.
- **Residual risk:** identity cannot be made frictionless and fraud-proof at the same time; the survival floor must remain continuous while disputes are reviewed.

### T-004 - Incentive Collapse

- **Current control:** [P-002](./Patch_Log.md), [Annex AB](../annexes/ANNEX_AB.md)
- **Resolution path:** preserve real reward gradients through Flow, opportunity, recognition, and contribution pathways while banning conversion of Service Record into worth, coercive hierarchy, or access to survival.
- **Corruption route to assume:** employers, schools, vendors, civic bodies, and ambitious insiders will treat contribution records as rank or employability scores.
- **Proof needed:** contribution-model simulation, employer/vendor misuse tests, high-skill participation metrics, burnout and coercion review, and ordinary-user comprehension testing.
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
- **Proof needed:** supply-shock drills, forecast-vs-actual review, physical inventory sampling, oracle latency tests, and public explanation tests for uncertainty bands.
- **Residual risk:** real-time scarcity measurement will always lag reality; the control must bound harm during uncertainty rather than pretend precision.

### T-007 - Political Definition Drift

- **Current control:** [P-004](./Patch_Log.md), [Annex AB](../annexes/ANNEX_AB.md)
- **Resolution path:** protect load-bearing terms, require semantic effect tests, publish worked examples, and treat cumulative narrowing as a constitutional event.
- **Corruption route to assume:** lawyers and officials will keep the old words while changing classifications, thresholds, examples, or technical definitions.
- **Proof needed:** semantic red-team review, registry usability test, ambiguity-case audit, and review of whether definition protection blocks needed iteration.
- **Residual risk:** the anti-drift system can become a semantic bureaucracy; flexibility needs a governed path without laundering capture as clarification.

### T-008 - Bureaucratic Elite Formation

- **Current control:** [P-008](./Patch_Log.md), [P-025](./Patch_Log.md), [Annex AC](../annexes/ANNEX_AC.md), [Annex AI](../annexes/ANNEX_AI.md)
- **Resolution path:** track verifier concentration, cohort overlap, expertise homogenization, Service Record loops, and Ombuds dispersal before insiders become a durable class.
- **Corruption route to assume:** credentialed insiders coordinate informally, rotate through offices, define competence in their own image, and protect each other through legitimate procedure.
- **Proof needed:** concentration dashboard, cohort-overlap audit, voting-pattern review, funding-dependence review, and external anti-capture audit.
- **Residual risk:** informal elite coordination cannot be eliminated by structural dispersal alone; recurring disclosure and outside review remain necessary.

### T-009 - Grace Exploitation Loop

- **Current control:** [P-009](./Patch_Log.md), [P-024](./Patch_Log.md), [Annex AF](../annexes/ANNEX_AF.md), [Annex AS](../annexes/ANNEX_AS.md)
- **Resolution path:** use graduated renewal, collusion detection, slow decay, pause-saturation monitoring, and capability pathways while preserving real hardship protection.
- **Corruption route to assume:** networks rotate hardship categories, manufacture employment evidence, freeze eligibility for civic positions, or use compassion rules as a status-preservation channel.
- **Proof needed:** hardship-ring simulation, attestation collusion audit, involuntary-unemployment verification test, and narrative test for humane communication.
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
- **Proof needed:** false-trigger-at-scale simulation, forensic delay audit, compound crisis exercise, and public narrative response test.
- **Residual risk:** real-time distinction will remain unreliable; the protocol must be conservative during emergencies and exacting afterward.

### T-019 - Demand-Context Flag Suppression Attack

- **Current control:** [P-015](./Patch_Log.md), [Annex AP](../annexes/ANNEX_AP.md)
- **Resolution path:** require Ombuds assessment of whether a demand-context flag was manufactured, supported by a cross-register timing monitor and fast-lift authority.
- **Corruption route to assume:** technically valid enforcement is launched at the exact moment needed to block legitimate PCRP response.
- **Proof needed:** timing-monitor false-positive test, Ombuds four-hour decision drill, enforcement-manufacture red team, and appeal review.
- **Residual risk:** intent is hard to prove under time pressure; precommitted criteria matter more than confidence after the fact.

### T-020 - Epistemological Oracle Capture

- **Current control:** [P-017](./Patch_Log.md), [Annex AL](../annexes/ANNEX_AL.md)
- **Resolution path:** require independent methodology classes, standards-diversity review, direct physical sampling, and visible uncertainty rather than relying on formal vendor independence.
- **Corruption route to assume:** measurement actors share standards, funders, professional assumptions, datasets, and model architecture while passing independence checks.
- **Proof needed:** methodology-class audit, standards-body capture review, direct-sampling pilot, and confidence-band comprehension test.
- **Residual risk:** independence is partly social and epistemic, not just organizational; recurring review is permanent.

### T-021 - Algorithmic Oracle Capture

- **Current control:** [P-017](./Patch_Log.md), [Annex AL](../annexes/ANNEX_AL.md)
- **Resolution path:** inspect AI supply chains, training data dependencies, model-update governance, and algorithmic correlation across oracle systems.
- **Corruption route to assume:** vendors deploy shared models, hidden data pipelines, biased optimization targets, or contract incentives that satisfy formal independence while producing correlated error.
- **Proof needed:** AI supply-chain audit, model-correlation test, vendor conflict review, and manual fallback drill.
- **Residual risk:** algorithmic systems can drift silently; the system needs recurring model review and non-AI physical anchors.

### T-022 - Electoral Cycle Capture

- **Current control:** [P-018](./Patch_Log.md), [Annex AM](../annexes/ANNEX_AM.md)
- **Resolution path:** entrench survival-floor persistence, transition continuity, hostile-administration triggers, and independent constitutional-body authority.
- **Corruption route to assume:** a successor government keeps constitutional language while starving staff, delaying appointments, rewriting administrative standards, or capturing enforcement.
- **Proof needed:** transition-of-power simulation, administrative hollowing trigger test, budget-starvation scenario, and independent-body legitimacy review.
- **Residual risk:** no constitutional design can fully prevent determined democratic repeal or authoritarian seizure; the project can only make hollowing visible and contested.

### T-023 - Pilot External Validity Collapse

- **Current control:** [P-019](./Patch_Log.md), [Annex AN](../annexes/ANNEX_AN.md)
- **Resolution path:** require stress evidence, substitute evidence, adversarial challenge, and a rule that failed pilots cannot be renamed success.
- **Corruption route to assume:** sponsors select friendly sites, exclude hard cases, optimize metrics, and scale from calm conditions because failure is politically costly.
- **Proof needed:** pilot representativeness review, stress-evidence dossier, independent challenge response, and no-rebrand audit.
- **Residual risk:** some large-scale conditions cannot be ethically reproduced; substitute evidence must be explicit about what it cannot prove.

### T-024 - Shared Storehouse Oracle-Failure During Active Rationing

- **Current control:** [P-022](./Patch_Log.md), [Annex AQ](../annexes/ANNEX_AQ.md)
- **Resolution path:** hold current rationing level during oracle blackout, restrict provisional REB authority, publish physical-indicator evidence, and reconcile after oracle restoration.
- **Corruption route to assume:** actors disrupt oracle quorum during rationing to force false lapse, false extension, or normalization of non-oracle emergency discretion.
- **Proof needed:** oracle-blackout drill, physical-indicator review, 14-day restoration-window test, reconciliation post-mortem, and public explanation review.
- **Residual risk:** emergency exceptions can normalize; reconciliation must be public, timely, and reputationally costly.

### T-025 - Demurrage Sector-Capture via Investment Channel

- **Current control:** [P-023](./Patch_Log.md), [Annex AR](../annexes/ANNEX_AR.md)
- **Resolution path:** keep zero demurrage exemptions, use contract-commitment architecture, release funds on verified physical deliverables, and protect all key terms from definition drift.
- **Corruption route to assume:** firms use subsidiaries, project cycling, force-majeure claims, infrastructure labels, escrow windows, or procurement pressure to park Flow without decay.
- **Proof needed:** project-finance simulation, procurement integrity review, legal-wrapper red team, force-majeure panel capture audit, and nested subcontractor tracing test.
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
- **Proof needed:** subsidiarity challenge simulation, aggregate-drift audit, soft-exception review, and floor-versus-uniform-rule case study.
- **Residual risk:** centralization often happens through plausible individual decisions; only aggregate monitoring exposes the drift.

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
