// app/src/components/diagrams/V001_FiveToolSeparation.tsx
import { motion } from 'motion/react'
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'flow',  label: 'Flow',              definition: 'Ordinary market money. Used for wages, contracts, savings, and commerce. Subject to demurrage. Cannot be converted to survival access, civic weight, or stewardship standing.', docLink: 'ANNEX_AB.md#AB2',     accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'ea',    label: 'Essential Access',   definition: 'The unconditional survival floor. Food, shelter, healthcare, water, communications. Non-delegable, non-transferable, non-convertible. Exists beneath the market, not inside it.', docLink: 'INVARIANTS.md#INV-001', accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
  { id: 'voice', label: 'Voice',             definition: 'Bounded civic influence for setting community priorities. Decays over time, cannot be accumulated without contribution, cannot purchase goods, rights, or protection from enforcement.', docLink: 'ANNEX_Z.md',           accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'sr',    label: 'Service Record',    definition: 'Verified history of community stewardship. Used for rotating civic roles, not as a score of human worth. Protected from external misuse as a credit proxy or employability signal.', docLink: 'ANNEX_Z.md',           accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'ss',    label: 'Shared Storehouse', definition: 'Emergency rationing activated only during verified scarcity. Temporary, oracle-gated, with mandatory unwind. Not a normal distribution system — a last-resort coordination mechanism.', docLink: 'ANNEX_AC.md',          accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
]

const COLS = [
  { id: 'flow',  l1: 'FLOW',      l2: 'market money',   l3: 'wages · contracts', l3b: '· savings',      stroke: THEME.flow.accent,  fill: THEME.flow.fill,  dashed: false },
  { id: 'ea',    l1: 'ESSENTIAL', l2: 'ACCESS',         l3: 'unconditional',     l3b: 'floor',           stroke: THEME.ea.accent,    fill: THEME.ea.fill,    dashed: false },
  { id: 'voice', l1: 'VOICE',     l2: 'civic priority', l3: 'bounded ·',         l3b: 'non-purchasable', stroke: THEME.voice.accent, fill: THEME.voice.fill, dashed: false },
  { id: 'sr',    l1: 'SERVICE',   l2: 'RECORD',         l3: 'verified',          l3b: 'stewardship',     stroke: THEME.sr.accent,    fill: THEME.sr.fill,    dashed: false },
  { id: 'ss',    l1: 'SHARED',    l2: 'STOREHOUSE',     l3: 'scarcity only ·',   l3b: 'oracle-gated',    stroke: THEME.ss.accent,    fill: THEME.ss.fill,    dashed: true  },
]

const colW = 118, gap = 16, startX = 10, colH = 124, cy = 28

export function V001_FiveToolSeparation({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  return (
    <DiagramShell figId="V-001" title="Five-Instrument Constitutional Architecture" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 204" className="w-full" style={{ height: 204 }}>

        {/* Firewall barriers — animated sparks slide between columns */}
        {[0, 1, 2, 3].map(i => {
          const fw = startX + (i + 1) * (colW + gap) - gap / 2
          const dur1 = `${2.4 + i * 0.5}s`
          const dur2 = `${1.9 + i * 0.4}s`
          const leftCol  = COLS[i].stroke
          const rightCol = COLS[i + 1].stroke
          return (
            <g key={i}>
              {/* Divider line — slightly brighter */}
              <line x1={fw} y1={cy - 10} x2={fw} y2={cy + colH + 10} stroke="#3d4450" strokeWidth={1} strokeDasharray="4,3" />
              <text x={fw} y={cy - 14} textAnchor="middle" fontSize={7} fill={THEME.dim} fontFamily="monospace">▐</text>

              {/* Spark 1 — top-to-bottom, left column color */}
              <circle cx={fw} cy={cy + 12} r={2.5} fill={leftCol} filter={`url(#spark-glow-${i})`}>
                <animate attributeName="cy" values={`${cy + 12};${cy + colH - 12};${cy + 12}`} dur={dur1} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                <animate attributeName="opacity" values="0;1;0.9;0.2;0" dur={dur1} repeatCount="indefinite" />
              </circle>

              {/* Spark 2 — bottom-to-top, right column color, offset phase */}
              <circle cx={fw} cy={cy + colH - 12} r={2} fill={rightCol} filter={`url(#spark-glow-${i})`}>
                <animate attributeName="cy" values={`${cy + colH - 12};${cy + 12};${cy + colH - 12}`} dur={dur2} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" begin={`${0.7 + i * 0.3}s`} />
                <animate attributeName="opacity" values="0;0.8;0.7;0.1;0" dur={dur2} repeatCount="indefinite" begin={`${0.7 + i * 0.3}s`} />
              </circle>

              {/* Glow filter per divider */}
              <defs>
                <filter id={`spark-glow-${i}`} x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
            </g>
          )
        })}

        {/* Columns */}
        {COLS.map((col, i) => {
          const x = startX + i * (colW + gap)
          const isActive = activeNodeId === col.id
          return (
            <motion.g
              key={col.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.06 + i * 0.1, duration: 0.35 }}
              whileHover={{ rotate: [0, -1.5, 1.5, -1, 1, 0], y: -3, transition: { rotate: { duration: 0.45, ease: 'easeInOut' }, y: { duration: 0.2, ease: 'easeOut' } } }}
              whileTap={{ scale: 0.97 }}
              style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 7px ${col.stroke})` : undefined, originX: `${startX + i * (colW + gap) + colW / 2}px`, originY: `${cy + colH}px` }}
              onClick={() => handleNodeClick(col.id)}
            >
              {isActive && (
                <motion.rect
                  x={x - 1} y={cy - 1} width={colW + 2} height={colH + 2} rx={7}
                  fill="none" stroke={col.stroke} strokeWidth={1.5}
                  animate={{ opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <rect
                x={x} y={cy} width={colW} height={colH} rx={6}
                fill={col.fill} stroke={col.stroke}
                strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
                strokeDasharray={col.dashed ? '7,4' : undefined}
              />
              <text x={x + colW / 2} y={cy + 30} textAnchor="middle" fontSize={11} fontWeight={700} fill={col.stroke} fontFamily="monospace">{col.l1}</text>
              <text x={x + colW / 2} y={cy + 48} textAnchor="middle" fontSize={11} fontWeight={700} fill={col.stroke} fontFamily="monospace">{col.l2}</text>
              <text x={x + colW / 2} y={cy + 70} textAnchor="middle" fontSize={8.5} fill={THEME.subtext} fontFamily="monospace">{col.l3}</text>
              <text x={x + colW / 2} y={cy + 83} textAnchor="middle" fontSize={8.5} fill={THEME.subtext} fontFamily="monospace">{col.l3b}</text>
            </motion.g>
          )
        })}

        {/* Constitutional floor baseline */}
        <motion.line
          x1={startX} y1={cy + colH + 14} x2={startX + 5 * colW + 4 * gap} y2={cy + colH + 14}
          stroke={THEME.ea.accent} strokeWidth={1} strokeDasharray="4,3"
          initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 0.7 }}
        />
        <motion.text
          x={(startX * 2 + 5 * colW + 4 * gap) / 2} y={cy + colH + 30}
          textAnchor="middle" fontSize={8.5} fill={THEME.ea.accent} fontFamily="monospace" letterSpacing="0.04em"
          initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ delay: 0.85 }}
        >
          CONSTITUTIONAL SURVIVAL MINIMUM — floor beneath all five instruments
        </motion.text>
      </svg>
    </DiagramShell>
  )
}
