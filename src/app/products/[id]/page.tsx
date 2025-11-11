"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/feature/cart/cartSlice";
import { addToFavorites, removeFromFavorites } from "@/redux/feature/favorite/favoritesSlice";
import toast from "react-hot-toast";
import useProduct from "@/hooks/useProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id || "", 10);

  const { product, isLoading, error } = useProduct(productId);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isInCart = product && cart.some((item) => item.id === product.id);
  const isFavorite = product && favorites.some((item) => item.id === product.id);

  useEffect(() => {
    if (!product) return;

    setRelatedLoading(true);
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.products.filter((p: Product) => p.id !== product.id);
        setRelatedProducts(filtered);
      })
      .finally(() => setRelatedLoading(false));
  }, [product]);

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
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="w-full h-64 rounded-lg" />
          <Skeleton className="w-3/4 h-6 rounded" />
          <Skeleton className="w-1/2 h-4 rounded" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-1/4 h-10 rounded-lg" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-32 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Product Details */}
      <div className="md:col-span-2 space-y-6">
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
          <Image src={product.thumbnail} alt={product.title} fill className="object-cover" />
        </div>

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

        <div className="flex gap-4 mt-4 flex-wrap">
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

      {/* Right: Related Products */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-2">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
          {relatedLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-40 rounded-lg" />
              ))
            : relatedProducts.length > 0
            ? relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <div className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className="relative w-full h-40 sm:h-32 md:h-24">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="p-3 flex flex-col gap-1">
                      <p className="font-medium line-clamp-1">{p.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">${p.price.toFixed(2)}</p>
                      <p className="text-sm text-yellow-500">⭐ {p.rating.toFixed(1)}</p>
                    </div>
                  </div>
                </Link>
              ))
            : <p className="text-gray-500">No related products found.</p>}
        </div>
      </div>
    </div>
  );
}
