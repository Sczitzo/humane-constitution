# Voice + Service Record — Hardening Redline (panel-revised)

**Status:** Proposed redline — NOT incorporated. Awaits explicit human approval + the applicable amendment process. The constitution and annexes are unchanged. First instrument of the broader hardening pass (after the money instruments), re-scoped against current live text (2026-06-09) and **revised after a three-member panel** (adversarial, Christ-centered, corpus-fit).

> **Owner decision, 2026-07-13 — re-scoped to Voice-only.** The Service Record portions of this redline are **withdrawn**, resolving the recorded conflict with [P-079](2026-07-12-p079-service-record-sortition-redline.md) (Service Record retirement via sortition) in P-079's favor: the project's direction of record for Service Record is retirement, not hardening. Effect on this document:
> - **Fix 1 (equal Voice base + INV-004 clarification) survives intact** — it is Voice-only and independent of Service Record.
> - **Fix 2 (Civic-Standing Misuse Detection) is withdrawn as scoped.** Its Service Record substance — attestation rings, the T-009 ring exploit, the Service Record Misuse test-package gate — is mooted by the retirement direction. One narrow residual survives and is carried forward as an open item for any future Voice-only redline: enforcement of the Z4-style prohibition on third parties requesting, receiving, or inferring **Voice** balances (employer/landlord misuse of Voice data), which does not depend on Service Record existing.
> - The "deliberately NOT changed" items concerning Service Record (Z3 slow decay + pause floor) are moot under the retirement direction.
>
> Nothing is retired today: Service Record remains in force as designed until P-079 clears its own gates (intake is held at Acceptance Protocol AV1/AV3 pending an adversarial panel that does not yet exist). This decision selects the direction and withdraws the competing path; it does not activate P-079.
>
> **Update 2026-07-13:** Fix 1 is now formalized as **[P-080 — Equal Voice Base](2026-07-13-p080-voice-equal-base-redline.md)** (PROPOSED, intake held at AV1/AV3). The Fix 1 text below, as panel-revised, is the text of that patch. The Fix 2 Voice-only residual is recorded as an open item in the P-080 package (§6).

**Panel headline.** Fix 2 as first drafted would have **persecuted the very communities the corpus protects**: structural ring-detection (reciprocity density, cluster closure) is the signature of a faithful congregation or mutual-aid network, which ANNEX_D §D7.2 explicitly protects ("churches, worker cooperatives, family households, mutual aid... are not avoidance structures merely because they coordinate"). The fix the panel found is elegant: **the corpus already solved this** — ANNEX_AF §AF3 has structural collusion-detection *with* shared-hardship safe harbors, and ANNEX_AJ uses correlation as a *trigger* with a burden-shift and a data-purpose-limitation regime. Fix 2 is rebuilt below to *extend AF3/AJ to the civic layer*, not reinvent detection. Fix 1 gains three required patches (INV-004 clarification needed-not-optional; the Z5 counting rule; the Sybil note).

**Re-scope note.** Grounding retired the earlier "Voice has no binding teeth" weakness — Z2/Z6 already give Voice bounded budget prioritization and *deliberately* keep it advisory-only for survival-adjacent matters with a de-facto-control audit (correct design). Two genuine residuals remain.

---

## Fix 1 — A flat-equal Voice floor (worth not measured)

**The problem.** Voice is minted from contribution (ANNEX_Z Z2; INV-004). Z5's anti-meritocracy machinery is strong (no category >40%, care work admissible, diminishing returns) but there is no guaranteed *equal base* — a person who contributes nothing **measurable** (severely disabled, in acute crisis, intensively caregiving, a late entrant) gets little or no agenda-Voice. Agenda standing tracks measured contribution toward zero (tension with INV-003, "worth is not measured"), and minting requires per-person contribution measurement (a surveillance surface the misuse package flags).

**The fix — a flat-equal Voice base, with three panel-required guards.** Amend ANNEX_Z Z2:

> *(add)* **Equal Voice base.** Every confirmed present member receives an equal base Voice allocation each cycle, independent of any measured contribution; contribution-minted Voice is *added* above it and may never reduce a member below the base. The base requires no contribution measurement — only the increment does.
> - **Per-confirmed-natural-person; Sybil-gated.** The base is a per-confirmed-natural-person allocation that presumes and depends on the INV-001 non-duplication guarantee (one human → one confirmation). Because the base raises the prize a fake member would harvest, any weakening of identity-confirmation uniqueness is a material change to this base and triggers re-review. The base keeps the Z2 fast-decay/no-rollover property, so a dormant Sybil's harvest is capped at one live cycle, never a cumulative war chest.
> - **Z5 counting rule.** Base Voice is **category-neutral**: it counts in the Z5 denominator but never in any single-category numerator. The 40% category ceiling applies to contribution-minted Voice as a share of *total* effective Voice (base + increment) — so the base *enlarges* the denominator a would-be capturing class must beat, strengthening Z5 rather than diluting it.
> - **Non-trivial floor.** The base is a meaningful, non-trivial proportion of typical effective Voice; the increment's diminishing-returns parameters may not be tuned so as to shrink the base to ceremony.

This mirrors the survival-floor logic and operationalizes INV-004's "participation" limb.

**Required companion (Tier-1, not optional).** The corpus-fit check found that reading bare presence as INV-004's "participation" is a *stretch*, not airtight. So clarify INV-004 explicitly — **this is needed, not optional**:

> *(amend INV-004 Mechanical boundary)* "Participation" includes a confirmed member's presence in and standing for the deliberative cycle; this presence-participation earns the equal Voice base, while verified contribution earns the bounded increment above it. The base is not purchased and is not contribution-gated; it is the participation floor of a member of the body.

**Tier.** ANNEX_Z Z2 amendment (Tier-2) + the INV-004 clarification (Tier-1, required).

**Christ-centered note.** The widow's two mites, counted greatest though least measurable (Mark 12:41–44); the laborers of the eleventh hour paid the same (Matt 20:1–16). The floor is "worth not measured" (INV-003); the bounded increment is "to whom much is given, much is required" (Luke 12:48). The two coexist — the floor protects dignity, the increment honors stewardship; it does not bury the talent, it refuses to un-person the servant who had little to invest.

---

## Fix 2 — Enforce the firewall by *extending* AF3/AJ to the civic layer (not reinventing detection)

**The problem.** Z4 *legally* prohibits the composite score, external-data fusion, and even *requesting* civic balances; the Service Record Misuse test package *defines* the abuses (attestation rings, employer scoring) and demands an *effect-based*, "detectable, sanctionable, appealable, rare" control — but no bound detector exists, and the T-009 ring exploit is live.

**The fix — a Civic-Standing Misuse Detection & Enforcement protocol that INHERITS the corpus's existing, already-safeguarded machinery** (new governance instrument, patch P-074), built as an *extension* of ANNEX_AF §AF3 (hardship-attestation collusion detection) and ANNEX_AJ (correlation-trigger + burden-shift + data purpose-limitation) to the Voice/Service-Record civic layer:

1. **Ring detection — structure opens a look, never a finding (the D7.2 guard).** Extend AF3's structural collusion analytics (reciprocity density, cluster closure, timing, star-clusters) to the civic layer as a **screening prior only**. A structural flag may *not* reduce any balance or stake; it may only open an AF-style human review whose **default outcome is "honest community."** A finding requires affirmative D7.2-class evidence — *attestations traded, sold, or reciprocated for consideration; coordinated pause-cycling for gain; or hidden control* — never density alone. **Import D7.2 verbatim and add a dense-legitimate-community safe harbor:** *"A congregation, mutual-aid network, family, or cooperative that attests densely because its members genuinely know and serve one another is not a ring; coordinated mutual care is a protected pattern, not a detected one."* Membership in a protected community *raises* the evidentiary bar (mirroring AF3's community-disaster and slow-burn shared-hardship safe harbors). Structure-only → adverse action is a **prohibited automated determination** (INV-013 no-automated-deprivation logic).
2. **Composite detection — correlation triggers, the Z4 act sanctions (the AJ burden-shift).** Match ANNEX_AJ: outcome correlation that an actor sorts people by civic standing is a **trigger to investigate, never itself a sanction basis.** Sanction requires either (a) evidence of the Z4 prohibited act — a *request, receipt, or inference* of civic balances (independently detectable) — or (b) the institution failing the misuse-package Stage-6 burden-shift (once it has civic data, it must prove the decision did not use it). Pure correlation with no data-access predicate → no action (an employer who happens to hire conscientious people is not sanctioned).
3. **Data — inherit AF3/AJ purpose-limitation.** The detector's data is bound by the existing ANNEX_AJ / AF3 data-minimization regime: purpose-limited to misuse detection, PII-stripped at the earliest point, bounded retention then purge, access-limited to the enforcement body, never repurposed for scoring; only numeric thresholds may be restricted from publication. The detector inspects attestation *structure* and outcome *effects*, not persons' lives.
4. **Operation — separated, appealable, visible.** Operated under INV-006 separation-of-verification-and-benefit ("no apex unaudited"); all findings appealable to the Federated Ombuds (ANNEX_AI); flagged-community statistics published in aggregate so that selective targeting of a faith, minority, or dissident community is itself visible and auditable.

**Tier + process.** New governance instrument + patch **P-074** *(sequencing: after P-071/P-072/P-073; renumber if standalone)*; Tier-2 founding commitment, **gated on the Service Record Misuse Evidence Test Package as a blocking gate** — it must pass the package's effect-based test *and* the protected-community pass scenario, not merely assert detection.

**Christ-centered note.** This catches the false-witness reciprocity ring (Exod 20:16) and the secret scale that weighs persons (Prov 11:1) — *without* persecuting the gathered faithful who bear one another's burdens (Gal 6:2). The friendless, who have no ring, are never excluded *because* they have no ring (Matt 25:35–40); the protected error is mercy to the isolated, the safe harbor is mercy to the congregation.

---

## What is deliberately NOT changed

- Voice's advisory-only status on survival-adjacent matters (Z6) — survival is one-person-one-vote, never Voice.
- Service Record's slow decay + hardship-safe pause floor (Z3).
- The Z4 legal prohibition — Fix 2 *enforces* it by inheriting AF3/AJ, it does not replace it.

## Tier / FAP handling

- **Fix 1:** ANNEX_Z Z2 amendment (Tier-2) + INV-004 clarification (Tier-1, required) + the Z5-counting / Sybil / non-trivial-floor guards.
- **Fix 2:** Civic-Standing Misuse Detection protocol extending AF3/AJ + patch P-074 (Tier-2), gated on the Service Record Misuse test package.

Adds to the review-branch backlog (PR #78) and the decision index. First of the multi-instrument hardening pass; Essential Access and Shared Storehouse follow.
