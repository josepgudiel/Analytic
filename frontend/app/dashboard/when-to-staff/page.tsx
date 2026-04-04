'use client'

import { useCallback } from 'react'
import { useSession } from '@/context/SessionContext'
import { getWhenToStaff } from '@/lib/api'
import { usePageData } from '@/lib/hooks'
import type { StaffingResponse } from '@/types'
import ChartCard from '@/components/ChartCard'
import ErrorCard from '@/components/ErrorCard'
import { SkeletonRecommendation } from '@/components/SkeletonCard'
import { CHART_COLORS, tooltipStyle, axisStyle } from '@/lib/chartConfig'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function WhenToStaffPage() {
  const { sessionId } = useSession()

  const fetchData = useCallback(
    () => {
      if (!sessionId) return Promise.reject(new Error('No session'))
      return getWhenToStaff(sessionId)
    },
    [sessionId]
  )

  const { data, loading, error, slow, retry } = usePageData<StaffingResponse>(fetchData)

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
            Operations
          </span>
        </div>
        <h1 style={{ color: 'var(--navy)', marginBottom: '14px' }}>
          When to Staff
        </h1>
        <p style={{
          fontFamily: 'Raleway',
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          maxWidth: '500px',
          lineHeight: 1.75,
        }}>
          Which days drive the most revenue and where to focus your team.
        </p>
        <div className="divider" style={{ marginTop: '24px' }} />
      </div>

      {error && <div style={{ marginBottom: '24px' }}><ErrorCard message={error} onRetry={retry} /></div>}

      {slow && loading && (
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid #d97706',
          borderRadius: '20px',
          padding: '18px 22px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-xs)',
        }}>
          <p style={{ fontFamily: 'Raleway', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            This is taking longer than usual. The server may be starting up &mdash; try refreshing in a moment.
          </p>
        </div>
      )}

      {data ? (
        <>
          {/* Staffing recommendation */}
          {data.has_dates ? (
            data.staffing_recommendation ? (
              <div className="fade-up" style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderLeft: '4px solid var(--accent)',
                borderRadius: '20px',
                padding: '24px 26px',
                marginBottom: '24px',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <h3 style={{ color: 'var(--accent)', marginBottom: '12px' }}>Staffing Recommendation</h3>
                <p style={{ fontFamily: 'Raleway', color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.75 }}>
                  {data.staffing_recommendation}
                </p>
              </div>
            ) : (
              <div className="fade-up" style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '24px 26px',
                marginBottom: '24px',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <p style={{ fontFamily: 'Raleway', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Not enough variation in your data to make a staffing recommendation yet.
                </p>
              </div>
            )
          ) : (
            <div className="fade-up" style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '40px 28px',
              textAlign: 'center',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{'\uD83D\uDD50'}</div>
              <div className="label-caps" style={{ color: 'var(--accent)', marginBottom: '10px' }}>Date Column Required</div>
              <p style={{
                fontFamily: 'Raleway',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                maxWidth: '360px',
                margin: '0 auto',
                lineHeight: 1.65,
              }}>
                Upload data with a date column to see which days of the week drive the most revenue.
              </p>
            </div>
          )}

          {/* Peak / Slowest */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <div className="card-navy fade-up fade-up-delay-1" style={{ padding: '22px 24px' }}>
              <span className="label-caps" style={{ color: '#16a34a' }}>Peak Day</span>
              <p className="number-display" style={{ color: '#ffffff', fontSize: '2rem', marginTop: '6px' }}>{data.peak_day ?? "No data"}</p>
            </div>
            <div className="card-navy fade-up fade-up-delay-2" style={{ padding: '22px 24px' }}>
              <span className="label-caps" style={{ color: '#dc2626' }}>Slowest Day</span>
              <p className="number-display" style={{ color: '#ffffff', fontSize: '2rem', marginTop: '6px' }}>{data.slowest_day ?? "No data"}</p>
            </div>
          </div>

          {/* Chart */}
          {data.has_dates && data.day_of_week.length > 0 && (
            <div className="fade-up fade-up-delay-3">
              <ChartCard title="Revenue by Day of Week" caption="Average revenue per day across your dataset">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={data.day_of_week}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
                    <XAxis dataKey="day" tick={axisStyle.tick} axisLine={axisStyle.axisLine} tickLine={axisStyle.tickLine} />
                    <YAxis tick={axisStyle.tick} axisLine={axisStyle.axisLine} tickLine={axisStyle.tickLine}
                           tickFormatter={(v: number) => v >= 1000 ? `$${(v/1000).toFixed(1)}K` : `$${v.toFixed(0)}`} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="avg_revenue" fill={CHART_COLORS.primary} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          )}
        </>
      ) : loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SkeletonRecommendation />
          <SkeletonRecommendation />
        </div>
      ) : !error ? (
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '48px 28px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🕐</div>
          <div className="label-caps" style={{ color: 'var(--accent)', marginBottom: '10px' }}>No staffing data yet</div>
          <p style={{ fontFamily: 'Raleway', color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '360px', margin: '0 auto', lineHeight: 1.65 }}>
            Upload a file with a date column to see which days of the week drive the most revenue.
          </p>
        </div>
      ) : null}
    </div>
  )
}
