# Direction A redesign — 2026-04-25

Visual redesign of the Tauri+React reader app under "Direction A — Editorial
Constitution" (see PR description for context).

## Folders

- `after/` — screenshots captured against the redesigned app (this commit).
- `before/` — *not committed.* Reproduce by checking out the parent commit and
  running `npx playwright test screenshot-tour.spec.ts` from `app/`. The
  resulting PNGs land in `tmp/screenshots/`.

## Capture

```bash
cd app
npx playwright test screenshot-tour.spec.ts
# screenshots → tmp/screenshots/{desktop,tablet}-{view}.png
```

The screenshot tour spec lives at `app/tests/e2e/screenshot-tour.spec.ts` and
captures every nav view at desktop (1440×900) and tablet (900×1100) viewports.
