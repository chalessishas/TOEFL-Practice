const DISCOURSE_MARKERS = [
  'however','moreover','furthermore','additionally','in addition','on the other hand',
  'nevertheless','for instance','for example','such as','in conclusion','therefore',
  'consequently','as a result','firstly','secondly','finally','meanwhile','similarly',
  'in contrast','despite','although','while','whereas','in summary','to summarize',
  'in particular','notably','specifically','that is','in other words','by contrast',
  'on the contrary','at the same time','in the meantime','above all','after all',
  'in fact','indeed','to begin with','first of all','last but not least','overall',
]

function countUniqueMarkers(text) {
  const lower = text.toLowerCase()
  const found = new Set()
  DISCOURSE_MARKERS.forEach(marker => {
    if (lower.includes(marker)) found.add(marker)
  })
  return found.size
}

export function score(text, taskType = 'general') {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0)
  const sentenceCount = Math.max(sentences.length, 1)

  // Discourse marker density score
  const uniqueMarkers = countUniqueMarkers(text)
  const markerDensity = uniqueMarkers / sentenceCount
  // Real e-rater: markers per sentence, but more lenient for short texts
  // 0.15+/sentence → 1.0 (was 0.3 — too aggressive for emails)
  const markerScore = Math.min(1, markerDensity / 0.15)

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

  const value = Math.min(
    1,
    markerScore * 0.5 + paragraphScore * 0.3 + taskSpecific * 0.2,
  )

  return {
    value,
    details: `${uniqueMarkers} unique discourse markers, ${paragraphCount} paragraph(s), taskScore=${taskSpecific.toFixed(2)}, taskType=${taskType}`,
  }
}

export function suggest(analysis) {
  if (analysis.value >= 0.8) return []
  const tips = []
  const taskTypeMatch = analysis.details.match(/taskType=(\w+)/)
  const taskType = taskTypeMatch ? taskTypeMatch[1] : 'general'

  if (analysis.details.includes('0 unique discourse markers') || analysis.value < 0.5)
    tips.push('Use discourse markers (however, moreover, in conclusion) to connect your ideas.')
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
