// app/src/components/diagrams/V009_ThreatPatchChain.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  { id: 'threat', label: 'Threat',  definition: 'Adversarial failure mode — the way the system can be captured, gamed, stalled, or made to harm people. Documented in the Threat Register with collapse-state classification.', docLink: 'Threat_Register.md', accent: '#f85149', accentBg: 'rgba(248,81,73,0.07)' },
  { id: 'patch',  label: 'Patch',   definition: 'Constitutional design response to a threat. Documented in the Patch Log with threat linkage, status (ACTIVE/PROPOSED), and evidence requirements.', docLink: 'Patch_Log.md', accent: '#d29922', accentBg: 'rgba(210,153,34,0.07)' },
  { id: 'annex',  label: 'Annex',   definition: 'Operative constitutional text implementing the patch. Contains specific thresholds, procedures, review duties, and invariant protections. The law-like layer.', docLink: 'ANNEX_AH.md#AH8', accent: '#58a6ff', accentBg: 'rgba(88,166,255,0.07)' },
]

export function V009_ThreatPatchChain({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  const cols = [
    { id: 'threat', label: 'THREAT', sub: 'failure mode identified',    stroke: '#f85149', fill: '#1a0d0d', x: 60,  count: '28 documented' },
    { id: 'patch',  label: 'PATCH',  sub: 'design response created',    stroke: '#d29922', fill: '#1f1a0d', x: 260, count: '62 patches' },
    { id: 'annex',  label: 'ANNEX',  sub: 'constitutional text locked', stroke: '#58a6ff', fill: '#0d1a2e', x: 460, count: 'operative text' },
  ]

  return (
    <DiagramShell figId="V-009" title="Threat–Patch–Annex Provenance Chain" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 660 170" className="w-full" style={{ height: 170 }}>
        {cols.map((c, i) => {
          const isActive = activeNodeId === c.id
          return (
            <g key={c.id}>
              {i > 0 && <path d={`M${c.x - 40},85 L${c.x + 4},85`} fill="none" stroke="#30363d" strokeWidth={1.5} markerEnd="url(#arrP)" />}
              <rect x={c.x} y={40} width={160} height={90} rx={8}
                fill={c.fill} stroke={c.stroke} strokeWidth={isActive ? 2.5 : 2}
                style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${c.stroke})` : undefined }}
                onClick={() => handleNodeClick(c.id)} />
              <text x={c.x + 80} y={82} textAnchor="middle" fontSize={13} fontWeight={700} fill={c.stroke} fontFamily="monospace">{c.label}</text>
              <text x={c.x + 80} y={100} textAnchor="middle" fontSize={9} fill="#b6c2cf" fontFamily="monospace">{c.sub}</text>
              <text x={c.x + 80} y={28} textAnchor="middle" fontSize={9} fill="#8b949e" fontFamily="monospace" letterSpacing="0.05em">{c.count}</text>
            </g>
          )
        })}
        <defs>
          <marker id="arrP" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#30363d" />
          </marker>
        </defs>
        <text x={330} y={155} textAnchor="middle" fontSize={9} fill="#8b949e" fontFamily="monospace">every clause exists because a threat made it necessary · see Provenance_Map.md</text>
      </svg>
    </DiagramShell>
  )
}
