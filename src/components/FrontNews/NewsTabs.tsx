

'use client';
import React, { useState } from 'react';

const newsData = [
  {
    img: 'https://via.placeholder.com/80x60?text=Img1',
    title: 'ঘুষের টাকা ফেরত দিতে বাধ্য হলেন শিক্ষা কর্মকর্তা',
  },
  {
    img: 'https://via.placeholder.com/80x60?text=Img2',
    title: 'যেভাবে রাজউকের ১০ কর্মকর্তার প্লট ভাগিয়ে নেন পুতুল',
  },
  {
    img: 'https://via.placeholder.com/80x60?text=Img3',
    title: 'বঙ্গোপসাগরে সুস্পষ্ট লঘুচাপ, আবহাওয়া অফিসের সতর্কবার্তা',
  },
  {
    img: 'https://via.placeholder.com/80x60?text=Img1',
    title: 'ঘুষের টাকা ফেরত দিতে বাধ্য হলেন শিক্ষা কর্মকর্তা',
  },
  {
    img: 'https://via.placeholder.com/80x60?text=Img2',
    title: 'যেভাবে রাজউকের ১০ কর্মকর্তার প্লট ভাগিয়ে নেন পুতুল',
  },
  {
    img: 'https://via.placeholder.com/80x60?text=Img3',
    title: 'বঙ্গোপসাগরে সুস্পষ্ট লঘুচাপ, আবহাওয়া অফিসের সতর্কবার্তা',
  },
];

const NewsTabs = () => {
  const [activeTab, setActiveTab] = useState('latest');

  return (
    <div className="w-80 bg-white border border-gray-200 rounded shadow overflow-hidden flex flex-col">
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

      {/* Scrollable News Items */}
      <div className="divide-y overflow-y-auto h-[300px]">
        {newsData.map((item, idx) => (
          <div key={idx} className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer">
            <img src={item.img} alt="news" className="w-20 h-16 object-cover rounded" />
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
