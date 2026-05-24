const ROWS = [
  {
    authors: ['James Clear', 'Malcolm Gladwell', 'Cal Newport', 'Daniel Kahneman', 'Ryan Holiday', 'Nassim Taleb', 'Morgan Housel', 'Adam Grant'],
    dir: 'left', speed: 38, opacity: 0.13, size: 15, font: 'var(--font-serif)', weight: 400,
  },
  {
    authors: ['Brené Brown', 'Simon Sinek', 'Angela Duckworth', 'Viktor Frankl', 'Dale Carnegie', 'Robert Cialdini', 'Stephen Covey', 'Tim Ferriss'],
    dir: 'right', speed: 52, opacity: 0.08, size: 22, font: 'var(--font-serif)', weight: 300,
  },
  {
    authors: ['Seth Godin', 'Patrick Lencioni', 'Jim Collins', 'Gary Keller', 'Mark Manson', 'Yuval Noah Harari', 'Annie Duke', 'Jocko Willink'],
    dir: 'left', speed: 44, opacity: 0.06, size: 13, font: 'var(--font-sans)', weight: 400,
  },
  {
    authors: ['Tara Westover', 'Michelle Obama', 'Matthew McConaughey', 'Naval Ravikant', 'Jordan Peterson', 'Clayton Christensen', 'George Saunders', 'Nassim Taleb'],
    dir: 'right', speed: 62, opacity: 0.10, size: 19, font: 'var(--font-serif)', weight: 300,
  },
  {
    authors: ['James Clear', 'Brené Brown', 'Malcolm Gladwell', 'Cal Newport', 'Adam Grant', 'Ryan Holiday', 'Morgan Housel', 'Angela Duckworth'],
    dir: 'left', speed: 70, opacity: 0.05, size: 26, font: 'var(--font-serif)', weight: 300,
  },
]

function TickerRow({ authors, dir, speed, opacity, size, font, weight }) {
  // Duplicate for seamless loop
  const items = [...authors, ...authors, ...authors]
  const separator = <span style={{ margin: '0 28px', opacity: 0.4 }}>·</span>

  return (
    <div style={{ overflow: 'hidden', width: '100%', lineHeight: 1 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
        animation: `ticker-${dir} ${speed}s linear infinite`,
        willChange: 'transform',
      }}>
        {items.map((name, i) => (
          <span key={i} style={{
            fontFamily: font, fontSize: size, fontWeight: weight,
            color: 'var(--ink)', opacity,
            letterSpacing: '-0.01em',
          }}>
            {name}{separator}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AuthorTicker() {
  return (
    <div style={{
      position: 'relative',
      marginTop: 48,
      display: 'flex', flexDirection: 'column', gap: 20,
      // Fade edges
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
    }}>
      {ROWS.map((row, i) => (
        <TickerRow key={i} {...row} />
      ))}

      <style>{`
        @keyframes ticker-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes ticker-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ticker"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
