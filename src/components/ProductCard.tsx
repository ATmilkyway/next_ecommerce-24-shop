"use client";

import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card navigation
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <Card
      className="group hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200 rounded-xl overflow-hidden"
      onClick={handleCardClick}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 relative">
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleCartClick}
          className={`absolute top-3 right-3 rounded-full p-2 shadow-md transition
            ${
              isInCart
                ? "bg-green-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
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
