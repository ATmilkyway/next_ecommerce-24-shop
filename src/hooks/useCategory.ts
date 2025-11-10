"use client";
import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "@/lib/services/apiClient";
import { Category } from "@/types/category";

const useCategory = () => {
  const [data, setData] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiClient
      .get<Category[]>("/products/categories", { signal: controller.signal })
      .then((res) => {
        setData(res.data);
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

export default useCategory;
