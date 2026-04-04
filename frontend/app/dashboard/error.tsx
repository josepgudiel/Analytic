'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Dashboard Error</h2>
      <p style={{ color: '#a3a3a3', marginBottom: '1.5rem', textAlign: 'center' }}>{error.message || 'Failed to load dashboard data.'}</p>
      <button
        onClick={() => reset()}
        style={{ padding: '0.5rem 1.25rem', background: '#fff', color: '#0a0a0a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
      >
        Try again
      </button>
    </div>
  )
}
