// app/src/components/diagrams/V011_EssentialAccessLifecycle.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  { id: 'enroll',   label: 'Enrollment',       definition: 'Person establishes Tier 0 (open-access) or Tier 1 (identity-verified) enrollment. Tier 0 requires no identity — pseudonymous token issued.', docLink: 'ANNEX_AK.md#AK8', accent: '#3fb950', accentBg: 'rgba(63,185,80,0.07)' },
  { id: 'alloc',    label: 'Allocation',        definition: 'CSM basket allocated: food, shelter, healthcare, water, communications. Allocation is unconditional — no means test, no behavioral requirement.', docLink: 'INVARIANTS.md#INV-001', accent: '#3fb950', accentBg: 'rgba(63,185,80,0.07)' },
  { id: 'delivery', label: 'Delivery',          definition: 'Basket delivered through the nearest operational delivery pathway. Delivery sufficiency register tracks which populations have a confirmed path.', docLink: 'ANNEX_AY.md', accent: '#3fb950', accentBg: 'rgba(63,185,80,0.07)' },
  { id: 'review',   label: 'Continuity Review', definition: 'Quarterly delivery sufficiency review. If any founding population lacks a confirmed delivery path, the gap is escalated to the Federated Ombuds.', docLink: 'ANNEX_AY.md', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
  { id: 'exit',     label: 'Exit / Reversion',  definition: 'Tier 1 de-enrollment reverts to Tier 0 — survival floor never cut. 60-day housing, 90-day healthcare, and 90-day EA continue post-exit.', docLink: 'ANNEX_AX.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
]

const STAGES = [
  { id: 'enroll',   label: 'ENROLL',    sub: 'Tier 0 or Tier 1',  stroke: '#3fb950', fill: '#0d2116' },
  { id: 'alloc',    label: 'ALLOCATE',  sub: 'CSM basket issued',  stroke: '#3fb950', fill: '#0d2116' },
  { id: 'delivery', label: 'DELIVER',   sub: 'sufficiency path',   stroke: '#3fb950', fill: '#0d2116' },
  { id: 'review',   label: 'REVIEW',    sub: 'quarterly check',    stroke: '#58a6ff', fill: '#0d1a2e' },
  { id: 'exit',     label: 'EXIT',      sub: 'revert to Tier 0',   stroke: '#d29922', fill: '#1f1a0d' },
]

export function V011_EssentialAccessLifecycle({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const boxW = 120, boxH = 70, gap = 18, startX = 10, cy = 50

  return (
    <DiagramShell figId="V-011" title="Essential Access — Entitlement Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 140" className="w-full" style={{ height: 140 }}>
        {STAGES.map((s, i) => {
          const x = startX + i * (boxW + gap)
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              {i > 0 && <path d={`M${x - gap + 3},${cy + boxH / 2} L${x - 3},${cy + boxH / 2}`} fill="none" stroke="#30363d" strokeWidth={1.5} markerEnd="url(#arr2)" />}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill={s.fill} stroke={s.stroke} strokeWidth={isActive ? 2.5 : 2} />
              <text x={x + boxW / 2} y={cy + 27} textAnchor="middle" fontSize={10} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 46} textAnchor="middle" fontSize={9} fill="#b6c2cf" fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}
        <defs>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#30363d" />
          </marker>
        </defs>
      </svg>
    </DiagramShell>
  )
}
