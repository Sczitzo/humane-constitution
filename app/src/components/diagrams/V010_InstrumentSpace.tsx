// app/src/components/diagrams/V010_InstrumentSpace.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'market',    label: 'Market Lane — Flow',                   definition: 'Ordinary commerce: wages, contracts, savings, investment. Governed by market rules. Demurrage-subject. Cannot cross into survival or civic lanes.', docLink: 'ANNEX_AB.md',          accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'survival',  label: 'Survival Lane — Essential Access',      definition: 'Unconditional floor. No market price. No means test. Delivered regardless of Flow balance or civic standing. Cannot be sold, traded, or withheld.', docLink: 'INVARIANTS.md#INV-001', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'civic',     label: 'Civic Lane — Voice & Service Record',   definition: 'Bounded civic influence and stewardship history. Cannot purchase goods or survival access. Cannot be converted to Flow.', docLink: 'ANNEX_Z.md',           accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'emergency', label: 'Emergency Overlay — Shared Storehouse', definition: 'Temporary rationing overlay. Activates only during verified scarcity. Overrides normal market lane for the affected category only. Mandatory unwind when scarcity resolves.', docLink: 'ANNEX_AC.md',          accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

export function V010_InstrumentSpace({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const lanes = [
    { id: 'market',   label: 'MARKET LANE',   sub: 'Flow — commerce · wages · contracts',       stroke: THEME.flow.accent,  fill: THEME.flow.fill,  y: 20  },
    { id: 'survival', label: 'SURVIVAL LANE', sub: 'Essential Access — unconditional floor',     stroke: THEME.ea.accent,    fill: THEME.ea.fill,    y: 78  },
    { id: 'civic',    label: 'CIVIC LANE',    sub: 'Voice & Service Record — bounded influence', stroke: THEME.voice.accent, fill: THEME.voice.fill, y: 136 },
  ]

  return (
    <DiagramShell figId="V-010" title="Instrument Space — Four Primary Lanes + Emergency Overlay" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 230" className="w-full" style={{ height: 230 }}>
        {lanes.map((l, i) => {
          const isActive = activeNodeId === l.id
          return (
            <g key={l.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${l.stroke})` : undefined }} onClick={() => handleNodeClick(l.id)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.1 + i * 0.1}s`} fill="freeze" />
              {isActive && <rect x={18} y={l.y - 2} width={584} height={54} rx={6} fill="none" stroke={l.stroke} strokeWidth={1.5} opacity={0.5}><animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" /></rect>}
              <rect x={20} y={l.y} width={580} height={50} rx={6} fill={l.fill} stroke={l.stroke} strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
              <text x={40} y={l.y + 22} fontSize={11} fontWeight={700} fill={l.stroke} fontFamily="monospace">{l.label}</text>
              <text x={40} y={l.y + 40} fontSize={9} fill={THEME.subtext} fontFamily="monospace">{l.sub}</text>
              <text x={610} y={l.y + 30} fontSize={8} fill={THEME.border} fontFamily="monospace">▐ FIREWALL</text>
            </g>
          )
        })}
        <g opacity={0} style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('emergency')}>
          <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin="0.4s" fill="freeze" />
          <rect x={20} y={20} width={580} height={166} rx={6} fill="none"
            stroke={THEME.ss.accent} strokeWidth={activeNodeId === 'emergency' ? THEME.strokeWidth.active : 1.5} strokeDasharray="8,5"
            style={{ filter: activeNodeId === 'emergency' ? `drop-shadow(0 0 8px ${THEME.ss.accent})` : undefined }} />
          <text x={614} y={108} fontSize={8} fill={THEME.ss.accent} fontFamily="monospace" letterSpacing="0.06em">EMERGENCY</text>
          <text x={614} y={120} fontSize={8} fill={THEME.ss.accent} fontFamily="monospace" letterSpacing="0.06em">OVERLAY</text>
          <text x={614} y={132} fontSize={7} fill={THEME.dim} fontFamily="monospace">(scarcity only)</text>
        </g>
        <text x={310} y={215} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.05em">
          instruments do not cross lanes · separation is constitutional, not contractual
        </text>
      </svg>
    </DiagramShell>
  )
}
