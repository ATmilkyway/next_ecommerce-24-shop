'use client';
import apiClient from "@/lib/apiClient";
import { FeatchedProducts, Product } from "@/types";
import { useEffect, useState } from "react";

const useProducts = (limit = 10) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await apiClient.get<FeatchedProducts>(
        `/products?limit=${limit}&skip=${skip}`
      );
      setProducts(prev => [...prev, ...response.data.products]);
      setSkip(prev => prev + limit);
      setHasMore(skip + limit < response.data.total);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, fetchProducts, loading, error, hasMore };
};

export default useProducts;
