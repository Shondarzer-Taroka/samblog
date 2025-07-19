/* eslint-disable @next/next/no-img-element */
import TitleNewsOverSection from "@/share/TitleNewsOverSection";
import { NewsItem } from "@/types/news.types";
import { getBengaliTimeAgo } from "@/utils/getBengaliTimeAgo";
import { stripHtmlAndLimit } from "@/utils/stripAndLimitHtml";
import Image from "next/image";
import React from "react";

const leftArticles = [
  {
    title: "একজনের সংগ্রহে ৩৮ হাজার চামচ",
    excerpt:
      "যুক্তরাষ্ট্রের ম্যাসাচুসেটসের রকপোর্টে একটি কাঠের ক্যাবিন ২৫টির বেশি গাড়ি ক্ষতিগ্রস্ত করেছে।",
    time: "৪ ঘণ্টা আগে",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    category: "অনন্য সংগ্রহ",
  },
  {
    title: "কেন্টা খুঁজতে গিয়ে ডাইনোসর",
    time: "৪ ঘণ্টা আগে",
    thumb: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    category: "প্রত্নতত্ত্ব",
  },
  {
    title: "হাইপেগ্গুর আয়ন যখন বোলতের ছিপির সমান",
    time: "৮ ঘণ্টা আগে",
    thumb: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    category: "বিজ্ঞান",
  },
  {
    title: "আপনাকে একটু থামায় আসতে হবে",
    time: "৮ ঘণ্টা আগে",
    thumb: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    category: "জীবনধারা",
  },
  {
    title: "কেন্টা খুঁজতে গিয়ে ডাইনোসর",
    time: "৪ ঘণ্টা আগে",
    thumb: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    category: "প্রত্নতত্ত্ব",
  },
  {
    title: "হাইপেগ্গুর আয়ন যখন বোলতের ছিপির সমান",
    time: "৮ ঘণ্টা আগে",
    thumb: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    category: "বিজ্ঞান",
  },

];

const rightArticles = [
  {
    title: "যেভাবে ভাষা বাঁধা সিইওদের সহকারী হয়ে উঠছে এআই",
    excerpt:
      "মেশিন লেখা বা কাজে সারাংশ তৈরির নয় সামাজিক কাজের গতি, মান এবং সিদ্ধান্ত গ্রহণের ক্ষমতা বাড়াতে কৃত্রিম বুদ্ধিমত্তার ব্যবহার বাড়ছে।",
    time: "৪ ঘণ্টা আগে",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    category: "প্রযুক্তি",
  },
  {
    title: "ইরান: প্রাচীন সভ্যতায় আলোচিত এক অপরূপ সৌন্দর্যের দেশ",
    time: "৭ ঘণ্টা আগে",
    thumb: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    category: "ভ্রমণ",
  },
  {
    title: "ফুলে ফুলে রূপচর্চা: মুখ মুছে ধরে কুক ও তুলেন যন্ত্র নিচ্ছে এই ৫ ফুল",
    time: "৯ ঘণ্টা আগে",
    thumb: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    category: "স্বাস্থ্য",
  },
  {
    title: "আপনি কি কাউকে বাঁশ দিতে চান? ভিডিওতে দেখুন কুমিল্লার ৪২ প্রজাতির চোরা-আলোচনায় বাঁশ",
    time: "১০ ঘণ্টা আগে",
    thumb: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    category: "কৃষি",
  },
];

type mixedLayoutProps = {
  randomNews: NewsItem;
  categoryStats: {
    id: string;
    category: string;
    imageUrl: string;
    count: number
  }
}

export default function MixedLayout({ data }: { data: mixedLayoutProps }) {

  if (data === undefined) {
    return <h1>data not found</h1>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-4  py-6">
      {/* Left Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          {/* <h2 className="text-2xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1 rounded-lg inline-block">
              একটু থামুন
            </span>
          </h2> */}
          <TitleNewsOverSection headline="       একটু থামুন" />
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            সব দেখুন
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Featured Article */}
        <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
          <Image
            height={320}
            width={340}
            src={data.randomNews.imageUrl || 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'}
            alt="main"
            className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
              {data.randomNews.category}
            </span>
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
              {data.randomNews.title}
            </h3>
            <p className="text-sm text-gray-200 mb-3 line-clamp-2">
              {stripHtmlAndLimit(data.randomNews.content,25).short}
            </p>
            <div className="flex items-center text-xs text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {getBengaliTimeAgo(data.randomNews.createdAt)}
            </div>
          </div>
        </div>

        {/* Article List */}
        <div className="space-y-4">
          {leftArticles.slice(1).map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100 hover:border-gray-200"
            >
              <div className="flex-shrink-0 relative">
                <img
                  src={item.thumb}
                  alt="thumb"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="absolute -top-2 -right-2 bg-white text-xs font-bold text-blue-600 px-2 py-1 rounded-full shadow">
                  {i + 1}
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-600">{item.category}</span>
                <h4 className="text-base font-semibold text-gray-800 leading-snug mt-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl md:px-4 px-2 py-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                হেলফ্যাশন
              </span>
            </h2>
            <p className="text-sm text-gray-600 tracking-widest uppercase">স্বাস্থ্য ও ফ্যাশন</p>
          </div>

          {/* Featured Article */}
          <div className="group relative overflow-hidden rounded-xl shadow-md mb-6">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src={rightArticles[0].image}
              alt="featured"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 z-20 p-5 w-full">
              <span className="inline-block bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
                {rightArticles[0].category}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                {rightArticles[0].title}
              </h3>
              <p className="text-sm text-gray-200 mb-2 line-clamp-2">
                {rightArticles[0].excerpt}
              </p>
              <div className="flex items-center text-xs text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {rightArticles[0].time}
              </div>
            </div>
          </div>

          {/* Article List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rightArticles.slice(1).map((item, i) => (
              <div
                key={i}
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <div className="relative overflow-hidden rounded-lg mb-3 h-40">
                  <img
                    src={item.thumb}
                    alt="thumb"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 text-xs font-bold text-blue-600 px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.time}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full more-read-btn  mt-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform  flex items-center justify-center">
            আরও পড়ুন
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}