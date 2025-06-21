// // ShareDivisionNews
// 'use client';


import Image from 'next/image';
import React from 'react';

const categories = [
  'টেলিভিশন', 'ওটিটি', 'তারকাবিশ্ব', 'চলচ্চিত্র', 'বিনোদন', 'হলিউড', 'বিশ্ব চলচ্চিত্র', 'গান', 'নাটক', 'আনন্দ'
];

const articles = [
  {
    title: "১২ দিন পরে সরে গেল ‘আলসিক’, ট্রেডিংয়ে শীতে মাছ বিক্রেতা ও ভুগার ঝাড়ার গল্প",
    summary: '২১ মিনিট আগে',
    img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-05-29%2Ftv92nkyx%2FKhaleda-zia.png?rect=19%2C0%2C1229%2C819&w=622&auto=format%2Ccompress&fmt=avif',
    large: true,
  },
  {
    title: 'উৎসবঘাতী দুর্ঘটনার দিন থেকেই নিখোঁজ, ডিএনএ পরীক্ষায় খুঁজে মিলল নিথরতা',
    summary: '২ ঘণ্টা আগে',
    img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-05-29%2Ftv92nkyx%2FKhaleda-zia.png?rect=19%2C0%2C1229%2C819&w=622&auto=format%2Ccompress&fmt=avif',
  },
  {
    title: 'শাহরুখের বাড়ি মামলার সত্যিই কি অবৈধ নির্মাণকার্য চলছে',
    summary: '৬ ঘণ্টা আগে',
    img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-05-29%2Ftv92nkyx%2FKhaleda-zia.png?rect=19%2C0%2C1229%2C819&w=622&auto=format%2Ccompress&fmt=avif',
  },
  {
    title: '৩০ বছর আগে মৌকে বন্ধুরা বলেছিলেন, “তুই কিছুই পারবি না”',
    summary: '৮ ঘণ্টা আগে',
    img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-05-29%2Ftv92nkyx%2FKhaleda-zia.png?rect=19%2C0%2C1229%2C819&w=622&auto=format%2Ccompress&fmt=avif',
  },
  {
    title: 'এবার আর প্রেক্ষাগৃহে ছবি তুলতে নিষেধ করবেন না আমির',
    summary: '৮ ঘণ্টা আগে',
    img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-05-29%2Ftv92nkyx%2FKhaleda-zia.png?rect=19%2C0%2C1229%2C819&w=622&auto=format%2Ccompress&fmt=avif',
  },
    {
    title: 'শাহরুখের বাড়ি মামলার সত্যিই কি অবৈধ নির্মাণকার্য চলছে',
    summary: '৬ ঘণ্টা আগে',
    img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-05-29%2Ftv92nkyx%2FKhaleda-zia.png?rect=19%2C0%2C1229%2C819&w=622&auto=format%2Ccompress&fmt=avif',
  },
  {
    title: '৩০ বছর আগে মৌকে বন্ধুরা বলেছিলেন, “তুই কিছুই পারবি না”',
    summary: '৮ ঘণ্টা আগে',
    img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-05-29%2Ftv92nkyx%2FKhaleda-zia.png?rect=19%2C0%2C1229%2C819&w=622&auto=format%2Ccompress&fmt=avif',
  }
];

const ShareDivisionNews = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Title & Categories */}
      <h2 className="text-2xl font-bold mb-2">বিনোদন</h2>
      <div className="flex flex-wrap text-sm text-blue-700 mb-6 gap-x-2 gap-y-1">
        {categories.map((cat, idx) => (
          <span key={idx} className="cursor-pointer hover:underline">• {cat}</span>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Featured Article */}
        <div className="md:col-span-1">
          <div className="relative w-full h-[230px] md:h-[300px] rounded overflow-hidden">
            <Image
              src={articles[0].img}
              alt={articles[0].title}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-bold mt-3 hover:text-red-600 cursor-pointer">
            {articles[0].title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{articles[0].summary}</p>
        </div>

        {/* Side Articles */}
        <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="relative w-full h-[150px] rounded overflow-hidden">
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-semibold hover:text-red-600 cursor-pointer">
                {article.title}
              </h4>
              <p className="text-gray-500 text-xs">{article.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShareDivisionNews;
