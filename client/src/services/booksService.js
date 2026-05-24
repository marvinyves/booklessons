export async function searchBooks(query) {
  const res = await fetch(`/api/books?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Failed to search books')
  return res.json()
}
