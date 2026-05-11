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
- **Equivalence rule:** any asset or instrument above the household-safe-harbor threshold that functions primarily as a non-decaying store of value — including foreign currency, collectible portfolios, non-productive durable stockpiles, or equivalent wrappers — is subject to review for Flow-equivalent carrying-cost treatment regardless of legal form. Equity compensation (shares, options, or equity-equivalent instruments received as payment for work) is explicitly covered by this rule: equity holdings are valued at their published Flow-equivalent market price and counted toward the holder's total balance for demurrage assessment purposes. Demurrage is assessed on the holder's idle Flow balance, but the threshold at which demurrage begins is determined by adding Flow holdings and equity Flow-equivalent value together. A person who receives equity above the floor cannot hold that equity as a demurrage-free store of value simply because it is not denominated in Flow. Dividends or distributions paid in additional equity are treated as Flow-equivalent income on the date of receipt and added to the balance assessment immediately. This rule applies regardless of whether the equity was received as worker compensation, founder equity, or investment return.
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

**Equity compensation — the loophole that does not exist**

A worker receives 50,000 Flow worth of shares in their employer as part of annual compensation. They also hold 10,000 Flow in cash.

| Asset | Flow-equivalent value | Counts toward balance? |
| :--- | ---: | :--- |
| Cash (Flow) | 10,000 Flow | Yes |
| Employer shares (equity) | 50,000 Flow | Yes — valued at market price |
| **Total assessed balance** | **60,000 Flow** | — |
| Floor | 27,000 Flow | — |
| **Above-floor amount** | **33,000 Flow** | Demurrage assessed on idle Flow holdings |

The worker holds 10,000 Flow in cash. Their above-floor total is 33,000 Flow. Demurrage is assessed on their idle Flow balance (10,000 Flow) as if they are already 33,000 Flow above the floor — meaning the full 10,000 Flow cash balance is assessed at demurrage rate. The equity itself is not forcibly liquidated, but it eliminates the floor protection for the cash balance.

At scale: an executive receives 2,000,000 Flow worth of equity and holds 50,000 Flow in cash. Their total assessed balance is 2,050,000 Flow — far above the 27,000 Flow floor. Their entire 50,000 Flow cash balance is assessed at demurrage rate. Paying compensation in shares rather than Flow does not reduce the demurrage obligation. The route is closed.

---

**Owner-operator example — personal floor plus enterprise float**

A sole trader with 40,000 Flow total: 27,000 Flow personal savings floor + 13,000 Flow enterprise operating float (= 3 months of 4,333 Flow/month operating costs). Both exemptions apply simultaneously. Their effective demurrage-free threshold is 40,000 Flow — their entire balance. They pay nothing unless they accumulate beyond both.

### J3. Investment channel architecture (required, not optional)
Long-horizon enterprise is impossible if all held Flow is treated as idle. The investment channel is therefore a constitutional subsystem, not a discretionary afterthought. There are four channels available to any enrolled person. None of them can convert into Essential Access, Voice, Service Record eligibility, or housing queue priority.

**Demurrage treatment — concentration-indexed cap:** Project Escrow Accounts and Public Infrastructure Windows are fully demurrage-free while milestones remain current (real work is being funded, not wealth accumulated). Term Finance Pools and Retirement Horizon Locks are demurrage-free up to the Retirement Horizon Lock actuarial ceiling — defined as the total amount that would, at the published maximum Retirement Horizon Lock return rate and the published maximum 20-year term, produce a balance at maturity equal to the household savings floor. This ceiling is a Tier 2 founding commitment and is published before any Retirement Horizon Lock is offered. A person's combined TFP and RHL deposits above the actuarial ceiling are subject to full standard demurrage on the excess. The ceiling is the same for every person — it is not means-tested or contribution-adjusted. This prevents the investment channels from becoming unlimited demurrage shelters for concentrated wealth while preserving their function for ordinary retirement and lending.

- **Project Escrow Accounts:** milestone-based build accounts for facilities, tooling, R&D, housing construction, grid upgrades, and other long-horizon work. Funds in approved project escrows do not incur ordinary idle decay while milestones remain current.
- **Term Finance Pools:** transparent lending pools that price risk in Flow, publish loss rules, and pay a published return to depositors. Open to any enrolled person with no minimum deposit. See §J3-A for full specification.
- **Public Infrastructure Windows:** federation or regional project accounts for transit, water, energy, health, and digital infrastructure with independent milestone review and public dashboarding.
- **Maintenance and Warranty Reserves:** ring-fenced reserves for safety, replacement, and warranty obligations may receive tailored treatment when their use rules are published in advance.
- **Anti-abuse rule:** any escrow or reserve that is diverted, repeatedly stale, or materially off-milestone loses special treatment and reverts to ordinary idle-balance rules plus review for evasion.

### J3-A. Term Finance Pools — full specification

Term Finance Pools are the ordinary person's investment account. They function like a savings account or bond fund: you deposit Flow, the pool lends it to compliant enterprises and infrastructure projects, and you earn a published return. Your deposited Flow is not idle — it is working — so no demurrage applies while it remains in the pool.

**Who can participate:** any enrolled person. No minimum deposit. No accreditation requirement. No institutional intermediary required.

**Return structure:**

| Pool type | Typical return range | Risk profile | Backed by |
| :--- | :--- | :--- | :--- |
| **Public Infrastructure Pool** | 1.5–2.5% annually | Low — backed by federation/regional government | Transit, water, energy, health infrastructure projects |
| **Enterprise Lending Pool** | 2.5–4.5% annually | Medium — diversified across compliant enterprises | Worker-owned firms, cooperatives, mission-locked enterprises |
| **Innovation Pool** | 3.5–6% annually | Higher — early-stage or R&D projects | Long-horizon research, new cooperative formation |

Returns are paid in Flow quarterly and added to the depositor's wallet balance on receipt. Return rates are published and updated quarterly. A depositor may hold multiple pool types simultaneously.

**Loss rules:** If a pool's underlying loans default beyond the published reserve threshold, depositors share losses proportionally to their share of the pool. Loss rules are published in plain language before any deposit. No pool may describe itself as "guaranteed" unless backed by an explicit federation guarantee instrument.

**Withdrawal:** A depositor may withdraw at any time with a published notice period (Standard pool: 30 days; Infrastructure pool: 90 days for amounts above 10,000 Flow). Early withdrawal does not trigger retroactive demurrage — the depositor simply stops earning the return and the withdrawn Flow returns to their wallet as normal balance subject to standard demurrage rules from that point forward.

**Hard limits:** Term Finance Pools may not use deposited Flow to purchase Essential Access access, Voice weight, Service Record eligibility, housing queue priority, or civic appointment influence. Pool investment decisions are published quarterly by sector and project type.

**Concentration cap:** A depositor's TFP balance is demurrage-free up to the actuarial ceiling defined in §J3 (shared with Retirement Horizon Locks across both channels combined). Deposits above the ceiling are subject to full standard demurrage on the excess. The cap is assessed on the combined TFP + RHL balance, not on each channel separately — a person cannot evade the ceiling by splitting holdings across both.

---

### J3-B. Retirement Horizon Lock — full specification

The Retirement Horizon Lock is the long-term savings instrument. It is designed for people who want to set money aside for decades and not think about demurrage while it grows. You declare a term, lock Flow into it, and earn a modest fixed return. No demurrage applies while the lock is active.

**Terms available:**

| Term | Annual return | Notes |
| :--- | :--- | :--- |
| 3 years | 1.5% | Shortest lock; suitable for medium-horizon goals |
| 5 years | 2.0% | Standard retirement contribution horizon |
| 10 years | 2.5% | Primary retirement vehicle for most people |
| 20 years | 3.0% | Maximum return; suitable for younger savers |
| Age-linked | 2.5% | Unlocks at a declared retirement age; rate fixed at time of lock |

Returns are paid annually in Flow into the depositor's wallet. The locked principal earns no demurrage.

**The locked balance still counts toward total balance assessment.** Locking Flow does not reduce the equity-demurrage calculation described in the equivalence rule. A person with 200,000 Flow in a Retirement Horizon Lock and 30,000 Flow in their wallet is assessed as holding 230,000 Flow total — the lock protects them from demurrage on the locked amount, but does not reset their balance position for purposes of the equity compensation rule.

**Early withdrawal:** the depositor may exit early but forfeits all accrued returns and pays a penalty equal to 6 months of demurrage on the withdrawn amount at the current standard rate. Early withdrawal is available without restriction — it is not trapped capital.

**Concentration cap:** A depositor's RHL balance is demurrage-free up to the actuarial ceiling defined in §J3 (shared with Term Finance Pools across both channels combined). The ceiling is the total that would, at the published maximum return rate (currently 3.0% annually for a 20-year lock) and the 20-year maximum term, produce a maturity balance equal to the household savings floor. Deposits above the ceiling in either channel — assessed together — are subject to full standard demurrage on the excess. The ceiling is published as a single number each year alongside the household savings floor.

**Why the returns are lower than today's index funds:** the Retirement Horizon Lock is not an equity market. It does not capture enterprise upside — it lends at a fixed rate to the economy and earns a fixed return. The tradeoff is certainty: the return is published and fixed at time of lock, the demurrage exposure is zero, and the principal is returned in full at maturity (absent pool default). Someone who needs their retirement savings to be predictable — especially approaching retirement age — may prefer this over equity exposure.

---

### J3-C. Compliant enterprise equity markets

Enrolled persons may purchase equity stakes in compliant enterprises — worker-owned cooperatives, mission-locked firms, or audited for-profit enterprises operating under the protocol. This is the closest equivalent to a stock market: you own a share of a productive enterprise, the enterprise earns Flow by producing real value, and a portion of that earnings is distributed to shareholders as dividends paid in Flow.

**What equity ownership means:**
- A fractional ownership stake in the enterprise's productive capacity and future earnings
- Dividends paid in Flow when the enterprise distributes earnings
- A published Flow-equivalent market value updated quarterly by independent auditor
- No claim on Essential Access, Voice, Service Record eligibility, or housing queue priority
- No civic authority: share ownership does not convert into governance influence over the protocol or civic panels

**What equity ownership does not mean:**
- It does not grant control over workers or override the enterprise's internal governance structure
- In worker-owned cooperatives, equity investors are distinct from worker-members; investor returns are capped and worker governance is primary
- Equity ownership above concentration thresholds (defined under Annex AT §AT6.2) triggers mandatory review regardless of whether the owner is an individual or institution

**Demurrage treatment:** as specified in the J2 equivalence rule, equity holdings are valued at their published Flow-equivalent market price and counted toward the holder's total balance for demurrage assessment. Dividends received in Flow are added to the holder's wallet balance on receipt and subject to standard demurrage rules from that point.

**Who may issue equity:** any enterprise registered under the protocol that has completed an independent financial audit and published its ownership structure, mission, and governance rules. Shell companies, beneficial-ownership-obscured structures, and entities without a published natural-person control map may not list equity for purchase.

---

### J3-D. Worked examples — investment channels vs. idle Flow vs. today

*Floor = 27,000 Flow. Default demurrage = 0.5%/month on idle above-floor balance (~6.2%/year effective). Investment return rates are illustrative mid-points from J3-A and J3-B published ranges.*

**Retirement saver — 150,000 Flow total**

Strategy: keep 27,000 Flow in the free bucket; invest 123,000 Flow.

| Investment choice | Annual demurrage | Annual return | Net annual position | vs. today (10% index fund = +15,000) |
| :--- | ---: | ---: | ---: | :--- |
| All idle | -7,589 | 0 | **-7,589** | -22,589 worse |
| Public Infrastructure Pool (2%) | 0 | +2,460 | **+2,460** | -12,540 worse |
| Enterprise Lending Pool (3.5%) | 0 | +4,305 | **+4,305** | -10,695 worse |
| Retirement Horizon Lock 10yr (2.5%) | 0 | +3,075 | **+3,075** | -11,925 worse |
| Enterprise equity (4% dividend yield) | 0 | +4,920 | **+4,920** | -10,080 worse |

**The honest number:** even with investment vehicles, a 150,000 Flow retirement saver earns roughly 10,000–12,000 Flow less per year than a comparable US index fund investor today. The gap is real. The partial offset is that under this system, Essential Access covers healthcare, housing, food, and basic transit — the costs that make large retirement savings necessary in today's world. A person who does not need to self-insure against catastrophic healthcare costs or housing instability needs a smaller nest egg to retire comfortably.

**Retirement saver — 400,000 Flow total**

Strategy: keep 27,000 Flow in the free bucket; invest 373,000 Flow.

| Investment choice | Annual demurrage | Annual return | Net annual position | vs. today (10% index fund = +40,000) |
| :--- | ---: | ---: | ---: | :--- |
| All idle | -23,014 | 0 | **-23,014** | -63,014 worse |
| Enterprise Lending Pool (3.5%) | 0 | +13,055 | **+13,055** | -26,945 worse |
| Retirement Horizon Lock 20yr (3%) | 0 | +11,190 | **+11,190** | -28,810 worse |
| Enterprise equity (4% dividend yield) | 0 | +14,920 | **+14,920** | -25,080 worse |
| Mixed: 50% Enterprise Pool + 50% equity | 0 | +13,987 | **+13,987** | -26,013 worse |

**Retirement saver — 800,000 Flow total**

Strategy: keep 27,000 Flow in the free bucket; invest 773,000 Flow.

| Investment choice | Annual demurrage | Annual return | Net annual position | vs. today (10% index fund = +80,000) |
| :--- | ---: | ---: | ---: | :--- |
| All idle | -47,714 | 0 | **-47,714** | -127,714 worse |
| Enterprise Lending Pool (3.5%) | 0 | +27,055 | **+27,055** | -52,945 worse |
| Enterprise equity (4% dividend yield) | 0 | +30,920 | **+30,920** | -49,080 worse |
| Mixed strategy | 0 | +28,987 | **+28,987** | -51,013 worse |

**What the numbers show:** the investment channels eliminate the demurrage penalty entirely, and produce a modest positive return. The gap versus today's index fund returns (~10%) persists because Flow investment vehicles do not capture enterprise upside the way equity markets do — they lend at fixed rates or distribute dividends from current earnings rather than pricing future growth expectations. This is a design choice, not an oversight: the system is calibrated to circulate capital through productive enterprise rather than to reward passive accumulation of appreciating assets. Whether that tradeoff is acceptable is a question for the founding deliberation, not a hidden assumption.

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

