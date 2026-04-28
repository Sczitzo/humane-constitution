/**
 * StatechartDiagram — bespoke lifecycle diagram renderer.
 *
 * Parses a plain-text DSL from markdown ```statechart blocks and renders a
 * layered SVG diagram themed to match the app palette. No external layout
 * library — uses a topological longest-path assignment for columns, then
 * barycentric ordering within each column for rows.
 *
 * DSL format (one directive or transition per line):
 *
 *   primary:   STATE_A, STATE_B          # amber-highlighted states
 *   terminal:  STATE_C, STATE_D          # dark end-states
 *   warning:   STATE_E                   # amber-warning states
 *   suspended: STATE_F                   # grey suspended states
 *   title: Optional diagram title
 *
 *   STATE_A -> STATE_B: transition label
 *   STATE_B -> STATE_C: another label
 */

const NODE_W = 118
const NODE_H = 36
const H_GAP  = 72
const V_GAP  = 18
const R      = 6  // border-radius

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

const EDGE_COLOR  = 'rgba(60,54,46,0.45)'
const LABEL_COLOR = '#7a7268'
const FONT_FAMILY = '"Iowan Old Style","Palatino Linotype",Georgia,serif'

// ── DSL parser ────────────────────────────────────────────────────────────

interface ParsedNode {
  id: string
  role: NodeRole
}

interface ParsedEdge {
  from: string
  to: string
  label: string
}

interface ParsedSpec {
  title: string
  nodes: ParsedNode[]
  edges: ParsedEdge[]
}

export function parseStatechartDsl(dsl: string): ParsedSpec {
  const lines  = dsl.split('\n').map(l => l.trim()).filter(Boolean)
  const roleMap = new Map<string, NodeRole>()
  const edges: ParsedEdge[] = []
  const seen  = new Set<string>()
  let title   = ''

  function addRole(text: string, role: NodeRole) {
    text.split(',').map(s => s.trim()).filter(Boolean).forEach(id => {
      roleMap.set(id, role)
      seen.add(id)
    })
  }

  for (const line of lines) {
    if (line.startsWith('title:'))     { title = line.slice(6).trim(); continue }
    if (line.startsWith('primary:'))   { addRole(line.slice(8), 'primary');   continue }
    if (line.startsWith('terminal:'))  { addRole(line.slice(9), 'terminal');  continue }
    if (line.startsWith('warning:'))   { addRole(line.slice(8), 'warning');   continue }
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
  col: number
  row: number
  x: number
  y: number
}

interface LayoutEdge extends ParsedEdge {
  fromNode: LayoutNode
  toNode: LayoutNode
  isBackward: boolean
  isSelf: boolean
}

interface Layout {
  nodes: LayoutNode[]
  edges: LayoutEdge[]
  width: number
  height: number
}

export function computeLayout(spec: ParsedSpec): Layout {
  const { nodes, edges } = spec
  const ids = nodes.map(n => n.id)

  // Build adjacency (forward only; back-edges detected later)
  const outgoing = new Map<string, string[]>(ids.map(id => [id, []]))
  const incoming = new Map<string, string[]>(ids.map(id => [id, []]))

  for (const e of edges) {
    if (e.from === e.to) continue
    outgoing.get(e.from)?.push(e.to)
    incoming.get(e.to)?.push(e.from)
  }

  // Topological sort (DFS, skipping back-edges)
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
      // Only count forward predecessors (pred col < current)
      const predCol = cols.get(pred) ?? -1
      maxPred = Math.max(maxPred, predCol)
    }
    cols.set(id, maxPred + 1)
  }

  // Group into columns
  const colGroups = new Map<number, string[]>()
  for (const id of ids) {
    const c = cols.get(id) ?? 0
    if (!colGroups.has(c)) colGroups.set(c, [])
    colGroups.get(c)!.push(id)
  }

  // Barycentric row ordering within each column
  for (const [, group] of colGroups) {
    group.sort((a, b) => {
      const aSucc = (outgoing.get(a) ?? []).map(s => cols.get(s) ?? 0)
      const bSucc = (outgoing.get(b) ?? []).map(s => cols.get(s) ?? 0)
      const median = (arr: number[]) =>
        arr.length === 0 ? 0 : arr.reduce((x, y) => x + y, 0) / arr.length
      return median(aSucc) - median(bSucc)
    })
  }

  // Row assignment
  const rows = new Map<string, number>()
  for (const [, group] of colGroups) {
    group.forEach((id, i) => rows.set(id, i))
  }

  const numCols       = Math.max(...[...cols.values()]) + 1
  const maxRows       = Math.max(...[...colGroups.values()].map(g => g.length))
  const svgWidth      = 40 + numCols * NODE_W + (numCols - 1) * H_GAP
  const svgHeight     = Math.max(40 + maxRows * NODE_H + (maxRows - 1) * V_GAP, NODE_H + 60)

  const layoutNodes: LayoutNode[] = nodes.map(n => {
    const col       = cols.get(n.id) ?? 0
    const row       = rows.get(n.id) ?? 0
    const group     = colGroups.get(col) ?? [n.id]
    const totalH    = group.length * NODE_H + (group.length - 1) * V_GAP
    const startY    = (svgHeight - totalH) / 2
    return {
      ...n,
      col,
      row,
      x: 20 + col * (NODE_W + H_GAP),
      y: startY + row * (NODE_H + V_GAP),
    }
  })

  const nodeMap = new Map(layoutNodes.map(n => [n.id, n]))

  const layoutEdges: LayoutEdge[] = edges.map(e => {
    const fromNode = nodeMap.get(e.from)!
    const toNode   = nodeMap.get(e.to)!
    return {
      ...e,
      fromNode,
      toNode,
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
  // Arc over the top of the diagram
  const x1  = from.x + NODE_W / 2
  const y1  = from.y
  const x2  = to.x + NODE_W / 2
  const y2  = to.y
  const lift = 28 + index * 14
  const my  = Math.min(y1, y2) - lift
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`
}

function midPoint(path: string, _isBackward: boolean): { x: number; y: number } {
  // Rough midpoint on the cubic bezier (t=0.5)
  const m = path.match(/M([\d.]+),([\d.]+) C([\d.]+),([\d.]+) ([\d.]+),([\d.]+) ([\d.]+),([\d.]+)/)
  if (!m) return { x: 0, y: 0 }
  const [, x0, y0, x1, y1, x2, y2, x3, y3] = m.map(Number)
  const t = 0.5
  const bx = (1-t)**3*x0 + 3*(1-t)**2*t*x1 + 3*(1-t)*t**2*x2 + t**3*x3
  const by = (1-t)**3*y0 + 3*(1-t)**2*t*y1 + 3*(1-t)*t**2*y2 + t**3*y3
  return { x: bx, y: by }
}

// ── main component ────────────────────────────────────────────────────────

export function StatechartDiagram({ dsl }: { dsl: string }) {
  const spec   = parseStatechartDsl(dsl)
  const layout = computeLayout(spec)

  const backwardEdges = layout.edges.filter(e => e.isBackward && !e.isSelf)
  let bwIndex = 0

  const arrowId = `arrow-${Math.random().toString(36).slice(2, 7)}`

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
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        width="100%"
        height={layout.height}
        style={{ maxHeight: 320, fontFamily: FONT_FAMILY }}
        aria-hidden="true"
      >
        <defs>
          <marker
            id={arrowId}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={EDGE_COLOR} />
          </marker>
        </defs>

        {/* Edges */}
        {layout.edges.map((edge, i) => {
          if (edge.isSelf) return null

          let d: string
          if (edge.isBackward) {
            d = backwardPath(edge.fromNode, edge.toNode, bwIndex++)
          } else {
            d = forwardPath(edge.fromNode, edge.toNode)
          }

          const mid = midPoint(d, edge.isBackward)

          return (
            <g key={`edge-${i}`}>
              <path
                d={d}
                fill="none"
                stroke={EDGE_COLOR}
                strokeWidth={1.2}
                markerEnd={`url(#${arrowId})`}
              />
              {edge.label && (
                <>
                  <rect
                    x={mid.x - edge.label.length * 3.1 - 4}
                    y={mid.y - 8}
                    width={edge.label.length * 6.2 + 8}
                    height={14}
                    fill="#fdf9f2"
                    rx={3}
                  />
                  <text
                    x={mid.x}
                    y={mid.y + 3}
                    textAnchor="middle"
                    fontSize={10}
                    fill={LABEL_COLOR}
                    fontFamily={FONT_FAMILY}
                  >
                    {edge.label}
                  </text>
                </>
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {layout.nodes.map(node => {
          const s = NODE_STYLES[node.role]
          const cx = node.x + NODE_W / 2
          const cy = node.y + NODE_H / 2
          return (
            <g key={`node-${node.id}`}>
              <rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={NODE_H}
                rx={R}
                ry={R}
                fill={s.fill}
                stroke={s.stroke}
                strokeWidth={s.strokeWidth}
              />
              <text
                x={cx}
                y={cy + 4.5}
                textAnchor="middle"
                fontSize={12}
                fill={s.textFill}
                fontWeight={s.fontWeight}
                fontFamily={FONT_FAMILY}
                letterSpacing="0.02em"
              >
                {node.id}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
