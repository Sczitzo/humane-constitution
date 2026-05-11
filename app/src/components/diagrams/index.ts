// app/src/components/diagrams/index.ts
import type { ComponentType } from 'react'

export interface DiagramProps {
  onInternalLink: (href: string) => void
}

export interface DiagramNode {
  id: string
  label: string
  definition: string
  docLink: string
  accent: string
  accentBg: string
}

// Populated as each diagram is built. Key = V-number string e.g. "V-001"
export const DiagramRegistry: Record<string, ComponentType<DiagramProps>> = {}
