'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TopStory } from '@/types/topStories';

interface TopStoriesProps {
  latest: TopStory[];
  popular: TopStory[];
}

export default function TopStories({ latest, popular }: TopStoriesProps) {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const activeList = activeTab === 'latest' ? latest : popular;

  return (
    <div className="w-full max-w-xs border border-gray-300 rounded-md overflow-hidden bg-white">
      {/* ---- Tabs ---- */}
      <div className="flex text-sm font-medium">
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

      {/* ---- Ranked list ---- */}
      <ol className="divide-y divide-gray-200">
        {activeList.map((story) => (
          <li key={story.id} className="flex items-start gap-3 px-4 py-3">
            <span className="text-lg font-semibold text-gray-400 w-5 text-right select-none">
              {story.id}
            </span>

            {story.href ? (
              <Link
                href={story.href}
                className="text-sm leading-5 hover:text-red-600 transition-colors"
              >
                <HighlightText text={story.title} highlight={story.highlight} />
              </Link>
            ) : (
              <p className="text-sm leading-5">
                <HighlightText text={story.title} highlight={story.highlight} />
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Helper: color a word or phrase inside the headline */
function HighlightText({
  text,
  highlight,
}: {
  text: string;
  highlight?: boolean;
}) {
  if (!highlight) return text;
  const [first, ...rest] = text.split(' ');
  return (
    <>
      <span className="text-red-600 font-medium">{first}</span>{' '}
      {rest.join(' ')}
    </>
  );
}
