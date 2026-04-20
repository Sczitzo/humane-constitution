# Architecture — Implementation Binding

**Status:** ACTIVE — Proposal 1 close-out, 2026-04-18
**Authority:** Tier 1 (H-3 Refounding Convention)
**Purpose:** Binding requirement that every operational component of the Humane Constitution verifies the current drift-chain state before operation. Without this binding, the architectural-enforcement layer (`invariants.md`, `amendment_protocol.md`, `drift_chain.md`) is only as strong as the implementors' discipline.

---

## Components Bound by This Requirement

Every operational component whose behavior depends on Tier 1 parameters must implement the startup check defined here. Non-exhaustive list:

| Component | What it reads from Tier 1 |
| :--- | :--- |
| **LC Issuance Service** | CSM basket values (Annex Y §Y1); reserve window (FC-070); acceptable measurement error thresholds (FC-001, FC-002, FC-004, FC-005) |
| **Oracle Cohort Gate** | N_MIN (FC-030); methodology class minimum (FC-031); pairwise correlation max (FC-032); adversarial seat minimum (FC-033); quorum-loss restoration window (FC-100) |
| **DW/CR Scheduler** | Sector ceiling (FC-060); per-person cap (FC-061); decay rate (FC-062); Protected Pause floor (FC-020) |
| **SQ Activator** | Oracle quorum thresholds; CSM-cluster failure threshold (FC-071); Annex AQ conservative hold logic |
| **CSM Dispenser (Annex Y §Y2)** | All Category A parameters from invariants.md; governance-actor-independent issuance rule |
| **Enforcement Panel dashboard** | Penalty multipliers (FC-040); detection assumptions (FC-041); leakage thresholds (FC-010); severity matrix (Annex AJ §4.2) |
| **Attestation Stake Engine** | Stake ratio (FC-080); audit window (FC-081); graph density threshold (FC-082) |
| **Ombuds Coordination Service** | Sub-count minimum (FC-090); supermajority threshold (FC-091); term length (FC-092) |
| **Identity Ledger** | Amendment-authority controls over identity schema changes |
| **Amendment Registry** | Signature threshold (FC-110); timelock (FC-111); holder identities and keys |
| **P0 Exit Coordinator** | Supermajority threshold (FC-120); unwind window (FC-121); subsidiarity scale definitions (FC-122) |

---

## The Startup Check — Required Sequence

Every bound component, on startup and on a recurring schedule (every 24 hours minimum), executes:

1. **Fetch drift chain head from ≥ 2 independent publication channels** (per `drift_chain.md §Publication Requirements`).
2. **Verify inter-channel consistency** — the `state_hash` reported by each channel must match. Mismatch -> abort startup; alert Article VII monitoring with `DRIFT_CHAIN_CHANNEL_DIVERGENCE`.
3. **Compute local Tier 1 state hash** — canonical serialization of the five Tier 1 files per `drift_chain.md §What This Chain Covers`.
4. **Compare local hash to drift-chain head** — match required. Mismatch -> abort startup; alert Article VII monitoring with `DRIFT_CHAIN_LOCAL_DIVERGENCE`.
5. **Verify holder-signature validity** — confirm the head row carries 7 distinct valid signatures from current holders (using the public holder-keys registry, which is itself Tier 1 and hashed into the chain).
6. **Verify timelock compliance** — the head row's `timelock_exit_date` must be on or before the current date. If not, the head row is a proposed-but-not-effective version; the component operates against the prior effective version.
7. **Pin the effective state hash** to the component's local cache; all subsequent Tier 1 parameter reads during this session use this pinned reference.

If any step fails, the component **refuses to perform operations that depend on Tier 1 parameters**. Specifically:
- LC Issuance Service: refuses to issue new LC entitlements but continues to honor prior issuance already in user accounts (so outages do not starve recipients).
- Oracle Gate: reports oracle status as "unknown" for measurement-gated SQ decisions; §Annex AQ Conservative Hold applies until resolved.
- CSM Dispenser: **continues to operate against the last verified state** — the humane floor is unconditional (Annex Y §Y5) and cannot be interrupted by drift-chain verification failure. This is the explicit exception. Any other component shuts down; CSM continues.
- Enforcement Panel dashboard: holds pending actions; does not issue new findings.
- Amendment Registry: refuses to accept new proposals until restored.

---

## Why CSM Is the One Exception

The drift-chain verification is designed to protect Tier 1 invariants from unauthorized modification. If it fails, the safe default is to stop operating until the situation is resolved. For most components, stopping is safer than operating with possibly-corrupted parameters.

For CSM, this calculation inverts: stopping CSM dispensation starves the people the protocol exists to protect. If drift-chain verification fails while CSM is active, the risk of continuing with possibly-corrupted parameters is bounded (CSM is already at the designed floor; it cannot be silently narrowed below the floor because it is itself hashed into the chain at the last verified state). The risk of stopping is unbounded (people die).

Therefore: **CSM continues operating against the last verified state**, and drift-chain resolution proceeds in parallel through the federated Ombuds emergency-response process. The architectural layer protects against silent narrowing of CSM; the implementation binding ensures that even when the protection itself is under attack, CSM does not become collateral damage.

This exception is itself a Tier 1 commitment and cannot be removed without the full amendment protocol.

---

## Operator-Side Pinning

Each operator of a bound component maintains:

1. **A pinned reference** — the `state_hash` they expect to verify against. This is updated through operator procedure whenever a valid new drift-chain version is published. The pinned reference is stored locally with integrity protection (signed by the operator's own key; stored in a tamper-evident store).

2. **A pin-update procedure** — the operator's own procedure for adopting new pinned references when the drift-chain advances. This procedure:
   - Verifies the new drift-chain version via ≥ 2 publication channels.
   - Verifies the signatures on the new version against the public holder-keys registry.
   - Verifies that the version's timelock has expired (for effective versions) or is within window (for proposed versions).
   - Updates the pinned reference with a new local signature and archives the prior pinned reference in the operator's audit log.

3. **An audit log** — append-only record of every pinned-reference update with the operator's signature, the prior reference, and the new reference. This audit log is itself subject to random inspection by the federated Ombuds (Annex AI) and the Enforcement Panel.

Operators who fail to update pinned references within 30 days of a new effective drift-chain version are out of compliance. Compliance failures are not penalized by removing them from service (that would create a denial-of-service surface on operators), but compliance reports are published as part of the Article VII transparency layer.

---

## Why This Binding Must Be Architectural, Not Procedural

A procedural rule that says "operators should verify the drift chain" is only as strong as operators' willingness to follow it. A captured operator, a lazy operator, or an operator pressured by a governance body to "skip the check this once" can quietly deviate.

The architectural binding closes this gap by making the check part of the **software contract** — a bound component that does not perform the startup check is by definition not a compliant implementation. Reference implementations of each component ship with the check built in; third-party implementations must implement the check to be accredited.

This means capture of the software supply chain itself becomes a specific attack vector. Defenses:
- Reference implementations are published as open source with reproducible builds.
- Binary distributions are signed by a multi-party signing authority separate from the Tier 1 holder set.
- Operators are required (through Annex AI and the federated Ombuds) to publish the hashes of their deployed binaries for public verification.
- Third-party implementations undergo certification that includes an adversarial code review of the startup-check code path.

---

## Governance

This document is Tier 1 protected per `invariants.md`. Changes require the full amendment protocol per `amendment_protocol.md`. The list of bound components (above) may be extended by ordinary amendment (Tier 2) to add new components as the protocol grows — new entries **can only strengthen** the binding (add more components to the check), never weaken it (remove components or soften the check). Weakening requires Tier 1 amendment.

---

*This document is part of the Humane Constitution's architectural-enforcement layer. Operative as of Proposal 1 close-out (2026-04-18). It is the bridge between the cryptographic commitments in `invariants.md` / `drift_chain.md` and the running operational components that must respect them.*
