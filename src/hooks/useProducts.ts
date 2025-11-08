// src/hooks/useProducts.ts
"use client";
import apiClient from "@/lib/apiClient";
import { FeatchedProducts, Product } from "@/types";
import { useEffect, useState, useCallback } from "react";

const useProducts = (limit = 10, searchQuery = "", category = "") => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      let url = `/products?limit=${limit}&skip=${skip}`;
      if (searchQuery) url = `/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
      if (category) url = `/products/category/${category}?limit=${limit}&skip=${skip}`;

      const response = await apiClient.get<FeatchedProducts>(url);

      if (skip === 0) {
        setProducts(response.data.products);
      } else {
        setProducts((prev) => [...prev, ...response.data.products]);
      }

      setSkip((prev) => prev + limit);
      setHasMore(skip + limit < response.data.total);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [limit, skip, searchQuery, category, hasMore]);

  // refetch whenever searchQuery or category changes
  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    setProducts([]);
    fetchProducts();
  }, [searchQuery, category]);

  return { products, fetchProducts, loading, error, hasMore };
};

export default useProducts;
