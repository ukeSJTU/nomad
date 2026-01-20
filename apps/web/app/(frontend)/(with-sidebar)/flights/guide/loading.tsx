import { Skeleton } from "@ukesjtu/nomad-ui/components/primitives/skeleton";

export default function AirportGuideLoading() {
  return (
    <div className="container mx-auto pb-4 px-4 flex flex-col lg:flex-row gap-6 min-h-screen bg-background">
      <div className="flex-1">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title */}
        <Skeleton className="h-10 w-32 mb-6" />

        {/* Domestic Airports Section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-24 mb-4" />
          <div className="bg-card p-6 border border-border rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* International Airports Section */}
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="bg-card p-6 border border-border rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <aside className="w-full lg:w-[280px] space-y-4">
        {/* Boarding Process Card */}
        <div className="bg-card border border-accent p-4 rounded-md">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Weather Card */}
        <div className="bg-accent/50 border border-accent p-4 rounded-md">
          <Skeleton className="h-5 w-20 mb-4" />
          <div className="flex justify-between mb-4">
            <div>
              <Skeleton className="h-6 w-16 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div>
              <Skeleton className="h-7 w-20 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </aside>
    </div>
  );
}
