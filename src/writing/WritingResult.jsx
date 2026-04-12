import React from 'react'
import './writing.css'
import { useTheme } from '../shared/ThemeContext.jsx'
import { getHistory } from './scoreHistory.js'

const DIMENSION_LABELS = {
  grammar:      'Grammar',
  mechanics:    'Mechanics',
  vocabulary:   'Vocabulary',
  organization: 'Organization',
  development:  'Development',
  style:        'Style',
}

const getTitle = (overall) => {
  if (overall >= 4) return 'Excellent Work'
  if (overall >= 3) return 'Good Effort'
  return 'Keep Practicing'
}

const getGrade = (value) => {
  if (value >= 0.8) return { label: 'Excellent', color: '#5a9a6e', bg: 'rgba(90, 154, 110, 0.08)' }
  if (value >= 0.6) return { label: 'Good', color: '#4a7fa5', bg: 'rgba(74, 127, 165, 0.08)' }
  if (value >= 0.4) return { label: 'Fair', color: '#b87333', bg: 'rgba(184, 115, 51, 0.08)' }
  return { label: 'Weak', color: '#b06060', bg: 'rgba(176, 96, 96, 0.08)' }
}

const WritingResult = ({ score, userText, sampleResponse, sampleScore, taskType, onRetry, onBack }) => {
  const { colors } = useTheme()
  const pct = Math.round((score.overall / 5) * 100)
  const title = getTitle(score.overall)

  const history = getHistory().filter(h => h.type === taskType)
  // exclude the just-submitted entry (last item) when computing prior best
  const prior = history.slice(0, -1)
  const personalBest = prior.length > 0 ? Math.max(...prior.map(h => h.score)) : null
  const isNewBest = personalBest !== null && score.overall > personalBest
  const delta = personalBest !== null ? (score.overall - personalBest).toFixed(1) : null

  return (
    <div style={{
      minHeight: '100vh', background: colors.bg,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Score Ring */}
        <div style={{ textAlign: 'center', marginBottom: 40, animation: 'fadeUp 0.6s ease-out' }}>
          <div style={{
            width: 140, height: 140, borderRadius: '50%',
            background: `conic-gradient(#00695c ${pct * 3.6}deg, #ddd 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <div style={{
              width: 116, height: 116, borderRadius: '50%', background: colors.bg,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 44, color: colors.text, lineHeight: 1,
              }}>
                {score.overall}
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, color: '#aaa', marginTop: 2,
              }}>
                /5
              </span>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 28, color: colors.text, fontWeight: 400, marginBottom: 8,
          }}>
            {title}
          </h2>
          {isNewBest && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(90,154,110,0.1)', border: '1px solid rgba(90,154,110,0.3)',
              borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 600, color: '#5a9a6e',
            }}>
              ★ New personal best! +{delta} vs your previous best ({personalBest})
            </div>
          )}
          {!isNewBest && personalBest !== null && (
            <div style={{
              fontSize: 12, color: '#aaa',
            }}>
              {delta > 0 ? `▲ ${delta} above` : delta < 0 ? `▼ ${Math.abs(delta)} below` : '='} your personal best ({personalBest}/5)
            </div>
          )}
        </div>

        {/* Dimension Bars */}
        <div style={{
          background: colors.card, borderRadius: 14, border: '1px solid #ddd',
          padding: '24px 28px', marginBottom: 20,
          animation: 'fadeUp 0.5s ease-out 0.1s both',
        }}>
          <p style={{
            fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 20,
          }}>
            Score Breakdown
          </p>

          {Object.entries(score.breakdown).map(([key, dim]) => {
            const rawScore = dim.score || 0
            const grade = getGrade(rawScore)
            const errors = dim.errors || []
            return (
              <div key={key} style={{ marginBottom: errors.length > 0 ? 16 : 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    fontSize: 13, color: colors.textMedium, width: 100, flexShrink: 0,
                  }}>
                    {DIMENSION_LABELS[key] || key}
                  </span>
                  <div className="score-bar-track" style={{ flex: 1 }}>
                    <div
                      className="score-bar-fill"
                      style={{
                        width: `${Math.round(rawScore * 100)}%`,
                        background: grade.color,
                      }}
                    />
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: grade.color,
                    background: grade.bg, padding: '3px 10px', borderRadius: 6,
                    flexShrink: 0, textAlign: 'center', minWidth: 70,
                  }}>
                    {grade.label}
                  </span>
                </div>
                {errors.slice(0, 2).map((err, i) => (
                  <p key={i} style={{
                    fontSize: 11, color: '#b06060', margin: '4px 0 0 112px', lineHeight: 1.5,
                  }}>
                    {err}
                  </p>
                ))}
              </div>
            )
          })}
        </div>

        {/* Suggestions */}
        {score.suggestions && score.suggestions.length > 0 && (
          <div style={{
            marginBottom: 20, animation: 'fadeUp 0.5s ease-out 0.15s both',
          }}>
            <p style={{
              fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 12,
            }}>
              Suggestions for Improvement
            </p>
            {score.suggestions.map((tip, i) => (
              <div key={i} style={{
                background: 'rgba(0,105,92,0.03)',
                border: '1px solid rgba(0,105,92,0.12)',
                borderRadius: 10, padding: '14px 16px',
                marginBottom: 8,
              }}>
                <p style={{
                  fontSize: 13, color: '#004d40', margin: 0, lineHeight: 1.6,
                }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Response Comparison */}
        <div style={{ marginBottom: 32, animation: 'fadeUp 0.5s ease-out 0.2s both' }}>
          <p style={{
            fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 12,
          }}>
            Response Comparison
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{
              flex: '1 1 280px', background: colors.card, borderRadius: 12,
              border: '1px solid #ddd', padding: 20,
            }}>
              <p style={{
                fontSize: 11, fontWeight: 600, color: '#aaa',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14,
              }}>
                Your Response
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                color: colors.text, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0,
              }}>
                {userText}
              </p>
            </div>
            <div style={{
              flex: '1 1 280px', background: colors.card, borderRadius: 12,
              border: '1.5px solid rgba(90,154,110,0.3)', padding: 20,
            }}>
              <p style={{
                fontSize: 11, fontWeight: 600, color: '#5a9a6e',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14,
              }}>
                Sample Response (Score: {sampleScore}/5)
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                color: colors.text, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0,
              }}>
                {sampleResponse}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onRetry}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              color: 'white', background: '#00695c',
              border: 'none', borderRadius: 10, padding: '12px 28px', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,105,92,0.2)',
            }}
          >
            Try Again
          </button>
          <button
            onClick={onBack}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              color: colors.textMedium, background: colors.card,
              border: '1.5px solid #ccc', borderRadius: 10, padding: '12px 28px', cursor: 'pointer',
            }}
          >
            Back to Writing
          </button>
        </div>

      </div>
    </div>
  )
}

export default WritingResult
