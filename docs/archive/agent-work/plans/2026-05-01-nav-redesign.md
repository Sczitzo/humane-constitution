# Nav Bar Redesign + Single Column Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the horizontal nav with a hamburger drawer, move corpus search + Recent/Shelf dropdowns into the nav bar, and collapse the three-column layout to a single full-width column.

**Architecture:** Lift `recentDocs`, `shelfDocs`, `shelfLabel`, and `onSelectDoc` out of `Dashboard` through `App` into `Layout` so the nav bar can render the dropdowns. `ReaderWorkspace` loses its shelf pane and grid split — it becomes a single-column reader. The corpus filter input on the page is removed; filtering moves into the nav search bar.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite. No routing library — view state in `useState`.

---

## File map

| File | What changes |
|---|---|
| `app/src/components/Layout.tsx` | Add hamburger drawer, search bar, Recent ▾, Shelf ▾, ⚙ icon. Accept new props. Remove `PRIMARY_NAV` buttons. |
| `app/src/components/Dashboard.tsx` | Remove shelf pane + grid split from `ReaderWorkspace`. Remove corpus filter input from `Dashboard`. Pass `recentDocs`, `shelfDocs`, `shelfLabel`, `onSelectDoc` up to `App` via new callback prop. |
| `app/src/App.tsx` | Accept new props from Dashboard, pass them down to Layout. |

---

## Task 1: Add nav props to Layout and wire App

**Files:**
- Modify: `app/src/components/Layout.tsx`
- Modify: `app/src/App.tsx`

- [ ] **Step 1: Extend LayoutProps in Layout.tsx**

Replace the existing `LayoutProps` interface (lines 13–18) with:

```tsx
import type { CorpusDoc } from '../generated/corpus'

interface LayoutProps {
  children: React.ReactNode
  activeNav: AppView
  onNavChange: (view: AppView) => void
  readingProgress?: number
  recentDocs: CorpusDoc[]
  shelfDocs: CorpusDoc[]
  shelfLabel: string
  onSelectDoc: (doc: CorpusDoc) => void
  corpusQuery: string
  onCorpusQueryChange: (q: string) => void
}
```

- [ ] **Step 2: Update Layout function signature**

Change:
```tsx
export function Layout({ children, activeNav, onNavChange, readingProgress = 0 }: LayoutProps) {
```
To:
```tsx
export function Layout({
  children,
  activeNav,
  onNavChange,
  readingProgress = 0,
  recentDocs,
  shelfDocs,
  shelfLabel,
  onSelectDoc,
  corpusQuery,
  onCorpusQueryChange,
}: LayoutProps) {
```

- [ ] **Step 3: Add state and new props to App.tsx**

In `app/src/App.tsx`, add state for the lifted values. Add these lines inside the `App` component after the existing `useState` declarations:

```tsx
const [recentDocs, setRecentDocs] = useState<CorpusDoc[]>([])
const [shelfDocs, setShelfDocs] = useState<CorpusDoc[]>([])
const [shelfLabel, setShelfLabel] = useState('')
const [corpusQuery, setCorpusQuery] = useState('')

function handleNavDocsChange(recent: CorpusDoc[], shelf: CorpusDoc[], label: string) {
  setRecentDocs(recent)
  setShelfDocs(shelf)
  setShelfLabel(label)
}

function handleSelectNavDoc(doc: CorpusDoc) {
  // Navigate to the doc's view then select it — Dashboard handles selection via its own state.
  // We emit a viewChange for the section, then Dashboard auto-selects by id via a deep-link.
  const nextView = viewForDocSection(doc.section)
  handleViewChange(nextView)
  // Store the target doc id so Dashboard can pick it up on mount.
  window.localStorage.setItem(`humane-reader:nav-jump`, doc.id)
}
```

Add the helper above `App`:
```tsx
function viewForDocSection(section: string): AppView {
  if (section === 'constitution') return 'constitution'
  if (section === 'annexes') return 'annexes'
  if (section === 'registry') return 'registries'
  if (section === 'simulation') return 'topics'
  return 'home'
}
```

Add the import at the top of App.tsx:
```tsx
import type { CorpusDoc } from './generated/corpus'
```

- [ ] **Step 4: Pass new props to Layout in App.tsx**

Update the `<Layout>` JSX in `App.tsx`:
```tsx
<Layout
  activeNav={view}
  onNavChange={handleNavChange}
  readingProgress={readingProgress}
  recentDocs={recentDocs}
  shelfDocs={shelfDocs}
  shelfLabel={shelfLabel}
  onSelectDoc={handleSelectNavDoc}
  corpusQuery={corpusQuery}
  onCorpusQueryChange={setCorpusQuery}
>
```

- [ ] **Step 5: Pass onNavDocsChange to Dashboard in App.tsx**

Update the `<Dashboard>` JSX to add:
```tsx
<Dashboard
  view={view}
  corpus={corpus}
  loadError={loadError}
  onViewChange={handleViewChange}
  onProgressChange={setReadingProgress}
  onNavDocsChange={handleNavDocsChange}
  corpusQuery={corpusQuery}
  onCorpusQueryChange={setCorpusQuery}
/>
```

- [ ] **Step 6: Verify TypeScript compiles (ignore missing prop errors — fixed in later tasks)**

```bash
cd app && npx tsc --noEmit 2>&1 | head -30
```

Expected: errors only about missing `onNavDocsChange` prop on Dashboard (fixed in Task 2). No other new errors.

- [ ] **Step 7: Commit**

```bash
cd app && git add src/components/Layout.tsx src/App.tsx
git commit -m "feat(nav): add lifted nav props to Layout and App wiring"
```

---

## Task 2: Add onNavDocsChange to Dashboard and remove corpus filter input

**Files:**
- Modify: `app/src/components/Dashboard.tsx`

- [ ] **Step 1: Add new props to Dashboard's prop interface**

Find the `Dashboard` component's props interface (search for `}: {` after the `export function Dashboard` or `export default function Dashboard` signature). Add:

```tsx
onNavDocsChange: (recent: CorpusDoc[], shelf: CorpusDoc[], label: string) => void
corpusQuery: string
onCorpusQueryChange: (q: string) => void
```

And add them to the destructured parameters:
```tsx
onNavDocsChange,
corpusQuery,
onCorpusQueryChange,
```

- [ ] **Step 2: Replace internal `query` state with the lifted corpusQuery**

Find where `query` state is declared inside Dashboard (look for `const [query, setQuery]`). Remove that line. Replace all uses of `query` with `corpusQuery` and all uses of `setQuery` with `onCorpusQueryChange` throughout Dashboard.tsx.

The `deferredQuery` line becomes:
```tsx
const deferredQuery = useDeferredValue(corpusQuery)
```

- [ ] **Step 3: Call onNavDocsChange whenever recentDocs or shelfDocs change**

After the `recentDocs` derived value (around line 3060), add a `useEffect`:

```tsx
useEffect(() => {
  onNavDocsChange(recentDocs, visibleDocs, meta.railLabel)
}, [recentDocs.map(d => d.id).join(','), visibleDocs.map(d => d.id).join(','), meta.railLabel])
```

- [ ] **Step 4: Remove the corpus filter input from the Dashboard render**

Find and delete this block (around lines 3912–3929):
```tsx
{view !== 'home' && view !== 'topics' && view !== 'paths' && view !== 'settings' && (
  <div className="flex max-w-md items-center gap-3">
    <label htmlFor="corpus-search" className="sr-only">
      Filter this section
    </label>
    <input
      id="corpus-search"
      ref={shelfSearchInputRef}
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Filter title, path, or headings…"
      className="focus-ring flex-1 rounded border border-line bg-[var(--paper-strong)] px-3 py-1.5 font-serif text-[14px] text-ink-strong placeholder:text-ink-faint"
    />
    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
      {visibleDocs.length} {visibleDocs.length === 1 ? 'match' : 'matches'}
    </span>
  </div>
)}
```

Also remove the `shelfSearchInputRef` ref declaration if it is only used by this input.

- [ ] **Step 5: Handle nav-jump deep-link in Dashboard**

In Dashboard, inside the `useEffect` that watches `view` changes, add logic to pick up the `nav-jump` key:

```tsx
useEffect(() => {
  const jumpId = window.localStorage.getItem('humane-reader:nav-jump')
  if (jumpId) {
    window.localStorage.removeItem('humane-reader:nav-jump')
    startTransition(() => setSelectedDocId(jumpId))
  }
}, [view])
```

- [ ] **Step 6: Verify TypeScript compiles cleanly**

```bash
cd app && npx tsc --noEmit 2>&1 | head -30
```

Expected: 0 errors.

- [ ] **Step 7: Commit**

```bash
git add app/src/components/Dashboard.tsx
git commit -m "feat(nav): lift corpus query and nav docs out of Dashboard"
```

---

## Task 3: Remove shelf pane and grid split from ReaderWorkspace

**Files:**
- Modify: `app/src/components/Dashboard.tsx` (ReaderWorkspace function, lines ~2147–2360)

- [ ] **Step 1: Remove shelf-related props from ReaderWorkspace**

In `ReaderWorkspace`'s props interface and destructuring, remove:
- `recentDocs: CorpusDoc[]`
- `recentIds: string[]`
- `pinnedDocs: CorpusDoc[]`
- `pinnedDocIds: string[]`
- `onSelectQuickDoc`
- `onTogglePinned`
- `readDocIds`
- `onToggleRead`
- `railLabel`
- `independentScroll`
- `shelfPaneRef`
- `outlinePaneRef`
- `onPaneScroll`

Keep: `docs`, `allDocs`, `selectedDoc`, `readingMode`, `onToggleReadingMode`, `onOpenSource`, `feedback`, `emptyLabel`, `readerPaneRef`, `activeHeadingSlug`, `copiedHeadingSlug`, `onCopyHeadingLink`, `searchQuery`, `onSearchChange`, `searchInputRef`, `matchCount`, `currentMatchIndex`, `onJumpToPreviousMatch`, `onJumpToNextMatch`, `onSelect`.

- [ ] **Step 2: Replace the grid wrapper with a single-column div**

Replace:
```tsx
<div
  data-reading-mode={readingMode ? 'true' : 'false'}
  className={`grid gap-10 ${
    readingMode
      ? 'xl:grid-cols-[minmax(0,1fr)]'
      : 'xl:grid-cols-[16rem_minmax(0,1fr)] 2xl:grid-cols-[16rem_minmax(0,1fr)_13rem]'
  } ${independentScroll || readingMode ? 'items-start' : ''}`}
>
```

With:
```tsx
<div data-reading-mode={readingMode ? 'true' : 'false'} className="w-full">
```

- [ ] **Step 3: Remove the entire shelf pane `<section>` block**

Delete from `<section ref={shelfPaneRef} data-testid="shelf-pane"` through its closing `</section>` tag (the entire left column containing the document list).

- [ ] **Step 4: Remove the outline pane `<div>` block**

Delete the third column div containing `<ReaderOutline>` (the right column with heading outline). The outline within `ReaderPanel` (the sticky inline outline) can stay if present, but the standalone right column pane should be removed.

- [ ] **Step 5: Remove the scroll-routing wrapper div around the reader pane**

The reader pane was wrapped in a div with `ref={readerPaneRef}` and `onScroll`/`onWheelCapture` for independent scroll. Simplify: keep `ref={readerPaneRef}` on the reader pane div but remove `onWheelCapture={routeVerticalWheelToSelf}` since we no longer need to prevent scroll bleeding between panes.

- [ ] **Step 6: Update the ReaderWorkspace call site in Dashboard render**

Remove the props that no longer exist from the `<ReaderWorkspace>` JSX block (around lines 3932–3966):
- Remove: `pinnedDocIds`, `pinnedDocs`, `recentDocs`, `recentIds`, `onSelectQuickDoc`, `onTogglePinned`, `readDocIds`, `onToggleRead`, `railLabel`, `independentScroll`, `shelfPaneRef`, `outlinePaneRef`, `onPaneScroll`

- [ ] **Step 7: Verify build succeeds**

```bash
cd app && npm run build 2>&1 | tail -10
```

Expected: `✓ built in` with no errors.

- [ ] **Step 8: Commit**

```bash
git add app/src/components/Dashboard.tsx
git commit -m "feat(layout): remove shelf pane and grid split — single column reader"
```

---

## Task 4: Build hamburger drawer in Layout

**Files:**
- Modify: `app/src/components/Layout.tsx`

- [ ] **Step 1: Add HamburgerDrawer component above Layout**

Add this component after the `SettingsDropdown` component and before the `Layout` function:

```tsx
const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'constitution', label: 'Constitution' },
  { id: 'annexes', label: 'Annexes' },
  { id: 'registries', label: 'Threats & Patches' },
  { id: 'topics', label: 'Topics' },
  { id: 'paths', label: 'Reading Paths' },
  { id: 'validation', label: 'Validation' },
]

function HamburgerDrawer({
  activeNav,
  onNavChange,
}: {
  activeNav: AppView
  onNavChange: (view: AppView) => void
}) {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    function onPointer(e: PointerEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  function handleSelect(id: AppView) {
    setOpen(false)
    onNavChange(id)
  }

  return (
    <div ref={drawerRef} className="relative shrink-0" data-no-drag>
      <button
        data-testid="nav-hamburger"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded text-[var(--forest-text-muted)] hover:text-[var(--forest-text)] transition"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          {open ? (
            <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
          ) : (
            <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
          )}
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Navigation menu"
          className="absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[var(--forest)] py-1 shadow-2xl"
        >
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              data-testid={`nav-${item.id}`}
              type="button"
              aria-current={activeNav === item.id ? 'page' : undefined}
              onClick={() => handleSelect(item.id)}
              className={`focus-ring flex w-full items-center px-4 py-2.5 text-left text-[13px] font-medium transition ${
                activeNav === item.id
                  ? 'text-[var(--accent)] bg-[rgba(159,108,49,0.1)]'
                  : 'text-[var(--forest-text-muted)] hover:text-[var(--forest-text)] hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              {item.label}
              {activeNav === item.id && (
                <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Replace the nav row in the Layout header**

Replace the entire `<div className="mx-auto flex w-full max-w-[82rem] items-end gap-7">` block with:

```tsx
<div className="mx-auto flex w-full max-w-[82rem] items-center gap-3 py-2">
  {/* Hamburger — far left */}
  <HamburgerDrawer activeNav={activeNav} onNavChange={onNavChange} />

  {/* Branding */}
  <p
    className="shrink-0 select-none font-serif text-[15px] tracking-tight text-[var(--forest-text)]"
    aria-label="Humane Constitution"
  >
    <span className="text-[var(--forest-text)]">Humane Constitution</span>
    <span className="ml-2 text-[var(--forest-text-muted)]">·</span>
    <span className="ml-2 text-[var(--forest-text-muted)]">Reader</span>
  </p>

  {/* Corpus search — flex-1 center */}
  <div className="flex flex-1 items-center gap-2 px-2">
    <label htmlFor="nav-corpus-search" className="sr-only">Search documents</label>
    <input
      id="nav-corpus-search"
      type="search"
      value={corpusQuery}
      onChange={e => onCorpusQueryChange(e.target.value)}
      placeholder="Search documents…"
      className="focus-ring w-full rounded border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.07)] px-3 py-1.5 text-[13px] text-[var(--forest-text)] placeholder:text-[var(--forest-text-muted)] outline-none transition hover:border-[rgba(255,255,255,0.25)]"
    />
  </div>

  {/* Right controls */}
  <div className="flex shrink-0 items-center gap-1">
    <NavDropdown
      label="Recent"
      docs={recentDocs}
      onSelect={onSelectDoc}
      testId="nav-recent"
      emptyText="No recently viewed documents."
    />
    {shelfDocs.length > 0 && shelfLabel && (
      <NavDropdown
        label={shelfLabel}
        docs={shelfDocs}
        onSelect={onSelectDoc}
        testId="nav-shelf"
        emptyText="No documents in this section."
      />
    )}
    <SettingsIcon />
  </div>
</div>
```

- [ ] **Step 3: Verify build**

```bash
cd app && npm run build 2>&1 | tail -10
```

Expected: errors about missing `NavDropdown` and `SettingsIcon` — fixed in Task 5.

- [ ] **Step 4: Commit skeleton**

```bash
git add app/src/components/Layout.tsx
git commit -m "feat(nav): add HamburgerDrawer and new header layout skeleton"
```

---

## Task 5: Build NavDropdown and SettingsIcon components

**Files:**
- Modify: `app/src/components/Layout.tsx`

- [ ] **Step 1: Add NavDropdown component above Layout**

Add after `HamburgerDrawer`:

```tsx
function NavDropdown({
  label,
  docs,
  onSelect,
  testId,
  emptyText,
}: {
  label: string
  docs: CorpusDoc[]
  onSelect: (doc: CorpusDoc) => void
  testId: string
  emptyText: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    function onPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div ref={ref} className="relative" data-no-drag>
      <button
        data-testid={testId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={`focus-ring flex items-center gap-1 rounded px-2.5 py-1.5 text-[12px] font-medium transition whitespace-nowrap ${
          open
            ? 'text-[var(--forest-text)] bg-[rgba(255,255,255,0.08)]'
            : 'text-[var(--forest-text-muted)] hover:text-[var(--forest-text)] hover:bg-[rgba(255,255,255,0.05)]'
        }`}
      >
        {label}
        <svg aria-hidden="true" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`h-2.5 w-2.5 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[var(--forest)] py-1 shadow-2xl"
          style={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
          {docs.length === 0 ? (
            <p className="px-4 py-3 text-[12px] text-[var(--forest-text-muted)]">{emptyText}</p>
          ) : (
            docs.map(doc => (
              <button
                key={doc.id}
                role="option"
                type="button"
                onClick={() => { onSelect(doc); setOpen(false) }}
                className="focus-ring flex w-full flex-col px-4 py-2.5 text-left transition hover:bg-[rgba(255,255,255,0.05)]"
              >
                <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--forest-text-muted)]">
                  {doc.section}
                </span>
                <span className="mt-0.5 block line-clamp-2 text-[12px] leading-snug text-[var(--forest-text)]">
                  {doc.title}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Add SettingsIcon component — wraps existing SettingsDropdown with an icon trigger**

Replace the `SettingsDropdown` component's trigger button text `Settings` with a gear SVG icon:

Find in `SettingsDropdown`:
```tsx
        Settings
        <svg
```

Replace with:
```tsx
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
        <svg
```

Also update the trigger button's `className` — remove the `py-3.5` padding and change to `p-2` since we no longer have text:
```tsx
className={`focus-ring flex h-9 w-9 items-center justify-center rounded transition ${
  open ? 'text-[var(--forest-text)]' : 'text-[var(--forest-text-muted)] hover:text-[var(--forest-text)]'
}`}
```

Remove the chevron `<svg>` that follows the label (it was the dropdown arrow — no longer needed since the button is now icon-only).

- [ ] **Step 3: Verify full build**

```bash
cd app && npm run build 2>&1 | tail -10
```

Expected: `✓ built in` — no errors.

- [ ] **Step 4: Commit**

```bash
git add app/src/components/Layout.tsx
git commit -m "feat(nav): add NavDropdown and settings icon — nav bar complete"
```

---

## Task 6: Smoke test and fix visual issues

**Files:**
- Modify: `app/src/index.css` (if needed for nav bar appearance tweaks)

- [ ] **Step 1: Run dev server and visually verify**

```bash
cd app && npm run dev
```

Open `http://localhost:5173`. Check:
- [ ] Hamburger icon visible far left in nav bar
- [ ] Clicking hamburger opens drawer with all 7 nav items (Home, Constitution, Annexes, Threats & Patches, Topics, Reading Paths, Validation)
- [ ] Active nav item shows gold dot and accent colour in drawer
- [ ] Clicking a nav item closes drawer and switches view
- [ ] Search bar is visible in nav bar center, typing filters document list
- [ ] Recent ▾ dropdown shows last viewed docs
- [ ] Shelf ▾ dropdown shows current section docs (hidden on Home view)
- [ ] ⚙ icon opens settings panel with font/width/theme controls
- [ ] No left shelf column on the page — reader is full width
- [ ] Reading mode toggle still works

- [ ] **Step 2: Check the e2e tests still pass for reader-panel tests**

```bash
cd app && npm run test:e2e -- --grep "reader shell"
```

Expected: tests that rely on `shelf-pane` scrolling will fail (those tested the removed shelf) — that is acceptable. Tests for `reader-panel`, `reader-scroll-pane`, `reader-title`, `reader-search-input` should pass.

- [ ] **Step 3: Commit any CSS fixes**

```bash
git add app/src/index.css app/src/components/Layout.tsx app/src/components/Dashboard.tsx
git commit -m "fix(nav): visual polish after smoke test"
```

---

## Task 7: Regenerate corpus and final build

- [ ] **Step 1: Regenerate corpus**

```bash
cd app && npm run generate:corpus
```

Expected: `Wrote app/src/generated/corpus.ts and app/public/generated/corpus.json with 65 documents.`

- [ ] **Step 2: Final production build**

```bash
cd app && npm run build 2>&1 | tail -5
```

Expected: `✓ built in`

- [ ] **Step 3: Final commit**

```bash
git add app/public/generated/corpus.json
git commit -m "chore: regenerate corpus after nav redesign"
```
