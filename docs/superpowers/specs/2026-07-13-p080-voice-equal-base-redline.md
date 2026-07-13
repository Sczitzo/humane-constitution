# P-080 — Equal Voice Base: The Participation Floor

**Status: PROPOSED. `modifies_tier1=True`. FAP intake: HELD OPEN — blocked at AV1/AV3 (no standing adversarial panel member is seated; P-013 is not ACTIVE). This document is the complete intake package, prepared to the gate it cannot yet pass.**

*Origin: Fix 1 of the [Voice + Service Record hardening redline](2026-06-09-voice-service-record-hardening-redline.md) (panel-revised: adversarial, Christ-centered, corpus-fit), re-scoped to Voice-only by the owner decision of 2026-07-13 and formalized here as its own patch. This takes the patch number the re-scoped redline was holding ("next free above P-079"). Scope: Voice only. Compatible with Service Record both as it stands today and under the P-079 retirement direction — the base touches no Service Record mechanism.*

---

## In plain language

Today, a person earns Voice — the limited say in setting public priorities — through verified contribution. The anti-elitism machinery around it is strong (no category of work can dominate; care work counts; returns diminish). But there is a hole at the bottom: a person whose contribution can't be *measured* — someone severely disabled, in acute crisis, caring for a dying parent around the clock, or newly arrived — earns little or no Voice at all. Their say in public priorities drifts toward zero precisely when they most need to be heard. And measuring everyone's contribution to mint their Voice is itself a data-collection burden the design would rather shrink.

This proposal gives **every confirmed member an equal base of Voice each cycle — no measurement, no conditions** — with contribution-earned Voice added on top, never subtracted below. Like the survival floor, but for having a say: existence is enough to be heard; contribution earns more reach, never someone else's silence.

Three guards, from the panel that reviewed it: the base only works if one person can't pretend to be many (it leans on the identity system's one-person guarantee, and raises the prize for faking members — so any weakening of identity checks forces this to be re-reviewed); the base can't be gamed by any profession to dominate the agenda (it counts against would-be capturers, not for them); and the base must stay meaningful — it can't be quietly tuned down to a ceremony.

Like P-079, this changes a core protected promise (it clarifies what "participation" means in the invariant that says influence can't be purchased), so the project's own rules hold it at the gate until an independent adversarial reviewer exists to check it. The package waits there, complete and public.

---

## 1. What is proposed

1. **An equal Voice base** (amending ANNEX_Z Z2, Tier 2): every confirmed present member receives an equal base Voice allocation each cycle, independent of any measured contribution. Contribution-minted Voice is added above the base and may never reduce a member below it. The base requires no contribution measurement — only the increment does.
2. **The INV-004 clarification** (Tier 1, the panel marked this required, not optional): "participation" explicitly includes a confirmed member's presence in and standing for the deliberative cycle; presence-participation earns the equal base, verified contribution earns the bounded increment. The base is not purchased and is not contribution-gated.
3. **Three binding guards** (panel-required, part of the amendment text):
   - **Per-confirmed-natural-person; Sybil-gated.** The base presumes and depends on the INV-001 non-duplication guarantee. Because it raises the prize a fake member would harvest (T-002 interaction), any weakening of identity-confirmation uniqueness is a material change to the base and triggers re-review. The base keeps Z2's fast-decay/no-rollover property — a dormant Sybil's harvest is capped at one live cycle.
   - **Z5 counting rule.** Base Voice is category-neutral: it counts in the Z5 denominator but never in any single-category numerator. The 40% category ceiling applies to contribution-minted Voice as a share of *total* effective Voice — the base *enlarges* the denominator a would-be capturing class must beat, strengthening Z5.
   - **Non-trivial floor.** The base is a meaningful, non-trivial proportion of typical effective Voice; the increment's diminishing-returns parameters may not be tuned so as to shrink the base to ceremony.

**Full amendment text:** quoted verbatim in the [source redline, Fix 1](2026-06-09-voice-service-record-hardening-redline.md) — that text, as panel-revised, is the text of this patch (AV4: the thing attested must be the thing adopted).

## 2. Framework-first intake statement (P-073)

This proposal takes **path (1): extend the most general existing instrument.** It amends ANNEX_Z Z2 (Voice minting) and clarifies INV-004; it creates **no** new register, detector, panel, office, or standing personnel. Under the no-laundering rule, the extension is assessed at the tier of what it touches: Tier 1 for the INV-004 clarification (assessed in §3), Tier 2 for the Z2 amendment.

Footprint check: the extension *reduces* the system's data footprint at the margin — the base requires no contribution measurement, so the measured-minting surface (a flagged surveillance concern in the retired Service Record misuse package's Voice sections) shrinks as a share of total Voice. It adds no data collection, no coercive power, and no gatekeeping power; it removes a gatekeeping *effect* (measurability as a precondition for having a say).

Deletion answer to the standing intake question ("what could this proposal delete?"): nothing directly, but it *obviates* future patch-machinery — the class of grace/hardship accommodations that would otherwise be needed for members whose contribution is unmeasurable, the same patch-on-patch pattern P-079 retires on the Service Record side.

## 3. Tier 1 assessment (`modifies_tier1=True`)

- **INV-004 (Influence Cannot Be Purchased):** the Mechanical boundary gains the participation clarification quoted in the source redline. The panel's corpus-fit review found that reading bare presence as INV-004's "participation" without this text is a stretch, not airtight — the clarification closes an interpretive gap rather than changing the invariant's direction. It is nonetheless a Tier 1 text change and is treated as one.
- **No other invariant text changes.** INV-003 is *served* by the change (agenda standing no longer tracks measured contribution toward zero, which the panel flagged as a worth-measurement tension); its text is untouched.

**Gate consequence (AV1/AV3):** no adversarial panel member is seated; P-013 is not ACTIVE; intake may not open. Queue position held open indefinitely; no reviewer may waive (AV2).

## 4. Christ-centered review (required for any proposed change to `docs/constitution/`)

- **Christ-centered alignment:** The widow's two mites counted greatest though least measurable (Mark 12:41–44); the eleventh-hour laborers paid the same (Matt 20:1–16). The base is "worth not measured" made operational: the person who can contribute nothing measurable is not thereby voiceless. The bounded increment honors stewardship (Luke 12:48) without un-personing the servant who had little to invest — the floor and the increment coexist as mercy and stewardship do.
- **Babel-risk warning:** Low for the base itself — an equal floor concentrates nothing. The residual Babel surface is the *increment's* parameter-tuning: quiet retuning of diminishing-returns curves to shrink the base's relative weight is the capture path, which is exactly what the non-trivial-floor guard exists to block. Watch the parameter, not the principle.
- **Human dignity test:** Strengthened directly. The severely disabled person, the full-time carer, the person in crisis, and the late entrant hold standing to be heard without first proving measurable usefulness — dignity is not means-tested into the agenda. The Sybil guard protects this rather than undermining it: one-person-one-base is what makes each real person's base meaningful.
- **Revision proposal:** None beyond the panel's three guards, which are adopted as binding text. One implementation note carried into the evidence gates: the "confirmed present member" predicate must not itself become a participation test (attendance policing); presence means membership standing in the cycle, not activity monitoring.
- **Fruit test:** Expected fruit: agenda input from people the measured system renders invisible; reduced contribution-measurement surface; a Voice instrument whose floor mirrors the survival floor's logic (existence suffices). Bad fruit to watch for: Sybil harvesting if identity confirmation weakens (bounded to one cycle by fast decay); base-dilution via increment inflation (blocked by the Z5 counting rule and non-trivial-floor guard).

This review assesses consistency with Jesus' teachings; it does not claim divine endorsement.

## 5. Evidence gates required before this patch could reach ACTIVE (if intake ever opens)

1. Adversarial-panel attestation (AV1) against the source redline's Fix 1 text.
2. Sybil-economics check: published analysis (or simulation) that one-cycle base harvest at the bound base size stays below the cost of defeating identity confirmation — the base must not become the economic engine of T-002.
3. Non-trivial-floor binding: the base's proportion of typical effective Voice bound as a founding commitment (a reserved FC), not left to operator tuning.
4. Deliberation drill: at least one pilot Voice cycle demonstrating that base-only members (no measurable contribution) can in practice place items on the agenda — the floor must be shown real, not nominal.
5. No-attendance-policing check: evidence that "confirmed present member" is implemented as membership standing, not activity surveillance.

## 6. Open item carried, not designed here

The source redline's Fix 2 residual — enforcement against third parties (employers, landlords, platforms) requesting, receiving, or inferring **Voice** balances — remains open and is *not* part of this patch. It becomes more tractable if the P-079 retirement direction proceeds (the civic-misuse surface shrinks to Voice alone) and should be designed then, extending the AF3/AJ correlation-trigger machinery per the original panel finding. Recorded here so it is not lost when the source redline is archived.

## 7. Intake record

Submitted to the FAP queue 2026-07-13 with `modifies_tier1=True`, taking the number the re-scoped Voice redline held. **Held at AV1/AV3: no standing adversarial panel member exists to attest; P-013 is not ACTIVE.** No technical review has begun. The queue now holds two Tier-1-touching proposals (P-079, P-080) waiting on the same missing seat — a growing, public measure of exactly how much design progress is blocked on founding legitimacy.
