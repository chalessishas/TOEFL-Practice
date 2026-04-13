// Casual/informal register terms that ETS penalizes in academic writing
// Words here use word-boundary regex so "cause" doesn't match "because",
// "thing" doesn't match "something/anything/everything/nothing", etc.
const CASUAL_TERMS = [
  'kinda','gonna','wanna','gotta','dunno','cuz','cause','cmon',
  'lol','btw','omg','stuff','thing','things','you know',
  'pretty much','sort of','kind of',
  // Contractions — inappropriate in formal TOEFL writing (all tasks are formal/semi-formal)
  // Using escaped apostrophe so regex matches the literal character
  "it's","isn't","aren't","wasn't","weren't","can't","couldn't",
  "shouldn't","wouldn't","don't","doesn't","didn't","won't","haven't",
  "hasn't","hadn't","i'm","i've","i'd","i'll","you're","they're",
  "we're","that's","there's","what's",
]
// Pre-build word-boundary regexes for single-word terms to avoid substring false positives
const CASUAL_TERM_REGEXES = CASUAL_TERMS.map(t => ({
  term: t,
  re: new RegExp('\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i'),
}))

// Function words excluded from repetition analysis
const FUNCTION_WORDS = new Set([
  'the','a','an','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','can','shall',
  'must','and','or','but','if','when','while','because','since','although',
  'though','for','from','to','in','on','at','by','with','about','into','through',
  'during','before','after','between','under','over','above','below','out','up',
  'down','off','as','of','this','that','these','those','it','its','he','she',
  'they','we','you','i','me','my','your','his','her','our','their','who',
  'which','what','where','how','why','here','there','then','than','very','much',
  'more','most','some','any','all','each','every','both','few','many','such',
  'own','other','another','same','also','just','still','even','now','already',
  'never','always','often','so','well','back','again','once','yet','not','no',
])

export function score(text, taskType = 'general') {
  const tokens = (text.match(/[a-zA-Z']+/g) || []).map(w => w.toLowerCase())
  if (tokens.length === 0) return { value: 0, details: 'No words found' }

  // Type-token ratio — for short essays (100-200 words), TTR is naturally higher
  // Map: ≤0.4→0.2, 0.5→0.5, 0.6→0.7, 0.7→0.85, ≥0.8→1.0
  const unique = new Set(tokens)
  const rawTtr = unique.size / tokens.length
  const ttrScore = Math.min(1, Math.max(0.2, (rawTtr - 0.3) * 1.6))

  // Sentence length variance
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0)
  let varianceScore = 0
  if (sentences.length >= 2) {
    const lengths = sentences.map(s => s.split(/\s+/).length)
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length
    const variance = lengths.reduce((sum, l) => sum + (l - mean) ** 2, 0) / lengths.length
    const stddev = Math.sqrt(variance)
    // stddev 0→0.2, 3→0.5, 6→0.8, 8+→1.0 (more lenient for short essays)
    varianceScore = Math.min(1, 0.2 + stddev / 10)
  }

  // Repetition penalty: content words >4 chars used ≥3 times
  const freq = {}
  tokens.forEach(w => {
    if (w.length > 4 && !FUNCTION_WORDS.has(w)) {
      freq[w] = (freq[w] || 0) + 1
    }
  })
  const repeatedWords = Object.values(freq).filter(count => count >= 3).length
  const repetitionPenalty = Math.min(0.3, repeatedWords * 0.05)

  // Syntactic variety — ETS rewards "variety of syntactic structures" (relative clauses, conditionals, passives, etc.)
  const COMPLEX_PATTERNS = [
    /\bwho\b|\bwhich\b|\bthat\b/,              // relative clauses
    /\bif\b|\bunless\b|\bwere to\b/,           // conditionals
    /\bis\s+\w+ed\b|\bare\s+\w+ed\b|\bwas\s+\w+ed\b|\bwere\s+\w+ed\b/, // passives
    /\bto\s+\w+\s+\w+\b/,                      // infinitive phrases (e.g. "to fully understand")
    /\balthough\b|\bdespite\b|\bwhile\b|\bwhereas\b/, // concessive clauses
    // Higher-discrimination patterns — proficient writers, not just adequate ones
    /\bwhether\b/,                             // indirect questions / embedded clauses
    /\bnot only\b/,                            // correlative conjunctions (not only...but also)
    /\bit is\b.{0,30}\bthat\b|\bit was\b.{0,30}\bthat\b/, // cleft sentences
    /\bhave\s+\w+ed\b|\bhas\s+\w+ed\b/,       // present perfect aspect
    /\bin order to\b|\bso as to\b|\bso that\b/, // purposive subordination
  ]
  const textLower = text.toLowerCase()
  const patternHits = COMPLEX_PATTERNS.filter(p => p.test(textLower)).length
  const syntacticVariety = patternHits / COMPLEX_PATTERNS.length  // 0–1

  // Mean sentence length sweet-spot bonus (Loop 9, 2026-04-12).
  // SCA research (Lu 2010): Score-5 TOEFL averages 14-20 words/sentence.
  // Too short (<10): choppy. Too long (>25): run-on risk (already caught by grammar.js).
  const meanSentLen = sentences.length > 0 ? tokens.length / sentences.length : 0
  const sentLenBonus = (meanSentLen >= 14 && meanSentLen <= 22) ? 0.04 : (meanSentLen >= 12) ? 0.02 : 0

  // Subordinating clause density bonus (Loop 9 external audit, 2026-04-12).
  // Research: ETS rubric + Biber et al. (1999) — "well-elaborated" (Score 5) is anchored to
  // subordinating conjunction density, not just presence. COMPLEX_PATTERNS checks binary
  // presence; this measures count/100w to reward genuine subordination depth.
  // Threshold: ≥3/100w → +0.04; ≥1.5/100w → +0.02 (conservative: avoids overlap penalty)
  const SUBORDINATORS_RE = /\b(although|because|since|while|whereas|when|if|unless|after|before|once|even\s+though|even\s+if|as\s+long\s+as|provided\s+that|given\s+that)\b/gi
  const subCount = (text.match(SUBORDINATORS_RE) || []).length
  const subDensity = tokens.length > 0 ? (subCount / tokens.length) * 100 : 0
  const subDensityBonus = subDensity >= 3.0 ? 0.04 : subDensity >= 1.5 ? 0.02 : 0

  // Passive overuse penalty (Granger 1998 on learner corpus: Chinese L1 overuse passives
  // as calque from bei-construction; ETS rubric: "variety of syntactic structures" penalizes
  // overuse of any single structure). Native academic: ~15-20% passive sentences.
  // Threshold: >40% — conservative, well above native academic norms (near-zero FP).
  // Note: no global flag — global regex with .test() in .filter() advances lastIndex incorrectly
  const passiveRe = /\b(is|are|was|were|been|being)\s+\w+ed\b/i
  const passiveSentences = sentences.filter(s => passiveRe.test(s)).length
  const passiveRatio = sentences.length > 0 ? passiveSentences / sentences.length : 0
  const passiveOverusePenalty = passiveRatio > 0.40 ? 0.04 : 0

  // Casual register penalty — ETS penalizes informal language in academic writing
  // Use regex with word boundaries to avoid "cause" matching "because", etc.
  const casualHits = CASUAL_TERM_REGEXES.filter(({ re }) => re.test(text)).length
  const casualPenalty = Math.min(0.3, casualHits * 0.07)

  // Weak intensifier penalty (ERIC EJ1272190: "very + common adjective" 3x more frequent in
  // Score-3/4 vs Score-5; academic writing uses "particularly/highly/substantially" + precise
  // adjectives). Threshold ≥2 avoids penalizing a single instance; targets patterns of overuse.
  const WEAK_INTENSIFIER_RE = /\bvery\s+(?:good|bad|big|small|important|interesting|difficult|easy|common|different|similar|clear|high|low|strong|weak|fast|slow|long|short|often|many|much|few|little|new|old)\b/gi
  const weakIntHits = (text.match(WEAK_INTENSIFIER_RE) || []).length
  const weakIntPenalty = weakIntHits >= 3 ? 0.04 : weakIntHits >= 2 ? 0.02 : 0

  // Nominalization density (Kyle 2018 on TOEFL data: CN/T explains 18.9% of score variance).
  // Proxy: count long words with academic nominalization suffixes per 100 tokens.
  // Length filter (≥7 chars) excludes noise like "city" (-ity) and "moment" (-ment).
  // Score-5 TOEFL: ~8–15 nominalizations/100w; Score-2: ~2–4/100w.
  const NOMINALIZATION_RE = /\b\w{7,}(tion|ment|ness|ity|ance|ence|ism)\b/gi
  const nomCount = (text.match(NOMINALIZATION_RE) || []).length
  const nomDensity = tokens.length > 0 ? (nomCount / tokens.length) * 100 : 0
  // Map density to 0–0.15 bonus (additive, safe to add without recalibrating)
  let nomBonus = 0
  if (nomDensity >= 12) nomBonus = 0.15
  else if (nomDensity >= 8)  nomBonus = 0.10
  else if (nomDensity >= 5)  nomBonus = 0.05

  // Email register consistency bonus (Chen 2019: formal register consistency is a
  // Score-5 differentiator in email tasks; Chinese L1 writers frequently mix registers).
  // Rewards emails that use both a formal opener phrase and a formal closing phrase.
  let emailRegisterBonus = 0
  if (taskType === 'email') {
    const hasFormalOpener = /\b(I am writing to|I would like to|I am pleased to|I hope this|Please find|With regard to|Regarding|I am contacting)\b/i.test(text)
    const hasFormalClosing = /\b(I look forward to|please do not hesitate|Thank you for your|I would appreciate|I await your|Best regards|Sincerely|Yours faithfully|Yours truly)\b/i.test(text)
    emailRegisterBonus = (hasFormalOpener && hasFormalClosing) ? 0.04 : (hasFormalOpener || hasFormalClosing) ? 0.02 : 0
  }

  // Wordy phrase penalty (Williams 2014 "Style: Clarity and Grace"; ETS Score-4 rubric:
  // "occasional redundancy" is a Score-4 marker). Phrases universally replaceable with
  // shorter equivalents — no meaning loss. "in order to" excluded (formal purposive clause).
  const WORDY_PHRASES = [
    /\bdue to the fact that\b/i,
    /\bin spite of the fact that\b/i,
    /\bfor the reason that\b/i,
    /\bat this point in time\b/i,
    /\bin the event that\b/i,
    /\bthe reason (?:why|is) because\b/i,
    /\bhas the ability to\b/i,
  ]
  const wordyHits = WORDY_PHRASES.filter(re => re.test(text)).length
  const wordyPhrasePenalty = wordyHits >= 2 ? 0.04 : wordyHits === 1 ? 0.02 : 0

  // Formulaic 4-gram repetition penalty (arxiv:2504.08537, April 2025: lexical bundle
  // diversity predicts AES score; repeating the same 4-gram 3+ times signals rote production
  // rather than genuine language command). Requires ≥40 content words to avoid penalizing
  // short emails. Native writers virtually never hit this threshold in 120-200 word essays.
  let formulaicPenalty = 0
  if (tokens.length >= 40) {
    const fourgramCounts = new Map()
    for (let i = 0; i <= tokens.length - 4; i++) {
      const gram = tokens.slice(i, i + 4).join(' ')
      fourgramCounts.set(gram, (fourgramCounts.get(gram) || 0) + 1)
    }
    const repeatedGrams = [...fourgramCounts.values()].filter(c => c >= 3).length
    formulaicPenalty = repeatedGrams >= 2 ? 0.04 : repeatedGrams === 1 ? 0.02 : 0
  }

  const ttr = rawTtr // keep raw for display
  const value = Math.max(0, Math.min(1, ttrScore * 0.35 + varianceScore * 0.35 + syntacticVariety * 0.1 + 0.2 - repetitionPenalty - casualPenalty - passiveOverusePenalty - wordyPhrasePenalty - formulaicPenalty - weakIntPenalty + nomBonus + sentLenBonus + subDensityBonus + emailRegisterBonus))

  return {
    value,
    details: `TTR: ${ttr.toFixed(2)}, sentence variance: ${varianceScore.toFixed(2)}, syntactic variety: ${patternHits}/${COMPLEX_PATTERNS.length}, ${repeatedWords} repeated word(s)${casualHits > 0 ? `, ${casualHits} informal term(s)` : ''}, nom density: ${nomDensity.toFixed(1)}/100w, mean sent len: ${meanSentLen.toFixed(1)}, sub density: ${subDensity.toFixed(1)}/100w${passiveRatio > 0.40 ? `, passive overuse: ${(passiveRatio * 100).toFixed(0)}%` : ''}${wordyHits > 0 ? `, wordy phrases: ${wordyHits}` : ''}${formulaicPenalty > 0 ? `, formulaic repetition` : ''}${weakIntHits >= 2 ? `, weak intensifiers: ${weakIntHits}` : ''}${emailRegisterBonus > 0 ? `, email register: +${emailRegisterBonus.toFixed(2)}` : ''}`,
  }
}

export function suggest(analysis) {
  if (analysis.value >= 0.75) return []
  const tips = []
  const ttrMatch = analysis.details.match(/TTR: ([\d.]+)/)
  if (ttrMatch && parseFloat(ttrMatch[1]) < 0.6)
    tips.push('Avoid repeating the same words — use synonyms to add variety.')
  const varMatch = analysis.details.match(/sentence(?: length)? variance: ([\d.]+)/)
  if (varMatch && parseFloat(varMatch[1]) < 0.3)
    tips.push('Vary your sentence lengths — mix short punchy sentences with longer detailed ones.')
  const repMatch = analysis.details.match(/(\d+) repeated word/)
  if (repMatch && parseInt(repMatch[1]) > 2)
    tips.push('You are overusing certain words — find synonyms or restructure your sentences.')
  const synMatch = analysis.details.match(/syntactic variety: (\d+)\/(\d+)/)
  if (synMatch && parseInt(synMatch[1]) / parseInt(synMatch[2]) < 0.5)
    tips.push('Use more complex sentence structures: relative clauses (who/which), conditionals (if/unless), or passive constructions to add syntactic variety.')
  if (analysis.details.includes('informal term'))
    tips.push('Write in formal register: avoid contractions (it\'s → it is, can\'t → cannot) and informal words (kinda, gonna, stuff) — TOEFL writing is always formal.')
  const nomMatch = analysis.details.match(/nom density: ([\d.]+)\/100w/)
  if (nomMatch && parseFloat(nomMatch[1]) < 5)
    tips.push('Use more academic nouns: instead of "the government decided to help", try "the government\'s decision to provide assistance". Nominalized forms (improvement, evidence, achievement) raise your style score.')
  return tips.length > 0 ? tips : ['Improve your writing style by using varied vocabulary and sentence structures.']
}
