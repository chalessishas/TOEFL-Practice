import { useState, useEffect } from 'react';
import CompleteWords from '../CompleteWords.jsx';
import { useTheme } from '../shared/ThemeContext.jsx';
import DailyLifeReading from '../reading/DailyLifeReading.jsx';
import AcademicPassage from '../reading/AcademicPassage.jsx';
import LegacyReadingTest from '../reading/LegacyReadingTest.jsx';
import ReadingHome from '../reading/ReadingHome.jsx';

const HISTORY_KEY = 'toefl-completion-history';

const loadHistory = () => {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || {}; } catch { return {}; }
};
const totalCorrect = (results) => results.reduce((s, r) => s + (r.correct || 0), 0)

const saveHistory = (moduleId, results) => {
  try {
    const h = loadHistory();
    const existing = h[moduleId]
    // Keep best attempt (highest total correct), not just latest
    if (!existing || totalCorrect(results) >= totalCorrect(existing.results || [])) {
      h[moduleId] = { results, date: new Date().toISOString() }
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch {}
};

const Reading = () => {
  const { colors, isTimerVisible } = useTheme()
  const [view, setView] = useState('home');
  const [selectedPack, setSelectedPack] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [sectionResults, setSectionResults] = useState([]);
  const [moduleTimer, setModuleTimer] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => { document.title = 'Reading — TOEFL Practice' }, []);

  // Module timer
  useEffect(() => {
    if (view !== 'pack' || timerPaused || moduleTimer <= 0) return;
    const interval = setInterval(() => setModuleTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [view, timerPaused, moduleTimer]);

  const startLegacy = () => setView('legacy');

  const startPack = (pack, moduleIdx) => {
    setSelectedPack(pack);
    setSelectedModule(moduleIdx);
    setCurrentSectionIdx(0);
    setSectionResults([]);
    setModuleTimer(pack.modules[moduleIdx].time);
    setTimerPaused(false);
    setView('pack');
  };

  const handleSectionComplete = (result) => {
    const newResults = [...sectionResults, result];
    setSectionResults(newResults);
    const mod = selectedPack.modules[selectedModule];
    if (currentSectionIdx < mod.sections.length - 1) {
      setCurrentSectionIdx(currentSectionIdx + 1);
    } else {
      saveHistory(mod.id, newResults);
      setHistory(loadHistory());
      setView('pack-done');
    }
  };

  const goHome = () => {
    setView('home');
    setSelectedPack(null);
    setSelectedModule(null);
    setCurrentSectionIdx(0);
    setSectionResults([]);
  };

  if (view === 'home') {
    return <ReadingHome history={history} onStartLegacy={startLegacy} onStartPack={startPack} />;
  }

  if (view === 'legacy') {
    return <LegacyReadingTest onBack={goHome} />;
  }

  if (view === 'pack') {
    const mod = selectedPack.modules[selectedModule];
    const section = mod.sections[currentSectionIdx];
    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    const getQuestionRange = () => {
      let start = 1;
      for (let i = 0; i < currentSectionIdx; i++) {
        const s = mod.sections[i];
        if (s.type === 'complete_words') start += s.paragraph.filter(p => p.blank).length;
        else if (s.questions) start += s.questions.length;
      }
      const cur = mod.sections[currentSectionIdx];
      const count = cur.type === 'complete_words' ? cur.paragraph.filter(p => p.blank).length : (cur.questions?.length || 0);
      const total = mod.sections.reduce((sum, s) => {
        if (s.type === 'complete_words') return sum + s.paragraph.filter(p => p.blank).length;
        return sum + (s.questions?.length || 0);
      }, 0);
      return `Questions ${start}–${start + count - 1} of ${total}`;
    };

    const isLast = currentSectionIdx === mod.sections.length - 1;

    const sectionHeader = (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <div style={{
          background: colors.card,
          padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          borderBottom: `2px solid ${colors.primary}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={goHome} style={{
              fontSize: 12, color: colors.textMuted, background: 'transparent',
              border: `1px solid ${colors.border}`, borderRadius: 5, padding: '4px 12px', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 500,
            }}>← Home</button>
            <span style={{ fontWeight: 700, color: colors.primary }}>Reading</span>
            <span style={{ color: colors.border }}>|</span>
            <span style={{ color: colors.textMuted }}>{getQuestionRange()}</span>
            <div style={{ display: 'flex', gap: 3, marginLeft: 8 }}>
              {mod.sections.map((_, i) => (
                <div key={i} style={{
                  width: 20, height: 3, borderRadius: 2,
                  background: i < currentSectionIdx ? colors.success
                    : i === currentSectionIdx ? colors.primary : colors.border,
                }} />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isTimerVisible && <>
              <span style={{
                fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
                color: moduleTimer < 60 ? colors.toeflRed : colors.text,
              }}>
                {formatTime(moduleTimer)}
              </span>
              <span style={{
                fontSize: 12, color: colors.textLight, cursor: 'pointer',
              }} onClick={() => setTimerPaused(p => !p)}>
                {timerPaused ? '▶ Resume' : '⏸ Hide Time'}
              </span>
            </>}
            <button onClick={() => {
              if (isLast) return;
              handleSectionComplete({ correct: 0, total: 0 });
            }} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: 'white', background: colors.primary,
              border: 'none', borderRadius: 6,
              padding: '6px 18px', cursor: 'pointer',
            }}>
              Next ›
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div style={{ paddingTop: 48 }}>
        {sectionHeader}
        {section.type === 'complete_words' && (
          <CompleteWords section={section} onComplete={handleSectionComplete} />
        )}
        {section.type === 'daily_life' && (
          <DailyLifeReading section={section} onComplete={handleSectionComplete} />
        )}
        {section.type === 'academic_passage' && (
          <AcademicPassage section={section} onComplete={handleSectionComplete} />
        )}
      </div>
    );
  }

  if (view === 'pack-done') {
    const mod = selectedPack.modules[selectedModule];
    return (
      <div style={{
        minHeight: '100vh', background: colors.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px', animation: 'fadeUp 0.6s ease-out' }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 28, color: colors.text, marginBottom: 24,
          }}>
            {mod.name} Complete
          </h2>

          {mod.sections.map((sec, i) => (
            <div key={i} style={{
              background: colors.card, borderRadius: 10, border: `1px solid ${colors.border}`,
              padding: '14px 20px', marginBottom: 8, textAlign: 'left',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 13, color: colors.textMedium }}>
                {sec.title || sec.type}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#5a9a6e' }}>
                {sectionResults[i]?.correct ?? '—'} / {sectionResults[i]?.total ?? '—'}
              </span>
            </div>
          ))}

          <button onClick={goHome} style={{
            marginTop: 24, fontSize: 14, fontWeight: 500, color: 'white',
            background: colors.primary,
            border: 'none', borderRadius: 10, padding: '12px 32px', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,105,92,0.2)',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Reading;
