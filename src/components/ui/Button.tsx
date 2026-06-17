'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'soft'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  softColor?: string
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
}

const variantClasses: Record<ButtonVariant, string> = {
  // primary = CTA de compra exclusivo (rose). Regla dura: no usarlo fuera de contextos de compra.
  primary:   'bg-rose text-white font-display font-bold hover:opacity-90 active:scale-95',
  secondary: 'bg-white border border-line text-ink font-sans hover:bg-cream active:scale-95',
  soft:      'font-sans hover:opacity-90 active:scale-95',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', loading = false, softColor, className = '', children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-pill transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/50 disabled:opacity-50 disabled:cursor-not-allowed'

    const softStyle =
      variant === 'soft' && softColor
        ? { backgroundColor: softColor + '33', color: softColor }
        : {}

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        style={softStyle}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
