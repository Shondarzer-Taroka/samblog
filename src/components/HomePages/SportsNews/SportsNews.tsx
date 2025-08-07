import React from 'react';
import Image from 'next/image';
import { NewsItem } from '@/types/news.types';
import { stripHtmlAndLimitWithSpace } from '@/utils/stripAndLimitHtml';
import { FaClock, FaShareAlt, FaBookmark, FaArrowRight } from 'react-icons/fa';
import { splitTextByLength } from '@/utils/splitTextByLength';
import NewsCardWrapper from '@/share/NewsCardWrapper';
import Link from 'next/link';

const SportsNews = ({ data }: { data: NewsItem[] }) => {
  const leftColumn = data?.slice(0, 2) || [];
  const centerMain = data[2] || {};
  const bottomRow = data?.slice(3, 6) || [];
  const rightColumn = data?.slice(6, 8) || [];

  if (!data) {
    return
  }

  return (
    <section className="bg-gray-50 py-6 md:px-4 px-2">
      <div className="">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-red-600 pb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            <span className="text-red-600">ক্রীড়া</span> সংবাদ
          </h2> <Link href={'/news/খেলাধুলা'}>
          <button className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors">
            সব খবর <FaArrowRight className="ml-2" /> 
          </button>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            {leftColumn.map((item) => (
              <div key={item.id} >
                <NewsCardWrapper href={`/news/${item.category}/${item.id}`} id={item.id}>
                  <div className='block group'>
                    <div

                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={item?.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif'}
                          alt={item.title}
                          fill
                          className="object-cover "
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                      <div className="p-4 h-[110px]">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                          {splitTextByLength(item.title, 12)}
                        </h3>
                        <div className="flex items-center justify-between mt-3">
                          <span className="flex items-center text-sm text-gray-500">
                            <FaClock className="mr-1" /> {new Date(item.createdAt).toLocaleDateString('bn-BD')}
                          </span>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-red-600 transition-colors">
                              <FaBookmark size={14} />
                            </button>
                            <button className="text-gray-400 hover:text-red-600 transition-colors">
                              <FaShareAlt size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NewsCardWrapper>
              </div>
            ))}
          </div>

          {/* Center Column - Featured Story */}
          <div>
            <NewsCardWrapper href={`/news/${centerMain.category}/${centerMain.id}`} id={centerMain.id}>
              <div className='block group'>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative h-96 w-full overflow-hidden">
                    <Image
                      src={centerMain.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif'}
                      alt={centerMain.title}
                      fill
                      className="object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      প্রধান খবর
                    </span>
                  </div>
                  <div className="p-5 md:h-[244px]" >
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                      {centerMain.title}
                    </h2>
                    <p className="text-gray-600 mb-4 text-[15.2px]">
                      {stripHtmlAndLimitWithSpace(centerMain.content,244).short}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-1" /> {new Date(centerMain.createdAt).toLocaleDateString('bn-BD')}
                      </span>
                      <button className="flex items-center text-red-600 hover:text-red-800 font-medium">
                        বিস্তারিত <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </NewsCardWrapper>
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            {rightColumn.map((item) => (
              <div key={item.id}>
                <NewsCardWrapper href={`/news/${item.category}/${item.id}`} id={item.id}>
                <div className='block group'>
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif'}
                        alt={item.title}
                        fill
                        className="object-cover "
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-4 h-[110px]">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                        {splitTextByLength(item.title, 5)}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="flex items-center text-sm text-gray-500">
                          <FaClock className="mr-1" /> {new Date(item.createdAt).toLocaleDateString('bn-BD')}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <FaBookmark size={14} />
                          </button>
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <FaShareAlt size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                </NewsCardWrapper>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bottomRow.map((item) => (
            <div key={item.id}> 
            <NewsCardWrapper  href={`/news/${item.category}/${item.id}`} id={item.id}> 
            <div  className='block group'>
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
              >
                <div className="flex">
                  <div className="relative w-1/3 min-h-[110px] overflow-hidden">
                    <Image
                      src={item.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <FaClock className="mr-1" /> {new Date(item.createdAt).toLocaleDateString('bn-BD')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </NewsCardWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsNews;