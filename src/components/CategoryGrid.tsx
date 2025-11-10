"use client";

import useCategory from "@/hooks/useCategory";
import { Separator } from "@radix-ui/react-separator";
import { CategoryItem } from "./CategoryItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CategoryGrid() {
  const { data } = useCategory();

  // Show only first 9 categories
  const visibleCategories = data.slice(0, 9);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:mb-12">
          Shop by Category
        </h1> */}
        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
          {" "}
          Shop by Category
        </h2>
        <Link href="/products/categories">
          <Button variant="ghost" className="cursor-pointer whitespace-nowrap">
            See All
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      {/* Responsive grid: 3 cols mobile, 5 cols tablet, 9 cols lg+ */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 sm:gap-6 mt-4">
        {visibleCategories.map((category) => (
          <CategoryItem key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
