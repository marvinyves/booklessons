import { useState, useEffect, useRef, useCallback } from 'react'
import { searchBooks } from '../services/booksService'

function debounce(fn, delay) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay) }
}

function DropdownBook({ book, onBuildPlan, generatingId }) {
  const coverFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(book.title)}&background=d4e8e3&color=1a4a40&size=64&font-size=0.35&bold=true`
  const isGenerating = generatingId === book.id

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 16px',
      transition: 'background 0.1s',
      cursor: 'default',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-2)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <img
        src={book.coverImage || coverFallback}
        onError={e => { e.target.src = coverFallback }}
        alt={book.title}
        style={{ width: 32, height: 44, objectFit: 'cover', borderRadius: 3, flexShrink: 0, background: 'var(--cream-3)' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--ink)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          letterSpacing: '-0.01em', marginBottom: 2,
        }}>
          {book.title}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--ink-4)' }}>
          {book.author}{book.publishedYear ? ` · ${book.publishedYear}` : ''}
        </p>
      </div>
      <button
        onMouseDown={e => { e.preventDefault(); onBuildPlan(book) }}
        disabled={isGenerating}
        style={{
          fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 500,
          color: isGenerating ? 'var(--ink-4)' : 'var(--accent)',
          background: isGenerating ? 'var(--cream-3)' : 'var(--accent-light)',
          border: 'none', cursor: isGenerating ? 'default' : 'pointer',
          padding: '5px 10px', borderRadius: 5, flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {isGenerating ? '…' : 'Lesson Plan'}
      </button>
    </div>
  )
}

export default function SearchBar({ onSearch, onBuildPlan, generatingId, loading }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [liveResults, setLiveResults] = useState([])
  const [liveLoading, setLiveLoading] = useState(false)
  const containerRef = useRef(null)

  const doLiveSearch = useCallback(
    debounce(async (q) => {
      if (q.length < 2) { setLiveResults([]); return }
      setLiveLoading(true)
      try {
        const results = await searchBooks(q)
        setLiveResults(results.slice(0, 6))
      } catch { setLiveResults([]) }
      finally { setLiveLoading(false) }
    }, 350),
    []
  )

  function handleChange(e) {
    const val = e.target.value
    setQuery(val)
    if (!val.trim()) { setLiveResults([]); return }
    doLiveSearch(val.trim())
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      setLiveResults([])
      onSearch(query.trim())
    }
  }

  function handleKey(e) {
    if (e.key === 'Escape') { setLiveResults([]); e.target.blur() }
  }

  const showDropdown = focused && (liveResults.length > 0 || liveLoading)

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex', gap: 8,
          border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border-2)'}`,
          borderRadius: showDropdown ? '10px 10px 0 0' : 10,
          background: 'oklch(99% 0.004 75)',
          transition: 'border-color 0.15s',
          overflow: 'hidden',
        }}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onKeyDown={handleKey}
            placeholder="Search by title or author…"
            disabled={loading}
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink)',
              padding: '13px 16px', outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
              color: (!loading && query.trim()) ? 'oklch(99% 0.004 75)' : 'var(--ink-4)',
              background: (!loading && query.trim()) ? 'var(--accent)' : 'var(--cream-3)',
              border: 'none', cursor: (!loading && query.trim()) ? 'pointer' : 'default',
              padding: '0 20px', margin: 4, borderRadius: 7,
              transition: 'background 0.15s, color 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
      </form>

      {/* Live dropdown */}
      {showDropdown && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
          background: 'oklch(99% 0.004 75)',
          border: '1.5px solid var(--accent)', borderTop: '1px solid var(--border)',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 8px 24px oklch(18% 0.015 65 / 0.08)',
          overflow: 'hidden',
        }}>
          {liveLoading ? (
            <div style={{ padding: '14px 16px', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-4)' }}>
              Searching…
            </div>
          ) : (
            <>
              {liveResults.map(book => (
                <DropdownBook
                  key={book.id}
                  book={book}
                  onBuildPlan={(b) => { setLiveResults([]); onBuildPlan(b) }}
                  generatingId={generatingId}
                />
              ))}
              <div
                onMouseDown={(e) => { e.preventDefault(); if (query.trim()) { setLiveResults([]); onSearch(query.trim()) } }}
                style={{
                  padding: '10px 16px',
                  borderTop: '1px solid var(--border)',
                  fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--ink-3)',
                  cursor: 'pointer', transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                See all results for "{query}" →
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
