"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { removeFromFavorites, clearFavorites } from "@/redux/feature/favorite/favoritesSlice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromFavorites(id));
    toast.success("Removed from favorites");
  };

  const handleClear = () => {
    dispatch(clearFavorites());
    toast.success("Favorites cleared");
  };

  if (favorites.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Favorites is Empty</h2>
        <p className="text-gray-500">Add products to your favorites to see them here.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Your Favorites</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 flex flex-col items-center gap-4">
            <div className="w-48 h-48 relative">
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover rounded" />
            </div>
            <h3 className="text-lg font-semibold text-center">{item.title}</h3>
            <p className="text-gray-500">{item.brand}</p>
            <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => handleRemove(item.id)}
            >
              <Trash className="w-4 h-4" /> Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button variant="destructive" onClick={handleClear}>
          Clear Favorites
        </Button>
      </div>
    </div>
  );
}
