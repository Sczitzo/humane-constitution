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
