"use client";

import apiClient from "@/lib/apiClient";
import { FeatchedCategories, Category } from "@/types";
import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<FeatchedCategories>("/products/categories", {
        signal: controller.signal,
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(true);
    return () => {
      controller.abort();
    };
  }, []);
  return { categories, loading, error };
};

export default useCategories;
