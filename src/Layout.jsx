import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from './shared/ThemeContext.jsx'

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

const vocabPlaceholder = [
  { word: 'ubiquitous', meaning: 'present everywhere', source: 'Pack 6 Module 1' },
  { word: 'mitigate', meaning: 'make less severe', source: 'Urban Agriculture' },
  { word: 'feasible', meaning: 'possible and practical', source: 'Urban Agriculture' },
  { word: 'paramount', meaning: 'more important than anything else', source: 'Pack 6 Module 2' },
  { word: 'exacerbate', meaning: 'make worse', source: 'Practice Essay' },
]

const mistakesPlaceholder = [
  { type: 'Grammar', desc: 'Run-on sentence in email task', date: '2026-03-18' },
  { type: 'Vocabulary', desc: 'Used "good" instead of "beneficial"', date: '2026-03-17' },
  { type: 'Organization', desc: 'Missing conclusion paragraph', date: '2026-03-16' },
]

const planPlaceholder = [
  { day: 'Mon', task: 'Reading - Urban Agriculture', done: true },
  { day: 'Tue', task: 'Writing - Email Practice', done: true },
  { day: 'Wed', task: 'Reading - Pack 6 Module 1', done: false },
  { day: 'Thu', task: 'Writing - Academic Discussion', done: false },
  { day: 'Fri', task: 'Review Mistakes + Vocabulary', done: false },
]

function SidebarContent({ activePanel, navigate, location, isDark, toggleDark }) {
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
          <div>Sessions completed: <span style={{ color: isDark ? '#e8e8e8' : '#1a1a1a', fontWeight: 600 }}>0</span></div>
          <div>Total practice time: <span style={{ color: isDark ? '#e8e8e8' : '#1a1a1a', fontWeight: 600 }}>0 min</span></div>
          <div>Current streak: <span style={{ color: isDark ? '#e8e8e8' : '#1a1a1a', fontWeight: 600 }}>0 days</span></div>
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
    return (
      <>
        {sectionTitle('Score History')}
        <div style={{ padding: '0 16px', fontSize: 12, color: c.textMuted }}>
          <p style={{ marginBottom: 12, lineHeight: 1.6 }}>
            Complete practice sets to see your score history here.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: 'Reading', max: 30 },
              { label: 'Writing', max: 6 },
              { label: 'Vocabulary', max: 30 },
            ].map(skill => (
              <div key={skill.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: c.textMid }}>{skill.label}</span>
                  <span style={{ fontSize: 11, color: c.textMuted }}>--/{skill.max}</span>
                </div>
                <div style={{ height: 4, background: c.trackBg, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: '0%', background: c.teal, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {sectionTitle('Skill Breakdown')}
        <div style={{ padding: '0 16px', fontSize: 12, color: c.textMuted, lineHeight: 1.8 }}>
          <div>Grammar: --</div>
          <div>Mechanics: --</div>
          <div>Vocabulary: --</div>
          <div>Organization: --</div>
          <div>Development: --</div>
        </div>
      </>
    )
  }

  if (activePanel === 'notebook') {
    return (
      <>
        {sectionTitle('Saved Vocabulary')}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {vocabPlaceholder.map((v, i) => (
            <div key={i} style={{
              padding: '8px 10px', background: c.cardBg, borderRadius: 6,
              border: `1px solid ${c.cardBorder}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 2 }}>{v.word}</div>
              <div style={{ fontSize: 11, color: c.textMuted }}>{v.meaning}</div>
              <div style={{ fontSize: 10, color: isDark ? '#555' : '#bbb', marginTop: 4 }}>{v.source}</div>
            </div>
          ))}
        </div>
        {sectionTitle('Common Mistakes')}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {mistakesPlaceholder.map((m, i) => (
            <div key={i} style={{
              padding: '6px 10px', background: c.cardBg, borderRadius: 6,
              border: `1px solid ${c.cardBorder}`, fontSize: 12,
            }}>
              <span style={{ fontWeight: 600, color: c.red, marginRight: 6 }}>{m.type}</span>
              <span style={{ color: c.textMid }}>{m.desc}</span>
              <div style={{ fontSize: 10, color: isDark ? '#555' : '#bbb', marginTop: 2 }}>{m.date}</div>
            </div>
          ))}
        </div>
      </>
    )
  }

  if (activePanel === 'plan') {
    return (
      <>
        {sectionTitle('This Week')}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {planPlaceholder.map((p, i) => (
            <div key={i} style={{
              padding: '8px 10px',
              background: p.done ? (isDark ? 'rgba(76,175,80,0.08)' : 'rgba(46,125,50,0.04)') : c.cardBg,
              borderRadius: 6,
              border: `1px solid ${p.done ? (isDark ? 'rgba(76,175,80,0.2)' : 'rgba(46,125,50,0.15)') : c.cardBorder}`,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                border: p.done ? 'none' : `1.5px solid ${isDark ? '#555' : '#ccc'}`,
                background: p.done ? c.green : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 10, fontWeight: 700,
              }}>{p.done ? 'v' : ''}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: p.done ? c.green : c.textMid }}>{p.day}</div>
                <div style={{ fontSize: 11, color: p.done ? c.textMuted : c.textMid, textDecoration: p.done ? 'line-through' : 'none' }}>{p.task}</div>
              </div>
            </div>
          ))}
        </div>
        {sectionTitle('Goals')}
        <div style={{ padding: '0 16px', fontSize: 12, color: c.textMuted, lineHeight: 1.8 }}>
          <div>Target score: <span style={{ fontWeight: 600, color: c.textPrimary }}>24/30 Reading · 5/6 Writing</span></div>
          <div>Daily practice: <span style={{ fontWeight: 600, color: c.textPrimary }}>30 min</span></div>
          <div>Test date: <span style={{ fontWeight: 600, color: c.textPrimary }}>Not set</span></div>
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
            { label: 'Timer visible by default', value: true, onChange: null },
            { label: 'Auto-save progress', value: true, onChange: null },
            { label: 'Show keyboard hints', value: true, onChange: null },
            { label: 'Confirm before submit', value: true, onChange: null },
            { label: 'Dark mode', value: isDark, onChange: toggleDark },
          ].map((s, i) => {
            const teal = isDark ? '#4db6ac' : '#00695c'
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: isDark ? '#aaa' : '#555' }}>{s.label}</span>
                <div
                  onClick={s.onChange ?? undefined}
                  style={{
                    width: 32, height: 18, borderRadius: 9,
                    background: s.value ? teal : (isDark ? '#444' : '#ccc'),
                    position: 'relative', cursor: s.onChange ? 'pointer' : 'default',
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
  const { isDark, toggleDark } = useTheme()

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
          <SidebarContent activePanel={activePanel} navigate={navigate} location={location} isDark={isDark} toggleDark={toggleDark} />
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto', background: mainBg }}>
        {children}
      </div>
    </div>
  )
}
