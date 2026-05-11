// app/src/components/diagrams/V006_VoiceSRDecay.tsx
import { useState } from 'react'
import { motion } from 'motion/react'
import { DiagramShell } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'
import { InfoCard, type InfoCardData } from './InfoCard'

const NODES: DiagramNode[] = [
  { id: 'voice', label: 'Voice Decay',         definition: 'Voice power decays rapidly to ensure governance remains responsive to current participation. This faster decay prevents dormant accounts from wielding disproportionate influence and keeps decision-making fresh.', docLink: 'ANNEX_Z.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'sr',    label: 'Service Record Decay', definition: 'Service contributions decay slowly, honoring sustained effort over time. This slower decay rewards long-term stewardship and prevents short-term actors from gaming the system through temporary bursts of activity.', docLink: 'ANNEX_Z.md', accent: THEME.sr.accent, accentBg: THEME.sr.accentBg },
]

const W = 400, H = 250, PAD = 40

function generateCurve(decayRate: number) {
  const points: { x: number; y: number }[] = []
  for (let i = 0; i <= 100; i++) {
    const t = i / 100
    const value = Math.exp(-decayRate * t * 5)
    points.push({ x: PAD + t * (W - PAD * 2), y: H - PAD - value * (H - PAD * 2) })
  }
  return points
}

function pathFromPoints(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

export function V006_VoiceSRDecay({ onInternalLink }: DiagramProps) {
  const [infoCard, setInfoCard] = useState<InfoCardData | null>(null)
  const voiceCurve = generateCurve(2.5)
  const serviceCurve = generateCurve(1.2)

  function handleClick(id: 'voice' | 'sr', e: React.MouseEvent) {
    const node = NODES.find(n => n.id === id)!
    if (infoCard?.title === node.label) { setInfoCard(null) }
    else { setInfoCard({ title: node.label, description: node.definition, accentColor: node.accent, position: { x: e.clientX, y: e.clientY } }) }
  }

  const activeId = infoCard ? NODES.find(n => n.label === infoCard.title)?.id ?? null : null

  return (
    <DiagramShell figId="V-006" title="Voice vs. Service Record Decay Comparison" nodes={NODES} activeNodeId={activeId} onInternalLink={onInternalLink}>
      <div className="flex flex-col items-center">
        <svg width={W} height={H} className="mx-auto">
          <defs>
            <filter id="glow-v6"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
            <line key={i} x1={PAD} y1={H - PAD - t * (H - PAD * 2)} x2={W - PAD} y2={H - PAD - t * (H - PAD * 2)} stroke="#30363d" strokeWidth="1" strokeDasharray="2,4" />
          ))}
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth="2" />
          <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#30363d" strokeWidth="2" />

          <motion.path d={pathFromPoints(voiceCurve)} fill="none" stroke={THEME.voice.accent}
            strokeWidth={activeId === 'voice' ? 4 : 3}
            style={{ cursor: 'pointer', filter: activeId === 'voice' ? `drop-shadow(0 0 6px ${THEME.voice.accent})` : undefined }}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }}
            onClick={e => handleClick('voice', e)}
          />
          <motion.circle cx={voiceCurve[100].x} cy={voiceCurve[100].y} r={5} fill={THEME.voice.accent}
            style={{ cursor: 'pointer' }}
            initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ duration: 1, delay: 2 }}
            onClick={e => handleClick('voice', e)}
          />

          <motion.path d={pathFromPoints(serviceCurve)} fill="none" stroke={THEME.sr.accent}
            strokeWidth={activeId === 'sr' ? 4 : 3}
            style={{ cursor: 'pointer', filter: activeId === 'sr' ? `drop-shadow(0 0 6px ${THEME.sr.accent})` : undefined }}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }}
            onClick={e => handleClick('sr', e)}
          />
          <motion.circle cx={serviceCurve[100].x} cy={serviceCurve[100].y} r={5} fill={THEME.sr.accent}
            style={{ cursor: 'pointer' }}
            initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ duration: 1, delay: 2 }}
            onClick={e => handleClick('sr', e)}
          />

          <text x={W / 2} y={H - 10} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.5)" fontFamily="monospace">Time →</text>
          <text x={15} y={H / 2} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.5)" fontFamily="monospace" transform={`rotate(-90, 15, ${H / 2})`}>Weight</text>
        </svg>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={e => handleClick('voice', e)}>
            <div className="w-6 h-0.5" style={{ backgroundColor: THEME.voice.accent }} />
            <span className="font-mono text-xs text-white/70">Voice (fast decay)</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={e => handleClick('sr', e)}>
            <div className="w-6 h-0.5" style={{ backgroundColor: THEME.sr.accent }} />
            <span className="font-mono text-xs text-white/70">Service Record (slow decay)</span>
          </div>
        </div>
      </div>

      <InfoCard card={infoCard} />
    </DiagramShell>
  )
}
