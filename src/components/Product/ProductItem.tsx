"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart } from "@/redux/feature/cart/cartSlice";

interface Props {
  product: Product;
}

export function ProductItem({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const favs: number[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(favs.includes(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleFavorite = () => {
    const favs: number[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const updatedFavs = isFavorite
      ? favs.filter((id) => id !== product.id)
      : [...favs, product.id];
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="relative hover:shadow-lg transition flex flex-col h-full">
      {/* Favorite icon */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 p-1 bg-white dark:bg-gray-700 rounded-full shadow hover:scale-110 transition"
      >
        <Heart
          className={`w-5 h-5 md:w-6 md:h-6 ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden rounded-t">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <CardContent className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-medium truncate">
            {product.title}
          </h3>
          <p className="text-[10px] sm:text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400 capitalize truncate">
            {product.category}
          </p>

          <div className="flex justify-between items-center mt-1 text-[10px] sm:text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ${product.price.toFixed(2)}
            </span>
            <span>⭐ {product.rating.toFixed(1)}</span>
          </div>

          <div className="flex justify-between items-center mt-1 text-[9px] sm:text-[10px] md:text-sm lg:text-base text-gray-400">
            <span>{product.brand}</span>
            <span>{product.stock} in stock</span>
          </div>

          {product.discountPercentage > 0 && (
            <div className="mt-1 text-[9px] sm:text-[10px] md:text-sm lg:text-base text-green-500 font-medium">
              {product.discountPercentage}% off
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-2 sm:p-3 mt-auto">
        <Button
          size="sm"
          className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm md:text-sm lg:text-base"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />{" "}
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
