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
}

interface NavItem {
  id: AppView
  label: string
}

const PRIMARY_NAV: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'constitution', label: 'Constitution' },
  { id: 'annexes', label: 'Annexes' },
  { id: 'registries', label: 'Threats & Patches' },
  { id: 'topics', label: 'Topics' },
  { id: 'paths', label: 'Reading Paths' },
  { id: 'validation', label: 'Validation' },
]

const SECONDARY_NAV: NavItem[] = [{ id: 'settings', label: 'Settings' }]

export function Layout({ children, activeNav, onNavChange }: LayoutProps) {
  function renderNavLink(item: NavItem) {
    const active = activeNav === item.id
    return (
      <button
        key={item.id}
        data-testid={`nav-${item.id}`}
        type="button"
        aria-current={active ? 'page' : undefined}
        onClick={() => onNavChange(item.id)}
        className={`focus-ring relative whitespace-nowrap py-3.5 text-[13px] font-medium transition ${
          active
            ? 'text-[var(--forest-text)]'
            : 'text-[var(--forest-text-muted)] hover:text-[var(--forest-text)]'
        }`}
      >
        {item.label}
        {active ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] bg-[var(--accent)]"
          />
        ) : null}
      </button>
    )
  }

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <a href="#reader-main" className="skip-link">
        Skip to reader
      </a>

      <header
        data-tauri-drag-region
        className="sticky top-0 z-40 border-b border-[rgba(0,0,0,0.18)] bg-[var(--forest)] px-6 sm:px-8"
      >
        <div className="mx-auto flex w-full max-w-[82rem] items-end gap-7">
          <p
            className="shrink-0 select-none py-3 font-serif text-[15px] tracking-tight text-[var(--forest-text)]"
            aria-label="Humane Constitution"
          >
            <span className="text-[var(--forest-text)]">Humane Constitution</span>
            <span className="ml-2 text-[var(--forest-text-muted)]">·</span>
            <span className="ml-2 text-[var(--forest-text-muted)]">Reader</span>
          </p>

          <nav
            data-testid="reader-compass-nav"
            aria-label="Sections"
            className="flex flex-1 items-end gap-5 overflow-x-auto sm:gap-6"
            data-no-drag
          >
            {PRIMARY_NAV.map((item) => renderNavLink(item))}
          </nav>

          <div className="hidden items-end gap-4 sm:flex" data-no-drag>
            {SECONDARY_NAV.map((item) => renderNavLink(item))}
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
