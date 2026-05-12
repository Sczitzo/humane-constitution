// app/src/components/diagrams/V007_OraclePolycentric.tsx
// Radar / spider chart: 5 oracle nodes at pentagon vertices, 3 overlaid reading states
// Concentric grid rings + outer pentagon perimeter connects the nodes
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'hub',       label: 'Oracle Hub',        definition: 'Aggregates readings from all independent nodes. Requires quorum before publishing. Output includes confidence bands. No single node controls the result.', docLink: 'ANNEX_AL.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'tier1',     label: 'Flow Oracle',        definition: 'Governs the movement of resources through the system. Ensures transparent allocation, tracks contributions, and maintains economic balance across all participants.', docLink: 'ANNEX_AL.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'tier2',     label: 'Access Oracle',      definition: 'Validates baseline participation rights for all members. Enforces minimum thresholds and protects against exclusion from core governance mechanisms.', docLink: 'ANNEX_AL.md', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'tier3',     label: 'Voice Oracle',       definition: 'Manages democratic input and decision-making power. Calculates weighted influence based on participation history, decay rates, and stakeholder engagement.', docLink: 'ANNEX_AL.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'adversary', label: 'Service Oracle',     definition: 'Tracks long-term contributions and stewardship. Slower decay than Voice ensures that sustained service builds durable reputation and governance weight over time.', docLink: 'ANNEX_AL.md', accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'community', label: 'Storehouse Oracle',  definition: 'Oversees communal resources and emergency reserves. Manages the collective pool for crisis response, public goods funding, and redistribution mechanisms.', docLink: 'ANNEX_AL.md', accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

const SPOKE_NODES = [
  { id: 'tier1',     angle: -90,  label: 'Flow',       accent: THEME.flow.accent  },
  { id: 'tier2',     angle: -18,  label: 'Access',     accent: THEME.ea.accent    },
  { id: 'tier3',     angle:  54,  label: 'Voice',      accent: THEME.voice.accent },
  { id: 'adversary', angle: 126,  label: 'Service',    accent: THEME.sr.accent    },
  { id: 'community', angle: 198,  label: 'Storehouse', accent: THEME.ss.accent    },
]

// Three oracle reading states with varying values per node
const READING_STATES = [
  { label: 'normal operation', color: THEME.flow.accent,  vals: [0.72, 0.88, 0.58, 0.50, 0.30] },
  { label: 'scarcity signal',  color: THEME.ss.accent,    vals: [0.50, 0.82, 0.62, 0.70, 0.84] },
  { label: 'civic surge',      color: THEME.ea.accent,    vals: [0.65, 0.90, 0.85, 0.72, 0.20] },
]

const CX = 200, CY = 190, RADIUS = 132, HUB_R = 18, NODE_R = 15
const GRID_RINGS = [0.25, 0.5, 0.75, 1.0]

function polyPoints(vals: number[]): string {
  return SPOKE_NODES.map((s, i) => {
    const rad = s.angle * Math.PI / 180
    const r = vals[i] * RADIUS
    return `${(CX + r * Math.cos(rad)).toFixed(2)},${(CY + r * Math.sin(rad)).toFixed(2)}`
  }).join(' ')
}

function ringPoints(scale: number): string {
  return SPOKE_NODES.map(s => {
    const rad = s.angle * Math.PI / 180
    return `${(CX + scale * RADIUS * Math.cos(rad)).toFixed(2)},${(CY + scale * RADIUS * Math.sin(rad)).toFixed(2)}`
  }).join(' ')
}

export function V007_OraclePolycentric({ onInternalLink }: DiagramProps) {
  const [activeState, setActiveState] = useState(0)
  const { activeNodeId, handleNodeClick } = useDiagramState()

  useEffect(() => {
    const t = setInterval(() => setActiveState(i => (i + 1) % READING_STATES.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <DiagramShell figId="V-007" title="Oracle Polycentric Architecture" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 400 390" className="w-full" style={{ height: 390 }}>

        {/* Concentric grid rings */}
        {GRID_RINGS.map(s => (
          <polygon key={s} points={ringPoints(s)}
            fill="none" stroke={THEME.divider} strokeWidth={s === 1 ? 1 : 0.7} opacity={0.8} />
        ))}

        {/* Spoke lines center→perimeter */}
        {SPOKE_NODES.map(s => {
          const rad = s.angle * Math.PI / 180
          return (
            <line key={s.id}
              x1={CX} y1={CY}
              x2={CX + RADIUS * Math.cos(rad)}
              y2={CY + RADIUS * Math.sin(rad)}
              stroke={THEME.divider} strokeWidth={0.7} />
          )
        })}


        {/* Active reading polygon — morphs points in sync with the dots */}
        <motion.polygon
          animate={{
            points: polyPoints(READING_STATES[activeState].vals),
            fill: READING_STATES[activeState].color,
            stroke: READING_STATES[activeState].color,
          }}
          fillOpacity={0.18}
          strokeWidth={2}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />

        {/* Hub at center */}
        <motion.circle cx={CX} cy={CY} r={HUB_R}
          fill="#0d1117" stroke={THEME.flow.accent} strokeWidth={2}
          animate={{ strokeOpacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ cursor: 'pointer', filter: activeNodeId === 'hub' ? `drop-shadow(0 0 8px ${THEME.flow.accent})` : undefined }}
          onClick={() => handleNodeClick('hub')}
        />
        <text x={CX} y={CY + 4} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.85)" fontFamily="monospace" style={{ pointerEvents: 'none' }}>HUB</text>

        {/* Oracle nodes at pentagon vertices */}
        {SPOKE_NODES.map((s, i) => {
          const rad = s.angle * Math.PI / 180
          const nx = CX + RADIUS * Math.cos(rad)
          const ny = CY + RADIUS * Math.sin(rad)
          const LABEL_GAP = 28
          const lx = CX + (RADIUS + LABEL_GAP) * Math.cos(rad)
          const ly = CY + (RADIUS + LABEL_GAP) * Math.sin(rad)
          const ta = Math.cos(rad) < -0.25 ? 'end' : Math.cos(rad) > 0.25 ? 'start' : 'middle'
          const isActive = activeNodeId === s.id
          const currentVal = READING_STATES[activeState].vals[i]
          const dvx = CX + currentVal * RADIUS * Math.cos(rad)
          const dvy = CY + currentVal * RADIUS * Math.sin(rad)

          return (
            <g key={s.id}>
              {/* Value dot on spoke, animated to current reading */}
              <motion.circle r={4.5} fill={s.accent} opacity={0.9}
                animate={{ cx: dvx, cy: dvy }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />

              {/* Outer node circle */}
              <circle cx={nx} cy={ny} r={NODE_R}
                fill={s.accent} fillOpacity={isActive ? 0.45 : 0.18}
                stroke={s.accent} strokeWidth={isActive ? 2.5 : 1.5}
                style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 7px ${s.accent})` : undefined }}
                onClick={() => handleNodeClick(s.id)}
              />

              {/* Label */}
              <text x={lx} y={ly + 4}
                textAnchor={ta} fontSize={9.5} fontWeight={600}
                fill={s.accent} fontFamily="monospace" opacity={0.9}
                style={{ pointerEvents: 'none' }}>
                {s.label}
              </text>
            </g>
          )
        })}

        {/* State label at bottom */}
        <AnimatePresence mode="wait">
          <motion.text key={activeState}
            x={CX} y={375} textAnchor="middle"
            fontSize={8.5} fill={READING_STATES[activeState].color} fontFamily="monospace" opacity={0.8}
            initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            ◈ {READING_STATES[activeState].label}
          </motion.text>
        </AnimatePresence>
      </svg>
    </DiagramShell>
  )
}
