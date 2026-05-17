// app/src/components/diagrams/V003_ScarcityLadder.tsx
// Vertical thermometer escalation — NORMAL at base, EMERGENCY at apex
// A mercury-style fill animates up the severity tube on auto-cycle
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'normal',     label: 'Normal — Full Market',       definition: 'No scarcity signal. Flow economy operates normally. Essential Access delivered through standard channels. No rationing active.', docLink: 'ANNEX_AC.md', accent: THEME.ea.accent,        accentBg: THEME.ea.accentBg },
  { id: 'watch',      label: 'Watch — Oracle Alert',       definition: 'Oracle nodes detect capacity approaching threshold. Public dashboard updated. No rationing yet. Procurement protocols activated.', docLink: 'ANNEX_AC.md', accent: THEME.flow.accent,      accentBg: THEME.flow.accentBg },
  { id: 'pcrp',       label: 'PCRP — Capacity Response',   definition: 'Protocol-level Capacity Response Protocol activated. Priority allocation begins. Discretionary above-floor consumption signaled. Shared Storehouse on standby.', docLink: 'ANNEX_AC.md', accent: THEME.voice.accent,     accentBg: THEME.voice.accentBg },
  { id: 'storehouse', label: 'Shared Storehouse — Active', definition: 'Rationing active. Essential category distributed from Shared Storehouse. Flow purchases of the category suspended. Oracle-gated mandatory unwind conditions in effect.', docLink: 'ANNEX_AC.md', accent: THEME.ss.accent,        accentBg: THEME.ss.accentBg },
  { id: 'emergency',  label: 'Emergency — Override',       definition: 'Verified emergency conditions. All discretionary allocation suspended. Keyholder council convened within 24 hours. Automatic sunset required.', docLink: 'ANNEX_AQ.md', accent: THEME.emergency.accent, accentBg: THEME.emergency.accentBg },
]

const RUNGS = [
  { id: 'normal',     label: 'NORMAL',      sub: 'full market',     stroke: THEME.ea.accent,        fill: THEME.ea.fill,        mercury: '#1a3d1a' },
  { id: 'watch',      label: 'WATCH',       sub: 'oracle alert',    stroke: THEME.flow.accent,      fill: THEME.flow.fill,      mercury: '#0d2137' },
  { id: 'pcrp',       label: 'PCRP',        sub: 'cap. response',   stroke: THEME.voice.accent,     fill: THEME.voice.fill,     mercury: '#1f1a0d' },
  { id: 'storehouse', label: 'STOREHOUSE',  sub: 'rationing',       stroke: THEME.ss.accent,        fill: THEME.ss.fill,        mercury: '#1a0d0d' },
  { id: 'emergency',  label: 'EMERGENCY',   sub: 'override',        stroke: THEME.emergency.accent, fill: THEME.emergency.fill, mercury: '#200808' },
]

// Thermometer geometry
const TUBE_X = 30, TUBE_W = 22, RUNG_H = 46, RUNG_GAP = 6
const RUNG_X = 70, RUNG_W = 530

export function V003_ScarcityLadder({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const [level, setLevel] = useState(0) // 0=normal … 4=emergency (auto-cycles)
  const displayedRungs = [...RUNGS].reverse()

  useEffect(() => {
    const t = setInterval(() => setLevel(l => (l + 1) % 5), 2200)
    return () => clearInterval(t)
  }, [])

  const totalH = RUNGS.length * (RUNG_H + RUNG_GAP) - RUNG_GAP
  const tubeY = 18
  const mercuryH = ((level + 1) / 5) * totalH

  return (
    <DiagramShell figId="V-003" title="Scarcity Escalation Ladder" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 660 330" className="w-full" style={{ height: 330 }}>

        {/* Thermometer tube background */}
        <rect x={TUBE_X} y={tubeY} width={TUBE_W} height={totalH} rx={11} fill="#0d1117" stroke={THEME.border} strokeWidth={1.5} />

        {/* Mercury fill — animates as level changes */}
        <motion.rect
          x={TUBE_X + 3} y={tubeY + totalH - mercuryH + 3} width={TUBE_W - 6} height={Math.max(0, mercuryH - 6)} rx={8}
          fill={RUNGS[level].stroke}
          animate={{ y: tubeY + totalH - mercuryH + 3, height: Math.max(0, mercuryH - 6), fill: RUNGS[level].stroke }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 4px ${RUNGS[level].stroke})` }}
        />

        {/* Level tick marks on tube */}
        {RUNGS.map((_, i) => {
          const tickY = tubeY + totalH - (i + 1) * (RUNG_H + RUNG_GAP) + RUNG_GAP
          return <line key={i} x1={TUBE_X - 4} y1={tickY} x2={TUBE_X} y2={tickY} stroke={THEME.border} strokeWidth={1} />
        })}

        {/* Rungs (right side) — emergency at top, normal at base */}
        {displayedRungs.map((r, i) => {
          const rungIndex = RUNGS.findIndex((rung) => rung.id === r.id)
          const ry = tubeY + i * (RUNG_H + RUNG_GAP)
          const isActive = activeNodeId === r.id
          const isCurrent = level === rungIndex
          return (
            <g
              key={r.id}
              style={{ cursor: 'pointer', filter: isActive || isCurrent ? `drop-shadow(0 0 6px ${r.stroke})` : undefined }}
              onClick={() => handleNodeClick(r.id)}
              opacity={0}
            >
              <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin={`${0.05 + (RUNGS.length - 1 - i) * 0.08}s`} fill="freeze" />
              {isActive && (
                <rect x={RUNG_X - 2} y={ry - 2} width={RUNG_W + 4} height={RUNG_H + 4} rx={7}
                  fill="none" stroke={r.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={RUNG_X} y={ry} width={RUNG_W} height={RUNG_H} rx={6}
                fill={isCurrent && !isActive ? r.mercury : r.fill}
                stroke={r.stroke}
                strokeWidth={(isActive || isCurrent) ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
                strokeDasharray={r.id === 'emergency' ? '6,3' : undefined}
              />
              <text x={RUNG_X + RUNG_W / 2} y={ry + 19} textAnchor="middle" fontSize={11} fontWeight={700} fill={r.stroke} fontFamily="monospace">{r.label}</text>
              <text x={RUNG_X + RUNG_W / 2} y={ry + 35} textAnchor="middle" fontSize={9} fill={THEME.subtext} fontFamily="monospace">{r.sub}</text>

              {/* Connector from tube to rung */}
              <line x1={TUBE_X + TUBE_W} y1={ry + RUNG_H / 2} x2={RUNG_X} y2={ry + RUNG_H / 2}
                stroke={r.stroke} strokeWidth={1} opacity={isCurrent ? 0.8 : 0.25} />
            </g>
          )
        })}

        {/* Current level label */}
        <AnimatePresence mode="wait">
          <motion.text
            key={level}
            x={TUBE_X + TUBE_W / 2} y={tubeY + totalH + 22}
            textAnchor="middle" fontSize={8} fill={RUNGS[level].stroke}
            fontFamily="monospace" letterSpacing="0.06em"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            ▲ {RUNGS[level].label}
          </motion.text>
        </AnimatePresence>

        {/* Axis labels */}
        <text x={TUBE_X + TUBE_W / 2} y={tubeY - 6} textAnchor="middle" fontSize={8} fill={THEME.emergency.accent} fontFamily="monospace">max</text>
        <text x={TUBE_X + TUBE_W / 2} y={tubeY + totalH + 36} textAnchor="middle" fontSize={8} fill={THEME.ea.accent} fontFamily="monospace">base</text>
      </svg>
    </DiagramShell>
  )
}
