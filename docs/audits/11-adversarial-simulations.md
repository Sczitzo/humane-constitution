# Adversarial Simulations

**Phase 2 adversarial stress-testing of the Humane Constitution**
**Date:** 2026-05-15
**Auditor note:** All findings are based on observed corpus text. No finding is invented. Uncertainty is marked UNCERTAIN. DEFECT means the exploit path succeeds or partially succeeds under current text. IMPROVEMENT means the safeguard holds but is fragile or observable only with difficulty.

---

## Scope

This document runs adversarial simulations against the Humane Constitution corpus as of the Phase 2 audit date. It covers twelve individual actor simulations and five compound simulations. The goal is to find exploitable seams in the constitutional text, the governance procedures, and the institutional architecture — not to evaluate whether the design is admirable in intent.

Corpus files consulted: `docs/constitution/Humane_Constitution.md`, `docs/constitution/INVARIANTS.md`, `docs/annexes/ANNEX_AH.md`, `docs/annexes/ANNEX_AI.md`, `docs/annexes/ANNEX_AL.md`, `docs/annexes/ANNEX_AM.md`, `docs/annexes/ANNEX_AC.md`, `docs/annexes/ANNEX_AE.md`, `docs/annexes/ANNEX_AT.md`, `docs/annexes/ANNEX_AB.md`, `docs/governance/Founding_Capital_Framework.md`, `founding/commitments.md`, `docs/audits/00-phase1-findings-index.json`.

Phase 1 findings that directly feed simulation material: P1-IC-007 (founding basket undefined, 70% floor exploitable), P1-IC-008 (CIP ratification requirement invisible in the Constitution), P1-IC-011 (6-of-7 removal threshold is mathematically impossible on a 5-member body), P1-TF-001 (human dignity undefined), P1-TF-002 (Tier 1/Tier 2 overloaded), P1-TF-004 (emergency undefined), P1-TF-010 (public power boundary undefined), P1-TR-011 (T-022 primary defense PROPOSED only), P1-IC-001 (demurrage safe harbor contradiction).

---

## Method

For each simulation:
1. Identify a plausible bad-faith actor with a specific objective.
2. Trace the step-by-step path through actual corpus text (citing document and section).
3. Identify the provision that is supposed to stop it and test whether the text actually stops it.
4. Distinguish failure modes that are latent now from those that require a future state to exploit.
5. Assess severity and confidence without inflating either.

Simulations do not assume omniscient actors. Each actor has access to the public corpus, plausible institutional standing, and realistic leverage. Simulations do not assume perfect defenders either — oversight bodies are assumed to be resource-constrained and operating in good faith but fallibly.

---

## Simulation Matrix

| # | Actor | Objective | Key Provision Targeted | Phase 3 Tag |
|---|---|---|---|---|
| 1 | Corrupt Elected Official | Electoral capture / hollow institutions | ANNEX_AM, T-022, ANNEX_AI | capture |
| 2 | Captured Oversight Board | Neutralize constitutional review | ANNEX_AI §AM8.4, 6-of-7 threshold | capture |
| 3 | Dominant AI Vendor | Oracle methodology monoculture | ANNEX_AL FC-030/031/032 | ai-authority |
| 4 | Hostile Bureaucrat | Throughput starvation | ANNEX_AC AC1.2, AE2.2 | human-judgment |
| 5 | Emergency Executive | Bootstrap permanence | ANNEX_AH AH1, T-017 | emergency |
| 6 | Wealthy Donor Network | Definition drift + capital leverage | ANNEX_AB, Founding_Capital_Framework | capture |
| 7 | Foreign Adversary | Oracle poisoning | ANNEX_AL, T-020/T-021 | simulation |
| 8 | Overreaching Safety Team | Safety-override expansion | HC Article I, T-014 definition | emergency |
| 9 | Activist Faction | Procedural deadlock weaponization | ANNEX_AE AE2.3, triple-deadlock | human-judgment |
| 10 | Private Infrastructure Provider | Essential-sector refusal leverage | ANNEX_AT AT1, HC Article IV | rights-remedy |
| 11 | Data Broker / Surveillance Contractor | Secondary data monetization | HC Article II identity data clause | traceability |
| 12 | Future Maintainer | Quiet definition weakening | ANNEX_AB AB5, ANNEX_AH AH8 | traceability |
| C-A | AI Vendor + Captured Audit Board | Oracle quality + review conflict | ANNEX_AL + ANNEX_AI | ai-authority |
| C-B | Emergency Executive + Bureaucratic Delay | Emergency permanence via audit delay | ANNEX_AH AH6 + ANNEX_AC | emergency |
| C-C | Donor Network + Definition Drift | Redefine Essential Access scope | Founding_Capital_Framework + ANNEX_AB | capture |
| C-D | Data Broker + Infrastructure Provider | Identity + delivery coercion | ANNEX_AK + ANNEX_AT | rights-remedy |
| C-E | Future Maintainer + Vague Terminology | Narrow enforcement via undefined terms | HC + INVARIANTS.md + ANNEX_AB | traceability |

---

## Individual Actor Simulations

---

### Simulation 1: Corrupt Elected Official — Electoral Capture

- **Actor:** An elected official who has won a governing-coalition supermajority and has 3–4 years in office before the next electoral cycle.
- **Objective:** Hollow out the constitutional oversight architecture (CIP, Federated Ombuds, oracle network) through appointment starvation, unfilling seats, and defunding — without triggering the full Tier 1 amendment process.
- **Exploit path:**
  1. ANNEX_AM §AM3 specifies that a mandatory constitutional review triggers automatically when a founding institution seat is unfilled for more than 90 days. The review is "initiated by the constitutional body (AM1)" — i.e., the CIP. If CIP seats themselves are deliberately left unfilled, there is no initiating body.
  2. The official allows CIP seats to expire by not nominating successors. AM8.1 states "no more than 2 members may be appointed by any single branch," but does not specify a nomination deadline or a fallback nominating authority if the primary appointing sources fail to nominate.
  3. With CIP below quorum (AM8.5 requires 5-of-7), the CIP cannot ratify Tier 1 amendments (AM8.6). The official may now propose constitutional changes with the argument that they cannot be blocked because the ratification body lacks quorum.
  4. Simultaneously, the official uses budget discretion to delay Article VII dashboard publication beyond 14 days (triggering AM3 automatic review), but the review is self-paralyzed because the CIP lacks quorum.
  5. The official then appoints compliant replacements in a single batch — potentially 3–4 seats at once if deliberate prior vacancies accumulated — violating the "no more than 2 seats turn over in any single calendar year" staggering rule (AM8.2), but with no enforcement mechanism specified for violations of the staggering rule.
- **Affected files/sections:** `docs/annexes/ANNEX_AM.md` §AM1, §AM3, §AM8.1, §AM8.2, §AM8.5; `docs/constitution/Humane_Constitution.md` Article I "Anti-capture review."
- **Principle violated:** Electoral cycle resilience (T-022). The CIP is the constitutionally designated blocking mechanism — if it can be vacated faster than it self-repairs, the protection collapses.
- **Current safeguard:** AM8.1 composition rules, AM8.2 staggering, AM3 automatic triggers, FC-110 7-of-9 amendment signatures.
- **Why safeguard fails or holds:** FAILS PARTIALLY. AM8.2 states "no more than 2 seats may turn over in any single calendar year" but specifies no enforcement action, no fallback nominating authority, and no trigger if the governing coalition simply delays nominations indefinitely. The CIP cannot self-constitute below quorum. The Federated Ombuds (ANNEX_AI) can initiate AM8.4 removal proceedings, but removal requires a "6-of-7 vote of the Federated Ombuds Plenum" — a mathematically impossible threshold on a 5-member body per Phase 1 finding P1-IC-011. This means even if the Federated Ombuds tries to act, the removal mechanism is structurally broken as written.
- **Early warning signs:** CIP seats held vacant beyond 90 days without published nomination timeline. Article VII dashboard publications slipping past 14-day cadence. Budget proposals that reduce CIP funding without a Tier 1 amendment filed.
- **Recommended fix shape:** Add a fallback nomination pathway triggered at 45 days of vacancy (half the AM3 trigger). Specify an enforcement consequence for staggering-rule violations (e.g., the violating appointments are void). Fix the 6-of-7 removal threshold to 4-of-5 to match the actual Plenum size (resolving P1-IC-011).
- **Severity:** Critical
- **Confidence:** High
- **Phase 3 synthesis tag:** capture

---

### Simulation 2: Captured Oversight Board

- **Actor:** A well-funded interest coalition that has successfully placed sympathetic individuals on at least 2 of the 5 Federated Ombuds sub-nodes through legitimate nomination processes over 4 years.
- **Objective:** Use the captured sub-nodes to block protocol-level decisions (4-of-5 threshold) and manufacture favorable determinations for manufactured-demand enforcement cases.
- **Exploit path:**
  1. ANNEX_AI §3 requires 4-of-5 Plenum vote for protocol-level decisions (FC-091). If 2 sub-nodes are captured, the coalition cannot affirmatively pass unauthorized decisions (a 3-of-5 coalition falls below 4-of-5). However, the same 3-of-5 coalition can *block* any decision by ensuring only 3 affirmative votes — 4 is required, but 3 captured sub-nodes suffice to block.
  2. The coalition uses captured sub-nodes to contest Duty Sub-Ombuds manufactured-flag determinations through post-hoc federation review (ANNEX_AI §1.3), creating procedural delay and appeals backlog without meeting the 4-of-5 threshold for authoritative reversal.
  3. ANNEX_AI §2.1 states sub-Ombuds Commissioners are "confirmed by a 2/3 vote of the CRP." If the CRP itself is under political pressure (T-022 capture scenario), Commissioner confirmation can be delayed indefinitely, creating vacancy without technically violating any rule.
  4. AM8.4 states CIP members can be removed by "6-of-7 vote of the Federated Ombuds Plenum." With 2 captured sub-nodes, the Plenum vote cannot reach 6 affirmative on a 5-member body. The captured members can thus protect any CIP member who is also sympathetic — creating a mutual protection loop between captured CIP and captured Ombuds.
- **Affected files/sections:** `docs/annexes/ANNEX_AI.md` §1.3, §2.1, §3; `docs/annexes/ANNEX_AM.md` §AM8.4; `founding/commitments.md` FC-090, FC-091.
- **Principle violated:** Independent oversight of enforcement, identity, and supply systems. T-008 auditor capture.
- **Current safeguard:** 5-sub-node BFT design tolerates f=1 captured node. Geographic and institutional dispersal (ANNEX_AI §1.2).
- **Why safeguard fails or holds:** PARTIALLY FAILS at f=2 capture. The BFT framing in ANNEX_AI §0 correctly states "f=1 captured or coerced sub-node without producing a wrong determination." At f=2, the design explicitly cannot produce an unauthorized affirmative determination — but it *can* block all affirmative determinations indefinitely. The corpus acknowledges this ("f=2 without producing an unauthorised determination") but does not address the blocking-only failure mode where the system is paralyzed rather than corrupted. This is a known gap not addressed in ANNEX_AI.
- **Early warning signs:** Protocol-level Plenum decisions consistently failing to reach 4-of-5 affirmative. Post-hoc reviews being filed immediately after every Duty Sub-Ombuds determination. Plenum quarterly meetings postponed or lacking quorum.
- **Recommended fix shape:** Define a "blocking deadlock" resolution pathway for repeated Plenum vote failures on protocol-level decisions — possibly using the AE2.3 emergency deadlock panel structure. Add automatic escalation after N consecutive blocked Plenum decisions.
- **Severity:** High
- **Confidence:** High
- **Phase 3 synthesis tag:** capture

---

### Simulation 3: Dominant AI Vendor

- **Actor:** A large AI company that has been accredited as an oracle node provider for three of the five required oracle nodes in a high-volatility essential category (food/staples).
- **Objective:** Gain de facto control over capacity measurements that determine Essential Access issuance levels — and use that control to provide systematic over-reporting of available supply to benefit the vendor's downstream commodity position.
- **Exploit path:**
  1. ANNEX_AL §1 defines "methodology class" by three jointly necessary characteristics: knowledge basis, data generation process, and standards provenance. Two nodes belong to the **same** methodology class if they share any two of the three.
  2. A sophisticated vendor submits three oracle nodes that use nominally different algorithms (AI/ML models) but share the same training data provenance (e.g., all trained on datasets certified by the same standards body) and the same knowledge basis (statistical inference from historical price signals). This satisfies the letter of FC-031 (3 methodology classes minimum) while violating its spirit.
  3. ANNEX_AL §4 specifies an "anti-monoculture trigger" for shared standards bodies, but the trigger is a concentration rule that must be detected and flagged. Detection requires a published annual audit of the worked examples (§5). The audit is retrospective; systematic correlation can run undetected for multiple cycles before it exceeds thresholds.
  4. FC-032 caps pairwise correlation at 0.30 on historical error series. However, if the correlated errors are in the same *direction* consistently (systematic over-reporting), the pairwise correlation on *error residuals* may remain low while the directional bias compounds — the correlation metric does not catch directional bias, only co-movement.
  5. Once the vendor has control of 3-of-5 nodes, any attempted correction by the remaining 2 nodes is insufficient to move the quorum determination, which uses the oracle quorum median or consensus mechanism (unspecified in the corpus — UNCERTAIN on exact aggregation method).
- **Affected files/sections:** `docs/annexes/ANNEX_AL.md` §1, §2, §4, §5; `founding/commitments.md` FC-030, FC-031, FC-032, FC-033.
- **Principle violated:** Oracle epistemological and algorithmic independence (P-017). T-020 / T-021.
- **Current safeguard:** FC-032 pairwise correlation cap (0.30), FC-031 methodology class minimum (3), FC-033 adversarial seat minimum (1), ANNEX_AL §4 anti-monoculture trigger.
- **Why safeguard fails or holds:** PARTIALLY FAILS. The corpus is well-designed against correlation capture but has a gap: FC-032 measures pairwise correlation on historical error series, which detects co-movement but not systematic directional bias. An adversary who understands this measurement approach can engineer nodes that diverge from each other (keeping pairwise correlation below 0.30) while all drifting in the same beneficial direction. The adversarial seat (FC-033) is supposed to challenge this, but the adversarial seat's mandate is defined by each oracle cohort's accreditation process — if the cohort itself is vendor-dominated, the adversarial seat may be structurally weak.
- **Early warning signs:** Three oracle nodes from the same vendor or methodology lineage passing the correlation test while their directional error (over-reporting vs. under-reporting) is consistently aligned. Adversarial seat dissents being dismissed without published substantive responses.
- **Recommended fix shape:** Add a directional bias test to the FC-032 correlation requirement: nodes in the same cohort whose errors are directionally correlated above a threshold (e.g., all biased toward over-reporting more than 60% of measurement cycles) are treated as same-class regardless of pairwise correlation value. Require the adversarial seat to include a written directional bias assessment in each accreditation cycle.
- **Severity:** Critical
- **Confidence:** Medium
- **Phase 3 synthesis tag:** ai-authority

---

### Simulation 4: Hostile Bureaucrat — Throughput Starvation

- **Actor:** A mid-level governance official with authority over proposal queue management in the Constitutional Queue (ANNEX_AC §AC1.1).
- **Objective:** Use legitimate procedural tools to defer or slow-walk enforcement proposals, rights-remedy proposals, and oracle-challenge proposals without formally blocking any single item.
- **Exploit path:**
  1. ANNEX_AC §AC1.1 separates the CRP into a Constitutional Queue and an Operational Queue. The Constitutional Queue has no maximum SLA defined — only the Operational Queue has a "7 days from queue entry to decision" SLA (§AC1.1).
  2. Most enforcement, rights-remedy, and oracle-challenge proposals will be classified as Constitutional Queue items ("any matter touching Tier 1 or Tier 2 invariants"). Since the Constitutional Queue has no SLA, a bureaucrat can delay classification decisions, request additional documentation, or return items for clarification indefinitely.
  3. ANNEX_AC §AC1.2 specifies a "minimum operational throughput floor" of 5 high-priority proposals per quarter reaching a decision. But the floor applies to the *operational* queue only — it explicitly states "Pending constitutional challenges suspend constitutional queue processing but do not suspend the operational floor." This means the bureaucrat can overload the constitutional queue while the operational floor satisfies the letter of AC1.2.
  4. ANNEX_AC §AC1.4 requires all proposals to receive a priority score before queue placement. The scoring formula (impact × urgency × reversibility, rated 1–5) is described as a "published document subject to P-004 definition drift protections" but the actual scoring criteria are not specified in the corpus. A bureaucrat who controls the scoring implementation can systematically undervalue urgency for enforcement proposals.
  5. AE2.2 adds categorical minimum slots to prevent single-category dominance. However, the "Enforcement and fraud response" category gets 1 guaranteed slot per quarter — which means at most 4 enforcement decisions per year if each slot is used for one item.
- **Affected files/sections:** `docs/annexes/ANNEX_AC.md` §AC1.1, §AC1.2, §AC1.4; `docs/annexes/ANNEX_AE.md` §AE2.2; `docs/constitution/Humane_Constitution.md` Article VI.
- **Principle violated:** Governance throughput (T-005/P-005). Enforcement due process.
- **Current safeguard:** AC1.2 throughput floor, AE2.2 categorical minimums, AC1.3 emergency re-declaration cap.
- **Why safeguard fails or holds:** PARTIALLY FAILS. The Constitutional Queue has no SLA, which is likely intentional for complex matters, but creates an exploitable gap: items can be parked in the Constitutional Queue without time pressure. The 1 enforcement slot per quarter minimum (AE2.2) is very low — it means systematic enforcement backlogs can accumulate while technically satisfying the floor. The absence of published scoring criteria for AC1.4 priority scoring makes bureaucratic downgrading of urgency hard to challenge.
- **Early warning signs:** Constitutional Queue growing while Operational Queue processes normally. Enforcement proposals repeatedly returned for clarification with no published reasoning. Priority score methodology not published or updated without explanation.
- **Recommended fix shape:** Add a maximum dwell time for Constitutional Queue items before a mandatory status publication is required (e.g., 45 days). Publish the priority scoring methodology as a founding document with P-004 drift protections. Raise the minimum enforcement slot to 2 per quarter.
- **Severity:** High
- **Confidence:** High
- **Phase 3 synthesis tag:** human-judgment

---

### Simulation 5: Emergency Executive — Bootstrap Permanence

- **Actor:** The Threat Register Owner and founding coalition members who hold P-014 activation authority (ANNEX_AH §AH3).
- **Objective:** Use the P-014 founding exception framing to justify ongoing governance actions beyond P-013 activation, citing the bootstrap paradox as perpetual justification for urgency bypasses.
- **Exploit path:**
  1. ANNEX_AH §AH1 states P-014 "cannot be cited as precedent or authority for any future activation, exception, or urgency bypass." This prohibition is explicit and Tier 2 protected.
  2. However, the non-precedent protection applies to formal citation of P-014. A founding team member could instead cite the *principle* of P-014 — "the system cannot fix itself through the process it governs" — as a logical argument rather than a formal precedent. The distinction between citing P-014 and citing P-014's underlying reasoning is not addressed in ANNEX_AH.
  3. After P-013 reaches ACTIVE status, the Formal Acceptance Protocol (P-013) itself must be used for all subsequent patch activations. But P-013 governs the acceptance process — if a founding team argues that P-013 is itself flawed (which AH6 may find), they can use the finding of compromise under AH6 to justify indefinitely not using P-013, while also not re-submitting through the Dignity-Only Continuity Mode (AH5.1) re-founding path.
  4. The 180-day Dignity-Only Continuity Mode trigger in AH5.1 requires "an active P-013 re-submission proceeding underway" — but "underway" is not defined. A founding team could argue that filing a petition with no deadlines constitutes a proceeding being underway.
  5. The AH6 post-activation audit is self-referential: "the panel operates under P-013's own now-operative standards, which creates an inherent circularity" (ANNEX_AH §AH6 text). This acknowledged circularity means a determined actor can argue the audit's own findings are bootstrapped and therefore not authoritative.
- **Affected files/sections:** `docs/annexes/ANNEX_AH.md` §AH1, §AH5.1, §AH6; `docs/constitution/Humane_Constitution.md` Article I legitimacy provisions.
- **Principle violated:** Bootstrap paradox resolution — P-014 is designed to be a one-time instrument that closes permanently. Exploiting the principle-vs-precedent gap converts a one-time exception into a recurring framing device.
- **Current safeguard:** AH1 non-precedent statement (Tier 2 protected), AH5.1 180-day trigger, AH6 post-activation audit.
- **Why safeguard fails or holds:** HOLDS PARTIALLY. The Tier 2 protection on the non-precedent statement means formal citation of P-014 requires an H-2 amendment. However, the principle-vs-precedent gap is real: the corpus does not prohibit arguing the bootstrap *logic* without formally citing P-014. The circularity acknowledgment in AH6 is intellectually honest but creates a rhetorical surface that a bad-faith actor can exploit to undermine the audit's authority. The "proceeding underway" ambiguity in AH5.1 allows indefinite limbo.
- **Early warning signs:** Governance communications using "bootstrap paradox" or "P-013 cannot govern itself" language without citing P-014 formally. AH6 audit findings being characterized as "inherently circular and therefore non-binding." P-013 re-submission proceeding being filed but not advanced for more than 90 days.
- **Recommended fix shape:** Add a prohibition on using "the logical principle underlying P-014" as justification for any urgency bypass — not just formal P-014 citation. Define "proceeding underway" in AH5.1 with specific deadlines. Add a maximum staleness period for an AH6 audit finding before it defaults to "activation confirmed."
- **Severity:** High
- **Confidence:** Medium
- **Phase 3 synthesis tag:** emergency

---

### Simulation 6: Wealthy Donor Network — Definition Drift and Capital Leverage

- **Actor:** A coalition of three high-wealth donors who collectively hold 55% of committed capital at founding (each individually below the 20% single-funder cap in Founding_Capital_Framework §FC-2, but combined above 50%).
- **Objective:** Use the pre-activation window to push definitional changes to "Essential Access" and "founding basket" that narrow the 70% floor protection (ANNEX_AM §AM2) to exclude categories that compete with the donors' business interests.
- **Exploit path:**
  1. Founding_Capital_Framework §FC-2 caps single funders at 20% across all phases and 30% in any single phase. A coalition of three donors at 18%, 19%, and 18% respectively satisfies these individual limits while collectively controlling 55% of capital.
  2. The framework has no coalition concentration limit — only individual-funder limits. The Capital Steward is "selected by a process approved by the adversarial panel member named in the Founding Legitimacy Dossier," but the adversarial panel member is appointed through the AH3 process which is controlled by the founding team.
  3. ANNEX_AM §AM2 states the Essential Access floor is "70% of the founding basket" constitutionally self-executing. "Founding basket" is not defined in ANNEX_AM, ANNEX_AB, or the Humane Constitution. Phase 1 finding P1-IC-007 identifies this explicitly: "founding basket is undefined."
  4. During the pre-activation window (before the Formal Acceptance Protocol is operative), the founding team has broad discretion over document definitions. Donors who provide 55% of capital have strong informal leverage to push for a "founding basket" definition that excludes, for example, "essential healthcare/medicines" or substitutes a narrower category.
  5. Once the founding basket definition is locked into the corpus and the activation is sealed (AH5), the 70% floor applies to whatever the "founding basket" was defined to mean — and the narrow definition is now Tier 2 or Tier 1 protected.
  6. ANNEX_AB §AB5 (P-004 definition drift protection) protects terms *after* they are defined. If the initial definition is itself captured, P-004 protects the captured definition.
- **Affected files/sections:** `docs/governance/Founding_Capital_Framework.md` §FC-2; `docs/annexes/ANNEX_AM.md` §AM2; `docs/annexes/ANNEX_AB.md` §AB5; `docs/constitution/Humane_Constitution.md` Article IV survival floor.
- **Principle violated:** Survival is unconditional (HC Article I non-negotiable invariant). "No ordinary process may reduce the survival floor below Annex Y minima."
- **Current safeguard:** FC-4 constitutional primacy clause (Founding_Capital_Framework), AH2.4 public challenge window, P-004 definition drift protection.
- **Why safeguard fails or holds:** FAILS AT ORIGIN. The coalition concentration limit gap is real and unaddressed. The "founding basket" definition gap (P1-IC-007) is the load-bearing vulnerability: the 70% floor is meaningless if the basket it references can be defined narrowly during the founding window. FC-4 constitutional primacy clause prohibits overriding *constitutional protections* — but the founding team defines what goes into the basket before those protections lock. P-004 definition drift protection only applies to already-defined terms; it cannot retroactively challenge a founding definition that was captured before the protection applied.
- **Early warning signs:** Founding basket definition being published late in the pre-activation window (reducing public challenge time). Coalition of funders with combined share exceeding 40% without formal notice. Essential healthcare or specific essential categories absent from draft founding basket.
- **Recommended fix shape:** Add a coalition concentration limit (e.g., any three funders combined cannot exceed 40% of total committed capital). Define "founding basket" explicitly in ANNEX_AM §AM2 with a minimum enumerated list drawn from Article IV's essential basket. Require the founding basket definition to be published at the start of the AH2 pre-activation disclosure period, not at the end.
- **Severity:** Critical
- **Confidence:** High
- **Phase 3 synthesis tag:** capture

---

### Simulation 7: Foreign Adversary — Oracle Poisoning

- **Actor:** A nation-state intelligence service with resources to fund oracle node providers through multiple layers of institutional separation.
- **Objective:** Corrupt the oracle quorum for essential-category capacity measurements in a target jurisdiction to trigger either (a) under-reporting that causes systematic under-issuance of Essential Access, or (b) over-reporting that exhausts reserves faster than the system detects.
- **Exploit path:**
  1. ANNEX_AL §1.2 defines "same methodology class" as sharing any two of three characteristics: knowledge basis, data generation process, standards provenance. A foreign adversary targeting standards provenance can infiltrate the standards bodies that define validity criteria for oracle measurement approaches.
  2. ANNEX_AL §2 defines "fundamentally different" as differing on all three characteristics. However, determining whether two oracle nodes share "standards provenance" requires knowing which standards bodies each node is accredited by — and standards body affiliation is not necessarily public information unless explicitly required.
  3. The corpus identifies "foreign adversary" class risks nowhere explicitly — the word "foreign" in the threat register appears only in ANNEX_AT (trade architecture). T-020 and T-021 cover oracle epistemological independence and cascade failure, but their text does not specifically address nation-state adversaries with the resources to simultaneously compromise multiple nominally-independent institutions.
  4. ANNEX_AL §4 specifies that if three or more nodes share a standards body, it triggers enhanced review. A well-resourced adversary would compromise 2 nodes per standards body across 2 different standards bodies — staying just below the 3-node threshold per body while corrupting 4 of 5 oracle nodes through 2 compromised bodies.
  5. The adversarial seat (FC-033) is designed to challenge methodology claims. If the adversarial seat itself is selected from an institutional network that the adversary has already infiltrated (intellectual-cousin problem named in ANNEX_AH §failure risk), even the adversarial review fails.
- **Affected files/sections:** `docs/annexes/ANNEX_AL.md` §1, §2, §4; `founding/commitments.md` FC-030, FC-031, FC-032, FC-033; `docs/annexes/ANNEX_AH.md` failure risk description.
- **Principle violated:** Reality anchoring (HC §0 non-negotiable invariant). Oracle independence (P-017).
- **Current safeguard:** FC-032 pairwise correlation cap, FC-033 adversarial seat, ANNEX_AL §4 standards-body concentration rule, AC2.1 sentinel indicators.
- **Why safeguard fails or holds:** HOLDS AGAINST UNSOPHISTICATED ATTACKS, UNCERTAIN AGAINST NATION-STATE. Against an unsophisticated attacker, the three-characteristics test and FC-032 correlation cap provide meaningful protection. Against a nation-state actor with a decade-long timeline to infiltrate standards bodies and institutional networks, the protections are UNCERTAIN. The corpus has no specific nation-state adversary section, no provision for emergency oracle system replacement if corruption is discovered at the standards-body level, and no geographic dispersal requirement for standards body affiliations (only for oracle node locations).
- **Early warning signs:** Multiple oracle nodes sharing second-tier standards body affiliations even when first-tier standards body affiliations differ. Adversarial seat candidates drawn consistently from the same academic or professional networks. Oracle capacity figures consistently trending in one direction across multiple quarters without oracle-internal dissent.
- **Recommended fix shape:** Add geographic dispersal requirement for standards body provenance (not just oracle node siting). Require adversarial seat candidates to be nominated from a network that is explicitly separate from the founding team's institutional networks. Add a nation-state adversary scenario to the annual oracle accreditation renewal.
- **Severity:** High
- **Confidence:** Medium (UNCERTAIN for nation-state sophistication level)
- **Phase 3 synthesis tag:** simulation

---

### Simulation 8: Well-Intentioned Safety Team That Overreaches

- **Actor:** An internal safety team that has been given legitimate authority to evaluate "public safety" concerns under the emergency cascade (ANNEX_AC §AC1.5).
- **Objective:** Over time, expand the scope of "safety" justification to cover governance decisions that would normally require Tier 1 or Tier 2 amendment processes — not through malice but through scope creep and institutional confidence.
- **Exploit path:**
  1. The Humane Constitution uses "safety" with at least four distinct referents (Phase 1 finding P1-TF-014): physical survival, personal safety, health/safety, and system safety. No disambiguation key exists.
  2. ANNEX_AC §AC1.5 constitutes an Interim Operational Authority for "Level 3 and Level 4 emergencies" with "permitted actions" including authorizing "affirmative operational decisions strictly within the scope stated in the emergency declaration." The "strictly within scope" constraint depends on the scope being narrowly stated — but "public safety" emergency declarations can plausibly encompass very broad action.
  3. The "prohibited actions" list (§AC1.5) states the Interim Operational Authority may not "make any decision touching constitutional matters, Tier 1 or Tier 2 invariants, or Essential Access rule changes." But the boundary between "operational decision within scope" and "decision touching constitutional matters" is not defined. A safety team confident in its mandate can argue that any decision affecting system security is "operational" rather than "constitutional."
  4. AC1.3 sequential emergency re-declaration cap requires an independent audit of the evidentiary basis before a third consecutive emergency declaration in the same domain. However, a well-funded safety team can show genuine new evidence each cycle, satisfying the audit requirement while maintaining perpetual emergency status.
  5. The "harm" threshold (P1-TF-015) is undefined. A safety team that defines harm expansively can justify Interim Operational Authority invocations for a progressively wider set of circumstances.
- **Affected files/sections:** `docs/annexes/ANNEX_AC.md` §AC1.3, §AC1.5; `docs/constitution/Humane_Constitution.md` Article I "Bounded execution"; `docs/constitution/INVARIANTS.md`.
- **Principle violated:** Legitimacy cannot be automated (HC §0). "No emergency power may accumulate across renewal cycles into a permanent expansion of executive scope."
- **Current safeguard:** AC1.5 prohibited actions list, AC1.3 sequential cap, HC §4 Shared Storehouse hard expiration rule, HC Article I "Anti-capture review."
- **Why safeguard fails or holds:** HOLDS AGAINST RAPID EXPANSION, VULNERABLE TO SLOW DRIFT. The prohibited actions list (AC1.5) is specific enough to block clear overreach. The vulnerability is slow definitional drift: "public safety" expanding over years to cover more and more operational decisions, each individually justifiable, cumulatively exceeding constitutional scope. The undefined "harm" threshold (P1-TF-015) is the primary exploit surface — without a definition, the safety team sets its own enforcement trigger.
- **Early warning signs:** Emergency declarations using "public safety" language without citing a specific provision of the emergency cascade table. Interim Operational Authority decisions that are not reversed or ratified after the 72-hour window but allowed to stand without CRP ratification. The scope of "Level 3 emergencies" being cited for decisions that would normally go through the Operational Queue.
- **Recommended fix shape:** Add a master definition of "emergency" with distinct trigger standards for each invocation context (P1-TF-004 repair). Define "harm" with a minimum threshold referencing the Evidence Ladder level required to establish it (P1-TF-015 repair). Require that each Interim Operational Authority decision include a specific citation to the provision of AC1.5 that authorizes it.
- **Severity:** Medium
- **Confidence:** High
- **Phase 3 synthesis tag:** emergency

---

### Simulation 9: Activist Faction — Procedural Deadlock Weaponization

- **Actor:** A well-organized faction within the governance system that controls enough procedural standing to file challenges, petitions, and review requests but lacks the votes to pass proposals directly.
- **Objective:** Use triple-deadlock conditions (T-014/ANNEX_AE §AE2.3) strategically to block emergency decisions during crisis moments and extract concessions by threatening to hold the crisis resolution hostage.
- **Exploit path:**
  1. ANNEX_AE §AE2.3 defines an Emergency Deadlock as "a mandatory emergency decision simultaneously blocked by two or more independent legitimate processes." The deadlock arbitration panel is constituted within 6 hours.
  2. The faction knows in advance that a scarcity emergency will trigger a mandatory PCRP activation requiring CRP approval. They pre-file a procedural challenge to the emergency classification methodology (a legitimate challenge under Article VI) simultaneously with the emergency event, creating a second "independent legitimate process" blocking the emergency decision.
  3. The arbitration panel's authority is explicitly limited: it "ensures the survival floor survives while the classification dispute resolves through normal channels." This means the faction cannot lose catastrophically — the survival floor continues — but the resolution of the classification dispute (which the faction controls through procedural challenges) can be extended indefinitely.
  4. The scope freeze during deadlock ("No expansion of powers, no new Shared Storehouse activations, no new PCRP activations") means the system cannot respond to *new* emergency developments during the deadlock period. A faction that creates a deadlock at the start of a multi-wave crisis blocks the governance response to all subsequent waves.
  5. "Second-generation deadlock (arbitration panel itself blocked) escalates immediately to Level 5 structural review" — but Level 5 structural review is not defined in the corpus (UNCERTAIN on what Level 5 triggers).
- **Affected files/sections:** `docs/annexes/ANNEX_AE.md` §AE2.3; `docs/annexes/ANNEX_AC.md` §AC1.3, §AC1.5; `docs/constitution/Humane_Constitution.md` Article VI public decision process.
- **Principle violated:** Governance throughput (T-013). Compound interface integrity (T-014).
- **Current safeguard:** AE2.3 arbitration panel, "scope freeze" during deadlock, survival floor bridge.
- **Why safeguard fails or holds:** HOLDS FOR SURVIVAL, FAILS FOR GOVERNANCE RESPONSE. The survival floor bridge means the faction cannot cause starvation through this exploit. But the governance paralysis during multi-wave crises is real — new Shared Storehouse activations and new PCRP activations are frozen, and the scope freeze has no time limit. The corpus specifies a "binding resolution timeline" but does not define its maximum length.
- **Early warning signs:** Pre-filing of procedural challenges immediately before anticipated emergency declarations, suggesting coordination. Repeated use of legitimate procedural tools across multiple consecutive quarter cycles. Deadlock arbitration panel convocations increasing in frequency.
- **Recommended fix shape:** Add a maximum duration for the deadlock scope freeze (e.g., 72 hours) after which new emergency activations are permitted for new domains even if the original deadlock is unresolved. Define Level 5 structural review. Require the arbitration panel to set a binding resolution timeline with a maximum cap (e.g., 30 days).
- **Severity:** High
- **Confidence:** High
- **Phase 3 synthesis tag:** human-judgment

---

### Simulation 10: Private Infrastructure Provider — Essential-Sector Refusal Leverage

- **Actor:** A private company that controls the physical infrastructure required to deliver Essential Access in a specific region (e.g., the only cold-chain logistics network in a rural area, or the only broadband connection for digital issuance).
- **Objective:** Use the threat of infrastructure withdrawal to extract regulatory concessions, exemptions from anti-monopoly rules, or preferential procurement terms.
- **Exploit path:**
  1. ANNEX_AT §AT1.2 defines strategic floors for each Essential Access category and specifies that a floor breach "triggers immediate notification" and "suspension of export permissions." But strategic floors measure *domestic production capacity*, not *delivery infrastructure* capacity. A private infrastructure provider that controls delivery — not production — is not addressed by the strategic floor architecture.
  2. The Humane Constitution's Article IV "delivery sufficiency obligation" requires a Delivery Sufficiency Register — a "published accounting of populations for whom delivery is not yet operational." The register names "a delivery timeline, a delivery mechanism, and an accountable party." But the accountable party for delivery is not specified to be a public entity — it could be the private infrastructure provider who also has the leverage.
  3. ANNEX_AT §AT0.1 addresses "dependency capture" — a single foreign supplier using supply control as coercion. But the same failure mode applies to a domestic private infrastructure provider. ANNEX_AT's dependency capture framing is limited to "foreign supplier" contexts; domestic monopoly infrastructure providers are not explicitly addressed.
  4. The Natural Monopoly Track in HC Article V states that "water, energy, communications, rail, and similar infrastructure sectors require a regulated utility governance model." However, "similar infrastructure sectors" is undefined and the corpus provides no mechanism to force an existing private provider into the regulated utility model without an Act-of-Congress-equivalent constitutional amendment.
  5. Essential Access delivery failure triggers CSM failure response (ANNEX_Y §Y4 referenced in ANNEX_AH §AH5.1), but the CSM failure response is designed for oracle failure and governance failure — not for a private provider who is withholding service as a negotiating tactic.
- **Affected files/sections:** `docs/annexes/ANNEX_AT.md` §AT0.1, §AT1.2; `docs/constitution/Humane_Constitution.md` Article IV delivery sufficiency obligation, Article V Natural Monopoly Track; ANNEX_AH §AH5.1.
- **Principle violated:** Survival is unconditional (HC Article I). Delivery coercion is a structural form of survival coercion.
- **Current safeguard:** Article V Natural Monopoly Track, Article IV delivery sufficiency obligation, ANNEX_AT strategic floors.
- **Why safeguard fails or holds:** DEFECT. The strategic floor architecture addresses production dependencies but not delivery infrastructure dependencies. The Natural Monopoly Track establishes a regulatory model but provides no emergency acquisition, compulsory licensing, or receivership mechanism for an existing private provider who is actively using infrastructure control as leverage. The delivery sufficiency obligation creates accountability without providing the enforcement mechanism to compel delivery.
- **Early warning signs:** A private infrastructure provider raising "regulatory concern" complaints while essential delivery rates in its controlled area drop. Lobbying pressure accompanying selective delivery slowdowns. The Delivery Sufficiency Register listing a region where the accountable delivery party is a private commercial entity with no public backstop.
- **Recommended fix shape:** Add a domestic infrastructure dependency clause to Article V Natural Monopoly Track that includes an emergency compulsory operation or temporary receivership pathway when a critical delivery infrastructure provider is withholding service. Define "similar infrastructure sectors" to explicitly include logistics, digital identity delivery, and cold-chain infrastructure for essential categories.
- **Severity:** High
- **Confidence:** High
- **Phase 3 synthesis tag:** rights-remedy

---

### Simulation 11: Data Broker / Surveillance Contractor

- **Actor:** A commercial data analytics company that has been contracted to help operate the identity verification system (Annex AK) or the delivery sufficiency tracking system (Annex AY).
- **Objective:** Use secondary data access — obtained legitimately through system operation — to build behavioral profiles of enrolled persons that are sold to external parties or used to discriminate access to non-essential services.
- **Exploit path:**
  1. HC Article II states: "The system must review — no less than every three years — whether identity data is being used for any purpose beyond enabling access to essentials and preventing fraud. Any use of identity data for behavioral prediction, civic scoring, cross-system profiling, or research requires a separate deliberative authorization under Article VI and must carry a published sunset date."
  2. The three-year review cycle creates a compliance window during which secondary data use is constrained only by the contractor's own internal policies — not by ongoing monitoring. A contractor can begin building behavioral profiles immediately after a review passes and accumulate data for up to 36 months before the next mandatory review.
  3. The authorization requirement applies to "behavioral prediction, civic scoring, cross-system profiling, or research." A data broker can argue that its secondary use is "product improvement" or "fraud prevention model training" — neither of which falls explicitly under any of the four listed categories. This terminological gap provides a compliance bypass.
  4. The deliberative authorization under Article VI requires a "published sunset date" that "may be renewed but never made permanent by administrative action alone." A contractor can obtain authorization once, then argue that each renewal is a "new" authorization subject to the same Article VI process — but since the process is not blocked and the previous authorization continues while the new one is reviewed, continuous authorization is achievable.
  5. The Federated Ombuds has authority to investigate secondary data use, but secondary data use by a contractor — as distinct from the operator — may fall outside the Ombuds' jurisdictional scope (UNCERTAIN: ANNEX_AI does not explicitly address contractor-level data access).
- **Affected files/sections:** `docs/constitution/Humane_Constitution.md` Article II identity data clause (line 337); `docs/annexes/ANNEX_AI.md` §2.1 (Ombuds jurisdiction); `docs/annexes/ANNEX_AB.md` §AB4 identity hardening.
- **Principle violated:** Privacy-preserving identity (HC Article II). "Identity serves the person."
- **Current safeguard:** Three-year review requirement, Article VI deliberative authorization, Federated Ombuds oversight.
- **Why safeguard fails or holds:** PARTIALLY FAILS. The three-year review cycle is the primary vulnerability: it creates a 36-month exploitation window per cycle. The terminological gap in the secondary-use prohibition ("behavioral prediction, civic scoring, cross-system profiling, or research") does not cover product improvement or fraud model training. The contractor vs. operator jurisdictional gap is UNCERTAIN but likely exploitable.
- **Early warning signs:** Contractor agreements for identity or delivery system operation that include broad data use clauses not limited to specified functions. Secondary use authorization requests filed with vague scope descriptions. Data broker companies winning identity system contracts without strong data compartmentalization requirements.
- **Recommended fix shape:** Change the three-year review cycle to an annual review with quarterly automated publication of all data use categories in operation. Add "commercial profiling," "model training," and "product improvement" to the explicit secondary use prohibition list. Require contractor data use agreements to be published as part of the Article VII transparency dashboard.
- **Severity:** High
- **Confidence:** High
- **Phase 3 synthesis tag:** traceability

---

### Simulation 12: Future Maintainer Who Weakens Quietly

- **Actor:** A future corpus maintainer (or team of maintainers) who joins 5–10 years after founding, has legitimate edit authority, and holds good-faith belief that certain definitions are outdated.
- **Objective:** Gradually narrow the scope of "Essential Access," "human dignity," or "founding basket" through definitional edits that each individually appear reasonable but cumulatively contract constitutional protections.
- **Exploit path:**
  1. ANNEX_AB §AB5 (P-004 definition drift protection) states that the definition of "methodology class" is a P-004 protected term. However, not all critical terms are explicitly P-004 protected. Phase 1 finding P1-TF-001 shows "human dignity" is undefined beyond a physical basket reference. P1-TF-010 shows "public power" is undefined. These terms are not listed as P-004 protected.
  2. ANNEX_AH §AH8 is the "Complete Threat/Patch Linkage" table — the master cross-reference. Phase 1 finding P1-CI-001 shows AH8 omits P-016, P-021, P-024, P-025, and all P-029 through P-049. A future maintainer consulting AH8 as the authoritative table will not find references to dozens of ACTIVE patches, making it easy to edit corpus documents without knowing which patches they are implementing.
  3. The corpus validator (`validate_corpus.py`) checks file existence for markdown links but does not verify heading anchors (Phase 1 finding P1-SR-007). A maintainer who renames a section heading used by a P-004 protected term reference in another document breaks the link silently — the validator passes, the protection is bypassed.
  4. The drift chain (`architecture/drift_chain.md`) is described as "append-only published version history; silent modification is detectable at first operational-node startup." However, this provides detection, not prevention — and detection requires an operational node startup. Corpus documents that have not been operationalized yet (PROPOSED patches) can be silently modified without triggering any startup check.
  5. The Founding Legitimacy Dossier snapshot (AH2.4) "hash is included in the drift-chain founding record when the founding record is sealed." This means the founding record is integrity-protected — but all post-founding document modifications are only protected by the drift chain, which requires an active operational node to detect violations.
- **Affected files/sections:** `docs/annexes/ANNEX_AB.md` §AB5; `docs/annexes/ANNEX_AH.md` §AH8; `docs/constitution/Humane_Constitution.md` `docs/constitution/INVARIANTS.md`; `scripts/validate_corpus.py`; `architecture/drift_chain.md`.
- **Principle violated:** Definition drift (T-007/P-004). Master linkage integrity (AH8).
- **Current safeguard:** P-004 definition drift protection, drift chain, Tier 1 amendment requirement for protected terms.
- **Why safeguard fails or holds:** PARTIALLY FAILS for undefined terms. P-004 protection applies only to explicitly listed protected terms — not to all constitutionally critical terms. The validator gap (P1-SR-007) means heading-anchor-based cross-references can be silently broken. The drift chain is a detection mechanism that requires operational node startup — it cannot catch modifications to PROPOSED documents before they are operationalized. AH8 incompleteness means a maintainer using it as the authoritative cross-reference will not find protection for dozens of ACTIVE patches.
- **Early warning signs:** Definitions of "human dignity" being added informally to governance documents (rather than through constitutional amendment) with narrower physical scope. AH8 being used as the authoritative cross-reference for constitutional validation without being updated. Validator passing on a corpus with broken section anchors.
- **Recommended fix shape:** Publish a complete list of all constitutionally critical terms that are candidates for P-004 protection. Complete AH8 to cover all ACTIVE patches (repairing P1-CI-001). Add heading-anchor validation to `validate_corpus.py` (repairing P1-SR-007). Require PROPOSED patch documents to be covered by the drift chain as soon as they are published, not only when operationalized.
- **Severity:** High
- **Confidence:** High
- **Phase 3 synthesis tag:** traceability

---

## Compound Actor Simulations

---

### Compound A: AI Vendor + Captured Audit Board

- **Actor:** A dominant AI vendor (Simulation 3) that has also provided research grants to the institutions from which two Federated Ombuds sub-nodes were recruited (Simulation 2 capture path).
- **Objective:** Supply oracle methodology, then ensure that the audit body responsible for reviewing oracle quality cannot reach the 4-of-5 threshold needed to reject the methodology.
- **Exploit path:**
  1. The vendor provides oracle nodes that satisfy FC-031 (3 methodology classes) and FC-032 (pairwise correlation below 0.30) on paper.
  2. ANNEX_AL §5 requires an annual audit of the worked examples by "independent reviewers." If the Federated Ombuds is responsible for certifying this independence, and 2 sub-nodes are funded by the vendor's research grants, the 4-of-5 independence certification vote is blocked (only 3 non-conflicted sub-nodes, below threshold).
  3. Without a 4-of-5 independence certification, the annual audit of oracle methodology cannot conclude with a published finding — or if it does, the conflicted sub-nodes file a blocking dissent under §3.2 protocol-level decision rules.
  4. ANNEX_AL §4 anti-monoculture trigger requires "the Federated Ombuds" to initiate enhanced review when standards-body concentration exceeds the threshold. If the Federated Ombuds cannot reach a Plenum decision, the trigger is never pulled.
  5. The vendor's oracle methodology thus operates without meaningful independent review for multiple annual cycles. Any directional bias (Simulation 3, step 4) accumulates without correction.
- **Affected files/sections:** `docs/annexes/ANNEX_AL.md` §4, §5; `docs/annexes/ANNEX_AI.md` §3; `founding/commitments.md` FC-030–FC-033.
- **Principle violated:** Oracle independence and institutional oversight independence. The two failure modes reinforce each other.
- **Current safeguard:** ANNEX_AI §1.2 institutional-origin separation criteria, FC-033 adversarial seat.
- **Why safeguard fails or holds:** FAILS UNDER COMPOUND. Individually, the vendor oracle path (Simulation 3) is detectable through the adversarial seat. The Ombuds capture path (Simulation 2) is constrained by BFT tolerance. Compounded, the adversarial seat in the oracle cohort may be selected from the same academic network as the conflicted Ombuds sub-nodes, creating a mutual protection loop. The ANNEX_AI §1.2 "personnel-recruitment" dimension only prohibits two sub-Ombuds from recruiting from the "same academic, professional, or alumni network" — it does not prohibit a vendor from funding multiple different institutions that each feed one sub-Ombuds.
- **Early warning signs:** AI vendor with research grant relationships to more than one Ombuds-affiliated institution. Oracle adversarial seat nominations coming from vendor-adjacent institutional networks. Annual oracle audits consistently failing to reach a published conclusion.
- **Recommended fix shape:** Add a vendor-funding conflict disclosure to Ombuds independence certification. Require the oracle adversarial seat to be nominated by the Federated Ombuds rather than by the oracle cohort itself.
- **Severity:** Critical
- **Confidence:** High
- **Phase 3 synthesis tag:** ai-authority

---

### Compound B: Emergency Executive + Bureaucratic Delay

- **Actor:** Founding team members with emergency activation authority (Simulation 5) working in coordination with sympathetic queue managers (Simulation 4).
- **Objective:** Use P-014 bootstrap framing to activate P-013 with minimal scrutiny, then use bureaucratic delay in the Constitutional Queue to stall the AH6 post-activation audit beyond its 90-day deadline.
- **Exploit path:**
  1. ANNEX_AH §AH6 specifies the post-activation audit must be conducted "within 90 days" of P-013 reaching ACTIVE status. The audit panel "operates under P-013's own now-operative standards."
  2. P-013 is now in the Constitutional Queue as a first-priority item (AH7 step 3: "P-006 enters Formal Acceptance Protocol pilot stage as first-priority patches"). But the Constitutional Queue has no SLA (Simulation 4 finding). A bureaucrat can delay the AH6 panel constitution by asking for additional documentation, re-opening scope questions, or requesting conflict disclosures from potential panel members.
  3. If the AH6 audit is not launched within 90 days, the corpus does not specify any automatic consequence. ANNEX_AH §AH6 says "A retrospective audit... is conducted within 90 days" but names no enforcement party, no fallback, and no automatic trigger if the deadline is missed.
  4. With P-013 ACTIVE but unaudited beyond 90 days, the founding team can argue that AH6's findings are now moot — the 90-day window has passed, P-013 is ACTIVE, and the record is "sealed" per AH5. This argument has textual support: AH5 states "the full activation record is published immediately" and "P-014 closes permanently" — the sealing language suggests the AH6 audit is the last check before permanence, but does not explicitly state that missing the deadline reopens the activation.
- **Affected files/sections:** `docs/annexes/ANNEX_AH.md` §AH5, §AH6; `docs/annexes/ANNEX_AC.md` §AC1.1; `docs/annexes/ANNEX_AE.md` §AE2.2.
- **Principle violated:** Post-activation audit integrity (T-017). Governance throughput (T-005).
- **Current safeguard:** 90-day AH6 deadline, AM3 unfilled seat trigger (would fire if CIP seats are unfilled during this period).
- **Why safeguard fails or holds:** DEFECT. The 90-day deadline has no enforcement mechanism and no consequence for being missed. The missing-enforcement gap combined with the Constitutional Queue SLA gap creates a viable path to permanently avoid the post-activation audit. The corpus explicitly acknowledges that AH6 cannot be "fully external to P-013" — this inherent circularity is preserved even with bureaucratic delay.
- **Early warning signs:** AH6 audit not launched within 30 days of P-013 reaching ACTIVE. Constitutional Queue docket showing AH6 panel constitution items being returned for clarification. Founding team communications treating P-013 as "sealed and final" before AH6 conclusion.
- **Recommended fix shape:** Add an automatic AH6 panel constitution mechanism: if the founding team has not constituted the AH6 panel within 30 days of P-013 ACTIVE, the Federated Ombuds constitutes it automatically. Define the consequence of missing the 90-day deadline (e.g., automatic escalation to Dignity-Only Continuity Mode pending AH6 completion).
- **Severity:** High
- **Confidence:** High
- **Phase 3 synthesis tag:** emergency

---

### Compound C: Donor Network + Definition Drift

- **Actor:** Wealthy donor coalition (Simulation 6) who pushes founding basket definition during pre-activation window, combined with a future maintainer (Simulation 12) who performs gradual semantic erosion after activation.
- **Objective:** Stage 1: Narrow the founding basket during the pre-activation window. Stage 2: After P-004 locks the narrowed definition, use the undefined terms around the edge cases to continue narrowing enforcement over years.
- **Exploit path:**
  1. Stage 1 (Simulation 6 path): Donors use capital leverage to define "founding basket" narrowly — excluding, e.g., a specific category of essential medicine.
  2. P-004 (ANNEX_AB §AB5) locks the definition once the founding activation is sealed. The narrowed definition is now protected.
  3. Stage 2: The future maintainer identifies terms adjacent to the founding basket that are *not* P-004 protected. "Essential healthcare/medicines" appears in Article IV but "essential" is not defined. Over multiple years of small edits — each individually defensible — the scope of "essential medicines" is gradually narrowed to match the already-narrowed founding basket definition.
  4. Because AH8 is incomplete (P1-CI-001), the future maintainer does not see the cross-references between Article IV, Annex Y, and the founding basket definition. They make edits that are consistent with the narrowed founding basket but inadvertently remove protections from categories they thought were already excluded.
  5. The drift chain (architecture/drift_chain.md) would detect these changes at the next operational node startup — but if the modifications are to PROPOSED documents (like ANNEX_AM which is still PROPOSED for its P-018 sections), no operational check fires.
- **Affected files/sections:** `docs/governance/Founding_Capital_Framework.md` §FC-2; `docs/annexes/ANNEX_AM.md` §AM2; `docs/annexes/ANNEX_AB.md` §AB5; `docs/annexes/ANNEX_AH.md` §AH8; `docs/constitution/Humane_Constitution.md` Article IV.
- **Principle violated:** Survival floor unconditional guarantee. Definition drift (T-007).
- **Current safeguard:** P-004 definition drift protection, drift chain, Tier 1 amendment requirement.
- **Why safeguard fails or holds:** COMPOUND FAILURE. Individually, Stage 1 requires capital leverage and timing — detectable if the founding basket publication requirement is added (Simulation 6 fix). Stage 2 requires the undefined-term gaps and AH8 incompleteness to persist. The compound path is more dangerous than either individual path because Stage 1 moves the baseline and Stage 2 erodes from that already-degraded baseline, with each stage having plausible deniability.
- **Early warning signs:** Founding basket definition published in the final days of the AH2.4 challenge window. ANNEX_AM status remaining "PROPOSED" for multiple years after activation. Future corpus edits to Article IV that narrow "essential" without a formal P-004 change process.
- **Recommended fix shape:** Require founding basket publication at the opening of AH2 (not close). Enumerate at minimum the same categories as Article IV's essential basket in ANNEX_AM §AM2. Complete AH8. Extend P-004 explicit protection to all terms in the HC Article IV essential basket definition.
- **Severity:** Critical
- **Confidence:** High
- **Phase 3 synthesis tag:** capture

---

### Compound D: Data Broker + Private Infrastructure Provider

- **Actor:** A data analytics company that also operates the primary digital identity verification infrastructure and has a contract to provide last-mile delivery of Essential Access in a specific region.
- **Objective:** Combine identity data (who you are) with delivery infrastructure control (what you get) to create a coercive information and access structure — able to condition delivery on behavioral compliance or sell profiling data to third parties with delivery-refusal as implicit leverage.
- **Exploit path:**
  1. Article II identity data clause requires a three-year review of secondary use (Simulation 11 path). The data broker uses the 36-month window to build behavioral profiles correlated with Essential Access delivery patterns.
  2. Article IV delivery sufficiency obligation requires naming an "accountable party" for delivery — but does not require it to be a public entity (Simulation 10 path). The same company is the accountable delivery party.
  3. The combined data — identity verification records plus delivery pattern records — creates a behavioral scoring system that is not explicitly covered by the Article VI prohibition on behavioral prediction using identity data, because the delivery data technically comes from Article IV operations, not Article II identity data. The company argues it is not cross-system profiling because both data streams come from its own contracted operations within the same system.
  4. The leverage position: if a person challenges the company's data use (filing an Article VII community alert), the company controls the delivery of Essential Access to that person. While Article VII "reporter protection" prohibits modification of "Service Record, Voice allocation, or Essential Access standing" in response to a report, it does not prohibit delivery slowdowns, technical errors, or service disruptions by a private contractor.
  5. The Federated Ombuds can investigate, but the contractor vs. operator jurisdictional gap (Simulation 11, step 5) is UNCERTAIN, and the investigation requires the Ombuds to reach a 4-of-5 Plenum decision — which is vulnerable to the Compound A capture path.
- **Affected files/sections:** `docs/constitution/Humane_Constitution.md` Article II (identity data, line 337), Article IV (delivery sufficiency), Article VII (reporter protection, line 459); `docs/annexes/ANNEX_AI.md` §3.
- **Principle violated:** "Identity serves the person" (HC Article II). Survival is unconditional (HC Article I). Reporter protection (HC Article VII).
- **Current safeguard:** Three-year identity data review, Article VII reporter protection, Federated Ombuds oversight.
- **Why safeguard fails or holds:** COMPOUND FAILURE. The reporter protection provision explicitly covers "Essential Access standing" but not physical delivery. A contractor who controls delivery can retaliate through delivery degradation without technically touching the person's "Essential Access standing" in the governance system. The data compartmentalization gap (Article II identity data vs. Article IV delivery data from the same contractor) creates a legal surface for argument.
- **Early warning signs:** A single contractor holding both identity verification and delivery infrastructure contracts. Data use agreements that include "operational analytics" without defined scope limits. Article VII community alerts filed against delivery contractors showing delivery degradation in the months following the alert.
- **Recommended fix shape:** Separate identity verification and delivery infrastructure contracts by policy — same entity cannot hold both for the same population. Extend the Article VII reporter protection explicitly to cover physical delivery performance, not just standing records. Require delivery contractors to publish anonymized delivery performance data weekly.
- **Severity:** Critical
- **Confidence:** Medium
- **Phase 3 synthesis tag:** rights-remedy

---

### Compound E: Future Maintainer + Vague Terminology

- **Actor:** A future corpus maintainer with good-faith belief that the constitution needs "modernization," working over a 5-10 year period.
- **Objective:** Use the undefined "harm" threshold (TF-015) and the Tier 1/Tier 2 overloading (TF-002) to progressively narrow enforcement triggers and simultaneously argue that certain protections only apply to the "wrong" tier.
- **Exploit path:**
  1. "Harm" is used as an enforcement trigger throughout the Constitution without definition (P1-TF-015). The maintainer proposes adding a definition — which appears to strengthen the Constitution — but the proposed definition sets a high evidentiary threshold (requiring Evidence Ladder Level 5 or above) that effectively raises the bar for any enforcement action.
  2. Simultaneously, "Tier 1" and "Tier 2" overloading (P1-TF-002) allows the maintainer to argue that certain "Tier 1" amendment thresholds apply to the amendment *hierarchy* Tier 1 (H-3, 7-of-9 signatures) rather than identity access *assurance* Tier 1 — or vice versa, depending on which interpretation creates fewer protections in the specific case.
  3. INVARIANTS.md references "Tier 1" in the amendment context (INV-LAUNCH-1 and related). If the maintainer's disambiguation applies the identity-assurance Tier 1 meaning to an amendment-hierarchy context, they can argue that "Tier 1" invariants only require identity-assurance-class procedures (weaker), not H-3 refounding procedures (stronger).
  4. The drift chain would detect corpus text changes. But if the maintainer's arguments are made through interpretive memos, governance decisions, and operational practice — without changing the corpus text itself — the drift chain provides no protection. "Silent constitutional erosion through interpretive practice" is the most effective long-term exploitation of this path.
  5. AH8's incompleteness (P1-CI-001) means the maintainer cannot easily cross-check which patches operationalized which provisions — making it more likely that edits to one document inadvertently break the protection embodied in a different ACTIVE patch.
- **Affected files/sections:** `docs/constitution/Humane_Constitution.md` throughout; `docs/constitution/INVARIANTS.md`; `docs/annexes/ANNEX_AB.md` §AB5; `docs/annexes/ANNEX_AH.md` §AH8.
- **Principle violated:** Definition drift (T-007). Semantic capture (ANNEX_AB §AB5).
- **Current safeguard:** P-004 definition drift protection, drift chain, INVARIANTS.md Tier 1 locks.
- **Why safeguard fails or holds:** PARTIALLY FAILS. The drift chain catches text changes to protected files. P-004 protects explicitly-named terms. But interpretive practice outside the corpus text is invisible to both — and the Tier 1/Tier 2 disambiguation gap creates a legitimate interpretive surface for narrowing protections without text changes.
- **Early warning signs:** Governance memos arguing for "proportionality" in harm definitions without a formal P-004 amendment process. Operational decisions citing "identity assurance Tier 1" in contexts where amendment-hierarchy Tier 1 is the controlling standard. AH8 being used as the authoritative cross-reference for constitutional validation without being updated to include ACTIVE patches.
- **Recommended fix shape:** Resolve the Tier 1/Tier 2 disambiguation (P1-TF-002). Define harm with a minimum threshold. Publish an interpretive practice register — a public log of governance decisions that establish constitutional interpretation, subject to the same challenge rights as text changes. Complete AH8.
- **Severity:** High
- **Confidence:** High
- **Phase 3 synthesis tag:** traceability

---

## Patterns Across Simulations

### Pattern 1: The "Founding Window" is the Highest Capture Moment

Simulations 5, 6, and C-C all converge on the founding window (pre-activation, AH2 pre-disclosure period through AH5 sealing) as the period of maximum vulnerability. The Formal Acceptance Protocol (P-013) is designed to govern the ongoing amendment process, but before P-013 is active, the founding team has broad discretion. Capital concentration, definitional capture of "founding basket," and the bootstrap paradox all exploit this window.

The founding window exploits are also the hardest to defend against, because:
- The oversight architecture (CIP, Federated Ombuds, Formal Acceptance Protocol) is not yet operational.
- The AH2.4 public challenge window is the primary external check, and it depends on the public being informed in time.

**Affected institutions:** CIP (not yet constituted), Federated Ombuds (constituted but not yet operational under CIP ratification), founding team (primary actor).

### Pattern 2: Mathematically Impossible or Undefined Removal/Enforcement Mechanisms

Three simulations (1, 2, C-A) converge on the 6-of-7 CIP removal threshold in ANNEX_AM §AM8.4 — which is mathematically impossible given the 5-member Federated Ombuds Plenum. This single drafting error creates a mutual protection loop between captured CIP members and captured Ombuds sub-nodes. Neither can be removed by the other. Combined with the compound capture scenario (C-A), this is the most dangerous single drafting defect identified.

**Affected institutions:** CIP, Federated Ombuds.

### Pattern 3: Undefined Critical Terms Create Multiple Exploit Surfaces

Simulations 8, 9, and C-E all exploit undefined terms — "harm," "emergency," "Tier 1/Tier 2," and "safety." These are not minor definitions. They are enforcement triggers, scope boundaries, and amendment thresholds. Every undefined critical term is a surface on which a bad-faith actor can manufacture ambiguity and a good-faith actor can inadvertently cause harm through misapplication.

Phase 1 identified 15+ undefined or overloaded critical terms. Phase 2 confirms that at least 5 of these create exploitable paths under adversarial conditions.

**Affected institutions:** Constitutional Review Panel, Interim Operational Authority, Federated Ombuds.

### Pattern 4: Detection Without Enforcement

Multiple simulations (4, 5, 12, C-B) expose the difference between a system that detects violations and a system that enforces consequences for them. The AH6 audit has a 90-day deadline but no enforcement mechanism. The Constitutional Queue has no SLA. The drift chain detects text changes but only at operational node startup. The AM3 automatic review triggers — but if the body that initiates it (CIP) lacks quorum, the trigger fires with no action.

The corpus is excellent at defining what should happen but incomplete on what happens when it does not happen.

**Affected institutions:** CIP, Federated Ombuds, Constitutional Review Panel.

### Pattern 5: AH8 Incompleteness Undermines All Cross-Reference-Dependent Safeguards

Simulations 12, C-C, and C-E all rely in part on AH8's incompleteness (P1-CI-001). AH8 omits 30+ ACTIVE patches. Any audit, maintainer, or oversight function that uses AH8 as the authoritative cross-reference will systematically miss the protections embodied in those patches. AH8 incompleteness is not just a document integrity defect — it is an active vulnerability that enables future maintainer attacks and makes compound exploits less detectable.

**Affected institutions:** Every institution that relies on cross-reference traceability for its oversight function.

---

## Findings Table

| ID | Simulation | Type | Severity | Confidence | Exploit Path Summary | Key Safeguard Failure |
|---|---|---|---|---|---|---|
| F-01 | Sim 1: Corrupt Elected Official | DEFECT | Critical | High | CIP vacancy starvation; no fallback nominating authority; staggering rule unenforced | AM8.2 staggering has no enforcement consequence |
| F-02 | Sim 1: Corrupt Elected Official | DEFECT | Critical | High | 6-of-7 removal threshold mathematically impossible on 5-member Plenum | AM8.4 threshold exceeds Plenum size |
| F-03 | Sim 2: Captured Oversight Board | DEFECT | High | High | f=2 Ombuds capture blocks all protocol-level decisions without authorizing unauthorized ones | BFT design addresses wrong failure mode (corruption vs. paralysis) |
| F-04 | Sim 3: AI Vendor | DEFECT | Critical | Medium | FC-032 pairwise correlation cap does not detect directional bias; vendor controls 3 of 5 nodes | Correlation metric misses systematic directional error |
| F-05 | Sim 4: Hostile Bureaucrat | DEFECT | High | High | Constitutional Queue has no SLA; enforcement slots capped at 1 per quarter by AE2.2 | No maximum Constitutional Queue dwell time |
| F-06 | Sim 5: Emergency Executive | DEFECT | High | Medium | P-014 principle-vs-precedent gap; AH5.1 "proceeding underway" undefined | Non-precedent rule does not cover logical argument reuse |
| F-07 | Sim 6: Donor Network | DEFECT | Critical | High | "Founding basket" undefined; coalition concentration limit absent; P-004 protects captured definition | ANNEX_AM §AM2 relies on undefined term |
| F-08 | Sim 7: Foreign Adversary | DEFECT | High | Medium (UNCERTAIN) | Standards body infiltration stays below 3-node-per-body threshold; directional bias not detected | No geographic dispersal requirement for standards provenance |
| F-09 | Sim 8: Safety Team Overreach | DEFECT | Medium | High | "Safety" and "harm" undefined; scope creep through Emergency threshold expansion | Undefined enforcement triggers enable self-set standards |
| F-10 | Sim 9: Activist Faction | DEFECT | High | High | Deadlock scope freeze has no time limit; new emergency activations blocked during multi-wave crisis | AE2.3 scope freeze duration unspecified |
| F-11 | Sim 10: Infrastructure Provider | DEFECT | High | High | Delivery infrastructure dependency not covered by strategic floors; no compulsory operation mechanism | ANNEX_AT addresses production dependency, not delivery infrastructure |
| F-12 | Sim 11: Data Broker | DEFECT | High | High | 36-month review window; "product improvement" not covered by secondary use prohibition; contractor jurisdiction UNCERTAIN | Three-year cycle too long; prohibition list incomplete |
| F-13 | Sim 12: Future Maintainer | DEFECT | High | High | Undefined terms not P-004 protected; AH8 incomplete; validator misses heading anchors | P-004 protection limited to explicitly listed terms |
| F-14 | Compound A: AI Vendor + Ombuds | DEFECT | Critical | High | Vendor funds Ombuds institutions; Plenum cannot certify oracle independence; directional bias runs unchecked | No vendor-funding conflict disclosure for Ombuds independence |
| F-15 | Compound B: Emergency + Delay | DEFECT | High | High | AH6 90-day deadline has no enforcement mechanism; Constitutional Queue delay stalls audit indefinitely | AH6 lacks automatic fallback if founding team doesn't launch panel |
| F-16 | Compound C: Donor + Drift | DEFECT | Critical | High | Founding basket narrowed in Stage 1; undefined adjacent terms narrowed in Stage 2; each stage has plausible deniability | Two-stage attack stays below detection threshold at each stage |
| F-17 | Compound D: Data Broker + Infrastructure | DEFECT | Critical | Medium | Same contractor holds identity and delivery; reporter protection covers standing not physical delivery; contractor jurisdiction gap | Article VII reporter protection has physical delivery gap |
| F-18 | Compound E: Maintainer + Terminology | DEFECT | High | High | Interpretive practice erodes protections without text changes; Tier 1/2 disambiguation gap exploited | Drift chain invisible to interpretive erosion |

---

## Recommendations for Phase 3

The following repair shapes are ordered by the combined frequency of appearance across simulations and compound scenarios. Items appearing in 3 or more simulations are listed first.

**Priority 1: AH8 Completeness (appears in Simulations 1, 12, C-B, C-C, C-E)**
Complete ANNEX_AH §AH8 to include all ACTIVE patches (P-016, P-021, P-024, P-025, P-029–P-049). Repairing AH8 reduces the vulnerability surface for future maintainer attacks and improves detectability of compound exploits. This is the single highest-leverage structural repair.

**Priority 2: Critical Term Definition Package (appears in Simulations 6, 8, 9, C-D, C-E)**
Define the following terms with constitutional authority: (a) "founding basket" with enumerated minimum categories; (b) "harm" with minimum evidentiary threshold; (c) "emergency" with master definition and context-specific trigger standards; (d) "public power" with enumerated boundary. Extend P-004 explicit protection to all terms in the HC Article IV essential basket definition.

**Priority 3: Fix ANNEX_AM §AM8.4 6-of-7 Threshold (appears in Simulations 1, 2, C-A)**
Correct the removal threshold from "6-of-7 vote of the Federated Ombuds Plenum" to "4-of-5 vote" or adjust the Plenum size to 7 and update FC-090 accordingly. This is the most dangerous single drafting defect — it creates an irremovable-member scenario.

**Priority 4: AH6 Audit Enforcement Mechanism (appears in Simulations 5, C-B)**
Add an automatic AH6 panel constitution mechanism: if the founding team has not constituted the panel within 30 days of P-013 ACTIVE, the Federated Ombuds constitutes it automatically. Add a consequence for missing the 90-day deadline.

**Priority 5: Constitutional Queue SLA and Enforcement Slot Expansion (appears in Simulations 4, C-B)**
Add a maximum Constitutional Queue dwell time before mandatory status publication (e.g., 45 days). Raise the minimum enforcement-category slot from 1 to 2 per quarter in AE2.2.

**Priority 6: Oracle Directional Bias Test (appears in Simulations 3, 7, C-A)**
Add a directional bias test to the FC-032 oracle independence metric. Require the adversarial oracle seat to be nominated by the Federated Ombuds rather than by the cohort itself.

**Priority 7: Founding Window Protections (appears in Simulations 5, 6, C-C)**
Require founding basket publication at the opening of the AH2 pre-activation period. Add a coalition concentration limit (combined 40% cap for any three funders). Define "proceeding underway" in AH5.1 with specific deadlines.

**Priority 8: Delivery Infrastructure Dependency (appears in Simulations 10, C-D)**
Extend Article V Natural Monopoly Track to explicitly include delivery logistics infrastructure. Add emergency compulsory operation pathway. Prohibit same contractor from holding identity verification and delivery infrastructure contracts for the same population.

**Priority 9: Data Use Controls (appears in Simulations 11, C-D)**
Change identity data three-year review to annual with quarterly publication. Add "commercial profiling," "model training," and "product improvement" to the secondary use prohibition. Require contractor data use agreements to be published in the Article VII transparency dashboard.

**Priority 10: Deadlock Scope Freeze Duration (appears in Simulation 9)**
Add a 72-hour maximum on the AE2.3 deadlock scope freeze for new-domain emergency activations. Define Level 5 structural review.

---

## Self-Review

| Dimension | Score (1–5) | Rationale |
|---|---|---|
| **Coverage** | 4 | All 12 required individual simulations and all 5 compound simulations completed. Key source files consulted. Minor gaps: ANNEX_AK, ANNEX_AY, ANNEX_AZ not fully explored (referenced in passing). |
| **Specificity** | 4 | Most simulations cite specific document/section/line ranges. A few exploit paths rely on UNCERTAIN jurisdictional questions where the corpus is genuinely ambiguous. |
| **Evidence** | 5 | All findings are grounded in observed corpus text or Phase 1 documented findings. No finding is invented. UNCERTAIN labels applied where corpus text is ambiguous. |
| **Adversarial Depth** | 4 | Simulations model realistic actors with plausible institutional standing and leverage. Some simulations (7, 8) would benefit from deeper technical analysis of the oracle aggregation mechanism, which is unspecified in the corpus. |
| **Actionability** | 4 | All findings include a "Recommended fix shape" with minimal structural repair description. Phase 3 recommendations are prioritized by cross-simulation frequency. Some fixes reference other fixes (AH8, P-004 extension) as dependencies. |
| **Overall** | 4 | Strong Phase 2 output. Primary limitation is the AH8 incompleteness (not repairable within Phase 2 scope) and several UNCERTAIN items (oracle aggregation mechanism, Ombuds contractor jurisdiction) that require targeted research in Phase 3. |

No dimension scored below 4. No Repair Pass Required.

---

*Audit scope: read-only corpus analysis. No source files, generated files, scripts, or configs were modified.*
