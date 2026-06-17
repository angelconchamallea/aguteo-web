import type { AgeStage } from '@/types/api'
import Link from 'next/link'

interface StageCardProps {
  stage: AgeStage
}

export default function StageCard({ stage }: StageCardProps) {
  const softBg = stage.color_token + '33'
  const deepText = stage.color_token

  return (
    <Link
      href={`/tienda?stage=${stage.slug}`}
      className="flex flex-col items-center justify-center gap-2 rounded-card p-5 text-center transition-transform hover:scale-105 active:scale-95"
      style={{ backgroundColor: softBg }}
    >
      <span
        className="text-3xl font-display font-bold"
        style={{ color: deepText }}
      >
        {stage.name}
      </span>
      <span className="text-sm font-sans" style={{ color: deepText }}>
        {stage.tagline}
      </span>
    </Link>
  )
}
