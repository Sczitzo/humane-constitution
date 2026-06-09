# ANNEX AR — Contract-Commitment Architecture: Threshold Values and Governance Parameters

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Specify the numerical thresholds, deployment windows, force majeure caps, and inspector pool rules that make the contract-commitment architecture for long-horizon infrastructure projects enforceable in practice. |
> | **Who it protects** | Communities depending on infrastructure delivery (housing, healthcare, utilities); taxpayers whose capital is escrowed for projects; the public whose accountability depends on verifiable milestone completion. |
> | **Failure risk** | Parameter capture: loose thresholds recreate the investment exemption problem P-023 was designed to close — contractors fragment milestones, over-invoke force majeure, or influence an under-sized inspector pool to avoid genuine verification. |
> | **Evidence status** | Designed |
> | **Linked risks** | T-025; P-023; Annex AK (identity AED — parallel parameter-commitment pattern); Annex AJ (above-ledger bypass); Annex AL (P-017 oracle-independence standards); FC-160 through FC-184 |

> **Provenance:** Implements [P-023 — Contract-Commitment Architecture] threshold and governance parameters · Addresses T-025 · Status: **ACTIVE**

**Tier 2 founding commitment — required before deployment · Governed as P-004 protected specification**
**Status: ACTIVE (implements P-023)**

---

## Purpose

P-023 establishes that no entity receives a protected-capital shelter merely by labeling funds as investment, infrastructure, or long-horizon planning. Long-horizon projects are financed through contract-commitment architecture: capital held in milestone escrow, released on independently verified physical deliverables, and reviewed for source-base avoidance under Annex D where public-created value, scarcity privilege, or external-capital commons use is implicated. The rules are structurally sound but they depend on four numerical parameters that the design cannot determine from first principles:

- **High-value release thresholds** — where does single-verifier oversight end and multi-verifier oversight begin?
- **Deployment window** — how long may commissioning authorities hold idle escrowed funds before accountability triggers?
- **Force majeure freeze cap** — what is the maximum total freeze time available per project lifetime?
- **Inspector pool size and rotation** — how large must the independent inspector pool be, and how frequently does it rotate?

Each parameter has a capture-permissive direction and a harm-to-legitimate-projects direction. Setting them too loosely recreates the milking problem through operational parameters rather than explicit exemptions. Setting them too tightly makes essential infrastructure undeliverable or procurement quality collapse under rushed timelines.

The founding coalition must fill in these parameters before deployment. This annex provides the structure, the worked examples showing how each value affects outcomes, and the evidence gate — the parameters are committed at founding as design architecture and filled with specific numbers after first-year pilot data.

---

## Structure of the Annex

This annex specifies five things:

1. **High-value release thresholds** — tiered verification requirements by milestone release size and project-value share
2. **Deployment windows** — how long commissioning authorities may hold idle escrowed funds by program type, with deployment-delay accountability examples
3. **Force majeure freeze cap** — maximum cumulative freeze time per project lifetime, with escalating verification tiers
4. **Inspector pool governance** — pool size floors, rotation schedule, disqualification criteria
5. **Publication commitment** — what is reported publicly, how often, and in what form

Each section is a parameter block. The founding coalition must bind the reserved commitments **FC-160 through FC-184** before deployment. Worked examples are provided to show how different values affect real outcomes. The worked examples use a round-number **5% annual accountability cost** purely as an illustrative signal for comparing parameter choices; the operative controls are the deployment window, review trigger, public accounting, and Annex D source-base review. This annex sets no demurrage rate of its own.

---

## Section 1 — High-Value Release Thresholds

*A milestone release is the transfer of Flow from escrow to a contractor upon certified completion of a physical deliverable. The threshold structure determines when a single independent verifier is sufficient and when additional verifiers are required.*

### 1.1 — Absolute Tier Thresholds

| Tier | Release Size | Verification Required |
| :--- | :--- | :--- |
| **Standard** | Below FC-160 (reserved; recommended anchor: 100,000 Flow) | Single independent verifier |
| **Enhanced** | FC-160 to FC-161 (both reserved; recommended anchor ceiling: 1,000,000 Flow) | Dual independent verifier |
| **Major** | Above FC-161 (reserved) | Triple independent verifier + mandatory physical inspection with audit trail |

### 1.2 — Project-Value Percentage Floor (Anti-Fragmentation Rule)

*A contractor may not escape the Major tier by fragmenting a large deliverable into many smaller milestones. The percentage floor applies regardless of absolute amount.*

Any single milestone release exceeding **FC-162** (reserved; recommended anchor: 15% of total contracted project value) triggers **Major tier verification**, regardless of the absolute Flow amount.

**Rationale:** Without the percentage floor, a 20M Flow project could define all milestones at 999,999 Flow (just below the Major threshold), permanently avoiding triple verification. The percentage floor closes this. On a 20M Flow project with a 15% floor, any release above 3M Flow triggers Major verification — independent of the absolute threshold.

### 1.3 — Worked Examples

*The following scenarios use a representative housing project (10M Flow contracted value, 20 milestones, average 500k Flow per release) to show how threshold choices affect oversight intensity and gaming risk.*

**Scenario A — Tight thresholds (50k / 500k / 10%)**

| Threshold | Releases requiring Enhanced verification | Releases requiring Major verification |
| :--- | :--- | :--- |
| Standard below 50k | 0 (all above 50k) | — |
| Enhanced 50k–500k | All 20 (all are in this band) | — |
| Major above 500k / or above 10% of 10M (= 1M) | 0 (no release reaches 500k Major threshold or 1M 10%) | 0 |

Result: All 20 milestones require dual verification. High administrative burden. Strong protection. Inspectors become a scheduling bottleneck on large programmes.

**Scenario B — Recommended anchor (100k / 1M / 15%)**

| Release | Absolute tier | Percentage floor | Verification |
| :--- | :--- | :--- | :--- |
| 500k Flow average milestone | Enhanced (100k–1M) | Below 15% of 10M (= 1.5M) | Dual |
| Milestone defined at 1.4M | Major (above 1M) | Below 15% (1.4M < 1.5M) | Triple + inspection |
| Milestone defined at 1.6M | Major (above 1M) | Above 15% (1.6M > 1.5M) | Triple + inspection |

Result: Standard milestones receive dual verification. Only milestones above 1M Flow receive triple verification. Fragmentation to 999k Flow would still require dual verification — the gaming surface is reduced but not eliminated, because the percentage floor (15% = 1.5M) closes the threshold-straddling game for large milestones.

**Scenario C — Loose thresholds (500k / 5M / 25%)**

| Release | Tier | Verification |
| :--- | :--- | :--- |
| 500k average milestone | Right at Standard/Enhanced boundary | Single verifier |
| Milestone defined at 4.9M | Enhanced (below 5M) | Dual |
| 25% of 10M = 2.5M — 4.9M milestone below this? | Yes (4.9M > 2.5M) | Triggers percentage floor: Triple |

Result: At these thresholds, most milestones on a 10M project receive single verification. Protection is weak. The percentage floor (25% = 2.5M) triggers triple verification on anything above 2.5M — but that means only milestones of 2.5M+ are heavily scrutinised. A contractor divides a 9M project into four 2.4M milestones and nine smaller ones, all receiving single or dual verification.

**Founding coalition guidance:** The recommended anchor is Scenario B (100k / 1M / 15%). The percentage floor is the more important protection — its value should be set before the absolute thresholds, because it determines the upper bound of the fragmentation game. The absolute thresholds determine daily administrative load.

---

## Section 2 — Deployment Window

*The deployment window is the period within which a commissioning authority must contract idle escrowed funds. Funds held in escrow beyond the window without active contracting trigger mandatory CRP review. Review continues regardless of whether any dormant backstop has been activated.*

### 2.1 — Window by Programme Type

| Programme Type | Deployment Window | Rationale |
| :--- | :--- | :--- |
| **Essential Access-essential delivery** (housing floor, primary healthcare capacity, emergency food supply) | FC-163 (reserved; recommended anchor: 90 days) | Essential Access delivery is a survival obligation. Idle funds in this category represent people not housed or not treated. The shorter window creates institutional urgency aligned with the protocol's first priority. |
| **Standard infrastructure** (transport, utilities, civic facilities) | FC-164 (reserved; recommended anchor: 180 days) | Complex procurement cycles require more time. 180 days balances contracting quality against idle-fund accountability. |
| **Large-scale or novel infrastructure** (projects above FC-165 (reserved; recommended anchor: 50M Flow) contracted value, or first-of-type projects with no established procurement pathway) | FC-166 (reserved; recommended anchor: 365 days) | Procurement complexity is genuine at this scale. The longer window is compensated by stricter oversight: CRP review at 180 days (not just at end of window) and mandatory procurement progress reporting at 90-day intervals. |

### 2.2 — Deployment-Delay Signal Worked Examples

*These examples use a 5% annual accountability signal as an illustrative figure. The operative controls are review deadlines, public reporting, source-base review, and any separately approved dormant backstop. The examples show why delay must create visible institutional pressure even without routine demurrage.*

**Essential Access-essential: 5M Flow housing fund, 90-day deployment window**

| Day reached without active contracting | Illustrative accountability cost | Annualised signal |
| :--- | :--- | :--- |
| Day 30 | ~20,500 Flow | Finance directors will notice by first monthly report |
| Day 60 | ~41,100 Flow | Sufficient to trigger internal programme review in most institutional budgets |
| Day 90 | ~61,600 Flow | CRP review triggered. 1.2% of fund lost — a visible institutional cost |
| Day 180 (if no review outcome) | ~123,300 Flow | 2.5% of fund lost — strong internal pressure to contract |

**Standard infrastructure: 5M Flow fund, 180-day window**

| Day reached without active contracting | Illustrative accountability cost | Signal |
| :--- | :--- | :--- |
| Day 90 | ~61,600 Flow | Internal signal; no CRP review yet |
| Day 180 | ~123,300 Flow | CRP review triggered. 2.5% of fund lost |
| Day 365 | ~250,000 Flow | 5% of fund lost if review produces no contracting |

**Carrying-cost sensitivity: same 5M Flow fund, 180-day window**

| Effective annual signal | Illustrative cost by day 180 | Institutional signal strength |
| :--- | :--- | :--- |
| 2% | ~49,300 Flow | Weak — <1% of fund |
| 5% | ~123,300 Flow | Moderate — 2.5% of fund |
| 10% | ~246,600 Flow | Strong — 4.9% of fund |

**Key finding:** If the visible cost of delay is below approximately 3% per year, the 180-day window produces a signal too weak to create institutional urgency in most government budget contexts. Where no dormant backstop applies, deployment windows, public reporting, and CRP escalation must carry the full discipline. This annex does not create a separate carrying cost on escrowed funds.

### 2.3 — What CRP Review Entails

When the deployment window is exceeded without active contracting, the mandatory CRP review must:

1. Require the commissioning authority to provide a written explanation for the delay within **FC-167** (reserved; recommended anchor: 14 days) of review trigger.
2. Assess whether the delay reflects: (a) legitimate procurement complexity; (b) capacity failure; (c) deliberate deferral.
3. Issue one of three outcomes within **FC-168** (reserved; recommended anchor: 30 days) of review trigger:
   - **Extension granted** (legitimate complexity confirmed): window extended by FC-169 (reserved; recommended anchor: 90 days); additional progress reporting required.
   - **Capacity support** (capacity failure confirmed): CRP assigns procurement assistance; original window continues.
   - **Escalation** (deliberate deferral confirmed or second extension requested): programme transferred to joint CRP/Ombuds oversight; authority's future escrow capacity may be conditioned.

CRP review outcomes are published publicly within **FC-170** (reserved; recommended anchor: 14 days) of the decision.

---

## Section 3 — Force Majeure Freeze Cap

*A force majeure freeze pauses the deployment-delay consequence on an affected escrow account for the duration of a verified external delay. The cap is the maximum cumulative freeze time available per project across its entire contracted life.*

### 3.1 — Cap and Verification Tiers

| Cumulative freeze duration (per project) | Verification required to activate |
| :--- | :--- |
| First **FC-171** (reserved; recommended anchor: 90 days) | Contractor self-certification with contemporaneous documentary evidence (permits, certified notices, supply chain disruption documentation) |
| Above FC-171 up to **FC-172** (reserved; recommended anchor: 180 days total) | Independent third-party certification from a body with no financial relationship with the contractor or commissioning authority |
| Above FC-172 up to the binding cap | Independent assessment panel (P-017 oracle-independence standards); public notice published within 14 days of activation |
| Beyond the binding cap | **Not available.** Project enters mandatory restructuring review. A second force majeure claim after the cap is exhausted does not activate a freeze; it activates a separate restructuring pathway. |

**The binding force-majeure cap for every project, of every programme type, is the lesser of two limits:**

- the **absolute cap FC-173** (reserved; recommended anchor: 365 days total); and
- the **duration-proportional cap FC-174** (reserved; recommended anchor: 25% of contracted project duration).

Whichever limit is reached first ends freeze availability. The duration-proportional cap is mandatory for all programme types — standard infrastructure, large-scale or novel infrastructure, and Essential Access-essential delivery alike — and is not a discretionary consideration. Its purpose is to close the anchor-hunting seam: an absolute cap alone erases roughly half the deployment-delay accountability signal on a two-year project and the entire signal on a one-year project, so on any project shorter than the absolute cap divided by the proportional fraction, the proportional cap binds and the absolute anchor cannot be used as an evasion route.

**The hard cap is non-negotiable.** No extension of either limit is available without a Tier 2 (H-2) amendment. The purpose of the hard cap is to make the certification panel economically irrelevant above the cap — beyond the binding cap, there is nothing to capture.

### 3.2 — Worked Examples

*Three projects of different durations, 5% illustrative annual accountability signal. The examples below trace the absolute anchor of 365 days in isolation to expose the anchor-hunting seam; under §3.1 the binding cap is the lesser of that anchor and the 25%-of-duration proportional cap, so the proportional limit governs every project short enough for the anchor to over-reach.*

**Project A: 2-year hospital construction, 8M Flow escrowed**

| Scenario | Total delay signal applied | Signal avoided (frozen) | Freeze as % of total exposure |
| :--- | :--- | :--- | :--- |
| No force majeure events | ~800,000 Flow | 0 | 0% |
| 90-day freeze (single disruption) | ~701,000 Flow | ~99,000 Flow | 12.4% |
| 180-day freeze (sustained disruption) | ~602,000 Flow | ~198,000 Flow | 24.8% |
| 365-day freeze (cap exhausted) | ~402,000 Flow | ~398,000 Flow | **49.7%** — approximately half of total deployment-delay signal eliminated |

The 365-day absolute anchor in isolation lets a contractor eliminate ~50% of total delay exposure on a two-year project. The duration-proportional cap (FC-174) closes this: 25% of a 2-year duration is 182 days, which binds ahead of the 365-day anchor and holds avoidance to ~25%. On this project the proportional cap is the operative limit.

**Project B: 5-year power grid, 30M Flow escrowed**

| Cap length | Max signal avoided | As % of total exposure (5yr, 5%) | Economic value of capturing the certification panel |
| :--- | :--- | :--- | :--- |
| 90-day cap | ~369,000 Flow | 4.9% | Low — not worth the effort |
| 180-day cap | ~739,000 Flow | 9.8% | Borderline |
| 365-day cap | ~1,479,000 Flow | 19.7% | **Significant** — enough to fund sustained panel influence |
| 730-day cap | ~2,959,000 Flow | 39.4% | **High** — panel capture is economically rational |

**Key finding for large projects:** The 365-day absolute anchor in isolation produces a meaningful savings opportunity (~1.5M Flow) on a large multi-year project. Here the absolute cap is the binding limit, because 25% of a 5-year duration (~456 days) exceeds the 365-day anchor — for projects long enough that the proportional cap would over-reach, the absolute cap governs. The two limits operating together (lesser-of) hold large-project avoidance to the 365-day exposure rather than letting a longer proportional allowance compound it.

**Project C: 1-year community housing (Essential Access-essential), 1M Flow escrowed**

| Cap length | Max signal avoided | As % of total exposure (1yr, 5%) |
| :--- | :--- | :--- |
| 90 days | ~12,300 Flow | 24.7% |
| 180 days | ~24,700 Flow | 49.4% |
| 365 days | ~50,000 Flow | 100% — entire deployment-delay signal eliminated on a 1-year project |

**Key finding for short projects of any type:** The 365-day absolute anchor on a 1-year project is effectively unlimited — it erases the entire delay signal. The duration-proportional cap **FC-174** (recommended anchor: 25% of contracted project duration) is the binding limit for every short project, not only Essential Access-essential ones: 25% of a 1-year duration is ~91 days, holding avoidance to ~25%. Because §3.1 binds the cap to the lesser of the absolute and proportional limits for all programme types, the "1-year project, 365-day cap" outcome cannot arise for standard infrastructure either.

### 3.3 — Qualifying Events

*Only the following categories qualify for force majeure freeze. This list is P-004-protected.*

| Category | Evidence requirement |
| :--- | :--- |
| Permitting delay attributable to a regulatory body not under the contractor's or commissioning authority's control | Official correspondence from regulatory body; timeline documentation |
| Certified supply chain disruption | Third-party logistics certification or industry-body declaration covering the specific input; contractor must demonstrate the input is on the critical path |
| Declared natural disaster or public health emergency | Official government or international body declaration; contractor must demonstrate project-specific impact |

*Events that do not qualify (non-exhaustive):* financing difficulty; cost overrun; labour disputes internal to the contractor; scope changes; delays attributable to contractor's own subcontractor selection.

---

## Section 4 — Inspector Pool Governance

*The inspector pool is the body from which independent milestone verifiers are drawn. It is administered by the independent escrow agent under P-017 oracle-independence standards.*

### 4.1 — Pool Size and Coverage Requirements

| Jurisdiction scale | Minimum pool size | Rationale |
| :--- | :--- | :--- |
| **Pilot / single municipality** | FC-175 (reserved; recommended anchor: 12 qualified inspectors) | Minimum to enable rotation without repetition across a standard project's milestone set |
| **Regional** | FC-176 (reserved; recommended anchor: 30 qualified inspectors) | Sufficient depth to prevent any single inspector from becoming critical-path bottleneck |
| **National / multi-regional** | FC-177 (reserved; recommended anchor: 75 qualified inspectors per region) | Rotation frequency and geographic distribution become binding at this scale |

### 4.2 — Rotation Schedule

| Pool tier | Maximum consecutive assignments to same project | Cooling-off period before reassignment |
| :--- | :--- | :--- |
| Standard tier releases | FC-178 (reserved; recommended anchor: 3 consecutive milestones) | FC-179 (reserved; recommended anchor: 90 days) |
| Enhanced tier releases | FC-180 (reserved; recommended anchor: 2 consecutive milestones) | FC-181 (reserved; recommended anchor: 120 days) |
| Major tier releases | FC-182 (reserved; recommended anchor: 1 milestone) | FC-183 (reserved; recommended anchor: 180 days) |

**Rationale:** At Major tier, no inspector should certify the same project twice without a 180-day gap. This makes sustained relationship-building between contractor and inspector structurally difficult. For Standard tier, three consecutive milestones are permitted because administrative continuity has value and the lower financial stakes reduce capture incentive.

### 4.3 — Disqualification Criteria

An inspector is removed from the pool and permanently disqualified from reinstatement if:

- Found to have certified a milestone without physical inspection where physical inspection was required.
- Found to have a financial relationship with the contractor, commissioning authority, or any entity in the project supply chain.
- Subject to a confirmed misrepresentation finding in any certification.
- Found to have accepted direct or indirect inducements from any project participant.

An inspector may be temporarily suspended (pending investigation) on credible allegation. Suspension and disqualification decisions are published.

### 4.4 — Pool Composition Independence

At the time of any inspector assignment:
- No more than **FC-184** (reserved; recommended anchor: 25% of the active pool) may have prior employment or consulting relationships with any single sector (construction, utilities, healthcare infrastructure — assessed at the three-digit industry classification level).
- **At pilot scale the single-sector limit is tighter in absolute terms.** In a pilot or single-municipality pool, no more than 2 inspectors from any single sector may sit in the active pool, regardless of the percentage in FC-184. A flat 25% allows 3 of a 12-inspector pool (FC-175) to share one sector, which leaves too little independent depth when the pool is small and relationships are dense; the absolute cap of 2 forces genuine cross-sector breadth before the proportional limit relaxes it at regional and national scale. Where the pilot pool floor is raised above 12, the single-sector limit is the lesser of 2 inspectors and the FC-184 percentage.
- Pool diversity across professional background (engineering disciplines, quantity surveying, planning, environmental assessment) must be maintained at levels defined in the escrow agent's published pool composition report.

---

## Section 5 — Publication Commitment

The following is published as part of the contract-commitment architecture's public accountability record:

| Metric | Publication format | Frequency |
| :--- | :--- | :--- |
| Number of active escrow accounts by programme type | Aggregate count; Flow value by tier | Quarterly |
| Number of deployment window reviews triggered | Count; outcomes (extension / support / escalation) | Quarterly |
| Number of force majeure freeze applications by project; approvals, denials, total days frozen | Per-project summary | Quarterly |
| Inspector pool size, sector composition summary, disqualifications | Pool health report | Quarterly |
| Any project that has exhausted its force majeure cap | Named disclosure; status | On occurrence |
| CRP review outcomes for exceeded deployment windows | Full decision with rationale | Within 14 days of decision |

Publication of force majeure applications and outcomes converts the certification panel's decisions into public record. If the panel is approving a disproportionate share of applications from a particular sector or contractor, the pattern is visible. This is the mechanism that makes the P-017 oracle-independence requirement meaningful in this context: transparency supplements structural independence.

---

## Founding Coalition Instructions

To complete this annex before deployment, the founding coalition must:

1. **Determine the effective deployment-delay discipline** for escrowed balances and recalibrate the deployment window examples in Section 2 accordingly. If the visible signal reaching the commissioning authority is below 3% per year, deployment windows must be shortened or public escalation strengthened to maintain adequate institutional urgency. No separate carrying cost on escrowed funds is created by this annex.

2. **Bind FC-160 through FC-184** in Sections 1 through 4, using first-year pilot data where available. Where pilot data is not yet available, use the recommended anchors as starting positions. **Before any parameter is bound, it must be submitted to an adversarial parameter review panel convened under the same composition rules as AH3 (ANNEX_AH).** The panel must compare each parameter against at least two real-world analogues from comparable governance systems or existing escrow and capital-deployment frameworks. Parameters for which no analogue can be identified must be auto-flagged in the founding record with a published explanation of why no analogue exists and what the founding coalition used instead. Any parameter that the adversarial panel contests must carry a permanent public warning record in `/founding/commitments.md` — the warning does not block deployment, but it remains attached to the parameter through all subsequent reviews and cannot be removed without a Tier 2 amendment process.
   - High-value thresholds: 100k Flow / 1M Flow / 15% of project value
   - Deployment windows: 90 days (Essential Access-essential) / 180 days (standard) / 365 days (large-scale)
   - Force majeure cap: binding limit is the lesser of FC-173 (365 days absolute) and FC-174 (25% of contracted project duration), applied to all programme types
   - Inspector pool: minimum 12 (pilot), 30 (regional), 75 per region (national); rotation per Section 4.2 anchors; single-sector limit per Section 4.4 (no more than 2 from any one sector at pilot scale, FC-184 percentage at regional and above)

3. **Bind both force-majeure limits, not one.** Under Section 3.1 the binding cap for every programme type is the lesser of the absolute cap (FC-173) and the duration-proportional cap (FC-174); the proportional cap is mandatory and is not a discretionary "fixed-versus-proportional" choice. The founding coalition must set the proportional fraction (recommended anchor: 25% of contracted duration) and the absolute day limit (recommended anchor: 365 days) so that no project duration leaves a usable evasion route through either limit (see Section 3.2, Projects A, B, and C). This calibration must be completed before deployment.

4. **Specify the actual Flow amounts and thresholds** in relation to the real price level in the pilot context. The absolute thresholds in Section 1 are illustrative only. "100,000 Flow" is meaningless as a protection unless the founding coalition has established what a standard housing unit or clinic costs in Flow and verified that 100,000 Flow represents a significant but not exceptional milestone release.

5. **Commission the inspector pool** before the first escrow account is opened. Pool size must meet the minimum for the deployment scale; pool composition must satisfy Section 4.4 before any inspector makes any certification.

6. **Integrate contract-commitment architecture metrics into the Article VII public dashboard** before any escrow account is opened. The publication commitment in Section 5 is a precondition of deployment, not a post-deployment addition.

---

## Relationship to Other Annexes

| Annex | Relationship |
| :--- | :--- |
| Annex AK (Identity AED) | Parallel structure — both are parameter-commitment annexes for P-004-protected terms. AK governs identity error tolerances; AR governs capital-deployment tolerances. The pattern is the same: explicit numbers, public commitment, annual review. |
| Annex AJ (Above-Ledger Bypass) | AJ defines what Flow/Essential Access boundary violations look like. P-023 forecloses the investment-channel boundary manipulation specifically; AR governs how. AJ-3.3 (anticipatory hoarding) is the upstream threat that P-023 + AR address. |
| Annex AL (P-017 Oracle Independence) | Inspector pool governance (Section 4) and force majeure certification panel composition are both governed by P-017 standards. Where AR refers to "P-017 oracle-independence standards," the specific requirements are defined in AL. |

---

*This document is Annex AR of the Humane Constitution. The commitment architecture is ACTIVE as an incorporated design for P-023; the specific numerical parameters remain an evidence and calibration gate. They must be committed at founding as design architecture, calibrated with specific numbers after first-year pilot data, and locked as Tier 2 before the first scale-up gate. The recommended anchor values in this annex are defensible starting positions, not pre-committed values — the founding coalition must explicitly accept, modify, or replace each one.*
