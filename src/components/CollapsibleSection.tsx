import { useState, type ReactNode } from 'react'

interface CollapsibleSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

export default function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false, 
  className = '' 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`border border-polaris-border rounded-polaris bg-polaris-surface ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-polaris-surface-subdued transition-colors"
      >
        <span className="font-medium text-polaris-text">{title}</span>
        <svg
          className={`w-5 h-5 text-polaris-text-subdued transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t border-polaris-border">
          <div className="pt-3">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
