"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromFavorites } from "@/redux/features/favoritesSlice";
import Link from "next/link";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromFavorites(id));
    toast.success("Removed from favorites");
  };

  if (favorites.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Favorites</h1>
        <p className="text-gray-500">You have no favorite products yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">Favorites</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <li
            key={item.id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition relative"
          >
            <Link href={`/products/${item.id}`}>
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-lg line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-600 font-medium">${item.price}</p>
            </div>

            <button
              className="absolute top-3 right-3 text-red-500 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
