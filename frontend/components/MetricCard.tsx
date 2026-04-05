'use client'

interface MetricCardProps {
  label: string
  value: string | number
  delta?: string | null
  deltaPositive?: boolean
  delay?: number
  accent?: boolean
}

export default function MetricCard({
  label,
  value,
  delta,
  deltaPositive,
  delay = 0,
  accent = false,
}: MetricCardProps) {
  return (
    <div
      className="fade-up"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderLeft: accent ? '3px solid var(--accent)' : '1px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        padding: 'clamp(14px, 3vw, 20px) clamp(14px, 3vw, 22px)',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)'
        if (!accent) e.currentTarget.style.borderLeft = '3px solid var(--accent)'
        // scanline effect
        const line = e.currentTarget.querySelector<HTMLElement>('.scanline')
        if (line) line.style.animation = 'scanLine 600ms ease forwards'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        if (!accent) e.currentTarget.style.borderLeft = '1px solid var(--border)'
        const line = e.currentTarget.querySelector<HTMLElement>('.scanline')
        if (line) { line.style.animation = 'none'; line.style.top = '0' }
      }}
    >
      {/* Scan-line overlay */}
      <div
        className="scanline"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Label */}
      <div
        className="label-caps"
        style={{ marginBottom: '14px', color: 'var(--text-muted)' }}
      >
        {label}
      </div>

      {/* Value */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          marginBottom: delta ? '10px' : '0',
        }}
      >
        {value}
      </div>

      {/* Delta */}
      {delta && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '3px 8px',
          borderRadius: 'var(--radius)',
          backgroundColor:
            deltaPositive === undefined
              ? 'rgba(255,255,255,0.05)'
              : deltaPositive
              ? 'var(--positive-dim)'
              : 'var(--negative-dim)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.60rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color:
            deltaPositive === undefined
              ? 'var(--text-muted)'
              : deltaPositive
              ? 'var(--positive)'
              : 'var(--negative)',
        }}>
          {deltaPositive !== undefined && (
            <span style={{ fontSize: '0.5rem' }}>{deltaPositive ? '▲' : '▼'}</span>
          )}
          {delta}
        </div>
      )}
    </div>
  )
}
