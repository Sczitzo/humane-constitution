# Evidence Ladder

This ladder defines what counts as stronger proof. It prevents "designed," "tested," "active," "working," and "solved" from blurring into each other.

The Claims and Evidence Register remains the canonical public status register. This ladder supplies the upgrade and downgrade rules behind those statuses.

---

## Ladder Levels

| Level | Name | What it means | What it does not mean |
|---|---|---|---|
| 0 | Moral commitment | The project states a value or duty. | The mechanism works. |
| 1 | Designed framing | The project has an organizing theory or collapse-state lens. | Any specific control is proven. |
| 2 | Designed mechanism | A rule, patch, annex, registry, or procedure exists. | It survives incentives, mistakes, or capture. |
| 3 | Internal consistency review | The mechanism has been checked against nearby docs for contradictions. | It works in simulation or practice. |
| 4 | Adversarial paper test | A red team has named abuse routes, false reassurances, and failure criteria. | The control works with real users or institutions. |
| 5 | Simulation / table exercise | The mechanism has been tested with realistic scenarios, numbers, or role-play. | It works under field conditions. |
| 6 | Limited pilot | A reversible, protected pilot has produced public results. | It is ready for scale. |
| 7 | Independent audit | Outside reviewers have checked methods, data, failures, and residual risk. | Permanent safety is guaranteed. |
| 8 | Evidence-backed operation | The control has passed defined tests at the relevant scale and residual risk is updated. | The risk is gone forever. |

---

## Upgrade Rules

A claim may move up only when:

1. the evidence is public or independently inspectable;
2. the test was defined before results were known;
3. failure criteria were stated in advance;
4. adverse results were not relabeled as success;
5. affected groups were included;
6. residual risk was updated after the test;
7. the Claims and Evidence Register, Threat Register, and Pilot Evidence Roadmap were updated together.

---

## Downgrade Rules

A claim must move down when:

- evidence is missing, stale, or contradicted;
- a pilot excludes the people most likely to be harmed;
- implementation depends on an untested upstream prerequisite;
- public language implies deployment proof that does not exist;
- new abuse cases show a plausible workaround;
- a dashboard metric is gamed or methodologically changed without review;
- a legal, technical, or operational assumption fails.

---

## Claim-Type Gates

| Claim type | Minimum level before public strengthening |
|---|---|
| Survival access delivery | Level 7 independent audit after protected pilot. |
| Identity and recovery | Level 7 independent audit with vulnerable-population results. |
| Real-capacity measurement | Level 7 independent audit with physical sampling and oracle disagreement. |
| Service Record safety | Level 7 independent audit after non-civic misuse red team. |
| Commons Return / Universal Stake / public-rail funding | Level 6 simulation plus Level 7 fiscal/legal review before scale claims. |
| Anti-rent/legal-wrapper control | Level 7 legal red-team review. |
| Founding legitimacy | Level 7 independent civil-society review, Founding Consent and Civil-Society Review Evidence Test Package, and exit rehearsal. |
| Implementation drift control | Level 7 implementation audit and startup-refusal drill. |

---

## Evidence Packet Minimum

Every evidence packet should include:

- hypothesis;
- test population or modeled actors;
- outside evidence basis;
- method;
- failure criteria;
- adverse findings;
- residual risk;
- affected documents to update;
- public summary in plain language.

---

## Test Package Template (P-075)

Every evidence test package in this corpus follows one structure. A package supplies domain substance; this template supplies the skeleton. The superseded Demurrage package tombstone is exempt.

Required elements, in order of function (heading wording may vary; substance may not):

1. **Claim under test / honest claim boundary** — the exact claim the package gates, its current status in the status vocabulary, and what may not be claimed until the package passes.
2. **Abuse model or threat basis** — who attacks the mechanism, how, and which T-, P-, or ACL- identifiers the package serves.
3. **Required tests with pre-stated failure criteria** — each test names its method, the actors or population modeled, and a failure criterion written in advance, concrete enough that an adverse result cannot be relabeled as success. The criteria bind the package author as much as the operator. A test without a published failure criterion is not a test; it is a demonstration.
4. **Adverse-finding protocol** — an adverse finding triggers this ladder's downgrade rules: the affected claim moves down, residual risk is rewritten, and no retest quietly replaces a failed test without publishing the failure.
5. **Affected-documents update order** — on any result, the package's own residual-risk statement updates first, then the remaining documents in the order prescribed by the Claims and Evidence Register's Evidence Update and Claim Downgrade Protocol; they move together.
6. **Residual risk** — what the package cannot prove even when every test passes.

Each test's evidence packet follows the Evidence Packet Minimum above; this template governs the package document, the packet minimum governs each packet.

**Drift rule.** A package defines only its domain-specific claims, tests, thresholds, and residual risks, and cites this template for everything structural. Where a package restates a structural rule and the restatement diverges, this template governs. A new package may not introduce a new structural pattern without a framework-first justification under the Acceptance Protocol's anti-accretion rule (P-073). A package missing a required element, or whose failure criteria are too vague to be falsified, does not conform to this template and gates nothing: no claim may move up the ladder on the strength of a non-conforming package (see Forbidden Status Moves).

---

## Forbidden Status Moves

Do not move:

- from designed mechanism directly to evidence-backed;
- from active-unproven to resolved without pilot or audit evidence;
- from simulation to deployment proof;
- from no observed abuse to "abuse impossible";
- from stakeholder support to consent;
- from cryptographic design to governance legitimacy.

---

## Plain-Language Rule

The honest public sentence should be:

> "This part is at Level X because it has [evidence], and it is not yet at Level Y because it still lacks [missing proof]."

If that sentence cannot be written clearly, the claim status is probably too strong.
