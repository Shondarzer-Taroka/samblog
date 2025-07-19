/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { incrementNewsView } from '@/utils/incrementNewsView';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Story {
  id: string;
  category:string;
  title: string;
  href?: string;
  highlight?: boolean;
}

export default function TopStoriesPage() {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const [latest, setLatest] = useState<Story[]>([]);
  const [popular, setPopular] = useState<Story[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/news/news-tabs`);
        const latestData = res.data.latest.map((item: any, i: number) => ({
          id: item.id,
          title: item.title,
          href: `/news/${item.category}/${item.id}`,
          highlight: i === 2, // example: highlight 3rd item
        }));
        const popularData = res.data.mostRead.map((item: any, i: number) => ({
          id: item.id,
          title: item.title,
          href: `/news/${item.category}/${item.id}`,
        }));
        setLatest(latestData);
        setPopular(popularData);
      } catch (error) {
        console.error('Failed to load top stories:', error);
      }
    };

    fetchNews();
  }, []);

  const activeList = activeTab === 'latest' ? latest : popular;

  const handleClick = async (id: string, href?: string) => {
    await incrementNewsView(id);
    if (href) router.push(href);
  };

  return (
    <main className="flex justify-center py-10">
      <section className="w-full max-w-xs border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm">
        {/* Tabs */}
        <div className="flex text-sm font-medium select-none">
          {[
            { key: 'latest', label: 'সর্বশেষ' },
            { key: 'popular', label: 'পঠিত' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'latest' | 'popular')}
              className={`flex-1 py-2 text-center transition-colors ${
                activeTab === key
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-500 border-b'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Ranked list */}
        <ol className="divide-y divide-gray-200">
          {activeList.map((story, i) => (
            <li
              key={story.id}
              className="flex gap-3 px-4 py-3 cursor-pointer"
              onClick={() => handleClick(story.id, story.href)}
            >
              <span className="w-5 text-right text-lg font-semibold text-gray-400">
                {i + 1}
              </span>
              {story.href ? (
                <p className=" leading-5 hover:text-red-600 transition-colors">
                  <Highlight text={story.title} highlight={story.highlight} />
                </p>
              ) : (
                <p className=" leading-5">
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

function Highlight({ text, highlight }: { text: string; highlight?: boolean }) {
  if (!highlight) return <>{text}</>;

  const [first, ...rest] = text.split(' ');
  return (
    <>
      <span className="text-red-600 font-medium">{first}</span>{' '}
      {rest.join(' ')}
    </>
  );
}
