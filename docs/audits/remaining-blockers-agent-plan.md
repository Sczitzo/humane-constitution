# Remaining Blockers Agent-Swarm Planning Report

**Date:** 2026-05-15
**Branch:** claude/pedantic-spence-c4e730
**Basis:** Post-remediation verification report (commits through 50ab363), full-corpus-remediation-plan.md, and five specialist agent investigations dispatched in parallel.
**Corpus state:** 103 documents, clean working tree at investigation start.

---

## Scope

This report covers only items that remain unresolved after the P0/P1/P2 remediation session:

- The three human governance actions listed in Section A of the post-remediation report
- The HC Section VIII constitutional amendment (Section B)
- Optional future hardening items (Section C): source text fixes for P2-B through P2-G, Acceptance_Protocol gate entry, findings authority annotation, and lower-priority P3/P4/P5 repairs

Items verified as complete in the post-remediation report are not re-examined here. This report does not reopen closed items.

---

## Method

Five specialist agents were dispatched in parallel. Each received a scoped briefing covering only the items in its domain. Findings were returned and synthesized against two authoritative sources:

1. `docs/audits/full-corpus-remediation-plan.md` (authoritative item specifications)
2. `docs/audits/post-remediation-verification-report.md` (verified completed items)

**Agent 4 warning:** Agent 4 (P2-B through P2-G) returned findings that cited file names not present in the actual corpus (constitution.md, oracle-framework.md, ioauth.md, timelock.md, hard-lock.md, drift-chain.md, ledger.md, ombuds-registry.md, federation.md). Its item descriptions did not match the actual remediation plan. Agent 4's findings are treated as unreliable throughout this report. All P2-B through P2-G specifications in this report are drawn from `full-corpus-remediation-plan.md` directly.

**Agent 3 cross-check:** Agent 3 reported AG1 and AG4 gates as absent from Acceptance_Protocol.md. The post-remediation verification report (P0-E row, status "Verified") confirms both gates are present with correct clearing conditions. Agent 3's finding on AG1/AG4 is superseded by the verified audit. The Acceptance_Protocol gate entry for "Tier 0 token mechanism specification complete" remains an open item per P0-A partial status; this is carried forward in Section C.

---

## Executive Summary

All corpus-level remediations are complete. No source file changes are needed to unblock enrollment from a corpus-text standpoint, with one exception: two optional improvements in Section C are drafting tasks (the Acceptance_Protocol token mechanism gate entry and the P2-D findings authority annotation) that can be batched into a single small corpus commit if the founding team chooses to complete them.

What remains falls into three categories:

**Category A -- Human governance (founding team only, no corpus fix possible):** Constitute the Federated Ombuds, run FC-YT1/FC-YT2 Ombuds review, and formally assign the TSP for the Tier 0 token mechanism. These are operational prerequisites for all Ombuds-dependent gate clearances. No implementation contract can substitute.

**Category B -- Formal constitutional process (210-day minimum cycle):** Reconcile HC Section VIII demurrage safe harbor from 6 months to 18 months via Tier 1 amendment. The ANNEX_J governing clause covers enforcement in the interim. This is not a launch blocker; it is a formal consistency obligation.

**Category C -- Optional future hardening (not launch blockers):** Seven enforcement chain repairs (P2-B through P2-G, P2-E), two corpus housekeeping items, and lower-priority P3/P4/P5 traceability, terminology, and acceptance test improvements. None of these block real-persons enrollment. They should be addressed within the first 90 operational days.

---

## Classification Table

| Item | Category | Source | Files affected | Human decision required | Launch blocker |
|:---|:---|:---|:---|:---|:---|
| Constitute Federated Ombuds | A | P0-C | None (operational) | Yes -- appointment decisions | Yes (unblocks all Ombuds gates) |
| FC-YT1/FC-YT2 Ombuds review | A | P0-B remaining | None (operational) | No (Ombuds reviews registered values) | Yes (INV-LAUNCH-1 gate condition a) |
| TSP formal assignment | A | P0-A remaining | None (operational) | Yes -- technical decision | Yes (AZ2.1 pre-launch gate) |
| HC Section VIII amendment | B | P1-F remaining | Humane_Constitution.md | Yes -- values/policy decision | No (ANNEX_J governs for enforcement) |
| Acceptance_Protocol token mechanism gate entry | C | P0-A remaining | docs/constitution/Acceptance_Protocol.md | No | No |
| P2-D findings authority annotation | C | P1-E/P2-D addendum | docs/annexes/ANNEX_AM.md | No | No |
| P2-B: IOA trigger standard | C | P2-B | docs/annexes/ANNEX_AC.md, docs/constitution/Acceptance_Protocol.md | Partially (trigger test definitions) | No |
| P2-C: Emergency taxonomy | C | P2-C | docs/constitution/INVARIANTS.md or new docs/governance/Protected_Terms_Registry.md | Yes (Governance Emergency trigger tests) | No |
| P2-E: CIP budget materiality threshold | C | P2-E | docs/annexes/ANNEX_AM.md | Partially (specific threshold value) | No |
| P2-F: FAP Tier 2 deliberation floor | C | P2-F | docs/constitution/Acceptance_Protocol.md | Partially (deliberation period) | No |
| P2-G: Founding panel self-certification | C | P2-G | docs/annexes/ANNEX_AH.md, docs/constitution/Acceptance_Protocol.md | No | No |
| P3-A: AH8 linkage table completeness | C | P3-A | docs/annexes/ANNEX_AH.md | No | No |
| P3-B through P3-G: Namespace/sequence repairs | C | P3-B through P3-G | docs/governance/Patch_Log.md, docs/annexes/ANNEX_B.md, docs/annexes/INDEX.md, new PRD_Registry.md | No | No |
| P4/P5: Terminology and acceptance test improvements | C | P4-A through P5-AT-IMP-7 | docs/constitution/INVARIANTS.md, docs/constitution/Acceptance_Protocol.md, docs/annexes/ANNEX_AL.md | Partially (P4-A human dignity floor) | No |

---

## Human Governance Actions (Category A)

These items require founding team decisions and operational execution. No implementation contract can substitute. They are listed in dependency order.

### A1 -- Constitute Federated Ombuds

**Source:** P0-C, ANNEX_AI Section 2.1
**Corpus basis:** ANNEX_AI Section 2.1 states: "protocol is not operative and the Federated Ombuds Plenum may not exercise any FC-091 protocol-level authority until at least four of five sub-Ombuds have been appointed, challenged, and seated." ANNEX_AI status is ACTIVE.
**What the founding team must do:**
1. Identify candidates for at least 4 of 5 sub-Ombuds seats from structurally independent bodies (per ANNEX_AI Section 1.1 independence requirements).
2. Publish each appointment publicly with the appointing body and basis for independence.
3. Run the prescribed challenge period for each seat.
4. Confirm seating of at least 4 sub-Ombuds on the public record.

**What this unblocks:**
- FC-YT1/FC-YT2 Ombuds review (A2)
- P0-A Ombuds verification of Tier 0 token mechanism spec (after A3)
- P0-E AG4 gate clearance (Ombuds must publish written confirmation)
- AM3 dispute review path (P2-D)
- Suspension Declaration Ombuds notification path (P2-H1)
- ANNEX_AC Ombuds remediation record (P2-H2)
- Tier 1 Amendment Integrity Report production (amendment_protocol Section 3.2)

**Agent 1 finding (corroborated):** The existing corpus language in ANNEX_AI provides full constitutional authority for the Ombuds once constituted. No additional corpus changes are required to enable Ombuds authority -- the appointment and seating process is sufficient.

### A2 -- FC-YT1/FC-YT2 Ombuds Review and Published Findings

**Depends on:** A1 (Ombuds constituted)
**Source:** P0-B, ANNEX_Y Section Y4 and Y7, /founding/commitments.md
**What the founding team must do:**
1. Direct the constituted Federated Ombuds to review the registered FC-YT1 and FC-YT2 values in /founding/commitments.md.
2. Ombuds verifies: FC-YT1 (CSM_FAILURE_COUNT_THRESHOLD = 3 verified delivery failures per cluster per 30-day window) matches ANNEX_Y Section Y4; FC-YT2 (CSM_SURVIVAL_RESERVE_DAYS = 90 days) matches ANNEX_Y Section Y7.
3. Ombuds publishes a findings document confirming or flagging the values.

**What this unblocks:** INV-LAUNCH-1 gate condition (a) -- formal gate clearance.

**Agent 1 finding (corroborated):** The verification gate is structurally open once the Ombuds is seated; the FC-YT1/FC-YT2 values are already registered in commitments.md with correct values. This is an administrative verification task, not a substantive decision.

### A3 -- TSP Formal Assignment for Tier 0 Token Mechanism

**Source:** P0-A, ANNEX_AZ Section AZ2.1
**What the founding team must do:**
1. Identify the Technical Specifications Package (TSP) responsible for cryptographic implementation of the Tier 0 pseudonymous single-session token mechanism.
2. Formally assign the TSP by name and publish the assignment.
3. The assignment must confirm: token generation method, non-transferability guarantee, session expiry mechanism, and non-aggregation guarantee are within the TSP's implementation scope.

**What this unblocks:** The second condition of the AZ2.1 pre-launch gate: "the TSP responsible for implementing the Tier 0 token mechanism has been formally assigned."

**Agent 1 finding:** The AZ2.1 specification exists and is complete. The formal assignment mechanism is not yet established -- it is a founding-team designation decision, not a drafting gap.

---

## Formal Constitutional Amendment (Category B)

### B1 -- HC Section VIII Demurrage Safe Harbor Reconciliation

**Source:** P1-F, full-corpus-remediation-plan.md
**Current state:** HC Section VIII reads 6 months. ANNEX_J Section J2 governing clause controls for enforcement (18 months). ANNEX_X Sections X4 and X5 both read 18 months. Formal inconsistency in the Constitution persists.
**Enforcement coverage:** The ANNEX_J governing clause covers enforcement during the waiting period. No account holder or enforcement body is at risk of adverse enforcement during the amendment cycle.

**Amendment process required (minimum 210-day cycle):**

| Step | Requirement | Source |
|:---|:---|:---|
| Section 0 notice | Publish full proposal text + SHA-256 hash + initiating parties; notify Federated Ombuds; wait 30 days before any keyholder may sign | amendment_protocol.md Section 0 |
| Keyholder signatures | 7 of 9 keyholder signatures (FC-110) | amendment_protocol.md Section 1 |
| 180-day timelock | Begins on signature registration date; no shortcut or urgency bypass | amendment_protocol.md Section 3, FC-111 |
| CIP concurrent ratification | At least 5 of 7 CIP members must ratify within the 180-day window | amendment_protocol.md Section 3.4 |
| Drift chain | Full amendment transparency publication required | amendment_protocol.md drift-chain requirements |

**Minimum timeline:** 30 days (Section 0 notice) + 180 days (timelock with concurrent CIP ratification) = 210 days from notice opening. No expedited path is available; the no-urgency-bypass clause in amendment_protocol.md Section 0.3 applies.

**CIP availability constraint:** CIP concurrent ratification (Section 3.4) requires a constituted CIP (ANNEX_AM Section AM8.7). The CIP cannot be constituted until the Founding Order's first post-activation audit is complete. The founding team must plan for this sequencing dependency -- the HC Section VIII amendment cannot be completed until after the CIP is constituted and a post-activation audit is done.

**Human judgment required:** The founding team must confirm 18 months is the intended policy value and initiate the amendment. This is a values/policy decision; the ANNEX_J governing clause is not a substitute for a formal constitutional resolution.

**Agent 2 finding (corroborated):** No expedited path exists. The 210-day minimum is irreducible under the current amendment architecture. The ANNEX_J governing clause provides full enforcement coverage during the waiting period. There are no open Section 2 elements that would void the amendment if correctly specified.

---

## Remaining Source Text Fixes (Category C -- Optional Hardening)

These items are enforcement chain repairs that are not launch blockers. They should be in place before any enforcement action is needed under the relevant mechanisms. Recommended window: within first 90 operational days.

### C1 -- Acceptance_Protocol Tier 0 Token Mechanism Gate Entry

**Source:** P0-A acceptance criterion (c), post-remediation report Section C
**File:** `docs/constitution/Acceptance_Protocol.md`
**Issue:** The full-corpus-remediation-plan acceptance criterion (d) for P0-A requires "the pre-launch gate list shows the new gate as a blocking condition." The P0-A corpus batch added the gate statement inside ANNEX_AZ Section AZ2.1 but the post-remediation report notes the Acceptance_Protocol gate entry was not checked in that batch and may be absent.
**Fix shape:** Add one row to the pre-launch blocking gate table in Acceptance_Protocol.md:
- Gate: "Tier 0 token mechanism specification complete and independently verified -- ANNEX_AZ Section AZ2.1 specification exists at named location; TSP formally assigned; Federated Ombuds has independently verified the specification prior to any real-persons enrollment."
- Clearing conditions: (1) TSP assignment published (A3 above); (2) Ombuds written verification finding published (depends on A1 and A3).
**Human judgment required:** No -- this is a cross-reference to already-specified requirements.

### C2 -- P2-D Findings Authority Annotation

**Source:** P1-E and P2-D Verification Addenda (remaining ambiguity sections)
**File:** `docs/annexes/ANNEX_AM.md`
**Issue:** The P1-E and P2-D paragraphs in Section AM3 delegate findings authority to "existing corpus provisions for the applicable governance body." During the pre-CIP period, the specific body that produces review findings for each of the four AM3 trigger conditions is named in other annexes but not consolidated in Section AM3.
**Fix shape:** Add one sentence after the existing findings-authority delegation in the P1-E paragraph: "For reference: findings for the founding-institution-seat trigger are produced under ANNEX_AH Section AH5 governance provisions; findings for the Article VII publication trigger are produced under the oversight body designated in ANNEX_AJ Section enforcement-ledger publication; findings for the oracle accreditation trigger are produced under ANNEX_AL Section 3.4; findings for the dashboard cadence trigger are produced under ANNEX_AJ dashboard publication provisions."

**Agent 5 finding (corroborated):** This is an annotation gap, not an enforcement gap. The P2-D enforcement chain is operative without this addition. Priority is low; the annotation prevents ambiguity in contested triggering situations.

### C3 -- P2-B: IOA Overuse -- Objective Trigger Standard

**Source:** full-corpus-remediation-plan.md P2-B
**Files:** `docs/annexes/ANNEX_AC.md` (Sections AC1.3, AC1.5); `docs/constitution/Acceptance_Protocol.md` (capture dashboard gate)
**Issue:** Level 3/4 emergency declaration standard is discretionary (no objective test). Domain-cycling cap exists (added in P2-H2) but cumulative cross-domain cap of 4 quarters per rolling 8-quarter window was added. Retroactive invalidity mechanism (who makes the finding, timeline, reversal) is unspecified. Emergency normalization metrics not in capture dashboard gate.
**Fix shape (three-part):**
1. Add to ANNEX_AC Section AC1.5: "Objective trigger standard required: A Level 3 or Level 4 emergency declaration may not be made on the declaring body's judgment alone. The declaration must be accompanied by: (a) at minimum two independent oracle measurements or data sources corroborating the emergency condition; (b) written identification of which named emergency category applies (Supply Emergency, Governance Emergency, or Infrastructure Emergency per the Protected Terms Registry [C4 below]); (c) Federated Ombuds written confirmation that corroborating evidence meets the named category's trigger test, delivered within 6 hours of the initial declaration. A declaration lacking (a) or (b) at issuance is provisionally void pending Ombuds confirmation within 6 hours. A declaration for which the Ombuds cannot confirm evidentiary basis within 6 hours is retroactively void; all IOA actions during the void period are suspended pending CRP review."
2. Add to ANNEX_AC Section AC1.3 (after existing cumulative cap): "Retroactive invalidity: The CRP is the declaring authority for retroactive invalidity of IOA actions following a void declaration. The CRP must publish an invalidity finding within 14 days of the Ombuds non-confirmation. Actions declared retroactively invalid must be reversed within 30 days of the finding unless independent harm-prevention analysis by the Ombuds documents that reversal would cause greater harm than the original void action."
3. Add to Acceptance_Protocol.md capture dashboard gate: "Emergency normalization metrics (required at baseline): cumulative IOA-mode governance duration per region per rolling 8-quarter window; domain-cycling pattern flag; IOA-to-normal-governance decision ratio per region per quarter. These metrics must be live at the time of launch."
**Human judgment required:** YES -- founding team must define the three named emergency category trigger tests. This plan names the categories but cannot define the trigger tests without founding-team policy decisions.

### C4 -- P2-C: Emergency Taxonomy -- Master Definition

**Source:** full-corpus-remediation-plan.md P2-C
**File:** `docs/constitution/INVARIANTS.md` (new annotation or INV-013) or new `docs/governance/Protected_Terms_Registry.md`
**Issue:** "Emergency" is used in three incompatible ways in the corpus with no master definition. Supply Emergency (L3 table criteria), Governance Emergency (ANNEX_AC Section AC1.3/AC2.2), and Infrastructure Emergency (ANNEX_C) each have distinct trigger tests with no cross-reference or priority rule.
**Fix shape:** Create a protected-terms registry entry defining three mutually exclusive emergency categories with priority rule: "Supply Emergency takes precedence if conditions satisfy multiple categories simultaneously. Governance Emergency may not justify any action that Supply or Infrastructure Emergency would not justify." The Supply Emergency trigger tests already exist (ANNEX_L L3 table). Governance Emergency trigger tests require founding-team policy decisions (C3 dependency). Infrastructure Emergency trigger tests require ANNEX_C review.
**Recommended location:** New `docs/governance/Protected_Terms_Registry.md`. This file must be registered in `scripts/export_corpus.py` (CORE_DOCS, section_for(), and optionally FEATURED_PATHS).
**Human judgment required:** YES -- Governance Emergency trigger test definition is a policy decision (what evidence level constitutes each level). Supply Emergency tests are already corpus-specified.

### C5 -- P2-E: CIP Budget Oracle Materiality Threshold

**Source:** full-corpus-remediation-plan.md P2-E
**File:** `docs/annexes/ANNEX_AM.md` Section AM8.3
**Issue:** The materiality threshold for the higher-governs mechanism is >2% divergence between oracle measurements. Sustained understatement below 2% would systematically starve CIP funding without triggering the published-discrepancy mechanism. Annual comparison frequency is insufficient to catch drift.
**Fix shape:** Reduce the materiality threshold in Section AM8.3 from ">2% divergence" to ">0.5% divergence" for CIP budget purposes specifically. Change comparison frequency from annual to quarterly.
**Human judgment required:** Partially -- specific threshold value (0.5% vs. 1% vs. 1.5%) is a quantitative policy judgment. The direction (lower threshold, higher frequency) is clear from the founding principles.

### C6 -- P2-F: FAP Tier 2 -- Deliberation Floor and Reasoning Requirement

**Source:** full-corpus-remediation-plan.md P2-F
**File:** `docs/constitution/Acceptance_Protocol.md` (FAP review standard section)
**Issue:** FAP Tier 2 approval has no minimum deliberation time and no written-reasoning requirement. Rubber-stamp review of Tier 2 amendments cannot be retroactively flagged. ANNEX_AG Section AG4 (which reclassifies some protections to Tier 2) is PROPOSED.
**Fix shape:** Add to the FAP review standard section in Acceptance_Protocol.md: "Minimum deliberation for Tier 2 amendments: any Tier 2 amendment must remain in open FAP review for a minimum of 7 calendar days before approval. During this period, the reviewing authority must produce a written reasoning document that: (a) names each evidence requirement reviewed; (b) confirms or explains each requirement's satisfaction; (c) states the reviewer's name and institutional affiliation; and (d) is published to the FAP log before the approval is recorded. A Tier 2 approval issued without a compliant reasoning document is provisionally void pending a 14-day public challenge period."
**Human judgment required:** Partially -- 7-day minimum and specific reasoning checklist are design choices the founding team should confirm.

### C7 -- P2-G: Founding Panel Self-Certification Gaps

**Source:** full-corpus-remediation-plan.md P2-G
**Files:** `docs/annexes/ANNEX_AH.md` (Sections AH2.2, AH3); `docs/constitution/Acceptance_Protocol.md` (FLD gate)
**Issue:** Three self-certification problems: (1) founding coalition classifies its own incoming objections as structural or procedural; (2) Founding Legitimacy Dossier is prepared and certified by the founding coalition with no independent verifier named; (3) founding panel conflict attestations have an unnamed external verifier with no verification standard specified.
**Fix shape (three-part):**
1. AH2.2 objection classification: "The classification of an incoming objection as structural (extending the 60-day window) or procedural (not extending it) must be made by the duty sub-node of the Federated Ombuds, not by the founding coalition. The founding coalition may provide a written response characterizing the objection, but the classification decision is the Ombuds duty sub-node's alone. The classification must be published within 5 days of objection filing."
2. AH3 conflict attestations: "External verifiers for founding panel conflict attestations must be nominated by the oppose-coalition nominating body designated in AH2.1, not selected by the founding coalition. Verification must include: check of co-publication records using publicly accessible databases, check of institutional affiliation records, and published verification letter with verifier's name and nominating body."
3. Acceptance_Protocol FLD gate: "The conflict register and exit rehearsal findings sections of the Founding Legitimacy Dossier must include independent attestation from a body nominated under the oppose-coalition nominating process, not from an entity retained or selected by the founding coalition."
**Human judgment required:** No -- these are structural independence requirements. The oppose-coalition nominating body identity is a founding-team decision but the independence principle is not.

---

## Traceability and Housekeeping (Lower Priority -- Within 90 Days)

These items do not affect enforcement but reduce audit usability. Batch into one corpus commit.

| Item | File | Change needed |
|:---|:---|:---|
| P3-A: AH8 linkage table | docs/annexes/ANNEX_AH.md | Add missing ACTIVE patches: P-016, P-021, P-024, P-025, P-029 through P-049 in T/P/Annex linkage format |
| P3-B: PRD- registry | New docs/governance/PRD_Registry.md | One-page cross-reference: PRD-001, PRD-003, PRD-004, PRD-008, PRD-009 with T-ID/P-ID aliases; register in export_corpus.py |
| P3-C: TR-/T- cross-reference | docs/annexes/ANNEX_B.md | Add header stating founding (TR-) vs governance (T-) register relationship; add known TR-to-T mapping table |
| P3-D: IC-004 note | docs/governance/Patch_Log.md | P-045 entry: add note that IC-004 is a resolved historical label addressed by ANNEX_AH Section AH5.1 |
| P3-E: Patch sequence gaps | docs/governance/Patch_Log.md | Add retirement/skip notes for P-007, P-010, P-028 |
| P3-F: P-013 anchor collision | docs/governance/Patch_Log.md | Remove or merge duplicate P-013 heading; verify with validate_corpus.py |
| P3-G: ANNEX_AU note | docs/annexes/INDEX.md | Add one-line audit note: AU never assigned / merged / reserved |

---

## Recommended Execution Order

Priority is sequenced by blocking impact and dependency.

**Immediately (founding team action, no corpus work):**
1. A1: Constitute Federated Ombuds -- this is the single highest-leverage action; unblocks more gates than any corpus fix.
2. A3: Formally assign TSP for Tier 0 token mechanism -- can proceed in parallel with A1; does not depend on Ombuds constitution.

**After A1 completes:**
3. A2: FC-YT1/FC-YT2 Ombuds review and published findings -- Ombuds must be seated first.

**First corpus batch (small, can be batched together):**
4. C1: Acceptance_Protocol token mechanism gate entry.
5. C2: P2-D findings authority annotation in ANNEX_AM.
6. P3-F: P-013 anchor collision fix (has validator impact -- fix first in the batch).

**Second corpus batch (requires founding-team policy decisions first):**
7. C5: P2-E CIP budget materiality threshold (founding team confirms threshold value).
8. C6: P2-F FAP Tier 2 deliberation floor (founding team confirms 7-day period).
9. C7: P2-G founding panel self-certification (structural -- no values decision, can proceed immediately).

**Third corpus batch (requires founding-team values decisions):**
10. C3: P2-B IOA trigger standard (after founding team defines emergency category trigger tests -- see HJ dependency in C4).
11. C4: P2-C Emergency taxonomy (after founding team defines Governance Emergency trigger tests).

**Within 90 days:**
12. P3-A through P3-G traceability and housekeeping (batch into one commit).
13. P4/P5 terminology and acceptance test improvements (requires founding-team judgment on P4-A human dignity floor components).

**Long-cycle (CIP-dependent, 210-day minimum):**
14. B1: HC Section VIII Tier 1 amendment (can be initiated now if Ombuds is constituted; CIP ratification required at the end of the 180-day window).

---

## Next Prompts to Run

These are the three implementation contracts that are ready to execute as corpus batches without requiring additional founding-team decisions.

### Prompt 1 -- Small Corpus Batch: Gate Entry + Annotation + Anchor Fix

```
IMPLEMENTATION CONTRACT -- BATCH C1/C2/P3-F

Hard rules: ASCII only (no em dash U+2014, no section sign U+00A7). Smallest safe change only.
After edits: npm --prefix app run generate:corpus && python3 scripts/validate_corpus.py && git diff --check

Item C1 -- Acceptance_Protocol.md token mechanism gate entry:
  File: docs/constitution/Acceptance_Protocol.md
  Add one row to the pre-launch blocking gate table:
  Gate: "Tier 0 token mechanism specification complete and independently verified"
  Clearing conditions: TSP assignment published (operational) AND Federated Ombuds written
  verification finding published (depends on Ombuds constitution and TSP assignment).
  Cross-reference: ANNEX_AZ Section AZ2.1 (specification location).
  Do not add this gate as self-certifying. Do not modify any other gate.

Item C2 -- ANNEX_AM.md findings authority annotation:
  File: docs/annexes/ANNEX_AM.md
  In the P1-E "Interim initiation authority (pre-CIP period)" paragraph, add one sentence
  after "findings authority follows existing corpus provisions for the applicable governance body":
  "For reference: findings for the founding-institution-seat trigger are produced under
  ANNEX_AH Section AH5 governance provisions; findings for the Article VII publication
  trigger are produced under ANNEX_AJ dashboard publication provisions; findings for the
  oracle accreditation trigger are produced under ANNEX_AL Section 3.4; findings for the
  dashboard cadence trigger are produced under ANNEX_AJ dashboard publication provisions."
  Do not modify any other text in ANNEX_AM.

Item P3-F -- Patch_Log.md P-013 anchor collision:
  File: docs/governance/Patch_Log.md
  Remove the duplicate P-013 heading (keep the first occurrence, remove the second).
  Run python3 scripts/validate_corpus.py to confirm anchor collision is resolved.
  If the second occurrence contains substantive content not in the first, merge the content
  into the first occurrence, then remove the duplicate heading.

After all three edits: run generate:corpus, validate_corpus.py, git diff --check.
Then commit as: fix(corpus): add token mechanism gate, AM3 findings annotation, resolve P-013 anchor collision
```

### Prompt 2 -- P2-G Founding Panel Independence (No Values Decision Required)

```
IMPLEMENTATION CONTRACT -- P2-G FOUNDING PANEL SELF-CERTIFICATION ONLY

Hard rules: ASCII only. Smallest safe change only.
After edits: npm --prefix app run generate:corpus && python3 scripts/validate_corpus.py && git diff --check

Three-part fix. Stop and report OWNER DECISION REQUIRED if any ambiguity about scope.

Part 1 -- ANNEX_AH.md Section AH2.2:
  File: docs/annexes/ANNEX_AH.md
  Find the objection classification language in Section AH2.2.
  Add (or replace if existing language contradicts): "The classification of an incoming
  objection as structural (extending the 60-day window) or procedural (not extending it)
  must be made by the duty sub-node of the Federated Ombuds, not by the founding coalition.
  The founding coalition may provide a written response characterizing the objection, but
  the classification decision is the Ombuds duty sub-node's alone. The classification must
  be published within 5 days of objection filing."
  Do not modify any other section of ANNEX_AH.

Part 2 -- ANNEX_AH.md Section AH3:
  File: docs/annexes/ANNEX_AH.md
  Find the conflict attestation external verification language in Section AH3.
  Add: "External verifiers for founding panel conflict attestations must be nominated by
  the oppose-coalition nominating body designated in AH2.1, not selected by the founding
  coalition. Verification must include: check of co-publication records using publicly
  accessible databases, check of institutional affiliation records, and published verification
  letter with the verifier's name and nominating body."
  Do not modify any other section of ANNEX_AH.

Part 3 -- Acceptance_Protocol.md FLD gate:
  File: docs/constitution/Acceptance_Protocol.md
  Find the Founding Legitimacy Dossier gate entry.
  Add to clearing conditions: "The conflict register and exit rehearsal findings sections
  of the Founding Legitimacy Dossier must include independent attestation from a body
  nominated under the oppose-coalition nominating process, not from an entity retained or
  selected by the founding coalition."
  Do not modify any other gate.

After all three edits: run generate:corpus, validate_corpus.py, git diff --check.
Then commit as: fix(governance): require independent objection classification and FLD attestation (P2-G)
```

### Prompt 3 -- P3 Traceability Housekeeping Batch

```
IMPLEMENTATION CONTRACT -- P3-A/P3-B/P3-C/P3-D/P3-E/P3-G TRACEABILITY ONLY

Hard rules: ASCII only. Smallest safe change only. Do not modify any annex beyond what is specified.
After edits: npm --prefix app run generate:corpus && python3 scripts/validate_corpus.py && git diff --check

P3-A -- docs/annexes/ANNEX_AH.md Section AH8:
  Add missing ACTIVE patches to the linkage table: P-016, P-021, P-024, P-025, and
  P-029 through P-049 in the existing T-ID / P-ID / Annex linkage row format.
  Read the Patch_Log.md for each patch's T-ID and annex reference before adding.
  Do not add PROPOSED or retired patches. Do not change any existing row.

P3-B -- New file: docs/governance/PRD_Registry.md
  Create a one-page cross-reference table with columns: PRD-ID, description, T-ID or P-ID,
  cited in. Minimum entries: PRD-001, PRD-003, PRD-004, PRD-008, PRD-009.
  Register the new file in scripts/export_corpus.py: CORE_DOCS tuple, section_for() list.
  Do not add to FEATURED_PATHS unless instructed.

P3-C -- docs/annexes/ANNEX_B.md:
  Add a header block at the top of ANNEX_B (after the H1 title) stating:
  "This is the founding threat layer (TR-01 through TR-13). The current governance-focused
  threat register is docs/governance/Threat_Register.md (T- namespace). The two registers
  are not merged. Known cross-references: TR-07 maps to T-009 and T-018; TR-04 maps to
  T-025; TR-08 and TR-10 map to threats in ANNEX_L and ANNEX_S."
  Do not modify any existing ANNEX_B content.

P3-D -- docs/governance/Patch_Log.md:
  In the P-045 entry, add a note: "IC-004 was an internal working label for the governance
  gap after P-013 suspension; the problem it named is addressed by this patch in ANNEX_AH
  Section AH5.1. No IC- registry is maintained; this label is a historical artifact."

P3-E -- docs/governance/Patch_Log.md:
  Add retirement/skip notes for P-007, P-010, and P-028. Use the same format as existing
  retired or skipped patch entries in the log. If the format is not established, use:
  "P-NNN: [Never assigned / Merged into P-XXX / Retired -- rationale]. Historical artifact only."

P3-G -- docs/annexes/INDEX.md:
  Add one line for ANNEX_AU in sequence between AT and AV:
  "ANNEX_AU -- [Never assigned / Reserved / Merged] -- historical gap, no active annex."
  Verify the actual status from the git log or patch log before filling in the bracketed choice.

After all edits: run generate:corpus, validate_corpus.py, git diff --check.
Then commit as: fix(corpus): add P3 traceability repairs -- AH8 completeness, PRD registry, namespace notes
```

---

## Warnings

**Agent 4 fabricated output.** The agent dispatched to investigate P2-B through P2-G returned findings citing file names not present in this corpus. The files it named (constitution.md, oracle-framework.md, ioauth.md, timelock.md, hard-lock.md, drift-chain.md, ledger.md, ombuds-registry.md, federation.md) do not exist. Its P2-B through P2-G item descriptions did not match the actual remediation plan. All P2-B through P2-G specifications in this report were sourced from `full-corpus-remediation-plan.md` directly. If any future agent or reviewer cites Agent 4's output, treat it with extreme skepticism and cross-check against the authoritative plan.

**Agent 3 AG1/AG4 discrepancy.** Agent 3 reported AG1 and AG4 gates as absent from Acceptance_Protocol.md. The post-remediation verification report (P0-E, status Verified) confirms both gates are present with correct clearing conditions. Agent 3's finding on this point is superseded. Do not re-open P0-E based on Agent 3's report.

**CIP constitution is a prerequisite for HC Section VIII amendment.** The 210-day Tier 1 amendment cycle cannot complete without CIP concurrent ratification. The CIP cannot be constituted until the Founding Order's first post-activation audit is complete (ANNEX_AM Section AM8.7). This creates a sequencing constraint: if the founding team wants to reconcile HC Section VIII formally, the post-activation audit must complete first, then the CIP is constituted, then the 210-day cycle can complete. The ANNEX_J governing clause covers enforcement throughout this period; but the formal constitutional text will remain inconsistent until all these milestones are passed.

**P2-B and P2-C are co-dependent.** The IOA trigger standard (C3/P2-B) requires reference to named emergency categories. The emergency taxonomy master definition (C4/P2-C) defines those categories. P2-C should be drafted first or in the same batch as P2-B. Implementing P2-B without P2-C leaves the trigger-standard clause referencing a Protected Terms Registry entry that does not yet exist.

**Ombuds constitution unlocks almost everything else.** With the exception of the TSP assignment and the HC Section VIII amendment, every unresolved gate clearance in Category A depends on the Ombuds being constituted. The founding team should treat A1 as the critical path item. Corpus work in batches 1 and 2 can proceed without the Ombuds, but gate clearance cannot.

**No corpus changes may be made to the three protected files without explicit user authorization:** `docs/constitution/Humane_Constitution.md`, `docs/constitution/Acceptance_Protocol.md` (except for the additive gate entry in C1, P2-G Part 3, and C6 -- these are explicitly specified here), and `docs/constitution/INVARIANTS.md`. The Prompts above respect this constraint.

---

*This report is a planning document only. No source corpus files were modified during its preparation. All specifications are drawn from full-corpus-remediation-plan.md as the authoritative source. Agent 4 fabricated content has been identified and excluded. The report reflects corpus state at commit 50ab363.*
