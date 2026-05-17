// app/src/components/diagrams/V005_DemurrageDecay.tsx
// Progressive net-worth demurrage from Annex AZ.
// Annual rates are canonical; bi-weekly collection uses annual rate / 26.
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 'floor',
    label: 'Participation Buffer Floor',
    definition: 'S = $50,000 at founding. Net worth at or below S has no demurrage. S is a participation buffer, not the survival floor; basic life access remains unconditional through Essential Access and commons systems.',
    docLink: 'ANNEX_AZ.md',
    accent: THEME.ea.accent,
    accentBg: THEME.ea.accentBg,
  },
  {
    id: 'rate',
    label: 'Progressive Rate Function',
    definition: 'Demurrage applies to excess net worth E = max(0, NW - S), using four marginal annual brackets: 26%, 30%, 38%, and 46%. The effective rate λ(E) is D(E) / E.',
    docLink: 'ANNEX_AZ.md',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
  },
  {
    id: 'commons',
    label: 'Commons Revenue',
    definition: 'Demurrage receipts route to the commons pool with the Annex AZ / Annex X revenue-routing floor, including at least 60% to the Essential Access commons pool.',
    docLink: 'ANNEX_AZ.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
  },
]

const BRACKETS = [
  { id: 't1', label: 'T1', range: '$50k-$1M', rate: '26%', biweekly: '1.00% / 2wk', x: 170, width: 104, accent: THEME.ea.accent, fill: THEME.ea.fill },
  { id: 't2', label: 'T2', range: '$1M-$5M', rate: '30%', biweekly: '1.15% / 2wk', x: 286, width: 112, accent: THEME.flow.accent, fill: THEME.flow.fill },
  { id: 't3', label: 'T3', range: '$5M-$22M', rate: '38%', biweekly: '1.46% / 2wk', x: 410, width: 124, accent: THEME.voice.accent, fill: THEME.voice.fill },
  { id: 't4', label: 'T4', range: '$22M+', rate: '46%', biweekly: '1.77% / 2wk', x: 546, width: 136, accent: THEME.ss.accent, fill: THEME.ss.fill },
]

const EXAMPLES = [
  { netWorth: '$1M', effective: '26.0%', annual: '$247k' },
  { netWorth: '$5M', effective: '29.2%', annual: '$1.447M' },
  { netWorth: '$22M', effective: '36.0%', annual: '$7.907M' },
  { netWorth: '$50M', effective: '41.6%', annual: '$20.787M' },
]

export function V005_DemurrageDecay({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const activeAccent = NODES.find((node) => node.id === activeNodeId)?.accent

  return (
    <DiagramShell figId="V-005" title="Progressive Net-Worth Demurrage — Annex AZ" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 300" className="w-full" style={{ height: 300 }}>
        <defs>
          <marker id="v5arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={THEME.dim} />
          </marker>
        </defs>

        {/* Formula rail */}
        <g
          style={{ cursor: 'pointer', filter: activeNodeId === 'rate' ? `drop-shadow(0 0 6px ${THEME.flow.accent})` : undefined }}
          onClick={() => handleNodeClick('rate')}
        >
          <rect x={36} y={18} width={648} height={42} rx={8}
            fill={activeNodeId === 'rate' ? THEME.flow.accentBg : '#0d1117'}
            stroke={activeNodeId === 'rate' ? THEME.flow.accent : THEME.border}
            strokeWidth={activeNodeId === 'rate' ? 2 : 1}
          />
          <text x={58} y={36} fontSize={13} fontWeight={700} fill={THEME.flow.accent} fontFamily="monospace">
            E = max(0, NW - S)
          </text>
          <text x={58} y={53} fontSize={11} fill={THEME.subtext} fontFamily="monospace">
            D(E) = 0.26*T1 + 0.30*T2 + 0.38*T3 + 0.46*T4   |   λ(E) = D(E) / E
          </text>
        </g>

        {/* Protected floor */}
        <g
          style={{ cursor: 'pointer', filter: activeNodeId === 'floor' ? `drop-shadow(0 0 6px ${THEME.ea.accent})` : undefined }}
          onClick={() => handleNodeClick('floor')}
        >
          <rect x={36} y={88} width={110} height={112} rx={8}
            fill={activeNodeId === 'floor' ? THEME.ea.accentBg : '#101820'}
            stroke={THEME.ea.accent}
            strokeWidth={activeNodeId === 'floor' ? 2.5 : 1.5}
            strokeDasharray="6,4"
          />
          <text x={91} y={118} textAnchor="middle" fontSize={15} fontWeight={700} fill={THEME.ea.accent} fontFamily="monospace">S</text>
          <text x={91} y={140} textAnchor="middle" fontSize={16} fontWeight={700} fill="#dde1e7" fontFamily="monospace">$50k</text>
          <text x={91} y={162} textAnchor="middle" fontSize={10} fill={THEME.subtext} fontFamily="monospace">0% demurrage</text>
          <text x={91} y={180} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace">participation buffer</text>
        </g>

        <line x1={154} y1={144} x2={164} y2={144} stroke={THEME.dim} strokeWidth={1.5} markerEnd="url(#v5arrow)" />

        {/* Progressive brackets */}
        {BRACKETS.map((bracket, index) => {
          const x = bracket.x
          const y = 118 - index * 8
          const h = 82 + index * 8
          const isActive = activeNodeId === 'rate'
          return (
            <g key={bracket.id} style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('rate')}>
              <rect x={x} y={y} width={bracket.width} height={h} rx={8}
                fill={isActive ? bracket.fill : '#111923'}
                stroke={bracket.accent}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text x={x + 18} y={y + 24} fontSize={12} fontWeight={700} fill={bracket.accent} fontFamily="monospace">{bracket.label}</text>
              <text x={x + 18} y={y + 43} fontSize={14} fontWeight={700} fill="#dde1e7" fontFamily="monospace">{bracket.rate}</text>
              <text x={x + 18} y={y + 61} fontSize={10} fill={THEME.subtext} fontFamily="monospace">{bracket.range}</text>
              <text x={x + 18} y={y + 77} fontSize={9} fill={THEME.dim} fontFamily="monospace">{bracket.biweekly}</text>
            </g>
          )
        })}

        {/* Commons route */}
        <g
          style={{ cursor: 'pointer', filter: activeNodeId === 'commons' ? `drop-shadow(0 0 6px ${THEME.voice.accent})` : undefined }}
          onClick={() => handleNodeClick('commons')}
        >
          <line x1={360} y1={216} x2={360} y2={238} stroke={THEME.voice.accent} strokeWidth={1.5} markerEnd="url(#v5arrow)" />
          <rect x={194} y={244} width={332} height={34} rx={8}
            fill={activeNodeId === 'commons' ? THEME.voice.accentBg : '#111923'}
            stroke={THEME.voice.accent}
            strokeWidth={activeNodeId === 'commons' ? 2 : 1}
          />
          <text x={360} y={266} textAnchor="middle" fontSize={11} fill={THEME.voice.accent} fontFamily="monospace">
            receipts route to commons · EA commons minimum 60%
          </text>
        </g>

        {/* Example schedule */}
        <g>
          <text x={560} y={226} fontSize={10} fill={THEME.dim} fontFamily="monospace">examples from AZ3</text>
          {EXAMPLES.map((example, index) => (
            <g key={example.netWorth}>
              <text x={560} y={244 + index * 13} fontSize={9.5} fill="#dde1e7" fontFamily="monospace">{example.netWorth}</text>
              <text x={613} y={244 + index * 13} fontSize={9.5} fill={THEME.flow.accent} fontFamily="monospace">{example.effective}</text>
              <text x={660} y={244 + index * 13} fontSize={9.5} fill={THEME.subtext} fontFamily="monospace">{example.annual}</text>
            </g>
          ))}
        </g>

        {activeAccent && (
          <rect x={28} y={10} width={664} height={278} rx={10}
            fill="none" stroke={activeAccent} strokeWidth={1.5} opacity={0.35}
            pointerEvents="none"
          />
        )}
      </svg>
    </DiagramShell>
  )
}
