// app/src/components/diagrams/V007_OraclePolycentric.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'hub',       label: 'Oracle Hub',         definition: 'Aggregates readings from all independent nodes. Requires quorum before publishing. Output includes confidence bands. No single node controls the result.', docLink: 'ANNEX_AL.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'tier1',     label: 'Flow / Money',        definition: 'Governs the movement of resources through the system. Ensures transparent allocation, tracks contributions, and maintains economic balance across all participants in the constitutional network.', docLink: 'ANNEX_AL.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'tier2',     label: 'Essential Access',    definition: 'Guarantees baseline participation rights for all members. Validates identity, enforces minimum thresholds, and protects against exclusion from the core governance mechanisms.', docLink: 'ANNEX_AL.md', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'tier3',     label: 'Voice / Voting',      definition: 'Manages democratic input and decision-making power. Calculates weighted influence based on participation history, decay rates, and stakeholder engagement in governance proposals.', docLink: 'ANNEX_AL.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'adversary', label: 'Service Record',      definition: 'Tracks long-term contributions and stewardship. Slower decay than Voice ensures that sustained service to the protocol builds durable reputation and governance weight over time.', docLink: 'ANNEX_AL.md', accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'community', label: 'Shared Storehouse',   definition: 'Oversees communal resources and emergency reserves. Manages the collective pool for crisis response, public goods funding, and redistribution mechanisms across the network.', docLink: 'ANNEX_AL.md', accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

const SPOKE_NODES = [
  { id: 'tier1',     angle: 0,   label: 'Flow Oracle',       accent: THEME.flow.accent },
  { id: 'tier2',     angle: 72,  label: 'Access Oracle',     accent: THEME.ea.accent },
  { id: 'tier3',     angle: 144, label: 'Voice Oracle',      accent: THEME.voice.accent },
  { id: 'adversary', angle: 216, label: 'Service Oracle',    accent: THEME.sr.accent },
  { id: 'community', angle: 288, label: 'Storehouse Oracle', accent: THEME.ss.accent },
]

const CX = 150, CY = 150, RADIUS = 90, HUB_R = 22, NODE_R = 16

export function V007_OraclePolycentric({ onInternalLink }: DiagramProps) {
  const [pulseIndex, setPulseIndex] = useState(0)
  const { activeNodeId, handleNodeClick } = useDiagramState()

  useEffect(() => {
    const t = setInterval(() => setPulseIndex(p => (p + 1) % 5), 1500)
    return () => clearInterval(t)
  }, [])

  return (
    <DiagramShell figId="V-007" title="Oracle Polycentric Architecture" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <div className="flex flex-col items-center">
        <svg width="300" height="300" className="mx-auto">
          {/* Hub */}
          <motion.circle cx={CX} cy={CY} r={HUB_R} fill="#0d1117" stroke={THEME.flow.accent} strokeWidth="2"
            animate={{ strokeOpacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ cursor: 'pointer', filter: activeNodeId === 'hub' ? `drop-shadow(0 0 8px ${THEME.flow.accent})` : undefined }}
            onClick={() => handleNodeClick('hub')}
          />
          <text x={CX} y={CY + 4} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.8)" fontFamily="monospace" style={{ pointerEvents: 'none' }}>HUB</text>

          {SPOKE_NODES.map((s, i) => {
            const rad = (s.angle - 90) * (Math.PI / 180)
            const nx = CX + RADIUS * Math.cos(rad), ny = CY + RADIUS * Math.sin(rad)
            const hx = CX + HUB_R * Math.cos(rad), hy = CY + HUB_R * Math.sin(rad)
            const isPulsing = pulseIndex === i
            const isActive = activeNodeId === s.id

            return (
              <g key={s.id}>
                <motion.line x1={hx} y1={hy} x2={nx} y2={ny} stroke={s.accent} strokeWidth="2"
                  strokeOpacity={isPulsing ? 1 : 0.3}
                  animate={isPulsing ? { strokeOpacity: [0.3, 1, 0.3] } : {}}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                <AnimatePresence>
                  {isPulsing && (
                    <motion.circle cx={nx} cy={ny} r={NODE_R} fill="none" stroke={s.accent} strokeWidth="2"
                      initial={{ r: NODE_R, opacity: 1 }} animate={{ r: NODE_R + 12, opacity: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>
                <motion.circle cx={nx} cy={ny} r={NODE_R}
                  fill={s.accent} fillOpacity={isActive ? 0.4 : 0.2}
                  stroke={s.accent} strokeWidth={isActive ? 3 : 2}
                  animate={{ scale: isPulsing ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  style={{ transformOrigin: `${nx}px ${ny}px`, cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.accent})` : undefined }}
                  onClick={() => handleNodeClick(s.id)}
                />
                <text x={nx} y={ny - NODE_R - 8} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.7)" fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                  {s.label.split(' ')[0]}
                </text>
              </g>
            )
          })}
        </svg>
        <p className="font-mono text-xs text-white/50 text-center mt-2">
          No single point of control — 5 independent oracle nodes
        </p>
      </div>
    </DiagramShell>
  )
}
