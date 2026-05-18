# Acceptance Protocol and Testability Audit

**Phase 3 — Report 1**
**Audit date:** 2026-05-15
**Auditor role:** Adversarial — assume a sophisticated actor is attempting to game every test
**Status of primary subject:** `docs/constitution/Acceptance_Protocol.md` is ACTIVE (P-013 ACTIVE per AH8 linkage table, S5); ANNEX_AG is PROPOSED

---

## Scope

This report audits whether the acceptance criteria in the corpus can actually detect the eleven known confirmed vulnerabilities identified in Phase 2. The primary inputs are:

- `docs/constitution/Acceptance_Protocol.md` — the operative Formal Acceptance Protocol (FAP)
- `docs/annexes/ANNEX_AG.md` — FAP anti-gaming clauses (status: PROPOSED — not yet operative)
- `docs/annexes/ANNEX_AH.md` — founding bootstrap resolution (status: ACTIVE)
- `docs/annexes/ANNEX_AM.md` §AM3, §AM8 — administrative hollowing triggers, CIP composition

The audit answers four questions per vulnerability:
1. Is there an acceptance test that would catch it?
2. Can the test be gamed by a sophisticated actor?
3. Does the test detect documentation drift versus behavioral drift?
4. Does a failed test block anything (launch, enrollment, amendment, ratification)?

---

## Method

1. Read the full Acceptance Protocol and all referenced annexes in scope.
2. For each of the eleven Phase 2 confirmed vulnerabilities, locate any acceptance test, gate, or trigger condition that should catch it.
3. Determine whether that test has: a defined evidence input, a binary pass/fail condition, an enforcement consequence, a named reviewer, and a recurrence schedule.
4. Where no test exists, classify the gap as DEFECT. Where a test exists but is gameable, classify as DEFECT or IMPROVEMENT depending on severity.
5. Apply the Buterin payoff-matrix test: does the test create conditions where gaming is cheaper than compliance?

Source citations use document name + section. Line numbers are provided where the text is precise enough to require them.

---

## Acceptance Criteria Inventory

The Acceptance Protocol (`docs/constitution/Acceptance_Protocol.md`) contains the following operative acceptance mechanisms:

### Category 1 — Pre-Launch Blocking Gates (ACTIVE)

The Acceptance Protocol §Pre-Launch Blocking Gates table lists thirteen hard gates. Each gate has:
- A named required condition
- A named requiring authority
- A named annex reference

**What the gates cover:** Ombuds seating, oracle methodology registry, AED founding commitments, contract parameter values, P-014 founding window, Founding Legitimacy Dossier, evidence ladder updates, implementation drift audit, capture dashboard baseline.

**What the gates lack:**
- No pass/fail criterion defined within the Acceptance Protocol itself — each gate defers to a named annex
- No specified reviewer for gate clearance decisions — "complete" is the stated condition but who determines completeness is not specified in the gate table
- No stated consequence for falsely certifying a gate as complete other than the general constitutional framework
- No recurrence schedule — gates appear designed as one-time pre-launch checks, not recurring behavioral audits

### Category 2 — Founding Window Requirements (ACTIVE via AH2)

AH2.1–AH2.4 establish a 60-day challenge window with specific procedural inputs: circular dependency analysis, founding exception statement, panel composition disclosure, and the Founding Legitimacy Dossier.

**Evidence inputs:** three documents and a panel list.
**Pass condition:** 60 days elapsed with no unresolved structural objections.
**Fail condition:** a structural objection that identifies a specific P-013 standard not met.
**Blocking consequence:** the 60-day window extends 14 days (non-cumulative) per unresolved structural objection.

**Gameable via:** AH2.2 defines a "structural objection" as one that "identifies a specific P-013 standard not met by the P-014 process." A founding coalition that drafts P-014 vaguely enough that no P-013 standard is identified can classify all objections as "procedural" and proceed without extending the window. The classification authority for "procedural vs. structural" is not specified.

### Category 3 — Tier 1 Two-Key Gate (ACTIVE via P-034/AV)

AV1–AV6 require cryptographic attestation from the adversarial panel member before any `modifies_tier1=True` proposal enters FAP intake.

**Evidence inputs:** signed attestation with specific invariant IDs.
**Pass condition:** valid attestation present at intake.
**Fail condition:** no attestation — proposal returned as incomplete.
**Blocking consequence:** intake does not open; no queue position created.

This is the strongest gate in the protocol: binary, attestation-based, not self-certifiable.

### Category 4 — FAP Anti-Gaming Provisions (PROPOSED — NOT OPERATIVE)

ANNEX_AG is explicitly marked `Status: PROPOSED`. Every clause in ANNEX_AG — including AG1 pilot representativeness standards, AG3 adversarial auditor requirements, AG4 urgency bypass prohibition reclassification, AG5 stagnation documentation quality, AG7 FAP concentration controls — is not operative.

This is the central finding of this audit: **the entire substantive anti-gaming layer of the acceptance protocol is PROPOSED, not ACTIVE**.

---

## Launch-Blocking Test Gaps

### Gap 1 — ANNEX_AG is PROPOSED: No Active Pilot Representativeness Standard

**Vulnerability:** P2 finding "founding-window exposure" — no active pilot representativeness standards.

**What the Acceptance Protocol says:** The Priority Acceptance Order table (§Priority Acceptance Order) lists P-019 (Pilot External Validity) as Priority 13 with gate condition "scale-up gate only; not required for initial pilot." P-013 (FAP Integrity) is listed as ACTIVE in AH8.

**What is missing:** AG1 pilot representativeness standard (the four-dimension favorable-bias assessment) is in ANNEX_AG which is PROPOSED. There is no active acceptance test that would flag a cherry-picked pilot region as non-compliant. The Acceptance Protocol's pre-launch gates do not include a pilot representativeness check.

**Test that should exist but does not:**
- Input evidence: regional demographic, institutional-trust, fraud-pressure, and infrastructure data versus national medians
- Pass condition: pilot region not flagged as favorable on more than one dimension; or second stress-tested region designated
- Fail condition: single-favorable region plus no stress-tested region
- Consequence: pilot evidence classified as PILOT only, not sufficient for ACTIVE
- Currently: no such test exists in any ACTIVE document

**Sophisticated gaming path:** Choose a pilot region that scores favorably on institutional trust and below-median on fraud pressure, submit it as a representative pilot, and the corpus has no active mechanism to flag the selection as biased. The foundational evidence base for all subsequent patch activations is built on unaudited ground.

### Gap 2 — CIP Removal Impossibility Has No Acceptance Test

**Vulnerability:** P2-LH-011 — ANNEX_AM §AM8.4 requires "6-of-7 vote of the Federated Ombuds Plenum" but the Plenum has five members (ANNEX_AI §1.3: "the five sub-Ombuds together"). 6-of-7 on a 5-member body is mathematically impossible.

**What the Acceptance Protocol says:** The pre-launch gate table includes "Federated Ombuds seated" as a blocking gate (requiring "at least four of five sub-Ombuds appointed, challenge periods closed, and seats active"). It does not include a gate that validates internal consistency of the Ombuds-dependent removal rules.

**What is missing:** No acceptance test checks that the CIP removal threshold is achievable given the Plenum size. A founding team could clear the Ombuds seating gate — four of five sub-Ombuds seated — and the corpus would show as cleared even though the CIP removal mechanism is permanently broken.

**Test that should exist but does not:**
- Input evidence: published AM8.4 removal threshold and AI§1 Plenum size
- Pass condition: removal threshold ≤ Plenum size (and achievable with the quorum structure)
- Fail condition: removal threshold > Plenum size
- Consequence: gate does not clear; corpus is inconsistent; ANNEX_AM cannot be activated
- Currently: no such cross-reference test exists

**Note:** This is a textual defect that no behavioral test can fix — the corpus is internally inconsistent. But the acceptance protocol could have an intake-consistency check that would surface it before any operational consequence.

### Gap 3 — No Active Adversarial Auditor Requirement

**Vulnerability:** P2 finding "founding-window exposure" — no active adversarial auditor requirement for critical patches.

**AG3** (ANNEX_AG §AG3) requires an adversarial audit member for patches with Impact score = 5. ANNEX_AG is PROPOSED. The current operative acceptance process has no adversarial auditor requirement.

**What the Acceptance Protocol says:** AH3 (the founding panel) requires one member with "a documented professional history of arguing against process-hardening mechanisms." This applies only to P-014 — the founding panel for activating P-013. It does not apply to any subsequent patch review.

**Gaming path:** A critical patch (Impact = 5) is submitted for FAP review. The audit team is staffed with domain-aligned professionals who share epistemological assumptions with the designers. The intellectual-cousin problem (T-016) is the exact threat P-013/AG was designed to close — but P-013's anti-gaming provisions (AG3) are PROPOSED while P-013 itself is ACTIVE. P-013 ACTIVE status means FAP is operative, but the AG clauses hardening FAP are not.

---

## Enforcement-Linked Test Gaps

### Gap 4 — Detection Without Enforcement: Oracle Breach

**Vulnerability:** P2-AI-005 — no mandatory AI supply chain disclosure during oracle accreditation; FC-032 pairwise correlation does not detect shared AI training provenance.

**What the Acceptance Protocol says:** The pre-launch gate "Methodology-class registry published" (requiring P-017) and "Standards-body concentration tracking built" (requiring ANNEX_AL §4) are listed as blocking gates.

**The enforcement gap:** ANNEX_AL §4 tracks standards-body affiliations. It does not require disclosure of AI system provenance, training data sources, or upstream vendor dependencies. FC-032 = 0.30 pairwise correlation detects statistical correlation. It does not detect directional bias from shared training data if the measurement approaches differ enough that correlation is below 0.30. As stated in ANNEX_AL §2: "the Pearson correlation coefficient between any two nodes' error series... must not exceed FC-032 = 0.30." Two AI systems trained on the same proprietary dataset may produce uncorrelated outputs while sharing the same directional bias.

**What happens on failure:** ANNEX_AL §4.2 specifies that the adversarial seat "may not be overridden on correlation grounds without the architecture review completing." The architecture review publishes findings. No enforcement consequence for accepting oracle nodes with undisclosed shared AI provenance is specified. The review is an audit event, not a blocking gate.

**Test that exists but has no enforcement linkage:**
- The correlation check (FC-032) runs — this is a defined test
- Adversarial seat veto trigger is defined
- Architecture review is required on veto
- But: if no veto is triggered because correlation is below 0.30, shared AI provenance is undetected and there is no supplemental disclosure requirement

### Gap 5 — Detection Without Enforcement: IOA Overuse

**Vulnerability:** P2-EP-001, P2-EP-003 — IOA has undefined trigger standard; per-domain cap is cyclable.

**What the Acceptance Protocol says:** ANNEX_AG §AG-LATENCY specifies FAP time bounds by urgency class, including a Class E1 survival-floor threat (72 hours). ANNEX_AG is PROPOSED.

**The enforcement gap:** The operative governance of IOA invocation is in ANNEX_AC §AC1.5. The Acceptance Protocol does not include an acceptance test for whether an IOA invocation was warranted. IOA declarations are published (ANNEX_AC requires real-time publication of provisional decisions), but publication is the enforcement — there is no trigger for retroactive invalidation of a wrongful IOA declaration. The CRP ratification function (quarterly ratification or reversal) is the closest thing to a test, but the CRP is a member of the IOA it is ratifying.

**Domain-cycling gap:** The per-domain cap (AC1.3: two consecutive quarters maximum) is verified per-domain. No acceptance test or gate tracks cumulative cross-domain emergency duration. A sophisticated actor cycling through food, housing, healthcare, and energy domains maintains continuous emergency governance without triggering any count.

**What happens on failure:** IOA provisional decisions are published. That is the full consequence. If the IOA declaration was based on an undefined trigger standard, no mechanism exists to retroactively classify it as invalid.

### Gap 6 — Detection Without Enforcement: Demurrage Delay

**Vulnerability:** P2-LH-004 — 6-month safe harbor in the Constitution (line 567) versus 18-month safe harbor in ANNEX_J §J2.

**What the Acceptance Protocol says:** The evidence ladder gate ("Any movement to ACTIVE, RESOLVED, or evidence-backed language must include the claim's evidence level, missing proof, failure criteria, and residual-risk update") is a pre-launch gate. It applies to status changes in the Claims and Evidence Register, not to internal consistency between the Constitution and annexes.

**The enforcement gap:** No acceptance test checks whether numerical parameters in the Constitution are consistent with the same parameters in implementing annexes. The contradicting safe-harbor values (6 months vs. 18 months) can both be present in the corpus, both ACTIVE, and no gate would catch it. Demurrage enforcement against a large idle balance is practically blocked by the ambiguity — the account holder cites ANNEX_J, the enforcement authority cites the Constitution, and no precedence rule resolves the conflict.

**What happens on failure:** The contradiction persists. No FAP review is triggered. A sophisticated actor holding large idle balances has an indefinite ambiguity shield.

### Gap 7 — Detection Without Enforcement: Post-Mortem Lapse

**Vulnerability:** P2 finding — post-mortem lapse (ANNEX_AM §AM3) is a hollowing trigger but has no enforcement consequence.

**ANNEX_AM §AM3** specifies that a post-mortem publication lapse of more than 30 days triggers an automatic constitutional review by the CIP. **ANNEX_AM is PROPOSED.**

**What the Acceptance Protocol says:** Nothing. The pre-launch gate table does not include a test for whether the post-mortem publication pipeline is operational before launch. No acceptance test exists for AM3 trigger compliance.

**Even if AM3 were operative:** the enforcement consequence is "an automatic constitutional review." A review is a process event. It publishes findings. No escalation path is specified if the review's findings are not acted upon. The "automatic" constitutional review triggers itself but cannot compel a remedy.

---

## Subjective or Gameable Tests

### Gap 8 — FAP Tier 2 Approval: No Deliberation Floor

**Vulnerability:** P2-LH-010 — FAP Tier 2 approval has no minimum deliberation time or reasoning requirement.

**What the Acceptance Protocol says:** The Acceptance Protocol's principal statement on review quality is: "acceptance is evidence-gated, not calendar-gated. Urgency is a reason to accelerate the pilot, not to skip it." This governs evidence requirements. It does not govern the quality of the FAP reviewer's deliberation.

**The gap:** No minimum deliberation time is specified anywhere in the Acceptance Protocol. No written-reasoning requirement is specified for the reviewing authority's approval decision. The AV1 two-key gate (adversarial panel attestation) applies only to `modifies_tier1=True` proposals. Tier 2 amendments do not require this attestation.

**Gaming path:** A Tier 2 amendment is submitted during a high-workload period. The reviewing FAP authority processes it within the technically-permissible review window with a one-word approval note. The amendment becomes binding. Because ANNEX_AG is PROPOSED, the AG4 reclassification of FAP anti-gaming rules to Tier 2 protection has not taken effect. The current Acceptance Protocol has no mechanism to flag or reverse this.

**What makes it subjective:** even if a reasoning requirement were added, "sufficient reasoning" would require a standard for adequacy. Without a minimum evidentiary checklist, a reviewer can produce a reasoning document that satisfies the form while containing no substantive analysis.

### Gap 9 — Founding Exception Classification is Self-Determined

**Vulnerability:** AH2.2 — "Structural objection response requirement" — objections are classified as "structural" or "procedural" by an unnamed actor.

**What the protocol says (AH2.2):** "Procedural objections without structural grounding (i.e., those that do not identify a specific P-013 standard) do not extend the window."

**The gap:** The founding panel — the body whose composition is being challenged — classifies incoming objections as structural or procedural. No independent body makes this classification. A founding coalition can classify every objection as procedural, respond minimally, and proceed at the 60-day mark without any extension.

**Test that is gameable:** The 60-day window is a defined test with a binary close/extend condition. But the trigger condition for extension (an unresponded structural objection) is determined by the same party that benefits from not extending. The test is gameable by the testing body.

**Proposed test shape:**
- Input evidence: filed objection with specific P-013 standard identified by the objector
- Pass/fail classification by: an independent ombudsperson designated before the window opens, not a member of the founding coalition
- Fail condition: objector identifies a P-013 standard; founding coalition's written response does not address that specific standard by name
- Consequence: 14-day automatic extension, non-waivable
- Audit artifact: published classification log showing each objection's classification and the reviewer's name

### Gap 10 — AG6 Bootstrap Protocol Classification

**Vulnerability:** ANNEX_AG §AG6 — the bootstrap resolution protocol requires "genuine circular dependencies" (not merely inconvenient ones) but the determination is made by the bootstrap review itself.

ANNEX_AG is PROPOSED. Even if operative, Step 1 of AG6 requires confirming "the dependency is genuinely circular, not merely inconvenient." The determination is made by the same bootstrap review that would benefit from finding circularity (because finding circularity unlocks the expedited 2-authority pathway, bypassing the full FAP).

This is a structural self-interest problem in the test design: the test determines whether a shortcut is available, and the shortcut-seeker performs the test.

---

## Missing Evidence Artifacts

The following evidence artifacts are referenced as required by the Acceptance Protocol but have no specified format, custodian, or independent verifiability standard:

### Artifact Gap 1 — Founding Legitimacy Dossier (FLD)

The Acceptance Protocol pre-launch gate table lists "Founding Legitimacy Dossier complete" as a hard gate. AH2.4 specifies the FLD must cover "scope, conflicts, objection handling, consent assumptions, exit rehearsal, dignity-floor non-coercion review, and founder sunset." The FLD snapshot hash is to be included in the drift-chain founding record.

**Missing:**
- No format standard for the FLD
- No independent verifier named — the founding coalition prepares the FLD that certifies its own legitimacy
- No external attestation requirement for individual FLD components (e.g., the "conflict register" is self-reported)
- No specified consequence if a component is discovered to be incomplete or false after gate clearance

### Artifact Gap 2 — Evidence Ladder Update

The evidence ladder gate requires "missing proof, failure criteria, and residual-risk update" for any status change to ACTIVE. No minimum standard for "missing proof" specification is defined. A status change can include a failure criterion that is so broad as to be unfalsifiable ("patch fails if it does not improve governance outcomes") without failing the gate.

### Artifact Gap 3 — Conflict Attestations (AH3)

AH3 requires that founding panel members attest they have not co-published, co-presented, or held institutional affiliation with any P-013 design team member in the past five years, and that these attestations "are externally verified." The external verifier is not named. The verification standard is not specified. If the founding coalition retains the external verifier, the verification is structurally dependent.

### Artifact Gap 4 — Capture Dashboard Baseline

The pre-launch gate "Capture dashboard baseline published" requires initial concentration metrics. No minimum specification for concentration metrics, no threshold for what constitutes a "baseline," and no independent certification that the baseline is accurate. A founding coalition could publish a baseline that systematically understates concentration and clear the gate.

---

## Recurrence and Drift Detection Gaps

### Gap 11 — All Pre-Launch Gates Are One-Time

Every gate in the Acceptance Protocol §Pre-Launch Blocking Gates table is designed as a pre-launch check. None has a stated recurrence schedule. The Acceptance Protocol is explicitly silent on post-launch behavioral audits.

**Implication:** A sophisticated actor who clears the gates at launch — legitimately or through gamed certification — faces no subsequent acceptance-level review of whether the cleared conditions continue to hold. The Ombuds seating gate clears when four of five sub-Ombuds are seated. If three sub-Ombuds resign six months after launch, the gate shows as cleared. No gate re-triggers.

**Drift detection that exists:** ANNEX_AM §AM3 specifies hollowing triggers (unfilled seats, lapsed post-mortems, oracle degradation). But ANNEX_AM is PROPOSED. The AM3 triggers are not operative.

**Drift detection that does not exist:** No acceptance test monitors whether the adversarial oracle seat continues to be selected through an independent procurement track (ANNEX_AL §3.4). No acceptance test monitors whether the FAP sign-off cluster composition drifts toward concentration (AG7 is PROPOSED). No acceptance test monitors whether the founding panel's adversarial member continues to be structurally opposed rather than co-opted over time.

### Gap 12 — No Acceptance Test for AI Supply Chain Drift

After oracle accreditation, no recurrence schedule exists for re-examining AI system provenance. An oracle node can change its underlying AI system between accreditation cycles without triggering a new disclosure requirement. The methodology-class registry (pre-launch gate, ANNEX_AL §5.1) requires an annual review panel — but the review scope is not specified to include AI supply chain re-disclosure.

### Gap 13 — No Acceptance Test for Emergency Normalization Detection

P2-EP-011 found that no Article VII dashboard metric tracks emergency-mode governance duration or IOA-decision ratio. The Acceptance Protocol's capture dashboard baseline gate requires "civic, Ombuds, definition, procurement, identity, and implementation-drift concentration metrics." Emergency normalization metrics are not listed. A capture dashboard that does not track IOA duration or domain-cycling patterns cannot detect emergency normalization even if it is live and publishing.

---

## Findings Table

| ID | Type | Severity | Confidence | File/Section | Summary | Failure Mode | Recommended Fix Shape |
|---|---|---|---|---|---|---|---|
| AT-001 | DEFECT | Critical | High | `ANNEX_AG.md` / header | ANNEX_AG (all FAP anti-gaming protections) is PROPOSED — AG1 pilot representativeness, AG3 adversarial auditor, AG4 urgency bypass reclassification, AG5 stagnation quality, AG7 concentration controls are all inoperative | Every founding-window protection can be gamed during the most vulnerable period — before the FAP is hardened | Activate ANNEX_AG before or concurrent with P-013 ACTIVE; treat AG1 and AG3 as pre-launch gates equivalent to the Ombuds seating gate |
| AT-002 | DEFECT | Critical | High | `ANNEX_AM.md` §AM8.4 + `ANNEX_AI.md` §1.3 | CIP removal requires 6-of-7 Plenum vote on a 5-member body — mathematically impossible; no acceptance test catches this contradiction | Captured CIP member is permanently irremovable; the CIP concurrent-ratification requirement for Tier 1 amendments becomes a permanent veto for a bad actor | Add an intake consistency check: before ANNEX_AM is activated, the removal threshold must be verifiably achievable on the stated Plenum size |
| AT-003 | DEFECT | Critical | High | `docs/constitution/Acceptance_Protocol.md` §Pre-Launch Blocking Gates | All pre-launch gates are one-time checks with no recurrence schedule; post-launch drift in gated conditions is undetected | Founding team clears gates legitimately; conditions degrade after launch; no gate re-triggers; the corpus reads as compliant while the operational system is non-compliant | Add recurrence schedules to the five most critical gates: Ombuds seating (annual), oracle methodology registry (semi-annual), capture dashboard (quarterly), evidence ladder (per status change), implementation drift audit (annual) |
| AT-004 | DEFECT | High | High | `docs/constitution/Acceptance_Protocol.md` §AH2.2 | Structural vs. procedural objection classification is made by the founding coalition — the entity being evaluated classifies the challenges to its own legitimacy | Founding coalition classifies all objections as procedural, proceeds at 60-day mark with no extensions, builds the activation record on a closed rather than genuinely challenged process | Require that objection classification be made by an independent body designated before the window opens; the founding coalition may not make this determination |
| AT-005 | DEFECT | High | High | `docs/constitution/Acceptance_Protocol.md` §Pre-Launch Blocking Gates ("Founding Legitimacy Dossier complete") | FLD is self-certified by the founding coalition; no independent verifier is named; no external attestation required for individual components | Founding coalition prepares and certifies its own legitimacy dossier; gate clears on self-certification | Add an independent attestation requirement for the FLD: at minimum, the conflict register and the exit rehearsal findings must be independently certified by the oppose-coalition nominating body or equivalent |
| AT-006 | DEFECT | High | High | `ANNEX_AL.md` §4 + P2-AI-005 | No acceptance test detects shared AI training provenance between oracle nodes; FC-032 pairwise correlation does not detect correlated directional bias below the 0.30 threshold | Multiple oracles use the same proprietary AI system; pairwise correlation is 0.25 (within limit); systematic bias from shared training data produces simultaneous directional error; oracle quorum produces a false consensus | Add mandatory AI supply chain disclosure to oracle accreditation intake; flag shared upstream AI vendors as a standards-body concentration trigger requiring architecture review |
| AT-007 | DEFECT | High | High | `ANNEX_AC.md` §AC1.3, §AC1.5 + P2-EP-001, P2-EP-003 | IOA trigger standard is undefined; per-domain cap is cyclable; no acceptance test validates whether an IOA invocation was warranted; no blocking gate exists for cumulative emergency duration | Actor cycles through domains, maintaining near-continuous IOA governance; no cap breached; no acceptance test fires | Add a cumulative cross-domain IOA duration metric to the capture dashboard; require a supermajority CRP review if any region has been under IOA authority for more than 4 quarters in a rolling 8-quarter window |
| AT-008 | DEFECT | High | High | `docs/constitution/Humane_Constitution.md` Line 567 + `ANNEX_J.md` §J2 + P2-LH-004 | Demurrage safe harbor contradiction (6 months in Constitution, 18 months in ANNEX_J); no acceptance test checks numerical consistency between the Constitution and implementing annexes | Account holder cites ANNEX_J's 18-month derivation; enforcement authority cites 6-month Constitution figure; no precedence rule; demurrage enforcement is practically blocked for large idle balances | Add a corpus consistency check gate: any ACTIVE implementing annex that specifies a numerical value also present in the Constitution must either match the Constitution or include an explicit precedence declaration |
| AT-009 | DEFECT | High | Medium | `docs/constitution/Acceptance_Protocol.md` §FAP review standard + P2-LH-010 | FAP Tier 2 approval has no minimum deliberation time, no written-reasoning requirement, and no minimum evidentiary checklist; AG4 reclassification to Tier 2 protection is PROPOSED and inoperative | Tier 2 amendment approved in minutes without substantive review; amendment is binding; no mechanism exists to retroactively invalidate rubber-stamp review | Add a mandatory minimum deliberation period (e.g., 7 days for Tier 2, 30 days for Tier 1-adjacent) and a structured reasoning template whose completion is a gate condition |
| AT-010 | DEFECT | High | High | `ANNEX_AL.md` §3.4 + `docs/constitution/Acceptance_Protocol.md` §Pre-Launch Blocking Gates | No acceptance test monitors whether the adversarial oracle seat continues to be selected through an independent procurement track after accreditation; AI supply chain drift after accreditation is undetected | Oracle node changes its underlying AI system between accreditation cycles; the methodology-class registry shows the node as compliant; systematic bias accumulates undetected | Add a re-accreditation trigger: any oracle node that changes its AI system, data source, or standards-body relationship between annual reviews must re-submit the accreditation package and cannot vote on oracle consensus during re-review |
| AT-011 | DEFECT | Medium | High | `docs/constitution/Acceptance_Protocol.md` §Pre-Launch Blocking Gates ("Evidence ladder updated") | Evidence ladder gate requires "failure criteria" for status changes but does not specify that failure criteria must be falsifiable or measurable — an unfalsifiable failure criterion clears the gate while preventing accountability | Status changes to ACTIVE with failure criteria that read "fails if the system does not achieve its goals" — not operationally testable; the activation record is complete; the status change is permanent | Add a falsifiability requirement: failure criteria must specify a measurable threshold, a measurement method, and a named measurement authority; failure criteria expressed only in terms of general goals are rejected at intake |
| AT-012 | DEFECT | Medium | High | `ANNEX_AG.md` §AG6 + P2 founding-window findings | Bootstrap protocol self-determination: the bootstrap review determines whether a dependency is "genuinely circular" — the same review that benefits from finding circularity by unlocking the expedited pathway | The bootstrapping actor classifies its own dependency as genuinely circular; the expedited pathway activates; standard FAP evidence requirements are bypassed | Require that the circularity determination be made by the Federated Ombuds duty sub-node, not the bootstrap review itself; publish the circularity finding with a 14-day challenge window |
| AT-013 | DEFECT | Medium | Medium | Multiple — no dashboard metric | Emergency normalization is invisible in real-time; no acceptance test or capture dashboard metric tracks cumulative IOA duration, domain-cycling patterns, or IOA-decision ratio in CRP agenda | A region normalizes emergency governance through domain cycling; the pattern is visible only in retrospect from historical records; no actor is automatically alerted | The capture dashboard baseline gate must include emergency normalization metrics as a gate requirement: cumulative emergency-mode duration per region, domain-cycling pattern flags, IOA-to-normal-governance decision ratio |
| AT-014 | IMPROVEMENT | Medium | High | `docs/constitution/Acceptance_Protocol.md` §AH3 | Founding panel conflict attestations are "externally verified" but the external verifier is not named and the verification standard is not specified — a founding coalition that retains its own verifier defeats the independence requirement | Founding coalition retains a nominally external verifier that performs cursory checks; attestations are published as verified; structural dependence between verifier and verified is invisible in the activation record | Name a verification standard (e.g., professional references to published co-authorship databases, institutional affiliation records) and require the verifier to be nominated by the oppose-coalition nominating body, not selected by the founding coalition |
| AT-015 | UNCERTAIN | Medium | Low | `docs/constitution/Acceptance_Protocol.md` §AV6 | Buterin penalty for adversarial panel defection triggers on "improperly admitted" Tier 1 proposals — the determination of improper admission requires a 4-of-5 Ombuds Plenum vote, which may arrive long after the harm from the improperly admitted proposal is irreversible | Adversarial panel member defects; improper admission is eventually detected; penalty is applied; but the Tier 1 amendment the improper attestation enabled has been in effect for months and reversal requires its own full amendment process | UNCERTAIN — the residual risk is acknowledged; the payoff matrix does favor honest behavior ex ante (penalty for defection is severe and permanent); the question is whether delayed detection is an acceptable risk given the irreversibility of Tier 1 changes |

---

## Recommendations

**Priority 1 (before any founding activation):**

1. **Activate or operationalize the critical portions of ANNEX_AG before founding.** Specifically, AG1 pilot representativeness and AG3 adversarial auditor should be treated as pre-launch blocking gates equivalent to Ombuds seating. Their PROPOSED status during the founding window means the founding-window protections do not protect the founding.

2. **Correct the CIP removal impossibility (ANNEX_AM §AM8.4).** The 6-of-7 threshold on a 5-member Plenum is either a drafting error (should be 4-of-5) or a Plenum size error (should be 7). Correct and re-publish before ANNEX_AM is activated. Add a corpus consistency check to the acceptance intake process.

3. **Add objection classification independence to AH2.2.** Designate the oppose-coalition nominating body as the independent arbiter of structural vs. procedural objections during the founding window, before the window opens.

**Priority 2 (before pilot launch):**

4. **Add recurrence schedules to the five most critical pre-launch gates.** The current gate table treats all conditions as one-time checks. At minimum: Ombuds dispersal certification (annual, per ANNEX_AI §1.2), oracle methodology-class re-accreditation (annual), and capture dashboard publication (quarterly).

5. **Add AI supply chain disclosure to oracle accreditation intake.** Require disclosure of: AI system vendor, training data provenance, and any shared upstream dependencies. Flag shared upstream AI vendors as triggering the same architecture review as a correlation-threshold breach.

6. **Add a minimum deliberation requirement for FAP Tier 2 review.** A 7-day minimum deliberation window with a structured reasoning template (checklist of reviewed criteria, named reviewer, dated completion) prevents rubber-stamp review and creates an auditable record.

**Priority 3 (within first operational year):**

7. **Add emergency normalization metrics to the capture dashboard baseline gate.** Cumulative IOA duration per region per rolling 8-quarter window, domain-cycling pattern flags, and IOA-to-normal governance decision ratio must be included in the capture dashboard at launch.

8. **Add corpus consistency checks as acceptance intake criteria.** Any proposed ACTIVE status document that references a numerical parameter also present in the Constitution must either match or include a precedence declaration. This closes the demurrage safe-harbor gap (P2-LH-004) and prevents future contradictions from accumulating.

9. **Add a re-accreditation trigger for oracle supply chain drift.** Oracle nodes that change AI systems, data sources, or standards-body relationships between annual reviews must re-submit before voting.

---

## Self-Review

**Coverage: 4 / 5**
All eleven Phase 2 confirmed vulnerabilities were assessed against the Acceptance Protocol. Some annexes in scope (ANNEX_AC, ANNEX_AL §4-5) were reviewed through grep analysis rather than full read due to depth. The founding documents for IOA trigger definitions could yield additional acceptance test gaps if read in full.

**Specificity: 4 / 5**
Each finding includes a specific source citation, the exact gameable condition, and a proposed test shape. Finding AT-015 is marked UNCERTAIN because the payoff-matrix analysis depends on assumptions about detection timing that are not fully specified in the corpus.

**Evidence: 5 / 5**
Every DEFECT finding is grounded in direct source text: quotes from the Acceptance Protocol, ANNEX_AG, ANNEX_AH, ANNEX_AI, ANNEX_AL, ANNEX_AM, and the Phase 2 findings index. No finding is made on speculation. UNCERTAIN is used only where the corpus is ambiguous and the audit cannot resolve the ambiguity without additional evidence.

**Adversarial Depth: 4 / 5**
The self-certification problem (founding coalition certifies its own legitimacy, classifies its own objections) is the primary adversarial finding and is explored through multiple findings (AT-004, AT-005, AT-012). The payoff-matrix analysis is applied in AT-015. The domain-cycling exploit and the AI-supply-chain-below-correlation-threshold exploit are both concrete attack paths. Weakness: the audit did not model a fully coordinated multi-actor attack across IOA, oracle, and FAP simultaneously.

**Actionability: 4 / 5**
Every finding includes a "recommended fix shape" with enough specificity to draft a patch. Priority ordering is provided. Finding AT-002 (CIP impossibility) is actionable only if the intended value (6-of-7 or 4-of-5 or 7-member Plenum) is clarified by the corpus authors — the audit cannot resolve a drafting error without knowing which parameter was intended.

**Overall: 4 / 5**

### Answers to Required Self-Review Questions

**1. What parts of the corpus may have been under-reviewed?**
ANNEX_AC (full text of IOA governance and PCRP procedures), ANNEX_AP (PCRP attack surface provisions), and the founding order documents (`founding/order/`) were not fully read in this audit. The IOA trigger analysis relies on the Phase 2 findings and the 06-emergency-powers-audit.md; a direct read of ANNEX_AC might surface additional acceptance test gaps or confirm the absence of gaps identified here.

**2. Which findings are strongest?**
AT-001 (ANNEX_AG entirely PROPOSED — all FAP anti-gaming inoperative during founding) and AT-002 (CIP removal mathematical impossibility) are the strongest findings. Both are grounded in explicit textual evidence, both are structural rather than interpretive, and both have severe practical consequences that no operational workaround can address. AT-001 is particularly strong because it is self-evident from the ANNEX_AG header status field.

**3. Which findings are weakest or most speculative?**
AT-015 (Buterin penalty timing for adversarial panel defection) is the weakest. The finding is marked UNCERTAIN because the payoff-matrix conclusion depends on how quickly the Ombuds Plenum can convene and rule after a defection — a variable not specified in the corpus. AT-012 (bootstrap self-determination) is also weaker because AG6 is PROPOSED; the finding analyzes a gameable test that is not currently operative, and may be relevant only if AG6 is activated without the classification-independence fix.

**4. What would another agent likely challenge?**
A reasonable adversarial reviewer would challenge AT-003 (all gates are one-time) by pointing to ANNEX_AI §1.2 — the Ombuds Oversight Assembly certifies dispersal compliance annually, which is a recurrence mechanism for one gate condition. The counter-response is that the annual certification is a function of the Oversight Assembly, not a gate trigger in the Acceptance Protocol — the Acceptance Protocol itself has no recurrence logic. The challenge would narrow the finding but not eliminate it.

Another likely challenge: AT-009 (FAP Tier 2 deliberation floor) overstates the risk because the adversarial panel attestation (AV1) already protects Tier 1-touching proposals. The counter-response is that AV1 explicitly does not apply to Tier 2 proposals (AV1: "any patch proposal that carries the tag `modifies_tier1=True`"), so the deliberation gap for Tier 2 is real and unaddressed.

**5. What should be re-audited before source changes are made?**
Before any patches to correct AT-001, AT-002, or AT-004 are activated, the following should be re-audited:
- The full text of ANNEX_AC to verify the IOA trigger gap independently (AT-007)
- The `founding/commitments.md` file to verify that no founding commitment already addresses the AI supply chain disclosure gap (AT-006)
- The full amendment protocol (`architecture/amendment_protocol.md`) to verify that the CIP concurrent-ratification requirement is visible in the Constitution and not only in ANNEX_AM (this was flagged as a P2-GC finding but not independently verified in this audit)

---

## Repair Pass Needed

**Coverage scored 4 (below threshold not reached — threshold is below 4 triggers repair pass).**
No scores are below 4. No formal repair pass is required.

However, the following targeted re-reads are recommended before this report is relied upon for patch prioritization:

- `docs/annexes/ANNEX_AC.md` — full read to independently verify IOA trigger gap and domain-cycling cap mechanics
- `docs/annexes/ANNEX_AP.md` — full read to verify PCRP acceptance tests and cap-reset gate mechanics
- `founding/order/` directory — to determine whether any founding order documents contain acceptance criteria that supersede or supplement the Acceptance Protocol's gate table

These re-reads would raise Coverage to 5 and may add 1-2 additional findings or narrow AT-007 and AT-012.
