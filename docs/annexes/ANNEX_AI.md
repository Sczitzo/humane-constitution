# Annex AI — Federated Ombuds Constitution

**Status:** ACTIVE — Proposal 8 close-out, 2026-04-18
**Authority:** Tier 1 structural (FC-090, FC-091 lock the federation and its threshold; FC-092 governs terms).
**Supersedes:** The prior single-commissioner draft of Annex AI. Every load-bearing function previously carried by the "Ombuds Office" is now carried by the **Federated Ombuds** — five structurally independent sub-nodes, each a full Ombuds office, with explicit protocol-level decision rules.

---

## 0. Why Federated

The prior single-Ombuds design made the Ombuds itself the highest-value capture target in the protocol: one office, one commissioner, one point of failure across six patches. P-008's own open question — "who audits the auditors of elite formation?" — had only a panel-level answer (Section 5 of the prior version), while the operative authority (manufactured-flag determinations, PCRP co-certifications, register access, AED monitoring) remained consolidated in a single institution.

Federation resolves this at the structural layer:

- **Byzantine-fault margin at the institutional scale.** Five sub-Ombuds with a 4-of-5 supermajority for protocol-level decisions tolerate f = 1 captured or coerced sub-node without producing a wrong determination, and f = 2 without producing an unauthorised determination (a 3-of-5 coalition cannot meet threshold). This matches the oracle-cohort design (FC-030 N_MIN = 5 at BFT floor) — the same reasoning applied one level up.
- **Geographic and institutional dispersal.** Five sub-nodes sited in structurally distinct jurisdictions cannot be simultaneously captured by any single legal, political, or coercive actor without producing observable, coordinated pressure.
- **Redundancy without blocking.** Operational functions (see §4) that require rapid decisions under pressure do not need the full federation — they are handled by a single rotating duty sub-Ombuds with a post-hoc federation review. The federation threshold applies only where the decision is protocol-structural (see §3).

This annex constitutes the Federated Ombuds. Prior references to "the Ombuds" or "the Ombuds Office" in the Humane Constitution, Patch Log, Threat Register, and other annexes are read as references to the Federated Ombuds acting through the rule appropriate to the matter (§3 for protocol-level, §4 for operational).

---

## 1. Structure

### 1.1 Five Sub-Ombuds (FC-090)

The Federated Ombuds is constituted as **five sub-Ombuds offices**, each with:

- A full standing staff (Commissioner, deputies, investigators) with local protected-status rules mirroring the prior Section 2 of this annex.
- An independent budget floor line-item that cannot be reduced below floor without Tier 1 amendment.
- A local access-authority mandate over enforcement records, identity-system telemetry, and supply-signal data within its assigned jurisdictional scope.
- A signed inter-office protocol committing each sub-Ombuds to the federation's decision rules and publication commitments.

The five sub-Ombuds are sited so that no two share primary jurisdiction, primary regulatory relationship, primary funding channel, or primary infrastructure dependency. Structural-dispersal criteria are defined in §1.2.

FC-090 sets `OMBUDS_SUBCOUNT_MIN = 5` as a Tier 1 floor. The federation may be extended above five (e.g., to seven or nine sub-nodes as the protocol scales) by Tier 2 amendment with adjusted supermajority threshold. **Below five is prohibited; contraction to below five requires Tier 1 amendment (H-3) and is materially equivalent to re-centralising the office.**

### 1.2 Structural-Dispersal Criteria

Each sub-Ombuds must be dispersed from every other sub-Ombuds along **at least four** of the following five dimensions:

| Dimension | Dispersal test |
| :--- | :--- |
| **Jurisdictional** | Sited in a distinct legal jurisdiction with independent judicial review authority; cannot be compelled to produce records by any one jurisdiction's subpoena power alone. |
| **Institutional-origin** | The appointing body for each sub-Ombuds is drawn from a distinct class (civil liberties, academic, federated trade/labour, independent practitioner registry, faith or community-charter institutions) — no two sub-Ombuds share an appointing-body class. |
| **Funding** | The budget floor for each sub-Ombuds flows from a distinct fiscal channel (e.g., distinct resource-class levies, distinct federation-layer allocations) so that no single funder can simultaneously squeeze multiple sub-nodes. |
| **Infrastructure** | Distinct primary publication channel, distinct primary communication infrastructure, distinct primary record-storage custodian. |
| **Personnel-recruitment** | No more than one sub-Ombuds may recruit primarily from any single academic, professional, or alumni network (per FC-032-style concentration limit applied institutionally). |

The Ombuds Oversight Assembly (§5) certifies dispersal compliance annually and publishes the certification. Non-compliance on any dimension triggers a remediation window of 180 days; persistent non-compliance is treated as structural capture and activates the §5.3 Concentration Response.

### 1.3 Duty Rotation and Federation Plenum

Day-to-day operational functions (manufactured-flag determinations, PCRP co-certifications, exclusion-report triage) are handled by a **Duty Sub-Ombuds** — a single sub-Ombuds rotating on a published schedule (default weekly, exception scheduling for contiguous investigations). Duty rotation is published at least 14 days in advance; no party may choose their own reviewing Duty Sub-Ombuds.

**Federation Plenum** — the five sub-Ombuds together, voting under §3 — convenes:
- Scheduled quarterly for standing protocol-level matters (integrity audits, dispersal certification, annual reports).
- Emergency convocation on request of any sub-Ombuds or under automatic trigger (§3.4).
- For all §3.2 protocol-level decisions, Plenum vote is required; Duty Sub-Ombuds may not substitute.

---

## 2. Independence Requirements

### 2.1 Appointment

| Role | Appointment mechanism | Term |
| :--- | :--- | :--- |
| **Sub-Ombuds Commissioner** (head of each sub-node) | Nominated by the sub-node's assigned appointing body (per §1.2 institutional-origin class); confirmed by a 2/3 vote of the CRP; subject to a 60-day public challenge period | **730 days (FC-092)**, staggered across the five seats so that no more than two seats turn over in any single year |
| **Deputy Commissioners** | Appointed by sub-node Commissioner with Plenum notification; subject to challenge within 30 days | 5 years, renewable once |
| **Staff investigators** | Civil-service protection; appointed by sub-node Commissioner; removable only for cause with published rationale | Indefinite |

**Staggering plan.** Sub-Ombuds seats 1, 3, 5 are appointed in odd years of the 730-day cycle; seats 2, 4 in even years. This guarantees that at any moment, at least three sub-Ombuds have served more than one year and fewer than two years, providing institutional continuity without entrenchment.

**Term limit.** A Sub-Ombuds Commissioner may serve a maximum of **two consecutive 730-day terms**, then must wait at least one full term (730 days) before standing again. Lifetime service cap: four non-consecutive terms. This prevents any single individual from accumulating federation-scale authority.

**Pre-launch appointment gate.** The protocol is not operative with respect to any Ombuds-dependent function until at least **four of five sub-Ombuds** have been appointed, challenged, and seated. The four-of-five pre-launch requirement ensures that the FC-091 supermajority is achievable from day one; the final fifth seat must be filled within 180 days of protocol genesis.

### 2.2 Funding Independence

Each sub-Ombuds holds a **Tier 1-protected budget floor** expressed as a percentage of total protocol administration budget, split among the five sub-nodes so that no sub-node falls below a per-node floor sufficient to staff the mandate functions of §4. Floor percentages are set at founding and locked at Tier 1.

Budget reductions below floor require Tier 1 amendment. Budget reductions at any level that would impair a §4 function trigger automatic escalation to the Plenum within 14 days, and to the Oversight Assembly (§5) within 30 days.

No sub-Ombuds may accept external funding, contract revenue, or in-kind support from any entity subject to its own oversight — the prior Section 2.2 single-source rule is preserved and extended across the federation.

### 2.3 Recusal Rules

The prior recusal standards (professional relationship in prior 5 years; participation in design, implementation, or review; direct or indirect financial interest) apply to every sub-Ombuds and every staff investigator.

**Federation-level recusal cascade:**
- If the Duty Sub-Ombuds is recused on a particular matter, the Duty role for that matter transfers to the next sub-Ombuds in published rotation order.
- If two or more sub-Ombuds are recused on the same matter, the Plenum convenes with the remaining three sub-Ombuds and may either (a) proceed under a "reduced Plenum" rule requiring **3 of 3 unanimous** for that matter only, or (b) appoint a substitute determining officer from the Oversight Assembly's register for that matter only. Choice between (a) and (b) is made by the three non-recused sub-Ombuds unanimously.

Recusal is self-declared and recorded publicly. Failure to recuse when a recusal condition is met is treated as serious misconduct (§2.4).

### 2.4 Protected Status

Removal of a Sub-Ombuds Commissioner requires **all four** of:
- Proven incapacity or serious misconduct, with specific findings of fact.
- A 3/4 supermajority of the CRP with published rationale.
- An affirmative vote of the Oversight Assembly (§5).
- A public challenge period of 60 days with right of response.

Removal of a Sub-Ombuds Commissioner by any procedure short of the above is treated as structural capture and activates the §5.3 Concentration Response. Staff investigators are removable only for cause with written rationale and a right of appeal to the Oversight Assembly.

Removal procedures are Tier 1 protected; modification requires H-3 refounding authority.

---

## 3. Decision Rules

### 3.1 Two Classes of Decision

| Class | Definition | Decision rule |
| :--- | :--- | :--- |
| **Operational** | Time-sensitive individual-case determinations (manufactured-flag findings, PCRP co-certifications, exclusion-report triage, register-access authorisations within a single sub-node's scope) | Duty Sub-Ombuds acts; post-hoc Plenum review within 30 days; Plenum may overturn or confirm |
| **Protocol-level** | Determinations that bind the federation as an institution (integrity audits, dispersal certification, appeals from §4 operational decisions, appointment challenges, concentration-response activation, §3.4 matters below) | **Plenum vote under FC-091 — 4 of 5 affirmative required** |

This two-class design preserves operational speed (a supply-shock demand-context flag cannot wait for a five-seat quorum) while ensuring that every structural determination clears a Byzantine-fault-tolerant threshold.

### 3.2 Protocol-Level Matters Requiring 4-of-5 Plenum Vote (FC-091)

The following matters are reserved to the Plenum under FC-091:

1. **Tier 1 Amendment Integrity Report** (Proposal 1). Within 60 days of a Tier 1 amendment signature registration per `/architecture/amendment_protocol.md §3`, the Plenum publishes an integrity report assessing: signature authenticity, holder independence, procedural compliance, and the absence of coercion signals. 4 of 5 affirmative required for the report to carry federation authority; dissenting positions are published with rationale.
2. **Adversarial Oracle Seat Certification** (Proposal 3, Annex AL §3.3). Each oracle cohort's FC-033 adversarial seat is certified by Plenum vote prior to cohort activation and recertified at each methodology-class rotation. 4 of 5 required.
3. **Annex AQ §3 Arbitration Panel Seat** (Proposal 6). One sub-Ombuds rotates into the 3-member arbitration panel convened during oracle-quorum-loss events. Seat assignment is by Plenum vote — 4 of 5 required to confirm — with conflicts-of-interest published before seating.
4. **Annex AJ §4 Enforcement Panel Appeals** (Proposal 7). Appeals from Enforcement Panel penalty determinations are heard by Plenum. 4 of 5 required to overturn an Enforcement Panel finding; 3 of 5 may remand for further investigation.
5. **Annex AS Attestation False-Claim Adjudication** (Proposal 9). Final adjudication of attestation false-claim findings — and the consequent stake-slashing classification (25% / 50% / 100% per Annex AS §2.4) — requires 4 of 5 Plenum affirmative. Below threshold, the matter is remanded to the originating investigator; stake is held escrowed until final determination.
6. **Dispersal and Concentration Certifications** (§1.2, §5.3). Annual dispersal compliance certification and any §5.3 Concentration Response activation.
7. **Appointment Challenges.** Any challenge to a sub-Ombuds appointment filed within the 60-day public challenge period.
8. **Supersession of Duty Sub-Ombuds Operational Determinations.** Post-hoc review of an operational determination (§3.1) may overturn the determination; overturn requires 4 of 5.

### 3.3 Tie-Breaking and Deadlock

FC-091 = 4/5 means:
- 4 or 5 affirmative → decision carries.
- 3 affirmative, 2 dissenting → no decision; matter is remanded for investigation or tabled for next Plenum session; **during pendency, the conservative default applies** (flag maintained, penalty not overturned, panel seat not confirmed, report not issued).
- ≤ 2 affirmative → proposal fails; may be re-introduced with new evidence.

The conservative default is designed so that inaction favours the status quo of protection: ambiguous or divided Plenums do not lift a demand-context flag, do not overturn a penalty, and do not certify a new oracle seat. This directly serves the deterrence logic of the protocol — capture of 2 sub-Ombuds can produce deadlock but cannot produce a permissive outcome.

### 3.4 Automatic Plenum Convocation Triggers

The Plenum is automatically convened (72-hour emergency session) when any of the following occur:
- A Tier 1 amendment signature registration under `/architecture/amendment_protocol.md`.
- A drift-chain divergence alert under `/architecture/drift_chain.md` that is not resolved within 72 hours.
- A CSM cluster-failure report exceeding FC-071 (3 per 10,000 per 30 days).
- An FC-010 systemic-leakage threshold breach (7% / annum).
- A P-022 Shared Storehouse-oracle-failure event exceeding 72 hours without restoration.
- A formal concentration-complaint filed by any advocacy organisation or by any sub-Ombuds regarding another sub-Ombuds.

Emergency sessions operate under the same FC-091 threshold. If fewer than four sub-Ombuds can attend within the 72-hour window, the Plenum operates under the reduced-Plenum unanimous rule (§2.3) for the matter.

---

## 4. Mandate

The Federated Ombuds holds the full mandate of the prior Annex AI, extended to each of the six Proposal-1-through-10 integrations.

### 4.1 Manufactured-Flag Authority (P-015)

*Operational class — handled by Duty Sub-Ombuds.*

The Duty Sub-Ombuds applies the three-criterion test for deliberate manufacture of a demand-context flag (timing proximity, proportionality anomaly, no documented operational basis), with a 4-hour determination timeline and a conservative default of maintaining the flag while assessment continues. The prior Section 3 of this annex is incorporated by reference; the only structural change is that determinations are signed by the Duty Sub-Ombuds and are reviewable by the Plenum under §3.1 post-hoc review.

Repeated no-findings from the same Duty Sub-Ombuds on behalf of the same enforcement body trigger Plenum review of the Duty Sub-Ombuds' independence — this is a §3.2 matter requiring 4 of 5.

### 4.2 PCRP Demand-Context Co-Certification (P-012)

*Operational class — handled by Duty Sub-Ombuds.*

The Duty Sub-Ombuds co-certifies PCRP activation within a 2-hour window, with reduced-scope default if co-certification is not issued in time. Standards and conservative defaults are preserved from the prior Section 4.2.

### 4.3 Cohort Concentration Tracking (P-008)

*Protocol-level class — handled by Plenum annually; monitoring staff distributed across sub-nodes.*

Each sub-Ombuds tracks cohort concentrations within its jurisdictional scope. The Plenum consolidates data quarterly and publishes a federation-wide concentration report. AC3.3 diversity standard violations identified in the report trigger automatic §3.2 matters for remediation.

The federation itself is subject to AC3.3 — §1.2 structural-dispersal criteria operationalise this. Failure to meet dispersal is a structural-capture signal (§5.3).

### 4.4 AED Monitoring (P-016 / Annex AK)

*Mixed — operational triage at sub-node level; Plenum-level quarterly reporting.*

Each sub-Ombuds receives exclusion-rate reports from its regional advocacy organisations. The Plenum consolidates and publishes quarterly AED compliance dashboards and triggers independent audits when Annex AK thresholds are exceeded.

### 4.5 Register Access and Annual Attestation (Annex AO / P-021)

*Operational class per access event — protocol-level for annual attestation.*

Each sub-Ombuds holds restricted Threat Register access within its jurisdictional scope. The Plenum conducts the annual consistency attestation and publishes findings; 4 of 5 affirmative required to certify consistency.

### 4.6 Adversarial Oracle Certification (Proposal 3 / Annex AL §3.3)

*Protocol-level — Plenum vote required per §3.2 item 2.*

The Plenum certifies each cohort's adversarial oracle seat (FC-033 = 1 per cohort) and recertifies at every methodology-class rotation.

### 4.7 Shared Storehouse Oracle-Failure Arbitration (Proposal 6 / Annex AQ §3)

*Protocol-level seating; operational decisions within the arbitration panel.*

One sub-Ombuds rotates into the 3-member arbitration panel convened within 72 hours of an Shared Storehouse oracle-quorum-loss event (Annex AQ §3.1). Seat assignment is by Plenum vote (§3.2 item 3). The seated sub-Ombuds acts on the panel under the panel's own rules; dissents are published.

### 4.8 Enforcement Panel Appeals (Proposal 7 / Annex AJ §4.4)

*Protocol-level — Plenum vote required per §3.2 item 4.*

Any party subject to a §4.2 Graduated Penalty may appeal to the Federation within 30 days of determination. The Plenum hears the appeal and decides under FC-091 (4 of 5 to overturn). If the Plenum overturns, the penalty is vacated; if remanded (3 of 5), the Enforcement Panel re-investigates; if affirmed (<3 affirmative for overturn), the penalty stands.

Appeals are heard de novo on the evidentiary record. The Plenum may also issue binding interpretive guidance to the Enforcement Panel with each appeal decision.

### 4.9 Attestation False-Claim Adjudication (Proposal 9 / Annex AS)

*Protocol-level — Plenum vote required per §3.2 item 5.*

Final attestation false-claim findings and stake-slashing classifications require Plenum affirmative. Pending final determination, stake is held in escrow; investigatory staff are drawn from the sub-Ombuds whose jurisdiction the attestor operates in.

### 4.10 Founding Panel Participation (P-013 / P-014)

*Preserved from prior Section 4.3.*

One staff member drawn from the Federation (lot-drawn across all five sub-Ombuds staff registers) participates in the P-014 heightened panel as one of five votes. The participating staff member is selected at the sub-node level by lot, not by Plenum vote — this maintains independence-from-self.

### 4.11 General Notice and Escalation Authority

Any sub-Ombuds may issue a **Public Ombuds Notice** on any matter within §1 mandate (prior). Notices carry the signature of the issuing sub-Ombuds; Plenum-affirmed notices (4 of 5) carry federation authority. Enforcement bodies are required to respond to a federation-authority notice within 14 days.

---

## 5. Oversight of the Federation

The prior Section 5 of this annex constituted a small Oversight Panel as a meta-capture defence. Federation structurally reduces the need for a single external body, but does not eliminate it — the Plenum cannot be its own auditor on matters touching the federation as an institution (e.g., dispersal compliance, systemic mis-calibration).

### 5.1 Ombuds Oversight Assembly

The **Ombuds Oversight Assembly** is constituted with the following authority:
- Annual certification of §1.2 structural-dispersal compliance.
- Review and public report on Plenum institutional health (voting patterns, dissents, recusal frequency, staffing diversity).
- Power to initiate removal proceedings against any sub-Ombuds Commissioner if §2.4 removal conditions are met — removal still requires CRP and Plenum concurrence, but the Oversight Assembly is the triggering body.
- Appointment of substitute determining officers under §2.3 reduced-Plenum option (b).
- Activation of §5.3 Concentration Response.

**Composition.** The Oversight Assembly has **seven members**, drawn from structurally distinct sources:
- 2 nominated by civil liberties organisations with no CRP funding relationship.
- 2 nominated by independent academic institutions with published constitutional law, public administration, or civic-systems expertise.
- 1 nominated by a federated trade or labour body with independent standing.
- 1 nominated by an independent practitioner register (judges, retired officials, published public-interest litigators) with no prior protocol-administration employment.
- 1 lot-drawn from citizens (personhood-holders at protocol scale) who have passed a published qualification review.

Terms are **3 years, staggered, non-renewable**. No more than 2 members may turn over in any single year. No member may hold simultaneous roles in the CRP, any sub-Ombuds, any Enforcement Panel, or any founding coalition.

### 5.2 Assembly Decision Rule

The Oversight Assembly operates under a **5-of-7 supermajority** for all binding decisions. This mirrors the Plenum's FC-091 ratio (4/5 = 80%; 5/7 ≈ 71%, slightly relaxed to account for the Assembly's larger size and broader nomination base) while preserving a strong supermajority requirement.

### 5.3 Concentration Response

If the Assembly certifies that the federation has lost structural dispersal along two or more §1.2 dimensions, or that two or more sub-Ombuds are operating under common capture signals (e.g., concordant anomalous voting, shared-counsel engagements, coordinated personnel transfers), the Assembly activates the **Concentration Response**:

1. Immediate public notice on Article VII dashboards.
2. Suspension of Plenum authority on §3.2 matters pending remediation.
3. Automatic activation of a reduced-Plenum unanimous rule (§2.3 option (a)) for all pending operational determinations.
4. A 180-day remediation window in which the affected sub-Ombuds must either (a) restore dispersal (via personnel, funding, or infrastructure change) or (b) face removal under §2.4.
5. If remediation is not achieved, the affected seats are declared vacant and filled under §2.1 on an accelerated timeline (90-day challenge period instead of 60).

Concentration Response activation is itself a Tier 1–logged event — recorded in `/architecture/drift_chain.md` as a federation-integrity event.

### 5.4 Assembly's Own Meta-Capture

The Oversight Assembly is small enough to face its own capture risk. Defences:
- **Diversity lock.** No two members may share primary institutional origin.
- **Rotation.** 3-year staggered non-renewable terms prevent entrenchment.
- **Publication of all votes with rationale.** Voting pattern concentration is itself an Article VII monitoring metric.
- **Right of complaint.** Any sub-Ombuds, any CRP member, or any advocacy organisation may file a complaint against an Assembly member; complaints are heard by a lot-drawn 5-member panel from the Assembly's alternates registry.

The Oversight Assembly does not hold authority over the sub-Ombuds' §4 operational functions — it audits the federation's structural health, not its casework.

---

## 6. Publication Commitment

The Federated Ombuds publishes the following as a continuous public record, in coordination with Article VII:

| Item | Publication format | Frequency | Responsible body |
| :--- | :--- | :--- | :--- |
| All operational determinations (manufactured-flag findings, PCRP co-certifications, exclusion triage) | Full written determination with evidence basis, timeline, Duty Sub-Ombuds signature | Immediately upon issuance | Duty Sub-Ombuds |
| All Plenum votes on §3.2 matters | Vote count, per-sub-Ombuds positions, dissenting rationales, decision | Within 7 days of vote | Plenum |
| Annual Tier 1 Integrity Report | Full report on all Tier 1 amendments registered in prior year | Annually (plus per-amendment within 60 days) | Plenum |
| Adversarial oracle certifications | Per-cohort certification record | At each certification / rotation | Plenum |
| Enforcement appeal decisions | Full decision with vote and rationale | Within 14 days of decision | Plenum |
| Attestation adjudications | Finding, stake-slashing classification, vote | Within 14 days of decision | Plenum |
| Cohort concentration quarterly report | Federation-wide diversity-compliance tables | Quarterly | Plenum |
| AED compliance dashboard | Metrics per Annex AK §6 | Quarterly | Plenum |
| Structural-dispersal annual certification | §1.2 compliance findings | Annually | Oversight Assembly |
| Plenum institutional health report | Voting patterns, recusal frequency, staffing diversity | Annually | Oversight Assembly |
| Concentration Response events | Full activation record with timeline and remediation status | At activation; monthly update through remediation | Oversight Assembly |
| Duty rotation schedule | Forward-looking rotation for next 90 days | Rolling, updated weekly | Federation secretariat |
| Recusal events | Officer, matter class, acting officer | Within 24 hours | Affected sub-Ombuds |

Publication of every vote, every dissent, and every dispersal-compliance finding is the mechanism that makes the federation institutionally legible. A Plenum that consistently produces lopsided votes with predictable dissents is visible; a federation that has drifted toward common capture is visible; an Assembly that is rubber-stamping dispersal compliance is visible.

---

## 7. Founding Coalition Instructions

To constitute the Federated Ombuds before deployment, the founding coalition must:

1. **Designate five structural-dispersal slots** satisfying §1.2 along at least four of five dimensions. Slot definitions are published at founding.
2. **Complete at least four sub-Ombuds appointments** before any Ombuds-dependent function is operative, with the fifth completed within 180 days of genesis (§2.1 pre-launch gate).
3. **Constitute the Oversight Assembly** with at least five of seven seats filled before the first Plenum vote; all seven filled within 180 days.
4. **Publish the manufactured-flag criteria** (preserved from prior Section 3.2) at least 30 days before the first Duty Sub-Ombuds determination is made.
5. **Build the federation secretariat** — cross-node operational support (duty rotation scheduling, Plenum convocation, publication infrastructure) — prior to operational activation. The secretariat has no independent authority; it serves the federation.
6. **Set the budget floor percentages** per sub-Ombuds at founding, lock at Tier 1.
7. **Publish the duty rotation schedule** for the first 90 days prior to operational activation.

---

## 8. Relationship to Other Annexes

| Annex | Relationship |
| :--- | :--- |
| `/architecture/parameter_registry.md` | FC-090, FC-091, FC-092 are Tier 1 parameters locked in the registry |
| `/architecture/amendment_protocol.md` | Federation issues the 60-day Tier 1 Amendment Integrity Report (§3.2 item 1) |
| `/architecture/drift_chain.md` | Federation plenum votes and Oversight Assembly certifications are drift-chain-logged events |
| Annex AJ (Above-Ledger Bypass) | Federation hears enforcement appeals (§3.2 item 4; §4.8) |
| Annex AK (Identity AED) | Federation monitors AED and receives exclusion reports (§4.4) |
| Annex AL (Methodology-Class) | Federation certifies adversarial oracle seats (§3.2 item 2; §4.6) |
| Annex AO (Register Disclosure) | Sub-Ombuds hold restricted register access; Plenum conducts annual attestation (§4.5) |
| Annex AQ (Shared Storehouse Oracle-Failure Fallback) | Federation seats one sub-Ombuds on the arbitration panel (§3.2 item 3; §4.7) |
| Annex AS (Attestation-at-Risk Stake) | Federation adjudicates false-claim findings (§3.2 item 5; §4.9) |
| Annex AH/AH2 (Founding Window) | Federation contributes one staff member to the P-014 panel by lot (§4.10) |
| Annex AR (Contract-Commitment Architecture) | Federation issues public notices when Annex AR deployment-window reviews are triggered (§4.11) |

---

## 9. Governance of This Annex

This annex is Tier 1 protected per `/architecture/parameter_registry.md`. Changes to the federation structure (FC-090 = 5), the supermajority threshold (FC-091 = 4/5), or the term length (FC-092 = 730 days) require the full amendment protocol (7 of 9, 180-day timelock). Changes to §4 mandate functions that would weaken protection of any Tier 1 invariant are prohibited without H-3 refounding authority.

Mandate functions may be **extended** by Tier 2 amendment — new integrations may add protocol-level matters to §3.2 or new operational functions to §4 — but cannot be **reduced** without Tier 1 amendment. The principle mirrors the implementation-binding rule: the lock can be strengthened but not weakened by ordinary amendment.

---

*This document is Annex AI of the Humane Constitution. The Federated Ombuds is operative as of Proposal 8 close-out (2026-04-18). No patch that depends on Ombuds functions is active until at least four sub-Ombuds are seated and the Oversight Assembly has completed its pre-launch dispersal certification.*
