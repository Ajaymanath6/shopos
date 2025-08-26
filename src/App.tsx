import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import ScanningPage from './pages/ScanningPage'
import HealthReportPage from './pages/HealthReportPage'
import FixPage from './pages/FixPage'
import ConfirmationPage from './pages/ConfirmationPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diagnostics/scanning" element={
          <MainLayout>
            <div className="max-w-4xl mx-auto my-10 px-4">
              <ScanningPage />
            </div>
          </MainLayout>
        } />
        <Route path="/diagnostics/report" element={
          <MainLayout>
            <div className="max-w-4xl mx-auto my-10 px-4">
              <HealthReportPage />
            </div>
          </MainLayout>
        } />
        <Route path="/diagnostics/fix/:issueId" element={
          <MainLayout>
            <div className="max-w-4xl mx-auto my-10 px-4">
              <FixPage />
            </div>
          </MainLayout>
        } />
        <Route path="/diagnostics/confirmed" element={
          <MainLayout>
            <div className="max-w-4xl mx-auto my-10 px-4">
              <ConfirmationPage />
            </div>
          </MainLayout>
        } />
      </Routes>
    </>
  )
}

export default App
