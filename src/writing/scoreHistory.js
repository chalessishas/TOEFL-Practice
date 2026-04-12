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
