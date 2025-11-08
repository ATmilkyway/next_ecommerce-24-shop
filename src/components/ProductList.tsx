"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Product } from "@/types";
import useProducts from "@/hooks/useProducts";

interface ProductListProps {
  searchQuery?: string;
  category?: string;
}

export default function ProductList({ searchQuery = "", category }: ProductListProps) {
  const { products, fetchProducts, loading, hasMore } = useProducts(10, searchQuery, category);

  const [notification, setNotification] = useState<string>("");

  // Helper to show temporary notifications
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {
        fetchProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, fetchProducts]);

  return (
    <div className="p-6 relative pl-4 sm:pl-6 lg:pl-28">
      {notification && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 transition-all duration-300">
          {notification}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Product List {category ? `- ${category}` : ""}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {loading &&
          Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
      </div>

      {!hasMore && !loading && (
        <p className="text-center mt-6 text-gray-500">No more products</p>
      )}
    </div>
  );
}
