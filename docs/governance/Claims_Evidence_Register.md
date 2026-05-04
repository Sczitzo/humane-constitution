# Claims and Evidence Register

This register says what the project can honestly claim.

It separates moral commitments, designed mechanisms, active-but-unproven controls, and evidence-backed results. The goal is to prevent overclaiming. A reader should be able to tell the difference between what the project values, what it has specified, what it has stress-tested on paper, and what has been proven in the world.

See also: [Architecture Source Map](./Architecture_Source_Map.md), [External Evidence Register](./External_Evidence_Register.md), [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md), [Identity and Recovery Evidence Test Package](./Identity_Recovery_Evidence_Test_Package.md), [Capacity Measurement Evidence Test Package](./Capacity_Measurement_Evidence_Test_Package.md), [Demurrage Evidence and Test Package](./Demurrage_Evidence_Test_Package.md), [Threat Resolution Matrix](./Threat_Resolution_Matrix.md), [Conceptual Refinement Audit](./Conceptual_Refinement_Audit.md), [Hardening Queue](./Hardening_Queue.md), and [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md).

## Status language

| Status | Meaning |
|---|---|
| **Moral commitment** | A normative claim. Evidence can inform it, but cannot prove it by itself. |
| **Designed framing** | An organizing theory or diagnostic lens that helps structure the design, but is not proof that any mechanism works. |
| **Designed mechanism** | The repo contains a concrete rule, annex, patch, or procedure, but it has not been proven in live use. |
| **Active-unproven control** | The mechanism is integrated into the constitutional document set, but still needs simulation, pilot evidence, or audit results. |
| **Partly tested** | The repo contains simulations, threat modeling, or adversarial analysis, but not full field evidence. |
| **Needs evidence** | The claim depends on outside data, pilots, legal review, cost models, or implementation results not yet present in the repo. |
| **Unresolved prerequisite** | The project names the problem, but the answer is not yet complete enough to support deployment. |
| **Evidence-backed** | A defined test or pilot has been passed and the residual risk has been updated. |

No major operational claim in this project is currently **Evidence-backed** at deployment scale.

> This register's status taxonomy is the canonical reference for all governance documents in this project. Documents using different status labels — for example, Hardening_Queue.md's DESIGNED, ACTIVE-UNPROVEN, and ONGOING — should be interpreted against the definitions in this register. The mapping is: DESIGNED → "Designed mechanism, needs evidence"; ACTIVE-UNPROVEN → "Active-unproven control"; ONGOING → context-dependent, see register entry.

---

## Public claims

| Claim | Honest status | Current repo basis | What would make it stronger | Failure mode to test |
|---|---|---|---|---|
| The design is organized around preventing three collapse states: survival bound to trade, wealth converging into rule-power, and temporary advantage hardening into permanent class position. | **Designed framing** | [Architecture Source Map](./Architecture_Source_Map.md), Conceptual Refinement Audit, Threat Resolution Matrix | Every threat, pilot, and public claim can be traced to at least one collapse state without hiding residual risk. | The framing becomes rhetoric while mechanisms still permit shadow conversion, proxy power, or incumbent lock-in. |
| Survival should not depend on income, obedience, popularity, or market status. | **Moral commitment** plus designed invariant | Humane Constitution, INVARIANTS, Rights Layer, Annex Y | Broader public review across political, religious, cultural, disability, migration, and legal traditions | The survival floor becomes conditional through identity, compliance, staff discretion, debt, or emergency status. |
| Wealth should not buy formal civic rule. | **Moral commitment** plus designed mechanism | Article VI, separated-tool rules, Annex AJ, T-001, INV-004 | External constitutional-law, anti-corruption, labor, housing, and platform-governance review | Wealth converts into Voice, Service Record, exemptions, privileged access, or institutional appointments through proxy channels. |
| Productive markets can exist while survival access is protected separately. | **Designed mechanism, needs evidence** | Flow / Essential Access separation, White Paper, SPECIFICATIONS, Annexes X and J | Pilot data on prices, production incentives, supply response, business formation, and essential-sector labor behavior | Protected survival suppresses needed production, or Flow markets recreate survival coercion indirectly through housing, employment, credit, or vendor power. |
| Flow can function as public money on common rails without reproducing predatory credit dependence. | **Designed mechanism, needs simulation** | Article V, SPECIFICATIONS, Annex X, P-030 | Banking service cost model, public-rail operations model, fraud model, offline access test, project-finance simulation | Credit reappears through shadow lenders, rationed access, overdraft-like fees, private deposit substitutes, or elite project-finance capture. |
| Idle-money fees can fund public rails without becoming a hidden tax or sector-capture tool. | **Designed mechanism, needs evidence** | Annexes J, X, AR; P-023; FC-054 reserved | Flow decay model, household burden model, budget model, sector stress tests, project escrow simulation | Actors classify holdings to escape decay, or the fee burdens ordinary users more than concentrated capital. |
| Demurrage is a plausible monetary design space, but its social burden and capture risks must be tested. | **Designed mechanism, needs outside evidence and simulation** | Annexes J, X, AR; P-023; External Evidence Register; [Demurrage Evidence and Test Package](./Demurrage_Evidence_Test_Package.md) | IMF / central-bank research review, household burden model, business working-capital model, procurement and beneficial-ownership red team | Negative-rate effects distort investment, burden ordinary liquidity, or create project-finance and legal-wrapper capture channels. |
| Essential Access can protect baseline survival without becoming welfare bureaucracy. | **Designed mechanism, needs evidence** | Article IV, Annex Y, Rights Layer, T-002, T-007 | Delivery pilots, appeal tests, administrative-cost estimates, exclusion-rate measurement, dignity interviews | Gatekeeping, delays, documentation burden, local discretion, or vendor concentration recreates coercive welfare dynamics. |
| Voice and Service Record can support civic participation without becoming social credit. | **Designed mechanism, needs usability and abuse testing** | Article VI, INVARIANTS, Annex Z, T-008, T-009, T-011 | Privacy review, employer/vendor misuse tests, UI testing, abuse-case red team, boundary-enforcement tests | Employers, landlords, schools, agencies, or platforms treat civic signals as rank, credit, employability, or human worth. |
| Shared Storehouse can handle genuine shortage more fairly than panic prices alone. | **Active-unproven control, needs emergency simulation** | Article V, SPECIFICATIONS, Annex AQ, T-024 | Scarcity drills using real supply data, oracle-failure tests, reconciliation exercises, public comprehension testing | Rationing becomes permanent, captured, too slow, too broad, or detached from physical capacity. |
| Many independent measurement sources can reduce capture and shared error. | **Active-unproven control, partly tested on paper** | T-020/T-021, Annex AL, FC-030 to FC-033 | Independent measurement pilots, standards-body review, direct physical sampling cost analysis, adversarial methodology audit | Measurement sources appear independent but share assumptions, funding, standards, data, AI supply chains, or professional culture. |
| Identity can be fraud-resistant without becoming surveillance or exclusion. | **Unresolved prerequisite, needs evidence** | T-002, P-003, P-016, Annex P, Annex AK; [Identity and Recovery Evidence Test Package](./Identity_Recovery_Evidence_Test_Package.md) | Privacy-preserving credential pilots, recovery testing with vulnerable populations, false-exclusion thresholds, coercion tests, staff-discretion audit, data-minimization audit | Fraud controls exclude undocumented, displaced, elderly, disabled, digitally fragile, or coercively controlled people. |
| Anti-rent and anti-dynasty rules can prevent extraction without killing stewardship or enterprise. | **Designed mechanism, needs legal/economic modeling** | Article V, Annex J, Annex AR, P-031 through P-033 | Trust-law analysis, beneficial-ownership red team, cooperative ownership evidence, property-use transition modeling | Wealth persists through trusts, family offices, foundations, shell chains, mission-lock capture, land-control rights, or business-control workarounds. |
| A legitimate founding process can avoid coercive rollout. | **Unresolved prerequisite** | Founding Order, Annex AH, T-017, T-022, T-026, T-027 | Public consent model, coalition legitimacy criteria, objection process, exit rehearsal, independent civil-society review | Founding institutions are staffed by actors who benefit from capture, impose adoption without credible consent, or make exit formally available but practically costly. |
| The patch process can repair the system without becoming its own power center. | **Designed mechanism, needs red-team testing** | Acceptance Protocol, Annexes AG, AH, AV, Patch Log | External procedural audit, deadlock simulation, adversarial reviewer conflict tests, ordinary-reader traceability test | FAP reviewers, adversarial panels, or status labels become gatekeeping authority that protects the process rather than the people. |

---

## Claims that should not be made yet

Do not claim the Humane Constitution:

- has solved poverty in practice
- is incorruptible
- is ready for full deployment
- has proven the identity stack
- has proven Essential Access delivery
- has proven real-capacity measurement
- has proven demurrage funding at scale
- has proven public banking operations at scale
- can prevent every elite workaround
- can remove all bureaucracy
- can guarantee perfect measurement of real-world capacity
- has evidence-backed legitimacy for a founding coalition

The accurate claim is narrower: the repo contains a serious constitutional design, public explanations, a threat model, a patch history, simulations, provenance records, and a pilot roadmap. It is ready for critique and deeper testing, not deployment.

---

## Evidence priorities

| Priority | Evidence needed | Why it matters | First document to update after evidence |
|---|---|---|---|
| 1 | Identity and recovery pilot | A survival floor fails morally if documentation, coercion, staff discretion, device loss, or recovery errors exclude people. | Identity and Recovery Evidence Test Package; Threat Register T-002; Annex P; Annex AK; this register. |
| 2 | Essential capacity measurement pilot | Essential Access and Shared Storehouse depend on credible food, water, shelter, care, medicine, transit, and energy measurements. | Capacity Measurement Evidence Test Package; Annex AL; Pilot Evidence Roadmap; Threat Register T-006/T-020/T-021. |
| 3 | Essential Access delivery and appeals pilot | A right that cannot be delivered or appealed is only paper protection. | Rights Layer; Claims Register; Threat Register T-002/T-007. |
| 4 | Flow, demurrage, and public-rail simulation | The economic rail must fund operations without distorting ordinary life or creating capture exemptions. | Demurrage Evidence and Test Package; Annexes X, J, AR; Patch Log P-023/P-030. |
| 5 | Public banking cost and access model | Public banking must be operationally sustainable without predatory fees or digital exclusion. | SPECIFICATIONS; public docs; Pilot Evidence Roadmap. |
| 6 | Anti-rent legal wrapper review | Trusts, beneficial ownership, land rights, and business control are likely elite workaround paths. | Annex J; Hardening Queue; Threat Register. |
| 7 | Public usability testing | Skeptical ordinary readers need to understand the system without policy or technical background. | Public Overview; FAQ; Readiness Guide. |
| 8 | External red-team audit | The project needs hostile review from people who do not share its assumptions. | Conceptual Refinement Audit; Threat Register; Patch Log. |

---

## How to use this register

When editing public-facing or governance material:

1. Match each major claim to a row in this register.
2. Use status-accurate language: `moral commitment`, `designed mechanism`, `active-unproven control`, `partly tested`, `needs evidence`, or `unresolved prerequisite`.
3. Avoid deployment language unless the mechanism has pilot or implementation proof.
4. If a new claim does not fit this register, either add it here or soften the claim.
5. When evidence arrives, update the claim, the relevant threat entry, the relevant patch or annex, and the Pilot Evidence Roadmap together.
6. When an outside source is used, record it in the External Evidence Register with both its relevance and its limits.
