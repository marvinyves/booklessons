export async function generateLessonPlan(book, onProgress) {
  const res = await fetch('/api/lesson-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: book.title, author: book.author, summary: book.summary }),
  })

  if (!res.ok) throw new Error('Failed to start lesson generation')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let fullText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop()

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      try {
        const event = JSON.parse(line.slice(6))
        if (event.type === 'chunk') {
          fullText += event.text
          onProgress?.(fullText)
        } else if (event.type === 'error') {
          throw new Error(event.message)
        }
      } catch (e) {
        if (e.message !== 'Failed to start lesson generation') continue
        throw e
      }
    }
  }

  const parsed = JSON.parse(fullText)
  const modules = parsed.modules.map((m) => ({
    ...m,
    id: crypto.randomUUID(),
    status: 'not_started',
    completedAt: null,
  }))
  return modules
}
