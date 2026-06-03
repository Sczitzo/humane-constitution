# ANNEX AF — Grace Period Exploitation Clauses

> **Provenance:** Implements [P-009 — Grace Exploitation Loop Hardening] · Addresses T-009 · Status: see Patch Log

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Closes the grace period exploitation loop: adds graduated renewal intensity, cross-quarter pause history review, collusion detection in hardship attestation networks, and slow Service Record decay during extended pauses. |
> | **Who it protects** | Genuine long-term hardship users who need the Protected Pause Window without penalty; the contribution and civic pools from coordinated exploitation that rotates fake hardship claims to preserve elite governance eligibility. |
> | **Failure risk** | A coordinated network uses mutual attestation and category-switching to maintain permanent pause status, preserving Service Record and civic eligibility indefinitely without genuine contribution; grace mechanisms created for the vulnerable are captured by sophisticated actors. |
> | **Evidence status** | Designed |
> | **Linked risks** | T-009 / P-009 (grace exploitation loop); T-008 / P-008 (elite formation bypass); Annex K4 (Protected Pause Window); AC3.5 (cooling-off cohort rule) |

**Purpose.** This annex introduces operative clauses for P-009 (T-009 Grace Exploitation Loop). It amends Annex K4 (Protected Pause), extends P-002 collusion analytics to hardship attestation, and closes the T-009 × T-008 bypass route. Status: PROPOSED.

### AF1. Graduated Renewal Intensity (Annex K4 Amendment)
The Protected Pause Window renewal review must apply graduated evidence standards based on cumulative pause history. Initial activation and each renewal are governed by the following standards:

| Pause Instance | Evidence Standard | Review Body | SLA |
| :--- | :--- | :--- | :--- |
| **First activation** | Lightweight — one qualifying condition, self-declaration with supporting evidence | Local Review Office | 3 days |
| **First renewal (Q5)** | Structured — same category evidence plus brief status update confirming ongoing hardship | Local RO + case file review | 5 days |
| **Second renewal (Q9)** | Mid-intensity — full evidence bundle; confirmation that appropriate support services were offered or declined | Regional review + Local RO | 7 days |
| **Third+ renewal (Q13+)** | High-intensity — independent assessment, same standard as high-impact Service Record claim; published aggregate statistics | Independent panel | 14 days |

Genuine long-term hardship (severe disability, permanent caregiving responsibility, chronic illness) qualifies under the high-intensity standard. Graduated intensity targets exploitation detection at the renewal stage, not access deterrence at initiation. Any qualifying hardship is approved under any review standard.

**Permanent-condition exemption.** Once an independent panel has confirmed at a high-intensity renewal that the qualifying hardship is genuinely permanent or chronic — permanent disability, lifelong caregiving responsibility, or an irreversible chronic illness — subsequent renewals drop to a lightweight attestation-of-continuation: a confirmation that the unchanged condition persists, processed by the Local Review Office within 3 days. The high-intensity gauntlet is not repeated on a recurring clock for a condition the panel has already found unchanging. The exemption is recorded in the cross-quarter history and may be revisited only if specific evidence indicates the condition has materially changed; it is never reopened merely because a renewal interval has elapsed.

Category switching between renewals — activating a new qualifying category to restart the renewal clock — is flagged in the cross-quarter history and reviewed with elevated scrutiny at the next renewal. It does not automatically deny the new activation.

### AF2. Cross-Quarter History Review
Every renewal review must include a full summary of the person's Protected Pause history — not only the current qualifying event. The reviewer must assess the pattern across the full history and document their assessment. A pattern of repeated renewals with category switching constitutes a review flag; it does not constitute grounds for automatic denial absent other evidence of fraud.

### AF3. Hardship Attestation Collusion Detection
The collusion-graph analytics established in P-002 are extended to hardship attestation networks. The following graph patterns trigger elevated scrutiny review:
- **Mutual attestation pairs:** Person A attests to Person B's hardship AND Person B attests to Person A's hardship within the same 4-quarter window.
- **Star attestation clusters:** 4 or more people whose hardship is attested exclusively by the same small group of active contributors.
- **Temporal clustering:** 4 or more pause activations within the same social network — defined by attestation relationships — within a 2-quarter window.

Detection triggers elevated scrutiny review, not automatic denial. The review must assess whether an innocent explanation exists — a community disaster, a workplace closure, or a shared housing crisis may legitimately produce these patterns.

**Community-disaster safe harbor:** When a declared emergency (oracle-verified) affects the attestation network's region, collusion patterns among affected persons are exempt from elevated scrutiny for 2 quarters. Safe harbor is applied by the reviewing body automatically upon confirming regional emergency status.

**Slow-burn shared-hardship safe harbor:** Genuine co-located or co-affiliated hardship frequently arrives without a formal emergency declaration — a single plant closing before any oracle declaration, an extended-kinship network in deep poverty, the failure of a single-employer town. Where the reviewing body finds documented evidence of such a cluster — a shared employer, a shared locality, or a shared kinship or housing network experiencing genuine concurrent hardship — the affected persons receive the same presumption of an innocent explanation that the community-disaster safe harbor grants. The reviewer documents the shared-hardship basis, and the flagged collusion pattern is treated as explained rather than suspect. This pathway requires no declared emergency; it requires only credible documentation of co-located or co-affiliated hardship, and like the declared-disaster safe harbor it suspends elevated scrutiny for the affected cluster for 2 quarters.

**Attestation-graph data minimization.** The hardship attestation graph maps the support networks of people in hardship and must never become a reusable surveillance asset. Access to the attestation graph is purpose-limited to exploitation review under this annex: only the reviewing bodies and independent panels conducting an active collusion-detection review may view it, and only the subgraph relevant to the case under review. The graph is retained only as long as needed for active and appealable reviews and is purged on a fixed retention schedule once a review and its appeal window have closed; confirmed safe-harbor or innocent-explanation cases are purged at closure. The attestation graph may not be repurposed for eligibility scoring, civic-standing assessment, law-enforcement referral, or any use beyond exploitation review, and may not be exported, sold, or shared outside the reviewing function. Every access is logged and auditable.

### AF4. Service Record Slow-Decay During Extended Pause (Annex K4 Amendment)
During a Protected Pause Window, Service Record decays at 20% of the normal quarterly rate rather than being fully frozen. Voice decay freeze is unchanged — Voice cliff-effect protection is preserved in full. The Service Record slow-decay applies only during quarters in which a Protected Pause Window is active.

| Scenario | Service Record After 4 Quarters | Service Record After 8 Quarters | Service Record After 12 Quarters |
| :--- | :--- | :--- | :--- |
| No pause (normal decay at 10%/quarter) | 65.6 | 43.0 | 28.2 |
| Full freeze (current design) | 100.0 | 100.0 | 100.0 |
| **Slow-decay at 20% of normal (P-009)** | 92.2 | 85.1 | 78.5 |

**Calibration rationale:** a 4-quarter pause (one typical hardship cycle) produces approximately 8% Service Record reduction — negligible for genuine users who will rebuild through resumed contribution. A 12-quarter rotation exploit produces approximately 22% reduction, draining high-impact service eligibility thresholds over time. The slow-decay must be clearly communicated: it is not punitive, and Service Record can be fully rebuilt through resumed verified contribution after the pause ends.

### AF5. Service Pool Pause-Saturation Monitoring
Published quarterly in the Article VII concentration dashboard (extending AC3.7): the percentage of each Service Record-governed service pool simultaneously in Protected Pause. When any pool exceeds 20% simultaneously paused, a pool-health alert fires. The alert triggers: (a) review of whether paused members' service eligibility should be temporarily suspended pending return to active status; (b) assessment of whether the pool requires emergency replenishment from the next eligible cohort. Pool saturation monitoring triggers review only — it never automatically bars any individual's Protected Pause activation.

**Published false-positive rate.** Extending the aggregate-statistics publication required at the high-intensity renewal standard (AF1), the program publishes as a standing quarterly metric its false-positive rate: the share of elevated-scrutiny and high-intensity reviews that resolve as genuine hardship rather than confirmed exploitation. A persistently high false-positive rate is treated as evidence that the scrutiny thresholds are over-burdening genuine claimants and is grounds to recalibrate the triggers in AF1 and AF3 toward lighter-touch review. The metric is published in aggregate only and never identifies individuals.

### AF6. Capability Development Pathway During Pause [Ambitious]
During a Protected Pause Window, a person may earn up to 15% of their normal quarterly Service Record through verified pause-appropriate stewardship. Qualifying activities: peer support for other hardship-affected persons; verified self-directed learning with completion evidence; community care activities that do not require the person's primary capacity. 'Pause-appropriate stewardship' is a protected term under P-004. The 15% cap is absolute; the pathway cannot be used to accumulate Service Record beyond the person's pre-pause baseline.

### AF7. T-009 × P-008 Explicit Closure [Ambitious]
P-008 Annex AC3.5 (Cooling-Off Cohort Rule) is amended as follows. For the purpose of the cohort concurrent maximum (2 members of the same co-service cohort sharing review authority simultaneously), a person is considered effectively serving if their Service Record is maintained above the service eligibility threshold through Protected Pause rather than ongoing contribution. Paused cohort members count toward the 2-member concurrent maximum. When a paused cohort member's count causes the maximum to be exceeded, the active serving members must accommodate — not the paused person. The paused person is never required to exit pause due to this rule.

---

### AF8. Complete Threat/Patch Linkage — All Sessions

| Threat | Patch | Status | Annex | Session |
| :--- | :--- | :--- | :--- | :--- |
| T-001 | P-001 | ACTIVE | AB | S1 |
| T-002 | P-003 | ACTIVE | AB | S1 |
| T-004 | P-002 | ACTIVE | AB | S1 |
| T-007 | P-004 | ACTIVE | AB | S1 |
| T-005 | P-005 | ACTIVE | AC1 | S2 |
| T-006 | P-006 | ACTIVE | AC2 | S2 |
| T-008 | P-008 | ACTIVE | AC3 | S2 |
| T-011 | P-011 | ACTIVE | AD | S2 |
| T-012 | P-012 | ACTIVE | AE2.1 | S3 |
| T-013 | P-012 | ACTIVE | AE2.2 | S3 |
| T-014 | P-012 | ACTIVE | AE2.3 | S3 |
| T-015 | P-012 | ACTIVE | AE2.4 | S3 |
| T-009 | P-009 | ACTIVE | AF | S4 |

*T-009 is addressed via P-009. All threats named through this annex have mitigation designs. Outstanding pre-launch items: White Paper sync, Technical Reference diagram update, and formal acceptance of Annexes AC–AF.*

---
