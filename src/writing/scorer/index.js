import * as grammar     from './grammar.js'
import * as mechanics   from './mechanics.js'
import * as vocabulary  from './vocabulary.js'
import * as organization from './organization.js'
import * as development from './development.js'
import * as style       from './style.js'
import * as relevance   from './relevance.js'

// Weights calibrated against ETS e-rater macrofeature distribution.
// Sources: Attali & Burstein 2006, Attali/Bridgeman/Trapani 2010, ETS RR-04-04.
// 2026-04-12 recalibration: vocabulary 18%→14%, development 24%→28%,
//   relevance 8%→5%, org 30%→33%.
// 2026-04-12 v2: style 3%→7% (syntactic range is more diagnostic than spelling
//   for intermediate writers), mechanics 10%→6% (spelling is a floor condition,
//   not a differentiator above score 2).
// Total: 7+6+14+33+28+7+5 = 100%
const WEIGHTS = {
  grammar:      0.07,
  mechanics:    0.06,
  vocabulary:   0.14,
  organization: 0.33,
  development:  0.28,
  style:        0.07,
  relevance:    0.05,
}

/**
 * Score a writing sample.
 *
 * @param {string} text       - The essay/email/discussion text
 * @param {string} taskType   - 'email' | 'discussion' | 'general'
 * @param {string} promptText - Optional: the prompt/question text for relevance scoring
 * @returns {{ overall: number, breakdown: object, suggestions: string[] }}
 */
export function scoreWriting(text, taskType = 'general', promptText = '') {
  const analyses = {
    grammar:      grammar.score(text),
    mechanics:    mechanics.score(text),
    vocabulary:   vocabulary.score(text),
    organization: organization.score(text, taskType),
    development:  development.score(text, taskType),
    style:        style.score(text),
    relevance:    relevance.score(text, promptText),
  }

  // Weighted sum → raw score in [0, 1]
  const rawScore = Object.entries(WEIGHTS).reduce(
    (sum, [key, weight]) => sum + (analyses[key].value || 0) * weight,
    0,
  )

  // Map to TOEFL 0-5 scale
  const overall = Math.round(rawScore * 5 * 10) / 10

  // Build breakdown object
  const breakdown = {}
  for (const [key, analysis] of Object.entries(analyses)) {
    breakdown[key] = {
      score:   Math.round((analysis.value || 0) * 100) / 100,
      details: analysis.details || '',
      errors:  analysis.errors || [],
    }
  }

  // Collect suggestions from 3 lowest-scoring dimensions
  const sorted = Object.entries(analyses).sort((a, b) => (a[1].value || 0) - (b[1].value || 0))
  const weakest = sorted.slice(0, 3)

  const suggestionMap = {
    grammar:      grammar.suggest,
    mechanics:    mechanics.suggest,
    vocabulary:   vocabulary.suggest,
    organization: organization.suggest,
    development:  development.suggest,
    style:        style.suggest,
    relevance:    relevance.suggest,
  }

  const allSuggestions = []
  for (const [key, analysis] of weakest) {
    const tips = suggestionMap[key](analysis)
    allSuggestions.push(...tips)
    if (allSuggestions.length >= 5) break
  }

  return {
    overall,
    breakdown,
    suggestions: allSuggestions.slice(0, 5),
  }
}
