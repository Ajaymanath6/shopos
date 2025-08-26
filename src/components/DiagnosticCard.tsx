import Button from './Button'
import Badge from './Badge'
import Card from './Card'

interface DiagnosticIssue {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning' | 'info'
  impact: string
  fixable: boolean
  estimatedTime?: string
}

interface DiagnosticCardProps {
  issue: DiagnosticIssue
  onFix?: (issueId: string) => void
  onPreview?: (issueId: string) => void
}

export default function DiagnosticCard({ issue, onFix, onPreview }: DiagnosticCardProps) {
  const severityConfig = {
    critical: { variant: 'critical' as const, icon: '🚨', color: 'text-polaris-red' },
    warning: { variant: 'warning' as const, icon: '⚠️', color: 'text-polaris-yellow' },
    info: { variant: 'info' as const, icon: 'ℹ️', color: 'text-polaris-blue' }
  }

  const config = severityConfig[issue.severity]

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <span className="text-lg">{config.icon}</span>
          <div>
            <h4 className="font-semibold text-polaris-text">{issue.title}</h4>
            <p className="text-sm text-polaris-text-subdued mt-1">{issue.description}</p>
          </div>
        </div>
        <Badge variant={config.variant}>{issue.severity.toUpperCase()}</Badge>
      </div>

      <div className="mb-4 p-3 bg-polaris-surface-subdued rounded-polaris">
        <p className="text-sm">
          <span className="font-medium text-polaris-text">Impact:</span>{' '}
          <span className="text-polaris-text-subdued">{issue.impact}</span>
        </p>
        {issue.estimatedTime && (
          <p className="text-sm mt-1">
            <span className="font-medium text-polaris-text">Fix time:</span>{' '}
            <span className="text-polaris-text-subdued">{issue.estimatedTime}</span>
          </p>
        )}
      </div>

      <div className="flex gap-2">
        {issue.fixable && onFix && (
          <Button 
            variant="success" 
            onClick={() => onFix(issue.id)}
            className="flex-1"
          >
            🤖 AI Fix Now
          </Button>
        )}
        {onPreview && (
          <Button 
            variant="secondary" 
            onClick={() => onPreview(issue.id)}
            className="flex-1"
          >
            👁️ Preview Fix
          </Button>
        )}
      </div>
    </Card>
  )
}
