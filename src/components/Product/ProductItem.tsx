"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/feature/cart/cartSlice";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export function ProductItem({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const isInCart = cart.some((item) => item.id === product.id);

  // Load favorites from localStorage
  useEffect(() => {
    const favs: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.includes(product.id));
  }, [product.id]);

  const handleToggleFavorite = () => {
    const favs: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavs = isFavorite
      ? favs.filter((id) => id !== product.id)
      : [...favs, product.id];
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleToggleCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      toast.custom(
        <div className="flex items-center gap-2 p-2 bg-red-500 text-white rounded shadow">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={40}
            height={40}
            className="rounded"
          />
          <span className="truncate">
            Removed from <ShoppingCart className="inline w-5 h-5 align-middle" />
          </span>
        </div>
      );
    } else {
      dispatch(addToCart(product));
      toast.custom(
        <div className="flex items-center gap-2 p-2 bg-green-500 text-white rounded shadow">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={40}
            height={40}
            className="rounded"
          />
          <span className="truncate">
            Added to <ShoppingCart className="inline w-5 h-5 align-middle" />
          </span>
        </div>
      );
    }
  };

  return (
    <Card className="relative hover:shadow-xl transition flex flex-col h-full rounded-lg overflow-hidden">
      {/* Favorite icon */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:scale-110 transition"
      >
        <Heart
          className={`w-5 h-5 md:w-6 md:h-6 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
        />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden">
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
        <div className="space-y-1">
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
          <div className="flex justify-between items-center text-[9px] sm:text-[10px] md:text-sm lg:text-base text-gray-400">
            <span>{product.brand}</span>
            <span>{product.stock} in stock</span>
          </div>
          {product.discountPercentage > 0 && (
            <div className="text-green-500 font-medium text-[9px] sm:text-[10px] md:text-sm lg:text-base">
              {product.discountPercentage}% off
            </div>
          )}
        </div>
      </CardContent>

      {/* Add/Remove Cart Button */}
      <CardFooter className="p-2 sm:p-3 mt-auto">
        <Button
          size="sm"
          className={`w-full flex items-center justify-center gap-2 text-sm sm:text-base md:text-base lg:text-base transition-colors rounded-lg ${
            isInCart
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          onClick={handleToggleCart}
          onDoubleClick={() => {
            if (isInCart) {
              dispatch(removeFromCart(product.id));
              toast("Removed from cart", { icon: "🛒" });
            }
          }}
        >
          <ShoppingCart className="w-5 h-5" />
          {isInCart ? "In Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
