// app/src/components/diagrams/V007_OraclePolycentric.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 'hub',
    label: 'Oracle Hub',
    definition: 'Aggregates readings from all independent nodes. Requires quorum before publishing. Output includes confidence bands. No single node controls the result.',
    docLink: 'ANNEX_AL.md',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
  },
  {
    id: 'tier1',
    label: 'Tier 1 — Institutional',
    definition: 'Government statistical agencies, academic institutions. Fast but subject to methodology capture. Cannot constitute majority of oracle weight.',
    docLink: 'ANNEX_AL.md',
    accent: THEME.ea.accent,
    accentBg: THEME.ea.accentBg,
  },
  {
    id: 'tier2',
    label: 'Tier 2 — Market Signal',
    definition: 'Price feeds, logistics data, supply-chain indicators. Real-time but gameable. Pairwise correlation max 0.30 with other nodes required.',
    docLink: 'ANNEX_AL.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
  },
  {
    id: 'tier3',
    label: 'Tier 3 — Physical Sample',
    definition: 'Direct physical sampling oracle — harder to poison remotely. Required by INV-005. Inspector chain-of-custody controls required.',
    docLink: 'INVARIANTS.md#INV-005',
    accent: THEME.sr.accent,
    accentBg: THEME.sr.accentBg,
  },
  {
    id: 'adversary',
    label: 'Adversarial Reviewer',
    definition: 'Independent reviewer appointed to challenge oracle methodology. Must have no financial relationship with any Tier 1–3 node operator or funder.',
    docLink: 'ANNEX_AL.md',
    accent: THEME.ss.accent,
    accentBg: THEME.ss.accentBg,
  },
  {
    id: 'community',
    label: 'Community Challenge',
    definition: 'Any person may file a capacity measurement challenge. Oracle must publish a written substantive response within 14 days.',
    docLink: 'ANNEX_AL.md',
    accent: THEME.neutral.accent,
    accentBg: THEME.neutral.accentBg,
  },
]

// Hub-and-spoke: 5 nodes evenly at 72° intervals starting from top (−90°)
const HUB_X = 350
const HUB_Y = 154  // shifted down so top node (−90°) doesn't clip viewBox
const HUB_R = 44
const NODE_R = 34
const SPOKE_D = 118 // center-to-center distance

const SPOKES = [
  { id: 'tier1',     angle: -90,  label: 'TIER 1',    sub: 'Institutional',  nodeIdx: 1 },
  { id: 'tier2',     angle: -18,  label: 'TIER 2',    sub: 'Market',         nodeIdx: 2 },
  { id: 'tier3',     angle:  54,  label: 'TIER 3',    sub: 'Physical',       nodeIdx: 3 },
  { id: 'adversary', angle: 126,  label: 'ADVERSARY', sub: 'Reviewer',       nodeIdx: 4 },
  { id: 'community', angle: 198,  label: 'COMMUNITY', sub: 'Challenge',      nodeIdx: 5 },
]

function spokePos(angle: number) {
  const rad = (angle * Math.PI) / 180
  return {
    x: HUB_X + SPOKE_D * Math.cos(rad),
    y: HUB_Y + SPOKE_D * Math.sin(rad),
    // line endpoints: from hub edge to node edge
    x1: HUB_X + HUB_R * Math.cos(rad),
    y1: HUB_Y + HUB_R * Math.sin(rad),
    x2: HUB_X + (SPOKE_D - NODE_R) * Math.cos(rad),
    y2: HUB_Y + (SPOKE_D - NODE_R) * Math.sin(rad),
    len: SPOKE_D - HUB_R - NODE_R,
  }
}

export function V007_OraclePolycentric({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  return (
    <DiagramShell
      figId="V-007"
      title="Oracle Polycentric Architecture"
      nodes={NODES}
      activeNodeId={activeNodeId}
      onInternalLink={onInternalLink}
    >
      <svg viewBox="0 0 700 278" className="w-full" style={{ height: 278 }}>
        <defs>
          {/* Animated glow filter for hub */}
          <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Spoke lines with draw-in animation */}
        {SPOKES.map((s, i) => {
          const p = spokePos(s.angle)
          const node = NODES[s.nodeIdx]
          const isActive = activeNodeId === s.id
          return (
            <line
              key={`line-${s.id}`}
              x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
              stroke={isActive ? node.accent : THEME.divider}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray={p.len}
              strokeDashoffset={p.len}
              style={{ transition: 'stroke 0.2s ease' }}
            >
              <animate
                attributeName="strokeDashoffset"
                from={p.len}
                to={0}
                dur="0.5s"
                begin={`${0.1 + i * 0.08}s`}
                fill="freeze"
              />
            </line>
          )
        })}

        {/* Spoke nodes */}
        {SPOKES.map((s, i) => {
          const p = spokePos(s.angle)
          const node = NODES[s.nodeIdx]
          const isActive = activeNodeId === s.id
          return (
            <g
              key={s.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleNodeClick(s.id)}
            >
              {/* Outer pulse ring when active */}
              {isActive && (
                <circle cx={p.x} cy={p.y} r={NODE_R + 6} fill="none"
                  stroke={node.accent} strokeWidth={1} opacity={0.4}>
                  <animate attributeName="r" values={`${NODE_R + 4};${NODE_R + 12};${NODE_R + 4}`}
                    dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4"
                    dur="1.8s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Node circle — fade in staggered */}
              <circle
                cx={p.x} cy={p.y} r={NODE_R}
                fill="#0d1117"
                stroke={node.accent}
                strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
                opacity={0}
                filter={isActive ? 'url(#node-glow)' : undefined}
              >
                <animate attributeName="opacity" from={0} to={1}
                  dur="0.3s" begin={`${0.15 + i * 0.08}s`} fill="freeze" />
              </circle>
              {/* Label line 1 */}
              <text x={p.x} y={p.y - 6} textAnchor="middle" fontSize={8.5}
                fontWeight={700} fill={node.accent} fontFamily="monospace"
                style={{ pointerEvents: 'none' }}>
                {s.label}
              </text>
              {/* Label line 2 */}
              <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={8}
                fill={THEME.subtext} fontFamily="monospace"
                style={{ pointerEvents: 'none' }}>
                {s.sub}
              </text>
            </g>
          )
        })}

        {/* Hub — pulsing ring + center circle */}
        <g style={{ cursor: 'pointer' }} onClick={() => handleNodeClick('hub')}>
          {/* Outer ambient pulse */}
          <circle cx={HUB_X} cy={HUB_Y} r={HUB_R + 10} fill="none"
            stroke={THEME.flow.accent} strokeWidth={1} opacity={0.15}>
            <animate attributeName="r" values={`${HUB_R + 8};${HUB_R + 20};${HUB_R + 8}`}
              dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0;0.15"
              dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Active pulse ring */}
          {activeNodeId === 'hub' && (
            <circle cx={HUB_X} cy={HUB_Y} r={HUB_R + 6} fill="none"
              stroke={THEME.flow.accent} strokeWidth={1.5} opacity={0.5}>
              <animate attributeName="r" values={`${HUB_R + 4};${HUB_R + 14};${HUB_R + 4}`}
                dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5"
                dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}
          {/* Hub body */}
          <circle
            cx={HUB_X} cy={HUB_Y} r={HUB_R}
            fill="#0a1628"
            stroke={THEME.flow.accent}
            strokeWidth={activeNodeId === 'hub' ? 3 : 2}
            filter="url(#hub-glow)"
          />
          <text x={HUB_X} y={HUB_Y - 7} textAnchor="middle" fontSize={11}
            fontWeight={700} fill={THEME.flow.accent} fontFamily="monospace"
            style={{ pointerEvents: 'none' }}>
            ORACLE
          </text>
          <text x={HUB_X} y={HUB_Y + 8} textAnchor="middle" fontSize={9}
            fill={THEME.dim} fontFamily="monospace"
            style={{ pointerEvents: 'none' }}>
            HUB
          </text>
        </g>


      </svg>
    </DiagramShell>
  )
}
