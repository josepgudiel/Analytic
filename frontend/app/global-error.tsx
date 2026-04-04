'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', background: '#0a0a0a', color: '#e5e5e5' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong</h2>
          <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>{error.message || 'An unexpected error occurred.'}</p>
          <button
            onClick={() => reset()}
            style={{ padding: '0.6rem 1.5rem', background: '#fff', color: '#0a0a0a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
