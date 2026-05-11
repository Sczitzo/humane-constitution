// app/src/components/diagrams/V009_ThreatPatchChain.tsx
import { useState } from 'react'
import { DiagramShell } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'
import { InfoCard, type InfoCardData } from './InfoCard'

const NODES: DiagramNode[] = [
  { id: 'threat', label: 'Threat',  definition: 'Adversarial failure mode — the way the system can be captured, gamed, stalled, or made to harm people. Documented in the Threat Register with collapse-state classification.', docLink: 'Threat_Register.md', accent: THEME.ss.accent,    accentBg: THEME.ss.accentBg },
  { id: 'patch',  label: 'Patch',   definition: 'Constitutional design response to a threat. Documented in the Patch Log with threat linkage, status (ACTIVE/PROPOSED), and evidence requirements.', docLink: 'Patch_Log.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
  { id: 'annex',  label: 'Annex',   definition: 'Operative constitutional text implementing the patch. Contains specific thresholds, procedures, review duties, and invariant protections. The law-like layer.', docLink: 'ANNEX_AH.md#AH8', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
]

export function V009_ThreatPatchChain({ onInternalLink }: DiagramProps) {
  const [infoCard, setInfoCard] = useState<InfoCardData | null>(null)

  function handleNodeClick(id: string, e: React.MouseEvent) {
    const node = NODES.find(n => n.id === id)!
    if (infoCard?.title === node.label) {
      setInfoCard(null)
    } else {
      setInfoCard({ title: node.label, description: node.definition, accentColor: node.accent, position: { x: e.clientX, y: e.clientY } })
    }
  }

  const activeNodeId = infoCard ? NODES.find(n => n.label === infoCard.title)?.id ?? null : null

  const cols = [
    { id: 'threat', label: 'THREAT', sub: 'failure mode identified',    stroke: THEME.ss.accent,    fill: THEME.ss.fill,    x: 60,  count: '28 documented' },
    { id: 'patch',  label: 'PATCH',  sub: 'design response created',    stroke: THEME.voice.accent, fill: THEME.voice.fill, x: 260, count: '62 patches' },
    { id: 'annex',  label: 'ANNEX',  sub: 'constitutional text locked', stroke: THEME.flow.accent,  fill: '#0d1a2e',         x: 460, count: 'operative text' },
  ]

  return (
    <DiagramShell figId="V-009" title="Threat–Patch–Annex Provenance Chain" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 660 170" className="w-full" style={{ height: 170 }}>
        <defs>
          <marker id="arrP" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
        </defs>
        {cols.map((c, i) => {
          const isActive = activeNodeId === c.id
          return (
            <g key={c.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${c.stroke})` : undefined }} onClick={e => handleNodeClick(c.id, e)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.1 + i * 0.1}s`} fill="freeze" />
              {isActive && (
                <rect x={c.x - 2} y={38} width={164} height={94} rx={7} fill="none" stroke={c.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              {i > 0 && <path d={`M${c.x - 40},85 L${c.x + 4},85`} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrP)" />}
              <rect x={c.x} y={40} width={160} height={90} rx={8}
                fill={c.fill} stroke={c.stroke} strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
              <text x={c.x + 80} y={82} textAnchor="middle" fontSize={13} fontWeight={700} fill={c.stroke} fontFamily="monospace">{c.label}</text>
              <text x={c.x + 80} y={100} textAnchor="middle" fontSize={9} fill={THEME.subtext} fontFamily="monospace">{c.sub}</text>
              <text x={c.x + 80} y={28} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace" letterSpacing="0.05em">{c.count}</text>
            </g>
          )
        })}
        <text x={330} y={155} textAnchor="middle" fontSize={9} fill={THEME.dim} fontFamily="monospace">every clause exists because a threat made it necessary · see Provenance_Map.md</text>
      </svg>

      <InfoCard card={infoCard} />
    </DiagramShell>
  )
}
