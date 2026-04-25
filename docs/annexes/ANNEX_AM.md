# Annex AM — Electoral Cycle Resilience

**Status:** PROPOSED | **Priority:** Critical | **Patch:** P-018
**Threat addressed:** T-022 (Electoral Cycle Capture)
**Authority:** Tier 1 for AM1, AM2, AM3, AM6 (entrenchment, Essential Access floor minimum, hollowing triggers, treaty override). Tier 2 for AM4, AM5 (transition continuity, audit scope).

> **Drafting note (2026-04-25):** This annex was written from the existing P-018 specification in `Patch_Log.md` to close dangling references in `Threat_Register.md` (T-022), `docs/Adversarial_Narrative_Simulation.md`, and `docs/annexes/ANNEX_AJ.md` (the PII-stripping rule). The PII-stripping standard in AM7 is the load-bearing item invoked by AJ §enforcement-ledger publication.

---

## AM1 — Entrenchment Ladder (Direct Repeal Defense)

Tier 1 invariants require not just a legislative supermajority but **concurrent ratification by an independent constitutional body**. The constitutional body's composition must be specified at founding such that it cannot be reconstituted entirely by the governing coalition within a single electoral term. Composition rules:

- Staggered terms exceeding the longest electoral cycle in the host jurisdiction.
- Nomination drawn from at least three structurally distinct bodies (e.g., Federated Ombuds, oppose-coalition per Annex AH, judiciary).
- Removal-for-cause requires the same M-of-N threshold as a Tier 1 amendment (`amendment_protocol.md`).

## AM2 — Essential Access Floor Minimum (Administrative Hollowing Defense)

A minimum Essential Access floor — defined at founding as **70% of the founding basket** — is constitutionally self-executing: it does not require legislative appropriation and cannot be suspended by executive action. The floor persists through any governing coalition transition unless repealed via the full Tier 1 amendment process. Operational consequence: the Essential Access issuance service must continue to dispense at or above the 70% floor regardless of the political will of the current government, drawing on reserves (Annex Y, FC-070) where current production is insufficient.

## AM3 — Administrative Hollowing Triggers

An automatic constitutional review is triggered, without requiring the governing coalition's initiation, when any of the following occur:

- A founding institution seat is unfilled for more than **90 days**.
- Post-mortem publication (Article VII) lapses for more than **30 days**.
- Oracle accreditation count drops below the methodology-class minimum (Annex AL §3.1).
- Article VII dashboard publication is delayed by more than **14 days** beyond its stated cadence.

The review is initiated by the constitutional body (AM1) and is self-executing. It is published in the Article VII dashboard at the moment of trigger.

## AM4 — Transition Continuity Protocol

When a new governing coalition takes office, a mandatory **180-day transition audit** is required before any changes to Tier 2 or Tier 1 provisions. The audit is conducted by the constitutional body (AM1), not the incoming government. During the 180-day window, no Tier 2 or higher changes may be made except through emergency deadlock resolution (P-012, Annex AE §AE2.3).

## AM5 — Audit Scope and Extension

The transition audit has a defined **30-day maximum scope for routine transitions** (no findings of administrative hollowing under AM3, no oracle degradation, no enforcement-ledger anomaly). Extensions beyond 30 days require independent authorization from the Federated Ombuds (Annex AI §3) or a finding under AM3 that justifies extended review.

## AM6 — Treaty Override Protection

International agreements that require modification to the non-convertibility architecture trigger a mandatory **Tier 2 impact assessment** before ratification. An agreement that would produce cumulative Tier 2 impact (by the T-007 / P-012 cumulative-drift trigger standards) requires the full Tier 2 amendment process for each applicable provision. A treaty cannot be used as a shortcut around the amendment protocol.

## AM7 — PII-Stripping Standard (Enforcement-Ledger Publication)

Where any annex (notably Annex AJ §enforcement-ledger publication) requires public publication of enforcement-ledger entries, AM7 governs the PII-stripping standard:

- **Direct identifiers removed:** legal name, identity-stack ID, residential address, contact endpoints.
- **Quasi-identifiers redacted on a sliding scale:** age replaced with 5-year bucket; geographic location replaced with smallest jurisdiction wider than locality (per Founding Order subsidiarity scales) where the cohort size exceeds a k-anonymity floor (k≥10).
- **Aggregated counts only** where the underlying cohort would fall below k=10 after geographic redaction.
- **Re-identification attempts are themselves a registered offense** under Annex AJ §4.

The standard is reviewed annually by the Federated Ombuds and updated when reidentification techniques outpace it.

---

## Dependencies

- Independent constitutional body (AM1) formally constituted at founding with staggered terms and confirmed independence from governing-coalition appointment.
- Essential Access floor minimum (AM2) requires Reserve Capacity System (RCS) confirmation and oracle measurement basis.
- Article VII dashboard infrastructure must support automatic trigger publication (AM3).
- PII-stripping standard (AM7) must be implemented in the enforcement-ledger publication pipeline before any AJ §publication clause activates.

## New Risks

- The self-executing Essential Access floor (AM2) requires continuous oracle measurement; oracle degradation itself triggers AM3 review.
- The 180-day transition window (AM4) may stall genuine reforms; AM5 audit scope and Ombuds extension authority mitigate.
- AM7's k-anonymity threshold of 10 is a starting parameter; small communities may require larger k or aggregation-only publication.

## Residual Risk

A government with sufficient political will and supermajority can repeal constitutional entrenchment through valid amendment. The designed defense buys time and raises political cost; it cannot prevent determined repeal. Ultimate residual: protocol durability depends on political culture. No design substitutes for a culture that values the commitments.

---

*This annex closes T-022 (Electoral Cycle Capture). Its operative provisions integrate with Annex AI (Federated Ombuds) §3.4 automatic Plenum convocation, Annex AJ §enforcement-ledger publication (via AM7), and the architectural enforcement layer in `/architecture/`.*
