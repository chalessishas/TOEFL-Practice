import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', padding: 32, textAlign: 'center',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 24, maxWidth: 360 }}>
            {this.state.error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => {
              this.setState({ error: null })
              window.location.href = '/'
            }}
            style={{
              padding: '10px 24px', borderRadius: 8, border: 'none',
              background: '#00695c', color: 'white', fontSize: 14,
              fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Go back to Home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
