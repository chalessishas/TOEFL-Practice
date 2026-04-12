const HISTORY_KEY = 'toefl-score-history'
const MAX_ENTRIES = 100

export const appendScore = (entry) => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    const history = raw ? JSON.parse(raw) : []
    history.push({ ...entry, date: new Date().toISOString() })
    if (history.length > MAX_ENTRIES) history.splice(0, history.length - MAX_ENTRIES)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {}
}

export const getHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}
