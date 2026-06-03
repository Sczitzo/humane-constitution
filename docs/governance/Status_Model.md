# Status Model

> **Status:** `Active — unproven` (Axis 1) · `Pre-ratification` (Axis 2)
> *(This document uses its own convention. It is the incorporated, in-use definition of status — and, like everything here, it has not been ratified at a founding.)*

**Purpose.** The word *active* was quietly doing two jobs across the corpus — "written into the design" and "accepted and in force." Those are different claims. Conflating them made documents look like they contradicted each other and let the project look like it claimed more than it had. This document separates the two, says which file is authoritative for each, gives one way to write a status anywhere, and is enforced by `scripts/check_status_consistency.py`.

---

## The two axes

Every threat (`T-NNN`), patch (`P-NNN`), and instrument carries **two** statuses at once. They are **independent** — neither can be reached by advancing the other. A thing can be fully incorporated and evidence-backed and still not be ratified. That is the normal state of this entire project today.

### Axis 1 — Design & Evidence

*How mature is this as a design, and how much real-world evidence backs it?* The existing six-term vocabulary — no synonyms:

| Term | Meaning |
|---|---|
| `Proposed` | Suggested, not yet written into the corpus. |
| `Designed` | Specified in the corpus, not yet the live design response. |
| `Active — unproven` | Incorporated as the live design response; **no field evidence**. |
| `Partly tested` | Some pilot/analogue evidence; not sufficient. |
| `Evidence-backed` | Sufficient external evidence. |
| `Resolved` | Evidence-backed controls **plus** documented residual risk. |

This axis advances (or regresses) as design and evidence change. The informal `Patch_Log` tokens `ACTIVE` and `PROPOSED` are **Axis-1 shorthand**: `ACTIVE` ≡ `Active — unproven` unless a higher tier is explicitly stated; `PROPOSED` ≡ `Proposed`.

**Authority:** `Patch_Log.md` for a patch; `Threat_Register.md` for a threat; `Claims_Evidence_Register.md` for an evidence claim. Every other document **references** that status; it does not restate it in a form that can drift.

### Axis 2 — Founding-ratification

*Has this been accepted into force through the Formal Acceptance Protocol (FAP) at a legitimate founding?* Two values only:

| Term | Meaning |
|---|---|
| `Pre-ratification` | The default. The FAP has not run; nothing is in force. |
| `FAP-ratified` | Accepted into force through the FAP at a founding whose legitimacy is on record. |

**Today every instrument, patch, and threat-control is `Pre-ratification`** — no founding has occurred (founding legitimacy is itself unresolved; see the Hardening Queue). Annex boilerplate such as *"governs only as a PROPOSED patch until it reaches ACTIVE status through the Formal Acceptance Protocol"* is an **Axis-2** statement and is read as ratification status, not design status.

**Authority:** the founding record (Founding Order / Founding Legitimacy Dossier). Until it records a ratification, the answer is `Pre-ratification` for everything.

---

## The two axes are orthogonal

This is the point a careful reader will test, so it is stated flatly: **evidence does not produce ratification, and ratification does not produce evidence.** A patch can climb all the way to `Evidence-backed` on Axis 1 and still be `Pre-ratification` on Axis 2. A founding could (unwisely) ratify something that is only `Designed`. The axes move on different tracks for different reasons:

- Axis 1 moves through **work and evidence** — specification, incorporation, pilots, external validation.
- Axis 2 moves **only at a founding, only through the FAP**, and only once — it cannot be reached by accumulating Axis-1 evidence.

Corollary, and the honesty-critical rule: `Resolved` (Axis 1) does **not** mean "safe" or "in force." It means evidence-backed *with documented residual risk* — and, until founding, still `Pre-ratification`.

---

## How to write a status (the convention)

Anywhere a status appears, write **both axes**, Axis 1 first:

```
Status: <Axis-1 term> (Axis 1) · <Axis-2 term> (Axis 2)
```

A document that is not the authority for a status should **link** to the authority rather than restate it, e.g. *"Status: see Patch Log (P-021)."* If it does state the value inline, it must match the authority — the gate enforces this.

### Worked examples (illustrative; verify against the authority)

| ID | Axis 1 (Design & Evidence) | Axis 2 (Ratification) | Reading |
|---|---|---|---|
| P-021 | `Active — unproven` | `Pre-ratification` | Incorporated as the live anti-rent design; no field evidence; not yet accepted at a founding. |
| P-008 | `Proposed` | `Pre-ratification` | A suggested mitigation, not yet incorporated; the operative control for its threat is a different, incorporated patch. |
| T-002 | `Active — unproven` (threat-control) | `Pre-ratification` | The identity-stack control is incorporated but unproven; a specific calibration sub-item may still be `Proposed` and is labelled separately. |

---

## Edge cases

- **Tier-1 invariants** are not patches and do not carry an Axis-1 maturity; they carry Axis 2 like everything else (`Pre-ratification` until founding), plus their own amendment tier.
- **Sub-items** (a specific calibration, sub-clause, or "ambitious" extension inside a patch) carry their own Axis-1 status and must be labelled separately from the parent — do not let a sub-item's `Proposed` and the parent's `Active — unproven` collide on one line.
- **Reserved/never-assigned and draft IDs** (e.g. P-007/P-010/P-028 reserved; the P-063 draft family) are out of scope for the gate.

---

## Rules

1. **One authority per axis.** Other documents reference it; they do not assert a conflicting value.
2. **No ID may carry two different Axis-1 statuses** across the corpus. `scripts/check_status_consistency.py` fails the build if it does.
3. **No `FAP-ratified` before founding.** Asserting ratification while the founding record shows none is a status violation (gate-enforced).
4. **Shorthand is allowed but defined.** `ACTIVE`/`PROPOSED` are permitted only as the Axis-1 shorthand defined above.

## Migration (in progress)

1. Read each existing `PROPOSED`/`ACTIVE` label in context; tag it Axis-1 or Axis-2.
2. Normalize Axis-1 labels to the six-term vocabulary; reconcile cross-file disagreements to the authoritative source.
3. Relabel Axis-2 ("until FAP") language explicitly as ratification status.
4. Extend `check_status_consistency.py` to flag any `FAP-ratified` assertion while founding is `Pre-ratification`.
