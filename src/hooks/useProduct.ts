"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";

const useProduct = (id?: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const json: Product = await res.json();
      setProduct(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch on mount or when id changes
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, isLoading, error, fetchProduct };
};

export default useProduct;
