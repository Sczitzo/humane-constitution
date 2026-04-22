# Annex AQ — Shared Storehouse Oracle-Failure Fallback Protocol

**Status: ACTIVE — FC-100 bound; Proposal 6 close-out, 2026-04-18**
**Addresses:** T-024 (Shared Storehouse Oracle-Failure During Active Rationing) — the operational void where Shared Storehouse is active and the oracle system fails, loses quorum, or enters an unresolvable dispute with no defined decision path.
**Related patches:** P-022 (this annex's parent patch); P-006 (REB first-responder authority); P-012 AE2.3 (emergency deadlock protocol); P-017 (oracle independence, Annex AL); Annex Y (CSM — continues unconditionally throughout oracle failure).

---

## Purpose

Under ordinary conditions, the oracle system provides the measurement that gates Shared Storehouse activation, continuation, and lapse. The P-017 N≥5 floor with methodology-class diversity (Annex AL) makes sustained oracle capture very difficult. What it does not do is guarantee oracle *availability*.

Two scenarios produce oracle unavailability during active Shared Storehouse:

1. **Benign failure.** Infrastructure outage, multi-node disagreement that cannot be resolved inside the normal deliberation window, or accreditation-related quorum loss (e.g., a node withdrawing for compliance reasons).
2. **Adversarial failure.** Deliberate oracle disruption timed to an active Shared Storehouse period — per T-024 × T-018 compound — designed to force Shared Storehouse lapse (if the default is "lapse on oracle silence") or force Shared Storehouse continuation beyond actual need (if the default is "continue on oracle silence").

Either default choice — lapse or continue — is exploitable. The protocol's answer is to reject both defaults in favor of a **conservative hold** with defined authority transfer and a mandatory reconciliation window on restoration.

This annex operationalizes that response and binds the restoration-window duration to Founding Commitment FC-100.

---

## Section 1 — Conservative Hold (Default State)

When the oracle system loses quorum (fewer than the N=5 BFT-tolerant minimum per Annex AL §3.4, or fewer than the Shared Storehouse-supermajority-achievable 4 of 5), or enters an unresolvable consensus dispute that persists beyond the ordinary deliberation window, **Shared Storehouse enters Conservative Hold**:

- **No escalation.** Shared Storehouse rationing level remains where it was at the moment of quorum loss. The rate, scope, and category breadth are frozen.
- **No expansion.** Shared Storehouse cannot be applied to new categories under Conservative Hold. Expansion requires restored oracle quorum.
- **No automatic lapse.** Shared Storehouse does not lapse merely because the oracle went silent. Lapse during Conservative Hold requires explicit REB or governance-handoff decision.
- **No demurrage adjustment.** Demurrage rates tied to oracle-measured scarcity indicators (where applicable) freeze at their Conservative Hold entry values.
- **CSM (Annex Y) continues unconditionally.** The survival floor — per-person daily minimums for calories, water, shelter, and essential medicines under Annex Y — does not depend on oracle availability. CSM issuance remains active through oracle failure and through all subsequent authority transfers.

Conservative Hold is the **designed default**, not a failure state — it is explicitly the correct system response to oracle silence during Shared Storehouse. Detection-side alarms fire; operational-side behavior holds.

The Article VII public dashboard displays a prominent **Shared Storehouse-Active-With-Oracle-Failure** indicator in real time, so oracle failure during active Shared Storehouse is publicly visible — the existence of Conservative Hold cannot be hidden by the bodies operating it.

---

## Section 2 — 48-Hour REB First-Responder Window

The **Regional Executive Body (REB)**, using its existing P-006 first-responder authority, has defined authority during the first 48 hours of oracle failure to issue a provisional *hold continuation* or *managed lapse* decision based on non-oracle physical indicators.

### 2.1 — REB Authority Scope

The REB may:
- **Continue** Conservative Hold at its current level (the default — no REB action required to continue).
- **Begin a managed lapse** — phase-down schedule for Shared Storehouse if non-oracle physical indicators show the underlying shortage has resolved or materially reduced.
- **Hold at a reduced level** — step Shared Storehouse down by one tier if indicators partially support relaxation but not full lapse.

The REB may **not**:
- Expand Shared Storehouse to new categories.
- Raise Shared Storehouse severity above the Conservative Hold level.
- Make decisions that affect CSM (Annex Y) issuance or the survival floor.
- Override findings from the adversarial-seat oracle node (FC-033) where that node has documented a reason Conservative Hold should persist.

### 2.2 — Non-Oracle Physical Indicators

REB decisions under this window rely on indicators collected outside the failed oracle system:
- **Distribution fill rates** — from Essential Access-redemption records, aggregated at regional scale.
- **Vendor inventory reports** — from Shared Storehouse-category retailers and distributors, reported under Article VII transparency rules.
- **Logistics indicators** — shipping manifests, wholesale flow rates, storage-facility inventory.
- **Community reports** — aggregated from the CBPR oracle class (Annex AL Class 2), if those specific nodes remain available when the main oracle cohort is in failure.

These indicators are **not oracle outputs**. They are an REB operational-authority instrument. They are not bound by the FC-030/031/032/033 cohort requirements and are *not* substitutable for oracle consensus during normal operation. They are only admissible as the basis for REB decisions under this annex's defined 48-hour window.

### 2.3 — REB Decision Process and Publication

REB decisions under this window:
1. Must be made by a formally constituted REB quorum under the published REB governance rules.
2. Must be published **immediately** with full evidence base, named decision-makers, and the non-oracle indicator dataset used.
3. Must include a statement of how the decision would differ if the failed oracle were operating (counterfactual reasoning), so the subsequent reconciliation review has a documented prediction.
4. Carry personal civic-record attribution per the Annex AS attestation-stake mechanism scaled to the decision's scope — REB members attest to the physical-indicator basis of their decision and stake Service Record accordingly.

REB decisions that cannot be made within 48 hours, or cases where the REB itself is in deadlock, transfer immediately to the 72-hour governance handoff (§3) without waiting for the full 48-hour window to expire.

---

## Section 3 — 72-Hour Governance Handoff

If the oracle system is not restored within 72 hours of failure — or if REB decision-making itself is in deadlock — the matter transfers to the **emergency deadlock resolution protocol** under P-012 AE2.3.

### 3.1 — Arbitration Panel

The emergency deadlock panel:
- 3 members, convened within 12 hours of the handoff trigger.
- Drawn from: 1 Ombuds sub-office (Annex AI federated structure); 1 technical measurement specialist independent of the failed oracle cohort; 1 affected-population representative from the Shared Storehouse-rationed categories' consumer side.
- Panel members cannot have made prior public statements about the specific Shared Storehouse activation in question; no 5-year prior relationship with the Regional Executive Body members involved.

### 3.2 — Panel Authority

The panel may:
- Issue a **time-bound Shared Storehouse continuation** with a defined expiration (maximum 14 days from panel decision, per FC-100 alignment — see §4).
- Order a **staged lapse** schedule if physical indicators support supply recovery.
- Require specific non-oracle evidence gathering and reconvene within 72 hours.
- Order **escalation to enforcement** if oracle failure appears deliberately engineered (T-018 × T-024 compound).

The panel **cannot**:
- Expand Shared Storehouse to new categories.
- Override CSM (Annex Y) issuance — the survival floor is unconditional.
- Bypass the FC-100 restoration-window verification period (§4) once oracle operation resumes.

### 3.3 — Survival Floor Unconditionality

The survival floor bridge established in P-012 AE2.3 is **explicitly unconditional** throughout oracle failure. Regardless of Conservative Hold, REB decision, panel decision, or reconciliation-review outcome, the Annex Y Constitutional Survival Minimum — 2,100 kcal/adult, 50 L water, shelter, essential medicines — continues to be issued. Panels and REB cannot make decisions that suspend or reduce CSM. This is the non-negotiable design anchor: oracle failure cannot be allowed to become a deprivation vector.

---

## Section 4 — Oracle Restoration & FC-100 Verification Window

### 4.1 — Restoration Defined

Oracle restoration occurs when:
- The cohort re-achieves quorum at ≥ 4 of 5 nodes operational (Shared Storehouse-supermajority-achievable floor).
- Methodology-class coverage (FC-031 ≥ 3 classes) is re-verified.
- Pairwise error correlation (FC-032 ≤ 0.30) is re-verified against any new node substituted during the failure period.
- Adversarial-seat participation (FC-033) is confirmed.

### 4.2 — FC-100 Verification Window

**FC-100 `ORACLE_QUORUM_LOSS_RESTORATION_WINDOW` = 14 days.**

After restoration, the oracle cohort's output is **not immediately consensus-binding for Shared Storehouse decisions**. For 14 days following restoration:

- Restored-oracle readings are **reported publicly** and compared against non-oracle physical indicators, REB observations, and arbitration-panel findings from the failure period.
- Shared Storehouse-binding decisions during the 14-day window continue to route through the §3 arbitration panel (or REB within the first 48 hours of the window).
- Only at the end of the 14-day window, with the restored cohort's readings having been consistent with independent indicators (or the divergence having been explained through documented reconciliation), does the cohort's output become consensus-binding again.

**Rationale.** A compromised oracle that fails and then appears to "recover" could be the attack vector itself. A 14-day verification period prevents **flash-recovery normalization** where the attacker simply restores the manipulated infrastructure and resumes operation with everyone relieved that measurement is back. The window is long enough that sustained manipulation would reveal itself through comparison to independent indicators; short enough that genuine benign failures do not keep the system in governance-handoff mode indefinitely.

The 14-day value is derived directly from Founding Commitment FC-100 in `/founding/commitments.md` and is a Tier 1 commitment — changeable only under the H-3 amendment authority and the 180-day timelock (FC-111).

### 4.3 — Reconciliation Review

At the end of each oracle-failure incident, within 7 days of the 14-day verification window's close, a **Reconciliation Review** is published:
- Timeline of the failure: detection, Conservative Hold entry, REB decisions, handoff to panel, restoration, verification window completion.
- Comparison of REB and panel decisions made during failure against the (now verified) restored-oracle readings. Where provisional decisions differed from what the oracle would have indicated, the discrepancy is documented with root-cause analysis.
- Assessment of whether any patterns suggest the oracle failure was engineered (T-018 × T-024 compound). If so, immediate referral to the Enforcement Panel (Annex AJ §4) with full evidence.
- Recommendations for improving the non-oracle physical indicator methodology (§2.2) based on observed divergence or convergence with oracle readings.

Persistent REB-oracle divergence across multiple failure incidents triggers an **independent review of the non-oracle physical indicator methodology** itself — the methodology may require updating, or it may be under manipulation pressure from the same actors who targeted the oracle.

---

## Section 5 — Compound Attack: T-024 × T-018 × T-022

The highest-consequence compound attack on this annex is:
1. **T-018** (PCRP false-trigger exhaustion) drains audit capacity during a genuine supply shock.
2. **T-024** (Shared Storehouse oracle-failure during active rationing) coincides with the shock, triggering Conservative Hold.
3. **T-022** (hostile electoral cycle) — the REB during the 48-hour window is composed of members aligned with the adversary and makes decisions under physical-indicator evidence that was itself manipulated.
4. **Oracle "restoration"** occurs inside the 14-day verification window with restored data that continues to mislead.

The FC-100 14-day verification period is the strongest single defense against this compound because it forces public comparison against independent data during the window when manipulation is most likely. The reconciliation review (§4.3) is the second line — even if the window completes without detection, subsequent independent review will surface systematic divergence.

Ultimately, defense against sustained coordinated T-022 compound attacks is structural, not operational: the federated Ombuds (Annex AI, Proposal 8) and the Tier 1 architectural enforcement (Proposal 1 `/architecture/` layer) are what prevent the REB, the panel, and the oracle restoration from all being simultaneously captured by a single political coalition. This annex's role is to ensure that during oracle silence, the protocol's response is **designed**, not improvised — so that capture must succeed at multiple independent points, not just one.

---

## Section 6 — Governance

**This annex is governed as P-004 protected specification.** Core design elements — Conservative Hold default, REB authority scope and limits, CSM unconditionality, FC-100 verification window — cannot be modified without Tier 2 amendment. The FC-100 value itself is Tier 1 (H-3) under `/founding/commitments.md`.

**Dependencies:**
- REB formally constituted with defined authority for non-oracle physical indicator assessments under the published governance rules.
- Non-oracle physical indicator methodology published and reviewed annually (§2.2).
- P-012 AE2.3 emergency deadlock protocol operative (prerequisite for §3 handoff).
- Annex Y CSM ACTIVE (prerequisite for survival floor unconditionality).
- Annex AL ACTIVE (prerequisite for restoration verification — FC-031, FC-032, FC-033 all apply at restoration).
- Federated Ombuds (Annex AI, Proposal 8) — required for §3.1 arbitration-panel composition.

**Annual Audit.** Article VII publishes an Annual Oracle Resilience Audit that includes:
- All oracle-failure incidents during the year, their duration, and their Conservative Hold / REB / panel progression.
- Reconciliation-review findings per incident.
- Any deliberate-failure findings and enforcement referrals.
- Trends in non-oracle physical indicator accuracy (measured against restored oracle data at each reconciliation).
- Recommendations for methodology or FC-100 calibration.

---

*This document is Annex AQ of the Humane Constitution. Operative as an ACTIVE specification as of Proposal 6 close-out (2026-04-18). Closes T-024.*
