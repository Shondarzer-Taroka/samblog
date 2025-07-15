

// 'use client';
// import Image from 'next/image';
// import React, { useState } from 'react';

// const newsData = [
//   {
//     img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/08/small/Untitled-1-67f524a14f810.jpg',
//     title: 'ঘুষের টাকা ফেরত দিতে বাধ্য হলেন শিক্ষা কর্মকর্তা',
//   },
//   {
//     img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/08/small/Untitled-1-67f524a14f810.jpg',
//     title: 'যেভাবে রাজউকের ১০ কর্মকর্তার প্লট ভাগিয়ে নেন পুতুল',
//   },
//   {
//     img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/08/small/Untitled-1-67f524a14f810.jpg',
//     title: 'বঙ্গোপসাগরে সুস্পষ্ট লঘুচাপ, আবহাওয়া অফিসের সতর্কবার্তা',
//   },
//   {
//     img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/08/small/Untitled-1-67f524a14f810.jpg',
//     title: 'ঘুষের টাকা ফেরত দিতে বাধ্য হলেন শিক্ষা কর্মকর্তা',
//   },
//   {
//     img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/08/small/Untitled-1-67f524a14f810.jpg',
//     title: 'যেভাবে রাজউকের ১০ কর্মকর্তার প্লট ভাগিয়ে নেন পুতুল',
//   },
//   {
//     img: 'https://via.placeholder.com/80x60?text=Img3',
//     title: 'বঙ্গোপসাগরে সুস্পষ্ট লঘুচাপ, আবহাওয়া অফিসের সতর্কবার্তা',
//   },
// ];

// const NewsTabs = () => {
//   const [activeTab, setActiveTab] = useState('latest');

//   return (
//     <div className= "w-full md:w-80 bg-white border border-gray-200 rounded shadow overflow-hidden flex flex-col">
//       {/* Tabs */}
//       <div className="flex border-b text-sm font-semibold">
//         <button
//           onClick={() => setActiveTab('latest')}
//           className={`flex-1 py-2 text-center text-lg ${
//             activeTab === 'latest' ? 'bg-red-600 text-white' : 'text-gray-700'
//           }`}
//         >
//           সর্বশেষ
//         </button>
//         <button
//           onClick={() => setActiveTab('popular')}
//           className={`flex-1 py-2 text-center text-lg ${
//             activeTab === 'popular' ? 'bg-red-600 text-white' : 'text-gray-700'
//           }`}
//         >
//           সর্বাধিক পঠিত
//         </button>
//       </div>

//       {/* Scrollable News Items */}
//       <div className="divide-y overflow-y-auto h-[300px]">
//         {newsData.map((item, idx) => (
//           <div key={idx} className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer">
//             <Image src={item.img} alt="news" width={80} height={64} className="w-20 h-16 object-cover rounded" />
//             <p className="text-[17px] font-medium text-gray-800 leading-snug">
//               {item.title}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Button */}
//       <div className="bg-red-700 text-white text-center py-2 font-semibold cursor-pointer hover:bg-red-800">
//         সব খবর
//       </div>
//     </div>
//   );
// };

// export default NewsTabs;


'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { incrementNewsView } from '@/utils/incrementNewsView'; // Adjust path as needed

interface NewsItem {
  id: string;
  title: string;
  imageUrl: string | null;
}

const NewsTabs = () => {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const [news, setNews] = useState<{ latest: NewsItem[]; mostRead: NewsItem[] }>({
    latest: [],
    mostRead: [],
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:7700/api/news/news-tabs');
        setNews(res.data);
      } catch (error) {
        console.error('Failed to load news', error);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = async (id: string) => {
    await incrementNewsView(id);

    // Optional: Navigate or open detail
    // router.push(`/news/${id}`);
  };

  const itemsToDisplay = activeTab === 'latest' ? news.latest : news.mostRead;

  return (
    <div className="w-full md:w-80 bg-white border border-gray-200 rounded shadow overflow-hidden flex flex-col">
      {/* Tabs */}
      <div className="flex border-b text-sm font-semibold">
        <button
          onClick={() => setActiveTab('latest')}
          className={`flex-1 py-2 text-center text-lg ${
            activeTab === 'latest' ? 'bg-red-600 text-white' : 'text-gray-700'
          }`}
        >
          সর্বশেষ
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`flex-1 py-2 text-center text-lg ${
            activeTab === 'popular' ? 'bg-red-600 text-white' : 'text-gray-700'
          }`}
        >
          সর্বাধিক পঠিত
        </button>
      </div>

      {/* News List */}
      <div className="divide-y overflow-y-auto h-[300px]">
        {itemsToDisplay.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleNewsClick(item.id)}
          >
            <Image
              src={item.imageUrl || '/fallback.jpg'}
              alt="news"
              width={80}
              height={64}
              className="w-20 h-16 object-cover rounded"
            />
            <p className="text-[17px] font-medium text-gray-800 leading-snug">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="bg-red-700 text-white text-center py-2 font-semibold cursor-pointer hover:bg-red-800">
        সব খবর
      </div>
    </div>
  );
};

export default NewsTabs;
