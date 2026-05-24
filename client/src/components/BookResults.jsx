import BookCard from './BookCard'

function SkeletonItem() {
  return (
    <div style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ width: 72, height: 100, borderRadius: 4, background: 'var(--cream-3)', flexShrink: 0, animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
        <div style={{ height: 18, background: 'var(--cream-3)', borderRadius: 3, width: '65%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 13, background: 'var(--cream-3)', borderRadius: 3, width: '30%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 13, background: 'var(--cream-3)', borderRadius: 3, width: '90%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 13, background: 'var(--cream-3)', borderRadius: 3, width: '75%', animation: 'pulse 1.5s ease-in-out infinite' }} />
      </div>
    </div>
  )
}

export default function BookResults({ books, loading, error, onBuildPlan, generatingId, savedBooks, onBack }) {
  const getSavedProgress = (bookId) => {
    const saved = savedBooks.find((b) => b.id === bookId)
    if (!saved?.lessonPlan) return null
    const total = saved.lessonPlan.modules.length
    const completed = saved.lessonPlan.modules.filter((m) => m.status === 'applied' || m.status === 'practiced').length
    return { completed, total }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
        <button onClick={onBack} style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-3)',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
        onMouseEnter={e => e.target.style.color = 'var(--ink)'}
        onMouseLeave={e => e.target.style.color = 'var(--ink-3)'}
        >
          ← Back
        </button>
        {!loading && books.length > 0 && (
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-4)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {books.length} results
          </span>
        )}
      </div>

      {error && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'oklch(45% 0.15 25)', padding: '12px 16px', background: 'oklch(97% 0.03 25)', borderRadius: 8, marginBottom: 16 }}>
          {error}
        </p>
      )}

      <div>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)
          : books.length === 0
          ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-3)', padding: '48px 0', textAlign: 'center' }}>
              No results found. Try a different title.
            </p>
          )
          : books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBuildPlan={onBuildPlan}
              savedProgress={getSavedProgress(book.id)}
              loading={generatingId === book.id}
            />
          ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </div>
  )
}
