# ANNEX AZ — Progressive Net-Worth Demurrage Architecture

> **Provenance:** Created 2026-05-11 as the controlling technical specification for progressive wealth demurrage under Article V. Implements the anti-hoarding function referenced in [ANNEX_X](./ANNEX_X.md) and anchored by [INV-008](../constitution/INVARIANTS.md#inv-008--money-creation-is-public).

---

**Plain-language purpose:** Define how holding costs on concentrated wealth scale with the degree of concentration — steeply enough to discourage multi-generational hoarding while permitting normal saving and productive investment.

**Who it protects:** Everyone whose access to land, labor markets, and commons is crowded out by wealth concentration that serves no productive purpose.

**What could go wrong:** A flat or too-gentle demurrage invites storage near the ceiling with minimal cost. A miscalibrated rate destroys productive enterprise capital alongside passive hoarding. This annex draws those boundaries explicitly.

**Evidence status:** Mathematical model designed; oracle-verification mechanisms and enforcement rails are active-unproven pending deployment.

---

## AZ1 — Constitutional Basis

Wealth demurrage is an Article V carrying-cost instrument. It is not a tax on income, labor, or survival. It is a recurring cost on the *stock* of net worth held above a defined participation buffer (S), applying progressive marginal rates across wealth tiers so that every bracket of excess net worth costs more than it earns in passive returns — making indefinite passive accumulation impossible at any level above S.

**S is not a survival floor.** Life access — food, shelter, healthcare, and Essential Access — is guaranteed unconditionally through the CSM and commons systems and is never purchased with Flow. S is a minimal participation buffer: a small protected stake that prevents demurrage from biting at trivial balances. Everything above S represents accumulated wealth, and holding it requires ongoing active contribution to offset the carrying cost. Wealth that is not continuously earned decays toward S.

Demurrage revenue routes to the commons pool in the same manner as land-use charges and gateway fees (see [ANNEX_X §X6](./ANNEX_X.md)).

---

## AZ2 — Definitions

| Symbol | Term | Value (Tier 2 founding commitment) |
| :----- | :--- | :--------------------------------- |
| **S** | Participation buffer floor | $50,000 (oracle-indexed to purchasing-power basket; reviewed annually) |
| **M\*** | Must-earn threshold | $1,000,000 NW — above this, demurrage exceeds expected capital returns at r; active income required to maintain wealth |
| **W\*** | Upper tier boundary | $22,000,000 NW — above this, the highest marginal rate (T4) applies; founding value, oracle-indexed |
| **r** | Expected return on capital | 7 % / yr (long-run real-asset benchmark; oracle-adjusted; used for return projection, not rate formula) |
| **E** | Taxable excess net worth | max(0, NW − S), where NW = consolidated net worth |
| **λ(E)** | Effective demurrage rate | D(E) / E — weighted average of marginal tier rates; see §AZ3 |
| **D(E)** | Annual demurrage charge | see §AZ3 |

**S and W\* are Tier 2 founding commitments.** They may be adjusted by oracle-indexed annual review within ±20 % of the founding value; any change beyond that band requires a Tier 2 amendment with full FAP process.

---

## AZ3 — Rate Function

Demurrage is computed by applying progressive marginal rates to successive brackets of excess net worth E = max(0, NW − S), collected bi-weekly (26 periods per year):

### Marginal rate schedule

| Tier | NW bracket | Marginal annual rate | Marginal bi-weekly rate |
| :--- | :--- | :--- | :--- |
| T1 | $50,000 – $1,000,000 | 26 % | 1.00 % |
| T2 | $1,000,000 – $5,000,000 | 20 % | 0.77 % |
| T3 | $5,000,000 – $22,000,000 | 30 % | 1.15 % |
| T4 | $22,000,000 + | 46 % | 1.77 % |

*Bi-weekly rate = annual rate ÷ 26. Annual rate is the canonical definition.*

### Annual demurrage formula

Let bracket caps in excess-E terms be:

```
e₁ = max(0, 1,000,000 − S)       ≈   950,000  at founding S
e₂ = max(0, 5,000,000 − S)       ≈ 4,950,000  at founding S
e₃ = max(0, 22,000,000 − S)      ≈ 21,950,000 at founding S

D(E) = 0.26 · min(E, e₁)
     + 0.20 · max(0, min(E, e₂) − e₁)
     + 0.30 · max(0, min(E, e₃) − e₂)
     + 0.46 · max(0, E − e₃)
```

Tier cap charges at founding S:

```
C₁ = 0.26 × 950,000   =    247,000   [T1 fully filled]
C₂ = C₁ + 0.20 × 4,000,000 = 1,047,000   [T1+T2 fully filled]
C₃ = C₂ + 0.30 × 17,000,000 = 6,147,000  [T1+T2+T3 fully filled]
```

**Anti-rentier design.** At every NW above S, annual demurrage exceeds expected capital returns at r = 7 %. At M\* ($1,000,000 NW), demurrage ($247,000) is 3.5 × expected returns ($70,000), making passive wealth maintenance impossible without active income. Wealth above S that is not continuously earned decays toward S.

### Illustrative schedule

| Consolidated net worth | Excess E | Effective rate λ | Annual demurrage D |
| :--- | :--- | :--- | :--- |
| $30,000 (below floor) | $0 | 0 % | $0 |
| $50,000 (floor) | $0 | 0 % | $0 |
| $100,000 | $50,000 | 26.0 % | $13,000 |
| $250,000 | $200,000 | 26.0 % | $52,000 |
| $500,000 | $450,000 | 26.0 % | $117,000 |
| $1,000,000 (M\*) | $950,000 | 26.0 % | $247,000 |
| $2,000,000 | $1,950,000 | 22.9 % | $447,000 |
| $5,000,000 | $4,950,000 | 21.2 % | $1,047,000 |
| $10,000,000 | $9,950,000 | 25.6 % | $2,547,000 |
| $22,000,000 (W\*) | $21,950,000 | 28.0 % | $6,147,000 |
| $30,000,000 | $29,950,000 | 32.8 % | $9,827,000 |
| $50,000,000 | $49,950,000 | 38.1 % | $19,027,000 |
| $100,000,000 | $99,950,000 | 42.1 % | $42,027,000 |
| $250,000,000 | $249,950,000 | 44.4 % | $111,027,000 |
| $500,000,000 | $499,950,000 | 45.2 % | $226,027,000 |
| $1,000,000,000 | $999,950,000 | 45.6 % | $456,027,000 |

At W\* ($22,000,000 NW) the effective rate is 28.0 % — four times the expected return on capital (r = 7 %). Wealth above W\* incurs the T4 marginal rate (46 %) on every additional dollar, ensuring concentrated holdings decay rapidly toward the upper tier boundary on a 3–10 year timescale rather than compounding across generations.

### Retirement modifier (age ≥ 65)

Holders who have reached age 65 qualify for a reduced carrying cost on Tiers 1 and 2, recognising a lifetime of active productive contribution. Tiers 3 and 4 are unchanged — wealth above $5,000,000 NW decays at full rate regardless of age.

| Tier | Working rate | Retirement rate (age ≥ 65) |
| :--- | :--- | :--- |
| T1 | 26 % | 18 % |
| T2 | 20 % | 14 % |
| T3 | 30 % | 30 % (unchanged) |
| T4 | 46 % | 46 % (unchanged) |

**Design intent.** A person retiring at 65 with $4,000,000 NW and $90,000 annual income sees their savings last approximately 18 years — reaching the participation floor around age 83. Life access and service-record retirement contributions cover essential needs thereafter. Retiring before 65 receives no adjustment; the system does not subsidise passive early withdrawal from productive life. (A person attempting to live off $5,000,000 passively at age 61 — still below the threshold — reaches floor in approximately 7 years.)

**Age verification.** Retirement status is attested annually to the oracle network. Biological age is confirmed via civil registry. Employment status is self-reported and subject to audit if productive-activity records are inconsistent.

![Demurrage Calculator](/images/V-014.png)

---

## AZ4 — Consolidated Beneficial Ownership

Net worth for demurrage purposes is **consolidated across all beneficial interests** held by a natural person:

1. **Direct holdings** — cash, deposits, financial instruments, real and personal property.
2. **Equity stakes** — proportional share of any enterprise, trust, fund, or partnership net assets attributed to the beneficial owner at the ownership percentage.
3. **Stewardship-use assets** — primary residence and working tools are **excluded** from net worth under this annex. A steward holds use-rights, not ownership equity, and use-rights do not accumulate as wealth.
4. **Aggregation rule** — holdings through nominees, irrevocable trusts, and shell structures are attributed to the ultimate beneficial owner. Where attribution is contested, the oracle mediation process in §AZ7 applies.

There is **no credit offset**. Debt is not subtracted from net worth for purposes of this annex. Leverage is a productive choice; it does not reduce the stock of assets under beneficial control.

---

## AZ5 — Corporate and Institutional Unassigned Balances

Demurrage applies to **unassigned cash balances** held by enterprises above a documented operating reserve, using the same tiered rate structure as personal demurrage (§AZ3):

```
U = max(0, liquid_assets − operating_budget)

D_corp(U) = 0.26 · min(U, 950,000)
           + 0.20 · max(0, min(U, 4,950,000) − 950,000)
           + 0.30 · max(0, min(U, 21,950,000) − 4,950,000)
           + 0.46 · max(0, U − 21,950,000)
```

**Operating budget** is the sum of: documented payroll obligations (12-month rolling), supplier and contractor commitments, capital expenditure plans filed with the governance registry, and a liquidity buffer not exceeding 90 days of the foregoing.

Rationale: productive capital deployed through payroll, R&D, infrastructure, or genuine business expenditure incurs no demurrage. The demurrage falls only on cash held idle in excess of operational needs — the precise condition that signals extraction rather than production.

Enterprise demurrage revenue routes to the commons pool alongside personal demurrage receipts.

---

## AZ6 — Exemptions and Safe Harbors

The following are explicitly excluded from demurrage:

| Category | Basis |
| :--- | :--- |
| Balances at or below S | Below-floor savings are protected by INV-009 |
| Primary residence use-rights | Stewardship model; not equity ownership |
| Working tools in active productive use | Same stewardship basis |
| CSM-tier Essential Access allocations | Protected unconditionally by [ANNEX_Y](./ANNEX_Y.md) |
| Commons pool and public institution reserves | Public assets serving the collective |
| Operating reserves within the §AZ5 budget cap | Legitimate enterprise liquidity |

---

## AZ7 — Oracle Verification and Enforcement

**Annual net-worth attestation:** Every natural person with disclosed holdings above S/2 submits a consolidated net-worth attestation to the oracle network at the close of each annual cycle. The attestation must identify all beneficial interests and the methodology used to value equity stakes.

**Audit triggers:** The oracle may initiate a verification audit when:
- A prior attestation shows growth of more than 40 % year-over-year without a matching productive-activity record;
- Anonymous third-party disclosure alleges nominee or shell-structure evasion;
- The governance registry flags a transfer pattern consistent with demurrage avoidance.

**Dispute and mediation:** Contested attributions proceed to the oracle mediation panel with a 60-day resolution window. Demurrage accrues during the dispute period at the most recently agreed figure; any retroactive adjustment is reconciled at resolution.

**Enforcement:** Unpaid demurrage accrues at the standard demurrage rate plus a 3 % annual penalty. Persistent non-compliance triggers asset seizure proceedings through the constitutional enforcement mechanism defined in Article V.

---

## AZ8 — Revenue Routing

All demurrage receipts — personal and corporate — are commons revenue and route as follows:

1. **Essential Access commons pool** — minimum 60 % of annual receipts, providing the primary funding stream for the CSM survival floor.
2. **Public infrastructure and R&D** — up to 30 %, allocated by the commons governance process.
3. **Oracle network operational reserve** — up to 10 %, covering verification, audit, and mediation costs.

The routing percentages are Tier 2 parameters, adjustable by the annual commons governance vote within the ranges above. Any reallocation that would reduce the EA commons pool below 60 % requires a Tier 2 amendment.

---

## AZ9 — Interaction with Other Instruments

| Instrument | Interaction |
| :--- | :--- |
| Succession transfers (INV-010) | Succession charges apply at death; demurrage applies to the living holding period. They are additive, not substitutable. |
| Land-use charges (ANNEX_X §X6) | Land-use charges apply to stewardship holdings and are not counted against the demurrage-exempt stewardship basis. Productive land in active use is not included in demurrage net worth. |
| Corporate gateway fees | Gateway fees are transaction costs; demurrage on unassigned balances is a stock cost. Both apply independently. |
| INV-009 (No fees on survival) | Demurrage never applies below S. No interaction. |
| Flow demurrage on circulating balances | Standard Flow demurrage applies to all circulating balances regardless of net worth. This annex adds a *net-worth* carrying cost on top, payable annually rather than continuously. They are independent instruments. |

---

## AZ10 — Amendment Constraints

The following parameters in this annex are **Tier 2 founding commitments** and may not be changed by oracle adjustment alone:

- S (participation buffer founding value)
- W\* (upper tier boundary founding value)
- The four marginal tier rates (26 %, 20 %, 30 %, 46 %) and their bracket boundaries
- The revenue-routing minimum for EA commons pool (60 %)
- The consolidated-ownership aggregation rule (§AZ4)
- The no-credit-offset rule (§AZ4)

Any proposal to weaken the consolidated ownership rule, introduce a credit offset, or raise S above purchasing-power parity must clear the full Tier 1 FAP process and is rejected at intake if it would functionally recreate dynastic wealth accumulation.

---

*This annex is the controlling specification for progressive net-worth demurrage. Where any summary language in ANNEX_X or the Humane Constitution conflicts with this annex, this annex governs on matters of rate calculation, consolidation methodology, and exemptions.*
