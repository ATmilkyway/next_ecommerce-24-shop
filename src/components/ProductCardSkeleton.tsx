"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-48 bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-4 w-1/3 rounded" />
        <Skeleton className="h-5 w-1/4 rounded mt-2" />
      </div>

      <div className="border-t p-4 flex justify-between items-center text-sm text-gray-500">
        <Skeleton className="h-4 w-1/4 rounded" />
        <Skeleton className="h-4 w-1/6 rounded" />
      </div>
    </div>
  );
}
