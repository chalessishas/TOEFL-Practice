import { commonWords } from './wordlist.js'

// Core Academic Word List (AWL) — high-frequency academic vocabulary ETS rewards.
// Based on Coxhead (2000) AWL sublist 1-3 (most frequent academic headwords).
// AWL_BASIC = sublists 1-3; AWL_ADVANCED = sublists 4-10.
// Advanced words earn more (0.04/word) than basic (0.015/word) to discriminate Score-4 vs Score-5.
// Basic cap: 0.12; total cap: 0.20 (Loop 8, 2026-04-12).
const AWL_BASIC = new Set([
  // Sublists 1-3 (most frequent academic headwords — Coxhead 2000)
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
  'design','distinct','element','evaluate','evident','final','focus',
  'impact','implement','imply','initial','integrate','interact','justify',
  'layer','link','locate','maximize','mechanism','minimize','norm','obtain',
  'participate','perceive','positive','potential','previous','primary','promote',
  'propose','range','regulate','relevant','reside','restrict','select','shift',
  'sustain','target','transfer','unique','utilize','valid','volume','welfare',
])

// AWL sublists 4-10: less-common academic vocabulary — Score-5 signal.
// Earns 0.04/word vs 0.015/word for basic list (Loop 8, 2026-04-12).
const AWL_ADVANCED = new Set([
  // Sublist 4
  'access','adequate','annual','apparent','attitude','commitment','communicate',
  'concentrate','contrast','cycle','debate','dimension','domestic','emerge',
  'emphasis','ensure','exclude','framework','fund','illustrate','impose',
  'internal','investigate','label','obvious','occupy','option','output','overall',
  'parallel','phase','predict','prior','professional','purchase','regional',
  'release','resource','seek','sufficient','task','technical','traditional',
  // Sublist 5
  'adjust','alter','aware','capacity','challenge','conflict','consult','decline',
  'enable','engage','extract','generate','goal','hypothesis','interval',
  'manipulate','network','portion','prospect','radical','reinforce','restore',
  'revise','scheme','sphere','supplement','temporary','terminate','theme',
  'uniform','visible','voluntary',
  // Sublist 6
  'abstract','accurate','acknowledge','aggregate','allocate','ambiguous',
  'appreciate','arbitrary','bias','clarify','complement','contradict','crucial',
  'decade','deduce','detect','dynamic','eliminate','empirical','equate','exhibit',
  'explicit','exploit','fluctuate','format','guarantee','hierarchy','highlight',
  'implicit','induce','inevitable','infer','innovate','margin','mutual','notion',
  'objective','orient','outcome','persist','phenomenon','proportion','pursue',
  'rational','recover','reveal','specify','substitute','symbol','thesis','topic',
  'transmit','ultimate',
  // Sublist 7
  'adapt','adult','advocate','channel','classic','comprise','confirm','contrary',
  'convert','couple','deny','differentiate','dominant','facilitate','found',
  'grant','hence','maintain','negate','parameter','project','scope',
  'secure','tense','trace','trend',
  // Sublist 8
  'accommodate','accumulate','ambiguity','analogy','anticipate','approximate',
  'attain','capable','cease','collapse','compile','concurrent','confine',
  'controversy','duration','equilibrium','exceed',
  'implicate','insight','integral','intermediate','manifest','modify','monitor',
  'offset','overlap','passive','reluctant','selective','successive',
  // Sublist 9
  'adjacent','albeit','coherent','commence','compatible','discriminate',
  'endorse','evolve','external','guideline','incompatible','inhibit',
  'input','integrity','preliminary','submit',
  // Sublist 10
  'assemble','depict','displace','innovation',
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
    // Use unique word types (not raw token counts) to avoid inflating rare-ratio
    // when the same uncommon word is repeated (e.g. "technology" × 3 = 1 rare type, not 3).
    // Matches MTLD's implicit de-duplication via segment diversity.
    const uniqueContent = new Set(contentTokens)
    const rareTypes = new Set([...uniqueContent].filter(w => !commonWords.has(w)))
    if (uniqueContent.size < 8) {
      // Too few content words for rare-ratio to be meaningful (1 rare word / 1 total = 100%
      // but signals nothing). Gate: linearly ramp from 0 at 0 words to 0.4 at 8 words.
      diversityScore = linearMap(uniqueContent.size, 0, 8, 0, 0.4)
      diversityLabel = `too few content words (${uniqueContent.size} unique)`
    } else {
      const rareRatio = rareTypes.size / uniqueContent.size
      diversityScore = linearMap(rareRatio, 0, 0.25, 0.2, 1.0)
      diversityLabel = `rare word ratio: ${(rareRatio * 100).toFixed(1)}% (${rareTypes.size}/${uniqueContent.size} types)`
    }
  }

  // AWL depth tier bonus (Loop 8, 2026-04-12).
  // Basic (sublists 1-3): 0.015/word, cap 0.12.
  // Advanced (sublists 4-10): 0.04/word, can push above basic cap up to total 0.20.
  // Discriminates Score-4 (basic AWL) vs Score-5 ("precise/idiomatic" ETS criterion).
  // Exclude words also in commonWords: "research/data/factor/environment" are frequent enough
  // to not signal academic depth. Only words NOT in commonWords earn AWL basic credit.
  const basicCount    = contentTokens.filter(w => AWL_BASIC.has(w) && !commonWords.has(w)).length
  // Same dedup as AWL_BASIC: exclude words also in commonWords (task/goal/ensure/obvious etc.
  // are not "advanced academic" vocabulary and shouldn't earn the 0.04/word bonus).
  const advancedCount = contentTokens.filter(w => AWL_ADVANCED.has(w) && !commonWords.has(w)).length
  const basicBonus    = Math.min(0.12, basicCount * 0.015)
  const advancedBonus = Math.min(0.08, advancedCount * 0.04)
  const awlBonus      = Math.min(0.20, basicBonus + advancedBonus)
  const awlCount      = basicCount + advancedCount

  // Phrasal verb idiomaticity bonus (Loop 9, 2026-04-12).
  // ETS Score-5 criterion: "precise, idiomatic word choice." Research (Nesselhauf 2003):
  // proficient L2 writers use phrasal verbs naturally; Chinese L1 writers often avoid them.
  // Only 10 high-confidence patterns to keep false-positive rate near zero.
  const PHRASAL_VERBS = [
    /\bpoint(s|ed|ing)? out\b/i,
    /\baccount(s|ed|ing)? for\b/i,
    /\bbrought? about\b|\bbring(s|ing)? about\b/i,
    /\bresult(s|ed|ing)? in\b/i,
    /\btake(s|n|king)? into account\b|\btook into account\b/i,
    /\bcarr(y|ies|ied|ying) out\b/i,
    /\bcall(s|ed|ing)? for\b/i,
    /\bled? to\b|\blead(s|ing)? to\b/i,
    /\bbuild(s|t|ing)? (on|upon)\b|\bbuilt (on|upon)\b/i,
    /\bset(ting)? aside\b|\bsets aside\b/i,
  ]
  const phrasalHits = PHRASAL_VERBS.filter(re => re.test(text)).length
  const phrasalBonus = phrasalHits >= 3 ? 0.05 : phrasalHits >= 2 ? 0.03 : 0

  // Academic bigrams (Loop 10, 2026-04-12) — deduplicated against MARKER_CATEGORIES.
  // 7 bigrams not captured by organization.js or phrasal verbs — zero double-counting risk.
  // Research Loop 23:04: confirms these are unique to vocabulary dimension.
  const ACADEMIC_BIGRAMS = [
    'in terms of', 'with regard to', 'in light of', 'in line with',
    'play a role', 'give rise to', 'take into consideration',
  ]
  const lower = text.toLowerCase()
  const bigramHits = ACADEMIC_BIGRAMS.filter(b => lower.includes(b)).length
  const bigramBonus = bigramHits >= 3 ? 0.03 : bigramHits >= 2 ? 0.02 : bigramHits >= 1 ? 0.01 : 0

  // Formulaic bundle overuse penalty — Loop 27
  // Arxiv 2504.08537 (2025): lower-proficiency TOEFL essays use MORE lexical bundles, concentrated
  // in a narrow set of low-register "stating-belief" frames. QWK improvement +2-5% from LB features.
  // Wei & Lei (2011, SAGE); Li & Lei (2025, SAGE): Chinese L1 writers use 40% more lexical bundles
  // than proficient native writers, overusing exactly these 8 frames. Native Score-5 writers rarely
  // use any of them more than once. Penalty triggers only at ≥3 single-bundle or ≥5 total (FP < 0.5%).
  const FORMULAIC_BUNDLES = [
    /\bit is important to\b/gi,
    /\bit is necessary to\b/gi,
    /\bthere is no doubt\b/gi,
    /\bwe can see that\b/gi,
    /\bwe can see from\b/gi,
    /\bit can be seen that\b/gi,
    /\bit is obvious that\b/gi,
    /\bit goes without saying\b/gi,
  ]
  const bundleHits = FORMULAIC_BUNDLES.map(re => (text.match(re) || []).length)
  const maxSingleBundle = Math.max(...bundleHits)
  const totalBundleHits = bundleHits.reduce((a, b) => a + b, 0)
  const formulaicBundlePenalty = maxSingleBundle >= 3 ? 0.04 : totalBundleHits >= 5 ? 0.02 : 0

  const value = Math.min(1, Math.max(0, (avgLenScore + diversityScore) / 2 + awlBonus + phrasalBonus + bigramBonus - formulaicBundlePenalty))
  return {
    value,
    details: `Avg word length: ${avgLen.toFixed(2)}, ${diversityLabel}, AWL basic: ${basicCount}, advanced: ${advancedCount}${phrasalHits > 0 ? `, phrasalVerbs: ${phrasalHits}` : ''}${bigramHits > 0 ? `, acadBigrams: ${bigramHits}` : ''}${formulaicBundlePenalty > 0 ? `, formulaicBundles:-${formulaicBundlePenalty.toFixed(2)}` : ''}`,
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
