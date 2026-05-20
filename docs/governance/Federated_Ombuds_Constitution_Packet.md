# Federated Ombuds Constitution Packet

**Date prepared:** 2026-05-15
**Branch:** claude/pedantic-spence-c4e730
**Status:** OPERATIONAL GOVERNANCE PACKET -- NOT YET ADOPTED
**Purpose:** Supports the human governance action of constituting the Federated Ombuds.

This packet does not itself constitute the Federated Ombuds. It does not appoint sub-Ombuds commissioners. It does not invent names, appointees, votes, signatures, dates, or outcomes. It is a reference and workflow tool for the founding team executing the constitution process. All requirements are grounded in source text; gaps are labeled OWNER DECISION REQUIRED.

---

## Purpose

The Federated Ombuds is the system's independent watchdog. It is not optional infrastructure -- it is a structural prerequisite for all Ombuds-dependent governance functions, including the FC-YT1/FC-YT2 review required by INV-LAUNCH-1 before any real-persons enrollment can occur.

This packet compiles, in one operational document, everything the founding team needs to execute the Federated Ombuds constitution process:

- Source authority for every requirement
- Constitution preconditions (what must exist first)
- Required seats and dispersal rules
- Step-by-step appointment workflow
- Independence and conflict review checklist
- Required audit artifacts
- A launch dependency map showing what each Ombuds-dependent gate requires
- A template resolution for the founding team (TEMPLATE -- NOT ADOPTED)
- Open questions that must be resolved before the process can begin
- A completion checklist for verifying the Ombuds is constituted

Related prior work: `docs/audits/p0-c-federated-ombuds-readiness-packet.md` contains an earlier operational readiness audit. This packet supersedes it as the primary workflow reference and expands on the appointment workflow and audit artifact specifications.

---

## Source Authority

| Requirement | Source file | Section | Evidence | Notes |
|:---|:---|:---|:---|:---|
| Five sub-Ombuds required | `docs/annexes/ANNEX_AI.md` | Section 1.1; FC-090 | "The Federated Ombuds is constituted as five sub-Ombuds offices" | FC-090 = OMBUDS_SUBCOUNT_MIN = 5, Tier 1 lock |
| Below five is prohibited | `docs/annexes/ANNEX_AI.md` | Section 1.1 | "Below five is prohibited; contraction to below five requires Tier 1 amendment (H-3)" | H-3 = refounding authority |
| 4-of-5 pre-launch operative threshold | `docs/annexes/ANNEX_AI.md` | Section 2.1 | "The protocol is not operative with respect to any Ombuds-dependent function until at least four of five sub-Ombuds have been appointed, challenged, and seated." | Fifth seat within 180 days of protocol genesis |
| Sub-Ombuds Commissioner appointed by: | `docs/annexes/ANNEX_AI.md` | Section 2.1 | "Nominated by the sub-node's assigned appointing body (per Section 1.2 institutional-origin class)" | One appointing body per class; classes defined in Section 1.2 |
| Sub-Ombuds Commissioner confirmed by: | `docs/annexes/ANNEX_AI.md` | Section 2.1 | "confirmed by a 2/3 vote of the CRP" | CRP = Constitutional Review Panel; must be constituted first |
| 60-day public challenge period | `docs/annexes/ANNEX_AI.md` | Section 2.1 | "subject to a 60-day public challenge period" | Challenge period closes before seating |
| Term length = 730 days | `founding/commitments.md` | FC-092 | OMBUDS_TERM_DAYS = 730 | Two consecutive terms maximum; 730-day wait after; four non-consecutive lifetime cap |
| Staggered terms | `docs/annexes/ANNEX_AI.md` | Section 2.1 | "Seats 1, 3, 5 appointed in odd years of the 730-day cycle; seats 2, 4 in even years" | Founding team must assign initial start/end dates |
| Five institutional-origin classes | `docs/annexes/ANNEX_AI.md` | Section 1.2 | Civil liberties, academic, federated trade/labour, independent practitioner registry, faith or community-charter institutions | No two sub-Ombuds may share an appointing-body class |
| Dispersal on 4-of-5 dimensions | `docs/annexes/ANNEX_AI.md` | Section 1.2 | Each sub-Ombuds must differ from every other on at least four of five dimensions (jurisdictional, institutional-origin, funding, infrastructure, personnel-recruitment) | Non-compliance triggers 180-day repair window |
| 4-of-5 supermajority for protocol-level decisions | `founding/commitments.md` | FC-091 | OMBUDS_SUPERMAJORITY_THRESHOLD = 4/5 | Tier 1 lock; cannot be reduced without Tier 1 amendment |
| Recusal standards | `docs/annexes/ANNEX_AI.md` | Section 2.3 | Professional relationship in prior 5 years; participation in design, implementation, or review; direct or indirect financial interest | Self-declared and recorded publicly |
| Removal of Commissioner | `docs/annexes/ANNEX_AI.md` | Section 2.4 | Requires all four of: (1) proven incapacity or serious misconduct with specific findings, (2) 3/4 CRP supermajority with published rationale, (3) Oversight Assembly affirmative, (4) 60-day public challenge | Removal procedure is Tier 1 protected |
| Independent budget floor | `docs/annexes/ANNEX_AI.md` | Section 2.2 | "each sub-Ombuds holds a Tier 1-protected budget floor...no sub-node falls below a per-node floor sufficient to staff the mandate functions" | Floor percentages set at founding, locked at Tier 1; OWNER DECISION REQUIRED |
| Signed inter-office protocol | `docs/annexes/ANNEX_AI.md` | Section 1.1 | "A signed inter-office protocol committing each sub-Ombuds to the federation's decision rules and publication commitments" | Executed by all seated commissioners before any operational function |
| Duty rotation schedule | `docs/annexes/ANNEX_AI.md` | Sections 1.3, 7 | "default weekly"; "published at least 14 days in advance"; founding coalition must "publish the duty rotation schedule for the first 90 days prior to operational activation" | No party may choose their reviewing Duty Sub-Ombuds |
| Manufactured-flag criteria published | `docs/constitution/Acceptance_Protocol.md` | Pre-Launch Blocking Gates, row 1 | "manufactured-flag criteria published at least 30 days before first determination" | Requires seated Plenum (4-of-5 Plenum vote) |
| Oversight Assembly required | `docs/annexes/ANNEX_AI.md` | Section 5.1 | 7 members; 5-of-7 supermajority; annual dispersal certification | Must include initial dispersal and independence review before first Plenum vote |
| INV-LAUNCH-1 Ombuds verification | `docs/constitution/INVARIANTS.md` | INV-LAUNCH-1 | "independently verified by the Federated Ombuds...must publish the specific confirmed values" | Cannot be performed until Ombuds constituted; FC-YT1 and FC-YT2 separately |
| AG4 gate requires Ombuds confirmation | `docs/constitution/Acceptance_Protocol.md` | Pre-Launch Blocking Gates, AG4 row | "Federated Ombuds has published written confirmation that the Section AG4 urgency bypass prohibition governs all patch activation attempts during the founding window" | Depends on Ombuds seated first |
| CRP composition and constitution | `docs/annexes/ANNEX_L.md` | Section L2 | "The CRP shall contain 11 members" -- 4 jurists (lot from appellate pools), 3 systems reviewers (lot from certified pools), 2 ombuds/public-interest advocates (lot from advocacy pool), 2 civic auditors (sortition) | Staggered non-renewable terms; sortition process is the constitution mechanism |
| Publication commitment -- all Plenum votes | `docs/annexes/ANNEX_AI.md` | Section 6 | "Vote count, per-sub-Ombuds positions, dissenting rationales, decision; within 7 days of vote" | Continuous public record |

---

## Constitution Preconditions

The following must be true before the Federated Ombuds constitution process can begin. These are not corpus text changes -- they are operational facts the founding team must confirm.

**Precondition 1: Constitutional Review Panel (CRP) is constituted and able to vote.**

Source: ANNEX_AI Section 2.1 requires "a 2/3 vote of the CRP" to confirm each sub-Ombuds Commissioner. If the CRP cannot vote, the appointment process cannot complete.

- CRP composition: 11 members; 4 jurists (lot-drawn from qualified regional appellate pools), 3 systems reviewers (lot from certified pools), 2 ombuds/public-interest advocates (lot from independent advocacy pool), 2 civic auditors (sortition). (ANNEX_L Section L2)
- CRP constitution mechanism: sortition from screened eligibility pools; staggered non-renewable terms; conflict screening required. (ANNEX_L Section L2; ANNEX_S Section S)
- If the CRP is not yet constituted: the founding authority has adopted the provisional CRP mechanism as the bootstrap path. See docs/governance/OQ_CRP_1_Adopted_Interpretation.md (Option A adopted: provisional CRP under ANNEX_N and ANNEX_U Section U2 may confirm sub-Ombuds Commissioners during the founding period, for that limited purpose only). Execution requires completing the draw and certification process per docs/governance/Provisional_CRP_Draw_and_Roster_Certification_Packet.md and satisfying all ANNEX_U Section U2 pre-effect conditions before any confirmation vote may proceed. Process parameters are recorded in docs/governance/Provisional_CRP_Owner_Decision_Record.md.

**Precondition 2: Five appointing bodies have been designated, one per institutional-origin class.**

Source: ANNEX_AI Section 1.2 -- each sub-Ombuds is nominated by its assigned appointing body. The five classes are defined but no specific organizations are named in the corpus.

- OWNER DECISION REQUIRED: founding team must designate one specific organization per class before nomination requests can be sent.
- Designations must be published to enable public challenge to the choice of appointing body.

**Precondition 3: Budget floor percentages have been set and locked at Tier 1.**

Source: ANNEX_AI Section 2.2 -- "Floor percentages are set at founding and locked at Tier 1." Budget reductions below floor require Tier 1 amendment.

- OWNER DECISION REQUIRED: founding team must determine the per-node floor percentage (as a share of total protocol administration budget) sufficient to staff each sub-Ombuds' mandate functions under ANNEX_AI Section 4.
- These values must be published and locked before any sub-Ombuds is seated.

**Precondition 4: The five structural-dispersal slots have been defined and published.**

Source: ANNEX_AI Section 7.1 -- "Designate five structural-dispersal slots satisfying Section 1.2 along at least four of five dimensions. Slot definitions are published at founding."

- For each slot: jurisdiction, institutional-origin class, funding channel, infrastructure channel, and personnel-recruitment network must each differ from every other slot on at least four of these dimensions.
- OWNER DECISION REQUIRED: founding team must map these five slots and publish the mapping before nominations begin.

---

## Required Seats and Offices

### Sub-Ombuds Count

- **Total required:** 5 (FC-090, Tier 1 floor). Cannot be reduced without H-3 refounding authority.
- **Minimum for Ombuds-dependent functions to be operative:** 4 of 5 seated (ANNEX_AI Section 2.1 pre-launch gate).
- **Fifth seat deadline:** Within 180 days of protocol genesis (see Open Question OQ-4 below for definition of "protocol genesis").
- **Extension above 5:** Permitted by Tier 2 amendment with adjusted supermajority threshold.

### Is 4-of-5 Sufficient for Launch Gates?

Yes, with qualification. ANNEX_AI Section 2.1 states "at least four of five sub-Ombuds have been appointed, challenged, and seated" is the operative threshold for Ombuds-dependent functions. This is sufficient to:

- Clear the "Federated Ombuds seated" pre-launch blocking gate (Acceptance_Protocol.md)
- Perform FC-YT1/FC-YT2 review (4 sub-Ombuds signatures required on findings -- see Audit Artifacts below)
- Conduct AG4 confirmation
- Execute the manufactured-flag criteria publication (4-of-5 Plenum vote)

The fifth seat does not block launch gates, but must be filled within 180 days of genesis.

### Is All-5-of-5 Required for Full Constitution?

Full constitution requires all 5 seats to be filled, but the 180-day window provides operational flexibility. During the window (4-of-5 seated, fifth pending), the federation operates under a reduced-Plenum rule for any matter where fewer than 4 sub-Ombuds are available (Section 2.3).

### Role and Jurisdiction Requirements

Each sub-Ombuds must:
- Have a Commissioner (head of sub-node) -- nominated, confirmed, challenged, seated per Section 2.1.
- Have full standing staff: Commissioner, deputies, investigators (Section 1.1). Deputies appointed by Commissioner with Plenum notification; investigators have civil-service protection.
- Hold an independent budget floor line-item (Section 2.2).
- Have a local access-authority mandate over enforcement records, identity-system telemetry, and supply-signal data within its assigned jurisdictional scope (Section 1.1).
- Execute the signed inter-office protocol (Section 1.1).

**Missing role definitions in source text:**
- Minimum individual eligibility criteria for Commissioner nominees are not specified. Appointing bodies may use their own judgment, or the founding team may specify minimum criteria before nominations begin. OWNER DECISION REQUIRED.
- Deputy Commissioner eligibility and independence requirements are not separately specified beyond "appointed by sub-node Commissioner with Plenum notification."

---

## Appointment and Confirmation Workflow

This is the step-by-step sequence for each sub-Ombuds seat. Repeat for all five seats (four must complete before any Ombuds-dependent function is operative; the fifth completes within 180 days of genesis).

**Before beginning: confirm all four Preconditions above are met.**

---

### Step 1: Founding Team Publishes Slot Definitions and Appointing Body Designations

**Actor:** Founding team.
**Source:** ANNEX_AI Sections 1.2, 7.1.
**What to do:**
- Publish the five structural-dispersal slots with their jurisdictional scope, institutional-origin class, funding channel, infrastructure channel, and personnel-recruitment network.
- Publish the specific organization designated as appointing body for each institutional-origin class.
- Confirm that no two slots share primary jurisdiction, primary regulatory relationship, primary funding channel, or primary infrastructure dependency.

**Output:** Published slot definitions and appointing-body designations (public record).
**No output, no next step.** Nominations cannot proceed without published designations.

---

### Step 2: Formal Nomination Request to Each Appointing Body

**Actor:** Founding team or founding coordinating body.
**Source:** ANNEX_AI Section 2.1.
**What to do:**
- Send a formal written nomination request to each of the five designated appointing bodies.
- Specify in the request: the Section 1.2 dispersal requirements each nominee must satisfy; the term length (730 days, FC-092); the recusal standards under Section 2.3; the conflict disclosure requirements (Step 4); and the budget floor to which the sub-node will be entitled.
- Specify whether the founding team has set minimum individual eligibility criteria (if OWNER DECISION REQUIRED above was resolved).

**Output:** Written nomination request sent and received by each appointing body (dated record).

---

### Step 3: Appointing Body Nominates a Commissioner Candidate

**Actor:** Each designated appointing body.
**Source:** ANNEX_AI Section 2.1 ("nominated by the sub-node's assigned appointing body").
**What to do:**
- Each appointing body nominates one Commissioner candidate for its assigned slot.
- Nomination is submitted in writing to the founding team or coordinating body.
- Nomination must identify: candidate name, institutional affiliation, jurisdiction, and how the candidate satisfies the Section 1.2 dispersal requirements for the assigned slot.

**Output:** Written nomination from each appointing body (dated, publicly accessible).

---

### Step 4: Eligibility Screening and Conflict Review

**Actor:** Founding team or an independent screener (if constituted). OWNER DECISION REQUIRED on who performs the screening.
**Source:** ANNEX_AI Sections 1.2, 2.3; recusal standards; Independence and Conflict Review Checklist below.
**What to do:**
- Verify the nominee satisfies the Section 1.2 dispersal requirements for the assigned slot.
- Review the nominee's conflict disclosures against the Section 2.3 recusal standards:
  - Professional relationship with any protocol entity within prior 5 years
  - Participation in design, implementation, or review of any protocol element the sub-Ombuds will oversee
  - Direct or indirect financial interest in any entity subject to Ombuds oversight
- Verify the nominee does not share any of the following with any other nominated candidate: primary jurisdiction, primary regulatory relationship, primary funding channel, primary infrastructure dependency.
- See the Independence and Conflict Review Checklist section below for the full checklist.

**Output:** Written eligibility and conflict review record for each candidate; published before the confirmation vote.
**If a conflict is found:** Candidate may cure the conflict or withdraw. The appointing body may submit a new nominee. The founding team must determine whether conflict cures are sufficient before the CRP confirmation vote proceeds. OWNER DECISION REQUIRED if conflict cure process is not specified in source text (it is not).

---

### Step 5: CRP Confirmation Vote

**Actor:** Constitutional Review Panel (CRP).
**Source:** ANNEX_AI Section 2.1 ("confirmed by a 2/3 vote of the CRP").
**What to do:**
- CRP reviews each nominee's nomination letter and conflict review record.
- CRP votes on each nominee separately. Two-thirds of the CRP (8 of 11 members -- Recommended but not Source-Mandated; "2/3 of CRP" requires founding team to confirm whether this means 2/3 of full panel or 2/3 of quorum; OWNER DECISION REQUIRED on quorum rules for this vote) must vote affirmatively.
- Vote record must be published with rationale, including any dissenting positions.

**Output:** Published CRP vote record for each nominee; affirmative votes counted and published.
**If vote fails:** Appointing body nominates a new candidate; return to Step 3.

---

### Step 6: Public Challenge Period (60 days)

**Actor:** Public; founding team or coordinating body administers.
**Source:** ANNEX_AI Section 2.1 ("subject to a 60-day public challenge period").
**What to do:**
- Publicly announce each CRP-confirmed nominee with: name, institutional-origin class, assigned jurisdiction, term dates, and dispersal confirmation.
- Run the 60-day challenge period. Any person or organization may file a written challenge during this period.
- All challenges must be documented and receive written responses. Challenge outcomes must be published.
- If a challenge raises a substantive dispersal or conflict concern, the founding team (or Oversight Assembly, if constituted) must make a written determination on the challenge. Source does not specify the challenge adjudication body before the Oversight Assembly is constituted. OWNER DECISION REQUIRED.

**Output:** Public challenge announcement (dated); challenge log; challenge outcome determinations (published); written confirmation that the 60-day period closed without disqualifying outcome.
**If a challenge succeeds:** The nominee is disqualified. Appointing body nominates a new candidate; return to Step 3. The 60-day clock restarts for the new candidate.

---

### Step 7: Seating

**Actor:** Founding team in coordination with the CRP and designated appointing bodies.
**Source:** ANNEX_AI Sections 2.1, 7.2.
**What to do:**
- After the 60-day challenge period closes with no disqualifying outcome: seat the Commissioner.
- Execute the signed inter-office protocol: each seated Commissioner signs the protocol committing to the federation's decision rules and publication commitments (Section 1.1).
- Confirm the Commissioner is holding office and able to act.

**Minimum operative threshold:** At least four sub-Ombuds Commissioners must be seated before any Ombuds-dependent function can proceed.

**Output:** Seating confirmation document (dated); signed inter-office protocol (dated, countersigned, publicly accessible).

---

### Step 8: Sub-Node Infrastructure Activation

**Actor:** Each seated Commissioner, in coordination with founding team.
**Source:** ANNEX_AI Sections 1.1, 2.2, 7.3, 7.6, 7.7.
**What to do:**
- Activate independent budget floor line-item for the sub-node (Tier 1-locked; published at founding per Precondition 3).
- Confirm the sub-node holds independent infrastructure: distinct primary publication channel, distinct primary communication infrastructure, distinct primary record-storage custodian (Section 1.2 infrastructure dimension).
- Build local access-authority mandate infrastructure: access to enforcement records, identity-system telemetry, and supply-signal data within the sub-node's jurisdictional scope (Section 1.1).

**Output:** Budget floor documentation (Tier 1-locked, published); infrastructure independence confirmation.

---

### Step 9: Publication of Seat Roster and Duty Rotation Schedule

**Actor:** Founding team / federation secretariat.
**Source:** ANNEX_AI Sections 1.3, 6, 7.5, 7.7.
**What to do:**
- Publish the sub-Ombuds seat roster: all seated commissioners, sub-node designation, institutional-origin class, jurisdiction, term start and end dates. Updated within 7 days of any change (Section 6).
- Publish the duty rotation schedule for the first 90 days prior to operational activation (Section 7.7). Default weekly rotation; published at least 14 days in advance.
- Publish the manufactured-flag criteria (ANNEX_AI Section 4.12) at least 30 days before the first manufactured-flag determination (Acceptance_Protocol.md pre-launch gate, row 1). This publication requires a 4-of-5 Plenum vote -- requires all four seated commissioners to participate.

**Output:** Published seat roster (publicly accessible); published duty rotation schedule (publicly accessible); published manufactured-flag criteria (dated, Plenum-signed 4-of-5, at least 30 days before first determination).

---

### Step 10: Article VII Dashboard Publication and Pre-Launch Audit Artifact

**Actor:** Founding team and Federated Ombuds Plenum.
**Source:** ANNEX_AI Section 6; ANNEX_AM Section AM3 (Article VII dashboard); Acceptance_Protocol.md.
**What to do:**
- Record the Federated Ombuds constitution as a founding-event entry in the Article VII dashboard.
- Record: date each seat was filled; date the inter-office protocol was signed; date the duty rotation schedule was published; date the manufactured-flag criteria were published.
- Publish the independence dispersal matrix: for each pair of seated sub-Ombuds, confirm that at least four of five Section 1.2 dimensions differ.
- The Oversight Assembly (when constituted -- see Section 5.1) must conduct its initial dispersal and independence review and publish results before the Federated Ombuds seated gate can be certified as cleared.

**Output:** Article VII dashboard founding-event entries (dated, public); independence dispersal matrix (signed by founding team and Oversight Assembly after its constitution); Acceptance_Protocol pre-launch gate clearance record.

---

## Independence and Conflict Review

### Checklist for Each Commissioner Nominee

Use this checklist before the CRP confirmation vote (Step 5). All items marked Source-Mandated are derived from ANNEX_AI text; items marked Recommended are additional due-diligence practices not expressly required by source text.

**Professional and institutional conflicts:**

| Item | Source-mandated? | Source | Finding |
|:---|:---|:---|:---|
| Has the nominee had a professional relationship with any entity the sub-Ombuds will oversee within the prior 5 years? | Yes | ANNEX_AI Section 2.3 | To be completed |
| Has the nominee participated in the design, implementation, or review of any protocol element the sub-Ombuds will oversee? | Yes | ANNEX_AI Section 2.3 | To be completed |
| Does the nominee hold a direct or indirect financial interest in any entity subject to Ombuds oversight? | Yes | ANNEX_AI Section 2.3 | To be completed |
| Is the nominee currently affiliated with the founding coalition? | Recommended but not Source-Mandated | Structural independence principle | To be completed |
| Does the nominee currently hold a role in the CRP, any Enforcement Panel, or any founding coalition body? | Source-Mandated for Oversight Assembly members (ANNEX_AI Section 5.1); Recommended for sub-Ombuds nominees | ANNEX_AI Section 5.1 | To be completed |
| Has the nominee had prior involvement in the specific commitments (FC-YT1, FC-YT2) they will be asked to independently verify? | Recommended but not Source-Mandated | Independence principle; self-evident recusal risk | To be completed |

**Financial conflicts:**

| Item | Source-mandated? | Source | Finding |
|:---|:---|:---|:---|
| Does the nominee hold equity or material debt interests in any entity subject to Ombuds oversight? | Yes (indirect financial interest standard) | ANNEX_AI Section 2.3 | To be completed |
| Does the nominee receive compensation from any entity subject to Ombuds oversight? | Yes (indirect financial interest standard) | ANNEX_AI Section 2.3 | To be completed |
| Does the sub-node's designated funding channel create any dependency on an entity the sub-node oversees? | Yes -- would violate Section 2.2 "no sub-Ombuds may accept external funding...from any entity subject to its own oversight" | ANNEX_AI Section 2.2 | To be completed |

**Dispersal conflicts:**

| Item | Source-mandated? | Source | Finding |
|:---|:---|:---|:---|
| Does the nominee share primary jurisdiction with any other nominated or seated sub-Ombuds? | Yes | ANNEX_AI Sections 1.1, 1.2 | To be completed |
| Does the nominee share primary regulatory relationship with any other nominated or seated sub-Ombuds? | Yes | ANNEX_AI Section 1.1 | To be completed |
| Does the nominee's sub-node share primary funding channel with any other sub-node? | Yes | ANNEX_AI Section 1.2 (funding dimension) | To be completed |
| Does the nominee's sub-node share primary infrastructure (publication channel, communication, record storage) with any other sub-node? | Yes | ANNEX_AI Section 1.2 (infrastructure dimension) | To be completed |
| Do the nominees for any two sub-nodes draw primarily from the same academic, professional, or alumni network? | Yes -- "no more than one sub-Ombuds may recruit primarily from any single academic, professional, or alumni network" | ANNEX_AI Section 1.2 (personnel-recruitment dimension) | To be completed |

**Recusal in founding process:**

| Item | Source-mandated? | Source | Finding |
|:---|:---|:---|:---|
| Recusal is self-declared and recorded publicly | Yes | ANNEX_AI Section 2.3 | Founding team must require self-declaration from each nominee before confirmation vote |
| Failure to recuse when a recusal condition is met is treated as serious misconduct | Yes | ANNEX_AI Section 2.3 | Nominees must be informed of this standard in the nomination request |

**Publication requirement:**

- All conflict disclosures must be published before the CRP confirmation vote (Source-Mandated, derived from ANNEX_AI Section 2.3 public recusal record requirement applied to the nomination stage). OWNER DECISION REQUIRED on exact publication form and location.

---

## Required Audit Artifacts

These records must exist after the Federated Ombuds is constituted and all Ombuds-dependent pre-launch gates are cleared. A pre-launch auditor will inspect each artifact. Records marked with an asterisk (*) are required before any Ombuds-dependent function can be performed.

| Artifact | Content | Who produces | Format requirement | Source |
|:---|:---|:---|:---|:---|
| Slot definitions publication* | Five structural-dispersal slots; jurisdictional scope, institutional-origin class, funding channel, infrastructure channel, personnel-recruitment network for each | Founding team | Public record; dated | ANNEX_AI Sections 1.2, 7.1 |
| Appointing-body designations* | Five organizations (one per class); basis for designation | Founding team | Public record; dated | ANNEX_AI Section 1.2 |
| Per-seat nomination letter (x5) | Nominee name; institutional affiliation; jurisdiction; how nominee satisfies Section 1.2 dispersal requirements for assigned slot | Each designated appointing body | Written, dated, publicly accessible | ANNEX_AI Section 2.1 |
| Conflict review record (x5) | Per-nominee checklist outcome; disclosures received; conflicts identified and disposition | Founding team or independent screener | Written, dated, publicly accessible, published before CRP vote | ANNEX_AI Section 2.3 |
| CRP vote record (x5) | Vote count; individual positions; rationale; any dissent | CRP | Published, dated | ANNEX_AI Section 2.1 |
| Challenge period record (x5) | Challenge open/close dates; challenges received (if any); challenge outcome determinations | Founding team or coordinating body | Public record; dated; 60-day period documented | ANNEX_AI Section 2.1 |
| Seating confirmation (x4-of-5 minimum)* | Confirms Commissioner holds office and can act; date seated | Founding team | Written, dated, publicly accessible | ANNEX_AI Section 2.1 |
| Signed inter-office protocol* | Executed by all seated sub-Ombuds; covers federation decision rules and publication commitments | All seated Commissioners | Countersigned; dated; publicly accessible | ANNEX_AI Section 1.1 |
| Sub-Ombuds seat roster* | All seated commissioners: name, sub-node, institutional-origin class, jurisdiction, term start/end | Federation secretariat | Published; updated within 7 days of any change | ANNEX_AI Section 6 |
| Independence dispersal matrix* | For each pair of seated sub-Ombuds: confirmation of >= 4-of-5 Section 1.2 dimensions differing; dimension-by-dimension table | Founding team; countersigned by Oversight Assembly after its constitution | Matrix format; signed; dated | ANNEX_AI Section 1.2 |
| Budget floor documentation | Per-node floor percentages; which fiscal channels fund each node | Founding team | Tier 1-locked; published at founding | ANNEX_AI Section 2.2 |
| Oversight Assembly composition record | 7 members; names; terms; nominating bodies; initial dispersal and independence review findings | Founding team + Assembly | Published before first Assembly vote | ANNEX_AI Section 5.1 |
| Duty rotation schedule (first 90 days)* | Forward-looking rotation; published at least 14 days in advance | Federation secretariat | Public record; dated | ANNEX_AI Sections 1.3, 7.7 |
| Manufactured-flag criteria document | Published criteria per ANNEX_AI Section 4.12; four deliberate-manufacture criteria; decision rule; timeline; burden of proof | Federated Ombuds Plenum (4-of-5 vote) | Publicly accessible; Plenum-signed (>= 4 sub-Ombuds); date-stamped >= 30 days before first determination | ANNEX_AI Section 4.12; Acceptance_Protocol.md |
| Article VII founding-event entries | Date each seat filled; protocol signing date; rotation schedule publication date; manufactured-flag criteria publication date | Founding team / federation secretariat | Article VII dashboard; permanent record | ANNEX_AI Section 6; ANNEX_AM Section AM3 |
| FC-YT1 Ombuds findings | Confirmed value = 3 verified delivery failures per jurisdictional cluster per 30-day window; distinction from FC-071; operational definition of "verified delivery failure" | Federated Ombuds Plenum | Written; signed by >= 4 sub-Ombuds; dated; published through Article VII | INV-LAUNCH-1(b); ANNEX_Y Section Y4 |
| FC-YT2 Ombuds findings | Confirmed value = 90 days CSM coverage per enrolled population, by jurisdiction and essential category; distinction from FC-070; reserve calculation method; verification mechanism | Federated Ombuds Plenum | Written; signed by >= 4 sub-Ombuds; dated; published through Article VII | INV-LAUNCH-1(b); ANNEX_Y Section Y7 |
| AG4 Ombuds written confirmation | Written confirmation that ANNEX_AG Section AG4 urgency bypass prohibition governs all patch activation attempts during the founding window | Federated Ombuds | Published on public record; dated | Acceptance_Protocol.md, AG4 gate |
| INV-LAUNCH-1 clearance evidence package | Bundled timestamped record confirming all INV-LAUNCH-1 conditions cleared | Founding team and Federated Ombuds Plenum | Signed by both; dated | INV-LAUNCH-1 |

---

## Launch Dependency Map

| Dependency | Requires Federated Ombuds seated? | Current status | Evidence artifact needed | Blocks INV-LAUNCH-1? |
|:---|:---|:---|:---|:---|
| Federated Ombuds seated (>= 4 of 5) | Yes -- is the dependency itself | NOT COMPLETE | Sub-Ombuds seat roster with >= 4 seated commissioners; independence dispersal matrix | Yes -- all Ombuds-dependent gates blocked until this clears |
| FC-YT1 value registered in founding/commitments.md | No | COMPLETE (P0-B batch, 2026-05-15) | commitments.md row FC-YT1 = CSM_FAILURE_COUNT_THRESHOLD = 3 | Condition (a) -- cleared |
| FC-YT2 value registered in founding/commitments.md | No | COMPLETE (P0-B batch, 2026-05-15) | commitments.md row FC-YT2 = CSM_SURVIVAL_RESERVE_DAYS = 90 | Condition (a) -- cleared |
| FC-YT1 values incorporated into ANNEX_Y Section Y4 | No | COMPLETE | ANNEX_Y Section Y4 inline reference | Condition (c) -- cleared |
| FC-YT2 values incorporated into ANNEX_Y Section Y7 | No | COMPLETE | ANNEX_Y Section Y7 inline reference | Condition (c) -- cleared |
| Tier 0 token mechanism constitutional spec exists | No | COMPLETE (P0-A batch; restored 2026-05-20) | ANNEX_AZ §AZ1 | Constitutional-spec condition of INV-LAUNCH-1 pre-launch gate -- cleared |
| TSP formally assigned for Tier 0 token mechanism | No | NOT COMPLETE | TSP designation record | Yes (INV-LAUNCH-1 pre-launch gate, separate condition; INV-LAUNCH-1 cannot clear until this is done) |
| FC-YT1 independently reviewed by Federated Ombuds, published findings | Yes -- cannot perform until Ombuds seated | NOT COMPLETE -- Ombuds not constituted | FC-YT1 Ombuds findings document signed by >= 4 sub-Ombuds | Yes -- condition (b) |
| FC-YT2 independently reviewed by Federated Ombuds, published findings | Yes -- cannot perform until Ombuds seated | NOT COMPLETE -- Ombuds not constituted | FC-YT2 Ombuds findings document signed by >= 4 sub-Ombuds | Yes -- condition (b) |
| Ombuds Oversight Assembly seated | Yes -- requires Ombuds interaction | NOT COMPLETE | Assembly composition record; initial dispersal and independence review | Yes (P-015 blocking gate) |
| Manufactured-flag criteria published >= 30 days before first determination | Yes -- requires Plenum vote | NOT COMPLETE | Manufactured-flag criteria document (Plenum-signed 4-of-5; dated >= 30 days before first determination) | Yes (P-015 blocking gate) |
| AG4 Ombuds written confirmation | Yes -- Ombuds must be seated to issue it | NOT COMPLETE | AG4 written confirmation on public record | Yes (AG4 pre-launch gate; blocks founding-window patch activation) |
| Capture dashboard baseline published | Partially -- Ombuds metrics included | NOT COMPLETE | Dashboard with civic, Ombuds, definition, procurement, identity, and implementation-drift concentration metrics | Yes (scale-up and governance activation gate) |

---

## Draft Human Action Resolution Template

**TEMPLATE -- NOT ADOPTED**

This template provides a suggested format for the founding team's formal record of Federated Ombuds constitution actions. It must not be used as evidence that the Ombuds has been constituted -- it is a blank template only.

---

**FEDERATED OMBUDS CONSTITUTION RESOLUTION**

**Title:** Federated Ombuds Sub-Ombuds Seating Resolution -- Seat [NUMBER]

**Date:** [DATE TO BE FILLED IN]

**Appointing and confirming bodies:**

- Appointing body: [NAME AND CLASS OF APPOINTING ORGANIZATION TO BE FILLED IN]
- Confirming body: Constitutional Review Panel
- Administering body: [FOUNDING TEAM OR COORDINATING BODY TO BE FILLED IN]

**Nominated seat:**

- Sub-Ombuds seat number: [1 / 2 / 3 / 4 / 5]
- Institutional-origin class: [CLASS NAME TO BE FILLED IN]
- Assigned jurisdiction: [JURISDICTION TO BE FILLED IN]
- Assigned slot structural-dispersal dimensions: [DIMENSIONS TO BE FILLED IN]

**Nominee:**

- Name: [NAME TO BE FILLED IN]
- Institutional affiliation: [AFFILIATION TO BE FILLED IN]

**Conflict disclosures:**

- Nominee self-declaration: [DISCLOSURE STATEMENT OR "NONE" TO BE FILLED IN]
- Screener determination: [FINDINGS TO BE FILLED IN]
- Published conflict review record reference: [RECORD REFERENCE TO BE FILLED IN]

**CRP confirmation vote:**

- Date of vote: [DATE TO BE FILLED IN]
- Vote count: [X affirmative of 11 to be filled in] (requires >= 8 affirmative for 2/3 majority -- OWNER DECISION REQUIRED on quorum rules)
- Published rationale reference: [REFERENCE TO BE FILLED IN]
- Dissents: [NONE / DISSENTING POSITIONS PUBLISHED AT REFERENCE TO BE FILLED IN]

**Public challenge period:**

- Challenge period opened: [DATE TO BE FILLED IN]
- Challenge period closed: [DATE TO BE FILLED IN] (60 days after opening)
- Challenges received: [NUMBER TO BE FILLED IN]
- Challenge outcome: [CLEARED / DISQUALIFIED -- OUTCOME TO BE FILLED IN]
- Published challenge record reference: [REFERENCE TO BE FILLED IN]

**Seating:**

- Seat effective date: [DATE TO BE FILLED IN]
- Inter-office protocol signed: [DATE TO BE FILLED IN]
- Signed protocol reference: [REFERENCE TO BE FILLED IN]

**Publication artifacts:**

- Sub-Ombuds seat roster updated: [DATE TO BE FILLED IN]
- Article VII dashboard founding-event entry: [DATE AND REFERENCE TO BE FILLED IN]

**Effective date of Ombuds-dependent functions (4-of-5 threshold):**

This section applies only after the fourth seat has been filled and this resolution is the fourth or later in sequence.

- Effective date of Ombuds-dependent operational authority: [DATE TO BE FILLED IN]
- Duty rotation schedule published for first 90 days: [DATE TO BE FILLED IN] (must precede effective date)
- Manufactured-flag criteria publication date: [DATE TO BE FILLED IN] (must be >= 30 days before first determination)

**Signatures:**

- Founding team or coordinating body: [PLACEHOLDER]
- Designated appointing body: [PLACEHOLDER]
- CRP presiding officer: [PLACEHOLDER]
- Seated Commissioner acceptance: [PLACEHOLDER]

---

**TEMPLATE -- NOT ADOPTED**

---

## Open Questions

These questions cannot be resolved from source text. Each requires a founding-team decision before the dependent governance actions can proceed.

**OQ-1: Is the Constitutional Review Panel (CRP) constituted and able to vote?**

- Source: ANNEX_AI Section 2.1 ("confirmed by a 2/3 vote of the CRP").
- ANNEX_L Section L2 defines CRP composition (11 members by sortition) and ANNEX_S defines anti-capture rules, but neither document confirms whether the CRP has been constituted.
- If the CRP is not constituted: the founding team must identify and resolve this bootstrap dependency before sub-Ombuds appointment can proceed. The founding team may need to review P-013 founding window mechanics (ANNEX_AH) for the bootstrap path.
- Action required: Founding team confirms CRP constitution status before beginning HGA-1 through HGA-7 in the readiness packet.

**OQ-2: Which specific organizations are designated as the five institutional-origin appointing bodies?**

- Source: ANNEX_AI Section 1.2 defines five classes: civil liberties organizations, academic institutions, federated trade/labour bodies, independent practitioner registries, faith or community-charter institutions.
- No specific organizations are named. The founding team must designate one per class.
- Publication of designations must occur before nominations begin.
- Action required: Founding team designates and publishes one appointing body per class.

**OQ-3: What are the minimum eligibility criteria for individual Sub-Ombuds Commissioner nominees?**

- Source: ANNEX_AI Section 2.1 specifies the appointment process but not minimum individual qualifications (years of experience, professional credentials, prior roles, etc.).
- If minimum criteria are not specified before nominations begin, nominees can be challenged on grounds not covered by any agreed standard.
- Action required: Founding team decides whether to specify minimum criteria, and if so, publishes them before sending nomination requests.

**OQ-4: What is "protocol genesis" for the 180-day fifth-seat deadline?**

- Source: ANNEX_AI Section 2.1 ("the fifth seat must be filled within 180 days of protocol genesis").
- "Protocol genesis" is not defined in the sections reviewed. Candidate interpretations: P-014 founding window opening; P-013 ACTIVE date; date of first real-persons enrollment.
- The answer determines when the 180-day fifth-seat clock starts.
- Action required: Founding team formally defines "protocol genesis" and publishes the definition before any sub-Ombuds is seated (so the clock start date is unambiguous).

**OQ-5: How are the initial sub-Ombuds terms staggered at founding?**

- Source: ANNEX_AI Section 2.1 -- ongoing staggering rule (seats 1, 3, 5 in odd years; seats 2, 4 in even years). This rule assumes a standing cycle. At founding, no cycle has run.
- The founding team must assign specific start and end dates to each seat to establish the stagger. This is a founding-time decision; the ongoing rule does not specify initial term lengths for the first cohort.
- Action required: Founding team assigns initial term dates for each seat, ensuring no more than two seats turn over in any single year across the first 730-day cycle.

**OQ-6: What is the CRP quorum rule for sub-Ombuds confirmation votes?**

- Source: ANNEX_AI Section 2.1 requires "a 2/3 vote of the CRP." ANNEX_L Section L2 states the CRP has 11 members. It is unclear whether "2/3" means 2/3 of the full panel (8 of 11) or 2/3 of a quorum. ANNEX_L and ANNEX_S do not specify a quorum rule for this specific vote.
- If the CRP has vacancies at the time of a confirmation vote, this affects whether 2/3 can be achieved.
- Action required: Founding team determines and publishes the quorum rule for sub-Ombuds confirmation votes before any vote proceeds.

**OQ-7: Who adjudicates challenges during the 60-day public challenge period before the Oversight Assembly is constituted?**

- Source: ANNEX_AI Section 2.1 specifies a 60-day public challenge period but does not name the challenge adjudication body for the founding-time constitution (when the Oversight Assembly may not yet exist). After founding, the Oversight Assembly holds this function (Section 5.1).
- Before the Oversight Assembly is constituted, who determines whether a challenge succeeds or fails?
- Action required: Founding team designates a challenge adjudication body or mechanism for the founding-time constitution process, and publishes this designation before challenge periods open.

**OQ-8: What are the per-node budget floor percentages?**

- Source: ANNEX_AI Section 2.2 -- "Floor percentages are set at founding and locked at Tier 1." No floor values are given in the corpus.
- Action required: Founding team determines the per-node floor percentage sufficient to staff all Section 4 mandate functions and publishes these values before any sub-Ombuds is seated.

---

## Completion Checklist

Use this checklist to determine whether the Federated Ombuds is actually constituted and Ombuds-dependent functions are operative. All items must be true before clearing the "Federated Ombuds seated" pre-launch blocking gate.

**Preconditions:**

- [ ] CRP is constituted and able to vote (OQ-1 resolved)
- [ ] Five appointing bodies designated and published (OQ-2 resolved)
- [ ] Minimum Commissioner eligibility criteria published, if any (OQ-3 resolved or waived)
- [ ] "Protocol genesis" date defined and published (OQ-4 resolved)
- [ ] Initial term stagger assignments published (OQ-5 resolved)
- [ ] CRP quorum rule for confirmation votes determined and published (OQ-6 resolved)
- [ ] Challenge adjudication body or mechanism designated and published (OQ-7 resolved)
- [ ] Per-node budget floor percentages set, locked at Tier 1, and published (OQ-8 resolved)
- [ ] Five structural-dispersal slots defined and published

**Appointment process (for each of the first four seats):**

- [ ] Formal nomination request sent to and received by each appointing body
- [ ] Nominee nominated by each appointing body (written nomination received)
- [ ] Conflict review checklist completed for each nominee (all items in Independence and Conflict Review section)
- [ ] Conflict disclosures published before CRP vote
- [ ] CRP confirmed each nominee by 2/3 vote with published rationale
- [ ] 60-day public challenge period completed with no disqualifying outcome for each nominee
- [ ] Challenge records published
- [ ] Seating confirmation issued for each Commissioner
- [ ] Inter-office protocol signed by each Commissioner

**Sub-node infrastructure (for each seated sub-node):**

- [ ] Independent budget floor line-item activated (Tier 1-locked)
- [ ] Independent infrastructure confirmed (publication channel, communication, record storage)
- [ ] Local access-authority mandate established (enforcement records, identity telemetry, supply data)

**Minimum operative threshold confirmed:**

- [ ] At least four Commissioners are seated, have signed the inter-office protocol, and are able to act
- [ ] Independence dispersal matrix confirms >= 4-of-5 Section 1.2 dimensions differ for each pair

**Post-seating publications:**

- [ ] Sub-Ombuds seat roster published
- [ ] Duty rotation schedule published for first 90 days (at least 14 days before first duty date)
- [ ] Manufactured-flag criteria published with 4-of-5 Plenum vote (at least 30 days before first determination)
- [ ] Article VII dashboard founding-event entries recorded

**Oversight Assembly (required before pre-launch gate can be certified as cleared):**

- [ ] Oversight Assembly constituted with at least 5 of 7 seats (ANNEX_AI Section 5.1)
- [ ] Initial dispersal and independence review conducted by Assembly and published
- [ ] Independence dispersal matrix countersigned by Assembly

**After Ombuds is operative -- Ombuds-dependent gate clearance:**

- [ ] FC-YT1 Ombuds review complete: written findings published through Article VII; signed by >= 4 sub-Ombuds; specific value (= 3) confirmed
- [ ] FC-YT2 Ombuds review complete: written findings published through Article VII; signed by >= 4 sub-Ombuds; specific value (= 90) confirmed
- [ ] AG4 written confirmation published: Ombuds confirms urgency bypass prohibition governs founding-window patch activations
- [ ] "Federated Ombuds seated" pre-launch blocking gate formally certified as cleared (requires Acceptance_Protocol process)

---

*This packet was prepared 2026-05-15. No source corpus files were modified in preparing this packet. All requirements are grounded in direct source text. The Federated Ombuds has not been constituted. No names, appointments, votes, or outcomes were invented. Gaps are labeled OWNER DECISION REQUIRED.*
