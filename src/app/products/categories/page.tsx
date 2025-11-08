"use client";

import useCategories from "@/hooks/useCategories";
import Link from "next/link";
import { Loader2, Grid3X3 } from "lucide-react";

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export type FeatchedCategories = Category[];

export default function CategoriesPage() {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-10">
        <Grid3X3 className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
      </div>

      {/* No Categories */}
      {categories.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No categories found.</p>
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products/categories/${category.slug}`}
            className="group relative border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center bg-background hover:bg-primary/10 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Grid3X3 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-semibold text-foreground group-hover:text-primary">
              {category.name}
            </h2>
            <span className="text-xs text-muted-foreground mt-1">
              /{category.slug}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
