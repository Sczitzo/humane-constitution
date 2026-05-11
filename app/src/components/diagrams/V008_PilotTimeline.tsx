// app/src/components/diagrams/V008_PilotTimeline.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const PHASES: Array<DiagramNode & { short: string; phase: string }> = [
  { id: 'p0',  phase: 'P0',  short: 'Founding',      label: 'Phase 0 — Founding Cascade Gate',             definition: 'All founding legitimacy artifacts must reach PRODUCED status before any pilot phase begins. Blocks T-017 recurrence.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#f85149', accentBg: 'rgba(248,81,73,0.07)' },
  { id: 'p1',  phase: 'P1',  short: 'Comprehension',  label: 'Phase 1 — Public Understanding',              definition: 'Skeptical general readers must understand Flow, Essential Access, Voice, Service Record, and Shared Storehouse without expert help.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
  { id: 'p2',  phase: 'P2',  short: 'Identity',       label: 'Phase 2 — Identity & Recovery',               definition: 'People can recover access without surveillance, exclusion, or fraud collapse. False exclusion stays below published threshold.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
  { id: 'p3',  phase: 'P3',  short: 'Capacity',       label: 'Phase 3 — Essential Capacity Measurement',    definition: 'Essentials measured accurately enough to support issuance and scarcity decisions. Measurement error within published bounds.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
  { id: 'p4',  phase: 'P4',  short: 'Delivery',       label: 'Phase 4 — Essential Access Delivery',         definition: 'Baseline essentials delivered without discretionary gatekeeping. Delivery, appeals, and continuity meet minimum service targets.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#3fb950', accentBg: 'rgba(63,185,80,0.07)' },
  { id: 'p5',  phase: 'P5',  short: 'Flow/Demurrage', label: 'Phase 5 — Flow & Demurrage Simulation',       definition: 'Flow decay funds public rails without burdening ordinary users or creating sector-capture exemptions.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'p6',  phase: 'P6',  short: 'Banking',        label: 'Phase 6 — Public Banking Rails',              definition: 'Basic banking provided as infrastructure without predatory fees or credit traps. Service cost and access targets sustainable.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'p7',  phase: 'P7',  short: 'Anti-Rent',      label: 'Phase 7 — Anti-Rent & Ownership Review',      definition: 'Trusts, beneficial ownership, land control, and business control bounded without destroying stewardship. Elite workaround routes closed.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#a371f7', accentBg: 'rgba(163,113,247,0.07)' },
  { id: 'p8',  phase: 'P8',  short: 'Conglomerate',   label: 'Phase 8 — Essential-Sector Transition',       definition: 'Oil, energy, medicine, logistics, PBM-style intermediaries keep doing business without survival leverage. Largest-supplier refusal does not break CSM floor.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#f85149', accentBg: 'rgba(248,81,73,0.07)' },
  { id: 'p9',  phase: 'P9',  short: 'Red Team',       label: 'Phase 9 — Governance Red-Team',               definition: 'Hostile actors cannot capture institutions, definitions, or emergency powers. Attack paths visible, challengeable, and patched before scale.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#ff6b6b', accentBg: 'rgba(255,107,107,0.07)' },
  { id: 'p10', phase: 'P10', short: 'Drift/Founding',  label: 'Phase 10 — Implementation Drift & Founding Legitimacy', definition: 'Hard locks, deployment attestations, founding dossier, and claim-status gates work under hostile pressure. Drift and founding failures visible before activation.', docLink: 'Pilot_Evidence_Roadmap.md', accent: '#8b949e', accentBg: 'rgba(139,148,158,0.07)' },
]

export function V008_PilotTimeline({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const r = 22, spacing = 60, startX = 36, cy = 60

  return (
    <DiagramShell figId="V-008" title="Pilot Phase Sequence" nodes={PHASES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 700 130" className="w-full" style={{ height: 130 }}>
        <line x1={startX} y1={cy} x2={startX + spacing * 10} y2={cy} stroke="#21262d" strokeWidth={2} />
        {PHASES.map((p, i) => {
          const cx = startX + i * spacing
          const isActive = activeNodeId === p.id
          return (
            <g key={p.id} style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(p.id)}>
              <circle cx={cx} cy={cy} r={r} fill="#161b22" stroke={p.accent} strokeWidth={isActive ? 3 : 1.5}
                style={{ filter: isActive ? `drop-shadow(0 0 6px ${p.accent})` : undefined }} />
              <text x={cx} y={cy + 5} textAnchor="middle" fontSize={10} fontWeight={700} fill={p.accent} fontFamily="monospace">{p.phase}</text>
              <text x={cx} y={cy + r + 16} textAnchor="middle" fontSize={8} fill="#8b949e" fontFamily="monospace">{p.short}</text>
            </g>
          )
        })}
      </svg>
    </DiagramShell>
  )
}
