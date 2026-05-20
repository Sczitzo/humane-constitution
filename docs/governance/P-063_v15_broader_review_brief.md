# P-063 v15 — Broader Review Brief

> **This brief is explanatory, not operative.**
> P-063 v15 is **draft-only / not corpus-registered / not published / not adopted into ANNEX_D**.
> It is ready for broader human review. Do not add to Patch_Log.md, ANNEX_D.md, INDEX.md, or corpus registration based on this brief alone.
> The operative patch text is in `docs/governance/P-063_draft.md`. Where this brief and the operative text conflict, the operative text controls.

---

## 0. How to read this package

The full review package consists of these files. Read in this order, going as deep as your reviewer role requires:

| # | File | Purpose | Note |
|---|---|---|---|
| 1 | `P-063_v15_executive_summary.md` | Plain-language entry point — start here | New |
| 2 | `P-063_v15_broader_review_brief.md` | Full reviewer guide — this document | |
| 3 | `P-063_v15_glossary.md` | Plain-language definitions for all technical terms | New |
| 4 | `P-063_draft.md` | Operative patch text (commit `11292a9`) | |
| 5 | `Christ_Centered_Evaluation.md`, Session 6 | Christ-centered theological evaluation | **Evaluated v14, not v15.** Remains relevant; does not cover the v15 should-fix integrations (Labor L7/L8, Oracle D3, Const A2, Tax C, Oracle C1/C3/E1) |
| 6 | `P-063_v14_vignette_stress_test.md` | Fruit-test against concrete human cases | **Evaluated v14, not v15.** Remains relevant for the vignettes it covers; does not cover v15 additions |
| 7 | `P-063_v16_followup_draft.md` | Seven non-blocking v16 refinements | Read if you want to know what is already tracked |
| 8 | `P-063_v15_reviewer_response_form.md` | Structured form for submitting findings | New — use when submitting your review |

---

## 1. What is P-063 and why does it exist?

The Humane Constitution's productive-use exemption (§D6.2(d)) allows enterprises that productively deploy assets to exclude those assets from demurrage assessment. Without further conditions, this exemption could shelter holdings that grow extremely concentrated while paying workers poverty wages — treating "productive" as a formal label rather than a substantive reality. P-063 adds a pay-ratio disqualification: if a holder's personal extraction exceeds a calibrated multiple of the compensation of their lowest-paid worker, the enterprise loses a proportional share of the productive-use exclusion. The patch does not cap wages, impose a maximum income, or regulate compensation as such; it adjusts the scope of a constitutional exemption based on the ratio between what the holder takes and what the lowest-paid worker receives.

P-063 remains draft-only because it is a significant addition to constitutional infrastructure that has not yet been tested against real enterprises, has not undergone broader human review beyond structured red-team panels, and carries two acknowledged detection residuals (R-1 and R-2, described below) that no drafting change can fully close. The patch should not be adopted until there is broader confidence in its calibration, its oracle implementation, and its practical effects on small enterprises and worker behavior.

---

## 2. Core mechanism summary

### Productive-use exemption narrowing
The §D6.2(d) exclusion is conditioned on maintaining an extraction ratio R at or below calibrated bounds. If R exceeds the lower bound L, the holder loses a proportional share of the exclusion (not the full exclusion — disqualification is graduated). If R reaches or exceeds the upper bound U, the holder loses the exclusion entirely until compliance is restored.

### Extraction ratio R
R is the **highest of** (i) the current assessment year's ratio, (ii) the 3-year rolling average, and (iii) the 7-year cumulative ratio. This multi-window construction prevents multi-year extraction programs from diluting a single-year test. The annual ratio is total personal extraction ÷ the lowest-paid worker's annual cash compensation. Extraction is defined broadly: salary, bonuses, distributions, below-market loans, deferred compensation (accrued in the year services are performed, not paid), non-cash benefits above a de minimis threshold, related-party above-market payments, and conduit flows through any entity in which the holder holds a beneficial interest or governance right.

### Graduated exclusion and escalation
Below the lower bound L, the holder is fully compliant. Between L and the upper bound U, disqualification is proportional to how far R exceeds L. A "minor disqualified year" (L < R ≤ L + τ) carries proportional restitution but no procedural escalation. A "full disqualified year" (R > L + τ) carries procedural consequences: cure-window consumption, breach-count advancement, and potential ladder escalation. Three minor years within any rolling 7-year window aggregate to one full disqualified year, closing chronic near-bound parking.

### Floor-proximity tightening
Where any worker in the denominator workforce earns below the living-wage benchmark S, the formula automatically tightens, lowering effective bounds. This ensures the protection is most rigorous precisely where workers are most vulnerable — a feature of continuous blending, not a binary step.

### Labor-displacement limit (§D6.10)
Independent of the pay ratio, the productive-use exclusion is also conditioned on not automating away workers: automation investment that produces more than 10% FTE decline in 24 months, or more than 20% over 60 months, disqualifies the investment — unless the displaced workers are redeployed at maintained compensation or placed in new employment at ≥90% of prior compensation within 12 months.

### Tier 1 / Tier 2 repentance and cure structure
The patch recognizes two patterns of coming into compliance: self-initiated before any oracle inquiry (Tier 1 / Zacchaeus pattern) and acknowledged after inquiry but before final determination (Tier 2 / Davidic pattern). Both tiers route **100% of breach-period demurrage to worker restoration** — workers are held harmless in both tiers. The distinction is purely procedural: Tier 1 does not consume a cure window or advance the breach counter; Tier 2 counts as one-half breach. The patch explicitly states this is not a judgment on the sincerity of repentance; it reflects what the civil instrument can and cannot verify.

### Jubilee / worker-restoration routing
Demurrage collected under this section is directed to the productive-asset restoration fund, governed by a tripartite board (self-nominated eligible households, independent fiduciaries, public nominees through an independent civil-society process). Workers at and formerly employed at contributing firms have priority for disbursement in the first 24 months. The fund is prohibited from retaining any portion for administrative overhead. Disbursement must begin within 18 months of receipt.

### Proportionality and non-totalization limits
Three structural constraints explicitly limit the disclosure and enforcement apparatus: (1) bounded reach — the worldwide disclosure obligation reaches only the holder's own economic life and materially connected entities, not a general economic audit; (2) no determination on a bare irrebuttable presumption — every adverse presumption is rebuttable by documentary evidence; (3) purpose limitation — worker-identifier and scheduling data may be used only for §D6.9–§D6.10 determinations and worker restitution, never transferred for other purposes. These limits are named and structural, not aspirational.

### Appeal and due-process protections
All oracle determinations are independently appealable without oracle approval to initiate. Appeal timelines are enforced: the appeal body must decide within 180 days (45 days for arithmetic/scope-only appeals); if the deadline is missed, the determination is vacated for enforcement purposes until a reasoned decision issues — the oracle, not the holder, bears the consequence of appeal-body delay. Worker intervenor-of-right status is guaranteed in marker (v) phantom-worker rebuttal appeals. Forum-equivalence for labor-authority findings is assessed against a four-element test with a protective Day-1 worker-favoring default.

### R-1 and R-2 detection residuals
Two detection problems cannot be closed by drafting and are honestly documented:
- **R-1:** Reciprocal arm's-length structures with genuinely unrelated counterparties and a non-cash bargain leg. The conduit and aggregation rules reduce but do not eliminate this residual.
- **R-2:** Diffuse institutional benefit through genuinely independent foundation committees. The charitable-vehicle rules reduce but do not eliminate this residual.

The patch does not claim 10/10 closure overall. The honest ceiling is: 10/10 on every drafting-closable issue at severity ≥5, plus two transparently-monitored detection residuals. An annual TSP aggregate-payment anomaly report (with k=10 anonymity and ±20% differential bound) provides system-level monitoring of R-1 and R-2 patterns without individual-holder enforcement.

---

## 3. Review history

| Round | Format | Scope | Outcome |
|---|---|---|---|
| **v11 six-agent panel** | Parallel AI red-team | Full patch architecture | Surfaced 14 must-fix issues including denominator lock, §D7.1 interaction, cure cap, and phantom-worker formula inversion |
| **v13 theological red-team** | Christ-centered evaluation | Full moral architecture | Confirmed Christ-centered alignment of core protections; flagged Tier 1/Tier 2 as requiring theological clarification to avoid implied judgment on repentance sincerity; all must-fix items closed in v13 |
| **v13 five-agent delta panel** | Constitutional, Tax, Labor, Oracle, Christ-centered | v13 changes only | Surfaced 11 must-fix and 10 should-fix items; all 11 must-fix items closed in v14 |
| **v14 narrow oracle validator** | Oracle / implementation determinism | v14 changes only | Closed 4 narrow determinism fixes (3-in-7 window unit, appeal tolling, L+τ ≤ 4.5 order of operations, marker (v) transition due-process); surfaced 10 should-fix items deferred to v15 |
| **v15 delta validator** | Narrow read-only, post-commit | v15 changes only | Pass — no must-fix items; 7 non-blocking should-fixes identified and tracked in `P-063_v16_followup_draft.md` |
| **Christ-centered evaluation Session 6** | Theological review | Tier 1/Tier 2 distinction and §D7.1 interaction | Confirmed theological integrity; added explicit Scripture-grounded clarification paragraph distinguishing procedural civil-instrument design from theological judgment on repentance |
| **Fairness Vignette stress-test** | Scenario-based | Edge cases across small enterprise, minority worker, multi-jurisdiction, non-calendar filer | Confirmed protection in main vignettes; surfaced non-calendar fiscal-filer 3-in-7 ambiguity (closed in v14) and anniversary-edge concern (closed in v15 by Labor L8 taper) |

All review rounds were structured AI red-teams. No human expert review has occurred. This is the primary reason P-063 remains draft-only.

> **Note on v14 vs. v15 scope:** Both `Christ_Centered_Evaluation.md` Session 6 and `P-063_v14_vignette_stress_test.md` evaluated the v14 patch (commit `dd779d0`). They remain relevant — Session 6 explicitly flagged several items (Labor L7 worker intervenor standing, Labor L8 tapered post-window presumption, Oracle E1 prior-year-claimed-extraction safe harbor, Const A2 certification-appeal mechanism) that were subsequently integrated in v15. Reviewers relying on those documents should be aware that the v15 integrations they anticipated have been made, but neither document has been updated to evaluate v15 directly.

---

## 4. Known residuals and open follow-ups

### Irreducible detection residuals (R-1, R-2)
These are not drafting failures. They reflect genuine limits of any disclosure-based system:

- **R-1 — Reciprocal arm's-length structures:** A holder and a genuinely unrelated counterparty could structure a reciprocal arrangement with a non-cash bargain leg that provides economic benefit to both without triggering the conduit or aggregation rules. The patch monitors this pattern via annual anomaly reporting but cannot claim enforcement closure.

- **R-2 — Diffuse independent-foundation benefit:** Where a foundation committee is genuinely independent and distributes broadly, but incidentally benefits the holder's household in ways that fall below individual thresholds, the charitable-vehicle rules reduce but cannot eliminate this exposure. The patch monitors via certified asset-use and grant-recipient schedules but cannot claim closure.

Any review process that proposes "closing" R-1 or R-2 by drafting should be treated with skepticism. The honest response is continued transparent monitoring.

### v16 should-fixes (non-blocking)
Seven items identified by the v15 delta validator and tracked in `P-063_v16_followup_draft.md`:

| ID | Clause | Issue | Severity |
|---|---|---|---|
| S-1 | §P-063.4(g) Oracle D3 element (ii) | Safety-baseline comparator may not exist in certified worker-band filing | 5 |
| S-2 | §D6.9(i) Labor L7 | Late-standing-filing timing gap — organization filing near end of 21-day window may lose participation time | 4 |
| S-3 | §P-063.3(d)(ix) Oracle E1 | "Oracle's final-determined extraction" ambiguous when prior-year appeal is pending | 4 |
| S-4 | §P-063.3(d-limit)(2) Oracle C1 | Emergency-circumstances exception to 14-day notice undefined | 3 |
| S-5 | §P-063.3(d-limit)(2) Oracle C3 | Depth of "indirect" financial relationship unspecified | 3 |
| S-6 | §D6.9(e) min-records | "Functional equivalent" for smaller enterprises under-specified | 3 |
| S-7 | §P-063.3(d)(ix) Tax C | "Holder's primary domicile" for 50×S undefined | 3 |

None of these block circulation or adoption by themselves, but S-1 (severity 5) should be addressed before adoption.

### Structural gaps requiring evidence rather than drafting
- **Calibration values** (L = 3.0, U = 5.0, τ = 0.5, thresholds) are set by a Tier 3 calibration process (FAP). They are defensible as initial values but require pilot evidence to confirm they do not create unintended distortions at enterprise scale.
- **Oracle implementation burden** has not been assessed against a real TSP operational capacity. The minimum-records list, worldwide disclosure requirements, and denominator-anchor identification all require significant oracle infrastructure.
- **Small enterprise effects** at the 10-worker threshold, 5–9 worker tier, and first-time-crossing regime have not been assessed with field data.

---

## 5. What reviewers should focus on

### A. Constitutional / due process
- Are the appeal rights adequate — timelines, costs, access?
- Does the irrebuttable-presumption carve-out (for certified-forum P-045-equivalent adjudications) adequately balance worker protection and holder due process?
- Is the transition-rule Day-1 worker-favoring default defensible as a constitutional matter until certification lists are published?
- Does the Const A2 random-panel mechanism sufficiently prevent appeal-body capture?

### B. Labor / worker protection
- Does the denominator-anchor-worker protection (12-month strong presumption + 13–24 month taper) actually protect the relevant worker in practice?
- The patch structurally identifies one specific worker as the "constitutional focal point" of the owner's exemption — without consulting that worker about the role. Does this identification adequately preserve the worker's dignity, or does it primarily instrumentalize them regardless of the protections added? (This tension was flagged in Session 6 and the vignette stress test; it has not been resolved by drafting.)
- Is the phantom-worker denominator construction robust against automation-plus-dismissal strategies?
- Are the redeployment and placement carve-outs genuinely protective, or do they create a checklist that can be satisfied on paper?
- Does intervenor-of-right status for worker-advocacy organizations arrive in time to be useful in fast-moving appeals?

### C. Tax / evasion
- Does the conduit rule (15% aggregation with two-pass algorithm) adequately reach sophisticated multi-entity structures?
- Is the deferred-compensation rule (year-of-service accrual at higher of face or minimum guaranteed value) robust against employer-controlled performance conditions?
- Does the related-party IP licensing rule cover the most common extraction vehicles?
- Does the aggregate-line backstop (lesser of 7% or 50×S) function as intended for both small and large holders?

### D. Economics / enterprise behavior
- Do the calibrated bounds (L = 3.0, U = 5.0) create behavioral thresholds that could distort compensation structures at or near the bounds?
- Does the anti-parking constraint (L + τ ≤ 4.5) eliminate the chronic-minor-year strategy without creating new boundary behaviors?
- Are there enterprise-size categories or business models for which the patch creates structural compliance impossibility rather than incentives?
- Does the labor-displacement limit (§D6.10) capture the right set of automation strategies, or does it over- or under-reach?

### E. Oracle / implementation determinism
- Are the extraction-computation rules (especially deferred comp, conduit, related-party IP, and exit-event attribution) deterministic enough for two independent oracle implementations to produce the same result?
- Is the fiscal-year-to-calendar-year conversion methodology (for the 3-in-7 window) sufficiently specified, or does it require more TSP guidance?
- Is the worldwide disclosure obligation administrable for a multi-jurisdiction SME without dedicated compliance infrastructure?
- Are the minimum-records standards (six categories) calibrated correctly for different enterprise sizes?
- Does the oracle have, or can it realistically build, the institutional capacity to administer minimum-records verification, worldwide disclosure review, denominator-anchor identification, Jubilee fund outreach, and appeal administration at scale? What infrastructure must exist before Active date?

### F. Theology / ethics

*The theological framework applied in prior review rounds uses eight questions drawn from the teachings of Jesus: love of neighbor; service over domination; protection of the vulnerable; truth, mercy, justice, and forgiveness; human dignity over utility; resistance to Babel-temptation (pride, totalizing systems, coercive unity); good fruit in practice; and openness to correction. See `Christ_Centered_Evaluation.md` for the full eight-question framework and Session 6 for how it was applied to v14. The v15 integrations flagged by Session 6 have been made, but Session 6 itself has not been updated for v15.*

- Does the Tier 1 / Tier 2 distinction adequately honor both the Zacchaeus and Davidic repentance patterns without implying that one form of contrition is less genuine?
- Does the patch treat workers as persons with dignity, or does it reduce them to denominator anchors and phantom-worker counts?
- Does the proportionality-and-non-totalization structure prevent the system from becoming a surveillance idol — claiming godlike reach under the guise of protection?
- Is the Christ-centered review adequate, or does the patch require evaluation by human theologians and ethicists before adoption?

### G. Small enterprise burden
- Is the 10-worker threshold correctly placed, or does it impose disproportionate compliance costs on enterprises that pose limited extraction risk?
- Does the 5–9 worker "no cure window" rule appropriately balance simplicity and proportionality?
- Is the minimum-records list (six categories) achievable for a 10–15 person enterprise without specialized compliance staff?
- Does the baseline valuation requirement impose a meaningful one-time cost that should be addressed with a simplified safe harbor for small enterprises?

### H. Data / privacy / surveillance
- Does the purpose-limitation clause (§P-063.3(d-limit)(3)) adequately protect workers from having their identification and scheduling data used for purposes beyond §D6.9–§D6.10?
- Is the k-10 anonymity standard for the aggregate anomaly report adequate to prevent re-identification?
- Is the oracle's authority over worker-identifier data appropriately bounded and subject to meaningful oversight?
- Are there data-protection jurisdictions (GDPR, PDPA, etc.) whose requirements would conflict with the worldwide disclosure obligation or the denominator-worker identification process?

### I. Affected community

*Affected-community reviewers include workers at qualifying enterprises, small business owners, people who would potentially benefit from the Jubilee fund, pastors and community leaders who serve these populations, and others with direct lived experience relevant to the patch. These reviewers cannot evaluate implementation determinism, but they can assess whether the protections make sense from the inside and whether the costs fall appropriately.*

- If you are (or have been) a worker at a business like the ones this patch covers: Does the denominator-anchor-worker protection feel like something that would actually protect you, or does it feel like a mechanism an employer could work around?
- If you are (or have been) a small business owner: Does the compliance burden (disclosure obligations, ratio tracking, filing requirements) feel proportionate to what your business could reasonably manage?
- Does the Jubilee fund governance structure feel like it would actually deliver resources to the people it is meant to serve? What would most likely prevent that from happening?
- Is there anything in how this draft is framed that feels dishonest, misleading, or missing — something important that is not being said?
- Is being identified as the denominator-anchor worker something that would feel protective or something that would feel like unwanted exposure?

---

## 6. Explicit non-goals for reviewers

Reviewers should not evaluate P-063 against standards it does not claim to meet:

- **Not a complete economic constitution.** P-063 narrows one exemption under one condition. It does not address taxation, property rights, wealth limits, or income floors generally.
- **Not a general poverty policy.** The patch protects the lowest-paid worker in a qualifying enterprise; it does not address workers outside qualifying enterprises or poverty outside the productive-use exemption structure.
- **Not biblical Jubilee itself.** The Jubilee fund and restitution structure draw on Leviticus 25 and related Scripture as moral grounding. The patch is a human instrument, accountable to those teachings, not a claim to enact them in full. Reviewers should evaluate it as a human framework, humble and corrigible, not as a theological claim.
- **Not a solution to R-1 or R-2.** These are acknowledged residuals. Reviewers should not propose drafting changes that "solve" them without evidence; the honest response is transparent monitoring.
- **Not ready for corpus registration.** This brief is not a request for adoption. Do not propose adding P-063 to Patch_Log.md, ANNEX_D.md, or the corpus export pipeline on the basis of this brief.
- **Not a request to weaken draft-only protections.** The draft-only status is itself protective — it prevents premature reliance and forces continued scrutiny.

---

## 7. Key questions for reviewers

1. Does the patch protect workers without turning them into instruments — denominator pegs, phantom-worker counts, anchor-worker focal points? Where does the balance tip?
2. Does the worldwide disclosure obligation remain genuinely bounded by the proportionality and non-totalization limits, or does it create effective omniscience over the holder's economic life?
3. Are small enterprises (10–30 workers) burdened proportionately, or does the compliance infrastructure cost create a de facto floor that exempts the most harmful enterprises while burdening honest small operators?
4. Are the appeal timelines (180 days / 45 days) workable in a real adjudicatory system, or will they systematically favor well-resourced parties who can sustain prolonged proceedings?
5. Are the due-process protections for holders — particularly the forum-equivalence test and the rebuttable-presumption structure — adequate to prevent the system from becoming punitive rather than corrective?
6. Does the repentance structure (Tier 1 / Tier 2) restore harmed workers without rewarding evasion, and does it accurately reflect the procedural distinction between self-initiated and confronted-then-restored responses?
7. Does the anti-parking rule (L + τ ≤ 4.5 and 3-in-7 aggregation) eliminate the chronic-minor-year strategy without creating new behavioral cliffs near the aggregation trigger?
8. Are the oracle calculations deterministic enough that two independently programmed oracle implementations would consistently produce the same result on the same facts? Where are the most significant divergence risks?
9. Are R-1 and R-2 correctly handled as acknowledged residuals with transparent monitoring — or do they represent a hidden failure that should prevent adoption regardless of drafting quality?
10. Does the Jubilee fund governance structure (tripartite board, direct outreach, disbursement timeline, complaint mechanism) adequately ensure that restitution reaches the households whose labor generated the demurrage?
11. Is the denominator-anchor-worker protection (12-month strong presumption + 13–24 month taper) strong enough to deter focal-point retaliation, or does an anniversary-edge incentive persist despite the taper?
12. Does the patch remain Christ-measured — genuinely accountable to the teachings of Jesus — without becoming self-righteous, claiming to administer what only God can judge, or reducing the Gospel to a compliance mechanism?
13. Is the labor-displacement limit (§D6.10) calibrated to reach genuine substitution of capital for labor, or does it also reach productivity improvements that benefit workers?
14. Does the conduit aggregation rule (same common founder / controlling investor / material commercial relationship) adequately reach multi-entity extraction structures without sweeping in legitimate investment diversification?
15. Is the floor-proximity tightening mechanism (continuous blending when any worker earns below S) calibrated correctly, or does it create sharp incentives to manage the denominator worker's wage just above S?

---

## 8. Finding classification guide

Please classify each finding as one of the following:

| Class | Meaning |
|---|---|
| **Blocker before broader circulation** | Structural defect that would cause harm or embarrassment if the draft were shared more widely before resolution |
| **Blocker before adoption** | Issue that must be resolved before P-063 could be incorporated into the corpus, but does not prevent continued review and refinement |
| **v16 refinement** | Non-blocking clarification or tightening suitable for the next drafting pass |
| **Monitoring / pilot-evidence item** | Issue that cannot be resolved by drafting; requires field testing, calibration data, or oracle implementation experience |
| **No action** | Issue reviewed and found adequately addressed in the current text |

The seven items in `P-063_v16_followup_draft.md` are pre-classified as v16 refinements. Reviewers may upgrade any of them if they find a blocking implication.

---

*This brief was prepared for the P-063 v15 broader review process. Authored 2026-05-19. The operative patch text is `docs/governance/P-063_draft.md` (commit `11292a9`). All review findings should reference the operative text, not this brief.*
