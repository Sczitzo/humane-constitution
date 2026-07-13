---
title: RAS-1 Allocation Drill 001
---

# RAS-1 Allocation Drill 001

*Simulation-level execution of P-082 evidence gate 1: the §Y4 sub-CSM allocation drill for the [Rationing Allocation Standard](../governance/Rationing_Allocation_Standard.md). Model: `simulations/ras_drill.py`. Run date: 2026-07-13. Synthetic population of 500 across six §Y1.1-style need groups plus two clinical supplement tiers; capacity cut to 95%, 85%, 70%, and 50% of aggregate need; three allocation rules compared. All weights are synthetic drill assumptions, not bound §Y1.1 values.*

> **Evidence weight.** This is a simulation-level drill on synthetic data. It demonstrates the allocation *mathematics* — who bears the shortfall under each rule — not operational delivery. Gate 1 requires this drill; passing it here moves the claim no further than "mechanism demonstrated in simulation." The custodian, surge, lottery, and tier-tripwire gates (2–5) remain unexecuted.

---

## In plain language

When there isn't enough for everyone's minimum, somebody bears the shortage. We tested three ways of deciding who, in a pretend town of 500 people — including children, elderly people, pregnant and nursing mothers, heavy laborers, and people who depend on dialysis or insulin — at four levels of shortage, down to only half of what everyone needs.

**The rule with no rule (random rotation — what happens when nothing is written down):** some people get everything, others get *nothing at all*. At half capacity, **half the town gets zero** while the other half is made whole. This is the catastrophic baseline — and it's exactly what our earlier scarcity simulation did, because the design had no written rule at the time.

**The "fair-sounding" rule (equal cut for everyone):** nobody gets zero, but the shortage lands hardest on the people who need the most. At half capacity, a nursing mother receives only **39% of her minimum** while a child receives 64% of theirs — because an equal slice of too-little is not equal survival.

**The RAS-1 rule (everyone's share shrinks in proportion to their own real minimum):** at half capacity, *every single person* — the child, the nursing mother, the dialysis patient, the laborer — stands at exactly **50% of their own minimum**. Nobody at zero, nobody favored, the shortage borne equally *in proportion to need*, at every shortage level tested. The manna rule, kept: "he that gathered much had nothing over, and he that gathered little had no lack."

## Results

Mean fulfillment of each person's own adjusted minimum (worst-off group shown; RAS-1 is uniform so all groups are identical):

| Capacity | Flat equal cut — worst group | Random rotation — persons at zero | RAS-1 pro-rata — everyone |
|---|---|---|---|
| 95% | Lactating: 85.1% | 4.8% get nothing | **95.0%, uniform** |
| 85% | Lactating: 69.3% | 14.9% get nothing | **85.0%, uniform** |
| 70% | Lactating: 54.6% | 30.0% get nothing | **70.0%, uniform** |
| 50% | Lactating: 39.0% | 50.0% get nothing | **50.0%, uniform** |

Checks passed at every capacity level:

- **INV-001 (no one zeroed):** RAS-1 minimum allocation is strictly positive for all 500 persons at all capacities; random rotation violates this at every capacity level tested.
- **Uniform burden (INV-003-consistent):** RAS-1 min and max fulfillment ratios are identical to numerical precision — the rule cannot express favoritism, because it has no free parameter to favor with.
- **Supplement tiers carry through:** the dialysis and insulin tiers (capped per the published multiple) scale with the same ratio as everyone else — recognized need travels through the cut automatically.
- **Capacity conservation:** all three allocators distribute exactly the available capacity (regression-tested).

## What this does and does not establish

Establishes (simulation strength): the RAS-1 formula does what the standard claims — proportional burden, no zeroing, adjustments and tiers carried through — and both alternatives fail in the specific ways the P-082 package predicted (flat cuts starve the highest-need first; no-rule rotation abandons a capacity-sized fraction of the population entirely).

Does not establish: anything about real delivery, real attestation, custodian behavior, surge dynamics, lottery integrity, or tier-list politics. Gates 2–6 of the P-082 package require drills this model cannot perform (custodian band assignment, committed-lottery red team, surge latency under audit pressure, tier-inflation tripwire, and the P-081 custodian dependency).

## Reproduction

```
python -m simulations.ras_drill        # full JSON drill output
python -m pytest simulations/test_ras_drill.py -q
```

Population weights, tier definitions, and the supplement cap are published in the module header; rotation results are medians over 30 seeds.
