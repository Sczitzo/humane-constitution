from unittest.mock import MagicMock, patch

import pytest

from simulations.model_outline import (
    AdversarialAgent,
    CitizenAgent,
    CONFIG,
    FlowState,
    calculate_commons_return_due,
    evaluate_crus_simulation_case,
    universal_stake_transfer_allowed,
)


def _mock_model(config: dict | None = None):
    model = MagicMock()
    model.config = dict(CONFIG if config is None else config)
    model.schedule.steps = 0
    model.commons_return_ledger = []
    model.capture_risk_log = []
    model.enforcement_log = []
    model.bypass_success_log = []
    model.social_wealth_fund_balance = 0.0
    model.universal_stake_pool = 0.0
    return model


def test_protected_ordinary_balance_is_not_assessed():
    due = calculate_commons_return_due(
        "ORDINARY_WORKING_BALANCE",
        assessed_value=1_000_000.0,
        config=CONFIG,
    )

    assert due == 0.0


def test_commons_source_base_is_assessed_above_protected_threshold():
    config = dict(CONFIG)
    config["commons_return_protected_threshold"] = 1_000.0
    config["commons_return_rate"] = 0.05

    due = calculate_commons_return_due(
        "LAND_LOCATION_VALUE",
        assessed_value=3_000.0,
        config=config,
    )

    assert due == pytest.approx(100.0)


@pytest.mark.parametrize(
    "action",
    [
        "SELL",
        "ASSIGN",
        "PLEDGE",
        "GARNISH",
        "INHERIT",
        "BUY_VOICE",
        "BUY_OFFICE",
        "BUY_MEMBERSHIP",
        "BUY_SURVIVAL_PRIORITY",
        "BUY_LEGAL_STANDING",
        "BUY_PUBLIC_FAVOR",
    ],
)
def test_universal_stake_cannot_be_converted_or_assigned(action):
    assert universal_stake_transfer_allowed(action) is False


def test_idle_or_committed_flow_does_not_decay():
    model = _mock_model()
    agent = CitizenAgent(1, model, "HOUSING")
    agent.flow_balance = 100.0
    agent.universal_stake_balance = 0.0
    agent.flow_state = FlowState.COMMITTED
    agent.commons_return_source_base = "ORDINARY_WORKING_BALANCE"
    agent.exclusive_commons_value = 1_000_000.0

    agent._apply_commons_return_and_universal_stake()

    assert agent.flow_balance == 100.0
    assert agent.flow_state == FlowState.COMMITTED
    assert agent.universal_stake_balance == pytest.approx(CONFIG["universal_stake_daily"])
    assert model.commons_return_ledger == []


def test_commons_return_routes_to_fund_and_stake_pool():
    config = dict(CONFIG)
    config["commons_return_protected_threshold"] = 0.0
    config["commons_return_rate"] = 0.10
    config["social_wealth_fund_share"] = 0.40
    model = _mock_model(config)
    agent = CitizenAgent(2, model, "PRODUCTION")
    agent.flow_balance = 1_000.0
    agent.commons_return_source_base = "NETWORK_RENT"
    agent.exclusive_commons_value = 500.0

    agent._apply_commons_return_and_universal_stake()

    assert agent.commons_return_paid == pytest.approx(50.0)
    assert agent.flow_balance == pytest.approx(950.0)
    assert model.social_wealth_fund_balance == pytest.approx(20.0)
    assert model.universal_stake_pool == pytest.approx(30.0)
    assert model.commons_return_ledger[0]["source_base"] == "NETWORK_RENT"


def test_capture_attempt_blocks_stake_assignment_and_logs_valuation_hiding():
    model = _mock_model()
    agent = AdversarialAgent(3, model, "PRODUCTION")

    agent._attempt_crus_capture()

    assert model.enforcement_log[0]["type"] == "UNIVERSAL_STAKE_ASSIGNMENT"
    assert model.enforcement_log[0]["outcome"] == "BLOCKED"
    assert model.capture_risk_log[0]["type"] == "VALUATION_HIDING_ATTEMPT"


def test_shadow_conversion_detection_probability_blocks_bypass():
    model = _mock_model()
    agent = AdversarialAgent(4, model, "PRODUCTION")
    agent.flow_balance = 0.0

    with patch("numpy.random.random", return_value=0.50):
        result = agent._attempt_shadow_conversion()

    assert result is False
    assert agent.bypass_attempts == 1
    assert agent.bypass_successes == 0
    assert agent.flow_balance == 0.0
    assert model.enforcement_log[0]["type"] == "SHADOW_CONVERSION"
    assert model.enforcement_log[0]["outcome"] == "DETECTED"
    assert model.bypass_success_log == []


def test_crus_gate_warns_when_ordinary_life_bears_more_than_source_holder():
    result = evaluate_crus_simulation_case({
        "scenario_id": "CRUS-SIM-02",
        "gross_receipts": 10_000.0,
        "ordinary_life_burden": 400.0,
        "concentrated_source_holder_burden": 250.0,
    })

    assert result["result"] == "watch"
    assert "ORDINARY_INCIDENCE_WATCH" in result["warnings"]


def test_crus_gate_blocks_protected_class_incidence_without_shell_finding():
    result = evaluate_crus_simulation_case({
        "scenario_id": "CRUS-SIM-02",
        "gross_receipts": 10_000.0,
        "protected_class_burden": 1.0,
        "protected_class_is_avoidance_shell": False,
    })

    assert result["result"] == "block"
    assert "PROTECTED_CLASS_INCIDENCE_BLOCK" in result["blocks"]


def test_crus_gate_blocks_high_pass_through_to_ordinary_life():
    result = evaluate_crus_simulation_case({
        "scenario_id": "CRUS-SIM-03",
        "gross_receipts": 10_000.0,
        "pass_through_rate": 0.26,
    })

    assert result["result"] == "block"
    assert "PASS_THROUGH_BLOCK" in result["blocks"]


def test_crus_gate_blocks_profitable_avoidance_after_detection_and_penalty():
    config = dict(CONFIG)
    config["commons_return_protected_threshold"] = 0.0
    config["commons_return_rate"] = 0.10
    result = evaluate_crus_simulation_case({
        "scenario_id": "CRUS-SIM-05",
        "source_base": "LAND_LOCATION_VALUE",
        "assessed_value": 100_000.0,
        "avoided_value": 4_000.0,
        "detection_probability": 0.05,
        "penalty_multiplier": 1.0,
        "avoidance_cost": 10.0,
    }, config=config)

    assert result["result"] == "block"
    assert result["metrics"]["expected_avoidance_profit"] > 0
    assert "AVOIDANCE_BLOCK" in result["blocks"]


def test_crus_gate_warns_on_downturn_without_reserve_plan():
    result = evaluate_crus_simulation_case({
        "scenario_id": "CRUS-SIM-11",
        "gross_receipts": 10_000.0,
        "downturn_receipt_drop": 0.21,
        "reserve_and_unwind_plan": False,
    })

    assert result["result"] == "watch"
    assert "DOWNTURN_WATCH" in result["warnings"]


def test_crus_gate_blocks_compound_convertibility_bundle():
    result = evaluate_crus_simulation_case({
        "scenario_id": "CRUS-SIM-08",
        "gross_receipts": 10_000.0,
        "repeatable_bundled_exchange": True,
    })

    assert result["result"] == "block"
    assert "COMPOUND_CONVERTIBILITY_BLOCK" in result["blocks"]
