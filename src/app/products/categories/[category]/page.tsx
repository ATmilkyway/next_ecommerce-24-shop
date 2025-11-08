// src/app/products/categories/[category]/page.tsx
"use client";

import { useParams } from "next/navigation";
import ProductList from "@/components/ProductList";
import React from "react";

export default function CategoryPage() {
  const { category } = useParams(); // Get the dynamic route param

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-foreground capitalize">
        {category} Products
      </h1>
      <ProductList category={category as string} />
    </section>
  );
}
