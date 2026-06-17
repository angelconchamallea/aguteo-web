type BadgeVariant = 'nuevo' | 'descuento' | 'etapa' | 'agotado'

interface BadgeProps {
  variant: BadgeVariant
  label?: string
  discountPercent?: number
  rotate?: 'left' | 'right'
  colorHex?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  nuevo:    'bg-butter text-butter-deep',
  descuento:'bg-coral text-white',
  etapa:    'text-white',
  agotado:  'bg-muted text-white',
}

export default function Badge({ variant, label, discountPercent, rotate = 'right', colorHex }: BadgeProps) {
  const rotationClass = rotate === 'left' ? '-rotate-2' : 'rotate-3'

  const style = variant === 'etapa' && colorHex ? { backgroundColor: colorHex } : {}

  const text =
    variant === 'descuento' && discountPercent != null
      ? `-${discountPercent}%`
      : label ?? variant.toUpperCase()

  return (
    <span
      className={`inline-block rounded-card px-2 py-0.5 text-xs font-bold font-display ${rotationClass} ${variantStyles[variant]}`}
      style={style}
    >
      {text}
    </span>
  )
}
