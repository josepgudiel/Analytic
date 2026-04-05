export default function ChartCard({
  title,
  caption,
  children,
}: {
  title: string
  caption?: string
  children: React.ReactNode
}) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      padding: 'clamp(16px, 3vw, 24px) clamp(14px, 3vw, 24px) clamp(14px, 2vw, 20px)',
    }}>
      <div style={{ marginBottom: caption ? '4px' : '18px' }}>
        <h3>{title}</h3>
      </div>
      {caption && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          marginBottom: '18px',
          lineHeight: 1.5,
        }}>
          {caption}
        </p>
      )}
      <div className="chart-wrapper">
        {children}
      </div>
    </div>
  )
}
