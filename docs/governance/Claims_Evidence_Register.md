# Claims and Evidence Register

It separates moral commitments, designed mechanisms, active-but-unproven controls, and evidence-backed results. The goal is to prevent overclaiming. A reader should be able to tell the difference between what the project values, what it has specified, what it has stress-tested on paper, and what has been proven in the world.

## Status language

| Status | Meaning |
|---|---|
| **Moral commitment** | A normative claim. Evidence can inform it, but cannot prove it by itself. |
| **Designed mechanism** | The repo contains a concrete rule, annex, patch, or procedure, but it has not been proven in live use. |
| **Active-unproven control** | The mechanism is integrated into the constitutional document set, but still needs simulation, pilot evidence, or audit results. |
| **Partly tested** | The repo contains simulations, threat modeling, or adversarial analysis, but not full field evidence. |
| **Needs evidence** | The claim depends on outside data, pilots, legal review, cost models, or implementation results not yet present in the repo. |
| **Unresolved prerequisite** | The project names the problem, but the answer is not yet complete enough to support deployment. |
| **Evidence-backed** | A defined test or pilot has been passed and the residual risk has been updated. |

No major operational claim in this project is currently **Evidence-backed** at deployment scale.

> This register's status taxonomy is the canonical reference for all governance documents in this project. Documents using different status labels — for example, hardening-roadmap shorthand such as DESIGNED, ACTIVE-UNPROVEN, and ONGOING — should be interpreted against the definitions in this register. The mapping is: DESIGNED → "Designed mechanism, needs evidence"; ACTIVE-UNPROVEN → "Active-unproven control"; ONGOING → context-dependent, see register entry.

---

## Public claims

| Claim | Honest status | Current repo basis | What would make it stronger | Failure mode to test |
|---|---|---|---|---|
| The design is organized around preventing three collapse states: survival bound to trade, wealth converging into rule-power, and temporary advantage hardening into permanent class position. | **Designed mechanism, needs evidence** | [Architecture Source Map](./Architecture_Source_Map.md), [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md), [Threat Resolution Matrix](./Threat_Resolution_Matrix.md) | Every threat, pilot, and public claim can be traced to at least one collapse state without hiding residual risk. | The framing becomes rhetoric while mechanisms still permit shadow conversion, proxy power, or incumbent lock-in. |
| The threat model is organized into reusable abuse cases that can be tested before new patches claim closure. | **Designed mechanism, needs red-team use** | [Abuse Case Library](./Abuse_Case_Library.md), Threat Register, Threat Resolution Matrix | Every critical threat and patch intake cites relevant abuse cases and updates them after pilots or incidents. | The library becomes a checklist while adversaries use uncatalogued variants. |
| Survival should not depend on income, obedience, popularity, or market status. | **Moral commitment** plus designed invariant | Humane Constitution, INVARIANTS, Rights Layer, Annex Y | Broader public review across political, religious, cultural, disability, migration, and legal traditions | The survival floor becomes conditional through identity, compliance, staff discretion, debt, or emergency status. |
| Wealth should not buy formal civic rule. | **Moral commitment** plus designed mechanism | Article VI, separated-tool rules, Annex AJ, T-001, INV-004 | External constitutional-law, anti-corruption, labor, housing, and platform-governance review | Wealth converts into Voice, Service Record, exemptions, privileged access, or institutional appointments through proxy channels. |
| Productive markets can exist while survival access is protected separately. | **Designed mechanism, needs evidence** | Flow / Essential Access separation, White Paper, SPECIFICATIONS, Annexes X and J | Pilot data on prices, production incentives, supply response, business formation, and essential-sector labor behavior | Protected survival suppresses needed production, or Flow markets recreate survival coercion indirectly through housing, employment, credit, or vendor power. |
| Flow can function as public money on common rails without reproducing predatory credit dependence. | **Designed mechanism, needs simulation** | Article V, SPECIFICATIONS, Annex X, P-030 | Banking service cost model, public-rail operations model, fraud model, offline access test, project-finance simulation | Credit reappears through shadow lenders, rationed access, overdraft-like fees, private deposit substitutes, or elite project-finance capture. |
| Idle-money fees can fund public rails without becoming a hidden tax or sector-capture tool. | **Designed mechanism, needs evidence** | Annexes J, X, AR; P-023; FC-054 reserved | Flow decay model, household burden model, budget model, sector stress tests, project escrow simulation | Actors classify holdings to escape decay, or the fee burdens ordinary users more than concentrated capital. |
| Demurrage is a plausible monetary design space, but its social burden and capture risks must be tested. | **Designed mechanism, needs outside evidence and simulation** | Annexes J, X, AR; P-023; External Evidence Register; [Demurrage Evidence and Test Package](./Demurrage_Evidence_Test_Package.md) | IMF / central-bank research review, household burden model, business working-capital model, procurement and beneficial-ownership red team | Negative-rate effects distort investment, burden ordinary liquidity, or create project-finance and legal-wrapper capture channels. |
| Essential Access can protect baseline survival without becoming welfare bureaucracy. | **Designed mechanism, needs evidence** | Article IV, Annex Y, Rights Layer, T-002, T-007 | Delivery pilots, appeal tests, administrative-cost estimates, exclusion-rate measurement, dignity interviews | Gatekeeping, delays, documentation burden, local discretion, or vendor concentration recreates coercive welfare dynamics. |
| Voice and Service Record can support civic participation without becoming social credit. | **Designed mechanism, needs usability and abuse testing** | Article VI, INVARIANTS, Annex Z, T-008, T-009, T-011; [Service Record Misuse Evidence Test Package](./Service_Record_Misuse_Evidence_Test_Package.md) | Privacy review, employer/vendor/school/housing misuse tests, UI testing, contribution-category equity audit, attestation-collusion pilot, boundary-enforcement tests | Employers, landlords, schools, agencies, or platforms treat civic signals as rank, credit, employability, or human worth. |
| Shared Storehouse can handle genuine shortage more fairly than panic prices alone. | **Active-unproven control, needs emergency simulation** | Article V, SPECIFICATIONS, Annex AQ, T-024 | Scarcity drills using real supply data, oracle-failure tests, reconciliation exercises, public comprehension testing | Rationing becomes permanent, captured, too slow, too broad, or detached from physical capacity. |
| Many independent measurement sources can reduce capture and shared error. | **Active-unproven control, partly tested on paper** | T-020/T-021, Annex AL, FC-030 to FC-033 | Independent measurement pilots, standards-body review, direct physical sampling cost analysis, adversarial methodology audit | Measurement sources appear independent but share assumptions, funding, standards, data, AI supply chains, or professional culture. |
| Identity can be fraud-resistant without becoming surveillance or exclusion. | **Unresolved prerequisite, needs evidence** | T-002, P-003, P-016, Annex P, Annex AK; [Identity and Recovery Evidence Test Package](./Identity_Recovery_Evidence_Test_Package.md) | Privacy-preserving credential pilots, recovery testing with vulnerable populations, false-exclusion thresholds, coercion tests, staff-discretion audit, data-minimization audit | Fraud controls exclude undocumented, displaced, elderly, disabled, digitally fragile, or coercively controlled people. |
| Anti-rent and anti-dynasty rules can prevent extraction without killing stewardship or enterprise. | **Designed mechanism, needs legal/economic modeling** | Article V, Annex J, Annex AR, P-031 through P-033 | Trust-law analysis, beneficial-ownership red team, cooperative ownership evidence, property-use transition modeling | Wealth persists through trusts, family offices, foundations, shell chains, mission-lock capture, land-control rights, or business-control workarounds. |
| Essential-sector conglomerates can keep doing business if they are paid for verified production rather than allowed to hold survival goods hostage. | **Designed mechanism, needs sector stress tests** | Article V, Annex AT, Annex AR, Capture Dashboard Specification, [Conglomerate Transition Dossier](./Conglomerate_Transition_Dossier.md), [Essential-Sector Refusal Test Package](./Essential_Sector_Refusal_Test_Package.md) | Supplier-refusal drills, public fallback capacity audits, medicine stockpile tests, energy reserve tests, procurement/legal-wrapper red team, and lobbying/capture exposure review | Oil, energy, medicine, logistics, or PBM-style intermediaries leave, litigate, lobby, retaliate, or reroute control through foreign affiliates faster than the public can replace essential capacity. |
| A legitimate founding process can avoid coercive rollout. | **Unresolved prerequisite** | Founding Order, Annex AH, T-017, T-022, T-026, T-027 | Public consent model, coalition legitimacy criteria, objection process, exit rehearsal, independent civil-society review | Founding institutions are staffed by actors who benefit from capture, impose adoption without credible consent, or make exit formally available but practically costly. |
| A legitimate founding process can be evidenced through a public dossier rather than assumed from technical compliance. | **Unresolved prerequisite, dossier designed** | [Founding Legitimacy Dossier](./Founding_Legitimacy_Dossier.md), Founding Order, Annex AH, Acceptance Protocol | Scope declaration, conflict register, objection process, consent record, exit rehearsal, founder sunset, and independent civil-society review. | The dossier becomes ceremony while founders retain exceptional authority or suppress dissent. |
| The patch process can repair the system without becoming its own power center. | **Designed mechanism, needs red-team testing** | Acceptance Protocol, Annexes AG, AH, AV, Patch Log | External procedural audit, deadlock simulation, adversarial reviewer conflict tests, ordinary-reader traceability test | FAP reviewers, adversarial panels, or status labels become gatekeeping authority that protects the process rather than the people. |
| Tier 1 implementation drift can be made detectable through hashes, threshold signatures, timelocks, public logs, and startup checks. | **Designed mechanism, needs implementation audit** | Architecture files, INVARIANTS, Annex AV; [Implementation Drift Audit Package](./Implementation_Drift_Audit_Package.md) | Reproducible hash test, append-only log test, key custody review, bound-component startup refusal test, and supply-chain bypass review. | Operators, binaries, keyholders, or publication channels drift while the document set appears unchanged. |

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
| 1 | Identity and recovery pilot | A survival floor fails morally if documentation, coercion, staff discretion, device loss, or recovery errors exclude people. | [Identity and Recovery Evidence Test Package](./Identity_Recovery_Evidence_Test_Package.md); [Threat Register](./Threat_Register.md) T-002; Annex P; Annex AK; this register. |
| 2 | Essential capacity measurement pilot | Essential Access and Shared Storehouse depend on credible food, water, shelter, care, medicine, transit, and energy measurements. | [Capacity Measurement Evidence Test Package](./Capacity_Measurement_Evidence_Test_Package.md); Annex AL; [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md); [Threat Register](./Threat_Register.md) T-006/T-020/T-021. |
| 3 | Essential Access delivery and appeals pilot | A right that cannot be delivered or appealed is only paper protection. | [Rights Layer](../public/05_rights_layer.md); this register; [Threat Register](./Threat_Register.md) T-002/T-007. |
| 4 | Service Record misuse red team | Civic eligibility fails if employers, landlords, schools, vendors, platforms, or insiders turn it into rank or employability. | [Service Record Misuse Evidence Test Package](./Service_Record_Misuse_Evidence_Test_Package.md); [Threat Register](./Threat_Register.md) T-004/T-008/T-009; Annex Z; Annex AJ; Annex AS. |
| 5 | Flow, demurrage, and public-rail simulation | The economic rail must fund operations without distorting ordinary life or creating capture exemptions. | [Demurrage Evidence and Test Package](./Demurrage_Evidence_Test_Package.md); Annexes X, J, AR; [Patch Log](./Patch_Log.md) P-023/P-030. |
| 6 | Public banking cost and access model | Public banking must be operationally sustainable without predatory fees or digital exclusion. | [SPECIFICATIONS](../constitution/SPECIFICATIONS.md); [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md). |
| 7 | Anti-rent legal wrapper review | Trusts, beneficial ownership, land rights, and business control are likely elite workaround paths. | Annex J; [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md); [Threat Register](./Threat_Register.md). |
| 8 | Public usability testing | Skeptical ordinary readers need to understand the system without policy or technical background. | [Public Overview](../public/01_overview.md); [FAQ](../public/02_faq.md); [Readiness Guide](../public/03_readiness.md). |
| 9 | External red-team audit | The project needs hostile review from people who do not share its assumptions. | [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md); [Threat Register](./Threat_Register.md); [Patch Log](./Patch_Log.md). |
| 10 | Founding legitimacy dossier | A constitution can be technically elegant and still be illegitimate if the founding process is self-interested or coercive. | [Founding Legitimacy Dossier](./Founding_Legitimacy_Dossier.md); [Founding Order](../../founding/order/README.md); Annex AH; [Acceptance Protocol](../constitution/Acceptance_Protocol.md). |
| 11 | Implementation drift audit | Tier 1 protections fail if deployed code, config, keys, or generated artifacts drift from the protected document set. | [Implementation Drift Audit Package](./Implementation_Drift_Audit_Package.md); [Capture Dashboard Specification](./Capture_Dashboard_Specification.md). |
| 12 | Essential-sector conglomerate refusal drill | Oil, energy, medicine, logistics, and PBM-style intermediaries may rationally resist a system that removes scarcity leverage and rule-conversion power. | [Essential-Sector Refusal Test Package](./Essential_Sector_Refusal_Test_Package.md); [Conglomerate Transition Dossier](./Conglomerate_Transition_Dossier.md); Annex AT; [Capture Dashboard Specification](./Capture_Dashboard_Specification.md); [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md). |

---

## Evidence Update and Claim Downgrade Protocol

**When evidence arrives (positive):**

1. The Independent Identity Auditor (P-045 §8) or relevant pilot lead publishes raw results with methodology.
2. Within 30 days, update the following documents in this order: (a) the relevant Evidence Test Package (primary source), (b) the Threat Register entry for the relevant threat (residual-risk update), (c) this register's claim row (status upgrade if pass conditions met), (d) the Pilot Evidence Roadmap (phase advancement gate update).
3. Status may only advance one level per update cycle: needs evidence → partly tested → evidence-backed. No skipping.
4. The four-document update must be made in a single git commit with a commit message that names the claim, the evidence source, and the new status.

**When evidence arrives (negative — pilot fails a gate):**

1. The failure is published within 14 days of determination, with the specific gate criterion that failed and the measured value vs. the pass condition.
2. Within 30 days, downgrade the claim status in this register. A claim that was "partly tested" reverts to "needs evidence" if the test fails. A claim that was "designed mechanism" and fails a gate reverts to "unresolved prerequisite" if the failure reveals a design problem, not merely an execution gap.
3. The Threat Register entry for the relevant threat must be updated with the failure finding as a new residual-risk line within 30 days.
4. No scale-up or claim strengthening may proceed in any document while a downgrade is pending.

**Trigger — who initiates updates:**

- Primary trigger: the Independent Identity Auditor (for identity claims), the Capture Dashboard operator (for measurement claims), or the relevant pilot lead (for delivery claims).
- Secondary trigger: any registered participant in the Formal Acceptance Process may file a claim challenge if they have evidence that a claim's status is inaccurate. The FAP must acknowledge the challenge within 14 days and resolve it within 60 days.
- Tertiary trigger: the Federated Ombuds Plenum may initiate a claim review if the Capture Dashboard shows metrics inconsistent with a current claim status.

**Downgrade escalation:** If a Critical-severity claim (per the Threat Register severity column) is downgraded from "active-unproven control" or higher, the Federated Ombuds must be notified within 24 hours. The downgrade is published prominently in the next Capture Dashboard update.

**Claim freeze rule:** Any claim that has been downgraded may not be re-upgraded until the specific gate or test that triggered the downgrade has been re-run with passing results. Upgrading a different claim in the same document does not reset a frozen claim.

---

## How to use this register

When editing public-facing or governance material:

1. Match each major claim to a row in this register.
2. Use status-accurate language: `moral commitment`, `designed mechanism`, `active-unproven control`, `partly tested`, `needs evidence`, or `unresolved prerequisite`.
3. Avoid deployment language unless the mechanism has pilot or implementation proof.
4. If a new claim does not fit this register, either add it here or soften the claim.
5. When evidence arrives, update the claim, the relevant threat entry, the relevant patch or annex, and the Pilot Evidence Roadmap together.
6. When an outside source is used, record it in the External Evidence Register with both its relevance and its limits.

## Claim Integrity Checklist

Before strengthening any public or governance claim, ask:

- Is this sentence a value claim, mechanism claim, risk claim, or evidence claim?
- Does it imply deployment success that has not been proven?
- Does it name the missing proof?
- Does it name the plausible failure mode?
- Does it say what would downgrade the claim?
- Does it preserve human dignity if the mechanism fails?

A claim that cannot answer these questions should be softened, moved to a hypothesis section, or added to this register with an honest status.
