"use client";

import useProducts from "@/hooks/useProducts";
import { ProductItem } from "./ProductItem";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductSkeleton from "./ProductSkeleton"; 

export function ProductGrid() {
  const { data, isLoading, error } = useProducts();

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load products.
      </div>
    );
  }

  const visibleProducts = data ? data.slice(0, 9) : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
          You Might Also Like
        </h2>
        <Link href="/products">
          <Button variant="ghost" className="cursor-pointer whitespace-nowrap">
            See All
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : visibleProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
