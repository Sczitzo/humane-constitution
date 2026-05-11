// app/src/components/diagrams/V007_OraclePolycentric.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DiagramShell } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'
import { InfoCard, type InfoCardData } from './InfoCard'

const NODES: DiagramNode[] = [
  { id: 'hub',       label: 'Oracle Hub',           definition: 'Aggregates readings from all independent nodes. Requires quorum before publishing. Output includes confidence bands. No single node controls the result.', docLink: 'ANNEX_AL.md', accent: THEME.flow.accent,    accentBg: THEME.flow.accentBg },
  { id: 'tier1',    label: 'Tier 1 — Institutional', definition: 'Government statistical agencies, academic institutions. Fast but subject to methodology capture. Cannot constitute majority of oracle weight.', docLink: 'ANNEX_AL.md', accent: THEME.ea.accent,      accentBg: THEME.ea.accentBg },
  { id: 'tier2',    label: 'Tier 2 — Market Signal',  definition: 'Price feeds, logistics data, supply-chain indicators. Real-time but gameable. Pairwise correlation max 0.30 with other nodes required.', docLink: 'ANNEX_AL.md', accent: THEME.voice.accent,   accentBg: THEME.voice.accentBg },
  { id: 'tier3',    label: 'Tier 3 — Physical Sample', definition: 'Direct physical sampling oracle — harder to poison remotely. Required by INV-005. Inspector chain-of-custody controls required.', docLink: 'INVARIANTS.md#INV-005', accent: THEME.sr.accent, accentBg: THEME.sr.accentBg },
  { id: 'adversary', label: 'Adversarial Reviewer',   definition: 'Independent reviewer appointed to challenge oracle methodology. Must have no financial relationship with any Tier 1–3 node operator or funder.', docLink: 'ANNEX_AL.md', accent: THEME.ss.accent, accentBg: THEME.ss.accentBg },
  { id: 'community', label: 'Community Challenge',    definition: 'Any person may file a capacity measurement challenge. Oracle must publish a written substantive response within 14 days.', docLink: 'ANNEX_AL.md', accent: THEME.neutral.accent, accentBg: THEME.neutral.accentBg },
]

const HUB_X = 350, HUB_Y = 155, HUB_R = 44, NODE_R = 34, SPOKE_D = 118

const SPOKES = [
  { id: 'tier1',     angle: -90,  label: 'TIER 1',    sub: 'Institutional', nodeIdx: 1 },
  { id: 'tier2',     angle: -18,  label: 'TIER 2',    sub: 'Market',        nodeIdx: 2 },
  { id: 'tier3',     angle:  54,  label: 'TIER 3',    sub: 'Physical',      nodeIdx: 3 },
  { id: 'adversary', angle: 126,  label: 'ADVERSARY', sub: 'Reviewer',      nodeIdx: 4 },
  { id: 'community', angle: 198,  label: 'COMMUNITY', sub: 'Challenge',     nodeIdx: 5 },
]

function spokePos(angle: number) {
  const rad = (angle * Math.PI) / 180
  const cx = HUB_X + SPOKE_D * Math.cos(rad)
  const cy = HUB_Y + SPOKE_D * Math.sin(rad)
  return {
    x: cx, y: cy,
    x1: HUB_X + HUB_R * Math.cos(rad),
    y1: HUB_Y + HUB_R * Math.sin(rad),
    x2: HUB_X + (SPOKE_D - NODE_R) * Math.cos(rad),
    y2: HUB_Y + (SPOKE_D - NODE_R) * Math.sin(rad),
  }
}

export function V007_OraclePolycentric({ onInternalLink }: DiagramProps) {
  const [infoCard, setInfoCard] = useState<InfoCardData | null>(null)

  function handleNodeClick(nodeId: string, e: React.MouseEvent) {
    const node = NODES.find(n => n.id === nodeId)!
    if (infoCard?.title === node.label) {
      setInfoCard(null)
    } else {
      setInfoCard({ title: node.label, description: node.definition, accentColor: node.accent, position: { x: e.clientX, y: e.clientY } })
    }
  }

  return (
    <DiagramShell figId="V-007" title="Oracle Polycentric Architecture" nodes={NODES} activeNodeId={infoCard ? NODES.find(n => n.label === infoCard.title)?.id ?? null : null} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 700 278" className="w-full" style={{ height: 278 }}>
        <defs>
          <filter id="hub-glow-v7" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="node-glow-v7" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Spoke lines */}
        {SPOKES.map((s, i) => {
          const p = spokePos(s.angle)
          const node = NODES[s.nodeIdx]
          const isActive = infoCard?.title === node.label
          return (
            <line key={`line-${s.id}`}
              x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
              stroke={isActive ? node.accent : THEME.divider}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray="4,3"
              opacity={0}
            >
              <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin={`${0.1 + i * 0.08}s`} fill="freeze" />
              {isActive && <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="0.6s" repeatCount="indefinite" />}
            </line>
          )
        })}

        {/* Spoke nodes */}
        {SPOKES.map((s, i) => {
          const p = spokePos(s.angle)
          const node = NODES[s.nodeIdx]
          const isActive = infoCard?.title === node.label
          return (
            <g key={s.id} style={{ cursor: 'pointer' }} onClick={e => handleNodeClick(s.id, e)}>
              {/* Pulse ring when active */}
              <AnimatePresence>
                {isActive && (
                  <motion.circle cx={p.x} cy={p.y} r={NODE_R + 6} fill="none"
                    stroke={node.accent} strokeWidth={1}
                    initial={{ opacity: 0, r: NODE_R + 4 }}
                    animate={{ opacity: [0.5, 0, 0.5], r: [NODE_R + 4, NODE_R + 14, NODE_R + 4] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>
              <circle cx={p.x} cy={p.y} r={NODE_R}
                fill="#0d1117"
                stroke={node.accent}
                strokeWidth={isActive ? 2.5 : 1.5}
                opacity={0}
                filter={isActive ? 'url(#node-glow-v7)' : undefined}
              >
                <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin={`${0.15 + i * 0.08}s`} fill="freeze" />
              </circle>
              <text x={p.x} y={p.y - 6} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={node.accent} fontFamily="monospace" style={{ pointerEvents: 'none' }}>{s.label}</text>
              <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={8} fill={THEME.subtext} fontFamily="monospace" style={{ pointerEvents: 'none' }}>{s.sub}</text>
            </g>
          )
        })}

        {/* Hub */}
        <g style={{ cursor: 'pointer' }} onClick={e => handleNodeClick('hub', e)}>
          <circle cx={HUB_X} cy={HUB_Y} r={HUB_R + 10} fill="none" stroke={THEME.flow.accent} strokeWidth={1} opacity={0.15}>
            <animate attributeName="r" values={`${HUB_R + 8};${HUB_R + 20};${HUB_R + 8}`} dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" />
          </circle>
          <AnimatePresence>
            {infoCard?.title === 'Oracle Hub' && (
              <motion.circle cx={HUB_X} cy={HUB_Y} r={HUB_R + 6} fill="none"
                stroke={THEME.flow.accent} strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 0, 0.5], r: [HUB_R + 4, HUB_R + 14, HUB_R + 4] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
          <circle cx={HUB_X} cy={HUB_Y} r={HUB_R}
            fill="#0a1628"
            stroke={THEME.flow.accent}
            strokeWidth={infoCard?.title === 'Oracle Hub' ? 3 : 2}
            filter="url(#hub-glow-v7)"
          />
          <text x={HUB_X} y={HUB_Y - 7} textAnchor="middle" fontSize={11} fontWeight={700} fill={THEME.flow.accent} fontFamily="monospace" style={{ pointerEvents: 'none' }}>ORACLE</text>
          <text x={HUB_X} y={HUB_Y + 8} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace" style={{ pointerEvents: 'none' }}>HUB</text>
        </g>
      </svg>

      <InfoCard card={infoCard} />
    </DiagramShell>
  )
}
