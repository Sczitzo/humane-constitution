# Founding Order — Subsidiarity Rule

**Status:** ACTIVE — Proposal 5 close-out, 2026-04-18
**Authority:** Tier 1 (default rule; FC-122 scales anchor the rule).
**Purpose:** The default-smallest-scale decision rule and the escalation test.

---

## Rule Statement

**Decisions default to the smallest viable unit capable of making them.** A decision is eligible for resolution at a scale larger than the smallest-competent only if a published test establishes that the larger scale is *necessary* — not merely convenient, faster, or more uniform.

"Larger is easier to coordinate" is **not** a sufficient reason to escalate. Coordination cost at smaller scales is the price the protocol pays for non-coercion, and that price is accepted by design.

The five scales from `jurisdictional_scales.md` (household, neighborhood ≤500, locality ≤5,000, region ≤500,000, federation) provide the operational anchor. The protocol's default resolution scale for any matter is the smallest scale in this list that satisfies all three competence tests below.

## Plain-Language Guide

This rule means: do not move a decision upward unless it truly has to move upward.

A household should handle household issues. A neighborhood should handle neighborhood issues. A locality should handle town-scale issues. The federation should handle only issues that smaller groups cannot fairly or safely handle.

The federation has to explain why it needs control. The smaller scale does not have to explain why it should be trusted first.

---

## The Three-Prong Competence Test

A scale *S* is capable of handling matter *M* only if **all three** tests are satisfied:

### Prong 1 — Enough Information

Scale *S* has, or can get through normal operations, the information needed to decide *M* accurately. Where *M* requires specialist measurement (for example, oracle readings for a Shared Storehouse activation or leakage-rate estimation for Annex AB2), the scale must have access to the measurement infrastructure.

### Prong 2 — Enough Decision Capacity

Scale *S* has the capacity to represent people, deliberate, enforce the decision, and hear appeals within the protocol's timing and fairness rules. A neighborhood that cannot form an appeal body is not capable of handling a matter that requires appeal.

### Prong 3 — Effects Stay Mostly Inside

The effects of *M* on units outside *S* are small compared with the effects inside *S*, and the decision does not push unwanted costs onto outsiders. If the outside effects are significant, the matter moves to the smallest scale that includes the affected people.

---

## The Escalation Test

When a matter *M* is proposed for resolution at scale *S*, the following sequence executes:

1. **Identify the smallest scale** at which all three prongs of the competence test are plausibly satisfied. This is the **presumptive scale** for *M*.
2. **Publish the competence analysis.** The proposer publishes a one-page analysis addressing each prong. The analysis is subject to 30-day public challenge.
3. **If challenged,** the matter is reviewed by the next-larger scale's representation, which may either (a) affirm the presumptive scale, (b) designate a different scale with published reasoning, or (c) remand for further analysis.
4. **Default-against-escalation rule.** If the review is inconclusive, the matter stays at the smaller scale. Escalation requires affirmative reasoning, not mere disagreement about appropriate scale.

This sequence turns the plain rule into a procedure: centralization requires a public reason; smaller-scale control is the default.

---

## What Counts as a "Matter"

A matter is a concrete decision requiring a binding resolution:

- **Rule-making:** adopting or modifying a rule that will govern future conduct. (e.g., a locality adopting a stricter Shared Storehouse than the federation baseline for its own residents)
- **Allocation:** distributing a finite resource among eligible claimants. (e.g., a neighborhood allocating well access)
- **Adjudication:** resolving a dispute between parties. (e.g., first-tier mediation at neighborhood scale)
- **Enforcement:** applying a penalty or remediation to a prior violation. (e.g., Annex AJ §4 regional enforcement)

Administrative tasks that simply apply existing rules — disbursing Essential Access at the federation rate to eligible residents, assessing the Annex D net-worth carrying cost on wealth above the participation floor — are **not** matters requiring subsidiarity analysis. Those are ordinary operations.

---

## Hard Exceptions — Federation-Scale by Construction

The following matters are **federation-scale by construction** and do not go through the escalation test:

| Matter class | Federation-scale reasoning |
| :--- | :--- |
| Tier 1 invariants (`/architecture/parameter_registry.md`) | By construction, federation-scale — they are the floor beneath all scales |
| Flow/Essential Access non-convertibility (Humane Constitution §II) | Currency-level property; any local exception creates arbitrage across boundaries |
| Cross-regional dispute resolution | Not competent at any scale below federation by definition |
| Amendment protocol operations | Federation-scale by construction |
| Drift chain operations | Federation-scale by construction |
| Founding Order exit events | Federation-scale by construction (federation scope is being reduced) |
| Measurement methodology-class definitions (Annex AL §3) | Federation-scale to ensure oracle interoperability |
| Identity assurance standards (Article II / Annex AK) | Federation-scale to prevent identity arbitrage |
| Adversarial oracle seat standards | Federation-scale; rotating seats are regional but the standards are federal |

This list is exhaustive. Matters not on this list go through the escalation test. Extensions to the list require Tier 1 amendment — the intent is that the federation's standing reach is small and every extension carries a public justification.

---

## Soft Exceptions — Federation-Scale on Published Findings

Certain classes of matter are ordinarily scale-defaulted but may be federation-escalated on published findings:

- **Cross-unit externalities.** If scale *S* decides *M* in a way that imposes material unconsented cost on another scale-*S* unit, the affected unit may petition for federation review. Federation may override *S*'s decision only if the externality is shown to be material and unconsented.
- **Measurement coordination.** If localities or regions adopt incompatible measurement conventions that frustrate oracle interoperability, the federation may set a standard through Tier 2 amendment with a 90-day comment window.
- **Systemic drift.** If scale-*S* decisions, aggregated, are measured to breach a Tier 1 invariant (e.g., cumulative locality-level Shared Storehouse liberalization breaches the FC-071 cluster-failure threshold), federation intervenes at the aggregate level.

Soft-exception invocations are logged; repeated invocations against the same scale trigger a federation-Ombuds review (Annex AI §4.3 concentration tracking extended to decision-scale concentration).

---

## The Proportionality Principle

Even when a matter belongs at federation scale, the federation must use **the least centralizing means** that solves the problem. If a federation standard can be a floor that localities may exceed, it should be a floor. If it can be a menu of options localities choose from, it should be a menu. One rule for everyone is the last resort, not the first.

This principle is not merely rhetorical — it is enforceable under the Federated Ombuds (Annex AI). A federation action that adopts a uniform rule where a floor would suffice may be challenged as a subsidiarity violation (T-027), and the Plenum may remand for reconsideration.

---

## Relationship to Other Founding Order Rules

- **Consent** (consent_protocol.md) — Units that have not consented to the protocol are not bound by federation rules at all. Subsidiarity applies within the consented scope.
- **Exit** (exit_protocol.md) — A unit that believes federation rules have overstepped subsidiarity has, in the last resort, the right of exit. Subsidiarity is the internal protection; exit is the external.

---

## Governance

The subsidiarity rule is Tier 1 protected. The Federation-Scale-by-Construction list is Tier 1; extension requires 7-of-9 amendment. Soft-exception invocation is Tier 2. The Proportionality Principle is Tier 1.

---

*Subsidiarity is the rule that the federation exists to serve the units, not the other way around. Every page of the protocol is read through this rule.*
