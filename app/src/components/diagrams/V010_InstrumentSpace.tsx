// app/src/components/diagrams/V010_InstrumentSpace.tsx
// Three horizontal lanes + emergency overlay — with animated flow particles in each lane
// Firewall columns on the right enforce lane separation visually
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'market',    label: 'Market Lane — Flow',                   definition: 'Ordinary commerce: wages, contracts, savings, investment. Governed by market rules. Demurrage-subject. Cannot cross into survival or civic lanes.', docLink: 'ANNEX_AB.md',          accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'survival',  label: 'Survival Lane — Essential Access',      definition: 'Unconditional floor. No market price. No means test. Delivered regardless of Flow balance or civic standing. Cannot be sold, traded, or withheld.', docLink: 'INVARIANTS.md#INV-001', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'civic',     label: 'Civic Lane — Voice & Service Record',   definition: 'Bounded civic influence and stewardship history. Cannot purchase goods or survival access. Cannot be converted to Flow.', docLink: 'ANNEX_Z.md',           accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'emergency', label: 'Emergency Overlay — Shared Storehouse', definition: 'Temporary rationing overlay. Activates only during verified scarcity. Overrides normal market lane for the affected category only. Mandatory unwind when scarcity resolves.', docLink: 'ANNEX_AC.md',          accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

const LANES = [
  { id: 'market',   label: 'MARKET LANE',   sub: 'Flow — commerce · wages · contracts',       stroke: THEME.flow.accent,  fill: THEME.flow.fill,  y: 18  },
  { id: 'survival', label: 'SURVIVAL LANE', sub: 'Essential Access — unconditional floor',     stroke: THEME.ea.accent,    fill: THEME.ea.fill,    y: 82  },
  { id: 'civic',    label: 'CIVIC LANE',    sub: 'Voice & Service Record — bounded influence', stroke: THEME.voice.accent, fill: THEME.voice.fill, y: 146 },
]

const LANE_H = 54, LANE_W = 570, LANE_X = 20

// Particle path per lane (horizontal movement within lane)
const particlePaths = LANES.map(lane => `M${LANE_X + 10},${lane.y + LANE_H / 2} L${LANE_X + LANE_W - 10},${lane.y + LANE_H / 2}`)

export function V010_InstrumentSpace({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  return (
    <DiagramShell figId="V-010" title="Instrument Space — Four Primary Lanes + Emergency Overlay" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 240" className="w-full" style={{ height: 240 }}>
        <defs>
          {LANES.map((_lane, i) => (
            <path key={i} id={`v10p${i}`} d={particlePaths[i]} />
          ))}
        </defs>

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

              {/* Firewall label on right */}
              <text x={LANE_X + LANE_W + 8} y={l.y + LANE_H / 2 + 4} fontSize={7.5} fill={THEME.border} fontFamily="monospace" letterSpacing="0.05em">▐ FIREWALL</text>
            </g>
          )
        })}

        {/* Emergency overlay — dashed rect spanning all 3 lanes */}
        <g opacity={0} style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('emergency')}>
          <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin="0.45s" fill="freeze" />
          <rect x={LANE_X} y={18} width={LANE_W} height={182} rx={6} fill="none"
            stroke={THEME.ss.accent} strokeWidth={activeNodeId === 'emergency' ? THEME.strokeWidth.active : 1.5}
            strokeDasharray="8,5"
            style={{ filter: activeNodeId === 'emergency' ? `drop-shadow(0 0 8px ${THEME.ss.accent})` : undefined }}
          />
          <text x={LANE_X + LANE_W + 8} y={108} fontSize={7.5} fill={THEME.ss.accent} fontFamily="monospace" letterSpacing="0.05em">EMERGENCY</text>
          <text x={LANE_X + LANE_W + 8} y={120} fontSize={7.5} fill={THEME.ss.accent} fontFamily="monospace" letterSpacing="0.05em">OVERLAY</text>
          <text x={LANE_X + LANE_W + 8} y={132} fontSize={7} fill={THEME.dim} fontFamily="monospace">(scarcity only)</text>
        </g>

        {/* Separator note */}
        <text x={LANE_X + LANE_W / 2} y={220} textAnchor="middle" fontSize={8.5} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.05em">
          instruments do not cross lanes · separation is constitutional, not contractual
        </text>
      </svg>
    </DiagramShell>
  )
}
