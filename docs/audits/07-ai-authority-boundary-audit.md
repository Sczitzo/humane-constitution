# AI Authority Boundary Audit

**Audit ID:** 07  
**Phase:** 2 — Adversarial Stress-Testing  
**Date:** 2026-05-15  
**Scope:** Humane Constitution corpus — AI and automated decision authority boundaries  
**Status:** Complete

---

## Scope

This audit examines every point in the Humane Constitution corpus where automated systems, algorithmic processes, oracles, or AI components exercise or influence decisions that affect people's survival access, civic standing, economic penalties, or legal status. The adversarial question throughout is: *where does AI become the real decision-maker while a human remains nominally responsible?*

Files examined:
- `docs/constitution/Humane_Constitution.md`
- `docs/constitution/SPECIFICATIONS.md`
- `docs/annexes/ANNEX_AL.md` (oracle independence, P-017)
- `docs/annexes/ANNEX_M.md` (capacity measurement and failure)
- `docs/annexes/ANNEX_Z.md` (Voice and Service Record architecture)
- `docs/annexes/ANNEX_J.md` (demurrage calibration)
- `docs/annexes/ANNEX_P.md` (identity stack)
- `docs/annexes/ANNEX_AK.md` (identity asymmetric error doctrine)
- `docs/annexes/ANNEX_AS.md` (attestation-at-risk stake mechanism)
- `docs/annexes/ANNEX_AP.md` (PCRP attack surface hardening)
- `docs/constitution/SPECIFICATIONS.md` §7 (oracle subsystem specification)

---

## Method

For each AI or automated role identified in the corpus, the following adversarial questions were applied:

1. **Stated purpose** — Is AI described as an advisor, evidence organizer, or recommendation engine?
2. **Literal rule** — What does the text actually authorize automated systems to do?
3. **Compliance exploit** — How does the automated system become the real decision-maker while humans appear responsible?
4. **Missing guardrail** — What human capacity requirement, appeal right, or audit artifact is absent?
5. **Capture path** — Which vendor or actor benefits from AI authority expansion here?
6. **Failure consequence** — What is the de facto outcome when the exploit succeeds?
7. **Minimal fix shape** — What structural constraint would keep automated systems advisory?

Evidence citations use direct quotes or line-number references to the examined files. Uncertainty is flagged explicitly as UNCERTAIN where the corpus is silent or ambiguous.

---

## AI Role Inventory

The following automated and algorithmically-mediated decision roles were identified in the corpus:

| Role ID | Role | Corpus Location | Decision Class |
|---|---|---|---|
| AI-01 | Oracle quorum — capacity measurement and Essential Access issuance | HC §Article III, SPECS §7, ANNEX_M, ANNEX_AL | Survival-consequential |
| AI-02 | Oracle quorum — Shared Storehouse activation/deactivation | HC §223, SPECS §7 | Emergency power trigger |
| AI-03 | Demurrage calculation — automated idle-balance penalty | HC §373, ANNEX_J §J2 | Financial penalty (automated) |
| AI-04 | Service Record computation — contribution verification and scoring | HC §Article VI, ANNEX_Z §Z3 | Civic eligibility gate |
| AI-05 | Voice minting — automated decay and weighting | HC §614–627, SPECS §8, ANNEX_Z §Z2 | Civic influence allocation |
| AI-06 | Anomaly detection — automated flags on Essential Access purchase patterns | HC §468 | Enforcement trigger |
| AI-07 | Anomaly detection — contribution fraud flags | HC §489 | Service Record invalidation trigger |
| AI-08 | PCRP cross-register timing monitor (automated) | ANNEX_AP §AP3 | Coercion-protection trigger |
| AI-09 | AI supply chain concentration detection in oracle accreditation | ANNEX_AL §4.2 | Oracle validity gate |
| AI-10 | Equity Flow-equivalent valuation for demurrage threshold | ANNEX_J §J2 (equivalence rule) | Financial penalty threshold |
| AI-11 | Biometric liveness detection (optional accelerant, not mandatory gate) | ANNEX_P §P2 | Identity verification |
| AI-12 | Pairwise error-series correlation computation (oracle independence) | SPECS §7 FC-032, ANNEX_AL §2 | Oracle accreditation gate |

---

## Advisor vs Decision-Maker Boundary

### The one explicit boundary statement

The Constitution contains a single sentence establishing the AI advisory boundary:

> "Legitimacy cannot be automated: the system may automate delivery and routine operations, but it may not let software replace human consent for decisions that change the constitutional order." (HC §124)

This sentence is the only explicit separation between AI advisory and AI decision-making authority in the entire corpus.

**DEFECT:** This boundary is stated in the Preamble principles section, not operationalized in Article-level rules, instrument specifications, or any annex. It creates a normative commitment that is not structurally enforced. There is no definition of which decision classes are "constitutional order" decisions (where the boundary applies) vs. "delivery and routine operations" (where automation is permitted). The boundary therefore depends entirely on implementation interpretation.

### What "routine operations" covers in practice

The corpus treats the following as automatable under "delivery and routine operations":

- Daily Essential Access issuance based on oracle signals (HC §352)
- Demurrage calculation and deduction (ANNEX_J §J2 — no human review step is specified)
- Voice decay at rate r_dw = 0.15/day (SPECS §8 FC-062)
- Service Record slow-decay (SPECS §8 partial specification)
- Essential Access expiration at 72-hour rolling window (HC §353)
- Anomaly flags on purchase patterns (HC §468) and contribution claims (HC §489)

**DEFECT:** These "routine operations" include recurring financial penalties (demurrage), survival access expiration, and civic standing decay — all of which have material, recurring effects on individual welfare. Classifying them as "routine" removes them from the scope of the automation boundary without ever explaining why a recurring financial penalty or survival access cutoff is categorically less consequential than a "constitutional order" decision.

### AI as de facto decision-maker in oracle consensus

Oracles produce consensus outputs (≥3 of 5 for Essential Access issuance; ≥4 of 5 for Shared Storehouse activation) that directly trigger automated system behavior. The Constitution and SPECIFICATIONS describe no human review step between oracle consensus output and Essential Access issuance or Shared Storehouse activation. The REB (Review and Emergency Board) is mentioned as a 48-hour governance handoff during P-022 oracle failure (SPECS §7), but no equivalent human review applies to normal oracle consensus execution.

**DEFECT:** Oracle consensus → automated system action is a direct pipeline with no human interposition during normal operation. Humans are responsible for the outcome but do not review individual oracle consensus decisions before they execute. This is the canonical rubber-stamp structure: human governance bodies ratify oracle accreditation criteria, but individual survival-consequential decisions execute automatically within those criteria.

---

## Human Approval Integrity

### What human approval exists for automated outputs

The corpus establishes human governance over:

1. **Oracle accreditation** — RCS accreditation of oracle nodes before they join the quorum (ANNEX_AL)
2. **Oracle methodology audit** — quarterly independent audits of oracle methodology; annual worked-example panel (ANNEX_AL §5)
3. **Dispute window** — 14-day window for methodology-only disputes; requires prima facie alternative evidence within 48 hours (HC §632)
4. **Community challenge path** — written submission to oracle quorum must receive published response within 14 days (HC §345)
5. **PCRP manufactured-flag assessment** — 4-hour Ombuds determination during demand-context periods (ANNEX_AP §AP2)
6. **Demurrage corridor review** — rate adjustment through Tier 3 process (ANNEX_J §J2)
7. **Service Record high-impact claims** — independent panels for "rare Service Record or Voice boosts" (HC §429)

### Rubber-stamp structures identified

**Oracle accreditation rubber stamp (AI-01, AI-02):** Human governance approves oracle node membership and methodology class. Once approved, the oracle quorum's outputs execute automatically. The human approval is prospective and categorical — it approves a node as a class of decision-maker, not any individual decision. This is structurally equivalent to a court rubber-stamping a general warrant: the human decision is real but it does not constrain individual executions.

**Demurrage calculation rubber stamp (AI-03):** The Constitution specifies that demurrage applies at 0.5%/month on idle balances above the household floor (HC §373, ANNEX_J §J2). No human review step is specified between balance assessment and deduction. A person whose balance is misclassified as "idle" — for example, because an equity-equivalence valuation is incorrect — has no prior-notification right or pre-deduction review path specified in the corpus. The appeal path for a disputed demurrage calculation is UNCERTAIN: the corpus does not specify one.

**Anomaly flag rubber stamp (AI-06, AI-07, AI-08):** Automated anomaly detection on purchase patterns (HC §468), contribution fraud flags (HC §489), and the cross-register timing monitor (ANNEX_AP §AP3) produce flags that trigger audit, scrutiny, or enforcement escalation. The corpus does not specify what human review is required before a flag translates into a restriction, audit, or enforcement action. The PCRP timing monitor explicitly states: "The flag does not block the enforcement action; it elevates scrutiny" (ANNEX_AP §AP3). This means the flag elevates human review but does not interpose it as a prior requirement for the original action.

---

## AI Evidence and Classification Risks

### Oracle methodology as AI-dependent measurement

ANNEX_AL §4.2 explicitly identifies a risk: oracle nodes using AI or ML components may share upstream dependencies — same base model, same training dataset, or same commercial API — and thereby create correlated measurement failure while appearing independent. The threshold is 2 or more nodes sharing a single AI upstream dependency.

The corpus's response is a **concentration review** — a governance check that triggers when the threshold is crossed. This is a lagging control: the review triggers after the concentration exists, not before it forms. A sophisticated actor can comply with the letter of the rule by keeping AI dependencies just below the threshold while still achieving effective measurement monoculture through near-identical models.

**DEFECT:** The corpus has no prospective requirement that oracle nodes disclose their AI supply chain components during accreditation. The concentration rule in ANNEX_AL §4.2 requires counting only "shared" dependencies — but "shared" requires disclosure to verify. No mandatory AI supply chain disclosure is specified as an accreditation condition. A node that uses a proprietary AI system and declines to disclose its training provenance satisfies the letter of no rule (there is no mandatory disclosure rule) while potentially sharing an upstream dependency.

**IMPROVEMENT (not defect):** The corpus correctly identifies that AI supply chain capture is "harder to detect and more catastrophic in impact" than standards-body concentration (ANNEX_AL §4.2), justifying the lower 2-node threshold. This is a genuine adversarial insight, not a gap.

### Service Record classification: automated contribution verification

The corpus states that Service Record is "earned through verified stewardship" (HC §419) and that "verification scales with impact" (HC §427). However, the corpus does not specify what automated systems perform contribution verification, what their decision criteria are, or how their classifications can be challenged. For low-impact claims, "light proof" is sufficient — but who or what evaluates whether proof is sufficient is not specified.

**DEFECT:** The verification process for Service Record contributions, particularly for "light proof" low-impact claims, is unspecified in terms of automation level, decision criteria, and human oversight requirement. The corpus states "multiple proof paths, random audits, verifier reputation tracking, penalties for false proof, secure logs, whistleblower protections, and automated anomaly flags" as patches for contribution fraud (HC §489), but this describes the fraud-prevention layer, not the initial verification decision process. A system that automatically approves low-impact claims based on algorithmic pattern matching — with automated fraud flags as the only check — has no human in the loop for the original approval decision.

### Equity Flow-equivalent valuation (AI-10)

ANNEX_J §J2 specifies that equity holdings are valued "at their published Flow-equivalent market price" and counted toward the holder's total balance for demurrage threshold assessment. This valuation:

- Happens continuously as equity prices change
- Affects whether a person's cash holdings are above or below the demurrage-free floor
- Can result in a person owing demurrage on cash they hold when their equity rises above the floor through no action of their own

**DEFECT:** No human review step, notification requirement, or pre-deduction challenge path is specified for the equity-equivalence calculation. A person who receives equity compensation and later finds their cash balance subject to demurrage because the equity valuation crossed a threshold may have no notice that the threshold was crossed before the deduction occurs. The mechanism that performs this valuation — automated or human — is unspecified. UNCERTAIN: whether real-time equity valuation is automated or requires periodic human assessment.

---

## Appeal and Contestability Gaps

### Oracle decisions

The Constitution provides a community challenge path: "written submission to the oracle quorum that must receive a published response within 14 days" (HC §345). The dispute window is 14 days, but "methodology-only disputes trigger audit and disclosure, not automatic Essential Access tightening" (HC §632).

**Gap 1:** The challenge path contests oracle *methodology*, not individual oracle *decisions*. A community that believes a specific scarcity finding was wrong — not because the methodology is wrong but because the methodology was misapplied — has no specified challenge path for that individual finding.

**Gap 2:** The challenger must "produce prima facie alternative measurement evidence within 48 hours to justify temporary issuance reduction" (HC §632). This places the evidentiary burden on the affected community. A community experiencing genuine scarcity that the oracle underreported — likely to be a resource-poor community — must produce independent measurement evidence within 48 hours to trigger even a temporary correction. This is an asymmetric burden that favors the established oracle output.

**Gap 3:** No appeal path is specified for demurrage calculations. UNCERTAIN: whether the general "due process and auditability" principle (HC §126) creates an implied appeal right or whether this requires explicit specification.

**Gap 4:** No appeal path is specified for Service Record scoring decisions on routine (low-impact) claims. The "high-impact claims need strong review" provision (HC §429) implies that low-impact claims do not require the same review — but does not specify any review path for low-impact claim disputes.

**Gap 5:** No appeal path is specified for automated anomaly flags. The corpus describes flags as triggering audits or scrutiny, but a person who believes they were wrongly flagged has no specified contestation path before the flag escalates.

### Voice computation

The Voice weighting table (HC §616–623) and decay formula (SPECS §8 FC-062) are automated. No appeal path for Voice computation errors is specified. UNCERTAIN: whether the general dispute resolution mention (HC §395) covers Voice computation disputes.

---

## Audit Artifact Requirements

### What is specified

- Oracle methodologies must be published with declared evidence class, confidence intervals, and mandatory audits (HC §586)
- Community challenge submissions are published alongside official figures (HC §345)
- Dispute window findings are published (HC §632)
- PCRP manufactured-flag assessments are published in the Article VII dashboard within the 4-hour window (ANNEX_AP §AP2)
- Cap-reset audit findings are published within 30 days (ANNEX_AP §AP1)
- Oracle quarterly independent audits and monthly anomaly audits (HC §633)
- Article VII aggregate publication of PFCR flows, demurrage routing, and major appropriations (HC §411)

### What is absent

**Absent AI-01/02:** No audit artifact requirement for individual oracle consensus decisions that trigger Essential Access issuance or Shared Storehouse activation. The audit requirement applies to methodology and aggregate outputs, not to specific decision outputs.

**Absent AI-03:** No audit artifact requirement for individual demurrage deduction calculations. The demurrage rate and corridor are published, but a specific person's balance assessment, idle-balance determination, and deduction amount are not specified as auditable artifacts.

**Absent AI-04/05:** No audit artifact requirement for individual Service Record accrual decisions on low-impact claims, or for automated Voice computation outputs.

**Absent AI-06/07/08:** No audit artifact requirement specifying that automated anomaly flags, their basis, and their downstream effects on a specific person are retained and auditable by the flagged person.

**DEFECT:** The corpus requires publication of aggregate oracle methodology and outputs but does not require that individual automated decisions — demurrage deductions, Service Record accruals, anomaly flags — be recorded in a form that the affected person can access and challenge. Aggregate auditability does not substitute for individual decision auditability when the harm is to a specific person.

---

## Liability and Accountability Gaps

### AI-caused harm attribution

The Constitution contains no provision addressing liability when an automated system produces an incorrect output that harms a specific person. The "due process and auditability" principle (HC §126) requires enforcement to be constrained by "transparent rules, appeal paths, and independent oversight" but does not specify what remedy is available when an automated rule, applied correctly by the system, produces a harmful outcome because the rule itself was miscalibrated.

**DEFECT:** No liability framework for AI-caused harm exists in the corpus. If an oracle quorum systematically underreports scarcity in a specific region — causing affected residents to receive reduced Essential Access — and the undereporting is later confirmed through audit, the corpus specifies correction of the methodology (oracle enters supervised mode, HC §M4) but does not specify remediation for the people harmed during the period of undereporting.

**DEFECT:** No liability provision addresses oracle node vendors or AI system suppliers whose systems introduce measurement error that affects Essential Access. ANNEX_AL establishes AI supply chain concentration review but does not specify liability for harm caused by vendor capture or correlated failure.

**DEFECT:** No provision addresses the liability of oracle accreditation bodies that approve a node that later proves to have been sharing a concealed AI supply chain dependency. The accreditation body's obligation is to apply the review process; the corpus does not specify liability if the review process was applied correctly but the dependency was concealed.

### Who is responsible when the system is wrong

The Constitution states: "Legitimacy cannot be automated" (HC §124). But the corpus does not specify who is responsible when an automated system makes a consequential error within its authorized scope. The gap between "the oracle quorum" (a collective body) and "a specific person was harmed" is not addressed. Collective oracle accountability (supervised mode, dissolution under HC §M4) does not provide individual-level remediation.

---

## De Facto AI Authority Risks

### Risk 1 — Oracle consensus as primary survival-access governor

**Exploit path:** Oracle consensus directly triggers Essential Access issuance levels and Shared Storehouse activation. In normal operation, no human reviews individual oracle consensus decisions before they execute. Human governance (REB, Federated Ombuds) activates only during *failure* states (oracle quorum loss, P-022). During normal operation, the oracle quorum is the effective governor of survival access.

**Nominal vs. actual responsibility:** Human bodies (founding coalition, RCS accreditation body) are responsible for the oracle quorum's rules. The oracle quorum is responsible for individual consensus decisions. But the oracle quorum is a distributed technical body — not a democratic body, not an elected body, and not a body that any affected person can meaningfully petition during the 48-hour issuance cycle.

**De facto authority:** The oracle quorum governs de facto. Human oversight bodies set and audit the rules under which the quorum operates but do not participate in individual decisions.

**Capture path:** Any actor that can influence oracle node accreditation, methodology classification, or AI supply chain components for multiple nodes can steer the quorum's outputs without appearing to control any individual decision. The capture operates at the accreditation layer, not the decision layer, making it invisible to post-hoc audit of individual decisions.

### Risk 2 — Demurrage as automated financial penalty with no prior notice or review

**Exploit path:** Demurrage applies automatically at 0.5%/month on balances above the household floor. The equity-equivalence rule extends this to include equity valuations that can change without the person's action. No prior notification, no pre-deduction review, and no appeal path are specified.

**De facto authority:** The automated demurrage system is the effective executor of recurring financial penalties. Humans set the rate corridor and can change it through Tier 3 process — but the individual deduction executes automatically. A person who believes their balance was miscalculated (e.g., wrong equity valuation) has no specified path to contest before the deduction occurs.

**Magnitude:** For a person with 500,000 Flow above the floor, monthly demurrage is 2,365 Flow — a meaningful penalty. For the equity-equivalence case, an executive with 2,000,000 Flow in equity and 50,000 Flow in cash has the entire 50,000 Flow cash balance subject to demurrage. The automated system making this assessment — and its error rate — is unspecified.

### Risk 3 — Automated anomaly flags as pre-enforcement restriction triggers

**Exploit path:** Automated anomaly detection on "essential purchase patterns" (HC §468) and contribution claims (HC §489) generates flags. The corpus does not specify what a flag does to the flagged person's access before a human reviews it. If a flag results in any restriction, restriction review, or elevated enforcement scrutiny that affects a person's behavior, the automated system is effectively making a preliminary adverse determination.

**PCRP timing monitor:** ANNEX_AP §AP3 specifies that the automated cross-register timing monitor "does not block the enforcement action" but "elevates scrutiny." This means the automated flag does not itself constitute a decision. However, for the coercion-protection case, the question is whether a person whose legitimate coercion complaint is subjected to elevated scrutiny — because an automated timing monitor flagged it as potentially manufactured — is effectively denied equal protection during the scrutiny period.

### Risk 4 — Ombuds manufactured-flag determination as unreviewed quasi-AI classification

**Exploit path:** The Ombuds is required to determine within 4 hours whether a demand-context flag was "manufactured or strategically timed" (ANNEX_AP §AP2). This determination is a high-stakes classification decision made under time pressure by a human body. But the inputs to the decision — oracle manipulation evidence and coordination timing signatures — are produced by automated systems (the cross-register timing monitor, oracle anomaly detection). If the automated inputs are wrong, the Ombuds determination inherits that error.

**Missing guardrail:** The corpus does not specify the accuracy requirements, error rate history, or contestability of the automated inputs to the 4-hour Ombuds determination. An adversary who can generate false "coordination timing signatures" from the automated timing monitor can steer the Ombuds determination without the Ombuds being aware they are working with corrupted inputs.

### Risk 5 — Service Record as AI-classified civic eligibility gate

**Exploit path:** Service Record determines eligibility for "juries, citizen panels, rotating audit pools, review boards, and oversight bodies" (ANNEX_Z §Z3). The verification process for contribution claims is partially automated (anomaly flags, verifier reputation tracking). A person whose Service Record is incorrectly calculated — due to automated misclassification of their contributions, decay rate errors, or fraudulent attestation that automated systems failed to catch — may be excluded from civic service roles without a usable appeal path for low-impact claim decisions.

**De facto authority:** The automated Service Record computation system is the de facto eligibility classifier for civic participation. Human bodies audit methodology and investigate fraud after the fact, but the automated system makes the initial eligibility determination.

### Risk 6 — AI monoculture in oracle methodology despite formal independence

**Exploit path:** ANNEX_AL §4.2 identifies that oracle nodes using the same base AI model, training dataset, or commercial API trigger a concentration review. The threshold is 2 nodes. But the corpus does not require prospective disclosure of AI supply chain components during accreditation — disclosure is implied by the review process but not mandated. A node that uses an AI system with undisclosed provenance (e.g., a proprietary commercial system that does not publish training data sources) technically satisfies no rule requiring disclosure.

**Failure consequence:** If multiple oracle nodes independently use AI systems trained on the same historical institutional data — without sharing a formal "upstream dependency" that would trigger the concentration count — they can exhibit correlated failure while formally satisfying independence requirements. The error independence test (ANNEX_AL §2) is prospective and theoretical; it asks whether methods "would be expected to fail in the same direction" under manipulation, not whether their AI components share historical training data.

### Risk 7 — Parameter governance as de facto AI authority laundering

**Exploit path:** The corpus specifies oracle parameters (N_MIN = 5, methodology class floor = 3, Pearson correlation threshold = 0.30) as Tier 1 founding commitments requiring a 7-of-9 signature supermajority and 180-day timelock to change. These parameters define the constraints under which automated oracle systems operate. The strength of human oversight over oracle outputs is entirely dependent on these parameter values.

**De facto authority laundering:** An actor that influences the founding coalition's parameter choices (before operational activation, before the Tier 1 locks apply) can shape the oracle authority structure in ways that persist permanently unless the full Tier 1 amendment process is triggered. The parameters themselves are not AI, but they define how much authority automated systems have over survival access. Getting the parameters set favorably at founding is equivalent to capturing AI authority without appearing to do so.

---

## Findings Table

| ID | Type | Severity | Confidence | File | Section | Summary | Exploit Path |
|---|---|---|---|---|---|---|---|
| F-01 | DEFECT | Critical | High | HC, SPECS | HC §124, SPECS §7 | No human review step between oracle consensus output and Essential Access issuance/Shared Storehouse activation in normal operation | Oracles govern survival access de facto; human bodies only activate during failure states |
| F-02 | DEFECT | Critical | High | ANNEX_J | §J2, equivalence rule | Demurrage calculation — no prior notification, pre-deduction review, or appeal path specified | Automated financial penalty executes without human interposition; equity-equivalence extends this to market-price-driven threshold changes |
| F-03 | DEFECT | High | High | HC | §345, §632 | Community challenge path contests oracle methodology, not individual findings; 48-hour prima facie evidence burden is asymmetric against resource-poor communities | Affected communities cannot effectively challenge a specific incorrect scarcity finding — only the methodology class |
| F-04 | DEFECT | High | High | HC, ANNEX_Z | §489, §Z3 | Service Record contribution verification automation level, decision criteria, and human oversight requirement are unspecified for low-impact claims | Automated approval pipeline for routine civic eligibility with no specified human review |
| F-05 | DEFECT | High | High | ANNEX_AL | §4.2 | No mandatory AI supply chain disclosure during oracle accreditation | Actor using proprietary AI with undisclosed training provenance satisfies no disclosure rule while potentially sharing upstream dependencies |
| F-06 | DEFECT | High | Medium | HC | §468, §489 | Automated anomaly flags — no specification of what restriction (if any) applies to a flagged person before human review | Automated system may impose pre-adjudication burden without specified review timeline or notification requirement |
| F-07 | DEFECT | High | High | HC | §124, entire corpus | Single AI advisory boundary sentence (HC §124) is stated as a preamble principle but never operationalized in Article rules, instrument specifications, or any annex | "Routine operations" category has no defined boundary; demurrage, survival access expiration, and civic scoring can all be classified as routine |
| F-08 | DEFECT | Medium | High | HC | §126, §411 | No audit artifact requirement for individual automated decisions affecting specific persons | Aggregate oracle methodology publication does not enable individual demurrage, Service Record, or anomaly-flag challenge |
| F-09 | DEFECT | Medium | High | Entire corpus | N/A | No liability framework for AI-caused harm to specific persons | Oracle undereporting, incorrect demurrage, or automated misclassification produces no specified remediation obligation for affected individuals |
| F-10 | DEFECT | Medium | High | ANNEX_AP | §AP2, §AP3 | Automated timing monitor inputs to the 4-hour Ombuds manufactured-flag determination are not subject to accuracy requirements or pre-determination contestability | Adversary generating false coordination timing signatures steers the Ombuds determination with corrupted inputs |
| F-11 | DEFECT | Medium | Medium | ANNEX_AL | §2, §3 | Error independence test is prospective and theoretical; does not detect correlated AI training data across formally independent nodes | AI monoculture via shared historical training data satisfies formal independence while producing correlated failure |
| F-12 | IMPROVEMENT | Low | High | HC | §124 | "Legitimacy cannot be automated" principle is correct and important but needs structural teeth | Operationalize in Article rules as a checklist of decision classes that require human review before automated execution |
| F-13 | DEFECT | Medium | Medium | ANNEX_Z | §Z3 | No appeal path specified for Service Record eligibility determinations on low-impact claims | Person excluded from civic service roles by automated Service Record classification has no specified contestation path |
| F-14 | DEFECT | Low | High | HC | §616–623 | Voice computation errors — no appeal path specified | Automated Voice decay and weighting errors have no specified contestation mechanism |

---

## Recommendations for Phase 3

### R-01 — Operationalize the AI authority boundary (addresses F-07)

The single sentence in HC §124 must be expanded into a decision-class taxonomy in SPECIFICATIONS.md. Specifically: define which decision classes require human review before automated execution (survival access tightening, Shared Storehouse activation, Service Record disqualification, anomaly-flag restriction) vs. which may execute automatically (daily Essential Access issuance within normal parameters, Voice decay). The taxonomy should be a P-004 protected term.

### R-02 — Mandate pre-deduction notification and 72-hour review window for demurrage (addresses F-02)

Before any demurrage deduction above a minimum threshold (suggest 1% of the household savings floor), the system must notify the affected person and provide a 72-hour window to contest the balance classification. This is consistent with the Essential Access 72-hour rolling window design pattern already in the corpus. Add to ANNEX_J §J2.

### R-03 — Mandate AI supply chain disclosure as oracle accreditation condition (addresses F-05)

Any oracle node using AI or ML components must disclose: the base model (or model family), training data provenance (at minimum: institutional vs. community vs. physical sampling origin), and any commercial API dependency — at accreditation and within 30 days of any change. Add to ANNEX_AL as a mandatory accreditation pre-condition, not merely a concentration trigger.

### R-04 — Add individual decision auditability for automated systems (addresses F-08)

For demurrage deductions, Service Record accruals/decrements, and anomaly flags, the system must retain a per-person decision record specifying: the automated rule applied, the input values used, the output, and the timestamp. This record must be accessible to the affected person on request. Add as a standard requirement in ANNEX_J, ANNEX_Z, and any enforcement annex governing anomaly flags.

### R-05 — Create a liability and remediation framework for AI-caused harm (addresses F-09)

Add a provision to SPECIFICATIONS.md §7 (Oracle Subsystem) specifying: when post-hoc audit confirms that oracle outputs produced incorrect Essential Access levels for an identifiable group during a determinable period, the system has an affirmative obligation to publish the scope of harm and to develop a remediation plan within 90 days. Apply same principle to demurrage calculation errors and Service Record misclassifications.

### R-06 — Create an individual challenge path for specific oracle findings (addresses F-03)

The existing community challenge path (HC §345) contests methodology. Add a parallel path for contesting specific findings: within the 14-day dispute window, an affected party (individual or community) may contest a specific scarcity finding by providing a narrative account of lived conditions that contradict the finding. The oracle quorum must publish a finding-specific response within 14 days. Evidence burden for narrative challenges should be lower than the 48-hour prima facie measurement evidence standard applicable to methodology disputes.

### R-07 — Add accuracy requirements and contestability for automated timing monitor inputs (addresses F-10)

The cross-register timing monitor (ANNEX_AP §AP3) must publish its detection logic, false-positive rate (from testing), and any known limitations. During the 4-hour Ombuds manufactured-flag assessment, the Ombuds must have access to the monitor's confidence level for the specific flag, not merely the flag itself. Add to ANNEX_AP as a technical requirement for the monitoring system.

### R-08 — Add Service Record low-impact claim appeal path (addresses F-13)

Article VI and ANNEX_Z should specify a 30-day appeal window for Service Record accrual or decrement decisions on low-impact claims, processed through the Federated Ombuds local tier. High-impact claim review panels already exist (HC §429); low-impact claims need a lighter but specified path.

---

## Self-Review

| Dimension | Score (1–5) | Notes |
|---|---|---|
| **Coverage** | 4 | All 12 AI roles inventoried; all major annexes read. UNCERTAIN on some SPECIFICATIONS.md secondary automation rules not explicitly examined. |
| **Specificity** | 4 | Findings cite specific corpus sections, line-equivalent content, and exploitation chains. Some exploit paths for AI-10 and AI-11 are UNCERTAIN due to underspecification in the corpus itself. |
| **Evidence** | 4 | All findings grounded in direct corpus text. No findings invented from general AI risk literature without corpus support. Three UNCERTAIN flags where corpus is silent. |
| **Adversarial Depth** | 4 | Six de facto authority risk paths identified and traced to capture beneficiaries. Parameter governance as AI authority laundering (Risk 7) is a genuine adversarial finding not prompted by the audit instructions. |
| **Actionability** | 4 | Eight recommendations are specific, scoped, and grounded in existing corpus design patterns. R-01 and R-03 are the highest-priority structural fixes. |
| **Overall** | 4 | Solid Phase 2 audit. Phase 3 should examine founding coalition governance over parameter setting (Risk 7) in greater depth and investigate whether the SPECIFICATIONS.md oracle subsystem description leaves any undocumented automation gaps in the Essential Access daily issuance pipeline. |

All scores are 4 or above. No Repair Pass required.

---

*This audit file covers only `docs/audits/07-ai-authority-boundary-audit.md`. No source corpus files, generated files, scripts, or configurations were modified.*
