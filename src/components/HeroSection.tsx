import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col bg-gray-50 px-6 sm:px-12 lg:px-16 py-8 gap-8">
      {/* Top Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Image 1 */}
        <div className="relative w-full h-48 sm:h-48 lg:h-64 rounded-lg overflow-hidden">
          <Image
            src="/hero1.jpg"
            alt="Headphones"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white drop-shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold">
              Wireless Headphones
            </h3>
            <p className="text-xs sm:text-sm mt-1">
              Immersive sound, all day comfort
            </p>
          </div>
        </div>

        {/* Image 2 */}
        <div className="relative w-full h-48 sm:h-48 lg:h-64 rounded-lg overflow-hidden">
          <Image
            src="/hero2.jpg"
            alt="Hoody"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white drop-shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold">Stylish Hoody</h3>
            <p className="text-xs sm:text-sm mt-1">
              Cozy and trendy for any season
            </p>
          </div>
        </div>

        {/* Image 3 */}
        <div className="relative w-full h-48 sm:h-48 lg:h-64 rounded-lg overflow-hidden sm:col-span-2 lg:col-span-1">
          <Image
            src="/hero3.jpg"
            alt="Watch"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white drop-shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold">Luxury Watch</h3>
            <p className="text-xs sm:text-sm mt-1">
              Timeless design, perfect for any look
            </p>
          </div>
        </div>
      </div>

      {/* Hero Text */}
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Shop the Best
        </h1>
        <p className="text-md sm:text-lg text-gray-700 max-w-xl">
          You want &mdash; we have it. Explore our products.
        </p>

        {/* Buttons in one row */}
        <div className="mt-4 flex gap-4">
          <Link href="/products">
            <Button variant="default">Products</Button>
          </Link>
          <Link href="/favorites">
            <Button variant="outline">Favorites</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
