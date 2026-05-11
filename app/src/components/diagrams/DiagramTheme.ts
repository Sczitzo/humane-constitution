// app/src/components/diagrams/DiagramTheme.ts

export const THEME = {
  // Instrument colors
  flow:       { accent: '#58a6ff', fill: '#0d2137', accentBg: 'rgba(88,166,255,0.07)' },
  ea:         { accent: '#3fb950', fill: '#0d2116', accentBg: 'rgba(63,185,80,0.07)' },
  voice:      { accent: '#d29922', fill: '#1f1a0d', accentBg: 'rgba(210,153,34,0.07)' },
  sr:         { accent: '#a371f7', fill: '#170d21', accentBg: 'rgba(163,113,247,0.07)' },
  ss:         { accent: '#f85149', fill: '#1a0d0d', accentBg: 'rgba(248,81,73,0.07)' },
  emergency:  { accent: '#ff6b6b', fill: '#200808', accentBg: 'rgba(255,107,107,0.07)' },
  neutral:    { accent: '#8b949e', fill: '#161b22', accentBg: 'rgba(139,148,158,0.07)' },

  // Shared SVG values
  strokeWidth: { normal: 2, active: 2.5 },
  subtext: '#b6c2cf',
  dim: '#8b949e',
  border: '#30363d',
  divider: '#21262d',
  cardBg: '#161b22',
} as const
