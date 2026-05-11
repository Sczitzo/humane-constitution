// app/src/components/diagrams/V006_VoiceSRDecay.tsx
import { useState } from 'react'
import { DiagramShell } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'
import { InfoCard, type InfoCardData } from './InfoCard'

const NODES: DiagramNode[] = [
  { id: 'voice', label: 'Voice Decay',         definition: 'Voice decays faster than Service Record. Without active civic contribution, Voice weight returns to the community pool within a full governance cycle. Prevents accumulation by passive holders.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'sr',    label: 'Service Record Decay', definition: 'Service Record decays more slowly — stewardship history persists longer than civic influence. Hardship pause rules can temporarily suspend decay without resetting the clock.', docLink: 'ANNEX_Z.md', accent: THEME.sr.accent, accentBg: THEME.sr.accentBg },
]

function generateCurve(ox: number, oy: number, w: number, h: number, decayRate: number): string {
  const pts: string[] = []
  for (let i = 0; i <= 100; i++) {
    const t = i / 100
    const value = Math.exp(-decayRate * t * 5)
    const x = ox + t * w
    const y = oy - value * h
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

export function V006_VoiceSRDecay({ onInternalLink }: DiagramProps) {
  const [infoCard, setInfoCard] = useState<InfoCardData | null>(null)
  const ox = 60, oy = 160, w = 580, h = 120

  function handleClick(id: 'voice' | 'sr', e: React.MouseEvent) {
    const node = NODES.find(n => n.id === id)!
    if (infoCard?.title === node.label) {
      setInfoCard(null)
    } else {
      setInfoCard({ title: node.label, description: node.definition, accentColor: node.accent, position: { x: e.clientX, y: e.clientY } })
    }
  }

  const activeId = infoCard ? NODES.find(n => n.label === infoCard.title)?.id ?? null : null

  return (
    <DiagramShell figId="V-006" title="Voice vs. Service Record Decay Comparison" nodes={NODES} activeNodeId={activeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 700 200" className="w-full" style={{ height: 200 }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line key={i}
            x1={ox} y1={oy - t * h} x2={ox + w} y2={oy - t * h}
            stroke={THEME.divider} strokeWidth={1} strokeDasharray="2,4"
          />
        ))}

        {/* Axes */}
        <line x1={ox} y1={oy - h - 10} x2={ox} y2={oy} stroke={THEME.border} strokeWidth={1.5} opacity={0}>
          <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin="0.05s" fill="freeze" />
        </line>
        <line x1={ox} y1={oy} x2={ox + w + 10} y2={oy} stroke={THEME.border} strokeWidth={1.5} opacity={0}>
          <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin="0.1s" fill="freeze" />
        </line>
        <text x={ox + w + 14} y={oy + 4} fontSize={9} fill={THEME.dim} fontFamily="monospace">time →</text>

        {/* Voice curve (faster decay) */}
        <path
          d={generateCurve(ox, oy, w, h, 2.5)}
          fill="none"
          stroke={THEME.voice.accent}
          strokeWidth={activeId === 'voice' ? 2.5 : 1.5}
          opacity={0}
          style={{
            cursor: 'pointer',
            filter: activeId === 'voice' ? `drop-shadow(0 0 6px ${THEME.voice.accent})` : undefined,
          }}
          onClick={e => handleClick('voice', e)}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.5s" begin="0.3s" fill="freeze" />
        </path>
        <text
          x={ox + 60} y={oy - h * Math.exp(-2.5 * 0.06 * 5) - 10}
          fontSize={9} fill={THEME.voice.accent} fontFamily="monospace"
          style={{ cursor: 'pointer' }} opacity={0}
          onClick={e => handleClick('voice', e)}
        >
          Voice (faster decay)
          <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin="1.0s" fill="freeze" />
        </text>

        {/* Service Record curve (slower decay) */}
        <path
          d={generateCurve(ox, oy, w, h, 1.2)}
          fill="none"
          stroke={THEME.sr.accent}
          strokeWidth={activeId === 'sr' ? 2.5 : 1.5}
          opacity={0}
          style={{
            cursor: 'pointer',
            filter: activeId === 'sr' ? `drop-shadow(0 0 6px ${THEME.sr.accent})` : undefined,
          }}
          onClick={e => handleClick('sr', e)}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.5s" begin="0.5s" fill="freeze" />
        </path>
        <text
          x={ox + 200} y={oy - h * Math.exp(-1.2 * 0.2 * 5) - 10}
          fontSize={9} fill={THEME.sr.accent} fontFamily="monospace"
          style={{ cursor: 'pointer' }} opacity={0}
          onClick={e => handleClick('sr', e)}
        >
          Service Record (slower decay)
          <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin="1.3s" fill="freeze" />
        </text>

        <text x={ox + w / 2} y={oy + 18} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace">
          holding period without contribution
        </text>
      </svg>

      <InfoCard card={infoCard} />
    </DiagramShell>
  )
}
