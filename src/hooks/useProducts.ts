'use client';
import apiClient from "@/lib/apiClient";
import { FeatchedProducts, Product } from "@/types";
import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<FeatchedProducts>("/products", { signal: controller.signal })
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      controller.abort();
    };
  }, []);
  return { products, loading, error };
};
export default useProducts;
