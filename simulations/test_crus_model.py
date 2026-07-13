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
