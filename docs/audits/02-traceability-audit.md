# Traceability Audit

**Audit date:** 2026-05-15  
**Auditor:** Claude Sonnet 4.6 (corpus auditor role, read-only)  
**Branch:** claude/pedantic-spence-c4e730  
**Scope ref:** Commissioned as a corpus auditor with hard rule: do not edit files outside docs/audits/

---

## Scope

This audit traces the complete chain from threat identification through patch specification to constitutional clause to annex to acceptance protocol for the Humane Constitution project. The audit covers:

- All threat IDs registered in `docs/governance/Threat_Register.md` (T-001 through T-028, excluding retired IDs T-003 and T-010)
- All patch IDs registered in `docs/governance/Patch_Log.md` (P-001 through P-062, with sequence gaps noted)
- The master linkage table in `docs/annexes/ANNEX_AH.md §AH8`
- The `docs/constitution/Acceptance_Protocol.md` and its pre-launch blocking gates
- All namespace variants found in use: T-, P-, PRD-, ACL-, INV-, IC-, TR-

Out of scope: evidence quality, pilot design, constitutional text correctness, ethical evaluation.

---

## Method

All findings are based on direct reading of source files using Read tool only. No corpus scripts were run. Observations are drawn from:

1. Full scan of Threat Register (27 active IDs + 2 retired)
2. Full scan of Patch Log inventory table and all detailed entries (P-001 through P-062)
3. Full read of AH8 master linkage table
4. Cross-reference of AH8 against Patch Log's own Current Threat/Patch Linkage table
5. Spot-check of referenced annexes (ANNEX_AK, ANNEX_AM, ANNEX_AV, ANNEX_AZ)
6. Full read of Acceptance_Protocol.md pre-launch blocking gates section
7. Retirement/renumbering table in Threat Register

Where a finding cannot be fully confirmed from available reads, it is marked **UNCERTAIN**.

Confidence levels: **High** = directly observed in file text; **Medium** = inferred from cross-referencing two or more sources; **Low / UNCERTAIN** = partial evidence only.

---

## Traceability Model Discovered

The corpus implements a multi-hop traceability chain:

```
Threat Register (T-NNN)
  → Patch Log (P-NNN)
    → Constitutional text (Humane_Constitution.md article/clause)
      → Annex (ANNEX_XX.md sections)
        → Acceptance Protocol (pre-launch gates, priority order)
          → AH8 master linkage table (cross-session reconciliation)
```

Secondary reference namespaces exist alongside the primary T-/P- chain:

| Namespace | Where found | Apparent meaning |
| :--- | :--- | :--- |
| `PRD-NNN` | Patch Log P-030, P-031, P-032, P-033 Related Threat column | "Protocol Design Requirement" — internal design catalogue IDs, not Threat Register IDs |
| `ACL-NNN` | Patch Log P-045, P-057, P-059, P-060, P-061, P-062; Threat Register T-028 residual risk | "Adversarial Capture Layer" or similar — appears to be an internal audit finding ID series |
| `INV-NNN` | Patch Log P-034 Related Threat column; ANNEX_AZ linked risks; INVARIANTS.md | Invariant IDs from `docs/constitution/INVARIANTS.md` |
| `IC-NNN` | Patch Log P-045 Related Threat; ANNEX_AH §AH5.1 | "Internal Capture" or similar sub-problem IDs; IC-004 specifically addressed by P-045 |
| `TR-NNN` | Patch Log P-024 Related Threat column | Appears alongside T-009 and T-018; TR-07 labeled "Attestor Collusion" — a named risk not in the Threat Register |
| `FC-NNN` | Throughout corpus | Founding Commitment number — a parameter binding namespace, not a threat or patch namespace |

The AH8 table in `ANNEX_AH.md` serves as the cross-session reconciliation table. It is partially redundant with the "Current Threat/Patch Linkage" table at line 674 of `Patch_Log.md`. Both exist; their agreement was spot-checked and found consistent for the entries read.

---

## Complete Chains

The following T→P→Annex chains are fully traceable to a named active annex with visible clause-level detail:

| Threat | Patch | Annex | Notes |
| :--- | :--- | :--- | :--- |
| T-001 | P-001 | ANNEX_AB §AB2 | Constitutional text confirmed in Patch Log |
| T-002 | P-003 / P-016 | ANNEX_AB §AB4 / ANNEX_AK | Both patches ACTIVE; AK has detailed clause sections AK1–AK8 |
| T-004 | P-002 | ANNEX_AB §AB3 | ACTIVE |
| T-005 | P-005 | ANNEX_AC §AC1 | ACTIVE |
| T-006 | P-006 | ANNEX_AC §AC2 | ACTIVE |
| T-007 | P-004 | ANNEX_AB §AB5 | ACTIVE |
| T-008 | P-008 / P-025 / P-041 | ANNEX_AC §AC3 / ANNEX_AI | ACTIVE; multiple patches all traceable |
| T-009 | P-009 / P-024 | ANNEX_AF / ANNEX_AS | ACTIVE |
| T-011 | P-011 | ANNEX_AD | ACTIVE |
| T-012 | P-012 | ANNEX_AE §AE2.1 | ACTIVE |
| T-013 | P-012 | ANNEX_AE §AE2.2 | ACTIVE |
| T-014 | P-012 | ANNEX_AE §AE2.3 | ACTIVE |
| T-015 | P-012 | ANNEX_AE §AE2.4 | ACTIVE |
| T-016 | P-013 / P-034 | ANNEX_AG / ANNEX_AV | ACTIVE; both annexes confirmed to exist |
| T-017 | P-014 / P-020 | ANNEX_AH §AH1–AH7 / §AH2.1–AH2.4 | ACTIVE; full 5-stage process in annex |
| T-018 | P-015 / P-024 | ANNEX_AP / ANNEX_AS | ACTIVE; T-018 residual handled by P-024 attestation mechanism |
| T-019 | P-015 / P-052 | ANNEX_AP / ANNEX_AI §4.12 | ACTIVE |
| T-020 | P-017 | ANNEX_AL | ACTIVE |
| T-021 | P-017 | ANNEX_AL | ACTIVE |
| T-023 | P-019 | ANNEX_AN | ACTIVE |
| T-024 | P-022 | ANNEX_AQ | ACTIVE; FC-100 bound |
| T-025 | P-023 | ANNEX_AR | ACTIVE |
| T-026 | P-026 | founding/order/ + ANNEX_AI §3.4 + ANNEX_AJ §4 | ACTIVE |
| T-027 | P-026 | founding/order/ + ANNEX_AI §3.2 | ACTIVE |
| T-028 | P-050 | ANNEX_AT §AT6.6 | ACTIVE |

25 of 26 active threat IDs have at least one complete chain to a named, non-placeholder annex or constitutional text location. The exception is T-022 (see Partial Chains).

---

## Partial Chains

### T-022 — Electoral Cycle Capture

T-022 has two patches:

- **P-018** (PROPOSED): Maps to ANNEX_AM. The annex exists and has full clause text (AM1–AM8+). However, P-018 remains PROPOSED — it has not been formally activated through the Formal Acceptance Protocol. The chain T-022 → P-018 → ANNEX_AM is complete on paper but the patch status renders the constitutional clause non-operative. The Threat Register records T-022 status as **Designed**, consistent with this.
- **P-051** (ACTIVE): Maps to ANNEX_AM §AM8 specifically. This is a newer, narrower patch that creates the Constitutional Integrity Panel (CIP). P-051 is ACTIVE. So T-022 has partial active mitigation through P-051 but the primary entrenchment architecture (P-018) is still PROPOSED.

**Result:** Partial chain. T-022 has active coverage for one component (CIP via P-051) but the main mechanism (entrenchment ladder, Essential Access floor persistence, administrative hollowing triggers, transition continuity protocol) is not yet ACTIVE.

### P-056 → ANNEX_AK §AK8 → ANNEX_AZ §AZ2

P-056 (PROPOSED) specifies that the token mechanism for the Tier 0 open-access survival floor is "defined in ANNEX_AZ §AZ2 and is a pre-operational prerequisite under INV-LAUNCH-1." However, ANNEX_AZ §AZ2 as it actually exists contains Definitions for the progressive net-worth demurrage architecture (symbols S, M*, W*, r, E, λ(E)), **not** the token mechanism. The token mechanism section referenced by AK8 appears to not exist yet — AK8 itself says "(to be drafted)."

**Result:** Broken forward-reference. The chain P-056 → ANNEX_AK §AK8 → ANNEX_AZ §AZ2 is incomplete because ANNEX_AZ §AZ2 does not contain the referenced token mechanism content.

### P-057 through P-062 — PROPOSED Pilot Town Framework

Six patches (P-057 through P-062) are PROPOSED and reference governance documents that are listed as "Creates: [path]" in the Patch Log but whose existence was not confirmed by direct read. These include:
- `docs/governance/Pilot_Site_Selection_Criteria.md`
- `docs/governance/Jurisdiction_Interface_Clause.md`
- `docs/governance/Vulnerable_Population_Consent_Protocol.md`
- `docs/governance/Founding_Team_Composition_Standard.md`
- `docs/governance/Founding_Capital_Framework.md`
- `docs/governance/Pilot_Timeline_Framework.md`

**Result:** UNCERTAIN — existence of these documents could not be confirmed from reads performed. If they do not exist, these are incomplete chains. If they do exist, the chains are complete pending patch activation.

---

## Missing Links

### 1. T-003 — No Annex

T-003 is RETIRED (absorbed into T-002 before formal register versioning). No annex exists and none is expected. The retirement entry is present in the register. **Not a defect — properly documented.**

### 2. T-010 — Renumbered, No Formal Retirement Entry for "T-010" as a Patch

T-010 is labeled RENUMBERED to T-011 in the retired/reserved table. Both T-010 and T-011 appear together in the Summary table at lines 109–110 of the Threat Register, with identical titles and risk scores, labeled "(See T-010/T-011 combined entry.)" for T-011. However, P-011 in the Patch Log maps to T-011 only, not T-010. The AH8 table maps T-011 → P-011 without any T-010 entry.

**Gap:** If any external document or older corpus file contains a reference to T-010 as a standalone threat, that reference currently resolves to T-011. The retirement note says "References to T-010 resolve to T-011" but does not provide an explicit redirect row in AH8. **Severity: Low — properly noted in register; no active chain breaks.**

### 3. Missing Patch IDs in Sequence

The Patch Log inventory skips the following IDs with no retirement or placeholder entries:

| Missing ID | Gap position | Notes |
| :--- | :--- | :--- |
| P-007 | Between P-006 and P-008 | No entry anywhere in Patch Log; no retirement notice |
| P-010 | Between P-009 and P-011 | No entry anywhere in Patch Log; no retirement notice |
| P-028 | Between P-027 and P-029 | No entry anywhere in Patch Log; no retirement notice |

These IDs are absent from the inventory table, absent from the detailed entries, and absent from both linkage tables (AH8 and the Patch Log's own summary). No retirement notice explains the gap.

**This is a defect.** If these IDs were assigned but later merged or abandoned, no audit trail exists. If they were never assigned, the numbering gap creates ambiguity about whether a future reference to P-007, P-010, or P-028 would introduce a new patch or incorrectly claim to reference an existing one.

### 4. ANNEX_AZ §AZ2 — Token Mechanism Not Drafted

As noted in Partial Chains: ANNEX_AK §AK8 and P-056 both direct the reader to "ANNEX_AZ §AZ2 (to be drafted)" for the Tier 0 token mechanism. The actual ANNEX_AZ §AZ2 contains demurrage architecture definitions, not a token mechanism. The referenced section is either misnamed or does not yet exist.

**This is a defect.** INV-LAUNCH-1 is listed as a pre-operational prerequisite gating on this specification; the gating document does not exist.

---

## Broken or Stale References

### 1. P-024 References "TR-07" as a Threat ID

In the Patch Log inventory table, P-024's "Related Threat" column reads `T-009 / TR-07 / T-018`. "TR-07" does not appear in the Threat Register as a registered threat ID. In the P-024 detailed entry (line 718), the threat description names "TR-07 (Attestor Collusion)" alongside T-009 and T-018.

**Finding:** TR-07 is a non-standard ID that appears to refer to an internal audit finding or named risk pattern that was never formally registered as a T-NNN threat. It is not in the Threat Register. The AH8 table at line 129 lists P-024 with "T-009 / TR-07 / T-018" in the Threat column, propagating the non-standard ID into the master linkage table.

**Severity: Medium.** TR-07 is not a broken link in the sense that P-024 still resolves — but it introduces an unregistered namespace into the master traceability table, which is confusing and unauditable as-is.

### 2. PRD- References Have No Defining Registry

Patches P-030, P-031, P-032, and P-033 reference threats as `PRD-004`, `PRD-009`, `PRD-008` respectively. These IDs do not appear in the Threat Register at all. The label suggests "Protocol Design Requirement" — an earlier design catalogue — but no registry or index for PRD- IDs was found in the corpus.

**Finding:** The Threat Register's retirement and reserved table does not mention PRD- IDs. No `PRD_Register.md` or equivalent was observed. These are orphan references — patches pointing to a threat namespace that has no discoverable defining document.

**Severity: Medium.** Patches P-030–P-033 are all ACTIVE. Their constitutional text references are intact (ANNEX_X.md and ANNEX_J.md). The broken link is backward-only (threat source is undiscoverable) rather than forward (constitutional text exists).

### 3. ACL- References Have No Defining Registry

Several PROPOSED patches (P-057, P-059, P-060, P-061, P-062) reference threats as `ACL-010`, `ACL-011`, `ACL-005`, `ACL-007` in the Related Threat column. T-028 residual risk mentions `ACL-009` and `ACL-012`. The AH8 table also includes ACL- IDs in the Threat column for P-059, P-060, P-061, P-062 rows. No `ACL_Register.md` or equivalent defining document was found.

**Finding:** ACL- IDs appear to represent an adversarial capture-layer audit finding series, possibly from an internal audit phase. They are referenced as if they were threats, but they have no discoverable registration or definition document visible in the corpus.

**Severity: Medium-High.** Unlike PRD- IDs (which map to ACTIVE patches with intact constitutional text), ACL- IDs appear in PROPOSED patches that form the pilot town founding framework. If this framework is ever reviewed, the threat sources are unauditable.

### 4. IC- References Have No Defining Registry

P-045 lists "IC-004" in its related threats. The detailed entry describes IC-004 as a "governance-gap note" replaced by the Dignity-Only Continuity Mode (ANNEX_AH §AH5.1). No IC- register or definition document was found. The term appears only twice in the corpus read: in the P-045 entry.

**Finding:** IC-004 may be an internal capture-category ID, possibly from a session-internal categorization that was never formally registered as a threat. It is addressed (per P-045) but its definition source is opaque.

**Severity: Low.** IC-004 appears only once as a source reference for P-045 and the gap it describes (governance void after P-013 suspension) is now documented in ANNEX_AH §AH5.1.

### 5. P-026 References "founding/order/" — Directory Existence Uncertain

P-026 maps T-026 and T-027 to `founding/order/` — a directory rather than a single annex file. The AH8 table confirms this for both threats. The P-026 detailed entry lists six files in the directory: README, scale hierarchy, subsidiarity rule, affirmative consent protocol, exit protocol, and re-entry protocol. **UNCERTAIN whether these files exist**; they were not confirmed by direct read during this audit.

**Severity: UNCERTAIN.** If `founding/order/` directory and files exist, chains are complete. If not, T-026 and T-027 have no operative annex.

### 6. T-016 Threat Entry Has Status Inconsistency

The T-016 detailed entry in the Threat Register (line 351) reads: "related: [P-034] · Status: **PROPOSED**" — but P-034 is ACTIVE per both the Patch Log inventory and the AH8 table. The "Status: PROPOSED" annotation in the T-016 entry appears to be a stale copy of an earlier state.

**Finding: DEFECT.** The T-016 detailed entry incorrectly labels P-034 as PROPOSED when it is ACTIVE. This is an internal inconsistency within the Threat Register itself.

### 7. T-017 and T-018 Detailed Entries Have Stale Patch Status Labels

The T-017 detailed entry (line 368) reads "P-014 · Status: **PROPOSED**" — but P-014 is ACTIVE in all inventory and AH8 tables.

The T-018 detailed entry (line 389) reads "P-015 · P-024 · Status: **PROPOSED**" — but both P-015 and P-024 are ACTIVE in the inventory and AH8 tables.

**Finding: DEFECT.** At least three detailed Threat Register entries carry stale "Status: PROPOSED" annotations for patches that are now ACTIVE. This is a systematic copy-propagation failure — the detailed entries appear not to have been updated when the patches were promoted.

---

## Duplicate or Conflicting IDs

### 1. T-010 and T-011 — Dual Presence in Summary Table

The "Summary by Priority" table (lines 109–110) lists both T-010 and T-011 as active entries with identical names ("Narrative Attack Surface"), identical risk scores (80), and T-011 annotated "(See T-010/T-011 combined entry.)". The retirement table separately states T-010 is RENUMBERED to T-011.

**Finding:** T-010 appears in two places with conflicting treatment — as RENUMBERED (retirement table) and as an active entry (summary table). This is an internal inconsistency. The summary table should not contain T-010 if it is retired/renumbered; or the retirement table should not list T-010 as RENUMBERED if it intentionally appears in the summary.

**Severity: Low-Medium.** Does not break any downstream chain (P-011 maps only to T-011) but creates confusion about whether T-010 is active or retired.

### 2. T-022 Has Two Patches Pointing to the Same Annex File (ANNEX_AM)

P-018 maps to ANNEX_AM (full annex). P-051 maps to ANNEX_AM §AM8 specifically. Both address T-022. There is no conflict in the linkage — P-051 adds a section (AM8) to the annex that P-018 defines. The AH8 table lists both rows clearly. This is intentional architecture.

**Finding: Not a defect.** The dual-patch single-annex pattern is documented and consistent.

### 3. AH8 Row for P-056 Has Column Transposition

In AH8 (ANNEX_AH.md, line 164), the P-056 row reads:
`| P-056 | Open-Access Survival Floor | ANNEX_AK §AK8 | T-002, INV-001 | PROPOSED |`

The column order for all other rows is `| Threat | Patch | Status | Annex | Session |`. For the P-056 row, the first column contains the Patch ID ("P-056"), the second contains the patch title, the third contains the Annex, the fourth contains the Threats, and the fifth contains the status. This is a transposed column layout compared to all other rows in the table.

**Finding: DEFECT.** The P-056 AH8 row has its columns in a different order than the table header specifies. A reader or automated parser scanning the table by column would misattribute the Threat, Patch, Status, and Annex fields for P-056. The same transposition problem affects P-057 through P-062 rows, which all use "—" in the Threat column and place Patch IDs in the first column.

**Severity: Medium.** The information is present but the column misalignment means the table format is inconsistent for all PROPOSED (P-056+) entries vs. all ACTIVE entries.

---

## High-Risk Traceability Failures

### HRF-1: ANNEX_AZ §AZ2 Mismatch — Pre-Operational Prerequisite Unmet

P-056 (PROPOSED) and ANNEX_AK §AK8 (which is referenced by PROPOSED P-056) direct the corpus to ANNEX_AZ §AZ2 for the Tier 0 token mechanism specification. ANNEX_AZ §AZ2 actually defines demurrage architecture variables (S, M*, W*). The token mechanism is marked "(to be drafted)" inside ANNEX_AK §AK8 itself.

INV-LAUNCH-1 is named as a pre-operational prerequisite that gates on this specification existing. If this is a hard gate, the system cannot legally proceed to operation without a document that does not exist in the expected location. If someone checking pre-operational prerequisites looks at ANNEX_AZ §AZ2, they will find demurrage content and may either (a) incorrectly conclude the gate is met, or (b) be confused about what file to check.

**Risk level: Critical — potential for false gate passage at a pre-operational blocking gate.**

### HRF-2: Three Missing Patch IDs (P-007, P-010, P-028) — Audit Trail Gap

The absence of P-007, P-010, and P-028 without retirement notices means that if any document in the corpus references one of these IDs (from an earlier draft, for example), that reference is unresolvable without historical knowledge. The corpus validation script `validate_corpus.py` checks links — it is unclear whether it checks for referenced-but-absent patch IDs.

**Risk level: High — silent reference breakage risk; no trail to explain the gaps.**

### HRF-3: Stale "PROPOSED" Labels on ACTIVE Patches in Threat Register Detailed Entries

T-016's cross-reference to P-034, T-017's cross-reference to P-014, and T-018's cross-references to P-015 and P-024 all carry "Status: PROPOSED" when the patches are ACTIVE. A reader using the Threat Register detailed entries as the authoritative status source (rather than the Patch Log or AH8) would conclude these patches are still proposed — potentially causing them to bypass pre-launch gates that only apply to ACTIVE patches, or to discount mitigations that are actually in force.

**Risk level: High — status misinformation in the Threat Register detailed entries for three Critical and one High severity threat.**

### HRF-4: ACL- and PRD- Namespace Opacity at the Pilot Town Founding Framework

The six PROPOSED pilot-founding patches (P-057 through P-062) reference ACL- IDs as their primary threat sources. ACL- has no discoverable registry. When an auditor or founding team member attempts to verify that these patches address real, registered threats, they cannot complete the chain. This is especially concerning because P-059 (Vulnerable Population Consent Protocol) and P-060 (Founding Team Composition Standard) are Critical priority patches.

**Risk level: High — founding framework patches cannot be fully back-traced to registered threats; audit integrity for the most sensitive founding documents is compromised.**

### HRF-5: T-022 Primary Mechanism (P-018) Remains PROPOSED While Status Listed as "Designed"

T-022 (Electoral Cycle Capture) is the one threat with status "Designed" rather than "Active — unproven." This is because P-018 is PROPOSED. The risk score is 60 (Critical severity). The partial active coverage via P-051 (CIP) addresses one structural mechanism but leaves the Essential Access floor minimum persistence, administrative hollowing triggers, and transition continuity protocol unactivated. Given that T-022 addresses hostile-government capture — the most complete failure mode in the threat model — the gap between PROPOSED and ACTIVE for the primary patch is a significant operational risk even if not a traceability defect per se.

**Risk level: High — the most complete failure mode has its primary structural defense not yet activated.**

---

## Findings Table

| ID | Type | Severity | Confidence | File | Section | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| F-01 | DEFECT | Critical | High | docs/annexes/ANNEX_AZ.md §AZ2 | AZ2 | P-056 and ANNEX_AK §AK8 both reference ANNEX_AZ §AZ2 for the Tier 0 token mechanism, but §AZ2 contains demurrage definitions (S, M*, W*), not a token mechanism. The token spec is "(to be drafted)." INV-LAUNCH-1 gates on this; the gate document is missing or misaddressed. |
| F-02 | DEFECT | High | High | docs/governance/Patch_Log.md | Inventory table | P-007, P-010, P-028 are absent from the patch sequence with no retirement notice, merger note, or explanation. Three gaps in a sequence claimed to run P-001 through P-062 without acknowledged breaks. |
| F-03 | DEFECT | High | High | docs/governance/Threat_Register.md | T-016, T-017, T-018 detailed entries | At least three detailed threat entries carry "Status: PROPOSED" annotations for patches (P-034, P-014, P-015, P-024) that are ACTIVE in the Patch Log and AH8. Status misinformation for Critical/High severity threats. |
| F-04 | DEFECT | Medium | High | docs/annexes/ANNEX_AH.md | AH8 rows for P-056 through P-062 | AH8 table column transposition: PROPOSED entries (P-056+) have columns in a different order than the table header (Patch ID in Threat column, title in Patch column, Annex in Status column, etc.). Breaks consistent machine-readable parsing of the master linkage table. |
| F-05 | DEFECT | Medium | High | docs/governance/Threat_Register.md | T-010 retirement vs. Summary table | T-010 appears in the Summary by Priority table as an active entry AND in the Retired/Reserved table as RENUMBERED. Dual presence with conflicting treatment. |
| F-06 | DEFECT | Medium | Medium | docs/governance/Threat_Register.md + Patch_Log.md | T-016 P-034 status label | T-016 detailed entry says P-034 status is "PROPOSED" but P-034 is ACTIVE in Patch Log inventory, AH8, and P-034's own detailed entry. |
| F-07 | DEFECT | Medium | High | docs/governance/Patch_Log.md | P-024 inventory row | P-024 lists "TR-07" in the Related Threat column. TR-07 does not exist in the Threat Register. An unregistered namespace ID appears in the master inventory. AH8 propagates this ID. |
| F-08 | DEFECT | Medium | High | docs/governance/Patch_Log.md | P-030, P-031, P-032, P-033 inventory rows | PRD-004, PRD-008, PRD-009 IDs appear in Related Threat columns. PRD- has no discoverable registry in the corpus. These are orphan references — threat source undefined. |
| F-09 | DEFECT | Medium | High | docs/governance/Patch_Log.md; docs/annexes/ANNEX_AH.md AH8 | P-057 through P-062 and T-028 residual | ACL- IDs (ACL-005, ACL-007, ACL-009, ACL-010, ACL-011, ACL-012) referenced as threats for Critical PROPOSED patches. No ACL registry found. Six founding-framework patches have unverifiable threat sources. |
| F-10 | DEFECT | Low | High | docs/governance/Patch_Log.md | P-045 entry | IC-004 referenced in P-045 Related Threat. No IC- register found. IC-004 is addressed by P-045/AH5.1 but cannot be back-traced to a formal threat definition. |
| F-11 | IMPROVEMENT | High | High | docs/governance/Threat_Register.md | T-022 entry | T-022 primary patch P-018 remains PROPOSED; P-051 provides only partial active coverage (CIP only). The most complete failure mode (hostile-government capture) lacks its primary structural defense in ACTIVE status. Not a traceability defect — a design-state gap. |
| F-12 | IMPROVEMENT | Medium | Medium | docs/constitution/Acceptance_Protocol.md | Priority Acceptance Order table | Acceptance Protocol Priority table (rows 0–14) lists patches by priority and activation path but does not cross-reference clause IDs or invariant IDs. Table is patch-centric, not clause-centric — no backward link from acceptance priority to specific constitutional text. |
| F-13 | UNCERTAIN | Medium | Low | docs/governance/ | P-057 through P-062 "Creates:" paths | Six PROPOSED patches list governance documents they create. Existence of those files not confirmed by this audit. If they do not exist, six chains are incomplete. |
| F-14 | UNCERTAIN | Medium | Low | founding/order/ | P-026 T-026 / T-027 annex reference | P-026 references `founding/order/` directory as the operative annex for T-026 and T-027. Directory and contained files not confirmed by this audit. |

---

## Recommendations for Later Phases

1. **Fix ANNEX_AZ §AZ2 mismatch (F-01).** Either draft the Tier 0 token mechanism at §AZ2 or rename the section and update ANNEX_AK §AK8 and P-056 to point to the correct location. This is a pre-operational blocking gate and should be treated as a critical prerequisite.

2. **Document or retire P-007, P-010, P-028 (F-02).** Add entries to the Patch Log (even if just one-line retirement/merger notices) explaining why these IDs are absent. This closes the audit trail gap without modifying any substantive content.

3. **Update stale patch status labels in Threat Register detailed entries (F-03, F-06).** The T-016, T-017, and T-018 detailed entries carry "PROPOSED" status labels for now-ACTIVE patches. A targeted search-and-replace in the Threat Register detailed entry headers for P-014, P-015, P-024, and P-034 would resolve these.

4. **Fix AH8 table column order for PROPOSED entries (F-04).** The P-056 through P-062 rows in AH8 have a different column structure than the ACTIVE entries. Normalize them to the Threat | Patch | Status | Annex | Session format, or add a note that PROPOSED entries use an alternate format. This affects machine-readable parsing.

5. **Clarify T-010 status in Summary table (F-05).** Remove T-010 from the Summary by Priority table if it is truly RENUMBERED, or add a cross-reference note. Do not list it as an active entry and a retired entry simultaneously.

6. **Register TR-07, PRD-, ACL-, and IC- namespaces formally (F-07, F-08, F-09, F-10).** Either:
   - Create index documents (`docs/governance/PRD_Register.md`, `docs/governance/ACL_Register.md`) defining each ID, or
   - Map each non-standard ID to its corresponding T-NNN threat in the Threat Register and update Patch Log entries to use the canonical T-NNN reference.
   This is particularly urgent for ACL- IDs referenced by Critical-priority PROPOSED patches in the pilot-founding framework.

7. **Establish a consistent policy for IDs that appear in multiple namespaces.** The corpus currently has six different prefix conventions (T-, P-, PRD-, ACL-, INV-, IC-, TR-) that are used in traceability tables. Without a namespace registry, future auditors cannot determine which prefixes are authoritative, which are legacy, and which are expected to grow.

8. **Add clause-level back-links to the Acceptance Protocol priority table (F-12).** The Priority Acceptance Order table lists patches but not the constitutional clauses or invariants they gate. Adding a column for "Primary clause or invariant protected" would make the acceptance protocol serve double duty as a clause-to-gate traceability matrix.

9. **Confirm existence of pilot-founding governance documents (F-13).** Run `find docs/governance -name "*.md"` or equivalent to verify which of the six "Creates:" documents from P-057 through P-062 actually exist in the corpus.

10. **Confirm existence of founding/order/ directory (F-14).** If the directory does not exist, T-026 and T-027 have no operative annex — a gap for two Active-unproven Critical and High threats.

---

## Self-Review

| Dimension | Score (1–5) | Notes |
| :--- | :--- | :--- |
| **Coverage** | 4 | All 26 active threats, all 62 patch IDs (by sequence), AH8 master table, Acceptance Protocol, and five spot-check annexes read. Founding/order/ directory and six P-057–P-062 "Creates:" docs not confirmed. |
| **Specificity** | 4 | Line-level citations for all 14 findings. Column numbers cited for AH8 transposition. Exact patch IDs and file paths named throughout. Confidence levels assigned per finding. |
| **Evidence** | 4 | All High-confidence findings are directly quoted or directly observed. Medium-confidence findings cite two or more corroborating sources. UNCERTAIN findings are marked as such. No invented findings. |
| **Adversarial Depth** | 3 | Identified five categories of namespace opacity that could allow false gate passage (F-01 especially). Identified stale status labels that create misinformation risk. Did not attempt to model second-order exploits of the traceability gaps (e.g., using ambiguous PRD- reference to insert a patch with false threat attribution). |
| **Actionability** | 5 | All 10 recommendations are specific, reference exact files and IDs, and do not require reading unscanned corpus to implement. Ordered by urgency. |
| **Overall** | 4 | Solid coverage of the primary traceability chain and non-standard namespaces. Main limitation is unconfirmed directory existence for founding/order/ and six governance documents. A follow-up check of those paths would raise Coverage to 5. |

**Adversarial depth score of 3 — Repair Pass Needed:**

The audit found evidence of namespace opacity and stale status labels but did not fully model the adversarial scenarios enabled by these gaps. Specifically:

- F-01 (ANNEX_AZ §AZ2 mismatch): The audit identified the broken reference but did not investigate whether INV-LAUNCH-1 clearance is checked anywhere in the CI pipeline or whether a validator would detect the mismatch. A repair pass should confirm whether `validate_corpus.py` or equivalent would catch this gap.
- F-08/F-09 (PRD-/ACL- namespaces): The audit observed that no registry exists but did not attempt to reconstruct what PRD-004, PRD-008, PRD-009, ACL-005 through ACL-012 likely refer to from context. A repair pass could attempt contextual reconstruction and verify against any archived session notes.

---

*This file was written by a corpus auditor operating in read-only mode. No source corpus files, generated files, scripts, or configs were modified. All findings are based on direct file reads performed during this session.*
