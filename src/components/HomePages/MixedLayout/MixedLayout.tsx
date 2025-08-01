import TitleNewsOverSection from "@/share/TitleNewsOverSection";
import { NewsItem } from "@/types/news.types";
import { getBengaliTimeAgo } from "@/utils/getBengaliTimeAgo";
import { stripHtmlAndLimit } from "@/utils/stripAndLimitHtml";
import Image from "next/image";
import Link from "next/link";
import React from "react";


type mixedLayoutProps = {
  randomNews: NewsItem;
  categoryStats: {
    id: string;
    category: string;
    imageUrl: string;
    count: number;
    title:string;
    createdAt:string;
    categoryTitle:string
  }[],
  featuredCategories:NewsItem[]
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

          <TitleNewsOverSection headline="একটু থামুন" />
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            <Link href={'/news/ফান'}> 
            সব দেখুন
            </Link>
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
            <Link href={`/news/${data.randomNews.category}`}>
            <h3 className="text-xl font-bold text-white mb-2 hover:text-red-600 leading-tight">
              {data.randomNews.title}
            </h3>
             </Link>
            <p className="text-sm text-gray-200 mb-3 line-clamp-2">
              {data.randomNews?.content && stripHtmlAndLimit(data.randomNews?.content,25).short}
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
          {data.categoryStats.map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100 hover:border-gray-200"
            >
              <div className="flex-shrink-0 relative">
                <Image
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'}
                  width={80}
                  height={80}
                  alt="thumb"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="absolute -top-2 -right-2 bg-white text-xs font-bold text-blue-600 px-2 py-1 rounded-full shadow">
                  {i + 1}
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-600">{item.categoryTitle}</span>
                <Link href={`/news/${item.category}`}>
                <h4 className="text-base font-semibold text-gray-800 leading-snug mt-1 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h4>
                </Link>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {getBengaliTimeAgo(item.createdAt)}
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
            <Image
              src={data.featuredCategories[0]?.imageUrl || 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'}
              alt="featured"
              height={256}
              width={350}
              className="w-full h-[280px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 z-20 p-5 w-full">
              <span className="inline-block bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
                {data.featuredCategories[0].category}
              </span>
              <Link href={`/news/${data.featuredCategories[0].category}`}>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-600 transition-colors">
                {data.featuredCategories[0].title}
              </h3>
              </Link>
              <p className="text-sm text-gray-200 mb-2 line-clamp-2">
                {stripHtmlAndLimit(data.featuredCategories[0].content,25).short}
              </p>
              <div className="flex items-center text-xs text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {getBengaliTimeAgo(data.featuredCategories[0].createdAt)}
              </div>
            </div>
          </div>

          {/* Article List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.featuredCategories.slice(1).map((item, i) => (
              <div
                key={i}
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <div className="relative overflow-hidden rounded-lg mb-3 h-40">
                  <Image
                  height={200}
                  width={200}
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'}
                    alt="thumb"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 text-xs font-bold text-blue-600 px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>
                <Link href={`/news/${item.category}`}> 
                <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-red-600 transition-colors">
                  {item.title}
                </h4>
                </Link>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {getBengaliTimeAgo(item.createdAt)}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full more-read-btn  mt-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform  hidden items-center justify-center">
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