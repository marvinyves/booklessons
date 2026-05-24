import { useState } from 'react'

function getProgress(book) {
  if (!book.lessonPlan) return { done: 0, total: 0 }
  const total = book.lessonPlan.modules.length
  const done = book.lessonPlan.modules.filter((m) => m.status === 'applied' || m.status === 'practiced').length
  return { done, total }
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const diffDays = Math.floor((now - d) / 86400000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function SavedLibrary({ savedBooks, onResume, onRemove }) {
  const [sort, setSort] = useState('recent')

  if (savedBooks.length === 0) return null

  const sorted = [...savedBooks].sort((a, b) => {
    if (sort === 'recent') return new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt)
    if (sort === 'progress') {
      const pa = getProgress(a), pb = getProgress(b)
      return (pb.total ? pb.done / pb.total : 0) - (pa.total ? pa.done / pa.total : 0)
    }
    return a.title.localeCompare(b.title)
  })

  const coverFallback = (title) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=d4e8e3&color=1a4a40&size=64&font-size=0.35&bold=true`

  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
          My Library
        </h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-3)',
            background: 'transparent', border: 'none', cursor: 'pointer',
            outline: 'none', padding: 0,
          }}
        >
          <option value="recent">Recent</option>
          <option value="progress">Progress</option>
          <option value="title">A–Z</option>
        </select>
      </div>

      <div>
        {sorted.map((book) => {
          const { done, total } = getProgress(book)
          const pct = total ? Math.round((done / total) * 100) : 0

          return (
            <div key={book.id} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '14px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <img
                src={book.coverImage || coverFallback(book.title)}
                alt={book.title}
                onError={(e) => { e.target.src = coverFallback(book.title) }}
                style={{ width: 40, height: 56, objectFit: 'cover', borderRadius: 3, flexShrink: 0, background: 'var(--cream-3)' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 400,
                  color: 'var(--ink)', letterSpacing: '-0.01em',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  marginBottom: 3,
                }}>
                  {book.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {total > 0 ? (
                    <>
                      <div style={{ width: 80, height: 2, background: 'var(--cream-3)', borderRadius: 1 }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent)', borderRadius: 1, transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--ink-4)' }}>
                        {done}/{total}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--ink-4)' }}>No plan yet</span>
                  )}
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--ink-4)' }}>
                    · {formatDate(book.lastAccessedAt)}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => onResume(book)} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
                  color: 'var(--accent)', background: 'var(--accent-light)',
                  border: 'none', cursor: 'pointer', padding: '5px 12px', borderRadius: 5,
                }}>
                  Resume
                </button>
                <button onClick={() => onRemove(book.id)} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-4)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '5px 8px',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.target.style.color = 'oklch(45% 0.15 25)'}
                onMouseLeave={e => e.target.style.color = 'var(--ink-4)'}
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
