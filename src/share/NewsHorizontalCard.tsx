'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import { NewsItem } from '@/types/news.types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsHorizontalCard = ({ news }: NewsCardProps) => {
  const router = useRouter();

  return (
    <article
      key={news.id}
      className="bg-white cursor-pointer shadow-sm rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"
    >
      <div
        className="flex flex-col sm:flex-row gap-4"
        onClick={() => router.push(`/news/${news.category}/${news.id}`)}
      >
        {/* Content */}
        <div className="p-4 flex-1">
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 hover:text-red-600 cursor-pointer leading-snug">
            {news.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {stripHtmlAndLimit(news.content, 30).short}
          </p>
          <p className="text-xs text-gray-400 mt-2">{formatBengaliDate(news.createdAt)}</p>
        </div>

        {/* Image */}
        <div className="min-w-[120px] sm:min-w-[160px] h-[100px] sm:h-auto relative">
          <Image
            src={news.imageUrl || ''}
            alt={news?.title}
            width={160}
            height={120}
            className="w-full h-full object-cover rounded-r-md"
          />
        </div>
      </div>
    </article>
  );
};

export default NewsHorizontalCard;
