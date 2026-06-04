# Capstone — Assembled-System Review

**Status:** Proposed — design review, not incorporated. The culmination of the five per-instrument panels, run under the [Instrument Evaluation Rubric](2026-06-03-instrument-evaluation-rubric.md). Six adversarial reviewers probed the *seams* of the assembled five-instrument system (not the parts): shared-infrastructure chokepoints, triangular convertibility, emergent exploits, whole-system legibility, correlated collapse, and completeness.

---

## The central finding

The walls succeed at what they were built for: **direct convertibility between instruments is well-blocked.** But the assembled system **converges to single points at two layers the walls don't cover** — and that is where the dominating "Babel" power the project fears was not eliminated, only **relocated**:

1. **The perception layer (the capacity oracle).** Essential Access, Shared Storehouse, *and* Flow issuance all read the same capacity oracle. In systems terms: one environmental sensor, no independent corroborating channel. Whoever controls what the system *believes about physical reality* controls the floor, the rationing trigger, and the money supply — at once. Three reviewers reached this independently.
2. **The rule-making layer (public office).** The Annex Z firewall guards the *record*, not the *office the record unlocks*. Whoever holds office sets the oracle rules, the issuance rule, the rationing formula, and the tax/fund parameters.

The walls are real at the transaction and (mostly) funding layers, and the survival floor is genuinely well-insulated. But **non-convertibility at the transaction layer is not enough if perception and rule-making each route through one substrate.**

## Top systemic risks + fixes (ranked)

### 1. The over-reporting oracle hole (CRITICAL — G-5/G-6)
The asymmetric override (oracle may only *raise* the floor, humans hold cuts) protects against *under*-reporting. It does **nothing** against an oracle that *over-reports* capacity: Essential Access issues against phantom supply, Shared Storehouse fails to trigger a needed cut, Flow over-issues — all at once, invisibly, because no human decided it. A confidently-wrong (not even captured) oracle with a shared blind spot does this; the corpus's correlation cap (FC-032) catches co-movement, not directional bias.
**Fix:** (a) require ≥2 *methodologically heterogeneous* capacity channels (administrative vs. market-signal vs. physical survey) feeding the three instruments; divergence beyond a band trips human review and *freezes tightening* (fails toward generosity). (b) Add a directional-bias test to oracle accreditation. (c) Hold a physical strategic reserve sized to N months of the floor, drawable *without* an oracle reading — so a lying oracle can't narrow the floor faster than the buffer drains.

### 2. The "productive" skeleton key (CRITICAL — G-2)
"Productive" is adjudicated by **three bodies on three incompatible tests**: Flow's issuer (productive *commitment*), the wealth assessor (active/productive *use*), the capacity oracle (productive *capacity*). Gaming the loosest test simultaneously **mints Flow AND dodges the wealth levy AND shifts measured capacity** — a multi-instrument double-dip no single instrument sees.
**Fix:** one canonical **Productivity Register** — a single productive-status determination per asset/commitment, consumed by all three instruments; no instrument may grant an exemption or mint against a status it didn't read from the register. Bind it to a cross-instrument settlement event: a *failed* commitment reverses the wealth exemption (recovers deferred LVT/backstop), even though already-paid wages stay no-clawback.

### 3. Capture-the-apparatus defeats the firewall (CRITICAL — G-4)
Service Record → office → control of the oracle/issuance/formula/tax parameters → de-facto allocation, money, or survival advantage → re-mints civic standing. A fully wall-compliant A→B→C→A loop, because the firewall forbids the *record* converting to money, not the *office* doing so. There is COI *disclosure* but no *recusal*.
**Fix:** a **Tier-1 recusal invariant** — no office-holder may vote on, draft, or adjudicate a parameter whose published distributional effect moves their own net-worth bracket, their own oracle district, or an entity they benefit from (disclosure ≠ recusal); plus structural separation (the body that sets economic parameters ≠ the pool that benefits) and a one-person-one-vote legitimacy gate on wealth-adjacent parameter changes.

### 4. The dividend/top-up collateralization leak (HIGH — G-1 via G-2)
The citizen's dividend and the Essential Access cash top-up pay a predictable, identity-keyed stream into Flow to the lowest-wealth cohort. A lender/landlord underwrites against that guaranteed stream → survival-adjacent income is collateralized → re-creates exactly the survival→market leverage the in-kind floor exists to kill. Z4 forbids conditioning credit on Voice/Service Record balances, not on the dividend/top-up stream.
**Fix:** make the top-up and dividend **non-assignable and non-garnishable at the ledger layer**, and prohibit any party from requiring or underwriting against that stream.

### 5. Founding capture is the least-recoverable shock (CRITICAL but upstream — G-4)
The founder sets the oracle methodology registry, identity doctrine, keyholder set, and firewall. Capture at genesis is self-ratifying: amending Tier-1 needs the very keyholders a captured founding installed. No exogenous reset.
**Fix:** an external-attestation-quorum **re-founding tripwire** — if independent audit (the corpus's own "no apex unaudited") finds the founding keyholder set captured, an external quorum can force re-founding; convert irreversible genesis bindings (oracle registry, exclusion targets) into one-time post-pilot re-ratifiable ones.

### 6. Identity-layer exclusion = multi-instrument civic death (HIGH — G-3)
A lost/frozen identity record simultaneously strips Voice, Service Record eligibility, the Essential Access *above-floor* top-up, and net-worth identity. (Credit: the survival floor is deliberately decoupled — presence-triggered, no identity — so this does *not* breach G-1. The corpus does this well.)
**Fix:** an explicit identity-**recovery** mechanism (k-of-n social-attestation quorum reconstitutes civic standing without re-earning it from zero) + a manual offline sortition roster.

## Legibility verdict: legible-but-complex, NOT Frankenstein (good news)

The system **passes the one-paragraph test**, has a genuine **5-point irreducible core**, and a real **unifying logic**: *separate the functions money fuses — buying, surviving, deciding, serving — into walled instruments so advantage in one cannot capture another.* The 30+ components are mostly **load-conditional** (they activate on shortage, extreme wealth, or deflation — not daily life), which is the right design. The one real flaw is *presentation*: the corpus shows the core and the dormant modules at the **same altitude**.
**Fix (editorial, not structural):** publish a one-page **"Five Walls" citizen card** as the canonical front door, and tag every module "dormant / load-conditional — ignore unless triggered." Converts legible-but-complex → legible-and-coherent without touching the robustness machinery.

## The honest scope boundary (the completeness finding)

The five instruments govern **money, survival, and civic priority** — but the assembled system **orphans** core polity functions, ranked by danger:
1. **The monopoly on force / criminal justice / coercion** — the gravest gap. Capture the coercive apparatus and every wall is decorative. No instrument owns who polices, prosecutes, jails, or wages war.
2. **Children & dependents** — no Voice, no Service Record, only mediated Access; ~20–25% of people governed only by proxy.
3. **The care economy as *generative*** — recognized for civic standing but never funded/valued economically.
4. **Ecology & future generations** — structurally unowned despite being in the rubric; free-rides on LVT + the oracle.
5. **Civil justice** (disputes between people) and **6. education/knowledge access.**

**The truthful next move:** either constitute the missing organs (a justice/force instrument, a membership instrument, a guardianship-and-future-generations standing doctrine) **or state plainly that this is a fiscal-civic layer designed to sit inside an existing rule-of-law polity it does not itself supply.** Until that line is drawn, the design's silence on force and membership reads as an answer it hasn't given.

## Pilot priority

The riskiest unverified assumption is the one the central finding points at: **the capacity oracle.** It is the keystone shared by the two most consequential instruments (Essential Access + Shared Storehouse) and Flow issuance. **Pilot the oracle first, adversarially — measurement integrity and the over-reporting hole — before any delivery pilot.** This reorders the existing Pilot Evidence Roadmap (which ranks comprehension and identity ahead of capacity).

## What the arc produced

Five instrument decision records + this capstone + the rubric. The recurring, system-level lesson across all of them: **the cleverness lives in what each instrument is *not allowed to do*, and in keeping the shared substrates (oracle, identity, office, founding) from quietly re-concentrating the power the walls disperse.**

## Open / next (in order)

1. **Harden the shared substrates** — oracle de-monopolization + over-reporting tripwire + strategic reserve; the Productivity Register; the Tier-1 recusal invariant; dividend/top-up non-assignability; the founding re-ratification tripwire; identity recovery.
2. **Publish the Five Walls citizen card** + altitude-tag the modules.
3. **Draw the scope line** — constitute the missing organs or declare the fiscal-civic boundary.
4. **Pilot the capacity oracle first.**
5. Promotion of any of this into the corpus requires the relevant redlines (INVARIANTS, SPECIFICATIONS, Annexes D/X/Y/Z/AB/AJ) and the Christ-centered review.
