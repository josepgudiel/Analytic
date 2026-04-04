export default function ErrorCard({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      borderLeft: '4px solid #dc2626',
      borderRadius: '20px',
      padding: '24px 26px',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div className="label-caps" style={{ color: '#dc2626', marginBottom: '10px' }}>Something went wrong</div>
      <p style={{
        fontFamily: 'Raleway',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        marginBottom: onRetry ? '16px' : '0',
        lineHeight: 1.65,
      }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="label-caps"
          style={{
            color: 'var(--accent)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--navy)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
        >
          Try again &rarr;
        </button>
      )}
    </div>
  )
}
