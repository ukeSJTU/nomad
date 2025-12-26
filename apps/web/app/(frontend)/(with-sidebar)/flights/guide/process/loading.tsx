import { Skeleton } from "@/components/ui/skeleton";

export default function BoardingProcessLoading() {
  return (
    <div className="container mx-auto px-4 min-h-screen bg-background pb-6">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Header */}
      <div className="mb-6 rounded-lg bg-neutral-100 p-4 border border-neutral-200">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Process Groups */}
      <div className="space-y-8 max-w-7xl mx-auto">
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            {/* Group Title */}
            <div className="flex items-center gap-3 px-4 py-3">
              <Skeleton className="w-6 h-6" />
              <div>
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Process Images */}
            <div className="space-y-6">
              {[...Array(2)].map((_, imgIndex) => (
                <Skeleton
                  key={imgIndex}
                  className="w-full h-[200px] md:h-[300px]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
