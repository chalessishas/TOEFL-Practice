const DETAIL_MARKERS = [
  'for example','for instance','such as','specifically','in particular',
  'according to','namely','to illustrate','as evidence','as shown','as demonstrated',
  'in fact','as an example','including','like',
  // Academic evidence citation patterns — reward students who cite research/data
  // without using textbook "for example" openers (common in higher-band responses)
  'research shows','research suggests','studies show','studies suggest',
  'studies have shown','research has shown','data shows','data suggests',
  'as evidenced by','as illustrated by','in the case of','to demonstrate',
  'as seen in','based on','evidence shows','evidence suggests',
  // Implicit example signals — sophisticated writers embed examples without "for example".
  // "take the case of", "consider the fact", "one example is", comparative exemplification.
  'take the case','consider the fact','one example','a clear example','take for example',
  'this can be seen','this is evident','far more than','far less than',
  'a good example','a prime example','a notable example',
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
  // Counter-argument acknowledgment — AESPA 2025: essays with concessive rebuttal
  // score 0.3–0.5 pts higher in human rubrics vs. equivalent essays without it
  'one might argue','one could argue','some argue','some might argue',
  'while some','although some','critics argue','opponents argue',
  'admittedly','granted that','it could be argued','it might be argued',
  'some people believe','some would say','one might think',
]

// Word count ranges per task type.
// Discussion target lowered from 160 to 130: ETS minimum is 120 words and the
// rubric rewards quality of argument, not length — 120-word well-argued responses
// should not be penalised for being below an inflated 160-word target.
const WORD_COUNT_TARGETS = {
  email:      { min: 50,  target: 120, max: 200 },
  discussion: { min: 80,  target: 130, max: 300 },
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

// Peer names used in discussion prompts — engagement-as-thesis is valid for this task
const DISCUSSION_PEER_NAMES = /\b(sarah|mark|liam|maya|alex|priya|emma|james|sophie|ethan|noah|chloe|hannah|marcus|fatima|carlos|amara|ben|isabelle|david)\b/i

function argumentStructureScore(text, wordCount, taskType) {
  // Email tasks use transactional structure (request/reply/apology), not opinion/thesis
  if (taskType === 'email') return 1.0
  // Only penalise essays long enough that thin ideas are a choice, not a length issue
  if (wordCount < 120) return 1.0
  const lower = text.toLowerCase()
  let hasThesis = THESIS_MARKERS.some(m => lower.includes(m))

  // Discussion: peer-engagement-as-thesis — "Chloe identifies...", "Carlos raises..." —
  // referencing a classmate + assessing their argument = valid thesis form for this task.
  if (taskType === 'discussion' && !hasThesis) {
    const hasPeer = DISCUSSION_PEER_NAMES.test(lower)
    const hasAssessment = /(correct|right|wrong|flaw|compelling|valid|mistaken|important|raises?|identifies?|points? out|argues?|overlooks?|underestimates?)/i.test(lower)
    if (hasPeer && hasAssessment) hasThesis = true
  }
  const detailCount = DETAIL_MARKERS.filter(m => lower.includes(m)).length
  const reasonCount = REASON_MARKERS.filter(m => lower.includes(m)).length

  // Claim repetition detection: sentences starting with opinion markers but
  // containing no detail/reason marker in the same sentence signal restatement
  // without development — ETS penalizes this as "inadequate elaboration".
  const sentences = text.split(/[.!?]+/).map(s => s.trim().toLowerCase()).filter(s => s.length > 0)
  const bareClaims = sentences.filter(s => {
    const hasOpinion = THESIS_MARKERS.some(m => s.includes(m))
    if (!hasOpinion) return false
    const hasSupport = DETAIL_MARKERS.some(m => s.includes(m)) || REASON_MARKERS.some(m => s.includes(m))
    return !hasSupport
  })
  // 3+ bare claim sentences = repetition pattern, penalize
  const repetitionPenalty = bareClaims.length >= 3 ? 0.15 : 0

  // Full score: has thesis + ≥2 examples/details + ≥2 reason markers
  // Thin essay penalty: long but ≤1 example marker and ≤1 reason marker
  let base
  if (taskType === 'discussion' && hasThesis) {
    // Discussion: stating a position (or engaging with a peer) is the primary criterion.
    // Details/reasons are secondary — only penalise if truly undeveloped (zero of both).
    base = (detailCount === 0 && reasonCount === 0) ? 0.65 : 1.0
  } else if (!hasThesis && detailCount <= 1 && reasonCount <= 1) {
    base = 0.35
  } else if (detailCount === 0 && reasonCount <= 1) {
    base = 0.5
  } else if (detailCount <= 1 && reasonCount <= 1) {
    base = 0.65
  } else {
    base = 1.0
  }
  return Math.max(0, base - repetitionPenalty)
}

export function score(text, taskType = 'general') {
  const words = (text.match(/\b\w+\b/g) || [])
  const wordCount = words.length
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0)
  const sentenceCount = sentences.length

  const wcScore  = wordCountScore(wordCount, taskType)
  const scScore  = sentenceCountScore(sentenceCount, taskType)
  const argScore = argumentStructureScore(text, wordCount, taskType)

  // Task-specific formula weights:
  // - Email: dmScore bypassed (transactional writing — no "for example" expected)
  // - Discussion: dmScore de-weighted (academic reasoning often uses implicit examples,
  //   not "for example/for instance" markers); wcScore boosted to compensate.
  //   ETS rubric rewards quality of argument over word count or marker quantity.
  // - General: standard weighting
  let dmScore, wcW, dmW, scW
  if (taskType === 'email') {
    dmScore = 1.0; wcW = 0.50; dmW = 0.30; scW = 0.20
  } else if (taskType === 'discussion') {
    dmScore = detailMarkersScore(text); wcW = 0.60; dmW = 0.15; scW = 0.25
  } else {
    dmScore = detailMarkersScore(text); wcW = 0.50; dmW = 0.30; scW = 0.20
  }

  // argScore gates the ceiling: thin ideas cap development at ~0.65 regardless of word count
  const value = Math.min(argScore, Math.min(1, wcScore * wcW + dmScore * dmW + scScore * scW))

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
  if (analysis.details.includes('0 detail marker'))
    tips.push('Support your points with specific examples (for example, for instance, such as). Essays without concrete examples are capped at score 3.')
  const sentMatch = analysis.details.match(/(\d+) sentences/)
  if (sentMatch && parseInt(sentMatch[1]) < 5)
    tips.push('Add more sentences to fully develop each idea.')
  return tips.length > 0 ? tips : ['Develop your ideas further with concrete examples and evidence.']
}
