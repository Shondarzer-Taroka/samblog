'use client'

import { ChevronsLeft, ChevronsRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

interface Slide {
  id: number;
  image: string;
  caption: string;
  overlay: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-2-6855596957bc7.jpg",
    caption: "ইরানের রাস্তায় লাখো মানুষের ঢল, দেখুন ছবিতে",
    overlay:
      "তেহরানের বেতুলেমে ক্ষয়ক্ষতির জুমার নামাজের পর ইসরাইলের হামলার বিরুদ্ধে আন্দোলনে যোগ দিচ্ছে লাখো মানুষ",
  },
  {
    id: 2,
    image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-68555969e663a.jpg",
    caption: "দ্বিতীয় ছবির ক্যাপশন",
    overlay: "দ্বিতীয় ছবির বিস্তারিত বর্ণনা এখানে থাকবে।",
  },
  {
    id: 3,
    image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-68555969e663a.jpg",
    caption: "তৃতীয় ছবির ক্যাপশন",
    overlay: "তৃতীয় ছবির বিস্তারিত বর্ণনা এখানে থাকবে।",
  },
];

const PhotoSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Restart progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.classList.remove("animate-progress");
      void progressRef.current.offsetWidth; // trigger reflow
      progressRef.current.classList.add("animate-progress");
    }
  }, [current, isPaused]);

  return (
    <div className="bg-white  overflow-hidden relative mt-24 px-2 ">
      <h2 className="text-xl font-semibold text-red-600 mb-4 py-2.5">  গ্যালারি</h2>

      {/* Progress bar */}
      <div
        key={`${current}-${isPaused}`}  // forces re-render to restart animation
        className={`absolute top-16 z-40 left-2 h-1 bg-red-600 ${isPaused ? "w-0" : "animate-[progressAnim_4s_linear_forwards]"
          }`}
      />


      <div className="relative">
        <Image
          width={1000}
          height={500}
          src={slides[current].image}
          alt="slide"
          className="w-full h-[420px] object-cover"
        />

        {/* Counter */}
        <div className="absolute top-3 left-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
          {current + 1} / {slides.length}
        </div>

        {/* Overlay Text */}
        <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-3 text-sm font-medium">
          {slides[current].overlay}
        </div>

        {/* Controls */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={togglePause}
            className="bg-white text-black p-1 rounded-full shadow"
          >
            {isPaused ? <Play /> : <Pause />}
          </button>
          <button
            onClick={prevSlide}
            className="bg-white text-black p-1 rounded-full shadow"
          >

            <ChevronsLeft />

          </button>
          <button
            onClick={nextSlide}
            className="bg-white text-black p-1 rounded-full shadow"
          >
            <ChevronsRight />
          </button>
        </div>

      </div>

      {/* Caption Below */}
      <div className="p-3 text-base font-semibold text-gray-800 hover:underline cursor-pointer">
        {slides[current].caption}
      </div>
    </div>
  );
};

export default PhotoSlider;
