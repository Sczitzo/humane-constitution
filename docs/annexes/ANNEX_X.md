# ANNEX X — Flow Issuance Architecture

> **At a glance**
> | | |
> |---|---|
> | **Purpose** | Defines how Flow comes into existence — against verified productive commitments only — specifying authorized channels (payroll, project escrow, essential services procurement, public infrastructure, continuity backstop), dual-key and third-signature controls, channel ceilings, anti-capture governance, and six red-team scenarios issuance must survive before scale-up. |
> | **Who it protects** | Everyone harmed by money creation that inflates asset prices, rewards political allies, rescues failed speculation, or manufactures demand without linked productive capacity — and wage earners and essential providers who need error-correction to be staged, not sudden. |
> | **Failure risk** | Fake payroll rings, circular invoice schemes, zombie rollovers, factional allocation, unwind shock, and offshore leakage — each a path by which the issuance system becomes a capture vehicle rather than a productive-economy instrument. |
> | **Evidence status** | Designed |
> | **Linked risks** | P-029; P-030; TR-09 smart-contract failure; Annex D (progressive net-worth demurrage — sole demurrage instrument); red-team scenarios in §X7. |

> **Provenance:** Implements [P-029 — Public Finance & Commons Revenue] (§X8) and [P-030 — Protocol-Only Money Creation and Household Finance Boundaries] (§X1–X8) · Status: **ACTIVE**

**Purpose.** The protocol cannot be capture-resistant if the point of money creation remains vague. This annex defines how Flow comes into existence, who may authorize it, how issuance is bounded, and how issuance abuse is red-team tested. Where Annex X conflicts with looser issuance language elsewhere, Annex X governs.

**Design principle: issue Flow against verified productive commitments, not against discretionary stock politics or financial privilege.**

### X1. What Flow issuance is for
Flow issuance exists to meet real productive demand: payroll settlement, milestone-bound project build-out, essential-services procurement, public infrastructure delivery, and tightly bounded continuity backstops during payment-system failure. Flow is not created to reward political allies, inflate asset prices, rescue failed speculation without conditions, or manufacture demand without linked capacity, delivery, or maintenance need. Any issuance channel must identify the concrete activity, continuity need, or productive commitment it is serving. Purpose ambiguity is itself a constitutional defect.

### X2. Flow-based issuance rule and provenance
New Flow may be issued only against verified productive commitments rather than as a prior discretionary stock. The protocol treats money as a flow linked to work, provisioning, maintenance, and build-out, not as a sovereign hoard.
- **Every issuance request** must publish or internally register, subject to privacy minimization: channel, sponsor, beneficial-control map, amount, duration, linked productive obligation, release schedule, prior unused protected balance, unwind path, reviewer signatures, and error-correction route.
- **All newly issued Flow** carries provenance tags at the audit layer. Flow remains user-fungible for ordinary market activity, but issuance source, channel, sponsor, and unwind status must remain visible to authorized oversight, post-mortem, and anti-capture review.
- **No obligation** may be financed through more than one issuance channel at the same time. Duplicate financing of the same payroll run, invoice chain, milestone package, or emergency continuity need is prohibited.
- **Unused, stale, or materially misdirected issuance** enters quarantine review. Flow created for a declared purpose may not drift indefinitely into idle accumulation without reclassification, reversion, or formal protected-capital qualification.

### X3. Authorized issuance channels

**Payroll channel:**
Flow may be created against verified net payroll obligations due within a short published window. Requests must reconcile headcount, compensation schedule, prior payroll float, and ordinary available Flow. Unused payroll issuance automatically reverts or is quarantined after the payroll window closes.

**Project escrow channel:**
Approved project escrows may activate Flow for facilities, tooling, R&D, housing construction, maintenance backlogs, and grid or water upgrades only through preregistered milestone tranches. Full upfront spendable issuance is prohibited absent explicit emergency authorization.

**Essential-services procurement channel:**
Essential-provider reimbursement, emergency logistics, and continuity-critical procurement may activate Flow only when tied to purchase orders, delivery obligations, or receipt-confirmed service windows. Advance issuance is capped and must convert to delivered-status accounting quickly.

**Public infrastructure windows:**
Federation or regional project accounts for published assets, schedules, lifecycle plans, and maintenance assumptions, with independent milestone review above the enhanced threshold.

**Continuity backstop channel:**
Tightly bounded emergency issuance may preserve payments continuity during severe technical or institutional disruption, but expires automatically after the short emergency window unless renewed once under enhanced review with published reasons and unwind accounting. Continuity backstops may not become a standing subsidy class.

### X4. Channel ceilings, dual-key review, and anti-capture governance
No single ministry, central bank analogue, private bank, donor-backed vehicle, or political office may unilaterally create Flow. Issuance authority must be polycentric, rule-bound, and reviewable.
- **Threshold definitions:** The *de minimis threshold* is 1× the published monthly Essential Access allocation for a single person at the Constitutional Survival Minimum. The *enhanced threshold* is the published household savings floor (18 months of regional median consumption expenditure). Both thresholds default to zero until the relevant founding commitments are published in `/founding/commitments.md`. Where the founding commitments have been published, the specific numeric values govern; where they have not, all issuance is treated as above the enhanced threshold pending publication.
- **Every issuance** above the de minimis threshold requires dual-key approval: the sponsoring authority and an institutionally distinct independent reviewer.
- **Issuance above the enhanced threshold** requires a third control signature from the published public-audit or counterparty-review layer.
- **Issuance reviewers** must be distinct from the requesting issuer, publish conflicts, rotate under anti-capture rules analogous to oracle and CRP protections, and remain ineligible to review obligations where they or their affiliates benefit materially.
- **Beneficial ownership** and control affiliations are aggregated for channel ceilings, concentration review, and repeat-issuer analysis. A sponsor may not evade ceilings by spraying issuance across nominally separate affiliates, shells, or contractor chains.
- **No single sponsor or controlled affiliate group** may receive more than the published share of rolling channel issuance without enhanced review, public explanation, and fairness testing against sector, region, and sponsor concentration indicators. Any issuance channel that repeatedly privileges a narrow sector, sponsor class, or political faction automatically enters constitutional review for capture risk.

### X5. Operating float, anti-evasion, and equivalence
The constitutional operating-float exemption supersedes prior generic publication language.
- **Households** receive a safe harbor equal to 18 months of median regional consumption expenditure.
- **Enterprises** receive the greater of 3 months average payroll or 3 months average direct operating costs measured on a rolling 12-month basis.
- **Any higher protected balance** requires project escrow, catastrophe reserve, lifecycle fund, or other protected-capital qualification under the published rules.
- **Any asset or instrument** that functions as a non-decaying store of value above the participation floor (the 18-month net-worth floor in Annex D) is subject to equivalence review under the progressive net-worth demurrage in Annex D regardless of label, wrapper, or legal form.
- **Household thresholds**, privacy safe harbors, and minimization rules remain mandatory. Anti-evasion enforcement may not become a pretext for total asset surveillance.

### X6. Error correction, unwind discipline, and public logs
- **All issuance channels** must publish aggregate issuance logs, category totals, concentration indicators, stale-balance rates, unwind performance, and exception use on the public dashboard with privacy-preserving aggregation.
- **Mis-issued Flow** may be quarantined, reclassified, or unwound only through published procedures that minimize collateral harm to payroll recipients, essential providers, and innocent counterparties. No ordinary clawback may target wage earners or essential-service recipients absent fraud findings tied to them directly.
- **Unwind must be staged** when needed to prevent payroll shock, provider insolvency, or sudden continuity collapse. Emergency correction that causes more harm than the original error is itself a design failure.
- **Repeated issuance error** in the same channel triggers automatic audit, temporary channel throttling, and mandatory public post-mortem before ordinary operation resumes.

### X7. Red-team scenarios and mandatory controls

**Red-team scenario 1 - Fake payroll ring:**
- Test whether shell employers, fabricated staff rosters, or recycled wage obligations can mint Flow.
- **Required controls:** headcount reconciliation, payroll-window limits, anomaly sampling, affiliate aggregation, and rapid quarantine of unused payroll issuance.

**Red-team scenario 2 - Circular invoice / project parking:**
- Test whether affiliates can rotate invoices, declare vague milestones, or warehouse Flow inside protected project structures.
- **Required controls:** preregistered milestones, independent rotating auditors, no dual-channel financing, and automatic reversion when milestones become circular, self-scored, or repeatedly deferred.

**Red-team scenario 3 - Zombie rollover:**
- Test whether failing enterprises can continuously renew payroll or continuity issuance without credible recovery.
- **Required controls:** rollover counters, turnaround review after repeated draws, shrinking ceilings for repeated emergency use, and forced conversion to formal restructuring after the published limit.

**Red-team scenario 4 - Factional allocation:**
- Test whether one region, sector, sponsor class, or politically connected network receives disproportionate issuance.
- **Required controls:** concentration dashboards, fairness thresholds, enhanced review above channel-share limits, and automatic constitutional review when favoritism patterns persist.

**Red-team scenario 5 - Unwind shock:**
- Test whether error correction or stale-balance cleanup causes payroll interruption, provider failure, or sudden contraction.
- **Required controls:** staged unwind, protected retirement classes, temporary continuity buffers, and public correction sequencing.

**Red-team scenario 6 - Offshore leakage and non-Flow parking:**
- Test whether newly issued Flow is rapidly converted into foreign stores, art, collectibles, or durable stockpiles to escape demurrage.
- **Required controls:** membrane flags, asset-equivalence review, protected-float limits, and enhanced audit when issuance exits productive use too quickly.
- *A system that cannot pass these issuance red-team tests is not scale-ready, regardless of how elegant its abstract monetary theory appears.*

---

## X8 — Public Finance & Commons Revenue Constitution (merged from former Annex G §G4)

> **Provenance:** Originally drafted as Annex G §G4 ("Public Finance & Commons Revenue Constitution"). Annex G was retired in the 2026-04-25 review and held in Annex H pending redistribution; moved here in the 2026-04-25 follow-up because public-finance rules and revenue-source discipline belong with Flow issuance architecture.

Public institutions must be funded in a way that is transparent, capacity-aware, and resistant to quiet debt resurrection. The public side may spend, but it may not hide future obligations off-ledger, manufacture permanent emergency dependence, or fall back to taxing survival, ordinary labor, or basic household exchange.

| Rule area | Default constitutional rule | Anti-capture control |
| :--- | :--- | :--- |
| **Revenue sources** | PFCR receipts may draw from demurrage routing, commons and land-use charges, asset carrying costs, gateway fees, and bounded public issuance tied to real public production. | Every source must publish methodology, exemptions, and aggregate receipts; hidden levies are void. |
| **Prohibited tax base** | Survival access, ordinary labor, and basic household exchange may not be taxed as routine revenue sources. | Any measure that functionally backfills PFCR through those bases triggers mandatory judicial review. |
| **Operating budgets** | Public institutions receive Flow appropriations tied to published service plans, staffing assumptions, capacity evidence, and a declared PFCR source mix. | Quarterly variance reporting, source-by-source disclosure, and public change logs. |
| **Recurring obligations** | Any recurring program expansion must identify a stable PFCR path and capacity plan before approval. | No unfunded permanent commitments and no quiet migration to prohibited taxes. |
| **Capital projects** | Long-lived infrastructure may use time-bounded public borrowing only when tied to resilience, productive capacity, commons maintenance, or the public banking / payment rail. | Amortization schedule, public cost register, PFCR repayment path, and constitutional debt cap. |
| **Payroll and compensation** | Public workers receive the universal Essential Access floor like everyone else and any additional compensation through the ordinary Flow wage system. | No privileged compensation channel or hidden civic bonuses. |
| **Basic banking rails** | Payments, basic custody, wage receipt, bill pay, fraud recovery, and cash access are funded as public infrastructure with a guaranteed postal-bank or public-bank option and interoperable licensed providers. | Universal service obligations, retail fee caps above the free baseline, portability rights, and published uptime / recovery metrics. |
| **Procurement** | Open standards, public bid logic, beneficial ownership disclosure, and conflict-of-interest rules apply by default. | Automatic audit triggers for concentration, overruns, and sole-source exceptions. |
| **Deficits and emergency spending** | Emergency overspending must be explicitly tagged, time-limited, and paired with a restoration plan that does not rely on prohibited taxes or hidden bank privileges. | No rolling emergency status; mandatory sunset, post-mortem, and PFCR correction plan. |

---

## X9 — Intellectual Property and Knowledge Commons (merged from former Annex AA §AA3)

> **Provenance:** Originally drafted as Annex AA §AA3 ("Intellectual Property and Knowledge Commons"). Annex AA was retired in the 2026-04-25 review and held in Annex N pending redistribution; moved here in the 2026-04-25 follow-up because knowledge-governance rules belong with Flow issuance and commons-revenue architecture.

Intellectual property is a modern rent-seeking vector and shall not remain outside the protocol's anti-extraction logic. Article V therefore includes knowledge-governance rules that distinguish genuine productive creativity from blocking portfolios and perpetual licensing extraction.

- **IP protection is time-limited** and use-rights based, not perpetual or dynastic.
- **Essential goods and services** dependent on protected IP must be subject to compulsory licensing at published rates when refusal would undermine the survival floor, public health, or constitutional survival minimum.
- **Blocking portfolios** without associated productive deployment are prohibited as rent-seeking instruments.
- **Protected works and patents** expire into a commons unless renewed through a narrowly defined public-interest process that cannot recreate perpetual extraction.

---

*Annex Y — Constitutional Survival Minimum and Essential Access Continuity Architecture is maintained as a separate controlling document. See [ANNEX_Y.md](./ANNEX_Y.md). Where any language in this file conflicts with Annex Y, Annex Y governs.*

*Annex D — Progressive Net-Worth Demurrage Architecture is the controlling specification for the progressive wealth carrying-cost instrument referenced throughout this annex. See [ANNEX_D.md](./ANNEX_D.md). The rate function, consolidation methodology, corporate balance demurrage, and exemptions in Annex D govern over any summary language here. (Annex AZ formerly contained this content; it has been superseded by Annex D. Annex AZ now governs the Tier 0 token mechanism only.)*
