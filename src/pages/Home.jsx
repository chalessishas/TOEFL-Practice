import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../shared/ThemeContext.jsx'
import { getHistory } from '../writing/scoreHistory.js'

function ModuleCard({ icon, title, details, onStart, accentColor, hasResume }) {
  const [hovered, setHovered] = useState(false)
  const { colors, fonts, shadows } = useTheme()

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onStart}
      style={{
        background: colors.white,
        border: `1.5px solid ${hovered ? (accentColor || colors.primary) : colors.border}`,
        borderRadius: 10,
        padding: 24,
        flex: '1 1 240px',
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? shadows.cardHover : shadows.card,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: accentColor || colors.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <path d={icon} />
          </svg>
        </div>
        {hasResume && (
          <span style={{
            fontSize: 10, fontWeight: 600, color: accentColor || colors.primary,
            background: `${accentColor || colors.primary}18`,
            padding: '3px 8px', borderRadius: 20,
            fontFamily: fonts.body, letterSpacing: '0.03em',
          }}>IN PROGRESS</span>
        )}
      </div>

      <div>
        <div style={{ fontFamily: fonts.heading, fontSize: 20, color: colors.text, marginBottom: 6 }}>
          {title}
        </div>
        {details.map((d, i) => (
          <div key={i} style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, lineHeight: 1.6 }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 'auto', paddingTop: 8,
        fontSize: 13, fontWeight: 600, color: accentColor || colors.primary,
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {hasResume ? 'Resume' : 'Start practice'}
        <span style={{ fontSize: 16 }}>&#8250;</span>
      </div>
    </div>
  )
}

function timeAgo(isoDate) {
  const diff = (Date.now() - new Date(isoDate).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function Home() {
  const navigate = useNavigate()
  const { colors, fonts, shadows } = useTheme()
  const [history, setHistory] = useState([])
  useEffect(() => { document.title = 'TOEFL Practice' }, [])
  useEffect(() => { setHistory(getHistory()) }, [])

  const hasSaved = (key) => {
    try { return !!localStorage.getItem(key) } catch { return false }
  }

  const completed = history.length
  const lastEntry = history[history.length - 1]
  const avgWritingScore = (() => {
    const writing = history.filter(h => h.type === 'email' || h.type === 'discussion')
    if (!writing.length) return null
    return (writing.reduce((s, h) => s + h.score, 0) / writing.length).toFixed(1)
  })()

  const streak = (() => {
    if (!history.length) return 0
    const days = new Set(history.map(h => h.date.slice(0, 10)))
    let count = 0
    const d = new Date()
    // If today has no entry yet, start checking from yesterday
    if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1)
    while (days.has(d.toISOString().slice(0, 10))) {
      count++
      d.setDate(d.getDate() - 1)
    }
    return count
  })()

  const stats = [
    { label: 'Sessions Done', value: completed > 0 ? String(completed) : '—' },
    { label: 'Avg Writing Score', value: avgWritingScore ? `${avgWritingScore}/5` : '—' },
    { label: 'Last Practice', value: lastEntry ? timeAgo(lastEntry.date) : '—' },
    { label: 'Day Streak', value: streak > 0 ? `${streak}🔥` : '—' },
  ]

  return (
    <div style={{ padding: '32px 40px', maxWidth: 900 }}>
      {/* Welcome header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: fonts.heading, fontSize: 28, fontWeight: 700,
          color: colors.text, marginBottom: 6,
        }}>
          {completed > 0 ? 'Welcome back' : 'Get started'}
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.textMuted }}>
          {completed > 0
            ? `${completed} session${completed > 1 ? 's' : ''} completed. Keep going.`
            : 'Pick a module below to begin your first practice session.'}
        </p>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: '1 1 120px', padding: '14px 16px',
            background: colors.white, borderRadius: 8,
            border: `1px solid ${colors.borderLight}`,
          }}>
            <div style={{
              fontSize: 22, fontWeight: 700, color: colors.primary,
              fontFamily: fonts.body, marginBottom: 2,
            }}>{s.value}</div>
            <div style={{
              fontSize: 10, color: '#aaa', textTransform: 'uppercase',
              letterSpacing: '0.05em', fontFamily: fonts.body,
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Reading section */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: colors.primary }} />
          <h2 style={{ fontSize: 15, fontWeight: 700, color: colors.text, fontFamily: fonts.body, margin: 0 }}>
            Reading
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <ModuleCard
            icon="M4 4h16v2H4zM4 8h10v2H4zM4 12h16v2H4zM4 16h10v2H4z"
            title="Reading Practice"
            details={['Academic passages + Pack 6 modules', '10-20 questions per set', 'Vocabulary, inference, detail']}
            onStart={() => navigate('/reading')}
            accentColor="#00695c"
          />
        </div>
      </div>

      {/* Writing section */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: '#00897b' }} />
          <h2 style={{ fontSize: 15, fontWeight: 700, color: colors.text, fontFamily: fonts.body, margin: 0 }}>
            Writing
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <ModuleCard
            icon="M12 2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm7 9c0-2.5-4.5-4-7-4s-7 1.5-7 4v1h14v-1zM5 14v6h14v-6H5zm2 2h10v2H7v-2z"
            title="Build a Sentence"
            details={['Arrange word chips in order', '10 items, 7 min']}
            onStart={() => navigate('/writing/build-sentence')}
            accentColor="#00695c"
            hasResume={hasSaved('toefl-writing-build-sentence')}
          />
          <ModuleCard
            icon="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
            title="Write an Email"
            details={['Respond to a situation prompt', '130-140 words, 7 min']}
            onStart={() => navigate('/writing/email')}
            accentColor="#00897b"
            hasResume={hasSaved('toefl-writing-email')}
          />
          <ModuleCard
            icon="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"
            title="Academic Discussion"
            details={['Join a class discussion', '120+ words, 10 min']}
            onStart={() => navigate('/writing/discussion')}
            accentColor="#004d40"
            hasResume={hasSaved('toefl-writing-discussion')}
          />
        </div>
      </div>

      {/* Tip */}
      <div style={{
        padding: '14px 16px', background: 'rgba(0,105,92,0.03)',
        border: '1px solid rgba(0,105,92,0.08)', borderRadius: 8,
        fontSize: 12, color: '#555', lineHeight: 1.7,
      }}>
        <span style={{ fontWeight: 600, color: '#00695c' }}>Tip: </span>
        Start with Reading to build vocabulary, then move to Writing to practice expressing ideas.
        Your saved vocabulary and common mistakes will appear in the Notebook panel on the left.
      </div>
    </div>
  )
}
