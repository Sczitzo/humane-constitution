# Rights, Remedies, and Enforcement Audit

**Phase:** 2 — Adversarial Stress-Testing
**Date:** 2026-05-15
**Auditor:** Claude Code (claude-sonnet-4-6)
**Scope files:** `docs/constitution/Humane_Constitution.md`, `docs/annexes/ANNEX_L.md`, `docs/annexes/ANNEX_AI.md`, `docs/annexes/ANNEX_AW.md`, `docs/governance/Jurisdiction_Interface_Clause.md`, `docs/audits/00-phase1-findings-index.json`

---

## Scope

This audit answers one question for each constitutional right or duty: **if someone violates it, what actually happens?** It applies the Phase 2 adversarial method to the rights, remedies, enforcement chains, appeal paths, and accountability owners visible in the Humane Constitution and its annexes. It does not modify any source file.

Rights examined:
- Unconditional survival / Essential Access guarantee
- Identity and personhood continuity
- Freedom of conscience and worship
- Reporter/whistleblower protection (AW)
- Community alert pathway (Article VII)
- Appeal and review rights
- Exit rights
- Anti-discrimination protections in housing allocation
- Privacy / anti-surveillance right
- Voice and Service Record attribution rights
- Anti-conversion (instrument separation) rules
- Keyholder removal rights

---

## Method

For each right or duty the adversarial method asks:

1. **Stated protection:** what is guaranteed?
2. **Literal rule:** who owns enforcement? what evidence is needed?
3. **Exploit:** how does a violator appear compliant while defeating the right?
4. **Missing element:** what accountability owner, evidence standard, appeal path, or consequence is absent?
5. **Capture path:** who benefits from the gap?
6. **Failure consequence:** the person harmed has no remedy; the duty-holder faces no consequence.
7. **Minimal fix shape.**

Evidence gathered by read-only inspection of corpus files. All findings are grounded in observed text. UNCERTAIN is used where the evidence is ambiguous or the relevant section has not been fully read. Findings are classified DEFECT (structural problem requiring remediation) or IMPROVEMENT (hardening that would strengthen an adequate but weak provision).

---

## Rights and Safeguards Inventory

The following rights or protections were identified in the corpus:

| # | Right / Protection | Primary Source | Enforcement Mechanism Cited | Enforcement Owner Named |
|---|---|---|---|---|
| R-01 | Survival is unconditional; Essential Access cannot be withheld | HC §114–115, §314 | Service ombuds + rapid benefit review; regional court | Service ombuds (UNCERTAIN — not constituted in core articles) |
| R-02 | Delivery Sufficiency Register; named accountable party per population | HC §359; Annex AY | Quarterly publication obligation; Ombuds verification | Named "responsible party" (UNCERTAIN — not a constituted office) |
| R-03 | Identity continuity; layered identity; no single irreversible source | HC §245, §336 | Administrative identity tribunal; independent personhood court | UNCERTAIN — no annex constitutes identity tribunals |
| R-04 | Freedom of conscience and worship; protected space | HC §178, §180 | None specified | None named |
| R-05 | Reporter protection against retaliation | HC §459; Annex AW | Administrative freeze on filing; Federated Ombuds within 45 days | Federated Ombuds (constituted in Annex AI) |
| R-06 | Community alert pathway; 30-day acknowledgment; 90-day formal review | HC §457 | Published acknowledgment obligation; Article VII integrity dashboard | UNCERTAIN — no office named as duty-holder for acknowledgment obligation |
| R-07 | Appeal path for adverse decisions | HC §126, §317; ANNEX_L §L6 | Local Review Office → Regional Chamber → CRP | CRP (constituted in ANNEX_L) |
| R-08 | Exit rights; Essential Access continues during 730-day transition | HC §305 | 730-day transition; no exit tax; no forfeiture | UNCERTAIN — no enforcement owner if transition obligations are not honored |
| R-09 | Anti-discrimination in housing allocation; protected-trait proxies prohibited | HC §551 | Housing review panel (UNCERTAIN) | UNCERTAIN |
| R-10 | Privacy / individual transaction privacy by default; lawful access only | HC §552 | "Due process with narrow scope, logging, and independent oversight" | UNCERTAIN — no office named |
| R-11 | Voice / Service Record cannot be traded, inherited, or used as collateral | HC §219, §421 | Audit and published correction within 60 days | UNCERTAIN — auditor identity not specified |
| R-12 | Keyholder removal when acting in self-interest | HC §327 | Independent review body may petition | UNCERTAIN — no independent review body constituted for this function |
| R-13 | Amendment validity requires CIP concurrent ratification | ANNEX_AM §AM8.6 (via P-051) | UNCERTAIN — not in Constitution core text | Not in Constitution (P1-IC-008) |
| R-14 | CIP member removal | ANNEX_AM §AM8.4 | 6-of-7 Federated Ombuds Plenum vote | Mathematically impossible: Plenum has 5 members (P1-IC-011) |
| R-15 | Instrument separation; no conversion between Essential Access, Voice, Flow | HC §224 | Audit and published correction within 60 days | UNCERTAIN — same gap as R-11 |

---

## Remedy Gaps

### RG-01: ANNEX_L §L5 lists remedy types but provides no selection criteria (carries forward P1-TF-016)

ANNEX_L §L5 states: "Available remedies include stay, reclassification upward, nullification, partial severance, rollback to last-known-valid rule, compensatory continuity order, and targeted institutional sanctions." No criteria determine which remedy applies to which class of violation. The same structural violation can receive a stay in one forum and nullification in another. Discretionary remedy selection without criteria means:
- Identity of the reviewing body determines outcome, not severity of harm.
- A forum that is sympathetic to the violator chooses the weakest remedy (stay rather than rollback).
- A victim who suffers complete Essential Access loss may receive a "compensatory continuity order" (forward-looking) rather than "arrears / restitution" (backward-looking) depending on which forum receives the case.

**DEFECT** (carries forward P1-TF-016). Minimal fix: add a priority-ordering table to §L5 tying remedy type to violation severity and harm class.

### RG-02: Financial / damages remedy type undefined for most rights

ANNEX_L §L6 lists "damages for wrongful denial" for identity disputes and "arrears / restitution" for Essential Access disputes. For all other rights (freedom of conscience, privacy, anti-discrimination in housing, Voice/Service Record attribution), the remedy table lists no financial remedy. This is not merely an improvement opportunity — the absence of a damages-equivalent remedy for privacy violations, discrimination in housing, and conscience violations means a rights-holder who suffers a real, measurable harm from those violations cannot recover it through any constitutional path.

**DEFECT.** Minimal fix: extend the §L6 remedy table to cover privacy, conscience, housing discrimination, and Voice/Service Record violations, naming at minimum whether a compensatory remedy is available and who bears the cost.

### RG-03: "Immediate restoration" for Essential Access — no enforcement timeline

ANNEX_L §L6 says remedies for Essential Access delivery failures include "immediate restoration." The word "immediate" is not defined. No 24-hour or 48-hour clock appears in ANNEX_L for this remedy. The Constitution's general statement that "emergency relief windows should be measured in hours or days, not months" (ANNEX_L §L6 footer) is aspirational language, not a binding deadline. A service ombuds who takes 30 days to restore a wrongfully denied Essential Access allocation does not violate any specified rule.

**DEFECT.** Minimal fix: set a maximum clock (e.g., 48 hours for emergency restoration, 14 days for full remedy) in §L6 or in the Essential Access delivery annex.

### RG-04: No remedy exists for CIP removal impossibility (carries forward P1-IC-011)

ANNEX_AM §AM8.4 requires a "6-of-7 vote of the Federated Ombuds Plenum" to remove a CIP member. The Plenum has 5 members (FC-090). The threshold is mathematically impossible to reach. Consequence: a captured CIP member cannot be removed through any constitutional path. There is no fallback mechanism, no alternative threshold, and no path to the CRP or external review. This is an irremovable enforcement actor — the worst possible gap in an oversight chain.

**DEFECT** (confirmed; P1-IC-011). No minimal fix possible without amending ANNEX_AM §AM8.4.

---

## Enforcement Gaps

### EG-01: Core enforcement mechanism has no procedural floor in the Constitution (carries forward P1-TF-005)

The Constitution references "enforcement" at HC §126, §317, and §382 but specifies only that it must be "constrained by transparent rules, appeal paths, and independent oversight." No article establishes: (a) who initiates enforcement, (b) what trigger standard applies (complaint, audit finding, threshold breach), (c) what notice is required before enforcement action, (d) what procedural floor applies. An enforcement action that skips notice, proceeds without evidence, and carries no appeal path satisfies the constitutional text as written, because none of those floor requirements exist in core articles.

**DEFECT** (carries forward P1-TF-005). Minimal fix: Article I or VIII should contain a minimum enforcement procedure floor cross-referenced to the relevant annex.

### EG-02: Freedom of conscience has no enforcement owner and no annex

HC §178 and §180 guarantee "protected space to seek, worship, obey, and serve God according to conscience" and prohibit "religious scoring, forced worship, forced statements of belief, or state management of salvation." No annex constitutes a body with jurisdiction over conscience violations. No enforcement mechanism is named. The CRP's jurisdiction (ANNEX_L §L1) covers "amendment classification, Tier 1/Tier 2 drift, instrument separation" — not freedom of conscience violations. No dispute class in the §L6 table covers religious freedom or conscience.

**DEFECT.** This is not an IMPROVEMENT observation: there is literally no enforcement path for a stated constitutional right. Minimal fix: add "freedom of conscience / religious freedom" as a dispute class in §L6 with a named initial review body and appeal path.

### EG-03: Community alert pathway — duty to acknowledge has no named duty-holder

HC §457 states: "Every community alert must receive a published acknowledgment within 30 days. Alerts that meet a basic prima facie threshold for systemic failure must trigger a formal review within 90 days." Neither the Constitution nor ANNEX_AI names the institutional actor with the duty to publish the 30-day acknowledgment. The "refusal to acknowledge or review is itself a reportable failure" — but the failure is reported to the same system that failed to acknowledge in the first place. The community alert pathway bootstraps itself: noncompliance is a violation, but the violation-reporting path uses the same channel that was not used.

**DEFECT.** Minimal fix: name the Federated Ombuds (or a specific sub-node) as the duty-holder for the 30-day acknowledgment, and establish that failure to acknowledge triggers automatic escalation to the full Plenum (not a new community alert).

### EG-04: CIP concurrent ratification invisible in the Constitution (carries forward P1-IC-008)

P-051 (ACTIVE, ANNEX_AM §AM8.6) requires CIP concurrent ratification for all Tier 1 amendments. Neither the Constitution nor `architecture/amendment_protocol.md` mentions this requirement. An actor reading only the Constitution and executing a Tier 1 amendment by the book produces a void amendment without knowing it. An actor who knows about §AM8.6 and wants to void a legitimate amendment can retroactively challenge it as procedurally defective. The right to rely on the constitutional amendment process as stated is defeated by an annex that is not cross-referenced.

**DEFECT** (confirmed; P1-IC-008). Minimal fix: add a CIP concurrent ratification note to the Tier 1 amendment clause in the Constitution and in `architecture/amendment_protocol.md`.

### EG-05: Concentration limit evasion in founding capital has no enforcement mechanism

`docs/governance/Founding_Capital_Framework.md` §152 acknowledges: "A funder with affiliated foundations, family offices, or corporate subsidiaries can route contributions through multiple entities to stay below the per-funder threshold while controlling a larger share of total capital. The framework requires a good-faith affiliation disclosure from each funder, but it has no enforcement mechanism beyond that disclosure." A captured founding capital structure means the rights established by the Constitution are governed by an institution that owes its formation to a funder who evaded the concentration limit. This is a pre-constitutional enforcement gap that undermines every downstream right.

**DEFECT.** Minimal fix: the Capital Steward must conduct independent affiliation verification (not rely solely on self-disclosure) before accepting any commitment that would bring a funder group above 15% of committed capital.

---

## Appeal and Review Gaps

### ARG-01: Appeal paths have no minimum procedural floor in core articles (carries forward P1-TF-011)

HC §126 and §317 promise "appeal paths" as a feature of enforcement. ANNEX_L §L6 provides a dispute table with appeal paths mapped to dispute classes. However: (a) the dispute table covers only six named classes — a constitutional violation outside those six classes has no specified appeal path; (b) no minimum timeline for appeal decisions appears in the Constitution or in ANNEX_L outside of aspirational language ("hours or days"); (c) standing requirements for appeal (who may bring an appeal, in what form, with what evidence) are not defined.

Exploit path: an adverse decision outside the six named dispute classes is appealed to "Local Review Office." The Local Review Office declines jurisdiction on the ground that no dispute class applies. The matter is not appealable to a Regional Chamber without a dispute-class match. The affected person has a constitutional right to appeal but no procedural path to exercise it.

**DEFECT** (carries forward P1-TF-011). Minimal fix: add a catch-all dispute class to §L6 covering "any adverse decision with constitutional rights implications not captured in named categories," with a generic appeal path and timeline.

### ARG-02: Appeal of Federated Ombuds enforcement decisions has a 30-day window but no specified forum above the Plenum

ANNEX_AI §4.2 states that parties subject to a Graduated Penalty may appeal to the "Federation" within 30 days, with the Plenum deciding under FC-091 (4-of-5 to overturn). There is no appeal above the Plenum for enforcement decisions. If the Plenum itself is alleged to have made a procedurally defective decision, no appeal path is specified. The CRP's jurisdiction does not include Ombuds enforcement decisions (ANNEX_L §L1 covers "amendment classification, Tier 1/Tier 2 drift, instrument separation"). This creates a final jurisdiction gap: Ombuds enforcement decisions are unreviewable above the Plenum.

**DEFECT.** Minimal fix: specify that CRP has residual jurisdiction over Federated Ombuds enforcement decisions where a structural or Tier 1 rights claim is raised.

### ARG-03: Retaliation finding appeal period undefined

ANNEX_AW §AW2.2 requires the Federated Ombuds to publish a retaliation finding within 45 days. ANNEX_AW §AW3.3 states that the protected period ends when the Federated Ombuds publishes a final finding and "a 30-day appeal window closes." No procedure is defined for who may appeal a retaliation finding, to what forum, and with what standing. A named respondent who received a retaliation finding has 30 days to appeal — to an unspecified forum. A protected reporter who is dissatisfied with an incomplete finding also has 30 days — to the same unspecified forum. In practice the appeal path is whatever the reviewing institution decides.

**DEFECT.** Minimal fix: name the appeal forum for AW findings (likely Regional Constitutional Chamber) and define standing for both reporters and respondents.

---

## Accountability Owner Gaps

### AOG-01: "Audit and published correction within 60 days" for Voice/Service Record / conversion violations has no named auditor

HC §219 states: "Any evidence of [Voice or Service Record misuse] must trigger audit and published correction within 60 days." No actor is named as the trigger-owner. No actor is named as the auditor. No actor bears the duty to initiate the audit when evidence appears. The passive construction ("must trigger") creates a duty with no holder. The same gap appears in HC §323 for Voice/Flow coercion: "must trigger immediate independent review and published findings within 30 days." The independence of the review is not secured because the reviewer is not named.

**DEFECT.** Minimal fix: name the Federated Ombuds as the trigger-owner and the named auditor for HC §219 and HC §323, or cross-reference the relevant annex.

### AOG-02: "Recognized-contribution audit" correction publisher is unnamed

HC §430 requires that when gaps in contribution recognition are found, "corrections to the contribution-recognition framework must be published within 180 days." No actor is named as responsible for publishing the correction. Audit findings are the output of the biennial audit body; but corrections to the framework require someone with authority to amend the framework. The Constitution does not identify who that is.

**DEFECT.** Minimal fix: name the body with authority to publish framework corrections and specify the review path if that body declines to act.

### AOG-03: Keyholder removal petitioner is unnamed

HC §327 states: "the amendment protocol must include a mechanism by which a qualified independent review body may petition for the replacement of any keyholder found to be acting in demonstrable self-interest." No such mechanism exists in `architecture/amendment_protocol.md` or in any annex. The "qualified independent review body" is not identified. No criteria define "demonstrable self-interest." The right to challenge a self-interested keyholder is purely nominal.

**DEFECT.** Minimal fix: name the CRP as the petitioning body; define "demonstrable self-interest" in ANNEX_H or the amendment protocol; specify the threshold and consequence.

### AOG-04: Delivery Sufficiency Register "responsible party" is not a constituted office

HC §359 requires each population in the Delivery Sufficiency Register to have "a named accountable party." ANNEX_AY elaborates this as a "named institutional actor accountable for maintaining the delivery path." This actor is named per-population in the Register — it is not a pre-constituted office. A "responsible party" who does not perform has no specified consequence. The Register names a timeline and a mechanism; there is no answer to: "what happens when the responsible party misses the deadline?"

**DEFECT.** Minimal fix: specify that a responsible party who misses a quarterly Register update triggers automatic escalation to the Federated Ombuds, with a correction-or-replacement obligation within 90 days.

---

## Timeline and Jurisdiction Gaps

### TJG-01: The pilot operates no court; "court order" means external court (Jurisdiction Interface Clause §1.4)

The Jurisdiction Interface Clause §1.4 states: "All references in the Humane Constitution and related instruments to 'court order' shall be read as 'order of a court of competent external jurisdiction.' The pilot operates no court." ANNEX_L §L6 references "Independent personhood court," "Regional administrative court," "Commercial court," and "Constitutional court on expedited schedule" — none of which exist within the protocol. Every judicial remedy in §L6 depends on an external court that: (a) has no obligation to apply constitutional standards; (b) operates on its own timeline; (c) may or may not accept jurisdiction.

This is the most structurally significant jurisdiction gap in the corpus. The entire judicial remedy ladder in ANNEX_L is legally aspirational at pilot scale — it describes courts the system plans to exist within but does not and cannot constitute.

**DEFECT.** The gap is acknowledged by the Jurisdiction Interface Clause but no interim mechanism is named for rights violations that require a judicial remedy before external courts with appropriate jurisdiction exist. Minimal fix: ANNEX_L §L6 should explicitly state which remedies are available through internal mechanisms (Federated Ombuds, CRP, RAC) and which require external court action, and name the interim mechanism for the period before external courts with constitutional jurisdiction are established.

### TJG-02: No timeline for "expedited schedule" for emergency powers review

ANNEX_L §L6 states that emergency powers / rights impacts go to "Constitutional court on expedited schedule." No timeline is defined for "expedited." Emergency powers that suspend rights can remain in effect for an undefined period while the constitutional court — which is an external court with its own calendar — schedules review. The aspirational statement that emergency relief should be "measured in hours or days, not months" has no binding force because no deadline is set.

**DEFECT.** Minimal fix: set a maximum clock for emergency-powers judicial notice and interim relief (e.g., 48-hour automatic stay trigger if review is not scheduled, or 72-hour automatic sunset unless affirmatively renewed by a named body).

### TJG-03: Oracle dispute window is 14 days but no maximum adjudication timeline

HC §632 sets a 14-day dispute window and a 48-hour prima facie evidence deadline for oracle capacity disputes. The §L6 table routes oracle disputes to a "Technical audit panel" with appeal to "Independent review chamber." No maximum timeline is set for the technical audit panel's determination. During dispute resolution, Essential Access can be reduced by up to 10% of baseline per rolling 30 days — the reduction continues for as long as the dispute is unresolved. An adjudication that takes 6 months produces 6 months of reduced Essential Access with no remedy for the gap period.

**DEFECT.** Minimal fix: set a maximum timeline for technical audit panel determination (e.g., 30 days), and specify that any reduction in Essential Access caused by a dispute that is ultimately resolved in the challenger's favor creates an arrears obligation for the gap period.

---

## Retaliation and Access Risks

### RAR-01: AW does not cover coordinated retaliation by non-named respondents

ANNEX_AW §AW5 acknowledges: "Coordinated retaliation by multiple actors who are not individually named respondents" is not prevented. The freeze mechanism (AW2.1) suspends named respondents' record-write access. A coordinated group where each member individually appears uninvolved but acts in concert to punish the reporter defeats the freeze entirely. The named-respondent trigger allows sophisticated actors to insulate themselves by ensuring only subordinates are named.

**DEFECT.** Minimal fix: add a coordinated-retaliation clause that triggers escalation when a pattern of adverse actions against a protected reporter is observed across multiple actors within the protected period, even if no single actor is individually named.

### RAR-02: Post-period "slow-motion retaliation" is acknowledged and unaddressed

ANNEX_AW §AW5 acknowledges: "Slow-motion retaliation after the protected period ends through actions that are individually legitimate but cumulatively punitive" is not prevented. This is the dominant real-world retaliation pattern in governance systems: a series of individually defensible adverse actions (no new contributions verified, no voice queue advances, minor service record flags) that together constitute effective civil death for the reporter. AW5 names this risk and offers no mitigation beyond "culture and enforcement of the broader anti-capture provisions."

**IMPROVEMENT** (acknowledged as a residual gap, not a design error). For Phase 3 hardening: add a post-period monitoring obligation requiring the Federated Ombuds to scan for adverse-action clustering within 24 months of report resolution against formerly protected reporters.

### RAR-03: Informal retaliation (social exclusion, reputation damage) is unaddressed

ANNEX_AW §AW5 acknowledges informal retaliation and explicitly defers: "This can only be addressed through culture and enforcement of the broader anti-capture provisions." This is accurate but means that in small-community pilots where social inclusion is a significant good, a reporter faces an unmitigated retaliation vector that the Constitution explicitly declines to address.

**IMPROVEMENT** (correctly bounded out of scope for a governance instrument). Note for Phase 3: community-level culture protocols are needed to complement the AW formal mechanism.

### RAR-04: The "administrative freeze" requires technical implementation not constitutionalized

ANNEX_AW §AW2.1 requires the system to "immediately suspend each named respondent's write access" on filing. This is a software infrastructure requirement — it depends on a technical system that automatically enforces the freeze at the moment of filing. No constitutional or annex provision constitutes the technical infrastructure for this freeze. If the technical system is not built, not operational, or has a configuration gap, the administrative freeze does not function. The right is real; the delivery mechanism is UNCERTAIN.

**DEFECT.** Minimal fix: add a cross-reference in AW2.1 to the technical implementation specification, and name the body responsible for verifying that the freeze mechanism is operational before the protocol activates.

---

## Findings Table

| ID | Type | Severity | Confidence | File | Section | Summary | Exploit Path |
|---|---|---|---|---|---|---|---|
| RRE-001 | DEFECT | High | High | `ANNEX_L.md` | §L5 | Remedy ladder has no selection criteria; identical violations receive different remedies in different forums | Forum-sympathetic violator receives weakest available remedy; victim with survival harm may get forward order not arrears |
| RRE-002 | DEFECT | High | High | `Humane_Constitution.md` | §178, §180 | Freedom of conscience has no enforcement owner and no dispute class in §L6 | No constitutional path exists to challenge forced religious scoring or conscience violation |
| RRE-003 | DEFECT | Critical | High | `ANNEX_AM.md` | §AM8.4 | CIP removal requires 6-of-7 Plenum vote; Plenum has 5 members — removal is mathematically impossible | Captured CIP member is irremovable; carries forward P1-IC-011 |
| RRE-004 | DEFECT | High | High | `Humane_Constitution.md` | §457 | Community alert 30-day acknowledgment duty has no named duty-holder | Noncompliance generates a new alert into the same broken channel; self-referential failure loop |
| RRE-005 | DEFECT | High | High | `Humane_Constitution.md` | §126, §317 | Core enforcement mechanism has no procedural floor in Constitution | Enforcement without notice or trigger standard cannot be challenged for procedural invalidity; carries forward P1-TF-005 |
| RRE-006 | DEFECT | High | High | `ANNEX_L.md` | §L6 | Every judicial remedy depends on external courts; internal mechanisms cover only administrative tier | Rights violations requiring judicial remedy have no internal path during pilot phase; Jurisdiction Interface Clause §1.4 confirms pilot operates no court |
| RRE-007 | DEFECT | High | High | `Humane_Constitution.md` | §219, §323 | Voice/Service Record audit and correction has no named trigger-owner or auditor | Passive "must trigger audit" duty with no holder; 60-day clock has no enforcer |
| RRE-008 | DEFECT | High | High | `Humane_Constitution.md` | §126, §317; `ANNEX_L.md` §L6 | Appeal paths have no minimum procedural floor; violations outside six named dispute classes have no appeal path | Adverse decision outside named classes is appealed to Local Review Office, which declines jurisdiction; right to appeal is nominal |
| RRE-009 | DEFECT | High | High | `Humane_Constitution.md` | §327 | Keyholder removal mechanism promised but not constituted; "qualified independent review body" does not exist | Self-interested keyholders face no removal procedure |
| RRE-010 | DEFECT | Medium | High | `ANNEX_AW.md` | §AW2.1 | Administrative freeze is a software requirement without a constitutionalized technical specification | Unbuilt or misconfigured freeze mechanism defeats the retaliation protection at the moment of filing |
| RRE-011 | DEFECT | Medium | High | `ANNEX_AW.md` | §AW2.2; §AW3.3 | Appeal forum for retaliation findings is unspecified | Named respondent and reporter each have 30-day appeal window but no forum; appeals go wherever the reviewing institution decides |
| RRE-012 | DEFECT | High | High | `Humane_Constitution.md` | §459; `ANNEX_AW.md` §AW5 | Coordinated retaliation by non-named respondents is unaddressed | Sophisticated actors ensure only subordinates are named; freeze does not apply to coordinating principals |
| RRE-013 | DEFECT | Medium | High | `ANNEX_L.md` | §L6 | No timeline for "expedited schedule" for emergency powers constitutional review | Emergency measures can remain in effect indefinitely while external court schedules review |
| RRE-014 | DEFECT | Medium | High | `ANNEX_AI.md` | §4.2; §L1 | No appeal above Federated Ombuds Plenum for enforcement decisions | Plenum enforcement decisions are unreviewable; CRP jurisdiction does not cover Ombuds enforcement |
| RRE-015 | DEFECT | Medium | High | `Humane_Constitution.md` | §430 | Recognized-contribution audit correction publisher is unnamed | No actor bears authority to publish framework corrections; 180-day clock has no enforcer |
| RRE-016 | DEFECT | High | High | `Humane_Constitution.md` | Amendment procedure | CIP concurrent ratification invisible in Constitution; Tier 1 amendments executed without it are void but actors do not know this; carries forward P1-IC-008 | Legitimate amendment voided retroactively; bad-faith actor exploits invisible requirement |
| RRE-017 | DEFECT | Medium | High | `docs/governance/Founding_Capital_Framework.md` | §152 | Founding capital concentration limit relies solely on self-disclosure; no verification mechanism | Affiliated funder entities route below threshold; foundational rights infrastructure captured at inception |
| RRE-018 | DEFECT | Medium | High | `ANNEX_L.md` | §L6 | No financial / damages remedy specified for privacy violations, housing discrimination, or conscience violations | Rights-holder who suffers measurable harm from privacy breach, housing discrimination, or conscience violation cannot recover |
| RRE-019 | DEFECT | Medium | UNCERTAIN | `Humane_Constitution.md` | §359; `ANNEX_AY.md` | Delivery Sufficiency Register "responsible party" faces no specified consequence for missed deadlines | Register commitment is unenforceable; populations remain unserved beyond timeline with no accountability |
| RRE-020 | IMPROVEMENT | Medium | High | `ANNEX_AW.md` | §AW5 | Post-period slow-motion retaliation is acknowledged and explicitly unaddressed | Acknowledged residual gap; needs a post-period monitoring obligation |

---

## Recommendations for Phase 3

Listed in priority order by severity and exploitability:

**P3-01 (Critical):** Fix ANNEX_AM §AM8.4 — correct the CIP removal threshold from 6-of-7 to a valid fraction of the 5-member Plenum (4-of-5). A captured CIP member is irremovable as written; this nullifies the entire CIP oversight function.

**P3-02 (High):** Add a minimum enforcement procedure floor to the Constitution (Article I or VIII): minimum notice, trigger standard, evidence floor, procedural challenge path. Cross-reference to the enforcement annex. This closes RRE-005 (P1-TF-005).

**P3-03 (High):** Add "freedom of conscience / religious freedom" as a named dispute class in ANNEX_L §L6 with an initial review body, appeal path, and available remedies. No enforcement path currently exists for this stated right.

**P3-04 (High):** Add a catch-all dispute class to ANNEX_L §L6 for rights violations outside the six named categories. Define a generic appeal path, standing requirements, and timeline. This closes RRE-008 (P1-TF-011).

**P3-05 (High):** Name the Federated Ombuds as the duty-holder for the 30-day community alert acknowledgment obligation (HC §457). Specify that failure to acknowledge within 30 days triggers automatic escalation to the full Plenum — not a new community alert.

**P3-06 (High):** Add CIP concurrent ratification requirement to the Constitution's Tier 1 amendment clause and to `architecture/amendment_protocol.md`. This closes RRE-016 (P1-IC-008).

**P3-07 (High):** Add remedy selection criteria to ANNEX_L §L5: a priority-ordering table tied to violation type and severity. This closes RRE-001 (P1-TF-016).

**P3-08 (High):** Add financial / damages remedy types for privacy, housing discrimination, and conscience violations to ANNEX_L §L6. This closes RRE-018.

**P3-09 (High):** ANNEX_L §L6 should explicitly partition judicial remedies (requiring external courts) from administrative remedies (available internally through CRP, Ombuds, RAC) and name an interim mechanism during pilot phase before external courts with constitutional jurisdiction exist. This closes RRE-006.

**P3-10 (Medium):** Name the Federated Ombuds as trigger-owner and auditor for HC §219 (Voice/Service Record misuse) and HC §323 (coercion via civic tools). This closes RRE-007.

**P3-11 (Medium):** Add a coordinated-retaliation clause to ANNEX_AW: pattern detection across multiple non-named actors during the protected period triggers escalation. This closes RRE-012.

**P3-12 (Medium):** Set a maximum timeline for "expedited" emergency powers constitutional review (e.g., 48-hour automatic interim relief trigger). This closes RRE-013.

**P3-13 (Medium):** Constitute the keyholder removal mechanism (HC §327): name the CRP as petitioning body, define "demonstrable self-interest," specify threshold and consequence. This closes RRE-009.

**P3-14 (Medium):** Add post-period retaliation monitoring obligation to ANNEX_AW: Ombuds scans for adverse-action clustering against formerly protected reporters within 24 months of resolution. This partially mitigates RRE-020.

**P3-15 (Medium):** ANNEX_AW §AW2.1 should cross-reference a technical implementation specification for the administrative freeze and name a body responsible for certifying the freeze mechanism is operational before the protocol activates. This closes RRE-010.

---

## Self-Review

| Dimension | Score (1–5) | Notes |
|---|---|---|
| **Coverage** | 4 | All major rights categories examined; founding-capital gap included; exit rights and privacy rights covered. Minor gap: individual exit rights (personal consent withdrawal, HC §307) not fully analyzed for enforcement chain. |
| **Specificity** | 4 | Findings reference specific articles, section numbers, and line text. Some findings reference UNCERTAIN enforcement chains where the corpus was silent rather than specifying what the gap is. |
| **Evidence** | 5 | Every finding is grounded in observed text. UNCERTAIN is marked where the corpus was ambiguous or the section was not fully read. No invented findings. |
| **Adversarial Depth** | 4 | Exploit paths are named for most findings. The coordinated-retaliation finding (RRE-012) and the slow-motion post-period retaliation (RRE-020) are especially adversarially developed. The "system operates no court" finding (RRE-006) is the most structurally important and receives full adversarial treatment. |
| **Actionability** | 4 | Each finding has a "minimal fix shape." P3 recommendations are ordered by severity. Some fixes require constitutional amendment (RRE-003, RRE-005); the audit distinguishes those from annex-level repairs. |
| **Overall** | 4 | The audit meets the adversarial Phase 2 standard. The most important systemic gap — that the entire judicial remedy ladder in ANNEX_L depends on external courts the system does not and cannot constitute — was found and developed. |

All dimensions score 4 or 5. No Repair Pass required.
