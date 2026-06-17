import StageCard from '@/components/ui/StageCard'
import type { AgeStage } from '@/types/api'

interface StageGridProps {
  stages: AgeStage[]
}

export default function StageGrid({ stages }: StageGridProps) {
  if (stages.length === 0) return null

  return (
    <section id="etapas" className="px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
          ¿Qué etapa vive tu bebé?
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stages.map((stage) => (
            <StageCard key={stage.slug} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  )
}
