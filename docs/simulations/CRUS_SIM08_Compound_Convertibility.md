---
title: CRUS-SIM-08 Compound Convertibility — Economic Bundle Slice
---

# CRUS-SIM-08 Compound Convertibility — Economic Bundle Slice

*Addendum run under the [CRUS Simulation Protocol](../governance/CRUS_Simulation_Protocol.md), extending [CRUS Simulation Packet 001](CRUS_Simulation_Packet_001.md). Model: `simulations/crus_model.py` (seeded Monte-Carlo, medians over 30 runs, seeds 3000–3029). Run date: 2026-07-13. This run moves CRUS-SIM-08 out of "not run" for the narrow economic slice only: bundled broker offers with per-offer detection. The scenario's block gate — successful conversion into institutional standing — still requires institutional channel modeling and remains explicitly not evaluated.*

---

## In plain language

The rules say you can never sell your survival floor, your civic voice, or your public-role record. CRUS-SIM-07 already tested the blunt version of that attack: a broker walks up and offers cash for your Universal Stake. This test covers the sneakier version: the broker **hides the sale inside something that looks like ordinary life**. "Sign over your Stake and we'll cut your rent." "Route your survival credits to us and the job is yours." "We'll forgive your debt if your Voice votes our way." Nobody says "sale." It just looks like a housing deal, a job offer, or debt relief.

We modeled that in our small pretend economy (500 households, run 30 times with different random luck). Each year, brokers approach about 8% of households with a bundled offer. Because the offer looks like normal life, almost half accept — more than accepted the blunt cash offer. And because the protected asset is hidden inside a legitimate-looking transaction, inspectors catch only about a third of the bundles, versus 60% of open sales.

**Result: a warning (watch), by construction.** Out of roughly 18 accepted bundles a year, a median of 12 slipped through — most targeting the Universal Stake, some the survival floor itself. The protocol's watch line is "any repeatable market or bundled offer emerges," and this one clearly repeats. The honest reading: at these assumed numbers, **disguised sales beat open sales**, because disguise raises acceptance and lowers detection at the same time.

**What would actually fix it.** Consistent with the earlier deterrence finding (consequences beat surveillance), the lever to test next is not "detect more" — it is what happens to a *broker* who gets caught: penalties, lockouts, and forfeiting the bundle. In this version of the model brokers don't yet feel consequences at all; they just lose the caught bundles and keep offering. That is the model's biggest known gap, stated below.

**What this does not say.** This run says nothing about whether a bundle can actually buy office, legal standing, enforcement leniency, or survival priority — those run through institutions we have not modeled, and the protocol's *block* gate lives there. Nothing here upgrades any claim about the real system.

## Gate output

### CRUS-SIM-08 — Compound convertibility (economic slice): WATCH

| Metric | Median (30 runs) |
|---|---|
| Bundled offers made | 40 |
| Offers accepted | 18 |
| Bundles that evaded detection | **12** |
| — targeting Universal Stake | 6 |
| — targeting Essential Access | 3 |
| — targeting Voice | 1 |
| — targeting Service Record | 1 |

Warning emitted: `REPEATABLE_BUNDLED_MARKET` (protocol watch line: "any repeatable market or bundled offer emerges"; threshold: more than 1 successful bundle per year). Plain-language failure: *brokers can dress a sale of survival-floor or civic instruments up as an ordinary housing, job, loan, or debt-relief offer, and enough of those bundles slip past detection to sustain a market.*

Not evaluated (the protocol's block half and known interactions):

- conversion into Voice, office, survival priority, membership, legal standing, public favor, or enforcement leniency (institutional channels not modeled)
- identity-recovery bundles (identity system not modeled)
- detection/penalty interaction with the SIM-07 broker market (same brokers in reality; separate random draws here)

## Published inputs and assumptions

All parameters are provisional simulation anchors, not bound constitutional values:

- Brokers approach 8% of the 500 households per year with a bundled offer; 45% of approached households accept (higher than the 30% acceptance of SIM-07's open cash offers — bundles look like ordinary life).
- Per-bundle detection probability 35% (lower than the 60% for open sales — the protected asset hides inside a legitimate-looking transaction). Both the acceptance premium and the detection discount are **assumed directions with assumed magnitudes**, not calibrated behavior.
- Brokers target protected assets with weights 55% Universal Stake, 25% Essential Access, 12% Voice, 8% Service Record, through five economic channels (housing, employment, lending, platform access, debt relief).
- A detected bundle carries a 2× penalty parameter on the bundled protected value — **recorded but not behaviorally active**: broker offer and household acceptance rates are fixed anchors and do not respond to penalties in this model. Bundles move protected assets only; Commons Return receipts accounting is untouched.
- More than 1 undetected bundle per year counts as a repeatable market.
- Medians over 30 seeded runs (seeds 3000–3029, fixed); full machine-readable output via `python -m simulations.crus_model`.

## Evidence-weight caveat

The watch result here is **by construction**: given the anchor parameters (18 accepted bundles, 35% detection), a repeatable market follows arithmetically. The run's value is not the verdict — it is that the protocol's watch line now has numbers attached, the asset-by-asset exposure is visible, and the assumption driving everything (bundling simultaneously raises acceptance and lowers detection) is stated where it can be attacked. No behavioral response, no institutional channel, and no real-world calibration stands behind these figures. Under the protocol's no-claim rule, CRUS-SIM-08 may now be described at most as *partly tested in simulation under stated assumptions, economic slice only* — it moves nothing else past "designed mechanism," and the untested block gate permits no claim of any kind. Consistent with Finding 3 of the [preliminary ABM results](Preliminary_ABM_Results.md), the next lever to test is broker consequences (penalty and lockout response), not higher detection probability.

## Reproduction

```
pip install -e .[test]
python -m simulations.crus_model                     # full packet JSON, incl. CRUS-SIM-08
python -m pytest simulations/test_crus_model.py -q   # includes the four SIM-08 gate tests
```
