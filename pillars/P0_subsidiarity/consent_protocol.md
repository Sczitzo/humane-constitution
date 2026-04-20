# Founding Order — Consent Protocol

**Status:** ACTIVE — Proposal 5 close-out, 2026-04-18
**Authority:** Tier 1 (consent-of-founding rule; FC-122 scales).
**Purpose:** Define the affirmative consent events required for units to be bound by the protocol, and the treatment of units that have not consented.

---

## Core Rule

**The protocol binds no unit that has not published an affirmative consent event.** Consent is an act, not a presumption. A unit that has not performed the consent act is outside the protocol's operational scope and retains its pre-protocol arrangements.

**Exception — human-dignity floor.** Tier 1 human-dignity invariants — specifically the CSM (Annex Y §Y1 — caloric minimum, water minimum, shelter minimum, medical response, sanitation minimum, mental-health response, essential medicines continuity) — apply everywhere the protocol has operational reach, regardless of a unit's consent status. The protocol does not permit humans to be starved because their locality did not consent. This exception is itself Tier 1 and is the smallest possible carve-out: the floor applies, but nothing else binds a non-consenting unit.

This is the classical-liberal asymmetry: coercion is always minimized, but the minimum is not zero — at the floor of human survival, the protocol binds unconditionally because the alternative is death, and death is not a legitimate subject of consent.

---

## The Consent Act

A consent event for a unit at scale *S* requires:

| Element | Requirement |
| :--- | :--- |
| **Scale-appropriate supermajority** | 2/3 of resident-personhood of unit *S* affirmative (matching the FC-120 exit threshold — asymmetric thresholds would create a capture pathway) |
| **Published call** | Advance public notice of the consent event, published at least 90 days in advance, with the full text of what is being consented to |
| **Deliberation period** | At least 60 days between notice and vote, for public discussion and challenge |
| **Recorded vote** | Roll-call or equivalent verifiable record of each personhood's affirmative, negative, or abstention, with the personhood's own certification of their participation |
| **Publication of result** | Result published to the protocol's federation-scale public record, along with the deliberation artifacts |

The roll-call-equivalent is designed to prevent manufactured majorities through stuffed rolls or counted-abstentions. The personhood-certification requirement (each person's own signature of participation) ensures that the published count reflects actual participation.

**Minimum participation floor.** For the consent event to bind, at least **2/3 of eligible resident-personhood must have either affirmed, opposed, or actively abstained**. A consent event in which fewer than 2/3 of eligible persons participated is deemed inconclusive and must be re-run after a remediation period (to address participation barriers).

---

## Scale-Specific Consent Mechanisms

| Scale | Who consents | Consent procedure |
| :--- | :--- | :--- |
| **Individual / Personhood** | The individual for themselves | Individual protocol-participation act; published to individual's civic record. Individual consent is a pre-condition for Article II identity registration. |
| **Household** | Each personhood in the household, individually | No household-level vote; the household is a unit of residence, not of political authority. |
| **Neighborhood** | 2/3 of eligible resident-personhood in the neighborhood | Published neighborhood roll; 90-day notice; 60-day deliberation; published vote. |
| **Locality** | 2/3 of eligible resident-personhood in the locality | As neighborhood, at larger scale. Locality consent typically requires component neighborhoods to have consented. |
| **Region** | 2/3 of eligible resident-personhood in the region, plus majority of component localities consenting | Regional consent is a two-layer requirement: personhood majority + locality-unit majority. |
| **Federation** | The founding coalition under H-3 authority (bootstrap-only); subsequent federation-scope changes require Tier 1 amendment | Federation-scale consent is a founding event, not a recurring act. Changes to federation scope (accession, exit, boundary) use the Tier 1 amendment protocol. |

---

## Accession — Joining After Founding

A unit that did not participate in founding may accede to the protocol through:

1. **Internal consent event** meeting the requirements above at the unit's own scale.
2. **Accession petition** to the federation CRP. The petition includes the unit's consent record, a roll of resident-personhood, and a demonstration of scale-eligibility (e.g., a locality demonstrating it contains at least 2 neighborhoods).
3. **Federation acknowledgment.** The federation publishes the accession, updates the drift chain to reflect the expanded scope, and the unit becomes protocol-bound on the effective date.

Accession is permissive — the federation may refuse accession only on narrow grounds:
- The unit's consent event did not meet the published requirements.
- The unit does not satisfy scale-tier bounds (e.g., a "locality" of 10,000 persons cannot accede as locality; it must split or accede as region-tier).
- The unit is contiguous with an already-non-consenting unit and accession would create incoherent geographic boundaries. In this case the federation works with the acceding unit to resolve the geography, not to block accession.

Federation refusal is subject to appeal to the Federated Ombuds (Annex AI).

---

## Non-Consenting Units — How the Protocol Treats Them

A non-consenting unit (one that has not performed the consent act):

1. **Is not bound by federation rules** other than the Tier 1 human-dignity floor.
2. **Is not represented** in the CRP or federation decision bodies. It does not vote; it is not counted in federation-scale apportionment.
3. **Does not receive LC entitlements** from the federation. Its residents may individually consent to the protocol (individual-personhood consent) and then travel to a consenting unit to claim LC, but the non-consenting unit itself is outside the LC system.
4. **Is not protected by federation enforcement** against most internal misconduct. The protocol's enforcement reach stops at consented boundaries, with the human-dignity exception noted.
5. **Receives humanitarian support** under the CSM exception. The federation maintains a minimal CSM provisioning capability for the human-dignity floor, delivered to non-consenting units through the least-invasive available means. This provisioning is not contingent on the unit's future consent.

**Human-dignity provisioning reach.** The federation's CSM provisioning to non-consenting units is limited to: caloric minimum (2,100 kcal/day), water minimum (50 L/day), emergency medical response (60 min urban, scaled for rural), emergency shelter access during acute weather events, and essential-medicines continuity (30-day WHO Model List). The provisioning is declared, audited annually by the Federated Ombuds, and published. It does not extend to discretionary services, to civic participation rights (which require consent), or to non-emergency infrastructure.

This design ensures the protocol cannot be used as a humanitarian lever for coerced accession. A unit that accepts CSM provisioning does not thereby consent to the full protocol; the provisioning is unconditional.

---

## Individual Personhood Within Non-Consenting Units

An individual personhood within a non-consenting unit retains:

- **Right to individual consent.** The individual may perform the individual-personhood consent act even if their unit has not consented. Individual consent makes the person a federation-recognized personhood.
- **Right to relocate.** An individually-consenting personhood within a non-consenting unit may relocate to a consenting unit and acquire full protocol participation on arrival.
- **Right to appeal.** An individual who believes their non-consenting unit is suppressing a consent process (e.g., by blocking public notice, rolling-stuffing, coerced abstention) may appeal to the Federated Ombuds. The Ombuds investigates and publishes findings; federation support for a reclaimed consent event may be authorized on Plenum vote (Annex AI §3.2).

The individual-consent pathway ensures that unit non-consent does not foreclose individual participation — the protocol's smallest authority unit is the person, not the geography.

---

## Withdrawal of Consent (Consent Unwind)

A unit that has consented may withdraw consent through the Exit Protocol (`exit_protocol.md`). Withdrawal of consent is exit; the two concepts are operationally identical. The distinction between "exiting the protocol" and "withdrawing consent" is terminological — both invoke the FC-120 / FC-121 procedure.

**Individual consent withdrawal.** An individual personhood may withdraw individual consent through a published individual act. Withdrawal takes effect on a 180-day wind-down during which the individual continues to receive LC at their last-eligible rate (to allow relocation). After wind-down, the individual is outside the protocol's individual-consent scope. Re-entry is permitted.

Individual withdrawal does not reduce a unit's consent status — the unit remains consented as long as 2/3 of its resident-personhood remain consented.

---

## Consent Record and Drift Chain Integration

Every consent event at any scale is logged to the protocol's drift chain (`/architecture/drift_chain.md`) with:

- Scale and identifier of the unit
- Participation count and vote breakdown
- Deliberation artifacts (publication URLs / content-addressed hashes)
- Effective date
- Signatures of the unit's representatives and the Federated Ombuds' attestation of procedural compliance

This makes the consent record publicly auditable in perpetuity. A consent event that does not appear on the drift chain is not operative.

---

## Governance

The consent rule is Tier 1 protected. Consent-event requirements (90-day notice, 60-day deliberation, 2/3 supermajority, roll-call) are Tier 1. Minimum participation floor (2/3) is Tier 1. Human-dignity CSM exception is Tier 1 and may be *strengthened* (floor raised) by Tier 2 amendment but never weakened without Tier 1.

---

*Consent is the act by which authority legitimates itself in the classical-liberal tradition. This protocol makes consent a published, renewable, procedurally-anchored event — not a presumption.*
