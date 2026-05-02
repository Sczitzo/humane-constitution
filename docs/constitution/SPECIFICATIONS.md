# SPECIFICATIONS.md — Formal System Specifications

**Document type:** Technical specification  
**Scope:** Five-instrument model (Flow, Essential Access, Voice, Service Record, and Shared Storehouse) — state machine definition, transition rules, decay functions, and public-money constraints
**Format:** Systems design / formal state machine  
**Status:** Specification-grade (bound values resolve through `/founding/commitments.md`; unresolved activation gates use reserved FC identifiers until they are bound)

---

## 1. System Overview

The Humane Constitution operates four primary instruments and one emergency instrument. Each instrument is a bounded state machine with defined issuance conditions, transition rules, decay functions, and termination states. The lanes are non-convertible by design; the non-convertibility constraint is enforced at the ledger layer, not at the application layer. Flow may exist as public digital balances and as physical/offline bearer instruments inside the same monetary lane.

## Plain-Language Guide

This document is the machine-room version of the Constitution. It explains what each instrument does, how it starts, how it changes, when it ends, and what it is never allowed to turn into.

The simple version:

- **Flow** is public money for ordinary buying, selling, saving, and investing.
- **Essential Access** is not money. It is daily access to basic needs.
- **Voice** is short-lived civic influence. It cannot be saved forever.
- **Service Record** is a record of service and eligibility. It is not a human-worth score.
- **Shared Storehouse** is only for scarcity emergencies.

The most important rule is separation: none of these instruments may be traded into another one.

```statechart
title: Instrument Space — Four Primary Lanes + Emergency Overlay
primary: FLOW, ESSENTIAL_ACCESS, VOICE, SERVICE_RECORD
terminal: NO_CONVERSION
warning: SHARED_STOREHOUSE

FLOW -> NO_CONVERSION: market lane
ESSENTIAL_ACCESS -> NO_CONVERSION: access lane
VOICE -> NO_CONVERSION: civic lane
SERVICE_RECORD -> NO_CONVERSION: eligibility lane
SHARED_STOREHOUSE -> NO_CONVERSION: emergency only
```

---

## 2. Flow — State Machine

### 2.1 Definition

Flow is the general-purpose market instrument. It is issued against verified productive commitments, circulates freely within the Flow lane, and is subject to demurrage (time-decay on idle balances) to discourage hoarding. Flow is protocol-issued public money: private institutions may intermediate existing Flow, but may not create new Flow or currency-like Flow substitutes by debt expansion. Flow is primarily digital, with physical cash or equivalent offline bearer instruments maintained for resilience, privacy, and universal access.

Plain meaning: Flow is the money lane. It can move through markets, but private lenders cannot create new Flow-like money by lending it into existence. Idle Flow slowly loses value so holding large unused balances is less attractive than putting resources to work.

### 2.2 State Machine

```statechart
title: Flow — Token Lifecycle
primary: ACTIVE
terminal: SETTLED, RETIRED
warning: IDLE, DECAYED

UNISSUED -> ACTIVE: issuance
ACTIVE -> IDLE: idle threshold
ACTIVE -> COMMITTED: escrow (P-023)
ACTIVE -> RETIRED: retirement
IDLE -> ACTIVE: deployment
IDLE -> DECAYED: demurrage
COMMITTED -> ACTIVE: escrow release
COMMITTED -> SETTLED: milestone verified
DECAYED -> ACTIVE: balance adjusted
DECAYED -> RETIRED: balance zero
```

![Flow Token Lifecycle](/images/V-002.png)

### 2.3 Demurrage Function

Demurrage is a time-decay and carrying charge applied to idle Flow balances. It is not assessed on survival access, ordinary labor, or basic household exchange. Charged Flow is split between retirement and Public Finance & Commons Revenue (PFCR) receipts under a published routing rule.

Plain meaning: the idle-money fee is aimed at hoarding, not at survival, wages, or normal household life.

**Variables:** `B(t)` = Flow balance at time t; `r` = demurrage rate per period (FC-050 baseline; FC-051 review corridor); `t_idle` = time elapsed since last productive deployment; `θ` = idle threshold below which demurrage begins (FC-052 reserved).

**Demurrage function:** If `t_idle < θ`, the balance is active and no decay applies: `B(t) = B(0)`. If `t_idle ≥ θ`, continuous exponential decay applies: `B(t) = B(0) × e^(−r × t_idle)`. Alternatively, discrete periodic application: `B(t+1) = B(t) × (1 − r)`.

**Retirement:** When `B(t) < ε` (minimum balance threshold, FC-053 reserved), the balance is retired from circulation.

**Charge routing:** Let `C(t) = B_before(t) − B_after(t)` and `α` = PFCR routing share (FC-054 reserved). Then `PFCR_receipt(t) = α × C(t)` and `Retired_Flow(t) = (1 − α) × C(t)`.

`r` must be calibrated so that the deployment window produces a meaningful anti-hoarding signal without suppressing long-horizon productive investment. Annex AR Section 2 contains worked examples at r = 0.5%, 1.0%, 2.0% monthly. P-023 establishes that investment exemptions are prohibited; demurrage applies during escrow periods — the discipline is the point. `α` must be published, reviewable, and fiscally bounded under PFCR rules.

### 2.4 Issuance Constraints

**Issuance conditions** (all must be satisfied):

1. Verified productive commitment exists in registry
2. Issuing authority is active and not under audit
3. Commitment has not been previously issued against
4. Physical capacity exists to absorb the production (oracle confirmation required)
5. No private institution is simultaneously creating a duplicative Flow-denominated claim intended to circulate as money against the same commitment

**Issuance ceiling:** Total Flow in circulation ≤ `f(verified productive commitments)`, where `f` is the published issuance-ceiling function (FC-055 reserved).

### 2.5 Retail Banking and Household Finance Constraints

**Retail public-banking floor:**
- Basic accounts, wage receipt, bill pay, transfers, cash conversion, and fraud recovery operate on PFCR-funded public infrastructure
- A guaranteed public postal-bank or public-bank option must remain available
- Licensed providers may offer the same baseline retail services on the common public rail if they satisfy interoperability and service rules

**Household finance constraints:**
- Compounding interest on household ordinary-life debt is prohibited
- No household debt may be cross-collateralized against the Constitutional Survival Minimum or transformed into a revolving survival trap
- Securitization of household survival-linked claims is prohibited
- Retail fee chains may not function as hidden interest equivalents

---

## 3. Essential Access — State Machine

### 3.1 Definition

Essential Access is a non-transferable, non-convertible entitlement to physical basket access. It is denominated in Basket Units (BU), not monetary value. One BU represents one day's access to the Constitutional Survival Minimum basket (food, water, shelter, healthcare, transit). Essential Access is issued by the system, not earned or purchased.

Plain meaning: Essential Access is a daily claim to basic needs. It cannot be sold, saved up, or used as money.

### 3.2 State Machine

```statechart
title: Essential Access — Entitlement Lifecycle (per identity, per day)
primary: ACTIVE
terminal: REDEEMED, EXPIRED, RETIRED
suspended: SUSPENDED

PENDING -> ACTIVE: daily allocation (system)
ACTIVE -> REDEEMED: basket redemption
ACTIVE -> EXPIRED: 72 h elapsed, no rollover
ACTIVE -> SUSPENDED: re-verification trigger
SUSPENDED -> ACTIVE: re-verification confirmed
SUSPENDED -> RETIRED: permanent deregistration
```

### 3.3 Validity and Expiry

**Validity window** (FC-057): 72 hours from issuance timestamp.

**Expiry behavior:** Expired Essential Access is destroyed, not rolled over. No accumulation is possible — this is by design. Accumulation would reintroduce asset-like properties and create a secondary market attack surface.

**Non-transferability enforcement:** Essential Access is bound to identity at issuance. No transfer, delegation, proxy redemption, or assignment is valid. Redemption requires biometric or equivalent identity confirmation at delivery point (Tier 2 assurance minimum; see P-003).

### 3.4 Constitutional Survival Minimum (CSM)

CSM is the minimum Essential Access allocation that may never be reduced (INV-001). `CSM = f(verified physical capacity, basket composition, regional variation)`, where basket composition and regional adjustment factors bind through FC-058.

**CSM floor enforcement:**
- Even during SUSPENDED state, Essential Access issuance continues at CSM
- System halt conditions do not reduce CSM allocation
- No patch may reduce CSM below its founding value without full constitutional refounding (Tier 1 invariant; see INVARIANTS.md INV-001)

### 3.5 Issuance Conditions

Essential Access issuance is automatic and unconditional for all confirmed identity holders. The issuance trigger is the daily system cycle. Issuance amount: `CSM ≤ allocation ≤ enhanced allocation`, per the enhanced-allocation rule bound through FC-056.

Issuance is **not** conditional on contribution record, civic standing, employment status, prior redemption behavior, or any behavioral criterion.

---

## 4. Voice and Service Record — State Machine

### 4.1 Definition

This section defines the two civic instruments:

- **Voice:** Fast-decaying agenda-setting influence. Used in deliberative processes. Cannot accumulate indefinitely.
- **Service Record:** Service history and eligibility record. Slow-decay. Gates access to civic roles and service tiers. Does not represent worth (INV-003).

Plain meaning: Voice helps people shape civic agendas, but it fades quickly. Service Record shows service history for role eligibility, but it must never become a ranking of people.

### 4.2 Voice State Machine

```statechart
title: Voice — Civic Influence Lifecycle (fast-decay · r = 0.15/day)
primary: ACTIVE
terminal: EXHAUSTED
warning: DECAYED

INACTIVE -> ACTIVE: civic activation
ACTIVE -> APPLIED: deliberative commitment
ACTIVE -> DECAYED: fast-decay cycle
APPLIED -> ACTIVE: cycle completes, residual returned
DECAYED -> ACTIVE: balance adjusted
DECAYED -> EXHAUSTED: balance reaches zero
EXHAUSTED -> ACTIVE: new issuance (qualifying participation)
```

**Decay function:** `Voice(t) = Voice(0) × e^(−0.15 × t)` where t is days elapsed. Influence is a flow, not a stock — an actor who was influential last cycle carries no advantage without continued participation.

> **Note:** The decay function above governs how a Voice balance changes over calendar time. At any decision point, the current balance is *also* subject to the effective-weight conversion table in Humane_Constitution.md Article VI (quarterly buckets: 0–50 units = 1.00×; 51–80 = 0.50×; 81–100 = 0.25×; >100 prohibited). These are two separate rules operating on the same instrument. See Humane_Constitution.md for the quarterly conversion table.

![Voice vs. Service Record Decay Comparison](/images/V-006.png)

### 4.3 Service Record State Machine

```statechart
title: Service Record — Civic Eligibility Lifecycle (slow-decay)
primary: ACTIVE
terminal: INACTIVE
warning: SLOW_DECAY
suspended: SUSPENDED, COOLING

INACTIVE -> ACTIVE: first qualifying service
ACTIVE -> COOLING: role completion (anti-entrenchment)
ACTIVE -> SUSPENDED: investigation triggered
ACTIVE -> SLOW_DECAY: inactivity threshold
COOLING -> ACTIVE: cooling period elapsed
SUSPENDED -> ACTIVE: investigation cleared
SUSPENDED -> INACTIVE: deregistered
SLOW_DECAY -> ACTIVE: new service event
SLOW_DECAY -> INACTIVE: balance reaches zero
```

**Decay function (SLOW_DECAY):** `SR(t) = SR(0) × (1 − r_cr)^t` — P-009 sets grace-period rate at 20% of normal (FC-063 reserved).

**Sector ceiling (P-008, P-025):** No single sector may hold > 20% of active Service Record positions. (Prior 25% ceiling superseded — in a 5-sector system 25% permits a 3-sector coalition to reach 75% Voice, i.e. supermajority control. Ceiling must satisfy 3c < 0.667; c < 22.2%; 20% provides margin.) Enforcement: quarterly audit with proportional cooling.

---

## 5. Shared Storehouse — Emergency Instrument

Shared Storehouse is not a primary instrument. It is an emergency overlay activated only under verified scarcity conditions.

**Activation conditions** (all required):

1. Oracle consensus: verified physical supply below the category threshold rule bound through FC-072
2. PCRP sentinel indicator breach (P-006)
3. Governance authorization: CRP decision within 48h (P-022)

**Operating constraints:** Shared Storehouse does not replace Essential Access; it modifies the delivery mechanism. Allocation per identity is bounded by oracle-confirmed supply. It carries a mandatory sunset — automatically deactivating when supply restoration is confirmed by oracle consensus. Oracle failure during active Shared Storehouse triggers the P-022 fallback protocol: conservative hold → 48h REB window → 72h governance handoff.

**Termination:** Deactivation requires the same oracle confirmation standard as activation. Asymmetric deactivation (easier to activate than deactivate) is prohibited.

Plain meaning: Shared Storehouse is the emergency rationing tool. It does not replace Essential Access, and it must turn off when the shortage is over.

---

## 6. Non-Convertibility Enforcement Layer

The non-convertibility constraint is the architectural core of the system. It is enforced at the ledger layer as follows.

**Prohibited operations** (rejected at ledger):

1. Any transaction that increases Flow balance in exchange for Essential Access units
2. Any transaction that increases Essential Access allocation in exchange for Flow
3. Any transaction that increases Voice or Service Record in exchange for Flow or Essential Access
4. Any cross-instrument collateralization
5. Any derivative instrument whose value tracks another instrument

**Ledger enforcement mechanism:** Each instrument operates on a separate ledger namespace. Cross-namespace transactions are structurally impossible, not merely prohibited. Detailed namespace isolation and ledger implementation belong in the architecture docs; the constitutional requirement is structural impossibility of cross-namespace conversion.

**Above-ledger bypass risk:** The non-convertibility constraint holds at the ledger layer. Off-ledger transactions (proxy redemption, service-for-Essential Access exchanges, informal barter at instrument boundaries) are not preventable by ledger enforcement alone.

The ledger enforcement prevents in-system conversion: no ledger operation can transform Essential Access into Flow or Voice. However, ledger enforcement cannot prevent private arrangements external to the system — for example, a party that holds Essential Access could arrange services in exchange for Flow transfers made outside any official ledger entry. The practical enforcement layer for above-ledger bypass is non-technical: the 72-hour Essential Access expiry window makes stockpiling economically unattractive; demurrage costs make hoarding Flow for conversion purposes expensive; and the non-cash nature of Essential Access removes the most obvious arbitrage pathway. These are friction mechanisms, not absolute prohibitions. T-001 (shadow convertibility) remains the primary residual risk and is tracked in the Threat Register.

P-001 addresses enforcement mechanisms above the ledger layer.

**Plain basis for non-convertibility:** Essential Access stays outside money because money can be captured by prices, rent, debt, and wage pressure. If survival support is paid as spendable money, landlords, sellers, creditors, and employers can absorb much of it. Instrument separation prevents that. The survival floor is delivered as access to real needs, not as extra money that the market can pull away. *(Wolf, Economic Trilogy Part 2: Manifestation and Part 3: Resolution, 2026)*

---

## 7. Oracle Subsystem Specification

*P-024 amendment (Phase 4 adversarial audit): N_min raised from 3 to 5;
methodology-class floor raised from 2 to 3. Both changes are required simultaneously
and are mutually reinforcing. See ADVERSARIAL_AUDIT.md PRD-003, Sim D, Finding 7.*

Plain meaning: oracles are the system's reality checkers. They confirm whether real-world capacity exists before the system issues survival access or turns on emergency scarcity rules.

**Purpose:** Provide verified physical capacity data to Essential Access issuance and Shared Storehouse activation systems.

**Minimum configuration** (per cohort, per essential category; FC-030 / FC-031 / FC-032 / FC-033):
- N ≥ 5 independent oracle nodes (FC-030 `ORACLE_N_MIN`)
- At least 3 distinct methodology classes represented (FC-031 `METHODOLOGY_CLASS_MIN`): at least one node using institutional statistical modeling; at least one using community-based participatory research (CBPR); at least one using independent physical sampling (Tier 3, ground-truth)
- Pairwise error-series correlation ≤ 0.30 Pearson (FC-032 `ORACLE_PAIRWISE_CORRELATION_MAX`)
- At least 1 designated adversarial / red-team seat AND ≥20% of total oracle nodes must be adversarial (both conditions FC-033 `ORACLE_ADVERSARIAL_SEATS_MIN`; Tier 1). Any expansion of the oracle council must maintain the ≥20% adversarial proportion. Reducing the adversarial proportion below 20% is equivalent to a Tier 1 amendment.

*Rationale: BFT theorem `n ≥ 3f + 1`; `f = 1` gives `n ≥ 4`; `N_MIN = 5` provides one-node margin above the BFT floor so single-node loss does not drop the cohort below tolerance.*

**Consensus mechanism** (N = 5 floor; thresholds rounded up):
- Essential Access issuance: majority consensus ≥ 3 of 5 in agreement (`⌈N/2⌉ + 1` general form)
- Shared Storehouse activation: supermajority ≥ 4 of 5 in agreement (`⌈2N/3⌉` general form; equivalent to 4/5 at N=5)
- Shared Storehouse deactivation: same threshold as activation (hysteresis prevents chattering)

**Failure modes:**
- *Single node failure:* remaining 4 nodes continue above BFT floor; alert triggered
- *Two concurrent node failures:* below BFT floor (3 < 3f+1 for f=1); Shared Storehouse consensus suspended; conservative hold engaged until quorum restored
- *Three or more node failures:* P-022 crisis fallback protocol activates; measurement-gated decisions (Shared Storehouse activation, Essential Access tightening) suspended; Annex Y CSM issuance continues on pre-committed floor values; governance notified within 1 hour
- *Quorum restoration:* FC-100 `ORACLE_QUORUM_LOSS_RESTORATION_WINDOW` = 14 days of verification required before resumed-oracle readings are consensus-binding (prevents flash-recovery normalization exploit)

**Independence requirements** (Annex AL): Nodes must differ on all three dimensions — epistemological foundation, data generation process, and standards provenance — AND produce materially different error structures (prospective error independence test), AND historical pairwise Pearson correlation on error series ≤ 0.30 (FC-032) once ≥ 18 months of overlapping data exists. Formal independence without structural independence is insufficient.

**Measurement drift defense:** Measurement can slowly stop matching lived reality. Different official methods can also start sharing the same blind spots. That is why the oracle system requires several kinds of measurement and at least one direct physical sampling method — somebody must check the real thing, not just the model. If the reality check is captured, Essential Access can become accurate on paper while failing in practice. *(Wolf, Economic Trilogy Part 1: Foundation, 2026)*

![Oracle Polycentric Architecture](/images/V-007.png)

---

## 8. Parameter Summary

| Parameter | Current Value | Status | Authority to Change |
|---|---|---|---|
| Flow demurrage rate (r) | 0.5%/month (±0.25%/mo corridor) | Binding design commitment — rate provisional pending evidence calibration (Phase 5). See Claims_Evidence_Register.md FC-050 entry. FC-050 / FC-051 (founding/commitments.md) | Tier 2 (supermajority + adversarial panel) |

> FC-050 sets the demurrage rate. FC-160–FC-184 govern the contract-commitment architecture through which that rate is implemented. Evidence from the Demurrage Evidence Test Package (see Hardening_Queue.md) may inform revisions to both the rate (FC-050, via standard Tier 3 FAP) and the commitment architecture (FC-160–FC-184).

| Flow idle threshold (θ) | Resolved in founding/commitments.md | Resolved | Tier 2 |
| Essential Access validity window | 72 hours | Specified | Tier 2 |
| CSM basket composition | Annex Y (canonical) | FC-070, FC-071 (floor is Tier 1) | Tier 1 (downward only); Tier 2 (composition within basket) |
| Voice fast-decay rate (r_dw) | 0.15/day | FC-062 | Tier 2 |
| Service Record slow-decay rate (r_cr) | 20% of normal during grace (P-009) | Specified (partial) | Tier 2 |
| Voice sector ceiling | 0.20 (20%) | FC-060 | Tier 1 |
| Voice per-person per-cycle cap | 300 | FC-061 | Tier 2 |
| Protected Pause floor | 0.30 Voice | FC-020 | Tier 1 |
| Oracle consensus threshold (Essential Access) | ≥ 3 of 5 (⌈N/2⌉+1) | Specified | Tier 2 |
| Oracle consensus threshold (Shared Storehouse) | ≥ 4 of 5 (⌈2N/3⌉) | Specified | Tier 2 |
| Minimum oracle nodes | N ≥ 5 | FC-030 | Tier 1 |
| Minimum methodology classes | 3 | FC-031 | Tier 1 |
| Max pairwise oracle error correlation | 0.30 (Pearson) | FC-032 | Tier 1 |
| Adversarial oracle seats per cohort | ≥1 adversarial node AND ≥20% of total oracle nodes must be adversarial (both conditions Tier 1). Any expansion of the oracle council must maintain the ≥20% adversarial proportion. Reducing the adversarial proportion below 20% is equivalent to a Tier 1 amendment. | FC-033 | Tier 1 |
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
