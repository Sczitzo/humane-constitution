// app/src/components/diagrams/V005_DemurrageDecay.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 'curve',
    label: 'Demurrage Decay Curve',
    definition: 'Flow balances decay at a constitutionally fixed annual rate. Decay is calculated on idle balances above the personal exemption floor. Proceeds fund the public commons rail — not extracted as profit.',
    docLink: 'ANNEX_AR.md',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
  },
  {
    id: 'exemption',
    label: 'Personal Exemption Floor',
    definition: 'Balances below the exemption floor are exempt from demurrage. Set to cover ordinary household liquidity needs. Reviewed annually by the oracle council.',
    docLink: 'ANNEX_AR.md',
    accent: THEME.ea.accent,
    accentBg: THEME.ea.accentBg,
  },
]

function decayPath(cx: number, cy: number, width: number, height: number, k = 0.004): string {
  const pts: string[] = []
  for (let x = 0; x <= width; x += 4) {
    const y = height * Math.exp(-k * x)
    pts.push(`${cx + x},${cy - y}`)
  }
  return 'M' + pts.join(' L')
}

export function V005_DemurrageDecay({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const ox = 60, oy = 160, w = 620, h = 120

  return (
    <DiagramShell
      figId="V-005"
      title="Demurrage Decay Curve"
      nodes={NODES}
      activeNodeId={activeNodeId}
      onInternalLink={onInternalLink}
    >
      <svg viewBox="0 0 720 200" className="w-full" style={{ height: 200 }}>
        <line x1={ox} y1={oy - h - 10} x2={ox} y2={oy} stroke={THEME.border} strokeWidth={1.5}
          strokeDasharray={h + 10} strokeDashoffset={h + 10}>
          <animate attributeName="strokeDashoffset" from={h + 10} to={0} dur="0.4s" begin="0.05s" fill="freeze" />
        </line>
        <line x1={ox} y1={oy} x2={ox + w + 10} y2={oy} stroke={THEME.border} strokeWidth={1.5}
          strokeDasharray={w + 10} strokeDashoffset={w + 10}>
          <animate attributeName="strokeDashoffset" from={w + 10} to={0} dur="0.5s" begin="0.05s" fill="freeze" />
        </line>
        <text x={ox - 8} y={oy - h} textAnchor="end" fontSize={9} fill={THEME.dim} fontFamily="monospace">balance</text>
        <text x={ox + w + 14} y={oy + 4} fontSize={9} fill={THEME.dim} fontFamily="monospace">time →</text>

        <line x1={ox} y1={oy - 18} x2={ox + w} y2={oy - 18} stroke={THEME.ea.accent}
          strokeWidth={1} strokeDasharray="6,4"
          opacity={0}
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('exemption')}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin="0.4s" fill="freeze" />
        </line>
        <text x={ox + w - 4} y={oy - 22} textAnchor="end" fontSize={9} fill={THEME.ea.accent} fontFamily="monospace"
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('exemption')}>exemption floor</text>

        <path
          d={decayPath(ox, oy, w, h)}
          fill="none" stroke={THEME.flow.accent}
          strokeWidth={activeNodeId === 'curve' ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
          pathLength={1000}
          strokeDasharray={1000}
          strokeDashoffset={1000}
          style={{ cursor: 'pointer', filter: activeNodeId === 'curve' ? `drop-shadow(0 0 4px ${THEME.flow.accent})` : undefined }}
          onClick={() => handleNodeClick('curve')}
        >
          <animate attributeName="strokeDashoffset" from={1000} to={0} dur="1.1s" begin="0.3s" fill="freeze" />
        </path>
        <path
          d={decayPath(ox, oy, w, h) + ` L${ox + w},${oy} L${ox},${oy} Z`}
          fill={THEME.flow.accentBg}
          opacity={0}
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('curve')}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin="1.2s" fill="freeze" />
        </path>

        <text x={ox + w / 2} y={oy + 18} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace">idle holding period</text>
        <text x={ox + 8} y={oy - h + 4} fontSize={9} fill={THEME.flow.accent} fontFamily="monospace">idle balance →</text>
        <text x={ox + 8} y={oy - h + 16} fontSize={9} fill={THEME.flow.accent} fontFamily="monospace">demurrage applied</text>
      </svg>
    </DiagramShell>
  )
}
