// /* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */
import NewsCardWrapper from '@/share/NewsCardWrapper';
import Image from 'next/image';
import React from 'react';


interface Headline {
  id: string;
  category: string;
  title: string;
  imageUrl: string
}

interface CategoryNews {
  title: string;
  imageUrl: string;
  headlines: Headline[];
}

interface EduMedGridProps {
  data: CategoryNews[];
}


const EduMedGrid = ({ data }: EduMedGridProps) => {

  console.log(data, 'edo');

  if (!data || data.length === 0 || !Array.isArray(data)) {
    return <div className='flex justify-center'>  <h1>কোনো খবর পাওয়া যায়নি</h1></div>;
  }

  return (
    data && <div className="bg-gray-50 py-6 md:px-4 px-2 font-noto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="relative inline-block">
              <span className="relative z-10">সর্বশেষ সংবাদ</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-300/60 -z-0" style={{ transform: 'skewY(-2deg)' }}></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">বিভিন্ন বিভাগ থেকে বাছাইকৃত গুরুত্বপূর্ণ সংবাদসমূহ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Featured Category - Takes full width on mobile, half on desktop */}
          {/* <NewsCardWrapper href={`/news/${categories[0].title}`}> </NewsCardWrapper> */}
          <NewsCardWrapper href={`/news/${data[2]?.headlines[2].category}/${data[2]?.headlines[2].id}`} id={`${data[2]?.headlines[2].id}`}>
          <div className='block group h-full' > 

            <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>
              <img
                src={data[2]?.headlines[2].imageUrl || "https://images.dailyamardesh.com/original_images/indestry.jpg"}
                alt={data[2]?.headlines[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                <span className="inline-block px-4 py-1 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
                  {data[2]?.headlines[2].title}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">{data[2]?.headlines[2].title}</h3>
                <p className="text-gray-200 mb-6">{data[2].headlines[1].category}</p>

                <button className="self-start px-6 py-2 bg-red-500 text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors">
                  বিস্তারিত পড়ুন

                </button>
              </div>
            </div>
          </div>
          </NewsCardWrapper>
          {/* Other Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data && data.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    width={250}
                    height={160}
                    src={cat?.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="inline-block px-3 py-1 bg-black/70 text-white text-xs font-medium rounded-full">
                      {cat.title}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
                    {cat.headlines.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2"></span>
                        <NewsCardWrapper href={`/news/${hl.category}/${hl.id}`} id={hl.id}>
                          <p className="text-gray-800 hover:text-red-600 cursor-pointer transition-colors">
                            {hl.title}
                          </p>
                        </NewsCardWrapper>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <NewsCardWrapper
                      href={`/news/${cat?.title}`}
                      id={
                        cat.headlines[Math.floor(Math.random() * cat.headlines.length)]?.id
                      }
                    >
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center">
                        আরও দেখুন
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </NewsCardWrapper>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll Section for Mobile */}
        <div className="mt-12 lg:hidden">
          <h3 className="text-xl font-bold text-gray-900 mb-6 px-2">অন্যান্য বিভাগ</h3>
          <div className="flex overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {data.map((cat, idx) => (
              <div key={idx} className="flex-shrink-0 w-64 mr-4 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 relative">
                  <img
                    src={cat?.imageUrl || 'https://images.dailyamardesh.com/original_images/indestry.jpg'}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-3">
                    <span className="inline-block px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                      {cat.title}
                    </span>
                  </div>
                </div>
                <NewsCardWrapper href={`/news/${cat.headlines[0]?.category}/${cat.headlines[0]?.id}`} id={cat?.headlines[0].id}>
                  <div className="p-3">
                    <p className="text-sm text-gray-800 font-medium mb-2 line-clamp-2">
                      {cat.headlines[0].title}
                    </p>
                    <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                      বিস্তারিত
                    </button>
                  </div>
                </NewsCardWrapper>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        {/* <div className="mt-16 text-center">
          <button className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
            সব সংবাদ দেখুন
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default EduMedGrid;