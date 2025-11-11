"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <Card className="relative flex flex-col h-full rounded-lg overflow-hidden">
      {/* Favorite placeholder */}
      <div className="absolute top-2 right-2 z-10 p-2">
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>

      {/* Image placeholder */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden">
        <Skeleton className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <CardContent className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <Skeleton className="w-3/4 h-4 rounded" />
        <Skeleton className="w-1/2 h-3 rounded" />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-1/4 h-3 rounded" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-2 sm:p-3 mt-auto">
        <Skeleton className="w-full h-10 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
