// app/src/components/diagrams/V010_InstrumentSpace.tsx
// Three horizontal lanes + emergency overlay — with animated flow particles in each lane
// Two FIREWALL labels sit centered in the gaps between adjacent lanes (not on the right edge)
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'market',    label: 'Market Lane — Flow',                   definition: 'Ordinary commerce: wages, contracts, savings, investment. Governed by market rules. Demurrage-subject. Cannot cross into survival or civic lanes.', docLink: 'ANNEX_AB.md',          accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'survival',  label: 'Survival Lane — Essential Access',      definition: 'Unconditional floor. No market price. No means test. Delivered regardless of Flow balance or civic standing. Cannot be sold, traded, or withheld.', docLink: 'INVARIANTS.md#INV-001', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'civic',     label: 'Civic Lane — Voice & Service Record',   definition: 'Bounded civic influence and stewardship history. Cannot purchase goods or survival access. Cannot be converted to Flow.', docLink: 'ANNEX_Z.md',           accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'emergency', label: 'Emergency Overlay — Shared Storehouse', definition: 'Temporary rationing overlay. Activates only during verified scarcity. Overrides normal market lane for the affected category only. Mandatory unwind when scarcity resolves.', docLink: 'ANNEX_AC.md',          accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

// Spread lanes out with a 30px gap so FIREWALL labels fit between them
const LANE_H = 54, LANE_W = 570, LANE_X = 20, LANE_GAP = 30

const LANES = [
  { id: 'market',   label: 'MARKET LANE',   sub: 'Flow — commerce · wages · contracts',       stroke: THEME.flow.accent,  fill: THEME.flow.fill,  y: 16  },
  { id: 'survival', label: 'SURVIVAL LANE', sub: 'Essential Access — unconditional floor',     stroke: THEME.ea.accent,    fill: THEME.ea.fill,    y: 16 + LANE_H + LANE_GAP  },
  { id: 'civic',    label: 'CIVIC LANE',    sub: 'Voice & Service Record — bounded influence', stroke: THEME.voice.accent, fill: THEME.voice.fill, y: 16 + (LANE_H + LANE_GAP) * 2 },
]

// Firewall separator y positions — centered in each gap
const FW_LABELS = [
  { y: 16 + LANE_H + LANE_GAP / 2 },        // between Market and Survival
  { y: 16 + (LANE_H + LANE_GAP) + LANE_H + LANE_GAP / 2 }, // between Survival and Civic
]

const particlePaths = LANES.map(lane => `M${LANE_X + 10},${lane.y + LANE_H / 2} L${LANE_X + LANE_W - 10},${lane.y + LANE_H / 2}`)

const totalLanesH = LANE_H * 3 + LANE_GAP * 2   // 162 + 60 = 222
const overlayH = totalLanesH                      // same as 3 lanes span

export function V010_InstrumentSpace({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  return (
    <DiagramShell figId="V-010" title="Instrument Space — Four Primary Lanes + Emergency Overlay" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 268" className="w-full" style={{ height: 268 }}>
        <defs>
          {LANES.map((_lane, i) => (
            <path key={i} id={`v10p${i}`} d={particlePaths[i]} />
          ))}
        </defs>

        {/* FIREWALL separator labels — 2 labels between 3 lanes */}
        {FW_LABELS.map((fw, i) => (
          <g key={i} opacity={0}>
            <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin={`${0.5 + i * 0.1}s`} fill="freeze" />
            {/* Dashed separator line across full lane width */}
            <line x1={LANE_X} y1={fw.y} x2={LANE_X + LANE_W} y2={fw.y}
              stroke={THEME.divider} strokeWidth={1} strokeDasharray="6,4" />
            {/* Centred label */}
            <rect x={LANE_X + LANE_W / 2 - 42} y={fw.y - 9} width={84} height={18} rx={4}
              fill="#0d1117" stroke={THEME.divider} strokeWidth={1} />
            <text x={LANE_X + LANE_W / 2} y={fw.y + 5} textAnchor="middle"
              fontSize={10} fontWeight={700} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.08em">
              ⬡ FIREWALL ⬡
            </text>
          </g>
        ))}

        {/* Lane rows */}
        {LANES.map((l, i) => {
          const isActive = activeNodeId === l.id
          return (
            <g key={l.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 7px ${l.stroke})` : undefined }} onClick={() => handleNodeClick(l.id)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.08 + i * 0.12}s`} fill="freeze" />
              {isActive && (
                <rect x={LANE_X - 2} y={l.y - 2} width={LANE_W + 4} height={LANE_H + 4} rx={7}
                  fill="none" stroke={l.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={LANE_X} y={l.y} width={LANE_W} height={LANE_H} rx={6}
                fill={l.fill} stroke={l.stroke}
                strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
              />
              <text x={LANE_X + 18} y={l.y + 22} fontSize={11} fontWeight={700} fill={l.stroke} fontFamily="monospace">{l.label}</text>
              <text x={LANE_X + 18} y={l.y + 39} fontSize={8.5} fill={THEME.subtext} fontFamily="monospace">{l.sub}</text>

              {/* Animated particles flowing right within each lane */}
              {[0, 0.8, 1.6].map(delay => (
                <circle key={delay} r={3} fill={l.stroke} opacity={0.5}>
                  <animateMotion dur="3s" repeatCount="indefinite" begin={`${delay}s`}>
                    <mpath href={`#v10p${i}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          )
        })}

        {/* Emergency overlay — dashed rect spanning all 3 lanes */}
        <g opacity={0} style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('emergency')}>
          <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin="0.45s" fill="freeze" />
          <rect x={LANE_X} y={16} width={LANE_W} height={overlayH} rx={6} fill="none"
            stroke={THEME.ss.accent} strokeWidth={activeNodeId === 'emergency' ? 3 : 2.5}
            strokeDasharray="8,5"
            style={{ filter: activeNodeId === 'emergency' ? `drop-shadow(0 0 8px ${THEME.ss.accent})` : undefined }}
          />
          <text x={LANE_X + LANE_W + 10} y={16 + overlayH / 2 - 14} fontSize={10} fontWeight={700} fill={THEME.ss.accent} fontFamily="monospace" letterSpacing="0.05em">EMERGENCY</text>
          <text x={LANE_X + LANE_W + 10} y={16 + overlayH / 2}      fontSize={10} fontWeight={700} fill={THEME.ss.accent} fontFamily="monospace" letterSpacing="0.05em">OVERLAY</text>
          <text x={LANE_X + LANE_W + 10} y={16 + overlayH / 2 + 14} fontSize={8.5} fill={THEME.ss.accent} fontFamily="monospace" opacity={0.7}>(scarcity only)</text>
        </g>

        {/* Separator note */}
        <text x={LANE_X + LANE_W / 2} y={16 + overlayH + 22} textAnchor="middle" fontSize={8.5} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.05em">
          instruments do not cross lanes · separation is constitutional, not contractual
        </text>
      </svg>
    </DiagramShell>
  )
}
