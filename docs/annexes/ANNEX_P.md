# ANNEX P. Proof-of-Personhood, Identity Tradeoffs, and Red Lines
**Purpose.** Proof-of-personhood is load-bearing. The protocol therefore treats identity as a bounded tradeoff problem, not a solved technical detail. This Annex defines admissible solution classes, red lines, fallback defaults, and the selected constitutional stance for pilot and scale deployment.

### P1. Design goals and non-goals
- **Goal:** one person can hold only one active core civic identity at a time, without turning ordinary life into a surveillance trail.
- **Goal:** people lacking legacy documents, stable housing, or formal institutional records must still have a path to survival-floor protections and eventual full recognition.
- **Goal:** identity recovery must be possible after displacement, abuse, disaster, or data loss.
- **Non-goal:** perfect certainty. The protocol must tolerate bounded uncertainty and still fail safely.
- **Non-goal:** a single magical identity method. No single modality is assumed sufficient at constitutional scale.

### P2. Admissible solution classes and their failure modes
The protocol recognizes five broad identity evidence classes. None is sufficient alone; each carries a distinct exclusion risk, surveillance risk, and fraud risk.
- **State-backed records:** strong administrative legibility, but excludes the undocumented, the displaced, and people failed by incumbent systems.
- **Biometrics:** strong uniqueness signals, but creates permanent breach risk, coercion risk, and accessibility problems when used as the only path.
- **Social attestation / web-of-trust:** can help the undocumented and newly displaced, but can exclude the isolated and can be captured by clique behavior.
- **Device or hardware credentials:** useful for continuity and account recovery, but weak as sole personhood proof because devices can be lost, stolen, shared, or concentrated.
- **Service-history and residency traces:** useful for continuity and localized verification, but can recreate surveillance if over-collected or centrally fused.

### P3. Selected protocol stance: layered hybrid identity
The Protocol adopts a layered hybrid approach rather than choosing a single identity doctrine.
- **No person is required** to rely on only one class of evidence.
- **No one class of evidence** may become the sole gate to survival-floor protections.
- **Full Core Resident activation** requires a threshold combination of evidence classes rather than a single decisive credential.
- **Biometrics**, if used at all, must be optional or secondary, revocable in their operational role, and never published as a reusable global identifier.
- **Identity verification** and activity monitoring must remain legally separated. The system may verify that a person exists and is continuous without creating a unified behavioral dossier.
- **The stricter the consequence** of a decision, the higher the evidentiary threshold and the stronger the appeal rights.

### P4. Status ladder and failure-safe defaults
- **Survival-Floor Personhood:** any person physically present is entitled to immediate life-preserving treatment, emergency food, emergency shelter triage, and emergency medical stabilization even before full identity resolution.
- **Provisional Personhood:** a time-limited status granted on weaker but reviewable evidence so displaced or undocumented persons are not trapped outside the system.
- **Core Resident Identity:** a fully activated status for ordinary Essential Access continuity, enterprise participation, and legal standing after threshold evidence and review.
- **Civic Activation:** Voice participation and Service Record eligibility remain separate and later-gated, so hurried identity decisions do not immediately shift civic power.
- **If the identity stack is uncertain**, the default is to preserve survival-floor protections while limiting higher-consequence privileges until review is completed.

### P5. Red lines
- No mandatory permanent biometric database as the sole path to personhood.
- No requirement that a person possess legacy state-issued documents in order to access survival-floor protections.
- No fusion of all identity evidence into a permanently queryable behavioral surveillance graph.
- No secret risk score may determine personhood, continuity, or queue priority.
- No irreversible identity denial without human review, recorded reasons, and appeal.

### P6. Pilot and scale gates
- No scale deployment may occur until the identity stack demonstrates acceptable Sybil resistance, false-positive control, false-negative control, and recovery performance in live pilots.
- Every pilot must publish exclusion rates, appeal outcomes, recovery times, breach incidents, and documented failure cases.
- If identity error rates exceed the published threshold for a protected group, scale-up pauses automatically until remediation is validated.

---

## P7 — Worked Identity Paths and Hard Cases (merged from former Annex W, 2026-04-25)

> **Provenance:** Annex W was retired in the 2026-04-25 review and merged here as P7. Annex P defines the tradeoff framework; this section shows how the non-biometric primary path works in hard real-world cases so implementation pressure does not invent bad shortcuts later. Annex W §W4 was a stub-titled section ("Undocumented long-term resident in a low-trust community") with no body content; it is omitted here.

### P7.1 — Stateless person with no formal civil registry trail

- Humane-floor protections activate immediately on presence plus basic triage.
- Provisional personhood may be established through a notarized community web-of-trust bundle, residence witness statements, service-contact history, and Ombuds-certified continuity interview rather than legacy state documents.
- Core Resident activation requires layered corroboration over time — for example, repeated service contact, stable locality evidence, independent witness renewal, and an adverse-claim challenge window — rather than a single impossible document demand.

### P7.2 — Trafficking survivor or coercively undocumented person

- The protocol treats document absence and inconsistent narrative as possible indicators of coercion, not automatic fraud.
- A protected interviewer, trauma-informed review path, and sealed corroboration channel must be available so the person is not forced to prove continuity using evidence controlled by the abuser.
- Biometrics, if used at all, remain optional accelerants rather than mandatory gates. Refusal of biometrics alone may not defeat survival-floor or provisional status.

### P7.3 — Disaster-displaced person with interrupted records

- Emergency continuity may rely on disaster rosters, shelter logs, utility-disruption records, family-link corroboration, and cross-regional service traces until normal records recover.
- Recovery performance is measured by time to restore continuity without forcing the person into a unified behavioral dossier assembled from every emergency interaction.

---
