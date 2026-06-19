import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function GuideLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <SkeletonText className="mb-6 w-40" />
      <Skeleton className="mb-4 h-6 w-24 rounded-pill" />
      <SkeletonText className="mb-2 h-8 w-3/4" />
      <SkeletonText className="mb-6 h-8 w-1/2" />
      <Skeleton className="mb-8 aspect-video w-full rounded-card" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <SkeletonText key={i} className={i % 3 === 2 ? 'w-2/3' : 'w-full'} />
        ))}
      </div>
    </div>
  )
}
