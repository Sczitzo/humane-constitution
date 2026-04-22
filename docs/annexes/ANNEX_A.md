# ANNEX A. Red-Team Pass (Option B Baseline)
This annex operationalizes the protocol's adversarial testing discipline by defining how the system is continuously stress-tested against coercion, fraud, capture, and technical failure. It expands the threat-summary in Section IV into a repeatable test program.

### A1. Red-Team method (repeatable)
**23. Define invariants (non-negotiables):** (1) no survival denial via Essential Access; (2) no rights denial via the civic layer or Flow; (3) coercion must be detectable and punishable without punishing innocents broadly; (4) system must be patchable without elite permission.
**24. Score threats on four axes (1-5):** impact, likelihood, detectability, and reversibility (blast-radius control).
**25. Run tabletop simulations (human role-play)** before deploying automation; convert tabletop outcomes into automated test cases.
**26. Patch using one of four levers:** reduce incentive, increase detection, increase abuse cost, or limit blast radius (caps/escrows/throttles).

### A2. Scenario suite (high-probability attacks)

**Essential Access coercion and dependent exploitation**
- **Abusers force dependents/caregivers** to transfer allowed Essential Access; or compel purchases for resale/barter.
- **Primary patches:** tight transfer caps; verified dependent relationships; anomaly detection; rapid protective interventions; targeted enforcement that protects dependents.
- **Tests:** synthetic coercion patterns; false-positive/false-negative evaluation; time-to-intervention drills.

**Essentials hoarding as goods (not currency)**
- **Actors hoard food/medicine** and resell via barter or black markets during scarcity.
- **Primary patches:** scarcity-mode caps; strategic reserves; shelf-life-aware rationing; carrying costs for large idle inventories; supplier-side enforcement.
- **Tests:** scarcity simulation with agent-based demand spikes; audit effectiveness; reserve deployment timing.

**Flow demurrage evasion via non-decaying assets**
- **Shift Flow into land/housing/commodities** to avoid decay and extract rents.
- **Primary patches:** housing/land use-rights/leases; anti-vacancy carrying costs; transparent high-value asset registry; competition policy.
- **Tests:** portfolio-shifting simulations; vacancy/rent extraction detection; enforcement proportionality review.

**Civic layer capture by professional contributors**
- **A small class farms Voice and Service Record** and dominates agendas, staffing, and oversight.
- **Primary patches:** short Voice half-life; per-person influence caps; category balancing; random agenda slots; rotation and conflict rules; Service Record service-pool ceilings; and hardship-safe continuity rules.
- **Tests:** governance dominance simulation; agenda diversity metrics; rotation compliance audits.

**Contribution fraud and verifier collusion**
- **Mutual attestation rings (guild collusion)** mint Voice or Service Record without real contribution.
- **Primary patches:** multi-attestation; random audits; verifier staking/penalties; collusion-graph analytics; whistleblower protection.
- **Tests:** ring-detection benchmarks; audit sampling power; penalty effectiveness without chilling legitimate participation.

**Oracle manipulation / capacity data corruption**
- **Corrupt publishers falsify scarcity indices** or capacity to alter issuance or restrictions.
- **Primary patches:** polycentric quorum; methodology transparency; independent audits; conservative issuance during disputes; rollback/throttles.
- **Tests:** adversarial data injection; quorum failure drills; rollback execution time and integrity.

**Smart-contract automation failure**
- **Bugs or exploits drain funds**, lock access, or create cascading failures.
- **Primary patches:** staged execution; formal verification for critical contracts; rate limits; narrow emergency pause; restitution protocol.
- **Tests:** fuzzing and exploit rehearsal; pause/restore drills; restitution timeline metrics.

**Identity fraud / Sybil attacks**
- **Fake identities claim Essential Access** or unlawfully enter Voice and Service Record pathways at scale; or identity theft hijacks civic accounts.
- **Primary patches:** proof-of-personhood; periodic re-verification; fraud detection; secure recovery that avoids surveillance overreach.
- **Tests:** Sybil-resistance benchmarks; recovery-path penetration tests; accessibility/false-rejection audits.

---

### A3. Acceptance criteria (minimum safety bar)
- No scenario allows the civic layer or Flow to gate survival, identity status, or rights.
- High-impact abuse above defined thresholds is detectable within a bounded time window (policy-defined), with documented response playbooks.
- Enforcement actions are targeted and time-limited; dependent protections and escrow partitioning prevent collateral harm.
- The protocol supports rapid patching: publicly logged vulnerabilities, mandatory post-mortems, and upgrade paths that cannot be blocked by entrenched beneficiaries.

### A4. Pilot test checklist (turn this into system tests)
- **Essential Access:** verify scarcity-mode activation and per-category caps; test caregiver transfers; measure coercion-flag precision/recall.
- **Flow:** validate demurrage computation; test escrow partitioning; simulate anti-vacancy carrying costs; verify enforcement does not break payroll.
- **Civic layer:** confirm Voice half-life, category balancing, and cap behavior; verify Service Record service thresholds; test collusion detection and audit sampling power.
- **Oracles:** test quorum publishing; inject adversarial data; rehearse dispute throttling and rollback; validate audit independence.
- **Governance:** run agenda-setting simulations for diversity and capture resistance; test rotation and conflict-of-interest enforcement.

---
