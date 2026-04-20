# The Humane Constitution

**Constitution for a Humane Civilization**  
*A Charter of Human Dignity, Stewardship, and Non-Coercive Order*

**Continuity note:** This project was previously released as *The Twelve-Pillar Protocol*. Legacy references remain in historical materials and crosswalk notes.

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

> A non-extractive civilizational operating system — separating survival, markets, and governance into structurally independent lanes.

## Contents

- [What this is](#what-this-is)
- [The core separation](#the-core-separation)
- [The current architecture](#the-current-architecture)
- [Architecture flow](#architecture-flow)
- [Document set](#document-set)
- [Technical specifications](#technical-specifications)
- [Hardening history](#hardening-history)
- [Security and attack surface](#security-and-attack-surface)
- [What this system is not](#what-this-system-is-not)
- [What will go wrong](#what-will-go-wrong-pre-committed)
- [Scale readiness](#scale-readiness)
- [How to engage](#how-to-engage)
- [License](#license)

## What this is

The Humane Constitution is a constitutional systems design for a society in which **survival is unconditional**, **markets remain productive**, and **governance cannot be purchased**. It is built on a single core diagnosis: when survival, enterprise, and political influence all ride on the same money, wealth converts into coercion. Every major social system fails at this interface. This constitutional project is an attempt to escape that failure mode by design.

This is not a political manifesto. It is a systems engineering document — with threat modeling, adversarial red-teaming, patch logs, and version control. It has been stress-tested against bad actors, institutional capture, measurement failure, and its own internal contradictions.

## The core separation

The protocol separates three social functions that most systems collapse together:

| Instrument | Purpose | What it cannot do |
|---|---|---|
| **EC** — Enterprise Currency | Markets, wages, contracts, savings, investment | Buy survival access or civic power |
| **LC** — Life Access Ledger | Baseline essentials: food, shelter, healthcare, transit | Become cash, collateral, or a status marker |
| **DW / CR** — Civic Layer | Bounded agenda-setting and service eligibility | Gate dignity, purchase rights, or accumulate indefinitely |
| **SQ** — Scarcity Quotas | Emergency rationing during verified shortage | Become permanent or a hidden market |

The walls between these lanes are the system. Not the instruments themselves.

EC is public money rather than privately created bank money. It is primarily digital, secured with cryptographic methods, and paired with physical cash or equivalent offline instruments for resilience and privacy.

## The current architecture

The live constitutional presentation uses **one Founding Order** and **seven Articles of Constitutional Order**. The earlier `Seven Pillars + P0` shorthand survives only as legacy `v13` traceability in crosswalk tables and patch history.

- **Founding Order — Subsidiarity, Consent & Exit** — The constitutional foundation: smallest-competent scale by default, affirmative consent to join, and graceful exit without forfeiture.
- **Article I — Rights & Rule of Law** — Tier 1 invariants, due process, non-coercion, and rule-bound execution.
- **Article II — Personhood, Identity & Continuity** — One-person continuity, recovery, guardianship, and dependent protection without surveillance scoring.
- **Article III — Physics & Reserves** — Polycentric measurement of real capacity plus the reserves that buffer shocks and measurement error.
- **Article IV — Survival** — The Life Access Ledger as both constitutional survival instrument and actual delivery path.
- **Article V — Markets, Commons & Public Finance** — EC, housing and land use-rights, enterprise, public banking rails, and commons revenue under one economic surface.
- **Article VI — Civic Layer & Deliberation** — Civic instruments, contribution recognition, and bounded public prioritization.
- **Article VII — Transparency & Environmental Scanning** — Public dashboards, independent audit visibility, and external-world scanning.

## Architecture flow

The diagram below shows how the current Founding Order and Articles I-VII relate internally. Legacy `v13` shorthand (`P0`, `P1–P7`) and older `v12` pillar references in historical materials resolve through the crosswalk in `Humane_Constitution.md` §III.

```mermaid
flowchart TD
    FO["**Founding Order**\nSubsidiarity,\nConsent & Exit"]:::foundation
    A1["**Article I**\nRights & Rule\nof Law"]:::tier1
    A2["**Article II**\nPersonhood,\nIdentity & Continuity"]:::tier2
    A3["**Article III**\nPhysics &\nReserves"]:::tier2
    A4["**Article IV**\nSurvival\n(LC Instrument + Delivery)"]:::tier2
    A5["**Article V**\nMarkets, Commons\n& Public Finance"]:::tier3
    A6["**Article VI**\nCivic Layer\n& Deliberation"]:::tier3
    A7["**Article VII**\nTransparency &\nEnvironmental Scanning"]:::tier3

    FO -->|"smallest competent scale,\nconsent, exit"| A1
    FO -->|"smallest competent scale,\nconsent, exit"| A2
    FO -->|"smallest competent scale,\nconsent, exit"| A3
    FO -->|"smallest competent scale,\nconsent, exit"| A4
    FO -->|"smallest competent scale,\nconsent, exit"| A5
    FO -->|"smallest competent scale,\nconsent, exit"| A6
    FO -->|"smallest competent scale,\nconsent, exit"| A7

    A1 -->|"constitutional constraints"| A2
    A1 -->|"constitutional constraints"| A3
    A1 -->|"constitutional constraints"| A4
    A1 -->|"constitutional constraints"| A5
    A1 -->|"constitutional constraints"| A6
    A1 -->|"constitutional constraints"| A7

    A2 -->|"identity continuity\nand eligibility signals"| A4
    A2 -->|"identity continuity\nand eligibility signals"| A6
    A3 -->|"capacity limits,\nscarcity signals, reserves"| A4
    A3 -->|"physical constraints"| A5
    A4 -->|"delivery outcomes"| A7
    A5 -->|"production, housing,\npublic-finance flows"| A3
    A6 -->|"priorities, service eligibility,\nlegitimacy inputs"| A5
    A7 -->|"audit visibility"| A1
    A7 -->|"public accountability"| A5

    classDef foundation fill:#254336,color:#f2f2e6,stroke:#6b8f71,stroke-width:2px
    classDef tier1 fill:#1a1a2e,color:#e0e0e0,stroke:#4a4a8a,stroke-width:2px
    classDef tier2 fill:#16213e,color:#e0e0e0,stroke:#4a4a8a,stroke-width:1px
    classDef tier3 fill:#0f3460,color:#e0e0e0,stroke:#4a4a8a,stroke-width:1px
```

**Reading the diagram:** The **Founding Order** establishes scale, consent, and exit defaults across the entire architecture. **Article I** constrains every operational article constitutionally. The instrument-level non-convertibility rules are enforced within the architecture itself rather than by a separate sovereign pillar.

## Document set

### Core documents

| Document | Purpose |
|---|---|
| [`Humane_Constitution.md`](./Humane_Constitution.md) | Primary constitutional source of truth. Lean constitutional text with links into the standalone annex corpus. |
| [`White_Paper.md`](./White_Paper.md) | Plain-language public explanation. Start here. |
| [`Threat_Register.md`](./Threat_Register.md) | Adversarial risk model. 27 threat IDs — 17 ADDRESSED, 5 PARTIAL, 4 OPEN (T-003 retired). T-017/P-014 is the FOUNDING instrument. |
| [`Patch_Log.md`](./Patch_Log.md) | Change and mitigation history. 30 patches — 15 ACTIVE, 15 PROPOSED (1 FOUNDING: P-014). |
| [`Acceptance_Protocol.md`](./Acceptance_Protocol.md) | Process for moving patches from design to operation. |
| [`Citizen_Facing_Rights_Layer.md`](./Citizen_Facing_Rights_Layer.md) | Plain-language summary of citizen rights and protections. |

### Technical specifications (`docs/`)

| Document | Purpose |
|---|---|
| [`docs/INVARIANTS.md`](./docs/INVARIANTS.md) | Seven constitutional invariants (INV-001 through INV-007). Tier 1 protected. Any patch that violates these is rejected at intake. |
| [`docs/SPECIFICATIONS.md`](./docs/SPECIFICATIONS.md) | Formal state machine definitions for EC, LC, DW/CR, and SQ. Demurrage function, issuance constraints, oracle consensus rules, parameter table. |
| [`docs/Adversarial_Narrative_Simulation.md`](./docs/Adversarial_Narrative_Simulation.md) | 10 simulated narrative attacks with structural responses and residual risks. |
| [`docs/Annual_Compound_Simulation.md`](./docs/Annual_Compound_Simulation.md) | Month-by-month operational year stress-test across the constitutional architecture; preserves legacy pillar numbering where noted and maps through the `Humane_Constitution.md` §III crosswalk. |
| [`docs/Founding_Preactivation_Disclosure.md`](./docs/Founding_Preactivation_Disclosure.md) | Founding instrument pre-activation disclosure. |
| [`simulations/model_outline.py`](./simulations/model_outline.py) | Agent-based simulation scaffold (Mesa framework). Models LC vs. EC flow across citizen and adversarial agents. Four scenario runners: baseline, oracle stress, high demurrage, adversarial density. |

### Annexes (`docs/annexes/`)

The annex corpus now lives entirely as standalone documents. Use [`docs/annexes/INDEX.md`](./docs/annexes/INDEX.md) as the entry point for constitutional annexes, hardening clauses, and legacy continuity material.

## Security and attack surface

The three highest-severity failure modes, their mechanisms, and the algorithmic mitigations in place:

### 1. The Oracle Problem (T-020 / T-021) — Critical

**Mechanism:** The LC issuance system depends on oracle nodes measuring real-world physical capacity. Two nodes can satisfy every formal criterion for independence (separate institutions, separate funders, separate governance) while sharing the same epistemological foundation — the same statistical tradition, peer-review standards, and conception of valid evidence. When this happens, their errors are correlated: a coordinated actor who shifts the dominant methodology standard corrupts the measurement system without touching any data directly.

**Algorithmic mitigation (P-017 / Annex AL):**
- Minimum three oracle nodes required
- Nodes must differ on all three dimensions simultaneously: epistemological foundation, data generation process, and standards provenance
- At least one node must use direct physical sampling (ground-truth, Tier 3) — this node cannot share standards provenance with institutional statistical nodes
- Error independence test required: nodes must produce materially different error structures, not merely formally different methodologies
- Anti-monoculture trigger: if ≥3 nodes share a standards body, independent review is mandatory

**Residual risk:** The definition of "fundamentally different methodology" is itself a protected term (P-004 / Annex AL) — but whoever influences that definition retains indirect leverage. This is documented as an open residual risk, not a resolved problem.

---

### 2. Above-Ledger Bypass / Shadow Convertibility (T-001) — Critical

**Mechanism:** The non-convertibility constraint is enforced at the ledger layer. Off-ledger transactions — proxy LC redemption, service-for-LC exchanges, informal barter at instrument boundaries — are not preventable by ledger rules alone. A motivated actor can approximate LC-to-EC conversion without technically touching the ledger: pay someone in goods to redeem LC on their behalf, or build a service market that prices itself in LC-equivalent units.

**Algorithmic mitigation (P-001 / Annex AJ):**
- LC redemption is non-delegable: biometric or equivalent identity confirmation required at delivery point (Tier 2 assurance minimum)
- Cluster anomaly detection: statistical monitoring for redemption patterns inconsistent with individual use
- Broker signature detection: behavioral patterns characteristic of proxy-redemption networks flagged for Ombuds review
- LC-only essential access: certain essential services only accessible via LC redemption, not EC purchase — reduces the conversion incentive by narrowing what EC can buy in the survival lane

**Residual risk:** Detection depends on statistical anomaly thresholds. A sufficiently distributed, low-frequency proxy network may fall below detection bounds. Explicit leakage tolerance accepted in P-001; T-001 remains PARTIAL status.

---

### 3. Electoral Cycle Capture / Hostile Successor Government (T-022) — Critical

**Mechanism:** A hostile successor government can legally dismantle the constitutional architecture through legitimate processes: refusing to fund LC delivery infrastructure, appointing non-compliant oracle administrators, passing legislation that redefines protected terms below the constitutional amendment threshold, or simply allowing administrative hollowing — the system remains on paper while operational capacity is systematically defunded.

**Algorithmic mitigation (P-018):**
- Entrenchment ladder: LC floor provisions require progressively higher supermajorities to amend as time-in-operation increases
- LC floor minimum persistence: no successor government may reduce LC below CSM in fewer than N legislative cycles [FOUNDING COMMITMENT: N]
- Administrative hollowing triggers: defined operational metrics (delivery throughput, oracle response time, enforcement rate) that, when breached, automatically activate the Pre-Confirmation Response Protocol (PCRP) regardless of political direction
- Transition protocol: mandatory handoff documentation, independent audit of operational capacity, and public status report required before any change-of-government that affects survival delivery or rule-bound execution operations

**Residual risk:** The entrenchment ladder and persistence requirements are only as durable as the constitutional text that contains them. A sufficiently determined successor government with a large enough legislative majority can repeal the constitutional text itself. This is the recursion of T-017 (bootstrap problem) — resolved founding legitimacy does not prevent future delegitimation.

## Hardening history

The system has been adversarially stress-tested:

| Threats addressed | Key findings |
|---|---|
| T-001 Shadow Convertibility, T-002 Identity Exploits, T-004 Incentive Collapse, T-007 Definition Drift | Four patches now ACTIVE |
| T-005 Governance Throughput, T-006 Measurement Lag, T-008 Bureaucratic Elite Formation, T-011 Narrative Surface | Dual-queue CRP, PCRP first-responder authority, diversity controls, failure doctrine |
| T-012–T-015 (Interface threats) | Compound tests revealed triple-deadlock risk; oracle independence requirement; demand-context flag |
| T-009 Grace Exploitation Loop | Graduated renewal intensity; CR slow-decay; hardship attestation collusion detection |
| T-016 Formal Acceptance Process Capture | Evidence farming, sign-off deadlock, urgency exploit, audit capture all patched |
| T-017 Bootstrap Problem | One-time founding instrument (P-014) resolves P-013 circular dependency; founding window extended to 60 days |
| T-018–T-019 PCRP Attack Surface | False-trigger exhaustion and demand-context suppression attacks registered and patched (P-015) |
| T-020–T-021 Oracle Independence | Epistemological and algorithmic oracle capture registered; methodology-class diversity and AI supply-chain transparency required (P-017) |
| T-022 Electoral Cycle Capture | Hostile successor government routes identified; entrenchment ladder, LC floor persistence, transition protocol designed (P-018) |
| T-023–T-025 Pilot validity, SQ oracle failure, demurrage capture | External validity gate (P-019), SQ oracle-failure fallback (P-022), demurrage sector-capture resolved: contract-commitment architecture, zero exemptions (P-023) |

**Current status: 15 patches ACTIVE, 15 PROPOSED (1 FOUNDING instrument: P-014), 4 threat IDs OPEN, 5 PARTIAL, 17 ADDRESSED.** 30 patches total across 27 threat IDs. The design continues to harden. What remains is pilot evidence and patch acceptance.

## What this system is not

| Common fear | Protocol response |
|---|---|
| A hidden social credit system | DW/CR cannot buy rights, goods, immunity, or survival access. Human worth is never measured. |
| A command economy | EC still runs markets, pricing, contracts, enterprise, and innovation. The protocol constrains power, not trade. |
| A welfare bureaucracy | LC is grounded in measured physical capacity, clear basket rules, and reviewable scarcity procedures. |
| A surveillance state | Identity and dashboards use minimum necessary data, aggregation thresholds, and selective disclosure. |
| A rentier loophole | Land and housing are use-rights with anti-vacancy rules, not speculative ownership. |

## What will go wrong (pre-committed)

The system acknowledges expected operational imperfections before they occur:

- **PCRP false triggers** — will happen; detection, termination, and public post-mortem within 7 days are the designed response
- **Oracle disputes** — will happen; conservative defaults protect access while disputes resolve
- **SQ scarcity activations** — will happen during genuine shortage; managed rationing instead of price-spike exclusion
- **Enforcement errors** — will happen; partitioned wallets and due process are the correction mechanism
- **Measurement uncertainty** — is permanent; published confidence bands are the honest response

The system's commitment: every failure in these categories is published publicly, with a timeline and a correction path. Silence is the violation, not the failure.

## Scale readiness

The system is **defensible and documented**. It is not yet **scale-ready**. Scale readiness requires:

- [ ] Formal acceptance of PROPOSED patches (pilot evidence required)
- [x] CFRL one-page publication — see [`Citizen_Facing_Rights_Layer.md`](./Citizen_Facing_Rights_Layer.md)
- [x] Adversarial narrative simulation — see [`docs/Adversarial_Narrative_Simulation.md`](./docs/Adversarial_Narrative_Simulation.md)
- [x] Annual compound simulation — see [`docs/Annual_Compound_Simulation.md`](./docs/Annual_Compound_Simulation.md)
- [ ] Legitimate founding coalition

The Formal Acceptance Protocol defines the pathway from design to operation.

## How to engage

**Read the White Paper first.** It is 14 pages and written for a general audience.

**Then the Threat Register** if you want to stress-test the design — it documents every adversarial failure mode and mitigation.

**Then the Humane Constitution** if you want the operative language.

**To critique, challenge, or contribute:** open an Issue with your specific objection, the section it applies to, and your proposed alternative. Vague objections will be asked to specify. Specific objections will be taken seriously.

**To cite this work:** see `CITATION.cff` in this repository.

## License

This work is released under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You may share, adapt, and build on it for any purpose, including commercial, as long as you give appropriate credit.

---

*The protocol is not a utopia machine. It is an attempt to build a civic operating system whose own powers are constrained tightly enough to make its promises believable.*
