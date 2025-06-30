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





















// 'use client'

// import { ChevronsLeft, ChevronsRight, Pause, Play } from "lucide-react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// interface Slide {
//   id: number;
//   image: string;
//   caption: string;
//   overlay: string;
// }

// interface NewsItem {
//   id: number;
//   title: string;
//   excerpt: string;
//   category: string;
//   time: string;
// }

// const slides: Slide[] = [
//   {
//     id: 1,
//     image: "https://cdn.jugantor.com/assets/news_photos/2025/06/20/tehran-protest-2-6855596957bc7.jpg",
//     caption: "ইরানের রাস্তায় লাখো মানুষের ঢল, দেখুন ছবিতে",
//     overlay: "তেহরানের বেতুলেমে ক্ষয়ক্ষতির জুমার নামাজের পর ইসরাইলের হামলার বিরুদ্ধে আন্দোলনে যোগ দিচ্ছে লাখো মানুষ",
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

// const newsItems: NewsItem[] = [
//   {
//     id: 1,
//     title: "বাংলাদেশে নতুন করোনা ভ্যারিয়েন্ট শনাক্ত",
//     excerpt: "স্বাস্থ্য মন্ত্রণালয় নিশ্চিত করেছে নতুন একটি ভ্যারিয়েন্টের উপস্থিতি",
//     category: "স্বাস্থ্য",
//     time: "২ ঘন্টা আগে"
//   },
//   {
//     id: 2,
//     title: "ঢাকায় নতুন মেট্রো রেল প্রকল্প অনুমোদন",
//     excerpt: "মন্ত্রিসভায় পাস হয়েছে ৫,০০০ কোটি টাকার নতুন প্রকল্প",
//     category: "রাজধানী",
//     time: "৪ ঘন্টা আগে"
//   },
//   {
//     id: 3,
//     title: "ক্রিকেটে বাংলাদেশের জয়",
//     excerpt: "অস্ট্রেলিয়ার বিপক্ষে টি-টোয়েন্টি সিরিজে ২-১ ব্যবধানে জয়",
//     category: "খেলা",
//     time: "৬ ঘন্টা আগে"
//   },
//   {
//     id: 4,
//     title: "বাজারে ডিমের দাম বাড়ল",
//     excerpt: "প্রতি হালি ডিম ১০ টাকা দাম বেড়ে এখন ৫০ টাকা",
//     category: "বাণিজ্য",
//     time: "আজ সকালে"
//   }
// ];

// const PhotoSliderWithNews: React.FC = () => {
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

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

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Photo Slider - Left Side */}
//         <div className="lg:w-2/3">
//           <div className="relative group overflow-hidden rounded-xl shadow-xl">
//             <h2 className="absolute top-4 left-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//               গ্যালারি
//             </h2>

//             {/* Progress bar */}
//             <div className="absolute top-0 left-0 right-0 h-1.5 z-10 bg-gray-200">
//               <div
//                 className={`h-full bg-red-600 ${isPaused ? 'w-full' : 'animate-[progress_4s_linear_forwards]'}`}
//               />
//             </div>

//             <Image
//               width={1000}
//               height={600}
//               src={slides[current].image}
//               alt="slide"
//               className="w-full h-[400px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
//             />

//             {/* Overlay Text */}
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
//               <p className="text-white text-lg font-medium">{slides[current].overlay}</p>
//             </div>

//             {/* Controls */}
//             <div className="absolute bottom-4 right-4 flex gap-2 z-10">
//               <button
//                 onClick={togglePause}
//                 className="bg-white/90 text-black p-2 rounded-full shadow-lg hover:bg-white transition-all"
//                 aria-label={isPaused ? "Play" : "Pause"}
//               >
//                 {isPaused ? <Play size={20} /> : <Pause size={20} />}
//               </button>
//               <button
//                 onClick={prevSlide}
//                 className="bg-white/90 text-black p-2 rounded-full shadow-lg hover:bg-white transition-all"
//                 aria-label="Previous"
//               >
//                 <ChevronsLeft size={20} />
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="bg-white/90 text-black p-2 rounded-full shadow-lg hover:bg-white transition-all"
//                 aria-label="Next"
//               >
//                 <ChevronsRight size={20} />
//               </button>
//             </div>

//             {/* Counter */}
//             <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
//               {current + 1} / {slides.length}
//             </div>
//           </div>

//           {/* Caption Below */}
//           <div className="mt-4">
//             <h3 className="text-xl font-bold text-gray-800 hover:text-red-600 transition-colors cursor-pointer">
//               {slides[current].caption}
//             </h3>
//           </div>
//         </div>

//         {/* News Section - Right Side */}
//         <div className="lg:w-1/3">
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
//               <h2 className="text-xl font-semibold text-white">সর্বশেষ সংবাদ</h2>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-4">
//               {newsItems.map((item) => (
//                 <div 
//                   key={item.id} 
//                   className="border-b border-gray-100 pb-4 last:border-0 group cursor-pointer"
//                 >
//                   <div className="flex items-start space-x-3">
//                     <div className="flex-shrink-0 mt-1">
//                       <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                     </div>
//                     <div>
//                       <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded mb-1">
//                         {item.category}
//                       </span>
//                       <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
//                         {item.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                         {item.excerpt}
//                       </p>
//                       <span className="text-xs text-gray-500 mt-1 block">
//                         {item.time}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="p-4 border-t border-gray-100">
//               <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-white hover:bg-blue-600 rounded-md border border-blue-600 transition-colors duration-300">
//                 আরও সংবাদ দেখুন
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoSliderWithNews;






















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
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0); // Reset progress when changing slide
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0); // Reset progress when changing slide
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  useEffect(() => {
    if (isPaused) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const startTime = Date.now();
    const duration = 4000; // 4 seconds

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        nextSlide();
      }
    }, 16); // ~60fps

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [current, isPaused]);

  // Calculate equal heights
  const [equalHeight, setEqualHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setEqualHeight(width * 0.5625); // 16:9 aspect ratio
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6" ref={containerRef}>
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

            {/* Dynamic Progress bar */}
            <div className="relative h-1 bg-gray-200">
              <div 
                className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Image Slider with equal height */}
            <div className="relative" style={{ height: `${equalHeight}px` }}>
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

        {/* News Sidebar - Adjusted to match slider height */}
        <div className="lg:w-1/3" style={{ height: `${equalHeight + 120}px` }}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
            <div className="px-6 pt-4 pb-2 border-b">
              <h2 className="text-xl font-bold text-gray-800">সর্বশেষ সংবাদ</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-4 flex-grow overflow-y-auto">
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