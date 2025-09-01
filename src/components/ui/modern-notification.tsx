import { RiCloseLine, RiArrowRightSLine } from '@remixicon/react'

interface ModernNotificationProps {
  title: string
  message: string
  timestamp: string
  type: 'success' | 'info' | 'warning'
  onDismiss?: () => void
  onAction?: () => void
  actionLabel?: string
}

function ModernNotification({
  title,
  message,
  timestamp,
  type = 'info',
  onDismiss,
  onAction,
  actionLabel = "Go to Task"
}: ModernNotificationProps) {
  const getStatusColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'warning':
        return 'bg-amber-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div 
      className="relative rounded-2xl border border-white/40 backdrop-blur-xl p-4 shadow-lg"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        boxShadow: `
          0 4px 20px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.6)
        `
      }}
    >
      <div className="flex items-start gap-3">
        {/* Status Indicator */}
        <div className="flex-shrink-0 mt-1">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
                {title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {onAction && (
                <button
                  onClick={onAction}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-white/60 rounded-lg transition-colors"
                >
                  <span>{actionLabel}</span>
                  <RiArrowRightSLine size={12} />
                </button>
              )}
              
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-white/60 rounded-lg transition-colors"
                >
                  <RiCloseLine size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <div className="mt-2">
            <span className="text-xs text-gray-400">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ModernNotification }
