# CRP Bootstrap Status Packet

**Status:** ANALYSIS ONLY -- no governance action has been taken  
**Date:** 2026-05-15  
**Resolves:** OQ-1 from Federated_Ombuds_Constitution_Packet.md  
**Purpose:** Determine whether the Constitutional Review Panel (CRP) is constituted and able to confirm sub-Ombuds Commissioners; identify the bootstrap path if it is not.

---

## 1. Purpose

The Federated Ombuds cannot be constituted without CRP confirmation of each sub-Ombuds Commissioner (2/3 CRP vote, ANNEX_AI Section 2.1). This packet answers three questions:

1. Is the CRP currently constituted and able to vote?
2. If not, what mechanism does the corpus provide for the founding period?
3. What decision does the founding team need to make before Ombuds appointment can proceed?

This packet does not constitute the CRP. It does not claim any vote has occurred. It does not modify any constitutional source text.

---

## 2. Source Authority

| Function | Source | Section |
|---|---|---|
| CRP membership composition | ANNEX_L.md | L2 |
| CRP sortition and reserve pool | ANNEX_S.md | S1-S4 |
| CRP sub-Ombuds confirmation role | ANNEX_AI.md | 2.1 |
| CRP sub-Ombuds removal role | ANNEX_AI.md | 2.4 |
| Provisional CRP definition and limits | ANNEX_N.md | Days 0-30 window |
| Provisional CRP Tier 1 restriction | ANNEX_U.md | U2 |
| Founding panel CRP reserve requirement | ANNEX_AH.md | AH3, P-014 |
| Pre-CRP constitution dependency note | docs/governance/Patch_Log.md | Line 293 |
| P-014 five-stage process | ANNEX_AH.md | AH3 |
| Founding panel challenge window | docs/governance/Founding_Preactivation_Disclosure.md | Panel Composition table |
| Post-activation audit status | docs/governance/Founding_Legitimacy_Dossier.md | Audit Status row |

---

## 3. CRP Role Map

All roles the CRP holds in the corpus:

| Role | Source | Notes |
|---|---|---|
| Confirm sub-Ombuds Commissioners (2/3 vote) | ANNEX_AI.md Section 2.1 | Blocks Ombuds constitution |
| Remove sub-Ombuds Commissioners (3/4 supermajority) | ANNEX_AI.md Section 2.4 | Ongoing governance |
| Ratify Tier 1 amendments | ANNEX_AH.md, ANNEX_AM.md AM8.5 | Requires 5-of-7 CIP after CIP constituted |
| Conduct constitutionality reviews on own motion | ANNEX_AM.md AM8.6 | After CIP activation gate (AM8.7) |
| Review Tier 2 treaty impact assessments | ANNEX_AM.md AM6 | Ongoing |
| Review founding-period disputes | ANNEX_AH.md | During P-014 challenge window |
| Founding panel participant (reserve member) | ANNEX_AH.md AH3, P-014 | One CRP reserve member lot-drawn for founding panel |

Note: ANNEX_AM establishes the Constitutional Integrity Panel (CIP) as a separate body distinct from the CRP. The CIP (AM8) handles Tier 1 amendment ratification after its own activation gate (AM8.7). The CRP handles sub-Ombuds confirmation. These are two different bodies with different composition and authority.

---

## 4. CRP Constitution Requirements

### Membership (ANNEX_L Section L2)

| Category | Count | Selection method |
|---|---|---|
| Jurists | 4 | Lot from eligibility pool |
| Systems reviewers | 3 | Lot from eligibility pool |
| Ombuds/public-interest advocates | 2 | Lot from eligibility pool |
| Civic auditors | 2 | Sortition |
| **Total** | **11** | |

### Quorum and Voting Threshold

| Decision type | Threshold | Source |
|---|---|---|
| Sub-Ombuds Commissioner confirmation | 2/3 of CRP (8 of 11) | ANNEX_AI.md Section 2.1 |
| Sub-Ombuds Commissioner removal | 3/4 of CRP (9 of 11) | ANNEX_AI.md Section 2.4 |
| General quorum | Not specified separately in ANNEX_L | ANNEX_L.md |

### Appointing Body / Selection Process

ANNEX_L specifies sortition from eligibility pools. The corpus does not name a specific body that administers the initial sortition before any CRP exists. ANNEX_S defines the reserve pool and staggered replacement process for an ongoing CRP but does not define who conducts the founding draw.

### Independence Requirements

ANNEX_S anti-capture rules apply: primary panel plus reserve pool via staggered sortition; failure recovery ladder Stages 1-4 if quorum cannot be reached.

### Publication Requirements

Corpus does not specify a publication requirement for the initial CRP constitution record in a dedicated location. ANNEX_AI Section 2.1 requires that sub-Ombuds confirmations be recorded in the Article VII dashboard.

### Gaps in the CRP Constitution Specification

| Gap | Notes |
|---|---|
| Who administers the initial lot draw? | Not named; implied founding team or provisional CRP |
| What are the eligibility pool definitions? | ANNEX_L references pools but does not publish them |
| Where is the CRP constitution record published? | No dedicated publication requirement found |
| What constitutes proof of CRP constitution? | No source defines an evidence artifact |

---

## 5. Current CRP Status

**Classification: UNKNOWN -- No source record found confirming constitution**

### Evidence reviewed

| Item | Finding |
|---|---|
| ANNEX_L sortition roster | No roster found; no confirmation of sortition completion |
| CRP vote records | No records found in any source file |
| Article VII dashboard entry for CRP constitution | No entry found (dashboard not yet operational per founding status) |
| Founding_Preactivation_Disclosure.md panel composition | All member names listed as [NAME] or [NAME -- lot-drawn]; founding panel NOT confirmed |
| Founding_Legitimacy_Dossier.md post-activation audit | Status: DESIGNED (not completed) |
| Patch_Log.md line 293 | Explicit note: "Service Record sector ceilings specified at founding (pre-CRP constitution)" -- corpus acknowledges CRP not yet constituted at that dependency point |
| P-014 five-stage process stage | Stage 1: 60-day public challenge window (April 10 - June 9, 2026). Challenge window is still open as of May 15, 2026. Full sortition-based CRP constitution follows challenge window completion, not precedes it. |

### What "Unknown" means operationally

The CRP has not been proven constituted. No source record exists confirming that:
- The 11-member sortition draw has occurred
- The four eligibility pools have been defined and published
- Any CRP member has been seated
- The CRP has voted on any matter

The founding panel (P-014 Stage 1) includes a CRP reserve member drawn by lot, but this is one reserve-pool member for a specific founding-panel function -- it is not equivalent to constituting the full 11-member CRP.

---

## 6. Bootstrap Dependency Analysis

| Downstream action | Requires CRP vote? | Source | Current status | Evidence artifact |
|---|---|---|---|---|
| Sub-Ombuds Commissioner confirmation (each) | Yes -- 2/3 vote | ANNEX_AI.md Section 2.1 | BLOCKED | None |
| Federated Ombuds pre-launch gate (4 of 5 seated) | Yes -- CRP must confirm each | ANNEX_AI.md Section 2.1 | BLOCKED | None |
| INV-LAUNCH-1 Ombuds review of FC-YT1/FC-YT2 | Yes -- Ombuds must be constituted | ANNEX_AI.md; INVARIANTS.md INV-LAUNCH-1 | BLOCKED | FC-YT1/FC-YT2 registrations complete; review blocked |
| Real-persons enrollment | Yes -- INV-LAUNCH-1 must clear | INVARIANTS.md INV-LAUNCH-1 | BLOCKED | None |
| Sub-Ombuds Commissioner removal | Yes -- 3/4 vote | ANNEX_AI.md Section 2.4 | Not triggered; irrelevant until seated | None |
| Tier 1 amendment ratification | No -- CIP (not CRP) after AM8.7 activation gate | ANNEX_AM.md AM8.5-AM8.7 | CIP activation gate requires post-activation audit (DESIGNED) | None |
| Founding challenge window review | One CRP reserve member (founding panel role) | ANNEX_AH.md AH3 | P-014 Stage 1 open through June 9, 2026 | Founding_Preactivation_Disclosure.md |

---

## 7. Bootstrap Gap Analysis

Does the corpus define the following for the pre-CRP-constitution period?

| Question | Answer | Source | Notes |
|---|---|---|---|
| Who initiates the initial CRP sortition draw? | Not specified for full CRP | None found | Gap |
| How are initial CRP members nominated? | Eligibility pools, not further defined | ANNEX_L.md Section L2 | Pool definitions not published |
| How is the initial CRP confirmed? | Not specified | None found | Gap; ongoing replacement uses ANNEX_S process |
| What is the minimum quorum before any CRP vote? | Not specified separately | None found | Gap; implied 8 of 11 for sub-Ombuds confirmation |
| Does the corpus grant the founding team temporary CRP authority? | No explicit grant found | None found | Gap |
| Is there a fallback mechanism if full CRP is absent? | Yes -- Provisional CRP (ANNEX_N, ANNEX_U) | ANNEX_N.md; ANNEX_U.md U2 | Key finding: see Section 8 |
| Does the provisional CRP have sub-Ombuds confirmation authority? | Not explicitly stated; not excluded | ANNEX_N.md; ANNEX_AI.md Section 2.1 | Owner decision required |
| Does the provisional CRP have Tier 1 authority? | No -- explicitly zero Tier 1 authority | ANNEX_U.md U2 | Sub-Ombuds confirmation is Tier 2; provisional CRP restriction is on Tier 1 |

### Key finding: Provisional CRP mechanism

ANNEX_N (Days 0-30 founding window) defines a provisional CRP appointed "by mixed lot of provisional CRP and provisional oracle quorum under founding-exclusion rules." ANNEX_U2 states: "The provisional Constitutional Review Panel (CRP) has zero Tier 1 authority. It may not redefine invariants, ratify disguised convertibility, or permanently validate founding shortcuts."

The provisional CRP restriction is specifically on Tier 1 authority. Sub-Ombuds Commissioner confirmation (ANNEX_AI Section 2.1) is a Tier 2 operational appointment. The restriction does not explicitly prohibit the provisional CRP from exercising sub-Ombuds confirmation authority.

This is the central interpretive question for the bootstrap path. The corpus does not explicitly grant this authority to the provisional CRP, nor does it explicitly prohibit it. Owner decision required.

---

## 8. Options for Resolution

**Resolution status as of 2026-05-16:** Option D has been executed (see docs/governance/OQ_CRP_1_Adopted_Interpretation.md). The founding authority adopted Option B (provisional CRP mechanism) as the bootstrap path. Option A (locate existing record) was not applicable -- no record was found. Option C (wait for full P-014 completion) was assessed and rejected as timeline risk is unacceptable. The owner decision record for the provisional CRP draw and process parameters is at docs/governance/Provisional_CRP_Owner_Decision_Record.md.

These options are presented as historical record of the analysis. The decision has been made.

### Option A -- Locate Existing Record

Search for any existing CRP constitution record not yet found in this analysis. Possible locations: founding records outside the current corpus, external documents referenced but not linked, verbal or informal records.

Assessment: Low probability of success. All accessible source files have been searched. No record found. If a record exists, it is not in the corpus and would need to be formalized.

### Option B -- Constitute CRP Using Provisional Mechanism (ANNEX_N / ANNEX_U2)

Treat the provisional CRP as the operative mechanism for sub-Ombuds confirmation. Create a CRP constitution packet for the provisional CRP specifically: define the appointing method ("mixed lot under founding-exclusion rules"), seat provisional CRP members, and then use the provisional CRP to confirm sub-Ombuds Commissioners.

Advantages: Supported by corpus text (ANNEX_N); does not require waiting for full P-014 process completion; unlocks Ombuds constitution path.

Risks: ANNEX_AI Section 2.1 says "2/3 vote of the CRP" -- it does not say "provisional CRP." If CRP means only the full 11-member sortition body, this path requires a corpus interpretation ruling. The provisional CRP's authority over Tier 2 appointments has not been explicitly established.

Requires owner decision on: whether "CRP" in ANNEX_AI Section 2.1 includes the provisional CRP.

### Option C -- Source-Text Fallback

Treat the existing corpus language as blocking until the full P-014 process completes and the full CRP is constituted via standard sortition. Timeline: P-014 challenge window closes June 9, 2026; post-challenge steps (Stage 2-5) follow; full CRP sortition is a separate action after founding panel confirmation.

Advantages: No interpretive risk; clean corpus compliance.

Risks: Significantly extends INV-LAUNCH-1 clearance timeline; real-persons enrollment remains blocked for months or longer. Founding Legitimacy Dossier post-activation audit is "DESIGNED" (not completed), which is itself a prerequisite for the CIP activation gate (AM8.7).

### Option D -- Owner Decision on CRP Authority Scope

Before any action, the founding team formally documents a ruling on whether ANNEX_AI Section 2.1's "CRP" includes the provisional CRP defined in ANNEX_N. This ruling should be recorded as a founding interpretation, published in the Article VII dashboard (when operational), and noted in the Founding Legitimacy Dossier.

This option is not mutually exclusive with B or C -- it is the required predicate step before either can proceed cleanly.

---

## 9. Recommended Next Action

**Status as of 2026-05-16: Step 1 is complete.** The founding authority has issued the interpretation ruling (Option D) and adopted Option B. The required founding record is at docs/governance/OQ_CRP_1_Adopted_Interpretation.md. The Federated_Ombuds_Constitution_Packet.md Precondition 1 has been updated to cross-reference the adopted interpretation.

**Remaining steps:**

1. Complete docs/governance/Provisional_CRP_Human_Input_Form.md with real data (eligibility pool, observer panel, seed source, sponsor list, written reasons, minority views).
2. Execute the draw and certification process per docs/governance/Provisional_CRP_Draw_and_Roster_Certification_Packet.md.
3. Satisfy all ANNEX_U Section U2 pre-effect conditions before any provisional CRP confirmation vote may proceed.
4. Proceed to sub-Ombuds confirmation per docs/governance/Federated_Ombuds_Constitution_Packet.md.

---

## 10. Template -- CRP Status Certification

**TEMPLATE -- NOT ADOPTED. This template is provided for future use when the CRP is constituted. No values have been filled in. Use of this template requires a real sortition record, real member names, and a real vote.**

---

CRP STATUS CERTIFICATION
Date: [DATE]
Certifying authority: [NAME, ROLE]

1. CRP constitution method: [Provisional per ANNEX_N / Full sortition per ANNEX_L / Other -- specify]
2. CRP member count at time of certification: [NUMBER] of 11
3. Sortition record location: [FILE PATH OR EXTERNAL REFERENCE]
4. Eligibility pool definitions published at: [FILE PATH]
5. Independence verification completed: [YES / NO] [DATE]
6. CRP quorum available for sub-Ombuds confirmation vote: [YES / NO]

Sub-Ombuds confirmation authority: [AVAILABLE / NOT AVAILABLE]
Reason if not available: [TEXT]

Founding interpretation record (if provisional CRP): [FILE PATH OR "None"]

This certification was reviewed by: [NAME, ROLE]
Published in Article VII dashboard: [YES / NO] [DATE]

TEMPLATE -- NOT ADOPTED

---

## 11. Open Questions

| ID | Question | Source | Status |
|---|---|---|---|
| OQ-CRP-1 | Does ANNEX_AI Section 2.1 "CRP" include the provisional CRP defined in ANNEX_N? | ANNEX_AI.md Section 2.1; ANNEX_N.md | RESOLVED -- Option D interpretation adopted; Option B provisional CRP path selected. Execution conditions remain unsatisfied. See docs/governance/OQ_CRP_1_Adopted_Interpretation.md |
| OQ-CRP-2 | Who administers the initial mixed-lot draw for the provisional CRP? | ANNEX_N.md | Not specified in source; founding team presumed |
| OQ-CRP-3 | What are the eligibility pool definitions for the full ANNEX_L sortition? | ANNEX_L.md Section L2 | Not published in accessible corpus |
| OQ-CRP-4 | Where is the founding interpretation record published before the Article VII dashboard is operational? | None found | Gap; provisional location needed |
| OQ-CRP-5 | Does the Patch_Log line 293 "pre-CRP constitution" note imply any specific founding team authority, or is it descriptive only? | Patch_Log.md Line 293 | Interpretive; owner decision recommended |
| OQ-CRP-6 | Is the founding panel CRP reserve member (ANNEX_AH AH3) the same pool as the ANNEX_S reserve pool, or a separate designation? | ANNEX_AH.md AH3; ANNEX_S.md | Ambiguous; affects whether reserve pool is pre-established |
| OQ-CRP-7 | What is the expected timeline for P-014 Stage 2-5 completion after the June 9, 2026 challenge window closes? | ANNEX_AH.md AH3 | Not specified; founding team must estimate |

---

*This packet resolved the OQ-1 interpretive question only. CRP constitution, draw, challenge window, observer attestation, and confirmations remain incomplete. The provisional CRP mechanism (ANNEX_N, ANNEX_U2) is the selected bootstrap path only within the adopted interpretation's limits. No constitutional source text was modified.*
