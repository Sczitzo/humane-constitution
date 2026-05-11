// app/src/components/diagrams/V008_PilotTimeline.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DiagramShell } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'
import { InfoCard, type InfoCardData } from './InfoCard'

const PHASES: Array<DiagramNode & { phase: string; short: string }> = [
  { id: 'p0',  phase: 'P0',  short: 'Founding',      label: 'Phase 0 — Founding Cascade Gate',             definition: 'All founding legitimacy artifacts must reach PRODUCED status before any pilot phase begins. Blocks T-017 recurrence.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.ss.accent,        accentBg: THEME.ss.accentBg },
  { id: 'p1',  phase: 'P1',  short: 'Comprehension',  label: 'Phase 1 — Public Understanding',              definition: 'Skeptical general readers must understand Flow, Essential Access, Voice, Service Record, and Shared Storehouse without expert help.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.flow.accent,      accentBg: THEME.flow.accentBg },
  { id: 'p2',  phase: 'P2',  short: 'Identity',       label: 'Phase 2 — Identity & Recovery',               definition: 'People can recover access without surveillance, exclusion, or fraud collapse. False exclusion stays below published threshold.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.flow.accent,      accentBg: THEME.flow.accentBg },
  { id: 'p3',  phase: 'P3',  short: 'Capacity',       label: 'Phase 3 — Essential Capacity Measurement',    definition: 'Essentials measured accurately enough to support issuance and scarcity decisions. Measurement error within published bounds.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.flow.accent,      accentBg: THEME.flow.accentBg },
  { id: 'p4',  phase: 'P4',  short: 'Delivery',       label: 'Phase 4 — Essential Access Delivery',         definition: 'Baseline essentials delivered without discretionary gatekeeping. Delivery, appeals, and continuity meet minimum service targets.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.ea.accent,        accentBg: THEME.ea.accentBg },
  { id: 'p5',  phase: 'P5',  short: 'Flow/Demurrage', label: 'Phase 5 — Flow & Demurrage Simulation',       definition: 'Flow decay funds public rails without burdening ordinary users or creating sector-capture exemptions.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.voice.accent,     accentBg: THEME.voice.accentBg },
  { id: 'p6',  phase: 'P6',  short: 'Banking',        label: 'Phase 6 — Public Banking Rails',              definition: 'Basic banking provided as infrastructure without predatory fees or credit traps. Service cost and access targets sustainable.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.voice.accent,     accentBg: THEME.voice.accentBg },
  { id: 'p7',  phase: 'P7',  short: 'Anti-Rent',      label: 'Phase 7 — Anti-Rent & Ownership Review',      definition: 'Trusts, beneficial ownership, land control, and business control bounded without destroying stewardship. Elite workaround routes closed.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.sr.accent,        accentBg: THEME.sr.accentBg },
  { id: 'p8',  phase: 'P8',  short: 'Conglomerate',   label: 'Phase 8 — Essential-Sector Transition',       definition: 'Oil, energy, medicine, logistics, PBM-style intermediaries keep doing business without survival leverage. Largest-supplier refusal does not break CSM floor.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.ss.accent,        accentBg: THEME.ss.accentBg },
  { id: 'p9',  phase: 'P9',  short: 'Red Team',       label: 'Phase 9 — Governance Red-Team',               definition: 'Hostile actors cannot capture institutions, definitions, or emergency powers. Attack paths visible, challengeable, and patched before scale.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.emergency.accent, accentBg: THEME.emergency.accentBg },
  { id: 'p10', phase: 'P10', short: 'Drift/Founding',  label: 'Phase 10 — Implementation Drift & Founding Legitimacy', definition: 'Hard locks, deployment attestations, founding dossier, and claim-status gates work under hostile pressure. Drift and founding failures visible before activation.', docLink: 'Pilot_Evidence_Roadmap.md', accent: THEME.neutral.accent, accentBg: THEME.neutral.accentBg },
]

const W = 680, NODE_Y = 97, NODE_R = 10, RAIL_LEFT = 40, RAIL_RIGHT = W - 40

export function V008_PilotTimeline({ onInternalLink }: DiagramProps) {
  const [activePhase, setActivePhase] = useState(0)
  const [infoCard, setInfoCard] = useState<InfoCardData | null>(null)

  useEffect(() => {
    const t = setInterval(() => setActivePhase(p => (p + 1) % PHASES.length), 2000)
    return () => clearInterval(t)
  }, [])

  function handlePhaseClick(p: typeof PHASES[0], e: React.MouseEvent) {
    if (infoCard?.title === p.label) { setInfoCard(null) }
    else { setInfoCard({ title: p.label, description: p.definition, accentColor: p.accent, position: { x: e.clientX, y: e.clientY } }) }
  }

  const railWidth = RAIL_RIGHT - RAIL_LEFT
  const spacing = railWidth / (PHASES.length - 1)
  const activeId = infoCard ? PHASES.find(p => p.label === infoCard.title)?.id ?? null : null

  return (
    <DiagramShell figId="V-008" title="Pilot Phase Sequence" nodes={PHASES} activeNodeId={activeId} onInternalLink={onInternalLink}>
      <div className="flex flex-col items-center">
        <svg width={W} height={160} className="mx-auto" style={{ height: 160 }}>
          <defs>
            <linearGradient id="rail-grad-v8" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#58a6ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#58a6ff" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow-v8">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Background rail */}
          <motion.rect x={RAIL_LEFT} y={NODE_Y - 2} width={railWidth} height={4}
            fill="url(#rail-grad-v8)" filter="url(#glow-v8)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Progress fill */}
          <motion.rect x={RAIL_LEFT} y={NODE_Y - 2} height={4} fill={THEME.flow.accent} filter="url(#glow-v8)"
            animate={{ width: (activePhase / (PHASES.length - 1)) * railWidth }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Phase nodes */}
          {PHASES.map((p, i) => {
            const x = RAIL_LEFT + i * spacing
            const isActive = i === activePhase
            const isCompleted = i < activePhase
            const isSelected = activeId === p.id

            return (
              <g key={p.id} style={{ cursor: 'pointer' }} onClick={e => handlePhaseClick(p, e)}>
                {/* Auto-pulse ring */}
                <AnimatePresence>
                  {isActive && (
                    <>
                      <motion.circle cx={x} cy={NODE_Y} r={NODE_R} fill="none"
                        stroke={THEME.flow.accent} strokeWidth="2"
                        initial={{ r: NODE_R, opacity: 1 }}
                        animate={{ r: NODE_R + 10, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <motion.circle cx={x} cy={NODE_Y} r={NODE_R} fill="none"
                        stroke={THEME.flow.accent} strokeWidth="2"
                        initial={{ r: NODE_R, opacity: 1 }}
                        animate={{ r: NODE_R + 10, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Click-selected pulse ring */}
                {isSelected && !isActive && (
                  <motion.circle cx={x} cy={NODE_Y} r={NODE_R + 6} fill="none"
                    stroke={p.accent} strokeWidth={1}
                    animate={{ opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                )}

                {/* Node circle */}
                <motion.circle cx={x} cy={NODE_Y} r={NODE_R}
                  fill={isCompleted || isActive ? THEME.flow.accent : '#0d1117'}
                  stroke={isSelected ? p.accent : (isCompleted || isActive ? THEME.flow.accent : '#30363d')}
                  strokeWidth={isSelected ? 3 : 2}
                  animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  style={{ transformOrigin: `${x}px ${NODE_Y}px`, filter: isActive || isSelected ? `drop-shadow(0 0 6px ${p.accent})` : undefined }}
                />

                {/* Phase number */}
                <text x={x} y={NODE_Y + 4} textAnchor="middle" fontSize={8} fontWeight={700}
                  fill={isCompleted || isActive ? '#0d1117' : THEME.flow.accent}
                  fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                  {i}
                </text>

                {/* Phase label below */}
                <text x={x} y={NODE_Y + 28} textAnchor="middle" fontSize={8}
                  fill="rgba(255,255,255,0.5)" fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                  {p.short}
                </text>
              </g>
            )
          })}

          {/* START vertical label */}
          {['S','T','A','R','T'].map((l, i) => (
            <text key={`s${i}`} x={RAIL_LEFT - 22} y={40 + i * 12} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.7)" fontFamily="monospace">{l}</text>
          ))}

          {/* COMPLETE vertical label */}
          {['C','O','M','P','L','E','T','E'].map((l, i) => (
            <text key={`c${i}`} x={RAIL_RIGHT + 14} y={28 + i * 12} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.7)" fontFamily="monospace">{l}</text>
          ))}
        </svg>

        <p className="font-mono text-xs text-white/50 text-center mt-2">
          11-phase pilot progression — click any phase to expand
        </p>
      </div>

      <InfoCard card={infoCard} />
    </DiagramShell>
  )
}
