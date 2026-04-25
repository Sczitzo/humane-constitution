# Architecture — Drift Chain

**Status:** ACTIVE — Proposal 1 close-out, 2026-04-18
**Authority:** Tier 1 (H-3 Refounding Convention)
**Purpose:** Append-only hash chain of Tier 1 parameter state across time. Silent modification of the Tier 1 invariants produces a drift-chain divergence that any operating node can detect.

---

## What This Chain Covers

Each version row in the drift chain commits a SHA-256 hash over the canonical serialization of:
1. `architecture/parameter_registry.md` (this registry)
2. `Humane_Constitution.md` §0 (Scope, Assumptions, and Design Invariants)
3. `Annex Y §Y1` (Constitutional Survival Minimum — per-person daily minimums)
4. `/founding/commitments.md` (all Tier 1 rows, i.e., rows where `Tier = 1`)
5. `architecture/amendment_protocol.md` (recursive — the amendment protocol itself is Tier 1)

Canonical serialization rules:
- UTF-8 encoding.
- Unix line endings (LF, not CRLF).
- Leading / trailing whitespace stripped per line; intra-line whitespace preserved exactly.
- Files concatenated in the order listed above, separated by the ASCII file-separator character (0x1C).
- Trailing newline appended to each file before concatenation.

---

## Chain Structure

Each row is an append record with the following fields:

| Field | Description |
| :--- | :--- |
| `version` | Monotonically increasing integer, starting at 1 (genesis). |
| `date` | ISO-8601 date of version activation (for genesis: founding date). |
| `prior_hash` | SHA-256 hash of the prior version's full row (or `GENESIS` for version 1). |
| `state_hash` | SHA-256 hash of the canonical serialization of the five Tier 1 files per above. |
| `signatures` | The 7-of-9 signatures authorizing this version, each as a (holder_id, signature_bytes) pair. |
| `change_summary` | One-sentence plain-language description of what this version changed vs. prior. |
| `amendment_proposal_hash` | SHA-256 hash of the amendment proposal bundle (plain-language summary, redline, impact statements per amendment_protocol.md §2). |
| `timelock_entry_date` | Date when 7 signatures were first registered (timelock start). |
| `timelock_exit_date` | Date when amendment took effect (timelock start + FC-111 = +180 days). |

Each row is itself SHA-256 hashed; the hash is the `prior_hash` for the next row. This is a standard hash-chain construction — modifying any prior row invalidates the hash linkage of every subsequent row.

---

## Genesis Version

**Version 1 — 2026-04-18 (Protocol founding)**

| Field | Value |
| :--- | :--- |
| `version` | 1 |
| `date` | 2026-04-18 |
| `prior_hash` | `GENESIS` |
| `state_hash` | `TBD at founding event — computed by the founding coalition's multi-signature process` |
| `signatures` | 7 of 9 founding-coalition holders |
| `change_summary` | Protocol founding: establishes Annex Y CSM, `/founding/commitments.md` FC-001 through FC-122, architectural enforcement layer (invariants.md, amendment_protocol.md), and Annex AJ/AL/AQ/AS operative states. |
| `amendment_proposal_hash` | `TBD at founding event` |
| `timelock_entry_date` | N/A (founding not subject to timelock — the founding coalition's charter is itself the authority) |
| `timelock_exit_date` | 2026-04-18 |

**Note on founding:** The founding version is the only version permitted to bypass the timelock, because prior to the founding there is no pre-existing Tier 1 state to lock against. Every subsequent version (version 2 and later) is subject to the full amendment protocol including FC-111 timelock.

---

## Publication Requirements

The drift chain is **published** to a tamper-evident public ledger at all times. Acceptable ledger types:
- Public blockchain (Ethereum mainnet, Bitcoin OP_RETURN, or equivalent) — immutable by design; cost per row is small (a few bytes of hash data).
- Multi-host mirror with signed consistency attestations (e.g., the federated Ombuds' 5 sub-offices each publishing and counter-signing each version).
- Certificate-transparency-style append-only log operated by an independent body.

At least **two independent publication channels** are required so that a single compromised publisher cannot suppress a version or publish a forged version without producing an observable divergence between the channels.

Every operational component (Essential Access issuer, Voice scheduler, oracle gate, CSM dispenser, enforcement dashboard, identity ledger) queries **at least two publication channels** at startup and compares hashes. Mismatch between channels -> refuse-to-operate; alert to Article VII monitoring.

---

## Detection of Silent Tampering

If an adversary modifies any of the five Tier 1 files directly (editing invariants.md in place, or altering FC values in commitments.md without following the amendment protocol), the following happens:
1. The next operational-node startup computes the hash of the current file state.
2. This hash does not match the `state_hash` published at the drift chain's current head.
3. The node refuses to operate and alerts Article VII monitoring.
4. Article VII transparency infrastructure raises a **Category S** (structural integrity) alert, which under Annex AI requires a federated Ombuds investigation within 24 hours.
5. If the modification cannot be traced to a valid amendment-protocol process, it is treated as an **unauthorized modification** — operational nodes remain in refuse-to-operate state, and the federated Ombuds issues a drift-chain preservation notice restoring the last valid state from the public ledger.

This construction means that silent modification cannot persist — it is detected at the first operational-node startup after the modification, which under normal operation is within hours. The adversary must either complete a legitimate amendment through the M-of-N / timelock process, or their modification is visibly reverted and publicly logged.

---

## Relationship to Other Architecture Files

- **`invariants.md`** — the registry of Tier 1 parameters that are hashed into the chain.
- **`amendment_protocol.md`** — defines how new versions may be added.
- **`implementation_binding.md`** — specifies the startup hash-check requirement for operational components.

---

## Amendment of This Drift Chain Specification

Changes to this file (the chain structure, serialization rules, publication requirements, detection procedures) are themselves Tier 1 amendments per `amendment_protocol.md`. The drift chain records its own specification history as part of the chain it maintains — the spec is inside the thing it specifies.

---

*This document is part of the Humane Constitution's architectural-enforcement layer. Operative as of Proposal 1 close-out (2026-04-18).*
