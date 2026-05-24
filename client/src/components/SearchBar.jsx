import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        display: 'flex', gap: 8,
        border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border-2)'}`,
        borderRadius: 10, background: 'oklch(99% 0.004 75)',
        transition: 'border-color 0.15s',
        overflow: 'hidden',
      }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
  )
}
