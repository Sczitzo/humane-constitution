---
title: CRUS Simulation Packet 001
---

# CRUS Simulation Packet 001

*First runnable packet under the [CRUS Simulation Protocol](../governance/CRUS_Simulation_Protocol.md). Model: `simulations/crus_model.py` (seeded Monte-Carlo, medians over 30 runs). Run date: 2026-07-12. Six of the fourteen required scenarios are simulable with this model; the other eight are reported as **not run** with reasons — this packet is explicitly partial and permits no claim upgrades on the untested scenarios.*

---

## In plain language

Commons Return is the plan's replacement for the old "parked money fee": instead of charging idle money, it charges value nobody created alone — land location value, natural resources, broadcast spectrum, monopoly licenses, platform rents, big concessions, and very large inheritances. Universal Stake is everyone's equal share of what's collected. The big question the rules demand we test: **who actually pays, who actually receives, who can dodge it, and who gets hurt by the paperwork?**

We built a small pretend economy — 500 ordinary households and 20 big holders who own almost all the charged assets — and ran a year 30 times with different random luck. Here's what happened:

**The good news (3 tests passed):**
- **Ordinary people came out ahead.** No household paid the charge directly (homes below the protection line are exempt, and the exemption worked). Even after big holders pushed some of their charge into rents and prices, every wealth group received more from their Universal Stake than they lost — and the *poorest* fifth gained the most. The big holders paid about 2.4% of their assessed value. That's the design working as promised: the charge lands on scarcity wealth, the benefit lands on everyone.
- **Dodging didn't pay.** We let a quarter of the big holders try to hide 30% of their value through shell tricks. With a 60% chance of getting caught and a 5× fine, hiding *lost* money on average and only 2% of value slipped through — below the warning line. Same lesson as our earlier tests: consequences matter more than perfect detection.
- **Pass-through stayed within bounds** at the assumed shifting behavior, but read the caveat below — this one is only as good as its assumption.

**The warnings (3 tests hit "watch" — the rules say these need redesign or narrower claims before any pilot):**
- **A small black market in Stake payments survived.** A couple of households a year successfully sold their Stake to brokers despite 60% detection. The rules say *any* repeatable market is a warning. Fix candidates: make Stake payments non-transferable at the payment rail itself, not just illegal to sell.
- **Paperwork ate about 14% of everything collected** — above the 10% warning line. Small assessments on 20 holders don't cost much, but distributing tiny payments to 500 households does. At real scale this ratio could improve (fixed costs spread wider) or worsen (appeals multiply). It has to be measured, not assumed.
- **A recession hit harder than the reserve could cover.** A 30% fall in asset values cut net receipts ~35% — *more* than proportionally, because paperwork costs don't shrink in a recession — and the 20% reserve didn't bridge the gap. If households ever depend on Stake payments, that gap becomes real hardship. Fix candidates: bigger reserve share, or explicit counter-cyclical rules.

**What this doesn't say.** Eight of the fourteen required tests can't be run by this kind of model at all — including the ones about appraisal manipulation, who gets wrongly excluded from eligibility, political favoritism in distribution, and whether real people can understand the system. Nothing here says Commons Return can replace taxes or is ready for real money. It says: in a toy economy with stated assumptions, the core promise held and three specific weaknesses now have numbers attached.

---

## Scenario summary (all 14 required scenarios)

| Scenario | Subject | Result |
|---|---|---|
| CRUS-SIM-01 | Base-case source-base assessment | **Not run** — needs real valuation ranges |
| CRUS-SIM-02 | Ordinary-life incidence | **Pass** |
| CRUS-SIM-03 | Pass-through shock | **Pass** (assumption-bound; see notes) |
| CRUS-SIM-04 | Valuation hiding (appraisals, IP, estates) | **Not run** — needs a legal red team |
| CRUS-SIM-05 | Avoidance and capital flight | **Pass** |
| CRUS-SIM-06 | Universal Stake eligibility | **Not run** — needs human/institutional testing |
| CRUS-SIM-07 | Direct non-convertibility | **Watch** — repeatable Stake market emerged |
| CRUS-SIM-08 | Compound convertibility | **Not run** — needs institutional channel modeling |
| CRUS-SIM-09 | Routing capture | **Not run** — needs an administrative-discretion model |
| CRUS-SIM-10 | Administrative burden | **Watch** — 13.6% of gross receipts |
| CRUS-SIM-11 | Downturn resilience | **Watch** — 34.7% receipt fall, reserve insufficient |
| CRUS-SIM-12 | Work and stewardship | **Not run** — needs a production economy model |
| CRUS-SIM-13 | Fiscal adequacy | **Not run** — needs named obligations at real scale |
| CRUS-SIM-14 | Public comprehension | **Not run** — needs reader testing, not simulation |

## Detailed gate outputs

### CRUS-SIM-02 — Ordinary-life incidence: PASS

Net burden by household wealth quintile (charge paid directly plus passed-through share, minus Universal Stake received, as a fraction of wealth; negative = net gain):

| Q1 (poorest) | Q2 | Q3 | Q4 | Q5 | Concentrated holders |
|---|---|---|---|---|---|
| −15.6% | −4.6% | −2.1% | −1.0% | −0.2% | **+2.4%** |

Direct household charges were zero: the protected ordinary-use exemption (FC-204 analogue, provisional threshold) fully shielded household land value. The incidence gradient is strongly progressive. Not evaluated: the protected-class block test — protected classes are not modeled.

### CRUS-SIM-03 — Pass-through: PASS, assumption-bound

At the base-case behavioral assumption (holders shift 10% of their charge into rents/prices), the realized pass-through sits exactly at the watch line. The sweep shows the gate outcome is a direct function of the behavioral assumption: at 25% shifting the watch gate trips, at 50% the block gate trips. **This scenario cannot pass on model evidence alone** — real pass-through elasticities are an external-evidence need. Recorded as pass only for the stated assumption.

### CRUS-SIM-05 — Avoidance and capital flight: PASS

25% of holders attempt to hide 30% of assessed value. At 60% detection with a 5× penalty on the evaded charge: assessed-value erosion 2.0% (watch line: 5%), and hiding is **unprofitable in expectation** — the deterrence result from the [preliminary ABM findings](Preliminary_ABM_Results.md) transfers directly. Not evaluated: treaty routing and cross-border flight (single-jurisdiction model).

### CRUS-SIM-07 — Direct non-convertibility: WATCH

With 5% of households approached by brokers per year and 60% detection of sales, a median of 2 successful Stake sales per year persisted — a repeatable market under the protocol's definition, which is an automatic watch. Plain-language failure: *a broker market in Universal Stake payments persists despite detection.* Design implication: prohibition-plus-detection is insufficient; non-transferability should be enforced at the payment rail itself (FC-206 design space).

### CRUS-SIM-10 — Administrative burden: WATCH

Median administrative cost — assessment, appeals, distribution, fixed overhead — is **13.6% of gross receipts**, above the 10% watch line. The dominant cost is distributing many small payments. Scale effects could move this either way; it is a genuine open number. Plain-language failure: *running the system eats the value it collects.*

### CRUS-SIM-11 — Downturn resilience: WATCH

A 30% decline in source-base asset values produced a **34.7% fall in net receipts** — amplified beyond the asset decline because administrative costs are fixed — and the 20% reserve share did not cover the gap. Plain-language failure: *a recession cuts the public's return faster than reserves can cover.* Design implication: reserve share and counter-cyclical rules need explicit sizing before any household depends on Stake receipts.

## Published inputs and assumptions

All parameters are provisional simulation anchors (the Parameter Calibration Register must bind real values before activation):

- 500 households (exponential wealth, mean 10 units); 20 concentrated holders splitting ~11,000 units of source-base value on the FC-202 closed list with a Pareto skew.
- Assessment rate 2%/year on assessed value (FC-203 analogue).
- Household land value below the protected-use threshold is exempt (FC-204 analogue); the threshold fully exempted all modeled households.
- Receipts split 20% reserves / 40% lockbox / 40% Universal Stake (FC-208 analogue), distributed equally.
- Avoidance: hide 30% of value; 60% detection; 5× penalty on evaded charge.
- Stake sales: 5% approached, 30% would accept, 60% detection, 2× penalty.
- Admin: fixed 10 + 0.5/assessment + 2.0/appeal (15% appeal rate) + 0.02/distribution.
- Medians over 30 seeded runs; full machine-readable output via `python -m simulations.crus_model`.

Key limitations: single jurisdiction; no price formation (pass-through is a behavioral parameter, not an emergent outcome); no protected-class modeling; no appraisal/valuation process; no political actors; one year of static behavior.

## No-claim rule compliance

Per the protocol: these results move nothing past "designed mechanism" except the six tested scenarios, which may be described as *partly tested in simulation under stated assumptions*. This packet does **not** support claims that Commons Return can replace taxes, that Universal Stake is capture-proof, that ordinary life is protected in practice, that source bases fund named obligations, or that real-money collection is ready. The three watch outputs are redesign inputs, not failures to hide: the protocol exists precisely to surface them before anyone is harmed.

## Reproduction

```
pip install -e .[test]
python -m simulations.crus_model      # full machine-readable packet (JSON)
python -m pytest simulations/test_crus_model.py -q
```
