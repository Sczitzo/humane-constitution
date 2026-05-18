# Corpus Inventory and Map

**Audit date:** 2026-05-15
**Auditor:** Claude Code corpus auditor (claude-sonnet-4-6)
**Branch:** claude/pedantic-spence-c4e730
**Phase:** 1 — Structural Inventory

---

## Scope

This document inventories all markdown source files in the repository, maps them to corpus sections, identifies naming anomalies, checks AH8 linkage completeness, reviews INDEX.md accuracy, and flags structural issues. It does not evaluate substantive constitutional content.

---

## Method

1. File enumeration via `find` (read-only)
2. Direct inspection of `scripts/export_corpus.py`, `docs/annexes/INDEX.md`, `docs/annexes/ANNEX_AH.md §AH8`
3. Grep sampling for cross-references, status vocabulary, and orphan candidates
4. Manual cross-reference of AH8 annex column entries against confirmed file list
5. Patch number gap detection via sorted grep output from `docs/governance/Patch_Log.md`

No corpus regeneration commands were run.

---

## Corpus Architecture

The export pipeline in `scripts/export_corpus.py` populates two generated artifacts:
- `app/src/generated/corpus.ts` — TypeScript type stubs + `loadCorpus()` function
- `app/public/generated/corpus.json` — full document payload

The pipeline uses three input mechanisms:
1. An explicit `CORE_DOCS` tuple (52 paths, manually maintained)
2. A glob over `docs/annexes/ANNEX_*.md` (auto-discovers all annex files)
3. A glob over `founding/order/*.md` (auto-discovers founding order docs)
4. A glob over `docs/content/*.md` (reserved; currently empty)

Reader sections map as follows:

| `section` value | What it covers |
|---|---|
| `constitution` | Humane Constitution, SPECIFICATIONS, INVARIANTS, README |
| `registry` | Governance docs, architecture docs, founding/commitments, Acceptance Protocol |
| `annex` | All ANNEX_*.md files |
| `founding_order` | founding/order/*.md |

---

## Source File Inventory

**Total markdown files in repository (excluding node_modules, .git):** 129

### docs/constitution/ — 4 files

| File | In CORE_DOCS | Notes |
|---|---|---|
| `Humane_Constitution.md` | Yes | Protected — do not modify without explicit instruction |
| `Acceptance_Protocol.md` | Yes | Protected |
| `INVARIANTS.md` | Yes | Protected |
| `SPECIFICATIONS.md` | Yes | Technical state-machine spec |

### docs/annexes/ — 44 files (43 ANNEX_*.md + INDEX.md)

All `ANNEX_*.md` files are auto-discovered by glob. `INDEX.md` is explicitly in `CORE_DOCS`.

**Annexes present on disk (43 files):**
A, AB, AC, AD, AE, AF, AG, AH, AI, AJ, AK, AL, AM, AN, AO, AP, AQ, AR, AS, AT, AV, AW, AX, AY, AZ, B, C, H, I, J, K, L, M, N, P, Q, S, T, U, V, X, Y, Z

### docs/governance/ — 34 files

All 34 files are explicitly registered in `CORE_DOCS`. See complete list in `scripts/export_corpus.py` lines 27–59.

Key files: Threat_Register.md, Patch_Log.md, Provenance_Map.md, Hardening_Queue.md, Claims_Evidence_Register.md, Collapse_State_Crosswalk.md, Threat_Resolution_Matrix.md, Open_Problems_Resolution_Docket.md, Architecture_Source_Map.md, External_Evidence_Register.md, Implementation_Drift_Audit_Package.md, Parameter_Calibration_Register.md, Capture_Dashboard_Specification.md, Conglomerate_Transition_Dossier.md, Essential_Sector_Refusal_Test_Package.md, Abuse_Case_Library.md, Evidence_Ladder.md, Founding_Legitimacy_Dossier.md, Identity_Recovery_Evidence_Test_Package.md, Capacity_Measurement_Evidence_Test_Package.md, Service_Record_Misuse_Evidence_Test_Package.md, Demurrage_Evidence_Test_Package.md, Corpus_Refinement_Roadmap.md, Conceptual_Refinement_Audit.md, Founding_Preactivation_Disclosure.md, Pilot_Evidence_Roadmap.md, Fairness_Vignette_Library.md, Vulnerable_Population_Consent_Protocol.md, Pilot_Timeline_Framework.md, Founding_Capital_Framework.md, Founding_Team_Composition_Standard.md, Christ_Centered_Evaluation.md, Jurisdiction_Interface_Clause.md, Pilot_Site_Selection_Criteria.md

### docs/public/ — 7 files

All 7 explicitly in `CORE_DOCS`: 01_overview.md, 02_faq.md, 03_readiness.md, 04_white_paper.md, 05_rights_layer.md, 06_big_companies.md, 07_life_under_the_system.md

### docs/simulations/ — 2 files

Both in `CORE_DOCS`: Adversarial_Narrative_Simulation.md, Annual_Compound_Simulation.md

### docs/review/ — 1 file

`2026-05-01-full-review.md` — **not in CORE_DOCS, not in any glob pattern.** Excluded from corpus.

### docs/design/ — operational artifacts

`docs/design/redesign-2026-04-25/README.md` and before/after subdirectories. **Not in corpus.** UI redesign artifacts.

### docs/superpowers/plans/ — 6 files

Plan files for agentic workers (dated 2026-05-01 through 2026-05-14). **Not in CORE_DOCS and not in any corpus glob.** Not exported. These are operational planning artifacts, not constitutional documents.

### docs/PLAIN_LANGUAGE.md — 1 file

**Not in CORE_DOCS and not in any corpus glob.** Not exported. Status: UNCERTAIN whether this is intentionally excluded or was overlooked.

### architecture/ — 4 files

All 4 explicitly in `CORE_DOCS`: amendment_protocol.md, drift_chain.md, implementation_binding.md, parameter_registry.md

### founding/ — 6 files

`founding/commitments.md` — explicitly in `CORE_DOCS`.
`founding/order/` — 5 files auto-discovered by glob: README.md, consent_protocol.md, exit_protocol.md, jurisdictional_scales.md, reentry_protocol.md, subsidiarity_rule.md

### Root-level .md files — 6 files

`README.md` — in `CORE_DOCS`.
`CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` — **not in CORE_DOCS, not exported.** Correct; these are repo-operation files.

---

## Generated File Exclusions

| File | Status |
|---|---|
| `app/src/generated/corpus.ts` | Generated — excluded from audit |
| `app/public/generated/corpus.json` | Generated — excluded from audit |

---

## Document Type Map

| Type | Pattern | Example |
|---|---|---|
| Constitutional | Protected, in constitution/ | Humane_Constitution.md |
| Annexes | ANNEX_[A-Z]+.md | ANNEX_AH.md |
| Governance registry | Title_Case_With_Underscores.md in governance/ | Threat_Register.md |
| Public-facing | NN_lowercase_name.md in public/ | 01_overview.md |
| Architecture | lowercase_with_underscores.md in architecture/ | parameter_registry.md |
| Founding order | lowercase_with_underscores.md in founding/order/ | consent_protocol.md |
| Operational plans | YYYY-MM-DD-topic.md in superpowers/plans/ | 2026-05-01-nav-redesign.md |
| Review | YYYY-MM-DD-topic.md in review/ | 2026-05-01-full-review.md |

---

## ID and Naming Pattern Review

### Single-letter annexes: gaps

The full alphabet A–Z has 26 letters. Present single-letter annexes (18): A, B, C, H, I, J, K, L, M, N, P, Q, S, T, U, V, X, Y, Z

**Missing single-letter annexes (8): D, E, F, G, O, R, W, AA**

Per `docs/annexes/INDEX.md §Audit history`:
> "The 2026-04-25 review removed annexes D and O (no operative content; superseded by AJ + Q), merged G into H/L/V, R into J + U, W into P, and AA into N + U + X."

These gaps are **intentional and documented.** Evidence: INDEX.md line 96–97 explicitly records the merges and removals. DEFECT risk: low, but the absence of D, E, F, G, O, R, W from INDEX.md's plain-language map could confuse readers who encounter references to these letters in older external documents.

**Note on E and F:** Not mentioned in the INDEX.md audit history note. Their absence is not explained. UNCERTAIN whether E and F were never assigned or were silently removed.

### Double-letter annexes: gap

Present double-letter annexes (A-series): AB, AC, AD, AE, AF, AG, AH, AI, AJ, AK, AL, AM, AN, AO, AP, AQ, AR, AS, AT, AV, AW, AX, AY, AZ

**Missing: AU**

The sequence runs AT → AV, skipping AU. There is no entry in INDEX.md explaining this gap. `ANNEX_AU` does not exist on disk. No reference to `ANNEX_AU` appears in any corpus document (confirmed via grep returning no output). This gap is **not documented** in INDEX.md's audit history.

### Patch number gaps in Patch_Log

Sorted patch IDs present in `docs/governance/Patch_Log.md` (confirmed via grep):
P-001 through P-006, then: **P-007 missing**, P-008, P-009, **P-010 missing**, P-011 through P-027, **P-028 missing**, P-029 through P-062

**Gaps: P-007, P-010, P-028.** These patch numbers do not appear as `### P-NNN` headings in the Patch_Log. Whether they were retired, merged, or never assigned is UNCERTAIN — there is no documented explanation for these gaps.

Additionally, `P-013` appears **twice** as a `### P-013` heading in the Patch_Log (confirmed via grep returning two matches). This is a DEFECT — duplicate section headings will cause anchor slug collisions in the reader.

### Threat number gaps in Threat_Register

Present threat IDs (from `### T-0` grep): T-001, T-002, T-004, T-005, T-006, T-007, T-008, T-009, T-010/T-011 (merged heading), T-012 through T-028

**T-003 missing as a standalone entry.** The heading `### T-010 / T-011` merges two threats. Whether T-003 was retired or never existed is UNCERTAIN — no audit history note explains it.

### Architecture files: case inconsistency

Architecture files use `lowercase_with_underscores.md`. This is consistent internally but differs from governance docs (Title_Case). Not a defect by itself — different conventions for different doc types — but worth noting for reader UX.

---

## Orphaned or Misplaced Files

### docs/PLAIN_LANGUAGE.md

This file is **not registered in CORE_DOCS and not picked up by any glob.** It exists in the source tree but is invisible to the reader corpus. Whether this is intentional (treated as a contributor guide, not a corpus doc) or an oversight is UNCERTAIN. No other corpus document links to `docs/PLAIN_LANGUAGE.md` via a corpus-routed reference.

**Finding:** IMPROVEMENT — evaluate whether this should be added to CORE_DOCS or explicitly noted as out-of-corpus.

### docs/review/2026-05-01-full-review.md

This review document is in the source tree but not exported to the corpus. It contains substantive analysis of constitutional issues (Hardening_Queue status vocabulary conflicts, SPECIFICATIONS.md FC linkage gaps). It is not linked from any corpus document. It is accessible to contributors but invisible to readers.

**Finding:** IMPROVEMENT — consider whether this should be in corpus (as a transparency record) or remain as a contributor-only artifact. Currently it is orphaned from the reader's perspective.

### docs/superpowers/plans/*.md — 6 files

These are agentic worker plans, not constitutional documents. They are correctly excluded from the corpus. They should **not** be added to CORE_DOCS. However, `validate_corpus.py`'s behavior of parsing markdown links inside all files means these files could produce false validator errors if they contain corpus-style markdown links. (Per corpus-contracts.md: "avoid bare Markdown-link examples in docs outside docs/ — use inline code instead.")

**Finding:** IMPROVEMENT — verify plans files do not contain bare markdown links that trigger the validator. Low priority.

### docs/design/ subdirectories

Design artifacts (before/after screenshots, README). Not corpus docs. Correctly excluded. No action needed.

---

## Duplicates or Near-Duplicates

### P-013 duplicate heading in Patch_Log

`grep -n "^### P-" docs/governance/Patch_Log.md` returns `P-013` twice. The Patch_Log contains two `### P-013` headings. This creates an anchor slug collision: the reader's `slugify_heading()` function (confirmed in `scripts/export_corpus.py` lines 74–77) uses a count-based deduplication, so the second occurrence becomes `p-013-2`. Any external link to `#p-013` will land on the first occurrence only.

**Finding:** DEFECT — duplicate section heading in Patch_Log.md causes anchor ambiguity. Severity: Medium.

### No true near-duplicate files detected

No two annex files were found to cover overlapping substantive territory at the file level. AH8's explicit merger history (D into AJ, G into H/L/V, etc.) indicates deduplication was performed at the 2026-04-25 review.

---

## High-Risk Structural Issues

### 1. AH8 linkage table is incomplete relative to Patch_Log

The AH8 table (`ANNEX_AH.md §AH8`) claims to be the "Complete Threat/Patch Linkage — All Sessions." However, the following patches appear in `docs/governance/Patch_Log.md` (with annex references) but are **not listed in AH8**:

| Patch | Patch_Log annex reference | Status |
|---|---|---|
| P-016 | Annex AK | ACTIVE |
| P-021 | Annex AO | ACTIVE |
| P-024 | Annex AS | ACTIVE |
| P-025 | Annex AI | ACTIVE |
| P-029 through P-049 | Various | ACTIVE |

Evidence: `Patch_Log.md` line 691 lists `P-016 → Annex AK`; line 696 lists `P-021 → Annex AO`; line 699 lists `P-024 → Annex AS`; line 700 lists `P-025 → Annex AI`. The AH8 table includes P-016 only in a malformed row (line 164 reads `| P-056 | Open-Access Survival Floor | ANNEX_AK §AK8 | T-002, INV-001 | PROPOSED |` — columns appear shifted, not a standard T/P/Status/Annex/Session row).

The AH8 table covers S1–S10 sessions but entirely omits a large batch of patches (P-029 through P-049) that appear in Patch_Log with no session column in AH8. These may correspond to a batch-addition session not yet reflected in AH8.

**Finding:** DEFECT — AH8 does not cover all active patches. Severity: High.

### 2. AU gap in double-letter annex sequence

`ANNEX_AU.md` does not exist. The sequence skips from AT to AV. No documentation explains the skip. No corpus document references `ANNEX_AU`. This could indicate a planned but never-created annex, a retired annex (not recorded in INDEX audit history), or a numbering error.

**Finding:** DEFECT — undocumented gap in annex sequence. Severity: Low (no broken links; purely documentary gap).

### 3. Hardening_Queue uses non-canonical status labels (partially mitigated)

`docs/governance/Hardening_Queue.md` uses `DESIGNED`, `ACTIVE-UNPROVEN`, and `ONGOING` rather than the canonical vocabulary (`Designed`, `Active — unproven`, `Partly tested`, etc.). A cross-reference note was added (confirmed via grep line 7: "Status labels in this document use shorthand codes. See Claims_Evidence_Register.md for canonical definitions.") but this does not fully resolve the machine-readability problem — the `status_for()` function in `export_corpus.py` (lines 132–137) parses only the first 20 lines for `**Status` patterns, and the mapping note is prose, not a machine-readable mapping.

**Finding:** DEFECT (partially mitigated) — status vocabulary divergence in Hardening_Queue. Severity: Low (reader-facing) to Medium (if automated status parsing is relied upon).

### 4. E and F single-letter annexes undocumented

The INDEX.md audit history explains D, G, O, R, W, AA as intentional removals/merges. It does not mention E or F. These letters are not present as annex files, not referenced in INDEX.md's maps, and not mentioned in the merge history. Whether E and F were ever assigned is UNCERTAIN.

**Finding:** UNCERTAIN — document the disposition of E and F in INDEX.md audit history, or confirm they were never assigned.

### 5. docs/PLAIN_LANGUAGE.md excluded from corpus without documentation

The file exists at `docs/PLAIN_LANGUAGE.md` but is not in CORE_DOCS and is not discovered by any glob. The corpus export pipeline has no explicit exclusion record for it — it is simply absent. This is different from `docs/review/` or `docs/superpowers/plans/` which are excluded by the limited CORE_DOCS registration pattern.

**Finding:** IMPROVEMENT — either register in CORE_DOCS or add a comment in export_corpus.py noting the intentional exclusion.

---

## Findings Table

| ID | Type | Severity | Confidence | File | Section | Summary |
|---|---|---|---|---|---|---|
| F-01 | DEFECT | High | High | `docs/annexes/ANNEX_AH.md` | §AH8 | AH8 "complete" linkage table omits P-016, P-021, P-024, P-025, and patches P-029 through P-049 despite these being ACTIVE with annex references in Patch_Log |
| F-02 | DEFECT | Medium | High | `docs/governance/Patch_Log.md` | §P-013 heading | P-013 heading appears twice — anchor slug collision in reader (`#p-013-2` vs `#p-013`) |
| F-03 | DEFECT | Low | High | `docs/annexes/` | Sequence | ANNEX_AU is missing from the AT→AV sequence with no documentation in INDEX.md audit history |
| F-04 | DEFECT | Medium | High | `docs/governance/Patch_Log.md` | Patch numbers | P-007, P-010, P-028 are absent from the patch sequence with no documented retirement or merge explanation |
| F-05 | DEFECT | Low | High | `docs/governance/Threat_Register.md` | Threat numbers | T-003 absent as standalone entry; T-010/T-011 merged as single heading — no audit history note explaining T-003 absence |
| F-06 | DEFECT (mitigated) | Low | High | `docs/governance/Hardening_Queue.md` | Status labels | Uses DESIGNED/ACTIVE-UNPROVEN/ONGOING shorthand rather than canonical vocabulary; cross-reference note added but machine parsing via `status_for()` still reads non-canonical labels |
| F-07 | IMPROVEMENT | Low | High | `docs/PLAIN_LANGUAGE.md` | Corpus registration | File exists on disk but is not in CORE_DOCS and not reached by any glob — silently absent from reader corpus |
| F-08 | IMPROVEMENT | Low | High | `docs/review/2026-05-01-full-review.md` | Corpus registration | Full review document excluded from corpus and unlinked from any corpus doc — invisible to readers |
| F-09 | UNCERTAIN | Low | Medium | `docs/annexes/INDEX.md` | Audit history | E and F single-letter annex letters not mentioned in audit history — unclear if ever assigned |
| F-10 | UNCERTAIN | Medium | Medium | `docs/annexes/ANNEX_AH.md` | §AH8 | P-056 row in AH8 table (line 164) appears to have shifted columns — Threat/Patch/Status/Annex/Session headers don't align with row content |
| F-11 | IMPROVEMENT | Low | High | `docs/superpowers/plans/*.md` | Corpus exclusion | 6 plan files exist outside corpus; validator may parse their markdown links — risk of spurious validation errors if links use corpus-style paths |
| F-12 | DEFECT | Low | Low (UNCERTAIN) | `docs/governance/Patch_Log.md` | P-013 heading | AH8 note says "27 ACTIVE patches" but Patch_Log headings number into the 60s — counting methodology UNCERTAIN without running validate script |

---

## Recommendations for Later Phases

1. **Phase 2 (Linkage integrity):** Run `python3 scripts/validate_corpus.py` and collect full output. Use F-01 (AH8 gap) as primary investigation target — determine which session(s) added P-029 through P-049 and whether AH8 was intended to be updated.

2. **Phase 3 (Status vocabulary):** Audit every governance doc's inline status fields (top 20 lines, `**Status` pattern) using `status_for()` logic. Hardening_Queue is the known problem; check Claims_Evidence_Register and Threat_Resolution_Matrix for drift.

3. **Phase 2 also:** Investigate the P-056 row in AH8 (F-10) — the column layout appears broken, which may cause the validator's patch-linkage checks to miss or miscount it.

4. **Annex AU gap (F-03):** Phase 2 should grep all corpus docs for any reference to "Annex AU" or "ANNEX_AU" to confirm it is truly unreferenced before closing as a documentation gap vs. a missing file.

5. **P-013 duplicate heading (F-02):** Fix in Patch_Log.md — merge or retitle one of the two `### P-013` sections. This is a safe, targeted edit.

6. **P-007, P-010, P-028 gaps (F-04):** Add a "Retired / Never Assigned" note in Patch_Log similar to INDEX.md's annex merge history note. Even "never assigned" is useful documentation.

---

## Self-Review

| Dimension | Score (1–5) | Notes |
|---|---|---|
| Coverage | 4 | All directories reviewed. Individual annex content not read — gap noted. |
| Specificity | 4 | Findings cite exact file paths and line numbers where available. F-12 remains vague. |
| Evidence | 4 | All findings grounded in observed grep output or direct file reads. UNCERTAIN flags used where confirmation is missing. |
| Adversarial Depth | 3 | AH8 gap and P-013 duplicate are genuine structural risks. Did not attempt to trace whether the AH8 gap exposes missing annex files vs. merely missing table rows. |
| Actionability | 4 | Most findings have clear next steps. F-09 and F-12 require further investigation before action. |
| Overall | 4 | Solid structural map. Main limitation: no script execution, so linkage errors that only appear at corpus build time are not captured. |

### Repair Pass Needed

**Adversarial Depth scored 3 — below threshold.**

The following gaps in adversarial depth need Phase 2 attention:

1. AH8 gap (F-01) was detected at the table level but not traced to root cause — are the missing patches covered by different annexes, or does each have an annex reference that should appear in AH8 but doesn't? Phase 2 should read the P-029 through P-049 sections of Patch_Log to extract their annex references and verify those annexes exist on disk.

2. The founding/order glob in export_corpus.py picks up 5 files but also picks up `founding/order/README.md` — this README may not be a corpus document in the same sense as the other founding order docs. Phase 2 should confirm whether founding/order/README.md is intentionally in the corpus or should be excluded via an explicit filter.

3. No check was performed on whether any annex listed in INDEX.md's plain-language map (lines 20–26) links to an annex that is present in INDEX.md's annex list but not on disk. The confirmed file list shows 43 ANNEX_*.md files; INDEX.md references 43 annexes in its list sections (lines 30–75). Superficial counts match, but a line-by-line match was not performed for every annex ID.
