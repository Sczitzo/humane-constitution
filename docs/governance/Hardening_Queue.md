# Hardening Queue

This document is the live "what still needs pressure" list for the Humane Constitution.

It tracks conceptual and operational weaknesses that remain important even when a threat has a proposed patch or an active annex. A designed control is not the same thing as proof. A live queue item stays here until the project has evidence, activation, or a stronger residual-risk statement.

> Status labels in this document use shorthand codes. See [Claims_Evidence_Register.md](./Claims_Evidence_Register.md) for canonical definitions. The mapping is: DESIGNED → "Designed mechanism, needs evidence"; ACTIVE-UNPROVEN → "Active-unproven control"; ONGOING → context-dependent.

## Status key

| Status | Meaning |
|---|---|
| **OPEN** | The project names the problem but does not yet have an adequate mechanism. |
| **DESIGNED** | A mechanism exists in patches or annexes, but it is not active or tested. |
| **ACTIVE-UNPROVEN** | The control is integrated, but still needs simulation, pilot evidence, or audit results. |
| **ONGOING** | The risk can never be closed once and for all; it needs recurring tests. |
| **EVIDENCE-BACKED** | The control has passed a defined test or pilot and has a residual-risk statement. |

Do not use **CLOSED** for live system risks unless the item is evidence-backed or intentionally retired.

---

## Falsification Rule

Every live queue item should eventually name the result that would force the project to weaken, redesign, or abandon the related claim.

A strong hardening item does not only say what needs work. It says what would count against the design. Examples:

- an identity pilot excludes vulnerable people above the published false-exclusion threshold;
- a capacity dashboard is misunderstood by ordinary readers during a shortage drill;
- a Service Record red team shows employers or landlords can use civic status as rank;
- a demurrage model burdens ordinary liquidity more than concentrated idle capital;
- an essential-sector refusal drill cannot preserve the Constitutional Survival Minimum.

Until a queue item has a falsifying result, it remains a pressure target rather than a disciplined test.

---

## Macro pressure list

| Rank | Item | Collapse state guarded against | Status | Governing references | What still needs pressure |
|---|---|---|---|---|---|
| 1 | Identity without surveillance or exclusion | Survival-Trade Bind | **DESIGNED** | T-002, P-003, P-016, Annex P, Annex AK | Use the Identity and Recovery Evidence Test Package to pilot false exclusion, recovery delay, coercion, data exposure, vulnerable-population failure, and staff-discretion risk. |
| 2 | Real-capacity measurement | Survival-Trade Bind | **ACTIVE-UNPROVEN** | T-006, T-020, T-021, T-024, Annexes M, AL, AQ | Use the Capacity Measurement Evidence Test Package to test category definitions, oracle latency, direct sampling, standards capture, confidence bands, dashboard comprehension, activation/unwind symmetry, and oracle disagreement. |
| 3 | Contribution without coercive hierarchy | Static-Advantage Loop | **DESIGNED** | T-004, T-008, T-009, Annexes AC, AF, Z, AS | Use the Service Record Misuse Evidence Test Package to test non-civic misuse, contribution-category equity, attestation markets, hardship freeze abuse, public comprehension, and civic-pool concentration. |
| 4 | Anti-rent enforcement against legal wrappers | Power-Wealth Convergence; Static-Advantage Loop | **DESIGNED** | P-031, P-032, P-033, T-025, Annexes J, AR | Red-team trusts, family offices, beneficial ownership chains, land-control rights, and enterprise-control workarounds. |
| 5 | Founding legitimacy and consent | Power-Wealth Convergence; Static-Advantage Loop | **OPEN** | T-017, T-022, T-026, T-027, Founding Order, Annex AH, Founding Legitimacy Dossier | Two artifacts in the Founding Legitimacy Dossier remain at UNRESOLVED-PREREQUISITE status: "consent evidence" (the definition of what counts as genuine non-coercive consent has not been publicly committed) and "independent civil-society review" (who qualifies as civil society for Level 7 legitimacy review has not been defined). These are not production delays — they are definitional prerequisites that must be resolved before any production work can begin. Status is OPEN, not DESIGNED: the mechanism exists in theory but cannot be produced without resolving these definitions. |
| 6 | Bureaucratic complexity and institutional self-protection | Static-Advantage Loop; Power-Wealth Convergence | **ONGOING** | T-005, T-008, T-016, P-025, Annexes AI, AG, AV | Test whether review bodies protect people or protect themselves; measure ordinary-reader comprehension of authority paths. |
| 7 | Essential-sector conglomerate refusal and retaliation | Survival-Trade Bind; Power-Wealth Convergence | **ACTIVE-UNPROVEN** | Annex AT §AT6.6 (CASP), Annex AR, Conglomerate Transition Dossier, Essential-Sector Refusal Test Package, Capture Dashboard Specification | CASP pre-registration mechanism is ACTIVE (P-050). Run the largest-supplier exit, medicine/PBM refusal, and grid/logistics delay drills before any stronger claim that essential-sector hostage power is controlled. |
| 8 | Implementation drift and tamper evidence | Control-plane failure | **DESIGNED** | architecture files, INVARIANTS, Annex AV | Use the Implementation Drift Audit Package to test hash reproducibility, publication-channel divergence, startup refusal, key custody, timelock response, and supply-chain bypass. |

### Macro falsification hooks

| Rank | Falsifying result | Status consequence |
|---|---|---|
| 1 | Identity pilot exceeds the published false-exclusion, recovery-delay, coercion, data-exposure, or staff-discretion threshold for any vulnerable group. | Keep identity claims at **DESIGNED**; revise thresholds, recovery paths, or data-minimization controls before strengthening public claims. |
| 2 | Capacity drill produces stale, contradictory, captured, or misunderstood signals beyond the published tolerance. | Keep capacity controls **ACTIVE-UNPROVEN**; repair category definitions, oracle rules, or public dashboards before activation claims. |
| 3 | Service Record red team shows employers, landlords, schools, vendors, platforms, lenders, insurers, or attestation markets can convert civic status into rank. | Keep contribution controls **DESIGNED**; revise non-civic misuse barriers and equity tests before evidence-backed status. |
| 4 | Legal-wrapper red team preserves rent or control through trusts, beneficial ownership chains, land-control rights, or enterprise-control proxies. | Keep anti-rent enforcement **DESIGNED**; add wrapper-specific controls and rerun the red team before stronger claims. |
| 5 | Founding artifacts lack real public notice, objection/abstention evidence, exit rehearsal, consent evidence, conflict disclosure, or independent review. | Block activation-legitimacy claims; record the residual legitimacy risk in the founding evidence track. |
| 6 | Review bodies protect institutional discretion, confuse ordinary users, or show concentrated voting, staffing, or funding dependence. | Keep the item **ONGOING**; require corrective action before the governance cycle closes. |
| 7 | Largest-supplier, medicine/PBM, grid, or logistics refusal drill cannot preserve the Constitutional Survival Minimum before reserves or fallback capacity fail. | Block claims that essential-sector hostage power is controlled; revise reserves, fallback production, procurement, or trade-membrane design. |
| 8 | Hash, publication-channel, startup-refusal, key-custody, timelock, or supply-chain drill allows silent drift or bypass. | Treat the control plane as failed or **ACTIVE-UNPROVEN**; patch before launch or the next public release. |

---

## Resolution sequence

Use the [Threat Resolution Matrix](./Threat_Resolution_Matrix.md) as the threat-by-threat plan and the [Open Problems Resolution Docket](./Open_Problems_Resolution_Docket.md) as the source-backed closure checklist. The queue order is:

1. identity and measurement truth,
2. economic boundary integrity,
3. institutional anti-capture,
4. legitimacy, narrative, transition, and scale.

This order prevents downstream fixes from depending on unproven identity, measurement, or founding assumptions. In collapse-state terms, it tests the Survival-Trade Bind first because a survival floor that excludes people or misreads capacity can make every later anti-capture promise irrelevant.

---

## Micro pressure list

| Item | Status | Why it matters | Next refinement |
|---|---|---|---|
| Shadow convertibility above the ledger | **ACTIVE-UNPROVEN** | Non-convertibility fails if informal networks become scalable markets. | Test proxy redemption, queue trading, employer pressure, and household coercion without normalizing surveillance. |
| Semantic bureaucracy | **DESIGNED** | Definition control can itself become a freezing or capture mechanism. | Add review criteria for when protected terms should stay flexible versus locked. |
| PCRP false-trigger exhaustion at scale | **DESIGNED** | Emergency hesitation can harm people during real shocks. | Stress-test P-015 against simultaneous oracle failure, enforcement action, and public narrative attack. |
| Demand-context flag suppression | **ACTIVE-UNPROVEN** | A valid enforcement action can be weaponized to suppress emergency response. | P-052 / Annex AI §4.12 specifies the 4-criterion deliberate-manufacture standard. Test: does the timing-monitor false-positive rate stay below 5% under adversarial conditions? Does the Ombuds 24-hour window hold during compound crises? |
| Hostile successor government | **ACTIVE-UNPROVEN** | A legal government can hollow out the system without openly repealing it. | P-051 / Annex AM §AM8 specifies the CIP with constitutionally fixed funding and automatic hollowing triggers. Test: transition-of-power simulation, budget-starvation scenario, administrative-appointment-block test. |
| Pilot-to-scale validity gap | **DESIGNED** | Calm pilots can mislead the project into false confidence. | Require substitute evidence and red-team challenge when real stress cannot be ethically induced. |
| Shared Storehouse oracle failure | **ACTIVE-UNPROVEN** | Conservative hold can become normalized emergency administration. | Run a timed simulation of oracle blackout during active rationing with published reconciliation. |
| Contract-commitment parameters | **DESIGNED** | Loose parameters recreate hoarding; tight parameters block real infrastructure. | Use the Demurrage Evidence and Test Package before binding FC-160 through FC-184. |
| Federated Ombuds self-protection | **ACTIVE-UNPROVEN** | A five-node federation is stronger than one office but can still coordinate informally. | Track voting-pattern concentration, staffing overlap, and funding dependence. |
| Public claim discipline | **ONGOING** | The project loses credibility if public language outruns evidence. | Review public docs against the Claims and Evidence Register before every release. |
| Whistleblower retaliation via Service Record | **ACTIVE-UNPROVEN** | A reporter who files a community alert can have their Service Record downgraded by the named respondent before investigation completes. | ANNEX_AW, P-053, Article VII reporter-protection clause. Test: can a named respondent modify the reporter's records after filing? Can the Ombuds respond within the 45-day window? |
| Identity disclosure as safety vector | **ACTIVE-UNPROVEN** | Persons in documented safety situations cannot safely enroll under the standard identity-verification pathway. | ANNEX_AX, P-054, Article II safety-shielded enrollment clause. Test: can a survivor enroll without disclosing location? Is address-blind delivery operational? |
| Delivery gap between guarantee and operation | **ACTIVE-UNPROVEN** | Essential Access is constitutionally unconditional but not operationally universal; several populations lack a documented delivery path. | ANNEX_AY, P-055, Article IV delivery-sufficiency obligation. Test: Is the Delivery Sufficiency Register published and updated quarterly? Are the seven founding populations tracked with timelines and responsible parties? |
| Service Record non-civic misuse | **DESIGNED** | Civic eligibility becomes social credit if outside institutions use it as rank. | Test employment, housing, school, vendor, platform, lending, and insurance misuse before any public claim that Service Record is safe. |
| Parameter calibration | **DESIGNED** | A correct mechanism can fail through arbitrary numbers. | Keep high-risk FC values in the Parameter Calibration Register with evidence needs and revision triggers. |
| Capture dashboard gaming | **DESIGNED** | Metrics can be satisfied while power remains concentrated. | Test the Capture Dashboard Specification against threshold gaming, relabeling, and hidden network coordination. |
| Founding consent theater | **DESIGNED** | A founding vote can become legitimacy theater if people cannot understand, object, abstain, or exit. | Move every artifact-status row in the Founding Legitimacy Dossier from DESIGNED or NOT YET PRODUCED to PRODUCED before any public claim of legitimate activation. |
| Conglomerate compliant-path design | **DESIGNED** | Essential-sector firms need a profitable compliant path, but not a hostage path. | Use the Conglomerate Transition Dossier and Essential-Sector Refusal Test Package to model procurement margins, refusal survivability, reserve drawdown, fallback production, compliant-bidder independence, and lobbying/capture exposure. |

---

## Standing tests

| Test | Cadence | Governing reference | Minimum output |
|---|---|---|---|
| Compound interface simulation | Annual | Annexes AE and T | Public scenario, failure findings, patch recommendations, residual-risk update. |
| Narrative simulation | Annual | Annex AD | Hostile-frame test, response timing, public comprehension review. |
| Federated Ombuds dispersal certification | Pre-launch, then each governance cycle | Annex AI | Dispersal finding, conflicts, voting-pattern concentration, corrective actions. |
| Methodology-class review | Annual | Annex AL | Standards concentration, AI supply-chain concentration, direct-sampling coverage. |
| Pilot external validity gate | Before scale-up | Annex AN | Stress evidence, substitute evidence, challenge responses, no-rebrand failure rule. |
| Claims status review | Each public release | Claims and Evidence Register | Claims downgraded or strengthened based on evidence. |
| Evidence ladder review | Each claim-status change | Evidence Ladder | Claim level, missing proof, downgrade triggers, and affected docs. |
| Capture dashboard review | Quarterly | Capture Dashboard Specification | Concentration metrics, exceptions, dashboard gaming, and public summary. |
| Implementation drift drill | Pre-launch, then annual | Implementation Drift Audit Package | Hash reproducibility, startup refusal, channel divergence, key custody, and supply-chain results. |
| Founding legitimacy review | Before activation and after founding-stage handoff | Founding Legitimacy Dossier | Scope, conflicts, objection record, consent record, exit rehearsal, and sunset report. |
| Essential-sector refusal drill | Pre-launch, then annual by category | Conglomerate Transition Dossier; Essential-Sector Refusal Test Package; Annex AT | Largest-supplier exit simulation, reserve drawdown, compliant-bidder count, public fallback capacity, capture exposure, and residual-risk update. |

---

## Retired historical session notes

Earlier session queues remain historically useful, but their "closed by patch" language should be read as "a mitigation path was designed." The live status of each risk is governed by the tables above, the Threat Register, and the Claims and Evidence Register.
