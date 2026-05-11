// app/src/components/diagrams/index.ts
import type { ComponentType } from 'react'
import { V001_FiveToolSeparation } from './V001_FiveToolSeparation'
import { V002_FlowTokenLifecycle } from './V002_FlowTokenLifecycle'
import { V003_ScarcityLadder } from './V003_ScarcityLadder'
import { V004_AmendmentPyramid } from './V004_AmendmentPyramid'
import { V005_DemurrageDecay } from './V005_DemurrageDecay'
import { V006_VoiceSRDecay } from './V006_VoiceSRDecay'
import { V011_EssentialAccessLifecycle } from './V011_EssentialAccessLifecycle'
import { V012_VoiceLifecycle } from './V012_VoiceLifecycle'
import { V013_ServiceRecordLifecycle } from './V013_ServiceRecordLifecycle'

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
  'V-002': V002_FlowTokenLifecycle,
  'V-003': V003_ScarcityLadder,
  'V-004': V004_AmendmentPyramid,
  'V-005': V005_DemurrageDecay,
  'V-006': V006_VoiceSRDecay,
  'V-011': V011_EssentialAccessLifecycle,
  'V-012': V012_VoiceLifecycle,
  'V-013': V013_ServiceRecordLifecycle,
}
