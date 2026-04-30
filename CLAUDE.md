# CLAUDE.md

Guidance for Claude Code working in this repo. Keep this file current when conventions change.

## What this project is

The Humane Constitution is a **constitutional-systems design** — not a live polity, not a manifesto, not a codebase that runs a government. It proposes a civic operating system that structurally separates survival, markets, and civic power, and it treats itself as an engineering artifact (threat register, patch log, invariants, adversarial simulations, acceptance protocol).

Posture to maintain in every edit: **defensible and documented, not scale-ready.** Do not overclaim. The project's credibility depends on honest gaps (pilot evidence, non-coercive identity stack, legitimate founding coalition).

## Canonical terminology (do not drift)

The repo recently scrubbed legacy "pillar" naming and legacy acronyms. Use the five canonical instrument names exactly:

- **Flow** — market money
- **Essential Access** — survival floor (not a currency, not cash, not collateral)
- **Voice** — bounded civic priority-setting
- **Service Record** — readiness for rotating public roles
- **Shared Storehouse** — temporary emergency rationing

Avoid: "pillar", "LC/EC/DW/CR", "the basket" as a shorthand for Essential Access, "credit" or "wallet" for Essential Access (those import monetary connotations the invariants reject).

Watch for token-collision phrasings like "Essential Access access" — reword to "your Essential Access" or "your survival-floor access".

When referring to the protocol holistically, prefer "the Humane Constitution", "the protocol", or "the constitutional design" — not "the system" in abstract contexts (too vague) or "the algorithm" (false).

## Architecture vocabulary

- **Founding Order** — subsidiarity, consent, exit. Reads through every article.
- **Articles I–VII** — the current constitutional structure. Do not reintroduce pillar framings.
- **Tier 1 / Tier 2 / Tier 3** — invariant / founding commitment / operational parameter. Tier 1 is unamendable in-system.
- **INV-001 … INV-007** — the seven invariants in `docs/INVARIANTS.md`. Cite by ID.
- **T-### / P-###** — threat and patch identifiers. Must stay stable across docs; validator enforces.
- **FAP** — Formal Acceptance Protocol (how patches move from PROPOSED to ACTIVE).
- **PCRP** — Pre-Confirmation Response Protocol.
- **CSM** — Constitutional Survival Minimum (the INV-001 floor).
- **RCS** — Resource & Capacity System (the measurement/oracle layer).

## Audience tiers for public-facing prose

Match the register to the doc. Do not blur them.

| Tier | Docs | Register |
|---|---|---|
| 1 — Plain-language | `Citizen_Facing_Rights_Layer.md`, `docs/One_Page_Overview.md`, `docs/Public_FAQ.md`, `docs/content/*` | ~8th-grade reading level, no jargon without gloss, no ID citations |
| 2 — Public explainer | `README.md`, `White_Paper.md` | Plain language with named instruments; IDs only when load-bearing |
| 3 — Operative / technical | `Humane_Constitution.md`, `Threat_Register.md`, `Patch_Log.md`, `docs/INVARIANTS.md`, `docs/SPECIFICATIONS.md`, `architecture/*`, `docs/annexes/*`, `founding/*` | Precise, ID-citing, adversarially-framed |

## Validation

Before opening a docs PR, run:

```bash
python3 scripts/validate_corpus.py
```

This checks local markdown links, annex-index coverage, FC/T/P identifier integrity, and banned legacy labels. If the validator fails, fix the underlying issue — do not bypass.

For simulations/tests:

```bash
python3 -m pip install -e .[test]
python3 -m pytest -q
```

CI runs the same validator and a basic frontend build on every push and PR.

## Branch convention

Work on the branch specified in the task brief (e.g. `claude/review-public-docs-dyqCc`). Push with `git push -u origin <branch>`. Do not open a PR unless explicitly asked.

## Editing posture

- **Prefer editing to creating.** New files must earn their place; rot is real for a doc-heavy repo.
- **Never introduce a new proper-noun term** for an existing concept. If a term is missing, raise it before coining.
- **Keep the moral/spiritual framing compatible with stewardship language** (servant authority, non-coercive care, stewardship-as-responsibility). Treat it as negotiable in placement and wording, but do not strip stewardship from the text.
- **Failure honesty is load-bearing.** When you cut hedges, you weaken the project. "Defensible and documented, not scale-ready" and "silence is the violation, not the failure" are protocol commitments, not rhetorical flourishes.
- **Three solutions, then stop.** When critiquing or rewriting, offer at most three alternatives per problem. More options dilute the signal.

## Common pitfalls

- Reintroducing "LC/EC/DW/CR" or "pillar" when quoting older material.
- Describing Essential Access as "benefits", "credit", "allowance", or "UBI" — it is none of these.
- Implying the design is ready to deploy.
- Collapsing Voice and Service Record into "civic credit" or "social capital".
- Replacing "verified shortage" with "shortage" — the verification step is the anti-abuse mechanism.
- Quietly dropping "non-coercive" from identity-stack references.

## Review work already landed

See `docs/reviews/` for prior critique passes. Future reviews should cite and extend those rather than restart.
