# Founding Order — Jurisdictional Scales (FC-122)

**Status:** ACTIVE — Proposal 5 close-out, 2026-04-18
**Authority:** Tier 1 (FC-122).
**Purpose:** Define the five scales of the protocol and the rules for how decisions, measurements, and rights propagate between them.

---

## The Five Scales

### 1. Household

- **Upper bound:** Family or co-resident unit. No formal person-count ceiling. The household is defined by co-residence and shared domestic economy, not by legal household definitions that may vary across cultures.
- **Representative acts:** Self-identification published to the local roll. A household consists of the personhood-holders who have self-identified as co-resident.
- **Decision authority:** Intra-household resource allocation, including substitution choices within the Annex Y §Y3 substitution schedule, caregiving-duty allocation, and any matter that does not cross the threshold of the dwelling.
- **Not authorized at household scale:** Consent to the protocol (consent is individual-personhood act, not household act); civic voting; SQ rule adaptation; representation in CRP.

### 2. Neighborhood

- **Upper bound:** **≤500 persons** (FC-122).
- **Lower bound:** At least 2 households (a neighborhood cannot consist of a single household).
- **Boundary determination:** Contiguous geography, shared local infrastructure (street / village / immediate catchment), self-identified as a neighborhood via the local roll.
- **Decision authority:** Local coordination of shared infrastructure (wells, commons, local paths, shared energy nodes where applicable), first-tier dispute mediation between households, voluntary mutual aid organization within the neighborhood.
- **Representation:** Neighborhoods may elect a coordinator to the locality layer. Coordinator has no standing authority over internal household decisions.
- **Above-neighborhood: escalation rule.** A matter that involves two or more neighborhoods must be addressed at locality scale unless the neighborhoods unanimously delegate otherwise.

### 3. Locality

- **Upper bound:** **≤5,000 persons** (FC-122).
- **Lower bound:** At least 2 neighborhoods (a locality cannot consist of a single neighborhood).
- **Boundary determination:** Contiguous geography, shared local governance tradition (town / village cluster / small municipality), self-identified via the local roll.
- **Decision authority:**
  - Local SQ adaptation within federation envelopes (a locality may set a stricter SQ than the regional or federal baseline for its own residents but not a looser one).
  - Local CRP representation (one or more delegates depending on population).
  - Municipal-equivalent civic process — public works, local resource stewardship, first-tier civic dispute resolution.
  - **Entry-tier exit eligibility:** Locality is the smallest scale that may invoke the Founding Order exit protocol. Sub-locality units (households, neighborhoods) may exit only by joining a unit that is itself exiting, or by individual relocation during another unit's unwind.
- **Representation:** Locality-level delegates to regional CRP; one or more depending on population. Delegates are bound by published local instruction and subject to recall per local rule.
- **Above-locality: escalation rule.** Matters involving two or more localities within a region are addressed at regional scale. Matters with cross-regional effect are addressed at federation scale only.

### 4. Region

- **Upper bound:** **≤500,000 persons** (FC-122).
- **Lower bound:** At least 2 localities (a region cannot consist of a single locality).
- **Boundary determination:** Contiguous geography with shared cultural/economic catchment, typically corresponding to a province-scale or state-scale boundary in pre-protocol political geography but not required to align. Regional boundaries are set at founding and may be revised by Tier 2 amendment with affected-locality consent.
- **Decision authority:**
  - Regional measurement infrastructure (oracle cohort support — Annex AL cohort siting is typically regional).
  - Regional enforcement (Annex AJ §4 Enforcement Panel is constituted with regional representation).
  - Regional CRP delegation to federation scale.
  - Regional Founding Order consent coordination when multiple localities within the region consent together.
- **Representation:** Regional delegates to federation CRP per the federation apportionment rule (see Master Protocol §VIII).
- **Above-region: escalation rule.** Matters that affect two or more regions — EC/LC non-convertibility, Tier 1 invariants, cross-regional dispute resolution, inter-regional infrastructure — are federation-scale by construction.

### 5. Federation

- **Upper bound:** Continental scope. The federation is the entire protocol.
- **Lower bound:** N/A — the federation is the highest scale.
- **Decision authority:**
  - All Tier 1 invariants (`/architecture/invariants.md`).
  - EC/LC non-convertibility (Master Protocol §II).
  - Inter-regional dispute resolution not resolved at regional scale.
  - Cross-unit externalities that no smaller scale can address.
  - Drift-chain and amendment protocol operations.
- **Representation:** Federation-scale CRP; Federated Ombuds (Annex AI); Tier 1 amendment holders (9 distributed keyholders per FC-110).
- **Not authorized at federation scale (subsidiarity-protected):** Any matter competent to a smaller scale. The federation may **not** impose a rule on a locality on a matter that the locality can handle itself, unless the matter also affects another locality.

---

## The Multi-Scale Competence Test

A matter is eligible for resolution at scale *S* only if:

1. **Competence.** Scale *S* has the informational, administrative, and adjudicative capacity to address the matter.
2. **Locality.** The matter's effects are substantially contained within scale *S* — at most de-minimis externalities to units outside *S*.
3. **Non-preemption.** No smaller scale *S'* can handle the matter with equal competence and locality.

If all three are met, the matter is properly resolved at scale *S*. If any fails, the matter escalates to the smallest scale at which all three can be satisfied.

**Worked examples:**

| Matter | Proper scale | Reasoning |
| :--- | :--- | :--- |
| Family substitution within Annex Y §Y3 (adult→child caloric shift within household) | Household | Competence: within family; Locality: effects within dwelling; Non-preemption: no smaller scale exists |
| Neighborhood well usage rotation | Neighborhood | Competence: shared infrastructure; Locality: within walk-shed; Non-preemption: households cannot coordinate usage |
| Locality SQ stricter than federation baseline | Locality | Competence: local supply understanding; Locality: residents only; Non-preemption: neighborhoods would each need to adopt individually — locality is the efficient scale |
| Regional oracle cohort siting | Region | Competence: regional measurement infrastructure; Locality: ensures N=5 cohort diversity per FC-030; Non-preemption: localities cannot individually run oracle cohorts |
| EC demurrage rate adjustment | Federation | Competence: requires currency-level calibration; Locality: affects entire EC zone; Non-preemption: no smaller scale can set non-convertibility parameters |
| Tier 1 amendment (CSM floor, exit threshold) | Federation (H-3 authority) | Non-preemption: H-3 refounding authority is definitionally federation-scale |

---

## Scale Transitions and Boundary Behavior

### 3.1 Population Threshold Crossings

When a unit grows past the upper bound of its scale (neighborhood exceeding 500, locality exceeding 5,000, region exceeding 500,000), the unit has 180 days to either:

- **Split.** Divide into two or more units of the smaller scale, each within the cap. Split must preserve contiguity and respect established sub-unit boundaries (a neighborhood split cannot cut through a household's co-residence boundary).
- **Promote.** Self-declare as a unit of the next-larger scale, acquiring that scale's representation structure and shedding the smaller-scale decision authority that no longer fits. A neighborhood that exceeds 500 can promote to locality scale if at least two sub-units can be meaningfully identified as neighborhoods.

A unit that fails to split or promote within 180 days is flagged by the federation Ombuds (Annex AI §4.4 regional monitoring) and assigned a resolution panel; it does not lose its existing rights during resolution.

### 3.2 Population Threshold Shrinkage

If a unit shrinks below the lower bound (a locality drops below 2 neighborhoods, a region drops below 2 localities), the unit has 180 days to either:

- **Merge.** Combine with an adjacent unit of the same scale, forming a combined unit with combined decision authority.
- **Demote.** Self-declare as a unit of the smaller scale, shedding the larger-scale representation structure.

### 3.3 Boundary Redrawing

Boundaries at neighborhood, locality, and regional scales may be redrawn by **local supermajority of affected personhood** (2/3, matching FC-120) with 90-day public-comment window. Federation boundaries (the continental scope) are set at founding and may be altered only by Tier 1 amendment (typically as part of an accession or exit event).

### 3.4 Overlapping / Fragmented Geography

The protocol is built for roughly-contiguous geographic units. Where geography is fragmented (enclaves, diaspora communities, mobile populations), the affected community may petition for:

- **Virtual-locality status.** A non-contiguous community of ≤5,000 persons with shared cultural/economic catchment may request recognition as a locality on a Tier 2 amendment basis. Recognition requires proof of functional decision-making capability and a stable roll.
- **Satellite representation.** A diaspora community attached to a locality of origin may maintain representation through that locality, with consent of the locality.

---

## The No-Empty-Scale Rule

Every scale must have at least one unit for the protocol to operate coherently. If, for any reason, the set of units at a scale falls to zero (e.g., all localities in a region merge into the regional scale directly), the scale is deemed "collapsed" for that geographic zone and decisions that would have been scale-appropriate redistribute:

- Collapsed neighborhood scale → decisions default up to locality.
- Collapsed locality scale → decisions default up to region, with the affected residents carrying standing personhood rights directly to the regional CRP.
- Collapsed regional scale → prohibited. A region must exist between localities and federation; if a region collapses, the federation Ombuds (Annex AI §3.4 auto-trigger) convenes an emergency constitutional review.

Collapsed scales are rare, but the rule is stated explicitly so that the scale hierarchy never has silent holes.

---

## Relationship to Other Components

| Component | Relationship |
| :--- | :--- |
| `exit_protocol.md` | Exit is available at locality, region, or federation-sub-partition scale, not at household or neighborhood |
| `consent_protocol.md` | Consent events are individual-personhood acts aggregated up the scale hierarchy |
| Master Protocol §VIII (Representation) | Scale tiers are the basis for CRP delegate apportionment |
| Annex AL (Oracle) | Oracle cohorts are typically regional (§Y of Annex AL) for measurement competence |
| Annex AI (Federated Ombuds) | Sub-Ombuds are typically federation-scale but their jurisdictional dispersal (§1.2) is defined in terms of regional geography |
| `/architecture/invariants.md` FC-122 | Scale bounds are locked at Tier 1 |

---

## Governance

FC-122 (scale bounds) is Tier 1 protected. Changes to the numerical bounds (500, 5,000, 500,000) or the number of scales (five) require full amendment (7-of-9, 180-day timelock).

Administrative rules (boundary redrawing procedures, transition timelines, split/merge mechanics) may be refined by Tier 2 amendment with scale-level representation consent.

---

*This document is part of the Founding Order — Subsidiarity, Consent & Exit. It is the numerical anchor for FC-122 and the operational basis for every article's scale defaults.*
