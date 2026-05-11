// app/src/components/diagrams/V012_VoiceLifecycle.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  { id: 'earn',   label: 'Earn Voice',    definition: 'Voice weight earned through verified civic contribution — committee work, community service, peer review, recognized caretaking. Cannot be purchased.', docLink: 'ANNEX_Z.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'weight', label: 'Weighted Pool', definition: 'Voice weight enters the community deliberation pool. Each participant has bounded influence — no single actor can dominate a vote regardless of contribution history.', docLink: 'ANNEX_Z.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'use',    label: 'Use in Voting', definition: 'Voice used to set community priorities, elect rotating roles, and flag concerns. Cannot buy goods, services, or exemptions from enforcement.', docLink: 'ANNEX_Z.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'decay',  label: 'Decay',         definition: 'Unused Voice decays back to the community pool within one governance cycle. Prevents accumulation by passive holders or institutional actors.', docLink: 'ANNEX_Z.md', accent: '#f85149', accentBg: 'rgba(248,81,73,0.07)' },
]

const STAGES = [
  { id: 'earn',   label: 'EARN',  sub: 'civic contribution', stroke: '#d29922', fill: '#1f1a0d' },
  { id: 'weight', label: 'POOL',  sub: 'bounded weight',     stroke: '#d29922', fill: '#1f1a0d' },
  { id: 'use',    label: 'USE',   sub: 'priority-setting',   stroke: '#d29922', fill: '#1f1a0d' },
  { id: 'decay',  label: 'DECAY', sub: 'returns to pool',    stroke: '#f85149', fill: '#1a0d0d' },
]

export function V012_VoiceLifecycle({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const boxW = 148, boxH = 70, gap = 28, startX = 30, cy = 55

  return (
    <DiagramShell figId="V-012" title="Voice — Civic Influence Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 145" className="w-full" style={{ height: 145 }}>
        {STAGES.map((s, i) => {
          const x = startX + i * (boxW + gap)
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              {i > 0 && <path d={`M${x - gap + 3},${cy + boxH / 2} L${x - 3},${cy + boxH / 2}`} fill="none" stroke="#30363d" strokeWidth={1.5} markerEnd="url(#arr3)" />}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill={s.fill} stroke={s.stroke} strokeWidth={isActive ? 2.5 : 2} />
              <text x={x + boxW / 2} y={cy + 28} textAnchor="middle" fontSize={12} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 48} textAnchor="middle" fontSize={10} fill="#b6c2cf" fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}
        <defs>
          <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#30363d" />
          </marker>
        </defs>
      </svg>
    </DiagramShell>
  )
}
