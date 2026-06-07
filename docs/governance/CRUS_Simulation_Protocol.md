# CRUS Simulation Protocol

**Status: Active-unproven protocol.** This document defines the minimum runnable simulation packet required before Commons Return and Universal Stake can support any stronger public claim.

Commons Return and Universal Stake is not ready for real-money collection. This protocol keeps the first test at simulation level: source bases may be mapped, valuations may be modeled, rails may be prototyped, and red teams may attack the design, but no person owes a compulsory charge and no household depends on Universal Stake receipts.

## Plain-English Purpose

The question is not, "does Commons Return sound fair?"

The question is:

> If the system tries to return shared or scarcity-created value to the public, who actually pays, who actually receives, who can avoid it, and who gets hurt by the paperwork?

A simulation fails if it shows the formal charge landing on ordinary life, if wealthy actors can avoid it cheaply, if Universal Stake becomes tradable, or if administrators can turn distribution into political favor.

## Governing Evidence Package

This protocol operationalizes the [Commons Return and Universal Stake Evidence Test Package](./Commons_Return_Universal_Stake_Evidence_Test_Package.md). The evidence package names the standards. This protocol names the tables and scenario outputs that make the standards runnable.

It also binds to:

- [Parameter Calibration Register](./Parameter_Calibration_Register.md) for FC-202 through FC-210 and CRUS gate thresholds;
- [Claims and Evidence Register](./Claims_Evidence_Register.md) for claim status and downgrade rules;
- [Pilot Evidence Roadmap](./Pilot_Evidence_Roadmap.md) Phase 5;
- [Threat Register](./Threat_Register.md) T-025 and T-001 compound convertibility risk.

## Simulation Rule

Every CRUS simulation packet must publish all inputs, assumptions, and failed cases. Aggregates cannot hide subgroup harm.

At minimum, each packet must contain:

| Table | Minimum rows | Why it exists |
|---|---:|---|
| Source-base inventory | One row per candidate source base | Shows what value is being assessed and what is protected. |
| Valuation uncertainty | One row per source base and valuation method | Shows whether appraisers or insiders can move the number. |
| Incidence table | One row per household type, business type, locality, and protected group | Shows who actually bears the cost after prices, rents, wages, and service quality adjust. |
| Pass-through table | One row per sector and affected ordinary group | Shows whether the formal source holder shifts the charge. |
| Avoidance table | One row per attack route | Shows whether hiding, migration, debt loading, shell routing, or under-maintenance remains profitable. |
| Eligibility table | One row per eligibility path and vulnerable group | Shows whether Universal Stake becomes exclusionary or surveillance-heavy. |
| Distribution table | One row per delivery rail and recovery path | Shows whether the stake reaches members without coercion or assignment. |
| Non-convertibility table | One row per direct and bundled conversion attempt | Shows whether protected lanes become practically tradable. |
| Administrative-cost table | One row per operating function | Shows whether valuation, enforcement, appeals, audit, and support consume the return. |
| Capture table | One row per exemption, arrears, draw, distribution timing, audit exception, and public message | Shows whether officials can reward friends or punish opponents. |
| Downturn table | One row per stress scenario | Shows whether receipts survive normal recession, legal challenge, price shock, or appeal surge. |
| Dignity table | One row per claimant group | Shows whether the process humiliates, exposes, delays, or excludes ordinary people. |

## Scenario Set

The first runnable packet must include these scenarios. More can be added, but none of these can be skipped.

| Scenario ID | Scenario | Required output |
|---|---|---|
| CRUS-SIM-01 | Base case source-base assessment | Gross receipts, protected exclusions, valuation range, appeal volume. |
| CRUS-SIM-02 | Ordinary-life incidence | Effective burden by renters, homeowners below threshold, workers, consumers, small operators, protected associations, and concentrated source holders. |
| CRUS-SIM-03 | Pass-through shock | Share of charge shifted into rents, prices, wages, fees, service degradation, or reduced supply. |
| CRUS-SIM-04 | Valuation hiding | Value hidden through appraisals, affiliated sales, IP transfers, concession accounting, reserve understatement, or estate structures. |
| CRUS-SIM-05 | Avoidance and capital flight | Base erosion from shell ownership, treaty routing, migration of control rights, debt loading, under-maintenance, or asset stripping. |
| CRUS-SIM-06 | Universal Stake eligibility | False exclusion, duplicate claims, recovery delay, staff discretion, claimant abandonment, and data exposure by group. |
| CRUS-SIM-07 | Direct non-convertibility | Attempts to sell, assign, pledge, garnish, inherit, or collateralize Universal Stake. |
| CRUS-SIM-08 | Compound convertibility | Bundled offers involving Universal Stake, Essential Access, Voice, Service Record, identity recovery, housing, employment, lending, platform access, or debt relief. |
| CRUS-SIM-09 | Routing capture | Exemptions, arrears, fund draws, distribution timing, audits, or public messages concentrated by faction, donor, office, region, sector, employer, or insider network. |
| CRUS-SIM-10 | Administrative burden | Administrative, enforcement, valuation, audit, appeal, claimant-support, and data-system cost as a share of gross receipts. |
| CRUS-SIM-11 | Downturn resilience | Net receipts after recession, land-price decline, resource-price collapse, concession failure, platform disruption, legal challenge, and high-appeal periods. |
| CRUS-SIM-12 | Work and stewardship | Labor participation, small-business formation, maintenance, housing supply, productive projects, and ordinary stewardship against comparison case. |
| CRUS-SIM-13 | Fiscal adequacy | Named obligation, gross receipts, net receipts, reserves, distribution cost, enforcement cost, appeal cost, and lawful residual funding path. |
| CRUS-SIM-14 | Public comprehension | Ordinary-reader ability to explain who pays, who receives, what is protected, and what cannot be bought. |

## Gate Outputs

Each scenario produces one of three outputs:

| Output | Meaning |
|---|---|
| Pass | No watch or blocking threshold crossed. Claim stays designed or partly tested, depending on evidence level. |
| Watch | A threshold is crossed that requires redesign, narrower claim language, or more evidence before any pilot escalation. |
| Block | A threshold is crossed that stops real-money collection, tax-replacement claims, Universal Stake activation, or scale-up until fixed and retested. |

The packet must list every watch and block output in a single summary table. It must also include a plain-language explanation of who would be harmed if the scenario were real.

## Starting Gate Thresholds

These are simulation anchors, not final constitutional parameters. The Parameter Calibration Register must bind or revise them before activation.

| Gate | Watch | Block |
|---|---:|---:|
| Ordinary-life incidence | Any ordinary group bears more effective burden than concentrated source holders in a modeled segment. | Any material burden on a protected class without a source-base or avoidance-shell finding. |
| Pass-through | More than 10% of charge shifts to ordinary renters, consumers, workers, or small operators. | More than 25%, or any shift that pushes essential goods, housing, or services below the dignity floor. |
| Avoidance and capital flight | More than 5% assessed-value erosion. | More than 10%, or avoidance remains profitable after detection, penalties, and appeal outcomes. |
| Administrative cost | More than 10% of gross receipts. | More than 20%, or ordinary claimants abandon appeals because process burden is too high. |
| Downturn | Net receipts fall more than 20% without a committed reserve and unwind plan. | Downturn management requires survival-access cuts, demurrage revival, ordinary-liquidity charges, prohibited tax bases, hidden fees, or unbounded issuance. |
| Non-convertibility | Any repeatable market or bundled offer emerges. | Any successful conversion into Voice, office, survival priority, membership, legal standing, public favor, enforcement leniency, housing access, employment access, platform access, or debt relief. |
| Eligibility and dignity | Any vulnerable group crosses false-exclusion, recovery-delay, staff-discretion, data-exposure, coercion, or abandonment watch thresholds. | Universal Stake becomes a surveillance gate, loyalty gate, work gate, humiliation screen, or exclusion path. |

## Minimum Machine-Readable Output

The repository simulation should be able to produce this shape for each scenario:

```json
{
  "scenario_id": "CRUS-SIM-03",
  "result": "watch",
  "warnings": ["PASS_THROUGH_WATCH"],
  "blocks": [],
  "metrics": {
    "pass_through_rate": 0.14,
    "admin_cost_share": 0.08,
    "assessed_value_erosion_rate": 0.03
  },
  "plain_language_failure": "renters absorb a visible share of a charge aimed at land scarcity value"
}
```

The exact schema may evolve, but the output must stay readable to non-technical reviewers.

## No-Claim Rule

A passed simulation does not prove CRUS works. It only permits the claim to move from "designed mechanism" toward "partly tested" for the specific scenarios tested.

The project still may not claim:

- Commons Return can replace taxes;
- Universal Stake is capture-proof;
- ordinary life is protected in practice;
- source bases are adequate to fund named obligations;
- eligibility can be verified without exclusion or surveillance;
- real-money collection is ready.

Those claims require field evidence, outside review, and claim-status updates under the Claims and Evidence Register.
