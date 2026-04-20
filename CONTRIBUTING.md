# Contributing to The Humane Constitution

The Humane Constitution is a constitutional systems design that separates survival, markets, and civic governance into structurally independent, non-convertible lanes. It is developed using adversarial red-teaming — every threat has a mechanism, a risk score, and a patch with a documented residual risk.

This is an open design project. The design is not finished. The most valuable thing you can do is find what we missed.

---

## Start here

**If you're new:** Read [`White_Paper.md`](./White_Paper.md) first (14 pages, general audience). Then [`Citizen_Facing_Rights_Layer.md`](./Citizen_Facing_Rights_Layer.md) for the one-page rights summary.

**If you want to stress-test:** Read [`Threat_Register.md`](./Threat_Register.md). Every adversarial failure mode we've found is documented there with its risk score. The open problems are explicitly marked. If you find one we haven't, that's a contribution.

**If you want the operative language:** Read [`Master_Protocol.md`](./Master_Protocol.md).

**If you want to understand the hardening methodology:** Read [`Patch_Log.md`](./Patch_Log.md) — 26 patches, each with the threat it addresses, the new risk it introduces, and its residual risk.

---

## Ways to contribute

### 1. Find a threat we haven't modeled (most valuable)

The threat register has 25 identified threats. There are more. If you can identify an adversarial failure mode — a way a motivated actor could exploit, corrupt, or collapse the system — open an Issue with:

- **Mechanism:** how the attack works, step by step
- **Impact:** what fails, and for whom
- **Detection difficulty:** how easy is it to see in real time?
- **Suggested mitigation direction** (optional — identifying the threat is enough)

Use the threat register format if you can: `I × L × (6 - D)` risk score (Impact 1–5, Likelihood 1–5, Detectability 1–5).

### 2. Challenge an existing patch

Every patch in [`Patch_Log.md`](./Patch_Log.md) has a residual risk statement — an honest acknowledgment of what the patch doesn't fully solve. If you think a residual risk is understated, or if you can find a way around a proposed mitigation, open an Issue with the patch ID and your specific challenge.

### 3. Real-world analogues and evidence

If you know of a real-world system, historical case, natural experiment, or academic literature directly relevant to any design choice — open an Issue with the reference and which section it applies to. We especially need:

- Evidence on demurrage-based currency systems in practice
- Evidence on unconditional transfer programs (UBI pilots, cash transfer programs)
- Evidence on identity systems in populations without documentation
- Constitutional designs that have successfully resisted democratic backsliding
- Measurement failures in supply and demand oracle systems

### 4. Founding coalition decisions

Several annexes contain explicit `[FOUNDING COMMITMENT]` placeholders — numerical parameters that must be set before deployment, requiring pilot data and coalition deliberation. If you have expertise in setting these kinds of thresholds (e.g., error tolerance standards, deployment window design), your input on the methodology is welcome via Issues or Discussions.

### 5. Plain-language and accessibility

The White Paper is written for a general audience. The Citizen-Facing Rights Layer is written for an 8th-grade reading level. If either is unclear, uses unnecessary jargon, or would be inaccessible to someone without a policy background, open an Issue with the specific passage and a suggested rewrite.

### 6. Translation

If you can translate the White Paper or Citizen-Facing Rights Layer into another language, open an Issue to coordinate. Priority languages are those spoken by populations most likely to be affected by survival-floor policy failures.

---

## What is not accepted

- **Wholesale redesign proposals** that abandon the LC/EC/DW/CR instrument separation — this is the foundational architectural constraint, not a negotiable parameter. Proposals that collapse the separation will be declined.
- **Changes that weaken existing protections** without replacing them with demonstrably stronger ones.
- **Philosophical objections without mechanism analysis.** "This won't work because human nature" is not a contribution. "Here is the specific incentive structure that produces the failure" is.
- **Simplifications that break existing constraints.** The complexity is load-bearing.

---

## The hardening methodology

Every threat follows the same structure:

```
T-XXX — [Threat Name]
- Layer: which article, legacy pillar, or mechanism is targeted
- Severity: Critical / High / Med-High / Medium
- Risk Score: I × L × (6 - D)
- Mechanism: how the attack works
- Impact: what fails
- Detection: difficulty score (1 = obvious, 5 = invisible)
- Mitigation: patch reference or direction
- Residual risk: what the patch doesn't solve
- Compound linkages: interactions with other threats
```

New threats should follow this format. New patches should name the threat they address and the new risk they introduce — every mitigation creates new attack surface.

---

## Review process

Substantive contributions are reviewed against:

1. **Consistency** — does this conflict with existing active patches or constitutional invariants?
2. **Incentive analysis** — what behavior does this create? Who benefits and who is harmed?
3. **Bad actor stress test** — how would a motivated, well-resourced actor exploit this?
4. **Integration notes** — what does this affect across the current Founding Order + Articles I-VII architecture?

---

## Discussion

Use **GitHub Discussions** for open-ended questions, design explorations, and collaborative thinking that isn't a specific bug or proposal. Use **Issues** for specific challenges, proposed patches, or real-world evidence submissions.

---

## Code of conduct

Technical disagreement is welcome. Personal attack is not. This project is about the design, not the designers. See [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

---

## Citation

If you use this work in research, see [`CITATION.cff`](./CITATION.cff) for the preferred citation format. The protocol is released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — you may adapt and build on it for any purpose with attribution.
