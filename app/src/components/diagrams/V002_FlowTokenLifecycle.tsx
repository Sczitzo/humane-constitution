// app/src/components/diagrams/V002_FlowTokenLifecycle.tsx
import { useState } from 'react'
import { DiagramShell } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'
import { InfoCard, type InfoCardData } from './InfoCard'

const NODES: DiagramNode[] = [
  { id: 'issuance', label: 'Issuance', definition: 'Flow is issued by protocol-authorized bodies against verified productive commitment. Not printed arbitrarily — issuance requires a corresponding contribution record.', docLink: 'ANNEX_AB.md', accent: THEME.flow.accent, accentBg: THEME.flow.accentBg },
  { id: 'circulation', label: 'Circulation', definition: 'Flow moves through wages, contracts, commerce, and savings. Subject to demurrage on idle balances above the personal exemption floor.', docLink: 'ANNEX_AB.md', accent: THEME.flow.accent, accentBg: THEME.flow.accentBg },
  { id: 'demurrage', label: 'Demurrage', definition: 'Idle balances above the exemption floor decay at the constitutional rate. Decay proceeds fund the public commons rail, not private profit.', docLink: 'ANNEX_AR.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'commons', label: 'Commons Rail', definition: 'Demurrage proceeds enter the public commons rail — funding Essential Access delivery, oracle infrastructure, and Federated Ombuds operations.', docLink: 'ANNEX_X.md', accent: THEME.ea.accent, accentBg: THEME.ea.accentBg },
]

const STAGES = [
  { id: 'issuance',    label: 'ISSUANCE',    sub: 'protocol-authorized', stroke: THEME.flow.accent,  fill: THEME.flow.fill },
  { id: 'circulation', label: 'CIRCULATION', sub: 'wages · contracts',    stroke: THEME.flow.accent,  fill: '#0d1a2e' },
  { id: 'demurrage',   label: 'DEMURRAGE',   sub: 'idle decay applied',   stroke: THEME.voice.accent, fill: THEME.voice.fill },
  { id: 'commons',     label: 'COMMONS',     sub: 'public rail funded',   stroke: THEME.ea.accent,    fill: THEME.ea.fill },
]

export function V002_FlowTokenLifecycle({ onInternalLink }: DiagramProps) {
  const [infoCard, setInfoCard] = useState<InfoCardData | null>(null)
  const boxW = 148, boxH = 70, gap = 24, startX = 20, cy = 60

  function handleNodeClick(id: string, e: React.MouseEvent) {
    const node = NODES.find(n => n.id === id)!
    if (infoCard?.title === node.label) {
      setInfoCard(null)
    } else {
      setInfoCard({ title: node.label, description: node.definition, accentColor: node.accent, position: { x: e.clientX, y: e.clientY } })
    }
  }

  const activeNodeId = infoCard ? NODES.find(n => n.label === infoCard.title)?.id ?? null : null

  return (
    <DiagramShell figId="V-002" title="Flow Token Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 140" className="w-full" style={{ height: 140 }}>
        {STAGES.map((s, i) => {
          const x = startX + i * (boxW + gap)
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={e => handleNodeClick(s.id, e)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.08 + i * 0.1}s`} fill="freeze" />
              {i > 0 && <path d={`M${x - gap + 4},${cy + boxH / 2} L${x - 4},${cy + boxH / 2}`} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arr1)" />}
              {isActive && (
                <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill="none" stroke={s.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill={s.fill} stroke={s.stroke} strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
              <text x={x + boxW / 2} y={cy + 28} textAnchor="middle" fontSize={11} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 48} textAnchor="middle" fontSize={10} fill={THEME.subtext} fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}
        <defs>
          <marker id="arr1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
        </defs>
      </svg>

      <InfoCard card={infoCard} />
    </DiagramShell>
  )
}
