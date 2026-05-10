/**
 * StatechartDiagram — bespoke lifecycle diagram renderer (v2).
 *
 * DSL format (one directive or transition per line):
 *   primary:   STATE_A, STATE_B
 *   terminal:  STATE_C, STATE_D
 *   warning:   STATE_E
 *   suspended: STATE_F
 *   title:     Optional title
 *   STATE_A -> STATE_B: transition label
 *
 * Label strategy:
 *   • ≤5 labeled edges  → labels drawn inline on the diagram
 *   • >5 labeled edges  → numbered callouts + legend below SVG
 */

import { useEffect, useState, useId } from 'react'

function useDarkMode(): boolean {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark',
  )
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.getAttribute('data-theme') === 'dark')
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

// ── layout constants ──────────────────────────────────────────────────────

const NODE_W      = 162
const NODE_H      = 42
const H_GAP       = 100
const V_GAP       = 52
const R           = 7
const ARC_PAD_BW  = 60    // top headroom only when backward arcs exist
const TOP_PAD     = 18    // top padding when no backward arcs
const BOT_PAD     = 28
const SIDE_PAD    = 22

const NODE_FONT   = 12
const LABEL_FONT  = 9.5
const INLINE_LABEL_THRESHOLD = 5

// ── palette ───────────────────────────────────────────────────────────────

type NodeRole = 'primary' | 'terminal' | 'warning' | 'suspended' | 'default'

interface NodeStyle {
  fill: string
  useGradient?: 'primary' | 'warning'
  stroke: string
  strokeWidth: number
  textFill: string
  fontWeight: string
}

interface Palette {
  nodes: Record<NodeRole, NodeStyle>
  edgeColor: string
  labelBg: string
  labelRing: string
  labelText: string
  gradPrimaryFrom: string
  gradPrimaryTo: string
  gradWarningFrom: string
  gradWarningTo: string
  shadowColor: string
  callouts: [string, string][]
  legendText: string
}

const LIGHT: Palette = {
  nodes: {
    primary:   { fill: '#fef3e2', useGradient: 'primary', stroke: '#96612a',               strokeWidth: 2,   textFill: '#1c1710', fontWeight: '700' },
    terminal:  { fill: '#1c1812',                          stroke: '#2a2218',               strokeWidth: 1.5, textFill: '#f0e6d4', fontWeight: '600' },
    warning:   { fill: '#fdf0de', useGradient: 'warning',  stroke: '#b07434',               strokeWidth: 1.5, textFill: '#352410', fontWeight: '600' },
    suspended: { fill: '#eeebe6',                          stroke: '#a09688',               strokeWidth: 1,   textFill: '#52483e', fontWeight: '500' },
    default:   { fill: '#faf8f3',                          stroke: 'rgba(60,54,46,0.28)',   strokeWidth: 1,   textFill: '#2a2722', fontWeight: '500' },
  },
  edgeColor:       'rgba(60,54,46,0.55)',
  labelBg:         '#fffdf8',
  labelRing:       'rgba(60,54,46,0.22)',
  labelText:       '#3a3228',
  gradPrimaryFrom: '#fefbf2',
  gradPrimaryTo:   '#f7e1a8',
  gradWarningFrom: '#fef8f0',
  gradWarningTo:   '#f9dba8',
  shadowColor:     'rgba(50,35,10,0.16)',
  callouts: [
    ['#9f6c31', '#fef3e2'], ['#3d7a6a', '#e4f2ee'], ['#5f52a0', '#eae7f5'],
    ['#b05050', '#f5eaea'], ['#2e769a', '#e2eff7'], ['#6a8232', '#eaf2df'],
    ['#a05838', '#f5ece4'], ['#387a7a', '#e2efef'], ['#724880', '#f0e8f5'],
    ['#5e7832', '#eaf0e0'], ['#a03858', '#f5e6ee'], ['#385e80', '#e2eaf5'],
  ],
  legendText: '#3a3028',
}

const DARK: Palette = {
  nodes: {
    primary:   { fill: '#2d1f08', useGradient: 'primary', stroke: '#c49040',               strokeWidth: 2,   textFill: '#f5dea0', fontWeight: '700' },
    terminal:  { fill: '#0e0c0a',                          stroke: '#7a5a28',               strokeWidth: 1.5, textFill: '#d4b878', fontWeight: '600' },
    warning:   { fill: '#281508', useGradient: 'warning',  stroke: '#c06828',               strokeWidth: 1.5, textFill: '#f2ba70', fontWeight: '600' },
    suspended: { fill: '#1e1a14',                          stroke: '#4a4030',               strokeWidth: 1,   textFill: '#786858', fontWeight: '500' },
    default:   { fill: '#1a1610',                          stroke: 'rgba(180,150,80,0.28)', strokeWidth: 1,   textFill: '#b89e78', fontWeight: '500' },
  },
  edgeColor:       'rgba(190,160,90,0.55)',
  labelBg:         '#221a0e',
  labelRing:       'rgba(190,160,90,0.35)',
  labelText:       '#d4b060',
  gradPrimaryFrom: '#2a1b06',
  gradPrimaryTo:   '#4d3210',
  gradWarningFrom: '#271408',
  gradWarningTo:   '#4a280c',
  shadowColor:     'rgba(0,0,0,0.45)',
  callouts: [
    ['#c49040', '#2d1f08'], ['#4aaa8a', '#0e2820'], ['#8878d0', '#18143a'],
    ['#d07070', '#2e1010'], ['#50a0cc', '#0a1e2e'], ['#90b050', '#182010'],
    ['#d07848', '#2a1408'], ['#50a0a0', '#0e2424'], ['#a060c0', '#201030'],
    ['#80a840', '#182010'], ['#c05878', '#280e18'], ['#5088c0', '#0e1828'],
  ],
  legendText: '#c4a870',
}

const FONT_SERIF  = '"Iowan Old Style","Palatino Linotype",Georgia,serif'
const FONT_SANS   = 'system-ui,-apple-system,"Segoe UI",sans-serif'
const FONT_MONO   = '"SF Mono","Fira Code",monospace'
function calloutColor(p: Palette, n: number): [string, string] {
  return p.callouts[n % p.callouts.length]
}

// ── DSL parser ────────────────────────────────────────────────────────────

interface ParsedNode { id: string; role: NodeRole }
interface ParsedEdge { from: string; to: string; label: string }
interface ParsedSpec { title: string; nodes: ParsedNode[]; edges: ParsedEdge[] }

export function parseStatechartDsl(dsl: string): ParsedSpec {
  const lines   = dsl.split('\n').map(l => l.trim()).filter(Boolean)
  const roleMap = new Map<string, NodeRole>()
  const edges: ParsedEdge[] = []
  const seen    = new Set<string>()
  let title     = ''

  function addRole(text: string, role: NodeRole) {
    text.split(',').map(s => s.trim()).filter(Boolean).forEach(id => {
      roleMap.set(id, role)
      seen.add(id)
    })
  }

  for (const line of lines) {
    if (line.startsWith('title:'))     { title = line.slice(6).trim(); continue }
    if (line.startsWith('primary:'))   { addRole(line.slice(8), 'primary');    continue }
    if (line.startsWith('terminal:'))  { addRole(line.slice(9), 'terminal');   continue }
    if (line.startsWith('warning:'))   { addRole(line.slice(8), 'warning');    continue }
    if (line.startsWith('suspended:')) { addRole(line.slice(10), 'suspended'); continue }

    const m = line.match(/^(\w+)\s*-+>\s*(\w+)\s*:\s*(.+)$/)
    if (m) {
      const [, from, to, label] = m
      edges.push({ from, to, label: label.trim() })
      seen.add(from)
      seen.add(to)
    }
  }

  const nodes: ParsedNode[] = [...seen].map(id => ({
    id,
    role: roleMap.get(id) ?? 'default',
  }))

  return { title, nodes, edges }
}

// ── layout engine ─────────────────────────────────────────────────────────

interface LayoutNode extends ParsedNode {
  col: number; row: number; x: number; y: number
}

interface LayoutEdge extends ParsedEdge {
  fromNode: LayoutNode
  toNode: LayoutNode
  isBackward: boolean
  isSelf: boolean
  targetY: number   // staggered connection point Y on the target node's left edge
}

interface Layout {
  nodes: LayoutNode[]
  edges: LayoutEdge[]
  width: number
  height: number
  topPad: number
}

export function computeLayout(spec: ParsedSpec): Layout {
  const { nodes, edges } = spec
  const ids = nodes.map(n => n.id)

  const outgoing = new Map<string, string[]>(ids.map(id => [id, []]))
  const incoming = new Map<string, string[]>(ids.map(id => [id, []]))
  for (const e of edges) {
    if (e.from === e.to) continue
    outgoing.get(e.from)?.push(e.to)
    incoming.get(e.to)?.push(e.from)
  }

  // Topological sort
  const visited = new Set<string>()
  const inStack = new Set<string>()
  const topo: string[] = []
  function dfs(id: string) {
    if (inStack.has(id) || visited.has(id)) return
    inStack.add(id)
    for (const next of outgoing.get(id) ?? []) dfs(next)
    inStack.delete(id)
    visited.add(id)
    topo.unshift(id)
  }
  for (const id of ids) dfs(id)

  // Longest-path column assignment
  const cols = new Map<string, number>()
  for (const id of topo) {
    let maxPred = -1
    for (const pred of incoming.get(id) ?? []) {
      maxPred = Math.max(maxPred, cols.get(pred) ?? -1)
    }
    cols.set(id, maxPred + 1)
  }

  // Detect backward arcs from column structure
  const hasBackward = edges.some(e => {
    const fc = cols.get(e.from) ?? 0
    const tc = cols.get(e.to)   ?? 0
    return fc >= tc && e.from !== e.to
  })
  const topPad = hasBackward ? ARC_PAD_BW : TOP_PAD

  // Group & sort columns
  const colGroups = new Map<number, string[]>()
  for (const id of ids) {
    const c = cols.get(id) ?? 0
    if (!colGroups.has(c)) colGroups.set(c, [])
    colGroups.get(c)!.push(id)
  }
  for (const [, group] of colGroups) {
    group.sort((a, b) => {
      const mean = (arr: number[]) =>
        arr.length === 0 ? 0 : arr.reduce((x, y) => x + y, 0) / arr.length
      return mean((outgoing.get(a) ?? []).map(s => cols.get(s) ?? 0))
           - mean((outgoing.get(b) ?? []).map(s => cols.get(s) ?? 0))
    })
  }

  const rows = new Map<string, number>()
  for (const [, group] of colGroups) group.forEach((id, i) => rows.set(id, i))

  const numCols   = Math.max(...[...cols.values()]) + 1
  const maxRows   = Math.max(...[...colGroups.values()].map(g => g.length))
  const nodeAreaH = maxRows * NODE_H + (maxRows - 1) * V_GAP
  const svgWidth  = SIDE_PAD * 2 + numCols * NODE_W + (numCols - 1) * H_GAP
  const svgHeight = topPad + nodeAreaH + BOT_PAD

  const layoutNodes: LayoutNode[] = nodes.map(n => {
    const col    = cols.get(n.id) ?? 0
    const row    = rows.get(n.id) ?? 0
    const group  = colGroups.get(col) ?? [n.id]
    const totalH = group.length * NODE_H + (group.length - 1) * V_GAP
    const startY = topPad + (nodeAreaH - totalH) / 2
    return {
      ...n, col, row,
      x: SIDE_PAD + col * (NODE_W + H_GAP),
      y: startY + row * (NODE_H + V_GAP),
    }
  })

  const nodeMap = new Map(layoutNodes.map(n => [n.id, n]))

  // Stagger connection Y for forward edges sharing the same target node.
  // This fans the arrows across the target node's height rather than all
  // converging at the centre, eliminating label crowding.
  const fwdByTarget = new Map<string, number[]>()
  edges.forEach((e, i) => {
    const fc = cols.get(e.from) ?? 0
    const tc = cols.get(e.to)   ?? 0
    if (fc < tc) {
      if (!fwdByTarget.has(e.to)) fwdByTarget.set(e.to, [])
      fwdByTarget.get(e.to)!.push(i)
    }
  })

  const edgeTargetY = new Array(edges.length).fill(0)
  for (const [targetId, idxs] of fwdByTarget) {
    const to = nodeMap.get(targetId)
    if (!to) continue
    const n = idxs.length
    idxs.forEach((i, slot) => {
      const pad = 7
      edgeTargetY[i] = n <= 1
        ? to.y + NODE_H / 2
        : to.y + pad + (slot / (n - 1)) * (NODE_H - pad * 2)
    })
  }

  const layoutEdges: LayoutEdge[] = edges.map((e, i) => {
    const fromNode   = nodeMap.get(e.from)!
    const toNode     = nodeMap.get(e.to)!
    const isBackward = !!fromNode && !!toNode && fromNode.col >= toNode.col && e.from !== e.to
    const isSelf     = e.from === e.to
    return {
      ...e, fromNode, toNode, isBackward, isSelf,
      targetY: edgeTargetY[i] || (toNode ? toNode.y + NODE_H / 2 : 0),
    }
  })

  return { nodes: layoutNodes, edges: layoutEdges, width: svgWidth, height: svgHeight, topPad }
}

// ── edge path helpers ─────────────────────────────────────────────────────

function forwardPath(from: LayoutNode, targetY: number, toX: number): string {
  const x1 = from.x + NODE_W
  const y1 = from.y + NODE_H / 2
  const cx  = (x1 + toX) / 2
  return `M${x1},${y1} C${cx},${y1} ${cx},${targetY} ${toX},${targetY}`
}

function backwardPath(from: LayoutNode, to: LayoutNode, index: number, topPad: number): string {
  const x1   = from.x + NODE_W / 2
  const y1   = from.y
  const x2   = to.x + NODE_W / 2
  const y2   = to.y
  const lift = Math.min(topPad - 8, 18 + index * 14)
  const my   = Math.min(y1, y2) - lift
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`
}

// ── label position helpers ────────────────────────────────────────────────

interface LabelPos { x: number; y: number }

// For M(x1,y1) C(cx,y1) (cx,y2) (x2,y2) at t=0.5:
//   x = 0.75·cx + 0.125·(x1+x2) ≈ cx = (x1+x2)/2
//   y = 0.5·y1 + 0.5·y2
// With staggered targetY, labels for a fan-in are naturally well-separated.
function fwdLabelPos(edge: LayoutEdge): LabelPos {
  return {
    x: (edge.fromNode.x + NODE_W + edge.toNode.x) / 2,
    y: (edge.fromNode.y + NODE_H / 2 + edge.targetY) / 2,
  }
}

function bezierMid(path: string): LabelPos {
  const m = path.match(
    /M([\d.]+),([\d.]+) C([\d.]+),([\d.]+) ([\d.]+),([\d.]+) ([\d.]+),([\d.]+)/,
  )
  if (!m) return { x: 0, y: 0 }
  const [, x0, y0, x1, y1, x2, y2, x3, y3] = m.map(Number)
  const t = 0.5
  return {
    x: (1-t)**3*x0 + 3*(1-t)**2*t*x1 + 3*(1-t)*t**2*x2 + t**3*x3,
    y: (1-t)**3*y0 + 3*(1-t)**2*t*y1 + 3*(1-t)*t**2*y2 + t**3*y3,
  }
}

// ── main component ────────────────────────────────────────────────────────

export function StatechartDiagram({ dsl }: { dsl: string }) {
  const dark    = useDarkMode()
  const p       = dark ? DARK : LIGHT
  const spec    = parseStatechartDsl(dsl)
  const layout  = computeLayout(spec)
  const uid     = useId()
  const arrowId = `arr-${uid}`
  const shadowId = `shd-${uid}`
  const gradPrimary = `gp-${uid}`
  const gradWarning = `gw-${uid}`

  let bwIndex = 0
  const paths = layout.edges.map(e => {
    if (e.isSelf) return ''
    return e.isBackward
      ? backwardPath(e.fromNode, e.toNode, bwIndex++, layout.topPad)
      : forwardPath(e.fromNode, e.targetY, e.toNode.x)
  })

  const labeledEdges = layout.edges.filter(e => !e.isSelf && e.label)
  const useLegend    = labeledEdges.length > INLINE_LABEL_THRESHOLD

  const calloutMap = new Map<number, number>()
  if (useLegend) {
    let n = 0
    layout.edges.forEach((e, i) => { if (!e.isSelf && e.label) calloutMap.set(i, n++) })
  }

  function nodeFill(s: NodeStyle): string {
    if (s.useGradient === 'primary') return `url(#${gradPrimary})`
    if (s.useGradient === 'warning') return `url(#${gradWarning})`
    return s.fill
  }

  return (
    <div
      className="my-3 overflow-x-auto rounded-xl border border-[var(--chrome-line)] bg-[var(--paper-strong,#faf8f3)] px-6 py-5"
      role="img"
      aria-label={spec.title || 'State machine diagram'}
    >
      {spec.title && (
        <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ink-faint,#a09888)]">
          {spec.title}
        </p>
      )}

      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        width="100%"
        height={layout.height}
        style={{ fontFamily: FONT_SERIF, display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          <filter id={shadowId} x="-20%" y="-30%" width="140%" height="180%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5"
              floodColor={p.shadowColor} floodOpacity="1" />
          </filter>

          <linearGradient id={gradPrimary} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={p.gradPrimaryFrom} />
            <stop offset="100%" stopColor={p.gradPrimaryTo} />
          </linearGradient>
          <linearGradient id={gradWarning} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={p.gradWarningFrom} />
            <stop offset="100%" stopColor={p.gradWarningTo} />
          </linearGradient>

          <marker id={arrowId} markerWidth="7" markerHeight="7"
            refX="6" refY="3" orient="auto">
            <path d="M0,0.5 L0,5.5 L7,3 z" fill={p.edgeColor} />
          </marker>

          {useLegend && p.callouts.map(([stroke], ci) => (
            <marker key={`ac${ci}`} id={`${arrowId}-c${ci}`}
              markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
              <path d="M0,0.5 L0,5.5 L7,3 z" fill={stroke} fillOpacity={0.7} />
            </marker>
          ))}
        </defs>

        {/* ── edges ── */}
        {layout.edges.map((edge, i) => {
          if (edge.isSelf || !paths[i]) return null
          const d          = paths[i]
          const calloutIdx = calloutMap.get(i)
          const showInline = !useLegend && !!edge.label
          const edgeStroke = useLegend && calloutIdx !== undefined
            ? calloutColor(p, calloutIdx)[0]
            : p.edgeColor

          return (
            <g key={`e${i}`}>
              <path
                d={d}
                fill="none"
                stroke={edgeStroke}
                strokeWidth={1.6}
                strokeOpacity={useLegend ? 0.62 : 0.90}
                markerEnd={
                  useLegend && calloutIdx !== undefined
                    ? `url(#${arrowId}-c${calloutIdx % p.callouts.length})`
                    : `url(#${arrowId})`
                }
              />

              {/* Inline label pill */}
              {showInline && (() => {
                const lp = edge.isBackward ? bezierMid(d) : fwdLabelPos(edge)
                const tw = edge.label.length * 5.5
                const lw = tw + 16
                const lh = 19
                return (
                  <g>
                    <rect
                      x={lp.x - lw / 2} y={lp.y - lh / 2}
                      width={lw} height={lh}
                      fill={p.labelBg} stroke={p.labelRing}
                      rx={5}
                    />
                    <text
                      x={lp.x} y={lp.y + 3.5}
                      textAnchor="middle"
                      fontSize={LABEL_FONT}
                      fill={p.labelText}
                      fontFamily={FONT_SANS}
                    >
                      {edge.label}
                    </text>
                  </g>
                )
              })()}

              {/* Callout bubble for legend mode */}
              {useLegend && calloutIdx !== undefined && (() => {
                const mp = bezierMid(d)
                const [stroke, fill] = calloutColor(p, calloutIdx)
                return (
                  <g>
                    <circle cx={mp.x} cy={mp.y} r={9.5}
                      fill={fill} stroke={stroke} strokeWidth={1.5} />
                    <text
                      x={mp.x} y={mp.y + 4}
                      textAnchor="middle"
                      fontSize={10}
                      fill={stroke}
                      fontWeight="700"
                      fontFamily={FONT_SERIF}
                    >
                      {calloutIdx + 1}
                    </text>
                  </g>
                )
              })()}
            </g>
          )
        })}

        {/* ── nodes ── */}
        {layout.nodes.map(node => {
          const s  = p.nodes[node.role]
          const cx = node.x + NODE_W / 2
          const cy = node.y + NODE_H / 2
          return (
            <g key={`n${node.id}`} filter={`url(#${shadowId})`}>
              <rect
                x={node.x} y={node.y}
                width={NODE_W} height={NODE_H}
                rx={R} ry={R}
                fill={nodeFill(s)}
                stroke={s.stroke}
                strokeWidth={s.strokeWidth}
              />
              <text
                x={cx} y={cy + 4.5}
                textAnchor="middle"
                fontSize={NODE_FONT}
                fill={s.textFill}
                fontWeight={s.fontWeight}
                fontFamily={FONT_SERIF}
                letterSpacing="0.04em"
              >
                {node.id}
              </text>
            </g>
          )
        })}
      </svg>

      {/* ── Legend (dense diagrams only) ── */}
      {useLegend && (
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {labeledEdges.map((edge, n) => {
            const [stroke, fill] = calloutColor(p, n)
            return (
              <div
                key={`l${n}`}
                className="flex items-start gap-2.5 rounded-lg px-3 py-2"
                style={{ background: fill, borderLeft: `3px solid ${stroke}` }}
              >
                <span
                  className="shrink-0 tabular-nums"
                  style={{
                    color: stroke,
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: '18px',
                    minWidth: 14,
                    fontFamily: FONT_SERIF,
                  }}
                >
                  {n + 1}
                </span>
                <span style={{ fontFamily: FONT_SERIF, fontSize: 11, lineHeight: 1.6 }}>
                  <span style={{
                    display: 'block',
                    fontFamily: FONT_MONO,
                    fontSize: 8.5,
                    color: stroke,
                    opacity: 0.85,
                    letterSpacing: '0.05em',
                    marginBottom: 2,
                  }}>
                    {edge.from} → {edge.to}
                  </span>
                  <span style={{ color: p.legendText }}>{edge.label}</span>
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
