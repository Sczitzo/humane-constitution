// app/src/components/diagrams/V013_ServiceRecordLifecycle.tsx
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'contribution', label: 'Contribution',      definition: 'Stewardship actions recorded: civic committee work, community caretaking, peer attestation, verified service. Attestors stake reputation on accuracy.', docLink: 'ANNEX_AS.md', accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'verify',       label: 'Verification',      definition: 'Contribution verified by attestor network. Attestors risk stake on false claims — slash-and-redistribute on confirmed abuse.', docLink: 'ANNEX_AS.md', accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'record',       label: 'Record',            definition: 'Verified contribution added to Service Record. Used for rotating civic role eligibility. Not a score of human worth — no external use permitted.', docLink: 'ANNEX_Z.md', accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'eligibility',  label: 'Civic Eligibility', definition: 'Service Record history determines eligibility for rotating governance roles. Minimum threshold set by keyholder council, not by founding team.', docLink: 'ANNEX_Z.md', accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'decay',        label: 'Decay / Pause',     definition: 'Record decays slowly without new contribution. Hardship pause suspends decay without resetting — protects people during illness, caretaking, or crisis.', docLink: 'ANNEX_AF.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
]

const STAGES = [
  { id: 'contribution', label: 'CONTRIBUTE',  sub: 'verified action',   stroke: THEME.sr.accent,    fill: THEME.sr.fill },
  { id: 'verify',       label: 'VERIFY',      sub: 'attestor network',  stroke: THEME.sr.accent,    fill: THEME.sr.fill },
  { id: 'record',       label: 'RECORD',      sub: 'civic history',     stroke: THEME.sr.accent,    fill: THEME.sr.fill },
  { id: 'eligibility',  label: 'ELIGIBLE',    sub: 'rotating roles',    stroke: THEME.flow.accent,  fill: '#0d1a2e' },
  { id: 'decay',        label: 'DECAY/PAUSE', sub: 'slow or suspended', stroke: THEME.voice.accent, fill: THEME.voice.fill },
]

export function V013_ServiceRecordLifecycle({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()
  const boxW = 120, boxH = 70, gap = 16, startX = 10, cy = 50

  return (
    <DiagramShell figId="V-013" title="Service Record — Civic Eligibility Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 140" className="w-full" style={{ height: 140 }}>
        {STAGES.map((s, i) => {
          const x = startX + i * (boxW + gap)
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              {i > 0 && <path d={`M${x - gap + 3},${cy + boxH / 2} L${x - 3},${cy + boxH / 2}`} fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arr4)" />}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6} fill={s.fill} stroke={s.stroke} strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal} />
              <text x={x + boxW / 2} y={cy + 27} textAnchor="middle" fontSize={10} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 46} textAnchor="middle" fontSize={9} fill={THEME.subtext} fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}
        <defs>
          <marker id="arr4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
        </defs>
      </svg>
    </DiagramShell>
  )
}
