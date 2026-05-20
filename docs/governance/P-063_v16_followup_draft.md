# P-063 v16 Follow-Up — Deferred Should-Fixes (Tracking Note)

> **Status: Draft follow-up tracker only.**
> P-063 v15 is pushed at commit `11292a9`.
> P-063 remains draft-only / not corpus-registered / not published.
> These are non-blocking v16 should-fixes identified by the v15 narrow delta validator.
> Do not claim these items are adopted. Do not add P-063 to Patch_Log.md, ANNEX_D.md, INDEX.md, or corpus registration until reviewed and approved through the normal process.

---

## Scope

These items were surfaced by the v15 narrow delta validation pass (post-commit `11292a9`). All are rated should-fix; none are must-fix and none block the commit already pushed. They are definitional clarifications, not new moral architecture, and should be addressed together in a single v16 drafting pass.

No v14 or v15 closure is reopened by these items. R-1 and R-2 remain irreducible detection residuals, honestly documented. These items do not change that assessment.

---

## V16 should-fixes

### S-1 — Oracle D3 element (ii) safety-baseline gap

**Severity:** 5

**Clause:** §P-063.4(g) "Material change in working conditions" — element (ii) Safety degradation.

**Problem:** The current text compares safety conditions "relative to the conditions documented in the certified worker-band filing for the assessment year in which the worker was identified as anchor." The certified worker-band filing (§P-063.4(d)) tracks wage bands and headcount, not workstation safety conditions. In the common case, no safety-condition baseline exists in the certified filing, rendering element (ii) effectively unenforceable without a supplemental baseline source.

**Direction:** Extend the comparator to any contemporaneous employer record for the assessment year of anchor identification, including but not limited to OSHA logs, inspection reports, internal safety audits, or equivalent filings required by the applicable jurisdiction. Suggested language:

> *"relative to the conditions documented in the certified worker-band filing or, where safety conditions are not captured in the certified worker-band filing, in any contemporaneous employer record for the assessment year in which the worker was identified as anchor — including but not limited to OSHA logs, inspection reports, internal safety audits, or equivalent filings required by applicable jurisdiction."*

**Why not blocking:** Elements (i), (iii)–(vi), and the catchall (vi) of Oracle D3 remain fully operative. A worker protected by any of those elements is unaffected by this gap. S-1 closes a practical enforceability gap in one element, not a structural regression.

---

### S-2 — Labor L7 late-standing-filing timing gap

**Severity:** 4

**Clause:** §D6.9(i) "Worker and worker-organization participation in marker (v) rebuttal appeals (Labor L7)" — 21-day response period and 7-day status-confirmation deadline.

**Problem:** The current text provides that the appeal body shall confirm intervenor-of-right status within 7 days of a standing filing, but "no delay in status confirmation tolls the 21-day response period." If a worker-advocacy organization files for standing on day 16 of the 21-day window, the confirmation deadline runs to day 23, after the response period closes. The organization's practical participation window collapses to 4 days or less — potentially nullifying the standing right for organizations that discover the proceeding late in the notice window.

**Direction:** Where a standing filing is submitted with fewer than 7 days remaining in the response period, extend the response period to 7 days after the date confirmation issues. The extension should not delay any other participant's schedule. Suggested language to add after the existing sentence:

> *"Where a standing filing is submitted with fewer than 7 days remaining in the 21-day response period, the response period is extended to 7 days after the date confirmation issues; this extension applies only to the filing organization's response period and does not delay any other participant's submission schedule or the overall appeal timeline."*

---

### S-3 — Oracle E1 pending-appeal ambiguity

**Severity:** 4

**Clause:** §P-063.3(d)(ix) "Prior-year claimed extraction — definition (Oracle E1)" — definition of "(b) the oracle's final-determined prior-year extraction."

**Problem:** The current text does not specify whether "oracle's final-determined prior-year extraction" means (a) the oracle's initial determination, or (b) the post-appeal final determination. Where a holder has a pending §D6.9(i) appeal of the prior year's extraction determination, two oracles could apply different figures: one using the oracle's issued determination (pre-appeal); another waiting for the appeal to resolve. This divergence directly affects whether the aggregate-line backstop trigger is met.

**Direction:** Define "oracle's final-determined prior-year extraction" as the oracle's most recently issued binding determination as of the current filing date, whether or not that determination is currently under §D6.9(i) appeal. A pending appeal does not suspend (b)'s applicability. Suggested language to add:

> *"For purposes of clause (b), 'oracle's final-determined prior-year extraction' means the oracle's most recently issued binding determination as of the current filing date, whether or not that determination is currently under §D6.9(i) appeal; a pending appeal does not suspend clause (b)'s applicability. Where no oracle determination has been issued for the prior year, clause (b) is not available and the holder computes solely from clause (a)."*

---

### S-4 — Oracle C1 emergency-circumstances definition

**Severity:** 3

**Clause:** §P-063.3(d-limit)(2) "Four-element forum-equivalence test (Oracle C1)" — element (i) Notice exception for emergency circumstances.

**Problem:** The current text permits sub-14-day notice for "emergency circumstances documented by the forum" without defining what qualifies. A holder appealing a certification could argue that the forum's emergency documentation was insufficient, creating a contested zone on an element that is otherwise crisp and objective.

**Direction:** Enumerate qualifying emergency circumstances and exclude administrative convenience. Suggested language:

> *"Emergency circumstances are limited to: imminent risk to worker safety, unexpected workplace closure or cessation of business operations, or force majeure events beyond the forum's control. Ordinary administrative scheduling constraints, resource limitations, and procedural convenience do not constitute emergency circumstances for this purpose."*

---

### S-5 — Oracle C3 indirect financial relationship depth

**Severity:** 3

**Clause:** §P-063.3(d-limit)(2) "'Worker-advocacy organization' — standing definition (Oracle C3)" — element (ii) Independence.

**Problem:** The current text prohibits any "financial relationship, direct or indirect" between the worker-advocacy organization and any affected holder, but does not specify the depth of the indirect chain. An unlimited chain could sweep in legitimately independent organizations that share a common grantee or donor at three or more removes.

**Direction:** Cap the indirect chain at two degrees of financial intermediation. Suggested language to add after "regardless of their stated purpose":

> *"For purposes of this clause, 'indirect' financial relationship means a relationship within two degrees of financial intermediation — a payment from or to an entity that itself has a direct financial relationship with the affected holder. Common donors or common recipients at three or more degrees of separation are not a financial relationship for this purpose."*

---

### S-6 — Minimum-records functional-equivalent ambiguity

**Severity:** 3

**Clause:** §D6.9(e) "Minimum-records list (TSP industry-norm specification)" — category (c).

**Problem:** Category (c) requires "annual extraction computation workbooks — or their functional equivalent in a smaller enterprise." A smaller enterprise could characterize almost any internal document as a "functional equivalent," diluting the standard in the size tier most likely to argue it.

**Direction:** Define "functional equivalent" by its evidentiary sufficiency standard. Suggested language to add after "functional equivalent in a smaller enterprise":

> *"A 'functional equivalent' for this purpose means a document or set of documents sufficient for an independent accountant, without additional information from the holder, to reconstruct the §P-063.3(c) numerator and §P-063.4 denominator as reported for the assessment year."*

---

### S-7 — Tax C primary domicile undefined

**Severity:** 3

**Clause:** §P-063.3(d)(ix) "Aggregate-line backstop" — the 50×S dual-base cap, "S is the applicable jurisdictional living-wage benchmark for the holder's primary domicile."

**Problem:** "Primary domicile" is not defined in the patch. Where the holder's tax residence, place of incorporation, primary residence, and principal operating jurisdiction differ, two oracles could select different S values, producing different 50×S caps. A holder might also argue for a high-S domicile to obtain a larger aggregate tolerance.

**Direction:** Delegate to TSP with a binding default. Suggested language to add after "holder's primary domicile":

> *"For purposes of this clause, 'holder's primary domicile' means the holder's primary tax-residency jurisdiction as of the assessment year; where primary tax-residency cannot be established from filed records, the oracle uses the jurisdiction of the holder's principal residence. TSP specifies the determination methodology consistent with this definition and may establish tie-breaking rules for dual-residency situations."*

---

## Sequencing recommendation for v16

1. **S-1 first** — highest severity; closes a practical enforceability gap in Oracle D3 element (ii).
2. **S-2 and S-3 together** — both are procedural timing clarifications (Labor L7 and Oracle E1); adjacent in effect.
3. **S-4, S-5, S-6, S-7 as a cluster** — all severity 3 definitional hardenings; can land in one pass.

After v16 drafting, run a narrow delta validation pass on the seven items before considering push.

---

## What v16 must NOT do

- Reopen R-1 or R-2. They remain irreducible detection residuals, honestly documented.
- Weaken any v14 or v15 closure (Tier 1/Tier 2 100% worker routing; anti-parking L + τ ≤ 4.5; 3-in-7 aggregation; locked denominator; §D7.1 invariant; §P-063.3(d-limit) proportionality and non-totalization limits; Labor L7/L8 protections; Const A2 random-panel mechanism).
- Claim unqualified 10/10 closure. The honest ceiling remains: 10/10 on every drafting-closable issue at severity ≥5, plus two transparently-monitored detection residuals.
- Corpus-register P-063. Do not add to Patch_Log.md, ANNEX_D.md, INDEX.md, or export scripts without explicit user instruction and the review processes specified in CLAUDE.md and `.claude/rules/constitution-review.md`.
- Modify `docs/constitution/Humane_Constitution.md`, `docs/constitution/Acceptance_Protocol.md`, or `docs/constitution/INVARIANTS.md` without explicit user instruction and the Christ-centered ethical review per `.claude/rules/constitution-review.md`.

---

**Authored:** post-v15 narrow delta validator, commit `11292a9`, 2026-05-19.
**Tracking:** this note is the v16 work-list. Update only when v16 drafting begins or when additional items are surfaced.
