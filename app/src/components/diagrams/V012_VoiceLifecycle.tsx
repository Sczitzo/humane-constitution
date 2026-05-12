// app/src/components/diagrams/V012_VoiceLifecycle.tsx
// 2×2 grid forming a closed cycle: EARN → POOL → USE → DECAY → POOL (cycle)
// Left padding gives the DECAY→POOL return arc room to breathe.
// Label sits horizontally near the arc midpoint — no rotation needed.
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'earn',   label: 'Earn Voice',    definition: 'Voice weight earned through verified civic contribution — committee work, community service, peer review, recognized caretaking. Cannot be purchased.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'weight', label: 'Weighted Pool', definition: 'Voice weight enters the community deliberation pool. Each participant has bounded influence — no single actor can dominate a vote regardless of contribution history.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'use',    label: 'Use in Voting', definition: 'Voice used to set community priorities, elect rotating roles, and flag concerns. Cannot buy goods, services, or exemptions from enforcement.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'decay',  label: 'Decay',         definition: 'Unused Voice decays back to the community pool within one governance cycle. Prevents accumulation by passive holders or institutional actors. Voice that returns to pool can be re-earned.', docLink: 'ANNEX_Z.md', accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

// 2×2 grid shifted right to leave room for the return arc on the left
const BW = 148, BH = 68, HGAP = 70, VGAP = 54
const PAD = 80   // left padding for the arc

const TLX = PAD,           TLY = 20   // EARN  (top-left)
const TRX = PAD + BW + HGAP, TRY = 20   // POOL  (top-right)
const BLX = PAD,           BLY = 20 + BH + VGAP  // DECAY (bottom-left)
const BRX = PAD + BW + HGAP, BRY = 20 + BH + VGAP  // USE   (bottom-right)

// Arrow paths
const P_EARN_POOL  = `M${TLX + BW + 4},${TLY + BH / 2} L${TRX - 4},${TRY + BH / 2}`
const P_POOL_USE   = `M${TRX + BW / 2},${TRY + BH + 4} L${BRX + BW / 2},${BRY - 4}`
const P_USE_DECAY  = `M${BRX - 4},${BRY + BH / 2} L${BLX + BW + 4},${BLY + BH / 2}`
// Return arc: DECAY top → sweeps left then up → POOL bottom
// Control points pull the arc well clear of the nodes into the left padding
const P_DECAY_POOL = `M${BLX + BW / 2},${BLY - 4} C${BLX - 40},${BLY - 20} ${TRX - 40},${TRY + BH + 30} ${TRX + BW / 2},${TRY + BH + 4}`

// Arc midpoint (t≈0.5 on the cubic bezier) — used to position the label
const ARC_LABEL_X = PAD - 14
const ARC_LABEL_Y = TLY + BH + VGAP / 2

const VW = PAD + BW + HGAP + BW + 20   // total width

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
      <svg viewBox={`0 0 ${VW} 230`} className="w-full" style={{ height: 230 }}>
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

        {/* Return arc: DECAY → POOL through left-side space */}
        <path d={P_DECAY_POOL} fill="none" stroke={THEME.ss.accent} strokeWidth={1.5}
          strokeDasharray="6,4" markerEnd="url(#arrV12ret)" opacity={0.75} />

        {/* Label near arc midpoint — horizontal, in the left padding zone */}
        <text x={ARC_LABEL_X} y={ARC_LABEL_Y}
          textAnchor="middle" fontSize={8} fill={THEME.ss.accent} fontFamily="monospace" opacity={0.85}>
          ↺ returns
        </text>
        <text x={ARC_LABEL_X} y={ARC_LABEL_Y + 13}
          textAnchor="middle" fontSize={8} fill={THEME.ss.accent} fontFamily="monospace" opacity={0.85}>
          to pool
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
        <circle r={3} fill={THEME.ss.accent} opacity={0.65}>
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.5s"><mpath href="#v12p4" /></animateMotion>
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
