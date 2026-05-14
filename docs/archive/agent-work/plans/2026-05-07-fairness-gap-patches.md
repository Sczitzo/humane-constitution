# Fairness Gap Patches Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close three constitutionally urgent fairness gaps identified in the Fairness Vignette Library — whistleblower protection (Priya), confidential enrollment for safety situations (Elena/Amara), and a delivery sufficiency standard (Miriam/Ray/Amara) — through new patches, new annexes, and targeted constitutional amendments.

**Architecture:** Three new patches (P-050 through P-052) each produce one new annex (ANNEX_AW, ANNEX_AX, ANNEX_AY), one or more targeted amendments to the main constitution, and updates to the Patch Log and Hardening Queue. The constitution and Patch Log are the canonical sources of truth; annexes provide operational detail; the Hardening Queue tracks status.

**Tech Stack:** Markdown (all docs), Python (corpus regeneration via `scripts/export_corpus.py`), existing patch/annex format conventions from Patch_Log.md and ANNEX_AT.md.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `docs/annexes/ANNEX_AW.md` | Create | Whistleblower Protection and Anti-Retaliation Protocol (P-050) |
| `docs/annexes/ANNEX_AX.md` | Create | Confidential Enrollment and Safety-Identity Protocol (P-051) |
| `docs/annexes/ANNEX_AY.md` | Create | Delivery Sufficiency Standard (P-052) |
| `docs/constitution/Humane_Constitution.md` | Modify ×3 | Add three targeted paragraphs (one per patch) to Articles VI, II, and IV |
| `docs/governance/Patch_Log.md` | Modify | Append P-050, P-051, P-052 entries |
| `docs/governance/Hardening_Queue.md` | Modify | Update status rows for these three risks from OPEN to DESIGNED |
| `docs/annexes/INDEX.md` | Modify | Add AW, AX, AY index entries |
| `scripts/export_corpus.py` | Modify ×3 | Add three new annex paths to CORE_DOCS and section classifier |
| `app/` (corpus) | Regenerate | `npm run generate:corpus` then `python3 ../scripts/validate_corpus.py` |

**Do not modify:** `ANNEX_AK.md` (Identity Asymmetric Error Doctrine is parallel, not superseded), `ANNEX_AI.md` (Federated Ombuds handles structural oversight; AW handles reporter protection specifically), `ANNEX_I.md` (Residency/Onboarding is parallel to AX).

---

## Constitutional amendments reference

Each task below that touches `Humane_Constitution.md` specifies the exact insertion point (search string) and the exact text to insert. Read the file from the repo root; the path is `docs/constitution/Humane_Constitution.md`.

**Amendment 1 (for P-050) — Article VI, after the community alert pathway clause:**

Find the string:
```
Refusal to acknowledge or review is itself a reportable failure under this Article.
```

Insert immediately after (new paragraph, blank line before and after):
```
- **Reporter protection:** A person who files a community alert (Article VII) or an internal Service Record audit request (Article VI) is a protected reporter. From the moment a report is filed and until it is formally resolved: (a) no actor who is named in or investigated by the report may modify, flag, or initiate a review of the reporter's Service Record, Voice allocation, or Essential Access standing; (b) any such modification is automatically suspended and escalated to the Federated Ombuds for independent review; (c) the Federated Ombuds must publish a finding within 45 days. Retaliation against a protected reporter is itself a Tier 2 constitutional violation triggering the same audit and correction obligations as the original report. The operational detail is in Annex AW.
```

**Amendment 2 (for P-051) — Article II / the one-person-one-wallet clause:**

Find the string:
```
**One person, one core wallet:** prevents duplicate Essential Access claims and fake extra identities.
```

Insert immediately after (new bullet, same indentation level):
```
- **Safety-shielded enrollment:** A person who cannot safely use their legal identity — because disclosure of their name, location, or records would expose them to documented violence, persecution, or coercion — may enroll through a safety-shielded pathway. Under this pathway, the wallet is linked to legal identity in a cryptographically sealed record accessible only by court order or Federated Ombuds finding. All location metadata, address fields, and administrator-visible identity fields are suppressed. Essential Access delivery uses address-blind channels. The pathway is temporary (maximum 24 months, renewable on re-verification) and may be audited for fraud through sealed-record review by an independent ombudsperson. The operational detail is in Annex AX.
```

**Amendment 3 (for P-052) — Article IV, after the pre-existing care networks clause:**

Find the string:
```
The presence of a constitutional delivery floor does not reduce the civic, moral, or spiritual value of personal generosity and communal care — it protects the conditions under which that generosity can freely operate.
```

Insert immediately after (new paragraph, blank line before and after):
```
- **Delivery sufficiency obligation:** A constitutional guarantee of Essential Access is not satisfied by the existence of a right; it is satisfied only when a documented delivery path exists for every person the guarantee covers. The system must maintain a Delivery Sufficiency Register — a published accounting of populations for whom delivery is not yet operational (incarcerated persons, persons in non-consenting jurisdictions, persons who cannot use digital interfaces, persons in safety-shielded status, persons whose communities have not joined the system). For each identified population, the Register must name a delivery timeline, a delivery mechanism, and an accountable party. The Register must be updated quarterly. The presence of a population in the Register is a published commitment to reach them, not an acknowledgment that the guarantee does not apply to them. The operational detail is in Annex AY.
```

---

## Task 1 — Write ANNEX_AW (Whistleblower Protection)

**Files:**
- Create: `docs/annexes/ANNEX_AW.md`

- [ ] **Step 1.1: Create ANNEX_AW.md**

```markdown
# ANNEX AW — Whistleblower Protection and Anti-Retaliation Protocol

> **Provenance:** Implements [P-050 — Whistleblower Protection and Anti-Retaliation Protocol] · Addresses retaliation risk against community alert reporters and Service Record audit requesters · Status: **ACTIVE**

**Status:** ACTIVE | **Priority:** Critical | **Patch:** P-050
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
```

- [ ] **Step 1.2: Verify the file renders correctly by checking its structure**

```bash
head -5 docs/annexes/ANNEX_AW.md
wc -l docs/annexes/ANNEX_AW.md
```

Expected: first line is `# ANNEX AW —...`, word count ~200+ lines.

- [ ] **Step 1.3: Commit**

```bash
git add docs/annexes/ANNEX_AW.md
git commit -m "feat(annex): add ANNEX_AW — Whistleblower Protection and Anti-Retaliation Protocol"
```

---

## Task 2 — Write ANNEX_AX (Confidential Enrollment)

**Files:**
- Create: `docs/annexes/ANNEX_AX.md`

- [ ] **Step 2.1: Create ANNEX_AX.md**

```markdown
# ANNEX AX — Confidential Enrollment and Safety-Identity Protocol

> **Provenance:** Implements [P-051 — Confidential Enrollment and Safety-Identity Protocol] · Addresses identity-verification gaps for domestic violence survivors, undocumented persons in safety situations, and others for whom standard identity disclosure creates documented risk · Status: **ACTIVE**

**Status:** ACTIVE | **Priority:** Critical | **Patch:** P-051
**Authority:** Tier 2. Changes require standard FAP process. The safety-shielded enrollment floor (§AX2.1) is Tier 1 adjacent — narrowing it below the floor defined here requires H-2 supermajority.

---

## AX0 — Problem Diagnosed

The system's identity architecture (Article II, Annex AK) faces a structural tension: the one-person-one-wallet requirement prevents duplicate Essential Access claims, but requires linking identity to an accessible record. For most people this is routine. For a domestic violence survivor whose abuser has connections in the local administration, a trafficking victim whose identity documents are controlled by their trafficker, or an undocumented person whose presence is criminalized, the identity verification requirement is not a minor inconvenience — it is a safety threat.

The Elena vignette in the Fairness Vignette Library documents the specific risk: a domestic violence survivor who needs Essential Access but cannot safely disclose her location or legal name to administrators, because the identity wallet creates a tracking vector for her abuser.

The existing Asymmetric Error Doctrine (Annex AK) treats this as a calibration problem — how much exclusion risk is acceptable to reduce fraud risk. This annex treats it differently: for persons in documented safety situations, the fraud-vs-exclusion trade-off is overridden by a third value — the duty not to be an instrument of harm to the persons the system is designed to protect.

---

## AX1 — Definitions

**Safety-shielded enrollment:** an enrollment pathway under which a person's legal identity is linked to their wallet through a sealed record, with all location metadata, address fields, and administrator-visible identity fields suppressed.

**Safety documentation:** evidence that standard identity disclosure creates a documented risk of violence, persecution, or coercion. This may include: a domestic violence restraining order, a referral from a certified victim services organization, a credible threat assessment from a law enforcement or humanitarian agency, a documented trafficking situation, or equivalent evidence evaluated under Tier 2 rules.

**Sealed identity record:** a cryptographically protected record linking the wallet to legal identity, accessible only by court order or a Federated Ombuds finding under defined conditions (§AX3.2).

**Address-blind delivery:** Essential Access delivery through channels that do not disclose the recipient's location to administrators: pickup at anonymous access points, delivery through a trusted community organization, or digital delivery through encrypted channels without geolocation metadata.

**Emergency enrollment:** a time-limited enrollment option for persons in immediate safety situations who cannot yet produce safety documentation.

---

## AX2 — Core Protocol

### AX2.1 — Safety-shielded enrollment eligibility

Any person who presents safety documentation may request safety-shielded enrollment. The system may not deny safety-shielded enrollment to a person who presents credible safety documentation. The fraud-prevention interest does not override the safety interest for persons in documented danger.

### AX2.2 — Enrollment process

Under safety-shielded enrollment:

1. The person presents safety documentation to a certified enrollment officer or a trusted community organization with enrollment authority.
2. Legal identity is verified through standard means, but the verification record is immediately sealed — it does not enter the administrator-visible database.
3. A wallet is created without location metadata, address fields, or any field linkable to the person's physical location.
4. The enrollment officer records only: wallet ID, enrollment date, safety-documentation category (not the specific document), and the identity of the certifying organization.
5. Essential Access is activated immediately.

### AX2.3 — Duration and renewal

Safety-shielded enrollment is valid for 24 months. Renewal requires re-verification of the safety situation through a certified organization. A person may remain in safety-shielded status indefinitely if re-verification confirms the safety situation persists. There is no cap on the number of renewals.

### AX2.4 — Address-blind delivery

During safety-shielded enrollment, Essential Access is delivered through address-blind channels. The system must maintain at least one address-blind delivery option in every participating jurisdiction: anonymous pickup locations, delivery through trusted community organizations, or encrypted digital channels without geolocation metadata.

### AX2.5 — Emergency enrollment

A person who asserts an immediate safety situation but cannot yet produce formal documentation may receive emergency enrollment for 30 days. Emergency enrollment provides Essential Access at the full floor level. During the 30-day window, the person must either produce safety documentation (triggering standard safety-shielded enrollment) or transition to standard enrollment. Emergency enrollment may not be denied on the grounds that the asserted safety situation cannot be immediately verified — the standard is credible assertion, not proved fact. False assertion of a safety situation for purposes of fraud is subject to the same accountability process as any other false claim.

---

## AX3 — Sealed Record Access

### AX3.1 — Who may not access sealed records

Sealed identity records may not be accessed by:

- Local administrators
- Service Record or Voice administrators
- Law enforcement agencies without a court order
- Named respondents in any active complaint involving the enrolled person
- Any actor whose access request is opposed by the Federated Ombuds

### AX3.2 — Who may access sealed records

Sealed identity records may be accessed only by:

- A court order issued by a judicial body with Article VI constitutional review authority, on grounds of credible fraud investigation (not administrative convenience, not immigration enforcement)
- A Federated Ombuds finding after an independent sealed-record review, on grounds of Essential Access fraud at material scale
- The enrolled person themselves, for the purpose of viewing or correcting their own record

### AX3.3 — Notification on access request

Any request to access a sealed record — even an unsuccessful one — must be logged and a notification sent to the enrolled person within 72 hours. The notification must identify the requester category (law enforcement, administrator, other) without identifying the specific requester if the identity would create a safety risk.

---

## AX4 — Documentation-Free Emergency Path

For persons who cannot access any safety documentation (Amara-type situations: no documentation, no formal status, no institutional connection), the system must maintain a documentation-free emergency access path:

1. A person presents in person at a designated emergency access point.
2. The person receives the survival floor through a single-use temporary access token, valid for 72 hours, renewable up to five times.
3. During the 72-hour window, the person is connected with a certified enrollment support organization.
4. If the organization confirms the person's presence and safety situation, emergency enrollment under §AX2.5 is activated.
5. The documentation-free path is available to every person physically present in a participating jurisdiction, regardless of citizenship, documentation status, or enrollment status.

---

## AX5 — Relationship to Other Annexes

- **Annex AK (Identity Asymmetric Error Doctrine):** AX does not replace AK. AK governs the overall fraud/exclusion calibration. AX establishes that, for persons in documented safety situations, the safety interest overrides the normal calibration — the AK fraud-rate tolerance applies to the system as a whole, not to individual safety-shielded enrollees whose fraud risk is adjudicated through the sealed-record access process.
- **Annex I (Residency, Migration, and Onboarding):** AX extends Annex I's "Identity-Compromised Person" and "Protected Entrant" pathways with a specific safety-shielded mechanism.
- **Annex AI (Federated Ombuds):** The Ombuds role in sealed-record access (§AX3.2) and notification (§AX3.3) requires Ombuds institutional authority defined in Annex AI.

---

## AX6 — Residual Risk

This annex closes the safety-disclosure gap for persons who can access the enrollment pathway. It does not solve:

- Persons in jurisdictions that have not joined the system (governed by Article IV's cross-boundary delivery obligation and Annex AY).
- Persons whose abuser controls their access to enrollment points.
- Long-term immigration or citizenship questions for undocumented persons in safety-shielded status — AX provides Essential Access continuity, not immigration resolution.

These residual risks are named in the Delivery Sufficiency Register (Annex AY) as open delivery commitments.
```

- [ ] **Step 2.2: Verify file structure**

```bash
head -5 docs/annexes/ANNEX_AX.md
wc -l docs/annexes/ANNEX_AX.md
```

- [ ] **Step 2.3: Commit**

```bash
git add docs/annexes/ANNEX_AX.md
git commit -m "feat(annex): add ANNEX_AX — Confidential Enrollment and Safety-Identity Protocol"
```

---

## Task 3 — Write ANNEX_AY (Delivery Sufficiency Standard)

**Files:**
- Create: `docs/annexes/ANNEX_AY.md`

- [ ] **Step 3.1: Create ANNEX_AY.md**

```markdown
# ANNEX AY — Delivery Sufficiency Standard and Register

> **Provenance:** Implements [P-052 — Delivery Sufficiency Standard] · Addresses the gap between the constitutional guarantee of Essential Access and the operational reality that some populations cannot currently receive it · Status: **ACTIVE**

**Status:** ACTIVE | **Priority:** Critical | **Patch:** P-052
**Authority:** Tier 2. The obligation to maintain the Delivery Sufficiency Register is Tier 1 adjacent — any change that would remove a population from the Register without demonstrating operational delivery requires H-2 supermajority.

---

## AY0 — Problem Diagnosed

Article IV states that Essential Access is unconditional. This is the correct constitutional position. But a constitutional guarantee is not the same as operational delivery. Multiple vignettes in the Fairness Vignette Library document populations for whom the guarantee exists in the constitution but the delivery path does not yet exist in practice:

- **Miriam (ALS):** Essential Access is guaranteed but no accessible non-digital delivery path is specified for persons who cannot use digital interfaces.
- **Ray (incarcerated):** Essential Access is guaranteed but prison facilities may not be enrolled; the delivery obligation falls on the state but there is no mechanism to compel or track it.
- **Amara (undocumented in non-consenting jurisdiction):** Article IV's cross-boundary delivery obligation exists but has no operational timeline or enforcement mechanism.
- **Yoder Community (non-enrolled by religious choice):** The delivery obligation exists for adjacent non-consenting communities; no delivery path to a community that refuses the infrastructure is specified.
- **Elena (safety-shielded):** Essential Access is guaranteed but address-blind delivery channels are not required by any existing provision (now closed by ANNEX_AX).

The gap between the constitutional guarantee and operational delivery is not a failure of values — it is a failure of honesty. This annex makes the gap visible, named, and governed.

---

## AY1 — Delivery Sufficiency Standard

A constitutional guarantee of Essential Access is operationally satisfied for a population when all of the following are true:

1. **A delivery path exists:** there is at least one documented, operational channel through which a person in that population can receive Essential Access without performing an action that is unavailable to them (e.g., using a digital interface they cannot use, disclosing a location they cannot safely disclose, presenting documentation they do not have).

2. **The delivery path is accessible:** a person in that population does not need to know a secret process, have a special advocate, or navigate a multi-month bureaucratic sequence to receive Essential Access. The path is documented in plain language and available in the language(s) of the population.

3. **The delivery path is monitored:** the system tracks whether people in the population are actually receiving Essential Access, at what rate, and with what gaps. Monitoring uses privacy-preserving methods that do not require individual-level tracking of the population.

4. **The delivery path has a responsible party:** there is a named institutional actor accountable for maintaining the delivery path and reporting on its performance quarterly.

Until all four conditions are met for a population, that population appears in the Delivery Sufficiency Register as an open commitment.

---

## AY2 — Delivery Sufficiency Register

The Delivery Sufficiency Register is a published, quarterly-updated accounting of populations for whom operational delivery is not yet fully satisfied under the AY1 standard.

### AY2.1 — Required register fields

For each population in the Register:

| Field | Content |
|---|---|
| Population | Named population category (e.g., "Incarcerated persons in enrolled jurisdictions") |
| Gap type | Which AY1 condition is not yet met (delivery path / accessibility / monitoring / accountability) |
| Current status | What delivery exists now, even if partial |
| Delivery commitment | The delivery path that will be operational, in plain language |
| Timeline | The date by which operational delivery will be achieved |
| Responsible party | The named institutional actor accountable for delivery |
| Last updated | The date of the most recent update to this row |
| Evidence link | A link to the monitoring data or pilot evidence for this population |

### AY2.2 — Founding Register entries

The following populations are entered in the Register at founding. Responsible parties must be named before system activation.

| Population | Gap type | Current status |
|---|---|---|
| Incarcerated persons in enrolled jurisdictions | Delivery path; accountability | Guarantee exists; prison facility enrollment not required |
| Persons in non-consenting adjacent jurisdictions | All four conditions | Article IV cross-boundary obligation active; no operational mechanism |
| Persons who cannot use digital interfaces (disability, age, digital exclusion) | Delivery path; accessibility | Physical cash exists; Essential Access delivery requires digital enrollment |
| Persons in safety-shielded status (domestic violence, trafficking) | Delivery path | Closed by ANNEX_AX; monitor for address-blind channel gaps |
| Persons in communities refusing enrollment on religious/cultural grounds | All four conditions | Pre-existing care network protection active; no delivery to non-enrolled |
| Minors in households with disrupted adult guardianship | Delivery path; accountability | Dependent pathway exists but assumes stable adult caregiver |
| Persons experiencing acute mental health crisis (unable to enroll) | Delivery path; accessibility | Emergency enrollment exists; crisis-specific pathway not specified |

### AY2.3 — Register publication

The Register is published as part of the Article VII public dashboards. It is updated quarterly. The Federated Ombuds reviews the Register annually and may escalate any row to constitutional review if the timeline has been missed by more than 12 months without a documented explanation.

### AY2.4 — Removal from Register

A population may be removed from the Register only when:

1. The responsible party certifies that all four AY1 conditions are met.
2. The Federated Ombuds independently verifies the certification.
3. The verification is published.

A population may not be removed from the Register on the grounds that the population is "too small to matter," "has not complained," or "can use the standard pathway if they try hard enough." The AY1 standard requires that the pathway be accessible without extraordinary effort.

---

## AY3 — Cross-Boundary Delivery Obligation (Operationalization)

Article IV states that participating jurisdictions must allocate a minimum of 2% of PFCR capacity toward cross-boundary dignity floor delivery. This annex operationalizes that obligation:

### AY3.1 — Allocation accounting

Each participating jurisdiction must publish a quarterly accounting showing:

1. Total PFCR capacity for the quarter.
2. The 2% cross-boundary allocation amount.
3. How the allocation was spent (delivery mechanisms, intermediary organizations, monitoring costs).
4. The populations reached and the estimated Essential Access delivered.

### AY3.2 — Intermediary organizations

Cross-boundary delivery to non-consenting communities must flow through intermediary organizations trusted by those communities (humanitarian agencies, religious organizations, mutual aid networks) rather than directly from system infrastructure, where direct delivery is refused. The system does not require a community to enroll in order to receive Essential Access through a trusted intermediary.

### AY3.3 — No enrollment coercion

Cross-boundary delivery is not conditioned on future enrollment. The system may not use the availability of Essential Access delivery as leverage to induce a community to join the system. This would convert an unconditional guarantee into a conditional offer — exactly what Article IV prohibits.

---

## AY4 — Relationship to Other Annexes

- **Annex AX (Confidential Enrollment):** AX addresses the safety-shielded delivery gap. AY tracks whether that gap is operationally closed through the Register.
- **Annex AW (Whistleblower Protection):** AW protects reporters who identify delivery failures through the community alert pathway. AY creates the Register that makes delivery failures publicly visible.
- **Annex I (Residency, Migration, and Onboarding):** Annex I defines the "humane floor for all persons physically present." AY extends this by requiring operational delivery, not just definitional coverage.
- **Annex AK (Identity Asymmetric Error Doctrine):** AK tracks exclusion rates at the system level. AY tracks delivery gaps at the population level. Together they provide a full picture of who is receiving Essential Access and who is not.

---

## AY5 — Residual Risk

This annex makes delivery gaps visible and governed. It does not automatically produce the infrastructure, staffing, or funding to close them. The Register creates accountability; it does not create capacity. The decisive future work is the same as for every other unresolved delivery commitment: building physical delivery mechanisms, enrolling institutions (prisons, hospitals, shelters), and funding intermediary organizations — before any stronger public claim is made that Essential Access is operationally universal.
```

- [ ] **Step 3.2: Verify file structure**

```bash
head -5 docs/annexes/ANNEX_AY.md
wc -l docs/annexes/ANNEX_AY.md
```

- [ ] **Step 3.3: Commit**

```bash
git add docs/annexes/ANNEX_AY.md
git commit -m "feat(annex): add ANNEX_AY — Delivery Sufficiency Standard and Register"
```

---

## Task 4 — Constitutional Amendments (Three targeted insertions)

**Files:**
- Modify: `docs/constitution/Humane_Constitution.md`

**Before editing, read the file to confirm the exact search strings exist.** If any search string is not found verbatim, read the surrounding section and adjust accordingly. The amendments section at the top of this plan has the exact text.

- [ ] **Step 4.1: Amendment 1 — Add reporter protection clause to Article VII**

Find the string in `docs/constitution/Humane_Constitution.md`:
```
Refusal to acknowledge or review is itself a reportable failure under this Article.
```

Add a blank line after it, then insert:
```
- **Reporter protection:** A person who files a community alert (Article VII) or an internal Service Record audit request (Article VI) is a protected reporter. From the moment a report is filed and until it is formally resolved: (a) no actor who is named in or investigated by the report may modify, flag, or initiate a review of the reporter's Service Record, Voice allocation, or Essential Access standing; (b) any such modification is automatically suspended and escalated to the Federated Ombuds for independent review; (c) the Federated Ombuds must publish a finding within 45 days. Retaliation against a protected reporter is itself a Tier 2 constitutional violation triggering the same audit and correction obligations as the original report. The operational detail is in Annex AW.
```

- [ ] **Step 4.2: Amendment 2 — Add safety-shielded enrollment clause**

Find the string in `docs/constitution/Humane_Constitution.md`:
```
**One person, one core wallet:** prevents duplicate Essential Access claims and fake extra identities.
```

After that bullet, on a new line at the same indentation level, insert:
```
- **Safety-shielded enrollment:** A person who cannot safely use their legal identity — because disclosure of their name, location, or records would expose them to documented violence, persecution, or coercion — may enroll through a safety-shielded pathway. Under this pathway, the wallet is linked to legal identity in a cryptographically sealed record accessible only by court order or Federated Ombuds finding. All location metadata, address fields, and administrator-visible identity fields are suppressed. Essential Access delivery uses address-blind channels. The pathway is temporary (maximum 24 months, renewable on re-verification) and may be audited for fraud through sealed-record review by an independent ombudsperson. The operational detail is in Annex AX.
```

- [ ] **Step 4.3: Amendment 3 — Add delivery sufficiency obligation clause**

Find the string in `docs/constitution/Humane_Constitution.md`:
```
The presence of a constitutional delivery floor does not reduce the civic, moral, or spiritual value of personal generosity and communal care — it protects the conditions under which that generosity can freely operate.
```

After that sentence (end of the bullet), add a blank line then insert a new bullet:
```
- **Delivery sufficiency obligation:** A constitutional guarantee of Essential Access is not satisfied by the existence of a right; it is satisfied only when a documented delivery path exists for every person the guarantee covers. The system must maintain a Delivery Sufficiency Register — a published accounting of populations for whom delivery is not yet operational (incarcerated persons, persons in non-consenting jurisdictions, persons who cannot use digital interfaces, persons in safety-shielded status, persons whose communities have not joined the system). For each identified population, the Register must name a delivery timeline, a delivery mechanism, and an accountable party. The Register must be updated quarterly. The presence of a population in the Register is a published commitment to reach them, not an acknowledgment that the guarantee does not apply to them. The operational detail is in Annex AY.
```

- [ ] **Step 4.4: Verify all three insertions**

```bash
grep -n "Reporter protection\|Safety-shielded enrollment\|Delivery sufficiency obligation" docs/constitution/Humane_Constitution.md
```

Expected: three matches, each appearing once.

- [ ] **Step 4.5: Commit constitutional amendments**

```bash
git add docs/constitution/Humane_Constitution.md
git commit -m "feat(constitution): add reporter protection, safety-shielded enrollment, and delivery sufficiency obligation clauses"
```

---

## Task 5 — Patch Log Entries (P-050, P-051, P-052)

**Files:**
- Modify: `docs/governance/Patch_Log.md`

- [ ] **Step 5.1: Append P-050 to Patch_Log.md**

At the very end of `docs/governance/Patch_Log.md`, after the P-049 entry, append:

```markdown

---

### P-050 — Whistleblower Protection and Anti-Retaliation Protocol

**Threats addressed:** Insider retaliation risk against community alert reporters and Service Record audit requesters; Priya-type attack path (retaliatory record modification by named respondent before investigation completes).
**Status:** ACTIVE | **Priority:** Critical
**Date:** 2026-05-07

**Constitutional text:** `ANNEX_AW.md`; Article VII (reporter protection clause)

**Problem diagnosed:**
The community alert pathway (Article VII) and Service Record audit mechanism (Article VI) require ordinary people to name wrongdoing by administrators. Without explicit protection, a corrupt administrator can use their remaining administrative access to modify the reporter's Service Record, flag contributions "under review," and revoke civic eligibility before any investigation completes. The Priya vignette in the Fairness Vignette Library documented this exact attack path. A system that cannot protect its own reporters will quickly teach everyone not to report.

**Introduced design:**

- **Administrative freeze on filing:** named respondents' write access to the reporter's records is automatically suspended from the moment a report is filed.
- **Automatic escalation of retaliatory actions:** any attempted modification during the protected period is rejected, logged, and escalated to the Federated Ombuds within 24 hours.
- **"Under review" flag governance:** flags require independent reviewer appointment (not self-authorization), evidence-based grounds, 45-day maximum duration, and automatic removal on expiry without finding.
- **Restoration on exoneration:** retaliatory modifications are reversed; lost civic roles are restored or queued.
- **Constitutional amendment:** reporter protection clause added to Article VII.

**New risks introduced:**
- The administrative freeze could be triggered by bad-faith reports. Mitigated by: the freeze affects only write access (not the respondent's own records), bad-faith reports are subject to the same accountability process as any false claim, and the Federated Ombuds reviews the freeze on filing.
- Coordinated retaliation by multiple actors not individually named. Named as a residual risk in Annex AW §AW5; monitored through the community alert pathway.

**Residual risk:** Informal retaliation (social pressure, community reputation) cannot be prevented by administrative controls. Culture and enforcement of the broader anti-capture provisions are the only long-term check.

---

### P-051 — Confidential Enrollment and Safety-Identity Protocol

**Threats addressed:** Identity disclosure as a safety vector for domestic violence survivors, trafficking victims, and persons in safety-compromised situations; Elena-type attack path (wallet identity creates tracking vector for abuser via compromised administrator).
**Status:** ACTIVE | **Priority:** Critical
**Date:** 2026-05-07

**Constitutional text:** `ANNEX_AX.md`; Article II (safety-shielded enrollment clause)

**Problem diagnosed:**
The one-person-one-wallet requirement links identity to an administrator-visible record. For persons in documented safety situations, this creates a tracking vector for abusers, traffickers, or persecutors who have access to administrative channels. The Elena vignette documented this gap. The existing Asymmetric Error Doctrine (Annex AK) treats this as a calibration problem; P-051 treats it as a safety override — for persons in documented danger, the safety interest overrides the normal fraud/exclusion calibration.

**Introduced design:**

- **Safety-shielded enrollment pathway:** legal identity linked to wallet through a cryptographically sealed record; all location and identity fields suppressed from administrator-visible database.
- **Address-blind delivery:** Essential Access delivered through anonymous pickup points, trusted community organizations, or encrypted digital channels without geolocation.
- **Emergency enrollment:** 30-day temporary access on credible assertion without documentation, with support pathway to full safety-shielded enrollment.
- **Documentation-free emergency path:** single-use 72-hour tokens for persons with no documentation, with connection to enrollment support organizations.
- **Sealed record access governance:** sealed records accessible only by court order or Federated Ombuds finding; access requests logged and reported to the enrolled person within 72 hours.
- **Constitutional amendment:** safety-shielded enrollment clause added to Article II.

**New risks introduced:**
- Emergency enrollment without documentation could be used for fraud. Mitigated by: 30-day window with transition requirement, the AK fraud-rate monitoring catches aggregate fraud signals, and false safety assertions are subject to accountability.
- Sealed records could be accessed under pretextual court orders. Mitigated by: access limited to credible fraud investigation (not immigration enforcement or administrative convenience), Ombuds review authority, and notification to the enrolled person on any access request.

**Residual risk:** Persons whose abuser controls their access to enrollment points cannot use this pathway. Long-term immigration or citizenship questions for undocumented persons are not resolved by AX — Essential Access continuity is provided, not immigration status.

---

### P-052 — Delivery Sufficiency Standard

**Threats addressed:** Gap between constitutional guarantee of Essential Access and operational delivery for incarcerated persons, non-enrolled communities, persons unable to use digital interfaces, and persons in non-consenting jurisdictions.
**Status:** ACTIVE | **Priority:** Critical
**Date:** 2026-05-07

**Constitutional text:** `ANNEX_AY.md`; Article IV (delivery sufficiency obligation clause)

**Problem diagnosed:**
Multiple vignettes in the Fairness Vignette Library showed that the constitutional guarantee of Essential Access does not translate to operational delivery for several populations (Miriam, Ray, Amara, Yoder Community). The gap between the guarantee and the delivery mechanism was unnamed, untracked, and unaccountable. A constitutional guarantee that does not reach the people it covers is not a guarantee — it is a statement.

**Introduced design:**

- **Delivery Sufficiency Standard (AY1):** four conditions that must all be met for a population to be considered operationally covered: delivery path exists, is accessible, is monitored, and has an accountable responsible party.
- **Delivery Sufficiency Register:** quarterly-published accounting of populations not yet meeting the standard, with gap type, current status, commitment, timeline, responsible party, and evidence link.
- **Founding Register entries:** seven populations entered at founding with open commitments.
- **Cross-boundary delivery operationalization:** quarterly accounting of the 2% PFCR cross-boundary allocation, flow to intermediary organizations, populations reached, no-enrollment-coercion rule.
- **Register removal standard:** removal requires responsible party certification, Federated Ombuds independent verification, and published verification — not just administrative assertion.
- **Constitutional amendment:** delivery sufficiency obligation clause added to Article IV.

**New risks introduced:**
- The Register could become a bureaucratic accounting exercise that satisfies the letter while missing the spirit. Mitigated by: the AY1 standard requires accessibility without extraordinary effort (not just existence of a path), and Federated Ombuds escalation authority for missed timelines.
- Cross-boundary delivery through intermediary organizations could be used to build dependency relationships. Mitigated by: the no-enrollment-coercion rule (§AY3.3) prohibits conditioning delivery on future enrollment.

**Residual risk:** The Register creates accountability; it does not create capacity. Physical infrastructure, institution enrollment, and intermediary organization funding must follow independently. P-052 makes the gap visible and governed; it does not close the gap operationally.
```

- [ ] **Step 5.2: Verify all three patches appear**

```bash
grep -n "P-050\|P-051\|P-052" docs/governance/Patch_Log.md
```

Expected: each patch number appears at least twice (header and body reference).

- [ ] **Step 5.3: Commit**

```bash
git add docs/governance/Patch_Log.md
git commit -m "feat(governance): add P-050, P-051, P-052 to Patch Log"
```

---

## Task 6 — Update Hardening Queue

**Files:**
- Modify: `docs/governance/Hardening_Queue.md`

- [ ] **Step 6.1: Add three new rows to the priority issues table**

Find the table in `docs/governance/Hardening_Queue.md`. Locate the section header or the first row of the priority table. Add three new rows for the newly-addressed risks.

Find the line:
```
| Service Record non-civic misuse | **DESIGNED** |
```

Before that line, insert:
```markdown
| Whistleblower retaliation via Service Record | **DESIGNED** | A reporter who files a community alert can have their Service Record downgraded by the named respondent before investigation completes. | ANNEX_AW, P-050, Article VII reporter-protection clause. Test: can a named respondent modify the reporter's records after filing? Can the Ombuds respond within the 45-day window? |
| Identity disclosure as safety vector | **DESIGNED** | Persons in documented safety situations cannot safely enroll under the standard identity-verification pathway. | ANNEX_AX, P-051, Article II safety-shielded enrollment clause. Test: can a survivor enroll without disclosing location? Is address-blind delivery operational? |
| Delivery gap between guarantee and operation | **DESIGNED** | Essential Access is constitutionally unconditional but not operationally universal; several populations lack a documented delivery path. | ANNEX_AY, P-052, Article IV delivery-sufficiency obligation. Test: Is the Delivery Sufficiency Register published and updated quarterly? Are the seven founding populations tracked with timelines and responsible parties? |
```

- [ ] **Step 6.2: Verify the rows were added correctly**

```bash
grep -n "Whistleblower retaliation\|Identity disclosure as safety\|Delivery gap between" docs/governance/Hardening_Queue.md
```

Expected: three matches.

- [ ] **Step 6.3: Commit**

```bash
git add docs/governance/Hardening_Queue.md
git commit -m "feat(governance): add three fairness-gap rows to Hardening Queue"
```

---

## Task 7 — Update Annex INDEX and Export Script

**Files:**
- Modify: `docs/annexes/INDEX.md`
- Modify: `scripts/export_corpus.py`

- [ ] **Step 7.1: Add AW, AX, AY to INDEX.md**

Read `docs/annexes/INDEX.md`. Find the entry for `ANNEX_AV` and add three entries after it:

```markdown
- **ANNEX AW** — Whistleblower Protection and Anti-Retaliation Protocol · P-050 · ACTIVE
- **ANNEX AX** — Confidential Enrollment and Safety-Identity Protocol · P-051 · ACTIVE
- **ANNEX AY** — Delivery Sufficiency Standard and Register · P-052 · ACTIVE
```

- [ ] **Step 7.2: Add AW, AX, AY to export_corpus.py**

In `scripts/export_corpus.py`, there are three locations where annex paths are registered. Use the same approach as adding `Fairness_Vignette_Library.md` in the previous session — find the line `"docs/annexes/ANNEX_AV.md"` in each location and add the three new annexes after it.

**Location 1** (CORE_DOCS list, ~line 50 area): after `"docs/annexes/ANNEX_AV.md"`, add:
```python
    "docs/annexes/ANNEX_AW.md",
    "docs/annexes/ANNEX_AX.md",
    "docs/annexes/ANNEX_AY.md",
```

**Location 2** (section classifier block, ~line 180 area): after the last `ANNEX_AV` line in the section-classifier block, add the same three lines.

**Location 3** (third occurrence, ~line 305 area): same pattern.

After adding, run:
```bash
cd app && npm run generate:corpus
python3 ../scripts/validate_corpus.py
```

Expected output:
```
Wrote app/src/generated/corpus.ts and app/public/generated/corpus.json with 93 documents.
Corpus validation passed with no errors.
```

(93 = previous 90 + 3 new annexes)

- [ ] **Step 7.3: Commit**

```bash
git add docs/annexes/INDEX.md scripts/export_corpus.py app/src/generated/corpus.ts app/public/generated/corpus.json
git commit -m "feat(corpus): register ANNEX_AW, ANNEX_AX, ANNEX_AY in index and export script"
```

---

## Verification

After all tasks are complete:

1. **Constitutional amendments are in place:**
   ```bash
   grep -n "Reporter protection\|Safety-shielded enrollment\|Delivery sufficiency obligation" docs/constitution/Humane_Constitution.md
   ```
   Expected: 3 matches.

2. **All three annexes exist with correct headers:**
   ```bash
   head -3 docs/annexes/ANNEX_AW.md docs/annexes/ANNEX_AX.md docs/annexes/ANNEX_AY.md
   ```

3. **Patch Log has three new entries:**
   ```bash
   grep -c "### P-05" docs/governance/Patch_Log.md
   ```
   Expected: 3

4. **Corpus is clean:**
   ```bash
   cd app && npm run generate:corpus && python3 ../scripts/validate_corpus.py
   ```
   Expected: 93 documents, validation passed.

5. **Fairness Vignette Library cross-check:** Open `docs/governance/Fairness_Vignette_Library.md` and verify that the three "Urgent" verdicts (Priya, Elena/Amara) now have their gaps closed by the new patches. No edits required — the vignette library deliberately names the gaps at a point in time; the patch log is the record that they were closed.
