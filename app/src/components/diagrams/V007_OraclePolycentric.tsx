// app/src/components/diagrams/V007_OraclePolycentric.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'hub',       label: 'Oracle Hub',              definition: 'Aggregates readings from independent nodes. Requires quorum. Publishes capacity figure with confidence bands. No single node controls the output.', docLink: 'ANNEX_AL.md', accent: THEME.flow.accent,    accentBg: THEME.flow.accentBg },
  { id: 'tier1',     label: 'Tier 1 — Institutional',  definition: 'Government statistical agencies, academic institutions. Fast but subject to methodology capture. Cannot constitute majority of oracle weight.', docLink: 'ANNEX_AL.md', accent: THEME.ea.accent,      accentBg: THEME.ea.accentBg },
  { id: 'tier2',     label: 'Tier 2 — Market Signal',  definition: 'Price feeds, logistics data, supply-chain indicators. Real-time but gameable. Pairwise correlation max 0.30 with other nodes required.', docLink: 'ANNEX_AL.md', accent: THEME.voice.accent,   accentBg: THEME.voice.accentBg },
  { id: 'tier3',     label: 'Tier 3 — Physical Sample', definition: 'Direct physical sampling oracle — harder to poison remotely. Required by INV-005. Inspector chain-of-custody controls required.', docLink: 'INVARIANTS.md#INV-005', accent: THEME.sr.accent, accentBg: THEME.sr.accentBg },
  { id: 'adversary', label: 'Adversarial Reviewer',    definition: 'Independent reviewer appointed to challenge oracle methodology. Must have no financial relationship with any Tier 1–3 node operator or funder.', docLink: 'ANNEX_AL.md', accent: THEME.ss.accent,      accentBg: THEME.ss.accentBg },
  { id: 'community', label: 'Community Challenge',     definition: 'Any person may file a capacity measurement challenge. Oracle must publish a written substantive response within 14 days.', docLink: 'ANNEX_AL.md', accent: THEME.neutral.accent,  accentBg: THEME.neutral.accentBg },
]

export function V007_OraclePolycentric({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const cx = 320, cy = 105, hubR = 30, spokeR = 22, spokeD = 90

  const spokes = [
    { id: 'tier1',     angle: -100, node: NODES[1] },
    { id: 'tier2',     angle: -36,  node: NODES[2] },
    { id: 'tier3',     angle: 28,   node: NODES[3] },
    { id: 'adversary', angle: 92,   node: NODES[4] },
    { id: 'community', angle: 156,  node: NODES[5] },
  ]

  return (
    <DiagramShell figId="V-007" title="Oracle Polycentric Architecture" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 640 210" className="w-full" style={{ height: 210 }}>
        {spokes.map(s => {
          const rad = (s.angle * Math.PI) / 180
          const sx = cx + spokeD * Math.cos(rad)
          const sy = cy + spokeD * Math.sin(rad)
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id}>
              <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={THEME.divider} strokeWidth={1.5} />
              <circle cx={sx} cy={sy} r={spokeR} fill={THEME.cardBg} stroke={s.node.accent}
                strokeWidth={isActive ? THEME.strokeWidth.active : 1.5}
                style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.node.accent})` : undefined }}
                onClick={() => handleNodeClick(s.id)} />
              <text x={sx} y={sy + 4} textAnchor="middle" fontSize={7.5} fill={s.node.accent} fontFamily="monospace"
                style={{ cursor: 'pointer', pointerEvents: 'none' }}>
                {s.node.label.split('—')[0].trim().split(' ').slice(0, 2).join(' ')}
              </text>
            </g>
          )
        })}
        <circle cx={cx} cy={cy} r={hubR} fill="#0d1a2e" stroke={THEME.flow.accent} strokeWidth={activeNodeId === 'hub' ? 3 : THEME.strokeWidth.normal}
          style={{ cursor: 'pointer', filter: activeNodeId === 'hub' ? `drop-shadow(0 0 8px ${THEME.flow.accent})` : undefined }}
          onClick={() => handleNodeClick('hub')} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={9} fontWeight={700} fill={THEME.flow.accent} fontFamily="monospace"
          style={{ cursor: 'pointer', pointerEvents: 'none' }}>ORACLE</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize={8} fill={THEME.dim} fontFamily="monospace"
          style={{ cursor: 'pointer', pointerEvents: 'none' }}>HUB</text>
      </svg>
    </DiagramShell>
  )
}
