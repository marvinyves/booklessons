import { useState, useEffect } from 'react'

const QUOTES = [
  { text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi' },
  { text: 'The beautiful thing about learning is that no one can take it away from you.', author: 'B.B. King' },
  { text: 'Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young.', author: 'Henry Ford' },
  { text: 'Learning never exhausts the mind.', author: 'Leonardo da Vinci' },
  { text: 'Develop a passion for learning. If you do, you will never cease to grow.', author: 'Anthony J. D\'Angelo' },
  { text: 'I am still learning.', author: 'Michelangelo' },
  { text: 'Learning is a treasure that will follow its owner everywhere.', author: 'Chinese Proverb' },
  { text: 'Change is the end result of all true learning.', author: 'Leo Buscaglia' },
  { text: 'You don\'t understand anything until you learn it more than one way.', author: 'Marvin Minsky' },
  { text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates' },
  { text: 'It is what we know already that often prevents us from learning.', author: 'Claude Bernard' },
  { text: 'Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.', author: 'Richard Feynman' },
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
