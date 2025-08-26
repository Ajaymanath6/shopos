import type { InputHTMLAttributes } from 'react'

type InputState = 'idle' | 'loading' | 'error'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState
  errorMessage?: string
  label?: string
}

export default function Input({ 
  state = 'idle', 
  errorMessage, 
  label, 
  className = '', 
  ...rest 
}: InputProps) {
  const baseClasses = 'w-full px-3 py-2 border rounded-polaris focus:outline-none focus:ring-2 transition-colors'
  
  const stateClasses = {
    idle: 'border-polaris-border focus:ring-polaris-interactive',
    loading: 'border-polaris-border bg-polaris-surface-subdued cursor-wait',
    error: 'border-polaris-red focus:ring-polaris-red'
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-polaris-text">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`${baseClasses} ${stateClasses[state]} ${className}`}
          disabled={state === 'loading'}
          {...rest}
        />
        {state === 'loading' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-polaris-interactive"></div>
          </div>
        )}
      </div>
      {state === 'error' && errorMessage && (
        <p className="text-sm text-polaris-red">{errorMessage}</p>
      )}
    </div>
  )
}
