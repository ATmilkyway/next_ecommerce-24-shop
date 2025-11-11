"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/feature/cart/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/redux/feature/favorite/favoritesSlice";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export function ProductItem({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isInCart = cart.some((item) => item.id === product.id);
  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accidental clicks
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.custom(
        <div className="flex items-center gap-2 p-2 bg-red-600 text-white rounded shadow">
          <Image src={product.thumbnail} alt={product.title} width={40} height={40} className="rounded" />
          <span className="truncate">
            Removed from <Heart className="inline w-5 h-5 align-middle" />
          </span>
        </div>
      );
    } else {
      dispatch(addToFavorites(product));
      toast.custom(
        <div className="flex items-center gap-2 p-2 bg-green-600 text-white rounded shadow">
          <Image src={product.thumbnail} alt={product.title} width={40} height={40} className="rounded" />
          <span className="truncate">
            Added to <Heart className="inline w-5 h-5 align-middle" />
          </span>
        </div>
      );
    }
  };

  const handleToggleCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accidental clicks
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      toast.custom(
        <div className="flex items-center gap-2 p-2 bg-red-600 text-white rounded shadow">
          <Image src={product.thumbnail} alt={product.title} width={40} height={40} className="rounded" />
          <span className="truncate">
            Removed from <ShoppingCart className="inline w-5 h-5 align-middle" />
          </span>
        </div>
      );
    } else {
      dispatch(addToCart(product));
      toast.custom(
        <div className="flex items-center gap-2 p-2 bg-green-600 text-white rounded shadow">
          <Image src={product.thumbnail} alt={product.title} width={40} height={40} className="rounded" />
          <span className="truncate">
            Added to <ShoppingCart className="inline w-5 h-5 align-middle" />
          </span>
        </div>
      );
    }
  };

  return (
    <Card className="relative hover:shadow-xl transition flex flex-col h-full rounded-lg overflow-hidden">
      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:scale-110 transition"
      >
        <Heart className={`w-5 h-5 md:w-6 md:h-6 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
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

      {/* Product Content */}
      <CardContent className="p-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-medium truncate">{product.title}</h3>
          <p className="text-[10px] sm:text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400 capitalize truncate">{product.category}</p>

          {/* Price + Rating */}
          <div className="flex justify-between items-center mt-1 text-[10px] sm:text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</span>
            <span>⭐ {product.rating.toFixed(1)}</span>
          </div>

          {/* Brand + Stock */}
          <div className="flex justify-between items-center text-[9px] sm:text-[10px] md:text-sm lg:text-base text-gray-400">
            <span>{product.brand}</span>
            <span>{product.stock} in stock</span>
          </div>

          {/* Discount */}
          {product.discountPercentage > 0 && (
            <div className="text-green-500 font-medium text-[9px] sm:text-[10px] md:text-sm lg:text-base">
              {product.discountPercentage}% off
            </div>
          )}
        </div>
      </CardContent>

      {/* Buttons: Add to Cart + Read More */}
      <CardFooter className="p-2 sm:p-3 mt-auto flex flex-col gap-2">
        <Button
          size="sm"
          className={`w-full flex items-center justify-center gap-2 text-sm sm:text-base md:text-base lg:text-base transition-colors rounded-lg ${
            isInCart ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          onClick={handleToggleCart}
        >
          <ShoppingCart className="w-5 h-5" />
          {isInCart ? "In Cart" : "Add to Cart"}
        </Button>

        {/* Read More Button */}
        <Link href={`/products/${product.id}`} className="w-full">
          <Button size="sm" variant="outline" className="w-full">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
