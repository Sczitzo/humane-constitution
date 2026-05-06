import { useEffect, useRef, useState, useCallback } from 'react'
import { Logo } from './Logo'

const PATHS = [
  { id: 'first-time', emoji: '🌱', title: 'First-Time Reader', desc: 'New to AI governance? Start here. Plain language, essential ideas.', time: '~15 min', color: '#2d6a4f' },
  { id: 'skeptic', emoji: '🔍', title: 'The Skeptic', desc: 'Challenge the framework. Examine failure modes, patches, and evidence.', time: '~25 min', color: '#1a3a5c' },
  { id: 'implementer', emoji: '📐', title: 'Implementer', desc: 'Specifications, acceptance criteria, deployment requirements.', time: '~35 min', color: '#4a1c40' },
  { id: 'economic-instruments', emoji: '💰', title: 'Economic Instruments', desc: 'Financial mechanisms that enforce constitutional compliance.', time: '~30 min', color: '#5c3d00' },
  { id: 'founding-order', emoji: '🏛️', title: 'Founding Order', desc: 'Governance structures and institutions that underpin the system.', time: '~25 min', color: '#1c3040' },
  { id: 'pilot-deployment', emoji: '🚀', title: 'Pilot Deployment', desc: 'Readiness assessment, MVP stack, and evidence roadmap.', time: '~30 min', color: '#3d1a1a' },
  { id: 'identity-personhood', emoji: '🪪', title: 'Identity & Personhood', desc: 'Personhood rights, identity recovery, and moral status.', time: '~20 min', color: '#1a3040' },
  { id: 'architectural-integrity', emoji: '🏗️', title: 'Architectural Integrity', desc: 'System architecture, multi-agent protocols, sandboxing.', time: '~25 min', color: '#2d1a4a' },
  { id: 'governance-deep', emoji: '🗳️', title: 'Governance Deep Dive', desc: 'Full trail: threats, patches, resolutions, disclosures.', time: '~40 min', color: '#1a2d1a' },
]

const INSTRUMENTS = [
  { label: 'Threat Register', desc: 'Every documented failure mode', num: '01' },
  { label: 'Patch Log', desc: 'Every fix & amendment', num: '02' },
  { label: 'Constitutional Clauses', desc: 'Binding rules & rights', num: '03' },
  { label: 'Annexes', desc: 'Full implementation text', num: '04' },
  { label: 'Acceptance Protocol', desc: 'Audit & validation criteria', num: '05' },
]

const STATS = [
  { raw: 90, suffix: '+', label: 'Documents in the corpus — threats, patches, annexes, and constitutional text' },
  { raw: 5,  suffix: '',  label: 'Interlocking governance instruments that form a coherent system' },
  { raw: 100, suffix: '%', label: 'Open source, CC BY 4.0 licensed, with a public audit trail' },
]

const HEADLINE_WORDS = ['What', 'if', 'AI', 'had', 'a', 'constitution', 'that', 'protected', 'you', 'by', 'design?']

interface LandingPageProps {
  onEnter: (pathId?: string) => void
  returningVisitor?: boolean
}

export function LandingPage({ onEnter, returningVisitor = false }: LandingPageProps) {
  const [exiting, setExiting] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [openInstrument, setOpenInstrument] = useState<number | null>(null)
  const [statCounts, setStatCounts] = useState([0, 0, 0])
  const [statsVisible, setStatsVisible] = useState(false)

  const transitionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Scroll-driven transition progress
  useEffect(() => {
    const onScroll = () => {
      const el = transitionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh * 0.5)))
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reveal IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('lp-visible')
        })
      },
      { threshold: 0.01 }
    )
    document.querySelectorAll('.lp-reveal').forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  // Stats count-up trigger
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
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setStatCounts(targets.map((v) => Math.round(v * ease)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [statsVisible])

  const handleEnter = useCallback((pathId?: string) => {
    setExiting(true)
    setTimeout(() => onEnter(pathId), 600)
  }, [onEnter])

  const bgR = Math.round(12 + (245 - 12) * scrollProgress)
  const bgG = Math.round(11 + (240 - 11) * scrollProgress)
  const bgB = Math.round(9 + (232 - 9) * scrollProgress)
  const bgColor = `rgb(${bgR},${bgG},${bgB})`
  const textOpacity = Math.max(0, 1 - scrollProgress * 2)

  return (
    <div
      ref={containerRef}
      className={`lp-root${exiting ? ' lp-exit' : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      <style>{`
        /* ── Landing Page Scoped Styles ── */
        .lp-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: clip;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .lp-exit {
          opacity: 0;
          transform: scale(0.98);
          pointer-events: none;
        }

        /* ── Reveal animations ── */
        .lp-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .lp-reveal.lp-visible { opacity: 1; transform: none; }
        .lp-reveal-delay-1 { transition-delay: 0.08s; }
        .lp-reveal-delay-2 { transition-delay: 0.16s; }
        .lp-reveal-delay-3 { transition-delay: 0.24s; }
        .lp-reveal-delay-4 { transition-delay: 0.32s; }
        .lp-reveal-delay-5 { transition-delay: 0.40s; }

        /* ── Hero ── */
        .lp-hero {
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 48px;
          text-align: center;
          position: relative;
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
          font-size: clamp(44px, 7vw, 96px);
          font-weight: 600;
          line-height: 1.08;
          color: #f5f0e8;
          max-width: 900px;
          margin: 0 0 40px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.28em;
        }
        .lp-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px);
          animation: lp-word-in 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .lp-word-italic {
          font-style: italic;
          color: #c9a84c;
          animation: lp-word-in 0.7s cubic-bezier(0.16,1,0.3,1) both,
                     lp-gold-glow 4s ease-in-out 2.5s infinite;
        }
        .lp-subhead {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(245,240,232,0.55);
          max-width: 560px;
          margin: 0 0 56px;
          animation: lp-fade-up 0.8s ease 1.4s both;
        }
        .lp-hero-cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          animation: lp-fade-up 0.8s ease 1.6s both;
        }
        .lp-btn-primary {
          background: #c9a84c;
          color: #0c0b09;
          border: none;
          padding: 16px 36px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.02em;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .lp-btn-primary:hover {
          background: #dbb85c;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.35);
        }
        .lp-btn-ghost {
          background: transparent;
          color: rgba(245,240,232,0.65);
          border: 1px solid rgba(245,240,232,0.2);
          padding: 16px 36px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 400;
          border-radius: 4px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .lp-btn-ghost:hover {
          border-color: rgba(245,240,232,0.5);
          color: rgba(245,240,232,0.9);
          transform: translateY(-2px);
        }
        .lp-scroll-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: lp-fade-up 0.8s ease 2s both;
        }
        .lp-scroll-hint span {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
        }
        .lp-scroll-arrow {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, rgba(201,168,76,0.6), transparent);
          animation: lp-arrow-pulse 2s ease-in-out infinite;
        }

        /* ── Stats section ── */
        .lp-stats {
          padding: 140px 48px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lp-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          margin-top: 48px;
        }
        .lp-stat {
          padding: 0 48px 0 0;
          border-right: 1px solid rgba(245,240,232,0.1);
        }
        .lp-stat:last-child { border-right: none; padding-right: 0; padding-left: 48px; }
        .lp-stat:nth-child(2) { padding: 0 48px; }
        .lp-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          font-weight: 300;
          color: #f5f0e8;
          line-height: 1;
          margin-bottom: 16px;
          transition: color 0.3s;
        }
        .lp-stat-label {
          font-size: 14px;
          color: rgba(245,240,232,0.45);
          line-height: 1.5;
        }
        .lp-stats-swipe-hint {
          display: none;
        }

        /* ── Instruments section ── */
        .lp-instruments {
          padding: 140px 48px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lp-section-head {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 68px);
          font-weight: 600;
          color: #f5f0e8;
          line-height: 1.1;
          margin: 24px 0 80px;
          max-width: 700px;
        }
        .lp-section-head em {
          font-style: italic;
          color: #c9a84c;
        }
        .lp-instruments-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .lp-instrument {
          display: grid;
          grid-template-columns: 64px 1fr auto;
          grid-template-rows: auto;
          align-items: center;
          gap: 32px;
          padding: 28px 0;
          border-bottom: 1px solid rgba(245,240,232,0.08);
          transition: background 0.2s;
        }
        .lp-instrument:first-child { border-top: 1px solid rgba(245,240,232,0.08); }
        .lp-instrument:hover .lp-instrument-label { color: #c9a84c; }
        .lp-instrument-num {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: rgba(245,240,232,0.25);
          letter-spacing: 0.1em;
        }
        .lp-instrument-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 500;
          color: #f5f0e8;
          transition: color 0.3s;
        }
        .lp-instrument-desc {
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          color: rgba(245,240,232,0.55);
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lp-instrument-chevron {
          display: none;
          font-size: 22px;
          color: rgba(245,240,232,0.3);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.2s;
          line-height: 1;
          user-select: none;
        }
        .lp-instrument-expand {
          display: none;
        }

        /* ── Transition zone ── */
        .lp-transition {
          height: 160px;
          position: relative;
        }

        /* ── Paths section ── */
        .lp-paths {
          padding: 140px 48px 180px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .lp-paths-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a3a5c;
          margin-bottom: 24px;
        }
        .lp-paths-head {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 68px);
          font-weight: 600;
          color: #1a1a1c;
          line-height: 1.1;
          margin: 0 0 16px;
        }
        .lp-paths-sub {
          font-size: 16px;
          color: #6b7280;
          margin: 0 0 72px;
        }
        .lp-paths-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .lp-path-card {
          background: #fff;
          border: none;
          border-radius: 16px;
          padding: 28px 28px 24px;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.34,1.4,0.64,1),
                      box-shadow 0.35s cubic-bezier(0.34,1.4,0.64,1);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06);
        }
        .lp-path-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.11);
        }
        .lp-path-card:active {
          transform: scale(0.98);
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          transition-duration: 0.1s;
        }
        .lp-path-emoji-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: color-mix(in srgb, var(--card-color) 10%, #f5f5f7);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 22px;
        }
        .lp-path-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #1d1d1f;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .lp-path-time {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: color-mix(in srgb, var(--card-color) 80%, #6e6e73);
          margin-bottom: 14px;
        }
        .lp-path-desc {
          font-size: 14px;
          line-height: 1.55;
          color: #6e6e73;
          flex: 1;
        }
        .lp-path-arrow {
          align-self: flex-end;
          margin-top: 18px;
          font-size: 14px;
          color: color-mix(in srgb, var(--card-color) 90%, #6e6e73);
          opacity: 0.6;
          transition: opacity 0.2s, transform 0.25s cubic-bezier(0.34,1.4,0.64,1);
        }
        .lp-path-card:hover .lp-path-arrow {
          opacity: 1;
          transform: translateX(3px);
        }
        .lp-path-num { display: none;
        }
        .lp-skip {
          text-align: center;
          margin-top: 48px;
        }
        .lp-skip button {
          background: none;
          border: none;
          font-size: 14px;
          color: #9ca3af;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .lp-skip button:hover { color: #4b5563; }

        /* ── Keyframes ── */
        @keyframes lp-word-in {
          to { opacity: 1; transform: none; }
        }
        @keyframes lp-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes lp-arrow-pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.18); }
        }
        @keyframes lp-gold-glow {
          0%, 100% { text-shadow: none; }
          50% { text-shadow: 0 0 32px rgba(201,168,76,0.45), 0 0 64px rgba(201,168,76,0.15); }
        }
        @keyframes lp-grain-drift {
          0%   { transform: translate(0, 0); }
          20%  { transform: translate(-2px, 3px); }
          40%  { transform: translate(3px, -1px); }
          60%  { transform: translate(-1px, 2px); }
          80%  { transform: translate(2px, -3px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes lp-shimmer {
          0%   { opacity: 0.018; }
          50%  { opacity: 0.032; }
          100% { opacity: 0.018; }
        }

        /* ── Grain overlay ── */
        .lp-grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          animation: lp-grain-drift 0.5s steps(1) infinite, lp-shimmer 6s ease-in-out infinite;
        }

        /* ════════════════════════════════════════
           MOBILE — max-width: 640px
           ════════════════════════════════════════ */
        @media (max-width: 640px) {

          /* Hero */
          .lp-hero {
            padding: 80px 24px 60px;
            justify-content: flex-start;
            padding-top: max(80px, env(safe-area-inset-top, 0px) + 60px);
          }
          .lp-eyebrow {
            margin-bottom: 20px;
          }
          .lp-subhead {
            margin-bottom: 36px;
            line-height: 1.65;
          }
          .lp-hero-cta {
            flex-direction: column;
            width: 100%;
            max-width: 100%;
            gap: 12px;
          }
          .lp-btn-primary {
            width: 100%;
            padding: 15px 24px;
          }
          .lp-btn-ghost {
            width: 100%;
            padding: 13px 24px;
          }
          .lp-scroll-hint {
            bottom: 24px;
          }
          .lp-scroll-arrow {
            height: 32px;
          }

          /* Stats — vertical stack */
          .lp-stats {
            padding: 72px 24px;
            max-width: 100%;
          }
          .lp-stats-grid {
            display: flex;
            flex-direction: column;
            overflow-x: visible;
            gap: 0;
            margin-top: 40px;
          }
          .lp-stat {
            flex: none;
            padding: 28px 0;
            border-right: none;
            border-bottom: 1px solid rgba(245,240,232,0.08);
          }
          .lp-stat:nth-child(2) { padding: 28px 0; }
          .lp-stat:last-child {
            padding-left: 0;
            border-bottom: none;
          }
          .lp-stats-swipe-hint { display: none; }

          /* Instruments — accordion */
          .lp-instruments {
            padding: 64px 24px 64px;
            max-width: 100%;
          }
          .lp-section-head {
            margin-bottom: 48px;
          }
          .lp-instrument {
            grid-template-columns: 40px 1fr 24px;
            gap: 16px;
            padding: 22px 0;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
          .lp-instrument-desc {
            display: none;
          }
          .lp-instrument-chevron {
            display: block;
            grid-column: 3;
            grid-row: 1;
            justify-self: end;
            align-self: center;
          }
          .lp-instrument-expand {
            display: block;
            grid-column: 2 / 4;
            font-family: 'DM Mono', monospace;
            color: rgba(245,240,232,0.45);
            line-height: 1.65;
            overflow: hidden;
            transition: max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s, padding-bottom 0.45s;
          }

          /* Paths */
          .lp-paths {
            padding: 72px 20px 100px;
            max-width: 100%;
          }
          .lp-paths-sub {
            margin-bottom: 40px;
          }
          .lp-paths-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .lp-path-card {
            padding: 18px 14px 16px;
            gap: 6px;
          }
        }

        @media (max-width: 400px) {
          .lp-paths-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>

      {/* Grain texture */}
      <div className="lp-grain" />

      {/* Floating logo with parallax */}
      <div style={{
        position: 'fixed', top: 20, left: 28, zIndex: 100,
        opacity: Math.max(0.25, 1 - scrollProgress * 1.5),
        pointerEvents: 'none',
        transform: `translateY(${scrollProgress * -10}px)`,
        transition: 'opacity 0.1s',
      }}>
        <Logo size={28} color="rgba(245,240,232,0.6)" />
      </div>

      {/* ── HERO ── */}
      <section className="lp-hero" style={{ opacity: 1 - scrollProgress * 0.6 }}>
        <div style={{
          marginBottom: 36,
          animation: 'lp-fade-up 1s ease 0s both',
          transform: `translateY(${scrollProgress * -24}px)`,
        }}>
          <Logo size={120} color="#b8b4ae" gold="#c9a84c" />
        </div>

        <p className="lp-eyebrow">Open Constitutional Design · 2025</p>

        <h1 className="lp-headline">
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className={`lp-word${word === 'constitution' || word === 'design?' ? ' lp-word-italic' : ''}`}
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p className="lp-subhead">
          The Humane Constitution is an open-source framework that embeds human dignity,
          democratic oversight, and corrigibility into AI systems — before deployment, not after.
        </p>

        <div className="lp-hero-cta">
          {returningVisitor ? (
            <button className="lp-btn-primary" onClick={() => handleEnter()}>
              ← Back to Reader
            </button>
          ) : (
            <>
              <button className="lp-btn-primary" onClick={() => {
                document.getElementById('lp-paths-anchor')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Choose a Reading Path
              </button>
              <button className="lp-btn-ghost" onClick={() => handleEnter()}>
                Open Full Reader
              </button>
            </>
          )}
        </div>

        <div className="lp-scroll-hint">
          <span>Scroll</span>
          <div className="lp-scroll-arrow" />
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="lp-stats" ref={statsRef} style={{ opacity: textOpacity }}>
        <p className="lp-reveal lp-eyebrow">By the numbers</p>
        <div className="lp-stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className={`lp-stat lp-reveal lp-reveal-delay-${i + 1}`}>
              <div className="lp-stat-num">
                {statsVisible ? statCounts[i] : 0}{s.suffix}
              </div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="lp-stats-swipe-hint">
          <div className="lp-stats-swipe-line" />
          <span>swipe</span>
        </div>
      </div>

      {/* ── INSTRUMENTS ── */}
      <div className="lp-instruments" style={{ opacity: textOpacity }}>
        <p className="lp-reveal lp-eyebrow" style={{ color: '#c9a84c' }}>The Design</p>
        <h2 className="lp-section-head lp-reveal">
          Five interlocking instruments.<br />
          <em>One coherent system.</em>
        </h2>
        <div className="lp-instruments-list">
          {INSTRUMENTS.map((inst, i) => (
            <div
              key={i}
              className={`lp-instrument lp-reveal lp-reveal-delay-${i + 1}`}
              onClick={() => setOpenInstrument(openInstrument === i ? null : i)}
            >
              <span className="lp-instrument-num">{inst.num}</span>
              <span className="lp-instrument-label">{inst.label}</span>
              <span className="lp-instrument-desc">{inst.desc}</span>
              <span
                className="lp-instrument-chevron"
                style={{
                  transform: openInstrument === i ? 'rotate(90deg)' : 'none',
                  color: openInstrument === i ? '#c9a84c' : 'rgba(245,240,232,0.3)',
                }}
              >›</span>
              <div
                className="lp-instrument-expand"
                style={{
                  maxHeight: openInstrument === i ? '120px' : '0',
                  opacity: openInstrument === i ? 1 : 0,
                  paddingBottom: openInstrument === i ? '12px' : '0',
                }}
              >{inst.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRANSITION ZONE + PATHS ── */}
      <div ref={transitionRef} className="lp-transition" id="lp-paths-anchor" />

      <div className="lp-reveal lp-paths-section">
        <div className="lp-paths">
          <p className="lp-paths-eyebrow">Reading Paths</p>
          <h2 className="lp-paths-head">Choose your path.</h2>
          <p className="lp-paths-sub">Each path takes 10–40 minutes. You can switch anytime inside the reader.</p>

          <div className="lp-paths-grid">
            {PATHS.map((path) => (
              <button
                key={path.id}
                className="lp-path-card"
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

    </div>
  )
}
