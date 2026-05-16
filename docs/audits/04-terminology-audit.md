# Terminology Audit

**Date:** 2026-05-15
**Auditor:** Claude Code (claude-sonnet-4-6)
**Scope version:** current HEAD (branch: claude/pedantic-spence-c4e730)

---

## Scope

This audit covers terminology used in the constitutional and governance corpus of the Humane Constitution project. The primary target documents are:

- `docs/constitution/Humane_Constitution.md`
- `docs/constitution/INVARIANTS.md`
- `docs/constitution/Acceptance_Protocol.md`
- `docs/constitution/SPECIFICATIONS.md`
- `docs/annexes/ANNEX_*.md` (all discovered annexes)
- `docs/governance/*.md` (registers, logs, dashboards)
- `founding/commitments.md`

The audit examines 25 target terms across five groups: core constitutional terms, governance process terms, accountability terms, evidence and measurement terms, and operational terms. It does not examine simulation files, plan files, or spec files except as cross-references.

---

## Method

All findings are grounded in grep searches across the corpus. The searches looked for:

1. Explicit definition blocks (phrasing like "X means," "X is defined as," "X is the...")
2. Document frequency of each term (rough count of unique files containing the term)
3. Consistency of use across documents (whether the same word appears in structurally incompatible contexts)
4. Presence or absence of measurable thresholds or procedural gates

Where a term lacks a definition and is used in a way that would require one to reach a governance decision, it is flagged as having **enforcement risk**. Where observed evidence is ambiguous, findings are marked **UNCERTAIN**.

Defects and improvements are distinguished:

- **DEFECT** — an existing vagueness or inconsistency that creates a live governance risk right now
- **IMPROVEMENT** — a gap that matters for future operation but does not currently break any mechanism

---

## Undefined Terms

### 1. "human dignity"

**Evidence:** The term appears at least 15 times in `Humane_Constitution.md` (lines 117, 150, 152, 165, 167, 178, 242, 267, 304, 309, 316 and more), and repeatedly in `INVARIANTS.md`, `Claims_Evidence_Register.md`, `Christ_Centered_Evaluation.md`, and `Annex Y`. It functions as a constitutional floor: "the dignity floor is the exception: it applies everywhere because dignity is not up for a vote" (HC §0A). No document supplies a definitional sentence of the form "human dignity means X" or "human dignity consists of Y elements." ANNEX_Y.md (line 24) notes the CSM provides a "dignity margin" but does not define what that margin constitutes in non-physical terms. The Patch Log notes 14 Tier 2 protected terms locked at founding (ANNEX_AB §AB5); "dignity" is on that seed list but the lock protects the word from redefinition, it does not supply the definition.

**Status: DEFECT.** A term invoked to override local consent and constrain amendment must be defined. "Dignity" currently functions as an unanchored intensifier.

---

### 2. "corrigibility"

**Evidence:** The term appears 11 times across the corpus — exclusively in `Patch_Log.md`, `Christ_Centered_Evaluation.md`, `superpowers/plans/`, and `superpowers/specs/`. It does not appear anywhere in `Humane_Constitution.md` itself. The Patch Log entry for P-035 (line 56) describes it as a "normative commitment, not a structural enforcement mechanism." No file defines corrigibility as a constitutional term or provides procedural content: what must a corrigible system do? Who tests it? What triggers a finding of non-corrigibility?

**Status: DEFECT.** If corrigibility is the named property P-035 is designed to achieve, the absence of any operational definition makes P-035 unverifiable.

---

### 3. "public power"

**Evidence:** The phrase appears in `Humane_Constitution.md` (lines 58, 107, 110, 118, 242, 319), `public/02_faq.md`, `public/04_white_paper.md` (multiple times), and `public/07_life_under_the_system.md`. It is always used to name the thing that Flow cannot buy. No file provides a sentence of the form "public power means X" or lists what acts or roles constitute public power. The contrast with "private power" is implicit but never formally drawn. The white paper describes it as governance influence, but the constitution does not confirm this.

**Status: DEFECT.** The separation principle ("Flow cannot buy public power") is a core invariant. If "public power" is not defined, the boundary of that invariant is contested.

---

### 4. "qualified reviewer" / "qualified independent review body"

**Evidence:** The phrase "qualified independent review body" appears at `Humane_Constitution.md` line 327 in the keyholder duty clause: "a qualified independent review body may petition for the replacement of any keyholder found to be acting in demonstrable self-interest." The phrase also appears in `Patch_Log.md` lines 832 and `Christ_Centered_Evaluation.md` line 90. No file defines what makes a review body "qualified": required composition, independence criteria, appointment process, or minimum capabilities. The word "qualified" is doing constitutional load-bearing work with no definition backing it.

**Status: DEFECT.**

---

### 5. "emergency"

**Evidence:** The word appears in `Humane_Constitution.md` at least 8 times (lines 223, 493, 497, 544, 561, 582, 598). The Shared Storehouse is described as an "emergency overlay." `Humane_Constitution.md` line 223 describes a "Hard expiration rule" for Shared Storehouse activation. Line 598 references an "Emergency (L3)" scarcity level with a fill-rate trigger (<80% for 48 hours, verified disruption, severe). However, these are scarcity-level triggers for the Shared Storehouse, not a general definition of "emergency" for other purposes. `ANNEX_AC.md` line 40 allows the Interim Operational Authority to act in emergencies but does not define what constitutes one. ANNEX_AP.md uses "emergency deadlock resolution protocol" and ANNEX_AG.md references "Survival-floor threat" as a Class E1 emergency. Each context applies a different trigger. No single document provides a master definition.

**Status: DEFECT.** Multiple trigger standards for "emergency" exist in different contexts (scarcity, operational deadlock, survival threat) without a common definitional umbrella. A bad actor could argue their preferred trigger applies.

---

### 6. "harm"

**Evidence:** The word appears in `Humane_Constitution.md` lines 58, 169, 499, 500, 570. Line 169 refers to "structural harm." Line 499 is a failure-mode header: "Justice penalties harm innocents." Line 570 references "collateral harm from enforcement actions." No file defines harm, distinguishes physical from financial from structural harm, or sets a threshold at which harm becomes constitutionally significant. The Threat Register uses "harm" loosely throughout without definitional grounding.

**Status: DEFECT.** Without a harm definition, the statement "Essential Access delivery must not create coercive dynamics" cannot be enforced: every administrator can dispute what counts as harmful.

---

### 7. "public interest" / "public good"

**Evidence:** "Common good" appears once at `Humane_Constitution.md` line 430. The term "public interest" does not appear prominently in the constitution itself. The white paper uses these concepts implicitly. No formal definition exists. The system uses "public power," "public finance," and "public function" without tying them to a definition of public interest.

**Status: IMPROVEMENT.** Currently not load-bearing in enforcement decisions. Becomes a DEFECT if any enforcement gate invokes it.

---

## Overloaded Terms

### 8. "Tier 1" / "Tier 2"

**Evidence:** These terms carry at least three distinct meanings across the corpus:

- **Amendment tiers** (primary use): Tier 1 = invariants requiring 7-of-9 keyholder signatures + 180-day timelock; Tier 2 = founding commitments requiring supermajority + adversarial panel; Tier 3 = operational parameters via standard FAP. Defined in `INVARIANTS.md` lines 116, 123, 129.

- **Identity access tiers**: Tier 0 = open-access/pseudonymous survival floor; Tier 1 = identity-gated services (above-floor Essential Access, Voice, Service Record, Flow accounts). Defined in `ANNEX_P.md` line 20, `Humane_Constitution.md` line 330, `INVARIANTS.md` line 43.

- **Identity assurance tiers**: Tier 2 assurance minimum (biometric or equivalent at delivery point) referenced in `SPECIFICATIONS.md` line 105. Tier 3 methodology (Direct Physical Sampling) referenced in `SPECIFICATIONS.md` line 209. These appear to track a separate assurance-level scale.

These three tier systems coexist without a disambiguation key. A reader encountering "Tier 1" alone cannot determine which tier system is being invoked without full document context. `ANNEX_AS.md` lines 71-72 uses "identity assurance Tier 2" and "identity assurance Tier 3" in close proximity to amendment-tier references. The public-facing docs (`public/02_faq.md`, `public/04_white_paper.md`) use only the amendment meaning and give the entry-level reader no warning that the word carries other meanings elsewhere.

**Status: DEFECT.** This is a confirmed overload with three distinct referents for the same term. A governance actor could exploit the ambiguity to argue that a Tier-2-assurance identity decision requires a Tier-2-amendment override.

---

### 9. "independent"

**Evidence:** The word appears throughout the corpus with at least four operational meanings:

- **Institutional independence** (funding/appointment independence): the CIP "cannot be appointed by the current governing coalition" (`public/05_rights_layer.md` line 90).
- **Epistemological independence** (oracle methodology): formally defined in `ANNEX_AL.md` as requiring distinct error structures that fail in different directions under the same manipulation scenario. This is the most rigorous definition in the corpus.
- **Affiliation independence** (reviewer independence): the 4-year institutional affiliation bar (`Patch_Log.md` line 364).
- **Process independence** (separate office): "the office that reports on the system may not be the same office that runs the system" (`Humane_Constitution.md` line 325).

`ANNEX_AL.md` provides an explicit operational definition for oracle independence but this definition is not stated to apply to other uses of "independent." The constitution uses "independent review" (HC line 317), "independent audits" (HC line 325), and "independent panels" (HC line 429) without cross-referencing which independence standard applies.

**Status: DEFECT.** A weaker independence standard (affiliation only) could be argued to satisfy "independent review" requirements when epistemological independence (ANNEX_AL standard) is what the context demands.

---

### 10. "safety"

**Evidence:** "Safety" appears in `Humane_Constitution.md` at lines 125, 279, 331, 349, 352, 390, 426, 468, 529, 549, 551, 561, 567, 576, 578 — with at least four distinct referents:

- Physical survival safety (HC line 125: "safety margins" for capacity promises)
- Personal safety from violence (HC line 331: "safety-shielded enrollment" for persons whose disclosure would expose them to violence)
- Health and safety standards (HC line 390, 551: "health/safety violations" as a basis for housing renewal denial)
- Data/system safety (HC line 279: "cannot promise beyond conservative safety margins")

No document defines which meaning of safety applies in which context, or whether a single safety determination requires all four to be satisfied.

**Status: DEFECT.**

---

### 11. "governance" vs. "administration" vs. "management"

**Evidence:** All three terms appear in `Humane_Constitution.md`. "Governance" appears most frequently (lines 123, 169, 290, 311, 402, 446, 497). "Administration" appears at line 169: "They cannot create innocence or holiness by administration." Line 180 prohibits "state management of salvation." The corpus does not distinguish governance (constitutional rule-setting) from administration (delivery operations) from management (day-to-day system operations) in a formal way. The Acceptance Protocol refers to "elected governance bodies" and the Patch Log refers to "administrative bodies" without a definitional bridge.

**Status: IMPROVEMENT.** Currently not causing apparent conflicts. Becomes a DEFECT if an administrator claims governance authority or vice versa.

---

## Vague Terms With Enforcement Risk

### 12. "democratic oversight"

**Evidence:** The phrase "democratic oversight" appears in `INVARIANTS.md` line 126 and related documents, but never in `Humane_Constitution.md` itself. The constitution refers to "elected governance bodies," "civic deliberation," "public deliberation," and "Article VI" processes. No document defines what democratic oversight requires: quorum thresholds, participation minimums, representativeness standards, or distinguishing features from administrative approval. The Founding Order consent rule (HC line 304) provides procedural detail for joining (two-thirds vote, 90-day notice, 60-day public discussion, roll-call, two-thirds minimum participation) but this is labeled a "consent rule," not a democratic oversight definition.

**Status: DEFECT.** Without a definition, a claim that "democratic oversight was satisfied" cannot be evaluated.

---

### 13. "enforcement"

**Evidence:** "Enforcement" appears at `Humane_Constitution.md` lines 38, 126, 317, 382, 551, 570. Line 126 states: "enforcement is constrained by transparent rules, appeal paths, and independent oversight." Line 317: "enforcement requires clear rules, appeal paths, and independent review." Line 382: "target enforcement narrowly." But no document defines who has enforcement authority, by what mechanism enforcement is initiated, what process is required before enforcement action, or what constitutes the minimum procedural floor for enforcement. `ANNEX_AI.md` (Federated Ombuds) and `ANNEX_AJ.md` (penalty architecture) provide enforcement detail for specific contexts, but these are not stated to be exhaustive of what "enforcement" means constitutionally.

**Status: DEFECT.** Enforcement is named as constrained but the constraints are themselves incompletely defined.

---

### 14. "accountability"

**Evidence:** The word "accountability" appears in `Humane_Constitution.md` lines 165, 185, 294, 359 and throughout governance documents. It is used in three distinct senses: (a) financial accountability (line 185, "public accountability"), (b) institutional accountability (line 294, "public accountability signals"), and (c) personal accountability (delivery path naming "an accountable party" at line 359). No document provides a definition of accountability with procedural content: accountability to whom, through what process, on what timeline, with what consequence for failure.

**Status: DEFECT.**

---

### 15. "appeal" procedure and timeline

**Evidence:** "Appeal" appears in `Humane_Constitution.md` lines 40, 126, 317, 395 — always as a structural promise ("appeal paths must exist") but never with a procedure specified in the constitution itself. `ANNEX_L.md` provides the most developed treatment: a three-tier review architecture with Local Review Offices, Regional Constitutional Chambers, and the CRP. `ANNEX_L.md` line 67 states "Emergency relief windows should be measured in hours or days, not months" but uses "should" rather than "must." `ANNEX_I.md` line 99 specifies "ordinary status appeals must be available within 14 days of filing, with a written determination within 30 days." `ANNEX_AI.md` line 238 specifies a 30-day appeal window for penalty decisions. These timelines exist in annexes but are not stated in the constitution's core articles and are not cross-referenced from the constitutional promise. A constitutional violation that falls between the categories defined in these annexes has no guaranteed timeline.

**Status: DEFECT.** The constitutional promise of "appeal paths" is not backed by a minimum procedural floor in the constitution itself — it depends on finding the right annex.

---

### 16. "consent"

**Evidence:** "Consent" is used in at least three distinct senses: (a) jurisdictional consent (HC line 304: two-thirds vote, 90-day notice process for communities joining), (b) individual consent (HC line 307: individual may withdraw at any time), (c) data/process consent (HC line 611: household pooling requires "all members can revoke consent"). The jurisdictional consent process is well-specified. Individual consent withdrawal is specified as immediate and unconditional. Data consent is listed as a condition of pooling mechanisms. These three senses are not distinguished by the constitution. A governance actor could argue that individual consent withdrawal triggers the same 730-day unwind window as jurisdictional exit.

**Status: DEFECT.** Overloaded term with enforcement risk at the boundary between individual and jurisdictional consent.

---

## Inconsistent Terms Across Documents

### 17. "Tier 1" (amendment) vs. "Tier 1" (identity access) — cross-document inconsistency

**Evidence confirmed:** See §8 above. The public-facing documents (`public/02_faq.md`, `public/04_white_paper.md`, `public/01_overview.md`, `public/05_rights_layer.md`) use Tier 1 exclusively to mean amendment-tier. The operational annexes (`ANNEX_P.md`, `ANNEX_AK.md`, `ANNEX_AX.md`) use Tier 0/Tier 1 to mean identity access tiers. The constitution itself uses both systems in adjacent paragraphs (`Humane_Constitution.md` line 330 uses "Tier 1 identity-gated services" and "Tier 0 survival-floor access"). SPECIFICATIONS.md uses "Tier 2 assurance minimum" in an identity assurance sense (line 105) and "Tier 2" in an amendment sense (line 240).

**Finding: DEFECT.** Confirmed three-way overload with cross-document inconsistency.

---

### 18. "democratic legitimation" vs. "founding legitimacy" — different standards, unclear relationship

**Evidence:** "Democratic legitimation" appears in `INVARIANTS.md` line 126 as the ongoing legitimating force for Tier 1 invariants: "the authority of these invariants ultimately derives from the voluntary agreement of participating communities, not from any pre-existing constitutional mandate." "Founding legitimacy" is a separate concept governed by the Founding Legitimacy Dossier (`Humane_Constitution.md` line 309). The Acceptance Protocol governs the founding stage, after which "ordinary constitutional amendment replaces the Acceptance Protocol" (HC line 311). No document explains the relationship between founding legitimacy (achieved at activation) and ongoing democratic legitimation (a continuing obligation). The INVARIANTS.md note (line 126) could be read to mean that any invariant lacking ongoing democratic community support becomes de-legitimized — but no mechanism operationalizes this.

**Status: IMPROVEMENT.** Currently not creating an active enforcement conflict but creates a legitimacy gap if community participation falls below thresholds that are nowhere stated.

---

### 19. "Evidence-backed" status label vs. Evidence Ladder levels

**Evidence:** The corpus status vocabulary (`CLAUDE.md`, `corpus-contracts.md`) defines six status labels: Proposed, Designed, Active — unproven, Partly tested, Evidence-backed, Resolved. The Evidence Ladder (`governance/Evidence_Ladder.md`) defines eight numbered levels (0–8). These two systems coexist without an explicit crosswalk. The Claims Evidence Register uses the six-status vocabulary. The Evidence Ladder document says "The Claims and Evidence Register remains the canonical public status register. This ladder supplies the upgrade and downgrade rules behind those statuses." But the mapping between ladder level and status label is not stated. Is "Evidence-backed" status reached at Level 6 (limited pilot), Level 7 (independent audit), or Level 8 (evidence-backed operation)? The review file (`review/2026-05-01-full-review.md` line 603) defines "Evidence-backed" as "independent evidence at appropriate scale reviewed by an adversarial panel" — which maps to Level 7 or 8. But "appropriate scale" is undefined.

**Status: DEFECT.** Without an explicit crosswalk, the six-status system and the eight-level ladder can produce different conclusions about the same claim.

---

## Terms That Need Thresholds or Tests

### 20. "human dignity" — needs minimum content definition

The constitution requires the dignity floor to be unconditional and universal. It provides the CSM basket (food, water, shelter, transit, healthcare, mental health) as the physical floor. But what non-physical acts violate dignity? Surveillance? Forced disclosure? Stigma in delivery? The dignity floor cannot be enforced at its edges without content beyond the physical basket.

**Proposed threshold type:** Negative list — explicit enumeration of acts that always violate dignity regardless of local consent, cross-referenced to the CSM and the safety-shielded enrollment provisions.

---

### 21. "independent review" — needs independence standard per context

As found in §9, oracle independence is rigorously defined in ANNEX_AL but other "independent review" requirements are not. Without a minimum standard, an audit by a body appointed by the party being reviewed satisfies the constitutional text while gutting the intent.

**Proposed threshold type:** Procedural test — minimum independence criteria (appointment independence, funding independence, absence of economic stake, publication of methodology) applicable to all uses of "independent review" outside the oracle context.

---

### 22. "emergency" — needs master trigger definition

Three trigger systems exist (Shared Storehouse scarcity levels, operational deadlock triggers in PCRP, Interim Operational Authority activation in ANNEX_AC). A single constitutional definition should clarify the scope of emergency powers and which trigger standard applies in which context.

**Proposed threshold type:** Decision tree — which trigger standard applies based on the type of emergency (supply, governance, operational).

---

### 23. "democratic oversight" — needs minimum content

The constitution requires democratic oversight but does not specify minimum participation rates, representativeness requirements, or what distinguishes democratic deliberation from administrative review.

**Proposed threshold type:** Procedural minimum — quorum, notice period, participation floor, and roll-call requirement (the consent rule formula at HC line 304 is a good model).

---

### 24. "accountability" — needs consequence specification

Accountability without stated consequences for failure is performative. The corpus names "accountable parties" (HC line 359) but does not state what happens to them if they fail. ANNEX_L provides some remedies but the constitution does not cross-reference them.

**Proposed threshold type:** Consequence ladder — what happens when an accountable party fails to perform, at what point failure triggers escalation, and to whom.

---

### 25. "qualified" (reviewer/body) — needs qualification criteria

The keyholder replacement clause requires a "qualified independent review body" to petition for replacement. Without qualification criteria, any body claiming to be qualified can invoke this mechanism — or conversely, the keyholder council can reject any petition on the grounds that the petitioner is not "qualified."

**Proposed threshold type:** Enumerated qualifications — minimum composition, selection process, conflict screen, and funding independence requirements.

---

## Findings Table

| ID | Type | Severity | Confidence | Term | File | Section | Issue | Risk |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TF-01 | DEFECT | Critical | High | "human dignity" | `Humane_Constitution.md` | Throughout | Used as non-negotiable constitutional floor but never defined beyond physical basket | Dignity floor unenforced at non-physical edges; local actors can argue surveillance, forced disclosure, or stigmatizing delivery does not violate it |
| TF-02 | DEFECT | Critical | High | "Tier 1" / "Tier 2" | Multiple files | Throughout | Three-way overload: amendment tiers, identity access tiers, identity assurance tiers | Governance actor can exploit ambiguity; Tier-2-assurance decision could be argued to require Tier-2-amendment override |
| TF-03 | DEFECT | High | High | "independent" | `Humane_Constitution.md` lines 207, 317, 323, 325, 327, 340, 429 | Multiple articles | Four distinct independence standards; only oracle independence (ANNEX_AL) is formally defined | Weak independence standard (affiliation only) satisfies constitutional text while gutting intent |
| TF-04 | DEFECT | High | High | "emergency" | Multiple files | Multiple contexts | Three different trigger standards (scarcity L2/L3, deadlock, Interim Authority) with no master definition | Bad actor argues preferred trigger; emergency powers invoked outside intended scope |
| TF-05 | DEFECT | High | High | "enforcement" | `Humane_Constitution.md` lines 38, 126, 317, 382 | Articles I, VIII | Constrained but mechanism unspecified in core articles; depends on finding correct annex | Enforcement initiated without procedural floor; collateral harm to innocents (HC §21 failure mode) |
| TF-06 | DEFECT | High | High | "accountability" | `Humane_Constitution.md` lines 165, 185, 294, 359 | Multiple | Three distinct senses; no consequence ladder for failure | Named accountability parties face no specified consequence for non-performance |
| TF-07 | DEFECT | High | High | "qualified" (reviewer/body) | `Humane_Constitution.md` line 327 | Article I | Keyholder replacement requires "qualified independent review body" — undefined | Keyholders can block replacement by challenging petitioner's qualification; conversely any body can invoke mechanism |
| TF-08 | DEFECT | High | High | "corrigibility" | `Patch_Log.md` line 56 | P-035 | Named as a constitutional property but appears nowhere in `Humane_Constitution.md`; no operational definition | P-035 unverifiable; "corrigibility" cannot be tested or enforced |
| TF-09 | DEFECT | High | High | "consent" | `Humane_Constitution.md` lines 304, 307, 611 | Articles 0A, IV, V | Three distinct senses (jurisdictional, individual, data) not formally distinguished | Individual consent withdrawal could be argued to trigger jurisdictional unwind window |
| TF-10 | DEFECT | High | Medium | "public power" | `Humane_Constitution.md` lines 58, 107, 110, 118 | Core principle | Boundary of what counts as public power never formally defined | Separation invariant ("Flow cannot buy public power") has a contested boundary |
| TF-11 | DEFECT | Medium | High | "appeal" procedure | `Humane_Constitution.md` lines 40, 126, 317 | Articles I, VIII | Constitutional promise of appeal paths not backed by minimum procedural floor in core articles | A constitutional violation outside annex categories has no guaranteed appeal timeline |
| TF-12 | DEFECT | Medium | High | "democratic oversight" | `INVARIANTS.md` line 126 | INV-007 | Named as ongoing legitimating requirement with no minimum content definition | Empty compliance: a governing body holds a minimally attended public session and claims oversight satisfied |
| TF-13 | DEFECT | Medium | High | "Evidence-backed" label | Multiple governance docs | Status vocabulary | Six-status label system and eight-level Evidence Ladder coexist without an explicit crosswalk | Two reviewers examining the same claim can reach different status conclusions using different systems |
| TF-14 | DEFECT | Medium | Medium | "safety" | `Humane_Constitution.md` throughout | Multiple | Four referents (physical survival, personal safety, health/safety, system safety) not distinguished | "Safety violation" can mean different things in adjacent clauses; enforcement disputes |
| TF-15 | DEFECT | Medium | Medium | "harm" | `Humane_Constitution.md` lines 58, 169, 499, 570 | Multiple | Used as constitutional concept without definition or threshold | "Harm" as enforcement trigger is unquantifiable |
| TF-16 | IMPROVEMENT | Medium | High | "public interest" / "public good" | `Humane_Constitution.md` line 430 | Article VI | Not currently load-bearing but undefined | Becomes a DEFECT if invoked as an enforcement gate |
| TF-17 | IMPROVEMENT | Low | High | "governance" vs. "administration" | `Humane_Constitution.md` throughout | Multiple | Not formally distinguished | Administrator claims governance authority; governance body disclaims operational responsibility |
| TF-18 | IMPROVEMENT | Low | High | "democratic legitimation" vs. "founding legitimacy" | `INVARIANTS.md` line 126; `Humane_Constitution.md` line 309 | INV-007, §0A | Two concepts named but relationship not specified | Legitimacy gap if community participation falls below an unstated threshold |
| TF-19 | UNCERTAIN | High | Low | "corrigibility" in constitution | `Humane_Constitution.md` | Not found | UNCERTAIN: P-035 is listed as ACTIVE in the Patch Log but the word "corrigibility" was not found in `Humane_Constitution.md` by grep — the patch may have added the concept without using the term, or the term may be present under a synonym | If the patch is active but the concept is not findable, operational reviewers cannot verify compliance |
| TF-20 | DEFECT | Medium | High | "remedy" types | `ANNEX_L.md` §L5 | L5 | Remedy types listed (stay, nullification, rollback, continuity order, sanctions) but criteria for selecting among them are not stated | Remedies discretionary; same violation receives different remedies in different forums |

---

## Recommended Definition Constraints

### TF-01: "human dignity"

- **Proposed constraint type:** Negative list + reference to CSM
- **Proposed language anchor:** "Human dignity is violated by any act that denies a person their CSM entitlement, forces disclosure of identity under threat of survival loss, applies a behavioral score to survival access, treats a person as a data category rather than a rights-holder, or exposes a person to systematic humiliation in the delivery of constitutionally guaranteed services."
- **Why current vagueness is a governance risk:** The dignity floor overrides local consent. A contested edge case (surveillance at an Essential Access delivery point; forced biometric enrollment) will be litigated on undefined ground. Administrators will default to the narrowest reading; advocates will assert the broadest. The constitution has no arbiter.

---

### TF-02: "Tier" system disambiguation

- **Proposed constraint type:** Namespace declaration at document header level
- **Proposed language anchor:** Each document using "Tier" in any context should carry a disambiguation footnote: "In this document, 'Tier N' refers to [amendment hierarchy / identity access level / identity assurance level]. See [canonical source]."
- **Why current vagueness is a governance risk:** Confirmed three-way overload with evidence of co-occurrence in the same paragraph (`Humane_Constitution.md` line 330, `SPECIFICATIONS.md` lines 105 and 240). A constitutional decision about Tier 1 amendment requirements could be confused with Tier 1 identity access requirements.

---

### TF-03: "independent" — minimum standard for non-oracle contexts

- **Proposed constraint type:** Procedural test
- **Proposed minimum:** For any "independent review" required by constitutional text outside the oracle context: (a) reviewer appointed by a body other than the one being reviewed; (b) no financial relationship between reviewer and reviewed party in preceding 3 years; (c) methodology published before findings; (d) dissenting views published alongside majority findings.
- **Why current vagueness is a governance risk:** The most powerful independence requirement — oracle epistemological independence (ANNEX_AL) — is defined in a technical annex. The constitutional text that reviewers will actually cite says "independent review" without specifying which standard applies.

---

### TF-04: "emergency" — master trigger definition

- **Proposed constraint type:** Decision tree with three branches
- **Branch 1 (supply emergency):** Shared Storehouse scarcity triggers (L1, L2, L3 as defined in Humane_Constitution.md line 597–598 table). Activated by oracle quorum finding.
- **Branch 2 (governance emergency):** Deadlock where two or more valid processes block a mandatory decision. Activated by 6-hour rule per PCRP architecture.
- **Branch 3 (interim operations emergency):** Governance body incapacitated or absent. Activated by ANNEX_AC criteria (72 hours without oracle confirmation or CRP ratification).
- **Why current vagueness is a governance risk:** ANNEX_AC (line 40) allows the Interim Operational Authority to act "in emergencies" without stating which trigger standard determines that an emergency exists. This is an unguarded emergency power.

---

### TF-07: "qualified" (review body)

- **Proposed constraint type:** Enumerated qualifications
- **Proposed minimum:** A body is "qualified" under HC §0A keyholder duty when it: (a) has at least 5 members; (b) no member appointed by the keyholder council within the preceding 4 years; (c) no member with a financial stake in keyholder decisions; (d) at least one member meeting the jurist qualification standard in ANNEX_L §L2; (e) petition published at least 30 days before action.
- **Why current vagueness is a governance risk:** The keyholder replacement clause is the only structural mechanism to remove a captured keyholder. If the qualification bar is contested by the keyholders being replaced, the mechanism deadlocks.

---

### TF-09: "consent" disambiguation

- **Proposed constraint type:** Formal definition with three named subtypes
- **Proposed approach:** Define three subtypes explicitly: "Community Consent" (jurisdictional, governed by FC-120/121 and the two-thirds supermajority process), "Individual Consent" (personal, immediate, governed by HC §0A individual withdrawal right), and "Service Consent" (operational, in-session, governed by specific instrument rules). Cross-reference each use of "consent" to its subtype.
- **Why current vagueness is a governance risk:** The 730-day jurisdictional exit unwind is a reasonable constraint on community departure. It must not apply to individual consent withdrawal (which is immediate) or service consent revocation (which is real-time). An overextended reading harms individuals.

---

### TF-13: Evidence Ladder / Status Vocabulary crosswalk

- **Proposed constraint type:** Formal mapping table
- **Proposed minimum:** Publish a crosswalk in `governance/Evidence_Ladder.md` that maps each of the six status labels to the minimum and maximum Evidence Ladder level consistent with that label. For example: "Evidence-backed requires Level 7 independent audit or higher; Partly tested requires Level 5–6." Include a rule for what happens when a claim has evidence at Level 7 for some sub-claims and Level 4 for others.
- **Why current vagueness is a governance risk:** The Claims Evidence Register is the canonical status record. If two reviewers apply different implicit crosswalks, claim statuses diverge. Adversarial actors could challenge status upgrades by citing a stricter crosswalk.

---

## Recommendations for Later Phases

1. **Create a constitutional glossary.** No formal glossary exists anywhere in the corpus. The ANNEX_AB §AB5 "founding seed list" of 14 Tier 2 protected terms locks labels but does not supply definitions. A separate `docs/constitution/GLOSSARY.md` should be created (not as a CLAUDE.md artifact but as a constitutional document) with formal definitions for all Tier 1 and Tier 2 protected terms. This is currently an IMPROVEMENT; it becomes a DEFECT at first pilot operation.

2. **Require definition sections at the top of all constitutional articles.** The constitution's article structure does not include "Definitions" subsections. UK and EU legislative drafting practice includes an explicit definitions section before operative provisions. For a constitutional document of this complexity, this would prevent the current pattern of terms accumulating multiple implicit meanings across hundreds of lines.

3. **Formally adopt ANNEX_AL's independence standard as the default for all constitutional "independent review" requirements.** The oracle independence definition is the most rigorous in the corpus and was designed with adversarial evasion explicitly in mind. Cross-referencing it from the constitutional text would significantly reduce enforcement ambiguity.

4. **Resolve the Tier naming system collision before any public pilot.** The three-way Tier overload (amendment, identity access, identity assurance) should be resolved by renaming two of the three systems. A suggestion: keep "Tier 1/2/3" for amendment hierarchy (it is the most established use); rename identity access tiers as "Access Level 0 / Access Level 1" and identity assurance tiers as "Assurance Class 1/2/3." This requires changes across several annexes but eliminates a confirmed governance risk.

5. **Define "corrigibility" operationally before P-035 is declared verified.** The Patch Log marks P-035 as ACTIVE. Its verifiability depends on knowing what corrigibility requires. A minimum operational definition should include: (a) a submission pathway for correction proposals; (b) a response obligation (timeline and form); (c) a public record of submissions received and actions taken; (d) a prohibition on retaliation for submissions.

6. **Publish an "Emergency Powers Scope Document" before any pilot activation.** The Interim Operational Authority (ANNEX_AC) is a high-risk capability. Before activation, publish a standalone scope document that: defines which trigger standard activates which emergency regime, lists prohibited actions per regime, sets mandatory sunset and renewal rules for each regime type, and cross-references to oversight mechanisms.

7. **Add "appeal minimum floor" language to the constitution's core articles.** Currently the constitutional promise of "appeal paths" (HC line 126, 317) is not operationalized in core articles. Add language stating: "Any adverse decision affecting Essential Access, identity continuity, or Voice/Service Record standing must be subject to a written appeal pathway with: (a) notice of the basis within 72 hours; (b) interim restoration of access pending review for Essential Access matters; (c) written determination within 30 days." This exists in ANNEX_I and ANNEX_L but should be in the constitution itself.

---

## Self-Review

| Dimension | Score (1–5) | Notes |
|:---|:---|:---|
| **Coverage** | 4 | 25 target terms researched with direct grep evidence for each; founding/commitments.md read in full; Evidence Ladder read in full; ANNEX_L read in full. Gap: ANNEX_AP not readable due to access error; ANNEX_AC read only indirectly. |
| **Specificity** | 4 | Each finding includes line numbers and direct quoted evidence where possible. Some findings (TF-17, TF-18) are lower confidence because the term usage is distributed across many files without a clear defect anchor. |
| **Evidence** | 4 | All findings are grounded in observed text. No findings are based on memory or inference about what the text probably says. Uncertainty is marked explicitly (TF-19). |
| **Adversarial Depth** | 3 | Overload and enforcement-gap findings are adversarially framed. The audit did not attempt to construct full exploit scenarios for each defect or run cross-annex consistency checks exhaustively. A dedicated red-team pass would likely surface additional TF-13-type crosswalk defects in other vocabulary pairs. Score below 4. |
| **Actionability** | 4 | Each high/critical finding includes a proposed constraint type and language direction. Recommendations for Later Phases are prioritized and sequenced. |
| **Overall** | 4 | Solid coverage of all 25 target terms. Adversarial depth is the weakest dimension. |

### Repair Pass Needed: Adversarial Depth (Score 3)

**What is missing:** The audit identifies terms that are vague or overloaded but does not construct complete exploit scenarios showing how a specific bad actor (a captured keyholder, a hostile successor government, a rent-seeking vendor) would use each vagueness to their advantage. A repair pass should: (a) select the top 5 critical DEFECTs (TF-01, TF-02, TF-04, TF-07, TF-09) and write 2–3 sentence exploit scenarios for each; (b) check whether any existing mitigation in the corpus would block the exploit as written; (c) note where existing mitigations are sufficient and where they are not.

This repair pass is recommended before any pilot activation gate review.
