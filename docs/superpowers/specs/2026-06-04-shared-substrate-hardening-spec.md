# Shared-Substrate Hardening Spec

**Status:** Proposed — engineering design draft, not incorporated. The constitution is unchanged.

Consolidates the six fixes from the [Capstone Assembled-System Review](2026-06-03-capstone-system-review.md) into one implementable, testable hardening spec. The capstone's central finding: the inter-instrument walls block *direct* convertibility, but the assembled system converges at two uncovered layers — **perception** (one capacity oracle read by Essential Access, Shared Storehouse, and Flow issuance) and **rule-making** (public office). The "Babel" power the project fears was relocated, not eliminated. Each fix below names the failure it closes, the mechanism, the corpus invariant/annex it amends, its amendment tier (with reasoning), and the pilot test. Fixes evaluated against the Instrument Evaluation Rubric and the Christ-centered review (Q3 vulnerable, Q5 dignity, Q6 anti-Babel) where load-bearing.

---

## Fix 1 — Oracle de-monopolization + over-reporting tripwire (CRITICAL)

**Failure closed.** INV-005's asymmetric override guards only *under*-reporting (oracle may raise the floor; humans hold cuts). A confidently-wrong or captured oracle that *over*-reports capacity simultaneously makes Essential Access issue against phantom supply, Shared Storehouse fail to trigger a needed cut, and Flow over-issue — invisibly, because no human decided it. FC-032's pairwise-correlation cap catches co-*movement* between node error series, not a *shared directional bias* (all nodes wrong in the same direction by the same sign).

**Mechanism.**
1. **Heterogeneous channels.** Each instrument's capacity read must draw on ≥2 methodologically heterogeneous channels spanning at least two of Annex AL's three classes — administrative/institutional-statistical (Class 1), market-signal or community participatory (Class 2 / a new market-signal class), and independent physical survey (Class 3). The existing Annex AL cohort already requires class diversity for *accreditation*; this fix requires class diversity at the *consumption* point — no instrument may act on a single-class read even when a cohort is nominally diverse.
2. **Divergence band → freeze toward generosity.** If channel readings diverge beyond band B (a published percentage of the consensus value, calibrated per category), all *tightening* actions — floor reductions, Shared Storehouse cut triggers, issuance contraction — are FROZEN and a human scarcity-audit is forced. The system fails toward generosity, consistent with Annex M's "default toward continuity."
3. **Directional-bias test at accreditation.** Add to Annex AL §2: a node set fails if its aggregate signed error against an independent ground-truth sample is biased in one direction beyond a threshold, even when pairwise correlation is ≤ FC-032. Co-movement and shared bias are distinct failure modes; both must be tested.
4. **Strategic reserve.** Hold a physical reserve sized to N months of the survival floor (N a published founding parameter), drawable WITHOUT an oracle reading on presence-trigger alone. A lying oracle cannot narrow the floor faster than the buffer drains, buying time for the scarcity-audit.

**Amends.** INV-005 (extends the cap to require multi-channel reads + over-reporting protection); Annex M §M4 (divergence freeze); Annex AL §2 (directional-bias test); a new SPECIFICATIONS parameter `ORACLE_DIVERGENCE_BAND` plus `STRATEGIC_RESERVE_MONTHS`.

**Tier.** **Tier 1.** INV-005 is a Tier-1 invariant; adding an over-reporting protection and the freeze-toward-generosity default changes what "reality anchoring" guarantees. Requires 7-of-9 keyholders + 180-day timelock and the two-key adversarial attestation (P-034 / Annex AV).

**Pilot must test.** The oracle, adversarially, FIRST (reordering the existing roadmap): inject a coordinated over-report and confirm (a) divergence trips the freeze, (b) the reserve covers the floor through the audit window, (c) the directional-bias test would have flagged the captured set at accreditation.

---

## Fix 2 — The Productivity Register (CRITICAL)

**Failure closed.** "Productive" is adjudicated by three bodies on three incompatible tests — Flow issuance (productive *commitment*, Annex X §X2), the wealth/demurrage assessor (active/productive *use*, Annex D), the capacity oracle (productive *capacity*, Annex M). Gaming the loosest test simultaneously mints Flow AND dodges the wealth levy — a multi-instrument double-dip no single instrument sees.

**Mechanism.** A single canonical **Productivity Register**: one productive-status determination per asset/commitment, written once and consumed by all three instruments. No instrument may grant an exemption or mint against a status it did not read from the register (Annex X issuance, Annex D demurrage exemption, and oracle capacity-classification all key off the same record). Bind the register to a **cross-instrument settlement event**: a *failed* commitment reverses the wealth/demurrage exemption and recovers the deferred carrying cost — while already-paid Flow wages stay protected by the existing no-clawback rule (Annex X). Reversal applies to the exemption and deferred cost, never to delivered wages of workers.

**Amends.** Annex X §X2 (issuance must read register), Annex D §D9 (demurrage exemption must read register), Annex M (capacity classification logs to register); new SPECIFICATIONS state-machine for register lifecycle (claimed → verified → settled/failed → reversal).

**Tier.** **Tier 2.** This binds three founding-commitment instruments to a shared definition and a settlement reversal; it does not alter a Tier-1 invariant but is a founding-commitment change requiring supermajority + adversarial panel + pilot evidence.

**Pilot must test.** Stage a failed commitment that had drawn both an issuance and a demurrage exemption; confirm the single reversal recovers deferred cost, leaves paid wages untouched, and that no instrument can act on a status absent from the register.

---

## Fix 3 — Tier-1 recusal invariant (CRITICAL)

**Failure closed.** Capture-the-apparatus: Service Record → office → set the oracle/issuance/formula/tax parameters → advantage → re-mint civic standing. This is a wall-compliant A→B→C→A loop because the Annex Z firewall guards the *record*, not the *office the record unlocks*. The corpus has COI *disclosure* (Annex X §X4 reviewer rules) but no *recusal* at the parameter-setting layer.

**Mechanism.**
1. **Recusal, not disclosure.** No office-holder may vote on, draft, or adjudicate a parameter whose published distributional effect moves their own net-worth bracket, their own oracle district, or an entity they materially benefit from. Disclosure is necessary but insufficient; the standing rule is recusal.
2. **Structural separation.** The body that sets economic parameters must be structurally distinct from the pool that benefits from them (extends INV-006's "no class is its own final auditor" from verification to *rule-making*).
3. **One-person-one-vote legitimacy gate.** Wealth-adjacent parameter changes require a one-person-one-vote gate, so concentrated standing cannot self-authorize an advantage.

**Amends.** A new Tier-1 invariant (INV-0xx) extending INV-006 from verification/benefit to rule-making/benefit; Annex Z (firewall extended from record to office); SPECIFICATIONS recusal-trigger table keyed to published distributional analysis.

**Tier.** **Tier 1.** It is a new non-negotiable separation-of-powers invariant in the same family as INV-006; 7-of-9 + timelock + two-key attestation.

**Pilot must test.** Simulate an office-holder whose proposed parameter change moves their own bracket; confirm the recusal trigger fires from the *published distributional effect* (not self-declaration) and the change cannot proceed without the OPOV gate.

---

## Fix 4 — Dividend/top-up non-assignability (HIGH)

**Failure closed.** The citizen's dividend and the Essential Access cash top-up pay a predictable, identity-keyed stream into Flow to the lowest-wealth cohort. A lender/landlord underwriting against that guaranteed stream re-collateralizes survival-adjacent income — recreating the survival→market leverage the in-kind floor exists to kill. Annex Z §Z4 forbids conditioning credit on Voice/Service-Record balances, not on the dividend/top-up stream.

**Mechanism.** Make the top-up and dividend **non-assignable and non-garnishable at the ledger layer** (the assignment simply cannot be recorded), and prohibit any party from requiring, or underwriting against, the stream as a condition of credit, tenancy, or service. Enforced as a ledger invariant, not a contract term, so it cannot be waived under pressure.

**Amends.** Annex Z §Z4 (extend the anti-composition rule to the dividend/top-up stream); SPECIFICATIONS ledger rule marking these flows non-assignable/non-garnishable.

**Tier.** **Tier 2.** A founding-commitment extension of the existing firewall; supermajority + adversarial panel. (If the dividend/top-up is itself treated as part of the survival-floor guarantee, promote to Tier 1 at intake review.)

**Pilot must test.** Attempt to record an assignment of the stream and to underwrite credit against it; confirm both are rejected at the ledger layer and that garnishment orders cannot attach.

---

## Fix 5 — Founding re-ratification tripwire (CRITICAL, upstream)

**Failure closed.** Founding capture is self-ratifying: amending Tier-1 needs the very keyholders a captured founding installed (INV-007). The founder also sets irreversible genesis bindings — the oracle methodology registry and exclusion targets — with no exogenous reset.

**Mechanism.** An **external-attestation-quorum tripwire** grounded in INV-006's "no apex sits unaudited": the keyholder set is itself audited by a structurally independent external body. If that audit finds the founding keyholder set captured, a pre-named external quorum can force re-founding via the H-3 refounding path — the one route that does not depend on the captured insiders. Separately, convert the irreversible genesis bindings (oracle methodology registry, exclusion targets) into **one-time, post-pilot re-ratifiable** commitments: ratified once after the pilot, then fixed — without weakening the legitimate 7-of-9 + 180-day timelock for ordinary Tier-1 amendment.

**Amends.** INV-006 (extend external audit to trigger a re-founding quorum), INV-007 (carve the external-quorum H-3 path as the capture exception, not a new in-system shortcut); Annex AV (attestation envelope for the external quorum); genesis-binding registry marked re-ratifiable-once.

**Tier.** **Tier 1.** It touches the amendment mechanism's escape hatch; per INV-007 changes to the amendment mechanism require H-3 refounding authority. Specify it now so the legitimate founding can adopt it once, before capture is possible.

**Pilot must test.** Tabletop a captured-keyholder finding; confirm the external quorum is identifiable, structurally independent (INV-006), and can force re-founding without any captured-insider signature — and that it cannot be abused to bypass the ordinary timelock absent a capture finding.

---

## Fix 6 — Identity recovery (HIGH)

**Failure closed.** A lost/frozen identity record simultaneously strips Voice, Service-Record eligibility, the above-floor cash top-up, and net-worth identity. (The survival floor is correctly decoupled — presence-triggered, no identity — so it is protected; the corpus does this well.) Annex AB §AB4 names recovery as a protected subsystem but does not specify the reconstitution quorum.

**Mechanism.** A **k-of-n social-attestation recovery quorum** reconstitutes civic standing without re-earning it from zero: k of n pre-designated attesters vouch for continuity of person, restoring Voice, Service-Record eligibility, the top-up, and net-worth identity in reviewable stages (recovery harder to exploit than daily use, per AB4). Plus a **manual offline sortition roster** so recovery does not itself depend on the online identity layer it is repairing.

**Amends.** Annex AB §AB4 (specify the k-of-n quorum and offline roster); SPECIFICATIONS recovery state-machine (staged, reversible).

**Tier.** **Tier 2.** A founding-commitment specification of an existing AB4 protected subsystem; supermajority + adversarial panel + the AB4-required pilot evidence (Sybil resistance, false-positive/negative control, recovery performance).

**Pilot must test.** Freeze a test identity; confirm k-of-n attestation restores all four powers in stages without re-earning from zero, the offline roster works with the online layer down, and the quorum resists a Sybil-driven false recovery.

---

## Priority

**Highest priority: Fix 1 (oracle de-monopolization + over-reporting tripwire).** It is the keystone shared by the two most consequential instruments plus Flow issuance, the over-reporting hole fails silently against the most vulnerable, and the capstone reorders the pilot roadmap to test the oracle adversarially first. Fixes 3 and 5 are the next tier (rule-making and founding capture); Fixes 2, 4, 6 close concrete leaks downstream of them.
