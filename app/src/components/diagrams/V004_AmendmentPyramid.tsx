// app/src/components/diagrams/V004_AmendmentPyramid.tsx
// Centered pyramid tiers with protection-level metadata badges
// Tier widths narrow at apex = harder to amend; lock icons scale with protection
import { motion } from 'motion/react'
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 't1', label: 'Tier 1 — Constitutional Core', definition: 'Highest protection. Requires 7-of-9 keyholder signatures plus a 180-day public timelock. Covers invariants, instrument separation, survival floor, and the amendment process itself.', docLink: 'INVARIANTS.md', accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
  { id: 't2', label: 'Tier 2 — Structural Rules',    definition: 'Requires supermajority vote plus adversarial panel review. Covers annexes, thresholds, oracle rules, and governance procedures that implement Tier 1 principles.', docLink: 'ANNEX_AH.md',  accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 't3', label: 'Tier 3 — Standard Amendment',  definition: 'Formal Acceptance Protocol (FAP). Standard governance vote with public notice and challenge window. Covers operational parameters, pilot rules, and non-structural patches.', docLink: 'ANNEX_AG.md',  accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
]

const TIERS = [
  {
    id: 't1', label: 'TIER 1', sub: 'Constitutional Core',
    req1: '7-of-9 keyholders', req2: '180-day timelock',
    y: 18, w: 210, stroke: THEME.ss.accent, fill: THEME.ss.fill, locks: 3,
  },
  {
    id: 't2', label: 'TIER 2', sub: 'Structural Rules',
    req1: 'supermajority vote', req2: 'adversarial panel',
    y: 96, w: 370, stroke: THEME.voice.accent, fill: THEME.voice.fill, locks: 2,
  },
  {
    id: 't3', label: 'TIER 3', sub: 'Standard Amendment',
    req1: 'governance vote', req2: 'public notice window',
    y: 174, w: 530, stroke: THEME.flow.accent, fill: '#0d1a2e', locks: 1,
  },
]

const CX = 300, TIER_H = 66

// Tiny lock path (centered at 0,0, ~10×13px)
const LOCK = 'M-4,-1 L-4,5 Q-4,7 -2,7 L2,7 Q4,7 4,5 L4,-1 Q4,-3 2,-3 L-2,-3 Q-4,-3 -4,-1 Z M-1.5,-3 L-1.5,-6 Q-1.5,-9 0,-9 Q1.5,-9 1.5,-6 L1.5,-3'

export function V004_AmendmentPyramid({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  return (
    <DiagramShell figId="V-004" title="Amendment Tier Pyramid" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 660 262" className="w-full" style={{ height: 262 }}>

        {/* Pyramid tiers — widest at base, narrowest at top */}
        {TIERS.map((t, i) => {
          const isActive = activeNodeId === t.id
          const x = CX - t.w / 2
          return (
            <motion.g
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + (2 - i) * 0.13, duration: 0.4 }}
              style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 8px ${t.stroke})` : undefined }}
              onClick={() => handleNodeClick(t.id)}
            >
              {isActive && (
                <motion.rect
                  x={x - 2} y={t.y - 2} width={t.w + 4} height={TIER_H + 4} rx={7}
                  fill="none" stroke={t.stroke} strokeWidth={1.5}
                  animate={{ opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <rect x={x} y={t.y} width={t.w} height={TIER_H} rx={6}
                fill={t.fill} stroke={t.stroke}
                strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
              />

              {/* Labels */}
              <text x={CX} y={t.y + 22} textAnchor="middle" fontSize={12} fontWeight={700} fill={t.stroke} fontFamily="monospace">{t.label}</text>
              <text x={CX} y={t.y + 38} textAnchor="middle" fontSize={9.5} fill={THEME.subtext} fontFamily="monospace">{t.sub}</text>

              {/* Requirement badges */}
              <text x={CX} y={t.y + 55} textAnchor="middle" fontSize={8} fill={t.stroke} fontFamily="monospace" opacity={0.75}>
                {t.req1} · {t.req2}
              </text>

              {/* Lock icons on right side (count = protection level) */}
              {Array.from({ length: t.locks }).map((_, li) => (
                <g key={li} transform={`translate(${x + t.w + 14 + li * 16}, ${t.y + TIER_H / 2})`}>
                  <path d={LOCK} fill={t.stroke} opacity={0.7} transform="scale(0.9)" />
                </g>
              ))}
            </motion.g>
          )
        })}

        {/* Protection scale annotation */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <line x1={590} y1={25} x2={590} y2={233} stroke={THEME.border} strokeWidth={1} />
          <text x={600} y={30}  fontSize={8} fill={THEME.ss.accent}    fontFamily="monospace">highest</text>
          <text x={600} y={236} fontSize={8} fill={THEME.flow.accent}  fontFamily="monospace">standard</text>
          <text x={600} y={130} fontSize={8} fill={THEME.dim}          fontFamily="monospace" transform="rotate(90,600,130)">protection →</text>
        </motion.g>

        {/* Tier connector lines */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 0.5 }}>
          <line x1={CX - 105} y1={84} x2={CX - 185} y2={96} stroke={THEME.border} strokeWidth={1} strokeDasharray="3,2" />
          <line x1={CX + 105} y1={84} x2={CX + 185} y2={96} stroke={THEME.border} strokeWidth={1} strokeDasharray="3,2" />
          <line x1={CX - 185} y1={162} x2={CX - 265} y2={174} stroke={THEME.border} strokeWidth={1} strokeDasharray="3,2" />
          <line x1={CX + 185} y1={162} x2={CX + 265} y2={174} stroke={THEME.border} strokeWidth={1} strokeDasharray="3,2" />
        </motion.g>
      </svg>
    </DiagramShell>
  )
}
