# Founding Commitments — Numerical Lock File

**Status:** Tier 1 / Tier 2 mixed (per row). Published as single authoritative source.
**Purpose:** Every founding parameter referenced across the Humane Constitution, White Paper, Threat Register, Patch Log, and annexes is either bound to a value here or assigned a reserved FC identifier here until the activation gate that binds it.
**Amendment:** Tier 1 commitments require H-3 refounding authority. Tier 2 commitments follow the ordinary amendment ladder with public redlines. Tier 3 commitments follow ordinary reasonableness review.

---

## Commitment Table

| ID | Name | Tier | Value | Unit | Rationale | Affected docs |
|:---|:---|:---:|:---|:---|:---|:---|
| **FC-001** | `ACCEPTABLE_MEASUREMENT_ERROR_FOOD` | 1 | ±5% | confidence interval | Below this, capacity-based Essential Access issuance risks physical shortfall; above this, over-issuance risk dominates | Article III, Annex AL |
| **FC-002** | `ACCEPTABLE_MEASUREMENT_ERROR_WATER` | 1 | ±3% | confidence interval | Water buffers are thinner than food; tighter error bound required | Article III, Annex AL |
| **FC-003** | `ACCEPTABLE_MEASUREMENT_ERROR_SHELTER` | 2 | ±10% | confidence interval | Shelter capacity is structurally slower-moving; wider bound acceptable | Article III, Annex AL |
| **FC-004** | `ACCEPTABLE_MEASUREMENT_ERROR_ENERGY` | 1 | ±5% | confidence interval | Energy shortfall cascades to other categories; same bound as food | Article III, Annex AL |
| **FC-005** | `ACCEPTABLE_MEASUREMENT_ERROR_MEDICINE` | 1 | ±5% | confidence interval (supply days) | Medicine shortfall is non-substitutable; error bound tight | Article III, Annex AL, Annex Y |
| **FC-010** | `ACCEPTABLE_LEAKAGE_THRESHOLD` | 2 | 3% / annum (routine); 7% / annum (systemic review trigger) | fraction of Essential Access allocations informally converted | T-001 P-001 requires an operational target; 3% is measurable and enforceable; 7% triggers systemic-architecture review | Annex AB2, Annex AJ, Threat Register T-001 |
| **FC-020** | `PROTECTED_PAUSE_FLOOR` | 1 | 0.30 | Voice units | Sim Test 7 showed range (0.13, 0.67) required; 0.30 is mid-range providing protection without creating pause-as-exploit | Article VI, Patch P-009 |
| **FC-030** | `ORACLE_N_MIN` | 1 | 5 | oracle nodes per cohort | BFT floor for f=1 Byzantine nodes; PRD-003 requirement | Article III, Annex AL, SPECIFICATIONS.md |
| **FC-031** | `METHODOLOGY_CLASS_MIN` | 1 | 3 | distinct methodology classes per cohort | Finding 7 requirement for structural diversity | Annex AL, Patch P-017 |
| **FC-032** | `ORACLE_PAIRWISE_CORRELATION_MAX` | 1 | 0.30 | correlation coefficient (Pearson, on historical error series) | Pairs above this threshold are not structurally independent regardless of formal classification | Annex AL |
| **FC-033** | `ORACLE_ADVERSARIAL_SEATS_MIN` | 1 | 1 | per cohort | P-014 adversarial-panel analogue; structural requirement | Annex AL, Annex AI |
| **FC-040** | `BRIBE_DETERRENCE_MULTIPLIER` | 2 | 5.0 | multiple of detected gain | At ≥85% detection, penalty = 5× gain produces expected value ≥ 4.25× gain — decisively deterrent | Annex AJ, Patch P-001 |
| **FC-041** | `DETECTION_PROBABILITY_ASSUMED` | 2 | 0.85 | probability | Assumed detection rate for deterrence calculation; subject to pilot verification | Annex AJ |
| **FC-050** | `FLOW_DEMURRAGE_RATE` | 2 | 0.5% / month | idle balance above exemption | Option B baseline; committed as single value rather than 0.25%–1.00% corridor to eliminate drift surface | Article V, `docs/SPECIFICATIONS.md` |
| **FC-051** | `FLOW_DEMURRAGE_REVIEW_CORRIDOR` | 3 | ±0.25%/mo around FC-050 | post-first-year adjustment band | Allows calibration without re-opening Tier 2 amendment; max rate 0.75%/mo, min 0.25%/mo | Article V, `docs/SPECIFICATIONS.md` |
| **FC-052** | `FLOW_IDLE_THRESHOLD_DAYS` | 2 | RESERVED — bind before Flow launch | days | Idle-balance dwell time before demurrage begins; simulation currently uses 30 days as a provisional test value only | Article V, `docs/SPECIFICATIONS.md` |
| **FC-053** | `FLOW_RETIREMENT_EPSILON` | 2 | RESERVED — bind before Flow launch | Flow | Minimum residual Flow balance below which balances retire from circulation | Article V, `docs/SPECIFICATIONS.md` |
| **FC-054** | `PFCR_DEMURRAGE_ROUTING_SHARE` | 2 | RESERVED — bind before PFCR fiscal launch | fraction of demurrage charge | Published split between PFCR receipts and permanent retirement on demurrage application | Article V, `docs/SPECIFICATIONS.md` |
| **FC-055** | `FLOW_ISSUANCE_CEILING_FUNCTION` | 1 | RESERVED — bind before public issuance beyond pilot | formula | Binds the multiplier function relating verified productive commitments to maximum Flow in circulation | Article V, `docs/SPECIFICATIONS.md` |
| **FC-056** | `ESSENTIAL_ACCESS_ENHANCED_ALLOCATION_RULE` | 2 | RESERVED — bind before enhanced-allocation activation | rule / multiplier | Defines the lawful path above the CSM floor for hardship, emergency, or exceptional basket access | Article III, `docs/SPECIFICATIONS.md` |
| **FC-057** | `ESSENTIAL_ACCESS_VALIDITY_WINDOW_HOURS` | 2 | 72 | hours | Locks the initial Essential Access expiry window to the current constitutional baseline | Article III, `docs/SPECIFICATIONS.md` |
| **FC-058** | `CSM_BASKET_AND_REGIONAL_ADJUSTMENT_RULE` | 1 | RESERVED — bind before regional launch | basket definition + adjustment formula | Constitutional Survival Minimum must publish its basket composition and regional-variation rule before activation across heterogeneous localities | Article III, `docs/SPECIFICATIONS.md`, Annex Y |
| **FC-060** | `VOICE_SECTOR_CEILING` | 1 | 0.20 | fraction of total Voice | Sim Test 4: 3-sector coalition at 25% ceiling achieves 75% supermajority; 20% ceiling caps 3-sector to 60%, below supermajority threshold | Article VI, Patch P-008 |
| **FC-061** | `VOICE_CAP_PER_PERSON_PER_CYCLE` | 2 | 300 | raw Voice units | Preserves existing Humane Constitution §VIII baseline | Article VI |
| **FC-062** | `VOICE_DECAY_RATE` | 2 | 0.15 / day | exponential decay | Existing `model_outline.py` parameter, preserved | Article VI |
| **FC-063** | `SERVICE_RECORD_DECAY_RATE_NORMAL` | 2 | RESERVED — bind before Service Record activation | fraction per day | Normal slow-decay rate for Service Record outside Protected Pause or grace-period exceptions | Article VI, `docs/SPECIFICATIONS.md` |
| **FC-070** | `RESERVE_WINDOW_DAYS` | 1 | 45 | days of supply × population at CSM level | Resilience reserves (Article III) sized for CSM × population × 45 days. Exceeds L3 Emergency trigger by 6× to prevent reserve-exhaustion cascade | Article III, Annex Y |
| **FC-071** | `ACCEPTABLE_CSM_FAILURE_THRESHOLD` | 1 | 3 failures per 10,000 residents per 30 days | cluster rate | Above this, cluster enters Scarcity L3 regardless of oracle status | Annex Y §Y4 |
| **FC-072** | `SHARED_STOREHOUSE_SCARCITY_ACTIVATION_THRESHOLD_RULE` | 1 | RESERVED — bind by category before Shared Storehouse activation | category threshold rule | Shared Storehouse may not activate on vague scarcity claims; each essential category must publish its activation threshold rule before emergency overlay becomes operative | Article III, `docs/SPECIFICATIONS.md`, Annex Y |
| **FC-080** | `ATTESTATION_STAKE_RATIO` | 2 | 0.20 | fraction of attestor's own Voice and Service Record, proportional to claim size | Attestor risks 20% of their civic balance when attesting; calibrated for meaningful skin-in-the-game without destroying livelihoods on single errors | Article VI, Proposal 9 files |
| **FC-081** | `ATTESTATION_AUDIT_WINDOW` | 2 | 365 | days | Attestation slashing window after false-claim finding; 1 year matches civic-cycle duration | Article VI |
| **FC-082** | `ATTESTATION_GRAPH_DENSITY_THRESHOLD` | 2 | 0.40 | mutual cross-attestation ratio | Attestor networks above this density triggers automatic review; calibrated against null-model random-graph baseline | Article VI |
| **FC-083** | `ATTESTATION_REPUTATION_CREDIT_CAP` | 2 | 2 | civic cycles of successful attestation reputation credit | Caps attestation-derived reputation so reliable attestors become legible civic resources without creating a new status-currency surface | Article VI, Annex AS |
| **FC-090** | `OMBUDS_SUBCOUNT_MIN` | 1 | 5 | sub-Ombuds nodes | Federated Ombuds (Proposal 8) structural minimum; BFT-equivalent for institutional decisions | Annex AI |
| **FC-091** | `OMBUDS_SUPERMAJORITY_THRESHOLD` | 1 | 4/5 | affirmative sub-Ombuds | Protocol-level decisions require ≥4 of 5 sub-Ombuds affirmative | Annex AI |
| **FC-092** | `OMBUDS_TERM_DAYS` | 2 | 730 | days (2 years) | Sub-Ombuds term length; staggered across 5 seats | Annex AI |
| **FC-100** | `ORACLE_QUORUM_LOSS_RESTORATION_WINDOW` | 1 | 14 | days of verification after quorum restoration | Proposal 6 crisis fallback — prevents flash-recovery from being exploited as normalization pathway | Article III fallback files |
| **FC-110** | `TIER1_AMENDMENT_SIGNATURES_MIN` | 1 | 7 of 9 | cryptographic signatures from dispersed key-holders | M-of-N threshold for Tier 1 amendment per Proposal 1; 9 geographically distributed holders; 7 required; allows 2 captured/lost without breakage | `/architecture/amendment_protocol.md` |
| **FC-111** | `TIER1_AMENDMENT_TIMELOCK_DAYS` | 1 | 180 | days | Minimum wall-clock delay between proposal and effect; survives political cycles | `/architecture/amendment_protocol.md` |
| **FC-120** | `EXIT_SUPERMAJORITY_THRESHOLD` | 1 | 2/3 | fraction of resident personhood | Required to initiate jurisdictional exit under the Founding Order; prevents transient pluralities from triggering structural discontinuity | `/founding/order/exit_protocol.md` |
| **FC-121** | `EXIT_UNWIND_DAYS` | 1 | 730 | days (2 years) | Graceful-exit unwind window; Essential Access continuity preserved for individuals during unwind | `/founding/order/exit_protocol.md` |
| **FC-122** | `SUBSIDIARITY_SCALES` | 1 | household / neighborhood (≤500) / locality (≤5,000) / region (≤500,000) / federation | personhood counts | Scale-tier definitions for subsidiarity routing | `/founding/order/jurisdictional_scales.md` |
| **FC-140** | `AED_ESSENTIAL_ACCESS_FRAUD_BAND` | 2 | RESERVED — bind target / upper bound / trigger before first scale-up gate | quarterly fraud tuple | Essential Access identity fraud consumes physical survival supply directly; its target, upper tolerance, and audit trigger must be public before scale-up | Annex AK |
| **FC-141** | `AED_VOICE_FRAUD_BAND` | 2 | RESERVED — bind target / upper bound / trigger before first scale-up gate | quarterly fraud tuple | Voice fraud distorts agenda-setting and must publish its tolerated error band before activation | Annex AK |
| **FC-142** | `AED_SERVICE_RECORD_FRAUD_BAND` | 2 | RESERVED — bind target / upper bound / trigger before first scale-up gate | quarterly fraud tuple | Service Record fraud distorts eligibility and role selection; requires a published tolerated-error band | Annex AK |
| **FC-143** | `AED_EXCLUSION_BAND_DISPLACED` | 2 | RESERVED — bind target / upper bound / trigger before first scale-up gate | quarterly exclusion tuple | Displaced persons are a first-order identity-access vulnerability class and require explicit exclusion commitments | Annex AK |
| **FC-144** | `AED_EXCLUSION_BAND_UNDOCUMENTED` | 2 | RESERVED — bind target / upper bound / trigger before first scale-up gate | quarterly exclusion tuple | Undocumented persons are a first-order identity-access vulnerability class and require explicit exclusion commitments | Annex AK |
| **FC-145** | `AED_EXCLUSION_BAND_DIGITALLY_FRAGILE` | 2 | RESERVED — bind target / upper bound / trigger before first scale-up gate | quarterly exclusion tuple | Digitally fragile persons require a separately published exclusion band so access failures are not hidden in aggregate success rates | Annex AK |
| **FC-146** | `AED_EXCLUSION_BAND_RECOVERY_CRISIS` | 2 | RESERVED — bind target / upper bound / trigger before first scale-up gate | quarterly exclusion tuple | Crisis and recovery cases are structurally easy to exclude and require their own exclusion commitments | Annex AK |
| **FC-147** | `AED_EXCLUSION_BAND_OVERALL_POPULATION` | 2 | RESERVED — bind target / upper bound / trigger before first scale-up gate | quarterly exclusion tuple | Aggregate exclusion remains a governing signal even when vulnerable-population bands are tracked separately | Annex AK |
| **FC-148** | `AED_EXCLUSION_PRIORITY_MULTIPLIER` | 2 | RESERVED — bind before first scale-up gate | multiple of exclusion target | Governs when exclusion reduction takes priority over further fraud tightening in the AED trade-off rule | Annex AK |
| **FC-149** | `AED_FRAUD_PRIORITY_BOUND` | 2 | RESERVED — bind before first scale-up gate | fraud upper-bound reference | Governs when fraud reduction takes priority over further inclusion loosening in the AED trade-off rule | Annex AK |
| **FC-150** | `AED_SIMULTANEOUS_BREACH_DEFAULT_PREFERENCE` | 2 | RESERVED — bind before first scale-up gate | exclusion-first / fraud-first | Publicly locks the default preference when both fraud and exclusion exceed their upper bounds simultaneously | Annex AK |
| **FC-160** | `CC_STANDARD_RELEASE_MAX` | 2 | RESERVED — bind before escrow launch | Flow | Upper bound for single-verifier milestone releases in contract-commitment architecture | Annex AR |
| **FC-161** | `CC_ENHANCED_RELEASE_MAX` | 2 | RESERVED — bind before escrow launch | Flow | Upper bound for dual-verifier milestone releases; releases above this threshold enter Major tier | Annex AR |
| **FC-162** | `CC_MAJOR_RELEASE_PERCENT_FLOOR` | 2 | RESERVED — bind before escrow launch | fraction of total project value | Anti-fragmentation rule that forces Major-tier verification above a published share of project value regardless of absolute Flow amount | Annex AR |
| **FC-163** | `CC_ESSENTIAL_ACCESS_DEPLOYMENT_WINDOW` | 2 | RESERVED — bind before escrow launch | days | Maximum idle escrow hold for Essential Access delivery programmes before CRP review triggers | Annex AR |
| **FC-164** | `CC_STANDARD_DEPLOYMENT_WINDOW` | 2 | RESERVED — bind before escrow launch | days | Maximum idle escrow hold for standard infrastructure before CRP review triggers | Annex AR |
| **FC-165** | `CC_LARGE_PROJECT_VALUE_THRESHOLD` | 2 | RESERVED — bind before escrow launch | Flow contracted value | Published breakpoint above which projects count as large-scale or novel for deployment-window purposes | Annex AR |
| **FC-166** | `CC_LARGE_SCALE_DEPLOYMENT_WINDOW` | 2 | RESERVED — bind before escrow launch | days | Maximum idle escrow hold for large-scale or first-of-type infrastructure before CRP review triggers | Annex AR |
| **FC-167** | `CC_CRP_EXPLANATION_DEADLINE` | 2 | RESERVED — bind before escrow launch | days after trigger | Deadline for commissioning authorities to explain deployment-window overruns to CRP | Annex AR |
| **FC-168** | `CC_CRP_DECISION_DEADLINE` | 2 | RESERVED — bind before escrow launch | days after trigger | Deadline for CRP to issue extension / support / escalation decisions on deployment-window review | Annex AR |
| **FC-169** | `CC_CRP_EXTENSION_WINDOW` | 2 | RESERVED — bind before escrow launch | days | Additional time granted when CRP confirms legitimate procurement complexity | Annex AR |
| **FC-170** | `CC_CRP_PUBLICATION_DEADLINE` | 2 | RESERVED — bind before escrow launch | days after decision | Deadline for publishing CRP deployment-window review outcomes | Annex AR |
| **FC-171** | `CC_FORCE_MAJEURE_SELF_CERT_DAYS` | 2 | RESERVED — bind before escrow launch | cumulative days per project | Maximum freeze duration available on contractor self-certification before higher verification tiers apply | Annex AR |
| **FC-172** | `CC_FORCE_MAJEURE_THIRD_PARTY_DAYS` | 2 | RESERVED — bind before escrow launch | cumulative days per project | Maximum freeze duration available on third-party certification before panel review applies | Annex AR |
| **FC-173** | `CC_FORCE_MAJEURE_PANEL_DAYS` | 2 | RESERVED — bind before escrow launch | cumulative days per project | Hard cap for force-majeure freeze duration before restructuring review replaces further freeze eligibility | Annex AR |
| **FC-174** | `CC_ESSENTIAL_ACCESS_FORCE_MAJEURE_DURATION_CAP` | 2 | RESERVED — bind before escrow launch | fraction of contracted project duration | Prevents short Essential Access delivery projects from using an absolute freeze cap that functionally nullifies demurrage | Annex AR |
| **FC-175** | `CC_INSPECTOR_POOL_MIN_PILOT` | 2 | RESERVED — bind before escrow launch | qualified inspectors | Minimum inspector pool size for pilot / single-municipality deployment | Annex AR |
| **FC-176** | `CC_INSPECTOR_POOL_MIN_REGIONAL` | 2 | RESERVED — bind before escrow launch | qualified inspectors | Minimum inspector pool size for regional deployment | Annex AR |
| **FC-177** | `CC_INSPECTOR_POOL_MIN_NATIONAL_PER_REGION` | 2 | RESERVED — bind before escrow launch | qualified inspectors per region | Minimum inspector pool size for national / multi-regional deployment | Annex AR |
| **FC-178** | `CC_STANDARD_ROTATION_MAX_CONSECUTIVE` | 2 | RESERVED — bind before escrow launch | consecutive milestones | Maximum repeated assignments of the same inspector on Standard-tier releases | Annex AR |
| **FC-179** | `CC_STANDARD_ROTATION_COOLING_DAYS` | 2 | RESERVED — bind before escrow launch | days | Cooling-off interval before an inspector may return to the same project at Standard tier | Annex AR |
| **FC-180** | `CC_ENHANCED_ROTATION_MAX_CONSECUTIVE` | 2 | RESERVED — bind before escrow launch | consecutive milestones | Maximum repeated assignments of the same inspector on Enhanced-tier releases | Annex AR |
| **FC-181** | `CC_ENHANCED_ROTATION_COOLING_DAYS` | 2 | RESERVED — bind before escrow launch | days | Cooling-off interval before an inspector may return to the same project at Enhanced tier | Annex AR |
| **FC-182** | `CC_MAJOR_ROTATION_MAX_CONSECUTIVE` | 2 | RESERVED — bind before escrow launch | consecutive milestones | Maximum repeated assignments of the same inspector on Major-tier releases | Annex AR |
| **FC-183** | `CC_MAJOR_ROTATION_COOLING_DAYS` | 2 | RESERVED — bind before escrow launch | days | Cooling-off interval before an inspector may return to the same project at Major tier | Annex AR |
| **FC-184** | `CC_SINGLE_SECTOR_BACKGROUND_CAP` | 2 | RESERVED — bind before escrow launch | fraction of active pool | Caps prior-employment concentration from any single sector inside the active inspector pool | Annex AR |

---

## Derivation Notes

**FC-020 (`PROTECTED_PAUSE_FLOOR = 0.30`).** Sim Test 7 in `docs/ADVERSARIAL_AUDIT.md` established:
- Caregiver-at-2%-contribution Voice equilibrium = 0.13 units.
- Standard-at-10%-contribution Voice equilibrium = 0.67 units.
- Protected Pause at 20% decay dampening = 4.44 units (exploitable if set there).

Floor value must satisfy: above the exposed-caregiver equilibrium (0.13) to provide real voice; below the standard-contributor equilibrium (0.67) to prevent pause-as-exploit. **0.30** sits ≈33% of the way up this band — meaningful protection without civic premium for pausing.

**FC-060 (`VOICE_SECTOR_CEILING = 0.20`).** From Sim Test 4: for N=5 sectors with ceiling c, supermajority (≥2/3) is achievable via k-sector coalition when k·c ≥ 2/3. Setting c = 0.20, maximum 3-sector coalition = 0.60 < 0.667 — no 3-sector supermajority possible. Preserves margin against measurement imprecision.

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
| 1.0 | 2026-04-18 | Initial publication of the founding numerical lock file | Founding release |

**End of Founding Commitments.**
