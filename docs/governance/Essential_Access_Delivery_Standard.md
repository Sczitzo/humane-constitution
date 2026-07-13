# Essential Access Delivery Standard

**Status: `Designed`.** Companion instrument to [ANNEX_Y](../annexes/ANNEX_Y.md) (introduced by P-081, PROPOSED — pilot-gated). This standard binds the *delivery side* of the survival floor: who can deliver it, how providers settle, and what the redemption event is allowed to record. It amends nothing in ANNEX_Y — the floor's definition, its §Y1 numbers, and its H-3 lock are untouched. Adopted under the panel-preferred companion-instrument path after the ANNEX_Y amendment-scope ambiguity was resolved at intake (see the P-081 package).

## Plain-English purpose

ANNEX_Y guarantees *what* every person receives. This standard guards two ways the guarantee could rot in practice:

1. **One supplier, one throat to squeeze.** If one provider ends up delivering a whole category of survival goods in a region, then one strike, one bankruptcy, one capture, or one quiet act of conditioning can halt a floor the constitution says cannot be halted. The fix: delivery must stay plural, community networks get a real (but optional) place in it, and a public provider of last resort must actually be able to deliver — not just hold stockpiles.
2. **A survival floor that watches what you eat.** Nothing previously bound what the redemption event itself records. Unbound, the floor would build the most intimate consumption dossier in the system, about exactly the poorest people. The fix: redemption verifies *entitlement and category* — a meal, a shelter-night, a medicine — never the item, never the behavior.

The two fixes were originally in tension: welcoming informal community networks into delivery opens a phantom-redemption fraud channel (a fake network claims redemptions it never served — an Essential Access→Flow mint), while redemption privacy forbids the per-person queries that would catch it. This standard resolves the tension the way the review panel found: **police the provider's books, never the person's purchases.**

## EADS-1 — Plural provision and provider of last resort

- **Plurality.** No CSM category (ANNEX_Y §Y1.1–Y1.7) may depend on a sole provider in any region. Delivery runs through a plural provider set — public providers, contracted private providers, cooperatives, and recognized community care networks (per Article IV non-displacement). Provider concentration per category and region is published (Article VII); approaching sole-provider dependence is a flagged capacity risk (ANNEX_M), not an awaited failure.
- **Recognition is optional and confers no authority.** Recognition is a settlement channel only: an unrecognized network may continue serving without it, and recognition never confers authority over the persons served. Recognition is low-burden — plain process, no fee, no surveillance precondition. Refusal of recognition is appealable on the appeal spine ([ANNEX_L §L7](../annexes/ANNEX_L.md)); de-recognition requires published cause and Ombuds notice — never a quiet delisting.
- **Settlement integrity (provider-side only).** Provider settlement is audited on the provider's books: claimed redemption volume reconciled against published regional capacity and velocity sentinels, surprise stock reconciliation, and settlement caps scaled to recognition tier and audited history. Newly recognized community networks settle in **replenishment-in-kind** (restocked goods, not Flow) until an audited volume history exists; in-kind settlement is the default for informal networks. A phantom-redemption finding voids the provider's settlements and is an INV-002 conversion event — established without ever inspecting what any person redeemed.
- **Public provider of last resort.** Maintained for every category and region, with a **throughput standard** — capacity to serve a published share of regional CSM demand within the ANNEX_Y §Y1 response floors. This binds *delivery* capability; [ANNEX_AT](../annexes/ANNEX_AT.md) reserves the *goods*. A **funding non-derogation rule** applies: the last-resort provider's budget may not be reduced on grounds that recognized networks absorb demand (the residualization trap). Readiness is tested on a published drill cadence, not assumed.

## EADS-2 — Redemption data minimization

- **Category, never item.** Redemption verifies entitlement and category (caloric, shelter-night, medicine), never item or behavior. What was chosen within a category is not recorded in the access ledger. Clinical details required for continuity of care are held under medical confidentiality by a **named clinical custodian**, outside the access ledger — never at provider discretion.
- **What remains permitted.** (a) The synchronous tranche-state debit at point of redemption (non-duplication: a tranche redeems once — identity-bound confirmation per SPECIFICATIONS §103; single-use expiring tokens per ANNEX_AK §AK8.1) — a state update, not a query. (b) Automated pattern-level anomaly screening on redemption *metadata* only — never item-level — inheriting the existing ANNEX_AJ detection and anti-coercion screening. (c) The provider-side settlement audit of EADS-1.
- **What is forbidden.** Per-person retrospective query of redemption history, except in an adjudicated ANNEX_Y §Y4 incident or at the person's own request; joining redemption data to Flow, Voice, Service Record, identity-resolution, policing, immigration, credit, or research datasets; retention beyond the settlement-plus-audit window, after which aggregate-only.
- **Canonical data home.** Purpose limitation, retention mechanics, cross-domain linkage prohibitions, and forbidden-reuse rules for redemption data are governed by the [Monitoring Administrative Safety Packet](./Monitoring_Administrative_Safety_Packet.md) (the data-minimization canonical home); this standard supplies only the domain substance above — the category-not-item rule, the clinical custodian, and the small-cell rule — and does not restate the doctrine.
- **Small-cell suppression.** Aggregate PII-stripped statistics feed the capacity oracle (ANNEX_M) only above a published minimum cell size, with suppression below it — rural and small-population re-identification is a named attack pattern, not a hypothetical. The minimum cell size is a reserved calibration parameter, bound in the Parameter Calibration Register before any redemption data feeds the oracle.
- **Coverage.** These protections attach to *any present person's* redemption (ANNEX_Y §Y2 scope), including unverified and provisional persons. The §Y4 wording ("personhood-verified resident") is noted as a conformance item to reconcile to §Y2's any-present-person scope through ANNEX_Y's own amendment path — this standard cannot and does not amend ANNEX_Y.

## What this standard does not do

It does not alter the ANNEX_Y floor definition, the §Y1 numbers, the 72-hour rolling window, §Y3 substitution-not-narrowing, §Y4 incident machinery, or the architectural un-haltability of the floor. It adds delivery-side protection only; if any clause here were ever read to narrow the floor, ANNEX_Y governs.

## Linked risks

T-028 (essential-sector refusal leverage — the sole-provider chokepoint), T-031 (last-resort unenrolled access — plural informal channels serve people outside formal enrollment), T-032 (monitoring repurposing — the redemption dossier this standard forbids), T-001 (the phantom-redemption settlement channel is an Essential Access→Flow conversion attack).

## Evidence status

`Designed` — no pilot evidence. The P-081 package names the blocking evidence gates: a provider-concentration baseline, an in-kind settlement pilot with a phantom-redemption red team, a last-resort throughput drill, and small-cell parameter binding.
