// app/src/components/diagrams/V001_FiveToolSeparation.tsx
import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'flow',  label: 'Flow',              definition: 'Ordinary market money. Used for wages, contracts, savings, and commerce. Governed by issuance, payment, and accounting rules. Cannot be converted to survival access, civic weight, or stewardship standing.', docLink: 'ANNEX_AB.md#AB2',     accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
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

const colW = 108, gap = 40, startX = 10, colH = 124, cy = 28
const MOBILE_CARD_SPACING_PX = 86
const MOBILE_SWIPE_LIMIT_PX = 116

export function V001_FiveToolSeparation({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const [mobileIndex, setMobileIndex] = useState(0)
  const [swipeDeltaX, setSwipeDeltaX] = useState(0)
  const dragRef = useRef({ startX: 0, startY: 0, active: false, moved: false })

  const goToMobileInstrument = (direction: -1 | 1) => {
    setMobileIndex((current) => (current + direction + COLS.length) % COLS.length)
  }

  const mobileCardOffset = (index: number) => {
    const raw = index - mobileIndex
    if (raw > COLS.length / 2) return raw - COLS.length
    if (raw < -COLS.length / 2) return raw + COLS.length
    return raw
  }

  return (
    <DiagramShell figId="V-001" title="Five-Instrument Constitutional Architecture" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <div className="sm:hidden">
        <div
          className="relative h-60 overflow-hidden touch-pan-y"
          onPointerDown={(event) => {
            dragRef.current = { startX: event.clientX, startY: event.clientY, active: true, moved: false }
            setSwipeDeltaX(0)
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (!dragRef.current.active) return
            const dx = event.clientX - dragRef.current.startX
            const dy = event.clientY - dragRef.current.startY
            if (Math.abs(dy) > Math.abs(dx) * 1.2) {
              setSwipeDeltaX(0)
              return
            }
            if (Math.abs(dx) > 6) dragRef.current.moved = true
            const resistance = 1 - Math.min(Math.abs(dx), 260) / 900
            const resistedDx = dx * resistance
            setSwipeDeltaX(Math.max(-MOBILE_SWIPE_LIMIT_PX, Math.min(MOBILE_SWIPE_LIMIT_PX, resistedDx)))
          }}
          onPointerUp={(event) => {
            if (!dragRef.current.active) return
            const dx = event.clientX - dragRef.current.startX
            const dy = event.clientY - dragRef.current.startY
            const moved = dragRef.current.moved
            dragRef.current = { startX: 0, startY: 0, active: false, moved }
            setSwipeDeltaX(0)
            if (Math.abs(dx) < 54 || Math.abs(dx) < Math.abs(dy) * 1.2) return
            goToMobileInstrument(dx < 0 ? 1 : -1)
          }}
          onPointerCancel={() => {
            dragRef.current = { startX: 0, startY: 0, active: false, moved: false }
            setSwipeDeltaX(0)
          }}
        >
          <button
            type="button"
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117]/90 font-mono text-lg text-[#c9d1d9]"
            aria-label="Previous instrument"
            onClick={() => goToMobileInstrument(-1)}
          >
            ‹
          </button>
          {COLS.map((col, i) => {
            const offset = mobileCardOffset(i)
            const isCurrent = offset === 0
            const isVisible = Math.abs(offset) <= 2
            const node = NODES[i]
            return (
              <button
                key={col.id}
                type="button"
                className={`absolute left-1/2 top-4 rounded-xl border-2 px-4 py-5 text-center will-change-transform ${swipeDeltaX === 0 ? 'transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]' : ''}`}
                style={{
                  width: '12.5rem',
                  minHeight: '10.75rem',
                  transform: `translate3d(calc(-50% + ${offset * MOBILE_CARD_SPACING_PX}px + ${swipeDeltaX}px), 0, 0) scale(${isCurrent ? 1 : 0.88})`,
                  zIndex: 10 - Math.abs(offset),
                  opacity: isVisible ? (isCurrent ? 1 : 0.74) : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  borderColor: col.stroke,
                  background: `linear-gradient(145deg, ${col.fill}, rgba(13,17,23,0.96))`,
                  boxShadow: isCurrent ? `0 18px 42px rgba(0,0,0,0.38), 0 0 22px ${col.stroke}33` : '0 12px 28px rgba(0,0,0,0.32)',
                }}
                aria-label={`${node.label}. ${node.definition}`}
                aria-pressed={activeNodeId === col.id}
                onClick={() => {
                  if (dragRef.current.moved) {
                    dragRef.current.moved = false
                    return
                  }
                  if (isCurrent) handleNodeClick(col.id)
                  else setMobileIndex(i)
                }}
              >
                <div className="font-mono text-[0.92rem] font-bold uppercase tracking-[0.08em]" style={{ color: col.stroke }}>
                  {col.l1}
                </div>
                <div className="mt-1 font-mono text-[0.92rem] font-bold uppercase tracking-[0.08em]" style={{ color: col.stroke }}>
                  {col.l2}
                </div>
                <div className="mt-5 font-mono text-[0.78rem] leading-relaxed text-[#c9d1d9]">
                  {col.l3}<br />{col.l3b}
                </div>
              </button>
            )
          })}
          <button
            type="button"
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117]/90 font-mono text-lg text-[#c9d1d9]"
            aria-label="Next instrument"
            onClick={() => goToMobileInstrument(1)}
          >
            ›
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-2" aria-label="Instrument carousel position">
          {COLS.map((col, i) => (
            <button
              key={col.id}
              type="button"
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: i === mobileIndex ? col.stroke : '#30363d' }}
              aria-label={`Show ${NODES[i].label}`}
              aria-current={i === mobileIndex}
              onClick={() => setMobileIndex(i)}
            />
          ))}
        </div>
        <div className="mt-4 text-center font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#8b949e]">
          Tap the instrument to expand its definition
        </div>
      </div>

      <svg viewBox="0 0 720 204" className="hidden w-full sm:block" style={{ height: 204 }}>

        {/* Firewall barriers — repulsion arrows + ⊗ no-crossing indicator */}
        {[0, 1, 2, 3].map(i => {
          const fw = startX + (i + 1) * (colW + gap) - gap / 2
          const midY = cy + colH / 2
          const arrowY1 = cy + colH * 0.28
          const arrowY2 = cy + colH * 0.72
          const dur = `${2.8 + i * 0.35}s`
          const del = `${i * 0.45}s`
          return (
            <g key={i}>
              {/* Divider line */}
              <line x1={fw} y1={cy - 4} x2={fw} y2={cy + colH + 4} stroke="#3d4450" strokeWidth={1} strokeDasharray="3,3" />

              {/* ⊗ static no-crossing indicator — red, large, no background circle */}
              <text x={fw} y={midY + 8} textAnchor="middle" fontSize={22} fill="#f85149" fontFamily="monospace" fontWeight={700}>⊗</text>

              {/* Left arrow — slides right toward wall, fades out (top) */}
              <text textAnchor="end" fontSize={18} fill={COLS[i].stroke} fontFamily="monospace" fontWeight={900} y={arrowY1 + 7}>
                <animate attributeName="x" values={`${fw - 18};${fw - 5};${fw - 18}`} dur={dur} begin={del} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                <animate attributeName="opacity" values="0.85;0.0;0.85" dur={dur} begin={del} repeatCount="indefinite" />
                ›
              </text>

              {/* Right arrow — slides left toward wall, fades out (top) */}
              <text textAnchor="start" fontSize={18} fill={COLS[i + 1].stroke} fontFamily="monospace" fontWeight={900} y={arrowY1 + 7}>
                <animate attributeName="x" values={`${fw + 18};${fw + 5};${fw + 18}`} dur={dur} begin={del} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                <animate attributeName="opacity" values="0.85;0.0;0.85" dur={dur} begin={del} repeatCount="indefinite" />
                ‹
              </text>

              {/* Left arrow bottom — offset phase */}
              <text textAnchor="end" fontSize={18} fill={COLS[i].stroke} fontFamily="monospace" fontWeight={900} y={arrowY2 + 7}>
                <animate attributeName="x" values={`${fw - 18};${fw - 5};${fw - 18}`} dur={dur} begin={`${i * 0.45 + 1.4}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                <animate attributeName="opacity" values="0.85;0.0;0.85" dur={dur} begin={`${i * 0.45 + 1.4}s`} repeatCount="indefinite" />
                ›
              </text>

              {/* Right arrow bottom — offset phase */}
              <text textAnchor="start" fontSize={18} fill={COLS[i + 1].stroke} fontFamily="monospace" fontWeight={900} y={arrowY2 + 7}>
                <animate attributeName="x" values={`${fw + 18};${fw + 5};${fw + 18}`} dur={dur} begin={`${i * 0.45 + 1.4}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                <animate attributeName="opacity" values="0.85;0.0;0.85" dur={dur} begin={`${i * 0.45 + 1.4}s`} repeatCount="indefinite" />
                ‹
              </text>
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
              <text x={x + colW / 2} y={cy + 30} textAnchor="middle" fontSize={12} fontWeight={700} fill={col.stroke} fontFamily="monospace">{col.l1}</text>
              <text x={x + colW / 2} y={cy + 48} textAnchor="middle" fontSize={12} fontWeight={700} fill={col.stroke} fontFamily="monospace">{col.l2}</text>
              <text x={x + colW / 2} y={cy + 70} textAnchor="middle" fontSize={9.5} fill={THEME.subtext} fontFamily="monospace">{col.l3}</text>
              <text x={x + colW / 2} y={cy + 84} textAnchor="middle" fontSize={9.5} fill={THEME.subtext} fontFamily="monospace">{col.l3b}</text>
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
          CONSTITUTIONAL SURVIVAL MINIMUM — floor beneath every protected lane
        </motion.text>
      </svg>
    </DiagramShell>
  )
}
