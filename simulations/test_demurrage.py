import pytest
import numpy as np
from model_outline import CitizenAgent, ProtocolModel, ECState, CONFIG

@pytest.fixture
def agent():
    model = ProtocolModel()
    # Initialize agent with enough balance to avoid immediate retirement on decay
    agent = CitizenAgent(1, model, "HOUSING")
    agent.ec_balance = 100.0
    agent.days_idle = 0
    return agent

def test_demurrage_idle_increments_days(agent):
    """Test that IDLE state increments days_idle."""
    agent.ec_state = ECState.IDLE
    agent.days_idle = 5

    agent._apply_ec_demurrage()

    assert agent.days_idle == 6
    # Balance should not decay yet
    assert agent.ec_balance == 100.0
    assert agent.ec_state == ECState.IDLE

def test_demurrage_active_resets_days(agent):
    """Test that ACTIVE state resets days_idle to 0."""
    agent.ec_state = ECState.ACTIVE
    agent.days_idle = 15

    agent._apply_ec_demurrage()

    assert agent.days_idle == 0
    assert agent.ec_balance == 100.0
    assert agent.ec_state == ECState.ACTIVE

def test_demurrage_decay_applied(agent):
    """Test that decay is applied when days_idle reaches the threshold."""
    # Set to one day less than threshold so that incrementing it hits the threshold
    agent.ec_state = ECState.IDLE
    agent.days_idle = CONFIG["idle_threshold_days"] - 1

    agent._apply_ec_demurrage()

    assert agent.days_idle == CONFIG["idle_threshold_days"]

    # Calculate expected decay
    r = CONFIG["demurrage_rate_monthly"] / 30
    expected_balance = 100.0 * np.exp(-r)

    assert np.isclose(agent.ec_balance, expected_balance)
    assert agent.ec_state == ECState.DECAYED

def test_demurrage_retirement(agent):
    """Test that balance goes to 0 and state becomes RETIRED if balance drops below minimum."""
    agent.ec_state = ECState.IDLE
    agent.days_idle = CONFIG["idle_threshold_days"]

    # Set initial balance so that one day of decay drops it below the minimum threshold
    # e.g. min_ec_balance is 0.01
    r = CONFIG["demurrage_rate_monthly"] / 30
    # Make it exactly equal to min_ec_balance before decay, so after decay it's below
    agent.ec_balance = CONFIG["min_ec_balance"]

    agent._apply_ec_demurrage()

    assert agent.ec_balance == 0.0
    assert agent.ec_state == ECState.RETIRED

def test_demurrage_other_states_do_not_affect_days_idle(agent):
    """Test that states other than IDLE and ACTIVE do not modify days_idle."""
    agent.ec_state = ECState.COMMITTED
    agent.days_idle = 10

    agent._apply_ec_demurrage()

    assert agent.days_idle == 10
    assert agent.ec_balance == 100.0
    assert agent.ec_state == ECState.COMMITTED
