# Twelve Pillar Protocol — Full Constitutional Review
**Date:** 2026-05-01
**Reviewer:** Constitutional analyst / technical writer
**Scope:** All public-facing documents, governance documents, specifications, annexes, and evidence infrastructure listed in the review brief
**How to use this report:** Work through Section 5 (Implementation Roadmap) first for prioritized action items. Sections 1–4 provide the full evidence for each finding. The Appendix provides the status taxonomy reference for resolving Section 2, finding CO-004.

---

## Executive Summary

This review finds the document set to be substantively serious and internally coherent at a high level, but containing nine cross-document inconsistencies, four within-document contradictions, and seventeen improvement opportunities spanning clarity, completeness, structure, and tone. The most urgent finding is **IC-004**: the ANNEX_AH bootstrap resolution chain has a hard governance gap — if the post-activation audit (Stage 5) suspends P-013, P-014 has already been permanently closed and no recovery path is specified, leaving governance in an undefined state. The second most urgent finding is **IC-008**: three annexes explicitly referenced by Humane_Constitution.md (Annex Y, X, and AT) do not exist in the corpus, making every constitutional reference to those annexes a dangling pointer; Annex Y's absence is especially serious because it is the only place where "food, shelter, care" is defined quantitatively. The third priority cluster is public-clarity: the Constitution uses confident present-tense operational language while the Pilot Evidence Roadmap and Claims Register confirm that no major claim is evidence-backed at deployment scale — this discrepancy will mislead general readers who encounter the Constitution without the governance layer. Resolving these three clusters (governance gap, missing annexes, public status clarity) is prerequisite work before any further evidence-gathering effort is meaningful. The visual inventory in Section 4 provides nine complete image-generation prompts that, once produced, would substantially reduce the comprehension burden on new readers.

---

## Section 1: Inconsistencies Across Documents

Inconsistencies are cases where two or more documents make claims or use terms that are logically incompatible, creating contradictory impressions depending on which document a reader consults.

---

### IC-001: Demurrage Binding Paradox

**Documents in conflict:**
- SPECIFICATIONS.md — FC-050 marked "Binding" at 0.5%/month, Tier 3 (standard FAP process to change)
- Pilot_Evidence_Roadmap.md Phase 5 — idle-money fee "should remain a simulation and pilot parameter" until burden is transparent
- Open_Problems_Resolution_Docket.md — confirms the correct current claim is that demurrage is a designed mechanism requiring economic modeling, distributional testing, procurement red-team review, and legal-wrapper analysis before any evidence-backed deployment claim
- Claims_Evidence_Register.md — status: "Designed mechanism, needs evidence"

**Nature of conflict:** The word "Binding" in SPECIFICATIONS.md creates a false impression of settled, operationally confirmed design. All three other documents confirm it is not settled. A reader of SPECIFICATIONS.md alone will believe demurrage at 0.5%/month is a fixed commitment; a reader of the governance documents will understand it as a design hypothesis requiring evidence. These are materially different states.

**Recommended fix:** Qualify FC-050's status column in SPECIFICATIONS.md. Change "Binding" to "Binding design commitment — rate provisional pending evidence calibration (Phase 5). See Claims_Evidence_Register.md FC-050 entry." This preserves the intent (it is a core architectural commitment) while accurately representing its evidence state.

---

### IC-002: Voice Decay Representation Conflict

**Documents in conflict:**
- SPECIFICATIONS.md (lines 238–254) — Voice decay is a continuous exponential function: e^(−0.15t), where t is in days
- Humane_Constitution.md (lines 573–584) — Voice is described via discrete quarterly buckets: 0–50 units = 1.00x effective weight; 51–80 = 0.50x; 81–100 = 0.25x; >100 prohibited

**Nature of conflict:** These are not two descriptions of the same thing — they are two different components of the same mechanism. The exponential function governs how a Voice balance decays over calendar time. The quarterly bucket table governs how a current balance converts to effective voting weight at the moment a decision is called. Neither document explains this relationship. A reader of SPECIFICATIONS.md will believe Voice is a continuous decay instrument; a reader of the Constitution will believe it is a stepped weighting table. Neither reader will understand that both are true simultaneously and that the interaction between them is what determines actual civic influence.

**Recommended fix:** Add a bridging note in SPECIFICATIONS.md immediately after the decay formula: "The decay function governs balance over time. At any decision point, the current balance is also subject to the effective-weight conversion table specified in Humane_Constitution.md Article IV (quarterly buckets). These are two separate rules operating on the same instrument." Add the equivalent cross-reference in the Constitution.

---

### IC-003: "Is" vs. "Not Ready" Language

**Documents in conflict:**
- Humane_Constitution.md — uses present-tense operational language throughout: "Flow is ordinary money," "Essential Access provides," "The system ensures"
- Pilot_Evidence_Roadmap.md (line 293) — "the accurate public claim remains: the Humane Constitution is a serious constitutional design and critique target, not a ready deployment system"
- Claims_Evidence_Register.md — "No major operational claim in this project is currently Evidence-backed at deployment scale"

**Nature of conflict:** The Constitution reads as a description of a working system. The evidence and roadmap documents are explicit that it is not one. Public readers who encounter the Constitution directly — through a search result, a citation, or a shared link — will draw materially false conclusions about the system's operational status. This is not a minor framing issue; it is the central impression-management risk of the project.

**Recommended fix:** Add a status header to Humane_Constitution.md at the very top, before the preamble:

> **Document Status:** This is a constitutional design document and critique target. It is not a description of a deployed or deployment-ready system. No major operational claim has been validated at scale. See the [Claims and Evidence Register](../governance/Claims_Evidence_Register.md) and [Pilot Evidence Roadmap](../governance/Pilot_Evidence_Roadmap.md) for the honest current status of each claim.

The same header should appear on the white paper (04_white_paper.md), as it is the document most likely to reach general readers.

---

### IC-004: P-014 Closure Before Post-Audit Completion

**Documents in conflict:**
- ANNEX_AH.md (AH1) — "P-014 closes permanently upon P-013's ACTIVE status"
- ANNEX_AH.md (AH5) — P-014 closes at Stage 4, before the post-activation audit
- ANNEX_AH.md (AH6) — Post-activation audit within 90 days can find P-013 "compromised" and suspend it

**Nature of conflict:** This is a hard governance gap, not merely a framing issue. The closure sequence is: P-013 activates (Stage 4) → P-014 permanently closes → post-activation audit runs (Stage 5/AH6, within 90 days) → audit may find P-013 compromised and suspend it. If the audit suspends P-013, the governance state is: P-014 permanently closed + P-013 suspended + no recovery mechanism specified. The document set provides no answer to the question "what governs the Founding Amendment Process if P-013 is suspended post-activation?"

**This is the highest-priority structural finding in this review.** It is a gap in the constitutional logic itself, not a documentation or clarity issue.

**Recommended fix:** Add an explicit fallback clause to ANNEX_AH.md AH6 (post-activation audit section):

> "If the post-activation audit finds P-013 compromised and suspends it, the system enters Governance Suspension Mode. During suspension: (1) all non-emergency amendments are paused; (2) the adversarial panel convenes within 14 days to assess whether a new founding amendment process (successor to P-013) can be opened; (3) P-014's permanent closure is not reversed, but a new proposal analogous to P-014 may be opened by the adversarial panel under emergency governance procedures. Suspension may not exceed 180 days without triggering full constitutional review."

The specific content of the fallback is a substantive design decision for the project team. The point is that the gap must be filled with explicit text.

---

### IC-005: Challenge Window Mismatch

**Documents in conflict:**
- ANNEX_AH.md (AH2 Stage 1) — specifies "14-day public challenge window"
- Founding_Preactivation_Disclosure.md — specifies "60-day challenge window (April 10 – June 9, 2026)"

**Nature of conflict:** The 46-day difference is reportedly explained by P-020 (Founding Window Extension), but P-020's text is not present in the document corpus. Any reader of ANNEX_AH.md without access to P-020 will believe the challenge window is 14 days. Any reader of the Founding Preactivation Disclosure without access to ANNEX_AH.md will have no context for why 60 days was chosen. The cross-reference exists but is not prominent enough to prevent systematic misreading.

**Recommended fix:** Update ANNEX_AH.md AH2 Stage 1 directly in the body text, not just as a footnote: "Public challenge window: 14 days (base); extended to 60 days by P-020 (Founding Window Extension). The operative window for this founding is 60 days. See Founding_Preactivation_Disclosure.md." P-020 should also be added to the corpus if it is a ratified patch.

---

### IC-006: Hardening Queue FC-160–FC-184 vs. FC-050 Binding Status

**Documents in conflict:**
- SPECIFICATIONS.md — FC-050 marked as "Binding"
- Hardening_Queue.md — "Contract-commitment parameters" (FC-160–FC-184) marked "DESIGNED," require Demurrage Evidence Test Package before advancing

**Nature of conflict:** The relationship between FC-050 (the demurrage rate) and FC-160–FC-184 (the contract-commitment architecture) is unexplained. FC-050 is the rate; FC-160–FC-184 are the rules governing how that rate is implemented in contracts. If FC-160–FC-184 are "DESIGNED" and require evidence, but FC-050 is "Binding," readers cannot determine whether evidence tests can revise the rate itself or only inform the commitment architecture that implements it. This creates ambiguity about whether the Demurrage Evidence Test Package could result in a different rate.

**Recommended fix:** Add a linking note in SPECIFICATIONS.md near FC-050: "FC-050 is a provisional design commitment for the rate. FC-160–FC-184 govern the commitment architecture. Evidence from the Demurrage Evidence Test Package (see Hardening_Queue.md) may inform revisions to both the rate (FC-050, via standard Tier 3 FAP) and the commitment architecture (FC-160–FC-184)." This makes the revision pathway explicit without weakening the binding commitment language.

---

### IC-007: Capacity Measurement Deployed as ACTIVE-UNPROVEN

**Documents in conflict:**
- Hardening_Queue.md — Capacity measurement status: "ACTIVE-UNPROVEN"
- Humane_Constitution.md (lines 554–563) — scarcity threshold table references "published physical measures" as authoritative trigger criteria

**Nature of conflict:** The Constitution presents measurement thresholds as settled and authoritative ("when published physical measures indicate less than 14 days supply..."). The Hardening Queue explicitly acknowledges that the measurement methodology is unproven. Shared Storehouse activation, Essential Access issuance, and emergency rationing all depend on measurement accuracy. An ACTIVE-UNPROVEN measurement system activating emergency rationing is a significant risk that the Constitution does not surface.

**Recommended fix:** Add a status note to the scarcity threshold table in Humane_Constitution.md: "Note: capacity measurement methodology is currently ACTIVE-UNPROVEN (Hardening_Queue.md, Phase 3). These thresholds are the constitutional design specification. Actual trigger thresholds during any pilot or implementation phase are conditional on measurement validation."

---

### IC-008: Referenced Annexes That Do Not Exist

**Documents in conflict:**
- Humane_Constitution.md — references Annex Y (Constitutional Survival Minimum specification), Annex X (Flow issuance channels), Annex AT (external trade architecture)
- docs/annexes/INDEX.md — does not list Annex Y, Annex X, or Annex AT as existing files; the 2026-04-25 audit notes removed annexes D and O, newly created AM, AN, AP, AV, but makes no mention of Y, X, or AT

**Nature of conflict:** These are not optional or supplementary annexes. Annex Y is the only place the Constitution's promise of "food, shelter, care" receives quantitative content — without it, the Essential Access floor is an aspiration with no measurable specification. Annex X defines Flow issuance channels — without it, the monetary mechanics are incomplete. Annex AT defines external trade architecture — without it, the system's relationship to international exchange is undefined. Every constitutional reference to these three annexes is a dangling pointer.

**This is the second-highest-priority finding, tied with IC-004 in urgency.**

**Recommended fix:** Annex Y must be created as priority-1 (it defines the survival minimum underlying Essential Access). Annex X is priority-2 (monetary mechanics). Annex AT is priority-3 (trade architecture). Until each is written, the corresponding constitutional references should be annotated: "[Annex Y: not yet written — this clause currently has no measurable specification. See Open_Problems_Resolution_Docket.md.]"

---

### IC-009: Oracle Adversarial Seat Unamendable vs. Governance Structure Amendable

**Documents in conflict:**
- SPECIFICATIONS.md FC-033 — Oracle adversarial seat requirement "≥1 node" is Tier 1 (unamendable)
- SPECIFICATIONS.md FC-030, FC-031, FC-032 — Oracle governance structure is Tier 2 or Tier 3 (amendable by supermajority or standard FAP)

**Nature of conflict:** If the oracle governance structure can be changed through Tier 2/3 processes in ways that dilute the adversarial seat's practical effectiveness (for example, by expanding the oracle council from 5 to 20 nodes while keeping exactly 1 adversarial seat), the Tier 1 protection becomes hollow. One adversarial seat on a 20-node council has fundamentally different influence than one adversarial seat on a 5-node council, but both satisfy "≥1." The Tier 1 protection on absolute number does not protect proportional influence.

**Recommended fix:** Amend FC-033 to specify both an absolute floor and a proportional floor: "The oracle adversarial seat requirement is: ≥1 adversarial node AND ≥20% of total oracle nodes must be adversarial. Both conditions are Tier 1. Any expansion of the oracle council must maintain the ≥20% adversarial proportion. Reducing the adversarial proportion below 20% is equivalent to a Tier 1 amendment." This closes the dilution pathway while preserving flexibility to grow the council.

---

## Section 2: Contradictions Within Single Documents

Contradictions are cases where a single document makes two claims that are logically incompatible, creating internal tension the document does not resolve.

---

### CO-001: SPECIFICATIONS.md — "Enforced at Ledger Layer" + "Primary Residual Risk is Above-Ledger Bypass"

**Location:** SPECIFICATIONS.md, non-convertibility section

**Nature of contradiction:** "Enforced at ledger layer" implies strong, technically robust enforcement. "Primary residual risk is above-ledger bypass" implies the enforcement has a significant structural weakness. Both statements appear in the same document without any bridging explanation. A reader who trusts "enforced at ledger layer" will not adequately weight the residual risk. A reader who focuses on the residual risk will not understand what the ledger enforcement actually achieves.

**Recommended fix:** Add a bridging paragraph between the two statements:

> "The ledger enforcement prevents in-system conversion: Flow cannot be technically transformed into Essential Access or Voice through any ledger operation. However, ledger enforcement cannot prevent private arrangements external to the system — for example, a party that holds Essential Access credits could arrange private services in exchange for Flow transfers outside any official ledger entry. The practical enforcement layer for above-ledger bypass is non-technical: the 72-hour Essential Access expiry window makes stockpiling economically unattractive, demurrage costs make hoarding Flow for conversion purposes expensive, and the non-cash nature of Essential Access removes the most obvious arbitrage pathway. These are friction mechanisms, not absolute prohibitions. T-001 (shadow convertibility) remains the primary residual risk and is tracked in the Threat Register."

---

### CO-002: Humane_Constitution.md — "Cannot Become Permanent" + Scarcity Thresholds Without Sunsets

**Location:** Humane_Constitution.md Article V / line 495 (Shared Storehouse cannot become permanent); scarcity threshold table (lines 554–563)

**Nature of contradiction:** The permanence prohibition is stated without any mechanism that enforces it. The scarcity threshold table specifies activation criteria (when does the Storehouse turn on?) but provides no automatic sunset triggers (when does it turn off?). Without an automatic sunset, "cannot become permanent" is an aspiration rather than a constitutional rule. Extended scarcity conditions could keep L3 rationing active indefinitely while technically complying with the letter of each threshold check.

**Recommended fix:** Add mandatory sunset language directly to the scarcity threshold table entry for Emergency L3:

> "Emergency L3 rationing is subject to a mandatory 14-day sunset review regardless of current scarcity level. At each review, the CRP must affirmatively re-authorize continuation. If re-authorization does not occur within 14 days, Emergency L3 automatically de-escalates to Scarcity L2. A Shared Storehouse activation may not remain at Emergency L3 for more than 90 consecutive days without a full constitutional review of the scarcity condition."

---

### CO-003: INVARIANTS.md — "Two-Key Precondition Blocks Tier 1 Changes" + "Bootstrap Problem Means Authority Is Ungrounded"

**Location:** INVARIANTS.md — two-key precondition section; T-017 bootstrap problem acknowledgment

**Nature of contradiction:** The two-key precondition is presented as a structural safeguard that makes Tier 1 amendments practically impossible. The bootstrap acknowledgment concedes that the invariants' authority is itself ungrounded — the founding coalition that established the two-key precondition did so without pre-existing constitutional legitimacy. These two claims together mean: "We have made Tier 1 very hard to change" and "We acknowledge we had no legitimate authority to make that commitment." The document does not explain how a reader should hold both claims simultaneously.

**Recommended fix:** Add explicit bridging language near the two-key precondition description:

> "The two-key precondition is a structural hardening measure: it raises the practical cost of amending Tier 1 invariants to near-prohibitive levels within the system. It is not a legitimacy guarantee. The bootstrap problem (T-017) is a residual risk that structural preconditions cannot resolve — the authority of these invariants ultimately derives from the voluntary agreement of participating communities, not from any pre-existing constitutional mandate. The two-key precondition protects against capture and opportunistic revision; it does not substitute for ongoing democratic legitimation of the founding design."

---

### CO-004: Claims_Evidence_Register.md — Status Language Taxonomy + Usage Inconsistency Across Documents

**Location:** Claims_Evidence_Register.md (defines 7-level taxonomy); Hardening_Queue.md (uses DESIGNED / ACTIVE-UNPROVEN / ONGOING without mapping to taxonomy)

**Nature of contradiction:** The Claims Register defines a precise 7-level status taxonomy as its analytical foundation. Other governance documents use status language that does not map cleanly to these 7 levels, creating a situation where readers cannot reliably compare claim status across documents. The Hardening Queue's "DESIGNED" corresponds roughly to "Designed mechanism, needs evidence" but is not identical. "ACTIVE-UNPROVEN" is close to "Active-unproven control" but not labeled the same way. The definitional authority of the Claims Register is implicit rather than asserted.

**Recommended fix:** Add to the introductory section of Claims_Evidence_Register.md:

> "This register's status taxonomy is the canonical reference for all governance documents in this project. Documents using different status labels — for example, Hardening_Queue.md's DESIGNED, ACTIVE-UNPROVEN, and ONGOING — should be interpreted against the definitions in this register. The mapping is: DESIGNED → 'Designed mechanism, needs evidence'; ACTIVE-UNPROVEN → 'Active-unproven control'; ONGOING → context-dependent, see register entry."

Add a cross-reference note in Hardening_Queue.md: "Status labels in this document use shorthand codes. See Claims_Evidence_Register.md for canonical definitions."

---

## Section 3: Improvement Opportunities

### 3A. Clarity

---

**CL-001: White Paper Lacks Deployment Status Header**

The white paper (04_white_paper.md) opens with "A society where everyone has a basic needs floor..." with no status disclaimer. It is the most accessible public document in the set and the most likely to create false impressions about operational status.

**Fix:** Add a prominent status box near the top of 04_white_paper.md, before the introduction:

> **Status: Constitutional design and critique target — not a deployed or deployment-ready system. See the [Start Here](../public/00_start_here.md) and [Claims and Evidence Register](../governance/Claims_Evidence_Register.md) for the honest status of each claim.**

This box should be visually distinct in the reader app (bordered, slightly muted background, or similar treatment).

---

**CL-002: Voice Mechanism Explanation Split Across Three Documents**

The continuous decay function (SPECIFICATIONS.md), the quarterly bucket conversion (Humane_Constitution.md), and the plain-language description (white paper) each describe the Voice mechanism from a different angle. None cross-references the others. A reader using any one document will develop an incomplete model of how Voice actually works.

**Fix:** Add a "How Voice works" sidebar in 04_white_paper.md that explicitly bridges the three representations: "Voice balances decay continuously at roughly 50% every 5 days (e^(−0.15t)). At any decision point, your current balance is also converted through an effectiveness table: holding 0–50 units gives full 1.00x weight; 51–80 units is reduced to 0.50x; 81–100 units is reduced to 0.25x; holding more than 100 units is prohibited. The decay function prevents accumulation over time; the bucket table prevents gaming through large stockpiles at decision moments." Link this sidebar to both SPECIFICATIONS.md and Humane_Constitution.md.

---

**CL-003: Essential Access 72-Hour Window Not Explained in Public Documents**

The 72-hour expiry window is the primary practical mechanism that prevents Essential Access from accumulating or being stockpiled. It is also what distinguishes Essential Access from a basic income — it is specifically not cash and specifically not saveable. Yet the white paper, overview, FAQ, and rights layer all describe Essential Access without mentioning the expiry window.

The FAQ Q3 (presumably addressing what Essential Access is) does not mention that allocations expire, meaning readers may assume they accumulate across days or weeks.

**Fix:** Add expiry language to FAQ Q3 and the white paper Essential Access section. Example: "Essential Access allocations are refreshed regularly and expire every 72 hours — they are deliberately not saveable. This prevents them from being stockpiled, traded, or used as collateral. They are a daily needs floor, not a savings instrument."

---

**CL-004: Provenance Chain Not Explained in Any Reader-Facing Document**

The T→P→Annex chain is described in CLAUDE.md (the developer instructions) and in ANNEX_AH.md AH8 (a governance annex), but nowhere in any reader-facing document. New readers of the public documents have no map for navigating the relationship between threats, patches, and annexes. The Readiness Guide (03_readiness.md) directs readers to the Threat Register but does not explain the three-part provenance structure.

**Fix:** Add a short section to 03_readiness.md titled "How the governance chain works":

> "Every design decision in this project follows a three-part chain: Threat → Patch → Annex. A threat (T-NNN) identifies a failure mode. A patch (P-NNN) describes what was changed in response. An annex (ANNEX_XX.md) contains the full resulting constitutional text. The master linkage table is in ANNEX_AH.md § AH8. This chain is the permanent record of why each constitutional clause exists."

---

**CL-005: "Founding Order" Not Explained for General Readers**

The white paper section on "The Founding Order (Place-Based Entry)" describes joining, subsidiarity, and exit without explaining what the Founding Order is as a document set. Readers encounter the phrase as if it is self-explanatory.

**Fix:** Add one sentence of definition before the current content: "The Founding Order is the set of documents that governs how places join, operate within, and leave the system — it is a separate constitutional layer from the five instruments themselves, governing the political geography of participation rather than the economic mechanics of the instruments."

---

### 3B. Completeness

---

**CM-001: Annex Y, X, and AT Are Missing**

Three annexes explicitly referenced by the core Constitution do not exist in docs/annexes/.

Priority ranking:
1. **Annex Y** (Constitutional Survival Minimum specification) — the only place the Essential Access promise receives quantitative content. Without it, "food, shelter, care, transit" is constitutionally undefined.
2. **Annex X** (Flow issuance channels) — defines how Flow enters circulation.
3. **Annex AT** (external trade architecture) — defines the system's relationship to external currencies and trade.

Until each annex is written, constitutional references to it should include a bracketed notice: "[Annex Y: not yet written. This reference is currently a dangling pointer. See Open_Problems_Resolution_Docket.md for status.]"

---

**CM-002: Capacity Measurement Evidence Test Package Does Not Appear to Exist**

The Threat Resolution Matrix, Open Problems Docket, and Hardening Queue all reference a "Capacity Measurement Evidence Test Package." No such document appears in docs/governance/. The Demurrage and Identity/Recovery evidence test packages exist as models. Capacity measurement is arguably more foundational than either — the Shared Storehouse, Essential Access issuance, and all scarcity thresholds depend on measurement accuracy.

**Fix:** Create a Capacity_Measurement_Evidence_Test_Package.md in docs/governance/, following the structure established by the Demurrage and Identity/Recovery packages.

---

**CM-003: Provenance_Map.md Is Planned but Status Unknown**

CLAUDE.md notes: "A docs/governance/Provenance_Map.md is planned as the human-readable entry point to the T→P→Annex chain." The file either does not exist or is sparse. AH8 in ANNEX_AH.md covers T-001 through T-017 but not T-018 through T-027 (added in later patches).

**Fix:** If Provenance_Map.md does not exist, create it as the canonical reader-facing T→P→Annex map. If it exists but is sparse, populate it. Ensure it covers all threats T-001 through T-027. The visual in Section 4 (V-009) provides an image generation prompt that could accompany this document.

---

**CM-004: No Cross-Reference From Public Docs to Hardening Queue or Threat Matrix**

01_overview.md and 02_faq.md link to the Claims Register and Pilot Roadmap but not to the Threat Register, Threat Resolution Matrix, or Hardening Queue. These three documents show how the project handles its own failure modes — they are the best evidence of intellectual seriousness. Hiding them behind the governance layer means most public readers never see them.

**Fix:** Add links to the Threat Register, Threat Resolution Matrix, and Hardening Queue in 03_readiness.md's reading sequence, with brief descriptions: "The Threat Register catalogues known failure modes. The Threat Resolution Matrix shows which are resolved, partially addressed, or open. The Hardening Queue shows which controls are designed, unproven, or evidence-backed."

---

### 3C. Structure

---

**ST-001: Reading Order in 03_readiness.md Skips Hardening Queue**

The 13-step reading order in 03_readiness.md includes Claims Register, Conceptual Refinement Audit, External Evidence Register, Identity/Recovery Package, Demurrage Package, Open Problems Docket, Threat Resolution Matrix, Pilot Roadmap, White Paper, Rights Layer, Threat Register. The Hardening Queue — the master status tracker showing which controls are designed versus active-unproven versus evidence-backed — is never mentioned in the reading sequence.

**Fix:** Insert after "Open Problems Docket": "Hardening Queue — master status tracker showing which controls are designed, which are active-unproven, and which are evidence-backed. Reading this before the white paper prevents overconfidence about the system's current readiness."

---

**ST-002: Claims Register Should Assert Taxonomic Authority**

The Claims Register defines a canonical 7-level status taxonomy but does not assert authority over other governance documents that use different status terms. As a result, the taxonomy's precision is diluted in practice.

**Fix:** See CO-004 fix above. The Claims Register introduction should explicitly state that its taxonomy is authoritative and provide a mapping for Hardening Queue shorthand codes.

---

**ST-003: AH8 Linkage Table Does Not Cover T-018 Through T-027**

ANNEX_AH.md AH8 lists 15 T/P pairs covering T-001 through T-017. Later patches added threats T-018 through T-027, but these are not reflected in AH8. The linkage table is therefore out of date as the canonical T→P map.

**Fix:** Either update AH8 to include T-018 through T-027 with their corresponding P-NNN patch entries and annex references, or create a separate master linkage table document that supersedes AH8 and is maintained as threats and patches are added. The latter is preferable for long-term maintainability.

---

### 3D. Tone and Accessibility

---

**TA-001: FAQ Does Not Directly Address "Is This Communism?"**

FAQ Q5 addresses "central planning" but the word "communism" never appears in any FAQ entry. Skeptical readers who search for the document using this term or who approach from a politically conservative framing will not find a direct answer to their most likely first question. This is a missed accessibility opportunity.

**Fix:** Rename Q5 to "Is this communism or socialism?" or add Q5a with that title. A direct answer might be: "No. The system does not abolish private ownership, profit, or markets. Flow is ordinary money that functions in markets. What the design limits is the ability to purchase Essential Access, Voice, or Service Record — things the design treats as non-market goods. Think of it less like communism and more like a rule that prevents money from buying a court verdict: some things simply should not be for sale."

---

**TA-002: "What This Is Not" Section Is Accurate but Vague**

The white paper's "What This Is Not" section currently reads (approximately): "Not a utopia machine. Does not end greed, fear, pride, cruelty, corruption, bad judgment." This is accurate but does not help readers understand the actual scope of the design.

**Fix:** Reframe as a positive scope statement: "This is a rule design for limiting how money converts into power over other people's survival. It does not fix human nature. It tries to constrain the structural pathways through which money currently buys safety, voice, and immunity from consequences. If you can still be greedy, afraid, or cruel within these rules — you can be. The design targets the specific mechanism of survival-coercion, not character."

---

**TA-003: Rights Layer Buries Its Most Compelling Sentence**

The most accessible and emotionally resonant sentence in 05_rights_layer.md — "Losing money, status, or civic standing must not cancel your right to eat, drink, stay sheltered, travel for basics, or receive essential care" — appears as a sub-header in the middle of the document rather than as the opening.

**Fix:** Move this sentence (or a version of it) to the opening paragraph or a prominent pull quote at the top. It is the clearest statement of the core moral commitment in the entire document set and should be the first thing a reader encounters.

---

**TA-004: "Flow" As a Term Is Not Intuitive and Gets Lost**

Across the white paper, FAQ, and overview, "Flow" is used for ordinary money without consistent parenthetical clarification. After the first introduction, the term appears on its own and readers unfamiliar with the design may lose track of which instrument it refers to.

**Fix:** In each document's first three to five mentions of Flow after the initial definition, add "(ordinary money)" as a parenthetical — "Flow (ordinary money)" — until the term is established. This is especially important in the FAQ, where readers may jump to individual questions rather than reading linearly.

---

## Section 4: Visual Inventory

The following nine visuals would materially reduce comprehension burden for new readers. Each entry includes the current treatment, recommended diagram type, target documents, and a complete image generation prompt that can be used directly with any image generation tool.

| ID | Title | Current Treatment | Proposed Type | Priority |
|----|-------|------------------|--------------|----------|
| V-001 | Five-Tool Separation Architecture | Text table | Architectural silo diagram | High |
| V-002 | Flow Token Lifecycle | Mermaid statechart | Annotated state diagram | Medium |
| V-003 | Scarcity Escalation Ladder | Text table | Visual escalation ladder | High |
| V-004 | Amendment Tier Pyramid | Text description | Inverted pyramid infographic | Medium |
| V-005 | Demurrage Decay Curve | Formula only | Annotated line chart | Medium |
| V-006 | Voice vs. Service Record Decay Comparison | Separate statecharts | Side-by-side dual decay chart | Medium |
| V-007 | Oracle Polycentric Architecture | Text + parameter table | Network diagram | Medium |
| V-008 | Pilot Phase Sequence | Linear list | Horizontal phased roadmap | High |
| V-009 | Threat → Patch → Annex Provenance Chain | AH8 table + CLAUDE.md | Three-column chain diagram | High |

---

### V-001: Five-Tool Separation Architecture

**Current treatment:** Text table in white paper and overview
**Proposed diagram type:** Architectural diagram — five vertical silos with blocked conversion arrows
**Target documents:** 04_white_paper.md, 01_overview.md

**Image generation prompt:**

```
Architectural diagram showing five distinct vertical columns labeled: FLOW (deep blue), ESSENTIAL ACCESS (forest green), VOICE (amber gold), SERVICE RECORD (warm grey), SHARED STOREHOUSE (muted red, dashed border). Each column has icons representing what it does: Flow shows coins/wallet; Essential Access shows food/shelter/medicine; Voice shows a civic assembly; Service Record shows a contribution ledger; Shared Storehouse shows rationing boxes. Between each column are thick concrete walls with red X marks blocking conversion arrows. Below each column shows small text of what it CANNOT do. Shared Storehouse has a dashed 'emergency only' border and a clock icon. The overall aesthetic is clean constitutional infographic style, dark background, white text labels, minimal design.
```

---

### V-002: Flow Token Lifecycle

**Current treatment:** Mermaid statechart in SPECIFICATIONS.md
**Proposed diagram type:** Annotated state diagram with human-readable explanations
**Target documents:** SPECIFICATIONS.md (supplement existing mermaid), 04_white_paper.md

**Image generation prompt:**

```
State machine diagram for a currency lifecycle. States shown as rounded rectangles: UNISSUED (light grey), ACTIVE (bright blue), IDLE (amber with warning icon), COMMITTED (teal with lock icon), DECAYED (orange), RETIRED (dark grey, strikethrough). Arrows between states with labels: ACTIVE→IDLE (labeled 'sits unused'), IDLE→DECAYED (labeled '0.5%/month fee, funds public rails'), DECAYED→ACTIVE (labeled 'redeployed productively'), ACTIVE→COMMITTED (labeled 'project or contract escrow'), COMMITTED→ACTIVE (labeled 'milestone verified'), ACTIVE/DECAYED→RETIRED (labeled 'small balances or fee proceeds'). Annotations in light grey text explain the purpose of each rule. Clean technical diagram, white background, constitutional design aesthetic.
```

---

### V-003: Scarcity Escalation Ladder

**Current treatment:** Text table in Humane_Constitution.md, brief mention in white paper
**Proposed diagram type:** Visual escalation ladder with four levels, sunset requirements visible
**Target documents:** 04_white_paper.md, Humane_Constitution.md

**Image generation prompt:**

```
Escalation ladder diagram with 4 horizontal bands stacked vertically. Bottom band (wide, calm green): NORMAL — ≥21 days supply, Flow-based market allocation, icons of open market stalls. Second band (yellow, slightly narrower): WATCH L1 — <21 days supply, price rise >2× baseline, icons of public announcement, voluntary conservation. Third band (orange, narrower): SCARCITY L2 — <14 days supply, Shared Storehouse optional, pricing caps, icons of rationing queue. Top band (narrow, urgent red): EMERGENCY L3 — <7 days supply, mandatory rationing by lottery, all non-essentials suspended, daily CRP review, icons of emergency response. Arrows going up show threshold trigger, arrows going down show de-escalation path. A clock icon at L3 shows '14-day mandatory sunset review.' Clean infographic style, constitutional design aesthetic, dark background.
```

---

### V-004: Amendment Tier Pyramid

**Current treatment:** Text description in INVARIANTS.md and white paper glossary
**Proposed diagram type:** Inverted pyramid showing amendment difficulty, two-key precondition highlighted
**Target documents:** 04_white_paper.md, INVARIANTS.md

**Image generation prompt:**

```
Constitutional amendment pyramid diagram. Three tiers shown as horizontal bands in an inverted triangle (widest at bottom = easiest to change). Bottom tier (large, light grey): TIER 3 — Operational Parameters — 'Standard governance process. Examples: demurrage rate 0.5%/month, Service Record sector ceiling 20%.' Middle tier (medium, blue-grey): TIER 2 — Founding Commitments — 'Supermajority + adversarial panel review required. Examples: Essential Access 72h window, oracle minimum 5 nodes.' Top tier (small, dark with gold border): TIER 1 — INVARIANTS — 'Cannot be changed by any in-system process. Requires full constitutional refounding. Examples: Survival Unconditional, Non-Convertibility. PROTECTED BY TWO-KEY PRECONDITION: cryptographic attestation from adversarial panel required before any Tier 1 proposal enters review.' Arrows on left show amendment difficulty increasing upward. Clean constitutional design aesthetic, dark background, white text.
```

---

### V-005: Demurrage Decay Curve

**Current treatment:** Mathematical formula in SPECIFICATIONS.md, no chart
**Proposed diagram type:** Annotated line chart showing B(t) = B(0)·e^(−0.005t) over 12 months
**Target documents:** 04_white_paper.md, SPECIFICATIONS.md

**Image generation prompt:**

```
Line chart showing currency demurrage decay over 12 months. X-axis: months 0-12. Y-axis: balance (100% to 94%). Three lines: 1) Blue solid line 'Idle balance' following B(t) = B(0)·e^(-0.005t), starting at 100%, ending at ~94.2% at month 12. 2) Green dashed line 'Active/deployed balance' — flat at 100% (no decay). 3) Amber dotted line 'Decay charges funding public rails' — starting at 0, accumulating to ~5.8%. Annotations: at month 6 'approx. 3% of idle balance transferred to public infrastructure fund.' Note at bottom: 'Rate shown: 0.5%/month baseline. Ordinary household liquidity has protected operating buffer.' Clean data visualization, dark background, minimal gridlines, constitutional design aesthetic.
```

---

### V-006: Voice Decay vs. Service Record Decay Comparison

**Current treatment:** Separate statecharts in SPECIFICATIONS.md, no side-by-side comparison
**Proposed diagram type:** Side-by-side dual decay chart over one quarter
**Target documents:** SPECIFICATIONS.md

**Image generation prompt:**

```
Side-by-side comparison chart. Two line graphs sharing the same time axis (0 to 90 days / one quarter). Left chart 'VOICE — Fast Decay': Amber line starting at 100%, decaying steeply following e^(-0.15t), reaching ~13% at day 14, ~1% at day 30. Annotation: 'Roughly 50% every 5 days — influence fades without continued participation.' Right chart 'SERVICE RECORD — Slow Decay': Blue-grey line starting at 100%, decaying slowly, reaching ~88% at day 90. Annotation: 'Builds durable standing for leadership eligibility without becoming permanent rank.' Below each chart: small icon — Voice shows a voting ballot (fading), Service Record shows a contribution ledger (slowly dimming). Dotted vertical lines at days 30, 60, 90 mark quarterly cycles. Clean technical visualization, dark background, constitutional design aesthetic.
```

---

### V-007: Oracle Polycentric Architecture

**Current treatment:** Text description and parameter table in SPECIFICATIONS.md, no diagram
**Proposed diagram type:** Network diagram with 5 nodes, methodology classes, adversarial seat, consensus thresholds
**Target documents:** SPECIFICATIONS.md, 04_white_paper.md (simplified version)

**Image generation prompt:**

```
Network diagram showing a polycentric oracle system for capacity measurement. Central circle labeled 'CONSENSUS DECISION — 3/5 nodes for normal issuance, 4/5 for emergency.' Five satellite nodes arranged around it, each as a hexagon: Node 1 (blue) 'Statistical/Econometric — Tier 1 Methodology'; Node 2 (teal) 'Proxy Sampling — Tier 2 Methodology (logistics data, POS data)'; Node 3 (green) 'Direct Physical Sampling — Tier 3 Methodology (warehouse counts, shelter inspections)'; Node 4 (amber) 'Second statistical source — Tier 1'; Node 5 (red, labeled with sword icon) 'ADVERSARIAL NODE — Required by Tier 1 Invariant FC-033. Tasked with proving the others wrong.' Correlation constraint shown as a curved arrow labeled '≤0.30 Pearson correlation between any two nodes.' One node has a yellow warning icon 'Fault tolerant: up to 1 compromised node cannot swing consensus.' Clean network diagram, dark background, constitutional design aesthetic.
```

---

### V-008: Pilot Phase Sequence (8 Phases)

**Current treatment:** Linear list in Pilot_Evidence_Roadmap.md, no visual
**Proposed diagram type:** Horizontal phased roadmap with gates between phases
**Target documents:** Pilot_Evidence_Roadmap.md, 03_readiness.md

**Image generation prompt:**

```
Horizontal roadmap diagram showing 8 sequential pilot phases with dependency gates. Each phase shown as a rounded rectangle. Phase 1: 'Public Comprehension Testing — Can people understand and explain the system?' Phase 2: 'Identity and Recovery Pilot — Does the identity stack work for vulnerable populations?' Phase 3: 'Capacity Measurement Pilot — Are the oracle measurements reliable?' Phase 4: 'Essential Access Delivery and Appeals — Can the floor be delivered and challenged?' Phase 5: 'Flow, Demurrage, and Public-Rail Simulation — Economic burden and capture tests' Phase 6: 'Business Finance and Anti-Rent Red Team — Can firms operate without gaming?' Phase 7: 'Anti-Rent and Legal Wrapper Review — Do trust/foundation workarounds exist?' Phase 8: 'Governance Red-Team — Bootstrap, subsidiarity, hollowing, capture.' Between each phase: diamond-shaped gate labeled 'Must pass before proceeding.' Below each phase: small icon showing current status (clock = not started). Current status banner at top: 'All phases: Not started — design phase.' Dark background, clean roadmap aesthetic, constitutional design style.
```

---

### V-009: Threat → Patch → Annex Provenance Chain

**Current treatment:** AH8 table in ANNEX_AH.md (15 entries), description in CLAUDE.md
**Proposed diagram type:** Three-column chain diagram with example chain highlighted
**Target documents:** Provenance_Map.md (populate or create), 03_readiness.md

**Image generation prompt:**

```
Three-column chain diagram showing constitutional provenance structure. Column 1 (red/threat icons): 'THREAT REGISTER — What can go wrong? T-001 Shadow Convertibility, T-002 Identity Exploits, T-016 FAP Capture, T-017 Bootstrap Problem.' Column 2 (blue/patch icons): 'PATCH LOG — What was changed? P-001 Non-convertibility enforcement, P-003 Identity assurance, P-013 FAP hardening, P-014 Bootstrap resolution.' Column 3 (green/annex icons): 'ANNEXES — What are the full rules? ANNEX_AB Constitutional architecture, ANNEX_AK Identity thresholds, ANNEX_AG Acceptance protocol, ANNEX_AH Bootstrap resolution.' Arrows connecting each column: Threat → Patch labeled 'This threat motivated', Patch → Annex labeled 'Full rules in'. One example chain highlighted in gold: 'T-016 → P-013 → ANNEX_AG.' Note at bottom: 'The chain is the permanent record of why each constitutional clause exists.' Dark background, three-column layout, constitutional design aesthetic.
```

---

## Section 5: Implementation Roadmap

Findings are grouped into four tiers based on urgency and impact. Within each tier, items are ranked roughly by priority.

---

### Tier A: Critical Governance Gaps — Fix Before Any Public Promotion

These are structural problems in the constitutional logic itself, not documentation or clarity issues. They should be resolved before the document set is cited, shared, or promoted as complete.

| Priority | Finding | Action Required | Documents Affected |
|----------|---------|----------------|-------------------|
| A-1 | IC-004: P-013/P-014 suspension gap | Write explicit fallback clause for post-audit P-013 suspension scenario | ANNEX_AH.md (AH6) |
| A-2 | IC-008: Missing Annex Y | Write Annex Y (Constitutional Survival Minimum — quantitative floor for Essential Access) | New file: docs/annexes/ANNEX_Y.md |
| A-3 | IC-009: Oracle adversarial seat dilution | Add proportional floor (≥20%) to FC-033 Tier 1 protection | SPECIFICATIONS.md |
| A-4 | IC-008: Missing Annex X | Write Annex X (Flow issuance channels) | New file: docs/annexes/ANNEX_X.md |
| A-5 | IC-008: Missing Annex AT | Write Annex AT (external trade architecture) | New file: docs/annexes/ANNEX_AT.md |
| A-6 | CO-002: Shared Storehouse lacks automatic sunset | Add 14-day mandatory sunset review to scarcity threshold table L3 entry | Humane_Constitution.md |

---

### Tier B: Public Clarity — Fix Before Any New Reader Outreach

These issues cause systematic misreading by general audiences and should be resolved before the document set is shared with new audiences.

| Priority | Finding | Action Required | Documents Affected |
|----------|---------|----------------|-------------------|
| B-1 | IC-003: Present-tense operational language | Add status headers to Constitution and white paper | Humane_Constitution.md, 04_white_paper.md |
| B-2 | CL-001: White paper lacks status header | Add status box above introduction | 04_white_paper.md |
| B-3 | IC-002: Voice mechanism split explanation | Add bridging note in SPECIFICATIONS.md and Constitution; add sidebar in white paper | SPECIFICATIONS.md, Humane_Constitution.md, 04_white_paper.md |
| B-4 | CL-003: Essential Access 72h window not in public docs | Add expiry language to FAQ Q3 and white paper EA section | 02_faq.md, 04_white_paper.md |
| B-5 | TA-003: Rights Layer buries its best sentence | Move or pull-quote opening statement | 05_rights_layer.md |
| B-6 | TA-001: FAQ doesn't address "communism" | Add or rename Q5/Q5a | 02_faq.md |
| B-7 | TA-004: "Flow" term loses readers | Add "(ordinary money)" parenthetical in first uses | 02_faq.md, 04_white_paper.md, 01_overview.md |

---

### Tier C: Internal Consistency — Fix Before Expert Review or Formal Critique

These issues will be caught by attentive readers doing thorough document review. Resolving them improves the document set's credibility with technically sophisticated audiences.

| Priority | Finding | Action Required | Documents Affected |
|----------|---------|----------------|-------------------|
| C-1 | IC-001: Demurrage "Binding" vs. needs evidence | Qualify FC-050 status in SPECIFICATIONS | SPECIFICATIONS.md |
| C-2 | IC-005: Challenge window mismatch | Update AH2 Stage 1 body text; ensure P-020 is in corpus | ANNEX_AH.md |
| C-3 | IC-006: FC-050 vs. FC-160–FC-184 relationship | Add linking note in SPECIFICATIONS explaining revision pathways | SPECIFICATIONS.md |
| C-4 | IC-007: Capacity measurement ACTIVE-UNPROVEN | Add status caveat to scarcity threshold table | Humane_Constitution.md |
| C-5 | CO-001: Ledger enforcement vs. above-ledger bypass | Add bridging paragraph | SPECIFICATIONS.md |
| C-6 | CO-003: Two-key precondition vs. bootstrap problem | Add bridging language on structural hardening vs. legitimacy | INVARIANTS.md |
| C-7 | CO-004: Status taxonomy inconsistency | Add canonical authority statement to Claims Register; add cross-reference to Hardening Queue | Claims_Evidence_Register.md, Hardening_Queue.md |
| C-8 | ST-003: AH8 missing T-018–T-027 | Update AH8 or create successor master linkage table | ANNEX_AH.md or new Provenance_Map.md |

---

### Tier D: Completeness and Accessibility — Improvement Cycle

These are valuable improvements that can be addressed in a planned improvement cycle rather than urgently.

| Priority | Finding | Action Required | Documents Affected |
|----------|---------|----------------|-------------------|
| D-1 | CM-002: Capacity Measurement Evidence Test Package missing | Create docs/governance/Capacity_Measurement_Evidence_Test_Package.md | New file |
| D-2 | CM-003: Provenance_Map.md sparse or missing | Create or populate docs/governance/Provenance_Map.md covering T-001–T-027 | New or existing file |
| D-3 | CM-004: No public links to threat/hardening docs | Add links and descriptions in 03_readiness.md | 03_readiness.md |
| D-4 | CL-004: Provenance chain not in reader docs | Add "How the governance chain works" section to 03_readiness.md | 03_readiness.md |
| D-5 | CL-005: "Founding Order" unexplained | Add one-sentence definition | 04_white_paper.md |
| D-6 | ST-001: Hardening Queue missing from reading order | Insert in 03_readiness.md reading sequence | 03_readiness.md |
| D-7 | ST-002: Claims Register doesn't assert taxonomic authority | Add authority statement and mapping to intro | Claims_Evidence_Register.md |
| D-8 | TA-002: "What This Is Not" vague | Reframe as positive scope statement | 04_white_paper.md |

---

### Tier E: Visual Infrastructure — Planned Production Work

Produce the nine visuals in Section 4 in the following priority order based on comprehension impact:

1. V-001 (Five-Tool Separation Architecture) — highest public impact, goes in white paper and overview
2. V-003 (Scarcity Escalation Ladder) — resolves IC-007 visually and aids comprehension of emergency provisions
3. V-008 (Pilot Phase Sequence) — shows honest status to readers; reduces overclaiming risk
4. V-009 (T→P→Annex Provenance Chain) — supports Provenance_Map.md and 03_readiness.md improvements
5. V-004 (Amendment Tier Pyramid) — explains governance structure accessibly
6. V-002 (Flow Token Lifecycle) — supplements existing mermaid in SPECIFICATIONS
7. V-005 (Demurrage Decay Curve) — supports CL-002 and demurrage evidence test infrastructure
8. V-006 (Voice/Service Record Decay Comparison) — resolves IC-002 visually
9. V-007 (Oracle Polycentric Architecture) — for technically sophisticated readers

---

## Appendix: Status Taxonomy Reference

The following 7-level taxonomy is defined in Claims_Evidence_Register.md and is the canonical status framework for all governance documents in this project. Per CO-004's recommended fix, documents using different status labels should be interpreted against these definitions.

| Level | Label | Definition |
|-------|-------|-----------|
| 1 | Moral commitment | A foundational value claim not subject to empirical falsification. Example: "Survival is unconditional." |
| 2 | Designed mechanism | A mechanism whose logic is specified but has not been tested in any implementation. Example: "Demurrage at 0.5%/month funds public rails." |
| 3 | Active-unproven control | A mechanism that is operationally specified and has been deployed in some form but whose effectiveness has not been independently validated. Example: capacity measurement oracle. |
| 4 | Partly tested | A mechanism tested in limited scope or controlled conditions, with partial evidence for effectiveness. |
| 5 | Needs evidence | A claim for which the design rationale exists but for which specific evidence tests must be run before a deployment claim can be made. |
| 6 | Unresolved prerequisite | A claim that cannot be evaluated because it depends on a prior unresolved question. Example: claims about Essential Access effectiveness that depend on Annex Y (not yet written). |
| 7 | Evidence-backed | A claim for which independent evidence at appropriate scale has been gathered and reviewed by an adversarial panel. |

**Mapping from Hardening Queue shorthand to this taxonomy:**
- DESIGNED → Level 2 (Designed mechanism)
- ACTIVE-UNPROVEN → Level 3 (Active-unproven control)
- ONGOING → Context-dependent; see specific Claims Register entry

**Note on Level 1 (Moral commitment):** Moral commitments are not evidence-backed in the empirical sense — they are not supposed to be. The point of Level 1 is to distinguish value claims that can only be challenged by offering competing values from empirical claims that can be challenged by producing data. The tier system (Tier 1 Invariants) maps onto Level 1 claims: they are constitutionally protected not because they are proven but because the project treats them as prior commitments that constrain the design rather than results of the design.

---

*Review completed 2026-05-01. Total findings: 9 cross-document inconsistencies (IC-001 through IC-009), 4 within-document contradictions (CO-001 through CO-004), 17 improvement opportunities (CL-001 through CL-005, CM-001 through CM-004, ST-001 through ST-003, TA-001 through TA-004), 9 visual inventory entries (V-001 through V-009). Critical governance gaps in Tier A require resolution before further public outreach.*
