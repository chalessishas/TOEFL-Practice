// Categorised by connector function — reward diversity across categories,
// not just quantity within one category (e.g. 5 contrast markers ≠ high score).
const MARKER_CATEGORIES = {
  contrast:        ['however','on the other hand','in contrast','by contrast','nevertheless','whereas','despite','although','while','on the contrary'],
  addition:        ['moreover','furthermore','additionally','in addition','besides','similarly'],
  conclusion:      ['in conclusion','in summary','to summarize','overall','therefore','consequently','as a result','finally'],
  exemplification: ['for instance','for example','such as','in particular','notably','specifically','that is','in other words'],
  sequence:        ['firstly','secondly','to begin with','first of all','meanwhile','last but not least'],
  elaboration:     ['indeed','in fact','after all','at the same time','above all'],
}

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
  return {
    uniqueCount: found.size,
    categoriesUsed: categoriesUsed.size,
    totalCategories: Object.keys(MARKER_CATEGORIES).length,
  }
}

export function score(text, taskType = 'general') {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0)
  const sentenceCount = Math.max(sentences.length, 1)

  // Discourse marker score: 60% density + 40% functional category diversity
  // Diversity rewards essays that use contrast + addition + conclusion + example
  // rather than repeating one category (e.g. "however × 5").
  const { uniqueCount: uniqueMarkers, categoriesUsed, totalCategories } = countMarkersAndDiversity(text)
  const markerDensity = uniqueMarkers / sentenceCount
  const densityScore    = Math.min(1, markerDensity / 0.15)
  const diversityScore  = categoriesUsed / totalCategories  // 0→0, 3/6→0.5, 6/6→1.0
  const markerScore     = densityScore * 0.6 + diversityScore * 0.4

  // Paragraph count score
  const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0)
  const paragraphCount = paragraphs.length
  let paragraphScore = 0.4
  if (paragraphCount >= 2) paragraphScore = 0.7
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
    const PEER_NAMES = /\b(Sarah|Mark|Liam|Maya|Alex|Priya|Emma|James|Sophie|Ethan|Noah|Chloe|Hannah|Marcus|Fatima|Carlos|Amara|Ben|Isabelle|David)\b/
    const hasPeerName = PEER_NAMES.test(text)
    const engagementVerb = /(makes? a (good |great |valid )?point|said|mentioned|points? out|argues?|suggests?|notes?|raises?|brought? up)/i.test(text)
    const buildOn = /\b(building on|adding to|unlike|while [A-Z]|although [A-Z]|I (also )?(agree|disagree) with)\b/i.test(text)
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
  const CLOSING_MARKERS = ['in conclusion','to summarize','in summary','to sum up']
  let placementBonus = 0
  if (paragraphCount >= 2) {
    const firstPara = paragraphs[0].toLowerCase()
    const lastPara  = paragraphs[paragraphCount - 1].toLowerCase()
    if (CLOSING_MARKERS.some(m => lastPara.includes(m)))  placementBonus =  0.1
    if (CLOSING_MARKERS.some(m => firstPara.includes(m))) placementBonus = -0.1
  }

  const value = Math.min(
    1,
    Math.max(0, markerScore * 0.5 + paragraphScore * 0.3 + taskSpecific * 0.2 + placementBonus),
  )

  return {
    value,
    details: `${uniqueMarkers} unique discourse markers, ${categoriesUsed}/${totalCategories} categories, ${paragraphCount} paragraph(s), taskScore=${taskSpecific.toFixed(2)}, taskType=${taskType}${placementBonus !== 0 ? `, closingPlacement=${placementBonus > 0 ? '+' : ''}${placementBonus.toFixed(1)}` : ''}`,
  }
}

export function suggest(analysis) {
  if (analysis.value >= 0.8) return []
  const tips = []
  const taskTypeMatch = analysis.details.match(/taskType=(\w+)/)
  const taskType = taskTypeMatch ? taskTypeMatch[1] : 'general'

  const catMatch = analysis.details.match(/(\d+)\/(\d+) categories/)
  const categoriesUsed = catMatch ? parseInt(catMatch[1]) : 0
  const totalCategories = catMatch ? parseInt(catMatch[2]) : 6

  if (analysis.details.includes('0 unique discourse markers'))
    tips.push('Use discourse markers (however, moreover, for example, in conclusion) to connect your ideas.')
  else if (categoriesUsed < 3)
    tips.push('Vary your transition types — use contrast (however), addition (moreover), and conclusion (therefore/in conclusion) together for a higher organization score.')
  if (analysis.details.includes('1 paragraph'))
    tips.push('Divide your response into multiple paragraphs for clarity.')

  const lowTaskScore = analysis.details.includes('taskScore=0.00') || analysis.details.includes('taskScore=0.10') || analysis.details.includes('taskScore=0.30')
  if (lowTaskScore) {
    if (taskType === 'discussion')
      tips.push('Explicitly reference a classmate\'s idea — mention what they said and build on or contrast it.')
    else if (taskType === 'email')
      tips.push('Open with a greeting (Dear..., Hello...) and close with a sign-off (Regards, Thank you, Best wishes).')
    else
      tips.push('Add an opening sentence that states your purpose and a closing sentence that wraps up your main point.')
  }
  return tips.length > 0 ? tips : ['Improve cohesion by using transition phrases between ideas.']
}
