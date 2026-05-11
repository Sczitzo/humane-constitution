// app/src/components/diagrams/V003_ScarcityLadder.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 'normal',
    label: 'Normal — Full Market',
    definition: 'No scarcity signal. Flow economy operates normally. Essential Access delivered through standard channels. No rationing active.',
    docLink: 'ANNEX_AC.md',
    accent: THEME.ea.accent,
    accentBg: THEME.ea.accentBg,
  },
  {
    id: 'watch',
    label: 'Watch — Oracle Alert',
    definition: 'Oracle nodes detect capacity approaching threshold. Public dashboard updated. No rationing yet. Procurement protocols activated.',
    docLink: 'ANNEX_AC.md',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
  },
  {
    id: 'pcrp',
    label: 'PCRP — Capacity Response',
    definition: 'Protocol-level Capacity Response Protocol activated. Priority allocation begins. Discretionary above-floor consumption signaled. Shared Storehouse on standby.',
    docLink: 'ANNEX_AC.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
  },
  {
    id: 'storehouse',
    label: 'Shared Storehouse — Active',
    definition: 'Rationing active. Essential category distributed from Shared Storehouse. Flow purchases of the category suspended. Oracle-gated mandatory unwind conditions in effect.',
    docLink: 'ANNEX_AC.md',
    accent: THEME.ss.accent,
    accentBg: THEME.ss.accentBg,
  },
  {
    id: 'emergency',
    label: 'Emergency — Override',
    definition: 'Verified emergency conditions. All discretionary allocation suspended. Keyholder council convened within 24 hours. Automatic sunset required.',
    docLink: 'ANNEX_AQ.md',
    accent: THEME.emergency.accent,
    accentBg: THEME.emergency.accentBg,
  },
]

export function V003_ScarcityLadder({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const colors = [THEME.ea.accent, THEME.flow.accent, THEME.voice.accent, THEME.ss.accent, THEME.emergency.accent]
  const fills  = [THEME.ea.fill, '#0d1a2e', THEME.voice.fill, THEME.ss.fill, THEME.emergency.fill]
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
            <g key={id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${colors[i]})` : undefined }} onClick={() => handleNodeClick(id)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.08 + i * 0.1}s`} fill="freeze" />
              {isActive && (
                <rect x={x} y={y} width={140} height={52} rx={6}
                  fill="none" stroke={colors[i]} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={x} y={y} width={140} height={52} rx={6} fill={fills[i]} stroke={colors[i]} strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
              <text x={x + 70} y={y + 22} textAnchor="middle" fontSize={11} fontWeight={700} fill={colors[i]} fontFamily="monospace">{labels[i]}</text>
              <text x={x + 70} y={y + 39} textAnchor="middle" fontSize={10} fill={THEME.subtext} fontFamily="monospace">{subs[i]}</text>
              {i < 4 && (
                <line x1={x + 140} y1={y + 26} x2={x + 156} y2={y + 4} stroke={colors[i]} strokeWidth={1} strokeDasharray="3,2" opacity={0.4} />
              )}
            </g>
          )
        })}
        <text x={400} y={172} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.05em">escalation →</text>
      </svg>
    </DiagramShell>
  )
}
