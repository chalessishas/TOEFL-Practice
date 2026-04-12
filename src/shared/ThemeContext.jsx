import { createContext, useContext, useState, useEffect } from 'react'
import { colors as lightColors, darkColors, fonts, shadows, darkShadows } from './theme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('toefl-dark-mode') === 'true'
  )

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    localStorage.setItem('toefl-dark-mode', isDark)
  }, [isDark])

  const toggleDark = () => setIsDark(d => !d)

  const value = {
    isDark,
    toggleDark,
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
