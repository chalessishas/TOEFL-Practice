// TOEFL Practice — Design Tokens
// Unified TOEFL iBT exam palette

export const colors = {
  // Primary (TOEFL teal)
  primary: '#00695c',
  primaryDark: '#004d40',
  primaryLight: '#e0f2f1',
  primaryGradient: 'linear-gradient(135deg, #00695c 0%, #004d40 100%)',
  primaryShadow: 'rgba(0, 105, 92, 0.25)',

  // Layout
  bg: '#f5f5f5',
  white: '#FFFFFF',
  card: '#FFFFFF',
  cardHover: '#f0f0f0',
  inputBg: '#fafafa',

  // Text
  text: '#1a1a1a',
  textMedium: '#555',
  textMuted: '#888',
  textLight: '#aaa',

  // Borders
  border: '#ddd',
  borderLight: '#e5e5e5',

  // Feedback
  success: '#2e7d32',
  successBg: 'rgba(46, 125, 50, 0.08)',
  successBorder: 'rgba(46, 125, 50, 0.3)',
  error: '#c62828',
  errorBg: 'rgba(198, 40, 40, 0.08)',
  errorBorder: 'rgba(198, 40, 40, 0.3)',
  warning: '#e65100',

  // Exam accents
  toeflTeal: '#00695c',
  toeflTealLight: '#00897b',
  toeflRed: '#c62828',
}

export const fonts = {
  heading: "'Georgia', 'Times New Roman', serif",
  body: "'DM Sans', sans-serif",
}

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
}

export const shadows = {
  card: '0 2px 8px rgba(0, 0, 0, 0.08)',
  cardHover: '0 8px 24px rgba(0, 105, 92, 0.12)',
  button: '0 4px 16px rgba(0, 105, 92, 0.2)',
}

export const darkColors = {
  // Primary (same teal — readable on dark bg)
  primary: '#4db6ac',
  primaryDark: '#00897b',
  primaryLight: '#1a3330',
  primaryGradient: 'linear-gradient(135deg, #4db6ac 0%, #00897b 100%)',
  primaryShadow: 'rgba(77, 182, 172, 0.25)',

  // Layout
  bg: '#121212',
  white: '#1e1e1e',
  card: '#1e1e1e',
  cardHover: '#2a2a2a',
  inputBg: '#252525',

  // Text
  text: '#e8e8e8',
  textMedium: '#aaa',
  textMuted: '#777',
  textLight: '#555',

  // Borders
  border: '#333',
  borderLight: '#2a2a2a',

  // Feedback (slightly more vivid for contrast on dark)
  success: '#4caf50',
  successBg: 'rgba(76, 175, 80, 0.12)',
  successBorder: 'rgba(76, 175, 80, 0.3)',
  error: '#ef5350',
  errorBg: 'rgba(239, 83, 80, 0.12)',
  errorBorder: 'rgba(239, 83, 80, 0.3)',
  warning: '#ff7043',

  // Exam accents
  toeflTeal: '#4db6ac',
  toeflTealLight: '#80cbc4',
  toeflRed: '#ef5350',
}

export const darkShadows = {
  card: '0 2px 8px rgba(0, 0, 0, 0.4)',
  cardHover: '0 8px 24px rgba(0, 0, 0, 0.5)',
  button: '0 4px 16px rgba(77, 182, 172, 0.25)',
}
