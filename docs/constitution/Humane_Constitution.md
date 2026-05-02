# The Humane Constitution

**Constitution for a Humane Civilization**
*A Charter of Human Dignity, Stewardship, and Non-Coercive Order*

---

## Philosophical Preamble

Every society makes a choice about what money should be allowed to decide.

This constitution starts from a simple answer: money should not decide whether a person eats, gets medicine, has shelter, or counts in public life.

Most systems hide that choice inside banks, property rules, welfare rules, courts, and agencies. This document says the choice openly, because every rule below depends on it.

---

#### I. Two Kinds of Value

Human societies deal with two kinds of value.

The first kind is **produced value**. This is value created by work, skill, care, invention, repair, and other human effort. If a person builds something, grows something, fixes something, or serves someone, there is a real link between their action and the result.

The second kind is **shared value**. This is value no single person created alone: land made valuable by a community around it, clean water, the airwaves, public knowledge, inherited infrastructure, and the natural world that supports life.

This constitution treats those two kinds of value differently. People may be rewarded for what they actually create. But no one should be able to turn shared value into permanent power over everyone else.

---

#### II. A Structural Distinction, Not a Moral One

This is not about calling people good or bad.

It is about what a person actually created and what already belonged to the shared world. A law can assign ownership. It cannot change whether one person truly created the value being claimed.

---

#### III. How Money Collapses the Distinction

Modern money mixes these things together.

The same money buys wages, land, housing, food, medicine, political access, debt claims, and control over future work. When one tool controls all of that, wealth can become power over other people's survival.

This can happen even without a villain. It happens because the tool was given too many jobs.

---

#### IV. Why Policy Cannot Fix This

Small policy fixes can help, but they do not solve the core problem.

A tax can reduce harm. A better price index can make numbers more honest. Worker protections can improve conditions. But if food, housing, medicine, business, and public power all still run through the same money, the same pressure returns.

> **Structural failure requires structural correction. But structural correction is necessary, not sufficient. It cannot substitute for the moral transformation of persons, the faithfulness of communities, or dependence on God. Every structural safeguard will eventually be tested by human corruption; the question is whether communities remain willing to correct themselves.**

---

#### V. The Proposed Correction: Instrument Separation

The correction is separation.

Instead of asking one kind of money to do every job, this constitution gives different jobs to different tools.

**Essential Access** is the basic needs floor. It is not cash. It is not debt. It is not a voucher that landlords or employers can absorb. It is direct access to basics like food, water, shelter, essential care, medicines, and basic transit.

**Flow** is ordinary money for markets. **Voice** helps set public priorities in limited ways. **Service Record** tracks useful service for rotating public roles. **Shared Storehouse** is temporary rationing during a real shortage.

Each tool has one job. The walls between the tools are the system.

---

#### VI. What This Design Does Not Claim to Have Solved

This design does not pretend the hard parts are solved.

It still needs a legitimate founding group. It still needs a way to prove identity without building surveillance. It still needs reliable measurement of food, housing, care, water, energy, and medicine. It still needs outside review. Every safeguard can become a new place to capture.

Honest design names those problems before the system runs.

---

This project was built in public and stress-tested against bad uses. If it is wrong, people should be able to show where. If it is incomplete, people should be able to improve it. Its claim to seriousness is not perfection. Its claim is that its promises, weak points, and failure paths are visible.

The founders of this system are not exempt from the failures it names. The same corruption, capture, and pride that threaten administrators will threaten founders. The founding group must be the first to submit to correction, not the last. This document is open to revision precisely because its authors are not beyond the need for it.

*Philosophical grounding informed in part by Marc Wolf's Economic Trilogy (2026), which derives from first principles the distinction between produced and unproduced value and the structural failure of debt-based monetary systems. The protocol extends that derivation into institutional architecture, particularly the conclusion that monetary dispersal of Commons value remains capturable by the mechanisms Wolf documents in Part 2 — and that non-monetary instrument separation is the structural completion of the correction his framework points toward.*

---

**Document role:** this file is the main rule text. Supporting details live in the standalone [Annex Directory](../annexes/INDEX.md).

### Authoritative document set (current)
1. **Humane Constitution** — the main rule text.
2. **Threat Register** — known attack paths and defenses.
3. **Patch Log** — history of fixes and remaining risks.
4. **Public White Paper** — plain-language public explanation.
5. **Diagrammed Technical Reference** — visual map of the system.

> **Design status:** This document is a constitutional design under development. It is not a deployed system. Claims about what the system "does" describe intended design, not current operation. See [Claims_Evidence_Register.md](../governance/Claims_Evidence_Register.md) for honest status of each major claim.

**Working edition:** this is the current rule text for a system with ordinary money, a basic needs floor, and public power that cannot be bought.

### 0. Scope, Assumptions, and Design Invariants
**Scope:** This document describes a society-level rule design. It is meant to prevent survival coercion, wealth becoming public power, and capture by insiders while preserving enterprise and personal freedom.

**Assumptions:** this design only works if society can measure key essentials well enough, prevent mass identity fraud without surveillance, and define a basic needs floor that can actually be delivered.

**Non-negotiable invariants**
- **Survival is unconditional:** access to a baseline of essentials is guaranteed by existence, not employment or compliance.
- **Basic needs floor:** no ordinary process may reduce the survival floor below the explicit minimum in Annex Y; only the highest amendment path may change that floor.
- **Human worth is not measured:** no score can gate personhood, dignity, or access to essentials.
- **Separated tools:** survival, markets, and public power use different tools that cannot be freely converted into each other.
- **Money creation is a public function:** only protocol-authorized issuance bodies may create Flow or Flow-equivalent purchasing power.
- **No taxes on ordinary life:** survival access, ordinary labor, and basic household exchange may not be taxed as routine revenue sources.
- **Families may pass continuity, not domination:** homes, tools, and modest succession may be protected, but perpetual dynastic wealth structures and inherited ruling claims are prohibited.
- **Ownership is stewardship, not tribute:** land, housing, and enterprise rights may reward use, risk, and contribution, but may not justify perpetual passive extraction from others' necessity or labor.
- **Influence cannot be purchased:** governance influence is earned through verified stewardship and decays over time.
- **Legitimacy cannot be automated:** the system may automate delivery and routine operations, but it may not let software replace human consent for decisions that change the constitutional order.
- **Reality anchoring:** promises must stay tied to what society can physically provide, with safety margins.
- **Due process and auditability:** enforcement is constrained by transparent rules, appeal paths, and independent oversight.

**Hard locks for core rules (Proposal 1 close-out, 2026-04-18).**
The rules above are not protected only by words. They are also protected by files in the `architecture/` directory:
- [Parameter Registry](../../architecture/parameter_registry.md) — Tier 1 parameter registry with cryptographic hash commitment.
- [Amendment Protocol](../../architecture/amendment_protocol.md) — 7-of-9 holder signatures (FC-110) and 180-day timelock (FC-111) required for any Tier 1 change.
- [Drift Chain](../../architecture/drift_chain.md) — append-only published version history; silent modification is detectable at first operational-node startup.
- [Implementation Binding](../../architecture/implementation_binding.md) — every bound component verifies the drift-chain head on startup and refuses to operate on unverified state (with the CSM-dispensation exception per Annex Y unconditionality).

Changes to the highest-level rules require the full change process. The lock itself is also protected. This cannot stop a lawful large-majority change, but it makes quiet changes visible and creates a 180-day response window.

**Default to caution.**
If people are not actively taking part, the system does not treat silence as consent. New proposals, changes, parameter adjustments, and expansions freeze at the last approved state. The basic needs floor continues. Silence can never be used as permission to reduce it.

**Founding Order — Local Choice, Consent & Exit (Proposal 5 close-out, 2026-04-18).**
Before the seven articles, the system needs a rule for who joins, at what scale, and how they leave. That rule is the **Founding Order**:
- [Founding Order Overview](../../founding/order/README.md) — overview and integration with the current Founding Order + Articles I-VII architecture.
- [Local Decision Rule](../../founding/order/subsidiarity_rule.md) — decisions stay at the smallest scale that can handle them.
- [Consent Protocol](../../founding/order/consent_protocol.md) — joining must be an open, published act, not an assumption.
- [Exit Protocol](../../founding/order/exit_protocol.md) — a locality or larger unit may leave by a two-thirds vote with a 730-day transition; no exit tax and no forfeiture.
- [Re-entry Protocol](../../founding/order/reentry_protocol.md) — returning is allowed without penalty.
- [Jurisdictional Scales](../../founding/order/jurisdictional_scales.md) — five scales: household, neighborhood, locality, region, federation.

The Founding Order applies to every article. Decisions stay local unless there is a real reason to move them up. The human dignity floor is the exception: it applies everywhere because dignity is not up for a vote.

---

## How to read this document
- **Main body:** the main rule design and article summaries.
- **Annex corpus:** supporting details in the [Annex Directory](../annexes/INDEX.md).

---

### 0A. Moral Scope, Spiritual Limits, and Stewardship Orientation
This system governs public and economic order. It does not claim to perfect human nature, end moral corruption, or transform the human heart.

Its public purpose is to protect human dignity, restrain domination and extraction, preserve stewardship and truthful accountability, and protect freedom of conscience and worship.

It assumes moral realism: people can create, care, serve, love, deceive, dominate, and corrupt. For that reason, power must be bounded, exploitation restrained, and dignity protected.

This system is a framework for public stewardship. It is not a claim to save, sanctify, or morally complete any person. Just institutions can reduce structural harm and protect the conditions for family life, worship, service, and responsibility. They cannot create innocence or holiness by administration.

No part of this system replaces truth, virtue, worship, repentance, or reverence before God. It regulates public order. It does not replace conscience, conviction, repentance, or God.

This system does not claim to reflect the mind of God. It reflects the best available human judgment about public order, which is fallible, partial, and in need of ongoing correction. Its claim to seriousness is not that it is right, but that it names its assumptions, makes its failure paths visible, and remains open to being shown where it is wrong.

**God-honoring civic commitments (non-coercive)**
1. **Do not worship wealth or power** - No tool, institution, or office may treat accumulation, market leverage, or administrative dominance as proof of moral worth or civic superiority.
2. **Protect time and rest** - Public and economic institutions should preserve rest, family life, worship, recovery, and reflection. Endless extraction of labor is not a civic good.
3. **Freedom of conscience before God** - Persons, families, congregations, and voluntary communities retain protected space to seek, worship, obey, and serve God according to conscience, provided they do not violate the baseline dignity and protections owed to others.

This system must not authorize religious scoring, forced worship, forced statements of belief, or state management of salvation. It protects conscience and worship while rejecting both domination and coerced religion.

---

## I. Philosophy: Reality Before Finance
The system fails when financial claims grow beyond what the real world can support. This constitution treats money and power as limited by real capacity, time, and public accountability.

**Core framing**
- **Money should move:** Flow is designed to circulate, not pile up forever.
- **Basic needs cannot be hoarded:** no one may store up future survival access at the expense of others.
- **Public influence should fade:** civic influence exists while a person is actively helping, then declines.

---

## II. Monetary Architecture (distributed across Articles IV, V, and VI)
To prevent money from doing every job, the system uses five separated tools. Only one is money. One protects basic needs. Two are civic tools. One is for real emergencies.

*Where they live: **Essential Access** is in **Article IV (Survival)**. **Flow** and **Shared Storehouse** are in **Article V (Markets, Commons & Public Finance)**. **Voice** and **Service Record** are in **Article VI (Voice, Service Record & Public Decisions)**.*

### 1) Flow - Ordinary Money
- **Purpose:** production, trade, innovation, non-essential consumption, payroll, procurement, and settlement.
- **Nature:** Flow is the only general-purpose money in the system.
- **Form rule:** Flow operates primarily as a public digital currency secured by cryptographic methods, while physical cash or equivalent offline bearer instruments remain permanently available for privacy, resilience, and universal access.
- **Issuance rule:** Flow is issued only against verified productive commitments through the Annex X channels - payroll, milestone-bound project escrow, essential-services procurement, public infrastructure windows, and tightly bounded continuity backstops. All issuance is provenance-tagged at audit level, approved under dual-key review (and enhanced review above threshold), and released with a published unwind path. Private banks, funds, and lenders may lend or intermediate existing Flow, but may not create new Flow, Flow-denominated deposit substitutes, or other currency-like purchasing power by debt expansion.
- **Circulation rule:** Flow may transfer freely within lawful market activity, but remains subject to anti-hoarding, anti-monopoly, and anti-rent-seeking constraints.
- **Idle-money rule:** Flow has a fee on large idle balances to discourage hoarding. It is not meant to punish ordinary saving or real project planning.
- **Banking rule:** basic payments, custody, wage receipt, transfers, and cash access operate on public infrastructure funded through Article V public finance and commons revenue (PFCR); any licensed retail provider serving the public must offer the baseline public banking floor on the common rail.
- **Investment channel:** protected capital treatment is not a blanket exemption. Time-bound project escrows, build accounts, term-finance pools, catastrophe reserves, and public infrastructure windows may hold Flow without ordinary idle decay only while funds remain preregistered, ring-fenced, milestone-reviewed by independent auditors, and subject to reversion if purpose drifts or deadlines become circular.

### 2) Essential Access - The Basic Needs Floor
- **Purpose:** baseline essentials such as food, water, basic shelter/heat, basic transit, essential healthcare/medicines, crisis mental-health care, and explicit mental-health continuity.
- **Nature:** Essential Access is not money. It is a non-transferable right to receive items in the basic needs basket.
- **Constitutional floor:** Essential Access may never be narrowed below the Constitutional Survival Minimum defined in Annex Y, even when the broader essential basket is under review or temporary substitution is required.
- **Cycle rule:** Essential Access is issued as a daily micro-allocation derived from the weekly baseline, with each daily tranche valid for 72 hours; this smooths demand, limits hoarding, and avoids single-day expiry cliffs.
- **Protection rule:** Essential Access cannot be sold, pledged, collateralized, or informally monetized; narrow caregiver/dependent exceptions must remain capped, auditable, and reversible when coercion appears.

### 3) Voice + Service Record - Public Priorities And Service
- **Purpose:** Voice helps set near-term public priorities. Service Record helps decide readiness for rotating public service roles.
- **Nature:** neither Voice nor Service Record is money. They cannot be transferred or sold. Voice fades quickly and is capped. Service Record moves more slowly and is tied to service.
- **Anti-capture rule:** Voice must not purchase goods, private privilege, legal immunity, or survival access, and Service Record must not be traded, inherited, collateralized, or pooled as a patronage asset. Any evidence of such use must trigger audit and published correction within 60 days. Survival-adjacent decisions remain protected by one-person-one-vote legitimacy checks, and no single contribution sector may dominate effective civic weighting.

### 4) Shared Storehouse - Emergency Rationing
- **Purpose and limit:** Shared Storehouse is temporary rationing for a specific category during a verified shortage. It is not money. It is not permanent. It must end when the shortage mode ends.
- **Hard expiration rule:** every Shared Storehouse activation carries a published expiration timestamp set at activation. Continuation beyond that timestamp requires an affirmative multi-key renewal — a new scarcity finding published by the oracle quorum plus a deliberative ratification under Article VI. Without active renewal, the system automatically reverts to its baseline constitutional state at the expiration timestamp regardless of whether the underlying conditions have improved. Silence, apathy, or administrative delay is not renewal. Automatic reversion is not a failure mode; it is the designed default. No emergency power may accumulate across renewal cycles into a permanent expansion of executive scope.
- **Separation rule:** Flow is the only true currency. Essential Access, Voice, Service Record, and Shared Storehouse are not money and may not be converted, pooled, sold, wrapped, or re-created through indirect markets, queue trading, or proxy contracts.

---

## III. Founding Order and Articles of Constitutional Order

The **Founding Order** answers three plain questions: who joins, who decides, and how a place can leave.

Each **Article** then has one main job. The point is to stop one office, one number, or one money tool from taking over the rest.

The default is local decision-making. A larger body may act only when the smaller place cannot handle the issue on its own.

### Constitutional architecture at a glance

**Founding Order — Local Choice, Consent & Exit**
Says decisions stay as local as possible, places must openly choose to join, and places have a known way to leave.

**Article I — Rights & Rules**
Protects the rules that cannot be quietly changed: dignity, fair process, no coercion, and the wall between basic needs, markets, and public power.

**Article II — Personhood, Identity & Continuity**
Recognizes one person as one person, protects recovery when records fail, and avoids turning identity into surveillance.

**Article III — Real Capacity & Reserves**
Measures what society can actually provide: food, water, energy, shelter, medicines, care, and reserves for shocks.

**Article IV — Survival**
Turns Essential Access into real access to basic needs.

**Article V — Markets, Commons & Public Finance**
Sets rules for Flow, business, housing, land, public banking, and public funding.

**Article VI — Voice, Service Record & Public Decisions**
Sets rules for public priority-setting and rotating service roles without creating social credit.

**Article VII — Public Records & Warning Systems**
Publishes what is happening, checks the system from outside its operating offices, and watches for future risks.

### Founding Order and article boundaries
Each part has a job. These are the handoffs and hard limits.

**Founding Order — Local Choice, Consent & Exit**
- Sends to all articles: the default scale of action and the rule for joining or leaving.
- Cannot override the basic human dignity floor, which applies regardless of local consent.

**Article I — Rights & Rules**
- Sends to all articles: the rights and limits that bind every other part.
- Cannot be overridden by Voice, Service Record, Flow, or convenience.

**Article II — Personhood, Identity & Continuity**
- Sends to the system: proof that a person is a person and continuity when records fail.
- Cannot become surveillance scoring.

**Article III — Real Capacity & Reserves**
- Sends to Articles IV and V: capacity numbers and reserve buffers.
- Cannot promise beyond conservative safety margins or take over rights or audit jobs.

**Article IV — Survival**
- Sends to people: Essential Access and basic service delivery.
- Cannot make survival depend on behavior or let Essential Access become money.

**Article V — Markets, Commons & Public Finance**
- Handles Flow, housing, land, business, public banking, and public funding.
- Cannot let tools convert into each other, create monopoly power, or tax survival and ordinary labor.

**Article VI — Voice, Service Record & Public Decisions**
- Handles Voice, Service Record, public priorities, and authorized public decisions.
- Cannot change basic rights, rank human worth, or become economic power.

**Article VII — Public Records & Warning Systems**
- Publishes public accountability signals and watches outside risks.
- Cannot expose private identities or be housed inside the same office it audits.

---

### Founding Order and article detail

#### Founding Order: Local Choice, Consent & Exit
- **Local decision rule:** decisions stay at the smallest scale that can handle them — household, neighborhood (≤500 persons), locality (≤5,000), region (≤500,000), federation. Federation-scale action needs a clear reason (`founding/order/subsidiarity_rule.md`).
- **Scale list (FC-122):** the five scales are locked. If there is a dispute about which scale should decide, the default is not to move power upward.
- **Consent rule:** joining requires an open two-thirds vote, 90-day notice, 60-day public discussion, roll-call, and two-thirds minimum participation. Places that do not consent are outside the system except for the basic human dignity floor.
- **Exit rule (FC-120, FC-121):** a locality or larger unit may leave by a two-thirds resident vote with a 730-day transition. Essential Access continues during transition. No exit tax. No forfeiture.
- **Re-entry rule:** a place may return without penalty; a 365-day waiting floor between exit events prevents cycling in and out.
- **Individual consent withdrawal:** a person may withdraw individual consent at any time; Tier 1 CSM floor continues unconditionally.
- **Relationship to the articles:** Article I rights remain protected at every scale. Articles III, IV, V, and VII stay as local as possible unless federation-level action is justified.

> The Acceptance Protocol governs the current founding stage. Its authority is time-limited: once the founding stage closes and elected governance bodies are operational, ordinary constitutional amendment (Tier 2 and Tier 3) replaces the Acceptance Protocol as the primary change mechanism. The Protocol cannot entrench itself beyond its founding mandate.

#### Article I: Rights & Rules
- **Survival is unconditional:** baseline essentials are guaranteed and cannot be withdrawn as punishment.
- **Basic needs floor:** no ordinary process may reduce the survival floor below Annex Y minima; only the highest amendment path may change it.
- **Human worth is not measured:** no score or metric can gate dignity, personhood, or survival access.
- **Fair process:** enforcement requires clear rules, appeal paths, and independent review.
- **No taxes on ordinary life:** survival access, ordinary labor, and basic household exchange may not be taxed as routine revenue sources.
- **Separated tools:** survival (Essential Access), enterprise (Flow), and civic tools (Voice and Service Record) stay separate and cannot be freely converted.
- **Money creation is public:** only protocol-authorized issuance bodies may create Flow or Flow-equivalent purchasing power.
- **Families may pass continuity, not domination:** modest succession may be protected, but perpetual dynastic wealth structures, trusts, and inherited ruling claims are prohibited.
- **Ownership is stewardship, not tribute:** rights in land, housing, and enterprise may reward use, risk, and contribution, but may not justify perpetual passive extraction from others' necessity or labor.
- **No coercion:** Voice, Service Record, and Flow must not buy or condition basic rights. Any evidence of such use must trigger immediate independent review and published findings within 30 days.
- **Bounded execution:** approved decisions must run through published workflows, documented reasons, and reviewable boundaries. Oversight must protect dependents and innocent parties while enforcing fraud, coercion, and bribery rules.
- **Anti-capture review:** independent audits, rotation, conflict rules, and funded red-team testing are mandatory. The office that reports on the system may not be the same office that runs the system.
- **Hard locks:** Tier 1 rules are mechanically protected through the `architecture/` directory: 7-of-9 amendment, 180-day delay, drift chain, and implementation binding.
- **Keyholder duty of servanthood:** The keyholders of the amendment process hold custodial, not proprietary, authority. They may not use the amendment lock to entrench any founding group, extend any founding mandate, or delay review of the founding decisions themselves. The amendment protocol must include a mechanism by which a qualified independent review body may petition for the replacement of any keyholder found to be acting in demonstrable self-interest. Keyholder authority derives from service to the constitutional community, not from the fact of appointment.

#### Article II: Personhood, Identity & Continuity
- **One person, one core wallet:** prevents duplicate Essential Access claims and fake extra identities.
- **Privacy-preserving checks:** collect the least data needed and disclose only what is necessary.
- **Continuity rules:** protect guardianship, incapacity, birth and death handling, and dependent coverage.
- **Household verification:** when a household claim changes resource allocation, the system checks real co-habitation and dependency. It does not judge lifestyle, relationship type, or household structure.
- **Appeals and recovery:** people must have usable recovery paths, including refugees and people without strong documents.
- **Layered identity:** identity checks are stronger only when consequences are higher. No single document, biometric, institution, or device may become the only irreversible source of identity.
- **Identity serves the person:** Identity verification exists to serve the person, not to build a record of the person. The system must review — no less than every three years — whether identity data is being used for any purpose beyond enabling access to essentials and preventing fraud. Any use of identity data for behavioral prediction, civic scoring, cross-system profiling, or research requires a separate deliberative authorization under Article VI and must carry a published sunset date. Sunset dates may be renewed but never made permanent by administrative action alone.

#### Article III: Real Capacity & Reserves
- **Many measurement sources:** several independent sources measure capacity and scarcity. The system needs at least 5 nodes, at least 3 ways of measuring, error checks, and at least one adversarial reviewer per group.
- **Safety margins:** the system keeps buffers. A disagreement about method does not automatically reduce Essential Access unless challengers produce real alternative evidence.
- **Public methods:** publish methods, definitions, and change logs while protecting individual privacy.
- **Reserves:** food, water, energy, and critical medicines need strategic buffers and replenishment rules.
- **Crisis fallback:** if measurement fails, the system uses published fallback rules, conservative defaults, reserve triggers, and automatic review.
- **Community voice in measurement:** Measurement systems must include the voices of those being measured. Communities experiencing scarcity have a direct challenge path to contest official capacity figures — a written submission to the oracle quorum that must receive a published response within 14 days. Expert measurement without community verification has a long history of systematic error. Community challenge submissions are published alongside the official figures they contest.

#### Article IV: Survival
- **Essential Access as right and delivery path:** Essential Access is both the right to basics and the service path that delivers them.
- **Essential Access purpose:** baseline essentials — food, water, weather-safe shelter, basic transit, essential healthcare/medicines, crisis mental-health care, and the Constitutional Survival Minimum floor defined in Annex Y.
- **Nature:** Essential Access is not money. It is a non-transferable right to receive items in the basic needs basket.
- **Minimum floor:** Essential Access may never be narrowed below the minimum in Annex Y, even during shortage or temporary substitution.
- **Daily issuance:** Essential Access is issued daily using Article III capacity signals and safety buffers.
- **Expiration:** each daily amount expires after a 72-hour rolling window. Unused access returns to the capacity pool, with continuity paths for illness, travel disruption, caregiving emergencies, and provider outages.
- **Non-transferable by default:** this blocks coercion and black-market control. Caregiver and dependent exceptions must be capped, auditable, and reversible.
- **No conversion:** Essential Access cannot be sold, pledged, used as collateral, or turned into money.
- **Shortage interface:** during declared shortage, Shared Storehouse may supplement Essential Access and must end when shortage mode ends.
- **Pre-existing care networks:** Article IV establishes a floor, not a monopoly on care. The system must actively support — and must not displace — pre-existing community networks that provide survival essentials: mutual aid groups, religious food pantries, family support structures, neighborhood care networks, and congregational outreach. Where such networks exist, the system collaborates with and strengthens them rather than routing around them. The presence of a constitutional delivery floor does not reduce the civic, moral, or spiritual value of personal generosity and communal care — it protects the conditions under which that generosity can freely operate.

> The quantities and standards defining each essential category are subject to the capacity measurement protocols in [Annex AL](../annexes/ANNEX_AL.md). What can actually be promised during supply shocks depends on measurement confidence and oracle failure procedures. See T-006 and the Capacity Measurement Evidence Test Package.

#### Article V: Markets, Commons & Public Finance
**Core boundary rule**
- **Tools do not convert by default.** Any exception needs a formal change, narrow scope, and explicit anti-capture limits.

**Flow**
- **Purpose:** production, trade, innovation, non-essential consumption, payroll, procurement, and settlement.
- **Nature:** Flow is the only general-purpose money in the system.
- **Form rule:** Flow is mainly public digital money, with physical cash or offline equivalents kept available for privacy, resilience, and universal access.
- **Issuance rule:** new Flow can be created only through approved channels such as payroll, project escrows, essential-service procurement, public infrastructure, and tightly bounded continuity backstops. Private banks and lenders may lend existing Flow, but they may not create new Flow through debt.
- **Circulation rule:** Flow can move freely in lawful market activity, subject to anti-hoarding, anti-monopoly, and anti-rent-seeking rules.
- **Idle-money rule:** the default idle-money fee is 0.5% per month on balances above a published operating-float exemption, reviewed inside a 0.25%-1.00% corridor.
- **Investment channel:** long-term project funds may receive protected treatment only while they are registered, separated, milestone-reviewed, and subject to reversion if the purpose drifts.
- **Household finance rule:** compounding interest on household ordinary-life debt is prohibited. No household debt instrument may securitize the survival floor, rely on revolving traps, or recreate survival coercion through hidden fee chains.
- **Wallet partitioning:** protect payroll/essential obligations from broad freezes; target enforcement narrowly.

**Land, Housing & Commons**
- **Use-rights:** housing and land are governed as use-rights or leases, not speculative ownership. No individual or private entity may extract Flow returns from residential use-rights.
- **Housing as public infrastructure:** residential construction is funded through public channels and project escrows. Workers are paid in Flow, but homes are held as commons and allocated by need and occupancy, not price.
- **Per-person allocation floor with hard household cap:** residential space is allocated at a published per-person floor. Total allocation scales with verified household size up to a published household maximum; the commons is not obligated to expand allocation beyond the cap as a matter of fiscal guarantee; however, the cap is a resource constraint, not a judgment about family structure, size, or composition. Pastoral need — including large families, disability, caregiving, and multigenerational arrangements — must be met through the review process with a strong presumption of accommodation. Review panels must apply mercy before procedure. Additional space above the per-person floor may be requested for documented accessibility needs, caregiving requirements, or disability accommodations and is subject to independent needs review.
- **Household verification before more space:** household changes that trigger more space require verified co-habitation and real dependency under Article II. Births and documented medical emergencies are exempt from delay.
- **Quality is a civic investment, not an individual Flow purchase:** housing quality improvements are funded at the neighborhood or district level through civic deliberation (Article VI) and public Flow channels. Individual Flow wealth does not entitle any resident to a superior private unit. No Flow-priced private residential tier exists.
- **Transparent allocation:** renewal depends on occupancy and a closed-list stewardship standard: vacancy, damage beyond normal wear, verified illegal use, or clear health/safety violations after a chance to fix them.
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

No mechanism in this Article should be designed with confidence that it eliminates human corruption. Structural separation, anti-conversion rules, demurrage, and use-rights tenure are necessary disciplines — they reduce the surface area of exploitation. But they do not substitute for the moral formation of persons, the faithfulness of communities, or the grace of God. Every provision in this Article assumes that people will attempt to subvert it. The question is not whether exploitation will occur but whether the community retains honest, accessible paths to name and correct it when it does.

#### Article VI: Voice, Service Record & Public Decisions
**Voice and Service Record tools**
- **Service Record:** earned through verified stewardship and service readiness. It helps decide who is ready for juries, panels, rotating review bodies, and oversight roles.
- **Voice:** based on recent verified contribution plus hardship-safe floor rules. It helps set near-term priorities and budget sequencing. It fades quickly and is capped.
- **No conversion:** Voice cannot buy goods, private privilege, legal immunity, or survival access. Service Record cannot be traded, inherited, used as collateral, or pooled as a patronage asset.
- **Civic floor:** constitutional matters and survival-adjacent outcomes stay one-person-one-vote. No single contribution sector may dominate civic weighting.

**Contribution and capability**
- **Contribution records service, not moral rank:** contribution can create Service Record. It cannot affect Essential Access.
- **Recognized stewardship:** care, maintenance, safety, education, ecological work, civic operations, and similar work can count when verified.
- **Verification scales with impact:** small claims may use light proof. Higher-impact claims require stronger evidence, rotating review, and audit escalation.
- **Life circumstances matter:** disability, caregiving, age, crisis, illness, and disaster can change expectations. Protected Pause preserves continuity during verified hardship.
- **High-impact claims need strong review:** rare Service Record or Voice boosts require independent panels, published criteria, and category-balance safeguards.

**Public decision process**
- **Proposal path:** draft → review → cost and capacity check → public decision process → legitimacy check where required → staged execution.
- **Anti-capture weighting:** Voice is capped, fades quickly, balanced by category, and subject to conflict-of-interest rules. Service Record governs service eligibility, not agenda dominance.
- **Quarterly cycle:** priorities are set quarterly through Voice. No rollover. No single contribution category may exceed the published balance cap.
- **Minimum civic floor:** constitutional matters and survival-adjacent outcomes remain one-person-one-vote.

**Why these functions share one article.** Voice, Service Record, the work that creates them, and the public decisions that use them are one loop. Keeping them together reduces capture points.

**The measure of civic health.**
This article succeeds only if people can move from receiving care to also giving care, service, repair, teaching, stewardship, or other useful contribution. A secure basic needs floor is not enough if public life becomes closed to ordinary people. Article VII may measure this movement as a sign of whether the civic layer is alive or merely operating on paper.

#### Article VII: Public Records & Warning Systems
**Public records**
- **Public dashboards** for system health: capacity, issuance, reserves, service performance, and budget flows.
- **Privacy preserved:** aggregation thresholds, small-cell suppression, rounding/noise where needed, and time delays for sensitive signals.
- **Clear methods:** publish definitions, sources, refresh rates, and a public change log for metrics.
- **Abuse resistance:** delay or limit signals that could be gamed. Disputes trigger conservative issuance and review.
- **Independence:** the same body may never both run a function and report on its own performance.

**Warning systems**
- **Mandate:** watch outside conditions that could break the system's assumptions: technology, climate, geopolitical shifts, pandemics, demographics, and ecological risks.
- **Reports:** publish quarterly warning reports with a 10-year horizon, especially for risks to capacity measurement or the basic needs floor.
- **Escalation:** findings that may require top-level rule changes go to the Federated Ombuds and the highest amendment path if needed.
- **Why this exists:** slow failures should be seen before they become crises.

---

## IV. Loopholes and Patches
This section names common ways the system could fail and the fixes designed to reduce those risks. The full details are in the Threat Register and annexes.

### 13. Essential Access coercion or black-market exchange
- **Failure mode:** people buy/sell Essential Access or force dependents to hand over Essential Access, reintroducing survival coercion.
- **Patches:** Essential Access non-transferable by default; tightly scoped caregiver transfers with caps; coercion-specific penalties; safe-report channels; anomaly detection on essential purchase patterns.
- **Residual risk:** barter cannot be eliminated; minimize incentives by guaranteeing baseline supply and keeping Essential Access usable only for the essential basket.

### 14. Hoarding essentials as goods
- **Failure mode:** even if Essential Access expires, goods can be stockpiled to gain leverage in scarcity.
- **Patches:** per-category purchase caps during declared scarcity; storage/carrying charges above baseline; shelf-life-aware rationing; resilient local redundancy and strategic reserves.

### 15. Avoiding idle-money fees through asset hoarding
- **Failure mode:** value shifts into assets such as land or commodities, recreating rent-seeking.
- **Patches:** capacity-lease model for land/housing; progressive carrying costs on large idle holdings; anti-speculation rules; transparent registry for high-value assets; strong competition policy.

### 16. Issuance capture / circular finance
- **Failure mode:** insiders create Flow through fake payroll, circular invoices, indefinite backstops, or political favoritism.
- **Patches:** Annex X dual-key approval; provenance tags at audit level; channel ceilings with affiliate aggregation; preregistered milestone schedules; no dual-channel financing of the same obligation; automatic throttling, audit, and unwind when stale issuance, repeat rollovers, or sector favoritism appear.

### 17. Civic layer capture by 'professional contributors'
- **Failure mode:** a small class farms Voice and Service Record advantages and dominates priorities, staffing, or oversight even with decay controls.
- **Patches:** diminishing-returns voting weights; per-person caps; randomization in agenda-setting; mandatory rotation and conflict rules for review bodies; preserve one-person-one-vote for constitutional decisions.

### 18. Contribution fraud / guild collusion
- **Failure mode:** fake hours or collusive approvals mint Voice or Service Record illegitimately.
- **Patches:** multiple proof paths, random audits, verifier reputation tracking, penalties for false proof, secure logs, whistleblower protections, and automated anomaly flags.

### 19. Oracle manipulation / bad data
- **Failure mode:** capacity is overstated or corrupted, causing over-issuance or shortages.
- **Patches:** polycentric oracle quorum; conservative buffers; independent audits; open methods; rollback and emergency throttles; 'dispute reduces issuance' rule.

### 20. Automation bugs / malicious proposals
- **Failure mode:** automatic execution amplifies errors or enables exploit proposals.
- **Patches:** staged execution with mandatory review windows; formal verification for critical contracts; emergency pause with narrow triggers; post-mortems and patch governance.

### 21. Justice penalties harm innocents
- **Failure mode:** freezing wallets can harm employees/dependents or crash a firm.
- **Patches:** account partitioning, payroll protection, dependent protection, targeted freezes, fair process, and time-limited freezes while review is pending.

### 22. Identity fraud / Sybil attacks
- **Failure mode:** multiple identities claim Essential Access or unlawfully enter Voice or Service Record pathways at scale.
- **Patches:** proof-of-personhood; periodic re-verification; fraud detection; penalties; accessible pathways for vulnerable populations; strong recovery without creating a surveillance state.

---

## V. Transition Outline

### Phase 1: Genesis and Debt Reset
- **Debt reset:** eliminate or restructure unsustainable personal debts while protecting essential savings and pensions through clear conversion rules.
- **Banking transition:** legacy banks become regulated service providers on public payment rails, with a guaranteed public banking option.
- **Continuity guarantees:** ensure uninterrupted access to essentials (Essential Access) during cutover.

### Phase 2: Outside Money And Trade
- **Foreign inflow controls:** outside capital converts into Flow and faces the idle-money fee immediately, pushing it toward productive use. Detail is in [Annex AT §AT4](../annexes/ANNEX_AT.md).
- **Trade boundary:** exports of essentials are capped when needed to protect domestic Essential Access. Detail is in [Annex AT](../annexes/ANNEX_AT.md).
- **Security posture:** defend infrastructure and records as critical public assets.

### Phase 3: Network Expansion
- **Open standards:** publish specs so places and vendors can interoperate and lock-in is reduced.
- **Federation:** let other places adopt and link systems while preserving local consent and capacity limits.

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

> The effective-weight table uses quarterly decay buckets. The underlying balance decays continuously at an exponential rate as specified in [SPECIFICATIONS.md](SPECIFICATIONS.md) (Voice State Machine § 4.2). The table maps continuous balance to discrete decision weights; it does not replace the continuous decay formula.

Constitutional rules, rights, and survival access remain one-person-one-vote, and any survival-adjacent recommendation produced through Voice remains advisory unless separately ratified through the legitimacy safeguards defined elsewhere.

**Oracle buffers and dispute defaults**
- **Issuance buffer:** issue 90% of computed Essential Access baseline; retain 10% as a resilience buffer for shocks and model error.
- **Quorum publishing:** target minimum 5 independent publishers, weighted by evidence class and confidence quality; when a region cannot field 5 credible publishers, the protocol falls back to conservative defaults, federal measurement support, and timed independent audit.
- **Dispute window:** 14 days. Methodology-only disputes trigger audit and disclosure, not automatic Essential Access tightening. A challenger must produce prima facie alternative measurement evidence within 48 hours to justify temporary issuance reduction, and cumulative dispute-driven reductions may not exceed 10% of baseline in any rolling 30-day window.
- **Audit cadence:** quarterly independent audits of oracle methodology + monthly anomaly audits triggered by volatility flags.

---

## Annex Directory

The constitutional annex corpus is maintained as standalone files in the [Annex Directory](../annexes/INDEX.md).

- **Operative annexes:** threat operations, amendment mechanics, transition rules, issuance architecture, civic-layer specifics, and hardening clauses.
- **Supporting annexes:** detailed operational rules, threat operations, and explanatory specifications kept out of the constitutional body.
- **[Annex AT](../annexes/ANNEX_AT.md)** — external trade architecture: strategic floors, import dependency thresholds, essential-capacity export caps, foreign capital inflow controls, and the reciprocity membrane. Governs Phase 2 boundary interface from protocol activation.
- **Interpretive rule:** where a standalone annex is designated controlling and conflicts with looser language in this file, the annex governs to the extent stated in that annex.
