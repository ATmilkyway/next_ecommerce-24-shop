"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/feature/cart/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/redux/feature/favorite/favoritesSlice";
import toast from "react-hot-toast";
import useProduct from "@/hooks/useProduct";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Array.isArray(params.id)
    ? parseInt(params.id[0], 10)
    : parseInt(params.id || "", 10);

  const { product, isLoading, error } = useProduct(productId);

  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isInCart = product && cart.some((item) => item.id === product.id);
  const isFavorite = product && favorites.some((item) => item.id === product.id);

  const handleToggleCart = () => {
    if (!product) return;

    if (isInCart) {
      dispatch(removeFromCart(product.id));
      toast.success("Removed from cart");
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart");
    }
  };

  const handleToggleFavorite = () => {
    if (!product) return;

    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.success("Removed from favorites");
    } else {
      dispatch(addToFavorites(product));
      toast.success("Added to favorites");
    }
  };

  if (isLoading || !product) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <Skeleton className="w-full h-64 rounded-lg" />
        <Skeleton className="w-3/4 h-6 rounded" />
        <Skeleton className="w-1/2 h-4 rounded" />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-1/4 h-10 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Product Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 capitalize">{product.category}</p>
        <p className="text-lg md:text-xl font-semibold">${product.price.toFixed(2)}</p>
        {product.discountPercentage > 0 && (
          <p className="text-green-600 font-medium">{product.discountPercentage}% off</p>
        )}
        <p className="text-gray-500 dark:text-gray-400">
          Brand: {product.brand} | Stock: {product.stock}
        </p>
        <p className="text-gray-500 dark:text-gray-400">Rating: ⭐ {product.rating.toFixed(1)}</p>
        <p className="mt-2">{product.description}</p>
      </div>

      {/* Buttons: Add to Cart + Favorite */}
      <div className="flex gap-4 mt-4">
        <Button
          className={`flex-1 flex items-center justify-center gap-2 text-white ${
            isInCart ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={handleToggleCart}
        >
          <ShoppingCart className="w-5 h-5" />
          {isInCart ? "In Cart" : "Add to Cart"}
        </Button>

        <Button
          className={`flex-1 flex items-center justify-center gap-2 text-white ${
            isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
          onClick={handleToggleFavorite}
        >
          <Heart className="w-5 h-5" />
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </Button>
      </div>
    </div>
  );
}
