import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'booklearn_session'

const defaultSession = {
  savedBooks: [],
  lastAccessedBookId: null,
}

export function useLessonStore() {
  const [session, setSession] = useLocalStorage(STORAGE_KEY, defaultSession)

  const savedBooks = session.savedBooks || []
  const lastAccessedBookId = session.lastAccessedBookId

  function addBook(book) {
    setSession((prev) => {
      const exists = prev.savedBooks.find((b) => b.id === book.id)
      if (exists) return prev
      return {
        ...prev,
        savedBooks: [{ ...book, addedAt: new Date().toISOString(), lastAccessedAt: new Date().toISOString(), lessonPlan: null }, ...prev.savedBooks],
        lastAccessedBookId: book.id,
      }
    })
  }

  function removeBook(bookId) {
    setSession((prev) => ({
      ...prev,
      savedBooks: prev.savedBooks.filter((b) => b.id !== bookId),
      lastAccessedBookId: prev.lastAccessedBookId === bookId ? null : prev.lastAccessedBookId,
    }))
  }

  function saveLessonPlan(bookId, modules) {
    setSession((prev) => ({
      ...prev,
      savedBooks: prev.savedBooks.map((b) =>
        b.id === bookId
          ? {
              ...b,
              lastAccessedAt: new Date().toISOString(),
              lessonPlan: {
                id: crypto.randomUUID(),
                bookId,
                generatedAt: new Date().toISOString(),
                modules,
              },
            }
          : b
      ),
    }))
  }

  function updateModuleStatus(bookId, moduleId, status) {
    setSession((prev) => ({
      ...prev,
      savedBooks: prev.savedBooks.map((b) => {
        if (b.id !== bookId || !b.lessonPlan) return b
        return {
          ...b,
          lastAccessedAt: new Date().toISOString(),
          lessonPlan: {
            ...b.lessonPlan,
            modules: b.lessonPlan.modules.map((m) =>
              m.id === moduleId
                ? { ...m, status, completedAt: status === 'applied' ? new Date().toISOString() : m.completedAt }
                : m
            ),
          },
        }
      }),
    }))
  }

  function setLastAccessed(bookId) {
    setSession((prev) => ({
      ...prev,
      lastAccessedBookId: bookId,
      savedBooks: prev.savedBooks.map((b) =>
        b.id === bookId ? { ...b, lastAccessedAt: new Date().toISOString() } : b
      ),
    }))
  }

  function getBook(bookId) {
    return savedBooks.find((b) => b.id === bookId) || null
  }

  return {
    savedBooks,
    lastAccessedBookId,
    addBook,
    removeBook,
    saveLessonPlan,
    updateModuleStatus,
    setLastAccessed,
    getBook,
  }
}
