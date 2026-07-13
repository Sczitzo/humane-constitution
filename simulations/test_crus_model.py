import numpy as np
import pytest

from simulations.crus_model import CRUS_CONFIG, CrusYear, run_packet


def _cfg(**overrides):
    cfg = dict(CRUS_CONFIG)
    cfg["n_runs"] = 3
    cfg.update(overrides)
    return cfg


def test_receipts_accounting_conserves():
    """Reserves + lockbox + stake pool must equal net receipts."""
    m = CrusYear(_cfg(), seed=1).run()
    total = m["reserves"] + m["lockbox"] + m["stake_per_household"] * CRUS_CONFIG["n_households"]
    assert total == pytest.approx(m["net_receipts"], rel=1e-9)


def test_protected_use_threshold_exempts_ordinary_households():
    """With a high protected-use threshold, no household pays a direct charge."""
    m = CrusYear(_cfg(protected_use_threshold=1e9), seed=1).run()
    assert m["household_direct_charge_total"] == 0.0


def test_zero_pass_through_means_no_realized_shift():
    m = CrusYear(_cfg(), seed=1).run(pass_through_rate=0.0)
    assert m["pass_through_rate"] == 0.0


def test_full_detection_eliminates_erosion():
    """With 100% detection of hiding, no assessed value erodes."""
    m = CrusYear(_cfg(hiding_detection_prob=1.0), seed=1).run()
    assert m["erosion_rate"] == 0.0
    assert m["avoidance_profitable"] is False


def test_no_detection_makes_avoidance_profitable_and_erosive():
    m = CrusYear(_cfg(hiding_detection_prob=0.0), seed=1).run()
    assert m["erosion_rate"] > 0.0
    assert m["avoidance_profitable"] is True


def test_downturn_reduces_receipts():
    base = CrusYear(_cfg(), seed=1).run()
    down = CrusYear(_cfg(), seed=1, downturn=True).run()
    assert down["gross_receipts"] < base["gross_receipts"]


def test_packet_covers_all_fourteen_scenarios():
    packet = run_packet(_cfg())
    ids = {s["scenario_id"] for s in packet["scenarios"]}
    assert ids == {f"CRUS-SIM-{i:02d}" for i in range(1, 15)}
    # Every scenario carries a definite result
    for s in packet["scenarios"]:
        assert s["result"] in ("pass", "watch", "block", "not_run")


def test_gate_classification_flags_block_on_unprofitable_enforcement():
    """With no detection, avoidance stays profitable — SIM-05 must block."""
    packet = run_packet(_cfg(hiding_detection_prob=0.0))
    sim05 = next(s for s in packet["scenarios"] if s["scenario_id"] == "CRUS-SIM-05")
    assert sim05["result"] == "block"
    assert "AVOIDANCE_PROFITABLE_AFTER_PENALTIES" in sim05["blocks"]


# =============================================================================
# CRUS-SIM-09 ROUTING CAPTURE TESTS
# =============================================================================

from simulations.crus_model import _capture_year, sim_09_routing_capture


def test_no_capture_levers_divert_nothing():
    """With zero exemption and delay probabilities, nothing is diverted."""
    cfg = _cfg(capture_delay_prob=0.0)
    r = _capture_year(cfg, seed=1, exemption_prob=0.0)
    assert r["diverted_share"] == 0.0
    assert r["any_detected"] is False


def test_blatant_holder_capture_diverts_value():
    """Near-certain exemptions for aligned holders divert a visible share."""
    cfg = _cfg(capture_delay_prob=0.0)
    r = _capture_year(cfg, seed=1, exemption_prob=1.0)
    assert r["diverted_share"] > 0.0


def test_household_side_detection_has_power_at_scale():
    """The household lever (n=500) produces a detectable concentration ratio:
    delays hit only unaligned households, so the published ratio is extreme."""
    cfg = _cfg(capture_delay_prob=0.5)
    detections = [
        _capture_year(cfg, seed=s, exemption_prob=0.0)["household_detected"]
        for s in range(10)
    ]
    assert sum(detections) >= 8  # reliable detection at n=500


def test_sim09_reports_all_sweep_points():
    out = sim_09_routing_capture(_cfg())
    assert out["scenario_id"] == "CRUS-SIM-09"
    assert set(out["metrics"]["discretionary_sweep"].keys()) == {
        "exemption_prob_0.2", "exemption_prob_0.5", "exemption_prob_0.8"
    }
    assert out["result"] in ("pass", "watch", "block")


# =============================================================================
# CRUS-SIM-08 COMPOUND CONVERTIBILITY TESTS
# =============================================================================

from simulations.crus_model import sim_08_compound_convertibility


def test_full_bundle_detection_kills_market():
    """With 100% detection every bundled offer is caught: no market."""
    out = sim_08_compound_convertibility(_cfg(bundle_detection_prob=1.0))
    assert out["metrics"]["bundle_successes"] == 0
    assert out["result"] == "pass"


def test_low_detection_yields_repeatable_bundle_watch():
    """With no detection, default offer/acceptance rates sustain a market."""
    out = sim_08_compound_convertibility(_cfg(bundle_detection_prob=0.0))
    assert "REPEATABLE_BUNDLED_MARKET" in out["warnings"]
    assert out["result"] == "watch"


def test_sim08_never_emits_block():
    """The block gate (conversion into institutional standing) is not
    evaluable in an economic model: blocks stay empty under any config,
    and the institutional list is declared not_evaluated."""
    for overrides in ({},
                      {"bundle_detection_prob": 0.0,
                       "bundle_acceptance": 1.0,
                       "bundle_offer_rate": 1.0}):
        out = sim_08_compound_convertibility(_cfg(**overrides))
        assert out["blocks"] == []
        assert any("institutional channels not modeled" in item
                   for item in out["not_evaluated"])


def test_bundle_asset_split_sums_to_successes():
    m = CrusYear(_cfg(), seed=1).run()
    assert sum(m["bundle_successes_by_asset"]) == m["bundle_successes"]
