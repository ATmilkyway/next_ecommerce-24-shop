"use client";

import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "@/lib/services/apiClient";
import { Product } from "@/types/product";

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const useProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiClient
      .get<ProductResponse>("/products", { signal: controller.signal })
      .then((res) => {
        setData(res.data.products); // ✅ only take the array
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useProducts;
