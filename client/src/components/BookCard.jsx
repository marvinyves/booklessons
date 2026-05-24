export default function BookCard({ book, onBuildPlan, savedProgress, loading }) {
  const coverFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(book.title)}&background=d4e8e3&color=1a4a40&size=160&font-size=0.35&bold=true`

  return (
    <div style={{
      display: 'flex', gap: 20,
      padding: '20px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <img
        src={book.coverImage || coverFallback}
        alt={book.title}
        onError={(e) => { e.target.src = coverFallback }}
        style={{
          width: 72, height: 100, objectFit: 'cover', flexShrink: 0,
          borderRadius: 4, background: 'var(--cream-3)',
        }}
      />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400,
            color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.3,
            marginBottom: 4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {book.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.01em' }}>
            {book.author}{book.publishedYear ? ` · ${book.publishedYear}` : ''}
          </p>
        </div>

        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.6,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {book.summary}
        </p>

        <div style={{ marginTop: 4 }}>
          {savedProgress != null ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-3)' }}>
                {savedProgress.completed} of {savedProgress.total} modules done
              </span>
              <button onClick={() => onBuildPlan(book)} style={{
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
                color: 'var(--accent)', background: 'none', border: 'none',
                cursor: 'pointer', padding: 0, textDecoration: 'none',
              }}>
                Resume →
              </button>
            </div>
          ) : (
            <button
              onClick={() => onBuildPlan(book)}
              disabled={loading}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
                color: loading ? 'var(--ink-4)' : 'var(--accent)',
                background: loading ? 'var(--cream-3)' : 'var(--accent-light)',
                border: 'none', cursor: loading ? 'default' : 'pointer',
                padding: '7px 14px', borderRadius: 6, transition: 'background 0.15s',
              }}
            >
              {loading ? 'Generating…' : 'Build Lesson Plan'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
