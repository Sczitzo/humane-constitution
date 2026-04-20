# SPECIFICATIONS.md — Formal System Specifications

**Document type:** Technical specification  
**Scope:** Three-instrument model (EC, LC, DW/CR) — state machine definition, transition rules, decay functions, and public-money constraints
**Format:** Systems design / formal state machine  
**Status:** Specification-grade (parameters marked [FOUNDING COMMITMENT] require pilot data before activation)

---

## 1. System Overview

The Humane Constitution operates three primary instrument lanes and one emergency instrument. Each lane is a bounded state machine with defined issuance conditions, transition rules, decay functions, and termination states. The lanes are non-convertible by design; the non-convertibility constraint is enforced at the ledger layer, not at the application layer. EC may exist as public digital balances and as physical/offline bearer instruments inside the same monetary lane.

**Naming note:** The live constitutional presentation uses **one Founding Order** and **Articles I-VII**. Legacy `v13` shorthand (`P0`, `P1–P7`) and older `v12` references may still appear below where technical traceability requires them.

```
┌──────────────────────────────────────────────────────────────────┐
│                     INSTRUMENT SPACE                             │
│                                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌──────────────────────┐  │
│  │     EC      │   │     LC      │   │       DW / CR        │  │
│  │ Enterprise  │   │    Life     │   │     Civic Layer      │  │
│  │  Currency   │   │   Access    │   │  (Deliberation Wt.   │  │
│  │             │   │  Ledger     │   │   + Civic Record)    │  │
│  └──────┬──────┘   └──────┬──────┘   └──────────┬───────────┘  │
│         │                 │                      │              │
│         ▼                 ▼                      ▼              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              NON-CONVERTIBILITY ENFORCEMENT LAYER        │   │
│  │         (ledger-enforced, no application-layer bypass)   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────┐  (emergency only, time-limited)                │
│  │     SQ      │                                                │
│  │  Scarcity   │                                                │
│  │  Quotas     │                                                │
│  └─────────────┘                                                │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Enterprise Currency (EC) — State Machine

### 2.1 Definition

EC is the general-purpose market instrument. It is issued against verified productive commitments, circulates freely within the EC lane, and is subject to demurrage (time-decay on idle balances) to discourage hoarding. EC is protocol-issued public money: private institutions may intermediate existing EC, but may not create new EC or currency-like EC substitutes by debt expansion. EC is primarily digital, with physical cash or equivalent offline bearer instruments maintained for resilience, privacy, and universal access.

### 2.2 State Machine

```
States:
  UNISSUED       — not yet in circulation
  ACTIVE         — held by an identity, available for transactions
  IDLE           — held without productive deployment (demurrage accumulates)
  COMMITTED      — locked in milestone escrow (demurrage continues; see P-023)
  SETTLED        — released from escrow on verified milestone completion
  DECAYED        — reduced by demurrage application
  RETIRED        — permanently removed from circulation

Transitions:
  UNISSUED  → ACTIVE      : issuance event (verified productive commitment)
  ACTIVE    → IDLE        : balance held beyond activity threshold [FOUNDING COMMITMENT: threshold period]
  ACTIVE    → COMMITTED   : contract-commitment escrow trigger (P-023)
  IDLE      → ACTIVE      : productive deployment event
  IDLE      → DECAYED     : demurrage application cycle (see 2.3)
  COMMITTED → SETTLED     : independent physical verification of milestone delivery
  COMMITTED → ACTIVE      : escrow release on verified completion
  DECAYED   → ACTIVE      : balance adjusted downward; remainder re-enters ACTIVE
  DECAYED   → RETIRED     : balance reaches zero through demurrage
  ACTIVE    → RETIRED     : voluntary retirement or enforcement action
```

### 2.3 Demurrage Function

Demurrage is a time-decay and carrying charge applied to idle EC balances. It is not assessed on survival access, ordinary labor, or basic household exchange. Charged EC is split between retirement and Public Finance & Commons Revenue (PFCR) receipts under a published routing rule.

```
Let:
  B(t)     = EC balance at time t
  r        = demurrage rate per period [FOUNDING COMMITMENT: target range 0.5%–2.0% monthly]
  t_idle   = time elapsed since last productive deployment
  θ        = idle threshold (deployment below which demurrage begins) [FOUNDING COMMITMENT]

Demurrage function:
  If t_idle < θ:
    B(t) = B(0)                          [no decay, balance active]

  If t_idle ≥ θ:
    B(t) = B(0) × e^(−r × t_idle)       [continuous exponential decay]

  Alternatively, discrete periodic application:
    B(t+1) = B(t) × (1 − r)             [per-period decay]

Retirement:
  When B(t) < ε (minimum balance threshold [FOUNDING COMMITMENT]),
  the balance is retired from circulation.

Charge routing:
  Let C(t) = B_before(t) − B_after(t)
  Let α = PFCR routing share [FOUNDING COMMITMENT]

  PFCR_receipt(t) = α × C(t)
  Retired_EC(t)   = (1 − α) × C(t)

Notes:
  - r must be calibrated so that the deployment window produces meaningful
    anti-hoarding signal without suppressing long-horizon productive investment
  - Annex AR Section 2 contains worked examples at r = 0.5%, 1.0%, 2.0% monthly
  - P-023 establishes that investment exemptions are prohibited; demurrage applies
    during escrow periods. The discipline is the point.
  - α must be published, reviewable, and fiscally bounded under PFCR rules
```

### 2.4 Issuance Constraints

```
Issuance conditions (all must be satisfied):
  1. Verified productive commitment exists in registry
  2. Issuing authority is active and not under audit
  3. Commitment has not been previously issued against
  4. Physical capacity exists to absorb the production (oracle confirmation required)
  5. No private institution is simultaneously creating a duplicative EC-denominated
     claim intended to circulate as money against the same commitment

Issuance ceiling:
  Total EC in circulation ≤ f(verified productive commitments)
  [FOUNDING COMMITMENT: exact multiplier function]
```

### 2.5 Retail Banking and Household Finance Constraints

```
Retail public-banking floor:
  - Basic accounts, wage receipt, bill pay, transfers, cash conversion, and
    fraud recovery operate on PFCR-funded public infrastructure
  - A guaranteed public postal-bank or public-bank option must remain available
  - Licensed providers may offer the same baseline retail services on the
    common public rail if they satisfy interoperability and service rules

Household finance constraints:
  - Compounding interest on household ordinary-life debt is prohibited
  - No household debt may be cross-collateralized against the Constitutional
    Survival Minimum or transformed into a revolving survival trap
  - Securitization of household survival-linked claims is prohibited
  - Retail fee chains may not function as hidden interest equivalents
```

---

## 3. Life Access Ledger (LC) — State Machine

### 3.1 Definition

LC is a non-transferable, non-convertible entitlement to physical basket access. It is denominated in Basket Units (BU), not monetary value. One BU represents one day's access to the Constitutional Survival Minimum basket (food, water, shelter, healthcare, transit). LC is issued by the system, not earned or purchased.

### 3.2 State Machine

```
States:
  PENDING        — allocated, not yet claimed
  ACTIVE         — available for redemption within validity window
  REDEEMED       — exchanged for physical basket access
  EXPIRED        — validity window elapsed without redemption (retired)
  SUSPENDED      — temporarily frozen during identity re-verification
                   (floor allocation continues at CSM; see INV-001)
  RETIRED        — permanently removed (identity deregistration only)

Transitions:
  PENDING   → ACTIVE      : daily micro-allocation event (system-triggered)
  ACTIVE    → REDEEMED    : redemption event at registered delivery point
  ACTIVE    → EXPIRED     : validity window elapsed (72 hours; see 3.3)
  ACTIVE    → SUSPENDED   : identity re-verification trigger
  SUSPENDED → ACTIVE      : re-verification confirmed
  SUSPENDED → RETIRED     : identity permanently deregistered
  EXPIRED   → (void)      : expired LC is destroyed; no rollover
  REDEEMED  → (void)      : redeemed LC is destroyed; no secondary use
```

### 3.3 Validity and Expiry

```
Validity window: 72 hours from issuance timestamp
  [FOUNDING COMMITMENT: window may be adjusted based on delivery infrastructure]

Expiry behavior:
  - Expired LC is destroyed, not rolled over
  - No accumulation is possible; this is by design
  - Accumulation would reintroduce asset-like properties
    and create a secondary market attack surface

Non-transferability enforcement:
  - LC is bound to identity at issuance
  - No transfer, delegation, proxy redemption, or assignment is valid
  - Redemption requires biometric or equivalent identity confirmation
    at delivery point (Tier 2 assurance minimum; see P-003)
```

### 3.4 Constitutional Survival Minimum (CSM)

```
CSM is the minimum LC allocation that may never be reduced (INV-001).

CSM = f(verified physical capacity, basket composition, regional variation)
  [FOUNDING COMMITMENT: exact basket composition and regional adjustment factors]

CSM floor enforcement:
  - Even during SUSPENDED state, LC issuance continues at CSM
  - System halt conditions do not reduce CSM allocation
  - No patch may reduce CSM below its founding value without full
    constitutional refounding (Tier 1 invariant; see INVARIANTS.md INV-001)
```

### 3.5 Issuance Conditions

```
LC issuance is automatic and unconditional for all confirmed identity holders.

Issuance trigger: daily system cycle
Issuance amount: CSM ≤ allocation ≤ enhanced allocation
  [FOUNDING COMMITMENT: enhanced allocation criteria above CSM floor]

Issuance is NOT conditional on:
  - Contribution record
  - Civic standing
  - Employment status
  - Prior redemption behavior
  - Any behavioral criterion
```

---

## 4. Civic Layer (DW / CR) — State Machine

### 4.1 Definition

The Civic Layer comprises two sub-instruments:

- **Deliberation Weight (DW):** Fast-decaying agenda-setting influence. Used in deliberative processes. Cannot accumulate indefinitely.
- **Civic Record (CR):** Service history and eligibility record. Slow-decay. Gates access to civic roles and service tiers. Does not represent worth (INV-003).

### 4.2 DW State Machine

```
States:
  INACTIVE       — not yet issued; identity not yet civically active
  ACTIVE         — available for use in deliberative processes
  APPLIED        — committed to a specific deliberative action
  DECAYED        — reduced by fast-decay function
  EXHAUSTED      — balance reaches zero; requires re-issuance cycle

Transitions:
  INACTIVE  → ACTIVE      : civic activation event (contribution threshold met)
  ACTIVE    → APPLIED     : deliberative action commitment
  APPLIED   → ACTIVE      : deliberative cycle completes; residual returned
  ACTIVE    → DECAYED     : fast-decay application cycle (see 4.3)
  DECAYED   → ACTIVE      : balance adjusted; remainder active
  DECAYED   → EXHAUSTED   : balance reaches zero
  EXHAUSTED → ACTIVE      : new issuance cycle following qualifying participation

Decay function (DW):
  DW(t) = DW(0) × e^(−r_dw × t)
  r_dw [FOUNDING COMMITMENT: fast-decay rate; expected significantly higher than EC demurrage]
  
  Design intent: DW must not accumulate. Influence is a flow, not a stock.
  An actor who was influential last cycle should not carry that influence
  forward without continued participation.
```

### 4.3 CR State Machine

```
States:
  INACTIVE       — no service history
  ACTIVE         — service history present; eligibility gates available
  COOLING        — post-role cooling period (anti-entrenchment)
  SUSPENDED      — under investigation or re-verification
  SLOW_DECAY     — reduced by slow-decay function during inactivity

Transitions:
  INACTIVE  → ACTIVE      : first qualifying service event
  ACTIVE    → COOLING     : completion of role with mandatory cooling trigger
  COOLING   → ACTIVE      : cooling period elapsed
  ACTIVE    → SUSPENDED   : investigation trigger
  SUSPENDED → ACTIVE      : investigation resolved, cleared
  SUSPENDED → INACTIVE    : investigation resolved, deregistration
  ACTIVE    → SLOW_DECAY  : inactivity beyond threshold
  SLOW_DECAY→ ACTIVE      : new service event
  SLOW_DECAY→ INACTIVE    : balance reaches zero

Decay function (CR):
  During SLOW_DECAY:
    CR(t) = CR(0) × (1 − r_cr)^t
    r_cr [FOUNDING COMMITMENT: slow-decay rate; P-009 establishes 20% of normal decay rate
          during grace period transitions]

Sector ceiling (P-008):
  No single sector may hold > 20% of total active CR positions. (P-025)
  [Prior specification: 25% — SUPERSEDED. In a 5-sector system, 25% permits a
   3-sector coalition to reach 75% DW — supermajority control. The ceiling must
   satisfy 3c < 0.667; c < 22.2%; 20% provides margin. See PRD-006, Test 4.]
  Enforcement: quarterly audit; cooling periods applied proportionally.
```

---

## 5. Scarcity Quotas (SQ) — Emergency Instrument

```
SQ is not a primary instrument. It is an emergency overlay activated only
under verified scarcity conditions.

Activation conditions (all required):
  1. Oracle consensus: verified physical supply below threshold [FOUNDING COMMITMENT]
  2. PCRP sentinel indicator breach (P-006)
  3. Governance authorization: CRP decision within 48h (P-022)

Operating constraints:
  - SQ does not replace LC; it modifies the delivery mechanism
  - SQ allocation per identity is bounded by oracle-confirmed supply
  - SQ has mandatory sunset: automatically deactivates when supply
    restoration confirmed by oracle consensus
  - Oracle failure during active SQ triggers P-022 fallback protocol:
    conservative hold → 48h REB window → 72h governance handoff

Termination:
  SQ deactivation requires same oracle confirmation standard as activation.
  Asymmetric deactivation (easier to activate than deactivate) is prohibited.
```

---

## 6. Non-Convertibility Enforcement Layer

```
The non-convertibility constraint is the architectural core of the system.
It is enforced at the ledger layer as follows:

Prohibited operations (rejected at ledger):
  1. Any transaction that increases EC balance in exchange for LC units
  2. Any transaction that increases LC allocation in exchange for EC
  3. Any transaction that increases DW or CR in exchange for EC or LC
  4. Any cross-instrument collateralization
  5. Any derivative instrument whose value tracks another instrument

Ledger enforcement mechanism:
  Each instrument operates on a separate ledger namespace.
  Cross-namespace transactions are structurally impossible, not merely prohibited.
  [FOUNDING COMMITMENT: specific ledger architecture and namespace isolation implementation]

Above-ledger bypass risk:
  The non-convertibility constraint holds at the ledger layer.
  Off-ledger transactions (proxy redemption, service-for-LC exchanges,
  informal barter at instrument boundaries) are not preventable by
  ledger enforcement alone. This is the primary residual risk (T-001).
  P-001 addresses enforcement mechanisms above the ledger layer.

Philosophical basis for non-convertibility:
  The LC's non-monetary design addresses a structural failure that monetary
  dispersal — however well-grounded — cannot escape. When currency carries
  claims on produced and unproduced value simultaneously, it becomes the
  mechanism through which prior obligations are imposed on labor. Individuals
  must service claims they did not incur as the price of remaining within the
  system. A Commons-backed currency with equal monetary dispersal reduces
  this pressure but does not eliminate it — the dispersal flows into the
  reflexive domain through rent increases, subscription price adjustments, and
  wage suppression. Instrument separation is the structural completion of that
  correction: the survival floor exits the monetary domain entirely, carrying
  no prior claims on future labor and entering no price system that can absorb
  it. *(Wolf, Economic Trilogy Part 2: Manifestation and Part 3: Resolution, 2026)*
```

---

## 7. Oracle Subsystem Specification

*P-024 amendment (Phase 4 adversarial audit): N_min raised from 3 to 5;
methodology-class floor raised from 2 to 3. Both changes are required simultaneously
and are mutually reinforcing. See ADVERSARIAL_AUDIT.md PRD-003, Sim D, Finding 7.*

```
Purpose: Provide verified physical capacity data to LC issuance and SQ activation systems.

Minimum configuration (per cohort, per essential category; FC-030 / FC-031 / FC-032 / FC-033):
  N ≥ 5 independent oracle nodes (FC-030 ORACLE_N_MIN)
  At least 3 distinct methodology classes represented (FC-031 METHODOLOGY_CLASS_MIN):
    - At least one node: Institutional statistical modeling
    - At least one node: Community-based participatory research (CBPR)
    - At least one node: Independent physical sampling (Tier 3, ground-truth)
  Pairwise error-series correlation ≤ 0.30 Pearson (FC-032 ORACLE_PAIRWISE_CORRELATION_MAX)
  At least 1 designated adversarial / red-team seat (FC-033 ORACLE_ADVERSARIAL_SEATS_MIN)
  Rationale: BFT theorem n ≥ 3f + 1; f = 1 gives n ≥ 4; N_MIN = 5 provides one-node margin
  above the BFT floor so single-node loss does not drop the cohort below tolerance.

Consensus mechanism (N = 5 floor; thresholds rounded up):
  LC issuance: majority consensus ≥ 3 of 5 in agreement (⌈N/2⌉ + 1 general form)
  SQ activation: supermajority ≥ 4 of 5 in agreement (⌈2N/3⌉ general form; equivalent to 4/5 at N=5)
  SQ deactivation: same threshold as activation (hysteresis prevents chattering)

Failure modes:
  - Single node failure: remaining 4 nodes continue above BFT floor; alert triggered
  - Two concurrent node failures: below BFT floor (3 < 3f+1 for f=1); SQ consensus suspended;
    conservative hold engaged until quorum restored
  - Three or more node failures: P-022 crisis fallback protocol activates; measurement-gated
    decisions (SQ activation, LC tightening) suspended; Annex Y CSM issuance continues on
    pre-committed floor values; governance notified within 1 hour
  - Quorum restoration: FC-100 ORACLE_QUORUM_LOSS_RESTORATION_WINDOW = 14 days of verification
    required before resumed-oracle readings are consensus-binding (prevents flash-recovery
    normalization exploit)

Independence requirements (Annex AL):
  Nodes must differ on all three dimensions:
    1. Epistemological foundation
    2. Data generation process
    3. Standards provenance
  AND produce materially different error structures (prospective error independence test).
  AND historical pairwise Pearson correlation on error series ≤ 0.30 (FC-032) once ≥ 18
  months of overlapping data exists.
  Formal independence without structural independence is insufficient.

Measurement drift defense:
  The oracle independence requirement addresses a failure mode in which
  measurement systems gradually decouple from the physical reality they are
  meant to represent through incremental methodological adjustment. This is
  not a hypothetical risk — modern price indices employ substitution and
  hedonic adjustments that systematically obscure declining purchasing power,
  confirming that measurement adaptation is the primary concealment mechanism
  of systems operating beyond their physical constraints. The Tier-3 physical
  sampling requirement exists specifically because statistical and institutional
  methodologies can converge on shared assumptions while appearing formally
  independent — only direct physical sampling is epistemologically incapable
  of sharing foundations with pure statistical approaches. The oracle system
  is the point where the non-reflexive domain is translated into system inputs.
  If that translation is captured, the entire grounding of LC issuance fails.
  *(Wolf, Economic Trilogy Part 1: Foundation, 2026)*
```

---

## 8. Parameter Summary

| Parameter | Current Value | Status | Authority to Change |
|---|---|---|---|
| EC demurrage rate (r) | 0.5%/month (±0.25%/mo corridor) | FC-050 / FC-051 (founding/commitments.md) | Tier 2 (supermajority + adversarial panel) |
| EC idle threshold (θ) | Resolved in founding/commitments.md | Resolved | Tier 2 |
| LC validity window | 72 hours | Specified | Tier 2 |
| CSM basket composition | Annex Y (canonical) | FC-070, FC-071 (floor is Tier 1) | Tier 1 (downward only); Tier 2 (composition within basket) |
| DW fast-decay rate (r_dw) | 0.15/day | FC-062 | Tier 2 |
| CR slow-decay rate (r_cr) | 20% of normal during grace (P-009) | Specified (partial) | Tier 2 |
| DW sector ceiling | 0.20 (20%) | FC-060 | Tier 1 |
| DW per-person per-cycle cap | 300 | FC-061 | Tier 2 |
| Protected Pause floor | 0.30 DW | FC-020 | Tier 1 |
| Oracle consensus threshold (LC) | ≥ 3 of 5 (⌈N/2⌉+1) | Specified | Tier 2 |
| Oracle consensus threshold (SQ) | ≥ 4 of 5 (⌈2N/3⌉) | Specified | Tier 2 |
| Minimum oracle nodes | N ≥ 5 | FC-030 | Tier 1 |
| Minimum methodology classes | 3 | FC-031 | Tier 1 |
| Max pairwise oracle error correlation | 0.30 (Pearson) | FC-032 | Tier 1 |
| Adversarial oracle seats per cohort | ≥ 1 | FC-033 | Tier 1 |
| Oracle quorum-loss restoration window | 14 days | FC-100 | Tier 1 |
| Attestation stake ratio | 0.20 of attestor balance | FC-080 | Tier 2 |
| Reserve window (CSM×pop×days) | 45 days | FC-070 | Tier 1 |
| Tier 1 amendment signatures (M-of-N) | 7 of 9 | FC-110 | Tier 1 (recursive) |
| Tier 1 amendment timelock | 180 days | FC-111 | Tier 1 (recursive) |
| Founding Order exit supermajority threshold | 2/3 | FC-120 | Tier 1 |
| Founding Order exit unwind window | 730 days | FC-121 | Tier 1 |

---

## 9. Revision Control

This document is governed by the Definition Drift Protection patch (P-004). Changes to definitions in Sections 2–6 constitute protected-term modifications and require FAP review regardless of tier. Changes to parameter values in Section 8 require review at the tier listed.
