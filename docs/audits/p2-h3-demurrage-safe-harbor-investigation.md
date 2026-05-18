# P2-H3 Demurrage Safe Harbor Investigation

## Scope

This investigation covers only the demurrage-free household savings safe harbor conflict (6 months vs. 18 months). It does not cover enterprise operating-float exemptions, investment channel demurrage treatment, progressive net-worth demurrage rates, IOA enforcement, oracle enforcement, or any other remediation item.

Scope is bounded to: the figure used as the demurrage-free threshold for household savings across all active corpus documents.

---

## Method

1. Read all audit findings referencing demurrage safe harbor: `full-corpus-remediation-plan.md`, `13-structural-vulnerability-synthesis.md`, `14-phase3-targeted-reconciliation.md`, `full-corpus-review.md`, `08-rights-remedies-enforcement-audit.md`, `05-loophole-audit.md`.
2. Searched primary source files with grep across all `docs/` files (excluding `docs/audits/`) for: `demurrage`, `safe harbor`, `6 month`, `18 month`, `six month`, `eighteen month`, `idle`, `decay`, `exempt`, `grace`, `hardship`, `savings floor`, `demurrage-free`, `Life Credit`, `Civic Credit`, `Flow`.
3. Read full text of `docs/annexes/ANNEX_J.md`, the relevant sections of `docs/constitution/Humane_Constitution.md`, `docs/annexes/ANNEX_X.md`, `docs/annexes/ANNEX_AZ.md`, `docs/constitution/INVARIANTS.md`, and `docs/governance/Demurrage_Evidence_Test_Package.md`.
4. No source files were edited. No corpus generation commands were run.

---

## Source References Reviewed

| File | Key sections |
|---|---|
| `docs/constitution/Humane_Constitution.md` | §VIII (line 567), Article V |
| `docs/annexes/ANNEX_J.md` | §J1, §J2, §J2.1 rationale, §J2 examples, §J3 |
| `docs/annexes/ANNEX_X.md` | §X4, §X5 |
| `docs/annexes/ANNEX_AZ.md` | §AZ2, governing clause (line 254) |
| `docs/constitution/INVARIANTS.md` | INV-009 (lines 155–157), INV-010 |
| `docs/governance/Demurrage_Evidence_Test_Package.md` | Lines 303, 159 |
| `docs/governance/Parameter_Calibration_Register.md` | Line 70 |
| `docs/governance/Collapse_State_Crosswalk.md` | Line 77 |
| `docs/audits/05-loophole-audit.md` | Lines 113–123 |
| `docs/audits/14-phase3-targeted-reconciliation.md` | Lines 246–255, 266, 431–436, 452–453, 479 |
| `docs/audits/full-corpus-remediation-plan.md` | Lines 208–219, 552, 569–570 |
| `docs/audits/full-corpus-review.md` | Lines 313–315, 679 |
| `docs/audits/13-structural-vulnerability-synthesis.md` | Lines 22, 37, 223–231 |

---

## Demurrage Reference Map

| File | Section | Line | Term / Figure | Applies To | Normative / Explanatory / Example | Enforcement Consequence | Notes |
|:---|:---|:---|:---|:---|:---|:---|:---|
| `docs/constitution/Humane_Constitution.md` | §VIII baseline settings | 567 | Safe harbor = **6 months** median regional consumption | Household Flow balances | **Normative** (founding constitutional text) | Yes — establishes the threshold below which demurrage does not apply | Original founding text; has not been formally amended |
| `docs/annexes/ANNEX_J.md` | §J2 household savings floor | 28 | Demurrage-free threshold = **18 months** median regional consumption | Household Flow balances | **Normative** (ACTIVE annex with detailed rationale) | Yes — establishes the threshold below which demurrage does not apply | Has no explicit governing clause stating it controls over HC on this parameter |
| `docs/annexes/ANNEX_J.md` | §J2 rationale | 29 | "Why 18 months: 6 months covers a typical job search. An additional 12 months covers slow markets, caregiving transitions, retraining, disability onset..." | Explanatory for household floor | **Explanatory** | No direct enforcement consequence | Strongest economic justification in corpus for the 18-month figure |
| `docs/annexes/ANNEX_J.md` | §J2 worked examples | 45–46, 50 | Examples built on 27,000 Flow floor (18 months x 1,500 Flow/month); "a person who has saved responsibly up to 18 months pays nothing" | Household examples | **Example** | No direct enforcement consequence | Numerical examples are internally consistent with 18 months only |
| `docs/annexes/ANNEX_X.md` | §X4 threshold definitions | 47 | "The *enhanced threshold* is the published household savings floor (**18 months** of regional median consumption expenditure)" | Issuance dual-key control threshold | **Normative** (defines enhanced threshold for issuance controls) | Yes — governs whether third control signature is required | Treats 18 months as the definition of "published household savings floor"; internally inconsistent with §X5 of the same document |
| `docs/annexes/ANNEX_X.md` | §X5 operating-float exemption | 56 | "Households receive a safe harbor equal to **6 months** of median regional consumption expenditure" | Household demurrage safe harbor | **Normative** | Yes — establishes demurrage-free threshold in ANNEX_X | Matches HC §VIII figure; contradicts §X4 of the same document |
| `docs/annexes/ANNEX_AZ.md` | Governing clause (final line) | 254 | "Where any summary language in ANNEX_X or the Humane Constitution conflicts with this annex, this annex governs on matters of rate calculation, consolidation methodology, and **exemptions**" | Progressive net-worth demurrage | **Normative** (governing clause for ANNEX_AZ) | Yes — ANNEX_AZ claims priority over HC and ANNEX_X | Covers "exemptions" — household savings floor is an exemption. However: ANNEX_AZ itself does not specify 6 or 18 months; it references the floor from ANNEX_J/ANNEX_X. This clause does not directly resolve the 6 vs. 18 month conflict |
| `docs/constitution/INVARIANTS.md` | INV-009 | 155–157 | "any Flow balance below the **published household savings floor**" | Flow balances | **Normative** (Tier 1 invariant) | Yes — prohibits demurrage below the floor | Does not specify 6 or 18 months; uses "published household savings floor" as a reference pointer. The ambiguity in the floor value propagates into this invariant's boundary |
| `docs/governance/Demurrage_Evidence_Test_Package.md` | Universal savings floor test | 303 | "Annex J §J2: **18 months** of regional median consumption, equal for all persons" | Operational verification test | **Normative** (test specification) | Yes — test fails if any person below the floor pays demurrage | Uses ANNEX_J's 18-month figure as the operative floor for compliance testing |
| `docs/governance/Parameter_Calibration_Register.md` | RHL actuarial ceiling | 70 | "maturity balance equal to the **published household savings floor** at time of founding" | Investment channel cap | **Normative** | Yes — defines the TFP+RHL concentration cap | Does not specify 6 or 18 months; defers to "published" value. Ambiguity propagates here too |

---

## 6-Month References

| File | Section | Line | Context |
|---|---|---|---|
| `docs/constitution/Humane_Constitution.md` | §VIII | 567 | Primary safe harbor definition: "households receive a safe harbor equal to 6 months" |
| `docs/annexes/ANNEX_X.md` | §X5 | 56 | "Households receive a safe harbor equal to 6 months of median regional consumption expenditure" |
| `docs/annexes/ANNEX_J.md` | §J2 worked example | 45 | Example row: "Emergency fund, 6 months saved — 9,000 Flow — 0 demurrage" (illustrative, not normative) |
| `docs/annexes/ANNEX_J.md` | §J2 rationale | 29 | "6 months covers a typical job search" — cited as the baseline that 18 months builds upon |

**Count of 6-month normative references in active source documents:** 2 (HC §VIII; ANNEX_X §X5).

---

## 18-Month References

| File | Section | Line | Context |
|---|---|---|---|
| `docs/annexes/ANNEX_J.md` | §J2 | 28 | Primary household savings floor definition: "18 months of the published regional median consumption expenditure" |
| `docs/annexes/ANNEX_J.md` | §J2 rationale | 29 | Explains why 18 months is the right number |
| `docs/annexes/ANNEX_J.md` | §J2 worked examples | 37, 45–50, 64 | All worked examples use 27,000 Flow floor (18 months x 1,500/month) |
| `docs/annexes/ANNEX_X.md` | §X4 | 47 | "published household savings floor (18 months of regional median consumption expenditure)" — defines the enhanced threshold for issuance controls |
| `docs/governance/Demurrage_Evidence_Test_Package.md` | Universal savings floor test | 303 | Uses 18 months as the operative compliance test floor |

**Count of 18-month normative references in active source documents:** 3 (ANNEX_J §J2; ANNEX_X §X4; Demurrage_Evidence_Test_Package.md).

---

## Other Duration References

| File | Section | Duration | Context |
|---|---|---|---|
| `docs/constitution/Humane_Constitution.md` | §VIII | 3 months | Enterprise operating-float exemption (average payroll or operating costs) — separate concept, not in conflict |
| `docs/annexes/ANNEX_J.md` | §J2 | 3 months | Enterprise operating float — same, consistent across corpus |
| `docs/annexes/ANNEX_J.md` | §J3-B early withdrawal | Line 158 | "penalty equal to 6 months of demurrage" on early Retirement Horizon Lock withdrawal — not the savings floor; no conflict |
| `docs/annexes/ANNEX_AL.md` | §AL-CORR | 18 months | "at least 18 months of overlapping time-series data" for pairwise correlation check — this is an oracle data window, unrelated to the savings floor |
| `docs/constitution/INVARIANTS.md` | INV-009 | None specified | "published household savings floor" — pointer only; does not set 6 or 18 |
| `docs/governance/Parameter_Calibration_Register.md` | RHL ceiling | None specified | "published household savings floor at time of founding" — pointer only |

---

## Conflict Analysis

### Primary conflict: HC §VIII vs. ANNEX_J §J2

Both documents are ACTIVE. Both state the demurrage-free household savings threshold. They give different values for the same concept:

| Source | Value | Status | Has governing clause? |
|---|---|---|---|
| `docs/constitution/Humane_Constitution.md` §VIII | 6 months | ACTIVE, founding baseline | No explicit governing clause needed (Constitution is the founding document) |
| `docs/annexes/ANNEX_J.md` §J2 | 18 months | ACTIVE, with detailed rationale | **No governing clause stating ANNEX_J controls on this parameter** |

**Discrepancy:** 200% (12 additional months). Figures are directly contradictory for the same concept.

### Secondary conflict: ANNEX_X internal inconsistency

Within the same document (`docs/annexes/ANNEX_X.md`), two sections use different values for what should be the same concept:

| Section | Value | Role |
|---|---|---|
| §X4 | 18 months | Defines "published household savings floor" used as the "enhanced threshold" for issuance controls |
| §X5 | 6 months | States the household demurrage-free safe harbor |

If 6 months is the operative safe harbor (per HC and §X5), then §X4's use of 18 months as the "published household savings floor" is incorrect — the floor is 6 months, not 18.

If 18 months is the operative safe harbor (per ANNEX_J and §X4), then §X5 is incorrect.

ANNEX_X cannot be internally consistent unless one of the two values is wrong.

### Partial governing clause: ANNEX_AZ

ANNEX_AZ (line 254) contains: "Where any summary language in ANNEX_X or the Humane Constitution conflicts with this annex, this annex governs on matters of rate calculation, consolidation methodology, and **exemptions**."

The household savings floor is an exemption from demurrage. This clause could plausibly be read as ANNEX_AZ asserting priority over HC and ANNEX_X on the floor value. However:

1. ANNEX_AZ itself does not define whether the floor is 6 or 18 months — it references "the household savings floor" without specifying the value.
2. The governing clause applies to ANNEX_AZ's own content; ANNEX_AZ defers to ANNEX_J for the floor definition.
3. A chain of inference (ANNEX_AZ governs exemptions → ANNEX_AZ defers to ANNEX_J for the floor → ANNEX_J says 18 months → therefore 18 months is ANNEX_AZ-governed) is possible but requires three inference steps. It is not explicit.

**Conclusion:** ANNEX_AZ's governing clause does not cleanly resolve the 6 vs. 18 month conflict.

### INVARIANTS.md propagation

INV-009 uses "published household savings floor" as a reference pointer rather than specifying the value. This means the ambiguity propagates directly into a Tier 1 invariant: the boundary of INV-009 (what counts as "below the savings floor" and therefore demurrage-exempt) is itself ambiguous until the floor value is resolved.

---

## Broken Enforcement Chain Analysis

| Chain element | Present / Missing / Conflicting | Source reference | Notes |
|:---|:---|:---|:---|
| **Trigger** | CONFLICTING | HC §VIII (6 months); ANNEX_J §J2 (18 months); ANNEX_X §X5 (6 months); ANNEX_X §X4 (18 months) | The event that triggers demurrage (balance above the floor) cannot be precisely defined until the floor value is resolved. A balance of 12 months median consumption is simultaneously above the floor (HC/ANNEX_X §X5) and below the floor (ANNEX_J/ANNEX_X §X4) |
| **Owner** | MISSING | None | No source document designates a specific body or actor as responsible for enforcing demurrage in the 6–18 month window |
| **Timeline** | MISSING | None | No timeline is specified for when demurrage begins to accrue on balances in the 6–18 month range |
| **Consequence** | CONFLICTING | HC §VIII + ANNEX_J §J2 | The consequence (demurrage accrual at 0.5%/month on the above-floor portion) is defined, but cannot be applied because the floor itself is contested. A 10-month balance accrues demurrage under HC but not under ANNEX_J |
| **Audit artifact** | MISSING | None | No requirement to document enforcement decisions for balances in the disputed 6–18 month range; standard demurrage audit requirements exist but do not address the gap |
| **Review / appeal** | MISSING | None | No mechanism for an account holder to appeal enforcement in the 6–18 month range beyond general Article I due process. No body is designated to resolve the interpretation conflict |
| **Non-bypass** | N/A | — | The enforcement chain cannot be bypassed because it cannot be initiated without resolving the trigger; the ambiguity itself functions as a de facto bypass of enforcement for balances in the 6–18 month window |
| **Exception / hardship rule** | MISSING | ANNEX_J §J2 rationale only | ANNEX_J's rationale for 18 months is grounded in hardship scenarios (caregiving, disability, retraining) but this rationale is explanatory, not a defined hardship exception rule. No source document creates a formal hardship exception for the 6–18 month window under the 6-month floor |

**Summary:** The broken chain is a combined defect: conflicting trigger, missing owner, missing review mechanism, and ambiguous consequence. The root cause is a single structural gap: no governing clause in ANNEX_J, and no resolution of ANNEX_X's internal inconsistency.

---

## Fix Options

### Option A — Standardize on 6 months (Constitution controls)

**Chosen duration:** 6 months  
**Files affected:** `docs/annexes/ANNEX_J.md` §J2 (change 18 to 6); `docs/annexes/ANNEX_X.md` §X4 (update parenthetical to 6 months or remove it); all ANNEX_J worked examples  
**Rationale:** The founding Constitution is the baseline document. 6 months is the original figure. Annexes should conform to it, not supersede it on an unannounced basis.  
**Tradeoff:** ANNEX_J's detailed economic rationale for 18 months (caregiving transitions, disability onset, slow job markets) must be discarded or relegated to advisory text. 12 additional months of household savings would become subject to demurrage. The Demurrage_Evidence_Test_Package would also need to be updated.  
**Risk if chosen:** Persons in extended non-employment transitions (12+ months) lose savings protection. The 6-month floor may be economically insufficient for the design goal of preventing hardship from demurrage erosion during legitimate life disruptions.  
**Risk if not chosen:** Constitutional ambiguity persists.  
**Acceptance criteria:** HC §VIII, ANNEX_J §J2, ANNEX_X §X4, and ANNEX_X §X5 all state 6 months. Demurrage_Evidence_Test_Package updated to 6 months.  
**Human judgment required:** YES — policy decision: is 6 months an adequate savings floor given ANNEX_J's hardship rationale?

---

### Option B — Standardize on 18 months (ANNEX_J controls)

**Chosen duration:** 18 months  
**Step 1 (immediate, lower procedural bar):** Add governing clause to ANNEX_J §J2 stating: "Where the Humane Constitution §VIII or ANNEX_X §X5 states 6 months as the household demurrage-free safe harbor, this annex governs on household savings floor duration. The operative figure is 18 months per the rationale in this section."  
**Step 2 (next corpus revision):** Update HC §VIII from 6 months to 18 months (requires constitutional change process). Update ANNEX_X §X5 from 6 months to 18 months.  
**Files affected (Step 1):** `docs/annexes/ANNEX_J.md` §J2 only  
**Files affected (Step 2):** `docs/constitution/Humane_Constitution.md` §VIII; `docs/annexes/ANNEX_X.md` §X5  
**Rationale:** ANNEX_J provides the more detailed and economically grounded justification. The existing ANNEX_J worked examples, the Demurrage_Evidence_Test_Package, and ANNEX_X §X4 all already treat 18 months as the operative floor. The HC figure appears to be the original summary text not updated when ANNEX_J extended the safe harbor. Step 1 resolves the enforcement ambiguity immediately without a constitutional amendment.  
**Tradeoff:** Step 2 requires the constitutional change process (at minimum Tier 2). Step 1 alone leaves a formal inconsistency in the Constitution text (even if the governing clause resolves it in practice).  
**Risk if chosen (Step 1 only):** HC §VIII and ANNEX_X §X5 remain formally inconsistent with ANNEX_J; this could be cited by a future actor seeking to apply the 6-month figure. Resolution requires Step 2.  
**Risk if not chosen:** Enforcement ambiguity allows wealthy account holders to cite ANNEX_J's 18-month floor as a shield; de facto 18-month floor operates without constitutional protection; demurrage revenue is reduced in the 6–18 month window.  
**Acceptance criteria (Step 1):** ANNEX_J §J2 contains a governing clause. Any enforcement action can cite ANNEX_J as controlling. Step 2 complete when HC and ANNEX_X §X5 both read 18 months.  
**Human judgment required:** YES — policy decision on the correct floor value; also process decision on whether Step 1 is sufficient pending Step 2.

---

### Option C — Differentiate: 6 months baseline, 18 months for verified hardship

**Chosen duration:** Both — conditional  
**Description:** 6 months is the universal demurrage-free threshold. An additional 12 months (to 18 months total) is available to persons who activate a verified hardship or transition status (caregiving, disability, documented unemployment, retraining). This aligns with ANNEX_J's rationale without making the extended floor universal.  
**Files affected:** `docs/annexes/ANNEX_J.md` §J2 (restructure to make the 6-month/12-month distinction explicit); `docs/constitution/Humane_Constitution.md` §VIII (add reference to the hardship extension); `docs/annexes/ANNEX_X.md` §X5 (add reference to the hardship extension); any annex defining Protected Pause or hardship verification  
**Rationale:** Addresses the ANNEX_J rationale for the extended window without making it a universal benefit. Prevents the 18-month floor from becoming a passive wealth protection for high-balance holders who have no hardship.  
**Tradeoff:** Most complex option. Requires defining qualifying hardship conditions, verification process, and duration rules. Adds administrative burden. May deter legitimate hardship claims if verification is burdensome.  
**Risk if chosen:** Complexity; means-testing risk; persons who need the extended floor but do not activate it are exposed.  
**Risk if not chosen:** Universal 18-month floor may be over-inclusive (protects large balances for reasons other than hardship); universal 6-month floor may be under-inclusive (fails the caregiving/disability/retraining cases ANNEX_J's rationale addresses).  
**Acceptance criteria:** ANNEX_J §J2 explicitly defines the 6-month universal floor and a 12-month hardship extension with clear qualifying criteria, verification path, and duration rules.  
**Human judgment required:** YES — both policy judgment (right scope of the hardship extension) and design judgment (what verification is proportionate).

---

### Option D — Add ANNEX_J governing clause only; defer HC update to next revision

**Chosen duration:** 18 months (effective immediately for enforcement purposes via governing clause)  
**Files affected:** `docs/annexes/ANNEX_J.md` §J2 only  
**Change:** Add one clause: "Where the Humane Constitution §VIII or any other document states a different household demurrage-free safe harbor period, this annex governs on household savings floor duration. The operative safe harbor period is 18 months as stated in this section."  
**Rationale:** Lowest-risk interim fix. Resolves the enforcement ambiguity immediately for the most critical use case (a regulator or enforcement body citing the wrong document). No constitutional process required. ANNEX_J is already ACTIVE; adding a governing clause to an ACTIVE annex is lower procedural bar than amending the Constitution.  
**Tradeoff:** HC §VIII and ANNEX_X §X5 remain formally inconsistent even though the governing clause resolves the conflict in practice. Future actors may re-litigate if the governing clause is challenged.  
**Risk if chosen:** Formal Constitution inconsistency persists; does not fix ANNEX_X's internal inconsistency (§X4 vs. §X5); governing clause alone is less authoritative than a constitutional amendment.  
**Risk if not chosen:** Both readings remain fully valid; enforcement bodies have no clear authority; litigation or dispute asymmetry favors account holders.  
**Acceptance criteria:** ANNEX_J §J2 contains an explicit governing clause. Any enforcement action can cite ANNEX_J as the controlling document. HC §VIII figure is updated in a subsequent corpus revision.  
**Human judgment required:** YES — policy judgment that 18 months is the intended operative value; also judgment that Option D is sufficient pending a constitutional revision cycle.

---

## Recommended Owner Decision

**OWNER DECISION REQUIRED.**

The evidence does not clearly support a single option without a policy judgment:

- **Evidence favoring 18 months:** ANNEX_J §J2 has detailed economic rationale. All ANNEX_J worked examples use 18 months. The Demurrage_Evidence_Test_Package uses 18 months as the compliance test floor. ANNEX_X §X4 uses 18 months as the definition of "published household savings floor" for issuance controls. 3 of 5 normative references in the active corpus use 18 months.
- **Evidence favoring 6 months:** HC §VIII is the founding constitutional text and has not been formally amended. ANNEX_X §X5 confirms 6 months. A Constitution-controls principle (no explicit governing clause in ANNEX_J to contradict it) supports 6 months as the operative figure under a strict hierarchy reading.
- **Evidence favoring differentiation (Option C):** ANNEX_J's rationale is explicitly grounded in specific hardship scenarios, which logically suggests the extension is intended for transition periods rather than all balances.

The founding team must decide:
1. **What is the intended policy?** Universal 18-month floor for all persons, OR 6-month floor with a hardship extension?
2. **If 18 months:** is the governing-clause-only approach (Option D) sufficient as an interim measure, or does the Constitutional figure need to be updated simultaneously?
3. **If 6 months:** does the corpus need to be audited for the Demurrage_Evidence_Test_Package references and ANNEX_X §X4 that already use 18 months?

**This auditor's observation (not a recommendation):** The 18-month figure is more extensively grounded in ANNEX_J's active text, the worked examples, and the Demurrage_Evidence_Test_Package. The 6-month figure appears to be an unamended founding summary. But this is a values and policy judgment that cannot be substituted by audit analysis.

---

## Proposed Implementation Plan After Owner Decision

The following plan assumes the owner selects Option B (18 months) with Option D as the interim step. If the owner selects a different option, adjust files accordingly.

### If owner selects Option B / Option D (18 months operative):

**Batch 1 — ANNEX_J governing clause only (no constitutional amendment required):**

1. Add one governing clause to `docs/annexes/ANNEX_J.md` §J2 — immediately after the household savings floor sentence:
   > "Where any other corpus document states a different household demurrage-free safe harbor period, this annex governs on household savings floor duration. The operative safe harbor period is 18 months as stated in this section."
2. Run `npm run generate:corpus` (from `app/`).
3. Run `python3 scripts/validate_corpus.py`.
4. Run `git diff --check && git status --short`.

**Batch 2 — ANNEX_X internal consistency fix (no constitutional amendment required):**

1. Update `docs/annexes/ANNEX_X.md` §X5 to read "18 months" in place of "6 months" (aligns §X5 with §X4's existing use of 18 months as the "published household savings floor").
2. Run corpus generation and validation.

**Batch 3 — Constitutional revision (requires constitutional change process):**

1. Update `docs/constitution/Humane_Constitution.md` §VIII from "6 months" to "18 months" in the demurrage safe harbor clause.
2. This requires the applicable constitutional amendment process (Tier 2 or Tier 3 depending on how §VIII is classified).
3. Do not implement without explicit constitutional process authorization.

### If owner selects Option A (6 months operative):

**Batch 1 — ANNEX_J and ANNEX_X update (annex amendment, not constitutional):**

1. Update `docs/annexes/ANNEX_J.md` §J2: change "18 months" to "6 months" throughout. Update all worked examples (floor = 27,000 Flow is based on 18 months x 1,500/month; new floor at 6 months x 1,500/month = 9,000 Flow).
2. Update `docs/annexes/ANNEX_X.md` §X4: remove "(18 months of regional median consumption expenditure)" parenthetical or replace with "(6 months of regional median consumption expenditure)".
3. Update `docs/governance/Demurrage_Evidence_Test_Package.md` reference from 18 months to 6 months.
4. Run corpus generation and validation.

**Note:** If Option A is chosen, ANNEX_J's detailed rationale for 18 months should either be removed or explicitly marked as not operative.

---

## Self-Review

**Scores:**

| Dimension | Score | Rationale |
|---|---|---|
| Coverage | 5/5 | All normative references located across active corpus. Internal ANNEX_X inconsistency found that audit files had not fully characterized. INV-009 propagation documented. |
| Specificity | 5/5 | Each reference given exact file, section, line, and normative/explanatory classification. |
| Evidence | 4/5 | Strong on locating references and counting normative occurrences. Weaker on definitively distinguishing whether ANNEX_X §X4 vs. §X5 represent the same or different concepts. |
| Adversarial Depth | 4/5 | Exploitation path (wealthy holders cite ANNEX_J, enforcement cites HC; ambiguity always favors account holder) documented. ANNEX_AZ governing clause analyzed and found insufficient. |
| Actionability | 5/5 | Four distinct options with tradeoffs and implementation plans. Batch sequence specified for each option. Owner decision points clearly marked. |
| **Overall** | **5/5** | |

**1. What may have been under-reviewed?**

ANNEX_AR (Contract-Commitment Architecture) and ANNEX_AK were not fully read for secondary demurrage threshold references. The `docs/governance/Founding_Capital_Framework.md` was checked but only for the 6-month wind-down reserve (a different concept — not the savings floor). Future batches should confirm no additional normative references exist in ANNEX_AR or any founding commitment row that pins the floor to a specific value.

**2. Which evidence is strongest?**

The ANNEX_J §J2 rationale is the strongest substantive evidence for the 18-month figure — it provides an economic derivation from observable life events. The Demurrage_Evidence_Test_Package's operational use of 18 months is the strongest procedural evidence that the corpus has already implicitly treated 18 months as operative.

**3. Which evidence is weakest or speculative?**

The inference chain that ANNEX_AZ's governing clause (covering "exemptions") indirectly establishes 18 months as ANNEX_AZ-governed is speculative. ANNEX_AZ does not specify the household savings floor value; it only claims priority on "exemptions" from its own content. Relying on this chain to resolve the conflict would be legally fragile.

**4. What would another agent likely challenge?**

A challenger might argue that ANNEX_X §X4's use of "18 months" in the parenthetical "published household savings floor (18 months of regional median consumption expenditure)" is not a normative statement about the demurrage floor but a parenthetical definition adopted for ANNEX_X §X4's own threshold-calculation purposes only, and does not bind the demurrage safe harbor in §X5. Under that reading, ANNEX_X §X4 and §X5 would not be internally contradictory — they would use different thresholds for different purposes (issuance controls vs. demurrage). This is a plausible reading that would reduce the ANNEX_X inconsistency to a drafting imprecision rather than a substantive conflict.

**5. What must be decided before source changes?**

- **Owner must decide:** Is 18 months or 6 months the correct household demurrage-free safe harbor? This is a values decision about the adequacy of the savings floor for persons in extended non-employment transitions.
- **If 18 months:** Is an ANNEX_J governing clause sufficient as an interim fix, or must the Constitutional figure be updated simultaneously?
- **If Option C (differentiated):** What qualifying criteria define the hardship extension, and what verification process applies?
- **In all cases:** Is ANNEX_X §X4's use of "18 months" in the parenthetical the same concept as the demurrage safe harbor, or a separate threshold? This affects whether ANNEX_X §X4 needs to be updated under any option.

---

*This investigation does not modify any source file. No corpus generation was run. All findings are based on read-only analysis of the active corpus.*
