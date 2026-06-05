from unittest.mock import MagicMock, patch

import pytest

from simulations.model_outline import (
    AdversarialAgent,
    CitizenAgent,
    CONFIG,
    FlowState,
    calculate_commons_return_due,
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
