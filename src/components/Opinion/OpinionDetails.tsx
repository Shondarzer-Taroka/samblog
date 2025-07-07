'use client';

import React from 'react';
import Image from 'next/image';

export default function OpinionDetails() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb/Section */}
      <p className="text-blue-700 font-semibold mb-3">মতামত</p>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold leading-snug mb-4">
        এনসিপির জুলাই পদযাত্রা: যা দেখছি, যা শুনছি, যা বুঝছি
      </h1>

      {/* Author Info */}
      <div className="text-sm text-gray-700 mb-4">
        <span className="font-medium">রচনা: </span>
        <span>হাবীবুর রহমান</span> <br />
        <span>প্রকাশ: ০৬ জুলাই ২০২৫, ১৬:৪৬</span>
      </div>

      {/* Social Icons (Placeholder) */}
      <div className="flex gap-3 items-center mb-6">
        <div className="w-7 h-7 bg-gray-300 rounded-full" />
        <div className="w-7 h-7 bg-gray-300 rounded-full" />
        <div className="w-7 h-7 bg-gray-300 rounded-full" />
        <div className="w-7 h-7 bg-gray-300 rounded-full" />
        <div className="w-7 h-7 bg-gray-300 rounded-full" />
      </div>

      {/* Main Image */}
      <div className="relative w-full h-[450px] mb-3">
        <Image
          src="/opinion-image.jpg" // Replace with actual path
          alt="opinion"
          fill
          className="object-cover rounded"
        />
      </div>

      {/* Caption */}
      <p className="text-gray-600 text-sm mb-6">
        রংপুরের গঙ্গাচড়ায় শহীদ আবু সাদাদের কবরে জিয়ারতের পর ‘জুলাই পদযাত্রা’ শুরু এনসিপি নেতাকর্মীদের। - প্রথম আলো
      </p>

      {/* Article Content */}
      <div className="text-gray-900 space-y-4 leading-relaxed text-[17px]">
        <p>
          জুলাই পঙ্‌ক্তি-অভিযাত্রার এক বছর পূর্তি উদ্‌যাপনের লক্ষ্যে নবগঠিত দল জাতীয় নাগরিক পার্টি
          (এনসিপি) ‘দুর্নীতি রুখব জুলাই পদযাত্রা’ কর্মসূচি শুরু করেছে। এক মাসের এই যাত্রা ঢেঁকিরচালা—
          খুলনারচর—ওটি জেলা শহর ঘুরে শেষ হবে এনসিপির ঢাকাই পদযাত্রায়।
        </p>
        <p>
          অভিযাত্রার পথ ধরেই এনসিপির নানা বক্তব্য, সামাজিকতা, সমালোচনাও মুখ্যভাবে উঠেছে।
          টিভি-অনুষ্ঠানগুলোতে, ঢাকাব্যাপী রাস্তাগুলো—এমন নানা উপস্থাপনায় এনসিপির উঠতি দল ধরা হচ্ছে।
        </p>
        <p>
          এমন গুরুত্বপূর্ণ সময়ে আঞ্চলিকভাবে ঢাকায় ব্যাপারে এনসিপির স্পষ্ট পদক্ষেপ দেখা যাচ্ছে।
        </p>
      </div>
    </div>
  );
}
