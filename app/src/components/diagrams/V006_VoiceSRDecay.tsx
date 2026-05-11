// app/src/components/diagrams/V006_VoiceSRDecay.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  {
    id: 'voice',
    label: 'Voice Decay',
    definition: 'Voice decays faster than Service Record. Without active civic contribution, Voice weight returns to the community pool within a full governance cycle. Prevents accumulation by passive holders.',
    docLink: 'ANNEX_Z.md',
    accent: '#d29922',
    accentBg: 'rgba(210,153,34,0.07)',
  },
  {
    id: 'sr',
    label: 'Service Record Decay',
    definition: 'Service Record decays more slowly — stewardship history persists longer than civic influence. Hardship pause rules can temporarily suspend decay without resetting the clock.',
    docLink: 'ANNEX_Z.md',
    accent: '#a371f7',
    accentBg: 'rgba(163,113,247,0.07)',
  },
]

function curvePath(ox: number, oy: number, w: number, h: number, k: number) {
  const pts: string[] = []
  for (let x = 0; x <= w; x += 4) {
    const y = h * Math.exp(-k * x)
    pts.push(`${ox + x},${oy - y}`)
  }
  return 'M' + pts.join(' L')
}

export function V006_VoiceSRDecay({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const ox = 60, oy = 160, w = 580, h = 120

  return (
    <DiagramShell
      figId="V-006"
      title="Voice vs. Service Record Decay Comparison"
      nodes={NODES}
      activeNodeId={activeNodeId}
      onInternalLink={onInternalLink}
    >
      <svg viewBox="0 0 700 200" className="w-full" style={{ height: 200 }}>
        <line x1={ox} y1={oy - h - 10} x2={ox} y2={oy} stroke="#30363d" strokeWidth={1.5} />
        <line x1={ox} y1={oy} x2={ox + w + 10} y2={oy} stroke="#30363d" strokeWidth={1.5} />
        <text x={ox + w + 14} y={oy + 4} fontSize={9} fill="#8b949e" fontFamily="monospace">time →</text>

        <path d={curvePath(ox, oy, w, h, 0.006)} fill="none" stroke="#d29922"
          strokeWidth={activeNodeId === 'voice' ? 2.5 : 2}
          style={{ cursor: 'pointer', filter: activeNodeId === 'voice' ? 'drop-shadow(0 0 4px #d29922)' : undefined }}
          onClick={() => handleNodeClick('voice')} />
        <text x={ox + 80} y={oy - h * Math.exp(-0.006 * 80) - 8} fontSize={9} fill="#d29922" fontFamily="monospace"
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('voice')}>Voice</text>

        <path d={curvePath(ox, oy, w, h, 0.003)} fill="none" stroke="#a371f7"
          strokeWidth={activeNodeId === 'sr' ? 2.5 : 2}
          style={{ cursor: 'pointer', filter: activeNodeId === 'sr' ? 'drop-shadow(0 0 4px #a371f7)' : undefined }}
          onClick={() => handleNodeClick('sr')} />
        <text x={ox + 200} y={oy - h * Math.exp(-0.003 * 200) - 8} fontSize={9} fill="#a371f7" fontFamily="monospace"
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('sr')}>Service Record</text>

        <text x={ox + w / 2} y={oy + 18} textAnchor="middle" fontSize={9} fill="#8b949e" fontFamily="monospace">holding period without contribution</text>
      </svg>
    </DiagramShell>
  )
}
