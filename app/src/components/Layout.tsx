import { useEffect, useRef, useState } from 'react'
import type { CorpusDoc } from '../generated/corpus'

export type AppView =
  | 'home'
  | 'constitution'
  | 'annexes'
  | 'registries'
  | 'topics'
  | 'paths'
  | 'validation'
  | 'settings'

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

type NavItem = { id: AppView; label: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'constitution', label: 'Constitution' },
  { id: 'annexes', label: 'Annexes' },
  { id: 'registries', label: 'Threats & Patches' },
  { id: 'topics', label: 'Topics' },
  { id: 'paths', label: 'Reading Paths' },
  { id: 'validation', label: 'Validation' },
]

// ── appearance settings ───────────────────────────────────────────────────────

const FONT_SIZE_KEY    = 'humane-reader:font-size'
const COLUMN_WIDTH_KEY = 'humane-reader:column-width'
const THEME_KEY        = 'humane-reader:theme'

type FontSizeOption    = 'sm' | 'md' | 'lg' | 'xl'
type ColumnWidthOption = 'narrow' | 'normal' | 'wide'
type ThemeOption       = 'light' | 'dark' | 'system'

const FONT_SIZE_VALUES: Record<FontSizeOption, string> = {
  sm: '14px', md: '16px', lg: '18px', xl: '20px',
}
const COLUMN_WIDTH_VALUES: Record<ColumnWidthOption, string> = {
  narrow: '38rem', normal: '52rem', wide: '68rem',
}

function readFontSize(): FontSizeOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(FONT_SIZE_KEY) : null
  return (v === 'sm' || v === 'md' || v === 'lg' || v === 'xl') ? v : 'md'
}
function readColumnWidth(): ColumnWidthOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(COLUMN_WIDTH_KEY) : null
  return (v === 'narrow' || v === 'normal' || v === 'wide') ? v : 'normal'
}
function readTheme(): ThemeOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(THEME_KEY) : null
  return (v === 'light' || v === 'dark' || v === 'system') ? v : 'system'
}
function applyFontSize(size: FontSizeOption) {
  document.documentElement.style.setProperty('--reader-font-size', FONT_SIZE_VALUES[size])
}
function applyColumnWidth(width: ColumnWidthOption) {
  document.documentElement.style.setProperty('--reader-column-width', COLUMN_WIDTH_VALUES[width])
}
function applyTheme(pref: ThemeOption) {
  const resolved = pref === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : pref
  if (resolved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

// ── SettingsDropdown ──────────────────────────────────────────────────────────

function SettingsDropdown() {
  const [open, setOpen]         = useState(false)
  const [fontSize, setFs]       = useState<FontSizeOption>(readFontSize)
  const [colWidth, setCw]       = useState<ColumnWidthOption>(readColumnWidth)
  const [theme, setTh]          = useState<ThemeOption>(readTheme)
  const containerRef            = useRef<HTMLDivElement>(null)

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    function onPointer(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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

  function handleFontSize(v: FontSizeOption) {
    setFs(v)
    window.localStorage.setItem(FONT_SIZE_KEY, v)
    applyFontSize(v)
  }
  function handleColWidth(v: ColumnWidthOption) {
    setCw(v)
    window.localStorage.setItem(COLUMN_WIDTH_KEY, v)
    applyColumnWidth(v)
  }
  function handleTheme(v: ThemeOption) {
    setTh(v)
    window.localStorage.setItem(THEME_KEY, v)
    applyTheme(v)
  }

  const btnBase = 'focus-ring rounded border px-3 py-1.5 text-[12px] font-medium transition'
  const btnActive = 'border-[var(--accent)] bg-[var(--accent)] text-[var(--forest)] font-semibold'
  const btnIdle = 'border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.06)] text-[var(--forest-text-muted)] hover:border-[rgba(255,255,255,0.35)] hover:text-[var(--forest-text)]'

  return (
    <div ref={containerRef} className="relative" data-no-drag>
      {/* Trigger */}
      <button
        data-testid="nav-settings"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={`focus-ring relative flex items-center gap-1 whitespace-nowrap py-3.5 text-[13px] font-medium transition ${
          open ? 'text-[var(--forest-text)]' : 'text-[var(--forest-text-muted)] hover:text-[var(--forest-text)]'
        }`}
      >
        Settings
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-2.5 w-2.5 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Reading preferences"
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[var(--forest)] p-4 shadow-2xl"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--forest-text-muted)]">
            Reading preferences
          </p>

          {/* Font size */}
          <div className="mb-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--forest-text-muted)] opacity-60">Text size</p>
            <div className="flex gap-1.5">
              {(['sm', 'md', 'lg', 'xl'] as FontSizeOption[]).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleFontSize(opt)}
                  className={`${btnBase} ${fontSize === opt ? btnActive : btnIdle}`}
                >
                  {opt === 'sm' ? 'S' : opt === 'md' ? 'M' : opt === 'lg' ? 'L' : 'XL'}
                </button>
              ))}
            </div>
          </div>

          {/* Column width */}
          <div className="mb-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--forest-text-muted)] opacity-60">Reading width</p>
            <div className="flex gap-1.5">
              {(['narrow', 'normal', 'wide'] as ColumnWidthOption[]).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleColWidth(opt)}
                  className={`${btnBase} ${colWidth === opt ? btnActive : btnIdle}`}
                >
                  {opt === 'narrow' ? 'Narrow' : opt === 'normal' ? 'Normal' : 'Wide'}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--forest-text-muted)] opacity-60">Appearance</p>
            <div className="flex gap-1.5">
              {([
                { id: 'light' as ThemeOption, label: 'Light', icon: '☀' },
                { id: 'dark'  as ThemeOption, label: 'Dark',  icon: '☽' },
                { id: 'system' as ThemeOption, label: 'System', icon: '⊙' },
              ]).map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleTheme(opt.id)}
                  className={`${btnBase} flex items-center gap-1.5 ${theme === opt.id ? btnActive : btnIdle}`}
                >
                  <span aria-hidden="true">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── HamburgerDrawer ───────────────────────────────────────────────────────────

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

// ── Layout ────────────────────────────────────────────────────────────────────

export function Layout({
  children,
  activeNav,
  onNavChange,
  readingProgress = 0,
  recentDocs: _recentDocs,
  shelfDocs: _shelfDocs,
  shelfLabel: _shelfLabel,
  onSelectDoc: _onSelectDoc,
  corpusQuery,
  onCorpusQueryChange,
}: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <a href="#reader-main" className="skip-link">
        Skip to reader
      </a>

      <header
        data-tauri-drag-region
        className="sticky top-0 z-40 border-b border-[rgba(0,0,0,0.18)] bg-[var(--forest)] px-6 sm:px-8"
      >
        {/* Reading progress bar — sits flush at the very bottom of the header */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[rgba(0,0,0,0.15)]"
        >
          <div
            className="h-full bg-[var(--accent)] transition-[width] duration-75 ease-linear"
            style={{ width: `${readingProgress * 100}%` }}
          />
        </div>
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

          {/* Right controls — NavDropdown and settings will be added in Task 5 */}
          <div className="flex shrink-0 items-center gap-1">
            <SettingsDropdown />
          </div>
        </div>
      </header>

      <main
        id="reader-main"
        data-testid="reader-main"
        tabIndex={-1}
        className="px-4 pb-16 pt-8 focus:outline-none sm:px-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-[82rem]">{children}</div>
      </main>
    </div>
  )
}
