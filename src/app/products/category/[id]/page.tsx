"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductSkeleton from "@/components/Product/ProductSkeleton";
import { ProductItem } from "@/components/Product";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = Array.isArray(params.id) ? params.id[0] : params.id; // ensure it's a string

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    setIsLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/category/${categoryId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
          Products in "{categoryId}"
        </h2>
        <Link href="/products">
          <Button variant="ghost" className="cursor-pointer whitespace-nowrap">
            Back to All Products
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">
          No products found in this category.
        </p>
      )}
    </div>
  );
}
