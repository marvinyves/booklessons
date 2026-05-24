import express from 'express'
import { generateLessonPlan } from '../services/claudeService.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { title, author, summary } = req.body
  if (!title) return res.status(400).json({ error: 'Book title required' })

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  try {
    await generateLessonPlan({ title, author, summary }, (chunk) => {
      res.write(`data: ${JSON.stringify({ type: 'chunk', text: chunk })}\n\n`)
    })

    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`)
  } catch (err) {
    console.error('Lesson generation error:', err)
    res.write(`data: ${JSON.stringify({ type: 'error', message: err.message })}\n\n`)
  } finally {
    res.end()
  }
})

export default router
