import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'success'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export default function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-polaris px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:shadow-polaris-button-focus'
  
  const variantClasses = {
    primary: 'bg-polaris-interactive text-white hover:bg-polaris-blue',
    secondary: 'bg-polaris-surface border border-polaris-border text-polaris-text hover:bg-polaris-surface-subdued',
    destructive: 'bg-polaris-red text-white hover:bg-red-700',
    success: 'bg-polaris-green text-white hover:bg-green-700'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    />
  )
}


