# Annex AP — PCRP Attack Surface Hardening

**Status:** PROPOSED | **Priority:** High | **Patch:** P-015
**Threats addressed:** T-018 (PCRP False-Trigger Exhaustion Attack), T-019 (Demand-Context Flag Suppression Attack)
**Authority:** Tier 2.
**Pre-launch blocking gate:** Annex AI (Federated Ombuds) must be operational — Commissioner appointed, Oversight Panel seated, manufactured-flag criteria published — before AP becomes operative.

> **Drafting note (2026-04-25):** This annex was written from the existing P-015 specification in `Patch_Log.md` to close the dangling reference in the Patch Log mapping table. P-015 is currently `PROPOSED`; the annex is operative once P-015 is `ACTIVE` and the Annex AI pre-launch gate is satisfied.

---

## AP1 — False-Trigger Escalation Path (T-018)

Where a PCRP false trigger is accompanied by **either** oracle manipulation evidence **or** coordination timing signatures, the trigger:

- Does **not** count toward the 3-trigger audit cap.
- Escalates **immediately** to the enforcement track for formal investigation.
- Cap reset is available via independent audit finding of deliberate manipulation.

A **trigger-exhaustion alert** fires when 2 of 3 cap slots are consumed within a single quarter, prompting pre-emptive review by the Federated Ombuds before the third activation.

Escalation under AP1 requires **two independent evidence types** (oracle manipulation evidence AND timing cluster), not a single officer judgment, to prevent reverse weaponization (a genuine false trigger attributed to manipulation in order to avoid the audit cap).

## AP2 — Manufactured-Flag Assessment During Demand-Context Periods (T-019)

Ombuds co-certification during demand-context periods must include an explicit assessment of whether the triggering enforcement action was **manufactured or strategically timed**. This assessment is:

- A **required step**, not an optional judgment.
- Subject to a **defined 4-hour timeline** for determination.
- Published in the Article VII dashboard at the moment of determination.

If the Ombuds finds deliberate flag manufacture, the demand-context designation is lifted and PCRP activation proceeds at standard scope.

## AP3 — Cross-Register Timing Monitor

Any enforcement action initiated **within 48 hours of sentinel indicator movement** is flagged by an automated cross-register timing monitor. The flag does **not** block the enforcement action; it elevates scrutiny on any resulting demand-context flag and triggers AP2 with a heightened evidentiary requirement.

The monitor is a technical implementation requirement under Annex AI §3.3.

## AP4 — Conservative Default During AP2 Assessment

While the AP2 manufactured-flag assessment is running:

- The demand-context designation is **maintained** by default (do not pre-emptively lift).
- PCRP can activate at **reduced scope** with single-source authorization (rather than waiting on the 4-hour determination).
- Any reduced-scope activation is fully published within the 4-hour window and converted to standard-scope or revoked at the end of the assessment.

This default is conservative-toward-protection: a real harm condition does not wait for the assessment, but the broader public-coercion-risk machinery does.

---

## Dependencies

- Federated Ombuds (Annex AI) operational with manufactured-flag criteria published — this is the pre-launch blocking gate.
- P-006 PCRP false-trigger tracking infrastructure operative.
- P-012 demand-context flag register operative.
- Cross-register timing monitor (AI §3.3) technically implemented and tested.

## Amends

- Annex AC §AC2.3 — false-trigger cap rules (AP1 supersedes).
- Annex AE §AE2.4 — demand-context Ombuds certification procedure (AP2, AP4 supersede).

## New Risks

- AP1 escalation can be reverse-weaponized: a genuine false trigger attributed to manipulation to escape the cap. Mitigated by the dual-evidence requirement (oracle manipulation evidence AND timing cluster).
- AP2's 4-hour timeline creates time pressure that could produce errors. Mitigated by AP4's conservative default and reduced-scope activation pathway.

## Residual Risk

Real-time distinction between genuine oracle failure and engineered false trigger remains unreliable; the AP1 escalation path applies retroactively. Low-level demand-context flag suppression using a genuinely valid enforcement action remains possible — accepted as operational leakage below the detection threshold.

## Compound Linkages

- T-018 × T-019 — compound PCRP attack with both simultaneously executed is the highest-risk scenario. AP1+AP2 must be read together to address the compound case.
- T-018 × T-013 — audit load from false-trigger investigation consumes CRP capacity; trigger-exhaustion alert (AP1) is the early warning.

---

*This annex closes the structural component of T-018 and T-019. It is operative only after Annex AI's pre-launch gate is satisfied. Together with Annex AS (attestation-at-risk stake), it covers the PCRP attack surface identified in Sessions 7–9.*
