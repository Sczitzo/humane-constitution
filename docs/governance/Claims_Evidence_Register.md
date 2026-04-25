# Claims and Evidence Register

This register separates what the Humane Constitution **believes**, what it has **specified**, what it has **partially tested**, and what still needs **outside evidence**.

It is meant to prevent accidental overclaiming. A public reader should be able to tell the difference between a moral premise, a constitutional design choice, a simulated result, and a proven deployment fact.

## Status language

| Status | Meaning |
|---|---|
| **Normative claim** | A moral or constitutional judgment. Evidence can inform it, but cannot prove it by itself. |
| **Specified design** | The repo contains a concrete mechanism or rule, but it has not been proven in live deployment. |
| **Partially tested** | The repo contains simulations, threat models, or adversarial analysis, but not full field evidence. |
| **Needs evidence** | The claim depends on outside data, pilots, or implementation results not yet present in the repo. |
| **Unresolved** | The project acknowledges the problem but does not yet have a complete answer. |

## Public claims

| Claim | Status | Current repo basis | What would make it stronger | Failure mode to test |
|---|---|---|---|---|
| Survival should not depend on income, obedience, popularity, or market status. | Normative claim | Humane Constitution, White Paper, Citizen-Facing Rights Layer | Broader public review across political, religious, cultural, and legal traditions | A survival floor becomes conditional through identity, compliance, or administrative discretion. |
| Wealth should not buy formal civic rule. | Normative claim and specified design | Article VI, instrument separation rules, Annex AJ, Threat Register T-001 | External constitutional-law review and anti-corruption review | Wealth converts into Voice, Service Record, exemptions, or privileged institutional access through proxy channels. |
| Productive markets can exist while survival access is protected separately. | Specified design, needs evidence | Flow / Essential Access separation, White Paper, SPECIFICATIONS | Pilot data on prices, production incentives, supply response, and business formation | Protected survival suppresses production or Flow markets recreate survival coercion indirectly. |
| Flow can function as public money on common rails without reproducing predatory credit dependence. | Specified design, needs simulation | White Paper, Public FAQ, Article V, demurrage and public banking language | Banking service cost model, public-rail operations model, project-finance design | Credit reappears through shadow lenders, rationed access, or elite project-finance capture. |
| Demurrage can fund public rails without becoming a hidden tax or sector-capture tool. | Specified design, needs evidence | Annex AR, Acceptance Protocol, Patch Log P-023 | Flow decay model, budget model, sector stress tests | Actors classify holdings to escape decay, or demurrage burdens ordinary users more than concentrated capital. |
| Essential Access can protect baseline survival without becoming welfare bureaucracy. | Specified design, needs evidence | Article IV, Annex Y, Citizen-Facing Rights Layer | Delivery pilots, appeal tests, administrative-cost estimates, exclusion-rate measurement | Gatekeeping, delays, documentation burden, or local discretion recreate coercive welfare dynamics. |
| Voice and Service Record can support civic participation without becoming social credit. | Specified design, needs usability and abuse testing | Article VI, INVARIANTS, Public FAQ | Privacy review, UI testing, abuse-case red team, boundary-enforcement tests | Employers, landlords, agencies, or platforms treat civic signals as rank, credit, or worth. |
| Shared Storehouse can handle genuine shortage more fairly than price spikes alone. | Specified design, needs emergency simulation | Article III, Article V, SPECIFICATIONS, Annex AQ | Scarcity drills using real supply data and oracle-failure tests | Rationing becomes permanent, captured, too slow, or detached from physical capacity. |
| Polycentric oracle measurement can reduce capture and correlated error. | Partially tested, needs field evidence | Threat Register T-020/T-021, Annex AL, FC-030 to FC-033 | Independent measurement pilots and adversarial standards-body review | Oracles appear independent but share the same epistemic, funding, or standards capture. |
| Identity can be fraud-resistant without becoming surveillance or exclusion. | Unresolved, needs evidence | Threat Register T-002, Patch Log P-003, Annex AK | Privacy-preserving credential pilots, recovery testing with vulnerable populations | Fraud controls exclude undocumented, displaced, elderly, disabled, or digitally fragile people. |
| Anti-rent and anti-trust rules can prevent dynastic extraction without killing stewardship or enterprise. | Specified direction, needs legal/economic modeling | Article V, Public Readiness Guide, anti-rent language in public docs | Trust-law analysis, cooperative ownership evidence, property-use transition modeling | Wealth persists through legal wrappers, family offices, beneficial ownership, or business-control workarounds. |
| A legitimate founding process can avoid coercive rollout. | Unresolved prerequisite | Founding Order, founding/order documents, Threat Register T-017 | Public consent model, coalition legitimacy criteria, exit testing | Founding institutions are staffed by actors who benefit from capture or impose adoption without credible consent. |

## Claims that should not be made yet

Do not claim the Humane Constitution:

- has solved poverty in practice
- is incorruptible
- is ready for full deployment
- has proven the identity stack
- has proven demurrage funding at scale
- has proven public banking operations at scale
- can prevent every elite workaround
- can remove all bureaucracy
- can guarantee perfect measurement of real-world capacity

The accurate claim is narrower: the repo contains a serious constitutional design, a public explanation layer, a threat model, a patch history, simulations, a validation pipeline, and a pilot roadmap. It is ready for critique and deeper testing, not deployment.

## Evidence priorities

| Priority | Evidence needed | Why it matters |
|---|---|---|
| 1 | Identity and recovery pilot design | A survival floor fails morally if people can be excluded by documentation or recovery errors. |
| 2 | Essential capacity measurement model | Essential Access and Shared Storehouse depend on credible food, water, shelter, care, and medicine measurements. |
| 3 | Flow and demurrage simulation | The economic rail must fund operations without distorting ordinary life or creating capture exemptions. |
| 4 | Banking rail cost model | Public banking must be operationally sustainable without predatory fees or credit traps. |
| 5 | Anti-rent legal model | Trusts, beneficial ownership, property rights, and business control are likely elite workaround paths. |
| 6 | Public usability testing | Skeptical ordinary readers need to understand the system without policy or technical background. |
| 7 | External red-team audit | The project needs hostile review from people who do not share its assumptions. |

## How to use this register

When editing public-facing material:

1. Match each major claim to a row in this register.
2. Use status-accurate language: `specified`, `designed`, `needs evidence`, or `unresolved`.
3. Avoid deployment language unless the mechanism has pilot or implementation proof.
4. If a new claim does not fit this register, either add it here or soften the claim.

For the staged testing path, use [`Pilot_Evidence_Roadmap.md`](./Pilot_Evidence_Roadmap.md).
