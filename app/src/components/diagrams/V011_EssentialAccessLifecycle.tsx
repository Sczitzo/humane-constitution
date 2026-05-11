// app/src/components/diagrams/V011_EssentialAccessLifecycle.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'enroll',   label: 'Enrollment',       definition: 'Person establishes Tier 0 (open-access) or Tier 1 (identity-verified) enrollment. Tier 0 requires no identity — pseudonymous token issued.', docLink: 'ANNEX_AK.md#AK8', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'alloc',    label: 'Allocation',        definition: 'CSM basket allocated: food, shelter, healthcare, water, communications. Allocation is unconditional — no means test, no behavioral requirement.', docLink: 'INVARIANTS.md#INV-001', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'delivery', label: 'Delivery',          definition: 'Basket delivered through the nearest operational delivery pathway. Delivery sufficiency register tracks which populations have a confirmed path.', docLink: 'ANNEX_AY.md', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'review',   label: 'Continuity Review', definition: 'Quarterly delivery sufficiency review. If any founding population lacks a confirmed delivery path, the gap is escalated to the Federated Ombuds.', docLink: 'ANNEX_AY.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'exit',     label: 'Exit / Reversion',  definition: 'Tier 1 de-enrollment reverts to Tier 0 — survival floor never cut. 60-day housing, 90-day healthcare, and 90-day EA continue post-exit.', docLink: 'ANNEX_AX.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
]

const STAGES = [
  { id: 'enroll',   label: 'ENROLL',    sub: 'Tier 0 or Tier 1',  stroke: THEME.ea.accent,    fill: THEME.ea.fill },
  { id: 'alloc',    label: 'ALLOCATE',  sub: 'CSM basket issued',  stroke: THEME.ea.accent,    fill: THEME.ea.fill },
  { id: 'delivery', label: 'DELIVER',   sub: 'sufficiency path',   stroke: THEME.ea.accent,    fill: THEME.ea.fill },
  { id: 'review',   label: 'REVIEW',    sub: 'quarterly check',    stroke: THEME.flow.accent,  fill: '#0d1a2e' },
  { id: 'exit',     label: 'EXIT',      sub: 'revert to Tier 0',   stroke: THEME.voice.accent, fill: THEME.voice.fill },
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
            <g key={s.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.08 + i * 0.1}s`} fill="freeze" />
              {i > 0 && <path d={`M${x - gap + 3},${cy + boxH / 2} L${x - 3},${cy + boxH / 2}`} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arr2)" />}
              {isActive && (
                <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill="none" stroke={s.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill={s.fill} stroke={s.stroke} strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
              <text x={x + boxW / 2} y={cy + 27} textAnchor="middle" fontSize={10} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 46} textAnchor="middle" fontSize={9} fill={THEME.subtext} fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}
        <defs>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
        </defs>
      </svg>
    </DiagramShell>
  )
}
