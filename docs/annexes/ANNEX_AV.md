# ANNEX AV — Two-Key Architectural Precondition for Tier-1 Invariant Enforcement

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Require that any proposal touching a Tier 1 invariant must carry a cryptographic attestation from a structurally independent adversarial panel member before it can be admitted for review — eliminating the single point of failure where one captured reviewer could admit any invariant-breaking change. |
> | **Who it protects** | Everyone whose rights depend on Tier 1 invariants remaining intact; the constitutional architecture itself against insider bypass. |
> | **Failure risk** | FAP capture (T-016): a single captured FAP reviewer admits a Tier-1-touching proposal without the required independent check, voiding all seven invariants simultaneously through a single procedural failure. |
> | **Evidence status** | Active — unproven |
> | **Linked risks** | T-016 (FAP capture); INV-007 (single point of failure); P-034; Annex AH (oppose-coalition); Annex AI (Federated Ombuds); Annex AM (CIP) |

> **Provenance:** Implements [P-034 — Two-Key Architectural Precondition for Tier-1 Invariant Enforcement] · Addresses T-016 and INV-007 · Status: **ACTIVE**

**Status:** ACTIVE | **Priority:** Critical | **Patch:** P-034
**Threats addressed:** T-016 (FAP capture), INV-007 single-point-of-failure
**Origin:** PRD-001 / Phase 1 Article I adversarial audit; reconfirmed Phase 4 follow-up
**Authority:** Tier 1. Changes require the full amendment protocol per `/architecture/amendment_protocol.md`.

> **Drafting note (2026-04-25):** This annex was written from the existing operative content in `Patch_Log.md` §P-034 and `Acceptance_Protocol.md` §Structural Precondition Gate to close a dangling reference. The 2026-05-01 follow-up added the operational procedures for key registration, attestation envelopes, intake verification, and defection findings.

---

## AV0 — Problem Diagnosed

The prior INV-007 enforcement relied on a single FAP reviewer checking patch proposals against the parameter registry before intake. This is a single point of failure: a captured, compromised, or mistaken reviewer can admit a Tier-1-touching proposal simply by not flagging the violation. The Beer VSM logic-gate test (Phase 1) confirmed the failure mode — the normative model collapses to `defect → bypass` because the reviewer is both S3 (operational control) and the entire S3* (audit channel). A single captured actor voids all seven invariants simultaneously.

## AV1 — Two-Key Precondition

Any patch tagged `modifies_tier1=True` (i.e., any proposal whose accepted form would alter an entry in `architecture/parameter_registry.md`, `Humane_Constitution.md §0`, `Annex Y §Y1`, or a Tier 1 row of `/founding/commitments.md`) must carry a cryptographic attestation from the standing adversarial panel member **before** FAP intake opens. Intake without attestation is procedurally void.

## AV2 — FAP Reviewer Authority Scoped

The FAP reviewer's authority is explicitly scoped to exclude the ability to waive or override the absence of attestation. A reviewer who admits a `modifies_tier1=True` proposal lacking attestation has acted outside their authority — no benefit accrues, only liability. Any clause anywhere in the corpus that purports to grant such waiver authority is overridden by AV2 and is treated as void on its face.

## AV3 — Adversarial Panel Member Independence

The adversarial panel member is nominated by the oppose-coalition body (Annex AH §AH2.3), not by the founding coalition. Structural independence requirements:
- No funding relationship with the founding coalition or any of its constituent organizations within a three-year lookback window.
- No employment, board, advisory, or contractor relationship with FAP-administering bodies during the term of seat.
- Term length sufficient to outlast a single electoral cycle in the host jurisdiction.

## AV4 — Defection Penalty

- **Improper admission attestation** (attesting that a Tier-1-touching proposal is non-violating when it in fact violates an invariant): permanent removal from the panel, forfeiture of the seat to the oppose-coalition nominating body, and a public defection finding entered in the Article VII dashboard.
- **Honest attestation, including rejections:** no penalty. Refusal to attest is a permitted outcome and produces a conservative failure mode (the proposal stalls at intake; it is not wrongly admitted).
- **Vacancy:** if the seat is vacant, no `modifies_tier1=True` proposal may advance. Vacancy is published in the Article VII dashboard within 24 hours.

## AV5 — Buterin Incentive Alignment

The payoff matrix is structured so honesty is dominant:
- Honest attestation → no cost.
- Honest non-attestation → no cost; conservative system outcome.
- Improper attestation → permanent removal + public finding.
- Improper non-attestation (refusing to attest a clean proposal) → political cost via published voting/attestation history; recoverable.

The reviewer's incentive is also corrected by AV2: there is no path by which a reviewer benefits from admitting an unattested proposal.

## AV6 — Beer VSM Fix

S3* (adversarial panel attestation) is structurally independent of S3 (FAP reviewer). Collapsing S3* into S3 is architecturally impossible because the adversarial panel member holds a key the FAP reviewer does not control. The audit channel is not a delegation from operational control; it is an independent system with its own nominating body, term structure, and accountability path.

## AV7 — Key Registration and Rotation

The adversarial panel member's public verification key is registered in the FAP intake system and mirrored in the Article VII dashboard before any `modifies_tier1=True` proposal may be submitted.

Key registration requires:
- Public-key fingerprint, algorithm identifier, creation timestamp, and seat identifier.
- Signed seating certificate from the oppose-coalition nominating body under Annex AH §AH2.3.
- Counter-attestation by the Federated Ombuds Plenum that the seat is filled and the key belongs to the seated panel member.
- Publication in an append-only key history. Old keys are never deleted; they are marked active, rotated, revoked, or expired.

Key rotation is permitted for routine security or suspected compromise. A rotated key becomes valid only after the same seating and Plenum counter-attestation steps are complete. Emergency revocation takes effect immediately on either (a) the panel member's signed revocation notice, or (b) a 4-of-5 Federated Ombuds Plenum finding of compromise. During revocation or rotation gaps, no Tier-1-touching proposal may advance.

## AV8 — Attestation Envelope Format

Every AV1 attestation must be a structured, signed envelope. The envelope is published with the FAP intake record and must include:

| Field | Requirement |
| :--- | :--- |
| `patch_id` | Stable patch identifier. |
| `proposal_hash` | Cryptographic hash of the exact proposal text reviewed. |
| `tier1_surfaces_reviewed` | List of Tier 1 registry rows, invariant IDs, FC rows, and constitutional sections assessed. |
| `determination` | One of `admit_no_tier1_violation`, `reject_tier1_violation`, or `unable_to_determine`. |
| `rationale_digest` | Short public rationale; restricted operational detail may be referenced through Annex AO if publication would reveal exploit paths. |
| `reviewer_key_fingerprint` | Fingerprint matching the active registered key under AV7. |
| `issued_at` | Timestamp; envelope expires 90 days after issuance. |
| `signature` | Signature over all envelope fields except `signature`. |

Only `admit_no_tier1_violation` permits intake. `reject_tier1_violation` closes the proposal unless the submitter rewrites and resubmits under a new proposal hash. `unable_to_determine` is treated as non-attestation: the proposal stalls without prejudice and no invariant merits review begins.

## AV9 — Intake Verification Procedure

The FAP intake system must perform all AV checks before queue placement:

1. Confirm the proposal carries `modifies_tier1=True` or run the ordinary invariant-screening rule for untagged proposals.
2. If `modifies_tier1=True`, require exactly one current attestation envelope matching the proposal hash.
3. Verify the signature against the active key registry.
4. Verify the envelope has not expired and that the key was active at issuance.
5. Confirm the determination is `admit_no_tier1_violation`.
6. Publish the envelope hash and intake decision in the Article VII dashboard.

Failure at any step returns the proposal as administratively incomplete. The FAP reviewer may not convert a failed AV9 check into a merits rejection, because doing so would recreate reviewer discretion over the precondition. The only permissible output is "intake blocked by missing or invalid AV attestation."

## AV10 — Defection-Finding Process

A defection inquiry may be opened by any of:
- Federated Ombuds Plenum vote of 2 of 5 or higher.
- The oppose-coalition nominating body that seated the adversarial panel member.
- A published CRP referral identifying the proposal hash and the specific Tier 1 surface allegedly mis-attested.

The inquiry must compare the signed envelope against the proposal text actually admitted at intake. A defection finding requires all four:
- The envelope carried `admit_no_tier1_violation`.
- The admitted proposal materially modified, reinterpreted, or operationally constrained a Tier 1 invariant without proper Tier 1 amendment authority.
- The reviewed proposal hash matches the admitted proposal or the mismatch was ignored by the intake system.
- The panel member either knew or should have known of the Tier 1 effect under the published registry and invariant text available at issuance.

The Federated Ombuds Plenum decides the finding by 4-of-5 vote. Until decision, the panel member is suspended from new attestations and the seat enters conservative-failure mode: pending Tier-1-touching proposals stall. If defection is found, AV4 penalties apply, the finding is published in the Article VII dashboard with the proposal hash and affected invariant IDs, and the oppose-coalition nominating body must seat a replacement key before intake resumes.

Good-faith disagreement is not defection. If the Plenum finds the issue was ambiguous, the remedy is a registry clarification under P-004, not punishment. If the intake system admitted a proposal whose proposal hash did not match the envelope, the primary defect is intake-system failure; the panel member is not penalized unless they participated in or knowingly ignored the mismatch.

---

## Dependencies

- Adversarial panel member must be seated (per Annex AH §AH2.3) before any `modifies_tier1=True` proposal may be submitted. P-034 becomes operational the moment the adversarial panel member's key is registered with the FAP intake system.
- Cryptographic attestation envelope format and key-handling procedure are specified in AV7 through AV9.
- Public defection-finding publication channel (Article VII dashboard) must support the attestation-history view.

## AV11 — Compound-Capture Detection (T-022 × T-016 Scenario)

The two-key precondition protects against single-actor FAP reviewer capture (T-016 alone) and single-actor adversarial panel seat failure. It does not by itself protect against a compound scenario where both the FAP reviewer role and the adversarial panel seat change or are compromised within the same short window — for example, during an electoral transition that also affects the oppose-coalition nominating body. T-022 (electoral cycle capture) combined with T-016 creates a window where the new governing coalition controls FAP appointment and simultaneously exercises sufficient pressure or legal threat to destabilize the oppose-coalition nominating body before a replacement seat is secured.

**Compound-capture watch trigger:** If the FAP reviewer role changes AND the adversarial panel seat is either vacated or the seated member changes within any rolling 90-day window, this is automatically a constitutional watch event. The Federated Ombuds must publish the watch event in the Article VII dashboard within 7 days of the second change and initiate a 60-day independence assessment of both roles.

**New-reviewer cooling-off period:** A newly seated FAP reviewer may not exercise intake authority over any `modifies_tier1=True` proposal during the first 30 days of their term. During this window, the Federated Ombuds designates a temporary first-check reviewer drawn from the CIP (AM8) or, if unavailable, from the oracle accreditation network (Annex AL). This prevents a governing coalition from moving immediately to admit Tier-1-touching proposals through a freshly appointed reviewer.

**Oppose-coalition continuity requirement:** The oppose-coalition nominating body (Annex AH §AH2.3) must maintain a published succession list of at least three qualified successor candidates for the adversarial panel seat at all times. If the nominating body itself is dissolved, suspended, or materially incapacitated, the Federated Ombuds Plenum assumes the nominating function until a successor oppose-coalition body is constituted. Vacancy during Plenum-nominating authority is treated identically to vacancy under ordinary rules: no `modifies_tier1=True` proposal may advance.

## Residual Risk (Acknowledged)

The adversarial panel member can be defected through external pressure not covered by the internal penalty structure (coercion, external blackmail, family threat). This is documented as a known residual rather than a resolved problem. Physical-world coercion cannot be fully eliminated by protocol design; the conservative failure mode (the panel member refuses to attest rather than attesting fraudulently under coercion) is the design target.

The compound-capture scenario (AV11) reduces the attack window but cannot eliminate it. If the governing coalition, the FAP reviewer, and the Federated Ombuds Plenum are all compromised simultaneously, no in-system mechanism can detect or block the failure. This is the system's acknowledged single point of catastrophic capture; the only repair path is the H-3 re-founding convention or external civil-society pressure.

---

*This annex is part of the Humane Constitution's architectural-enforcement layer. It is read by the FAP intake system on every `modifies_tier1=True` submission and verified against the seated adversarial-panel member's attestation before intake proceeds.*
