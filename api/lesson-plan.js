const Anthropic = require('@anthropic-ai/sdk')

const SYSTEM_PROMPT = `You are an expert learning designer who transforms non-fiction books into structured lesson plans using three accelerated learning frameworks:
- The First 20 Hours (Kaufman): Deconstruct the skill, focus on the most impactful sub-skills, apply deliberate practice in short focused sessions
- Ultralearning (Young): Apply directness and retrieval practice — every lesson pushes toward application, not passive reading
- A Mind for Numbers (Oakley): Alternate focused and diffuse thinking modes — build in recall and analogies so concepts stick neurologically

Generate a lesson plan of 12-13 modules for the provided book. Return ONLY valid JSON — no markdown, no commentary, just the JSON object.

Each module must have these exact fields:
- number (integer 1-13)
- title (string: the lesson's theme, not just a chapter title)
- quickSummary (string: 2-3 sentences — Hook: why it matters, Core idea: what is it, Implication: so what)
- focusedLearningBlock (string: a 5-minute active directed activity — read a specific passage, skim key points, watch a short explanation — ends with one thing to hold in mind. Never passive.)
- detailedBreakdown (string: 200-300 words — main concept with bold-style markers using **bold**, psychology/mechanism WHY it works, real examples from the book, common misconception addressed, ends with "Apply This:" prompt as a universally worded reflection question any reader can answer)
- dailyReflection (string: opens with a retrieval question "Without looking back, what was the core idea of this lesson?", followed by one deeper introspection question with no right answer)
- diffuseThinkingPrompt (string: one open-ended question using analogy, metaphor, or pattern-matching to let the concept settle in background thought — NOT a task, no clear answer)
- deliberatePracticeTask (string: a specific 10-30 minute task tied to the book's subject matter — starts with a verb like Do/Write/Test/Identify/Track/Build — generic enough for any reader, with an observable outcome "you'll notice X" or "you'll have Y")
- keyWisdom (string: under 15 words, quotable, no jargon, implies action)
- status (string: always "not_started")

Quality rules:
- deliberatePracticeTask must be GENERIC — tied to the book's subject, applicable to any reader, NOT personalized to any specific person's life
- Rotate practice task types across lessons (writing, testing, observing, building, tracking)
- dailyReflection must start with retrieval before introspection
- diffuseThinkingPrompt must be open and wandering — not a to-do
- Vary lesson themes to cover the full arc of the book, not just early chapters

Return this exact JSON shape:
{
  "modules": [ ...array of 12-13 module objects... ]
}`

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}) }
      catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  let body
  try {
    body = await parseBody(req)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  const { title, author, summary } = body
  if (!title) return res.status(400).json({ error: 'Book title required' })

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const userMessage = `Generate a 12-13 module lesson plan for this book:

Title: ${title}
Author: ${author || 'Unknown'}
Summary: ${summary || 'No summary available'}

Return only the JSON object with a "modules" array.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userMessage }],
    })

    const text = message.content[0].text
    const parsed = JSON.parse(text)
    res.status(200).json(parsed)
  } catch (err) {
    console.error('Lesson generation error:', err)
    res.status(500).json({ error: err.message || 'Failed to generate lesson plan' })
  }
}
