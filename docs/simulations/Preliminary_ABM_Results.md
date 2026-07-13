---
title: Preliminary Agent-Based Simulation Results
---

# Preliminary Agent-Based Simulation Results

*First reproducible results from the agent-based model (`simulations/model_outline.py`, Mesa framework). Run date: 2026-07-12. 500 citizen agents plus adversarial agents, 365 simulated days per run, medians reported over 10 fixed-seed runs per scenario.*

> **Evidence weight.** These are stylized-model results, not field evidence. In the Evidence Ladder they sit at the simulation rung: they can weaken a design claim by showing a parameter regime where it fails, and they can show a mechanism behaves as designed inside the model's assumptions. They cannot show the mechanism works in the real world. Every claim below is conditional on the assumptions listed at the end.

> **Design-drift note.** After these runs were produced, the corpus replaced the demurrage instrument with the Commons Return and Universal Stake system (CRUS); demurrage parameters are retired. Finding 4 and the burden-gate results below therefore describe the *retired* instrument. Their transferable content is the method — burden-distribution measurement by wealth quintile with an exemption-floor mechanism — which is exactly what the [CRUS Simulation Protocol](../governance/CRUS_Simulation_Protocol.md) requires ("who actually pays, who actually receives, who can avoid it"). Re-targeting this model at CRUS is the natural next simulation step. Findings 1–3 (oracle-gated delivery, scarcity pass-through, detection-vs-consequences) do not depend on demurrage and are unaffected.

---

## In plain language

We built a small computer world to test the rules. It has 500 pretend people who live through one full year, one day at a time. Some of them are cheaters who try to break the rules on purpose. We ran each test 10 times with different random luck, so one lucky or unlucky run can't fool us.

Here is what happened, in plain words:

**1. Everyone got their daily basics — even when the measuring tools kept glitching.**
The system decides how much food and shelter it can hand out each day by measuring what's really available. We made the measuring tools fail ten times more often than normal. Nobody lost their basics. Why? There's a rule that says: *when you're not sure, trust the last good measurement instead of panicking.* In the model, that rule worked.

**2. When there truly wasn't enough, the system shared what it had — but we found a missing rule.**
We ran a year where there was only enough for 85 out of every 100 people. The system handed out exactly what existed — it didn't pretend there was more, and it didn't lose any on top. But here's the problem we found: our model picks *at random* who misses out each day. The real plan is supposed to have a fair way to decide that (the "Shared Storehouse" emergency rules), and we haven't built that part into the model yet. So we now know exactly which piece to build next.

**3. Catching cheaters isn't enough. Punishing them is what works.**
This was the big surprise. If getting caught only means "that one trick gets blocked," then even catching cheaters 99 times out of 100 doesn't stop them — they just keep trying, and they slowly get rich anyway. But if getting caught means a big fine plus a 30-day timeout, then catching them just *half* the time is plenty. The cheaters ended the year with *less* than they started with. The lesson: the system doesn't need cameras everywhere watching everyone. It needs real consequences for the cheaters it does catch. That's good news, because watching everyone all the time was one of the scariest risks of this whole design.

We then tested this against *smart* cheaters — ones who pay attention to how often they get caught and stop cheating when it stops being worth it. The result got even better: smart cheaters tried a few times, learned that cheating costs more than it pays, and quit on their own. But here's the flip side: when there were no punishments, smart cheaters behaved exactly like dumb ones — they cheated constantly, because why not? Being smart didn't matter. Only consequences mattered. The one thing we haven't tested yet: cheaters who don't quit, but instead invent *new tricks* we don't know how to catch.

**4. The "parked money fee" only hit big piles of idle money, not small savings.**
The design charges a small fee on large amounts of money that sit unused, to keep money moving. In the model, ordinary people with small savings paid nothing at all — only the biggest holders paid. But be careful: that happened partly because we *built the rule that way* (small balances are exempt). Whether the cutoff line is drawn in the right place for real families needs real-world numbers we don't have yet.

**One honest warning.** Pretend people are not real people. A test like this can *catch a broken rule* — that's genuinely useful, and it caught three broken pieces of our own testing code this round. But it can never *prove* a rule will work in the real world. Only real pilots with real people can do that.

---

## What was run

Five scenarios, each 10 seeded runs:

| Scenario | What it varies |
|---|---|
| BASELINE | Standard parameters, 1% adversarial density |
| ORACLE_STRESS | Oracle node failure rate raised from 2% to 15% per cycle |
| HIGH_DEMURRAGE | Idle-money fee raised from 1.0% to 2.0% monthly |
| ADVERSARIAL_STRESS | Adversarial density raised to 10% of population |
| SCARCITY_85PCT | True physical capacity fixed at 85% of population demand |

Plus two parameter sweeps: shadow-conversion detection probability (0.50–0.99, with and without penalties) and the demurrage burden-distribution gate.

Since the previous scaffold state, three silent model bugs were fixed before these results were produced: the detection comparison was inverted (so the historical "85% detection" assumption actually simulated an 85% adversary success rate), demurrage could never mathematically trigger, and oracle consensus output was computed but never used to gate delivery. Results produced before these fixes should be disregarded.

## Headline results

| Scenario | Essential Access redemption | Bypass successes | Adversary wealth share | CSM violations (person-days/yr) |
|---|---|---|---|---|
| BASELINE | 100% | 110 | 3.2% | 0 |
| ORACLE_STRESS | 100% | 110 | 3.3% | 0 |
| HIGH_DEMURRAGE | 100% | 110 | 3.2% | 0 |
| ADVERSARIAL_STRESS | 100% | 987 | 22.5% | 0 |
| SCARCITY_85PCT | 84.9% | 110 | 3.2% | 27,772 |

Reference: adversaries at 10% density with no net extraction would hold ~9% of wealth.

## Finding 1 — The survival floor holds when capacity is adequate, including under a 10× oracle failure rate

With oracle consensus now genuinely gating daily Essential Access delivery, the conservative-hold rule (P-022: on consensus failure, keep the last confirmed capacity rather than slashing access) prevented all CSM violations across every adequate-capacity run, including ORACLE_STRESS with 66 consensus failures per year. Within the model, the P-022 design behaves as intended.

## Finding 2 — Under scarcity, the shortfall passes through cleanly, but the design has no fairness rule for who goes unserved

At 85% capacity, redemption settled at 84.9% — the oracle-measured budget tracked true capacity almost exactly, neither amplifying nor masking the shortage. The cost is 27,772 unserved person-days per year in a 505-person population.

The important observation is not the number — it follows arithmetically from the capacity ratio — but what the model exposed: the shortfall lands on **randomly rotating agents each day** because the model has no allocation rule for scarcity. The constitutional design (Shared Storehouse, Annex AQ) is supposed to govern exactly this situation. The model does not yet implement Shared Storehouse activation, so this result marks the boundary where the current model stops representing the design.

## Finding 3 — Detection alone cannot hold the T-001 wall; detection plus consequences holds it easily

The central preliminary result. Adversary wealth share after one year, at 10% adversarial density:

| Detection probability | No penalty | Penalty, mechanical adversaries | Penalty, rational adversaries |
|---|---|---|---|
| 0.50 | 42.2% | 6.1% | 8.3% |
| 0.70 | 32.2% | 6.0% | 8.3% |
| 0.85 (P-001 assumption) | 22.1% | 6.0% | 8.5% |
| 0.95 | 14.2% | 5.9% | 8.5% |
| 0.99 | 10.8% | 6.0% | 8.5% |

Penalty regime: 5× confiscation plus 30-day lockout per detection. "Rational adversaries" estimate their detection risk from their own attempt history (starting from an optimistic ~10% assumption) and quit permanently once cheating stops paying.

Without consequences, even 99% detection leaves adversaries above their fair share — detection that merely blocks the single attempt lets the remainder compound. With consequences, adversary wealth share falls to or below fair share at *every* detection level tested, including 50%, and this holds for **both** adversary types:

- Mechanical adversaries keep attempting and are ground down by confiscation and lockout (incapacitation).
- Rational adversaries probe the wall a handful of times (median 0–27 successful bypasses per year across the whole 50-adversary cohort, versus ~3,000 without penalties), learn that cheating does not pay, and stop on their own (self-deterrence). They end the year at ~8.5% wealth share — just under fair share, the residual being learning-phase penalties paid.
- Rational adversaries with **no** penalties behave identically to mechanical ones — when cheating always pays, intelligence doesn't change the outcome, only consequences do.

**Design implication (conditional on model assumptions):** the shadow-convertibility wall does not need surveillance-grade detection if detected violations carry real consequences. A 50%-detection, high-consequence regime outperformed a 99%-detection, no-consequence regime by a wide margin, against both persistent and rational adversaries. This directly softens the tension between wall enforcement and the data-minimization commitment: the design can prefer fewer, well-evidenced enforcement actions with meaningful penalties over pervasive monitoring.

**Remaining caveat:** the rational adversary adapts by *quitting*. Adversaries who adapt by *changing tactics* — smaller extractions, proxy diversity, timing games, structures the detector wasn't trained on — are not yet modeled. That is the strongest remaining attack on this finding.

## Finding 4 — The demurrage burden gate passes, but partly by construction

The white paper's evidence gate requires the demurrage burden ratio across wealth quintiles to be ≤ 1.0. With the balance-floor exemption implemented (balances below the floor pay nothing, per the design's "large idle balances, not ordinary working balances" language):

| Rate | Q1–Q3 burden | Q4 burden | Q5 burden | Ratio Q1/Q5 | Gate |
|---|---|---|---|---|---|
| 1%/month | 0.0% | 0.2% | 2.4% | 0.0 | Pass |
| 2%/month | 0.0% | 0.3% | 4.6% | 0.0 | Pass |

This confirms the *mechanism* — a balance-floor exemption makes the fee progressive by construction — not the real-world claim. The result is exactly as strong as the assumption that the exemption threshold is set correctly relative to real household balance distributions, which requires calibration data that does not exist yet.

## Assumptions that bound all of the above

- Extraction size is fixed at 1.0 Flow per successful shadow conversion; no proxy-market price dynamics.
- Adversaries are either mechanical (attempt daily when not locked out) or rational quit-or-continue learners; tactic-changing evasion is not modeled.
- Scarcity is chronic, not a shock curve; no Shared Storehouse activation logic exists in the model.
- Capacity headroom in adequate-capacity scenarios is large (~80% above demand); the near-boundary regime is only probed by SCARCITY_85PCT.
- Idle-spell behavior (0.90–0.99 daily persistence) and the demurrage balance floor (15 units) are modeling choices, not calibrated values.
- Population is 505 agents over one year; no demographic, geographic, or sectoral structure beyond uniform sector labels.

## What this does and does not support

Supports (at simulation strength): P-022 conservative hold behaves as designed; oracle-gated delivery passes scarcity through proportionally; the T-001 wall requires consequences, not just detection; the balance-floor exemption mechanism produces a progressive burden profile.

Does not support: any claim about real-world delivery, real detection rates, real adversary behavior, or real household burden. No status upgrade beyond "partly tested on paper / in simulation" is justified for any register entry.

## Reproduction

```
pip install -e .[analysis]
python -m simulations.model_outline
```

All scenarios use fixed seeds; the test suite (`python -m pytest -q`) covers the oracle-delivery coupling, conservative hold, demurrage mechanics, deterrence mechanics, and oracle consensus rules.
