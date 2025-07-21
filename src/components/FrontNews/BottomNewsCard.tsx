


import { NewsItem } from '@/types/news.types';
import Image from 'next/image';
import React from 'react';

// const newsCards = [
//   {
//     category: 'শিক্ষা',
//     title: 'এসএসসি পরীক্ষা-২০২৫, প্রশ্নপত্র ফাঁসে জড়ালে আইন ব্যবস্থা',
//     image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-08%2Fibnphfan%2Fbrain-implant-to-the-voice.png?rect=0%2C32%2C640%2C233&w=320&auto=format%2Ccompress&fmt=avif',
//   },
//   {
//     category: 'প্রযুক্তি',
//     title: 'পক্ষাঘাতগ্রস্তদের কথা বলার সুযোগ করে দিয়েছে নতুন ব্রেন-টু-ভয়েস প্রযুক্তি',
//     image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-08%2Fibnphfan%2Fbrain-implant-to-the-voice.png?rect=0%2C32%2C640%2C233&w=320&auto=format%2Ccompress&fmt=avif',
//   },
//   {
//     category: 'ধর্ম',
//     title: 'জিতের জড়তা কাটাতে মুসা (আ.) যে প্রার্থনা করেছিলেন',
//     image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-08%2Fibnphfan%2Fbrain-implant-to-the-voice.png?rect=0%2C32%2C640%2C233&w=320&auto=format%2Ccompress&fmt=avif',
//   },
//   {
//     category: 'একটু থামুন',
//     title: '৭টি ভিন ভিন দশকে অস্কারের জন্য মনোনয়ন পেয়েছিলেন তিনি',
//     image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-08%2Fhgfll6ku%2FJohnwilliams2006.jpg?rect=0%2C68%2C690%2C252&w=320&auto=format%2Ccompress&fmt=avif',
//   },
// ];

const BottomNewsCard = ({data}:{data:NewsItem[]}) => {

  if (data.length===0 || !data) {
    return
  }

  return (
    <div className=" px-2 md:px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((card, index) => (
          <div
            key={index}
            className="relative h-40 rounded overflow-hidden cursor-pointer group"
          >
            {/* Background Image */}
            <Image
              width={240}
              height={300}
              src={card.imageUrl || 'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-08%2Fhgfll6ku%2FJohnwilliams2006.jpg?rect=0%2C68%2C690%2C252&w=320&auto=format%2Ccompress&fmt=avif'}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#000000a3] flex flex-col justify-end p-4 text-white">
              <span className="text-yellow-400 font-semibold">{`${index===3 ?'একটু থামুন':card.category}`}</span>
              <p className="text-sm font-medium leading-snug">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNewsCard;
