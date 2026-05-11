// app/src/components/diagrams/V004_AmendmentPyramid.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 't1',
    label: 'Tier 1 — Constitutional Core',
    definition: 'Highest protection. Requires 7-of-9 keyholder signatures plus a 180-day public timelock. Covers invariants, instrument separation, survival floor, and the amendment process itself.',
    docLink: 'INVARIANTS.md',
    accent: THEME.ss.accent,
    accentBg: THEME.ss.accentBg,
  },
  {
    id: 't2',
    label: 'Tier 2 — Structural Rules',
    definition: 'Requires supermajority vote plus adversarial panel review. Covers annexes, thresholds, oracle rules, and governance procedures that implement Tier 1 principles.',
    docLink: 'ANNEX_AH.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
  },
  {
    id: 't3',
    label: 'Tier 3 — Standard Amendment',
    definition: 'Formal Acceptance Protocol (FAP). Standard governance vote with public notice and challenge window. Covers operational parameters, pilot rules, and non-structural patches.',
    docLink: 'ANNEX_AG.md',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
  },
]

export function V004_AmendmentPyramid({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const tiers = [
    { id: 't1', label: 'TIER 1', sub: 'Constitutional Core', y: 20,  w: 220, fill: THEME.ss.fill,    stroke: THEME.ss.accent },
    { id: 't2', label: 'TIER 2', sub: 'Structural Rules',    y: 88,  w: 360, fill: THEME.voice.fill,  stroke: THEME.voice.accent },
    { id: 't3', label: 'TIER 3', sub: 'Standard Amendment',  y: 156, w: 500, fill: '#0d1a2e',          stroke: THEME.flow.accent },
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
        {tiers.map((t, i) => (
          <g
            key={t.id}
            opacity={0}
            style={{ cursor: 'pointer', filter: activeNodeId === t.id ? `drop-shadow(0 0 6px ${t.stroke})` : undefined }}
            onClick={() => handleNodeClick(t.id)}
          >
            <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.06 + (2 - i) * 0.12}s`} fill="freeze" />
            {activeNodeId === t.id && (
              <rect
                x={cx - t.w / 2 - 2} y={t.y - 2} width={t.w + 4} height={62}
                rx={7} fill="none" stroke={t.stroke} strokeWidth={1.5} opacity={0.5}
              >
                <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
              </rect>
            )}
            <rect
              x={cx - t.w / 2} y={t.y} width={t.w} height={58}
              rx={6} fill={t.fill}
              stroke={t.stroke} strokeWidth={activeNodeId === t.id ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
            />
            <text x={cx} y={t.y + 26} textAnchor="middle" fontSize={13} fontWeight={700} fill={t.stroke} fontFamily="monospace">{t.label}</text>
            <text x={cx} y={t.y + 45} textAnchor="middle" fontSize={11} fill={THEME.subtext} fontFamily="monospace">{t.sub}</text>
          </g>
        ))}
        <text x={560} y={49}  textAnchor="start" fontSize={9} fill={THEME.dim} fontFamily="monospace">highest</text>
        <text x={560} y={185} textAnchor="start" fontSize={9} fill={THEME.dim} fontFamily="monospace">standard</text>
        <line x1={555} y1={55} x2={555} y2={178} stroke={THEME.border} strokeWidth={1}/>
      </svg>
    </DiagramShell>
  )
}
