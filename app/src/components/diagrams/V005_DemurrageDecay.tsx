// app/src/components/diagrams/V005_DemurrageDecay.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  {
    id: 'curve',
    label: 'Demurrage Decay Curve',
    definition: 'Flow balances decay at a constitutionally fixed annual rate. Decay is calculated on idle balances above the personal exemption floor. Proceeds fund the public commons rail — not extracted as profit.',
    docLink: 'ANNEX_AR.md',
    accent: '#58a6ff',
    accentBg: 'rgba(88,166,255,0.07)',
  },
  {
    id: 'exemption',
    label: 'Personal Exemption Floor',
    definition: 'Balances below the exemption floor are exempt from demurrage. Set to cover ordinary household liquidity needs. Reviewed annually by the oracle council.',
    docLink: 'ANNEX_AR.md',
    accent: '#3fb950',
    accentBg: 'rgba(63,185,80,0.07)',
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
        <line x1={ox} y1={oy - h - 10} x2={ox} y2={oy} stroke="#30363d" strokeWidth={1.5} />
        <line x1={ox} y1={oy} x2={ox + w + 10} y2={oy} stroke="#30363d" strokeWidth={1.5} />
        <text x={ox - 8} y={oy - h} textAnchor="end" fontSize={9} fill="#8b949e" fontFamily="monospace">balance</text>
        <text x={ox + w + 14} y={oy + 4} fontSize={9} fill="#8b949e" fontFamily="monospace">time →</text>

        <line x1={ox} y1={oy - 18} x2={ox + w} y2={oy - 18} stroke="#3fb950" strokeWidth={1} strokeDasharray="6,4"
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('exemption')} />
        <text x={ox + w - 4} y={oy - 22} textAnchor="end" fontSize={9} fill="#3fb950" fontFamily="monospace"
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('exemption')}>exemption floor</text>

        <path
          d={decayPath(ox, oy, w, h)}
          fill="none" stroke="#58a6ff" strokeWidth={activeNodeId === 'curve' ? 2.5 : 2}
          style={{ cursor: 'pointer', filter: activeNodeId === 'curve' ? 'drop-shadow(0 0 4px #58a6ff)' : undefined }}
          onClick={() => handleNodeClick('curve')}
        />
        <path
          d={decayPath(ox, oy, w, h) + ` L${ox + w},${oy} L${ox},${oy} Z`}
          fill="rgba(88,166,255,0.06)"
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('curve')}
        />

        <text x={ox + w / 2} y={oy + 18} textAnchor="middle" fontSize={9} fill="#8b949e" fontFamily="monospace">idle holding period</text>
        <text x={ox + 8} y={oy - h + 4} fontSize={9} fill="#58a6ff" fontFamily="monospace">idle balance →</text>
        <text x={ox + 8} y={oy - h + 16} fontSize={9} fill="#58a6ff" fontFamily="monospace">demurrage applied</text>
      </svg>
    </DiagramShell>
  )
}
