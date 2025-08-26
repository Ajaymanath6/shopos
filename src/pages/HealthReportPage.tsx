import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import HealthScoreCard from '../components/HealthScoreCard'
import Card from '../components/Card'
import StatusIndicator from '../components/StatusIndicator'
import Button from '../components/Button'
import CollapsibleSection from '../components/CollapsibleSection'
import Badge from '../components/Badge'

interface Issue {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning'
  impact: string
  estimatedTime: string
}

interface DiagnosticData {
  score: number
  totalIssues: number
  criticalIssues: number
  topIssues: Issue[]
  allIssues: Issue[]
}

export default function HealthReportPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const storeUrl = location.state?.storeUrl
  const diagnosticData: DiagnosticData = location.state?.diagnosticData

  useEffect(() => {
    // Redirect if no diagnostic data
    if (!diagnosticData || !storeUrl) {
      navigate('/')
    }
  }, [diagnosticData, storeUrl, navigate])

  if (!diagnosticData || !storeUrl) {
    return null
  }

  const handleFixIssue = (issueId: string) => {
    navigate(`/diagnostics/fix/${issueId}`, {
      state: {
        storeUrl,
        diagnosticData,
        issue: diagnosticData.allIssues.find(issue => issue.id === issueId)
      }
    })
  }

  const getSeverityType = (severity: string) => {
    return severity === 'critical' ? 'critical' as const : 'warning' as const
  }

  const totalPotentialRevenue = diagnosticData.allIssues
    .map(issue => {
      const match = issue.impact.match(/\$([0-9,]+)/g)
      return match ? parseInt(match[0].replace(/[$,]/g, '')) : 0
    })
    .reduce((sum, amount) => sum + amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-polaris-text mb-2">
          Diagnostic Report for {storeUrl}
        </h1>
        <p className="text-polaris-text-subdued">
          Found {diagnosticData.totalIssues} issues that can be fixed instantly
        </p>
      </div>

      {/* Health Score */}
      <HealthScoreCard
        score={diagnosticData.score}
        totalIssues={diagnosticData.totalIssues}
        criticalIssues={diagnosticData.criticalIssues}
        className="max-w-md mx-auto"
      />

      {/* Revenue Impact Summary */}
      <Card className="bg-green-50 border-green-200 max-w-2xl mx-auto">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-polaris-text mb-2">
            💰 Potential Monthly Revenue Recovery
          </h3>
          <p className="text-3xl font-bold text-polaris-green mb-2">
            ${totalPotentialRevenue.toLocaleString()}
          </p>
          <p className="text-polaris-text-subdued mb-4">
            Fix all critical issues to unlock this revenue potential
          </p>
          <Button 
            variant="success" 
            className="px-8"
            onClick={() => handleFixIssue(diagnosticData.topIssues[0].id)}
          >
            🚀 Start with Highest Impact Fix
          </Button>
        </div>
      </Card>

      {/* Top Priority Issues */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-polaris-text">
          🔥 Top Priority Issues
        </h2>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {diagnosticData.topIssues.map(issue => (
            <Card key={issue.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <StatusIndicator 
                      severity={getSeverityType(issue.severity)} 
                      size="md" 
                    />
                    <div>
                      <h4 className="font-semibold text-polaris-text">{issue.title}</h4>
                      <p className="text-sm text-polaris-text-subdued mt-1">{issue.description}</p>
                    </div>
                  </div>
                  <Badge variant={issue.severity === 'critical' ? 'critical' : 'warning'}>
                    {issue.severity.toUpperCase()}
                  </Badge>
                </div>

                <div className="p-3 bg-polaris-surface-subdued rounded-polaris">
                  <p className="text-sm">
                    <span className="font-medium text-polaris-text">Impact:</span>{' '}
                    <span className="text-polaris-text-subdued">{issue.impact}</span>
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium text-polaris-text">Fix time:</span>{' '}
                    <span className="text-polaris-text-subdued">{issue.estimatedTime}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="primary" 
                    onClick={() => handleFixIssue(issue.id)}
                    className="flex-1"
                  >
                    🤖 Fix Now
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleFixIssue(issue.id)}
                    className="flex-1"
                  >
                    👁️ Preview Fix
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* All Issues (Collapsible) */}
      <CollapsibleSection 
        title={`All Issues (${diagnosticData.allIssues.length})`}
        defaultOpen={false}
      >
        <div className="space-y-3">
          {diagnosticData.allIssues.map(issue => (
            <div 
              key={issue.id} 
              className="flex items-center justify-between p-4 border border-polaris-border rounded-polaris bg-polaris-surface hover:bg-polaris-surface-subdued transition-colors"
            >
              <div className="flex items-center gap-3">
                <StatusIndicator 
                  severity={getSeverityType(issue.severity)} 
                  size="sm" 
                />
                <div>
                  <h5 className="font-medium text-polaris-text">{issue.title}</h5>
                  <p className="text-sm text-polaris-text-subdued">{issue.impact}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-polaris-text-subdued">
                  {issue.estimatedTime}
                </span>
                <Button 
                  variant="secondary" 
                  onClick={() => handleFixIssue(issue.id)}
                  className="px-3 py-1 text-xs"
                >
                  Fix
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Next Steps */}
      <Card className="max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-polaris-text">
            🎯 Recommended Next Steps
          </h3>
          <ol className="text-left space-y-2 text-sm text-polaris-text-subdued">
            <li>1. Start with the highest revenue impact issues (critical priority)</li>
            <li>2. Preview each fix to see exactly what will change</li>
            <li>3. Deploy fixes one by one to monitor results</li>
            <li>4. Re-scan your store in 24-48 hours to measure improvements</li>
          </ol>
          <Button 
            variant="primary"
            onClick={() => handleFixIssue(diagnosticData.topIssues[0].id)}
          >
            🚀 Start Fixing Issues
          </Button>
        </div>
      </Card>
    </div>
  )
}
