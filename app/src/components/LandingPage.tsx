import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Logo } from './Logo'
import { V001_FiveToolSeparation } from './diagrams/V001_FiveToolSeparation'

// ─── TVA-style branching timeline ─────────────────────────────────────────────

interface PathDef {
  id: string
  emoji: string
  title: string
  time: string
  desc: string
  color: string
}

interface BranchConfig {
  onTrunk?: boolean
  path: PathDef
  trunkT: number      // where on trunk the branch peels off (0–1)
  endXFrac: number    // x position of endpoint as fraction of width
  endYFrac: number    // y position of endpoint as fraction of height
  above: boolean      // endpoint is above the trunk
  wobbleMult: number  // 0=straight arc, 1=normal wave, >1=extra wavy
  weight: number
  opacity: number
}



function TimelinePanel({ paths, onSelect }: { paths: PathDef[]; onSelect: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [cardPos, setCardPos] = useState<{ x: number; y: number } | null>(null)
  const [dims, setDims] = useState({ w: 1200, h: 560 })
  const [pulseT, setPulseT] = useState(0)
  const pulseRawRef = useRef(0)
  const rafRef = useRef<number>(0)
  const hoveredIdxRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pointerXRef   = useRef(0)
  const pointerYRef   = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ─── Pulse animation (RAF) ────────────────────────────────────────────────────
  useEffect(() => {
    const PERIOD = 3200 // ms for one full trunk pass
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      pulseRawRef.current = (pulseRawRef.current + dt / PERIOD) % 1
      setPulseT(pulseRawRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const { w, h } = dims
  const CY = h * 0.5

  // ─── Trunk: horizontal line of scrimmage ─────────────────────────────────────
  // ─── Trunk: wavy line from node 1 to node 9 ─────────────────────────────────
  const TRUNK_START = 0.08
  const TRUNK_END   = 0.92
  const tx0 = w * TRUNK_START, tx1 = w * TRUNK_END
  const trunkPath = [
    `M ${tx0} ${CY}`,
    `C ${tx0 + (tx1-tx0)*0.18} ${CY - h*0.16}  ${tx0 + (tx1-tx0)*0.32} ${CY + h*0.16}  ${tx0 + (tx1-tx0)*0.46} ${CY - h*0.08}`,
    `C ${tx0 + (tx1-tx0)*0.58} ${CY - h*0.18}  ${tx0 + (tx1-tx0)*0.72} ${CY + h*0.17}  ${tx0 + (tx1-tx0)*0.85} ${CY - h*0.10}`,
    `C ${tx0 + (tx1-tx0)*0.92} ${CY - h*0.04}  ${tx1 - 10} ${CY}  ${tx1} ${CY}`,
  ].join(' ')
  function pointOnTrunk(xFrac: number) { return { x: w * xFrac, y: CY } }

  // ─── Branch/node definitions ─────────────────────────────────────────────────
  // Nodes 1 & 9 sit directly ON the trunk (endYFrac 0.5) — no branch path.
  // Nodes 2–8 have leaf-arc branches off the trunk.
  const BRANCH_DEFS = [
    { trunkX: 0.08, endXFrac: 0.08, endYFrac: 0.50, above: true,  onTrunk: true  },
    { trunkX: 0.19, endXFrac: 0.19, endYFrac: 0.80, above: false, onTrunk: false },
    { trunkX: 0.30, endXFrac: 0.30, endYFrac: 0.16, above: true,  onTrunk: false },
    { trunkX: 0.41, endXFrac: 0.41, endYFrac: 0.84, above: false, onTrunk: false },
    { trunkX: 0.52, endXFrac: 0.52, endYFrac: 0.12, above: true,  onTrunk: false },
    { trunkX: 0.61, endXFrac: 0.61, endYFrac: 0.86, above: false, onTrunk: false },
    { trunkX: 0.71, endXFrac: 0.71, endYFrac: 0.16, above: true,  onTrunk: false },
    { trunkX: 0.81, endXFrac: 0.81, endYFrac: 0.80, above: false, onTrunk: false },
    { trunkX: 0.92, endXFrac: 0.92, endYFrac: 0.50, above: true,  onTrunk: true  },
  ]

  const RING_R = 18

  const branches: BranchConfig[] = useMemo(() => paths.map((p, i) => ({
    path: p,
    trunkT:     BRANCH_DEFS[i].trunkX,
    endXFrac:   BRANCH_DEFS[i].endXFrac,
    endYFrac:   BRANCH_DEFS[i].endYFrac,
    above:      BRANCH_DEFS[i].above,
    onTrunk:    BRANCH_DEFS[i].onTrunk,
    wobbleMult: 1,
    weight:     1.5,
    opacity:    0.62,
  })), [paths]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Leaf-arc geometry ───────────────────────────────────────────────────────
  // Each branch is a smooth convex arc from the trunk point up/down to the node.
  // Both control points are pulled to the SAME side (no S-wave), creating a
  // clean leaf-vein / football-lobe silhouette.
  function makeLeafPath(b: BranchConfig) {
    const o  = pointOnTrunk(b.trunkT)
    const ex = w * b.endXFrac
    const ey = h * b.endYFrac
    // Attach at bottom of circle (above) or top (below)
    const nx = ex
    const ny = b.above ? ey + RING_R + 2 : ey - RING_R - 2
    // Chord vector
    const dx = nx - o.x
    const dy = ny - o.y
    const len = Math.sqrt(dx*dx + dy*dy) || 1
    // Perpendicular unit vector — points away from trunk (same direction as node offset)
    const perpX = -dy / len
    const perpY =  dx / len
    // Bulge amount: makes the arc feel like a leaf lobe
    const bulge = len * 0.55
    // Both cps pulled to the SAME side — smooth convex arc
    const cp1x = o.x + dx * 0.25 + perpX * bulge
    const cp1y = o.y + dy * 0.25 + perpY * bulge
    const cp2x = o.x + dx * 0.75 + perpX * bulge
    const cp2y = o.y + dy * 0.75 + perpY * bulge
    return { o, nx, ny, cp1x, cp1y, cp2x, cp2y,
      d: `M ${o.x} ${o.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${nx} ${ny}` }
  }

  function pointOnMainPath(t: number) { return pointOnTrunk(t) }

  function makeArcLabel(
    text: string, cx: number, cy: number, R: number, above: boolean,
    fontSize: number, fillOpacity: number, fontFamily: string,
    fontWeight: number | string, fill: string
  ): React.ReactElement[] {
    const chars = [...text]
    const widths = chars.map(ch => {
      if (/\p{Emoji_Presentation}/u.test(ch)) return fontSize * 1.05
      if (ch === ' ') return fontSize * 0.28
      if ('WMm'.includes(ch)) return fontSize * 0.78
      if ("il|1'\"!.,;:()[]".includes(ch)) return fontSize * 0.36
      return fontSize * 0.58
    })
    const totalWidth = widths.reduce((a, b) => a + b, 0)
    let cursor = -totalWidth / 2
    return chars.map((ch, i) => {
      const hw = widths[i] / 2
      cursor += hw
      const arcPos = cursor
      cursor += hw
      const δ = arcPos / R
      let x: number, y: number, rot: number
      let dominantBaseline: 'auto' | 'hanging'
      if (above) {
        const θ = δ
        x = cx + R * Math.sin(θ)
        y = cy - R * Math.cos(θ)
        rot = θ * (180 / Math.PI)
        dominantBaseline = 'auto'
      } else {
        const θ = Math.PI - δ
        x = cx + R * Math.sin(θ)
        y = cy - R * Math.cos(θ)
        rot = (θ + Math.PI) * (180 / Math.PI)
        dominantBaseline = 'hanging'
      }
      return (
        <text
          key={i}
          x={x} y={y}
          textAnchor="middle"
          dominantBaseline={dominantBaseline}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          fill={fill}
          fillOpacity={fillOpacity}
          transform={`rotate(${rot}, ${x}, ${y})`}
          style={{ userSelect: 'none' }}
        >{ch}</text>
      )
    })
  }

  function getPulsePos(): { x: number; y: number } {
    return pointOnMainPath(pulseT)
  }

  function handleBranchEnter(i: number) {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    hoveredIdxRef.current = i
    setHoveredIdx(i)
    setCardPos({ x: pointerXRef.current, y: pointerYRef.current })
  }

  function handleBranchLeave() {
    leaveTimerRef.current = setTimeout(() => {
      hoveredIdxRef.current = null
      setHoveredIdx(null)
      setCardPos(null)
      leaveTimerRef.current = null
    }, 200)
  }

  const hovered = hoveredIdx !== null ? branches[hoveredIdx] : null
  const GOLD = '#c9a84c'

  return (
    <div
      className="lp-timeline-wrap"
      ref={containerRef}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        pointerXRef.current = e.clientX - rect.left
        pointerYRef.current = e.clientY - rect.top
        if (hoveredIdxRef.current !== null) {
          setCardPos({ x: pointerXRef.current, y: pointerYRef.current })
        }
      }}
    >
      <svg
        ref={svgRef}
        className="lp-timeline-svg"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="tva-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tva-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="panel-glow" cx="15%" cy="50%" r="65%">
            <stop offset="0%"   stopColor="#c9a84c" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={w} height={h} fill="url(#panel-glow)" />

        {/* Trunk — line of scrimmage */}
        <path d={trunkPath} fill="none" stroke={GOLD} strokeWidth="32" strokeLinecap="round" opacity="0.10" />
        <path d={trunkPath} fill="none" stroke={GOLD} strokeWidth="6" strokeLinecap="round" opacity="0.90" filter="url(#tva-glow)" />

        {/* Route glow layers — skip on-trunk nodes */}
        {branches.map((b, i) => {
          if (b.onTrunk) return null
          const { d } = makeLeafPath(b)
          const isHovered = hoveredIdx === i
          const dimmed = hoveredIdx !== null && !isHovered
          return (
            <path key={`rglow-${b.path.id}`} d={d} fill="none" stroke={GOLD}
              strokeWidth={isHovered ? 14 : 6} strokeLinecap="round"
              opacity={dimmed ? 0.02 : isHovered ? 0.30 : 0.12}
              style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
            />
          )
        })}

        {/* Route lines — skip on-trunk nodes */}
        {branches.map((b, i) => {
          if (b.onTrunk) return null
          const { d } = makeLeafPath(b)
          const isHovered = hoveredIdx === i
          const dimmed = hoveredIdx !== null && !isHovered
          return (
            <path key={`rline-${b.path.id}`} d={d} fill="none" stroke={GOLD}
              strokeWidth={isHovered ? 3 : 1.5} strokeLinecap="round"
              opacity={dimmed ? 0.10 : isHovered ? 1.0 : 0.65}
              filter={isHovered ? 'url(#tva-glow)' : undefined}
              style={{ cursor: 'pointer', transition: 'opacity 0.25s, stroke-width 0.25s' }}
              onMouseEnter={() => handleBranchEnter(i)}
              onMouseLeave={handleBranchLeave}
              onClick={() => onSelect(b.path.id)}
            />
          )
        })}

        {/* Hit areas — skip on-trunk nodes (node circle handles clicks) */}
        {branches.map((b, i) => {
          if (b.onTrunk) return null
          const { d } = makeLeafPath(b)
          return (
            <path key={`rhit-${b.path.id}`} d={d} fill="none" stroke="transparent" strokeWidth="28"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => handleBranchEnter(i)}
              onMouseLeave={handleBranchLeave}
              onClick={() => onSelect(b.path.id)}
            />
          )
        })}

        {/* Endpoint nodes — numbered circles */}
        {branches.map((b, i) => {
          const isHovered = hoveredIdx === i
          const dimmed = hoveredIdx !== null && !isHovered
          const ex = w * b.endXFrac
          const ey = h * b.endYFrac
          return (
            <g key={`node-${b.path.id}`} style={{ cursor: 'pointer' }}
              onMouseEnter={() => handleBranchEnter(i)}
              onMouseLeave={handleBranchLeave}
              onClick={() => onSelect(b.path.id)}
            >
              {/* Sustained pulse ring — animates only while hovered */}
              <circle cx={ex} cy={ey} r={RING_R}
                fill="none" stroke={GOLD} strokeWidth={1.5}
                opacity={dimmed ? 0 : 1}
                className={isHovered ? 'tva-node-pulse' : ''}
                style={{ transition: 'opacity 0.25s' }}
              />
              {/* Outer glow halo */}
              <circle cx={ex} cy={ey} r={RING_R + 8}
                fill={GOLD}
                opacity={dimmed ? 0.01 : isHovered ? 0.28 : 0.07}
                filter="url(#tva-glow)"
                style={{ transition: 'opacity 0.25s' }}
              />
              {/* Dark fill */}
              <circle cx={ex} cy={ey} r={RING_R}
                fill="#0c0a14"
                opacity={dimmed ? 0.4 : 1}
                style={{ transition: 'opacity 0.25s' }}
              />
              {/* Gold ring */}
              <circle cx={ex} cy={ey} r={RING_R}
                fill="none" stroke={GOLD}
                strokeWidth={isHovered ? 2.5 : 1.5}
                opacity={dimmed ? 0.10 : isHovered ? 1.0 : 0.80}
                filter={isHovered ? 'url(#tva-glow)' : undefined}
                style={{ transition: 'opacity 0.25s, stroke-width 0.25s' }}
              />
              {/* Center dot */}
              <circle cx={ex} cy={ey} r={3}
                fill={GOLD}
                opacity={dimmed ? 0.1 : isHovered ? 1.0 : 0.55}
                style={{ transition: 'opacity 0.25s' }}
              />
            </g>
          )
        })}

        {/* Labels — curved arc text around endpoint nodes */}
        {branches.map((b, i) => {
          const isHovered = hoveredIdx === i
          const dimmed = hoveredIdx !== null && !isHovered
          const ex = w * b.endXFrac
          const ey = h * b.endYFrac
          const TITLE_R = RING_R + 22
          return (
            <g key={`lbl-${b.path.id}`}
              style={{ pointerEvents: 'none', transition: 'opacity 0.25s' }}
              opacity={dimmed ? 0.06 : isHovered ? 1.0 : 0.72}
            >
              {makeArcLabel(b.path.title, ex, ey, TITLE_R, b.above, 11.5, 0.90,
                'Inter, sans-serif', isHovered ? 700 : 500, '#ffffff')}
            </g>
          )
        })}
        {/* Traveling pulse dot */}
        {(() => {
          const pos = getPulsePos()
          return (
            <g style={{ pointerEvents: 'none' }}>
              {/* Soft outer halo */}
              <circle cx={pos.x} cy={pos.y} r="10"
                fill={GOLD} opacity="0.12" filter="url(#tva-glow)" />
              {/* Mid glow */}
              <circle cx={pos.x} cy={pos.y} r="5"
                fill={GOLD} opacity="0.55" filter="url(#tva-glow)" />
              {/* Bright core */}
              <circle cx={pos.x} cy={pos.y} r="2.5"
                fill="#fff8e8" opacity="0.95" />
            </g>
          )
        })()}
      </svg>

      {/* Floating hover card — pointer-relative */}
      {hovered && cardPos && (() => {
        const CARD_W = 260, CARD_H = 170, PAD = 12
        const spaceRight = dims.w - cardPos.x
        const left = spaceRight < CARD_W + PAD * 2
          ? cardPos.x - CARD_W - PAD
          : cardPos.x + PAD
        const top = Math.max(8, Math.min(cardPos.y - CARD_H / 2, dims.h - CARD_H - 8))
        return (
          <div
            className="lp-branch-card visible"
            style={{ left, top }}
            onClick={() => onSelect(hovered.path.id)}
          >
            <div className="lp-branch-card-bar" />
            <div className="lp-branch-card-body">
              <div className="lp-branch-card-header">
                <div className="lp-branch-card-title">
                  {hovered.path.title}
                </div>
                <span className="lp-branch-card-time">{hovered.path.time}</span>
              </div>
              <p className="lp-branch-card-desc">{hovered.path.desc}</p>
              <p style={{
                fontSize: 10, color: 'rgba(201,168,76,0.55)', letterSpacing: '0.06em',
                marginTop: 8, fontFamily: "'IBM Plex Mono', monospace",
              }}>click to read</p>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

const PATHS = [
  { id: 'first-time', emoji: '🌱', title: 'First Read', desc: 'New to the project? Start with ordinary lives, rights, and the plain case.', time: '~20 min', color: '#2d6a4f' },
  { id: 'skeptic', emoji: '🔍', title: 'Skeptic', desc: 'Challenge the framework. Examine failure modes, patches, and evidence.', time: '~25 min', color: '#1a3a5c' },
  { id: 'implementer', emoji: '📐', title: 'Implementer', desc: 'Specifications, acceptance criteria, deployment requirements.', time: '~35 min', color: '#4a1c40' },
  { id: 'economic-instruments', emoji: '💰', title: 'Economics', desc: 'Flow, Essential Access, Voice, Service Record, and shortage rules.', time: '~30 min', color: '#5c3d00' },
  { id: 'founding-order', emoji: '🏛️', title: 'Founding Order', desc: 'Governance structures and institutions that underpin the system.', time: '~25 min', color: '#1c3040' },
  { id: 'pilot-deployment', emoji: '🚀', title: 'Pilot Ready', desc: 'Readiness assessment, pilot gates, and evidence roadmap.', time: '~30 min', color: '#3d1a1a' },
  { id: 'identity-personhood', emoji: '🪪', title: 'Personhood', desc: 'Personhood rights, identity recovery, and moral status.', time: '~20 min', color: '#1a3040' },
  { id: 'architectural-integrity', emoji: '🏗️', title: 'Architecture', desc: 'Hash chains, amendment locks, implementation binding, and drift checks.', time: '~25 min', color: '#2d1a4a' },
  { id: 'governance-deep', emoji: '🗳️', title: 'Governance', desc: 'Full trail: threats, patches, resolutions, disclosures.', time: '~40 min', color: '#1a2d1a' },
]



const MARQUEE_ITEMS = [
  'Open Source', 'CC BY 4.0', '90+ Documents', 'Public Audit Trail',
  'Five Instruments', 'Constitutional Design', 'Anti-Rentier', 'Progressive by Design',
  'Oracle-Verified', 'Amendment-Locked', 'Humane Constitution', 'Open Source',
]

const HEADLINE_WORDS = ['What', 'if', 'survival,', 'markets,', 'and', 'civic', 'power', 'stayed', 'separate', 'by', 'design?']

interface LandingPageProps {
  onEnter: (pathId?: string) => void
  returningVisitor?: boolean
}

export function LandingPage({ onEnter, returningVisitor = false }: LandingPageProps) {
  const [exiting, setExiting] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [, setScrollProgress] = useState(0)
  const [navVisible, setNavVisible] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [openThreatIdx, setOpenThreatIdx] = useState<number | null>(null)

  const transitionRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  // Unified scroll handler
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      setNavVisible(y > window.innerHeight * 0.6)

      const el = transitionRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const p = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh * 0.5)))
        setScrollProgress(p)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mouse parallax on hero
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2)
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Intersection-based reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('lp-visible') }),
      { threshold: 0.01 }
    )
    document.querySelectorAll('.lp-reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])


  const handleEnter = useCallback((pathId?: string) => {
    setExiting(true)
    setTimeout(() => onEnter(pathId), 600)
  }, [onEnter])

  const heroParallax = Math.min(scrollY * 0.35, window.innerHeight * 0.5)
  const heroOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.65))

  return (
    <div
      className={`lp-root${exiting ? ' lp-exit' : ''}`}
    >
      <style>{`
        /* ─── Reset / Root ─── */
        .lp-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: clip;
          background: #0a0906;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .lp-exit { opacity: 0; transform: scale(0.98); pointer-events: none; }

        /* ─── Floating nav ─── */
        .lp-nav {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(12,11,9,0.72);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(245,240,232,0.1);
          border-radius: 999px;
          padding: 10px 20px;
          transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1),
                      transform 0.4s cubic-bezier(0.16,1,0.3,1);
          opacity: 0;
          pointer-events: none;
        }
        .lp-nav.lp-nav-visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        .lp-nav-logo { opacity: 0.6; display: flex; align-items: center; }
        .lp-nav-sep {
          width: 1px; height: 14px;
          background: rgba(245,240,232,0.15);
          margin: 0 8px;
        }
        .lp-nav-btn {
          background: #c9a84c;
          color: #0c0b09;
          border: none;
          padding: 7px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .lp-nav-btn:hover { background: #dbb85c; transform: scale(1.04); }
        .lp-nav-ghost {
          background: transparent;
          color: rgba(245,240,232,0.55);
          border: none;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 13px;
          cursor: pointer;
          transition: color 0.15s;
        }
        .lp-nav-ghost:hover { color: rgba(245,240,232,0.9); }

        /* ─── Grain overlay ─── */
        .lp-grain {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          animation: lp-grain-drift 0.5s steps(1) infinite, lp-shimmer 6s ease-in-out infinite;
        }

        /* ─── Hero ─── */
        .lp-hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .lp-hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .lp-hero-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
          top: -100px; left: -120px;
        }
        .lp-hero-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(111,124,103,0.14) 0%, transparent 70%);
          bottom: 0; right: -80px;
        }
        .lp-hero-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
          top: 50%; right: 10%;
        }
        .lp-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 40px;
          animation: lp-fade-up 0.8s ease 0.2s both;
        }
        .lp-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 7.5vw, 108px);
          font-weight: 600;
          line-height: 1.06;
          color: #f5f0e8;
          max-width: 960px;
          margin: 0 0 40px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.28em;
        }
        .lp-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(32px) skewY(2deg);
          animation: lp-word-in 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
        .lp-word-italic {
          font-style: italic;
          color: #c9a84c;
          animation: lp-word-in 0.8s cubic-bezier(0.16,1,0.3,1) both,
                     lp-gold-glow 4s ease-in-out 2.5s infinite;
        }
        .lp-subhead {
          font-size: 18px;
          line-height: 1.72;
          color: rgba(245,240,232,0.5);
          max-width: 540px;
          margin: 0 0 56px;
          animation: lp-fade-up 0.9s ease 1.5s both;
        }
        .lp-hero-cta {
          display: flex; gap: 14px;
          flex-wrap: wrap; justify-content: center;
          animation: lp-fade-up 0.9s ease 1.7s both;
        }
        .lp-btn-primary {
          background: #c9a84c;
          color: #0c0b09;
          border: none;
          padding: 16px 36px;
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 600;
          letter-spacing: 0.02em;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .lp-btn-primary:hover {
          background: #dbb85c;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(201,168,76,0.4);
        }
        .lp-btn-ghost {
          background: transparent;
          color: rgba(245,240,232,0.6);
          border: 1px solid rgba(245,240,232,0.18);
          padding: 16px 36px;
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 400;
          border-radius: 6px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.15s, background 0.2s;
        }
        .lp-btn-ghost:hover {
          border-color: rgba(245,240,232,0.4);
          color: rgba(245,240,232,0.95);
          background: rgba(245,240,232,0.05);
          transform: translateY(-2px);
        }
        .lp-scroll-hint {
          position: absolute;
          bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          animation: lp-fade-up 0.8s ease 2.2s both;
        }
        .lp-scroll-hint span {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
        }
        .lp-scroll-arrow {
          width: 1px; height: 56px;
          background: linear-gradient(to bottom, rgba(201,168,76,0.7), transparent);
          animation: lp-arrow-pulse 2.2s ease-in-out infinite;
        }

        /* ─── Timeline node sustained pulse ─── */
        @keyframes tva-node-pulse {
          0%   { transform: scale(1);   opacity: 0.85; }
          70%  { transform: scale(1.7); opacity: 0.12; }
          100% { transform: scale(2.1); opacity: 0; }
        }
        .tva-node-pulse {
          animation: tva-node-pulse 1.1s ease-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        /* ─── Marquee ticker ─── */
        .lp-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(245,240,232,0.07);
          border-bottom: 1px solid rgba(245,240,232,0.07);
          padding: 18px 0;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .lp-marquee-track {
          display: flex;
          gap: 0;
          width: max-content;
          animation: lp-marquee 28s linear infinite;
        }
        .lp-marquee-item {
          display: flex; align-items: center; gap: 28px;
          padding: 0 32px;
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .lp-marquee-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #c9a84c;
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* ─── Threat → Patch ─── */
        .lp-threats-section {
          padding: 120px 48px 100px;
          max-width: 1100px;
          margin: 0 auto;
        }
        /* accordion */
        .lp-threats-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 56px;
        }
        @keyframes lp-pulse-border {
          0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.9); border-color: #c9a84c; }
          55%  { box-shadow: 0 0 0 10px rgba(201,168,76,0.2); }
          100% { box-shadow: 0 0 0 18px rgba(201,168,76,0); border-color: rgba(201,168,76,0.45); }
        }
        .lp-threat-card {
          border: 1px solid rgba(245,240,232,0.09);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          background: rgba(245,240,232,0.02);
          transition: background 0.2s;
        }
        .lp-threat-card:not(.lp-threat-open):hover {
          animation: lp-pulse-border 1.4s ease;
          background: rgba(14,12,24,0.9);
        }
        .lp-threat-card.lp-threat-open {
          border-color: rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.04);
        }
        .lp-threat-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 26px;
        }
        .lp-threat-num {
          font-size: 11px;
          font-family: 'IBM Plex Mono', monospace;
          color: rgba(201,168,76,0.45);
          min-width: 24px;
          transition: color 0.2s;
        }
        .lp-threat-card.lp-threat-open .lp-threat-num { color: #c9a84c; }
        .lp-threat-headline {
          font-size: 16px;
          font-weight: 500;
          color: rgba(245,240,232,0.72);
          flex: 1;
          transition: color 0.2s;
        }
        .lp-threat-card.lp-threat-open .lp-threat-headline { color: #f5f0e8; }
        .lp-threat-chevron {
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.14);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          transition: transform 0.25s, border-color 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .lp-threat-card.lp-threat-open .lp-threat-chevron {
          transform: rotate(180deg);
          border-color: #c9a84c;
          color: #c9a84c;
        }
        /* animated expand via grid */
        .lp-threat-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }
        .lp-threat-card.lp-threat-open .lp-threat-body {
          grid-template-rows: 1fr;
        }
        .lp-threat-body-inner { overflow: hidden; }
        .lp-threat-body-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.6);
          margin-bottom: 10px;
        }
        .lp-threat-body-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 0 26px 28px 70px;
        }
        .lp-threat-pill {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c44;
          margin-bottom: 10px;
        }
        .lp-threat-pill-dot { display: none; }
        .lp-threat-problem {
          font-size: 14px;
          color: rgba(245,240,232,0.55);
          line-height: 1.65;
          font-style: italic;
        }
        .lp-threat-arrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 10px;
          display: block;
        }
        .lp-threat-arrow::before { display: none; }
        .lp-threat-response {
          font-size: 14.5px;
          color: #f5f0e8;
          line-height: 1.65;
          font-weight: 400;
        }
        .lp-threat-annex {
          font-size: 10px;
          color: rgba(201,168,76,0.4);
          letter-spacing: 0.07em;
          font-family: 'IBM Plex Mono', monospace;
          margin-top: 12px;
          display: block;
        }

        /* ─── Instruments / Diagram ─── */
        .lp-instruments-section {
          padding: 100px 48px 120px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lp-section-head {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5.5vw, 76px);
          font-weight: 600;
          color: #f5f0e8;
          line-height: 1.08;
          margin: 24px 0 48px;
          max-width: 680px;
        }
        .lp-section-head em { font-style: italic; color: #c9a84c; }
        .lp-diagram-wrap {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(245,240,232,0.08);
          background: rgba(245,240,232,0.03);
        }
        .lp-diagram-hint {
          margin-top: 16px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.2);
          text-align: center;
        }

        /* ─── Transition zone ─── */
        .lp-transition { height: 160px; position: relative; }

        /* ─── Timeline Paths ─── */
        .lp-paths-section {
          padding: 80px 0 160px;
          width: 100%;
        }
        .lp-paths-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 24px;
          padding: 0 48px;
        }
        .lp-paths-head {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          padding: 0 48px;
          color: #f5f0e8;
          line-height: 1.08;
          margin: 0 0 16px;
        }
        .lp-paths-sub {
          font-size: 15px;
          color: rgba(245,240,232,0.38);
          margin: 0 0 48px;
          line-height: 1.6;
          padding: 0 48px;
        }

        /* ── TVA Timeline panel ── */
        .lp-timeline-wrap {
          position: relative;
          width: 100%;
          height: 560px;
          background: #0a0906;
          overflow: visible;
        }
        .lp-timeline-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        /* ── Hover card ── */
        .lp-branch-card {
          position: absolute;
          width: 272px;
          background: rgba(22,17,10,0.97);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 14px;
          overflow: hidden;
          box-shadow:
            0 24px 64px rgba(0,0,0,0.7),
            0 0 0 1px rgba(201,168,76,0.08);
          pointer-events: none;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 20;
        }
        .lp-branch-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .lp-branch-card-bar {
          height: 3px;
          background: #c9a84c;
        }
        .lp-branch-card-body { padding: 16px 18px 0; }
        .lp-branch-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .lp-branch-card-title {
          font-size: 17px; font-weight: 700;
          color: #f5f0e8;
          display: flex; align-items: center; gap: 8px;
        }
        .lp-branch-card-time {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px; letter-spacing: 0.06em;
          color: rgba(201,168,76,0.6);
          background: rgba(201,168,76,0.08);
          border-radius: 100px;
          padding: 3px 8px;
          white-space: nowrap;
        }
        .lp-branch-card-desc {
          font-size: 12.5px; line-height: 1.6;
          color: rgba(245,240,232,0.5);
          margin-bottom: 14px;
        }
        .lp-branch-card-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 18px;
          background: rgba(201,168,76,0.09);
          font-size: 12px; font-weight: 600;
          color: #c9a84c;
          border-top: 1px solid rgba(201,168,76,0.1);
        }

        .lp-skip {
          text-align: center; margin-top: 32px; padding: 0 48px;
        }
        .lp-skip button {
          background: none; border: none;
          font-size: 13px;
          color: rgba(245,240,232,0.25);
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .lp-skip button:hover { color: rgba(245,240,232,0.5); }

        /* ─── Reveal system ─── */
        .lp-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .lp-reveal.lp-visible { opacity: 1; transform: none; }
        .lp-reveal-left {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .lp-reveal-left.lp-visible { opacity: 1; transform: none; }
        .lp-d1 { transition-delay: 0.06s; }
        .lp-d2 { transition-delay: 0.13s; }
        .lp-d3 { transition-delay: 0.20s; }
        .lp-d4 { transition-delay: 0.28s; }
        .lp-d5 { transition-delay: 0.36s; }

        /* ─── Keyframes ─── */
        @keyframes lp-word-in {
          to { opacity: 1; transform: none; }
        }
        @keyframes lp-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes lp-arrow-pulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50%       { opacity: 1;    transform: scaleY(1.2); }
        }
        @keyframes lp-gold-glow {
          0%, 100% { text-shadow: none; }
          50%       { text-shadow: 0 0 36px rgba(201,168,76,0.5), 0 0 72px rgba(201,168,76,0.18); }
        }
        @keyframes lp-grain-drift {
          0%   { transform: translate(0,0); }
          20%  { transform: translate(-2px,3px); }
          40%  { transform: translate(3px,-1px); }
          60%  { transform: translate(-1px,2px); }
          80%  { transform: translate(2px,-3px); }
          100% { transform: translate(0,0); }
        }
        @keyframes lp-shimmer {
          0%,100% { opacity: 0.018; }
          50%      { opacity: 0.034; }
        }
        @keyframes lp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tva-node-ring-pulse {
          0%   { r: 8;  opacity: 0.55; }
          60%  { r: 16; opacity: 0; }
          100% { r: 8;  opacity: 0; }
        }
        .tva-node-ring {
          animation: tva-node-ring-pulse 2.4s ease-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        /* ─── Mobile ─── */
        @media (max-width: 640px) {
          .lp-hero { padding: 80px 24px 60px; justify-content: flex-start;
            padding-top: max(80px, env(safe-area-inset-top, 0px) + 60px); }
          .lp-subhead { margin-bottom: 36px; }
          .lp-hero-cta { flex-direction: column; width: 100%; }
          .lp-btn-primary, .lp-btn-ghost { width: 100%; padding: 15px 24px; }
          .lp-threats-section { padding: 72px 24px; }
          .lp-threats-list { gap: 4px; margin-top: 40px; }
          .lp-threat-body-content { grid-template-columns: 1fr; gap: 16px; padding: 0 20px 24px 20px; }
          .lp-stat { padding: 28px 0; border-right: none;
            border-bottom: 1px solid rgba(245,240,232,0.08); }
          .lp-stat:nth-child(2) { padding: 28px 0; }
          .lp-stat:last-child { padding-left: 0; border-bottom: none; }
          .lp-stat-num { font-size: 72px; }
          .lp-instruments-section { padding: 64px 24px; }
          .lp-section-head { margin-bottom: 32px; }
          .lp-paths-section { padding: 72px 0 100px; }
          .lp-paths-eyebrow, .lp-paths-head, .lp-paths-sub, .lp-skip { padding-left: 20px; padding-right: 20px; }
          .lp-paths-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .lp-path-card { padding: 18px 14px 16px; }
          .lp-nav { display: none; }
        }
        @media (max-width: 400px) {
          .lp-paths-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .lp-instrument { grid-template-columns: 48px 1fr; }
          .lp-instrument-desc { display: none; }
        }
      `}</style>

      {/* Grain */}
      <div className="lp-grain" />

      {/* Floating nav */}
      <nav className={`lp-nav${navVisible ? ' lp-nav-visible' : ''}`}>
        <span className="lp-nav-logo"><Logo size={20} color="rgba(245,240,232,0.5)" /></span>
        <span className="lp-nav-sep" />
        <button className="lp-nav-ghost" onClick={() => {
          document.getElementById('lp-paths-anchor')?.scrollIntoView({ behavior: 'smooth' })
        }}>Reading Paths</button>
        <button className="lp-nav-btn" onClick={() => handleEnter()}>Open Reader</button>
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="lp-hero"
        style={{ opacity: heroOpacity }}
      >
        {/* Parallax orbs */}
        <div className="lp-hero-orb lp-hero-orb-1" style={{
          transform: `translate(${mouseX * 18}px, ${mouseY * 18 + heroParallax * 0.15}px)`,
        }} />
        <div className="lp-hero-orb lp-hero-orb-2" style={{
          transform: `translate(${mouseX * -12}px, ${mouseY * -12 + heroParallax * 0.08}px)`,
        }} />
        <div className="lp-hero-orb lp-hero-orb-3" style={{
          transform: `translate(${mouseX * 8}px, ${mouseY * 8}px)`,
        }} />

        {/* Logo */}
        <div style={{
          marginBottom: 36,
          animation: 'lp-fade-up 1s ease 0s both',
          transform: `translateY(${heroParallax * -0.12}px)`,
          position: 'relative', zIndex: 1,
        }}>
          <Logo size={110} color="#b8b4ae" gold="#c9a84c" />
        </div>

        <p className="lp-eyebrow" style={{ position: 'relative', zIndex: 1 }}>Open Constitutional Design</p>

        <h1 className="lp-headline" style={{
          transform: `translateY(${heroParallax * -0.08}px)`,
          position: 'relative', zIndex: 1,
        }}>
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className={`lp-word${word === 'design?' ? ' lp-word-italic' : ''}`}
              style={{ animationDelay: `${0.3 + i * 0.09}s` }}
            >{word}</span>
          ))}
        </h1>

        <p className="lp-subhead" style={{ position: 'relative', zIndex: 1 }}>
          The Humane Constitution is an open-source design for a society where
          basic needs, markets, and public power are separated so wealth cannot
          quietly become control.
        </p>

        <div className="lp-hero-cta" style={{ position: 'relative', zIndex: 1 }}>
          {returningVisitor ? (
            <button className="lp-btn-primary" onClick={() => handleEnter()}>← Back to Reader</button>
          ) : (
            <>
              <button className="lp-btn-primary" onClick={() => {
                document.getElementById('lp-paths-anchor')?.scrollIntoView({ behavior: 'smooth' })
              }}>Choose a Reading Path</button>
              <button className="lp-btn-ghost" onClick={() => handleEnter()}>Open Full Reader</button>
            </>
          )}
        </div>

        <div className="lp-scroll-hint">
          <span>Scroll</span>
          <div className="lp-scroll-arrow" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="lp-marquee-wrap" style={{ opacity: Math.max(0, 1 - scrollY / (window.innerHeight * 0.5)) }}>
        <div className="lp-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="lp-marquee-item">
              {item}
              <span className="lp-marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── THREAT → PATCH ── */}
      <div className="lp-threats-section">
        <p className="lp-reveal lp-eyebrow" style={{ color: '#c9a84c' }}>Designed against failure</p>
        <h2 className="lp-section-head lp-reveal" style={{ fontSize: 'clamp(32px, 4vw, 58px)', marginBottom: 0 }}>
          Real problems.<br /><em>Constitutional responses.</em>
        </h2>
        <div className="lp-threats-list">
          {[
            {
              num: '01',
              headline: 'Rent that prices you out',
              problem: 'Your landlord raises rent 30% because the neighborhood got popular. You can\'t afford to stay and can\'t afford to move somewhere better.',
              response: 'Housing is part of Essential Access — unconditional and non-convertible. No entity, public or private, may use shelter as financial leverage.',
              annex: 'INVARIANTS · INV-001',
            },
            {
              num: '02',
              headline: 'One bill wipes you out',
              problem: 'A single hospital visit — yours, or your kid\'s — erases years of savings and follows you as debt for decades.',
              response: 'Healthcare sits beneath the market. It cannot be priced, gated, or revoked for inability to pay. The floor is constitutionally fixed, not budget-dependent.',
              annex: 'INVARIANTS · INV-001',
            },
            {
              num: '03',
              headline: 'Your vote vs. their donation',
              problem: 'A corporation\'s annual lobbying budget exceeds your lifetime earnings. Elected officials return their calls first.',
              response: 'Voice is a separate instrument that cannot be purchased. It cannot be accumulated without contribution and decays over time to prevent permanent influence.',
              annex: 'ANNEX Z · §Z2',
            },
            {
              num: '04',
              headline: 'Born rich, stay rich',
              problem: 'Someone who inherited a portfolio at 25 has more security at 50 than someone who worked two jobs and raised a family.',
              response: 'Wealth that isn\'t continuously earned through contribution decays toward a participation floor. Passive accumulation across generations carries a structural cost.',
              annex: 'ANNEX AZ · §AZ3',
            },
            {
              num: '05',
              headline: 'Lose your job, lose everything',
              problem: 'Employment is the only thread connecting you to healthcare, housing stability, and financial survival. Cut the thread and everything falls.',
              response: 'Essential Access is decoupled from employment. Food, shelter, healthcare, and a basic income floor exist outside the labor market — not as charity, but as constitutional right.',
              annex: 'ANNEX AC · §AC2',
            },
            {
              num: '06',
              headline: 'Emergency powers that never end',
              problem: 'A crisis justifies new government powers. The crisis passes. The powers don\'t.',
              response: 'Emergency provisions carry mandatory unwind clauses. They cannot self-extend, cannot waive other protections, and require oracle-verified conditions to stay active.',
              annex: 'ANNEX AC · §AC4',
            },
          ].map((item, i) => {
            const isOpen = openThreatIdx === i
            return (
              <div
                key={i}
                className={`lp-threat-card lp-reveal lp-d${(i % 3) + 1}${isOpen ? ' lp-threat-open' : ''}`}
                onClick={() => setOpenThreatIdx(isOpen ? null : i)}
              >
                <div className="lp-threat-header">
                  <span className="lp-threat-num">{item.num}</span>
                  <span className="lp-threat-headline">{item.headline}</span>
                  <span className="lp-threat-chevron">{isOpen ? '▴' : '▾'}</span>
                </div>
                <div className="lp-threat-body">
                  <div className="lp-threat-body-inner">
                    <div className="lp-threat-body-content">
                      <div>
                        <p className="lp-threat-body-label">The problem</p>
                        <p className="lp-threat-problem">"{item.problem}"</p>
                      </div>
                      <div>
                        <p className="lp-threat-body-label">Constitutional response</p>
                        <p className="lp-threat-response">{item.response}</p>
                        <span className="lp-threat-annex">{item.annex}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── INSTRUMENTS DIAGRAM ── */}
      <div className="lp-instruments-section">
        <p className="lp-reveal lp-eyebrow" style={{ color: '#c9a84c' }}>The Design</p>
        <h2 className="lp-section-head lp-reveal">
          Five interlocking instruments.<br />
          <em>One coherent system.</em>
        </h2>
        <div className="lp-reveal lp-diagram-wrap">
          <V001_FiveToolSeparation onInternalLink={() => {}} />
        </div>
        <p className="lp-diagram-hint">Click any instrument to explore its definition</p>
      </div>

      {/* ── TRANSITION + PATHS ── */}
      <div ref={transitionRef} className="lp-transition" id="lp-paths-anchor" />

      <div className="lp-reveal lp-paths-section">
        <p className="lp-paths-eyebrow">Reading Paths</p>
        <h2 className="lp-paths-head">Choose your path.</h2>
        <p className="lp-paths-sub">Nine entry points into the corpus. Hover a branch to preview — click to begin.</p>
        <TimelinePanel paths={PATHS} onSelect={handleEnter} />
        <div className="lp-skip">
          <button onClick={() => handleEnter()}>
            Skip — open the full reader without a path
          </button>
        </div>
      </div>

    </div>
  )
}
