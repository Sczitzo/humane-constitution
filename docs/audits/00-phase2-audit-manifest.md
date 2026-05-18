# Phase 2 Audit Manifest

**Audit date:** 2026-05-15
**Auditor:** Claude Code corpus auditor (claude-sonnet-4-6)
**Branch:** claude/pedantic-spence-c4e730
**Phase:** 2 — Adversarial Stress-Test

---

## Phase 2 Scope

Phase 2 is an adversarial stress-test of the Humane Constitution corpus. Where Phase 1 asked "is the corpus structurally complete?", Phase 2 asks "how would a bad actor read this?" and "what does a rational exploiter do with the gaps Phase 1 found?"

Phase 2 does **not** remediate. It surfaces, classifies, and ranks exploitable weaknesses. Remediation is reserved for Phase 3.

**Deliverables (this phase):**
- `docs/audits/00-phase2-audit-manifest.md` — this file
- `docs/audits/05-loophole-audit.md` — loopholes, compliance exploits, and adversarial simulations

**Out of scope for Phase 2:**
- Fixing any source corpus file
- Modifying generated artifacts, scripts, or configuration
- Judgment on policy soundness beyond exploitability

---

## Audit Mode

**6 parallel subagents, one per report domain.**

| Domain | Report | Description |
|---|---|---|
| 1 | `05-loophole-audit.md` | Loopholes, compliance exploits, exception abuse, capture paths |
| 2 | `06-emergency-powers-audit.md` | Emergency/scarcity trigger abuse, Shared Storehouse capture |
| 3 | `07-ai-authority-audit.md` | AI/algorithmic authority creep, oracle capture |
| 4 | `08-rights-remedies-audit.md` | Rights without enforcement floors, nominal appeal paths |
| 5 | `09-governance-capture-audit.md` | Keyholder capture, FAP capture, founding coalition entrenchment |
| 6 | `10-adversarial-simulations.md` | End-to-end adversarial scenario walkthroughs |

This manifest covers domain 1 only; domains 2–6 are planned for Phase 2 continuation.

---

## Phase 1 Reports Reviewed

| Report file | Finding count | Critical/High findings used as Phase 2 input |
|---|---|---|
| `01-corpus-inventory.md` | 10 findings (P1-CI-001 through P1-CI-010) | P1-CI-001 (AH8 incomplete — auditor cannot verify compliance chain) |
| `02-traceability-audit.md` | 12 findings (P1-TR-001 through P1-TR-012) | P1-TR-001 (AZ2 gate document missing), P1-TR-011 (T-022 PROPOSED-only primary control) |
| `03-internal-consistency-audit.md` | 12 findings (P1-IC-001 through P1-IC-012) | P1-IC-001 (6 vs 18 month demurrage contradiction), P1-IC-007 (70% basket coverage gap), P1-IC-008 (hidden CIP precondition), P1-IC-011 (6-of-7 impossible removal threshold) |
| `04-terminology-audit.md` | 16 findings (P1-TF-001 through P1-TF-016) | P1-TF-001 (human dignity undefined), P1-TF-002 (Tier 1/2 overload), P1-TF-004 (emergency undefined), P1-TF-007 (qualified reviewer undefined), P1-TF-010 (public power undefined), P1-TF-015 (harm undefined) |
| `12-source-reference-audit.md` | 7 findings (P1-SR-001 through P1-SR-007) | P1-SR-004 (restricted annex existence unverifiable), P1-SR-005 (§ anchor validation false assurance) |

**Total Phase 1 findings:** 57
**Critical/High findings feeding Phase 2:** 14 priority items

### Phase 1 High-Priority Findings Index (for Phase 2 reference)

| ID | Severity | Summary (short) |
|---|---|---|
| P1-IC-001 | High | Demurrage safe harbor: 6 months (Constitution) vs 18 months (ANNEX_J) |
| P1-IC-007 | High | 70% founding-basket floor does not guarantee per-category CSM minimums |
| P1-IC-008 | High | Hidden CIP concurrent ratification requirement not in Constitution text |
| P1-IC-011 | High | CIP removal requires 6-of-7 Plenum vote; Plenum has 5 members — impossible |
| P1-TF-001 | Critical | "Human dignity" undefined beyond physical basket; non-physical violations unenforced |
| P1-TF-002 | Critical | "Tier 1"/"Tier 2" overloaded: three meanings active simultaneously |
| P1-TF-004 | High | "Emergency" has three different trigger standards, no master definition |
| P1-TF-007 | High | "Qualified independent review body" undefined; keyholders can block replacement |
| P1-TF-010 | High | "Public power" boundary undefined; separation invariant unenforceable |
| P1-TF-015 | Medium | "Harm" as enforcement trigger has no threshold or definition |
| P1-TR-001 | Critical | AZ2 (T0 token spec) is "to be drafted"; INV-LAUNCH-1 gate is unverifiable |
| P1-TR-011 | High | T-022 (electoral capture) has PROPOSED-only primary patch |
| P1-CI-001 | High | AH8 omits P-016, P-021, P-024, P-025, P-029–P-049; compliance chain incomplete |
| P1-SR-004 | High | P-021 depends on restricted annex; existence cannot be self-verified |

---

## Source Directories Reviewed (Phase 2)

| Directory | Files read |
|---|---|
| `docs/constitution/Humane_Constitution.md` | Full grep sampling, targeted line reads |
| `docs/constitution/INVARIANTS.md` | Full read |
| `docs/constitution/Acceptance_Protocol.md` | Targeted grep |
| `docs/annexes/ANNEX_U.md` | Full read (loophole-closing annex) |
| `docs/annexes/ANNEX_AB.md` | Targeted sections (§AB5 semantic anti-capture) |
| `docs/annexes/ANNEX_AF.md` | Targeted grep (grace/hardship rules) |
| `docs/annexes/ANNEX_AJ.md` | Full head read (above-ledger bypass examples) |
| `founding/commitments.md` | Targeted grep (soft language) |
| `founding/order/subsidiarity_rule.md` | Full head read |
| `docs/audits/00-phase1-findings-index.json` | Full read |
| `docs/audits/00-phase1-audit-manifest.md` | Full read |

---

## Generated Directories Excluded

| Path | Reason |
|---|---|
| `app/src/generated/corpus.ts` | Build artifact — not a source truth document |
| `app/public/generated/corpus.json` | Build artifact — not a source truth document |
| `app/node_modules/` | Package dependencies |
| `app/dist/` | Build output |

---

## Commands Run During This Audit (Read-Only Only)

| Command pattern | Purpose |
|---|---|
| `grep -n "..." file` | Pattern-targeted evidence gathering from source documents |
| `head -N file` | First-N-lines reading for large files |
| `ls directory/` | Directory structure enumeration |
| Read tool on specific files | Full or section reads of key corpus documents |
| `find docs/audits -type f` | Enumerate existing audit outputs |

No install, delete, format, upgrade, or destructive commands were run.
No corpus regeneration (`npm run generate:corpus`) was run.
No validation scripts (`python3 validate_corpus.py`) were run.

---

## Files Intentionally Skipped with Reasons

| File / Directory | Reason |
|---|---|
| `docs/annexes/ANNEX_AM.md` (full) | Phase 1 already documented CIP rules in detail; P1-IC-003, P1-IC-011 cover the critical gaps |
| `docs/annexes/ANNEX_AK.md` (full) | Identity tier architecture; addressed in P1-TF-002 (Tier overload); full read not needed for loophole domain |
| `docs/governance/Patch_Log.md` (full) | Phase 1 covered exhaustively; gaps already indexed |
| `docs/governance/Threat_Register.md` (full) | Phase 1 covered exhaustively; status staleness already indexed |
| `docs/simulations/` | Adversarial simulations planned for domain 6 (`10-adversarial-simulations.md`) |
| `docs/design/` | UI/UX artifacts; not governance source |
| `docs/superpowers/plans/` | Operational plans; not constitutional source |
| `architecture/` (full) | Implementation binding mechanics; not primary loophole domain for this report |
| `app/src/components/Dashboard.tsx` | Reader app code; not corpus source |

---

## Known Limitations

1. **No script execution.** `validate_corpus.py` was not run. Section anchor links (§AH8, §AM8.6) are referenced but not validated programmatically.
2. **Bash tool partial restriction.** Several pipeline commands (`cat ... | python3`) were denied; substituted with Read tool and targeted grep patterns.
3. **No restricted annex access.** P-021 depends on a restricted annex not in the public corpus. Its contents cannot be reviewed for loopholes.
4. **Sampling rather than exhaustive search.** Not every clause in every annex was read. Evidence is sufficient to establish findings at stated confidence levels but exploits requiring deep annex reading may remain undiscovered.
5. **No adversarial simulation execution.** End-to-end exploit simulations are planned for domain 6 and are not in this report.
6. **ANNEX_AZ §AZ2 content is "to be drafted."** One critical finding (the INV-LAUNCH-1 gate) depends on a document that does not yet exist; the exploit path is structural, not textual.

---

## Corpus Sharding Strategy

Phase 2 shards the corpus by **failure mode** rather than by document type:

| Shard | Report | Failure mode cluster | Key corpus loci |
|---|---|---|---|
| Loopholes | `05-loophole-audit.md` | Compliance exploits, exception abuse, rubber-stamping | HC Articles I–VI, ANNEX_U, ANNEX_AB, ANNEX_AJ, ANNEX_AF |
| Emergency powers | `06-emergency-powers-audit.md` | Scarcity trigger abuse, Shared Storehouse capture, emergency scope creep | HC Article III, ANNEX_Y, ANNEX_U §U8, FC-072, commitments.md |
| AI/algorithm authority | `07-ai-authority-audit.md` | Oracle capture, algorithmic governance creep, INV-011 automated execution | HC Article III §oracles, ANNEX_AL, ANNEX_AZ, INV-005, INV-011 |
| Rights and remedies | `08-rights-remedies-audit.md` | Nominal rights without enforcement floors, appeal without timeline | HC Article VIII, ANNEX_L §L5, TF-005, TF-006, TF-011 |
| Governance capture | `09-governance-capture-audit.md` | Keyholder capture, FAP capture, founding coalition entrenchment | HC Article I amendment, INVARIANTS INV-007, ANNEX_AM §AM8, Acceptance_Protocol |
| Adversarial simulations | `10-adversarial-simulations.md` | End-to-end scenario walkthroughs combining multiple shard findings | All |

---

## How Phase 3 Should Use Phase 2 Outputs

1. **Prioritize by exploit severity, not finding count.** The loophole audit's Findings Table ranks by severity and confidence; Phase 3 should address Critical/High/High-confidence items first.

2. **Treat finding IDs as stable references.** Phase 3 remediation proposals should cite Phase 2 finding IDs (e.g., L-001, L-002) so the repair-to-finding link is auditable.

3. **Apply the minimal-fix constraint.** Each Phase 2 finding includes a "Minimal fix shape" field. Phase 3 should not exceed the minimal fix without documenting why a larger change is necessary — the corpus contracts require small, reversible diffs.

4. **Check for cross-shard compound exploits.** Some loopholes in `05-loophole-audit.md` are only critical when combined with governance-capture findings in `09-governance-capture-audit.md`. Phase 3 should treat the compound cases as highest priority.

5. **Verify fixes against Phase 1 structural findings.** Any Phase 3 patch that touches AH8, Patch_Log.md, or Threat_Register.md must also resolve the relevant Phase 1 structural defects (P1-CI-001, P1-TR-003, P1-IC-011) in the same commit.

6. **Do not confuse DEFECT with IMPROVEMENT.** Phase 2 reports use the same type taxonomy as Phase 1. DEFECT = something broken that enables exploitation. IMPROVEMENT = something that would raise resilience but is not currently exploitable. Phase 3 must address all Critical/High DEFECTs before touching any IMPROVEMENT.

7. **Re-run `validate_corpus.py` after every Phase 3 patch** to confirm no link integrity regressions.

8. **Run `npm run generate:corpus` after every markdown change** per CLAUDE.md requirements.
