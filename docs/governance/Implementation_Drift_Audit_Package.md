# Implementation Drift Audit Package

This package defines how the project should test whether its hard locks, drift chain, parameter registry, amendment protocol, and implementation binding actually prevent quiet constitutional drift.

It is not a claim that cryptography makes the system incorruptible. It is an audit package for proving, or falsifying, whether unauthorized drift is detectable, public, and correctable before it becomes normal operation.

---

## Honest Claim Boundary

The current honest claim is:

> The project contains a designed tamper-evidence layer for Tier 1 rules: parameter hashes, a drift chain, threshold signatures, a timelock, and startup verification by bound components.

The project should not yet claim:

- Tier 1 invariants are cryptographically guaranteed in practice;
- silent drift is impossible;
- the 7-of-9 holder set cannot be captured, coerced, bribed, or socially coordinated;
- software supply-chain compromise is solved;
- operators will always run compliant implementations;
- a lawful hostile amendment cannot pass through the valid process.

The design is credible only if independent reviewers can reproduce the hashes, verify the publication channels, test startup refusal, audit key custody, and see a public response when drift is detected.

---

## External Evidence Base

| Source | What it contributes | Limit |
|---|---|---|
| [NIST FIPS 180-4 Secure Hash Standard](https://www.nist.gov/publications/secure-hash-standard) | Secure hash functions can generate message digests that detect whether content changed after the digest was generated. | Hashes detect change; they do not decide whether a change is legitimate, safe, or politically captured. |
| [RFC 6962 Certificate Transparency](https://www.rfc-editor.org/rfc/rfc6962) | Append-only Merkle logs, audit paths, consistency proofs, and signed public log structures are real integrity patterns. | Certificate Transparency is not this project's drift chain and does not prove monitor participation. |
| [NISTIR 8214 Threshold Schemes for Cryptographic Primitives](https://www.nist.gov/publications/threshold-schemes-cryptographic-primitives) | Threshold schemes distribute cryptographic operations so compromise of fewer than a threshold number of components need not compromise the whole. | Threshold cryptography does not solve holder selection, social coercion, bribery, or governance legitimacy. |
| [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) | Key management requires lifecycle controls, metadata protection, access control, inventory, and operational discipline. | It does not certify this project's key custody or recovery process. |
| [OpenZeppelin TimelockController documentation](https://docs.openzeppelin.com/contracts/4.x/api/governance) | Timelocks are a practitioner pattern for delaying privileged changes and creating a response window. | Smart-contract timelocks do not establish constitutional legitimacy or prove that 180 days is the right window. |

---

## Abuse Model

| Abuse path | What the actor wants | Why it matters |
|---|---|---|
| Direct file edit | Change a Tier 1 value without using the amendment protocol. | Tests whether startup checks and public hashes catch unauthorized modification. |
| Publication-channel split | Publish different drift-chain heads to different audiences. | Tests whether two-channel verification detects equivocation. |
| Keyholder capture | Coerce or reward enough holders to sign a hostile change. | Tests whether dispersion, disclosure, and timelock response work. |
| Keyholder blockade | Capture three holders to block needed improvements. | Tests whether protection becomes paralysis. |
| Software bypass | Ship a component that ignores the startup check. | Tests whether implementation binding has real accreditation teeth. |
| Supply-chain compromise | Distribute binaries that report compliant hashes while running different logic. | Tests reproducible builds, signature separation, and operator verification. |
| Emergency override pressure | Ask operators to skip checks during crisis. | Tests whether "temporary" exceptions become a drift route. |
| Timelock normalization | Pass a hostile lawful amendment and wait out the public response window. | Tests whether exit, public challenge, and Ombuds reports are meaningful. |

---

## Required Audit Sequence

### Stage 0 - Coverage Inventory

List every file, parameter, article section, annex section, generated artifact, and runtime component that should be covered by the drift layer.

Failure criterion: any Tier 1 rule affects operation but is absent from the covered set or cannot be traced to a protected commitment.

### Stage 1 - Reproducible Hash Test

Independent reviewers must reproduce the canonical serialization and state hash from a clean checkout.

Failure criterion: two honest reviewers cannot reproduce the same hash using the published rules.

### Stage 2 - Append-Only Log Test

Publish a simulated version change and require monitors to verify prior hash, new state hash, signatures, amendment bundle hash, and consistency with earlier history.

Failure criterion: a changed prior row can be accepted without visible chain breakage.

### Stage 3 - Multi-Channel Equivocation Test

Serve different drift-chain heads on different publication channels and verify that bound components refuse affected operations.

Failure criterion: a component accepts one channel silently or operates through channel divergence without alert.

### Stage 4 - Startup Refusal Test

**Required input:** A completed Stage 0 Coverage Inventory listing all Tier 1-protected files and bound components. Stage 4 cannot produce a meaningful pass/fail result without this inventory. If Stage 0 has not been completed, Stage 4 must be deferred and recorded as BLOCKED in the audit log.

**Expected sources for the coverage inventory:**
- `architecture/drift_chain.md` — canonical list of Tier 1-protected files and their hash roots
- `docs/governance/Parameter_Calibration_Register.md` — parameters whose values are Tier 1 protected (see "Binding Condition" column: entries bound by Tier 1 or FC-110/FC-111)
- `docs/constitution/INVARIANTS.md` — invariants that bound components must enforce at startup
- Deployment manifest (produced at activation) — list of bound components and their startup verification hooks

**Test procedure:** For each Tier 1-protected file listed in the Stage 0 inventory, modify its content locally (without following the amendment protocol), then start each bound component listed in the inventory.

Failure criterion: any Tier 1-dependent component operates on the modified state without raising the required alert, except the CSM last-verified-state exception (which allows the survival floor to continue operating on the last verified state during a detected drift event).

### Stage 5 - Key-Custody Review

Audit holder identity, dispersion, conflict disclosures, key storage, rotation, emergency rotation, succession, and coercion reporting.

Failure criterion: holder concentration, undisclosed affiliation, or weak key recovery makes 7-of-9 easier to manufacture than the design assumes.

### Stage 6 - Timelock Response Drill

Simulate a hostile but procedurally valid Tier 1 amendment entering the 180-day window.

Required outputs:

- Ombuds integrity report;
- public comment archive;
- counter-amendment path;
- exit notice rehearsal;
- plain-language public explanation;
- holder revocation test;
- final residual-risk statement.

Failure criterion: the public response window exists on paper but affected communities cannot understand, challenge, exit, or organize before effect.

### Stage 7 - Supply-Chain Bypass Test

Attempt to ship a non-compliant implementation that skips drift checks or reports false compliance.

Failure criterion: the implementation can become accredited, deployed, or widely trusted without reproducible build verification and independent code review.

---

## Minimum Evidence Before Stronger Claim

The project may strengthen its claim only after producing:

- covered-state inventory;
- reproducible hash report;
- append-only log consistency test;
- publication-channel divergence drill;
- bound-component startup refusal results;
- keyholder custody and conflict audit;
- timelock response drill;
- supply-chain bypass review;
- residual-risk update in the Claims and Evidence Register.

---

## Decision Rule

The drift layer remains **designed mechanism, needs implementation audit** unless unauthorized change is reliably detected, valid change is publicly reviewable, and non-compliant software cannot become accredited without visible exception.

If any stage fails, the failure becomes an Open Problems Resolution Docket item and the affected architecture file must be revised before the project claims Tier 1 drift is controlled.

---

## Pre-Succession Drift Signal Requirements

**Purpose:** The most consequential drift scenario is not technical misconfiguration — it is a legitimate successor government that inherits the system and gradually hollows it out while maintaining formal compliance. Drift detection must include signals that fire before hollowing becomes irreversible, not after.

**Required signals — all must be active and publishing before any government succession handoff is certified as complete:**

**Signal S1 — Oracle node count:**
The oracle network must meet or exceed FC-030 minimum (5 nodes per cohort) on the day of succession. If oracle count has dropped below minimum at any point in the 90 days before succession, the Implementation Drift Audit Package flags this as a T-022 Administrative Hollowing precursor event, and the Constitutional Integrity Panel (CIP, Annex AM §AM8) is automatically notified.

**Signal S2 — Post-mortem publication continuity:**
The public post-mortem publication schedule must show no gap exceeding 30 days in the 180 days before succession. A gap triggers an automatic CIP review under the AM3 hollowing triggers. The Capture Dashboard must show the post-mortem publication record as a real-time metric.

**Signal S3 — Founding institution seat vacancy:**
No founding institution seat (Federated Ombuds, Constitutional Integrity Panel, oracle adversarial seat) may be vacant for >90 days as of the succession date. Vacancies exceeding 90 days as of succession day are flagged as potential T-022 administrative capture and logged in the drift audit before the successor government takes office.

**Signal S4 — Tier 1 hash integrity:**
The cryptographic hash of all Tier 1 documents (Humane Constitution, INVARIANTS, Founding Commitments Tier 1 rows) must be verified against the bound reference hashes and published in the drift audit within 7 days before succession. Any hash mismatch is a succession blocker — succession cannot be certified until the mismatch is explained and resolved.

**Signal S5 — Enforcement Panel publication record:**
The Enforcement Panel must have published at least 4 Annual Deterrence Audits (one per year) if the system has been running for 4+ years, or one per year of operation. A gap in the publication record before succession is logged as a T-022 precursor. The new government inherits the publication obligation with no grace period.

**Signal S6 — Essential Access continuity confirmation:**
On the day of succession, an independent confirmation (not self-reported by the outgoing government) must verify that Essential Access issuance and delivery are operating above the CSM floor for all enrolled persons. If any category is below floor, succession is not blocked but the status is published with the succession record and triggers a mandatory 30-day continuity review by the Constitutional Integrity Panel.

**Succession certification block:** Signals S1 through S4 are hard blocks — succession is not certified until each signal is confirmed green. Signals S5 and S6 are soft flags — succession proceeds, but the flags are published and the CIP begins a mandatory 90-day review.

**Responsibility:** The drift audit for succession purposes is conducted by the Constitutional Integrity Panel (Annex AM §AM8), not by the outgoing or incoming government. The incoming government receives a copy of the audit findings on day 1 of office.

---

## Residual Risk

Tamper evidence is not anti-corruption magic. It raises the cost of hidden change; it does not make holders virtuous, operators honest, or lawful hostile amendment impossible. The strongest honest claim is narrower: quiet drift should become visible fast enough that people can challenge, exit, or restore the last valid state.
