# Adversarial Protocol Audit — The Humane Constitution

**Date:** 2026-04-13  
**Branch:** `claude/lucid-albattani`  
**Scope:** Full architectural audit of all 12 pillars against Beer VSM, Ostrom commons principles, Buterin BFT/mechanism design, Lessig code-as-law, and Schelling focal point frameworks.  
**Method:** Document ingestion → simulation → cross-reference → pass/fail logic gate  
**Status:** NOT SCALE-READY (confirms White Paper self-assessment). 6 pillars FAIL. 6 CONDITIONAL. 0 unconditional PASS.

**Continuity note:** This audit preserves the legacy twelve-pillar framing as-authored. The current constitutional presentation uses **one Founding Order** and **Articles I-VII**; see `Master_Protocol.md` §III for the authoritative crosswalk.

---

## Framework Memory Lock

Five operational frameworks applied throughout:

| Framework | Key Audit Criterion |
|:---|:---|
| **Beer VSM** | S1–S5 subsystems all present? S3* (audit) independent of S3 (control)? S4 (intelligence) feeds adaptation? |
| **Ostrom 8 Principles** | Boundaries defined? Collective choice arrangements? Monitoring? Graduated sanctions? Conflict resolution? |
| **Buterin BFT + Mechanism Design** | n ≥ 3f+1 for oracles? Incentive alignment: honest > defection? Sybil resistance has real cost? Griefing factor bounded? |
| **Lessig Code-as-Law** | Is each "hard constraint" technically impossible to violate, or only normatively prohibited? |
| **Schelling Focal Points** | Does the system specify a natural equilibrium for coordination under adversarial conditions, or does it leave actors to find the wrong equilibrium? |

---

## Patch Status Reality Check

Only **4 of 23 patches are ACTIVE**. The other **19 are PROPOSED** — designed but not integrated.

| Status | Patches | Notes |
|:---|:---|:---|
| **ACTIVE** (4) | P-001, P-002, P-003, P-004 | Shadow convertibility, incentive stabilization, identity hardening, definition drift |
| **PROPOSED** (19) | P-005 through P-023 | Not yet operative — exist only in design documents |

The Ombuds Office (Annex AI) carries **6 load-bearing patch dependencies** (P-008, P-012, P-013, P-015, P-016, P-021). The Ombuds is not constituted. Zero of these 6 patches can reach ACTIVE until the Ombuds Commissioner is appointed, the Ombuds Oversight Panel is seated, and all pre-launch gates are passed.

**Minimum sequential gate timeline to deployment readiness: ~810 days (2.2 years).** This assumes no setbacks, no iteration failures, and no contested founding moments. The pilot-data circular dependency (pilot requires the system; many founding commitments require pilot data) is not resolved by this timeline.

---

## Scorecard

| Pillar | Name | Verdict | Primary Violation |
|:---:|:---|:---:|:---|
| **P1** | Constitutional Invariants & Rights | **FAIL** | Lessig: Tier 1 protection is normative, not architectural |
| **P2** | Personhood, Identity & Continuity | **FAIL** | Buterin: No scalable Sybil-resistant + privacy-preserving solution |
| **P3** | Resource & Capacity System | **FAIL** | Buterin: N=3 oracle is below BFT threshold for f=1 |
| **P4** | Life Support Layer | CONDITIONAL | Redemption gate during identity uncertainty is normative |
| **P5** | Monetary Architecture | **FAIL** | Lessig: Non-convertibility above-ledger is normative; penalty unspecified |
| **P6** | Land, Housing & Commons | CONDITIONAL | Corporate entity Sybil protection absent; dispute resolution unspecified |
| **P7** | Enterprise & Production Platform | CONDITIONAL | Capital-intensive industry structural bias; competition enforcement normative |
| **P8** | Contribution & Capability Development | **FAIL** | Attestation collusion open (T-018); Protected Pause floor unquantified |
| **P9** | Civic Deliberation & Decision Systems | **FAIL** | 3/5 sector coalition achieves agenda capture; Schelling capture point |
| **P10** | Operations & Service Delivery | CONDITIONAL | No Beer S3* channel; "execution without discretion" is unachievable |
| **P11** | Information Commons & Trust Transparency | CONDITIONAL | Real-time vs. privacy tradeoff architecturally unresolved |
| **P12** | Resilience, Regeneration & Adaptation | CONDITIONAL | Non-punitive scorecard = Beer S4 without S3; reserve levels all TBD |

---

## Simulation Results

All simulations run against specification parameters from `docs/SPECIFICATIONS.md` and `simulations/model_outline.py`.

### Test 1 — Oracle BFT Threshold (Pillar 3 / INV-005)

BFT requires n ≥ 3f+1. For f=1 Byzantine nodes: n ≥ 4.

| N nodes | LC quorum | BFT safe (f=1)? | 2-node collusion forges output? |
|:---:|:---:|:---:|:---:|
| **3** (spec minimum) | 2 | **NO** | **YES — CRITICAL** |
| 4 | 3 | YES | NO |
| 5 | 3 | YES | NO |

**Verdict: FAIL.** At N=3, two colluding nodes constitute a valid quorum. The oracle system at its minimum configuration is trivially defeatable by a 2-node collusion.

### Test 2 — Demurrage Wealth Concentration (Pillar 5)

Simulated 500 agents over 120 months under three demurrage rates.

| Rate | Gini (initial → final) | Top 10% share |
|:---:|:---:|:---:|
| 0.5%/month | 0.712 → 0.115 | 15.9% |
| 1.0%/month | 0.658 → 0.100 | 14.4% |
| 2.0%/month | 0.644 → 0.108 | 14.6% |

**Verdict: CONDITIONAL.** Demurrage substantially reduces idle-balance concentration. However, active high-earners who continuously redeploy are exempt from demurrage by design — active concentrators are not constrained by demurrage. Concentration persists through active market participation.

### Test 3 — DW Fast-Decay Dynamics (Pillars 8/9)

At r_dw = 0.15/day (from `model_outline.py`):

| Days elapsed | DW remaining |
|:---:|:---:|
| 7 days | 32.1% |
| 14 days | 10.3% |
| 30 days | 0.8% |
| 90 days (quarter) | ~0% |

**Verdict: CONDITIONAL PASS on decay design.** DW fast-decay correctly implements "influence is a flow, not a stock." However, the contribution treadmill this creates systematically disadvantages caregivers, disabled persons, and those in economic crisis — precisely the populations the system claims to protect. The "civic floor at lower balances" promised in the spec is `[FOUNDING COMMITMENT]` with no specified value.

### Test 4 — Coalition Capture Under 25% Sector Ceiling (Pillar 9)

In a 5-sector system with 25% DW ceiling per sector:

| Sectors in coalition | Max DW share | Simple majority? | Supermajority? |
|:---:|:---:|:---:|:---:|
| 1 | 25% | NO | NO |
| 2 | 50% | YES | NO |
| **3** | **75%** | **YES** | **YES** |

**Verdict: FAIL.** A 3-sector coalition achieves supermajority DW control. In a 5-sector system, "win 3 sectors" is the natural Schelling focal point for capture. The 25% ceiling prevents single-sector domination but creates an exploitable 3-sector coalition equilibrium.

**Required fix:** Sector ceiling must be reduced from 25% to ≤20% to prevent any 3-sector coalition from achieving supermajority. Agenda-sequencing must also be separated from DW allocation (rotation/lottery for proposal ordering within categories).

### Test 5 — Shadow Convertibility Equilibrium (Pillar 5 / T-001)

At 85% detection probability (from `model_outline.py` adversarial agent):

| Penalty for detected bypass | Expected value | Rational to attempt? |
|:---:|:---:|:---:|
| 0 EC | +0.15 | **YES** |
| 2 EC | −1.55 | NO |
| 5 EC | −4.10 | NO |

**Minimum deterrent penalty: 0.18 EC per bypass attempt.** Any penalty above ~18% of gain deters bypass at 85% detection. The penalty structure is currently **unspecified** — T-001's open problem explicitly flags this. Without a published penalty, enforcement has no operational deterrent.

### Test 6 — Invariant Enforcement (Pillar 1 / INV-007 — Lessig Test)

Truth table for Tier 1 invariant protection chain:

| Condition | Mechanism | Status |
|:---|:---|:---|
| Tier 1 amendment proposed | FAP reviewer manually rejects | NORMATIVE — human judgment |
| FAP reviewer captured (T-016) | No architectural backstop | NORMATIVE FAILS |
| Software update bypasses amendment (T-007) | P-004 semantic audit required | PARTIAL — still human audit |
| Triple deadlock (T-014) | No sub-Level-5 resolution defined | ARCHITECTURAL GAP |

**Lessig Test Result: FAIL.** "Unamendable" is a normative description enforced by a human process (FAP review), not a technical impossibility. A captured FAP can accept any amendment. No cryptographic or ledger-enforced mechanism prevents this.

### Test 7 — Contribution Treadmill (Pillar 8 / T-004)

DW equilibrium formula: DW* = contribution_rate / r_dw

| Actor | Daily contribution rate | DW equilibrium |
|:---|:---:|:---:|
| Standard (10% events/day) | 10% | 0.67 units |
| Caregiver (2% events/day) | 2% | 0.13 units |
| Caregiver + Protected Pause (20% of normal decay) | 2% | 4.44 units |

**Civic floor value: `[FOUNDING COMMITMENT]` — unspecified.**

If floor = 0: caregivers lose all civic voice during caregiving → recreates class power. If floor = standard equilibrium: Protected Pause becomes a civic advantage → T-009 exploit. The floor must be set in the range (0.13, 0.67) to be both protective and non-exploitable. This is a founding commitment that must be quantified before pilot.

---

## PRD-001: Pillar 1 — Constitutional Invariants & Rights

**Status: FAIL**

### The Failure Point
Tier 1 invariants (INV-001 through INV-007) are described as "unamendable by any in-system process" (INVARIANTS.md). Enforcement depends entirely on a FAP reviewer manually checking INVARIANTS.md and rejecting non-compliant proposals — a human judgment call, not a technical impossibility.

Attack chain: FAP captured (T-016, PARTIAL) → no architectural backstop → Tier 1 amendment proceeds. Additionally, T-007 (Definition Drift) identifies that software updates can alter practical meaning of protected terms without triggering the amendment process at all.

### The Violated Principle
**Lessig — Architecture as Law.** The document uses architectural language ("unamendable," "hard lower bound") to describe normative rules enforced by human process. Normative rules fail under adversarial pressure. Architectural constraints are technically impossible to circumvent.

### The Systemic Risk
If FAP is captured (T-016, Critical, risk score 60), all seven invariants are simultaneously void — including INV-001 (survival is unconditional) and INV-002 (non-convertibility). T-016's patches (P-013, P-014) are PROPOSED, not ACTIVE.

### The Required Patch
1. **Architectural enforcement for INV-002:** Ledger-layer non-convertibility claim must be validated by formal verification of the cryptographic implementation — not administrative prohibition. "Structurally impossible at the ledger layer" requires a proof, not a policy statement.
2. **Architectural enforcement for INV-001:** CSM issuance must execute automatically at the system level without any governance actor authorization. A governance actor must be architecturally *unable* to halt CSM issuance.
3. **P-014 + P-020 as pre-pilot gate:** The adversarial panel member for the founding instrument must hold structural veto power over any Tier 1 amendment instrument — enforced by requiring their affirmative signature as a technical precondition, not a procedural requirement.

---

## PRD-002: Pillar 2 — Personhood, Identity & Continuity

**Status: FAIL**

### The Failure Point
The system simultaneously requires: Sybil resistance (one-person-one-wallet), privacy-preserving verification (minimum data, selective disclosure), coverage for refugees and undocumented persons, and biometric confirmation at redemption. No production-tested identity system satisfies all four at scale.

The Asymmetric Error Doctrine (P-016, Session 8) mandates quantified fraud and exclusion rate targets before deployment — it is an unestablished Tier 2 founding commitment. Without it, calibration is permanently subject to political pressure (as the threat register explicitly acknowledges).

### The Violated Principle
**Buterin — Sybil Resistance.** Sybil resistance requires a cost to identity duplication proportional to the benefit. At LC level (daily survival access), the benefit is high. "Detection after the fact" (cross-signal deduplication, anomaly review) is probabilistic mitigation, not Sybil resistance. True Sybil resistance requires a binding cost at identity creation.

### The Systemic Risk
At any non-trivial scale, Sybil attacks on LC are economically rational. Each successful duplicate drains the capacity pool without triggering oracle alerts (oracle measures physical supply, not fraudulent demand). Simultaneously, overly aggressive anti-Sybil controls recreate survival coercion through the identity layer — the exact failure mode INV-001 prevents at the instrument layer.

### The Required Patch
1. **Specify a cryptographic commitment scheme** (e.g., nullifier-based ZK identity) where each person registers one binding commitment verifiable without revealing identity. Name the primitive and cite production evidence for the target population demographics.
2. **Asymmetric Error Doctrine (P-016) must be ACTIVE before any pilot.** Quantified targets: max fraud rate per tier (LC, DW, CR); max exclusion rate for vulnerable populations; automatic review trigger; explicit tradeoff decision rule.
3. **Survivor-mode identity must be architecturally automatic:** CSM delivery during identity suspension must not require governance authorization (dependent on PRD-001 architectural enforcement).

---

## PRD-003: Pillar 3 — Resource & Capacity System

**Status: FAIL**

### The Failure Point
SPECIFICATIONS.md Section 7 specifies minimum N≥3 oracle nodes. Byzantine fault tolerance requires n≥3f+1. For f=1 (minimum adversarial tolerance): n≥4. At N=3 with LC quorum=2, two colluding nodes supply fabricated readings that constitute a valid quorum. Simulation confirms: N=3 fails BFT for f=1.

T-020 (Epistemological Oracle Capture) and T-021 (Algorithmic Oracle Capture) are both OPEN Critical threats. Both exploit the N=3 minimum.

### The Violated Principle
**Buterin — Byzantine Fault Tolerance.** The BFT threshold n≥3f+1 is a mathematical lower bound. No amount of methodology diversity compensates for falling below it. The spec acknowledges "formal independence without structural independence is insufficient" but then sets N=3, which is below the threshold for any formal independence to matter.

**Ostrom — Monitoring (Principle 4).** The oracle is the protocol's monitoring layer for physical capacity. A monitoring system defeatable by a 2-entity collusion is not an accountable monitor.

### The Systemic Risk
Oracle capture voids INV-005 (Reality Anchoring) in practice. A captured oracle reporting inflated capacity causes over-issuance of LC into physical supply that doesn't exist — the fundamental failure this protocol is designed to prevent. The oracle is the Schelling focal point for all system decisions; capturing it makes the protocol's reality anchor adversary-controlled.

### The Required Patch
1. **Raise N_min from 3 to 5.** At N=5: LC quorum=3, SQ quorum=4. Two-node collusion cannot forge a quorum. Cost: 2 additional oracle nodes.
2. **Formal error independence test:** Before oracle cohort acceptance, publish a pairwise cross-correlation test of historical errors. Pairs with correlation above threshold [Founding Commitment] do not satisfy structural independence regardless of methodology classification.
3. **Oracle adversarial panel:** Each cohort must include at least one node nominated by a body adversarial to the entity most benefiting from high capacity readings — the structural independence analogue of P-014's adversarial panel requirement.
4. **Activate P-017 (oracle epistemological independence) as pre-pilot gate** — currently PROPOSED. T-020 and T-021 are both Critical + OPEN; P-017 is their mitigation.

---

## PRD-004: Pillar 5 — Monetary Architecture

**Status: FAIL**

### The Failure Point

**Failure A — Non-convertibility:** SPECIFICATIONS.md Section 6 explicitly states: "Off-ledger transactions...are not preventable by ledger enforcement alone. This is the primary residual risk." Ledger-layer enforcement does not cover the full attack surface. Above-ledger informal trades, proxy redemption, and service-for-LC exchanges recreate convertibility. The penalty structure for above-ledger bypass is unspecified.

**Failure B — Bank credit prohibition:** "Private banks may not create new EC by debt expansion alone" is physically unenforceable without real-time surveillance of all credit creation. Any bank can issue EC-denominated IOUs that function as EC substitutes. The prohibition is purely normative with no enforcement architecture.

### The Violated Principle
**Lessig — Architecture as Law.** Non-convertibility claim uses architectural language but is acknowledged to fail above the ledger layer. Bank credit prohibition is normative with no architectural enforcement.

**Buterin — Griefing Factor.** Bypass has low attacker cost (informal exchange) and high system cost (capacity pool depletion, erosion of LC/EC separation). Without a minimum deterrent penalty, the griefing ratio is unbounded.

### The Systemic Risk
Above-ledger convertibility is the expected equilibrium behavior of any population with heterogeneous preferences and a valuable entitlement. The "scalable arbitrage" threshold — the spec's acceptable-leakage standard — is undefined. Without an operational target, enforcement has nothing to aim at and the shadow market grows unchecked. Over time, the shadow market prices LC access in EC terms, recreating monetary sovereignty over survival.

### The Required Patch
1. **Specify minimum deterrent penalty:** Minimum deterrent = penalty > 0.18 × gain at 85% detection. Publish as Tier 2 founding commitment before pilot.
2. **Define acceptable leakage threshold:** What percentage of LC allocations may be informally converted annually before enforcement escalates? Publish as a number, not an intent statement.
3. **Bank credit prohibition requires an architectural solution or replacement:** Either specify a central EC ledger against which all credit creation registers (architectural), or replace the prohibition with a reserve requirement (banks may create credit against EC holdings above a reserve ratio; excess triggers automatic demurrage on the credit instrument).
4. **Above-ledger enforcement architecture:** P-001 is ACTIVE but its penalty specification is missing. The penalty table must be published as a protected specification before any pilot.

---

## PRD-005: Pillar 8 — Contribution & Capability Development

**Status: FAIL**

### The Failure Point

**Failure A — Attestation collusion (T-018, OPEN):** Lightweight attestation for small CR claims creates a social graph exploitable by coordinated groups. "Verifier reputation scoring" creates a meta-economy of attestor standing that itself requires governance — a recursive problem without a base case. T-018 is OPEN (no mitigation patch designed).

**Failure B — Protected Pause civic floor unquantified:** The simulation shows caregiver DW equilibrium at 2% contribution ≈ 0.13 units; standard actor ≈ 0.67 units. The "small civic floor at lower balances" is `[FOUNDING COMMITMENT]`. Without specifying a value in the range (0.13, 0.67), the floor is either meaningless (too low) or an exploit (too high).

### The Violated Principle
**Ostrom — Principles 3 & 4 (Collective Choice and Monitoring).** The contribution/attestation system is how participants modify rules (via CR minting) and are monitored (via verifier reputation). Both fail if attestation collusion is possible. An unmonitored monitoring system is not a monitoring system.

**Buterin — Incentive Alignment.** The Protected Pause floor must be calibrated so honest caregivers retain voice while strategic pause-as-exploit does not dominate. This is a non-trivial incentive alignment problem requiring explicit numbers before deployment.

### The Systemic Risk
Attestation collusion allows coordinated CR harvesting. Since CR gates oversight roles (Pillar 9), inflated CR → oversight capture → T-008 (Bureaucratic Elite Formation) via a channel that P-008's sector ceiling controls were not designed to catch. T-009 is the documented primary bypass for P-008 controls. With T-018 OPEN and T-009's patches PROPOSED (not ACTIVE), both bypass channels are simultaneously available.

The contribution treadmill systematically disadvantages caregivers, part-time contributors, and people in economic distress in the civic deliberation layer — recreating class structure inside the system designed to prevent it.

### The Required Patch
1. **Protected Pause floor quantification as Tier 2 founding commitment before any pilot.** Required range: floor > minimum civic voice threshold AND floor < equilibrium for 5%-contribution non-pause actors.
2. **Attestation proof-of-work:** Lightweight attestation must require a verifiable cost. Minimum viable option: threshold signature requiring attestors from different CR sectors (sector diversity requirement prevents sector-specific collusion), plus a DW stake — attestors put their own DW at risk if the attestation is later found fraudulent.
3. **T-018 must be escalated to ADDRESSED (patch designed) before pilot.** Currently OPEN — no mitigation exists. Minimum mitigation: automated graph-analysis flagging attestation clusters with high mutual cross-attestation rates; automatic CR review trigger above a defined concentration threshold.
4. **Ombuds Office must be constituted before any of these controls are operative** (Annex AI dependency chain).

---

## PRD-006: Pillar 9 — Civic Deliberation & Decision Systems

**Status: FAIL**

### The Failure Point
In a 5-sector system with 25% DW ceiling: a coalition of 3 sectors achieves 75% total DW — supermajority control of agenda, budget prioritization, and proposal sequencing. This is not an edge case. It is the mathematically predicted equilibrium under rational actor assumptions.

Agenda-setting power is not symmetric with vote-counting power. The spec assigns DW to "bounded budget prioritization and agenda sequencing" but agenda-sequencing determines which proposals reach the floor and which alternatives are excluded — the group controlling sequencing controls outcomes even without voting majority.

### The Violated Principle
**Schelling — Focal Points.** "Win 3 sectors" is the natural Schelling focal point for capture in a 5-sector system with a 25% ceiling. Without a commitment device preventing cross-sector coalition formation, rational actors will find this equilibrium.

**Buterin — Collusion Resistance.** A mechanism where a coalition of 3/5 sectors captures supermajority agenda control produces disproportionate returns for the coordinating coalition. This violates collusion resistance requirements.

**Ostrom — Principle 3 (Collective Choice Arrangements).** Those affected by rules must be able to participate in modifying them. A 3-sector coalition that controls agenda sequencing structurally excludes the other 2 sectors' proposals from effective consideration.

### The Systemic Risk
A stable capture coalition converts temporary agenda control into structural entrenchment by scheduling proposals that reinforce their position and suppressing challenges. Over time, this recreates hierarchical class power inside the deliberation architecture — the T-008 elite formation failure implemented through deliberation rather than oversight capture.

The compound risk: the coalition can also control CR sector ceiling enforcement (P-008) by ensuring audit bodies disproportionately represent coalition sectors — the T-008 × T-009 compound failure documented in the Threat Register.

### The Required Patch
1. **Reduce sector ceiling from 25% to ≤20%.** Mathematical requirement: for N=5 sectors, ceiling c must satisfy 3c < 0.667 (no 3-sector supermajority). c < 22.2%, so 20% provides margin. This is a Tier 2 change requiring the full amendment process.
2. **Separate agenda-sequencing from DW allocation.** DW influences which priority *categories* receive budget weight. Proposal ordering *within* categories must use rotation or weighted lottery — not DW-ordered sequencing. This removes the agenda-setting power advantage while preserving the budget-prioritization function.
3. **Cross-sector coalition disclosure requirement.** Statistical pattern analysis of DW deployment that reveals coordinated cross-sector voting triggers a mandatory disclosure and conflict-of-interest review. Transparency-as-deterrence: making coalition formation visible raises its cost.
4. **Specify a Schelling fallback default.** The explicit default for deliberation failure must be a published neutral rule (e.g., previous-quarter allocation + CPI adjustment) — not an unspecified status quo that benefits whoever currently holds agenda power.

---

## Conditional Pillar Gate Requirements

| Pillar | Gate Required Before Deployment |
|:---|:---|
| **P4 Life Support** | Identity fallback during redemption must be architecturally specified (contingent on PRD-001 + PRD-002) |
| **P6 Land & Commons** | Corporate entity Sybil controls specified; dispute resolution institution named and constituted |
| **P7 Enterprise** | Annex AR founding commitment fields filled after first-year pilot data; demurrage signal strength verified at actual rate |
| **P10 Operations** | Beer S3* independent audit channel specified (bypasses the operational layer it audits); Ombuds concentration risk addressed |
| **P11 Information Commons** | Real-time vs. delayed signal taxonomy published as Tier 2 protected specification; differential privacy parameters specified |
| **P12 Resilience** | Regeneration scorecard enforcement mechanism attached to Beer S3 control layer; reserve levels exit `[FOUNDING COMMITMENT]` before pilot |

---

## System-Level Findings

### Finding 1: The Ombuds Concentration Risk Is the Single Largest Unaddressed Structural Weakness

Annex AI (Ombuds Office Constitution) is a pre-launch gate for P-008, P-012, P-013, P-015, P-016, and P-021. The Ombuds Office is not constituted. The T-008 open problem states: "Ombuds Office carries three load-bearing functions — if Ombuds becomes elite formation site, all three fail simultaneously." Annex AI Section 5 addresses this through an Ombuds Oversight Panel, but that panel is also unestablished.

The recursive oversight problem is documented honestly but not resolved: who audits the Ombuds Oversight Panel?

**Proposed resolution:** The Ombuds Oversight Panel should be constituted *before* the Ombuds Commissioner is appointed, and the Panel must certify the Commissioner's independence before the Ombuds takes its first determination. This inverts the current sequence and eliminates the founding-moment capture window.

### Finding 2: 19 of 23 Patches Are PROPOSED — The System Is Running at Its Minimum-Hardened State

The threat register tracks 25 threats. 4 patches (P-001 through P-004) are ACTIVE. The remaining 19 patches address Critical and High threats that are documented but not mitigated. The system as currently constituted is operating against 21 threats with only 4 active mitigations.

This is not a criticism of the design — the threat register and patch log are transparent about this state. It is a factual statement that should inform deployment timing. The system at its current hardening level is suitable for adversarial design review. It is not suitable for pilot deployment.

### Finding 3: The Logical Fallacy Review (Existing Document) and This Audit Are Complementary

The existing `LOGICAL_FALLACY_REVIEW.md` identifies argument-quality issues (false binary framing, hasty generalization, non-falsifiability). This audit identifies technical impossibilities and mechanism failures. The two reviews converge on the same structural point: the protocol makes architectural claims that are actually normative (Lessig violation), and it should be explicit about this distinction.

The Logical Fallacy Review's recommendation — "add a disconfirmation table for core claims" — is the narrative-layer expression of the same fix this audit recommends at the mechanism layer: publish explicit falsification criteria for each claim, including the Lessig classification (architectural vs. normative).

### Finding 4: The White Paper Scale-Readiness Statement Remains Accurate and Should Be Strengthened

*"System status as of Session 4: DEFENSIBLE and DOCUMENTED. Not yet SCALE-READY."*

This audit confirms the self-assessment is accurate. The recommended strengthening: add a third status tier between DOCUMENTED and SCALE-READY — specifically, **PILOT-ELIGIBLE** — with explicit gate conditions. The current binary (documented vs. scale-ready) understates the complexity of the transition. A system can be pilot-eligible without being scale-ready, and the conditions differ substantially.

**Suggested PILOT-ELIGIBLE gate conditions (minimum):**
1. Oracle N≥5 constituted with formal independence certification (PRD-003)
2. Asymmetric Error Doctrine (P-016) adopted as Tier 2 founding commitment (PRD-002)
3. Ombuds Commissioner appointed and Ombuds Oversight Panel seated (Annex AI)
4. Protected Pause civic floor quantified (PRD-005)
5. Sector ceiling reduced to ≤20% (PRD-006)
6. Shadow convertibility penalty published (PRD-004)
7. CSM issuance made architecturally automatic (PRD-001)

**PILOT-ELIGIBLE minimum timeline: ~300 days** (parallel execution of non-sequential gates). **SCALE-READY minimum timeline: ~810 days** (including sequential pilot-data gates).

### Finding 5: The Bootstrap Problem Is Documented but Not Resolved

T-017 / P-014 / P-020 address the founding circular dependency. The current resolution is a "one-time founding instrument" with 60-day pre-activation disclosure. This is a procedural stopgap, not an architectural resolution.

The bootstrap problem is, by definition, not fully resolvable within the system's own logic — this is acknowledged honestly in INVARIANTS.md. The practical consequence is that the founding coalition's legitimacy is contingent on the quality and diversity of the actors who constitute it. No protocol patch can substitute for a genuinely legitimate founding coalition.

Recommendation: Publish the founding coalition composition criteria as a public commitment *before* the coalition is assembled — not after. Allow public challenge to the composition criteria (not just to the coalition members) during the 60-day window. This converts the bootstrap problem from a circular dependency into a transparent political commitment.

---

## Relationship to Prior Audit Work

The logical fallacy review and prior threat modeling sessions (Sessions 1–8, as reflected in the Threat Register) have done substantial foundational work. This audit adds:

1. **Simulation evidence** for the oracle BFT failure (Test 1), coalition capture equilibrium (Test 4), and shadow convertibility deterrence analysis (Test 5).
2. **Framework-keyed classification** of each failure against Beer, Ostrom, Buterin, Lessig, and Schelling — giving each finding a principled grounding rather than relying only on internal consistency checks.
3. **Dependency chain analysis** identifying the Ombuds concentration as the highest-leverage single structural gap — 6 critical patches blocked by one unestablished institution.
4. **PRDs for each failing pillar** — structured enough to convert directly into patch design work.

---

---

## Supplementary Simulation Findings

Three additional mechanism tests not covered in the main audit loop:

### Sim A — Ombuds 4-Hour Manufactured-Flag Determination (Annex AI)

Annex AI's "absence of documentation = criterion 3 satisfied" rule successfully defeats the obvious obstruction attack (attacker withholds docs → criterion 3 is met automatically). Correct flag-lift rate = 100% regardless of withholding probability.

**Residual risk not in spec:** If the attacker provides *fabricated* contemporaneous documentation within the 2-hour documentation review window, the Ombuds must assess document authenticity under time pressure. Annex AI does not specify a document-authentication capability. This is an implementation gap that must be specified before the Ombuds is operational: what is the Ombuds's access to forensic document review under a 4-hour total timeline?

### Sim B — T-009 Rotation Ring (Grace Exploitation Attack Class 2)

A pure rotation ring of k actors (one paused at a time) maintains ~99.7% CR exploitation efficiency at any ring size while keeping simultaneous pause fraction at 1% — well below the P-009 AF5 alert threshold of 20%. **The rotation ring exploit is not caught by AF5.**

AF3 (hardship attestation collusion detection, extended to pause networks) is the essential control and it is currently PROPOSED. Until AF3 is ACTIVE, the rotation ring is a live exploit with near-100% efficiency. The T-009 patch must reach ACTIVE before any pilot that involves civic standing.

### Sim C — Founding Window Capture Probability (T-017 / T-022)

At high attack intensity (70%), P-014's 14-day window had a 60.3% founding capture probability. P-020's 60-day extension reduces this to 44.7% — a 25.8% risk reduction.

**Critical gap:** This assumes the body nominating the adversarial panel member is genuinely independent. If T-022 (Electoral Cycle Capture — OPEN Critical) materializes, the nominating body can itself be captured, converting the adversarial member into a captured ally. P-018 (T-022 mitigation) is PROPOSED with no ACTIVE mitigation for this threat. At high attack intensity, even the 60-day window does not reduce founding capture probability below 40%.

**Implication:** The founding window extension is necessary but not sufficient. The adversarial member's nominating body must itself be protected from T-022 — which requires either pre-constituting the nominating body in a jurisdiction structurally insulated from electoral cycle pressure, or requiring multiple independent bodies to jointly nominate the adversarial member such that T-022 must capture all of them simultaneously.

---

*This document is an adversarial audit output. It is not a patch memo and does not modify the master protocol. Findings that conflict with current master protocol language reflect identified weaknesses requiring patch design, not errors in the master. The master protocol remains the primary source of truth. This audit supplements the Threat Register (adversarial model) and Patch Log (change ledger) by adding framework-keyed simulation evidence for the highest-priority unresolved gaps.*

*Governed as an informational annex. Does not require FAP review. Does constitute input for the next red-team hardening cycle.*

---

---

## Deep Audit — Phase 3: Annex AR, Threat Register Completion, and Risk Concentration

*Phase 3 completes the annex-level review by examining Annex AR (contract-commitment architecture parameters), Annex AO (register disclosure protocol), and the full Session 8–9 Threat Register. Three additional simulations (Sim I–K) are produced; six additional findings are documented.*

---

### Sim I — AR Force Majeure Economics at Actual Demurrage Rate

**Setup:** Annex AR's worked examples use a "representative" 5% annual demurrage rate. `model_outline.py` config sets `demurrage_rate_monthly: 0.01` — effective annual rate ≈ **12%/year**. AR Section 2 explicitly states: *"founding coalition must recalibrate if the actual rate differs."* Test: how does the economics of force majeure avoidance change at the actual rate?

| Project | Cap (days) | Avoided @5%/yr | Avoided @12%/yr | Ratio |
|:---|:---:|:---:|:---:|:---:|
| 1-yr LC-essential housing (1M EC) | 365 | 48,771 EC | **113,080 EC** | 2.32× |
| 2-yr hospital construction (8M EC) | 365 | 390,165 EC | **904,637 EC** | 2.32× |
| 5-yr power grid (30M EC) | 365 | 1,463,117 EC | **3,392,387 EC** | 2.32× |

**At 12%/year, force majeure avoidance is 2.32× more economically significant than AR's worked examples illustrate.** On the 5-year 30M EC power grid case, a 365-day freeze cap avoids **3.39M EC** — more than double the 1.48M EC AR uses when assessing whether the certification panel is worth capturing. AR's finding ("significant — enough to fund sustained panel influence") substantially understates the actual incentive at the operative rate.

**Secondary finding:** A 365-day freeze on a 1-year LC-essential project eliminates 100% of demurrage exposure at any rate. P-023 closes investment-channel exemptions entirely; it then introduces a capped force majeure freeze that recreates a bounded demurrage-bypass for LC-essential programs. The bypass is time-limited and verified — but its certification panel is a new oracle that inherits T-020 and T-021 capture vectors at 2.32× the incentive AR's examples model.

---

### Sim J — T-024 Soft Oracle Normalization Pathway

**Setup:** P-022 (PROPOSED) introduces a "soft oracle" fallback when the main oracle system fails during active SQ rationing. The REB may use non-oracle physical indicators (fill rates, distribution logs, vendor inventory reports) within a 48-hour window. P-022 explicitly warns this "must not become a normalised bypass." Test: what adversarial effort is required to normalize the soft oracle?

| Hour from failure | Protocol state | REB authority | Risk level |
|:---:|:---|:---|:---:|
| H+0 | SQ active; oracle loses quorum | None — conservative hold | Baseline |
| H+48 | 48-hour REB window opens | **ACTIVE** — non-P-017 indicators | HIGH |
| H+72 | Governance handoff triggered | Transfers to CRP/AE2.3 | CRITICAL |
| Day 5 | Oracle not restored; CRP deciding | Pattern of CRP non-oracle decisions | HIGH |
| Day 30 | Sustained failure unresolved | **De facto oracle — REB/CRP indicators** | CRITICAL |

**Minimum attacker effort:** Disrupt 2 of 3 oracle nodes for ≥72 hours. At N=3, this is the quorum failure threshold already identified in PRD-003. The same BFT vulnerability that forges a valid oracle consensus (Phase 1, Test 1) can alternatively be used to *eliminate* oracle quorum and force the soft oracle pathway.

**The normalization mechanism:** P-022 is designed as an emergency exception. It has no architectural constraint preventing repeated use. If oracle failure is sustained for 5+ days, each REB/CRP provisional decision sets operational precedent. By Day 30, SQ management via non-P-017-independent indicators has become routine. T-020/T-021's epistemological capture attack does not need to compromise the oracle — it can wait for an oracle failure and govern through the backdoor channel P-022 opens.

**Required patch extension:** P-022 needs an anti-normalization clause specifying: (a) maximum total duration the REB soft oracle may be used per calendar year (structural cap, not per-event cap), and (b) mandatory independent audit of any soft-oracle decision that exceeds 48 hours, conducted under P-017 independence standards.

---

### Sim K — Threat Risk Concentration Analysis

| Status | Count | Risk sum | % of total | Critical threats |
|:---:|:---:|:---:|:---:|:---:|
| **ACTIVE** | 4 | 228 | 18.8% | 4 |
| **PROPOSED** | 12 | 631 | 51.9% | 6 |
| **OPEN** | 7 | 356 | 29.3% | 4 |
| **Total** | 23 | 1,215 | 100% | 14 |

OPEN threats — seven with no patch design — hold **36.1% of all non-ACTIVE risk.** Four of seven are Critical severity. The two highest-leverage patches for resolving OPEN risk:

| Patch | Threats addressed | Risk points resolved | % of OPEN risk |
|:---:|:---:|:---:|:---:|
| **P-017** (oracle independence) | T-020 + T-021 | 120 | 33.7% |
| **P-015** (PCRP / demand-context) | T-018 + T-019 | 84 | 23.6% |
| **P-018** (electoral cycle) | T-022 | 60 | 16.9% |
| **P-022** (SQ oracle failure) | T-024 | 60 | 16.9% |

P-017 and P-015 together resolve **57.3%** of all OPEN risk. Both are dependencies of the Ombuds Office (P-015 requires Ombuds co-certification; P-017's anti-monoculture review trigger requires Ombuds publication authority). All OPEN risk therefore flows through the same Ombuds constitutionalization bottleneck identified in Finding 1.

---

## Phase 3 System-Level Findings

### Finding 10: P-023 Closes the Investment-Channel Exemption and Opens a New Capture Vector

P-023 (T-025 mitigation) removes all investment-channel demurrage exemptions. This is architecturally correct — it closes the T-025 exploit by eliminating the classification being captured. But it replaces the exemption with a force majeure freeze mechanism that:
1. **Retains demurrage-avoidance economics** — at 12%/year, 3.39M EC avoidable on a 5-year 30M EC project
2. **Introduces a new oracle** — the force majeure certification panel is subject to T-020/T-021 capture at a 2.32× larger incentive than AR's worked examples model
3. **Has no constitutional independence requirement** — AR Section 4 pools inspectors under P-017 standards for milestone verification, but the force majeure certification panel's independence standard is described as "independent third-party certification" and "independent assessment panel (P-017 oracle-independence standards)" without specifying how the panel is constituted, rotated, or protected from sustained relationship-building with repeat applicants

The threat transfer is real: P-023 converts a T-025 (classification capture) risk into a force-majeure-panel-capture risk. The panel-capture incentive at actual demurrage rates is large enough to fund a sustained influence operation. Until the certification panel is constituted under explicit P-017 independence standards with rotation and cooling-off requirements, the panel is an unguarded oracle.

### Finding 11: T-024's Soft Oracle Is Architecturally Unprotected Against Normalization

P-022's REB non-oracle pathway is a Lessig normative rule ("must not become a normalised bypass") with no architectural constraint preventing normalization. The minimum adversarial effort to redirect SQ management through this channel is: sustain a 2-of-3 oracle node disruption for 72 hours. At N=3 (current spec minimum), this is the same attack surface PRD-003 identifies for forging oracle consensus — it can alternatively be used to eliminate oracle quorum and route SQ decisions through the non-P-017 channel.

**The compound failure:** T-024's soft oracle normalization is a T-020/T-021 bypass achieved without directly compromising the oracle. An attacker who cannot compromise oracle epistemology can instead eliminate oracle quorum, wait for the soft oracle to activate, and then govern SQ scope through the REB/CRP channel which has no formal independence requirements. This is a second-order route around P-017 that P-022 inadvertently opens.

**Required fix:** P-022 must specify: (a) a hard ceiling on cumulative soft-oracle duration per rolling 12-month period, expressible as a Tier 2 founding commitment; (b) mandatory P-017-independent review for any soft-oracle SQ decision exceeding 48 hours; (c) oracle restoration as a priority-override governance item that cannot be dequeued by other CRP business during an active soft-oracle period.

### Finding 12: The Register Disclosure Bifurcation Has an Undetectable Omission Attack Surface

Annex AO's consistency attestation verifies that the Public Register and Restricted Register Annex contain consistent information — no overstatement in public, no hidden entries in restricted. What it does not verify: **that all known threats are registered at all.**

A threat omitted from both versions simultaneously leaves no "[Restricted Annex — see AO]" marker in the public record. It is invisible to the consistency attestation, invisible to the annual audit, and invisible to the Ombuds (who holds access to the Restricted Annex but only to "entries relevant to Ombuds functions"). An actor who successfully prevents a threat from being registered — rather than manipulating its status after registration — defeats the entire bifurcation protocol.

This attack surface is most plausible at registration time (Session 0–1 equivalent), not through ongoing manipulation of existing entries. The T-008 (elite formation at the threat register's originating body) and T-016 (FAP capture) compound directly: if the founding coalition controls which threats enter the initial register, downstream transparency mechanisms cannot compensate.

**Required fix:** The annual consistency audit should include a positive obligation: auditors must attest that the threat categories covered by the register are comprehensive relative to a threat taxonomy developed by an adversarial reviewer independent of the founding coalition. A threat taxonomy (not just a register) needs to be published as a public reference, against which the register's coverage can be evaluated.

### Finding 13: The AR Demurrage Rate Calibration Must Be an Explicit Gate

Annex AR instructs the founding coalition to "determine the actual EC demurrage rate and recalibrate the deployment window examples." This is a founding commitment instruction, not a commitment itself. The AR's worked examples — which form the founding coalition's intuitions about force majeure economic incentives, deployment window signal strength, and certification panel capture value — are calibrated at 5%/year, a rate 2.4× lower than the specification's operative rate.

If the founding coalition fills in AR's parameter fields using the 5%/year intuitions without recalibrating, all threshold values will be systematically miscalibrated in the capture-permissive direction:
- Deployment windows will be too long (at 12%/year, the signal is stronger than examples suggest, supporting shorter windows)
- Force majeure caps will be too generous (avoidance economics are 2.4× larger)
- Inspector pool composition ceilings may be too loose (the incentive for pool capture is higher)

**Required gate:** Before any AR parameter is filled as a founding commitment, the founding coalition must publish a recalibrated version of AR's worked examples at the actual EC demurrage rate. This recalibration must be reviewed by an independent economic analyst before commitment. The recalibration is not optional — it is the prerequisite for meaningful parameter selection.

### Finding 14: Jurisdiction-Relative Incentive Failure Is Not Modeled in P-002

Annual Compound Simulation Scenario A (Year 4 talent drain at 10% top-quartile exit rate) produced housing basket at 91.4% (below 95% target) and healthcare at 94.8%. The simulation explicitly flags: *"incentive architecture has jurisdiction-relative failure mode not captured internally."*

P-002 (incentive stabilization, ACTIVE) specifies nonlinear reward curves designed to make productive participation preferable to passive accumulation. These curves are calibrated against internal psychological equilibria — the relative value of contribution vs. leisure within the protocol's own incentive structure. They are not calibrated against **exit options in adjacent jurisdictions**.

When exit value (working in an adjacent non-protocol jurisdiction) exceeds marginal return on contribution inside the protocol, the nonlinear reward curves become irrelevant. The agent's decision is not "contribute or not contribute" — it is "participate or exit." P-002 has no model for this decision.

**The Schelling focal point:** If top-quartile contributors cluster near jurisdictional boundaries, "exit to adjacent jurisdiction" becomes the natural coordination equilibrium for actors who observe their peers exiting. This is a positive-feedback exit cascade, not an individual marginal decision. The cascade threshold — the point at which observing exits triggers further exits — is not specified in P-002 and is not detectable by Pillar 11 monitoring until after the cascade is underway (by which point housing and healthcare baskets are already below target).

**Required addition to P-002:** A jurisdiction-comparative value calibration requirement — the incentive curves must be specified relative to the opportunity cost of exiting to the nearest comparable jurisdiction, updated annually as a Pillar 12 adaptation obligation. If the calibration reveals that exit value systematically exceeds internal contribution return, the protocol must trigger a P-002 parameter review before Pillar 12's scorecard registers a formal crisis.

---

## Consolidated Risk Map

After Phases 1, 2, and 3, the audit identifies the following high-priority action sequence for pilot eligibility:

| Priority | Gate | Resolves | Unlocks |
|:---:|:---|:---|:---|
| **1** | Ombuds Commissioner appointed + Oversight Panel seated | Finding 1 (Ombuds concentration risk) | P-008, P-012, P-013, P-015, P-016, P-021 |
| **2** | Oracle N_min raised to 5 + P-017 updated to 3-class floor | PRD-003 + Sim D + Finding 7 | SQ activation credibility; T-020/T-021 partial mitigation |
| **3** | AED (P-016 / Annex AK) reconciled with Pillar 2 data architecture | Finding 6 (AK/P2 contradiction) | Identity system deployment |
| **4** | Protected Pause civic floor quantified | PRD-005 | Pillar 8 pilot integrity |
| **5** | P-023 / AR force majeure panel constituted under P-017 independence standards | Finding 10 | Long-horizon project financing |
| **6** | P-022 anti-normalization clause added + hard ceiling on soft-oracle duration | Finding 11 | SQ oracle failure safety |
| **7** | Shadow convertibility penalty published | PRD-004 | Pillar 5 enforcement |
| **8** | Sector ceiling reduced to ≤20% | PRD-006 | Pillar 9 coalition stability |
| **9** | Civic Legibility Standard specified | Sim F + Finding 9 | Pillar 9 democratic legitimacy |
| **10** | P-002 jurisdiction-comparative calibration added | Finding 14 | Talent retention model validity |

Gates 1 through 3 are prerequisite for any others. Gates 4 through 6 can run in parallel after Gates 1–3 are complete. Gates 7 through 10 can run in parallel with each other after Gate 4 is initiated. **Estimated minimum parallel timeline to PILOT-ELIGIBLE: ~300 days** (assuming Gate 1 begins immediately and no founding coalition disputes).

---

---

## Deep Audit — Phase 2: Annex-Level Findings

*Phase 2 extends the initial audit by examining Annex AJ (above-ledger bypass patterns), Annex AK (identity AED framework), Annex AL (oracle methodology-class definitions), and the Annual Compound Simulation (Sessions 1–8 including Scenario A and B stress tests). Four additional simulation findings (Sim D through Sim H) are produced; four additional structural findings are documented below.*

---

### Sim D — Oracle Methodology-Class Coverage Under Minimum-Diversity Rule

**Setup:** Annex AL (pre-launch gate for P-017) defines methodology-class diversity. P-017's current language requires "at least one node from a fundamentally different methodology class" — effective minimum: **2 classes**. Test: can SQ activation quorum be met entirely from the dominant class?

| N | SQ quorum | Dominant class max (2-class floor) | Quorum achievable from 1 class? |
|:---:|:---:|:---:|:---:|
| **3** | **2** | **2** | **YES — FAIL** |
| 4 | 3 | 3 | YES — FAIL |
| 5 | 4 | 4 | YES — FAIL |
| 7 | 5 | 6 | YES — FAIL |
| 9 | 6 | 8 | YES — FAIL |

**Finding: The 2-class minimum fails at every N.** With one minority node and N-1 dominant-class nodes, the dominant class always equals or exceeds the SQ activation quorum.

**Fix: Require 3-class minimum.** With 3 classes and N=5, maximum dominant class = N-2 = 3 < SQ quorum = 4. Minority class exclusion from quorum becomes architecturally impossible. This requires raising both the oracle floor (PRD-003: N≥5) and the methodology floor (3 classes vs. 2). These two fixes are interdependent — P-017 must be updated in parallel with PRD-003's N_min raise.

**Compound effect:** PRD-003's BFT failure and this class-diversity failure operate simultaneously. At N=3, a 2-node colluding coalition both (a) forges a valid BFT quorum and (b) is permitted to be same-methodology-class. Both failure modes converge on the same attack: two nodes, same funding source, same training data, same error structure, constitute a valid oracle consensus with zero structural diversity protection.

---

### Sim E — Exclusion Monitoring vs. Minimum-Data Principle (Contradiction)

**Setup:** Annex AK Section 3 requires monitoring exclusion rates at enrollment attempt points — specifically, tracking individuals who attempted but failed to enroll. Pillar 2 requires "minimum data collection" and "no record of non-enrolled persons without consent."

| Monitoring approach | AK compliant | Pillar 2 compliant |
|:---|:---:|:---:|
| Track individual failed enrollment attempts | YES | **NO** |
| Track only successful enrollments | NO | YES |
| Aggregate count only (no individual links) | NO | YES |
| Federated advocacy org self-reporting | YES | YES |
| Population census cross-reference | YES | **NO** |

**Single AK+P2-compatible path: federated advocacy org self-reporting.**

**Critical flaw in the compatible path:** Self-reported exclusion rates from advocacy organisations are unverifiable. AK Section 3 requires "review triggers when exclusion rate exceeds [FOUNDING COMMITMENT]" — but an unverifiable self-report cannot operationally trigger this review mechanism. The trigger requires a trusted exclusion measurement, not a contested advocacy claim.

**Structural contradiction:** AK exclusion monitoring requires surveillance of failed enrollment attempts (data collection P2 prohibits). The only P2-compatible measurement path is unverifiable and cannot enforce AK's own targets. This is not a gap resolvable by founding commitment parameter selection — it requires architectural reconciliation between two incompatible design commitments.

**Required resolution:** Either (a) define a Privacy-Preserving Enrollment Monitoring protocol using cryptographic commitments (ZK proofs of attempt-without-identity) that satisfies both AK and P2 simultaneously, or (b) formally acknowledge that AK exclusion monitoring operates in a P2-exception carve-out with a narrowly defined data retention window and mandatory deletion schedule. Neither option is currently specified.

---

### Sim F — Civic Legibility Gap (Annual Compound Simulation Scenario B)

**Setup:** Scenario B (Year 4 pilot compound stress test) revealed a 61-percentage-point gap in agenda comprehension between the top and bottom DW quintiles. Comprehension probability is correlated with DW balance (more engagement = more understanding = higher DW). DW voting weight is also correlated with comprehension. Compounding effect:

| Quintile | Comprehension | DW Share | Effective agenda influence |
|:---|:---:|:---:|:---:|
| Bottom 20% (Q1) | 23% | 6% | 0.014 |
| Q2 | 41% | 12% | 0.049 |
| Q3 | 58% | 18% | 0.104 |
| Q4 | 72% | 24% | 0.173 |
| Top 20% (Q5) | 84% | 40% | 0.336 |

**Effective agenda influence ratio (Q5/Q1): 24.3×.** The highest-DW actors simultaneously understand the agenda better and deploy more weight — they exert twenty-four times the effective agenda influence of the lowest quintile.

**The violated principle:** P-008 sets *sector* diversity ceilings for DW concentration. It does not set *legibility* floors. A population that participates without understanding is not exercising civic voice — it is noise that amplifies existing social influence. The 44% of DW voters reporting "not sure what they voted on" (Scenario B) represent DW weight captured by the actors who set the deliberation frame.

**Missing specification:** No legibility standard exists in the current protocol. The Annual Compound Simulation flagged this explicitly: "a civic legibility review is recommended as a mandatory CRP step." That recommendation is not formalized as a patch or founding commitment.

**Required patch:** Specify a Civic Legibility Standard (CLS) as a pre-activation gate for each deliberation cycle:
1. Comprehension threshold: minimum percentage of DW-weighted participants must demonstrate issue comprehension before binding vote (threshold value: [FOUNDING COMMITMENT]).
2. Legibility budget: mandatory plain-language summary of each proposal produced by a P2-compliant independent drafting process before the DW allocation window opens.
3. Legibility monitoring: Pillar 11 dashboard tracks per-cycle comprehension rates; cycles falling below threshold trigger a mandatory re-deliberation period with targeted outreach to low-comprehension quintiles.

---

### Sim G — COMMITTED State Demurrage Test Coverage Gap

**Setup:** P-023 (Contract-Commitment Architecture / Annex AR) states that EC committed to escrow continues to accumulate demurrage — "discipline is the point." Test suite analysis of `simulations/test_demurrage.py` reveals that the COMMITTED state does not modify `days_idle` (confirmed by `test_demurrage_other_states_do_not_affect_days_idle`). A wallet entering escrow with `days_idle = 0` never reaches the idle threshold regardless of escrow duration.

**Rate correction (per codex review):** `test_demurrage.py` line 48 explicitly confirms the operative daily rate: `r = CONFIG["demurrage_rate_monthly"] / 30 = 0.01 / 30 ≈ 0.000333`. An earlier version of this table incorrectly used `r = 0.01` per day (the monthly rate applied as if daily), overstating divergence by 26×. The corrected table:

| Days in escrow | Test behavior (COMMITTED) | P-023 claim behavior (IDLE equiv.) | Divergence |
|:---:|:---:|:---:|:---:|
| 30 | 100.0000 | 99.9667 | 0.0333 |
| 60 | **100.0000** | **98.9720** | **1.0280** |
| 90 | 100.0000 | 97.9872 | 2.0128 |
| 180 | 100.0000 | 95.0912 | 4.9088 |
| 365 | 100.0000 | 89.4044 | 10.5956 |

**At 60-day escrow: divergence is ~1.03 EC on a 100 EC balance (~1.0%), not ~26.7% as previously stated.** At 1M EC escrow for 60 days, the underapplied demurrage is ~10,280 EC — material at scale, but not the 1st-order crisis suggested by the erroneous rate.

**The failure is a specification/implementation gap, not a test bug.** The test correctly documents the current demurrage implementation's behavior. The prose of P-023 makes a design claim the implementation does not support. Either:
- (a) The demurrage function must be updated to increment `days_idle` in COMMITTED state — and the test must be updated to verify this — or
- (b) P-023's prose must be corrected to accurately describe actual behavior: escrow is a demurrage-exempt state.

Resolution choice is a design decision with real incentive consequences. If COMMITTED is demurrage-exempt, actors strategically commit EC before the idle threshold to avoid decay — converting escrow into a demurrage-avoidance mechanism. If COMMITTED accrues demurrage, long-term contracting becomes higher-cost for low-liquidity actors. Neither consequence is currently analyzed in P-023 or Annex AR. The question is unresolved, not the arithmetic.

---

### Sim H — Oracle Consensus Test Coverage Gap

**Setup:** `simulations/test_model_outline.py` tests `OracleNode.read_capacity()` at the single-node level only. The consensus mechanism (`OracleSubsystem.get_consensus_capacity()`) has no test coverage.

**Reproduction of missing test cases:**

```
Attack: 2 colluding nodes report 40% inflated capacity

N=3 (quorum=2): consensus = 140.0  ← 40% inflation accepted as valid
N=5 (quorum=3): consensus =  99.0  ← honest majority prevails
Conservative hold (1 of 3 nodes active): consensus = None  ← correct behavior
```

**Missing tests (all absent from test_model_outline.py):**
1. Multi-node consensus under normal operation (median of valid readings)
2. 2-of-3 colluding node fabrication → inflated consensus accepted as valid
3. N=5 honest-majority protection (colluding pair defeated)
4. Conservative hold path (quorum not met → None returned)
5. Methodology-class composition of quorum nodes

**The test suite currently provides coverage only at the component level (single node reads), not at the system level (consensus behavior).** PRD-003's oracle BFT finding is not testable against the current test suite — there is no test that would fail even if the BFT vulnerability is present.

---

## Phase 2 System-Level Findings

### Finding 6: AK and P2 Are in Structural Contradiction — Neither Can Be Fully Satisfied by Parameter Selection

The Asymmetric Error Doctrine (Annex AK) requires measurement of failed enrollment attempts. Pillar 2's minimum-data principle prohibits collecting records of non-enrolled persons. These are not competing values resolvable by weighting — they make mutually exclusive data-collection demands. The only P2-compatible measurement path (advocacy self-reporting) is unverifiable and cannot operationally enforce AK's own targets.

This finding elevates P-016 (Annex AK) from a "PROPOSED Tier 2 founding commitment" to a **pre-pilot architectural design problem**. The founding coalition cannot simply fill in numeric targets — it must first resolve the data-collection architecture contradiction before the targets are meaningful.

### Finding 7: The Oracle Methodology-Class Floor Compounds the BFT Floor

PRD-003 identifies that N=3 fails BFT (requires N≥5). Sim D now adds: P-017's 2-class minimum fails to guarantee class diversity in the SQ activation quorum at any N. Both fixes are required simultaneously:
- **PRD-003 fix:** Raise N_min from 3 to 5
- **New P-017 fix:** Raise class floor from 2 to 3

With N=5 and 3-class floor: dominant class max = 3 < SQ quorum = 4. BFT is satisfied and class diversity in quorum is guaranteed simultaneously. The two requirements are compatible and mutually reinforcing at N=5.

**Gate order matters:** P-017 is a pre-launch gate for P-003's SQ activation mechanism. P-017 must be updated with the 3-class floor before P-003 can be declared operative. Currently both are PROPOSED.

### Finding 8: The Test Suite Cannot Detect Its Two Most Critical Mechanism Failures

Two of the three highest-priority protocol failures identified in this audit are invisible to the current test suite:

1. **Oracle BFT failure at N=3** — no consensus test exists; only single-node reads are tested (Sim H)
2. **COMMITTED state demurrage behavior** — the test implements behavior contradicting P-023's design claim (Sim G)

A test suite that cannot fail when the mechanism fails is not a safety net — it is documentation of the happy path. Before any pilot, the test suite requires two additions:
- Multi-node oracle consensus tests covering colluding nodes, quorum failure, and conservative hold
- COMMITTED state demurrage test with an explicit assertion on whether `days_idle` increments during escrow

These are implementation gaps, not design changes. **Magnitude note (Sim G correction):** At the correct daily rate (`demurrage_rate_monthly / 30 ≈ 0.000333`), the 60-day escrow divergence between test behavior and P-023 claim is ~1.03 EC per 100 EC — not ~26.7 EC as an earlier draft of this table showed. The earlier draft incorrectly applied the monthly rate as a daily rate (26× overstatement). The structural contradiction is unchanged: the test explicitly shows `days_idle` is frozen in COMMITTED state, which means no demurrage accrues regardless of duration. At 1M EC held in escrow for 60 days, the underapplied demurrage is ~10,280 EC. The design question — whether escrow is demurrage-exempt or not — remains unresolved and unspecified in P-023 and Annex AR.

### Finding 9: The Civic Legibility Gap Is an Unspecified Pillar 8/9 Interaction

The 61-point comprehension gap between DW quintiles (Sim F, 24.3× effective influence ratio) arises from the interaction of two system features that each appear reasonable in isolation:
- DW rewards contribution (Pillar 8) — appropriate design
- DW allocates agenda weight (Pillar 9) — appropriate design

The interaction produces a third effect neither pillar specifies: those who contribute most *also* understand the agenda most *also* have the most agenda weight. Comprehension correlates with DW because the activities that generate DW also generate issue familiarity. This is a legitimate-participation advantage being converted into agenda capture through information asymmetry — not through deliberate design, but through an unspecified interaction.

No pillar currently specifies a legibility standard. The Annual Compound Simulation identifies this as a "recommended CRP step" without formalizing it. Until a Civic Legibility Standard is specified with a minimum comprehension threshold, a legibility budget requirement, and Pillar 11 monitoring metrics, the DW system is partially functioning as an information-asymmetry amplifier rather than a civic voice equalizer.

---

---

## Deep Audit — Phase 4: Conditional Pillar Stress Tests (PRD-007 through PRD-012)

*Phase 4 examines the six CONDITIONAL pillars (P4, P6, P7, P10, P11, P12) that the Phase 1 scorecard deferred pending gate resolution. The prior audit documented the conditions for CONDITIONAL status; this phase stress-tests the underlying mechanisms against the same five frameworks to determine whether the CONDITIONAL verdict is stable or conceals undetected FAIL conditions. Four simulations (Sim L–O) are produced and six PRDs are written.*

---

### Sim L — 72-Hour Redemption Failure Rate by Population Category (Pillar 4 / Task 4.1)

**Setup:** LC daily tranches are valid for 72 hours from issuance. The 72-hour window assumes continuous access to a registered delivery point. Test: what is the expected redemption loss rate for populations whose access is structurally interrupted?

| Population | Typical access interruption | 72h window consumed? | Expected loss per event |
|:---|:---:|:---:|:---:|
| Acute hospital admission (avg stay 4.7 days) | 112 hours | YES — 100% (days 2–5) | 3–4 daily tranches |
| Incarcerated (pre-trial detention, avg 3 days) | 72+ hours | YES | 1–3 tranches |
| Natural disaster displacement (FEMA avg 3–7 days) | 72–168 hours | YES — partial to full | 1–5 tranches |
| Rural/remote (>4h travel to nearest delivery point) | N/A — structural | Conditional on trip frequency | 1 tranche per missed day |
| Severe psychiatric episode (crisis hold, avg 5.4 days) | 130 hours | YES — 100% (days 2–6) | 3–5 tranches |

**Finding:** The 72-hour design correctly prevents accumulation. It simultaneously creates a structural redemption gap for populations with involuntary access interruptions. These are not edge cases — hospitalization, incarceration, disaster displacement, and severe mental health episodes affect the populations most dependent on the CSM floor.

**The continuity safeguard ("Protected Pause preserves proportionate access") does not address this failure mode.** Protected Pause is a contribution-system adjustment (DW/CR continuity during hardship). It does not extend LC validity windows or guarantee LC delivery to delivery-inaccessible locations. The spec notes "provider outages" as an exception but does not specify what triggers a continuity path for delivery-point inaccessibility vs. individual incapacity.

**Required specification:** The delivery-point inaccessibility continuity path must be architecturally specified, not listed as a future founding commitment. Minimum: define the trigger conditions (delivery point inaccessibility exceeding N hours), the substitute delivery mechanism (mobile delivery, institutional delivery point registration), and the LC validity extension rule (extend window or re-issue) before pilot.

---

### Sim M — Physical Asset Demurrage Bypass (Pillar 7 / Task 7.2)

**Setup:** EC demurrage applies to *idle financial balances*, not physical assets. Test the conversion pathway: EC holder converts to physical assets before the idle threshold θ (FOUNDING COMMITMENT, not yet specified), holds physical capital, reconverts to EC on need.

| Strategy | EC demurrage paid | Physical asset carrying cost | Effective demurrage avoidance |
|:---|:---:|:---:|:---:|
| Hold EC past θ | r × t_idle | — | 0% |
| Convert EC → physical inventory (goods) | 0% | Storage cost only | Up to 100% |
| Convert EC → land/equipment registry | 0% | Registry fee (unspecified) | Up to 100% |
| Convert EC → collectibles/art (high-value asset registry) | 0% | Registry fee (unspecified) | Up to 100% |

**At any demurrage rate r, an actor who converts EC to physical assets before threshold θ pays zero demurrage.** The anti-hoarding mechanism applies to financial holdings only. The physical asset registries are cited as an anti-hoarding deterrent ("transparent registries for high-value assets deter shadow accumulation") but no carrying-cost mechanism analogous to demurrage is specified for physical holdings.

**Equilibrium under adversarial conditions:** High-EC actors convert to physical asset holdings near θ, hold, and reconvert on need. Demurrage fully avoids them. This creates a two-tier economy: ordinary participants subject to demurrage on financial balances; capital-sufficient actors who rotate through physical assets to avoid it. The anti-concentration function of demurrage is negated for any actor with sufficient EC to purchase physical assets.

**Required patch:** Specify a carrying cost on registered high-value physical assets (above a threshold analogous to the EC operating-float exemption) payable in EC, designed to produce equivalent anti-hoarding signal to EC demurrage at the actual operative rate. Without this, the demurrage architecture applies to the wrong layer of the wealth stack.

---

### Sim N — Small-Community k-Anonymity Failure (Pillar 11 / Task 11.1)

**Setup:** Pillar 11 mandates real-time public dashboards with "aggregation thresholds" and "small-cell suppression" to protect individual privacy. k-anonymity requires that any published cell represents at least k individuals. Test: at what community size does the transparency requirement structurally conflict with the k-anonymity floor?

**Assumptions:** Dashboard publishes capacity utilization by (neighborhood × service type). Pilot community. Service types: food, water, shelter, healthcare, transit (5 types). k-anonymity floor: k ≥ 5 (standard minimum).

| Community size | Avg cell size (5 types, 4 neighborhoods) | k ≥ 5 satisfied? | Publishable cells | Information loss |
|:---:|:---:|:---:|:---:|:---:|
| 10,000 | 500 | YES | 100% | Minimal |
| 2,000 | 100 | YES | 100% | Minimal |
| 500 | 25 | YES | 100% | Low |
| 200 | 10 | MARGINAL | ~80% | Moderate |
| **100** | **5** | **BORDERLINE** | **~50%** | **HIGH** |
| 50 | 2.5 | **NO** | **<20%** | **CRITICAL** |

**At a community of 100 people** (plausible early pilot scale), approximately half of all dashboard cells must be suppressed to satisfy k=5. The published dashboard becomes sparse — providing less than half the transparency the protocol promises.

**The tradeoff is structural, not parametric.** Raising the k threshold improves privacy protection and reduces transparency. Lowering it improves transparency and reduces privacy. No parameter selection satisfies both simultaneously at small community scales. The pilot community is likely to be small; this failure manifests most acutely at exactly the deployment scale the founding coalition controls.

**Required specification:** Publish a pilot-scale privacy architecture that explicitly models k-anonymity tradeoffs at the expected pilot population size. The differential privacy parameters must be chosen *after* the pilot community size is known, not before. The Pillar 11 dashboard specification must include a minimum community size below which certain dashboard layers are suppressed pending scale threshold, with the suppressed data provided to independent auditors under P-017-equivalent independence standards.

---

### Sim O — Reserve Depletion Cascade (Pillar 12 / Task 12.1)

**Setup:** Pillar 12 mandates strategic reserves for food, water, energy, and critical medicines with "explicit replenishment rules." Reserve levels are all [FOUNDING COMMITMENT]. Test: what happens when one reserve is depleted under emergency conditions, assuming correlated demand across categories?

**Correlation structure (based on natural disaster scenario):**
- Food reserve depleted (e.g., supply chain disruption) → increased demand on water (drinking, sanitation during food preparation alternatives) and healthcare (malnutrition-adjacent conditions)
- Healthcare/medicine reserve depleted → increased demand on food (therapeutic nutrition) and energy (medical device power)
- Energy reserve depleted → cold storage failure → food reserve accelerated depletion + medical device failure → medicine reserve pressure

| Initial depletion event | Direct reserve hit | Correlated secondary hit | Cascade timeline |
|:---|:---:|:---:|:---:|
| Food −30% | Food | Healthcare +15% demand | Days 7–14 |
| Energy −50% | Energy | Food (cold storage) −20%, Medicine −10% | Days 1–3 |
| Water −40% | Water | Healthcare +25% demand, Food +10% demand | Days 3–7 |

**The cascade risk is not modeled anywhere in the current protocol.** Each reserve category has its own replenishment rules, but no cross-reserve correlation model exists. A protocol that treats four correlated reserve categories as independent systems will systematically underestimate combined depletion risk.

**Finding:** Under energy depletion alone, food reserves face accelerated secondary depletion within 1–3 days via cold storage failure. If food reserves are already near the (unspecified) minimum, energy depletion triggers a food crisis without a food supply event. No trigger in the current protocol detects this compound state — the PCRP sentinel indicators (P-006) monitor individual categories, not cross-category correlations.

**Required addition:** A cross-reserve correlation model must be developed as a Tier 2 founding commitment before pilot. Minimum specification: pairwise correlation coefficients between reserve categories under three standard emergency scenarios; a combined reserve health index that aggregates correlated risk rather than reporting each category independently; and a compound depletion trigger threshold that fires PCRP before any individual category reaches its floor.

---

## PRD-007: Pillar 4 — Life Support Layer

**Status: CONDITIONAL → FAIL (reclassified)**

### The Failure Point

**Failure A — 72-hour delivery-point inaccessibility (Sim L):** The continuity safeguard documentation lists "provider outages" as an exception condition but provides no architectural specification for the delivery-point inaccessibility continuity path. The populations most dependent on the CSM floor (hospitalized, incarcerated, disaster-displaced, severe psychiatric crisis) have structurally interrupted delivery-point access as a predictable consequence of their circumstances. This is not a rare edge case; it is the modal failure condition for the most vulnerable identity holders.

**Failure B — Caregiver exception boundary undefined:** The non-transferability rule includes a "narrowly scoped" caregiver/dependent exception. "Narrowly scoped" is not a specification. The operational test for coercion detection in a caregiver relationship is unspecified. Any person with legal guardianship authority can claim caregiver-exception status. The exception is auditable in principle, but there is no published audit criterion, no case categorization, and no maximum exception scope that would trigger automatic review.

**Failure C — Redemption identity fallback is normative (prior verdict upheld):** During identity re-verification suspension, CSM issuance continues. But delivery-point redemption requires "biometric or equivalent identity confirmation (Tier 2 assurance minimum)." A suspended identity cannot redeem LC at the Tier 2 assurance level. The spec says the system issues LC at CSM during suspension — but it does not specify a redemption mechanism that does not require the suspended identity confirmation. Issued but unreedemable LC is not survival access; it is a promise to provide access that the delivery system cannot honor.

### The Violated Principle
**Lessig — Architecture as Law.** The continuity safeguards are normative descriptions. "Protected Pause preserves proportionate access" is a design intent statement, not an architectural specification. There is no mechanism that automatically routes LC delivery to a hospital ward, a detention facility, or a disaster shelter when standard delivery-point access is interrupted.

**Ostrom — Principle 2 (Congruence).** The rules governing LC delivery must match the actual conditions under which the most vulnerable users operate. A 72-hour validity window that systematically fails during hospitalization and incarceration is not congruent with the population it purports to protect.

### The Systemic Risk
The most predictable failure mode of the LC delivery system is not Sybil attack or shadow convertibility — it is silent non-redemption by the people who need it most. A disabled person hospitalized for a week loses 5 daily tranches. No alarm fires. No PCRP indicator activates. The capacity pool registers the expiry as routine. The loss is invisible because it looks identical to voluntary non-redemption. This is INV-001's greatest vulnerability: the floor is architecturally in place but operationally unreachable for the people it protects.

### The Required Patch
1. **Institutional delivery point registration:** Hospitals, detention facilities, emergency shelters, and crisis mental health facilities must be registered as LC delivery points before pilot. LC should be redeemable through institutional delivery under institutional verification on behalf of confirmed identity holders.
2. **Delivery-point inaccessibility trigger:** Specify an architectural trigger: when a confirmed identity holder has not redeemed LC for N consecutive validity windows (suggested: 3 windows = 9 days), an automatic welfare check alert fires to the Ombuds or designated welfare authority. This converts silent non-redemption from invisible system noise to a detectable signal.
3. **Caregiver exception specification:** Publish the closed list of caregiver exception categories, the maximum LC units per period delegatable, the audit trigger (delegation > X% of total allocation for > Y consecutive periods), and the coercion detection criteria before any pilot.
4. **Suspended identity redemption path:** Specify the reduced-assurance redemption mechanism (Tier 1 assurance with institutional confirmation) that allows CSM delivery during identity suspension. "Issuance continues at CSM" is not sufficient — redemption must also continue.

---

## PRD-008: Pillar 6 — Land, Housing & Commons

**Status: CONDITIONAL (prior verdict upheld, gaps enumerated)**

### The Failure Point

**Failure A — Corporate entity Sybil (prior verdict upheld):** The one-person-one-core-wallet Sybil protection is designed for natural persons. A corporation, cooperative, or other legal entity can be assigned a use-right as a registered entity identity. Nothing in the current protocol prevents a single beneficial owner from holding multiple use-rights through multiple registered entity identities. The closed-list renewal criteria (vacancy, damage, illegal use, health-safety violations) do not screen for beneficial-owner consolidation. The anti-accumulation limits apply to individual persons under the use-rights model, not to the beneficial ownership layer.

**Failure B — Dispute resolution institution unspecified:** Use-rights allocations will generate disputes: contested renewals, inheritance-equivalent continuity, shared-care arrangements, co-occupancy conflicts. In a property-ownership model, courts adjudicate. In a use-rights model, no equivalent institution is named. The protocol's appeal paths guarantee a right to appeal, but the appeal body is unspecified. An appeal right without an appeal institution is a normative guarantee with no architectural support.

**Failure C — Commons regenerative governance oracle problem:** Pillar 6 requires "published regenerative targets" for water, energy, and ecological assets, measured and audited. Who measures soil health? Who audits water quality? Who sets the regenerative targets? This creates an implicit commons measurement oracle that inherits the Pillar 3 BFT and independence failures at a higher-stakes layer (ecological commons are slower to recover from measurement manipulation than economic systems).

### The Violated Principle
**Ostrom — Principles 1 and 4 (Boundary Definition and Monitoring).** The commons boundary (what constitutes a use-right, who holds one, what the beneficial ownership layer looks like) is not fully defined. Monitoring of regenerative targets requires an independent measurement oracle that is not specified.

**Buterin — Sybil Resistance.** Corporate entity Sybil attacks on use-rights bypass the natural person identity system entirely. The cost to create multiple registered entity identities may be low relative to the benefit of holding multiple use-rights in high-value areas.

### The Systemic Risk
Use-rights without beneficial ownership transparency reproduce private property concentration under a different label. A single actor holding thirty use-rights through thirty shell entities is functionally equivalent to owning thirty properties, but the protocol's anti-accumulation mechanisms do not reach the beneficial ownership layer. Over time, this recreates housing scarcity for natural persons without any formal property market.

### The Required Patch
1. **Beneficial ownership transparency:** Use-rights must be registered with a beneficial owner of record (natural person or confirmed community trust). Shell entity chains that obscure beneficial ownership are prohibited. This is a Tier 2 founding commitment requiring architectural implementation before pilot.
2. **Name the dispute resolution institution:** Before pilot, a named institution (or a specification for constituting one) must be published. Minimum: jurisdiction, appointment process, appeal pathway, conflict-of-interest rules.
3. **Commons measurement standards:** Publish a commons oracle specification analogous to Pillar 3's oracle requirements. Minimum: who measures which ecological indicators, at what frequency, under what independence standard, subject to what BFT-equivalent multi-source corroboration requirement.

---

## PRD-009: Pillar 7 — Enterprise & Production Platform

**Status: CONDITIONAL (prior verdict upheld, structural bias enumerated)**

### The Failure Point

**Failure A — Natural monopoly structural gap:** The protocol mandates competitive enterprise with open standards and interoperability requirements. This architecture applies to industries where competition produces efficiency — software, services, differentiated goods. It does not address industries where competition produces inefficiency: power grid infrastructure, water distribution, rail networks, broadband backbone, large-scale waste management. These natural monopolies have declining average cost curves; parallel competing infrastructure is waste-productive, not efficiency-producing.

The protocol has no design for natural monopoly governance. The anti-monopoly controls (merger controls, interoperability requirements) applied to natural monopolies either produce forced fragmentation (waste) or are inapplicable (a competitive power grid is not more efficient). Without a distinct governance track for natural monopolies, the protocol's enterprise architecture either destroys or ignores the industries that are structurally incompatible with its model.

**Failure B — Physical asset demurrage bypass (Sim M):** EC demurrage applies to idle financial balances. Physical assets (machinery, inventory, land, infrastructure) are exempt. Any actor with sufficient EC can convert to physical assets before the idle threshold and reconvert on need — paying zero demurrage indefinitely. The "transparent registries for high-value assets" carry no analog to demurrage's carrying cost. The anti-hoarding architecture addresses only the financial layer of the wealth stack.

**Failure C — Regenerative production enforcement vacuum:** "Repairability, take-back/extended responsibility, circularity incentives where feasible" contains an undefined escape hatch ("where feasible") with no published feasibility criteria, no enforcement body, and no consequence for non-compliance.

### The Violated Principle
**Beer VSM — S3/S4 separation.** The protocol describes what enterprise should look like (S4 intelligence) without specifying the control mechanism that enforces it (S3 regulation). The enterprise production standards are a design aspiration without an operational enforcement layer.

**Lessig — Architecture as Law.** "Anti-monopoly enforcement controls" are normative rules enforced by an unspecified regulatory body. Merger controls and interoperability requirements require an institutional enforcer. Without naming and constituting that institution, the controls are policy declarations.

### The Systemic Risk
The natural monopoly gap is not a future risk — it is a present architectural blind spot. Any pilot involving electricity, water, or communications infrastructure immediately encounters industries the protocol cannot govern as written. The founding coalition must either (a) exclude these sectors from the pilot's enterprise architecture and specify a governance track for them, or (b) acknowledge that the enterprise pillar is incomplete for infrastructure sectors and publish the completion timeline.

### The Required Patch
1. **Natural monopoly governance track:** Specify a separate governance architecture for natural monopolies — not competition, but regulated utility governance with rate review, service standards, and public interest override. This is a Tier 2 founding commitment gap.
2. **Physical asset carrying cost:** Specify a registered asset fee structure (analogous to EC demurrage) on high-value physical asset holdings above an exemption threshold. The fee should be sufficient to prevent systematic EC→physical asset demurrage avoidance at the operative demurrage rate.
3. **Regenerative production feasibility criteria:** Replace "where feasible" with a closed list of exemption conditions, each with a published review period. Enforcement body must be named before pilot.

---

## PRD-010: Pillar 10 — Operations, Oversight & Service Delivery

**Status: CONDITIONAL (prior verdict upheld, Beer VSM gap detailed)**

### The Failure Point

**Failure A — Beer S3* channel unspecified:** Beer's VSM requires a direct audit channel (S3*) from the operational layer to senior governance (S4/S5) that bypasses S3 (operational management). This channel exists so that operational audits are not filtered by the layer being audited. The protocol assigns audit functions to the Ombuds Office. The Ombuds reports to the Ombuds Oversight Panel, which reports to governance (Pillar 9). Pillar 9's deliberation layer has the 3-sector coalition capture problem (PRD-006). The S3* signal is directed at a potentially captured governance layer — the structural independence of S3* is not architectural, it is contingent on Pillar 9 being uncaptured.

**Failure B — "Execution without discretion" is unachievable (prior verdict upheld):** All rule execution requires boundary-case interpretation. The protocol acknowledges this implicitly by specifying appeal paths (appeals require someone to decide them) and by creating the Ombuds Office (investigations require someone to interpret whether a determination is warranted). The claim "execution without discretion" describes an aspirational limit, not a mechanically achievable state. What is needed is not the elimination of discretion but the specification of who holds discretion, under what constraints, subject to what review.

**Failure C — Indirect INV-006 violation through operational staff incentives:** INV-006 prohibits entities that govern LC issuance from being beneficiaries of those outcomes. Operational staff are paid in EC (payroll). Operational staff control safety-rail deployment and system continuity decisions. System continuity affects LC delivery reliability, which affects community welfare, which affects social stability, which affects the operational environment that determines staff EC payroll reliability. This is an indirect beneficiary relationship — not a violation of INV-006's literal text, but a structural conflict-of-interest that INV-006's stated purpose was designed to prevent.

### The Violated Principle
**Beer VSM — S3* independence.** The audit channel from operations to governance must structurally bypass the operational layer. Routing it through a potentially-captured Pillar 9 does not satisfy this requirement.

**Ostrom — Principle 5 (Conflict Resolution).** Dispute resolution mechanisms must be accessible and affordable. An Ombuds Office that is the single conflict resolution channel for all operational disputes is a single point of failure — when the Ombuds is under-resourced, captured, or conflicted, all dispute resolution fails simultaneously.

### The Systemic Risk
The Ombuds is already identified as the highest-leverage single structural gap (Finding 1). Pillar 10's S3* channel dependency on the Ombuds means that operational audit independence is entirely contingent on one institution being correctly constituted and free from capture. Six critical patches depend on the Ombuds being established. If Ombuds constitutionalization is delayed (the current state), all six patches remain PROPOSED and all six threat vectors remain open — simultaneously.

### The Required Patch
1. **S3* channel independence specification:** Specify a direct channel from operational audit outputs to S4/S5 (senior governance) that does not route through Pillar 9 deliberation. Minimum: an emergency escalation pathway for critical findings that triggers mandatory senior governance attention without requiring Pillar 9 scheduling. This could be a constitutional requirement that critical audit findings appear on the mandatory agenda of the next governance cycle regardless of DW-based prioritization.
2. **Discretion framework:** Replace "execution without discretion" with a published discretion taxonomy: which operational decisions require zero discretion (algorithmic), which require bounded discretion (specified criteria, documented, subject to Ombuds review), and which require full discretion (emergency conditions only, with mandatory post-hoc review). This is more honest and more enforceable than an unachievable prohibition.
3. **INV-006 operational staff conflict:** Specify that operational staff oversight decisions (safety-rail activation, system pause, enforcement escalations) are subject to mandatory independent review before implementation, precisely because operational staff have an indirect interest in system continuity. This closes the INV-006-adjacent conflict without requiring operational staff to have no stake in the system.

---

## PRD-011: Pillar 11 — Information Commons & Trust Transparency

**Status: CONDITIONAL (prior verdict upheld, structural contradiction detailed)**

### The Failure Point

**Failure A — Small-community k-anonymity failure (Sim N):** At expected pilot community scales (~100–500 people), standard k-anonymity thresholds require suppressing 20–80% of dashboard cells to protect individual privacy. The protocol simultaneously requires transparency (Pillar 11) and minimum data collection with small-cell suppression (Pillar 2/P-003). At small scales, these requirements are structurally in tension. No pilot-scale privacy architecture is specified. The founding coalition will encounter this conflict at first publication of pilot dashboard data and will have no architectural guidance for resolving it.

**Failure B — Real-time vs. delayed signal taxonomy unpublished:** P-004 (ACTIVE) protects against definition drift on specified protected terms. But the classification of signals as "real-time" vs. "delayed" is not itself a protected specification. Without a published taxonomy, the real-time vs. delayed classification is subject to negotiation, political pressure, and definitional drift — the exact failure mode P-004 was designed to prevent, now applied to P-004's own adjacent domain.

**Failure C — P-004 scope excludes implementation-layer drift:** P-004's semantic audit covers changes to defined terms in protocol documents. It does not cover behavioral changes implemented at the software layer without changing defined terms. A software update that modifies the algorithm calculating "idle balance threshold" does not change the term "idle balance threshold" — it changes the behavior the term encodes. Technical implementation can drift from documented meaning without triggering P-004's audit mechanism.

### The Violated Principle
**Lessig — Architecture as Law.** The transparency system relies on normative commitments to publish the right information at the right granularity. The k-anonymity tradeoff is a genuine architectural constraint, not a policy preference — it cannot be resolved by choosing better values for founding commitment parameters.

**Ostrom — Principle 4 (Monitoring).** The information commons is the protocol's self-monitoring mechanism. A monitoring system that can publish less than half of its intended dashboard due to privacy constraints at pilot scale is not a functioning monitor. And a monitoring system whose key signal classifications are subject to definitional drift is not a reliable monitor.

### The Systemic Risk
If the pilot dashboard is sparse due to k-anonymity constraints, the founding coalition faces pressure to lower the privacy threshold (increasing transparency at the cost of privacy) or to suppress more categories (maintaining privacy at the cost of oversight). Either choice, made under real-time pressure without pre-specified architecture, sets a precedent that shapes all future dashboard governance. The pilot's information architecture becomes de facto constitutional law through operational precedent — exactly the definition-drift pathway T-007 targets.

### The Required Patch
1. **Pilot-scale privacy architecture:** Before pilot, commission and publish a k-anonymity analysis at the projected pilot population size. Publish the resulting suppression map — which dashboard cells will be suppressed, which will be published, and which will be provided under P-017-independent confidential audit access. The suppression map is itself a protected specification (Tier 2).
2. **Real-time vs. delayed taxonomy as Tier 2 specification:** The classification of each dashboard signal as real-time, short-delay (≤24h), medium-delay (≤7d), or long-delay (≤90d) must be published as a Tier 2 protected founding commitment before pilot. Changes require the Tier 2 amendment process.
3. **P-004 extension to implementation layer:** Extend P-004's semantic audit scope to cover implementation-layer behavioral changes that affect any protected term's operational meaning. This requires a test oracle: a published behavioral specification for each protected term against which software behavior can be audited. The test oracle is a Tier 2 protected document.

---

## PRD-012: Pillar 12 — Resilience, Regeneration & Adaptation

**Status: CONDITIONAL (prior verdict upheld, Beer S3/S4 gap and cascade risk detailed)**

### The Failure Point

**Failure A — Reserve levels all [FOUNDING COMMITMENT]:** The protocol cannot distinguish between "resilience maintained" and "resilience abandoned" until reserve-level founding commitments are filled. Zero days of food reserve and 30 days are both protocol-compliant in the current specification. This means the protocol offers no operational protection against resilience erosion — a governing body could deplete all strategic reserves to meet near-term resource demands and remain formally compliant with the protocol until the founding commitments are set.

**Failure B — Non-punitive scorecard = Beer S4 without S3 (prior verdict upheld):** Beer's S4 is the intelligence function — monitoring the environment, detecting signals. Beer's S3 is the control function — using those signals to modify operational behavior. The regeneration scorecard publishes ecological targets and measures performance. It does not specify what enforcement action triggers when targets are missed. This is S4 without S3: the protocol collects environmental intelligence and produces no control signal. A quarterly adaptation loop that *may* update parameters is not a control loop — it is an advisory loop. Without mandatory consequences for target misses, the scorecard is aspirational.

**Failure C — No-trade-away constraint is normative (Lessig test):** "No patch may reduce resilience guarantees to meet near-term targets" is evaluated by a FAP reviewer. The reviewer must determine whether a proposed patch "reduces resilience guarantees." That determination is a judgment call. A patch framed as "temporary resilience adjustment in response to pilot data" or "calibration of reserve definitions in light of operational experience" can reduce resilience while appearing compliant. The Lessig failure applies: the constraint is normative, enforced by human judgment, without an architectural backstop.

**Failure D — Cross-reserve cascade risk unmodeled (Sim O):** Energy depletion triggers food reserve secondary depletion within 1–3 days via cold storage failure. No cross-reserve correlation model exists. PCRP sentinel indicators (P-006) monitor categories independently. A compound depletion state (two categories simultaneously approaching floor) does not trigger any additional alert above the sum of two independent category alerts. The compound risk is systematically underestimated.

### The Violated Principle
**Beer VSM — S3 control layer.** A regeneration scorecard without enforcement is S4 (environment monitoring) without S3 (operational control). The ecological feedback loop has no mechanical coupling to operational decisions.

**Lessig — Architecture as Law.** The no-trade-away constraint and the reserve floor guarantees are normative rules enforced by FAP review. Neither has an architectural enforcement mechanism that makes violation technically impossible.

**Ostrom — Principle 6 (Graduated Sanctions).** Without specified consequences for ecological target misses, there are no sanctions — graduated or otherwise. Ostrom's principle requires that violations receive proportionate responses. Zero specified consequence is not a proportionate response.

### The Systemic Risk
Resilience reserves protect the CSM floor during emergencies. INV-001 (survival is unconditional) depends on physical delivery capacity being available when the system's issuance obligations must be met. If resilience reserves are depleted before an emergency, INV-001 cannot be honored — not because the system is unwilling to issue LC, but because the physical goods the LC represents do not exist. Resilience failure is the pathway through which physical-layer reality penetrates the protocol's architectural guarantees.

### The Required Patch
1. **Reserve minimums as Tier 2 founding commitments before pilot:** Minimum reserve level for each category (food, water, energy, critical medicines) must be expressed as days-of-CSM-coverage at the pilot population size before any pilot begins. These values exit [FOUNDING COMMITMENT] status and become enforceable floors.
2. **Regeneration scorecard enforcement coupling:** Attach mandatory escalation triggers to the scorecard. Minimum: first consecutive-quarter miss → mandatory parameter review (Beer S3 response); second consecutive miss → mandatory governance item that cannot be dequeued; third consecutive miss → protocol-level emergency declaration. These triggers should be Tier 2 specifications.
3. **Cross-reserve correlation model:** Develop and publish a pairwise cross-reserve correlation model before pilot. Specify a combined reserve health index and a compound depletion sentinel threshold that fires PCRP before any individual reserve reaches its floor (anticipatory signal, not lagging).
4. **No-trade-away architectural backstop:** Convert the no-trade-away constraint from a FAP judgment call to a quantified test: any patch that reduces any reserve minimum, extends any scorecard target, or narrows any resilience obligation must pass a formal resilience impact assessment by an independent reviewer (P-017-equivalent independence standard) before FAP intake. The impact assessment is the architectural precondition; FAP rejection is the consequence.

---

## Phase 4 System-Level Findings

### Finding 15: Pillar 4 Is a FAIL, Not a CONDITIONAL — Reclassification Required

The prior scorecard classified Pillar 4 as CONDITIONAL pending architectural specification of the identity fallback during redemption. Phase 4 analysis reveals two additional unresolved failures (delivery-point inaccessibility for the most vulnerable populations; undefined caregiver exception boundary) that are not contingent on PRD-001 or PRD-002 resolution. These failures exist independently and affect the LC's core operational promise. Pillar 4 should be reclassified to FAIL pending:
1. Institutional delivery point registration architecture
2. Silent non-redemption detection trigger (Ombuds welfare alert)
3. Caregiver exception closed-list specification
4. Suspended identity reduced-assurance redemption path

### Finding 16: Physical Asset Holdings Are the Demurrage Architecture's Unaddressed Attack Surface

Sim M confirms that EC→physical asset conversion before the idle threshold avoids demurrage indefinitely. This is not a novel exploit — it is the standard historical response to wealth taxes and asset-holding restrictions in every comparable economic system. The protocol's demurrage architecture addresses the symptom (idle financial balances) rather than the underlying condition (idle productive capacity, whether financial or physical). The anti-hoarding mechanism needs a physical asset analog before the demurrage architecture can claim to produce the concentration-reduction effects simulated in Phase 1, Test 2.

### Finding 17: The Cross-Reserve Cascade Risk Is the Protocol's Unmodeled Systemic Tail Risk

INV-001's survival guarantee is ultimately backed by physical goods. The protocol's resilience architecture treats the physical reserve categories as independent. They are not — under any realistic emergency scenario involving infrastructure failure, the reserve categories are correlated. Energy failure cascades to food and medicine within days. Food shortage cascades to healthcare within weeks. The current architecture cannot detect or respond to compound reserve depletion until each individual category reaches its independently specified sentinel threshold. By that point, cascades may already be underway. A compound reserve health index is not optional — it is the mechanism that makes INV-001 operationally credible under emergency conditions.

### Finding 18: The Five CONDITIONAL Pillars Share a Common Root Cause

P6, P7, P10, P11, and P12 are all CONDITIONAL for the same underlying reason: each specifies a governance or enforcement function without naming the institution that performs it.

| Pillar | Unnamed institution |
|:---|:---|
| P6 | Use-rights dispute resolution body |
| P7 | Competition and natural monopoly regulator; production standards enforcer |
| P10 | S3* independent audit channel recipient; operational discretion reviewer |
| P11 | Real-time vs. delayed signal taxonomy guardian; implementation-layer audit body |
| P12 | Resilience impact assessment body; scorecard enforcement escalation authority |

Every one of these institutional gaps flows through the same dependency: the Ombuds Office and its Oversight Panel are unestablished. The Ombuds is the natural home for several of these functions. **Until the Ombuds is constituted with a specified mandate covering these domains, all five CONDITIONAL pillars remain operationally incomplete.** This confirms and strengthens Finding 1 — the Ombuds constitutionalization bottleneck is not merely the largest single gap; it is the root cause of over half the system's unresolved audit findings.

---

## Updated Scorecard

| Pillar | Name | Phase 1 Verdict | Phase 4 Verdict | Change |
|:---:|:---|:---:|:---:|:---:|
| **P1** | Constitutional Invariants & Rights | FAIL | FAIL | — |
| **P2** | Personhood, Identity & Continuity | FAIL | FAIL | — |
| **P3** | Resource & Capacity System | FAIL | FAIL | — |
| **P4** | Life Support Layer | CONDITIONAL | **FAIL** | ↓ |
| **P5** | Monetary Architecture | FAIL | FAIL | — |
| **P6** | Land, Housing & Commons | CONDITIONAL | CONDITIONAL | — |
| **P7** | Enterprise & Production Platform | CONDITIONAL | CONDITIONAL | — |
| **P8** | Contribution & Capability Development | FAIL | FAIL | — |
| **P9** | Civic Deliberation & Decision Systems | FAIL | FAIL | — |
| **P10** | Operations & Service Delivery | CONDITIONAL | CONDITIONAL | — |
| **P11** | Information Commons & Trust Transparency | CONDITIONAL | CONDITIONAL | — |
| **P12** | Resilience, Regeneration & Adaptation | CONDITIONAL | CONDITIONAL | — |

**Final: 7 FAIL. 5 CONDITIONAL. 0 unconditional PASS.**

PILOT-ELIGIBLE gate list now extends to 14 required conditions (10 prior + 4 from Phase 4):

| Priority | Gate | Source |
|:---:|:---|:---:|
| 11 | Institutional delivery point registration + silent non-redemption detection | PRD-007 |
| 12 | Caregiver exception closed-list + suspended identity redemption path | PRD-007 |
| 13 | Physical asset carrying cost specified | PRD-009 / Sim M |
| 14 | Cross-reserve correlation model + compound sentinel threshold | PRD-012 / Sim O |

*Phase 4 adds 18 new findings to the register (Sim L–O; PRD-007–012; Findings 15–18). No prior finding is superseded. The Consolidated Risk Map in Phase 3 remains the authoritative priority ranking, with Phase 4 gates appended at positions 11–14.*
