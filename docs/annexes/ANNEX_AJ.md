# Annex AJ — Above-Ledger Bypass Worked Examples

**Pre-launch gate: required before system deployment · Governed as P-004 protected specification**
**Status: ACTIVE — penalty schedule bound to Founding Commitments FC-010, FC-040, FC-041 (Proposal 7 close-out, 2026-04-18)**

---

## Purpose

T-001 (Shadow Convertibility) and its mitigation P-001 address on-ledger arbitrage: direct trades of Essential Access for Flow, proxy redemption, and broker-mediated exchanges that touch the ledger. P-001's detection infrastructure monitors these channels.

This annex addresses the gap identified in Session 8: **above-ledger bypass** — convertibility attacks that do not touch the ledger at all and therefore evade P-001 detection entirely. In above-ledger bypass, the boundary between Flow, Essential Access, Voice and Service Record, and Shared Storehouse is not breached on the ledger; it is circumvented through arrangements made entirely in the social and economic layer above it.

The purpose of this annex is to enumerate specific prohibited patterns per instrument boundary so that:
1. The legal and enforcement definition of "convertibility violation" extends above the ledger.
2. Operators, vendors, and participants have clear notice of what is prohibited.
3. Detection can be designed for social-layer patterns, not just ledger-layer patterns.
4. The protected-term definitions in P-004 include concrete examples that resist definitional drift.

**Governing rule:** Any arrangement that produces the *functional effect* of instrument conversion — regardless of whether it involves a ledger transaction — is a convertibility violation. The test is effect, not mechanism.

---

## Boundary 1 — Essential Access / Flow Boundary

*The prohibited direction: Essential Access entitlements being used to confer Flow-equivalent benefit, or Flow being used to secure preferential Essential Access access.*

### AJ-1.1 | Preferential Allocation Based on Essential Access Status

**Pattern:** A housing provider, food distributor, or healthcare service allocates better-quality units, priority queue positions, or enhanced service tiers exclusively or preferentially to individuals who hold or actively use Essential Access entitlements — creating a status differential based on Essential Access utilisation.

**Why it is prohibited:** Essential Access is a survival floor, not a status signal. If Essential Access-active individuals receive preferential access to goods or services above the floor, Essential Access entitlements have effectively been converted into a preference currency. This recreates the leverage relationship that the instrument separation was designed to prevent — now with the state-maintained floor as the leverage instrument.

**Concrete examples:**
- A private landlord who accepts Essential Access for baseline housing but allocates larger or better-located units to Essential Access-active tenants as a retention mechanism.
- A grocery vendor who offers Essential Access-active customers early access to limited-stock items before Flow-paying customers.
- A healthcare provider who reduces wait times for Essential Access-active patients beyond what is required for baseline delivery.

**Permitted:** Providers may offer Flow-priced upgrades above the Essential Access basket floor to any customer regardless of Essential Access status. What is prohibited is using Essential Access status itself as the selection criterion for preferential treatment.

**Detection signal:** Correlation between Essential Access utilisation and allocation outcomes above the baseline level across a vendor's customer population.

---

### AJ-1.2 | Flow Premium for Essential Access-Equivalent Access

**Pattern:** A vendor or service provider charges an Flow premium — either explicitly or through differential pricing — that functions as a fee to avoid the Essential Access-mediated queue, obtain goods above the Essential Access-rationed allocation, or access the same goods through a "non-Essential Access" channel perceived as higher status.

**Why it is prohibited:** If Flow can purchase faster or superior access to goods that are simultaneously available through Essential Access, the separation between the instruments is functional only for those who cannot pay the Flow premium. This recreates price-based exclusion within the formal basket — the survival floor becomes a low-status track.

**Concrete examples:**
- A clinic that offers the same consultation via Essential Access delivery with a 2-week wait or via Flow payment with a same-day appointment.
- A transit operator that sells Flow-priced "priority boarding" that consistently results in a better journey than the Essential Access-covered standard service.
- A food vendor that sells Essential Access-basket items at one counter and "premium" versions of the identical item at an Flow counter, where the practical difference is queue length.

**Permitted:** Genuine product or service differentiation — Flow-priced items that are substantively different in quality, variety, or features from Essential Access-basket items — is allowed. Markets may serve above-basket preferences. What is prohibited is structuring delivery so that Flow payment provides faster or superior access to the *same* Essential Access-basket entitlement.

**Detection signal:** Systematic wait-time or quality differentials between Essential Access and Flow delivery channels for the same essential basket item at the same vendor.

---

### AJ-1.3 | Social Brokerage Networks

**Pattern:** An informal network of individuals pools Essential Access entitlements through non-ledger social arrangements — households agreeing to share, community groups concentrating entitlements, or individual brokers who coordinate Essential Access use across a network of participants — to achieve the functional effect of a pooled Flow fund.

**Why it is prohibited:** At sufficient scale, coordinated Essential Access pooling allows the network to redeem Essential Access at a rate that exceeds any individual's basket allocation, creating liquidity and substitutability properties that Essential Access is specifically designed not to have. This converts the aggregate Essential Access flow into Flow-like purchasing power for the network's coordinators.

**Permitted:** Household sharing of Essential Access basket goods after redemption is not prohibited — individuals living together may share their food, for example. What is prohibited is coordinated pre-redemption pooling that is designed to achieve above-individual-basket access or to create a tradeable pool. The test is coordination for arbitrage purpose, not ordinary household life.

**Detection signal:** Synchronized redemption patterns across non-cohabiting individuals; redemption rates significantly above typical single-household use per Essential Access account; network topology suggesting coordination.

---

## Boundary 2 — Voice and Service Record / Resource Access Boundary

*The prohibited direction: civic standing being used to gain preferential access to goods, services, or opportunities; or resource/Flow advantage being used to accumulate Voice and Service Record.*

### AJ-2.1 | Civic Standing as Allocation Preference

**Pattern:** An institution, vendor, service provider, or programme uses Voice balance, Service Record score, or civic participation history as an explicit or implicit criterion for preferential allocation of goods, services, employment, housing, or any resource that is not a formal civic function.

**Why it is prohibited:** Voice and Service Record is scoped exclusively to civic agenda-setting and service eligibility within the civic layer. If Voice and Service Record balance produces preferential outcomes in markets, housing, employment, or services, it has effectively become a general status currency — which is the social credit failure mode the instrument separation is designed to prevent.

**Concrete examples:**
- An employer who uses Service Record records as a positive factor in hiring decisions for non-civic roles.
- A housing authority that gives Voice-active applicants priority in allocation of units above the Essential Access baseline.
- A university that offers admissions preference to applicants with high Service Record records on the grounds that they are "engaged citizens."
- A vendor loyalty programme that grants discounts or perks based on civic participation history.

**Permitted:** Civic functions — jury selection pools, audit panels, deliberation bodies, and oversight roles — may and should use Service Record eligibility criteria. These are the defined uses of the civic layer. What is prohibited is any use of Voice and Service Record as a criterion in decisions that are not formal civic functions.

**Detection signal:** Correlation between Voice and Service Record balance and outcomes in non-civic domains (employment rates, housing allocation rates, service quality) across a population.

---

### AJ-2.2 | Flow-Funded Civic Standing Accumulation

**Pattern:** An individual or organisation uses Flow resources — paid time, staff, facilities, or services — to systematically enable a group of individuals to accumulate Voice and Service Record at rates not available to those without equivalent Flow resources. This converts Flow advantage into civic advantage through the mechanism of contribution verification.

**Why it is prohibited:** Voice and Service Record is intended to represent genuine stewardship contribution. If Flow can buy the conditions that make contribution easy, verifiable, and legible — while those without Flow must contribute under harder conditions with less verification infrastructure — then Flow has purchased civic standing indirectly.

**Concrete examples:**
- A corporation that pays employees to perform verifiable "stewardship" activities during work hours, systematically accumulating Service Record for its workforce at rates unavailable to informal workers.
- A civic consultancy that charges Flow fees to prepare contribution documentation that passes verification more reliably than self-submitted records.
- An organisation that funds community activities specifically designed to generate contribution-verification events, channelling Service Record accumulation toward its affiliated networks.

**Permitted:** Employers may encourage genuine community stewardship. Organisations may support community activities with genuine civic benefit. What is prohibited is structuring these activities specifically as Service Record accumulation mechanisms for affiliated populations, particularly where the Flow resource advantage produces a systematic Service Record gap between affiliated and non-affiliated participants.

**Detection signal:** Service Record accumulation rates systematically higher for economically affiliated groups than for non-affiliated groups with similar activity levels.

---

### AJ-2.3 | Civic Position as Economic Leverage

**Pattern:** An individual uses their formal position in a civic body — an audit panel, oversight committee, CRP seat, or deliberation body — to advance Flow-beneficial decisions, direct contracts, or signal preferences to market actors in ways that translate civic position into economic advantage.

**Why it is prohibited:** Civic positions carry real decision-making authority. If that authority can be converted into Flow advantage — through directed contracts, information asymmetry, or signalled preferences — then the civic layer has become an economic power instrument, inverting the separation the protocol is designed to maintain.

**Concrete examples:**
- A CRP member who votes on procurement priorities in ways that systematically benefit businesses they have personal Flow relationships with.
- An audit panel member who signals audit focus areas to connected market participants before the audit begins, allowing them to prepare preferentially.
- An oversight committee member who leverages their position to obtain speaking engagements, consulting arrangements, or advisory roles from organisations they oversee.

**Permitted:** Civic participants may have ordinary economic lives. What is prohibited is using the information, authority, or influence of a civic position to secure Flow advantage — standard conflict-of-interest doctrine applied to the Voice and Service Record layer.

**Detection signal:** Correlation between civic position and Flow outcomes for the individual and their connected networks; post-position employment in sectors they previously oversaw.

---

## Boundary 3 — Shared Storehouse / Flow Boundary

*The prohibited direction: scarcity rationing being used to confer Flow-equivalent advantage; or Flow being used to circumvent Shared Storehouse rationing.*

### AJ-3.1 | Shared Storehouse Allocation as Premium Service

**Pattern:** During an active Shared Storehouse period, an entity with allocation authority — a vendor, distributor, or regional operator — provides Shared Storehouse-rationed goods to some individuals faster, in better condition, or in greater variety than the Shared Storehouse allocation technically requires, in exchange for Flow payment or economic relationship.

**Why it is prohibited:** Shared Storehouse rationing is designed to ensure equitable distribution during genuine shortage. If Shared Storehouse allocations can be enhanced by Flow payment, rationing reproduces price-based exclusion under a different name. The Shared Storehouse period is precisely when the separation between Flow and survival access must be most robust, because it is the period of highest vulnerability.

**Concrete examples:**
- A food distributor who, during an Shared Storehouse activation for a specific food category, offers "priority delivery" of that category's Shared Storehouse allocation for an Flow fee.
- A regional operator who fulfils Shared Storehouse allocations faster for businesses that maintain ongoing Flow contracts with the operator.
- A vendor who, during Shared Storehouse rationing, offers the Shared Storehouse-rationed item alongside a "premium bundle" where the Shared Storehouse item is included — effectively tying Shared Storehouse access to Flow purchase.

**Permitted:** Markets for goods outside the Shared Storehouse-rationed category continue unaffected. Flow sales of non-rationed items continue normally. What is prohibited is conditioning the delivery, quality, timing, or access to Shared Storehouse-rationed allocations on Flow payment or relationship.

**Detection signal:** Systematic differences in Shared Storehouse allocation delivery outcomes correlated with Flow-relationship status; complaints from non-Flow-affiliated Shared Storehouse recipients about delayed or inferior delivery.

---

### AJ-3.2 | Flow Exit from Shared Storehouse Scope

**Pattern:** A market actor — an individual, household, or firm — uses Flow resources to obtain goods in the same category as the Shared Storehouse-rationed essential from sources outside the Shared Storehouse system, in quantities that effectively exempt them from the rationing regime while drawing down the shared supply pool that the Shared Storehouse system was designed to manage.

**Why it is prohibited:** Shared Storehouse is activated because the overall supply of a category is constrained. If Flow-wealthy actors can simply purchase from outside the Shared Storehouse system, the shortage is not actually shared — it is concentrated among those without Flow resources to exit. The Shared Storehouse system manages a shared resource; actors who exit via Flow while drawing on the same physical supply undermine the entire rationing purpose.

**Concrete examples:**
- During a regional water-intensive food Shared Storehouse, an individual purchases large quantities of the rationed category from an import source not yet captured by the Shared Storehouse boundary.
- A wealthy household stockpiles Shared Storehouse-rationed goods using Flow in advance of an anticipated Shared Storehouse activation, before the activation formally begins.
- A firm with Flow resources contracts directly with producers outside the Shared Storehouse-designated supply chain, bypassing rationing while competing for the same underlying physical supply.

**Permitted:** Genuine product substitution — purchasing a different product from outside the Shared Storehouse-rationed category — is permitted; the Shared Storehouse is category-specific. What is prohibited is using Flow to obtain the same category of good at scale while the rationing system is designed to manage overall supply of that category.

**Detection signal:** Category consumption in Shared Storehouse-affected regions correlated with Flow wealth levels; import flows of Shared Storehouse-rationed categories increasing during Shared Storehouse periods.

---

### AJ-3.3 | Anticipatory Hoarding via Flow

**Pattern:** A market actor uses Flow resources to accumulate large quantities of goods in a category where Shared Storehouse activation is anticipated, before the activation formally begins — creating a personal reserve that exempts them from the rationing period while contributing to the supply shortfall that triggers it.

**Why it is prohibited:** Anticipatory hoarding is a self-fulfilling attack on the Shared Storehouse system: the hoarding behaviour accelerates the supply shortfall that triggers Shared Storehouse activation, while exempting the hoarder from its effects. It is both a cause of the shortage and a circumvention of the rationing response.

**Concrete examples:**
- A firm that monitors RCS sentinel indicators and purchases months of supply of a flagged category before PCRP activation, making the shortfall worse while ensuring their own supply.
- An individual who, upon hearing about drought conditions, purchases large quantities of water-intensive foods before the Shared Storehouse is announced.

**Permitted:** Normal inventory management and ordinary household provisioning. What is prohibited is large-scale anticipatory accumulation that is scaled to the anticipated Shared Storehouse period and timed to sentinel indicator movements.

**Detection signal:** Spikes in category purchasing correlated with sentinel indicator movements, particularly by actors with the information access to monitor oracle signals.

---

## Section 4 — Penalty Schedule (Proposal 7 close-out)

The worked examples in Sections 1–3 state what is prohibited. Without a published penalty schedule, "prohibited" is a word without teeth — detection produces cases that have to be adjudicated ex post with no pre-committed sanction, which is itself a drift surface. This section binds each boundary-class pattern to a graduated penalty schedule calibrated on the Founding Commitments.

### 4.1 — Deterrence Calibration (FC-040, FC-041)

**Deterrence identity:** expected value to the violator of a detected-and-sanctioned attempt must be strictly negative. Given detection probability *p* and penalty-to-gain multiplier *k*:

> EV(violation) = (1 − *p*) · gain − *p* · *k* · gain = gain · (1 − *p* − *p*·*k*)

For EV ≤ 0: *k* ≥ (1 − *p*) / *p*. At the assumed detection probability **FC-041 `DETECTION_PROBABILITY_ASSUMED` = 0.85**, break-even is *k* ≈ 0.18. The protocol commits to **FC-040 `BRIBE_DETERRENCE_MULTIPLIER` = 5.0** — meaning the base penalty for any detected above-ledger violation is **5× the detected functional gain**. This produces EV(violation) = gain · (1 − 0.85 − 4.25) = gain · (−4.10), a decisive deterrent. The 5× multiplier also survives a detection-rate collapse to ≈0.17 before EV turns positive, so the schedule is not fragile to realistic detection shortfalls.

**Gain definition.** The "functional gain" is the Flow-equivalent value the violator captured through the violation, measured as:
- For individual/household violations: the Flow-market price of the preferential access, goods, or standing secured above the Essential Access/Shared Storehouse baseline or civic floor.
- For operator/vendor violations: the incremental revenue or margin attributable to the violating pattern, measured against a non-violating baseline cohort.
- For institutional violations (employer-sponsored Service Record accumulation, directed civic positions): the Flow-equivalent value of the civic-standing advantage conferred, valued at the cost of securing equivalent standing through non-violating means.

Gain is measured by the enforcement body at the time of adjudication and is documented on the public Enforcement Ledger under Article VII (without PII).

### 4.2 — Graduated Penalty Matrix

Penalties are calibrated per-actor-scale and per-boundary-severity. The scheduled penalty is the base multiplier (5×) times the severity factor in the matrix below, applied to the functional gain and capped or floored at the per-actor amounts shown.

| Pattern | Severity | Actor: Individual | Actor: Operator / Firm | Actor: Institution / Sponsor |
| :--- | :---: | :--- | :--- | :--- |
| **AJ-1.1** Essential Access status as allocation preference | 1.0× | 5× gain; Service Record −0.1 for cycle | 5× gain; 90-day vendor license probation; 2nd offense = vendor ban in essential category | 5× gain; 180-day exclusion from Essential Access-redemption network; public Enforcement Ledger notice |
| **AJ-1.2** Flow premium for Essential Access-equivalent access | 1.2× | 6× gain; Service Record −0.2 for cycle | 6× gain; 180-day vendor license probation; operator-license review | 6× gain; 365-day exclusion from essential-category redemption; mandatory divestment of Essential Access redemption operations |
| **AJ-1.3** Social brokerage networks (coordinators) | 1.5× | 7.5× gain against coordinator; network participants liable only on knowing participation | 7.5× gain; operator license revoked for essential-category brokerage | 7.5× gain; criminal referral under convertibility-violation statute where coordination is organised |
| **AJ-2.1** Civic standing as allocation preference | 1.2× | 6× gain (rare as individual pattern); Service Record −0.2 | 6× gain; 180-day probation from civic-eligibility data access; vendor loyalty program disqualification | 6× gain; 365-day exclusion from Service Record-conditioned hiring pools or allocation queues; mandatory audit of prior-period decisions |
| **AJ-2.2** Flow-funded civic standing accumulation | 1.5× | — | 7.5× gain; Service Record accrued under the pattern is voided for affected accounts; employer barred 365 days from Service Record-attestation sponsorship | 7.5× gain; all attributable Service Record accruals voided; 365-day exclusion; mandatory restitution of civic-sponsorship Flow flows |
| **AJ-2.3** Civic position as economic leverage | 2.0× | 10× gain; **civic position vacated; 5-year Service Record-eligibility suspension; criminal referral** | 10× gain against contracted entity; 365-day procurement exclusion; contract voidance | 10× gain; 5-year exclusion from civic-procurement relationships |
| **AJ-3.1** Shared Storehouse allocation as premium service | 1.5× | 7.5× gain; Service Record −0.3 | 7.5× gain; operator license suspended for duration of Shared Storehouse period and 180 days post-restoration; 2nd offense = operator license revoked | 7.5× gain; 365-day exclusion from Shared Storehouse-rationed supply chain; mandatory restitution to underserved recipients |
| **AJ-3.2** Flow exit from Shared Storehouse scope (during active Shared Storehouse) | 1.8× | 9× gain; excess quantity returned to Shared Storehouse pool or forfeit | 9× gain; import/supply license suspended for Shared Storehouse duration; operator subject to per-unit excise recouping the Shared Storehouse-pool draw | 9× gain; mandatory contribution to Shared Storehouse buffer equal to 2× goods acquired |
| **AJ-3.3** Anticipatory hoarding via Flow | 1.5× pre-activation; 2.0× post-activation timing | 7.5×–10× gain; excess inventory forfeit to Shared Storehouse pool at activation | 7.5×–10× gain; license suspension; mandatory release of hoarded inventory at Shared Storehouse-activation basket prices | 7.5×–10× gain; 365-day exclusion; mandatory audit of trading activity during the 90 days preceding activation |

**Notes on the matrix:**
- Severity factor is applied to the FC-040 base multiplier (5×), so AJ-1.1 = 5.0× gain, AJ-1.2 = 6.0× gain, AJ-2.3 = 10.0× gain, etc.
- "Service Record −0.X for cycle" is a deduction from the violator's civic record balance proportional to severity; Service Record deduction is independent of the gain-multiplier and is not netted against it.
- Vendor/operator license actions are administered by the licensing authority named in the Article VII enforcement architecture; suspension and revocation are appealable only through the Ombuds process per Annex AI.
- "Criminal referral" indicates a finding that meets the threshold for separate prosecution under the convertibility-violation statute (out of scope of this annex); the civil/administrative penalty in this matrix applies regardless of prosecution outcome.

### 4.3 — Escalation Ladder for Repeat and Systemic Violations

**Repeat offense:** a second adjudicated violation of any AJ pattern by the same actor within 24 months triggers automatic escalation to the next severity band, plus:
- Individuals: Service Record deduction doubles; civic-position eligibility suspended for 2 cycles.
- Operators: license revocation in essential category; 5-year prohibition from operating in Essential Access or Shared Storehouse supply chains.
- Institutions: public Enforcement Ledger notice with named leadership; mandatory independent governance audit at institution's cost.

**Systemic violation:** when enforcement data shows AJ-pattern incidence across a vendor class, sector, or region exceeds **FC-010 systemic-review trigger of 7% / annum of Essential Access allocations in the affected scope**, the Ombuds triggers a **sector-level systemic review** under Annex AI. Individual enforcement continues in parallel. The systemic review assesses whether the architecture itself requires hardening (new detection signal, new prohibited pattern) or whether the breach is an enforcement-capacity failure.

The **routine leakage ceiling of 3% / annum (FC-010)** is the operational target. Between 3% and 7%, the Ombuds prioritises detection investment and enforcement acceleration but does not trigger systemic review. Below 3%, the regime is considered in normal operating state.

### 4.4 — Enforcement Body and Process

Penalty adjudication is administered by the **Enforcement Panel** (a sub-body of the authority named in the Article VII enforcement architecture). Process:

1. **Finding.** Detection signal triggers investigation; investigation produces a factual finding with documented evidence.
2. **Gain quantification.** The enforcement body quantifies the functional gain per §4.1. Quantification methodology is documented and subject to the P-017 oracle-independence standards (Annex AL) where gain estimation requires measurement of market prices or cohort comparisons.
3. **Notice and response.** The accused actor receives notice with the factual finding, the gain quantification, and the scheduled penalty. Actor has 30 days to contest findings or accept.
4. **Adjudication.** Contested cases proceed to the Enforcement Panel. Panel composition: 3 seats drawn from the Article VII enforcement staff, 2 seats drawn from the Ombuds roster per Annex AI, 1 seat drawn from the affected-party advocacy roster. No Enforcement Panel member may have a prior relationship with the accused actor within 3 years.
5. **Appeal.** Adjudicated penalties are appealable once, through the federated Ombuds process per Annex AI §AI-7 (appeal tier). Appeal pauses license actions but not gain-recoupment until resolved.
6. **Publication.** Final findings are published on the Enforcement Ledger (Article VII) in aggregate form, with individual findings published only where necessary for statutory notice or where the actor has consented. PII is stripped per Annex AM.

### 4.5 — Deterrence Audit

The Enforcement Panel publishes an **Annual Deterrence Audit** (parallel to the Ombuds annual audit, Annex AI §AI-8) with:
- Estimated total functional gain attempted across each AJ pattern (from detection plus estimation of undetected).
- Actual penalties assessed and collected.
- Realised penalty-to-gain ratio by pattern.
- Realised detection probability by pattern.
- Whether the FC-040 (5.0×) and FC-041 (0.85) assumptions are holding; if detection probability slips below the level at which the 5.0× multiplier yields negative EV, the Panel issues a formal recalibration recommendation to the Founding Coalition for consideration under the Tier 2 amendment ladder.

The Annual Deterrence Audit is the feedback loop that keeps the penalty schedule calibrated. If either the multiplier or the detection assumption drifts, the deterrence identity in §4.1 tells the Coalition exactly how much headroom remains before the regime becomes EV-positive for violators.

---

## Governance of This Annex

This annex is a **P-004 protected specification**. The worked examples above cannot be removed, narrowed, or recharacterised through ordinary operational updates. Changes to these examples require the same process as changes to core protected terms: semantic effect test, upward classification default, and public definition registry update.

The numerical values of FC-040 (5.0× multiplier) and FC-041 (0.85 detection probability assumption) are **Tier 2 commitments in `/founding/commitments.md`**. Changes require the Tier 2 amendment ladder with public redlines. FC-010 leakage thresholds (3% / 7%) are likewise Tier 2.

New worked examples may be added through the standard P-004 amendment process as new above-ledger bypass patterns are identified in operation. The annex should be reviewed annually and updated with patterns identified through enforcement activity. Penalty schedule matrix updates for new patterns must maintain deterrence identity (§4.1) and are subject to Tier 2 amendment authority.

**Detection infrastructure requirement:** Article VII monitoring must extend to the social-layer detection signals identified in each worked example above. These signals are not ledger-based; they require vendor-level data collection, population-level outcome analysis, and complaint-pattern monitoring. The specific detection thresholds are maintained in the Restricted Register Annex per P-021 (Annex AO).

---

*This document is Annex AJ of the Humane Constitution. Operative as an ACTIVE specification as of Proposal 7 close-out. Penalty schedule (§4) and Founding Commitments FC-010, FC-040, FC-041 are binding on the Enforcement Panel through the Article VII enforcement architecture.*
