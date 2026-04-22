# Annex AK — Identity Asymmetric Error Doctrine

**Tier 2 founding commitment — required before deployment · Governed as P-004 protected specification**
**Status: PROPOSED (referenced by T-002 Session 8 update and P-016)**

---

## Purpose

The identity system (Article II, P-003) faces a structural calibration dilemma that cannot be resolved by design alone. Any identity assurance threshold stringent enough to prevent fraud at scale will also exclude some genuinely vulnerable people. Any threshold permissive enough to include all genuinely vulnerable people will allow some fraud. There is no threshold that achieves both simultaneously.

The current P-003 open problem states: "calibrate fraud tolerance without making the system unusable for displaced, undocumented, or digitally fragile people." This is an accurate description of an unsolved problem. Without explicit, pre-committed targets, that calibration is permanently subject to political pressure — toward fraud-prevention (when a fraud incident is in the news) or toward inclusion (when an exclusion incident is in the news). Either direction, driven by political reaction rather than principled design, produces worse outcomes than a pre-committed doctrine.

The **Asymmetric Error Doctrine (AED)** is the founding coalition's explicit, public, Tier 2 commitment to the trade-off. It does not solve the dilemma. It makes the trade-off visible, governable, and resistant to reactive manipulation.

---

## Structure of the Doctrine

The AED specifies six things:

1. **Maximum acceptable fraud rates** — per instrument tier, per quarter
2. **Maximum acceptable exclusion rates** — for vulnerable populations, per tier, per quarter
3. **Review triggers** — when either rate is exceeded
4. **Decision rule for trade-offs** — what happens when reducing fraud requires accepting more exclusion, or vice versa
5. **Annual recalibration process** — how the targets are reviewed and by whom
6. **Publication commitment** — what is published, how often, and in what form

Each is specified below as a commitment slot. The AED as a commitment architecture is Tier 2 at founding; the activation variables are tracked explicitly as reserved commitments **FC-140 through FC-150** in `/founding/commitments.md` until first-year pilot data is sufficient to bind them before the first scale-up decision.

---

## Section 1 — Maximum Acceptable Fraud Rates

*Fraud is defined as: a person receiving Essential Access, Voice, or Service Record entitlements under an identity that does not correspond to a unique living person — including duplicate identities, synthetic identities, takeover of another person's account, and proxy use that results in over-issuance.*

| Instrument Tier | Fraud Rate Target (% of enrolled population per quarter) | Upper Tolerance Bound | Mandatory Audit Trigger |
| :--- | :--- | :--- | :--- |
| **Essential Access — Essential Access** | FC-140 target (reserved; recommended anchor: ≤0.5%) | FC-140 upper bound (reserved; recommended anchor: 1.0%) | FC-140 trigger (reserved; recommended anchor: exceeded in 2 consecutive quarters) |
| **Voice — Voice** | FC-141 target (reserved) | FC-141 upper bound (reserved) | FC-141 trigger (reserved) |
| **Service Record — Service Record** | FC-142 target (reserved) | FC-142 upper bound (reserved) | FC-142 trigger (reserved) |

**Rationale for asymmetry between tiers:** Essential Access fraud directly consumes physical supply — food, housing support, healthcare capacity. Voice and Service Record fraud distorts civic process but does not directly consume physical resources. The founding coalition should set stricter fraud tolerances for Essential Access than for Voice and Service Record, recognising that Essential Access fraud has immediate physical consequence while civic layer fraud has a slower and more diffuse effect.

**How to measure:** Fraud rate is measured as: confirmed fraud cases (after investigation) as a percentage of total enrolled population in that tier per quarter. Suspected but unconfirmed cases are tracked separately and used for trend monitoring, not rate calculation. The measurement methodology must be independent from the identity system operators.

---

## Section 2 — Maximum Acceptable Exclusion Rates

*Exclusion is defined as: a person who is a unique living person, eligible for the entitlement, and correctly identifying themselves, who is denied access — or who abandons the process because it is functionally inaccessible — due to identity system requirements they cannot satisfy.*

**Vulnerable population categories (non-exhaustive — founding coalition may extend):**

| Vulnerable Category | Exclusion Rate Target (% of estimated vulnerable population in that category per quarter) | Upper Tolerance Bound | Mandatory Audit Trigger |
| :--- | :--- | :--- | :--- |
| **Displaced persons (internal migration, emergency relocation)** | FC-143 target (reserved) | FC-143 upper bound (reserved) | FC-143 trigger (reserved) |
| **Undocumented persons (no state-recognised documentation)** | FC-144 target (reserved) | FC-144 upper bound (reserved) | FC-144 trigger (reserved) |
| **Digitally fragile persons (no smartphone, limited literacy, disability)** | FC-145 target (reserved) | FC-145 upper bound (reserved) | FC-145 trigger (reserved) |
| **Recovery/crisis situations (domestic violence, trafficking, incapacity)** | FC-146 target (reserved) | FC-146 upper bound (reserved) | FC-146 trigger (reserved) |
| **Overall population (all enrolled persons)** | FC-147 target (reserved) | FC-147 upper bound (reserved) | FC-147 trigger (reserved) |

**Rationale for tier-specific tracking:** Exclusion rates for vulnerable categories are tracked separately from the overall population because aggregate rates obscure concentrated harm. A 1% overall exclusion rate that is evenly distributed is a different problem than a 1% overall exclusion rate concentrated entirely among undocumented persons.

**How to measure:** Exclusion rate requires active monitoring — it is not visible in successful-enrollment data alone. Measurement requires: (a) periodic sampling at access points where people attempt to enrol but do not complete; (b) Federated Ombuds reporting from advocacy organisations; (c) cross-matching with estimated vulnerable population size from independent sources. The measurement methodology must include advocates and researchers from vulnerable communities.

**The estimation problem:** Estimating the size of the vulnerable population is itself contested and uncertain. The founding coalition must specify the methodology for population size estimation and commit to using it consistently. A conservative (higher) estimate of vulnerable population size produces a lower apparent exclusion rate, which could mask real exclusion. The AED should specify that the founding coalition uses the most inclusive available estimate.

---

## Section 3 — Review Triggers

When either fraud rates or exclusion rates exceed the targets specified in Sections 1 and 2:

| Trigger condition | Required response | Timeline |
| :--- | :--- | :--- |
| Fraud rate exceeds target in one quarter | Published notice and causal analysis | Within 30 days of quarter close |
| Fraud rate exceeds upper tolerance in one quarter, or target in two consecutive quarters | Independent audit of identity system controls | Commissioned within 14 days; completed within 90 days |
| Exclusion rate exceeds target for any vulnerable category in one quarter | Published notice and causal analysis | Within 30 days of quarter close |
| Exclusion rate exceeds upper tolerance for any vulnerable category in one quarter | Independent audit and mandatory system review | Commissioned within 14 days; completed within 60 days |
| Both fraud and exclusion rates simultaneously exceed targets | Joint audit with explicit trade-off analysis | Commissioned within 14 days; completed within 60 days |

All published notices and audit findings are public. The Article VII dashboard must publish current-quarter fraud and exclusion rates as standard operational metrics.

---

## Section 4 — Decision Rule for Trade-Offs

This is the most consequential section. It specifies what happens when the identity system cannot simultaneously satisfy both the fraud rate target and the exclusion rate target — when tightening controls to reduce fraud will increase exclusion, or loosening controls to reduce exclusion will increase fraud.

**Default rule:** When a calibration decision will push one rate above its target to bring the other below its target, the decision rule is:

> **Exclusion reduction takes priority over fraud reduction when: the exclusion rate for any vulnerable category would exceed FC-148 (reserved exclusion-priority multiplier; recommended anchor: twice the exclusion target) AND the fraud rate is below FC-149 (reserved fraud-priority bound).**

> **Fraud reduction takes priority over exclusion reduction when: the fraud rate exceeds FC-149 (reserved fraud-priority bound) AND the exclusion rate for all vulnerable categories is below the corresponding Section 2 upper-tolerance commitments (FC-143 through FC-147).**

> **When both rates simultaneously exceed their upper tolerance bounds, an independent review panel convenes within 14 days to make a binding recommendation. The founding coalition's pre-committed default preference is FC-150 (reserved; exclusion-first or fraud-first).**

**Rationale for the asymmetry:** The protocol's foundational commitment is that survival is unconditional. An identity system that excludes genuinely vulnerable people from the survival floor is a more fundamental violation of the protocol's purpose than one that permits a higher rate of fraud. However, Essential Access fraud directly consumes physical supply that is needed by genuine recipients — so fraud above the upper tolerance bound is not a minor concern. The founding coalition's pre-committed preference encodes the relative weight placed on these two failure modes.

**What this rule is not:** This is not a rule that automatically recalibrates the identity system. It is a decision rule for when human reviewers must make a calibration change. The rule specifies who has priority in those decisions and under what conditions.

---

## Section 5 — Annual Recalibration Process

The fraud and exclusion rate targets in this annex are not permanent. They are evidence-gated:
- The specific numbers are filled in by the founding coalition after first-year pilot data.
- They are reviewed annually thereafter by an independent recalibration panel.
- They may be tightened (lower targets) as the identity system matures and evidence accumulates.
- They may be loosened (higher targets) only if evidence shows that a tighter target is producing systematic harm — and only through the Section 4 decision rule process, not through unilateral adjustment.

**Recalibration panel composition:**
- At least one member from a vulnerable-population advocacy organisation with no material funding relationship with the identity system operators.
- At least one independent identity systems expert with no material funding relationship with the founding coalition.
- At least one member nominated by the Federated Ombuds.
- Recalibration findings and any proposed changes are published 30 days before taking effect.

**Protected floor:** The exclusion rate upper tolerance bounds may not be loosened without H-2 amendment process. These represent the maximum harm the system is willing to inflict on vulnerable populations; they are treated as constitutional commitments, not operational parameters.

---

## Section 6 — Publication Commitment

The following is published quarterly as part of the Article VII public dashboard:

| Metric | Publication format |
| :--- | :--- |
| Fraud rate per instrument tier (current quarter) | Number and percentage with confidence interval |
| Exclusion rate per vulnerable category (current quarter) | Number and percentage with confidence interval and population size estimate |
| Whether any review trigger was exceeded | Yes/No per trigger condition; if Yes, link to published analysis |
| Current calibration setting summary | Plain-language description of the current assurance threshold configuration |
| AED targets (current) | The founding commitment numbers in this annex, publicly visible |

Publication of the AED targets themselves converts the doctrine from a private intention into a public commitment. If the published rates diverge from the targets, the divergence is public. This is the mechanism that makes the doctrine meaningful: it cannot be quietly abandoned.

---

## Founding Coalition Instructions

To complete this annex before deployment, the founding coalition must:

1. **Bind FC-140 through FC-150** in Sections 1, 2, and 4, using first-year pilot data where available or conservative estimates where not.
2. **Specify the vulnerable population estimation methodology** for each category in Section 2, including the source and the rationale for choosing a conservative estimate.
3. **State the pre-committed preference** in Section 4's third decision rule — whether, when both rates simultaneously exceed bounds, the default preference is to protect against exclusion or against fraud.
4. **Convene the recalibration panel** before the first annual review, ensuring composition requirements are met.
5. **Integrate AED metrics into the Article VII dashboard** before any public launch — the commitment is only real if it is visible.

The AED is Tier 2 once adopted. The decision rule in Section 4 (including the pre-committed preference) may not be changed without H-2 amendment process. Specific rate targets may be adjusted through the annual recalibration process within the bounds specified here.

---

*This document is Annex AK of the Humane Constitution. The commitment architecture is operative as a PROPOSED standard. The specific rate targets remain an evidence gate: tracked today through reserved commitments FC-140 through FC-150, then bound from pilot evidence and locked as Tier 2 before the first scale-up gate.*
