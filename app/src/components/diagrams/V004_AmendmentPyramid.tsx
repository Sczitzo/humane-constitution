// app/src/components/diagrams/V004_AmendmentPyramid.tsx
// Amendment gate classifier: proposals are sorted by what they touch, then routed
// through the minimum required safeguard. Lower tiers cannot rewrite higher tiers.
import { motion } from 'motion/react'
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 'classify',
    label: 'Classification Gate',
    definition: 'Every proposal is first classified by what it touches. The gate prevents a rights-impacting or structural change from being smuggled through as an ordinary parameter update.',
    docLink: 'ANNEX_H.md',
    accent: THEME.neutral.accent,
    accentBg: THEME.neutral.accentBg,
  },
  {
    id: 't3',
    label: 'Tier 3 — Operational Parameters',
    definition: 'Standard FAP path for bounded dials already authorized elsewhere: audit cadence, dashboard refresh, pilot settings, and technical parameters inside published ranges.',
    docLink: 'ANNEX_H.md',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
  },
  {
    id: 't2',
    label: 'Tier 2 — Structural Rules',
    definition: 'Founding commitments and durable operating rules require supermajority approval plus adversarial review. Tier 2 can tune the structure, but cannot narrow Tier 1 protections.',
    docLink: 'ANNEX_H.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
  },
  {
    id: 't1',
    label: 'Tier 1 — Constitutional Core',
    definition: 'Constitutional invariants require the highest in-system gate: 7-of-9 keyholder signatures, 180-day timelock, and required independent review where specified.',
    docLink: 'INVARIANTS.md',
    accent: THEME.ss.accent,
    accentBg: THEME.ss.accentBg,
  },
  {
    id: 'refounding',
    label: 'Refounding Gate',
    definition: 'Changes to the amendment mechanism itself require H-3 refounding authority. The system cannot weaken its own highest gate through a lower-tier path.',
    docLink: 'INVARIANTS.md',
    accent: THEME.emergency.accent,
    accentBg: THEME.emergency.accentBg,
  },
]

const GATES = [
  {
    id: 't3',
    touch: 'Operational parameter',
    gate: 'Tier 3',
    path: ['FAP vote', 'public notice'],
    examples: 'thresholds · cadence · pilot settings',
    y: 34,
    accent: THEME.flow.accent,
    fill: THEME.flow.fill,
  },
  {
    id: 't2',
    touch: 'Structural rule',
    gate: 'Tier 2',
    path: ['supermajority', 'adversarial panel'],
    examples: 'annexes · quorum · oracle rules',
    y: 122,
    accent: THEME.voice.accent,
    fill: THEME.voice.fill,
  },
  {
    id: 't1',
    touch: 'Constitutional core',
    gate: 'Tier 1',
    path: ['7-of-9 keyholders', '180-day timelock'],
    examples: 'invariants · survival floor · separation',
    y: 210,
    accent: THEME.ss.accent,
    fill: THEME.ss.fill,
  },
  {
    id: 'refounding',
    touch: 'Amendment mechanism',
    gate: 'Refounding',
    path: ['H-3 authority', 'constitutional reconstitution'],
    examples: 'changing FC-110 / FC-111',
    y: 298,
    accent: THEME.emergency.accent,
    fill: THEME.emergency.fill,
  },
]

const SVG_W = 880
const GATE_X = 400
const GATE_W = 456
const GATE_H = 72

export function V004_AmendmentPyramid({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const activeAccent = NODES.find((node) => node.id === activeNodeId)?.accent

  return (
    <DiagramShell figId="V-004" title="Amendment Gate Classifier" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox={`0 0 ${SVG_W} 448`} className="w-full" style={{ height: 448 }}>
        <defs>
          <marker id="v4arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={THEME.dim} />
          </marker>
        </defs>

        {/* Proposal intake */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          style={{ cursor: 'pointer', filter: activeNodeId === 'classify' ? `drop-shadow(0 0 7px ${THEME.neutral.accent})` : undefined }}
          onClick={() => handleNodeClick('classify')}
        >
          <rect x={24} y={150} width={110} height={96} rx={9}
            fill={activeNodeId === 'classify' ? THEME.neutral.accentBg : '#0d1117'}
            stroke={activeNodeId === 'classify' ? THEME.neutral.accent : THEME.border}
            strokeWidth={activeNodeId === 'classify' ? 2.5 : 1.5}
          />
          <text x={79} y={184} textAnchor="middle" fontSize={15} fontWeight={700} fill="#dde1e7" fontFamily="monospace">proposed</text>
          <text x={79} y={207} textAnchor="middle" fontSize={15} fontWeight={700} fill="#dde1e7" fontFamily="monospace">change</text>
          <text x={79} y={229} textAnchor="middle" fontSize={11} fill={THEME.dim} fontFamily="monospace">classify first</text>
        </motion.g>

        <line x1={134} y1={198} x2={151} y2={198} stroke={THEME.dim} strokeWidth={1.5} markerEnd="url(#v4arrow)" />

        {/* Classification gate */}
        <motion.g
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          style={{ cursor: 'pointer', filter: activeNodeId === 'classify' ? `drop-shadow(0 0 8px ${THEME.neutral.accent})` : undefined }}
          onClick={() => handleNodeClick('classify')}
        >
          <path
            d="M240,112 L316,198 L240,284 L164,198 Z"
            fill={activeNodeId === 'classify' ? THEME.neutral.accentBg : '#111923'}
            stroke={activeNodeId === 'classify' ? THEME.neutral.accent : THEME.border}
            strokeWidth={activeNodeId === 'classify' ? 2.5 : 1.5}
          />
          <text x={240} y={180} textAnchor="middle" fontSize={14.5} fontWeight={700} fill="#dde1e7" fontFamily="monospace">what does</text>
          <text x={240} y={202} textAnchor="middle" fontSize={14.5} fontWeight={700} fill="#dde1e7" fontFamily="monospace">it touch?</text>
          <text x={240} y={226} textAnchor="middle" fontSize={10.5} fill={THEME.dim} fontFamily="monospace">CRP / legality gate</text>
        </motion.g>

        {/* Route lines */}
        {GATES.map((gate, index) => (
          <motion.line
            key={gate.id}
            x1={316}
            y1={198}
            x2={GATE_X - 10}
            y2={gate.y + GATE_H / 2}
            stroke={gate.accent}
            strokeWidth={1.3}
            strokeDasharray={gate.id === 'refounding' ? '4,4' : undefined}
            markerEnd="url(#v4arrow)"
            opacity={0}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 0.22 + index * 0.05, duration: 0.25 }}
          />
        ))}

        {/* Safeguard gates */}
        {GATES.map((gate, index) => {
          const isActive = activeNodeId === gate.id
          return (
            <motion.g
              key={gate.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16 + index * 0.08, duration: 0.35 }}
              style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 8px ${gate.accent})` : undefined }}
              onClick={() => handleNodeClick(gate.id)}
            >
              <rect x={GATE_X} y={gate.y} width={GATE_W} height={GATE_H} rx={8}
                fill={isActive ? gate.fill : '#111923'}
                stroke={gate.accent}
                strokeWidth={isActive ? 2.5 : 1.6}
              />
              <text x={GATE_X + 18} y={gate.y + 20} fontSize={13.5} fill={THEME.subtext} fontFamily="monospace">{gate.touch}</text>
              <text x={GATE_X + 18} y={gate.y + 45} fontSize={18} fontWeight={700} fill={gate.accent} fontFamily="monospace">{gate.gate}</text>
              <text x={GATE_X + 170} y={gate.y + 35} fontSize={12.5} fill="#dde1e7" fontFamily="monospace">{gate.path[0]}</text>
              <text x={GATE_X + 170} y={gate.y + 51} fontSize={12.5} fill="#dde1e7" fontFamily="monospace">{gate.path[1]}</text>
              <text x={GATE_X + 18} y={gate.y + 64} fontSize={10.5} fill={THEME.dim} fontFamily="monospace">{gate.examples}</text>
            </motion.g>
          )
        })}

        {/* Anti-bypass rule */}
        <g>
          <rect x={24} y={398} width={832} height={34} rx={8}
            fill="rgba(248,81,73,0.06)"
            stroke={THEME.ss.accent}
            strokeWidth={1.4}
            strokeDasharray="7,4"
          />
          <text x={42} y={419} fontSize={13.5} fontWeight={700} fill={THEME.ss.accent} fontFamily="monospace">
            NO LOWER-TIER BYPASS
          </text>
          <text x={280} y={419} fontSize={12} fill="#dde1e7" fontFamily="monospace">
            Tier 3 cannot alter Tier 2/Tier 1 · Tier 2 cannot alter Tier 1
          </text>
        </g>

        {activeAccent && (
          <rect x={8} y={18} width={864} height={420} rx={10}
            fill="none" stroke={activeAccent} strokeWidth={1.5} opacity={0.28}
            pointerEvents="none"
          />
        )}
      </svg>
    </DiagramShell>
  )
}
