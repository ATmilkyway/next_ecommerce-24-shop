"use client";

import { useState } from "react";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products } = useProducts();
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

  const isInCart = (product: Product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <div className="p-6 relative pl-28">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 transition-all duration-300">
          {notification}
        </div>
      )}

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Product List</h1>

      {/* Product Grid */}
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
    </div>
  );
}
