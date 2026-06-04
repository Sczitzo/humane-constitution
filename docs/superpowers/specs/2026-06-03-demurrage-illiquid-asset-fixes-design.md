# Annex D Revision — Illiquid-Asset Valuation and Settlement

**Status:** Proposed — design draft. Not incorporated. Annex D is unchanged. This document exists so the design and its ethical review can be evaluated *before* any edit to a high-care file.

**Author of draft:** prepared for review by Cameron Matthew.

**Scope:** Two targeted additions to Annex D that address its weakest joint — how the net-worth carrying cost behaves when wealth is held in unique, illiquid, non-cash assets (art, collectibles, private-company equity, non-exempt real estate). Neither addition changes the *base* of the instrument (net worth remains correct), the *rates*, or any Tier-1 invariant.

---

## 1. The problem being fixed

Annex D taxes assessed net worth above a participation floor. For cash and listed securities this is clean — there is a price and the holder can pay. For **unique illiquid assets** two real problems appear, and a skeptic is right to press on them:

1. **Valuation.** What is a single painting, a private company, or a one-of-a-kind property actually worth? There is no market price, only appraisal — which is subjective and collusively gameable (a friendly appraiser lowballs to suppress assessed net worth). Every historical wealth tax broke partly here. Annex D currently says "oracle-assessed value" (§D2.6, §D7.3) without specifying how an oracle prices a unique object without being captured.

2. **Forced liquidation.** A continuous *cash* charge on an *illiquid* asset held by a *cash-poor* owner forces sales — potentially fire-sales — to raise money the owner does not have. §D3.2 softens this by allowing in-kind surrender, but the owner is still stripped on the system's timetable, and the commons inherits illiquid objects it must then manage.

These are not reasons to abandon net worth as the base. Idle-money (per-balance) demurrage would *miss* concentrated power almost entirely (the wealthy hold little idle cash) and fall hardest on ordinary savers — it is regressive for this project's purpose and was correctly removed corpus-wide. The fix is to make the net-worth instrument *work* on illiquid assets, not to change what it taxes.

---

## 2. Fix 1 — Self-assessed valuation with public buyout (a Harberger / COST rule)

**Intellectual source:** the Common Ownership Self-Assessed Tax (Weyl & Posner, *Radical Markets*, 2018) — the same liberal-radical tradition the corpus already draws on (Walzer, Ostrom, Gesell). Cited as supporting design evidence, not authority.

### 2.1 Mechanism

For any non-exempt asset lacking a continuous public market price (the **illiquid class** — art, collectibles, private equity, non-exempt real estate, intellectual property):

- The holder **self-declares** the asset's value each oracle cycle.
- Demurrage accrues on that self-declared value, inside the normal §D3 bracket math.
- The declared value is a **standing offer**: during a published window, any party — including the Essential Access commons — may purchase the asset at the declared price plus a small statutory premium, and the holder must sell.

This makes the asset self-pricing in both directions:

- **Lowball and you lose it** — someone buys your underdeclared painting cheaply.
- **Highball and you overpay** — you carry demurrage on the inflated figure.

The honest equilibrium is the holder's own true reservation value. The oracle stops being an omniscient appraiser and becomes a registry of declarations and offers — a far smaller, less captureable role.

### 2.2 Mandatory carve-outs (dignity protections — see review §6)

The buyout right does **not** reach:

- (a) the **primary residence** (already exempt under §D6.1) and its ordinary household contents;
- (b) a modest **personal-effects and heirloom allowance** below a published threshold (wedding rings, family keepsakes, devotional and culturally/spiritually significant objects), which are excluded from the illiquid class entirely;
- (c) **working tools and active productive assets** (already exempt under §D6.2).

For an asset above the heirloom allowance to which the holder has a documented non-fungible attachment (ancestral land, an object of religious significance), the holder retains a **right to match**: they may defeat any buyout offer by paying demurrage on the offered (higher) price going forward. You can always keep a deeply-held thing — by honestly carrying its true value.

### 2.3 Parameters (Tier 3)

- Buyout premium over declared value (prevents harassment buyouts of correctly-priced assets).
- Offer-window cadence and notice period.
- Heirloom-allowance threshold.
- Cooling-off / re-declaration limits to stop strategic value flipping.

---

## 3. Fix 2 — Deferred settle-at-transfer lien for illiquid assets

### 3.1 The Tier-1 constraint this must respect

§D7.1 — "decay is a property of the stock, not of attestation events" — is a **Tier-1 invariant**. Therefore this fix may **never pause accrual**. The obligation keeps accruing continuously, exactly as today. What defers is only the *cash settlement* of that obligation for genuinely illiquid holdings. This is consistent with §D7.2 (accrue now, reconcile later) and is a generalization of the §D10.2 hardship deferral that already exists.

### 3.2 Mechanism

A holder of a qualifying illiquid asset may elect to settle its accruing demurrage not in continuous cash but as a **lien against the asset** that crystallizes (becomes due in cash) at the first of: **sale, gift, transfer, or inheritance.**

Critically, and unlike the §D10.2 hardship deferral, this lien is **not interest-free**. It continues to accrue at the demurrage rate (or a published carrying rate no lower than it). If deferral were free, it would be a costless option to hold idle wealth forever — an avoidance channel. It must cost at least as much as paying on time.

### 3.3 Non-recourse cap (the protection)

The lien is **non-recourse to the asset**: the holder may at any time surrender the asset to extinguish the lien in full, and the lien may never exceed the asset's current self-assessed value (Fix 1). So the holder never owes *more* than the thing is worth, and is never pushed into personal insolvency by an illiquid holding. What the holder cannot do is keep idle wealth above the floor indefinitely — by design.

### 3.4 What this fix does and does not do — stated honestly

- **It does** remove the fire-sale and cash-crunch problem. A cash-poor, asset-rich owner is no longer forced to dump an asset at a bad time or find money they do not have.
- **It does** capture wealth at **inheritance** — the precise transmission point of the static-advantage loop the project targets. A lien crystallizing at death is a direct answer to dynastic accumulation.
- **It does not** make idle wealth survivable. At 26–46%/yr, a lien on a long-held idle asset reaches the asset's full value within a few years; at crystallization the asset is largely or wholly consumed by the lien. The deferral changes the *timing and dignity* of the transfer, not the *fact* of it. Anyone who reads this fix as a loophole to keep idle wealth has misread it.

### 3.5 Anti-shelter guards

- Counts against the §D6.7 aggregate shelter cap logic so it cannot be combined with investment channels to zero out all accrual.
- Crystallizes immediately on any §D7.4 material event (a transaction ≥10% of assessed value).
- Idle-roll and circular-transfer structures (transfers among affiliated parties to reset the clock) trigger back-crystallization from lien start, mirroring §D6.4.

---

## 4. How the two fixes work together

They are complementary, not redundant:

- **Fix 1 (self-assessment)** makes illiquid assets *priced and liquid-on-demand*. It resolves valuation and, by making everything buyable at its declared price, largely dissolves the illiquidity excuse.
- **Fix 2 (deferred lien)** handles the residual: the honest owner who has correctly declared a high value but genuinely lacks the cash to pay continuously, and should not be forced to sell at a bad moment.

Together: you self-declare, you pay on that value if you can, and if you can't you let a capped, non-recourse, interest-bearing lien ride against the asset until it sells or passes to heirs. The painting problem is answered without forcing fire-sales and without letting idle wealth hide.

---

## 5. Amendment-tier classification and FAP path

**Tier-1 invariants — all preserved, none touched:**
- Single carrying-cost instrument (§D9) — unchanged; this is still that one instrument.
- Continuous decay as a property of the stock (§D7.1) — preserved; accrual never pauses, only cash settlement defers.
- No-credit-offset (§D4.2/§D4.3) — untouched.

Because no Tier-1 invariant is modified, this proposal does **not** carry `modifies_tier1=True` and does not require the two-key Annex AV attestation.

**Tier 2 — Founding Amendment Process required:**
- Fix 1's self-assessment-with-buyout as the valuation methodology for the illiquid class (structural; adjacent to §D2.6 / §D4.1).
- Fix 1's mandatory carve-outs (residence, heirloom allowance, right-to-match).
- Fix 2's existence and qualifying conditions, the non-recourse cap, and the non-interest-free rule (extends §D10; settlement-modality addition to §D3.2).

**Tier 3 — rate-review process:**
- Buyout premium, offer-window cadence, heirloom threshold, lien carrying rate, crystallization windows.

**Evidence gate:** both fixes are novel enough that they must be **piloted before activation**, not adopted on paper. They map directly onto **Pilot B** (the net-worth demurrage simulation) — specifically the self-assessment arm and the illiquid-asset red-team. Per the project's own discipline, a Tier-2 change requires pilot evidence, not just argument.

---

## 6. Christ-centered ethical review

*Applying the protocol in `.claude/rules/constitution-review.md`. The Humane Constitution is treated as a human-made, corrigible framework assessed for consistency with Jesus' teachings — not as Scripture, and not divinely endorsed.*

### Assessment against the eight questions

1. **Love of God and neighbor (Matt 22:37–40).** The fixes aim the instrument more precisely at idle concentrated wealth and away from ordinary people — consistent with neighbor-love, *if* the dignity carve-outs hold. The buyout mechanism, unguarded, risks treating a neighbor's cherished things as mere fungible inventory; §2.2 exists to prevent that.
2. **Serve people, not exalt the system (Mark 10:42–45; John 13:12–17).** Fix 2's non-recourse cap and deferral serve the cash-poor owner rather than the system's collection schedule — the system bends to the person's circumstance. This is the right direction.
3. **Protect the vulnerable, poor, outcast, burdened (Matt 25:35–40; Luke 4:18–19).** The participation floor, residence exemption, and heirloom allowance keep the burden off the modest. The Jubilee directive (§D8.2) already routes recovered wealth toward restoring productive standing to households near the floor — these fixes feed that pipe more reliably by capturing illiquid and inherited wealth that currently escapes. Good fruit *for the poor*, provided the heirloom allowance is set generously enough that an ordinary family's meaningful objects are never reachable.
4. **Truth, mercy, justice, forgiveness, reconciliation (Matt 5–7; Matt 18).** Self-assessment is a truth-telling mechanism — it makes honest declaration the dominant strategy. Mercy appears in the deferral and the non-recourse cap (no one is driven to ruin by an illiquid holding). Justice appears in closing the dynastic-inheritance escape.
5. **Human dignity, not reducing persons to data/compliance (Gen 1:26–27; Matt 7:12).** This is the **sharpest risk**. A self-assessed buyout treats property as universally for-sale, which is in tension with the human reality that some things are not for sale at any price. The carve-outs (residence, heirlooms, devotional/cultural objects) and the right-to-match are the dignity firewall and must be treated as load-bearing, not optional. *Do unto others* (Matt 7:12) forbids a design that would let a stranger strip a grandmother's ring for a premium.
6. **Resist Babel: pride, domination, coercive unity (Gen 11; Matt 6).** Counter-intuitively, self-assessment *reduces* the Babel risk: instead of an all-seeing valuation apparatus appraising everyone's possessions (surveillance, domination), the holder declares and the registry records. The state-as-omniscient-appraiser is exactly the dominating tower to avoid; Fix 1 dismantles it. Residual risk: the buyout power, if scope creeps beyond the illiquid class, could become a tool of coercion. Scope must stay narrow and challengeable.
7. **Good fruit in practice (Matt 7:15–20; Gal 5:22–23).** Predicted fruit: honest valuations, no fire-sales, dynastic wealth recycled into productive restoration for the poor. Predicted bad fruit if carve-outs fail: a sense that nothing is truly one's own, resentment, a feeling of domination. The fruit test must be run empirically in Pilot B, not assumed.
8. **Open to correction (Matt 18:15–20; Prov 11:14).** The proposal is explicitly Tier-2, FAP-gated, pilot-gated, sunset-able at the rate level, and challengeable through the right-to-match and offer-window disputes. It is corrigible by construction.

### Required outputs

- **Christ-centered alignment.** Strong on justice and mercy (closes the dynastic escape; ends fire-sale cruelty; serves the cash-poor). Aligns with the Jubilee logic already in §D8.2 — restoring productive standing, not just consumption.
- **Babel-risk warning.** Net *reduction* in surveillance/domination versus a state-appraiser model, because self-assessment moves the truth-telling burden to the holder. Residual risk only if the buyout scope creeps; keep it confined to the non-exempt illiquid class with published challenge rights.
- **Human-dignity test.** Passes **only with** the §2.2 carve-outs and right-to-match. Without them, the buyout reduces persons' cherished, non-fungible belongings to fungible inventory — a real dignity failure. With them, dignity is preserved: home, heirlooms, devotional and cultural objects, and tools are out of reach, and anything meaningful can be kept by honestly carrying its value.
- **Revision proposal.** (a) Write the heirloom/devotional carve-out and the right-to-match into the *Tier-2* core of the amendment, not the Tier-3 parameters, so they cannot be quietly tuned away. (b) Make the lien's non-recourse cap explicit and non-waivable. (c) State the heirloom threshold generously and index it to the participation floor so it never erodes in real terms.
- **Fruit test.** Likely good fruit: honest prices, no forced fire-sales, dynastic wealth redirected to the poor via Jubilee. Possible bad fruit: felt loss of ownership security. Resolution: the carve-outs plus a real Pilot B measurement of participant sense-of-security before any scale-up.

*The instrument must serve people under God; it must not become a power that treats what people love as merely for sale.*

---

## 7. Open questions a pilot must answer (ties to Pilot B)

- Does self-assessment actually converge on honest values, or do thin buyout markets let strategic underdeclaration survive?
- What buyout premium deters harassment without enabling lowballing?
- Where must the heirloom threshold sit so that no ordinary family's meaningful objects are ever reachable, while genuine concentrated wealth cannot hide behind "sentimental value"?
- Does the deferred lien get used as intended (cash-poor honest owners) or gamed as a shelter despite the guards?
- Do participants experience the buyout right as fair, or as a loss of ownership security? (The fruit test — measured, not assumed.)

---

## 8. Recommendation

Adopt **net worth as the base** (do not switch to idle-money). Add **both fixes** as a single Tier-2 amendment, with the dignity carve-outs written into the Tier-2 core and both mechanisms gated behind Pilot B evidence before activation. This resolves the valuation and forced-liquidation weaknesses — the substance of the "I don't see how this works" objection — without weakening the instrument's aim or touching any Tier-1 invariant.
