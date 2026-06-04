# Flow Instrument — Panel Decision Record

**Status:** Proposed — design decision, not incorporated. SPECIFICATIONS, Annex X, and the constitution are unchanged. Outcome of an adversarial panel run under the [Instrument Evaluation Rubric](2026-06-03-instrument-evaluation-rubric.md).

**Problem:** Flow is the market/exchange money. Its job is to be *functional* exchange money (medium of exchange, store of value, unit of account) that (a) holds the walls/non-convertibility with the other four instruments, (b) does not let money-*creation* itself become a power, (c) funds the public rails, (d) stays usable and legible. Anti-wealth-concentration is handled separately by the wealth hybrid.

---

## Result in one line

The panel split the question into two layers everyone had been conflating — **who creates money** vs. **what form circulating money takes** — and they *compose*: a **sovereign/full-reserve creation base** + a **single plain Flow lane** on top. Every "clever money" design (directional lanes, programmable/CBDC, free-banking, circulation demurrage) **failed gates and was demoted to a bounded, dormant-by-default module.**

## Gate outcomes

| Design | Gates | Result |
|---|---|---|
| Sovereign / full-reserve money | conditional pass (G-4, G-6 need rule + timelock) | **Primary foundation** (creation layer) |
| Single plain Flow lane | cleanest sheet | **Primary form** (circulation layer) |
| Directional money-lanes | ❌ G-2, G-3, G-4, G-6 | Rejected as architecture; intuition salvaged |
| Programmable Flow (CBDC-rules) | ❌ G-3, G-4, G-6 | Rejected; static person-blind tags only |
| Free-banking / competing currencies | ❌ G-2, G-5 | Rejected; bounded complementary only |
| Circulation demurrage (Gesell) | ❌ G-2 (double-stack), G-6 risk | Rejected as standing; drawer tool only |

## Decision: the layered Flow architecture

- **Foundation — sovereign / full-reserve creation.** New Flow created only by the public authority against verified productive commitments; no private bank money-creation. Three binding conditions:
  1. The wall is on **creation, not circulation** — private/mutual intermediation of *existing* Flow stays legal, or the small-business credit channel chokes.
  2. Issuance bound by a hard, externally-audited rule + Tier-1 timelock (or it becomes the Babel power it was meant to prevent — G-4/G-6).
  3. An explicit shadow-banking perimeter, or near-money creation migrates and re-privatizes the lever.
- **Form — single plain lane.** Bearer/offline fallback, maximally legible, fails safe, best for the unbanked. **Not** programmable-behavioral.
- **Minimal static token properties only** — non-convertibility tags that hold the walls in code but **person-blind** (no surveillance). The one good idea salvaged from programmable Flow.
- **Drawer modules (bounded, dormant by default):**
  - Deflation-only demurrage circuit-breaker — Tier-1 rule-bound, survival-balance exempt, rate-capped below the wealth carry, auto-expiring. (Salvaged from Gesell/Wörgl, in its proper velocity domain.)
  - Bounded complementary local currencies — redemption-locked to Flow only, full-reserve, capped so none network-effects into the de-facto money. (Salvaged from free-banking.)
  - No-clawback floor on the payroll layer — wages can't be retroactively discounted or seized. (Salvaged from money-lanes — the wage-protection intuition *without* valves or classification.)
- **Prohibited primitives** (the sharp part — these are forbidden, not optional): behavioral conditioning, freeze, expiry-as-control, velocity rules, counterparty classification, one-way valves. *Shipping the freeze button is the harm, regardless of intent.*

## On directional money-lanes (the early concept)

Rejected as an architecture — four gate failures, grounded in the Soviet two-circuit ruble record:
- **G-3:** enforcing "capital→wage vs. consumer→consumer" requires classifying both parties and the purpose of every transaction — a surveillance engine by construction; the gate condition *is* the private fact.
- **G-2:** one-way valves are the highest-pressure seam in monetary history; the USSR's *obnal* (enterprise-money→cash) black market formed exactly there.
- **G-4/G-6:** whoever sets convertibility ratios holds a Gosbank-level chokepoint, weaponizable in a crisis.
- **Conflict with the wealth hybrid:** lanes fracture the fungibility the Harberger valuation module needs — it corrupts the hybrid, not just duplicates it.

**Salvaged intuition:** structurally protect wages before convergence forms — kept as the no-clawback payroll floor above, implemented without separate money types, valves, or surveillance.

## Meta-result

No single money design is adequate — the answer is a layered composition with a tiny legible core (sovereign creation + plain lane) plus a few bounded, dormant modules, and a hard list of *forbidden powers*. The cleverness lives in what the money is **not allowed to do**.

## Open / next

- Reconcile with Annex X (Flow issuance) and SPECIFICATIONS §D — sovereign/full-reserve creation is close to the corpus's existing Annex X direction; check fit.
- Run the rubric on the assembled Flow stack (interaction effects).
- Formal promotion would require the SPECIFICATIONS/Annex X redline and the Christ-centered review.
