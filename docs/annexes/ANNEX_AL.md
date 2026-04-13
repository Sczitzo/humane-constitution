# Annex AL — Methodology-Class Definitions for Oracle Independence

**Pre-launch blocking gate — required before P-017 is operative · Governed as P-004 protected specification**
**Status: PROPOSED (referenced by P-017, T-020, T-021)**

---

## Purpose

P-017 (Oracle Epistemological and Algorithmic Independence) requires that RCS accreditation include at least one measurement node per high-volatility essential category using a **fundamentally different methodology class**. This requirement is meaningless without a pre-committed, drift-resistant definition of what "methodology class" means and what "fundamentally different" requires.

The T-020 open problem states: *"Defining 'fundamentally different methodology class' is itself subject to definition drift (T-007). 'Methodology class' must be a P-004 protected term with worked examples."*

Without this annex, a sophisticated actor can satisfy the letter of P-017 by submitting two measurement nodes that use nominally different methods but share the same epistemological foundations — the same standards body, the same theoretical assumptions, the same training data provenance — while being formally classified as different "classes." The protection against epistemic monoculture evaporates. The T-020 and T-021 mitigations fail.

This annex provides the definitions, the worked examples (both qualifying and disqualifying), the anti-drift governance mechanism, and the audit requirement. All **[FOUNDING COMMITMENT]** fields must be filled before P-017 is operative.

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
| **Epistemological foundation** | The underlying theory of how knowledge about the measured phenomenon is obtained — what counts as evidence, what counts as valid inference, and what sources of uncertainty are recognized as material |
| **Data generation process** | How the primary data is produced — by whom, using what instruments, at what resolution, with what sampling frame |
| **Standards provenance** | Which body or bodies define the validity criteria, calibration standards, and reporting requirements for the measurement approach |

Two measurement nodes belong to the **same methodology class** if they share any two of these three characteristics with any other node in the same accredited set for a given essential category. Two measurement nodes belong to **different methodology classes** if they differ on all three characteristics.

**Why three components, and why any two trigger same-class classification:** The epistemological foundation determines what errors are visible and invisible to the measurement approach. The data generation process determines what physical and social phenomena can introduce bias. The standards provenance determines who decides what counts as valid. A method that changes its data generation process but retains the same epistemological assumptions and standards body has not changed its vulnerability profile in a meaningful way — it can still be captured through the standards body, and its errors are still invisible to itself by design.

---

## Section 2 — Definition: "Fundamentally Different"

*This definition is a P-004 protected term. It may not be modified without a Tier 2 (H-2) amendment.*

Two methodology classes are **fundamentally different** for the purposes of P-017 if and only if:

1. They differ on **all three** characteristics in Section 1.
2. Neither class's standards provenance has a funding or governance relationship with the other's standards provenance within the prior **[FOUNDING COMMITMENT — e.g., 5 years]**.
3. The epistemological foundations predict **materially different error structures** — meaning the systematic errors each approach is most likely to make under manipulation or institutional pressure are not correlated.

Criterion 3 is operationalized through the **error independence test**: given a known manipulation of the measured phenomenon (e.g., artificial suppression of reported food scarcity), would both methods be expected to fail in the same direction? If yes, they are not fundamentally different regardless of formal classification. If no — one would overstate, one would understate, or one would detect when the other does not — they satisfy criterion 3.

The error independence test is applied during RCS accreditation review and documented in the accreditation record. It is a prospective assessment, not a historical one.

---

## Section 3 — Worked Examples

*These examples are illustrative and not exhaustive. They establish the standard; new measurement approaches are assessed against the standard, not matched to the examples.*

### Class 1: Institutional Statistical Modeling

**Epistemological foundation:** Frequentist statistical inference from aggregate administrative data; uncertainty expressed as confidence intervals; validity criteria defined by professional statistical bodies (national statistics offices, international standards organizations).

**Data generation process:** Administrative records (transaction logs, registration databases, survey responses to structured instruments); produced by state or quasi-state institutions; high volume, low resolution at individual level.

**Standards provenance:** National statistics offices, international bodies (e.g., UN Statistics Division, Eurostat), professional statistical associations.

**Canonical examples:** National food security surveys, administrative LC redemption records, government housing vacancy databases, official unemployment registries.

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

### Section 3.4 — The Three-Class Minimum

P-017 requires at least one measurement node using a fundamentally different methodology class per high-volatility essential category. The protocol's minimum standard is **two classes represented** (the existing node, plus at least one different class). However, the three classes above demonstrate a higher standard — three-class coverage — where each class's errors are uncorrelated with the others.

The founding coalition should commit to whether the minimum for scale-up is **[FOUNDING COMMITMENT — e.g., 2 classes or 3 classes]** per high-volatility essential category. Two-class coverage detects manipulation that affects both classes simultaneously (e.g., a standards body controlling both Class 1 and Class 2 measurement standards). Three-class coverage makes simultaneous manipulation across all three epistemological foundations extremely difficult. Three-class coverage is recommended for any essential category that directly gates SQ activation.

---

## Section 4 — Anti-Monoculture Trigger

### 4.1 — Standards-Body Concentration Rule

If **[FOUNDING COMMITMENT — e.g., 3 or more]** oracle nodes for a given essential category rely on the same standards body for their validity criteria, an **independent methodological review** is required before that category can be used for SQ activation.

**Triggering the review:**
- The RCS accreditation system tracks standards-body affiliations for all accredited nodes per category
- Concentration is assessed at the standards-body level, not the methodology-class level — two nodes from different institutions using the same standards body trigger the count
- The count is updated whenever a new node is accredited or an existing node's standards affiliation changes

**What the review assesses:**
- Whether the concentrated standards body has funding or governance relationships with entities that have a material interest in oracle outputs for the affected category
- Whether the concentration creates a single point of failure for the category's measurement validity
- Whether accreditation can proceed with the concentrated nodes, or whether new nodes from independent standards bodies must be recruited before SQ activation is re-authorized

**Review body:** The methodological review is conducted by a panel independent of the RCS accreditation body — drawn from methodology specialists with no affiliation with any of the concentrated standards bodies. Panel composition uses P-017 oracle-independence standards (recursive application).

### 4.2 — AI Supply Chain Concentration

For oracle nodes using AI or ML components, concentration is assessed not only at the standards-body level but at the AI infrastructure level:

- Shared upstream AI model (same base model, fine-tuned separately) → triggers concentration review even if institutions and standards bodies are different
- Shared training dataset (different models, same historical data source) → triggers concentration review
- Shared commercial AI API (different fine-tunes, same underlying API) → triggers concentration review

The concentration count for AI infrastructure is **[FOUNDING COMMITMENT — e.g., 2 or more]** nodes sharing any single AI upstream dependency. (Lower threshold than standards-body concentration because AI supply chain capture is harder to detect and more catastrophic in impact.)

---

## Section 5 — Annual Audit of Worked Examples

The T-020 open problem requires an "annual audit of the worked examples themselves." This is the mechanism:

### 5.1 — Annual Review Panel

An independent review panel convenes annually to assess:
1. Whether the three canonical classes in Section 3 remain epistemologically distinct given changes in measurement technology and practice
2. Whether any new measurement approaches exist that do not fit within the three canonical classes and should be added
3. Whether any disqualifying variants listed in Section 3 have been miscategorized (in either direction)
4. Whether any standards-body relationships have changed in ways that affect the independence assessments in Section 3

**Panel composition:**
- **[FOUNDING COMMITMENT — e.g., 5 members: 1 from each of the three canonical class domains (statistician/quantitative methods expert; community-based research practitioner; physical measurement/metrology expert); 1 independent epistemologist or philosopher of science; 1 adversarial methodologist whose role is to find ways to exploit the current definitions]**
- Terms: **[FOUNDING COMMITMENT — e.g., 3 years, staggered; no more than 2 consecutive terms]**
- Nomination process: **[FOUNDING COMMITMENT — e.g., open nomination with confirmation by CRP; no prior affiliation with RCS accreditation body within 3 years]**

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
| Annex AI (Ombuds Constitution) | Annex AI references Annex AL when requiring that PCRP oracles meet oracle independence requirements before co-certification; AL defines what "independent" means epistemologically |
| Annex AR (Contract-Commitment Architecture) | P-023.4 inspector pool uses "P-017 oracle-independence standards" — those standards for epistemological independence are defined here |
| T-007 (Definition Drift) | The P-004 protection on Sections 1 and 2, combined with the explicit scope boundary on the annual audit (Section 5.2), is the primary control against T-007 targeting this definition |
| T-020 / T-021 | The open problems in both threats are directly resolved by this annex |

---

## Founding Coalition Instructions

To complete this annex before deployment, the founding coalition must:

1. **Fill in all [FOUNDING COMMITMENT] fields** in Sections 2, 3, 4, and 5 — particularly the scale-up minimum (2 or 3 classes per SQ-gating category), the AI supply chain concentration threshold, and the annual review panel composition.

2. **Conduct initial methodology-class diversity assessment** before the first oracle set is accredited. The three canonical classes in Section 3 are worked examples, not pre-approved classes — actual oracle nodes must be assessed against the Section 1 and Section 2 standards and documented in accreditation records.

3. **Apply the error independence test** (Section 2, criterion 3) to each pair of oracle nodes proposed for accreditation in the same essential category. The error independence test is documented prospectively, not assumed.

4. **Constitute the annual review panel** (Section 5.1) before the first year of operation, with terms staggered so the panel is never entirely replaced in a single cycle.

5. **Build the standards-body concentration tracking** (Section 4.1) into the RCS accreditation system before the first oracle node is accredited. This is a technical infrastructure requirement, not a manual process — the concentration count must be automated and verifiable.

6. **Publish the initial methodology-class registry** — the actual classification of each accredited oracle node by class, with the error independence assessment and standards-provenance documentation — before any SQ activation occurs. This registry is the public accountability record for the epistemological independence mandate.

---

*This document is Annex AL of the master protocol. The definition architecture is operative as a PROPOSED standard. All [FOUNDING COMMITMENT] fields must be filled, and the initial methodology-class registry published, before P-017 is operative. Annex AL is a pre-launch blocking gate for any essential category in which SQ activation depends on methodology-class-diverse oracle coverage.*
