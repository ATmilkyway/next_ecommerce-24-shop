"use client";

import useCategory from "@/hooks/useCategories";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryItem } from "@/components/Category";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesPage() {
  const { data, isLoading, error } = useCategory();

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <Skeleton className="w-1/2 h-10 sm:h-12 rounded" />
          <Skeleton className="w-32 h-10 rounded" />
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 sm:gap-6 mt-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-24 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-red-500">
        Failed to load categories.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
          All Categories
        </h2>
        <Link href="/">
          <Button variant="ghost" className="cursor-pointer whitespace-nowrap">
            Back to Home
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 sm:gap-6 mt-4">
        {data?.map((category) => (
          <CategoryItem key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
