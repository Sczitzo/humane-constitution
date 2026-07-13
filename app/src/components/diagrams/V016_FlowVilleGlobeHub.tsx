// app/src/components/diagrams/V016_FlowVilleGlobeHub.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DiagramShell } from './DiagramShell'
import type { DiagramProps, DiagramNode } from './index'

const NODES: DiagramNode[] = [
  {
    id: 'scale5_federation',
    label: 'Scale 5: Federation (Macro)',
    definition: 'The macro economy layer governing progressive net-worth demurrage, capital pooling, and resources for the Essential Access Commons. High-wealth hoards decay at higher rates past participation floor S.',
    docLink: 'docs/constitution/Humane_Constitution.md',
    accent: '#d29922', // Gold/Decay
    accentBg: 'rgba(210,153,34,0.07)',
  },
  {
    id: 'scale3_town',
    label: 'Scale 3: Locality/Town (Micro-Ecosystem)',
    definition: 'The local community layer comprising housing cooperatives, local oracle triangulation nodes, and the Shared Storehouse rationing infrastructure.',
    docLink: 'ANNEX_Y.md',
    accent: '#3fb950', // Green/CSM
    accentBg: 'rgba(63,185,80,0.07)',
  },
  {
    id: 'scale1_household',
    label: 'Scale 1: Household/Individual',
    definition: 'The personal layer featuring character budgets (Aisha and Sterling), whistleblower protection firewalls, and the Legibility Slide Rule protecting democratic access.',
    docLink: 'ANNEX_Z.md',
    accent: '#58a6ff', // Blue/Flow
    accentBg: 'rgba(88,166,255,0.07)',
  },
]

type ZoomLevel = 'federation' | 'town' | 'household'

export function V016_FlowVilleGlobeHub({ onInternalLink }: DiagramProps) {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('federation')
  const [hoveredScale, setHoveredScale] = useState<ZoomLevel | null>(null)

  // Federation State
  const [sterlingWealth, setSterlingWealth] = useState<number>(800000)
  const [productiveInvestment, setProductiveInvestment] = useState<boolean>(false)

  // Town State
  const [oracleA, setOracleA] = useState<'normal' | 'corrupt'>('normal')
  const [disputeLog, setDisputeLog] = useState<string[]>([
    'All nodes green. Consensus at 100%.',
  ])

  // Household State
  const [activeCharacter, setActiveCharacter] = useState<'aisha' | 'sterling'>('aisha')
  const [aishaSR, setAishaSR] = useState<number>(120)
  const [aishaFlow, setAishaFlow] = useState<number>(450)
  const [aishaCareHours, setAishaCareHours] = useState<number>(12)
  const [whistleState, setWhistleState] = useState<'idle' | 'investigating' | 'success'>('idle')
  const [popupMessage, setPopupMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null)
  
  // Legibility Slide Rule State
  const [complexity, setComplexity] = useState<number>(30)
  const [translationActive, setTranslationActive] = useState<boolean>(false)

  // Handle popup autohide
  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => setPopupMessage(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [popupMessage])

  // Whistleblower process simulator
  const triggerWhistleblowerReport = () => {
    if (aishaSR < 5) {
      setPopupMessage({ text: 'Insufficient Service Record points (need 5 SR points to stake).', type: 'error' })
      return
    }
    setWhistleState('investigating')
    setAishaSR(prev => prev - 5)
    setDisputeLog(prev => ['Whistleblower report filed. Staking 5 SR points...', ...prev])

    setTimeout(() => {
      setWhistleState('success')
      setAishaSR(prev => prev + 15) // Return stake (5) + bonus (10)
      setAishaFlow(prev => prev + 50) // Bounty reward
      setPopupMessage({ text: 'Surcharge verified! Grocer fined. +10 SR points, +50 Flow bounty awarded.', type: 'success' })
      setDisputeLog(prev => ['Enforcement Panel confirms surcharge abuse. Grocer fined. Bounty paid.', ...prev])
      
      setTimeout(() => {
        setWhistleState('idle')
      }, 2000)
    }, 2000)
  }

  // Calculate demurrage rates
  // Floor S = 50,000.
  // Tier 1 (50k - 1M) = 26% annual decay
  // Tier 4 (> 1M) = 46% annual decay
  const S_FLOOR = 50000
  let demurrageRate = 0
  let annualDecay = 0

  if (sterlingWealth > S_FLOOR && !productiveInvestment) {
    if (sterlingWealth <= 1000000) {
      demurrageRate = 0.26
      annualDecay = (sterlingWealth - S_FLOOR) * demurrageRate
    } else {
      demurrageRate = 0.46
      const tier1Decay = (1000000 - S_FLOOR) * 0.26
      const tier4Decay = (sterlingWealth - 1000000) * 0.46
      annualDecay = tier1Decay + tier4Decay
    }
  }

  const dailyDecay = annualDecay / 365

  // Oracle Status
  const isOracleDisrupted = oracleA === 'corrupt'

  // Legibility scores
  const elenaComprehension = 95
  const marcusComprehension = translationActive ? 92 : Math.max(35, Math.round(100 - complexity * 0.5))
  const sarahComprehension = translationActive ? 88 : Math.max(12, Math.round(90 - complexity * 0.85))

  // Concentric Orbit hover descriptions
  const getScaleDesc = (scale: ZoomLevel) => {
    switch (scale) {
      case 'federation':
        return {
          title: 'SCALE 5: FEDERATION',
          bounds: 'Bounds: Entire population (>1M)',
          matters: 'Authorized: Net-worth Demurrage, Flow Convertibility, Commons funding',
          forbidden: 'Restricted: Direct local resource routing, zoning ordinances',
        }
      case 'town':
        return {
          title: 'SCALE 3: LOCALITY (TOWN)',
          bounds: 'Bounds: 5,000 - 50,000 residents',
          matters: 'Authorized: Shared Storehouse rules, Land Trusts, local Oracle consensus',
          forbidden: 'Restricted: Demurrage rate alteration, sovereign monetary rules',
        }
      case 'household':
        return {
          title: 'SCALE 1: HOUSEHOLD / INDIVIDUAL',
          bounds: 'Bounds: 1 - 10 persons',
          matters: 'Authorized: Individual service selection, personal consumption, local votes',
          forbidden: 'Restricted: Arbitrary resource hoarding, rent extortion',
        }
    }
  }

  const currentScaleInfo = getScaleDesc(hoveredScale || zoomLevel)

  return (
    <DiagramShell
      figId="V-016"
      title="Flow Ville Globe Hub — Unified Dynamic Map"
      nodes={NODES}
      activeNodeId={
        zoomLevel === 'federation'
          ? 'scale5_federation'
          : zoomLevel === 'town'
          ? 'scale3_town'
          : 'scale1_household'
      }
      onInternalLink={onInternalLink}
    >
      <div className="flex flex-col gap-6 relative min-h-[580px]">
        {/* Dynamic Global Notification Popup */}
        <AnimatePresence>
          {popupMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg border shadow-xl flex items-center gap-3 backdrop-filter backdrop-blur-md"
              style={{
                backgroundColor:
                  popupMessage.type === 'success'
                    ? 'rgba(63, 185, 80, 0.9)'
                    : popupMessage.type === 'error'
                    ? 'rgba(248, 81, 73, 0.9)'
                    : 'rgba(210, 153, 34, 0.9)',
                borderColor:
                  popupMessage.type === 'success'
                    ? '#3fb950'
                    : popupMessage.type === 'error'
                    ? '#f85149'
                    : '#d29922',
                color: '#ffffff',
              }}
            >
              <span className="font-bold text-[1.1em]">
                {popupMessage.type === 'success' ? '✓' : '⚠'}
              </span>
              <span className="text-[0.9em] font-mono leading-snug">{popupMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Dashboard Header & Concentric Scale Hub */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 rounded-xl border border-[#30363d] bg-[#0d1117]/80 p-5 backdrop-filter backdrop-blur-md">
          {/* Concentric rings interactive diagram */}
          <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#30363d] pb-4 md:pb-0 md:pr-4">
            <span className="font-mono text-[0.75em] text-[#8b949e] mb-3 uppercase tracking-wider">Concentric Scale Navigator</span>
            <svg viewBox="0 0 160 160" className="w-[130px] h-[130px]">
              {/* Scale 5 Ring */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={zoomLevel === 'federation' ? '#d29922' : '#30363d'}
                strokeWidth={zoomLevel === 'federation' ? 4 : 2}
                className="cursor-pointer hover:stroke-[#d29922] transition-all"
                onClick={() => setZoomLevel('federation')}
                onMouseEnter={() => setHoveredScale('federation')}
                onMouseLeave={() => setHoveredScale(null)}
              />
              {/* Scale 3 Ring */}
              <circle
                cx="80"
                cy="80"
                r="45"
                fill="none"
                stroke={zoomLevel === 'town' ? '#3fb950' : '#30363d'}
                strokeWidth={zoomLevel === 'town' ? 4 : 2}
                className="cursor-pointer hover:stroke-[#3fb950] transition-all"
                onClick={() => setZoomLevel('town')}
                onMouseEnter={() => setHoveredScale('town')}
                onMouseLeave={() => setHoveredScale(null)}
              />
              {/* Scale 1 Ring */}
              <circle
                cx="80"
                cy="80"
                r="20"
                fill="none"
                stroke={zoomLevel === 'household' ? '#58a6ff' : '#30363d'}
                strokeWidth={zoomLevel === 'household' ? 4 : 2}
                className="cursor-pointer hover:stroke-[#58a6ff] transition-all"
                onClick={() => setZoomLevel('household')}
                onMouseEnter={() => setHoveredScale('household')}
                onMouseLeave={() => setHoveredScale(null)}
              />
              {/* Center core */}
              <circle cx="80" cy="80" r="5" fill="#8b949e" />
            </svg>
            <div className="flex gap-2.5 mt-3">
              <button
                onClick={() => setZoomLevel('federation')}
                className={`px-2 py-1 rounded text-[0.7em] font-mono font-bold border transition-all ${
                  zoomLevel === 'federation' ? 'bg-[#d29922]/20 border-[#d29922] text-[#d29922]' : 'bg-transparent border-[#30363d] text-[#8b949e]'
                }`}
              >
                Scale 5
              </button>
              <button
                onClick={() => setZoomLevel('town')}
                className={`px-2 py-1 rounded text-[0.7em] font-mono font-bold border transition-all ${
                  zoomLevel === 'town' ? 'bg-[#3fb950]/20 border-[#3fb950] text-[#3fb950]' : 'bg-transparent border-[#30363d] text-[#8b949e]'
                }`}
              >
                Scale 3
              </button>
              <button
                onClick={() => setZoomLevel('household')}
                className={`px-2 py-1 rounded text-[0.7em] font-mono font-bold border transition-all ${
                  zoomLevel === 'household' ? 'bg-[#58a6ff]/20 border-[#58a6ff] text-[#58a6ff]' : 'bg-transparent border-[#30363d] text-[#8b949e]'
                }`}
              >
                Scale 1
              </button>
            </div>
          </div>

          {/* Subsidiarity HUD Sidebar */}
          <div className="md:col-span-8 flex flex-col justify-center">
            <h3 className="font-mono text-[1em] font-bold text-[#dde1e7] mb-1.5 flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor:
                    (hoveredScale || zoomLevel) === 'federation'
                      ? '#d29922'
                      : (hoveredScale || zoomLevel) === 'town'
                      ? '#3fb950'
                      : '#58a6ff',
                }}
              />
              {currentScaleInfo.title}
            </h3>
            <div className="font-mono text-[0.8em] text-[#8b949e] mb-2">{currentScaleInfo.bounds}</div>
            <div className="flex flex-col gap-1.5 text-[0.85em] leading-relaxed">
              <div className="text-[#3fb950]/90">
                <span className="font-mono text-[0.85em] text-[#8b949e]">✔ AUTHORIZED MATTERS:</span> {currentScaleInfo.matters}
              </div>
              <div className="text-[#f85149]/90">
                <span className="font-mono text-[0.85em] text-[#8b949e]">✘ RESTRICTED MATTERS:</span> {currentScaleInfo.forbidden}
              </div>
            </div>
          </div>
        </div>

        {/* View Layout Router */}
        <div className="flex-1 rounded-xl border border-[#30363d] bg-[#0d1117]/40 overflow-hidden flex flex-col">
          {/* SCALE 5: FEDERATION */}
          {zoomLevel === 'federation' && (
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-[#21262d] pb-3">
                <span className="font-mono text-[0.85em] font-bold text-[#d29922]">FEDERATION WEALTH DECAY SIMULATOR</span>
                <span className="font-mono text-[0.75em] bg-[#21262d] px-2 py-0.5 rounded text-[#8b949e]">PROGRESSIVE DEMURRAGE</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Controls */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <div className="bg-[#161b22]/90 border border-[#30363d] rounded-lg p-4">
                    <label className="font-mono text-[0.8em] text-[#8b949e] block mb-2">
                      STERLING'S HOARDED WEALTH (W):
                    </label>
                    <div className="flex justify-between font-mono text-[1.1em] font-bold text-[#dde1e7] mb-2">
                      <span>${sterlingWealth.toLocaleString()} Flow</span>
                      <span className="text-[#8b949e]">S = $50,000 Exempt</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="2000000"
                      step="10000"
                      value={sterlingWealth}
                      onChange={(e) => setSterlingWealth(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#21262d] rounded-lg appearance-none cursor-pointer accent-[#d29922]"
                    />
                  </div>

                  <div className="bg-[#161b22]/90 border border-[#30363d] rounded-lg p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.85em] text-[#8b949e]">PRODUCTIVE INVESTMENT EXEMPTION</span>
                      <button
                        onClick={() => setProductiveInvestment(prev => !prev)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                          productiveInvestment ? 'bg-[#3fb950]' : 'bg-[#30363d]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                            productiveInvestment ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-[0.8em] text-[#8b949e] leading-relaxed">
                      Snap on the "Cooperative Housing/Term Finance" shield to lock assets in productive, community-aligned avenues, eliminating the demurrage decay base.
                    </p>
                  </div>
                </div>

                {/* Simulated Reservoir */}
                <div className="lg:col-span-7 flex flex-col items-center bg-[#161b22]/40 border border-[#30363d] rounded-lg p-5">
                  <span className="font-mono text-[0.75em] text-[#8b949e] mb-4 self-start">Productive Wealth Tank vs. Commons Drains</span>
                  
                  <div className="flex items-end justify-center w-full gap-8 h-[220px] relative">
                    {/* Exemption Floor Line overlay */}
                    <div
                      className="absolute left-0 right-0 border-t border-dashed border-[#3fb950] z-20"
                      style={{ bottom: `${(50000 / 2000000) * 170 + 20}px` }}
                    >
                      <span className="font-mono text-[0.6em] text-[#3fb950] absolute right-2 -top-4 bg-[#0d1117] px-1 rounded border border-[#3fb950]/30">
                        Participation Floor S ($50k)
                      </span>
                    </div>

                    {/* Sterling Assets Tank */}
                    <div className="relative w-[130px] h-[170px] bg-[#161b22] border-2 border-[#30363d] rounded-b-md flex items-end">
                      {/* Productive Shield Ring */}
                      {productiveInvestment && (
                        <div className="absolute inset-[-6px] rounded border-2 border-[#3fb950] bg-[#3fb950]/5 animate-pulse z-10 pointer-events-none" />
                      )}

                      {/* Liquid Content */}
                      <div
                        className="w-full transition-all duration-300 rounded-b-sm"
                        style={{
                          height: `${(sterlingWealth / 2000000) * 166}px`,
                          backgroundColor: productiveInvestment ? '#183a24' : '#271f11',
                          borderTop: `2px solid ${productiveInvestment ? '#3fb950' : '#d29922'}`,
                        }}
                      />

                      {/* Drains on the side if decaying */}
                      {sterlingWealth > S_FLOOR && !productiveInvestment && (
                        <>
                          <div className="absolute right-0 top-1/3 w-3 h-1 bg-[#d29922]" />
                          <div className="absolute right-0 top-2/3 w-3 h-1 bg-[#d29922]" />
                          {/* Animated Drip Particles */}
                          <div className="absolute right-[-12px] top-1/3 flex gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d29922] animate-ping" />
                          </div>
                        </>
                      )}

                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[0.75em] text-[#8b949e] font-bold text-center z-10 drop-shadow">
                        Sterling<br/>${(sterlingWealth / 1000).toFixed(0)}k
                      </span>
                    </div>

                    {/* Draining Flow Arrow */}
                    <div className="flex flex-col items-center justify-center w-[80px]">
                      {sterlingWealth > S_FLOOR && !productiveInvestment ? (
                        <>
                          <span className="font-mono text-[0.65em] text-[#d29922] text-center mb-1 animate-pulse">
                            Decaying<br/>-{Math.round(demurrageRate * 100)}% base
                          </span>
                          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-[#d29922] stroke-2 animate-bounce">
                            <path d="M5 12h14M12 5l7 7-7 7" transform="rotate(90 12 12)" />
                          </svg>
                        </>
                      ) : (
                        <span className="font-mono text-[0.7em] text-[#8b949e] text-center">Exempt / Locked</span>
                      )}
                    </div>

                    {/* Commons Pool Tank */}
                    <div className="relative w-[130px] h-[170px] bg-[#161b22] border-2 border-[#30363d] rounded-b-md flex items-end">
                      {/* Active level based on decay amount */}
                      <div
                        className="w-full transition-all duration-300 rounded-b-sm bg-[#112a1b]"
                        style={{
                          height: `${sterlingWealth > S_FLOOR && !productiveInvestment ? 40 + (dailyDecay / 1500) * 120 : 20}px`,
                          borderTop: '2px solid #3fb950',
                        }}
                      />
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[0.7em] text-[#3fb950] font-bold text-center z-10 drop-shadow">
                        Commons Pool<br/>+$({dailyDecay.toFixed(0)}/d)
                      </span>
                    </div>
                  </div>

                  {/* Math summary */}
                  <div className="mt-5 w-full border-t border-[#21262d] pt-3 font-mono text-[0.8em] text-[#dde1e7] grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#8b949e]">DAILY DECAY SURCHARGE:</span>
                      <div className="text-[1.1em] font-bold text-[#f85149]">
                        ${dailyDecay.toLocaleString(undefined, { maximumFractionDigits: 2 })} Flow / day
                      </div>
                    </div>
                    <div>
                      <span className="text-[#8b949e]">EST. ANNUAL COMMONS YIELD:</span>
                      <div className="text-[1.1em] font-bold text-[#3fb950]">
                        ${annualDecay.toLocaleString(undefined, { maximumFractionDigits: 0 })} Flow / year
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* SCALE 3: LOCALITY / TOWN */}
          {zoomLevel === 'town' && (
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-[#21262d] pb-3">
                <span className="font-mono text-[0.85em] font-bold text-[#3fb950]">LOCALITY SIMULATOR & SENSOR HUD</span>
                <button
                  onClick={() => setOracleA(prev => prev === 'normal' ? 'corrupt' : 'normal')}
                  className={`px-3 py-1.5 rounded font-mono text-[0.75em] font-bold transition-all border ${
                    isOracleDisrupted
                      ? 'bg-[#f85149]/20 border-[#f85149] text-[#f85149]'
                      : 'bg-[#3fb950]/20 border-[#3fb950] text-[#3fb950]'
                  }`}
                >
                  {isOracleDisrupted ? '⚠ DISRUPTING ORACLE A' : '✓ ORACLE NODES HEALTHY'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* SVG Isometric City Grid Map */}
                <div className="lg:col-span-7 bg-[#161b22]/40 border border-[#30363d] rounded-lg p-5 flex flex-col items-center">
                  <span className="font-mono text-[0.75em] text-[#8b949e] mb-4 self-start">Interactive Locality Grid (Scale 3)</span>
                  
                  <svg viewBox="0 0 400 240" className="w-full max-w-[380px] h-[220px]">
                    {/* Isometric streets pattern (background decoration) */}
                    <path d="M50 120 L200 45 L350 120 L200 195 Z" fill="none" stroke="#21262d" strokeWidth={1} />
                    <path d="M50 120 L350 120" fill="none" stroke="#21262d" strokeWidth={1} />
                    <path d="M200 45 L200 195" fill="none" stroke="#21262d" strokeWidth={1} />

                    {/* Speculative Tower vs CLT Co-op */}
                    <g transform="translate(60, 75)" className="transition-all duration-500">
                      {productiveInvestment ? (
                        // CLT Housing (Green Co-op)
                        <>
                          <rect x="-25" y="-15" width="50" height="30" rx="3" fill="#183a24" stroke="#3fb950" strokeWidth={2} />
                          <text x="0" y="5" textAnchor="middle" fontSize={7} fill="#3fb950" fontWeight="bold" fontFamily="monospace">CLT CO-OP</text>
                          <circle cx="0" cy="-25" r="4" fill="#3fb950" className="animate-ping" />
                        </>
                      ) : (
                        // Speculative Skyscraper (Orange Tower)
                        <>
                          <rect x="-20" y="-45" width="40" height="65" rx="2" fill="#2c210d" stroke="#d29922" strokeWidth={2} />
                          <line x1="-10" y1="-25" x2="10" y2="-25" stroke="#30363d" />
                          <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#30363d" />
                          <text x="0" y="-35" textAnchor="middle" fontSize={7} fill="#d29922" fontWeight="bold" fontFamily="monospace">SPEC TOWER</text>
                        </>
                      )}
                    </g>

                    {/* Commons Storehouse & Conveyor */}
                    <g transform="translate(200, 115)">
                      <polygon points="-25,15 0,-25 25,15" fill="#0d2116" stroke="#3fb950" strokeWidth={2} />
                      <text x="0" y="5" textAnchor="middle" fontSize={8} fill="#3fb950" fontWeight="bold" fontFamily="monospace">STOREHOUSE</text>
                      
                      {/* Conveyor to housing nodes (dashing lines) */}
                      {dailyDecay > 0 && !productiveInvestment && (
                        <line x1="-25" y1="10" x2="-100" y2="-15" stroke="#d29922" strokeWidth={1.5} strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                      )}
                    </g>

                    {/* Oracle Triangle Nodes */}
                    {/* Node A (Top) */}
                    <g transform="translate(200, 45)" className="cursor-pointer" onClick={() => setOracleA(o => o === 'normal' ? 'corrupt' : 'normal')}>
                      <circle cx="0" cy="0" r="16" fill={oracleA === 'normal' ? '#0d2116' : '#200808'} stroke={oracleA === 'normal' ? '#3fb950' : '#f85149'} strokeWidth={2} />
                      <text x="0" y="3" textAnchor="middle" fontSize={8} fill={oracleA === 'normal' ? '#3fb950' : '#f85149'} fontFamily="monospace" fontWeight="bold">Node A</text>
                    </g>
                    {/* Node B (Bottom Left) */}
                    <g transform="translate(100, 180)">
                      <circle cx="0" cy="0" r="16" fill="#0d2116" stroke="#3fb950" strokeWidth={2} />
                      <text x="0" y="3" textAnchor="middle" fontSize={8} fill="#3fb950" fontFamily="monospace" fontWeight="bold">Node B</text>
                    </g>
                    {/* Node C (Bottom Right) */}
                    <g transform="translate(300, 180)">
                      <circle cx="0" cy="0" r="16" fill="#0d2116" stroke="#3fb950" strokeWidth={2} />
                      <text x="0" y="3" textAnchor="middle" fontSize={8} fill="#3fb950" fontFamily="monospace" fontWeight="bold">Node C</text>
                    </g>

                    {/* Quorum status indicator */}
                    <text x="200" y="230" textAnchor="middle" fontSize={8} fill="#8b949e" fontFamily="monospace">
                      Oracle Triangulation Grid · Consensus Class: Polycentric
                    </text>
                  </svg>
                </div>

                {/* Oracle telemetry status log */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex flex-col gap-3">
                    <span className="font-mono text-[0.8em] text-[#8b949e]">ORACLE CONSENSUS ENGINE:</span>
                    
                    <div className="flex items-center gap-3 p-2.5 rounded border bg-[#0d1117]"
                      style={{
                        borderColor: isOracleDisrupted ? '#d29922' : '#3fb950',
                        color: isOracleDisrupted ? '#d29922' : '#3fb950',
                      }}
                    >
                      <div className="w-3.5 h-3.5 rounded-full animate-pulse"
                        style={{ backgroundColor: isOracleDisrupted ? '#d29922' : '#3fb950' }}
                      />
                      <span className="font-mono text-[0.85em] font-bold uppercase">
                        {isOracleDisrupted ? 'CONSERVATIVE_HOLD ACTIVE' : 'CONSENSUS STABLE'}
                      </span>
                    </div>

                    <div className="text-[0.8em] leading-relaxed text-[#dde1e7]">
                      {isOracleDisrupted ? (
                        <p>
                          <strong>Telemetry conflict detected:</strong> Node A reporting moisture anomaly (-80% humidity). Node B and C maintain quorum consensus (NORMAL). Node A quarantined automatically. Dispute referred to enforcement panel.
                        </p>
                      ) : (
                        <p>
                          <strong>All systems normal:</strong> 3/3 nodes consensus confirmed. Telemetry bands aligned. Shared Storehouse operates on default surplus allocations.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Safety defaults indicator */}
                  <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex flex-col gap-2">
                    <span className="font-mono text-[0.8em] text-[#8b949e]">MERCY DEFAULT GUARANTEE:</span>
                    <div className="text-[0.85em] leading-relaxed text-[#dde1e7] flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-[#3fb950]">
                        <span>✔</span>
                        <span>Emergency CSM Floor (2,100 kcal / 50L water) is ACTIVE.</span>
                      </div>
                      <p className="text-[0.78em] text-[#8b949e]">
                        Under Annex Y §Y2, oracle disputes or quorum errors cannot halt essential food/water delivery. Algorithmic lockouts are structurally forbidden.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCALE 1: HOUSEHOLD / INDIVIDUAL */}
          {zoomLevel === 'household' && (
            <div className="p-6 flex flex-col gap-6">
              {/* Scale tabs */}
              <div className="flex justify-between items-center border-b border-[#21262d] pb-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveCharacter('aisha')}
                    className={`px-3 py-1 rounded font-mono text-[0.8em] font-bold border transition-all ${
                      activeCharacter === 'aisha' ? 'bg-[#58a6ff]/20 border-[#58a6ff] text-[#58a6ff]' : 'bg-transparent border-[#30363d] text-[#8b949e]'
                    }`}
                  >
                    AISHA (CAREGIVER)
                  </button>
                  <button
                    onClick={() => setActiveCharacter('sterling')}
                    className={`px-3 py-1 rounded font-mono text-[0.8em] font-bold border transition-all ${
                      activeCharacter === 'sterling' ? 'bg-[#d29922]/20 border-[#d29922] text-[#d29922]' : 'bg-transparent border-[#30363d] text-[#8b949e]'
                    }`}
                  >
                    STERLING (CAPITALIST)
                  </button>
                </div>
                <span className="font-mono text-[0.75em] text-[#8b949e]">CHARACTER PERSPECTIVE HUD</span>
              </div>

              {/* Character specific dashboards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Character panel */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                  {activeCharacter === 'aisha' ? (
                    /* Aisha HUD */
                    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 flex flex-col gap-4">
                      <div className="flex justify-between items-start border-b border-[#21262d] pb-3">
                        <div>
                          <h4 className="font-bold text-[1.1em] text-[#58a6ff]">Aisha</h4>
                          <span className="text-[0.75em] text-[#8b949e] font-mono">Status: Care volunteer assistant</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-[0.8em] text-[#8b949e]">Rent: $0 (Co-op Shareholder)</div>
                          <span className="text-[0.72em] bg-[#1f2d1f] text-[#3fb950] border border-[#3fb950]/30 px-1.5 py-0.5 rounded font-mono">DIGNITY SAFEGUARD ACTIVE</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded text-center">
                          <span className="font-mono text-[0.7em] text-[#8b949e] block mb-1">LIQUID BALANCE:</span>
                          <span className="font-mono text-[1.15em] font-bold text-[#58a6ff]">${aishaFlow} Flow</span>
                        </div>
                        <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded text-center">
                          <span className="font-mono text-[0.7em] text-[#8b949e] block mb-1">SERVICE RECORD (SR):</span>
                          <span className="font-mono text-[1.15em] font-bold text-[#a371f7]">{aishaSR} pt</span>
                        </div>
                        <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded text-center">
                          <span className="font-mono text-[0.7em] text-[#8b949e] block mb-1">CARE HOURS TIMELOG:</span>
                          <span className="font-mono text-[1.15em] font-bold text-[#3fb950]">{aishaCareHours} hrs</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <button
                          onClick={() => {
                            setAishaCareHours(prev => prev + 3)
                            setAishaSR(prev => prev + 5)
                            setPopupMessage({ text: 'Care shift logged! +3 hours logged, +5 Service Record points earned.', type: 'success' })
                          }}
                          className="flex-1 bg-[#183a24] hover:bg-[#204e30] border border-[#3fb950] text-[#3fb950] font-mono text-[0.8em] font-bold py-2 px-3 rounded-lg transition-all"
                        >
                          Log Clinic Care Shift (+3 hrs)
                        </button>

                        <button
                          onClick={triggerWhistleblowerReport}
                          disabled={whistleState === 'investigating'}
                          className="flex-1 bg-[#1b222c] hover:bg-[#252f3d] border border-[#58a6ff] text-[#58a6ff] font-mono text-[0.8em] font-bold py-2 px-3 rounded-lg transition-all disabled:opacity-50"
                        >
                          {whistleState === 'investigating' ? 'Investigating Report...' : 'Report Surcharge (-5 SR Stake)'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Sterling HUD */
                    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 flex flex-col gap-4">
                      <div className="flex justify-between items-start border-b border-[#21262d] pb-3">
                        <div>
                          <h4 className="font-bold text-[1.1em] text-[#d29922]">Sterling</h4>
                          <span className="text-[0.75em] text-[#8b949e] font-mono">Status: Capital Steward & Investor</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-[0.8em] text-[#8b949e]">Daily Decay base: {productiveInvestment ? 'Exempt' : 'Active'}</div>
                          <span className={`text-[0.72em] px-1.5 py-0.5 rounded font-mono border ${
                            productiveInvestment ? 'bg-[#1f2d1f] text-[#3fb950] border-[#3fb950]/30' : 'bg-[#2d1f1f] text-[#f85149] border-[#f85149]/30'
                          }`}>
                            {productiveInvestment ? 'STEWARDSHIP ACTIVE' : 'SPECULATOR ALERT'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded text-center">
                          <span className="font-mono text-[0.7em] text-[#8b949e] block mb-1">LIQUID ASSET BALANCE:</span>
                          <span className="font-mono text-[1.25em] font-bold text-[#d29922]">${sterlingWealth.toLocaleString()} Flow</span>
                        </div>
                        <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded text-center">
                          <span className="font-mono text-[0.7em] text-[#8b949e] block mb-1">AGENCY VOICE WEIGHT:</span>
                          <span className="font-mono text-[1.25em] font-bold text-[#8b949e]">0.00 pt (Exempt base)</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <button
                          onClick={() => {
                            setPopupMessage({ text: 'ACTION BLOCKED! Whistleblower shield active (Article I §A12). Eviction attempt quarantined.', type: 'error' })
                          }}
                          className="flex-1 bg-[#200808] hover:bg-[#2e0c0c] border border-[#f85149] text-[#f85149] font-mono text-[0.8em] font-bold py-2.5 px-3 rounded-lg transition-all"
                        >
                          Attempt Speculative Eviction
                        </button>

                        <button
                          onClick={() => {
                            setPopupMessage({ text: 'LOBBY DENIED! Annex Z §Z1: Voice points are non-convertible. Cash cannot buy agenda weight.', type: 'warning' })
                          }}
                          className="flex-1 bg-[#200808] hover:bg-[#2e0c0c] border border-[#f85149] text-[#f85149] font-mono text-[0.8em] font-bold py-2.5 px-3 rounded-lg transition-all"
                        >
                          Lobby CRP (Buy Voice Points)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Log panel */}
                  <div className="bg-[#161b22]/40 border border-[#30363d] rounded-lg p-4">
                    <span className="font-mono text-[0.75em] text-[#8b949e] block mb-2">LOCAL DISPUTE LOG:</span>
                    <div className="font-mono text-[0.72em] text-[#8b949e] flex flex-col gap-1.5 max-h-[80px] overflow-y-auto">
                      {disputeLog.map((log, idx) => (
                        <div key={idx} className="border-b border-[#21262d] pb-1">
                          ▸ {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legibility Slide Rule */}
                <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-lg p-5 flex flex-col gap-4">
                  <span className="font-mono text-[0.8em] text-[#8b949e] block border-b border-[#21262d] pb-1">CIVIC LEGIBILITY SLIDE RULE</span>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[0.72em] text-[#8b949e] flex justify-between">
                      <span>BALLOT COMPLEXITY:</span>
                      <span className="font-bold text-[#dde1e7]">{complexity}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={complexity}
                      onChange={(e) => setComplexity(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#21262d] rounded-lg appearance-none cursor-pointer accent-[#58a6ff]"
                    />
                  </div>

                  <div className="flex items-center justify-between border-y border-[#21262d] py-3">
                    <span className="font-mono text-[0.75em] text-[#8b949e]">PLAIN-LANGUAGE TRANSLATOR</span>
                    <button
                      onClick={() => setTranslationActive(prev => !prev)}
                      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                        translationActive ? 'bg-[#3fb950]' : 'bg-[#30363d]'
                      }`}
                    >
                      <div
                        className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200 ${
                          translationActive ? 'translate-x-4.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Citizen comprehension indices */}
                  <div className="flex flex-col gap-2.5">
                    {/* Elena */}
                    <div className="flex items-center justify-between p-2 rounded bg-[#0d1117] border border-[#21262d]">
                      <div>
                        <div className="font-mono text-[0.8em] text-[#dde1e7] font-bold">Elena (Organizer)</div>
                        <span className="text-[0.65em] text-[#8b949e] font-mono">Highly active voter</span>
                      </div>
                      <span className="font-mono text-[0.85em] font-bold text-[#3fb950]">{elenaComprehension}%</span>
                    </div>

                    {/* Marcus */}
                    <div className="flex items-center justify-between p-2 rounded bg-[#0d1117] border border-[#21262d]">
                      <div>
                        <div className="font-mono text-[0.8em] text-[#dde1e7] font-bold">Marcus (Plumber)</div>
                        <span className="text-[0.65em] text-[#8b949e] font-mono">Occasional participant</span>
                      </div>
                      <span className="font-mono text-[0.85em] font-bold"
                        style={{ color: marcusComprehension > 50 ? '#3fb950' : '#d29922' }}
                      >
                        {marcusComprehension}%
                      </span>
                    </div>

                    {/* Sarah */}
                    <div className="flex items-center justify-between p-2 rounded bg-[#0d1117] border border-[#21262d]">
                      <div>
                        <div className="font-mono text-[0.8em] text-[#dde1e7] font-bold">Sarah (Single Parent)</div>
                        <span className="text-[0.65em] text-[#8b949e] font-mono">
                          {sarahComprehension < 40 && !translationActive ? 'Abstaining (Too complex)' : 'Eligible Voter'}
                        </span>
                      </div>
                      <span className="font-mono text-[0.85em] font-bold"
                        style={{ color: sarahComprehension > 50 ? '#3fb950' : '#f85149' }}
                      >
                        {sarahComprehension}%
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Global Hub Reset info footer */}
        <div className="text-center font-mono text-[0.85em] text-[#8b949e] border-t border-[#30363d] pt-3">
          Flow Ville Hub links macro monetary decay with localized safety defaults and individual agency.
        </div>
      </div>
    </DiagramShell>
  )
}
