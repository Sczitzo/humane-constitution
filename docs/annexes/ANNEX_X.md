# ANNEX X. Flow Issuance Architecture
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
- **Every issuance** above the de minimis threshold requires dual-key approval: the sponsoring authority and an institutionally distinct independent reviewer.
- **Issuance above the enhanced threshold** requires a third control signature from the published public-audit or counterparty-review layer.
- **Issuance reviewers** must be distinct from the requesting issuer, publish conflicts, rotate under anti-capture rules analogous to oracle and CRP protections, and remain ineligible to review obligations where they or their affiliates benefit materially.
- **Beneficial ownership** and control affiliations are aggregated for channel ceilings, concentration review, and repeat-issuer analysis. A sponsor may not evade ceilings by spraying issuance across nominally separate affiliates, shells, or contractor chains.
- **No single sponsor or controlled affiliate group** may receive more than the published share of rolling channel issuance without enhanced review, public explanation, and fairness testing against sector, region, and sponsor concentration indicators. Any issuance channel that repeatedly privileges a narrow sector, sponsor class, or political faction automatically enters constitutional review for capture risk.

### X5. Operating float, anti-evasion, and equivalence
The constitutional operating-float exemption supersedes prior generic publication language.
- **Households** receive a safe harbor equal to 6 months of median regional consumption expenditure.
- **Enterprises** receive the greater of 3 months average payroll or 3 months average direct operating costs measured on a rolling 12-month basis.
- **Any higher protected balance** requires project escrow, catastrophe reserve, lifecycle fund, or other protected-capital qualification under the published rules.
- **Any asset or instrument** that functions as a non-decaying store of value above the household-safe-harbor threshold is subject to equivalence review for Flow-like carrying costs regardless of label, wrapper, or legal form.
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

## ANNEX Y. Constitutional Survival Minimum and Essential Access Continuity Architecture
**Purpose.** Procedural friction against narrowing is not enough. This annex defines the absolute survival floor beneath the adjustable basket and replaces the weekly Essential Access cliff with a continuity-preserving daily micro-issuance model. Where Annex Y conflicts with earlier weekly-expiry or implied-floor language, Annex Y governs.

**Design principle: protect survival with an absolute floor, then deliver it in a way people can actually use.**

### Y1. Constitutional Survival Minimum (CSM)
- **The CSM is a Tier 1 floor.** It may not be narrowed through H-1 or H-2 process and may be amended only through H-3 Refounding Convention authority.
- **The founding CSM schedule** must specify and publish minimum daily caloric sufficiency, minimum potable water access, weather-safe shelter thresholds, emergency medical stabilization, basic sanitation and hygiene, crisis mental-health stabilization, and continuity access for essential medicines.
- **The ordinary essential basket** may expand above the CSM, specify richer quality floors, and add category-specific supports. It may never fall below the CSM even during scarcity, austerity pressure, or procedural narrowing cycles.
- **Temporary substitution** is allowed only when functional equivalence is demonstrated and continuity of the survival floor is preserved for those already relying on the prior form of provision.

### Y2. Essential Access daily micro-issuance
Essential Access no longer expires as a single weekly cliff. The weekly baseline is divided into daily tranches, with each daily tranche carrying 72-hour rolling validity.
- **This model preserves anti-hoarding discipline** while smoothing demand, reducing end-cycle panic purchases, and limiting the black-market extractable value of any momentary Essential Access balance.
- **Maximum ordinary accumulation** is therefore limited to the rolling validity window unless a published continuity exception applies for disruption, travel, illness, provider outage, or caregiving emergency.
- **Provider reimbursement and dashboard accounting** must support daily or rolling settlement so the issuance rhythm is matched operationally rather than left as a user-side abstraction.

### Y3. Continuity protections and household management
- A person may not lose survival-floor access merely because illness, caregiving load, temporary travel, disability disruption, or provider unavailability prevented redemption on a particular day.
- **Continuity pathways** may include simple re-issuance, temporary pause-and-restart, narrow caregiver delegation, provider-side deferred redemption, or ombuds-certified restoration - whichever is least coercive and most operationally simple.
- **Where a household pooling mechanism exists**, pooling caps apply at the household level as well as the individual level. Pooling may not recreate concentrated managerial control over large Essential Access balances through household scaling alone.
- **Any shared household management tool** must support fast exit, dual-consent for changes where feasible, coercion alerts, and easy restoration of individual control.

### Y4. Survival-floor review and anti-hollowing rule
- Any change that would narrow ordinary basket coverage while leaving the CSM intact must still publish the functional floor test required by Annex U. Formal compliance without real usability is invalid.
- Austerity or scarcity measures may change delivery form, substitution order, or timing, but they may not hollow out the CSM through procedural fragmentation, repeated sub-threshold narrowing, or synchronized delivery obstacles.
- If repeated emergency conditions push ordinary basket provision toward the CSM for multiple cycles, root-cause review becomes mandatory. Permanent near-emergency is a governance failure, not an acceptable steady state.
