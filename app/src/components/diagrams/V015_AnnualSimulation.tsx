// app/src/components/diagrams/V015_AnnualSimulation.tsx
import { useState } from 'react'
import { DiagramShell } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'
import { THEME } from './DiagramTheme'

const NODES: DiagramNode[] = [
  {
    id: 'ea_track',
    label: 'Essential Access & Markets Track',
    definition: 'Monitors the delivery success rate Rd (target >= 95%), food/water allocations, price spikes, and vendor compliance surcharges.',
    docLink: 'ANNEX_AY.md',
    accent: THEME.ea.accent,
    accentBg: THEME.ea.accentBg,
  },
  {
    id: 'oracle_track',
    label: 'Oracle & Triangulation Track',
    definition: 'Monitors quorum consensus (N >= 5), methodology diversity (Institutional, CBPR, Physical), and transitions to CONSERVATIVE_HOLD.',
    docLink: 'ANNEX_Y.md',
    accent: THEME.flow.accent,
    accentBg: THEME.flow.accentBg,
  },
  {
    id: 'gov_track',
    label: 'Civic Governance Track',
    definition: 'Monitors Civic Review Panel (CRP) sessions, Voice point decay, Service Record checks, and elite concentration correction.',
    docLink: 'ANNEX_Z.md',
    accent: THEME.voice.accent,
    accentBg: THEME.voice.accentBg,
  },
  {
    id: 'patch_track',
    label: 'Patch Integrity Track',
    definition: 'Monitors the state machine of proposed patches as they gather evidence and transition to ACTIVE status.',
    docLink: 'docs/governance/Patch_Log.md',
    accent: THEME.sr.accent,
    accentBg: THEME.sr.accentBg,
  },
]

interface SimulationMonth {
  month: number
  quarter: string
  title: string
  redemption: string
  status: string
  oracle: string
  issues: string
  response: string
  patch: string
  notes: string
  variables: {
    W: string
    demurrage: string
    Rd: string
    oracleState: string
    activeNodes: number
  }
  tracks: {
    access: 'normal' | 'alert' | 'shortfall'
    oracle: 'normal' | 'dispute' | 'hold' | 'verify'
    gov: 'idle' | 'panel' | 'alert'
    patch: 'idle' | 'review' | 'vote'
  }
}

const MONTHS: SimulationMonth[] = [
  {
    month: 1,
    quarter: 'Quarter 1: Baseline',
    title: 'Month 1 — Initial Deliveries & Friction',
    redemption: '97.0%',
    status: 'Baseline Operations',
    oracle: 'Normal Consensus',
    issues: '~3% transit gate failures; two vendor surcharge attempts (T-001).',
    response: 'Article I enforcement issues compliance warnings; partitioned wallet protection prevents user lockout.',
    patch: 'P-001 (Shadow Convertibility) surveillance logs surcharge instances.',
    notes: 'Sterling hoards $10M cash: progressive demurrage decay clock triggers at -$8,073/day.',
    variables: { W: '$10.00M', demurrage: '-$8,073/d', Rd: '97.0%', oracleState: 'NORMAL', activeNodes: 5 },
    tracks: { access: 'normal', oracle: 'normal', gov: 'idle', patch: 'idle' }
  },
  {
    month: 2,
    quarter: 'Quarter 1: Baseline',
    title: 'Month 2 — Civic Deliberation & Oracle Uncertainty',
    redemption: '98.2%',
    status: 'CRP Session 1 & RCS Report',
    oracle: 'Uncertainty Flagged',
    issues: 'Over-representation from one demographic cluster; wide confidence bands in housing/healthcare oracle data.',
    response: 'Governance panel weights auto-adjusted; secondary measurement source commissioned.',
    patch: 'P-002 (Incentive Reward) enters evidence-gathering phase.',
    notes: 'Demurrage receipts flow to Commons. Basic exemptions (S = $50,000) shield bottom-quintile assets.',
    variables: { W: '$9.76M', demurrage: '-$7,842/d', Rd: '98.2%', oracleState: 'UNCERTAIN', activeNodes: 5 },
    tracks: { access: 'normal', oracle: 'normal', gov: 'panel', patch: 'idle' }
  },
  {
    month: 3,
    quarter: 'Quarter 1: Baseline',
    title: 'Month 3 — Regional Drought Alert',
    redemption: '98.5%',
    status: 'Drought Warning',
    oracle: 'Alert (2/3 nodes)',
    issues: 'Two independent nodes signal drought parameters; transit frequency expansion proposed in CRP.',
    response: 'Preparedness protocols checked; Flow budget approval initiated for transit project.',
    patch: 'Formal Acceptance Committee reviews proposed patch log.',
    notes: 'Civic voice decay active: Voice points decay by 50% quarterly (Annex Z §Z2).',
    variables: { W: '$9.52M', demurrage: '-$7,605/d', Rd: '98.5%', oracleState: 'ALERT', activeNodes: 5 },
    tracks: { access: 'alert', oracle: 'normal', gov: 'idle', patch: 'review' }
  },
  {
    month: 4,
    quarter: 'Quarter 2: Stress Event',
    title: 'Month 4 — Shared Storehouse Activated',
    redemption: '94.2%',
    status: 'Shared Storehouse Rationing',
    oracle: 'Supermajority Quorum',
    issues: 'Third node confirms drought. Substitution components active. Supply shortfall drops Rd below 95%.',
    response: 'Food substitutions active for 45,000 enrollees; emergency vendor expansion initiated to cover gaps.',
    patch: 'P-003 (Termination Procedure) active monitoring.',
    notes: 'Jubilee Restoration transfers deeds to low-wealth citizens. Aisha rent drops to 0.',
    variables: { W: '$9.28M', demurrage: '-$7,370/d', Rd: '94.2%', oracleState: 'STOREHOUSE', activeNodes: 5 },
    tracks: { access: 'shortfall', oracle: 'normal', gov: 'idle', patch: 'idle' }
  },
  {
    month: 5,
    quarter: 'Quarter 2: Stress Event',
    title: 'Month 5 — Oracle Consensus Dispute',
    redemption: '95.0%',
    status: 'Dispute Default active',
    oracle: 'Dispute (14 days)',
    issues: 'Node A and Node B drift. Quorum class diversity drops below 3 -> triggers CONSERVATIVE_HOLD.',
    response: 'CSM floor (2,100 kcal, 50L water) is unconditionally issued (Annex Y §Y2). Dispute resolved on day 14.',
    patch: 'Oracle dispute resolution protocol active. Evidence logged.',
    notes: 'Flow pricing spikes for drought-affected crops. Demurrage continues to decay speculative hoards.',
    variables: { W: '$9.04M', demurrage: '-$7,130/d', Rd: '95.0%', oracleState: 'DISPUTE', activeNodes: 3 },
    tracks: { access: 'shortfall', oracle: 'hold', gov: 'idle', patch: 'idle' }
  },
  {
    month: 6,
    quarter: 'Quarter 2: Stress Event',
    title: 'Month 6 — Deactivation & Correction',
    redemption: '96.2%',
    status: 'Storehouse Deactivated',
    oracle: 'Consensus Restored',
    issues: 'Drought eases. Shared Storehouse deactivated on day 74. Post-mortem reviews vendor gaps.',
    response: 'Public post-mortem published within 7 days; transit frequency expansion budget implemented.',
    patch: 'T-003 (Scope Creep) checked; P-003 termination completed.',
    notes: 'CRP Panel completes session 2. Audit verifies modular architecture isolated drought stress.',
    variables: { W: '$8.80M', demurrage: '-$6,895/d', Rd: '96.2%', oracleState: 'NORMAL', activeNodes: 5 },
    tracks: { access: 'normal', oracle: 'normal', gov: 'panel', patch: 'idle' }
  },
  {
    month: 7,
    quarter: 'Quarter 3: Governance Cycle',
    title: 'Month 7 — Identity Continuity Gaps',
    redemption: '96.5%',
    status: 'Normal Operations',
    oracle: 'Normal Consensus',
    issues: '127 enrollees require continuity review (relocations). Cross-jurisdictional gap exposed.',
    response: 'Temporary grace provisions applied; cross-border relocation exception logged for patch review.',
    patch: 'P-005 (Governance Throughput) advanced to ACTIVE pending final cycle.',
    notes: 'Aisha proposal for clinic staffing advances. Her Voice balance decays quarterly.',
    variables: { W: '$8.56M', demurrage: '-$6,660/d', Rd: '96.5%', oracleState: 'NORMAL', activeNodes: 5 },
    tracks: { access: 'normal', oracle: 'normal', gov: 'idle', patch: 'review' }
  },
  {
    month: 8,
    quarter: 'Quarter 3: Governance Cycle',
    title: 'Month 8 — Elite Formation Alert',
    redemption: '96.8%',
    status: 'Anti-Capture Triggered',
    oracle: 'Normal Consensus',
    issues: 'T-008 alarm: Three consecutive CRP panels draw from overlapping networks.',
    response: 'Diversity filters trigger automatic weight adjustments; panel recomposed for next session.',
    patch: 'T-008 (Bureaucratic Elite) validation checks pass.',
    notes: '8-month cumulative redemption rate is 96.8% (above 95% target). Surcharges remain quarantined.',
    variables: { W: '$8.32M', demurrage: '-$6,423/d', Rd: '96.8%', oracleState: 'NORMAL', activeNodes: 5 },
    tracks: { access: 'normal', oracle: 'normal', gov: 'alert', patch: 'idle' }
  },
  {
    month: 9,
    quarter: 'Quarter 3: Governance Cycle',
    title: 'Month 9 — Annual Calibration',
    redemption: '97.2%',
    status: 'Annual Calibration',
    oracle: 'Narrow Confidence Bands',
    issues: 'Proposed mental health services addition contested in CRP on measurement grounds.',
    response: 'Contested expansion referred to structured pilot study to verify delivery verifiability.',
    patch: 'Evidence synthesis for P-002, P-008, P-011 initiated.',
    notes: 'Annual RCS calibration narrows oracle confidence bounds due to 9 months of active telemetry.',
    variables: { W: '$8.08M', demurrage: '-$6,190/d', Rd: '97.2%', oracleState: 'NORMAL', activeNodes: 5 },
    tracks: { access: 'normal', oracle: 'normal', gov: 'panel', patch: 'review' }
  },
  {
    month: 10,
    quarter: 'Quarter 4: Year-End',
    title: 'Month 10 — Concurrent Event Stress',
    redemption: '95.8%',
    status: 'Flu Outbreak Demand',
    oracle: 'Normal Consensus',
    issues: 'Flu outbreak increases healthcare demand by 15%; vendor dispute; patch acceptance vote scheduled.',
    response: 'Demand absorbed by healthcare reserves; vendor dispute referred to enforcement panel.',
    patch: 'Patch acceptance vote proceeds on schedule without emergency delay.',
    notes: 'Modular design prevents cross-instrument contamination: health surge does not affect other sectors.',
    variables: { W: '$7.84M', demurrage: '-$5,960/d', Rd: '95.8%', oracleState: 'NORMAL', activeNodes: 5 },
    tracks: { access: 'alert', oracle: 'normal', gov: 'idle', patch: 'idle' }
  },
  {
    month: 11,
    quarter: 'Quarter 4: Year-End',
    title: 'Month 11 — First Patch Activation',
    redemption: '96.4%',
    status: 'Patch Vote Completed',
    oracle: 'Normal Consensus',
    issues: 'Model scenario test: severe flu coinciding with drought exposure highlights operational bottlenecks.',
    response: 'P-005 (Governance Throughput) voted ACTIVE. Staff capacity identified as the primary limit.',
    patch: 'P-005 transitions from PROPOSED to ACTIVE.',
    notes: 'Drills recommended before scale-up to test human administrative throughput.',
    variables: { W: '$7.60M', demurrage: '-$5,730/d', Rd: '96.4%', oracleState: 'NORMAL', activeNodes: 5 },
    tracks: { access: 'normal', oracle: 'normal', gov: 'idle', patch: 'vote' }
  },
  {
    month: 12,
    quarter: 'Quarter 4: Year-End',
    title: 'Month 12 — Year-End Review',
    redemption: '96.8%',
    status: 'Year-End Verification',
    oracle: 'Calibration Complete',
    issues: 'Annual metrics synthesis. 7 vendor actions, 1 oracle dispute, 1 patch active.',
    response: 'Year-end report published; P-002, P-008, P-011 advanced to vote-readiness review.',
    patch: 'One patch ACTIVE, 13 remaining PROPOSED.',
    notes: 'Overall annual redemption rate: 96.8% (Exceeds 95% threshold). Invariant INV-001 satisfied.',
    variables: { W: '$7.36M', demurrage: '-$5,502/d', Rd: '96.8%', oracleState: 'NORMAL', activeNodes: 5 },
    tracks: { access: 'normal', oracle: 'normal', gov: 'idle', patch: 'idle' }
  }
]

export function V015_AnnualSimulation({ onInternalLink }: DiagramProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(1)
  const [activeTrack, setActiveTrack] = useState<string | null>(null)
  
  const currentMonthData = MONTHS.find(m => m.month === selectedMonth) || MONTHS[0]
  
  const handleTrackClick = (trackId: string) => {
    setActiveTrack(prev => prev === trackId ? null : trackId)
  }

  const getTrackColor = (type: string, status: string) => {
    if (type === 'access') {
      if (status === 'normal') return THEME.ea.accent
      if (status === 'alert') return THEME.voice.accent
      return THEME.ss.accent // shortfall
    }
    if (type === 'oracle') {
      if (status === 'normal') return THEME.flow.accent
      if (status === 'dispute') return THEME.voice.accent
      if (status === 'hold') return THEME.ss.accent
      return THEME.ea.accent // verify
    }
    if (type === 'gov') {
      if (status === 'idle') return THEME.border
      if (status === 'panel') return THEME.voice.accent
      return THEME.ss.accent // alert
    }
    if (type === 'patch') {
      if (status === 'idle') return THEME.border
      if (status === 'review') return THEME.voice.accent
      return THEME.sr.accent // vote / active
    }
    return THEME.border
  }



  return (
    <DiagramShell figId="V-015" title="Annual Stress-Test & Operations Timeline" nodes={NODES} activeNodeId={activeTrack} onInternalLink={onInternalLink}>
      <div className="flex flex-col gap-5">
        
        {/* Month Selector Scrubber */}
        <div className="rounded-lg bg-[#0d1117] p-4 border border-[#30363d]">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[0.85em] text-[#8b949e]">SELECT TIMELINE MONTH:</span>
            <span className="font-mono text-[0.9em] font-bold text-[#58a6ff]">{currentMonthData.quarter}</span>
          </div>
          
          <div className="flex justify-between items-center gap-1.5 overflow-x-auto pb-2">
            {MONTHS.map(m => (
              <button
                key={m.month}
                onClick={() => setSelectedMonth(m.month)}
                className={`flex-1 min-w-[36px] h-10 rounded-lg font-mono text-[0.9em] font-bold transition-all border ${
                  selectedMonth === m.month
                    ? 'bg-[#58a6ff] text-[#0d1117] border-[#58a6ff]'
                    : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:border-[#8b949e]'
                }`}
              >
                M{m.month}
              </button>
            ))}
          </div>
        </div>

        {/* Parallel System Tracks */}
        <div className="flex flex-col gap-3 rounded-lg bg-[#0d1117] p-5 border border-[#30363d]">
          <div className="font-mono text-[0.8em] text-[#8b949e] mb-1">SIMULATED JURISDICTION TRACKS (CLICK TO DEFINE):</div>
          
          {/* Track 1: Access */}
          <div 
            onClick={() => handleTrackClick('ea_track')}
            className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
              activeTrack === 'ea_track' ? 'bg-[#1b222c] border-[#3fb950]' : 'bg-[#161b22] border-transparent hover:border-[#30363d]'
            }`}
          >
            <div className="w-[180px] font-mono text-[0.8em] font-bold" style={{ color: THEME.ea.accent }}>ACCESS & MARKETS</div>
            <div className="flex-1 h-3 rounded bg-[#21262d] overflow-hidden relative">
              <div 
                className="h-full rounded transition-all duration-300"
                style={{ 
                  width: `${(selectedMonth / 12) * 100}%`, 
                  backgroundColor: getTrackColor('access', currentMonthData.tracks.access)
                }}
              />
            </div>
            <div className="w-[80px] text-right font-mono text-[0.8em]" style={{ color: getTrackColor('access', currentMonthData.tracks.access) }}>
              {currentMonthData.tracks.access.toUpperCase()}
            </div>
          </div>

          {/* Track 2: Oracle */}
          <div 
            onClick={() => handleTrackClick('oracle_track')}
            className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
              activeTrack === 'oracle_track' ? 'bg-[#1b222c] border-[#58a6ff]' : 'bg-[#161b22] border-transparent hover:border-[#30363d]'
            }`}
          >
            <div className="w-[180px] font-mono text-[0.8em] font-bold" style={{ color: THEME.flow.accent }}>ORACLE TRIANGULATION</div>
            <div className="flex-1 h-3 rounded bg-[#21262d] overflow-hidden relative">
              <div 
                className="h-full rounded transition-all duration-300"
                style={{ 
                  width: `${(selectedMonth / 12) * 100}%`, 
                  backgroundColor: getTrackColor('oracle', currentMonthData.tracks.oracle)
                }}
              />
            </div>
            <div className="w-[80px] text-right font-mono text-[0.8em]" style={{ color: getTrackColor('oracle', currentMonthData.tracks.oracle) }}>
              {currentMonthData.tracks.oracle.toUpperCase()}
            </div>
          </div>

          {/* Track 3: Governance */}
          <div 
            onClick={() => handleTrackClick('gov_track')}
            className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
              activeTrack === 'gov_track' ? 'bg-[#1b222c] border-[#d29922]' : 'bg-[#161b22] border-transparent hover:border-[#30363d]'
            }`}
          >
            <div className="w-[180px] font-mono text-[0.8em] font-bold" style={{ color: THEME.voice.accent }}>CIVIC GOVERNANCE</div>
            <div className="flex-1 h-3 rounded bg-[#21262d] overflow-hidden relative">
              <div 
                className="h-full rounded transition-all duration-300"
                style={{ 
                  width: `${(selectedMonth / 12) * 100}%`, 
                  backgroundColor: getTrackColor('gov', currentMonthData.tracks.gov)
                }}
              />
            </div>
            <div className="w-[80px] text-right font-mono text-[0.8em]" style={{ color: getTrackColor('gov', currentMonthData.tracks.gov) }}>
              {currentMonthData.tracks.gov.toUpperCase()}
            </div>
          </div>

          {/* Track 4: Patches */}
          <div 
            onClick={() => handleTrackClick('patch_track')}
            className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
              activeTrack === 'patch_track' ? 'bg-[#1b222c] border-[#a371f7]' : 'bg-[#161b22] border-transparent hover:border-[#30363d]'
            }`}
          >
            <div className="w-[180px] font-mono text-[0.8em] font-bold" style={{ color: THEME.sr.accent }}>PATCH INTEGRITY</div>
            <div className="flex-1 h-3 rounded bg-[#21262d] overflow-hidden relative">
              <div 
                className="h-full rounded transition-all duration-300"
                style={{ 
                  width: `${(selectedMonth / 12) * 100}%`, 
                  backgroundColor: getTrackColor('patch', currentMonthData.tracks.patch)
                }}
              />
            </div>
            <div className="w-[80px] text-right font-mono text-[0.8em]" style={{ color: getTrackColor('patch', currentMonthData.tracks.patch) }}>
              {currentMonthData.tracks.patch.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Real-time Telemetry & Detail Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Telemetry Box */}
          <div className="rounded-lg bg-[#0d1117] p-4 border border-[#30363d] flex flex-col gap-3.5">
            <div className="font-mono text-[0.8em] text-[#8b949e]">STATE TELEMETRY VARIABLES:</div>
            
            <div className="flex justify-between items-center border-b border-[#21262d] pb-2">
              <span className="text-[0.85em] text-[#8b949e]">Sterling Hoard (W):</span>
              <span className="font-mono text-[0.9em] font-bold text-[#dde1e7]">{currentMonthData.variables.W}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#21262d] pb-2">
              <span className="text-[0.85em] text-[#8b949e]">Demurrage Rate:</span>
              <span className="font-mono text-[0.9em] font-bold text-[#f85149]">{currentMonthData.variables.demurrage}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#21262d] pb-2">
              <span className="text-[0.85em] text-[#8b949e]">Delivery Rate (Rd):</span>
              <span className="font-mono text-[0.9em] font-bold text-[#3fb950]">{currentMonthData.variables.Rd}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#21262d] pb-2">
              <span className="text-[0.85em] text-[#8b949e]">Oracle State:</span>
              <span className="font-mono text-[0.9em] font-bold text-[#58a6ff]">{currentMonthData.variables.oracleState}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[0.85em] text-[#8b949e]">Active Triangulation Nodes:</span>
              <span className="font-mono text-[0.9em] font-bold text-[#dde1e7]">{currentMonthData.variables.activeNodes} / 5</span>
            </div>
          </div>

          {/* Incident / Actions Details */}
          <div className="md:col-span-2 rounded-lg bg-[#0d1117] p-5 border border-[#30363d] flex flex-col gap-3">
            <h4 className="text-[1.05em] font-bold text-[#58a6ff] border-b border-[#21262d] pb-2 flex justify-between items-center">
              <span>{currentMonthData.title}</span>
              <span className="font-mono text-[0.7em] px-2 py-0.5 rounded bg-[#21262d] text-[#8b949e]">{currentMonthData.status}</span>
            </h4>
            
            <div className="text-[0.88em] leading-[1.5] text-[#dde1e7] flex flex-col gap-2">
              <div>
                <strong className="font-mono text-[0.85em] text-[#8b949e] block mb-0.5">OBSERVED ISSUES:</strong>
                <p>{currentMonthData.issues}</p>
              </div>
              <div className="mt-1">
                <strong className="font-mono text-[0.85em] text-[#8b949e] block mb-0.5">SYSTEM RESPONSE & RESOLUTION:</strong>
                <p>{currentMonthData.response}</p>
              </div>
              <div className="mt-1">
                <strong className="font-mono text-[0.85em] text-[#8b949e] block mb-0.5">CONSTITUTIONAL RULES / PATCHES INVOLVED:</strong>
                <p className="text-[#a371f7]">{currentMonthData.patch}</p>
              </div>
              <div className="mt-1">
                <strong className="font-mono text-[0.85em] text-[#8b949e] block mb-0.5">ECONOMIC CIRCULATION NOTE:</strong>
                <p className="italic text-[#b6c2cf]">{currentMonthData.notes}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DiagramShell>
  )
}
