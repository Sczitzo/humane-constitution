# P-045 Threat Resolution Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve five critical governance threats (T-001, T-002, T-004, T-007, IC-004) by adding enforcement-capacity derivation logic, an asymmetric identity default rule, an enumerated contribution floor, a founding term seed list, and a dignity-only continuity mode.

**Architecture:** Five targeted amendments to three annex files (ANNEX_AB.md, ANNEX_AK.md, ANNEX_AH.md), followed by Patch_Log and Threat_Register updates, corpus regeneration, and validation. Each task is independently committable. No new files are created — all changes are additive clauses inserted into existing sections.

**Tech Stack:** Markdown, Python 3 (corpus validation), Node/npm (corpus regeneration). All commands run from `app/` unless stated otherwise.

---

## File Map

| File | What changes |
| :--- | :--- |
| `docs/annexes/ANNEX_AB.md` §AB2 | Add enforcement-capacity derivation formula + civic-duty audit clause (T-001) |
| `docs/annexes/ANNEX_AB.md` §AB3 | Add enumerated floor of presumptively recognized contribution categories (T-004) |
| `docs/annexes/ANNEX_AB.md` §AB5 | Add founding seed list of protected terms (T-007) |
| `docs/annexes/ANNEX_AK.md` | Add §7 Asymmetric Default Rule + §8 Independent Identity Auditor (T-002) |
| `docs/annexes/ANNEX_AH.md` §AH5 | Replace governance-gap note with §AH5.1 Dignity-Only Continuity Mode (IC-004) |
| `docs/governance/Patch_Log.md` | Add P-045 entry |
| `docs/governance/Threat_Register.md` | Update T-001, T-002, T-004, T-007, IC-004 residual-risk notes |
| `app/src/generated/corpus.ts` | Auto-regenerated — do not edit by hand |
| `app/public/generated/corpus.json` | Auto-regenerated — do not edit by hand |

---

## Context for agentic workers

Repo root: the directory containing `docs/`, `app/`, `scripts/`, `CLAUDE.md`.

**Critical rules (from CLAUDE.md):**
- After any markdown change, run `npm run generate:corpus` from inside `app/`.
- Never edit `corpus.ts` or `corpus.json` by hand.
- Do not modify `Humane_Constitution.md`, `Acceptance_Protocol.md`, or `INVARIANTS.md` without explicit instruction.
- `python3 ../scripts/validate_corpus.py` must pass before committing.

**Patch numbering:** The last committed patch is P-044. This batch is P-045.

**Threat status convention:** PARTIAL = mitigations exist but the threat is not fully closed. ADDRESSED = threat is closed by implemented controls with no material residual.

---

## Task 1: T-001 — Enforcement-Capacity Derivation Formula

**Files:**
- Modify: `docs/annexes/ANNEX_AB.md` (§AB2, after the existing calibration methodology paragraph)

This task adds a structural derivation formula that grounds FC-010 thresholds (3%/7%) in the system's own minimum detectable enforcement rate, and adds a civic-duty clause ensuring audit funding can never be used to justify raising thresholds.

- [ ] **Step 1: Locate the insertion point**

Open `docs/annexes/ANNEX_AB.md`. Find §AB2 (line ~10). The section ends with this paragraph:

```
*Calibration methodology requirement: The Article VII annual audit must publish...
...Threshold values that are not calibration-documented in a published audit are not valid enforcement baselines.*
```

The new content goes immediately after this paragraph, before `### AB3`.

- [ ] **Step 2: Insert the enforcement-capacity derivation clause**

After the calibration methodology paragraph and before `### AB3`, insert:

```markdown
*Enforcement-capacity derivation: FC-010 leakage thresholds shall be derived from the system's minimum detectable enforcement rate, not set arbitrarily. The derivation is: let N = the number of leakage cases the Article VII audit can reliably investigate per year; let P = total enrolled population. The minimum detectable rate = N ÷ P. The routine leakage target (FC-010: 3% single-jurisdiction) shall be set at no lower than 2× the minimum detectable rate. The systemic-review trigger (FC-010: 7% cross-jurisdiction) shall be set at the point where confirmed leakage would consume 5% or more of total Essential Access supply in the affected jurisdiction, making it materially harmful to genuine recipients. These derivation constraints are binding: no audit may publish a threshold lower than 2× its own minimum detectable rate, and no audit may publish a systemic trigger lower than the 5% supply-harm threshold.*

*Audit participation as civic duty: Enforcement capacity shall not be subject to funding pressure. Participation in the Article VII leakage audit — including data submission by operators, testimony by service providers, and sampling cooperation by enrolled persons — is a qualified civic duty under the protocol. The Federated Ombuds may compel participation from operators and service providers with the same authority it holds over Service Record disclosure requests. Audit resourcing limitations do not constitute grounds for raising FC-010 thresholds. If enforcement capacity falls below the level required by the derivation formula above, the mandatory response is to restore capacity, not to raise the threshold.*
```

- [ ] **Step 3: Verify the insertion**

Read `docs/annexes/ANNEX_AB.md` lines 1–50 and confirm:
- The calibration methodology paragraph is intact and unmodified.
- The two new italic paragraphs appear after it and before `### AB3`.
- No table headers or section markers are broken.

- [ ] **Step 4: Regenerate and validate corpus**

```bash
cd app && npm run generate:corpus
cd .. && python3 scripts/validate_corpus.py
```

Expected: no errors. If `validate_corpus.py` reports broken links, read the error and fix the reference — do not proceed with a broken corpus.

- [ ] **Step 5: Commit**

```bash
git add docs/annexes/ANNEX_AB.md app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "feat(ANNEX_AB): T-001 enforcement-capacity derivation formula + civic-duty audit clause (P-045)"
```

---

## Task 2: T-004 — Enumerated Contribution Floor

**Files:**
- Modify: `docs/annexes/ANNEX_AB.md` (§AB3, after the existing invisible-work backstop paragraph)

This task adds a list of presumptively recognized contribution categories with a burden-reversal rule. Self-attestation is accepted for listed categories unless affirmatively disproved by auditable evidence.

- [ ] **Step 1: Locate the insertion point**

Open `docs/annexes/ANNEX_AB.md`. Find §AB3. The section contains this paragraph (among others):

```
*Invisible-work backstop: The contribution framework must not systematically exclude work that is hard to measure...
...deficient do not constitute valid Voice or Service Record inputs for the categories affected until the correction is applied.*
```

The new content goes immediately after this invisible-work backstop paragraph, before the next bullet (`- **Anti-gaming controls**`).

- [ ] **Step 2: Insert the enumerated floor clause**

After the invisible-work backstop paragraph and before the `- **Anti-gaming controls**` bullet, insert:

```markdown
*Enumerated contribution floor: The following categories of work are presumptively recognized as qualifying contribution under §AB3 without requiring measurable output or third-party institutional attestation. For each category, self-attestation is the default accepted form of evidence. Self-attestation may be rebutted only by affirmative auditable evidence to the contrary — the burden of disproof rests on the system, not the contributor.*

*Presumptively recognized categories (non-exhaustive founding floor):*
- *(a) Primary caregiving: direct unpaid care of a dependent person (child, elderly person, or person with disability or chronic illness) residing in the contributor's household or under the contributor's regular responsibility.*
- *(b) Elder care: sustained unpaid support for an aged person, whether residential or non-residential, including accompaniment, personal care, medication management, and household maintenance.*
- *(c) Mutual aid: regular participation in a community-based network providing direct material or practical support (food, transport, translation, emergency response) to members without compensation.*
- *(d) Spiritual community leadership: unpaid pastoral, chaplaincy, or spiritual direction service within a recognized community, including grief accompaniment, crisis support, and rite-of-passage facilitation.*
- *(e) Unpaid household management: the primary management of a shared household including budgeting, provisioning, scheduling, and coordination that enables other household members to contribute in other domains.*
- *(f) Informal health work: unpaid health promotion, disease monitoring, or first-responder activity within a community, including community health worker roles that are not formally employed.*

*The founding coalition may extend this list via Tier 2 amendment. Additions are presumptively non-controversial if they share the structural features of the founding floor categories: unpaid, relational, oriented toward others' welfare, and hard to measure by conventional output metrics. Removals require Tier 1 amendment and a published impact assessment.*
```

- [ ] **Step 3: Verify the insertion**

Read `docs/annexes/ANNEX_AB.md` lines 20–35 and confirm:
- The invisible-work backstop paragraph is intact.
- The enumerated floor clause appears after it.
- The `- **Anti-gaming controls**` bullet still follows cleanly.
- The markdown renders cleanly (no broken list nesting).

- [ ] **Step 4: Regenerate and validate corpus**

```bash
cd app && npm run generate:corpus
cd .. && python3 scripts/validate_corpus.py
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add docs/annexes/ANNEX_AB.md app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "feat(ANNEX_AB): T-004 enumerated contribution floor with burden-reversal rule (P-045)"
```

---

## Task 3: T-007 — Founding Seed List of Protected Terms

**Files:**
- Modify: `docs/annexes/ANNEX_AB.md` (§AB5, after the existing registry administration paragraph)

This task adds a founding seed list of ~15 protected terms locked at Tier 2 at founding, so the registry is never empty. The list is subject to adversarial review before ratification — the plan embeds that requirement in the clause itself.

- [ ] **Step 1: Locate the insertion point**

Open `docs/annexes/ANNEX_AB.md`. Find §AB5. The section ends with this paragraph:

```
*Registry administration: The definition registry is administered by the Federated Ombuds...
...Disputes meeting a prima facie threshold of interpretive ambiguity are forwarded to the CRP for resolution.*
```

The new content goes immediately after this paragraph, before `### AB6`.

- [ ] **Step 2: Insert the founding seed list clause**

After the registry administration paragraph and before `### AB6`, insert:

```markdown
*Founding seed list: To prevent a capture window during the period between founding and first registry operation, the following terms are locked as Tier 2 protected definitions at founding. These terms may not be operationally redefined, relabeled, or reinterpreted before the registry is operationally active and the first annual public review window has been completed.*

*Tier 2 protected terms — founding seed list:*
- **Survival** — the irreducible minimum of material conditions necessary for a person to continue living with dignity: adequate food, safe shelter, accessible healthcare, and freedom from coercion.
- **Survival floor** — the constitutional minimum delivery obligation specified in ANNEX_Y: the set of goods and services to which every enrolled person is entitled by the protocol without condition.
- **Personhood** — recognition as a unique living person within the protocol's identity system, conferring eligibility for the survival floor and, upon verification, for Voice and Service Record standing.
- **Essential Access** — the non-convertible, non-accumulative, time-bounded instrument by which enrolled persons access survival-floor goods and services (Article I, SPECIFICATIONS §1).
- **Flow** — the market-compatible economic instrument of the protocol; convertible, accumulable, and subject to standard economic dynamics within the protocol's design constraints (Article I).
- **Voice** — the civic participation instrument conferring bounded influence over governance decisions, allocated by contribution score within Tier-structure limits (Article III).
- **Service Record** — the reputation and accountability instrument recording an enrolled person's verified interactions with the protocol (Article IV).
- **Non-convertibility** — the prohibition on any exchange, transfer, transaction, or mechanism that converts Essential Access balances or entitlements into Flow or any other transferable economic instrument.
- **Coercion** — any threat, deprivation, or conditioned offer that exploits a person's dependence on the survival floor to extract labor, compliance, consent, or political support.
- **Scarcity** — for Essential Access purposes: a condition in which total enrolled demand for a survival-floor good or service exceeds verifiable supply capacity; must be declared formally, publicly, and with a published expiry condition.
- **Contribution** — activity that is recognized under the §AB3 framework and the founding contribution floor as qualifying for Voice and Service Record inputs; subject to the enumerated floor and the P-041 biennial audit.
- **Identity** — the protocol's recognition of a person as a unique living individual through its layered identity stack (Article II, P-003, ANNEX_AK); distinct from documentation, citizenship, or any state-issued credential.
- **Dignity** — the condition of being treated as a person whose survival, autonomy, and social standing are not contingent on any performance, productivity metric, or identity credential.
- **Capacity** — in the context of scarcity declarations and resource governance: the verifiable maximum throughput of a delivery system for a specific survival-floor good or service in a specific jurisdiction per measurement period.

*Adversarial review requirement: Before ratification, the founding coalition must commission an adversarial review of this seed list by at least one independent party not affiliated with the founding team, with a specific mandate to identify terms whose founding definitions create capture advantages for specific actors. The adversarial review findings must be published alongside the ratified definitions. Any definition flagged in the adversarial review must be revised or accompanied by a published rebuttal before the seed list is locked.*
```

- [ ] **Step 3: Verify the insertion**

Read `docs/annexes/ANNEX_AB.md` lines 39–57 and confirm:
- The registry administration paragraph is intact.
- The founding seed list clause appears after it.
- `### AB6` still follows cleanly.
- The bold-term list renders without broken markdown.

- [ ] **Step 4: Regenerate and validate corpus**

```bash
cd app && npm run generate:corpus
cd .. && python3 scripts/validate_corpus.py
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add docs/annexes/ANNEX_AB.md app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "feat(ANNEX_AB): T-007 founding seed list of 14 protected terms with adversarial review requirement (P-045)"
```

---

## Task 4: T-002 — Asymmetric Default Rule + Independent Identity Auditor

**Files:**
- Modify: `docs/annexes/ANNEX_AK.md` (append §7 and §8 after the existing §6 — Publication Commitment)

This task adds two new sections to ANNEX_AK. §7 writes the asymmetric default rule as an enforceable procedural right. §8 creates the independent identity-system auditor mandate with quarterly reporting and a "missing data is a reportable failure" clause.

- [ ] **Step 1: Locate the insertion point**

Open `docs/annexes/ANNEX_AK.md`. Find the end of `## Section 6 — Publication Commitment`. It ends with the last publication commitment sentence. After §6, there is a `## Founding Coalition Instructions` section.

The new §7 and §8 go after §6 and before `## Founding Coalition Instructions`.

- [ ] **Step 2: Read the end of Section 6 and Founding Coalition Instructions**

Read `docs/annexes/ANNEX_AK.md` lines 122–170 to confirm the exact boundary before inserting. Note the exact heading text of "Founding Coalition Instructions" so the insertion point is unambiguous.

- [ ] **Step 3: Insert §7 — Asymmetric Default Rule**

After the last line of `## Section 6 — Publication Commitment` and before `## Founding Coalition Instructions`, insert:

```markdown
## Section 7 — Asymmetric Default Rule

The identity system faces a structural trade-off: any threshold stringent enough to prevent fraud at scale will also exclude some genuinely vulnerable people. This section establishes a constitutional presumption for cases where the system cannot simultaneously satisfy both its fraud target and its exclusion target.

**The rule:** When the identity system cannot simultaneously satisfy both the fraud rate target (Section 1) and the exclusion rate target (Section 2) for a given population or instrument tier, the system shall resolve the conflict in favor of inclusion. The burden of proof for any exclusion decision rests on the system, not on the individual.

**Procedural floor:** No enrolled person shall be excluded from the survival floor (Essential Access) on the basis of documentation failure alone without:
1. An independent review of the exclusion decision, conducted by a reviewer not affiliated with the identity system operators.
2. A written determination stating the specific basis for exclusion.
3. A time-bounded review: the determination must be issued within **14 calendar days** of the exclusion event. If no determination is issued within 14 days, the exclusion is automatically reversed and the person's Essential Access is restored pending a new proceeding.
4. Notice to the affected person in a language and format accessible to them.

**Scope:** This rule applies to all exclusion decisions at the Essential Access tier. It does not apply to temporary restrictions at the Voice or Service Record tier, which are governed by their own review procedures. It does not prevent the system from requiring additional verification — it prevents final exclusion without independent, time-bounded review.

**Interaction with numeric targets:** The asymmetric default rule operates independently of whether FC-143 through FC-147 exclusion rate targets have been formally bound. The procedural floor is a constitutional right, not a calibration preference. Binding numeric targets supplements but does not replace this rule.

---
```

- [ ] **Step 4: Insert §8 — Independent Identity Auditor**

Immediately after §7 and before `## Founding Coalition Instructions`, insert:

```markdown
## Section 8 — Independent Identity Auditor

**Mandate:** The Founding Coalition shall establish, before operational activation, an Independent Identity Auditor (IIA) as a permanent officer of the protocol, distinct from the Federated Ombuds. The IIA's sole statutory mandate is to monitor, measure, and publicly report on the performance of the identity system against the targets established in this annex.

**Reporting obligation:** The IIA shall publish a public quarterly report covering:
- Fraud rate per instrument tier (Section 1), compared to FC-140–FC-142 targets.
- Exclusion rate per vulnerable population category (Section 2), compared to FC-143–FC-147 targets.
- Number and outcome of independent reviews conducted under Section 7.
- Number of cases where the 14-day review deadline was missed, and the disposition of those cases.
- Any instrument tier or vulnerable category for which measurement data is not available, with a stated explanation.

**Absence-of-data rule:** Failure to produce measurement data for any instrument tier or vulnerable population category is itself a reportable failure. The IIA shall flag each quarter in which data was unavailable, name the responsible operator or data source, and — if data has been unavailable for two consecutive quarters — refer the matter to the Federated Ombuds as a potential compliance failure.

**Independence:** The IIA shall have no operational role in the identity system. The IIA may not be employed by or contracted to any identity system operator. Appointment and removal of the IIA requires a Tier 2 amendment process, preventing removal in response to unfavorable findings.

**Interaction with §7:** The IIA's quarterly report serves as the primary evidence base for evaluating whether the asymmetric default rule (Section 7) is being respected at scale. A pattern of systematically missed 14-day review deadlines, or a pattern of exclusion-rate data unavailability, constitutes prima facie evidence of §7 non-compliance and must be referred to the Federated Ombuds.

---
```

- [ ] **Step 5: Verify the insertion**

Read `docs/annexes/ANNEX_AK.md` from line 120 to the end and confirm:
- §6 Publication Commitment is intact.
- §7 Asymmetric Default Rule appears correctly after §6.
- §8 Independent Identity Auditor appears correctly after §7.
- `## Founding Coalition Instructions` still follows §8.
- No heading levels are broken (§7 and §8 use `## Section N` matching §1–§6 style).

- [ ] **Step 6: Regenerate and validate corpus**

```bash
cd app && npm run generate:corpus
cd .. && python3 scripts/validate_corpus.py
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add docs/annexes/ANNEX_AK.md app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "feat(ANNEX_AK): T-002 asymmetric default rule (§7) + independent identity auditor (§8) (P-045)"
```

---

## Task 5: IC-004 — Dignity-Only Continuity Mode

**Files:**
- Modify: `docs/annexes/ANNEX_AH.md` (§AH5, replace governance-gap note with §AH5.1)

The current §AH5 ends with a `> **Governance gap (IC-004):**` blockquote that acknowledges the gap but provides no resolution. This task replaces that blockquote with §AH5.1 specifying the dignity-only continuity mode and the 180-day re-founding trigger.

- [ ] **Step 1: Locate the exact text to replace**

Open `docs/annexes/ANNEX_AH.md`. Find §AH5. The governance-gap note reads exactly:

```
> **Governance gap (IC-004):** P-014 closes permanently at Stage 4. If the Stage 5 independent audit suspends P-013, no in-system recovery path currently exists — P-014 cannot be reopened after closure. This is a residual governance risk. A future patch should specify an explicit fallback: either a fixed sunset period for the suspension, an emergency re-bootstrap procedure, or a mandatory continuation of FAP operations pending re-ratification.
```

This blockquote is replaced in full by §AH5.1 below.

- [ ] **Step 2: Replace the governance-gap blockquote with §AH5.1**

Replace the entire `> **Governance gap (IC-004):**` blockquote with:

```markdown
### AH5.1 — Dignity-Only Continuity Mode (IC-004 Resolution)

**Trigger:** If the Stage 5 post-activation audit (AH6) finds that P-013's activation was compromised and suspends P-013, the protocol enters **Dignity-Only Continuity Mode** immediately upon the suspension finding being published.

**What continues:**
- The Constitutional Survival Minimum (CSM) automatic issuance (ANNEX_Y §Y2) continues without interruption. Enrolled persons continue to receive Essential Access entitlements at the established survival-floor level.
- The Independent Identity Auditor (ANNEX_AK §8) continues operating and publishing quarterly reports.
- The Federated Ombuds continues operating in its custodial and dispute-resolution capacity.

**What is suspended:**
- All governance decisions requiring P-013 Formal Acceptance Protocol sign-off.
- New patch activations, new founding commitment locks, and Tier 2 amendment proceedings.
- Voice and Service Record issuance updates requiring P-013-governed recalibration.

**Re-founding trigger:** If the protocol remains in Dignity-Only Continuity Mode for **180 consecutive days** without an active P-013 re-submission proceeding underway, a mandatory public re-founding petition window opens automatically. The petition window operates as follows:
1. Any 500 or more verified enrolled persons may jointly submit a re-founding petition proposing a corrected P-013 activation procedure.
2. Petitions are published publicly within 7 days of receipt.
3. A petition that receives attestation from 1,000 or more verified enrolled persons within 90 days advances to a reconvened founding panel under AH3 rules.
4. The highest-attested qualifying petition proceeds; if multiple petitions qualify, they are consolidated by the reconvened panel.
5. If no petition qualifies within 90 days of the petition window opening, the window resets and reopens 90 days later, repeating until a qualifying petition succeeds.

**Interaction with P-014 permanent closure:** P-014 remains permanently closed. The re-founding petition window is not P-014 — it is a post-activation correction mechanism that operates within the now-operative Formal Acceptance Protocol framework. P-014's non-precedent status is unaffected.

**CSM continuity guarantee:** Under no circumstances does Dignity-Only Continuity Mode permit suspension of the survival floor. A finding that the CSM cannot continue without P-013 governance sign-off is treated as a CSM delivery failure (ANNEX_Y §Y4) and triggers the CSM failure response protocol, not a suspension of the floor.
```

- [ ] **Step 3: Verify the replacement**

Read `docs/annexes/ANNEX_AH.md` lines 47–70 and confirm:
- The original `> **Governance gap (IC-004):**` blockquote is gone.
- §AH5.1 appears in its place, correctly structured.
- `### AH6. Stage 5 — Post-Activation Audit` follows §AH5.1 cleanly.
- The heading hierarchy is intact (§AH5.1 is a sub-heading under §AH5).

- [ ] **Step 4: Regenerate and validate corpus**

```bash
cd app && npm run generate:corpus
cd .. && python3 scripts/validate_corpus.py
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add docs/annexes/ANNEX_AH.md app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "feat(ANNEX_AH): IC-004 dignity-only continuity mode + 180-day re-founding trigger (P-045)"
```

---

## Task 6: Patch Log + Threat Register Updates

**Files:**
- Modify: `docs/governance/Patch_Log.md` (append P-045 entry)
- Modify: `docs/governance/Threat_Register.md` (update residual-risk notes for T-001, T-002, T-004, T-007, IC-004)

- [ ] **Step 1: Add P-045 entry to Patch_Log.md**

Open `docs/governance/Patch_Log.md`. Append the following after the P-044 entry:

```markdown
---

### P-045 — Threat Resolution Batch

**Threats addressed:** T-001, T-002, T-004, T-007, IC-004
**Status:** ACTIVE | **Priority:** Critical
**Date:** 2026-05-02

**Constitutional text:** ANNEX_AB.md (§AB2, §AB3, §AB5), ANNEX_AK.md (§7, §8), ANNEX_AH.md (§AH5.1)

**Problem diagnosed:**
Five critical threats remained at PARTIAL status with specific unresolved gaps: T-001 lacked threshold derivation logic (arbitrary numbers); T-002 had no procedural protection for excluded persons before rate targets are formally bound; T-004 had no enumerated floor for invisible/care work; T-007's registry started empty (first-mover capture window); IC-004 had no recovery path after P-013 suspension.

**Introduced design:**

- **ANNEX_AB.md §AB2** — Added enforcement-capacity derivation formula: FC-010 thresholds are derived from minimum detectable enforcement rate (N ÷ P). FC-010 3% = 2× min-detectable rate; 7% = 5% supply-harm threshold. Audit participation designated as a qualified civic duty; resourcing limitations cannot justify raising thresholds. (T-001)
- **ANNEX_AB.md §AB3** — Added enumerated contribution floor: six founding categories (primary caregiving, elder care, mutual aid, spiritual community leadership, unpaid household management, informal health work) with burden reversal. Self-attestation accepted; disproof burden on system. Extension via Tier 2; removal requires Tier 1 + impact assessment. (T-004)
- **ANNEX_AB.md §AB5** — Added founding seed list: 14 Tier 2 protected terms (survival, survival floor, personhood, Essential Access, Flow, Voice, Service Record, non-convertibility, coercion, scarcity, contribution, identity, dignity, capacity) locked at founding. Adversarial review requirement before ratification. (T-007)
- **ANNEX_AK.md §7** — Added Asymmetric Default Rule: system bears burden of proof for all exclusion decisions; independent time-bounded review (14-day deadline) required before any Essential Access exclusion is final; exclusions without timely determination automatically reversed. (T-002)
- **ANNEX_AK.md §8** — Added Independent Identity Auditor mandate: quarterly public reports on fraud/exclusion rates per tier and vulnerable category; absence-of-data is a reportable failure; two consecutive quarters without data triggers Federated Ombuds referral; IIA appointment/removal requires Tier 2 amendment. (T-002)
- **ANNEX_AH.md §AH5.1** — Replaced IC-004 governance-gap note with Dignity-Only Continuity Mode specification: CSM continues; governance suspended; 180-day trigger opens re-founding petition window (500 joint signatories to submit; 1,000 attestations to advance); P-014 non-precedent status unaffected; CSM floor cannot be suspended. (IC-004)

**New risks introduced:**
- The founding seed list authors own the semantic baseline permanently — mitigated by the mandatory adversarial review requirement before ratification.
- The 14-day independent review deadline for identity exclusions requires review infrastructure to be operational at launch — this is a pre-launch blocking gate.
- The 180-day dignity-only continuity period may be too long for urgent governance needs — mitigated by the automatic petition window at 180 days and the Federated Ombuds continuing to operate throughout.

**Residual risk:** T-001, T-002, T-004, and T-007 remain PARTIAL pending pilot data confirmation. IC-004 is ADDRESSED — the governance gap is now resolved with a specified fallback mechanism.
```

- [ ] **Step 2: Update Threat_Register.md — T-001 residual risk note**

In the T-001 entry, find the existing mitigation/residual risk description and add the following sentence to the residual risk section (locate the T-001 individual entry, approximately line 135):

Find the paragraph that describes T-001's current mitigation state. After the sentence that mentions the calibration methodology audit requirement (added by P-044), append:

```
P-045 adds a structural derivation formula grounding FC-010 thresholds in enforcement capacity, and designates audit participation as a qualified civic duty, preventing funding pressure from becoming a threshold-raising justification.
```

- [ ] **Step 3: Update Threat_Register.md — T-002 residual risk note**

In the T-002 individual entry (approximately line 151), find the open-problem description referencing P-016 and FC-140–FC-147 reserved status. Add after the existing mitigation description:

```
P-045 §7 adds the Asymmetric Default Rule (procedural right to independent, time-bounded review before any Essential Access exclusion) operating independently of whether numeric targets are formally bound. P-045 §8 adds the Independent Identity Auditor with mandatory quarterly reporting and absence-of-data accountability.
```

- [ ] **Step 4: Update Threat_Register.md — T-004 residual risk note**

In the T-004 individual entry (approximately line 168), find the contribution definition open problem. Add after the existing mitigation description (P-041 invisible-work backstop):

```
P-045 adds an enumerated contribution floor of six founding categories with burden reversal, so the most predictable forms of invisible work are constitutionally recognized without waiting for a P-041 audit cycle.
```

- [ ] **Step 5: Update Threat_Register.md — T-007 residual risk note**

In the T-007 individual entry (approximately line 215), find the registry-empty capture window risk. Add after the existing mitigation description (§AB5 registry administration):

```
P-045 adds a founding seed list of 14 Tier 2 protected terms locked at founding, with a mandatory adversarial review requirement before ratification, so the registry is never empty at launch.
```

- [ ] **Step 6: Update Threat_Register.md — IC-004 governance gap note**

Find the IC-004 governance gap note. It currently appears in the summary table and in the ANNEX_AH §AH5 blockquote (now replaced by §AH5.1). Search for "IC-004" in the Threat_Register.md and update any note referencing it as unresolved:

Find the text: `A future patch should specify an explicit fallback` (or similar language) and replace with:

```
Resolved by P-045 §AH5.1: Dignity-Only Continuity Mode specifies CSM continuity, governance suspension, and a 180-day automatic re-founding petition trigger.
```

- [ ] **Step 7: Update the Complete Register Summary table status for IC-004**

Find the Complete Register Summary table (near line 100). Locate the IC-004 row and update its status from its current value to **ADDRESSED** with a note: `P-045 §AH5.1 — Dignity-Only Continuity Mode`.

- [ ] **Step 8: Regenerate and validate corpus**

```bash
cd app && npm run generate:corpus
cd .. && python3 scripts/validate_corpus.py
```

Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add docs/governance/Patch_Log.md docs/governance/Threat_Register.md app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "docs(governance): P-045 patch log entry + T-001/T-002/T-004/T-007/IC-004 threat register updates"
```

---

## Task 7: Final Corpus Check and E2E Smoke Test

**Files:**
- No edits. Verification only.

- [ ] **Step 1: Run full corpus validation**

```bash
cd "/Users/gratitude/Library/Mobile Documents/com~apple~CloudDocs/anti gravity/twelve-pillar-protocol"
python3 scripts/validate_corpus.py
```

Expected output: `Validation passed` with no errors. If errors appear, read them carefully — they will name specific files and link targets. Fix the broken reference in the relevant markdown file, regenerate corpus, and re-run validation.

- [ ] **Step 2: Verify corpus sync**

```bash
cd app && npm run check:corpus
```

Expected: no drift reported. If drift is reported, run `npm run generate:corpus` again and check that both `corpus.ts` and `corpus.json` were staged in the last commit.

- [ ] **Step 3: Confirm all five threats appear in the updated corpus**

```bash
grep -n "P-045\|AH5.1\|enumerated contribution floor\|Asymmetric Default Rule\|founding seed list\|enforcement-capacity derivation" \
  src/generated/corpus.ts | head -20
```

Expected: multiple matches confirming the P-045 content was captured by corpus generation.

- [ ] **Step 4: Commit if any stray files were regenerated**

If `npm run check:corpus` or the grep above reveals files that weren't committed, stage and commit them:

```bash
git add app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "chore: final corpus sync after P-045 batch"
```

If everything is already committed, skip this step.

---

## Self-Review

**Spec coverage check:**
- T-001 (structural derivation + civic duty funding): Task 1 ✅
- T-002 (asymmetric default rule + independent auditor): Task 4 ✅
- T-004 (enumerated contribution floor + burden reversal): Task 2 ✅
- T-007 (founding seed list + adversarial review): Task 3 ✅
- IC-004 (dignity-only continuity + 180-day re-founding trigger): Task 5 ✅
- Patch Log update: Task 6 ✅
- Threat Register updates (all five): Task 6 ✅
- Corpus regeneration: Every task ✅
- Final validation: Task 7 ✅

**Placeholder scan:** No TBDs, no "implement later", no unfilled brackets. All clauses contain complete constitutional language.

**Cross-reference consistency:**
- §AH5.1 references ANNEX_Y §Y2 (CSM automatic issuance) — this section exists.
- §AH5.1 references ANNEX_AK §8 (IIA) — added in Task 4.
- §AB3 enumerated floor references P-041 biennial audit — already in §AB3 invisible-work backstop.
- §AB5 seed list references P-004 (definition drift protection) — already in §AB5 header provenance.
- ANNEX_AK §7 references §1 and §2 of same annex — both exist.
- ANNEX_AK §8 references §7 — added in same task, correct order.
