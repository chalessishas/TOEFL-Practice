import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from './shared/ThemeContext.jsx'
import { getHistory } from './writing/scoreHistory.js'

const ICON_BAR_W = 48
const SIDEBAR_W = 260

const panels = [
  { id: 'practice', label: 'Practice', icon: 'M4 4h16v2H4zM4 8h10v2H4zM4 12h16v2H4zM4 16h10v2H4z' },
  { id: 'progress', label: 'Progress', icon: 'M3 3v18h18V3H3zm16 16H5V5h14v14zM7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z' },
  { id: 'notebook', label: 'Notebook', icon: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z' },
  { id: 'plan', label: 'Study Plan', icon: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z' },
  { id: 'settings', label: 'Settings', icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58-1.97-3.4-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.7 3.5h-3.4l-.48 2.6c-.59.24-1.13.56-1.62.94l-2.39-.96-1.97 3.4 2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58 1.97 3.4 2.39-.96c.5.38 1.03.7 1.62.94l.48 2.6h3.4l.48-2.6c.59-.24 1.13-.56 1.62-.94l2.39.96 1.97-3.4-2.03-1.58zM12 15.6A3.6 3.6 0 1112 8.4a3.6 3.6 0 010 7.2z' },
]

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/reading', label: 'Reading Practice' },
  { path: '/writing', label: 'Writing Practice' },
  { path: '/writing/build-sentence', label: 'Build a Sentence' },
  { path: '/writing/email', label: 'Write an Email' },
  { path: '/writing/discussion', label: 'Academic Discussion' },
]

const VOCAB_KEY = 'toefl-vocab'
const DEFAULT_VOCAB = [
  { word: 'ubiquitous', meaning: 'present everywhere', id: 1 },
  { word: 'mitigate', meaning: 'make less severe', id: 2 },
  { word: 'feasible', meaning: 'possible and practical', id: 3 },
  { word: 'paramount', meaning: 'more important than anything else', id: 4 },
  { word: 'exacerbate', meaning: 'make worse', id: 5 },
]

const loadVocab = () => {
  try {
    const s = localStorage.getItem(VOCAB_KEY)
    return s ? JSON.parse(s) : DEFAULT_VOCAB
  } catch { return DEFAULT_VOCAB }
}

const saveVocab = (list) => {
  try { localStorage.setItem(VOCAB_KEY, JSON.stringify(list)) } catch {}
}


// Rotating task suggestions Mon–Sun
const WEEK_TASKS = [
  'Writing - Email Practice',
  'Reading - Urban Agriculture',
  'Writing - Academic Discussion',
  'Reading - Pack 6',
  'Writing - Build a Sentence',
  'Review Weak Skills',
  'Writing - Email Practice',
]
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function SidebarContent({ activePanel, navigate, location, isDark, toggleDark, isTimerVisible, toggleTimer, isShortcutsVisible, toggleShortcuts }) {
  const [history, setHistory] = useState([])
  const [vocab, setVocab] = useState(loadVocab)
  const [newWord, setNewWord] = useState('')
  const [newMeaning, setNewMeaning] = useState('')
  const [flippedIds, setFlippedIds] = useState(new Set())
  useEffect(() => { setHistory(getHistory()) }, [activePanel])

  const writingEntries = history.filter(h => h.type === 'email' || h.type === 'discussion')
  const bsEntries = history.filter(h => h.type === 'build-sentence')

  const avgWriting = writingEntries.length
    ? (writingEntries.reduce((s, h) => s + h.score, 0) / writingEntries.length)
    : null
  const avgBS = bsEntries.length
    ? (bsEntries.reduce((s, h) => s + h.correct / h.total, 0) / bsEntries.length)
    : null

  const avgBreakdown = (() => {
    const withBd = writingEntries.filter(h => h.breakdown)
    if (!withBd.length) return null
    const keys = ['grammar', 'mechanics', 'vocabulary', 'organization', 'development', 'style', 'relevance']
    return Object.fromEntries(keys.map(k => [
      k,
      withBd.reduce((s, h) => s + (h.breakdown[k] || 0), 0) / withBd.length
    ]))
  })()

  const sectionTitle = (text) => (
    <div style={{
      fontSize: 11, fontWeight: 700, color: isDark ? '#666' : '#888',
      textTransform: 'uppercase', letterSpacing: '0.08em',
      padding: '16px 16px 8px', userSelect: 'none',
    }}>{text}</div>
  )

  if (activePanel === 'practice') {
    return (
      <>
        {sectionTitle('Modules')}
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          const activeTeal = isDark ? '#4db6ac' : '#00695c'
          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '8px 16px', fontSize: 13, fontWeight: isActive ? 600 : 400,
              color: isActive ? activeTeal : (isDark ? '#aaa' : '#555'),
              background: isActive ? (isDark ? 'rgba(77,182,172,0.1)' : 'rgba(0,105,92,0.06)') : 'transparent',
              border: 'none', borderLeft: isActive ? `2px solid ${activeTeal}` : '2px solid transparent',
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s ease',
            }}
            onMouseOver={e => { if (!isActive) e.currentTarget.style.background = isDark ? '#2a2a2a' : '#f0f0f0' }}
            onMouseOut={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              {item.label}
            </button>
          )
        })}
        {sectionTitle('Quick Stats')}
        <div style={{ padding: '0 16px', fontSize: 12, color: isDark ? '#777' : '#888', lineHeight: 2 }}>
          <div>Sessions completed: <span style={{ color: isDark ? '#e8e8e8' : '#1a1a1a', fontWeight: 600 }}>{history.length || 0}</span></div>
          <div>Writing sessions: <span style={{ color: isDark ? '#e8e8e8' : '#1a1a1a', fontWeight: 600 }}>{writingEntries.length || 0}</span></div>
          <div>Avg writing score: <span style={{ color: isDark ? '#e8e8e8' : '#1a1a1a', fontWeight: 600 }}>{avgWriting != null ? `${avgWriting.toFixed(1)}/5` : '—'}</span></div>
        </div>
      </>
    )
  }

  const c = {
    cardBg: isDark ? '#252525' : '#fafafa',
    cardBorder: isDark ? '#333' : '#eee',
    textPrimary: isDark ? '#e8e8e8' : '#1a1a1a',
    textMid: isDark ? '#aaa' : '#555',
    textMuted: isDark ? '#666' : '#aaa',
    trackBg: isDark ? '#333' : '#eee',
    teal: isDark ? '#4db6ac' : '#00695c',
    red: isDark ? '#ef5350' : '#c62828',
    green: isDark ? '#4caf50' : '#2e7d32',
  }

  if (activePanel === 'progress') {
    const recent = [...history].reverse().slice(0, 6)
    const typeLabel = { email: 'Email', discussion: 'Discussion', 'build-sentence': 'Build Sentence' }
    const scoreBar = (label, value, max, pct = false) => (
      <div key={label} style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{ fontSize: 11, color: c.textMid }}>{label}</span>
          <span style={{ fontSize: 11, color: c.textMuted }}>
            {value != null
              ? pct ? `${Math.round(value * 100)}%` : `${(value * max).toFixed(1)}/${max}`
              : pct ? '—' : `—/${max}`}
          </span>
        </div>
        <div style={{ height: 4, background: c.trackBg, borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${value != null ? value * 100 : 0}%`, background: c.teal, borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
      </div>
    )
    return (
      <>
        {sectionTitle('Recent Sessions')}
        <div style={{ padding: '0 16px' }}>
          {recent.length === 0
            ? <p style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.6 }}>Complete a practice set to see history here.</p>
            : recent.map((h, i) => {
                const scoreText = h.type === 'build-sentence'
                  ? `${h.correct}/${h.total}`
                  : `${h.score?.toFixed(1)}/5`
                const scoreColor = h.type === 'build-sentence'
                  ? (h.correct / h.total >= 0.7 ? c.green : c.textMid)
                  : (h.score >= 3.5 ? c.green : h.score >= 2.5 ? c.textMid : c.red)
                const ago = (() => {
                  const diff = (Date.now() - new Date(h.date).getTime()) / 1000
                  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
                  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
                  return `${Math.floor(diff / 86400)}d ago`
                })()
                return (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 0', borderBottom: `1px solid ${c.cardBorder}`,
                    fontSize: 11,
                  }}>
                    <div>
                      <div style={{ color: c.textMid, fontWeight: 500 }}>{typeLabel[h.type]}</div>
                      <div style={{ color: c.textMuted, marginTop: 1 }}>{ago}</div>
                    </div>
                    <span style={{ fontWeight: 700, color: scoreColor }}>{scoreText}</span>
                  </div>
                )
              })
          }
        </div>
        {sectionTitle('Writing Trend')}
        <div style={{ padding: '0 16px 4px' }}>
          {(() => {
            const pts = [...writingEntries].reverse().slice(-12).map(h => h.score)
            const W = 228, H = 44
            if (pts.length < 2) {
              return <p style={{ fontSize: 11, color: c.textMuted, lineHeight: 1.6, marginBottom: 4 }}>
                {pts.length === 0 ? 'Submit writing tasks to see trend.' : 'Need 2+ sessions for a trend line.'}
              </p>
            }
            const xStep = W / (pts.length - 1)
            const points = pts.map((v, i) => `${i * xStep},${H - (v / 5) * H}`).join(' ')
            const lastScore = pts[pts.length - 1]
            const trend = pts.length >= 2 ? lastScore - pts[pts.length - 2] : 0
            const trendColor = trend > 0.1 ? c.green : trend < -0.1 ? c.red : c.textMuted
            return (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: c.textMuted }}>Last {pts.length} sessions</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: trendColor }}>
                    {trend > 0.1 ? '▲' : trend < -0.1 ? '▼' : '—'} {lastScore.toFixed(1)}/5
                  </span>
                </div>
                <svg width={W} height={H} style={{ display: 'block', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c.teal} stopOpacity="0.15" />
                      <stop offset="100%" stopColor={c.teal} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Fill area */}
                  <polygon
                    points={`0,${H} ${points} ${(pts.length - 1) * xStep},${H}`}
                    fill="url(#sparkGrad)"
                  />
                  {/* Line */}
                  <polyline
                    points={points}
                    fill="none"
                    stroke={c.teal}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* Last point dot */}
                  <circle
                    cx={(pts.length - 1) * xStep}
                    cy={H - (lastScore / 5) * H}
                    r="3"
                    fill={c.teal}
                  />
                  {/* Baseline */}
                  <line x1="0" y1={H} x2={W} y2={H} stroke={c.cardBorder} strokeWidth="1" />
                </svg>
              </div>
            )
          })()}
        </div>
        {sectionTitle('Score Overview')}
        <div style={{ padding: '0 16px' }}>
          {scoreBar('Writing (avg)', avgWriting != null ? avgWriting / 5 : null, 5)}
          {scoreBar('Build Sentence (avg)', avgBS, 10)}
        </div>
        {sectionTitle('Skill Breakdown')}
        <div style={{ padding: '0 16px' }}>
          {avgBreakdown
            ? [
                ['Organization', avgBreakdown.organization],
                ['Development', avgBreakdown.development],
                ['On-Topic', avgBreakdown.relevance],
                ['Vocabulary', avgBreakdown.vocabulary],
                ['Mechanics', avgBreakdown.mechanics],
                ['Grammar', avgBreakdown.grammar],
                ['Style', avgBreakdown.style],
              ].map(([label, val]) => scoreBar(label, val, 1, true))
            : <p style={{ fontSize: 11, color: c.textMuted, lineHeight: 1.6 }}>Submit a writing task to see skill breakdown.</p>
          }
        </div>
      </>
    )
  }

  if (activePanel === 'notebook') {
    const addWord = () => {
      const w = newWord.trim()
      const m = newMeaning.trim()
      if (!w || !m) return
      const updated = [{ word: w, meaning: m, id: Date.now() }, ...vocab]
      setVocab(updated)
      saveVocab(updated)
      setNewWord('')
      setNewMeaning('')
    }

    const deleteWord = (id) => {
      const updated = vocab.filter(v => v.id !== id)
      setVocab(updated)
      saveVocab(updated)
    }

    return (
      <>
        {sectionTitle('Vocabulary Notebook')}
        {/* Add form */}
        <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <input
            value={newWord}
            onChange={e => setNewWord(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addWord()}
            placeholder="Word"
            style={{
              fontSize: 12, padding: '6px 9px', borderRadius: 6,
              border: `1px solid ${c.cardBorder}`, background: c.cardBg,
              color: c.textPrimary, outline: 'none', fontFamily: 'inherit',
            }}
          />
          <input
            value={newMeaning}
            onChange={e => setNewMeaning(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addWord()}
            placeholder="Meaning"
            style={{
              fontSize: 12, padding: '6px 9px', borderRadius: 6,
              border: `1px solid ${c.cardBorder}`, background: c.cardBg,
              color: c.textPrimary, outline: 'none', fontFamily: 'inherit',
            }}
          />
          <button
            onClick={addWord}
            disabled={!newWord.trim() || !newMeaning.trim()}
            style={{
              fontSize: 12, fontWeight: 500, padding: '6px',
              borderRadius: 6, border: 'none', cursor: 'pointer',
              background: newWord.trim() && newMeaning.trim() ? '#00695c' : c.cardBorder,
              color: newWord.trim() && newMeaning.trim() ? 'white' : c.textMuted,
              fontFamily: 'inherit',
            }}
          >
            + Add Word
          </button>
        </div>
        {/* Word list */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {vocab.length === 0 && (
            <p style={{ fontSize: 12, color: c.textMuted, textAlign: 'center', padding: '12px 0' }}>
              No words saved yet.
            </p>
          )}
          {vocab.map((v) => {
            const flipped = flippedIds.has(v.id)
            const toggleFlip = () => setFlippedIds(prev => {
              const next = new Set(prev)
              next.has(v.id) ? next.delete(v.id) : next.add(v.id)
              return next
            })
            return (
              <div key={v.id} style={{
                padding: '8px 10px', background: flipped ? 'rgba(0,105,92,0.06)' : c.cardBg,
                borderRadius: 6, border: `1px solid ${flipped ? 'rgba(0,105,92,0.25)' : c.cardBorder}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6,
                cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s',
              }} onClick={toggleFlip}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: flipped ? 4 : 0 }}>
                    {v.word}
                  </div>
                  {flipped && (
                    <div style={{ fontSize: 11, color: colors.primary, fontWeight: 500 }}>{v.meaning}</div>
                  )}
                  {!flipped && (
                    <div style={{ fontSize: 10, color: c.textMuted, fontStyle: 'italic' }}>tap to reveal</div>
                  )}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); deleteWord(v.id) }}
                  style={{
                    fontSize: 14, lineHeight: 1, padding: '2px 4px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: c.textMuted, flexShrink: 0,
                  }}
                  title="Remove"
                >×</button>
              </div>
            )
          })}
        </div>
        {sectionTitle('Areas to Improve')}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {avgBreakdown ? (() => {
            const improvements = {
              organization: 'Use clear intro, body, conclusion structure with transition words.',
              development: 'Add concrete examples — aim for 2+ specific details per body paragraph.',
              vocabulary: 'Swap common words (good/big/many) for academic alternatives.',
              mechanics: 'Proofread for spelling errors and missing punctuation.',
              grammar: 'Avoid run-on sentences and sentence fragments.',
              style: 'Vary sentence length to avoid monotony; avoid repeating the same phrase.',
              relevance: 'Stay on topic — use key terms from the prompt and address all parts of the question.',
            }
            return Object.entries(avgBreakdown)
              .sort((a, b) => a[1] - b[1])
              .slice(0, 3)
              .map(([key, val], i) => (
                <div key={i} style={{
                  padding: '6px 10px', background: c.cardBg, borderRadius: 6,
                  border: `1px solid ${c.cardBorder}`, fontSize: 12,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontWeight: 600, color: val < 0.5 ? c.red : c.textMid, textTransform: 'capitalize' }}>{key}</span>
                    <span style={{ fontSize: 10, color: c.textMuted }}>{Math.round(val * 100)}%</span>
                  </div>
                  <span style={{ color: c.textMuted, fontSize: 11, lineHeight: 1.4 }}>{improvements[key]}</span>
                </div>
              ))
          })() : (
            <p style={{ fontSize: 11, color: c.textMuted, lineHeight: 1.6, padding: '0 0 4px' }}>Submit a writing task to see personalized improvement tips.</p>
          )}
        </div>
      </>
    )
  }

  if (activePanel === 'plan') {
    // Build rolling 7-day plan: today and next 6 days
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const practicedDates = new Set(
      history.map(h => {
        const d = new Date(h.date)
        d.setHours(0, 0, 0, 0)
        return d.getTime()
      })
    )
    const weekPlan = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() - (6 - i))
      const ts = d.getTime()
      const isToday = ts === today.getTime()
      const isPast = ts < today.getTime()
      return {
        day: DAY_NAMES[d.getDay()],
        date: d.getDate(),
        task: WEEK_TASKS[d.getDay()],
        done: practicedDates.has(ts),
        isToday,
        isPast,
      }
    })

    // Streak: consecutive days with practice ending today
    let streak = 0
    for (let i = 6; i >= 0; i--) {
      if (weekPlan[i].done) streak++
      else break
    }

    return (
      <>
        {streak > 0 && (
          <div style={{ margin: '12px 16px 0', padding: '8px 12px', borderRadius: 8, background: isDark ? 'rgba(76,175,80,0.08)' : 'rgba(46,125,50,0.05)', border: `1px solid ${isDark ? 'rgba(76,175,80,0.2)' : 'rgba(46,125,50,0.15)'}` }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: c.green }}>🔥 {streak}-day streak</span>
            <span style={{ fontSize: 11, color: c.textMuted, marginLeft: 6 }}>Keep it up!</span>
          </div>
        )}
        {sectionTitle('This Week')}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {weekPlan.map((p, i) => (
            <div key={i} style={{
              padding: '7px 10px',
              background: p.done ? (isDark ? 'rgba(76,175,80,0.08)' : 'rgba(46,125,50,0.04)') : (p.isToday ? (isDark ? 'rgba(77,182,172,0.08)' : 'rgba(0,105,92,0.04)') : c.cardBg),
              borderRadius: 6,
              border: `1px solid ${p.done ? (isDark ? 'rgba(76,175,80,0.2)' : 'rgba(46,125,50,0.15)') : (p.isToday ? (isDark ? 'rgba(77,182,172,0.3)' : 'rgba(0,105,92,0.2)') : c.cardBorder)}`,
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: p.isPast && !p.done ? 0.5 : 1,
            }}>
              <div style={{
                width: 15, height: 15, borderRadius: 3, flexShrink: 0,
                border: p.done ? 'none' : `1.5px solid ${isDark ? '#555' : '#ccc'}`,
                background: p.done ? c.green : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 9, fontWeight: 700,
              }}>{p.done ? '✓' : ''}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: p.done ? c.green : (p.isToday ? c.teal : c.textMuted) }}>
                  {p.day} {p.date}{p.isToday ? ' · Today' : ''}
                </div>
                <div style={{ fontSize: 11, color: p.done ? c.textMuted : c.textMid, textDecoration: p.done ? 'line-through' : 'none' }}>{p.task}</div>
              </div>
            </div>
          ))}
        </div>
        {sectionTitle('Focus Area')}
        <div style={{ padding: '0 16px' }}>
          {avgBreakdown ? (() => {
            const sorted = Object.entries(avgBreakdown).sort((a, b) => a[1] - b[1])
            const [weakKey, weakVal] = sorted[0]
            const tips = {
              organization: 'Use clear intro/body/conclusion and transition words.',
              development: 'Add specific examples and expand each point.',
              vocabulary: 'Replace common words with academic alternatives.',
              mechanics: 'Proofread for spelling and punctuation.',
              grammar: 'Avoid run-on sentences and double negatives.',
              style: 'Vary sentence length and avoid repetition.',
            }
            return (
              <div style={{ padding: '8px 10px', background: c.cardBg, borderRadius: 6, border: `1px solid ${c.cardBorder}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: c.red, marginBottom: 4, textTransform: 'capitalize' }}>
                  Weakest: {weakKey} ({Math.round(weakVal * 100)}%)
                </div>
                <div style={{ fontSize: 11, color: c.textMid, lineHeight: 1.5 }}>{tips[weakKey]}</div>
              </div>
            )
          })() : (
            <p style={{ fontSize: 11, color: c.textMuted, lineHeight: 1.6 }}>Submit a writing task to see your focus area.</p>
          )}
        </div>
      </>
    )
  }

  if (activePanel === 'settings') {
    return (
      <>
        {sectionTitle('Preferences')}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Timer visible by default', value: isTimerVisible, onChange: toggleTimer },
            { label: 'Auto-save progress', value: true, onChange: null },
            { label: 'Show keyboard hints', value: isShortcutsVisible, onChange: toggleShortcuts },
            { label: 'Confirm before submit', value: true, onChange: null },
            { label: 'Dark mode', value: isDark, onChange: toggleDark },
          ].map((s, i) => {
            const teal = isDark ? '#4db6ac' : '#00695c'
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: s.onChange ? 1 : 0.4 }}>
                <span style={{ fontSize: 12, color: isDark ? '#aaa' : '#555' }}>{s.label}</span>
                <div
                  onClick={s.onChange ?? undefined}
                  style={{
                    width: 32, height: 18, borderRadius: 9,
                    background: s.value ? teal : (isDark ? '#444' : '#ccc'),
                    position: 'relative', cursor: s.onChange ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%', background: 'white',
                    position: 'absolute', top: 2,
                    left: s.value ? 16 : 2,
                    transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
        {sectionTitle('Data')}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{
            fontSize: 12, color: c.red, background: isDark ? 'rgba(239,83,80,0.08)' : 'rgba(198,40,40,0.04)',
            border: `1px solid ${isDark ? 'rgba(239,83,80,0.2)' : 'rgba(198,40,40,0.15)'}`, borderRadius: 6,
            padding: '6px 12px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            textAlign: 'left',
          }}>
            Clear all progress
          </button>
          <button style={{
            fontSize: 12, color: c.textMid, background: c.cardBg,
            border: `1px solid ${c.cardBorder}`, borderRadius: 6,
            padding: '6px 12px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            textAlign: 'left',
          }}>
            Export data
          </button>
        </div>
        {sectionTitle('About')}
        <div style={{ padding: '0 16px', fontSize: 11, color: c.textMuted, lineHeight: 1.8 }}>
          <div>TOEFL Practice v1.0</div>
          <div>Built with React + Vite</div>
          <div>e-rater scoring engine</div>
        </div>
      </>
    )
  }

  return null
}

export default function Layout({ children }) {
  const [activePanel, setActivePanel] = useState('practice')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggleDark, isTimerVisible, toggleTimer, isShortcutsVisible, toggleShortcuts } = useTheme()
  const mainRef = useRef(null)

  // Move focus to main content on route change (keyboard/screen-reader UX)
  useEffect(() => {
    if (mainRef.current) mainRef.current.focus()
  }, [location.pathname])

  // Full-screen routes: hide sidebar during active tests
  const fullScreenPaths = ['/writing/build-sentence', '/writing/email', '/writing/discussion']
  const isFullScreen = fullScreenPaths.includes(location.pathname)

  if (isFullScreen) return <>{children}</>

  const iconBarBg = isDark ? '#0d0d0d' : '#1e1e1e'
  const sidebarBg = isDark ? '#1a1a1a' : '#f8f8f8'
  const sidebarBorder = isDark ? '#2a2a2a' : '#e5e5e5'
  const panelTitleColor = isDark ? '#e0e0e0' : '#1a1a1a'
  const mainBg = isDark ? '#121212' : '#f5f5f5'

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Skip to main content — visually hidden until focused */}
      <a
        href="#main-content"
        style={{
          position: 'absolute', left: -9999, top: 8, zIndex: 9999,
          background: '#00695c', color: 'white', padding: '8px 16px',
          borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none',
        }}
        onFocus={e => { e.target.style.left = '8px' }}
        onBlur={e => { e.target.style.left = '-9999px' }}
      >
        Skip to main content
      </a>
      {/* Icon bar (always visible) */}
      <div style={{
        width: ICON_BAR_W, background: iconBarBg, display: 'flex',
        flexDirection: 'column', alignItems: 'center', paddingTop: 8,
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{
            width: 32, height: 32, marginBottom: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          title="Home"
        >
          <span style={{ color: '#4db6ac', fontSize: 18, fontWeight: 800 }}>T</span>
        </div>

        {/* Panel icons */}
        {panels.map(p => {
          const isActive = activePanel === p.id && sidebarOpen
          return (
            <button
              key={p.id}
              onClick={() => {
                if (activePanel === p.id && sidebarOpen) setSidebarOpen(false)
                else { setActivePanel(p.id); setSidebarOpen(true) }
              }}
              title={p.label}
              style={{
                width: 40, height: 40, marginBottom: 4,
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderLeft: isActive ? '2px solid #4db6ac' : '2px solid transparent',
                opacity: isActive ? 1 : 0.5,
                transition: 'opacity 0.15s',
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '1'}
              onMouseOut={e => { if (!isActive) e.currentTarget.style.opacity = '0.5' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isActive ? '#4db6ac' : '#ccc'}>
                <path d={p.icon} />
              </svg>
            </button>
          )
        })}
      </div>

      {/* Sidebar panel */}
      {sidebarOpen && (
        <div style={{
          width: SIDEBAR_W, background: sidebarBg, borderRight: `1px solid ${sidebarBorder}`,
          overflowY: 'auto', flexShrink: 0,
        }}>
          {/* Panel title */}
          <div style={{
            padding: '12px 16px', fontSize: 12, fontWeight: 700, color: panelTitleColor,
            textTransform: 'uppercase', letterSpacing: '0.06em',
            borderBottom: `1px solid ${sidebarBorder}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            {panels.find(p => p.id === activePanel)?.label}
          </div>
          <SidebarContent activePanel={activePanel} navigate={navigate} location={location} isDark={isDark} toggleDark={toggleDark} isTimerVisible={isTimerVisible} toggleTimer={toggleTimer} isShortcutsVisible={isShortcutsVisible} toggleShortcuts={toggleShortcuts} />
        </div>
      )}

      {/* Main content */}
      <div
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        style={{ flex: 1, overflow: 'auto', background: mainBg, outline: 'none' }}
      >
        {children}
      </div>
    </div>
  )
}
