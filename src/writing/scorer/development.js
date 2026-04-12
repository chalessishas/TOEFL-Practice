const DETAIL_MARKERS = [
  'for example','for instance','such as','specifically','in particular',
  'according to','namely','to illustrate','as evidence','as shown','as demonstrated',
  'in fact','as an example','including','like',
]

// Opinion/thesis markers — signals the essay has a stated position
const THESIS_MARKERS = [
  'i believe','i think','i agree','i disagree','in my opinion','in my view',
  'i would argue','it is my opinion','i feel that','my view is',
  'i side with','i support','i favor','i favour','i contend','i stand with',
  'i find','i consider','my position','my stance','i align with',
  'i am convinced','i strongly believe','it is clear that','it seems to me',
]

// Reason/elaboration markers — signals the essay has developed supporting points
const REASON_MARKERS = [
  'one reason','another reason','first','second','third','firstly','secondly',
  'thirdly','furthermore','moreover','in addition','additionally',
  'however','on the other hand','in contrast','by contrast','whereas','although',
  'nevertheless','nonetheless','despite','while','yet',
]

// Word count ranges per task type
const WORD_COUNT_TARGETS = {
  email:      { min: 50,  target: 120, max: 200 },
  discussion: { min: 80,  target: 160, max: 300 },
  general:    { min: 100, target: 200, max: 400 },
}

function wordCountScore(wordCount, taskType) {
  const range = WORD_COUNT_TARGETS[taskType] || WORD_COUNT_TARGETS.general
  if (wordCount < range.min) return wordCount / range.min * 0.5
  if (wordCount <= range.target) return 0.5 + ((wordCount - range.min) / (range.target - range.min)) * 0.5
  if (wordCount <= range.max) return 1.0
  // Penalize very long responses slightly
  return Math.max(0.7, 1.0 - (wordCount - range.max) / range.max * 0.3)
}

function detailMarkersScore(text) {
  const lower = text.toLowerCase()
  const found = DETAIL_MARKERS.filter(m => lower.includes(m))
  // 0→0, 1→0.4, 2→0.7, 3+→1.0
  if (found.length === 0) return 0
  if (found.length === 1) return 0.4
  if (found.length === 2) return 0.7
  return 1.0
}

function sentenceCountScore(count, taskType) {
  const targets = {
    email:      { min: 4,  good: 8  },
    discussion: { min: 5,  good: 10 },
    general:    { min: 6,  good: 12 },
  }
  const t = targets[taskType] || targets.general
  if (count < t.min) return count / t.min * 0.5
  if (count < t.good) return 0.5 + ((count - t.min) / (t.good - t.min)) * 0.5
  return 1.0
}

function argumentStructureScore(text, wordCount, taskType) {
  // Email tasks use transactional structure (request/reply/apology), not opinion/thesis
  if (taskType === 'email') return 1.0
  // Only penalise essays long enough that thin ideas are a choice, not a length issue
  if (wordCount < 120) return 1.0
  const lower = text.toLowerCase()
  const hasThesis = THESIS_MARKERS.some(m => lower.includes(m))
  const detailCount = DETAIL_MARKERS.filter(m => lower.includes(m)).length
  const reasonCount = REASON_MARKERS.filter(m => lower.includes(m)).length
  // Full score: has thesis + ≥2 examples/details + ≥2 reason markers
  // Thin essay penalty: long but ≤1 example marker and ≤1 reason marker
  if (!hasThesis && detailCount <= 1 && reasonCount <= 1) return 0.35
  if (detailCount === 0 && reasonCount <= 1) return 0.5
  if (detailCount <= 1 && reasonCount <= 1) return 0.65
  return 1.0
}

export function score(text, taskType = 'general') {
  const words = (text.match(/\b\w+\b/g) || [])
  const wordCount = words.length
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0)
  const sentenceCount = sentences.length

  const wcScore  = wordCountScore(wordCount, taskType)
  const dmScore  = detailMarkersScore(text)
  const scScore  = sentenceCountScore(sentenceCount, taskType)
  const argScore = argumentStructureScore(text, wordCount, taskType)

  // argScore gates the ceiling: thin ideas cap development at ~0.65 regardless of word count
  const value = Math.min(argScore, Math.min(1, wcScore * 0.5 + dmScore * 0.3 + scScore * 0.2))

  return {
    value,
    details: `${wordCount} words, ${sentenceCount} sentences, ${
      DETAIL_MARKERS.filter(m => text.toLowerCase().includes(m)).length
    } detail marker(s)`,
  }
}

export function suggest(analysis) {
  if (analysis.value >= 0.8) return []
  const tips = []
  const wordMatch = analysis.details.match(/(\d+) words/)
  if (wordMatch && parseInt(wordMatch[1]) < 100)
    tips.push('Expand your response — develop your ideas with more detail and explanation.')
  if (analysis.details.includes('0 detail marker') || analysis.details.includes('1 detail marker'))
    tips.push('Support your points with specific examples (for example, for instance, such as). Essays without concrete examples are capped at score 3.')
  const sentMatch = analysis.details.match(/(\d+) sentences/)
  if (sentMatch && parseInt(sentMatch[1]) < 5)
    tips.push('Add more sentences to fully develop each idea.')
  return tips.length > 0 ? tips : ['Develop your ideas further with concrete examples and evidence.']
}
