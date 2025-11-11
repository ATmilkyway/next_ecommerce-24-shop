"use client";

import { useEffect, useState, useCallback } from "react";
import { CanceledError } from "axios";
import apiClient from "@/lib/services/apiClient";
import { Product, ProductResponse } from "@/types/product";

const PAGE_LIMIT = 20;

const useProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    const controller = new AbortController();

    try {
      const res = await apiClient.get<ProductResponse>("/products", {
        params: { skip, limit: PAGE_LIMIT },
        signal: controller.signal,
      });

      setData((prev) => [...prev, ...res.data.products]);
      setTotal(res.data.total);
      setSkip((prev) => prev + PAGE_LIMIT);
      setHasMore(skip + PAGE_LIMIT < res.data.total);
    } catch (err: any) {
      if (err instanceof CanceledError) return;
      setError(err.message);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [skip, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return { data, isLoading, error, fetchProducts, hasMore };
};

export default useProducts;
