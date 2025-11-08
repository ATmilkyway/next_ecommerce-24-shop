"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import useProducts from "@/hooks/useProducts";

export default function ProductList() {
  const { products, fetchProducts, loading, hasMore } = useProducts(10);
  const [cart, setCart] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string>("");

  const handleToggleCart = (product: Product) => {
    const isInCart = cart.some((item) => item.id === product.id);
    if (isInCart) {
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
      setNotification(`${product.title} removed from cart!`);
    } else {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      setNotification(`${product.title} added to cart!`);
    }
    setTimeout(() => setNotification(""), 2000);
  };

  const isInCart = (product: Product) => cart.some((item) => item.id === product.id);

  // Infinite Scroll
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
    <div className="p-6 relative pl-28">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 transition-all duration-300">
          {notification}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-gray-900">Product List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={isInCart(product)}
            onToggleCart={handleToggleCart}
          />
        ))}
      </div>

      {loading && <p className="text-center mt-6 text-gray-500">Loading...</p>}
      {!hasMore && <p className="text-center mt-6 text-gray-500">No more products</p>}
    </div>
  );
}
