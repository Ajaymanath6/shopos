import CanvasLanding from '../components/CanvasLanding'
import ErrorBoundary from '../components/ErrorBoundary'

export default function LandingPage() {
  return (
    <ErrorBoundary>
      <CanvasLanding />
    </ErrorBoundary>
  )
}
