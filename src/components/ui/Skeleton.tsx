export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-card bg-line ${className}`} />
}

export function SkeletonText({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-pill bg-line h-4 ${className}`} />
}
