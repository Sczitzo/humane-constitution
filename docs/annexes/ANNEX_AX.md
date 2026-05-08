# ANNEX AX — Confidential Enrollment and Safety-Identity Protocol

> **Provenance:** Implements [P-051 — Confidential Enrollment and Safety-Identity Protocol] · Addresses identity-verification gaps for domestic violence survivors, trafficking victims, and others for whom standard identity disclosure creates documented risk · Status: **ACTIVE**

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
