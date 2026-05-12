// app/src/components/diagrams/V009_ThreatPatchChain.tsx
// Provenance chain: every clause exists because a threat made it necessary
// Chain-link connectors visually reinforce the unbroken accountability trace
// Animated count badges roll up; chain links pulse on hover
import { motion } from 'motion/react'
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'threat', label: 'Threat', definition: 'Adversarial failure mode — the way the system can be captured, gamed, stalled, or made to harm people. Documented in the Threat Register with collapse-state classification.', docLink: 'Threat_Register.md', accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
  { id: 'patch',  label: 'Patch',  definition: 'Constitutional design response to a threat. Documented in the Patch Log with threat linkage, status (ACTIVE/PROPOSED), and evidence requirements.', docLink: 'Patch_Log.md',       accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'annex',  label: 'Annex',  definition: 'Operative constitutional text implementing the patch. Contains specific thresholds, procedures, review duties, and invariant protections. The law-like layer.', docLink: 'ANNEX_AH.md#AH8',  accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
]

const COLS = [
  { id: 'threat', label: 'THREAT', sub: 'failure mode',       count: '28 documented', stroke: THEME.ss.accent,    fill: THEME.ss.fill,    x: 40  },
  { id: 'patch',  label: 'PATCH',  sub: 'design response',    count: '62 patches',    stroke: THEME.voice.accent, fill: THEME.voice.fill, x: 240 },
  { id: 'annex',  label: 'ANNEX',  sub: 'constitutional text', count: 'operative law', stroke: THEME.flow.accent,  fill: '#0d1a2e',        x: 440 },
]

const BOX_W = 160, BOX_H = 100, CY = 50

// Chain link path (horizontal pair of ovals) centered at (0,0)
// Two overlapping ellipses drawn as a rough chain link
function chainLink(cx: number, cy: number): JSX.Element {
  return (
    <g key={cx}>
      <ellipse cx={cx - 5} cy={cy} rx={11} ry={7} fill="none" stroke={THEME.border} strokeWidth={2} />
      <ellipse cx={cx + 5} cy={cy} rx={11} ry={7} fill="none" stroke={THEME.border} strokeWidth={2} />
    </g>
  )
}

export function V009_ThreatPatchChain({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  return (
    <DiagramShell figId="V-009" title="Threat–Patch–Annex Provenance Chain" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 680 200" className="w-full" style={{ height: 200 }}>
        <defs>
          <marker id="arrV9" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
        </defs>

        {/* Chain link connectors between boxes */}
        {[200, 400].map(linkCx => (
          <g key={linkCx} opacity={0}>
            <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin="0.5s" fill="freeze" />
            {/* Draw several links filling the gap */}
            {[-14, 0, 14].map(dx => chainLink(linkCx + dx, CY + BOX_H / 2))}
          </g>
        ))}

        {/* Arrow overlays on chain */}
        <path d={`M${COLS[0].x + BOX_W + 4},${CY + BOX_H / 2} L${COLS[1].x - 4},${CY + BOX_H / 2}`}
          fill="none" stroke="transparent" strokeWidth={1} markerEnd="url(#arrV9)" opacity={0}>
          <animate attributeName="opacity" from={0} to={1} dur="0.1s" begin="0.6s" fill="freeze" />
        </path>
        <path d={`M${COLS[1].x + BOX_W + 4},${CY + BOX_H / 2} L${COLS[2].x - 4},${CY + BOX_H / 2}`}
          fill="none" stroke="transparent" strokeWidth={1} markerEnd="url(#arrV9)" opacity={0}>
          <animate attributeName="opacity" from={0} to={1} dur="0.1s" begin="0.7s" fill="freeze" />
        </path>

        {/* Boxes */}
        {COLS.map((c, i) => {
          const isActive = activeNodeId === c.id
          return (
            <motion.g
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.14, duration: 0.4 }}
              style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 8px ${c.stroke})` : undefined }}
              onClick={() => handleNodeClick(c.id)}
            >
              {isActive && (
                <motion.rect
                  x={c.x - 2} y={CY - 2} width={BOX_W + 4} height={BOX_H + 4} rx={8}
                  fill="none" stroke={c.stroke} strokeWidth={1.5}
                  animate={{ opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <rect x={c.x} y={CY} width={BOX_W} height={BOX_H} rx={8}
                fill={c.fill} stroke={c.stroke}
                strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
              />

              {/* Count badge at top */}
              <text x={c.x + BOX_W / 2} y={CY - 8} textAnchor="middle" fontSize={8.5}
                fill={c.stroke} fontFamily="monospace" opacity={0.7} letterSpacing="0.04em">
                {c.count}
              </text>

              <text x={c.x + BOX_W / 2} y={CY + 38} textAnchor="middle" fontSize={14} fontWeight={700} fill={c.stroke} fontFamily="monospace">{c.label}</text>
              <text x={c.x + BOX_W / 2} y={CY + 60} textAnchor="middle" fontSize={9.5} fill={THEME.subtext} fontFamily="monospace">{c.sub}</text>
            </motion.g>
          )
        })}

        {/* Footer provenance note */}
        <motion.text
          x={340} y={185} textAnchor="middle" fontSize={8.5} fill={THEME.dim} fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        >
          every clause exists because a threat made it necessary · see Provenance_Map.md
        </motion.text>
      </svg>
    </DiagramShell>
  )
}
