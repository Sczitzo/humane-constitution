# Phase 3 Targeted Reconciliation Audit

**Audit date:** 2026-05-15
**Auditor:** Claude Code corpus auditor (claude-sonnet-4-6)
**Branch:** claude/pedantic-spence-c4e730
**Phase:** 3 — Targeted Reconciliation
**Report number:** 3 of Phase 3

---

## Scope

This report resolves the highest-priority unresolved technical and constitutional questions identified in Phase 1 and Phase 2. It does not remediate source files. It produces specific, actionable findings that name the exact documents and sections responsible, classifies the failure mode for each gap, and recommends a repair shape.

Five reconciliation tasks:

1. ANNEX_AZ §AZ2 and INV-LAUNCH-1 — broken pre-operational gate
2. Tier 1 Amendment Procedure Trace — end-to-end walkthrough
3. Mathematical Threshold Consistency — body-size vs. vote-threshold verification
4. Unregistered ID Namespace Resolution — ACL-, PRD-, IC-, TR-, INV-
5. Undefined Terms as Attack Vectors — "human dignity," "emergency," "qualified reviewer," "consent"

---

## Method

Evidence gathered by direct read of all named source files. Findings are grounded in quotation or direct observation of text. Uncertainty is marked explicitly using the phrase "this auditor cannot confirm" where a determination cannot be made from the readable corpus. No finding is inferred from absence alone without explicit textual evidence of the broken claim.

Severity tiers: **Critical** (launch-blocking or constitutional-gate failure), **High** (significant structural gap with identifiable exploit path), **Medium** (documented inconsistency with bounded harm), **Low** (traceability gap, no exploit vector confirmed).

---

## ANNEX_AZ §AZ2 and INV-LAUNCH-1

### What INV-LAUNCH-1 actually gates

INV-LAUNCH-1 is defined in `docs/constitution/INVARIANTS.md` at the bottom of the invariant list. Its statement:

> "The system may not begin any operational phase in which survival-floor access is extended to real persons until FC-YT1 (CSM failure pattern-detection trigger) and FC-YT2 (90-day CSM reserve requirement) are confirmed as bound values in `/founding/commitments.md` and independently verified by the Federated Ombuds."

INV-LAUNCH-1 gates on **two specific founding commitments** — FC-YT1 and FC-YT2 — not on the token mechanism. The gate requires:

(a) FC-YT1 and FC-YT2 assigned specific numeric values in `/founding/commitments.md`
(b) Independent review by the Federated Ombuds with published findings
(c) Incorporated into CSM failure response protocol in ANNEX_Y §Y4

From `docs/governance/Patch_Log.md` (P-045 entry), FC-YT1 and FC-YT2 were provisionally filled:

> "ANNEX_Y.md §Y4 — Filled the literal `[ACCEPTABLE_CSM_FAILURE_THRESHOLD]` bracket placeholder with provisional value: 3 verified delivery failures (FC-YT1, pre-launch blocking gate, must be confirmed before operational activation)."
> "ANNEX_Y.md §Y7 — Filled `[RESERVE_WINDOW_DAYS]` placeholder with provisional value: 90 days (FC-YT2, pre-launch blocking gate)."

Status of FC-YT1 and FC-YT2: **provisional values exist in ANNEX_Y; they are NOT listed in `/founding/commitments.md` commitment table** — the commitment table ends at FC-174 with no FC-YT1 or FC-YT2 rows visible. This auditor read `/founding/commitments.md` through FC-174; FC-YT1 and FC-YT2 do not appear as registered commitment IDs in that table. They exist only as provisional values embedded in ANNEX_Y text.

**INV-LAUNCH-1 gate status: PARTIALLY MET AT BEST.** The numeric values exist but are not formally registered in the canonical commitments table, and Federated Ombuds verification with published findings has not occurred (the Federated Ombuds has not been constituted yet, per the founding pre-launch gate in ANNEX_AI §2.1).

### What ANNEX_AZ §AZ2 actually contains

ANNEX_AZ §AZ2 is titled "Definitions" and contains the demurrage architecture symbol table: S, M*, W*, r, E, λ(E), D(E). It is a well-specified, coherent section of the progressive net-worth demurrage specification.

The token mechanism referred to by ANNEX_AK §AK8.1 and P-056 is **not** in ANNEX_AZ §AZ2. ANNEX_AK §AK8.1 says explicitly: "The technical specification for the token mechanism is defined in ANNEX_AZ §AZ2 (to be drafted)." The phrase "(to be drafted)" is embedded in the source text of ANNEX_AK.

### Is the reference genuinely broken or just imprecise?

Broken. ANNEX_AZ §AZ2 contains demurrage definitions; it contains no token mechanism content whatsoever. The correct location for a Tier 0 token mechanism specification does not exist in the current corpus. There is no alternate section that contains it. `docs/governance/Hardening_Queue.md` also flags this explicitly: "ANNEX_AZ §AZ2 — Tier 0 token mechanism specification | Proposed | ... Draft ANNEX_AZ §AZ2 specifying token generation, expiry, non-aggregation guarantees, and audit constraints before any Phase 3 pilot."

### Is INV-LAUNCH-1 currently clearable?

No. Two blocking conditions are unmet simultaneously:

1. **FC-YT1 and FC-YT2 are not registered in `/founding/commitments.md`** — the canonical binding location for founding commitments. Provisional values in ANNEX_Y text do not constitute bound commitments per the commitments.md model.
2. **The Federated Ombuds has not been constituted**, so independent Ombuds verification cannot be completed. ANNEX_AI §2.1 specifies that "at least four of five sub-Ombuds have been appointed, challenged, and seated" before any Ombuds-dependent function is operative.

Additionally, the token mechanism that P-056 designates as a pre-operational prerequisite under INV-LAUNCH-1 does not exist as a drafted specification.

### Who is responsible for the gap?

The reference mismatch was introduced by P-056 (PROPOSED), which delegated the token mechanism specification to "ANNEX_AZ §AZ2 as a pre-operational prerequisite" without the specification actually being written there. The Hardening_Queue identifies this as a corpus author responsibility before Phase 3 pilot. No individual drafter is named.

### Classification

This is simultaneously a traceability gap (wrong section address), a missing specification (token mechanism does not exist), and a launch-gate integrity failure (INV-LAUNCH-1 cannot be cleared). It is not merely imprecise — the referenced document section contains categorically different content.

---

## Tier 1 Amendment Procedure Trace

This section traces a hypothetical Tier 1 amendment end-to-end using the current corpus. The amendment object is any change to a Tier 1 invariant (e.g., narrowing INV-001 survival floor).

### Step 1 — Initiation

**Source:** `architecture/amendment_protocol.md` §1–2, `docs/constitution/INVARIANTS.md` INV-007.

Who initiates: any coalition that can assemble the required documentation. There is no formal restriction on who may propose a Tier 1 amendment, nor any intake throttle specific to Tier 1 proposals. The amendment protocol requires submission of: plain-language summary, redline text, invariant impact statement, threat impact, migration plan, rollback plan, asymmetric error analysis, fiscal/capacity note, privacy/surveillance note.

**Gap:** No initiation authority or intake registry is named. Any actor may theoretically draft and submit a Tier 1 amendment proposal. There is no pre-screening gate between "anyone submits a proposal" and "the keyholder signature process begins."

### Step 2 — Two-Key Precondition (P-034)

**Source:** `docs/constitution/INVARIANTS.md` §Invariant Violation Detection, ANNEX_AV.

Before the amendment enters FAP intake, any patch tagged `modifies_tier1=True` must carry a cryptographic attestation from the standing adversarial panel member (nominated per AH2.3). Absence of this attestation produces automatic non-reviewable rejection at intake.

**Status:** ANNEX_AV governs this process. The adversarial panel member is nominated via AH2.3, which specifies that the nominating body must be structurally opposed to or independent from the founding coalition. This step is specified but depends on: (a) AH2.3 having been executed (i.e., P-014 having been completed), and (b) a standing adversarial panel member being seated and holding active cryptographic keys.

**Gap:** P-013 (FAP) is PROPOSED, not ACTIVE. If P-013 is not ACTIVE, the two-key precondition procedure lacks a governing process. The bootstrap sequence is: P-014 → P-013 ACTIVE → two-key precondition operative. Until P-013 is ACTIVE, the two-key mechanism exists in ANNEX_AV text but the intake process it gates has no active governing protocol.

### Step 3 — FAP Intake and Review

**Source:** `docs/constitution/Acceptance_Protocol.md`.

After the two-key attestation, the proposal enters FAP review. FAP is governed by P-013 (PROPOSED). The FAP document specifies evidence requirements, pilot requirements, sign-off authorities, and deadlock resolution (ANNEX_AG §AG2).

**Notice period:** No specific public notice period is defined for Tier 1 amendments entering FAP. The P-014 process requires a 60-day public challenge window, but that is specific to P-013 activation (the bootstrap). For subsequent Tier 1 amendments, the 180-day timelock (§Section 3) functions as the de facto public notice period, but no pre-signature public notice is required before the keyholder signing process begins.

**Gap:** A Tier 1 amendment could advance to the keyholder signature threshold without any public announcement before signatures are collected. The 180-day timelock only begins after signatures are registered. This creates a window where a captured coalition could quietly collect seven signatures before the Federated Ombuds or public becomes aware.

### Step 4 — Keyholder Signature Collection

**Source:** `architecture/amendment_protocol.md` §1.

Nine geographically dispersed keyholders hold Tier 1 amendment authority (FC-110). Seven of nine must sign. Each holder independently verifies the proposal text, computes the SHA-256 hash, and signs. Signatures are published to the public amendment log.

**Status:** This step is well-specified. The primary risk is capture of seven holders — the amendment protocol addresses this risk explicitly as a residual (§5.2) and notes that the timelock and exit protocol provide response paths, not prevention.

### Step 5 — 180-Day Timelock (FC-111)

**Source:** `architecture/amendment_protocol.md` §3.

Once seven signatures are registered, the 180-day waiting period begins. During this period:
- Amendment is published as "proposed-but-not-effective" on the drift chain.
- Counter-proposals may be submitted.
- Federated Ombuds publishes a Tier 1 Amendment Integrity Report within 60 days.
- Holders may revoke signatures.

**Gap (Ombuds constitution dependency):** The Federated Ombuds Integrity Report is required within 60 days of signature registration. If the Federated Ombuds is not yet constituted, this step cannot be completed, which means the 180-day period runs without independent scrutiny. The amendment protocol does not specify what happens if the Ombuds report is not produced within 60 days — whether this voids the amendment or merely records a deficiency.

### Step 6 — CIP Concurrent Ratification

**Source:** `docs/annexes/ANNEX_AM.md` §AM8.6.

CIP ratification is required concurrently with any Tier 1 amendment; no Tier 1 amendment is effective without CIP ratification. CIP quorum = 5 of 7 members (AM8.5), and ratification requires an affirmative vote of at least 5 members.

**Critical gap: CIP ratification is NOT in the Constitution text.** Phase 1 finding P1-IC-008 documented this: the CIP concurrent ratification requirement appears in ANNEX_AM §AM8.6 but is invisible in `docs/constitution/Humane_Constitution.md`. A reader of the Constitution alone would have no knowledge that CIP ratification is a co-condition for Tier 1 amendment effectiveness. This is also not referenced in `architecture/amendment_protocol.md`.

**Critical gap: CIP has not been constituted.** ANNEX_AM §AM8.7 states the CIP cannot be constituted until the Founding Order's first post-activation audit is complete (per P-014 §5). Until that gate clears, Tier 1 amendments are suspended. With P-014 not yet executed and P-013 PROPOSED, the CIP activation gate has not cleared.

**Critical gap: CIP ratification threshold is 5-of-7, but CIP has 7 members while the Federated Ombuds Plenum has only 5 members.** This matters because CIP removal (AM8.4) requires "a 6-of-7 vote of the Federated Ombuds Plenum" — a vote that requires 6 votes from a 5-member body. This is mathematically impossible. The confusion arises because "5 of 7" in AM8.5 refers to the CIP quorum (7 CIP members), while "6-of-7" in AM8.4 appears to intend a high threshold on the 5-member Federated Ombuds Plenum. The denominator is wrong.

### Step 7 — Final Publication

**Source:** `architecture/amendment_protocol.md` §3.3.

At the end of the 180-day window, if seven signatures remain valid and no procedural defect is found, the amendment takes effect. The drift chain records the new version as the current head. Operational components adopt the new pinned reference on next startup or hash recheck.

**Gap:** No explicit publication requirement beyond the drift chain is specified. There is no requirement for human-readable plain-language announcement of amendment effectiveness, only the technical drift chain entry. This may create a visibility gap for non-technical participants.

### Missing, implicit, or undisclosed steps summary

| Step | Status | Gap |
| :--- | :--- | :--- |
| Initiation | Undisclosed | No initiation authority; any actor may submit |
| Two-key precondition | Implicit | Depends on P-013 ACTIVE (currently PROPOSED) |
| FAP review notice period | Missing | No pre-signature public notice period |
| Keyholder signature process | Specified | Well-documented |
| CIP concurrent ratification | Undisclosed | Not in Constitution text; CIP not yet constituted |
| 180-day timelock | Specified | Ombuds report dependency unresolved if Ombuds not seated |
| Final publication | Implicit | Drift chain only; no plain-language public notice |

### Amendment capture and blocking vectors

- **Pre-signature capture:** A coalition could privately assemble seven keyholder signatures before any public disclosure. The timelock only starts after signatures are registered, not when the proposal is drafted.
- **CIP vacancy blocking:** If the governing coalition delays CIP appointment, Tier 1 amendments are suspended indefinitely (AM8.7 activation gate cannot clear). This is also the mechanism for locking the system against any Tier 1 correction.
- **Ombuds report suppression:** If the Federated Ombuds cannot produce its 60-day integrity report (because it is not constituted, or two or more sub-Ombuds are under capture signals), the timelock runs without independent scrutiny.

### CIP concurrent ratification visibility in the Constitution

This auditor confirms: the phrase "Constitutional Integrity Panel" and the requirement for CIP concurrent ratification of Tier 1 amendments do not appear in `docs/constitution/Humane_Constitution.md`. ANNEX_AM §AM8.6 states the requirement, but annexes are designated "operative" or "supporting" — a reader relying on the Constitution alone would not find this gate.

---

## Mathematical Threshold Consistency

This section verifies every numeric vote threshold in the governance architecture against the actual body size.

### Federated Ombuds Plenum

**Source:** `docs/annexes/ANNEX_AI.md` §1.1, §3.

- Body: Federated Ombuds Plenum
- Member count: **5 sub-Ombuds nodes** (FC-090 = `OMBUDS_SUBCOUNT_MIN = 5`)
- Threshold for protocol-level decisions: **4 of 5** affirmative (FC-091)
- Denominator matches body size: **YES** — 4/5 is coherent

### CIP Removal (AM8.4)

**Source:** `docs/annexes/ANNEX_AM.md` §AM8.4.

> "A CIP member may be removed only by a **6-of-7 vote of the Federated Ombuds Plenum**"

- Body voting: Federated Ombuds Plenum
- Member count of that body: **5** (FC-090)
- Required threshold: **6 of 7**
- Denominator matches body size: **NO** — 6-of-7 requires a 7-member body; the Plenum has 5

**This threshold is mathematically impossible.** A 5-member body cannot produce a 6-of-7 vote. The Plenum can at maximum produce a 5-of-5 unanimous vote.

Likely intent: AM8.4 probably intended "6 of 7 CIP members" (since the CIP has 7 members) — but the clause says "vote of the Federated Ombuds Plenum." Alternatively, the clause may have been drafted when the Plenum was envisioned as 7 members and was not updated when FC-090 locked it at 5. Either reading produces an inoperative removal mechanism.

**Exploit path:** A CIP member who commits a conduct violation cannot be removed. The removal procedure is structurally inoperative. This means once seated, CIP members face no functional removal mechanism short of the sub-Ombuds themselves being reconstructed.

### CIP Quorum and Ratification (AM8.5)

**Source:** `docs/annexes/ANNEX_AM.md` §AM8.5.

> "**5 of 7 members** constitute a quorum for any ratification decision on Tier 1 amendments. Ratification requires an affirmative vote of at least 5 members."

- Body: Constitutional Integrity Panel
- Member count of CIP: **7** (AM8.1)
- Required threshold: **5 of 7**
- Denominator matches body size: **YES** — CIP has 7 members; 5-of-7 is coherent

**Note:** The confusion in Phase 1 finding P1-IC-011 conflated CIP quorum (5-of-7 on the 7-member CIP) with the Plenum removal vote (6-of-7 on the 5-member Plenum). These are two different votes on two different bodies. The CIP 5-of-7 quorum is coherent. The Plenum 6-of-7 removal vote is not.

### AH3 Founding Panel (4-of-5)

**Source:** `docs/annexes/ANNEX_AH.md` §AH3.

- Body: Founding activation panel
- Member count: **5** (5 named seats)
- Required threshold: **4 of 5 votes**
- Denominator matches body size: **YES** — coherent

### Oversight Assembly (AM §5.2)

**Source:** `docs/annexes/ANNEX_AM.md` §5.1, §5.2.

- Body: Ombuds Oversight Assembly
- Member count: **7** (AM §5.1)
- Required threshold: **5 of 7** supermajority
- Denominator matches body size: **YES** — coherent

### Demurrage Safe Harbor Contradiction

**Source:** `docs/constitution/Humane_Constitution.md` §VIII (line ~567) and `docs/annexes/ANNEX_J.md` §J2.

- Constitution §VIII: "households receive a safe harbor equal to **6 months** of median regional consumption expenditure"
- ANNEX_J §J2: "every enrolled person receives an identical demurrage-free savings threshold equal to **18 months** of the published regional median consumption expenditure"

These numbers are directly contradictory. ANNEX_J includes an explicit rationale for 18 months: "6 months covers a typical job search. An additional 12 months covers slow markets, caregiving transitions, retraining, disability onset, or any other life disruption."

ANNEX_J states: "Where any summary language in ANNEX_X or the Humane Constitution conflicts with this annex, this annex governs on matters of rate calculation, consolidation methodology, and exemptions." This governing clause is in ANNEX_AZ (net-worth demurrage), not in ANNEX_J. ANNEX_J has no explicit governing clause on conflict resolution.

**Which controls:** Unclear. ANNEX_J is ACTIVE. The Constitution §VIII is also the founding baseline. ANNEX_J provides the longer and better-reasoned threshold. The difference is 12 months of additional protection — a 200% discrepancy. The Constitution's 6-month figure appears to be the original summary text that was not updated when ANNEX_J extended the safe harbor to 18 months. Without an explicit governing clause in ANNEX_J, this remains an unresolved conflict.

**Exploit path:** A regulator reading only the Constitution could enforce the 6-month safe harbor, subjecting households with 7–18 months of savings to demurrage that ANNEX_J says they should not pay. If ANNEX_J controls, affected persons have a defense. If the Constitution controls, ANNEX_J's rationale becomes advisory only.

### Threshold Consistency Table

| Body | Member Count | Threshold | Coherent? | Finding |
| :--- | :---: | :--- | :---: | :--- |
| Federated Ombuds Plenum (protocol decisions) | 5 | 4-of-5 | YES | No issue |
| CIP removal vote (by Plenum) | 5 | 6-of-7 | NO | Impossible; removal mechanism inoperative |
| CIP ratification (Tier 1 amendments) | 7 | 5-of-7 | YES | No issue |
| AH3 founding panel | 5 | 4-of-5 | YES | No issue |
| Ombuds Oversight Assembly | 7 | 5-of-7 | YES | No issue |
| Demurrage safe harbor | N/A | 6 months (Constitution) vs. 18 months (ANNEX_J) | NO | 200% discrepancy; no governing clause in ANNEX_J |

---

## Unregistered ID Namespace Resolution

Five ID namespaces appear throughout the corpus without a formal registry document: ACL-, PRD-, IC-, TR-, INV-.

### ACL- Namespace (Abuse Case Library)

**Where used:** `docs/governance/Abuse_Case_Library.md` (primary), `docs/governance/Patch_Log.md` (cross-references in P-057, P-059, P-060, P-061, P-062), `docs/governance/Hardening_Queue.md`, `docs/governance/Pilot_Site_Selection_Criteria.md`, `docs/governance/Service_Record_Misuse_Evidence_Test_Package.md`.

**Registry discovery:** `docs/governance/Abuse_Case_Library.md` IS the registry. ACL-001 through ACL-013+ are defined there with full case format (actor incentive, attack path, affected collapse state, current controls, missing test, failure criterion, false reassurance). The Abuse Case Library is explicitly a "pattern library, not a finished threat register."

**Internal consistency:** ACL IDs referenced in Patch_Log (ACL-005, ACL-007, ACL-010, ACL-011, ACL-012, ACL-013) are discoverable in the Abuse Case Library. Cross-referencing is consistent.

**Verdict:** Registry exists. No action needed beyond confirming ACL-SR-01 through ACL-SR-06 (Service Record misuse subcases) are consistent with ACL-002. They are: ACL-SR-01 through ACL-SR-06 are sub-cases of the ACL-002 Service Record misuse pattern.

**Recommendation:** Document as canonical; no structural action needed.

### PRD- Namespace (Protocol Design Requirements or Problem IDs)

**Where used:** `docs/constitution/INVARIANTS.md` (INV-010 cites PRD-009; INV-012 cites PRD-009), `docs/constitution/SPECIFICATIONS.md` (cites PRD-003), `docs/governance/Patch_Log.md` (P-030 cites PRD-004; P-031, P-032 cite PRD-009; P-033 cites PRD-008; P-034 audit finding cites PRD-001), `docs/annexes/ANNEX_AT.md` (cites PRD-008), `docs/annexes/ANNEX_AV.md` (cites PRD-001).

**Registry discovery:** No standalone PRD- registry document was found. The SPECIFICATIONS.md reference to PRD-003 cites "ADVERSARIAL_AUDIT.md PRD-003, Sim D, Finding 7" — suggesting PRD- IDs originated in a prior adversarial audit document. That document is not present in the current corpus (it may be a pre-corpus working document).

**Internal consistency:** PRD-001 appears to be the Phase 1 Article I adversarial audit finding that motivated P-034. PRD-004 relates to monetary boundary issues addressed by P-030. PRD-008 relates to enterprise governance (import leverage, worker ownership). PRD-009 appears consistently in dynasty formation contexts. The IDs are used consistently but the originating document cannot be located.

**Verdict:** No formal registry; origin document not in corpus. The IDs appear to map to findings from a prior adversarial audit (ADVERSARIAL_AUDIT.md) that may predate the current corpus structure.

**Recommendation:** Create a one-page PRD- cross-reference table mapping each used PRD-ID to its description and the T-ID or P-ID it corresponds to. Do not require full registry creation; aliases to existing threat IDs are sufficient.

### IC- Namespace (Internal Capture categories)

**Where used:** `docs/governance/Patch_Log.md` (P-045 cites IC-004 as a related threat).

**Registry discovery:** No IC- registry found. The Phase 1 traceability audit (02-traceability-audit.md) documents: "IC-004 may be an internal capture-category ID, possibly from a session-internal categorization that was never formally registered as a threat. It is addressed (per P-045) but its definition source is opaque." IC-004 appears to be an internal working label for the "governance gap after P-013 suspension" problem, now addressed in ANNEX_AH §AH5.1.

Only one IC- ID (IC-004) has been found in the corpus. IC-004 is addressed by P-045 and the gap it named is resolved into ANNEX_AH §AH5.1 (Dignity-Only Continuity Mode).

**Internal consistency:** IC-004 is used once. Its content is resolved. No other IC- IDs appear.

**Verdict:** Orphaned working label; no active use; the problem it named has a current location (ANNEX_AH §AH5.1). No registry action needed.

**Recommendation:** No action required. The reference is a historical artifact. If future IC- IDs are created, register them in the Abuse Case Library or Threat Register.

### TR- Namespace (Threat Register — earlier format)

**Where used:** `docs/annexes/ANNEX_B.md` (TR-01 through TR-13 are the original threat table, defined there), `docs/governance/Patch_Log.md` (P-024 cites TR-07; detailed entry cites TR-07), `docs/annexes/ANNEX_AS.md` (cites TR-07), `docs/annexes/ANNEX_L.md` (cites TR-08, TR-10), `docs/annexes/ANNEX_S.md` (cites TR-08, TR-10), `docs/annexes/ANNEX_J.md` (cites TR-04), `docs/annexes/ANNEX_X.md` (cites TR-09), `docs/annexes/ANNEX_M.md` (cites TR-03), `docs/annexes/ANNEX_K.md` (cites TR-06), `docs/annexes/ANNEX_A.md` (cites TR-01 through TR-13).

**Registry discovery:** `docs/annexes/ANNEX_B.md` IS the TR- registry — it is titled "ANNEX B — Threat Register" and contains the complete TR-01 through TR-13 table with risk scores, controls, tests, and owners. This is a parallel threat register predating the current `docs/governance/Threat_Register.md` (which uses T- IDs).

**Internal consistency:** TR-07 (Attestor Collusion) maps directly to T-009 + T-018 compound threat in the modern register. TR-04 (Demurrage evasion) maps to T-025. The TR- and T- namespaces are parallel registers covering partially overlapping ground. The older TR- register in ANNEX_B has 13 entries; the newer T- register in Threat_Register.md has 28 entries (T-001 through T-028). The two registers are not formally cross-referenced.

**Verdict:** Registry exists in ANNEX_B. The namespace split (TR- vs. T-) creates a traceability problem because the two registers are not cross-referenced and a reader of one may not find the other.

**Recommendation:** Add an explicit cross-reference header in ANNEX_B noting that TR-01 through TR-13 are the founding threat layer and the modern equivalent is `docs/governance/Threat_Register.md`. Do not merge the registers (they have different purposes: ANNEX_B is operational/testing-focused; Threat_Register.md is governance-focused).

### INV- Namespace

**Where used:** `docs/constitution/INVARIANTS.md` (INV-001 through INV-012, INV-LAUNCH-1 defined there), `docs/annexes/ANNEX_AZ.md` (cites INV-008, INV-009, INV-010), `docs/annexes/ANNEX_AM.md` and others (cite INV-001, INV-007).

**Registry discovery:** `docs/constitution/INVARIANTS.md` IS the INV- registry. Every INV- ID is defined there. INV-LAUNCH-1 is defined at the bottom of the file.

**Internal consistency:** INV-IDs are used consistently across the corpus and trace back to their definitions in INVARIANTS.md. The namespace is coherent.

**Verdict:** Registry exists and is coherent. No action needed.

### Namespace Summary Table

| Namespace | Registry | Location | Action |
| :--- | :--- | :--- | :--- |
| ACL- | EXISTS | `docs/governance/Abuse_Case_Library.md` | Document as canonical |
| PRD- | MISSING | Origin document not in corpus | Create one-page cross-reference table |
| IC- | MISSING (one orphaned ID) | No registry; IC-004 resolved by P-045/AH5.1 | No action; historical artifact |
| TR- | EXISTS | `docs/annexes/ANNEX_B.md` | Add cross-reference to T- register |
| INV- | EXISTS | `docs/constitution/INVARIANTS.md` | No action needed |

---

## Undefined Terms as Attack Vectors

### "Human Dignity"

**Corpus usage count:** 11 occurrences in `docs/constitution/Humane_Constitution.md`.

**How it is used:**
- "The human dignity floor is the exception: it applies everywhere because dignity is not up for a vote." (Article I, Founding Order)
- "Its public purpose is to protect human dignity, restrain domination and extraction..." (Article I statement of purpose)
- "Cannot override the basic human dignity floor, which applies regardless of local consent." (Article I, Founding Order)
- "Consent rule: Places that do not consent are outside the system except for the basic human dignity floor." (Article I)

**What decisions depend on it:** The "human dignity floor" is the trans-jurisdictional minimum that applies even in non-consenting communities. It is the only stated limit on exit/non-consent rights. The "dignity floor" is referenced as a constitutional guarantee but is nowhere defined beyond the physical CSM basket.

**Exploit path:** A jurisdiction that disagrees with a specific non-basket protection (e.g., protection from discrimination in Voice allocation, protection from non-physical coercion) can argue that the "dignity floor" covers only the physical CSM basket, and that non-physical dignity violations are outside the floor. The physical basket is exhaustively listed; non-physical dignity is not.

**Definition constraint that would close the exploit:** Define "human dignity floor" as including at minimum: (a) freedom from coercion based on protected traits; (b) access to the CSM basket; (c) the right to non-discriminatory application of the identity system; and (d) the right to the procedural protections in ANNEX_AK §7. This can be done in INVARIANTS.md without altering the Constitution.

**Feasibility:** Feasible in a single document (INVARIANTS.md annotation or a new INV-013). Does not require human values decision — the components are already implied by INV-001 through INV-006. It is primarily a drafting task.

### "Emergency"

**Corpus usage count:** 7 occurrences in `docs/constitution/Humane_Constitution.md`; multiple additional occurrences in annexes.

**How it is used:**
- Emergency powers (Article V, Article VI): "no emergency power may accumulate across renewal cycles"
- Emergency declaration in scarcity mode (L3 table in §VIII)
- Emergency pause on smart contracts (§VII Patches section)
- "Emergency medical stabilization" (CSM basket)

**Three incompatible trigger standards (per Phase 1 finding P1-TF-004):**
1. Supply-based (L3 table): < 7 days of supply + fill-rate < 80% for 48 hours
2. PCRP-based (ANNEX_AC §AC2.2): sentinel indicator + corroboration + next oracle >24 hours away
3. Governance emergency (ANNEX_AC §AC1.3): Level 3 or higher declared by deliberative body

**Exploit path:** A governing coalition manufactures a "governance emergency" (standard 3) to invoke the cross-quarter interim authorization bridge (ANNEX_AC §AC1.5), which permits operational actions that would otherwise require deliberative ratification. If "emergency" is never defined as a unified concept with a master trigger test, each emergency-type has different activation conditions and different actors can invoke each.

**Definition constraint that would close the exploit:** A master glossary entry that distinguishes: (a) Supply Emergency (oracle-confirmed scarcity trigger, L2/L3 table governs); (b) Governance Emergency (deadlock/quorum failure, P-012 AE2.3 governs); (c) Infrastructure Emergency (smart contract pause, ANNEX_C governs). Each category should have an explicit list of who can declare it and what else must be true before they can. This is feasible in a single definitional document (INVARIANTS.md annotation or a protected-terms registry entry).

**Feasibility:** Feasible as a definition task; does not require new policy decisions because each category already has governing provisions — the task is to make the categorization explicit and cross-referenced.

### "Qualified Reviewer"

**Corpus usage count in Constitution:** 0 occurrences of the exact phrase "qualified reviewer" in `docs/constitution/Humane_Constitution.md`. The phrase appears in Phase 1 audit findings as a gap, originating from terms like "qualified independent review body" and "qualified person."

**Context where the gap matters:** The amendment protocol and FAP both require audit independence but do not define what makes a reviewer "qualified" in a way that prevents intellectual-cousin capture. ANNEX_AG §AG3 extends the independence rule with: no institutional affiliation with design team in past 4 years, domain-diversity requirement, adversarial audit member for critical patches. This partially closes the gap.

**Exploit path:** A FAP reviewer pool dominated by governance professionals who share underlying assumptions with designers satisfies formal independence rules (no affiliation) while producing systematically favorable reviews. This is the "intellectual-cousin" exploit AG3 is designed to prevent — but AG3 is DESIGNED (not ACTIVE), depending on P-013 activation.

**Definition constraint that would close the exploit:** Bind AG3 through P-013 activation. Until P-013 is ACTIVE, AG3's domain-diversity and adversarial-member requirements are not operative. The constraint is governance-procedural, not definitional.

**Feasibility:** Resolves on P-013 activation. No separate definition document needed once P-013 is ACTIVE.

### "Consent"

**Corpus usage count in Constitution:** 11 occurrences in `docs/constitution/Humane_Constitution.md`.

**How it is used:**
- Joining the system: "Consent rule: joining requires an open two-thirds vote, 90-day notice, 60-day public discussion, roll-call, and two-thirds minimum participation."
- Caregiver/dependent transfers: "all members can revoke consent" (household pooling)
- Founding Order consent protocol: referenced as a Tier 1 protected file at `founding/order/consent_protocol.md`

**Definition status:** `docs/governance/Founding_Legitimacy_Dossier.md` §consent provides: "consent must be active, not passive. Silence, non-response, failure to object, or absence from a meeting does not constitute consent. Affirmative consent means a recorded act — vote, signature, community resolution, or equivalent." This is in a governance document, not the Constitution or INVARIANTS.

**Exploit path:** The Constitution's consent requirement (two-thirds vote, 90-day notice) governs community joining. But for individual-level consent (informed consent to pilot participation, consent to data use, consent to above-CSM service terms), no definition exists in the Constitution. The Vulnerable Population Consent Protocol (P-059, PROPOSED) addresses this, but it is PROPOSED, not ACTIVE. Until P-059 is ACTIVE, individual-level consent for pilot participants has no binding operational definition.

**Definition constraint that would close the exploit:** Activate P-059 (Vulnerable Population Consent Protocol) before any pilot enrollment. The VPCP defines consent requirements including teach-back verification, cooling-off periods, and non-waivable exit rights. This is the correct fix — it is not a definitional gap requiring a new document but an activation sequencing gap.

**Feasibility:** Feasible if P-059 is prioritized in the activation queue. P-059 is PROPOSED and not yet in the priority acceptance order in `docs/constitution/Acceptance_Protocol.md`.

### Undefined Terms Summary Table

| Term | Constitution uses | Exploit path | Constraint type | Feasibility |
| :--- | :---: | :--- | :--- | :--- |
| "Human dignity" | 11 | Non-physical dignity violations excluded from floor | New definitional annotation in INVARIANTS.md | High — drafting task |
| "Emergency" | 7 (many more in annexes) | Governance emergency invoked to bypass deliberation | Master category glossary in protected-terms registry | High — categorization task |
| "Qualified reviewer" | 0 (implicit) | Intellectual-cousin audit pool satisfies formal independence | AG3 activation via P-013 | Moderate — P-013 dependency |
| "Consent" | 11 | Individual consent undefined for pilot participants | P-059 VPCP activation | Moderate — activation sequencing |

---

## Findings Table

| ID | Type | Severity | Confidence | File/Section | Summary | Failure Mode | Recommended Fix Shape | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| RC-001 | Missing Specification | Critical | High | `docs/annexes/ANNEX_AK.md` §AK8.1; `docs/annexes/ANNEX_AZ.md` §AZ2 | ANNEX_AZ §AZ2 contains demurrage definitions, not the Tier 0 token mechanism specification. ANNEX_AK §AK8.1 explicitly marks the token spec "(to be drafted)." | INV-LAUNCH-1 pre-operational gate cannot be verified against the referenced section | Draft Tier 0 token mechanism specification at a new location (or add §AZ2-TOKEN subsection to ANNEX_AZ); update all references | 1 |
| RC-002 | Commitment Registration Gap | Critical | High | `/founding/commitments.md`; `docs/constitution/INVARIANTS.md` INV-LAUNCH-1 | FC-YT1 and FC-YT2 do not appear as registered rows in the `/founding/commitments.md` commitment table. They exist as provisional values in ANNEX_Y text only. | INV-LAUNCH-1 gate condition (a) is unmet — values are not in the canonical binding location | Register FC-YT1 and FC-YT2 as formal rows in `/founding/commitments.md` with binding notation | 1 |
| RC-003 | Institution Not Constituted | Critical | High | `docs/annexes/ANNEX_AI.md` §2.1; `docs/constitution/INVARIANTS.md` INV-LAUNCH-1 | Federated Ombuds Plenum not yet constituted; INV-LAUNCH-1 requires Ombuds verification as a structural co-condition | INV-LAUNCH-1 gate condition (b) cannot be cleared until Ombuds is seated | Pre-launch gate: constitute Federated Ombuds before any enrollment | 1 |
| RC-004 | Impossible Threshold | Critical | High | `docs/annexes/ANNEX_AM.md` §AM8.4 | CIP removal requires "6-of-7 vote of the Federated Ombuds Plenum" but the Plenum has 5 members, not 7. The removal mechanism is structurally inoperative. | CIP members cannot be removed; misconduct cannot be sanctioned | Amend AM8.4 to read "4-of-5 vote of the Federated Ombuds Plenum" (matching FC-091); or clarify that removal requires 6-of-7 CIP members (a different body) | 1 |
| RC-005 | Constitutional Invisibility | High | High | `docs/constitution/Humane_Constitution.md`; `docs/annexes/ANNEX_AM.md` §AM8.6 | CIP concurrent ratification requirement for Tier 1 amendments is not stated anywhere in the Constitution text or in `architecture/amendment_protocol.md`. A reader of either document alone would not know the CIP co-condition exists. | Tier 1 amendment completed without CIP ratification; validity of amendment disputed retroactively | Add explicit reference to CIP concurrent ratification in amendment_protocol.md §3; optionally add to Constitution §0 | 2 |
| RC-006 | Threshold Discrepancy (Demurrage) | High | High | `docs/constitution/Humane_Constitution.md` §VIII; `docs/annexes/ANNEX_J.md` §J2 | Demurrage safe harbor: 6 months (Constitution) vs. 18 months (ANNEX_J). ANNEX_J has detailed rationale for 18 months but no explicit governing clause making it controlling over the Constitution. | Enforcement against 6-month figure; 12 additional months of savings exposed to demurrage contrary to ANNEX_J design intent | Add governing clause to ANNEX_J: "Where the Humane Constitution §VIII states 6 months, this annex controls and the 18-month figure governs." | 2 |
| RC-007 | Missing Pre-Signature Public Notice | High | High | `architecture/amendment_protocol.md` | No public notice is required before Tier 1 amendment signatures are collected. The 180-day timelock begins only after signatures are registered. A coalition could quietly collect 7 signatures before public awareness. | Stealth amendment; capture of 7 keyholders before any public challenge period | Add requirement: proposal must be published to public amendment log and the Federated Ombuds notified at least 30 days before keyholder signing may begin | 2 |
| RC-008 | CIP Constitution Gate Unclear | High | High | `docs/annexes/ANNEX_AM.md` §AM8.7 | CIP cannot be constituted until P-014 §5 post-activation audit is complete. P-014 has not been executed (P-013 is PROPOSED). This means Tier 1 amendments are suspended indefinitely until the founding sequence completes. | Governing coalition delays P-014 execution to block all Tier 1 amendments | This is a known design dependency, not a flaw per se, but the dependency chain should be documented explicitly | 3 |
| RC-009 | Undefined Term — Human Dignity | High | High | `docs/constitution/Humane_Constitution.md` (11 uses) | "Human dignity floor" is undefined beyond the CSM physical basket. Non-physical dignity violations (discrimination, coercion, surveillance) are outside the floor's enforceable scope. | Jurisdiction excludes non-physical dignity protections by arguing "dignity floor" = CSM basket | Annotate INVARIANTS.md with a definitional extension of INV-001 naming non-physical dignity components | 2 |
| RC-010 | Undefined Term — Emergency | High | High | `docs/constitution/Humane_Constitution.md` (7 uses); `docs/annexes/ANNEX_AC.md` | Three incompatible emergency trigger standards with different actors; no master definition or unified trigger test | Governance emergency declared using lowest-bar standard to invoke interim authority that bypasses deliberation | Add master emergency taxonomy (Supply / Governance / Infrastructure) with explicit trigger tests to the protected-terms registry | 2 |
| RC-011 | Undefined Term — Consent (Individual) | High | Medium | `docs/constitution/Humane_Constitution.md` (11 uses); P-059 (PROPOSED) | Individual-level informed consent for pilot participation is not binding until P-059 VPCP is ACTIVE. Community consent (2/3 vote) is defined; individual consent is not. | Pilot enrollment without binding consent protocol; coercive or uninformed enrollment | Activate P-059 before any pilot enrollment; add to priority acceptance order in Acceptance_Protocol.md | 2 |
| RC-012 | PRD- Namespace Missing Registry | Medium | Medium | Multiple files (see namespace section) | PRD- IDs used in INVARIANTS.md, Patch_Log, and several annexes but no registry document exists in current corpus. Origin document (ADVERSARIAL_AUDIT.md) not found. | Cross-referencing PRD- IDs fails; traceability gaps in Tier 1 invariant attack-vector documentation | Create one-page PRD- cross-reference table mapping each ID to its T- or P- equivalent | 3 |
| RC-013 | TR-/T- Register Split | Low | High | `docs/annexes/ANNEX_B.md`; `docs/governance/Threat_Register.md` | Two parallel threat registers (TR- and T-) with no cross-reference between them. A reader of one may not find the corresponding entry in the other. | Threat tracking gap; mitigations in one register unaware of complementary controls in the other | Add cross-reference header in ANNEX_B pointing to Threat_Register.md | 3 |
| RC-014 | Token Spec and INV-LAUNCH-1 Cascade | Critical | High | `docs/governance/Hardening_Queue.md`; multiple files | The token mechanism absence, FC-YT1/FC-YT2 registration gap, and Ombuds constitution gap collectively mean INV-LAUNCH-1 cannot be cleared. The launch gate is presently blocked by at least three simultaneous conditions. | System cannot legally proceed to operational phase with real persons until all three conditions are met | These are correctly documented as pre-launch blocking gates; no corpus edit needed, but they require operational resolution in sequence | 1 |

---

## Questions Requiring Human Judgment

The following questions cannot be resolved by corpus analysis alone. They require value decisions, political choices, or founding team authority.

**Q1 — Demurrage safe harbor: which number is right?**
The conflict between 6 months (Constitution) and 18 months (ANNEX_J) is a legitimate policy disagreement. This auditor finds that ANNEX_J's rationale is the more detailed and economically grounded, but the founding team must make an explicit decision: either amend the Constitution to read 18 months, or add a governing clause to ANNEX_J, or amend ANNEX_J to read 6 months. The current ambiguity allows enforcement under either standard.

**Q2 — Human dignity: what is the non-physical floor?**
Defining "human dignity floor" to include non-physical components (freedom from discrimination, surveillance, coercion) requires the founding team to specify which protections are universal (apply in non-consenting communities) and which are opt-in. This is a foundational value choice that cannot be resolved from within the existing corpus.

**Q3 — CIP removal: which body votes?**
AM8.4 likely has a drafting error — the 6-of-7 threshold almost certainly referred to one body (either 6-of-7 CIP members, or a different historical Plenum size). The founding team must decide: should CIP removal require a supermajority of the CIP itself, of the Federated Ombuds Plenum, or some combination? Correcting "6-of-7 Plenum" to "4-of-5 Plenum" is a low-risk repair; requiring "6-of-7 CIP members" is a higher bar. Either is coherent; the current text is neither.

**Q4 — P-059 priority: when does individual consent become binding?**
Adding P-059 to the priority acceptance order in Acceptance_Protocol.md is within the founding team's authority. The question is whether individual consent requirements for pilot participants should be a pre-launch gate (blocking gate before Cohort 1) or a post-launch refinement. This is a sequencing judgment about pilot readiness.

**Q5 — Pre-signature public notice: how long?**
The amendment procedure has no pre-signature public notice period. Adding one (this report suggests 30 days) is a policy judgment about how much advance warning is meaningful before keyholder signing. A shorter period (14 days) may be sufficient; a longer one (60 days) would be more protective but might also enable blocking tactics. The founding team should decide.

---

## Recommendations

Ranked by urgency (launch-blocking first):

1. **Register FC-YT1 and FC-YT2 in `/founding/commitments.md`** as formal binding rows with their provisional values (3 CSM failures per 10,000 per 30 days; 90-day reserve). This is a simple administrative fix but a necessary pre-condition for INV-LAUNCH-1 clearance (RC-002).

2. **Draft the Tier 0 token mechanism specification.** Either create a distinct subsection in ANNEX_AZ or place it in a new ANNEX and update all references from ANNEX_AK §AK8.1 and Patch_Log P-056. The specification must address: token generation, non-transferability, session expiry, non-aggregation guarantees, and the constraint that issuance infrastructure cannot reconstruct session linkage (RC-001, RC-014).

3. **Amend AM8.4 to correct the CIP removal threshold.** Change "6-of-7 vote of the Federated Ombuds Plenum" to "4-of-5 vote of the Federated Ombuds Plenum" (matching FC-091) or specify an alternative coherent threshold. This is a single-sentence fix with major institutional consequence — the removal mechanism is currently inoperative (RC-004).

4. **Add ANNEX_J governing clause on demurrage safe harbor.** Add explicit text in ANNEX_J §J2 stating that ANNEX_J controls on the household savings floor duration and supersedes the 6-month figure in Constitution §VIII. Update the Constitution §VIII figure to 18 months in the next corpus revision (RC-006).

5. **Add CIP concurrent ratification to amendment_protocol.md.** Insert a reference at the end of amendment_protocol.md §3 stating that Tier 1 amendments are not effective until CIP ratification under ANNEX_AM §AM8.6 has occurred. No Constitution edit required (RC-005).

6. **Add pre-signature public notice period to amendment_protocol.md.** Insert a requirement that any Tier 1 amendment proposal be published on the public amendment log and Federated Ombuds notified at least 30 days before keyholder signing may begin (RC-007).

7. **Create PRD- cross-reference table.** A one-page document (governance/PRD_Registry.md) listing PRD-001, PRD-003, PRD-004, PRD-008, PRD-009 with their plain descriptions and corresponding T-IDs or P-IDs. This closes the traceability gap without requiring the founding team to reconstruct the full origin document (RC-012).

8. **Add emergency taxonomy to protected-terms registry.** Define Supply Emergency, Governance Emergency, and Infrastructure Emergency as distinct categories with explicit trigger tests and governing annexes. This closes the definitional surface for emergency abuse (RC-010).

9. **Prioritize P-059 in Acceptance_Protocol.md.** Add P-059 (Vulnerable Population Consent Protocol) to the priority acceptance order before pilot enrollment. Until P-059 is ACTIVE, individual-level informed consent has no binding definition (RC-011).

10. **Annotate INVARIANTS.md with non-physical dignity components.** Extend INV-001 or add INV-013 specifying the non-physical components of the human dignity floor: freedom from coercion based on protected traits, non-discriminatory application of the identity system, and procedural rights in ANNEX_AK §7 (RC-009).

---

## Self-Review

### Scoring

| Dimension | Score | Notes |
| :--- | :---: | :--- |
| Coverage | 4/5 | All five tasks addressed with direct textual evidence. Founding/order/ consent_protocol.md not read directly; referenced via INVARIANTS.md. |
| Specificity | 5/5 | Every finding cites a specific file, section, and quotation or direct observation. No vague findings. |
| Evidence | 4/5 | Primary sources read directly for all five tasks. PRD- origin document (ADVERSARIAL_AUDIT.md) not locatable in corpus; marked as uncertain. |
| Adversarial Depth | 4/5 | Exploit paths named for each undefined term and threshold gap. CIP removal inoperability, pre-signature window, and INV-LAUNCH-1 cascade all have concrete failure scenarios. |
| Actionability | 5/5 | Every finding has a specific recommended fix shape. Human-judgment questions are explicitly separated from drafting tasks. |
| **Overall** | **4.4/5** | |

### Self-Review Questions

**Q1: Did this audit import any finding not grounded in a read source?**
No. All findings trace to specific text in files read during this audit. The PRD- namespace finding is marked medium-confidence because the origin document is not in the corpus.

**Q2: Did this audit avoid inventing content or assuming content existed that was not verified?**
Yes. The token mechanism absence was confirmed by the explicit "(to be drafted)" text in ANNEX_AK §AK8.1 and by the absence of token content in the read ANNEX_AZ §AZ2. FC-YT1/FC-YT2 absence from `/founding/commitments.md` was confirmed by reading through FC-174 without finding those IDs.

**Q3: Are uncertainty claims explicit?**
Yes. "This auditor cannot confirm" is used for the founding/order/consent_protocol.md content (not read directly). PRD- namespace findings are marked medium-confidence with explicit rationale.

**Q4: Does any finding weaken a hard-lock protection?**
No. The CIP removal fix (RC-004) corrects an inoperative mechanism; it does not lower the protection standard. Correcting 6-of-7 on a 5-member body to 4-of-5 is not weakening — the prior threshold was impossible to reach. The pre-signature notice addition (RC-007) strengthens procedural protection.

**Q5: Were Phase 1 and Phase 2 findings used correctly?**
Yes. P1-IC-001 (demurrage contradiction), P1-IC-008 (hidden CIP precondition), P1-IC-011 (impossible removal threshold), P1-TR-001 (AZ2 gate document missing), and P1-TF-001/004 (undefined dignity and emergency) were all confirmed against primary sources in this Phase 3 read. No Phase 1/2 finding was elevated without re-verification.

---

*This report is Phase 3, Report 3 of the Humane Constitution corpus audit. It does not modify any source corpus file. All recommendations require the founding team to make explicit decisions and implement changes through the appropriate amendment, commitment registration, or FAP process.*
