"use client";

import useProducts from "@/hooks/useProducts";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/components/Product";
import ProductSkeleton from "@/components/Product/ProductSkeleton"; // import skeleton

export default function ProductsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useProducts();

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load products.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
          All Products
        </h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="cursor-pointer whitespace-nowrap"
        >
          ← Go Back
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
          : data.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
