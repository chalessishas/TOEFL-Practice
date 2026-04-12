// Prompt-relevance scorer — ETS criterion: "communicative goals / task completion"
// Extracts key content words from the prompt, measures overlap with response.
// Intentionally lightweight: keyword overlap is a good proxy for on-topic writing
// without requiring NLP libraries.

const STOP_WORDS = new Set([
  'the','a','an','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','can','shall',
  'must','and','or','but','if','when','while','because','since','although',
  'for','from','to','in','on','at','by','with','about','into','through',
  'this','that','these','those','it','he','she','they','we','you','i',
  'me','my','your','his','her','our','their','who','which','what','where',
  'how','why','there','then','than','very','much','more','most','some','any',
  'all','each','every','both','few','many','such','also','just','not','no',
  'so','as','of','its','do','did','does','up','out','about','than',
  'university','student','students','people','think','believe','argue','opinion',
  'should','would','could','might','whether','question','consider','discuss',
])

function extractKeywords(text, topN = 15) {
  const tokens = (text.match(/[a-zA-Z]+/g) || [])
    .map(w => w.toLowerCase())
    .filter(w => w.length > 3 && !STOP_WORDS.has(w))
  const freq = {}
  tokens.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([w]) => w)
}

// Simple stemmer: strip common suffixes to improve match rate
function stem(word) {
  return word
    .replace(/tion$/, '')
    .replace(/ness$/, '')
    .replace(/ment$/, '')
    .replace(/ity$/, '')
    .replace(/ies$/, 'y')
    .replace(/ing$/, '')
    .replace(/ed$/, '')
    .replace(/er$/, '')
    .replace(/ly$/, '')
    .replace(/s$/, '')
}

/**
 * Score how relevant `responseText` is to `promptText`.
 * Returns { value: 0–1, details, errors }
 *
 * Called from scorer/index.js with the prompt text injected per task.
 */
export function score(responseText, promptText = '') {
  if (!promptText || promptText.trim().length === 0) {
    return { value: 0.7, details: 'No prompt provided — skipping relevance check', errors: [] }
  }

  const promptKeywords = extractKeywords(promptText)
  if (promptKeywords.length === 0) {
    return { value: 0.7, details: 'Could not extract prompt keywords', errors: [] }
  }

  const promptStems = new Set(promptKeywords.map(stem))
  const responseTokens = (responseText.match(/[a-zA-Z]+/g) || []).map(w => w.toLowerCase())
  const responseStems = new Set(responseTokens.map(stem))

  const matches = [...promptStems].filter(s => responseStems.has(s)).length
  const coverageRatio = matches / promptStems.size

  // 0.4 coverage → 0.5 score; 0.7 coverage → 1.0 (typical on-topic response hits ~60-70% of key stems)
  const value = Math.min(1, Math.max(0, (coverageRatio - 0.2) / 0.5))

  const errors = coverageRatio < 0.35
    ? ['Your response may not be addressing the prompt directly — make sure to engage with the core question.']
    : []

  return {
    value,
    details: `Prompt keywords: ${promptKeywords.slice(0, 6).join(', ')} — coverage: ${Math.round(coverageRatio * 100)}%`,
    errors,
  }
}

export function suggest(analysis) {
  if (analysis.value >= 0.7) return []
  const coverMatch = analysis.details.match(/coverage: (\d+)%/)
  if (coverMatch && parseInt(coverMatch[1]) < 50) {
    return ['Make sure you directly address the professor\'s question — use key terms from the prompt in your response.']
  }
  return ['Stay focused on the topic in the prompt — avoid going off on tangents.']
}
