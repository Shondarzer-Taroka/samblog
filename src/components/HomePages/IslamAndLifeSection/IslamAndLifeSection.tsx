/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// import React from 'react';

// const IslamAndLifeSection = () => {
//   return (
//     <div className="bg-gray-100 py-8 px-4 font-noto">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Side: Articles */}
//         <div className="col-span-2">
//           <h2 className="text-xl font-bold text-red-600 border-b border-red-600 pb-2 mb-4 flex items-center">
//             <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
//             ইসলাম ও জীবন
//           </h2>

//           <ul className="space-y-6">
//             {[
//               {
//                 title: 'হজ শেষ করেছেন ৫৪ হাজার ৩৬৩ রোহিঙ্গা',
//                 time: '২৮ জুন ২০২৫, ০৪:৪১ পূর্বাহ্ণ'
//               },
//               {
//                 title: 'পবিত্র আরাফাত ও জুমা',
//                 time: '২৮ জুন ২০২৫, ০৩:৫১ পূর্বাহ্ণ'
//               },
//               {
//                 title: 'ফরজ গোসলদের বিস্তারিত নিয়ম, কী করা যাবে কী যাবে না',
//                 time: '২৭ জুন ২০২৫, ১০:২৬ পিএম'
//               },
//               {
//                 title: 'মেলা জান্নাতের পর পুরুষদের সাধারণ প্রশ্ন করা হবে?',
//                 time: '২৭ জুন ২০২৫, ০৫:১৪ পিএম'
//               },
//             ].map((article, idx) => (
//               <li key={idx} className="group border-b pb-3 cursor-pointer">
//                 <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition">
//                   {article.title}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">প্রকাশ: {article.time}</p>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Right Side: Feature Box */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <img 
//             src="https://cdn.jugantor.com/assets/news_photos/2025/06/28/Untitled-1-685fce9f5b9b1.jpg"
//             alt="যুগান্তর"
//             className="w-full object-contain p-4 bg-red-700"
//           />
//           <div className="p-4">
//             <h3 className="text-lg font-bold text-gray-800 mb-2">
//               মহররমের রোজা কেন রাখা উত্তম?
//             </h3>
//             <p className="text-sm text-gray-600">
//               হিজরি ১৪৪৭ সালের মহররম মাস চলছে। ইসলামের ইতিহাসে মহররম অত্যন্ত গুরুত্বপূর্ণ একটি মাস। রাসুল (সা.) বলেছেন, ‘রমজান মাসের পর সর্বশ্রেষ্ঠ রোজা হলো আল্লাহর মাস মহররমের রোজা।’ (সহিহ মুসলিম)।
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IslamAndLifeSection;























import NewsCardWrapper from '@/share/NewsCardWrapper';
import TitleNewsOverSection from '@/share/TitleNewsOverSection';
import { NewsItem } from '@/types/news.types';
import { getBengaliTimeAgo } from '@/utils/getBengaliTimeAgo';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import React from 'react';
import { FaClock, FaBookmark, FaShareAlt } from 'react-icons/fa';

const IslamAndLifeSection = ({ islamicNews, maxim }: { islamicNews: NewsItem[]; maxim: NewsItem }) => {

  if (islamicNews.length === 0) {
    return
  }


  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-2 md:px-4 font-noto ">
      <div className="">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">

          <TitleNewsOverSection headline='   ইসলাম ও জীবন' />
          <button className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
            সব দেখুন →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Articles */}
          <div className="lg:col-span-2 space-y-6">
            {islamicNews.map((article, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <NewsCardWrapper href={`/news/${article.category}/${article.id}`} id={article.id}>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                          {article.title}
                        </h3>
                      </NewsCardWrapper>
                      <p className="text-gray-600 mb-3">{stripHtmlAndLimit(article.content, 8).short}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <FaBookmark />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-1" />
                    <span>প্রকাশ: {getBengaliTimeAgo(article.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Feature Box */}
          {islamicNews.length > 0 && <div className="relative">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                <div className="relative h-48 bg-red-700 flex items-center justify-center">
                  <img
                    src={islamicNews[4]?.imageUrl || "https://cdn.jugantor.com/assets/news_photos/2025/06/28/Untitled-1-685fce9f5b9b1.jpg"}
                    alt={islamicNews[4].title}
                    className="max-h-full max-w-full object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 text-white text-sm font-medium bg-red-600 px-3 py-1 rounded-full">
                    বিশেষ প্রতিবেদন
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {/* মহররমের রোজা কেন রাখা উত্তম? */}
                    {islamicNews[4].title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {stripHtmlAndLimit(islamicNews[4].content, 25).short}
                    {/* হিজরি ১৪৪৭ সালের মহররম মাস চলছে। ইসলামের ইতিহাসে মহররম অত্যন্ত গুরুত্বপূর্ণ একটি মাস। রাসুল (সা.) বলেছেন, &lsquo;রমজান মাসের পর সর্বশ্রেষ্ঠ রোজা হলো আল্লাহর মাস মহররমের রোজা।' (সহিহ মুসলিম)। */}
                  </p>
                  <NewsCardWrapper id={islamicNews[4].id} href={`/news/${islamicNews[4].category}/${islamicNews[4].id}`}>
                    <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                      সম্পূর্ণ পড়ুন
                    </button>
                  </NewsCardWrapper>
                </div>
              </div>

              {/* Additional Featured Content */}
              <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 md:p-4">
                  <h4 className="font-bold text-lg text-gray-800 mb-3">

                    {/* আজকের ইসলামিক বাণী */}
                    {maxim.title}

                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-600">
                    <p className="text-gray-700 italic">{maxim.content}</p>
                    {/* <p className="text-gray-700 italic">"যে ব্যক্তি আল্লাহর সন্তুষ্টির জন্য জ্ঞান অর্জন করে, আল্লাহ তাকে জান্নাতের পথ সহজ করে দেন।"</p> */}
                    {/* <p className="text-right text-sm text-gray-500 mt-2">- সহিহ বুখারী</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default IslamAndLifeSection;