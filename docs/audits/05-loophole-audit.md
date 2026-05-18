# Loophole and Bad-Actor Audit

**Audit date:** 2026-05-15
**Auditor:** Claude Code corpus auditor (claude-sonnet-4-6)
**Branch:** claude/pedantic-spence-c4e730
**Phase:** 2 — Adversarial Stress-Test
**Report domain:** Loopholes, compliance exploits, exception abuse

---

## Scope

This report covers the Humane Constitution corpus from the perspective of a rational bad actor: an operator, founder, administrator, vendor, or insider who wants to capture the system's benefits while defeating its protective purposes — without triggering a formal violation finding.

Scope is bounded to the **loophole domain**: compliance exploits, exception clause abuse, procedural denials, rubber-stamping risks, and infrastructure control risks. Emergency-power abuse, oracle capture, and governance capture are addressed in separate Phase 2 domain reports.

**Primary source files examined:**
- `docs/constitution/Humane_Constitution.md`
- `docs/constitution/INVARIANTS.md`
- `docs/constitution/Acceptance_Protocol.md`
- `docs/annexes/ANNEX_U.md` (operational bypass closure)
- `docs/annexes/ANNEX_AB.md` (semantic anti-capture)
- `docs/annexes/ANNEX_AF.md` (grace exploitation closure)
- `docs/annexes/ANNEX_AJ.md` (above-ledger bypass examples)
- `founding/commitments.md`
- `founding/order/subsidiarity_rule.md`
- Phase 1 findings index (`00-phase1-findings-index.json`)

---

## Method

For each mechanism examined, the following chain was applied:

1. **Stated purpose:** What is this protecting?
2. **Literal rule:** What does the text actually require?
3. **Compliance exploit:** How do you comply while defeating the purpose?
4. **Missing guardrail:** What owner/evidence/timeline/appeal/consequence is absent?
5. **Capture path:** Who benefits from the exploit?
6. **Failure consequence:** What breaks if the exploit succeeds?
7. **Minimal fix shape:** Smallest structural repair.

Evidence is grounded in specific file locations and Phase 1 finding IDs where applicable. No findings are invented — each is traceable to observed corpus text or a confirmed Phase 1 defect.

---

## Highest-Risk Loopholes

### L-001 — "Qualified Independent Review Body" Is Self-Defining

**Stated purpose:** Allow constitutional communities to replace a captured or self-interested keyholder when keyholders refuse to self-correct. HC line 327: "the amendment protocol must include a mechanism by which a qualified independent review body may petition for the replacement of any keyholder."

**Literal rule:** A "qualified independent review body" may petition for keyholder replacement. No criteria define "qualified" or "independent" in this context.

**Compliance exploit:** The keyholders being replaced control or influence which review bodies are recognized as legitimate. They invoke procedural objections — "that body does not meet the qualification standard" — without a published standard existing to rebut. Conversely, a faction seeking illegitimate replacement assembles any sympathetic body and claims it is "qualified," with no published standard to disqualify them either. Both sides can exploit the same definitional void.

**Missing guardrail:** No minimum composition floor, no independence standard, no appointment source, no challenge-and-response procedure, no timeline for resolving qualification disputes.

**Capture path:** Incumbent keyholders benefit from the exploit by blocking replacement. Hostile factions benefit by manufacturing a "qualified" body to effect replacement without legitimate process. The same gap serves opposite capture directions.

**Failure consequence:** Tier 1 amendment safeguard (7-of-9 keyholder requirement) becomes either irremovable (if incumbents block all challengers) or trivially bypassed (if any faction can declare itself qualified).

**Minimal fix shape:** Add a minimum criteria note to HC line 327 defining: composition floor (minimum N members), independence standard (no affiliation with affected governance body for minimum period), appointment source (drawn from Federated Ombuds pool or equivalent), and a 30-day challenge-and-response procedure.

**Phase 1 cross-reference:** P1-TF-007

**Severity:** Critical | **Confidence:** High

---

### L-002 — Investment Channel "Independent Auditor" Is Self-Selected

**Stated purpose:** Prevent protected-capital treatment (exemption from idle-Flow demurrage) from becoming a permanent hoarding shelter. HC line 207: "milestone-reviewed by independent auditors."

**Literal rule:** Protected capital must be "milestone-reviewed by independent auditors." ANNEX_U §U3 adds that "protected entities may not select, pay, or repeatedly re-use their own reviewers without external assignment rules."

**Compliance exploit:** ANNEX_U §U3 imposes the restriction but the "external assignment rules" are not defined anywhere in the corpus. The protection is conditional on rules that do not exist yet. Until those rules are published, the restriction is nominal — a protected entity can claim compliance with "ANNEX_U §U3" while selecting its own audit firm, as long as the firm is nominally external.

**Missing guardrail:** No assigned body administers the external assignment rules. No timeline for publishing those rules before activation. No published roster of eligible independent auditors. No rotation schedule.

**Capture path:** Large enterprises with concentrated Flow benefit most from prolonged protected-capital status. They have the resources to establish nominally-external audit relationships and to delay the publication of genuine external-assignment rules.

**Failure consequence:** The demurrage decay mechanism — the primary structural tool against wealth concentration — fails for precisely the largest and most strategic concentrations. Protected windows become permanent hoarding vehicles.

**Minimal fix shape:** Bind "external assignment rules" to a specific founding commitment (FC number) with a value that must be set before activation. Until bound, no protected capital designation may be granted above a published small-project floor.

**Severity:** High | **Confidence:** High

---

### L-003 — Working-Tools Succession Exemption Has No Scope Cap

**Stated purpose:** Allow genuine productive continuity — a farmer's tools, a craftsperson's equipment — to pass to heirs without triggering commons-return rates. INVARIANTS INV-010: "Succession transfers of primary-residence use-rights and working tools (productive capital in active use by the decedent) are exempt."

**Literal rule:** "Working tools" defined as "productive capital in active use by the decedent" are exempt from succession commons-return.

**Compliance exploit:** "Productive capital in active use" has no value cap, no category limit, and no definition of "in active use." A dynasty-minded actor structures their entire Flow-equivalent wealth as operating assets in a registered enterprise, ensuring the founder is nominally active in management until death. A fleet of commercial properties "in active use" as rental infrastructure qualifies. A controlling stake in a major enterprise held by a working CEO qualifies. The succession exemption becomes a near-complete dynasty vehicle for anyone with estate-planning sophistication.

**Missing guardrail:** No value cap on exempt succession transfers. No minimum activity threshold that could not be achieved through nominal consulting arrangements. No distinction between tools of personal craft and control stakes in large enterprises.

**Capture path:** Wealthy founders and their legal teams. The less financially sophisticated bear the full commons-return rate while sophisticated actors exempt most of their estate as "working tools."

**Failure consequence:** INV-010's dynasty-prevention purpose is effectively nullified for anyone with legal counsel. PRD-009 (dynasty formation threat) was specifically addressed by P-031 through P-033, but the succession exemption opens a parallel non-ledger pathway that those patches may not cover.

**Minimal fix shape:** Add a value ceiling to the working-tools exemption (e.g., exempt up to N times the household savings floor; anything above requires ordinary commons-return processing). Alternatively, cap exempt productive capital at the category of "tools primarily used in direct personal labor" rather than "enterprise control assets."

**Severity:** High | **Confidence:** High

---

### L-004 — Demurrage Safe Harbor Contradiction Enables Timing Arbitrage

**Stated purpose:** Prevent idle wealth accumulation above the household operating-float exemption. HC line 567: "households receive a safe harbor equal to 6 months of median regional consumption expenditure."

**Literal rule:** HC says 6 months. ANNEX_J §J2 says 18 months. Both are active corpus documents.

**Compliance exploit:** An actor facing demurrage enforcement cites the ANNEX_J 18-month floor as the governing standard; the enforcer cites the HC 6-month floor. Both readings are textually valid. The dispute resolves in favor of the actor because enforcement requires precision, and the actor only needs ambiguity. In practice, the 18-month floor will govern because it favors the account holder and enforcement bodies will hesitate to impose the narrower reading without clear authority.

**Missing guardrail:** No hierarchy rule stating which document governs when they conflict on a numeric parameter. The "Constitution controls" principle is not explicitly stated for this parameter in a way that forecloses ANNEX_J's reasoned 18-month derivation.

**Capture path:** Wealthy households with large idle balances benefit from ambiguity. Every additional month of safe harbor exempts a significant amount of accumulated Flow from demurrage.

**Failure consequence:** If 18 months governs in practice, the demurrage mechanism collects significantly less revenue, weakening PFCR (public commons revenue) and the Essential Access commons pool.

**Minimal fix shape:** Align HC and ANNEX_J to the same figure and include the derivation rationale in whichever document is authoritative. Simplest: add a note to HC line 567 stating "see ANNEX_J §J2 for derivation — the 18-month figure in ANNEX_J represents the operative standard; the Constitution's 6-month reference is superseded by the annex derivation."

**Phase 1 cross-reference:** P1-IC-001

**Severity:** High | **Confidence:** High

---

### L-005 — Tier Label Overload Enables False Procedural Barriers

**Stated purpose:** The three-tier architecture distinguishes: (a) Tier 1/2/3 amendment hierarchy, (b) Tier 0/1 identity access levels (open-access vs. identity-verified), and (c) Tier 1/2 identity assurance classes.

**Literal rule:** The corpus uses "Tier 1," "Tier 2," and "Tier 0" in all three senses simultaneously without a disambiguation key in any single document.

**Compliance exploit (barrier direction):** A governance actor argues that a Tier 1 identity access decision — which identity-layer service a person can access — requires Tier 1 amendment authority (7-of-9 keyholders, 180-day timelock). This creates an impossible procedural barrier for resolving individual identity disputes, since the constitutional amendment process cannot practically be invoked for individual service decisions.

**Compliance exploit (lowered-bar direction):** A governance actor argues that a Tier 1 amendment (constitutional invariants) is merely a "Tier 1 access" decision — an administrative determination about service tiers — and can be resolved through the ordinary FAP process rather than the 7-of-9/180-day mechanism.

**Missing guardrail:** No disambiguation key at first use of each Tier term in any document. HC line 330's cross-reference note "(Tier 0 survival-floor access ... Tier 1 identity-gated services)" appears only in one footnote; it does not resolve the three-way collision.

**Capture path:** Either direction serves a capture purpose: blocking direction serves insiders who want to prevent identity-layer access for disfavored populations; lowering direction serves actors who want to amend invariants through a lower-friction process.

**Failure consequence:** Invariant amendment protections can be procedurally gamed in either direction. Individual access disputes become unsolvable, or invariant protections become penetrable.

**Minimal fix shape:** Add a disambiguation header to INVARIANTS.md and to the Constitution's Article I defining "Tier (Amendment)" vs "Tier (Identity Access)." Any document that uses "Tier N" should qualify it on first use.

**Phase 1 cross-reference:** P1-TF-002

**Severity:** Critical | **Confidence:** High

---

### L-006 — "Recognized Contribution" Audit Has No Enforcement Consequence

**Stated purpose:** Prevent systematic exclusion of hard-to-measure contributions (caregiving, spiritual leadership, mutual aid) from the Service Record and Voice eligibility framework. HC line 430: the system "must audit — no less than every two years — whether its definition of 'recognized contribution' accurately reflects the full range of human service."

**Literal rule:** The audit must be published. "Where gaps are found, corrections to the contribution-recognition framework must be published within 180 days."

**Compliance exploit:** Publish an audit. Find gaps. Publish proposed corrections within 180 days. The proposed corrections are weak, narrow, or unimplementable. There is no enforcement authority, no minimum coverage standard, no consequence for publishing corrections that do not close the identified gaps. The publication obligation is satisfied; the substantive obligation is not.

**Missing guardrail:** No minimum corrective effect standard. No independent reviewer of whether corrections actually close the gap. No consequence for a second consecutive audit finding the same gap. No appeal right for communities whose contributions remain systematically unrecognized.

**Capture path:** Institutionally legible contributors (formal employment, credentialed service) benefit from systematic exclusion of informal care work, mutual aid, and community presence. They do not need to actively capture the system — they only need to ensure the audit finds "gaps" that never get meaningfully closed.

**Failure consequence:** Service Record and Voice accumulate disproportionately among institutionally embedded actors. Oversight roles, jury pools, and civic panels become systematically unrepresentative despite the two-year audit theater.

**Minimal fix shape:** Add minimum-correction standards to the audit obligation: if the same exclusion pattern is found in two consecutive audits without a material change in recognition rates, a mandatory independent implementation review is automatically triggered, with a published timeline and designated accountable body.

**Severity:** High | **Confidence:** High

---

### L-007 — Scarcity Declaration Has No Maximum Duration Without Renewal

**Stated purpose:** Prevent emergency rationing powers from becoming permanent. HC line 223: "every Shared Storehouse activation carries a published expiration timestamp set at activation. Continuation beyond that timestamp requires an affirmative multi-key renewal."

**Literal rule:** Activation requires a timestamp. Continuation requires affirmative renewal. "Automatic reversion is not a failure mode; it is the designed default."

**Compliance exploit:** The rule prevents indefinite extension by silence, but it does not cap the initial expiration timestamp. A founding body sets the initial expiration at "24 months from activation" or "until oracle quorum certifies end of scarcity." The oracle quorum fails to certify end of scarcity because the oracle quorum itself is subject to capture or dysfunction (P1-TR-001, AZ2 missing). The automatic reversion never fires because the expiration is set far enough out that "continuation" renewals are never needed. The emergency power persists for the full duration without ever triggering the renewal mechanism.

**Missing guardrail:** No maximum initial duration cap. No requirement that initial activation timestamps be "short" (days/weeks vs. months/years). No independent authority to challenge an unreasonably long initial timestamp.

**Capture path:** Emergency administrators benefit from prolonged scarcity declarations to maintain elevated powers, resource-allocation authority, and reduced accountability that attends normal operations.

**Failure consequence:** The Shared Storehouse activation mechanism — designed as a short-term rationing bridge — becomes a durable governance tool available to any administrator who can secure an initial oracle finding of scarcity.

**Minimal fix shape:** Add a maximum initial activation duration (e.g., FC-bound value, default 90 days for the first activation cycle). A second or subsequent cycle requires both oracle confirmation and Article VI deliberative ratification. Cap on initial timestamp prevents the renewal mechanism from being circumvented by never needing renewal.

**Severity:** High | **Confidence:** High

---

## Compliance Exploits

### L-008 — 70% Basket Aggregate Compliance Masks Per-Category Deficiency

**Stated purpose:** Ensure founding-basket self-executing floor guarantees minimum survival delivery. ANNEX_AM §AM2 (P-018): a 70% founding-basket self-executing floor.

**Literal rule:** Basket delivery must meet 70% of the founding basket aggregate. Per-category floors are not specified in the aggregate rule.

**Compliance exploit:** An administrator delivers 100% of low-cost, easy-to-deliver categories and 0% of high-cost, hard-to-deliver categories (e.g., 100% of caloric allocation, 0% of crisis mental-health stabilization). Total aggregate delivery = 70%+. The rule is satisfied. People in mental health crisis receive nothing.

**Missing guardrail:** No per-category minimum floor tied to the 70% aggregate. No definition of "founding basket" that would prevent gaming through category weighting.

**Capture path:** Administrators with constrained budgets or ideological opposition to specific CSM categories (mental health, dental, reproductive health) can exclude them while maintaining aggregate compliance.

**Failure consequence:** The constitutional survival minimum's most contested and least measurable categories disappear from delivery, hidden behind aggregate basket compliance metrics.

**Minimal fix shape:** Add a per-category floor requirement alongside the 70% aggregate: each CSM category must be delivered at no less than X% (e.g., 60%) of its individual CSM specification independently of aggregate basket performance.

**Phase 1 cross-reference:** P1-IC-007

**Severity:** High | **Confidence:** High

---

### L-009 — "Functional Effect" Test Has No Implementation Authority

**Stated purpose:** ANNEX_AJ extends the convertibility prohibition above the ledger: "Any arrangement that produces the *functional effect* of instrument conversion — regardless of whether it involves a ledger transaction — is a convertibility violation."

**Literal rule:** Above-ledger arrangements with conversion functional effect are violations. ANNEX_AJ §§AJ-1.1 through AJ-1.3 enumerate specific prohibited patterns.

**Compliance exploit:** ANNEX_AJ names the violations but does not name the detection body, the evidence standard for establishing "functional effect," the penalty authority, or the appeal process for accused parties. An enforcement body must exist, identify a pattern, gather evidence, establish "functional effect" under undefined criteria, and impose penalties — each step either undefined or subject to the same capture risks as the underlying system.

**Missing guardrail:** No designated enforcement authority for above-ledger violations. No evidence standard for "functional effect." No graduated penalty schedule with binding FC values (FC-040 "deterrence multiplier" and FC-041 "detection probability" are referenced in ANNEX_AJ's at-a-glance block but are PROPOSED VALUES in commitments.md — not yet bound).

**Capture path:** Sophisticated above-ledger arrangements (employer-sponsored contribution accumulation, anticipatory network coordination) can operate indefinitely because enforcement requires a functioning detection and penalty system that does not yet exist as a bound operational reality.

**Failure consequence:** The entire above-ledger bypass closure (ANNEX_AJ) is a paper prohibition. The most sophisticated instrument conversion vectors — which escape ledger detection entirely — remain functionally unconstrained during the period between founding and full enforcement infrastructure activation.

**Minimal fix shape:** Designate a specific enforcement body (Federated Ombuds or Enforcement Panel) with explicit authority over above-ledger violations. Bind FC-040 and FC-041 as pre-activation conditions. Publish a prima facie evidence standard for "functional effect."

**Severity:** High | **Confidence:** High

---

### L-010 — Hardship Attestation Collusion Detection Has No Enforcement Timeline

**Stated purpose:** ANNEX_AF: prevent coordinated networks from rotating fake hardship claims to preserve elite governance eligibility indefinitely.

**Literal rule:** ANNEX_AF identifies specific collusion graph patterns (mutual attestation pairs, star attestation clusters) that trigger "elevated scrutiny review."

**Compliance exploit:** "Elevated scrutiny review" is triggered. No timeline is specified for completing the review. No consequence attaches if the review is not completed. A sophisticated network that detects it is under scrutiny can disperse (change its attestation structure) while the review is pending indefinitely. ANNEX_AF is PROPOSED status — it is not yet operative.

**Missing guardrail:** No maximum duration for "elevated scrutiny review." No automatic consequence if review is not completed within a deadline. No consequence for the flagged network during the review period. ANNEX_AF is PROPOSED, meaning none of its controls are currently active.

**Capture path:** Elite governance-eligible actors who use the Protected Pause system to preserve Service Record while avoiding contribution requirements. The grace mechanism designed for the vulnerable becomes a permanent governance-eligibility preserving tool for the well-organized.

**Failure consequence:** The grace exploitation loop (T-009) remains open because its primary countermeasure (ANNEX_AF) is PROPOSED and, even when operative, relies on scrutiny reviews that can be indefinitely deferred.

**Minimal fix shape:** Add maximum review duration (e.g., 60 days) to the elevated scrutiny trigger. Specify an interim consequence during review (e.g., pause new attestation credit until review completes). Prioritize ANNEX_AF activation as a pre-launch prerequisite.

**Severity:** Medium | **Confidence:** High

---

## Exception Abuse Risks

### L-011 — Essential Access Caregiver Exception Has No Coordinator Cap

**Stated purpose:** HC line 214 and line 564: "narrow caregiver/dependent exceptions must remain capped, auditable, and reversible when coercion appears." Caregiver transfer capped at "up to 10% of dependent's weekly Essential Access entitlement (per week)."

**Literal rule:** Per HC line 610: "Up to 10% of dependent's weekly Essential Access entitlement (per week)" per transfer event; "Repeated transfers; multiple dependents → same receiver; coercion pattern clusters" are detection signals.

**Compliance exploit:** The 10% cap is per transfer per dependent. An actor who manages a network of 50 verified "dependents" can receive 50 × 10% = 5 full weekly Essential Access entitlements per week through the caregiver channel — a substantial aggregation that exceeds any individual's legitimate caregiving scope, while each individual transfer is fully compliant.

**Missing guardrail:** No aggregate cap on total caregiver-received Essential Access per receiver per week. The "multiple dependents → same receiver" detection signal exists, but "detection signal" implies a human review, not an automatic cap.

**Capture path:** Anyone who can establish a network of dependent relationships — whether genuine or nominally documented — can use the caregiver channel as a soft Essential Access aggregation mechanism.

**Failure consequence:** The caregiver exception becomes a small-scale Essential Access pooling channel. While the 7-day expiry on transferred Essential Access limits downstream conversion potential, the aggregation itself defeats the non-accumulation design of Essential Access.

**Minimal fix shape:** Add an aggregate weekly receiving cap per natural person across all dependent transfer channels (e.g., no single person may receive more than 2 dependent-transfer weekly portions per week, regardless of number of registered dependents). Separate caregiving management (coordinating delivery) from caregiving aggregation (accumulating entitlement).

**Severity:** Medium | **Confidence:** High

---

### L-012 — Protected Pause "Pause-Appropriate Stewardship" Pathway Needs Verification Floor

**Stated purpose:** ANNEX_AF: allow genuine hardship-affected persons to earn up to 15% of normal quarterly Service Record through "pause-appropriate stewardship" (peer support, self-directed learning, community care).

**Literal rule:** Activities qualifying for the 15% pathway include "verified self-directed learning with completion evidence" and "community care activities that do not require the person's primary capacity."

**Compliance exploit:** "Verified self-directed learning with completion evidence" has no verification standard. A person submitting screenshots of completed online courses, a journal of personal study, or a community member's attestation of learning progress satisfies the text. The verification burden is undefined, making the pathway gameable by anyone willing to produce low-effort documentation.

**Missing guardrail:** No minimum verification standard for self-directed learning evidence. No independent review requirement. No restriction on the verifier being from the same network as the learner.

**Capture path:** Anyone under Protected Pause who wants to maintain Service Record eligibility. The pathway is designed for genuine hardship users, but its undefined verification floor makes it accessible to anyone.

**Failure consequence:** The 15% service-record preservation pathway becomes a near-universal Protected Pause supplement, eroding the slow-decay mechanism ANNEX_AF intends to apply to long-term pause users.

**Minimal fix shape:** Define minimum evidence standards for "verified self-directed learning" (e.g., structured course completion, third-party platform verification, or peer attestation from outside the person's normal attestation network). "Community care activities" should require a named beneficiary or a community body attestation.

**Severity:** Medium | **Confidence:** Medium

---

## Rubber-Stamping Risks

### L-013 — Acceptance Protocol Has No Minimum Deliberation Standard

**Stated purpose:** The Formal Acceptance Protocol (FAP) governs how patches, amendments, and parameter changes are reviewed and accepted. It is meant to provide an independent check on proposed changes.

**Literal rule:** Acceptance_Protocol.md specifies a Priority Acceptance Order table and various acceptance gates. The protocol requires a "FAP reviewer" to conduct review.

**Compliance exploit:** The FAP reviewer role is not defined with a minimum independence standard, a deliberation-time floor, a quorum requirement, or a published reasoning obligation. A single captured or rubber-stamp FAP reviewer can process a Tier 2 amendment without meaningful deliberation, publishing a cursory "accepted" finding that meets the literal process requirement.

**Missing guardrail:** No minimum deliberation time for non-trivial amendments. No minority dissent pathway. No quorum requirement (the FAP reviewer appears to be a single-actor role). No structured reasoning requirement for approval decisions (reasoning is required for rejection via invariant ID, but not for approval).

**Capture path:** Whoever appoints or influences the FAP reviewer gains effective control over the amendment pathway for Tier 2 and Tier 3 changes, including founding commitments and operational parameters.

**Failure consequence:** Tier 2 protections (founding commitments requiring "supermajority + adversarial panel review" per INVARIANTS INV-007) may be bypassed if the FAP process can be collapsed into a single reviewer's rubber stamp.

**Minimal fix shape:** Add a minimum deliberation standard for Tier 2 amendments: published reasoning requirement, minimum review period (e.g., 30 days for Tier 2), and an independent co-reviewer requirement for any amendment touching a Tier 2 founding commitment.

**Phase 1 cross-reference:** P1-TR-012 (Acceptance Protocol lacks clause-to-invariant linkage column)

**Severity:** High | **Confidence:** Medium

---

### L-014 — CIP Removal Is Functionally Impossible (6-of-7 with 5-Member Body)

**Stated purpose:** Allow removal of a captured or malfeasant Constitutional Integrity Panel member. ANNEX_AM §AM8.4: "6-of-7 vote of the Federated Ombuds Plenum."

**Literal rule:** 6-of-7 vote required. Federated Ombuds Plenum has 5 members (FC-090).

**Compliance exploit:** No exploit is needed — the mechanism is mathematically impossible as written. No removal can ever occur. A captured CIP member is irremovable.

**Missing guardrail:** A correct removal threshold (e.g., 4-of-5) was not provided when the 5-member Plenum was established.

**Capture path:** Any CIP member who becomes captured, self-interested, or hostile to the Constitution's purpose faces no credible removal threat.

**Failure consequence:** The CIP's function as an independent amendment check (P-051, ANNEX_AM §AM8) fails if any member is captured and irremovable. The entire CIP concurrent-ratification requirement becomes a single captured actor's veto.

**Minimal fix shape:** Correct the threshold to 4-of-5 (or to whatever the correct supermajority of the actual Plenum size is). Verify the correction propagates to all documents citing this threshold.

**Phase 1 cross-reference:** P1-IC-011

**Severity:** Critical | **Confidence:** High

---

## Procedural Denial Risks

### L-015 — Community Alert "Prima Facie Threshold" Is Undefined

**Stated purpose:** HC line 457: "Alerts that meet a basic prima facie threshold for systemic failure must trigger a formal review within 90 days."

**Literal rule:** Alerts meeting a "basic prima facie threshold" trigger a 90-day formal review. Every alert gets acknowledgment within 30 days.

**Compliance exploit:** The "prima facie threshold" for what constitutes a systemic failure alert is undefined. Whoever handles the acknowledgment process controls the threshold determination. A captured alert-review body can classify every incoming alert as not meeting the threshold, sending form acknowledgments within 30 days while never triggering a formal review.

**Missing guardrail:** No published minimum criteria for "basic prima facie threshold." No independent review of threshold determinations. No appeal right for alerts deemed to not meet the threshold. No published statistics on acknowledgment rates vs. formal review rates.

**Capture path:** Governance bodies whose failures are most likely to generate community alerts benefit from controlling the threshold. This is precisely the population most likely to be hostile to the review trigger.

**Failure consequence:** The community alert pathway — designed as an ordinary person's access to constitutional challenge mechanisms — is blocked at the threshold gate by the very actors whose failures generated the alerts.

**Minimal fix shape:** Publish a minimum threshold definition (e.g., any alert describing a pattern affecting 50+ persons or alleging a rights violation by a named institutional actor triggers formal review automatically). Publish quarterly statistics on threshold determinations.

**Severity:** High | **Confidence:** High

---

### L-016 — Subsidiarity Escalation Has No Default Timeline

**Stated purpose:** `founding/order/subsidiarity_rule.md`: if a review is inconclusive after the challenge process, the matter stays at the smaller scale (default against escalation).

**Literal rule:** A 30-day public challenge period applies to the competence analysis. If challenged, the matter is reviewed by the next-larger scale's representation. "Default-against-escalation rule: if the review is inconclusive, the matter stays at the smaller scale."

**Compliance exploit:** The "review by the next-larger scale's representation" has no maximum duration. A larger-scale governance actor that wants to block a smaller-scale decision (or prevent a decision from being escalated) can keep the review inconclusive indefinitely — never concluding, never escalating, never affirming — while the matter remains in procedural limbo.

**Missing guardrail:** No maximum duration for scale-review inconclusion. No consequence for a reviewing body that fails to conclude its review within a reasonable period.

**Capture path:** Any actor with influence over the next-larger scale's review body benefits from procedural delay on matters they want to prevent from concluding.

**Failure consequence:** The subsidiarity rule's default-against-escalation protection can be weaponized as a delay mechanism: keep the review inconclusive, preventing both affirmation of the smaller scale's authority and legitimate escalation, while the matter remains unresolved.

**Minimal fix shape:** Add a maximum review duration (e.g., 60 days) after which the matter defaults to the smaller scale per the default-against-escalation rule. If the reviewing body needs more time, it must publish a statement of reasons and a new deadline.

**Severity:** Medium | **Confidence:** High

---

## Data and Infrastructure Control Risks

### L-017 — Beneficial Ownership Transparency Has No Verification Mechanism

**Stated purpose:** HC line 394: "every housing, land, and commons claim must resolve to natural persons or chartered public/community bodies; entity wrappers may not obscure effective control."

**Literal rule:** Claims must "resolve to" natural persons. Entity wrappers are prohibited from obscuring control.

**Compliance exploit:** The corpus does not specify who verifies beneficial ownership declarations, how frequently, using what methodology, and with what consequence for false declarations. A multi-layer entity structure makes a declaration: "Ultimate beneficial owners are: [list of natural persons]." The declaration is accepted because no verification mechanism exists or is defined. The natural persons listed may be nominees, employees, or conduits for a different ultimate controller.

**Missing guardrail:** No designated verification body for beneficial ownership. No minimum verification methodology (document production, cross-registry matching, beneficial ownership register access). No periodic re-verification requirement. No false-declaration penalty.

**Capture path:** Any actor seeking to accumulate housing use-rights, land claims, or commons assets beyond individual limits. The prohibition on entity wrappers is effectively unenforceable without a verification mechanism.

**Failure consequence:** The anti-concentration and anti-dynasty provisions (P-031 through P-033, INV-010) fail because their beneficial ownership boundary condition is unverified.

**Minimal fix shape:** Designate the Federated Ombuds or an equivalent body as the beneficial ownership verification authority. Require annual re-verification for claims above a published asset-size threshold. Publish a false-declaration consequence (minimum: forfeiture of excess claims above verified individual limits).

**Severity:** High | **Confidence:** High

---

### L-018 — "No Single Obligation May Be Financed Through More Than One Issuance Channel" Has No Cross-Channel Detection System

**Stated purpose:** Prevent hidden Flow stock creation by routing the same underlying obligation through multiple Annex X issuance channels simultaneously. HC line 568: "no single obligation may be financed through more than one issuance channel."

**Literal rule:** Single-obligation, single-channel rule for Flow issuance.

**Compliance exploit:** The rule requires detection of when the "same obligation" has been submitted to multiple channels. "Same obligation" is not defined with sufficient precision to make detection automated or objective. A sophisticated actor structures a project as two related but nominally separate obligations, routes each through a different Annex X channel, and the issuance audit treats them as independent. The provenance-tagging requirement (HC line 568: "provenance-tagged at audit level") does not automatically detect the relationship between nominally separate obligations.

**Missing guardrail:** No cross-channel obligation identity standard (what makes two obligations "the same"). No automated cross-channel matching system specification. No consequence for post-issuance discovery of dual-channel financing.

**Capture path:** Large enterprise actors with the sophistication to structure complex projects benefit most. They can multiply Flow issuance for substantially the same productive activity.

**Failure consequence:** The constitutional anti-stock-creation barrier is penetrated through structured obligation splitting, creating inflationary Flow issuance that undermines the demurrage and PFCR revenue architecture.

**Minimal fix shape:** Define "same obligation" in terms of project identity markers (location, principal beneficiary, primary productive output). Require cross-channel affiliation disclosure when any two issuance requests share two or more identity markers.

**Severity:** Medium | **Confidence:** Medium

---

## Findings Table

| ID | Type | Severity | Confidence | File | Section | Summary | Exploit Path |
|---|---|---|---|---|---|---|---|
| L-001 | DEFECT | Critical | High | HC line 327 | Keyholder replacement | "Qualified independent review body" undefined | Incumbents block replacement by challenging qualification; or hostile faction manufactures a "qualified" body |
| L-002 | DEFECT | High | High | HC line 207; ANNEX_U §U3 | Investment channel | External-assignment rules for auditor selection are referenced but not defined | Protected entities use nominally-external but functionally-selected audit relationships |
| L-003 | DEFECT | High | High | INVARIANTS.md INV-010 | Succession exemption | Working-tools exemption has no value cap | Entire wealth structured as "productive capital in active use" evades commons-return |
| L-004 | DEFECT | High | High | HC line 567; ANNEX_J §J2 | Demurrage safe harbor | 6 months (HC) vs 18 months (ANNEX_J) — 3× contradiction | Enforcement dispute resolves in favor of 18-month floor; demurrage revenue reduced |
| L-005 | DEFECT | Critical | High | HC line 330; INVARIANTS.md | Tier label overload | "Tier 1" has 3 simultaneous meanings | False procedural barriers for identity access or false lowering of invariant amendment bar |
| L-006 | DEFECT | High | High | HC line 430 | Recognized-contribution audit | Audit obligation has no corrective-effect standard | Audit theater: gaps found, weak corrections published, same gaps persist |
| L-007 | DEFECT | High | High | HC line 223 | Shared Storehouse expiry | No maximum initial activation duration | Initial timestamp set to 24 months; renewal mechanism never triggered; emergency powers persist |
| L-008 | DEFECT | High | High | ANNEX_AM §AM2 | Basket aggregate floor | 70% aggregate compliance masks per-category deficiency | Deliver 100% of cheap categories, 0% of expensive ones; aggregate = 70%+ |
| L-009 | DEFECT | High | High | ANNEX_AJ | Above-ledger bypass | Functional-effect test has no designated enforcement authority or evidence standard | Above-ledger convertibility proceeds indefinitely; FC-040/FC-041 are unbound |
| L-010 | DEFECT | Medium | High | ANNEX_AF | Grace exploitation | Elevated scrutiny review has no maximum duration; ANNEX_AF is PROPOSED | Network disperses during indefinite review; no interim consequence |
| L-011 | DEFECT | Medium | High | HC line 610 | Caregiver exception | 10% cap is per-transfer, not per-receiver-per-week | 50-dependent network = 5 full weekly entitlements via caregiver channel |
| L-012 | DEFECT | Medium | Medium | ANNEX_AF | Pause-appropriate stewardship | "Verified self-directed learning" has no verification standard | Screenshot-level documentation satisfies the evidence requirement |
| L-013 | DEFECT | High | Medium | Acceptance_Protocol.md | FAP review standard | No deliberation-time floor or reasoning requirement for Tier 2 approvals | Single rubber-stamp reviewer processes Tier 2 amendments without meaningful deliberation |
| L-014 | DEFECT | Critical | High | ANNEX_AM §AM8.4 | CIP removal | 6-of-7 threshold with 5-member Plenum — mathematically impossible | Captured CIP member is irremovable; concurrent-ratification requirement becomes veto |
| L-015 | DEFECT | High | High | HC line 457 | Community alert | "Prima facie threshold" undefined; threshold determination is unreviewed | All incoming alerts classified below threshold; 90-day review never triggers |
| L-016 | DEFECT | Medium | High | subsidiarity_rule.md | Subsidiarity review | No maximum duration for inconclusive review | Procedural delay weaponized; matter in limbo indefinitely |
| L-017 | DEFECT | High | High | HC line 394 | Beneficial ownership | No verification mechanism for transparency obligation | Nominee beneficial owner declarations accepted without verification |
| L-018 | DEFECT | Medium | Medium | HC line 568 | Dual-channel prohibition | "Same obligation" not defined; no cross-channel detection system | Same productive activity submitted to two Annex X channels as nominally separate obligations |

---

## Recommendations for Phase 3

**Priority 1 — Fix before any activation (Critical/High defects that enable system-defeating exploits):**

1. **L-001:** Define minimum criteria for "qualified independent review body" — this is a single sentence gap in HC line 327 that can be patched with a reference to the Federated Ombuds appointment process.

2. **L-005:** Add a disambiguation header to INVARIANTS.md and to the first use of "Tier" in the Constitution's Amendment article. This is a one-paragraph addition.

3. **L-014:** Correct ANNEX_AM §AM8.4 CIP removal threshold from "6-of-7" to a mathematically possible fraction of the 5-member Plenum. Verify against the CIP membership definitions.

4. **L-004:** Align demurrage safe harbor: pick one figure (HC or ANNEX_J derivation), add a hierarchy note, publish the derivation where the operative figure lives.

5. **L-009:** Bind FC-040 and FC-041 as pre-activation founding commitments. Without bound penalty values, the above-ledger prohibition cannot be enforced.

**Priority 2 — Fix before first pilot enrollment:**

6. **L-008:** Add per-category floor requirements alongside the 70% aggregate basket rule.

7. **L-015:** Publish prima facie threshold criteria for community alert review triggers.

8. **L-017:** Designate a beneficial ownership verification authority with minimum methodology requirements.

9. **L-006:** Add corrective-effect standards to the recognized-contribution audit obligation.

10. **L-013:** Add deliberation-time floor and reasoning requirements for Tier 2 FAP approvals.

**Priority 3 — Fix before full operation:**

11. **L-002:** Define external-assignment rules for investment-channel auditor selection as a bound FC value.

12. **L-003:** Add a value ceiling to the working-tools succession exemption.

13. **L-007:** Bind a maximum initial Shared Storehouse activation duration as an FC value.

14. **L-011:** Add aggregate weekly receiver cap to the caregiver exception.

15. **L-016:** Add maximum duration for subsidiarity review inconclusion before default fires.

**Cross-cutting Phase 3 principle:** Every rule that says "as determined by [body]" or "meeting [undefined threshold]" without a published standard should be treated as a potential loophole. The corpus has strong anti-capture intent; its weakness is that many of its enforcement triggers are defined by the entities most likely to want them not to fire.

---

## Self-Review

| Dimension | Score (1–5) | Notes |
|---|---|---|
| **Coverage** | 4 | Major constitutional loophole categories covered. Emergency-power abuse, oracle capture, and governance capture are in separate domain reports — these are high-value loophole areas not duplicated here. |
| **Specificity** | 4 | Each finding includes file, section, exploit path, and minimal fix shape. A few findings (L-012, L-018) are Medium confidence because the exploit path depends on implementation details not fully visible in corpus text alone. |
| **Evidence** | 5 | Every finding is grounded in specific corpus text or Phase 1 finding IDs. No findings are inferred from general governance theory without corpus evidence. |
| **Adversarial Depth** | 4 | The seven-step adversarial chain was applied to each mechanism. Compound exploit paths (e.g., L-009 + L-013 combined to defeat convertibility enforcement entirely) are identified in the findings table but not fully elaborated — that depth belongs in `10-adversarial-simulations.md`. |
| **Actionability** | 4 | Each finding includes a minimal fix shape. Priority ordering in Recommendations distinguishes pre-activation from pre-enrollment from full-operation fixes. Some fixes are one-sentence corpus patches; others require binding FC values that depend on founding deliberation. |
| **Overall** | 4 | Solid adversarial audit covering the loophole domain. The main gap is compound-exploit elaboration and the fact that three critical domains (emergency powers, oracle capture, governance capture) are in separate reports not yet written. Phase 3 should not act on this report alone for those domains. |

No score is below 4.
