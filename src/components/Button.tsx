import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'success'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  loading?: boolean
}

export default function Button({ variant = 'primary', loading = false, className = '', children, ...rest }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-polaris px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:shadow-polaris-button-focus'
  
  const variantClasses = {
    primary: 'bg-polaris-interactive text-white hover:bg-polaris-blue',
    secondary: 'bg-polaris-surface border border-polaris-border text-polaris-text hover:bg-polaris-surface-subdued',
    destructive: 'bg-polaris-red text-white hover:bg-red-700',
    success: 'bg-polaris-green text-white hover:bg-green-700'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${loading ? 'opacity-75 cursor-wait' : ''} ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      )}
      {children}
    </button>
  )
}


