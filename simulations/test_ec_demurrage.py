import pytest
import numpy as np
from unittest.mock import MagicMock
from simulations.model_outline import CitizenAgent, ECState, CONFIG

@pytest.fixture
def mock_model():
    """Provides a mocked ProtocolModel to avoid instantiating the whole simulation."""
    model = MagicMock()
    model.schedule.steps = 0
    return model

@pytest.fixture
def agent(mock_model):
    """Provides a fresh CitizenAgent for testing."""
    return CitizenAgent(unique_id=1, model=mock_model, sector="HOUSING")

def test_ec_demurrage_increments_idle_days(agent, monkeypatch):
    """Test that days_idle increments when state is IDLE and threshold is not met."""
    monkeypatch.setitem(CONFIG, "idle_threshold_days", 30)

    agent.ec_state = ECState.IDLE
    agent.days_idle = 10
    agent.ec_balance = 100.0

    agent._apply_ec_demurrage()

    assert agent.days_idle == 11
    assert agent.ec_state == ECState.IDLE
    assert agent.ec_balance == 100.0 # Balance should not change before threshold

def test_ec_demurrage_resets_idle_days_when_active(agent, monkeypatch):
    """Test that days_idle resets to 0 when state is ACTIVE."""
    monkeypatch.setitem(CONFIG, "idle_threshold_days", 30)

    agent.ec_state = ECState.ACTIVE
    agent.days_idle = 15
    agent.ec_balance = 100.0

    agent._apply_ec_demurrage()

    assert agent.days_idle == 0
    assert agent.ec_state == ECState.ACTIVE
    assert agent.ec_balance == 100.0

def test_ec_demurrage_applies_decay_at_threshold(agent, monkeypatch):
    """Test that exponential decay applies when days_idle reaches threshold."""
    monkeypatch.setitem(CONFIG, "idle_threshold_days", 30)
    monkeypatch.setitem(CONFIG, "demurrage_rate_monthly", 0.03) # 3% monthly
    monkeypatch.setitem(CONFIG, "min_ec_balance", 0.01)

    agent.ec_state = ECState.IDLE
    agent.days_idle = 29
    agent.ec_balance = 100.0

    # Action
    agent._apply_ec_demurrage()

    # Assert
    assert agent.days_idle == 30

    # Expected r = 0.03 / 30 = 0.001
    # expected balance = 100.0 * exp(-0.001) ≈ 99.90005
    expected_balance = 100.0 * np.exp(-0.001)

    assert np.isclose(agent.ec_balance, expected_balance)
    assert agent.ec_state == ECState.DECAYED

def test_ec_demurrage_retires_balance_below_minimum(agent, monkeypatch):
    """Test that balance goes to 0 and state to RETIRED when decayed below min_ec_balance."""
    monkeypatch.setitem(CONFIG, "idle_threshold_days", 30)
    monkeypatch.setitem(CONFIG, "demurrage_rate_monthly", 0.03)
    monkeypatch.setitem(CONFIG, "min_ec_balance", 1.0)

    agent.ec_state = ECState.IDLE
    agent.days_idle = 30
    agent.ec_balance = 1.0005  # slightly above 1.0, decay will push it below 1.0

    # Action
    agent._apply_ec_demurrage()

    # Assert
    assert agent.days_idle == 31
    assert agent.ec_balance == 0.0
    assert agent.ec_state == ECState.RETIRED
