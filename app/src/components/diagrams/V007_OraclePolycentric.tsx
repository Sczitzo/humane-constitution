// app/src/components/diagrams/V007_OraclePolycentric.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  { id: 'hub',       label: 'Oracle Hub',              definition: 'Aggregates readings from independent nodes. Requires quorum. Publishes capacity figure with confidence bands. No single node controls the output.', docLink: 'ANNEX_AL.md', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
  { id: 'tier1',     label: 'Tier 1 — Institutional',  definition: 'Government statistical agencies, academic institutions. Fast but subject to methodology capture. Cannot constitute majority of oracle weight.', docLink: 'ANNEX_AL.md', accent: '#3fb950', accentBg: 'rgba(63,185,80,0.07)' },
  { id: 'tier2',     label: 'Tier 2 — Market Signal',  definition: 'Price feeds, logistics data, supply-chain indicators. Real-time but gameable. Pairwise correlation max 0.30 with other nodes required.', docLink: 'ANNEX_AL.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'tier3',     label: 'Tier 3 — Physical Sample', definition: 'Direct physical sampling oracle — harder to poison remotely. Required by INV-005. Inspector chain-of-custody controls required.', docLink: 'INVARIANTS.md#INV-005', accent: '#a371f7', accentBg: 'rgba(163,113,247,0.07)' },
  { id: 'adversary', label: 'Adversarial Reviewer',    definition: 'Independent reviewer appointed to challenge oracle methodology. Must have no financial relationship with any Tier 1–3 node operator or funder.', docLink: 'ANNEX_AL.md', accent: '#f85149', accentBg: 'rgba(248,81,73,0.07)' },
  { id: 'community', label: 'Community Challenge',     definition: 'Any person may file a capacity measurement challenge. Oracle must publish a written substantive response within 14 days.', docLink: 'ANNEX_AL.md', accent: '#8b949e', accentBg: 'rgba(139,148,158,0.07)' },
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
              <line x1={cx} y1={cy} x2={sx} y2={sy} stroke="#21262d" strokeWidth={1.5} />
              <circle cx={sx} cy={sy} r={spokeR} fill="#161b22" stroke={s.node.accent}
                strokeWidth={isActive ? 2.5 : 1.5}
                style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.node.accent})` : undefined }}
                onClick={() => handleNodeClick(s.id)} />
              <text x={sx} y={sy + 4} textAnchor="middle" fontSize={7.5} fill={s.node.accent} fontFamily="monospace"
                style={{ cursor: 'pointer', pointerEvents: 'none' }}>
                {s.node.label.split('—')[0].trim().split(' ').slice(0, 2).join(' ')}
              </text>
            </g>
          )
        })}
        <circle cx={cx} cy={cy} r={hubR} fill="#0d1a2e" stroke="#58a6ff" strokeWidth={activeNodeId === 'hub' ? 3 : 2}
          style={{ cursor: 'pointer', filter: activeNodeId === 'hub' ? 'drop-shadow(0 0 8px #58a6ff)' : undefined }}
          onClick={() => handleNodeClick('hub')} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={9} fontWeight={700} fill="#58a6ff" fontFamily="monospace"
          style={{ cursor: 'pointer', pointerEvents: 'none' }}>ORACLE</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize={8} fill="#8b949e" fontFamily="monospace"
          style={{ cursor: 'pointer', pointerEvents: 'none' }}>HUB</text>
      </svg>
    </DiagramShell>
  )
}
