// app/src/components/diagrams/V014_DemurrageCalculator.tsx
// Interactive progressive net-worth demurrage calculator with live chart
import { useState, useRef, useEffect, useCallback } from 'react'
import { THEME } from './DiagramTheme'
import type { DiagramProps } from './index'

const MONOSPACE = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'

const fmtCompact = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 })
const fmtFull   = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const fmtPct    = (v: number) => (v * 100).toFixed(2) + '%'
const fmtAcct   = (v: number) => v < 0 ? '(' + fmtFull.format(-v) + ')' : fmtFull.format(v)

const COLORS = {
  nw:     THEME.flow.accent,
  s:      THEME.ea.accent,
  mstar:  THEME.voice.accent,
  r:      THEME.sr.accent,
  income: THEME.ss.accent,
  age:    '#8ba7c4',
}

// Constitutional tier boundaries (NW values) — ANNEX_D §D2.2
// M*=$1M (T1/T2), W*=$22M (T2/T3), W**=$50M (T3/T4)
const TIER_NW     = [1_000_000, 22_000_000, 50_000_000] as const
const TIER_COLORS = ['#58a6ff', '#3fb950', '#f0883e', '#ff7b72'] as const  // T1→T4
const TIER_R_WORKING = [0.26, 0.30, 0.38, 0.46] as const
const TIER_R_RETIRED = [0.18, 0.30, 0.38, 0.46] as const  // T1 only per §D10.1

function calc(nw: number, s: number, r: number, income: number, age: number) {
  const E  = Math.max(0, nw - s)
  const e1 = Math.max(0, TIER_NW[0] - s)
  const e2 = Math.max(0, TIER_NW[1] - s)
  const e3 = Math.max(0, TIER_NW[2] - s)
  const TR = age >= 65 ? TIER_R_RETIRED : TIER_R_WORKING

  const D_t1 = TR[0] * Math.min(E, e1)
  const D_t2 = TR[1] * Math.max(0, Math.min(E, e2) - e1)
  const D_t3 = TR[2] * Math.max(0, Math.min(E, e3) - e2)
  const D_t4 = TR[3] * Math.max(0, E - e3)
  const D      = D_t1 + D_t2 + D_t3 + D_t4
  const lambda = E > 0 ? D / E : 0

  const returns    = nw * r
  const netAnnual  = income + returns - D
  const breakEven  = Math.max(0, D - returns)
  const belowFloor = nw < s

  const yearsToFloor = belowFloor
    ? (netAnnual > 0 ? (s - nw) / netAnnual : Infinity)
    : (netAnnual < 0 ? (nw - s) / Math.abs(netAnnual) : Infinity)

  const aboveWdstar = nw > TIER_NW[2] ? nw - TIER_NW[2] : 0
  const netLoss     = D - returns - income
  const yearsToEquil = aboveWdstar > 0 && netLoss > 0 ? aboveWdstar / netLoss : null
  const retired = age >= 65

  // Marginal tier label
  const marginalTier = nw <= s ? '< S'
    : nw <= TIER_NW[0] ? 'T1'
    : nw <= TIER_NW[1] ? 'T2'
    : nw <= TIER_NW[2] ? 'T3'
    : 'T4'

  return { E, lambda, D, returns, netAnnual, breakEven, yearsToFloor, belowFloor, yearsToEquil, retired, marginalTier }
}

interface Params { nw: number; s: number; r: number; income: number; age: number }

const DEFAULTS: Params = { nw: 1_500_000, s: 50_000, r: 0.07, income: 160_000, age: 46 }

const PRESETS: { label: string; p: Params }[] = [
  { label: 'Recent grad — first job',           p: { nw:    80_000, s: 50_000, r: 0.07, income:  48_000, age: 24 } },
  { label: 'Middle-class worker',               p: { nw:   280_000, s: 50_000, r: 0.07, income:  75_000, age: 38 } },
  { label: 'Dual-income household',             p: { nw: 1_500_000, s: 50_000, r: 0.07, income: 160_000, age: 46 } },
  { label: 'Business owner / entrepreneur',     p: { nw: 3_000_000, s: 50_000, r: 0.07, income: 300_000, age: 50 } },
  { label: 'Senior professional',               p: { nw: 3_000_000, s: 50_000, r: 0.07, income: 350_000, age: 52 } },
  { label: 'Early retiree — no relief at 61',   p: { nw: 5_000_000, s: 50_000, r: 0.07, income:       0, age: 61 } },
  { label: 'Retiree — age 65+ modifier active', p: { nw: 4_000_000, s: 50_000, r: 0.07, income:  90_000, age: 68 } },
  { label: 'Approaching the ceiling',           p: { nw:20_000_000, s: 50_000, r: 0.07, income: 500_000, age: 45 } },
  { label: 'Well above ceiling',                p: { nw:60_000_000, s: 50_000, r: 0.07, income: 800_000, age: 40 } },
]

const SLIDER_TIPS: Record<string, string> = {
  nw:     'Your total assessed net worth: all cash, investments, real property, and equity stakes — aggregated across all beneficial interests. The oracle verifies this annually (§D2.6).',
  s:      'Participation floor — no demurrage applies below this level. Bootstrap value $50K; live value = 18 months × regional median consumption (§D2.1). This is a constitutional parameter — drag to explore different floor settings.',
  r:      'Annual real return assumed on NW for passive income. Constitutional system default is 3% real (bootstrap); 7% reflects a typical long-run equity return. Affects passive returns and break-even income calculations (§D2.3).',
  income: 'Annual earned income before demurrage. Demurrage is paid from income + passive returns combined. If both fall short of the obligation, NW decays toward S.',
  age:    'Dragging forward simulates NW year-by-year compounding. At age 65+ the T1 rate drops from 26% to 18% — but only if labor income ≤ 1× regional median consumption (§D10.1 retirement modifier).',
}

function Slider({ label, id, min, max, step, value, fmt, color, tipKey, onChange }: {
  label: string; id: string; min: number; max: number; step: number
  value: number; fmt: (v: number) => string; color: string; tipKey: string
  onChange: (v: number) => void
}) {
  const [tipOpen, setTipOpen] = useState(false)
  const tip = SLIDER_TIPS[tipKey]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, fontFamily: MONOSPACE }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: THEME.dim }}>{label}</span>
          {tip && (
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <span
                onMouseEnter={() => setTipOpen(true)}
                onMouseLeave={() => setTipOpen(false)}
                style={{
                  fontSize: 10, color: '#8ba7c4', cursor: 'help',
                  border: '1px solid #8ba7c4', borderRadius: '50%',
                  width: 15, height: 15, display: 'inline-flex', alignItems: 'center',
                  justifyContent: 'center', lineHeight: 1, userSelect: 'none',
                  fontWeight: 700, background: 'rgba(139,167,196,0.12)',
                }}
              >i</span>
              {tipOpen && (
                <div style={{
                  position: 'absolute', left: 0, bottom: '130%', zIndex: 30,
                  background: '#1c2128', border: `1px solid ${THEME.border}`,
                  borderRadius: 5, padding: '7px 10px', fontSize: 10,
                  color: THEME.subtext, width: 230, lineHeight: 1.55,
                  pointerEvents: 'none', boxShadow: '0 6px 16px rgba(0,0,0,0.6)',
                  whiteSpace: 'normal',
                }}>
                  {tip}
                </div>
              )}
            </span>
          )}
        </div>
        <span style={{ color, fontWeight: 600 }}>{fmt(value)}</span>
      </div>
      <input
        type="range" id={id} min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: color, cursor: 'pointer' }}
      />
    </div>
  )
}

function StatTile({ label, value, sub, color, def }: { label: string; value: string; sub?: string; color: string; def: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#161b22', padding: '7px 10px', display: 'flex', flexDirection: 'column', gap: 1, cursor: 'default', position: 'relative', borderRight: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}
    >
      <div style={{ fontSize: 9, color: THEME.dim, letterSpacing: '0.05em' }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color, marginTop: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 9, color: THEME.dim, marginTop: 1 }}>{sub}</div>}
      {hovered && (
        <div style={{
          position: 'absolute', bottom: '100%', left: 0, zIndex: 10,
          background: '#1c2128', border: `1px solid #FFD700`, borderRadius: 4,
          padding: '5px 8px', fontSize: 10, color: THEME.subtext, whiteSpace: 'nowrap',
          pointerEvents: 'none', marginBottom: 4, lineHeight: 1.4,
          boxShadow: '0 0 12px 4px rgba(255, 215, 0, 0.6), 0 0 24px 8px rgba(255, 215, 0, 0.25)',
        }}>
          {def}
        </div>
      )}
    </div>
  )
}

// Anchor view to show current NW and the next tier boundary above it
function autoView(nw: number): { xMin: number; xMax: number } {
  const ref = nw < TIER_NW[0] ? TIER_NW[0]
            : nw < TIER_NW[1] ? TIER_NW[1]
            : nw < TIER_NW[2] ? TIER_NW[2]
            : nw
  const lo  = Math.min(nw, ref)
  const hi  = Math.max(nw, ref)
  const pad = Math.max((hi - lo) * 0.25, hi * 0.1, 500_000)
  return { xMin: Math.max(0, lo - pad), xMax: hi + pad }
}

const CHART_MG = { top: 16, right: 16, bottom: 40, left: 72 }

function simulateNW(startNw: number, startAge: number, targetAge: number, params: Params): number {
  let nw = startNw
  const years = Math.round(targetAge - startAge)
  for (let y = 0; y < years; y++) {
    const age = startAge + y
    const { netAnnual } = calc(nw, params.s, params.r, params.income, age)
    nw = Math.max(0, nw + netAnnual)
  }
  return nw
}

export function V014_DemurrageCalculator(_props: DiagramProps) {
  const [p, setP] = useState<Params>(DEFAULTS)
  const ageSnapRef = useRef<{ nw: number; age: number } | null>(null)
  const [hoverNW, setHoverNW]   = useState<number | null>(null)
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)

  const view = autoView(p.nw)

  const set = (key: keyof Params) => (v: number) => {
    if (key === 'age') {
      setP(prev => {
        if (!ageSnapRef.current) ageSnapRef.current = { nw: prev.nw, age: prev.age }
        const snap = ageSnapRef.current
        const simNw = v >= snap.age
          ? simulateNW(snap.nw, snap.age, v, { ...prev, age: snap.age })
          : snap.nw
        return { ...prev, age: v, nw: simNw }
      })
    } else {
      if (key === 'nw') ageSnapRef.current = null
      setP(prev => ({ ...prev, [key]: v }))
    }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return

    const dpr = window.devicePixelRatio || 1
    const w   = wrap.clientWidth
    const h   = wrap.clientHeight
    canvas.width  = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, w, h)

    const mg = CHART_MG
    const dw = w - mg.left - mg.right
    const dh = h - mg.top - mg.bottom

    const { xMin, xMax } = view
    const span = xMax - xMin

    const steps = 200
    let maxD = 1000
    for (let i = 0; i <= steps; i++) {
      const xv = xMin + (i / steps) * span
      const d = calc(xv, p.s, p.r, p.income, p.age).D
      if (d > maxD) maxD = d
    }
    maxD *= 1.1

    const mx = (v: number) => mg.left + ((v - xMin) / span) * dw
    const my = (v: number) => mg.top + dh - (v / maxD) * dh

    ctx.font = `10px ${MONOSPACE}`

    // Grid
    const rawStep = span / 5
    const mag = Math.pow(10, Math.floor(Math.log10(rawStep)))
    const tickStep = Math.ceil(rawStep / mag) * mag
    const firstTick = Math.ceil(xMin / tickStep) * tickStep

    ctx.strokeStyle = THEME.divider
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = firstTick; x <= xMax + tickStep * 0.01; x += tickStep) {
      const px = mx(x)
      if (px < mg.left - 1 || px > mg.left + dw + 1) continue
      ctx.moveTo(px, mg.top)
      ctx.lineTo(px, mg.top + dh)
      ctx.fillStyle = THEME.dim
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      const label = x >= 1_000_000 ? `${(x / 1_000_000).toFixed(x % 1_000_000 === 0 ? 0 : 1)}M`
                  : x >= 1_000     ? `${(x / 1_000).toFixed(0)}K`
                  : `${x}`
      ctx.fillText(label, px, mg.top + dh + 6)
    }
    for (let i = 0; i <= 4; i++) {
      const yv = (maxD / 4) * i
      const y  = my(yv)
      ctx.moveTo(mg.left, y)
      ctx.lineTo(mg.left + dw, y)
      if (i > 0) {
        ctx.fillStyle = THEME.dim
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(fmtCompact.format(yv), mg.left - 6, y)
      }
    }
    ctx.stroke()

    // Axis labels
    ctx.fillStyle = THEME.dim
    ctx.font = `10px ${MONOSPACE}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('Net Worth', mg.left + dw / 2, h - 2)
    ctx.save()
    ctx.translate(12, mg.top + dh / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textBaseline = 'top'
    ctx.fillText('Annual Demurrage', 0, 0)
    ctx.restore()

    // Draw a tier boundary marker if it's in viewport
    const drawMarker = (nwVal: number, label: string, dash: number[]) => {
      if (nwVal < xMin || nwVal > xMax) return
      const px = mx(nwVal)
      ctx.beginPath()
      ctx.strokeStyle = COLORS.mstar
      ctx.lineWidth = 1
      ctx.setLineDash(dash)
      ctx.moveTo(px, mg.top)
      ctx.lineTo(px, mg.top + dh)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = COLORS.mstar
      ctx.font = `9px ${MONOSPACE}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(label, px, mg.top + 2)
    }

    // S floor
    if (p.s > 0 && p.s >= xMin && p.s <= xMax) {
      const px = mx(p.s)
      ctx.beginPath()
      ctx.strokeStyle = COLORS.s
      ctx.lineWidth = 1
      ctx.setLineDash([2, 5])
      ctx.moveTo(px, mg.top)
      ctx.lineTo(px, mg.top + dh)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = COLORS.s
      ctx.font = `9px ${MONOSPACE}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText('S', px, mg.top + 2)
    }

    drawMarker(TIER_NW[0], 'M*',  [4, 3])
    drawMarker(TIER_NW[1], 'W*',  [3, 4])
    drawMarker(TIER_NW[2], 'W**', [1, 5])

    // Tier zone fills (faint background)
    const TIER_RANGES = [
      { lo: 0,          hi: TIER_NW[0], color: TIER_COLORS[0] },
      { lo: TIER_NW[0], hi: TIER_NW[1], color: TIER_COLORS[1] },
      { lo: TIER_NW[1], hi: TIER_NW[2], color: TIER_COLORS[2] },
      { lo: TIER_NW[2], hi: xMax + 1,   color: TIER_COLORS[3] },
    ]
    ctx.save()
    TIER_RANGES.forEach(({ lo, hi, color }) => {
      const lx = Math.max(mx(lo), mg.left)
      const rx = Math.min(mx(hi), mg.left + dw)
      if (lx >= rx) return
      ctx.fillStyle = color
      ctx.globalAlpha = 0.07
      ctx.fillRect(lx, mg.top, rx - lx, dh)
    })
    ctx.restore()

    // Colored x-axis tier bands
    const BAND_H = 5
    TIER_RANGES.forEach(({ lo, hi, color }) => {
      const lx = Math.max(mx(lo), mg.left)
      const rx = Math.min(mx(hi), mg.left + dw)
      if (lx >= rx) return
      ctx.fillStyle = color
      ctx.globalAlpha = 0.5
      ctx.fillRect(lx, mg.top + dh - BAND_H, rx - lx, BAND_H)
      ctx.globalAlpha = 1
    })

    // Curve — drawn in 4 tier-colored segments
    ctx.setLineDash([])
    const tierSegs = [
      { lo: 0,          hi: TIER_NW[0], color: TIER_COLORS[0] },
      { lo: TIER_NW[0], hi: TIER_NW[1], color: TIER_COLORS[1] },
      { lo: TIER_NW[1], hi: TIER_NW[2], color: TIER_COLORS[2] },
      { lo: TIER_NW[2], hi: Infinity,   color: TIER_COLORS[3] },
    ]
    tierSegs.forEach(({ lo, hi, color }) => {
      const segLo = Math.max(lo, xMin)
      const segHi = hi === Infinity ? xMax : Math.min(hi, xMax)
      if (segLo >= segHi) return
      const pts = 80
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2.5
      for (let i = 0; i <= pts; i++) {
        const xv = segLo + (i / pts) * (segHi - segLo)
        const yv = calc(xv, p.s, p.r, p.income, p.age).D
        i === 0 ? ctx.moveTo(mx(xv), my(yv)) : ctx.lineTo(mx(xv), my(yv))
      }
      ctx.stroke()
    })

    // Current NW marker
    const { D } = calc(p.nw, p.s, p.r, p.income, p.age)
    const markerX = mx(p.nw)
    const markerY = my(D)
    ctx.beginPath()
    ctx.strokeStyle = COLORS.nw
    ctx.lineWidth = 1.5
    ctx.setLineDash([4, 4])
    ctx.moveTo(markerX, mg.top)
    ctx.lineTo(markerX, mg.top + dh)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.fillStyle = COLORS.nw
    ctx.arc(markerX, markerY, 5, 0, Math.PI * 2)
    ctx.fill()

    // Hover crosshair
    if (hoverNW !== null && hoverNW >= xMin && hoverNW <= xMax) {
      const hx = mx(hoverNW)
      const hd = calc(hoverNW, p.s, p.r, p.income, p.age).D
      const hy = my(hd)
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255,215,0,0.35)'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.moveTo(hx, mg.top)
      ctx.lineTo(hx, mg.top + dh)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.shadowColor = '#FFD700'
      ctx.shadowBlur = 14
      ctx.fillStyle = '#FFD700'
      ctx.arc(hx, hy, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }, [p, view, hoverNW])

  useEffect(() => { draw() }, [draw])
  useEffect(() => {
    const ro = new ResizeObserver(draw)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [draw])

  const { E, lambda, D, returns, netAnnual, breakEven, yearsToFloor, belowFloor, yearsToEquil, retired, marginalTier } = calc(p.nw, p.s, p.r, p.income, p.age)

  const yearsLabel = (() => {
    if (p.nw === p.s) return '—'
    if (yearsToFloor === Infinity) return belowFloor ? '—' : 'growing'
    if (yearsToFloor > 999) return '>999 yrs'
    return yearsToFloor.toFixed(0) + ' yrs'
  })()

  const netAnnualColor = netAnnual >= 0 ? THEME.ea.accent : THEME.ss.accent
  const yearsColor = belowFloor
    ? (yearsToFloor < Infinity ? COLORS.mstar : THEME.ss.accent)
    : (yearsToFloor > 50 || yearsToFloor === Infinity ? THEME.ea.accent : yearsToFloor > 20 ? COLORS.mstar : THEME.ss.accent)
  const yearsFloorLabel = belowFloor ? 'Yrs to S ↑' : 'Yrs to floor'
  const yearsFloorDef   = belowFloor
    ? 'Years to accumulate up to S at current income + returns (no demurrage below floor)'
    : 'Years until NW decays to S at current net rate'

  const rateDefText = retired
    ? 'Retirement modifier active (§D10.1): T1 18% / T2 30% / T3 38% / T4 46% — T1 reduced only'
    : 'Effective (blended) rate = D ÷ E. Founding rates: T1 26% / T2 30% / T3 38% / T4 46%'

  return (
    <div style={{
      background: '#0d1117', border: `1px solid ${THEME.border}`, borderRadius: 8,
      padding: 12, display: 'flex', flexDirection: 'column', gap: 10,
      fontFamily: MONOSPACE,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${THEME.border}`, paddingBottom: 8, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 11, color: THEME.dim, letterSpacing: '0.06em' }}>
          <span style={{ color: COLORS.nw, fontWeight: 700 }}>V-014</span>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>·</span>
          Progressive Net-Worth Demurrage Calculator
        </div>
        <select
          onChange={e => { const preset = PRESETS[+e.target.value]; if (preset) { ageSnapRef.current = null; setP(preset.p) } }}
          style={{
            background: '#161b22', border: `1px solid ${THEME.border}`, borderRadius: 4,
            color: THEME.subtext, fontSize: 11, fontFamily: MONOSPACE, padding: '3px 6px',
            cursor: 'pointer', outline: 'none',
          }}
          defaultValue=""
        >
          <option value="" disabled>Scenario…</option>
          {PRESETS.map((pr, i) => <option key={i} value={i}>{pr.label}</option>)}
        </select>
      </div>

      {/* Body: sliders left, chart right */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{
          background: '#161b22', border: `1px solid ${THEME.border}`, borderRadius: 6,
          padding: 10, display: 'flex', flexDirection: 'column', gap: 10,
          minWidth: 200, flex: '0 0 200px',
        }}>
          <Slider label="Net Worth (NW)" id="nw" min={0} max={144_000_000} step={10_000}
            value={p.nw} fmt={fmtCompact.format.bind(fmtCompact)} color={COLORS.nw} tipKey="nw" onChange={set('nw')} />
          <Slider label="Floor (S) — policy var." id="s" min={0} max={2_000_000} step={10_000}
            value={p.s} fmt={fmtCompact.format.bind(fmtCompact)} color={COLORS.s} tipKey="s" onChange={set('s')} />
          <Slider label="Assumed Return (r)" id="r" min={0.01} max={0.30} step={0.001}
            value={p.r} fmt={v => (v * 100).toFixed(1) + '%'} color={COLORS.r} tipKey="r" onChange={set('r')} />
          <Slider label="Annual Income (I)" id="income" min={0} max={2_000_000} step={5_000}
            value={p.income} fmt={fmtCompact.format.bind(fmtCompact)} color={COLORS.income} tipKey="income" onChange={set('income')} />
          <Slider label="Age" id="age" min={18} max={90} step={1}
            value={p.age} fmt={v => v.toFixed(0) + ' yrs'} color={p.age >= 65 ? THEME.voice.accent : COLORS.age} tipKey="age" onChange={set('age')} />
          {p.age >= 65 && (
            <div style={{ fontSize: 9, color: THEME.voice.accent, letterSpacing: '0.05em', textAlign: 'center', background: '#1c200a', border: `1px solid ${THEME.voice.accent}33`, borderRadius: 3, padding: '3px 6px' }}>
              RETIREMENT MODIFIER ACTIVE · T1 18% (§D10.1)
            </div>
          )}
          {/* Static tier reference */}
          <div style={{ borderTop: `1px solid ${THEME.border}`, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: 9, color: THEME.dim, letterSpacing: '0.05em' }}>TIER BOUNDARIES (constitutional)</div>
            {[
              { label: 'M* — T1/T2',  val: '$1M',  color: TIER_COLORS[1] },
              { label: 'W* — T2/T3',  val: '$22M', color: TIER_COLORS[2] },
              { label: 'W** — T3/T4', val: '$50M', color: TIER_COLORS[3] },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                <span style={{ color: THEME.dim }}>{label}</span>
                <span style={{ color, fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div
          ref={wrapRef}
          style={{ flex: '1 1 320px', minHeight: 320, position: 'relative' }}
          onMouseMove={e => {
            const rect = wrapRef.current?.getBoundingClientRect()
            if (!rect) return
            const dw = rect.width - CHART_MG.left - CHART_MG.right
            const relX = e.clientX - rect.left - CHART_MG.left
            const nwVal = view.xMin + (relX / dw) * (view.xMax - view.xMin)
            if (nwVal >= 0 && relX >= 0 && relX <= dw) {
              setHoverNW(nwVal)
              setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
            } else {
              setHoverNW(null); setHoverPos(null)
            }
          }}
          onMouseLeave={() => { setHoverNW(null); setHoverPos(null) }}
        >
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          {hoverNW !== null && hoverPos && (() => {
            const hs = calc(hoverNW, p.s, p.r, p.income, p.age)
            const left = hoverPos.x + 14
            return (
              <div style={{
                position: 'absolute', top: Math.max(8, hoverPos.y - 90), left,
                zIndex: 20, pointerEvents: 'none',
                background: '#1c2128', border: '1px solid #FFD700', borderRadius: 6,
                padding: '8px 12px', fontFamily: MONOSPACE, whiteSpace: 'nowrap',
                boxShadow: '0 0 12px 4px rgba(255,215,0,0.6), 0 0 28px 10px rgba(255,215,0,0.22)',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#FFD700', marginBottom: 5 }}>
                  {fmtCompact.format(hoverNW)}
                </div>
                {[
                  { label: 'Annual D',  value: fmtAcct(hs.D),         color: '#e3b341' },
                  { label: 'Bi-weekly', value: fmtAcct(hs.D / 26),    color: '#FFD700' },
                  { label: 'Rate (λ)',  value: fmtPct(hs.lambda),      color: THEME.dim },
                  { label: 'Net Δ',     value: fmtAcct(hs.netAnnual),  color: hs.netAnnual >= 0 ? THEME.ea.accent : THEME.ss.accent },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 11, color: THEME.dim, marginTop: 2 }}>
                    <span>{label}</span>
                    <span style={{ color, fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      </div>

      {/* Stats + Legend row */}
      <div style={{ display: 'flex', gap: 0, border: `1px solid ${THEME.border}`, borderRadius: 6, overflow: 'visible' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 0, flex: 1, borderRight: `1px solid ${THEME.border}` }}>
          {[
            { label: 'Excess (E)',    value: fmtAcct(E),       sub: undefined,                      color: THEME.subtext, def: 'NW above the participation floor — the taxable base for demurrage' },
            { label: 'Rate (λ)',      value: fmtPct(lambda),   sub: `marginal tier: ${marginalTier}`, color: THEME.subtext, def: rateDefText },
            { label: 'Demurrage',     value: fmtAcct(D),       sub: `${fmtAcct(D / 26)} / bi-weekly`, color: '#e3b341',     def: 'Annual demurrage obligation (annual ÷ 26 = bi-weekly settlement)' },
            { label: 'Returns',       value: fmtAcct(returns), sub: undefined,                      color: COLORS.r,      def: 'Passive income at assumed return rate r on NW' },
            { label: 'Net annual Δ',  value: fmtAcct(netAnnual), sub: undefined,                    color: netAnnualColor, def: 'Income + returns − demurrage. Positive = wealth grows; negative = NW decays toward S.' },
            { label: 'Min active income', value: breakEven > 0 ? fmtAcct(breakEven) : 'covered', sub: undefined,        color: breakEven > 0 ? COLORS.income : THEME.ea.accent, def: 'Minimum earned income to prevent NW eroding — where demurrage exceeds passive returns' },
            { label: yearsFloorLabel, value: yearsLabel,       sub: undefined,                      color: yearsColor,    def: yearsFloorDef },
            ...(yearsToEquil !== null ? [{ label: 'Yrs to W**', value: yearsToEquil.toFixed(0) + ' yrs', sub: undefined, color: COLORS.mstar, def: 'Years to descend from above W** ($50M) to equilibrium at current net rate' }] : []),
          ].map(({ label, value, sub, color, def }) => (
            <StatTile key={label} label={label} value={value} sub={sub} color={color} def={def} />
          ))}
        </div>

        {/* Legend */}
        <div style={{
          background: '#161b22', padding: '10px 12px', width: 170, flexShrink: 0,
          display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center',
        }}>
          <div style={{ fontSize: 9, color: THEME.dim, letterSpacing: '0.05em' }}>CHART</div>
          {[
            { swatch: TIER_COLORS[0], line: true,  label: 'T1 — < M* ($1M)' },
            { swatch: TIER_COLORS[1], line: true,  label: 'T2 — M* → W* ($22M)' },
            { swatch: TIER_COLORS[2], line: true,  label: 'T3 — W* → W** ($50M)' },
            { swatch: TIER_COLORS[3], line: true,  label: 'T4 — > W**' },
            { swatch: COLORS.nw,      line: false, label: 'Current net worth' },
            { swatch: COLORS.s,       line: true,  label: 'S — floor' },
            { swatch: COLORS.mstar,   line: true,  label: 'M* / W* / W** bounds' },
          ].map(({ swatch, line, label }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, color: THEME.subtext }}>
              {line
                ? <span style={{ width: 16, height: 2, background: swatch, flexShrink: 0, borderRadius: 1 }} />
                : <span style={{ width: 8, height: 8, borderRadius: '50%', background: swatch, flexShrink: 0, margin: '0 4px' }} />}
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
