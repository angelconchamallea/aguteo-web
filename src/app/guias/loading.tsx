import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function GuiasLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <SkeletonText className="mb-2 h-9 w-48" />
      <SkeletonText className="mb-8 w-64" />
      <div className="mb-8 flex gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-pill" />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-card border border-line bg-white">
            <Skeleton className="aspect-video w-full" />
            <div className="space-y-2 p-4">
              <SkeletonText className="h-5 w-3/4" />
              <SkeletonText className="w-full" />
              <SkeletonText className="w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
