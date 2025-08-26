import type { ReactNode } from 'react'

type BadgeVariant = 'success' | 'warning' | 'critical' | 'info' | 'neutral'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export default function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const variantClasses = {
    success: 'bg-green-100 text-polaris-green border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    critical: 'bg-red-100 text-polaris-red border-red-200',
    info: 'bg-blue-100 text-polaris-blue border-blue-200',
    neutral: 'bg-gray-100 text-polaris-text-subdued border-polaris-border'
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-polaris text-xs font-medium border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
