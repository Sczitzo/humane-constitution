import { DotMatrixField } from './DotMatrixField'

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

interface NavItemProps {
  testId?: string
  glyph: string
  label: string
  detail: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ testId, glyph, label, detail, active = false, onClick }: NavItemProps) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className={`group w-full rounded-[22px] border px-4 py-3.5 text-left transition ${
        active
          ? 'border-[rgba(230,207,172,0.34)] bg-[linear-gradient(180deg,rgba(253,249,242,0.14),rgba(253,249,242,0.06))] text-[var(--nav-text-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_34px_rgba(12,16,15,0.2)]'
          : 'border-[rgba(230,207,172,0.08)] bg-[rgba(255,255,255,0.02)] text-[var(--nav-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.015)] hover:border-[rgba(230,207,172,0.16)] hover:bg-[rgba(253,249,242,0.05)] hover:text-[var(--nav-text-strong)] hover:shadow-[0_14px_24px_rgba(12,16,15,0.12)]'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-sm transition ${
            active
              ? 'border-[rgba(230,207,172,0.42)] bg-[rgba(230,207,172,0.12)] text-[var(--accent-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
              : 'border-[rgba(230,207,172,0.14)] text-[var(--nav-text-muted)] group-hover:border-[rgba(230,207,172,0.28)] group-hover:text-[var(--accent-soft)]'
          }`}
        >
          {glyph}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-mono uppercase tracking-[0.26em]">{label}</p>
          <p className="mt-1 text-[12px] leading-6 text-[var(--nav-text-muted)] transition group-hover:text-[var(--nav-text)]">
            {detail}
          </p>
        </div>
      </div>
    </button>
  )
}

export function Layout({ children, activeNav, onNavChange }: LayoutProps) {
  const navItems: Array<{ id: AppView; glyph: string; label: string; detail: string }> = [
    {
      id: 'overview',
      glyph: '§',
      label: 'Overview',
      detail: 'Start here: featured documents and orientation.',
    },
    {
      id: 'constitution',
      glyph: 'I',
      label: 'Constitution',
      detail: 'Charter text, white paper, and founding order.',
    },
    {
      id: 'annexes',
      glyph: 'A',
      label: 'Annexes',
      detail: 'Operational clauses, specifications, and extensions.',
    },
    {
      id: 'registries',
      glyph: 'R',
      label: 'Registries',
      detail: 'Threats, patches, commitments, and governance logs.',
    },
    {
      id: 'validation',
      glyph: 'V',
      label: 'Validation',
      detail: 'Activation gates, integrity status, and checks.',
    },
    {
      id: 'settings',
      glyph: '·',
      label: 'Settings',
      detail: 'Shell behavior and operator shortcuts.',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--ink)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <DotMatrixField />
        <div className="absolute left-[-8rem] top-[5rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,188,139,0.14),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-10rem] top-[-6rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(77,86,80,0.14),transparent_68%)] blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[14rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(126,142,118,0.1),transparent_68%)] blur-3xl" />
      </div>

      <header
        data-tauri-drag-region
        className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-4 border-b border-[var(--chrome-line)] bg-[rgba(250,246,238,0.88)] px-5 backdrop-blur-md"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-mono uppercase tracking-[0.34em] text-[var(--ink-faint)]">
            Humane Constitution
          </p>
          <p className="truncate font-serif text-[17px] text-[var(--ink-strong)]">
            Civic Reader Edition
          </p>
        </div>

        <div className="flex items-center gap-3" data-no-drag>
          <div className="hidden items-center gap-2 rounded-full border border-[rgba(111,124,103,0.18)] bg-[rgba(253,249,242,0.74)] px-3 py-1 lg:flex">
            <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">
              Live corpus
            </span>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-[var(--ink-faint)]">Synced</span>
        </div>
      </header>

      <div className="relative z-10 flex min-h-screen flex-col pt-14 lg:grid lg:grid-cols-[18.5rem_minmax(0,1fr)]">
        <aside data-testid="reader-compass" className="border-b border-[rgba(60,54,46,0.12)] bg-[var(--nav-surface)] px-4 py-5 text-[var(--nav-text-strong)] shadow-[inset_-1px_0_0_rgba(255,255,255,0.02)] lg:flex lg:h-[calc(100vh-3.5rem)] lg:min-h-0 lg:flex-col lg:overflow-y-auto lg:overscroll-contain lg:border-b-0 lg:border-r lg:border-r-[rgba(60,54,46,0.14)] lg:px-5 lg:py-7">
          <nav data-testid="reader-compass-nav" className="mt-0 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
            {navItems.slice(0, 5).map((item) => (
              <div key={item.id} className="min-w-[15rem] lg:min-w-0">
                <NavItem
                  testId={`nav-${item.id}`}
                  glyph={item.glyph}
                  label={item.label}
                  detail={item.detail}
                  active={activeNav === item.id}
                  onClick={() => onNavChange(item.id)}
                />
              </div>
            ))}
          </nav>

          <div className="mt-4 border-t border-[rgba(230,207,172,0.12)] pt-4 lg:mt-auto">
            <NavItem
              testId="nav-settings"
              glyph={navItems[5].glyph}
              label={navItems[5].label}
              detail={navItems[5].detail}
              active={activeNav === 'settings'}
              onClick={() => onNavChange('settings')}
            />
            <p className="mt-4 px-1 text-[9px] font-mono uppercase tracking-[0.22em] text-[var(--nav-text-muted)]">
              v0.1.0 · Reader shell
            </p>
          </div>
        </aside>

        <main data-testid="reader-main" className="min-h-[calc(100vh-3.5rem)] overflow-y-auto px-4 pb-8 pt-5 lg:h-[calc(100vh-3.5rem)] lg:min-h-0 lg:px-8 lg:pb-10 lg:pt-8">
          <div className="mx-auto w-full max-w-[97rem]">{children}</div>
        </main>
      </div>
    </div>
  )
}
