# Corpus Contracts

Rules for adding, validating, and maintaining corpus documents.

## Adding new docs

- `docs/annexes/ANNEX_*.md` — auto-discovered via glob. Also add a row to `docs/annexes/INDEX.md`.
- Everything else (`docs/governance/*.md`, etc.) — must be registered in **three places** in `scripts/export_corpus.py`: the `CORE_DOCS` tuple, the `section_for()` list, and `FEATURED_PATHS` if it should appear on the home screen.

Section → nav view mapping lives in `section_for()` in the export script.

## Validator gotcha

`validate_corpus.py` parses markdown links even inside code fences. Avoid bare Markdown-link examples in docs outside `docs/` (e.g. plan files) — use inline code instead, or the validator will try to resolve the path from the wrong directory.

## Status vocabulary

All governance docs (Threat_Register, Patch_Log, Hardening_Queue, Claims_Evidence_Register) use this exact vocabulary — no synonyms:

| Status | Meaning |
|---|---|
| `Proposed` | Suggested but not formally incorporated |
| `Designed` | Specified in corpus, not yet active |
| `Active — unproven` | Incorporated, no field evidence |
| `Partly tested` | Some pilot/analogue evidence, not sufficient |
| `Evidence-backed` | Sufficient external evidence |
| `Resolved` | Evidence-backed controls + documented residual risk |

Never use: Closed, Addressed, Partial, Complete, Open (as a status).

## Annex opening block standard

Every annex must have this block immediately after the H1 title:

```markdown
> **At a glance**
> | | |
> |---|---|
> | **Purpose** | [plain-language purpose] |
> | **Who it protects** | [whose dignity, access, freedom, or accountability] |
> | **Failure risk** | [abuse, capture, exclusion, or failure path] |
> | **Evidence status** | [Designed / Active — unproven / Partly tested / Evidence-backed] |
> | **Linked risks** | [T-NNN, P-NNN, or named risks] |
```

## Document model

Every threat (T-NNN) has a patch (P-NNN) and an annex (ANNEX_XX.md) with the resulting constitutional text.

- Master linkage table: `ANNEX_AH.md § AH8`
- Human-readable entry point: `docs/governance/Provenance_Map.md`

**Annex naming:** "AH2" is not a file — it refers to sections AH2.1–AH2.4 inside `ANNEX_AH.md` added by P-020. "(P-020 / Annex AH2)" means: patch P-020, clauses in `ANNEX_AH.md` under the AH2 subsections.
