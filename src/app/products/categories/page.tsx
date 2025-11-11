"use client";

import useCategory from "@/hooks/useCategory";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryItem } from "@/components/Category";

export default function CategoriesPage() {
  const { data, isLoading, error } = useCategory();

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
        Loading categories...
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
