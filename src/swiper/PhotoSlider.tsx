/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import NewsCardWrapper from "@/share/NewsCardWrapper";
import { NewsItem } from "@/types/news.types";
import { englishToBengali } from "@/utils/englishToBengali";
import { getBengaliTimeAgo } from "@/utils/getBengaliTimeAgo";
import { stripHtmlAndLimit, stripHtmlAndLimitWithSpace } from "@/utils/stripAndLimitHtml";
import { ChevronsLeft, ChevronsRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";


const PhotoSlider = ({ data }: { data: NewsItem[] }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const [newsItems, setnewsItems] = useState<NewsItem[]>(data || [])
  console.log(newsItems);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % newsItems.slice(0, 6).length);
    resetProgress();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + newsItems.slice(0, 6).length) % newsItems.slice(0, 6).length);
    resetProgress();
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (!isPaused && progressRef.current) {
      progressRef.current.style.animationPlayState = 'paused';
    } else {
      resetProgress();
    }
  };

  const resetProgress = () => {
    if (progressRef.current) {
      progressRef.current.style.animation = 'none';
      void progressRef.current.offsetWidth; // Trigger reflow
      progressRef.current.style.animation = 'progress 4s linear forwards';
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, current]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Photo Slider - Left Side */}
        <div className="lg:w-2/3 h-full">
          <div className="relative group overflow-hidden rounded-xl shadow-xl h-full flex flex-col">
            <div className="relative flex-grow overflow-hidden">
              <h2 className="absolute top-4 left-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                গ্যালারি
              </h2>

              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 z-10 bg-gray-200">
                <div
                  ref={progressRef}
                  className={`h-full bg-red-600 ${isPaused ? 'w-full' : 'animate-[progress_4s_linear_forwards]'}`}
                />
              </div>

              <Image
                width={1000}
                height={600}
                src={newsItems.slice(0, 6)[current].imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-68555969e663a.jpg'}
                alt="slide"
                className="w-full h-[470px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <p className="text-white text-lg font-medium">{stripHtmlAndLimit(newsItems.slice(0, 6)[current].content, 13).short}</p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                <button
                  onClick={togglePause}
                  className="bg-white/90 text-black p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                </button>
                <button
                  onClick={prevSlide}
                  className="bg-white/90 text-black p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Previous"
                >
                  <ChevronsLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-white/90 text-black p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Next"
                >
                  <ChevronsRight size={20} />
                </button>
              </div>

              {/* Counter */}
              <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {englishToBengali(current + 1)} / {englishToBengali(newsItems.slice(0, 6).length)}
              </div>
            </div>

            {/* Caption Below */}
            <div className="p-4 bg-white">
              <NewsCardWrapper href={`/news/${newsItems.slice(0, 6)[current].category}/${newsItems.slice(0, 6)[current].id}`} id={`${newsItems.slice(0, 6)[current].id}`}>
                <h3 className="text-xl font-bold text-gray-800 hover:text-red-600 transition-colors cursor-pointer">
                  {newsItems.slice(0, 6)[current].title}
                </h3>
              </NewsCardWrapper>
            </div>
          </div>
        </div>

        {/* News Section - Right Side */}
        <div className="lg:w-1/3 h-full">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-4">
              <h2 className="text-xl font-semibold text-white">আপনার জন্য সংবাদ</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-4 flex-grow">
              {newsItems.slice(6, newsItems.length + 1).map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-100 pb-4 last:border-0 group cursor-pointer"
                >
                  <div className="block group"> 
                    <NewsCardWrapper   href={`/news/${item.category}/${item.id}`} id={`${item.id}`} >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {stripHtmlAndLimit(item.title, 6).short}
                      </h3>
                      <p className="text-[14.6px] text-gray-600 mt-1 line-clamp-2">
                        {stripHtmlAndLimitWithSpace(item.content, 90).short}
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {getBengaliTimeAgo(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  </NewsCardWrapper>
                </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default PhotoSlider;