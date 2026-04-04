export const CHART_COLORS = {
  primary:   '#00d4ff',
  secondary: 'rgba(0,212,255,0.45)',
  muted:     'rgba(0,212,255,0.15)',
  grid:      'rgba(255,255,255,0.04)',
  positive:  '#10b981',
  negative:  '#f43f5e',
  warning:   '#f59e0b',
}

export const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#1a1a24',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '4px',
    color: '#f0f0f5',
    fontFamily: "'Space Mono', monospace",
    fontSize: '12px',
    boxShadow: 'none',
    padding: '10px 14px',
  },
  labelStyle: {
    color: '#00d4ff',
    fontWeight: 700,
    fontSize: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    marginBottom: '4px',
    fontFamily: "'Space Mono', monospace",
  },
  cursor: { fill: 'rgba(0,212,255,0.04)' },
}

export const axisStyle = {
  tick:     { fill: '#4a4a5e', fontFamily: "'Space Mono', monospace", fontSize: 10 },
  axisLine: { stroke: 'rgba(255,255,255,0.06)' },
  tickLine: { stroke: 'transparent' },
}
