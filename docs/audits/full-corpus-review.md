# Full Corpus Review — Humane Constitution

**Report date:** 2026-05-15
**Auditor:** Adversarial synthesis agent (claude-sonnet-4-6)
**Phase coverage:** Phase 1 (structural inventory, traceability, consistency, terminology, source references — Reports 01–05), Phase 2 (loophole analysis, emergency powers, AI authority, rights and remedies, governance capture, adversarial simulations — Reports 06–12), Phase 3 (structural vulnerability synthesis, targeted reconciliation — Reports 13–14)
**Finding catalog:** FCR-001 through FCR-054 (54 cross-phase synthesis findings)
**Overall risk rating:** **Critical**

---

## Executive Summary

### Overall Risk Rating: Critical

The Humane Constitution corpus contains four confirmed structural breakers — defects that cannot be remedied by operational adjustment alone, that would independently produce irremediable failure modes, and that collectively interact to create recursive lock-in scenarios. Any one of these would warrant a High rating; all four together, with the founding-window exposure simultaneous with all four, warrant Critical.

The four structural breakers are:

1. **CIP removal impossibility** — ANNEX_AM §AM8.4 requires a 6-of-7 vote of the Federated Ombuds Plenum to remove a CIP member, but the Plenum has 5 members. The threshold is mathematically impossible. Once seated, CIP members are irremovable by any constitutional mechanism, and a captured CIP member can simultaneously block all Tier 1 amendments indefinitely, including any amendment that would fix the defect itself.

2. **§AZ2 token specification missing** — ANNEX_AK §AK8.1 explicitly references "ANNEX_AZ §AZ2 (to be drafted)" as the home of the Tier 0 pseudonymous token mechanism specification, which is a pre-operational prerequisite under INV-LAUNCH-1. ANNEX_AZ §AZ2 as written contains demurrage architecture definitions, not a token mechanism. The referenced specification does not exist in any part of the corpus. INV-LAUNCH-1 cannot be cleared.

3. **Founding-window protection gap** — All eight named founding-window protections (ANNEX_AG §AG1, AG2, AG3, AG4, AG-LATENCY, and ANNEX_AF §AF1, AF3, AF7) are PROPOSED — not ACTIVE — during the exact period of highest institutional capture risk. None appear on the mandatory pre-launch blocking gate list.

4. **IOA trigger undefined** — The Interim Operational Authority auto-constitutes on "Level 3 or Level 4 emergency declaration" (ANNEX_AC §AC1.5), but no objective standard defines what constitutes a Level 3 emergency, who bears authority to declare one, or what evidence is required before the declaration. Three incompatible emergency trigger standards exist across the corpus with no master definition and no tribunal to resolve disputes.

The corpus is architecturally sophisticated. The 7-of-9 keyholder hard-lock, the 180-day timelock, the drift chain, and the 5-node BFT Ombuds structure are genuine and well-specified protections. The corpus is also excellent at identifying threats — the Threat Register, Patch Log, and Abuse Case Library represent serious adversarial thinking. The Critical rating reflects not the intent or design quality but the specific structural defects that, if triggered, cannot be corrected through the standard amendment process.

### Top 15 Highest-Risk Findings

| # | Finding ID | Title | Severity |
|---|---|---|---|
| 1 | FCR-001 | CIP removal threshold mathematically impossible | Critical |
| 2 | FCR-002 | §AZ2 token mechanism specification missing; INV-LAUNCH-1 unblockable | Critical |
| 3 | FCR-003 | Founding-window protections all PROPOSED during highest-risk period | Critical |
| 4 | FCR-004 | IOA emergency trigger standard undefined — self-declared emergency possible | Critical |
| 5 | FCR-005 | Recursive Tier 1 lock: captured CIP blocks its own removal correction | Critical |
| 6 | FCR-006 | Demurrage safe harbor: 6 months (Constitution) vs. 18 months (ANNEX_J) — 200% discrepancy, no governing clause | High |
| 7 | FCR-007 | "Qualified independent review body" undefined — keyholder removal mechanism inoperable | High |
| 8 | FCR-008 | "Tier 1" overloaded across three incompatible namespaces — enables false-lowering and false-raising attacks | High |
| 9 | FCR-009 | CIP concurrent ratification requirement invisible in Constitution text and amendment protocol | High |
| 10 | FCR-010 | AH8 master linkage table omits 30+ ACTIVE patches | High |
| 11 | FCR-011 | AG4 and AG1 absent from mandatory pre-launch blocking gates | High |
| 12 | FCR-012 | No pre-signature public notice period before Tier 1 keyholder signing begins | High |
| 13 | FCR-013 | Founding basket undefined — 70% Essential Access floor meaningless | High |
| 14 | FCR-014 | Oracle directional bias not detected by FC-032 pairwise correlation test | High |
| 15 | FCR-015 | Detection without enforcement — systemic pattern across oracle, IOA, demurrage, AM3 trigger chains | High |

### Top 10 Strongest Safeguards

| # | Safeguard | Location | Why it is load-bearing |
|---|---|---|---|
| 1 | 7-of-9 keyholder hard-lock (FC-110) | `architecture/amendment_protocol.md` | Prevents any minority coalition from amending Tier 1 invariants; geographically and institutionally dispersed |
| 2 | 180-day amendment timelock (FC-111) | `architecture/amendment_protocol.md` | Prevents speed attacks; provides civil-society response window; calibrated to one political cycle |
| 3 | Drift chain (append-only version history) | `architecture/drift_chain.md` | Every amendment is publicly visible before taking effect; stealth modification is detectable |
| 4 | Federated Ombuds 5-node BFT structure (4-of-5 Plenum, FC-090/091) | `docs/annexes/ANNEX_AI.md` | Tolerates f=1 captured node; no single-actor veto on Ombuds decisions |
| 5 | CIP concurrent ratification requirement (AM8.6) | `docs/annexes/ANNEX_AM.md` | Even with 7 keyholder votes, CIP affirmative ratification is required for Tier 1 amendments to be effective |
| 6 | P-014 non-precedent closure (AH1, Tier 2 protected) | `docs/annexes/ANNEX_AH.md` | Bootstrapping exception is sealed permanently once P-013 is ACTIVE; cannot be cited as precedent |
| 7 | Two-key adversarial attestation gate (P-034/ANNEX_AV) | `docs/annexes/ANNEX_AV.md` | Cryptographic gate requiring adversarial panel sign-off before any Tier-1-touching proposal enters FAP intake |
| 8 | Oracle independence architecture (FC-030/031/032/033) | `docs/annexes/ANNEX_AL.md` | Minimum 5 nodes, 3 methodology classes, pairwise correlation cap, mandatory adversarial seat |
| 9 | IOA explicit exclusion from constitutional matters (AC1.5 prohibited actions) | `docs/annexes/ANNEX_AC.md` | Interim Operational Authority cannot touch Tier 1/2 invariants or Essential Access rules regardless of emergency declaration |
| 10 | Tier 1 invariants protected by INV-007 | `docs/constitution/INVARIANTS.md` | Core survival guarantees (INV-001 through INV-006) cannot be modified without 7-of-9 hard-lock process |

---

## Method

### Phase Structure

**Phase 1 (Reports 01–05):** Structural inventory, traceability chain verification, internal consistency checking, terminology audit, and source/link reference audit. Scope: ~100 source governance documents, all Threat Register entries (T-001 through T-028), all Patch Log entries (P-001 through P-062), AH8 master linkage table, ANNEX_AI, ANNEX_AM, ANNEX_AK, ANNEX_AZ, Acceptance Protocol, INVARIANTS, and Humane Constitution. Method: read-only corpus inspection; grep-based cross-referencing; no source file modification.

**Phase 2 (Reports 06–12):** Adversarial stress-testing across seven domains: loopholes (P2-LH-001 through P2-LH-011), emergency powers, AI authority boundaries, rights and remedies, governance capture, adversarial simulations (12 individual + 5 compound), source/link reference. Method: adversarial actor simulation; for each mechanism, traced the step-by-step exploit path through actual corpus text.

**Phase 3 (Reports 13–14):** Targeted reconciliation and structural vulnerability synthesis. All highest-priority Phase 1 and Phase 2 findings verified against primary source text. Findings classified as CONFIRMED (source text matches claim), UNCERTAIN (ambiguous), or INFERRED (structural inference).

### Files Reviewed

All 15 source audit reports were read in full for synthesis. Primary corpus files read directly include: `docs/constitution/Humane_Constitution.md`, `docs/constitution/INVARIANTS.md`, `docs/constitution/Acceptance_Protocol.md`, `docs/constitution/SPECIFICATIONS.md`, `docs/annexes/ANNEX_AM.md`, `docs/annexes/ANNEX_AI.md`, `docs/annexes/ANNEX_AG.md`, `docs/annexes/ANNEX_AF.md`, `docs/annexes/ANNEX_AL.md`, `docs/annexes/ANNEX_AC.md`, `docs/annexes/ANNEX_AK.md`, `docs/annexes/ANNEX_AZ.md`, `docs/annexes/ANNEX_AH.md`, `docs/annexes/ANNEX_AV.md`, `architecture/amendment_protocol.md`, `founding/commitments.md`, `docs/governance/Patch_Log.md`, `docs/governance/Threat_Register.md`, `docs/governance/Founding_Capital_Framework.md`.

### Files Not Independently Re-Audited in This Synthesis

ANNEX_AK §AK8.4 (INV-001 relationship), the full Phase 2 adversarial oracle aggregation mechanism (marked UNCERTAIN in Phase 2), and six PROPOSED pilot-founding governance documents (P-057 through P-062 "Creates:" paths, existence uncertain). PRD- namespace origin document (ADVERSARIAL_AUDIT.md) was not found in the corpus.

### Limitations

This synthesis treats Phase 1 and Phase 2 findings as confirmed unless independently contradicted. Phase 3 independently re-verified the highest-severity findings against primary source text; lower-severity findings are carried forward from prior phases. Some findings marked UNCERTAIN in Phase 2 remain UNCERTAIN here because the corpus is genuinely ambiguous.

---

## Corpus Architecture Summary

The Humane Constitution project implements a multi-hop governance chain:

```
Threat Register (T-NNN)
  → Patch Log (P-NNN)
    → Constitutional clause (Humane_Constitution.md)
      → Annex (ANNEX_XX.md §section)
        → Acceptance Protocol (pre-launch gates, priority order)
          → AH8 master linkage table (cross-session reconciliation)
```

The constitutional documents consist of: `Humane_Constitution.md` (principal text), `INVARIANTS.md` (hard-lock parameters), `Acceptance_Protocol.md` (FAP procedure), and `SPECIFICATIONS.md` (technical state machine). These are protected files — modification requires explicit instruction and appropriate amendment process.

The corpus covers an AI-assisted economic system with: a Communal Survival Minimum (CSM) basket providing unconditional survival access, a Flow currency with demurrage, a pseudonymous identity system (AED), a Federated Oracle Network for capacity measurement, an Essential Access issuance mechanism, a Shared Storehouse for emergency supply, and a multi-tier amendment architecture with a 7-of-9 keyholder hard-lock.

**Active patches:** ~52 of 62 registered patches. **PROPOSED patches:** ~10, including the entire founding-window protection layer (ANNEX_AG, ANNEX_AF) and the primary CIP constitution mechanism (P-018/ANNEX_AM). The corpus has 100 exported documents. The AH8 master linkage table covers only ~30 of 62 patches — omitting P-016, P-021, P-024, P-025, and all of P-029 through P-049 despite these being ACTIVE with named annex references.

---

## Finding Index

| FCR ID | Severity | Confidence | Category | File / Section | Summary | Priority | Source Report(s) |
|---|---|---|---|---|---|---|---|
| FCR-001 | Critical | CONFIRMED | Mathematical impossibility | ANNEX_AM §AM8.4; ANNEX_AI §1.3 | CIP removal requires 6-of-7 Plenum vote; Plenum has 5 members | P0 | 13, 14, 08, 11 |
| FCR-002 | Critical | CONFIRMED | Missing specification | ANNEX_AK §AK8.1; ANNEX_AZ §AZ2 | §AZ2 contains demurrage definitions, not the Tier 0 token mechanism; INV-LAUNCH-1 unblockable | P0 | 02, 13, 14 |
| FCR-003 | Critical | CONFIRMED | Activation gap | ANNEX_AG (all); ANNEX_AF (all) | All 8 founding-window protections are PROPOSED during highest-capture-risk period | P0 | 13, 10, 11 |
| FCR-004 | Critical | CONFIRMED | Enforcement gap | ANNEX_AC §AC1.5; §AC1.3 | IOA constitutes on "Level 3/4 declaration" with no objective trigger standard or declaring authority | P0 | 06, 13, 14 |
| FCR-005 | Critical | CONFIRMED + INFERRED | Structural lock-in | ANNEX_AM §AM8.4, §AM8.5, §AM8.6 | Captured irremovable CIP member can also block all Tier 1 amendments; fix requires body whose defect prevents its own correction | P0 | 13, 14 |
| FCR-006 | High | CONFIRMED | Threshold discrepancy | HC §VIII; ANNEX_J §J2 | Demurrage safe harbor 6 months (Constitution) vs. 18 months (ANNEX_J); no governing clause; 200% discrepancy | P1 | 03, 14 |
| FCR-007 | High | CONFIRMED | Undefined term | HC line 327; ANNEX_AI §3 | "Qualified independent review body" for keyholder replacement has no criteria; mechanism inoperable in both exploit directions | P1 | 05, 08 |
| FCR-008 | High | CONFIRMED | Terminology collision | ANNEX_AK §AK8; ANNEX_AZ §AZ3; amendment_protocol.md | "Tier" used in three incompatible senses: governance Tier (1/2/3), access Tier (0/1), demurrage Tier (T1–T4) | P2 | 04, 13 |
| FCR-009 | High | CONFIRMED | Constitutional invisibility | HC (all); ANNEX_AM §AM8.6; amendment_protocol.md | CIP concurrent ratification requirement for Tier 1 amendments appears nowhere in Constitution or amendment protocol text | P1 | 03, 14 |
| FCR-010 | High | CONFIRMED | Structural integrity | ANNEX_AH §AH8 | Master linkage table omits P-016, P-021, P-024, P-025, and all P-029–P-049 despite ACTIVE status | P1 | 01, 11, 12 |
| FCR-011 | High | CONFIRMED | Blocking gate gap | Acceptance_Protocol.md §Pre-Launch Blocking Gates | AG4 (urgency bypass prohibition) and AG1 (pilot representativeness) absent from mandatory pre-launch gates | P1 | 13, 10 |
| FCR-012 | High | CONFIRMED | Amendment procedure gap | architecture/amendment_protocol.md | No public notice required before Tier 1 keyholder signatures are collected; amendment can advance to 7-of-9 threshold before public awareness | P1 | 14 |
| FCR-013 | High | CONFIRMED | Undefined term | ANNEX_AM §AM2; HC Article IV | "Founding basket" undefined; 70% Essential Access floor protection is anchored to a term with no enumerated content | P1 | 03, 11 |
| FCR-014 | High | CONFIRMED | Enforcement gap | ANNEX_AL FC-032; §AL-CORR | FC-032 pairwise correlation cap detects co-movement but not systematic directional bias; 3-of-5 node capture can produce consistent over/under-reporting undetected | P1 | 07, 11 |
| FCR-015 | High | CONFIRMED | Detection without enforcement | Multiple (oracle, IOA, AM3, AH6) | Shall-chains detect violations but enforcement owner, consequence, and timeline are unspecified | P1 | 13 |
| FCR-016 | High | CONFIRMED | Temporal gap | ANNEX_AM §AM3; §AM8.7 | AM3 administrative hollowing triggers fire but initiating body (CIP) may not yet be constituted during founding window | P1 | 13 |
| FCR-017 | High | CONFIRMED | Blocking gate gap | Acceptance_Protocol.md §Pre-Launch; INVARIANTS.md INV-LAUNCH-1 | INV-LAUNCH-1 requires FC-YT1 and FC-YT2 as formal rows in commitments.md; they exist only as provisional ANNEX_Y text | P0 | 14 |
| FCR-018 | High | CONFIRMED | Constitutional invisibility | ANNEX_AC §AC1.5; HC Article V | IOA prohibited actions list excludes Tier 1/2 invariants and Essential Access, but boundary between "operational" and "constitutional" decision is undefined | P1 | 06, 11 |
| FCR-019 | High | CONFIRMED | Enforcement gap | ANNEX_AL §AL-CORR; §3.4 | Oracle suspension trigger fires but no owner declared, no timeline, no appeal, no audit artifact required | P2 | 13 |
| FCR-020 | High | CONFIRMED | Enforcement gap | ANNEX_AM §AM8.3 | CIP budget oracle-dependent; sub-2% oracle understatement can systematically starve CIP below operational floor without triggering published-discrepancy mechanism | P2 | 13, 09 |
| FCR-021 | High | CONFIRMED | Enforcement gap | ANNEX_AH §AH6 | AH6 post-activation audit has 90-day deadline but no enforcement mechanism; founding team can avoid audit indefinitely via Constitutional Queue delay | P1 | 11 |
| FCR-022 | High | CONFIRMED | Rights gap | ANNEX_L §L5, §L6 | Remedy selection criteria absent; same violation can receive stay or nullification depending on forum; no financial remedy defined for privacy, conscience, or housing rights violations | P1 | 08 |
| FCR-023 | High | CONFIRMED | Undefined term | HC (7+ uses); ANNEX_AC | No master emergency definition; three incompatible trigger standards (L2/L3 scarcity, PCRP, governance) with no resolution mechanism | P1 | 04, 06, 14 |
| FCR-024 | High | CONFIRMED | Rights gap | HC Article IV; ANNEX_AT §AT0.1, §AT1.2 | Delivery infrastructure dependency not covered by strategic floor architecture; no compulsory operation mechanism for private infrastructure provider withholding service | P1 | 11 |
| FCR-025 | High | CONFIRMED | Procedural gap | ANNEX_AC §AC1.1; ANNEX_AE §AE2.2 | Constitutional Queue has no maximum dwell time SLA; enforcement-category minimum is 1 slot per quarter; both exploitable for throughput starvation | P1 | 11 |
| FCR-026 | High | CONFIRMED | Deadlock gap | ANNEX_AE §AE2.3 | AE2.3 deadlock scope freeze has no maximum duration; can paralyze new emergency activations during multi-wave crisis indefinitely | P1 | 11 |
| FCR-027 | High | CONFIRMED | Self-defining mechanism | HC line 327 | Keyholder removal mechanism depends on "qualified independent review body" with no criteria; simultaneously exploitable by incumbents (blocking petitioners) and hostile faction (declaring itself qualified) | P1 | 05 |
| FCR-028 | High | CONFIRMED | Identity/privacy gap | HC Article II; ANNEX_AI §3 | Three-year identity data review cycle creates 36-month exploitation window; "product improvement" and "model training" not covered by secondary use prohibition | P1 | 11 |
| FCR-029 | High | CONFIRMED | Compound capture | ANNEX_AL §5; ANNEX_AI §3 | AI vendor funding Ombuds institutions creates vendor→oracle capture + Ombuds independence failure compound attack with mutual protection loop | P1 | 11 |
| FCR-030 | High | CONFIRMED | Nomination gap | Founding_Capital_Framework §FC-2 | No coalition concentration limit; three funders individually below 20% cap can collectively control 55% of founding capital; P-004 then protects a captured founding basket definition | P1 | 11 |
| FCR-031 | Medium | CONFIRMED | Traceability gap | ANNEX_AH §AH8 | AH8 table column transposition for P-056 through P-062 rows breaks consistent machine-readable parsing | P2 | 02 |
| FCR-032 | Medium | CONFIRMED | Traceability gap | Patch_Log.md inventory | P-007, P-010, P-028 absent from patch sequence with no retirement notice or explanation | P2 | 02 |
| FCR-033 | Medium | CONFIRMED | Stale status | Threat_Register.md T-016, T-017, T-018 | At least three detailed threat entries carry "Status: PROPOSED" for patches that are ACTIVE in Patch Log and AH8 | P2 | 02 |
| FCR-034 | Medium | CONFIRMED | Namespace gap | Patch_Log.md; multiple annexes | PRD- IDs (PRD-001, PRD-003, PRD-004, PRD-008, PRD-009) appear in Patch Log and INVARIANTS.md with no discoverable registry; origin document not in corpus | P2 | 02, 14 |
| FCR-035 | Medium | CONFIRMED | Undefined term | HC (11 uses); INVARIANTS.md | "Human dignity floor" undefined beyond physical CSM basket; non-physical dignity violations (discrimination, surveillance, coercion) excluded from floor's enforceable scope | P2 | 04, 14 |
| FCR-036 | Medium | CONFIRMED | Undefined term | HC (11 uses); P-059 (PROPOSED) | Individual-level informed consent for pilot participation has no binding definition until P-059 (VPCP) is ACTIVE; community consent is defined, individual consent is not | P2 | 14 |
| FCR-037 | Medium | CONFIRMED | Amendment gap | amendment_protocol.md §3 | 180-day timelock's Federated Ombuds Integrity Report requirement (within 60 days) has no fallback if Ombuds is not yet constituted | P2 | 14 |
| FCR-038 | Medium | CONFIRMED | Traceability gap | Threat_Register.md T-010 | T-010 appears as active entry in Summary table and as RENUMBERED in retirement table simultaneously | P2 | 02 |
| FCR-039 | Medium | CONFIRMED | Exploitation gap | ANNEX_AM §AM8.2 | CIP staggering rule (no more than 2 seats turn over per calendar year) specifies no enforcement consequence for violations | P2 | 11 |
| FCR-040 | Medium | CONFIRMED | Auditor selection | HC line 207; ANNEX_U §U3 | Investment channel external-assignment rules for auditor selection referenced but not defined; auditee-controlled audit relationships possible | P1 | 05 |
| FCR-041 | Medium | CONFIRMED | Validator gap | scripts/validate_corpus.py; ANNEX_AH §AH8 | Corpus validator does not check heading anchors; P-004 protected term cross-references via section heading can be silently broken without validation failure | P2 | 11, 12 |
| FCR-042 | Medium | CONFIRMED | Undefined term | HC Article I; ANNEX_AC §AC1.5; HC Article V | "Public power" (a core separation invariant) has no formal definition; boundary "Flow cannot buy public power" is unenforceable | P2 | 04 |
| FCR-043 | Medium | CONFIRMED | Traceability gap | Patch_Log.md P-057–P-062 | ACL- namespace (ACL-005 through ACL-013+) used as threat source for Critical PROPOSED founding-framework patches with no formal registry discoverable in corpus | P2 | 02 |
| FCR-044 | Medium | UNCERTAIN | Jurisdiction gap | ANNEX_AI §2.1; HC Article II | Federated Ombuds jurisdiction over contractors (vs. operators) of identity and delivery systems is not specified; contractor-level data misuse may fall outside Ombuds reach | P2 | 11 |
| FCR-045 | Medium | CONFIRMED | P-004 gap | ANNEX_AB §AB5 | P-004 definition drift protection applies only to explicitly listed protected terms; "human dignity," "public power," and HC Article IV essential basket terms are not all explicitly P-004 protected | P2 | 11, 12 |
| FCR-046 | Medium | CONFIRMED | Emergency gap | ANNEX_AH §AH5.1; §AH1 | Non-precedent rule prohibits formal P-014 citation but does not prohibit using P-014's underlying logic as urgency argument; "proceeding underway" in AH5.1 undefined | P2 | 11 |
| FCR-047 | Medium | CONFIRMED | Corrigibility gap | Patch_Log.md P-035 | "Corrigibility" used as P-035 design target but undefined in constitutional text; no operational definition, no test, no trigger for non-corrigibility finding | P2 | 04 |
| FCR-048 | Low | CONFIRMED | Sequence gap | docs/annexes/ | ANNEX_AU absent from AT→AV sequence with no documentation in INDEX.md | P3 | 01 |
| FCR-049 | Low | CONFIRMED | Traceability gap | Threat_Register.md; Patch_Log.md | TR-07 (non-standard ID) appears in P-024 Related Threat column and propagates to AH8 without being registered in Threat Register | P2 | 02 |
| FCR-050 | Low | CONFIRMED | Traceability gap | ANNEX_B.md; Threat_Register.md | TR- (founding threat register, ANNEX_B) and T- (modern threat register) are parallel registers with no cross-reference between them | P3 | 02, 14 |
| FCR-051 | Low | CONFIRMED | Duplicate anchor | Patch_Log.md §P-013 heading | P-013 heading appears twice causing anchor slug collision; links to #p-013 resolve to first (incorrect) occurrence | P3 | 01 |
| FCR-052 | Low | UNCERTAIN | Existence uncertain | founding/order/ | T-026 and T-027 map to founding/order/ directory as operative annex; directory exists but file completeness not confirmed by direct read | P3 | 02 |
| FCR-053 | Low | CONFIRMED | Missing definition | Founding_Legitimacy_Dossier.md | "Active, not passive" consent definition exists in Founding_Legitimacy_Dossier but is not in Constitution or INVARIANTS, creating a weaker governing claim than its constitutional importance warrants | P3 | 14 |
| FCR-054 | Low | CONFIRMED | Undefined term | HC; ANNEX_AL §1 | "Corroborated" in PCRP two-source requirement lacks structural-independence standard; same institution's two divisions could satisfy "two sources" requirement | P2 | 06 |

---

## Critical Findings

---

### FCR-001: CIP Removal Threshold Mathematically Impossible

**Severity:** Critical
**Confidence:** CONFIRMED (source text verified in Phase 3)
**Category:** Mathematical impossibility
**Location:** `docs/annexes/ANNEX_AM.md` §AM8.4; `docs/annexes/ANNEX_AI.md` §1.3; `founding/commitments.md` FC-090, FC-091

**Problem:** ANNEX_AM §AM8.4 states: "A CIP member may be removed only by a **6-of-7 vote of the Federated Ombuds Plenum** (Annex AI §3)." ANNEX_AI §1.3 states the Federation Plenum is "the five sub-Ombuds together, voting under §3." FC-090 sets `OMBUDS_SUBCOUNT_MIN = 5`. A 6-of-7 vote on a 5-member body is impossible. The maximum vote this body can produce is 5-of-5.

**Why it matters:** No CIP member can ever be removed by any constitutional mechanism currently in force. Once seated, a compromised or captured CIP member is permanent. The constitution has no fallback removal pathway, no escalation tier for CIP misconduct, and no external appeal to a different body.

**Exploit / failure scenario:** A single captured CIP member is irremovable. Three captured CIP members produce permanent Tier 1 amendment deadlock (since AM8.5 requires 5-of-7 CIP affirmative for ratification, 3 captured members can block all Tier 1 amendments). The capture needs no active conspiracy — a member who becomes compromised after appointment is equally irremovable.

**Suggested fix shape:** Fix A (preferred): Change "6-of-7 vote of the Federated Ombuds Plenum" to "5-of-5 (unanimous) vote of the Federated Ombuds Plenum." This preserves the near-impossible removal threshold without requiring a Tier 1 amendment to the Plenum composition. Fix B: Amend FC-090 from `OMBUDS_SUBCOUNT_MIN = 5` to `OMBUDS_SUBCOUNT_MIN = 7`, which aligns the Plenum size with the 6-of-7 threshold but requires a Tier 1 amendment. Fix A is preferred because it avoids the Tier 1 process and the recursive lock risk.

**Related threats/patches:** P1-IC-011, P2-LH-011, SVS-002, T-022 (electoral cycle capture)

**Risk introduced by fixing:** Fix A makes removal marginally harder (unanimous vs. 6-of-7 intended), which is conservative and capture-resistant. Fix B requires a Tier 1 amendment that itself requires CIP ratification — if capture has already occurred, Fix B may be impossible.

---

### FCR-002: §AZ2 Token Mechanism Specification Missing; INV-LAUNCH-1 Unblockable

**Severity:** Critical
**Confidence:** CONFIRMED (source text verified in Phase 3)
**Category:** Missing specification
**Location:** `docs/annexes/ANNEX_AK.md` §AK8.1; `docs/annexes/ANNEX_AZ.md` §AZ2; `docs/constitution/INVARIANTS.md` INV-LAUNCH-1; `docs/governance/Hardening_Queue.md`

**Problem:** ANNEX_AK §AK8.1 states: "The technical specification for the token mechanism is defined in ANNEX_AZ §AZ2 (to be drafted) and is a pre-operational prerequisite under INV-LAUNCH-1." The phrase "(to be drafted)" is embedded in the live source text — confirming the specification was known to be missing at authoring time. ANNEX_AZ §AZ2 as actually written contains demurrage architecture symbol definitions (S, M*, W*, r, E, λ(E), D(E)) — categorically different content. The Hardening_Queue explicitly flags this: "Draft ANNEX_AZ §AZ2 specifying token generation, expiry, non-aggregation guarantees, and audit constraints before any Phase 3 pilot."

INV-LAUNCH-1 gates the pre-operational phase on FC-YT1 and FC-YT2 as formally registered binding rows in `/founding/commitments.md` — but these values exist only as provisional text in ANNEX_Y, not as registered commitment rows. Additionally, the Federated Ombuds verification required by INV-LAUNCH-1 cannot be completed until the Ombuds is constituted (pre-launch gate in ANNEX_AI §2.1). Three simultaneous conditions block INV-LAUNCH-1 clearance.

**Why it matters:** The system cannot legally proceed to operational phase with real persons until INV-LAUNCH-1 is cleared. The primary referenced specification does not exist. A compliance officer checking ANNEX_AZ §AZ2 would find demurrage content and might falsely certify the gate as met, or be confused about what to check.

**Exploit / failure scenario:** Pre-operational compliance review passes INV-LAUNCH-1 based on ANNEX_AZ §AZ2 existing (the file exists) without verifying that §AZ2 contains the required token mechanism content. System proceeds to enroll real persons without a verified Tier 0 access mechanism.

**Suggested fix shape:** (1) Draft the Tier 0 pseudonymous token mechanism specification, placing it in a correct location (new ANNEX_AZ §AZ2-TOKEN subsection, or new dedicated annex), and update ANNEX_AK §AK8.1 reference; (2) Register FC-YT1 and FC-YT2 as formal binding rows in `/founding/commitments.md`; (3) Add "Tier 0 token mechanism specification complete and independently verified" to pre-launch blocking gate list.

**Related threats/patches:** P1-TR-001, SVS-001, SVS-010, RC-001, RC-002, RC-003, RC-014

**Risk introduced by fixing:** Low — pure addition. No existing text is removed. The demurrage definitions in ANNEX_AZ §AZ2 are unaffected.

---

### FCR-003: Founding-Window Protections All PROPOSED During Highest-Risk Period

**Severity:** Critical
**Confidence:** CONFIRMED (source text verified in Phase 3)
**Category:** Activation gap
**Location:** `docs/annexes/ANNEX_AG.md` (all sections); `docs/annexes/ANNEX_AF.md` (all sections); `docs/constitution/Acceptance_Protocol.md` §Pre-Launch Blocking Gates

**Problem:** The founding window — the period from constitutional inception to first real-persons enrollment — is the highest institutional capture risk period in any governance system. All eight named founding-window protections are PROPOSED during this window:

| Protection | Section | Status |
|---|---|---|
| Pilot representativeness standard | ANNEX_AG §AG1 | PROPOSED |
| Sign-off deadlock resolution | ANNEX_AG §AG2 | PROPOSED |
| Audit epistemic independence | ANNEX_AG §AG3 | PROPOSED |
| Anti-gaming Tier 2 reclassification (urgency bypass prohibition) | ANNEX_AG §AG4 | PROPOSED |
| Emergency FAP time bounds | ANNEX_AG §AG-LATENCY | PROPOSED |
| Grace period graduated renewal | ANNEX_AF §AF1 | PROPOSED |
| Hardship attestation collusion detection | ANNEX_AF §AF3 | PROPOSED |
| T-009 × P-008 bypass closure | ANNEX_AF §AF7 | PROPOSED |

Neither ANNEX_AG nor ANNEX_AF appears on the mandatory pre-launch blocking gate list.

**Why it matters:** The urgency bypass prohibition (AG4), the pilot representativeness standard (AG1), and the grace exploitation safeguards (AF) are the primary architectural defenses against founding-period capture. They are inactive at the exact moment they are needed. The evidence used to activate all subsequent patches can come from cherry-picked pilot regions. Urgency arguments can bypass evidence requirements during highest political pressure.

**Exploit / failure scenario:** (Simulation C-C / Compound C): During the founding window, a well-resourced coalition argues urgency to push through patch activations without evidence (AG4 inactive). Evidence comes from favorable pilot regions (AG1 inactive). After activation is sealed, P-004 protects the narrowed definitions. ANNEX_AF's grace exploitation protections were never active, so hardship collusion networks formed during the founding window without detection.

**Suggested fix shape:** Add AG4 (urgency bypass prohibition) and AG1 (pilot representativeness) to the mandatory pre-launch blocking gate list in `docs/constitution/Acceptance_Protocol.md`. These are the minimum necessary protections before any patch enters pilot. AG3 and AF7 should be added to the priority acceptance order above Cohort 1 enrollment.

**Related threats/patches:** P2-GC-01, P2-AS-003, P2-AS-004, P2-AS-009, SVS-004, SVS-005

**Risk introduced by fixing:** Low — additive gate requirement. No existing architecture is changed or weakened.

---

### FCR-004: IOA Emergency Trigger Standard Undefined

**Severity:** Critical
**Confidence:** CONFIRMED (source text verified in Phase 3)
**Category:** Enforcement gap / undefined standard
**Location:** `docs/annexes/ANNEX_AC.md` §AC1.5; §AC1.3; `docs/constitution/Humane_Constitution.md` (multiple uses)

**Problem:** ANNEX_AC §AC1.5 states the Interim Operational Authority (IOA) "auto-constitutes on a Level 3 or Level 4 emergency declaration." No objective standard defines what evidence constitutes a Level 3 emergency, who has authority to make that declaration, or what corroboration is required. The corpus has three separate emergency trigger standards across different contexts, none of which serves as the master definition:
- Supply-based (L3 scarcity table): days of supply < 7 AND fill-rate < 80% for 48 hours (oracle-confirmed)
- PCRP-based (ANNEX_AC §AC2.2): sentinel indicator + two-source corroboration + next oracle >24 hours away
- Governance emergency (ANNEX_AC §AC1.3): Level 3 or higher declared by deliberative body — but "Level 3" is undefined here too

The IOA prohibited actions list (§AC1.5) excludes "any decision touching constitutional matters, Tier 1 or Tier 2 invariants, or Essential Access rule changes" — but the boundary between "operational decision within scope" and "decision touching constitutional matters" is not defined.

**Why it matters:** A self-declared emergency becomes ordinary governance if no objective trigger standard constrains the declaration. The IOA can be constituted on a declaration that the Federated Ombuds receives notification of within 1 hour but has no mechanism to reject based on insufficient evidence.

**Exploit / failure scenario (Simulation 8 / Compound B):** A safety team or executive body manufactures a "governance emergency" using the lowest-bar trigger standard, constitutes the IOA, and uses the IOA's "operational decisions strictly within scope" authority to make decisions that would otherwise require deliberative ratification. Consecutive declarations (subject only to AC1.3's 2-quarter cap plus independent audit) can maintain perpetual IOA status.

**Suggested fix shape:** Define an objective standard for Level 3/4 emergency declarations that is independent of the declaring body's own judgment. Model on PCRP: require oracle-corroborated or multi-source evidence requirement, with Federated Ombuds confirmation of evidentiary basis before IOA is constituted. Add a master emergency taxonomy distinguishing Supply Emergency, Governance Emergency, and Infrastructure Emergency with explicit trigger tests.

**Related threats/patches:** P2-EP-001, P2-EP-002, SVS-006, P1-TF-004

**Risk introduced by fixing:** Medium — must not block legitimate emergency response. Fix should specify minimum evidence, not maximum time. The fix targets the trigger standard, not the IOA's operational authority once constituted.

---

### FCR-005: Recursive Tier 1 Lock — Captured CIP Blocks Its Own Correction

**Severity:** Critical
**Confidence:** CONFIRMED + INFERRED (structural logic confirmed; H-3 inference labeled explicitly)
**Category:** Structural lock-in
**Location:** `docs/annexes/ANNEX_AM.md` §AM8.4, §AM8.5, §AM8.6; `architecture/amendment_protocol.md` §3, §6

**Problem:** The CIP removal impossibility (FCR-001) creates a recursive lock-in. ANNEX_AM §AM8.6 states: "no Tier 1 amendment is effective without CIP ratification." AM8.5 requires 5-of-7 affirmative CIP votes for ratification. If 3 CIP members are captured, they cannot alone pass a Tier 1 amendment (need 5 affirmative), but they can block every Tier 1 amendment (since only 4 non-captured votes remain, below the 5 required). This means:
1. The removal impossibility defect (FCR-001) cannot be fixed through a Tier 1 amendment because the captured CIP can veto the fix.
2. Every other Tier 1 amendment — including emergency corrections to invariants — is blocked.
3. The recursive lock may require the H-3 refounding authority rather than the standard Tier 1 process.

**Why it matters:** This is the worst-case failure mode in the constitutional architecture. It converts a single drafting error (the wrong denominator in §AM8.4) into a permanently locked constitutional system.

**Exploit / failure scenario:** A patient adversary focuses capture efforts on just 3 of 7 CIP seats. Once captured, those three seats are irremovable and can veto every future Tier 1 amendment. The constitutional system is frozen at that moment's state indefinitely.

**Suggested fix shape:** Fix FCR-001 immediately (correct AM8.4 threshold) before any CIP is constituted. If capture has already occurred, INFERRED: the H-3 refounding convention in `architecture/amendment_protocol.md §6` may be the only remaining constitutional path, as it operates outside the standard Tier 1 ratification process. This inference should be confirmed by direct reading of §6 before relying on it.

**Related threats/patches:** SVS-002, SVS-003, P2-LH-011, P2-AS-003

**Risk introduced by fixing:** High if recursive lock has already triggered. Fix A from FCR-001 is low-risk if applied before CIP constitution; high-stakes if after.

---

## High Findings

---

### FCR-006: Demurrage Safe Harbor — 200% Discrepancy Between Constitution and ANNEX_J

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Threshold discrepancy
**Location:** `docs/constitution/Humane_Constitution.md` §VIII; `docs/annexes/ANNEX_J.md` §J2

The Constitution states the demurrage-free savings safe harbor is "6 months of median regional consumption expenditure." ANNEX_J §J2 states "every enrolled person receives an identical demurrage-free savings threshold equal to **18 months** of the published regional median consumption expenditure" with detailed rationale: 6 months for job search, 12 additional months for slow markets, caregiving, disability, retraining. ANNEX_J has no explicit governing clause. Without one, a regulator reading only the Constitution could enforce the 6-month figure, exposing 7–18 months of household savings to demurrage that ANNEX_J says should be protected.

**Fix:** Add governing clause to ANNEX_J §J2 stating ANNEX_J controls on household savings floor duration. Update Constitution §VIII figure to 18 months in next corpus revision. This requires a value decision by the founding team (which figure is right — ANNEX_J's rationale is more developed).

---

### FCR-007: "Qualified Independent Review Body" Undefined

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Undefined term
**Location:** `docs/constitution/Humane_Constitution.md` line 327; `docs/annexes/ANNEX_AI.md` §3

HC line 327 states a "qualified independent review body may petition for the replacement of any keyholder found to be acting in demonstrable self-interest." No criteria define what makes a body "qualified": composition floor, independence standard, appointment source, challenge process. Incumbents can block petitioners by challenging their qualification with no standard to disprove. Simultaneously, a hostile faction can declare itself qualified with the same void. The mechanism is exploitable in both directions simultaneously.

**Fix:** Define minimum criteria in INVARIANTS.md or a protected-terms registry entry: composition floor, independence standard (no relationship to keyholder within N years), appointment source (nominated by Ombuds or equivalent), and challenge process with binary pass/fail.

---

### FCR-008: "Tier" Overloaded Across Three Incompatible Namespaces

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Terminology collision
**Location:** Multiple — ANNEX_AK §AK8 (access Tier 0/1), ANNEX_AZ §AZ3 (demurrage Tier T1–T4), amendment_protocol.md (governance Tier 1/2/3)

"Tier" is used in at least three incompatible ways: (1) Amendment/governance Tier 1/2/3 (threshold for constitutional amendment classes); (2) Identity access Tier 0/1 (pseudonymous open floor vs. full AED); (3) Demurrage Tier T1–T4 (progressive rate bands in ANNEX_AZ §AZ3). A future maintainer or auditor reading "Tier 1" in INVARIANTS.md may conflate the governance tier with identity or demurrage tier. Compound E simulation shows this is an active exploit surface for interpretive erosion.

**Fix:** Add namespace disambiguation across all uses: "Governance Tier" (1/2/3), "Access Tier" (Tier 0/Tier 1), "Demurrage Tier" (T1/T2/T3/T4). Add a glossary entry in a protected-terms document.

---

### FCR-009: CIP Concurrent Ratification Requirement Invisible in Constitution and Amendment Protocol

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Constitutional invisibility
**Location:** `docs/constitution/Humane_Constitution.md` (all); `docs/annexes/ANNEX_AM.md` §AM8.6; `architecture/amendment_protocol.md`

ANNEX_AM §AM8.6 states no Tier 1 amendment is effective without concurrent CIP ratification. This requirement appears nowhere in `Humane_Constitution.md` and nowhere in `architecture/amendment_protocol.md`. A reader of either document alone would have no knowledge that CIP ratification is a co-condition for Tier 1 amendment effectiveness. A Tier 1 amendment could be completed without CIP ratification, with its validity disputed retroactively.

**Fix:** Add an explicit reference to CIP concurrent ratification at the end of amendment_protocol.md §3. Consider adding a summary reference in HC Article 0 or the preamble.

---

### FCR-010: AH8 Master Linkage Table Omits 30+ ACTIVE Patches

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Structural integrity
**Location:** `docs/annexes/ANNEX_AH.md` §AH8

The AH8 "Complete Threat/Patch Linkage" table omits P-016, P-021, P-024, P-025, and all of P-029 through P-049 — despite these patches being ACTIVE with named annex references in the Patch Log. The table covers roughly 30 of 62 registered patches. Any auditor, maintainer, or oversight body using AH8 as the authoritative cross-reference will systematically miss protection embodied in those patches. This is an active vulnerability enabling future maintainer attacks (Simulation 12, Compound E) and reducing detectability of compound exploits.

**Fix:** Complete AH8 to include all ACTIVE patches. This is the single highest-leverage structural repair identified in Phase 2 adversarial simulations — it appears in Simulations 1, 12, and Compounds B, C, E.

---

### FCR-011: AG4 and AG1 Absent from Pre-Launch Blocking Gates

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Blocking gate gap
**Location:** `docs/constitution/Acceptance_Protocol.md` §Pre-Launch Blocking Gates

The urgency bypass prohibition (AG4) and pilot representativeness standard (AG1) are absent from the 13-item mandatory pre-launch blocking gate list. They are both PROPOSED and cannot activate without going through FAP — which itself depends on P-013 being ACTIVE. Without AG4 as a blocking gate, urgency arguments can bypass evidence requirements for any patch during the founding window, including the evidence used to activate all subsequent patches. Without AG1 as a blocking gate, all pilot evidence can come from cherry-picked regions without detection.

**Fix:** Add to `docs/constitution/Acceptance_Protocol.md` §Pre-Launch Blocking Gates: "Anti-gaming Tier 2 reclassification (ANNEX_AG §AG4) operative" and "Pilot representativeness standard (ANNEX_AG §AG1) assessment published."

---

### FCR-012: No Pre-Signature Public Notice Before Tier 1 Keyholder Signing

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Amendment procedure gap
**Location:** `architecture/amendment_protocol.md`

The 180-day timelock begins after 7 keyholder signatures are registered. No public notice is required before the signature process begins. A captured coalition could privately assemble 7 signatures before any public disclosure. The drift chain publishes the amendment as "proposed-but-not-effective" only after signatures are registered — by which point the timelock has already started. The 30-day public scrutiny window before signing (if added) would allow civil society to raise objections before signatures lock in a proposal.

**Fix:** Add requirement: any Tier 1 amendment proposal must be published to the public amendment log and the Federated Ombuds notified at least 30 days before keyholder signing may begin.

---

### FCR-013: "Founding Basket" Undefined — Essential Access Floor Protection Unanchored

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Undefined term / exploitation gap
**Location:** `docs/annexes/ANNEX_AM.md` §AM2; `docs/constitution/Humane_Constitution.md` Article IV; `docs/governance/Founding_Capital_Framework.md` §FC-2

ANNEX_AM §AM2 states the Essential Access floor is "70% of the founding basket." "Founding basket" is not defined in ANNEX_AM, ANNEX_AB, or the Humane Constitution. P-004 (definition drift protection) protects terms after they are defined — if the initial definition is captured during the founding window, P-004 protects the captured definition. The 70% floor is constitutionally guaranteed but anchored to an undefined term that a donor coalition with 55% combined founding capital has informal leverage to define narrowly (Simulation 6 / Compound C).

**Fix:** Define "founding basket" explicitly in ANNEX_AM §AM2 with a minimum enumerated list drawn from HC Article IV's essential basket. Require founding basket definition publication at the opening of the AH2 pre-activation disclosure period (not at the end). Add a coalition concentration limit (no three funders combined above 40%) to the Founding Capital Framework.

---

### FCR-014: Oracle Directional Bias Not Detected by FC-032 Correlation Test

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Enforcement gap / oracle
**Location:** `docs/annexes/ANNEX_AL.md` FC-032; §AL-CORR; §3.4; §4

FC-032 caps pairwise correlation on historical error series at 0.30. This detects co-movement but not systematic directional bias: three oracle nodes that consistently over-report supply can maintain pairwise correlation below 0.30 while producing directional errors that systematically benefit a single actor (Simulation 3). A vendor controlling 3-of-5 nodes through different nominally-independent methodologies can satisfy FC-032 while biasing the quorum determination. The adversarial seat is supposed to challenge this, but if it is nominated by the oracle cohort itself, it may be structurally weak.

**Fix:** Add a directional bias test: nodes in the same cohort whose errors are directionally aligned above a threshold (e.g., all biased toward over-reporting more than 60% of measurement cycles) are treated as same-class regardless of pairwise correlation. Require adversarial seat to be nominated by the Federated Ombuds, not by the oracle cohort.

---

### FCR-015: Detection Without Enforcement — Systemic Pattern

**Severity:** High | **Confidence:** CONFIRMED | **Category:** Systemic enforcement gap
**Location:** Multiple — ANNEX_AL §AL-CORR, ANNEX_AC §AC1.5, ANNEX_AM §AM3, ANNEX_AH §AH6

Across multiple critical enforcement chains, the corpus specifies a trigger condition but not an enforcement owner, consequence, or timeline. The four most critical instances:

1. **Oracle suspension** (ANNEX_AL §AL-CORR): suspension trigger fires but no owner declares it, no timeline for resolution, no appeal for oracle operators, no audit artifact required.
2. **IOA overuse** (ANNEX_AC §AC1.5): decision "automatically void upon finding" — but who makes the finding, within what timeline, with what reversal mechanism?
3. **AM3 administrative hollowing trigger** (ANNEX_AM §AM3): "automatic constitutional review is triggered" — but the initiating body (CIP) may not exist during the founding window.
4. **AH6 post-activation audit** (ANNEX_AH §AH6): 90-day deadline with no enforcement mechanism; no consequence specified if deadline is missed.

**Fix:** For each: designate an explicit owner, add a response timeline, define the consequence of inaction (automatic escalation, published deficiency, or specific fallback). For AM3: designate Federated Ombuds Plenum as AM3 review initiator before CIP is constituted.

---

### FCR-016 through FCR-030

*These findings are summarized in the Finding Index above. Full analyses are in the source Phase 2 and Phase 3 reports. Key highlights:*

**FCR-016** (AM3 pre-CIP gap): During founding window, AM3 triggers fire but CIP—the body that initiates AM3 review—is not yet constituted. Federated Ombuds should be designated as interim AM3 initiator until CIP activation.

**FCR-017** (INV-LAUNCH-1 triple blockage): Beyond the token spec missing, FC-YT1/FC-YT2 are not registered in `/founding/commitments.md`, and Federated Ombuds cannot complete verification before being constituted. Three simultaneous conditions block clearance.

**FCR-018** (IOA operational/constitutional boundary undefined): The IOA prohibited actions list excludes constitutional matters, but the boundary between "operational decision" and "constitutional matter" is not drawn. A safety team confident in its mandate can expand "operational" scope indefinitely through slow definitional drift.

**FCR-019** (Oracle suspension ownership void): Suspension trigger fires but enforcement is a void. Designate RCS accreditation body as suspension owner; specify 14-day resolution timeline; require Ombuds notification and audit artifact.

**FCR-020** (CIP budget starved by sub-2% oracle understatement): The 2% divergence trigger publishes both figures but allows the higher to govern. Below 2% systematic understatement can slowly erode CIP funding. Lower materiality threshold to 0.5% for CIP budget.

**FCR-021** (AH6 audit deadline unenforceable): The 90-day deadline has no mechanism. Compound B simulation shows bureaucratic delay in Constitutional Queue can permanently avoid the audit. Add: if founding team has not constituted AH6 panel within 30 days of P-013 ACTIVE, Federated Ombuds constitutes it automatically.

**FCR-022** (Remedy selection criteria absent): ANNEX_L §L5 lists remedy types but no criteria determine which applies to which violation. Add priority-ordering table tying remedy type to harm class and violation severity. Extend §L6 remedy table to cover privacy, conscience, and housing discrimination.

**FCR-023** (No master emergency definition): Three incompatible trigger standards create an exploit surface. Add master emergency taxonomy: Supply Emergency (oracle-confirmed scarcity), Governance Emergency (deadlock/quorum failure), Infrastructure Emergency (smart contract pause).

**FCR-024** (Delivery infrastructure refusal lever): ANNEX_AT addresses production dependencies but not delivery infrastructure. A private company controlling delivery can use withholding as leverage. Add domestic infrastructure dependency clause to Article V Natural Monopoly Track with emergency compulsory operation pathway.

**FCR-025** (Constitutional Queue throughput starvation): No SLA on Constitutional Queue; enforcement minimum 1 slot per quarter. Add 45-day maximum dwell time before mandatory status publication; raise minimum enforcement slot to 2 per quarter.

**FCR-026** (AE2.3 deadlock scope freeze unlimited): Scope freeze has no maximum duration. Add 72-hour maximum for new-domain emergency activations during active deadlock. Define Level 5 structural review.

**FCR-027** (Keyholder removal mechanism self-defeating): Same gap as FCR-007 but from the rights/remedies perspective — a keyholder found acting in demonstrable self-interest cannot be removed through any mechanism that works. (See FCR-007.)

**FCR-028** (36-month identity data exploitation window): Three-year review cycle allows 36-month profile accumulation. "Product improvement" and "model training" not covered by secondary use prohibition. Change to annual review with quarterly publication; extend prohibition list.

**FCR-029** (AI vendor + Ombuds compound capture): A vendor funding Ombuds institutions without crossing the three-year lookback creates a mutual protection loop: vendor oracle methodology runs without independent audit; directional bias accumulates unchecked. Require vendor-funding conflict disclosure to Ombuds independence certification.

**FCR-030** (Coalition concentration limit absent): Three funders at 18/19/18% individually comply but control 55% collectively. Once founding basket definition is captured and P-004 locks it, the captured definition is permanently protected. Add combined 40% cap for any three funders.

---

## Medium Findings (Summary)

**FCR-031** — AH8 column transposition for P-056 through P-062 rows breaks consistent parsing. Normalize to table header format.

**FCR-032** — P-007, P-010, P-028 absent from Patch Log with no retirement notice. Add one-line retirement/merger notes.

**FCR-033** — T-016, T-017, T-018 detailed entries carry stale "Status: PROPOSED" for now-ACTIVE patches. Update status labels.

**FCR-034** — PRD- namespace (PRD-001, PRD-003, PRD-004, PRD-008, PRD-009) used in INVARIANTS.md and Patch Log with no discoverable registry. Create one-page PRD cross-reference table.

**FCR-035** — "Human dignity floor" undefined beyond physical CSM basket. Non-physical dignity (discrimination, surveillance, coercion) excluded from constitutional floor. Add definitional annotation in INVARIANTS.md.

**FCR-036** — Individual informed consent for pilot participation has no binding definition until P-059 (VPCP) is ACTIVE. Add P-059 to priority acceptance order before Cohort 1 enrollment.

**FCR-037** — 180-day timelock's Ombuds Integrity Report (60 days) has no fallback if Ombuds not yet constituted. Specify consequence of missed report.

**FCR-038** — T-010 appears active in Summary table and RENUMBERED in retirement table simultaneously. Remove from Summary table if retired.

**FCR-039** — CIP staggering rule (AM8.2, no more than 2 seats per calendar year) specifies no enforcement consequence. Add void-appointment consequence for violations; add fallback nominating authority triggered at 45 days of vacancy.

**FCR-040** — Investment channel external-assignment rules for auditor selection referenced in ANNEX_U §U3 but not defined. Functional auditor capture by auditee is possible while appearing externally assigned.

**FCR-041** — Corpus validator does not check heading anchors. P-004 protected term cross-references via section heading can be silently broken without validation failure.

**FCR-042** — "Public power" undefined. "Flow cannot buy public power" is a core invariant without an enforceable boundary.

**FCR-043** — ACL- namespace used as threat source for Critical PROPOSED founding-framework patches (P-059 Vulnerable Population Consent Protocol, P-060 Founding Team Composition Standard) with no formal registry discoverable.

**FCR-044** — Federated Ombuds jurisdiction over contractors (vs. operators) of identity and delivery systems is not specified (UNCERTAIN). ANNEX_AI does not address contractor-level data access explicitly.

**FCR-045** — P-004 definition drift protection applies only to explicitly listed protected terms. "Human dignity," "public power," and HC Article IV essential basket terms are not all explicitly P-004 protected.

**FCR-046** — Non-precedent rule prohibits formal P-014 citation but not use of its underlying logical argument. "Bootstrap paradox" reasoning can circumvent the prohibition without formally violating it.

**FCR-047** — "Corrigibility" used as P-035 design target but undefined in constitutional text; no operational definition, test, or trigger for non-corrigibility.

---

## Low Findings (Summary)

**FCR-048** — ANNEX_AU absent from AT→AV sequence without documentation. **FCR-049** — TR-07 (non-standard ID) in P-024 Related Threat column propagates to AH8 without Threat Register registration. **FCR-050** — TR- (founding threats, ANNEX_B) and T- (modern threats) are parallel registers with no cross-reference; add cross-reference header to ANNEX_B. **FCR-051** — P-013 heading appears twice in Patch_Log causing anchor slug collision. **FCR-052** — founding/order/ directory existence confirmed; complete file inventory not confirmed by direct read. **FCR-053** — "Active, not passive" consent definition in Founding_Legitimacy_Dossier should be elevated to INVARIANTS.md or a protected-terms document. **FCR-054** — PCRP "two independent sources" requirement lacks structural-independence standard; same institution's two divisions could satisfy it.

---

## Confirmed Structural Breakers

### Structural Breaker 1: CIP Removal Impossibility (FCR-001, FCR-005)

**Source text (CONFIRMED against primary sources):**
- ANNEX_AM §AM8.1: "The CIP consists of **7 members**"
- ANNEX_AM §AM8.4: "A CIP member may be removed only by a **6-of-7 vote of the Federated Ombuds Plenum**"
- ANNEX_AI §1.3: "Federation Plenum — the five sub-Ombuds together"
- FC-090: `OMBUDS_SUBCOUNT_MIN = 5`

The 6-of-7 threshold on a 5-member body is mathematically impossible. The removal mechanism is permanently inoperative. Combined with AM8.6 (CIP ratification required for all Tier 1 amendments), a captured CIP creates a recursive lock: the defect cannot be corrected without the body whose defect prevents correction participating in its own correction.

**The most likely origin:** The 6-of-7 threshold in AM8.4 was probably drafted when the Plenum was envisioned as 7 members (matching the CIP's 7 members) and was not updated when FC-090 locked the Plenum at 5. This is a drafting error, not an intentional design choice.

**Fix before CIP is constituted.** Once constituted, Fix A (unanimous 5-of-5) is still available. Once capture occurs, H-3 refounding may be the only path.

---

### Structural Breaker 2: §AZ2 Token Specification Missing (FCR-002, FCR-017)

**Source text (CONFIRMED against primary sources):**
- ANNEX_AK §AK8.1: "The technical specification for the token mechanism is defined in ANNEX_AZ §AZ2 **(to be drafted)** and is a pre-operational prerequisite under INV-LAUNCH-1."
- ANNEX_AZ §AZ2: Contains demurrage architecture symbol table. No token mechanism content.
- Hardening_Queue.md: "ANNEX_AZ §AZ2 — Tier 0 token mechanism specification | Proposed | ... Draft ANNEX_AZ §AZ2 specifying token generation, expiry, non-aggregation guarantees, and audit constraints before any Phase 3 pilot."

Three simultaneous INV-LAUNCH-1 blocking conditions: (1) token mechanism specification does not exist in the referenced location; (2) FC-YT1 and FC-YT2 are not registered in `/founding/commitments.md`; (3) Federated Ombuds has not been constituted and cannot provide required verification.

**The launch gate is currently unblockable.** Any pre-operational compliance review that checks ANNEX_AZ §AZ2 will find demurrage content and must either flag it as incomplete or risk falsely certifying the gate as met.

---

### Structural Breaker 3: Founding-Window Protection Gap (FCR-003, FCR-011)

**Source text (CONFIRMED against primary sources):**
All eight protections in ANNEX_AG and ANNEX_AF are confirmed PROPOSED. Acceptance_Protocol.md §Pre-Launch Blocking Gates table does not include ANNEX_AG or ANNEX_AF protections.

The founding window is the period of maximum vulnerability. ANNEX_AG and ANNEX_AF are listed in the Priority Acceptance Order (positions 2 and 5) but require FAP process to activate — and FAP itself requires P-013 to be ACTIVE, which in turn requires P-014 to be executed first. The bootstrapping sequence means these protections cannot be ACTIVE during the window they are designed to protect unless they are added as mandatory blocking gates.

**Minimum viable active protection set before launch:** AG4 (urgency bypass prohibition) and AG1 (pilot representativeness) should be added to the pre-launch blocking gate list. AG4 is arguably equal in weight to the Federated Ombuds seating gate.

---

### Structural Breaker 4: IOA Self-Declared Emergency (FCR-004, FCR-023)

**Source text (CONFIRMED against primary sources):**
ANNEX_AC §AC1.5 IOA auto-constitutes on "Level 3 or Level 4 emergency declaration." §AC1.3 caps sequential re-declarations at 2 consecutive quarters without independent audit but does not define the trigger standard for the initial declaration.

No objective standard exists anywhere in the corpus that defines what evidence is required for a Level 3 emergency declaration in the governance context. The PCRP (AC2.2) requires sentinel indicator + two-source corroboration + next oracle >24 hours away — a much higher bar. The governance emergency trigger (AC1.5) inherits no equivalent evidence standard.

The three incompatible emergency definitions create a forum-shopping surface: an actor can choose the trigger standard most favorable to their claimed emergency type, with no tribunal to resolve the classification dispute.

---

## Load-Bearing Safeguards

These safeguards must not be weakened in any correction process. They are structurally correct as designed.

### Safeguard 1: 7-of-9 Keyholder Hard-Lock (FC-110)

Nine geographically and institutionally distributed keyholders (no two in same locality of ≤5,000 persons; at most 2 per region of ≤500,000; no three sharing any single institution; subject-area diversity across four domains). Any Tier 1 amendment requires 7 signatures on the exact proposed new state (SHA-256 hash). A minority cannot amend; blocking requires only 3 captured holders. The asymmetry between blocking (easier, 3 holders) and amending (harder, 7 holders) is intentional — blocking is less dangerous than amending.

This safeguard resists single-body capture attacks, emergency pretext amendments, and coercion at scale. It does not resist hollowing without amendment (Simulation 1) or oracle capture (Simulation 3), which operate without triggering any Tier 1 amendment.

### Safeguard 2: 180-Day Amendment Timelock (FC-111)

After 7 signatures, the amendment enters a 180-day waiting period. During this window: the amendment is publicly visible on the drift chain; the Federated Ombuds produces a Tier 1 Integrity Report within 60 days; holders may revoke signatures (dropping below 7 aborts the amendment); counter-proposals may be submitted. The timelock is calibrated to one standard political-cycle length — long enough for civil society and opposition to react; short enough to not make amendment permanently impossible.

Do not shorten the timelock under pressure, including pressure framed as "urgency" or "emergency." The emergency exception does not apply to the timelock — IOA authority explicitly cannot touch Tier 1 invariants regardless of declaration level.

### Safeguard 3: Drift Chain (Append-Only Version History)

Every amendment is published on the drift chain as a public verifiable record. The prior version is archived. Any proposed amendment is visible to any observer. Silent modification is detectable at the next operational node startup or scheduled hash recheck. The drift chain is the primary defense against "quiet" invariant degradation. Its limitation (detection at startup, not in real time) means PROPOSED documents can be modified before operationalization without triggering a startup check — a gap exploited in Compound E.

### Safeguard 4: 5-Node BFT Federated Ombuds (FC-090/091)

Five sub-Ombuds nodes, geographically and institutionally dispersed, with 4-of-5 Plenum threshold for protocol-level decisions. Tolerates f=1 captured node. At f=2, the system cannot produce unauthorized affirmative determinations but can be paralyzed — a blocking-only failure mode not addressed in ANNEX_AI. This is a known gap (FCR-015 / Simulation 2 pattern), but the BFT design itself is correct and should not be weakened.

### Safeguard 5: CIP Concurrent Ratification Gate (AM8.6)

Even with 7 keyholder votes, a Tier 1 amendment is not effective without CIP ratification (5-of-7 CIP affirmative). This gate is a genuine additional protection — but it is currently invisible in the Constitution and amendment protocol texts (FCR-009), and the CIP removal mechanism is inoperative (FCR-001). Fix FCR-001 and FCR-009 without weakening the ratification requirement itself.

---

## Terminology Issues

| Term | Current Usage | Problem | Recommended Definition / Constraint |
|---|---|---|---|
| "Tier" (governance) | Amendment hierarchy: H-1/H-2/H-3 process tiers; Tier 1/2/3 invariant classes | Collides with access Tier and demurrage Tier | Rename to "Governance Tier"; add glossary entry |
| "Tier" (access) | ANNEX_AK §AK8: Tier 0 (pseudonymous) vs. Tier 1 (AED) identity | Collides with governance Tier 1 | Rename to "Access Tier 0 / Access Tier 1"; add glossary entry |
| "Tier" (demurrage) | ANNEX_AZ §AZ3: T1–T4 progressive rate bands | Collides with governance and access Tier | Already partially disambiguated with T1/T2/T3/T4 notation; formalize |
| "Emergency" | HC (7 uses), ANNEX_AC, ANNEX_AE, ANNEX_AH | Three incompatible trigger standards; no master definition; forum-shopping exploit | Add master emergency taxonomy: Supply Emergency, Governance Emergency, Infrastructure Emergency with explicit trigger tests and governing annexes |
| "Human dignity" | HC (15+ uses); INVARIANTS.md | Undefined beyond physical CSM basket; non-physical dignity unenforceable | Annotate INVARIANTS.md or add INV-013: "Human dignity floor includes at minimum: (a) freedom from coercion based on protected traits; (b) CSM basket access; (c) non-discriminatory identity system application; (d) procedural rights in ANNEX_AK §7" |
| "Founding basket" | ANNEX_AM §AM2 (70% floor) | Undefined; P-004 will protect a captured definition | Enumerate minimum categories in ANNEX_AM §AM2 matching HC Article IV essential basket |
| "Public power" | HC (6 uses); separation invariant | Undefined; "Flow cannot buy public power" unenforceable | Define enumerated boundary: governance roles, constitutional offices, policy-making authority, oversight appointments |
| "Qualified independent review body" | HC line 327 (keyholder removal) | No criteria; inoperable in both directions | Define: minimum composition floor, independence standard (no relationship to keyholder in N years), appointment source (Ombuds-nominated), challenge process |
| "Harm" | HC (enforcement trigger); AC1.5 | Undefined; each body sets its own threshold | Define minimum evidentiary threshold referencing Evidence Ladder level required to establish harm |
| "Corrigibility" | Patch_Log P-035; governance docs | Not in HC text; no operational definition | Either elevate to HC with operational criteria, or document as normative commitment with explicit disclaimer that it is not a structural enforcement mechanism |
| "Corroborated" | ANNEX_AC §AC2.2 (PCRP two-source) | Does not inherit structural-independence standard from oracle rules | Add: "two sources" requires sources with distinct institutional ownership and no shared data generation process |
| "Proceeding underway" | ANNEX_AH §AH5.1 | Undefined; a filed petition with no deadlines could satisfy it | Add maximum staleness period (e.g., 90 days without substantive advance constitutes abandoned) |

---

## Traceability Summary

| Threat ID | Patch ID | Clause | Annex | Acceptance Test | Status |
|---|---|---|---|---|---|
| T-001 | P-001 | HC Article I constitutional primacy | ANNEX_AB §AB2 | Pre-launch gate | Complete |
| T-002 | P-003, P-016 | HC Article II identity | ANNEX_AB §AB4, ANNEX_AK | Pre-launch gate | Complete |
| T-004 | P-002 | HC Article I accountability clause | ANNEX_AB §AB3 | Pre-launch gate | Complete |
| T-005 | P-005 | HC Article VI queue governance | ANNEX_AC §AC1 | Pre-launch gate | Complete |
| T-006 | P-006 | HC Article VI PCRP | ANNEX_AC §AC2 | Pre-launch gate | Complete |
| T-007 | P-004 | HC Article I definition drift | ANNEX_AB §AB5 | Pre-launch gate | Complete |
| T-008 | P-008, P-025, P-041 | HC Article VII oversight | ANNEX_AC §AC3, ANNEX_AI | Pre-launch gate | Complete |
| T-009 | P-009, P-024 | HC Article II attestation | ANNEX_AF, ANNEX_AS | Pre-launch gate | Complete |
| T-011 | P-011 | HC Article IV delivery | ANNEX_AD | Pre-launch gate | Complete |
| T-012–T-015 | P-012 | HC Article VI deadlock | ANNEX_AE §AE2.1–AE2.4 | Pre-launch gate | Complete |
| T-016 | P-013, P-034 | HC Article I FAP | ANNEX_AG, ANNEX_AV | Pre-launch gate | Complete; ANNEX_AG PROPOSED |
| T-017 | P-014, P-020 | HC Article I bootstrap | ANNEX_AH §AH1–AH7 | Pre-launch gate | Complete |
| T-018 | P-015, P-024 | HC Article II PCRP hardening | ANNEX_AP, ANNEX_AS | Pre-launch gate | Complete |
| T-019 | P-015, P-052 | HC Article II identity recovery | ANNEX_AP, ANNEX_AI §4.12 | Pre-launch gate | Complete |
| T-020, T-021 | P-017 | HC Article III oracle | ANNEX_AL | Pre-launch gate | Complete |
| T-022 | P-018 (PROPOSED), P-051 | HC Article VII anti-capture | ANNEX_AM | Partial — P-018 PROPOSED; P-051 partial coverage only | Partial (most complete failure mode underprotected) |
| T-023 | P-019 | HC Article IV supply chain | ANNEX_AN | Scale-up gate only | Partial |
| T-024 | P-022 | HC Article III oracle failure | ANNEX_AQ | Pre-launch gate | Complete |
| T-025 | P-023 | HC Article V demurrage | ANNEX_AR | Pre-launch gate | Complete |
| T-026, T-027 | P-026 | HC Article I founding order | founding/order/ | Pre-launch gate | UNCERTAIN — directory exists; file completeness not confirmed |
| T-028 | P-050 | HC Article IV essential sectors | ANNEX_AT §AT6.6 | Pre-launch gate | Complete |
| P-007, P-010, P-028 | — | — | — | — | Missing — no retirement notice |
| P-056 | PROPOSED | ANNEX_AK §AK8 → ANNEX_AZ §AZ2 | — | INV-LAUNCH-1 gate | Broken — §AZ2 contains wrong content |
| P-057–P-062 | PROPOSED | Pilot founding framework | Various governance docs | None active | Partial — ACL- threat sources unregistered |

---

## Emergency Powers Summary

Five distinct emergency-adjacent mechanisms identified: PCRP (supply sentinel), Shared Storehouse Activation (oracle-confirmed scarcity thresholds), Interim Operational Authority (governance emergency), Emergency Deadlock Resolution (procedural triple-block), Dignity-Only Continuity Mode (post-activation compromise), and Conservative Hold (oracle failure).

**Strongest:** Shared Storehouse activation uses objective numerical thresholds (days of supply, fill-rate) — the highest evidence-gating in the corpus. PCRP joint-activation with 1-hour notification and two-source corroboration is robust.

**Weakest:** IOA trigger has no objective standard (FCR-004). Deadlock scope freeze has no duration cap (FCR-026). AH6 audit deadline is unenforceable (FCR-021). The three incompatible emergency standards create forum-shopping (FCR-023).

**What emergency powers cannot do (correctly specified):** IOA prohibited actions list correctly excludes Tier 1/2 invariants and Essential Access rule changes. Emergency declarations cannot shortcut the 180-day timelock. HC §4 Shared Storehouse hard expiration rule is correctly specified.

**Primary risk:** The progression from declared emergency to IOA constitution to IOA operational authority to normalization. The corpus is strong at bounding IOA authority after constitution; it is weak at constraining the declaration that triggers constitution.

---

## AI Authority Boundary Summary

Twelve automated/algorithmic decision roles identified (AI-01 through AI-12). The single explicit AI advisory boundary statement — "Legitimacy cannot be automated" (HC §124) — appears only in the Preamble principles section and is not operationalized in Article-level rules or any annex.

**Strongest AI boundaries:** Oracle independence architecture (FC-030/031/032/033) is well-specified. PCRP cross-register timing monitor is appropriately advisory. Biometric liveness detection is explicitly optional (AI-11).

**Weakest AI boundaries:** No human review step between oracle consensus and Essential Access issuance or Shared Storehouse activation (P2-AI-001 confirmed). The directional bias gap in FC-032 (FCR-014) means oracle capture can occur undetected. Demurrage calculation is fully automated with no human review step specified (AI-03).

**Most dangerous gap:** Oracle quorum → Essential Access issuance → survival access without any defined human interposition point, despite HC §124 stating legitimacy cannot be automated. The corpus correctly identifies this as a tension but has not resolved it with a structural human review step.

---

## Governance Capture Summary

**Hardest bodies to capture:** Keyholder Council (7-of-9 distributed; requires coercion at scale). Federated Ombuds (5-node BFT; tolerates f=1; geographic/institutional dispersal).

**Most vulnerable capture targets:** The Adversarial Panel Member (single-actor bottleneck for all Tier-1-touching proposals; the nominating body for this panel member is a tier-zero capture target). The founding team during the pre-activation window (broad discretion; oversight bodies not yet operational). The CIP (once constituted, irremovable; CRP-confirmed Commissioner appointments susceptible to political pressure on the CRP).

**Most dangerous compound capture:** AI Vendor + Captured Audit Board (Compound A): vendor funds Ombuds institutions within the 3-year lookback for different sub-Ombuds nodes; Ombuds cannot reach 4-of-5 for independence certification; oracle directional bias accumulates unchecked for multiple annual cycles with a mutual protection loop between captured CIP and captured Ombuds.

**Most dangerous founding-window capture:** Donor Network + Definition Drift (Compound C): coalition of three funders controls 55% of founding capital; pushes narrow "founding basket" definition before P-004 locks it; future maintainer erodes adjacent undefined terms using AH8 incompleteness as cover. Requires no formal constitutional violation at either stage.

---

## Rights, Remedies, and Enforcement Summary

**15 rights/protections inventoried.** Of these:
- **5 have constituted enforcement owners** (reporter protection via Federated Ombuds, appeal path via CRP, essential access review via service ombuds-adjacent mechanisms)
- **7 have UNCERTAIN enforcement owners** (freedom of conscience, privacy, housing discrimination, community alert pathway, exit rights, instrument separation, keyholder removal)
- **3 have known enforcement gaps** (CIP removal — mathematically impossible; remedy selection — no criteria; demurrage safe harbor — conflicting amounts)

**Most dangerous rights gap:** CIP member removal (R-14) — enforcement mechanism structurally inoperative (FCR-001). No remedy exists.

**Systemic gap:** ANNEX_L §L5 lists remedy types (stay, reclassification, nullification, rollback, compensatory continuity, targeted sanction) but provides no criteria for which applies to which violation. ANNEX_L §L6 provides financial remedies for Essential Access and identity disputes but nothing for privacy, conscience, or housing discrimination.

---

## Acceptance Protocol Testability Summary

The Phase 3 acceptance testability audit (Report 10) found: **the entire substantive anti-gaming layer of the acceptance protocol (ANNEX_AG) is PROPOSED, not ACTIVE.** The pre-launch blocking gates cover infrastructure (Ombuds seating, oracle methodology registry, founding commitments) but not the behavioral integrity of the evidence used to activate subsequent patches.

**Tests that should exist but do not:**
- Pilot representativeness check (AG1 not in blocking gates)
- CIP removal threshold mathematical consistency check (no gate verifies that AM8.4's threshold is achievable given Plenum size)
- AH8 completeness check (no gate verifies that the master linkage table covers all ACTIVE patches)
- Pre-signature public notice verification (no gate checks that the amendment protocol's public notice requirement has been met)

**Strongest existing gate:** Two-key adversarial attestation (ANNEX_AV) for Tier-1-touching proposals — binary, attestation-based, not self-certifiable.

**Gameable existing gate:** AH2.2 "structural vs. procedural objection" classification — founding coalition that drafts P-014 vaguely can classify all objections as procedural and proceed without extending the 60-day challenge window.

---

## Adversarial Simulation Summary

17 total simulations (12 individual + 5 compound). 17 of 17 found DEFECT or partial DEFECT status. No simulation found a complete safeguard hold.

| Simulation | Actor | Result | Key Failure |
|---|---|---|---|
| 1 | Corrupt Elected Official | DEFECT | CIP vacancy starvation; staggering rule has no enforcement |
| 2 | Captured Oversight Board | DEFECT | f=2 Ombuds capture paralyzes decisions without authorizing violations |
| 3 | Dominant AI Vendor | DEFECT | FC-032 misses directional bias; vendor controls 3-of-5 oracle nodes |
| 4 | Hostile Bureaucrat | DEFECT | Constitutional Queue has no SLA; enforcement slots at 1 per quarter |
| 5 | Emergency Executive | DEFECT | P-014 principle-vs-precedent gap; AH5.1 "proceeding underway" undefined |
| 6 | Wealthy Donor Network | DEFECT | "Founding basket" undefined; coalition concentration unaddressed; P-004 protects captured definition |
| 7 | Foreign Adversary | UNCERTAIN | Standards body infiltration below detection threshold for sophisticated actor |
| 8 | Overreaching Safety Team | DEFECT | "Harm" and "safety" undefined; scope creep through emergency threshold expansion |
| 9 | Activist Faction | DEFECT | Deadlock scope freeze has no time limit; multi-wave crisis blocked |
| 10 | Private Infrastructure Provider | DEFECT | Delivery infrastructure dependency not in strategic floor architecture |
| 11 | Data Broker | DEFECT | 36-month window; prohibited list incomplete; contractor jurisdiction gap |
| 12 | Future Maintainer | DEFECT | Undefined terms not P-004 protected; AH8 incomplete; validator misses anchors |
| C-A | AI Vendor + Captured Audit Board | DEFECT | Compound mutual protection loop; oracle bias runs unchecked for multiple cycles |
| C-B | Emergency Executive + Bureaucratic Delay | DEFECT | AH6 audit permanently avoidable; no enforcement for missed 90-day deadline |
| C-C | Donor Network + Definition Drift | DEFECT | Two-stage attack stays below detection threshold at each stage individually |
| C-D | Data Broker + Infrastructure Provider | DEFECT | Article VII reporter protection covers standing but not physical delivery |
| C-E | Future Maintainer + Vague Terminology | DEFECT | Interpretive practice erosion invisible to drift chain |

**Patterns:** (1) The founding window is the highest capture moment — every compound simulation except C-D exploits it. (2) The CIP removal impossibility is the single most dangerous drafting defect — it appears in Simulations 1, 2, and Compound A. (3) AH8 incompleteness amplifies 5 of 17 simulations. (4) Detection without enforcement is a systemic architectural gap — the corpus is excellent at triggers but weak on consequences.

---

## Cross-Corpus Structural Risks

These risks are only visible when reading across multiple documents simultaneously.

**Cross-Risk 1 — Recursive lock chain:** FCR-001 (CIP removal impossible) + FCR-005 (CIP blocks its own fix) + FCR-003 (founding-window protections inactive) + FCR-009 (CIP ratification invisible in Constitution). These four findings together mean: during the founding window, founding-window protections are inactive; once the CIP is constituted, it may be captured; once captured, it is irremovable; and it can block every Tier 1 amendment including the amendment that would fix its removal mechanism.

**Cross-Risk 2 — Token spec + launch gate + Ombuds constitution:** FCR-002 (§AZ2 missing) + FCR-017 (FC-YT1/FC-YT2 not in commitments.md) + ANNEX_AI §2.1 (Ombuds pre-launch gate). Three simultaneous launch blocking conditions that are currently unresolved. The system cannot legally proceed to real-persons enrollment until all three are cleared, and clearing the Ombuds gate requires the Ombuds to be constituted, which itself requires the other pre-launch gates to clear.

**Cross-Risk 3 — Oracle capture propagation:** FCR-014 (directional bias not detected) + FCR-020 (CIP budget oracle-dependent) + FCR-029 (AI vendor + Ombuds compound). Oracle capture below the 2% CIP budget divergence threshold starves the CIP without triggering disclosure. A captured CIP (FCR-001) cannot be removed. A captured Ombuds (f=2) cannot certify oracle independence. The three failure modes reinforce each other in a self-sustaining loop.

**Cross-Risk 4 — Definition drift at origin + P-004 protection of captured definition:** FCR-013 (founding basket undefined) + FCR-045 (P-004 protection limited to explicitly named terms) + FCR-030 (coalition concentration). If the founding basket is captured during the pre-activation window, P-004 will lock the captured definition permanently. The definition drift protection that is supposed to prevent erosion over time will instead preserve a founding-period capture indefinitely.

**Cross-Risk 5 — Emergency standard shopping + IOA operational scope expansion:** FCR-004 (IOA trigger undefined) + FCR-023 (three incompatible emergency standards) + FCR-018 (operational/constitutional boundary undefined) + FCR-026 (scope freeze unlimited). An actor can select the most permissive trigger standard, constitute the IOA, and then expand "operational" scope during an unlimited deadlock freeze.

---

## Recommended Next Actions

### Fix Before Expansion (P0 — Pre-Operational Blocking)

These must be resolved before the system enrolls real persons. Until resolved, the system cannot legally proceed and the INV-LAUNCH-1 gate cannot be cleared.

1. **Draft the Tier 0 token mechanism specification** (FCR-002). Write a new section or new annex containing the technical specification required by ANNEX_AK §AK8.1 (token generation, non-transferability, session expiry, non-aggregation guarantees, audit constraints). Update ANNEX_AK §AK8.1 reference. Add "token specification complete and independently verified" to pre-launch blocking gate list.

2. **Register FC-YT1 and FC-YT2 in /founding/commitments.md** (FCR-017). Formal binding rows with provisional values (3 CSM failures per 10,000 per 30 days for FC-YT1; 90-day reserve for FC-YT2). Necessary pre-condition for INV-LAUNCH-1 clearance condition (a).

3. **Correct ANNEX_AM §AM8.4 CIP removal threshold** (FCR-001). Change "6-of-7 vote of the Federated Ombuds Plenum" to "5-of-5 (unanimous) vote of the Federated Ombuds Plenum" (Fix A). Do this before any CIP is constituted.

4. **Add AG4 and AG1 as mandatory pre-launch blocking gates** (FCR-003, FCR-011). In `docs/constitution/Acceptance_Protocol.md` §Pre-Launch Blocking Gates: "Anti-gaming Tier 2 reclassification (ANNEX_AG §AG4) operative" and "Pilot representativeness standard (ANNEX_AG §AG1) assessment published."

5. **Constitute the Federated Ombuds** (FCR-002, FCR-017). Operational prerequisite for INV-LAUNCH-1 clearance condition (b) and for Tier 1 amendment integrity report capability.

### Fix Before Public Release (P1 — Structural Integrity)

These findings create significant exploitation surfaces that should be closed before public or regulatory scrutiny.

6. **Add ANNEX_J governing clause on demurrage safe harbor** (FCR-006). ANNEX_J §J2 must explicitly state it controls on household savings floor duration, superseding the 6-month figure in HC §VIII. Update Constitution figure in next revision.

7. **Add CIP concurrent ratification reference to amendment_protocol.md** (FCR-009). Insert at end of §3: Tier 1 amendments not effective without CIP ratification under ANNEX_AM §AM8.6.

8. **Add pre-signature public notice period** (FCR-012). Tier 1 amendment proposals must be published to amendment log and Ombuds notified at least 30 days before keyholder signing may begin.

9. **Complete AH8 master linkage table** (FCR-010). Add all ACTIVE patches (P-016, P-021, P-024, P-025, P-029 through P-049). This is the single highest-leverage structural repair against future maintainer and compound exploit attacks.

10. **Define founding basket in ANNEX_AM §AM2** (FCR-013). Enumerate minimum categories from HC Article IV. Require founding basket publication at opening of AH2 period. Add coalition concentration limit (any three funders combined ≤ 40%) to Founding Capital Framework.

11. **Add objective Level 3/4 emergency trigger standard** (FCR-004). Define non-discretionary evidence requirement (oracle-corroborated, multi-source, Federated Ombuds confirmation) before IOA can be constituted. Add master emergency taxonomy.

12. **Designate Federated Ombuds as AM3 interim review initiator** (FCR-016). Before CIP constitution, Federated Ombuds Plenum (4-of-5) initiates any AM3 constitutional review. Add to §AM3 or §AM8.7.

13. **Add oracle directional bias test** (FCR-014). Require adversarial seat to be nominated by Federated Ombuds, not by oracle cohort.

14. **Assign oracle suspension enforcement ownership** (FCR-019). Designate RCS accreditation body as owner; specify 14-day resolution timeline; require Ombuds notification and audit artifact.

15. **Add AH6 automatic panel constitution fallback** (FCR-021). If founding team has not constituted AH6 panel within 30 days of P-013 ACTIVE, Federated Ombuds constitutes it automatically. Specify consequence of missed 90-day deadline.

16. **Add ANNEX_J governing clause; extend §L6 remedy table** (FCR-022). Add financial remedy types for privacy, conscience, and housing discrimination violations.

17. **Separate identity verification and delivery infrastructure contracts** (FCR-024). No single contractor may hold both for the same population. Extend Article V Natural Monopoly Track to delivery infrastructure. Add emergency compulsory operation pathway.

18. **Add Constitutional Queue maximum dwell time** (FCR-025). 45-day maximum before mandatory status publication. Raise minimum enforcement slot from 1 to 2 per quarter.

19. **Prioritize P-059 (VPCP) in Acceptance Protocol** (FCR-036). Add before Cohort 1 enrollment. Individual consent for pilot participants must have a binding definition before any pilot enrollment occurs.

### Improve Later (P2 — Operational Hardening)

20. **Lower CIP budget oracle divergence threshold** (FCR-020). Reduce from 2% to 0.5% for CIP budget purposes; require quarterly comparison.
21. **Add deadlock scope freeze duration limit** (FCR-026). 72-hour maximum for new-domain activations during active deadlock. Define Level 5 structural review.
22. **Create PRD- cross-reference table** (FCR-034). Map PRD-001, PRD-003, PRD-004, PRD-008, PRD-009 to corresponding T-IDs or P-IDs.
23. **Annotate INVARIANTS.md with non-physical dignity components** (FCR-035). INV-001 extension or new INV-013 naming non-physical dignity floor components.
24. **Extend P-004 to HC Article IV essential basket terms** (FCR-045). All terms in the essential basket definition should have explicit P-004 protection.
25. **Add geographic dispersal requirement for standards body provenance** (FCR-014 related). Not just oracle node siting.

### Optional Refinements (P3 — Traceability and Governance Hygiene)

26. **Add "Tier" namespace disambiguation** (FCR-008). Governance Tier, Access Tier, Demurrage Tier formally distinguished across corpus.
27. **Document or retire P-007, P-010, P-028** (FCR-032). One-line retirement/merger notices in Patch Log.
28. **Update stale threat register status labels** (FCR-033). T-016, T-017, T-018 detailed entries.
29. **Normalize AH8 column order for PROPOSED entries** (FCR-031).
30. **Add cross-reference header in ANNEX_B** (FCR-050) linking TR- register to modern T- register.
31. **Fix P-013 duplicate heading in Patch_Log** (FCR-051).
32. **Define "corrigibility" operationally** (FCR-047). Either elevate to HC with test criteria or explicitly document as normative commitment with disclaimer.

---

## Self-Review

### Scores

| Dimension | Score | Rationale |
|---|---|---|
| **Coverage** | 5 | All 15 source audit reports read. All four structural breakers verified against primary source text in Phase 3. All 17 adversarial simulations covered. All Phase 1 traceability failures traced forward to this report. Minor gaps: ANNEX_AK §AK8.4 not read directly; founding/order/ file completeness UNCERTAIN; PRD- origin document not locatable. |
| **Specificity** | 5 | Every Critical and High finding cites specific file, section, and confirmed text. Fix shapes are concrete with file and section references. Inferences are explicitly labeled as INFERRED. UNCERTAIN items are marked throughout. |
| **Evidence** | 5 | Phase 3 primary source verification confirmed all Critical findings. CIP removal impossibility confirmed by direct quote of §AM8.4 and §AI1.3. §AZ2 mismatch confirmed by direct read and "(to be drafted)" embedded text. Founding-window gap confirmed by activation status table against Acceptance Protocol gate list. No finding is invented; UNCERTAIN is used appropriately. |
| **Adversarial Depth** | 4 | All 17 simulations synthesized. Cross-corpus compound risks identified (5 cross-risk findings). Recursive lock-in cascade (Cross-Risk 1) is the strongest adversarial insight in this report. Limitation: compound attack chains referenced from Phase 2 rather than independently re-simulated at Phase 3 depth. Oracle aggregation mechanism remains UNCERTAIN. |
| **Actionability** | 5 | 32 recommended actions with priorities, file/section targets, and fix shapes. Human-judgment questions explicitly separated (Q1–Q5 in Report 14). P0/P1/P2/P3 priority tiers keyed to operational phase. Risk of fixing assessed for each Critical finding. |
| **Overall** | 5 | This report synthesizes 127 individual findings from 15 source reports (57 Phase 1 + 70 Phase 2) into 54 cross-phase FCR findings, with 5 cross-corpus structural risks not visible in any single prior report. The recursive lock-chain analysis (Cross-Risk 1) and the triple INV-LAUNCH-1 blockage analysis (Cross-Risk 2) are original synthesis contributions not present in any Phase 1/2/3 source report. |

### Self-Review Questions

**Q1: What parts may be under-reviewed?**

Three areas: (1) ANNEX_AK §AK8.4 (INV-001 relationship to Tier 0 token mechanism) was not read directly; if it creates additional enforcement dependencies, those may not be captured. (2) The oracle aggregation mechanism (how oracle quorum determines the median or consensus figure used for EA issuance) is described as UNCERTAIN in Phase 2 and remains so here — the corpus does not specify the exact aggregation method. (3) The founding/order/ directory: five files exist, but whether all six files listed in P-026 are complete was not confirmed by direct read.

**Q2: What are the strongest findings in this report?**

FCR-001 (CIP removal impossibility) and FCR-002 (§AZ2 mismatch) are mathematically and textually unambiguous. FCR-001 requires no judgment — the numbers are incompatible. FCR-002 is confirmed by the "(to be drafted)" language embedded in the live source text. FCR-005 (recursive lock) is the strongest adversarial inference — clearly labeled as partially INFERRED.

**Q3: What is weakest or most speculative?**

FCR-005's H-3 inference: the claim that a captured CIP creates a recursive lock that may require H-3 refounding rests on structural logic from §AM8.6 and amendment_protocol.md §6, which were not quoted directly in this synthesis. The inference is plausible but should be confirmed by a direct read of amendment_protocol.md §6 before relying on it for governance decisions.

FCR-044 (contractor jurisdiction gap) remains UNCERTAIN because ANNEX_AI does not explicitly address contractor-level authority — this is a genuine ambiguity, not a confirmed gap.

**Q4: What would another auditor challenge?**

Another auditor would likely challenge: (a) the Fix A recommendation for FCR-001 (unanimous 5-of-5 Plenum vote is harder than the intended 6-of-7 ratio — Fix B, correcting Plenum size to 7, preserves the ratio but requires a Tier 1 amendment); (b) the P0 classification of FCR-003 — one could argue the Federated Ombuds seating gate is the primary founding-window protection and ANNEX_AG is secondary; (c) the Critical overall rating — some auditors would argue that because the CIP is not yet constituted and the founding window has not opened, the recursive lock is theoretical rather than realized, warranting a High rather than Critical rating. This report maintains Critical because the defects exist in the live corpus text that will govern once the CIP is constituted, and fixing them requires time and amendment processes that may not be available once capture occurs.

**Q5: What should be re-audited before source changes are made?**

Before changing §AM8.4: re-read all annexes that reference "Federated Ombuds Plenum" in any CIP governance context to confirm no other removal pathway exists that would be affected by the fix.

Before declaring any INV-LAUNCH-1 condition cleared: re-read INV-LAUNCH-1 in full and confirm the exact gate conditions, then verify each is met in the canonical locations (not inferred from adjacent text).

Before adding AG4 and AG1 as blocking gates: re-read ANNEX_AG's dependency chain to confirm these sections can be activated without first activating other PROPOSED patches that have their own unmet prerequisites.

Before making any change to the Tier 1 amendment procedure: re-read amendment_protocol.md in full to understand how the proposed changes interact with the existing step sequence.

---

*This report is an adversarial audit product covering three phases of the Humane Constitution governance corpus audit. It characterizes vulnerabilities, not intentions. No finding implies bad faith by the corpus authors. The CIP removal impossibility is most likely a drafting error (intended body was 7 members, or intended threshold was 4-of-5 Plenum); the §AZ2 mismatch is most likely a content routing error where demurrage architecture was drafted to §AZ2 before the token mechanism specification was placed there. Both are fixable. The founding-window gap is a structural consequence of the phased activation approach — an acceptable design tradeoff if the blocking gate list is supplemented as recommended before any pilot enrollment.*

*All findings are read-only. No source corpus files were modified in producing this report.*

*Auditor: adversarial synthesis agent (claude-sonnet-4-6). 2026-05-15.*
