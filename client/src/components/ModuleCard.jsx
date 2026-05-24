import { useState } from 'react'

const STATUS_CONFIG = {
  not_started: { label: 'Not started', dot: 'var(--border-2)',   text: 'var(--ink-3)', next: 'learning',    nextLabel: 'Mark as Learning' },
  learning:    { label: 'Learning',    dot: 'var(--learning)',   text: 'var(--learning)', next: 'practiced', nextLabel: 'Mark as Practiced' },
  practiced:   { label: 'Practiced',   dot: 'var(--practiced)',  text: 'var(--practiced)', next: 'applied', nextLabel: 'Mark as Applied' },
  applied:     { label: 'Applied',     dot: 'var(--applied)',    text: 'var(--applied)', next: 'not_started', nextLabel: 'Reset' },
}

const SECTIONS = [
  { key: 'quickSummary',         label: 'Summary' },
  { key: 'focusedLearningBlock', label: '5-Min Block' },
  { key: 'detailedBreakdown',    label: 'Deep Dive' },
  { key: 'dailyReflection',      label: 'Reflection' },
  { key: 'diffuseThinkingPrompt',label: 'Diffuse Thinking' },
  { key: 'deliberatePracticeTask',label: 'Practice Task' },
  { key: 'keyWisdom',            label: 'Key Wisdom' },
]

export default function ModuleCard({ module, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)
  const status = STATUS_CONFIG[module.status] || STATUS_CONFIG.not_started
  const isApplied = module.status === 'applied'

  function cycleStatus(e) {
    e.stopPropagation()
    onStatusChange(module.id, status.next)
  }

  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      background: isApplied ? 'oklch(96.5% 0.010 168 / 0.4)' : 'transparent',
      transition: 'background 0.2s',
    }}>
      {/* Header row */}
      <div onClick={() => setExpanded(v => !v)} className="module-row">
        {/* Large editorial number */}
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 'var(--module-num-size)', fontWeight: 300,
          color: isApplied ? 'var(--applied)' : 'var(--ink-4)',
          lineHeight: 1, minWidth: 36, flexShrink: 0,
          marginTop: 2,
          transition: 'color 0.2s',
        }}>
          {String(module.number).padStart(2, '0')}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 400,
            color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.3,
            marginBottom: expanded ? 0 : 5,
          }}>
            {module.title}
          </h3>
          {!expanded && module.keyWisdom && (
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--ink-4)',
              fontStyle: 'italic', lineHeight: 1.4,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              "{module.keyWisdom}"
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Status indicator */}
          <button
            onClick={cycleStatus}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-sans)', fontSize: 12, color: status.text,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              transition: 'opacity 0.15s',
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: status.dot, flexShrink: 0 }} />
            {status.label}
          </button>

          {/* Expand chevron */}
          <span style={{
            color: 'var(--ink-4)', fontSize: 11, lineHeight: 1,
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            display: 'block',
          }}>
            ▾
          </span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="module-expanded-content" style={{ paddingBottom: 28, paddingLeft: 56 }}>
          {SECTIONS.map(({ key, label }) =>
            module[key] ? (
              <div key={key} style={{ marginBottom: 24 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 10.5, fontWeight: 600,
                  color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.09em',
                  marginBottom: 7,
                }}>
                  {label}
                </p>
                <p style={{
                  fontFamily: key === 'keyWisdom' ? 'var(--font-serif)' : 'var(--font-sans)',
                  fontSize: key === 'keyWisdom' ? 17 : 14,
                  fontStyle: key === 'keyWisdom' ? 'italic' : 'normal',
                  fontWeight: key === 'keyWisdom' ? 400 : 400,
                  color: 'var(--ink-2)', lineHeight: 1.7,
                  maxWidth: '60ch', whiteSpace: 'pre-wrap',
                }}>
                  {module[key]}
                </p>
              </div>
            ) : null
          )}

          <button
            onClick={(e) => { cycleStatus(e) }}
            style={{
              marginTop: 4,
              fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500,
              color: status.text === 'var(--ink-3)' ? 'var(--accent)' : status.text,
              background: 'none', border: `1px solid ${status.dot === 'var(--border-2)' ? 'var(--border-2)' : status.dot}`,
              cursor: 'pointer', padding: '6px 14px', borderRadius: 6,
              transition: 'opacity 0.15s',
            }}
          >
            {status.nextLabel}
          </button>
        </div>
      )}
    </div>
  )
}
