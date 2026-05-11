// app/src/components/diagrams/DiagramShell.tsx
import { useState } from 'react'

export interface DiagramNode {
  id: string
  label: string
  definition: string
  docLink: string   // e.g. "ANNEX_AB.md" or "ANNEX_AB.md#AB2"
  accent: string    // hex color e.g. "#58a6ff"
  accentBg: string  // rgba e.g. "rgba(88,166,255,0.07)"
}

interface DiagramShellProps {
  figId: string          // e.g. "V-001"
  title: string          // e.g. "Five-Instrument Constitutional Architecture"
  nodes: DiagramNode[]
  activeNodeId: string | null
  onInternalLink: (href: string) => void
  children: React.ReactNode  // the SVG
}

export function DiagramShell({
  figId,
  title,
  nodes,
  activeNodeId,
  onInternalLink,
  children,
}: DiagramShellProps) {
  const active = nodes.find(n => n.id === activeNodeId) ?? null

  return (
    <div className="my-6 rounded-xl border border-[#30363d] bg-[#161b22] px-7 py-6">
      {/* Title */}
      <div className="mb-5 font-mono text-[0.82em] uppercase tracking-[0.1em] text-[#8b949e]">
        Fig. {figId} · {title}
      </div>

      {/* SVG slot */}
      {children}

      {/* Expansion panel */}
      <div
        className="overflow-hidden transition-all duration-[280ms] ease-in-out"
        style={{ maxHeight: active ? '220px' : '0', opacity: active ? 1 : 0, marginTop: active ? '16px' : '0' }}
      >
        {active && (
          <div
            className="rounded-r-lg py-3 px-5 flex flex-col gap-2"
            style={{
              borderLeft: `2px solid ${active.accent}`,
              background: active.accentBg,
            }}
          >
            <div
              className="font-mono text-[0.78em] font-bold uppercase tracking-[0.08em]"
              style={{ color: active.accent }}
            >
              {active.label}
            </div>
            <div className="text-[0.9em] leading-[1.55] text-[#dde1e7]">
              {active.definition}
            </div>
            <button
              className="mt-1 text-left font-mono text-[0.82em] opacity-85 hover:opacity-100 hover:underline"
              style={{ color: active.accent }}
              onClick={() => onInternalLink(active.docLink)}
            >
              → {active.docLink.replace('.md', '').replace('#', ' §')}
            </button>
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="mt-4 text-center font-mono text-[0.8em] text-[#8b949e]">
        {active ? 'click again to close · click another to switch' : 'click any element to expand'}
      </div>
    </div>
  )
}

// Hook used by every diagram component
export function useDiagramState() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const handleNodeClick = (id: string) => {
    setActiveNodeId(prev => (prev === id ? null : id))
  }
  return { activeNodeId, handleNodeClick }
}
