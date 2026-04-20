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

def test_demurrage_committed_state_increments_days_idle(agent):
    """
    P-023 (COMMITTED state discipline — P-028 fix): EC in escrow accrues demurrage.
    'Discipline is the point' — demurrage continues during milestone escrow.

    Prior implementation (pre-P-028): COMMITTED did not increment days_idle,
    making escrow a de-facto demurrage-exempt state (contradicting P-023).

    Sim G (ADVERSARIAL_AUDIT.md Phase 2) documented the divergence:
      - Prior broken behavior at 60-day escrow: balance = 100.00 (no decay)
      - P-023 design at 60-day escrow:          balance ≈  73.34 (~26.7% decay)

    This test must PASS. If it fails, COMMITTED state is still demurrage-exempt.
    """
    agent.ec_state = ECState.COMMITTED
    agent.days_idle = 5

    agent._apply_ec_demurrage()

    # P-023: COMMITTED increments days_idle, same as IDLE
    assert agent.days_idle == 6, (
        "COMMITTED state must increment days_idle per P-023 demurrage discipline. "
        "Failure means escrow is demurrage-exempt — contradicts P-023 design intent."
    )
    assert agent.ec_balance == 100.0  # no decay yet (below threshold)
    assert agent.ec_state == ECState.COMMITTED  # escrow still active


def test_demurrage_committed_decays_at_threshold(agent):
    """
    P-023: After idle threshold is reached in COMMITTED state, balance decays.
    State remains COMMITTED after decay — escrow obligation persists even as
    balance declines. This enforces the discipline without terminating the contract.
    """
    agent.ec_state = ECState.COMMITTED
    agent.days_idle = CONFIG["idle_threshold_days"] - 1
    agent.ec_balance = 100.0

    agent._apply_ec_demurrage()

    assert agent.days_idle == CONFIG["idle_threshold_days"]

    r = CONFIG["demurrage_rate_monthly"] / 30
    expected_balance = 100.0 * np.exp(-r)
    assert np.isclose(agent.ec_balance, expected_balance)

    # State remains COMMITTED — the escrow is still active after decay
    assert agent.ec_state == ECState.COMMITTED


def test_demurrage_settled_state_does_not_affect_days_idle(agent):
    """
    SETTLED state (escrow released after verified milestone completion) is
    correctly exempt from idle accrual. Demurrage applies during active escrow
    (COMMITTED), not after successful completion (SETTLED). This is a renamed
    version of the prior 'other_states' test, scoped to the correct state.
    """
    agent.ec_state = ECState.SETTLED
    agent.days_idle = 10

    agent._apply_ec_demurrage()

    assert agent.days_idle == 10
    assert agent.ec_balance == 100.0
    assert agent.ec_state == ECState.SETTLED
