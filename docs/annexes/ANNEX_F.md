# ANNEX F. 12-Pillar Requirements Checklist (Tagged — Legacy v12 Reference)
**Purpose.** This annex provides an audit-ready checklist under the v12 pillar architecture. Each item is tagged as: **[I] Informational metric**, **[E] Enforceable guardrail**, **[P] Implementation practice**.

**Post-Proposal-2 note (2026-04-18).** The operational architecture was restructured from twelve pillars into the current `v13` architecture, now publicly presented as the Founding Order plus Articles I-VII. This checklist is retained as a v12 reference for continuity of pre-restructure audit work; the v12 → v13 crosswalk at the end of §III provides the authoritative mapping. A v13 checklist will be produced in a subsequent housekeeping pass.

#### Pillar 1 - Constitutional Invariants & Rights
- **[E]** LC access cannot be conditioned on contribution/behavior; any suspension requires constitutional violation threshold + due process. Policy text + test: attempted denial paths blocked.
- **[E]** Non-convertibility enforced: LC ↔ EC ↔ CC conversion is prohibited at protocol level; exceptions require amendment-level procedure. Ledger rule proofs + audit evidence.
- **[E]** Due process for enforcement: notice, appeal window, independent review, time-bounded interventions. Appeal logs + SLA compliance.
- **[P]** Independent oversight rotation + conflict-of-interest rules for auditors/juries. Roster rotation evidence.
- **[P]** Funded red-teaming program with published findings and patch tracking. Red-team reports + patch log.

#### Pillar 2 - Personhood, Identity & Continuity
- **[E]** One-person-one-core-wallet; Sybil defenses active (proof-of-personhood + re-verification). Fraud rate metrics + audit samples.
- **[E]** Minimal-data identity: selective disclosure; no centralized “profile score.” Privacy audit results.
- **[P]** Accessible recovery paths for lost credentials; Recovery SLA + user success rate. Protections for unhoused/refugees.
- **[E]** Guardianship/ incapacity continuity ensures dependents never lose LC coverage. Continuity test suite.
- **[I]** Public reporting of fraud attempts and resolution outcomes (aggregate only). Dashboard screenshots.

#### Pillar 3 - Resource & Capacity System (RCS)
- **[P]** Polycentric capacity publishing quorum with transparent methodology and audits. Publisher roster + audit reports.
- **[E]** Conservative buffers applied to LC issuance; disputes reduce issuance until resolved. Issuance rule proofs + dispute logs.
- **[I]** Real-time aggregate capacity indices published (with privacy safeguards). Dashboard + definitions.
- **[P]** Resilience reserves defined for essentials with replenishment rules. Reserve policy + inventory evidence.
- **[P]** Data quality monitoring and anomaly detection for oracle manipulation. Monitoring runbooks.

#### Pillar 4 - Life Support Layer (LC Services)
- **[E]** LC expires each issuance period; unused LC returns to capacity pool. Ledger tests.
- **[E]** LC non-transferable by default; caregiver/dependent exceptions capped, logged, and reversible when coerced. Transfer rule tests + anomaly flags.
- **[P]** Scarcity mode triggers (days-of-supply/fill-rate) and corresponding caps/prioritization rules are predefined. Scarcity playbook.
- **[P]** Service delivery SLAs for essentials (uptime, access time) with incident response. SLA dashboard + incidents.
- **[E]** No collateral harm: enforcement actions cannot remove essentials from dependents/innocents. Partitioned wallet enforcement tests.

#### Pillar 5 - Monetary Architecture (EC / LC / civic layer / SQ)
- **[E]** Lane separation enforced at protocol level (no hidden bridges). Formal verification / invariants tests.
- **[E]** EC demurrage applied to idle balances (baseline 1%/mo); operating float exceptions are explicit and narrow. Demurrage computation audits.
- **[E]** CC is non-transferable; CC decays (12-month half-life baseline); per-person caps + diminishing returns active. CC decay/cap test suite.
- **[P]** Wallet partitioning: payroll/obligations protected from broad freezes; targeted actions only. Partition tests.
- **[I]** Aggregate flows published: issuance, burn/expiry, reserves, and major budget allocations. Public dashboard.

#### Pillar 6 - Land, Housing & Commons (Use-Rights)
- **[E]** Housing/land governed as use-rights/leases, not speculative ownership. Registry policy + enforcement evidence.
- **[E]** Anti-vacancy carrying costs; accumulation limits for residential use-rights. Detection + enforcement metrics.
- **[P]** Transparent allocation and renewal criteria; appeal path for housing decisions. Allocation logs + appeal outcomes.
- **[P]** Commons stewardship metrics and regeneration targets for shared resources. Scorecard + audit.
- **[E]** Anti-rent-seeking rule set with proportional penalties targeting extractive behaviors. Case review samples.

#### Pillar 7 - Enterprise & Production Platform
- **[E]** Competition integrity: anti-monopoly controls, open standards, interoperability requirements. Interoperability audit.
- **[P]** Regenerative/circular incentives: repairability, take-back, extended responsibility where feasible. Program KPIs.
- **[E]** Transparent high-value asset registry to deter hidden concentration (privacy-preserving). Registry audit.
- **[P]** Procurement and contracting include anti-capture clauses + public reporting. Contract templates + reports.
- **[I]** Enterprise performance dashboards (aggregate): output, quality, reliability, emissions/waste signals. Dashboard feed.

#### Pillar 8 - Contribution & Capability Development
- **[E]** Contribution affects CC only; cannot affect LC eligibility or personhood. Policy + tests.
- **[P]** Multi-attestation + random audits + anomaly detection for contribution claims. Audit results.
- **[E]** Capability adjustment rules prevent coercive expectations (disability/care load/age/crisis). Eligibility logic review.
- **[P]** Impact Review channel exists with strict evidence thresholds and independent panels. Panel charter + decisions.
- **[I]** Public reporting (aggregate) of contribution categories and audit findings. Dashboard.

#### Pillar 9 - Civic Deliberation & Decision Systems
- **[P]** Proposal pipeline includes cost/capacity checks before authorization. Pipeline logs.
- **[E]** Quarterly cycle: priorities set quarterly; no rollover; anti-capture weighting active. Cycle calendar + vote logs.
- **[E]** Constitutional matters remain one-person-one-vote with strict amendment process. Voting records.
- **[P]** Conflict-of-interest disclosure and recusal enforced for decision participants. COI logs.
- **[I]** Real-time public reporting of decisions, budgets, and execution status (aggregate). Dashboards.

#### Pillar 10 - Operations, Oversight & Service Delivery
- **[P]** Staged rollouts, canary releases, and emergency pause for critical systems. Change logs.
- **[E]** Enforcement proportionality + no collateral harm; targeted actions with time limits. Enforcement audit samples.
- **[P]** Incident response: post-mortems within defined SLA; public correction log. Post-mortem archive.
- **[P]** Bias audits for algorithms used in hiring/procurement/service triage. Audit reports.
- **[I]** Operational dashboards: uptime, backlog, resolution times, appeals outcomes. Dashboard feeds.

#### Pillar 11 - Information Commons & Trust Transparency
- **[E]** Privacy-preserving publication: k-threshold aggregation, small-cell suppression, and sensitive-signal delays. Privacy test suite.
- **[P]** Definitions registry: every public metric has a definition, source, refresh rate, and change log. Registry content.
- **[E]** No individual scoring: wellbeing/trust metrics are aggregate-only and never used for access gating. Policy + enforcement tests.
- **[P]** Public audit trails for key decisions and major flows; independent verification encouraged. Audit trail samples.
- **[I]** Trust signals: SLA compliance, correction latency, dispute rates (aggregate). Dashboards.

#### Pillar 12 - Public Finance & Commons Revenue (PFCR)
- **[E]** No taxes on survival access, ordinary labor, or basic household exchange. Constitutional text + judicial review trigger.
- **[E]** PFCR receipts come only from published structural channels: demurrage routing, commons/use-right charges, asset carrying costs, gateway fees, and bounded public issuance tied to real public production. Revenue-source registry + audit evidence.
- **[P]** Public banking rails fund a guaranteed public option plus interoperable licensed providers for baseline retail banking. Service-charter evidence + uptime / recovery metrics.
- **[E]** PFCR may not hide debt or off-ledger obligations. Public cost register + debt-cap compliance.
- **[I]** Aggregate reporting of demurrage routing, commons revenues, and major public appropriations is live and independently auditable. Dashboard evidence.

---
