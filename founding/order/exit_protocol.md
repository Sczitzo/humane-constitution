# Founding Order — Exit Protocol

**Status:** ACTIVE — Proposal 5 close-out, 2026-04-18
**Authority:** Tier 1 (FC-120 supermajority threshold, FC-121 unwind window).
**Purpose:** Specify the procedure by which a locality, region, or larger unit may withdraw from the protocol and return to pre-protocol arrangements.

---

## Core Rule

Any unit at **locality scale or larger** may, by affirmative supermajority of its resident-personhood, initiate a graceful-exit unwind. The unwind lasts **730 days (FC-121)**. At the end of unwind, the unit is outside the protocol's operational scope except for the Tier 1 human-dignity floor (CSM).

**Threshold.** **2/3 of eligible resident-personhood** of the unit must vote affirmative to initiate exit (FC-120). This is the same threshold as consent, for the same reason: asymmetric thresholds create capture pathways. A unit that could consent on 2/3 but could only exit on 3/4 would be a trap.

**Who is eligible to exit:**
- **Locality** — yes.
- **Region** — yes.
- **A sub-partition of the federation** (e.g., a coordinated set of contiguous regions acting together) — yes, as a joint exit event.
- **Neighborhood** — no (exit is not available at neighborhood scale).
- **Household** — no.
- **Individual personhood** — uses individual-consent withdrawal (`consent_protocol.md §Individual consent withdrawal`), not the unit exit protocol.

The smallest-scale minimum for exit is locality because below locality the administrative coherence of unwind (LC continuity, oracle coverage, enforcement handoff) cannot be practically maintained, and smaller-scale dissent is more effectively handled through internal customization (subsidiarity rule) or individual relocation.

---

## The Exit Procedure

### Phase 0 — Pre-Exit Deliberation (Days -180 to 0)

1. **Exit proposal published** at the unit's public record and federation drift chain. The proposal includes:
   - Unit identity and scale.
   - Stated reasons for exit (not required to satisfy any standard, but published).
   - Proposed effective date of the exit vote.
   - Identification of the post-exit governance arrangement that the unit will return to or adopt.
2. **180-day deliberation window** during which the public has the right to review, challenge, and submit counter-proposals. The federation may publish an "exit impact assessment" — a factual assessment of what the unit stands to lose and retain — but may not publish arguments for or against the exit beyond factual description.
3. **The Federated Ombuds** (Annex AI) monitors the deliberation for procedural integrity — specifically, for signs of coerced voting, manipulated rolls, or suppressed dissent. Ombuds findings are published.

### Phase 1 — Exit Vote

The exit vote follows the same procedural requirements as a consent event (`consent_protocol.md §The Consent Act`):
- 2/3 of eligible resident-personhood must vote affirmative (FC-120).
- Minimum participation: 2/3 of eligible personhood must participate (affirm, oppose, or actively abstain).
- Roll-call or equivalent verifiable record.
- Individual-personhood certification of participation.
- Federation Ombuds attestation of procedural compliance.

If threshold is not met, exit fails and may not be re-proposed for 365 days (to prevent exit-fatigue harassment).

If threshold is met, the exit is activated and the unwind window (FC-121 = 730 days) begins.

### Phase 2 — Unwind (Days 0 to 730)

During the 730-day unwind, all of the following apply:

| Element | Unwind treatment |
| :--- | :--- |
| **LC entitlements to individuals in the exiting unit** | **Continue at full federation rate** throughout the unwind. This is unconditional — a person's LC does not degrade because their unit is exiting. At the end of unwind, individuals who remain in the unit lose federation-issued LC (they may continue as individual-consented personhoods if they individually consent and the post-exit unit does not block federation's CSM reach). |
| **EC balances held by individuals in the exiting unit** | **Fully convertible** at prevailing rate throughout the unwind. No exchange controls. No demurrage anomalies. Individuals may transfer EC out of the exiting unit freely. |
| **DW/CR balances** | **Decay normally**. No accelerated decay. No grandfathering. A person who earned CR under the protocol continues to hold it until it decays; if they relocate to a consenting unit within the unwind, the CR continues to apply. If they remain in the exiting unit, CR decays to zero by the ordinary rule (FC-062 = 0.15/day after the DW-feed-rate transition) and they no longer have federation civic standing. |
| **SQ rationing** | **Continues at the federation-set level for the category**. The exiting unit does not gain early relief from rationing during unwind (that would create a perverse incentive to exit during supply stress). It also does not face punitive rationing (that would be coercion). |
| **Enforcement** | Annex AJ §4 enforcement continues to apply to federation-instrument misconduct during unwind. Post-unwind, federation enforcement reach ends, with limited carve-outs for fraudulent acts committed during the protocol scope that are not discovered until after unwind (these remain federation-adjudicable per the statute-of-limitations rule published with the exit agreement). |
| **Federation infrastructure** | Federation continues to operate oracle, measurement, and LC-issuance infrastructure serving the exiting unit until unwind ends. Federation may not preemptively withdraw infrastructure during unwind. |
| **Human-dignity floor (CSM)** | **Unaffected**. CSM applies during unwind and after unwind. If the exiting unit cannot or will not provide CSM post-exit, federation retains unconditional humanitarian access per `consent_protocol.md §Non-Consenting Units — Human-dignity provisioning reach`. |

### Phase 3 — Post-Unwind (Day 730+)

On day 730 after exit vote:

1. **The unit is no longer within the protocol's operational scope** except for the CSM floor and any pending enforcement matters.
2. **Federation infrastructure is withdrawn** with 90 additional days of handoff overlap. The federation publishes technical documentation of any federation-built infrastructure in the unit to facilitate continuity under the unit's post-exit governance.
3. **Federation representation from the exiting unit is deemed vacated.** Any CRP seats held by delegates from the exiting unit are re-apportioned.
4. **Drift chain logs the exit.** A new drift-chain row records the federation scope reduction, signatures of the exiting unit's representatives, and 7-of-9 Tier 1 holder acknowledgment (Tier 1 acknowledgment is procedural — the holders verify that the exit met the published requirements — not substantive consent; they may not block a valid exit).
5. **Re-entry pathway remains open** per `reentry_protocol.md`.

---

## What the Exiting Unit Retains

The exit is structured to preserve individual standing wherever possible:

- **Individual-personhood consent** — persons who were individually consented remain so unless they individually withdraw. They may relocate to any consenting unit and resume full protocol participation.
- **Pre-exit contributions** — work performed under the protocol that earned CR/DW is not retroactively clawed back. The exit terminates forward participation, not past transactions.
- **Accrued EC** — fully portable, fully convertible during unwind.
- **Pre-exit enforcement protections** — a person harmed under the protocol before exit retains the right to federation adjudication of the harm, even if the adjudication concludes after unwind.

---

## What the Exiting Unit Loses

- **Representation in the CRP and federation decision bodies.**
- **Federation-provisioned LC** (except for the CSM floor — see below).
- **Federation oracle and measurement services.**
- **Federation enforcement protection** against most conduct originating within the unit (except human-dignity floor violations, which remain federation-enforceable as crimes-against-humanity-equivalent).
- **Access to Tier 2 amendment participation** for federation-scope rules going forward.

---

## Bounded Exit Cost — The Non-Coercion Guarantee

A central design principle of the exit protocol is **bounded exit cost**: exit must be costly enough that it is not casual, but not so costly that it functions as coercion-by-attrition.

The protocol's exit cost consists of:
- **180-day pre-exit deliberation** — gives time for reconsideration but does not delay exit indefinitely.
- **730-day unwind** — gives time for infrastructure transition, individual relocation, and economic re-organization. Does not punish the exiting unit; LC continues at full rate, EC is convertible, infrastructure continues to operate.
- **Loss of forward federation benefits** — the legitimate cost of withdrawing from a joint enterprise.

There is **no exit tax**, **no forfeiture of accrued assets**, **no prohibition on resource export**, **no restriction on relocation**. A unit that exits may liquidate, relocate, or reorganize as its residents choose.

This is the essential non-coercion guarantee: the protocol does not bind through lock-in. It binds through continued consent, renewed daily by the fact that residents have not chosen exit.

---

## Exit Denial — T-026

**Threat class:** Exit Denial — federation actors (or captured federation subset) attempt to block or delay a valid exit event.

**Prohibited conduct:**
- Refusing to publish exit proposal on federation record.
- Manipulating the exit impact assessment to bias the deliberation.
- Withholding LC from the exiting unit during unwind (violates FC-121 unwind terms).
- Preemptively withdrawing federation infrastructure before day 730+90.
- Blocking re-apportionment of the exited unit's CRP seats.
- Filing pretextual enforcement actions against exiting-unit representatives.
- Refusing to update the drift chain with the exit row.

**Enforcement:** All exit-denial conduct is heard by the Federated Ombuds under Annex AI §3.2 item 4 (Enforcement Panel appeals) or §3.4 (automatic Plenum convocation). Findings require 4-of-5 Plenum vote (FC-091).

**Remedies for established exit denial:**
- Order of specific performance compelling the federation to publish, provision, or acknowledge as required.
- Penalty against federation actors under Annex AJ §4 severity 3 (Institutional) — the most severe tier.
- Drift-chain log of the exit denial as a federation-integrity event.
- If exit denial is not cured within 90 days of Plenum finding, the unwind window is automatically extended by the period of denial, with the federation bearing the continuation-cost of infrastructure during extension.

---

## Governance of This Protocol

FC-120 (2/3 supermajority), FC-121 (730-day unwind), and the prohibition of exit taxes / forfeitures are **Tier 1 protected**. Any amendment weakening exit rights requires the full 7-of-9 / 180-day timelock.

Amendments that **strengthen** exit rights (e.g., shortening the unwind to 365 days, lowering the supermajority to simple majority, expanding exit eligibility to neighborhood scale) may proceed by Tier 2 amendment with affected-scale consent.

The asymmetry — strengthening is easier than weakening — mirrors the design of the CSM amendment lock (Annex Y §Y5). Rights to non-coercion can be expanded by ordinary process; they cannot be narrowed without the full procedure.

---

*Exit is the last-resort protection that makes every prior protection credible. A captured federation that cannot be left is simply occupation with a more humane face. This protocol refuses that bargain.*
