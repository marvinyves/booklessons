import { useState, useEffect } from 'react'

const FRAMEWORKS = [
  {
    number: '01',
    author: 'Josh Kaufman',
    title: 'The First 20 Hours',
    description: 'Deconstruct the skill, focus on the most impactful sub-skills first, and apply deliberate practice in short focused sessions tied to real life.',
    accent: 'var(--learning)',
    bg: 'var(--learning-bg)',
  },
  {
    number: '02',
    author: 'Scott Young',
    title: 'Ultralearning',
    description: 'Apply directness and retrieval practice — every lesson pushes toward application, not passive reading.',
    accent: 'var(--practiced)',
    bg: 'var(--practiced-bg)',
  },
  {
    number: '03',
    author: 'Barbara Oakley',
    title: 'A Mind for Numbers',
    description: 'Alternate focused and diffuse thinking modes — build in recall and analogies so concepts stick neurologically.',
    accent: 'var(--applied)',
    bg: 'var(--applied-bg)',
  },
]

function Modal({ onClose }) {
  // Close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'oklch(10% 0.015 65 / 0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        padding: '24px 16px',
        animation: 'ls-fadein 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--cream)',
          borderRadius: 16,
          maxWidth: 560, width: '100%',
          maxHeight: '90vh', overflowY: 'auto',
          padding: '40px 40px 36px',
          animation: 'ls-slidein 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--cream-2)', border: 'none',
            cursor: 'pointer', fontSize: 16, color: 'var(--ink-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--cream-3)'; e.currentTarget.style.color = 'var(--ink)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream-2)'; e.currentTarget.style.color = 'var(--ink-3)' }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 10.5, fontWeight: 600,
            color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em',
            marginBottom: 8,
          }}>
            The Learning Science
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 400,
            color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2,
            marginBottom: 12,
          }}>
            Three frameworks,<br />synthesized into every lesson.
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-3)',
            lineHeight: 1.6, maxWidth: '44ch',
          }}>
            Each module is built on decades of research into how the brain actually retains and applies new knowledge.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

        {/* Frameworks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {FRAMEWORKS.map(({ number, author, title, description, accent, bg }) => (
            <div key={number} style={{
              display: 'flex', gap: 16,
              padding: '18px 20px',
              background: bg,
              borderRadius: 10,
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 300,
                color: accent, lineHeight: 1, flexShrink: 0, marginTop: 2,
                opacity: 0.7,
              }}>
                {number}
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 10.5, fontWeight: 600,
                  color: accent, textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: 3,
                }}>
                  {author}
                </p>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 400,
                  color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 6,
                }}>
                  {title}
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--ink-2)',
                  lineHeight: 1.6,
                }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ls-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ls-slidein {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

export default function LearningScience() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500,
          color: 'var(--accent-text)',
          background: 'var(--accent-light)',
          border: '1px solid oklch(82% 0.06 168)',
          cursor: 'pointer',
          padding: '6px 14px',
          borderRadius: 20,
          display: 'inline-flex', alignItems: 'center', gap: 7,
          position: 'relative', overflow: 'hidden',
          transition: 'box-shadow 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 0 3px oklch(82% 0.06 168 / 0.5)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        {/* Shimmer sweep */}
        <span style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, transparent 40%, oklch(99% 0.02 168 / 0.6) 50%, transparent 60%)',
          animation: 'ls-shimmer 2.4s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        {/* Pulse dot */}
        <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'ls-pulse 2s ease-in-out infinite',
          }} />
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'var(--accent)',
          }} />
        </span>
        The Learning Science
        <style>{`
          @keyframes ls-shimmer {
            0%   { transform: translateX(-100%); }
            60%  { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes ls-pulse {
            0%, 100% { transform: scale(1);   opacity: 1; }
            50%       { transform: scale(2.2); opacity: 0; }
          }
        `}</style>
      </button>

      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  )
}
