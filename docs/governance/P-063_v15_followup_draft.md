# P-063 v15 Follow-Up — Deferred Should-Fixes (Tracking Note)

> **Status: Draft-only / not corpus-registered / not published.**
> Do not add to Patch_Log.md, ANNEX_D.md, or INDEX.md.
> This is a tracking note for items deferred from P-063 v14 review rounds. It is not itself a patch. When v15 is drafted, this note becomes its work-list.

## Scope

P-063 v14 (commit `dd779d0`) closed every must-fix item surfaced by the v13 5-agent panel (Constitutional, Tax, Labor, Oracle, Christ-centered theological) plus the v14 narrow Oracle validator. The items below were rated **should-fix** or **nice-to-fix** by those panels and are deferred to v15 because they do not affect must-fix correctness, do not introduce evasion routes, and do not weaken worker protection — but they remain real, panel-identified improvements that should land before the patch reaches Active status.

This note does NOT reopen any settled v14 closure. It tracks only what v15 should address.

## Honest residuals — preserved from v14, NOT to be claimed as closed

R-1 and R-2 in P-063_draft.md "Open Questions for Evidence Review" remain irreducible detection residuals with **no drafting-closable 10/10 solution**. v15 must preserve their honest documentation. The annual TSP aggregate-payment anomaly report (k=10 anonymity + ±20% differential bound) is monitoring only, not closure. Any v15 revision claiming "10/10 on R-1 or R-2" is wrong and should be rejected.

- **R-1.** Reciprocal arm's-length structures with genuinely unrelated counterparties (non-cash bargain leg).
- **R-2.** Diffuse institutional benefit via genuinely independent foundation committees.

## Deferred should-fixes for v15

### 1. Tax C — dual-base aggregate-line backstop

**Clause:** §P-063.3(d)(ix) aggregate-line backstop.

**Current text:** triggers when aggregate of sub-floor receipts exceeds 7% of the holder's prior-year claimed extraction.

**Gap:** a holder who under-reports prior-year claimed extraction shrinks their own backstop trigger — undesirable as a perverse-incentive, but more importantly the 7% base is gameable for high-extraction holders whose tolerance band scales with claimed extraction.

**v15 fix (Tax C, sev 5):** replace the trigger with:

> *"...where that aggregate exceeds **the lesser of (i) 7% of the holder's prior-year claimed extraction or (ii) 50 × S**, where S is the applicable jurisdictional living-wage benchmark for the holder's primary domicile. The dual base prevents low-claimed-extraction filers from inflating their tolerance through under-reporting and prevents high-claimed-extraction filers from expanding their tolerance through claimed-extraction growth alone."*

Why deferred: closes a marginal extension of R-1 (detection problem), does not weaken any v14 closure, and does not introduce new evasion. Pure tightening.

### 2. Labor L7 — worker intervenor-of-right standing in marker (v) appeals

**Clause:** §D6.9(i) Appeal rights, particularly where holder rebuts marker (v) phantom-worker presumption.

**Current text:** holder appeals to §D6.9(i) appeal body to challenge phantom-worker presumption arising from labor-authority retaliation findings. Worker has no specified participation right in that appeal.

**Gap:** the retaliated-against worker, who won at the originating forum, may have no standing in the §D6.9(i) appeal where the holder seeks to rebut. Practical disenfranchisement of the very worker the protection was built for.

**v15 fix (Labor L7, sev 7):** add to §D6.9(i) after the "Standard of review" sentence:

> *"**Worker and worker-organization participation.** In any §D6.9(i) appeal in which the holder contests a §D6.10(g) marker (v) phantom-worker presumption arising from a labor-authority retaliation finding, the worker subject to the retaliation finding, and any worker-advocacy organization that represented the worker in the originating forum, have intervenor-of-right status with full rights to file briefs, present evidence rebutting the holder's documentary submissions, and cross-examine holder witnesses. Notice to the worker and the worker-advocacy organization, in the worker's primary language, by oracle-administered channel, is a precondition to the appeal body's consideration of the holder's rebuttal. Worker participation is at no cost to the worker; reasonable representation costs are paid from the productive-asset restoration fund and credited against the worker's individual restitution only if the worker prevails and receives restitution exceeding 5× the representation cost."*

Why deferred: aligns appeal-body procedure with worker dignity (Prov 31:8–9, Jas 5:4), but is not a must-fix because (a) the v14 worker-favoring transition rule and the certification regime already shift the bulk of risk; (b) introducing intervenor rights interacts with §D6.9(i) procedural design that may benefit from a broader appeal-procedure pass in v15. Worth doing carefully.

### 3. Labor L8 — tapered presumption for months 13–24 after assessment

**Clause:** §P-063.4(g) anchor-worker protection.

**Current text:** strong rebuttable presumption applies to adverse actions within 12 months of assessment date.

**Gap:** day-366 dismissals fall outside the strong presumption entirely. Combined with the post-identification-paper-trail rule, a holder who keeps the anchor for 12 months and 1 day faces only the ordinary §D6.10(g) markers. Real anniversary-edge exposure.

**v15 fix (Labor L8, sev 5):** add to §P-063.4(g) after the existing 12-month presumption:

> *"**Tapered post-window presumption.** From months 13 through 24 following the assessment date, an adverse action against the prior-year anchor worker creates an **ordinary rebuttable presumption** of retaliation under §D6.10(g), subject to standard documentary rebuttal (not the heightened clear-and-convincing standard applicable during the first 12 months). After month 24, only the standard §D6.10(g) markers apply. This taper is a transition between full focal-point protection and the standard markers, not a renewal of the strong presumption."*

Why deferred: prudential tradeoff — any window has an anniversary edge; tapering reduces but does not eliminate. Worth adding without weakening the within-12-month protection.

### 4. Oracle E1 — prior-year-claimed-extraction higher-of-self/final + materiality safe harbor

**Clause:** §P-063.3(d)(ix) aggregate-line backstop base ("prior-year claimed extraction").

**Current text:** uses "prior-year claimed extraction" without specifying whether self-claimed or oracle-final-determined.

**Gap:** two oracles diverge — Oracle A reads "claimed" as self-disclosed (filing-time computable); Oracle B reads it as oracle-final-determined. A holder who under-claims by 50% then sees the oracle determine twice as large can be on the wrong side of the line under one reading and the right side under another.

**v15 fix (Oracle E1, sev 7):** add to §P-063.3(d)(ix):

> *"**'Prior-year claimed extraction'** means the higher of (a) the extraction the holder self-disclosed for the prior assessment year, or (b) the oracle's final-determined prior-year extraction (where finalized). The holder computes the aggregate-line obligation at filing time using (a); the oracle assesses compliance at review time using (b); where (b) > (a) and the aggregate would have exceeded the trigger under (b), the failure to disclose is a §P-063.3(d) disclosure incompleteness triggering the 5-year lookback **only if** the under-claim was material (≥10%) or in bad faith. Where the under-claim was good-faith and immaterial, the aggregate-line obligation is recomputed against (b) prospectively for the current year without lookback consequence."*

Why deferred: closes a determinism gap that interacts with Tax C (v15 fix #1) — best to land both together so the new dual-base definition lands once with full higher-of/safe-harbor semantics.

## Remaining v13 panel should-fixes (rolled into v15)

These items came back rated should-fix and have not been integrated:

- **Const A2** — appeal-body certification appeal process: 180-day default-rule with worker-favoring presumption for stale findings + random-panel certification-appeal mechanism drawn from §D6.9(i) appeal-body members not party to original certification.
- **Oracle C1** — explicit four-element forum-equivalence test specification (currently delegated to TSP item (xxvi); v15 should specify the necessary-minima tests for each of the four elements directly in §P-063.3(d-limit)(2) to remove appeal-body line-drawing discretion).
- **Oracle C3** — "worker-advocacy organization" standing definition (currently undefined; v15 should add: nonprofit, labor organization, worker center, or community organization with ≥24 months activity in worker-rights/labor-conditions field, no financial relationship to any holder whose certification is being appealed).
- **Oracle D3** — enumerated "material change in working conditions" definition under §P-063.4(g) with band-uniformity safe harbor (enumerated 5-element test with safe harbor for changes applied uniformly to the worker's full wage band).

## Remaining v14 narrow validator should-fixes (rolled into v15)

These items came back rated should-fix from the post-v14 narrow Oracle validator and have not been integrated:

- **Worked-example appendix** — append to P-063 a non-binding worked example showing the 3-in-7 aggregation across a non-calendar fiscal filer with one appeal-pending minor year, operationalizing the v14 §D6.9(f) text.
- **Enumerated minimum-records list** — for the "reasonably attentive holder" backstop in §D6.9(e) Tier 2 anti-strategic-waiting, specify a minimum-records list under TSP industry-norm recordkeeping standards (further reduces the residual where the holder maintained no books).

## What v15 must NOT do

- Reopen R-1 or R-2. They remain irreducible detection residuals, honestly documented. Do not paper them over.
- Claim unqualified 10/10 closure of the patch. The honest ceiling remains "10/10 on every drafting-closable issue at severity ≥5, plus two transparently-monitored detection residuals." Anything more is not truthful.
- Weaken any v14 closure (Tier 1/Tier 2 100% worker routing; anti-parking L + τ ≤ 4.5; 3-in-7 aggregation; locked denominator; §D7.1 invariant; §P-063.3(d-limit) proportionality and non-totalization limits).
- Modify §D7.1, §D6.2(d), `docs/constitution/INVARIANTS.md`, `docs/constitution/Humane_Constitution.md`, or `docs/constitution/Acceptance_Protocol.md` without explicit user instruction and the Christ-centered ethical review per `.claude/rules/constitution-review.md`.

## Sequencing recommendation for v15

1. Tax C + Oracle E1 together (they share the §P-063.3(d)(ix) base definition).
2. Labor L7 separately (interacts with §D6.9(i) procedural design).
3. Labor L8 in the same revision as Labor L7 or §P-063.4(g)-adjacent edits.
4. Oracle C1, C3, D3 as a single cluster — they're all definitional hardenings of existing v14 clauses.
5. Const A2 last — appeal-body capture risk is upstream of P-063 drafting and may benefit from broader §D6.9(i) review.
6. Worked-example appendix and minimum-records list can land alongside or after the substantive should-fixes.

After v15, run one more narrow panel pass to confirm no new interactions before Active status is considered.

---

**Authored:** post-v14 narrow validator (commit `dd779d0`), 2026-05-19.
**Tracking:** this note is the v15 work-list. Update only when v15 drafting begins or when additional items are deferred from future review rounds.
