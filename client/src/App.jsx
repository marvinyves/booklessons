import { useState } from 'react'
import { useLessonStore } from './hooks/useLessonStore'
import { searchBooks } from './services/booksService'
import { generateLessonPlan } from './services/lessonService'
import SearchBar from './components/SearchBar'
import BookResults from './components/BookResults'
import LessonPlan from './components/LessonPlan'
import SavedLibrary from './components/SavedLibrary'
import AuthorTicker from './components/AuthorTicker'

export default function App() {
  const store = useLessonStore()

  const [view, setView] = useState('home')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [generatingId, setGeneratingId] = useState(null)
  const [activeBookId, setActiveBookId] = useState(null)

  async function handleSearch(query) {
    setSearching(true)
    setSearchError(null)
    setSearchResults([])
    setView('results')
    try {
      const results = await searchBooks(query)
      setSearchResults(results)
    } catch (err) {
      setSearchError('Search failed. Make sure the server is running.')
    } finally {
      setSearching(false)
    }
  }

  async function handleBuildPlan(book) {
    store.addBook(book)
    setActiveBookId(book.id)
    setView('lesson')

    const existing = store.getBook(book.id)
    if (existing?.lessonPlan) return

    setGeneratingId(book.id)
    try {
      const modules = await generateLessonPlan(book)
      store.saveLessonPlan(book.id, modules)
    } catch (err) {
      console.error('Lesson generation failed:', err)
    } finally {
      setGeneratingId(null)
    }
  }

  function handleResume(book) {
    store.setLastAccessed(book.id)
    setActiveBookId(book.id)
    setView('lesson')
  }

  const activeBook = store.getBook(activeBookId)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'oklch(97.5% 0.006 75 / 0.96)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 var(--page-padding)', height: 'var(--header-h)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setView('home')} style={{
            fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 500,
            color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: '-0.01em', padding: 0,
          }}>
            Lesson Leafs
          </button>
          {view !== 'home' && (
            <button onClick={() => setView('home')} style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-3)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--ink)'}
            onMouseLeave={e => e.target.style.color = 'var(--ink-3)'}
            >
              ← Home
            </button>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: 'var(--section-gap) var(--page-padding) 96px' }}>
        {view === 'home' && (
          <>
            <div style={{ marginBottom: 'var(--section-gap)' }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--hero-size)', fontWeight: 300, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 'var(--hero-leading)', marginBottom: 12 }}>
                Every book you read<br />deserves a proper lesson.
              </h1>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-3)', maxWidth: '46ch', lineHeight: 1.6 }}>
                Search for any non-fiction book and get a structured, science-backed lesson plan — built around how you actually retain things.
              </p>
            </div>
            <SearchBar onSearch={handleSearch} onBuildPlan={handleBuildPlan} generatingId={generatingId} loading={searching} />
            <AuthorTicker />
            <SavedLibrary
              savedBooks={store.savedBooks}
              onResume={handleResume}
              onRemove={store.removeBook}
            />
          </>
        )}

        {view === 'results' && (
          <>
            <div style={{ marginBottom: 32 }}>
              <SearchBar onSearch={handleSearch} onBuildPlan={handleBuildPlan} generatingId={generatingId} loading={searching} />
            </div>
            <BookResults
              books={searchResults}
              loading={searching}
              error={searchError}
              onBuildPlan={handleBuildPlan}
              generatingId={generatingId}
              savedBooks={store.savedBooks}
              onBack={() => setView('home')}
            />
          </>
        )}

        {view === 'lesson' && activeBook && (
          <LessonPlan
            book={activeBook}
            onStatusChange={store.updateModuleStatus}
            onBack={() => setView(searchResults.length > 0 ? 'results' : 'home')}
            isGenerating={generatingId === activeBook.id}
          />
        )}
      </main>
    </div>
  )
}
