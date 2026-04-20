# Founding Commitments — Numerical Lock File

**Status:** Tier 1 / Tier 2 mixed (per row). Published as single authoritative source.
**Purpose:** Closes Proposal 4 of `Protocol_Optimization_Proposals.md`. Every `[FOUNDING COMMITMENT]` placeholder across Master Protocol, White Paper, Threat Register, Patch Log, and Annexes resolves to a value in this file.
**Amendment:** Tier 1 commitments require H-3 refounding authority. Tier 2 commitments follow the ordinary amendment ladder with public redlines. Tier 3 commitments follow ordinary reasonableness review.

**Naming note:** The live constitutional presentation uses **one Founding Order** and **Articles I-VII**. The "Affected docs" column may still use legacy pillar or `P0` shorthand for traceability.

---

## Commitment Table

| ID | Name | Tier | Value | Unit | Rationale | Affected docs |
|:---|:---|:---:|:---|:---|:---|:---|
| **FC-001** | `ACCEPTABLE_MEASUREMENT_ERROR_FOOD` | 1 | ±5% | confidence interval | Below this, capacity-based LC issuance risks physical shortfall; above this, over-issuance risk dominates | Pillar 3, Annex AL |
| **FC-002** | `ACCEPTABLE_MEASUREMENT_ERROR_WATER` | 1 | ±3% | confidence interval | Water buffers are thinner than food; tighter error bound required | Pillar 3, Annex AL |
| **FC-003** | `ACCEPTABLE_MEASUREMENT_ERROR_SHELTER` | 2 | ±10% | confidence interval | Shelter capacity is structurally slower-moving; wider bound acceptable | Pillar 3, Annex AL |
| **FC-004** | `ACCEPTABLE_MEASUREMENT_ERROR_ENERGY` | 1 | ±5% | confidence interval | Energy shortfall cascades to other categories; same bound as food | Pillar 3, Annex AL |
| **FC-005** | `ACCEPTABLE_MEASUREMENT_ERROR_MEDICINE` | 1 | ±5% | confidence interval (supply days) | Medicine shortfall is non-substitutable; error bound tight | Pillar 3, Annex AL, Annex Y |
| **FC-010** | `ACCEPTABLE_LEAKAGE_THRESHOLD` | 2 | 3% / annum (routine); 7% / annum (systemic review trigger) | fraction of LC allocations informally converted | T-001 P-001 requires an operational target; 3% is measurable and enforceable; 7% triggers systemic-architecture review | Annex AB2, Annex AJ, Threat Register T-001 |
| **FC-020** | `PROTECTED_PAUSE_FLOOR` | 1 | 0.30 | DW units | Sim Test 7 showed range (0.13, 0.67) required; 0.30 is mid-range providing protection without creating pause-as-exploit | Pillar 8, Patch P-009 |
| **FC-030** | `ORACLE_N_MIN` | 1 | 5 | oracle nodes per cohort | BFT floor for f=1 Byzantine nodes; PRD-003 requirement | Pillar 3, Annex AL, SPECIFICATIONS.md |
| **FC-031** | `METHODOLOGY_CLASS_MIN` | 1 | 3 | distinct methodology classes per cohort | Finding 7 requirement for structural diversity | Annex AL, Patch P-017 |
| **FC-032** | `ORACLE_PAIRWISE_CORRELATION_MAX` | 1 | 0.30 | correlation coefficient (Pearson, on historical error series) | Pairs above this threshold are not structurally independent regardless of formal classification | Annex AL |
| **FC-033** | `ORACLE_ADVERSARIAL_SEATS_MIN` | 1 | 1 | per cohort | P-014 adversarial-panel analogue; structural requirement | Annex AL, Annex AI |
| **FC-040** | `BRIBE_DETERRENCE_MULTIPLIER` | 2 | 5.0 | multiple of detected gain | At ≥85% detection, penalty = 5× gain produces expected value ≥ 4.25× gain — decisively deterrent | Annex AJ, Patch P-001 |
| **FC-041** | `DETECTION_PROBABILITY_ASSUMED` | 2 | 0.85 | probability | Assumed detection rate for deterrence calculation; subject to pilot verification | Annex AJ |
| **FC-050** | `EC_DEMURRAGE_RATE` | 2 | 0.5% / month | idle balance above exemption | Option B baseline; committed as single value rather than 0.25%–1.00% corridor to eliminate drift surface | Pillar 5, Master §II.1 |
| **FC-051** | `EC_DEMURRAGE_REVIEW_CORRIDOR` | 3 | ±0.25%/mo around FC-050 | post-first-year adjustment band | Allows calibration without re-opening Tier 2 amendment; max rate 0.75%/mo, min 0.25%/mo | Pillar 5 |
| **FC-060** | `DW_SECTOR_CEILING` | 1 | 0.20 | fraction of total DW | Sim Test 4: 3-sector coalition at 25% ceiling achieves 75% supermajority; 20% ceiling caps 3-sector to 60%, below supermajority threshold | Pillar 9, Patch P-008 |
| **FC-061** | `DW_CAP_PER_PERSON_PER_CYCLE` | 2 | 300 | raw DW units | Preserves existing Master §VIII baseline | Pillar 9 |
| **FC-062** | `DW_DECAY_RATE` | 2 | 0.15 / day | exponential decay | Existing `model_outline.py` parameter, preserved | Pillar 8, Pillar 9 |
| **FC-070** | `RESERVE_WINDOW_DAYS` | 1 | 45 | days of supply × population at CSM level | Resilience reserves (Pillar 12) sized for CSM × population × 45 days. Exceeds L3 Emergency trigger by 6× to prevent reserve-exhaustion cascade | Pillar 12, Annex Y |
| **FC-071** | `ACCEPTABLE_CSM_FAILURE_THRESHOLD` | 1 | 3 failures per 10,000 residents per 30 days | cluster rate | Above this, cluster enters Scarcity L3 regardless of oracle status | Annex Y §Y4 |
| **FC-080** | `ATTESTATION_STAKE_RATIO` | 2 | 0.20 | fraction of attestor's own DW/CR, proportional to claim size | Attestor risks 20% of their civic balance when attesting; calibrated for meaningful skin-in-the-game without destroying livelihoods on single errors | Pillar 8, Proposal 9 files |
| **FC-081** | `ATTESTATION_AUDIT_WINDOW` | 2 | 365 | days | Attestation slashing window after false-claim finding; 1 year matches civic-cycle duration | Pillar 8 |
| **FC-082** | `ATTESTATION_GRAPH_DENSITY_THRESHOLD` | 2 | 0.40 | mutual cross-attestation ratio | Attestor networks above this density triggers automatic review; calibrated against null-model random-graph baseline | Pillar 8 |
| **FC-090** | `OMBUDS_SUBCOUNT_MIN` | 1 | 5 | sub-Ombuds nodes | Federated Ombuds (Proposal 8) structural minimum; BFT-equivalent for institutional decisions | Annex AI |
| **FC-091** | `OMBUDS_SUPERMAJORITY_THRESHOLD` | 1 | 4/5 | affirmative sub-Ombuds | Protocol-level decisions require ≥4 of 5 sub-Ombuds affirmative | Annex AI |
| **FC-092** | `OMBUDS_TERM_DAYS` | 2 | 730 | days (2 years) | Sub-Ombuds term length; staggered across 5 seats | Annex AI |
| **FC-100** | `ORACLE_QUORUM_LOSS_RESTORATION_WINDOW` | 1 | 14 | days of verification after quorum restoration | Proposal 6 crisis fallback — prevents flash-recovery from being exploited as normalization pathway | Pillar 3 fallback files |
| **FC-110** | `TIER1_AMENDMENT_SIGNATURES_MIN` | 1 | 7 of 9 | cryptographic signatures from dispersed key-holders | M-of-N threshold for Tier 1 amendment per Proposal 1; 9 geographically distributed holders; 7 required; allows 2 captured/lost without breakage | `/architecture/amendment_protocol.md` |
| **FC-111** | `TIER1_AMENDMENT_TIMELOCK_DAYS` | 1 | 180 | days | Minimum wall-clock delay between proposal and effect; survives political cycles | `/architecture/amendment_protocol.md` |
| **FC-120** | `P0_EXIT_SUPERMAJORITY_THRESHOLD` | 1 | 2/3 | fraction of resident personhood | Required to initiate jurisdictional exit under P0 (Proposal 5); prevents transient-pluralities from triggering structural discontinuity | `/pillars/P0_subsidiarity/exit_protocol.md` |
| **FC-121** | `P0_EXIT_UNWIND_DAYS` | 1 | 730 | days (2 years) | Graceful-exit unwind window; LC continuity preserved for individuals during unwind | `/pillars/P0_subsidiarity/exit_protocol.md` |
| **FC-122** | `P0_SUBSIDIARITY_SCALES` | 1 | household / neighborhood (≤500) / locality (≤5,000) / region (≤500,000) / federation | personhood counts | Scale-tier definitions for subsidiarity routing | `/pillars/P0_subsidiarity/jurisdictional_scales.md` |

---

## Derivation Notes

**FC-020 (`PROTECTED_PAUSE_FLOOR = 0.30`).** Sim Test 7 in `docs/ADVERSARIAL_AUDIT.md` established:
- Caregiver-at-2%-contribution DW equilibrium = 0.13 units.
- Standard-at-10%-contribution DW equilibrium = 0.67 units.
- Protected Pause at 20% decay dampening = 4.44 units (exploitable if set there).

Floor value must satisfy: above the exposed-caregiver equilibrium (0.13) to provide real voice; below the standard-contributor equilibrium (0.67) to prevent pause-as-exploit. **0.30** sits ≈33% of the way up this band — meaningful protection without civic premium for pausing.

**FC-060 (`DW_SECTOR_CEILING = 0.20`).** From Sim Test 4: for N=5 sectors with ceiling c, supermajority (≥2/3) is achievable via k-sector coalition when k·c ≥ 2/3. Setting c = 0.20, maximum 3-sector coalition = 0.60 < 0.667 — no 3-sector supermajority possible. Preserves margin against measurement imprecision.

**FC-030 / FC-031 (Oracle parameters).** BFT theorem: n ≥ 3f+1 for tolerance of f faulty nodes. At f = 1: n ≥ 4. **FC-030 = 5** provides margin of one node above the floor, tolerates single-node loss without immediately dropping below BFT. FC-031 = 3 methodology classes guarantees diversity even when one class is simultaneously compromised.

**FC-040 (`BRIBE_DETERRENCE_MULTIPLIER = 5.0`).** Sim Test 5: at 85% detection, penalty = 0.18× gain is break-even. Setting penalty = 5× gain produces expected value = −(0.85 × 5 − 0.15 × 1) × gain = −4.1× gain. Margin of safety permits detection probability as low as 25% before deterrent fails.

**FC-110 / FC-111 (Tier 1 amendment parameters).** Distributed key-holder count of 9 balances resilience against loss (can lose 2 without breakage) versus capture resistance (must capture ≥3 to prevent amendment, ≥7 to force amendment). Timelock of 180 days ensures any captured supermajority survives at least one political cycle before amendment effect — enables reversal proposal by uncaptured parties.

---

## Hash Commitment

At founding, the SHA-256 hash of this file (computed with the canonical line-ending, UTF-8 encoding, and without trailing whitespace normalization) is committed to the ledger genesis block. Subsequent amendments produce new hash commitments with version-chained history per `/architecture/drift_chain.md`.

**Genesis commitment:** TBD at founding event. Computed by the founding coalition's multi-signature process.

---

## Amendment Log

| Version | Date | Change | Authority |
|:---|:---|:---|:---|
| 1.0 | 2026-04-18 | Initial publication closing Proposal 4 | Audit proposal |

**End of Founding Commitments.**
