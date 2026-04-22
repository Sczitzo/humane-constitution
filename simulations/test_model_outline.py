import pytest
import numpy as np
from unittest.mock import patch, MagicMock
from simulations.model_outline import OracleNode, OracleSubsystem, ColludingOracleNode, CONFIG

# =============================================================================
# ORACLE CONSENSUS TESTS — addressing Sim H gap
#
# Prior adversarial review identified that the test
# suite had zero coverage of the oracle consensus mechanism. Only single-node
# reads were tested. These tests verify:
#   1. Normal multi-node consensus (median of valid readings)
#   2. N=3: 2-node collusion forges inflated quorum (CRITICAL FAIL case)
#   3. N=5: 2-node collusion defeated by honest majority (PASS case, P-024)
#   4. Conservative hold when quorum not met
#   5. Methodology diversity enforcement (P-024 / Sim D)
# =============================================================================

class TestOracleConsensus:
    """
    Tests for OracleSubsystem.get_consensus_capacity() — previously untested.
    Each test constructs a subsystem with controlled node configurations to
    produce deterministic results without relying on random number generation.
    """

    def _make_subsystem_with_nodes(self, nodes: list) -> OracleSubsystem:
        """Helper: build an OracleSubsystem with a pre-specified node list."""
        subsystem = OracleSubsystem.__new__(OracleSubsystem)
        subsystem.nodes = nodes
        subsystem.failure_log = []
        subsystem.min_methodology_classes = 3
        return subsystem

    def test_normal_consensus_returns_median(self):
        """
        Three honest nodes with known deterministic readings.
        Consensus should be the median of [95, 100, 105] = 100.
        """
        nodes = [
            MagicMock(read_capacity=lambda tc: 95.0,  methodology_class="INSTITUTIONAL", is_active=True),
            MagicMock(read_capacity=lambda tc: 100.0, methodology_class="CBPR",          is_active=True),
            MagicMock(read_capacity=lambda tc: 105.0, methodology_class="PHYSICAL",       is_active=True),
        ]
        subsystem = self._make_subsystem_with_nodes(nodes)
        result = subsystem.get_consensus_capacity(100.0, consensus_type="Essential Access")
        assert result == pytest.approx(100.0)

    def test_n3_two_colluding_nodes_forge_quorum(self):
        """
        CRITICAL: At N=3 (pre-P-024 minimum), two colluding nodes returning
        140% of true capacity constitute a valid 2-node quorum.

        This test documents the BFT failure identified in PRD-003 / Test 1.
        At N=3, quorum = ⌈3/2⌉ + 1 = 2. Two colluding nodes = valid quorum.

        With P-024 (N=5), this attack is defeated. This test should FAIL
        if ever run against an N=5 subsystem (it documents the N=3 failure).

        Expected: consensus = 140.0 (inflated; true capacity = 100.0)
        Severity: CRITICAL — oracle accepts 40% inflation from colluding pair.
        """
        true_capacity = 100.0
        fabricated_capacity = 140.0  # 40% inflation

        nodes_n3 = [
            ColludingOracleNode(0, "INSTITUTIONAL", fabricated_capacity),
            ColludingOracleNode(1, "CBPR",          fabricated_capacity),
            # One honest node — outvoted
            MagicMock(read_capacity=lambda tc: true_capacity,
                      methodology_class="PHYSICAL", is_active=True),
        ]
        subsystem = self._make_subsystem_with_nodes(nodes_n3)
        # Disable diversity check for this N=3 legacy test
        subsystem.min_methodology_classes = 1

        result = subsystem.get_consensus_capacity(true_capacity, consensus_type="Essential Access")

        # The inflated value IS accepted at N=3 — this is the documented failure
        assert result == pytest.approx(fabricated_capacity), (
            "N=3 oracle accepts 2-node collusion. PRD-003 requires N≥5 to prevent this."
        )

    def test_n5_two_colluding_nodes_defeated_by_honest_majority(self):
        """
        P-024 fix: At N=5, a 2-node colluding pair is defeated.
        Quorum = ⌈5/2⌉ + 1 = 3 + 1... actually (5 // 2) + 1 = 3.
        Honest nodes: 3. Colluding nodes: 2. Median of [140, 140, 100, 100, 100] = 100.

        Expected: consensus = 100.0 (honest majority prevails)
        """
        true_capacity = 100.0
        fabricated_capacity = 140.0

        nodes_n5 = [
            ColludingOracleNode(0, "INSTITUTIONAL", fabricated_capacity),
            ColludingOracleNode(1, "INSTITUTIONAL", fabricated_capacity),
            # Three honest nodes
            MagicMock(read_capacity=lambda tc: true_capacity,
                      methodology_class="CBPR",        is_active=True),
            MagicMock(read_capacity=lambda tc: true_capacity,
                      methodology_class="CBPR",        is_active=True),
            MagicMock(read_capacity=lambda tc: true_capacity,
                      methodology_class="PHYSICAL",    is_active=True),
        ]
        subsystem = self._make_subsystem_with_nodes(nodes_n5)
        subsystem.min_methodology_classes = 1  # isolate BFT test from diversity check

        result = subsystem.get_consensus_capacity(true_capacity, consensus_type="Essential Access")

        # Honest majority prevails — collusion defeated
        assert result == pytest.approx(true_capacity), (
            "N=5 oracle should defeat 2-node colluding pair via honest majority."
        )

    def test_conservative_hold_when_quorum_not_met(self):
        """
        If fewer active nodes than quorum threshold, returns None (conservative hold).
        P-022 fallback: system defaults to conservative hold, not last known value.

        At N=5, quorum = 3. With only 1 active node, quorum is not met.
        Expected: None
        """
        nodes = [
            MagicMock(read_capacity=lambda tc: 100.0, methodology_class="PHYSICAL", is_active=True),
            MagicMock(read_capacity=lambda tc: None,   methodology_class="INSTITUTIONAL", is_active=False),
            MagicMock(read_capacity=lambda tc: None,   methodology_class="CBPR",          is_active=False),
            MagicMock(read_capacity=lambda tc: None,   methodology_class="INSTITUTIONAL", is_active=False),
            MagicMock(read_capacity=lambda tc: None,   methodology_class="CBPR",          is_active=False),
        ]
        subsystem = self._make_subsystem_with_nodes(nodes)
        subsystem.min_methodology_classes = 1

        result = subsystem.get_consensus_capacity(100.0, consensus_type="Essential Access")

        assert result is None, "Quorum failure must return None (conservative hold)."
        assert len(subsystem.failure_log) == 1
        assert subsystem.failure_log[0]["type"] == "QUORUM_FAILURE"

    def test_methodology_diversity_failure_triggers_conservative_hold(self):
        """
        P-024 / Sim D: If active quorum nodes are all the same methodology class,
        structural independence is violated → conservative hold (None).

        Even with 5 nodes active, if all are INSTITUTIONAL, the diversity check fails.
        Expected: None
        """
        # 5 active nodes, all INSTITUTIONAL — quorum is met but diversity fails
        nodes = [
            MagicMock(read_capacity=lambda tc: 100.0, methodology_class="INSTITUTIONAL", is_active=True),
            MagicMock(read_capacity=lambda tc: 100.0, methodology_class="INSTITUTIONAL", is_active=True),
            MagicMock(read_capacity=lambda tc: 100.0, methodology_class="INSTITUTIONAL", is_active=True),
            MagicMock(read_capacity=lambda tc: None,  methodology_class="CBPR",          is_active=False),
            MagicMock(read_capacity=lambda tc: None,  methodology_class="PHYSICAL",      is_active=False),
        ]
        subsystem = self._make_subsystem_with_nodes(nodes)
        # min_methodology_classes = 3 (default)

        result = subsystem.get_consensus_capacity(100.0, consensus_type="Essential Access")

        assert result is None, (
            "Single-class quorum must trigger methodology diversity failure → conservative hold."
        )
        diversity_failures = [e for e in subsystem.failure_log
                              if e["type"] == "METHODOLOGY_DIVERSITY_FAILURE"]
        assert len(diversity_failures) == 1

    def test_sq_supermajority_quorum_requires_higher_threshold(self):
        """
        Shared Storehouse activation requires supermajority: ⌈2N/3⌉.
        At N=5: Shared Storehouse quorum = ⌈10/3⌉ = 4. Essential Access quorum = 3.

        With 3 active nodes, Essential Access consensus succeeds but Shared Storehouse consensus fails.
        This verifies that Shared Storehouse activation has a higher quorum bar than Essential Access consensus.
        """
        nodes = [
            MagicMock(read_capacity=lambda tc: 100.0, methodology_class="INSTITUTIONAL", is_active=True),
            MagicMock(read_capacity=lambda tc: 100.0, methodology_class="CBPR",          is_active=True),
            MagicMock(read_capacity=lambda tc: 100.0, methodology_class="PHYSICAL",      is_active=True),
            MagicMock(read_capacity=lambda tc: None,  methodology_class="INSTITUTIONAL", is_active=False),
            MagicMock(read_capacity=lambda tc: None,  methodology_class="CBPR",          is_active=False),
        ]
        subsystem = self._make_subsystem_with_nodes(nodes)
        subsystem.min_methodology_classes = 1  # isolate quorum threshold test

        lc_result = subsystem.get_consensus_capacity(100.0, consensus_type="Essential Access")
        sq_result = subsystem.get_consensus_capacity(100.0, consensus_type="Shared Storehouse")

        assert lc_result == pytest.approx(100.0), "Essential Access quorum (3/5) should succeed."
        assert sq_result is None, "Shared Storehouse quorum (4/5) should fail with only 3 active nodes."


# =============================================================================
# SINGLE-NODE TESTS (pre-existing, preserved)
# =============================================================================

def test_read_capacity_failure():
    node = OracleNode(node_id=1, methodology_class="INSTITUTIONAL", accuracy=0.9, failure_rate=0.1)

    # Mock random to return a value less than failure_rate to trigger failure
    with patch("numpy.random.random", return_value=0.05):
        result = node.read_capacity(true_capacity=100.0)

    assert result is None
    assert node.is_active is False

def test_read_capacity_institutional_success():
    node = OracleNode(node_id=1, methodology_class="INSTITUTIONAL", accuracy=0.9, failure_rate=0.1)

    # random() > failure_rate, normal() returns 0.1
    with patch("numpy.random.random", return_value=0.5), \
         patch("numpy.random.normal", return_value=0.1) as mock_normal:

        result = node.read_capacity(true_capacity=100.0)

    assert result == pytest.approx(110.0)  # 100 * (1 + 0.1)
    assert node.is_active is True
    # Institutional noise should be normal(0, 1 - accuracy)
    mock_normal.assert_called_once_with(0, pytest.approx(0.1))

def test_read_capacity_cbpr_success():
    node = OracleNode(node_id=1, methodology_class="CBPR", accuracy=0.9, failure_rate=0.1)

    with patch("numpy.random.random", return_value=0.5), \
         patch("numpy.random.normal", return_value=0.1) as mock_normal:

        result = node.read_capacity(true_capacity=100.0)

    assert result == pytest.approx(110.0)
    assert node.is_active is True
    # CBPR noise should be normal(0, (1 - accuracy) * 1.5)
    mock_normal.assert_called_once_with(0, pytest.approx(0.15))

def test_read_capacity_physical_success():
    node = OracleNode(node_id=1, methodology_class="PHYSICAL", accuracy=0.9, failure_rate=0.1)

    with patch("numpy.random.random", return_value=0.5), \
         patch("numpy.random.normal", return_value=0.1) as mock_normal:

        result = node.read_capacity(true_capacity=100.0)

    assert result == pytest.approx(110.0)
    assert node.is_active is True
    # PHYSICAL noise should be normal(0, (1 - accuracy) * 0.5)
    mock_normal.assert_called_once_with(0, pytest.approx(0.05))

def test_read_capacity_capped_at_zero():
    node = OracleNode(node_id=1, methodology_class="INSTITUTIONAL", accuracy=0.9, failure_rate=0.1)

    # Return a very negative noise to make capacity drop below 0
    with patch("numpy.random.random", return_value=0.5), \
         patch("numpy.random.normal", return_value=-1.5):

        result = node.read_capacity(true_capacity=100.0)

    assert result == 0.0  # Cap at 0.0
    assert node.is_active is True
