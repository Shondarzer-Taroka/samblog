// 'use client';
// import { NewsItem } from '@/types/news.types';
// import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';

// const PoliticsSection = ({ data }: { data: NewsItem[] }) => {
//     console.log(data);
//     const politicalNews = data || []
//     return (
//         <section className='mt-24 py-6 px-2 '>
//             <h2 className="text-xl font-semibold text-red-600 mb-4">রাজনীতি</h2>

//             <aside className=" grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
//                 {/* Left Side (Featured News) */}
//                 <Link href={`/news/${politicalNews[0].category}/${politicalNews[0].id}`}>
//                     <div className="">

//                         <div className="relative w-full h-[250px] rounded overflow-hidden">
//                             <Image
//                                 src={politicalNews[0]?.imageUrl || ''}
//                                 alt="main politics"
//                                 layout="fill"
//                                 // objectFit="cover"
//                                 className="rounded"
//                                 priority
//                             />

//                         </div>

//                         <h3 className="text-2xl font-bold mt-5 leading-snug">
//                             {/* জাতীয় নিরাপত্তা উপদেষ্টার নিয়োগ বাতিলের দাবি জাতীয় বিপ্লবী পরিষদের */}
//                             {politicalNews[0].title}
//                         </h3>
//                         <p className="text-gray-600 text-sm mt-2 leading-relaxed">

//                             {stripHtmlAndLimit(politicalNews[0].content, 20).short}
//                         </p>
//                     </div>
//                 </Link>
//                 {/* Right Side (Mini News Items) */}
//                 <div className="flex flex-col gap-6">

//                     {politicalNews.slice(1,politicalNews.length+1).map(({ title, imageUrl ,category,id}, i) => (
//                         <div className="flex gap-4 items-start" key={i}>
//                             <Link href={`/news/${category}/${id}`}> 
//                             <div className="w-28 h-20 relative flex-shrink-0">
//                                 <Image
//                                     src={imageUrl || ''}
//                                     alt={title}
//                                     layout="fill"
//                                     objectFit="cover"
//                                     className="rounded"
//                                 />
//                             </div>
//                             <h4 className="text-md font-medium leading-snug hover:text-red-600 cursor-pointer">
//                                 {title}
//                             </h4>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </aside>
//         </section>
//     );
// };

// export default PoliticsSection;


















'use client';

import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PoliticsSection = ({ data }: { data: NewsItem[] }) => {
    const politicalNews = data || [];

    if (!politicalNews.length) return null;

    return (
        <section className="mt-24 py-6 px-2 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-6 border-b border-red-200 pb-2">
                রাজনীতি
            </h2>

            <aside className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                {/* ---------- Featured News ---------- */}
                <Link href={`/news/${politicalNews[0].category}/${politicalNews[0].id}`} className="group">
                    <div className="w-full">
                        <div className="relative w-full h-[260px] rounded-lg overflow-hidden">
                            <Image
                                src={politicalNews[0]?.imageUrl || ''}
                                alt={politicalNews[0].title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold mt-4 group-hover:text-red-600 transition-colors leading-snug">
                                {politicalNews[0].title}
                            </h3>

                                 <p className="text-sm text-gray-500 mt-1"> {formatBengaliDate(politicalNews[0].createdAt)}</p>
                        </div>


                        <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                            {stripHtmlAndLimit(politicalNews[0].content, 25).short}
                        </p>
                    </div>
                </Link>

                {/* ---------- List of Other News ---------- */}
                <div className="flex flex-col gap-6">
                    {politicalNews.slice(1).map(({ title, imageUrl, category, createdAt,id }, i) => (
                        <Link
                            href={`/news/${category}/${id}`}
                            key={i}
                            className="flex gap-4 items-start group"
                        >
                            <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden rounded-md">
                                <Image
                                    src={imageUrl || ''}
                                    alt={title}
                                    fill
                                    className="object-cover "
                                />
                            </div>
                             <div>
                            <h3 className=" font-semibold mt-4 group-hover:text-red-600 transition-colors leading-snug">
                                {title}
                            </h3>

                                 <p className="text-sm text-gray-500 mt-1"> {formatBengaliDate(createdAt)}</p>
                        </div>
                        </Link>
                    ))}
                </div>
            </aside>
        </section>
    );
};

export default PoliticsSection;
