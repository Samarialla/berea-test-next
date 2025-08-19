"use client";
import { useState } from "react";
import Image from "next/image";

interface ProductCarouselProps {
  images: string[];
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full max-w-[400px]">
      <Image
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        width={400}
        height={400}
        className="rounded w-full h-[400px] object-cover"
        priority={true}
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-0 -translate-y-1/2  hover:bg-white text-red-600 font-bold text-xl rounded-full p-2 shadow z-10 transition-colors cursor-pointer"
      >
        ‹
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 -translate-y-1/2 hover:bg-white text-red-600 font-bold text-xl rounded-full p-2 shadow z-10 transition-colors cursor-pointer"
      >
        ›
      </button>
    </div>
  );
}
