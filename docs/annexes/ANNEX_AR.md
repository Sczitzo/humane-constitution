# Annex AR — Contract-Commitment Architecture: Threshold Values and Governance Parameters

**Tier 2 founding commitment — required before deployment · Governed as P-004 protected specification**
**Status: PROPOSED (referenced by P-023)**

---

## Purpose

P-023 establishes that no entity receives a demurrage exemption and that long-horizon projects are financed through contract-commitment architecture: capital held in milestone escrow (demurrage applies), released on independently verified physical deliverables. The rules are structurally sound but they depend on four numerical parameters that the design cannot determine from first principles:

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
2. **Deployment windows** — how long commissioning authorities may hold idle escrowed funds by program type, with demurrage-interaction worked examples
3. **Force majeure freeze cap** — maximum cumulative freeze time per project lifetime, with escalating verification tiers
4. **Inspector pool governance** — pool size floors, rotation schedule, disqualification criteria
5. **Publication commitment** — what is reported publicly, how often, and in what form

Each section is a template. The founding coalition must fill in all **[FOUNDING COMMITMENT]** fields. Worked examples are provided to show how different values affect real outcomes. These worked examples use a placeholder EC demurrage rate of **5% per year** — the founding coalition must substitute the actual rate when calibrating these parameters.

---

## Section 1 — High-Value Release Thresholds

*A milestone release is the transfer of EC from escrow to a contractor upon certified completion of a physical deliverable. The threshold structure determines when a single independent verifier is sufficient and when additional verifiers are required.*

### 1.1 — Absolute Tier Thresholds

| Tier | Release Size | Verification Required |
| :--- | :--- | :--- |
| **Standard** | Below [FOUNDING COMMITMENT — e.g., 100,000 EC] | Single independent verifier |
| **Enhanced** | [e.g., 100,000 EC] to [FOUNDING COMMITMENT — e.g., 1,000,000 EC] | Dual independent verifier |
| **Major** | Above [FOUNDING COMMITMENT — e.g., 1,000,000 EC] | Triple independent verifier + mandatory physical inspection with audit trail |

### 1.2 — Project-Value Percentage Floor (Anti-Fragmentation Rule)

*A contractor may not escape the Major tier by fragmenting a large deliverable into many smaller milestones. The percentage floor applies regardless of absolute amount.*

Any single milestone release exceeding **[FOUNDING COMMITMENT — e.g., 15%]** of the total contracted project value triggers **Major tier verification**, regardless of the absolute EC amount.

**Rationale:** Without the percentage floor, a 20M EC project could define all milestones at 999,999 EC (just below the Major threshold), permanently avoiding triple verification. The percentage floor closes this. On a 20M EC project with a 15% floor, any release above 3M EC triggers Major verification — independent of the absolute threshold.

### 1.3 — Worked Examples

*The following scenarios use a representative housing project (10M EC contracted value, 20 milestones, average 500k EC per release) to show how threshold choices affect oversight intensity and gaming risk.*

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
| 500k EC average milestone | Enhanced (100k–1M) | Below 15% of 10M (= 1.5M) | Dual |
| Milestone defined at 1.4M | Major (above 1M) | Below 15% (1.4M < 1.5M) | Triple + inspection |
| Milestone defined at 1.6M | Major (above 1M) | Above 15% (1.6M > 1.5M) | Triple + inspection |

Result: Standard milestones receive dual verification. Only milestones above 1M EC receive triple verification. Fragmentation to 999k EC would still require dual verification — the gaming surface is reduced but not eliminated, because the percentage floor (15% = 1.5M) closes the threshold-straddling game for large milestones.

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

*The deployment window is the period within which a commissioning authority must contract idle escrowed funds. Funds held in escrow beyond the window without active contracting trigger mandatory CRP review. Demurrage continues regardless.*

### 2.1 — Window by Programme Type

| Programme Type | Deployment Window | Rationale |
| :--- | :--- | :--- |
| **LC-essential delivery** (housing floor, primary healthcare capacity, emergency food supply) | [FOUNDING COMMITMENT — e.g., 90 days] | LC delivery is a survival obligation. Idle funds in this category represent people not housed or not treated. The shorter window creates institutional urgency aligned with the protocol's first priority. |
| **Standard infrastructure** (transport, utilities, civic facilities) | [FOUNDING COMMITMENT — e.g., 180 days] | Complex procurement cycles require more time. 180 days balances contracting quality against idle-fund accountability. |
| **Large-scale or novel infrastructure** (projects above [FOUNDING COMMITMENT — e.g., 50M EC] contracted value, or first-of-type projects with no established procurement pathway) | [FOUNDING COMMITMENT — e.g., 365 days] | Procurement complexity is genuine at this scale. The longer window is compensated by stricter oversight: CRP review at 180 days (not just at end of window) and mandatory procurement progress reporting at 90-day intervals. |

### 2.2 — Demurrage Interaction Worked Examples

*These examples use a 5% annual demurrage rate. Founding coalition must recalibrate if the actual rate differs.*

**LC-essential: 5M EC housing fund, 90-day deployment window**

| Day reached without active contracting | EC lost to demurrage | Annualised rate signal |
| :--- | :--- | :--- |
| Day 30 | ~20,500 EC | Finance directors will notice by first monthly report |
| Day 60 | ~41,100 EC | Sufficient to trigger internal programme review in most institutional budgets |
| Day 90 | ~61,600 EC | CRP review triggered. 1.2% of fund lost — a visible institutional cost |
| Day 180 (if no review outcome) | ~123,300 EC | 2.5% of fund lost — strong internal pressure to contract |

**Standard infrastructure: 5M EC fund, 180-day window**

| Day reached without active contracting | EC lost to demurrage | Signal |
| :--- | :--- | :--- |
| Day 90 | ~61,600 EC | Internal signal; no CRP review yet |
| Day 180 | ~123,300 EC | CRP review triggered. 2.5% of fund lost |
| Day 365 | ~250,000 EC | 5% of fund lost if review produces no contracting |

**Demurrage rate sensitivity: same 5M EC fund, 180-day window**

| Annual demurrage rate | EC lost by day 180 | Institutional signal strength |
| :--- | :--- | :--- |
| 2% | ~49,300 EC | Weak — <1% of fund |
| 5% | ~123,300 EC | Moderate — 2.5% of fund |
| 10% | ~246,600 EC | Strong — 4.9% of fund |

**Key finding:** If the EC demurrage rate is below approximately 3%, the 180-day window produces a signal too weak to create institutional urgency in most government budget contexts. If the founding coalition sets a low demurrage rate for EC generally, the deployment windows must be shortened to compensate, or the protocol must specify a separate, higher demurrage rate for escrowed funds.

### 2.3 — What CRP Review Entails

When the deployment window is exceeded without active contracting, the mandatory CRP review must:

1. Require the commissioning authority to provide a written explanation for the delay within **[FOUNDING COMMITMENT — e.g., 14 days]** of review trigger.
2. Assess whether the delay reflects: (a) legitimate procurement complexity; (b) capacity failure; (c) deliberate deferral.
3. Issue one of three outcomes within **[FOUNDING COMMITMENT — e.g., 30 days]** of review trigger:
   - **Extension granted** (legitimate complexity confirmed): window extended by [FOUNDING COMMITMENT — e.g., 90 days]; additional progress reporting required.
   - **Capacity support** (capacity failure confirmed): CRP assigns procurement assistance; original window continues.
   - **Escalation** (deliberate deferral confirmed or second extension requested): programme transferred to joint CRP/Ombuds oversight; authority's future escrow capacity may be conditioned.

CRP review outcomes are published publicly within **[FOUNDING COMMITMENT — e.g., 14 days]** of the decision.

---

## Section 3 — Force Majeure Freeze Cap

*A force majeure freeze pauses demurrage on an affected escrow account for the duration of a verified external delay. The cap is the maximum cumulative freeze time available per project across its entire contracted life.*

### 3.1 — Cap and Verification Tiers

| Cumulative freeze duration (per project) | Verification required to activate |
| :--- | :--- |
| First **[FOUNDING COMMITMENT — e.g., 90 days]** | Contractor self-certification with contemporaneous documentary evidence (permits, certified notices, supply chain disruption documentation) |
| **[e.g., 91]** to **[FOUNDING COMMITMENT — e.g., 180 days]** | Independent third-party certification from a body with no financial relationship with the contractor or commissioning authority |
| **[e.g., 181]** to **[FOUNDING COMMITMENT — e.g., 365 days]** | Independent assessment panel (P-017 oracle-independence standards); public notice published within 14 days of activation |
| Beyond **[FOUNDING COMMITMENT — e.g., 365 days total]** | **Not available.** Project enters mandatory restructuring review. A second force majeure claim after the cap is exhausted does not activate a freeze; it activates a separate restructuring pathway. |

**The hard cap is non-negotiable.** No extension of the cap is available without a Tier 2 (H-2) amendment. The purpose of the hard cap is to make the certification panel economically irrelevant above the cap — beyond the cap, there is nothing to capture.

### 3.2 — Worked Examples

*Three projects of different durations, 5% annual demurrage rate, using the recommended anchor cap of 365 days.*

**Project A: 2-year hospital construction, 8M EC escrowed**

| Scenario | Total demurrage paid | Demurrage avoided (frozen) | Freeze as % of total exposure |
| :--- | :--- | :--- | :--- |
| No force majeure events | ~800,000 EC | 0 | 0% |
| 90-day freeze (single disruption) | ~701,000 EC | ~99,000 EC | 12.4% |
| 180-day freeze (sustained disruption) | ~602,000 EC | ~198,000 EC | 24.8% |
| 365-day freeze (cap exhausted) | ~402,000 EC | ~398,000 EC | **49.7%** — approximately half of total demurrage eliminated |

At a 365-day cap on a 2-year project, a contractor can eliminate ~50% of total demurrage exposure. The question for the founding coalition: is 365 days too generous for a 2-year project? A tighter cap of 180 days limits avoidance to ~25%.

**Project B: 5-year power grid, 30M EC escrowed**

| Cap length | Max demurrage avoided | As % of total exposure (5yr, 5%) | Economic value of capturing the certification panel |
| :--- | :--- | :--- | :--- |
| 90-day cap | ~369,000 EC | 4.9% | Low — not worth the effort |
| 180-day cap | ~739,000 EC | 9.8% | Borderline |
| 365-day cap | ~1,479,000 EC | 19.7% | **Significant** — enough to fund sustained panel influence |
| 730-day cap | ~2,959,000 EC | 39.4% | **High** — panel capture is economically rational |

**Key finding for large projects:** The 365-day cap produces a meaningful savings opportunity (~1.5M EC) on a large multi-year project. The founding coalition should consider whether the cap should scale inversely with project duration — shorter caps for longer projects — or whether the absolute cap should be lower (e.g., 180 days regardless of project length).

**Project C: 1-year community housing (LC-essential), 1M EC escrowed**

| Cap length | Max demurrage avoided | As % of total exposure (1yr, 5%) |
| :--- | :--- | :--- |
| 90 days | ~12,300 EC | 24.7% |
| 180 days | ~24,700 EC | 49.4% |
| 365 days | ~50,000 EC | 100% — entire demurrage eliminated on a 1-year project |

**Key finding for short LC-essential projects:** A 365-day cap on a 1-year project is effectively unlimited. For LC-essential programmes, the cap should be set relative to total project duration — e.g., cap cannot exceed **[FOUNDING COMMITMENT — e.g., 25%]** of the contracted project duration, regardless of the absolute day limit. This prevents the "1-year project, 365-day cap" outcome above.

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
| **Pilot / single municipality** | [FOUNDING COMMITMENT — e.g., 12 qualified inspectors] | Minimum to enable rotation without repetition across a standard project's milestone set |
| **Regional** | [FOUNDING COMMITMENT — e.g., 30 qualified inspectors] | Sufficient depth to prevent any single inspector from becoming critical-path bottleneck |
| **National / multi-regional** | [FOUNDING COMMITMENT — e.g., 75 qualified inspectors per region] | Rotation frequency and geographic distribution become binding at this scale |

### 4.2 — Rotation Schedule

| Pool tier | Maximum consecutive assignments to same project | Cooling-off period before reassignment |
| :--- | :--- | :--- |
| Standard tier releases | [FOUNDING COMMITMENT — e.g., 3 consecutive milestones] | [FOUNDING COMMITMENT — e.g., 90 days] |
| Enhanced tier releases | [FOUNDING COMMITMENT — e.g., 2 consecutive milestones] | [FOUNDING COMMITMENT — e.g., 120 days] |
| Major tier releases | [FOUNDING COMMITMENT — e.g., 1 milestone] | [FOUNDING COMMITMENT — e.g., 180 days] |

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
- No more than **[FOUNDING COMMITMENT — e.g., 25%]** of the active pool may have prior employment or consulting relationships with any single sector (construction, utilities, healthcare infrastructure — assessed at the three-digit industry classification level).
- Pool diversity across professional background (engineering disciplines, quantity surveying, planning, environmental assessment) must be maintained at levels defined in the escrow agent's published pool composition report.

---

## Section 5 — Publication Commitment

The following is published as part of the contract-commitment architecture's public accountability record:

| Metric | Publication format | Frequency |
| :--- | :--- | :--- |
| Number of active escrow accounts by programme type | Aggregate count; EC value by tier | Quarterly |
| Number of deployment window reviews triggered | Count; outcomes (extension / support / escalation) | Quarterly |
| Number of force majeure freeze applications by project; approvals, denials, total days frozen | Per-project summary | Quarterly |
| Inspector pool size, sector composition summary, disqualifications | Pool health report | Quarterly |
| Any project that has exhausted its force majeure cap | Named disclosure; status | On occurrence |
| CRP review outcomes for exceeded deployment windows | Full decision with rationale | Within 14 days of decision |

Publication of force majeure applications and outcomes converts the certification panel's decisions into public record. If the panel is approving a disproportionate share of applications from a particular sector or contractor, the pattern is visible. This is the mechanism that makes the P-017 oracle-independence requirement meaningful in this context: transparency supplements structural independence.

---

## Founding Coalition Instructions

To complete this annex before deployment, the founding coalition must:

1. **Determine the actual EC demurrage rate** and recalibrate the deployment window examples in Section 2 accordingly. If the demurrage rate is below 3% per year, deployment windows must be shortened or a separate rate must be specified for escrowed funds to maintain adequate institutional signal strength.

2. **Fill in all [FOUNDING COMMITMENT] fields** in Sections 1 through 4, using first-year pilot data where available. Where pilot data is not yet available, use the recommended anchors as starting positions:
   - High-value thresholds: 100k EC / 1M EC / 15% of project value
   - Deployment windows: 90 days (LC-essential) / 180 days (standard) / 365 days (large-scale)
   - Force majeure cap: 365 days absolute; capped at 25% of project duration for LC-essential programmes
   - Inspector pool: minimum 12 (pilot), 30 (regional), 75 per region (national); rotation per Section 4.2 anchors

3. **Determine whether the force majeure cap should scale with project duration** for standard infrastructure (see Section 3.2, Project A and B). A fixed 365-day cap is more predictable; a proportional cap (e.g., 20% of contracted duration) better reflects actual project risk profiles. This choice must be made before deployment.

4. **Specify the actual EC amounts and thresholds** in relation to the real price level in the pilot context. The absolute thresholds in Section 1 are illustrative only. "100,000 EC" is meaningless as a protection unless the founding coalition has established what a standard housing unit or clinic costs in EC and verified that 100,000 EC represents a significant but not exceptional milestone release.

5. **Commission the inspector pool** before the first escrow account is opened. Pool size must meet the minimum for the deployment scale; pool composition must satisfy Section 4.4 before any inspector makes any certification.

6. **Integrate contract-commitment architecture metrics into the Pillar 11 public dashboard** before any escrow account is opened. The publication commitment in Section 5 is a precondition of deployment, not a post-deployment addition.

---

## Relationship to Other Annexes

| Annex | Relationship |
| :--- | :--- |
| Annex AK (Identity AED) | Parallel structure — both are parameter-commitment annexes for P-004-protected terms. AK governs identity error tolerances; AR governs capital-deployment tolerances. The pattern is the same: explicit numbers, public commitment, annual review. |
| Annex AJ (Above-Ledger Bypass) | AJ defines what EC/LC boundary violations look like. P-023 forecloses the investment-channel boundary manipulation specifically; AR governs how. AJ-3.3 (anticipatory hoarding) is the upstream threat that P-023 + AR address. |
| Annex AL (P-017 Oracle Independence) | Inspector pool governance (Section 4) and force majeure certification panel composition are both governed by P-017 standards. Where AR refers to "P-017 oracle-independence standards," the specific requirements are defined in AL. |

---

*This document is Annex AR of the master protocol. The commitment architecture is operative as a PROPOSED standard. The specific numerical parameters are an evidence gate: committed at founding as design architecture, calibrated with specific numbers after first-year pilot data, and locked as Tier 2 before the first scale-up gate. The recommended anchor values in this annex are defensible starting positions, not pre-committed values — the founding coalition must explicitly accept, modify, or replace each one.*
