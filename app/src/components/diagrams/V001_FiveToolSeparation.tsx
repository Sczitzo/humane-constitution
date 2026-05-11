// app/src/components/diagrams/V001_FiveToolSeparation.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 'flow',
    label: 'Flow',
    definition: 'Ordinary market money. Used for wages, contracts, savings, and commerce. Subject to demurrage. Cannot be converted to survival access, civic weight, or stewardship standing.',
    docLink: 'ANNEX_AB.md#AB2',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
  },
  {
    id: 'ea',
    label: 'Essential Access',
    definition: 'The unconditional survival floor. Food, shelter, healthcare, water, communications. Non-delegable, non-transferable, non-convertible. Exists beneath the market, not inside it.',
    docLink: 'INVARIANTS.md#INV-001',
    accent: THEME.ea.accent,
    accentBg: THEME.ea.accentBg,
  },
  {
    id: 'voice',
    label: 'Voice',
    definition: 'Bounded civic influence for setting community priorities. Decays over time, cannot be accumulated without contribution, cannot purchase goods, rights, or protection from enforcement.',
    docLink: 'ANNEX_Z.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
  },
  {
    id: 'sr',
    label: 'Service Record',
    definition: 'Verified history of community stewardship. Used for rotating civic roles, not as a score of human worth. Protected from external misuse as a credit proxy or employability signal.',
    docLink: 'ANNEX_Z.md',
    accent: THEME.sr.accent,
    accentBg: THEME.sr.accentBg,
  },
  {
    id: 'ss',
    label: 'Shared Storehouse',
    definition: 'Emergency rationing activated only during verified scarcity. Temporary, oracle-gated, with mandatory unwind. Not a normal distribution system — a last-resort coordination mechanism.',
    docLink: 'ANNEX_AC.md',
    accent: THEME.ss.accent,
    accentBg: THEME.ss.accentBg,
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
            <line x1={x} y1={12} x2={x} y2={178} stroke={THEME.divider} strokeWidth={1} strokeDasharray="5,4" />
            <text x={x} y={10} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.06em">FIREWALL</text>
          </g>
        ))}

        {/* FLOW */}
        <g style={nodeStyle('flow', THEME.flow.accent)} onClick={() => handleNodeClick('flow')}>
          <rect x={10} y={22} width={156} height={108} rx={8} fill={THEME.flow.fill} stroke={THEME.flow.accent} strokeWidth={activeNodeId === 'flow' ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
          <text x={88} y={62} textAnchor="middle" fontSize={15} fontWeight={700} fill={THEME.flow.accent} fontFamily="monospace">FLOW</text>
          <text x={88} y={86} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">market money</text>
          <text x={88} y={105} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">wages · contracts</text>
        </g>

        {/* ESSENTIAL ACCESS */}
        <g style={nodeStyle('ea', THEME.ea.accent)} onClick={() => handleNodeClick('ea')}>
          <rect x={206} y={22} width={156} height={108} rx={8} fill={THEME.ea.fill} stroke={THEME.ea.accent} strokeWidth={activeNodeId === 'ea' ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
          <text x={284} y={57} textAnchor="middle" fontSize={14} fontWeight={700} fill={THEME.ea.accent} fontFamily="monospace">ESSENTIAL</text>
          <text x={284} y={75} textAnchor="middle" fontSize={14} fontWeight={700} fill={THEME.ea.accent} fontFamily="monospace">ACCESS</text>
          <text x={284} y={101} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">survival floor</text>
        </g>

        {/* VOICE */}
        <g style={nodeStyle('voice', THEME.voice.accent)} onClick={() => handleNodeClick('voice')}>
          <rect x={382} y={22} width={156} height={108} rx={8} fill={THEME.voice.fill} stroke={THEME.voice.accent} strokeWidth={activeNodeId === 'voice' ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
          <text x={460} y={65} textAnchor="middle" fontSize={15} fontWeight={700} fill={THEME.voice.accent} fontFamily="monospace">VOICE</text>
          <text x={460} y={88} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">civic priority</text>
          <text x={460} y={107} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">bounded influence</text>
        </g>

        {/* SERVICE RECORD */}
        <g style={nodeStyle('sr', THEME.sr.accent)} onClick={() => handleNodeClick('sr')}>
          <rect x={558} y={22} width={156} height={108} rx={8} fill={THEME.sr.fill} stroke={THEME.sr.accent} strokeWidth={activeNodeId === 'sr' ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
          <text x={636} y={57} textAnchor="middle" fontSize={14} fontWeight={700} fill={THEME.sr.accent} fontFamily="monospace">SERVICE</text>
          <text x={636} y={75} textAnchor="middle" fontSize={14} fontWeight={700} fill={THEME.sr.accent} fontFamily="monospace">RECORD</text>
          <text x={636} y={97} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">verified</text>
          <text x={636} y={114} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">stewardship</text>
        </g>

        {/* SHARED STOREHOUSE */}
        <g style={nodeStyle('ss', THEME.ss.accent)} onClick={() => handleNodeClick('ss')}>
          <rect x={734} y={22} width={176} height={108} rx={8} fill={THEME.ss.fill} stroke={THEME.ss.accent} strokeWidth={activeNodeId === 'ss' ? THEME.strokeWidth.active : THEME.strokeWidth.normal} strokeDasharray="6,4" />
          <text x={822} y={57} textAnchor="middle" fontSize={14} fontWeight={700} fill={THEME.ss.accent} fontFamily="monospace">SHARED</text>
          <text x={822} y={75} textAnchor="middle" fontSize={14} fontWeight={700} fill={THEME.ss.accent} fontFamily="monospace">STOREHOUSE</text>
          <text x={822} y={101} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">emergency only</text>
        </g>

        {/* Baseline */}
        <line x1={10} y1={170} x2={910} y2={170} stroke={THEME.divider} strokeWidth={1} />
        <text x={460} y={188} textAnchor="middle" fontSize={10} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.05em">
          CONSTITUTIONAL SURVIVAL MINIMUM — floor beneath all five instruments
        </text>
      </svg>
    </DiagramShell>
  )
}
