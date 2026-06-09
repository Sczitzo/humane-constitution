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

![Instrument Space — Four Primary Lanes + Emergency Overlay](/images/V-010.png)

---

## 2. Flow — State Machine

### 2.1 Definition

Flow is the general-purpose market instrument. It is issued against verified productive commitments, circulates freely within the Flow lane, and remains separate from Essential Access, Voice, Service Record, and Shared Storehouse. Flow is protocol-issued public money: private institutions may intermediate existing Flow, but may not create new Flow or currency-like Flow substitutes by debt expansion. Flow is primarily digital, with physical cash or equivalent offline bearer instruments maintained for resilience, privacy, and universal access.

Plain meaning: Flow is the money lane. It can move through markets, but private lenders cannot create new Flow-like money by lending it into existence. The anti-hoarding and public-finance spine is no longer routine balance decay or net-worth demurrage; it is Commons Return and Universal Stake under Annex D, aimed at value that comes from common inheritance, scarcity, legal privilege, public infrastructure, and protected commons.

### 2.2 State Machine

![Flow Token Lifecycle](/images/V-002.png)

### 2.3 Commons Return and Universal Stake

Commons Return is the public-return architecture defined in Annex D. It is not a routine decay rule on Flow balances, not an income cap, and not a continuous carrying cost on ordinary personal net worth.

**Source bases:** Commons Return may apply only to named source bases: land/location value, natural resources, spectrum and scarce licenses, public-infrastructure uplift, network/platform rents, large succession transfers, and external-capital use of protected commons.

**Protected ordinary use:** survival access, ordinary labor income, basic household exchange, modest homes, ordinary tools, ordinary savings, and genuine productive enterprise are protected from being treated as routine revenue bases.

**Universal Stake:** after Essential Access, reserves, restoration duties, public payment rails, and governance operations are funded, a published share of Commons Return may flow to a protected civic inheritance. Universal Stake may not buy Voice, Service Record, office, identity priority, Essential Access priority, or review-body eligibility.

**Fiscal gate:** no scale claim may say taxes are unnecessary, inflation risk is solved, or Essential Access is sustainably funded until T-029/P-066 evidence shows a costed fiscal adequacy model, source-base receipts, incidence review, downside scenarios, and remaining-tax disclosure.

Plain meaning: the system does not make everyone's money slowly disappear. It asks who is receiving value from land, resources, licenses, public investment, inherited privilege, or protected commons, then tests whether that public return can fund the floor without quietly taxing the poor, inflating the currency, or hiding the real bill.

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

![Essential Access — Entitlement Lifecycle](/images/V-011.png)

### 3.3 Validity and Expiry

**Validity window** (FC-057): 72 hours from issuance timestamp.

**Expiry behavior:** Expired Essential Access is destroyed, not rolled over. No accumulation is possible — this is by design. Accumulation would reintroduce asset-like properties and create a secondary market attack surface.

**Non-transferability enforcement:** Essential Access is bound to identity at issuance. No transfer, delegation, proxy redemption, or assignment is valid. Exception: constitutionally authorised caregiver and dependent mechanisms — including household pooling (up to 20% per adult per week), delegated spend authority, and the Essential Access transfer exception channel for dependents (up to 10% of dependent's weekly entitlement) — are valid transfers. Because a transferable slice of a non-transferable survival entitlement is the channel through which a household abuser or trafficker could capture a dependent's bread, this carve-out is proactively guarded against coercion: every transfer requires dependent-side confirmation (the dependent's own consent at the point of transfer, not the caregiver's assertion of it), transfer patterns are continuously screened for anomalies, and flagged patterns trigger review with the dependent's direct access preserved while the flag is resolved. These mechanisms are capped, identity-bound, auditable, and reversible upon evidence of coercion. The proactive confirmation and anomaly-flagging requirements operate before evidence of coercion is presented, not only after. All other transfers remain prohibited. Redemption requires biometric or equivalent identity confirmation at delivery point (Tier 2 assurance minimum; see P-003), subject to the identity-failure fallback below.

**Identity-failure fallback at redemption:** When biometric or equivalent confirmation fails — whether because a person is undocumented, displaced, biometrically illegible, or has chosen pseudonymous enrollment — redemption escalates to human review rather than terminating. The default outcome of that review is provision, not denial: a person standing at a delivery point in need of the survival basket receives it, and the confirmation failure is recorded for later reconciliation rather than used as grounds for refusal. No person may be excluded from the Constitutional Survival Minimum for lack of identity, documents, or biometric legibility. Survival access is identity-free at the point of need; the identity requirement attaches to civic Voice (anti-Sybil), never to the bread.

### 3.4 Constitutional Survival Minimum (CSM)

CSM is the minimum Essential Access allocation that may never be reduced (INV-001). `CSM = f(verified physical capacity, basket composition, regional variation)`, where basket composition and regional adjustment factors bind through FC-058.

The "may never be reduced" guarantee is a guarantee of delivery capacity — actual food, shelter, and care reaching people — not merely of token issuance. Issuing a Basket-Unit token is not the same act as delivering the basket, and the guarantee binds to the second. The 45-day reserve (FC-070) exists to fund continued CSM delivery through a halt, oracle collapse, or SUSPENDED state, so that delivery does not depend on the system's ability to confirm fresh capacity moment to moment. When reserve plus verified delivery capacity genuinely cannot meet CSM × population, the system declares a System Failure honestly (Annex Y §Y4) and distributes the available real capacity by equal-share-to-need. It does not paper over the shortfall by issuing a stream of Basket-Unit tokens against capacity it cannot confirm; unfillable tokens are not survival, and the system does not pretend otherwise.

**CSM floor enforcement:**
- Even during SUSPENDED state, Essential Access issuance continues at CSM
- System halt conditions do not reduce CSM allocation
- No patch may reduce CSM below its founding value. Any such reduction requires the Tier 1 amendment process (7-of-9 keyholder signatures + 180-day timelock, FC-110/FC-111) or, for changes to the amendment mechanism itself, H-3 refounding authority. (Tier 1 invariant; see INVARIANTS.md INV-001)
- The seven-of-nine keyholder set holding override authority over the survival minimum exercises servant authority, not proprietary authority. That set must publish the identity of each keyholder, a conflict-of-interest disclosure for each, and a standing rotation-and-recall mechanism under which keyholders cycle on a fixed schedule and may be recalled. No keyholder identity may be secret, and no keyholder may sit over the survival minimum without an active path to removal.

### 3.5 Issuance Conditions

Essential Access issuance is automatic and unconditional for all confirmed identity holders. The issuance trigger is the daily system cycle. Issuance amount: `CSM ≤ allocation ≤ enhanced allocation`, per the enhanced-allocation rule bound through FC-056.

Issuance is **not** conditional on contribution record, civic standing, employment status, prior redemption behavior, or any behavioral criterion.

**Provisional (Tier-0) enrollment fallback:** A person who cannot or will not provide identity still enters the CSM-eligible set. Enrollment provides a provisional Tier-0 path: a person who lacks documents, is displaced, is biometrically illegible, or who chooses not to be identified enrolls through the pseudonymous Tier 0 token mechanism (ANNEX_AZ) under the two-tier access model (ANNEX_AK §AK8), and from that moment receives Essential Access issuance like any other holder. No person may be excluded from the Constitutional Survival Minimum for lack of identity, documents, or biometric legibility. A person may freely choose anonymity for their own safety; the cost of that choice is that civic Voice — which requires identity for anti-Sybil integrity — remains unavailable to them. It is never a cost to their bread. Survival access is unconditional and identity-free; Voice is the only instrument gated on confirmed identity, and no path grants Voice without it.

---

## 4. Voice and Service Record — State Machine

### 4.1 Definition

This section defines the two civic instruments:

- **Voice:** Fast-decaying agenda-setting influence. Used in deliberative processes. Cannot accumulate indefinitely.
- **Service Record:** Service history and eligibility record. Slow-decay. Gates access to civic roles and service tiers. Does not represent worth (INV-003).

Plain meaning: Voice helps people shape civic agendas, but it fades quickly. Service Record shows service history for role eligibility, but it must never become a ranking of people.

### 4.2 Voice State Machine

![Voice — Civic Influence Lifecycle](/images/V-012.png)

**Decay function:** `Voice(t) = Voice(0) × e^(−0.15 × t)` where t is days elapsed. Influence is a flow, not a stock — an actor who was influential last cycle carries no advantage without continued participation.

> **Integration:** the decay function governs the Voice balance (a stock that accumulates and decays over calendar time). The quarterly allocation table governs deployment of that balance into a specific decision cycle. Up to 300 raw Voice may be issued to a person per quarterly cycle (FC-060 ceiling); no more than 100 raw Voice may be deployed to any single decision within that cycle (the weight table prohibits input above 100). These are sequential constraints, not competing ones: the balance model sets the stock, the deployment table caps each draw. See Humane_Constitution.md Article VI for the quarterly conversion table (0–50 units = 1.00×; 51–80 = 0.50×; 81–100 = 0.25×; >100 prohibited).

![Voice vs. Service Record Decay Comparison](/images/V-006.png)

### 4.3 Service Record State Machine

![Service Record — Civic Eligibility Lifecycle](/images/V-013.png)

Plain meaning: Service Record records service history and gates eligibility for civic roles. It is not a worth-ranking and must never become one. Its cooling and decay touch role eligibility only — they reach a person's place in the civic-service queue, never their standing as a person and never their access to survival.

**Decay function (SLOW_DECAY):** `SR(t) = SR(0) × (1 − r_cr)^t` — P-009 sets grace-period rate at 20% of normal (FC-063 reserved).

**Dignity firewall:** Service Record cooling or decay may never strip a person's Essential Access eligibility. A Service Record that has fully cooled to zero leaves survival access untouched; the two are on separate ledgers (§6) and the survival floor does not depend on civic standing. No decay schedule, sector ceiling, or cooling action may be used, directly or indirectly, to reduce a person's claim to the Constitutional Survival Minimum.

**Sector ceiling (P-008, P-025):** No single sector may hold > 20% of active Service Record positions. (Prior 25% ceiling superseded. Rationale: in a 5-sector system, a 25% ceiling allows a 3-sector bloc to control 75% of governance panel seats — sufficient for procedural supermajority in any Service Record-governed body. The ceiling must satisfy 3c < 0.667; c < 22.2%; 20% provides margin against coalition capture of rotating oversight roles. Note: P-008 is currently PROPOSED in the Patch Log; P-025 is ACTIVE and holds the operative 20% ceiling pending P-008 full activation.) Enforcement: quarterly audit with proportional cooling.

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

**Ledger enforcement mechanism:** Each instrument operates on a separate ledger namespace. Cross-namespace transactions are structurally impossible at the ledger layer, though above-ledger bypass remains a residual risk (T-001) — they are made structurally impossible inside the system, not merely prohibited, while arrangements outside any ledger entry stay beyond what ledger enforcement can reach. Detailed namespace isolation and ledger implementation belong in the architecture docs; the constitutional requirement is structural impossibility of cross-namespace conversion at the ledger layer, paired with honest acknowledgement of the above-ledger residual.

**Above-ledger bypass risk:** The non-convertibility constraint holds at the ledger layer. Off-ledger transactions (proxy redemption, service-for-Essential Access exchanges, informal barter at instrument boundaries) are not preventable by ledger enforcement alone.

The ledger enforcement prevents in-system conversion: no ledger operation can transform Essential Access into Flow or Voice. However, ledger enforcement cannot prevent private arrangements external to the system — for example, a party that holds Essential Access could arrange services in exchange for Flow transfers made outside any official ledger entry. The practical enforcement layer for above-ledger bypass is non-technical: the 72-hour Essential Access expiry window makes stockpiling economically unattractive; protected-float limits, stale-purpose quarantine, source-base review, and anti-broker enforcement create friction against hoarding Flow for conversion purposes; and the non-cash nature of Essential Access removes the most obvious arbitrage pathway. These are friction mechanisms, not absolute prohibitions. T-001 (shadow convertibility) remains the primary residual risk and is tracked in the Threat Register.

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

> Parameters marked 'reserved' are not design gaps — they are pre-launch blocking gates defined in the Acceptance Protocol (Acceptance_Protocol.md, Pre-Launch Blocking Gates table). The system cannot reach operational activation without binding these values in /founding/commitments.md. Until binding, the reserved parameters represent commitments to specify rather than commitments to a specific value.

| Parameter | Current Value | Status | Authority to Change |
|---|---|---|---|
| Commons Return and Universal Stake | Source bases: land/location value, natural resources, scarce licenses, public-infrastructure uplift, network/platform rents, large succession transfers, and external-capital commons use; protected ordinary use and Universal Stake governed by Annex D | Active-unproven design commitment — fiscal adequacy, incidence, remaining-tax disclosure, and debasement tolerance must be tested before scale claims. Routine demurrage is superseded except as dormant, pilot-gated backstop. | Tier 2 to alter source-base gates and lockbox routing; applicable FAP tier for any dormant backstop activation |

> Annex D governs Commons Return and Universal Stake: source bases, protected ordinary use, Universal Stake, Public Commons Lockbox routing, assessment safeguards, dormant backstops, and the T-029 fiscal adequacy gate. FC-160–FC-184 govern the contract-commitment architecture through which long-horizon capital deployment is reviewed. Evidence from the Commons Return and Universal Stake Evidence Test Package (see Hardening_Queue.md) may inform source-base calibration, lockbox routing, remaining-tax disclosure, debasement tolerance, and contract-commitment parameters.

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
| Independent physical sampling (Tier-3 ground-truth) | At least one node required, as one of the 3 methodology classes | FC-031 | Tier 1 |
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
