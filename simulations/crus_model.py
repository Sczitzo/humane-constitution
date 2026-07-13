"""
CRUS Simulation Packet — Commons Return and Universal Stake
===========================================================

First runnable packet under docs/governance/CRUS_Simulation_Protocol.md.

Covers the six protocol scenarios that a stylized Monte-Carlo economic model
can meaningfully address:

    CRUS-SIM-02  Ordinary-life incidence
    CRUS-SIM-03  Pass-through shock
    CRUS-SIM-05  Avoidance and capital flight
    CRUS-SIM-07  Direct non-convertibility (Universal Stake sale attempts)
    CRUS-SIM-09  Routing capture (discretionary levers vs dashboard detection)
    CRUS-SIM-10  Administrative burden
    CRUS-SIM-11  Downturn resilience

The remaining seven scenarios (valuation hiding via appraisal capture,
eligibility/dignity, compound convertibility, work and stewardship, fiscal
adequacy, public comprehension, base-case assessment review) require
institutional modeling, legal red teams, or human testing, and are emitted
as explicit "not_run" entries so this packet cannot be mistaken for a
complete one.

Design anchors:
    ANNEX_D           — source bases (D2), protected ordinary use (D3),
                        Universal Stake non-convertibility (D4.2)
    FC-202..FC-210    — parameter gates (all values here are provisional
                        simulation anchors, not bound constitutional values)
    CRUS_Simulation_Protocol.md — gate thresholds and output schema

Usage:
    python -m simulations.crus_model

This is deliberately NOT built on the Mesa ABM in model_outline.py: the CRUS
scenarios are incidence accounting with behavioral parameters, not spatial
agent interaction. A lean seeded Monte-Carlo keeps every assumption visible.
"""

import json
import numpy as np


# =============================================================================
# CONFIGURATION — provisional simulation anchors, not bound values
# =============================================================================

CRUS_CONFIG = {
    # Population
    "n_households": 500,              # ordinary households across wealth quintiles
    "n_concentrated_holders": 20,     # concentrated source-base holders
    "avoidant_holder_fraction": 0.25, # holders who attempt value hiding

    # Source bases (FC-202 closed list). Assessed value held by concentrated
    # holders, in the same arbitrary units as household wealth (exp mean 10).
    "source_bases": {
        "land_location_value": 4000.0,
        "natural_resources": 2000.0,
        "spectrum_licenses": 800.0,
        "monopoly_licenses": 900.0,
        "platform_network_rents": 1500.0,
        "public_concessions": 600.0,
        "large_successions": 1200.0,
    },
    # Ordinary households also hold small amounts of land value (a home).
    # ANNEX_D D3 protects ordinary use below FC-204 — modeled as exemption.
    "household_land_share": 0.15,     # of each household's wealth that is land value
    "protected_use_threshold": 25.0,  # FC-204 analogue: household land value below
                                      # this is exempt (provisional)

    # Assessment (FC-203 analogue): annual rate on assessed source-base value
    "assessment_rate_annual": 0.02,

    # Pass-through behavior: fraction of the charge that source holders
    # shift into rents/prices/fees borne by ordinary households.
    # Swept in CRUS-SIM-03; this is the base-case assumption.
    "pass_through_rate": 0.10,

    # Avoidance (CRUS-SIM-05): avoidant holders hide a fraction of assessed
    # value via shells/debt-loading; detection + penalty per the deterrence
    # findings in Preliminary_ABM_Results.md (consequences, not surveillance).
    "hiding_fraction": 0.30,          # of an avoidant holder's assessed value
    "hiding_detection_prob": 0.60,
    "hiding_penalty_multiple": 5.0,   # of the charge evaded, on detection

    # Universal Stake (ANNEX_D D4): share of net receipts distributed equally,
    # after lockbox minimums and reserves (FC-208 analogue).
    "reserve_share": 0.20,
    "lockbox_share": 0.40,
    "stake_share": 0.40,              # remainder to Universal Stake

    # Non-convertibility (CRUS-SIM-07): brokers offer to buy Stake at a
    # discount; sale attempts face detection + penalty (INV-002/FC-206).
    "stake_sale_attempt_rate": 0.05,  # of households approached per year
    "stake_sale_acceptance": 0.30,    # of approached who would accept
    "stake_sale_detection_prob": 0.60,
    "stake_sale_penalty_multiple": 2.0,  # of the stake amount, on detection

    # Administration (CRUS-SIM-10)
    "admin_cost_per_assessment": 0.5,    # per concentrated holder
    "admin_cost_per_distribution": 0.02, # per household stake payment
    "appeal_rate": 0.15,                 # of concentrated holders who appeal
    "admin_cost_per_appeal": 2.0,
    "admin_fixed_cost": 10.0,

    # Downturn (CRUS-SIM-11): asset-value decline applied to all source bases
    "downturn_value_decline": 0.30,

    # Routing capture (CRUS-SIM-09): a captured insider network inside the
    # administration steers two discretionary levers toward its own faction.
    # FC-207 specifies NO patronage discretion; this scenario models what
    # happens if the levers exist anyway, and whether the Capture Dashboard's
    # concentration metrics (published thresholds over public accounting)
    # would actually see it.
    "aligned_holder_fraction": 0.30,     # holders aligned with the network
    "aligned_household_fraction": 0.30,  # households aligned with the network
    "capture_exemption_prob": 0.50,      # chance an aligned holder receives a
                                         # discretionary assessment exemption
    "capture_exemption_relief": 0.50,    # fraction of the charge waived
    "capture_delay_prob": 0.30,          # chance an unaligned household's
                                         # Stake payment is delayed
    "capture_delay_cost": 0.05,          # effective value lost to delay
    "dashboard_concentration_threshold": 2.0,  # published ratio that triggers
                                               # a capture flag (dashboard rule)

    "n_runs": 30,                     # seeded Monte-Carlo runs per scenario
}

# Gate thresholds from CRUS_Simulation_Protocol.md "Starting Gate Thresholds"
GATES = {
    "pass_through_watch": 0.10,
    "pass_through_block": 0.25,
    "erosion_watch": 0.05,
    "erosion_block": 0.10,
    "admin_watch": 0.10,
    "admin_block": 0.20,
    "downturn_watch": 0.20,           # net-receipt fall without committed reserve
}


# =============================================================================
# CORE MODEL — one simulated assessment year
# =============================================================================

class CrusYear:
    """One assessment year: charge, avoidance, pass-through, distribution."""

    def __init__(self, config: dict, seed: int, downturn: bool = False):
        self.cfg = config
        rng = np.random.default_rng(seed)
        self.rng = rng

        # Household wealth: same exponential shape as the ABM (mean 10)
        self.household_wealth = rng.exponential(10.0, config["n_households"])
        self.household_land = self.household_wealth * config["household_land_share"]

        # Concentrated holders split the source bases with a skewed
        # (Pareto-like) distribution — a few holders control most value.
        decline = 1.0 - (config["downturn_value_decline"] if downturn else 0.0)
        total_base = sum(config["source_bases"].values()) * decline
        shares = rng.pareto(1.5, config["n_concentrated_holders"]) + 1.0
        self.holder_assessed = total_base * shares / shares.sum()
        n_avoidant = int(config["avoidant_holder_fraction"]
                         * config["n_concentrated_holders"])
        self.is_avoidant = np.zeros(config["n_concentrated_holders"], dtype=bool)
        self.is_avoidant[rng.choice(config["n_concentrated_holders"],
                                    n_avoidant, replace=False)] = True

    def run(self, pass_through_rate: float | None = None) -> dict:
        cfg = self.cfg
        rate = cfg["assessment_rate_annual"]
        ptr = cfg["pass_through_rate"] if pass_through_rate is None else pass_through_rate

        # --- Avoidance: hiding attempts before assessment (CRUS-SIM-05)
        hidden = np.where(self.is_avoidant,
                          self.holder_assessed * cfg["hiding_fraction"], 0.0)
        detected = self.rng.random(len(hidden)) < cfg["hiding_detection_prob"]
        # Detected hiding: value restored to the base and penalty charged on
        # the evaded charge. Undetected: value erodes from the base.
        evaded_charge = hidden * rate
        penalties = np.where(self.is_avoidant & detected,
                             evaded_charge * cfg["hiding_penalty_multiple"], 0.0)
        effective_hidden = np.where(self.is_avoidant & ~detected, hidden, 0.0)
        assessed_after_hiding = self.holder_assessed - effective_hidden
        erosion_rate = effective_hidden.sum() / self.holder_assessed.sum()

        # Avoidance profitability after consequences (block test): for the
        # average avoidant holder, does hiding pay once detection and
        # penalties are accounted for?
        p = cfg["hiding_detection_prob"]
        avoidance_ev = (1 - p) * evaded_charge[self.is_avoidant].mean() \
            - p * (evaded_charge * cfg["hiding_penalty_multiple"])[self.is_avoidant].mean() \
            if self.is_avoidant.any() else 0.0

        # --- Assessment (CRUS-SIM-02): concentrated holders + any household
        # land value above the protected-use threshold (D3/FC-204 exemption)
        holder_charge = assessed_after_hiding * rate + penalties
        household_taxable = np.maximum(
            self.household_land - cfg["protected_use_threshold"], 0.0)
        household_direct_charge = household_taxable * rate
        gross_receipts = holder_charge.sum() + household_direct_charge.sum()

        # --- Pass-through (CRUS-SIM-03): holders shift a fraction of their
        # charge into rents/prices; incidence is proportional to household
        # consumption (proxied by wealth, floored so the poorest still rent/buy)
        shifted_total = holder_charge.sum() * ptr
        consumption_weight = np.maximum(self.household_wealth, 2.0)
        household_passed = shifted_total * consumption_weight / consumption_weight.sum()
        pass_through_rate_realized = shifted_total / max(gross_receipts, 1e-9)

        # --- Administration (CRUS-SIM-10)
        n_holders = len(self.holder_assessed)
        n_appeals = int(cfg["appeal_rate"] * n_holders)
        admin_cost = (cfg["admin_fixed_cost"]
                      + cfg["admin_cost_per_assessment"] * n_holders
                      + cfg["admin_cost_per_appeal"] * n_appeals
                      + cfg["admin_cost_per_distribution"] * cfg["n_households"])
        admin_share = admin_cost / max(gross_receipts, 1e-9)

        # --- Distribution (ANNEX_D D4.1 ordering: reserves and lockbox first)
        net_receipts = max(gross_receipts - admin_cost, 0.0)
        reserves = net_receipts * cfg["reserve_share"]
        lockbox = net_receipts * cfg["lockbox_share"]
        stake_pool = net_receipts * cfg["stake_share"]
        stake_per_household = stake_pool / cfg["n_households"]

        # --- Incidence by quintile (CRUS-SIM-02): effective burden =
        # (direct charge + passed-through share - universal stake received)
        # as a fraction of wealth. Concentrated holders: charge / assessed.
        order = np.argsort(self.household_wealth)
        q = np.array_split(order, 5)
        quintile_net_burden = []
        for idx in q:
            paid = household_direct_charge[idx].sum() + household_passed[idx].sum()
            received = stake_per_household * len(idx)
            wealth = self.household_wealth[idx].sum()
            quintile_net_burden.append((paid - received) / wealth)
        holder_burden = holder_charge.sum() / self.holder_assessed.sum()

        # --- Universal Stake non-convertibility (CRUS-SIM-07)
        n_approached = int(cfg["stake_sale_attempt_rate"] * cfg["n_households"])
        n_would_accept = int(n_approached * cfg["stake_sale_acceptance"])
        sale_detected = self.rng.random(n_would_accept) < cfg["stake_sale_detection_prob"]
        successful_sales = int((~sale_detected).sum())

        return {
            "gross_receipts": gross_receipts,
            "net_receipts": net_receipts,
            "reserves": reserves,
            "lockbox": lockbox,
            "stake_per_household": stake_per_household,
            "erosion_rate": erosion_rate,
            "avoidance_profitable": bool(avoidance_ev > 0),
            "pass_through_rate": pass_through_rate_realized,
            "admin_share": admin_share,
            "quintile_net_burden": quintile_net_burden,   # Q1 (poorest) → Q5
            "holder_burden": holder_burden,
            "household_direct_charge_total": household_direct_charge.sum(),
            "stake_sale_attempts": n_would_accept,
            "stake_sales_successful": successful_sales,
        }


def _median_runs(config: dict, downturn: bool = False,
                 pass_through_rate: float | None = None) -> dict:
    """Median outcome over n_runs seeded years."""
    runs = [CrusYear(config, seed=3000 + i, downturn=downturn)
            .run(pass_through_rate=pass_through_rate)
            for i in range(config["n_runs"])]
    out = {}
    for key in runs[0]:
        vals = [r[key] for r in runs]
        if isinstance(vals[0], list):
            out[key] = list(np.median(np.array(vals), axis=0))
        elif isinstance(vals[0], bool):
            out[key] = sum(vals) > len(vals) / 2
        else:
            out[key] = float(np.median(vals))
    return out


# =============================================================================
# SCENARIO RUNNERS — each emits the protocol's machine-readable gate shape
# =============================================================================

def _result(warnings: list, blocks: list) -> str:
    return "block" if blocks else ("watch" if warnings else "pass")


def sim_02_incidence(config: dict) -> dict:
    m = _median_runs(config)
    warnings, blocks = [], []
    # Watch: any ordinary group bears more effective burden than concentrated
    # source holders. Net burden for households is (paid - stake received);
    # a negative value means the group comes out ahead.
    worst_quintile = max(m["quintile_net_burden"])
    if worst_quintile > m["holder_burden"]:
        warnings.append("ORDINARY_BURDEN_EXCEEDS_HOLDER_BURDEN")
    # Block test (material burden on a protected class) is NOT evaluable:
    # protected classes are not modeled. Stated explicitly.
    return {
        "scenario_id": "CRUS-SIM-02",
        "result": _result(warnings, blocks),
        "warnings": warnings,
        "blocks": blocks,
        "metrics": {
            "quintile_net_burden_q1_to_q5": [round(x, 5) for x in m["quintile_net_burden"]],
            "concentrated_holder_burden": round(m["holder_burden"], 5),
            "household_direct_charge_total": round(m["household_direct_charge_total"], 2),
        },
        "not_evaluated": ["protected-class block test (protected classes not modeled)"],
        "plain_language_failure": (
            "an ordinary wealth group would pay more of its wealth than the "
            "concentrated holders the charge is aimed at"
            if warnings else ""),
    }


def sim_03_pass_through(config: dict) -> dict:
    # Sweep pass-through behavior; the gate applies to the realized share of
    # the charge landing on ordinary households.
    sweep = {}
    warnings, blocks = [], []
    for ptr in (0.0, 0.10, 0.25, 0.50):
        m = _median_runs(config, pass_through_rate=ptr)
        sweep[f"behavioral_ptr_{ptr:.2f}"] = round(m["pass_through_rate"], 4)
    base = _median_runs(config)
    realized = base["pass_through_rate"]
    if realized > GATES["pass_through_block"]:
        blocks.append("PASS_THROUGH_BLOCK")
    elif realized > GATES["pass_through_watch"]:
        warnings.append("PASS_THROUGH_WATCH")
    return {
        "scenario_id": "CRUS-SIM-03",
        "result": _result(warnings, blocks),
        "warnings": warnings,
        "blocks": blocks,
        "metrics": {"pass_through_rate": round(realized, 4),
                    "pass_through_sweep": sweep},
        "not_evaluated": ["dignity-floor block test (essential-goods prices not modeled)"],
        "plain_language_failure": (
            "renters and consumers absorb a visible share of a charge aimed "
            "at scarcity value" if (warnings or blocks) else ""),
    }


def sim_05_avoidance(config: dict) -> dict:
    m = _median_runs(config)
    warnings, blocks = [], []
    if m["erosion_rate"] > GATES["erosion_block"]:
        blocks.append("EROSION_BLOCK")
    elif m["erosion_rate"] > GATES["erosion_watch"]:
        warnings.append("EROSION_WATCH")
    if m["avoidance_profitable"]:
        blocks.append("AVOIDANCE_PROFITABLE_AFTER_PENALTIES")
    return {
        "scenario_id": "CRUS-SIM-05",
        "result": _result(warnings, blocks),
        "warnings": warnings,
        "blocks": blocks,
        "metrics": {
            "assessed_value_erosion_rate": round(m["erosion_rate"], 4),
            "avoidance_profitable_after_penalties": m["avoidance_profitable"],
            "hiding_detection_prob": config["hiding_detection_prob"],
            "hiding_penalty_multiple": config["hiding_penalty_multiple"],
        },
        "not_evaluated": ["treaty routing and cross-border migration (single-jurisdiction model)"],
        "plain_language_failure": (
            "wealthy holders can hide enough value to shrink the public's "
            "return, and hiding still pays" if blocks else
            ("hidden value erodes the base beyond the watch line" if warnings else "")),
    }


def sim_07_non_convertibility(config: dict) -> dict:
    m = _median_runs(config)
    warnings, blocks = [], []
    # Watch: any repeatable market. More than one successful sale per year
    # across the population is treated as repeatable.
    if m["stake_sales_successful"] > 1:
        warnings.append("REPEATABLE_STAKE_MARKET")
    # Block list (conversion into Voice/office/survival priority etc.) is not
    # modeled — only economic sale attempts are.
    return {
        "scenario_id": "CRUS-SIM-07",
        "result": _result(warnings, blocks),
        "warnings": warnings,
        "blocks": blocks,
        "metrics": {
            "stake_sale_attempts": m["stake_sale_attempts"],
            "stake_sales_successful": m["stake_sales_successful"],
            "sale_detection_prob": config["stake_sale_detection_prob"],
        },
        "not_evaluated": ["conversion into Voice, office, survival priority, or standing (institutional channels not modeled)"],
        "plain_language_failure": (
            "a broker market in Universal Stake payments persists despite "
            "detection" if warnings else ""),
    }


def sim_10_admin_burden(config: dict) -> dict:
    m = _median_runs(config)
    warnings, blocks = [], []
    if m["admin_share"] > GATES["admin_block"]:
        blocks.append("ADMIN_COST_BLOCK")
    elif m["admin_share"] > GATES["admin_watch"]:
        warnings.append("ADMIN_COST_WATCH")
    return {
        "scenario_id": "CRUS-SIM-10",
        "result": _result(warnings, blocks),
        "warnings": warnings,
        "blocks": blocks,
        "metrics": {"admin_cost_share": round(m["admin_share"], 4)},
        "not_evaluated": ["appeal-abandonment block test (claimant process burden not modeled)"],
        "plain_language_failure": (
            "running the system eats the value it collects" if (warnings or blocks) else ""),
    }


def sim_11_downturn(config: dict) -> dict:
    base = _median_runs(config)
    down = _median_runs(config, downturn=True)
    warnings, blocks = [], []
    fall = 1.0 - down["net_receipts"] / max(base["net_receipts"], 1e-9)
    reserve_covers_fall = base["reserves"] >= (base["net_receipts"] - down["net_receipts"])
    if fall > GATES["downturn_watch"] and not reserve_covers_fall:
        warnings.append("DOWNTURN_RECEIPTS_WATCH")
    return {
        "scenario_id": "CRUS-SIM-11",
        "result": _result(warnings, blocks),
        "warnings": warnings,
        "blocks": blocks,
        "metrics": {
            "net_receipt_fall": round(fall, 4),
            "asset_value_decline_modeled": config["downturn_value_decline"],
            "reserve_covers_fall": bool(reserve_covers_fall),
        },
        "not_evaluated": ["legal-challenge and appeal-surge stress; prohibited-funding block test"],
        "plain_language_failure": (
            "a recession cuts the public's return faster than reserves can "
            "cover" if warnings else ""),
    }


def _capture_year(config: dict, seed: int, exemption_prob: float) -> dict:
    """
    One assessment year with a captured insider network working two
    discretionary levers, plus a dashboard auditor reading the public
    source-by-source accounting.

    Lever A (holder side, n=20): discretionary assessment exemptions for
    aligned holders. Lever B (household side, n=500): delayed Stake payments
    for unaligned households. Audit shielding of aligned avoiders is NOT
    modeled (interaction with SIM-05 machinery deferred).

    The auditor recomputes the dashboard's concentration ratio from the
    published per-decision data and flags capture when the observed ratio
    of favorable-treatment rates crosses the published threshold. Detection
    power is therefore purely a function of sample size and effect size —
    exactly the dashboard's real situation.
    """
    cfg = config
    rng = np.random.default_rng(seed)
    year = CrusYear(config, seed=seed)
    base = year.run()

    n_holders = cfg["n_concentrated_holders"]
    n_households = cfg["n_households"]
    holder_aligned = rng.random(n_holders) < cfg["aligned_holder_fraction"]
    household_aligned = rng.random(n_households) < cfg["aligned_household_fraction"]

    # Lever A: discretionary exemptions on aligned holders' charges
    holder_charge = year.holder_assessed * cfg["assessment_rate_annual"]
    exempted = holder_aligned & (rng.random(n_holders) < exemption_prob)
    relief = np.where(exempted, holder_charge * cfg["capture_exemption_relief"], 0.0)
    diverted_exemptions = relief.sum()

    # Lever B: delayed Stake payments for unaligned households
    delayed = ~household_aligned & (rng.random(n_households) < cfg["capture_delay_prob"])
    stake = base["stake_per_household"]
    diverted_timing = delayed.sum() * stake * cfg["capture_delay_cost"]

    gross = max(base["gross_receipts"], 1e-9)
    diverted_exemption_share = diverted_exemptions / gross
    diverted_timing_share = diverted_timing / gross
    diverted_share = diverted_exemption_share + diverted_timing_share

    # Dashboard auditor: concentration ratios from published decisions.
    def rate(favored, group):
        n = group.sum()
        return (favored & group).sum() / n if n > 0 else 0.0

    eps = 1e-9
    holder_ratio = (rate(exempted, holder_aligned) + eps) / (rate(exempted, ~holder_aligned) + eps)
    household_ratio = (rate(delayed, ~household_aligned) + eps) / (rate(delayed, household_aligned) + eps)
    threshold = cfg["dashboard_concentration_threshold"]
    # A ratio is only assessable when both groups produced enough decisions
    # to publish (dashboard rule: publish methods and thresholds, show
    # concentration — but a ratio over 1-2 events is noise, not signal).
    holder_assessable = exempted.sum() >= 3
    household_assessable = delayed.sum() >= 3
    holder_detected = bool(holder_assessable and holder_ratio > threshold)
    household_detected = bool(household_assessable and household_ratio > threshold)

    return {
        "diverted_share": diverted_share,
        "diverted_exemption_share": diverted_exemption_share,
        "diverted_timing_share": diverted_timing_share,
        "holder_detected": holder_detected,
        "household_detected": household_detected,
        "any_detected": holder_detected or household_detected,
    }


def sim_09_routing_capture(config: dict) -> dict:
    """
    CRUS-SIM-09 gate logic:

    FC-207 specifies rule-bound allocation (no patronage discretion) — under
    that regime this scenario passes by construction, because the levers do
    not exist. The simulation therefore tests the counterfactual the gate
    actually guards against: if the levers exist, is the diversion visible?
    Watch whenever any modeled diversion evades reliable dashboard detection,
    because then the pass rests entirely on the levers staying closed.

    Levers are gated INDEPENDENTLY (the protocol's own rule: aggregates
    cannot hide subgroup harm). A cautious network would use only its
    lowest-visibility lever, so combined "any lever detected" rates would
    overstate dashboard power: the household-side lever (n=500) is trivially
    detectable and would mask the holder-side lever (n=20) hiding in noise.
    """
    warnings, blocks = [], []
    sweep = {}
    undetected_ceiling = 0.0
    for exemption_prob in (0.2, 0.5, 0.8):
        runs = [_capture_year(config, seed=4000 + i, exemption_prob=exemption_prob)
                for i in range(config["n_runs"])]
        diverted = float(np.median([r["diverted_share"] for r in runs]))
        diverted_holder_only = float(np.median([r["diverted_exemption_share"] for r in runs]))
        diverted_timing_only = float(np.median([r["diverted_timing_share"] for r in runs]))
        det_holder = float(np.mean([r["holder_detected"] for r in runs]))
        det_household = float(np.mean([r["household_detected"] for r in runs]))
        sweep[f"exemption_prob_{exemption_prob:.1f}"] = {
            "diverted_share_both_levers": round(diverted, 4),
            "holder_lever_diverted_share": round(diverted_holder_only, 4),
            "holder_side_detection_rate": round(det_holder, 3),
            "household_lever_diverted_share": round(diverted_timing_only, 4),
            "household_side_detection_rate": round(det_household, 3),
        }
        # Per-lever gating: a lever that diverts value while its own
        # detection rate is unreliable is an evasion route.
        if det_holder < 0.8 and diverted_holder_only > undetected_ceiling:
            undetected_ceiling = diverted_holder_only
        if det_household < 0.8 and diverted_timing_only > undetected_ceiling:
            undetected_ceiling = diverted_timing_only
    if undetected_ceiling > 0:
        warnings.append("CAPTURE_EVADES_DASHBOARD_DETECTION")
    return {
        "scenario_id": "CRUS-SIM-09",
        "result": _result(warnings, blocks),
        "warnings": warnings,
        "blocks": blocks,
        "metrics": {
            "rule_bound_regime": "passes by construction (no levers exist under FC-207)",
            "discretionary_sweep": sweep,
            "max_diversion_below_reliable_detection": round(undetected_ceiling, 4),
            "dashboard_threshold": config["dashboard_concentration_threshold"],
            "n_holders": config["n_concentrated_holders"],
            "n_households": config["n_households"],
        },
        "not_evaluated": [
            "audit shielding of aligned avoiders (SIM-05 interaction deferred)",
            "public-message and arrears levers",
        ],
        "plain_language_failure": (
            "at pilot scale, favoritism on the holder side hides inside "
            "statistical noise; the anti-favoritism rule carries all the "
            "weight because the dashboard cannot reliably see violations"
            if warnings else ""),
    }


NOT_RUN = {
    "CRUS-SIM-01": "base-case source-base assessment needs real valuation ranges",
    "CRUS-SIM-04": "valuation hiding via appraisal/IP/estate structures needs a legal red team",
    "CRUS-SIM-06": "eligibility, false exclusion, and data exposure need human/institutional testing",
    "CRUS-SIM-08": "compound convertibility bundles need institutional channel modeling",
    "CRUS-SIM-12": "work and stewardship effects need a production economy model",
    "CRUS-SIM-13": "fiscal adequacy needs named obligations and real revenue scales",
    "CRUS-SIM-14": "public comprehension needs reader testing, not simulation",
}


def run_packet(config: dict = CRUS_CONFIG) -> dict:
    """Run all simulable scenarios; emit the protocol's packet shape."""
    scenarios = [
        sim_02_incidence(config),
        sim_03_pass_through(config),
        sim_05_avoidance(config),
        sim_07_non_convertibility(config),
        sim_09_routing_capture(config),
        sim_10_admin_burden(config),
        sim_11_downturn(config),
    ]
    scenarios.extend(
        {"scenario_id": sid, "result": "not_run", "warnings": [], "blocks": [],
         "metrics": {}, "plain_language_failure": "", "reason": reason}
        for sid, reason in NOT_RUN.items()
    )
    scenarios.sort(key=lambda s: s["scenario_id"])
    summary = {
        "pass": [s["scenario_id"] for s in scenarios if s["result"] == "pass"],
        "watch": [s["scenario_id"] for s in scenarios if s["result"] == "watch"],
        "block": [s["scenario_id"] for s in scenarios if s["result"] == "block"],
        "not_run": [s["scenario_id"] for s in scenarios if s["result"] == "not_run"],
    }
    return {"packet": "CRUS-PACKET-001", "config": config,
            "summary": summary, "scenarios": scenarios}


if __name__ == "__main__":
    packet = run_packet()
    print(json.dumps(packet, indent=2, default=str))
