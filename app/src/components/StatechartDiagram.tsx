/**
 * StatechartDiagram — bespoke lifecycle diagram renderer.
 *
 * Parses a plain-text DSL from markdown ```statechart blocks and renders a
 * layered SVG diagram themed to match the app palette. No external layout
 * library — uses a topological longest-path assignment for columns, then
 * barycentric ordering within each column for rows.
 *
 * Label strategy:
 *   • ≤5 labeled edges  → labels drawn inline on the diagram
 *   • >5 labeled edges  → numbered callouts (①②…) + legend below SVG
 *
 * DSL format (one directive or transition per line):
 *
 *   primary:   STATE_A, STATE_B
 *   terminal:  STATE_C, STATE_D
 *   warning:   STATE_E
 *   suspended: STATE_F
 *   title:     Optional title
 *
 *   STATE_A -> STATE_B: transition label
 */

// ── layout constants ──────────────────────────────────────────────────────

const NODE_W   = 148
const NODE_H   = 38
const H_GAP    = 60
const V_GAP    = 30
const R        = 7
const ARC_PAD  = 68   // vertical headroom above nodes for backward arcs
const SIDE_PAD = 18

const INLINE_LABEL_THRESHOLD = 5   // max labeled edges before switching to legend

// ── palette ───────────────────────────────────────────────────────────────

type NodeRole = 'primary' | 'terminal' | 'warning' | 'suspended' | 'default'

interface NodeStyle {
  fill: string
  stroke: string
  strokeWidth: number
  textFill: string
  fontWeight: string
}

const NODE_STYLES: Record<NodeRole, NodeStyle> = {
  primary: {
    fill: '#fef3e2',
    stroke: '#9f6c31',
    strokeWidth: 2,
    textFill: '#2a2722',
    fontWeight: '600',
  },
  terminal: {
    fill: '#2d2a26',
    stroke: '#2d2a26',
    strokeWidth: 1,
    textFill: '#f2ebdf',
    fontWeight: '500',
  },
  warning: {
    fill: '#fdf0e0',
    stroke: '#c4924f',
    strokeWidth: 1.5,
    textFill: '#5e584f',
    fontWeight: '500',
  },
  suspended: {
    fill: '#f3ede4',
    stroke: '#b3aa9c',
    strokeWidth: 1,
    textFill: '#7a7268',
    fontWeight: '500',
  },
  default: {
    fill: '#fdf9f2',
    stroke: 'rgba(60,54,46,0.28)',
    strokeWidth: 1,
    textFill: '#2a2722',
    fontWeight: '500',
  },
}

const EDGE_COLOR   = 'rgba(60,54,46,0.40)'
const LABEL_COLOR  = '#7a7268'
const LABEL_BG     = '#fdf9f2'
const CALLOUT_FILL = '#f3ede4'
const FONT_FAMILY  = '"Iowan Old Style","Palatino Linotype",Georgia,serif'
const MONO_FAMILY  = '"SF Mono","Fira Code",monospace'

// Unicode circled digits for legend callouts
const CALLOUT = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮']

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
  fromNode: LayoutNode; toNode: LayoutNode
  isBackward: boolean; isSelf: boolean
}

interface Layout {
  nodes: LayoutNode[]; edges: LayoutEdge[]
  width: number; height: number
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
    for (const next of (outgoing.get(id) ?? [])) dfs(next)
    inStack.delete(id)
    visited.add(id)
    topo.unshift(id)
  }
  for (const id of ids) dfs(id)

  // Longest-path column assignment
  const cols = new Map<string, number>()
  for (const id of topo) {
    let maxPred = -1
    for (const pred of (incoming.get(id) ?? [])) {
      maxPred = Math.max(maxPred, cols.get(pred) ?? -1)
    }
    cols.set(id, maxPred + 1)
  }

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
  const svgHeight = ARC_PAD + Math.max(nodeAreaH, NODE_H) + 28

  const layoutNodes: LayoutNode[] = nodes.map(n => {
    const col    = cols.get(n.id) ?? 0
    const row    = rows.get(n.id) ?? 0
    const group  = colGroups.get(col) ?? [n.id]
    const totalH = group.length * NODE_H + (group.length - 1) * V_GAP
    const startY = ARC_PAD + (nodeAreaH - totalH) / 2
    return {
      ...n, col, row,
      x: SIDE_PAD + col * (NODE_W + H_GAP),
      y: startY + row * (NODE_H + V_GAP),
    }
  })

  const nodeMap = new Map(layoutNodes.map(n => [n.id, n]))
  const layoutEdges: LayoutEdge[] = edges.map(e => {
    const fromNode = nodeMap.get(e.from)!
    const toNode   = nodeMap.get(e.to)!
    return {
      ...e, fromNode, toNode,
      isBackward: fromNode && toNode && fromNode.col >= toNode.col && e.from !== e.to,
      isSelf:     e.from === e.to,
    }
  })

  return { nodes: layoutNodes, edges: layoutEdges, width: svgWidth, height: svgHeight }
}

// ── edge path helpers ─────────────────────────────────────────────────────

function forwardPath(from: LayoutNode, to: LayoutNode): string {
  const x1 = from.x + NODE_W
  const y1 = from.y + NODE_H / 2
  const x2 = to.x
  const y2 = to.y + NODE_H / 2
  const cx  = (x1 + x2) / 2
  return `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`
}

function backwardPath(from: LayoutNode, to: LayoutNode, index: number): string {
  const x1   = from.x + NODE_W / 2
  const y1   = from.y
  const x2   = to.x + NODE_W / 2
  const y2   = to.y
  const lift = Math.min(ARC_PAD - 8, 20 + index * 16)
  const my   = Math.min(y1, y2) - lift
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`
}

// ── label position helpers ────────────────────────────────────────────────

interface LabelPos { x: number; y: number }

/**
 * For inline labels (≤ threshold edges):
 *  • Forward: anchor x to gap centre, y to the midpoint of endpoint rows minus
 *    a margin so it sits above the arrow for same-row edges.
 *  • Backward: just below the arc apex.
 */
function inlineLabelPos(edge: LayoutEdge, path: string): LabelPos {
  if (edge.isBackward) {
    // Parse the arc apex (control point y) from the path
    const m = path.match(/M[\d.]+,[\d.]+ C[\d.]+,([\d.]+)/)
    const apexY = m ? Number(m[1]) : 0
    const cx    = (edge.fromNode.x + NODE_W / 2 + edge.toNode.x + NODE_W / 2) / 2
    return { x: cx, y: apexY + 16 }
  }

  // Forward: fixed x in gap centre, y = average endpoint centres − clearance
  const gapCx = edge.fromNode.x + NODE_W + H_GAP / 2
  const fy    = edge.fromNode.y + NODE_H / 2
  const ty    = edge.toNode.y   + NODE_H / 2
  const midY  = (fy + ty) / 2
  // Lift above the line; same-row edges need at least NODE_H/2 + 8 = 27 px clearance
  const sameRow = Math.abs(fy - ty) < 4
  return { x: gapCx, y: midY - (sameRow ? NODE_H / 2 + 8 : 12) }
}

/**
 * For legend callouts: place the circled number at the bezier t=0.5 midpoint.
 */
function bezierMid(path: string): LabelPos {
  const m = path.match(
    /M([\d.]+),([\d.]+) C([\d.]+),([\d.]+) ([\d.]+),([\d.]+) ([\d.]+),([\d.]+)/,
  )
  if (!m) return { x: 0, y: 0 }
  const [, x0, y0, x1, y1, x2, y2, x3, y3] = m.map(Number)
  const t  = 0.5
  return {
    x: (1-t)**3*x0 + 3*(1-t)**2*t*x1 + 3*(1-t)*t**2*x2 + t**3*x3,
    y: (1-t)**3*y0 + 3*(1-t)**2*t*y1 + 3*(1-t)*t**2*y2 + t**3*y3,
  }
}

// ── main component ────────────────────────────────────────────────────────

export function StatechartDiagram({ dsl }: { dsl: string }) {
  const spec   = parseStatechartDsl(dsl)
  const layout = computeLayout(spec)
  const arrowId = `arrow-${Math.random().toString(36).slice(2, 7)}`

  // Pre-compute paths (backward index must be stable)
  let bwIndex = 0
  const paths = layout.edges.map(e => {
    if (e.isSelf) return ''
    return e.isBackward
      ? backwardPath(e.fromNode, e.toNode, bwIndex++)
      : forwardPath(e.fromNode, e.toNode)
  })

  // Decide render mode
  const labeledEdges = layout.edges.filter(e => !e.isSelf && e.label)
  const useLegend    = labeledEdges.length > INLINE_LABEL_THRESHOLD

  // Assign callout numbers to labeled edges (by their index in layout.edges)
  const calloutMap = new Map<number, number>() // edgeIndex → callout number (0-based)
  if (useLegend) {
    let n = 0
    layout.edges.forEach((e, i) => {
      if (!e.isSelf && e.label) calloutMap.set(i, n++)
    })
  }

  return (
    <div
      className="my-2 overflow-x-auto rounded-lg border border-line bg-paper-strong p-4"
      role="img"
      aria-label={spec.title || 'State machine diagram'}
    >
      {spec.title && (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          {spec.title}
        </p>
      )}

      {/* ── SVG diagram ── */}
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        width="100%"
        height={layout.height}
        style={{ fontFamily: FONT_FAMILY, display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          <marker
            id={arrowId}
            markerWidth="9" markerHeight="9"
            refX="8" refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill={EDGE_COLOR} />
          </marker>
        </defs>

        {/* ── edges ── */}
        {layout.edges.map((edge, i) => {
          if (edge.isSelf || !paths[i]) return null
          const d          = paths[i]
          const calloutIdx = calloutMap.get(i)
          const showInline = !useLegend && !!edge.label

          return (
            <g key={`edge-${i}`}>
              <path
                d={d}
                fill="none"
                stroke={EDGE_COLOR}
                strokeWidth={1.25}
                markerEnd={`url(#${arrowId})`}
              />

              {/* Inline label */}
              {showInline && (() => {
                const lp  = inlineLabelPos(edge, d)
                const tw  = edge.label.length * 5.8
                const lw  = tw + 12
                const lh  = 16
                return (
                  <g>
                    <rect
                      x={lp.x - lw / 2} y={lp.y - lh / 2}
                      width={lw} height={lh}
                      fill={LABEL_BG} rx={3}
                    />
                    <text
                      x={lp.x} y={lp.y + 4.5}
                      textAnchor="middle"
                      fontSize={10} fill={LABEL_COLOR}
                      fontFamily={FONT_FAMILY}
                    >
                      {edge.label}
                    </text>
                  </g>
                )
              })()}

              {/* Legend callout bubble */}
              {useLegend && calloutIdx !== undefined && (() => {
                const mp  = bezierMid(d)
                const sym = CALLOUT[calloutIdx] ?? String(calloutIdx + 1)
                return (
                  <g>
                    <circle cx={mp.x} cy={mp.y} r={8} fill={CALLOUT_FILL} stroke="none" />
                    <text
                      x={mp.x} y={mp.y + 4}
                      textAnchor="middle"
                      fontSize={10} fill={LABEL_COLOR}
                      fontFamily={FONT_FAMILY}
                    >
                      {sym}
                    </text>
                  </g>
                )
              })()}
            </g>
          )
        })}

        {/* ── nodes ── */}
        {layout.nodes.map(node => {
          const s  = NODE_STYLES[node.role]
          const cx = node.x + NODE_W / 2
          const cy = node.y + NODE_H / 2
          return (
            <g key={`node-${node.id}`}>
              <rect
                x={node.x} y={node.y}
                width={NODE_W} height={NODE_H}
                rx={R} ry={R}
                fill={s.fill} stroke={s.stroke} strokeWidth={s.strokeWidth}
              />
              <text
                x={cx} y={cy + 4.5}
                textAnchor="middle"
                fontSize={12}
                fill={s.textFill} fontWeight={s.fontWeight}
                fontFamily={FONT_FAMILY}
                letterSpacing="0.03em"
              >
                {node.id}
              </text>
            </g>
          )
        })}
      </svg>

      {/* ── Legend (dense diagrams only) ── */}
      {useLegend && (
        <ol
          className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {labeledEdges.map((edge, n) => (
            <li
              key={`legend-${n}`}
              className="flex items-baseline gap-2 text-ink-faint"
              style={{ fontFamily: FONT_FAMILY, fontSize: 11, lineHeight: 1.5 }}
            >
              <span
                className="shrink-0 text-ink-muted"
                style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}
              >
                {CALLOUT[n] ?? String(n + 1)}
              </span>
              <span>
                <span className="text-ink-muted" style={{ fontSize: 10, fontFamily: MONO_FAMILY }}>
                  {edge.from} → {edge.to}
                </span>
                {'  '}
                {edge.label}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
