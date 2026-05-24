import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import booksRouter from './routes/books.js'
import lessonsRouter from './routes/lessons.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/books', booksRouter)
app.use('/api/lesson-plan', lessonsRouter)

app.listen(PORT, () => {
  console.log(`BookLearn server running on http://localhost:${PORT}`)
})
