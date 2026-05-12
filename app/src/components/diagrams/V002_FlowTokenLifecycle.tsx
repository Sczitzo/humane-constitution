// app/src/components/diagrams/V002_FlowTokenLifecycle.tsx
// C-shape layout: ISSUANCE(top-left) → CIRCULATION(top-right) → DEMURRAGE(bottom-right) → COMMONS(bottom-left)
// Animated flow particles trace the lifecycle path in color-coded streams
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'issuance',    label: 'Issuance',     definition: 'Flow is issued by protocol-authorized bodies against verified productive commitment. Not printed arbitrarily — issuance requires a corresponding contribution record.', docLink: 'ANNEX_AB.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'circulation', label: 'Circulation',  definition: 'Flow moves through wages, contracts, commerce, and savings. Subject to demurrage on idle balances above the personal exemption floor.', docLink: 'ANNEX_AB.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'demurrage',   label: 'Demurrage',    definition: 'Idle balances above the exemption floor decay at the constitutional rate (λ = 2%/yr). Decay proceeds fund the public commons rail — not extracted as profit.', docLink: 'ANNEX_AR.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'commons',     label: 'Commons Rail', definition: 'Demurrage proceeds enter the public commons rail — funding Essential Access delivery, oracle infrastructure, and Federated Ombuds operations.', docLink: 'ANNEX_X.md',  accent: THEME.ea.accent,    accentBg: THEME.ea.accentBg },
]

// Box geometry (cx, cy, w, h)
const BOXES = {
  issuance:    { x: 30,  y: 35,  w: 145, h: 60 },
  circulation: { x: 430, y: 35,  w: 165, h: 60 },
  demurrage:   { x: 430, y: 160, w: 165, h: 60 },
  commons:     { x: 30,  y: 160, w: 145, h: 60 },
}

// Particle path segments (from box edge to box edge)
// p1: ISSUANCE right → CIRCULATION left  (top, blue)
// p2: CIRCULATION bottom → DEMURRAGE top  (right, gold)
// p3: DEMURRAGE left → COMMONS right      (bottom, green)
const P1 = `M175,65 L430,65`
const P2 = `M512,95 L512,160`
const P3 = `M430,190 L175,190`

export function V002_FlowTokenLifecycle({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const box = (id: keyof typeof BOXES, label: string, sub: string, stroke: string, fill: string) => {
    const b = BOXES[id]
    const cx = b.x + b.w / 2
    const isActive = activeNodeId === id
    return (
      <g
        key={id}
        style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 7px ${stroke})` : undefined }}
        onClick={() => handleNodeClick(id)}
        opacity={0}
      >
        <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.05}s`} fill="freeze" />
        {isActive && (
          <rect x={b.x - 2} y={b.y - 2} width={b.w + 4} height={b.h + 4} rx={7}
            fill="none" stroke={stroke} strokeWidth={1.5} opacity={0.5}>
            <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
          </rect>
        )}
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={6}
          fill={fill} stroke={stroke}
          strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
        <text x={cx} y={b.y + 26} textAnchor="middle" fontSize={11} fontWeight={700} fill={stroke} fontFamily="monospace">{label}</text>
        <text x={cx} y={b.y + 44} textAnchor="middle" fontSize={9} fill={THEME.subtext} fontFamily="monospace">{sub}</text>
      </g>
    )
  }

  return (
    <DiagramShell figId="V-002" title="Flow Token Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 660 250" className="w-full" style={{ height: 250 }}>
        <defs>
          <marker id="arrV2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
          <path id="v2p1" d={P1} />
          <path id="v2p2" d={P2} />
          <path id="v2p3" d={P3} />
        </defs>

        {/* Connector paths */}
        <path d={P1} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrV2)" />
        <path d={P2} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrV2)" />
        <path d={P3} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrV2)" />

        {/* Edge labels */}
        <text x={302} y={55} textAnchor="middle" fontSize={8.5} fill={THEME.dim} fontFamily="monospace">Flow tokens enter economy</text>
        <text x={538} y={132} textAnchor="middle" fontSize={8.5} fill={THEME.dim} fontFamily="monospace" transform="rotate(90,538,132)">idle decay</text>
        <text x={302} y={208} textAnchor="middle" fontSize={8.5} fill={THEME.dim} fontFamily="monospace">proceeds to commons</text>

        {/* Animated particles — blue on P1, gold on P2, green on P3 */}
        {[0, 0.7].map(d => (
          <circle key={d} r={3.5} fill={THEME.flow.accent} opacity={0.85}>
            <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${d}s`}><mpath href="#v2p1" /></animateMotion>
          </circle>
        ))}
        <circle r={3} fill={THEME.voice.accent} opacity={0.85}>
          <animateMotion dur="1.4s" repeatCount="indefinite" begin="0.4s"><mpath href="#v2p2" /></animateMotion>
        </circle>
        {[0, 0.9].map(d => (
          <circle key={d} r={3.5} fill={THEME.ea.accent} opacity={0.85}>
            <animateMotion dur="2s" repeatCount="indefinite" begin={`${d}s`}><mpath href="#v2p3" /></animateMotion>
          </circle>
        ))}

        {/* Boxes */}
        {box('issuance',    'ISSUANCE',    'protocol-authorized', THEME.flow.accent,  THEME.flow.fill)}
        {box('circulation', 'CIRCULATION', 'wages · contracts',   THEME.flow.accent,  '#0d1a2e')}
        {box('demurrage',   'DEMURRAGE',   'λ = 2%/yr · idle',   THEME.voice.accent, THEME.voice.fill)}
        {box('commons',     'COMMONS RAIL','EA · oracle · ombuds', THEME.ea.accent,   THEME.ea.fill)}

        {/* Footer note */}
        <text x={330} y={240} textAnchor="middle" fontSize={8.5} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.04em">
          exemption floor shields household savings from demurrage
        </text>
      </svg>
    </DiagramShell>
  )
}
