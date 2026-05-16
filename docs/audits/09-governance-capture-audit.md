# Governance Capture Audit

**Phase:** 2 — Adversarial Stress-Testing
**Date:** 2026-05-15
**Auditor:** Claude Code (automated corpus read; no source files modified)
**Scope version:** Corpus as of branch `claude/pedantic-spence-c4e730`

---

## Scope

This audit examines all named governance institutions in the Humane Constitution corpus for capture vulnerability. The central adversarial question for each institution: *how does a patient, well-resourced actor gain durable control of this body, and what fails first?*

Institutions examined:

- Federated Ombuds (5 sub-Ombuds, Duty rotation, Plenum, Oversight Assembly)
- Foundational Amendment Panel / Formal Acceptance Protocol (FAP)
- Community Review Panel (CRP)
- Constitutional Integrity Panel (CIP — P-051 / AM8)
- Keyholder Council (9-seat allocation)
- Adversarial Panel Member (founding-phase and ongoing Tier-1 attestation)
- Rapid Evidence Board / Regional Executive Body (REB)
- Oracle cohort / RCS accreditation
- Attestation body (Annex AS stake mechanism)
- Founding team
- Public Finance & Commons Revenue (PFCR) body
- Capital Steward (Founding Capital Framework)

---

## Method

For each institution the adversarial method asks:

1. **Target:** Which institution or process?
2. **Capture method:** How does the actor gain control?
3. **Current safeguard:** What is specified to stop this?
4. **Why the safeguard holds or fails:** Concrete analysis against corpus text.
5. **Likely beneficiary:** Who gains from capture?
6. **Likely harmed party:** Who loses?
7. **Minimal fix shape.**

Evidence basis: read-only grep and file inspection against the corpus. Findings cite specific annex sections and constitutional clauses. Uncertainty is marked UNCERTAIN where the corpus is silent or ambiguous.

---

## Institutional Map

| Institution | Source | Status | Primary function | Decision threshold |
|---|---|---|---|---|
| Federated Ombuds (5 sub-nodes) | ANNEX_AI | ACTIVE | Manufactured-flag, PCRP co-cert, enforcement appeals, attestation adjudication | 4-of-5 Plenum for protocol-level |
| Ombuds Oversight Assembly | ANNEX_AI §5 | ACTIVE | Annual dispersal certification, removal trigger | 5-of-7 supermajority |
| FAP / Formal Acceptance Protocol | ANNEX_AG | PROPOSED (P-013) | Activates patches PROPOSED→ACTIVE | Multi-authority sign-off |
| CRP (Community Review Panel) | ANNEX_AC | ACTIVE | Constitutional queue + 3-member rotating sub-panel (operational queue) | Full 11-member for Tier 1/2 |
| CIP (Constitutional Integrity Panel) | ANNEX_AM §AM8 | PROPOSED (P-018/AM8) | Concurrent Tier 1 ratification | 5-of-7 quorum |
| Keyholder Council | Founding_Team_Composition_Standard | Active — Governance | Tier 1 amendment (7-of-9), keyholder rotation | 7-of-9 for Tier 1 |
| Adversarial Panel Member | Acceptance_Protocol AH2.3 | ACTIVE (for P-014 gate) | Cryptographic attestation gate on all `modifies_tier1=True` proposals | Single-actor veto-lite |
| REB (Regional Executive Body) | ANNEX_AQ / ANNEX_AC | ACTIVE | 48-hour first-responder on oracle failure; PCRP joint activation | PCRP: joint action required |
| Oracle cohort / RCS | ANNEX_AL | ACTIVE | Capacity measurement; Shared Storehouse activation | N_MIN=5 BFT floor; FC-030/031/032/033 |
| Attestation body | ANNEX_AS | ACTIVE | Stake-based attestation integrity; false-claim adjudication | Ombuds adjudication |
| Founding team | Founding_Team_Composition_Standard | Active — Governance | Pre-activation construction and governance | Sunset-gated |
| Capital Steward | Founding_Capital_Framework | Active — Governance | Holds and disburses founding capital | Joint: Capital Steward + keyholder council |
| PFCR body | Humane_Constitution Art. V | ACTIVE (design) | Public finance flows, demurrage routing | UNCERTAIN — no specific governance body specification found |

---

## Capture Surface Map

The following diagram describes the dependency chain. Capture of any node propagates downstream.

```
Flow issuance authority
    └── CIP budget (0.01% of Flow — AM8.3)
            └── CIP ratification gate (Tier 1 amendments)

Founding team
    └── Adversarial panel nominating body selection
            └── Adversarial panel member appointment
                    └── Tier-1-touching proposal gate (AV1)
                    └── Tier 2 parameter review (supermajority + adversarial panel)
                    └── Keyholder nominating organization approval (FT-4)

Oracle cohort (RCS)
    └── CIP budget figure (AM8.3 oracle-independence requirement)
    └── Shared Storehouse activation authority
    └── PCRP confirmation/contradiction
    └── REB override check

Ombuds Oversight Assembly
    └── Sub-Ombuds dispersal certification
    └── Removal trigger for sub-Ombuds Commissioners
    └── CIP member removal (6-of-7 Ombuds Plenum — AM8.4)

CRP
    └── Sub-Ombuds Commissioner confirmation (2/3 vote — ANNEX_AI §2.1)
    └── FAP sign-off (one of four sign-off authorities)
    └── Constitutional queue (all Tier 1/2 matters)
```

Key observation: **the adversarial panel member is a single-actor bottleneck for all Tier-1-touching proposals** and for Tier 2 parameter changes. This is intentional (two-key architecture) but it means the nominating body for that panel member is a tier-zero capture target.

---

## Money and Donor Capture

### FC-2 Concentration Limits (Founding Capital Framework)

The corpus specifies 20% per-funder cap across phases and 30% per phase. The Capital Steward is selected via a process approved by the adversarial panel member, not by the founding team directly. The primacy clause (FC-4) is mandatory in every funding agreement, and FC-5 blocks government funders who condition on constitutional violations.

**Capture vector:** A funder near the 20% cap who subsequently funds adjacent organizations (academic partners, convening bodies, professional networks) used to nominate keyholder seats 3–8 creates indirect governance influence without triggering the 20% rule, which counts only direct capital. The corpus controls direct funder concentration but does not extend the look-through to funder-backed nominating organizations.

**Safeguard partial failure:** FT-4 in the Founding Team Composition Standard requires adversarial panel approval of nominating organizations and prohibits organizations with "undisclosed ties to the pilot's funders," but this relies on the adversarial panel member independently identifying those ties. If the adversarial panel member itself was nominated by an academic institution (qualifying under AH2.3(c)) that received funding from the same funder three years and one day ago (lookback is three years), the detection fails.

**Severity: High. DEFECT — partial.**

### CIP Budget — 0.01% of Flow Issuance (AM8.3)

The CIP budget is fixed at 0.01% of annual Flow issuance. AM8.3 specifies that the issuance figure must be drawn from the independent oracle measurement network (ANNEX_AL), not from the issuance authority's own accounts, and requires publication of both figures if divergence exceeds 2%. The higher figure governs for CIP budget purposes.

**Capture vector:** If the oracle cohort itself is degraded or selectively reporting (see Oracle section below), the "independent" figure may be lower than the true issuance figure, starving the CIP of operating capital without triggering a formal Tier 1 amendment. The 2% divergence threshold is the only published trip-wire; oracle errors below 2% that suppress CIP funding are invisible to this control.

**Secondary vector:** Even without oracle degradation, Flow issuance can contract (e.g., during a prolonged governance crisis that slows productive commitments). A CIP operating at an absolute floor during a legitimacy crisis is exactly when it most needs resources. The absolute floor (a Tier 2 founding commitment — AM8.3 last paragraph) partially addresses this, but the floor's adequacy depends on publishing a floor value before CIP activation — and the corpus says this must be done at founding (AM8.7), which creates a founding team capture point for the floor value itself.

**Severity: High. DEFECT.**

### Regulatory Coercion Channel (Founding Capital Framework FC-5 acknowledged gap)

The Founding Capital Framework explicitly acknowledges at its end that FC-5 blocks funding-conditioned interference but does not block regulatory coercion — a government agency can decline to fund while using zoning, health, or licensing authority to constrain constitutional choices. This is a named open risk, not an undiscovered defect.

**Severity: High. Acknowledged gap; no current mitigation in corpus. IMPROVEMENT needed.**

---

## Vendor and Infrastructure Capture

### Oracle Infrastructure Concentration (ANNEX_AL)

The oracle methodology-class rules (FC-030/031/032/033) require at least 5 nodes with at least 3 distinct methodology classes. ANNEX_AL §4 requires a standards-body concentration review when 3 or more nodes use the same standards body. ANNEX_AL §4.2 requires AI/ML infrastructure concentration review.

**Capture vector:** An actor who controls a dominant standards body (e.g., a government metrology agency or a dominant credentialing organization) can gradually become the standards-body anchor for multiple oracle nodes across different methodology classes. Two nodes from different institutions using the same standards body still count as different methodology classes under AL §1.4. Three nodes trigger a review — but the review body is "a panel independent of the RCS accreditation body — drawn from methodology specialists with no affiliation with any of the concentrated standards bodies." The corpus does not specify who appoints this review panel or how its own independence is verified. This is a bootstrap problem for the review layer itself.

**Safeguard partial failure:** The adversarial oracle seat (FC-033) is a compensating control: it must be selected and compensated under a separate procurement track. But if the adversarial seat's mandate is "to find reasons the cohort's consensus reading might be wrong" and the adversarial seat holder shares the same standards-body affiliation (possible since methodology class differs from standards-body affiliation), the adversarial seat provides dissent on interpretation, not on data sourcing.

**Severity: Medium-High. DEFECT — partial.**

### Oracle Monitoring Infrastructure (ANNEX_AQ §1)

Conservative Hold activates automatically when oracle quorum is lost. "The body responsible for the oracle monitoring system (named in ANNEX_AL §3)" holds formal authority to declare Conservative Hold. UNCERTAIN: ANNEX_AL §3 names the accreditation body but the corpus does not clearly specify the monitoring system's governance structure or who appoints it. If the monitoring body is the same as or closely affiliated with the issuance authority, it can delay quorum-loss declaration, extending the window in which the REB (rather than the oracle) makes Shared Storehouse decisions.

**Severity: Medium. UNCERTAIN — corpus gap.**

### Capital Steward Selection

FC-3 requires the Capital Steward to be selected by "a process approved by the adversarial panel member named in the Founding Legitimacy Dossier." This is a significant structural improvement over founding-team self-selection. However, the adversarial panel member's own qualifying criteria (AH2.3) permit nomination by an independent academic institution with a three-year lookback on funding relationships. Large philanthropic donors who fund multiple universities can effectively nominate the adversarial panel through a sufficiently separated academic institution, then influence Capital Steward selection.

**Severity: Medium. DEFECT — speculative but structurally present.**

---

## Credential and Expert Capture

### FAP Audit Independence — Intellectual Cousin Exploit (ANNEX_AG §AG3)

ANNEX_AG §AG3 extends the audit independence rule to prohibit institutional affiliation or published co-authorship within 4 years, requires domain-diversity (primary professional formation in a different domain), and mandates an adversarial audit member for Impact-5 patches. Status of ANNEX_AG: PROPOSED (P-013).

**Capture vector:** Until P-013 is ACTIVE, the audit independence rule is governed by the prior, weaker standard ("must not be a member of the team that designed the patch"). The bootstrapping problem documented in T-017 means that activating P-013 requires the unhardened FAP — creating a window during which the sign-off cluster and audit team can be populated with intellectual cousins under the prior standard. This is explicitly acknowledged in the Threat Register (T-017).

**AG3 adversarial member gap:** AG3 requires one adversarial audit member for Impact-5 patches but does not specify who nominates or selects this adversarial member. The audit team lead, who is selected under the existing FAP process (itself uncaptured or captured), makes the hire. A captured FAP reviewer can select an adversarial member who is adversarial in credential only — e.g., a professional who once published a critical paper but has since pivoted to supporting similar mechanisms. The corpus relies on "demonstrated adversarial professional background" without specifying a verification process or who independently confirms that background.

**Severity: High. DEFECT (pre-P-013-activation window) + partial gap post-activation.**

### CRP Qualification Standards (ANNEX_AC §AC3.6)

The criteria for CRP systems reviewer seats are added to P-004 protected terms (Class H-1). Any change requires 40% membership from contribution backgrounds classified as non-qualifying under the prior standard. This is a sound circular-exclusion defense. However, the *initial* qualification standard is set by the founding coalition before this protection applies. If the founding team defines "demonstrated competence" narrowly (e.g., "formal governance or legal training"), it embeds a professional-class bias that the 40% rule then locks in.

**Severity: Medium. DEFECT — founding window only; post-activation protected.**

### Oversight Assembly Qualification Review (ANNEX_AI §5.1, lot-drawn seat)

One of seven Oversight Assembly seats is lot-drawn from citizens who have passed "a published qualification review." The corpus does not specify who designs or administers this qualification review. If the qualification review is designed by the current CRP or founding coalition, it can filter the citizen lottery pool toward sympathetic participants.

**Severity: Medium. DEFECT.**

---

## Appointment and Agenda Capture

### Sub-Ombuds Commissioner Appointment (ANNEX_AI §2.1)

Appointment mechanism: nominated by the sub-node's assigned appointing body (per §1.2 institutional-origin class); confirmed by a 2/3 vote of the CRP; 60-day public challenge. Staggered terms (730 days, FC-092), max two consecutive terms, then one-term cooling-off.

**Capture vector 1 — Appointing body degradation:** Each sub-Ombuds has an appointing body from a distinct institutional class (civil liberties, academic, federated trade/labour, independent practitioner registry, faith or community-charter institutions). The §1.2 separation requirement says "no two sub-Ombuds share an appointing-body class." But if an actor gradually captures one appointing-body class (e.g., by dominating the landscape of civil-liberties organizations through funding or leadership), they can replace one sub-Ombuds at term end with a sympathetic commissioner. They cannot capture a second sub-Ombuds without moving to a different class — which is difficult. One captured sub-Ombuds cannot alone break the 4-of-5 threshold. This design is structurally sound for single-node capture.

**Capture vector 2 — CRP confirmation bottleneck:** Confirmation requires a 2/3 CRP vote. A controlling faction on the CRP (which itself faces its own capture risk — see below) can block appointment of nominees it dislikes, leaving a seat unfilled. Per ANNEX_AI §2.1 pre-launch gate, at most one of the five seats may remain unfilled (180-day fill window). But protracted unfill of the fifth seat (180+ days) could mean the full BFT threshold is temporarily unavailable, with protocol-level decisions requiring 4-of-4 unanimous instead of 4-of-5.

**Severity: Medium-High on vector 2. DEFECT — CRP appointment bottleneck.**

### CIP Member Appointment (ANNEX_AM §AM8.1)

CIP has 7 members. No more than 2 may be appointed by any single branch of government. At least 2 must be appointed by "bodies structurally independent of the current governing coalition — eligible appointing bodies include: prior-cycle ombudspersons, accredited academic constitutional law bodies, or civil society appointment processes ratified by the Federated Ombuds Plenum."

**Capture vector:** The phrase "ratified by the Federated Ombuds Plenum" for civil society appointment processes creates an Ombuds dependency for CIP appointments. If the Ombuds Plenum is partially captured (one sub-Ombuds compromised, but 4-of-5 still function normally for protocol-level matters), it cannot unilaterally block a CIP appointment ratification — the 4-of-5 threshold protects against single-node capture here. However, the initial CIP appointments (before the Ombuds Plenum is operational) depend on the founding coalition's process per AM8.7 activation gate: "CIP cannot be constituted until the Founding Order's first post-activation audit is complete." UNCERTAIN: who conducts this post-activation audit and who verifies its completion?

**Severity: Medium. DEFECT — founding activation gap.**

### Keyholder Council — Adversarial Panel Seat (Founding_Team_Composition_Standard §FT-3 Seat 5)

Seat 5 is "nominated by the adversarial panel defined in the Founding Legitimacy Dossier." The adversarial panel member (singular) who gates Tier 1 proposals is also the nominator for one of nine constitutional keyholder seats. This conflates two roles: the ongoing oversight role and the one-time appointment role for a Tier 1 decision-making seat. If the adversarial panel member is successfully captured (or simply has a preferred candidate), Seat 5 is no longer adversarial in practice.

**Severity: High. DEFECT — role conflation.**

### FAP Nominating Organization Approval Bottleneck (FT-4)

Nominating organizations for keyholder seats 3–8 "may not be selected by the founding team alone. Each selection must be approved by the adversarial panel member." This creates an adversarial panel single-point veto over all six nominated keyholder seats. If the adversarial panel member is conflicted, unavailable, or acting in bad faith, the entire nominated keyholder slate can be blocked or steered. There is no backup approval pathway specified if the adversarial panel member is unavailable or recused.

**Severity: High. DEFECT — no fallback for adversarial panel unavailability.**

### Agenda Setting — Randomization Claim (Constitution Art. VI)

The constitution mentions "randomization in agenda-setting" as one of the patches addressing civic-layer capture by professional contributors. However, no specific implementation of randomization in agenda-setting is defined in the corpus (UNCERTAIN — not located in ANNEX_AC or ANNEX_AI). If randomization is not operationally specified, the CRP queue priority scoring (impact × urgency × reversibility) is the effective agenda-setting mechanism, and the entities who can credibly inflate urgency scores (government bodies, large institutional actors) have structural agenda priority.

**Severity: Medium. UNCERTAIN — corpus gap on randomization implementation.**

---

## Audit and Standards Capture

### Oracle Standards-Body Concentration (ANNEX_AL §4.1)

If 3 or more oracle nodes use the same standards body, an independent methodological review is required. The review is conducted by a panel "independent of the RCS accreditation body — drawn from methodology specialists with no affiliation with any of the concentrated standards bodies." The corpus does not specify who appoints this review panel or where its composition rules are set.

**Severity: Medium. DEFECT — review panel appointment unspecified.**

### Methodology Class Registry (ANNEX_AL §5)

The methodology-class registry is the canonical list of what counts as a distinct class. It is governed as a P-004 protected term with its own audit requirement (annual audit by a panel with no oracle-operator members). But the founding publication of the registry is a "pre-launch gate" — published by the founding coalition before the audit apparatus is active. If the founding coalition defines classes too broadly at genesis, structurally correlated oracles may appear distinct.

**Severity: Medium. DEFECT — founding genesis window.**

### ANNEX_AG Status — Anti-Gaming Rules Not Yet Active

The entire AG-series (pilot representativeness, deadlock resolution timeline, audit epistemic independence, anti-gaming Tier 2 reclassification) is in PROPOSED status (P-013). The Threat Register explicitly notes that until P-013 is ACTIVE, the FAP is governed by the weaker prior standard. This is the corpus's most structurally exposed pre-activation surface. Activating P-013 requires the very FAP process whose protections are not yet operative.

**Severity: Critical. DEFECT — pre-activation structural gap; T-017 bootstrap problem.**

### Cohort Cooling — Concentration Dashboard Auto-Escalation (ANNEX_AC §AC3.5)

Cohort cooling is established (no more than 2 members of the same 12-month governance cohort in overlapping review roles). Concentration detection relies on the Federated Ombuds maintaining the cohort registry. If the Ombuds is slow to update the registry, or if an actor cycles through roles in periods just outside the 12-month window, cohort cooling can be technically satisfied while substantive network concentration persists.

**Severity: Medium-Low. IMPROVEMENT — detection latency gap.**

---

## Bureaucratic Delay as Capture

### FAP Throughput — ANNEX_AG AG-LATENCY

The AG-LATENCY section of ANNEX_AG creates maximum review periods by urgency class (72 hours for E1, 7 days for E2, 30 days for E3). However, ANNEX_AG is PROPOSED. Until it is active, there is no binding maximum FAP review period. A factional CRP or sign-off cluster can delay a threat-closing patch indefinitely under the current corpus by simply not scheduling a review meeting. The Threat Register notes this as a T-016 × T-005 interface problem.

**Severity: High. DEFECT — ANNEX_AG not yet operative.**

### CRP Operational Queue — 3-Member Sub-Panel Rotation (ANNEX_AC §AC1.1)

The operational queue uses a 3-member sub-panel rotating quarterly; no member may sit on the same queue in consecutive quarters. Maximum SLA is 7 days. However, "operational queue items" are strictly Tier 3 items that do not materially burden rights. Constitutional queue items — where delay is most dangerous — have no published SLA in the corpus.

**Severity: Medium. DEFECT — no SLA on constitutional queue.**

### P-013 Indefinite Queue Hold (Acceptance_Protocol §AV1)

If no adversarial panel member is seated, "no Tier-1-touching proposals may enter the FAP queue — the queue position is held open indefinitely." This is intended as a safety gate. But indefinite hold also means a coalition hostile to constitutional evolution can arrange for no qualifying nominating body to be identified, freezing all Tier 1 amendments. The corpus says "if no qualifying nominating body can be identified, the founding process may not proceed" — but this applies to founding, not to ongoing operation. The ongoing analog (no panel member seated = queue frozen) creates a capture path through inaction: a hostile actor who can suppress qualifying opposition bodies (via regulatory pressure, funding starvation, or legal harassment of civil liberties organizations) can freeze all Tier 1 amendments.

**Severity: High. DEFECT — frozen-queue capture path.**

### AM4 — 180-Day Transition Audit Window

AM4 requires a mandatory 180-day transition audit before any Tier 2 or Tier 1 changes when a new governing coalition takes office. This is a deliberate feature, not a bug, but it creates a structural delay capture path: a hostile government could simultaneously (a) hold up the transition audit through procedural challenges, and (b) use the 180-day window to unfill founding institution seats (triggering AM3 automatic review, which then competes with the transition audit for CIP attention). The corpus does not specify a resolution pathway if the AM4 transition audit and AM3 unfill triggers fire simultaneously.

**Severity: Medium. DEFECT — simultaneous-trigger gap (ANNEX_AM is PROPOSED).**

---

## Findings Table

| ID | Type | Severity | Confidence | File | Section | Capture Target | Capture Method | Safeguard | Safeguard Failure | Summary |
|---|---|---|---|---|---|---|---|---|---|---|
| GCA-01 | DEFECT | Critical | High | ANNEX_AG; Acceptance_Protocol | AG entire annex; AV1 | FAP / Tier 1 amendment process | Populate sign-off cluster with intellectual cousins before P-013 activates | AG3 adversarial audit member requirement | PROPOSED — not operative. Prior weaker standard applies during activation window. | P-013 bootstrap gap: FAP capture is easiest before anti-capture rules are active. All AG protections are PROPOSED. |
| GCA-02 | DEFECT | High | High | Acceptance_Protocol | AH2.3; INVARIANTS §AV1 | Adversarial panel member nomination | Fund academic institution nominated as qualifying body 3+ years prior; nominating body selects sympathetic adversarial member | Three-year lookback on funding relationship (AH2.3(c)) | Three-year window is a timing gate, not a relationship gate. Indirect funding through related entities may not be caught. | Single-actor bottleneck for all Tier 1 proposals; nominating body is tier-zero capture target. |
| GCA-03 | DEFECT | High | High | ANNEX_AM | AM8.3 | CIP budget | Suppress oracle-measured issuance figure by degrading oracle cohort (correlated failure below 2% threshold) | Oracle-independence requirement; 2% divergence trigger | Sub-2% oracle degradation is invisible to this control. Absolute floor helps but floor value is set by founding coalition. | CIP funding depends on oracle network integrity; oracle capture indirectly starves CIP. |
| GCA-04 | DEFECT | High | High | Founding_Team_Composition_Standard | FT-3 Seat 5; FT-4 | Keyholder council composition | Capture adversarial panel member role; use Seat 5 nomination + nominating-org approval authority to steer all 6 nominated seats | Adversarial panel approval of nominating orgs; public disclosure | No fallback if adversarial panel member is captured, conflicted, or unavailable. Single actor gates 7 of 9 keyholder seats (Seat 5 nomination + 6 nominating-org approvals). | Role conflation: adversarial panel member is simultaneously constitutional overseer and keyholder kingmaker. |
| GCA-05 | DEFECT | High | High | ANNEX_AG | AG-LATENCY | FAP throughput | Delay patch activation indefinitely through procedural non-scheduling | AG-LATENCY maximum review periods | PROPOSED — not operative. No binding SLA on FAP review under current corpus. | Bureaucratic delay is a valid capture tool pre-P-013 activation. |
| GCA-06 | DEFECT | High | Medium | Acceptance_Protocol | AV1 | Tier 1 amendment queue | Suppress qualifying opposition bodies (regulatory pressure, funding starvation) to prevent adversarial panel seating; freeze all Tier 1 amendments | Qualifying nominating body pre-condition | Corpus requires qualifying body for founding only. Ongoing frozen-queue path is not fully addressed. | Hostile actor can freeze all Tier 1 amendments by ensuring no qualifying nominating body remains viable. |
| GCA-07 | DEFECT | High | Medium | Founding_Capital_Framework | FC-2; FC-3; FC-5 | Founding capital governance | Indirect governance capture: fund academic/civil-society networks used as nominating organizations near-but-below 20% direct cap | 20% per-funder cap; constitutional primacy clause; FC-5 walk-away rule | FC-2 counts direct capital only; does not look through to funder-backed nominating organizations. | 20% rule does not prevent influence through funder-backed institutional networks used to nominate keyholders. |
| GCA-08 | DEFECT | Medium-High | High | ANNEX_AI | §2.1 (CRP confirmation gate) | Sub-Ombuds appointment | CRP faction blocks confirmation of nominees by repeated 2/3 vote failure | 730-day staggered terms; pre-launch gate (4-of-5) | CRP can starve the fifth sub-Ombuds seat. 180-day fill window: if CRP refuses, AM3 unfill trigger activates but resolution is itself CRP-dependent. | CRP is confirmation bottleneck for Ombuds. CRP capture → Ombuds seat starvation. |
| GCA-09 | DEFECT | Medium-High | High | ANNEX_AL | §3; §4.1 | Oracle methodology standards | Actor controls dominant standards body; gradually becomes standards-body anchor for 3+ oracle nodes | 3-node concentration trigger; independent methodological review | Review panel appointment unspecified in corpus. Review panel is itself potentially appointer-captured. | Oracle standards-body capture: who appoints the panel that reviews standards concentration? |
| GCA-10 | DEFECT | Medium | High | ANNEX_AM | AM8.1 | CIP initial appointment | Founding coalition sets initial CIP terms (3/4/5-year first cohort) before Ombuds Plenum is operational | Staggered terms; Ombuds Plenum ratification of civil society appointing processes | AM8.7 activation gate depends on "founding order's first post-activation audit" — who conducts this audit is UNCERTAIN. | CIP founding appointment window is outside full constitutional oversight. |
| GCA-11 | DEFECT | Medium | High | ANNEX_AI | §5.1 (lot-drawn seat) | Oversight Assembly lot-drawn citizen seat | Design qualification review to filter citizen pool toward sympathetic participants | Published qualification review (corpus requires publication; does not specify authorship) | Corpus does not specify who designs or administers the qualification review for the lot-drawn Assembly seat. | Whoever controls the Oversight Assembly qualification review controls effective eligibility of the citizen seat. |
| GCA-12 | DEFECT | Medium | Medium | Humane_Constitution; ANNEX_AC | Art. VI; AC2.1 | CRP agenda priority | Systematically inflate urgency scores for preferred items through large institutional actors who control urgency signals | Priority scoring: impact × urgency × reversibility; Voice-weighted urgency signals explicitly excluded | "Voice-weighted urgency preference signals may inform urgency scoring but may not override" — but institutional actors can provide non-Voice urgency signals (e.g., government declarations, media framing). | Urgency-signal inflation by institutional actors could systematically prioritize preferred agenda items in CRP queue. |
| GCA-13 | DEFECT | Medium | Low-Med | ANNEX_AM | AM4; AM3 | Transition audit period | Simultaneously trigger AM4 transition audit and AM3 unfill events to overload CIP; use 180-day window to hollow institutions | AM3 automatic review; AM4 transition audit | Corpus does not specify resolution pathway when AM4 and multiple AM3 triggers fire simultaneously. ANNEX_AM is PROPOSED. | Simultaneous-trigger attack: transition audit + institution-seat starvation could exceed CIP review capacity. |
| GCA-14 | IMPROVEMENT | High | High | Founding_Capital_Framework | FC-5 (acknowledged gap) | All institutions | Regulatory coercion via zoning, health, licensing that constrains constitutional choices without triggering funding walk-away rule | FC-5 walk-away rule (funding-conditioned interference only) | FC-5 explicitly acknowledged as not covering regulatory coercion. No current corpus mitigation. | Named open risk: government can coerce via regulatory authority without triggering any corpus safeguard. |
| GCA-15 | DEFECT | Medium | Medium | ANNEX_AC | AC1.1 | CRP constitutional queue | Delay constitutional queue items without SLA | 7-day SLA on operational queue | Constitutional queue has no published SLA. Operational-queue floor of 5 items per quarter does not apply to constitutional queue. | Constitutional queue delay is structurally permissible under current corpus. |

---

## Recommendations for Phase 3

The following recommendations are ordered by severity. Phase 3 verification should confirm whether each is addressed by a known PROPOSED patch not yet captured in this analysis, or remains a genuine gap.

**R-01 — FAP bootstrap window (GCA-01, GCA-05):** Priority: Critical. The interval between now and P-013 activation is the most exposed capture surface in the entire corpus. Phase 3 should verify the current FAP sign-off cluster composition for intellectual-cousin concentration under the pre-AG3 standard. If FAP has been used since the corpus was designed, the sign-off cluster should be audited for AG7 concentration conditions (co-service cohort, epistemic diversity) as a precautionary measure.

**R-02 — Adversarial panel nominating body governance (GCA-02, GCA-04, GCA-06):** Priority: High. The adversarial panel member is a single-point bottleneck for Tier 1 proposals, keyholder Seat 5 nomination, and nominating-org approval for all 6 remaining nominated keyholder seats. The corpus should specify (a) a fallback nomination pathway if no qualifying nominating body is available, (b) a recusal/replacement protocol if the adversarial panel member is conflicted, and (c) separation of the Seat 5 nomination function from the ongoing Tier 1 attestation function. Recommending specification in a PROPOSED patch (plausibly P-060 or a new P-061).

**R-03 — CIP absolute floor and founding-coalition founding window (GCA-03, GCA-10):** Priority: High. The founding coalition sets the CIP absolute floor value (AM8.3) and the initial CIP term structure (AM8.2) before the CIP and most other oversight bodies are operational. Phase 3 should verify that (a) the floor value has been published with justification, (b) the post-activation audit that gates CIP constitution (AM8.7) has a named independent auditor, and (c) the initial CIP term schedule satisfies staggering requirements.

**R-04 — Oracle standards-body review panel appointment (GCA-09):** Priority: Medium-High. ANNEX_AL §4.1 requires an independent review panel for standards-body concentration but does not specify who appoints it. This should be specified — the Federated Ombuds Plenum is the most structurally appropriate appointing body.

**R-05 — Oversight Assembly lot-drawn seat qualification review (GCA-11):** Priority: Medium. Specify in ANNEX_AI §5.1 that the qualification review for the lot-drawn citizen seat is designed and administered by the Oversight Assembly itself (after initial constitution) or by the Federated Ombuds Plenum during the initial founding period, with the design process publicly documented before any lottery is held.

**R-06 — CRP constitutional queue SLA (GCA-15):** Priority: Medium. ANNEX_AC §AC1.1 should be extended to include a maximum SLA for constitutional queue items — perhaps 90 days for standard matters, 30 days for emergency-classified matters.

**R-07 — Regulatory coercion mitigation path (GCA-14):** Priority: Medium. The acknowledged FC-5 gap should have a designated response protocol — at minimum, a mechanism by which the keyholder council can publicly document regulatory coercion attempts and seek inter-jurisdictional constitutional support.

**R-08 — Simultaneous-trigger protocol (GCA-13):** Priority: Medium (contingent on ANNEX_AM activation). Before ANNEX_AM is activated, specify priority ordering when AM3 unfill triggers and AM4 transition audit fire simultaneously. AM3 should probably suspend the AM4 review clock for affected institutions until seats are filled.

**R-09 — CRP confirmation fallback for Ombuds (GCA-08):** Priority: Medium. If a CRP 2/3 majority cannot confirm a sub-Ombuds nominee within 90 days, specify a fallback confirming body (e.g., the Oversight Assembly) to prevent CRP-bloc capture from starving Ombuds seats.

**R-10 — Funder look-through for nominating organizations (GCA-07):** Priority: Medium. Extend FC-2 concentration analysis to include indirect concentration: if a funder accounts for more than 20% of the operating budget of any organization used to nominate a keyholder, that funder's indirect governance influence should be disclosed and subject to the same concentration rules.

---

## Self-Review

| Dimension | Score (1–5) | Notes |
|---|---|---|
| Coverage | 4 | All 13 named institutions examined. PFCR governance body is sparsely specified in corpus (no dedicated governance annex found); coverage is limited to what corpus provides. REB internal governance rules not fully read (ANNEX_AQ not read fully). |
| Specificity | 4 | Most findings cite specific annex section and mechanism. GCA-06 (frozen queue via opposition suppression) and GCA-13 (simultaneous trigger) are more speculative; marked Medium confidence. |
| Evidence | 4 | All findings are grounded in direct corpus text. No findings invented without citation. UNCERTAIN flags used for 2 corpus gaps (oracle monitoring governance, CIP activation audit). |
| Adversarial Depth | 4 | Method applied consistently: for each institution, asked who benefits from capture and what chain of actions achieves it. Dependency chain traced from founding team → adversarial panel → keyholder seats. CIP budget → oracle integrity chain traced. Bootstrap problem for P-013 explicitly flagged. |
| Actionability | 4 | 10 recommendations with priority ordering and suggested resolution bodies. R-01 and R-02 are immediately actionable. Some (R-07, R-08) are contingent on PROPOSED patches activating. |
| Overall | 4 | Solid Phase 2 adversarial pass. Primary limitations: (1) PFCR governance body lacks sufficient corpus specification to audit meaningfully; (2) ANNEX_AQ REB internal governance not fully read; (3) no access to founding commitments.md for oracle-floor values. Phase 3 should address the bootstrap window (GCA-01) before any other finding. |

**No scores below 4. No Repair Pass required.**

---

*Audit file written: `docs/audits/09-governance-capture-audit.md`*
*Source files modified: none.*
*Generated: 2026-05-15 by automated corpus auditor.*
