import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Topbar */}
      <div className="h-8 bg-ink" />

      {/* Header */}
      <div className="border-b border-line bg-white px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <SkeletonText className="w-32 h-6" />
          <Skeleton className="h-9 flex-1 rounded-pill" />
          <SkeletonText className="w-16 h-5" />
          <SkeletonText className="w-16 h-5" />
        </div>
      </div>

      {/* CategoryBar */}
      <div className="border-b border-line bg-white px-4 py-2">
        <div className="mx-auto flex max-w-6xl gap-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-7 w-24 rounded-pill" />
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="px-4 py-10">
        <div className="mx-auto flex max-w-6xl gap-6">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-36 rounded-pill" />
              <Skeleton className="h-12 w-36 rounded-pill" />
            </div>
          </div>
          <div className="hidden w-64 space-y-3 md:block">
            <Skeleton className="h-28 rounded-card" />
            <Skeleton className="h-28 rounded-card" />
          </div>
        </div>
      </div>

      {/* Etapas */}
      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-card" />
            ))}
          </div>
        </div>
      </div>

      {/* Productos destacados */}
      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <Skeleton className="h-8 w-56" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[...Array(8)].map((_, i) => (
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
  )
}
