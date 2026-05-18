# ANNEX D — Progressive Net-Worth Demurrage

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Single carrying-cost instrument on accumulated wealth above the participation floor. Wealth not continuously earned through active productive contribution decays toward the commons. Revenue funds essential access and productive asset restoration for households near the floor. |
> | **Who it protects** | Every participant — working savers, small operators, farmers, and caregivers are protected by the floor and exemptions; the public commons is protected by the decay function on idle concentrated wealth. |
> | **Failure risk** | Double taxation on the same asset base; discrete attestation dates enabling timing games; rates inscribed as founding law that cannot be recalibrated; floor set as a nominal figure that erodes in real terms; investment channel shelters becoming permanent exemptions from productive obligation. |
> | **Evidence status** | Active — unproven |
> | **Linked risks** | P-056; rentier accumulation; idle-wealth hoarding; commons underfunding; instrument stacking. |

---

## Plain-language summary

This annex governs the single fee the system charges on accumulated wealth. If you hold more than the participation floor — roughly 18 months of regional living costs — the excess decays continuously at a progressive rate. The more concentrated the wealth, the faster it decays. Wealth in active productive use is exempt. The decay revenue goes primarily to the essential access commons, with a portion reserved specifically for transferring productive assets — land, tools, enterprise equity — back toward households near the floor.

There is no separate fee on liquid balances. One instrument. One base. No stacking.

Real-world evidence cited in this annex — the Wörgl stamp-scrip experiment (1932), the WIR franc cooperative credit system, Piketty's analysis of capital return rates, and the French ISF wealth tax — is offered as supporting evidence for design choices, not as authority.

---

## D1 — Constitutional Basis and Purpose

**D1.1** Wealth above the participation floor (S) carries a cost. This is not a penalty on earning; it is a cost on accumulation beyond active need. Wealth actively deployed in productive contribution is exempt. Wealth that is idle — held as a store of social power rather than as a tool of productive work — decays continuously toward the commons.

**D1.2** The purpose of this instrument is threefold:
- (a) prevent rentier accumulation — the extraction of returns from passive ownership without active productive contribution;
- (b) fund the Essential Access commons pool, which provides universal basic needs; and
- (c) restore productive standing — not only consumption access — to households at or below the floor.

**D1.3** S is the participation floor, not the survival floor. The survival floor is a separate Tier 1 invariant guaranteed regardless of any participant's net-worth position or demurrage obligation.

---

## D2 — Definitions

**D2.1 Participation floor (S).** S = 18 months × oracle-published regional median monthly consumption expenditure for the holder's primary residence region, updated on the oracle's standard annual cycle.

During any period where the regional consumption oracle is not yet operational, S = $50,000 (founding bootstrap value). S converts automatically to the regional-median calculation upon oracle readiness; this conversion does not require a Tier 2 amendment. The methodology for the regional median calculation is a Tier 2 founding commitment.

**D2.2 Tier brackets.** The four demurrage tiers are:
- **T1:** net worth from S to M* (founding illustrative upper bound: S + $1,000,000)
- **T2:** net worth from M* to W* (founding illustrative upper bound: S + $22,000,000)
- **T3:** net worth from W* to W** (founding illustrative upper bound: S + $50,000,000)
- **T4:** net worth above W**

Bracket boundaries M*, W*, and W** are Tier 2 founding values. They may be adjusted by the oracle to maintain real-terms equivalence within a ±20% corridor without triggering the Founding Amendment Process; adjustments beyond that corridor require FAP.

**D2.3 Expected return on capital (r).** r is the oracle-published rolling 10-year median real return on actively deployed capital within the Flow jurisdiction, annualized. During any period where fewer than 10 years of Flow operational data exist, r = 3.0% real (bootstrap default). r is updated annually by the oracle panel. r may not be set below 1.5% real for purposes of the structural constraint in §D3.5, regardless of observed returns.

**D2.4 Annual decay rates (λ₁, λ₂, λ₃, λ₄).** The decay rate for each tier. The founding calibration values are:

| Tier | Bracket | Founding calibration rate |
|---|---|---|
| T1 | S to M* | 26% per year |
| T2 | M* to W* | 30% per year |
| T3 | W* to W** | 38% per year |
| T4 | Above W** | 46% per year |

These calibration values are not founding law. They document design intent and serve as the baseline for the first published rate schedule. See §D3.5 and §D11 for tier classification and amendment constraints.

**D2.5 Retirement modifier (λ₁ᴿ).** The modified T1 rate applicable to qualifying holders under §D10.1. Founding calibration value: 18% per year. Subject to the same Tier 3 review process as λ₁.

**D2.6 Assessed net worth (W).** The oracle-verified consolidated beneficial ownership value of all assets held by a participant, aggregated across all legal forms, trusts, and controlled entities, less no credit offset except as specified in §D4.3.

---

## D3 — Progressive Rate Schedule

**D3.1** Demurrage accrues continuously on each bracket of assessed net worth above S at the applicable annual rate. For a holder whose assessed net worth is W, the annual gross demurrage obligation D is:

> D = λ₁ · min(W − S, M* − S) + λ₂ · min(max(W − M*, 0), W* − M*) + λ₃ · min(max(W − W*, 0), W** − W*) + λ₄ · max(W − W**, 0)

Demurrage accrues daily (or at the settlement cadence specified in the Technical Specifications Package) against the most recent oracle-assessed net worth. No discrete annual payment date exists.

**D3.2** Demurrage is settled by the holder through any combination of: Flow currency transfer to the commons settlement address; in-kind contribution of non-exempt assets at oracle-assessed value; or enrollment of assets in an approved investment channel under §D6.3–D6.7.

**D3.3 Worked formula.** Let E = W − S (net worth in excess of the participation floor). Let bracket widths at founding S = $50,000 be:

```
e₁ = M* − S  =   $950,000   (T1 bracket width)
e₂ = W* − S  = $21,950,000  (T1 + T2 combined)
e₃ = W** − S = $49,950,000  (T1 + T2 + T3 combined)

D(E) = λ₁ · min(E, e₁)
     + λ₂ · max(0, min(E, e₂) − e₁)
     + λ₃ · max(0, min(E, e₃) − e₂)
     + λ₄ · max(0, E − e₃)
```

At founding calibration rates (λ₁ = 26%, λ₂ = 30%, λ₃ = 38%, λ₄ = 46%), tier cap charges are:

```
C₁ = 0.26 × 950,000                       =   $247,000   [T1 fully filled at M*]
C₂ = C₁ + 0.30 × 21,000,000               = $6,547,000   [T1+T2 fully filled at W*]
C₃ = C₂ + 0.38 × 28,000,000               = $17,187,000  [T1+T2+T3 fully filled at W**]
```

**Anti-rentier check.** At M* ($1,000,000 NW), annual demurrage at founding calibration rates ($247,000) is approximately 3.5× expected passive capital returns at r = 7% ($70,000), making passive wealth maintenance above the floor impossible without active productive contribution. The instrument is intentionally calibrated so that continuous earning is required to sustain any position above S.

**D3.4 Illustrative schedule.** At founding calibration rates and bootstrap S = $50,000:

| Consolidated net worth | Excess E | Effective rate | Annual demurrage |
| :--- | :--- | :--- | :--- |
| $30,000 (below floor) | $0 | 0% | $0 |
| $50,000 (floor, S) | $0 | 0% | $0 |
| $100,000 | $50,000 | 26.0% | $13,000 |
| $250,000 | $200,000 | 26.0% | $52,000 |
| $500,000 | $450,000 | 26.0% | $117,000 |
| $1,000,000 (M*) | $950,000 | 24.7% | $247,000 |
| $2,000,000 | $1,950,000 | 27.4% | $547,000 |
| $5,000,000 | $4,950,000 | 28.9% | $1,447,000 |
| $10,000,000 | $9,950,000 | 29.5% | $2,947,000 |
| $22,000,000 (W*) | $21,950,000 | 29.8% | $6,547,000 |
| $30,000,000 | $29,950,000 | 32.0% | $9,587,000 |
| $50,000,000 (W**) | $49,950,000 | 34.4% | $17,187,000 |
| $100,000,000 | $99,950,000 | 40.2% | $40,187,000 |
| $250,000,000 | $249,950,000 | 43.7% | $109,187,000 |
| $1,000,000,000 | $999,950,000 | 45.4% | $454,187,000 |

Effective rate = D / NW. It rises continuously as net worth increases. The schedule is illustrative; actual charges use oracle-assessed values and current Tier 3 rates. Rates marked as founding calibration (λ₁–λ₄) are subject to Tier 3 review and may change.

**D3.5 Structural constraints on rates (Tier 2).** The rate review process under §D11.3 may adjust λ₁–λ₄ within the following structural constraints, which are Tier 2 founding commitments and cannot be changed without the Founding Amendment Process:

- (a) λ₁ must be set no lower than r as defined in §D2.3;
- (b) λ₄ must be set no lower than 2r;
- (c) each tier rate must strictly exceed every tier below it: λ₄ > λ₃ > λ₂ > λ₁;
- (d) no tier rate may be set below zero;
- (e) the progressive structure — four tiers, each higher than the last — may not be collapsed into fewer tiers by the rate review process.

No rate revision enacted through the Tier 3 review process may cause any structural constraint above to be violated, regardless of procedural compliance.

---

## D4 — Consolidated Beneficial Ownership and Asset Treatment

**D4.1 Consolidation rule.** Assessed net worth aggregates all assets under a participant's beneficial ownership or control, regardless of the legal form in which they are held — personal accounts, trusts, partnerships, corporations, foundations, nominee arrangements, or any other structure. Where a participant controls the disposition of an asset, directly or indirectly, that asset is included in assessed net worth.

**D4.2 No-credit-offset rule.** Debt does not reduce assessed net worth. A participant with $1,000,000 in assets and $900,000 in debt holds $1,000,000 in assets under beneficial control. The fact that a prior claim exists on those assets does not reduce the participant's position in the productive and social economy. Allowing debt offset recreates the leveraged-avoidance architecture this instrument is designed to prevent. [Supporting evidence: French ISF, which allowed debt offset, generated systematic use of related-party debt structures to suppress reported net worth.]

**D4.3 Clarifying exception.** Debt secured solely and exclusively against assets already exempt from net-worth calculation under §D6.1 or §D6.2 does not create additional taxable net worth on those exempt assets. This exception is narrow: it applies only where (a) the debt instrument names only already-exempt assets as collateral, and (b) the debt principal does not exceed the oracle-assessed value of those exempt assets. Debt secured against non-exempt assets — investment portfolios, passive real estate, financial instruments — receives no offset.

**D4.4 Co-resident household aggregation.** For the floor calculation only, co-resident immediate family members may elect to pool their individual net-worth positions into a single household assessment, with S applied at the household level. A household that elects pooling has its combined assessed net worth assessed against a single S, adjusted by the household multiplier defined in the Technical Specifications Package (not less than 1.5× S for households of two or more).

---

## D5 — Corporate and Enterprise Demurrage

**D5.1** Legal entities in which one or more participants hold a combined controlling interest are subject to entity-level demurrage on unassigned cash and financial assets above the documented operating reserve.

**D5.2 Operating reserve exemption.** Cash and liquid assets held by an entity are exempt from entity-level demurrage up to the entity's documented operating reserve — defined as 90 days of average operating obligations, calculated from trailing 12-month actual expenditure. Reserves in excess of this threshold are subject to entity-level demurrage at λ₁ rates.

**D5.3 Small-operator safe harbor.** An entity with gross annual revenue below the small-operator threshold (founding calibration: $2,000,000 per year, Tier 3 adjustable) is automatically exempt from entity-level demurrage on any cash balance below 12 months of trailing average monthly operating expenses. This safe harbor requires no formal attestation; it is self-executing. The safe harbor applies only to genuinely operating enterprises; dormant or holding entities with no active revenue do not qualify.

**D5.4** Entity-level demurrage collected under this section is independent of, and does not reduce, the individual demurrage obligation of the entity's beneficial owners on the value of their ownership interests.

---

## D6 — Exempt Assets and Investment Channels

### D6.1 Primary Residence

The oracle-assessed value of a participant's primary residence use-rights is excluded from assessed net worth. A participant may hold primary residence use-rights in only one property at a time for purposes of this exclusion. Rental properties, secondary residences, and investment real estate are not exempt.

### D6.2 Working Tools and Productive Assets

The following asset classes are excluded from assessed net worth when in active productive use:

- (a) Tools, equipment, and instruments that are the primary means of the holder's occupation or trade, assessed at replacement cost rather than market value;
- (b) Agricultural land and associated improvements in active cultivation by the holder or their direct household;
- (c) Business inventory held for active commercial sale within 90 days;
- (d) Active enterprise assets of an operating business in which the holder is a material participant, not a passive investor.

"Active use" requires documentary evidence at the oracle's standard cadence. Assets that were in active use and cease to qualify transition to assessed net worth on the first oracle cycle following loss of qualifying status.

### D6.3 Project Escrow Accounts

Funds deposited in oracle-registered Project Escrow Accounts for identified public-benefit projects are exempt from demurrage while on deposit. Projects must disburse capital to non-affiliated third-party recipients within the window specified in the Technical Specifications Package. If disbursement does not occur within that window, demurrage back-accrues from the deposit date.

### D6.4 Term Finance Pools

Funds enrolled in oracle-registered Term Finance Pools — instruments that provide medium-term productive credit to operating enterprises — are exempt from demurrage while enrolled, provided the pool demonstrates active lending activity. Idle-roll structures (where funds return to the originating beneficial owner without documented third-party deployment) trigger back-accrual from entry date.

### D6.5 Public Infrastructure Windows

Funds committed to oracle-registered Public Infrastructure Windows for infrastructure construction, maintenance, or expansion are exempt from demurrage for the duration of the commitment period specified at enrollment.

### D6.6 Retirement Horizon Locks

Funds enrolled in oracle-registered Retirement Horizon Locks — long-term instruments with a minimum lock period of 10 years, designed to fund eventual retirement consumption — are exempt from demurrage while locked. Early withdrawal outside documented hardship triggers demurrage back-accrual from the lock start date.

### D6.7 Aggregate Shelter Cap

Total assets sheltered across all investment channels (§D6.3–D6.6) may not exceed 80% of a participant's assessed net worth above S at any point in time. This cap prevents full shelter rotation — continuous recycling of all wealth through investment channels so that no demurrage ever accrues. The aggregate shelter cap is a Tier 2 structural constraint.

### D6.8 Essential Access Contributions

Direct contributions to the Essential Access commons pool are exempt from demurrage on the contributed amount. Contributions cannot be reversed or reclaimed.

---

## D7 — Continuous Decay Mechanics and Oracle Protocol

**D7.1 Principle of continuous decay.** Demurrage accrues continuously against every bracket of assessed net worth above S. Decay is a property of the stock, not of attestation events. No valuation gap, oracle delay, assessment dispute, or administrative process suspends the demurrage obligation.

**D7.2 Accrual against last known assessment.** Where a current oracle-verified value is unavailable for any asset or asset class — because the revaluation cadence has not yet triggered, because an assessment is under dispute, or because data is temporarily unavailable — demurrage accrues against the most recent published oracle assessment for that asset. The obligation is reconciled retroactively when a revised assessment is issued. An asset whose current value is unknown or contested is not an asset whose carrying cost is suspended.

**D7.3 Oracle revaluation cadence.** The Technical Specifications Package governs the cadence at which the oracle network issues updated valuations for each asset class. The TSP may be changed by the Tier 3 review process without altering this continuous-accrual principle. Founding guidance:

| Asset class | Founding cadence guidance |
|---|---|
| Liquid Flow balances and cash equivalents | Daily |
| Publicly traded financial instruments | Daily |
| Real property | Quarterly |
| Private equity and partnership interests | Annually, or upon any capital transaction exceeding 10% of last assessed value, whichever is sooner |
| Agricultural land in active use | Annually |
| Other illiquid assets | Annually |

**D7.4 Material event trigger.** Any capital transaction — sale, purchase, transfer, restructuring — that represents 10% or more of an asset's last oracle-assessed value is a material event requiring immediate revaluation. The transaction counterparty has a mandatory reporting obligation to the oracle network. Self-reporting alone is not sufficient.

**D7.5 Oracle governance.** The oracle network must be governed by an independent oversight body with: term-limited appointments; appeal mechanisms that do not require the oracle's own approval to initiate; explicit prohibition on using beneficial ownership data for any purpose outside demurrage assessment and dispute resolution; and published audit trails. Oracle governance details are specified in the Oracle Governance Protocol designated in the Technical Specifications Package. An oracle network without independent oversight does not satisfy this annex's requirements. This requirement is a Tier 2 commitment.

---

## D8 — Revenue Routing and Jubilee Directive

**D8.1 Essential Access floor.** No less than 60% of total demurrage revenue collected in each settlement period must route to the Essential Access commons pool. This floor is a Tier 2 founding commitment.

**D8.2 Jubilee directive.** Of the amount routed to the Essential Access commons pool, no less than 10% must be designated for productive asset restoration — the transfer of productive assets (land, tools, enterprise equity, vocational access) to households at or below S. Consumption access and productive restoration are different obligations. The governance of the productive restoration tranche is specified in the Essential Access governance instrument; that instrument may not eliminate the Jubilee directive without a Tier 2 amendment. [Supporting rationale: the biblical Jubilee year (Leviticus 25) restored productive standing — not only subsistence. The distinction between restoring means of consumption and restoring means of production is constitutionally material.]

**D8.3 Essential Access ratchet.** For every five consecutive years of operational stability (as defined in the Technical Specifications Package), the Essential Access floor rises by 5 percentage points, subject to a ceiling of 80%. The ratchet may not be reversed except by the Founding Amendment Process.

**D8.4 Infrastructure allocation.** Up to 30% of total demurrage revenue may be allocated to infrastructure — productive capacity construction, maintenance, and expansion that serves the commons. Infrastructure allocations must serve the Essential Access mission; funding the system's own administrative expansion is not a qualifying infrastructure allocation.

**D8.5 Oracle operations cap.** No more than 10% of total demurrage revenue may be allocated to oracle network operations and maintenance. This cap is a Tier 2 constraint.

**D8.6 Residual.** Any revenue not allocated under D8.1–D8.5 routes to the Essential Access commons pool by default.

---

## D9 — Single-Instrument Commitment

**D9.1** This annex is the sole carrying-cost instrument on accumulated wealth under this protocol. No instrument may be enacted that imposes a recurring charge, fee, decay rate, maintenance cost, or equivalent carrying burden on liquid Flow balances, cash-equivalent holdings, or any other component of net worth already subject to this annex's demurrage obligation — whether denominated as a monetary fee, a ledger deduction, a balance expiry, or any other mechanism whose economic effect is equivalent to a carrying cost on the same base.

**D9.2** This prohibition applies to instruments introduced by Tier 3 governance, federation regulation, regional ordinance, or technical specification. It may be modified only by a Tier 1 replacement of this section through the full Invariant Amendment Process.

**D9.3** The investment channel exemptions in §D6.3–D6.7 are not carrying costs. They are productive-deployment shelters that reduce the demurrage obligation; they do not impose an additional charge.

---

## D10 — Hardship and Retirement Modifiers

### D10.1 Retirement Modifier

A holder aged 65 or older who has no significant labor income may apply the retirement modifier to their T1 demurrage obligation. The retirement modifier reduces the applicable T1 rate from λ₁ to λ₁ᴿ (founding calibration: 18% per year).

**Qualifying conditions:** The modifier applies only where (a) the holder is aged 65 or older, and (b) the holder's labor income in the most recent 12 months does not exceed 1× the annual regional median consumption figure used to calculate S. The modifier does not apply to T2, T3, or T4 obligations.

### D10.2 Hardship Deferral

A participant experiencing a documented hardship transition — defined as involuntary exit from productive work due to serious illness, primary caregiving obligation for a dependent family member, or verified involuntary unemployment — may apply for temporary deferral of demurrage accrual.

**Terms:**
- (a) Maximum deferral: 24 cumulative months over the participant's lifetime.
- (b) Deferral is not forgiveness. Deferred demurrage accrues without additional interest and becomes due upon return to productive capacity or the end of the deferral window, whichever is sooner.
- (c) Re-certification is required every 6 months of active deferral. Failure to re-certify ends the deferral.
- (d) Participants within 2× S whose deferral applications are disputed are entitled to free representation through the dispute process.

---

## D11 — Tier Classification and Amendment Constraints

### Tier 1 — Invariant

- The principle that demurrage is the only carrying-cost instrument on accumulated wealth (§D9).
- The principle of continuous decay — decay is a property of the stock, not of attestation events (§D7.1).
- The no-credit-offset rule (§D4.2), including the narrow exception in §D4.3.

### Tier 2 — Founding Commitments (require Founding Amendment Process)

- The progressive rate structure and structural constraints (§D3.3).
- The participation floor methodology: S = 18 months × regional median consumption (§D2.1).
- Bracket boundary founding values (M*, W*, W**) and the ±20% oracle-adjustment corridor (§D2.2).
- The existence and basic terms of each investment channel (§D6.3–D6.7) and the aggregate shelter cap (§D6.7).
- The Essential Access revenue floor (60%) and Jubilee directive (10%) (§D8.1–D8.2).
- The Essential Access ratchet schedule (§D8.3).
- The oracle operations cap (§D8.5).
- The definition of r and the bootstrap default of 3.0% real (§D2.3).
- The consolidated beneficial ownership aggregation rule (§D4.1).
- The existence of the retirement modifier and hardship deferral (§D10); qualifying conditions are Tier 2; specific rates and durations are Tier 3.
- Oracle governance independence requirement (§D7.5).

### D11.3 Tier 3 — Rate Review Process

Specific decay rates (λ₁–λ₄, λ₁ᴿ), bracket boundaries within the ±20% corridor, investment channel terms, oracle revaluation cadence, small-operator safe-harbor thresholds, and the household pooling multiplier are Tier 3 parameters. They may be adjusted through the rate review process, which must include:

- (a) a prospective adverse-case simulation showing the effect of the proposed change on households at S, 2×S, and 10×S;
- (b) mandatory public evidence review with a minimum 60-day comment period;
- (c) a four-quarter sunset clause — the adjustment expires unless re-ratified at 12 months.

No rate revision may cause a Tier 2 structural constraint to be violated regardless of procedural compliance.

---

*Supporting evidence: Wörgl stamp-scrip experiment (1932–33) — evidence that carrying costs on idle money increase productive velocity; WIR franc cooperative credit network (est. 1934) — evidence of complementary currency stability over decades; French ISF (1989–2017) — evidence that credit-offset provisions enable systematic avoidance through related-party debt structures; Piketty, Capital in the Twenty-First Century (2013) — empirical basis for the r > g concentration dynamic this instrument addresses; Leviticus 25 Jubilee framework — basis for the productive restoration requirement in §D8.2; Luke 12:15–21 (Parable of the Rich Fool) and Matthew 25:14–30 (Parable of the Talents) — the theological coherence of continuous decay on hoarded wealth. None of these are cited as legal authority.*
