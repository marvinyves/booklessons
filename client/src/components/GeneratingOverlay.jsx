import { useState, useEffect } from 'react'

const QUOTES = [
  { text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi' },
  { text: 'The beautiful thing about learning is that no one can take it away from you.', author: 'B.B. King' },
  { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela' },
  { text: 'Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young.', author: 'Henry Ford' },
  { text: 'Learning never exhausts the mind.', author: 'Leonardo da Vinci' },
  { text: 'The more that you read, the more things you will know. The more that you learn, the more places you\'ll go.', author: 'Dr. Seuss' },
  { text: 'Develop a passion for learning. If you do, you will never cease to grow.', author: 'Anthony J. D\'Angelo' },
  { text: 'I am still learning.', author: 'Michelangelo' },
  { text: 'Learning is a treasure that will follow its owner everywhere.', author: 'Chinese Proverb' },
  { text: 'Change is the end result of all true learning.', author: 'Leo Buscaglia' },
  { text: 'You don\'t understand anything until you learn it more than one way.', author: 'Marvin Minsky' },
  { text: 'Intellectual growth should commence at birth and cease only at death.', author: 'Albert Einstein' },
  { text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates' },
  { text: 'It is what we know already that often prevents us from learning.', author: 'Claude Bernard' },
  { text: 'Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.', author: 'Richard Feynman' },
  { text: 'Education is what remains after one has forgotten what one has learned in school.', author: 'Albert Einstein' },
  { text: 'A person who never made a mistake never tried anything new.', author: 'Albert Einstein' },
  { text: 'He who learns but does not think, is lost! He who thinks but does not learn is in great danger.', author: 'Confucius' },
  { text: 'I never learn anything talking. I only learn things when I ask questions.', author: 'Lou Holtz' },
  { text: 'The only person who is educated is the one who has learned how to learn and change.', author: 'Carl Rogers' },
  { text: 'Learning is not compulsory... neither is survival.', author: 'W. Edwards Deming' },
  { text: 'Tell me and I forget, teach me and I may remember, involve me and I learn.', author: 'Benjamin Franklin' },
  { text: 'Every student can learn, just not on the same day, or the same way.', author: 'George Evans' },
  { text: 'By seeking and blundering we learn.', author: 'Johann Wolfgang von Goethe' },
  { text: 'Spoon feeding in the long run teaches us nothing but the shape of the spoon.', author: 'E.M. Forster' },
  { text: 'The expert in anything was once a beginner.', author: 'Helen Hayes' },
  { text: 'All the world is a laboratory to the inquiring mind.', author: 'Martin H. Fischer' },
  { text: 'Learning is an ornament in prosperity, a refuge in adversity, and a provision in old age.', author: 'Aristotle' },
  { text: 'The highest activity a human being can attain is learning for understanding, because to understand is to be free.', author: 'Baruch Spinoza' },
  { text: 'Curiosity is the wick in the candle of learning.', author: 'William Arthur Ward' },
  { text: 'Never let formal education get in the way of your learning.', author: 'Mark Twain' },
  { text: 'You cannot open a book without learning something.', author: 'Confucius' },
  { text: 'The purpose of learning is growth, and our minds, unlike our bodies, can continue growing as we continue to live.', author: 'Mortimer Adler' },
  { text: 'We learn more by looking for the answer to a question and not finding it than we do from learning the answer itself.', author: 'Lloyd Alexander' },
  { text: 'I have never met a man so ignorant that I couldn\'t learn something from him.', author: 'Galileo Galilei' },
  { text: 'Wisdom is not a product of schooling but of the lifelong attempt to acquire it.', author: 'Albert Einstein' },
  { text: 'One learns from books and example only that certain things can be done. Actual learning requires that you do those things.', author: 'Frank Herbert' },
  { text: 'If you think education is expensive, try ignorance.', author: 'Derek Bok' },
  { text: 'Learning without thought is labor lost; thought without learning is perilous.', author: 'Confucius' },
  { text: 'To acquire knowledge, one must study; but to acquire wisdom, one must observe.', author: 'Marilyn vos Savant' },
  { text: 'The more I live, the more I learn. The more I learn, the more I realize, the less I know.', author: 'Michel Legrand' },
  { text: 'Always walk through life as if you have something new to learn and you will.', author: 'Vernon Howard' },
  { text: 'I am always doing that which I cannot do, in order that I may learn how to do it.', author: 'Pablo Picasso' },
  { text: 'In youth we learn; in age, we understand.', author: 'Marie von Ebner-Eschenbach' },
  { text: 'You learn something every day if you pay attention.', author: 'Ray LeBlond' },
]

export default function GeneratingOverlay({ book }) {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length))
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out, swap quote, fade in
      setVisible(false)
      setTimeout(() => {
        setQuoteIndex(i => (i + 1) % QUOTES.length)
        setVisible(true)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const quote = QUOTES[quoteIndex]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'oklch(97.5% 0.006 75 / 0.88)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: 480, width: '100%', padding: '0 32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48,
        textAlign: 'center',
      }}>

        {/* Animated dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--accent)',
              animation: 'ol-bounce 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.22}s`,
            }} />
          ))}
        </div>

        {/* Status text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
            color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            Building your lesson plan
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400,
            color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.25,
          }}>
            {book?.title}
          </p>
          {book?.author && (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-3)' }}>
              {book.author}
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 40, height: 1, background: 'var(--border-2)' }} />

        {/* Rotating quote */}
        <div style={{
          transition: 'opacity 0.5s ease',
          opacity: visible ? 1 : 0,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300,
            color: 'var(--ink-2)', lineHeight: 1.6, letterSpacing: '-0.01em',
            fontStyle: 'italic',
          }}>
            "{quote.text}"
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-4)',
            letterSpacing: '0.04em',
          }}>
            — {quote.author}
          </p>
        </div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-4)' }}>
          Takes about 30 seconds
        </p>
      </div>

      <style>{`
        @keyframes ol-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
