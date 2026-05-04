# Parameter Calibration Register

This register tracks high-risk parameters whose numbers matter enough that they should not remain "because the document says so."

It complements `/founding/commitments.md` and `architecture/parameter_registry.md`. Those files bind values. This file records why values are plausible, how they should be tested, and what evidence would force revision.

---

## Row Standard

Every high-risk parameter should eventually have:

| Field | Meaning |
|---|---|
| Parameter | FC identifier or named constitutional threshold. |
| Current value | Bound, provisional, reserved, or proposed value. |
| Tier | Tier 1, Tier 2, Tier 3, or pre-launch blocking gate. |
| Why this value exists | Plain-language rationale, not just cross-reference. |
| Capture route | How a bad actor benefits from this value being too high, too low, vague, or stale. |
| Evidence needed | Simulation, pilot, audit, legal review, or outside source needed. |
| Revision trigger | What result forces review. |
| Governing docs | Where the value is bound and where consequences appear. |

---

## Seed Register

| Parameter | Current value | Tier | Why this value exists | Capture route | Evidence needed | Revision trigger | Governing docs |
|---|---:|---|---|---|---|---|---|
| FC-010 leakage thresholds | 3% routine target; 7% systemic review | Tier 1 / active-unproven | Converts shadow-convertibility enforcement capacity into published thresholds. | Too high normalizes broker markets; too low justifies surveillance. | Proxy-market red team; enforcement-capacity audit. | Broker profitability remains positive or ordinary households face overbroad enforcement. | Annex AB; Threat Register T-001. |
| FC-020 Protected Pause floor | 0.30 Voice | Tier 1 | Prevents hardship from erasing civic continuity. | Too high preserves incumbents; too low punishes illness and care. | Hardship-pause abuse test. | Pause rings preserve roles or genuine hardship users avoid protection. | Annex AF; Service Record Misuse Evidence Test Package. |
| FC-030 oracle N_MIN | 5 nodes | Tier 1 | Prevents single-source measurement control. | Too low enables capture; too high causes paralysis. | Capacity measurement and oracle-failure drill. | Quorum failure blocks response or correlated error persists. | Annex AL; Capacity Measurement Evidence Test Package. |
| FC-031 methodology classes | 3 classes | Tier 1 | Reduces shared epistemic failure. | Standards bodies define all classes in their own image. | Methodology-class audit. | Method classes share data, funding, model supply chain, or standards body. | Annex AL; T-020/T-021. |
| FC-032 pairwise correlation max | 0.30 Pearson | Tier 1 | Makes formal independence testable. | Actors tune reporting to pass correlation while sharing assumptions. | Forecast-vs-actual and oracle independence audit. | Shared error exceeds threshold during stress. | Annex AL; T-020. |
| FC-033 adversarial oracle seats | 1 per cohort | Tier 1 | Forces hostile-method review inside measurement. | Seat becomes symbolic or captured by same professional network. | Adversarial-seat independence review. | Dissent never changes outcomes or is not resourced. | Annex AL; T-020/T-021. |
| FC-040 penalty base multiplier | 5.0x | Tier 1 / active-unproven | Makes detected conversion expected-value negative. | Too low invites arbitrage; too high punishes edge cases harshly. | Annual deterrence audit. | Violations remain profitable or appeals show disproportionate harm. | Annex AJ; T-001/T-007. |
| FC-041 detection assumption | 0.85 | Tier 1 / active-unproven | Supplies expected-value calculation for penalties. | Overstated detection hides under-enforcement. | Detection-rate audit. | Actual detection probability materially lower than assumed. | Annex AJ; Enforcement Panel audit. |
| FC-052 idle threshold days | Reserved; simulation uses 30 days provisionally | Tier 2 / pre-launch gate | Determines when Flow becomes idle enough for demurrage. | Too short punishes ordinary liquidity; too long lets hoarding persist. | Household and business liquidity model. | Ordinary users bear disproportionate demurrage or concentrated balances avoid circulation. | SPECIFICATIONS; Demurrage Evidence Package. |
| FC-053 retirement epsilon | Reserved | Tier 2 / pre-launch gate | Defines when tiny Flow remainders retire from circulation. | Too high confiscates small users; too low creates accounting noise. | Payment-rail and wallet simulation. | Small balances disappear materially or system accumulates dust. | SPECIFICATIONS. |
| FC-054 PFCR routing share | Reserved | Tier 2 / pre-launch gate | Splits demurrage charge between public finance and permanent retirement. | Too much PFCR creates fiscal dependency; too much retirement weakens public rail funding. | Public-rail revenue model and household burden model. | PFCR becomes dependent on punitive balances or cannot fund baseline rails. | Article V; SPECIFICATIONS. |
| FC-055 issuance ceiling function | Reserved | Tier 1 / pre-launch gate | Links Flow supply to verified productive commitments. | Too loose inflates claims; too tight starves production. | Flow issuance simulation and productive-commitment audit. | Circulation detaches from real production or needed projects cannot clear. | Article V; SPECIFICATIONS. |
| FC-058 CSM basket/regional adjustment | Reserved | Tier 1 / regional launch gate | Prevents one abstract basket from ignoring local climate, food, medicine, and shelter needs. | Under-adjustment harms high-need regions; over-adjustment invites political inflation. | Regional CSM pilot and capacity review. | Regional needs are mismeasured or adjustment becomes patronage. | Article III; Annex Y; SPECIFICATIONS. |
| FC-060 Voice sector ceiling | 0.20 | Tier 1 | Prevents one sector dominating civic weighting. | Sector labels are split or merged to hide concentration. | Capture Dashboard Specification. | Sector concentration remains high through reclassification. | Article VI; Annex AC. |
| FC-061 per-person cap | See commitments | Tier 1 | Prevents extreme individual civic weight. | Cap can still permit coordinated class control. | Civic-pool concentration review. | Repeat-role networks dominate despite compliance. | Article VI; Annex Z. |
| FC-062 Service Record decay | See commitments | Tier 1 | Keeps standing tied to recent service. | Slow decay preserves old class; fast decay erases real long-term service. | Service Record misuse and hardship-pause tests. | Role pools become stale or participation becomes burnout. | Annex Z; Annex AF. |
| FC-070 reserve window | 45 days x CSM x population | Tier 1 | Gives survival floor time during supply shock. | Under-reserve creates rationing; over-reserve creates hoarding bureaucracy. | Capacity stress test by essential category. | Reserves fail before recovery window or drain ordinary supply. | Annex Y; Article III. |
| FC-071 CSM cluster failure threshold | 3 per 10,000 residents per 30 days | Tier 1 | Detects survival-floor delivery failure. | Too high hides local harm; too low causes noisy emergency churn. | Delivery pilot and small-cell privacy review. | Cluster failures undercount vulnerable groups. | Annex Y; Article VII. |
| FC-072 Shared Storehouse activation threshold rule | Reserved by category | Tier 1 / activation gate | Prevents emergency rationing from activating on vague scarcity claims. | Too loose normalizes rationing; too strict delays needed protection. | Scarcity activation and unwind drill by essential category. | Shared Storehouse activates without real scarcity or fails during shortage. | Article III; Annex AQ; SPECIFICATIONS. |
| FC-080 attestation stake ratio | See commitments | Tier 1 | Makes false high-impact attestations costly. | Rich actors buy credibility; poor attestors withdraw. | Attestation market test. | False claims persist or isolated people lose recognition. | Annex AS; Service Record package. |
| FC-081 audit window | See commitments | Tier 1 | Keeps attestations reviewable long enough to catch false claims. | Too short invites delayed fraud; too long chills honest help. | Attestation/collusion pilot. | Disconfirmations arrive after window or honest attestation drops. | Annex AS. |
| FC-082 graph density threshold | See commitments | Tier 1 | Protects close-knit communities from automatic collusion penalties. | Rings hide as community density. | Dense-community safe-harbor test. | Mutual-aid networks or fraud rings are misclassified. | Annex AS. |
| FC-090 Ombuds sub-count | 5 nodes | Tier 1 | Distributes audit authority. | Five offices can still coordinate informally. | Capture Dashboard Specification. | Voting-pattern and staffing overlap exceed threshold. | Annex AI. |
| FC-091 Ombuds supermajority | 4 of 5 | Tier 1 | Prevents one sub-node from ruling alone. | Minority can block needed correction; majority can coordinate. | Ombuds deadlock and collusion drill. | Repeated 3-2 deadlocks or rubber-stamp 5-0 patterns. | Annex AI. |
| FC-100 quorum-loss restoration | 14 days | Tier 1 | Limits emergency hold under oracle loss. | Too long normalizes emergency; too short forces unsafe unwind. | Shared Storehouse oracle blackout drill. | Restoration misses reality or holds persist after recovery. | Annex AQ. |
| FC-110 Tier 1 signatures | 7 of 9 | Tier 1 recursive | Blocks small-coalition amendment of core rules. | Three holders can block; seven can be captured socially. | Keyholder custody and capture review. | Holder concentration or coercion makes threshold easier than assumed. | Amendment Protocol. |
| FC-111 Tier 1 timelock | 180 days | Tier 1 recursive | Creates public response and exit window. | Delay can be waited out or used for paralysis. | Timelock response drill. | Affected communities cannot understand, challenge, or exit in time. | Amendment Protocol; Drift Chain. |
| FC-120 exit threshold | 2/3 resident personhood | Tier 1 | Prevents small faction exit capture. | Too high traps dissenters; too low enables hostile breakaway. | Exit rehearsal and participation-barrier audit. | Exit is formal but practically unavailable. | Founding Order. |
| FC-121 exit unwind | 730 days | Tier 1 | Preserves Essential Access during exit. | Too long becomes exit denial; too short harms dependents. | Exit transition simulation. | Essential services fail or exit becomes punitive. | Founding Order. |
| FC-140 identity fraud target | <=0.5% provisional | Pre-launch gate | Sets starting fraud tolerance. | Over-tightening excludes vulnerable people. | Identity and Recovery Evidence Test Package. | Exclusion rises or fraud drains essential access. | Annex AK. |
| FC-160-184 contract parameters | Reserved / proposed | Pre-launch gate | Demurrage and escrow controls need calibration. | Loose terms recreate hoarding; tight terms block infrastructure. | Demurrage Evidence and Test Package. | Escrows become exemption markets or project finance stalls. | Annex AR. |
| FC-185-193 external trade and strategic floor parameters | Reserved / draft anchors | Tier 1 / Tier 2 mixed | Strategic reserves and external-capital gates decide whether outside dependency can threaten the survival floor. | Too loose creates foreign-capital or supplier capture; too strict blocks useful trade. | External trade stress test, supplier concentration audit, reserve adequacy review. | Strategic categories fall below floor or capital controls become arbitrary. | Annex AT. |

---

## Maintenance Rule

No parameter should move from provisional to bound without a row here, an evidence path, and a revision trigger. No parameter should stay bound after evidence shows it is causing the collapse state it was meant to prevent.
