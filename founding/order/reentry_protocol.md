# Founding Order — Re-Entry Protocol

**Status:** ACTIVE — Proposal 5 close-out, 2026-04-18
**Authority:** Tier 1 (symmetric to exit; FC-120 / FC-122).
**Purpose:** Specify the procedure by which a unit that has previously exited (or never consented) may (re-)join the protocol.

---

## Core Rule

Re-entry uses the same procedural structure as initial accession (`consent_protocol.md §Accession`) with **no discriminatory restrictions** for previously-exited units. A unit that exited five years ago has the same re-entry rights as a unit that never consented.

The purpose of this rule is to make exit genuinely reversible. An exit that is practically one-way would pressure units to stay in an unwanted arrangement rather than accept a punitive re-entry cost later. Reversibility preserves the meaningfulness of the exit right.

Plain meaning: leaving is not a permanent punishment. A unit that left can come back under the same basic rules as a unit joining for the first time.

---

## The Re-Entry Procedure

### Phase 0 — Re-Entry Deliberation

Plain meaning: before re-entry, residents get a public discussion period and a chance to challenge process problems.

1. **Re-entry proposal published** at the unit's own public record and to the federation's drift chain acknowledgment queue.
2. **90-day deliberation window** (same as consent / accession). Public may challenge procedural irregularities; federation may publish a factual re-entry impact assessment.
3. **Federated Ombuds** (Annex AI) attests to procedural compliance of the deliberation.

### Phase 1 — Re-Entry Vote

Re-entry requires **2/3 of eligible resident-personhood** affirmative (matching FC-120). Procedural requirements identical to the consent event:
- Roll-call or equivalent verifiable record.
- 2/3 minimum participation.
- Individual-personhood certification.
- Ombuds attestation.

### Phase 2 — Federation Acknowledgment

Plain meaning: if the vote was valid, the federation must acknowledge re-entry unless there is a narrow process or boundary problem.

On successful re-entry vote:

1. **Unit submits re-entry petition** to the federation CRP with the vote record, deliberation artifacts, and demonstration of scale-eligibility.
2. **Federation publishes acknowledgment** within 60 days — may only refuse on procedural grounds (the vote did not meet requirements; the scale-tier bounds are not satisfied; the unit's geographic boundaries conflict with existing consenting units). Substantive refusal is not available.
3. **Drift chain records re-entry** as a federation-scope expansion event.
4. **Re-entry effective date** is 60 days after acknowledgment. This ramp-up allows federation infrastructure reconnection (Essential Access issuance, oracle coverage, enforcement registration).

---

## Treatment of Prior Service Records

A unit that re-enters after prior exit is treated, for protocol purposes, as a newly-consenting unit with the following carve-outs:

| Matter | Re-entry treatment |
| :--- | :--- |
| **Individual personhoods** who retained individual consent during the exit period | Continue with their individual civic records intact. Prior Voice and Service Record balances that decayed during exit stay decayed; they are not restored. |
| **Individual personhoods** who withdrew individual consent during or after exit | Treated as newly-consenting individuals on re-registration. Prior Voice and Service Record balances are not restored. |
| **Unit-level prior commitments** (e.g., a locality's pre-exit Voice sector-weight history) | Not restored. The unit begins re-entry civic history fresh. |
| **Pre-exit Essential Access-issuance history** | Not used as a basis for re-entry claims. Essential Access is issued going forward on the same basis as any consenting unit. |
| **Pre-exit enforcement adjudications** | Remain valid. A finding of violation before exit does not get erased by re-entry. Ongoing enforcement matters that paused at exit may resume. |
| **Pre-exit contributions to federation-wide infrastructure** | Not subject to restoration or compensation claims. Infrastructure contribution was part of the pre-exit arrangement. |

The principle: re-entry starts from today. Earlier choices still count, but the unit rejoins going forward.

---

## No Penalty for Re-Entry

There is **no re-entry fee**, **no probationary period**, **no restricted participation**, **no "second-class" status** for re-entered units. On the re-entry effective date, the unit has full participation rights identical to any consenting unit.

The only visible distinction is the public history: the drift chain preserves the unit's consent, exit, and re-entry records for audit. This is transparency, not penalty.

---

## Re-Exit After Re-Entry

A unit that has re-entered may subsequently exit again through the ordinary Exit Protocol. There is no limit on the number of exit/re-entry cycles a unit may complete.

However, **cycle integrity** is protected:
- An exit event cannot be initiated within **365 days** of a prior re-entry effective date. This prevents exit/re-entry abuse for strategic purposes (e.g., cycling in and out to avoid ongoing enforcement matters).
- If a unit files exit within the 365-day window, the Federated Ombuds investigates for procedural-integrity issues; the exit filing may be held in abeyance pending investigation.

The 365-day floor is an anti-churn rule. It prevents strategic in-and-out cycling without removing the underlying right to leave.

---

## Individual Re-Entry

An individual personhood who withdrew individual consent may re-consent at any time. The re-consent act is a simple individual publication to the federation's personhood registry; no unit-level vote is required (individual consent is the person's own act).

On individual re-consent:
- **Effective immediately.** Essential Access issuance resumes on the next cycle.
- **Prior civic history is not restored.** The individual begins a fresh Voice and Service Record history.
- **Prior enforcement matters remain** — a person with an open enforcement action that paused at withdrawal resumes the action on re-consent.

---

## Accession of Never-Consented Units

A unit that never consented to the protocol (e.g., a locality that was outside the founding scope) follows the Accession procedure in `consent_protocol.md` rather than the Re-Entry procedure. The procedures are nearly identical. The documents are separated so that "re-entry" means returning after exit, and "accession" means joining for the first time.

---

## The Symmetry Principle

Re-entry and exit are **procedurally symmetric**:
- Same supermajority (2/3 — FC-120).
- Same deliberation structure.
- Same minimum-participation floor.
- Same Ombuds oversight.
- Same drift-chain logging.

The only asymmetry is the timeline: exit has a 730-day unwind (FC-121); re-entry has a 60-day ramp-up. The unwind length reflects the complexity of withdrawing federation services without harming individuals. The ramp-up length reflects the (much simpler) task of reconnecting services.

This symmetry is itself a non-coercion guarantee: leaving and returning face the same basic hurdle, so the protocol cannot trap units by making exit or return unfairly hard.

---

## Governance

Re-entry rules are Tier 1 protected. The no-penalty rule, the procedural-symmetry rule, and the forward-only civic-history rule cannot be weakened without 7-of-9 amendment.

Strengthening of re-entry rights (e.g., shorter ramp-up, simpler procedure) may proceed by Tier 2 amendment.

---

*Re-entry closes the loop on exit. A protocol that is hard to leave is suspect; a protocol that is hard to return to is punitive. This protocol is neither.*
