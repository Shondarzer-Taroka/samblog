
// import { NewsItem } from '@/types/news.types';
// import { formatBengaliDate } from '@/utils/formatBengaliDate';
// import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import { FaClock } from 'react-icons/fa';

// const FirstSectionRandom = ({ data }: { data: NewsItem[] }) => {


//   const randomNews = data
//   return (
//     <section className=" grid grid-cols-1 xl:grid-cols-2">
//       {/* First Aside - Image with text wrapping */}
//       <aside className="mb-6 w-full lg:w-[600px] md:h-[460px]">
//         <Link href={`/news/${data[0].category}/${data[0].id}`} className='block group bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
//           <div className="text-gray-800 text-[17px] leading-relaxed w-full h-full overflow-hidden">
//             {/* Title & Date */}
//             <h2 className="text-2xl font-bold mb-1"> {data[0].title}</h2>
           
//                   <div className="flex items-center mb-3 text-xs text-gray-500">
//                     <FaClock className="mr-1" />
//                     <span>{formatBengaliDate(data[0].createdAt)}</span>
//                   </div>


//             {/* Floating Image */}
//             <Image
//               width={400}
//               height={300}
//               src={data[0].imageUrl || "https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2F4tewt7yk%2Firan-us.webp?rect=57%2C0%2C864%2C576&w=622&auto=format%2Ccompress&fmt=avif"}
//               alt="News"
//               className="float-left w-[400px] h-auto mr-4 mb-2 rounded"
//             />

//             {/* Paragraph */}
//             <p className='text-[17.6px]'>
//               {stripHtmlAndLimit(data[0].content, 99).short}

//             </p>
//           </div>
//         </Link>
//         <div className="clear-both"></div>
//       </aside>

//       {/* Second Aside - 4 Cards */}
//       <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//         {randomNews.slice(1).map((item, index) => (
//           <div key={index + 987} className='h'>
//             <Link href={`/news/${item.category}/${item.id}`} className='block group bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
//               <div className="text-gray-800 text-[17.7px] leading-relaxed w-full h-full overflow-hidden">
//                 {/* Title & Date */}
//                 <div className='leading-5 mb-1.5'>
//                   <h2 className="text-[15px] font-bold">{item.title}</h2>

//                   <div className="flex items-center mt-2 text-xs text-gray-500">
//                     <FaClock className="mr-1" />
//                     <span>{formatBengaliDate(item.createdAt)}</span>
//                   </div>

//                 </div>

//                 {/* Floating Image */}
//                 <Image
//                   width={400}
//                   height={300}
//                   src={item.imageUrl || 'https://cdn.jugantor.com/uploads/settings/icon_2.jpg'}
//                   alt={item.title}
//                   className="float-left w-[160px] h-auto mr-2 rounded"
//                 />

//                 {/* Paragraph */}
//                 <p className='text-[15.9px]'>
//                   {stripHtmlAndLimit(item.content, 29).short}

//                 </p>
//               </div>
//             </Link>
//             <div className="clear-both"></div>
//           </div>
//         ))}
//       </aside>
//     </section>
//   );
// };

// export default FirstSectionRandom;









import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import Image from 'next/image';
import React from 'react';
import { FaClock } from 'react-icons/fa';
import NewsCardWrapper from '@/share/NewsCardWrapper';

const FirstSectionRandom = ({ data }: { data: NewsItem[] }) => {
  const randomNews = data;
 if (data.length === 0) {
  return <h1>No data found</h1>
 }

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2">
      {/* First Aside */}
      <aside className="mb-6 w-full lg:w-[600px] md:h-[460px]">
        <NewsCardWrapper
          id={data[0].id}
          href={`/news/${data[0].category}/${data[0].id}`}
        >
          <div className="block group bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-gray-800 text-[17px] leading-relaxed w-full h-full overflow-hidden">
              <h2 className="text-2xl font-bold mb-1">{data[0].title}</h2>

              <div className="flex items-center mb-3 text-xs text-gray-500">
                <FaClock className="mr-1" />
                <span>{formatBengaliDate(data[0].createdAt)}</span>
              </div>

              <Image
                width={400}
                height={300}
                src={
                  data[0].imageUrl ||
                  'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2F4tewt7yk%2Firan-us.webp?rect=57%2C0%2C864%2C576&w=622&auto=format%2Ccompress&fmt=avif'
                }
                alt="News"
                className="float-left w-[400px] h-auto mr-4 mb-2 rounded"
              />

              <p className="text-[17.6px]">
                {stripHtmlAndLimit(data[0].content, 99).short}
              </p>
            </div>
          </div>
        </NewsCardWrapper>
        <div className="clear-both"></div>
      </aside>

      {/* 4 News cards */}
      <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {randomNews.slice(1,randomNews.length+1).map((item, index) => (
          <div key={index + 987}>
            <NewsCardWrapper
              id={item.id}
              href={`/news/${item.category}/${item.id}`}
            >
              <div className="block group bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-gray-800 text-[17.7px] leading-relaxed w-full h-full overflow-hidden">
                  <div className="leading-5 mb-1.5">
                    <h2 className="text-[15px] font-bold">{item.title}</h2>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <FaClock className="mr-1" />
                      <span>{formatBengaliDate(item.createdAt)}</span>
                    </div>
                  </div>

                  <Image
                    width={400}
                    height={300}
                    src={
                      item.imageUrl ||
                      'https://cdn.jugantor.com/uploads/settings/icon_2.jpg'
                    }
                    alt={item.title}
                    className="float-left w-[160px] h-auto mr-2 rounded"
                  />

                  <p className="text-[15.9px]">
                    {stripHtmlAndLimit(item.content, 29).short}
                  </p>
                </div>
              </div>
            </NewsCardWrapper>
            <div className="clear-both"></div>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default FirstSectionRandom;
