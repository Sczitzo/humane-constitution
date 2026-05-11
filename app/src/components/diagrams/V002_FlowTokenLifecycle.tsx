// app/src/components/diagrams/V002_FlowTokenLifecycle.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  { id: 'issuance', label: 'Issuance', definition: 'Flow is issued by protocol-authorized bodies against verified productive commitment. Not printed arbitrarily — issuance requires a corresponding contribution record.', docLink: 'ANNEX_AB.md', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
  { id: 'circulation', label: 'Circulation', definition: 'Flow moves through wages, contracts, commerce, and savings. Subject to demurrage on idle balances above the personal exemption floor.', docLink: 'ANNEX_AB.md', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
  { id: 'demurrage', label: 'Demurrage', definition: 'Idle balances above the exemption floor decay at the constitutional rate. Decay proceeds fund the public commons rail, not private profit.', docLink: 'ANNEX_AR.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'commons', label: 'Commons Rail', definition: 'Demurrage proceeds enter the public commons rail — funding Essential Access delivery, oracle infrastructure, and Federated Ombuds operations.', docLink: 'ANNEX_X.md', accent: '#3fb950', accentBg: 'rgba(63,185,80,0.07)' },
]

const STAGES = [
  { id: 'issuance',    label: 'ISSUANCE',    sub: 'protocol-authorized', stroke: '#58a6ff', fill: '#0d2137' },
  { id: 'circulation', label: 'CIRCULATION', sub: 'wages · contracts',    stroke: '#58a6ff', fill: '#0d1a2e' },
  { id: 'demurrage',   label: 'DEMURRAGE',   sub: 'idle decay applied',   stroke: '#d29922', fill: '#1f1a0d' },
  { id: 'commons',     label: 'COMMONS',     sub: 'public rail funded',   stroke: '#3fb950', fill: '#0d2116' },
]

export function V002_FlowTokenLifecycle({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const boxW = 148, boxH = 70, gap = 24, startX = 20, cy = 60

  return (
    <DiagramShell figId="V-002" title="Flow Token Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 140" className="w-full" style={{ height: 140 }}>
        {STAGES.map((s, i) => {
          const x = startX + i * (boxW + gap)
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              {i > 0 && <path d={`M${x - gap + 4},${cy + boxH / 2} L${x - 4},${cy + boxH / 2}`} fill="none" stroke="#30363d" strokeWidth={1.5} markerEnd="url(#arr1)" />}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill={s.fill} stroke={s.stroke} strokeWidth={isActive ? 2.5 : 2} />
              <text x={x + boxW / 2} y={cy + 28} textAnchor="middle" fontSize={11} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 48} textAnchor="middle" fontSize={10} fill="#b6c2cf" fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}
        <defs>
          <marker id="arr1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#30363d" />
          </marker>
        </defs>
      </svg>
    </DiagramShell>
  )
}
