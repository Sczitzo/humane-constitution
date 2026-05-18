# ANNEX AL — Methodology-Class Definitions for Oracle Independence

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Defines what counts as a genuinely different oracle methodology, so capacity measurements cannot all share the same blind spot while appearing independent. |
> | **Who it protects** | People whose food, shelter, medicine, or rationing decisions depend on accurate real-capacity measurement; also protects the public record from standards-body, data, or AI monoculture capture. |
> | **Failure risk** | Operators could relabel similar measurement systems as independent, use shared data or standards, or hide correlated algorithmic errors until every oracle fails in the same direction. |
> | **Evidence status** | Active — unproven |
> | **Linked risks** | T-007, T-020, T-021; P-017; P-004 |

> **Provenance:** Implements [P-017 — Oracle Epistemological and Algorithmic Independence] · Addresses T-020 and T-021 · Status: **ACTIVE**

**Pre-launch blocking gate — required before P-017 is operative · Governed as P-004 protected specification**
**Status: ACTIVE — founding commitments resolved (FC-030, FC-031, FC-032, FC-033, FC-090, FC-091)**
**Numerical values derive from `/founding/commitments.md`. Changes to commitments require Tier 1 (H-3) amendment per Proposal 1.**

---

## Purpose

P-017 (Oracle Epistemological and Algorithmic Independence) requires that RCS accreditation include at least one measurement node per high-volatility essential category using a **fundamentally different methodology class**. This requirement is meaningless without a pre-committed, drift-resistant definition of what "methodology class" means and what "fundamentally different" requires.

The T-020 open problem states: *"Defining 'fundamentally different methodology class' is itself subject to definition drift (T-007). 'Methodology class' must be a P-004 protected term with worked examples."*

Without this annex, a sophisticated actor can satisfy the letter of P-017 by submitting two measurement nodes that use nominally different methods but share the same epistemological foundations — the same standards body, the same theoretical assumptions, the same training data provenance — while being formally classified as different "classes." The protection against epistemic monoculture evaporates. The T-020 and T-021 mitigations fail.

This annex provides the definitions, the worked examples (both qualifying and disqualifying), the anti-drift governance mechanism, and the audit requirement. Its numerical founding bindings now resolve through `/founding/commitments.md`; the remaining pre-launch gate is publication of the initial methodology-class registry.

---

## Plain-Language Guide

This annex explains how the system avoids trusting one kind of measurement too much.

If every oracle uses the same data, same assumptions, or same standards body, they can all be wrong in the same way. This annex requires different kinds of measurement so one blind spot does not become the system's reality.

In plain terms:

- Some oracles use official statistics.
- Some use community-based research.
- Some directly inspect physical conditions.
- At least three different measurement classes are required.
- At least one oracle is expected to challenge the others.
- Shared standards bodies, shared data, or shared AI systems can trigger extra review.

---

## Structure of this Annex

This annex specifies five things:

1. **Core definition of "methodology class"** — the P-004 protected definition with its essential components
2. **Definition of "fundamentally different"** — the operational standard for when two classes satisfy the diversity mandate
3. **Worked examples** — three canonical classes with examples, and disqualifying cases that look different but are not
4. **Anti-monoculture trigger** — the standards-body concentration rule and its enforcement
5. **Annual audit of worked examples** — how the definitions are reviewed and updated without enabling drift

---

## Section 1 — Core Definition: "Methodology Class"

*This definition is a P-004 protected term. It may not be modified without a Tier 2 (H-2) amendment.*

**Definition:** A **methodology class** is a category of measurement approach defined by three jointly necessary characteristics:

| Characteristic | Meaning |
| :--- | :--- |
| **Knowledge basis** | The underlying theory of how knowledge about the measured phenomenon is obtained — what counts as evidence, what counts as valid inference, and what sources of uncertainty are recognized as material |
| **Data generation process** | How the primary data is produced — by whom, using what instruments, at what resolution, with what sampling frame |
| **Standards provenance** | Which body or bodies define the validity criteria, calibration standards, and reporting requirements for the measurement approach |

Two measurement nodes belong to the **same methodology class** if they share any two of these three characteristics with any other node in the same accredited set for a given essential category. Two measurement nodes belong to **different methodology classes** if they differ on all three characteristics.

**Why three components, and why any two trigger same-class classification:** The knowledge basis determines what errors are visible and invisible to the measurement approach. The data generation process determines what physical and social conditions can introduce bias. The standards provenance determines who decides what counts as valid. A method that changes its data generation process but keeps the same assumptions and standards body has not changed its risk profile in a meaningful way: it can still be captured through the standards body, and its errors are still invisible to itself by design.

---

## Section 2 — Definition: "Fundamentally Different"

*This definition is a P-004 protected term. It may not be modified without a Tier 2 (H-2) amendment.*

Two methodology classes are **fundamentally different** for the purposes of P-017 if and only if:

1. They differ on **all three** characteristics in Section 1.
2. Neither class's standards provenance has a funding or governance relationship with the other's standards provenance within the prior **5 years** (lookback window; lengthens to 10 years for standards bodies with material operating ties).
3. The knowledge bases predict **materially different error structures** — meaning the systematic errors each approach is most likely to make under manipulation or institutional pressure are not correlated.

Criterion 3 is operationalized through the **error independence test**: given a known manipulation of the measured phenomenon (e.g., artificial suppression of reported food scarcity), would both methods be expected to fail in the same direction? If yes, they are not fundamentally different regardless of formal classification. If no — one would overstate, one would understate, or one would detect when the other does not — they satisfy criterion 3.

The error independence test is applied during RCS accreditation review and documented in the accreditation record. It is a prospective assessment, not a historical one.

**Quantitative corroboration:** wherever the oracle nodes have produced at least 18 months of overlapping time-series data for the measured category, the prospective error independence test is supplemented by a historical **pairwise error correlation** check. The Pearson correlation coefficient between any two nodes' error series (measured against the ensemble median or an independent ground-truth sample) must not exceed **FC-032 = 0.30**. Pairs above this threshold are classified as structurally dependent regardless of formal classification and must be resolved by reducing the count in one class or introducing additional independent nodes before Shared Storehouse activation is (re-)authorized.

---

## Section 3 — Worked Examples

*These examples are illustrative and not exhaustive. They establish the standard; new measurement approaches are assessed against the standard, not matched to the examples.*

### Class 1: Institutional Statistical Modeling

**Epistemological foundation:** Frequentist statistical inference from aggregate administrative data; uncertainty expressed as confidence intervals; validity criteria defined by professional statistical bodies (national statistics offices, international standards organizations).

**Data generation process:** Administrative records (transaction logs, registration databases, survey responses to structured instruments); produced by state or quasi-state institutions; high volume, low resolution at individual level.

**Standards provenance:** National statistics offices, international bodies (e.g., UN Statistics Division, Eurostat), professional statistical associations.

**Canonical examples:** National food security surveys, administrative Essential Access redemption records, government housing vacancy databases, official unemployment registries.

**Disqualifying variants (same class despite appearing different):**
- An academic statistical model using the same administrative data sources → same data generation process; same class
- A private analytics firm applying different statistical techniques to government survey data → same data generation process and standards provenance (firm is accredited by the same bodies); same class
- An AI/ML model trained on historical institutional data → same epistemological foundation (pattern inference from aggregate historical records) and same data provenance; same class unless it can demonstrate different error structure

---

### Class 2: Community-Based Participatory Research (CBPR)

**Epistemological foundation:** Knowledge co-produced through structured engagement with affected communities; validity criteria include face validity with community members, not only statistical representativeness; uncertainty recognized to include forms invisible to administrative data (informal economic activity, stigmatized need, trust barriers to reporting).

**Data generation process:** Primary data collected through community-embedded researchers, participatory observation, focus groups, or structured ethnographic methods; produced by or with community organizations; high resolution at individual/household level, lower volume.

**Standards provenance:** Community-based research standards bodies, participatory action research networks, independent academic institutions with no material funding from state administrative bodies in the measurement domain.

**Canonical examples:** Community food security assessments conducted by mutual aid organizations, neighborhood-level housing needs surveys conducted by tenant organizations, informal economy tracking by community advocacy groups.

**Disqualifying variants (same class despite appearing different):**
- A government-commissioned community survey using government-designed instruments → standards provenance is government; same class as Class 1
- An NGO using standard survey methods identical to national statistics methodology → same epistemological foundation; same class as Class 1
- A "community engagement" program that feeds data into institutional statistical models → data generation process is community-based but epistemological foundation and standards provenance are Class 1; does not qualify as a distinct class

**Relationship to Class 1 (error independence):** Institutional statistical modeling systematically under-counts informal economic activity, stigmatized need, and populations with low state contact. CBPR systematically over-samples populations with high community organization (potentially missing isolated households). These error structures are not correlated — they fail in different directions under the same manipulation scenario. Error independence criterion satisfied. ✓

---

### Class 3: Independent Physical Sampling

**Epistemological foundation:** Direct physical measurement of the phenomenon at the point of occurrence; validity criteria are material (can a physical sample be independently verified?); uncertainty expressed as measurement error, not statistical inference error.

**Data generation process:** Direct physical collection — food supply sampling at warehouses or distribution points, housing structure assessments by trained field surveyors, direct health metric measurement at non-institutional care sites; produced by independent bodies with no administrative relationship to the supply system being measured.

**Standards provenance:** Physical measurement standards (metrology bodies, independent laboratory accreditation bodies, field survey standards for built environment assessment); must be independent from bodies that administer the measured supply system.

**Canonical examples:** Independent warehouse spot-audits of food reserves, field-surveyor housing condition assessments, point-of-care health metric measurement outside institutional health systems.

**Disqualifying variants (same class despite appearing different):**
- Physical sampling conducted by the supply system operator → not independent; standards provenance conflict; same class as any operator-controlled method
- Physical sampling using instruments calibrated by the same standards body as the supply system → standards provenance overlap; not sufficiently distinct
- "On-site inspection" that relies on operator-provided documentation rather than direct physical measurement → not direct physical sampling; epistemological foundation is document-based; same class as Class 1 if documents are administrative records

**Relationship to Classes 1 and 2 (error independence):** Physical sampling is uniquely sensitive to physical falsification (e.g., staged warehouse stocking before inspection) but insensitive to social measurement bias. Class 1 is sensitive to administrative data manipulation but relatively insensitive to physical state. Class 2 is sensitive to community organizational capacity. Three distinct error structures, none correlated. Error independence criteria satisfied for all three pairings. ✓

---

### Section 3.4 — Cohort Composition Requirements (FC-030, FC-031, FC-033)

Per the founding commitments, every oracle cohort for a high-volatility essential category that gates Shared Storehouse activation must satisfy, jointly, the following structural requirements:

| Requirement | Commitment | Value |
| :--- | :--- | :--- |
| Minimum oracle nodes per cohort | **FC-030** `ORACLE_N_MIN` | **5** |
| Minimum distinct methodology classes per cohort | **FC-031** `METHODOLOGY_CLASS_MIN` | **3** |
| Maximum pairwise error correlation within cohort | **FC-032** `ORACLE_PAIRWISE_CORRELATION_MAX` | **0.30** (Pearson) |
| Minimum adversarial (red-team) seats per cohort | **FC-033** `ORACLE_ADVERSARIAL_SEATS_MIN` | **1** |

**Why N = 5.** The Byzantine Fault Tolerance theorem requires n ≥ 3f + 1 to tolerate f simultaneously faulty nodes. At f = 1, the BFT floor is n = 4. Setting N_MIN = 5 provides one node of margin above BFT so the cohort does not drop below tolerance on a single-node loss. This replaces the prior Specifications §7 floor of N ≥ 3, which tolerates zero faulty nodes and is insufficient for Shared Storehouse-gating measurements.

**Why three classes.** Two-class coverage can fail if one standards body or shared assumption affects both classes at the same time. Three-class coverage makes simultaneous manipulation across all three knowledge bases much harder. This was previously a "recommended" higher standard; it is now the floor for any essential category that directly gates Shared Storehouse activation.

**Adversarial seats (FC-033).** At least one node in every cohort must be a designated adversarial (red-team) seat whose explicit mandate is to find reasons the cohort's consensus reading might be wrong. The adversarial seat uses one of the three canonical classes (or a newly-added class after Section 5 audit), but is selected and compensated under a separate procurement track from the consensus nodes: shorter terms, explicit "dissent credit" recognition in the Service Record for documented manipulation findings, and no funding relationship with the RCS accreditation body itself. The adversarial seat does not reduce the N_MIN count — it is one of the five, with a distinct role.

**Cohort composition example (minimum-compliant):** 5 nodes total = 2 Class 1 (Institutional Statistical) + 2 Class 2 (CBPR) + 1 Class 3 (Independent Physical Sampling), with the Class 3 node designated adversarial seat. Pairwise error correlation verified ≤ 0.30 across all pairs. This is the minimum, not the target — cohorts are encouraged to exceed the floors.

### AI Supply Chain Disclosure at Accreditation Intake

Accreditation applicants must disclose the following at intake and update the disclosure on any material change:
- AI system vendor identity for any AI or ML component used in measurement.
- Training data provenance, including the original data source and any known shared upstream data sources.
- Any known shared upstream AI dependencies with other nodes currently accredited or pending accreditation in the same essential category cohort.

A shared upstream AI vendor, base model, or training dataset between any two nodes in the same cohort is treated as a concentration trigger requiring independent architecture review before both nodes may vote on oracle consensus, equivalent to the AI supply chain concentration trigger in Section 4.2. Disclosure is a mandatory intake condition; an application that omits required AI supply chain information is incomplete and may not proceed to accreditation review until the disclosure is provided.

---

## AL-COST — Physical Sampling Cost Model

**Purpose:** Without a cost model, the physical sampling requirement (at least one Class 3 oracle per high-volatility category) becomes aspirational. This section bounds the minimum viable sampling effort so that "Class 3 coverage" cannot be satisfied by a token physical inspection program insufficient to detect real conditions.

### Minimum Sampling Requirements by Category

| Category | Minimum sampling unit | Frequency | Measurement point |
| :--- | :--- | :--- | :--- |
| **Food** | ≥50 direct physical observation points per 500,000-person population | Per quarter | Price, availability, and quality at point of purchase — not warehouse |
| **Water** | ≥30 direct chemical/physical quality tests per 100,000-person population | Per quarter | Point of delivery — not source |
| **Energy** | ≥20 grid delivery-point readings per 100,000-person population | Per month | Voltage, continuity, and access |
| **Medicine** | ≥15 pharmacy-level availability audits per 100,000-person population | Per quarter | For each CSM-designated medicine |

These are floors, not targets. Oracle cohorts are encouraged to exceed these minimums. A cohort that meets only the floor is classified as minimum-compliant, not fully adequate, in accreditation records.

### Inspector Independence Rule

Sampling inspectors may not be employed by, contracted by, or financially dependent on any entity whose supply is being measured. Inspector compensation must be publicly disclosed in the accreditation record and updated with each sampling cycle. Any compensation arrangement that creates a financial relationship between the inspector and the measured supply operator — including indirect relationships through parent organizations or shared funders — disqualifies the inspector and invalidates the sample.

### Sampling Site Selection

Sites must be selected by stratified random draw from a publicly published frame. The draw must be verifiable by a third party with access to the frame and the draw algorithm. Inspectors may not know their site assignments more than 48 hours in advance of the inspection. The published frame must be updated at least annually and must cover the full population for the category and geography being measured.

### Pass Condition

A physical sampling pilot passes if:

**(a)** The oracle-reported figure and the physical sample agree within the FC-001 through FC-005 confidence intervals for that category.

**(b)** Any discrepancy in the direction of oracle overstatement (oracle reports higher capacity than physical sampling finds) is flagged as a confidence-band failure and triggers a mandatory confidence band revision within 30 days. Failures in this direction are weighted more seriously than understatement failures because overstatement of capacity is the failure mode most likely to result in harmful rationing decisions.

A pilot that fails condition (b) does not automatically disqualify the oracle cohort, but it removes the Class 3 node's reading from the activation-authorization quorum until the confidence band is revised and a clean follow-on sample confirms agreement.

---

## AL-CORR — Pairwise Correlation Verification Test

**Purpose:** FC-032 sets a hard ceiling of 0.30 Pearson correlation between oracle node pairs. This section operationalizes the test procedure so that the ceiling can actually be enforced — not merely asserted.

### When to Run

Before any Shared Storehouse activation authority is granted to a new oracle cohort. Also triggered by: any change in cohort composition (addition or removal of a node), any change in a node's methodology class classification, and any standards-body or AI supply chain concentration review under Section 4.

### Method

For each oracle node pair within the cohort:

1. Compute Pearson correlation on historical category readings over the longest available overlapping period, with a minimum of 4 consecutive quarters.
2. Use the error series (each node's reading minus the ensemble median, or minus an independent ground-truth sample if available) rather than raw readings, to capture correlation in measurement error rather than correlation in the underlying phenomenon.
3. If historical data is unavailable (new cohort or new node), run a parallel observation period of at least 1 full quarter in which all nodes are active and producing readings before granting activation authority. Activation is suspended during this period.
4. Document the full correlation matrix — all pairwise coefficients — in the accreditation record. The matrix must be recomputed at each quarterly audit.

### Failure Criterion

Any node pair with Pearson correlation > FC-032 (0.30) must be treated as a single effective oracle node for quorum purposes. This means:

- The cohort's effective N is reduced by one for each pair above threshold.
- If the reduction drops effective N below FC-030 (5), Shared Storehouse activation authority is suspended until the structural dependency is resolved.
- Resolution options: (a) replace one node in the pair with a genuinely independent node; (b) demonstrate in two consecutive quarterly measurements that the correlation has fallen below 0.30.

Pairs above threshold but not yet resolved must remain flagged in the public accreditation record.

### Suspension Declaration

When effective N drops below FC-030 (5) under the Failure Criterion above, the following enforcement chain applies.

**Owner.** The RCS accreditation body is the declaring authority for Shared Storehouse suspension under this section.

**Timeline.** Upon detection that effective N has dropped below FC-030, the RCS accreditation body must issue a formal suspension declaration within **14 days**. The clock begins when the correlation matrix that produces the threshold failure is computed and available to the accreditation body.

**Publication.** The suspension declaration must be published to the public accreditation record and the Article VII transparency dashboard within 24 hours of the declaration.

**Ombuds notification.** The Federated Ombuds must be notified within **24 hours** of the suspension declaration. The Ombuds may initiate a review of the accreditation body's handling of the suspension on its own motion.

**Dispute by oracle operator.** An oracle operator whose node is implicated in a correlation-threshold breach may file a written dispute within **14 days** of the suspension declaration. The dispute is reviewed by the adversarial oracle seat (FC-033) within **30 days**, with a written finding published in the public accreditation record. A pending dispute does not lift the suspension; oracle output from a suspended cohort may not be relied upon for Shared Storehouse activation until the suspension is lifted by confirmed resolution under the resolution options above.

**Audit artifact.** The RCS accreditation body must update the accreditation record within **7 days** of any suspension to document: effective N at the time of suspension, specific node pairs above threshold, suspension declaration date, and expected resolution path. This update is the mandatory audit artifact for the suspension event.

**No urgency bypass.** No urgency claim, emergency, or time pressure may shorten the dispute period, waive the publication requirement, or permit reliance on oracle output from a suspended cohort before suspension is lifted by confirmed resolution.

### Adversarial Seat Role

The adversarial oracle seat (FC-033) must receive the full correlation matrix before each Shared Storehouse activation vote. The adversarial seat may veto activation if the matrix shows any pair above threshold, even if no other governance process has flagged the pair.

A veto under this section triggers a mandatory 14-day architecture review conducted by a panel independent of the RCS accreditation body. The review panel must assess: (a) whether the correlation reflects structural dependency or coincidental co-movement, (b) what architectural change would resolve the dependency, and (c) whether activation can proceed with reduced effective N pending resolution. The panel's findings are published in the public accreditation record. The adversarial seat may not be overridden on correlation grounds without the architecture review completing and documenting a specific remediation plan.

---

## Section 4 — Anti-Monoculture Trigger

### 4.1 — Standards-Body Concentration Rule

If **3 or more** oracle nodes for a given essential category rely on the same standards body for their validity criteria, an **independent methodological review** is required before that category can be used for Shared Storehouse activation.

**Triggering the review:**
- The RCS accreditation system tracks standards-body affiliations for all accredited nodes per category
- Concentration is assessed at the standards-body level, not the methodology-class level — two nodes from different institutions using the same standards body trigger the count
- The count is updated whenever a new node is accredited or an existing node's standards affiliation changes

**What the review assesses:**
- Whether the concentrated standards body has funding or governance relationships with entities that have a material interest in oracle outputs for the affected category
- Whether the concentration creates a single point of failure for the category's measurement validity
- Whether accreditation can proceed with the concentrated nodes, or whether new nodes from independent standards bodies must be recruited before Shared Storehouse activation is re-authorized

**Review body:** The methodological review is conducted by a panel independent of the RCS accreditation body — drawn from methodology specialists with no affiliation with any of the concentrated standards bodies. Panel composition uses P-017 oracle-independence standards (recursive application).

### 4.2 — AI Supply Chain Concentration

For oracle nodes using AI or ML components, concentration is assessed not only at the standards-body level but at the AI infrastructure level:

- Shared upstream AI model (same base model, fine-tuned separately) → triggers concentration review even if institutions and standards bodies are different
- Shared training dataset (different models, same historical data source) → triggers concentration review
- Shared commercial AI API (different fine-tunes, same underlying API) → triggers concentration review

The concentration count for AI infrastructure is **2 or more** nodes sharing any single AI upstream dependency. (Lower threshold than standards-body concentration because AI supply chain capture is harder to detect and more catastrophic in impact.)

---

## Section 5 — Annual Audit of Worked Examples

The T-020 open problem requires an "annual audit of the worked examples themselves." This is the mechanism:

### 5.1 — Annual Review Panel

An independent review panel convenes annually to assess:
1. Whether the three canonical classes in Section 3 remain meaningfully distinct given changes in measurement technology and practice
2. Whether any new measurement approaches exist that do not fit within the three canonical classes and should be added
3. Whether any disqualifying variants listed in Section 3 have been miscategorized (in either direction)
4. Whether any standards-body relationships have changed in ways that affect the independence assessments in Section 3

**Panel composition:** **5 members** — one from each of the three canonical class domains (statistician / quantitative methods expert; community-based research practitioner; physical measurement / metrology expert); one independent epistemologist or philosopher of science; one adversarial methodologist whose explicit role is to find ways to exploit the current definitions. The adversarial seat on this panel is distinct from, but parallel to, the FC-033 adversarial seats on oracle cohorts.

**Terms:** **3 years**, staggered across 5 seats so that no more than 2 seats turn over in any single year. **No more than 2 consecutive terms** per individual.

**Nomination process:** Open public nomination with confirmation by the Commons Review Process (CRP). **No prior affiliation with the RCS accreditation body within the prior 3 years** for any seat, and no current funding relationship between a nominee's home institution and any of the concentrated standards bodies the panel will review.

### 5.2 — What the Audit May and May Not Change

| The audit **may** | The audit **may not** |
| :--- | :--- |
| Add new canonical methodology classes | Remove existing canonical classes |
| Add new disqualifying variants | Reclassify a disqualifying variant as qualifying without H-2 amendment |
| Update the error independence assessments in Section 3 based on new evidence | Change the three-component definition of "methodology class" (Section 1) |
| Update the AI supply chain concentration threshold based on new technology landscape | Change the "fundamentally different" definition (Section 2) |
| Recommend a Section 1 or Section 2 change for CRP consideration | Implement any such change without H-2 amendment |

Section 1 (methodology class definition) and Section 2 (fundamentally different) are the stable anchor — they define the standard. Sections 3 and 4 are the living application — they apply the standard to current measurement practice. Only Sections 3 and 4 can be updated through the annual audit. Sections 1 and 2 require H-2 amendment because they are P-004 protected terms.

### 5.3 — Publication

The annual audit panel publishes:
- Full review findings, including any proposed changes to Sections 3 or 4
- A divergence report: cases where oracle nodes from different methodology classes produced materially divergent outputs in the prior year, with assessment of whether the divergence was a signal of manipulation or a legitimate methodological difference
- Compliance report: which essential categories met the methodology-class diversity requirement and which did not

The divergence report is the most operationally significant output. It surfaces whether the diversity mandate is working as intended — whether different classes are actually producing different outputs when the measured phenomenon changes, which is the evidence that they are measuring something real and independent.

---

## Section 6 — Relationship to Other Annexes and Patches

| Reference | Relationship |
| :--- | :--- |
| P-017 (Patch Log) | Annex AL is the definition document for all "methodology class" references in P-017 |
| Annex AP §AP2 (PCRP co-certification) | Annex AP §AP2 references Annex AL for the epistemological independence standard that oracles must meet before PCRP co-certification proceeds; AL defines what "independent" means in that context |
| Annex AR (Contract-Commitment Architecture) | P-023.4 inspector pool uses "P-017 oracle-independence standards" — those standards for epistemological independence are defined here |
| T-007 (Definition Drift) | The P-004 protection on Sections 1 and 2, combined with the explicit scope boundary on the annual audit (Section 5.2), is the primary control against T-007 targeting this definition |
| T-020 / T-021 | The open problems in both threats are directly resolved by this annex |

---

## Founding Coalition Instructions

To complete this annex before deployment, the founding coalition must:

1. ~~**Bind the numerical founding parameters**~~ — RESOLVED. All numerical commitments are now bound to `/founding/commitments.md` (FC-030 through FC-033, plus AI concentration threshold, panel composition, and lookback windows). Changes to these values require Tier 1 (H-3) amendment per Proposal 1.

2. **Conduct initial methodology-class diversity assessment** before the first oracle set is accredited. The three canonical classes in Section 3 are worked examples, not pre-approved classes — actual oracle nodes must be assessed against the Section 1 and Section 2 standards and documented in accreditation records.

3. **Apply the error independence test** (Section 2, criterion 3) to each pair of oracle nodes proposed for accreditation in the same essential category. The error independence test is documented prospectively, not assumed.

4. **Constitute the annual review panel** (Section 5.1) before the first year of operation, with terms staggered so the panel is never entirely replaced in a single cycle.

5. **Build the standards-body concentration tracking** (Section 4.1) into the RCS accreditation system before the first oracle node is accredited. This is a technical infrastructure requirement, not a manual process — the concentration count must be automated and verifiable.

6. **Publish the initial methodology-class registry** — the actual classification of each accredited oracle node by class, with the error independence assessment and standards-provenance documentation — before any Shared Storehouse activation occurs. This registry is the public accountability record for the epistemological independence mandate.

---

*This document is Annex AL of the Humane Constitution. The definition architecture is operative as an ACTIVE constitutional standard. The remaining implementation gate is publication of the initial methodology-class registry before any Shared Storehouse activation that depends on methodology-class-diverse oracle coverage.*
