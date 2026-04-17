import { useState, useEffect, useRef } from 'react';
import { typeLabels, typeColors } from '../data.js';
import { useTheme } from '../shared/ThemeContext.jsx';

// Academic Passage Component
// Props: { section, onComplete }
// Note: onComplete fires immediately at submit (before setShowResult), so in the pack
// flow the parent may advance to the next section before the result overlay shows.
// This is intentional for pack flow — the result screen is only visible in standalone use.
const AcademicPassage = ({ section, onComplete }) => {
  const { colors, isShortcutsVisible } = useTheme()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const passageRef = useRef(null);
  const paragraphRefs = useRef([]);

  const qs = section.questions;
  const paragraphs = section.passage.split('\n\n');
  const currentQ = qs[currentQuestion];

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [currentQuestion]);

  const isMultiSelectQ = currentQ.question_type === 'prose_summary' || currentQ.type === 'multiple';
  const multiMaxSelect = currentQ.question_type === 'prose_summary' ? 3 : Array.isArray(currentQ.correct) ? currentQ.correct.length : 1;
  const isCurrentAnswered = isMultiSelectQ
    ? Array.isArray(answers[currentQuestion]) && answers[currentQuestion].length === multiMaxSelect
    : answers[currentQuestion] !== undefined;

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

  const handleSelect = (idx) => {
    if (isMultiSelectQ) {
      const cur = answers[currentQuestion] || [];
      if (cur.includes(idx)) {
        setAnswers({ ...answers, [currentQuestion]: cur.filter(i => i !== idx) });
      } else if (cur.length < multiMaxSelect) {
        setAnswers({ ...answers, [currentQuestion]: [...cur, idx] });
      }
    } else {
      setAnswers({ ...answers, [currentQuestion]: idx });
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
    if (onComplete) {
      const correct = qs.filter((_, i) => isCorrect(i)).length;
      onComplete({ correct, total: qs.length });
    }
  };

  const isCorrect = (qIdx) => {
    const q = qs[qIdx];
    const ans = answers[qIdx];
    if (Array.isArray(q.correct)) {
      return Array.isArray(ans) && ans.length === q.correct.length && ans.every(a => q.correct.includes(a));
    }
    return ans === q.correct;
  };

  const scoreQuestion = (qIdx) => {
    const q = qs[qIdx];
    const ans = answers[qIdx];
    if (q.question_type === 'prose_summary') {
      if (!Array.isArray(ans)) return { points: 0, maxPoints: 2 };
      const hits = ans.filter(a => q.correct.includes(a)).length;
      return { points: Math.max(0, hits - 1), maxPoints: 2 };
    }
    return { points: isCorrect(qIdx) ? 1 : 0, maxPoints: 1 };
  };

  // Review after submit
  if (showResult) {
    const correct = qs.filter((_, i) => isCorrect(i)).length;
    const totalPoints = qs.reduce((sum, _, i) => sum + scoreQuestion(i).points, 0);
    const maxPoints = qs.reduce((sum, _, i) => sum + scoreQuestion(i).maxPoints, 0);
    const hasProseSummary = qs.some(q => q.question_type === 'prose_summary');
    return (
      <div style={{
        minHeight: '100vh', background: colors.bg, fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 28, color: colors.text, marginBottom: 8,
            }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 14, color: colors.textMuted }}>
              {hasProseSummary ? `${totalPoints} / ${maxPoints} pts` : `${correct} / ${qs.length} correct`}
            </p>
          </div>

          {qs.map((q, qi) => {
            const ok = isCorrect(qi);
            const sq = scoreQuestion(qi);
            const isProse = q.question_type === 'prose_summary';
            const scoreColor = isProse
              ? (sq.points === 2 ? '#5a9a6e' : sq.points === 1 ? '#C4956A' : '#b06060')
              : (ok ? '#5a9a6e' : '#b06060');
            const tc = typeColors[q.question_type] || typeColors.detail;
            return (
              <div key={qi} style={{
                background: colors.card, borderRadius: 14, border: `1px solid ${colors.border}`,
                padding: 24, marginBottom: 12,
                animation: `fadeUp 0.4s ease-out ${qi * 0.05}s both`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 6, fontSize: 11, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: ok ? 'rgba(90,154,110,0.1)' : isProse && sq.points > 0 ? 'rgba(196,149,106,0.1)' : 'rgba(176,96,96,0.1)',
                    color: scoreColor,
                    border: `1.5px solid ${ok ? 'rgba(90,154,110,0.3)' : isProse && sq.points > 0 ? 'rgba(196,149,106,0.3)' : 'rgba(176,96,96,0.3)'}`,
                  }}>{qi + 1}</span>
                  {q.question_type && tc && (
                    <span style={{
                      fontSize: 10, fontWeight: 500, color: tc.text, background: tc.bg,
                      border: `1px solid ${tc.border}`, padding: '2px 8px', borderRadius: 5,
                    }}>{typeLabels[q.question_type] || q.question_type}</span>
                  )}
                  <span style={{
                    marginLeft: 'auto', fontSize: 11, fontWeight: 500,
                    color: scoreColor,
                  }}>{isProse ? `${sq.points}/${sq.maxPoints} pts` : (ok ? '✓' : '✗')}</span>
                </div>
                <p style={{ fontSize: 13, color: colors.text, lineHeight: 1.6, marginBottom: 12 }}>{q.text}</p>
                {q.options.map((opt, oi) => {
                  const isUser = (q.question_type === 'prose_summary' || q.type === 'multiple')
                    ? Array.isArray(answers[qi]) && answers[qi].includes(oi)
                    : answers[qi] === oi;
                  const isAnswer = Array.isArray(q.correct) ? q.correct.includes(oi) : q.correct === oi;
                  let bg = 'transparent', border = colors.border, color = colors.textMedium;
                  if (isAnswer) { bg = 'rgba(90,154,110,0.06)'; border = 'rgba(90,154,110,0.3)'; color = '#5a9a6e'; }
                  if (isUser && !isAnswer) { bg = 'rgba(176,96,96,0.06)'; border = 'rgba(176,96,96,0.3)'; color = '#b06060'; }
                  return (
                    <div key={oi} style={{
                      padding: '8px 12px', borderRadius: 8, marginBottom: 4,
                      border: `1.5px solid ${border}`, background: bg,
                      fontSize: 12, color, display: 'flex', alignItems: 'center', gap: 8,
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
                    marginTop: 8, padding: '12px 14px', borderRadius: 8,
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
        </div>
      </div>
    );
  }

  // Auto-scroll to relevant paragraph
  useEffect(() => {
    const pIdx = currentQ?.paragraph;
    if (pIdx != null && paragraphRefs.current[pIdx] && passageRef.current) {
      const el = paragraphRefs.current[pIdx];
      const container = passageRef.current;
      container.scrollTo({ top: el.offsetTop - container.offsetTop - 20, behavior: 'smooth' });
    }
  }, [currentQuestion]);

  // Render passage text with highlighted word or text-insertion markers
  const renderParagraph = (para, idx) => {
    const paraLabel = <span style={{ fontSize: 10, fontWeight: 600, color: '#C4B5A0', marginRight: 6 }}>P{idx + 1}</span>;

    // Text insertion: inject ■A ■B ■C ■D before each insertion_points anchor
    if (currentQ?.question_type === 'text_insertion' && currentQ?.paragraph === idx && currentQ?.insertion_points?.length) {
      let remaining = para;
      const segments = [];
      currentQ.insertion_points.forEach((anchor, i) => {
        const pos = remaining.indexOf(anchor);
        if (pos === -1) return;
        segments.push(remaining.slice(0, pos));
        segments.push({ marker: String.fromCharCode(65 + i) }); // A B C D
        remaining = remaining.slice(pos);
      });
      segments.push(remaining);
      return (
        <>
          {paraLabel}
          {segments.map((s, i) =>
            typeof s === 'string' ? s : (
              <span key={i} style={{
                display: 'inline-block', margin: '0 2px', padding: '0 5px',
                background: 'rgba(74,128,96,0.12)', border: '1.5px solid rgba(74,128,96,0.4)',
                borderRadius: 4, fontSize: 12, fontWeight: 700, color: '#3a7050',
                cursor: 'default', verticalAlign: 'middle',
              }}>■{s.marker}</span>
            )
          )}
        </>
      );
    }

    // Highlighted word/sentence
    const hw = currentQ?.highlighted_word;
    if (hw && currentQ?.paragraph === idx && para.includes(hw)) {
      const parts = para.split(hw);
      return (
        <>
          {paraLabel}
          {parts[0]}
          <span style={{
            background: 'rgba(82,130,175,0.15)', padding: '1px 3px', borderRadius: 3,
            borderBottom: '2px solid #4a7fa5', fontWeight: 500,
          }}>{hw}</span>
          {parts.slice(1).join(hw)}
        </>
      );
    }

    return <>{paraLabel}{para}</>;
  };

  // Test interface
  return (
    <div className="test-layout" style={{
      display: 'flex', height: 'calc(100vh - 48px)', background: colors.card,
      fontFamily: "'Georgia', serif",
    }}>
      {/* Passage */}
      <div className="passage-panel" style={{
        width: '50%', display: 'flex', flexDirection: 'column',
        borderRight: `1px solid ${colors.border}`, background: colors.card,
      }}>
        <div style={{
          padding: '14px 24px', borderBottom: `1px solid ${colors.border}`,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{section.title}</h2>
        </div>
        <div ref={passageRef} className="passage-content" style={{
          flex: 1, overflowY: 'auto', padding: '24px 28px',
        }}>
          {paragraphs.map((para, idx) => (
            <p key={idx} ref={el => paragraphRefs.current[idx] = el} style={{
              fontFamily: "'Georgia', serif", fontSize: 16, lineHeight: 2.0,
              color: colors.text, marginBottom: 20, fontWeight: 400,
              padding: '8px 12px', borderRadius: 4,
              borderLeft: currentQ?.paragraph === idx ? `3px solid ${colors.primary}` : '3px solid transparent',
              background: currentQ?.paragraph === idx ? 'rgba(0,105,92,0.03)' : 'transparent',
              transition: 'all 0.4s ease',
            }}>
              {renderParagraph(para, idx)}
            </p>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="question-panel" style={{
        width: '50%', display: 'flex', flexDirection: 'column', background: colors.bg,
      }}>
        {/* Nav dots */}
        <div style={{
          padding: '12px 24px', borderBottom: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {qs.map((q, i) => {
              const dotDone = (q.question_type === 'prose_summary' || q.type === 'multiple')
                ? Array.isArray(answers[i]) && answers[i].length === (q.question_type === 'prose_summary' ? 3 : q.correct.length)
                : answers[i] !== undefined;
              return (
                <button key={i} onClick={() => setCurrentQuestion(i)} style={{
                  width: 26, height: 26, borderRadius: 6,
                  border: i === currentQuestion ? '2px solid #D4A574'
                    : dotDone ? '1.5px solid rgba(90,154,110,0.3)'
                    : `1.5px solid ${colors.border}`,
                  background: i === currentQuestion ? 'rgba(212,165,116,0.08)'
                    : dotDone ? 'rgba(90,154,110,0.05)' : 'white',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
                  color: i === currentQuestion ? '#C4956A' : dotDone ? '#5a9a6e' : colors.textLight,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{i + 1}</button>
              );
            })}
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: colors.textLight }}>
            {Object.keys(answers).length} / {qs.length}
          </span>
        </div>

        {/* Question */}
        <div className="question-content" style={{
          flex: 1, overflowY: 'auto', padding: '28px 28px 20px',
          opacity: fadeIn ? 1 : 0, transition: 'opacity 0.15s ease',
        }}>
          {currentQ.question_type && typeColors[currentQ.question_type] && (
            <div style={{
              display: 'inline-flex', padding: '3px 10px', borderRadius: 5, marginBottom: 16,
              background: typeColors[currentQ.question_type].bg,
              border: `1px solid ${typeColors[currentQ.question_type].border}`,
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
                color: typeColors[currentQ.question_type].text,
              }}>{typeLabels[currentQ.question_type] || currentQ.question_type}</span>
            </div>
          )}

          <h3 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 18, color: colors.text, lineHeight: 1.5,
            marginBottom: currentQ.insert_sentence ? 12 : 24, fontWeight: 400,
          }}>{currentQ.text}</h3>

          {currentQ.insert_sentence && (
            <div style={{
              padding: '12px 16px', marginBottom: 20,
              background: 'rgba(74,128,96,0.06)', border: '1.5px solid rgba(74,128,96,0.25)',
              borderRadius: 8, fontFamily: "'Georgia', serif",
              fontSize: 15, color: colors.text, lineHeight: 1.6,
            }}>
              {currentQ.insert_sentence}
            </div>
          )}

          {currentQ.lead_sentence && (
            <div style={{
              padding: '12px 16px', marginBottom: 16,
              background: 'rgba(74,128,96,0.05)', border: '1.5px solid rgba(74,128,96,0.2)',
              borderRadius: 8, fontFamily: "'Georgia', serif",
              fontSize: 14, color: colors.text, lineHeight: 1.7,
            }}>
              {currentQ.lead_sentence}
            </div>
          )}

          {isMultiSelectQ && (
            <p style={{
              fontSize: 11, color: colors.textLight, marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Select {multiMaxSelect} answers
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = isMultiSelectQ
                ? Array.isArray(answers[currentQuestion]) && answers[currentQuestion].includes(idx)
                : answers[currentQuestion] === idx;
              const isDisabled = isMultiSelectQ && !isSelected
                && Array.isArray(answers[currentQuestion])
                && answers[currentQuestion].length >= multiMaxSelect;
              return (
                <button key={idx} onClick={() => !isDisabled && handleSelect(idx)} style={{
                  width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 8,
                  border: isSelected ? `2px solid ${colors.primary}` : `1.5px solid ${colors.border}`,
                  background: isSelected ? 'rgba(0,105,92,0.04)' : 'white',
                  cursor: isDisabled ? 'default' : 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  color: isSelected ? colors.text : isDisabled ? colors.textLight : colors.textMedium,
                  opacity: isDisabled ? 0.5 : 1,
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: isMultiSelectQ ? 4 : '50%', flexShrink: 0,
                    border: isSelected ? `2px solid ${colors.primary}` : `1.5px solid ${colors.textLight}`,
                    background: isSelected ? colors.primary : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 600, color: isSelected ? 'white' : colors.textLight,
                  }}>{String.fromCharCode(65 + idx)}</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {isShortcutsVisible && (
          <div className="kbd-hint">
            <span><span className="kbd">←</span><span className="kbd">→</span> navigate</span>
            <span><span className="kbd">1</span>–<span className="kbd">5</span> select</span>
          </div>
        )}
        {/* Nav — TOEFL teal bar */}
        <div style={{
          padding: '10px 20px', background: colors.primary,
          display: 'flex', justifyContent: 'flex-end', gap: 8,
        }}>
          <button onClick={() => setCurrentQuestion(q => q - 1)} disabled={currentQuestion === 0}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: 'white', opacity: currentQuestion === 0 ? 0.4 : 1,
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 6, padding: '8px 20px',
              cursor: currentQuestion === 0 ? 'default' : 'pointer',
            }}>‹ Back</button>
          {currentQuestion < qs.length - 1 ? (
            <button onClick={() => setCurrentQuestion(q => q + 1)} disabled={!isCurrentAnswered}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                color: colors.primary, opacity: !isCurrentAnswered ? 0.5 : 1,
                background: 'white', border: 'none',
                borderRadius: 6, padding: '8px 24px',
                cursor: !isCurrentAnswered ? 'default' : 'pointer',
              }}>Next ›</button>
          ) : (
            <button onClick={handleSubmit} disabled={!isCurrentAnswered} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: colors.primary,
              background: !isCurrentAnswered ? 'rgba(255,255,255,0.4)' : 'white',
              border: 'none', borderRadius: 6, padding: '8px 24px',
              cursor: !isCurrentAnswered ? 'default' : 'pointer',
            }}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicPassage;
