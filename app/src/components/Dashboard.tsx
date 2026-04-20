import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────────── */
type StatusLevel = 'nominal' | 'caution' | 'critical' | 'offline'

interface MetricCard {
  id: string
  title: string
  value: string
  unit?: string
  delta: number          // percentage change, positive = up, negative = down
  status: StatusLevel
  pillar: number         // which pillar this metric belongs to (1-12)
  sparkData: number[]    // 12 data points for sparkline
  description: string
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOCK DATA
   Twelve metrics — one per protocol pillar.
   ───────────────────────────────────────────────────────────────────────────── */
const METRICS: MetricCard[] = [
  {
    id: 'p01',
    title: 'Legitimacy Index',
    value: '94.2',
    unit: '%',
    delta: 2.4,
    status: 'nominal',
    pillar: 1,
    sparkData: [88, 90, 87, 89, 91, 90, 92, 91, 93, 92, 94, 94],
    description: 'Public trust and institutional legitimacy composite',
  },
  {
    id: 'p02',
    title: 'Transparency Score',
    value: '87.6',
    unit: '%',
    delta: -1.2,
    status: 'caution',
    pillar: 2,
    sparkData: [90, 91, 89, 88, 90, 89, 88, 87, 89, 88, 87, 87],
    description: 'Open-data pipeline integrity and audit coverage',
  },
  {
    id: 'p03',
    title: 'Accountability Nodes',
    value: '248',
    unit: '',
    delta: 12,
    status: 'nominal',
    pillar: 3,
    sparkData: [200, 210, 215, 220, 225, 228, 232, 236, 240, 244, 246, 248],
    description: 'Active oversight nodes across governance layers',
  },
  {
    id: 'p04',
    title: 'Threat Vectors',
    value: '7',
    unit: '',
    delta: -2,
    status: 'nominal',
    pillar: 4,
    sparkData: [14, 13, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7],
    description: 'Open high-severity threat register items',
  },
  {
    id: 'p05',
    title: 'Consensus Rate',
    value: '78.9',
    unit: '%',
    delta: -4.1,
    status: 'caution',
    pillar: 5,
    sparkData: [85, 84, 83, 82, 81, 80, 80, 79, 79, 78, 79, 78],
    description: 'Multi-stakeholder consensus on active proposals',
  },
  {
    id: 'p06',
    title: 'Equity Coefficient',
    value: '0.71',
    unit: '',
    delta: 0.8,
    status: 'nominal',
    pillar: 6,
    sparkData: [0.66, 0.67, 0.67, 0.68, 0.68, 0.69, 0.69, 0.70, 0.70, 0.70, 0.71, 0.71],
    description: 'Gini-derived resource distribution equity measure',
  },
  {
    id: 'p07',
    title: 'Resilience Score',
    value: '91.4',
    unit: '%',
    delta: 3.2,
    status: 'nominal',
    pillar: 7,
    sparkData: [82, 84, 85, 86, 87, 88, 88, 89, 90, 91, 91, 91],
    description: 'System fault tolerance and recovery capability',
  },
  {
    id: 'p08',
    title: 'Participation Rate',
    value: '63.2',
    unit: '%',
    delta: -8.5,
    status: 'critical',
    pillar: 8,
    sparkData: [74, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 63],
    description: 'Citizen engagement in active governance cycles',
  },
  {
    id: 'p09',
    title: 'Adaptive Capacity',
    value: '82.1',
    unit: '%',
    delta: 1.6,
    status: 'nominal',
    pillar: 9,
    sparkData: [78, 78, 79, 79, 80, 80, 81, 81, 81, 82, 82, 82],
    description: 'Systemic capacity to integrate new information',
  },
  {
    id: 'p10',
    title: 'Rights Compliance',
    value: '96.8',
    unit: '%',
    delta: 0.3,
    status: 'nominal',
    pillar: 10,
    sparkData: [95, 96, 96, 96, 96, 97, 96, 97, 97, 97, 97, 96],
    description: 'Citizens\' rights layer adherence and enforcement',
  },
  {
    id: 'p11',
    title: 'Knowledge Index',
    value: '58.4',
    unit: '%',
    delta: -12.0,
    status: 'critical',
    pillar: 11,
    sparkData: [72, 70, 68, 67, 65, 64, 63, 62, 61, 60, 59, 58],
    description: 'Collective institutional knowledge retention rate',
  },
  {
    id: 'p12',
    title: 'Coherence Score',
    value: '88.3',
    unit: '%',
    delta: 5.1,
    status: 'nominal',
    pillar: 12,
    sparkData: [80, 81, 82, 83, 84, 84, 85, 86, 87, 87, 88, 88],
    description: 'Cross-pillar systemic coherence and alignment',
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   SPARKLINE
   Minimal SVG polyline. Plots normalized data points as a path.
   ───────────────────────────────────────────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 200
  const h = 40
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const areaPoints = [
    `0,${h}`,
    ...points,
    `${w},${h}`,
  ].join(' ')

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: 36 }}
      aria-hidden="true"
    >
      {/* Area fill */}
      <polygon
        points={areaPoints}
        fill={color}
        opacity="0.08"
      />
      {/* Line */}
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
      {/* Terminal dot */}
      <circle
        cx={w}
        cy={parseFloat(points[points.length - 1].split(',')[1])}
        r="2.5"
        fill={color}
        opacity="0.9"
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATUS CONFIG
   Maps StatusLevel → visual tokens
   ───────────────────────────────────────────────────────────────────────────── */
const STATUS_CONFIG: Record<StatusLevel, {
  label: string
  dotColor: string
  sparkColor: string
  badgeClass: string
  glowClass: string
}> = {
  nominal: {
    label: 'NOMINAL',
    dotColor: '#a3e635',
    sparkColor: '#a3e635',
    badgeClass: 'bg-neon-lime/10 text-neon-lime border border-neon-lime/20',
    glowClass: 'shadow-[0_0_8px_rgba(163,230,53,0.4)]',
  },
  caution: {
    label: 'CAUTION',
    dotColor: '#fbbf24',
    sparkColor: '#fbbf24',
    badgeClass: 'bg-neon-amber/10 text-neon-amber border border-neon-amber/20',
    glowClass: 'shadow-[0_0_8px_rgba(251,191,36,0.4)]',
  },
  critical: {
    label: 'CRITICAL',
    dotColor: '#fb7185',
    sparkColor: '#fb7185',
    badgeClass: 'bg-neon-rose/10 text-neon-rose border border-neon-rose/20',
    glowClass: 'shadow-[0_0_8px_rgba(251,113,133,0.5)]',
  },
  offline: {
    label: 'OFFLINE',
    dotColor: 'rgba(255,255,255,0.25)',
    sparkColor: 'rgba(255,255,255,0.25)',
    badgeClass: 'bg-white/5 text-white/30 border border-white/10',
    glowClass: '',
  },
}

/* ─────────────────────────────────────────────────────────────────────────────
   GLASS CARD
   The atomic refractive unit. Demonstrates the full glass + lens mechanic.

   CSS classes applied (from index.css):
     backdrop-refract  — frosted-glass backdrop-filter stack (blur + saturate + brightness)
     refract-lens      — lens magnification via scale(1.003 → 1.007 on hover)
     glass-shimmer     — horizontal light sweep pseudo-element on hover
     plasma-border     — animated gradient border ring on hover
   ───────────────────────────────────────────────────────────────────────────── */
interface GlassCardProps {
  card: MetricCard
  animationDelay?: number
}

function GlassCard({ card, animationDelay = 0 }: GlassCardProps) {
  const [expanded, setExpanded] = useState(false)
  const cfg = STATUS_CONFIG[card.status]

  const deltaAbs = Math.abs(card.delta)
  const deltaUp  = card.delta > 0
  const deltaStr = `${deltaUp ? '+' : '−'}${deltaAbs}${card.unit === '%' ? 'pp' : ''}`

  // Delta text colour: lime if up/good, rose if down/bad
  const deltaColor =
    card.status === 'critical'
      ? 'text-neon-rose'
      : card.status === 'caution'
      ? 'text-neon-amber'
      : deltaUp
      ? 'text-neon-lime'
      : 'text-neon-rose'

  return (
    <article
      className="
        backdrop-refract refract-lens glass-shimmer plasma-border
        rounded-2xl p-5 flex flex-col gap-3 cursor-default
        animate-fade-in-up
      "
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: 'both' }}
      onClick={() => setExpanded(e => !e)}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpanded(p => !p) }}
      aria-label={`${card.title}: ${card.value}${card.unit}`}
    >
      {/* ── Top accent line: plasma gradient ──────────────────────────── */}
      <div
        className="h-px w-full rounded-full"
        style={{
          background: `linear-gradient(90deg,
            transparent 0%,
            ${cfg.sparkColor}55 30%,
            ${cfg.sparkColor}99 50%,
            ${cfg.sparkColor}55 70%,
            transparent 100%
          )`,
        }}
      />

      {/* ── Header row: pillar number + status badge ───────────────────── */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-white/25 tracking-[0.25em] uppercase">
          PILLAR {String(card.pillar).padStart(2, '0')}
        </span>

        <span
          className={`
            flex items-center gap-1.5 px-2 py-0.5 rounded-full
            text-[8px] font-mono tracking-[0.15em] uppercase
            ${cfg.badgeClass}
          `}
        >
          {/* Animated status dot */}
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: cfg.dotColor,
              boxShadow: `0 0 5px ${cfg.dotColor}`,
              animation: card.status !== 'offline'
                ? 'glowPulse 2.5s ease-in-out infinite'
                : 'none',
            }}
          />
          {cfg.label}
        </span>
      </div>

      {/* ── Metric title ───────────────────────────────────────────────── */}
      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40 leading-none">
        {card.title}
      </p>

      {/* ── Primary value display ──────────────────────────────────────── */}
      <div className="flex items-end gap-2">
        <span
          className="text-4xl font-mono font-bold leading-none text-white tabular-nums"
          style={{ textShadow: `0 0 20px ${cfg.sparkColor}30` }}
        >
          {card.value}
        </span>
        {card.unit && (
          <span className="text-lg font-mono text-white/35 mb-0.5">{card.unit}</span>
        )}
        <span className={`text-xs font-mono ml-auto ${deltaColor} tabular-nums`}>
          {deltaStr}
        </span>
      </div>

      {/* ── Sparkline ─────────────────────────────────────────────────── */}
      <div className="mt-1">
        <Sparkline data={card.sparkData} color={cfg.sparkColor} />
      </div>

      {/* ── Bottom divider + description (expanded) ───────────────────── */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: expanded ? 60 : 0, opacity: expanded ? 1 : 0 }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-2" />
        <p className="text-[10px] font-mono text-white/30 leading-relaxed">
          {card.description}
        </p>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUMMARY BAR
   Global protocol health at a glance — sits above the card grid.
   ───────────────────────────────────────────────────────────────────────────── */
function SummaryBar() {
  const nominal  = METRICS.filter(m => m.status === 'nominal').length
  const caution  = METRICS.filter(m => m.status === 'caution').length
  const critical = METRICS.filter(m => m.status === 'critical').length
  const health   = Math.round((nominal / METRICS.length) * 100)

  return (
    <div className="backdrop-refract refract-lens glass-shimmer rounded-2xl px-6 py-4 flex items-center gap-6">
      {/* Health score */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[9px] font-mono text-white/25 tracking-[0.25em] uppercase">
          Protocol Health
        </span>
        <span className="text-2xl font-mono font-bold text-white tabular-nums">
          {health}
          <span className="text-sm text-white/35 ml-1">%</span>
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-white/10 flex-shrink-0" />

      {/* Status breakdown */}
      <div className="flex items-center gap-5">
        {[
          { count: nominal,  color: '#a3e635', label: 'Nominal'  },
          { count: caution,  color: '#fbbf24', label: 'Caution'  },
          { count: critical, color: '#fb7185', label: 'Critical' },
        ].map(({ count, color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span className="text-[9px] font-mono text-white/35 uppercase tracking-wider">
              {label}
            </span>
            <span className="text-sm font-mono font-semibold text-white tabular-nums">
              {count}
            </span>
          </div>
        ))}
      </div>

      {/* Right: timestamp */}
      <div className="ml-auto flex flex-col items-end gap-0.5">
        <span className="text-[9px] font-mono text-white/20 tracking-[0.2em] uppercase">
          Last Updated
        </span>
        <span className="text-xs font-mono text-white/40 tabular-nums">
          {new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADER
   ───────────────────────────────────────────────────────────────────────────── */
function SectionHeader() {
  return (
    <div className="flex items-center gap-4">
      <div>
        <h1 className="text-sm font-mono font-semibold text-white/80 tracking-[0.15em] uppercase">
          Protocol Dashboard
        </h1>
        <p className="text-[10px] font-mono text-white/30 tracking-wider mt-0.5">
          Twelve-pillar health monitor — all metrics live
        </p>
      </div>

      {/* Horizontal rule with gradient */}
      <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />

      {/* Filter hint */}
      <span className="text-[9px] font-mono text-white/20 tracking-wider">
        CLICK CARD TO EXPAND
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DASHBOARD
   The master reference component. Demonstrates:
     • .backdrop-refract — refractive glass mechanic on every card
     • .refract-lens     — lens magnification per card
     • .glass-shimmer    — shimmer sweep on hover
     • .plasma-border    — glowing border ring on hover
     • Layer 0 visibility through all cards as they scroll
   ───────────────────────────────────────────────────────────────────────────── */
export function Dashboard() {
  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Section header */}
      <SectionHeader />

      {/* Summary bar */}
      <SummaryBar />

      {/* ── Primary 3-col grid — 12 metric cards ───────────────────────── */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {METRICS.map((card, i) => (
          <GlassCard
            key={card.id}
            card={card}
            animationDelay={i * 40}
          />
        ))}
      </div>

      {/* ── Bottom padding for scroll breathing room ────────────────────── */}
      <div className="h-6" />
    </div>
  )
}
