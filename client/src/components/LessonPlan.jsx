import ProgressBar from './ProgressBar'
import ModuleCard from './ModuleCard'

function StreamingIndicator() {
  return (
    <div style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
            animation: 'bounce 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.18}s`,
          }} />
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-3)' }}>
        Building your lesson plan…
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-4)' }}>
        Takes about 30 seconds
      </p>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function LessonPlan({ book, onStatusChange, onBack, isGenerating }) {
  const modules = book?.lessonPlan?.modules || []
  const coverFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(book?.title || '')}&background=d4e8e3&color=1a4a40&size=160&font-size=0.35&bold=true`

  return (
    <div>
      <button onClick={onBack} style={{
        fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-3)',
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        marginBottom: 32, display: 'block',
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => e.target.style.color = 'var(--ink)'}
      onMouseLeave={e => e.target.style.color = 'var(--ink-3)'}
      >
        ← Back
      </button>

      {/* Book header */}
      <div className="book-header" style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
        <img
          src={book?.coverImage || coverFallback}
          alt={book?.title}
          onError={(e) => { e.target.src = coverFallback }}
          style={{ width: 64, height: 90, objectFit: 'cover', borderRadius: 4, flexShrink: 0, background: 'var(--cream-3)' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10.5, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>
            Lesson Plan
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {book?.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-3)' }}>
            {book?.author}
            {book?.lessonPlan && (
              <span style={{ color: 'var(--ink-4)' }}> · Generated {new Date(book.lessonPlan.generatedAt).toLocaleDateString()}</span>
            )}
          </p>
        </div>
      </div>

      {isGenerating ? (
        <StreamingIndicator />
      ) : modules.length > 0 ? (
        <>
          <ProgressBar modules={modules} />
          <div>
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onStatusChange={(moduleId, status) => onStatusChange(book.id, moduleId, status)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
