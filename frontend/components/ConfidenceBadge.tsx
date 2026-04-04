const CONFIG = {
  high:         { color: 'var(--positive)',  bg: 'var(--positive-dim)',  label: 'Strong Signal' },
  moderate:     { color: 'var(--warning)',   bg: 'var(--warning-dim)',   label: 'Worth Testing' },
  directional:  { color: 'var(--warning)',   bg: 'var(--warning-dim)',   label: 'Worth Testing' },
  insufficient: { color: 'var(--text-muted)', bg: 'rgba(255,255,255,0.05)', label: 'Need More Data' },
} as const

export default function ConfidenceBadge({
  confidence,
  label,
}: {
  confidence: 'high' | 'moderate' | 'directional' | 'insufficient'
  label?: string
}) {
  const cfg = CONFIG[confidence] ?? CONFIG.moderate
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 8px',
      borderRadius: 'var(--radius)',
      backgroundColor: cfg.bg,
      color: cfg.color,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: '0.54rem',
      letterSpacing: '0.10em',
      textTransform: 'uppercase',
      flexShrink: 0,
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        backgroundColor: cfg.color,
        flexShrink: 0,
      }} />
      {label ?? cfg.label}
    </span>
  )
}
