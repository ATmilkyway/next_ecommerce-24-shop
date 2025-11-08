"use client";

import { useState } from "react";
import useProducts from "@/hooks/useProducts";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";

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
      console.log("Cart:", updatedCart);
    } else {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      setNotification(`${product.title} added to cart!`);
      console.log("Cart:", updatedCart);
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
        {products.map((product: Product) => (
          <Card
            key={product.id}
            className="group hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200 rounded-xl overflow-hidden"
          >
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold line-clamp-2">{product.title}</CardTitle>
            </CardHeader>

            <CardContent className="p-0 relative">
              <img
                src={product.thumbnail || product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={() => handleToggleCart(product)}
                className={`absolute top-3 right-3 rounded-full p-2 shadow-md transition
                  ${isInCart(product) ? "bg-green-500 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </CardContent>

            <div className="p-4">
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-500">Rating: {product.rating} ⭐</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </div>

            <CardFooter className="border-t p-4 flex justify-between items-center text-sm text-gray-500">
              <span className="text-green-600 font-medium">In stock</span>
              <span>ID: {product.id}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
