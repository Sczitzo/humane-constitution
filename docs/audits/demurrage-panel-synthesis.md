# Demurrage Panel Synthesis — Round 1

**Date:** 2026-05-18
**Status:** Working document — pre-annex design decisions
**Panel:** Monetary economist · Christian ethics / stewardship theology · Mechanism design · Distributive justice · Constitutional design

---

## Purpose

This synthesis captures the five specialists' Round 1 analysis of the proposed single-instrument progressive net-worth demurrage design. It identifies consensus, clarifies the key design tensions, and surfaces three residual questions that need a decision before the replacement annex can be drafted.

---

## What the Panel Agrees On (All 5 Specialists)

### 1. One instrument — the double-tax is indefensible

All five specialists agree: ANNEX_J's liquid-balance fee and ANNEX_AZ's net-worth fee applied simultaneously to the same assets is indefensible. It punishes the same holder twice for the same wealth. The replacement annex supersedes ANNEX_J §J2 entirely. No separate liquid-balance carrying cost survives.

### 2. Continuous decay is correct

Discrete annual attestation creates well-documented gaming behavior (French ISF: 30–40% base erosion through timing; Swedish and German wealth taxes: abolished partly due to attestation-date arbitrage). Continuous decay eliminates the timing game. The constitutional principle is: decay accrues continuously against the most recent oracle assessment. Oracle revaluation cadence (daily for liquid assets, quarterly for real property, annually for private equity) is delegated to a Technical Specifications Package, not inscribed in the annex.

**Key drafting principle:** An asset whose current value is unknown or under dispute is not an asset whose carrying cost is suspended. Obligation continues against the last known assessment, subject to retroactive correction when a new assessment is issued.

### 3. Specific rates are illustrative, not founding law

26%, 30%, 38%, 46% per year document the founding coalition's calibration intent. They are not Tier 2 constitutional commitments. What is Tier 2 is the structural skeleton: (a) the rate structure is progressive — each tier strictly exceeds the tier below it; (b) T1 must meet or exceed r (expected return on capital); (c) T4 must meet or exceed 2r; (d) no tier rate falls below zero. Specific rates are Tier 3 parameters, adjustable through a transparent public evidence review without a supermajority vote.

### 4. Regional floor is better than flat $50,000

A flat $50,000 national floor fails at both ends. In a high-cost metro, $50k in savings is 8–12 months of household consumption — an emergency fund, not idle wealth. In a rural low-cost area, $50k may be 24–36 months — closer to passive accumulation. The correct floor is **18 months × oracle-published regional median monthly consumption expenditure** for the holder's primary residence region, updated on the oracle's standard cycle. The specific number updates automatically with oracle data; the methodology is Tier 2.

*If regional oracle infrastructure is not ready at launch:* the flat $50,000 serves as the interim founding value, converting to regional-median calculation upon oracle readiness — without requiring a Tier 2 amendment for that specific conversion.

### 5. No-credit-offset is correct in principle — but needs a productive-assets clarification

Allowing full debt offset recreates the billionaire-leverage loophole (borrow against assets to report near-zero net worth; lender is a related entity). The rule must stand. However, four of five specialists flag the same hardship edge case: the farmer or small-business owner who borrowed to purchase productive assets they actively operate. Their gross estate may be large; their real equity is small; and the assets driving the gross number are already working tools in active use.

**The resolution (consensus of 4 specialists):** Keep the no-credit-offset rule. Add a narrow clarifying clause: *debt secured solely against assets already exempt from net-worth calculation under the working-tools / primary-residence exemptions does not create additional taxable net worth on those exempt assets.* This is not a general credit-offset; it is a targeted carve-out that says "we already exempted the asset; the matching debt doesn't generate a phantom taxable position." Passive leverage debt — borrowed to buy securities, investment real estate, or other non-exempt assets — receives no offset.

### 6. ANNEX_J §J3–J8 investment channels must be preserved

Project Escrow Accounts, Term Finance Pools, Public Infrastructure Windows, and Retirement Horizon Locks are not being eliminated. They are the productive-deployment destinations that give the velocity function its mechanism. These move from ANNEX_J into the new annex as demurrage-exempt channels, substantively unchanged. Their existence is Tier 2; their specific terms (notice periods, return ranges, roll conditions) are Tier 3.

### 7. 60%+ Essential Access revenue floor is correct

Demurrage revenue must route primarily to the commons. The 60% floor to Essential Access is the right direction. The panel (ethics specialist in particular) recommends a ratchet: as system infrastructure costs stabilize over time, the Essential Access floor rises on a defined schedule — not permanently capped at 60%.

---

## Strong Convergence (4 of 5 Specialists)

### Retirement modifier needs narrowing

The current modifier (T1: 26% → 18%, T2: 30% → 22% for age ≥ 65) is too broad. An age threshold alone creates estate-planning arbitrage: wealthy families transfer assets into the name of a 65+ member to access the lower rate. The rate reduction should apply only when the assessed wealth is the household's primary income source (no significant labor income above a threshold). T2 application should be reconsidered — a $1–5M estate at age 65 is comfortable retirement, not a vulnerable elder needing protection.

### Oracle governance must have independent oversight

Four specialists flag the oracle network as the single largest concentration of institutional power in the design. Who audits the oracle? Who resolves disputes without requiring the oracle's own approval? The anti-Babel principle from the Christ-centered review applies directly: a single oracle network with authority over beneficial ownership data and asset valuations across all holders is a power concentration that requires its own independent governance article. This is a gap in the current ANNEX_AZ design.

---

## Supporting Evidence Cited by the Panel

The following real-world examples were cited as supporting evidence — not as authority — across the five reviews:

| Example | What it supports |
|---|---|
| Wörgl experiment (1932) | Currency-level demurrage increases transaction velocity; evidence that carrying costs on idle money work in practice |
| French ISF (1989–2017) | Annual attestation caused 30–40% base erosion via timing games; abolished partly for this reason |
| Swedish förmögenhetsskatt (abolished 2007) | Family fragmentation and attestation gaming made the instrument dysfunctional |
| German Vermögensteuer (suspended 1997) | Same pattern; administrative complexity favored wealthy holders with compliance infrastructure |
| Norwegian wealth tax | Exempt-asset stuffing (real estate over-investment) emerged within 3–5 years of activation |
| Swiss Bäuerliches Bodenrecht | Explicit protection preventing forced liquidation of operating farmland; this design has no equivalent |
| Piketty r > g | Capital returns exceeding growth rates → indefinite concentration without corrective instrument |
| US Section 199A | Documentation burden fell asymmetrically on small operators; compliance costs consumed much of the benefit |
| Luke 12:15–21 (Rich Fool) | Demurrage literalizes what hoarded wealth does spiritually — it builds barns that don't need building |
| Matt 25:14–30 (Parable of Talents) | The master condemns burying wealth; continuous decay penalizes exactly this |
| Leviticus 25 (Jubilee) | Constitutional redistribution of productive capacity — not voluntary charity, structural law |
| James 5:1–3 | "Your gold and silver have corroded" — physical decay as moral metaphor; AZ makes it economic reality |

---

## The Three Residual Design Questions

These require a decision before the annex can be drafted. They are not resolvable by the panel alone — they involve design intent.

### Question A: How tight is the `r` anchor?

The constitutional design specialist recommends that T1's rate floor is set at r (expected return on capital), so the instrument is structurally anti-rentier regardless of calibration. But r is oracle-published, and it could drop. If r = 3% in a low-return environment, T1 could legally be set at 3% — nowhere near anti-rentier. 

**Decision needed:** Should r itself have a floor (e.g., T1 must always be ≥ 5%, even if oracle-published r drops below that) — or should the rate floor track r wherever it goes?

### Question B: How narrow is the retirement modifier?

**Option 1 (narrow — ethics + distributive justice preference):** Apply the modifier only to T1, only when assessed wealth is the holder's primary income source (no labor income above a threshold). T2 application is eliminated.

**Option 2 (moderate):** Apply the modifier to T1 and T2, but add a primary-income test. This retains the current tier coverage but removes the pure age-arbitrage.

**Option 3 (age-universal, current AZ):** Age ≥ 65 gets the reduced rate regardless of income source. Simplest administratively; most vulnerable to gaming.

### Question C: Jubilee tranche — include or not?

The ethics specialist recommends designating a portion of the commons pool (proposed: ≥10%) specifically for productive asset transfers — land, tools, enterprise equity — back toward households near or below S. The argument: Essential Access funding consumption is manna; this is Jubilee land return. The distinction is between survival access and restored productive standing.

This is a substantive expansion of the instrument's scope. It requires the commons pool governance to specify a separate use category. 

**Decision needed:** Include or defer to a separate instrument?

---

## Panel's Recommended Design — Summary

The instrument that emerges from this review is:

**A single, continuous, progressive net-worth demurrage.** One carrying-cost instrument only. Wealth above the regional consumption floor decays continuously at a progressive rate. Rates are calibration parameters, not founding law. The progressive structure is constitutional. Productive assets — primary residence, working tools, operating farms, investment channels in active deployment — are exempt. The decay revenue flows primarily (≥60%) to Essential Access commons. No separate liquid-balance fee. No annual attestation date to game.

This is ANNEX_AZ's architecture, corrected for:
- The double-tax (AZ9 eliminated)
- Annual attestation replaced by continuous decay
- Rates reclassified from Tier 2 founding law to Tier 3 calibration
- Floor shifted from flat $50k to regional consumption index
- Narrow productive-debt clarification added to no-credit-offset rule
- Investment channels explicitly relocated from ANNEX_J

---

*Three design decisions above (A, B, C) should be resolved before the replacement annex is drafted.*
