# ANNEX AD — Narrative Attack Surface Hardening (P-011)

**Purpose.** This annex introduces the operative clauses for P-011 (T-011 Narrative Attack Surface). It extends Article VII, the White Paper governance rules, and the annual simulation mandate. Where clauses here conflict with earlier language, this annex governs.

**Status:** PROPOSED. Clauses become operative only when formally accepted into the constitution.

### AD1. Rapid Public Communication Protocol (RPCP)
For any operational event that crosses the public visibility threshold — defined as: affects more than the published population threshold, involves any restriction or modification of access, or generates confirmed external media coverage — a public communication must be published within 4 hours of confirmed event detection.

The 4-hour RPCP communication must follow this structure:
- **What happened** — factual, maximum 2 sentences, no jargon.
- **What the system did in response** — 2 sentences covering the control activated.
- **Current access status** — 1 sentence explicitly stating whether the survival floor is protected.
- **What to expect next** — timeline for full post-mortem publication.

The RPCP does not replace the 7-day post-mortem. It closes the narrative gap between event and accountability record. Pre-authorized publication authority for RPCP must be established before launch — the 4-hour SLA cannot accommodate approval chains. PCRP false-trigger events have a mandatory RPCP template that explicitly states the false trigger was detected, terminated, and logged as expected system behavior.

### AD2. Pre-Committed Failure Communication Doctrine
Before public launch, the system must publish a plain-language document titled 'What Will Go Wrong and Why That Is Acceptable.' The document must explicitly acknowledge the following expected failure categories:
- **PCRP false triggers** — will occur; detection, termination, and logging are the designed response.
- **Oracle disputes** — will occur; conservative defaults protect access while disputes are resolved.
- **Shared Storehouse activations** — will occur during genuine scarcity; the system is designed to manage scarcity, not prevent it.
- **Enforcement errors** — will occur; partitioned wallets, due process, and post-mortems are the designed response.
- **Measurement uncertainty** — is permanent; confidence bands and evidence classes are how the system is honest about it.

For each failure category, the document must explain the containment mechanism and the correction path. Commitment to public disclosure of each failure category is binding — operational failures in these categories that are not published within the RPCP timeline constitute a transparency violation. This doctrine converts future failures from surprise revelations into acknowledged expected events.

### AD3. Citizen-Facing Rights Layer (CFRL)
A document separate from the White Paper and Humane Constitution must be published before launch. Maximum length: one page. Reading level: 8th grade or below. Translated into every language spoken by more than 1% of the affected population. Contains exactly four sections:
- **What you are entitled to** — survival floor, appeal rights, privacy protections.
- **What the system cannot do to you** — cannot remove survival access as punishment; cannot use civic weight to gate dignity; cannot track you without aggregation thresholds.
- **How to challenge a decision** — single-sentence appeal path with named contact.
- **Where to check system health** — link to the Article VII public dashboard with plain-language metric definitions.

The CFRL must include: 'This document is a summary. Your full rights are in the Humane Constitution, which governs in all cases.' The CFRL is governed as a protected specification under P-004: any update that alters what rights are stated or how appeal paths are described is a substantive change requiring full review. The CFRL is not a marketing document and may not be edited for tone or brand without simultaneously updating the substantive content.

### AD4. Adversarial Narrative Simulation (Annex T Extension)
The annual simulation mandate (Annex T) is extended to include at least one adversarial narrative simulation per year. Structure:
- **A hostile framing team** — comprising communications professionals, policy critics, and adversarial specialists, not protocol engineers — constructs the most damaging plausible false narrative about the system.
- **The narrative is published** through simulated channels (structured media environment, not live public channels).
- **The system's communication infrastructure** must respond within one media cycle (4 hours).
- **The simulation measures:** response time vs. RPCP SLA; factual accuracy of the response; estimated reach ratio (response vs. hostile narrative); whether the response required violating the pre-committed failure communication doctrine.
- **Simulation reports are published in full**, including what failed, what required improvisation, and what pre-built templates or authorities were missing.

*A system that passes technical operational simulations but fails narrative simulations is not scale-ready. Simulation reports are public.*

### AD5. Hostile Frame Pre-emption Registry
The system must maintain and publish a document titled 'Common Misunderstandings.' This document lists the top 10 most likely mischaracterizations of the system, with: (a) the accurate factual statement; (b) the specific Article VII data that supports it; (c) the section of the CFRL or White Paper where the clarification appears. Updated quarterly. When a mischaracterization in the registry appears in external media or public discourse, the registry provides the fastest pre-built path to an accurate counter, available to any journalist, researcher, or citizen. The registry is published under 'Common Misunderstandings,' not 'Anticipated Attacks,' to avoid amplifying hostile framings by naming them as threats.

### AD6. White Paper Sync Requirements (P-011 Activation)
Before public launch, the White Paper must be updated to include:
- A section titled 'What will go wrong' summarizing the pre-committed failure communication doctrine (AD2).
- A reference and link to the CFRL (AD3).
- An explicit description of the correction mechanism for each major failure category.
- An honest statement that the system has not been operated at full scale and that pilot evidence governs deployment decisions.

White Paper updates for P-011 activation are governed as Tier 3 operational changes if they only add the above content. Any update that removes or weakens existing commitments is a substantive change requiring full review.

### AD7. Updated Threat/Patch Linkage (Session 2 Complete)

| Threat ID | Patch ID | Status | Annex |
| :--- | :--- | :--- | :--- |
| T-001 | P-001 | ACTIVE | AB |
| T-002 | P-003 | ACTIVE | AB |
| T-004 | P-002 | ACTIVE | AB |
| T-007 | P-004 | ACTIVE | AB |
| T-005 | P-005 | PROPOSED | AC1 |
| T-006 | P-006 | PROPOSED | AC2 |
| T-008 | P-008 | PROPOSED | AC3 |
| T-011 | P-011 | PROPOSED | AD |

*Session 2 hardening complete. Next queue: compound interface tests (Annex T).*

---
