"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { removeFromCart, clearCart } from "@/redux/feature/cart/cartSlice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    toast.success("Removed from cart");
  };

  const handleClear = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500">Add products to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border rounded-lg"
          >
            <div className="w-32 h-32 relative flex-shrink-0">
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover rounded" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500">{item.brand}</p>
              <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button variant="destructive" onClick={() => handleRemove(item.id)}>
                <Trash className="w-4 h-4 mr-1" /> Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <Button variant="destructive" onClick={handleClear}>
          Clear Cart
        </Button>
        <div className="text-xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
