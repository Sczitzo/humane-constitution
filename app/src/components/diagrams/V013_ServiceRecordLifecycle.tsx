// app/src/components/diagrams/V013_ServiceRecordLifecycle.tsx
// Linear flow + DECAY/PAUSE branches downward from RECORD stage
// Key: hardship PAUSE shown as a dashed horizontal line interrupting (not resetting) the decay curve
// Shows that pause suspends without erasing — protects people in crisis
import { DiagramShell, useDiagramState } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  { id: 'contribution', label: 'Contribution',      definition: 'Stewardship actions recorded: civic committee work, community caretaking, peer attestation, verified service. Attestors stake reputation on accuracy.', docLink: 'ANNEX_AS.md', accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'verify',       label: 'Verification',      definition: 'Contribution verified by attestor network. Attestors risk stake on false claims — slash-and-redistribute on confirmed abuse.', docLink: 'ANNEX_AS.md', accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'record',       label: 'Record',            definition: 'Verified contribution added to Service Record. Used for rotating civic role eligibility. Not a score of human worth — no external use permitted.', docLink: 'ANNEX_Z.md',  accent: THEME.sr.accent,    accentBg: THEME.sr.accentBg },
  { id: 'eligibility',  label: 'Civic Eligibility', definition: 'Service Record history determines eligibility for rotating governance roles. Minimum threshold set by keyholder council, not by founding team.', docLink: 'ANNEX_Z.md',  accent: THEME.flow.accent,  accentBg: THEME.flow.accentBg },
  { id: 'decay',        label: 'Decay / Pause',     definition: 'Record decays slowly without new contribution (λ ≈ 5%/yr). Hardship pause suspends decay without resetting — protects people during illness, caretaking, or crisis. Paused time does not count against the holder.', docLink: 'ANNEX_AF.md', accent: THEME.voice.accent, accentBg: THEME.voice.accentBg },
]

const STAGES = [
  { id: 'contribution', label: 'CONTRIBUTE',  sub: 'verified action',  stroke: THEME.sr.accent,    fill: THEME.sr.fill },
  { id: 'verify',       label: 'VERIFY',      sub: 'attestor network', stroke: THEME.sr.accent,    fill: THEME.sr.fill },
  { id: 'record',       label: 'RECORD',      sub: 'civic history',    stroke: THEME.sr.accent,    fill: THEME.sr.fill },
  { id: 'eligibility',  label: 'ELIGIBLE',    sub: 'rotating roles',   stroke: THEME.flow.accent,  fill: '#0d1a2e' },
]

const boxW = 130, boxH = 68, gap = 16, startX = 8, cy = 22

// Decay branch geometry — hangs below RECORD (index 2)
const recordCx = startX + 2 * (boxW + gap) + boxW / 2
const decayBoxW = 140, decayBoxH = 68
const decayX = recordCx - decayBoxW / 2
const decayY = cy + boxH + 50

// Mini decay curve inside the decay box (SR decays at ~5%/yr)
function miniDecay(ox: number, oy: number, w: number, h: number): string {
  const pts: string[] = []
  const LAMBDA = 0.05
  for (let x = 0; x <= w; x += 3) {
    const t = (x / w) * 10 // 10-year range
    const y = h * Math.exp(-LAMBDA * t)
    pts.push(`${ox + x},${oy - y}`)
  }
  return 'M' + pts.join(' L')
}

export function V013_ServiceRecordLifecycle({ onInternalLink }: DiagramProps) {
  const { activeNodeId, handleNodeClick } = useDiagramState()

  return (
    <DiagramShell figId="V-013" title="Service Record — Civic Eligibility Lifecycle" nodes={NODES} activeNodeId={activeNodeId} onInternalLink={onInternalLink}>
      <svg viewBox="0 0 720 200" className="w-full" style={{ height: 200 }}>
        <defs>
          <marker id="arrV13" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.border} />
          </marker>
          <marker id="arrV13decay" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={THEME.voice.accent} />
          </marker>
        </defs>

        {/* Linear stages */}
        {STAGES.map((s, i) => {
          const x = startX + i * (boxW + gap)
          const isActive = activeNodeId === s.id
          return (
            <g key={s.id} opacity={0} style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0 0 6px ${s.stroke})` : undefined }} onClick={() => handleNodeClick(s.id)}>
              <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.06 + i * 0.1}s`} fill="freeze" />
              {i > 0 && (
                <path d={`M${x - gap + 3},${cy + boxH / 2} L${x - 3},${cy + boxH / 2}`}
                  fill="none" stroke={THEME.border} strokeWidth={1.5} markerEnd="url(#arrV13)" />
              )}
              {isActive && (
                <rect x={x - 1} y={cy - 1} width={boxW + 2} height={boxH + 2} rx={7}
                  fill="none" stroke={s.stroke} strokeWidth={1.5} opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={x} y={cy} width={boxW} height={boxH} rx={6}
                fill={s.fill} stroke={s.stroke}
                strokeWidth={isActive ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
              />
              <text x={x + boxW / 2} y={cy + 26} textAnchor="middle" fontSize={10} fontWeight={700} fill={s.stroke} fontFamily="monospace">{s.label}</text>
              <text x={x + boxW / 2} y={cy + 46} textAnchor="middle" fontSize={8.5} fill={THEME.subtext} fontFamily="monospace">{s.sub}</text>
            </g>
          )
        })}

        {/* Decay branch — drops from RECORD box */}
        <path d={`M${recordCx},${cy + boxH} L${recordCx},${decayY}`}
          fill="none" stroke={THEME.voice.accent} strokeWidth={1.5}
          strokeDasharray="5,3" markerEnd="url(#arrV13decay)"
          opacity={0}>
          <animate attributeName="opacity" from={0} to={0.75} dur="0.4s" begin="0.55s" fill="freeze" />
        </path>

        {/* Decay / Pause box */}
        <g opacity={0} style={{ cursor: 'pointer', filter: activeNodeId === 'decay' ? `drop-shadow(0 0 6px ${THEME.voice.accent})` : undefined }} onClick={() => handleNodeClick('decay')}>
          <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin="0.6s" fill="freeze" />
          {activeNodeId === 'decay' && (
            <rect x={decayX - 2} y={decayY - 2} width={decayBoxW + 4} height={decayBoxH + 4} rx={7}
              fill="none" stroke={THEME.voice.accent} strokeWidth={1.5} opacity={0.5}>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
            </rect>
          )}
          <rect x={decayX} y={decayY} width={decayBoxW} height={decayBoxH} rx={6}
            fill={THEME.voice.fill} stroke={THEME.voice.accent}
            strokeWidth={activeNodeId === 'decay' ? THEME.strokeWidth.active : THEME.strokeWidth.normal}
          />

          {/* Mini decay curve inside box */}
          <path d={miniDecay(decayX + 8, decayY + decayBoxH - 10, decayBoxW - 16, 30)}
            fill="none" stroke={THEME.voice.accent} strokeWidth={1} opacity={0.6}>
            <animate attributeName="stroke-dasharray" from="200 200" to="0 0" dur="1s" begin="0.8s" fill="freeze" />
          </path>

          {/* Pause dashed line across the mini curve */}
          <line x1={decayX + 50} y1={decayY + decayBoxH - 28} x2={decayX + 80} y2={decayY + decayBoxH - 28}
            stroke={THEME.ea.accent} strokeWidth={1.5} strokeDasharray="4,2" opacity={0.8} />
          <text x={decayX + 65} y={decayY + decayBoxH - 32} textAnchor="middle" fontSize={7} fill={THEME.ea.accent} fontFamily="monospace">PAUSE</text>

          <text x={decayX + decayBoxW / 2} y={decayY + 22} textAnchor="middle" fontSize={10} fontWeight={700} fill={THEME.voice.accent} fontFamily="monospace">DECAY/PAUSE</text>
          <text x={decayX + decayBoxW / 2} y={decayY + 38} textAnchor="middle" fontSize={8} fill={THEME.subtext} fontFamily="monospace">slow · suspendable</text>
        </g>

        {/* Branch label */}
        <text x={recordCx + 6} y={cy + boxH + 28} fontSize={8} fill={THEME.dim} fontFamily="monospace" opacity={0}>
          <animate attributeName="opacity" from={0} to={0.7} dur="0.4s" begin="0.65s" fill="freeze" />
          no new contribution
        </text>
      </svg>
    </DiagramShell>
  )
}
