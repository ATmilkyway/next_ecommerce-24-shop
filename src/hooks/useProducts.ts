"use client";
import apiClient from "@/lib/apiClient";
import { FeatchedProducts, Product } from "@/types";
import { useEffect, useState } from "react";
const useProducts = (limit = 10, searchQuery = "") => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const url = searchQuery
        ? `/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
        : `/products?limit=${limit}&skip=${skip}`;

      const response = await apiClient.get<FeatchedProducts>(url);

      if (skip === 0) {
        setProducts(response.data.products); // reset for new search
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
  };

  // refetch whenever searchQuery changes
  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    fetchProducts();
  }, [searchQuery]);

  return { products, fetchProducts, loading, error, hasMore };
};

export default useProducts;
