
import React from 'react';

const categories = [
  ['চরমান ইস্যু', 'রাজনীতি', 'অর্থনীতি', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
  ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
  ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
  ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', 'বিবিধ'],
];

const DropDownItems = () => {
  return (
    <div className="bg-teal-600 max-h-screen min-w-[90vw] flex items-center justify-center">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-6 justify-between text-white text-lg font-normal">
        {categories.map((column, colIndex) => (
          <div key={colIndex} className="space-y-2">
            {column.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDownItems;
