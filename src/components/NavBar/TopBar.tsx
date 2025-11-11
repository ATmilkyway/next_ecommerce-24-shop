"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ShoppingCart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ColorModeSwitch } from "./ColorModeSwitch";
import CartCounter from "../CartCounter";

const deals = [
  { title: "Flash Sale: Up to 50% off!", image: "/deal1.jpg" },
  { title: "Buy 1 Get 1 Free on Shoes!", image: "/deal2.jpg" },
  { title: "Limited Offer: 30% Off Electronics!", image: "/deal3.jpg" },
];

export function TopBar() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );

  return (
    <div className="w-full flex items-center justify-between px-2 py-1 md:px-4 md:py-2 bg-background/90 backdrop-blur-md border-b border-border shadow-md">
      <div className="flex-1 overflow-hidden">
        <Carousel
          plugins={[autoplay.current]}
          className="w-full"
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <CarouselContent className="w-full">
            {deals.map((deal, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="relative w-full h-10 md:h-12 lg:h-14 rounded-md overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Overlay for text clarity */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs md:text-sm lg:text-base truncate px-2 text-center">
                      {deal.title}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-4">
        <ColorModeSwitch />

        <CartCounter />
      </div>
    </div>
  );
}
