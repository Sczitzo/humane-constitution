// app/src/components/diagrams/DiagramShell.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export interface DiagramNode {
  id: string
  label: string
  definition: string
  docLink: string   // e.g. "ANNEX_AB.md" or "ANNEX_AB.md#AB2"
  accent: string    // hex color e.g. "#58a6ff"
  accentBg: string  // rgba e.g. "rgba(88,166,255,0.07)"
}

interface DiagramShellProps {
  figId: string
  title: string
  nodes: DiagramNode[]
  activeNodeId: string | null
  onInternalLink: (href: string) => void
  children: React.ReactNode
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

      {/* SVG / content slot */}
      {children}

      {/* Expansion panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative rounded-lg overflow-hidden"
            style={{ border: `2px solid ${active.accent}` }}
          >
            {/* Pulsing border glow overlay */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ border: `2px solid ${active.accent}` }}
              animate={{ opacity: [0.6, 0.15, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div
              className="py-3 px-5 flex flex-col gap-2"
              style={{ background: active.accentBg }}
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
                className="mt-1 text-left font-mono text-[0.82em] hover:underline"
                style={{ color: active.accent, opacity: 0.85 }}
                onClick={() => onInternalLink(active.docLink)}
              >
                → {active.docLink.replace('.md', '').replace('#', ' §')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <div className="mt-4 text-center font-mono text-[0.8em] text-[#8b949e]">
        {active ? 'click again to close · click another to switch' : 'click any element to expand'}
      </div>
    </div>
  )
}

// Hook used by diagram components
export function useDiagramState() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const handleNodeClick = (id: string) => {
    setActiveNodeId(prev => (prev === id ? null : id))
  }
  return { activeNodeId, handleNodeClick }
}
