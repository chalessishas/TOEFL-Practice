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

// Stopwords for token-overlap calculation (circular reasoning detection)
const OVERLAP_STOPWORDS = new Set([
  'the','a','an','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','can','and',
  'or','but','if','when','while','because','for','from','to','in','on','at',
  'by','with','about','into','as','of','this','that','these','those','it',
  'he','she','they','we','you','i','my','your','his','her','our','their',
  'not','no','very','more','most','some','any','all','each','also','just',
  'so','too','then','than','there','here','which','what','who',
])

// Evidence signals for per-paragraph completeness check (Stab & Gurevych 2017 baseline).
// Simpler than DETAIL_MARKERS — just the cleanest premise signals.
const EVIDENCE_SIGNALS = [
  'because','since','for example','for instance','such as',
  'therefore','thus','consequently','as a result',
  'research shows','studies show','data shows','according to',
  'evidence','example','instance','case','fact','show','suggest',
  '%','percent','million','billion','thousand',
]

// Reason/elaboration markers — signals the essay has developed supporting points
const REASON_MARKERS = [
  'one reason','another reason','first','second','third','firstly','secondly',
  'thirdly','furthermore','moreover','in addition','additionally',
  'however','but','on the other hand','in contrast','by contrast','whereas','although',
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
  // Circular reasoning: intra-paragraph token overlap proxy (P3)
  const circPenalty = circularReasoningPenalty(text, wordCount, taskType)
  // Adjacent-sentence local cohesion: high avg overlap = shallow paraphrasing (TAACO)
  const cohesionPenalty = localCohesionPenalty(text, wordCount, taskType)

  // Full score: has thesis + ≥2 examples/details + ≥2 reason markers
  // Thin essay penalty: long but ≤1 example marker and ≤1 reason marker
  let base
  if (taskType === 'discussion' && hasThesis) {
    // Discussion: stating a position is primary, but concrete examples are required for full credit.
    // ETS rubric: Score-5 = "well-elaborated"; Score-3 = "may not be well-developed" (thin/vague).
    // detailCount=0 means no "for example/such as/research shows/%" — connector-only essays
    // that look well-organised but lack specifics should be capped, not rewarded.
    if (detailCount === 0 && reasonCount === 0) base = 0.60
    else if (detailCount === 0) base = 0.75  // connectors only, no concrete evidence → cap
    else base = 1.0
  } else if (!hasThesis && detailCount <= 1 && reasonCount <= 1) {
    base = 0.35
  } else if (detailCount === 0 && reasonCount <= 1) {
    base = 0.5
  } else if (detailCount <= 1 && reasonCount <= 1) {
    base = 0.65
  } else {
    base = 1.0
  }
  return Math.max(0, base - repetitionPenalty - circPenalty - cohesionPenalty)
}

// P3 — Circular reasoning penalty (Research Loop 6).
// Detects intra-paragraph repetition: if two sentences in the same paragraph
// share >60% of their non-stopword content tokens, it's likely the writer is
// restating the claim rather than developing it (Stab & Gurevych 2017 proxy).
// Returns 0–0.15 penalty. Only applies to discussion essays ≥120 words.
function circularReasoningPenalty(text, wordCount, taskType) {
  if (taskType === 'email' || wordCount < 120) return 0

  const paragraphs = text.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 30)
  let maxOverlap = 0

  for (const para of paragraphs) {
    const sentences = para.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10)
    if (sentences.length < 2) continue

    // Extract content tokens for each sentence
    const tokenSets = sentences.map(s =>
      new Set(
        (s.match(/[a-zA-Z']+/g) || [])
          .map(w => w.toLowerCase())
          .filter(w => w.length >= 4 && !OVERLAP_STOPWORDS.has(w))
      )
    )

    // Compare each pair of sentences within this paragraph
    for (let i = 0; i < tokenSets.length - 1; i++) {
      for (let j = i + 1; j < tokenSets.length; j++) {
        const a = tokenSets[i], b = tokenSets[j]
        if (a.size === 0 || b.size === 0) continue
        const shared = [...a].filter(t => b.has(t)).length
        const overlap = shared / Math.min(a.size, b.size)
        if (overlap > maxOverlap) maxOverlap = overlap
      }
    }
  }

  // >80% overlap = very likely repetition; 60-80% = suspicious
  if (maxOverlap > 0.80) return 0.15
  if (maxOverlap > 0.60) return 0.08
  return 0
}

// Adjacent-sentence local cohesion penalty (TAACO / Crossley et al. 2016).
// For Academic Discussion, high sentence-to-sentence content-word overlap
// correlates NEGATIVELY with score — it signals shallow paraphrasing rather
// than development. Essay-wide adjacent-sentence overlap > threshold = penalty.
// Email skipped; only applies to essays ≥80 words.
function localCohesionPenalty(text, wordCount, taskType) {
  if (taskType === 'email' || taskType !== 'discussion' || wordCount < 80) return 0

  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10)
  if (sentences.length < 3) return 0

  const tokenSets = sentences.map(s =>
    new Set(
      (s.match(/[a-zA-Z']+/g) || [])
        .map(w => w.toLowerCase())
        .filter(w => w.length >= 4 && !OVERLAP_STOPWORDS.has(w))
    )
  )

  // Average overlap between consecutive sentence pairs
  let totalOverlap = 0
  let pairs = 0
  for (let i = 0; i < tokenSets.length - 1; i++) {
    const a = tokenSets[i], b = tokenSets[i + 1]
    if (a.size === 0 || b.size === 0) continue
    const shared = [...a].filter(t => b.has(t)).length
    totalOverlap += shared / Math.min(a.size, b.size)
    pairs++
  }
  if (pairs === 0) return 0
  const avgOverlap = totalOverlap / pairs

  // Penalty only kicks in for clearly repetitive patterns (avg overlap > 0.35)
  // — below this threshold, adjacent sentences naturally share topic vocabulary
  if (avgOverlap > 0.55) return 0.12
  if (avgOverlap > 0.40) return 0.07
  if (avgOverlap > 0.30) return 0.03
  return 0
}

// P4 — Numeric/named-entity evidence bonus (Research Loop 6).
// Concrete statistics, percentages, and years signal the writer is using
// real-world evidence rather than vague claims. Named entities (proper nouns
// in non-sentence-initial position) are a proxy for specific references.
// Returns 0–0.08 additive bonus. Email skipped.
function numericEvidenceBonus(text, taskType) {
  if (taskType === 'email') return 0

  // Numeric evidence: percentages, large numbers, years (1900–2099)
  const percentages = (text.match(/\d+(\.\d+)?%/g) || []).length
  const years = (text.match(/\b(19|20)\d{2}\b/g) || []).length
  const bigNumbers = (text.match(/\b\d{1,3}(,\d{3})+|\b\d{4,}\b/g) || []).length

  // Named entity proxy: capitalized words not at sentence start
  // Matches a capitalized word preceded by a lowercase word (not sentence-initial)
  const namedEntityMatches = (text.match(/[a-z]\s+[A-Z][a-z]{2,}/g) || []).length

  const numericSignals = percentages + years + bigNumbers
  const entitySignals = Math.min(2, namedEntityMatches) // cap to avoid noise

  if (numericSignals >= 2 || (numericSignals >= 1 && entitySignals >= 1)) return 0.08
  if (numericSignals >= 1 || entitySignals >= 2) return 0.04
  return 0
}

// Per-paragraph completeness bonus (Research Loop 6, P2).
// Rewards essays where EACH body paragraph has at least one evidence signal,
// vs. essays that front-load all evidence in one paragraph.
// Returns 0–0.10 additive bonus; does not penalize — safe to add without recalibrating.
function paragraphCompletenessBonus(text, taskType) {
  // Email: transactional structure, skip
  if (taskType === 'email') return 0

  // Split into paragraphs — double newline first, fall back to single
  let paragraphs = text.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 20)
  if (paragraphs.length <= 1) {
    paragraphs = text.split(/\n/).map(p => p.trim()).filter(p => p.length > 20)
  }
  // Need at least 2 paragraphs for the check to be meaningful
  if (paragraphs.length < 2) return 0

  // Skip intro/conclusion (first and last) — they often lack explicit evidence
  const bodyParagraphs = paragraphs.length > 2 ? paragraphs.slice(1, -1) : paragraphs

  const coveredCount = bodyParagraphs.filter(para => {
    const lower = para.toLowerCase()
    return EVIDENCE_SIGNALS.some(sig => lower.includes(sig))
  }).length

  const coverageRatio = coveredCount / bodyParagraphs.length
  // Full bonus if all body paragraphs have evidence; partial if most do
  if (coverageRatio >= 1.0) return 0.10
  if (coverageRatio >= 0.5) return 0.05
  return 0
}

// Counter-argument rebuttal bonus (AESPA 2025 — essays with concessive rebuttal pattern
// score 0.30–0.50 pts higher; ETS Score-5 rubric explicitly: "acknowledges and responds to
// opposing views"). Two-step detection: concession in sentence N + rebuttal marker in N+1.
// Email skipped (transactional structure, no argumentation expected).
function counterArgumentBonus(text, taskType) {
  if (taskType === 'email') return 0

  const CONCESSION_RE = /\b(admittedly|granted|one might argue|one could argue|some argue|some might say|it could be argued|critics argue|opponents argue|while some)\b/i
  const REBUTTAL_RE = /\b(however|but|yet|nevertheless|nonetheless|still|despite this|even so|that said|in spite of|regardless)\b/i

  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 8)
  for (let i = 0; i < sentences.length - 1; i++) {
    if (!CONCESSION_RE.test(sentences[i])) continue
    const window = sentences[i] + ' ' + (sentences[i + 1] || '')
    if (REBUTTAL_RE.test(window)) return 0.05
  }
  return 0
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
  const paraBonus    = paragraphCompletenessBonus(text, taskType)
  const numBonus     = numericEvidenceBonus(text, taskType)
  const rebuttalBonus = counterArgumentBonus(text, taskType)
  const value = Math.min(argScore, Math.min(1, wcScore * wcW + dmScore * dmW + scScore * scW + paraBonus + numBonus + rebuttalBonus))

  return {
    value,
    details: `${wordCount} words, ${sentenceCount} sentences, ${
      DETAIL_MARKERS.filter(m => text.toLowerCase().includes(m)).length
    } detail marker(s), para bonus: ${paraBonus.toFixed(2)}, num bonus: ${numBonus.toFixed(2)}, rebuttal bonus: ${rebuttalBonus.toFixed(2)}`,
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
  // P2: per-paragraph completeness — tip if bonus is 0 and essay is multi-sentence
  const paraMatch = analysis.details.match(/para bonus: ([\d.]+)/)
  if (paraMatch && parseFloat(paraMatch[1]) === 0 && sentMatch && parseInt(sentMatch[1]) >= 5)
    tips.push('Distribute your evidence across all body paragraphs — each paragraph should include at least one supporting example, reason, or piece of data.')
  // P4: numeric evidence — tip if no bonus and essay is substantial
  const numMatch = analysis.details.match(/num bonus: ([\d.]+)/)
  if (numMatch && parseFloat(numMatch[1]) === 0 && wordMatch && parseInt(wordMatch[1]) >= 80)
    tips.push('Strengthen your arguments with specific data: statistics, percentages, years, or named studies add credibility and raise your development score.')
  return tips.length > 0 ? tips : ['Develop your ideas further with concrete examples and evidence.']
}
