# Scope Statement + Interface Invariants — ready-to-apply INVARIANTS.md redline

**Status:** Incorporated on branch `design/phase2-pilots-and-instrument-panels` after explicit human approval (`proceed`, 2026-06-04). This document remains the review record and source redline for the Tier-1 scope/interface amendment.

**Source decision:** [Scope Boundary Doctrine](./2026-06-04-scope-boundary-doctrine.md) (Proposed). That doctrine chose framing 3: *declare the boundary AND bind the interface* — state plainly that the Humane Constitution is a fiscal-civic layer presupposing and constraining a host rule-of-law polity, and specify the non-negotiable invariants the host's force/justice/membership systems must satisfy or the layer's walls are void.

**What this document is.** The review record and source redline against `docs/constitution/INVARIANTS.md`, written in that file's exact house style, plus the front-door scope blurb, the FAP/Tier-1 handling note quoting the corpus's own bar, and the full Christ-centered ethical review required by `.claude/rules/constitution-review.md`. Applying it is a Tier-1 amendment requiring the process named in Part 3.

---

## Part 0 — Summary of what the redline does

1. Adds a **Scope Statement** block immediately after the existing `## Foundational Premise` section (an addition *alongside* the Premise, not a rewrite of it).
2. Adds six new invariants — **INV-014 through INV-019** — as the *interface invariants* binding the host order. They are placed after INV-013 (the last numbered general invariant) and before the `## Open Question` section. INV-LAUNCH-1, INV-012, and INV-013 keep their numbers; nothing is renumbered.
3. Adds six rows (numbered 14–19) to the `## Invariant Violation Detection` enumerated list, matching the existing 1–13 pattern.
4. Updates the `## Plain-Language Guide` bullet list with one new line covering the interface (optional but recommended — shown as a separate sub-redline so it can be accepted independently).

**Numbering rationale.** The highest existing general invariant is INV-013. INV-LAUNCH-1 is a one-time activation gate, not part of the running numeric sequence, so the next free integers are INV-014…INV-019. No existing cross-reference points to a number ≥ 014, so **no renumbering or cross-reference rewrite is implied** elsewhere in the corpus. The new entries do reference existing anchors (INV-001, INV-006's "no apex sits unaudited," INV-002, INV-013) — those references are one-directional and require no edits to the cited invariants.

---

## Part 1 — Exact INVARIANTS.md redline

Each redline below shows the **anchor text it follows** (existing, unchanged — for locating the insertion point) and the **new text to insert**. Insert only the new text.

### 1a — Scope Statement (addition alongside the Foundational Premise)

**Anchor — insert immediately AFTER this existing block:**

```
## Foundational Premise

Every person has inherent and equal worth that this system does not confer and cannot revoke — a worth the founders understand as belonging to each person as a bearer of the image of God, which they do not claim the authority to define, only the duty to protect. These invariants exist to serve persons; no rule or institution may be revered above the people it was made to protect.

---
```

**New text to insert (a new `## Scope` section between the Foundational Premise and INV-001):**

```markdown
## Scope — What This Constitution Is, and Is Not

The Humane Constitution is a fiscal-civic layer. It governs market money (Flow), the survival floor (Essential Access), accumulated wealth, scarcity rationing (Shared Storehouse), and civic priority and public-role eligibility (Voice, Service Record). It does **not** supply, and does not claim, the monopoly on legitimate force, a criminal or civil justice system, or the authority to define who is a member of the polity. It presupposes a host rule-of-law order to provide these, and it binds that order with the interface invariants (INV-014 through INV-019) below. Where a host order violates those invariants, this design does not claim legitimacy or operability within it.

This boundary is scope-independent: it holds for a pilot inside an existing state and for a full society coexisting with a rule-of-law polity. The layer never itself becomes the sovereign that wields force. Declaring this is not a retreat from the design's ambition but its humility made structural — a framework that claimed the power to police and punish as well as to allocate would be exactly the concentration the walls exist to prevent.

This Scope section is descriptive of the boundary; the interface invariants below carry its binding force. It elevates to a scale-independent constitutional statement what the Jurisdiction Interface Clause already concedes at pilot scale (that this design "does not establish a sovereign state, a court of law, or a law enforcement authority"), and it adds the interface invariants that clause lacks.

---
```

> Note for the human reviewer: the existing `---` separator that currently sits between the Foundational Premise and `## INV-001` is preserved as the separator *below* the new Scope section. Net effect: Premise → `---` → Scope → `---` → INV-001.

### 1b — Six interface invariants (INV-014 … INV-019)

**Anchor — insert immediately AFTER the end of the existing INV-013 block** (which ends with its "Attack vectors that target this invariant:" line) **and BEFORE the existing `## Open Question` section.**

The existing text directly preceding the insertion point is:

```
**Attack vectors that target this invariant:** T-007 (definition drift), implementation drift turning provisional flags into de facto denials, fraud-control overreach.

---
```

**New text to insert (six full invariant blocks, then a `---` before `## Open Question`):**

```markdown
## Interface Invariants — Binding the Host Order

INV-014 through INV-019 are *interface invariants*. They do not govern the five instruments directly; they bind whatever host order supplies force, justice, and membership — the functions this layer deliberately does not constitute (see Scope). They are the contract the host must meet for the walls to mean anything. A host that breaches them voids this design's claim to legitimacy and operability within it. They are Tier 1 and carry the same protection and amendment threshold as INV-001 through INV-013.

## INV-014 — Force May Never Gate Survival

**Statement:** No coercive, policing, or justice authority — host or layer — may use deprivation of Essential Access (food, water, shelter, medicine) as a tool of punishment, coercion, leverage, or control. The Constitutional Survival Minimum reaches the imprisoned, the accused, the convicted, and the sanctioned without exception. Survival is never a lever.

**Mechanical boundary:** Detention, sanction, conviction, accusation, or any exercise of legitimate force may not reduce a person's Essential Access below the CSM floor. The floor follows the person into custody and through punishment. No host process may condition restoration of the floor on compliance, confession, or cooperation.

**Why this matters:** A justice system that can starve is a justice system that can compel anything. If the host may withhold survival as part of punishment, every wall this layer builds around survival is decorative — the coercive apparatus reopens the Survival-Trade Bind from outside the layer. The floor must reach precisely the people a system is most tempted to treat as exceptions.

**Attack vectors that target this invariant:** Host-side punitive deprivation (carceral starvation, sanction-by-withholding); definition drift reclassifying punishment as a capacity dispute to evade INV-001; implementation drift treating custody as a survival-floor exemption.

## INV-015 — Punishment May Suspend Liberty, Never Breach the Floor

**Statement:** A host justice system may restrict liberty, movement, and Voice as punishment. It may never push a person below the survival floor, nor confiscate a person below the participation floor. There is no civil or criminal death by starvation or by destitution.

**Mechanical boundary:** Permitted punitive measures: restriction of liberty and movement; suspension of Voice and civic standing. Prohibited as punishment: any reduction of Essential Access below CSM (INV-001, INV-014); any fine, forfeiture, restitution, or asset confiscation that brings the person below the household savings floor (S) as protected under INV-009. Confiscation above the floor is a host matter; confiscation through the floor is void.

**Why this matters:** Liberty can be restored; a person starved or stripped to destitution as punishment is harmed in a way the system promises never to inflict. Distinguishing what punishment *may* take (liberty, Voice) from what it *may never* take (survival, the participation floor) keeps the floor unconditional even against legitimate judgment.

**Attack vectors that target this invariant:** Punitive fines or restitution calibrated to breach the floor; forfeiture regimes that strip below-floor households; sanction structures that suspend liberty in name but starvation in effect.

## INV-016 — Membership Is Non-Convertible

**Statement:** The host order defines who belongs to the polity. Membership — and the Voice, survival floor, and any commons dividend that attach to it — may never be bought, sold, rented, pledged, or inherited as a tradable asset. Citizenship is not a market good.

**Mechanical boundary:** No market, contract, proxy transaction, or system state may create a conversion pathway between Flow or wealth and membership standing, by analogy to and extension of INV-002 (instrument non-convertibility) and INV-004 (influence cannot be purchased). The host may grant, define, or revoke membership by its own lawful process; it may not operate or sanction a market in it. Membership obtained or transferred through a prohibited conversion confers no Voice, floor priority, or dividend within the layer.

**Why this matters:** If belonging itself becomes purchasable, the wealthy buy the demos and every downstream non-convertibility wall fails at its root. The floor and Voice are attached to personhood-in-the-polity, not to a saleable title; a market in membership would convert the Power-Wealth Convergence the layer exists to prevent into a one-step purchase.

**Attack vectors that target this invariant:** Citizenship-by-investment schemes routed through the host; inheritance of membership-as-asset; rental or proxy arrangements that lease civic standing for Flow.

## INV-017 — The Holders of Force Are Inside the Walls, Not Above Them

**Statement:** Whoever wields legitimate force is bound by the same non-convertibility as every other person and is subject to the same audit. Force may not be converted into Flow, wealth, Voice, or survival advantage — no extortion, no sale of protection, no purchase of immunity — and the coercive apparatus is subject to the "no apex sits unaudited" rule (INV-006).

**Mechanical boundary:** No entity holding coercive or justice authority may (a) convert that authority into Flow, wealth, Voice, Service Record standing, or above-floor survival advantage, or accept any such conversion; or (b) sit unaudited. Every body holding force is auditable by a party structurally independent of it, on the same terms INV-006 imposes on verification, oracle, and keyholder authority. Immunity from audit is itself a prohibited conversion of force into standing.

**Why this matters:** The capstone's gravest finding was that capturing the coercive apparatus makes every other wall decorative. This invariant places the holders of force *inside* the same non-convertibility and audit walls as everyone else, so legitimate force cannot become a private revenue or a private immunity. It is the structural form of authority-as-service rather than authority-as-lordship.

**Attack vectors that target this invariant:** Protection rackets and shakedowns by force-holders; purchased immunity or selective enforcement; an unaudited security or carceral apex; force converted into civic or market advantage.

## INV-018 — Due Process Before Any Withholding

**Statement:** No instrument or authority — host or layer — may withhold a survival-floor entitlement without a contemporaneous, accessible, human-reviewed appeal path, and the floor is provided during that appeal, not withheld pending it. This extends INV-013 (survival access has a human remedy) across the layer's boundary to every host authority that can touch the floor.

**Mechanical boundary:** Any host-side denial, reduction, suspension, delay, or flag that withholds a person's CSM — including for suspected crime, security designation, immigration status, or identity-verification failure — carries an appeal that is (a) reachable without identity, documents, literacy, or fee; (b) decided by a named human within a published maximum window; and (c) resolved toward provision while pending. A withholding issued with no open appeal path is void, regardless of which authority issued it.

**Why this matters:** An unconditional floor with no remedy is unconditional only until the machinery — or a host authority — makes a mistake. Carrying INV-013's "provide first, verify second" guarantee across the interface keeps the host from doing through process what INV-014 forbids it to do by punishment.

**Attack vectors that target this invariant:** Host authorities withholding the floor under security or fraud exceptions with no appeal; provisional flags hardening into de facto denials at the boundary; appeal paths that exist on paper but require identity, fee, or literacy.

## INV-019 — Children and the Incapacitated Retain the Floor and a Guardian of Last Resort

**Statement:** The survival floor reaches children and persons unable to act for themselves regardless of guardian status, custody, documentation, or identity. The host order must supply child protection and guardianship of last resort, but may never use guardianship, custody, or protective authority to gate, reduce, or condition the floor.

**Mechanical boundary:** A child's or incapacitated person's CSM allocation is presence-triggered and is never contingent on a guardian's status, conduct, identity, or cooperation. Where no competent guardian exists or a guardian is the source of harm, the host must provide a guardian of last resort; the absence or failure of a guardian may not interrupt the floor. Protective or custodial authority over the person may not be exercised so as to withhold survival access.

**Why this matters:** Children and the incapacitated are the people most easily made exceptions, because they cannot assert their own claim. Attaching the floor to their presence rather than to a guardian's standing, and requiring a guardian of last resort the host must fill, keeps the most vulnerable inside the unconditional guarantee rather than at the mercy of whoever holds custody.

**Attack vectors that target this invariant:** Floor withheld for want of guardian documentation; custody disputes used to interrupt a child's survival access; protective authority weaponized to coerce a guardian by depriving a dependent.

---
```

> Note for the human reviewer: the `---` immediately above closes the interface-invariant block. The existing `## Open Question` section follows it unchanged. The existing `---` that currently sits after INV-013 and before `## Open Question` is consumed as the separator *above* the new `## Interface Invariants` heading.

### 1c — Violation-detection rows (additions 14–19)

**Anchor — the existing enumerated list under `## Invariant Violation Detection` currently ends at item 13:**

```
13. Would allow a survival-floor denial or reduction to stand without an accessible human appeal, or would withhold the survival floor during that appeal (violates INV-013)

...is rejected at intake without proceeding to technical review. The FAP reviewer documents the violation by invariant ID.
```

**New text to insert (six rows added immediately after item 13, before the "...is rejected at intake" line):**

```markdown
14. Would permit a coercive, policing, or justice authority to reduce Essential Access below the CSM floor as punishment, coercion, leverage, or control (violates INV-014)
15. Would permit punishment to push a person below the survival floor, or confiscation below the participation floor (violates INV-015)
16. Would create or sanction a market, inheritance, or proxy pathway in polity membership (violates INV-016)
17. Would convert legitimate force into Flow, wealth, Voice, or survival advantage, or exempt a force-holding body from independent audit (violates INV-017)
18. Would permit a host authority to withhold a survival-floor entitlement without a contemporaneous human appeal, or withhold the floor during that appeal (violates INV-018)
19. Would gate, reduce, or condition the floor for a child or incapacitated person on guardian status, or leave them without a guardian of last resort (violates INV-019)
```

> Note: these six items describe host-order breaches and layer-internal proposals alike. A FAP proposal that would weaken the layer's enforcement of any interface invariant is rejected at intake exactly as items 1–13 are; a host-order breach voids the layer's claim to legitimacy per the Scope section rather than being a FAP-intake event (the layer cannot reject a host's law — it withdraws from it).

### 1d — Plain-Language Guide line (optional, recommended; accept independently)

**Anchor — the existing bullet list under `## Plain-Language Guide` ends with:**

```
- These rules cannot be weakened by ordinary votes or inside procedures.
```

**New bullet to insert immediately after it:**

```markdown
- This is a fiscal-civic layer, not a whole government: it does not run the police, the courts, or decide who belongs — but it binds whoever does, so force can never starve a person, punishment can never breach the floor, belonging can never be bought, and the people who hold force live inside the same walls as everyone else.
```

---

## Part 2 — Front-door scope statement (00_start_here-style, plain version)

A 2–3 sentence plain-language version for the public entry document:

> **What this is — and isn't.** The Humane Constitution is a fiscal-civic layer: it governs money, the survival floor, accumulated wealth, scarcity, and civic priority — not the police, the courts, or who counts as a member of the polity. It assumes a surrounding rule-of-law society provides those, and it binds that society with a short list of non-negotiable limits: force may never be used to starve a person, punishment may suspend liberty but never breach the survival floor, belonging may never be bought or sold, and the people who hold force live inside the same walls as everyone else. Where a host society breaks those limits, this design does not claim to work there.

---

## Part 3 — FAP / Tier handling note (what the corpus itself requires)

These six invariants and the Scope statement are proposed as **Tier 1**. They therefore inherit the corpus's own Tier-1 amendment bar. Quoting what `docs/constitution/INVARIANTS.md` and the acceptance machinery actually say (not an invented process):

- **Tier-1 amendment threshold (INVARIANTS.md header + INV-007).** Tier 1 is "changeable only via the Tier 1 amendment process — **7-of-9 keyholder signatures (FC-110) and a 180-day timelock (FC-111)**." No Tier 2 or Tier 3 process may alter a Tier 1 parameter. FC-110 and FC-111 are themselves Tier 1; changing the amendment mechanism itself requires **H-3 refounding authority** (a full constitutional convention). P-014, the founding instrument, is permanently closed.
- **Two-key architectural precondition (INV-007 / P-034 / ANNEX_AV §AV1).** Because adding Tier-1 invariants is a Tier-1-touching change, the introducing patch must be **tagged `modifies_tier1=True`** and **carry a cryptographic attestation from the standing adversarial panel member** (nominated per AH2.3) **before it enters FAP intake**. The FAP reviewer cannot waive this; absence of the attestation is an automatic, non-reviewable rejection at intake. The attestation envelope format is ANNEX_AV §AV8; intake verification is ANNEX_AV §AV9.
- **Human attestation (INV-011).** The amendment may be prepared, drafted, routed, or summarized by automated process, but **execution requires a named, conflict-screened natural person or panel**, a conflict disclosure published before attestation, and the attestation record publicly available within 24 hours.
- **Constitution-review gate (this repo's `.claude/rules/constitution-review.md`).** Any change to `docs/constitution/` must carry the Christ-centered ethical review. That review is supplied in full in Part 4 below, so this gate is pre-satisfied for the reviewer's record.
- **Scale note.** The Scope section is descriptive; the binding force lives in INV-014…INV-019. A reviewer who wished to adopt the Scope statement as guidance while deferring the invariants to a later Tier-1 cycle could accept Part 2 / sub-redline 1a as documentation first — but the doctrine's whole point (framing 3) is that the boundary without the invariants is "honest but toothless," so splitting them is discouraged.

**Bottom line for the human:** to move this from proposal to constitution requires a `modifies_tier1=True` patch with adversarial-panel attestation at intake, 7-of-9 keyholder signatures, a 180-day timelock, and named human attestation on execution — plus the Christ-centered review (below). Nothing short of that may incorporate these invariants. This document does none of it; it only makes the eventual approval paste-ready.

---

## Part 4 — Full Christ-centered ethical review

Per `.claude/rules/constitution-review.md`. The Constitution is treated as a human-made, corrigible framework subordinate to Christ's teachings — not Scripture, not revelation. This review assesses *consistency* with Jesus' teachings; it does not claim divine endorsement. The eight questions are answered for the package as a whole, then the five required outputs are given, with each interface invariant assessed against the lens.

### The eight questions

1. **Love of God and neighbor (Matt 22:37–40).** The package's center of gravity is the neighbor: it forbids using survival as a weapon (INV-014), forbids punishment that destroys rather than restrains (INV-015), protects the bought-and-sold from a market in belonging (INV-016), and shelters the child and the incapacitated (INV-019). Love of God appears as restraint — the design refuses to make itself the final arbiter of force and membership, leaving room for an order it does not claim to be. Consistent.
2. **Serve people, not exalt the system or its authorities (Mark 10:42–45; John 13:12–17).** INV-017 is the clearest service-not-lordship move in the corpus: those who hold force are placed *under* the same walls and the same audit as everyone else — "not so among you... whoever would be great among you must be your servant." The Scope statement's self-limitation ("it never itself becomes the sovereign that wields force") is the design declining to lord it over the polity. Strongly consistent.
3. **Protect the vulnerable, poor, outcast, burdened (Matt 25:35–40; Luke 4:18–19).** The prisoner ("I was in prison and you came to me"), the accused, the destitute, the child, and the incapacitated are named explicitly as those the floor must still reach (INV-014, 015, 018, 019). This is the precise list of those a system is tempted to make exceptions of, and the package makes them the rule. Strongly consistent — echoes Isaiah 10:1–2's woe against those who "turn aside the needy from judgment."
4. **Truth, mercy, justice, forgiveness, reconciliation (Matt 5–7; Matt 18:21–35).** Justice is honored (the host *may* restrict liberty and Voice — wrongdoing has consequence) while mercy bounds it (it may never breach the floor). INV-015's "liberty can be restored; a person starved is harmed in a way the system promises never to inflict" keeps the door to reconciliation open — punishment that does not destroy leaves room for return, unlike the unforgiving servant's logic Jesus condemns. Consistent. One caution under truth: see the Babel-risk note on enforceability — the package must not *claim* to protect prisoners it has no power to reach.
5. **Human dignity, not reducing persons to data/compliance (Gen 1:26–27; Matt 7:12).** The floor is attached to *presence and personhood*, not to status, documentation, guardian standing, or compliance (INV-014, 018, 019). INV-018 explicitly forbids requiring identity, documents, literacy, or fee to appeal a withholding — the person is not reduced to a record. INV-016 refuses to let a person's belonging become a tradable datum. Consistent and protective. Do-unto-others (Matt 7:12) is structurally encoded in INV-017: force-holders live under the rules they enforce.
6. **Resist Babel — pride, domination, coercive unity (Gen 11; Matt 6:1–6).** This is the package's strongest theme and the doctrine's explicit aim. By refusing to constitute force/justice/membership itself, the design declines the very tower-building — "let us make us a name" — that a self-described complete government would be. INV-017 forbids the concentration (force + wealth + immunity) that is Babel's economic form. Strongly consistent — the package *reduces* Babel risk.
7. **Good fruit in practice (Matt 7:15–20; Gal 5:22–23).** Likely fruit: a survival floor no punishment can breach; force held accountable; a humbler, more honest public claim; the most vulnerable kept inside the guarantee. The tree is known by this fruit. The risk to the fruit (named below) is a host that signs the invariants and violates them in practice — words without fruit.
8. **Open to correction, repentance, wise counsel (Matt 18:15–20; Prov 11:14).** The package enters through a process built around correction: adversarial-panel attestation, a 180-day timelock (time for second thought and counsel — "in the multitude of counsellors there is safety"), named human accountability, and the standing "no apex unaudited" rule extended to force. It is presented as a *proposal awaiting approval*, not a fait accompli. Consistent.

### The five required outputs

**Christ-centered alignment.** The package aligns closely with Jesus' teaching on authority and the vulnerable. Its governing instinct — that no power, including force, sits above the floor of mercy owed to the least — tracks Matthew 25 and Mark 10:42–45. Its self-limitation tracks the rejection of Babel (Gen 11) and of self-display (Matt 6). Per invariant: **INV-014** (mercy's floor under judgment, Matt 25:35–40, Isa 10:1–2); **INV-015** (proportionate justice that leaves room for restoration, Matt 18:21–35); **INV-016** (persons not for sale — belonging is not a commodity, cf. the condemnation of trafficking in souls, Rev 18:13 as moral echo); **INV-017** (servant-authority, Mark 10:42–45; do-unto-others, Matt 7:12); **INV-018** (the lost sheep pursued, no one written off by machinery, Matt 18:12–14); **INV-019** ("whoever receives one such child receives me," Matt 18:5; the floor reaches those who cannot claim it).

**Babel-risk warning.** The invariants themselves *lower* Babel risk by forbidding the force/wealth/immunity concentration and by the design declining sovereignty. The residual Babel risk is subtler and lives in the *claim*: a layer that announces it "binds" the holders of force could mistake a written invariant for actual restraint, and so build a tower of paper authority over powers it cannot in fact compel. Mitigation already in the doctrine: pair the invariants with the audit / "no apex unaudited" machinery (INV-017 does this) and state plainly that breach *voids the layer's claim to legitimacy* rather than pretending the layer can punish the breach. Keep the language in the Scope section ("does not claim... operability") rather than any language implying enforcement power the layer lacks. The redline above is written to that standard; reviewers should resist any future edit that upgrades "binds / voids legitimacy" into "compels / enforces."

**Human dignity test.** Passes, and strengthens the existing dignity floor. No invariant reduces a person to data or compliance; several actively forbid it (INV-018's no-identity/no-fee appeal; INV-019's presence-trigger independent of documentation; INV-016's refusal of a market in personhood-in-the-polity). The dignity most at risk in any justice interface — that of the prisoner, the accused, the undocumented child — is precisely what INV-014, 018, and 019 protect.

**Revision proposal.** The redline text is already conformed to the house style and to the cautions above. Two concrete language safeguards are recommended and are *already embedded* in the drafted text, flagged here so the reviewer can confirm rather than discover them: (1) the Scope section says the layer "does not claim legitimacy or operability" in a breaching host — it deliberately does **not** say the layer "prevents" or "enforces against" the breach (avoids the Babel-of-paper risk). (2) INV-017's audit hook reuses INV-006's exact "no apex sits unaudited" phrasing rather than inventing a parallel rule, so the two cannot drift apart. No further revision is required for consistency with the lens; the only open *moral* question is the enforceability gap, which is honestly disclosed rather than papered over (consistent with the corpus's own "a contradiction confessed is safer than a contradiction hidden" posture in the Open Question section).

**Fruit test.** Good fruit, conditional on honesty about reach. If adopted and paired with real audit: a survival floor that custody, sanction, and accusation cannot breach; a coercive apparatus that cannot sell protection or buy immunity; a polity whose membership cannot be bought; children and the incapacitated kept inside the guarantee. Bad fruit to guard against: a host that signs and violates, turning the invariants into reassuring words while the deprivation continues — "by their fruits ye shall know them," not by their signatures. The standing recommendation is that adoption be accompanied by the audit machinery and by public, periodic verification that hosts actually honor the interface, so the invariants produce fruit and not only foliage.

---

## Part 5 — Reconciliation flags (for the human, not part of the redline)

These are downstream consistency items the doctrine itself lists as "open / next." They are **not** in the redline and are noted so the reviewer can sequence follow-on work:

1. **Jurisdiction Interface Clause** (governance) — elevate from pilot-scale to scale-independent and align its language with the new Scope section and INV-014…INV-019.
2. **Annex N / Annex Q** — boundary logic should cite the interface invariants once adopted.
3. **Provenance spine** — if adopted, the interface invariants will want T-/P- linkage (each new invariant cites attack vectors in-text but no T-NNN/P-NNN IDs yet; the capture-the-apparatus finding from the capstone is the natural threat to register).
4. **Near-term gaps the doctrine names but this redline does not solve:** children/dependents life-course standing (when a child becomes a Voice-holder; intra-household allocation) and an ecology/future-generations standing doctrine. INV-019 secures the *floor* for children; it does not resolve life-course civic standing.

---

*This document is a proposal. The constitution is unchanged. Incorporation requires the Tier-1 process in Part 3 and explicit human approval.*
