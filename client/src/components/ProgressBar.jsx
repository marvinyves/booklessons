const STATUS_META = [
  { key: 'not_started', label: 'Not started', color: 'var(--border-2)' },
  { key: 'learning',    label: 'Learning',    color: 'var(--learning)' },
  { key: 'practiced',   label: 'Practiced',   color: 'var(--practiced)' },
  { key: 'applied',     label: 'Applied',     color: 'var(--applied)' },
]

export default function ProgressBar({ modules }) {
  if (!modules || modules.length === 0) return null

  const total = modules.length
  const counts = modules.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1
    return acc
  }, {})

  const doneCount = (counts.applied || 0) + (counts.practiced || 0)
  const pct = Math.round((doneCount / total) * 100)

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Progress
        </span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--ink-2)', letterSpacing: '-0.01em' }}>
          {doneCount} <span style={{ color: 'var(--ink-4)' }}>/ {total}</span>
        </span>
      </div>

      <div style={{ height: 3, background: 'var(--cream-3)', borderRadius: 2, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: 'var(--accent)', borderRadius: 2,
          transition: 'width 0.4s ease',
        }} />
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {STATUS_META.map(({ key, label, color }) => counts[key] ? (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-3)' }}>
              {counts[key]} {label}
            </span>
          </div>
        ) : null)}
      </div>
    </div>
  )
}
