# ANNEX AK — Identity Asymmetric Error Doctrine

> **Provenance:** Implements [P-016 — Identity Asymmetric Error Doctrine] · Addresses T-002 · Status: see Patch Log

**Tier 2 founding commitment — required before deployment · Governed as P-004 protected specification**
**Status: PROPOSED (referenced by T-002 and P-016)**

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Sets the constitutional rule for identity mistakes: pre-commits maximum acceptable fraud and exclusion rates per instrument tier, establishes a public decision rule for trade-offs, and creates an Independent Identity Auditor to publish quarterly evidence against the targets. |
> | **Who it protects** | People most likely to be excluded by document, digital, disability, displacement, or coercion barriers — displaced persons, undocumented persons, digitally fragile persons, people in recovery or crisis situations; also protects Essential Access supply from identity fraud that consumes physical goods. |
> | **Failure risk** | Without a pre-committed public doctrine, political pressure swings the identity system toward harsh exclusion after fraud incidents or toward uncontrolled over-issuance after exclusion scandals; reactive calibration produces worse outcomes than a principled trade-off framework. |
> | **Evidence status** | Designed |
> | **Linked risks** | T-002 / P-003 / P-016 (identity assurance and asymmetric error); FC-140 through FC-150; Annex P (identity stack); IIA quarterly reporting |

---

## Purpose

The identity system (Article II, P-003) faces a structural calibration dilemma that cannot be resolved by design alone. Any identity assurance threshold stringent enough to prevent fraud at scale will also exclude some genuinely vulnerable people. Any threshold permissive enough to include all genuinely vulnerable people will allow some fraud. There is no threshold that achieves both simultaneously.

The current P-003 open problem states: "calibrate fraud tolerance without making the system unusable for displaced, undocumented, or digitally fragile people." This is an accurate description of an unsolved problem. Without explicit, pre-committed targets, that calibration is permanently subject to political pressure — toward fraud-prevention (when a fraud incident is in the news) or toward inclusion (when an exclusion incident is in the news). Either direction, driven by political reaction rather than principled design, produces worse outcomes than a pre-committed doctrine.

The **Asymmetric Error Doctrine (AED)** is the founding coalition's explicit, public, Tier 2 commitment to the trade-off. It does not solve the dilemma. It makes the trade-off visible, governable, and resistant to reactive manipulation.

---

## Plain-Language Guide

This annex is about identity mistakes.

There are two bad mistakes:

- **Fraud:** someone gets benefits through an identity that is not a unique living person.
- **Exclusion:** a real eligible person is blocked because the identity process is too hard, too digital, too document-heavy, or unsafe for their situation.

The system cannot drive both mistakes to zero. This annex forces the founding coalition to say, in public, how much risk it will tolerate and what happens when the numbers get too high.

The plain rule is: protecting vulnerable real people from exclusion usually deserves special weight, but serious Essential Access fraud also matters because it consumes real food, shelter, care, and medicine.

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
| **Essential Access — Essential Access** | FC-140 — **≤2%** (bound; anchored below SNAP program error rate 2–3%) | FC-140 upper bound — **≤5%** (bound) | FC-140 trigger — **≥3% in any quarter** (bound) |
| **Voice — Voice** | FC-141 — **≤3%** (bound; looser than Essential Access; consistent with democratic-participation error tolerances) | FC-141 upper bound — **≤7%** (bound) | FC-141 trigger — **≥5% in any quarter** (bound) |
| **Service Record — Service Record** | FC-142 — **≤5%** (bound; consistent with public-employment verification tolerances) | FC-142 upper bound — **≤10%** (bound) | FC-142 trigger — **≥7% in any quarter** (bound) |

**Plain rationale for different tiers:** Essential Access fraud directly consumes physical supply: food, housing support, healthcare capacity. Voice and Service Record fraud distorts civic process but does not directly consume physical resources. The founding coalition should set stricter fraud tolerances for Essential Access than for Voice and Service Record, recognizing that Essential Access fraud has immediate physical consequences while fraud against the civic instruments has a slower and more diffuse effect.

**How to measure:** Fraud rate is measured as: confirmed fraud cases (after investigation) as a percentage of total enrolled population in that tier per quarter. Suspected but unconfirmed cases are tracked separately and used for trend monitoring, not rate calculation. The measurement methodology must be independent from the identity system operators.

---

## Section 2 — Maximum Acceptable Exclusion Rates

*Exclusion is defined as: a person who is a unique living person, eligible for the entitlement, and correctly identifying themselves, who is denied access — or who abandons the process because it is functionally inaccessible — due to identity system requirements they cannot satisfy.*

**Vulnerable population categories (non-exhaustive — founding coalition may extend):**

| Vulnerable Category | Exclusion Rate Target (% of estimated vulnerable population in that category per quarter) | Upper Tolerance Bound | Mandatory Audit Trigger |
| :--- | :--- | :--- | :--- |
| **Displaced persons (internal migration, emergency relocation)** | FC-143 — **≤3%** (bound; tighter than UNHCR <5% target; displaced persons have no alternative access route) | FC-143 upper bound — **≤6%** (bound) | FC-143 trigger — **≥4% in any quarter** (bound) |
| **Undocumented persons (no state-recognised documentation)** | FC-144 — **≤5%** (bound; documentation barriers produce structurally higher baseline) | FC-144 upper bound — **≤8%** (bound) | FC-144 trigger — **≥6% in any quarter** (bound) |
| **Digitally fragile persons (no smartphone, limited literacy, disability)** | FC-145 — **≤5%** (bound; structural access barriers produce higher baseline; tracked separately to prevent aggregate masking) | FC-145 upper bound — **≤8%** (bound; hard ceiling requires mandatory architecture review) | FC-145 trigger — **≥6% in any quarter** (bound) |
| **Recovery/crisis situations (domestic violence, trafficking, incapacity)** | FC-146 target — **≤4%** (conservative anchor; crisis situations involve identity disruption that structurally increases exclusion risk; bind with pilot data before scale-up gate) | FC-146 upper bound — **≤7%** (conservative anchor) | FC-146 trigger — **≥5% in any quarter** (conservative anchor) |
| **Overall population (all enrolled persons)** | FC-147 target — **≤2%** (conservative anchor; aggregate rate masks vulnerable-category concentration; bind with pilot data before scale-up gate) | FC-147 upper bound — **≤4%** (conservative anchor) | FC-147 trigger — **≥3% in any quarter** (conservative anchor) |

**Plain rationale for separate tracking:** Exclusion rates for vulnerable categories are tracked separately from the overall population because averages can hide concentrated harm. A 1% overall exclusion rate spread evenly is different from a 1% overall exclusion rate concentrated entirely among undocumented persons.

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

This is the most consequential section. It specifies what happens when the identity system cannot satisfy both the fraud target and the exclusion target at the same time: tightening controls may reduce fraud but increase exclusion, while loosening controls may reduce exclusion but increase fraud.

**Default rule:** When a calibration decision will push one rate above its target to bring the other below its target, the decision rule is:

> **Exclusion reduction takes priority over fraud reduction when: the exclusion rate for any vulnerable category would exceed FC-148 (reserved exclusion-priority multiplier; recommended anchor: twice the exclusion target) AND the fraud rate is below FC-149 (reserved fraud-priority bound).**

> **Fraud reduction takes priority over exclusion reduction when: the fraud rate exceeds FC-149 (reserved fraud-priority bound) AND the exclusion rate for all vulnerable categories is below the corresponding Section 2 upper-tolerance commitments (FC-143 through FC-147).**

> **When both rates simultaneously exceed their upper tolerance bounds, an independent review panel convenes within 14 days to make a binding recommendation. The founding coalition's pre-committed default preference is FC-150 (reserved; exclusion-first or fraud-first). Until FC-150 is formally bound in `/founding/commitments.md`, the operative interim default is: exclusion reduction takes priority. This interim default is explicitly superseded when FC-150 is bound. A simultaneous breach that occurs before FC-150 is bound must be resolved under this interim default and the resolution documented as a founding precedent.**

**Rationale for the asymmetry:** The protocol's foundational commitment is that survival is unconditional. An identity system that excludes genuinely vulnerable people from the survival floor is a more fundamental violation of the protocol's purpose than one that permits a higher rate of fraud. However, Essential Access fraud directly consumes physical supply that is needed by genuine recipients — so fraud above the upper tolerance bound is not a minor concern. The founding coalition's pre-committed preference encodes the relative weight placed on these two failure modes.

**What this rule is not:** This is not a rule that automatically changes the identity system. It is a decision rule for when human reviewers must make a calibration change. The rule specifies who gets priority in those decisions and under what conditions.

---

## Section 5 — Annual Recalibration Process

The fraud and exclusion rate targets in this annex are not permanent. They are evidence-gated:
- The specific numbers are filled in by the founding coalition after first-year pilot data.

*Where recommended anchors are specified above, those values are promoted to provisional founding commitments pending pilot confirmation. All provisional values remain pre-launch blocking gates.*
- They are reviewed annually thereafter by an independent recalibration panel.
- They may be tightened (lower targets) as the identity system matures and evidence accumulates.
- They may be loosened (higher targets) only if evidence shows that a tighter target is producing systematic harm — and only through the Section 4 decision rule process, not through unilateral adjustment.

**Recalibration panel composition:**
- At least one member from a vulnerable-population advocacy organisation with no material funding relationship with the identity system operators.
- At least one independent identity systems expert with no material funding relationship with the founding coalition.
- At least one member nominated by the Federated Ombuds.
- Recalibration findings and any proposed changes are published 30 days before taking effect.

**Protected floor:** The exclusion rate upper tolerance bounds may not be loosened without H-2 amendment process. These represent the maximum harm the system is willing to impose on vulnerable populations; they are treated as constitutional commitments, not operational settings.

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

Publication of the AED targets turns the doctrine from a private intention into a public commitment. If the published rates diverge from the targets, the divergence is public. This is what makes the doctrine meaningful: it cannot be quietly abandoned.

---

## Section 7 — Asymmetric Default Rule

The identity system faces a structural trade-off: any threshold stringent enough to prevent fraud at scale will also exclude some genuinely vulnerable people. This section establishes a constitutional presumption for cases where the system cannot simultaneously satisfy both its fraud target and its exclusion target.

**The rule:** When the identity system cannot simultaneously satisfy both the fraud rate target (Section 1) and the exclusion rate target (Section 2) for a given population or instrument tier, the system shall resolve the conflict in favor of inclusion. The burden of proof for any exclusion decision rests on the system, not on the individual.

**Procedural floor:** No enrolled person shall be excluded from the survival floor (Essential Access) on the basis of documentation failure alone without:
1. An independent review of the exclusion decision, conducted by a reviewer not affiliated with the identity system operators.
2. A written determination stating the specific basis for exclusion.
3. A time-bounded review: the determination must be issued within **14 calendar days** of the exclusion event. If no determination is issued within 14 days, the exclusion is automatically reversed and the person's Essential Access is restored pending a new proceeding. **Sensing mechanism:** The identity system must maintain a real-time exclusion-clock register — a persistent record of every open exclusion event with a dated ticket, the 14-day deadline, and current status (open, determination issued, or clock-expired reversal triggered). The register is accessible to the IIA (§8) in real time. When a ticket's deadline expires without a determination, the system generates a reversal notice immediately, restores Essential Access, and marks the ticket as clock-expired. The IIA's quarterly report (§8) separately tracks the count of clock-expired reversals as a compliance metric. Without a live register, the 14-day guarantee is not enforceable — this register is a pre-operational prerequisite, not a post-launch improvement.
4. Notice to the affected person in a language and format accessible to them.

**Scope:** This rule applies to all exclusion decisions at the Essential Access tier. It does not apply to temporary restrictions at the Voice or Service Record tier, which are governed by their own review procedures. It does not prevent the system from requiring additional verification — it prevents final exclusion without independent, time-bounded review.

**Interaction with numeric targets:** The asymmetric default rule operates independently of whether FC-143 through FC-147 exclusion rate targets have been formally bound. The procedural floor is a constitutional right, not a calibration preference. Binding numeric targets supplements but does not replace this rule.

---

## Section 8 — Independent Identity Auditor

**Mandate:** The Founding Coalition shall establish, before operational activation, an Independent Identity Auditor (IIA) as a permanent officer of the protocol, distinct from the Federated Ombuds. The IIA's sole statutory mandate is to monitor, measure, and publicly report on the performance of the identity system against the targets established in this annex.

**Reporting obligation:** The IIA shall publish a public quarterly report covering:
- Fraud rate per instrument tier (Section 1), compared to FC-140–FC-142 targets.
- Exclusion rate per vulnerable population category (Section 2), compared to FC-143–FC-147 targets.
- Number and outcome of independent reviews conducted under Section 7.
- Number of cases where the 14-day review deadline was missed, and the disposition of those cases.
- Any instrument tier or vulnerable category for which measurement data is not available, with a stated explanation.

**Absence-of-data rule:** Failure to produce measurement data for any instrument tier or vulnerable population category is itself a reportable failure. The IIA shall flag each quarter in which data was unavailable, name the responsible operator or data source, and — if data has been unavailable for two consecutive quarters — refer the matter to the Federated Ombuds as a potential compliance failure.

**Independence:** The IIA shall have no operational role in the identity system. The IIA may not be employed by or contracted to any identity system operator. Appointment and removal of the IIA requires a Tier 2 amendment process, preventing removal in response to unfavorable findings.

**Interaction with §7:** The IIA's quarterly report serves as the primary evidence base for evaluating whether the asymmetric default rule (Section 7) is being respected at scale. A pattern of systematically missed 14-day review deadlines, or a pattern of exclusion-rate data unavailability, constitutes prima facie evidence of §7 non-compliance and must be referred to the Federated Ombuds.

---

## AK5 — Pilot Gate Criteria

Before the identity system can advance from DESIGNED to evidence-backed status, a pilot must demonstrate all five gates below in the same pilot period. Gate results must be reported by the Independent Identity Auditor (Section 8), not by system operators.

**Gate 1 — False-exclusion rate below trigger threshold (required for each population class):**
- Displaced persons: measured quarterly exclusion rate ≤ FC-143 upper bound (6%) in the pilot population.
- Undocumented persons: measured quarterly exclusion rate ≤ FC-144 upper bound (8%) in the pilot population.
- Digitally fragile persons: measured quarterly exclusion rate ≤ FC-145 upper bound (8%) in the pilot population.
- Overall population: measured quarterly exclusion rate ≤ FC-147 upper bound (to be bound before first scale-up gate).

**Gate 2 — Recovery path functional:** At least 95% of persons who initiated a recovery request received a determination within 14 days in the pilot period. Determinations must be independently audited, not self-reported.

**Gate 3 — Asymmetric default active:** All Essential Access exclusions that lacked a timely determination within 14 days must have been automatically reversed. The pilot must document the count of automatic reversals and confirm no person remained excluded past the 14-day window without an active determination.

**Gate 4 — False-acceptance rate below trigger threshold:** Essential Access fraud rate ≤ FC-140 trigger threshold (3%) in the pilot period, measured by independent audit of a stratified sample.

**Gate 5 — No single-point failure:** The pilot must include at least one test of device loss, credential loss, or identity document destruction for each population class, with documented recovery outcomes.

**Pilot advancement rule:** Gates 1–5 must all pass in the same pilot period before any claim moves from "needs evidence" to "partly tested." A single gate failure triggers a mandatory architecture review before the next pilot cycle. Gate passage is certified by the Independent Identity Auditor under Section 8.

---

## Founding Coalition Instructions

To complete this annex before deployment, the founding coalition must:

1. **FC-140 through FC-145 are now bound** (see `/founding/commitments.md`). **FC-146 through FC-150** in Sections 2 and 4 remain reserved; bind using first-year pilot data where available or conservative estimates where not before the first scale-up gate.
2. **Specify the vulnerable population estimation methodology** for each category in Section 2, including the source and the rationale for choosing a conservative estimate.
3. **State the pre-committed preference** in Section 4's third decision rule — whether, when both rates simultaneously exceed bounds, the default preference is to protect against exclusion or against fraud.
4. **Convene the recalibration panel** before the first annual review, ensuring composition requirements are met.
5. **Integrate AED metrics into the Article VII dashboard** before any public launch — the commitment is only real if it is visible.

The AED is Tier 2 once adopted. The decision rule in Section 4 (including the pre-committed preference) may not be changed without H-2 amendment process. Specific rate targets may be adjusted through the annual recalibration process within the bounds specified here.

---

*This document is Annex AK of the Humane Constitution. The commitment architecture is operative as a PROPOSED standard. FC-140 through FC-145 have been bound with evidence-grounded values before the first scale-up gate (see `/founding/commitments.md`). FC-146 through FC-150 remain reserved pending pilot data and are pre-launch blocking gates.*

---

## §AK8 — Two-Tier Access Model

### AK8.1 — Tier 0: Open-Access Survival Floor

Any person may receive Essential Access at the Constitutional Survival Minimum (CSM) without providing or confirming real-world identity. Tier 0 is an open CSM bridge, not a lesser survival class.

When a CSM need cannot be met safely in a single session - for example continuing medicine, protected shelter, crisis care, or family/dependent continuity - the system must provide a privacy-preserving continuity path that does not require full civic identity. Continuity tokens may remember the need, appointment, and non-duplication state; they may not become Voice, Flow, Service Record, immigration enforcement, political scoring, or a general-purpose identity dossier.

**Non-duplication mechanism:** A Tier 0 allocation is keyed to a single-session pseudonymous token generated at point of access. The token is non-transferable, expires after use, and cannot be aggregated across sessions. No persistent identifier is created. The issuing node records only that one CSM allocation was consumed from available capacity — not by whom.

The token mechanism must be designed so that token-issuance infrastructure cannot reconstruct session linkage after the session closes. The constitutional framework for the Tier 0 token mechanism is defined in ANNEX_AZ §AZ2.1; technical implementation is delegated to the TSP designated for Tier 0 identity and access, as specified there. This mechanism is a pre-operational prerequisite under INV-LAUNCH-1.

**Fraud model:** Deliberate double-claiming at the CSM tier is physically constrained (one body, one place, one time) and socially normed. The system trusts that there is enough for everyone. Citizens bear a collective duty to keep the commons honest: double-dipping is a civic wrong not because the system cannot afford it at the margin, but because it degrades the social trust that makes the open floor possible. Detection is aggregate: if per-capita consumption systematically exceeds physical capacity, the oracle flags a population-level anomaly for community review — not for individual surveillance.

**What Tier 0 does not provide:**
- Continuity across sessions (prior allocations are not retrievable without Tier 1 enrollment)
- Above-CSM allocations
- Access to Voice, Service Record, or Flow accounts
- Above-CSM scheduling priority or planning privileges, except where continuity is required to deliver the CSM itself

### AK8.2 — Tier 1: Identity-Gated Services

Above-floor services, civic instruments (Voice, Service Record), and Flow accounts require confirmed identity under the enrollment process defined in §AK1–AK3 and ANNEX_P.

Tier 1 enrollment is voluntary. No person may be coerced into Tier 1 enrollment by conditioning CSM-tier access on it.

A person who enrolled at Tier 1 and subsequently demonstrates a documented safety reason for de-enrollment (per ANNEX_AX §AX2 — Safety-Shielded Enrollment) may revert to Tier 0 access without penalty. De-enrollment does not forfeit prior earned rights under Tier 1.

A person enrolled at Tier 1 may not simultaneously claim Tier 0 sessions for the same Essential Access category in the same time window.

### AK8.3 — Civic Accountability Norm and Aggregate Monitoring

The open floor rests on a social compact: because there is enough for everyone, there is no legitimate reason to take more than one's share. The Tier 0 model does not surveil individuals to enforce this norm. It distributes trust and makes the cost of betraying it visible at the community level.

Community-level anomaly findings are published in plain language on the public dashboard. The Federated Ombuds may investigate systematic Tier 0 anomaly only when aggregate consumption exceeds the anomaly threshold (FC-T0-01) for 30 or more consecutive days and no capacity-measurement explanation is found. Individual-level investigation under Tier 0 is prohibited.

The anomaly threshold (FC-T0-01) is a Tier 3 operational parameter registered in the Parameter Calibration Register. The Federated Ombuds may adjust it by standard FAP process, provided the revised threshold is not lower than 2% or higher than 15% of CSM capacity in the relevant category.

Community review of an aggregate anomaly finding is convened by the relevant Regional Essential Board within 30 days of Ombuds publication. The REB may recommend: (a) capacity reclassification, (b) token-mechanism audit, or (c) suspension of a compromised Tier 0 token mechanism for the affected category pending investigation (requires Ombuds concurrence). A token-mechanism suspension may never suspend CSM delivery; it must be paired with an alternate open-access delivery path before it takes effect. Token-mechanism suspension is a PCRP-equivalent event and subject to the same unwind requirements under ANNEX_AQ.

### AK8.4 — Relationship to INV-001

This section implements, rather than amends, INV-001's existing protection: "Confirmation of identity is required to access civic instruments (Voice, Service Record, and deliberative standing) but is never a precondition for survival access." The two-tier model operationalizes that distinction.
