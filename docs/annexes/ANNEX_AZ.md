# ANNEX AZ — Progressive Net-Worth Demurrage Architecture

> **Provenance:** Created 2026-05-11 as the controlling technical specification for progressive wealth demurrage under Article V. Implements the anti-hoarding function referenced in [ANNEX_X](./ANNEX_X.md) and anchored by [INV-008](../constitution/INVARIANTS.md#inv-008--money-creation-is-public).

---

**Plain-language purpose:** Define how holding costs on concentrated wealth scale with the degree of concentration — steeply enough to discourage multi-generational hoarding while permitting normal saving and productive investment.

**Who it protects:** Everyone whose access to land, labor markets, and commons is crowded out by wealth concentration that serves no productive purpose.

**What could go wrong:** A flat or too-gentle demurrage invites storage near the ceiling with minimal cost. A miscalibrated rate destroys productive enterprise capital alongside passive hoarding. This annex draws those boundaries explicitly.

**Evidence status:** Mathematical model designed; oracle-verification mechanisms and enforcement rails are active-unproven pending deployment.

---

## AZ1 — Constitutional Basis

Wealth demurrage is an Article V carrying-cost instrument. It is not a tax on income, labor, or survival. It is a recurring cost on the *stock* of net worth held above a defined participation buffer (S), calibrated to approach a rate equal to the expected return on capital at the equilibrium ceiling — making indefinite passive accumulation economically neutral at the ceiling and increasingly costly above it.

**S is not a survival floor.** Life access — food, shelter, healthcare, and Essential Access — is guaranteed unconditionally through the CSM and commons systems and is never purchased with Flow. S is a minimal participation buffer: a small protected stake that prevents demurrage from biting at trivial balances. Everything above S represents luxury wealth accumulation, and holding it requires ongoing contribution sufficient to offset the carrying cost. Luxury wealth that is not continuously earned decays toward S.

Demurrage revenue routes to the commons pool in the same manner as land-use charges and gateway fees (see [ANNEX_X §X6](./ANNEX_X.md)).

---

## AZ2 — Definitions

| Symbol | Term | Value (Tier 2 founding commitment) |
| :----- | :--- | :--------------------------------- |
| **S** | Participation buffer floor | $50,000 (oracle-indexed to purchasing-power basket; reviewed annually) |
| **W\*** | Equilibrium wealth ceiling | $22,000,000 (oracle-indexed; reviewed annually) |
| **E\*** | Excess ceiling | W\* − S = $21,950,000 |
| **r** | Expected return on capital | 7 % / yr (long-run real-asset benchmark; oracle-adjusted) |
| **E** | Taxable excess net worth | max(0, NW − S), where NW = consolidated net worth |
| **λ(E)** | Instantaneous demurrage rate | see §AZ3 |
| **D(E)** | Annual demurrage charge | see §AZ3 |

**S and W\* are Tier 2 founding commitments.** They may be adjusted by oracle-indexed annual review within ±20 % of the founding value; any change beyond that band requires a Tier 2 amendment with full FAP process.

---

## AZ3 — Rate Function

The demurrage rate rises as a square-root power law of excess net worth, reaching exactly *r* at E = E\*:

```
λ(E) = r · √(E / E*)        [instantaneous annual rate as a fraction]

D(E) = λ(E) · E
     = r · √(E / E*) · E
     = r / √E* · E^(3/2)
     = (r / √E*) · E^1.5
```

Substituting the founding values:

```
D(E) = 0.07 / √21,950,000 · E^1.5
     ≈ 0.00001494 · E^1.5             [annual Flow units]
```

### Illustrative schedule

| Consolidated net worth | Excess E | Annual rate λ | Annual demurrage D |
| :--- | :--- | :--- | :--- |
| $30,000 (below floor) | $0 | 0 % | $0 |
| $50,000 (floor) | $0 | 0 % | $0 |
| $100,000 | $50,000 | 0.3 % | $167 |
| $250,000 | $200,000 | 0.7 % | $1,336 |
| $500,000 | $450,000 | 1.0 % | $4,510 |
| $1,000,000 | $950,000 | 1.5 % | $13,835 |
| $2,000,000 | $1,950,000 | 2.1 % | $40,685 |
| $5,000,000 | $4,950,000 | 3.3 % | $164,546 |
| $10,000,000 | $9,950,000 | 4.7 % | $468,938 |
| $15,000,000 | $14,950,000 | 5.8 % | $863,660 |
| $22,000,000 (W\*) | $21,950,000 | 7.0 % | $1,536,500 |
| $30,000,000 | $29,950,000 | 8.2 % | $2,448,928 |
| $50,000,000 | $49,950,000 | 10.6 % | $5,274,533 |
| $100,000,000 | $99,950,000 | 14.9 % | $14,929,834 |
| $250,000,000 | $249,950,000 | 23.6 % | $59,041,922 |
| $500,000,000 | $499,950,000 | 33.4 % | $167,020,830 |
| $1,000,000,000 | $999,950,000 | 47.2 % | $472,441,680 |

At W\* the rate equals r, so holding wealth at the ceiling costs approximately what it earns — making passive indefinite accumulation economically neutral rather than attractive.

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

Demurrage applies to **unassigned cash balances** held by enterprises above a documented operating reserve:

```
U = max(0, liquid_assets − operating_budget)

D_corp(U) = (r / √E*) · U^1.5
           ≈ 0.00001494 · U^1.5           [annual Flow units]
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

- S (household savings floor founding value)
- W\* (equilibrium wealth ceiling founding value)
- The power-law exponent (3/2)
- The revenue-routing minimum for EA commons pool (60 %)
- The consolidated-ownership aggregation rule (§AZ4)
- The no-credit-offset rule (§AZ4)

Any proposal to weaken the consolidated ownership rule, introduce a credit offset, or raise S above purchasing-power parity must clear the full Tier 1 FAP process and is rejected at intake if it would functionally recreate dynastic wealth accumulation.

---

*This annex is the controlling specification for progressive net-worth demurrage. Where any summary language in ANNEX_X or the Humane Constitution conflicts with this annex, this annex governs on matters of rate calculation, consolidation methodology, and exemptions.*
