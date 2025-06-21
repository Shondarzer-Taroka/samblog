// DetailsPageNewsSection

import React from 'react';

const newsList = [
  'ইসরাইলে কেন এতো ভারতীয়, কী করেন তারা',
  'গাজায় ইসরাইলি হামলায় আরও ৮৬ ফিলিস্তিনি নিহত',
  'ইসরাইল আক্রমণ বন্ধ না করা পর্যন্ত আলোচনায় যাবে না ইরান',
  'ইরানে ধরা পড়ল মোসাদের ৫৪ গুপ্তচর',
  'ইসরাইলের চ্যানেল ১৪ কার্যালয়ে হামলা চালাল ইরান',
];

const bottomHighlights = [
  'গাজায় ইসরাইলি হামলায় আরও ৮৬ ফিলিস্তিনি নিহত',
  'ইসরাইলে কেন এতো ভারতীয়, কী করেন তারা',
];

export default function DetailsPageNewsSection() {
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="md:col-span-1">
        <h2 className="text-lg font-bold mb-4">আরও পড়ুন</h2>
        <ul className="space-y-3">
          {newsList.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
              ➤ {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Article */}
      <main className="md:col-span-3 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          যুক্তরাষ্ট্রে কোর্টের আদেশে মুক্ত মাহমুদ খালিল
        </h1>
        <p className="text-gray-700">
          কলম্বিয়া বিশ্ববিদ্যালয়ের আল-জাজিরা সাংবাদিক মাহমুদ খালিলকে যুক্তরাষ্ট্রের ফেডারেল আদালত মুক্তি দিয়েছে। ইসরাইলবিরোধী বিক্ষোভে অংশগ্রহণের কারণে তাকে গ্রেফতার করা হয়েছিল...
        </p>

        {/* Highlighted Footer */}
        <div className="bg-red-50 p-4 rounded-lg mt-6">
          <h3 className="text-md font-semibold mb-3 text-red-700">আরও শিরোনাম</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bottomHighlights.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-800 hover:text-red-600 cursor-pointer">
                ★ {item}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}