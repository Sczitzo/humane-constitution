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

const HEADLINE_WORDS = ['What', 'if', 'AI', 'had', 'a', 'constitution', 'that', 'protected', 'you', 'by', 'design?']

interface LandingPageProps {
  onEnter: (pathId?: string) => void
  returningVisitor?: boolean
}

export function LandingPage({ onEnter, returningVisitor = false }: LandingPageProps) {
  const [exiting, setExiting] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const transitionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Scroll-driven: track how far into the transition zone we are (0→1)
  useEffect(() => {
    const onScroll = () => {
      const el = transitionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // starts fading when transition zone enters viewport, completes when it exits top
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh * 0.5)))
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver for .reveal elements
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('lp-visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.lp-reveal').forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  const handleEnter = useCallback((pathId?: string) => {
    setExiting(true)
    setTimeout(() => onEnter(pathId), 600)
  }, [onEnter])

  // Interpolated bg: dark (#0c0b09) → cream (#f5f0e8)
  const bgR = Math.round(12 + (245 - 12) * scrollProgress)
  const bgG = Math.round(11 + (240 - 11) * scrollProgress)
  const bgB = Math.round(9 + (232 - 9) * scrollProgress)
  const bgColor = `rgb(${bgR},${bgG},${bgB})`

  const textOpacity = Math.max(0, 1 - scrollProgress * 2)
  // Paths fade in as soon as the transition zone enters view — no dead grey gap
  const pathsOpacity = Math.max(0, (scrollProgress - 0.1) / 0.5)

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
          overflow-x: hidden;
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
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .lp-reveal.lp-visible { opacity: 1; transform: none; }
        .lp-reveal-delay-1 { transition-delay: 0.1s; }
        .lp-reveal-delay-2 { transition-delay: 0.2s; }
        .lp-reveal-delay-3 { transition-delay: 0.3s; }
        .lp-reveal-delay-4 { transition-delay: 0.4s; }
        .lp-reveal-delay-5 { transition-delay: 0.5s; }

        /* ── Hero ── */
        .lp-hero {
          min-height: 100vh;
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
          font-size: clamp(52px, 7vw, 96px);
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
          transition: background 0.2s, transform 0.15s;
        }
        .lp-btn-primary:hover { background: #dbb85c; transform: translateY(-2px); }
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
        .lp-stats-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 80px;
        }
        .lp-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
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
        }
        .lp-stat-label {
          font-size: 14px;
          color: rgba(245,240,232,0.45);
          line-height: 1.5;
        }

        /* ── Instruments section ── */
        .lp-instruments {
          padding: 140px 48px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lp-section-head {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 5vw, 68px);
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
          align-items: center;
          gap: 32px;
          padding: 28px 0;
          border-bottom: 1px solid rgba(245,240,232,0.08);
          transition: all 0.3s ease;
          cursor: default;
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
          font-size: 12px;
          color: rgba(245,240,232,0.35);
          text-align: right;
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
          font-size: clamp(40px, 5vw, 68px);
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
          gap: 16px;
        }
        .lp-path-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 28px 24px 24px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }
        .lp-path-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--card-color, #1a3a5c);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .lp-path-card:hover {
          border-color: transparent;
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.12);
        }
        .lp-path-card:hover::before { opacity: 0.04; }
        .lp-path-card:hover .lp-path-arrow { opacity: 1; transform: translateX(0); }
        .lp-path-emoji {
          font-size: 28px;
          margin-bottom: 4px;
          position: relative;
        }
        .lp-path-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #1a1a1c;
          position: relative;
        }
        .lp-path-time {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #9ca3af;
          position: relative;
        }
        .lp-path-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #6b7280;
          margin-top: 4px;
          position: relative;
        }
        .lp-path-arrow {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 16px;
          color: #1a3a5c;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
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
          50% { opacity: 1; transform: scaleY(1.15); }
        }

        /* ── Grain overlay ── */
        .lp-grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
        }
      `}</style>

      {/* Grain texture */}
      <div className="lp-grain" />

      {/* ── FLOATING LOGO ── */}
      <div style={{
        position: 'fixed', top: 20, left: 28, zIndex: 100,
        opacity: Math.max(0.25, 1 - scrollProgress * 1.5),
        pointerEvents: 'none',
      }}>
        <Logo size={28} color="rgba(245,240,232,0.6)" />
      </div>

      {/* ── HERO ── */}
      <section className="lp-hero" style={{ opacity: 1 - scrollProgress * 0.6 }}>
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
      <div className="lp-stats" style={{ opacity: textOpacity }}>
        <p className="lp-reveal lp-eyebrow">By the numbers</p>
        <div className="lp-stats-grid">
          {[
            { num: '90+', label: 'Documents in the corpus — threats, patches, annexes, and constitutional text' },
            { num: '5', label: 'Interlocking governance instruments that form a coherent system' },
            { num: '100%', label: 'Open source, CC BY 4.0 licensed, with a public audit trail' },
          ].map((s, i) => (
            <div key={i} className={`lp-stat lp-reveal lp-reveal-delay-${i + 1}`}>
              <div className="lp-stat-num">{s.num}</div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
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
            <div key={i} className={`lp-instrument lp-reveal lp-reveal-delay-${i + 1}`}>
              <span className="lp-instrument-num">{inst.num}</span>
              <span className="lp-instrument-label">{inst.label}</span>
              <span className="lp-instrument-desc">{inst.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRANSITION ZONE + PATHS — hidden for returning visitors ── */}
      <div ref={transitionRef} className="lp-transition" id="lp-paths-anchor" />

      {!returningVisitor && <div style={{ opacity: pathsOpacity }}>
        <div className="lp-paths">
          <p className="lp-paths-eyebrow">Reading Paths</p>
          <h2 className="lp-paths-head">Where would you like to start?</h2>
          <p className="lp-paths-sub">Each path takes 10–40 minutes. You can switch paths anytime inside the reader.</p>

          <div className="lp-paths-grid">
            {PATHS.map((path) => (
              <button
                key={path.id}
                className="lp-path-card"
                style={{ '--card-color': path.color } as React.CSSProperties}
                onClick={() => handleEnter(path.id)}
              >
                <div className="lp-path-emoji">{path.emoji}</div>
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
      </div>}

    </div>
  )
}
