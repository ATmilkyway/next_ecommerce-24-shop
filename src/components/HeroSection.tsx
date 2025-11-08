import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex bg-gray-50 h-[90vh] px-16 py-8 gap-8">
      <div className="w-22"></div> {/* left spacing */}
      {/* Left box */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-6xl font-bold mb-4">Shop the Best</h1>
        <p className="text-lg text-gray-700 max-w-xl">
          You want &mdash; we have it. Explore our products.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <Link href="/products">
            <Button variant="default" className="cursor-pointer">
              Products
            </Button>
          </Link>
          <Link href="/favorites">
            <Button variant="outline" className="cursor-pointer">
              Favorites
            </Button>
          </Link>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Top right  */}
        <div className="relative flex-1 rounded-lg overflow-hidden">
          <Image
            src="/hero1.jpg"
            alt="Headphones"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
            <h2 className="text-3xl font-bold">Wireless Headphones</h2>
            <p className="text-sm mt-1">Immersive sound, all day comfort</p>
          </div>
        </div>

        {/* Bottom right   */}
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 rounded-lg overflow-hidden">
            <Image
              src="/hero2.jpg"
              alt="Hoody"
              fill
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
              <h3 className="text-xl font-semibold">Stylish Hoody</h3>
              <p className="text-sm mt-1">Cozy and trendy for any season</p>
            </div>
          </div>

          {/* Watch */}
          <div className="relative flex-1 rounded-lg overflow-hidden">
            <Image
              src="/hero3.jpg"
              alt="Watch"
              fill
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
              <h3 className="text-xl font-semibold">Luxury Watch</h3>
              <p className="text-sm mt-1">
                Timeless design, perfect for any look
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
