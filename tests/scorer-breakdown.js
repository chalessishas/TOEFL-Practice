/**
 * Per-module breakdown diagnostic for S3/S4/S5 discussion samples.
 * Validates whether rule-based scorer's S4→S5 discrimination is saturated.
 *
 * Run: node tests/scorer-breakdown.js
 *
 * Output: per-module score + weighted contribution for each sample,
 * and S4→S5 per-module gap × weight to identify highest-ROI improvement target.
 */
import { scoreWriting } from '../src/writing/scorer/index.js'

const S3 = `In my opinion, remote work has some benefits. First, people can save time because they do not need to travel to the office. This is good for workers. Second, people can work in a comfortable place at home. However, there are also some problems with remote work. For example, it can be hard to focus at home. Overall, I think remote work is generally good for most people.`

const S4 = `In my view, remote work offers significant advantages for modern employees. First, workers save considerable time by eliminating daily commutes, which allows them to focus more on their actual responsibilities. For example, employees who previously spent 90 minutes commuting can redirect that time toward productive work. Moreover, studies suggest that flexible schedules lead to higher job satisfaction and lower turnover rates. However, some might argue that remote work weakens team collaboration. While this concern is valid, modern communication tools such as video conferencing largely address this challenge. Therefore, with proper management, remote work benefits both employees and organizations.`

const S5 = `In my view, the widespread adoption of remote work represents a fundamental shift in how organizations conceptualize productivity and employee well-being. Proponents of this transition, like Professor Torres, correctly identify that flexibility enhances output; indeed, research indicates that remote employees demonstrate a 13% productivity increase compared to their office-based counterparts. Furthermore, eliminating commutes — which average 52 minutes daily according to 2023 Gallup data — reclaims substantial time that workers can allocate to both professional and personal development.

Admittedly, critics argue that remote arrangements undermine spontaneous collaboration and organizational culture. This concern warrants acknowledgment; however, evidence suggests that intentional communication protocols and periodic in-person retreats can effectively replicate the collegial dynamics that offices traditionally foster. Therefore, rather than reverting to rigid office mandates, organizations should pursue hybrid models that leverage the demonstrable advantages of remote work while deliberately cultivating the interpersonal connections that sustain long-term team cohesion.`

const WEIGHTS = {
  grammar: 0.07, mechanics: 0.06, vocabulary: 0.14, organization: 0.33,
  development: 0.28, style: 0.07, relevance: 0.05,
}

const MODS = Object.keys(WEIGHTS)
const samples = { S3, S4, S5 }
const scores = {}

for (const [label, text] of Object.entries(samples)) {
  const r = scoreWriting(text, 'discussion', '', null)
  scores[label] = r
  console.log(`\n=== ${label} overall: ${r.overall.toFixed(2)} ===`)
  for (const m of MODS) {
    const s = r.breakdown[m].score
    console.log(`  ${m.padEnd(13)} ${s.toFixed(3)}  × ${WEIGHTS[m]} = ${(s * WEIGHTS[m]).toFixed(3)}`)
  }
}

console.log('\n=== S4 → S5 per-module gap ===')
console.log('  module        raw gap   weighted (contribution to overall gap)')
let totalWeightedGap = 0
for (const m of MODS) {
  const gap = scores.S5.breakdown[m].score - scores.S4.breakdown[m].score
  const weightedGap = gap * WEIGHTS[m]
  totalWeightedGap += weightedGap
  console.log(`  ${m.padEnd(13)} ${gap >= 0 ? '+' : ''}${gap.toFixed(3)}    ${weightedGap >= 0 ? '+' : ''}${weightedGap.toFixed(3)}`)
}
console.log(`  ${'TOTAL'.padEnd(13)}            ${totalWeightedGap >= 0 ? '+' : ''}${totalWeightedGap.toFixed(3)}  (raw; ×5 to match overall scale)`)
console.log(`  Observed overall 4→5 gap: ${(scores.S5.overall - scores.S4.overall).toFixed(2)}  (on 0-5 scale)`)

console.log('\n=== S3 → S4 per-module gap (for comparison) ===')
for (const m of MODS) {
  const gap = scores.S4.breakdown[m].score - scores.S3.breakdown[m].score
  const weightedGap = gap * WEIGHTS[m]
  console.log(`  ${m.padEnd(13)} ${gap >= 0 ? '+' : ''}${gap.toFixed(3)}    ${weightedGap >= 0 ? '+' : ''}${weightedGap.toFixed(3)}`)
}
