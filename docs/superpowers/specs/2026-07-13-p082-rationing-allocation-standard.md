# P-082 — Rationing Allocation Standard (Companion Instrument)

**Status: PROPOSED, pilot-gated. `modifies_tier1=False` — no invariant text and no ANNEX_Y/ANNEX_AQ text changes. Intake path: companion governance instrument, same as P-081.**

*Origin: the [Shared Storehouse hardening redline](2026-06-09-shared-storehouse-hardening-redline.md) (panel-revised: adversarial, Christ-centered, corpus-fit) — the final instrument of the hardening pass. The instrument itself: [Rationing Allocation Standard](../../governance/Rationing_Allocation_Standard.md). The redline's declared dependency — a defined clinical-custodian role — is satisfied by P-081 (EADS-2).*

---

## In plain language

The scarcity rules already say something rare and honest: when there genuinely isn't enough, the system must ration openly instead of letting prices decide, and it must share what exists "by equal share to need." But two hard cases were left unwritten. What exactly does "to need" mean when the shares are being cut below everyone's minimum? And who gets the last ventilator when it cannot be shared at all?

Unwritten rules fail at the worst possible moment, in the worst possible way: someone powerful decides in the heat of the crisis, and the weakest lose. This patch writes both rules down, in calm, before anyone knows who they'll apply to.

For shortfalls: everyone's share shrinks *in proportion to their own real minimum* — the pregnant woman's larger minimum, the laborer's, the child's formula, all carry through the cut automatically. Extra needs (like dialysis or insulin dependence) are recognized through categories defined and published *before* any crisis, and nobody may invent or delete a category while rationing is active. People injured *during* the crisis are covered by an emergency attestation path that is audited afterward — the wounded are served first and the cheaters caught later, not the reverse.

For indivisible things: a doctor judges only one narrow question — *is this treatment likely to work right now, for this person* — and within everyone it could work for, a transparent, tamper-evident lottery decides. Never age as such, never disability, never "quality of life," never how long someone might live afterward, never wealth or standing. The review panel's own words: real-world triage has used exactly those measures to push the disabled and elderly to the back of the line, and that bar is this rule's moral center, not a technical footnote.

## 1. Framework-first intake statement (P-073)

- **Not a duplicate.** The corpus-fit review confirmed no indivisible-goods rule exists anywhere in the corpus, and the manna rule's sub-CSM mechanism is unbound — this supplies functions no existing mechanism performs, which P-073 expressly recognizes as non-duplicative.
- **No new bodies.** Both rules operate through existing organs: the P-081 clinical custodian (attestation and band assignment), the Federated Ombuds (post-hoc audit, skew audit), the Article VII dashboard (tier-prevalence publication), and the appeal spine (ANNEX_L §L7 — cited, not restated). The standard adds rules, not offices.
- **Deletion answer.** What this deletes is *discretion at the moment of maximum stakes* — the in-crisis authority to invent triage, re-weight tiers, or steer an indivisible good, which is the emergency-power capture surface (T-014 family). Crisis-time is left arithmetic and the lot.
- **Companion path.** Same resolution as P-081: ANNEX_Y's header/§Y5 amendment ambiguity is not engaged; ANNEX_AQ and ANNEX_Y are untouched and govern on any conflict.

## 2. Tier assessment

`modifies_tier1=False`. INV-005's manna-rule sentence is untouched — this standard is the mechanism that sentence already requires ("distributed by equal share to need"); supplying a bound mechanism for existing invariant text is not an invariant modification. §Y1.1's Tier-1 locked numbers are *inputs* to RAS-1's pro-rata rule, never altered by it. Tier 2, pilot-gated. Not held at AV1.

**Dependency declared and satisfied:** the clinical-custodian role is defined in P-081 (EADS-2). Per the source redline's own contingency, if P-081 were withdrawn, the custodian definition moves into this standard; while both are PROPOSED, P-082's evidence gates cannot complete before P-081's custodian exists in at least drill form. Recorded so the dependency ordering is auditable.

## 3. Christ-centered review

- **Christ-centered alignment:** The manna fell equally, yet "each gathered according to his need... he that gathered much had nothing over, and he that gathered little had no lack" (Exod 16:18) — RAS-1 binds both halves of that sentence together. The lot fell to Matthias after discernment of qualification (Acts 1:26) — band-then-lot confines judgment to where judgment belongs and lets chance replace partiality (Prov 18:18). Matthew 25 is the standard's negative test: any rule that would triage "the least of these" last is the rule this standard exists to forbid.
- **Babel-risk warning:** The tier system is the residual surface — a captured calm-time tier-definition process could privilege a faction's ailments, or tier-inflation could dilute the base. Named defenses: published categories/weights/caps, disability-representative review, the anomaly trigger on tier prevalence, re-verification cadence, and the crisis-time freeze. The custodian's band assignments are the other surface — answered by demographic-skew audits and the committed-before-randomness lottery log.
- **Human dignity test:** This standard exists *for* the dignity test. The flat-cut alternative starves the highest-need first; the discretion alternative ranks lives by usefulness. Pro-rata-of-own-minimum and intervention-success-only bands are the two allocation rules that never ask what a person is worth — only what their body needs and whether this treatment works. The QALY bar (no life-expectancy, disability, or quality-of-life scoring) is the strongest INV-003 enforcement anywhere in the corpus.
- **Revision proposal:** None beyond the panel's revisions, adopted in full. One emphasis carried to the gates: the surge protocol's retroactive slashing must be tested for chilling effects — a custodian afraid of post-hoc punishment may under-attest in a real surge; the drill must measure attestation latency under audit pressure, not just fraud caught.
- **Fruit test:** Expected: a shortage that arrives finds rules already written; the disabled and elderly stand in the same lottery as everyone their treatment would help; no official acquires triage power worth capturing. Bad fruit to watch: tier-list politics in calm time (visible on the dashboard); custodian bottleneck in surge (measured in the drill); lottery legitimacy failures if the public cannot verify the draw (the dual-source randomness and committed log exist for this — the drill must include a public-verification exercise).

## 4. Evidence gates before ACTIVE

1. **Full §Y4 allocation drill** on synthetic population data: capacity cut below aggregate CSM, RAS-1 pro-rata computed across §Y1.1 adjustments and at least two supplement tiers, with published before/after distributions — the simulation harness in `simulations/` (which already models capacity-gated redemption and random-rotation shortfall) is the natural instrument; RAS-1 replaces its random rotation with the pro-rata rule and measures who bears the shortfall.
2. **Band-assignment skew audit** in drill: custodian assigns bands on synthetic clinical profiles; distributions audited for demographic skew per the Ombuds procedure.
3. **Committed-lottery integrity test:** commitment-before-randomness verified cryptographically; a red team attempts pool-manipulation (nudging a favorite into a thinner band after seeing entropy) and the log must catch it.
4. **Surge-protocol drill:** batch attestation under mass-casualty assumptions; measures both false-attestation capture (retroactive audit) and attestation latency / custodian chilling under audit pressure.
5. **Tier-inflation tripwire test:** synthetic coordinated tier-acquisition in calm time must trip the published anomaly trigger before base dilution exceeds the published cap.
6. **P-081 dependency:** the clinical-custodian role exercised in at least drill form before gates 2–4 can complete.

## 5. Intake record

Submitted 2026-07-13 as a Tier-2 companion-instrument patch. The instrument enters the corpus as `Designed`; the patch is PROPOSED and pilot-gated; not held at AV1. **This completes the instrument-hardening pass** — money (Commons Return, upstream), Voice (P-080), Service Record (P-079 retirement direction), Essential Access delivery (P-081), and Shared Storehouse allocation (this patch) — with every proposal either dispositioned or formally queued, and nothing left silently held.
