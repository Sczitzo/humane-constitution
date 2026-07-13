// app/src/components/diagrams/index.ts
import type { ComponentType } from 'react'
import { V001_FiveToolSeparation } from './V001_FiveToolSeparation'
import { V002_FlowTokenLifecycle } from './V002_FlowTokenLifecycle'
import { V003_ScarcityLadder } from './V003_ScarcityLadder'
import { V004_AmendmentPyramid } from './V004_AmendmentPyramid'
import { V006_VoiceSRDecay } from './V006_VoiceSRDecay'
import { V007_OraclePolycentric } from './V007_OraclePolycentric'
import { V008_PilotTimeline } from './V008_PilotTimeline'
import { V009_ThreatPatchChain } from './V009_ThreatPatchChain'
import { V010_InstrumentSpace } from './V010_InstrumentSpace'
import { V011_EssentialAccessLifecycle } from './V011_EssentialAccessLifecycle'
import { V012_VoiceLifecycle } from './V012_VoiceLifecycle'
import { V013_ServiceRecordLifecycle } from './V013_ServiceRecordLifecycle'
import { V015_AnnualSimulation } from './V015_AnnualSimulation'
import { V016_FlowVilleGlobeHub } from './V016_FlowVilleGlobeHub'

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
  'V-006': V006_VoiceSRDecay,
  'V-007': V007_OraclePolycentric,
  'V-008': V008_PilotTimeline,
  'V-009': V009_ThreatPatchChain,
  'V-010': V010_InstrumentSpace,
  'V-011': V011_EssentialAccessLifecycle,
  'V-012': V012_VoiceLifecycle,
  'V-013': V013_ServiceRecordLifecycle,
  'V-015': V015_AnnualSimulation,
  'V-016': V016_FlowVilleGlobeHub,
}
