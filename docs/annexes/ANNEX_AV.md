# Annex AV — Two-Key Architectural Precondition for Tier-1 Invariant Enforcement

**Status:** ACTIVE | **Priority:** Critical | **Patch:** P-034
**Threats addressed:** T-016 (FAP capture), INV-007 single-point-of-failure
**Origin:** PRD-001 / Phase 1 Article I adversarial audit; reconfirmed Phase 4 follow-up
**Authority:** Tier 1. Changes require the full amendment protocol per `/architecture/amendment_protocol.md`.

> **Drafting note (2026-04-25):** This annex was written from the existing operative content in `Patch_Log.md` §P-034 and `Acceptance_Protocol.md` §Structural Precondition Gate to close a dangling reference. It is authoritative, but the worked operational procedures (key-handling, attestation envelope format, defection-finding process) need a follow-up specification pass.

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

---

## Dependencies

- Adversarial panel member must be seated (per Annex AH §AH2.3) before any `modifies_tier1=True` proposal may be submitted. P-034 becomes operational the moment the adversarial panel member's key is registered with the FAP intake system.
- Cryptographic attestation envelope format and key-handling procedure are operational specifications (see follow-up specification pass).
- Public defection-finding publication channel (Article VII dashboard) must support the attestation-history view.

## Residual Risk (Acknowledged)

The adversarial panel member can be defected through external pressure not covered by the internal penalty structure (coercion, external blackmail, family threat). This is documented as a known residual rather than a resolved problem. Physical-world coercion cannot be fully eliminated by protocol design; the conservative failure mode (the panel member refuses to attest rather than attesting fraudulently under coercion) is the design target.

---

*This annex is part of the Humane Constitution's architectural-enforcement layer. It is read by the FAP intake system on every `modifies_tier1=True` submission and verified against the seated adversarial-panel member's attestation before intake proceeds.*
