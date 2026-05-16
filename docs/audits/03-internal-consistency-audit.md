# Internal Consistency Audit

**Audit date:** 2026-05-15
**Auditor:** Claude Code corpus auditor (claude-sonnet-4-6)
**Branch:** claude/pedantic-spence-c4e730
**Scope version:** Post-S10 corpus (100 exported docs)

---

## Scope

This audit evaluates internal consistency across the Twelve Pillar Protocol corpus: the Humane Constitution, its annexes, and governance documents. It does not evaluate evidence quality, policy soundness, or implementation feasibility. It looks only at whether the corpus documents agree with each other or contradict each other.

Documents reviewed in depth:
- `docs/constitution/Humane_Constitution.md`
- `docs/annexes/ANNEX_AH.md`, `ANNEX_AI.md`, `ANNEX_AM.md`, `ANNEX_AQ.md`, `ANNEX_J.md`, `ANNEX_K.md`, `ANNEX_X.md`, `ANNEX_Y.md`, `ANNEX_AG.md`
- `docs/governance/Threat_Register.md`, `Patch_Log.md`, `Threat_Resolution_Matrix.md`, `Claims_Evidence_Register.md`, `Hardening_Queue.md`
- `founding/commitments.md`
- `architecture/amendment_protocol.md`

---

## Method

For each tension area, targeted `grep` searches were run across the relevant documents. Evidence was collected verbatim. Findings were classified as:
- **DEFECT** — two documents say materially incompatible things, or a document uses prohibited vocabulary
- **TENSION** — two rules could conflict in application, or an ACTIVE patch requirement is not reflected in the document it should update
- **AMBIGUITY** — a term or threshold is undefined or underspecified in ways a bad-faith actor could exploit
- **UNCERTAIN** — a potential issue was observed but the auditor cannot determine its severity without human judgment

No source corpus files were modified. No speculative or invented findings are included.

---

## Cross-Document Consistency Checks

### 1. Emergency / bypass rules

The Constitution (line 223) states the Shared Storehouse hard expiration rule and requires "multi-key renewal" plus "a new scarcity finding published by the oracle quorum plus a deliberative ratification under Article VI." ANNEX_AQ implements the oracle-failure fallback protocol (P-022, ACTIVE) with Conservative Hold mechanics and a 72-hour governance handoff. The renewal and expiration provisions are described at different levels of detail in the two documents but are not in direct conflict. The Constitution's "multi-key renewal" phrase is not further defined in the Constitution itself; the operational detail is in ANNEX_AQ. No contradiction found; one ambiguity noted (see IC-A-01).

ANNEX_AH states: "P-014 cannot be cited as precedent or authority for any future activation, exception, or urgency bypass" and "P-014 closes permanently upon P-013 ACTIVE status." These constraints are Tier 2 protected per both ANNEX_AH and the Patch Log. The Constitution does not contradict this. Consistent.

### 2. Human authority vs. AI authority

The Constitution (line 124) states: "Legitimacy cannot be automated: the system may automate delivery and routine operations, but it may not let software replace human consent for decisions that change the constitutional order." No annex or governance document was found to contradict this principle. AI use in oracles is bounded by Annex AL's independence requirements. Consistent.

### 3. Rights definitions consistency

Essential Access is defined as "a non-transferable right to receive items in the basic needs basket" in both the Constitution (lines 211, 350) and is consistent across governance documents. The CSM (ANNEX_Y §Y0) distinguishes itself as the floor below which Essential Access cannot be narrowed, rather than a duplicate definition. ANNEX_K §K1 further governs contestation of the basket without redefining the right itself. Consistent across all reviewed documents.

One finding: The Constitution (line 349) lists "basic transit" as part of Essential Access purpose. ANNEX_Y (line 148) explicitly states that "basic local transit" is an essential-basket item but NOT a CSM item. These are consistent — transit is in the basket, not in the survival minimum — but the distinction is not stated at the point of definition in the Constitution, creating a potential misreading.

### 4. Essential Access definition consistency

Essential Access is defined consistently as "not money" and "non-transferable" across the Constitution (lines 211, 350), ANNEX_K (header and §K1), and the Threat Register (T-001 entry). The basket governance process in ANNEX_K does not conflict with the constitutional definition. Consistent.

### 5. Flow rules / demurrage consistency

DEFECT identified. See IC-D-01.

The Constitution (line 373, and line 567 in Option B baseline) states the household demurrage safe harbor as "6 months of median regional consumption expenditure." ANNEX_J §J2 (line 28) defines the household savings floor as "18 months of the published regional median consumption expenditure" and provides a worked example based on 27,000 Flow (18 months × 1,500 Flow). The difference is material: 6 months vs. 18 months is a 3× divergence in the protected savings threshold. One document's amount is not a rounding or summarization of the other.

The demurrage rate (0.5%/month) and corridor (0.25%–1.00%) are consistent across Constitution (line 373), ANNEX_J §J2 (line 26–27), and founding/commitments.md. Only the household floor threshold diverges.

### 6. Oversight body composition consistency

The Federated Ombuds composition is consistent: five sub-Ombuds (FC-090), 4-of-5 supermajority (FC-091), 730-day staggered terms (FC-092) all match across founding/commitments.md, ANNEX_AI §1.1–1.3, and the Patch Log (P-025 entry). The Oversight Assembly (7 members, 5-of-7 threshold) is stated in the Patch Log P-025 entry and in ANNEX_AI §5 consistent with each other.

Deputy Commissioners have 5-year terms (ANNEX_AI §1.3 table, line 96), which are not bound in founding/commitments.md. This is a minor omission — not a contradiction, but a gap in the parameter registry coverage.

### 7. Amendment / patch process consistency

The Constitution (line 131, 326) describes Tier 1 amendment as requiring "7-of-9 holder signatures (FC-110) and 180-day timelock (FC-111)." The architecture/amendment_protocol.md specifies the same parameters in detail (FC-110 = 7 of 9; FC-111 = 180 days). These are consistent.

ANNEX_AG's FAP amendments (P-013, ACTIVE) are compatible with the existing amendment structure. ANNEX_AG §AG4 reclassifies FAP anti-gaming rules to Tier 2 (H-2 process); this does not contradict the Constitution's Tier 1/Tier 2 framework.

P-034 (ACTIVE) adds the two-key adversarial attestation pre-condition for Tier-1-touching patches before FAP intake. Patch Log states this at lines 155–161. The Constitution (line 131) does not mention this two-key pre-condition. This is a TENSION not a contradiction — P-034 adds a pre-FAP gate that the Constitution's text does not describe. See IC-T-03.

### 8. P-018 vs. P-051 conflict on T-022

Both patches address T-022 (Electoral Cycle Capture). P-018 is PROPOSED; P-051 is ACTIVE. ANNEX_AH8 correctly records both patches for T-022. However:

- Threat Register (line 578, Complete Summary): lists only P-018 for T-022; P-051 is absent. This is a staleness defect (IC-D-03).
- Threat Register T-022 entry (line 458): references only "P-018 … Status: PROPOSED" and states "Status: Designed (P-018 / Annex AM PROPOSED)." P-051's ACTIVE status is not reflected. (IC-D-03)
- ANNEX_AM header (line 12–14): says "Status: PROPOSED | Patch: P-018." The annex as a whole is PROPOSED, but §AM8 implements P-051 which is ACTIVE. The annex does not break its status field to reflect the mixed provenance. (IC-D-04)
- The Constitution does not mention the CIP or its concurrent ratification requirement, even though P-051 is ACTIVE and AM8.6 states "no Tier 1 amendment is effective without [CIP concurrent ratification]." The Constitution's amendment description (7-of-9 + 180-day) is now incomplete relative to the ACTIVE corpus. (IC-T-04)
- Threat_Resolution_Matrix.md §T-022 (line 243) lists only P-018 and Annex AM as "Current control" without naming P-051. The Resolution Update note (line 249) does mention P-051 informally, but the primary control field is stale.

### 9. Founding constraints consistency

ANNEX_AH enforces that P-014 is a one-time instrument that closes permanently, with a non-precedent statement at Tier 2 protection. The Patch Log (P-014 entry, lines 385–390) states the same. The founding/commitments.md does not register P-014-specific FCs (it is a founding instrument, not a parameter). These are consistent. No contradiction found.

### 10. Status vocabulary consistency

DEFECT identified. See IC-D-05 and IC-D-06.

`docs/governance/Threat_Register.md` (line 61) uses "**Partial**" as a section heading in the dashboard summary table. The corpus contracts rule explicitly forbids "Partial" as a status term.

`docs/governance/Threat_Resolution_Matrix.md` (lines 230 and 239) uses "**ADDRESSED\***" as a status note for T-020 and T-021. "Addressed" is a forbidden status term.

No forbidden terms (Closed, Complete, Open-as-status) were found in Claims_Evidence_Register.md or Hardening_Queue.md. The Hardening_Queue.md explicitly instructs against using "Closed" or "Resolved" for live risks.

### 11. Risk score formula consistency

The stated formula is Risk Score = I × L × (6 − D) where I = Impact, L = Likelihood, D = Detectability (each 1–5). Spot-checks of three entries:

- T-001: I=5, L=4, D=3 → 5×4×(6-3) = 60. Score in document: 60. Correct.
- T-002: I=5, L=4, D=3 → 5×4×(6-3) = 60. Score in document: 60. Correct.
- T-011: D=2 stated in the entry text; Risk Score = 80. For score 80 with I=5: 5×4×(6-2) = 80. Matches. Correct.

Formula is applied consistently across the three spot-checked entries.

### 12. Constitutional Survival Minimum vs. Essential Access

CSM (ANNEX_Y §Y0) and Essential Access are defined as distinct concepts: Essential Access is the right to the full basket; CSM is the irreducible floor below which Essential Access cannot be narrowed. The Constitution (line 212) explicitly states "Essential Access may never be narrowed below the Constitutional Survival Minimum defined in Annex Y." This relationship is stated consistently across the Constitution, ANNEX_Y, and ANNEX_K. No contradiction found.

One AMBIGUITY: P-018 (PROPOSED) sets a "70% of founding basket" self-executing floor (ANNEX_AM §AM2). This floor is explicitly connected to "reserves (Annex Y, FC-070)" — and FC-070 is defined in founding/commitments.md as "45 days of supply × population at CSM level." However, "70% of founding basket" is not defined to guarantee 100% of CSM items if the basket is broader than CSM. If the founding basket includes transit and clothing that CSM excludes, then 70% of the full basket could theoretically fall below 100% of CSM-required items. This relationship is unresolved in ANNEX_AM. See IC-A-02.

---

## Confirmed Contradictions

### IC-D-01 — Household demurrage safe harbor: 6 months (Constitution) vs. 18 months (ANNEX_J)

**Type:** DEFECT | **Severity:** High | **Confidence:** High

- `docs/constitution/Humane_Constitution.md` line 373: "households receive a safe harbor equal to **6 months** of median regional consumption expenditure"
- `docs/constitution/Humane_Constitution.md` line 567 (Option B baseline): "households receive a safe harbor equal to **6 months** of median regional consumption expenditure"
- `docs/annexes/ANNEX_J.md` §J2 line 28: "every enrolled person receives an identical demurrage-free savings threshold equal to **18 months** of the published regional median consumption expenditure"
- `docs/annexes/ANNEX_J.md` §J2-A line 37: worked example explicitly uses "18 months × 1,500 Flow" = 27,000 Flow floor

The two values are incompatible. ANNEX_J is the controlling specification for demurrage architecture (its header states "Where Annex X conflicts with looser issuance language elsewhere, Annex X governs"; analogously ANNEX_J is the authoritative demurrage spec). But the Constitution is the primary constitutional document. A reader of either document alone gets a different number. A bad-faith actor calibrating a system from the Constitution alone would implement a threshold 3× lower than the governing specification.

---

### IC-D-02 — T-022 Threat Register Complete Summary omits ACTIVE P-051

**Type:** DEFECT | **Severity:** Medium | **Confidence:** High

- `docs/governance/Threat_Register.md` line 578 (Complete Register Summary): lists T-022 with patch "P-018" only
- `docs/governance/Threat_Register.md` line 458 (T-022 entry): references "P-018 … Status: PROPOSED" — P-051 not mentioned
- `docs/governance/Patch_Log.md` line 72: "P-051 | T-022 | **ACTIVE** | Critical | Constitutional Integrity Panel (CIP)"
- `docs/annexes/ANNEX_AH.md` §AH8 lines 153–154: both P-018 PROPOSED and P-051 ACTIVE are correctly listed

The Threat Register's own entry for T-022 and its Complete Summary are stale relative to the Patch Log and AH8. The Threat Register describes T-022 as "Designed (P-018 / Annex AM PROPOSED)" when in fact P-051 is ACTIVE and represents a materially different and stronger control (a constituted 7-member body vs. a design specification). Any reader consulting only the Threat Register will not know P-051 exists.

---

### IC-D-03 — ANNEX_AM status is PROPOSED but contains ACTIVE P-051 provisions (§AM8)

**Type:** DEFECT | **Severity:** Medium | **Confidence:** High

- `docs/annexes/ANNEX_AM.md` header (lines 12–14): "Provenance: Implements P-018 … Status: **PROPOSED**"
- `docs/annexes/ANNEX_AM.md` §AM8 (line 68): implements P-051 (ACTIVE per Patch Log line 72)
- `docs/governance/Patch_Log.md` P-051 entry: "ACTIVE | Critical | … ANNEX_AM §AM8"

An annex cannot simultaneously be PROPOSED (its header status, derived from P-018) and house ACTIVE provisions (§AM8, derived from P-051). A reader of the annex's "at a glance" block sees "Evidence status: Designed" and "Status: PROPOSED." The §AM8 provisions (CIP composition, funding, removal, quorum, activation gate) are binding as ACTIVE but the annex header does not reflect this. This creates a false impression that the CIP has not yet been constituted as a binding design.

---

## Tension Points Requiring Human Judgment

### IC-T-01 — ANNEX_AM §AM2 "70% of founding basket" floor may not guarantee 100% of CSM items

**Type:** TENSION | **Severity:** High | **Confidence:** Medium (UNCERTAIN for quantitative resolution)

- `docs/annexes/ANNEX_AM.md` §AM2: "minimum Essential Access floor — defined at founding as 70% of the founding basket — is constitutionally self-executing"
- `docs/annexes/ANNEX_Y.md` §Y0: "The CSM does not [vary]. It is the floor below which Essential Access cannot be narrowed by any ordinary process"
- `docs/annexes/ANNEX_Y.md` §Y0: "Every numerical value in this annex is a Tier 1 Founding Commitment. Changing any number below requires the full H-3 refounding authority process."

If the founding basket is broader than the CSM basket (e.g., includes transit, clothing), then 70% of the founding basket's quantity/value in each category could fall below 100% of CSM-specific requirements (e.g., 70% of 2,100 kcal = 1,470 kcal, well below CSM's nutrition floor). ANNEX_AM does not state that the 70% floor is calculated per-CSM-category at 100%, nor does it explicitly guarantee that CSM minimums are preserved within the 70% floor. The AM2 reference to "reserves (Annex Y, FC-070)" suggests intent to preserve CSM access, but the operative text does not say so explicitly.

A bad-faith administrator could argue that the self-executing 70% floor satisfies constitutional requirements while delivering less than the CSM minimum in any given essential category, provided the aggregate basket is at 70%. Resolving this requires explicit language in ANNEX_AM or ANNEX_Y specifying that the 70% floor applies per CSM category at 100%, with the 70% applying only to above-CSM basket items.

---

### IC-T-02 — P-051 (ACTIVE) adds CIP concurrent ratification for Tier 1 amendments; Constitution and amendment_protocol.md do not reflect this

**Type:** TENSION | **Severity:** High | **Confidence:** High

- `docs/constitution/Humane_Constitution.md` line 131: Tier 1 amendment requires "7-of-9 holder signatures (FC-110) and 180-day timelock (FC-111)"
- `architecture/amendment_protocol.md` §1: specifies only FC-110 and FC-111 requirements; no mention of CIP
- `docs/annexes/ANNEX_AM.md` §AM8.6: "CIP ratification is required **concurrently** with any Tier 1 amendment; no Tier 1 amendment is effective without it"
- `docs/governance/Patch_Log.md` line 72: P-051 is ACTIVE

P-051 is ACTIVE and imposes a mandatory additional requirement for Tier 1 amendments (5-of-7 CIP vote). The Constitution's amendment description and the architecture/amendment_protocol.md do not mention this requirement. Any person or system reading those documents to understand how to execute a Tier 1 amendment would not know CIP concurrent ratification is required. If a Tier 1 amendment were attempted following only the 7-of-9 + 180-day procedure, it would be constitutionally invalid under AM8.6.

This is not a contradiction between two existing provisions, but a gap: an ACTIVE constitutional requirement that is not reflected in the primary constitutional document describing the amendment process.

---

### IC-T-03 — P-034 two-key pre-condition for Tier-1-touching patches not mentioned in Constitution

**Type:** TENSION | **Severity:** Medium | **Confidence:** High

- `docs/constitution/Humane_Constitution.md` line 131: describes amendment process without mentioning pre-FAP attestation gate
- `docs/governance/Patch_Log.md` P-034 entry: "Any patch tagged `modifies_tier1=True` must carry cryptographic attestation from the standing adversarial panel member before FAP intake opens." P-034 is ACTIVE.
- `docs/annexes/ANNEX_AV.md` (referenced in P-034): implements the two-key requirement

The Constitution does not describe the P-034 adversarial attestation pre-condition that gates Tier-1-touching patches before FAP review begins. A reader of the Constitution alone would not know this requirement exists. The gap between the Constitution's amendment description and the operational requirements in P-034 and P-051 is widening as active patches accumulate.

---

### IC-T-04 — T-022 Threat Register entry's "Designed" status is stale given P-051 ACTIVE

**Type:** TENSION | **Severity:** Medium | **Confidence:** High

- `docs/governance/Threat_Register.md` lines 461, 578: T-022 status listed as "**Designed**" with reasoning "P-018 remains PROPOSED"
- `docs/governance/Threat_Register.md` line 586: "T-022 is `Designed` because P-018 remains PROPOSED; all other active threats have ACTIVE patches and are `Active — unproven`"
- `docs/governance/Patch_Log.md` line 72: P-051 is ACTIVE for T-022

The Threat Register's own commentary explains that T-022 is "Designed" specifically because no ACTIVE patch exists. But P-051 is ACTIVE for T-022. By the Threat Register's own logic, T-022 should now be "Active — unproven," not "Designed." This is an internal inconsistency within the governance layer: a stated rule for status assignment is applied incorrectly relative to the current patch state.

---

## Ambiguities That Could Become Contradictions

### IC-A-01 — "Multi-key renewal" for Shared Storehouse not operationally defined in Constitution

**Type:** AMBIGUITY | **Severity:** Medium | **Confidence:** High

- `docs/constitution/Humane_Constitution.md` line 223: "Continuation beyond that timestamp requires an affirmative **multi-key renewal** — a new scarcity finding published by the oracle quorum plus a deliberative ratification under Article VI"
- No definition of "multi-key" in constitutional or architectural documents

"Multi-key renewal" is not defined. How many keys, held by which parties, and under which procedure is entirely unspecified in the Constitution. ANNEX_AQ defines oracle-failure behavior but does not define the normal renewal threshold. A bad-faith actor seeking to extend emergency powers indefinitely could argue that any quorum of two oracle nodes constitutes "multi-key" renewal, or that legislative ratification alone satisfies the requirement without oracle confirmation. The Constitution's own description contains both an oracle finding and Article VI ratification, which is more specific than "multi-key" implies, but the phrase itself is undefined.

---

### IC-A-02 — "Founding basket" undefined in ANNEX_AM §AM2

**Type:** AMBIGUITY | **Severity:** High | **Confidence:** High

- `docs/annexes/ANNEX_AM.md` §AM2: "minimum Essential Access floor — defined at founding as 70% of the founding basket"
- No definition of "founding basket" in ANNEX_AM, ANNEX_Y, or the Constitution
- `docs/constitution/Humane_Constitution.md` line 560: lists the initial basket but does not name it "founding basket"

"Founding basket" is not a defined term anywhere in the corpus. It presumably refers to the essential basket at the time of founding, but this is not stated. The basket is designed to evolve through ANNEX_K's contestation process. If the basket changes after founding, does the "70% of founding basket" floor reference the original founding-moment basket permanently, or the current basket? A static founding basket floor could become meaningless over time if the basket expands substantially. A dynamic interpretation creates a moving floor that grows with the basket. Neither interpretation is ruled out by current text.

---

### IC-A-03 — Reduced Plenum rule (3-of-3 unanimous) when two sub-Ombuds are recused has no explicit authority floor

**Type:** AMBIGUITY | **Severity:** Medium | **Confidence:** Medium

- `docs/annexes/ANNEX_AI.md` §2 line 119: "If two or more sub-Ombuds are recused on the same matter, the Plenum convenes with the remaining three sub-Ombuds and may either (a) proceed under a 'reduced Plenum' rule requiring **3 of 3 unanimous** for that matter only, or (b) appoint a substitute determining officer"
- FC-091 (founding/commitments.md line 47) defines the threshold as "4/5 affirmative sub-Ombuds" for protocol-level decisions
- FC-090 (line 46) sets `OMBUDS_SUBCOUNT_MIN` = 5

The reduced Plenum rule (3-of-3 unanimous) is more demanding than the standard 4-of-5 threshold in terms of probability of passage, but it reduces BFT tolerance to f=0 for that decision. A single remaining sub-Ombuds can block any protocol-level decision. The choice between options (a) and (b) is made "unanimously" by the three non-recused sub-Ombuds, which itself requires unanimity — creating a potential deadlock if one of the three refuses to participate in the choice. This edge case is not addressed.

---

### IC-A-04 — CIP removal requires 6-of-7 Federated Ombuds Plenum vote; Ombuds Plenum has only 5 members

**Type:** AMBIGUITY | **Severity:** High | **Confidence:** High

- `docs/annexes/ANNEX_AM.md` §AM8.4: "A CIP member may be removed only by a **6-of-7 vote of the Federated Ombuds Plenum** (Annex AI §3)"
- `docs/annexes/ANNEX_AI.md` §1.1: "The Federated Ombuds is constituted as **five sub-Ombuds offices**" (FC-090 = 5)
- `docs/governance/Patch_Log.md` P-025 entry: "5 sub-Ombuds (FC-090), 4-of-5 Plenum supermajority (FC-091)"

The Federated Ombuds Plenum has five members, not seven. A "6-of-7 vote of the Federated Ombuds Plenum" is mathematically impossible under the current ANNEX_AI architecture. This appears to be either a drafting error (the intended threshold was 4-of-5, matching the standard Plenum supermajority) or a reference to the Oversight Assembly (which has 7 members per P-025, with a 5-of-7 threshold). The Oversight Assembly is distinct from the Plenum; AM8.4 specifically names "the Federated Ombuds Plenum" not the Oversight Assembly.

This is a confirmed mathematical impossibility embedded in an ACTIVE provision (P-051). A CIP member cannot be removed under the current text.

---

## High-Risk Consistency Issues

### Priority 1: Household demurrage safe harbor (IC-D-01)

The 3× discrepancy (6 months in Constitution vs. 18 months in ANNEX_J) is a quantitative defect in a financial parameter that will be implemented in software. If an implementation team reads the Constitution for the household safe harbor and builds to 6 months, every household above 6 months of savings would face demurrage that ANNEX_J says they should not face. This is a direct harm mechanism for ordinary savers and is likely to create trust damage and political attack surface (see T-011 linkage: a system that charges demurrage on 6-month savings when it promised 18-month protection is a T-011 narrative attack in waiting).

### Priority 2: CIP removal impossibility (IC-A-04)

The "6-of-7 Federated Ombuds Plenum" threshold in ANNEX_AM §AM8.4 is mathematically impossible with a 5-member Plenum. This means the CIP's removal process is either non-functional (the provision cannot be executed) or dependent on an interpretation that is not stated in the document (perhaps "Oversight Assembly" was intended). A CIP member who becomes incapacitated, compromised, or hostile cannot be removed through the stated process. The only fallback is that AM8.4 specifies it applies to "incapacity or a conduct violation" — but if the procedure cannot be executed, CIP members are effectively irremovable.

### Priority 3: T-022 status incoherence in Threat Register (IC-D-02 + IC-T-04)

The Threat Register is the authoritative risk tracking document. Its T-022 entry is incorrect in two ways: it does not mention ACTIVE P-051, and it states a "Designed" status that the Register's own documented logic would require to change to "Active — unproven" given P-051's ACTIVE status. This makes the Threat Register's claim about the state of T-022 mitigations factually wrong as of S10.

---

## Findings Table

| ID | Type | Severity | Confidence | File | Section | Summary |
|---|---|---|---|---|---|---|
| IC-D-01 | DEFECT | High | High | `Humane_Constitution.md` vs `ANNEX_J.md` | §J2 vs lines 373/567 | Household demurrage safe harbor: 6 months (Constitution) vs. 18 months (ANNEX_J). 3× quantitative contradiction. |
| IC-D-02 | DEFECT | Medium | High | `Threat_Register.md` | Line 578 (Complete Summary) | T-022 Complete Summary lists only P-018; omits ACTIVE P-051. P-051 is the constituted CIP — a materially different control. |
| IC-D-03 | DEFECT | Medium | High | `ANNEX_AM.md` | Header / §AM8 | Annex header says "Status: PROPOSED" (P-018); §AM8 implements ACTIVE P-051. Mixed status not disclosed in header. |
| IC-D-04 | DEFECT | Medium | High | `Threat_Register.md` | Line 458 (T-022 entry) | T-022 entry states "Status: Designed (P-018 / Annex AM PROPOSED)"; does not acknowledge ACTIVE P-051. |
| IC-D-05 | DEFECT | Low | High | `Threat_Register.md` | Line 61 | "Partial" used as section heading — forbidden status vocabulary per corpus contracts rule. |
| IC-D-06 | DEFECT | Low | High | `Threat_Resolution_Matrix.md` | Lines 230, 239 | "ADDRESSED\*" used as status note for T-020 and T-021 — "Addressed" is a forbidden status term. |
| IC-T-01 | TENSION | High | Medium (UNCERTAIN for quantitative resolution) | `ANNEX_AM.md` vs `ANNEX_Y.md` | §AM2 vs §Y0 | 70% founding-basket floor (P-018 PROPOSED) may not guarantee 100% of CSM minimums if basket includes non-CSM items. |
| IC-T-02 | TENSION | High | High | `Humane_Constitution.md`, `amendment_protocol.md` vs `ANNEX_AM.md` | §AM8.6 | P-051 ACTIVE requires CIP concurrent ratification for Tier 1 amendments; Constitution and amendment_protocol.md do not mention this. |
| IC-T-03 | TENSION | Medium | High | `Humane_Constitution.md` vs `Patch_Log.md` (P-034) | Line 131 vs P-034 entry | Constitution describes Tier 1 amendment without mentioning P-034 two-key adversarial attestation pre-condition (ACTIVE). |
| IC-T-04 | TENSION | Medium | High | `Threat_Register.md` | Lines 461, 578, 586 | T-022 status recorded as "Designed" with explicit reasoning that no ACTIVE patch exists; P-051 is ACTIVE, making this self-contradictory. |
| IC-A-01 | AMBIGUITY | Medium | High | `Humane_Constitution.md` | Line 223 | "Multi-key renewal" for Shared Storehouse continuation is undefined — how many keys, held by whom, is unspecified. |
| IC-A-02 | AMBIGUITY | High | High | `ANNEX_AM.md` | §AM2 | "Founding basket" is undefined; it is unclear whether the 70% floor refers to the basket at time of founding (static) or current basket (dynamic). |
| IC-A-03 | AMBIGUITY | Medium | Medium | `ANNEX_AI.md` | §2 (recusal rules) | Reduced Plenum (3-of-3 unanimous) reduces BFT tolerance to f=0; meta-decision (which option to use) itself requires unanimity, creating potential deadlock. |
| IC-A-04 | AMBIGUITY | High | High | `ANNEX_AM.md` | §AM8.4 | CIP removal requires "6-of-7 vote of the Federated Ombuds Plenum" — impossible; Plenum has 5 members. Mathematical error in ACTIVE provision. |

---

## Recommendations for Later Phases

1. **Resolve IC-D-01 first.** The 6-month vs. 18-month household demurrage safe harbor is a direct implementation risk. A single authoritative value must be established (18 months is the more carefully reasoned figure, per ANNEX_J §J2's explicit derivation) and the Constitution's description updated to match. Mark as a corpus defect for the next patch cycle.

2. **Fix IC-A-04 before CIP activation.** The "6-of-7 Federated Ombuds Plenum" threshold in §AM8.4 is mathematically impossible. This must be corrected before the CIP is constituted; otherwise the CIP's removal mechanism is non-functional from the moment of founding. The correction (likely "4-of-5 Federated Ombuds Plenum" or "5-of-7 Oversight Assembly") requires determining which body was intended.

3. **Update Threat Register T-022 entry.** The T-022 entry should: (a) add P-051 as a patch reference, (b) update status from "Designed" to "Active — unproven" per the Register's own status logic, and (c) update the Complete Summary table (line 578) to list both P-018 and P-051.

4. **Fix ANNEX_AM header status.** ANNEX_AM's header should distinguish between its P-018 provisions (PROPOSED) and its §AM8 provisions (ACTIVE via P-051). Options include splitting the annex, adding a mixed-status disclosure in the header, or creating a separate ANNEX_AM2 for P-051 content. The current state is misleading.

5. **Define "founding basket" in ANNEX_AM §AM2.** Specify whether the 70% floor references the basket composition at founding (static) or the current basket (dynamic), and clarify that the 70% floor guarantees 100% of CSM-category minimums.

6. **Update Constitution's amendment description.** The Constitution should note that Tier 1 amendments require CIP concurrent ratification (P-051) in addition to 7-of-9 + 180-day. The architecture/amendment_protocol.md should be similarly updated. Both documents are read as authoritative; leaving the CIP requirement undescribed there creates implementation risk.

7. **Remove forbidden status vocabulary.** Remove "Partial" as a section heading in Threat_Register.md (line 61) and replace "ADDRESSED\*" in Threat_Resolution_Matrix.md (lines 230, 239) with a permitted status term ("Active — unproven" with a note about proof needed is the appropriate substitute).

8. **Define "multi-key renewal."** ANNEX_AQ or the Constitution should specify what "multi-key" means operationally for Shared Storehouse renewal: number of keyholders, which authority class, and interaction with the oracle quorum finding requirement.

9. **Register Deputy Commissioner term (5 years) in founding/commitments.md.** Currently the only founding parameter not registered for the Federated Ombuds. This is not a contradiction but a gap in parameter coverage.

10. **Phase 4 should audit IC-A-03.** The reduced Plenum (3-of-3 unanimous) and the meta-decision deadlock scenario require a legal/governance expert review; it may be an acceptable edge case or may need an explicit tiebreaker.

---

## Self-Review

| Dimension | Score (1–5) | Notes |
|---|---|---|
| **Coverage** | 4 | All 12 assigned tension areas checked; corpus coverage limited to documents accessible via targeted grep. Large annexes read only at relevant sections — deep content in ANNEX_AV, ANNEX_AZ, ANNEX_AK not reviewed. |
| **Specificity** | 5 | All findings include specific file paths, line numbers or section references, and verbatim quoted text from both sides of each finding. |
| **Evidence** | 5 | No invented findings. Every defect is grounded in direct quotes from two or more documents. Uncertainty is explicitly labeled UNCERTAIN. |
| **Adversarial Depth** | 4 | Bad-faith exploitation paths described for IC-D-01 (implementation to wrong number), IC-A-01 (minimal quorum argument for "multi-key"), IC-A-02 (70% aggregate gaming). IC-A-04 (CIP removal impossibility) identified without adversarial prompt — found through cross-document math. One gap: did not audit ANNEX_AV (P-034 two-key implementation) in detail. |
| **Actionability** | 5 | Each finding in the Recommendations section names the specific document and section to change, and suggests the correction direction. IC-A-04 names the two possible correction targets. |
| **Overall** | 4 | Strong structural audit. Main gap: depth of annex coverage is bounded by targeted grep approach; a document review reading every annex in full might surface additional issues. The confirmed mathematical error in AM8.4 is the highest-value finding and was not in the original research checklist — discovered via cross-reference. |

All scores are 4 or above. No Repair Pass required.

---

*Audit produced by Claude Code corpus auditor on 2026-05-15. No source corpus files were modified. All commands were read-only (grep, head, cat). Findings are based solely on observed evidence in the corpus.*
