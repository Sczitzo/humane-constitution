import { useState, useCallback } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

/* ─── Window Control Button ───────────────────────────────────────────────── */
interface WinBtnProps {
  color: string
  hoverColor: string
  title: string
  onClick: () => void
}

function WinBtn({ color, hoverColor, title, onClick }: WinBtnProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-no-drag
      className="w-3 h-3 rounded-full flex items-center justify-center
                 transition-all duration-150 focus:outline-none focus-visible:ring-1
                 focus-visible:ring-white/40"
      style={{ backgroundColor: hovered ? hoverColor : color }}
      aria-label={title}
    >
      {/* Icon only visible on hover */}
      <span
        className="text-[7px] font-bold leading-none select-none"
        style={{
          color: 'rgba(0,0,0,0.7)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 120ms',
        }}
      >
        {title === 'Close' ? '✕' : title === 'Minimise' ? '−' : '⤢'}
      </span>
    </button>
  )
}

/* ─── Sidebar nav item ────────────────────────────────────────────────────── */
interface NavItemProps {
  icon: string
  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left
        transition-all duration-200 group
        ${
          active
            ? 'backdrop-refract refract-lens bg-white/[0.07] text-white shadow-glass'
            : 'text-white/40 hover:text-white/75 hover:bg-white/[0.04]'
        }
      `}
    >
      <span className={`text-base transition-all duration-200 ${active ? 'text-plasma-glow' : 'group-hover:text-plasma-glow'}`}>
        {icon}
      </span>
      <span className="text-xs font-mono tracking-wide truncate">{label}</span>
      {active && (
        <span className="ml-auto w-1 h-1 rounded-full bg-plasma-glow shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
      )}
    </button>
  )
}

/* ─── Layout ──────────────────────────────────────────────────────────────── */
export function Layout({ children }: LayoutProps) {
  const [activeNav, setActiveNav] = useState('dashboard')

  const handleClose    = useCallback(() => { /* Tauri window close via IPC */ }, [])
  const handleMinimise = useCallback(() => { /* Tauri window minimise */ }, [])
  const handleMaximise = useCallback(() => { /* Tauri window maximise/restore */ }, [])

  const navItems = [
    { id: 'dashboard', icon: '◈', label: 'DASHBOARD'    },
    { id: 'pillars',   icon: '⬡', label: 'PILLARS'      },
    { id: 'threats',   icon: '⚠', label: 'THREAT REGISTER' },
    { id: 'audit',     icon: '◎', label: 'AUDIT LOG'    },
    { id: 'protocol',  icon: '⬟', label: 'PROTOCOL'     },
    { id: 'settings',  icon: '⚙', label: 'SETTINGS'     },
  ]

  return (
    <div className="relative h-screen overflow-hidden bg-void-900 select-none">

      {/* ── LAYER 0: Fixed Canvas Artwork ─────────────────────────────────── */}
      <div className="canvas-layer" aria-hidden="true">
        {/*
         * SVG Brushstrokes — organic, expressive strokes in the cyber palette.
         * These float as "painted marks" over the gradient blobs beneath.
         * Rendered as bezier curves with heavy stroke-width + filter: blur().
         */}
        <svg
          className="brushstroke absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Plasma blur filter */}
            <filter id="blur-plasma" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="28" />
            </filter>
            {/* Cyan blur filter */}
            <filter id="blur-cyan" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
            {/* Lime blur filter — softest */}
            <filter id="blur-lime" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="34" />
            </filter>
          </defs>

          {/* Stroke 1: Wide plasma arc — sweeps upper third of canvas */}
          <path
            d="M -80 280 C 200 180, 520 120, 760 200 S 1100 320, 1520 180"
            fill="none"
            stroke="rgba(168, 85, 247, 0.22)"
            strokeWidth="90"
            strokeLinecap="round"
            filter="url(#blur-plasma)"
          />

          {/* Stroke 2: Hot magenta counter-sweep — lower right quadrant */}
          <path
            d="M 900 900 C 1000 750, 1150 680, 1300 600 S 1420 480, 1500 350"
            fill="none"
            stroke="rgba(192, 38, 211, 0.18)"
            strokeWidth="70"
            strokeLinecap="round"
            filter="url(#blur-plasma)"
          />

          {/* Stroke 3: Cyan whip — fast diagonal, top-right corner */}
          <path
            d="M 850 -40 C 980 80, 1100 120, 1200 80 S 1380 -20, 1460 60"
            fill="none"
            stroke="rgba(34, 211, 238, 0.16)"
            strokeWidth="55"
            strokeLinecap="round"
            filter="url(#blur-cyan)"
          />

          {/* Stroke 4: Lime scatter — bottom-left accent */}
          <path
            d="M -60 700 C 80 680, 160 720, 260 680 S 380 600, 420 650"
            fill="none"
            stroke="rgba(163, 230, 53, 0.13)"
            strokeWidth="50"
            strokeLinecap="round"
            filter="url(#blur-lime)"
          />

          {/* Stroke 5: Secondary plasma loop — mid-canvas depth layer */}
          <path
            d="M 300 900 C 350 800, 500 780, 620 820 S 780 880, 900 820"
            fill="none"
            stroke="rgba(124, 58, 237, 0.14)"
            strokeWidth="65"
            strokeLinecap="round"
            filter="url(#blur-plasma)"
          />

          {/* Orb 1: Floating plasma sphere — subtle radial fill, animated pulse */}
          <circle
            cx="200"
            cy="160"
            r="120"
            fill="rgba(124, 58, 237, 0.08)"
            filter="url(#blur-plasma)"
            style={{ animation: 'glowPulse 6s ease-in-out infinite' }}
          />

          {/* Orb 2: Cyan accent orb — top right */}
          <circle
            cx="1280"
            cy="120"
            r="80"
            fill="rgba(34, 211, 238, 0.07)"
            filter="url(#blur-cyan)"
            style={{ animation: 'glowPulse 8s ease-in-out infinite 2s' }}
          />
        </svg>
      </div>

      {/* ── LAYER 1: Titlebar (glass strip, drag region) ───────────────────── */}
      <header
        data-tauri-drag-region
        className="
          fixed top-0 left-0 right-0 z-50 h-9
          flex items-center gap-3 px-4
          backdrop-refract border-b border-glass-border
        "
        style={{ borderRadius: 0 }}
      >
        {/* macOS-style traffic lights — left side */}
        <div className="flex items-center gap-[6px]" data-no-drag>
          <WinBtn color="#ff5f57" hoverColor="#ff3b30" title="Close"    onClick={handleClose}    />
          <WinBtn color="#febc2e" hoverColor="#ffcc00" title="Minimise" onClick={handleMinimise} />
          <WinBtn color="#28c840" hoverColor="#34c759" title="Maximise" onClick={handleMaximise} />
        </div>

        {/* App wordmark — centre-ish, purely decorative */}
        <div className="flex-1 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/25 uppercase">
            ◈ Twelve Pillar Protocol
          </span>
        </div>

        {/* Status indicator — far right */}
        <div className="flex items-center gap-2" data-no-drag>
          <span className="w-1.5 h-1.5 rounded-full bg-neon-lime shadow-[0_0_6px_rgba(163,230,53,0.8)] animate-glow-pulse" />
          <span className="text-[9px] font-mono text-white/25 tracking-wider">LIVE</span>
        </div>
      </header>

      {/* ── LAYER 1: Body — sidebar + main content ────────────────────────── */}
      <div className="relative z-10 flex h-full pt-9">

        {/* Sidebar */}
        <aside
          className="
            w-52 flex-shrink-0 flex flex-col
            backdrop-refract border-r border-glass-border
            px-3 py-4 gap-1
          "
          style={{ borderRadius: 0 }}
        >
          {/* Nav items */}
          <nav className="flex flex-col gap-1 flex-1">
            {navItems.slice(0, 5).map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeNav === item.id}
                onClick={() => setActiveNav(item.id)}
              />
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

          {/* Settings at bottom */}
          <NavItem
            icon={navItems[5].icon}
            label={navItems[5].label}
            active={activeNav === 'settings'}
            onClick={() => setActiveNav('settings')}
          />

          {/* Sidebar footer — version badge */}
          <div className="mt-3 px-3">
            <span className="text-[9px] font-mono text-white/20 tracking-widest">
              v0.1.0 — BUILD 001
            </span>
          </div>
        </aside>

        {/* Main scrollable content area */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: 'thin' }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
