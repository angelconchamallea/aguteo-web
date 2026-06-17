import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function TiendaLoading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="h-14 border-b border-line bg-white" />
      <div className="h-10 border-b border-line bg-white" />

      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
        <SkeletonText className="mb-6 h-8 w-48" />

        {/* Top bar */}
        <div className="mb-4 flex gap-3">
          <Skeleton className="h-9 w-40 rounded-pill" />
          <Skeleton className="h-9 w-24 rounded-pill" />
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden w-52 shrink-0 space-y-4 lg:block">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <SkeletonText className="w-24 h-3" />
                {[...Array(3)].map((_, j) => <SkeletonText key={j} className="w-full h-7 rounded-pill" />)}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-square w-full rounded-card" />
                  <SkeletonText className="w-3/4" />
                  <SkeletonText className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
