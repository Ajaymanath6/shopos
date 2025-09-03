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
            <span className="text-sm font-medium text-gray-900">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-600">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: `${clampedProgress}%`,
            backgroundColor: '#10B981' // Green
          }}
        />
      </div>
    </div>
  )
}
