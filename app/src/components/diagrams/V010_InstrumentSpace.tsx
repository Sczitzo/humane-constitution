// app/src/components/diagrams/V010_InstrumentSpace.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  { id: 'market',    label: 'Market Lane — Flow',                      definition: 'Ordinary commerce: wages, contracts, savings, investment. Governed by market rules. Demurrage-subject. Cannot cross into survival or civic lanes.', docLink: 'ANNEX_AB.md', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
  { id: 'survival',  label: 'Survival Lane — Essential Access',         definition: 'Unconditional floor. No market price. No means test. Delivered regardless of Flow balance or civic standing. Cannot be sold, traded, or withheld.', docLink: 'INVARIANTS.md#INV-001', accent: '#3fb950', accentBg: 'rgba(63,185,80,0.07)' },
  { id: 'civic',     label: 'Civic Lane — Voice & Service Record',      definition: 'Bounded civic influence and stewardship history. Cannot purchase goods or survival access. Cannot be converted to Flow.', docLink: 'ANNEX_Z.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'emergency', label: 'Emergency Overlay — Shared Storehouse',    definition: 'Temporary rationing overlay. Activates only during verified scarcity. Overrides normal market lane for the affected category only. Mandatory unwind when scarcity resolves.', docLink: 'ANNEX_AC.md', accent: '#f85149', accentBg: 'rgba(248,81,73,0.07)' },
]

export function V010_InstrumentSpace({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const lanes = [
    { id: 'market',   label: 'MARKET LANE',   sub: 'Flow — commerce · wages · contracts',          stroke: '#58a6ff', fill: '#0d2137', y: 20  },
    { id: 'survival', label: 'SURVIVAL LANE', sub: 'Essential Access — unconditional floor',        stroke: '#3fb950', fill: '#0d2116', y: 78  },
    { id: 'civic',    label: 'CIVIC LANE',    sub: 'Voice & Service Record — bounded influence',    stroke: '#d29922', fill: '#1f1a0d', y: 136 },
  ]

  return (
    <DiagramShell figId="V-010" title="Instrument Space — Four Primary Lanes + Emergency Overlay" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 230" className="w-full" style={{ height: 230 }}>
        {lanes.map(l => {
          const isActive = activeNodeId === l.id
          return (
            <g key={l.id} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${l.stroke})` : undefined }} onClick={() => handleNodeClick(l.id)}>
              <rect x={20} y={l.y} width={580} height={50} rx={6} fill={l.fill} stroke={l.stroke} strokeWidth={isActive ? 2.5 : 2} />
              <text x={40} y={l.y + 22} fontSize={11} fontWeight={700} fill={l.stroke} fontFamily="monospace">{l.label}</text>
              <text x={40} y={l.y + 40} fontSize={9} fill="#b6c2cf" fontFamily="monospace">{l.sub}</text>
              <text x={610} y={l.y + 30} fontSize={8} fill="#30363d" fontFamily="monospace">▐ FIREWALL</text>
            </g>
          )
        })}
        <g style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('emergency')}>
          <rect x={20} y={20} width={580} height={166} rx={6} fill="none"
            stroke="#f85149" strokeWidth={activeNodeId === 'emergency' ? 2.5 : 1.5} strokeDasharray="8,5"
            style={{ filter: activeNodeId === 'emergency' ? 'drop-shadow(0 0 8px #f85149)' : undefined }} />
          <text x={614} y={108} fontSize={8} fill="#f85149" fontFamily="monospace" letterSpacing="0.06em">EMERGENCY</text>
          <text x={614} y={120} fontSize={8} fill="#f85149" fontFamily="monospace" letterSpacing="0.06em">OVERLAY</text>
          <text x={614} y={132} fontSize={7} fill="#8b949e" fontFamily="monospace">(scarcity only)</text>
        </g>
        <text x={310} y={215} textAnchor="middle" fontSize={9} fill="#8b949e" fontFamily="monospace" letterSpacing="0.05em">
          instruments do not cross lanes · separation is constitutional, not contractual
        </text>
      </svg>
    </DiagramShell>
  )
}
