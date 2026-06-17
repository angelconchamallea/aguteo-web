import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="h-14 border-b border-line bg-white" />

      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex gap-2">
          {[...Array(4)].map((_, i) => <SkeletonText key={i} className="w-16 h-3" />)}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Galería */}
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-card" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-card" />)}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-pill" />
              <Skeleton className="h-5 w-16 rounded-pill" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-32" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-9 w-16 rounded-pill" />)}
            </div>
            <Skeleton className="h-12 w-full rounded-pill" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => <SkeletonText key={i} className="w-full" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
