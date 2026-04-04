'use client'

export default function SkeletonCard({ tall = false }: { tall?: boolean }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      padding: '20px 22px',
      height: tall ? '220px' : '130px',
      overflow: 'hidden',
    }}>
      <div className="skeleton" style={{ height: '9px', width: '70px', marginBottom: '18px', borderRadius: 'var(--radius)' }} />
      <div className="skeleton" style={{ height: '40px', width: '120px', marginBottom: '14px', borderRadius: 'var(--radius)' }} />
      <div className="skeleton" style={{ height: '8px', width: '100%', marginBottom: '7px', borderRadius: 'var(--radius)' }} />
      <div className="skeleton" style={{ height: '8px', width: '60%', borderRadius: 'var(--radius)' }} />
    </div>
  )
}

export function SkeletonMetric() {
  return <SkeletonCard />
}

export function SkeletonRecommendation() {
  return <SkeletonCard tall />
}
