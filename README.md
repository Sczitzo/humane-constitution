---
title: Project Guide & Reader Overview
---

# The Humane Constitution

**Constitution for a Humane Civilization**  
*A Charter of Human Dignity, Stewardship, and Non-Coercive Order*

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

> A design for separating basic needs, markets, and public power so wealth cannot quietly become control over other people.

## Contents

- [What this is](#what-this-is)
- [Reader app](#reader-app) — open in browser · download desktop app · run from source
- [Current status](#current-status)
- [Plain-language rule](#plain-language-rule)
- [If you're skeptical](#if-youre-skeptical)
- [The core separation](#the-core-separation)
- [The current architecture](#the-current-architecture)
- [Architecture flow](#architecture-flow)
- [Document set](#document-set)
- [Technical specifications](#technical-specifications)
- [Hardening history](#hardening-history)
- [Major risks](#major-risks)
- [What this system is not](#what-this-system-is-not)
- [What will go wrong](#what-will-go-wrong-pre-committed)
- [Scale readiness checklist](#scale-readiness-checklist)
- [How to engage](#how-to-engage)
- [License](#license)

## What this is

The Humane Constitution is a design for a society where everyone has a basic needs floor, markets still work, and public power cannot be bought.

The core problem is simple: when food, housing, medicine, business, and political influence all depend on the same money, wealth becomes power over other people's safety.

This is not a live government. It is not a finished rollout plan. It is a public working draft with stress tests, known failure paths, proposed fixes, and validation checks.

## Reader app

The repository ships with a reader app: a clean, searchable way to read the whole project. It includes the main text, public explainers, annexes, threat register, patch log, and evidence documents.

### Option 1 — Open in your browser (no install, no download)

> **This is the recommended path for most readers.**

A hosted version of the reader is available at:

**[→ humane-constitution.vercel.app](https://humane-constitution.vercel.app)**

Click the link. That's it. Nothing to install.

---

### Option 2 — Download the desktop app

If you prefer a desktop window (works offline, no browser needed):

1. Go to the [Releases page](https://github.com/humaneconstitution/humane-constitution/releases) of this repository on GitHub.
2. Under the most recent release, find the file for your computer:
   - **Mac:** download the `.dmg` file
   - **Windows:** download the `.msi` or `.exe` file
   - **Linux:** download the `.AppImage` or `.deb` file
3. Open the downloaded file and follow the normal install steps for your system (same as installing any app).

> If you're on a Mac and see a warning that the app is from an "unidentified developer," right-click the app and choose **Open** — this bypasses the warning for apps that haven't been submitted to Apple's store.

---

### Option 3 — Run it yourself (for contributors and developers)

If you want to run the app from source — for example, to propose edits or work on the codebase — you'll need a few tools installed first. This path assumes familiarity with a terminal.

**Prerequisites:** Node.js 18+, Python 3.10+, and (for the desktop wrapper) Rust + Tauri prerequisites.

```bash
cd app
npm install
npm run dev          # opens in browser at http://localhost:5173
npm run tauri dev    # opens as a desktop window
```

`npm run dev` and `npm run build` both regenerate the corpus first via `python3 ../scripts/export_corpus.py`, so the reader always reflects the live markdown on disk. To regenerate manually: `npm run generate:corpus`. To verify the generated corpus matches what's checked in: `npm run check:corpus`.

**Build a release binary:**

```bash
cd app
npm run tauri build  # produces a platform-native installer in src-tauri/target/release
```

---

### What the reader contains

| Section | What's there |
|---|---|
| **Home** | Featured documents and the recommended reading path. Start here on your first visit. |
| **Constitution** | The charter text, white paper, public-facing explainers, and Founding Order. |
| **Annexes** | All operational annexes (A through AV). Search and filter by topic. |
| **Threats & Patches** | Threat Register, Patch Log, Founding Commitments, Claims & Evidence, Pilot Roadmap. |
| **Validation** | Activation gates, integrity status, and structural-check output. |
| **Settings** | Font size, column width, and dark mode. The reader remembers your last view between sessions. |

**Keyboard shortcuts:** press `?` inside the reader to see all shortcuts. Press `Cmd K` (Mac) or `Ctrl K` (Windows/Linux) to search across the full document set.

## Current status

This project is strongest today as a design, critique target, and public working draft. It is **not scale-ready**.

What exists now:

- constitutional text and public explanations
- a threat register and patch log
- adversarial simulations and stress-test documents
- evidence registers and dedicated test packages for unresolved load-bearing claims
- a validation pipeline and reader app

What must still be proven:

- pilot evidence at real scale
- a non-coercive identity and recovery stack
- reliable measurement of essential capacity
- a legitimate founding coalition

The right response is neither blind belief nor dismissal. The useful response is specific critique, hard testing, and evidence.

## Plain-language rule

This project should be understandable to people who never went to college. Legal, policy, and software terms should be avoided unless they are truly needed. When a formal term is needed, explain it in plain English first.

The project-wide writing rule is in [Plain-Language Standard](./docs/PLAIN_LANGUAGE.md). Future edits should follow it, especially in public pages, the reader app, the constitution overview, and threat summaries.

## If you're skeptical

Start with the [Public Readiness Guide](./docs/public/03_readiness.md). It states what the project claims, what is only designed, what still needs evidence, and which objections deserve the most pressure.

## If you're new

Use this reading order:

1. [One-Page Overview](./docs/public/01_overview.md) for the shortest public introduction
2. [Public Readiness Guide](./docs/public/03_readiness.md) for the claims, readiness status, and strongest objections
3. [White Paper](./docs/public/04_white_paper.md) for the fuller public explanation
4. [Rights Layer](./docs/public/05_rights_layer.md) for the plain-language rights summary
5. [Humane Constitution](./docs/constitution/Humane_Constitution.md) for the governing text
6. [Threat Register](./docs/governance/Threat_Register.md) if you want to test the design against failure and bad actors

## The core separation

The system separates three things that most societies mix together:

- basic needs
- markets
- public power

It does this with five tools:

| Tool | Purpose | What it cannot do |
|---|---|---|
| **Flow** | Markets, wages, contracts, savings, investment | Buy survival access or civic power |
| **Essential Access** | Survival floor and baseline essentials: food, water, shelter, healthcare, essential medicines, and basic transit | Become cash, collateral, or a status marker |
| **Voice** | Bounded agenda-setting and budget prioritization | Buy rights, goods, or survival access |
| **Service Record** | Eligibility for rotating public-service roles and stewardship history | Measure human worth or accumulate permanent rank |
| **Shared Storehouse** | Emergency rationing during verified shortage | Become permanent or a hidden market |

The walls between these tools are the system.

Essential Access protects the survival floor. Voice shapes bounded civic priorities. Service Record governs readiness for rotating public roles. Shared Storehouse appears only during verified shortage.

Flow is public money rather than privately created bank money. It is primarily digital, secured with cryptographic methods, and paired with physical cash or equivalent offline instruments for resilience and privacy.

## The current architecture

The current main text uses **one Founding Order** and **seven articles**.

- **Founding Order — Local Choice, Consent & Exit** — who joins, how decisions stay local when possible, and how a place can leave.
- **Article I — Rights & Rules** — the rules that cannot be quietly changed.
- **Article II — Personhood, Identity & Continuity** — One-person continuity, recovery, guardianship, and dependent protection without surveillance scoring.
- **Article III — Real Capacity & Reserves** — how the system measures food, water, energy, shelter, care, medicine, and reserves.
- **Article IV — Survival** — how Essential Access becomes real access to basics.
- **Article V — Markets, Commons & Public Finance** — Flow, housing, land, business, public banking, and public funding.
- **Article VI — Voice, Service Record & Public Decisions** — how people help set priorities without creating social credit.
- **Article VII — Public Records & Warning Systems** — dashboards, audits, and early warnings.

## Architecture flow

The constitution is built in five layers. Each layer depends on the one above it and feeds signals back up.

| Layer | Article(s) | What it does | What it sends down |
|---|---|---|---|
| **Foundation** | Founding Order | Sets subsidiarity, consent, and exit rules that apply to every article | Scale and participation constraints |
| **Rights** | I — Rights & Rule of Law | Constitutional limits that bind every operational article below | Rights constraints on all |
| **Inputs** | II — Personhood & Identity · III — Physics & Reserves | Establishes *who is eligible* (identity) and *what exists to deliver* (measured capacity) | Eligibility signals; capacity limits and scarcity signals |
| **Operations** | IV — Survival & Essential Access · V — Markets, Commons & Public Finance | Delivers survival goods; manages markets, housing, public banking, and commons revenue | Delivery outcomes; production and finance flows |
| **Accountability** | VI — Voice & Deliberation · VII — Transparency & Scanning | Voice shapes priorities; Transparency audits the whole system | ↑ Priorities back to V; audit signals back to I and V |

**Feedback loops:** Article VII (Transparency) sends audit visibility back up to Article I (Rights) and public accountability signals back to Article V (Markets). Article VI (Voice) sends priorities and legitimacy inputs back to Article V. Article V sends production and housing flows back down to Article III for physical constraint updates. The system is designed to self-correct — failures surface at the accountability layer and travel back up to the rights and constraints layers rather than accumulating silently.

## Document set

### Public release docs

| Document | Purpose |
|---|---|
| [One-Page Overview](./docs/public/01_overview.md) | One-page introduction for first-time readers. |
| [Public Readiness Guide](./docs/public/03_readiness.md) | Skeptic reading path, claims audit, readiness dashboard, and evidence map. |
| [Claims & Evidence Register](./docs/governance/Claims_Evidence_Register.md) | Public claim status, evidence needs, and proof gaps. |
| [Pilot Evidence Roadmap](./docs/governance/Pilot_Evidence_Roadmap.md) | Pilot sequence, metrics, failure criteria, and scale-up gates. |
| [FAQ](./docs/public/02_faq.md) | Public-facing answers to the most common objections and questions. |
| [White Paper](./docs/public/04_white_paper.md) | Plain-language public explanation. |
| [Rights Layer](./docs/public/05_rights_layer.md) | Plain-language summary of citizen rights and protections. |

### Core documents

| Document | Purpose |
|---|---|
| [Humane Constitution](./docs/constitution/Humane_Constitution.md) | Primary rule text, with links into the standalone annex corpus. |
| [Threat Register](./docs/governance/Threat_Register.md) | Known attack paths and proposed defenses. 27 threat IDs: 4 active controls, 16 proposed controls, 5 addressed by active non-register structures, and 2 retired IDs. |
| [Patch Log](./docs/governance/Patch_Log.md) | Change history. 31 patches: 16 active, 15 proposed, including the founding patch P-014. |
| [Hardening Queue](./docs/governance/Hardening_Queue.md) | Red-team hardening queue — session history, closed items, open items, and standing simulation requirements. |
| [Acceptance Protocol](./docs/constitution/Acceptance_Protocol.md) | Process for moving patches from design to operation. |

## Technical Specifications

| Document | Purpose |
|---|---|
| [Constitutional Invariants](./docs/constitution/INVARIANTS.md) | Seven constitutional invariants (INV-001 through INV-007). Tier 1 protected. Any patch that violates these is rejected at intake. |
| [Formal Specifications](./docs/constitution/SPECIFICATIONS.md) | Formal state machine definitions for Flow, Essential Access, Voice, Service Record, and Shared Storehouse. Demurrage function, issuance constraints, oracle consensus rules, and parameter tables. |
| [Adversarial Narrative Simulation](./docs/simulations/Adversarial_Narrative_Simulation.md) | 10 simulated narrative attacks with structural responses and residual risks. |
| [Annual Compound Simulation](./docs/simulations/Annual_Compound_Simulation.md) | Month-by-month operational year stress-test across the constitutional architecture. |
| [Founding Pre-Activation Disclosure](./docs/governance/Founding_Preactivation_Disclosure.md) | Founding instrument pre-activation disclosure. |
| [Simulation Model Outline](./simulations/model_outline.py) | Agent-based simulation scaffold (Mesa framework). Models Essential Access and Flow interactions across citizen and adversarial agents. Four scenario runners: baseline, oracle stress, high demurrage, adversarial density. |

### Annexes (`docs/annexes/`)

The annex corpus now lives entirely as standalone documents. Use the [Annex Directory](./docs/annexes/INDEX.md) as the entry point for constitutional annexes, hardening clauses, and detailed specifications.

## Validation

The repository includes a corpus validator for the live constitutional document set:

- `python3 -m pip install -e .[test]` installs the reproducible simulation and test dependencies.
- `python3 scripts/validate_corpus.py` checks local markdown links, annex-index coverage, FC/T/P identifier integrity, and deprecated live terminology.
- `python3 -m pytest -q` runs the simulation test suite from the packaged environment.
- `npm run check:corpus` from `app/` regenerates the reader corpus and fails if generated files are not committed.
- GitHub Actions runs the same validator on every push and pull request, alongside frontend build, generated-corpus drift, and reader regression checks.

## Major Risks

The project names its biggest failure paths instead of hiding them.

### 1. Bad Measurement

Essential Access depends on knowing what society can actually provide.

If the system measures food, housing, medicine, water, or energy badly, people can be harmed. A captured measurement system could make shortages look fake or make capacity look larger than it is.

The defense is to use several different measurement sources, public methods, direct physical checks, and review when sources start copying the same assumptions.

Remaining risk: the people who define "good measurement" still hold power.

### 2. Backdoor Conversion

Essential Access is not supposed to become money. But people may try to trade around the rules.

Example: a broker pays someone in Flow to use their Essential Access for someone else. Or a business prices services in "Essential Access equivalents" without touching the official system.

The defense is to make Essential Access personal, limit delegation, watch for broker patterns, and focus enforcement on scalable abuse rather than ordinary help between people.

Remaining risk: small hidden exchanges will still happen. The goal is to stop them from becoming a power structure.

### 3. Political Reversal

A later government could try to hollow the system out while keeping the words on paper.

It could defund delivery, appoint hostile officials, weaken measurement, or stop publishing records.

The defense is a protected basic floor, transition audits, public triggers when institutions are left empty, and exit rights for places that no longer consent.

Remaining risk: no document can fully stop a determined political movement with enough power. The design can buy time, raise the cost, and make the attack visible.

## Hardening history

The system has been adversarially stress-tested:

| Threats addressed | Key findings |
|---|---|
| T-001 Shadow Convertibility, T-002 Identity Exploits, T-004 Incentive Collapse, T-007 Definition Drift | Four patches now ACTIVE |
| T-005 Governance Throughput, T-006 Measurement Lag, T-008 Bureaucratic Elite Formation, T-011 Narrative Surface | Dual-queue CRP, PCRP first-responder authority, diversity controls, failure doctrine |
| T-012–T-015 (Interface threats) | Compound tests revealed triple-deadlock risk; oracle independence requirement; demand-context flag |
| T-009 Grace Exploitation Loop | Graduated renewal intensity; Service Record slow-decay; hardship attestation collusion detection |
| T-016 Formal Acceptance Process Capture | Evidence farming, sign-off deadlock, urgency exploit, audit capture all patched |
| T-017 Bootstrap Problem | One-time founding instrument (P-014) resolves P-013 circular dependency; founding window extended to 60 days |
| T-018–T-019 PCRP Attack Surface | False-trigger exhaustion and demand-context suppression attacks registered and patched (P-015) |
| T-020–T-021 Oracle Independence | Epistemological and algorithmic oracle capture registered; methodology-class diversity and AI supply-chain transparency required (P-017) |
| T-022 Electoral Cycle Capture | Hostile successor government routes identified; entrenchment ladder, Essential Access floor persistence, transition protocol designed (P-018) |
| T-023–T-025 Pilot validity, Shared Storehouse oracle failure, demurrage capture | External validity gate (P-019), Shared Storehouse oracle-failure fallback (P-022), demurrage sector-capture resolved: contract-commitment architecture, zero exemptions (P-023) |

**Current status: 16 patches active and 15 proposed, including the founding patch P-014.** The Threat Register currently has no fully open threat with no mitigation path, but many controls still need pilot evidence, activation, and outside review.

## What this system is not

| Common fear | Plain response |
|---|---|
| A hidden social credit system | Voice and Service Record cannot buy rights, goods, immunity, or survival access. Human worth is never measured. |
| A command economy | Flow still runs markets, prices, contracts, business, and innovation. The system limits power, not all trade. |
| A welfare bureaucracy | Essential Access is grounded in measured physical capacity, clear basket rules, and reviewable scarcity procedures. |
| A surveillance state | Identity and dashboards use minimum necessary data, aggregation thresholds, and selective disclosure. |
| A rentier loophole | Land and housing are use-rights with anti-vacancy rules, not speculative ownership. |

## What will go wrong (pre-committed)

The system acknowledges expected operational imperfections before they occur:

- **PCRP false triggers** — will happen; detection, termination, and public post-mortem within 7 days are the designed response
- **Oracle disputes** — will happen; conservative defaults protect access while disputes resolve
- **Shared Storehouse scarcity activations** — will happen during genuine shortage; managed rationing instead of price-spike exclusion
- **Enforcement errors** — will happen; partitioned wallets and due process are the correction mechanism
- **Measurement uncertainty** — is permanent; published confidence bands are the honest response

The system's commitment: every failure in these categories is published publicly, with a timeline and a correction path. Silence is the violation, not the failure.

## Scale readiness checklist

Scale readiness requires:

- [x] Public readiness guide — see [Public Readiness Guide](./docs/public/03_readiness.md)
- [x] Claims and evidence register — see [Claims & Evidence Register](./docs/governance/Claims_Evidence_Register.md)
- [x] Pilot evidence roadmap — see [Pilot Evidence Roadmap](./docs/governance/Pilot_Evidence_Roadmap.md)
- [ ] Formal acceptance of PROPOSED patches (pilot evidence required)
- [x] CFRL one-page publication — see [Rights Layer](./docs/public/05_rights_layer.md)
- [x] Adversarial narrative simulation — see [Adversarial Narrative Simulation](./docs/simulations/Adversarial_Narrative_Simulation.md)
- [x] Annual compound simulation — see [Annual Compound Simulation](./docs/simulations/Annual_Compound_Simulation.md)
- [ ] Legitimate founding coalition

The Formal Acceptance Protocol defines the pathway from design to operation.

## How to engage

**If you want the shortest public intro:** read the One-Page Overview first.

**If you want the public case first:** read the White Paper, then the Citizen-Facing Rights Layer and Public FAQ.

**If you want to stress-test the design:** read the Threat Register after the White Paper.

**If you want the exact rule text:** read the Humane Constitution after that.

**To critique, challenge, or contribute:** open an Issue with your specific objection, the section it applies to, and your proposed alternative. Vague objections will be asked to specify. Specific objections will be taken seriously.

**To cite this work:** see `CITATION.cff` in this repository.

## License

This work is released under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You may share, adapt, and build on it for any purpose, including commercial, as long as you give appropriate credit.

---

*This is not a utopia machine. It is a rule design for keeping basic needs, markets, and public power from collapsing into one tool: money.*
