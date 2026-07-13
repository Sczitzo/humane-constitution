"""
RAS-1 Allocation Drill — P-082 evidence gate 1 (simulation level)
=================================================================

Executes the sub-CSM allocation drill named in the P-082 intake package:
a synthetic population with ANNEX_Y §Y1.1-style adjusted individual minimums
plus two clinical supplement tiers, capacity cut below aggregate CSM, and
three allocators compared:

    FLAT      — equal per-capita share (the naive "equal cut")
    ROTATION  — random full-share rotation until capacity exhausts
                (what the ABM harness did before a rule existed)
    RAS-1     — pro-rata of each person's own adjusted individual CSM

The drill's question: who bears the shortfall under each rule?

All population weights are SYNTHETIC drill assumptions, published in the
drill record — they are not the bound §Y1.1 values, which live in ANNEX_Y.

Usage:
    python -m simulations.ras_drill
"""

import json
import numpy as np

# Synthetic population: (group, count, adjusted individual CSM in units
# where a reference adult = 1.0). Loosely shaped on §Y1.1's adjustment
# axes (pregnancy, lactation, heavy labor, age bands, pediatric).
POPULATION = (
    ("adult",        260, 1.00),
    ("child",        100, 0.75),
    ("elderly",       60, 0.90),
    ("pregnant",      20, 1.14),
    ("lactating",     20, 1.24),
    ("heavy_labor",   40, 1.14),
)

# Two clinical supplement tiers (RAS-1: pre-defined in calm, additive to
# the individual CSM, capped). Members drawn from the population above.
TIERS = (
    ("dialysis_dependent", 10, 0.20),
    ("insulin_dependent",  25, 0.10),
)

SUPPLEMENT_CAP_MULTIPLE = 1.5   # no individual CSM+supplements may exceed
                                # this multiple of the reference adult CSM

CAPACITY_RATIOS = (0.95, 0.85, 0.70, 0.50)


def build_population(seed: int = 7):
    """Returns (needs, groups): per-person adjusted CSM incl. tiers."""
    rng = np.random.default_rng(seed)
    needs, groups = [], []
    for group, count, csm in POPULATION:
        needs.extend([csm] * count)
        groups.extend([group] * count)
    needs = np.array(needs)
    groups = np.array(groups)
    # Assign tier supplements to random members (a person may hold both)
    for tier, count, supplement in TIERS:
        members = rng.choice(len(needs), count, replace=False)
        needs[members] = np.minimum(needs[members] + supplement,
                                    SUPPLEMENT_CAP_MULTIPLE)
    return needs, groups


def allocate_flat(needs: np.ndarray, capacity: float) -> np.ndarray:
    """Equal per-capita share, capped at each person's own need."""
    share = capacity / len(needs)
    alloc = np.minimum(np.full(len(needs), share), needs)
    # redistribute what the low-need (children) couldn't use, one pass —
    # ponytail: a single redistribution pass; real systems iterate
    leftover = capacity - alloc.sum()
    unmet = needs - alloc
    if leftover > 0 and unmet.sum() > 0:
        alloc += unmet * min(1.0, leftover / unmet.sum())
    return alloc


def allocate_rotation(needs: np.ndarray, capacity: float,
                      seed: int) -> np.ndarray:
    """Random full-share rotation: shuffled order, serve fully until dry.
    This is the no-rule baseline the ABM harness exhibited."""
    rng = np.random.default_rng(seed)
    order = rng.permutation(len(needs))
    alloc = np.zeros(len(needs))
    remaining = capacity
    for i in order:
        take = min(needs[i], remaining)
        alloc[i] = take
        remaining -= take
        if remaining <= 0:
            break
    return alloc


def allocate_ras1(needs: np.ndarray, capacity: float) -> np.ndarray:
    """RAS-1: pro-rata of each person's own adjusted individual CSM."""
    return needs * (capacity / needs.sum())


def fulfillment_by_group(alloc, needs, groups) -> dict:
    """Mean fulfillment ratio (allocation / own need) per group."""
    out = {}
    for g in dict.fromkeys(groups):
        mask = groups == g
        out[g] = float((alloc[mask] / needs[mask]).mean())
    return out


def run_drill(n_rotation_seeds: int = 30) -> dict:
    needs, groups = build_population()
    results = {}
    for ratio in CAPACITY_RATIOS:
        capacity = needs.sum() * ratio
        flat = allocate_flat(needs, capacity)
        ras1 = allocate_ras1(needs, capacity)
        # rotation: median across seeds of per-person fulfillment stats
        rot_zero, rot_group = [], []
        for s in range(n_rotation_seeds):
            rot = allocate_rotation(needs, capacity, seed=100 + s)
            rot_zero.append(float((rot == 0).mean()))
            rot_group.append(fulfillment_by_group(rot, needs, groups))
        rot_group_median = {
            g: float(np.median([r[g] for r in rot_group]))
            for g in rot_group[0]
        }
        results[f"capacity_{int(ratio*100)}pct"] = {
            "flat_per_capita": {
                "fulfillment_by_group": fulfillment_by_group(flat, needs, groups),
                "persons_at_zero": float((flat == 0).mean()),
            },
            "random_rotation": {
                "fulfillment_by_group": rot_group_median,
                "persons_at_zero_median": float(np.median(rot_zero)),
            },
            "ras1_pro_rata": {
                "fulfillment_by_group": fulfillment_by_group(ras1, needs, groups),
                "persons_at_zero": float((ras1 == 0).mean()),
                # INV-001/INV-003 checks: nobody zeroed; fulfillment uniform
                "min_fulfillment": float((ras1 / needs).min()),
                "max_fulfillment": float((ras1 / needs).max()),
            },
        }
    return {
        "drill": "RAS-ALLOCATION-DRILL-001",
        "population": {g: c for g, c, _ in POPULATION},
        "tiers": {t: c for t, c, _ in TIERS},
        "results": results,
    }


if __name__ == "__main__":
    print(json.dumps(run_drill(), indent=1))
