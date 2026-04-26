export type AppView =
  | 'overview'
  | 'constitution'
  | 'annexes'
  | 'registries'
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
  { id: 'overview', label: 'Overview' },
  { id: 'constitution', label: 'Constitution' },
  { id: 'annexes', label: 'Annexes' },
  { id: 'registries', label: 'Registries' },
  { id: 'validation', label: 'Validation' },
]

const SECONDARY_NAV: NavItem[] = [{ id: 'settings', label: 'Settings' }]

export function Layout({ children, activeNav, onNavChange }: LayoutProps) {
  function renderNavLink(item: NavItem, secondary = false) {
    const active = activeNav === item.id
    return (
      <button
        key={item.id}
        data-testid={`nav-${item.id}`}
        type="button"
        aria-current={active ? 'page' : undefined}
        onClick={() => onNavChange(item.id)}
        className={`focus-ring relative whitespace-nowrap py-3 text-[13px] font-serif transition ${
          active
            ? 'text-ink-strong'
            : secondary
              ? 'text-ink-faint hover:text-ink-strong'
              : 'text-ink-soft hover:text-ink-strong'
        }`}
      >
        {item.label}
        {active ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-accent"
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
        className="sticky top-0 z-40 flex items-end gap-6 border-b border-line bg-[rgba(244,237,226,0.92)] px-6 backdrop-blur-md sm:px-8"
      >
        <p
          className="shrink-0 select-none py-3 font-serif text-[15px] tracking-tight text-ink-strong"
          aria-label="Humane Constitution"
        >
          <span className="text-ink-strong">Humane Constitution</span>
          <span className="ml-2 text-ink-faint">·</span>
          <span className="ml-2 text-ink-faint">Reader</span>
        </p>

        <nav
          data-testid="reader-compass-nav"
          aria-label="Sections"
          className="flex flex-1 items-end gap-5 overflow-x-auto sm:gap-7"
          data-no-drag
        >
          {PRIMARY_NAV.map((item) => renderNavLink(item))}
        </nav>

        <div className="hidden items-end gap-5 sm:flex" data-no-drag>
          {SECONDARY_NAV.map((item) => renderNavLink(item, true))}
        </div>
      </header>

      <main
        id="reader-main"
        data-testid="reader-main"
        tabIndex={-1}
        className="px-4 pb-16 pt-8 focus:outline-none sm:px-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-[78rem]">{children}</div>
      </main>
    </div>
  )
}
