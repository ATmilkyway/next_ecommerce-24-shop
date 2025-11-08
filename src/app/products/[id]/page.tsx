"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleProductPage() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    apiClient
      .get<Product>(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [productId]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">
        {loading ? <Skeleton className="h-8 w-3/4" /> : product?.title}
      </h1>

      {/* Image */}
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            src={product?.thumbnail || product?.images[0]}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-3">
        <p className="text-gray-700">
          {loading ? <Skeleton className="h-4 w-full" /> : product?.description}
        </p>
        <p className="text-lg font-semibold">
          {loading ? <Skeleton className="h-6 w-24" /> : `Price: $${product?.price}`}
        </p>
        <p className="text-gray-500">
          {loading ? <Skeleton className="h-4 w-32" /> : `Category: ${product?.category}`}
        </p>
        <p className="text-yellow-500">
          {loading ? <Skeleton className="h-4 w-20" /> : `Rating: ${product?.rating} ⭐`}
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
