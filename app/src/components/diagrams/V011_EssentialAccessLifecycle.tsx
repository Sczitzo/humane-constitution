// app/src/components/diagrams/V011_EssentialAccessLifecycle.tsx
// Key design insight: EXIT stage shows a curved reversion arrow back to Tier 0 (ENROLL),
// making explicit that de-enrollment never cuts the survival floor — it reverts, never severs.
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'enroll',   label: 'Enrollment',       definition: 'Person establishes Tier 0 (open-access) or Tier 1 (identity-verified) enrollment. Tier 0 requires no identity — pseudonymous token issued.', docLink: 'ANNEX_AK.md#AK8',    accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'alloc',    label: 'Allocation',        definition: 'CSM basket allocated: food, shelter, healthcare, water, communications. Allocation is unconditional — no means test, no behavioral requirement.', docLink: 'INVARIANTS.md#INV-001', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'delivery', label: 'Delivery',          definition: 'Basket delivered through the nearest operational delivery pathway. Delivery sufficiency register tracks which populations have a confirmed path.', docLink: 'ANNEX_AY.md',         accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'review',   label: 'Continuity Review', definition: 'Quarterly delivery sufficiency review. If any founding population lacks a confirmed delivery path, the gap is escalated to the Federated Ombuds.', docLink: 'ANNEX_AY.md',         accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'exit',     label: 'Exit / Reversion',  definition: 'Tier 1 de-enrollment reverts to Tier 0 — survival floor never cut. 60-day housing, 90-day healthcare, and 90-day EA continue post-exit. The floor is permanent.', docLink: 'ANNEX_AX.md',         accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
]

const STAGES = [
  { id: 'enroll',   label: 'ENROLL',   sub: 'Tier 0 or Tier 1', stroke: THEME.ea.accent,    fill: THEME.ea.fill },
  { id: 'alloc',    label: 'ALLOCATE', sub: 'CSM basket issued', stroke: THEME.ea.accent,    fill: THEME.ea.fill },
  { id: 'delivery', label: 'DELIVER',  sub: 'sufficiency path',  stroke: THEME.ea.accent,    fill: THEME.ea.fill },
  { id: 'review',   label: 'REVIEW',   sub: 'quarterly check',   stroke: THEME.flow.accent,  fill: '#0d1a2e' },
  { id: 'exit',     label: 'EXIT',     sub: 'revert to Tier 0',  stroke: THEME.voice.accent, fill: THEME.voice.fill },
]

const boxW = 112, boxH = 68, gap = 14, startX = 8, cy = 40

export function V011_EssentialAccessLifecycle({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  // Reversion arrow: from bottom of EXIT box → curves down → back to bottom of ENROLL box
  const exitCx = startX + 4 * (boxW + gap) + boxW / 2
  const enrollCx = startX + boxW / 2
  const arrowY = cy + boxH + 18
  const reversionPath = `M${exitCx},${cy + boxH} Q${exitCx},${arrowY + 22} ${(exitCx + enrollCx) / 2},${arrowY + 28} Q${enrollCx},${arrowY + 22} ${enrollCx},${cy + boxH}`

  return (
    <DiagramShell figId="V-011" title="Essential Access — Entitlement Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 168" className="w-full" style={{ height: 168 }}>
        <defs>
          <marker id="arrV11" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
          <marker id="arrV11rev" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
            <path d="M6,0 L6,6 L0,3 Z" fill={THEME.voice.accent} />
          </marker>
        </defs>

        {/* Stage boxes */}
        {STAGES.map((s, i) => {
          const x = startX + i * (boxW + gap)
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.06 + i * 0.1}s`} fill="freeze" />
              {i > 0 && (
                <path d={`M${x - gap + 3},${cy + boxH / 2} L${x - 3},${cy + boxH / 2}`}
                  fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrV11)" />
              )}
              {isActive && (
                <rect x={x - 1} y={cy - 1} width={boxW + 2} height={boxH + 2} rx={7}
                  fill="none" stroke={s.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6}
                fill={s.fill} stroke={s.stroke}
                strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
              />
              <text x={x + boxW / 2} y={cy + 26} textAnchor="middle" fontSize={10} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 46} textAnchor="middle" fontSize={8.5} fill={THEME.subtext} fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}

        {/* Reversion arrow: EXIT curves back to ENROLL (floor never cut) */}
        <path d={reversionPath} fill="none"
          stroke={THEME.voice.accent} strokeWidth={1.5} strokeDasharray="5,3"
          markerEnd="url(#arrV11rev)"
          opacity={0}
        >
          <animate attributeName="opacity" from={0} to={0.75} dur="0.4s" begin="0.7s" fill="freeze" />
        </path>
        <text x={(exitCx + enrollCx) / 2} y={arrowY + 44} textAnchor="middle"
          fontSize={8} fill={THEME.voice.accent} fontFamily="monospace" opacity={0}>
          <animate attributeName="opacity" from={0} to={0.8} dur="0.4s" begin="0.85s" fill="freeze" />
          Tier 1 exit → reverts to Tier 0 · floor never severed
        </text>
      </svg>
    </DiagramShell>
  )
}
