# Pilot Proposal — Panel Findings & Proposed Changes

**Status:** Decision memo, not yet applied. Source for a forthcoming revision of `docs/public/09_pilot_proposal.md`.
**Date:** 2026-06-15.
**Origin:** A five-specialist panel (impact-evaluation methodologist · cash-transfer/in-kind pilot practitioner · program-sequencing strategist · human-outcomes & dignity measurement expert · adversarial research-ethics/IRB + credibility skeptic), each run as a single-role reviewer against the current `09_pilot_proposal.md`.

**How to use this:** Each item below is a discrete decision. Mark each **Apply / Modify / Reject**. Once approved, the accepted items are folded into `09_pilot_proposal.md` (step A); the funder site + PDF then reflect the result.

**The one-sentence throughline the panel converged on:** the pilot's distinctive, defensible, fundable claim is *"the walls hold"* (mechanism integrity), **not** *"people are better off"* (welfare) — the latter merely re-proves cash transfers. Lead with the walls; treat welfare as a rigorous secondary.

---

## Tier 1 — Must fix before a single human is enrolled (ethics + credibility blockers)

### D1. Replace the deliberate real-goods scarcity cut with a *simulated* scarcity exercise
**Now:** months 9–11 deliberately reduce a real goods category ~30% for ~8 weeks for 150–300 low-income people.
**Panel (ethics chair, practitioner, methodologist — unanimous):** IRB-fatal as written; medicine cuts risk real clinical harm; with no control arm it's an anecdote anyway; "additive so it's safe" and "tests real scarcity" can't both be true.
**Proposed:** Test the Shared Storehouse via a **simulated scarcity declaration** — run the full declaration → independent falsification audit → rationing/distribution → measurement-fault-injection machinery against a *paper* shortage, with **zero real reduction to any participant**. This tests the more important wall (can a shortage be faked to cut people off?). If real scarcity is retained at all: **food staples only, medicine categorically excluded, fresh re-consent at month 8, opt-out anytime, and an independent safety board with unilateral stop authority.**
**Recommended:** Apply (simulated version as primary).
**Your call:** ___

### D2. Take the founder's hands off the instruments that decide the result
**Panel (skeptic):** Founder running a pilot of his own design who also sets thresholds, defines the floor, times the scarcity event, and picks the "independent" reviewer = "graded his own homework"; AI-assisted design is a cheap hostile headline if discovered rather than disclosed.
**Proposed:** The independent reviewer is **selected and paid by the funder, not the founder**; failure thresholds + analysis plan are **pre-registered and locked before enrollment**; the AI's role in the design is **disclosed up front**.
**Recommended:** Apply.
**Your call:** ___

### D3. Downgrade the "additive — never touches your benefits" guarantee to an honest, backstopped promise
**Panel (skeptic, practitioner):** Benefit interaction (SNAP/Medicaid/SSI/housing cliffs, ISM rules, tax/imputed income) is **not within the program's control** — a flat guarantee can make a poor person poorer.
**Proposed:** Reword from guarantee to: *"structured to be non-countable; confirmed per site where possible; and backed by a hold-harmless fund that makes you whole if any existing benefit or tax liability is affected."* Add per-site benefits/tax review + a **hold-harmless reserve** as a budget line; consent discloses the residual risk plainly.
**Recommended:** Apply.
**Your call:** ___

### D4. Write the control-arm ethics in (currently silent)
**Panel (skeptic, methodologist):** Enrolling low-income people as never-treated controls, surveyed for 18 months and given nothing, is unaddressed and extractive as-is; differential attrition also biases the headline result.
**Proposed:** Specify **post-trial access / wait-list, compensation parity for time + data burden, an honest recruitment script, and a pre-registered attrition plan** (ITT primary + Lee bounds). Consider a stepped-wedge/phase-in so no one is a permanent control.
**Recommended:** Apply.
**Your call:** ___

---

## Tier 2 — Design strength & interpretability

### D5. Split the two estimands; lead with the walls; state power honestly
**Panel (methodologist, skeptic, sequencer):** The doc powers for mechanism integrity but advertises welfare. At n≈150–300 split across cohorts/control (~50–100/cell) it can credibly detect only large welfare effects (~d≥0.5) and **cannot** support subgroup/disparity claims.
**Proposed:** State mechanism integrity as the confirmatory spine; frame welfare as **estimation with confidence intervals**, not hypothesis tests; **publish the minimum detectable effect (~d=0.5)**; downgrade subgroup/"no bias found" claims to exploratory/directional.
**Recommended:** Apply.
**Your call:** ___

### D6. Add an active cash-control arm  *(cost impact)*
**Panel (methodologist — "single highest-value change"):** A control receiving the cash-equivalent isolates the *walled-design* effect from the *resource* effect. Without it, a welfare improvement can't distinguish "the walls did something" from "free groceries help."
**Proposed:** Add a cash-equivalent control arm to Pilot A.
**Note:** Raises cost and n requirements — interacts with D14 and the site's headline ask.
**Recommended:** Apply if budget allows; otherwise flag explicitly as a known limitation.
**Your call:** ___

### D7. Tighten identification: household randomization, assigned cohorts, spillover + leakage-detection
**Panel (methodologist):**
- Randomize at the **household** level (individual randomization leaks across a shared kitchen).
- **Randomize cohort assignment** (direct-goods vs closed-loop credit) — no self-selection, or the wall-leakage comparison is confounded.
- Baseline **social-network mapping** to model within-community spillover (incl. the "buy your groceries, you give me cash" indirect cash-out).
- **Leakage-detection validity:** red-team seeds known cash-out attempts to confirm instruments catch them; report leakage as "≥ measured, detection sensitivity X%."
**Recommended:** Apply.
**Your call:** ___

### D8. Replace the single welfare row with validated instruments + a qualitative arm  *(answers "how life is different")*
**Panel (human-outcomes expert):** The lone "Does the floor change behavior? / measurable reduction" row is undefined and buried under six wall-integrity rows.
**Proposed:** Pre-registered primary outcomes with **minimum meaningful change** (not "measurable reduction"), using validated, nationally-normed instruments:
- Food security — **USDA HFSSM (18-item)**
- Cost-related healthcare/medication non-adherence — **NHIS/BRFSS items**
- Felt economic security — **CFPB Financial Well-Being Scale** (captures the *unrevocable* dimension cash can't)
- Distress / agency — **Kessler-6** + **Pearlin Mastery**
Plus a **pre-registered mixed-methods qualitative arm** (repeat interviews, participant diaries, Most-Significant-Change), collected on the control arm too.
**Recommended:** Apply.
**Your call:** ___

### D9. Measurement-dignity rules (extend the dignity ethic to the study itself)
**Panel (human-outcomes expert):**
- Measurement is **opt-in and severable from the floor** (declining a survey never affects allocation).
- **Pay participants** for interviews/diaries as labor.
- **Researchers ≠ deliverers** (the person who can affect your allocation never asks how grateful you are).
- Publish a **"what we will NOT collect"** list (no itemized purchase logs beyond the aggregate the wall test needs; no biometric/location; no mining of benefit records; no deservingness probes).
**Recommended:** Apply.
**Your call:** ___

---

## Tier 3 — Scope & program shape (answers the two original questions)

### D10. Keystone-first on real people + a whole-system tabletop on paper
**Panel (sequencer, methodologist — unanimous):** Bundling all five instruments in one community confounds wall attribution and burns the one clean community. But the "see it as a system" instinct is valid.
**Proposed:** Keep Pilot A as the lived keystone; add a **whole-system adversarial tabletop/simulation** (30–80 role-players, all five instruments live on paper, a paid red-team hunting cross-wall conversion paths), **folded into Pilot B's existing red-team**. Catches emergent cross-wall failure at ~5% of cost, zero human risk.
**Recommended:** Apply.
**Your call:** ___

### D11. Resequence the program; build shared infrastructure once
**Panel (sequencer):** Only one true dependency exists (D depends on C's Voice↔Service-Record separation result).
**Proposed:** Run **Pilot C (Voice) in parallel with A** (no shared confound, cheapest, tests the #2 wall); **gate Pilot D behind C's separation result**; build the sealed-ledger infrastructure once (shared by C and D); Pilot B simulation + the tabletop overlap freely.
**Recommended:** Apply.
**Your call:** ___

### D12. Internal gate: honest-shortage audit *before* the rationing test
**Panel (sequencer):** "Can a shortage be declared honestly?" is more fundamental than "does rationing beat price?" — a fakeable shortage makes the Storehouse a coercion tool regardless of rationing quality.
**Proposed:** Run the falsification audit first; only proceed to distribution testing if the declaration survives.
**Recommended:** Apply.
**Your call:** ___

### D13. Make the decision gates asymmetric and explicit
**Panel (sequencer):** Welfare misses are recoverable by tuning; wall breaches are design-level.
**Proposed:** Codify gates so that a **design-enforced wall failure stops the program** — specifically: Cohort-2 (code-enforced) EA→Flow conversion >5%, a fakeable shortage declaration, or durable Universal-Stake convertibility in simulation. A *friction-enforced* (Cohort-1-only) leak is a redesign signal, not a stop. Welfare shortfalls tune parameters, never halt.
**Recommended:** Apply.
**Your call:** ___

---

## Tier 4 — Operational reality (budget · timeline · logistics)

### D14. Honest budget and timeline  *(cascades to the site's headline ask)*
**Panel (practitioner):** $350k floor isn't real for two cohorts + medicines + benefits protection + ~4 FTE. The program is ~27 months, not 18 (6mo pre + 18 exposure + 3 post).
**Proposed:** State a realistic **~$600k floor**; reframe as an ~27-month program with 18 months of participant exposure; add explicit lines for pre-pilot legal/benefits counsel, the D3 hold-harmless reserve, a dedicated M&E FTE, and retention. **Note:** the funder site currently leads with "$350,000–$860,000" — revising the floor changes that headline.
**Recommended:** Apply (and update the site to match).
**Your call:** ___

### D15. De-risk the operations
**Panel (practitioner):**
- **Narrow "basic medicines"** to OTC + a short maintenance-generic formulary via one contracted pharmacy partner (full Rx delivery is its own program).
- **Use existing restricted-authorization card rails** for the closed-loop credit (the infra behind SNAP/WIC/FSA cards) — don't build a payment system.
- **2+ vendors per category** + a **same-day decline-override hotline** (a register decline is a dignity event).
- **Site = a single dense community anchored by a trusted partner** with a reachable pool ≥2.5× the enrollment target; veterans' housing fits the founder's credibility.
**Recommended:** Apply.
**Your call:** ___

### D16. Add the public "What changes for the people in it" section *(site + PDF)*
**Panel (human-outcomes expert):** The founder's flagged gap.
**Proposed:** Build it on *lead-with-the-aggregate, ground-with-the-individual*; participant-authored or explicitly-composite narratives (never extracted); feature the *unremarkable* signature ("I just bought the medicine"); include a mandatory **"what didn't change / what's still hard"** subsection; and name the **temporary-floor limitation** (a known-end-date 18-month floor may understate the security a permanent one would give).
**Recommended:** Apply (this is a site/PDF change, drawn from the D8 outcomes).
**Your call:** ___

---

## Cross-cutting consequences to decide consciously

- **Cost rises.** D6 (cash arm) + D14 (honest floor) + D3 (hold-harmless) materially raise the ask and change the site's headline number. This is the price of credibility; decide whether to show the higher, honest figure or scope down.
- **The scarcity test is the crux.** D1 is the single most important change; the simulated version preserves the governance evidence while removing the ethical/PR blocker.
- **Nothing here weakens the honesty posture** — most items make the "designed to fail informatively" promise enforceable (pre-registration, locked thresholds, published non-collection list).

**Next step on approval:** apply the accepted items to `docs/public/09_pilot_proposal.md` (step A), regenerate the corpus, run `validate_corpus.py`, then reflect the headline/number/"what changes" changes on the funder site.
