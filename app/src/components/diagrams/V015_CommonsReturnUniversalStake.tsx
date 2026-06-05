// app/src/components/diagrams/V015_CommonsReturnUniversalStake.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const LANES = [
  {
    id: 'sources',
    label: 'Source Bases',
    titleLines: ['Source Bases'],
    short: 'SOURCES',
    definition: 'Commons Return starts from exclusive control of shared or scarcity-created value: location, resources, public licenses, network rents, and large succession transfers.',
    docLink: 'ANNEX_D.md',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
    fill: THEME.flow.fill,
    lines: ['land / location value', 'natural resources', 'spectrum / licenses', 'monopoly / network rents', 'succession transfers'],
  },
  {
    id: 'assessment',
    label: 'Commons Return Assessment',
    titleLines: ['Commons Return', 'Assessment'],
    short: 'ASSESS',
    definition: 'Assessment uses public accounting, protected ordinary use, anti-avoidance checks, and appeal rights so the burden lands on scarcity-created advantage rather than ordinary labor or survival.',
    docLink: 'ANNEX_D.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
    fill: THEME.voice.fill,
    lines: ['transparent public accounting', 'protected ordinary use', 'anti-avoidance checks', 'appeals'],
  },
  {
    id: 'lockbox',
    label: 'Public Lockbox',
    titleLines: ['Public Lockbox'],
    short: 'LOCKBOX',
    definition: 'Receipts are routed through a ring-fenced public lockbox for essential access support, a passive social wealth fund, and reserve/audit layers without patronage discretion.',
    docLink: 'ANNEX_D.md',
    accent: THEME.ea.accent,
    accentBg: THEME.ea.accentBg,
    fill: THEME.ea.fill,
    lines: ['essential access support', 'passive social wealth fund', 'reserve + audit layer'],
  },
  {
    id: 'stake',
    label: 'Universal Stake',
    titleLines: ['Universal Stake'],
    short: 'STAKE',
    definition: 'Every member receives a non-tradable member stake, dividend, or endowment. It cannot be converted into Voice, office, membership, legal standing, or survival priority.',
    docLink: 'ANNEX_D.md',
    accent: THEME.sr.accent,
    accentBg: THEME.sr.accentBg,
    fill: THEME.sr.fill,
    lines: ['non-tradable member stake', 'dividend / endowment', 'not collateral', 'not civic power'],
  },
] as const

const WALLS = [
  ['Survival access', 'cannot be bought'],
  ['Voice', 'cannot be bought'],
  ['Membership', 'cannot be bought or inherited'],
  ['Universal Stake', 'cannot be sold, assigned,', 'garnished, or pledged'],
] as const

const NODES: DiagramNode[] = [
  ...LANES.map(({ id, label, definition, docLink, accent, accentBg }) => ({
    id, label, definition, docLink, accent, accentBg,
  })),
  {
    id: 'walls',
    label: 'Non-Conversion Walls',
    definition: 'The distribution cannot be turned into dominance: survival access, Voice, membership, and the Universal Stake itself remain outside purchase, inheritance, assignment, garnishment, and pledge markets.',
    docLink: 'INVARIANTS.md#INV-002',
    accent: THEME.ss.accent,
    accentBg: THEME.ss.accentBg,
  },
]

const BOX = { y: 58, w: 188, h: 236 }
const X = [24, 244, 464, 684]

export function V015_CommonsReturnUniversalStake({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  return (
    <DiagramShell figId="V-015" title="Commons Return and Universal Stake" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <div className="grid gap-3 sm:hidden">
        {LANES.map((lane, index) => (
          <button
            key={lane.id}
            type="button"
            className="rounded-lg border bg-[#0d1117] px-4 py-3 text-left"
            style={{ borderColor: lane.accent, boxShadow: activeNodeId === lane.id ? `0 0 18px ${lane.accent}44` : undefined }}
            aria-pressed={activeNodeId === lane.id}
            onClick={() => handleNodeClick(lane.id)}
          >
            <div className="flex items-center gap-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.08em]" style={{ color: lane.accent }}>
              <span>{index + 1}</span>
              <span>{lane.label}</span>
            </div>
            <div className="mt-2 grid gap-1">
              {lane.lines.map((line) => (
                <div key={line} className="font-mono text-[0.72rem] leading-5 text-[#c9d1d9]">
                  - {line}
                </div>
              ))}
            </div>
          </button>
        ))}
        <button
          type="button"
          className="rounded-lg border bg-[#1a0d0d] px-4 py-3 text-left"
          style={{ borderColor: THEME.ss.accent, boxShadow: activeNodeId === 'walls' ? `0 0 18px ${THEME.ss.accent}44` : undefined }}
          aria-pressed={activeNodeId === 'walls'}
          onClick={() => handleNodeClick('walls')}
        >
          <div className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#f85149]">
            Non-conversion walls
          </div>
          <div className="mt-2 grid gap-1">
            {WALLS.map((wall) => (
              <div key={wall[0]} className="font-mono text-[0.72rem] leading-5 text-[#f0d0d0]">
                - {wall.join(' ')}
              </div>
            ))}
          </div>
        </button>
      </div>

      <svg viewBox="0 0 900 500" className="hidden w-full sm:block" style={{ height: 500 }}>
        <defs>
          <marker id="arrV15" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill={THEME.border} />
          </marker>
          <filter id="glowV15">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {LANES.map((lane, index) => {
          const x = X[index]
          const isActive = activeNodeId === lane.id
          return (
            <g
              key={lane.id}
              opacity={0}
              style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 7px ${lane.accent})` : undefined }}
              onClick={() => handleNodeClick(lane.id)}
            >
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.05 + index * 0.1}s`} fill="freeze" />
              {index > 0 && (
                <path
                  d={`M${X[index - 1] + BOX.w + 18},${BOX.y + 112} L${x - 18},${BOX.y + 112}`}
                  fill="none"
                  stroke={THEME.border}
                  strokeWidth={1.7}
                  markerEnd="url(#arrV15)"
                />
              )}
              {isActive && (
                <rect x={x - 2} y={BOX.y - 2} width={BOX.w + 4} height={BOX.h + 4} rx={8} fill="none" stroke={lane.accent} strokeWidth={1.5}>
                  <animate attributeName="opacity" values="0.6;0.15;0.6" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={x} y={BOX.y} width={BOX.w} height={BOX.h} rx={7} fill={lane.fill} stroke={lane.accent} strokeWidth={isActive ? 3 : 2} />
              <text x={x + 18} y={BOX.y + 28} fontSize={10} fontWeight={700} fill={lane.accent} fontFamily="monospace" letterSpacing="0.08em">
                {String(index + 1).padStart(2, '0')} / {lane.short}
              </text>
              {lane.titleLines.map((titleLine, titleIndex) => (
                <text key={titleLine} x={x + 18} y={BOX.y + 52 + titleIndex * 18} fontSize={14} fontWeight={700} fill="#dde1e7" fontFamily="monospace">
                  {titleLine}
                </text>
              ))}
              {lane.lines.map((line, lineIndex) => (
                <g key={line}>
                  <circle cx={x + 21} cy={BOX.y + 84 + (lane.titleLines.length - 1) * 20 + lineIndex * 29} r={3} fill={lane.accent} opacity={0.85} />
                  <text x={x + 32} y={BOX.y + 88 + (lane.titleLines.length - 1) * 20 + lineIndex * 29} fontSize={8.8} fill={THEME.subtext} fontFamily="monospace">
                    {line}
                  </text>
                </g>
              ))}
            </g>
          )
        })}

        <g
          opacity={0}
          style={{ cursor: 'pointer', filter: activeNodeId === 'walls' ? `drop-shadow(0 0 8px ${THEME.ss.accent})` : undefined }}
          onClick={() => handleNodeClick('walls')}
        >
          <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin="0.55s" fill="freeze" />
          <rect x={24} y={334} width={848} height={128} rx={8} fill="rgba(248,81,73,0.08)" stroke={THEME.ss.accent} strokeWidth={activeNodeId === 'walls' ? 3 : 2} strokeDasharray="8,5" />
          <text x={44} y={360} fontSize={11} fontWeight={700} fill={THEME.ss.accent} fontFamily="monospace" letterSpacing="0.08em">
            WALLS AGAINST CONVERSION
          </text>
          {WALLS.map((wall, index) => {
            const x = 44 + index * 205
            return (
              <g key={wall[0]}>
                <rect x={x} y={378} width={180} height={66} rx={6} fill="#0d1117" stroke="rgba(248,81,73,0.45)" strokeWidth={1} />
                <text x={x + 12} y={400} fontSize={10.5} fontWeight={700} fill="#ffb3b0" fontFamily="monospace">
                  {wall[0]}
                </text>
                {wall.slice(1).map((line, lineIndex) => (
                  <text key={line} x={x + 12} y={418 + lineIndex * 15} fontSize={9} fill="#f0d0d0" fontFamily="monospace">
                    {line}
                  </text>
                ))}
              </g>
            )
          })}
        </g>

        {[0, 0.9, 1.8].map((delay) => (
          <circle key={delay} r={3.5} fill={THEME.ea.accent} opacity={0.8} filter="url(#glowV15)">
            <animateMotion dur="5s" repeatCount="indefinite" begin={`${delay}s`} path="M118,314 L794,314" />
          </circle>
        ))}
        <text x={450} y={318} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.05em">
          public return becomes protected member stake, never purchasable power
        </text>
      </svg>
    </DiagramShell>
  )
}
