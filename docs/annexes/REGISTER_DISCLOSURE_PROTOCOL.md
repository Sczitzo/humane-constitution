# Register Disclosure Protocol

**Annex AO — Governing document for Threat Register bifurcation**
**Status: PROPOSED (P-021) · Session 8**

---

## Purpose

This protocol governs the bifurcation of the Threat Register into a Public Register and a Restricted Register Annex. It defines what belongs in each version, who may access the restricted version, how consistency is maintained, and how the bifurcation itself is governed to prevent it from becoming an accountability gap.

The bifurcation exists because the Threat Register performs two functions that are in tension:

1. **Accountability and transparency** — the public should be able to read what threats have been identified, what mitigations are in place, and what residual risks remain. This function requires broad publication.

2. **Operational security** — sophisticated adversaries who understand exact detection thresholds, timing windows, and exploit step sequences can use the register as an attack manual. Publishing specific operational calibration data increases adversarial advantage.

This protocol resolves that tension through responsible disclosure: the register's *existence, structure, and mitigations* are fully public; its *operational calibration data* is restricted to those with a legitimate oversight or audit function.

---

## Part 1 — Public Register

### What the Public Register contains

The Public Register contains:

- All threat IDs, titles, severity ratings, and status designations.
- Threat mechanisms described at the *class level* — sufficient to understand the nature of the attack, not sufficient to execute it with precise calibration.
- Risk scores (I × L × D formula and values).
- Mitigation directions — the structural response and design changes introduced, described at the level required for public accountability.
- Residual risks — honest acknowledgment of what the mitigations do not fully address.
- Compound linkages — how threats interact with each other.
- Open problems — unresolved questions that governance and future patches must address.
- Register management rules and session history.
- The complete summary table.

### What the Public Register does NOT contain

The Public Register does not contain:

- Specific numerical thresholds that trigger automated monitoring responses (e.g., exact trigger counts within specific time windows).
- Precise timing windows that define exploitation windows.
- Specific detection pattern signatures used by monitoring systems.
- Step-by-step operational sequences for exploit classes where publishing the sequence provides attack advantage.
- Calibration data for anomaly detection systems.

**Mechanism of omission:** Where the full threat entry would include operationally sensitive detail, the Public Register entry reads "[Restricted Annex — see AO]" at the relevant point. This makes the omission visible and auditable. Silent omissions are not permitted.

### Publication and access

The Public Register is published in the open project repository and is freely accessible. It is the primary public accountability artifact for the Threat Register. It must be updated simultaneously with any update to the Restricted Register Annex.

---

## Part 2 — Restricted Register Annex

### What the Restricted Register Annex contains

The Restricted Register Annex contains all Public Register content plus:

- Specific numerical thresholds for all monitoring triggers.
- Precise timing windows and cadence parameters.
- Detection pattern signatures and anomaly detection calibration data.
- Operational exploit step sequences for threat classes where this level of detail was omitted from the public version.
- Cross-register monitoring specifications that would constitute an attack surface if published.
- Calibration review history — records of how thresholds have been adjusted and why.

### Access and custody

The Restricted Register Annex is accessible to:

| Role | Access basis | Access scope |
| :--- | :--- | :--- |
| Credentialed auditors | NDA + role-based authorization | Full read access during audit engagement |
| Adversarial panel members (P-013/P-014 processes) | Role requirement for acceptance process | Full read access during acceptance review |
| Constitutional Review Panel members | Standing institutional access | Full read access |
| Ombuds Office staff | Operational requirement | Read access for entries relevant to Ombuds functions |
| Threat Register Owner | Custodial role | Full read/write access |
| Independent consistency auditors (annual) | Annual engagement | Full read access for consistency review |

Access is logged. Log entries include: who accessed, when, and under what authorization. Access logs are reviewed annually by the Ombuds Office and any anomalous access is reported to the Constitutional Review Panel.

### Custody and version control

The Restricted Register Annex is maintained in a private version-controlled repository with access controls. The version history is retained in full. The repository is accessible to the constitutional review body for audit purposes. No Restricted Annex content may be stored outside the designated repository.

---

## Part 3 — Consistency requirements

### The consistency obligation

Both versions must be updated simultaneously. The Restricted Register Annex is the authoritative operational document. The Public Register is the transparency artifact. Any discrepancy between the two is treated as a T-007 (Definition Drift) event requiring immediate remediation.

**Discrepancy types and responses:**

| Discrepancy type | Response |
| :--- | :--- |
| Public Register understates a mitigation that exists in the Restricted Annex | Not a violation — acceptable if the understatement is not misleading about whether a mitigation exists |
| Public Register overstates a mitigation not present in the Restricted Annex | T-007 event — public misrepresentation of system capability |
| Public Register describes a threat as ADDRESSED but Restricted Annex shows no mitigation | T-007 event — status fraud |
| Restricted Annex contains a threat entry not referenced in Public Register | T-007 event — hidden threat tracking |
| Public Register contains a threat entry not in Restricted Annex | Administrative error — add to Restricted Annex immediately |

### Annual consistency audit

The Threat Register Owner commissions an independent consistency audit annually. The audit:

1. Compares all Public Register entries against Restricted Annex entries for completeness and non-contradiction.
2. Identifies any "[Restricted Annex — see AO]" omission markers in the Public Register and verifies the omitted content exists in the Restricted Annex.
3. Reviews whether any Restricted Annex content can be declassified to the Public Register (sensitivity has passed) or whether any Public Register content should be reclassified (new operational sensitivity identified).
4. Publishes a consistency attestation — confirming that the Public Register accurately represents what the Restricted Annex contains, without reproducing restricted content.

The consistency attestation is published in the public repository alongside the Public Register. Absence of an annual attestation is itself a T-011 (Narrative) and T-007 (Definition Drift) trigger.

---

## Part 4 — Reclassification

### Downward reclassification (Restricted → Public)

Content may be moved from Restricted to Public when:

- The monitoring threshold or detection pattern it describes has been publicly disclosed through other means.
- The operational window during which the information provided adversarial advantage has closed (e.g., a deprecated system).
- The Threat Register Owner and an independent auditor jointly determine that publication reduces vulnerability rather than increasing it (e.g., community monitoring makes the information more useful to defenders than attackers).

Reclassification requires the Threat Register Owner's authorization and is recorded in both versions.

### Upward reclassification (Public → Restricted)

Content may be moved from Public to Restricted only when:

- New information reveals that the published detail provides significant operational advantage to sophisticated attackers that was not recognized at initial publication.
- The reclassification is authorized by the Threat Register Owner *and* reviewed by the Constitutional Review Panel (because removing previously public information is a more consequential action than restricting new information).
- The reclassification is noted in the Public Register with the entry "[Reclassified to Restricted Annex — AO reclassification record #X]" so the removal is visible.

Reclassification records are public (the fact of reclassification, the date, and the authorizing officers, not the content).

---

## Part 5 — Governance and accountability

### The bifurcation as a potential accountability gap

The bifurcation creates a structural accountability risk: the public cannot directly verify that the Restricted Annex is consistent with stated mitigations, that restricted threats are being addressed, or that the restricted content is being maintained. The protocol addresses this through:

1. **Annual consistency attestation** (Part 3) — public confirmation by an independent auditor.
2. **Visible omission markers** — "[Restricted Annex — see AO]" makes every omission legible.
3. **Access logging and review** — anomalous access is reported.
4. **Constitutional Review Panel standing access** — the oversight body can read the full restricted version.
5. **Ombuds Office access** — the accountability office has access to entries relevant to its functions.

### The bifurcation as a narrative risk

Publishing the fact of bifurcation (that a restricted version exists) may generate a narrative attack: "They're hiding threats from the public." This is a legitimate concern that the protocol must address directly.

**Response:** The bifurcation is a responsible disclosure practice, not a secrecy practice. The public version discloses: what threats exist, what mitigations are in place, what residual risks remain, and what is omitted and why. The restricted version adds calibration data that provides no accountability value to the public but provides operational value to attackers. This distinction is the same one applied in every security context that publishes vulnerability disclosures while withholding specific exploit code.

The CFRL (Citizen-Facing Rights Layer) and Pillar 11 public dashboard must include a plain-language explanation of the bifurcation and why it serves the interests of the people the system is designed to protect.

---

## Part 6 — Applicability

This protocol applies to the Threat Register (`Threat_Register.md`) as of Session 8 and to any successor register documents. It does not apply to the Patch Log (which does not contain operational calibration data), the Annual Compound Simulation (which is fully public), or the Adversarial Narrative Simulation (which is fully public).

If other documents are identified as requiring bifurcation under this logic, a new annex must be created rather than extending AO retroactively.

---

*This document is Annex AO of the master protocol. It governs only as a PROPOSED patch until P-021 reaches ACTIVE status through the Formal Acceptance Protocol.*
