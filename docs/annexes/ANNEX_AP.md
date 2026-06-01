# ANNEX AP — PCRP Attack Surface Hardening

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Harden the Public Coercion Response Protocol against two known attack vectors: exhausting its trigger cap with manufactured false alarms, and suppressing it with strategically timed enforcement flags. |
> | **Who it protects** | People experiencing genuine public coercion whose protection is diluted or blocked because adversaries have gamed the PCRP trigger and demand-context mechanisms. |
> | **Failure risk** | False-trigger exhaustion (T-018): adversary floods the PCRP cap with manufactured triggers, leaving no audit capacity when real coercion occurs. Demand-context suppression (T-019): a strategically timed enforcement action is used to block PCRP activation during a genuine coercion event. |
> | **Evidence status** | Active — unproven |
> | **Linked risks** | T-018 (PCRP False-Trigger Exhaustion); T-019 (Demand-Context Flag Suppression); P-015; Annex AI (Federated Ombuds); Annex AS (attestation-at-risk) |

> **Provenance:** Implements [P-015 — PCRP Attack Surface Hardening] · Addresses T-018 and T-019 · Status: **ACTIVE**

**Status:** ACTIVE | **Priority:** High | **Patch:** P-015
**Threats addressed:** T-018 (PCRP False-Trigger Exhaustion Attack), T-019 (Demand-Context Flag Suppression Attack)
**Authority:** Tier 2.
**Pre-launch blocking gate:** Annex AI (Federated Ombuds) must be operational — at least four of five sub-Ombuds appointed, challenged, and seated; the Oversight Assembly seated; and manufactured-flag criteria published — before AP becomes operative.

> **Drafting note (2026-04-25):** This annex was written from the existing P-015 specification in `Patch_Log.md` to close the dangling reference in the Patch Log mapping table. P-015 is now `ACTIVE`; the operative pre-launch gate remains: Annex AI (Federated Ombuds) must be operational — at least four of five sub-Ombuds appointed, challenged, and seated; the Oversight Assembly seated; and manufactured-flag criteria published — before the AP clauses produce live enforcement effects.

---

## AP1 — False-Trigger Escalation Path (T-018)

Where a PCRP false trigger is accompanied by **either** oracle manipulation evidence **or** coordination timing signatures, the trigger:

- Does **not** count toward the 3-trigger audit cap.
- Escalates **immediately** to the enforcement track for formal investigation.
- Cap reset is available via independent audit finding of deliberate manipulation.

*Cap-reset audit procedure: The Federated Ombuds (ANNEX_AI) is the responsible authority for cap-reset audits. Upon a credible written allegation of deliberate manipulation — submitted by any affected party, oracle node operator, or Duty Sub-Ombuds — the Federated Ombuds must open a formal cap-reset audit within 7 days and publish findings within 30 days of opening. The evidentiary standard is clear and convincing evidence that the cap activations were deliberately engineered rather than the result of genuine operational failure. During the audit period, the affected party's cap counter is frozen at its current count — neither advancing nor resetting — until the audit concludes. A finding of deliberate manipulation resets the cap to zero and publishes the full audit record. A finding of no manipulation leaves the cap count unchanged and closes the audit.*

*Restorative remedy on a no-manipulation finding: Where an alarm was escalated to the enforcement track under AP1 as possibly manufactured but the cap-reset audit finds no manipulation, the escalation is not merely closed — it is unwound. The no-manipulation finding formally withdraws the escalated party's enforcement-track referral and corrects and expunges the escalation record, so that an honest alarm-raiser carries no residual mark of having been investigated. The Federated Ombuds publishes a correction of equal prominence to the original escalation notice and confirms the expungement in the audit record. The standard is restoration of the vindicated party, not mere acquittal: no honest cry for help leaves the person who raised it worse-positioned than before they spoke.*

A **trigger-exhaustion alert** fires when 2 of 3 cap slots are consumed within a single quarter, prompting pre-emptive review by the Federated Ombuds before the third activation.

Escalation under AP1 requires **two independent evidence types** (oracle manipulation evidence AND timing cluster), not a single officer judgment, to prevent reverse weaponization (a genuine false trigger attributed to manipulation in order to avoid the audit cap).

## AP2 — Manufactured-Flag Assessment During Demand-Context Periods (T-019)

Ombuds co-certification during demand-context periods must include an explicit assessment of whether the triggering enforcement action was **manufactured or strategically timed**. This assessment is:

- A **required step**, not an optional judgment.
- Subject to a **defined 4-hour timeline** for determination.
- Published in the Article VII dashboard at the moment of determination.

If the Ombuds finds deliberate flag manufacture, the demand-context designation is lifted and PCRP activation proceeds at standard scope.

The protocol publishes and tracks the base rate of "manufactured" findings against genuine-failure findings over time, across both the AP1 manipulation determinations and the AP2 manufactured-flag assessments. The anti-false-alarm machinery is itself watched: a rising "manufactured" rate is treated not as success but as an early warning that the tool meant to filter false alarms may be being turned against genuine cries. A sustained rise above the published baseline triggers a Federated Ombuds review of the manufactured-finding criteria and of the officers applying them, on the presumption that the burden is on the system to prove it is not silencing the genuinely harmed.

## AP3 — Cross-Register Timing Monitor

Any enforcement action initiated **within 48 hours of sentinel indicator movement** is flagged by an automated cross-register timing monitor. The flag does **not** block the enforcement action; it elevates scrutiny on any resulting demand-context flag and triggers AP2 with a heightened evidentiary requirement.

The monitor is a technical implementation requirement under Annex AI §3.3.

## AP4 — Conservative Default During AP2 Assessment

While the AP2 manufactured-flag assessment is running:

- The demand-context designation is **maintained** by default (do not pre-emptively lift).
- PCRP can activate at **reduced scope** with single-source authorization (rather than waiting on the 4-hour determination).
- Any reduced-scope single-source activation **names the single source on the Article VII dashboard at the moment of activation** — not only in the later 4-hour publication. Authorization that does not identify its source is not a valid single-source activation. Naming the source at activation deters manufactured single-source pretexts by placing the authorizing identity on the public record before the assessment concludes.
- Any reduced-scope activation is fully published within the 4-hour window and converted to standard-scope or revoked at the end of the assessment.

This default is conservative-toward-protection: a real harm condition does not wait for the assessment, but the broader public-coercion-risk machinery does.

---

## Dependencies

- Federated Ombuds (Annex AI) operational with at least four of five sub-Ombuds seated, Oversight Assembly seated, and manufactured-flag criteria published — this is the pre-launch blocking gate.
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

Real-time distinction between genuine oracle failure and engineered false trigger remains unreliable; the AP1 escalation path applies retroactively. Low-level demand-context flag suppression using a genuinely valid enforcement action remains possible — accepted as operational leakage below the detection threshold. So that this accepted residual does not silently grow, suspected sub-threshold suppressions are logged even when they are not actioned. The log is reviewed periodically by the Federated Ombuds for drift in volume or pattern; an accepted leakage that begins to accumulate is no longer an accepted leakage, and a rising log compels reassessment of the detection threshold itself.

## Compound Linkages

- T-018 × T-019 — compound PCRP attack with both simultaneously executed is the highest-risk scenario. AP1+AP2 must be read together to address the compound case.
- T-018 × T-013 — audit load from false-trigger investigation consumes CRP capacity; trigger-exhaustion alert (AP1) is the early warning.

---

*This annex closes the structural component of T-018 and T-019. It is operative only after Annex AI's pre-launch gate is satisfied. Together with Annex AS (attestation-at-risk stake), it covers the PCRP attack surface identified in Sessions 7–9.*
