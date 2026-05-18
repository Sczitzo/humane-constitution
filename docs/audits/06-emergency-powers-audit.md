# Emergency Powers Audit

**Phase:** 2 — Adversarial Stress-Testing
**Date:** 2026-05-15
**Auditor:** Claude Code (claude-sonnet-4-6), autonomous corpus auditor
**Scope boundary:** Emergency mechanisms only. Does not re-audit general governance, oracle accreditation, or identity systems except where they are direct emergency-power dependencies.

---

## Scope

This audit stress-tests every emergency-power mechanism found in the Humane Constitution corpus, with particular attention to:

- How emergency authority is invoked, and by whom
- Whether invocation requires real evidence or is structurally exploitable without it
- Duration, expiration, and renewal controls — and whether they allow indefinite accumulation
- Rights that cannot be suspended during emergency — and whether they actually cannot be
- Who reviews and can challenge an emergency declaration
- After-action accountability requirements
- Paths by which emergency powers normalize into ordinary governance

Documents examined: `Humane_Constitution.md`, `ANNEX_AC.md` (§AC1–AC2), `ANNEX_AE.md` (§AE2.3), `ANNEX_AP.md`, `ANNEX_AQ.md`, `ANNEX_H.md`, `ANNEX_Y.md`, `ANNEX_AH.md` (§AH5.1), `Collapse_State_Crosswalk.md`, prior audit `docs/audits/04-terminology-audit.md` (finding TF-04).

---

## Method

For each emergency mechanism identified, the adversarial method applies:

1. **Stated purpose** — what crisis justifies this power?
2. **Literal rule** — who invokes, with what evidence requirement?
3. **Compliance exploit** — how do you invoke it without the crisis existing?
4. **Missing guardrail** — what duration/review/rights/challenge constraint is absent?
5. **Capture path** — who benefits from permanent or repeated emergency?
6. **Failure consequence** — what rights are reduced, suspended, or bypassed?
7. **Minimal fix shape** — what structural constraint closes the gap?

All findings are grounded in observed text. UNCERTAIN is marked explicitly where the source document is ambiguous. DEFECT indicates a structural gap. IMPROVEMENT indicates a functional mechanism with a fixable weakness.

---

## Emergency Language Inventory

The corpus contains at least five distinct emergency-adjacent mechanisms, each with different trigger standards, authority structures, and expiration rules:

| Mechanism | Primary Source | Trigger Type | Invoker |
|---|---|---|---|
| **PCRP** (Pre-Confirmation Response Protocol) | `ANNEX_AC.md §AC2.2` | Supply sentinel + two-source corroboration | Regional Executive Body (joint) |
| **Shared Storehouse Activation** (L2/L3) | `Humane_Constitution.md` §VIII, §V | Oracle-confirmed scarcity (fill-rate thresholds) | Oracle quorum (measurement-based) |
| **Interim Operational Authority (IOA)** | `ANNEX_AC.md §AC1.5` | Level 3 or Level 4 emergency declaration | Auto-constituted on declaration |
| **Emergency Deadlock Resolution** | `ANNEX_AE.md §AE2.3` | Triple-block of mandatory governance | Auto-triggered by procedural condition |
| **Dignity-Only Continuity Mode** | `ANNEX_AH.md §AH5.1` | Post-activation audit finding that P-013 was compromised | Federated Ombuds (publication of finding) |
| **Conservative Hold** (oracle failure) | `ANNEX_AQ.md §1` | Oracle quorum loss during active Shared Storehouse | Automated system detection + REB confirmation |

**Critical observation:** No master definition of "emergency" exists anywhere in the corpus. Each mechanism uses its own trigger standard. This was previously identified as TF-04 in the Phase 1 terminology audit (`docs/audits/04-terminology-audit.md` line 282) and remains unresolved. An actor can argue that their preferred trigger standard applies in any given situation.

---

## Invocation Authority

### PCRP

**Who invokes:** The Regional Executive Body (REB), acting jointly — no single actor may activate unilaterally (AC2.2). The Federated Ombuds must be notified within 1 hour. Publication is immediate.

**Evidence required:** A sentinel indicator or credible operational report (named source, named evidence) showing an essential category has crossed into Scarcity L2 or Emergency L3 territory, corroborated by at least two independent sources, where the next scheduled oracle publication is more than 24 hours away.

**Adversarial observation:** "Credible operational report" with "named source and named evidence" is the corroboration floor. The two-source requirement does not require two independent measurement systems — only two independent sources. A single institution that controls multiple reporting channels (a large essential-category vendor with two separate operations divisions, or a regional body with its own logistics and health reporting arms) could potentially satisfy the two-source test with structurally dependent sources. The corpus recognizes this for oracle corroboration (P-012 requires structurally independent measurement systems for the oracle), but the PCRP two-source requirement does not carry the same structural-independence language. UNCERTAIN whether "two independent sources" inherits the structural-independence standard from oracle rules.

### Shared Storehouse Activation

**Who invokes:** Oracle quorum (measurement-based, not discretionary declaration). Activation is triggered by objective fill-rate and days-of-supply thresholds published in a table (HC §VIII).

**Evidence required:** Objective threshold crossing: Emergency L3 = days of supply < 7 AND fill-rate < 80% for 48 hours AND verified disruption (severe). This is the strongest evidence-gating in the corpus — numerical, oracle-confirmed, time-windowed.

**Adversarial observation:** The trigger table is strong, but oracle capture upstream (T-012, T-020, T-021) could produce artificial threshold crossings. The oracle independence architecture (ANNEX_AL) is the primary defense, which is outside this audit's scope — but the observation stands that Shared Storehouse has no independent verification path if the oracle itself is captured.

### Interim Operational Authority (IOA)

**Who invokes:** Constituted automatically upon an "emergency declaration" at Level 3 or Level 4. Composition: Federated Ombuds + one rotating CRP member (by lot) + relevant regional executive body, acting jointly.

**DEFECT — no definition of who makes the initial Level 3/4 declaration:** ANNEX_AC.md §AC1.5 states the IOA is constituted "upon emergency declaration" but does not specify who makes the declaration, what evidence is required, or which trigger standard determines that a Level 3 or Level 4 condition exists. This is a structural gap. The PCRP has defined triggers and a named invoking body. The IOA does not. The regional executive body sits on the IOA itself, creating a potential self-interest path: a regional body that declares a Level 3 emergency automatically joins the authority that governs it.

### Emergency Deadlock Resolution

**Who invokes:** Auto-triggered when a mandatory decision is simultaneously blocked by two or more valid procedural processes (AE2.3). No discretionary actor invokes this — it is a condition-triggered protocol. The 6-hour panel constitution is automatic.

**Adversarial observation:** The auto-trigger design removes discretionary invocation, but deliberate engineering of the conditions that satisfy the triple-block is specifically identified as a threat (see residual risk in ANNEX_AE). A bad actor can engineer a triple-block specifically to route a survival-floor decision through the arbitration panel instead of the normal CRP process, bypassing the constitutional queue. The panel's authority is deliberately limited (survival-floor bridge only, no expansion of powers), but the routing itself is exploitable if the panel composition can be anticipated or influenced.

---

## Evidence Requirements

| Mechanism | Evidence Standard | Verification Body | Gap |
|---|---|---|---|
| PCRP | Named source + named evidence + two independent sources + sentinel signal | REB (self-evaluating) | Two-source independence not structurally defined |
| Shared Storehouse | Oracle quorum, numerical thresholds, time windows | Oracle network (ANNEX_AL) | Dependent on oracle integrity upstream |
| IOA | Undefined — no trigger standard in corpus | None specified | DEFECT: no evidence requirement for Level 3/4 declaration |
| Deadlock Resolution | Auto-trigger (procedural condition) | Automated detection | Engineering of conditions is a known residual risk |
| Conservative Hold | Oracle quorum loss, automated detection (15-minute polling) | System + REB | Well-defined; detection gap < 15 min |
| Dignity-Only Continuity | Post-activation audit finding | Federated Ombuds | Inherently post-hoc; bootstrapping circularity acknowledged |

The IOA evidence gap is the most severe. "Level 3 or Level 4 emergency" appears in ANNEX_AC.md §AC1.5 without any cross-reference to a trigger standard, a named invoking authority, or an evidence requirement. The governance levels (L1 Watch, L2 Scarcity, L3 Emergency) are defined for the Shared Storehouse scarcity table, but it is not clear that these are the same Level 3 / Level 4 that activates the IOA.

---

## Duration and Renewal Controls

### PCRP Duration

- **Maximum:** 72 hours without oracle confirmation (AC2.2).
- **Expiration:** Terminates automatically if oracle contradicts the activation evidence.
- **Renewal:** No renewal path specified — PCRP is superseded by full Shared Storehouse if crisis is confirmed, or terminates if crisis is denied. A new PCRP activation would require fresh evidence.
- **False-trigger cap:** Three false activations within four quarters by the same REB triggers mandatory independent audit (AC2.2). ANNEX_AP §AP1 provides a cap-reset procedure if triggers were deliberately manufactured.

**Assessment:** Duration controls are strong. The 72-hour hard limit with oracle-confirmation requirement prevents prolonged PCRP use. The false-trigger cap addresses serial misuse. IMPROVEMENT: The cap is per-REB per-4-quarter window, but a sufficiently patient actor could cycle activations just under the cap threshold in perpetuity without triggering the mandatory audit.

### Shared Storehouse Duration

- **Hard expiration rule:** Every activation carries a published expiration timestamp set at activation (HC line 223). Continuation beyond the timestamp requires affirmative multi-key renewal: new scarcity finding from oracle quorum + deliberative ratification under Article VI. Without active renewal, automatic reversion occurs.
- **Renewal:** Permitted, with the multi-key threshold. The corpus explicitly states: "No emergency power may accumulate across renewal cycles into a permanent expansion of executive scope."
- **Renewal limit:** No explicit cap on the number of renewal cycles is stated in the corpus. The anti-accumulation language ("no emergency power may accumulate... into a permanent expansion") is a norm statement, not a numerical limit.

**DEFECT:** The Shared Storehouse renewal mechanism has no cap on the total number of consecutive renewals. While each renewal requires fresh oracle confirmation and Article VI ratification, a genuine sustained shortage (or a manufactured one) could produce indefinite renewal cycles. The anti-accumulation language in HC line 223 prohibits scope expansion across cycles but does not limit the number of cycles. ANNEX_H.md §H line 89 states "No emergency measure may be renewed more than twice for the same underlying incident without a public post-mortem and supermajority judicial approval." It is UNCERTAIN whether this ANNEX_H cap applies to Shared Storehouse renewals or only to emergency measures defined elsewhere (Tier 2 rule suspensions under §H). If the ANNEX_H cap applies, indefinite renewal requires judicial supermajority approval after the second renewal — a meaningful constraint. If it does not apply, renewal is uncapped.

### IOA Duration

- **72-hour limit** on acting without oracle confirmation (for supply matters) or CRP ratification (for governance matters) per AC1.5.
- All interim decisions are provisional, published within 1 hour, and subject to full quarterly cycle ratification or reversal.
- **Scope-lock:** IOA cannot extend its own authority beyond the declared emergency scope.

**DEFECT:** The 72-hour clock resets on each new CRP ratification. A CRP that routinely ratifies IOA decisions is effectively extending IOA governance indefinitely, quarter by quarter, without triggering any cap or mandatory independent review. The sequential emergency re-declaration cap in AC1.3 (two consecutive quarters maximum before independent audit is required) applies to Level 3+ declarations, which is a partial check — but the cap applies per-domain and does not constrain IOA operational authority if the CRP is continuously ratifying decisions in the same domain.

### Emergency Deadlock Duration

- Maximum deadlock period is bounded by the 6-hour panel-constitution requirement, with mandatory root-cause review post-resolution.
- Second-generation deadlock (panel itself blocked) escalates to Level 5 structural review, with a 72-hour convening clock.

**Assessment:** Duration controls are adequate for this mechanism. The escalation path is defined and the clocks are explicit.

### ANNEX_AC.md §AC1.3 Sequential Re-Declaration Cap

- No region may declare Level 3 or higher emergency in the same domain for more than two consecutive quarters without: (a) independent audit of original declaration's evidentiary basis, (b) mandatory written justification for continuation.
- A third consecutive declaration without both conditions is **void**.
- **Per-domain rule:** concurrent emergencies in different domains are not affected by this cap.

**DEFECT:** The per-domain design, while preventing single-domain accumulation, creates a multi-domain diversification path. A single regional body can maintain continuous emergency governance by cycling through different domains: food L3 in Q1-Q2, then housing L3 in Q3-Q4, then healthcare L3 in Q1-Q2 of the following year. Each domain re-declaration cap resets independently. An actor can maintain a near-permanent emergency posture while never triggering the two-consecutive-quarter limit in any single domain.

---

## Non-Suspendable Rights

The corpus maintains a layered floor structure. From strongest to weakest:

### Tier 1: Constitutional Survival Minimum (CSM) — ANNEX_Y

- **Status:** Tier 1 Constitutional, H-3 refounding authority required to change.
- **Content:** Per-person daily minimums: 2,100 kcal/adult, 50 L water, 3.5 m² weather-safe shelter, emergency medical stabilization (60-min response urban), crisis mental-health stabilization, essential medicines.
- **Emergency protection:** CSM "does not depend on oracle availability" (ANNEX_AQ §1). "CSM issuance remains active through oracle failure and through all subsequent authority transfers" (ANNEX_AQ §1). "No emergency, scarcity declaration, fiscal pressure, or administrative reinterpretation may lower these values" (ANNEX_Y §Y0).
- **IOA cannot touch CSM:** IOA prohibited from narrowing the survival floor or reducing any survival-adjacent access (AC1.5).
- **Deadlock cannot touch CSM:** Level 4 survival-floor bridge activates unconditionally during triple-deadlock; CSM continues through Level 5 (AE2.3, AE2.3 Level 5 provision).
- **PCRP cannot touch CSM:** CSM-floor issuance remains at 100% per INV-001, absolute and not subject to PCRP reduction (AC2.2).

**Assessment:** The CSM non-suspendability is the strongest protection in the corpus. It is reinforced in every emergency mechanism. The primary theoretical attack is upstream oracle capture that falsifies scarcity evidence — the oracle independence architecture (ANNEX_AL) is the defense.

### What CAN be suspended or reduced during emergency

- **Above-baseline Essential Access:** PCRP may reduce above-baseline issuance to 70% of above-baseline for a single affected category (AC2.2). IOA may reduce above-baseline Essential Access issuance rate (AC1.5). This is not trivial — above-baseline Essential Access represents the difference between survival-floor nutrition and adequate nutrition. Reduction to 70% of above-baseline for 72 hours is survivable; but stacked activations across categories could materially harm vulnerable populations even while CSM remains formally intact.
- **Essential Access aggregate floor:** PCRP may not reduce aggregate Essential Access delivery below 85% of normal baseline (across all categories and persons combined) — this is a separate ceiling protecting against cumulative above-baseline reduction from multiple simultaneous PCRP activations.

**DEFECT — Stacked PCRP adversarial scenario:** If four separate PCRP activations are running simultaneously across four different essential categories, each legally reducing above-baseline to 70% in its category, the 85% aggregate floor is the only protection. The corpus does not specify how the 85% aggregate floor is calculated when categories have different weights or when baseline varies by region and population. UNCERTAIN whether the aggregate floor calculation methodology is published anywhere. Without a published methodology, the 85% floor is unenforced at the margin.

### Civic Rights During Emergency

- Voice, Service Record, and Service Record allocation cannot be manipulated by parties under investigation (reporter protection, HC line 459, ANNEX_AW).
- Reporter protection is active "from the moment a report is filed and until it is formally resolved." This protection survives emergency declarations — no emergency mechanism grants authority to override reporter protection.
- **UNCERTAIN:** Whether IOA scope authority could encompass Voice allocation decisions during a governance emergency. AC1.5 permits the IOA to "authorize affirmative operational decisions strictly within the scope stated in the emergency declaration." If the emergency declaration scope were drafted broadly, Voice-adjacent operational decisions could potentially fall within it. No explicit prohibition on IOA touching Voice or Service Record was found (only Essential Access and constitutional matters are explicitly prohibited).

---

## Review, Challenge, and Appeal

### Who reviews PCRP activations

- Federated Ombuds notified within 1 hour of activation.
- Oracle provides confirmation or contradiction within 48 hours. Oracle contradiction terminates PCRP immediately.
- Three false activations trigger mandatory independent audit of the REB.
- ANNEX_AP provides a cap-reset audit procedure run by the Federated Ombuds (within 7 days of credible allegation, findings within 30 days).

**DEFECT — No individual challenge right during PCRP:** An ordinary person whose above-baseline Essential Access has been reduced 30% by a PCRP activation cannot, under any described mechanism, individually contest the activation and demand restoration. The Federated Ombuds is notified, the oracle will respond in 48 hours, and Article VII community alert pathways exist — but the corpus does not specify any individual challenge procedure with a defined timeline. The 48-hour oracle window is the practical review, but it runs through the oracle, not through an adversarial process available to the affected person.

### Who reviews Shared Storehouse activations

- Oracle quorum is the review mechanism: oracle findings gate activation, continuation, and lapse.
- Community challenge path to oracle quorum: written submission to oracle quorum, published response within 14 days (HC §VIII, Article IV).
- **Affirmative renewal requirement** for continuation beyond expiration timestamp provides periodic structural review.

**Assessment:** Shared Storehouse review is relatively strong. The community challenge path is meaningful. The two-week response requirement is binding.

### Who reviews IOA decisions

- All interim decisions are provisional, published within 1 hour, and subject to full quarterly cycle ratification or reversal by the CRP (AC1.5).
- Any interim decision exceeding declared scope is "automatically void upon finding" and triggers a CRP capture review.
- **DEFECT — no independent reviewer of the IOA declaration itself:** The IOA is constituted on declaration, but no process is specified for an independent body to review whether the Level 3/4 emergency declaration was warranted. The CRP ratifies IOA *decisions* — but CRP is a member of the IOA composition. ANNEX_H.md §87 provides that any emergency suspension of a Tier 2 rule requires automatic judicial review within 72 hours — but this applies to Tier 2 rule suspensions specifically, not to IOA operational decisions.

**DEFECT — REB sits on its own reviewing body:** The relevant regional executive body is a member of the IOA. If that body also participates in the initial emergency declaration, it is effectively reviewing its own decision through the IOA process. The Federated Ombuds and CRP rotating member provide some independence, but the REB's presence on the IOA means the declaring authority is never fully excluded from the reviewing authority.

### Who reviews Level 5 structural review

- Federated Ombuds Plenum convenes by 3-of-5 vote within 24 hours.
- If Ombuds Plenum is deadlocked, IIA and standing adversarial panel member jointly issue a convening notice.
- Maximum 72-hour clock before H-3 re-founding petition is triggered automatically.

**Assessment:** This escalation path is well-designed with clear fallbacks. The adversarial-seat provision is a meaningful safeguard against unanimous capture.

---

## After-Action Accountability

| Mechanism | After-Action Requirement | Published? | Timeline | Responsible Body |
|---|---|---|---|---|
| PCRP false trigger | Mandatory post-mortem (AC2.2) | Yes — published within 7 days | 7 days of false confirmation | REB |
| Shared Storehouse lapse | No explicit post-mortem requirement found in corpus | UNCERTAIN | Not specified | Not specified |
| IOA provisional decisions | Quarterly ratification or reversal by CRP | Yes — all decisions published within 1 hour | Quarterly cycle | CRP |
| Emergency deadlock (AE2.3) | Mandatory root-cause review post-resolution (AE2.3) | Yes | Not timestamped | Not specified |
| Oracle failure (ANNEX_AQ) | Reconciliation review within 7 days of 14-day verification window close | Yes | 21 days from oracle restoration | Named authority (ANNEX_AL §3) |
| PCRP attack (ANNEX_AP) | Cap-reset audit findings published | Yes | 30 days from audit opening | Federated Ombuds |

**DEFECT — No post-mortem requirement for Shared Storehouse activations that lapse correctly:** When a Shared Storehouse activation expires and automatically reverts, the corpus requires an affirmative renewal process to continue, but does not require a post-mortem explaining what happened, whether the scarcity was genuine, and what was learned. Only PCRP *false triggers* trigger mandatory post-mortems. A Shared Storehouse that activates, runs for a full expiration cycle, and lapses has no mandatory retrospective accountability step beyond the oracle's continued measurement publications. This is an asymmetry: the consequence-free path (correct activation and correct lapse) has no accountability record requirement, while only the error path (PCRP false trigger) mandates retrospective review.

**DEFECT — Emergency deadlock post-mortem has no deadline:** ANNEX_AE.md §AE2.3 requires a "post-resolution post-mortem" to identify which procedural rules enabled the triple-block. No deadline is specified. A governing body could satisfy this requirement by publishing a cursory document months after resolution with no consequence for delay.

**IMPROVEMENT — PCRP RPCP template:** ANNEX_AD.md specifies a Rapid Public Communication Protocol (RPCP) with a 4-hour template for any public-visibility operational event, explicitly including PCRP false-trigger events. This is a genuine near-real-time accountability mechanism. Its limitation is that it is a communication protocol, not an independent review.

---

## Emergency Normalization Risks

Emergency normalization occurs when emergency-mode governance expands into ordinary governance without formal legitimation. The corpus has multiple explicit anti-normalization provisions, but several structural gaps remain.

### Present Anti-Normalization Provisions

- HC line 223 (Shared Storehouse): "No emergency power may accumulate across renewal cycles into a permanent expansion of executive scope."
- ANNEX_H.md §H line 130: "Every emergency adjustment expires automatically after one quarter unless re-ratified through the ordinary process."
- ANNEX_H.md §H line 89: Emergency measures renewable a maximum of twice before supermajority judicial approval required.
- ANNEX_AC.md §AC1.3: Two-consecutive-quarter cap per-domain on Level 3+ declarations.
- ANNEX_H.md §H line 85: Tier 1 invariants are never amendable by emergency order.

### Normalization Gaps

**Gap 1 — Multi-domain cycling (elaborated above under Duration):** Per-domain caps allow persistent emergency governance through domain rotation. No aggregate limit on concurrent or sequential emergencies across domains exists.

**Gap 2 — IOA ratification as normalized quarterly governance:** The IOA, designed for Level 3/4 emergencies, produces provisional decisions subject to quarterly CRP ratification. If an emergency is declared and maintained for successive quarters, IOA decision-making becomes a routine quarterly item on the CRP agenda rather than an extraordinary intervention. The CRP ratification mechanism designed as a check becomes a normalization mechanism. Nothing in the corpus specifies what percentage of quarterly CRP business may consist of IOA ratifications before the situation is treated as structural governance capture.

**Gap 3 — CRP throughput capture during prolonged emergency:** ANNEX_AC.md §AC1.2 establishes a five-decision minimum operational throughput floor per quarterly cycle. During a prolonged emergency, IOA ratifications could consume significant CRP bandwidth without counting against this floor. The operational floor protects against governance starvation but does not protect against governance being consumed by emergency management.

**Gap 4 — Emergency language not covered by P-004 semantic drift protections:** ANNEX_H.md §H and Annex AB5 protect defined constitutional terms against semantic drift. "Emergency" itself is not in the P-004 protected terms registry (as noted in TF-04 Phase 1). The threshold for "Level 3" and "Level 4" may drift in practice through operational reinterpretation without triggering a protected-term review.

**Gap 5 — Absence of an emergency-normalization detection metric:** The Article VII dashboard (referenced throughout the corpus) is required to publish various status indicators. No requirement was found for a dashboard metric tracking: (a) total days of emergency-mode governance across all mechanisms in the rolling year; (b) ratio of IOA-originated CRP decisions to ordinary CRP decisions; (c) number of Shared Storehouse renewal cycles without a post-mortem. Without such metrics, normalization is invisible until it is structural.

---

## Findings Table

| ID | Type | Severity | Confidence | File | Section | Summary | Exploit Path |
|---|---|---|---|---|---|---|---|
| EP-001 | DEFECT | Critical | High | `ANNEX_AC.md` | §AC1.5 | IOA has no defined trigger standard — "Level 3 or Level 4 emergency" declaration authority and evidence requirement are unspecified | REB declares Level 3 unilaterally with undefined evidence, constitutes IOA that it sits on, governs by provisional decisions ratified quarterly, never triggering any explicit cap |
| EP-002 | DEFECT | Critical | High | Multiple | TF-04 (prior finding) | No master definition of "emergency" across the corpus; three separate trigger standards exist (scarcity L2/L3, operational deadlock, Interim Authority) | Actor argues preferred trigger standard; invokes emergency powers outside intended scope; blocks challenge by contesting which standard applies |
| EP-003 | DEFECT | High | High | `ANNEX_AC.md` | §AC1.3 | Per-domain sequential re-declaration cap allows multi-domain cycling — permanent emergency governance through domain rotation | Regional body cycles through food, housing, healthcare, energy domains in successive quarters, maintaining continuous emergency authority while never triggering the two-quarter limit in any single domain |
| EP-004 | DEFECT | High | High | `Humane_Constitution.md` | Line 223 | Shared Storehouse renewal is uncapped (ANNEX_H §89 cap applicability is UNCERTAIN) | Genuine or manufactured scarcity produces successive renewal cycles indefinitely; each cycle passes multi-key threshold; executive scope is not formally expanded but emergency rationing becomes structural |
| EP-005 | DEFECT | High | Medium | `ANNEX_AC.md` | §AC1.5, AC2.2 | REB sits on IOA it helps activate — same actor in declaration and review roles | REB with emergency declaration authority automatically joins the body that governs the emergency; no mandatory exclusion or recusal requirement |
| EP-006 | DEFECT | High | High | `ANNEX_AC.md` | §AC2.2 | Two-source PCRP corroboration requirement lacks structural-independence standard (unlike oracle corroboration in P-012) | Single institution with two reporting arms satisfies two-source test; corroboration is structurally dependent; PCRP activated without genuine independent confirmation |
| EP-007 | DEFECT | High | Medium | `ANNEX_AC.md`, `ANNEX_AQ.md` | AC2.2, AQ §1 | No individual challenge procedure for PCRP activations; affected persons have no specified adversarial pathway with a defined timeline | Above-baseline Essential Access reduced 30% for 72 hours; affected person cannot independently contest; oracle review runs on oracle's 48-hour clock, not on an adversarial process initiated by the person harmed |
| EP-008 | DEFECT | Medium | High | `ANNEX_AC.md` | §AC2.2 | Stacked multi-category PCRP — aggregate 85% floor calculation methodology is UNCERTAIN; four simultaneous PCRP activations across four categories could cumulatively harm vulnerable populations | Four REBs in adjacent categories simultaneously activate PCRP; each individually legal; aggregate floor is the only check; floor calculation methodology not found in corpus |
| EP-009 | DEFECT | Medium | High | Various | Post-mortem provisions | No post-mortem required for correctly-lapsed Shared Storehouse activations; accountability record only required on error path (PCRP false trigger), not on success path | Multiple Shared Storehouse activations, renewals, and lapses produce no accountability record; pattern of activations in same region invisible to public oversight |
| EP-010 | DEFECT | Medium | High | `ANNEX_AE.md` | §AE2.3 | Emergency deadlock post-mortem has no deadline | Post-mortem requirement satisfied by delayed, cursory publication months after resolution; structural causes of the deadlock not identified in time to prevent recurrence |
| EP-011 | DEFECT | Medium | Medium | Multiple | Emergency normalization | No Article VII dashboard metric tracks emergency-mode governance duration or IOA-decision ratio in CRP quarterly agenda | Emergency normalization is invisible in real-time; by the time it is visible, it is structural |
| EP-012 | DEFECT | Medium | High | `ANNEX_AP.md` | §AP1 | AP1 cap-reset audit requires "clear and convincing evidence" of deliberate manipulation — during the audit, the cap counter is frozen, not reset | If the audit finds no manipulation, the cap counter is unchanged and the operator still faces imminent audit trigger; but the 30-day audit window itself is a delay tactic opportunity: file a cap-reset audit allegation whenever cap approaches exhaustion, freezing the counter for 30 days, regardless of whether manipulation occurred |
| EP-013 | IMPROVEMENT | Low | High | `ANNEX_AP.md` | §AP1 | False-trigger exhaustion safeguard (T-018) is the most complete anti-abuse mechanism in the emergency system; pre-exhaustion alert at 2-of-3 triggers is a genuine early-warning design | The residual risk acknowledged in AP Residual Risk section — real-time distinction between genuine oracle failure and engineered false trigger remains unreliable — is accurate and honest |

---

## Recommendations for Phase 3

1. **Resolve EP-001 and EP-002 together:** Define a single constitutional master definition of "emergency" with an explicit tier taxonomy. Specify who makes the Level 3/Level 4 declaration, with what evidence, and through what joint-activation requirement. Cross-reference from ANNEX_AC §AC1.5 to the master definition. This closes the IOA invocation gap and the TF-04 terminology gap simultaneously.

2. **Close the multi-domain cycling path (EP-003):** Add an aggregate emergency-hours-per-year cap at the regional level, across all domains combined. A region that has been in emergency mode for more than, e.g., two cumulative quarters in any rolling four-quarter window should trigger the same mandatory independent audit as two consecutive quarters in a single domain.

3. **Clarify ANNEX_H §89 applicability to Shared Storehouse renewals (EP-004):** Explicitly state whether "emergency measure" in ANNEX_H §89 includes Shared Storehouse renewal cycles. If it does, the twice-maximum-before-judicial-supermajority-approval rule provides a meaningful cap. If it does not, a numerical cap on consecutive renewals is needed.

4. **Mandatory recusal or substitution rule for REB in IOA (EP-005):** If the regional executive body made or substantially contributed to the emergency declaration that triggered the IOA, at least one independent substitution should replace the REB member on the IOA for the duration, with the substitute drawn from an independent pool rather than the declaring authority.

5. **Extend structural-independence requirement to PCRP two-source corroboration (EP-006):** Apply the same structural-independence standard already required for oracle corroboration in P-012 to PCRP two-source corroboration. Explicitly state that two reporting arms of the same institution do not satisfy two-source requirement.

6. **Add individual challenge procedure for PCRP (EP-007):** Define a person-initiated adversarial pathway for challenging a PCRP activation. Minimum: written submission to Federated Ombuds, response within 24 hours, with an emergency-expedited finding track. This is not available for the CSM floor (which is automatic and non-negotiable) but is appropriate for above-baseline reductions where the activation may be erroneous.

7. **Publish the 85% aggregate floor calculation methodology before any PCRP implementation (EP-008):** The methodology should specify how categories are weighted, how regional variation is handled, and what real-time publication obligation the REB has when aggregate delivery approaches the 85% floor.

8. **Require post-mortems for all Shared Storehouse activations, not just false triggers (EP-009):** Within 30 days of any Shared Storehouse lapse (whether through automatic expiration, managed unwind, or REB decision), require a public post-mortem that: names the activation date, expiration date, category, regional scope, peak reduction level, total affected persons, and whether the underlying scarcity was later confirmed or contested.

9. **Timestamp the emergency deadlock post-mortem (EP-010):** Add a 30-day deadline to the ANNEX_AE §AE2.3 root-cause review requirement, with the finding subject to Article VII mandatory-publication rules.

10. **Add an emergency-normalization detection dashboard metric (EP-011):** The Article VII dashboard should include: (a) rolling annual emergency-mode days by region and domain; (b) ratio of IOA-originated decisions in quarterly CRP agenda; (c) number of Shared Storehouse activations per region over trailing 12 months without a post-mortem. Define a Level 1 watch trigger if any metric exceeds a published threshold.

11. **Add cap-reset allegation gatekeeping to AP1 (EP-012):** Require cap-reset audit allegations to pass a prima facie threshold before the cap counter freeze activates. This prevents the freeze from being used as a tactical delay at every cap-approaching moment.

12. **Add "emergency" to the P-004 protected terms registry:** Semantic drift in what constitutes a qualifying emergency is a normalization vector. The P-004 anti-capture protocol should cover "emergency," "Level 3," "Level 4," and "supply shock" as protected terms requiring substantive review before definitional expansion.

---

## Self-Review

| Dimension | Score (1-5) | Notes |
|---|---|---|
| **Coverage** | 4 | All six identified emergency mechanisms were examined. AP noted that PCRP has two referents in the corpus (AC2.2 supply emergency and the AP/AI coercion response protocol); this audit covered both. Minor gap: ANNEX_X.md emergency spending provisions were identified in search results but not fully analyzed. |
| **Specificity** | 4 | Most findings cite specific line numbers, section numbers, and quoted corpus language. EP-002 inherits from TF-04 Phase 1 without re-deriving. |
| **Evidence** | 5 | Every finding is grounded in observed corpus text. UNCERTAIN is used explicitly in four places where the source text was genuinely ambiguous. No findings were invented. |
| **Adversarial Depth** | 4 | The adversarial method was applied to each mechanism. The multi-domain cycling path (EP-003), the IOA self-ratification path (EP-002/EP-005), and the stacked PCRP path (EP-008) are novel adversarial constructions from this audit that were not pre-identified in Phase 1. One additional adversarial scenario not fully developed: an adversary who simultaneously engineers T-018 and T-024 (PCRP false-trigger exhaustion concurrent with oracle failure during Shared Storehouse) is noted in ANNEX_AQ and ANNEX_AP but the compound path was not fully traced through the IOA invocation gap. |
| **Actionability** | 4 | All twelve recommendations are concrete and targeted to specific corpus locations. Two recommendations (EP-003 aggregate cap, EP-011 dashboard metric) require new numerical calibration that this audit cannot determine. |
| **Overall** | 4 | A comprehensive adversarial examination with concrete, evidence-grounded findings. The IOA invocation gap (EP-001) is the most severe finding and should be treated as a blocking issue before any pilot activation involving Level 3+ emergency governance. |

No dimension scored below 4. No repair pass required.
