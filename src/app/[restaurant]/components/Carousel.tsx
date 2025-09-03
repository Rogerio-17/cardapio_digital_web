"use client";

import { useRef, ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
  cardWidth: number;
  className?: string;
}

export default function Carousel({
  children,
  cardWidth,
  className = "",
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Botão Esquerda */}
      <button
        onClick={scrollLeft}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-xl hover:shadow-2xl rounded-full p-3 carousel-nav-btn border border-purple-200 hover:border-purple-400"
      >
        <svg
          className="w-6 h-6 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Botão Direita */}
      <button
        onClick={scrollRight}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-xl hover:shadow-2xl rounded-full p-3 carousel-nav-btn border border-purple-200 hover:border-purple-400"
      >
        <svg
          className="w-6 h-6 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Container do carrossel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-12"
      >
        {children}
      </div>
    </div>
  );
}
