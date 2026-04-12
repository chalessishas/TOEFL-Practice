const HISTORY_KEY = 'toefl-score-history'
const SCHEMA_VERSION = 1
const MAX_ENTRIES = 100

// Wrap payload in a versioned envelope so future schema changes can migrate
// stale data instead of silently breaking. Envelope: { v: number, data: [] }
const read = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    // Legacy: plain array written before versioning was added
    if (Array.isArray(parsed)) return parsed
    if (parsed?.v === SCHEMA_VERSION && Array.isArray(parsed.data)) return parsed.data
    return []
  } catch { return [] }
}

const write = (list) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify({ v: SCHEMA_VERSION, data: list }))
  } catch {}
}

export const appendScore = (entry) => {
  const history = read()
  history.push({ ...entry, date: new Date().toISOString() })
  if (history.length > MAX_ENTRIES) history.splice(0, history.length - MAX_ENTRIES)
  write(history)
}

export const getHistory = () => read()

/**
 * Pick the prompt index the user has historically scored lowest on.
 * Falls back to random when there's no history for a given type.
 *
 * @param {'email'|'discussion'} taskType
 * @param {number} promptCount - total number of prompts available
 * @returns {number} index into the prompts array
 */
export const pickWeakestPromptIdx = (taskType, promptCount) => {
  const history = read().filter(h => h.type === taskType)
  if (history.length === 0) return Math.floor(Math.random() * promptCount)

  // Compute average score per promptIdx
  const totals = {}
  const counts = {}
  for (const h of history) {
    const idx = h.promptIdx
    if (idx == null || idx >= promptCount) continue
    totals[idx] = (totals[idx] ?? 0) + h.score
    counts[idx] = (counts[idx] ?? 0) + 1
  }

  // Find the seen index with the lowest average
  let worstIdx = null
  let worstAvg = Infinity
  for (const [idxStr, total] of Object.entries(totals)) {
    const avg = total / counts[idxStr]
    if (avg < worstAvg) { worstAvg = avg; worstIdx = Number(idxStr) }
  }

  // 70% chance to pick the weakest; 30% random (to avoid total staleness)
  if (worstIdx !== null && Math.random() < 0.7) return worstIdx
  return Math.floor(Math.random() * promptCount)
}
