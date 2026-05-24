import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'
import booksRouter from './routes/books.js'
import lessonsRouter from './routes/lessons.js'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/books', booksRouter)
app.use('/api/lesson-plan', lessonsRouter)

// Serve built frontend in production
const distPath = join(__dirname, '../client/dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => res.sendFile(join(distPath, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`Lesson Leafs server running on port ${PORT}`)
})
