// import React from 'react';

// const Category = () => {
//     return (
//         <section>
             
//         </section>
//     );
// };

// export default Category;






'use client';

import Image from 'next/image';
import Advertisement from '@/share/Advertisement';

const Category = () => {
  return (
    <section className="px-2 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6">রাজনীতি</h2>

      {/* --- Main layout: content + right‑side ad --- */}
      <div className="lg:flex lg:gap-6">
        {/* ---------- NEWS GRID ---------- */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Large Card */}
          <div className="lg:col-span-2 relative">
            <div className='w-full h-full bg-[#00000072] absolute top-0'></div>
            <div className="h-full bg-white shadow-md">
              <Image
                src="https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg"
                alt="Main news"
                width={800}
                height={450}
                className="w-full h-full"
              />
              <div className="p-4 absolute bottom-0 text-white">
                <h3 className="text-lg font-semibold leading-snug hover:text-red-600 cursor-pointer ">
                  ইসলামী আন্দোলনের মহাসমাবেশ: লোহাপট্টনীতে যোগ দিলেন নেতা-কর্মীরা
                </h3>
                <p className="text-sm text-white mt-2">২ ঘণ্টা আগে</p>
              </div>
            </div>
          </div>

          {/* Top‑right two small cards */}
          <div className="flex flex-col gap-6">
            {['দৈনন্দিনতা নয় আন্দোলন গুরুত্বের উন্নয়নে ভূমিকা, ফেসবুকে জানালেন আফরিন',
              'রাজপথের লড়াইয়ে ঝাঁপিয়ে পড়ুন, ছাত্রদলকে বিএনপি'
            ].map((title, i) => (
              <div key={i} className="bg-white shadow-md">
                <Image
                  src="https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg"
                  alt={title}
                  width={400}
                  height={220}
                  className="w-full h-[140px] object-cover"
                />
                <div className="p-3">
                  <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">২ ঘণ্টা আগে</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row – 3 cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white shadow-md">
                {/* Swap in real thumbnails ↓ */}
                <Image
                  src={`https://picsum.photos/id/${item + 10}/400/200`}
                  alt="News"
                  width={400}
                  height={200}
                  className="w-full h-[160px] object-cover"
                />
                <div className="p-3">
                  <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                    {item === 1
                      ? 'অবৈধ সরকারের ক্ষমতায় টিকে থাকার সুযোগ নেই'
                      : item === 2
                      ? 'প্রধান নির্বাচন কমিশনারকে অব্যাহতি দিতে চায় বিএনপি'
                      : 'ঢাকা-চট্টগ্রাম কর্মসূচি সফল করার আহ্বান'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">২ ঘণ্টা আগে</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- RIGHT‑SIDE AD ---------- */}
        <aside className="hidden lg:block w-[300px] sticky top-24">
          <Advertisement
            src="https://s0.2mdn.net/dfp/366178/288802258/1748751513010/300x250_2.png"
            href="https://your-advertiser.com"
            alt="Buy your dream laptop today!"
            orientation="vertical"   /* 300×600 */
            className="mx-auto"
          />
        </aside>
      </div>

      {/* Optional: banner ad below the section */}
      <div className="mt-10">
        <Advertisement
          src="/ads/banner-728x90.jpg"
          href="https://another‑sponsor.com"
          alt="Special discount — limited time"
          orientation="horizontal"  /* 728×90 */
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default Category;
