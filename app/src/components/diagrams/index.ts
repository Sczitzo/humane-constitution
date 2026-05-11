// app/src/components/diagrams/index.ts
import type { ComponentType } from 'react'
import { V001_FiveToolSeparation } from './V001_FiveToolSeparation'

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

export const DiagramRegistry: Record<string, ComponentType<DiagramProps>> = {
  'V-001': V001_FiveToolSeparation,
}
