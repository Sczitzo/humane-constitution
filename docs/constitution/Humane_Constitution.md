# The Humane Constitution

**Constitution for a Humane Civilization**  
*A Charter of Human Dignity, Stewardship, and Non-Coercive Order*

---

## Philosophical Preamble

Every system that governs human survival makes a claim about what value is and who it belongs to. Most systems make that claim implicitly, buried inside institutional arrangements that appear neutral. This protocol makes it explicitly, because the claim drives every architectural decision that follows.

There are two categories of value that human societies generate. The first is produced value — the product of individual effort, skill, and productive activity. A person who builds something has a traceable causal relationship to what they built. A claim on that value is logically coherent because the grounding relationship exists. This is why ownership of what one produces is not merely a legal convention but a structural fact: the causal chain from individual action to outcome is real and traceable.

The second category is value that exists prior to and independently of individual action. Land does not become valuable because any single person improved it — it becomes valuable because a society grew around it. The electromagnetic spectrum was not created by its licensees. Environmental capacity was not manufactured by those who consume it. The accumulated knowledge passed between generations was not authored by any living individual. These are encountered conditions, not produced outcomes. A private claim on this value — what we call the Commons — asserts a causal relationship between individual effort and outcome that simply does not exist.

This is not a moral argument. It is a structural one. The distinction between produced and unproduced value is a distinction in kind, not in degree. It holds regardless of legal convention, historical practice, or political agreement, because it refers to something those things cannot alter: whether or not a specific human action brought a specific value into existence.

Modern monetary systems collapse this distinction. A single instrument — money — carries claims on produced value, claims on unproduced Commons value, and claims on the future labor of people who had no voice in the obligations those claims impose. When all three ride on the same instrument, the system becomes self-referential. The Commons is privately enclosed. Measurement adapts to conceal the growing gap between monetary claims and physical reality. Labor ceases to be voluntary and becomes the mechanism through which prior obligations — obligations the laborer did not incur — are serviced. Wealth converts into coercion not through malice or moral failure, but through the normal operation of a system whose instruments were never separated.

Policy cannot correct this. A tax on land value reduces the symptom while the structural condition persists. A reformed price index makes the measurement more honest while the thing being measured remains unchanged. Better legal protections for workers operate within the system that transforms labor into obligation in the first place. Corrections that operate within a structure are subject to its logic. They can slow the failure mode; they cannot alter the condition that produces it.

Structural failure requires structural correction.

The correction this protocol proposes is instrument separation. Rather than attempting to make money better, it removes the survival function from money entirely. The Essential Access is not a cash transfer denominated in better currency. It is a non-monetary entitlement, denominated in physical basket units, that never enters the price system. A landlord cannot raise rent to absorb it because it is not money. A government cannot quietly defund it through a budget line because it is not a budget line. An employer cannot suppress wages in anticipation of it because it does not flow through the labor market. It does not carry prior claims on anyone's future labor because it is not a debt. It is access — direct, physical, unconditional.

The Flow runs markets. It carries claims on produced value and is subject to demurrage — a time-cost on idle accumulation — so that the compulsion to hoard is structural rather than merely discouraged. Voice governs bounded civic priorities, and Service Record governs readiness for rotating public service; neither can convert into economic power or survival leverage. And in verified scarcity, emergency rationing replaces price-spike exclusion. Each instrument has one job. The walls between them are the system.

What remains unresolved in this design is not its architecture but its founding. The protocol acknowledges openly that constituting a legitimate founding coalition without already having the governance system one is trying to found is a circular dependency it can manage but not dissolve. It acknowledges that measurement systems can satisfy every formal criterion for independence while sharing the same epistemological foundations. It acknowledges that every layer added to prevent capture creates a new surface for capture. These are not failures of design. They are permanent operating conditions that honest design accounts for, documents, and publishes before the system ever runs.

This protocol was built in public, stress-tested adversarially, and released without restriction. If it is wrong, it should be possible to show that. If it is incomplete, it should be possible to extend it. The measure of its legitimacy is not that it claims to have solved what no one has solved, but that it is honest about what it has and has not.

*Philosophical grounding informed in part by Marc Wolf's Economic Trilogy (2026), which derives from first principles the distinction between produced and unproduced value and the structural failure of debt-based monetary systems. The protocol extends that derivation into institutional architecture, particularly the conclusion that monetary dispersal of Commons value remains capturable by the mechanisms Wolf documents in Part 2 — and that non-monetary instrument separation is the structural completion of the correction his framework points toward.*

---

**Document posture:** this file is the lean constitutional text. Supporting annexes, hardening clauses, and detailed specifications live in the standalone annex corpus at [`docs/annexes/INDEX.md`](docs/annexes/INDEX.md).

### Authoritative document set (current)
1. **Humane Constitution** — primary constitutional source of truth.
2. **Threat Register** — living adversarial model and control inventory.
3. **Patch Log** — change ledger and risk traceability record.
4. **Public White Paper** — public-facing explanatory document aligned to the Humane Constitution.
5. **Diagrammed Technical Reference** — visual system map aligned to the Humane Constitution.

**Working edition:** this is the current constitutional text for a flow-based economy, unconditional survival, and capture-resistant governance.

### 0. Scope, Assumptions, and Design Invariants
**Scope:** This document describes a high-level governance and monetary architecture intended to prevent survival coercion, wealth-to-power conversion, and institutional capture while preserving competitive enterprise and personal freedom.

**Assumptions:** (a) society can measure key physical capacities with acceptable accuracy, (b) identity systems can prevent mass fraud without creating a surveillance state, and (c) essential goods and services can be defined and provisioned as a baseline.

**Non-negotiable invariants**
- **Survival is unconditional:** access to a baseline of essentials is guaranteed by existence, not employment or compliance.
- **Constitutional Survival Minimum:** no ordinary process may reduce the survival floor below the explicit survival minima defined in Annex Y; only H-3 refounding authority may amend that floor.
- **Human worth is not measured:** no score can gate personhood, dignity, or access to essentials.
- **Separation of concerns:** survival, enterprise, and governance use distinct instruments with strict non-convertibility.
- **Money creation is a public function:** only protocol-authorized issuance bodies may create Flow or Flow-equivalent purchasing power.
- **No taxes on ordinary life:** survival access, ordinary labor, and basic household exchange may not be taxed as routine revenue sources.
- **Families may pass continuity, not domination:** homes, tools, and modest succession may be protected, but perpetual dynastic wealth structures and inherited ruling claims are prohibited.
- **Ownership is stewardship, not tribute:** land, housing, and enterprise rights may reward use, risk, and contribution, but may not justify perpetual passive extraction from others' necessity or labor.
- **Influence cannot be purchased:** governance influence is earned through verified stewardship and decays over time.
- **Reality anchoring:** issuance of survival instruments is capped by verified physical capacity with conservative safety margins.
- **Due process and auditability:** enforcement is constrained by transparent rules, appeal paths, and independent oversight.

**Architectural enforcement layer (Proposal 1 close-out, 2026-04-18).**
The above invariants are not only textually protected but **mechanically enforced** via the architecture/ directory:
- [`architecture/parameter_registry.md`](architecture/parameter_registry.md) — Tier 1 parameter registry with cryptographic hash commitment.
- [`architecture/amendment_protocol.md`](architecture/amendment_protocol.md) — 7-of-9 holder signatures (FC-110) and 180-day timelock (FC-111) required for any Tier 1 change.
- [`architecture/drift_chain.md`](architecture/drift_chain.md) — append-only published version history; silent modification is detectable at first operational-node startup.
- [`architecture/implementation_binding.md`](architecture/implementation_binding.md) — every bound component verifies the drift-chain head on startup and refuses to operate on unverified state (with the CSM-dispensation exception per Annex Y unconditionality).

Changes to Tier 1 invariants require the full architectural process. Changes to the architectural enforcement layer itself are also Tier 1 and subject to the same process (recursive). The architectural layer protects against silent drift below the amendment threshold; it does not and cannot prevent legitimate H-3 amendment by a lawful supermajority of holders, but it guarantees visibility, response time (180 days), and public auditability of any such change.

**Founding Order — Subsidiarity, Consent & Exit (Proposal 5 close-out, 2026-04-18).**
Beneath the seven operational articles, this protocol rests on a foundational scale-and-consent layer, the **Founding Order**, that defines who consents to be governed by the protocol, at what scale, and how they withdraw. The Founding Order is Tier 1 architectural:
- [`founding/order/README.md`](founding/order/README.md) — overview and integration with the current Founding Order + Articles I-VII architecture.
- [`founding/order/subsidiarity_rule.md`](founding/order/subsidiarity_rule.md) — decisions default to the smallest competent scale; federation action requires affirmative justification.
- [`founding/order/consent_protocol.md`](founding/order/consent_protocol.md) — affirmative consent is a published act, not a presumption. Non-consenting units are outside protocol scope except for the CSM floor.
- [`founding/order/exit_protocol.md`](founding/order/exit_protocol.md) — any locality or larger unit may exit by **2/3 resident-personhood supermajority (FC-120)** with a **730-day graceful unwind (FC-121)**. Essential Access continuity is preserved for individuals during unwind; no exit tax, no forfeiture.
- [`founding/order/reentry_protocol.md`](founding/order/reentry_protocol.md) — procedurally symmetric re-entry; no penalty for previously-exited units.
- [`founding/order/jurisdictional_scales.md`](founding/order/jurisdictional_scales.md) — five scales per **FC-122**: household, neighborhood (≤500), locality (≤5,000), region (≤500,000), federation.

The Founding Order is read *through* every operational article: each article's default resolution scale is the smallest competent unit; federation-scale operation requires affirmative justification under the subsidiarity rule. Tier 1 human-dignity invariants (CSM) are the single exception that binds everywhere regardless of consent — because human dignity is not a subject of vote.

---

## How to read this document
- **Main body:** Sections I-VIII state the constitutional architecture, operating logic, baseline settings, and illustrative user flows.
- **Annex corpus:** standalone annex documents live in [`docs/annexes/INDEX.md`](docs/annexes/INDEX.md). Use that directory for threat operations, change control, transition mechanics, hardening clauses, and detailed operational guidance.

---

### 0A. Moral Scope, Spiritual Limits, and Stewardship Orientation
This Protocol governs external civic and economic order. It does not claim to perfect human nature, eliminate moral corruption, or produce inward transformation.

It aims in the civic sphere to protect intrinsic human dignity, restrain domination and extraction, preserve stewardship and truthful accountability, and protect the liberty of conscience, worship, and voluntary obedience to God.

This Protocol proceeds from moral realism: human beings are capable of creativity, stewardship, service, love, deception, domination, and corruption. For that reason, power must be bounded, exploitation restrained, and dignity protected.

This Protocol therefore should be read as a framework for civil stewardship, not as a claim to save, sanctify, or morally complete the human person. Just institutions can reduce structural evil and protect the conditions under which moral responsibility, family life, worship, service, and voluntary faithfulness may flourish; they cannot create innocence or holiness by administration.

No part of this Protocol may be read as a substitute for truth, virtue, worship, repentance, or reverence before God. It regulates public order; it does not replace the inward transformation that belongs to conscience, conviction, repentance, and God.

**God-honoring civic commitments (non-coercive)**
1. **Anti-idolatry of wealth and power** - No instrument, institution, or office within this Protocol may treat accumulation, price power, market leverage, or administrative dominance as a measure of moral worth or civic superiority.
2. **Stewardship of time and rest** - Public and economic institutions should preserve rhythms of rest, family life, worship, recovery, and reflection, and must not treat endless extraction of labor as a civic good.
3. **Freedom of conscience before God** - Persons, families, congregations, and voluntary communities retain protected space to seek, worship, obey, and serve God according to conscience, provided they do not violate the baseline dignity and protections owed to others.

The Protocol shall not be interpreted to authorize religious scoring, compelled worship, coerced profession of belief, or state management of salvation. It preserves freedom of conscience and worship while refusing both moral neutrality toward domination and coercive religion.

---

## I. Philosophy: Physics Over Finance
The prevailing system fails when financial claims on the future outgrow the physical reality of the present. This protocol treats money and power as constrained by measurable capacity, time, and accountability.

**Core framing**
- **Money is a flow, not a stock:** instruments are designed to circulate, not accumulate indefinitely.
- **Survival rights are non-accumulable:** you cannot hoard future survival at the expense of others.
- **Civic influence is kinetic:** it exists while you are actively stewarding the commons, then fades.

---

## II. Monetary Architecture (distributed across Articles IV, V, and VI)
To prevent corruption and category errors, the protocol uses five separated instruments across four lanes. Only one is money. One protects the survival floor, two are civic instruments, and one is a temporary emergency instrument.

*Instrument-to-article mapping: **Essential Access** lives in **Article IV (Survival)**, **Flow** and **Shared Storehouse** live in **Article V (Markets, Commons & Public Finance)**, and **Voice** and **Service Record** live in **Article VI (Voice, Service Record & Deliberation)**.*

### 1) Flow - The Currency
- **Purpose:** production, trade, innovation, non-essential consumption, payroll, procurement, and settlement.
- **Nature:** Flow is the sole general-purpose currency and the common accounting denominator for market pricing and public finance.
- **Form rule:** Flow operates primarily as a public digital currency secured by cryptographic methods, while physical cash or equivalent offline bearer instruments remain permanently available for privacy, resilience, and universal access.
- **Issuance rule:** Flow is issued only against verified productive commitments through the Annex X channels - payroll, milestone-bound project escrow, essential-services procurement, public infrastructure windows, and tightly bounded continuity backstops. All issuance is provenance-tagged at audit level, approved under dual-key review (and enhanced review above threshold), and released with a published unwind path. Private banks, funds, and lenders may lend or intermediate existing Flow, but may not create new Flow, Flow-denominated deposit substitutes, or other currency-like purchasing power by debt expansion.
- **Circulation rule:** Flow may transfer freely within lawful market activity, but remains subject to anti-hoarding, anti-monopoly, and anti-rent-seeking constraints.
- **Idle-value rule:** Flow decay is a calibrated anti-hoarding tool, not a punishment for productive planning. The default Option B rate is 0.5% per month on idle balances above a published operating-float exemption, with review inside a 0.25%-1.00% corridor based on hoarding signals, investment blockage, and concentration metrics.
- **Banking rule:** basic payments, custody, wage receipt, transfers, and cash access operate on public infrastructure funded through Article V public finance and commons revenue (PFCR); any licensed retail provider serving the public must offer the baseline public banking floor on the common rail.
- **Investment channel:** protected capital treatment is not a blanket exemption. Time-bound project escrows, build accounts, term-finance pools, catastrophe reserves, and public infrastructure windows may hold Flow without ordinary idle decay only while funds remain preregistered, ring-fenced, milestone-reviewed by independent auditors, and subject to reversion if purpose drifts or deadlines become circular.

### 2) Essential Access - The Guarantee
- **Purpose:** baseline essentials such as food, water, basic shelter/heat, basic transit, essential healthcare/medicines, crisis mental-health care, and explicit mental-health continuity.
- **Nature:** Essential Access is not money. It is a non-transferable entitlement ledger that authorizes access to the essential basket.
- **Constitutional floor:** Essential Access may never be narrowed below the Constitutional Survival Minimum defined in Annex Y, even when the broader essential basket is under review or temporary substitution is required.
- **Cycle rule:** Essential Access is issued as a daily micro-allocation derived from the weekly baseline, with each daily tranche valid for 72 hours; this smooths demand, limits hoarding, and avoids single-day expiry cliffs.
- **Protection rule:** Essential Access cannot be sold, pledged, collateralized, or informally monetized; narrow caregiver/dependent exceptions must remain capped, auditable, and reversible when coercion appears.

### 3) Voice + Service Record - Deliberation & Service
- **Purpose:** the civic instruments are split into two bounded functions. Voice governs short-horizon agenda-setting and budget prioritization; Service Record governs eligibility to serve on juries, panels, rotating review bodies, and oversight roles.
- **Nature:** neither Voice nor Service Record is money. Both remain non-transferable, non-convertible, and narrow in function. Voice is fast-decay and low-cap; Service Record is slower-moving and service-oriented.
- **Anti-capture rule:** Voice may never purchase goods, private privilege, legal immunity, or survival access, and Service Record may never be traded, inherited, collateralized, or pooled as a patronage asset. Survival-adjacent decisions remain protected by one-person-one-vote legitimacy checks, and no single contribution sector may dominate effective civic weighting.

### 4) Shared Storehouse - The Emergency Brake
- **Purpose and limit:** Shared Storehouse is a temporary, category-specific emergency quota instrument activated only during verified scarcity. Shared Storehouse is not money, is not permanent, is non-convertible, and must terminate when scarcity mode ends.
- **Separation rule:** Flow is the only true currency. Essential Access, Voice, Service Record, and Shared Storehouse are not money and may not be converted, pooled, sold, wrapped, or re-created through indirect markets, queue trading, or proxy contracts.

---

## III. Founding Order and Articles of Constitutional Order

The **Founding Order** governs scale, consent, and exit. Every **Article** then has a narrow job, explicit inputs/outputs, and a hard boundary to prevent category errors such as turning wellbeing metrics into coercion. The Founding Order reads through every article: each article defaults to the smallest competent scale under the subsidiarity rule, and federation-scale action requires affirmative justification.

### Constitutional architecture at a glance

**Founding Order — Subsidiarity, Consent & Exit**  
Defines the smallest competent scale for every decision, the affirmative consent act by which units join the constitutional order, and the graceful-exit pathway by which they leave. This is the foundation that makes every article non-coercive by construction.

**Article I — Rights & Rule of Law**  
Tier 1 constitutional invariants (dignity, due process, non-coercion, separation-of-concerns) combined with rule-bound execution of those rights. Oversight-of-execution lives here because rights and their enforcement are one function; the S3* audit channel is architecturally separated in Article VII.

**Article II — Personhood, Identity & Continuity**  
Proof-of-personhood, guardianship, recovery, and dependent continuity without surveillance scoring.

**Article III — Physics & Reserves**  
Polycentric measurement of physical capacity (food, water, energy, shelter, medicines) and the strategic reserves that buffer measurement error and supply shocks — one capacity-function under one constitutional article.

**Article IV — Survival**  
Essential Access as instrument and delivery path together. One definition and one attack surface under a single constitutional function.

**Article V — Markets, Commons & Public Finance**  
Flow, land and housing use-rights, anti-monopoly enterprise, and Public Finance & Commons Revenue (PFCR) unified under one production-and-revenue article.

**Article VI — Voice, Service Record & Deliberation**  
Voice, Service Record, the contribution-recognition that mints them, and the deliberation processes they feed — the civic input-output pipeline as one article.

**Article VII — Transparency & Environmental Scanning**  
Real-time public dashboards (the S3* audit channel, genuinely independent of Article I's control channel) plus Beer-VSM S4 external-world scanning. The reporting function has no institutional overlap with the operating function.

### Founding Order and article interfaces
*Order / Article + Interfaces ↔ Boundary (cannot touch)*

**Founding Order — Subsidiarity, Consent & Exit**
- → All articles: sets the default scale of action and the consent basis for protocol operation.
- Cannot override the Tier 1 human-dignity floor (CSM), which applies regardless of consent.

**Article I — Rights & Rule of Law**
- → Constraints for all articles plus rule-bound execution of those constraints.
- Cannot be overridden by Voice, Service Record, or Flow decisions or by operational expedience.

**Article II — Personhood, Identity & Continuity**
- → Eligibility and continuity signals (minimal, privacy-preserving).
- Cannot become surveillance scoring.

**Article III — Physics & Reserves**
- → Capacity indices and reserve buffers for Articles IV and V.
- Cannot issue beyond conservative margins; cannot absorb control functions from Article I or audit functions from Article VII.

**Article IV — Survival**
- → Essential Access issuance, daily allocation, and essential service delivery.
- Cannot condition survival on behavior; cannot permit Essential Access monetization or conversion.

**Article V — Markets, Commons & Public Finance**
- → Flow issuance and decay, housing and commons use-rights, enterprise competition, commons-revenue routing, and the public banking rail.
- Cannot allow instrument conversion, enable speculative rents, create monopolies, or tax survival or ordinary labor.

**Article VI — Voice, Service Record & Deliberation**
- → Voice and Service Record minting, priority-setting, and authorized public decisions.
- Cannot change constitutional rights; cannot rank human worth; cannot convert into economic power.

**Article VII — Transparency & Environmental Scanning**
- → Public accountability signals across the order and external-world scanning.
- Cannot publish re-identifiable data; cannot share an institutional home with Article I control (S3/S3* independence).

---

### Founding Order and article detail

#### Founding Order: Subsidiarity, Consent & Exit
- **Subsidiarity rule:** decisions default to the smallest competent scale — household, neighborhood (≤500 persons), locality (≤5,000), region (≤500,000), federation — with federation-scale action permitted only where cross-regional externality, physical-scale infrastructure, or constitutional-floor enforcement is affirmatively justified (`founding/order/subsidiarity_rule.md`).
- **Scale hierarchy (FC-122):** five scales with quantitative bounds; no empty scales; Tier 1 locked. Multi-scale competence disputes default against escalation.
- **Consent protocol:** affirmative 2/3-supermajority consent, 90-day notice, 60-day deliberation, roll-call, 2/3 minimum participation. Non-consenting units are outside protocol scope except for the Tier 1 human-dignity floor (CSM).
- **Exit protocol (FC-120, FC-121):** any unit at locality scale or larger may exit by 2/3 resident-personhood supermajority with a 730-day graceful unwind. Essential Access continuity is preserved during unwind; no exit tax; no forfeiture.
- **Re-entry protocol:** procedurally symmetric to accession; no penalty for previously-exited units; 365-day floor between exit events to prevent cycling.
- **Individual consent withdrawal:** a person may withdraw individual consent at any time; Tier 1 CSM floor continues unconditionally.
- **Relationship to the articles:** the Founding Order is read through every article. Article I rights remain protected regardless of scale; Articles III, IV, V, and VII each resolve to the smallest competent scale by default unless an affirmative federation-level justification is met.

#### Article I: Rights & Rule of Law
- **Survival is unconditional:** baseline essentials are guaranteed and cannot be withdrawn as punishment.
- **Constitutional Survival Minimum:** no ordinary process may reduce the survival floor below Annex Y minima; only H-3 refounding authority may amend.
- **Human worth is not measured:** no score or metric can gate dignity, personhood, or survival access.
- **Due process:** enforcement requires transparent rules, appeal paths, and independent oversight.
- **No taxes on ordinary life:** survival access, ordinary labor, and basic household exchange may not be taxed as routine revenue sources.
- **Separation-of-concerns:** survival (Essential Access), enterprise (Flow), and the civic instruments (Voice and Service Record) remain distinct and non-convertible.
- **Money creation is public:** only protocol-authorized issuance bodies may create Flow or Flow-equivalent purchasing power.
- **Families may pass continuity, not domination:** modest succession may be protected, but perpetual dynastic wealth structures, trusts, and inherited ruling claims are prohibited.
- **Ownership is stewardship, not tribute:** rights in land, housing, and enterprise may reward use, risk, and contribution, but may not justify perpetual passive extraction from others' necessity or labor.
- **Non-coercion:** Voice, Service Record, and Flow can never purchase or condition constitutional rights.
- **Rule-bound execution:** implementation of authorized decisions runs through rule-bound workflows with a published discretion taxonomy, documented reasons, and reviewable boundaries. Oversight enforces fraud/coercion/bribery rules proportionally, protects dependents and innocent counterparties, and avoids collateral harm. Staged rollouts, canary deployments, rate limits, narrow emergency pauses, competency-based auditable hiring/procurement, and published SLA/incident/correction logs are mandatory.
- **Anti-capture oversight:** independent audits, rotation, conflict-of-interest rules, and funded red-teaming are mandatory system features. The S3/S3* independence rule requires that audit (Article VII) be institutionally separate from control (this article) — the reporting function may never share an institutional home with the operating function it reports on.
- **Architectural enforcement:** Tier 1 invariants are mechanically enforced via the `architecture/` directory (7-of-9 amendment, 180-day timelock, drift chain, implementation binding) per Proposal 1 close-out.

#### Article II: Personhood, Identity & Continuity
- **One-person-one-core-wallet** to prevent Sybil attacks and duplicate Essential Access claims.
- **Privacy-preserving verification** with selective disclosure; collect the minimum data required.
- **Continuity rules:** guardianship, incapacity, birth/death handling, and uninterrupted dependent coverage.
- **Household composition verification:** household composition claims that trigger resource allocation changes — including housing space expansion, Essential Access dependent transfers, or caregiver exceptions — require verified co-habitation and genuine dependency under a published evidence standard. A minimum verification period applies before any allocation increase is granted. Verification is needs-neutral and relationship-neutral; it tests occupancy and dependency, not household structure or lifestyle.
- **Appeals and recovery:** robust wallet recovery and dispute resolution, designed for refugees and those without documentation.
- **Layered identity (Annex AB4):** identity powers are split by consequence — survival-floor personhood, provisional personhood, core resident identity, and later civic activation. No single document, biometric, institution, or device may serve as the sole irreversible authority.

#### Article III: Physics & Reserves
- **Polycentric measurement:** multiple independent sources publish capacity and scarcity indices; minimum N=5 nodes per cohort, minimum 3 methodology classes, with pairwise-correlation tests and at least one adversarial seat per cohort (Proposal 3).
- **Conservative issuance:** buffers and safety margins remain mandatory, but methodology-only disputes do not automatically reduce issuance; challengers must produce prima facie alternative evidence or the system defaults toward continuity while audit proceeds.
- **Aggregate transparency:** publish methodology, definitions, and change logs; minimize individual-level exposure.
- **Resilience reserves (absorbed capacity function):** strategic buffers for food, water, energy, and critical medicines with replenishment rules. Reserves and measurement live in one article because reserves exist to buffer measurement error and supply-shock tails — they are the same capacity function at different time-scales.
- **Crisis fallback (Proposal 6):** published fallback protocol for measurement failure — conservative issuance defaults, reserve draw triggers, and automatic review escalation.

#### Article IV: Survival
- **Essential Access as instrument and delivery combined:** Essential Access is both a non-monetary entitlement ledger and the service pathway that turns that ledger into actual access.
- **Essential Access purpose:** baseline essentials — food, water, weather-safe shelter, basic transit, essential healthcare/medicines, crisis mental-health care, and the Constitutional Survival Minimum floor defined in Annex Y.
- **Nature:** Essential Access is not money. It is a non-transferable entitlement that authorizes access to the essential basket.
- **Constitutional floor:** Essential Access may never be narrowed below the CSM defined in Annex Y, even during scarcity modes or temporary substitution.
- **Issuance cadence:** daily micro-issuance derived from the Option B baseline using Article III capacity signals and conservative buffers.
- **Expiration:** each daily tranche expires after a 72-hour rolling window; unused expired Essential Access returns to the Capacity Pool while preserving continuity paths for illness, travel disruption, caregiving emergencies, and provider outages.
- **Non-transferability** by default to block coercion and black-market control; narrow caregiver/dependent exceptions with caps, audit, and reversibility when coercion is detected.
- **Non-convertibility rule:** Essential Access cannot be sold, pledged, collateralized, or informally monetized. Essential Access-only lane for the essential basket prevents scalable arbitrage (T-001 containment).
- **Scarcity interface:** during declared scarcity, Article V's Shared Storehouse may supplement Essential Access allocation; termination rules bind it to the end of scarcity mode.

#### Article V: Markets, Commons & Public Finance
**Core boundary rule**
- **Instruments are non-convertible** by default; any exception requires amendment-level authorization, narrow scope, and explicit anti-capture constraints.

**Flow**
- **Purpose:** production, trade, innovation, non-essential consumption, payroll, procurement, and settlement.
- **Nature:** Flow is the sole general-purpose currency and the common accounting denominator for market pricing and public finance.
- **Form rule:** Flow operates primarily as a public digital currency secured by cryptographic methods; physical cash or equivalent offline bearer instruments remain permanently available for privacy, resilience, and universal access.
- **Issuance rule:** Flow is issued only through Annex X channels (payroll, milestone-bound project escrow, essential-services procurement, public infrastructure windows, tightly bounded continuity backstops). Dual-key review, provenance tagging at audit level, and published unwind paths are mandatory. Private banks, funds, and lenders may intermediate existing Flow but may not create new Flow, Flow-denominated deposit substitutes, or currency-like purchasing power by debt expansion.
- **Circulation rule:** free transfer within lawful market activity, subject to anti-hoarding, anti-monopoly, and anti-rent-seeking constraints.
- **Idle-value rule:** default 0.5% per month demurrage on idle balances above a published operating-float exemption, with review inside a 0.25%–1.00% corridor based on hoarding signals, investment blockage, and concentration metrics.
- **Investment channel:** time-bound project escrows, build accounts, term-finance pools, catastrophe reserves, and public infrastructure windows may hold Flow without ordinary idle decay only while funds remain preregistered, ring-fenced, milestone-reviewed by independent auditors, and subject to reversion if purpose drifts or deadlines become circular.
- **Household finance rule:** compounding interest on household ordinary-life debt is prohibited. No household debt instrument may securitize the survival floor, rely on revolving traps, or recreate survival coercion through hidden fee chains.
- **Wallet partitioning:** protect payroll/essential obligations from broad freezes; target enforcement narrowly.

**Land, Housing & Commons**
- **Use-rights governance:** housing and land are governed as use-rights/leases rather than speculative ownership. No individual or private entity may extract Flow returns from residential use-rights.
- **Housing is non-profit infrastructure:** residential construction is funded through Flow public infrastructure channels and project escrows; workers are compensated in Flow, but the resulting units are held as commons and allocated as use-rights. No private housing market exists for residential units; allocation is managed by need and occupancy criteria, not price.
- **Per-person allocation floor with hard household cap:** residential space is allocated at a published per-person floor. Total allocation scales with verified household size up to a published household maximum; the commons is not obligated to expand allocation beyond the cap regardless of household composition decisions. Additional space above the per-person floor may be requested for documented accessibility needs, caregiving requirements, or disability accommodations and is subject to independent needs review.
- **Composition verification before space expansion:** household composition changes that would trigger a space-allocation increase require verified co-habitation and genuine dependency under the published standard in Article II before any additional allocation is granted. A minimum verification period applies. Births and documented medical emergencies are exempt from verification delay.
- **Quality is a civic investment, not an individual Flow purchase:** housing quality improvements are funded at the neighborhood or district level through civic deliberation (Article VI) and public Flow channels. Individual Flow wealth does not entitle any resident to a superior private unit. No Flow-priced private residential tier exists.
- **Transparent allocation:** renewal depends on occupancy and a closed-list stewardship standard (vacancy, damage beyond normal wear, verified illegal use, or clearly defined health/safety violations after remediation opportunity).
- **Family continuity without dynastic landlordism:** ordinary household continuity may be preserved, but housing and land rights may not be warehoused through trusts, shell entities, or absentee succession structures detached from active stewardship.
- **Anti-vacancy carrying costs** and accumulation limits to block rent-seeking.
- **Commons stewardship:** water, energy commons, and ecological assets governed with regenerative targets and auditability.
- **Beneficial ownership transparency:** every housing, land, and commons claim must resolve to natural persons or chartered public/community bodies; entity wrappers may not obscure effective control.
- **Dispute resolution + appeals** for allocation decisions (no hidden gatekeeping).

**Enterprise & Production**
- **Competitive and cooperative enterprise:** firms compete on quality and efficiency using Flow; worker-owned, cooperative, and mission-locked structures receive structural preference where public finance, procurement, or succession pathways are involved.
- **Anti-monopoly:** merger controls, open standards, and interoperability requirements reduce platform capture.
- **Bounded capital claims:** outside capital may fund enterprise, but investor claims must be capped, redeemable, sunset, or otherwise bounded so ownership cannot become a perpetual extraction right over labor or necessity.
- **Worker-preference tools:** PFCR-backed financing, worker buyout pathways, cooperative retained-earnings pools, and founder-exit conversion rules favor stewardship succession over absentee control.
- **Natural monopoly track:** water, energy, communications, rail, and similar infrastructure sectors require a regulated utility governance model rather than ordinary competition logic.
- **Regenerative production:** repairability, take-back/extended responsibility, and circularity incentives where feasible.
- **Anti-hoarding economics:** demurrage + transparent registries for high-value assets to deter shadow accumulation.

**Public Finance & Commons Revenue**
- **Revenue constitution:** public operations are funded through demurrage routing, commons and land-use charges, asset carrying costs, gateway fees, and bounded public issuance tied to real public production — not through taxes on survival, ordinary labor, or basic household exchange. (The no-taxes-on-ordinary-life rule itself is an Article I Tier 1 invariant; PFCR is the revenue mechanism that makes it operationally coherent.)
- **Public banking infrastructure:** the payment rail, basic custody, wage receipt, cash conversion, and fraud-recovery floor are funded as public infrastructure with a guaranteed postal-bank or public-bank option and interoperable licensed providers. Any licensed retail provider serving the public must offer the baseline public banking floor on the common rail.
- **Budget discipline:** all public funding channels require published service plans, staffing assumptions, source disclosures, and off-ledger obligation prohibitions.
- **Commons return principle:** exclusive control over commons, scarce public interfaces, or large idle asset positions may incur public charges; personhood, basic work, and household continuity may not be treated as taxable extraction bases.
- **Transparency and anti-capture:** PFCR flows, demurrage routing, gateway revenues, and major appropriations are published in aggregate (via Article VII) and subject to independent audit, anti-concentration review, and automatic challenge rights when hidden debt or favoritism appears.

**Why these functions share one article.** Flow, housing and commons use-rights, enterprise activity, and commons-revenue routing are the four faces of the same economic surface. Keeping them under one article reduces boundary disputes and narrows the capture surface.

#### Article VI: Voice, Service Record & Deliberation
**Voice and Service Record instruments**
- **Service Record:** earned through verified stewardship and service readiness; governs eligibility to serve on juries, panels, rotating review bodies, and oversight roles. Slower-moving, service-oriented.
- **Voice:** derived from recent verified contribution plus hardship-safe civic-floor rules; governs short-horizon agenda-setting and budget prioritization. Fast-decay, low-cap.
- **Non-convertibility:** Voice cannot purchase goods, private privilege, legal immunity, or survival access. Service Record cannot be traded, inherited, collateralized, or pooled as a patronage asset.
- **Civic floor:** one-person-one-vote for constitutional matters and survival-adjacent outcomes; Voice affects only bounded budget prioritization and agenda sequencing. No single contribution sector may dominate effective civic weighting.

**Contribution & Capability Development**
- **Service Record minting first:** contribution mints Service Record, not moral rank. It cannot affect Essential Access access.
- **Service Record records verified stewardship** across care, maintenance, safety, education, ecological work, civic operations, and similar domains. Voice is derived from recent verified contribution plus hardship-safe civic-floor rules, then decays rapidly to keep agenda power kinetic.
- **Verification:** scaled multi-path review. Small claims may use lightweight attestation; higher-impact claims require stronger evidence, rotating review, and audit escalation.
- **Capability adjustment:** expectations scale to disability, caregiving load, age, and crisis context. Protected Pause preserves proportionate continuity during verified hardship.
- **High-impact channel:** rare Service Record or Voice boosts require evidence-heavy Impact Review with independent panels, published criteria, and category-balance safeguards.

**Deliberation & Decision Systems**
- **Proposal pipeline:** draft → review → cost/capacity check → deliberation → legitimacy check where required → staged execution.
- **Anti-capture weighting:** Voice is capped, fast-decay, category-balanced, and subject to conflict-of-interest rules. Service Record governs service eligibility, not agenda dominance.
- **Quarterly decision cycle (baseline):** priorities set quarterly through Voice; no rollover is permitted; no single contribution category may exceed the published balance cap in effective deliberation weight.
- **Minimum civic floor:** one-person-one-vote for constitutional matters and survival-adjacent outcomes.

**Why these functions share one article.** Voice and Service Record, the contribution acts that mint them, and the deliberation processes that consume them form a single closed loop. Keeping them together prevents the civic-input pipeline from fragmenting into separate capture points.

#### Article VII: Transparency & Environmental Scanning
**Transparency — the S3* audit channel**
- **Real-time public dashboards** for aggregate system health: capacity indices, issuance, reserves, service SLAs, and budget flows.
- **Privacy preserved:** aggregation thresholds, small-cell suppression, rounding/noise where needed, and time delays for sensitive signals.
- **Transparency:** publish definitions, sources, refresh rates, and a public change log for metrics and methodologies.
- **Abuse-resistance:** delay/rate-limit gameable signals; disputes trigger conservative issuance and review.
- **Institutional independence:** Article VII is organizationally separate from Article I's control function. The same body may never both execute and report on its own execution. This is the S3/S3* independence rule from Beer VSM — the structural reason for separating this article from Article I.

**Environmental Scanning (new S4 function)**
- **Mandate:** continuous scanning of the world outside the protocol's direct operational scope — emerging technologies, climate signals, geopolitical shifts, pandemic precursors, demographic trends, ecological tail risks — to feed anticipatory adaptation rather than reactive response.
- **Deliverables:** published quarterly environmental-scan reports with 10-year horizon, with specific attention to signals that could destabilize Article III measurement assumptions or the CSM basket.
- **Escalation rule:** scan findings that would require Tier 1 amendment trigger automatic referral to the Federated Ombuds (Annex AI) and the H-3 refounding process if warranted.
- **Why this function exists:** Beer VSM S4 (the environmental-scanning viable-system function) provides a structured process for noticing when the system's physical-world assumptions are becoming obsolete. Without it, slow-failure surfaces stay invisible until they become crises.

---

## IV. Loopholes and Patches (Threat Model Summary)
Common failure modes in multi-instrument systems and protocol-level patches intended to close them. This section is the narrative summary; Annex B is the authoritative threat register and Annex C is the authoritative operations workflow.

### 13. Essential Access coercion or black-market conversion
- **Failure mode:** people buy/sell Essential Access or force dependents to hand over Essential Access, reintroducing survival coercion.
- **Patches:** Essential Access non-transferable by default; tightly scoped caregiver transfers with caps; coercion-specific penalties; safe-report channels; anomaly detection on essential purchase patterns.
- **Residual risk:** barter cannot be eliminated; minimize incentives by guaranteeing baseline supply and keeping Essential Access usable only for the essential basket.

### 14. Hoarding essentials as goods
- **Failure mode:** even if Essential Access expires, goods can be stockpiled to gain leverage in scarcity.
- **Patches:** per-category purchase caps during declared scarcity; storage/carrying charges above baseline; shelf-life-aware rationing; resilient local redundancy and strategic reserves.

### 15. Flow demurrage avoidance via asset hoarding
- **Failure mode:** value shifts into non-decaying assets (land, commodities), recreating rent-seeking.
- **Patches:** capacity-lease model for land/housing; progressive carrying costs on large idle holdings; anti-speculation rules; transparent registry for high-value assets; strong competition policy.

### 16. Issuance capture / circular finance
- **Failure mode:** insiders create Flow through fake payroll, circular invoices, indefinite continuity backstops, or political favoritism, allowing hidden stock creation even while the protocol claims money is flow-bound.
- **Patches:** Annex X dual-key approval; provenance tags at audit level; channel ceilings with affiliate aggregation; preregistered milestone schedules; no dual-channel financing of the same obligation; automatic throttling, audit, and unwind when stale issuance, repeat rollovers, or sector favoritism appear.

### 17. Civic layer capture by 'professional contributors'
- **Failure mode:** a small class farms Voice and Service Record advantages and dominates priorities, staffing, or oversight even with decay controls.
- **Patches:** diminishing-returns voting weights; per-person caps; randomization in agenda-setting; mandatory rotation and conflict rules for review bodies; preserve one-person-one-vote for constitutional decisions.

### 18. Contribution fraud / guild collusion
- **Failure mode:** fake hours or collusive approvals mint Voice or Service Record illegitimately.
- **Patches:** multi-attestation + random audits; verifier reputation scoring; penalties for fraudulent attestations; cryptographic logs; whistleblower protections; automated anomaly flags.

### 19. Oracle manipulation / bad data
- **Failure mode:** capacity is overstated or corrupted, causing over-issuance or shortages.
- **Patches:** polycentric oracle quorum; conservative buffers; independent audits; open methods; rollback and emergency throttles; 'dispute reduces issuance' rule.

### 20. Smart contract bugs / malicious proposals
- **Failure mode:** automatic execution amplifies errors or enables exploit proposals.
- **Patches:** staged execution with mandatory review windows; formal verification for critical contracts; emergency pause with narrow triggers; post-mortems and patch governance.

### 21. Justice penalties harm innocents
- **Failure mode:** freezing wallets can harm employees/dependents or crash a firm.
- **Patches:** account partitioning (payroll escrow, dependents protection); targeted freezes (discretionary accounts first); due process; time-limited freezes pending adjudication.

### 22. Identity fraud / Sybil attacks
- **Failure mode:** multiple identities claim Essential Access or unlawfully enter Voice or Service Record pathways at scale.
- **Patches:** proof-of-personhood; periodic re-verification; fraud detection; penalties; accessible pathways for vulnerable populations; strong recovery without creating a surveillance state.

---

## V. Transition Outline

### Phase 1: Genesis and Debt Reset
- **Debt reconciliation:** eliminate or restructure unsustainable personal debts while protecting essential savings and pensions through explicit conversion rules.
- **Banking conversion:** legacy banks become regulated utilities and custodians on PFCR-funded public payment rails, with a guaranteed public banking option and bounded enterprise-underwriting functions.
- **Continuity guarantees:** ensure uninterrupted access to essentials (Essential Access) during cutover.

### Phase 2: Boundary Interface (Legacy Bridge)
- **Foreign inflow controls:** convert external capital into Flow subject to demurrage immediately, forcing productive deployment.
- **Trade membrane:** essential-capacity exports are capped to protect domestic Essential Access guarantees.
- **Security posture:** defend infrastructure and ledger integrity as critical national assets.

### Phase 3: Network Expansion (Archipelago)
- **Open standards:** publish protocol specs to enable interoperability and reduce vendor lock-in.
- **Federation:** allow other jurisdictions to adopt and interlink ledgers while preserving local sovereignty and capacity constraints.

---

## VI. A Day in the Life (Illustrative)

**Morning:** Your Essential Access refreshes for the period. You purchase essential food and transit. Any unused Essential Access expires, so waste and hoarding incentives fall and mutual aid becomes easier within safe transfer rules.

**Work:** You earn Flow through your enterprise role. Your employer reinvests rather than hoards because idle Flow decays.

**Evening:** You allocate Voice to a community project proposal while your Service Record standing keeps you eligible for future civic jury service. Because Voice fades quickly and service eligibility is separated from agenda weighting, the system rewards stewardship without allowing permanent rule.

**Audit:** You are randomly selected for a civic jury. You review a flagged pattern suggesting bribery. The oversight system triggers an investigation while protecting innocent counterparties and ensuring due process.

---

## VII. Conceptual Model and Baseline Snapshot

### Visualization cues
- **Flow:** visualize as warming coals or circulating current (value decays if idle; thrives when circulating).
- **Voice and Service Record:** visualize as a pulse/heartbeat split into Voice for short-horizon civic weighting and Service Record for service readiness. Avoid medals, ranks, or 'scores'.
- **Shared Storehouse:** visualize as a clearly bounded emergency ration or reserve valve; temporary, category-specific, and never prestige-bearing.

### Option B snapshot
- **Flow baseline (Option B):** demurrage of 0.5% per month on idle balances above the constitutional operating-float exemption; new Flow is created only against verified productive commitments through Annex X channels, with dual-key review, audit-level provenance tagging, independent milestone controls for protected windows, and staged unwind rules to prevent hidden stock creation.
- **Essential Access baseline (Option B):** daily micro-issuance with 72-hour rolling validity, anchored to the Constitutional Survival Minimum and the broader essential basket so survival continuity does not hinge on a single weekly redemption window.
- **Voice and Service Record baseline (Option B):** Voice uses a short quarterly cycle with caps, no rollover, and diminishing-returns weighting; Service Record preserves bounded service eligibility with hardship-safe continuity. Neither may be purchased, sold, inherited, or used to gate survival.
- **Shared Storehouse baseline (Option B):** activated only during verified scarcity; category-specific; non-transferable except narrow caregiver channels; and terminated automatically when scarcity mode ends.
- **Housing/land baseline (Option B):** use-rights/leases with no private housing market for residential units; construction funded through Flow public infrastructure channels with no Flow return to any private party from the housing product itself. Allocation uses a published per-person floor scaled to verified household size up to a published household maximum cap; the commons does not expand allocation beyond the cap regardless of household composition decisions. Composition changes triggering space expansion require a minimum verification period before the increase is granted (births and documented medical emergencies exempt). Housing quality improvements are funded at the neighborhood or district level through civic deliberation, not individual Flow purchase. Renewal based on occupancy and a closed-list stewardship standard limited to sustained vacancy beyond threshold, physical damage beyond normal wear, verified illegal activity tied to the premises, and clearly defined health/safety violations after remediation opportunity; anti-vacancy carrying costs; limits on accumulation of residential use-rights; strong anti-rent-seeking enforcement. Aesthetics, lifestyle, politics, relationships, visitor profile, household structure, and protected-trait proxies are prohibited bases for renewal denial or allocation weighting.
- **Privacy architecture (dial):** public transparency at the aggregate level (flows, capacity indices, project budgets), with individual transaction privacy by default; lawful access only under due process with narrow scope, logging, and independent oversight.

---

## VIII. Selected Baseline Settings (Option B)

### Essential Access - baseline settings
- **Issuance cadence:** daily micro-issuance indexed to verified capacity with a conservative buffer.
- **Essential basket (initial):** food staples + basic prepared food allowance; water/utilities baseline; basic shelter/heat; basic clothing; essential healthcare/medicines including crisis mental-health care, annual baseline mental-health assessment access, and continuity of treatment for diagnosed conditions; basic local transit.
- **Constitutional Survival Minimum (Tier 1 floor):** the protocol may not narrow below the founding schedule for caloric sufficiency, potable water, weather-safe shelter, emergency medical stabilization, basic sanitation/hygiene, crisis mental-health stabilization, and continuity for essential medicines.
- **Expiration:** each daily tranche carries 72-hour rolling validity; unused expired Essential Access returns automatically to the capacity pool.
- **Transferability:** non-transferable by default.
- **Caregiver/dependent exception:** limited transfers only to verified dependents/care networks; hard caps per week; full audit trail; rapid reversal pathway for coercion cases.

### Flow - baseline settings
- **Demurrage:** default 0.5% per month on idle balances above the constitutional operating-float exemption; households receive a safe harbor equal to 6 months of median regional consumption expenditure, and enterprises receive the greater of 3 months average payroll or 3 months average direct operating costs measured on a rolling 12-month basis; rate review occurs within a 0.25%-1.00% corridor using hoarding, liquidity, concentration, and investment-friction signals.
- **Issuance:** Flow is created only through Annex X channels - payroll, milestone-bound project escrows, essential-services procurement, public infrastructure windows, and tightly bounded continuity backstops. Every issuance request must disclose sponsor, amount, duration, linked productive obligation, release schedule, unwind path, and conflicts; no single obligation may be financed through more than one issuance channel.
- **Transferability:** fully transferable; primary medium for market exchange.
- **Escrows/partitions:** payroll escrow and dependent-support channels are partitioned to reduce collateral harm from enforcement actions; project escrows are time-bound and auditable.
- **Housing/land:** governed via use-rights/leases, not speculative ownership; renewal depends only on occupancy plus the closed-list stewardship conditions defined elsewhere in this Protocol; anti-vacancy carrying costs apply.

### Voice + Service Record - baseline settings
- **Voice cadence:** short quarterly cycle with fast decay, no rollover, category balancing, and protected pause continuity so agenda influence remains kinetic rather than cumulative.
- **Service Record service path:** earned only through verified stewardship and service under Article VI contribution-recognition rules; Service Record governs eligibility for juries, panels, rotating review, and oversight roles and may not be bought, sold, inherited, or institutionalized as patronage.
- **Voice influence cap:** a per-person cap per quarterly decision cycle limits dominance even for high contributors; any survival-adjacent use remains advisory pending legitimacy safeguards.
- **Diminishing returns and sector balance:** Voice uses a diminishing-returns curve and published sector ceilings so one legible professional class cannot dominate effective civic weighting.
- **Participation continuity:** verified caregiving, illness, disability disruption, disaster displacement, or involuntary unemployment may activate hardship-safe continuity in both Voice and Service Record so temporary hardship does not erase civic standing.

### Shared Storehouse - baseline settings
Activation: only after a published scarcity finding under the Scarcity Index / RCS quorum; category-specific and time-limited.
- **Form:** non-transferable emergency quotas for scarce essentials (for example water, medicine, staple foods, fuel, or shelter slots) with narrow caregiver support channels only.
- **Exit rule:** Shared Storehouse terminates automatically when scarcity mode ends; repeated use triggers mandatory review of the underlying capacity failure and reserve strategy.

### Resource/Capacity Oracles - baseline settings
**Publishing model:** polycentric quorum with published methodology, declared evidence class, confidence intervals, and mandatory audits.

**Dispute rule**
Rollback/throttle: protocol includes throttles and rollback procedures for data errors or detected manipulation, with public post-mortems and patch requirements.

**Essential Access scarcity-mode thresholds (per essential category)**

| Mode | Primary trigger (days of supply) | Secondary triggers (any) | Controls activated |
| :--- | :--- | :--- | :--- |
| **Normal** | ≥ 21 days | Fill-rate ≥ 95% | Routine monitoring |
| **Watch (L1)** | < 21 days | Fill-rate < 95% for 7 days; disruption indicator raised | Soft caps; bulk rate-limits; increased audits; prepare reserve release |
| **Scarcity (L2)** | < 14 days | Fill-rate < 90% for 3 days; verified disruption (moderate) | Hard per-person caps; medical/dependent exemptions; reserve release; anti-hoarding enforcement |
| **Emergency (L3)** | < 7 days | Fill-rate < 80% for 48 hours; verified disruption (severe) | Tight rationing; centralized allocation for critical facilities; emergency imports/substitutions; temporary limits on large-volume commercial draws |

**Definitions:**
- **days of supply** = (usable inventory + committed inbound) / verified daily demand.
- **Fill-rate** = fulfilled requests / verified requests.
- Oracles must publish methods and confidence intervals.

**Caregiver / dependent support defaults**

| Mechanism | Default cap | Requirements | Auto-flags |
| :--- | :--- | :--- | :--- |
| **Delegated spend authority (preferred)** | No transfer; spend limited to dependent's own Essential Access balance and basket categories | Verified caregiver relationship; scoped permissions; immutable logs naming beneficiary | Out-of-basket attempts; unusual vendor concentration; repeated high-value edge cases |
| **Essential Access transfer (exception channel)** | Up to 10% of dependent's weekly Essential Access entitlement (per week) | Allowed only when delegation is not available; requires reason code; 7-day expiry on transferred Essential Access | Repeated transfers; multiple dependents -> same receiver; coercion pattern clusters |
| **Household pooling (shared address)** | Up to 20% of each adult's weekly Essential Access into a household wallet | Verified shared residence; all members can revoke consent; pooled Essential Access limited to basket categories | One-way pooling; rapid cycling; coercion indicators; revocation disputes |

**Voice quarterly limits and Service Record service path**
Default Voice cap: 300 raw Voice allocatable per person per quarterly decision cycle, with no rollover. Service Record is maintained separately as the service-and-eligibility record used for juries, panels, rotating review pools, and oversight selection under published fit rules.

| Raw Voice allocated in cycle | Weight multiplier | Effective Voice credited |
| :--- | :--- | :--- |
| 0-50 | 1.00x raw | 50 |
| 51-80 | 0.50x raw × 0.50 | 15 (added) |
| 81-100 | 0.25x raw × 0.25 | 5 (added) |
| > 100 | Not permitted | N/A (cap) |

Example: allocating 100 raw Voice yields 50 + (30×0.5) + (20×0.25) = 70 effective Voice.
Constitutional rules, rights, and survival access remain one-person-one-vote, and any survival-adjacent recommendation produced through Voice remains advisory unless separately ratified through the legitimacy safeguards defined elsewhere.

**Oracle buffers and dispute defaults**
- **Issuance buffer:** issue 90% of computed Essential Access baseline; retain 10% as a resilience buffer for shocks and model error.
- **Quorum publishing:** target minimum 5 independent publishers, weighted by evidence class and confidence quality; when a region cannot field 5 credible publishers, the protocol falls back to conservative defaults, federal measurement support, and timed independent audit.
- **Dispute window:** 14 days. Methodology-only disputes trigger audit and disclosure, not automatic Essential Access tightening. A challenger must produce prima facie alternative measurement evidence within 48 hours to justify temporary issuance reduction, and cumulative dispute-driven reductions may not exceed 10% of baseline in any rolling 30-day window.
- **Audit cadence:** quarterly independent audits of oracle methodology + monthly anomaly audits triggered by volatility flags.

---

## Annex Directory

The constitutional annex corpus is maintained as standalone files in [`docs/annexes/INDEX.md`](docs/annexes/INDEX.md).

- **Operative annexes:** threat operations, amendment mechanics, transition rules, issuance architecture, civic-layer specifics, and hardening clauses.
- **Supporting annexes:** detailed operational rules, threat operations, and explanatory specifications kept out of the constitutional body.
- **Interpretive rule:** where a standalone annex is designated controlling and conflicts with looser language in this file, the annex governs to the extent stated in that annex.
