"use client";

import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "@/lib/services/apiClient";
import { Category } from "@/types/category";

const useCategories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchCategoriesWithCounts = async () => {
      try {
        const categoriesResponse = await apiClient.get<Category[]>(
          "/products/categories",
          { signal: controller.signal }
        );

        const categories = categoriesResponse.data;

        const categoriesWithCounts = await Promise.all(
          categories.map(async (category) => {
            try {
              const countResponse = await apiClient.get<{ total: number }>(
                `/products/category/${category.slug}`,
                { signal: controller.signal }
              );
              return {
                ...category,
                productCount: countResponse.data.total,
              };
            } catch (err) {
              return {
                ...category,
                productCount: 0,
              };
            }
          })
        );

        setData(categoriesWithCounts);
      } catch (err: any) {
        if (err instanceof CanceledError) return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithCounts();

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useCategories;
