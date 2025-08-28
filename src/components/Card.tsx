import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
}

export default function Card({ children, className = '', title, subtitle }: CardProps) {
  return (
    <div className={`bg-polaris-surface border border-polaris-border rounded-full shadow-polaris-card p-6 ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-polaris-text">{title}</h3>
          {subtitle && (
            <p className="text-sm text-polaris-text-subdued mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
