import express from 'express'
import { generateLessonPlan } from '../services/claudeService.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { title, author, summary } = req.body
  if (!title) return res.status(400).json({ error: 'Book title required' })

  try {
    const result = await generateLessonPlan({ title, author, summary })
    const parsed = JSON.parse(result)
    res.json(parsed)
  } catch (err) {
    console.error('Lesson generation error:', err)
    res.status(500).json({ error: err.message || 'Failed to generate lesson plan' })
  }
})

export default router
