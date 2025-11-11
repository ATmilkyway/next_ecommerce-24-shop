"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
}

export function ProductItem({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.includes(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    console.log(`Added product ${product.title} to cart`);
  };

  const handleToggleFavorite = () => {
    const favs: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavs = isFavorite ? favs.filter((id) => id !== product.id) : [...favs, product.id];
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="relative hover:shadow-lg transition">
      {/* Favorite icon top-right */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 p-1 bg-white dark:bg-gray-700 rounded-full shadow hover:scale-110 transition"
      >
        <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-gray-400"}`} />
      </button>

      <CardHeader className="p-0">
        <div className="relative w-full h-36 md:h-44 rounded overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      </CardHeader>

      <CardContent className="p-3">
        <h3 className="text-sm md:text-base font-medium truncate">{product.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{product.category}</p>

        {/* Row with price, rating, stock */}
        <div className="flex items-center justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</span>
          <span>⭐ {product.rating.toFixed(1)}</span>
          <span>{product.stock} in stock</span>
        </div>

        {/* Brand and discount */}
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">{product.brand}</span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-green-500">{product.discountPercentage}% off</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3">
        <Button
          size="sm"
          className="w-full flex items-center justify-center gap-1"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
