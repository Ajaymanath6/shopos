import Card from './Card'
import StatusIndicator from './StatusIndicator'

interface HealthScoreCardProps {
  score: number // 0-100
  totalIssues: number
  criticalIssues: number
  className?: string
}

export default function HealthScoreCard({ 
  score, 
  totalIssues, 
  criticalIssues, 
  className = '' 
}: HealthScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-polaris-green'
    if (score >= 60) return 'text-polaris-yellow'
    return 'text-polaris-red'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Attention'
  }

  const getSeverity = (score: number) => {
    if (score >= 80) return 'good' as const
    if (score >= 60) return 'warning' as const
    return 'critical' as const
  }

  return (
    <Card className={`text-center ${className}`}>
      <div className="space-y-6">
        {/* Main Score Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3">
            <StatusIndicator severity={getSeverity(score)} size="lg" />
            <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-2xl text-polaris-text-subdued">/100</span>
          </div>
          <p className={`text-lg font-semibold ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </p>
        </div>

        {/* Issues Summary */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-polaris-border">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-polaris-text">{totalIssues}</p>
            <p className="text-sm text-polaris-text-subdued">Total Issues</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-polaris-red">{criticalIssues}</p>
            <p className="text-sm text-polaris-text-subdued">Critical</p>
          </div>
        </div>

        {/* Health Status Message */}
        <div className="p-4 bg-polaris-surface-subdued rounded-polaris">
          <p className="text-sm text-polaris-text-subdued">
            {score >= 80 
              ? "Your store is performing well! Minor optimizations available."
              : score >= 60
              ? "Good foundation with room for improvement."
              : "Significant opportunities to boost performance and revenue."
            }
          </p>
        </div>
      </div>
    </Card>
  )
}
