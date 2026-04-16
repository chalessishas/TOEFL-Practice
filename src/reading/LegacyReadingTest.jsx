import { useState, useEffect, useRef } from 'react';
import { passage as legacyPassage, questions as legacyQuestions, typeLabels, typeColors } from '../data.js';
import { useTheme } from '../shared/ThemeContext.jsx';

const STORAGE_KEY = 'toefl-reading-progress';

const loadProgress = (key) => {
  try {
    const saved = localStorage.getItem(key || STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
};

const saveProgress = (key, state) => {
  try {
    localStorage.setItem(key || STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const clearProgress = (key) => {
  try {
    localStorage.removeItem(key || STORAGE_KEY);
  } catch {}
};

// Legacy Reading Test — accepts any passage/questions via props, defaults to Urban Agriculture
// Props: { onBack, passage?, questions?, storageKey? }
const LegacyReadingTest = ({ onBack, passage: passageProp, questions: questionsProp, storageKey: storageKeyProp }) => {
  const { colors, isTimerVisible, isShortcutsVisible } = useTheme()
  const TOTAL_TIME = 20 * 60;
  const activeKey = storageKeyProp || STORAGE_KEY;
  const saved = useRef(loadProgress(activeKey));
  const questions = questionsProp || legacyQuestions;
  const paragraphs = (passageProp || legacyPassage).split('\n\n');

  const [currentQuestion, setCurrentQuestion] = useState(saved.current?.currentQuestion || 0);
  const [answers, setAnswers] = useState(saved.current?.answers || {});
  const [selectedMultiple, setSelectedMultiple] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [timer, setTimer] = useState(saved.current?.timer || TOTAL_TIME);
  const [paused, setPaused] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const passageRef = useRef(null);
  const paragraphRefs = useRef([]);

  useEffect(() => {
    if (!showResult && !paused && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && !showResult) { setShowResult(true); clearProgress(activeKey); }
  }, [showResult, paused, timer]);

  useEffect(() => {
    if (!showResult) saveProgress(activeKey, { currentQuestion, answers, timer });
  }, [currentQuestion, answers, timer, showResult]);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [currentQuestion, showResult, showReview]);

  useEffect(() => {
    const pIdx = questions[currentQuestion]?.paragraph;
    if (pIdx != null && paragraphRefs.current[pIdx] && passageRef.current) {
      const el = paragraphRefs.current[pIdx];
      const container = passageRef.current;
      container.scrollTo({ top: el.offsetTop - container.offsetTop - 20, behavior: 'smooth' });
    }
  }, [currentQuestion]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleSelectAnswer = (idx) => {
    if (questions[currentQuestion].type === 'multiple') {
      setSelectedMultiple(prev => {
        if (prev.includes(idx)) return prev.filter(i => i !== idx);
        if (prev.length < 3) return [...prev, idx];
        return prev;
      });
    } else {
      setAnswers({ ...answers, [currentQuestion]: idx });
    }
  };

  const handleNext = () => {
    if (questions[currentQuestion].type === 'multiple') setAnswers(a => ({ ...a, [currentQuestion]: selectedMultiple }));
    if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedMultiple([]); }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      if (questions[currentQuestion].type === 'multiple' && selectedMultiple.length > 0)
        setAnswers(a => ({ ...a, [currentQuestion]: selectedMultiple }));
      setCurrentQuestion(currentQuestion - 1);
      const prevA = answers[currentQuestion - 1];
      setSelectedMultiple(questions[currentQuestion - 1].type === 'multiple' && Array.isArray(prevA) ? prevA : []);
    }
  };

  const handleSubmit = () => {
    if (questions[currentQuestion].type === 'multiple') setAnswers(a => ({ ...a, [currentQuestion]: selectedMultiple }));
    setShowResult(true); clearProgress(activeKey);
  };

  const handleRetry = () => {
    setCurrentQuestion(0); setAnswers({}); setSelectedMultiple([]);
    setShowResult(false); setShowReview(false); setTimer(TOTAL_TIME);
    setPaused(false); setShowConfirm(false); clearProgress(activeKey);
  };

  const isCurrentAnswered = () => {
    if (questions[currentQuestion].type === 'multiple') return selectedMultiple.length === 3;
    return answers[currentQuestion] !== undefined;
  };

  const isCorrect = (qIdx) => {
    const q = questions[qIdx];
    if (q.type === 'multiple') {
      const ua = answers[qIdx] || [];
      return Array.isArray(ua) && JSON.stringify([...ua].sort()) === JSON.stringify([...q.correct].sort());
    }
    return answers[qIdx] === q.correct;
  };

  const calculateScore = () => {
    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
      if (isCorrect(i)) correct++;
    }
    return { correct, total: questions.length, scaled: Math.round((correct / questions.length) * 30) };
  };

  const currentQ = questions[currentQuestion];
  const tc = typeColors[currentQ.type];

  // Results
  if (showResult && !showReview) {
    const { correct, total, scaled } = calculateScore();
    const pct = Math.round((correct / total) * 100);
    return (
      <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Georgia', serif" }}>
        <div style={{ textAlign: 'center', animation: 'fadeUp 0.6s ease-out', maxWidth: 480, padding: '0 24px' }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: `conic-gradient(#D4A574 ${pct * 3.6}deg, #ddd 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: colors.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, color: colors.text }}>{scaled}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: colors.textLight }}>/ 30</span>
            </div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: colors.textMuted, marginBottom: 28 }}>{correct} / {total} correct</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => setShowReview(true)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: colors.textMedium, background: colors.card, border: `1.5px solid ${colors.border}`, borderRadius: 10, padding: '12px 28px', cursor: 'pointer' }}>Review</button>
            <button onClick={handleRetry} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: 'white', background: colors.primary, border: 'none', borderRadius: 10, padding: '12px 28px', cursor: 'pointer' }}>Retry</button>
            <button onClick={onBack} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: colors.textMedium, background: colors.card, border: `1.5px solid ${colors.border}`, borderRadius: 10, padding: '12px 28px', cursor: 'pointer' }}>Home</button>
          </div>
        </div>
      </div>
    );
  }

  // Main test
  return (
    <div className="test-layout" style={{ display: 'flex', height: '100vh', background: colors.bg, fontFamily: "'Georgia', serif" }}>
      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
            <h3>Submit Test?</h3>
            <p>{Object.keys(answers).length} / {questions.length} answered · {formatTime(timer)} remaining</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>Continue</button>
              <button className="btn-confirm" onClick={() => { setShowConfirm(false); handleSubmit(); }}>Submit</button>
            </div>
          </div>
        </div>
      )}

      <div className="passage-panel" style={{ width: '50%', display: 'flex', flexDirection: 'column', borderRight: `1px solid ${colors.border}`, background: colors.card }}>
        <div style={{ padding: '18px 28px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ fontSize: 12, color: colors.textMuted, background: 'none', border: `1px solid ${colors.border}`, borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>← Home</button>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: colors.text }}>Urban Agriculture</span>
          </div>
          {isTimerVisible && <button className="timer-btn" onClick={() => setPaused(p => !p)} style={{ color: timer < 120 ? '#b06060' : colors.textMuted, background: timer < 120 ? 'rgba(176,96,96,0.08)' : 'rgba(0,0,0,0.03)' }}>
            {paused ? '▶' : '⏸'} {formatTime(timer)}
            {paused && <span className="pause-badge">PAUSED</span>}
          </button>}
        </div>
        <div ref={passageRef} className="passage-content" style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          {paragraphs.map((para, idx) => (
            <p key={idx} ref={el => paragraphRefs.current[idx] = el} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.85, color: colors.textMedium,
              marginBottom: 20, fontWeight: 300, padding: '8px 12px', borderRadius: 8,
              borderLeft: currentQ.paragraph === idx ? '2.5px solid #D4A574' : '2.5px solid transparent',
              background: currentQ.paragraph === idx ? 'rgba(212,165,116,0.04)' : 'transparent',
              transition: 'all 0.4s ease',
            }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#C4B5A0', marginRight: 6 }}>P{idx + 1}</span>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div className="question-panel" style={{ width: '50%', display: 'flex', flexDirection: 'column', background: colors.bg }}>
        <div style={{ padding: '16px 28px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {questions.map((_, i) => (
              <button key={i} onClick={() => { setCurrentQuestion(i); setSelectedMultiple(questions[i].type === 'multiple' && Array.isArray(answers[i]) ? answers[i] : []); }} style={{
                width: 26, height: 26, borderRadius: 6,
                border: i === currentQuestion ? '2px solid #D4A574' : answers[i] !== undefined ? '1.5px solid rgba(90,154,110,0.3)' : `1.5px solid ${colors.border}`,
                background: i === currentQuestion ? 'rgba(212,165,116,0.08)' : answers[i] !== undefined ? 'rgba(90,154,110,0.05)' : 'white',
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
                color: i === currentQuestion ? '#C4956A' : answers[i] !== undefined ? '#5a9a6e' : colors.textLight,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{i + 1}</button>
            ))}
          </div>
        </div>

        <div className="question-content" style={{ flex: 1, overflowY: 'auto', padding: '32px 32px 24px', opacity: fadeIn ? 1 : 0, transition: 'opacity 0.15s ease' }}>
          <div style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: 6, marginBottom: 20, background: tc.bg, border: `1px solid ${tc.border}` }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, color: tc.text }}>{typeLabels[currentQ.type]}</span>
          </div>
          <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: colors.text, lineHeight: 1.5, marginBottom: 28, fontWeight: 400 }}>{currentQ.text}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = currentQ.type === 'multiple' ? selectedMultiple.includes(idx) : answers[currentQuestion] === idx;
              return (
                <button key={idx} onClick={() => handleSelectAnswer(idx)} style={{
                  width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 10,
                  border: isSelected ? '1.5px solid #D4A574' : `1.5px solid ${colors.border}`,
                  background: isSelected ? 'rgba(0,105,92,0.04)' : 'white',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                    border: isSelected ? '2px solid #D4A574' : '1.5px solid #D4CFC5',
                    background: isSelected ? '#D4A574' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
                    color: isSelected ? 'white' : colors.textLight,
                  }}>{String.fromCharCode(65 + idx)}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: isSelected ? colors.text : colors.textMedium }}>{opt}</span>
                </button>
              );
            })}
          </div>
          {currentQ.type === 'multiple' && selectedMultiple.length > 0 && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: colors.textLight, marginTop: 16 }}>{selectedMultiple.length} of 3 selected</p>
          )}
          {isShortcutsVisible && (
            <div className="kbd-hint" style={{ padding: '12px 0 0' }}>
              <span><span className="kbd">←</span><span className="kbd">→</span> navigate</span>
              <span><span className="kbd">1</span>–<span className="kbd">9</span> select</span>
            </div>
          )}
        </div>

        <div style={{ padding: '16px 28px', borderTop: `1px solid ${colors.border}`, background: colors.card, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handlePrev} disabled={currentQuestion === 0} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: currentQuestion === 0 ? '#D4CFC5' : colors.textMedium, background: 'none', border: 'none', cursor: currentQuestion === 0 ? 'default' : 'pointer' }}>← Previous</button>
          {currentQuestion < questions.length - 1 ? (
            <button onClick={handleNext} disabled={!isCurrentAnswered()} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: !isCurrentAnswered() ? '#D4CFC5' : colors.textMedium, background: 'none', border: 'none', cursor: !isCurrentAnswered() ? 'default' : 'pointer' }}>Next →</button>
          ) : (
            <button onClick={() => setShowConfirm(true)} disabled={!isCurrentAnswered()} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: 'white', background: !isCurrentAnswered() ? '#D4CFC5' : 'linear-gradient(135deg, #D4A574 0%, #C4956A 100%)', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: !isCurrentAnswered() ? 'default' : 'pointer' }}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegacyReadingTest;
