import { Skeleton } from "@nomad/ui/components/primitives/skeleton";

export default function FlightsLoading() {
  return (
    <div className="space-y-8">
      {/* Search Form Skeleton */}
      <div className="space-y-6 rounded-lg border bg-card p-6">
        {/* Trip Type Tabs */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Location and Date Inputs */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* From/To Cities */}
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Dates */}
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Seat Class and Search Button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Skeleton className="h-12 w-full sm:w-48" />
          <Skeleton className="h-12 w-full sm:w-32" />
        </div>
      </div>

      {/* Search History Section */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* History Cards */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-64 rounded-lg border bg-card p-4 space-y-3"
            >
              {/* Route */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-6 w-16" />
              </div>
              {/* Dates */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              {/* Class and Action */}
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
