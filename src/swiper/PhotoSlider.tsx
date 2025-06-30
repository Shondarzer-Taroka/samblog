// 'use client'

// import { ChevronsLeft, ChevronsRight, Pause, Play } from "lucide-react";
// import Image from "next/image";
// import React, { useEffect, useState, useRef } from "react";

// interface Slide {
//   id: number;
//   image: string;
//   caption: string;
//   overlay: string;
// }

// const slides: Slide[] = [
//   {
//     id: 1,
//     image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-2-6855596957bc7.jpg",
//     caption: "ইরানের রাস্তায় লাখো মানুষের ঢল, দেখুন ছবিতে",
//     overlay:
//       "তেহরানের বেতুলেমে ক্ষয়ক্ষতির জুমার নামাজের পর ইসরাইলের হামলার বিরুদ্ধে আন্দোলনে যোগ দিচ্ছে লাখো মানুষ",
//   },
//   {
//     id: 2,
//     image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-68555969e663a.jpg",
//     caption: "দ্বিতীয় ছবির ক্যাপশন",
//     overlay: "দ্বিতীয় ছবির বিস্তারিত বর্ণনা এখানে থাকবে।",
//   },
//   {
//     id: 3,
//     image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-68555969e663a.jpg",
//     caption: "তৃতীয় ছবির ক্যাপশন",
//     overlay: "তৃতীয় ছবির বিস্তারিত বর্ণনা এখানে থাকবে।",
//   },
// ];

// const PhotoSlider: React.FC = () => {
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const progressRef = useRef<HTMLDivElement>(null);

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const togglePause = () => {
//     setIsPaused((prev) => !prev);
//   };

//   useEffect(() => {
//     if (isPaused) return;

//     const timer = setInterval(() => {
//       nextSlide();
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [isPaused]);

//   // Restart progress bar animation
//   useEffect(() => {
//     if (progressRef.current) {
//       progressRef.current.classList.remove("animate-progress");
//       void progressRef.current.offsetWidth; // trigger reflow
//       progressRef.current.classList.add("animate-progress");
//     }
//   }, [current, isPaused]);

//   return (
//     <div className="bg-white  overflow-hidden relative mt-24 px-2 ">
//       <h2 className="text-xl font-semibold text-red-600 mb-4 py-2.5">  গ্যালারি</h2>

//       {/* Progress bar */}
//       <div
//         key={`${current}-${isPaused}`}  // forces re-render to restart animation
//         className={`absolute top-16 z-40 left-2 h-1 bg-red-600 ${isPaused ? "w-0" : "animate-[progressAnim_4s_linear_forwards]"
//           }`}
//       />


//       <div className="relative">
//         <Image
//           width={1000}
//           height={500}
//           src={slides[current].image}
//           alt="slide"
//           className="w-full h-[420px] object-cover"
//         />

//         {/* Counter */}
//         <div className="absolute top-3 left-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
//           {current + 1} / {slides.length}
//         </div>

//         {/* Overlay Text */}
//         <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-3 text-sm font-medium">
//           {slides[current].overlay}
//         </div>

//         {/* Controls */}
//         <div className="absolute top-3 right-3 flex gap-2 z-10">
//           <button
//             onClick={togglePause}
//             className="bg-white text-black p-1 rounded-full shadow"
//           >
//             {isPaused ? <Play /> : <Pause />}
//           </button>
//           <button
//             onClick={prevSlide}
//             className="bg-white text-black p-1 rounded-full shadow"
//           >

//             <ChevronsLeft />

//           </button>
//           <button
//             onClick={nextSlide}
//             className="bg-white text-black p-1 rounded-full shadow"
//           >
//             <ChevronsRight />
//           </button>
//         </div>

//       </div>

//       {/* Caption Below */}
//       <div className="p-3 text-base font-semibold text-gray-800 hover:underline cursor-pointer">
//         {slides[current].caption}
//       </div>
//     </div>
//   );
// };

// export default PhotoSlider;






















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

interface NewsItem {
  id: number;
  image: string;
  title: string;
  time: string;
  category: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-2-6855596957bc7.jpg",
    caption: "ইরানের রাস্তায় লাখো মানুষের ঢল, দেখুন ছবিতে",
    overlay: "তেহরানের বেতুলেমে ক্ষয়ক্ষতির জুমার নামাজের পর ইসরাইলের হামলার বিরুদ্ধে আন্দোলনে যোগ দিচ্ছে লাখো মানুষ",
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

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/sample-news-1.jpg",
    title: "রাজধানীতে বাস-ট্রাক সংঘর্ষে নিহত ৩",
    time: "২ ঘণ্টা আগে",
    category: "দুর্ঘটনা"
  },
  {
    id: 2,
    image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/sample-news-2.jpg",
    title: "বাজারে ডলারের দাম বেড়েছে ১ টাকা",
    time: "৪ ঘণ্টা আগে",
    category: "অর্থনীতি"
  },
  {
    id: 3,
    image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/sample-news-3.jpg",
    title: "আগামীকাল থেকে শুরু হচ্ছে বই মেলা",
    time: "৬ ঘণ্টা আগে",
    category: "সংস্কৃতি"
  },
  {
    id: 4,
    image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/sample-news-4.jpg",
    title: "জাতীয় ক্রিকেট দলের নতুন কোচ নিয়োগ",
    time: "৮ ঘণ্টা আগে",
    category: "খেলাধুলা"
  }
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

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.classList.remove("animate-progress");
      void progressRef.current.offsetWidth;
      progressRef.current.classList.add("animate-progress");
    }
  }, [current, isPaused]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Slider */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative">
            {/* Header with Gallery title */}
            <div className="flex items-center justify-between px-6 pt-4 pb-2">
              <h2 className="text-2xl font-bold text-red-600">গ্যালারি</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  {current + 1} / {slides.length}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div
              ref={progressRef}
              className={`h-1 bg-gradient-to-r from-red-600 to-red-400 ${isPaused ? 'w-full' : 'animate-[progress_4s_linear_forwards]'}`}
            />

            {/* Image Slider */}
            <div className="relative aspect-[16/9]">
              <Image
                src={slides[current].image}
                alt="slide"
                fill
                className="object-cover"
              />

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <p className="text-white text-lg font-semibold">{slides[current].overlay}</p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                <button
                  onClick={prevSlide}
                  className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  <ChevronsLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={togglePause}
                  className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  <ChevronsRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Caption Below */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 hover:text-red-600 transition-colors cursor-pointer">
                {slides[current].caption}
              </h3>
            </div>
          </div>
        </div>

        {/* News Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 pt-4 pb-2 border-b">
              <h2 className="text-xl font-bold text-gray-800">সর্বশেষ সংবাদ</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-4">
              {newsItems.map((item) => (
                <div key={item.id} className="group flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <span className="mr-1">🕒</span>
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <button className="w-full py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                আরও দেখুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoSlider;

