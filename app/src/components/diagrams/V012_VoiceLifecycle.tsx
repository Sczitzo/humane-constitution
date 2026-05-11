// app/src/components/diagrams/V012_VoiceLifecycle.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'earn',   label: 'Earn Voice',    definition: 'Voice weight earned through verified civic contribution — committee work, community service, peer review, recognized caretaking. Cannot be purchased.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'weight', label: 'Weighted Pool', definition: 'Voice weight enters the community deliberation pool. Each participant has bounded influence — no single actor can dominate a vote regardless of contribution history.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'use',    label: 'Use in Voting', definition: 'Voice used to set community priorities, elect rotating roles, and flag concerns. Cannot buy goods, services, or exemptions from enforcement.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'decay',  label: 'Decay',         definition: 'Unused Voice decays back to the community pool within one governance cycle. Prevents accumulation by passive holders or institutional actors.', docLink: 'ANNEX_Z.md', accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

const STAGES = [
  { id: 'earn',   label: 'EARN',  sub: 'civic contribution', stroke: THEME.voice.accent, fill: THEME.voice.fill },
  { id: 'weight', label: 'POOL',  sub: 'bounded weight',     stroke: THEME.voice.accent, fill: THEME.voice.fill },
  { id: 'use',    label: 'USE',   sub: 'priority-setting',   stroke: THEME.voice.accent, fill: THEME.voice.fill },
  { id: 'decay',  label: 'DECAY', sub: 'returns to pool',    stroke: THEME.ss.accent,    fill: THEME.ss.fill },
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
            <g key={s.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.08 + i * 0.1}s`} fill="freeze" />
              {i > 0 && <path d={`M${x - gap + 3},${cy + boxH / 2} L${x - 3},${cy + boxH / 2}`} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arr3)" />}
              {isActive && (
                <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill="none" stroke={s.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill={s.fill} stroke={s.stroke} strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
              <text x={x + boxW / 2} y={cy + 28} textAnchor="middle" fontSize={12} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 48} textAnchor="middle" fontSize={10} fill={THEME.subtext} fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}
        <defs>
          <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
        </defs>
      </svg>
    </DiagramShell>
  )
}
