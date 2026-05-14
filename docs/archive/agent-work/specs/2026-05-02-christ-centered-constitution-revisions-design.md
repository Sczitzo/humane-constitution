# Christ-Centered Constitution Revisions — Design Spec

**Date:** 2026-05-02
**Status:** Approved — ready for implementation planning
**Source evaluation:** `docs/governance/Christ_Centered_Evaluation.md`

---

## Purpose

Address all shortcomings and misalignments identified in the Christ-centered evaluation of the Humane Constitution. Two categories of change:

1. **Additions** — 8 patch entries (P-035 through P-042), one per article/section, integrating the revision proposals inline into `Humane_Constitution.md`
2. **Removals/revisions** — specific phrases that overclaim, crowd out God's ordained communities, or use language incompatible with humility before God

**Core governing sentence (unchanged):** *The Humane Constitution must serve humanity under God; it must never become humanity's substitute for God.*

---

## Files Modified

- `docs/constitution/Humane_Constitution.md` — primary target; all additions and revisions
- `docs/governance/Patch_Log.md` — 8 new patch entries (P-035 through P-042)
- `app/src/generated/corpus.ts` + `app/public/generated/corpus.json` — regenerated after markdown changes

---

## Section 1: Additions (Patch Entries P-035 – P-042)

### P-035 — Foundation / §0A: Founding Group Corrigibility + Epistemic Humility

**Location in Constitution:** End of the Philosophical Preamble (after "Its claim is that its promises, weak points, and failure paths are visible.") and end of §0A.

**Addition 1 — Preamble:**
> *The founders of this system are not exempt from the failures it names. The same corruption, capture, and pride that threaten administrators will threaten founders. The founding group must be the first to submit to correction, not the last. This document is open to revision precisely because its authors are not beyond the need for it.*

**Addition 2 — §0A (after "It does not replace conscience, conviction, repentance, or God."):**
> *This system does not claim to reflect the mind of God. It reflects the best available human judgment about public order, which is fallible, partial, and in need of ongoing correction. Its claim to seriousness is not that it is right, but that it names its assumptions, makes its failure paths visible, and remains open to being shown where it is wrong.*

**Patch log fields:**
- Status: ACTIVE
- Related threat: T-generic (founding group capture)
- Core change: Add explicit founding-group corrigibility clause and epistemic humility statement to Preamble and §0A

---

### P-036 — Article I: Keyholder Servanthood Duty

**Location:** End of the Hard Locks paragraph in Article I (after the amendment architecture bullet list).

**Addition:**
> *The keyholders of the amendment process bear a special duty of servanthood. Their power is custodial, not proprietary. They may not use the amendment lock to entrench any founding group, extend any founding mandate, or delay review of the founding decisions themselves. The amendment protocol must include a mechanism by which a qualified independent review body may petition for the replacement of any keyholder found to be acting in demonstrable self-interest. Keyholder authority derives from service to the constitutional community, not from the fact of appointment.*

**Patch log fields:**
- Status: ACTIVE
- Related threat: T-generic (amendment lock capture)
- Core change: Add servanthood duty and replacement mechanism for keyholders acting in self-interest

---

### P-037 — Article II: Identity Serves the Person

**Location:** End of Article II section (after "Layered identity" bullet).

**Addition:**
> *Identity verification exists to serve the person, not to build a record of the person. The system must periodically review — no less than every three years — whether identity data is being used for any purpose beyond enabling access to essentials and preventing fraud. Any use of identity data for behavioral prediction, civic scoring, cross-system profiling, or research requires a separate deliberative authorization under Article VI and must carry a published sunset date. Sunset dates may be renewed but never made permanent by administrative action alone.*

**Patch log fields:**
- Status: ACTIVE
- Related threat: T-generic (identity creep / surveillance expansion)
- Core change: Add identity-serves-the-person clause with triennial review and sunset requirement on secondary data use

---

### P-038 — Article III: Community Voice in Measurement

**Location:** End of Article III section (after "Crisis fallback" bullet).

**Addition:**
> *Measurement systems must include the voices of those being measured. Communities experiencing scarcity have a direct challenge path to contest official capacity figures — a written submission to the oracle quorum that must receive a published response within 14 days. Expert measurement without community verification has a long history of systematic error. The people closest to scarcity are often the most accurate reporters of it. Community challenge submissions are published alongside the official figures they contest.*

**Patch log fields:**
- Status: ACTIVE
- Related threat: T-006 (oracle manipulation / institutional blindness)
- Core change: Add community challenge path for capacity measurement figures with 14-day response requirement

---

### P-039 — Article IV: Protection of Pre-Existing Care Networks

**Location:** End of Article IV section (after "No conversion" bullet).

**Addition:**
> *Article IV establishes a floor, not a monopoly on care. The system must actively support — and must not displace — pre-existing community networks that provide survival essentials: mutual aid groups, religious food pantries, family support structures, neighborhood care networks, and congregational outreach. Where such networks exist, the system collaborates with and strengthens them rather than routing around them. The presence of a constitutional delivery floor does not reduce the civic, moral, or spiritual value of personal generosity and communal care — it protects the conditions under which that generosity can freely operate.*

**Patch log fields:**
- Status: ACTIVE
- Related threat: T-generic (institutional crowding-out of voluntary community)
- Core change: Explicit protection for pre-existing mutual aid, family, and religious care networks; affirm Article IV as floor not monopoly

---

### P-040 — Article V: Housing Cap Pastoral Carve-Out + Structural Humility

**Location:** Two sub-additions.

**Addition 1 — Housing cap paragraph** (replace "the commons is not obligated to expand allocation beyond the cap regardless of household composition decisions"):
> *the commons is not obligated to expand allocation beyond the cap as a matter of fiscal guarantee; however, the cap is a resource constraint, not a judgment about family structure, size, or composition. Pastoral need — including large families, disability, caregiving, and multigenerational arrangements — must be met through the review process with a strong presumption of accommodation. Review panels must apply mercy before procedure.*

**Addition 2 — End of Article V** (new closing paragraph):
> *No mechanism in this Article should be designed with confidence that it eliminates human corruption. Structural separation, anti-conversion rules, demurrage, and use-rights tenure are necessary disciplines — they reduce the surface area of exploitation. But they do not substitute for the moral formation of persons, the faithfulness of communities, or the grace of God. Every provision in this Article assumes that people will attempt to subvert it. The question is not whether exploitation will occur but whether the community retains honest, accessible paths to name and correct it when it does.*

**Patch log fields:**
- Status: ACTIVE
- Related threat: T-generic (household penalization; structural overconfidence)
- Core change: Replace cold "regardless of household composition decisions" language; add closing structural humility clause to Article V

---

### P-041 — Article VI: Recognized Contribution Audit Requirement

**Location:** End of Article VI "Contribution and capability" subsection.

**Addition:**
> *The system must audit — no less than every two years — whether its definition of "recognized contribution" accurately reflects the full range of human service. Contributions that sustain community but resist easy measurement must not be systematically excluded from recognition simply because they are harder to verify: informal care, spiritual leadership in the community, neighborhood presence, mutual aid, and the patient, undocumented work of raising children and caring for the elderly are among the most important contributions any person makes to the common good. The measure of a contribution is its effect on human flourishing, not its documentary legibility. Audit findings must be published and, where gaps are found, must result in published corrections to the contribution-recognition framework within 180 days.*

**Patch log fields:**
- Status: ACTIVE
- Related threat: T-generic (civic exclusion of invisible work / "professional contributor" capture)
- Core change: Biennial audit of recognized-contribution definition to include invisible and pastoral work; 180-day correction requirement

---

### P-042 — Article VII: Community Alert Pathway

**Location:** End of Article VII "Warning systems" subsection.

**Addition:**
> *The warning system must include a direct voice mechanism for ordinary persons to report systemic failures they experience. Expert and institutional monitors watch what is measurable; affected communities often see what institutions cannot or will not name. A constitutionally protected community alert pathway — low-barrier, anonymous if the reporter chooses, accessible without legal representation or institutional affiliation — must be maintained alongside the formal audit system. Every community alert must receive a published acknowledgment within 30 days. Alerts that meet a basic prima facie threshold for systemic failure must trigger a formal review within 90 days. Refusal to acknowledge or review is itself a reportable failure under this Article.*

**Patch log fields:**
- Status: ACTIVE
- Related threat: T-generic (institutional capture of warning function; prophetic voices blocked)
- Core change: Add low-barrier community alert pathway with 30-day acknowledgment and 90-day review trigger

---

## Section 2: Removals / Revisions

### R-01 — Replace "regardless of household composition decisions"

Already addressed in P-040 Addition 1 above.

---

### R-02 — Replace all "may never" absolute certainty claims

**Instances to find and revise:**
- Article I: "Voice, Service Record, and Flow can never buy or condition basic rights" → "must not buy or condition basic rights, and any attempt to do so must trigger immediate independent review"
- Article V: "Tools do not convert by default" — keep this phrasing (it is not an absolute claim; it states the default rule)
- Article VI: "Voice may never purchase goods, private privilege, legal immunity, or survival access, and Service Record may never be traded" → "must not... and any evidence of such use must trigger audit and correction"

**Rationale:** "May never" implies an institution can guarantee absolute prevention. No human institution can. "Must not + accountability mechanism" is honest: it states the rule and acknowledges that rule-breaking requires a response, not a claim that the rule cannot be broken.

---

### R-03 — Add structural humility clause to Preamble Section IV

**Current text (Section IV, Preamble):** "Structural failure requires structural correction."

**Revised text:** "Structural failure requires structural correction. But structural correction is necessary, not sufficient. It cannot substitute for the moral transformation of persons, the faithfulness of communities, or dependence on God. Every structural safeguard will eventually be tested by human corruption; the question is whether communities remain willing to correct themselves."

**Rationale:** The original sentence, standing alone, implies that the right architecture solves the human problem. This is Babel-risk: confidence that a human system can contain what only God can transform. The addition does not remove the structural insight — it situates it correctly.

---

## Household Structure Phrase — Decision

**Keep as-is:** *"It does not judge lifestyle, relationship type, or household structure."*

**Rationale confirmed:** The state not adjudicating household structure is a subsidiarity principle consistent with Scripture. The church disciplines its own; the state does not. This phrase protects religious families, multigenerational arrangements, and all household forms from state surveillance of their intimate structure. Removing or revising it would move power from family and church toward state administration of household legitimacy — the opposite of the biblical order.

---

## Patch Log Additions Summary

| Patch | Article | Status | Core Change |
|---|---|---|---|
| P-035 | Foundation / §0A | ACTIVE | Founding group corrigibility + epistemic humility |
| P-036 | Article I | ACTIVE | Keyholder servanthood duty + replacement mechanism |
| P-037 | Article II | ACTIVE | Identity-serves-person clause + data sunset requirement |
| P-038 | Article III | ACTIVE | Community challenge path for capacity measurement |
| P-039 | Article IV | ACTIVE | Protection of pre-existing care networks |
| P-040 | Article V | ACTIVE | Housing cap pastoral revision + structural humility clause |
| P-041 | Article VI | ACTIVE | Biennial recognized-contribution audit |
| P-042 | Article VII | ACTIVE | Community alert pathway |

---

## Spec Self-Review Notes

- No TBDs or placeholders
- "May never" replacements are explicit: find the exact phrases, replace with "must not" + accountability trigger
- P-040 Addition 1 gives exact replacement text for the housing cap sentence
- All patch log entries have consistent format matching existing P-001–P-034 entries
- Corpus regeneration is required after all markdown changes — included as final step

---

## Verification

1. All 8 patches appear in `Humane_Constitution.md` as inline prose
2. `docs/governance/Patch_Log.md` has P-035 through P-042 entries with ACTIVE status
3. All "may never" instances in the Constitution replaced with "must not" + accountability mechanism
4. R-03 structural humility clause appears in Preamble Section IV
5. `npm run check:corpus` passes with no drift
6. `python3 ../scripts/validate_corpus.py` passes
