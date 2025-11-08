"use client";

import { ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  isInCart: boolean;
  onToggleCart: (product: Product) => void;
}

export default function ProductCard({ product, isInCart, onToggleCart }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      className="group hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200 rounded-xl overflow-hidden"
      onClick={handleCardClick} // navigate on card click
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
          onClick={(e) => {
            e.stopPropagation(); // prevent navigation when clicking button
            onToggleCart(product);
          }}
          className={`absolute top-3 right-3 rounded-full p-2 shadow-md transition
            ${isInCart ? "bg-green-500 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`}
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
  );
}
