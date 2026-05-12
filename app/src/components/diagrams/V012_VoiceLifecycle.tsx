// app/src/components/diagrams/V012_VoiceLifecycle.tsx
// 2×2 grid forming a closed cycle: EARN → POOL → USE → DECAY → POOL (cycle)
// The DECAY → POOL return arc (dashed) shows unused voice returning to the community pool,
// not disappearing — it's a redistribution, not destruction.
// Animated particles trace clockwise flow + return arc.
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'earn',   label: 'Earn Voice',    definition: 'Voice weight earned through verified civic contribution — committee work, community service, peer review, recognized caretaking. Cannot be purchased.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'weight', label: 'Weighted Pool', definition: 'Voice weight enters the community deliberation pool. Each participant has bounded influence — no single actor can dominate a vote regardless of contribution history.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'use',    label: 'Use in Voting', definition: 'Voice used to set community priorities, elect rotating roles, and flag concerns. Cannot buy goods, services, or exemptions from enforcement.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'decay',  label: 'Decay',         definition: 'Unused Voice decays back to the community pool within one governance cycle. Prevents accumulation by passive holders or institutional actors. Voice that returns to pool can be re-earned.', docLink: 'ANNEX_Z.md', accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

// 2×2 grid: EARN(TL) POOL(TR) / DECAY(BL) USE(BR)
const BW = 148, BH = 68, HGAP = 60, VGAP = 50
const TLX = 28,  TLY = 28   // EARN
const TRX = 28 + BW + HGAP, TRY = 28   // POOL
const BLX = 28,  BLY = 28 + BH + VGAP  // DECAY
const BRX = 28 + BW + HGAP, BRY = 28 + BH + VGAP  // USE

// Arrow path segments
const P_EARN_POOL    = `M${TLX + BW + 4},${TLY + BH / 2} L${TRX - 4},${TRY + BH / 2}`
const P_POOL_USE     = `M${TRX + BW / 2},${TRY + BH + 4} L${BRX + BW / 2},${BRY - 4}`
const P_USE_DECAY    = `M${BRX - 4},${BRY + BH / 2} L${BLX + BW + 4},${BLY + BH / 2}`
// Return arc: DECAY top → curves up → POOL bottom  (dashed, redistribution)
const P_DECAY_POOL   = `M${BLX + BW / 2},${BLY - 4} C${BLX + BW / 2},${TLY + BH / 2} ${TRX + BW / 2},${TRY + BH + 20} ${TRX + BW / 2},${TRY + BH + 4}`

export function V012_VoiceLifecycle({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const stages = [
    { id: 'earn',   x: TLX, y: TLY, label: 'EARN',  sub: 'civic contribution', stroke: THEME.voice.accent, fill: THEME.voice.fill },
    { id: 'weight', x: TRX, y: TRY, label: 'POOL',  sub: 'bounded weight',     stroke: THEME.voice.accent, fill: THEME.voice.fill },
    { id: 'use',    x: BRX, y: BRY, label: 'USE',   sub: 'priority-setting',   stroke: THEME.voice.accent, fill: THEME.voice.fill },
    { id: 'decay',  x: BLX, y: BLY, label: 'DECAY', sub: 'returns to pool',    stroke: THEME.ss.accent,    fill: THEME.ss.fill },
  ]

  return (
    <DiagramShell figId="V-012" title="Voice — Civic Influence Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 440 220" className="w-full" style={{ height: 220 }}>
        <defs>
          <marker id="arrV12" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
          <marker id="arrV12ret" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.ss.accent} />
          </marker>
          <path id="v12p1" d={P_EARN_POOL} />
          <path id="v12p2" d={P_POOL_USE} />
          <path id="v12p3" d={P_USE_DECAY} />
          <path id="v12p4" d={P_DECAY_POOL} />
        </defs>

        {/* Main clockwise arrows */}
        <path d={P_EARN_POOL} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrV12)" />
        <path d={P_POOL_USE}  fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrV12)" />
        <path d={P_USE_DECAY} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrV12)" />

        {/* Return arc: DECAY → POOL (redistribution, not destruction) */}
        <path d={P_DECAY_POOL} fill="none" stroke={THEME.ss.accent} strokeWidth={1.5}
          strokeDasharray="6,4" markerEnd="url(#arrV12ret)" opacity={0.7} />
        <text x={BLX - 6} y={(TLY + BLY + BH) / 2} textAnchor="end"
          fontSize={7.5} fill={THEME.ss.accent} fontFamily="monospace" opacity={0.8}
          transform={`rotate(-90,${BLX - 6},${(TLY + BLY + BH) / 2})`}>
          returns to pool ↑
        </text>

        {/* Animated particles */}
        {[0, 0.7].map(d => (
          <circle key={d} r={3.5} fill={THEME.voice.accent} opacity={0.8}>
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${d}s`}><mpath href="#v12p1" /></animateMotion>
          </circle>
        ))}
        <circle r={3.5} fill={THEME.voice.accent} opacity={0.8}>
          <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.3s"><mpath href="#v12p2" /></animateMotion>
        </circle>
        {[0, 0.8].map(d => (
          <circle key={d} r={3.5} fill={THEME.voice.accent} opacity={0.8}>
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${d}s`}><mpath href="#v12p3" /></animateMotion>
          </circle>
        ))}
        <circle r={3} fill={THEME.ss.accent} opacity={0.6}>
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s"><mpath href="#v12p4" /></animateMotion>
        </circle>

        {/* Stage boxes */}
        {stages.map((s, i) => {
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 7px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.06 + i * 0.1}s`} fill="freeze" />
              {isActive && (
                <rect x={s.x - 2} y={s.y - 2} width={BW + 4} height={BH + 4} rx={7}
                  fill="none" stroke={s.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={s.x} y={s.y} width={BW} height={BH} rx={6}
                fill={s.fill} stroke={s.stroke}
                strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
              />
              <text x={s.x + BW / 2} y={s.y + 28} textAnchor="middle" fontSize={12} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={s.x + BW / 2} y={s.y + 48} textAnchor="middle" fontSize={9.5} fill={THEME.subtext} fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}
      </svg>
    </DiagramShell>
  )
}
