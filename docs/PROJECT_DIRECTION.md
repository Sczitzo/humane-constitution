# Project Direction

*Internal direction note — not part of the published corpus. The decision record that keeps work from drifting.*

## Decided direction (2026-06-03)

- **Audience:** both the general public *and* academics / policy people / funders.
- **What success means:** someone serious takes it seriously — a real expert, organization, or community engages with it as a genuine proposal.
- **Investment:** high — this is the primary project.

## The reframe

A serious reviewer never reads 105 documents. They check three things, fast: (1) are the project's own claims internally consistent; (2) is there a tight steelman case plus an honest evidence ledger; (3) is there anything concrete to fund or test. The bottleneck is not corpus volume — it is integrity, packaging, and a concrete ask. Running every document through a review panel would *add* volume and is the wrong move.

## Discipline going forward

**Subtract and verify before adding.** Every new word must earn its place against the bar: "would a skeptical expert respect this?" The corpus is already large; the next stretch is consolidation and integrity, not expansion.

## Phases (in order)

**Phase 0 — Integrity (the gate).** One source of truth for every patch/threat status; reconcile cross-file contradictions (e.g. P-003 reads Resolved / Active — unproven / Designed in different governance docs); add `scripts/check_status_consistency.py` as a CI gate so status can never silently drift. Pure anti-slop: removes contradiction, adds no content.

**Phase 1 — The front door.** One rigorous reviewer-facing entry artifact (strongest honest case + evidence ledger + named open problems + "what would change your mind") and the public on-ramp (landing + Useful History, already largely built).

**Phase 2 — The minimal pilot proposal.** Pick the single most testable mechanism; write a concrete minimal real-world pilot — hypothesis, smallest deployment, cost, metrics, falsification. This is what converts "interesting design" into "fundable proposal."

**Phase 3 — Targeted hardening.** Deep review only of the load-bearing spine, prioritized by what the front door and pilot depend on. Not a sweep.

## Status

- Phase 0: in progress.
- Phases 1–3: queued.
