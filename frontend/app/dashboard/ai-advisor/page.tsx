'use client'

import { useState, useEffect } from 'react'
import { useSession } from '@/context/SessionContext'
import AdvisorChat from '@/components/AdvisorChat'
import { getDataSummary } from '@/lib/api'
import type { DataSummaryResponse } from '@/types'

export default function AIAdvisorPage() {
  const { sessionId, businessProfile } = useSession()
  const [summary, setSummary] = useState<DataSummaryResponse | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)

  useEffect(() => {
    if (!sessionId) return
    setSummaryLoading(true)
    getDataSummary(sessionId)
      .then(setSummary)
      .catch(() => setSummary(null))
      .finally(() => setSummaryLoading(false))
  }, [sessionId])

  const top3 = summary?.top_products?.slice(0, 3) ?? []

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px',
        }}>
          <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent)' }} />
          <span className="label-caps" style={{ color: 'var(--accent)' }}>
            Your Data
          </span>
        </div>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: '14px' }}>
          Business Advisor
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.92rem',
          color: 'var(--text-secondary)',
          maxWidth: '500px',
          lineHeight: 1.75,
        }}>
          Ask anything about your business. Your advisor knows your numbers.
        </p>
        <div className="divider" style={{ marginTop: '24px' }} />
      </div>

      <div className="fade-up advisor-layout" style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 300px)' }}>
        {/* Left: Your data panel */}
        <div className="advisor-profile-panel" style={{ width: '35%', flexShrink: 0 }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)',
            padding: '24px 22px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '18px' }}>Your data</h3>

            {summaryLoading && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[80, 60, 100, 70].map((w, i) => (
                  <div key={i} className="skeleton" style={{ height: '14px', width: `${w}%`, borderRadius: '2px' }} />
                ))}
              </div>
            )}

            {!summaryLoading && !summary && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                flex: 1,
              }}>
                Upload your sales data to unlock personalized advice.
              </p>
            )}

            {!summaryLoading && summary && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
                {/* Date range */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.62rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.10em',
                    color: 'var(--text-muted)',
                    marginBottom: '4px',
                  }}>
                    Date range
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                    {summary.date_range}
                  </div>
                </div>

                {/* Total transactions */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.62rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.10em',
                    color: 'var(--text-muted)',
                    marginBottom: '4px',
                  }}>
                    Transactions
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                    {summary.total_transactions.toLocaleString()}
                  </div>
                </div>

                {/* Top 3 products */}
                {top3.length > 0 && (
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.62rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.10em',
                      color: 'var(--text-muted)',
                      marginBottom: '8px',
                    }}>
                      Top products
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {top3.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.60rem',
                            color: 'var(--accent)',
                            width: '14px',
                            flexShrink: 0,
                          }}>
                            {i + 1}
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.78rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.4,
                          }}>
                            {p}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best day */}
                {summary.best_dow && summary.best_dow !== 'unknown' && (
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.62rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.10em',
                      color: 'var(--text-muted)',
                      marginBottom: '4px',
                    }}>
                      Best day
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                      {summary.best_dow}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Chat */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <AdvisorChat businessProfile={businessProfile} />
        </div>
      </div>
    </div>
  )
}
