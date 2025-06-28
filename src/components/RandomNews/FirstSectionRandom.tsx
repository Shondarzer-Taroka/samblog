
import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import Image from 'next/image';
import React from 'react';

const FirstSectionRandom = ({ data }: { data: NewsItem[] }) => {
 

  const randomNews = data
  return (
    <section className=" grid grid-cols-1 xl:grid-cols-2">
      {/* First Aside - Image with text wrapping */}
      <aside className="mb-6 w-full lg:w-[600px] h-[460px]">
        <div className="text-gray-800 text-[17px] leading-relaxed w-full h-full overflow-hidden">
          {/* Title & Date */}
          <h2 className="text-2xl font-bold mb-1"> {data[0].title}</h2>
          <p className="text-sm text-gray-500 mb-4"> {formatBengaliDate(data[0].createdAt)} </p>

          {/* Floating Image */}
          <Image
            width={400}
            height={300}
            src={data[0].imageUrl || "https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2F4tewt7yk%2Firan-us.webp?rect=57%2C0%2C864%2C576&w=622&auto=format%2Ccompress&fmt=avif"}
            alt="News"
            className="float-left w-[400px] h-auto mr-4 mb-2 rounded"
          />

          {/* Paragraph */}
          <p>
            {data[0].content}

          </p>
        </div>
        <div className="clear-both"></div>
      </aside>

      {/* Second Aside - 4 Cards */}
      <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {randomNews.map((item, index) => (
          <div key={index + 987} className='h-[218px]'>
            <div className="text-gray-800 text-[17px] leading-relaxed w-full h-full overflow-hidden">
              {/* Title & Date */}
              <div className='leading-5 mb-1.5'>
                <h2 className="text-[15px] font-bold">{item.title}</h2>
                <p className="text-[12px] text-gray-500">{formatBengaliDate(item.createdAt)}</p>
              </div>

              {/* Floating Image */}
              <Image
                width={400}
                height={300}
                src={item.imageUrl || ''}
                alt={item.title}
                className="float-left w-[160px] h-auto mr-2 rounded"
              />

              {/* Paragraph */}
              <p className='text-[15px]'>
              {item.content}

              </p>
            </div>
            <div className="clear-both"></div>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default FirstSectionRandom;
