"use client";

import { useEffect, useRef, useState } from "react";
import useProducts from "@/hooks/useProducts";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/components/Product";
import ProductSkeleton from "@/components/Product/ProductSkeleton";

export default function ProductsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data, isLoading, error, fetchProducts, hasMore } = useProducts(search);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, hasMore, fetchProducts]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
          All Products
        </h1>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md w-60"
          />
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="cursor-pointer whitespace-nowrap"
          >
            ← Go Back
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {error && <div className="text-center text-red-500 py-4">{error}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}

        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)}
      </div>

      <div ref={loaderRef} className="h-1" />
    </div>
  );
}
