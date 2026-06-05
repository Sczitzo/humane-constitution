# A Minimal Pilot Proposal

*Status: Proposed — rough draft. Not yet reviewed, not yet formally incorporated into the corpus. Every number and timeline here is a starting estimate, not a commitment.*

---

> **What this document is**
> A concrete proposal for testing the protected lanes and layers of the Humane Constitution at the smallest useful scale. It is written for funders, researchers, and communities who want to know what "testing this" would actually look like — not in theory, but in practice.
>
> **What this document is not**
> A guarantee, a budget, or a finished plan. It is the first honest sketch of what a real pilot requires.

For the plain history-and-comparator guide behind these pilots, see [Real-World Examples](10_real_world_examples.md).

---

## The problem with designs that are never tested

Every mechanism in this project is either *Designed* or *Active — unproven*. That is the honest status. Something can be carefully designed, internally consistent, and still fail the moment it meets real people, real incentives, and real mistakes.

The only way to move from *designed* to *evidence-backed* is a real test. This document is about what that test looks like, and how small it can be while still generating useful evidence.

A pilot has one job: **find out what we got wrong before anyone depends on it.**

---

## The protected lanes, briefly

The Humane Constitution separates things most societies leave merged: survival, market participation, public return, emergency rationing, and political power. It uses protected lanes and layers to keep them separate:

1. **Essential Access** — a survival floor. Food, shelter, medicine, and water that every person receives regardless of their market position. Cannot be sold, traded, or revoked.
2. **Shared Storehouse** — rationing under real scarcity. When there genuinely is not enough of something essential, this system distributes it fairly instead of letting price decide who goes without.
3. **Flow** — the market currency. Ordinary spending, saving, wages, contracts, and business use happen here.
4. **Commons Return and Universal Stake** — public return from exclusive control of shared and scarcity-created value, distributed through a protected member stake.
5. **Voice** — bounded civic priority. A limited, expiring claim each person holds to weigh in on public decisions. Cannot be bought or stockpiled. Expires if unused.
6. **Service Record** — eligibility support for public roles. A rotating system that tracks service to shared governance, while preserving ordinary challenger and appeal routes where the corpus requires them.

The walls between these lanes — the fact that you cannot convert Essential Access into Flow, buy Voice with Flow, or turn Universal Stake into office or survival priority — are the core claim. The pilot tests whether those walls hold in practice.

---

## How to read the pilots below

Each pilot section covers:
- **The hypothesis** — the one falsifiable claim the pilot tests
- **Smallest deployment** — the minimum scale that generates real evidence
- **Rough cost** — order-of-magnitude only; full budgets require site-specific work
- **What we measure** — the metrics that tell us whether the hypothesis held
- **What failure looks like** — what would force us to say the mechanism does not work as designed
- **What success looks like** — what would justify moving to a larger test
- **Open questions** — what the pilot does not resolve

No pilot here is designed to be permanent. Every one of them is designed to fail informatively if the design is wrong.

---

## Pilot A — Essential Access + Shared Storehouse

*These two are designed together and should be tested together. Essential Access is the normal-state floor. Shared Storehouse is what happens when that floor comes under stress. Testing one without the other leaves the hardest question unanswered.*

> **Where this sits in the corpus**
> - The survival floor this pilot delivers is defined in [Annex Y](../annexes/ANNEX_Y.md) — the minimum the system may never cut.
> - The wall that stops Essential Access from being sold or brokered into market money is [Annex AB](../annexes/ANNEX_AB.md) (non-delegability).
> - The "is there genuinely a shortage?" question — capacity measurement and scarcity declaration — is governed by [Annex M](../annexes/ANNEX_M.md), with the oracle-failure fallback in [Annex AQ](../annexes/ANNEX_AQ.md) (threat T-024 / patch P-022).
> - This pilot corresponds to **Phase 3 (capacity measurement)** and **Phase 4 (Essential Access delivery)** of the [Pilot Evidence Roadmap](../governance/Pilot_Evidence_Roadmap.md), under the doctrine in [Annex Q](../annexes/ANNEX_Q.md). Scale-up is gated by [Annex AN](../annexes/ANNEX_AN.md) — a stress-free pilot does not earn a scale-up.

### What we're testing

The core claim of Essential Access is: **a guaranteed survival floor does not require a means test, does not create dependency traps, and does not collapse when participants try to game it.**

The core claim of Shared Storehouse is: **when there is genuinely not enough of something essential, a transparent rationing system distributes it more fairly than price, without black markets forming at the scale of a small community.**

Underneath both sits a third claim that this pilot is really built to test — the one a skeptic cares about most: **the wall holds.** A person cannot quietly turn their survival floor back into spendable market money, and a declared shortage cannot be manufactured to justify cutting people off. Most of this pilot's instrumentation is pointed at those two failure modes, because they are where the design either earns trust or loses it.

### The hypothesis

> A small community (150–300 people, voluntary participants) can operate a guaranteed essential-goods floor for 18 months. Participants will not lose access due to administrative failure. The floor will not be gamed into extinction. When a controlled, minor scarcity event is introduced, the Shared Storehouse mechanism will distribute goods fairly, the scarcity declaration will survive independent audit, and a black market will not emerge at meaningful scale.

### Non-negotiable pilot rules (inherited from the corpus)

Per the [Pilot Evidence Roadmap](../governance/Pilot_Evidence_Roadmap.md), this pilot is bound by rules it cannot waive for convenience:

- **No one's real survival is on the line.** The pilot allocation is *additive* — it sits on top of whatever benefits, income, or support a participant already has. No participant's existing food stamps, Medicaid, housing, or legal status is touched, reduced, or made contingent on the pilot. This is the line in [Annex Q](../annexes/ANNEX_Q.md): a pilot may not make a person depend on a floor that has not yet been proven.
- **Exit is rehearsed before anyone leans on it.** Before month 1, the pilot demonstrates that a participant can leave with no penalty and no loss of their pre-existing support. Exit is tested, not assumed.
- **Independent review is built in, not invited later.** An outside reviewer with the power to publish holds the data and signs off on the failure call.
- **A failed pilot is published as failed.** No rebranding. The public post-mortem is a precondition of funding, written into the grant.

### Smallest deployment

**150–300 voluntary adult participants** drawn from an existing community — a rural town, a housing cooperative, a university residential community, or an intentional community. Participants opt in; no one's existing benefits are affected. The pilot runs alongside their normal lives.

The essential goods covered in this pilot are limited to **food staples and basic medicines**. Shelter and water are explicitly excluded from this round — they carry infrastructure cost and legal exposure (eviction law, utility regulation) that belong in a later, larger pilot. Naming that exclusion up front is itself part of the honesty: this pilot tests the *easiest* survival goods to deliver, and a skeptic should read the results as a floor on plausibility, not a ceiling.

Participants receive a monthly allocation of essential goods, delivered through one of two channels tested in parallel cohorts:

- **Cohort 1 — direct goods.** Physical staples and pharmacy-filled prescriptions, delivered or picked up. Closest to the constitutional design; highest administrative cost.
- **Cohort 2 — restricted-purpose credit.** A closed-loop balance redeemable only for qualifying food and medicine at participating vendors, technically blocked from cash-out. Cheaper to run; directly stress-tests the non-delegability wall ([Annex AB](../annexes/ANNEX_AB.md)) — if the wall is going to leak, this is where it leaks first.

Running both is deliberate. The comparison tells us how much of the wall is enforced by *design* (Cohort 2's technical block) versus by *friction* (Cohort 1's physical goods), which is exactly the question scale-up depends on.

### The scarcity test (months 9–11)

This is the part of the pilot that no UBI study has run, and it is the reason Essential Access and Shared Storehouse are tested together rather than apart.

At month 9, **one category of goods** (e.g. a specific staple) has its delivered supply deliberately reduced by 30% for 8 weeks. Two things are tested at once:

1. **Can the shortage be declared honestly?** Before any rationing begins, the scarcity must be verified under the [Annex M](../annexes/ANNEX_M.md) standard — challengeable capacity data, not a single administrator's say-so — and the declaration is handed to the independent reviewer to attempt to *falsify*. The design's nightmare is a fake shortage used to justify cutting people off; this step tests whether the verification actually resists that.
2. **Does rationing beat price?** Once declared, the Shared Storehouse protocol distributes the reduced supply by the published rule, not by who can pay. We measure whether distribution matches the protocol, whether a black market forms, and — critically — whether the floor itself ([Annex Y](../annexes/ANNEX_Y.md)) is ever breached. Per [Annex AQ](../annexes/ANNEX_AQ.md), if the measurement system itself fails mid-event, the default is continuity, not deprivation; the pilot deliberately injects a measurement fault to see if that default holds.

Participants are told in advance the scarcity is a planned test. That weakens external realism — but a real involuntary shortage in a pilot would violate the no-survival-risk rule. We name this tradeoff rather than hiding it.

### Rough cost

| Item | Estimate |
|---|---|
| Essential goods allocation (150–300 people × 18 months, both cohorts) | $180,000–$540,000 |
| Independent review, monitoring, and scarcity-declaration audit | $70,000–$120,000 |
| Administration, identity verification, appeals, exit rehearsal | $50,000–$90,000 |
| Closed-loop credit infrastructure (Cohort 2) | $25,000–$60,000 |
| Data collection, control-group baseline, public post-mortem | $25,000–$50,000 |
| **Total** | **$350,000–$860,000** |

*Figures assume food staples plus basic medicines. Medication adds health-data, liability, and pharmacy-licensing complexity that requires site-specific legal and clinical review before a real number can be quoted.*

### What we measure

| Question | Metric | Target |
|---|---|---|
| Does the floor stay continuous? | % of participant-months with full allocation delivered | > 95% |
| Do process errors exclude people? | Admin-failure exclusion rate, and time-to-recovery | < 2%, recovered < 72h |
| **Does the EA→Flow wall hold?** | % of allocated value converted to cash/market exchange (by cohort) | < 5% |
| Can a shortage be declared honestly? | Independent reviewer's verdict on the scarcity declaration | Survives falsification audit |
| Does rationing beat price under scarcity? | Distribution conformance to protocol; demographic disparity in shortfall | Conforms; no unexplained bias |
| Does a black market form? | Estimated size of informal exchange vs. the shortage gap | < 20% of gap |
| Is the survival floor ever breached? | Instances any participant drops below the Annex Y floor | **Zero** |
| Does the floor change behavior? | Economic anxiety, food insecurity, healthcare avoidance vs. control/baseline | Measurable reduction |

The **zero-floor-breach** row is the one hard line. A breach of the Annex Y minimum is not a metric that can be traded off against the others — it is a stop condition.

### What failure looks like

The pilot has failed — and we say so publicly — if any of the following occur:

- More than 10% of participants lose access for more than one week due to administrative failure.
- More than 5% of allocated value is converted into market exchange in **either** cohort — the wall between Essential Access and Flow is leaking. (If only Cohort 1 leaks, the lesson is "design the technical block in." If Cohort 2 leaks too, the lesson is far more serious.)
- The scarcity declaration does not survive the reviewer's falsification audit — meaning a shortage *could* be manufactured to cut access. This is a design-level failure, not a tuning problem.
- The scarcity event produces a black market covering more than 20% of the shortage gap.
- Shared Storehouse distribution shows statistically significant demographic bias not explained by the protocol.
- **Any** breach of the Annex Y survival floor.

Failure is information. A failed pilot tells us which wall does not hold under real conditions. It is not a reason to stop — it is a reason to fix the specific mechanism before anyone is asked to depend on it.

### What success looks like

- Access continuity above 95% with zero floor breaches.
- Conversion below 5% in both cohorts — and meaningfully lower in Cohort 2, showing the technical block does work.
- A scarcity declaration that an adversarial reviewer could not fake or break.
- The shortage absorbed without a meaningful black market, with the floor intact throughout.
- A measurable reduction in economic anxiety against the control group.
- Independent reviewers able to replicate every finding from the published data.

Success at this scale justifies the next gate under [Annex AN](../annexes/ANNEX_AN.md): a 1,000+ participant pilot adding shelter, water, and an *unannounced* (genuinely involuntary, externally caused) scarcity event — the stress this pilot deliberately could not impose.

### Open questions this pilot does not resolve

- Does Essential Access hold when the stakes are higher — housing and water, not just food and medicine?
- Does the wall survive *organized, persistent* attack (a deliberate cash-out market run by motivated actors), not just opportunistic individual gaming?
- Does the scarcity verification hold under a *real* shortage, where the people declaring it are under genuine pressure rather than running a planned test?
- How does Essential Access interact with existing public benefits — does layering it on top create benefit-cliff or eligibility problems? This is a legal and political question, not a design question, and it varies by jurisdiction.

---

## Pilot B — Commons Return and Universal Stake (simulation pilot)

*A note on what this is not. This is not a local-currency pilot, not a fee on unused balances, and not a tax on ordinary household savings. Wörgl, WIR, BerkShares, and Gesell remain useful history about money design; Alaska-style public dividends and public wealth funds are closer comparators for the distribution side, but still not proof. None of them test the current instrument. This pilot tests the hard thing: can a community collect public return from shared and scarcity-created value, then distribute a protected Universal Stake, without punishing ordinary life or turning the system into surveillance and favoritism?*

> **Where this sits in the corpus**
> - The economic instrument is [Annex D](../annexes/ANNEX_D.md), now being rewritten around **Commons Return and Universal Stake**.
> - Flow issuance architecture remains [Annex X](../annexes/ANNEX_X.md), but Flow balances are not the object of this pilot.
> - This is the public-finance and distribution simulation for the [Pilot Evidence Roadmap](../governance/Pilot_Evidence_Roadmap.md). It stays a **simulation** until incidence, dignity, avoidance, distribution, and non-convertibility are transparent enough for independent review.

### What we're testing

The design lives or dies on seven empirical questions:

1. **Which source bases can be measured without overreach?** The candidate bases are land/location value, natural resources, spectrum/airspace, monopoly licenses, unavoidable platform or network rents, high-value public concessions, and large succession transfers.
2. **Who actually bears the cost?** The pilot must show incidence after rents, prices, wages, contracts, and investment behavior adjust. A charge written on one party can land on someone else.
3. **Can dignity survive administration?** Ordinary balances, tools, inventory, protected homes, and protected associations must stay protected without building a financial panopticon around every household.
4. **Can avoidance be contained?** The red-team tries valuation hiding, shell entities, trust wrappers, under-reported concessions, external-capital arbitrage, migration threats, and fake protected associations.
5. **Can eligibility and distribution rails work?** Universal Stake must reach every member through reliable rails, including people who are digitally fragile, displaced, elderly, undocumented in ordinary paperwork, or in dispute.
6. **Does non-convertibility hold?** Universal Stake must stay non-tradable, non-assignable, and non-garnishable. It cannot buy Voice, office, survival priority, membership, legal standing, or public favor.
7. **Does politics capture the dividend?** The pilot watches for targeted bonuses, exclusions, patronage, favored districts, "reward our supporters" rhetoric, and quiet manipulation of eligibility rules.

### The hypothesis

> Across 60–150 voluntary households plus a mapped sample of local assets and concessions, Commons Return source bases can be assessed with bounded error and limited data; ordinary household life can stay protected; a motivated red-team cannot cheaply hide or relocate the base; and a Universal Stake can be distributed universally without becoming tradable, garnishable, politically targeted, or convertible into civic power.

### Smallest deployment

**60–150 voluntary households plus a local asset/concession map**. The household group tests eligibility, dignity, distribution rails, and non-convertibility. The asset/concession map tests source bases: land/location value, public concessions, monopoly licenses, platform/network rents, natural-resource claims where present, and large succession-transfer scenarios modeled from anonymized estates.

This is a **simulation pilot**: no compulsory collection occurs. What is real is the data collection, valuation process, red-team attack, distribution test, appeals process, and public comprehension review. One arm should pair with Pilot A's Essential Access and Shared Storehouse work: a funder or volunteer pool seeds a small Universal Stake distribution and a shared reserve, so the pilot tests the economic instrument alongside the survival floor and shortage mechanism instead of pretending they are unrelated.

The pilot runs **12 months** and has four moving parts:

- **Source-base assessment.** Each candidate base is valued with a published method and an independent audit: land/location value separate from buildings, resource claims, licenses, concessions, platform/network rents, and succession transfers.
- **Protection screen.** Ordinary labor income, working balances, household tools, basic homes below protected thresholds, small-business operating reserves, and protected community, tribal, and church associations are excluded unless they are being used as avoidance shells.
- **Distribution test.** A simulated or funded Universal Stake is issued through rails that cannot be sold, assigned, garnished, pledged as collateral, or exchanged for civic status.
- **Red-team.** A paid adversarial team is given the rules and tasked with breaking them: hiding valuation, shifting ownership outside the jurisdiction, laundering value through protected associations, buying favor with the stake, manipulating eligibility, capturing appeals, or turning distribution into political patronage.

### Rough cost

| Item | Estimate |
|---|---|
| Source-base mapping and valuation audit | $70,000–$160,000 |
| Eligibility, distribution rails, and appeals prototype | $45,000–$110,000 |
| Adversarial red-team (avoidance, capture, valuation, non-convertibility) | $60,000–$130,000 |
| Incidence and external-capital mobility modeling | $40,000–$80,000 |
| Independent review, data minimization audit, public comprehension survey | $45,000–$90,000 |
| Optional funded Universal Stake / shared reserve arm | $40,000–$120,000 |
| **Total** | **$260,000–$570,000** |

*The optional funded arm is what turns an accounting exercise into a real distribution test. It should stay small and voluntary until the rules survive review.*

### What we measure

| Question | Metric | Target |
|---|---|---|
| Can source bases be measured? | Assessment completion rate; valuation error vs. independent audit | High completion; error within published bound |
| Who bears the cost? | Incidence by income, wealth, tenancy, business size, and protected status | Burden does not shift onto ordinary households |
| Does dignity hold? | Data fields required per participant; appeals burden; false inclusion/exclusion rate | Minimal data; usable appeals; low error |
| Do protections work? | Ordinary balances, tools, homes, reserves, and protected associations wrongly swept in | Rare; corrected quickly |
| Does avoidance work? | Red-team value hidden, moved, under-valued, or sheltered | Minimal; every route documented |
| Does external capital arbitrage work? | Modeled base erosion from migration, shell ownership, or capital flight | Bounded; triggers review if material |
| Does distribution reach everyone? | Successful Universal Stake delivery; time-to-recovery for failed delivery | High delivery; recovery within published window |
| Does non-convertibility hold? | Stake sold, assigned, garnished, pledged, or traded for civic/survival/legal advantage | Zero successful durable routes |
| Does politics capture it? | Targeted exclusions, bonuses, district favoritism, patronage patterns | None detectable; all allegations reviewable |
| Is it understood? | % of participants who can explain who pays, who receives, and what cannot be bought | Majority, after disclosure |

### What failure looks like

- **Incidence inverts** — renters, workers, ordinary savers, small operators, or protected associations bear the practical burden while rent-holders escape.
- **Dignity fails** — assessment requires broad personal surveillance, invasive household reporting, or unusable appeals.
- **Valuation hiding wins** — the red-team can cheaply understate land/location value, concessions, licenses, network rents, or succession transfers.
- **External-capital arbitrage wins** — ownership migrates on paper, local productive investment falls, or the base erodes faster than the public return can stabilize.
- **Eligibility becomes political** — membership, exclusions, bonuses, or appeals are steered toward favored people, factions, districts, donors, or allies.
- **Distribution rails fail** — digitally fragile or disputed members miss the stake, or recovery is slow enough to make universality false.
- **Non-convertibility fails** — the stake becomes tradable, assignable, garnishable, collateralizable, or useful for buying Voice, office, survival priority, membership, legal standing, or public favor.
- **Participants cannot explain the system** after full disclosure. If ordinary people cannot tell the difference between shared-value return and a tax on ordinary life, the political-economy claim fails regardless of the math.

The cautionary precedent here is not Wörgl being shut down by a central bank. It is the broader record of wealth and land-value taxes being undermined by assessment difficulty, capital flight, exemptions for friends, and public distrust. If the pilot reproduces those patterns at small scale, the design must answer them before any real collection is contemplated.

### What success looks like

- A clear source-base map with bounded valuation error.
- Incidence that stays away from ordinary households, working balances, tools, protected homes, and protected associations.
- A red-team that finds some routes, but no cheap and general route around the system.
- Universal Stake distribution that reaches members reliably, including edge cases.
- No successful conversion of Universal Stake into Voice, office, survival priority, membership, legal standing, or public favor.
- A public record clear enough that ordinary participants can explain who pays, who receives, and what is protected.

Success justifies the roadmap's next step: a larger simulation with real administrative data, real asset distributions, and external adversaries — still simulation-only until incidence, dignity, avoidance, distribution, and non-convertibility are proven under pressure.

### Open questions this pilot does not resolve

- Does source-base assessment survive contact with sophisticated wealth-holders and their advisors, rather than volunteers and modeled concessions?
- Can Commons Return be collected at useful scale without capital flight, under-building, under-maintenance, or jurisdiction-shopping eroding the base?
- What mix of proceeds should support Essential Access rails, Shared Storehouse reserves, Universal Stake, and any passive social wealth fund?
- What are the right protected thresholds for homes, tools, reserves, associations, and succession transfers?
- Can eligibility be universal without making membership itself buyable, inheritable, or politically manipulated?

---

## Pilot C — Voice (bounded civic priority)

*Voice is the most politically sensitive instrument. It is not a vote — it is a bounded, expiring claim to put one issue onto the table for a real hearing. The testable features are two: whether people use it on things that matter to them, and whether the inability to buy, stockpile, or accumulate it keeps it from hardening into a status score.*

> **Where this sits in the corpus**
> - Voice is defined in [Annex Z](../annexes/ANNEX_Z.md), whose core move is to **separate Voice from Service Record** so that "civic agenda influence and eligibility to serve cannot become one accumulative status score." That separation — not the token mechanics — is the thing this pilot most needs to prove.
> - The capture and hardening risks are threats T-004, T-008, T-009, T-011, patched by P-008, P-009, P-024 (see [Annex Z](../annexes/ANNEX_Z.md) and the [Provenance Map](../governance/Provenance_Map.md)).
> - The political failure mode the pilot must watch for — *people reading Voice as social credit* — is named directly in the Phase 1 comprehension track of the [Pilot Evidence Roadmap](../governance/Pilot_Evidence_Roadmap.md).

### What we're testing

Three claims, in order of how much a skeptic should doubt them:

1. **Voice is non-accumulative.** It expires. You cannot save it up, and you cannot hold more of it than your neighbor. The design's whole defense against a civic oligarchy is that influence does not compound. The pilot tests whether an expiring, equal, non-transferable claim *stays* equal under real social pressure — or whether informal markets, bloc-trading, and "lend me your Voice" arrangements quietly reconstitute accumulation.
2. **Voice does not become a status score.** Per [Annex Z](../annexes/ANNEX_Z.md), Voice must stay separate from any record of who has served or contributed. The pilot keeps the two ledgers physically separate and watches for leakage — does using (or not using) Voice start to read as a reputation signal?
3. **Voice changes who is heard.** The payoff claim: a bounded priority claim, handed equally to everyone, surfaces issues that the usual loud-voices process buries.

### The hypothesis

> In a community of 200–500 people making real shared decisions over four quarterly cycles, an equal, non-transferable, expiring Voice claim will (a) be used at meaningfully higher rates by normally-disengaged participants than the standard open-comment process; (b) show no correlation between Voice use and wealth, seniority, or institutional status; and (c) resist accumulation — successful transfers, bloc-trades, and stockpiling attempts stay negligible — without participants coming to treat Voice as a social-credit rank.

### Smallest deployment

**A housing cooperative, a small municipality, or a university residential community of 200–500 members** that makes genuine shared decisions (budget lines, facilities, policies) — the realism depends on the decisions actually mattering. A toy decision produces toy data.

Each participant receives **one Voice claim per quarter**. It is equal, non-transferable, cannot be bought or sold, and **expires at quarter's end if unused**. A participant spends it to elevate one issue into a guaranteed formal hearing — not to decide it. The community's normal process still makes the actual decision; Voice only controls what gets onto the agenda.

The pilot runs **four cycles (one year)** as an A/B/A/B design:

- **Cycles 1 & 3 (baseline):** the community's normal agenda-setting process.
- **Cycles 2 & 4 (Voice active):** Voice governs what reaches a hearing.

Alternating isolates what Voice changes from what the community would have done anyway. A separate, sealed ledger records contribution/service activity **without** linking it to Voice use — the deliberate test of the Annex Z separation.

A **red-team of participants** is openly invited to try to break the non-accumulation rule: pool their claims, trade them for favors, build a voting bloc. Every successful breach is a finding about how the wall fails in the wild, not a disqualification.

### Rough cost

| Item | Estimate |
|---|---|
| Voice allocation infrastructure (software or paper) + sealed-ledger separation | $15,000–$35,000 |
| Facilitation, process design, A/B cycle administration | $25,000–$50,000 |
| Independent review, data collection, comprehension survey | $35,000–$60,000 |
| **Total** | **$75,000–$145,000** |

### What we measure

| Question | Metric | Target |
|---|---|---|
| Does it reach the disengaged? | Voice-use rate among normally-inactive members vs. their baseline-cycle participation | Meaningfully higher |
| Is it equal? | Correlation of Voice use with wealth, seniority, status | None significant |
| Does it surface different issues? | Overlap between Voice-elevated agenda and baseline-cycle agenda | Substantially different |
| **Does non-accumulation hold?** | Successful transfers, bloc-trades, stockpiling attempts (red-team + organic) | Negligible; all routes documented |
| Does it stay separate from status? | Evidence Voice use is read as reputation; leakage between the two ledgers | None detectable |
| Is it understood, not feared? | % who can explain Voice correctly; % who mistake it for social credit | Majority correct; few misreads |
| Is it consequential? | Do Voice-elevated issues get genuine hearings with visible outcomes? | Yes, every cycle |

### What failure looks like

- Voice use is dominated by the same people who already dominate the standard process — the instrument is not redistributing who is heard.
- More than a negligible share of Voice claims are successfully transferred, pooled, or bloc-traded — the **non-accumulation wall is leaking**, which is the failure that matters most, because accumulation is exactly what Voice exists to prevent.
- Voice use starts functioning as a reputation signal, or the sealed contribution ledger visibly bleeds into civic standing — the [Annex Z](../annexes/ANNEX_Z.md) separation has failed.
- Participants consistently describe Voice as "social credit" or a loyalty score after disclosure — the political-economy read has gone wrong regardless of the mechanics.
- Voice feels performative: issues are elevated and then go nowhere.

### What success looks like

- Disengaged members use Voice at rates well above their baseline participation.
- No correlation between Voice use and wealth or status.
- The Voice agenda is visibly different from the loud-voices agenda.
- Accumulation attempts — including a motivated red-team's — mostly fail, and the few that work are specific and patchable.
- Participants describe Voice accurately and do not confuse it with a ranking system.

Success justifies a larger pilot where Voice governs higher-stakes, contested decisions and faces organized factional pressure — the condition under which accumulation incentives are strongest.

### Open questions this pilot does not resolve

- Does the non-accumulation wall survive **organized factional politics** at city or regional scale, where the incentive to corner Voice is far higher than in a cooperative?
- Does Voice scale without becoming a bureaucratic process that excludes people who can't navigate paperwork — re-creating the exclusion it was meant to remove?
- What is the right cycle length and claim frequency? Quarterly is a guess, not a finding.
- How does Voice interface with existing representative/legal governance? This varies by jurisdiction and is a political question, not a design one.

---

## Pilot D — Service Record (rotating public roles)

*Service Record is the hardest instrument to pilot and the one most likely to be misread. Unlike Voice, it is **allowed** to accumulate — it tracks who has contributed, and that record supports eligibility to serve. That is also its danger: an accumulating contribution record is one weak firewall away from becoming a social-credit hierarchy. The testable feature is whether rotating eligibility based on contribution can broaden who holds authority **without** the record monopolizing access, crowding out ordinary challenger routes, or leaking into market advantage, survival preference, or civic voice.*

> **Where this sits in the corpus**
> - Service Record is defined alongside Voice in [Annex Z](../annexes/ANNEX_Z.md) — and the central rule is the **firewall between them**: a contribution record may support eligibility to serve, but it may never convert into agenda-setting Voice, market advantage, survival-adjacent preference, or a closed civic priesthood.
> - The prohibited convertibility patterns — including **employer-sponsored contribution accumulation** and **side queues** — are enumerated in [Annex AJ](../annexes/ANNEX_AJ.md) (threat T-001 / patch P-001, shadow convertibility).
> - The two attacks the pilot must red-team are **elite-formation bypass** (T-008 / P-008) and **contribution fraud / attestation rings** (T-009 / P-009). Their defenses are attestation staking ([Annex AS](../annexes/ANNEX_AS.md)) and grace-exploitation closure ([Annex AF](../annexes/ANNEX_AF.md)).

### What we're testing

1. **Does contribution-supported eligibility broaden the pool?** The payoff claim — that eligibility informed by *showing up and contributing* surfaces a more diverse set of people for authority than self-nomination, election, or appointment alone, which reward wealth, free time, and willingness to campaign.
2. **Does the firewall hold?** Per [Annex Z](../annexes/ANNEX_Z.md) and [Annex AJ](../annexes/ANNEX_AJ.md), a high Service Record must buy you *nothing* except eligibility to serve — not a better spot in any queue, not market preference, not extra Voice. This is the wall the pilot exists to stress.
3. **Does it resist capture?** The named attacks are concrete: an employer farming contribution credit for its people, an attestation ring vouching for each other's fake contributions, a clique cycling fake-hardship pauses to preserve eligibility without contributing. The pilot pays a red-team to run all three.

### The hypothesis

> In a community with real rotating governance roles, over 24 months, contribution-supported eligibility — with peer attestation backed by stake and ordinary challenger routes preserved — will produce a measurably more diverse pool of role-holders than the prior selection method, with no decline in governance quality; and the Service Record will not become convertible: a motivated red-team's attempts to turn a high record into market advantage, queue preference, extra Voice, or captured eligibility (via employer farming, attestation rings, or fake-hardship pauses) will mostly fail and be detectable.

### Smallest deployment

**A nonprofit board, a cooperative, a homeowners' association, or a small municipal committee** with 3–7 rotating roles and 50–200 eligible members. Over 24 months, eligibility for each role is supported by a Service Record — a transparent log of contributions to shared governance (meeting attendance, completed tasks, dispute-resolution participation) — while at least one ordinary challenger, lived-experience, sortition, or appeal route remains open where the role requires it.

This is explicitly **not** about selecting the most qualified person. It is about ensuring the *eligible pool* is not pre-filtered by wealth, connection, or willingness to campaign. The community retains normal selection within the eligible pool.

Two design elements are tested, not assumed:

- **Attestation with stake ([Annex AS](../annexes/ANNEX_AS.md)).** Contributions are vouched for by peers who put a portion of their own civic standing at risk when they attest. A lightweight version of this is testable here, and it is the main defense against attestation rings.
- **The firewall ([Annex Z](../annexes/ANNEX_Z.md) / [AJ](../annexes/ANNEX_AJ.md)).** The Service Record ledger is kept strictly separate from Voice (Pilot C's sealed ledger, if co-located) and confers no benefit anywhere except role eligibility.

A **red-team of participants** is openly tasked with three jobs: farm contribution credit through an "employer" proxy, build an attestation ring, and cycle fake-hardship pauses to hold eligibility without contributing. Every success is a finding.

### Rough cost

| Item | Estimate |
|---|---|
| Service Record + attestation-staking system (ledger or software) | $15,000–$35,000 |
| Process design, facilitation, 24-month administration | $25,000–$50,000 |
| Adversarial red-team (capture / ring / fake-hardship testing) | $30,000–$60,000 |
| Independent review, data collection, comprehension survey | $35,000–$60,000 |
| **Total** | **$105,000–$205,000** |

### What we measure

| Question | Metric | Target |
|---|---|---|
| Does the pool broaden? | Diversity of the eligible pool (income, background, prior governance experience) vs. prior method | Measurably more diverse |
| Does service participation rise? | Contribution rate among previously-uninvolved members | Increases |
| Does the record change outcomes, or just the pool? | Who is actually selected from the eligible pool | Pool effect distinguishable from selection effect |
| Is governance quality preserved? | Decision quality, time-to-decision, conflict rate vs. baseline (independent review + satisfaction) | Maintained or improved |
| **Does the firewall hold?** | Red-team conversions of Service Record into market advantage, queue preference, or Voice | Negligible; every route documented |
| Do attestation rings survive staking? | Fake contributions that pass staked peer attestation | Minimal; staking detectably raises the cost |
| Is fake-hardship capture closed? | Eligibility preserved through pause-cycling without genuine contribution | Detected and bounded |
| Is it understood, not feared? | % who read Service Record as social credit after disclosure | Few |

### What failure looks like

- The eligible pool is no more diverse than self-nomination — the mechanism is not changing who can serve.
- Governance quality declines materially — diversity is coming at a real cost the design has to answer for.
- **The firewall leaks:** the red-team reliably turns a high Service Record into market advantage, queue preference, or extra Voice. This is the failure that matters most — it means Service Record has become the accumulative status score [Annex Z](../annexes/ANNEX_Z.md) exists to prevent.
- Attestation rings pass staked attestation cheaply, or employer-farmed contribution credit is undetectable — the [Annex AJ](../annexes/ANNEX_AJ.md) / [AS](../annexes/ANNEX_AS.md) defenses do not hold at this scale.
- Fake-hardship pause-cycling preserves elite eligibility without contribution ([Annex AF](../annexes/ANNEX_AF.md) failure).
- Participants describe Service Record as "social credit" after disclosure.

### What success looks like

- A demonstrably broader eligible pool, with governance quality held or improved.
- Participation rises when contribution visibly builds eligibility.
- The red-team's conversion attempts mostly fail; the successes are specific, named, and patchable.
- Staked attestation measurably raises the cost of fake contribution.
- Participants describe Service Record accurately and do not confuse eligibility with rank or reward.

Success justifies a larger pilot with higher-stakes roles and a genuinely adversarial capture environment — where the payoff for breaching the firewall is large enough to attract serious effort.

### Open questions this pilot does not resolve

- Does contribution-supported eligibility scale to **high-stakes roles** (judges, regulators) without producing governance failure or new capture incentives?
- Does the firewall survive when the reward for breaching it is large — a powerful employer or faction with real resources, not a volunteer red-team?
- How is the Service Record verified at population scale? A small ledger works here; the infrastructure for a city does not yet exist.
- **Note on a design constraint, not an open question:** whether contributing should *also* generate Voice priority is *not* open — [Annex Z](../annexes/ANNEX_Z.md) forbids it by design. The pilot tests whether that separation **holds in practice**, not whether to relax it.

---

## How the pilots connect

These are four separate pilots, not one. They can run independently, in different communities, at different times. But they are designed to eventually connect:

- **Essential Access + Shared Storehouse (Pilot A)** is the foundation. It answers: can we guarantee survival regardless of market position?
- **Commons Return + Universal Stake (Pilot B)** tests the proposed public-return and distribution lane. Commons Return may help fund Essential Access rails, Shared Storehouse reserves, Universal Stake, or a passive public wealth fund, but only if incidence, dignity, avoidance, distribution, and non-convertibility hold under pressure.
- **Voice (Pilot C)** governs the foundation. Who decides how Essential Access is calibrated, what counts as a shortage, and how Shared Storehouse distributes? Without Voice, someone with power decides — and that power concentrates.
- **Service Record (Pilot D)** determines who holds Voice-adjacent authority. Without rotation, the people who administer Essential Access and manage the Shared Storehouse tend to stay in place, and power concentrates again.

The walls between the lanes are only testable when the lanes exist alongside each other. The integrated test — life access, market exchange, public return, scarcity response, Voice, and Service Record in one community — is the large-scale pilot that these four smaller pilots are designed to make possible.

---

## What we would learn from all four pilots together

If all four pilots run and generate honest data, we would know:

1. Whether a guaranteed survival floor can operate without collapsing under gaming or administrative failure
2. Whether a rationing mechanism can distribute fairly under real scarcity without black markets forming
3. Whether Commons Return can be assessed on shared and scarcity-created value — sparing ordinary households, tools, homes, reserves, and protected associations — without avoidance, valuation hiding, external-capital arbitrage, or political capture
4. Whether bounded, non-transferable civic priority changes who actually has influence in public decisions
5. Whether rotating eligibility for governance roles produces more diverse leadership without degrading governance quality

We would not yet know whether the protected lanes work *together*, whether they scale beyond a few hundred people, or whether they survive sustained, organized attacks. Those questions require the large-scale pilot that is not described here.

---

## Honest limitations of this proposal

**We do not know if these pilots are legally possible in existing jurisdictions.** Some mechanisms — local currencies, alternative governance structures — require regulatory clearance that varies by location. Legal review is required before any pilot begins.

**We do not know the right parameters.** Commons Return source bases and rates, protected thresholds, Universal Stake cadence, Voice cycle length, and Service Record contribution weights are all design estimates. The pilots will calibrate them. The numbers in this document are starting points, not findings.

**We do not know who will run these pilots.** This proposal needs a partner — a community, an institution, or an organization willing to participate. Without a willing host, the pilots cannot happen.

**The pilots are not representative.** Early participants will be unusually motivated. Communities that volunteer to run these pilots are not typical communities. The results will be real but may not generalize. Generalizability requires a later, larger, and less self-selected test.

---

## What to do with this document

If you are a **researcher**, the open questions sections are the research agenda. Each one is a question the pilot cannot answer on its own.

If you are a **funder**, the four pilot budgets total roughly **$790,000–$1,780,000** for an 18–24 month program (Pilot A $350k–860k; Pilot B $260k–570k; Pilot C $75k–145k; Pilot D $105k–205k). That is a small number for the question being asked. For comparison, the Finland UBI pilot (2017–2018) cost approximately €20 million. The single most important pilot, and the place to start, is **Pilot A** — it tests the survival floor and the non-convertibility wall that the entire design rests on.

If you are a **community**, the smallest useful starting point is Pilot A — Essential Access + Shared Storehouse — because it tests the most fundamental claim: that a guaranteed survival floor is possible without collapsing under real conditions.

If you are a **skeptic**, the failure criteria are listed explicitly in each section. Any of them would force us to say publicly that the mechanism does not work as designed. That is the commitment this proposal makes.

---

*This document is a rough draft. It will be revised as the design is tested. Feedback, objections, and alternative framings are welcome. See [Start Here](00_start_here.md) for the full project overview and [Claims & Evidence](../governance/Claims_Evidence_Register.md) for the current status of each mechanism's evidence base.*
