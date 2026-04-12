import { useTheme } from '../shared/ThemeContext.jsx';
import { pack6 } from '../pack6.js';

// Reading home screen — stateless presentational component
// Props: { history, onStartLegacy, onStartPack }
const ReadingHome = ({ history, onStartLegacy, onStartPack }) => {
  const { colors } = useTheme()

  const totalSets = 1 + pack6.modules.length;
  const completedSets = Object.keys(history).length;
  // Find the first incomplete Pack 6 module index for "Next Up" recommendation
  const nextUpIndex = pack6.modules.findIndex(m => !history[m.id]);
  const totalQuestions = 10 + pack6.modules.reduce((sum, m) => sum + m.sections.reduce((s2, sec) => {
    if (sec.type === 'complete_words') return s2 + sec.paragraph.filter(p => p.blank).length;
    return s2 + (sec.questions?.length || 0);
  }, 0), 0);

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      padding: '32px 40px',
      maxWidth: 900,
    }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 700,
          marginBottom: 6, color: colors.text,
        }}>
          Reading Practice
        </h1>
        <p style={{ fontSize: 14, color: colors.textMuted, marginBottom: 20 }}>
          Academic passages and daily life materials
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
          {[
            { label: 'Practice Sets', value: totalSets },
            { label: 'Total Questions', value: totalQuestions },
            { label: 'Completed', value: `${completedSets} / ${totalSets}` },
            { label: 'Question Types', value: '5 types' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: colors.card, border: `1px solid ${colors.borderLight}`,
              borderRadius: 8, padding: '10px 16px', flex: '1 1 100px',
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: colors.primary, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Section: Standalone Passages */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          }}>
            <div style={{
              width: 4, height: 20, borderRadius: 2, background: colors.primary,
            }}/>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: colors.text, margin: 0 }}>
              Academic Passages
            </h2>
            <span style={{
              fontSize: 11, color: colors.textMuted, background: colors.borderLight,
              padding: '2px 8px', borderRadius: 4, fontWeight: 500,
            }}>1 available</span>
          </div>

          <button onClick={onStartLegacy} style={{
            width: '100%', textAlign: 'left', padding: 0,
            background: colors.card, borderRadius: 12,
            border: `1px solid ${colors.borderLight}`, cursor: 'pointer',
            transition: 'all 0.2s ease',
            overflow: 'hidden', display: 'flex',
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,105,92,0.1)'; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = colors.borderLight; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width: 6, background: colors.primary, flexShrink: 0 }}/>
            <div style={{ padding: '20px 24px', flex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: 'rgba(0,105,92,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.8" strokeLinecap="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: 4 }}>
                  Urban Agriculture
                </div>
                <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.5 }}>
                  The practice of cultivating crops within city boundaries and its impact on food security.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {[
                  { label: '10 Q', sub: 'questions' },
                  { label: '20m', sub: 'time limit' },
                  { label: '5', sub: 'types' },
                ].map((t, i) => (
                  <div key={i} style={{
                    textAlign: 'center', padding: '6px 10px',
                    background: colors.inputBg, borderRadius: 6,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{t.label}</div>
                    <div style={{ fontSize: 9, color: colors.textLight, textTransform: 'uppercase' }}>{t.sub}</div>
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 20, color: colors.primary, fontWeight: 700, marginLeft: 8 }}>›</span>
            </div>
          </button>
        </div>

        {/* Section: Pack 6 */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          }}>
            <div style={{
              width: 4, height: 20, borderRadius: 2, background: colors.toeflTealLight,
            }}/>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: colors.text, margin: 0 }}>
              Pack 6 — Mixed Practice
            </h2>
            <span style={{
              fontSize: 11, color: colors.textMuted, background: colors.borderLight,
              padding: '2px 8px', borderRadius: 4, fontWeight: 500,
            }}>{pack6.modules.length} modules</span>
            {completedSets > 0 && (
              <span style={{
                fontSize: 11, color: colors.success, background: 'rgba(46,125,50,0.08)',
                padding: '2px 8px', borderRadius: 4, fontWeight: 600,
              }}>{completedSets} done</span>
            )}
          </div>

          {/* Next Up banner */}
          {nextUpIndex !== -1 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(0,105,92,0.05)', border: '1px solid rgba(0,105,92,0.15)',
              borderRadius: 10, padding: '10px 16px', marginBottom: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13 }}>▶</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: colors.primary }}>Next Up: </span>
                <span style={{ fontSize: 12, color: colors.text }}>{pack6.modules[nextUpIndex].name}</span>
              </div>
              <button
                onClick={() => onStartPack(pack6, nextUpIndex)}
                style={{
                  fontSize: 12, fontWeight: 600, color: 'white', background: colors.primary,
                  border: 'none', borderRadius: 7, padding: '6px 16px', cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >Start →</button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pack6.modules.map((mod, mi) => {
              const done = history[mod.id];
              const doneResults = done?.results || (Array.isArray(done) ? done : [])
              const readingScore = doneResults.length
                ? doneResults.reduce((acc, r) => ({ correct: acc.correct + (r.correct || 0), total: acc.total + (r.total || 0) }), { correct: 0, total: 0 })
                : null;
              const sectionTags = (() => {
                const counts = {};
                mod.sections.forEach(s => {
                  const key = s.type === 'complete_words' ? 'Fill Words'
                    : s.type === 'daily_life' ? 'Email'
                    : s.type === 'academic_passage' ? 'Passage'
                    : s.type;
                  counts[key] = (counts[key] || 0) + 1;
                });
                const colorMap = { 'Fill Words': '#e65100', 'Email': '#1565c0', 'Passage': colors.primary };
                return Object.entries(counts).map(([label, count]) => ({
                  label: count > 1 ? `${label} ×${count}` : label,
                  color: colorMap[label] || colors.textMuted,
                }));
              })();
              const qCount = mod.sections.reduce((sum, s) => {
                if (s.type === 'complete_words') return sum + s.paragraph.filter(p => p.blank).length;
                return sum + (s.questions?.length || 0);
              }, 0);

              const isNextUp = !done && mi === nextUpIndex
              const borderColor = done ? 'rgba(46,125,50,0.2)' : isNextUp ? `rgba(0,105,92,0.35)` : colors.borderLight
              return (
                <button key={mod.id} onClick={() => onStartPack(pack6, mi)} style={{
                  width: '100%', textAlign: 'left', padding: 0,
                  background: done ? colors.card : 'white', borderRadius: 12,
                  border: `1px solid ${borderColor}`,
                  boxShadow: isNextUp ? '0 2px 12px rgba(0,105,92,0.08)' : 'none',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  overflow: 'hidden', display: 'flex',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,105,92,0.1)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.boxShadow = isNextUp ? '0 2px 12px rgba(0,105,92,0.08)' : 'none'; }}
                >
                  <div style={{ width: 6, background: done ? colors.success : colors.toeflTealLight, flexShrink: 0 }}/>
                  <div style={{ padding: '16px 20px', flex: 1, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: done ? 'rgba(46,125,50,0.08)' : 'rgba(0,105,92,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, fontWeight: 800,
                      color: done ? colors.success : colors.primary,
                    }}>{done ? '✓' : mi + 1}</div>

                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 6,
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        {mod.name}
                        {done && readingScore && (
                          <span style={{
                            fontSize: 10, fontWeight: 700,
                            color: readingScore.correct / readingScore.total >= 0.8 ? colors.success : readingScore.correct / readingScore.total >= 0.6 ? '#f59e0b' : '#f87171',
                            background: readingScore.correct / readingScore.total >= 0.8 ? 'rgba(46,125,50,0.08)' : readingScore.correct / readingScore.total >= 0.6 ? 'rgba(245,158,11,0.08)' : 'rgba(248,113,113,0.08)',
                            padding: '2px 8px', borderRadius: 4,
                          }}>{readingScore.correct}/{readingScore.total}</span>
                        )}
                        {!done && mi === nextUpIndex && <span style={{
                          fontSize: 10, fontWeight: 700, color: '#fff',
                          background: colors.primary, padding: '2px 8px', borderRadius: 4,
                          letterSpacing: '0.03em',
                        }}>NEXT UP</span>}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {sectionTags.map((tag, ti) => (
                          <span key={ti} style={{
                            fontSize: 10, fontWeight: 600, color: tag.color,
                            background: `${tag.color}11`, padding: '2px 8px', borderRadius: 4,
                            border: `1px solid ${tag.color}22`,
                          }}>{tag.label}</span>
                        ))}
                        <span style={{
                          fontSize: 10, fontWeight: 500, color: colors.textMuted,
                          padding: '2px 8px',
                        }}>
                          {qCount}Q · {Math.floor(mod.time / 60)}:{(mod.time % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <span style={{ fontSize: 20, color: colors.primary, fontWeight: 700 }}>›</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tip banner */}
        <div style={{
          marginTop: 32, padding: '16px 20px',
          background: 'rgba(0,105,92,0.04)', border: '1px solid rgba(0,105,92,0.1)',
          borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: colors.primary, marginBottom: 4 }}>Study Tip</p>
            <p style={{ fontSize: 12, color: colors.textMedium, lineHeight: 1.6, margin: 0 }}>
              Start with the academic passage to build vocabulary, then move to Pack 6 for mixed practice.
              Each module includes fill-in-the-blank, email reading, and passage comprehension.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingHome;
