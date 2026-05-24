export async function generateLessonPlan(book) {
  const res = await fetch('/api/lesson-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: book.title, author: book.author, summary: book.summary }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to generate lesson plan')
  }

  const parsed = await res.json()
  const modules = parsed.modules.map((m) => ({
    ...m,
    id: crypto.randomUUID(),
    status: 'not_started',
    completedAt: null,
  }))
  return modules
}
