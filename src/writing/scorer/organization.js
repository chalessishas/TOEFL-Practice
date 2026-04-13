// Categorised by connector function — reward diversity across categories,
// not just quantity within one category (e.g. 5 contrast markers ≠ high score).
const MARKER_CATEGORIES = {
  contrast:        ['however','on the other hand','in contrast','by contrast','nevertheless','whereas','conversely','despite','although','while','on the contrary','in spite of','even though','yet','notwithstanding','that said','admittedly','granted','rather than','instead of','as opposed to'],
  addition:        ['moreover','furthermore','additionally','in addition','besides','similarly','also','what is more','likewise','in the same way','by the same token','not only','not merely','beyond that'],
  conclusion:      ['in conclusion','in summary','to summarize','to sum up','in short','overall','therefore','thus','hence','consequently','as a result','finally','it follows that','in light of this'],
  exemplification: ['for instance','for example','such as','in particular','notably','specifically','namely','to illustrate','that is','in other words','a case in point','this is evident in'],
  sequence:        ['firstly','secondly','thirdly','to begin with','first of all','subsequently','previously','then','next','meanwhile','last but not least','last','finally'],
  elaboration:     ['indeed','in fact','after all','at the same time','above all','in particular','more importantly','to be sure','it is true that'],
  // Hedging — epistemic stance markers. ETS e-rater explicitly scores hedging as a
  // dimension of academic register: proficient writers qualify claims rather than
  // asserting them baldly (Source: Research Loop 5, 2026-04-12).
  // Tier-1 hedging: basic stance markers counted for marker diversity.
  // Tier-2 (arguably, presumably, it could be argued, one might argue, etc.) are
  // handled separately by HEDGING_TIER2 for the score-5 discrimination bonus — not
  // counted here to avoid double-crediting the same token (Loop 8, 2026-04-12).
  hedging:         ['perhaps','possibly','it seems','it appears','this suggests','this may indicate','it is possible','potentially','generally speaking'],
}

// Markers classified as "inferential" or "concessive" — proficient writers use these
// more than additive markers (also/moreover/furthermore). Ratio is a quality signal.
// Source: corpus-based ESL marker analysis (Research Loop 2, 2026-04-12)
const INFERENTIAL_MARKERS = new Set(['therefore','thus','hence','consequently','as a result','for this reason','it follows that'])
const CONCESSIVE_MARKERS  = new Set(['however','nevertheless','nonetheless','although','even though','while','whereas','despite','in spite of','notwithstanding','on the other hand','conversely','yet'])
const ADDITIVE_MARKERS    = new Set(['also','moreover','furthermore','additionally','in addition','besides','what is more'])

function countMarkersAndDiversity(text) {
  const lower = text.toLowerCase()
  const found = new Set()
  const categoriesUsed = new Set()
  for (const [category, markers] of Object.entries(MARKER_CATEGORIES)) {
    for (const marker of markers) {
      if (lower.includes(marker)) {
        found.add(marker)
        categoriesUsed.add(category)
      }
    }
  }

  // Inferential+concessive vs additive ratio — proficient writers use more of
  // the former (therefore/although/nevertheless) than additive (also/moreover).
  let inferentialCount = 0
  let additiveCount    = 0
  for (const m of INFERENTIAL_MARKERS) { if (lower.includes(m)) inferentialCount++ }
  for (const m of CONCESSIVE_MARKERS)  { if (lower.includes(m)) inferentialCount++ }
  for (const m of ADDITIVE_MARKERS)    { if (lower.includes(m)) additiveCount++ }
  // Bonus: 0 if all markers are additive, up to +0.1 if inferential ≥ additive
  const totalClassified = inferentialCount + additiveCount
  const ratioBonus = totalClassified === 0 ? 0 : Math.min(0.1, (inferentialCount / totalClassified) * 0.1)

  return {
    uniqueCount: found.size,
    categoriesUsed: categoriesUsed.size,
    totalCategories: Object.keys(MARKER_CATEGORIES).length,
    ratioBonus,
  }
}

export function score(text, taskType = 'general', promptText = '') {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0)
  const sentenceCount = Math.max(sentences.length, 1)

  // Discourse marker score: 60% density + 40% functional category diversity
  // Diversity rewards essays that use contrast + addition + conclusion + example
  // rather than repeating one category (e.g. "however × 5").
  const { uniqueCount: uniqueMarkers, categoriesUsed, totalCategories, ratioBonus } = countMarkersAndDiversity(text)
  const markerDensity = uniqueMarkers / sentenceCount
  const densityScore    = Math.min(1, markerDensity / 0.15)
  const diversityScore  = categoriesUsed / totalCategories  // 0→0, 3/6→0.5, 6/6→1.0
  const markerScore     = densityScore * 0.6 + diversityScore * 0.4

  // Paragraph count score
  const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0)
  const paragraphCount = paragraphs.length
  // Short 120-word responses legitimately fit in 1 paragraph — don't penalise as heavily.
  // Old: 1→0.4, 2→0.7, 3→1.0. New: 1→0.65, 2→0.85, 3→1.0
  let paragraphScore = 0.65
  if (paragraphCount >= 2) paragraphScore = 0.85
  if (paragraphCount >= 3) paragraphScore = 1.0

  // Task-specific bonuses
  let taskSpecific = 0
  const lower = text.toLowerCase()

  if (taskType === 'email') {
    const hasGreeting = /\b(dear|hello|hi|greetings|good morning|good afternoon|good evening|to whom it may concern)\b/i.test(text)
    const hasClosing = /\b(regards|sincerely|thank|best|yours|cheers|warm|respectfully|cordially)\b/i.test(text)
    taskSpecific = (hasGreeting ? 0.5 : 0) + (hasClosing ? 0.5 : 0)
  } else if (taskType === 'discussion') {
    // ETS: genuine peer engagement = name-reference + build-on/contrast, not just bare opinion
    // Dynamically extract capitalized names from the actual prompt (forward-compatible with new prompts).
    // Fallback to a static list if no prompt provided.
    const STATIC_PEER_NAMES = ['Sarah','Mark','Liam','Maya','Alex','Priya','Emma','James','Sophie',
      'Ethan','Noah','Chloe','Hannah','Marcus','Fatima','Carlos','Amara','Ben','Isabelle','David']
    const promptNames = promptText
      ? (promptText.match(/\b[A-Z][a-z]{2,}\b/g) || [])
          .filter(n => !['The','This','These','However','While','Although','According','Furthermore'].includes(n))
      : []
    const allNames = promptNames.length > 0 ? promptNames : STATIC_PEER_NAMES
    const hasPeerName = allNames.some(n => new RegExp(`\\b${n}\\b`).test(text))
    const engagementVerb = /(makes? a (good |great |valid )?point|said|mentioned|points? out|argues?|suggests?|notes?|raises?|brought? up|identifies?|overlooks?|is (correct|right|wrong|compelling|mistaken|valid|flawed)|as \w+ (noted|mentioned|suggested|pointed out|argued|stated))/i.test(text)
    const buildOn = /\b(building on|adding to|to expand on|expanding on|I would add to|unlike|while [A-Z]|although [A-Z]|I (also )?(agree|disagree) with|responding to|taking \w+'s point|in response to)\b/i.test(text)
    const hasOpinion = /\b(i agree|i disagree|i think|in my opinion|i believe)\b/i.test(text)

    if (hasPeerName && (engagementVerb || buildOn)) taskSpecific = 1.0  // named peer + engagement
    else if (hasPeerName || (engagementVerb && buildOn)) taskSpecific = 0.7
    else if (engagementVerb || buildOn) taskSpecific = 0.5
    else if (hasOpinion) taskSpecific = 0.3
    else taskSpecific = 0.1
  } else {
    // General: reward having a clear opening and closing cue
    const hasOpener = /\b(first|to begin|in this|the purpose|this essay|one reason)\b/i.test(text)
    const hasCloser = /\b(in conclusion|to summarize|overall|in summary|therefore)\b/i.test(text)
    taskSpecific = (hasOpener ? 0.5 : 0) + (hasCloser ? 0.5 : 0)
  }

  // Closing marker placement: reward conclusion markers in last paragraph,
  // penalize them appearing in the first paragraph (structural incoherence).
  // Disabled for email — email is not an intro/body/conclusion structure.
  const CLOSING_MARKERS = ['in conclusion','to summarize','in summary','to sum up']
  let placementBonus = 0
  if (paragraphCount >= 2 && taskType !== 'email') {
    const firstPara = paragraphs[0].toLowerCase()
    const lastPara  = paragraphs[paragraphCount - 1].toLowerCase()
    if (CLOSING_MARKERS.some(m => lastPara.includes(m)))  placementBonus =  0.1
    if (CLOSING_MARKERS.some(m => firstPara.includes(m))) placementBonus = -0.1
  }

  // 3-zone structural check for discussion (intro-opinion / evidence-body / conclusion).
  // Backed by: Burstein et al. 2003 AES structural analysis; positional zone detection
  // improves org-score Pearson correlation by ~4 points (Source C/D, Research Loop 2).
  let zoneBonus = 0
  if (taskType === 'discussion' && paragraphCount >= 3) {
    const firstPara = paragraphs[0].toLowerCase()
    const lastPara  = paragraphs[paragraphCount - 1].toLowerCase()
    const bodyParas = paragraphs.slice(1, paragraphCount - 1).map(p => p.toLowerCase())

    const hasIntroOpinion = /\b(i (agree|disagree|think|believe)|in my (opinion|view)|i feel|my (view|position|stance)|it (seems|appears) to me)\b/.test(firstPara)
    const hasConclusion   = CLOSING_MARKERS.some(m => lastPara.includes(m)) || /\b(overall|therefore|in short|to wrap up)\b/.test(lastPara)
    const hasBodyEvidence = bodyParas.some(p =>
      p.length > 50 && /\b(for (example|instance)|because|since|this (shows?|means?|suggests?)|evidence|research|study|according to)\b/.test(p),
    )

    if (hasIntroOpinion) zoneBonus += 0.05
    if (hasConclusion)   zoneBonus += 0.05
    if (hasBodyEvidence) zoneBonus += 0.05
  }

  // Semi-formal email register bonus (Research Loop 7 P3).
  // ETS Score-5 emails consistently use professional opening/closing phrases beyond
  // "Dear X / Best regards" — these signal awareness of formal register conventions.
  let semiFormalBonus = 0
  if (taskType === 'email') {
    const SEMI_FORMAL = [
      /\bi am writing to\b/i,
      /\bi would (appreciate|like to|be grateful)\b/i,
      /\bplease (let me know|feel free|do not hesitate)\b/i,
      /\bi hope (this email|to hear|you are|you will)\b/i,
      /\bthank you for (your|the|considering|taking)\b/i,
      /\bi (kindly |humbly )?(request|ask|inquire)\b/i,
      /\bat your (earliest )?(convenience|opportunity)\b/i,
    ]
    const hits = SEMI_FORMAL.filter(re => re.test(lower)).length
    if (hits >= 2) semiFormalBonus = 0.08
    else if (hits === 1) semiFormalBonus = 0.04
  }

  // Epistemic hedging tier bonus (Loop 8, 2026-04-12).
  // ETS Score-5 criterion: "precise, idiomatic word choice" — tier-2 hedging (conditional-would,
  // one-might, passive evidential) distinguishes Score-5 essays from Score-4 in corpus analysis.
  // Only applies to discussion task; email uses different register conventions.
  const HEDGING_TIER2 = [
    /\bi would (argue|suggest|contend|propose|submit)\b/i,
    /\bone might (argue|consider|suggest|note|observe)\b/i,
    /\bit (could|might|may|would) be (argued|said|noted|suggested|claimed|observed)\b/i,
    /\bthis (may|might|could|would) (suggest|indicate|imply|reflect|represent)\b/i,
    /\bit is worth (noting|considering|mentioning|highlighting)\b/i,
    /\bto some extent\b/i,
    /\b(arguably|presumably|evidently)\b/i,
  ]
  const tier2Hits      = taskType === 'discussion' ? HEDGING_TIER2.filter(re => re.test(lower)).length : 0
  const hedgingTierBonus = tier2Hits >= 2 ? 0.10 : tier2Hits === 1 ? 0.06 : 0

  // Paragraph-initial discourse marker bonus (Research Loop 9, 2026-04-12).
  // Score-5 writers front-load transitions at sentence starts (Crossley 2020).
  // "However, ..." / "Furthermore, ..." at sentence start is a quality signal.
  const PARA_INIT_RE = /^(However|Furthermore|Moreover|Therefore|Consequently|Nevertheless|In contrast|By contrast|Admittedly|In addition|Additionally|On the other hand|In conclusion|Overall|As a result|Hence|Thus)\b/i
  const paraInitCount = sentences.filter(s => PARA_INIT_RE.test(s)).length
  const paraInitBonus = paraInitCount >= 3 ? 0.06 : paraInitCount >= 2 ? 0.04 : 0

  // Email tasks: structure (paragraphs + greeting/closing) dominates over academic markers.
  // Academic essays need discourse markers; emails use transactional phrasing not in our list.
  const [mW, pW, tW] = taskType === 'email' ? [0.2, 0.4, 0.4] : [0.5, 0.3, 0.2]
  const rawValue = Math.min(
    1,
    Math.max(0, markerScore * mW + paragraphScore * pW + taskSpecific * tW + placementBonus + zoneBonus + ratioBonus + semiFormalBonus + hedgingTierBonus + paraInitBonus),
  )

  // Connector misuse penalty — Granger & Tyson (1996): Chinese L1 writers use "however"
  // as a generic paragraph opener 38% of the time without a preceding contrast, vs 7% for natives.
  // Only flag paragraph-initial "however" when the preceding paragraph has no contrastive content.
  // Discussion-only (emails don't use this pattern); capped at -0.03 (1 misuse max).
  let connectorMisusePenalty = 0
  if (taskType !== 'email') {
    const paras = text.split(/\n\n+/).filter(p => p.trim().length > 20)
    for (let i = 1; i < paras.length; i++) {
      if (!/^however[,\s]/i.test(paras[i].trim())) continue
      const prevHasContrast = /\b(but|yet|although|though|despite|while|whereas|however|nevertheless|on the other hand|in contrast)\b/i.test(paras[i - 1])
      if (!prevHasContrast) { connectorMisusePenalty = 0.03; break }  // cap at 1 misuse
    }
  }
  const value = Math.max(0, rawValue - connectorMisusePenalty)

  const zonePart           = zoneBonus           > 0 ? `, zoneBonus=+${zoneBonus.toFixed(2)}`                          : ''
  const ratioPart          = ratioBonus          > 0 ? `, inferentialRatio=+${ratioBonus.toFixed(2)}`                  : ''
  const semiFormalPart     = semiFormalBonus     > 0 ? `, semiFormal=+${semiFormalBonus.toFixed(2)}`                   : ''
  const hedgingTierPart    = hedgingTierBonus    > 0 ? `, hedgingTier=+${hedgingTierBonus.toFixed(2)}`                : ''
  const paraInitPart       = paraInitBonus       > 0 ? `, paraInit=+${paraInitBonus.toFixed(2)}`                      : ''
  const connectorMisusePart = connectorMisusePenalty > 0 ? `, connectorMisuse=-${connectorMisusePenalty.toFixed(2)}`  : ''
  return {
    value,
    details: `${uniqueMarkers} unique discourse markers, ${categoriesUsed}/${totalCategories} categories, ${paragraphCount} paragraph(s), taskScore=${taskSpecific.toFixed(2)}, taskType=${taskType}${placementBonus !== 0 ? `, closingPlacement=${placementBonus > 0 ? '+' : ''}${placementBonus.toFixed(1)}` : ''}${zonePart}${ratioPart}${semiFormalPart}${hedgingTierPart}${paraInitPart}${connectorMisusePart}`,
  }
}

export function suggest(analysis) {
  if (analysis.value >= 0.8) return []
  const tips = []
  const taskTypeMatch = analysis.details.match(/taskType=(\w+)/)
  const taskType = taskTypeMatch ? taskTypeMatch[1] : 'general'

  const catMatch = analysis.details.match(/(\d+)\/(\d+) categories/)
  const categoriesUsed = catMatch ? parseInt(catMatch[1]) : 0
  const totalCategories = catMatch ? parseInt(catMatch[2]) : 7

  if (analysis.details.includes('0 unique discourse markers'))
    tips.push('Use discourse markers (however, moreover, for example, in conclusion) to connect your ideas.')
  else if (categoriesUsed < 3)
    tips.push('Vary your transition types — use contrast (however), addition (moreover), and conclusion (therefore/in conclusion) together for a higher organization score.')
  if (analysis.details.includes('1 paragraph'))
    tips.push('Divide your response into multiple paragraphs for clarity.')

  const taskScoreMatch = analysis.details.match(/taskScore=([\d.]+)/)
  const taskScoreVal = taskScoreMatch ? parseFloat(taskScoreMatch[1]) : 1.0
  if (taskScoreVal < 0.75) {
    if (taskType === 'discussion')
      tips.push('Explicitly reference a classmate\'s idea — mention what they said and build on or contrast it.')
    else if (taskType === 'email')
      tips.push('Open with a greeting (Dear..., Hello...) and close with a sign-off (Regards, Thank you, Best wishes).')
    else
      tips.push('Add an opening sentence that states your purpose and a closing sentence that wraps up your main point.')
  }
  return tips.length > 0 ? tips : ['Improve cohesion by using transition phrases between ideas.']
}
