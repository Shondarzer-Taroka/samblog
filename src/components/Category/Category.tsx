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

const Category = () => {
  return (
    <section className="px-2 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6">রাজনীতি</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Large Card */}
        <div className="lg:col-span-2">
          <div className="h-full bg-white shadow-md">
            <Image
              src="https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg"
              alt="Main news"
              width={800}
              height={450}
              className="w-full h-[280px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold leading-snug hover:text-red-600 cursor-pointer">
                ইসলামী আন্দোলনের মহাসমাবেশ: লোহাপট্টনীতে যোগ দিলেন নেতা-কর্মীরা
              </h3>
              <p className="text-sm text-gray-500 mt-2">২ ঘণ্টা আগে</p>
            </div>
          </div>
        </div>

        {/* Top Right Two Small Cards */}
        <div className="flex flex-col gap-6">
          {/* Top Right Card 1 */}
          <div className="bg-white shadow-md">
            <Image
              src="https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg"
              alt="News"
              width={400}
              height={220}
              className="w-full h-[140px] object-cover"
            />
            <div className="p-3">
              <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                দৈনন্দিনতা নয় আন্দোলন গুরুত্বের উন্নয়নে ভূমিকা, ফেসবুকে জানালেন আফরিন
              </h3>
              <p className="text-sm text-gray-500 mt-1">২ ঘণ্টা আগে</p>
            </div>
          </div>

          {/* Top Right Card 2 */}
          <div className="bg-white shadow-md">
            <Image
              src="https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg"
              alt="News"
              width={400}
              height={220}
              className="w-full h-[140px] object-cover"
            />
            <div className="p-3">
              <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                রাজপথের লড়াইয়ে ঝাঁপিয়ে পড়ুন, ছাত্রদলকে বিএনপি
              </h3>
              <p className="text-sm text-gray-500 mt-1">২ ঘণ্টা আগে</p>
            </div>
          </div>
        </div>

        {/* Bottom Row - 3 Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white shadow-md">
              <Image
                src={`/bottom${item}.jpg`}
                alt="News"
                width={400}
                height={200}
                className="w-full h-[160px] "
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


      <div>
        {/* here advertisement */}
      </div>
    </section>
  );
};

export default Category;
