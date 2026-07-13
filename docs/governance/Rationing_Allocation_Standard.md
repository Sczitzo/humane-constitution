# Rationing Allocation Standard

**Status: `Designed`.** Companion instrument to [ANNEX_AQ](../annexes/ANNEX_AQ.md) and ANNEX_Y §Y3/§Y4 (introduced by P-082, PROPOSED — pilot-gated). This standard binds the two allocation questions the corpus left open: how shares are cut when verified capacity falls below aggregate survival need, and how indivisible scarce goods are allocated. It amends nothing in ANNEX_Y or ANNEX_AQ — the §Y1.1 locked minimums, the Conservative Hold machinery, the per-incident sunsets, and INV-005's manna-rule text are untouched; this standard supplies the mechanism the manna rule requires and the indivisible-goods rule that existed nowhere. Adopted under the same companion-instrument path as the [Essential Access Delivery Standard](./Essential_Access_Delivery_Standard.md), avoiding the ANNEX_Y amendment-path ambiguity.

## Plain-English purpose

Two situations were unwritten, and unwritten rules fail exactly when the stakes are highest:

1. **When there truly isn't enough for everyone's minimum.** The constitution says available capacity is shared "by equal share to need — the manna rule." But nothing defined *how* need shapes the shares. Left undefined, that sentence collapses under pressure into one of two failures: officials inventing triage on the spot (the emergency-power grab), or a flat percentage cut for everyone (an equal share of too-little is not equal survival — the pregnant woman and the laborer starve first on a flat cut).
2. **When the scarce thing cannot be divided.** One ventilator, ten claimants. The last dialysis slot. The single evacuation seat. No rule anywhere governed this — and absent a rule, the decision falls to in-crisis discretion, where favoritism, wealth, and the loudest voice re-enter at maximum stakes.

Both rules below share one principle: **every judgment is made in calm, before anyone knows who it will apply to; crisis-time leaves only arithmetic and the lot.**

## RAS-1 — Sub-CSM allocation: pro-rata of individual need (the manna rule, bound)

Applies only in ANNEX_Y §Y4 System Failure (verified capacity below aggregate CSM). During ordinary rationing and §Y3 substitution, §Y1.1's individually adjusted minimums govern unchanged — no new formula applies there.

- **Pro-rata of individual CSM.** Each present person's share is pro-rata of their own §Y1.1-adjusted individual CSM. The existing Tier-1-locked adjustments — pregnancy, lactation, age bands, heavy labor, pediatric formulations — carry through the cut automatically: the shortfall is borne in proportion to need-adjusted minimums, never flat per-capita.
- **Need tiers are defined in calm, frozen in crisis.** Clinical and disability need-tiers beyond §Y1.1 (dialysis-dependence, insulin-dependence, disability-related caloric or care needs) are pre-defined as Tier-2 commitments — categories, weights, and caps published in advance. **No authority may create, remove, or re-weight a tier during an active rationing or §Y4 state.**
- **Attestation before crisis; surge protocol for crisis-created need.** For divisible supplement tiers, need status is attribute-attested at the registry layer in calm, through the clinical-custodian path defined in the [Essential Access Delivery Standard](./Essential_Access_Delivery_Standard.md) §EADS-2 (ANNEX_AS staked attestation elsewhere). Crisis-created need — mass-casualty, epidemic — is met by **custodian batch-attestation against published clinical criteria**, with mandatory post-hoc Ombuds audit and retroactive slashing of false attestations: the newly injured are never excluded by the calm-time rule, and a false-claim flood is answered after the fact rather than by queuing the wounded.
- **Anti-inflation.** Calm-time tier prevalence is published on the Article VII dashboard with an anomaly trigger, and tiers re-verify on a published cadence — coordinated calm-time tier-acquisition becomes visible before it dilutes everyone's base.
- **Caps and floors.** Supplements are capped at a published multiple so weighting never zeroes anyone (INV-001) and never becomes a worth ranking (INV-003). Medical and mental-health stabilization remain NO-substitution per §Y3 — this clause allocates *divisible basket shortfall* and never touches the §Y1.4/§Y1.7 invariant floors while any capacity exists.

## RAS-2 — Indivisible goods: narrow bands, then the lot

Where a scarce good is indivisible:

- **Coarse triage bands, defined in calm** (Tier 2), assessed by the clinical custodian against published criteria. **Band criteria may use only the short-term likelihood that the specific intervention will succeed for this person** — never life expectancy, age (except as direct clinical evidence bearing on the intervention itself), disability status, quality-of-life judgments, resource-intensity or duration-of-use proxies, civic standing, contribution history, Flow holdings, or any INV-003-prohibited measure. Calm-time band definition requires disability-representative review; custodian band-assignment distributions are audited for demographic skew (Ombuds).
- **Within a band, a transparent lottery.** Band assignments are **committed and logged before randomness is revealed** — no nudging a favorite into a thinner pool. Randomness is dual-source (public beacon plus claimant entropy); results are non-transferable; every draw is logged in aggregate with small-cell suppression. Non-selected persons retain full divisible-floor rights and re-enter subsequent draws.

**Why the QALY bar is the moral center, not a footnote.** "Benefits decisively" and "palliative-only" bands are the exact language under which real-world crisis triage has deprioritized the disabled and the elderly. The panel struck that framing: judgment is confined to where judgment belongs — will this treatment work *now*, for *this* body — and chance replaces partiality everywhere else. A disabled or old person is never scored as "benefiting less" from a life they are already living.

## What this standard does not do

It does not alter the Conservative Hold, quorum-loss sensing, per-incident sunsets, the 45-day aggregate ceiling, §Y3 substitution (including medical NO-substitution), §Y4 honesty machinery, §Y1.1's locked adjusted minimums, or INV-005's manna-rule text. If any clause here were read to narrow the floor or extend a rationing state, ANNEX_Y and ANNEX_AQ govern.

## Linked risks

T-024 (rationing-state allocation under oracle stress — this standard supplies the allocation rule that state needs), T-018 (false-claim floods — answered by the surge protocol's post-hoc audit rather than in-crisis gatekeeping), T-014 (in-crisis discretionary triage as an emergency-power grab — foreclosed by the calm-time freeze), draft dependencies on the P-081 clinical custodian.

## Evidence status

`Designed` — no drill evidence. The P-082 package names the blocking evidence gates, including a full §Y4 allocation drill on synthetic population data, a band-assignment skew audit, and a committed-lottery integrity test.
