# Annex AJ — Above-Ledger Bypass Worked Examples

**Pre-launch gate: required before system deployment · Governed as P-004 protected specification**
**Status: PROPOSED (referenced by T-001 Session 8 update and P-015)**

---

## Purpose

T-001 (Shadow Convertibility) and its mitigation P-001 address on-ledger arbitrage: direct trades of LC for EC, proxy redemption, and broker-mediated exchanges that touch the ledger. P-001's detection infrastructure monitors these channels.

This annex addresses the gap identified in Session 8: **above-ledger bypass** — convertibility attacks that do not touch the ledger at all and therefore evade P-001 detection entirely. In above-ledger bypass, the boundary between EC, LC, DW/CR, and SQ is not breached on the ledger; it is circumvented through arrangements made entirely in the social and economic layer above it.

The purpose of this annex is to enumerate specific prohibited patterns per instrument boundary so that:
1. The legal and enforcement definition of "convertibility violation" extends above the ledger.
2. Operators, vendors, and participants have clear notice of what is prohibited.
3. Detection can be designed for social-layer patterns, not just ledger-layer patterns.
4. The protected-term definitions in P-004 include concrete examples that resist definitional drift.

**Governing rule:** Any arrangement that produces the *functional effect* of instrument conversion — regardless of whether it involves a ledger transaction — is a convertibility violation. The test is effect, not mechanism.

---

## Boundary 1 — LC / EC Boundary

*The prohibited direction: LC entitlements being used to confer EC-equivalent benefit, or EC being used to secure preferential LC access.*

### AJ-1.1 | Preferential Allocation Based on LC Status

**Pattern:** A housing provider, food distributor, or healthcare service allocates better-quality units, priority queue positions, or enhanced service tiers exclusively or preferentially to individuals who hold or actively use LC entitlements — creating a status differential based on LC utilisation.

**Why it is prohibited:** LC is a survival floor, not a status signal. If LC-active individuals receive preferential access to goods or services above the floor, LC entitlements have effectively been converted into a preference currency. This recreates the leverage relationship that the instrument separation was designed to prevent — now with the state-maintained floor as the leverage instrument.

**Concrete examples:**
- A private landlord who accepts LC for baseline housing but allocates larger or better-located units to LC-active tenants as a retention mechanism.
- A grocery vendor who offers LC-active customers early access to limited-stock items before EC-paying customers.
- A healthcare provider who reduces wait times for LC-active patients beyond what is required for baseline delivery.

**Permitted:** Providers may offer EC-priced upgrades above the LC basket floor to any customer regardless of LC status. What is prohibited is using LC status itself as the selection criterion for preferential treatment.

**Detection signal:** Correlation between LC utilisation and allocation outcomes above the baseline level across a vendor's customer population.

---

### AJ-1.2 | EC Premium for LC-Equivalent Access

**Pattern:** A vendor or service provider charges an EC premium — either explicitly or through differential pricing — that functions as a fee to avoid the LC-mediated queue, obtain goods above the LC-rationed allocation, or access the same goods through a "non-LC" channel perceived as higher status.

**Why it is prohibited:** If EC can purchase faster or superior access to goods that are simultaneously available through LC, the separation between the instruments is functional only for those who cannot pay the EC premium. This recreates price-based exclusion within the formal basket — the survival floor becomes a low-status track.

**Concrete examples:**
- A clinic that offers the same consultation via LC delivery with a 2-week wait or via EC payment with a same-day appointment.
- A transit operator that sells EC-priced "priority boarding" that consistently results in a better journey than the LC-covered standard service.
- A food vendor that sells LC-basket items at one counter and "premium" versions of the identical item at an EC counter, where the practical difference is queue length.

**Permitted:** Genuine product or service differentiation — EC-priced items that are substantively different in quality, variety, or features from LC-basket items — is allowed. Markets may serve above-basket preferences. What is prohibited is structuring delivery so that EC payment provides faster or superior access to the *same* LC-basket entitlement.

**Detection signal:** Systematic wait-time or quality differentials between LC and EC delivery channels for the same essential basket item at the same vendor.

---

### AJ-1.3 | Social Brokerage Networks

**Pattern:** An informal network of individuals pools LC entitlements through non-ledger social arrangements — households agreeing to share, community groups concentrating entitlements, or individual brokers who coordinate LC use across a network of participants — to achieve the functional effect of a pooled EC fund.

**Why it is prohibited:** At sufficient scale, coordinated LC pooling allows the network to redeem LC at a rate that exceeds any individual's basket allocation, creating liquidity and substitutability properties that LC is specifically designed not to have. This converts the aggregate LC flow into EC-like purchasing power for the network's coordinators.

**Permitted:** Household sharing of LC basket goods after redemption is not prohibited — individuals living together may share their food, for example. What is prohibited is coordinated pre-redemption pooling that is designed to achieve above-individual-basket access or to create a tradeable pool. The test is coordination for arbitrage purpose, not ordinary household life.

**Detection signal:** Synchronized redemption patterns across non-cohabiting individuals; redemption rates significantly above typical single-household use per LC account; network topology suggesting coordination.

---

## Boundary 2 — DW/CR / Resource Access Boundary

*The prohibited direction: civic standing being used to gain preferential access to goods, services, or opportunities; or resource/EC advantage being used to accumulate DW/CR.*

### AJ-2.1 | Civic Standing as Allocation Preference

**Pattern:** An institution, vendor, service provider, or programme uses DW balance, CR score, or civic participation history as an explicit or implicit criterion for preferential allocation of goods, services, employment, housing, or any resource that is not a formal civic function.

**Why it is prohibited:** DW/CR is scoped exclusively to civic agenda-setting and service eligibility within the civic layer. If DW/CR balance produces preferential outcomes in markets, housing, employment, or services, it has effectively become a general status currency — which is the social credit failure mode the instrument separation is designed to prevent.

**Concrete examples:**
- An employer who uses CR records as a positive factor in hiring decisions for non-civic roles.
- A housing authority that gives DW-active applicants priority in allocation of units above the LC baseline.
- A university that offers admissions preference to applicants with high CR records on the grounds that they are "engaged citizens."
- A vendor loyalty programme that grants discounts or perks based on civic participation history.

**Permitted:** Civic functions — jury selection pools, audit panels, deliberation bodies, and oversight roles — may and should use CR eligibility criteria. These are the defined uses of the civic layer. What is prohibited is any use of DW/CR as a criterion in decisions that are not formal civic functions.

**Detection signal:** Correlation between DW/CR balance and outcomes in non-civic domains (employment rates, housing allocation rates, service quality) across a population.

---

### AJ-2.2 | EC-Funded Civic Standing Accumulation

**Pattern:** An individual or organisation uses EC resources — paid time, staff, facilities, or services — to systematically enable a group of individuals to accumulate DW/CR at rates not available to those without equivalent EC resources. This converts EC advantage into civic advantage through the mechanism of contribution verification.

**Why it is prohibited:** DW/CR is intended to represent genuine stewardship contribution. If EC can buy the conditions that make contribution easy, verifiable, and legible — while those without EC must contribute under harder conditions with less verification infrastructure — then EC has purchased civic standing indirectly.

**Concrete examples:**
- A corporation that pays employees to perform verifiable "stewardship" activities during work hours, systematically accumulating CR for its workforce at rates unavailable to informal workers.
- A civic consultancy that charges EC fees to prepare contribution documentation that passes verification more reliably than self-submitted records.
- An organisation that funds community activities specifically designed to generate contribution-verification events, channelling CR accumulation toward its affiliated networks.

**Permitted:** Employers may encourage genuine community stewardship. Organisations may support community activities with genuine civic benefit. What is prohibited is structuring these activities specifically as CR accumulation mechanisms for affiliated populations, particularly where the EC resource advantage produces a systematic CR gap between affiliated and non-affiliated participants.

**Detection signal:** CR accumulation rates systematically higher for economically affiliated groups than for non-affiliated groups with similar activity levels.

---

### AJ-2.3 | Civic Position as Economic Leverage

**Pattern:** An individual uses their formal position in a civic body — an audit panel, oversight committee, CRP seat, or deliberation body — to advance EC-beneficial decisions, direct contracts, or signal preferences to market actors in ways that translate civic position into economic advantage.

**Why it is prohibited:** Civic positions carry real decision-making authority. If that authority can be converted into EC advantage — through directed contracts, information asymmetry, or signalled preferences — then the civic layer has become an economic power instrument, inverting the separation the protocol is designed to maintain.

**Concrete examples:**
- A CRP member who votes on procurement priorities in ways that systematically benefit businesses they have personal EC relationships with.
- An audit panel member who signals audit focus areas to connected market participants before the audit begins, allowing them to prepare preferentially.
- An oversight committee member who leverages their position to obtain speaking engagements, consulting arrangements, or advisory roles from organisations they oversee.

**Permitted:** Civic participants may have ordinary economic lives. What is prohibited is using the information, authority, or influence of a civic position to secure EC advantage — standard conflict-of-interest doctrine applied to the DW/CR layer.

**Detection signal:** Correlation between civic position and EC outcomes for the individual and their connected networks; post-position employment in sectors they previously oversaw.

---

## Boundary 3 — SQ / EC Boundary

*The prohibited direction: scarcity rationing being used to confer EC-equivalent advantage; or EC being used to circumvent SQ rationing.*

### AJ-3.1 | SQ Allocation as Premium Service

**Pattern:** During an active SQ period, an entity with allocation authority — a vendor, distributor, or regional operator — provides SQ-rationed goods to some individuals faster, in better condition, or in greater variety than the SQ allocation technically requires, in exchange for EC payment or economic relationship.

**Why it is prohibited:** SQ rationing is designed to ensure equitable distribution during genuine shortage. If SQ allocations can be enhanced by EC payment, rationing reproduces price-based exclusion under a different name. The SQ period is precisely when the separation between EC and survival access must be most robust, because it is the period of highest vulnerability.

**Concrete examples:**
- A food distributor who, during an SQ activation for a specific food category, offers "priority delivery" of that category's SQ allocation for an EC fee.
- A regional operator who fulfils SQ allocations faster for businesses that maintain ongoing EC contracts with the operator.
- A vendor who, during SQ rationing, offers the SQ-rationed item alongside a "premium bundle" where the SQ item is included — effectively tying SQ access to EC purchase.

**Permitted:** Markets for goods outside the SQ-rationed category continue unaffected. EC sales of non-rationed items continue normally. What is prohibited is conditioning the delivery, quality, timing, or access to SQ-rationed allocations on EC payment or relationship.

**Detection signal:** Systematic differences in SQ allocation delivery outcomes correlated with EC-relationship status; complaints from non-EC-affiliated SQ recipients about delayed or inferior delivery.

---

### AJ-3.2 | EC Exit from SQ Scope

**Pattern:** A market actor — an individual, household, or firm — uses EC resources to obtain goods in the same category as the SQ-rationed essential from sources outside the SQ system, in quantities that effectively exempt them from the rationing regime while drawing down the shared supply pool that the SQ system was designed to manage.

**Why it is prohibited:** SQ is activated because the overall supply of a category is constrained. If EC-wealthy actors can simply purchase from outside the SQ system, the shortage is not actually shared — it is concentrated among those without EC resources to exit. The SQ system manages a shared resource; actors who exit via EC while drawing on the same physical supply undermine the entire rationing purpose.

**Concrete examples:**
- During a regional water-intensive food SQ, an individual purchases large quantities of the rationed category from an import source not yet captured by the SQ boundary.
- A wealthy household stockpiles SQ-rationed goods using EC in advance of an anticipated SQ activation, before the activation formally begins.
- A firm with EC resources contracts directly with producers outside the SQ-designated supply chain, bypassing rationing while competing for the same underlying physical supply.

**Permitted:** Genuine product substitution — purchasing a different product from outside the SQ-rationed category — is permitted; the SQ is category-specific. What is prohibited is using EC to obtain the same category of good at scale while the rationing system is designed to manage overall supply of that category.

**Detection signal:** Category consumption in SQ-affected regions correlated with EC wealth levels; import flows of SQ-rationed categories increasing during SQ periods.

---

### AJ-3.3 | Anticipatory Hoarding via EC

**Pattern:** A market actor uses EC resources to accumulate large quantities of goods in a category where SQ activation is anticipated, before the activation formally begins — creating a personal reserve that exempts them from the rationing period while contributing to the supply shortfall that triggers it.

**Why it is prohibited:** Anticipatory hoarding is a self-fulfilling attack on the SQ system: the hoarding behaviour accelerates the supply shortfall that triggers SQ activation, while exempting the hoarder from its effects. It is both a cause of the shortage and a circumvention of the rationing response.

**Concrete examples:**
- A firm that monitors RCS sentinel indicators and purchases months of supply of a flagged category before PCRP activation, making the shortfall worse while ensuring their own supply.
- An individual who, upon hearing about drought conditions, purchases large quantities of water-intensive foods before the SQ is announced.

**Permitted:** Normal inventory management and ordinary household provisioning. What is prohibited is large-scale anticipatory accumulation that is scaled to the anticipated SQ period and timed to sentinel indicator movements.

**Detection signal:** Spikes in category purchasing correlated with sentinel indicator movements, particularly by actors with the information access to monitor oracle signals.

---

## Governance of This Annex

This annex is a **P-004 protected specification**. The worked examples above cannot be removed, narrowed, or recharacterised through ordinary operational updates. Changes to these examples require the same process as changes to core protected terms: semantic effect test, upward classification default, and public definition registry update.

New worked examples may be added through the standard P-004 amendment process as new above-ledger bypass patterns are identified in operation. The annex should be reviewed annually and updated with patterns identified through enforcement activity.

**Detection infrastructure requirement:** Pillar 11 monitoring must extend to the social-layer detection signals identified in each worked example above. These signals are not ledger-based; they require vendor-level data collection, population-level outcome analysis, and complaint-pattern monitoring. The specific detection thresholds are maintained in the Restricted Register Annex per P-021 (Annex AO).

---

*This document is Annex AJ of the master protocol. Operative as a PROPOSED patch until P-015 reaches ACTIVE status through the Formal Acceptance Protocol.*
