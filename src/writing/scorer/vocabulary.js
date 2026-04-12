import { commonWords } from './wordlist.js'

// Core Academic Word List (AWL) — high-frequency academic vocabulary ETS rewards.
// Based on Coxhead (2000) AWL sublist 1-3 (most frequent academic headwords).
const AWL_CORE = new Set([
  'analyze','analysis','approach','area','assessment','assume','assumption',
  'authority','available','benefit','concept','consistent','context','contract',
  'contribute','create','data','define','demonstrate','distribute','economic',
  'environment','establish','evidence','export','factor','financial','formula',
  'function','identify','income','indicate','individual','interpret','involve',
  'issue','labor','legal','major','method','occur','percent','period','policy',
  'principle','procedure','process','require','research','respond','role',
  'section','significant','similar','source','specific','structure','theory',
  'vary','achieve','acquire','administrate','affect','appropriate','aspect',
  'assist','category','chapter','commission','community','complex','compute',
  'conclude','conduct','consequent','constitute','consume','credit','culture',
  'design','distinct','element','evaluate','evident','export','final','focus',
  'impact','implement','imply','initial','integrate','interact','justify',
  'layer','link','locate','maximize','mechanism','minimize','norm','obtain',
  'participate','perceive','positive','potential','previous','primary','promote',
  'propose','range','regulate','relevant','reside','restrict','select','shift',
  'sustain','target','transfer','unique','utilize','valid','volume','welfare',
])

// Function words to exclude from content-word analysis
const FUNCTION_POS = new Set([
  'the','a','an','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','can','shall',
  'must','and','or','but','if','when','while','because','since','although',
  'though','for','from','to','in','on','at','by','with','about','into','through',
  'during','before','after','between','under','over','above','below','out','up',
  'down','off','as','of','this','that','these','those','it','its','he','she',
  'they','we','you','i','me','my','your','his','her','our','their','who',
  'which','what','where','how','why','here','there','then','than','very','much',
  'more','most','some','any','all','each','every','both','few','many','such',
  'own','other','another','same','different','first','last','next','new','old',
  'good','great','little','long','big','small','right','only','also','just',
  'still','even','now','already','never','always','often','sometimes','too',
  'so','well','back','away','again','once','yet','almost','enough','quite',
  'rather','not','no',
])

function isContentWord(word) {
  return word.length >= 4 && !FUNCTION_POS.has(word)
}

// Linear interpolation clamped to [0, 1]
function linearMap(value, x0, x1, y0, y1) {
  if (value <= x0) return y0
  if (value >= x1) return y1
  return y0 + ((value - x0) / (x1 - x0)) * (y1 - y0)
}

// MTLD (Measure of Textual Lexical Diversity) — one direction pass.
// Walks tokens sequentially; records segment length each time running TTR
// drops below threshold. Essays that keep introducing new words produce
// longer segments (higher MTLD). Based on McCarthy & Jarvis 2010.
const MTLD_THRESHOLD = 0.72
function mtldOnce(tokens) {
  if (tokens.length === 0) return 0
  let factors = 0
  let segStart = 0
  const seen = new Map()   // word → count within current segment
  let totalInSeg = 0

  for (let i = 0; i < tokens.length; i++) {
    const w = tokens[i]
    seen.set(w, (seen.get(w) || 0) + 1)
    totalInSeg++
    const uniqueInSeg = seen.size
    const ttr = uniqueInSeg / totalInSeg
    if (ttr < MTLD_THRESHOLD) {
      factors++
      seen.clear()
      totalInSeg = 0
      segStart = i + 1
    }
  }
  // Partial factor for the trailing incomplete segment
  if (totalInSeg > 0) {
    const uniqueInSeg = seen.size
    const ttr = uniqueInSeg / totalInSeg
    // Partial weight = how far TTR fell toward the threshold (McCarthy & Jarvis 2010 §3.2)
    const partial = (1 - ttr) / (1 - MTLD_THRESHOLD)
    factors += partial
  }
  return factors === 0 ? tokens.length : tokens.length / factors
}

// Bidirectional MTLD: average of forward and backward passes (more robust)
function mtld(tokens) {
  const forward  = mtldOnce(tokens)
  const backward = mtldOnce([...tokens].reverse())
  return (forward + backward) / 2
}

export function score(text) {
  const tokens = (text.match(/[a-zA-Z']+/g) || []).map(w => w.toLowerCase())
  if (tokens.length === 0) return { value: 0, details: 'No words found' }

  // Average word length score
  const avgLen = tokens.reduce((sum, w) => sum + w.length, 0) / tokens.length
  // 3.5→0.2, 4.0→0.4, 4.5→0.6, 5.0→0.8, 5.5→1.0
  const avgLenScore = linearMap(avgLen, 3.5, 5.5, 0.2, 1.0)

  const contentTokens = tokens.filter(isContentWord)
  const totalContent = contentTokens.length || 1

  // Lexical diversity: MTLD for essays ≥100 words (correlates 0.79 with human scores
  // in L2 AES, vs 0.61 for simple TTR — McCarthy & Jarvis 2010, Source F Loop 2).
  // For short essays use global TTR (MTLD unreliable below ~100 tokens).
  let diversityScore
  let diversityLabel
  if (tokens.length >= 100) {
    const mtldVal = mtld(tokens)
    // L2 TOEFL writers: MTLD 20→0.2, 40→0.4, 60→0.7, 80→1.0
    diversityScore = linearMap(mtldVal, 20, 80, 0.2, 1.0)
    diversityLabel = `MTLD: ${mtldVal.toFixed(1)}`
  } else {
    const rareCount = contentTokens.filter(w => !commonWords.has(w)).length
    const rareRatio = rareCount / totalContent
    diversityScore = linearMap(rareRatio, 0, 0.2, 0.2, 1.0)
    diversityLabel = `rare word ratio: ${(rareRatio * 100).toFixed(1)}%`
  }

  // AWL bonus: reward use of academic vocabulary (capped at +0.2)
  const awlCount = contentTokens.filter(w => AWL_CORE.has(w)).length
  const awlBonus = Math.min(0.2, awlCount * 0.025)

  const value = Math.min(1, (avgLenScore + diversityScore) / 2 + awlBonus)
  return {
    value,
    details: `Avg word length: ${avgLen.toFixed(2)}, ${diversityLabel}, AWL words: ${awlCount}`,
  }
}

export function suggest(analysis) {
  if (analysis.value >= 0.75) return []
  const tips = []
  if (analysis.details.includes('Avg word length')) {
    const match = analysis.details.match(/Avg word length: ([\d.]+)/)
    if (match && parseFloat(match[1]) < 4.5)
      tips.push('Expand your vocabulary — use more precise, academic words instead of simple ones.')
  }
  if (analysis.details.includes('rare word ratio')) {
    const match = analysis.details.match(/rare word ratio: ([\d.]+)%/)
    if (match && parseFloat(match[1]) < 10)
      tips.push('Incorporate more varied and sophisticated vocabulary from the Academic Word List.')
  }
  return tips.length > 0 ? tips : ['Use a wider range of vocabulary to demonstrate lexical diversity.']
}
