"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/content/hero_image/hero1.jpeg",
    alt: "Genius Educational Academy - Hero 1",
    frameHeightClass: "h-full",
    objectFitClass: "object-contain",
    objectPositionClass: "object-center",
    wrapperClass: "items-center justify-center",
  },
  {
    image: "/content/hero_image/hero2.jpg",
    alt: "Genius Educational Academy - Hero 2",
    frameHeightClass: "h-full",
    objectFitClass: "object-contain",
    objectPositionClass: "object-center",
    wrapperClass: "items-center justify-center",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative w-full">
      <div className={`w-full flex ${activeSlide.wrapperClass}`}>
        <div className={`w-full ${activeSlide.frameHeightClass} max-h-[75vh] md:max-h-[90vh]`}>
          <img
            key={activeSlide.image}
            src={activeSlide.image}
            alt={activeSlide.alt}
            className={`w-full h-full ${activeSlide.objectFitClass} ${activeSlide.objectPositionClass} animate-slideIn`}
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-primary p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-primary p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
