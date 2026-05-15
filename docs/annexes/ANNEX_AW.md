# ANNEX AW — Whistleblower Protection and Anti-Retaliation Protocol

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Protect people who report wrongdoing through the community alert or Service Record audit pathways from retaliation by the very administrators they reported — specifically the window between filing a report and the Ombuds issuing a finding. |
> | **Who it protects** | Anyone who names a corrupt or negligent administrator; the integrity of the community alert and audit mechanisms, which fail if reporters face immediate retaliation. |
> | **Failure risk** | Administrative retaliation: a named respondent uses remaining record-write access to downgrade the reporter's Service Record, revoke a civic role, or flag contributions "under review" before any investigation concludes — chilling future reporting. |
> | **Evidence status** | Active — unproven |
> | **Linked risks** | Retaliation risk (Priya vignette — Fairness Vignette Library); P-053; Annex AI (Federated Ombuds); Article VII (community alert pathway) |

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Protect people who report wrongdoing through the community alert or Service Record audit pathways from retaliation by the very administrators they reported — specifically the window between filing a report and the Ombuds issuing a finding. |
> | **Who it protects** | Anyone who names a corrupt or negligent administrator; the integrity of the community alert and audit mechanisms, which fail if reporters face immediate retaliation. |
> | **Failure risk** | Administrative retaliation: a named respondent uses remaining record-write access to downgrade the reporter's Service Record, revoke a civic role, or flag contributions "under review" before any investigation concludes — chilling future reporting. |
> | **Evidence status** | Active — unproven |
> | **Linked risks** | Retaliation risk (Priya vignette — Fairness Vignette Library); P-053; Annex AI (Federated Ombuds); Article VII (community alert pathway) |

> **Provenance:** Implements [P-053 — Whistleblower Protection and Anti-Retaliation Protocol] · Addresses retaliation risk against community alert reporters and Service Record audit requesters · Status: **ACTIVE**

**Status:** ACTIVE | **Priority:** Critical | **Patch:** P-053
**Authority:** Tier 2. Changes require standard FAP process. Reporter protection during active constitutional proceedings (§AW3.4) is Tier 1 adjacent and requires H-2 supermajority if the change would reduce protections below the floor defined in §AW2.

---

## AW0 — Problem Diagnosed

The community alert pathway (Article VII) and the Service Record audit mechanism (Article VI) require ordinary people to name wrongdoing by administrators, civic officials, and institutional actors. Without explicit protection, a person who files a report is immediately vulnerable to the very actor they reported — who may retain administrative access to the reporter's Service Record, Voice allocation, or civic eligibility records long enough to act before any audit is completed.

This is not a hypothetical. It is the standard pattern in every governance system with insider corruption: the first tool a corrupt actor uses when threatened is the tool closest at hand. In this system, the closest tool is the Service Record.

The Priya vignette in the Fairness Vignette Library (docs/governance/Fairness_Vignette_Library.md) documents the specific attack path: a Service Record administrator, upon receiving a complaint about record falsification, used remaining administrative access to downgrade the reporter's Service Record and flag past contributions "under review," revoking a civic role before any investigation concluded.

This annex closes that gap.

---

## AW1 — Definitions

**Protected reporter:** any person who has filed a community alert under Article VII or a Service Record audit request under Article VI, from the moment of filing until the report is formally resolved.

**Named respondent:** any person or institution identified as the subject of a protected report.

**Administrative freeze:** the automatic suspension, upon report filing, of the named respondent's ability to modify records belonging to or directly affecting the protected reporter.

**Retaliatory action:** any modification to a protected reporter's Service Record, Voice allocation, Essential Access standing, civic eligibility, or wallet status, initiated by or at the direction of a named respondent during the protected period.

**Protected period:** the interval from the moment a report is filed to the moment a Federated Ombuds finding is published and any required corrections are completed.

---

## AW2 — Core Protections

### AW2.1 — Administrative freeze on filing

When a community alert or Service Record audit request is filed, the system must:

1. Record the filing with a cryptographic timestamp.
2. Identify all named respondents.
3. Immediately suspend each named respondent's write access to any record that directly affects the protected reporter: Service Record entries, Voice allocation adjustments, Essential Access flags, civic role eligibility flags, and wallet status.
4. Notify the Federated Ombuds with the report content and the list of suspended access points.

The administrative freeze is not a finding of wrongdoing. It is a procedural precaution with no civic consequences for the respondent beyond access suspension.

### AW2.2 — Automatic escalation of retaliatory actions

If any modification to a protected reporter's records is attempted by a named respondent during the protected period:

1. The modification is automatically rejected and logged.
2. The Federated Ombuds receives an alert within 24 hours.
3. The Federated Ombuds must publish an acknowledgment within 7 days and a finding within 45 days on whether the attempted modification constitutes retaliation.
4. A finding of retaliation is itself a Tier 2 constitutional violation, triggering the same correction and publication obligations as the original report.

### AW2.3 — "Under review" flags

A flag placing a contribution "under review" may be placed only by an independent reviewer who:

1. Is not a named respondent in any active report involving the flagged person.
2. Is appointed through the Federated Ombuds rotating-panel process, not by the flagging party.
3. Has documented, evidence-based grounds for the flag (not suspicion, not administrative convenience).

A flag placed without these conditions is automatically invalid. The maximum duration of a valid "under review" flag is 45 days; continuation beyond 45 days requires a published finding from the reviewing panel. A flag that expires without a finding is automatically removed.

### AW2.4 — Restoration on exoneration

If the Federated Ombuds finds that a retaliatory modification was made:

1. The modification is reversed and the original records restored.
2. Any civic role lost during the protected period is restored to its pre-retaliation status or, if the role has been filled in the interim, the reporter is placed at the front of the next eligible queue.
3. The finding is published in the Article VII integrity dashboard.
4. The respondent's administrative access is reviewed for permanent restriction.

---

## AW3 — Limits and Safeguards

### AW3.1 — Not a shield from legitimate review

Reporter protection does not prevent legitimate independent review of the reporter's records. A finding that the reporter's own Service Record entries were fraudulent is a valid outcome; the requirement is that the review is independent (not initiated by the named respondent) and the evidence standard is the same as for any other audit.

### AW3.2 — Not a shield from criminal accountability

If the report itself is found to be knowingly false and maliciously filed, the reporter may be subject to the same accountability process as any other actor making a false claim. The protection applies during the protected period; a finding of bad faith terminates it.

### AW3.3 — Not permanent

The protected period ends when the Federated Ombuds publishes a final finding on the original report, all required corrections are completed, and a 30-day appeal window closes. After the protected period, normal administrative functions resume for all parties.

### AW3.4 — Constitutional proceedings

If the original report constitutes a Tier 1 or Tier 2 constitutional violation, reporter protection extends through any constitutional review process under Annex H, not just the 45-day Federated Ombuds window.

---

## AW4 — Relationship to Other Annexes

- **Annex AI (Federated Ombuds Constitution):** AW2.1–AW2.4 require Federated Ombuds action. The Ombuds constitution governs the appointment, independence, and authority of the Ombuds; this annex defines the specific AW obligations.
- **Annex AK (Identity Asymmetric Error Doctrine):** If an administrative freeze conflicts with a legitimate identity audit, the identity audit proceeds through the Ombuds routing in AW2.2, not through the named respondent's administrative access.
- **Article VII (Public Records & Warning Systems):** AW findings are published in the Article VII integrity dashboard. The community alert pathway that triggers AW protection is defined in Article VII.

---

## AW5 — Residual Risk

This annex closes the immediate retaliatory-action gap. It does not prevent:

- Informal retaliation (social pressure, exclusion from informal networks, community reputation damage). This can only be addressed through culture and enforcement of the broader anti-capture provisions.
- Coordinated retaliation by multiple actors who are not individually named respondents.
- Slow-motion retaliation after the protected period ends through actions that are individually legitimate but cumulatively punitive.

These risks are named here so they can be monitored through the Article VII community alert pathway — which the reporter can use again if retaliation continues.
