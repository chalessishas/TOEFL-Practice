import { useState, useEffect } from 'react';
import { useTheme } from '../shared/ThemeContext.jsx';

// Daily Life Reading Component
// Props: { section, onComplete }
// Note: onComplete is deferred — fires when user clicks "Continue" in the result screen,
// not at submit time. This is intentional so the user sees question feedback before
// the pack flow advances.
const DailyLifeReading = ({ section, onComplete }) => {
  const { colors, isShortcutsVisible } = useTheme()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const qs = section.questions;
  const currentQ = qs[currentQuestion];
  const isCurrentAnswered = answers[currentQuestion] !== undefined;

  const handleSelect = (idx) => {
    setAnswers({ ...answers, [currentQuestion]: idx });
  };

  // Keyboard navigation
  useEffect(() => {
    if (showResult) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        setCurrentQuestion(q => q - 1);
      } else if (e.key === 'ArrowRight' && isCurrentAnswered && currentQuestion < qs.length - 1) {
        setCurrentQuestion(q => q + 1);
      } else if (e.key >= '1' && e.key <= String(currentQ.options.length)) {
        handleSelect(parseInt(e.key) - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showResult, currentQuestion, isCurrentAnswered]);

  const handleSubmit = () => setShowResult(true);

  const isCorrect = (qIdx) => answers[qIdx] === qs[qIdx].correct;

  const score = qs.filter((_, i) => isCorrect(i)).length;

  if (showResult) {
    return (
      <div style={{
        minHeight: '100vh', background: colors.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ textAlign: 'center', maxWidth: 600, padding: '0 24px', animation: 'fadeUp 0.5s ease-out' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: colors.text, marginBottom: 24 }}>
            {score === qs.length ? 'Perfect!' : score >= qs.length / 2 ? 'Good Effort' : 'Keep Practicing'}
          </h2>
          <p style={{ fontSize: 14, color: colors.textMuted, marginBottom: 32 }}>{score} / {qs.length} correct</p>

          {qs.map((q, qi) => {
            const ok = isCorrect(qi);
            return (
              <div key={qi} style={{
                background: colors.card, borderRadius: 14, border: `1px solid ${colors.border}`,
                padding: 24, marginBottom: 12, textAlign: 'left',
                animation: `fadeUp 0.4s ease-out ${qi * 0.05}s both`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 6, fontSize: 11, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: ok ? 'rgba(90,154,110,0.1)' : 'rgba(176,96,96,0.1)',
                    color: ok ? '#5a9a6e' : '#b06060',
                    border: `1.5px solid ${ok ? 'rgba(90,154,110,0.3)' : 'rgba(176,96,96,0.3)'}`,
                  }}>{ok ? '✓' : '✗'}</span>
                  <span style={{ fontSize: 13, color: colors.text }}>{q.text}</span>
                </div>
                {q.options.map((opt, oi) => {
                  const isUser = answers[qi] === oi;
                  const isAnswer = q.correct === oi;
                  let bg = 'transparent', border = colors.border, color = colors.textMedium;
                  if (isAnswer) { bg = 'rgba(90,154,110,0.06)'; border = 'rgba(90,154,110,0.3)'; color = '#5a9a6e'; }
                  if (isUser && !isAnswer) { bg = 'rgba(176,96,96,0.06)'; border = 'rgba(176,96,96,0.3)'; color = '#b06060'; }
                  return (
                    <div key={oi} style={{
                      padding: '8px 12px', borderRadius: 8, marginBottom: 4,
                      border: `1.5px solid ${border}`, background: bg,
                      fontSize: 13, color, display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      {isAnswer && <span style={{ fontSize: 10 }}>✓</span>}
                      {isUser && !isAnswer && <span style={{ fontSize: 10 }}>✗</span>}
                      {!isAnswer && !isUser && <span style={{ width: 10 }}/>}
                      {opt}
                    </div>
                  );
                })}

                {q.explanation && (
                  <div style={{
                    marginTop: 8, padding: '10px 12px', borderRadius: 8,
                    background: 'rgba(0,105,92,0.04)',
                    border: '1px solid rgba(0,105,92,0.12)',
                  }}>
                    <p style={{ fontSize: 12, color: colors.primary, lineHeight: 1.7 }}>
                      <strong style={{ fontWeight: 500, color: colors.primaryDark }}>Explanation: </strong>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {onComplete && (
            <button onClick={() => onComplete({ correct: score, total: qs.length })} style={{
              marginTop: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              color: 'white', background: colors.primary,
              border: 'none', borderRadius: 10, padding: '12px 32px', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,105,92,0.2)',
            }}>
              Continue
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100%', background: colors.card,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Instruction */}
      <div style={{
        borderBottom: `3px solid ${colors.toeflRed}`,
        padding: '24px 40px 14px',
      }}>
        <h2 style={{
          fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 700,
          color: colors.text, textAlign: 'center', margin: 0,
        }}>
          Read an {section.material_type || 'email'}.
        </h2>
        <p style={{
          fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: 6,
        }}>{section.title} — Question {currentQuestion + 1} of {qs.length}</p>
      </div>

      <div style={{
        maxWidth: 1000, margin: '0 auto', padding: '32px 40px',
        display: 'flex', gap: 32, flexWrap: 'wrap',
      }}>
        {/* Email card */}
        <div style={{
          flex: '1 1 380px', background: colors.inputBg, borderRadius: 8,
          border: `2px solid ${colors.primary}`, padding: 24,
        }}>
          {section.material.subject && (
            <div style={{
              display: 'flex', gap: 8, marginBottom: 16, paddingBottom: 12,
              borderBottom: `1px solid ${colors.border}`,
            }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: colors.textMedium }}>Subject:</span>
              <span style={{ fontSize: 14, color: colors.text }}>{section.material.subject}</span>
            </div>
          )}
          <div style={{ fontSize: 15, lineHeight: 1.9, color: colors.text, whiteSpace: 'pre-line', fontFamily: "'Georgia', serif" }}>
            {section.material.body}
          </div>
        </div>

        {/* Question */}
        <div style={{ flex: '1 1 380px' }}>
          <h3 style={{
            fontFamily: "'Georgia', serif",
            fontSize: 19, color: colors.text, lineHeight: 1.6,
            marginBottom: 24, fontWeight: 400,
          }}>
            {currentQ.text}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQuestion] === idx;
              return (
                <button key={idx} onClick={() => handleSelect(idx)} style={{
                  width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 8,
                  border: isSelected ? `2px solid ${colors.primary}` : `1.5px solid ${colors.border}`,
                  background: isSelected ? 'rgba(0,105,92,0.04)' : 'white',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 15, color: isSelected ? colors.text : colors.textMedium,
                  fontFamily: "'Georgia', serif",
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    border: isSelected ? `2px solid ${colors.primary}` : `1.5px solid ${colors.textLight}`,
                    background: isSelected ? colors.primary : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 600, color: isSelected ? 'white' : colors.textLight,
                  }}>{isSelected ? '●' : '○'}</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {isShortcutsVisible && (
            <div className="kbd-hint" style={{ paddingLeft: 0, paddingBottom: 8 }}>
              <span><span className="kbd">←</span><span className="kbd">→</span> navigate</span>
              <span><span className="kbd">1</span>–<span className="kbd">4</span> select</span>
            </div>
          )}
          {/* Nav — teal bar matching TOEFL style */}
          <div style={{
            marginTop: 24, padding: '10px 0',
            display: 'flex', justifyContent: 'flex-end', gap: 8,
          }}>
            <button onClick={() => setCurrentQuestion(q => q - 1)} disabled={currentQuestion === 0}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                color: 'white', opacity: currentQuestion === 0 ? 0.4 : 1,
                background: colors.primary, border: 'none',
                borderRadius: 6, padding: '8px 20px',
                cursor: currentQuestion === 0 ? 'default' : 'pointer',
              }}>‹ Back</button>
            {currentQuestion < qs.length - 1 ? (
              <button onClick={() => setCurrentQuestion(q => q + 1)} disabled={!isCurrentAnswered}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                  color: colors.primary, opacity: !isCurrentAnswered ? 0.5 : 1,
                  background: colors.primaryLight, border: 'none',
                  borderRadius: 6, padding: '8px 24px',
                  cursor: !isCurrentAnswered ? 'default' : 'pointer',
                }}>Next ›</button>
            ) : (
              <button onClick={handleSubmit} disabled={!isCurrentAnswered} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                color: colors.primary,
                background: !isCurrentAnswered ? colors.border : colors.primaryLight,
                border: 'none', borderRadius: 6, padding: '8px 24px',
                cursor: !isCurrentAnswered ? 'default' : 'pointer',
              }}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLifeReading;
