import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/', async (req, res) => {
  const { q } = req.query
  if (!q) return res.status(400).json({ error: 'Query required' })

  try {
    // Try Google Books first if API key is set, fall back to Open Library
    const googleKey = process.env.GOOGLE_BOOKS_API_KEY
    if (googleKey) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=8&key=${googleKey}`
      const response = await fetch(url)
      const data = await response.json()
      if (data.items) {
        const books = data.items.map((item) => {
          const info = item.volumeInfo
          return {
            id: item.id,
            title: info.title || 'Unknown Title',
            author: info.authors ? info.authors.join(', ') : 'Unknown Author',
            publishedYear: info.publishedDate ? info.publishedDate.substring(0, 4) : '',
            coverImage:
              info.imageLinks?.thumbnail?.replace('http://', 'https://') ||
              info.imageLinks?.smallThumbnail?.replace('http://', 'https://') ||
              null,
            summary: info.description
              ? info.description.substring(0, 400) + (info.description.length > 400 ? '…' : '')
              : 'No description available.',
          }
        })
        return res.json(books)
      }
    }

    // Open Library — no API key needed
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=8&fields=key,title,author_name,first_publish_year,cover_i,first_sentence,subject`
    const response = await fetch(url, { headers: { 'User-Agent': 'BookLearn/1.0 (educational app)' } })
    const data = await response.json()

    if (!data.docs || data.docs.length === 0) return res.json([])

    // Fetch work descriptions in parallel for books missing first_sentence
    const books = await Promise.all(data.docs.map(async (doc) => {
      const coverId = doc.cover_i
      const workId = doc.key?.replace('/works/', '')

      let summary = null
      if (doc.first_sentence) {
        const fs = doc.first_sentence
        summary = Array.isArray(fs) ? fs[0] : (typeof fs === 'object' ? fs.value : fs)
      }

      // Fetch work description if no summary yet
      if (!summary && workId) {
        try {
          const wRes = await fetch(`https://openlibrary.org/works/${workId}.json`, {
            headers: { 'User-Agent': 'BookLearn/1.0 (educational app)' },
            signal: AbortSignal.timeout(3000),
          })
          if (wRes.ok) {
            const w = await wRes.json()
            const desc = w.description
            if (desc) {
              const raw = typeof desc === 'object' ? desc.value : desc
              summary = raw.substring(0, 400) + (raw.length > 400 ? '…' : '')
            }
          }
        } catch { /* timeout or network error — skip */ }
      }

      return {
        id: workId || Math.random().toString(36).slice(2),
        title: doc.title || 'Unknown Title',
        author: doc.author_name ? doc.author_name.slice(0, 2).join(', ') : 'Unknown Author',
        publishedYear: doc.first_publish_year ? String(doc.first_publish_year) : '',
        coverImage: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null,
        summary: summary || 'No description available.',
      }
    }))

    res.json(books)
  } catch (err) {
    console.error('Books API error:', err)
    res.status(500).json({ error: 'Failed to fetch books' })
  }
})

export default router
