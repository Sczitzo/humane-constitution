# ANNEX AZ — Tier 0 Token Mechanism

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Define the constitutional constraints that any Tier 0 pseudonymous single-session token mechanism must satisfy, ensuring open-floor survival access cannot be used to track, identify, or surveil the persons it serves. |
> | **Who it protects** | Any person accessing the Constitutional Survival Minimum without providing or confirming real-world identity — particularly persons in safety situations, undocumented persons, and anyone exercising the right not to disclose identity at the survival tier. |
> | **Failure risk** | Token-issuance infrastructure is compromised and used to reconstruct session linkage; tokens become durable tracking identifiers; the open-floor promise of pseudonymous access is satisfied on paper but not in practice. |
> | **Evidence status** | Designed |
> | **Linked risks** | INV-001 (survival access not conditioned on identity); INV-LAUNCH-1 (pre-launch blocking gate); ANNEX_AK §AK8 (two-tier access model); ANNEX_AX (safety-shielded enrollment) |

> **Scope note.** This annex previously contained a progressive net-worth demurrage architecture (§AZ1–AZ3). That content was superseded, and [ANNEX_D](./ANNEX_D.md) now governs Commons Return and Universal Stake. This annex now exists only for the Tier 0 token mechanism constitutional framework (§AZ1 below). No demurrage content is present or intended here.

> **Provenance.** The Tier 0 token framework was originally drafted in the P0-A adversarial audit remediation batch (2026-05-15) to resolve the pre-operational gate in INV-LAUNCH-1. The demurrage sections (former §AZ1–AZ3) were deleted in a subsequent commit; the Tier 0 token framework was not demurrage content and was restored here as §AZ1 to keep the INV-LAUNCH-1 gate intact.

---

## AZ1 — Tier 0 Token Mechanism (Constitutional Framework)

A Tier 0 token is an access authorization artifact for pseudonymous single-session CSM allocation. It is not identity, not currency, not reputation, and not transferable governance power.

**Issuance conditions.** A Tier 0 token is issued when the access node has enough session-level assurance to prevent obvious duplicate same-session allocation without requiring real-world identity disclosure. Provisional personhood confirmation may satisfy that assurance, but it is not a precondition for emergency survival access. Full identity verification is not required at Tier 0. The issuance process must not require disclosure of real-world identity.

**Survival-floor precedence.** The Tier 0 token is an accounting and anti-duplication tool for pseudonymous CSM allocation; it is never a precondition of the survival floor. A person who is physically present but not yet even provisionally confirmed must not fall into a gap. The physically-present emergency survival path of [ANNEX_P](./ANNEX_P.md) §P4 (Survival-Floor Personhood), which requires no token and no identity confirmation, and the full Constitutional Survival Minimum of [ANNEX_Y](./ANNEX_Y.md), which attaches to physical presence, are available without and prior to any Tier 0 token issuance. Survival access never waits on token issuance or on provisional personhood confirmation. No node may withhold, delay, or condition the survival floor on the existence, validity, or issuance of a Tier 0 token.

**Scope.** A Tier 0 token authorizes CSM basket allocation only. It does not authorize civic participation, governance voting, office eligibility, ownership, currency conversion, reputation attribution, or any upgrade of identity status.

**Lifetime.** A Tier 0 token is single-session. Reissuance requires the same provisional confirmation process; tokens may not be indefinite.

**Pseudonymity requirement.** The token mechanism must not create real-world identity linkage at Tier 0. A Tier 0 token must not become a durable tracking identifier. The specific cryptographic or technical mechanism that satisfies these constraints is delegated to the TSP designated for this mechanism.

**Non-aggregation requirement.** The token cannot be aggregated across sessions. No persistent identifier is created. The issuing node records only that one CSM allocation was consumed from available capacity — not by whom.

**Session-linkage prohibition.** The token mechanism must be designed so that token-issuance infrastructure cannot reconstruct session linkage after the session closes. This is a constitutional constraint, not a technical recommendation; no TSP implementation that fails this constraint is compliant regardless of endorsement.

**Audit trail.** The token mechanism must produce an audit artifact recording issuance, expiration, scope, and revocation status for each token without exposing the real-world identity of the token holder.

**TSP responsibility.** The technical implementation — including cryptographic scheme, issuance oracle, pseudonymity guarantees, and audit infrastructure — is delegated to the TSP designated for Tier 0 identity and access. The TSP must satisfy all constitutional constraints in this section. No implementation that fails any constraint above is compliant regardless of TSP endorsement.

**Pre-launch gate.** Launch remains blocked under INV-LAUNCH-1 until:
1. This section exists in the corpus (constitutional-spec condition — satisfied by this annex); and
2. The TSP responsible for implementing the Tier 0 token mechanism has been formally assigned (TSP-assignment condition — **not yet complete** as of corpus date; see `docs/governance/Federated_Ombuds_Constitution_Packet.md`).

Both conditions must be confirmed before INV-LAUNCH-1 can be cleared.

**Operational-claim constraint.** Pseudonymous Tier 0 access is DESIGNED, not operational, until both of the following hold: (1) the TSP responsible for the Tier 0 token mechanism is formally assigned; and (2) the session-linkage prohibition above is demonstrated in implementation — verified in a deployed mechanism — rather than merely specified in this annex or in a TSP document. Until both hold, no pilot, deployment, communication, or governance representation may claim that operational pseudonymous Tier 0 access exists, is available, or is in effect. A specification of pseudonymity is not a demonstration of pseudonymity, and the two must never be conflated in any claim made to the persons this mechanism serves or to any oversight body. This is a constitutional constraint on what may be claimed, binding regardless of TSP endorsement.
