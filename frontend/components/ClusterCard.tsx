'use client'

import type { Cluster } from '@/types'

const bgMap: Record<string, string> = {
  'Stars':        'linear-gradient(145deg, #1e3a5f 0%, #152d4a 100%)',
  'Cash Cows':    'linear-gradient(145deg, #4a6280 0%, #374a5e 100%)',
  'Hidden Gems':  'linear-gradient(145deg, #166534 0%, #14532d 100%)',
  'Low Activity': 'linear-gradient(145deg, #92400e 0%, #78350f 100%)',
}

const iconMap: Record<string, string> = {
  'Stars':        '\u2B50',
  'Cash Cows':    '\uD83D\uDCB0',
  'Hidden Gems':  '\uD83D\uDC8E',
  'Low Activity': '\uD83D\uDCC9',
}

interface ClusterCardProps {
  cluster: Cluster
  currency?: string
}

export default function ClusterCard({ cluster, currency = '$' }: ClusterCardProps) {
  const bg = bgMap[cluster.label] ?? bgMap['Stars']
  const icon = iconMap[cluster.label] ?? '\uD83D\uDCE6'

  return (
    <div
      style={{
        background: bg,
        color: '#ffffff',
        borderRadius: '20px',
        border: '1px solid rgba(147,197,253,0.10)',
        boxShadow: 'var(--shadow-md)',
        padding: 'clamp(16px, 3vw, 22px) clamp(14px, 3vw, 20px)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <h2 className="font-display cluster-heading" style={{
        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
        fontWeight: 500,
        color: '#ffffff',
        marginBottom: '10px',
        textTransform: 'none',
        letterSpacing: '0.02em',
        lineHeight: 1.2,
      }}>
        {icon} {cluster.label}
      </h2>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
        <div>
          <span className="label-caps" style={{ color: 'rgba(147,197,253,0.65)', fontSize: '0.52rem' }}>Avg Revenue</span>
          <p className="number-display" style={{ color: '#ffffff', fontSize: '1.3rem', marginTop: '2px' }}>
            {currency}{cluster.avg_revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <span className="label-caps" style={{ color: 'rgba(147,197,253,0.65)', fontSize: '0.52rem' }}>Avg Qty</span>
          <p className="number-display" style={{ color: '#ffffff', fontSize: '1.3rem', marginTop: '2px' }}>
            {cluster.avg_quantity.toLocaleString()}
          </p>
        </div>
      </div>
      <ul style={{
        fontFamily: 'Raleway',
        fontSize: '0.78rem',
        color: '#93c5fd',
        marginBottom: '12px',
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}>
        {cluster.products.slice(0, 6).map((p) => (
          <li key={p}>&bull; {p}</li>
        ))}
        {cluster.products.length > 6 && (
          <li style={{ color: 'rgba(255,255,255,0.5)' }}>+{cluster.products.length - 6} more</li>
        )}
      </ul>
      <p style={{
        fontFamily: 'Raleway',
        fontStyle: 'italic',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.55,
      }}>
        {cluster.action}
      </p>
    </div>
  )
}
