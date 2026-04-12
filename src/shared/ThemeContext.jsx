import { createContext, useContext, useState, useEffect } from 'react'
import { colors as lightColors, darkColors, fonts, shadows, darkShadows } from './theme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('toefl-dark-mode') === 'true'
  )
  const [isTimerVisible, setIsTimerVisible] = useState(
    () => localStorage.getItem('toefl-timer-visible') !== 'false'
  )
  const [isShortcutsVisible, setIsShortcutsVisible] = useState(
    () => localStorage.getItem('toefl-shortcuts-visible') !== 'false'
  )

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    localStorage.setItem('toefl-dark-mode', isDark)
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('toefl-timer-visible', isTimerVisible)
  }, [isTimerVisible])

  useEffect(() => {
    localStorage.setItem('toefl-shortcuts-visible', isShortcutsVisible)
  }, [isShortcutsVisible])

  const toggleDark = () => setIsDark(d => !d)
  const toggleTimer = () => setIsTimerVisible(v => !v)
  const toggleShortcuts = () => setIsShortcutsVisible(v => !v)

  const value = {
    isDark,
    toggleDark,
    isTimerVisible,
    toggleTimer,
    isShortcutsVisible,
    toggleShortcuts,
    colors: isDark ? darkColors : lightColors,
    fonts,
    shadows: isDark ? darkShadows : shadows,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
