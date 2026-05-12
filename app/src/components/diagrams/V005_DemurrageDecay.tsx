// app/src/components/diagrams/V005_DemurrageDecay.tsx
// Accurate demurrage decay curve: B(t) = B₀ · e^{−λt}, λ = 0.02/yr (2%/yr constitutional rate)
// Shows 50-year horizon — at t=50, idle balance above floor retains 36.8% (loses 63.2% to commons)
// Animated: curve draws in, then a dot traverses it, then commons-funded area fills
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'curve',     label: 'Demurrage Decay Curve',   definition: 'Idle Flow balances above the personal exemption floor decay at λ = 2%/yr: B(t) = B₀ · e^{−0.02t}. Proceeds fund the public commons rail continuously. Modelled over a 50-year horizon.', docLink: 'ANNEX_AR.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'exemption', label: 'Personal Exemption Floor', definition: 'Balances below the exemption floor are fully exempt from demurrage. Covers ordinary household liquidity needs. Reviewed annually by the oracle council — never set below subsistence threshold.', docLink: 'ANNEX_AR.md', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'commons',   label: 'Commons-Funded Area',     definition: 'The area between B₀ and the decay curve represents cumulative demurrage proceeds flowing to the commons rail. At 50 years: ₣632 per ₣1000 above-floor idle balance has funded public infrastructure.', docLink: 'ANNEX_X.md',  accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
]

// Chart geometry
const OX = 58, OY = 170, W = 590, H = 120
const YEARS = 50, LAMBDA = 0.02

function decayY(x: number): number {
  const t = (x / W) * YEARS
  return H * Math.exp(-LAMBDA * t)
}

function curvePath(): string {
  const pts: string[] = []
  for (let x = 0; x <= W; x += 3) {
    pts.push(`${OX + x},${OY - decayY(x)}`)
  }
  return 'M' + pts.join(' L')
}

function commonsFillPath(): string {
  // Area between B₀ line (top) and decay curve
  const top = OY - H
  let d = `M${OX},${top}`
  for (let x = 0; x <= W; x += 3) {
    d += ` L${OX + x},${OY - decayY(x)}`
  }
  d += ` L${OX + W},${top} Z`
  return d
}

function remainingFillPath(): string {
  // Area between decay curve and floor (OY)
  let d = `M${OX},${OY - decayY(0)}`
  for (let x = 0; x <= W; x += 3) {
    d += ` L${OX + x},${OY - decayY(x)}`
  }
  d += ` L${OX + W},${OY} L${OX},${OY} Z`
  return d
}

// Year-marker x positions
const YEAR_MARKS = [10, 20, 30, 40, 50]

export function V005_DemurrageDecay({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const pathStr = curvePath()

  return (
    <DiagramShell figId="V-005" title="Demurrage Decay Curve — B(t) = B₀ · e^{−λt}" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 210" className="w-full" style={{ height: 210 }}>
        <defs>
          <path id="v5curve" d={pathStr} />
          <clipPath id="v5clip">
            <rect x={OX} y={0} width={W} height={OY + 10} />
          </clipPath>
        </defs>

        {/* Axes */}
        <line x1={OX} y1={OY - H - 14} x2={OX} y2={OY + 4} stroke={THEME.border} strokeWidth={1.5} opacity={0}>
          <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin="0.05s" fill="freeze" />
        </line>
        <line x1={OX - 4} y1={OY} x2={OX + W + 12} y2={OY} stroke={THEME.border} strokeWidth={1.5} opacity={0}>
          <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin="0.1s" fill="freeze" />
        </line>

        {/* Axis labels */}
        <text x={OX - 6} y={OY - H} textAnchor="end" fontSize={8.5} fill={THEME.dim} fontFamily="monospace">B₀</text>
        <text x={OX - 6} y={OY - decayY(W)} textAnchor="end" fontSize={8.5} fill={THEME.dim} fontFamily="monospace">0.37B₀</text>
        <text x={OX + W + 16} y={OY + 4} fontSize={8.5} fill={THEME.dim} fontFamily="monospace">yrs →</text>

        {/* Year markers */}
        {YEAR_MARKS.map(yr => {
          const x = OX + (yr / YEARS) * W
          const yDecay = decayY((yr / YEARS) * W)
          return (
            <g key={yr} opacity={0}>
              <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin="0.6s" fill="freeze" />
              <line x1={x} y1={OY} x2={x} y2={OY + 5} stroke={THEME.border} strokeWidth={1} />
              <text x={x} y={OY + 14} textAnchor="middle" fontSize={8} fill={THEME.dim} fontFamily="monospace">{yr}</text>
              {/* Decay value dot */}
              <circle cx={x} cy={OY - yDecay} r={2.5} fill={THEME.flow.accent} opacity={0.5} />
            </g>
          )
        })}

        {/* Commons-funded area (above curve = proceeds to commons) */}
        <path
          d={commonsFillPath()} clipPath="url(#v5clip)"
          fill={THEME.voice.accentBg}
          style={{ cursor: 'pointer' }}
          onClick={() => handleNodeClick('commons')}
          opacity={0}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.5s" begin="1.8s" fill="freeze" />
        </path>

        {/* Remaining-balance area (below curve = still held) */}
        <path
          d={remainingFillPath()} clipPath="url(#v5clip)"
          fill={THEME.flow.accentBg}
          style={{ cursor: 'pointer' }}
          onClick={() => handleNodeClick('curve')}
          opacity={0}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.5s" begin="2.1s" fill="freeze" />
        </path>

        {/* B₀ horizontal reference line */}
        <line x1={OX} y1={OY - H} x2={OX + W} y2={OY - H}
          stroke={THEME.flow.accent} strokeWidth={1} strokeDasharray="5,4" opacity={0.4} />

        {/* Exemption floor line */}
        <line x1={OX} y1={OY - 16} x2={OX + W} y2={OY - 16}
          stroke={THEME.ea.accent} strokeWidth={1.5} strokeDasharray="6,4"
          style={{ cursor: 'pointer' }}
          onClick={() => handleNodeClick('exemption')}
          opacity={0}
        >
          <animate attributeName="opacity" from={0} to={0.8} dur="0.4s" begin="0.5s" fill="freeze" />
        </line>
        <text x={OX + W - 4} y={OY - 20} textAnchor="end" fontSize={8.5} fill={THEME.ea.accent} fontFamily="monospace"
          style={{ cursor: 'pointer' }}
          onClick={() => handleNodeClick('exemption')}
        >
          exemption floor (below = no demurrage)
        </text>

        {/* Decay curve — draws in */}
        <path
          d={pathStr} fill="none"
          stroke={activeNodeId === 'curve' ? THEME.flow.accent : THEME.flow.accent}
          strokeWidth={activeNodeId === 'curve' ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
          clipPath="url(#v5clip)"
          style={{ cursor: 'pointer', filter: activeNodeId === 'curve' ? `drop-shadow(0 0 5px ${THEME.flow.accent})` : undefined }}
          onClick={() => handleNodeClick('curve')}
          strokeDasharray="1200"
          strokeDashoffset="1200"
        >
          <animate attributeName="stroke-dashoffset" from="1200" to="0" dur="2s" begin="0.3s" fill="freeze" />
        </path>

        {/* Animated dot traversing the curve */}
        <circle r={5} fill={THEME.flow.accent} opacity={0.9}>
          <animateMotion dur="5s" repeatCount="indefinite" begin="2.4s">
            <mpath href="#v5curve" />
          </animateMotion>
        </circle>

        {/* Formula + legend */}
        <text x={OX + 12} y={OY - H - 6} fontSize={9} fill={THEME.flow.accent} fontFamily="monospace" fontStyle="italic">
          B(t) = B₀ · e^(−0.02t)   λ = 2%/yr constitutional rate
        </text>

        {/* Area labels */}
        <text x={OX + W * 0.35} y={OY - H + 22} textAnchor="middle" fontSize={8.5} fill={THEME.voice.accent} fontFamily="monospace" opacity={0}
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('commons')}>
          <animate attributeName="opacity" from={0} to={0.8} dur="0.4s" begin="2.2s" fill="freeze" />
          commons funded (cumulative)
        </text>
        <text x={OX + W * 0.65} y={OY - 40} textAnchor="middle" fontSize={8.5} fill={THEME.flow.accent} fontFamily="monospace" opacity={0}
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('curve')}>
          <animate attributeName="opacity" from={0} to={0.8} dur="0.4s" begin="2.5s" fill="freeze" />
          idle balance remaining
        </text>

        <text x={OX + W / 2} y={OY + 28} textAnchor="middle" fontSize={8.5} fill={THEME.dim} fontFamily="monospace">
          50-year horizon · balances below exemption floor are unaffected
        </text>
      </svg>
    </DiagramShell>
  )
}
