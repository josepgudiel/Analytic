'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from '@/context/SessionContext'

const NAV = [
  { href: '/dashboard/action-center', label: 'Action Center',    sub: 'Top priorities' },
  { href: '/dashboard/whats-selling', label: "What's Selling",   sub: 'Products & groups' },
  { href: '/dashboard/pricing',       label: 'Pricing Check',    sub: 'Price check' },
  { href: '/dashboard/overview',      label: 'Summary',          sub: 'Performance snapshot' },
  { href: '/dashboard/when-to-staff', label: 'When to Staff',    sub: 'Day-of-week patterns' },
  { href: '/dashboard/forecast',      label: 'What to Expect',   sub: 'Revenue outlook' },
  { href: '/dashboard/report',        label: 'Report',           sub: 'Monthly summary' },
  { href: '/dashboard/ai-advisor',    label: 'Business Advisor', sub: 'Ask about your data' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router   = useRouter()
  const { uploadMeta, clearSession, daysStale } = useSession()

  return (
    <aside
      className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
      style={{
        width: 'var(--sidebar-width)',
        minHeight: '100vh',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
      }}
    >

      {/* Brand */}
      <div style={{
        padding: '28px 20px 22px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
          marginBottom: '3px',
        }}>
          Analytic
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
        }}>
          Business Intelligence
        </div>
      </div>

      {/* Dataset info */}
      {uploadMeta && (
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.60rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            color: 'var(--text-muted)',
            marginBottom: '8px',
          }}>
            Active Dataset
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.72rem',
            color: 'var(--text-primary)',
            marginBottom: '3px',
          }}>
            {uploadMeta.rows.toLocaleString()} rows &middot; {uploadMeta.products.length} products
          </div>
          {uploadMeta.date_range && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.60rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em',
            }}>
              {uploadMeta.date_range.min} → {uploadMeta.date_range.max}
            </div>
          )}
          {uploadMeta.filename?.toLowerCase().match(/demo|sample/) && (
            <span style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '3px 8px',
              backgroundColor: 'var(--accent-dim)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.52rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              Demo
            </span>
          )}
        </div>
      )}

      {/* Stale data warning */}
      {daysStale !== null && daysStale > 60 && (
        <div style={{
          margin: '10px 12px 0',
          padding: '10px 12px',
          backgroundColor: 'var(--warning-dim)',
          border: '1px solid rgba(245,158,11,0.20)',
          borderLeft: '3px solid var(--warning)',
          borderRadius: 'var(--radius-card)',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.56rem',
            fontWeight: 700,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'var(--warning)',
            marginBottom: '3px',
          }}>
            Stale Data
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            color: 'var(--text-secondary)',
          }}>
            Most recent data is {daysStale} days old
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {NAV.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '9px 12px',
                borderRadius: 'var(--radius-card)',
                textDecoration: 'none',
                backgroundColor: active ? 'var(--bg-elevated)' : 'transparent',
                borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
                paddingLeft: '12px',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: active ? 600 : 400,
                fontSize: '0.80rem',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                letterSpacing: '0.01em',
                lineHeight: 1.3,
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                color: active ? 'var(--accent)' : 'var(--text-muted)',
                marginTop: '1px',
                opacity: active ? 0.8 : 0.6,
              }}>
                {item.sub}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={{
        padding: '14px 12px 20px',
        borderTop: '1px solid var(--border)',
      }}>
        <button
          onClick={() => { onClose?.(); clearSession(); router.push('/') }}
          style={{
            width: '100%',
            padding: '9px 14px',
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '0.62rem',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-strong)'
            e.currentTarget.style.color = 'var(--text-secondary)'
            e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          ↑ Upload New File
        </button>
      </div>
    </aside>
  )
}
