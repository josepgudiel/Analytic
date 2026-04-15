'use client'

import { useCallback } from 'react'
import { useSession } from '@/context/SessionContext'
import { getPricing } from '@/lib/api'
import { usePageData } from '@/lib/hooks'
import type { PricingResponse } from '@/types'
import ErrorCard from '@/components/ErrorCard'
import { SkeletonRecommendation } from '@/components/SkeletonCard'

const actionColor: Record<string, string> = {
  '↑ Raise Price':       '#16a34a',
  '↓ Consider Lowering': '#dc2626',
  '✓ Maintain':          '#2563eb',
}

const confidenceBadge: Record<string, { label: string; color: string }> = {
  high:         { label: 'Strong signal',      color: '#16a34a' },
  directional:  { label: 'Worth testing',      color: '#d97706' },
  insufficient: { label: 'Not enough data yet', color: '#94a3b8' },
}

export default function PricingPage() {
  const { sessionId, uploadMeta } = useSession()
  const currency = uploadMeta?.currency ?? '$'

  const fetchData = useCallback(() => {
    if (!sessionId) return Promise.reject(new Error('No session'))
    return getPricing(sessionId)
  }, [sessionId])
  const { data, loading, error, slow, retry } = usePageData<PricingResponse>(fetchData)

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 'clamp(28px, 5vw, 48px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent)' }} />
          <span className="label-caps" style={{ color: 'var(--accent)' }}>Intelligence</span>
        </div>
        <h1 style={{ color: 'var(--t1)', marginBottom: '14px' }}>Pricing Check</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--t2)', maxWidth: '500px', lineHeight: 1.75 }}>
          See which products might be priced too high or too low based on how they&apos;re selling.
        </p>
        <div className="divider" style={{ marginTop: '24px' }} />
      </div>

      {error && <div style={{ marginBottom: '24px' }}><ErrorCard message={error} onRetry={retry} /></div>}

      {slow && loading && (
        <div style={{
          backgroundColor: 'var(--surface)', border: '1px solid var(--border)',
          borderLeft: '4px solid #d97706', borderRadius: 'var(--radius-card)',
          padding: '18px 22px', marginBottom: '24px', boxShadow: 'var(--shadow-xs)',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Analysing price and volume patterns — this may take a moment.
          </p>
        </div>
      )}

      {data && !data.has_data && (
        <div style={{
          backgroundColor: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)', padding: '40px 28px', textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>💰</div>
          <div className="label-caps" style={{ color: 'var(--accent)', marginBottom: '10px' }}>Not enough data</div>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.65 }}>
            {data.warning ?? 'Need at least 15 transactions per product to generate pricing recommendations.'}
          </p>
        </div>
      )}

      {data?.recommendations && data.recommendations.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.recommendations.map((rec, i) => {
            const acColor = actionColor[rec.action] ?? 'var(--accent)'
            const badge = rec.elasticity_confidence ? confidenceBadge[rec.elasticity_confidence] : null
            const priceChanged = rec.suggested_price !== rec.current_price

            return (
              <div
                key={i}
                className="fade-up"
                style={{
                  animationDelay: `${i * 60}ms`, opacity: 0,
                  backgroundColor: 'var(--surface)', border: '1px solid var(--border)',
                  borderLeft: `4px solid ${acColor}`, borderRadius: 'var(--radius-card)',
                  padding: 'clamp(16px, 3vw, 22px) clamp(16px, 3vw, 26px)', boxShadow: 'var(--shadow-sm)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--t1)', marginBottom: '4px' }}>
                      {rec.product}
                    </div>
                    <span style={{
                      display: 'inline-block', padding: '3px 12px',
                      backgroundColor: `${acColor}18`, borderRadius: '999px',
                      fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.68rem',
                      letterSpacing: '0.10em', color: acColor,
                    }}>
                      {rec.action}
                    </span>
                  </div>

                  {/* Price display */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-muted)', textDecoration: priceChanged ? 'line-through' : 'none' }}>
                        {currency}{rec.current_price.toFixed(2)}
                      </div>
                      {priceChanged && (
                        <>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>→</span>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 500, color: acColor }}>
                            {currency}{rec.suggested_price.toFixed(2)}
                          </div>
                        </>
                      )}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {rec.n_transactions.toLocaleString()} transactions
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: badge ? '12px' : 0 }}>
                  {rec.reason}
                </p>

                {/* Confidence badge */}
                {badge && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: badge.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: badge.color }}>
                      {badge.label}
                    </span>
                  </div>
                )}

                {/* Reliability */}
                {rec.reliability && (
                  <div style={{ marginTop: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700,
                      color: rec.reliability === 'high' ? '#16a34a' : '#d97706',
                    }}>
                      {rec.reliability === 'high' ? 'Strong signal' : 'Early signal, worth watching'}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {' '}— based on {rec.n_transactions.toLocaleString()} transactions
                    </span>
                  </div>
                )}

                {/* Sensitivity label */}
                {rec.sensitivity_label && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', marginBottom: 0, lineHeight: 1.6 }}>
                    {rec.sensitivity_label}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {loading && !data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SkeletonRecommendation />
          <SkeletonRecommendation />
          <SkeletonRecommendation />
        </div>
      )}
    </div>
  )
}
