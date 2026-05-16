# Landing Page UI/UX Review

## Executive Summary

- Overall first-impression rating: 7/10
- Trust/credibility rating: 6/10
- Clarity rating: 7/10
- Conversion effectiveness rating: 6/10
- Accessibility confidence rating: 7/10

Bottom line: The landing page is visually polished and already communicates the core idea better than most constitutional-design projects: separate basic needs, markets, and public power so wealth cannot become control. Its strongest material is the concrete problem/response section. The main weakness is that a public visitor sees a highly cinematic, abstract, confident presentation before seeing enough humility, status context, human stakes, and verification links. The next iteration should make the page feel less like a premium app intro and more like a public civic draft: clear status, plain-language stakes, visible evidence/audit paths, simpler motion, and a more direct route into the right reading path.

## Top 10 Highest-Value Improvements

| Rank | Issue | Area | Severity | Expected impact | Effort | Recommended fix |
|---:|---|---|---|---|---|---|
| 1 | No first-screen status boundary | Credibility | Critical | Prevents visitors from mistaking a public draft/prototype for active governance or proven system | Low | Add a visible hero status strip: “Public working draft · Reader prototype · Not active governance · No pilot evidence yet.” |
| 2 | Hero is clear but too abstract | Messaging | High | Makes first 5 seconds more humane and understandable to non-experts | Low | Replace or support the headline with a plain human-stakes line such as “What if basic needs could never be used as leverage?” |
| 3 | Primary CTA scrolls to a late section | Conversion | High | Reduces friction for first-time visitors ready to start immediately | Medium | Add “Start First Read” as a direct hero action; keep “Compare reading paths” as the scroll action. |
| 4 | Reading paths are too late in the page | Journey / Layout | High | Helps visitors choose a route before losing context | Medium | Move reading paths immediately after the hero, or add a compact path chooser preview above the problem/response section. |
| 5 | Claims sound more settled than the evidence status | Credibility | High | Builds public legitimacy and avoids overconfident/utopian framing | Low | Reframe “Constitutional response” copy as “The draft proposes…” or “Designed safeguard…” |
| 6 | Missing provenance and verification links | Trust | High | Gives skeptics and reviewers obvious ways to verify claims | Medium | Add links to Public Readiness Guide, Claims & Evidence Register, GitHub/source, audit trail, version, and challenge process. |
| 7 | Visual tone feels cinematic/technical | Visual | Medium | Improves seriousness and civic trust | Medium | Soften grain, glow, orbs, and marquee motion; favor civic calm over theatrical prestige. |
| 8 | Contrast is too muted in supporting text | Accessibility / Scanability | Medium | Improves readability, mobile scanning, and WCAG confidence | Low | Raise explanatory text opacity; reserve very faint text for nonessential captions only. |
| 9 | Mobile still shows non-primary timeline before path buttons | Mobile UX | Medium | Makes mobile path selection faster and less confusing | Low | Hide the SVG timeline on mobile or move it after the semantic path buttons. |
| 10 | No strong final CTA | Conversion | Medium | Captures visitors after they understand the premise | Low | Add a closing band with “Start First Read,” “Start with objections,” and “Browse full library.” |

## First 5 Seconds Review

What a new visitor likely understands immediately:

- This is a serious, designed system around separating “survival, markets, and civic power.”
- The Humane Constitution is open-source and related to constitutional design.
- There is a reader experience and guided reading paths.

What might confuse them:

- “Humane Constitution” is not immediately framed as a public working draft, prototype reader, civic proposal, or governance corpus.
- The headline asks a systems-design question before naming ordinary harms like rent, medical debt, job loss, or bought influence.
- Terms like “Open Constitutional Design,” “Oracle-Verified,” “Amendment-Locked,” “Flow,” “Essential Access,” and “Voice” appear before enough plain-language grounding.
- The page feels confident, but does not immediately say what is unproven.

What emotional impression the page creates:

- Polished, serious, ambitious, and technically sophisticated.
- Also somewhat cinematic and abstract. The dark/gold visual language, glow, grain, marquee, and animated branching timeline can read as high-drama systems fiction rather than public civic deliberation.

Trust signals present:

- Open-source framing.
- Public audit trail language.
- 90+ document corpus.
- Threat/patch/problem framing.
- Concrete public harms in the problem/response cards.
- Reading paths for skeptics and implementers.

Trust signals missing:

- Draft/prototype/not-active-governance status in the hero.
- Link to GitHub/source.
- Link to Claims & Evidence Register.
- Link to Public Readiness Guide.
- Version/date/status label.
- “What this is / is not” summary.
- “How to challenge or contribute” path.

## Audience Fit

### Non-Technical Public Visitor

What works:

- The problem examples are concrete: rent, hospital bills, donations, inheritance, job loss, emergency powers.
- The subheadline explains the main idea in mostly plain language.
- “First Read” provides a likely starting path.

What fails:

- The hero is still abstract.
- The page introduces technical labels early.
- “Open Full Reader” sounds like software rather than a public invitation.
- The page does not immediately say “not a live government” or “public draft.”

Recommended improvement:

- Add a plain status line and a human-stakes headline/subheadline. Rename the public CTA to “Start with the plain-language overview” or “Start First Read.”

### Technical AI/Governance Reader

What works:

- The five-instrument diagram, architecture path, and implementation path signal depth.
- The corpus size and audit/trail language suggest there is real material to inspect.
- The existing reader likely supports deep technical review once entered.

What fails:

- “Implementer” and “Architecture” overlap.
- Technical visitors do not get an immediate link to specs, integrity model, source, or validation checks.

Recommended improvement:

- Add small audience tags or route descriptions: “For builders: specifications and pilot prerequisites” and “For technical reviewers: integrity model and drift checks.”

### Policy/Legal Reviewer

What works:

- Threats, patches, founding order, governance, and pilot paths suggest legal/governance rigor.
- The problem/response format maps to policy concerns.

What fails:

- The page does not expose legitimacy status or current governance status early.
- “Pilot Ready” is risky because the broader documents say pilots remain blocked by missing legitimacy and evidence artifacts.
- No obvious “review legitimacy and institutions” route.

Recommended improvement:

- Rename “Pilot Ready” to “Pilot Evidence Roadmap” or “Readiness Gaps.” Add a path label for “Policy reviewers: legitimacy, institutions, and evidence gates.”

### Potential Contributor

What works:

- Open-source and public audit trail language invites participation implicitly.
- Governance deep dive and hardening material may be useful after discovery.

What fails:

- There is no contributor path, issue/challenge process, open problems link, or “where help is needed.”

Recommended improvement:

- Add a contributor CTA linked to Open Problems, Hardening Queue, Patch Log, Claims & Evidence, or a contribution guide.

### Skeptic

What works:

- The Skeptic path exists and appears substantively strong.
- Threat and evidence-oriented language can increase credibility.
- Problem/response cards expose failure modes rather than only ideals.

What fails:

- The landing page itself initially feels polished and confident before it shows proof gaps.
- Verification links are not visible from the hero.

Recommended improvement:

- Surface a “Start with objections” CTA near the hero and link it to the skeptic path or Readiness Guide.

## Messaging and Copy

Strongest existing copy:

- “The Humane Constitution is an open-source design for a society where basic needs, markets, and public power are separated so wealth cannot quietly become control.”
- “Real problems. Constitutional responses.”
- “Rent that prices you out.”
- “One bill wipes you out.”
- “Your vote vs. their donation.”
- “Lose your job, lose everything.”

Weakest existing copy:

- “Open Constitutional Design” is accurate but abstract.
- “What if survival, markets, and civic power stayed separate by design?” is elegant but less direct than the stakes.
- “Open Full Reader” sounds like an app action rather than a civic reading invitation.
- “Pilot Ready” implies a readiness level the project does not currently have.
- “Oracle-Verified” and “Amendment-Locked” sound operational or insider-coded before context.
- “Five interlocking instruments. One coherent system.” sounds polished but not immediately explanatory.

Jargon to reduce or explain:

- Corpus
- Oracle-verified
- Amendment-locked
- Anti-rentier
- Flow
- Essential Access
- Voice
- Service Record
- Shared Storehouse
- Constitutional response
- Pilot ready

Suggested targeted copy replacements:

- Hero headline:
  - Current direction: “What if survival, markets, and civic power stayed separate by design?”
  - Option A: “What if basic needs could never be used as leverage?”
  - Option B: “A public draft for keeping survival, money, and political power apart.”

- Hero subheadline:
  - “The Humane Constitution is a public working draft for a society where food, housing, healthcare, money, and political influence are kept in separate systems, so wealth cannot quietly become control over people’s lives.”

- Hero status strip:
  - “Public working draft · Reader prototype · Not active governance · No pilot evidence yet”

- Primary CTAs:
  - “Start First Read”
  - “Start with objections”
  - “Browse the full library”
  - “Compare reading paths”

- Threat section intro:
  - Eyebrow: “Problems this design tries to prevent”
  - Heading: “Every pressure point needs a rule.”
  - Support: “Rent, medical debt, bought influence, inherited power, job loss, and emergency powers are each answered directly.”

- Threat response framing:
  - Replace “Housing is part of Essential Access…” with “The draft treats housing as Essential Access: a protected floor that cannot be converted into financial leverage.”
  - Replace “Healthcare sits beneath the market…” with “The draft places essential healthcare outside ordinary pricing, so inability to pay cannot remove access to care.”

- Instrument section:
  - Eyebrow: “The core mechanism”
  - Heading: “Five separate tools keep one kind of power from taking over the rest.”

- Reading paths intro:
  - “Choose the route that fits your question. Each path opens a short sequence of documents with a clear starting point.”

## Visual Hierarchy and Layout

Hero section:

- Strong visual polish and clear focal point.
- The logo, headline, and CTAs are well ordered.
- The hero needs more concrete status and stakes above the fold.
- The H1 is large and memorable, but it carries a systems concept rather than a human problem.

Problem/response section:

- This is the strongest public-facing section.
- It should appear earlier or be previewed in the hero.
- Accordion structure is useful, but closed cards hide the most persuasive evidence unless visitors interact.
- Response copy should consistently indicate “draft/proposed design,” not achieved fact.

Instrument diagram section:

- Useful for technical orientation.
- Too early for some visitors if they have not yet chosen a path.
- The diagram is dense and may be small on mobile.
- The “definition” interaction is useful, but document-link behavior inside the diagram is not fully productive from the landing context.

Reading path section:

- The path list is valuable and now supports accessibility better.
- It currently arrives too late for a page whose primary CTA is “Choose a Reading Path.”
- The SVG timeline is memorable but competes with the simpler path cards.
- Mobile should prioritize the path buttons over the visual timeline.

Final CTA or lack of one:

- The page ends with path cards plus a skip link.
- There is no closing “Ready to begin?” moment.
- Add a final CTA band after paths or after the problem/instrument sequence.

Mobile layout:

- CTA stacking is good.
- Path buttons are a strong mobile direction.
- The non-primary SVG timeline should be hidden or moved below the path buttons on small screens.
- Hero logo/headline may still consume too much vertical space before concrete value appears.

## Conversion Path

Primary action visitors should take:

- For most public visitors: start a guided first read.
- For skeptical or expert visitors: start with objections/evidence or browse the full reader.

Is that action obvious?

- Partly. “Choose a Reading Path” is prominent, but it scrolls rather than starts. “Open Full Reader” is clear but app-centric.

Is there a good path for first-time visitors?

- Yes, but “First Read” should be framed more plainly as “Start Here” or “Plain-language first read.”

Is there a good path for experts?

- Yes, but fragmented. “Implementer,” “Architecture,” “Founding Order,” “Governance,” and “Pilot Ready” need clearer audience labels.

Where CTAs should be added, removed, or renamed:

- Add hero CTA: “Start First Read.”
- Rename “Open Full Reader” to “Browse Full Library.”
- Add “Start with objections” near hero or path section.
- Add final CTA band with “Start First Read,” “Audit the Framework,” and “Browse Full Library.”
- Rename “Pilot Ready” to “Pilot Evidence Roadmap” or “Readiness Gaps.”
- Consider “Compare Reading Paths” for the scroll-to-paths action.

## Accessibility and Inclusive UX

Specific issues and fixes:

- Add a `<main id="main-content">` landmark and a visible-on-focus skip link using the existing `.skip-link` styles.
- Use semantic `<section aria-labelledby>` regions for hero, problems, instruments, and paths.
- Decide whether the SVG timeline is decorative or interactive. If decorative, remove pointer interactions and rely on path buttons. If interactive, expose real accessible controls.
- Raise contrast on hero subhead, path subcopy, path descriptions, diagram hint, and skip button.
- Add landing-specific focus styles for hero CTAs, floating nav buttons, and skip/open controls.
- Bypass the 600ms exit delay when `prefers-reduced-motion` is active.
- Ensure mobile users see the semantic path list before decorative timeline visuals.
- Add e2e coverage for keyboard tab order, Enter/Space activation, mobile path selection, accordion `aria-expanded`, and reduced-motion behavior.

Positive accessibility notes:

- Threat accordions use real buttons, `aria-expanded`, `aria-controls`, stable IDs, and labeled regions.
- Reading path choices are real buttons with descriptive labels.
- Reduced-motion support exists for major animation systems.

## Credibility and Legitimacy

The page should add:

- Version / draft status: yes. This is the highest-priority legitimacy improvement.
- Audit trail link: yes. “Public Audit Trail” appears in the marquee but should be clickable and visible.
- GitHub/source link: yes. Open-source claims should be immediately verifiable.
- “How this is governed” link: yes, especially for policy/legal reviewers.
- “What this is / is not” section: yes. Keep it short and above or near the paths.
- Contributor path: yes, especially for evidence gaps, hardening, and open problems.
- Disclaimer about prototype/governance status: yes. Use plain language, not legalese.

Suggested legitimacy block:

> This is a public working draft and reader prototype. It is not active governance, not a deployed system, and not yet supported by pilot evidence. The project is published for review, criticism, testing, and revision.

Credibility risks to fix:

- “Pilot Ready” label.
- Operational-sounding marquee claims.
- Response copy that reads like guarantees.
- Metadata that says “Desktop Interface” rather than public draft/prototype.

## Performance and Motion

Whether motion supports understanding:

- The timeline motion supports the metaphor of branching reading paths.
- Hero word-in animation creates a strong first impression.

Whether motion distracts:

- The combination of word-in, glow, parallax orbs, grain shimmer, marquee, reveal animation, SVG pulses, and hover cards feels busy for a civic page.
- The moving ticker is low-value and can make the page feel more product-marketing than public governance.

Accessibility or performance risks:

- Even with reduced-motion support, default motion is heavy.
- First-time users load the reader application context, corpus path machinery, diagram code, and landing animation code together.
- Build output previously showed a large main bundle warning.
- Google Fonts load multiple font families and weights.

What should be reduced or delayed:

- Remove or soften grain shimmer.
- Pause or remove the marquee animation.
- Delay or simplify the SVG timeline on mobile.
- Lazy-load reader-only modules after the landing decision point.
- Load fewer font weights or self-host/subset fonts if public performance matters.

## Recommended New Section Order

Recommended order for public sharing:

1. Hero: plain human-stakes headline, draft/prototype status, two or three concrete trust facts, primary CTAs.
2. Reading paths: Start Here, Start with Objections, Browse Library, plus audience-specific routes.
3. Problems this design tries to prevent: rent, medical debt, bought influence, inherited power, job loss, emergency powers.
4. Core mechanism: five separate tools and why separation matters.
5. Status and evidence: what exists, what is unproven, what must be tested.
6. Verification/provenance: audit trail, GitHub/source, claims register, public readiness guide.
7. Final CTA: start, audit, contribute.

If preserving the current visual story, at least move a compact reading-path chooser immediately below the hero and reduce the 160px transition spacer.

## Implementation Plan

### Fix Now

1. Add hero status strip
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: copy / credibility
   - Estimated risk: low
   - Acceptance criteria: first viewport clearly says public draft, reader prototype, not active governance, no pilot evidence yet.

2. Replace or support the hero headline with human-stakes language
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: copy
   - Estimated risk: low
   - Acceptance criteria: non-expert visitor can explain the problem in one sentence after 5 seconds.

3. Add direct hero CTA for first-time visitors
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: conversion
   - Estimated risk: medium
   - Acceptance criteria: “Start First Read” starts the first-time path without requiring a scroll-only intermediate step.

4. Rename risky or app-centric labels
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: copy
   - Estimated risk: low
   - Acceptance criteria: “Pilot Ready” no longer implies readiness; “Open Full Reader” becomes public-facing language.

5. Raise contrast on important supporting copy
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: accessibility / visual
   - Estimated risk: low
   - Acceptance criteria: hero subhead, path descriptions, diagram hint, and skip CTA meet or approach WCAG AA contrast.

6. Add landmarks and skip link
   - Files likely affected: `app/src/components/LandingPage.tsx`, possibly `app/src/index.css`
   - Change type: accessibility
   - Estimated risk: low
   - Acceptance criteria: landing page has a main landmark and keyboard users can skip to main content.

### Improve Before Public Release

1. Add provenance links
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: content / credibility
   - Estimated risk: medium
   - Acceptance criteria: links exist for GitHub/source, Public Readiness Guide, Claims & Evidence Register, audit trail, and version/status.

2. Move or preview reading paths earlier
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: layout / conversion
   - Estimated risk: medium
   - Acceptance criteria: visitors can choose a route within one scroll from the hero.

3. Add “What this is / is not” block
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: content / credibility
   - Estimated risk: low
   - Acceptance criteria: page explicitly distinguishes draft, prototype, pilot evidence, active governance, and design intent.

4. Add final CTA band
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: conversion / layout
   - Estimated risk: low
   - Acceptance criteria: final section offers start, audit, and browse actions.

5. Reduce motion intensity
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: motion / performance / visual
   - Estimated risk: medium
   - Acceptance criteria: page still feels alive, but grain/marquee/glow no longer compete with reading.

6. Update metadata
   - File likely affected: `app/index.html`
   - Change type: SEO / credibility
   - Estimated risk: low
   - Acceptance criteria: title and description say public draft/prototype, not “Desktop Interface.”

7. Add inclusive interaction tests
   - File likely affected: `app/tests/e2e/landing-flow.spec.ts`
   - Change type: accessibility / tests
   - Estimated risk: low
   - Acceptance criteria: tests cover keyboard path selection, accordion ARIA state, mobile path selection, and reduced motion.

### Nice to Have

1. Add contributor path
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: conversion / content
   - Estimated risk: medium
   - Acceptance criteria: contributors can find evidence gaps, open problems, patch log, and source contribution route.

2. Move landing CSS out of inline component
   - Files likely affected: `app/src/components/LandingPage.tsx`, `app/src/index.css` or a new stylesheet
   - Change type: maintainability
   - Estimated risk: medium
   - Acceptance criteria: landing styles are easier to audit without changing behavior.

3. Lazy-load reader-only modules
   - Files likely affected: `app/src/App.tsx`, possibly route/component boundaries
   - Change type: performance
   - Estimated risk: high
   - Acceptance criteria: first-visit landing bundle is smaller and reader still loads reliably after CTA.

4. Add lightweight public footer
   - File likely affected: `app/src/components/LandingPage.tsx`
   - Change type: credibility / navigation
   - Estimated risk: low
   - Acceptance criteria: footer includes status, source, license, challenge path, and key evidence links.

## Do Not Change Yet

- Keep the core separation thesis; it is strong.
- Keep the problem/response section; it is the most humane and persuasive part.
- Keep guided reading paths; they are the right conversion model.
- Keep a distinct visual identity; just reduce theatrical intensity.
- Keep the skeptic path and evidence-first route.
- Keep reduced-motion support.
- Keep the threat accordion semantics.
- Keep the path button fallback.
- Do not remove the full reader option; expert users need direct access.

## Open Questions for Project Owner

1. What is the exact public status label you want visitors to see: “public working draft,” “prototype,” “constitutional design,” “research corpus,” or something else?
2. Should the primary hero action start the first-time reading path directly, or should it always show the path chooser first?
3. Is the landing page meant to be a permanent public orientation page, or only a first-run intro before the reader?
4. Which verification links should be canonical: GitHub repository, Claims & Evidence Register, Public Readiness Guide, Patch Log, or another audit page?
5. Do you want to invite contributors publicly now, or keep contribution paths limited until the corpus/status framing is more stable?
6. What tone should dominate: civic public draft, technical governance spec, moral/philosophical charter, or reader app?
