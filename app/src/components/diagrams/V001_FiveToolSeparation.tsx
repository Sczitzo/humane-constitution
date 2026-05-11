// app/src/components/diagrams/V001_FiveToolSeparation.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  {
    id: 'flow',
    label: 'Flow',
    definition: 'Ordinary market money. Used for wages, contracts, savings, and commerce. Subject to demurrage. Cannot be converted to survival access, civic weight, or stewardship standing.',
    docLink: 'ANNEX_AB.md#AB2',
    accent: '#58a6ff',
    accentBg: 'rgba(88,166,255,0.07)',
  },
  {
    id: 'ea',
    label: 'Essential Access',
    definition: 'The unconditional survival floor. Food, shelter, healthcare, water, communications. Non-delegable, non-transferable, non-convertible. Exists beneath the market, not inside it.',
    docLink: 'INVARIANTS.md#INV-001',
    accent: '#3fb950',
    accentBg: 'rgba(63,185,80,0.07)',
  },
  {
    id: 'voice',
    label: 'Voice',
    definition: 'Bounded civic influence for setting community priorities. Decays over time, cannot be accumulated without contribution, cannot purchase goods, rights, or protection from enforcement.',
    docLink: 'ANNEX_Z.md',
    accent: '#d29922',
    accentBg: 'rgba(210,153,34,0.07)',
  },
  {
    id: 'sr',
    label: 'Service Record',
    definition: 'Verified history of community stewardship. Used for rotating civic roles, not as a score of human worth. Protected from external misuse as a credit proxy or employability signal.',
    docLink: 'ANNEX_Z.md',
    accent: '#a371f7',
    accentBg: 'rgba(163,113,247,0.07)',
  },
  {
    id: 'ss',
    label: 'Shared Storehouse',
    definition: 'Emergency rationing activated only during verified scarcity. Temporary, oracle-gated, with mandatory unwind. Not a normal distribution system — a last-resort coordination mechanism.',
    docLink: 'ANNEX_AC.md',
    accent: '#f85149',
    accentBg: 'rgba(248,81,73,0.07)',
  },
]

export function V001_FiveToolSeparation({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const nodeStyle = (id: string, stroke: string) => ({
    cursor: 'pointer' as const,
    filter: activeNodeId === id ? `drop-shadow(0 0 6px ${stroke})` : undefined,
  })

  return (
    <DiagramShell
      figId="V-001"
      title="Five-Instrument Constitutional Architecture"
      nodes={NODES}
      activeNodeId={activeNodeId}
      onInternalLink={onInternalLink}
    >
      <svg viewBox="0 0 920 210" className="w-full" style={{ height: 210 }}>
        {/* Firewall dashed lines */}
        {[186, 362, 538, 714].map(x => (
          <g key={x}>
            <line x1={x} y1={12} x2={x} y2={178} stroke="#21262d" strokeWidth={1} strokeDasharray="5,4" />
            <text x={x} y={10} textAnchor="middle" fontSize={9} fill="#8b949e" fontFamily="monospace" letterSpacing="0.06em">FIREWALL</text>
          </g>
        ))}

        {/* FLOW */}
        <g style={nodeStyle('flow', '#58a6ff')} onClick={() => handleNodeClick('flow')}>
          <rect x={10} y={22} width={156} height={108} rx={8} fill="#0d2137" stroke="#58a6ff" strokeWidth={activeNodeId === 'flow' ? 2.5 : 2} />
          <text x={88} y={62} textAnchor="middle" fontSize={15} fontWeight={700} fill="#58a6ff" fontFamily="monospace">FLOW</text>
          <text x={88} y={86} textAnchor="middle" fontSize={12} fill="#b6c2cf" fontFamily="monospace">market money</text>
          <text x={88} y={105} textAnchor="middle" fontSize={12} fill="#b6c2cf" fontFamily="monospace">wages · contracts</text>
        </g>

        {/* ESSENTIAL ACCESS */}
        <g style={nodeStyle('ea', '#3fb950')} onClick={() => handleNodeClick('ea')}>
          <rect x={206} y={22} width={156} height={108} rx={8} fill="#0d2116" stroke="#3fb950" strokeWidth={activeNodeId === 'ea' ? 2.5 : 2} />
          <text x={284} y={57} textAnchor="middle" fontSize={14} fontWeight={700} fill="#3fb950" fontFamily="monospace">ESSENTIAL</text>
          <text x={284} y={75} textAnchor="middle" fontSize={14} fontWeight={700} fill="#3fb950" fontFamily="monospace">ACCESS</text>
          <text x={284} y={101} textAnchor="middle" fontSize={12} fill="#b6c2cf" fontFamily="monospace">survival floor</text>
        </g>

        {/* VOICE */}
        <g style={nodeStyle('voice', '#d29922')} onClick={() => handleNodeClick('voice')}>
          <rect x={382} y={22} width={156} height={108} rx={8} fill="#1f1a0d" stroke="#d29922" strokeWidth={activeNodeId === 'voice' ? 2.5 : 2} />
          <text x={460} y={65} textAnchor="middle" fontSize={15} fontWeight={700} fill="#d29922" fontFamily="monospace">VOICE</text>
          <text x={460} y={88} textAnchor="middle" fontSize={12} fill="#b6c2cf" fontFamily="monospace">civic priority</text>
          <text x={460} y={107} textAnchor="middle" fontSize={12} fill="#b6c2cf" fontFamily="monospace">bounded influence</text>
        </g>

        {/* SERVICE RECORD */}
        <g style={nodeStyle('sr', '#a371f7')} onClick={() => handleNodeClick('sr')}>
          <rect x={558} y={22} width={156} height={108} rx={8} fill="#170d21" stroke="#a371f7" strokeWidth={activeNodeId === 'sr' ? 2.5 : 2} />
          <text x={636} y={57} textAnchor="middle" fontSize={14} fontWeight={700} fill="#a371f7" fontFamily="monospace">SERVICE</text>
          <text x={636} y={75} textAnchor="middle" fontSize={14} fontWeight={700} fill="#a371f7" fontFamily="monospace">RECORD</text>
          <text x={636} y={97} textAnchor="middle" fontSize={12} fill="#b6c2cf" fontFamily="monospace">verified</text>
          <text x={636} y={114} textAnchor="middle" fontSize={12} fill="#b6c2cf" fontFamily="monospace">stewardship</text>
        </g>

        {/* SHARED STOREHOUSE */}
        <g style={nodeStyle('ss', '#f85149')} onClick={() => handleNodeClick('ss')}>
          <rect x={734} y={22} width={176} height={108} rx={8} fill="#1a0d0d" stroke="#f85149" strokeWidth={activeNodeId === 'ss' ? 2.5 : 2} strokeDasharray="6,4" />
          <text x={822} y={57} textAnchor="middle" fontSize={14} fontWeight={700} fill="#f85149" fontFamily="monospace">SHARED</text>
          <text x={822} y={75} textAnchor="middle" fontSize={14} fontWeight={700} fill="#f85149" fontFamily="monospace">STOREHOUSE</text>
          <text x={822} y={101} textAnchor="middle" fontSize={12} fill="#b6c2cf" fontFamily="monospace">emergency only</text>
        </g>

        {/* Baseline */}
        <line x1={10} y1={170} x2={910} y2={170} stroke="#21262d" strokeWidth={1} />
        <text x={460} y={188} textAnchor="middle" fontSize={10} fill="#8b949e" fontFamily="monospace" letterSpacing="0.05em">
          CONSTITUTIONAL SURVIVAL MINIMUM — floor beneath all five instruments
        </text>
      </svg>
    </DiagramShell>
  )
}
