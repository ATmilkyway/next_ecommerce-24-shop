"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const rightImages = [
  { src: "/hero1.jpg", title: "Wireless Headphones", desc: "Immersive sound" },
  { src: "/hero2.jpg", title: "Stylish Hoody", desc: "Cozy and trendy" },
  { src: "/hero3.jpg", title: "Luxury Watch", desc: "Timeless design" },
];

export function FeatureSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-8">
      <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
        Our Featured Offers
      </h2>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
        {/* Left Feature Image */}
        <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
          <Image
            src="/hero4.jpg"
            alt="Feature Main"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent rounded-xl" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
              Main Feature
            </h3>
            <p className="text-sm sm:text-base md:text-lg drop-shadow-md">
              Highlighting the best product for your needs.
            </p>
          </div>
        </div>

        {/* Right Feature Images */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 h-[300px] sm:h-[400px] lg:h-[500px]">
          {/* Top Right Images */}
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            {rightImages.slice(0, 2).map((img, i) => (
              <div
                key={i}
                className="relative flex-1 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-xl" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold drop-shadow-lg line-clamp-1">
                    {img.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base drop-shadow-md line-clamp-2">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Right Image */}
          <div className="relative flex-1 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <Image
              src={rightImages[2].src}
              alt={rightImages[2].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-xl" />
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <h3 className="text-sm sm:text-base md:text-lg font-bold drop-shadow-lg line-clamp-1">
                {rightImages[2].title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base drop-shadow-md line-clamp-2">
                {rightImages[2].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
