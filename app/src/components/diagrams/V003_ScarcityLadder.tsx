// app/src/components/diagrams/V003_ScarcityLadder.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  {
    id: 'normal',
    label: 'Normal — Full Market',
    definition: 'No scarcity signal. Flow economy operates normally. Essential Access delivered through standard channels. No rationing active.',
    docLink: 'ANNEX_AC.md',
    accent: '#3fb950',
    accentBg: 'rgba(63,185,80,0.07)',
  },
  {
    id: 'watch',
    label: 'Watch — Oracle Alert',
    definition: 'Oracle nodes detect capacity approaching threshold. Public dashboard updated. No rationing yet. Procurement protocols activated.',
    docLink: 'ANNEX_AC.md',
    accent: '#58a6ff',
    accentBg: 'rgba(88,166,255,0.07)',
  },
  {
    id: 'pcrp',
    label: 'PCRP — Capacity Response',
    definition: 'Protocol-level Capacity Response Protocol activated. Priority allocation begins. Discretionary above-floor consumption signaled. Shared Storehouse on standby.',
    docLink: 'ANNEX_AC.md',
    accent: '#d29922',
    accentBg: 'rgba(210,153,34,0.07)',
  },
  {
    id: 'storehouse',
    label: 'Shared Storehouse — Active',
    definition: 'Rationing active. Essential category distributed from Shared Storehouse. Flow purchases of the category suspended. Oracle-gated mandatory unwind conditions in effect.',
    docLink: 'ANNEX_AC.md',
    accent: '#f85149',
    accentBg: 'rgba(248,81,73,0.07)',
  },
  {
    id: 'emergency',
    label: 'Emergency — Override',
    definition: 'Verified emergency conditions. All discretionary allocation suspended. Keyholder council convened within 24 hours. Automatic sunset required.',
    docLink: 'ANNEX_AQ.md',
    accent: '#ff6b6b',
    accentBg: 'rgba(255,107,107,0.07)',
  },
]

export function V003_ScarcityLadder({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const colors = ['#3fb950', '#58a6ff', '#d29922', '#f85149', '#ff6b6b']
  const fills  = ['#0d2116', '#0d1a2e', '#1f1a0d', '#1a0d0d', '#200808']
  const ids    = ['normal', 'watch', 'pcrp', 'storehouse', 'emergency']
  const labels = ['NORMAL', 'WATCH', 'PCRP', 'STOREHOUSE', 'EMERGENCY']
  const subs   = ['full market', 'oracle alert', 'cap. response', 'rationing', 'override']

  return (
    <DiagramShell
      figId="V-003"
      title="Scarcity Escalation Ladder"
      nodes={NODES}
      activeNodeId={activeNodeId}
      onInternalLink={onInternalLink}
    >
      <svg viewBox="0 0 800 180" className="w-full" style={{ height: 180 }}>
        {ids.map((id, i) => {
          const x = 20 + i * 156
          const y = 130 - i * 22
          const isActive = activeNodeId === id
          return (
            <g key={id} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${colors[i]})` : undefined }} onClick={() => handleNodeClick(id)}>
              <rect x={x} y={y} width={140} height={52} rx={6} fill={fills[i]} stroke={colors[i]} strokeWidth={isActive ? 2.5 : 2} />
              <text x={x + 70} y={y + 22} textAnchor="middle" fontSize={11} fontWeight={700} fill={colors[i]} fontFamily="monospace">{labels[i]}</text>
              <text x={x + 70} y={y + 39} textAnchor="middle" fontSize={10} fill="#b6c2cf" fontFamily="monospace">{subs[i]}</text>
              {i < 4 && (
                <line x1={x + 140} y1={y + 26} x2={x + 156} y2={y + 4} stroke={colors[i]} strokeWidth={1} strokeDasharray="3,2" opacity={0.4} />
              )}
            </g>
          )
        })}
        <text x={400} y={172} textAnchor="middle" fontSize={9} fill="#8b949e" fontFamily="monospace" letterSpacing="0.05em">escalation →</text>
      </svg>
    </DiagramShell>
  )
}
