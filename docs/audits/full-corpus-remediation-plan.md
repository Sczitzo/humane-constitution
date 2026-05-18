# Full Corpus Remediation Plan

**Document date:** 2026-05-15
**Branch:** claude/pedantic-spence-c4e730
**Scope:** Humane Constitution governance corpus — all findings from Phase 1 (57 findings), Phase 2 (70 findings), and Phase 3 (Reports 1–3)
**Status:** PLAN ONLY — no source corpus files have been modified
**Author:** Adversarial audit synthesis agent

---

## Remediation Principles

Every fix in this plan operates under the following constraints. Any proposed change that violates a constraint is explicitly labeled REJECTED / NOT RECOMMENDED.

1. **Preserve the hard-lock.** The 7-of-9 key threshold (FC-110), 180-day timelock (FC-111), and drift chain are load-bearing structural elements. No fix in this plan weakens them. Any fix touching the amendment procedure strengthens or clarifies the hard-lock — it does not shorten, narrow, or re-interpret it.

2. **Preserve 7-of-9.** The keyholder threshold for Tier 1 amendments is not negotiable. Fixes that make Tier 1 amendments easier to achieve by reducing the signature count are REJECTED.

3. **Preserve the 180-day timelock.** Fixes may add pre-signature notice requirements (which lengthen the effective amendment cycle) but may not shorten the 180-day window after signatures are registered.

4. **Preserve the drift chain.** The drift chain's transparency requirement is not adjustable. Fixes may clarify who must read the chain or how it is indexed; they may not reduce visibility.

5. **Fix enforcement gaps without centralizing authority.** Detection chains that lack owners, deadlines, or consequences must be repaired by designating existing decentralized bodies as owners — not by creating a new central authority. Fixes that concentrate oversight in a single new body are REJECTED.

6. **Fix the founding window before adding new features.** No new patch, annex, or feature should be activated before the founding-window protection set is minimally operative. Founding-window fixes take precedence over any functional enhancement.

7. **Fix impossible math before procedural complexity.** A mathematical impossibility (6-of-7 on a 5-member body) is not an ambiguity — it is a void. Procedural clarity is meaningless if the underlying arithmetic makes the procedure inoperative. Fix impossible thresholds before adding procedural requirements that depend on them.

8. **Convert detection-only triggers to consequence-linked chains.** Every shall→trigger chain in the corpus must have: a named owner, a defined consequence, a defined timeline, and a mandatory audit artifact. Detection without consequence is not enforcement.

9. **Separate technical cleanup from human values decisions.** Drafting errors, impossible thresholds, and missing registry cross-references are technical tasks. Questions about the right numerical value for a safe harbor, or which non-physical protections belong in the dignity floor, require founding team judgment. This plan labels each item accordingly.

10. **No self-certification for launch gates.** Any gate whose pass condition is certified by the same body that benefits from clearance must be redesigned to require independent certification. This applies to the Founding Legitimacy Dossier, the objection classification authority, and bootstrap circularity determinations.

---

## Priority 0 — Launch / Enrollment Blockers

These items must be resolved before any real-persons enrollment. They are not procedural preferences — they are hard pre-conditions whose absence makes the system constitutionally inoperative or unclearably blocked.

---

### P0-A: §AZ2 Token Mechanism Missing

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-001, SVS-010, RC-001, RC-014, P1-TR-001 |
| **Root cause** | ANNEX_AK §AK8.1 states "The technical specification for the token mechanism is defined in ANNEX_AZ §AZ2 (to be drafted)" — but ANNEX_AZ §AZ2 as written contains demurrage architecture definitions (S, M*, W*, r, E, λ(E), D(E)), not a token mechanism specification. The phrase "(to be drafted)" embedded in §AK8.1 confirms the specification was known missing at authoring time. |
| **Files affected** | `docs/annexes/ANNEX_AK.md` §AK8.1; `docs/annexes/ANNEX_AZ.md` §AZ2; `docs/governance/Hardening_Queue.md` (Hardening Queue also flags this); `docs/governance/Patch_Log.md` P-056 |
| **Exact structural change needed** | (1) Draft a new section — either a new §AZ2-TOKEN subsection at the end of ANNEX_AZ, or a new dedicated annex — containing the Tier 0 pseudonymous single-session token mechanism specification. The specification must address at minimum: token generation method, non-transferability guarantee, session expiry mechanism, non-aggregation guarantee, and the constraint that issuance infrastructure cannot reconstruct session linkage after token expiry. (2) Update ANNEX_AK §AK8.1 to reference the correct section. (3) Remove the "(to be drafted)" language from §AK8.1 once the specification is complete and independently reviewed. (4) Add "Tier 0 token mechanism specification complete and independently verified" to the pre-launch blocking gate list in `docs/constitution/Acceptance_Protocol.md`. |
| **Risk if unfixed** | INV-LAUNCH-1 is permanently unblockable. No pre-operational prerequisite under INV-LAUNCH-1 can be certified as complete. The system may not legally proceed to any operational phase with real persons. |
| **Risk of fixing** | Low. This is an additive specification — no existing protection is changed. The main risk is drafting a specification that conflicts with the demurrage architecture already in §AZ2; this is prevented by using a separate subsection or annex. |
| **Acceptance criteria** | (a) The token mechanism specification exists at a named, accessible corpus location. (b) ANNEX_AK §AK8.1 references that location with no "(to be drafted)" qualifier. (c) The Federated Ombuds has independently verified the specification prior to any real-persons enrollment. (d) The pre-launch gate list shows the new gate as a blocking condition. |
| **Human judgment required** | Partially. The technical token mechanism design requires expert judgment. The decision to place it in ANNEX_AZ vs. a new annex is a scoping judgment for the founding team. |

---

### P0-B: INV-LAUNCH-1 FC-YT1/FC-YT2 Registration Gap

| Field | Value |
|---|---|
| **Audit finding IDs** | RC-002, RC-014 |
| **Root cause** | INV-LAUNCH-1 gates on FC-YT1 (CSM failure pattern-detection trigger) and FC-YT2 (90-day CSM reserve requirement) being "confirmed as bound values in `/founding/commitments.md`." Provisional values exist in ANNEX_Y text (FC-YT1 = 3 verified delivery failures per 10,000 per 30 days; FC-YT2 = 90 days) but neither ID appears as a registered row in the `/founding/commitments.md` commitment table, which ends at FC-174 with no FC-YT1 or FC-YT2 entries. |
| **Files affected** | `/founding/commitments.md`; `docs/constitution/INVARIANTS.md` (INV-LAUNCH-1); `docs/annexes/ANNEX_Y.md` §Y4, §Y7 |
| **Exact structural change needed** | Register FC-YT1 and FC-YT2 as formal binding rows in `/founding/commitments.md` using the existing commitment table format. The binding entries should use the provisional values already established in ANNEX_Y text. Mark them with the standard pre-launch gate notation used for other blocking commitments in the table. |
| **Risk if unfixed** | INV-LAUNCH-1 gate condition (a) is formally unmet even though the values exist in practice. Any rigorous pre-launch audit would find the commitment unregistered and refuse to certify gate clearance. |
| **Risk of fixing** | Very low. The values already exist; this is a registration formality. The risk is accidentally entering incorrect values — mitigated by copying directly from ANNEX_Y §Y4 and §Y7. |
| **Acceptance criteria** | FC-YT1 and FC-YT2 appear as named, bound rows in `/founding/commitments.md`. The values match the provisional values in ANNEX_Y text. The Federated Ombuds can verify them against ANNEX_Y. |
| **Human judgment required** | No — this is an administrative registration of values already established. |

---

### P0-C: Federated Ombuds Pre-Launch Constitution Gate

| Field | Value |
|---|---|
| **Audit finding IDs** | RC-003, RC-014 |
| **Root cause** | INV-LAUNCH-1 requires independent verification by the Federated Ombuds. Multiple pre-launch gates require Ombuds-dependent functions. ANNEX_AI §2.1 specifies that at least four of five sub-Ombuds must be appointed, challenged, and seated before any Ombuds-dependent function is operative. The Federated Ombuds has not been constituted. |
| **Files affected** | `docs/annexes/ANNEX_AI.md` §2.1; `docs/constitution/INVARIANTS.md` INV-LAUNCH-1; `docs/constitution/Acceptance_Protocol.md` (pre-launch blocking gates) |
| **Exact structural change needed** | This is an operational requirement, not a drafting fix. The founding team must execute the Federated Ombuds seating process under ANNEX_AI §2.1 — appointing, publishing, and running the challenge period for at least four of five sub-Ombuds seats — before proceeding to any real-persons enrollment. The "Federated Ombuds seated" gate in the Acceptance Protocol already covers this; no text change is required. What is required is sequencing: P0-C must complete before any other INV-LAUNCH-1 verification task can be performed. |
| **Risk if unfixed** | All Ombuds-dependent pre-launch gates cannot be cleared. The Tier 1 Amendment Integrity Report cannot be produced. INV-LAUNCH-1 condition (b) is permanently unmet. Emergency co-activation requirements (ANNEX_AC §AC2.2) have no qualified co-activating body. |
| **Risk of fixing** | N/A — this is a required operational step, not an optional fix. |
| **Acceptance criteria** | At least four of five sub-Ombuds seats are occupied by appointed, challenged, and publicly seated commissioners under ANNEX_AI §2.1. The founding team has published the seat roster with the challenge period record. |
| **Human judgment required** | Yes — appointment of sub-Ombuds commissioners is a human staffing decision requiring the founding team to identify, vet, and seat qualified individuals from structurally independent bodies. |

---

### P0-D: Minimum Viable Founding-Window Protection Set

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-004, SVS-005, AT-001 |
| **Root cause** | All eight founding-window protections (ANNEX_AG and ANNEX_AF) are PROPOSED, not ACTIVE, during the period they are designed to protect. Specifically: AG4 (urgency bypass prohibition), AG1 (pilot representativeness standard), AG3 (adversarial auditor requirement), AF7 (T-009 × P-008 bypass closure), AF3 (hardship attestation collusion detection), AF1 (grace period graduated renewal) are all inoperative. The pre-launch blocking gate list in `docs/constitution/Acceptance_Protocol.md` does not list ANNEX_AG §AG4 or §AG1 as mandatory gates. |
| **Files affected** | `docs/constitution/Acceptance_Protocol.md` (pre-launch blocking gates section); `docs/annexes/ANNEX_AG.md` (status: PROPOSED) |
| **Exact structural change needed** | Add the following two entries to the pre-launch blocking gate table in `docs/constitution/Acceptance_Protocol.md`: (1) "Anti-gaming Tier 2 reclassification operative (ANNEX_AG §AG4) — urgency bypass prohibition effective; documented confirmation from the Federated Ombuds that §AG4 governs any activation attempt during the founding window." (2) "Pilot representativeness standard operative (ANNEX_AG §AG1) — founding team has published a representativeness assessment for any proposed pilot region against the four-dimension bias check required by §AG1 before any patch enters pilot status." Note: Adding ANNEX_AG §AG4 and §AG1 to the blocking gate list does not require full activation of ANNEX_AG. The founding team should treat these two clauses as binding operational commitments before any pilot enrollment, even if the full ANNEX_AG status remains PROPOSED. |
| **Ranked urgency of sub-protections** | (1) AG4 — urgency bypass prohibition; if urgency bypass is possible during founding, the entire FAP architecture can be circumvented at maximum political pressure. (2) AG1 — pilot representativeness; cherry-picked pilot evidence poisons the entire evidence record for all subsequent activations. (3) AG3 — adversarial auditor requirement; without independent adversarial review, all patches during founding are self-evaluated. (4) AF7 — T-009 × P-008 bypass closure; the most sophisticated compound attack vector identified (P2-AS-009). |
| **Risk if unfixed** | The founding coalition can bypass evidence requirements by invoking urgency (AG4 gap), base all subsequent activations on favorable-region evidence (AG1 gap), conduct FAP review using domain-aligned auditors (AG3 gap), and exploit grace mechanisms to evade elite formation controls (AF7 gap). All four compound into the P2-AS-009 founding capture scenario. |
| **Risk of fixing** | Low. Adding two blocking gates to the Acceptance Protocol is additive; it does not change any existing protection. |
| **Acceptance criteria** | The Acceptance Protocol pre-launch blocking gate table includes AG4 and AG1 as hard gates. Neither gate can be cleared by self-certification — AG4 clearance requires Ombuds confirmation; AG1 clearance requires a published representativeness assessment open to public challenge for 14 days. |
| **Human judgment required** | Partially. Adding the gates is a drafting task. Determining which pilot regions satisfy AG1's representativeness standard requires the founding team's empirical judgment about regional demographics. |

---

## Priority 1 — Structural Breakers

These items are not launch blockers in the immediate sense — they can be fixed after the system begins operating — but they are structural defects that create failure modes that cannot be corrected through normal operational processes. Left unfixed, they create irremediable or nearly irremediable governance capture paths.

---

### P1-A: CIP Removal Impossibility

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-002, RC-004, AT-002, P2-LH-011 |
| **Root cause** | ANNEX_AM §AM8.4 states "A CIP member may be removed only by a 6-of-7 vote of the Federated Ombuds Plenum (Annex AI §3)." ANNEX_AI §1.3 states "Federation Plenum — the five sub-Ombuds together, voting under §3." FC-090 sets OMBUDS_SUBCOUNT_MIN = 5. A 6-of-7 vote on a 5-member body is mathematically impossible. The maximum achievable vote is 5-of-5 unanimous. The CIP removal mechanism is structurally inoperative. |
| **Files affected** | `docs/annexes/ANNEX_AM.md` §AM8.4 (primary fix location); `docs/annexes/ANNEX_AI.md` §1.1, §1.3, §3 (must not be changed — these are the correct body description); any other annex referencing "6-of-7 Federated Ombuds Plenum" in a removal context (must be audited before fix is finalized) |
| **Fix options with labeled consequences** | |

**Option A — RECOMMENDED: Correct the threshold to unanimous Plenum vote**

Change §AM8.4 from "6-of-7 vote of the Federated Ombuds Plenum" to "unanimous vote (5-of-5) of the Federated Ombuds Plenum."

- Consequences: (a) CIP removal becomes possible — any single sub-Ombuds dissent protects the CIP member; unanimity is required to remove. (b) This is a higher bar than the intended 6-of-7 ratio (6/7 = 85.7%; 5/5 = 100%), making it more protective against wrongful removal while closing the impossibility. (c) Does not require a Tier 1 amendment — the change is to a threshold in ANNEX_AM, not to a Tier 1 invariant or founding commitment. (d) Preserves the single-body removal authority without introducing a new body.

**Option B — ACCEPTABLE: Correct the threshold to the Plenum's standard supermajority**

Change §AM8.4 from "6-of-7 vote of the Federated Ombuds Plenum" to "4-of-5 vote of the Federated Ombuds Plenum."

- Consequences: (a) CIP removal becomes possible — matches the FC-091 supermajority used for all other Plenum protocol-level decisions. (b) This is a lower bar than Option A (4/5 = 80% vs. 100%). (c) Consistent with how the Plenum votes on all other matters of equal or greater consequence. (d) Does not require a Tier 1 amendment.

**Option C — EXPENSIVE / NOT RECOMMENDED FOR FOUNDING PERIOD: Expand Plenum to 7 members**

Amend FC-090 from OMBUDS_SUBCOUNT_MIN = 5 to OMBUDS_SUBCOUNT_MIN = 7.

- Consequences: (a) Preserves the 6-of-7 ratio as originally written. (b) REQUIRES a Tier 1 amendment (FC-090 is a Tier 1 floor per ANNEX_AI §9), which requires the full 7-of-9 hard-lock process and a 180-day timelock. (c) The CIP cannot be constituted until after this amendment takes effect — a governance deadlock during the founding window. (d) Operationally infeasible during the founding period.

**REJECTED: Any option that makes CIP removal EASIER than Option A or B**

Any threshold below 4-of-5 (e.g., 3-of-5 simple majority) would reduce capture resistance below the design intent. The design principle is that CIP member removal should require near-unanimous independent oversight — the current text's impossibility is an error, not an intentional choice to block removal. The fix must preserve or exceed the original protection level.

| **Risk if unfixed** | A single captured or compromised CIP member is irremovable for as long as the CIP exists. The CIP's concurrent-ratification requirement for Tier 1 amendments (§AM8.6) then gives the irremovable captured member a permanent veto over all constitutional reform, including any amendment that would fix this defect (see P1-B). |
| **Risk of fixing** | Medium. The fix requires careful redraft of §AM8.4 and a pre-change search across all annexes referencing "Federated Ombuds Plenum" in a removal context. Specifically: confirm no other annex relies on the 6-of-7 figure. The fix itself does not weaken any protection — it repairs a broken one. |
| **Acceptance criteria** | (a) ANNEX_AM §AM8.4 states a removal threshold achievable by the 5-member Federated Ombuds Plenum. (b) The threshold matches or exceeds the protection level of Option A or B above. (c) The validate_corpus.py script passes after the edit. (d) No other annex references the "6-of-7 Federated Ombuds Plenum" figure for CIP removal. (e) ANNEX_AM is not activated until after this fix is applied. |
| **Human judgment required** | YES — the founding team must decide between Option A (unanimous) and Option B (4-of-5). This is a values decision about how easy CIP member removal should be: higher bar protects members from wrongful removal but makes legitimate removal harder. |

---

### P1-B: Recursive Lock Scenario

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-003, P2-AS-003 |
| **Root cause** | If P1-A is not fixed before the CIP is constituted, and a capture event then occurs affecting 3 or more CIP members, the following recursive lock results: (1) The captured CIP members are irremovable (P1-A defect). (2) With 3 of 7 CIP members captured, achieving 5-of-7 affirmative ratification for any Tier 1 amendment is blocked (4 non-captured votes < 5 required). (3) This includes any Tier 1 amendment that would fix the removal impossibility. (4) The defect cannot be corrected through the standard amendment process because the body whose defect prevents correction must participate in its own correction. |
| **Files affected** | `docs/annexes/ANNEX_AM.md` §AM8.4, §AM8.5, §AM8.6; `architecture/amendment_protocol.md` §6 (H-3 refounding authority) |
| **Exact structural change needed** | Fix P1-A first and before any CIP is constituted. If the recursive lock has already occurred (3+ CIP members captured before fix), the standard Tier 1 amendment process cannot resolve it. In that case, the H-3 refounding authority in `architecture/amendment_protocol.md` §6 would need to be invoked — this is a last-resort mechanism explicitly designed for situations where the standard amendment pathway is blocked. The plan cannot specify the H-3 process here because it depends on circumstances at the time. |
| **Risk if unfixed** | Permanent Tier 1 amendment deadlock. No constitutional reform is possible while a captured CIP minority blocks ratification. |
| **Risk of fixing** | The fix for this item IS the fix for P1-A, implemented before any CIP is constituted. High risk if P1-A fix is delayed past CIP constitution. |
| **Acceptance criteria** | P1-A is fixed. ANNEX_AM §AM8.7 (CIP activation gate) has not cleared before the P1-A fix is applied. |
| **Human judgment required** | YES — if the recursive lock is already triggered, invoking H-3 refounding authority is a major governance decision requiring the founding team and all key-holders. |

---

### P1-C: CIP Concurrent-Ratification Invisible in Primary Documents

| Field | Value |
|---|---|
| **Audit finding IDs** | RC-005, P1-IC-008 (Phase 1) |
| **Root cause** | ANNEX_AM §AM8.6 requires concurrent CIP ratification for any Tier 1 amendment to be effective. This requirement does not appear in `docs/constitution/Humane_Constitution.md` or in `architecture/amendment_protocol.md`. A reader of either primary document would not know CIP concurrent ratification is a co-condition for Tier 1 amendment effectiveness. This creates both a transparency gap (uninformed participants may not know the gate exists) and a capture vector (a coalition that knows about §AM8.6 can exploit uninformed actors who do not). |
| **Files affected** | `architecture/amendment_protocol.md` §3 (add CIP ratification cross-reference); optionally `docs/constitution/Humane_Constitution.md` §0 or a constitutional reference section |
| **Exact structural change needed** | Insert the following at the end of `architecture/amendment_protocol.md` §3 (after the 180-day timelock description): "Concurrent CIP ratification required: No Tier 1 amendment is effective until the Constitutional Integrity Panel (ANNEX_AM §AM8.6) has ratified the amendment by affirmative vote of at least 5 of 7 members. CIP ratification must occur within the 180-day window. If CIP ratification is not achieved within the 180-day window, the amendment does not take effect and must re-enter the process." Do not modify the Constitution directly without the established constitutional change process. |
| **Risk if unfixed** | Parties executing Tier 1 amendments may believe the amendment is effective after the 180-day timelock clears, when in fact CIP ratification is still required. This creates a false-clearance risk. |
| **Risk of fixing** | Low. This is an additive cross-reference in the amendment protocol. It does not change any existing protection — it makes an existing protection visible. |
| **Acceptance criteria** | `architecture/amendment_protocol.md` §3 explicitly mentions CIP concurrent ratification as a co-condition. The validate_corpus.py script passes. |
| **Human judgment required** | No — this is a documentation fix for an already-specified requirement. |

---

### P1-D: Pre-Signature Stealth Amendment Window

| Field | Value |
|---|---|
| **Audit finding IDs** | RC-007 |
| **Root cause** | The amendment protocol requires no public notice before keyholder signatures are collected. The 180-day timelock begins only after seven signatures are registered. A captured coalition could privately assemble seven keyholder signatures before any public or Ombuds awareness. |
| **Files affected** | `architecture/amendment_protocol.md` (add pre-signature publication requirement) |
| **Exact structural change needed** | Add a new §0.5 or insert before §1 (Keyholder Signature Collection) in `architecture/amendment_protocol.md`: "Pre-signature publication required: Any Tier 1 amendment proposal must be published on the public amendment log and the Federated Ombuds notified at least 30 days before any keyholder may sign the proposal. The publication must include: the full proposal text, the SHA-256 hash of the proposed text, and the names of any initiating parties. Keyholder signatures collected before this 30-day notice period has elapsed are void." |
| **Risk if unfixed** | A coalition can privately achieve seven signatures, register them simultaneously, and begin the 180-day clock before the Ombuds or public is aware. The Ombuds has 60 days to produce an integrity report — the stealth window may mean 30 of those 60 days pass before review begins. |
| **Risk of fixing** | Low. The fix adds 30 days to the minimum amendment cycle. It does not make amendment impossible — it makes stealth amendment impossible. The founding team should determine whether 30 days or another period (e.g., 14 or 45 days) is appropriate. **Human judgment required on the specific period.** |
| **Acceptance criteria** | The amendment protocol explicitly prohibits keyholder signature collection before a defined public notice period. The notice period is published on the public amendment log with a timestamped record. |
| **Human judgment required** | Partially. The structure of the requirement is clear; the specific notice period (14, 30, or 45 days) is a policy judgment the founding team must make. |

---

### P1-E: AM3 Hollowing Trigger — No Interim Initiating Body

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-008 |
| **Root cause** | ANNEX_AM §AM3 specifies four automatic triggers for constitutional review (founding institution seat unfilled >90 days, post-mortem lapse >30 days, oracle count below FC-030, dashboard delayed >14 days). The trigger fires automatically. However, the review is "initiated by the constitutional body (AM1)" — which is the CIP. ANNEX_AM §AM8.7 states the CIP cannot be constituted until the Founding Order's first post-activation audit is complete. During the founding window — the period when AM3 triggers are most likely to fire — the initiating body may not yet exist. |
| **Files affected** | `docs/annexes/ANNEX_AM.md` §AM3 and/or §AM8.7 |
| **Exact structural change needed** | Add to ANNEX_AM §AM3 (after the trigger specification): "Interim initiation authority: Before the Constitutional Integrity Panel (§AM8) has been constituted, any AM3 constitutional review is initiated by the Federated Ombuds Plenum acting by 4-of-5 affirmative vote. The Ombuds Plenum has the same initiation authority as the CIP for the sole purpose of triggering AM3 reviews during the pre-CIP period. It does not acquire any other CIP powers. Once the CIP is constituted, all AM3 initiation authority transfers to the CIP without transition action." |
| **Risk if unfixed** | Administrative hollowing during the founding window goes undetected and unreviewed. A coalition that delays CIP constitution indefinitely can also defeat the AM3 trigger mechanism indefinitely. |
| **Risk of fixing** | Low. The fix assigns an existing body (Federated Ombuds) a temporary, scoped function. It does not expand Ombuds powers beyond the pre-CIP period. |
| **Acceptance criteria** | ANNEX_AM §AM3 names a specific body with specific authority to initiate reviews before the CIP is constituted. The validate_corpus.py script passes. |
| **Human judgment required** | No — this is a gap-filling assignment of an existing body to a clearly scoped interim function. |

---

### P1-F: Demurrage Safe Harbor Contradiction

| Field | Value |
|---|---|
| **Audit finding IDs** | RC-006, P2-LH-004, AT-008 |
| **Root cause** | `docs/constitution/Humane_Constitution.md` §VIII states a 6-month demurrage-free safe harbor. ANNEX_J §J2 states 18 months with detailed rationale. Both documents are ACTIVE. ANNEX_J has no explicit governing clause making it controlling over the Constitution on this point. A regulator enforcing the Constitution's 6-month figure is textually correct; an account holder citing ANNEX_J's 18-month figure is also textually correct. The contradiction is unresolvable without a governing clause. |
| **Files affected** | `docs/annexes/ANNEX_J.md` §J2 (add governing clause); `docs/constitution/Humane_Constitution.md` §VIII (update to 18 months — requires constitutional change process) |
| **Two-step fix** | Step 1 (immediate, lower procedural bar): Add a governing clause to ANNEX_J §J2 stating "Where the Humane Constitution §VIII states 6 months as the demurrage-free household savings threshold, this annex controls on matters of rate calculation, safe harbor duration, and exemption methodology. The operative safe harbor period is 18 months per the rationale in §J2.1. This clause is effective upon ANNEX_J ACTIVE status and supersedes any conflicting summary figure in the Constitution." Step 2 (in next formal constitutional revision): Update Constitution §VIII to read 18 months, removing the contradiction. |
| **Risk if unfixed** | Demurrage enforcement on balances between 6–18 months of median consumption is indefinitely contested. The enforcement ambiguity creates a de facto 18-month floor without the constitutional protection — account holders use ambiguity as a shield; enforcement bodies have no clear authority to act. |
| **Risk of fixing** | Low for Step 1 (annex governing clause). Medium for Step 2 (constitutional text change requires constitutional process). The governing clause in Step 1 does not require a Tier 1 amendment — it is an operative clause in an already-ACTIVE annex. |
| **Acceptance criteria** | ANNEX_J §J2 contains a clear governing clause. Any enforcement action can cite ANNEX_J as controlling. The Constitution §VIII figure is either updated to 18 months or cross-references ANNEX_J as controlling. |
| **Human judgment required** | YES — the founding team must confirm the policy intent: is the correct safe harbor 18 months (as ANNEX_J argues) or 6 months (as the Constitution states)? This plan recommends 18 months based on ANNEX_J's detailed rationale, but this is a founding-team values decision. |

---

## Priority 2 — Enforcement Chain Repairs

These items have detection mechanisms but broken consequence chains — the trigger fires but either no one owns it, nothing happens, or the consequence cannot reach the violating party.

---

### P2-A: Oracle Breach — Suspension Ownership Gap

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-007, AT-006, AT-010, P2-AI-001 |
| **Broken chain** | ANNEX_AL §AL-CORR and §3.4 define: trigger (effective oracle node count below FC-030 due to correlation) → consequence (Shared Storehouse activation authority is suspended). The trigger and consequence exist. What is missing: |
| **Missing owner** | No actor is designated as the entity that declares the suspension. |
| **Missing deadline** | No timeline from trigger event to suspension declaration. |
| **Missing consequence for accreditor** | No consequence for the RCS accreditation body that accredited correlated nodes in the first place. |
| **Missing appeal** | No mechanism for oracle operators who dispute the correlation finding. |
| **Missing audit artifact** | No requirement to record the suspension event in a named artifact. |
| **Missing: AI supply chain disclosure** | FC-032 pairwise correlation (≤0.30) does not detect shared AI training provenance. Two AI systems trained on the same proprietary dataset may have correlated directional bias while producing uncorrelated outputs. No accreditation intake requirement for AI supply chain disclosure exists. |
| **Files affected** | `docs/annexes/ANNEX_AL.md` §AL-CORR, §3.4, §4, §5.1 |
| **Recommended fix shape** | Add to ANNEX_AL §AL-CORR: "Suspension owner: The RCS accreditation body is the declaring authority for Shared Storehouse suspension under §AL-CORR. Upon detection of effective node count below FC-030, the RCS accreditation body must issue a formal suspension declaration within 14 days. The declaration is published to the Article VII dashboard. The Federated Ombuds must be notified within 24 hours of the declaration. The oracle operator may file a correlation-finding dispute within 14 days of the declaration; disputes are reviewed by the adversarial oracle seat within 30 days. The RCS accreditation body must update the accreditation record as a mandatory audit artifact within 7 days of any suspension." Add to §3.4 accreditation intake: "Accreditation applicants must disclose: AI system vendor identity, training data provenance, and any shared upstream AI dependencies with other currently accredited nodes. A shared upstream AI vendor between two nodes is treated as a concentration trigger equivalent to a correlation-threshold concern and requires independent architecture review before both nodes may vote on oracle consensus." |
| **Acceptance criteria** | ANNEX_AL §AL-CORR names the RCS as the suspension owner with a 14-day declaration deadline. §3.4 requires AI supply chain disclosure at intake. An accreditation record update is listed as a mandatory artifact. |
| **Human judgment required** | Partially — the 14-day deadline and 24-hour Ombuds notification periods are reasonable defaults but the founding team may adjust based on operational context. |

---

### P2-B: IOA Overuse — Undefined Trigger Standard

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-006, AT-007, P2-EP-001, P2-EP-002 |
| **Broken chain** | ANNEX_AC §AC1.5 establishes the Interim Operational Authority for Level 3/4 emergencies. The IOA composition is defined. The joint-activation requirement (Federated Ombuds + rotating CRP member + regional executive body) is defined. What is missing: |
| **Missing: objective trigger standard** | "Level 3 or Level 4 emergency" is the activation condition but neither Level 3 nor Level 4 is defined by an objective standard independent of the declaring regional executive body's judgment. |
| **Missing: domain cycling cap** | The per-domain cap (2 consecutive quarters maximum per AC1.3) can be bypassed by cycling across domains. No cumulative cross-domain cap exists. |
| **Missing: retroactive invalidity mechanism** | §AC1.5 states IOA decisions are "automatically void upon finding" — but who makes the finding, within what timeline, and with what reversal mechanism are not specified. |
| **Missing: audit artifact** | Beyond "published within 1 hour of issuance," no ongoing audit trail requirement exists for IOA actions during their effective period. |
| **Files affected** | `docs/annexes/ANNEX_AC.md` §AC1.3, §AC1.5; `docs/constitution/Acceptance_Protocol.md` (capture dashboard gate — add emergency normalization metrics) |
| **Recommended fix shape** | Add to §AC1.5: "Objective trigger standard required: A Level 3 or Level 4 emergency declaration may not be made on the declaring body's judgment alone. The declaration must be accompanied by: (a) at minimum two independent oracle measurements or data sources corroborating the emergency condition; (b) written identification of which of the named emergency categories applies (Supply Emergency, Governance Emergency, or Infrastructure Emergency — see protected terms registry); (c) Federated Ombuds written confirmation that the corroborating evidence meets the named category's trigger test, delivered within 6 hours of the initial declaration. A declaration lacking (a) or (b) at issuance is provisionally void pending Ombuds confirmation. A declaration for which the Ombuds cannot confirm evidentiary basis within 6 hours is retroactively void; all IOA actions during the void period are suspended pending CRP review." Add to §AC1.3: "Cumulative cross-domain IOA duration: If a region has been under IOA authority — whether within a single domain or across multiple domains — for more than 4 quarters in any rolling 8-quarter window, the CRP must convene a supermajority review of emergency governance necessity within 30 days. The review is not optional and may not be waived." Add to the capture dashboard gate in Acceptance_Protocol.md: emergency normalization metrics (cumulative IOA duration per region, domain-cycling pattern flag, IOA-to-normal-governance decision ratio) as required baseline metrics. |
| **Acceptance criteria** | §AC1.5 names a non-discretionary evidentiary standard for Level 3/4 declarations. The Ombuds confirmation requirement has a defined deadline. The cross-domain cumulative cap exists. Emergency normalization metrics appear in the capture dashboard gate requirements. |
| **Human judgment required** | YES — the founding team must define the three emergency categories (Supply, Governance, Infrastructure) with explicit trigger tests. This plan names the categories but cannot define the trigger tests without policy decisions about what evidence level constitutes each. |

---

### P2-C: Emergency Taxonomy — Master Definition

| Field | Value |
|---|---|
| **Audit finding IDs** | RC-010, P2-EP-002, P1-TF-004 |
| **Root cause** | "Emergency" is used in three incompatible ways in the corpus: (1) Supply-based (L3 table: <7 days supply + fill-rate <80% for 48 hours); (2) PCRP-based (ANNEX_AC §AC2.2: sentinel indicator + corroboration + next oracle >24 hours away); (3) Governance emergency (ANNEX_AC §AC1.3: Level 3 or higher declared by deliberative body). No master definition or unified trigger test exists. |
| **Files affected** | `docs/constitution/INVARIANTS.md` (add definitional annotation or new INV-013 as protected term); or a new `docs/governance/Protected_Terms_Registry.md` |
| **Recommended fix shape** | Create a protected-terms registry entry (or INVARIANTS.md annotation) defining three mutually exclusive emergency categories: "Supply Emergency: triggered by oracle-confirmed measurements meeting the L3 table criteria (< 7 days supply AND fill-rate < 80% for 48+ hours). Governed by ANNEX_L and the Shared Storehouse protocol. Declaring authority: Shared Storehouse activation mechanism. Governance Emergency: triggered by governance deadlock or quorum failure meeting the criteria in ANNEX_AC §AC2.2. Governed by ANNEX_AC and PCRP. Declaring authority: the deliberative body specified in §AC1.5, subject to the Federated Ombuds confirmation requirement in §AC1.5 [after P2-B fix]. Infrastructure Emergency: triggered by confirmed failure of a named infrastructure component meeting criteria in ANNEX_C. Governed by ANNEX_C. Declaring authority: the body specified in ANNEX_C. No emergency declaration may span multiple categories. If conditions satisfy multiple category definitions simultaneously, the Supply Emergency category takes precedence. Governance Emergency may not be used to justify any action that Supply Emergency or Infrastructure Emergency would not justify." |
| **Acceptance criteria** | The corpus has a single authoritative location defining all three emergency categories with explicit trigger tests. No other document may use "emergency" as a free-standing term without specifying which category applies. |
| **Human judgment required** | YES — the exact trigger tests for Governance Emergency require founding team policy decisions. The Supply Emergency trigger tests already exist in the corpus; this task is primarily categorization and cross-referencing. |

---

### P2-D: AM3 Trigger — No Consequence for Inaction

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-008 (secondary aspect) |
| **Root cause** | After P1-E assigns an interim initiating body, the AM3 review process still lacks: a defined timeline from trigger to review completion, a consequence for a triggered review that produces no action, and an appeal mechanism for disputed triggering findings (e.g., disputed seat-unfilled count). |
| **Files affected** | `docs/annexes/ANNEX_AM.md` §AM3 |
| **Recommended fix shape** | Add to §AM3: "Review timeline: An AM3-triggered review must begin within 14 days of the trigger event and produce written findings within 60 days. Findings must be published to the Article VII dashboard. If written findings are not published within 60 days, the trigger event is entered as 'review lapsed' in the dashboard, which itself triggers an Ombuds escalation. Consequence for inaction: If no remedial action is taken within 90 days of written findings being published, the trigger remains active in the dashboard. Active unresolved triggers are reported in every subsequent quarterly CRP governance report. Disputed triggers: A community may dispute a triggering finding by filing a written challenge within 14 days of the trigger event. Disputes are reviewed by the Federated Ombuds within 30 days. The trigger remains active during dispute review." |
| **Acceptance criteria** | ANNEX_AM §AM3 specifies timelines, consequences for review inaction, and a dispute mechanism for trigger findings. |
| **Human judgment required** | No — these are operational timelines for an existing mechanism. The exact day counts (14, 60, 90) are reasonable defaults the founding team may adjust. |

---

### P2-E: CIP Budget Oracle Materiality Threshold

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-009, P2-GC-01 |
| **Root cause** | ANNEX_AM §AM8.3 calculates the CIP budget as 0.01% of "independently measured annual Flow issuance." The materiality threshold for triggering the higher-governs / both-figures-published mechanism is >2% divergence between oracle measurements. A sustained oracle understatement of ≤1.9% would not trigger the published-discrepancy mechanism but would systematically starve CIP funding over years without any single trigger firing. |
| **Files affected** | `docs/annexes/ANNEX_AM.md` §AM8.3 |
| **Recommended fix shape** | Reduce the materiality threshold in §AM8.3 from ">2% divergence" to ">0.5% divergence" for CIP budget purposes specifically. Require quarterly rather than annual comparison of oracle measurements for the CIP budget calculation. Note: this is a tightening of the threshold only — it cannot require oracle measurements to be more accurate than they are, but it ensures the published-discrepancy mechanism fires at smaller understatements. |
| **Acceptance criteria** | §AM8.3 states the CIP budget divergence threshold as 0.5% (or another value below 2% chosen by the founding team) and specifies quarterly comparison. |
| **Human judgment required** | Partially — the specific threshold value (0.5% vs. 1% vs. 1.5%) is a quantitative policy judgment. The fix direction (lower threshold, higher frequency) is clear. |

---

### P2-F: FAP Tier 2 — No Deliberation Floor or Reasoning Requirement

| Field | Value |
|---|---|
| **Audit finding IDs** | AT-009, P2-LH-010 |
| **Root cause** | FAP Tier 2 approval has no minimum deliberation time and no written-reasoning requirement. The two-key adversarial attestation gate (AV1) applies only to `modifies_tier1=True` proposals. Tier 2 amendments can be approved with a one-word note during a high-workload period with no mechanism to retroactively flag rubber-stamp review. ANNEX_AG §AG4 (which reclassifies some protections to Tier 2) is PROPOSED. |
| **Files affected** | `docs/constitution/Acceptance_Protocol.md` (FAP review standard section); optionally `architecture/amendment_protocol.md` |
| **Recommended fix shape** | Add to the FAP review standard in Acceptance_Protocol.md: "Minimum deliberation for Tier 2 amendments: any Tier 2 amendment must remain in open FAP review for a minimum of 7 calendar days before approval. During this period, the reviewing authority must produce a written reasoning document that: (a) names each evidence requirement reviewed; (b) confirms or explains each requirement's satisfaction; (c) states the reviewer's name and institutional affiliation; and (d) is published to the FAP log before the approval is recorded. A Tier 2 approval issued without a compliant reasoning document is provisionally void pending a 14-day public challenge period." |
| **Acceptance criteria** | The Acceptance Protocol specifies a minimum deliberation period and written reasoning requirement for Tier 2 amendments. The reasoning document format is defined well enough to have a pass/fail condition. |
| **Human judgment required** | Partially — the 7-day minimum and specific reasoning checklist are design choices the founding team should confirm. |

---

### P2-G: Founding Panel Self-Certification Gaps

| Field | Value |
|---|---|
| **Audit finding IDs** | AT-004, AT-005, AT-014 |
| **Root cause** | Three self-certification problems exist in the founding activation process: (1) The founding coalition classifies incoming objections to its own legitimacy as "structural" or "procedural" (AH2.2) — the body being challenged decides which challenges extend the window. (2) The Founding Legitimacy Dossier is prepared and certified by the founding coalition itself, with no independent verifier named. (3) Founding panel conflict attestations are "externally verified" but the external verifier is not named and the verification standard is not specified. |
| **Files affected** | `docs/annexes/ANNEX_AH.md` §AH2.2, §AH3; `docs/constitution/Acceptance_Protocol.md` (FLD gate) |
| **Recommended fix shape** | For AH2.2: "Objection classification: The classification of an incoming objection as structural (extending the 60-day window) or procedural (not extending it) must be made by the duty sub-node of the Federated Ombuds, not by the founding coalition. The founding coalition may provide a written response characterizing the objection, but the classification decision is the Ombuds duty sub-node's alone. The classification must be published within 5 days of objection filing." For AH3 conflict attestations: "External verification standard: External verifiers for founding panel conflict attestations must be nominated by the oppose-coalition nominating body designated in AH2.1, not selected by the founding coalition. Verification must include: check of co-publication records using publicly accessible databases, check of institutional affiliation records, and published verification letter with the verifier's name and nominating body." For the FLD gate: "Independent attestation: The conflict register and exit rehearsal findings sections of the Founding Legitimacy Dossier must include independent attestation from a body nominated under the oppose-coalition nominating process, not from an entity retained or selected by the founding coalition." |
| **Acceptance criteria** | AH2.2 names the Ombuds as objection classifier. AH3 specifies the verification standard and the nominating body for external verifiers. The FLD gate requires independent attestation of at least two sections. |
| **Human judgment required** | NO — these are structural independence requirements. Who exactly fills the oppose-coalition nominating role is a founding-team decision, but the principle (independent from the coalition being evaluated) is not. |

---

## Priority 3 — Traceability and Namespace Repairs

---

### P3-A: AH8 Master Linkage Table — Incomplete

| Field | Value |
|---|---|
| **Audit finding ID** | P1-CI-001 |
| **Current usage** | AH8 is titled "Complete Threat/Patch Linkage" but omits P-016, P-021, P-024, P-025, and all of P-029 through P-049 despite these being ACTIVE with named annex references in the Patch Log. |
| **Registry status** | Exists (`docs/annexes/ANNEX_AH.md` §AH8) but incomplete |
| **Recommended action** | Add all missing ACTIVE patches to AH8 in Threat/Patch/Annex linkage format. Retitle the table to "Active Patch Linkage Table" or add a note explicitly stating the table covers all ACTIVE patches and listing any intentional omissions with rationale. Run validate_corpus.py after update. |

---

### P3-B: PRD- Namespace — Missing Registry

| Field | Value |
|---|---|
| **Audit finding ID** | RC-012 |
| **Current usage** | PRD- IDs are cited in `docs/constitution/INVARIANTS.md` (INV-010, INV-012 cite PRD-009), `docs/constitution/SPECIFICATIONS.md` (PRD-003), `docs/governance/Patch_Log.md` (P-030 cites PRD-004; P-031, P-032 cite PRD-009; P-033 cites PRD-008; P-034 cites PRD-001), `docs/annexes/ANNEX_AT.md` (PRD-008), `docs/annexes/ANNEX_AV.md` (PRD-001). |
| **Registry status** | No formal registry. Origin document (ADVERSARIAL_AUDIT.md) not in current corpus. |
| **Recommended action** | Create `docs/governance/PRD_Registry.md` — a one-page cross-reference table with columns: PRD-ID, plain-language description, corresponding T-ID or P-ID, file(s) where cited. Minimum entries: PRD-001, PRD-003, PRD-004, PRD-008, PRD-009. This does not require reconstructing the full origin document — aliases to existing threat and patch IDs are sufficient. |

---

### P3-C: TR- and T- Register — Missing Cross-Reference

| Field | Value |
|---|---|
| **Audit finding ID** | RC-013 |
| **Current usage** | TR-01 through TR-13 are defined in `docs/annexes/ANNEX_B.md` (the original threat register). The modern T- register is in `docs/governance/Threat_Register.md`. Both are referenced across the corpus with no cross-reference linking them. TR-07 maps to T-009 + T-018; TR-04 maps to T-025; TR-08 and TR-10 map to threats in ANNEX_L and ANNEX_S. |
| **Registry status** | Both registries exist but are not cross-referenced. |
| **Recommended action** | Add a header to `docs/annexes/ANNEX_B.md` stating: "This is the founding threat layer (TR-01 through TR-13). The current governance-focused threat register is `docs/governance/Threat_Register.md` (T- namespace). The two registers are not merged — ANNEX_B is operationally and testing-focused; Threat_Register.md is governance-focused. For cross-reference: [add TR→T mapping table for the known equivalences]." |

---

### P3-D: IC- Namespace — Historical Artifact Resolution

| Field | Value |
|---|---|
| **Audit finding ID** | RC-014 (namespace section) |
| **Current usage** | IC-004 appears once in `docs/governance/Patch_Log.md` (P-045). No IC- registry exists. IC-004 is an orphaned internal working label for the "governance gap after P-013 suspension" problem, now addressed in ANNEX_AH §AH5.1. |
| **Registry status** | No registry; IC-004 is resolved. |
| **Recommended action** | No formal registry action needed. Add a note in the P-045 Patch Log entry: "IC-004 was an internal working label; the problem it named is addressed by this patch in ANNEX_AH §AH5.1. No IC- registry is maintained; this label is a historical artifact." If future IC- IDs are created, register them in the Abuse Case Library. |

---

### P3-E: Patch Sequence Gaps — Missing Retirement Notes

| Field | Value |
|---|---|
| **Audit finding ID** | P1-CI-004 |
| **Current usage** | P-007, P-010, and P-028 are absent from the patch sequence (P-001 through P-062) with no documented retirement, merge, or skip explanation. |
| **Recommended action** | Add a retirement/skip note for each missing patch ID in `docs/governance/Patch_Log.md`, following the format used for T-003 in the Threat Register. If the patches were merged into others, name the absorbing patch. If they were never assigned, state that. |

---

### P3-F: P-013 Heading Duplication — Anchor Collision

| Field | Value |
|---|---|
| **Audit finding ID** | P1-CI-002 |
| **Current usage** | The P-013 heading appears twice in `docs/governance/Patch_Log.md`, causing an anchor slug collision (#p-013 resolves to the first occurrence). |
| **Recommended action** | Remove or merge the duplicate P-013 heading. The validator script at `scripts/validate_corpus.py` checks anchors — verify the fix resolves the collision before committing. |

---

### P3-G: ANNEX_AU Missing from Sequence

| Field | Value |
|---|---|
| **Audit finding ID** | P1-CI-003 |
| **Current usage** | ANNEX_AU is absent from the AT→AV sequence with no explanation in INDEX.md. |
| **Recommended action** | Add an audit-history note to `docs/annexes/INDEX.md` stating whether AU was never assigned, merged, or is reserved. One line is sufficient. |

---

## Priority 4 — Terminology / Definition Repairs

---

### P4-A: "Human Dignity" — Undefined Trans-Jurisdictional Floor

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-012, RC-009, P1-TA-001 |
| **Corpus impact** | 11 uses in `docs/constitution/Humane_Constitution.md`. The "human dignity floor" is the only stated limit on exit/non-consent rights. A jurisdiction that disagrees with a specific non-basket protection can argue the floor covers only the physical CSM basket. |
| **Exploit path** | Jurisdiction excludes non-physical dignity protections (freedom from discrimination, coercion, surveillance) by arguing "dignity floor" = CSM basket, which is exhaustively listed. Non-physical violations are outside the floor's enforceable scope. |
| **Definition constraint** | The corpus already implies the following components through INV-001 through INV-006 and ANNEX_AK §AK7: (a) access to the CSM basket; (b) freedom from coercion based on protected traits; (c) non-discriminatory application of the identity system; (d) procedural rights in ANNEX_AK §AK7. A definition that explicitly names these four components closes the exploit without requiring new policy decisions. |
| **Recommended action** | Add an annotation to `docs/constitution/INVARIANTS.md` as INV-013 or as a definitional note under INV-001: "Human Dignity Floor — operative definition: The human dignity floor comprises at minimum: (a) access to the CSM basket as specified in INV-001; (b) freedom from coercion, discrimination, or exclusion based on protected traits in the identity system; (c) non-discriminatory application of the Tier 0 identity credential system; and (d) the procedural rights specified in ANNEX_AK §AK7. This floor applies in all jurisdictions regardless of consent status, unless a specific component has been separately addressed in a jurisdiction's founding order with explicit Ombuds certification that the component's function is met by an equivalent local mechanism." |
| **Human judgment required** | YES — deciding which non-physical protections are universal (trans-jurisdictional) vs. opt-in is a foundational values decision. This plan proposes the four components listed above as derived from existing corpus, but the founding team must confirm they are complete and appropriately scoped. |

---

### P4-B: "Emergency" — Three Incompatible Trigger Standards

Addressed under P2-C above. The recommended fix (master emergency taxonomy as a protected-terms registry entry) is the definitional repair.

---

### P4-C: "Qualified Reviewer" — Resolves on P-013 Activation

| Field | Value |
|---|---|
| **Audit finding IDs** | P2-LH-001, RC-009 (qualifier reviewer context) |
| **Corpus impact** | "Qualified independent review body" for keyholder replacement is undefined — incumbents can block replacement by challenging any petitioner's qualification. ANNEX_AG §AG3 (adversarial audit member requirement for Impact=5 patches) partially closes this but is PROPOSED. |
| **Exploit path** | Incumbents challenge every petitioning body as unqualified; no standard exists to disprove the challenge. Simultaneously, a hostile faction declares itself qualified using the same void. |
| **Definition constraint** | This resolves structurally on P-013 ACTIVE + ANNEX_AG §AG3 operative. Until then, the founding team should add minimum criteria for "qualified" to the pre-launch gate list: composition floor (minimum members), independence standard (no affiliation with keyholder or design team), appointment source (nominated by the oppose-coalition body), and challenge process (published 14-day challenge window before qualification is confirmed). |
| **Recommended action** | Add a protected-terms registry entry for "qualified" that specifies the four-criterion minimum. This entry should become operative before any keyholder replacement or patch review under the FAP. |
| **Human judgment required** | YES — the specific independence standard and composition floor require founding team policy judgment. |

---

### P4-D: "Consent" — Individual Level Undefined Until P-059 Active

| Field | Value |
|---|---|
| **Audit finding IDs** | RC-011 |
| **Corpus impact** | Community-level consent (2/3 vote, 90-day notice) is defined in the Constitution. Individual-level informed consent for pilot participation is not binding until P-059 (Vulnerable Population Consent Protocol) is ACTIVE. P-059 is PROPOSED. |
| **Exploit path** | Pilot enrollment proceeds without a binding consent protocol. Participants are enrolled without teach-back verification, cooling-off periods, or non-waivable exit rights. |
| **Recommended action** | Add P-059 (Vulnerable Population Consent Protocol) to the priority acceptance order in `docs/constitution/Acceptance_Protocol.md` as a condition before any pilot enrollment — not as a post-launch refinement. The founding team must decide whether P-059 is a pre-launch gate (blocking enrollment) or a pilot-phase milestone (required before Cohort 1 but not before founding). This plan recommends pre-launch gate status given the consent protection's centrality to pilot validity. |
| **Human judgment required** | YES — prioritization of P-059 in the activation queue is a sequencing judgment about pilot readiness. |

---

### P4-E: "Tier" Overloading — Three Incompatible Uses

| Field | Value |
|---|---|
| **Audit finding IDs** | SVS-011, P2-LH-005, P1-IC-D-01 |
| **Corpus impact** | "Tier" is used in at least three mutually incompatible ways: Governance Tier (1/2/3 — amendment classes in amendment_protocol.md); Access Tier (0/1 — identity access in ANNEX_AK §AK8); Demurrage Tier (T1/T2/T3/T4 — rate schedule in ANNEX_AZ §AZ3). An actor can use the ambiguity to argue that a Governance Tier 1 amendment is the same as an Access Tier 1 administrative decision (opposite exploits in different directions). |
| **Recommended action** | Add namespace disambiguation in a corpus glossary or protected-terms registry: "Governance Tier (GT-1, GT-2, GT-3): amendment classes per `architecture/amendment_protocol.md`. Access Tier (AT-0, AT-1): identity credential levels per ANNEX_AK §AK8. Demurrage Rate Tier (DT-1, DT-2, DT-3, DT-4): progressive demurrage rate bands per ANNEX_AZ §AZ3. Where 'Tier' appears without a namespace prefix, the applicable namespace is determined by the document context. Documents in `architecture/` use Governance Tier. Documents in `docs/annexes/ANNEX_AK.md` use Access Tier. Documents in `docs/annexes/ANNEX_AZ.md` use Demurrage Rate Tier." This plan does not recommend a full find-and-replace across all corpus documents at this time — the namespace notation is for new documents and a forward-looking convention. |
| **Human judgment required** | No — this is a clarification of existing distinct usages. The founding team may choose different prefix notation. |

---

## Priority 5 — Acceptance Test Improvements

From `docs/audits/10-acceptance-testability-audit.md` — top seven improvements needed.

---

### AT-IMP-1: Add Recurrence Schedules to Critical Pre-Launch Gates (AT-003)

All pre-launch gates in `docs/constitution/Acceptance_Protocol.md` are one-time checks. None has a stated recurrence schedule. Post-launch drift in gated conditions is undetected.

**Recommended addition:** Add recurrence conditions to the five most critical gates in the pre-launch gate table:
- Federated Ombuds seating: annual recertification by the Ombuds Oversight Assembly
- Oracle methodology registry: semi-annual re-accreditation review
- Capture dashboard: quarterly publication required
- Evidence ladder: rechecked per status change event, not annually
- Implementation drift audit: annual

These recurrence requirements should be added to the gate table as "Post-Launch Recurrence" columns, not as separate documents.

---

### AT-IMP-2: Corpus Numerical Consistency Check (AT-008)

No acceptance gate checks whether numerical parameters in the Constitution are consistent with the same parameters in implementing annexes.

**Recommended addition:** Add to FAP intake requirements: "Any proposed ACTIVE-status document that references a numerical parameter (threshold, duration, count, percentage) also present in the Constitution must either: (a) exactly match the Constitution figure, or (b) include an explicit governing clause stating that the annex controls on rate calculation, safe harbor duration, or the specific subject matter, and specifying which document governs conflicts. Intake submissions lacking (a) or (b) for any numerical parameter discrepancy are returned as incomplete before review begins."

---

### AT-IMP-3: AI Supply Chain Disclosure at Oracle Accreditation Intake (AT-006)

As noted in P2-A, FC-032 pairwise correlation does not detect shared AI training provenance. The fix is an intake disclosure requirement, not a correlation threshold change.

---

### AT-IMP-4: Emergency Normalization Metrics in Capture Dashboard Gate (AT-013)

The capture dashboard baseline gate does not require emergency normalization metrics.

**Recommended addition to the gate:** "The capture dashboard baseline must include, at minimum: cumulative IOA-mode governance duration per region per rolling 8-quarter window; domain-cycling pattern flag (activated when the same region cycles across more than 2 domains in 4 quarters); IOA-to-normal-governance decision ratio per region per quarter. These metrics must be live at the time of launch, not deferred to a post-launch baseline update."

---

### AT-IMP-5: Re-Accreditation Trigger for Oracle Supply Chain Drift (AT-010)

No recurrence schedule exists for oracle AI system re-disclosure between annual accreditation cycles.

**Recommended addition to ANNEX_AL §5.1:** "Any accredited oracle node that changes its AI system vendor, training data provenance, or standards-body relationship between annual reviews must notify the RCS accreditation body within 14 days of the change. The node is suspended from oracle consensus voting until re-accreditation is complete. Re-accreditation uses the same intake process as initial accreditation."

---

### AT-IMP-6: Objection Classification Independence (AT-004)

As detailed in P2-G, the founding coalition classifies challenges to its own legitimacy. The Federated Ombuds duty sub-node should be the classifier. This is the most operationally significant acceptance test improvement for the founding window.

---

### AT-IMP-7: Falsifiability Requirement for Evidence Ladder Failure Criteria (AT-011)

The evidence ladder gate accepts failure criteria that are not operationally testable.

**Recommended addition to the gate:** "Failure criteria for any status change to ACTIVE must specify: (a) a measurable threshold (e.g., 'fewer than 3 delivery failures per 10,000 per 30 days,' not 'adequate delivery performance'); (b) a named measurement method; and (c) a named measurement authority responsible for conducting the measurement. Failure criteria expressed only in terms of general goals or outcomes are rejected at intake."

---

## Suggested Implementation Order

The following sequence minimizes compound risk. Doing items out of order creates dependencies that may make later items harder or riskier.

**Step 1 (Before any governance body is constituted):**
Fix P1-A (CIP removal impossibility) in `docs/annexes/ANNEX_AM.md` §AM8.4 before the CIP is constituted. This is the single highest-leverage fix in the corpus. If the CIP is constituted with §AM8.4 as currently written, fixing it later requires unanimous Plenum support for a document change — and if capture has occurred, the recursive lock (P1-B) may be triggered. Files affected: `docs/annexes/ANNEX_AM.md`. Validation: `python3 ../scripts/validate_corpus.py`. Risk of doing out of order: if the CIP is constituted first, the fix window closes.

**Step 2 (Before any real-persons enrollment):**
Execute P0-C (constitute Federated Ombuds) and P0-B (register FC-YT1/FC-YT2). These are operational prerequisites for everything that follows. The Ombuds must be seated before any gate can be independently certified. FC-YT1/FC-YT2 registration is a 15-minute administrative task that clears a formal blocker. Files affected: `/founding/commitments.md`. Validation: confirm FC-YT1/FC-YT2 appear in the commitments table.

**Step 3 (Before any pilot region is selected):**
Fix P0-D (add AG4 and AG1 as pre-launch blocking gates) and complete P0-A (draft the Tier 0 token mechanism specification). These must be in place before any pilot selection occurs — AG1 is the mechanism that prevents cherry-picked pilot regions from poisoning the evidence record; the token specification is required for any pseudonymous enrollment design. Files affected: `docs/constitution/Acceptance_Protocol.md`, `docs/annexes/ANNEX_AK.md`, `docs/annexes/ANNEX_AZ.md`. Validation: `npm run check:corpus` (after `npm run generate:corpus`); `python3 ../scripts/validate_corpus.py`.

**Step 4 (Before founding window opens):**
Fix P2-G (founding panel self-certification gaps) — specifically AH2.2 objection classification independence. The founding window cannot be structurally sound if the body being challenged classifies its own challenges. Files affected: `docs/annexes/ANNEX_AH.md` §AH2.2, §AH3. Validation: `python3 ../scripts/validate_corpus.py`.

**Step 5 (Before first Tier 1 amendment attempt):**
Fix P1-C (CIP concurrent-ratification visibility) and P1-D (pre-signature stealth amendment window). Both are additive changes to `architecture/amendment_protocol.md`. These should be in place before any Tier 1 amendment is attempted so all parties understand the co-conditions. Files affected: `architecture/amendment_protocol.md`. Validation: `python3 ../scripts/validate_corpus.py`.

**Step 6 (Within 30 days of first operational day):**
Fix P1-E (AM3 interim initiating body), P1-F (demurrage safe harbor governing clause), P2-B (IOA trigger standard), and P2-C (emergency taxonomy). These are enforcement chain repairs that are not launch blockers but should be in place before any enforcement action is needed. Files affected: `docs/annexes/ANNEX_AM.md`, `docs/annexes/ANNEX_J.md`, `docs/annexes/ANNEX_AC.md`. Validation: `python3 ../scripts/validate_corpus.py`.

**Step 7 (Within first 90 days):**
Complete P3 (traceability and namespace repairs): AH8 completeness, PRD- registry, TR-/T- cross-reference, patch sequence gaps, P-013 anchor collision, ANNEX_AU note. These are housekeeping tasks with no operational urgency but significant audit usability impact. Files affected: `docs/annexes/ANNEX_AH.md`, `docs/governance/Patch_Log.md`, `docs/governance/PRD_Registry.md` (new file), `docs/annexes/ANNEX_B.md`, `docs/annexes/INDEX.md`. Validation: `python3 ../scripts/validate_corpus.py`.

**Step 8 (Within first 6 months):**
Complete P4 (terminology repairs) and acceptance test improvements (P5). These are longer-horizon definitional tasks that benefit from operational experience. "Human dignity" definition in particular benefits from first-principles review by the founding team with the benefit of having seen what challenges arise in practice. Files affected: `docs/constitution/INVARIANTS.md`, `docs/constitution/Acceptance_Protocol.md`, `docs/annexes/ANNEX_AL.md`.

---

## Questions Requiring Human Judgment

These are values-based decisions that the project owner and founding team must make. This plan does not resolve them — it characterizes each decision and notes what makes it non-technical.

**HJ-1: CIP removal threshold — Option A (unanimous 5-of-5) vs. Option B (4-of-5)?**
This determines how easy it is to remove a CIP member from the panel that ratifies all constitutional amendments. Unanimous (Option A) maximally protects members from wrongful removal but makes legitimate removal harder. 4-of-5 (Option B) matches the Plenum's standard supermajority and is more operationally achievable. Both are constitutionally sound. The founding team's view on the correct balance between member protection and removal accessibility governs this choice.

**HJ-2: Demurrage safe harbor — 6 months or 18 months?**
ANNEX_J's 18-month figure has detailed economic rationale; the Constitution's 6-month figure is the founding baseline. The founding team must make an explicit policy decision about which figure should control, then implement it as either a governing clause in ANNEX_J (interim) or an amendment to Constitution §VIII (permanent). This plan recommends 18 months based on ANNEX_J's rationale, but cannot substitute for founding team judgment on economic policy.

**HJ-3: Pre-signature public notice period — 14, 30, or 45 days?**
This determines the minimum advance warning before keyholder signing may begin on a Tier 1 amendment. Longer periods provide more response time; shorter periods allow more agile amendment. The founding team should consider: how quickly can the Ombuds mobilize a response to a proposed amendment? What is the minimum meaningful civil society reaction window?

**HJ-4: Is P-059 (Vulnerable Population Consent Protocol) a pre-launch gate or a pilot-phase milestone?**
Activating P-059 before any enrollment makes individual consent protection a binding prerequisite. Treating it as a pilot-phase milestone (required before Cohort 1 but not before founding) allows the founding structure to be built first. The founding team must decide: is there any enrollment — even of founding members — that should not be subject to binding individual consent requirements?

**HJ-5: Which non-physical protections belong in the trans-jurisdictional human dignity floor?**
This plan proposes four components (CSM access, freedom from trait-based coercion, non-discriminatory identity system, procedural rights in AK7) drawn from existing corpus language. The founding team must confirm whether this list is complete and whether any proposed component should be opt-in rather than universal. This is a foundational value decision about which protections are so basic that even non-consenting communities must honor them.

**HJ-6: What constitutes a Governance Emergency (trigger standard)?**
The emergency taxonomy in P2-C provides the framework but leaves the Governance Emergency trigger tests to be defined by the founding team. The founding team must specify: what evidence level, what duration, and what type of deadlock or quorum failure triggers a Level 3 vs. Level 4 governance emergency. This is a governance policy decision about how quickly the IOA may be invoked and on what basis.

**HJ-7: What is the correct Tier 0 token mechanism?**
P0-A requires drafting the token mechanism specification. The technical design of the pseudonymous single-session token — cryptographic method, issuance architecture, session expiry, non-aggregation mechanism — requires technical expertise and founding-team policy decisions about privacy guarantees, scalability, and auditability tradeoffs. This plan specifies the requirements the mechanism must satisfy, not the mechanism itself.

---

## Non-Recommended Fixes

The following approaches have been proposed or might be proposed by others. They are explicitly labeled here as REJECTED / NOT RECOMMENDED, with rationale.

**REJECTED: Weakening the 7-of-9 keyholder threshold**
Any reduction in the Tier 1 amendment signature threshold — whether to 6-of-9, 5-of-9, or any lower number — reduces capture resistance in an asymmetric way: it makes amendment easier (potentially acceptable) while also making it easier for a smaller captured coalition to amend. The 7-of-9 threshold is load-bearing. No finding in any audit phase suggests the threshold is too high for legitimate amendments. Rejected on preservation-of-hard-lock grounds.

**REJECTED: Shortening the 180-day timelock without compensating safeguards**
Some actors may argue that the 180-day window makes legitimate emergency amendments too slow. The correct fix to emergency amendment speed is the H-3 emergency refounding process — not shortening the timelock. The timelock is calibrated to one political-cycle length. Shortening it without compensating safeguards (longer pre-signature notice, more distributed veto rights) weakens the speed-attack defense. Rejected.

**REJECTED: Centralizing emergency authority in a single new body**
Several enforcement gaps in Priority 2 could be "fixed" by creating a new central emergency authority with broad powers. This approach trades distributed accountability for operational speed. The recommended fixes instead designate existing distributed bodies (Ombuds, RCS, CRP) as owners of specific chains. Creating a new central body with cross-domain emergency authority is the Babel-risk failure mode: it concentrates power under urgency, exactly the exploit the emergency governance architecture was designed to prevent. Rejected.

**REJECTED: Allowing AI to resolve constitutional ambiguity**
Constitutional ambiguities (the 6 vs. 18 month demurrage safe harbor, the human dignity floor components, the emergency tier definitions) should be resolved by the founding team, not by an AI system. AI can characterize options, synthesize relevant corpus language, and flag consequences — as this plan does. But the founding team's human judgment, not AI output, must be the operative resolution. Proposals to resolve constitutional ambiguities by deferring to an AI-assisted interpretation engine are rejected.

**REJECTED: Self-certification for launch gates**
Any gate whose pass condition is certified by the same body that benefits from clearance is structurally gameable. This includes: the founding coalition certifying its own Founding Legitimacy Dossier, the founding coalition classifying objections to its own legitimacy, and any bootstrap review determining its own circularity. The independence requirement for gate certification is non-negotiable. Convenience arguments for self-certification are rejected.

**REJECTED: Making CIP removal easier than Option B (4-of-5)**
Any threshold below the Plenum's standard supermajority (4-of-5) makes CIP member removal easier than any other Plenum protocol-level decision. CIP member removal should not be trivially achievable — the CIP's independence depends in part on members not being at constant risk of removal by a narrow majority. Thresholds of 3-of-5 or simple majority are rejected.

**REJECTED: Expanding Option C (Plenum to 7 members) without completing the founding window first**
Option C for P1-A requires a Tier 1 amendment, which requires a fully constituted CIP — which cannot be constituted until P-014 is complete. Pursuing Option C during the founding window creates a governance deadlock: the body that must ratify the amendment enabling its own constituting body does not exist. Option C is not rejected in principle but is not recommended for the founding period. If the founding team wishes to pursue Option C in a later amendment cycle, it is a valid long-term architecture choice.

---

## Self-Review

### Scores

| Dimension | Score | Rationale |
|---|:---:|---|
| **Coverage** | 5 | All five phases of audit findings addressed: P0 launch blockers, P1 structural breakers, P2 enforcement chains, P3 traceability, P4 terminology, P5 acceptance test improvements. All 14 audit finding IDs from Phase 3 reports appear at least once. Phase 1 and Phase 2 finding IDs are cross-referenced throughout. |
| **Specificity** | 5 | Every item names exact file paths, section numbers, proposed fix language (where a drafting fix is recommended), and a concrete acceptance criterion. Option A/B/C tradeoffs for P1-A are explicitly labeled with consequences. |
| **Evidence** | 5 | Every finding traces to a numbered audit finding ID from a Phase 1, Phase 2, or Phase 3 report. No remediation item is based on assertion alone. The pre-verified facts in the task brief are integrated but cross-referenced to their source audit IDs. |
| **Adversarial Depth** | 4 | Each P0 and P1 item includes an explicit risk-if-unfixed section characterizing the failure mode, not just the procedural gap. The recursive lock scenario (P1-B), the founding coalition self-certification loops (P2-G), and the domain-cycling exploit (P2-B) are all adversarially framed. Weakness: compound multi-actor attack chains (P2-AS-003, P2-AS-009) are referenced but not independently re-simulated in this plan — Phase 4 simulation should do that before source changes begin. |
| **Actionability** | 5 | Every item has: root cause, files affected, exact change needed (or exact question to be answered for human-judgment items), risk if unfixed, risk of fixing, and acceptance criteria. The implementation order section provides sequencing rationale. Non-recommended fixes are labeled with specific rejection grounds. |
| **Overall** | 4.8 | Comprehensive plan grounded in verified audit findings. The one deliberate limitation is that human-judgment items are characterized but not resolved — that is the correct boundary for an audit plan. |

### Self-Review Questions

**1. Does this plan weaken any load-bearing protection?**
No. Every fix is either additive (new gates, new cross-references, new definitions) or corrective of an impossibility (fixing a threshold that makes a protection inoperative). The 7-of-9 threshold, 180-day timelock, and drift chain are explicitly preserved. The CIP removal fix (P1-A) raises the effective protection level by making removal possible — previously it was impossible, meaning the protection against captured CIP members was zero.

**2. Does this plan require human judgment on any item labeled as a technical fix?**
The plan attempts to cleanly separate technical fixes from human-judgment items. On review: P1-D (pre-signature notice period) is labeled "human judgment partially required" because the specific day count is a policy choice, while the structural requirement (some notice period) is not. P2-B (IOA trigger standard) is labeled "human judgment required" for the trigger test definitions while the structural fix (add an objective standard) is not discretionary. These are appropriately nuanced — the founding team needs to confirm the labels are correct.

**3. Does this plan create any new concentration of authority?**
No. Every owner assignment in Priority 2 designates an existing distributed body (Federated Ombuds, RCS accreditation body, CRP). The Non-Recommended Fixes section explicitly rejects centralizing emergency authority. The founding panel independence fixes (P2-G) move classification authority from the founding coalition to the Ombuds — which is less concentrated, not more.

**4. What would another adversarial agent challenge?**
(a) P1-A Option A (unanimous) vs. Option B (4-of-5): a challenger might argue that unanimous Plenum vote for CIP removal is effectively impossible in practice (one sub-Ombuds with a conflict or outside pressure blocks all removal forever). This is a legitimate concern — the founding team should consider it carefully. (b) The P0-D framing (AG4 and AG1 as "minimum viable" founding-window protection): a challenger might argue AG3 (adversarial auditor) is equally critical, since without adversarial auditors all patches self-certify. This plan ranks AG3 as #3 not because it is unimportant but because AG4 and AG1 are prerequisite to any meaningful evidence record. (c) Step 1 in the implementation order (fix P1-A before any governance body is constituted) may be challenged on the grounds that "the CIP constitution is far in the future." The counter-response is that the window for fixing this closes precisely when it matters — founding-team motivation to fix it may decline once the CIP exists and members have interests in the status quo.

**5. What should be re-audited before source changes are made based on this plan?**
Before implementing P1-A: re-read all annexes that reference "Federated Ombuds Plenum" in any voting context to confirm no other provision relies on a 6-of-7 Plenum vote. Before implementing P0-A: read INV-LAUNCH-1 in full to confirm the blocking mechanism does not have alternative clearance paths not captured in the Phase 3 audit. Before implementing P2-B (IOA trigger standard): read ANNEX_AC in full to confirm the trigger standard gap cannot be closed by interpreting existing text charitably. Before implementing P2-G (founding panel independence): read the founding order documents (`founding/order/`) to confirm they do not already designate an independent objection classifier.

---

*This plan is an adversarial audit product. No source corpus files were modified in its preparation. All recommendations require the founding team to make explicit decisions and implement changes through the appropriate amendment, commitment registration, or FAP process. The plan does not constitute a completed remediation — it is a prioritized, actionable specification for one.*

*Audit plan prepared: 2026-05-15. Based on Phase 1 (57 findings), Phase 2 (70 findings), Phase 3 Reports 1–3.*
