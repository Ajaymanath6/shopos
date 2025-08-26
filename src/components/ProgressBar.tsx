interface ProgressBarProps {
  progress: number // 0-100
  label?: string
  showPercentage?: boolean
  className?: string
}

export default function ProgressBar({ 
  progress, 
  label, 
  showPercentage = true, 
  className = '' 
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm font-medium text-polaris-text">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-polaris-text-subdued">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-polaris-surface-subdued rounded-full h-2 border border-polaris-border">
        <div 
          className="bg-polaris-interactive h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}
