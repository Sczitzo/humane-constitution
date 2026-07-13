"""
The Humane Constitution — Agent-Based Simulation Outline
=======================================================

Framework: Mesa (pip install mesa)
Purpose:   Model the interaction between Essential Access and Flow
           across a population of agents under varying demurrage rates,
           oracle accuracy levels, and adversarial actor configurations.

This file is a structural scaffold. Bound constitutional values resolve through
`/founding/commitments.md`; reserved FC identifiers must still be calibrated from
pilot data before this simulation produces policy-relevant output. The
architecture is specified; some activation parameters are not yet bound.

Usage:
    python -m simulations.model_outline

Dependencies:
    mesa >= 2.0
    numpy
    pandas (optional, for downstream analysis)
    matplotlib (optional, for visualization)

Reference documents:
    docs/SPECIFICATIONS.md   — formal state machine definitions
    docs/INVARIANTS.md       — constraints that simulation must never violate
    docs/annexes/ANNEX_AR.md — demurrage parameter worked examples
    Threat_Register.md       — adversarial scenarios to simulate
"""

import numpy as np
from mesa import Agent, Model
from mesa.time import RandomActivation
from mesa.datacollection import DataCollector


# =============================================================================
# CONSTANTS AND CONFIGURATION
# =============================================================================

# NOTE: values below are simulation defaults. Bound constitutional values resolve
# through `/founding/commitments.md`; reserved FC identifiers remain provisional.
CONFIG = {
    # Flow demurrage parameters (SPECIFICATIONS.md Section 2.3)
    "demurrage_rate_monthly": 0.01,        # 1.0% monthly; range 0.005–0.02
    "idle_threshold_days": 30,             # days before demurrage begins
    "min_flow_balance": 0.01,               # retirement threshold (epsilon)
    "demurrage_balance_floor": 15.0,        # balances below this are exempt —
                                            # implements "large idle balances, not
                                            # ordinary working balances" (white paper /
                                            # Claims Register). Value provisional;
                                            # FC calibration pending.

    # Essential Access parameters (SPECIFICATIONS.md Section 3)
    "csm_daily_units": 1.0,               # Constitutional Survival Minimum per day
    "essential_access_validity_hours": 72,              # expiry window
    "essential_access_enhanced_multiplier": 1.5,        # enhanced allocation above CSM [FC]

    # Voice fast-decay (SPECIFICATIONS.md Section 4.2)
    "voice_decay_rate_daily": 0.15,          # fast decay; mirrors FC-062

    # Service Record slow-decay (SPECIFICATIONS.md Section 4.3)
    "service_record_decay_rate_normal": 0.02,         # provisional until FC-063 is bound
    "service_record_decay_rate_grace": 0.004,         # 20% of normal during grace (P-009)
    "voice_sector_ceiling": 0.20,            # max 20% per sector — P-025: reduced from 25%
                                          # to prevent 3-sector supermajority in 5-sector system

    # Enforcement parameters (T-001 / P-001)
    "shadow_detection_prob": 0.85,        # P-001 enforcement effectiveness assumption

    # Oracle parameters (SPECIFICATIONS.md Section 7 / P-024)
    "oracle_accuracy": 0.95,              # simulation-only oracle baseline
    "oracle_failure_rate": 0.02,          # probability of oracle failure per cycle
    "min_oracle_nodes": 5,               # P-024: raised from 3 → 5 (BFT requires n≥3f+1;
                                          # at f=1, N=3 fails; N=5 provides honest-majority
                                          # protection for 2-node colluding pair)
    "min_methodology_classes": 3,         # P-024: all 3 classes required in active cohort
                                          # (Sim D: 2-class floor fails at every N)

    # Population
    "n_agents": 500,
    "n_adversarial_actors": 5,            # T-001, T-008 adversarial agents
    "n_steps": 365,                       # simulation days
}


# =============================================================================
# INSTRUMENT STATE DEFINITIONS
# =============================================================================
# Mirrors SPECIFICATIONS.md state machines

class FlowState:
    UNISSUED = "UNISSUED"
    ACTIVE = "ACTIVE"
    IDLE = "IDLE"
    COMMITTED = "COMMITTED"
    SETTLED = "SETTLED"
    DECAYED = "DECAYED"
    RETIRED = "RETIRED"

class EssentialAccessState:
    PENDING = "PENDING"
    ACTIVE = "ACTIVE"
    REDEEMED = "REDEEMED"
    EXPIRED = "EXPIRED"
    SUSPENDED = "SUSPENDED"
    RETIRED = "RETIRED"

class VoiceState:
    INACTIVE = "INACTIVE"
    ACTIVE = "ACTIVE"
    APPLIED = "APPLIED"
    DECAYED = "DECAYED"
    EXHAUSTED = "EXHAUSTED"

class ServiceRecordState:
    INACTIVE = "INACTIVE"
    ACTIVE = "ACTIVE"
    COOLING = "COOLING"
    SUSPENDED = "SUSPENDED"
    SLOW_DECAY = "SLOW_DECAY"


# =============================================================================
# ORACLE SUBSYSTEM
# =============================================================================

class OracleNode:
    """
    Represents a single oracle node in the polycentric measurement system.

    Three methodology classes required (SPECIFICATIONS.md Section 7 / Annex AL):
      - INSTITUTIONAL: statistical modeling
      - CBPR: community-based participatory research
      - PHYSICAL: independent physical sampling (ground-truth, Tier 3)
    """

    METHODOLOGY_CLASSES = ["INSTITUTIONAL", "CBPR", "PHYSICAL"]

    def __init__(self, node_id: int, methodology_class: str,
                 accuracy: float, failure_rate: float):
        if methodology_class not in self.METHODOLOGY_CLASSES:
            raise ValueError(
                f"Invalid methodology class: {methodology_class}. "
                "Annex AL requires diversity across all three classes."
            )
        self.node_id = node_id
        self.methodology_class = methodology_class
        self.accuracy = accuracy
        self.failure_rate = failure_rate
        self.is_active = True

    def read_capacity(self, true_capacity: float) -> float | None:
        """
        Returns a capacity reading, or None on failure.
        Error structure differs by methodology class (Annex AL error independence).
        """
        if np.random.random() < self.failure_rate:
            self.is_active = False
            return None  # node failure

        self.is_active = True

        # Methodology-class-specific error structure
        # Different error distributions to satisfy structural independence requirement
        if self.methodology_class == "INSTITUTIONAL":
            # Systematic bias possible; normally distributed error
            noise = np.random.normal(0, 1 - self.accuracy)
        elif self.methodology_class == "CBPR":
            # Community survey noise; higher variance, lower systematic bias
            noise = np.random.normal(0, (1 - self.accuracy) * 1.5)
        elif self.methodology_class == "PHYSICAL":
            # Direct sampling; highest fidelity, lowest noise
            noise = np.random.normal(0, (1 - self.accuracy) * 0.5)

        return max(0.0, true_capacity * (1 + noise))


class ColludingOracleNode(OracleNode):
    """
    Test-only adversarial oracle node that always returns a fabricated reading.

    Used in oracle BFT tests (Sim H gap) to verify that:
    - At N=3: two colluding nodes can forge a valid quorum (CRITICAL FAIL)
    - At N=5: two colluding nodes are defeated by honest majority (PASS)

    Never used in production model runs.
    """

    def __init__(self, node_id: int, methodology_class: str,
                 fabricated_value: float):
        super().__init__(node_id, methodology_class, accuracy=1.0, failure_rate=0.0)
        self.fabricated_value = fabricated_value

    def read_capacity(self, true_capacity: float) -> float:
        """Always returns fabricated value regardless of true capacity."""
        self.is_active = True
        return self.fabricated_value


class OracleSubsystem:
    """
    Polycentric oracle system. Applies consensus rules from SPECIFICATIONS.md Section 7.

    P-024 configuration:
    - Minimum 5 nodes (raised from 3; BFT requires n≥3f+1 for f=1 → n≥4; 5 provides margin)
    - Minimum 3 methodology classes (all classes must appear in active quorum;
      2-class floor fails at every N per Sim D)
    - Essential Access consensus: majority quorum ⌈N/2⌉ + 1
    - Shared Storehouse consensus: supermajority ⌈2N/3⌉
    """

    def __init__(self, config: dict):
        # P-024: N=5 default with 3-class coverage.
        # Distribution: INSTITUTIONAL×2, CBPR×2, PHYSICAL×1
        # (PHYSICAL is highest-fidelity but hardest to replicate at scale)
        self.nodes = [
            OracleNode(0, "INSTITUTIONAL", config["oracle_accuracy"],
                       config["oracle_failure_rate"]),
            OracleNode(1, "INSTITUTIONAL", config["oracle_accuracy"] * 0.97,
                       config["oracle_failure_rate"]),
            OracleNode(2, "CBPR", config["oracle_accuracy"] * 0.95,
                       config["oracle_failure_rate"]),
            OracleNode(3, "CBPR", config["oracle_accuracy"] * 0.93,
                       config["oracle_failure_rate"]),
            OracleNode(4, "PHYSICAL", config["oracle_accuracy"] * 0.98,
                       config["oracle_failure_rate"]),
        ]
        self.failure_log = []
        self.min_methodology_classes = config.get("min_methodology_classes", 3)

    def _validate_methodology_diversity(self, active_nodes: list) -> bool:
        """
        P-024 / Sim D: verify active quorum covers all 3 methodology classes.
        A quorum composed entirely of one or two classes fails structural independence.
        """
        classes_in_quorum = {n.methodology_class for n in active_nodes}
        return len(classes_in_quorum) >= self.min_methodology_classes

    def get_consensus_capacity(self, true_capacity: float,
                                consensus_type: str = "Essential Access") -> float | None:
        """
        Returns consensus capacity estimate or None if quorum fails.

        Quorum requirements (P-024):
          "Essential Access"  → majority consensus (⌈N/2⌉ + 1); must include ≥3 methodology classes
          "Shared Storehouse"  → supermajority (⌈2N/3⌉); must include ≥3 methodology classes

        Returns None (conservative hold, P-022) if:
          - Insufficient valid readings for quorum, OR
          - Valid readings do not cover all 3 methodology classes
        """
        readings = [(node, node.read_capacity(true_capacity)) for node in self.nodes]
        active = [(node, r) for node, r in readings if r is not None]
        n = len(self.nodes)

        quorum = (n // 2) + 1 if consensus_type == "Essential Access" else int(np.ceil(2 * n / 3))

        if len(active) < quorum:
            self.failure_log.append({"type": "QUORUM_FAILURE", "valid": len(active)})
            return None  # conservative hold (P-022)

        # P-024: methodology diversity check on the active set (not just quorum subset)
        active_nodes = [node for node, _ in active]
        if not self._validate_methodology_diversity(active_nodes):
            self.failure_log.append({
                "type": "METHODOLOGY_DIVERSITY_FAILURE",
                "classes_present": list({n.methodology_class for n in active_nodes})
            })
            return None  # conservative hold — methodology monoculture detected

        valid_readings = [r for _, r in active]
        return float(np.median(valid_readings))


# =============================================================================
# AGENT DEFINITIONS
# =============================================================================

class CitizenAgent(Agent):
    """
    Standard identity holder. Receives Essential Access unconditionally (INV-001).
    Participates in Flow market. Accumulates Service Record through service.

    Key invariants enforced here:
      - Essential Access never drops below CSM (INV-001)
      - No cross-instrument conversion (INV-002)
      - Service Record is eligibility-gating only, not a worth score (INV-003)
    """

    def __init__(self, unique_id: int, model: "ProtocolModel", sector: str):
        super().__init__(unique_id, model)
        self.sector = sector

        # Instrument balances
        self.flow_balance = np.random.exponential(10.0)  # initial Flow simulation seed
        self.initial_flow_balance = self.flow_balance    # for burden-distribution analysis
        self.demurrage_paid = 0.0                        # cumulative demurrage extracted
        self.lc_pending = CONFIG["csm_daily_units"]    # daily allocation
        self.lc_redeemed_today = False
        self.voice_balance = 0.0
        self.service_record_balance = 0.0

        # State tracking
        self.flow_state = FlowState.ACTIVE
        self.essential_access_state = EssentialAccessState.PENDING
        self.voice_state = VoiceState.INACTIVE
        self.service_record_state = ServiceRecordState.INACTIVE

        # Idle tracking for demurrage
        self.days_idle = 0
        self.last_productive_action = 0
        # Idle-spell persistence: probability of remaining idle tomorrow given
        # idle today. Heterogeneous across agents (0.90–0.99 → mean spell
        # lengths of 10–100 days). Without spell persistence, a daily i.i.d.
        # 30% idle chance makes 30 consecutive idle days a ~1e-16 event and
        # demurrage never fires (the original scaffold's silent no-op).
        self.idle_persistence = np.random.uniform(0.90, 0.99)

        # Adversarial: flag for shadow convertibility attempts
        self.shadow_conversion_attempts = 0

    def step(self):
        self._receive_lc_allocation()
        self._redeem_lc()
        self._apply_flow_demurrage()
        self._participate_in_market()
        self._update_civic_record()
        self._decay_dw()

    def _receive_lc_allocation(self):
        """
        INV-001: Unconditional CSM allocation. No behavioral gate.
        """
        self.lc_pending = CONFIG["csm_daily_units"]
        self.essential_access_state = EssentialAccessState.PENDING
        self.lc_redeemed_today = False

    def _redeem_lc(self):
        """
        Redeem Essential Access for physical basket access. Non-transferable.
        Essential Access expires after validity window (72h → ~3 steps if step = 1 day).

        Redemption draws down the model's confirmed-capacity budget for the day.
        If oracle-confirmed capacity is exhausted, redemption fails and the agent
        counts as a CSM violation — this is the coupling that makes measurement
        failure consequential (previously the oracle output was never consumed).
        """
        if self.essential_access_state == EssentialAccessState.PENDING:
            need = self.lc_pending
            if self.model.redemption_budget >= need:
                self.model.redemption_budget -= need
                self.lc_pending = 0.0
                self.lc_redeemed_today = True
                self.essential_access_state = EssentialAccessState.REDEEMED
            else:
                # Capacity shortfall — allocation cannot be physically delivered
                self.essential_access_state = EssentialAccessState.EXPIRED

    def _apply_flow_demurrage(self):
        """
        SPECIFICATIONS.md Section 2.3: exponential decay on idle Flow.
        B(t) = B(0) × e^(−r × t_idle) when t_idle ≥ θ

        P-023 (COMMITTED state discipline):
        Flow in COMMITTED (milestone escrow) state also accrues idle time.
        "Discipline is the point" — demurrage continues during escrow.
        This was previously a bug: COMMITTED did not increment days_idle,
        meaning escrow was a demurrage-exempt state in contradiction to P-023.
        Fixed: COMMITTED now treated identically to IDLE for demurrage accrual.
        See the prior adversarial simulation notes for the specification/implementation
        divergence this corrects.
        """
        # Read from the model's config so per-scenario overrides (e.g. high
        # demurrage) actually reach agents. Previously this read module CONFIG,
        # which made run_high_demurrage a silent no-op. Falls back to CONFIG
        # for unit tests that pass a mock model.
        cfg = self.model.config if isinstance(getattr(self.model, "config", None), dict) else CONFIG

        if self.flow_state in (FlowState.IDLE, FlowState.COMMITTED):  # P-023: COMMITTED accrues demurrage
            self.days_idle += 1
        elif self.flow_state == FlowState.ACTIVE:
            self.days_idle = 0

        if (self.days_idle >= cfg["idle_threshold_days"]
                and self.flow_balance > cfg.get("demurrage_balance_floor", 0.0)):
            r = cfg["demurrage_rate_monthly"] / 30  # convert to daily
            before = self.flow_balance
            self.flow_balance *= np.exp(-r)
            self.demurrage_paid += before - self.flow_balance
            # COMMITTED state remains COMMITTED after decay application;
            # the escrow is still active, but the balance has decayed.
            if self.flow_state != FlowState.COMMITTED:
                self.flow_state = FlowState.DECAYED

            if self.flow_balance < cfg["min_flow_balance"]:
                self.flow_balance = 0.0
                self.flow_state = FlowState.RETIRED

    def _participate_in_market(self):
        """
        Simplified market participation. Productive agents keep Flow in ACTIVE state.
        Idle agents accumulate demurrage pressure.
        """
        if self.flow_state in (FlowState.IDLE, FlowState.DECAYED):
            # Idle spells persist: mean spell length 1/(1 - idle_persistence)
            stay_idle = np.random.random() < self.idle_persistence
        else:
            stay_idle = np.random.random() >= 0.7  # 70% daily participation rate (simulation seed)

        if stay_idle:
            self.flow_state = FlowState.IDLE
        else:
            self.flow_state = FlowState.ACTIVE
            self.days_idle = 0
            self.last_productive_action = self.model.schedule.steps

    def _update_civic_record(self):
        """
        Service Record updates based on service events. Not a worth score (INV-003).
        Sector ceiling enforced at model level (P-008).
        """
        if np.random.random() < 0.1:  # 10% daily service event probability (simulation seed)
            self.service_record_balance += 1.0
            self.service_record_state = ServiceRecordState.ACTIVE

    def _decay_dw(self):
        """
        Voice fast-decay: influence is a flow, not a stock.
        """
        if self.voice_balance > 0:
            self.voice_balance *= (1 - CONFIG["voice_decay_rate_daily"])
            if self.voice_balance < 0.01:
                self.voice_balance = 0.0
                self.voice_state = VoiceState.EXHAUSTED


class AdversarialAgent(CitizenAgent):
    """
    Models motivated adversarial actors (T-001, T-008, T-025).

    Adversarial behaviors modeled:
      - Shadow convertibility attempts (T-001): proxy redemption, off-ledger trades
      - Bureaucratic elite formation (T-008): sector position accumulation
      - Demurrage sector-capture (T-025): milestone escrow gaming

    The ledger layer rejects cross-instrument conversions (INV-002).
    This agent models the above-ledger bypass risk.
    """

    def __init__(self, unique_id: int, model: "ProtocolModel", sector: str):
        super().__init__(unique_id, model, sector)
        self.adversarial_type = np.random.choice(["SHADOW", "ELITE", "ESCROW"])
        self.bypass_successes = 0
        self.bypass_attempts = 0

    def step(self):
        super().step()
        self._attempt_adversarial_action()

    def _attempt_shadow_conversion(self) -> bool:
        """
        T-001: Attempt off-ledger Essential Access-to-Flow conversion.
        P-001 mitigation: broker enforcement, cluster anomaly detection.
        Returns True if bypass succeeds (detection failed).
        """
        self.bypass_attempts += 1
        # Detection probability scales with enforcement intensity.
        # NOTE: original scaffold had this comparison inverted (random() >
        # detection_prob → detected), so "85% detection" actually simulated an
        # 85% adversary SUCCESS rate. Fixed: detection fires with detection_prob.
        detection_prob = self.model.config["shadow_detection_prob"]
        if np.random.random() < detection_prob:
            # Bypass detected — action blocked, flagged
            self.model.enforcement_log.append({
                "step": self.model.schedule.steps,
                "agent": self.unique_id,
                "type": "SHADOW_CONVERSION",
                "outcome": "DETECTED"
            })
            return False
        else:
            # Bypass succeeds — above-ledger conversion
            self.bypass_successes += 1
            self.flow_balance += 1.0  # simulated Essential Access-value extraction
            self.model.bypass_success_log.append({
                "step": self.model.schedule.steps,
                "agent": self.unique_id,
                "type": "SHADOW_CONVERSION",
                "outcome": "SUCCESS"
            })
            return True

    def _attempt_elite_formation(self):
        """
        T-008: Attempt to exceed Service Record sector ceiling (25% per sector, P-008).
        Enforcement: quarterly audit at model level.
        """
        self.service_record_balance += 2.0  # accelerated accumulation attempt

    def _attempt_escrow_gaming(self):
        """
        T-025: Milestone escrow gaming (P-023 targets this).
        Contract-commitment architecture: demurrage applies during escrow.
        Zero exemptions: no sector-based escape from demurrage.
        """
        # Attempt to simulate "investment exemption" that P-023 explicitly prohibits
        # In P-023 architecture, this attempt fails — demurrage continues in escrow
        pass  # P-023: zero exemptions; demurrage continues regardless

    def _attempt_adversarial_action(self):
        if self.adversarial_type == "SHADOW":
            self._attempt_shadow_conversion()
        elif self.adversarial_type == "ELITE":
            self._attempt_elite_formation()
        elif self.adversarial_type == "ESCROW":
            self._attempt_escrow_gaming()


# =============================================================================
# MODEL
# =============================================================================

class ProtocolModel(Model):
    """
    Top-level simulation model.

    Simulates N agents over T steps, tracking:
      - Essential Access redemption rates (survival floor access)
      - Flow circulation and demurrage retirement rates
      - Adversarial bypass success/detection rates
      - Oracle failure events and fallback activations
      - Service Record sector ceiling violations

    Threat scenarios configurable via adversarial_intensity parameter.
    """

    SECTORS = ["HOUSING", "FOOD", "HEALTHCARE", "TRANSIT", "PRODUCTION"]

    def __init__(self, config: dict = CONFIG, adversarial_intensity: float = 0.01,
                 seed: int | None = None):
        super().__init__()
        if seed is not None:
            np.random.seed(seed)  # agents and oracle use np.random throughout
        self.config = config
        self.schedule = RandomActivation(self)

        # Infrastructure
        self.oracle = OracleSubsystem(config)
        self.enforcement_log = []
        self.bypass_success_log = []
        self.oracle_failure_log = []

        # True physical capacity (ground truth, unknown to agents)
        self.true_physical_capacity = 1000.0  # arbitrary simulation units

        # Oracle-confirmed capacity drives Essential Access delivery.
        # Starts at ground truth; updated each step by _update_oracle.
        self.confirmed_capacity = self.true_physical_capacity
        # Daily redemption budget drawn down by agents in _redeem_lc.
        self.redemption_budget = self.confirmed_capacity

        # Spawn citizen agents
        for i in range(config["n_agents"]):
            sector = np.random.choice(self.SECTORS)
            agent = CitizenAgent(i, self, sector)
            self.schedule.add(agent)

        # Spawn adversarial agents
        for i in range(config["n_adversarial_actors"]):
            sector = np.random.choice(self.SECTORS)
            agent = AdversarialAgent(
                config["n_agents"] + i, self, sector
            )
            self.schedule.add(agent)

        # Data collection
        self.datacollector = DataCollector(
            model_reporters={
                "Total_Flow_Circulation": self._total_flow,
                "EssentialAccess_Redemption_Rate": self._essential_access_redemption_rate,
                "Flow_Retired_This_Step": self._flow_retired,
                "Oracle_Failures": lambda m: len(m.oracle.failure_log),
                "Bypass_Successes": lambda m: len(m.bypass_success_log),
                "Bypass_Detections": lambda m: len(m.enforcement_log),
                "CSM_Violations": self._csm_violations,  # must always be 0
            },
            agent_reporters={
                "Flow_Balance": "flow_balance",
                "Flow_State": "flow_state",
                "ServiceRecord_Balance": "service_record_balance",
                "Voice_Balance": "voice_balance",
                "Days_Idle": "days_idle",
            }
        )

    def step(self):
        """Advance simulation by one day."""
        self._update_oracle()
        self.redemption_budget = self.confirmed_capacity  # daily delivery budget
        self._enforce_voice_sector_ceiling()
        self.schedule.step()
        self.datacollector.collect(self)

    def run(self, n_steps: int = None):
        """Run simulation for n_steps days."""
        steps = n_steps or self.config["n_steps"]
        for _ in range(steps):
            self.step()
        return self.datacollector.get_model_vars_dataframe()

    def _update_oracle(self):
        """
        Query oracle system for capacity confirmation.
        Drives Essential Access issuance for this step: confirmed_capacity
        becomes the day's redemption budget in step().

        On consensus failure, conservative hold (P-022): keep the last
        confirmed capacity so a measurement blackout does not slash access.
        (The previous implementation decayed *ground truth* on oracle failure
        and never consumed the consensus value — both fixed.)
        """
        consensus = self.oracle.get_consensus_capacity(
            self.true_physical_capacity, consensus_type="Essential Access"
        )
        if consensus is None:
            self.oracle_failure_log.append(self.schedule.steps)
            # conservative hold: confirmed_capacity retains its last value
        else:
            self.confirmed_capacity = consensus

    def _enforce_voice_sector_ceiling(self):
        """
        P-008: No sector may hold > 25% of total active Service Record positions.
        Enforcement: cooling periods applied on violation.
        """
        sector_cr = {s: 0.0 for s in self.SECTORS}
        total_cr = 0.0

        for agent in self.schedule.agents:
            sector_cr[agent.sector] += agent.service_record_balance
            total_cr += agent.service_record_balance

        if total_cr == 0:
            return

        for sector, cr in sector_cr.items():
            if cr / total_cr > self.config["voice_sector_ceiling"]:
                # Apply cooling to sector agents
                for agent in self.schedule.agents:
                    if agent.sector == sector and agent.service_record_balance > 0:
                        agent.service_record_balance *= 0.5  # cooling reduction
                        agent.service_record_state = ServiceRecordState.COOLING

    # -------------------------------------------------------------------------
    # Model reporters
    # -------------------------------------------------------------------------

    def _total_flow(self):
        return sum(
            a.flow_balance for a in self.schedule.agents
            if a.flow_state != FlowState.RETIRED
        )

    def _essential_access_redemption_rate(self):
        total = len(self.schedule.agents)
        redeemed = sum(
            1 for a in self.schedule.agents
            if isinstance(a, CitizenAgent) and a.lc_redeemed_today
        )
        return redeemed / total if total > 0 else 0.0

    def _flow_retired(self):
        return sum(
            1 for a in self.schedule.agents
            if a.flow_state == FlowState.RETIRED
        )

    def _csm_violations(self):
        """
        INV-001 monitor: an agent who could not redeem their daily CSM
        allocation is a violation. Under adequate capacity this must be 0;
        under capacity shortfall or oracle undershoot it counts real people
        the floor failed to reach that day.
        """
        return sum(
            1 for a in self.schedule.agents
            if isinstance(a, CitizenAgent) and not a.lc_redeemed_today
        )


# =============================================================================
# ANALYSIS HELPERS
# =============================================================================

def adversary_wealth_share(model: ProtocolModel) -> float:
    """Fraction of total Flow held by adversarial agents at the current step."""
    adv = sum(a.flow_balance for a in model.schedule.agents
              if isinstance(a, AdversarialAgent))
    total = sum(a.flow_balance for a in model.schedule.agents)
    return adv / total if total > 0 else 0.0


def demurrage_burden_by_quintile(model: ProtocolModel) -> dict:
    """
    White-paper evidence gate: the demurrage burden ratio across wealth
    quintiles must be <= 1.0, confirming the fee falls on large idle balances
    rather than on people with modest savings.

    Burden rate per quintile = total demurrage paid / total initial balance.
    Ratio reported = bottom-quintile rate / top-quintile rate (Q1/Q5).
    Adversarial agents are excluded — bypass gains would distort balances.
    """
    citizens = sorted(
        (a for a in model.schedule.agents
         if isinstance(a, CitizenAgent) and not isinstance(a, AdversarialAgent)),
        key=lambda a: a.initial_flow_balance,
    )
    k = len(citizens) // 5
    rates = []
    for q in range(5):
        group = citizens[q * k:(q + 1) * k] if q < 4 else citizens[4 * k:]
        paid = sum(a.demurrage_paid for a in group)
        start = sum(a.initial_flow_balance for a in group)
        rates.append(paid / start if start > 0 else 0.0)
    ratio = rates[0] / rates[4] if rates[4] > 0 else float("inf")
    return {
        "quintile_burden_rates": rates,          # Q1 (poorest) → Q5 (wealthiest)
        "burden_ratio_q1_over_q5": ratio,        # must be <= 1.0
        "gate_passed": ratio <= 1.0,
    }


# =============================================================================
# SCENARIO RUNNER
# =============================================================================

def _format_results(scenario_name: str, results, model: ProtocolModel) -> dict:
    """Standardizes scenario result extraction."""
    return {
        "scenario": scenario_name,
        "final_flow_circulation": results["Total_Flow_Circulation"].iloc[-1],
        "avg_essential_access_redemption_rate": results["EssentialAccess_Redemption_Rate"].mean(),
        "oracle_failures": results["Oracle_Failures"].iloc[-1],
        "bypass_successes": results["Bypass_Successes"].iloc[-1],
        "csm_violations": results["CSM_Violations"].sum(),
        "adversary_wealth_share": adversary_wealth_share(model),
    }


def run_baseline(n_steps: int = 365, seed: int | None = None) -> dict:
    """Baseline run: standard parameters, no adversarial stress."""
    model = ProtocolModel(CONFIG, adversarial_intensity=0.01, seed=seed)
    results = model.run(n_steps)
    return _format_results("BASELINE", results, model)


def run_oracle_stress(n_steps: int = 365, seed: int | None = None) -> dict:
    """
    Stress scenario: elevated oracle failure rate.
    Tests T-006 (measurement lag), T-020/T-021 (oracle capture), T-024 (Shared Storehouse oracle failure).
    """
    stressed_config = CONFIG.copy()
    stressed_config["oracle_failure_rate"] = 0.15  # elevated failure
    model = ProtocolModel(stressed_config, adversarial_intensity=0.05, seed=seed)
    results = model.run(n_steps)
    return _format_results("ORACLE_STRESS", results, model)


def run_high_demurrage(n_steps: int = 365, seed: int | None = None) -> dict:
    """
    Parameter sweep: high demurrage rate.
    Tests Annex AR deployment window sensitivity at r = 2.0% monthly.
    """
    high_demurrage_config = CONFIG.copy()
    high_demurrage_config["demurrage_rate_monthly"] = 0.02
    model = ProtocolModel(high_demurrage_config, adversarial_intensity=0.01, seed=seed)
    results = model.run(n_steps)
    return _format_results("HIGH_DEMURRAGE", results, model)


def run_adversarial_stress(n_steps: int = 365, seed: int | None = None) -> dict:
    """
    Adversarial stress: high adversarial actor density.
    Tests T-001 (shadow convertibility) and T-008 (elite formation) under pressure.
    """
    adversarial_config = CONFIG.copy()
    adversarial_config["n_adversarial_actors"] = 50  # 10% adversarial population
    model = ProtocolModel(adversarial_config, adversarial_intensity=0.10, seed=seed)
    results = model.run(n_steps)
    return _format_results("ADVERSARIAL_STRESS", results, model)


# =============================================================================
# MULTI-RUN AND SWEEP EXPERIMENTS
# =============================================================================

def run_multi(scenario_fn, n_runs: int = 10, n_steps: int = 365) -> dict:
    """
    Run a scenario across n_runs fixed seeds; report median and IQR so results
    are reproducible claims rather than single-draw anecdotes.
    """
    rows = [scenario_fn(n_steps=n_steps, seed=1000 + i) for i in range(n_runs)]
    numeric_keys = [k for k in rows[0] if k != "scenario"]
    agg = {"scenario": rows[0]["scenario"], "n_runs": n_runs}
    for key in numeric_keys:
        values = np.array([r[key] for r in rows], dtype=float)
        agg[key] = {
            "median": float(np.median(values)),
            "p25": float(np.percentile(values, 25)),
            "p75": float(np.percentile(values, 75)),
        }
    return agg


def run_detection_sweep(probs=(0.50, 0.60, 0.70, 0.80, 0.85, 0.90, 0.95, 0.99),
                        n_runs: int = 5, n_steps: int = 365) -> list[dict]:
    """
    Sweep shadow-conversion detection probability at 10% adversarial density
    and measure adversary wealth share at year end.

    Answers: how good must wall enforcement (P-001) be before T-001 leakage
    stays nuisance-level instead of compounding into a power structure?
    Reference: adversaries are ~9% of the population with the same initial
    wealth distribution, so ~0.09 wealth share means zero net extraction.
    """
    out = []
    for p in probs:
        cfg = CONFIG.copy()
        cfg["shadow_detection_prob"] = p
        cfg["n_adversarial_actors"] = 50
        shares, bypasses = [], []
        for i in range(n_runs):
            model = ProtocolModel(cfg, adversarial_intensity=0.10, seed=2000 + i)
            model.run(n_steps)
            shares.append(adversary_wealth_share(model))
            bypasses.append(len(model.bypass_success_log))
        out.append({
            "detection_prob": p,
            "median_adversary_wealth_share": float(np.median(shares)),
            "p25_wealth_share": float(np.percentile(shares, 25)),
            "p75_wealth_share": float(np.percentile(shares, 75)),
            "median_bypass_successes": float(np.median(bypasses)),
        })
    return out


# =============================================================================
# ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    print("The Humane Constitution — Agent-Based Simulation")
    print("=" * 60)
    print("NOTE: Reserved FC parameters still require")
    print("pilot data calibration before policy-relevant output.")
    print("=" * 60)

    scenarios = [
        run_baseline,
        run_oracle_stress,
        run_high_demurrage,
        run_adversarial_stress,
    ]

    print("\n== Scenario results: median [p25-p75] over 10 seeded runs ==")
    for scenario_fn in scenarios:
        agg = run_multi(scenario_fn, n_runs=10, n_steps=CONFIG["n_steps"])
        print(f"\n  Scenario: {agg['scenario']} (n={agg['n_runs']})")
        for key in ("final_flow_circulation", "avg_essential_access_redemption_rate",
                    "oracle_failures", "bypass_successes", "adversary_wealth_share"):
            s = agg[key]
            print(f"    {key}: {s['median']:.3f} [{s['p25']:.3f}-{s['p75']:.3f}]")
        s = agg["csm_violations"]
        print(f"    csm_violations: {s['median']:.0f} [{s['p25']:.0f}-{s['p75']:.0f}]  (must be 0)")

    print("\n== Detection-probability sweep (T-001, 10% adversarial density) ==")
    print("  no-extraction reference share: ~0.09")
    for row in run_detection_sweep():
        print(f"    detect={row['detection_prob']:.2f}  "
              f"adversary wealth share={row['median_adversary_wealth_share']:.3f} "
              f"[{row['p25_wealth_share']:.3f}-{row['p75_wealth_share']:.3f}]  "
              f"bypasses={row['median_bypass_successes']:.0f}")

    print("\n== Demurrage burden by initial-wealth quintile (evidence gate) ==")
    for label, rate in (("baseline 1%/mo", 0.01), ("high 2%/mo", 0.02)):
        cfg = CONFIG.copy()
        cfg["demurrage_rate_monthly"] = rate
        model = ProtocolModel(cfg, adversarial_intensity=0.01, seed=42)
        model.run(CONFIG["n_steps"])
        report = demurrage_burden_by_quintile(model)
        rates_str = ", ".join(f"{r:.4f}" for r in report["quintile_burden_rates"])
        verdict = "PASS" if report["gate_passed"] else "FAIL"
        print(f"    {label}: Q1->Q5 burden rates [{rates_str}]")
        print(f"      burden ratio Q1/Q5 = {report['burden_ratio_q1_over_q5']:.3f} "
              f"(gate <= 1.0: {verdict})")

    print("\nSimulation complete.")
    print("CSM violations > 0 indicate INV-001 breach — treat as critical failure.")
