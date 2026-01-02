import { Skeleton } from "@nomad/ui/components/skeleton";

export default function AirportDetailLoading() {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-background">
      {/* Breadcrumb Skeleton */}
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Title */}
      <Skeleton className="h-8 w-48 mb-6" />

      {/* Tabs */}
      <div className="w-full">
        <div className="flex gap-4 mb-6 border-b border-border pb-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {/* Content Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />

              <div className="pt-6 space-y-4">
                <Skeleton className="h-6 w-40 mb-3" />
                <div className="bg-accent/50 border border-accent p-4 rounded-md">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[...Array(12)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-20" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="bg-accent/50 border border-accent p-4 rounded-md">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[...Array(12)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-24" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <aside className="w-full lg:w-[280px]">
            <div className="bg-accent/50 border-accent p-4 rounded-md">
              <Skeleton className="h-5 w-20 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
