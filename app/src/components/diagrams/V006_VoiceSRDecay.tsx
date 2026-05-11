// app/src/components/diagrams/V006_VoiceSRDecay.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 'voice',
    label: 'Voice Decay',
    definition: 'Voice decays faster than Service Record. Without active civic contribution, Voice weight returns to the community pool within a full governance cycle. Prevents accumulation by passive holders.',
    docLink: 'ANNEX_Z.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
  },
  {
    id: 'sr',
    label: 'Service Record Decay',
    definition: 'Service Record decays more slowly — stewardship history persists longer than civic influence. Hardship pause rules can temporarily suspend decay without resetting the clock.',
    docLink: 'ANNEX_Z.md',
    accent: THEME.sr.accent,
    accentBg: THEME.sr.accentBg,
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
        <line x1={ox} y1={oy - h - 10} x2={ox} y2={oy} stroke={THEME.border} strokeWidth={1.5} opacity={0}>
          <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin="0.05s" fill="freeze" />
        </line>
        <line x1={ox} y1={oy} x2={ox + w + 10} y2={oy} stroke={THEME.border} strokeWidth={1.5} opacity={0}>
          <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin="0.1s" fill="freeze" />
        </line>
        <text x={ox + w + 14} y={oy + 4} fontSize={9} fill={THEME.dim} fontFamily="monospace">time →</text>

        <path d={curvePath(ox, oy, w, h, 0.006)} fill="none" stroke={THEME.voice.accent}
          strokeWidth={activeNodeId === 'voice' ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
          opacity={0}
          style={{ cursor: 'pointer', filter: activeNodeId === 'voice' ? `drop-shadow(0 0 4px ${THEME.voice.accent})` : undefined }}
          onClick={() => handleNodeClick('voice')}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.5s" begin="0.3s" fill="freeze" />
        </path>
        <text x={ox + 80} y={oy - h * Math.exp(-0.006 * 80) - 8} fontSize={9} fill={THEME.voice.accent} fontFamily="monospace"
          opacity={0}
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('voice')}>
          Voice
          <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin="1.0s" fill="freeze" />
        </text>

        <path d={curvePath(ox, oy, w, h, 0.003)} fill="none" stroke={THEME.sr.accent}
          strokeWidth={activeNodeId === 'sr' ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
          opacity={0}
          style={{ cursor: 'pointer', filter: activeNodeId === 'sr' ? `drop-shadow(0 0 4px ${THEME.sr.accent})` : undefined }}
          onClick={() => handleNodeClick('sr')}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.5s" begin="0.5s" fill="freeze" />
        </path>
        <text x={ox + 200} y={oy - h * Math.exp(-0.003 * 200) - 8} fontSize={9} fill={THEME.sr.accent} fontFamily="monospace"
          opacity={0}
          style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('sr')}>
          Service Record
          <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin="1.3s" fill="freeze" />
        </text>

        <text x={ox + w / 2} y={oy + 18} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace">holding period without contribution</text>
      </svg>
    </DiagramShell>
  )
}
