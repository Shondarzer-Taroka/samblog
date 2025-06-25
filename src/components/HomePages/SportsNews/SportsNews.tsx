// import React from 'react';

// const SportsNews = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default SportsNews;












'use client';

import Image from 'next/image';
import React from 'react';

interface NewsItem {
  id: number;
  image: string;
  title: string;
  description?: string;
}

const leftColumn: NewsItem[] = [
  {
    id: 1,
    image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
    title: '৩৭২ রান তাড়ায় বেন ডাকেটের সেঞ্চুরি',
  },

  {
    id: 3,
    image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
    title: 'মেসির সামনে সিংহ করতে চেয়েছিলেন...',
  },
];

const centerMain: NewsItem = {
  id: 4,
  image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
  title: 'সাবিনাদের প্রসঙ্গে কোচ-অধিনায়কের ‘নো কমেন্টস’',
  description:
    'এএফসি উইমেন অলিম্পিক কোয়ালিফায়ার বাছাইপর্ব খেলতে মিয়ানমার যাচ্ছে বাংলাদেশ নারী দল...',
};

const rightColumn: NewsItem[] = [
  {
    id: 5,
    image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
    title: 'সাবিনাদের প্রসঙ্গে কোচ-অধিনায়কের ‘নো কমেন্টস',
  },
  {
    id: 6,
    image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
    title: 'এএফসি উইমেন অলিম্পিক কোয়ালিফায়ার বাছাইপর্ব',
  },
];

const bottomRow: NewsItem[] = [
  {
    id: 8,
    image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
    title: 'চ্যাম্পিয়ন্স মেসিকে দেখে পাঁ কাঁপছিল ‘মেসিহেটার’-এর',
  },
  {
    id: 9,
    image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
    title: 'প্রথমবার অলিম্পিক দে রানে সম্মাননা জানাল বিওএ',
  },
  {
    id: 7,
    image: 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/Ben-Duckett-685ab3e5d7432.gif',
    title: 'ফিফা সভাপতির সঙ্গে তাবিথ আউয়ালের সাক্ষাৎ',
  },
];

const SportsNews: React.FC = () => {
  return (
    <section className='mt-24'>
      <div className="px-2 py-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.33fr_0.8fr] gap-4">
        {/* Left Column */}
        <div className="space-y-4 w-full">
          {leftColumn.map((item) => (
            <div key={item.id} className="space-y-2">
              <img src={item.image} alt={item.title} className="w-full  rounded" />
              <p className="text-sm font-medium leading-snug">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Center Column */}
        <div className='w-full'>
          <img src={centerMain.image} alt={centerMain.title} className="w-full  rounded" />
          <h2 className="text-lg font-semibold mt-2">{centerMain.title}</h2>
          <p className="text-sm text-gray-700">{centerMain.description}</p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 w-full">
          {rightColumn.map((item) => (
            <div key={item.id} className="space-y-2">
              <img src={item.image} alt={item.title} className="w-full  rounded" />
              {item.title && <p className="text-sm font-medium leading-snug">{item.title}</p>}
            </div>
          ))}
        </div>
      </div>


      {/* Bottom Row (Full Width) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-2 ">
        {bottomRow.map((item) => (
          <div key={item.id} className="flex gap-3 items-start">
            <Image src={item.image} alt={item.title} width={150} height={90} className="w- h-[90px] object-cover rounded" />
            <p className="text-sm font-medium leading-snug">{item.title}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SportsNews;




{/* Bottom Row (Full Width) */ }
{/* <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {bottomRow.map((item) => (
          <div key={item.id} className="flex gap-3 items-start">
            <img src={item.image} alt={item.title} className="w-24 h-20 object-cover rounded" />
            <p className="text-sm font-medium leading-snug">{item.title}</p>
          </div>
        ))}
      </div> */}