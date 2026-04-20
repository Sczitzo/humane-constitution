# ANNEX AF — Grace Exploitation Loop Hardening (P-009)

**Purpose.** This annex introduces operative clauses for P-009 (T-009 Grace Exploitation Loop). It amends Annex K4 (Protected Pause), extends P-002 collusion analytics to hardship attestation, and closes the T-009 × T-008 bypass route. Status: PROPOSED.

### AF1. Graduated Renewal Intensity (Annex K4 Amendment)
The Protected Pause Window renewal review must apply graduated evidence standards based on cumulative pause history. Initial activation and each renewal are governed by the following standards:

| Pause Instance | Evidence Standard | Review Body | SLA |
| :--- | :--- | :--- | :--- |
| **First activation** | Lightweight — one qualifying condition, self-declaration with supporting evidence | Local Review Office | 3 days |
| **First renewal (Q5)** | Structured — same category evidence plus brief status update confirming ongoing hardship | Local RO + case file review | 5 days |
| **Second renewal (Q9)** | Mid-intensity — full evidence bundle; confirmation that appropriate support services were offered or declined | Regional review + Local RO | 7 days |
| **Third+ renewal (Q13+)** | High-intensity — independent assessment, same standard as high-impact CR claim; published aggregate statistics | Independent panel | 14 days |

Genuine long-term hardship (severe disability, permanent caregiving responsibility, chronic illness) qualifies under the high-intensity standard. Graduated intensity targets exploitation detection at the renewal stage, not access deterrence at initiation. Any qualifying hardship is approved under any review standard.

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

### AF4. CR Slow-Decay During Extended Pause (Annex K4 Amendment)
During a Protected Pause Window, CR decays at 20% of the normal quarterly rate rather than being fully frozen. DW decay freeze is unchanged — DW cliff-effect protection is preserved in full. The CR slow-decay applies only during quarters in which a Protected Pause Window is active.

| Scenario | CR After 4 Quarters | CR After 8 Quarters | CR After 12 Quarters |
| :--- | :--- | :--- | :--- |
| No pause (normal decay at 10%/quarter) | 65.6 | 43.0 | 28.2 |
| Full freeze (current design) | 100.0 | 100.0 | 100.0 |
| **Slow-decay at 20% of normal (P-009)** | 92.2 | 85.1 | 78.5 |

**Calibration rationale:** a 4-quarter pause (one typical hardship cycle) produces approximately 8% CR reduction — negligible for genuine users who will rebuild through resumed contribution. A 12-quarter rotation exploit produces approximately 22% reduction, draining high-impact service eligibility thresholds over time. The slow-decay must be clearly communicated: it is not punitive, and CR can be fully rebuilt through resumed verified contribution after the pause ends.

### AF5. Service Pool Pause-Saturation Monitoring
Published quarterly in the Pillar 11 concentration dashboard (extending AC3.7): the percentage of each CR-governed service pool simultaneously in Protected Pause. When any pool exceeds 20% simultaneously paused, a pool-health alert fires. The alert triggers: (a) review of whether paused members' service eligibility should be temporarily suspended pending return to active status; (b) assessment of whether the pool requires emergency replenishment from the next eligible cohort. Pool saturation monitoring triggers review only — it never automatically bars any individual's Protected Pause activation.

### AF6. Capability Development Pathway During Pause [Ambitious]
During a Protected Pause Window, a person may earn up to 15% of their normal quarterly CR through verified pause-appropriate stewardship. Qualifying activities: peer support for other hardship-affected persons; verified self-directed learning with completion evidence; community care activities that do not require the person's primary capacity. 'Pause-appropriate stewardship' is a protected term under P-004. The 15% cap is absolute; the pathway cannot be used to accumulate CR beyond the person's pre-pause baseline.

### AF7. T-009 × P-008 Explicit Closure [Ambitious]
P-008 Annex AC3.5 (Cooling-Off Cohort Rule) is amended as follows. For the purpose of the cohort concurrent maximum (2 members of the same co-service cohort sharing review authority simultaneously), a person is considered effectively serving if their CR is maintained above the service eligibility threshold through Protected Pause rather than ongoing contribution. Paused cohort members count toward the 2-member concurrent maximum. When a paused cohort member's count causes the maximum to be exceeded, the active serving members must accommodate — not the paused person. The paused person is never required to exit pause due to this rule.

---

### AF8. Complete Threat/Patch Linkage — All Sessions

| Threat | Patch | Status | Annex | Session |
| :--- | :--- | :--- | :--- | :--- |
| T-001 | P-001 | ACTIVE | AB | S1 |
| T-002 | P-003 | ACTIVE | AB | S1 |
| T-004 | P-002 | ACTIVE | AB | S1 |
| T-007 | P-004 | ACTIVE | AB | S1 |
| T-005 | P-005 | PROPOSED | AC1 | S2 |
| T-006 | P-006 | PROPOSED | AC2 | S2 |
| T-008 | P-008 | PROPOSED | AC3 | S2 |
| T-011 | P-011 | PROPOSED | AD | S2 |
| T-012 | P-012 | PROPOSED | AE2.1 | S3 |
| T-013 | P-012 | PROPOSED | AE2.2 | S3 |
| T-014 | P-012 | PROPOSED | AE2.3 | S3 |
| T-015 | P-012 | PROPOSED | AE2.4 | S3 |
| T-009 | P-009 | PROPOSED | AF | S4 |

*Session 4 complete. T-009 addressed. All named threats now have mitigation designs. Priority open items: White Paper sync (mandatory pre-launch), Technical Reference diagram update, formal acceptance of Annexes AC–AF.*

---

# The Humane Constitution — Annex AG
