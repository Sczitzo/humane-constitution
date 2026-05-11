// app/src/components/diagrams/V004_AmendmentPyramid.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  {
    id: 't1',
    label: 'Tier 1 — Constitutional Core',
    definition: 'Highest protection. Requires 7-of-9 keyholder signatures plus a 180-day public timelock. Covers invariants, instrument separation, survival floor, and the amendment process itself.',
    docLink: 'INVARIANTS.md',
    accent: '#f85149',
    accentBg: 'rgba(248,81,73,0.07)',
  },
  {
    id: 't2',
    label: 'Tier 2 — Structural Rules',
    definition: 'Requires supermajority vote plus adversarial panel review. Covers annexes, thresholds, oracle rules, and governance procedures that implement Tier 1 principles.',
    docLink: 'ANNEX_AH.md',
    accent: '#d29922',
    accentBg: 'rgba(210,153,34,0.07)',
  },
  {
    id: 't3',
    label: 'Tier 3 — Standard Amendment',
    definition: 'Formal Acceptance Protocol (FAP). Standard governance vote with public notice and challenge window. Covers operational parameters, pilot rules, and non-structural patches.',
    docLink: 'ANNEX_AG.md',
    accent: '#58a6ff',
    accentBg: 'rgba(88,166,255,0.07)',
  },
]

export function V004_AmendmentPyramid({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const tiers = [
    { id: 't1', label: 'TIER 1', sub: 'Constitutional Core', y: 20,  w: 220, fill: '#1a0d0d', stroke: '#f85149' },
    { id: 't2', label: 'TIER 2', sub: 'Structural Rules',    y: 88,  w: 360, fill: '#1f1a0d', stroke: '#d29922' },
    { id: 't3', label: 'TIER 3', sub: 'Standard Amendment',  y: 156, w: 500, fill: '#0d1a2e', stroke: '#58a6ff' },
  ]
  const cx = 300

  return (
    <DiagramShell
      figId="V-004"
      title="Amendment Tier Pyramid"
      nodes={NODES}
      activeNodeId={activeNodeId}
      onInternalLink={onInternalLink}
    >
      <svg viewBox="0 0 600 230" className="w-full" style={{ height: 230 }}>
        {tiers.map(t => (
          <g
            key={t.id}
            style={{ cursor: 'pointer', filter: activeNodeId === t.id ? `drop-shadow(0 0 6px ${t.stroke})` : undefined }}
            onClick={() => handleNodeClick(t.id)}
          >
            <rect
              x={cx - t.w / 2} y={t.y} width={t.w} height={58}
              rx={6} fill={t.fill}
              stroke={t.stroke} strokeWidth={activeNodeId === t.id ? 2.5 : 2}
            />
            <text x={cx} y={t.y + 26} textAnchor="middle" fontSize={13} fontWeight={700} fill={t.stroke} fontFamily="monospace">{t.label}</text>
            <text x={cx} y={t.y + 45} textAnchor="middle" fontSize={11} fill="#b6c2cf" fontFamily="monospace">{t.sub}</text>
          </g>
        ))}
        <text x={560} y={49}  textAnchor="start" fontSize={9} fill="#8b949e" fontFamily="monospace">highest</text>
        <text x={560} y={185} textAnchor="start" fontSize={9} fill="#8b949e" fontFamily="monospace">standard</text>
        <line x1={555} y1={55} x2={555} y2={178} stroke="#30363d" strokeWidth={1}/>
      </svg>
    </DiagramShell>
  )
}
