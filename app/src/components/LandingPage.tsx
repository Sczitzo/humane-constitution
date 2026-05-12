import { useEffect, useRef, useState, useCallback } from 'react'
import { Logo } from './Logo'

const PATHS = [
  { id: 'first-time', emoji: '🌱', title: 'First-Time Reader', desc: 'New to the project? Start with ordinary lives, rights, and the plain case.', time: '~20 min', color: '#2d6a4f' },
  { id: 'skeptic', emoji: '🔍', title: 'The Skeptic', desc: 'Challenge the framework. Examine failure modes, patches, and evidence.', time: '~25 min', color: '#1a3a5c' },
  { id: 'implementer', emoji: '📐', title: 'Implementer', desc: 'Specifications, acceptance criteria, deployment requirements.', time: '~35 min', color: '#4a1c40' },
  { id: 'economic-instruments', emoji: '💰', title: 'Economic Instruments', desc: 'Flow, Essential Access, Voice, Service Record, and shortage rules.', time: '~30 min', color: '#5c3d00' },
  { id: 'founding-order', emoji: '🏛️', title: 'Founding Order', desc: 'Governance structures and institutions that underpin the system.', time: '~25 min', color: '#1c3040' },
  { id: 'pilot-deployment', emoji: '🚀', title: 'Pilot Readiness', desc: 'Readiness assessment, pilot gates, and evidence roadmap.', time: '~30 min', color: '#3d1a1a' },
  { id: 'identity-personhood', emoji: '🪪', title: 'Identity & Personhood', desc: 'Personhood rights, identity recovery, and moral status.', time: '~20 min', color: '#1a3040' },
  { id: 'architectural-integrity', emoji: '🏗️', title: 'Architectural Integrity', desc: 'Hash chains, amendment locks, implementation binding, and drift checks.', time: '~25 min', color: '#2d1a4a' },
  { id: 'governance-deep', emoji: '🗳️', title: 'Governance Deep Dive', desc: 'Full trail: threats, patches, resolutions, disclosures.', time: '~40 min', color: '#1a2d1a' },
]

const INSTRUMENTS = [
  { label: 'Flow', desc: 'Ordinary money for markets, wages, contracts, saving, and business', num: '01', accent: '#c9a84c' },
  { label: 'Essential Access', desc: 'The basic needs floor — never cash, never collateral, never patronage', num: '02', accent: '#6fa86f' },
  { label: 'Voice', desc: 'Bounded civic priority-setting that cannot buy goods, rights, or protection', num: '03', accent: '#7eb8c9' },
  { label: 'Service Record', desc: 'Verified stewardship for rotating roles — not a score of human worth', num: '04', accent: '#c97e6f' },
  { label: 'Shared Storehouse', desc: 'Temporary rationing during verified shortage, not normal life', num: '05', accent: '#a08fc9' },
]

const STATS = [
  { raw: 90, suffix: '+', label: 'Documents in the corpus' },
  { raw: 5,  suffix: '',  label: 'Interlocking instruments' },
  { raw: 100, suffix: '%', label: 'Open source, CC BY 4.0' },
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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [statCounts, setStatCounts] = useState([0, 0, 0])
  const [statsVisible, setStatsVisible] = useState(false)
  const [, setHoveredInstrument] = useState<number | null>(null)
  const [navVisible, setNavVisible] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const transitionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
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

  // Stats count-up
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!statsVisible) return
    const targets = STATS.map((s) => s.raw)
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 4)
      setStatCounts(targets.map((v) => Math.round(v * ease)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [statsVisible])

  const handleEnter = useCallback((pathId?: string) => {
    setExiting(true)
    setTimeout(() => onEnter(pathId), 600)
  }, [onEnter])

  const heroParallax = Math.min(scrollY * 0.35, window.innerHeight * 0.5)
  const heroOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.65))

  // Smooth bg interpolation: forest → parchment
  const bgR = Math.round(12 + (243 - 12) * scrollProgress)
  const bgG = Math.round(11 + (237 - 11) * scrollProgress)
  const bgB = Math.round(9  + (228 -  9) * scrollProgress)

  return (
    <div
      className={`lp-root${exiting ? ' lp-exit' : ''}`}
      style={{ backgroundColor: `rgb(${bgR},${bgG},${bgB})` }}
    >
      <style>{`
        /* ─── Reset / Root ─── */
        .lp-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: clip;
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

        /* ─── Stats ─── */
        .lp-stats-section {
          padding: 120px 48px 100px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lp-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          margin-top: 56px;
        }
        .lp-stat {
          padding: 0 56px 0 0;
          border-right: 1px solid rgba(245,240,232,0.08);
        }
        .lp-stat:last-child { border-right: none; padding-right: 0; padding-left: 56px; }
        .lp-stat:nth-child(2) { padding: 0 56px; }
        .lp-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 96px; font-weight: 300;
          color: #f5f0e8; line-height: 1;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }
        .lp-stat-label {
          font-size: 13px;
          color: rgba(245,240,232,0.38);
          line-height: 1.6;
          letter-spacing: 0.01em;
        }

        /* ─── Instruments ─── */
        .lp-instruments-section {
          padding: 120px 48px 140px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lp-section-head {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5.5vw, 76px);
          font-weight: 600;
          color: #f5f0e8;
          line-height: 1.08;
          margin: 24px 0 80px;
          max-width: 680px;
        }
        .lp-section-head em { font-style: italic; color: #c9a84c; }
        .lp-instruments-list {
          display: flex; flex-direction: column; gap: 0;
        }
        .lp-instrument {
          display: grid;
          grid-template-columns: 56px 1fr 1fr;
          align-items: center;
          gap: 40px;
          padding: 32px 0;
          border-bottom: 1px solid rgba(245,240,232,0.07);
          cursor: default;
          transition: background 0.3s;
          position: relative;
        }
        .lp-instrument::after {
          content: '';
          position: absolute;
          left: 0; bottom: -1px;
          width: 0; height: 1px;
          background: var(--inst-accent, #c9a84c);
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .lp-instrument:hover::after { width: 100%; }
        .lp-instrument:first-child { border-top: 1px solid rgba(245,240,232,0.07); }
        .lp-instrument-num {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(245,240,232,0.2);
          letter-spacing: 0.12em;
        }
        .lp-instrument-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 500;
          color: #f5f0e8;
          transition: color 0.3s;
        }
        .lp-instrument:hover .lp-instrument-label {
          color: var(--inst-accent, #c9a84c);
        }
        .lp-instrument-desc {
          font-size: 14px;
          color: rgba(245,240,232,0.4);
          line-height: 1.6;
          opacity: 0;
          transform: translateX(12px);
          transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1),
                      transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .lp-instrument:hover .lp-instrument-desc {
          opacity: 1;
          transform: none;
        }

        /* ─── Transition zone ─── */
        .lp-transition { height: 160px; position: relative; }

        /* ─── Paths ─── */
        .lp-paths-section {
          padding: 120px 48px 160px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .lp-paths-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 24px;
        }
        .lp-paths-head {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5.5vw, 76px);
          font-weight: 600;
          color: #1a1a1c;
          line-height: 1.08;
          margin: 0 0 16px;
        }
        .lp-paths-sub {
          font-size: 16px; color: #6b7280;
          margin: 0 0 64px; line-height: 1.6;
        }
        .lp-paths-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .lp-path-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 28px 26px 24px;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34,1.3,0.64,1),
                      box-shadow 0.4s cubic-bezier(0.34,1.3,0.64,1),
                      border-color 0.3s;
          text-align: left;
          display: flex; flex-direction: column;
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.05);
        }
        .lp-path-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, color-mix(in srgb, var(--card-color) 6%, transparent), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .lp-path-card:hover {
          transform: translateY(-8px) scale(1.018);
          box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 24px 56px rgba(0,0,0,0.13);
          border-color: color-mix(in srgb, var(--card-color) 25%, transparent);
        }
        .lp-path-card:hover::before { opacity: 1; }
        .lp-path-card:active {
          transform: scale(0.97);
          transition-duration: 0.1s;
        }
        .lp-path-emoji-wrap {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: color-mix(in srgb, var(--card-color) 12%, #f5f5f7);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; font-size: 22px;
          transition: transform 0.35s cubic-bezier(0.34,1.3,0.64,1);
        }
        .lp-path-card:hover .lp-path-emoji-wrap {
          transform: scale(1.1) rotate(-4deg);
        }
        .lp-path-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600;
          color: #1d1d1f; line-height: 1.2;
          margin-bottom: 6px;
        }
        .lp-path-time {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em;
          color: color-mix(in srgb, var(--card-color) 80%, #6e6e73);
          margin-bottom: 14px;
        }
        .lp-path-desc {
          font-size: 13.5px; line-height: 1.55;
          color: #6e6e73; flex: 1;
        }
        .lp-path-arrow {
          align-self: flex-end; margin-top: 20px;
          font-size: 15px;
          color: color-mix(in srgb, var(--card-color) 90%, #6e6e73);
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.25s, transform 0.3s cubic-bezier(0.34,1.3,0.64,1);
        }
        .lp-path-card:hover .lp-path-arrow {
          opacity: 0.8;
          transform: translateX(0);
        }
        .lp-skip {
          text-align: center; margin-top: 48px;
        }
        .lp-skip button {
          background: none; border: none;
          font-size: 14px; color: #9ca3af;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .lp-skip button:hover { color: #4b5563; }

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

        /* ─── Mobile ─── */
        @media (max-width: 640px) {
          .lp-hero { padding: 80px 24px 60px; justify-content: flex-start;
            padding-top: max(80px, env(safe-area-inset-top, 0px) + 60px); }
          .lp-subhead { margin-bottom: 36px; }
          .lp-hero-cta { flex-direction: column; width: 100%; }
          .lp-btn-primary, .lp-btn-ghost { width: 100%; padding: 15px 24px; }
          .lp-stats-section { padding: 72px 24px; }
          .lp-stats-grid { grid-template-columns: 1fr; gap: 0; margin-top: 40px; }
          .lp-stat { padding: 28px 0; border-right: none;
            border-bottom: 1px solid rgba(245,240,232,0.08); }
          .lp-stat:nth-child(2) { padding: 28px 0; }
          .lp-stat:last-child { padding-left: 0; border-bottom: none; }
          .lp-stat-num { font-size: 72px; }
          .lp-instruments-section { padding: 64px 24px; }
          .lp-instrument { grid-template-columns: 40px 1fr; gap: 16px; padding: 22px 0; }
          .lp-instrument-desc { display: none; }
          .lp-instrument:hover .lp-instrument-desc { display: none; }
          .lp-section-head { margin-bottom: 48px; }
          .lp-paths-section { padding: 72px 20px 100px; }
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

      {/* ── STATS ── */}
      <div className="lp-stats-section" ref={statsRef}>
        <p className="lp-reveal lp-eyebrow" style={{ color: '#c9a84c' }}>By the numbers</p>
        <div className="lp-stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className={`lp-stat lp-reveal lp-d${i + 1}`}>
              <div className="lp-stat-num">
                {statsVisible ? statCounts[i] : 0}{s.suffix}
              </div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INSTRUMENTS ── */}
      <div className="lp-instruments-section">
        <p className="lp-reveal lp-eyebrow" style={{ color: '#c9a84c' }}>The Design</p>
        <h2 className="lp-section-head lp-reveal">
          Five interlocking instruments.<br />
          <em>One coherent system.</em>
        </h2>
        <div className="lp-instruments-list">
          {INSTRUMENTS.map((inst, i) => (
            <div
              key={i}
              className={`lp-instrument lp-reveal lp-d${i + 1}`}
              style={{ '--inst-accent': inst.accent } as React.CSSProperties}
              onMouseEnter={() => setHoveredInstrument(i)}
              onMouseLeave={() => setHoveredInstrument(null)}
            >
              <span className="lp-instrument-num">{inst.num}</span>
              <span className="lp-instrument-label">{inst.label}</span>
              <span className="lp-instrument-desc">{inst.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRANSITION + PATHS ── */}
      <div ref={transitionRef} className="lp-transition" id="lp-paths-anchor" />

      <div className="lp-reveal lp-paths-section">
        <p className="lp-paths-eyebrow">Reading Paths</p>
        <h2 className="lp-paths-head">Choose your path.</h2>
        <p className="lp-paths-sub">Each path takes 10–40 minutes. Switch anytime inside the reader.</p>

        <div className="lp-paths-grid">
          {PATHS.map((path, i) => (
            <button
              key={path.id}
              className={`lp-path-card lp-reveal lp-d${Math.min(i % 3 + 1, 5)}`}
              style={{ '--card-color': path.color } as React.CSSProperties}
              onClick={() => handleEnter(path.id)}
            >
              <div className="lp-path-emoji-wrap">{path.emoji}</div>
              <div className="lp-path-title">{path.title}</div>
              <div className="lp-path-time">{path.time}</div>
              <div className="lp-path-desc">{path.desc}</div>
              <span className="lp-path-arrow">→</span>
            </button>
          ))}
        </div>

        <div className="lp-skip">
          <button onClick={() => handleEnter()}>
            Skip — open the full reader without a path
          </button>
        </div>
      </div>

    </div>
  )
}
