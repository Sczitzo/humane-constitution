# ANNEX A — Adversarial Test Suite

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Defines the repeatable adversarial test program — red-team scenarios, scoring methodology, acceptance criteria, and pilot checklists — used to stress-test the system against coercion, fraud, capture, and technical failure before and after deployment. |
> | **Who it protects** | Everyone whose survival floor, identity, civic standing, or fair access could be undermined by undetected attacks on the system. |
> | **Failure risk** | Without a standing test discipline, vulnerabilities accumulate silently; a one-time audit is captured or becomes stale, and no mechanism forces remediation before scale-up. |
> | **Evidence status** | Designed |
> | **Linked risks** | TR-01 through TR-13; Annex B; Annex C; Annex T; pilot acceptance gates in Annex Q. |

> **Provenance:** Foundational constitutional annex · Supports adversarial validation and pilot acceptance testing · Status: **ACTIVE**

This annex operationalises the protocol's adversarial testing discipline by defining how the system is continuously stress-tested against coercion, fraud, capture, and technical failure. It expands the threat-summary in Section IV into a repeatable test program.

---

### A1. Red-Team method (repeatable)

- **Define invariants (non-negotiables):** no survival denial via Essential Access; no rights denial via Voice, Service Record, or Flow; coercion must be detectable and punishable without punishing innocents broadly; system must be patchable without elite permission; detection tooling must remain privacy-bounded — anomaly detection, collusion-graph analytics, and all monitoring used by this suite are purpose-limited to the named threat, operate on minimised data, and are retention-bounded, so the test discipline never becomes a standing surveillance instrument.
- **Score threats on four axes (1–5):** impact, likelihood, detectability, and reversibility (blast-radius control).
- **Run tabletop simulations (human role-play)** before deploying automation; convert tabletop outcomes into automated test cases.
- **Author scenarios from inside and outside:** the suite combines protocol-authored scenarios with externally-authored adversarial scenarios written by red-teamers independent of the design team, and red-team membership rotates on a defined cadence, so the system is never solely its own examiner.
- **Patch using one of four levers:** reduce incentive, increase detection, increase abuse cost, or limit blast radius (caps/escrows/throttles).

---

### A2. Scenario suite (high-probability attacks)

The scenarios below are non-exhaustive. They cover known, high-probability attacks; unknown-unknowns are expected, and novel attack patterns will emerge that no current scenario anticipates. The suite is therefore refreshed on a defined cadence — scenarios are added, retired, and rewritten as the threat landscape and the system itself evolve. Passing the current suite demonstrates resistance to the modelled attacks only; no party may claim that passing the present suite proves the system safe.

#### Essential Access coercion and dependent exploitation

Abusers force dependents or caregivers to transfer allowed Essential Access, or compel purchases for resale and barter.

- **Primary patches:** tight transfer caps; verified dependent relationships; anomaly detection; rapid protective interventions; targeted enforcement that protects dependents.
- **Tests:** synthetic coercion patterns; false-positive/false-negative evaluation; time-to-intervention drills.

#### Essentials hoarding as goods (not currency)

Actors hoard food or medicine and resell via barter or black markets during scarcity.

- **Primary patches:** scarcity-mode caps; strategic reserves; shelf-life-aware rationing; carrying costs for large idle inventories; supplier-side enforcement.
- **Tests:** scarcity simulation with agent-based demand spikes; audit effectiveness; reserve deployment timing.

#### Commons Return evasion via source-base parking

Actors shift value into land, housing, commodities, concessions, shells, or collectibles to hide Commons Return source bases and extract rents.

- **Primary patches:** housing/land use-rights/leases; anti-vacancy carrying costs; transparent high-value asset registry; beneficial-ownership review; source-base incidence testing; competition policy.
- **Tests:** portfolio-shifting simulations; source-base valuation hiding; vacancy/rent extraction detection; protected-exclusion abuse review; enforcement proportionality review.

#### Civic layer capture by professional contributors

A small class farms Voice and Service Record and dominates agendas, staffing, and oversight.

- **Primary patches:** short Voice half-life; per-person influence caps; category balancing; random agenda slots; rotation and conflict rules; Service Record service-pool ceilings; hardship-safe continuity rules.
- **Tests:** governance dominance simulation; agenda diversity metrics; rotation compliance audits.

#### Contribution fraud and verifier collusion

Mutual attestation rings (guild collusion) mint Voice or Service Record without real contribution.

- **Primary patches:** multi-attestation; random audits; verifier staking/penalties; collusion-graph analytics; whistleblower protection.
- **Tests:** ring-detection benchmarks; audit sampling power; penalty effectiveness without chilling legitimate participation.

#### Oracle manipulation / capacity data corruption

Corrupt publishers falsify scarcity indices or capacity to alter issuance or restrictions.

- **Primary patches:** polycentric quorum; methodology transparency; independent audits; conservative issuance during disputes; rollback/throttles.
- **Tests:** adversarial data injection; quorum failure drills; rollback execution time and integrity.

#### Smart-contract automation failure

Bugs or exploits drain funds, lock access, or create cascading failures.

- **Primary patches:** staged execution; formal verification for critical contracts; rate limits; narrow emergency pause; restitution protocol.
- **Tests:** fuzzing and exploit rehearsal; pause/restore drills; restitution timeline metrics.

#### Identity fraud / Sybil attacks

Fake identities claim Essential Access or unlawfully enter Voice and Service Record pathways at scale; or identity theft hijacks civic accounts.

- **Primary patches:** proof-of-personhood; periodic re-verification; fraud detection; secure recovery that avoids surveillance overreach.
- **Tests:** Sybil-resistance benchmarks; recovery-path penetration tests; accessibility/false-rejection audits.

---

### A3. Acceptance criteria (minimum safety bar)

- No scenario allows Voice, Service Record, or Flow to gate survival, identity status, or rights.
- High-impact abuse above defined thresholds is detectable within a bounded time window (policy-defined), with documented response playbooks.
- Enforcement actions are targeted and time-limited; dependent protections and escrow partitioning prevent collateral harm.
- The protocol supports rapid patching: publicly logged vulnerabilities, mandatory post-mortems, and upgrade paths that cannot be blocked by entrenched beneficiaries.
- **Forced-remediation blocking gate.** Any vulnerability scored above the defined impact threshold on the A1 four-axis scoring becomes a blocking gate. Pilot-to-production promotion and any scale-up are barred until the fix is implemented **and** re-tested as resolved — not merely until a post-mortem is filed or a remediation is planned. A documenting log, post-mortem, or planned upgrade path does not satisfy this gate. A known high-impact vulnerability that is documented but unfixed blocks deployment; the gate clears only when the suite re-runs the affected scenario and confirms the vulnerability no longer manifests.

### A4. Pilot test checklist

- **Essential Access:** verify scarcity-mode activation and per-category caps; test caregiver transfers; measure coercion-flag precision/recall.
- **Flow:** validate issuance and provenance; test escrow partitioning; simulate Commons Return source-base parking and anti-vacancy carrying costs; verify enforcement does not break payroll.
- **Civic layer:** confirm Voice half-life, category balancing, and cap behavior; verify Service Record service thresholds; test collusion detection and audit sampling power.
- **Oracles:** test quorum publishing; inject adversarial data; rehearse dispute throttling and rollback; validate audit independence.
- **Governance:** run agenda-setting simulations for diversity and capture resistance; test rotation and conflict-of-interest enforcement.

---
