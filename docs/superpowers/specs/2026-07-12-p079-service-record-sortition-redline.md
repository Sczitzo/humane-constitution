# P-079 — Service Record Retirement: Sortition for Rotating Public Roles

**Status: PROPOSED. `modifies_tier1=True`. FAP intake: HELD OPEN — blocked at AV1/AV3 (no standing adversarial panel member is seated; P-013 is not ACTIVE). This document is the complete intake package, prepared to the gate it cannot yet pass.**

*Origin: [Minimum Viable Constitution Audit](../../governance/Minimum_Viable_Constitution_Audit.md), Finding 3 ("Service Record → sortition: clear win"). Scope: Service Record only. Voice is untouched by this proposal — the audit found cutting Voice is not a clear win (N-4 lobbying regression) and it is expressly out of scope here.*

---

## In plain language

Today, the design keeps a record of each person's public service, and that record helps decide who is ready to serve on juries, panels, and rotating oversight roles. The record comes with a lot of protective machinery — rules to stop it becoming a social credit score, rules about how fast it fades, limits so no profession dominates, detectors for people gaming the hardship rules.

This proposal asks: **what if we didn't keep the record at all?** Instead, fill rotating public roles by a fair lottery among everyone who meets a short, public, hard-to-change list of basic qualifications (like being an adult member of the community). A lottery cannot become a score. It cannot be hoarded, inherited, traded, or turned into a ladder of status. Most of the machinery that protects the Service Record exists to prevent things a lottery simply cannot do — so the machinery, and the dangers it guards, retire together.

The catch, honestly stated: whoever writes the qualification list for the lottery becomes the new gatekeeper, and people seated by lottery serve without the accountability of re-selection. Those are real new risks, smaller than the ones removed, and this proposal names them as new threat entries with their own defenses.

This proposal **cannot be adopted yet even on paper**: because it changes core protected promises, the project's own rules require an independent adversarial reviewer to check it first — and that reviewer seat does not exist until a legitimate founding process creates it. So this package waits at the gate, in public, complete. That is the process working, not failing.

---

## 1. What is proposed

1. **Retire the Service Record instrument.** The ledger, its decay mechanics (normal and grace rates), sector ceilings, attestation-collusion detection, and patronage-pooling rules are removed from the design.
2. **Replace with sortition:** rotating public-service roles (juries, review panels, oversight bodies) are filled by random draw from the pool of eligible persons. Eligibility criteria are minimal, published, and Tier-1 protected against expansion (see §5, draft threat A).
3. **Retain by reassignment:** role-specific competence needs (e.g., a technical review panel) are met by role-scoped, published, appealable qualification criteria — not by accumulated service history.
4. **Retire dependent machinery:** P-009 (grace exploitation controls) becomes moot; the Service Record Misuse Evidence Test Package is retired; T-008/T-009 are re-dispositioned (see §6).

The corpus already contains the seed of this design: INV-006 already specifies sortition-body recusal and backfill-from-the-draw mechanics for parameter-setting bodies. This proposal generalizes what the invariants already contemplate.

## 2. Framework-first intake statement (P-073)

**This is a deletion, and the simplicity presumption applies:** "the burden of proof rests on addition, never on deletion... a proposal that consolidates or deletes mechanisms while preserving the protected function may not be rejected solely because it reduces institutional count."

Both limits on the presumption are addressed:

**(a) Independence count.** Service Record is not an independent check on any actor or body — it is an eligibility input. Its removal merges no detection, audit, attestation, or appeal function. No actor gains reduced oversight. The rotating bodies it feeds continue to exist and continue to be independently audited; only the *selection method* into them changes.

**(b) Every protected person retains an equivalent or better path.** Function-by-function:

| Service Record function | Who it protects | Path under sortition | Equivalent or better? |
|---|---|---|---|
| Eligibility for rotating public roles | Every citizen's access to civic participation | Random draw from the full eligible pool | **Better**: participation probability is equalized; today's design admits accumulation advantages that favor those with time and standing to serve visibly |
| Protection of unpaid carers, the sick, the poor from civic penalty | The burdened and invisible | Nothing to accumulate means nothing to lack; the carer's draw probability equals anyone's | **Better**: the grace machinery existed to patch a harm the ledger itself created |
| Readiness signal for role competence | The public served by the role | Role-scoped published qualification criteria, appealable on the appeal spine (ANNEX_L §L7) | **Equivalent**, and narrower: criteria attach to the role, not the person's history |
| Recognition of service | The person who served | Out of scope for a governance instrument; recognition without rank was always the constraint (INV-003) | Equivalent: nothing that mattered constitutionally is lost |

**What this proposal deletes** (the standing intake question answered): the Service Record ledger and state machine; slow-decay and grace-decay parameters; the 20% sector ceiling and its quarterly audit; attestation-collusion detection; the Service Record Misuse Evidence Test Package; the SR lane of the monitoring/data-retention footprint (the most social-graph-like personal data in the design).

## 3. Tier 1 assessment (`modifies_tier1=True`)

This proposal, if adopted, would modify the following Tier 1 invariants — this is precisely why it cannot proceed without the AV1 attestation:

- **INV-002** (Instrument Non-Convertibility): the five-instrument list becomes four; all SR conversion-prohibition clauses retire.
- **INV-003** (Human Worth Is Not Measured): the statement's subject ("The Service Record records service history and eligibility; it does not score personhood") is removed; the invariant itself is *strengthened in substance* — under sortition there is no service ledger from which any worth-proxy could ever be derived — but its text changes, and a text change to a Tier 1 invariant is a Tier 1 modification regardless of direction.
- **INV-001, INV-004, INV-006**: conforming edits where Service Record is named.

**Gate consequence (AV1/AV3):** no adversarial panel member is seated; P-013 is not ACTIVE; therefore this proposal may not enter the FAP queue. Per AV3, "the queue position is held open indefinitely." No FAP reviewer may waive this (AV2). This package is published so the eventual attestation assesses exactly this text (AV4: the thing attested must be the thing adopted).

## 4. Proposed redline (quoted — no protected file is modified by this proposal)

**Humane_Constitution.md, Article VI** — clauses of the form "Service Record helps decide readiness for rotating public service roles... earned through verified stewardship and service readiness" are replaced by:

> Rotating public-service roles — juries, review panels, oversight bodies — are filled by public lottery from the pool of eligible persons. Eligibility criteria are minimal, published in advance, identical for all persons, and protected against expansion at Tier 1. Role-specific competence requirements attach to the role, are published, and are appealable. No record of past service, contribution, standing, or reputation may enter the selection.

**INVARIANTS.md, INV-002** — the instrument list becomes "Flow, Essential Access, Voice, and Shared Storehouse"; SR conversion clauses retire.

**INVARIANTS.md, INV-003** — replacement statement:

> No instrument, record, score, or system output may represent a quantitative assessment of a person's inherent worth, social value, or moral standing. Selection for public roles is by lottery among the eligible; no ledger of service, contribution, or standing exists from which any such assessment could be derived, and none may be created.

**Retired annex material:** the Service Record state machine in SPECIFICATIONS (Section 4.3), the ANNEX_Z Service Record clauses, and the Service Record Misuse Evidence Test Package (retired, not deleted — marked superseded with pointer here).

## 5. New threats created (draft register entries; formal registration accompanies intake)

**Draft threat A — Sortition Qualification-Filter Capture** *(takes a free T-number at intake)*. *Severity: High.* Whoever controls the eligibility criteria controls who can be drawn — the gatekeeping the lottery was meant to eliminate reappears one level up. **Mitigation design:** criteria are Tier-1 protected against expansion (adding a criterion is a Tier 1 amendment; removing one is Tier 2); criteria must be facially universal (age, membership, conflict-recusal only); any criterion whose published disparate impact on a protected or vulnerable group exceeds the AED-style thresholds is void; challenges run on the appeal spine (ANNEX_L §L7).

**Draft threat B — Seated-Member Capture** *(takes a free T-number at intake)*. *Severity: Med-High.* Influencing a small, temporary, non-re-selectable panel is cheap; members face no re-selection accountability. **Mitigation design:** draws are larger than the seat count with random backfill (the INV-006 mechanism, generalized); deliberation records are published; per-decision justification applies (the [routing-capture finding](../../simulations/CRUS_Simulation_Packet_001.md): per-decision records, not concentration statistics, carry detection at small n); bribery attempts route to the same consequence-based enforcement the T-001 wall uses — detection-plus-penalty, which simulation shows outperforms surveillance.

**Re-dispositions if adopted:** T-009 (Grace Exploitation Loop) — mechanism removed, threat retired with residual-risk note. T-008 (Bureaucratic Elite Formation) — Service Record path removed; residual narrows to administrative staff and transfers partially to draft threat B.

## 6. Christ-centered review (required for any proposed change to `docs/constitution/`)

- **Christ-centered alignment:** The lottery embodies the equality of persons before God more faithfully than any earned record: "the last will be first" (Matt 20:16) resists every ladder of accumulated standing, and James 2:1–9 warns against seating by visible merit. Casting lots for public roles has direct scriptural precedent (Acts 1:26). Service loses nothing of its dignity — it only stops purchasing position, which is what Jesus asked of it (Mark 10:42–45: "whoever would be great among you must be your servant" — service as gift, not as credential).
- **Babel-risk warning:** The removed ledger was itself the Babel surface — a tower of recorded standing. The residual Babel risk migrates to the qualification list (draft threat A): a captured criteria list is a quiet re-erection of gatekeeping, and pride can operate a lottery's entry gate as effectively as a ledger. The Tier-1 lock on criteria expansion is the named defense; vigilance, not the mechanism, is the real one.
- **Human dignity test:** Strengthened. The carer, the sick, the poor, and the outcast hold exactly the same draw probability as the prominent — dignity is no longer mediated by visible, recordable service. One caution: sortition asks service of people who did not seek it; refusal must carry no penalty (conforming clause included in the redline), or the lottery becomes conscription.
- **Revision proposal:** Include the no-penalty-for-declining clause explicitly; require that qualification criteria be readable in plain language by design (the criteria list is the whole attack surface — it must be short enough for anyone to audit).
- **Fruit test:** Expected fruit: broader participation across class and temperament; the end of civic-status accumulation; less personal data held by the system; a design ordinary people can verify with their own eyes (a public draw). Bad fruit to watch for: seated members overwhelmed by roles they did not seek (support and compensation rules are the answer, not selection filters); qualification-list politics replacing service-record politics.

This review assesses consistency with Jesus' teachings; it does not claim divine endorsement.

## 7. Evidence gates required before this patch could reach ACTIVE (if intake ever opens)

1. Adversarial-panel attestation (AV1) against this exact text.
2. Sortition drill evidence: at least one full draw-seat-serve-rotate cycle in a pilot body, with published disaggregated participation data (the AG1 subgroup rule: the least-protected subgroup's participation, not the aggregate, is the measure).
3. Qualification-criteria red team: an adversarial attempt to capture the criteria list, documented against draft threat A mitigations.
4. Declination-rate and burden evidence: the no-penalty rule must be shown real (people who decline suffer nothing).
5. Re-disposition of T-008/T-009 and retirement of the SR machinery, each with residual-risk notes in the Threat Register and Claims Register.

## 8. Intake record

Submitted to the FAP queue 2026-07-12 with `modifies_tier1=True`. **Held at AV1/AV3: no standing adversarial panel member exists to attest; P-013 is not ACTIVE.** No technical review has begun; per AV1 no invariant analysis by the FAP reviewer is performed on an unattested proposal. The queue position is held open indefinitely. This is the protocol operating as designed: a proposal that rewrites Tier 1 promises waits for the independent check, no matter how good its paper case looks — including this one.
