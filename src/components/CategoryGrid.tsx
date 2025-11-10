"use client";

import useCategory from "@/hooks/useCategory";

export const CategoryGrid = () => {
  const { data } = useCategory();
  console.log(data);
  return <div>CategoryGrid</div>;
};
