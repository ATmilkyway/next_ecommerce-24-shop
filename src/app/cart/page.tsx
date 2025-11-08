"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, clearCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div>
                    <h2 className="font-semibold line-clamp-2">{item.title}</h2>
                    <p className="text-gray-500 font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="mt-4 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </h2>
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </section>
  );
}
