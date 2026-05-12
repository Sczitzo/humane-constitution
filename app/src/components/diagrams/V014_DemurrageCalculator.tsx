// app/src/components/diagrams/V014_DemurrageCalculator.tsx
// Interactive progressive net-worth demurrage calculator with live chart
import { useState, useRef, useEffect, useCallback } from 'react'
import { THEME } from './DiagramTheme'
import type { DiagramProps } from './index'

const MONOSPACE = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'

const fmtCompact = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 })
const fmtFull   = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const fmtPct    = (v: number) => (v * 100).toFixed(2) + '%'

function calc(nw: number, s: number, wstar: number, r: number) {
  const E      = Math.max(0, nw - s)
  const E_star = Math.max(1, wstar - s)
  const lambda = E > 0 ? r * Math.sqrt(E / E_star) : 0
  const D      = lambda * E
  return { E, lambda, D }
}

interface Params { nw: number; s: number; wstar: number; r: number }

const DEFAULTS: Params = { nw: 10_000_000, s: 500_000, wstar: 22_000_000, r: 0.07 }

function Slider({ label, id, min, max, step, value, fmt, onChange }: {
  label: string; id: string; min: number; max: number; step: number
  value: number; fmt: (v: number) => string; onChange: (v: number) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: MONOSPACE }}>
        <span style={{ color: THEME.dim }}>{label}</span>
        <span style={{ color: THEME.flow.accent, fontWeight: 600 }}>{fmt(value)}</span>
      </div>
      <input
        type="range" id={id} min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: THEME.flow.accent, cursor: 'pointer' }}
      />
    </div>
  )
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 12, fontFamily: MONOSPACE, paddingBottom: 6,
      borderBottom: `1px dashed ${THEME.border}`,
    }}>
      <span style={{ color: THEME.dim }}>{label}</span>
      <span style={{ fontWeight: 600, color: highlight ? '#e3b341' : THEME.subtext }}>{value}</span>
    </div>
  )
}

export function V014_DemurrageCalculator(_props: DiagramProps) {
  const [p, setP] = useState<Params>(DEFAULTS)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)

  const set = (key: keyof Params) => (v: number) => setP(prev => ({ ...prev, [key]: v }))

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

    const mg = { top: 16, right: 16, bottom: 40, left: 72 }
    const dw = w - mg.left - mg.right
    const dh = h - mg.top - mg.bottom

    const maxNW = 100_000_000
    const maxD  = Math.max(1000, calc(maxNW, p.s, p.wstar, p.r).D * 1.1)

    const mx = (v: number) => mg.left + (v / maxNW) * dw
    const my = (v: number) => mg.top + dh - (v / maxD) * dh

    ctx.font = `10px ${MONOSPACE}`

    // Grid
    ctx.strokeStyle = THEME.divider
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = 0; x <= maxNW; x += 20_000_000) {
      ctx.moveTo(mx(x), mg.top)
      ctx.lineTo(mx(x), mg.top + dh)
      ctx.fillStyle = THEME.dim
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(x === 0 ? '0' : `${x / 1_000_000}M`, mx(x), mg.top + dh + 6)
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

    // W* marker line
    const wxLine = mx(p.wstar)
    ctx.beginPath()
    ctx.strokeStyle = THEME.voice.accent
    ctx.lineWidth = 1
    ctx.setLineDash([3, 4])
    ctx.moveTo(wxLine, mg.top)
    ctx.lineTo(wxLine, mg.top + dh)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = THEME.voice.accent
    ctx.font = `9px ${MONOSPACE}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('W*', wxLine, mg.top + 2)

    // Curve
    ctx.beginPath()
    ctx.strokeStyle = THEME.flow.accent
    ctx.lineWidth = 2
    ctx.setLineDash([])
    for (let i = 0; i <= 300; i++) {
      const xv = (i / 300) * maxNW
      const yv = calc(xv, p.s, p.wstar, p.r).D
      const x  = mx(xv)
      const y  = my(yv)
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Current net-worth marker
    const { D } = calc(p.nw, p.s, p.wstar, p.r)
    const markerX = mx(p.nw)
    const markerY = my(D)

    ctx.beginPath()
    ctx.strokeStyle = '#e3b341'
    ctx.lineWidth = 1.5
    ctx.setLineDash([4, 4])
    ctx.moveTo(markerX, mg.top)
    ctx.lineTo(markerX, mg.top + dh)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.beginPath()
    ctx.fillStyle = '#e3b341'
    ctx.arc(markerX, markerY, 5, 0, Math.PI * 2)
    ctx.fill()
  }, [p])

  useEffect(() => { draw() }, [draw])
  useEffect(() => {
    const ro = new ResizeObserver(draw)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [draw])

  const { E, lambda, D } = calc(p.nw, p.s, p.wstar, p.r)

  return (
    <div style={{
      background: '#0d1117', border: `1px solid ${THEME.border}`, borderRadius: 8,
      padding: 16, display: 'flex', flexDirection: 'column', gap: 12,
      fontFamily: MONOSPACE,
    }}>
      {/* Header */}
      <div style={{ fontSize: 11, color: THEME.dim, letterSpacing: '0.06em', borderBottom: `1px solid ${THEME.border}`, paddingBottom: 8 }}>
        <span style={{ color: THEME.flow.accent, fontWeight: 700 }}>V-014</span>
        <span style={{ margin: '0 8px', opacity: 0.4 }}>·</span>
        Progressive Net-Worth Demurrage Calculator
      </div>

      {/* Body: controls left, chart right */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>

        {/* Left: sliders */}
        <div style={{
          background: '#161b22', border: `1px solid ${THEME.border}`, borderRadius: 6,
          padding: 14, display: 'flex', flexDirection: 'column', gap: 14,
          minWidth: 220, flex: '0 0 220px',
        }}>
          <Slider label="Net Worth (NW)" id="nw" min={0} max={100_000_000} step={100_000}
            value={p.nw} fmt={fmtCompact.format.bind(fmtCompact)} onChange={set('nw')} />
          <Slider label="Savings Floor (S)" id="s" min={0} max={2_000_000} step={10_000}
            value={p.s} fmt={fmtCompact.format.bind(fmtCompact)} onChange={set('s')} />
          <Slider label="Equilibrium Ceiling (W*)" id="wstar" min={1_000_000} max={100_000_000} step={500_000}
            value={p.wstar} fmt={fmtCompact.format.bind(fmtCompact)} onChange={set('wstar')} />
          <Slider label="Return Rate (r)" id="r" min={0.01} max={0.20} step={0.001}
            value={p.r} fmt={v => (v * 100).toFixed(1) + '%'} onChange={set('r')} />

          {/* Callout stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8, borderTop: `1px solid ${THEME.border}` }}>
            <Stat label="Net Worth"         value={fmtFull.format(p.nw)} />
            <Stat label="Excess (E)"        value={fmtFull.format(E)} />
            <Stat label="Rate (λ)"          value={fmtPct(lambda)} />
            <Stat label="Annual (D)"        value={fmtFull.format(D)} highlight />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingTop: 2 }}>
              <span style={{ color: THEME.dim }}>Monthly</span>
              <span style={{ color: THEME.dim }}>{fmtFull.format(D / 12)}</span>
            </div>
          </div>
        </div>

        {/* Right: chart */}
        <div ref={wrapRef} style={{ flex: '1 1 300px', minHeight: 260, position: 'relative' }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 10, color: THEME.dim, opacity: 0.6, textAlign: 'right', letterSpacing: '0.04em' }}>
        D(E) = (r / √E*) · E^1.5 · E = max(0, NW − S) · W* marker ◈
      </div>
    </div>
  )
}
