import React from 'react'

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error?: Error
  info?: React.ErrorInfo
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ info })
    // Optionally send to monitoring here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <h1 style={{ fontSize: 20, marginBottom: 8, color: '#b91c1c' }}>Something went wrong rendering this page.</h1>
          {this.state.error && (
            <pre style={{ whiteSpace: 'pre-wrap', background: '#fee2e2', border: '1px solid #fecaca', padding: 12, borderRadius: 8, color: '#7f1d1d' }}>
              {this.state.error.message}
            </pre>
          )}
          {this.state.info && (
            <details style={{ marginTop: 12 }}>
              <summary style={{ cursor: 'pointer' }}>Stack trace</summary>
              <pre style={{ whiteSpace: 'pre-wrap', background: '#f3f4f6', border: '1px solid #e5e7eb', padding: 12, borderRadius: 8, color: '#111827' }}>
                {this.state.info.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }
    return this.props.children
  }
}


