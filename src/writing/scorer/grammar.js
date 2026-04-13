const CONJUNCTIONS = new Set([
  'and','but','or','so','because','since','although','though','when','while',
  'if','after','before','unless','until','whereas','as','once','whenever',
  'wherever','whether','that','which','who','whom','where','why','how',
])

// Module-level constants to avoid re-instantiation on every score() call
const SPLICE_SAFE_WORDS = new Set([
  'however', 'moreover', 'furthermore', 'additionally', 'nevertheless',
  'therefore', 'consequently', 'meanwhile', 'otherwise', 'instead',
  'unfortunately', 'fortunately', 'similarly', 'alternatively',
  'specifically', 'honestly', 'personally', 'apparently', 'obviously',
  'clearly', 'indeed', 'certainly', 'naturally', 'surprisingly',
  'interestingly', 'importantly', 'ideally', 'typically', 'generally',
  'and', 'but', 'so', 'or', 'nor', 'yet', 'for',
  'if', 'when', 'while', 'because', 'since', 'although', 'though',
  'unless', 'until', 'after', 'before', 'where', 'whereas',
  'forward', 'overall', 'finally', 'personally', 'frankly',
])
const SPLICE_SAFE_PHRASES = [
  'moving forward', 'looking ahead', 'in addition', 'on the other hand',
  'in contrast', 'as a result', 'in conclusion', 'to summarize',
  'in summary', 'for example', 'in particular', 'in fact',
  'of course', 'after all', 'at the same time', 'on the whole',
  'in general', 'to be honest', 'to be fair', 'in my opinion',
  'in other words', 'that said', 'having said that',
]
// Clause openers — if a sentence begins with one of these, the pattern
// "Dep/Prep clause, I/he/..." is valid grammar, NOT a comma splice.
// Includes subordinating conjunctions + common preposition phrase openers.
const CLAUSE_OPENERS = new Set([
  'while','although','though','even though','whereas','when','whenever',
  'since','because','if','unless','until','after','before','as',
  'once','wherever','whether','provided','given','assuming',
  // Prepositional phrase openers common in formal writing
  'during','despite','unlike','upon','regarding','throughout',
  'within','considering','following','concerning','beyond',
  // Past participle / absolute phrase openers
  'done','given','placed','viewed','seen','taken','compared','used',
])

export function score(text) {
  // Split on . ! ? and also ; — semicolons end independent clauses and must not
  // carry over into comma-splice checks (e.g. "X; done as Y, it is Z" → two clauses)
  const sentences = text.split(/[.!?;]+/).map(s => s.trim()).filter(s => s.length > 0)
  if (sentences.length === 0) return { value: 0, details: 'No sentences found', errors: [] }

  const errors = []

  // Fragment detection: flag only if < 3 words AND missing a verb-like word
  // Real e-rater uses NLP parsing; we approximate by checking for common verb patterns
  const verbPattern = /\b(is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|can|shall|must|go|get|make|take|give|come|see|know|think|say|use|find|want|tell|ask|work|seem|feel|try|leave|call|need|become|keep|let|begin|show|hear|play|run|move|live|believe|hold|bring|happen|write|provide|sit|stand|lose|pay|meet|include|continue|set|learn|change|lead|understand|watch|follow|stop|create|speak|read|allow|add|spend|grow|open|walk|win|offer|remember|love|consider|appear|buy|wait|serve|die|send|expect|build|stay|fall|cut|reach|kill|remain|suggest|raise|pass|sell|require|report|decide|pull|develop|mean)\b/i
  // Email salutations and closings are legitimately short and not fragments
  const salutationPattern = /^(dear|hello|hi|hey|greetings|sincerely|regards|best|yours|cheers|thank you|thanks)\b/i
  sentences.forEach((s, i) => {
    const words = s.split(/\s+/)
    if (words.length < 3 && !verbPattern.test(s) && !salutationPattern.test(s.trim())) {
      errors.push(`Possible fragment (sentence ${i + 1}): "${s.substring(0, 40)}"`)
    }
  })

  // Run-on detection: > 50 words AND no semicolons AND no subordinating/coordinating conjunctions
  // Real e-rater rarely triggers this (73% of students get zero penalty)
  sentences.forEach((s, i) => {
    const words = s.split(/\s+/)
    if (words.length > 50 && !s.includes(';')) {
      const hasConjunction = words.some(w => CONJUNCTIONS.has(w.toLowerCase()))
      if (!hasConjunction) {
        errors.push(`Possible run-on sentence (sentence ${i + 1}): ${words.length} words`)
      }
    }
  })

  // Comma splice detection — iterate sentences (not lines) so that
  // "While X, I believe Y" and "If X, I would Y" are correctly skipped even
  // when the entire paragraph is a single line (common in email samples).
  sentences.forEach(sentence => {
    // Skip sentences beginning with a subordinating conjunction or prepositional
    // opener — "Dep/Prep clause, Main clause" is valid comma usage.
    const firstWord = sentence.trim().split(/\s+/)[0]?.toLowerCase() ?? ''
    if (CLAUSE_OPENERS.has(firstWord)) return

    // [^\S\n]+ matches horizontal whitespace only — prevents matching across paragraph breaks
    const commaSpliceRegex = /,[^\S\n]+(I|he|she|they|we|it)\s+\w+/gi
    let csMatch
    while ((csMatch = commaSpliceRegex.exec(sentence)) !== null) {
      const pos = csMatch.index
      const before = sentence.substring(0, pos).toLowerCase()
      const lastWordMatch = before.match(/(\w+)\s*$/)
      const lastWord = lastWordMatch ? lastWordMatch[1] : ''
      const hasPhrase = SPLICE_SAFE_PHRASES.some(p => before.includes(p))
      if (!SPLICE_SAFE_WORDS.has(lastWord) && !hasPhrase) {
        errors.push(`Possible comma splice: "${csMatch[0].trim()}"`)
      }
    }
  })

  // Double negatives — match within each sentence, not across the whole text
  // Real e-rater: 99.6% of students get zero penalty (extremely rare trigger)
  // Max 20-char span prevents false positives when "not" and "no" appear in
  // separate clauses of a long sentence (e.g. "not the same as X, and ... no Y")
  const doubleNegPatterns = [
    /\bnot\b.{0,20}\bno\b/i,
    /\bnever\b.{0,20}\bno\b/i,
    /\bdon't\b.{0,20}\bnothing\b/i,
    /\bcan't\b.{0,20}\bnone\b/i,
  ]
  sentences.forEach((s, i) => {
    for (const p of doubleNegPatterns) {
      if (p.test(s)) {
        errors.push(`Possible double negative in sentence ${i + 1}`)
        break
      }
    }
  })

  // Article misuse (a vs an) — #2 ESL error type in e-rater.
  // Only flag the high-precision case: "a" before a vowel-sounding word.
  // Exclude words that start with a vowel letter but have a consonant sound (/j/ or /w/):
  //   uni*, eu*, use/user/usual/utility, one/once/only, hour (silent h → valid "an hour")
  const articlePattern = /\ba\s+([aeiou]\w*)/gi
  // Words starting with vowel letter but /j/ or /w/ sound — "a" is correct before these
  const jawSound = /^(uni|eu|use|user|usual|usua|utili|one\b|once\b|onc)/i
  let artMatch
  while ((artMatch = articlePattern.exec(text)) !== null) {
    const word = artMatch[1]
    if (!jawSound.test(word)) {
      errors.push(`Possible article error: "a ${word.substring(0, 15)}" — should be "an" before a vowel sound`)
    }
  }

  // Preposition collocation errors — #3 ESL error type (Source L4-2: Cambridge/SSLA 2016)
  // Only anchor to specific verb+preposition pairs with ~80% precision to keep false positives low.
  // "discuss about" is included as it's uniquely diagnostic — "discuss" is a transitive verb.
  const PREP_ERRORS = [
    { re: /\bdepend\s+of\b/i,       msg: 'Preposition error: "depend of" → "depend on"' },
    { re: /\binterested\s+on\b/i,   msg: 'Preposition error: "interested on" → "interested in"' },
    { re: /\bresponsible\s+of\b/i,  msg: 'Preposition error: "responsible of" → "responsible for"' },
    { re: /\bsuffer\s+of\b/i,       msg: 'Preposition error: "suffer of" → "suffer from"' },
    { re: /\bconsist\s+on\b/i,      msg: 'Preposition error: "consist on" → "consist of"' },
    { re: /\bparticipate\s+on\b/i,  msg: 'Preposition error: "participate on" → "participate in"' },
    { re: /\bagree\s+of\b/i,        msg: 'Preposition error: "agree of" → "agree with" or "agree on"' },
    { re: /\bdiscuss\s+about\b/i,   msg: 'Preposition error: "discuss about" → "discuss" (takes direct object, no preposition)' },
  ]
  PREP_ERRORS.forEach(({ re, msg }) => {
    if (re.test(text)) errors.push(msg)
  })

  // Double conjunction errors — Chinese L1 transfer: Mandarin uses paired conjunctions
  // (虽然...但是, 因为...所以) where English uses only one. Near-zero false positive on
  // native academic text — this construction is syntactically prohibited in standard English.
  const DOUBLE_CONJ = [
    { re: /\b(although|though|even though)\b[^.!?]{5,},\s*(but|yet)\b/i,
      msg: 'Double conjunction: use "although X, Y" OR "X, but Y" — not both conjunctions together' },
    { re: /\b(because|since)\b[^.!?]{5,},\s*(so|therefore|thus|hence)\b/i,
      msg: 'Double conjunction: use "because X, Y" OR "X, so Y" — not both conjunctions together' },
  ]
  DOUBLE_CONJ.forEach(({ re, msg }) => {
    if (re.test(text)) errors.push(msg)
  })

  // Copula omission — Chinese L1 transfer: 他很高 (he very tall) → *"He very intelligent."
  // In Mandarin, predicate adjectives function as verbs; no copula needed.
  // Restrict to he/she subjects + strong degree adverbs to keep false-positive rate ~0%.
  // "She is very tall" won't match because "is" breaks the subject→adverb adjacency.
  const copulaRe = /\b(he|she)\s+(very|so|too|extremely)\s+([a-z]{3,})\b/gi
  let copulaMatch
  while ((copulaMatch = copulaRe.exec(text)) !== null) {
    errors.push(`Possible missing copula: "${copulaMatch[0].trim()}" — likely missing "is/was" (e.g., "${copulaMatch[1]} is ${copulaMatch[2]} ${copulaMatch[3]}")`)
  }

  // Quantifier + bare noun — Chinese L1 transfer: Mandarin has no plural morpheme,
  // so learners omit -s after quantifiers ("many student", "several factor").
  // Whitelist of common TOEFL countable nouns keeps false-positive rate near zero.
  const QUANT_BARE_RE = /\b(many|several|few|various|multiple|numerous)\s+(student|teacher|factor|reason|problem|benefit|challenge|method|approach|issue|aspect|argument|point|result|effect|example|solution|strategy)\b/gi
  let qbMatch
  while ((qbMatch = QUANT_BARE_RE.exec(text)) !== null) {
    const [, quant, noun] = qbMatch
    const plural = noun.endsWith('y') ? noun.slice(0, -1) + 'ies'
      : /[sxz]$|[cs]h$/.test(noun) ? noun + 'es'
      : noun + 's'
    errors.push(`Plural error: "${quant} ${noun}" → "${quant} ${plural}"`)
  }

  // Count quantifier + uncountable noun — companion to QUANT_BARE_RE above.
  // "many research", "several evidence", "few information" are wrong because these nouns
  // are mass/uncountable and require different quantifiers (much/some/a great deal of).
  // Exclude "few" to avoid "a few more research papers"; exclude attributive use via
  // negative lookahead — "several research papers" is fine, "several research is" is not.
  // "pollution" removed: too often attributive ("pollution levels/problems").
  const QUANT_UNCOUNTABLE_RE = /\b(many|several|numerous)\s+(evidence|information|knowledge|advice|feedback|progress|education|equipment|unemployment|violence|research)\s+(?!paper|article|study|studies|method|question|finding|topic|area|center|institute|project|group)/gi
  let quMatch
  while ((quMatch = QUANT_UNCOUNTABLE_RE.exec(text)) !== null) {
    const noun = quMatch[2], quant = quMatch[1]
    errors.push(`Quantifier error: "${quant} ${noun}" — "${noun}" is uncountable; use "much/some/a great deal of ${noun}"`)
  }

  // SVA (subject-verb agreement) — #1 penalized feature for ESL writers in e-rater
  // High-precision patterns: the erroneous form is structurally distinctive enough
  // that false positives are very rare in normal academic prose.
  const SVA_PATTERNS = [
    { re: /\b(everyone|everybody|someone|somebody|anyone|anybody|no one|nobody)\s+(are|were|have|do)\b/i,
      msg: 'SVA: indefinite pronouns (everyone, nobody, etc.) take singular verbs (is/was/has/does)' },
    { re: /\bthe\s+number\s+of\s+\w+\s+are\b/i,
      msg: 'SVA: "the number of [noun]" takes a singular verb ("is")' },
    { re: /\beach\s+(?:of\s+(?:the|these|those)\s+)?\w+\s+(are|were|have)\b/i,
      msg: 'SVA: "each" takes a singular verb (is/was/has)' },
    { re: /\b(the\s+)?(information|advice|news|knowledge|furniture|equipment|progress)\s+are\b/i,
      msg: 'SVA: uncountable noun takes a singular verb ("is")' },
    // Third-person pronoun agreement — almost zero false positives
    { re: /\b(he|she|it)\s+have\b/i,
      msg: 'SVA: "he/she/it" takes "has" not "have"' },
    { re: /\b(he|she|it)\s+are\b/i,
      msg: 'SVA: "he/she/it" takes "is" not "are"' },
    { re: /\b(you|we|they)\s+was\b/i,
      msg: 'SVA: "you/we/they" takes "were" not "was"' },
  ]
  SVA_PATTERNS.forEach(({ re, msg }) => {
    if (re.test(text)) errors.push(msg)
  })

  // Weighted error count: run-ons are 3x more diagnostic than fragments/double-negatives
  // (ETS research: run-ons are pervasive in ESL writing; double-negatives trigger <0.4% of essays)
  const runOnCount = errors.filter(e => e.includes('run-on')).length
  const otherCount = errors.length - runOnCount
  const weightedErrors = runOnCount * 3 + otherCount
  const totalWords = text.split(/\s+/).filter(w => w.length > 0).length || 1
  const value = Math.max(0, Math.min(1, 1 - weightedErrors / totalWords))
  return { value, details: `${errors.length} issue(s) in ${sentences.length} sentences`, errors }
}

export function suggest(analysis) {
  if (analysis.value >= 0.9) return []
  const tips = []
  if (analysis.errors.some(e => e.includes('fragment')))
    tips.push('Ensure each sentence has a subject and verb.')
  if (analysis.errors.some(e => e.includes('run-on')))
    tips.push('Break long sentences into shorter ones using periods or semicolons.')
  if (analysis.errors.some(e => e.includes('comma splice')))
    tips.push('Use a conjunction (and, but, so) or period instead of a comma between independent clauses.')
  if (analysis.errors.some(e => e.includes('double negative')))
    tips.push('Avoid using two negatives in the same clause.')
  if (analysis.errors.some(e => e.includes('SVA')))
    tips.push('Check subject-verb agreement: "everyone/nobody/each" takes a singular verb, and uncountable nouns (information, advice, news) always use "is" not "are".')
  if (analysis.errors.some(e => e.includes('article error')))
    tips.push('Use "an" before words that begin with a vowel sound (an important point, an example, an idea).')
  if (analysis.errors.some(e => e.includes('Preposition error'))) {
    const prepErrs = analysis.errors.filter(e => e.includes('Preposition error'))
    tips.push(prepErrs[0].replace('Preposition error: ', ''))
  }
  if (analysis.errors.some(e => e.includes('Double conjunction')))
    tips.push('Avoid using two conjunctions for one relationship: use "although X, Y" OR "X, but Y" — never both. Same for "because/so" — pick one.')
  if (analysis.errors.some(e => e.includes('missing copula')))
    tips.push('Add a linking verb: "He is very tall" not "He very tall". English adjective predicates require "is/was/are/were".')
  if (analysis.errors.some(e => e.includes('Plural error')))
    tips.push('Add plural -s after quantifiers: "many students" not "many student". English countable nouns need plural marking.')
  if (analysis.errors.some(e => e.includes('Quantifier error')))
    tips.push('Use "much/some/a great deal of" with uncountable nouns: "much research" not "many research", "some evidence" not "several evidence".')
  return tips.length > 0 ? tips : ['Review your sentence structure for grammatical accuracy.']
}
