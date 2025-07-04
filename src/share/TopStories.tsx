/*  app/top-stories/page.tsx  */
'use client';

import Link from 'next/link';
import { useState } from 'react';

/* -------------------------------------------------------------------------- */
/* 1️⃣  Demo data – keep here or fetch from an API                            */
/* -------------------------------------------------------------------------- */
interface Story {
  id: number;
  title: string;
  href?: string;
  highlight?: boolean; // ⟵ makes first word red
}

const latest: Story[] = [
  { id: 1, title: 'পুলিশ সেবা অস্বচ্ছ, ডিপিএ ৩.৫ তুলেও আক্রমণ' },
  { id: 2, title: '২৫ বছরেই অর্থনীতিতে ছাপাল বাংলাদেশ' },
  {
    id: 3,
    title: 'দেশ‑বিদেশ • সময়মা জাগা পেল অদম্য শিশুটার চিঠির মথ্য',
    highlight: true,
  },
  {
    id: 4,
    title:
      'বাড্ডার দীঘলবাড়ির কিশোরগঞ্জের ক্লাসরুম নিয়ে এক ঘন্টা ধরে দিন পুলিশ',
  },
  { id: 5, title: '‘আমার বিশ্ববিদ্যালয়ে ঠাঁই করে নেবো উদ্ভাবন বাহানা’' },
];

const popular: Story[] = [
  { id: 1, title: 'আজকের সেরা পাঁচ খেলা' },
  { id: 2, title: 'আইপিএলে ঝড় তুলল নতুন মুখ' },
  { id: 3, title: 'বাজারে পেঁয়াজের দাম কমবে কবে' },
  { id: 4, title: 'রাজশাহীতে রাস্তার পাশে লিচুর মেলা' },
  { id: 5, title: 'ছাত্র‑রাজনীতি: নতুন সাম্যবাদ?' },
  { id: 6, title: 'বাজারে পেঁয়াজের দাম কমবে কবে' },
  { id: 7, title: 'রাজশাহীতে রাস্তার পাশে লিচুর মেলা' },
//   { id: 8, title: 'ছাত্র‑রাজনীতি: নতুন সাম্যবাদ?' },
//   { id: 9, title: 'ছাত্র‑রাজনীতি: নতুন সাম্যবাদ?' },
//   { id: 10, title: 'ছাত্র‑রাজনীতি: নতুন সাম্যবাদ?' },
];

/* -------------------------------------------------------------------------- */
/* 2️⃣  Page component                                                        */
/* -------------------------------------------------------------------------- */
export default function TopStoriesPage() {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const activeList = activeTab === 'latest' ? latest : popular;

  return (
    <main className="flex justify-center py-10">
      <section className="w-full max-w-xs border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm">
        {/* ---------- Tabs ---------- */}
        <div className="flex text-sm font-medium select-none">
          {[
            { key: 'latest', label: 'সর্বশেষ' },
            { key: 'popular', label: 'পঠিত' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'latest' | 'popular')}
              className={`flex-1 py-2 text-center transition-colors
                ${
                  activeTab === key
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-red-500 border-b'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ---------- Ranked list ---------- */}
        <ol className="divide-y divide-gray-200">
          {activeList.map((story) => (
            <li key={story.id} className="flex gap-3 px-4 py-3">
              {/* rank number */}
              <span className="w-5 text-right text-lg font-semibold text-gray-400">
                {story.id}
              </span>

              {/* headline */}
              {story.href ? (
                <Link
                  href={story.href}
                  className="text-sm leading-5 hover:text-red-600 transition-colors"
                >
                  <Highlight text={story.title} highlight={story.highlight} />
                </Link>
              ) : (
                <p className="text-sm leading-5">
                  <Highlight text={story.title} highlight={story.highlight} />
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* 3️⃣  Helper – reds the first word if highlight === true                    */
/* -------------------------------------------------------------------------- */
function Highlight({
  text,
  highlight,
}: {
  text: string;
  highlight?: boolean;
}) {
  if (!highlight) return <>{text}</>;

  const [first, ...rest] = text.split(' ');
  return (
    <>
      <span className="text-red-600 font-medium">{first}</span>{' '}
      {rest.join(' ')}
    </>
  );
}
