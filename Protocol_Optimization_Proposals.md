# Protocol Optimization Proposals

**Auditor role:** Principal Systems Architect & Macroeconomic Auditor (adversarial red-team).
**Date:** 2026-04-18.
**Posture:** Hostile but constructive. No praise for the protocol as a whole. Proposals optimize for **less government, decentralization, non-coercion, subsidiarity, and voluntary stewardship**.
**Scope:** Derived from ingestion of `White_Paper.md`, `Master_Protocol.md`, `Threat_Register.md`, `Patch_Log.md`, `docs/ADVERSARIAL_AUDIT.md`, and all files in `docs/annexes/`. This document is advisory — **no authoritative file has been modified**.
**Existing audit acknowledgment:** Phases 1–3 of `docs/ADVERSARIAL_AUDIT.md` (6 PRDs, 7 sims, 14 findings) are not duplicated here. This document addresses holes the existing audit has *confirmed but not closed*, plus pathologies the existing audit has *not yet named*.

**Continuity note:** This proposal memo preserves the legacy pillar shorthand used when it was authored. The current constitutional presentation uses **one Founding Order** and **Articles I-VII**.

---

## A. Executive Audit Verdict

The protocol's core insight — **separating physical survival claims from monetary claims from civic claims** — is genuinely original and structurally correct. That is the praise limit. Structurally, the protocol in its current form:

1. **Over-centralizes** implementation of a fundamentally polycentric insight (one Ombuds, one CRP, one RCS, one founding coalition, continental-scale default).
2. **Confuses architecture with norm** (Lessig) across most Tier 1 invariants. Most "unamendable" claims collapse to "a human panel is supposed to reject bad amendments."
3. **Under-quantifies** load-bearing thresholds (leakage, civic floor, error bounds, demurrage rate, oracle N, methodology class count, penalty multipliers).
4. **Lacks subsidiarity and exit** — any protocol without a defined right-of-exit at the smallest viable jurisdictional unit is coercive-at-scale regardless of internal mechanics.
5. **Contains redundant pillars** (P1/P10, P4/P5, P6/P7, P11/P10, P12/P3) that multiply drift surfaces and capture targets.

**Protocol claim scorecard against the three core claims (my independent verdict):**

| Core claim | Verdict | Governing weakness |
|:---|:---:|:---|
| Survival is independent of market power | **PARTIAL** | LC non-convertibility is normative above-ledger; Annex Y (CSM floor) is missing from worktree; oracle capture voids the issuance anchor |
| Markets remain productive | **CONDITIONAL** | Demurrage corridor (0.25–1.00%) too wide; investment-channel exemption is the new capture vector; no jurisdictional competition |
| Civic influence cannot be purchased | **FAIL** | Attestation-network bribery (T-018 OPEN); Impact Review panel bribery (unpatched); Ombuds-office single-point-of-capture |

Total existing patches: 23. ACTIVE: 4. PROPOSED: 19. OPEN threats without any patch: 7 (T-018–T-024). **The protocol is DEFENSIBLE on paper and NOT SCALE-READY in fact** — confirming the system's own self-assessment in `White_Paper.md` §5.

---

## B. Proposals

Ten proposals, prioritized. Each has a structured brief. All optimize for less government, decentralization, and non-coercion.

---

### PROPOSAL 1 — Replace normative Tier 1 enforcement with cryptographic architectural enforcement

- **[TARGET]** Pillar 1 (`Master_Protocol.md` §III, Pillar 1), Annex Y (absent), `docs/INVARIANTS.md`. Files: Master_Protocol.md lines 245–252, any future `/annexes/Y/`.

- **[THE FLAW]** Tier 1 invariants are described with architectural language but enforced by a human process. Source: Master_Protocol.md lines 246–252 lists seven invariants including *"Survival is unconditional: baseline essentials are guaranteed and cannot be withdrawn as punishment"* and *"Separation-of-concerns: survival (LC), enterprise (EC), and the civic layer (DW/CR) remain distinct and non-convertible."* The system relies on FAP (Founding Adversarial Panel) reviewers manually rejecting non-compliant amendments. `docs/ADVERSARIAL_AUDIT.md` Test 6 confirms: *"'Unamendable' is a normative description enforced by a human process (FAP review), not a technical impossibility."* A captured FAP passes any amendment.

- **[THE PROPOSED SOLUTION]** Convert every Tier 1 invariant into a cryptographically-committed ledger invariant enforced at the protocol layer, not at the review layer. Concretely:
  - CSM (Constitutional Survival Minimum) issuance runs automatically against verified personhood commitments with **no governance-actor authorization required for disbursement**. A governance actor must be architecturally *unable* to halt CSM issuance.
  - Instrument-conversion primitives (LC→EC, DW→EC, CR→EC) are absent from the ledger codebase, not merely forbidden. No executable function exists that could be invoked.
  - Tier 1 amendment requires M-of-N cryptographic signatures from geographically-dispersed key-holders *plus* a minimum wall-clock delay that no human can override.
  - Definition-drift protection is implemented as a hash-chain of protected terms; any change to a protected term requires a hash rotation event visible in the public ledger.

- **[SUPPORTING REASON]** Classical liberal tradition (Federalist #51: *"If men were angels, no government would be necessary"*) and the biblical recognition of human corruptibility (Jeremiah 17:9) both require that mechanisms not depend on the virtue of officeholders. Lessig: architecture > norms. Code that lacks the instruction for an action cannot perform that action, regardless of who captures which panel.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - Requires full specification of `Annex Y` (currently absent) as executable schema.
  - Forces the codebase (to be published in a future `/architecture/` directory) to actually implement the ledger-layer primitives the text claims.
  - Closes PRD-001 FAIL verdict; downgrades T-016 from Critical to Moderate.
  - Increases founding cost (real cryptographic engineering), decreases lifetime capture risk substantially.
  - Dependencies: Requires Proposal 3 (raised oracle N) and Proposal 10 (CSM architectural floor) to be meaningful.

- **[CONSTRAINT CHECK]**
  - Does not expand government: reduces the surface on which governance actors can operate.
  - Decentralizes: M-of-N signatures distribute authority by construction.
  - Non-coercive: removes the ability of any party to coerce via invariant override.
  - Honors human dignity: makes constitutional survival floor mechanical and unconditional.

- **[SCAFFOLDING ARCHITECTURE]** Create:
  ```
  /architecture/
    invariants.spec.md        # cryptographic commitment schema per invariant
    amendment_protocol.md     # M-of-N multi-sig + time-lock spec
    drift_chain.md            # protected-term hash chain
  /annexes/Y/
    CSM_basket.md             # numerical minimum per category
    CSM_issuance.md           # automatic issuance rules
  ```

---

### PROPOSAL 2 — Collapse 12 pillars → 7 pillars + 1 foundational layer

- **[TARGET]** `Master_Protocol.md` §III (The Twelve Pillars), `White_Paper.md` §4, all index files, all pillar-reference annexes, existing folder structure.

- **[THE FLAW]** Five pillar pairs describe the same function at different altitudes:
  - P1 (Constitutional Invariants) and P10 (Operations/Oversight): Master lines 245–252 vs 306–312 — rights-definition vs rights-execution of the same underlying principle set.
  - P4 (Life Support Layer) and P5 (Monetary Architecture, LC portion): Master lines 265–270 vs 177–182 — LC delivery vs LC instrument. Redundant definition surface; T-007 drift attacks exploit the gap between the two.
  - P6 (Land/Housing) and P7 (Enterprise): Master lines 280–285 vs 287–291 — housing is a commons case of enterprise. Co-ops fall in both.
  - P11 (Transparency) and P10 (Operations): Master lines 306–316 — the reporting function and the operating function should never share an institutional home (Beer VSM S3/S3* independence principle).
  - P12 (Resilience/Reserves) and P3 (RCS): Master lines 259–263 vs 319–323 — P3 measures the reserves P12 maintains.

  And three foundations are absent:
  - No subsidiarity layer (Ostrom principle 8 nested enterprises).
  - No right of exit (PRD-006 Finding 14).
  - No Beer-S4 environmental-scanning function distinct from RCS.

- **[THE PROPOSED SOLUTION]** Restructure to:

  | New | Absorbs | One-line job |
  |:---|:---|:---|
  | **P0. Subsidiarity, Consent & Exit** | *new* | Defines the smallest viable unit, consent-of-founding, and right of exit |
  | **P1. Rights & Rule of Law** | P1 + P10 oversight | Tier 1 invariants + rule-bound execution (with S3* audit channel genuinely independent) |
  | **P2. Personhood & Continuity** | P2 (unchanged) | Proof-of-personhood, recovery, guardianship |
  | **P3. Physics & Reserves** | P3 + P12 | RCS measurement + resilience reserves as one capacity function |
  | **P4. Survival** | P4 + LC portion of P5 | LC instrument AND its delivery — one definition, one attack surface |
  | **P5. Markets & Commons** | P6 + P7 + EC portion of P5 | EC + land/commons use-rights + anti-monopoly under one rubric |
  | **P6. Civic Layer** | P8 + P9 + DW/CR portion of P5 | DW/CR instruments + deliberation + contribution — unified |
  | **P7. Transparency & Environmental Scanning** | P11 + new S4 | Public dashboards + external-world scanning (Beer S4) |

- **[SUPPORTING REASON]** Ockham's razor applied to governance surface: every pillar is a capture target. Twelve targets is three times the attack surface of four. Ostrom principle 8 requires nested enterprises — the 12-pillar flat architecture currently gestures at this without implementing it. Biblical precedent (Exodus 18:17–26, Jethro's counsel to Moses): authority must be distributed hierarchically from household upward, not arrayed as equal horizontal departments at the top. Beer VSM: S3 (control) and S3* (audit) must be architecturally independent; currently they share P10 + P11, which is structurally unsound.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - Major rewrite of Master Protocol §III and White Paper §4 (but preserves all substantive content by consolidation, not deletion).
  - Threat Register pillar-tags must be re-mapped (roughly: each existing T-### keeps its content, its pillar label updates).
  - Patch Log pillar-tags same remapping.
  - Simulation suite parameter names need relabeling, not reparameterization.
  - Benefit: every subsequent document is shorter, clearer, and has fewer boundary disputes.
  - The existing 12-pillar nomenclature can be preserved as "legacy mapping table" in an appendix (same pattern as Master lines 327–340's v10→v11 table).

- **[CONSTRAINT CHECK]**
  - Reduces government: fewer institutions, fewer officials, fewer capture targets.
  - Decentralizes: introduces P0 subsidiarity layer; separates control from audit.
  - Non-coercive: P0 exit protocol is definitionally non-coercive.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /pillars/
    P0_subsidiarity/
      consent.md
      nested_authority.md
      exit_protocol.md
    P1_rights_rule_of_law/
    P2_personhood/
    P3_physics_reserves/
    P4_survival/
    P5_markets_commons/
    P6_civic_layer/
    P7_transparency_scanning/
  /legacy/
    pillar_mapping_v12_to_v7.md    # preserves traceability
  ```

---

### PROPOSAL 3 — Raise oracle N_min = 3 → 5, require 3-class methodology diversity, add adversarial seat

- **[TARGET]** Pillar 3 (new P3 Physics & Reserves under Proposal 2), `Annex AL`, `docs/SPECIFICATIONS.md`.

- **[THE FLAW]** From `docs/ADVERSARIAL_AUDIT.md` Test 1 and PRD-003: *"At N=3 with LC quorum=2, two colluding nodes supply fabricated readings that constitute a valid quorum. Simulation confirms: N=3 fails BFT for f=1."* And from Phase 2 Finding 7: *"P-017's 2-class minimum fails to guarantee class diversity in the SQ activation quorum at any N. Both fixes are required simultaneously."* P-017 is PROPOSED, not ACTIVE.

- **[THE PROPOSED SOLUTION]**
  - **N_min = 5** at pre-pilot gate; LC quorum = 3, SQ quorum = 4. Two-node collusion cannot forge a quorum.
  - **Methodology-class minimum = 3** with pairwise error-correlation test. Cohort admission requires published correlation matrix; any pairwise correlation above a pre-committed threshold invalidates independence regardless of formal classification.
  - **Adversarial seat.** At least one node per cohort is nominated by a body adversarial to the entity that would benefit most from high-capacity readings (the procurer of the essential). This is the oracle analogue of P-014's adversarial panel.
  - **Mandatory multi-node consensus test** added to the test suite (currently absent per Finding 8).

- **[SUPPORTING REASON]** Buterin mathematical BFT floor (n ≥ 3f+1 for f Byzantine faults) is not a norm — it's a theorem. Ostrom principle 4 (accountable monitoring) requires a monitor the watched cannot silently subvert. Biblical precedent (Deuteronomy 19:15): *"By the mouth of two or three witnesses shall the matter be established"* — and 12PP's oracle is the witness-layer for physical reality. Two witnesses are not enough for high-consequence testimony.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - Infrastructure cost: +2 oracle nodes per cohort. Small relative to system scale.
  - Closes PRD-003 FAIL.
  - Preconditions Proposal 6 (crisis fallback) — without N=5, fallback logic has no clean signal.
  - Test suite must grow to include consensus adversary tests.
  - Moves T-020 and T-021 from OPEN toward ADDRESSED.

- **[CONSTRAINT CHECK]**
  - Does not expand government: adds technical floor, not new authority.
  - Decentralizes by construction (more independent sources).
  - Non-coercive.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /pillars/P3_physics_reserves/
    oracle/
      n_floor.md                    # cryptographic pre-commitment to N_min = 5
      methodology_class_registry.md
      pairwise_correlation_test.md
      adversarial_seat.md
  /tests/consensus/
    bft_adversary.sim.md            # published adversary model
  ```

---

### PROPOSAL 4 — Publish every `[FOUNDING COMMITMENT]` as a binding number, locked at founding

- **[TARGET]** All hand-wavy clauses across Master, Annexes, White Paper. Specific instances:
  - `Master_Protocol.md` §0(a): *"society can measure key physical capacities with acceptable accuracy"* — no error bound specified.
  - `Threat_Register.md` T-001: *"The system shall define an explicit acceptable leakage threshold"* — deferred, currently undefined.
  - `ADVERSARIAL_AUDIT.md` PRD-005: Protected Pause civic floor — required range (0.13, 0.67), no value.
  - Pillar 5 §II.1: demurrage corridor *"0.25%–1.00% based on hoarding signals, investment blockage, and concentration metrics"* — signals/metrics undefined.
  - Pillar 8: *"Capability adjustment: expectations scale to disability, caregiving load, age"* — no formula.
  - Master §VIII Option B: *"basic shelter/heat"*, *"essential healthcare"* — undefined bounds.

- **[THE FLAW]** Every unspecified threshold is a political pressure point. The protocol assumes that vague language describing constitutional floors will be honored by good-faith interpretation. Under adversarial conditions, vagueness is always resolved in the direction of captured parties. Definition drift (T-007) is the *name* the protocol already gives this phenomenon — and yet the protocol is itself riddled with definition drift surfaces.

- **[THE PROPOSED SOLUTION]** Produce a **`Founding_Commitments.md`** document that lists every protocol parameter now marked `[FOUNDING COMMITMENT]` or left to interpretation, and binds each to a published number, formula, or bounded range with the narrowest technically-defensible bounds. Each commitment has:
  - A numerical value.
  - A short justification.
  - A hash-committed pre-launch timestamp.
  - A designated amendment process (H-3 refounding for Tier 1 commitments; ordinary process for Tier 3).

  Minimum initial list:
  - `ACCEPTABLE_MEASUREMENT_ERROR`: per-category confidence-interval cap (e.g., food: ±5%; water: ±3%; shelter: ±10%).
  - `ACCEPTABLE_LEAKAGE_THRESHOLD`: e.g., 3% of LC allocations per annum triggers enforcement escalation; 7% triggers systemic review.
  - `PROTECTED_PAUSE_FLOOR`: e.g., 0.30 DW units (within the (0.13, 0.67) envelope).
  - `ORACLE_N_MIN`: 5 (per Proposal 3).
  - `METHODOLOGY_CLASS_MIN`: 3 (per Proposal 3).
  - `BRIBE_DETERRENCE_MULTIPLIER`: 5× detected gain at ≥85% detection probability (per Proposal 7).
  - `DEMURRAGE_RATE`: single committed rate (e.g., 0.5%/month) with symmetric review corridor, not a 4× range.
  - `CSM_BASKET`: concrete minimum quantities per category.

- **[SUPPORTING REASON]** Classical liberal rule-of-law tradition (Hayek, *The Constitution of Liberty*): rules must be general, known in advance, and equally applied. Vagueness is discretion and discretion under pressure is tyranny. Biblical precedent: Proverbs 11:1 — *"A false balance is an abomination to the Lord, but a just weight is his delight."* A weight without a numerical definition is, by definition, a false balance.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - A single new file covering ~20 commitments.
  - Closes or substantially reduces T-007 (definition drift) and T-017 (bootstrap problem).
  - Increases founding difficulty (real numbers must be chosen) — this is a feature, not a bug. The founding must not be launchable until these are published.
  - Interacts with Proposal 1 (cryptographic enforcement) — commitments are ideally implemented as hash-committed values in the ledger.

- **[CONSTRAINT CHECK]**
  - Reduces government: removes discretionary interpretation space.
  - Decentralizes: published numbers are equally enforceable by anyone.
  - Non-coercive: eliminates a surface of coercive discretion.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /founding/
    commitments.md                  # the numerical table
    commitment_hash_chain.md        # ledger-level hash commitments
    justifications/
      measurement_error.md
      leakage_threshold.md
      protected_pause_floor.md
      ... (per commitment)
  ```

---

### PROPOSAL 5 — Introduce P0 Subsidiarity, Consent, and Exit as a new foundational layer

- **[TARGET]** Protocol architecture (new layer). Currently no file covers this.

- **[THE FLAW]** The protocol claims to be a "civic operating system" (White_Paper.md §1) but does not specify *who consents to be governed by it, at what scale, or how they withdraw consent.* The implicit default is continental (the "founding coalition" is not a household, neighborhood, or municipality). Every decision layer defaults upward. No sub-unit has authority to deviate from continental rules on locally-appropriate matters (Ostrom principle 2: rules match local conditions — violated by default). No jurisdictional cluster has a defined right to exit the protocol entirely. `docs/ADVERSARIAL_AUDIT.md` Finding 14 already names the downstream symptom — "exit value to adjacent jurisdiction unmodeled" — but does not name the upstream cause.

- **[THE PROPOSED SOLUTION]** Publish a new foundational layer with three components:

  1. **Subsidiarity rule.** Decisions default to the smallest viable unit capable of making them. The smallest unit is the household. The next is the neighborhood (≤500 persons). Then locality (≤5,000). Region (≤500,000). Federation (the protocol's continental scope). A decision is eligible for continental resolution only if a published test establishes that no smaller unit can handle it — typically because it involves cross-unit externalities or instrument-level integrity (EC/LC non-convertibility).

  2. **Consent-of-founding rule.** The protocol binds no unit that has not published an affirmative consent event. Dissenting units retain pre-protocol arrangements (with narrow exceptions for Tier 1 human-dignity invariants that bind everywhere regardless).

  3. **Exit protocol.** Any unit of locality-size or larger may, by supermajority of its resident personhood, initiate a two-year graceful-exit unwind. During the unwind, individuals within the unit retain LC access at the continental rate, EC is convertible at the prevailing rate, and civic balances decay normally. After unwind, the unit is outside the protocol. Re-entry is permitted by the same mechanism in reverse.

- **[SUPPORTING REASON]** This is the philosophical heart of the proposal.
  - **Classical liberalism:** Jefferson's formulation — governments derive just powers from the consent of the governed. The protocol currently presumes consent without requiring its production.
  - **Subsidiarity (Catholic social teaching, Althusius, and later Ostrom):** decisions belong to the smallest unit competent to make them. Centralization without necessity is itself a form of unjust dominion.
  - **Biblical:** Exodus 18:17–26 (Jethro's counsel — authority distributed from households upward), Deuteronomy 1:15–17 (judges over tens, fifties, hundreds, thousands), and the repeated pattern of covenantal consent in the Torah (Exodus 24:3, Joshua 24:15 — "*choose you this day whom ye will serve*"). Consent is explicit, renewable, and local in the biblical pattern.
  - **Non-coercion:** without a right of exit, any internal protection is only as robust as the captors' willingness to honor it. With exit, the protocol competes for legitimacy against the adjacent alternative — and must perpetually earn its own continuation.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - Largest conceptual change in this proposal set. Every pillar gains a subsidiarity qualifier.
  - Threat Register gains a new threat class: "Exit denial" and "Subsidiarity violation."
  - The "founding coalition" problem becomes smaller and more tractable: founding is at locality scale, federation is by accession.
  - Provides a real-world stress test on the protocol's merit: if people can leave and don't, legitimacy is proven.
  - Interacts with every pillar. Requires amendment to all.

- **[CONSTRAINT CHECK]**
  - Reduces government at every scale.
  - Decentralizes by construction.
  - Non-coercive by definition — exit is the negation of coercion.
  - Preserves human dignity: participation is voluntary.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /pillars/P0_subsidiarity/
    subsidiarity_rule.md            # smallest-unit-first decision rule
    consent_protocol.md             # founding consent event requirements
    exit_protocol.md                # two-year graceful unwind
    reentry_protocol.md
    jurisdictional_scales.md        # household/neighborhood/locality/region/federation
  ```

---

### PROPOSAL 6 — Crisis fallback: Oracle-quorum loss defaults to maximum-conservative rationing, not soft-oracle normalization (closes T-024)

- **[TARGET]** Pillar 3 (new P3), Patch Log P-022, Threat Register T-024.

- **[THE FLAW]** From `docs/ADVERSARIAL_AUDIT.md` Finding 11: *"T-024 soft oracle (REB non-oracle pathway during SQ active) has no architectural constraint preventing normalization. Minimum attack cost: 2-of-3 node disruption = 72 hours. Bypasses P-017 entirely."* Under the crisis simulation in the `<system_audit>` block above, this failure mode yields local REB-led emergency rule — the exact opposite of the third core claim ("power tightly constrained").

- **[THE PROPOSED SOLUTION]** When oracle quorum is lost while SQ is active (or while LC issuance exceeds the N-1 node conservative estimate):
  - System defaults to **the most restrictive category-specific ration** consistent with the last full-quorum reading. This is the maximum-conservative Schelling point.
  - REB first-responder authority is **narrowed**, not broadened. Under quorum loss, REB may continue only those operations that were authorized under the last valid quorum; it may not initiate new allocations.
  - **Restoration requires full quorum + 14-day verification window.** Soft-oracle readings, field reports, and telemetry may inform restoration but never trigger it automatically.
  - **Mandatory public post-mortem** within 7 days of any soft-oracle period over 24 hours, including a listed attempt to identify capture.

- **[SUPPORTING REASON]** Schelling focal-point theory: when coordination signal is lost, actors converge on the most prominent default. The current default favors REB discretion; the proposed default favors restriction — a fail-safe design that converts oracle-capture incentive from "positive" (capture → power) to "negative" (capture → ration-tightening on captor's own allies). Classical liberal prudence: restrained government is legitimate precisely because it is restrained; emergencies are the moment restraint is most needed, not least.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - Closes T-024 (currently OPEN, Critical).
  - Reduces value of oracle attack from positive to negative expected utility.
  - Worse short-term welfare during legitimate crises — acceptable cost for eliminating structural capture incentive. Reserve buffers (new P3 post-merge) reduce severity.
  - Requires Proposal 3 (N=5) to be meaningful: at N=3, quorum loss is a daily occurrence and this rule would grind the system to a halt. At N=5, quorum loss is a genuine emergency.

- **[CONSTRAINT CHECK]**
  - Reduces government: narrows REB emergency discretion.
  - Decentralizes: forces restoration through the polycentric oracle channel, not through centralized REB fiat.
  - Non-coercive: no party gains power through quorum loss.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /pillars/P3_physics_reserves/
    fallback/
      quorum_loss_rule.md             # max-conservative default
      reb_narrowed_authority.md
      restoration_protocol.md         # 14-day verification
  ```

---

### PROPOSAL 7 — Publish the above-ledger bypass penalty schedule (closes T-001 to ADDRESSED)

- **[TARGET]** Pillar 5 (EC portion under new P5), `Annex AJ`, Threat Register T-001 (ACTIVE, PARTIAL).

- **[THE FLAW]** From `docs/ADVERSARIAL_AUDIT.md` Test 5: *"Minimum deterrent penalty: 0.18 EC per bypass attempt. Any penalty above ~18% of gain deters bypass at 85% detection. The penalty structure is currently unspecified — T-001's open problem explicitly flags this."* And Master Protocol Annex AB2: *"The system shall define an explicit acceptable leakage threshold"* — deferred, never published. The current state: P-001 is ACTIVE, but its penalty parameter is missing. T-001 remains PARTIAL.

- **[THE PROPOSED SOLUTION]** Publish a penalty schedule as an amendment to `Annex AJ`:
  - Minimum deterrent penalty = **5× the detected gain**, at a detection probability assumed to be ≥85%. This sets expected-loss at ≥4.25× gain, far above any rational bypass threshold.
  - Penalty is denominated in EC (monetary, not civic) — preserves non-convertibility between enforcement and civic standing.
  - Scaled penalty for scaled offense: individual low-level informal exchange → minor fine; coordinated broker patterns → supra-deterrent multiple plus temporary enterprise-channel exclusion.
  - Annual-leakage threshold: **3% of aggregate LC allocations** triggers enforcement-intensity escalation; **7%** triggers a mandatory systemic review (which may result in instrument-architecture adjustment).
  - Published detection-probability methodology per category (food, shelter, transit, healthcare) so citizens can verify the deterrence math.

- **[SUPPORTING REASON]** Buterin mechanism-design principle: griefing factor (attacker cost ÷ victim cost) must be bounded and ≥1 for a mechanism to be incentive-compatible. A penalty = 0 produces an unbounded griefing ratio. Non-coercive principle: the penalty is monetary, not coercive — it does not deprive survival or dignity, only trims market-lane optionality. Biblical precedent: Exodus 22:1, Proverbs 6:31 — restitution schedule at a published multiple (twofold, fourfold, sevenfold) is a biblical pattern. The moral principle is specificity and proportion, not vagueness.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - T-001 moves PARTIAL → ADDRESSED.
  - P-001 specification gap closed.
  - Enforcement apparatus (new P1 under merger) has a concrete target to aim at.
  - Closes a core weakness in core-claim-1 (survival-independent-of-market-power).

- **[CONSTRAINT CHECK]**
  - Does not expand government: penalty mechanism already exists, merely gets a number.
  - Non-coercive: monetary penalty, not survival-denial or civic-rank penalty.
  - Honors dignity: bright-line rule beats discretionary enforcement.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /annexes/AJ/
    penalty_schedule.md
    detection_methodology.md
    leakage_threshold.md
  ```

---

### PROPOSAL 8 — Replace monolithic Ombuds Office with a rotating federation of sub-Ombuds

- **[TARGET]** `docs/annexes/ANNEX_AI.md` (Ombuds Office Constitution), Patch Log entries P-008, P-012, P-013, P-015, P-016, P-021.

- **[THE FLAW]** From `docs/ADVERSARIAL_AUDIT.md` Phase 2/3: *"Ombuds Office carries **6 load-bearing patch dependencies** (P-008, P-012, P-013, P-015, P-016, P-021). The Ombuds is not constituted. Zero of these 6 patches can reach ACTIVE until the Ombuds Commissioner is appointed."* This is the textbook Buterin single-point-of-failure. A six-patch institution is too valuable to be housed in one place — capture cost is low relative to defeat-value.

- **[THE PROPOSED SOLUTION]** Replace the single Ombuds Office with a federated Ombuds structure:
  - At least **5 geographically dispersed sub-Ombuds**, one per jurisdictional cluster.
  - Each sub-Ombuds has local authority (handles local cases).
  - Protocol-level decisions (those that currently depend on the monolithic Ombuds across P-008/P-012/P-013/P-015/P-016/P-021) require **affirmative supermajority (≥4 of 5) of sub-Ombuds**, with at least one affirmative vote from a cluster adjacent to the affected jurisdiction.
  - Rotation: sub-Ombuds terms are staggered; no sub-Ombuds can serve consecutive terms.
  - Ombuds appointment uses the adversarial-panel nomination rule from P-014 applied to each sub-Ombuds slot independently.

- **[SUPPORTING REASON]** Ostrom principle 8 (nested enterprises): oversight must be layered, not punctual. Buterin BFT: single-institution capture cost must be high relative to defeat-value. Biblical precedent: Exodus 18:21 — *"Place such over them to be rulers of thousands, and rulers of hundreds, rulers of fifties, and rulers of tens."* Ombuds authority distributed by scale, not concentrated at the top. Classical liberal: separation of powers applied not only horizontally (branches) but vertically (scales).

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - Substantial rewrite of Annex AI.
  - Six load-bearing patches become more robust: each requires 4-of-5 capture to defeat, not 1-of-1.
  - Decisions slower (4-of-5 consensus takes longer than 1 commissioner) — acceptable cost given consequences.
  - Interacts with Proposal 5 (subsidiarity): sub-Ombuds roles map naturally to P0's jurisdictional scales.

- **[CONSTRAINT CHECK]**
  - Reduces concentrated government (the opposite of a central Ombuds).
  - Decentralizes by construction.
  - Non-coercive: no sub-Ombuds has unilateral authority.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /annexes/AI/
    federated_ombuds.md             # 5 sub-Ombuds structure
    supermajority_rule.md
    rotation_schedule.md
    adversarial_nomination.md
  ```

---

### PROPOSAL 9 — Sybil-cost attestation: attestors put their own DW at stake (closes T-018)

- **[TARGET]** Pillar 8 (new P6 Civic Layer), Threat Register T-018 (OPEN).

- **[THE FLAW]** From `docs/ADVERSARIAL_AUDIT.md` PRD-005: *"Lightweight attestation for small CR claims creates a social graph exploitable by coordinated groups."* Attestors have no cost on producing attestations; therefore attestations can be bought off-ledger with EC. Civic-claim-3 (influence cannot be purchased) collapses via this route.

- **[THE PROPOSED SOLUTION]**
  - Every attestation requires the attestor to stake a proportionate amount of their own DW (or CR, for service-claims) in an **"attestation-at-risk"** pool.
  - If the attested claim is later ruled fraudulent within an audit window (e.g., 1 year), the attestor's staked weight is slashed and transferred to the public-good pool (not to any party, preserving non-coercion).
  - Attestors from different CR sectors are required for high-value claims (sector diversity requirement defeats sector-specific collusion).
  - Graph-analysis is automated: attestation networks with high mutual cross-attestation density above a `[Founding Commitment]` threshold trigger automatic review.

- **[SUPPORTING REASON]** Buterin mechanism design: every important attestation must have a cost to fake. Skin-in-the-game (Taleb): attestors bear risk for their testimony. Biblical precedent: Deuteronomy 19:18–19 — *"if the witness be a false witness ... then shall ye do unto him, as he had thought to have done unto his brother."* The false witness loses what the subject would have lost. This is a direct architectural implementation of the biblical false-witness rule: the attestor-at-risk loses their own civic weight at the scale of the claim they falsely supported.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - T-018 moves OPEN → ADDRESSED.
  - Civic-claim-3 gets a concrete architectural enforcement.
  - Minor friction on legitimate attestation (acceptable).
  - Integrates with Proposal 4 (attestation density threshold is a Founding Commitment).

- **[CONSTRAINT CHECK]**
  - Does not expand government: mechanism is peer-to-peer, not agency-mediated.
  - Non-coercive: attestor consents to stake when attesting.
  - Honors dignity: false witness is penalized in kind, not through survival-denial.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /pillars/P6_civic_layer/
    attestation/
      stake_at_risk.md
      slashing_rule.md
      sector_diversity_requirement.md
      graph_analysis_trigger.md
  ```

---

### PROPOSAL 10 — Publish Annex Y (Constitutional Survival Minimum) as architecturally-enforced floor

- **[TARGET]** `Annex Y` (currently absent from worktree despite being referenced throughout), new `/annexes/Y/`.

- **[THE FLAW]** From the `<system_audit>` above and the parallel exploration: Master_Protocol.md §0 (line 120) and §Pillar 4 (line 266) repeatedly reference "Annex Y" as the authoritative constitutional survival minimum. **The file does not exist in the worktree.** Protocol depends on an unpublished appendix for its most foundational commitment. This is the single largest definition-drift attack surface in the entire system: whoever first writes Annex Y writes the floor.

- **[THE PROPOSED SOLUTION]** Publish Annex Y as a concrete document before any pilot, containing:
  - Per-category minimum quantities (e.g., calories/day, liters of potable water/day, square meters of weather-safe shelter/person, annual medical-stabilization events/person, basic-sanitation service units).
  - Per-category substitution rules during verified scarcity (e.g., emergency calorie-substitution protocols, water-hauling protocols).
  - Cryptographic hash-commitment of the published values in the ledger at founding.
  - H-3 refounding as the only amendment pathway (Tier 1).
  - Automatic CSM issuance runs against personhood commitments — governance actors have no authorization role.

- **[SUPPORTING REASON]** Biblical grounding of the protocol (Genesis 1:27, *imago Dei*) and the protocol's own philosophical preamble require unconditional survival provision. Without a concrete floor, the provision is aspirational. Hayek's rule-of-law principle: generality, publicness, and equal application. An unpublished floor fails all three. Non-coercion: an unpublished floor is, by definition, a coercive discretion surface.

- **[SYSTEMIC IMPACT / BLAST RADIUS]**
  - Directly operationalizes core-claim-1 (survival independent of market power).
  - Preconditions Proposal 1 (architectural enforcement) and Proposal 6 (crisis fallback) — both need Annex Y to be concrete.
  - Forces a founding debate on numerical values — the right debate, at the right time.

- **[CONSTRAINT CHECK]**
  - Does not expand government: transfers a currently-undefined power to a hash-committed specification.
  - Decentralizes: floor is publicly enforceable by anyone.
  - Non-coercive: removes discretion from the floor-delivery pathway.
  - Honors dignity: gives concrete content to an abstract commitment.

- **[SCAFFOLDING ARCHITECTURE]**
  ```
  /annexes/Y/
    CSM_basket.md                   # numerical minima per category
    CSM_issuance_rule.md            # automatic, governance-actor-independent
    CSM_substitution.md             # crisis-mode substitutions
    CSM_hash_chain.md               # ledger commitment
  ```

---

## C. Proposal Prioritization and Sequencing

Dependencies form a DAG:

```
  [10] Publish Annex Y ─────────┐
                                │
  [4] Founding Commitments ─────┼──→ [1] Architectural enforcement ──┐
                                │                                    │
  [3] Oracle N=5 ───────────────┴──→ [6] Crisis fallback ────────────┤
                                                                     │
  [7] Above-ledger penalty ──────────→ [9] Attestation-at-risk ──────┤
                                                                     │
  [8] Federated Ombuds ─────────────────────────────────────────────→│
                                                                     │
  [5] Subsidiarity/Consent/Exit (P0) ───────────→ [2] 12→7 pillars ──┘
```

**Recommended implementation order (Tier 1 first, then architectural, then structural):**

1. **[10]** Publish Annex Y — currently the single largest protocol gap.
2. **[4]** Publish Founding Commitments — eliminates the vague-threshold attack surface.
3. **[3]** Ratchet oracle to N=5 + methodology diversity = 3 + adversarial seat.
4. **[7]** Publish penalty schedule — closes T-001 PARTIAL → ADDRESSED.
5. **[9]** Attestation-at-risk — closes T-018 OPEN → ADDRESSED.
6. **[6]** Crisis fallback — closes T-024 OPEN → ADDRESSED.
7. **[1]** Architectural enforcement (requires 10, 4 as inputs).
8. **[8]** Federated Ombuds (requires 4, 5 as inputs).
9. **[5]** Subsidiarity / Consent / Exit — conceptual restructuring.
10. **[2]** Collapse to 7 pillars + P0 — final structural consolidation.

---

## D. Constraint-Compliance Summary

| # | Proposal | Less gov | Decentralization | Non-coercion | Subsidiarity | Dignity |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | Architectural enforcement | ✓ | ✓ | ✓ | — | ✓ |
| 2 | 12→7 pillars + P0 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 3 | Oracle N=5 | ✓ | ✓ | ✓ | — | — |
| 4 | Founding Commitments | ✓ | ✓ | ✓ | — | ✓ |
| 5 | P0 Subsidiarity/Consent/Exit | ✓✓ | ✓✓ | ✓✓ | ✓✓ | ✓ |
| 6 | Crisis fallback | ✓ | ✓ | ✓ | — | — |
| 7 | Above-ledger penalty | — | — | ✓ | — | ✓ |
| 8 | Federated Ombuds | ✓ | ✓✓ | ✓ | ✓ | — |
| 9 | Attestation-at-risk | ✓ | ✓ | ✓ | — | ✓ |
| 10 | Publish Annex Y | ✓ | ✓ | ✓ | — | ✓✓ |

No proposal expands government, centralizes power, introduces coercion, or violates subsidiarity.

---

## E. What This Document Does Not Do

- Does not modify any authoritative file (Master Protocol, White Paper, Threat Register, Patch Log, any Annex, or Diagrammed Technical Reference).
- Does not pre-select which proposals should be implemented — that is a human decision.
- Does not claim the existing protocol is broken beyond repair. It identifies structural weaknesses and offers architectural corrections consistent with the protocol's own stated principles.
- Does not solve the founding problem. Proposal 5 makes it smaller and more tractable; it does not dissolve it.

**End of proposals document.**
