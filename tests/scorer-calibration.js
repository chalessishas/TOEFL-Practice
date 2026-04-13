/**
 * Scorer Calibration Test Suite
 * Tests score discrimination across all 5 bands (Score 1–5).
 * Run: node --input-type=module tests/scorer-calibration.js
 *
 * Expected ranges (based on Research Loop 6 / QWK ~0.50 target):
 *   Score 1 → overall ≤ 2.0    (minimal/off-topic/empty)
 *   Score 2 → overall 1.5–3.0  (very limited, errors throughout)
 *   Score 3 → overall 2.5–3.8  (basic development, some structure)
 *   Score 4 → overall 3.5–4.2  (adequate development, clear structure)
 *   Score 5 → overall ≥ 4.0    (well-developed, sophisticated vocabulary)
 *
 * Calibration pass = no score band overlap with adjacent bands for primary test cases.
 */

import { scoreWriting } from '../src/writing/scorer/index.js'

// ─── Score 1 ──────────────────────────────────────────────────────────────────
// Completely off-topic, 1 sentence
const SCORE1_OFFOPIC = {
  text: 'I like pizza and cats.',
  taskType: 'discussion',
  label: 'Score-1: off-topic one-liner',
  expectMax: 2.0,
}

// Score 1: empty / minimal effort
const SCORE1_MINIMAL = {
  text: 'I agree with this.',
  taskType: 'discussion',
  label: 'Score-1: empty agreement',
  expectMax: 2.0,
}

// ─── Score 2 ──────────────────────────────────────────────────────────────────
// Very limited development, no examples, repetitive, grammatical errors
const SCORE2_DISCUSSION = {
  text: `I think remote work is good. Remote work is better. People like remote work. It is good for work. Remote work help people. I agree remote work is better than office work. Remote work make people happy. This is why remote work is good.`,
  taskType: 'discussion',
  label: 'Score-2: vague, repetitive, no examples, grammar errors',
  expectMin: 1.5,
  expectMax: 3.0,
}

// Score 2: email with no structure, wrong format
const SCORE2_EMAIL = {
  text: `I want to change my schedule. Can you help me? I need to change it. Please help. Thank you.`,
  taskType: 'email',
  label: 'Score-2: email missing greeting/closing, no detail',
  expectMin: 1.5,
  expectMax: 3.0,
}

// ─── Score 3 ──────────────────────────────────────────────────────────────────
// Basic structure, some development but thin, minimal vocabulary
const SCORE3_DISCUSSION = {
  text: `In my opinion, remote work has some benefits. First, people can save time because they do not need to travel to the office. This is good for workers. Second, people can work in a comfortable place at home. However, there are also some problems with remote work. For example, it can be hard to focus at home. Overall, I think remote work is generally good for most people.`,
  taskType: 'discussion',
  label: 'Score-3: basic structure, simple vocabulary, thin development (~75 words)',
  expectMin: 2.5,
  expectMax: 3.8,
}

// Score 3: email with basic content but missing closing, no reason given, underdeveloped
const SCORE3_EMAIL = {
  text: `I am writing about my schedule. I need to change Tuesday. I have appointment. Can I work from home? I will finish work.`,
  taskType: 'email',
  label: 'Score-3: email no greeting/closing, very underdeveloped, no reason/detail',
  expectMin: 2.5,
  expectMax: 3.8,
}

// ─── Score 4 ──────────────────────────────────────────────────────────────────
// Good structure, specific examples, adequate vocabulary, clear argument
const SCORE4_DISCUSSION = {
  text: `In my view, remote work offers significant advantages for modern employees. First, workers save considerable time by eliminating daily commutes, which allows them to focus more on their actual responsibilities. For example, employees who previously spent 90 minutes commuting can redirect that time toward productive work. Moreover, studies suggest that flexible schedules lead to higher job satisfaction and lower turnover rates. However, some might argue that remote work weakens team collaboration. While this concern is valid, modern communication tools such as video conferencing largely address this challenge. Therefore, with proper management, remote work benefits both employees and organizations.`,
  taskType: 'discussion',
  label: 'Score-4: structured, good examples, adequate vocabulary (~120 words)',
  expectMin: 3.5,
  expectMax: 4.2,
}

// ─── Score 5 ──────────────────────────────────────────────────────────────────
// Sophisticated vocabulary, nuanced argument, specific statistics, well-organized
const SCORE5_DISCUSSION = {
  text: `In my view, the widespread adoption of remote work represents a fundamental shift in how organizations conceptualize productivity and employee well-being. Proponents of this transition, like Professor Torres, correctly identify that flexibility enhances output; indeed, research indicates that remote employees demonstrate a 13% productivity increase compared to their office-based counterparts. Furthermore, eliminating commutes — which average 52 minutes daily according to 2023 Gallup data — reclaims substantial time that workers can allocate to both professional and personal development.

Admittedly, critics argue that remote arrangements undermine spontaneous collaboration and organizational culture. This concern warrants acknowledgment; however, evidence suggests that intentional communication protocols and periodic in-person retreats can effectively replicate the collegial dynamics that offices traditionally foster. Therefore, rather than reverting to rigid office mandates, organizations should pursue hybrid models that leverage the demonstrable advantages of remote work while deliberately cultivating the interpersonal connections that sustain long-term team cohesion.`,
  taskType: 'discussion',
  label: 'Score-5: sophisticated, statistics, nuanced argument, multi-paragraph (~160 words)',
  expectMin: 4.0,
}

// ─── Runner ──────────────────────────────────────────────────────────────────
const tests = [
  SCORE1_OFFOPIC,
  SCORE1_MINIMAL,
  SCORE2_DISCUSSION,
  SCORE2_EMAIL,
  SCORE3_DISCUSSION,
  SCORE3_EMAIL,
  SCORE4_DISCUSSION,
  SCORE5_DISCUSSION,
]

let passed = 0
let failed = 0
console.log('=== SCORER CALIBRATION — Score Band Discrimination ===\n')

for (const t of tests) {
  const r = scoreWriting(t.text, t.taskType, '', null)
  const score = r.overall
  let ok = true
  const checks = []

  if (t.expectMax !== undefined && score > t.expectMax) {
    ok = false
    checks.push(`expected ≤ ${t.expectMax}, got ${score.toFixed(2)}`)
  }
  if (t.expectMin !== undefined && score < t.expectMin) {
    ok = false
    checks.push(`expected ≥ ${t.expectMin}, got ${score.toFixed(2)}`)
  }

  const status = ok ? '✓ PASS' : '✗ FAIL'
  if (ok) passed++; else failed++

  console.log(`${status}  ${score.toFixed(2)}  ${t.label}`)
  if (!ok) console.log(`       → ${checks.join(', ')}`)
}

console.log(`\n${passed + failed} tests: ${passed} pass, ${failed} fail`)

// Discrimination check: Score-3 max should be < Score-4 min
const s3 = scoreWriting(SCORE3_DISCUSSION.text, 'discussion', '', null).overall
const s4 = scoreWriting(SCORE4_DISCUSSION.text, 'discussion', '', null).overall
const s5 = scoreWriting(SCORE5_DISCUSSION.text, 'discussion', '', null).overall
console.log('\n--- Discrimination gaps ---')
console.log(`Score-3: ${s3.toFixed(2)}  Score-4: ${s4.toFixed(2)}  Score-5: ${s5.toFixed(2)}`)
console.log(`3→4 gap: ${(s4 - s3).toFixed(2)}  4→5 gap: ${(s5 - s4).toFixed(2)}`)
console.log(s4 > s3 ? '✓ Score-4 > Score-3' : '✗ Score-3/4 conflation')
console.log(s5 > s4 ? '✓ Score-5 > Score-4' : '✗ Score-4/5 conflation')
