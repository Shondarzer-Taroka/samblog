



// 'use client';

// import { NewsItem } from '@/types/news.types';
// import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
// import Image from 'next/image';
// import React from 'react';



// // const leftColumn: NewsItem[] = [
// //   {
// //     id: 1,
// //     image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
// //     title: '৩৭২ রান তাড়ায় বেন ডাকেটের সেঞ্চুরি',
// //   },

// //   {
// //     id: 3,
// //     image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
// //     title: 'মেসির সামনে সিংহ করতে চেয়েছিলেন...',
// //   },
// // ];

// // const centerMain: NewsItem = {
// //   id: 4,
// //   image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
// //   title: 'সাবিনাদের প্রসঙ্গে কোচ-অধিনায়কের ‘নো কমেন্টস’',
// //   description:
// //     'এএফসি উইমেন অলিম্পিক কোয়ালিফায়ার বাছাইপর্ব খেলতে মিয়ানমার যাচ্ছে বাংলাদেশ নারী দল...',
// // };

// // const rightColumn: NewsItem[] = [
// //   {
// //     id: 5,
// //     image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
// //     title: 'সাবিনাদের প্রসঙ্গে কোচ-অধিনায়কের ‘নো কমেন্টস',
// //   },
// //   {
// //     id: 6,
// //     image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
// //     title: 'এএফসি উইমেন অলিম্পিক কোয়ালিফায়ার বাছাইপর্ব',
// //   },
// // ];

// // const bottomRow: NewsItem[] = [
// //   {
// //     id: 8,
// //     image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
// //     title: 'চ্যাম্পিয়ন্স মেসিকে দেখে পাঁ কাঁপছিল ‘মেসিহেটার’-এর',
// //   },
// //   {
// //     id: 9,
// //     image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
// //     title: 'প্রথমবার অলিম্পিক দে রানে সম্মাননা জানাল বিওএ',
// //   },
// //   {
// //     id: 7,
// //     image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
// //     title: 'ফিফা সভাপতির সঙ্গে তাবিথ আউয়ালের সাক্ষাৎ',
// //   },
// // ];

// const SportsNews = ({ data }: { data: NewsItem[] }) => {


//   const leftColumn = data?.slice(0, 2) || []
//   const centerMain = data[2] || {}
//   const bottomRow = data?.slice(3, 6) || []
//   const rightColumn = data?.slice(6, 8) || []
//   return (
//     <section className='mt-24'>
//       <div className="px-2 py-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.33fr_0.8fr] gap-4">
//         {/* Left Column */}
//         <div className="space-y-4 w-full">
//           {leftColumn.map((item) => (
//             <div key={item.id} className="space-y-2">
//               <Image width={250} height={200} src={item?.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif'} alt={item.title} className="w-full  rounded" />
//               <p className="text-sm font-medium leading-snug">{item.title}</p>
//             </div>
//           ))}
//         </div>

//         {/* Center Column */}
//         <div className='w-full'>
//           <Image src={centerMain.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif'} alt={centerMain.title} width={350} height={200} className="w-full  rounded" />
//           <h2 className="text-lg font-semibold mt-2">{centerMain.title}</h2>
//           <p className="text-sm text-gray-700">{stripHtmlAndLimit(centerMain.content,20).short}</p>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-4 w-full">
//           {rightColumn.map((item) => (
//             <div key={item.id} className="space-y-2">
//               <Image width={250} height={200} src={item.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif'} alt={item.title} className="w-full  rounded" />
//               {item.title && <p className="text-sm font-medium leading-snug">{item.title}</p>}
//             </div>
//           ))}
//         </div>
//       </div>


//       {/* Bottom Row (Full Width) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-2 ">
//         {bottomRow.map((item) => (
//           <div key={item.id} className="flex gap-3 items-start">
//             <Image src={item.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif'} alt={item.title} width={150} height={90} className="w- h-[90px] object-cover rounded" />
//             <p className="text-sm font-medium leading-snug">{item.title}</p>
//           </div>
//         ))}
//       </div>

//     </section>
//   );
// };

// export default SportsNews;


















import React from 'react';
import Image from 'next/image';
import { NewsItem } from '@/types/news.types';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import { FaClock, FaShareAlt, FaBookmark, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { splitTextByLength } from '@/utils/splitTextByLength';

const SportsNews = ({ data }: { data: NewsItem[] }) => {
  const leftColumn = data?.slice(0, 2) || [];
  const centerMain = data[2] || {};
  const bottomRow = data?.slice(3, 6) || [];
  const rightColumn = data?.slice(6, 8) || [];

  return (
    <section className="bg-gray-50 py-6 md:px-4 px-2">
      <div className="">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-red-600 pb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            <span className="text-red-600">ক্রীড়া</span> সংবাদ
          </h2>
          <button className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors">
            সব খবর <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            {leftColumn.map((item) => (
              <Link key={item.id} href={`/news/${item.category}/${item.id}`} className='block group'>
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
                {splitTextByLength(item.title,12)}
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
              </Link>
            ))}
          </div>

          {/* Center Column - Featured Story */}

          <Link href={`/news/${centerMain.category}/${centerMain.id}`} className='block group'>
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
              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                  {centerMain.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {stripHtmlAndLimit(centerMain.content, 37).short}
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
          </Link>
          {/* Right Column */}
          <div className="space-y-6">
            {rightColumn.map((item) => (
              <Link href={`/news/${item.category}/${item.id}`} key={item.id} className='block group'> 
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
                    {splitTextByLength(item.title,5)}
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
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bottomRow.map((item) => (
            <Link key={item.id} href={`/news/${item.category}/${item.id}`} className='block group'> 
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsNews;