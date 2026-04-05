'use client'

import { useState } from 'react'
import { Recommendation } from '@/types'

/* ─── Urgency badge config ──────────────────────────────────────────────── */

const URGENCY_STYLES: Record<string, { bg: string; color: string }> = {
  'Act this week': {
    bg: 'rgba(var(--negative-rgb, 220,38,38), 0.15)',
    color: 'var(--negative)',
  },
  'Worth doing soon': {
    bg: 'rgba(var(--warning-rgb, 234,179,8), 0.15)',
    color: 'var(--warning)',
  },
  'Plan for next month': {
    bg: 'var(--border-active, rgba(255,255,255,0.08))',
    color: 'var(--text-muted)',
  },
}

function getUrgencyStyle(label: string) {
  return URGENCY_STYLES[label] ?? URGENCY_STYLES['Plan for next month']
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function RecommendationCard({
  rec,
  delay = 0,
  onDismiss,
}: {
  rec: Recommendation
  delay?: number
  onDismiss?: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const urgency = getUrgencyStyle(rec.urgency_label)

  return (
    <div
      className="fade-up"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      <div style={{ padding: '22px 24px' }}>
        {/* Urgency badge */}
        <div style={{ marginBottom: '14px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: 'var(--radius, 6px)',
              backgroundColor: urgency.bg,
              color: urgency.color,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
            }}
          >
            {rec.urgency_label}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            marginBottom: '10px',
          }}
        >
          {rec.title}
        </div>

        {/* Body */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: rec.impact_estimate != null && rec.impact_estimate > 0 ? '10px' : '16px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as const,
          }}
        >
          {rec.body}
        </div>

        {/* Impact estimate */}
        {rec.impact_estimate != null && rec.impact_estimate > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                backgroundColor: 'var(--positive-dim, rgba(34,197,94,0.08))',
                borderRadius: 'var(--radius, 6px)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                fontWeight: 700,
                color: 'var(--positive)',
                letterSpacing: '0.04em',
              }}
            >
              ~${rec.impact_estimate.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo potential
            </span>
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'var(--border)',
            marginBottom: '12px',
          }}
        />

        {/* Footer: confidence + transactions + done button */}
        <div
          className="rec-footer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor:
                    rec.confidence === 'high'
                      ? 'var(--positive)'
                      : 'var(--warning)',
                  flexShrink: 0,
                }}
              />
              {rec.confidence === 'high' ? 'High' : 'Moderate'} confidence
            </span>
            <span style={{ color: 'var(--border-strong)' }}>&middot;</span>
            <span>{rec.transaction_count.toLocaleString()} transactions</span>
          </div>

          <button
            onClick={() => onDismiss?.(rec.id)}
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              minHeight: '40px',
              backgroundColor: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius, 6px)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              cursor: onDismiss ? 'pointer' : 'default',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              opacity: onDismiss ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (!onDismiss) return
              e.currentTarget.style.borderColor = 'var(--positive)'
              e.currentTarget.style.color = 'var(--positive)'
              e.currentTarget.style.backgroundColor =
                'var(--positive-dim, rgba(34,197,94,0.1))'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Done
          </button>
        </div>

        {/* See why toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: 'var(--accent)',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
          }}
        >
          See why{' '}
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.25s ease',
              transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '0.72rem',
            }}
          >
            &rarr;
          </span>
        </button>

        {/* Expanded content — CSS max-height transition */}
        <div
          style={{
            maxHeight: expanded ? '200px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}
        >
          <div
            style={{
              marginTop: '10px',
              padding: '12px 14px',
              backgroundColor: 'var(--bg-surface, rgba(255,255,255,0.03))',
              borderRadius: 'var(--radius, 6px)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.76rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}
          >
            {rec.see_why}
          </div>
        </div>
      </div>
    </div>
  )
}
