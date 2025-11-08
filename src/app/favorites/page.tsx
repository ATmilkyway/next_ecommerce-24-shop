"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromFavorites } from "@/redux/features/favoritesSlice";
import Link from "next/link";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Favorites</h1>
        <p className="text-gray-500">You have no favorite products yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Favorites</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <li
            key={item.id}
            className="border rounded-lg overflow-hidden relative"
          >
            <Link href={`/products/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            </Link>

            <div className="p-4 space-y-2">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <button
              className="absolute top-2 right-2 text-red-500 hover:underline"
              onClick={() => dispatch(removeFromFavorites(item.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
