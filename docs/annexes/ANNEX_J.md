# ANNEX J — Monetary Calibration, Long-Horizon Capital, and Instrument Discipline

> **Provenance:** Implements [P-031 — Anti-Dynasty Ownership] (§R2), [P-032 — Stewardship Ownership Standard] (§R1–R2), [P-033 — Worker-Owned and Mission-Locked Enterprise Preference] (§R1) · Status: **ACTIVE**
**Purpose.** This annex refines the monetary architecture where hidden economic failure would otherwise appear: demurrage theory, long-horizon investment, instrument naming discipline, and calibration rules. It does not alter the constitutional separation among Flow, Essential Access, Voice, Service Record, and Shared Storehouse; it clarifies how the system uses Flow without punishing productive build time or silently recreating rent-seeking.

**Design principle: punish idle extraction, not patient production.**

### J1. Why Flow uses demurrage at all
Demurrage exists to reduce passive hoarding, concentration, and rent-seeking based purely on waiting power. It is not designed to make ordinary planning impossible, to erase working capital, or to force enterprises into frantic short-termism.
- **Primary target:** reduce the advantage of sitting on liquid Flow purely to capture scarcity rents or political leverage.
- **Secondary target:** keep Flow circulating through production, payroll, maintenance, and trade rather than parking indefinitely in inactive balances.
- **Non-target:** long-horizon enterprise, public infrastructure, payroll reserves, warranty reserves, and other ring-fenced productive balances that are being held for a declared purpose under audit.
- **Calibration question:** what is the lowest idle-decay rate that weakens hoarding incentives without materially impairing legitimate planning horizons?

### J2. Default calibration corridor and operating-float exemption
The protocol therefore adopts a corridor rather than a sacred number.
- **Default demurrage rate:** 0.5% per month on idle Flow above a published operating-float exemption.
- **Permitted review corridor:** 0.25%-1.00% per month, adjusted only through published Tier 3 process and mandatory public evidence.
- **Household savings floor — the universal bucket:** every enrolled person receives an identical demurrage-free savings threshold equal to 18 months of the published regional median consumption expenditure. Below this threshold, Flow holds its value with no decay. Above it, the excess decays at the default demurrage rate. The threshold is the same for every person regardless of income, wealth, contribution level, or household composition — a person with 10M Flow and a person with 15,000 Flow each have the same protected bucket. Only the portion above the threshold decays. This is not a means-tested benefit; it is a universal floor on savings dignity, and it is published as a single number for each region.
- **Why 18 months:** 6 months covers a typical job search. An additional 12 months covers slow markets, caregiving transitions, retraining, disability onset, or any other life disruption that makes fast re-employment impossible. 18 months is the point at which savings are no longer emergency planning and start to function as passive wealth preservation — which is what demurrage is designed to address.
- **Operating-float exemption:** enterprises receive the greater of 3 months average payroll or 3 months average direct operating costs measured on a rolling 12-month basis. Balances above this threshold require either ordinary demurrage treatment or a protected-capital pathway. Enterprise float is separate from and does not reduce the household savings floor — an owner-operator receives both their personal household floor and the enterprise operating-float exemption.
- **Equivalence rule:** any asset or instrument above the household-safe-harbor threshold that functions primarily as a non-decaying store of value — including foreign currency, collectible portfolios, non-productive durable stockpiles, or equivalent wrappers — is subject to review for Flow-equivalent carrying-cost treatment regardless of legal form.
- **Concentrated balances** above published thresholds may face higher effective carrying cost through progressive idle-balance rules even when the headline demurrage rate stays unchanged.
- **Success signals:** lower inactive concentration, lower essential-goods speculation, healthy project starts, stable payroll timing, no material collapse in average project duration, and no evidence that ordinary emergency savings are being eroded by demurrage before the household floor is exceeded.

### J2-A. Worked examples — household savings floor at both extremes

*These examples use a published regional floor of 27,000 Flow (representing 18 months × 1,500 Flow median monthly consumption). The default demurrage rate is 0.5%/month on idle balances above the floor. All figures are illustrative; founding coalition must recalculate against the actual published floor and rate before deployment.*

---

**Person A — Modest savings, near or below the floor**

| Situation | Balance | Amount above floor | Monthly demurrage | Annual demurrage | What they feel |
| :--- | ---: | ---: | ---: | ---: | :--- |
| Emergency fund, 6 months saved | 9,000 Flow | 0 | 0 | 0 | Nothing. Savings hold full value. |
| Emergency fund, 18 months saved (at the floor) | 27,000 Flow | 0 | 0 | 0 | Nothing. Exactly at the ceiling of the protected bucket. |
| Slightly above floor — saved for a car or home repair | 30,000 Flow | 3,000 Flow | 15 Flow | 180 Flow | Small signal. 180 Flow/year on 30,000 held — less than 0.6% effective rate on the total balance. Noticeable but not punishing. |
| One year's wages saved after a windfall, no plan yet | 50,000 Flow | 23,000 Flow | 115 Flow | 1,380 Flow | Meaningful signal — 1,380 Flow/year on the above-floor portion. Strong incentive to either spend, invest in a project escrow, or deploy productively. Still affordable to ignore temporarily. |

**Key point:** a person who has saved responsibly up to 18 months of living expenses pays nothing. Demurrage only starts when savings cross into passive wealth territory — and even then, the first 27,000 Flow is always free.

---

**Person B — Concentrated wealth, well above the floor**

*Same 27,000 Flow floor. Same 0.5%/month rate. Same rules.*

| Situation | Balance | Amount above floor | Monthly demurrage | Annual demurrage | What they feel |
| :--- | ---: | ---: | ---: | ---: | :--- |
| 500,000 Flow sitting idle | 500,000 Flow | 473,000 Flow | 2,365 Flow | 28,380 Flow | Significant. ~5.7% of the above-floor balance lost per year. Strong incentive to deploy into project escrow or productive use. |
| 2,000,000 Flow sitting idle | 2,000,000 Flow | 1,973,000 Flow | 9,865 Flow | 118,380 Flow | Very large signal. ~118k Flow/year. At this scale, idle accumulation becomes expensive; productive deployment through J3 channels is almost always the rational choice. |
| 10,000,000 Flow sitting idle | 10,000,000 Flow | 9,973,000 Flow | 49,865 Flow | 598,380 Flow | ~6% of total balance per year. Passive hoarding at this scale is economically irrational. The same person deploying into a project escrow pays nothing on that capital while milestones are current. |

**Key point:** the wealthy person has the same 27,000 Flow free bucket as everyone else. The demurrage is on everything above it. At concentrated-wealth scales, the demurrage creates a strong signal to either use capital productively (protected) or circulate it through the economy. Sitting on it becomes expensive.

---

**Comparison: same balance, different person**

| Balance held | Person A (modest saver) | Person B (concentrated wealth) | Same rule applied? |
| :--- | :--- | :--- | :--- |
| 10,000 Flow | 0 demurrage (below floor) | 0 demurrage (below floor) | ✓ Identical |
| 27,000 Flow | 0 demurrage (at floor) | 0 demurrage (at floor) | ✓ Identical |
| 50,000 Flow | 115 Flow/month on 23k above floor | 115 Flow/month on 23k above floor | ✓ Identical |
| 500,000 Flow | 2,365 Flow/month | 2,365 Flow/month | ✓ Identical |

The rate is the same. The bucket is the same. The only difference is how much of a wealthy person's balance sits above the floor — and that is the intended difference.

---

**Owner-operator example — personal floor plus enterprise float**

A sole trader with 40,000 Flow total: 27,000 Flow personal savings floor + 13,000 Flow enterprise operating float (= 3 months of 4,333 Flow/month operating costs). Both exemptions apply simultaneously. Their effective demurrage-free threshold is 40,000 Flow — their entire balance. They pay nothing unless they accumulate beyond both.

### J3. Investment channel architecture (required, not optional)
Long-horizon enterprise is impossible if all held Flow is treated as idle. The investment channel is therefore a constitutional subsystem, not a discretionary afterthought.
- **Project Escrow Accounts:** milestone-based build accounts for facilities, tooling, R&D, housing construction, grid upgrades, and other long-horizon work. Funds in approved project escrows do not incur ordinary idle decay while milestones remain current.
- **Term Finance Pools:** transparent lending pools that price risk in Flow, publish loss rules, and cannot purchase Essential Access access, Voice influence, Service Record service eligibility, or housing queue priority.
- **Public Infrastructure Windows:** federation or regional project accounts for transit, water, energy, health, and digital infrastructure with independent milestone review and public dashboarding.
- **Maintenance and Warranty Reserves:** ring-fenced reserves for safety, replacement, and warranty obligations may receive tailored treatment when their use rules are published in advance.
- **Anti-abuse rule:** any escrow or reserve that is diverted, repeatedly stale, or materially off-milestone loses special treatment and reverts to ordinary idle-balance rules plus review for evasion.

### J4. Demurrage review protocol
- **Quarterly review inputs:** inactive-balance concentration, project abandonment rates, enterprise complaints, speculative inventory behavior, velocity by sector, and essential-price divergence.
- **No single metric is sufficient.** A rate change requires a public memo explaining why hoarding pressure or investment blockage is the dominant observed problem.
- **A rate increase** must include an adverse-case simulation showing expected impact on small firms, cooperatives, and long-horizon builders.
- **A rate decrease** must include an anti-capture assessment showing why lower carrying cost will not simply subsidize passive concentration.
- **All rate changes** sunset after four quarters unless re-ratified through ordinary review.

### J5. Instrument naming and public communication discipline
The system must not confuse the public by making unlike instruments look like interchangeable balances.
- **Legal vocabulary** remains technical: Flow, Essential Access, Voice, Service Record, and Shared Storehouse.
- **Public education** may use metaphors - Flow as current, Essential Access as a gauge, Voice as a pulse, Service Record as a ledger of service, Shared Storehouse as an emergency ration key - but the law and interfaces must never imply fungibility.
- **Wallets, dashboards, receipts, and reports** must visually separate money from rights, civic weight, and scarcity permissions.

---

## Merged Content from former Annex R — Protected Capital Classes and Motivation for Excellence

> **Provenance (2026-04-25):** Annex R was retired in the 2026-04-25 review and merged here. R1 + R2 (capital classes + treatment rules) live here permanently because they fit this annex's monetary-calibration scope. R3 (motivation, compensation, anti-extraction) was moved to Annex U §U10 in the 2026-04-25 follow-up.

### R1 — Protected capital classes

Demurrage is an anti-hoarding instrument, not a ban on patient capital. The following classes are recognized as protected and exempt from ordinary demurrage on the conditions specified in R2:

- **Operating Float** — ordinary working balances needed for payroll, inventory smoothing, and short-cycle enterprise continuity.
- **Project Escrow** — time-bound funds committed to build-outs, research stages, public infrastructure, or other milestone-audited projects.
- **Actuarial and Catastrophe Reserves** — insurance-like or disaster reserves held against low-probability, high-consequence events under published reserve logic.
- **Long-Horizon Research Windows** — protected balances for work whose milestones are multi-year and cannot be reduced to quarterly vanity checkpoints.
- **Cooperative Retained Earnings Pools** — retained capital for worker-owned or mission-locked enterprises building resilience without dependence on extractive outside ownership.
- **Infrastructure Lifecycle Funds** — ring-fenced balances for maintenance, replacement cycles, and long-lived public systems.

### R2 — Rules for protected capital treatment

- **Protected treatment is not automatic.** Each class requires registration, purpose declaration, review cadence, and misuse penalties.
- **Protected balances must remain ring-fenced** and may not be used to purchase civic power, survival access, or hidden convertibility privileges.
- **Protection expires** if funds drift from the declared purpose, fail review repeatedly without justified cause, or become a parking lot for speculative accumulation.
- **The more patient the capital class**, the stronger the transparency, audit, and conflict-disclosure requirements.
- **Perpetual dynastic wrappers are prohibited.** Trusts, entity chains, and similar legal structures may preserve continuity for dependents or mission-locked stewardship only within published limits; they may not preserve extractive control across generations.

---

## J-RED — Legal Wrapper Red Team Methodology

**Purpose.** The anti-dynasty and stewardship rules in this Annex are only as strong as the beneficial-ownership tracing and enforcement architecture behind them. This section specifies the red team scenarios that must be tested before the anti-rent claims can move from DESIGNED to evidence-backed.

### Wrapper type 1 — Dynasty trust with mission lock

**Mechanism:** A wealthy family establishes a mission-locked entity (e.g., a private foundation or perpetual trust claiming charitable purpose) that holds land, enterprise equity, or housing portfolios. The mission lock prevents the asset from being classified as personal dynasty wealth, but the family controls all appointments to the foundation's board.

**Red team test:** Trace beneficial ownership through 3 layers of foundation/trust structure. Verify that the count-through ownership rule in §R1 correctly identifies the natural persons with de facto control (board appointment power), not merely the named trustees.

**Pass criterion:** Beneficial ownership trace reaches natural persons within 3 layers in all test cases.

### Wrapper type 2 — Family office fragmentation

**Mechanism:** A single economic actor fragments asset holdings across 8–12 family members and 3–4 LLCs, each below the concentration threshold individually but collectively constituting a dynasty-scale holding.

**Red team test:** Construct a synthetic family office structure with 10 named natural persons and 4 holding entities. Apply the count-through ownership rule. Verify that the aggregate holding is correctly attributed to the coordinating family unit rather than each individual.

**Pass criterion:** The enforcement system identifies aggregate concentration above the threshold when any natural person holds control rights across the full network.

### Wrapper type 3 — Mission-lock capture

**Mechanism:** An enterprise qualifies as mission-locked (worker-owned or community benefit) at founding, then gradually dilutes the mission through bylaw amendments, board stacking, or operational drift. The mission-lock classification is not revoked because no single amendment triggers review.

**Red team test:** Simulate a 5-year bylaws drift sequence across 6 incremental amendments, each individually below the review trigger. Verify that cumulative drift monitoring detects mission-lock dilution and triggers a reclassification review before the enterprise loses its mission-locked status in practice.

**Pass criterion:** Cumulative drift monitoring fires a review trigger within the 5-year drift sequence, before the enterprise's actual operations diverge from its mission-lock classification by more than 25%.

### Wrapper type 4 — Successive-generation stewardship erosion

**Mechanism:** An initial stewardship owner complies with all rules. At succession, the asset passes to a family member under the allowed continuity provision. The second-generation owner interprets stewardship obligations narrowly over time. By the third generation, the holding functions as passive extraction.

**Red team test:** Simulate a three-succession sequence. Verify that the succession review at each transfer assesses actual use patterns, not merely formal compliance with succession paperwork.

**Pass criterion:** The third-generation review detects extraction-pattern drift and either requires remediation or reclassifies the holding outside the stewardship exemption.

### Test schedule

All four red team scenarios must be completed before the anti-dynasty and stewardship ownership claims move from DESIGNED to partly tested. Each scenario must be reviewed by a legal analyst independent of the founding coalition.

