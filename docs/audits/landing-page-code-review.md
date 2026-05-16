# Landing Page Code Review

## Scope

Reviewed the current first-visit landing experience for the Humane Constitution reader app. The app is a Vite + React + Tailwind project, not a Next.js app. The landing page entry point is `app/src/components/LandingPage.tsx`, conditionally rendered by `app/src/App.tsx` before the reader shell.

No source files were modified.

## Files Reviewed

- `app/src/App.tsx` - landing/reader routing, first-visit state, path handoff.
- `app/src/components/LandingPage.tsx` - landing page content, layout, inline CSS, animation, CTAs, reading-path timeline.
- `app/src/components/diagrams/V001_FiveToolSeparation.tsx` - embedded landing diagram.
- `app/src/components/Layout.tsx` - post-landing reader shell context.
- `app/src/index.css` - global theme, focus, reader styles.
- `app/index.html` - document title, viewport, favicon, fonts, metadata.
- `app/package.json` - scripts and dependency warnings.
- `app/tests/e2e/landing-flow.spec.ts` - landing flow coverage.

## Build / Lint / Test Results

- `npm --prefix app run build`: passed.
  - Warning: `app/package.json` defines `vitest` twice in `devDependencies`.
  - Warning: Vite reports a large `dist/assets/index-*.js` chunk at about 825 kB minified / 247 kB gzip, above the configured 700 kB warning threshold.
- `npm --prefix app run lint`: not run because no `lint` script exists.
- `npm --prefix app run test`: not run because no plain `test` script exists.
- `npm --prefix app run test:unit`: passed, 1 file / 9 tests.
  - Same duplicate `vitest` warning.

## Highest Priority Issues

| Severity | Area | File | Issue | Why it matters | Recommended fix |
|---|---|---|---|---|---|
| High | Accessibility / Mobile | `app/src/components/LandingPage.tsx` | Reading-path timeline is hover/SVG driven and has no keyboard-accessible path buttons. Mobile copy says “Hover a branch” even though hover does not exist on touch. | The primary conversion path is hard or impossible for keyboard and many mobile users. | Add a semantic mobile/keyboard fallback list of path buttons, or render timeline endpoints as accessible buttons with labels and keyboard handlers. Change mobile copy to “Choose a branch” or “Tap a path.” |
| High | Broken/dead interaction | `app/src/components/LandingPage.tsx` | “Click any instrument to explore its definition” is misleading because `V001_FiveToolSeparation` is passed `onInternalLink={() => {}}`. | Users are promised exploration, but clicks do not navigate to documents from the landing page. | Either wire diagram links to `handleEnter` plus document target navigation, or change the hint to describe the current in-diagram behavior only. |
| High | Accessibility | `app/src/components/LandingPage.tsx` | Threat accordion rows are clickable `<div>` elements without `button`, `tabIndex`, keyboard handling, `aria-expanded`, or panel relationships. | Keyboard and assistive-tech users cannot reliably discover or operate the failure/response cards. | Use `<button>` for headers inside semantic accordion items and add `aria-expanded`, `aria-controls`, and focus styles. |
| High | Motion / Performance / Accessibility | `app/src/components/LandingPage.tsx` | Continuous animations include RAF timeline pulse, marquee, grain, glow, scroll parallax, mouse parallax, and reveal transitions with no `prefers-reduced-motion` guard. | This can cause discomfort, battery drain, and needless rendering work, especially on mobile. | Add a reduced-motion CSS block and runtime guard to disable RAF/parallax/marquee/grain animations when requested. |
| Medium | SEO / Metadata | `app/index.html` | Metadata is thin and positioned as “Desktop Interface”; no Open Graph, canonical, descriptive title, or social preview metadata. | Public sharing/search snippets undersell the project and may imply the page is not intended for general web visitors. | Update title/description and add OG/Twitter/canonical metadata appropriate to the public landing page. |
| Medium | Performance | `app/src/App.tsx`, `app/src/components/LandingPage.tsx` | First visit loads the full app shell dependencies and corpus path machinery even though the landing page is the only visible screen. | Slower first paint and larger JavaScript work for users who have not chosen to enter the reader. | Lazy-load reader-only modules and consider lazy-loading diagram-heavy or corpus-heavy parts after landing CTA/idle. |
| Medium | React / Maintainability | `app/src/components/LandingPage.tsx` | The landing component contains about 1,500 lines, including large inline CSS and content arrays. | Hard to review, test, reuse, and tune responsively; every render carries a large style block. | Move landing CSS to a stylesheet or CSS module and split content, sections, and timeline into focused components/data files. |
| Medium | Technical Code Issues | `app/package.json` | Duplicate `vitest` keys in `devDependencies`. | Build/test warnings reduce signal and can hide real package drift. | Keep a single `vitest` version. |

## UX / Visual Hierarchy

The top section has a strong first impression: logo, short eyebrow, large question headline, concise subhead, and two clear hero CTAs. The problem/response accordion is also a good conceptual bridge from public pain points to constitutional machinery.

The hierarchy weakens lower on the page. The instruments section promises exploration but does not provide a landing-page navigation payoff. The reading-path section is visually distinctive, but the timeline prioritizes spectacle over scannability: path labels are curved, small, and embedded in SVG, and the actual path descriptions are hover-only.

The brand tone is serious and constitutional, but the TVA-style timeline and heavy glow treatment can feel more entertainment-like than civic, humane, or deliberative. The darker palette may fit “system architecture,” but the Humane Constitution’s purpose would benefit from a clearer human-centered signal beyond abstract mechanics.

## Mobile Responsiveness

There are mobile rules for the hero, accordion, instruments section, and CTA stacking. The hero buttons become full-width, which is good.

The reading-path timeline remains a 560px SVG panel on all sizes. The CSS references `.lp-paths-grid`, `.lp-path-card`, `.lp-stat`, and `.lp-instrument` classes that are not present in this component, suggesting older mobile layouts were removed without updating CSS. On phones, the path-selection experience is likely cramped and interaction instructions still mention hover.

The embedded five-instrument SVG has a fixed inline height of 204px and five columns. It may scale down horizontally, but labels are likely small on narrow screens.

## Accessibility

Primary hero CTAs are real buttons and should be keyboard focusable. Global `:focus-visible` styling exists in `app/src/index.css`.

Main gaps:

- Threat cards are clickable non-semantic containers.
- Timeline paths and SVG nodes are mouse-oriented with no roles, accessible names, tab order, or keyboard activation.
- Floating hover cards have `pointer-events: none`; the visible “click to read” text is not actually clickable as a card target.
- There is no reduced-motion support for extensive animation.
- Decorative/animated marquee content is exposed as normal text, which may create noisy screen-reader output.
- The landing page lacks a clear `<main>` landmark.
- The logo and SVG diagram need an accessibility pass for decorative vs. informative labeling.

## SEO / Metadata

Current metadata is minimal:

- `<title>Humane Constitution</title>`
- `<meta name="description" content="Humane Constitution — Desktop Interface" />`
- viewport and theme color

For public release, the description should match the landing copy and not say “Desktop Interface.” Add Open Graph and Twitter metadata, a canonical URL, and a stronger title such as “Humane Constitution | Open Constitutional Design.” Because this is a client-rendered Vite app, the static HTML metadata is especially important.

## Performance

The build passes, but Vite warns that the main chunk is large. The landing page itself includes continuous animation work:

- `requestAnimationFrame` updates timeline pulse state continuously.
- Scroll and mouse movement update React state.
- Grain, shimmer, marquee, glow, and SVG pulse animations run indefinitely.
- Large inline CSS is injected from the component.

The app imports `Dashboard`, `ChatBubble`, corpus loading, and landing code from the top-level app. Even when the landing page is shown, the bundle includes more reader functionality than a first-visit landing page needs. Lazy-loading the reader path would improve first-visit performance.

## Copy / Messaging

The hero copy is clear and reasonably plain: it states the core thesis that basic needs, markets, and public power should remain separate so wealth cannot become control.

Copy to revise:

- “Open Constitutional Design” is accurate but abstract. Consider “A public design for humane constitutional order” or similar if the audience is not already technical.
- “Choose your path.” is clear, but “Hover a branch to preview” excludes touch and keyboard users.
- “Click any instrument to explore its definition” is currently inaccurate.
- “Open Full Reader” is clear for returning/internal users, but first-time public visitors may understand “Read the Constitution” faster.

## Conversion Path

The page offers two main conversions:

- Choose a Reading Path
- Open Full Reader

That split is sensible. However, the strongest CTA sends users far down the page to an interaction that is not accessible enough on mobile/keyboard. The secondary CTA opens the reader, but does not explain what happens next or whether this is the best path for first-time readers.

Recommended conversion shape:

- Primary: “Start with a guided path”
- Secondary: “Open the full reader”
- Provide visible path cards/list immediately below or alongside the timeline, with each path as a real button.
- Add a final CTA after the instruments section before the timeline, so users are not forced through the whole page to act.

## Technical Code Issues

- The project is Vite React, not Next.js. There is no `app/page.tsx`, `app/layout.tsx`, or `app/globals.css`.
- Landing CSS is embedded inside `LandingPage.tsx`, making responsive and accessibility review harder.
- Several CSS selectors appear stale: `.lp-paths-grid`, `.lp-path-card`, `.lp-stat`, `.lp-instrument`, `.lp-instrument-desc`.
- `heroParallax` and `heroOpacity` read `window.innerHeight` during render. This works in the current browser-only Vite flow but is brittle if SSR/prerendering is introduced.
- `setScrollProgress` is written but never read.
- `PATHS` include `emoji` and `color` fields that are not used in the current timeline.
- `app/package.json` has duplicate `vitest` dev dependency entries.
- There is e2e coverage for landing flow, but not for mobile path selection, keyboard navigation, accordion accessibility, metadata, or reduced motion.

## Recommended Implementation Plan

### 1. Fix now

- Make threat cards semantic accordions with keyboard support and ARIA state.
- Add an accessible, touch-friendly reading-path list or cards under the timeline; keep the SVG as enhancement.
- Fix or remove the dead instruments hint by wiring real navigation or changing copy.
- Add reduced-motion CSS and runtime guards for timeline RAF, parallax, marquee, grain, and reveal animations.
- Replace “Hover a branch” with input-neutral copy.
- Remove duplicate `vitest` entry from `app/package.json`.

### 2. Improve before public release

- Rewrite metadata in `app/index.html` and add Open Graph/Twitter/canonical tags.
- Lazy-load reader-only modules so the first-visit landing does not pay for the full reader immediately.
- Split `LandingPage.tsx` into section components and move styles out of the component.
- Add mobile and keyboard e2e tests for hero CTAs, path selection, accordion operation, and diagram behavior.
- Review contrast for muted text such as marquee items, subhead, skip link, and diagram hint.

### 3. Nice-to-have

- Add a short final CTA after the design section.
- Use more human-centered imagery or examples to balance the technical/system visual language.
- Add structured data if the project becomes a public documentation site.
- Consider a lightweight no-JavaScript fallback message or direct links for public readers.
