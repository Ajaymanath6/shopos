type SeverityLevel = 'critical' | 'warning' | 'good'

interface StatusIndicatorProps {
  severity: SeverityLevel
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function StatusIndicator({ 
  severity, 
  label, 
  size = 'md', 
  className = '' 
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  }

  const severityConfig = {
    critical: { 
      color: 'bg-polaris-red', 
      textColor: 'text-polaris-red',
      pulse: 'animate-pulse'
    },
    warning: { 
      color: 'bg-polaris-yellow', 
      textColor: 'text-yellow-600',
      pulse: ''
    },
    good: { 
      color: 'bg-polaris-green', 
      textColor: 'text-polaris-green',
      pulse: ''
    }
  }

  const config = severityConfig[severity]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          ${config.color} 
          ${config.pulse}
          rounded-full 
          border-2 
          border-white 
          shadow-sm
        `}
      />
      {label && (
        <span className={`text-sm font-medium ${config.textColor}`}>
          {label}
        </span>
      )}
    </div>
  )
}
