"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, ProductResponse } from "@/types/product";

const PAGE_LIMIT = 20;

const useProducts = (search: string = "") => {
  const [data, setData] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);

    try {
      const url = search
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${PAGE_LIMIT}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${PAGE_LIMIT}&skip=${skip}`;

      const res = await fetch(url);
      const json: ProductResponse = await res.json();

      setData(prev => (skip === 0 ? json.products : [...prev, ...json.products]));
      setTotal(json.total);
      setSkip(prev => prev + PAGE_LIMIT);
      setHasMore(skip + PAGE_LIMIT < json.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, skip, hasMore]);

  // Reset when search changes
  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    setData([]);
    fetchProducts();
  }, [search]);

  return { data, isLoading, error, fetchProducts, hasMore };
};

export default useProducts;
