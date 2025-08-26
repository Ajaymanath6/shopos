import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import StatusIndicator from '../components/StatusIndicator'

interface Issue {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning'
  impact: string
  estimatedTime: string
}

interface FixData {
  expectedImprovement: string
  changes: string[]
}

export default function ConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const storeUrl = location.state?.storeUrl
  const diagnosticData = location.state?.diagnosticData
  const fixedIssue: Issue = location.state?.fixedIssue
  const fixData: FixData = location.state?.fixData

  useEffect(() => {
    // Redirect if no data provided
    if (!fixedIssue || !storeUrl) {
      navigate('/')
    }
  }, [fixedIssue, storeUrl, navigate])

  if (!fixedIssue || !storeUrl) {
    return null
  }

  const handleFixAnother = () => {
    navigate('/diagnostics/report', {
      state: { storeUrl, diagnosticData }
    })
  }

  const handleNewScan = () => {
    navigate('/')
  }



  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-polaris-green rounded-full flex items-center justify-center">
            <span className="text-3xl text-white">✓</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-polaris-text mb-2">
          Fix Successfully Deployed! 🎉
        </h1>
        <p className="text-lg text-polaris-text-subdued">
          Your store performance has been improved
        </p>
      </div>

      {/* Fix Summary */}
      <Card className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-polaris-text">Fixed Issue</h3>
            <Badge variant="success">DEPLOYED</Badge>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-polaris">
            <StatusIndicator 
              severity="good" 
              size="md" 
            />
            <div className="flex-1">
              <h4 className="font-medium text-polaris-text">{fixedIssue.title}</h4>
              <p className="text-sm text-polaris-text-subdued mt-1">{fixedIssue.description}</p>
              
              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-polaris-text">Previous Impact</p>
                  <p className="text-sm text-polaris-text-subdued">{fixedIssue.impact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-polaris-text">Expected Improvement</p>
                  <p className="text-sm text-polaris-green font-medium">{fixData?.expectedImprovement}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* What Happened */}
      <Card title="What We Fixed" className="max-w-2xl mx-auto">
        <div className="space-y-3">
          {fixData?.changes.map((change, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-polaris-green font-bold">✓</span>
              <p className="text-sm text-polaris-text">{change}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="max-w-2xl mx-auto">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-polaris-text mb-2">
              🚀 What's Next?
            </h3>
            <p className="text-polaris-text-subdued">
              Your fix is now live! Here's what you can do next:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="p-4 border border-polaris-border rounded-polaris">
              <h4 className="font-medium text-polaris-text mb-2">📈 Monitor Results</h4>
              <p className="text-sm text-polaris-text-subdued">
                Check your analytics in 24-48 hours to see the improvement in action.
              </p>
            </div>
            <div className="p-4 border border-polaris-border rounded-polaris">
              <h4 className="font-medium text-polaris-text mb-2">🔧 Fix More Issues</h4>
              <p className="text-sm text-polaris-text-subdued">
                Continue optimizing your store with the remaining {(diagnosticData?.totalIssues || 1) - 1} issues.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleFixAnother}
              className="flex-1"
            >
              🔧 Fix Another Issue
            </Button>
            <Button
              variant="secondary"
              onClick={handleNewScan}
              className="flex-1"
            >
              🔍 Scan Another Store
            </Button>
          </div>
        </div>
      </Card>

      {/* Success Stats */}
      <Card className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="text-center space-y-3">
          <h4 className="font-semibold text-polaris-text">🎯 Impact Summary</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-polaris-green">1</p>
              <p className="text-sm text-polaris-text-subdued">Issue Fixed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-polaris-blue">{fixedIssue.estimatedTime}</p>
              <p className="text-sm text-polaris-text-subdued">Deploy Time</p>
            </div>
          </div>
          <p className="text-sm text-polaris-text-subdued">
            Changes are now live on {storeUrl}
          </p>
        </div>
      </Card>

      {/* Footer Message */}
      <div className="text-center">
        <p className="text-sm text-polaris-text-subdued">
          Need help? All changes can be reverted if needed. Contact support for assistance.
        </p>
      </div>
    </div>
  )
}
