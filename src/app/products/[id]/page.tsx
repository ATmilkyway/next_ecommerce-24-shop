"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { addToFavorites, removeFromFavorites } from "@/redux/features/favoritesSlice";
import { ShoppingCart, Heart } from "lucide-react";

export default function SingleProductPage() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);

  const isInCart = product ? cartItems.some((item) => item.id === product.id) : false;
  const isFavorite = product ? favoriteItems.some((item) => item.id === product.id) : false;

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    apiClient
      .get<Product>(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [productId]);

  const handleCartToggle = () => {
    if (!product) return;
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleFavoriteToggle = () => {
    if (!product) return;
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">
        {loading ? <Skeleton className="h-8 w-3/4" /> : product?.title}
      </h1>

      {/* Image */}
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-md">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            src={product?.thumbnail || product?.images[0]}
            alt={product?.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-3">
        <p className="text-gray-700">
          {loading ? <Skeleton className="h-4 w-full" /> : product?.description}
        </p>
        <p className="text-lg font-semibold">
          {loading ? <Skeleton className="h-6 w-24" /> : `Price: $${product?.price}`}
        </p>
        <p className="text-gray-500">
          {loading ? <Skeleton className="h-4 w-32" /> : `Category: ${product?.category}`}
        </p>
        <p className="text-yellow-500">
          {loading ? <Skeleton className="h-4 w-20" /> : `Rating: ${product?.rating} ⭐`}
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Actions: Add to Cart / Favorite */}
      {!loading && product && (
        <div className="flex flex-wrap gap-4 mt-4">
          <Button
            onClick={handleCartToggle}
            className={`flex items-center space-x-2 px-4 py-2 ${
              isInCart ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
            } rounded-lg shadow-md transition`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
          </Button>

          <Button
            onClick={handleFavoriteToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md transition ${
              isFavorite ? "bg-pink-500 hover:bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            <Heart
              className="w-5 h-5"
              fill={isFavorite ? "currentColor" : "none"}
              strokeWidth={2}
            />
            <span>{isFavorite ? "Remove Favorite" : "Add to Favorite"}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
