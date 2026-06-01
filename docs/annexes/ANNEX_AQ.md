# ANNEX AQ — Shared Storehouse Oracle-Failure Fallback Protocol

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Define what the Shared Storehouse rationing system does when the oracle network fails during an active rationing period — establishing a designed protocol instead of an improvised one. |
> | **Who it protects** | People dependent on Shared Storehouse rationing during a supply shortage; their access must not be cut off simply because the measurement system went offline. |
> | **Failure risk** | Oracle failure during active rationing creates an operational void: either the system lapses (leaving people without access) or continues unchecked (overreach). Both defaults are exploitable. A coordinated attacker can silence the oracle to manipulate the outcome either way. |
> | **Evidence status** | Active — unproven |
> | **Linked risks** | T-024 (Shared Storehouse Oracle-Failure During Active Rationing); T-018 × T-024 compound; P-022; Annex Y (CSM survival floor); Annex AL (oracle accreditation); FC-100 |

> **Provenance:** Implements [P-022 — Shared Storehouse Oracle-Failure Fallback Protocol] · Addresses T-024 · Status: **ACTIVE**

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

**Quorum-loss sensing mechanism:** Conservative Hold cannot activate without a defined detection path. The oracle monitoring system must: (a) poll each accredited oracle node on a published cadence (maximum 15-minute intervals during active Shared Storehouse); (b) detect quorum loss — defined as fewer than 5 responsive nodes or an unresolvable consensus dispute persisting beyond one full deliberation cycle — within one polling cadence after the event; (c) automatically set system state to `CONSERVATIVE_HOLD` within the same cycle; and (d) fire the Article VII dashboard indicator and notify the REB within 15 minutes of state change. Quorum loss from **clean failure** (node goes offline and stops responding) and from **degraded-output failure** (node continues responding but with outputs inconsistent with the rest of the quorum by more than the FC-032 correlation threshold) are both treated as quorum-loss events. A degraded-output node is flagged for accreditation review while Conservative Hold is active; it does not count toward quorum. The body responsible for the oracle monitoring system (named in ANNEX_AL §3) holds formal authority to declare Conservative Hold; the system generates the declaration automatically when polling confirms quorum loss, and the named authority publishes confirmation within one hour.

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

### 2.2 — Affected-Population Consultative Voice

The first deprivation-relevant call is made inside this 48-hour window, not at the §3 panel. The burdened therefore hold a seat early, not only late. Before issuing a managed lapse or a reduced-level hold under §2.1, the REB convenes — within the first 24 hours of oracle failure — an **affected-population consultative voice** drawn from the consumer side of the Shared Storehouse-rationed categories, paralleling the affected-population representative seat at the §3.1 panel.

This voice is **consultative, not blocking**: it does not hold a veto over REB action and does not displace REB first-responder authority. Its function is to ensure that the people most exposed to a wrongful lapse or reduction are heard before the decision is taken, and that their account of on-the-ground conditions enters the evidence base alongside the §2.3 non-oracle indicators. The REB:
- Solicits and records the consultative voice's assessment of current access conditions before any §2.1 lapse or reduction decision.
- Publishes that assessment, unedited, as part of the §2.4 decision record.
- Where the REB's decision departs from the consultative voice's stated assessment, states in the published record why it did so. This reasoning is carried into the §4.3 Reconciliation Review.

If oracle failure is detected and the consultative voice cannot be convened within 24 hours, the REB may continue Conservative Hold at its current level (which requires no §2.1 action) but may not order a managed lapse or reduced-level hold until the consultative voice has been heard or the matter has transferred to the §3 handoff.

### 2.3 — Non-Oracle Physical Indicators

REB decisions under this window rely on indicators collected outside the failed oracle system:
- **Distribution fill rates** — from Essential Access-redemption records, aggregated at regional scale.
- **Vendor inventory reports** — from Shared Storehouse-category retailers and distributors, reported under Article VII transparency rules.
- **Logistics indicators** — shipping manifests, wholesale flow rates, storage-facility inventory.
- **Community reports** — aggregated from the CBPR oracle class (Annex AL Class 2), if those specific nodes remain available when the main oracle cohort is in failure.

These indicators are **not oracle outputs**. They are an REB operational-authority instrument. They are not bound by the FC-030/031/032/033 cohort requirements and are *not* substitutable for oracle consensus during normal operation. They are only admissible as the basis for REB decisions under this annex's defined 48-hour window.

### 2.4 — REB Decision Process and Publication

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
- Recommendations for improving the non-oracle physical indicator methodology (§2.3) based on observed divergence or convergence with oracle readings.

Persistent REB-oracle divergence across multiple failure incidents triggers an **independent review of the non-oracle physical indicator methodology** itself — the methodology may require updating, or it may be under manipulation pressure from the same actors who targeted the oracle.

### 4.4 — Aggregate Cumulative-Fallback Ceiling

The per-incident sunsets (the 48-hour REB window, the 72-hour handoff, and the 14-day panel-continuation cap) bound any *single* oracle-failure incident. They do not, by themselves, bound the *cumulative* time the system spends outside ordinary oracle-bound operation across many separate incidents. A capture strategy can therefore stay within every per-incident limit while keeping the system in fallback for a large fraction of the year through a rolling series of short failures — the rolling-incident seam.

To close that seam, the protocol tracks **aggregate time-in-fallback**: the total elapsed time the system spends in Conservative Hold plus governance-handoff (§1 through §3) plus the FC-100 verification window (§4.2), summed across all oracle-failure incidents within a rolling 12-month window.

When aggregate time-in-fallback within any rolling 12-month window exceeds **45 days**, a **mandatory independent structural review** is triggered:
- The review is convened within 14 days of the ceiling being crossed and is conducted by a body independent of the REB, the oracle-monitoring authority (Annex AL §3), and the arbitration panels that acted during the contributing incidents — by default the federated Ombuds (Annex AI, Proposal 8), drawing on the Tier 1 architectural-enforcement layer where structural remedy is indicated.
- It examines the full set of contributing incidents for a common cause — repeated targeting of the same oracle nodes or indicators, a recurring benign fragility, or a pattern consistent with engineered failure (T-018 × T-024 compound) that no single incident's reconciliation review surfaced on its own.
- It has standing to recommend structural remedies beyond the scope of any single incident: re-accreditation or replacement of fragile or suspect oracle nodes, revision of the §2.3 indicator methodology, or referral to the Enforcement Panel (Annex AJ §4) where the cross-incident pattern indicates deliberate engineering.

The structural review does not suspend CSM (Annex Y), which continues unconditionally, and it does not itself relax any per-incident limit. The 45-day ceiling and the requirement to convene the review are P-004 protected (§6); the numeric value is calibrated through the §6 Annual Oracle Resilience Audit.

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

**This annex is governed as P-004 protected specification.** Core design elements — Conservative Hold default, REB authority scope and limits, the §2.2 affected-population consultative voice, CSM unconditionality, FC-100 verification window, and the §4.4 aggregate cumulative-fallback ceiling and its structural-review trigger — cannot be modified without Tier 2 amendment. The FC-100 value itself is Tier 1 (H-3) under `/founding/commitments.md`.

**Dependencies:**
- REB formally constituted with defined authority for non-oracle physical indicator assessments under the published governance rules.
- Non-oracle physical indicator methodology published and reviewed annually (§2.3).
- P-012 AE2.3 emergency deadlock protocol operative (prerequisite for §3 handoff).
- Annex Y CSM ACTIVE (prerequisite for survival floor unconditionality).
- Annex AL ACTIVE (prerequisite for restoration verification — FC-031, FC-032, FC-033 all apply at restoration).
- Federated Ombuds (Annex AI, Proposal 8) — required for §3.1 arbitration-panel composition.

**Annual Audit.** Article VII publishes an Annual Oracle Resilience Audit that includes:
- All oracle-failure incidents during the year, their duration, and their Conservative Hold / REB / panel progression.
- Reconciliation-review findings per incident.
- Any deliberate-failure findings and enforcement referrals.
- Trends in non-oracle physical indicator accuracy (measured against restored oracle data at each reconciliation).
- **Correlated-indicator manipulation monitoring.** The §2.3 non-oracle indicators — vendor inventory reports, logistics indicators, distribution fill rates, community reports — are the manipulation surface for a captured REB precisely because they are not oracle outputs and are not bound by the FC-030/031/032/033 cohort requirements. The audit therefore does not test these indicators only for drift against the restored oracle. It also tests for **correlated movement across the indicator set** — vendor, logistics, and fill-rate signals shifting together in the same direction at the same time in a way inconsistent with independent physical sources. Such correlation, especially when it favors a single decision direction during an active failure, is the signature of coordinated indicator manipulation that drift-versus-oracle comparison alone would miss. Pairwise correlation among indicator sources is reported against an expected-independence baseline; correlation beyond the baseline during a failure window is flagged for the Reconciliation Review (§4.3) and, where it spans incidents, for the §4.4 structural review.
- Aggregate time-in-fallback across the year against the §4.4 rolling 12-month ceiling, with any structural-review triggers and their findings.
- Recommendations for methodology, FC-100, or §4.4 ceiling calibration.

---

*This document is Annex AQ of the Humane Constitution. Operative as an ACTIVE specification as of Proposal 6 close-out (2026-04-18). Closes T-024.*
