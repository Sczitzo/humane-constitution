# Annex AN — Pilot External Validity Gate

**Status:** PROPOSED | **Priority:** Med-High | **Patch:** P-019
**Threat addressed:** T-023 (Pilot External Validity Collapse)
**Authority:** Tier 2. Strengthening (more conditions, larger window) is Tier 2; weakening (removing a stress condition, shortening the challenge window) is Tier 1.

> **Drafting note (2026-04-25):** This annex was written from the existing P-019 specification in `Patch_Log.md` to close dangling references in `Threat_Register.md` (T-023) and `docs/Annual_Compound_Simulation.md` (the crisis-simulation mandate at line 200).

---

## AN1 — Stress-Condition Pilot Gate

Scale-up approval requires the pilot evidence record to include at least one each of the following observed during the pilot period:

1. **Economic stress event** — recession, significant unemployment spike, or supply price shock affecting the pilot region.
2. **Compound supply disruption** — two or more essential categories simultaneously below adequate levels.
3. **Documented operation during a formal political opposition campaign** against the system.

A scale-up vote may not proceed unless either (a) the evidence record contains direct observation of each condition, or (b) the record qualifies under AN2 (substitute-evidence pathway) for any condition that could not be observed in the pilot window.

## AN2 — Substitute-Evidence Pathway

Where a stress condition could not be observed during the pilot, the evidence record must include all four of:

- (a) Explicit documentation of why the condition could not be tested.
- (b) A designated substitute evidence source — analogous case from another jurisdiction, archival data, red-team analysis, or adversarial simulation result.
- (c) A residual-risk statement acknowledging the gap.
- (d) A post-scale monitoring commitment specific to the untested condition, with named metrics, cadence, and trigger thresholds for rollback.

Substitute evidence does not equal direct observation. Scale-up under AN2 is permitted only when the substitute is judged by the red-team challenge process (AN3) to be of sufficient quality.

## AN3 — Red-Team Challenge Window

Before any scale-up vote, a mandatory **30-day adversarial challenge window** is opened. During the window:

- Independent reviewers may contest the external validity of the evidence base.
- Challengers must have access to the **full evidence record**, not merely the summary.
- Responses to challenges are published before the vote.
- A challenge that proposes a specific residual-risk mitigation must be addressed on the record (accepted, rejected with reasons, or accepted with modification).
- A challenge that merely objects without proposing mitigation is logged but does not block the vote.

The challenge window is administered by the body conducting the FAP for the scale-up proposal, with operational independence per Annex AV (two-key precondition).

## AN4 — Crisis Simulation Mandate

The Annual Compound Simulation (Annex T) must include **at least one compound-crisis scenario not previously simulated** before each scale-up gate. The talent-drain scenario and civic-legibility scenario added in the most recent simulation cycle satisfy this requirement for the first scale-up gate only; subsequent gates require additional novel scenarios.

The simulation report must be published not less than 60 days before the scale-up vote so that AN3 challengers can engage with it.

## AN5 — Cross-References

- Annex T — annual simulation mandate is amended by AN4.
- Formal Acceptance Protocol — scale-up gate evidence requirements amended by AN1–AN3.
- Annex AG (P-013) — representativeness standard for pilots is the precondition; AN1 is the scale-up condition.
- Annex AV — the FAP intake gate for any `modifies_tier1=True` companion proposal during scale-up applies.

---

## Dependencies

- Annual Compound Simulation must be updated with a novel scenario for each scale-up gate.
- Red-team challenge infrastructure (independent reviewer access portal, response publication channel) must be operational.
- Post-scale monitoring commitments under AN2(d) must be tracked in the Article VII dashboard.

## New Risks

- AN1 stress-condition requirement may delay scale-up indefinitely if adverse conditions do not occur in the pilot region within a reasonable window. Mitigated by AN2 substitute pathway, which permits good-faith engagement with external validity rather than requiring a manufactured crisis.
- AN3 challenge window is a blocking mechanism. Mitigated by the requirement that challengers propose specific residual-risk mitigations, not merely object.
- AN2(b) substitute evidence may be of low quality. Mitigated by AN3 challenge process, which has access to the full evidence record.

## Residual Risk

Some external-validity gaps cannot be filled by any pilot. A deliberately engineered crisis to satisfy AN1 would satisfy the letter but not the spirit of P-019. Ultimate residual: the evidence base for a system of this scale will always be incomplete. The gate buys quality and surfacing of gaps; it cannot guarantee correctness.

---

*This annex closes T-023 (Pilot External Validity Collapse). It integrates with Annex T (annual simulation), Annex AG (P-013 representativeness), and the FAP scale-up procedure.*
