"use client";

import useProducts from "@/hooks/useProducts";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductItem } from "@/components/Product";

export default function ProductsPage() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg text-muted-foreground">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500 text-lg">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left">
          All Products
        </h2>

        <Link href="/">
          <Button variant="ghost" className="cursor-pointer whitespace-nowrap">
            ← Back to Home
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
