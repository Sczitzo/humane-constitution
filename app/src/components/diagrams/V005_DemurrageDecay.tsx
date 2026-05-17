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
  { id: 't1', label: 'T1', range: '$50k-$1M', rate: '26%', biweekly: '1.00% / 2wk', x: 188, accent: THEME.ea.accent, fill: THEME.ea.fill },
  { id: 't2', label: 'T2', range: '$1M-$5M', rate: '30%', biweekly: '1.15% / 2wk', x: 310, accent: THEME.flow.accent, fill: THEME.flow.fill },
  { id: 't3', label: 'T3', range: '$5M-$22M', rate: '38%', biweekly: '1.46% / 2wk', x: 432, accent: THEME.voice.accent, fill: THEME.voice.fill },
  { id: 't4', label: 'T4', range: '$22M+', rate: '46%', biweekly: '1.77% / 2wk', x: 554, accent: THEME.ss.accent, fill: THEME.ss.fill },
]

const BRACKET_W = 112
const BRACKET_H = 126

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
      <svg viewBox="0 0 720 360" className="w-full" style={{ height: 360 }}>
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
          <rect x={36} y={18} width={648} height={64} rx={8}
            fill={activeNodeId === 'rate' ? THEME.flow.accentBg : '#0d1117'}
            stroke={activeNodeId === 'rate' ? THEME.flow.accent : THEME.border}
            strokeWidth={activeNodeId === 'rate' ? 2 : 1}
          />
          <text x={58} y={42} fontSize={17} fontWeight={700} fill={THEME.flow.accent} fontFamily="monospace">
            E = max(0, NW - S)
          </text>
          <text x={58} y={62} fontSize={13} fill={THEME.subtext} fontFamily="monospace">
            D(E) = 0.26*T1 + 0.30*T2 + 0.38*T3 + 0.46*T4
          </text>
          <text x={488} y={62} fontSize={13} fill={THEME.subtext} fontFamily="monospace">
            λ(E) = D(E) / E
          </text>
        </g>

        {/* Protected floor */}
        <g
          style={{ cursor: 'pointer', filter: activeNodeId === 'floor' ? `drop-shadow(0 0 6px ${THEME.ea.accent})` : undefined }}
          onClick={() => handleNodeClick('floor')}
        >
          <rect x={36} y={112} width={130} height={126} rx={8}
            fill={activeNodeId === 'floor' ? THEME.ea.accentBg : '#101820'}
            stroke={THEME.ea.accent}
            strokeWidth={activeNodeId === 'floor' ? 2.5 : 1.5}
            strokeDasharray="6,4"
          />
          <text x={101} y={146} textAnchor="middle" fontSize={18} fontWeight={700} fill={THEME.ea.accent} fontFamily="monospace">S</text>
          <text x={101} y={171} textAnchor="middle" fontSize={20} fontWeight={700} fill="#dde1e7" fontFamily="monospace">$50k</text>
          <text x={101} y={196} textAnchor="middle" fontSize={12} fill={THEME.subtext} fontFamily="monospace">0% demurrage</text>
          <text x={101} y={216} textAnchor="middle" fontSize={10.5} fill={THEME.dim} fontFamily="monospace">participation buffer</text>
        </g>

        <line x1={174} y1={175} x2={182} y2={175} stroke={THEME.dim} strokeWidth={1.5} markerEnd="url(#v5arrow)" />

        {/* Progressive brackets */}
        {BRACKETS.map((bracket) => {
          const x = bracket.x
          const y = 112
          const isActive = activeNodeId === 'rate'
          return (
            <g key={bracket.id} style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('rate')}>
              <rect x={x} y={y} width={BRACKET_W} height={BRACKET_H} rx={8}
                fill={isActive ? bracket.fill : '#111923'}
                stroke={bracket.accent}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text x={x + 18} y={y + 31} fontSize={15} fontWeight={700} fill={bracket.accent} fontFamily="monospace">{bracket.label}</text>
              <text x={x + 18} y={y + 57} fontSize={19} fontWeight={700} fill="#dde1e7" fontFamily="monospace">{bracket.rate}</text>
              <text x={x + 18} y={y + 82} fontSize={11.5} fill={THEME.subtext} fontFamily="monospace">{bracket.range}</text>
              <text x={x + 18} y={y + 104} fontSize={10.5} fill={THEME.dim} fontFamily="monospace">{bracket.biweekly}</text>
            </g>
          )
        })}

        {/* Commons route */}
        <g
          style={{ cursor: 'pointer', filter: activeNodeId === 'commons' ? `drop-shadow(0 0 6px ${THEME.voice.accent})` : undefined }}
          onClick={() => handleNodeClick('commons')}
        >
          <line x1={360} y1={248} x2={360} y2={266} stroke={THEME.voice.accent} strokeWidth={1.5} markerEnd="url(#v5arrow)" />
          <rect x={170} y={274} width={380} height={46} rx={8}
            fill={activeNodeId === 'commons' ? THEME.voice.accentBg : '#111923'}
            stroke={THEME.voice.accent}
            strokeWidth={activeNodeId === 'commons' ? 2 : 1}
          />
          <text x={360} y={294} textAnchor="middle" fontSize={12.5} fill={THEME.voice.accent} fontFamily="monospace">
            receipts route to commons
          </text>
          <text x={360} y={311} textAnchor="middle" fontSize={12} fill={THEME.voice.accent} fontFamily="monospace">
            EA commons minimum 60%
          </text>
        </g>

        {/* Example schedule */}
        <g>
          <text x={558} y={268} fontSize={11} fill={THEME.dim} fontFamily="monospace">AZ3 examples</text>
          {EXAMPLES.map((example, index) => (
            <g key={example.netWorth}>
              <text x={558} y={288 + index * 15} fontSize={10.5} fill="#dde1e7" fontFamily="monospace">{example.netWorth}</text>
              <text x={610} y={288 + index * 15} fontSize={10.5} fill={THEME.flow.accent} fontFamily="monospace">{example.effective}</text>
              <text x={654} y={288 + index * 15} fontSize={10.5} fill={THEME.subtext} fontFamily="monospace">{example.annual}</text>
            </g>
          ))}
        </g>

        {activeAccent && (
          <rect x={20} y={10} width={686} height={334} rx={10}
            fill="none" stroke={activeAccent} strokeWidth={1.5} opacity={0.35}
            pointerEvents="none"
          />
        )}
      </svg>
    </DiagramShell>
  )
}
