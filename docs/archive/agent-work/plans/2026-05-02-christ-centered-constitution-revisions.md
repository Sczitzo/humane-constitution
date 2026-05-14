# Christ-Centered Constitution Revisions — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 8 inline additions (P-035–P-042) and 3 phrase revisions (R-01–R-03) to the Humane Constitution, record all patches in the Patch Log, and regenerate the corpus.

**Architecture:** All edits target `docs/constitution/Humane_Constitution.md` directly. Each task adds one patch to the Constitution and one entry to `docs/governance/Patch_Log.md`. Final task regenerates and validates the corpus. No code changes — this is a markdown document revision.

**Tech Stack:** Markdown, Python corpus script (`scripts/export_corpus.py`), npm (`app/`).

---

## File Map

| File | Role |
|---|---|
| `docs/constitution/Humane_Constitution.md` | Primary target — all inline additions and phrase revisions |
| `docs/governance/Patch_Log.md` | Patch inventory — 8 new entries, inventory table updated |
| `app/src/generated/corpus.ts` | Auto-generated — do not edit by hand |
| `app/public/generated/corpus.json` | Auto-generated — do not edit by hand |

**Working directory for corpus commands:** `app/` (always `cd app` before running npm scripts).

**Verify corpus sync command:** `cd app && npm run check:corpus` — exits 0 if clean, non-zero if drift detected.

---

## Task 1: R-03 — Add structural humility clause to Preamble Section IV

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Preamble, Section IV, ~line 54)

This is the highest-priority revision — it corrects the theological overconfidence at the root of the document. Do it first so all subsequent additions build on a humbler foundation.

- [ ] **Step 1: Find the exact text to modify**

Open `docs/constitution/Humane_Constitution.md`. Find Section IV "Why Policy Cannot Fix This" — it ends with:

```
> **Structural failure requires structural correction.**
```

- [ ] **Step 2: Replace that blockquote with the expanded version**

Replace:
```markdown
> **Structural failure requires structural correction.**
```

With:
```markdown
> **Structural failure requires structural correction. But structural correction is necessary, not sufficient. It cannot substitute for the moral transformation of persons, the faithfulness of communities, or dependence on God. Every structural safeguard will eventually be tested by human corruption; the question is whether communities remain willing to correct themselves.**
```

- [ ] **Step 3: Verify the change looks right**

Run: `grep -n "structural correction" "docs/constitution/Humane_Constitution.md"`
Expected: one line containing the full expanded blockquote.

- [ ] **Step 4: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md"
git commit -m "fix(constitution): add structural humility clause to Preamble §IV (R-03)"
```

---

## Task 2: R-02 — Replace "may never" absolute certainty claims

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Articles I, V, VI)

"May never" implies a human institution can guarantee absolute prevention. "Must not + accountability trigger" is honest.

- [ ] **Step 1: Find all "may never" and "can never" instances**

Run: `grep -n "may never\|can never" "docs/constitution/Humane_Constitution.md"`

Expected instances to find (verify line numbers match):
1. Article I: `"Voice, Service Record, and Flow can never buy or condition basic rights"`
2. Article VI: `"Voice may never purchase goods, private privilege, legal immunity, or survival access, and Service Record may never be traded, inherited, collateralized, or pooled as a patronage asset"`

- [ ] **Step 2: Replace instance 1 (Article I)**

Find:
```
**No coercion:** Voice, Service Record, and Flow can never buy or condition basic rights.
```

Replace with:
```
**No coercion:** Voice, Service Record, and Flow must not buy or condition basic rights. Any evidence of such use must trigger immediate independent review and published findings within 30 days.
```

- [ ] **Step 3: Replace instance 2 (Article VI — monetary architecture section)**

Find:
```
**Anti-capture rule:** Voice may never purchase goods, private privilege, legal immunity, or survival access, and Service Record may never be traded, inherited, collateralized, or pooled as a patronage asset.
```

Replace with:
```
**Anti-capture rule:** Voice must not purchase goods, private privilege, legal immunity, or survival access, and Service Record must not be traded, inherited, collateralized, or pooled as a patronage asset. Any evidence of such use must trigger audit and published correction within 60 days.
```

- [ ] **Step 4: Verify no "may never" or "can never" remain**

Run: `grep -n "may never\|can never" "docs/constitution/Humane_Constitution.md"`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md"
git commit -m "fix(constitution): replace absolute 'may never' with 'must not' + accountability triggers (R-02)"
```

---

## Task 3: P-035 — Foundation / §0A: Founding group corrigibility + epistemic humility

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Preamble closing paragraph; §0A closing paragraph)

- [ ] **Step 1: Find the Preamble closing paragraph**

Find this text (near end of Philosophical Preamble, before "Document role"):
```
This project was built in public and stress-tested against bad uses. If it is wrong, people should be able to show where. If it is incomplete, people should be able to improve it. Its claim to seriousness is not perfection. Its claim is that its promises, weak points, and failure paths are visible.
```

- [ ] **Step 2: Add the corrigibility clause after that paragraph**

Insert this as a new paragraph immediately after:
```markdown
The founders of this system are not exempt from the failures it names. The same corruption, capture, and pride that threaten administrators will threaten founders. The founding group must be the first to submit to correction, not the last. This document is open to revision precisely because its authors are not beyond the need for it.
```

- [ ] **Step 3: Find the §0A closing sentence**

In section `### 0A. Moral Scope, Spiritual Limits, and Stewardship Orientation`, find the last sentence of the main body (before the **God-honoring civic commitments** subsection):

```
No part of this system replaces truth, virtue, worship, repentance, or reverence before God. It regulates public order. It does not replace conscience, conviction, repentance, or God.
```

- [ ] **Step 4: Add the epistemic humility clause after that sentence**

Insert immediately after, as a new paragraph:
```markdown
This system does not claim to reflect the mind of God. It reflects the best available human judgment about public order, which is fallible, partial, and in need of ongoing correction. Its claim to seriousness is not that it is right, but that it names its assumptions, makes its failure paths visible, and remains open to being shown where it is wrong.
```

- [ ] **Step 5: Verify both insertions**

Run: `grep -n "founding group must be the first\|best available human judgment" "docs/constitution/Humane_Constitution.md"`
Expected: two matching lines.

- [ ] **Step 6: Add P-035 to Patch Log**

Open `docs/governance/Patch_Log.md`.

Add to the inventory table (after the P-034 row):
```markdown
| P-035 | — | **ACTIVE** | High | Founding group corrigibility clause + epistemic humility statement in Preamble and §0A. |
```

Add a new detail section after the P-034 detail block:

```markdown
---

### P-035 — Founding Group Corrigibility and Epistemic Humility

**Threat addressed:** founding group capture / Babel-risk (structural overconfidence)
**Status:** ACTIVE | **Priority:** High

**Constitutional text:** Philosophical Preamble (closing paragraph) and §0A (Moral Scope, Spiritual Limits, and Stewardship Orientation)

**Problem diagnosed:**
The Preamble's statement "If it is wrong, people should be able to show where" is passive — it does not explicitly subject the founding group to the same corrigibility requirements it names for administrators. The rhetorical confidence of the document ("structural failure requires structural correction") can imply that the design team has solved a problem that only ongoing moral community and dependence on God can sustain. This creates Babel-risk: a system that trusts its own architecture more than it trusts the communities and the God it claims to serve.

**Introduced design:**
- Preamble: explicit statement that founders are not exempt from the failures named in the document; the founding group must be the first to submit to correction.
- §0A: explicit statement that the system does not claim to reflect the mind of God; it reflects fallible human judgment that remains open to correction.

**New risks introduced:**
- Overly humble framing could be exploited to argue that all constitutional protections are provisional and subject to removal. Mitigated: the epistemic humility clauses apply to the founders' judgment about design, not to the dignity floor itself (which is separately protected by Tier 1 amendment requirements).

**Residual risk:** Founding group may still exercise disproportionate influence during the founding window. The corrigibility clause is a normative commitment, not a structural enforcement mechanism. Structural enforcement is addressed by P-036 (keyholder replacement mechanism).
```

- [ ] **Step 7: Verify patch log entry**

Run: `grep -n "P-035" "docs/governance/Patch_Log.md"`
Expected: two lines — one in the inventory table, one in the detail section.

- [ ] **Step 8: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md" "docs/governance/Patch_Log.md"
git commit -m "feat(constitution): P-035 founding group corrigibility + epistemic humility (Preamble, §0A)"
```

---

## Task 4: P-036 — Article I: Keyholder servanthood duty

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Article I, Hard locks paragraph)
- Modify: `docs/governance/Patch_Log.md`

- [ ] **Step 1: Find the Hard locks paragraph in Article I**

Find this text in the Article I section:
```
**Hard locks:** Tier 1 rules are mechanically protected through the `architecture/` directory: 7-of-9 amendment, 180-day delay, drift chain, and implementation binding.
```

- [ ] **Step 2: Add the keyholder servanthood clause after that bullet**

Insert as a new bullet immediately after:
```markdown
- **Keyholder duty of servanthood:** The keyholders of the amendment process hold custodial, not proprietary, authority. They may not use the amendment lock to entrench any founding group, extend any founding mandate, or delay review of the founding decisions themselves. The amendment protocol must include a mechanism by which a qualified independent review body may petition for the replacement of any keyholder found to be acting in demonstrable self-interest. Keyholder authority derives from service to the constitutional community, not from the fact of appointment.
```

- [ ] **Step 3: Verify insertion**

Run: `grep -n "custodial, not proprietary" "docs/constitution/Humane_Constitution.md"`
Expected: one matching line.

- [ ] **Step 4: Add P-036 to Patch Log inventory table**

Add after the P-035 row:
```markdown
| P-036 | — | **ACTIVE** | High | Keyholder servanthood duty + replacement mechanism for self-interested keyholders (Article I). |
```

- [ ] **Step 5: Add P-036 detail section**

Add after the P-035 detail block:
```markdown
---

### P-036 — Keyholder Servanthood Duty

**Threat addressed:** amendment lock capture by founding group
**Status:** ACTIVE | **Priority:** High

**Constitutional text:** Article I — Rights & Rules (Hard locks section)

**Problem diagnosed:**
The 7-of-9 amendment lock protects the dignity floor from bad changes. But the same lock also protects the founders' judgment about what the dignity floor contains. If keyholders act in self-interest — delaying replacement of founding-era text, blocking challenges to their own authority — the lock becomes a tool of entrenchment rather than protection. This is structurally inconsistent with servant-leadership (Mark 10:42–45).

**Introduced design:**
Explicit constitutional statement that keyholder authority is custodial, not proprietary; keyholders may not use the lock to entrench founding group power; a qualified independent review body may petition for keyholder replacement when self-interest is demonstrated.

**Dependencies:** The independent review body referenced here is the Federated Ombuds structure defined under P-025.

**New risks introduced:**
- "Demonstrable self-interest" requires interpretation. Mitigated: determination is made by the Federated Ombuds (P-025), not by the keyholders themselves.

**Residual risk:** External pressure on keyholders (coercion, blackmail) is not addressed by internal accountability mechanisms. See P-034 residual risk for the same limitation.
```

- [ ] **Step 6: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md" "docs/governance/Patch_Log.md"
git commit -m "feat(constitution): P-036 keyholder servanthood duty and replacement mechanism (Article I)"
```

---

## Task 5: P-037 — Article II: Identity serves the person

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Article II, end of section)
- Modify: `docs/governance/Patch_Log.md`

- [ ] **Step 1: Find the end of the Article II section**

Find the last bullet in Article II:
```
**Layered identity:** identity checks are stronger only when consequences are higher. No single document, biometric, institution, or device may become the only irreversible source of identity.
```

- [ ] **Step 2: Add the identity-serves-person clause after that bullet**

Insert as a new bullet immediately after:
```markdown
- **Identity serves the person:** Identity verification exists to serve the person, not to build a record of the person. The system must review — no less than every three years — whether identity data is being used for any purpose beyond enabling access to essentials and preventing fraud. Any use of identity data for behavioral prediction, civic scoring, cross-system profiling, or research requires a separate deliberative authorization under Article VI and must carry a published sunset date. Sunset dates may be renewed but never made permanent by administrative action alone.
```

- [ ] **Step 3: Verify insertion**

Run: `grep -n "Identity serves the person" "docs/constitution/Humane_Constitution.md"`
Expected: one matching line.

- [ ] **Step 4: Add P-037 to Patch Log**

Add to inventory table after P-036:
```markdown
| P-037 | — | **ACTIVE** | High | Identity-serves-person clause with triennial review and sunset requirement on secondary data use (Article II). |
```

Add detail section after P-036:
```markdown
---

### P-037 — Identity Serves the Person

**Threat addressed:** identity system creep / surveillance expansion
**Status:** ACTIVE | **Priority:** High

**Constitutional text:** Article II — Personhood, Identity & Continuity

**Problem diagnosed:**
Any identity system faces institutional pressure to expand verification requirements, cross-reference databases, and build behavioral profiles over time. The prohibitions in Article II are stated but not structurally reviewed the way the survival floor is enforced. Without a mandatory review cycle, "minimum data for minimum access" tends to expand into a comprehensive scoring regime.

**Introduced design:**
Mandatory triennial review of identity data use; secondary use (behavioral prediction, civic scoring, profiling, research) requires Article VI deliberative authorization with a published sunset date that cannot be made permanent by administrative action alone.

**New risks introduced:**
- Review cycles could be gamed or delayed. Mitigated: triennial requirement is constitutional; delay beyond the cycle is a reportable failure under Article VII.

**Residual risk:** Administrative pressure to expand identity data use will recur in each review cycle. The review requirement creates a forcing function but does not eliminate the pressure.
```

- [ ] **Step 5: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md" "docs/governance/Patch_Log.md"
git commit -m "feat(constitution): P-037 identity-serves-person clause with triennial review (Article II)"
```

---

## Task 6: P-038 — Article III: Community voice in measurement

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Article III, end of section)
- Modify: `docs/governance/Patch_Log.md`

- [ ] **Step 1: Find the end of the Article III section**

Find the last bullet in Article III:
```
**Crisis fallback:** if measurement fails, the system uses published fallback rules, conservative defaults, reserve triggers, and automatic review.
```

- [ ] **Step 2: Add the community challenge clause after that bullet**

Insert as a new bullet immediately after:
```markdown
- **Community voice in measurement:** Measurement systems must include the voices of those being measured. Communities experiencing scarcity have a direct challenge path to contest official capacity figures — a written submission to the oracle quorum that must receive a published response within 14 days. Expert measurement without community verification has a long history of systematic error. Community challenge submissions are published alongside the official figures they contest.
```

- [ ] **Step 3: Verify insertion**

Run: `grep -n "Community voice in measurement" "docs/constitution/Humane_Constitution.md"`
Expected: one matching line.

- [ ] **Step 4: Add P-038 to Patch Log**

Add to inventory table after P-037:
```markdown
| P-038 | T-006 | **ACTIVE** | High | Community challenge path for capacity measurement figures with 14-day published response (Article III). |
```

Add detail section after P-037:
```markdown
---

### P-038 — Community Voice in Measurement

**Threat addressed:** T-006 (oracle institutional blindness / measurement capture)
**Status:** ACTIVE | **Priority:** High

**Constitutional text:** Article III — Real Capacity & Reserves

**Problem diagnosed:**
The oracle quorum defends against manipulation but not against shared institutional blindness — the systematic tendency of measurement systems to reflect the assumptions of the institutions that design them rather than the lived reality of affected communities. People closest to scarcity are often the most accurate reporters of it, and they currently have no direct input path.

**Introduced design:**
Constitutional community challenge path: written submission to oracle quorum, mandatory 14-day published response, challenge submissions published alongside official figures.

**Dependencies:** Oracle quorum publication infrastructure must support community submission intake and co-publication.

**New risks introduced:**
- Challenge system could be flooded with bad-faith submissions. Mitigated: "prima facie" threshold for mandatory response; frivolous submissions published but not required to trigger issuance adjustment.

**Residual risk:** Communities with less documentation capacity will use the challenge path less. Outreach and accessibility design are required to close this gap — not addressed by this patch alone.
```

- [ ] **Step 5: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md" "docs/governance/Patch_Log.md"
git commit -m "feat(constitution): P-038 community challenge path for capacity measurement (Article III)"
```

---

## Task 7: P-039 — Article IV: Protection of pre-existing care networks

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Article IV, end of section)
- Modify: `docs/governance/Patch_Log.md`

- [ ] **Step 1: Find the end of the Article IV section**

Find the last bullet in Article IV:
```
**Shortage interface:** during declared shortage, Shared Storehouse may supplement Essential Access and must end when shortage mode ends.
```

- [ ] **Step 2: Add the care network protection clause after that bullet**

Insert as a new bullet immediately after:
```markdown
- **Pre-existing care networks:** Article IV establishes a floor, not a monopoly on care. The system must actively support — and must not displace — pre-existing community networks that provide survival essentials: mutual aid groups, religious food pantries, family support structures, neighborhood care networks, and congregational outreach. Where such networks exist, the system collaborates with and strengthens them rather than routing around them. The presence of a constitutional delivery floor does not reduce the civic, moral, or spiritual value of personal generosity and communal care — it protects the conditions under which that generosity can freely operate.
```

- [ ] **Step 3: Verify insertion**

Run: `grep -n "establishes a floor, not a monopoly" "docs/constitution/Humane_Constitution.md"`
Expected: one matching line.

- [ ] **Step 4: Add P-039 to Patch Log**

Add to inventory table after P-038:
```markdown
| P-039 | — | **ACTIVE** | High | Explicit protection for pre-existing mutual aid, family, and religious care networks; Article IV as floor not monopoly (Article IV). |
```

Add detail section after P-038:
```markdown
---

### P-039 — Protection of Pre-Existing Care Networks

**Threat addressed:** institutional crowding-out of voluntary community
**Status:** ACTIVE | **Priority:** High

**Constitutional text:** Article IV — Survival

**Problem diagnosed:**
A comprehensive constitutional delivery floor for survival essentials can inadvertently displace the mutual aid groups, religious food pantries, family networks, and neighborhood care structures that communities depend on — especially when the delivery system fails. Communities that retain pre-existing care networks are more resilient than those dependent solely on the constitutional delivery layer. The document must explicitly protect and strengthen, not crowd out, these networks.

**Introduced design:**
Constitutional statement that Article IV is a floor not a monopoly; explicit duty to support pre-existing care networks; affirmation that the constitutional floor protects the conditions for voluntary generosity rather than replacing it.

**New risks introduced:**
- "Must not displace" is a normative commitment that is difficult to enforce mechanically. Mitigated: Article VII warning system can measure whether voluntary care networks are growing or shrinking post-implementation.

**Residual risk:** Economic logic of consolidated delivery systems tends to crowd out smaller providers regardless of constitutional intent. Periodic measurement and active funding of voluntary-sector infrastructure are required — not addressed by this patch alone.
```

- [ ] **Step 5: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md" "docs/governance/Patch_Log.md"
git commit -m "feat(constitution): P-039 protection of pre-existing care networks (Article IV)"
```

---

## Task 8: P-040 — Article V: Housing cap pastoral revision + structural humility

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Article V — two locations)
- Modify: `docs/governance/Patch_Log.md`

- [ ] **Step 1: Find the housing cap sentence in Article V**

Find this exact text:
```
the commons is not obligated to expand allocation beyond the cap regardless of household composition decisions.
```

- [ ] **Step 2: Replace that phrase**

Replace:
```
the commons is not obligated to expand allocation beyond the cap regardless of household composition decisions.
```

With:
```
the commons is not obligated to expand allocation beyond the cap as a matter of fiscal guarantee; however, the cap is a resource constraint, not a judgment about family structure, size, or composition. Pastoral need — including large families, disability, caregiving, and multigenerational arrangements — must be met through the review process with a strong presumption of accommodation. Review panels must apply mercy before procedure.
```

- [ ] **Step 3: Find the end of the Article V section**

Find the closing paragraph of Article V:
```
**Why these functions share one article.** Flow, housing and commons use-rights, enterprise activity, and commons-revenue routing are the four faces of the same economic surface. Keeping them under one article reduces boundary disputes and narrows the capture surface.
```

- [ ] **Step 4: Add the structural humility clause after that paragraph**

Insert as a new paragraph immediately after:
```markdown
No mechanism in this Article should be designed with confidence that it eliminates human corruption. Structural separation, anti-conversion rules, demurrage, and use-rights tenure are necessary disciplines — they reduce the surface area of exploitation. But they do not substitute for the moral formation of persons, the faithfulness of communities, or the grace of God. Every provision in this Article assumes that people will attempt to subvert it. The question is not whether exploitation will occur but whether the community retains honest, accessible paths to name and correct it when it does.
```

- [ ] **Step 5: Verify both changes**

Run:
```bash
grep -n "pastoral need\|mercy before procedure" "docs/constitution/Humane_Constitution.md"
grep -n "moral formation of persons" "docs/constitution/Humane_Constitution.md"
```
Expected: one line each.

- [ ] **Step 6: Add P-040 to Patch Log**

Add to inventory table after P-039:
```markdown
| P-040 | — | **ACTIVE** | High | Housing cap pastoral revision (remove cold "regardless" language); structural humility closing clause added to Article V. |
```

Add detail section after P-039:
```markdown
---

### P-040 — Article V Housing Cap Pastoral Revision and Structural Humility

**Threat addressed:** household penalization; Babel-risk structural overconfidence
**Status:** ACTIVE | **Priority:** High

**Constitutional text:** Article V — Markets, Commons & Public Finance (housing allocation section; closing paragraph)

**Problem diagnosed:**
(1) The phrase "regardless of household composition decisions" treated a resource constraint as though it were a judgment about family structure. Large families, multigenerational households, and care-intensive arrangements may find the cap hostile if applied without a pastoral presumption of accommodation.
(2) Article V's closing paragraph presented the five-instrument architecture with confidence that the design prevents exploitation. This exceeds what human institutions can reliably deliver; structural discipline reduces exploitation but does not eliminate it.

**Introduced design:**
(1) Housing cap language revised: "fiscal guarantee" framing retained; pastoral review with strong presumption of accommodation added; "mercy before procedure" standard stated.
(2) Structural humility closing paragraph added: names the limits of structural engineering and requires ongoing community paths to name and correct exploitation.

**New risks introduced:**
- "Strong presumption of accommodation" may be interpreted to override the cap entirely. Mitigated: "fiscal guarantee" framing preserved — the commons does not owe unlimited expansion; the review process applies mercy within real resource constraints.

**Residual risk:** Review panels may apply "mercy before procedure" inconsistently across communities. Published review criteria and appeals paths (already present in Article V) are the mitigation; this patch adds the normative standard.
```

- [ ] **Step 7: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md" "docs/governance/Patch_Log.md"
git commit -m "feat(constitution): P-040 housing cap pastoral revision + Article V structural humility (Article V)"
```

---

## Task 9: P-041 — Article VI: Recognized-contribution audit requirement

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Article VI, "Contribution and capability" subsection)
- Modify: `docs/governance/Patch_Log.md`

- [ ] **Step 1: Find the end of the "Contribution and capability" subsection in Article VI**

Find the last bullet in that subsection:
```
**High-impact claims need strong review:** rare Service Record or Voice boosts require independent panels, published criteria, and category-balance safeguards.
```

- [ ] **Step 2: Add the contribution audit clause after that bullet**

Insert as a new bullet immediately after:
```markdown
- **Recognized-contribution audit:** The system must audit — no less than every two years — whether its definition of "recognized contribution" accurately reflects the full range of human service. Contributions that sustain community but resist easy measurement must not be systematically excluded simply because they are harder to verify: informal care, spiritual leadership in the community, neighborhood presence, mutual aid, and the patient work of raising children and caring for the elderly are among the most important contributions any person makes to the common good. The measure of a contribution is its effect on human flourishing, not its documentary legibility. Audit findings must be published, and where gaps are found, corrections to the contribution-recognition framework must be published within 180 days.
```

- [ ] **Step 3: Verify insertion**

Run: `grep -n "documentary legibility" "docs/constitution/Humane_Constitution.md"`
Expected: one matching line.

- [ ] **Step 4: Add P-041 to Patch Log**

Add to inventory table after P-040:
```markdown
| P-041 | T-008 | **ACTIVE** | High | Biennial recognized-contribution audit to include invisible and pastoral work; 180-day correction requirement (Article VI). |
```

Add detail section after P-040:
```markdown
---

### P-041 — Recognized-Contribution Audit Requirement

**Threat addressed:** T-008 (elite / professional-contributor capture of civic layer)
**Status:** ACTIVE | **Priority:** High

**Constitutional text:** Article VI — Voice, Service Record & Public Decisions (Contribution and capability section)

**Problem diagnosed:**
"Verified contribution" as the basis for civic standing creates systematic pressure to perform contribution in legible, verifiable ways. Contributions that resist easy documentation — informal care, spiritual leadership, mutual aid, neighborhood presence, parenting — will be consistently underrepresented in the Service Record eligible pool, creating a civic layer that favors professional contributors over those who sustain the actual fabric of community life.

**Introduced design:**
Mandatory biennial audit of the recognized-contribution definition; explicit constitutional statement that informal, spiritual, and pastoral contributions must not be excluded by documentary difficulty alone; 180-day correction requirement when gaps are found.

**Dependencies:** Audit body must be independent of the civic administration it is reviewing — consistent with Article VII independence requirements.

**New risks introduced:**
- "Effect on human flourishing" as a measurement criterion is harder to verify than documented hours. Mitigated: the audit requirement is about the framework definition, not individual claims; it does not require the system to verify every unrecorded act of care.

**Residual risk:** The gap between the ideal (invisible work recognized) and the operational (verification required) will persist. The audit creates a forcing function for closing it over time rather than a one-time fix.
```

- [ ] **Step 5: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md" "docs/governance/Patch_Log.md"
git commit -m "feat(constitution): P-041 biennial recognized-contribution audit (Article VI)"
```

---

## Task 10: P-042 — Article VII: Community alert pathway

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md` (Article VII, "Warning systems" subsection)
- Modify: `docs/governance/Patch_Log.md`

- [ ] **Step 1: Find the end of the "Warning systems" subsection in Article VII**

Find the last bullet in that subsection:
```
**Why this exists:** slow failures should be seen before they become crises.
```

- [ ] **Step 2: Add the community alert pathway clause after that bullet**

Insert as a new bullet immediately after:
```markdown
- **Community alert pathway:** The warning system must include a direct voice mechanism for ordinary persons to report systemic failures they experience. Expert and institutional monitors watch what is measurable; affected communities often see what institutions cannot or will not name. A constitutionally protected community alert pathway — low-barrier, anonymous if the reporter chooses, accessible without legal representation or institutional affiliation — must be maintained alongside the formal audit system. Every community alert must receive a published acknowledgment within 30 days. Alerts that meet a basic prima facie threshold for systemic failure must trigger a formal review within 90 days. Refusal to acknowledge or review is itself a reportable failure under this Article.
```

- [ ] **Step 3: Verify insertion**

Run: `grep -n "community alert pathway\|Refusal to acknowledge" "docs/constitution/Humane_Constitution.md"`
Expected: two matching lines (the bullet header and the last sentence).

- [ ] **Step 4: Add P-042 to Patch Log**

Add to inventory table after P-041:
```markdown
| P-042 | — | **ACTIVE** | High | Low-barrier community alert pathway with 30-day acknowledgment and 90-day review trigger (Article VII). |
```

Add detail section after P-041:
```markdown
---

### P-042 — Community Alert Pathway

**Threat addressed:** institutional capture of warning function; prophetic voices blocked
**Status:** ACTIVE | **Priority:** High

**Constitutional text:** Article VII — Public Records & Warning Systems

**Problem diagnosed:**
Article VII's warning function is defined, funded, and structured by the same apparatus it is meant to watch. Expert and institutional monitors measure what the system has built instruments to measure. Communities affected by systemic failures often see them earlier and more accurately than institutional reviewers — but currently have no constitutionally protected path to name them. A prophet paid by the king tends to prophesy what the king wants to hear.

**Introduced design:**
Constitutionally protected community alert pathway: low-barrier, optionally anonymous, accessible without legal representation; 30-day acknowledgment requirement; 90-day formal review trigger for prima facie systemic failures; refusal to acknowledge or review is itself a reportable failure.

**Dependencies:** Article VII independence requirement applies — the body managing community alerts must not be the same body whose performance is being reported.

**New risks introduced:**
- Alert pathway could be used for political harassment or coordinated false-flag campaigns. Mitigated: "prima facie threshold" for mandatory review; anonymous alerts are published but not automatically elevated without threshold evidence.

**Residual risk:** Power asymmetry between institutional reviewers and community reporters will persist. The pathway lowers the barrier; it does not equalize resources for evidence-gathering.
```

- [ ] **Step 5: Update the Patch Log header line**

Find at the top of `docs/governance/Patch_Log.md`:
```
**Running change ledger aligned to the Humane Constitution · Current through P-034**
```

Replace with:
```
**Running change ledger aligned to the Humane Constitution · Current through P-042**
```

- [ ] **Step 6: Commit**

```bash
git add "docs/constitution/Humane_Constitution.md" "docs/governance/Patch_Log.md"
git commit -m "feat(constitution): P-042 community alert pathway (Article VII); update patch log header to P-042"
```

---

## Task 11: Regenerate corpus and validate

**Files:**
- Modified (auto-generated): `app/src/generated/corpus.ts`, `app/public/generated/corpus.json`

- [ ] **Step 1: Regenerate corpus**

```bash
cd app && npm run generate:corpus
```
Expected output: `Wrote app/src/generated/corpus.ts and app/public/generated/corpus.json with NN documents.`

- [ ] **Step 2: Verify no drift**

```bash
cd app && npm run check:corpus
```
Expected: exits cleanly with no diff output.

- [ ] **Step 3: Run corpus validator**

```bash
python3 ../scripts/validate_corpus.py
```
Expected: no errors. If link errors appear for new patch IDs referenced in the Constitution, check that the Patch Log entries exist and are reachable.

- [ ] **Step 4: Commit regenerated corpus**

```bash
git add app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "chore: regenerate corpus after Christ-centered constitution revisions (P-035–P-042, R-01–R-03)"
```

- [ ] **Step 5: Push to remote**

```bash
git push
```
Expected: `main -> main` confirmed.

---

## Verification Checklist

After all tasks complete, verify:

- [ ] `grep -c "must not buy or condition" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "moral transformation of persons" "docs/constitution/Humane_Constitution.md"` → `2` (Preamble R-03 + Article V P-040)
- [ ] `grep -c "founding group must be the first" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "custodial, not proprietary" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "Identity serves the person" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "Community voice in measurement" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "establishes a floor, not a monopoly" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "mercy before procedure" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "documentary legibility" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "community alert pathway" "docs/constitution/Humane_Constitution.md"` → `1`
- [ ] `grep -c "may never\|can never" "docs/constitution/Humane_Constitution.md"` → `0`
- [ ] `grep -c "P-035\|P-036\|P-037\|P-038\|P-039\|P-040\|P-041\|P-042" "docs/governance/Patch_Log.md"` → `16` (2 per patch: inventory row + detail header)
- [ ] `npm run check:corpus` → exits 0
