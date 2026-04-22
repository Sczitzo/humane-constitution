# Annex AS — Attestation-at-Risk Stake Mechanism

**Status: ACTIVE — founding commitments bound (FC-080, FC-081, FC-082) — Proposal 9 close-out, 2026-04-18**
**Governs:** contribution attestation, hardship attestation, civic identity attestation, and any Service Record or Voice allocation that depends on third-party verification.
**Related:** Article VI civic-layer rules for Service Record; Annex AF (P-009 Grace Exploitation patches, hardship attestation); Humane Constitution Article VI multi-attestation and random-audit clauses; Threat Register T-018 (PCRP False-Trigger Exhaustion), TR-07 (Contribution fraud / attestation rings).

---

## Purpose

Attestation is the infrastructure by which individuals without institutional standing can still produce legible evidence of contribution, hardship, identity, or need. Without attestation, the protocol excludes the undocumented, the informally-employed, and the isolated — the people the protocol most needs to reach. With attestation, the protocol exposes itself to a specific failure mode: **costless false attestation**.

The existing constitutional mitigations (multi-attestation, random audits, verifier reputation scoring, collusion-graph analytics) are necessary but not sufficient. They raise the probability of detection after a false attestation is made. They do not change the calculation *before* the attestation is made. An attestor with no stake in the outcome has no reason to refuse a favor, a reciprocal arrangement, or a sympathetic lie — until after they are caught, at which point reputational loss is a lagging, socially-mediated signal that can be absorbed by thick networks.

This annex adds **skin-in-the-game**. An attestor's Service Record (or Voice, for civic attestations) is placed at measurable risk when they attest, proportional to the claim size. False attestations — adjudicated through the Ombuds process or the Enforcement Panel — slash the stake. Slashed stake is redistributed to whistleblowers and to restitution for those harmed by the false claim. Honest attestations are returned with time; skilled attestors accrue reputation along with their returned stake.

The mechanism is calibrated via three Founding Commitments (FC-080, FC-081, FC-082) binding in `/founding/commitments.md`.

---

## Section 1 — Scope: What Counts as an Attestation

**Attestation (protected term):** a statement by an identified civic participant (the *attestor*) about another participant (the *subject*) that is entered into the Service Record to support a claim the subject is making.

Covered attestation classes:

| Class | Subject claim | Typical attestor | Example |
| :--- | :--- | :--- | :--- |
| **Contribution attestation** | Stewardship or civic work that should accrue Service Record | Co-participant, recipient-of-service, or supervising civic body | "I confirm Subject X staffed the distribution site on dates Y–Z as the schedule records show." |
| **Hardship attestation** | Qualification for Protected Pause or reduced-contribution accommodation | Household member, community worker, or healthcare provider | "I confirm Subject X is caring full-time for a dependent who requires continuous supervision." |
| **Identity attestation** | Identity assurance where institutional documentation is not available (P-003 / P-016) | Long-standing community member or trusted institution | "I have known Subject X in community for ≥5 years and affirm their stated identity." |
| **Civic-qualification attestation** | Eligibility for CRP seat, Ombuds role, audit panel, or other civic position requiring independent witness | Current or prior civic officeholders outside the nominee's direct network | "I affirm Subject X has no disqualifying conflict for the [body] seat." |

**Not covered** (out of scope of this annex): ordinary social statements not entered into the Service Record; character references for non-protocol purposes; statements by the subject about themselves (self-attestation is governed separately under Annex K multi-path verification rules).

---

## Section 2 — Stake Mechanism (FC-080 Attestation Stake Ratio)

### 2.1 — Stake Placed at Attestation Time

When an attestor submits an attestation covered by this annex, a stake is **placed** (locked, not spent) from the attestor's own civic balance:

> **Stake placed = FC-080 × Claim-size-scaled base**
>
> **FC-080 `ATTESTATION_STAKE_RATIO` = 0.20** (20% of attestor's own Voice or Service Record at the time of attestation, scaled to claim size)

The **claim-size-scaled base** is the fraction of the attestor's own Voice and Service Record proportional to the magnitude of the subject's claim:

- **Small claim** (e.g., individual Service Record accrual ≤ 50 units, routine contribution verification): stake = 20% of attestor's Service Record × 0.1 = 2% of attestor's Service Record placed
- **Mid claim** (e.g., Service Record accrual 50–200 units, Protected Pause eligibility, identity assurance Tier 2): stake = 20% of attestor's Service Record × 0.3 = 6% of attestor's Service Record placed
- **High claim** (e.g., Service Record accrual >200 units, civic-position qualification, high-impact Voice allocation, identity assurance Tier 3): stake = 20% of attestor's Service Record × 1.0 = 20% of attestor's Service Record placed

Rationale: the stake ratio FC-080 = 0.20 ensures meaningful skin-in-the-game (not trivial) without destroying attestor livelihoods on single errors (not ruinous). A 20% loss on a high claim is a genuine cost; a 2% loss on a small claim is a measurable signal without being disproportionate to the stakes of the routine verification.

The stake is placed against the attestor's existing balance at the time of attestation. If the attestor has insufficient balance, they cannot make the attestation. This prevents attestation by actors with no civic standing to lose.

### 2.2 — Stake Release (Honest Attestations)

Stake is **released** back to the attestor's available balance after the audit window expires (§2.3) without a false-claim finding.

Released stake returns:
- The original placed amount.
- A **small reputation credit** recorded in the attestor's Service Record: +0.01 × FC-080 × claim-scaled-base per successful attestation, bounded at a lifetime cap so reputation accrual does not itself become a status-currency drift surface (see §5.2).

Reputation credit is public (anonymised ledger) and visible to future subjects considering whom to ask for attestation — so consistently-accurate attestors become valued civic resources.

### 2.3 — Audit Window (FC-081)

Slashing is possible for **FC-081 `ATTESTATION_AUDIT_WINDOW` = 365 days** after the attestation is submitted (1-year civic cycle).

The 365-day window matches the civic-cycle duration. This is long enough for:
- Contribution attestations to be verified against activity records, cross-attestation, and random audits.
- Hardship attestations to be verified against subsequent behavior (e.g., does the subject's stated condition continue to manifest in ways consistent with the attestation?).
- Identity attestations to surface through downstream usage (does the subject's activity consistent with their attested identity?).

And short enough that:
- Attestors get their stake back on a predictable schedule and can plan their participation.
- The system does not accrue indefinite liabilities against attestor balances.

After 365 days, the attestation is **final**. It cannot be retroactively slashed, though patterns of later-discovered falsehood may trigger investigation of newer attestations by the same attestor or of the subject's other claims.

### 2.4 — Slashing (False-Claim Finding)

A false-claim finding by the Ombuds (Annex AI) or the Enforcement Panel (Annex AJ §4) during the audit window triggers **slashing** of the placed stake:

| Finding | Slash amount |
| :--- | :--- |
| False attestation, inadvertent (attestor believed claim true; was deceived by subject) | 25% of placed stake slashed; remaining 75% released |
| False attestation, negligent (attestor should have verified; did not) | 50% of placed stake slashed; remaining 50% released |
| False attestation, knowing (attestor knew claim was false or recklessly indifferent) | 100% of placed stake slashed; attestor referred to Enforcement Panel under Annex AJ §4.2 at AJ-2.2 severity (1.5×) for the functional gain created by the false attestation |
| Attestation ring or coordinated false attestation | 100% of placed stake slashed for all ring members; Annex AJ §4.2 AJ-2.2 + AJ-2.3 escalation; 2-year attestation disqualification; Service Record deduction per matrix |

**Slashed stake distribution** (§3).

### 2.5 — Pre-commit Transparency

Attestors see the scheduled stake amount before submitting an attestation. The interface presents:
- The claim the subject is making, in the subject's own framing.
- The claim-size scaling that determines the stake base.
- The attestor's current balance and the stake amount that would be placed.
- The 365-day audit window and the slashing schedule in §2.4.
- The option to decline — declining to attest is a legitimate and costless choice; no civic penalty attaches to non-participation.

Declining to attest is *never* slashable. Only submitted false attestations are slashable. The purpose of the mechanism is not to punish non-participation but to require that participation reflect the attestor's actual knowledge of the subject.

---

## Section 3 — Slashed Stake Distribution

Slashed stake does not simply disappear — that would be deflationary and would eliminate the opportunity to compensate those harmed by the false attestation. Distribution:

| Recipient | Share | Conditions |
| :--- | :--- | :--- |
| **Whistleblower** (the party who raised the complaint leading to finding) | **40%** | Direct transfer to whistleblower's Service Record balance. If complaint was anonymous, share is held in a whistleblower-reserve account and released on claim with identity verification. If complaint was automated (e.g., collusion-graph detection), share routes to the Article VII enforcement maintenance fund. |
| **Subject harmed by false attestation** (when a false attestation harmed someone other than the subject of the attestation — e.g., someone excluded from a position the false claim helped secure) | **30%** | Restitution; paid into harmed party's Service Record. If no third-party harm is identified, share reallocates to the Article VII enforcement maintenance fund. |
| **Article VII enforcement maintenance fund** | **20%** | Funds detection infrastructure (AF3 collusion-graph analytics, cross-attestation audit sampling, whistleblower protection infrastructure per P-021). |
| **Service Record overall** (deflationary — permanently retired) | **10%** | A small deflationary share ensures the system does not reward detection without any cost to the civic-record aggregate. |

The distribution is executed automatically on finality of the finding (post-appeal, or appeal deadline lapsed).

---

## Section 4 — Attestation Graph Density (FC-082)

Individual-level stake mechanisms handle individual false attestations. They do not, by themselves, defeat coordinated attestation rings where every member is "honest" about the others within the ring but the ring as a whole is closed to outside verification.

**FC-082 `ATTESTATION_GRAPH_DENSITY_THRESHOLD` = 0.40** (mutual cross-attestation ratio)

The Service Record system computes, for each attestor cohort of ≥10 participants, the **mutual cross-attestation ratio**: the fraction of pairs (A, B) in the cohort for which A has attested for B *and* B has attested for A within any overlapping 2-year window, divided by the total possible such pairs.

**Null-model baseline.** A random graph with the same number of attestations distributed uniformly across eligible attestors would produce a mutual cross-attestation ratio of approximately k/n (where k is per-person attestations and n is cohort size). For realistic cohort sizes and activity rates, this baseline is typically under 0.05. A threshold of **0.40** is a large multiple of the null-model expectation — meaning attestor networks exceeding 0.40 are structurally distinct from independent attestors making unrelated judgments, and the deviation is statistically hard to explain without coordination.

**Trigger consequence.** Cohorts above 0.40 enter **automatic review**:
- All attestations within the cohort are flagged for manual audit.
- New attestations from cohort members are accepted but held in audit queue pending cohort-level review.
- The Ombuds (Annex AI) initiates a cohort-level investigation: is this a legitimate close-knit community (e.g., a small indigenous community where everyone knows everyone — legitimately high density), or is it a coordinated ring?
- Cohort-level finding proceeds through the standard Ombuds + Enforcement Panel process. Legitimate close-knit communities are certified (with documentation) and exempted from the threshold; coordinated rings are slashed at the AJ-1.3 or AJ-2.2 severity.

**Community safe harbor** (parallels Annex AF §hardship community-disaster safe harbor): attestor cohorts that are geographically co-located in an area with declared emergency status, or that meet documented small-community demographic criteria, are exempt from the 0.40 trigger automatically — the ratio is still computed and reported, but the trigger is gated on the Ombuds cohort-certification finding, not on the ratio alone.

---

## Section 5 — Interaction with Existing Mechanisms

### 5.1 — Relationship to Article VI Multi-Attestation

Article VI already requires **multi-attestation** (multiple independent attestors) for mid- and high-impact claims. This annex does not replace multi-attestation; it **stakes** each of the multiple attestors.

Effect: on a high claim requiring 3 attestations at 20% stake base each, the aggregate stake at risk across attestors is 60% of one attestor's balance (distributed across three people), or 20% × 3 = 60% aggregate equivalent. For the subject to obtain a false attestation set, they must find three attestors each willing to stake their own civic standing on a claim none of them can verify. This is qualitatively different from finding three people willing to sign a piece of paper at no cost.

### 5.2 — Relationship to P-009 Grace Exploitation Patches

Annex AF §AF3 establishes collusion-graph analytics for hardship attestation networks with mutual-pair, star-cluster, and temporal-clustering triggers. This annex's FC-082 density threshold (§4) **generalizes** AF3 to all attestation classes, not just hardship. The AF3-specific triggers remain the primary detection instrument for the hardship attestation domain; FC-082 is the broader network-structure threshold that applies across all attestation classes including contribution, identity, and civic-qualification.

### 5.3 — Relationship to TR-07 Contribution Fraud

Threat Register TR-07 addresses contribution fraud via multi-attestation + random audits + anomaly detection + reputation decay + sanctions. This annex adds the **pre-commitment stake** layer: sanctions become mechanical (automatic slashing on finding) rather than contingent on separate disciplinary action, and the economic cost of ring participation is calibrated to FC-080 regardless of whether social reputation penalties materialize.

### 5.4 — Reputation Cap

Reputation credit accrued via honest attestation (§2.2) is capped at a lifetime ceiling equivalent to **FC-083 = 2 civic cycles** of successful attestation reputation credit. This prevents the accumulation of reputation from becoming itself a status-currency surface for AJ-2.1 patterns (civic standing as allocation preference).

---

## Section 6 — Implementation Notes for Founding Coalition

1. **Technical infrastructure.** The stake mechanism requires Service Record ledger support for:
   - Atomic place/release/slash operations on attestor balances.
   - Audit-window tracking (365-day cursor) per attestation.
   - Attestation-graph density computation (FC-082) with the null-model baseline as a verifiable benchmark, recomputed monthly.
   - Automatic distribution of slashed stakes per §3.

2. **Attestation UI.** The attestation submission interface must present the stake amount, the audit window, and the slashing schedule to the attestor *before* they submit. Attestors submitting without seeing this information (e.g., via automated tooling) constitute a failure of informed consent and invalidate the attestation.

3. **Whistleblower infrastructure.** §3 requires whistleblower complaints to be attributable to a party (for direct share) or routable to a reserve (for anonymous). The whistleblower-reserve account requires the same protections as identity recovery — secure, surveillance-resistant, with recovery through the Ombuds process if the whistleblower subsequently identifies themselves.

4. **Pilot phase calibration.** Before full scale, the founding coalition runs a pilot cohort (≥1,000 attestors, ≥6 months) to verify:
   - FC-080 stake ratio produces measurable behavioral change (attestation rates, decline rates, detected falsehood rates compared to no-stake baseline).
   - FC-082 density threshold does not over-flag legitimate small communities (false positive rate on community safe harbor).
   - FC-081 audit window length is sufficient for realistic detection latencies across attestation classes.
   Pilot findings are documented; any recommended recalibration proceeds through the Tier 2 amendment ladder.

5. **Exclusion safety.** The stake mechanism excludes attestors with insufficient balance from acting as attestors. This is intentional — attestors should have civic standing to put at risk. However, for subjects who have few eligible attestors in their network (new arrivals, isolated individuals), the civic system must provide **alternative attestation paths**: institutional attestors who stake professional rather than personal balance, rotating-jury lightweight attestations for small claims, or self-declaration with augmented random audit. Exclusion of subjects because no one with sufficient balance knows them is an unacceptable failure mode. These alternative paths are specified in Article VI and Annex K multi-path verification clauses.

---

## Section 7 — Governance

**This annex is governed as P-004 protected specification.** Core mechanisms (the place/slash/release architecture; the 365-day audit window structure; the graduated-culpability slashing schedule in §2.4) cannot be modified without Tier 2 amendment with public redlines.

**Founding Commitments bound:**
- FC-080 `ATTESTATION_STAKE_RATIO` = 0.20 (Tier 2)
- FC-081 `ATTESTATION_AUDIT_WINDOW` = 365 days (Tier 2)
- FC-082 `ATTESTATION_GRAPH_DENSITY_THRESHOLD` = 0.40 (Tier 2)
- FC-083 `ATTESTATION_REPUTATION_CREDIT_CAP` = 2 civic cycles (Tier 2)

Numerical changes to these commitments proceed through the Tier 2 amendment ladder in `/founding/commitments.md`.

**Annual audit.** The Enforcement Panel and the Ombuds produce a joint Annual Attestation Audit (parallel to the Annex AJ §4.5 Annual Deterrence Audit) reporting:
- Total attestations placed; total stake volume; aggregate balance at risk at year-end.
- Slashing events by finding category; realized slash rate.
- Cohort-level density findings (cohorts above 0.40, certified vs. slashed).
- Attestor exclusion rate (subjects who could not obtain attestation through insufficient balance of their network); trend line over time.
- Recommendations for calibration of FC-080, FC-081, or FC-082 if empirical behavior deviates from design assumptions.

---

*This document is Annex AS of the Humane Constitution. Operative as an ACTIVE specification as of Proposal 9 close-out (2026-04-18). Integration with Article VI and Annex AF proceeds through the ordinary implementation sequence.*
