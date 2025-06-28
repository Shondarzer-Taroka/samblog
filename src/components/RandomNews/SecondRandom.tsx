
// import { NewsItem } from '@/types/news.types';
// import { formatBengaliDate } from '@/utils/formatBengaliDate';
// import { stripHtmlAndLimitForArray } from '@/utils/stripAndLimitHtml';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';

// const SecondRandom = ({ data }: { data: NewsItem[] }) => {


//     const newsData = Array.isArray(data) ? data.slice(0, 3) : [];

//     const newsList1 = Array.isArray(data) ? data.slice(3, 6) : [];
//     const newsList2 = Array.isArray(data) ? data.slice(6, 9) : [];

//     return (
//         <section className=' grid grid-cols-1 lg:grid-cols-[2fr_3fr_2fr] gap-4 items-center'>

//             <aside>
//                 <div className="">
//                     {newsList1.map((news, index) => (
//                         <div key={index} >
//                             <Link href={`/news/${news.category}/${news.id}`}>
//                                 <div className='h-[1px] bg-[#00000018] w-full my-4'></div>
//                                 <div

//                                     className="flex gap-4 items-start"
//                                 >
//                                     {/* Image */}
//                                     <Image
//                                         src={news?.imageUrl || ''}
//                                         alt={news.title}
//                                         width={200}
//                                         height={100}
//                                         className=" h-24 object-cover rounded-md shrink-0"
//                                     />

//                                     {/* Text */}

//                                     <div>
//                                         <h3 className="text-lg font-semibold text-gray-800 hover:text-red-600 cursor-pointer leading-snug">
//                                             {news.title}
//                                         </h3>
//                                         <p className="text-[12.6px] text-gray-500 mt-1"> {formatBengaliDate(news.createdAt)}</p>


//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </aside>

//             <aside>
//                 <div className="">
//                     {/* First news (featured style) */}
//                     <Link href={`/news/${newsData[0].category}/${newsData[0].id}`}>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

//                             <Image
//                                 src={newsData[0]?.imageUrl || ''}
//                                 width={200}
//                                 height={100}
//                                 alt="featured"
//                                 className="w-full h-auto object-cover rounded"
//                             />
//                             <div>
//                                 <h2 className="text-xl font-bold text-gray-800 leading-snug hover:text-red-600 cursor-pointer">
//                                     {newsData[0]?.title}
//                                 </h2>
//                                 {stripHtmlAndLimitForArray(newsData[0].content, 10).short}
//                                 <p className="text-sm text-gray-500 mt-1"> {formatBengaliDate(newsData[0].createdAt)}</p>
//                             </div>
//                         </div>
//                     </Link>
//                     {/* Two smaller news cards */}
//                     <div className='h-[1px] bg-[#00000018] w-full my-4'></div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {newsData?.slice(1).map((news, idx) => (
//                             <Link key={idx} href={`/news/${news.category}/${news.id}`}>
//                                 <div className="flex gap-3">
//                                     <Image
//                                         src={news?.imageUrl || ''}
//                                         alt={news?.title}
//                                         width={200}
//                                         height={100}
//                                         className="w-24 h-24 object-cover rounded"
//                                     />
//                                     <div>
//                                         <h3 className="text-md font-bold text-gray-800 hover:text-red-600 cursor-pointer">
//                                             {news?.title}
//                                         </h3>
//                                         <p className="text-sm text-gray-500 mt-1"> {formatBengaliDate(news.createdAt)}</p>

//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </aside>


//             <aside>
//                 <div className="">
//                     {newsList2.map((news, index) => (
//                         <div key={index}>
//                             <Link href={`/news/${news.category}/${news.id}`}>
//                                 <div className='h-[1px] bg-[#00000018] w-full my-4'></div>
//                                 <div

//                                     className="flex gap-4 items-start"
//                                 >
//                                     {/* Image */}
//                                     <Image
//                                         src={news?.imageUrl || ''}
//                                         alt={news?.title}
//                                         width={200}
//                                         height={100}
//                                         className=" h-24 object-cover rounded"
//                                     />

//                                     {/* Text */}
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-gray-800 hover:text-red-600 cursor-pointer leading-snug">
//                                             {news?.title}
//                                         </h3>

//                                         <p className="text-sm text-gray-500 mt-1"> {formatBengaliDate(news.createdAt)}</p>

//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </aside>
//         </section>

//     );
// };

// export default SecondRandom;





import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import { stripHtmlAndLimitForArray } from '@/utils/stripAndLimitHtml';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaClock, FaBookmark, FaShareAlt } from 'react-icons/fa';

const SecondRandom = ({ data }: { data: NewsItem[] }) => {
    const newsData = Array.isArray(data) ? data.slice(0, 3) : [];
    const newsList1 = Array.isArray(data) ? data.slice(3, 6) : [];
    const newsList2 = Array.isArray(data) ? data.slice(6, 9) : [];

    return (
        <section className="bg-gray-50 py-10 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {newsList1.map((news, index) => (
                            <Link 
                                key={index} 
                                href={`/news/${news.category}/${news.id}`}
                                className="block group"
                            >
                                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                                    <div className="flex gap-4 p-4">
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            <Image
                                                src={news?.imageUrl || '/default-news.jpg'}
                                                alt={news.title}
                                                fill
                                                className="object-cover rounded-md group-hover:opacity-90 transition-opacity"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-md font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug">
                                                {news.title}
                                            </h3>
                                            <div className="flex items-center mt-2 text-xs text-gray-500">
                                                <FaClock className="mr-1" />
                                                <span>{formatBengaliDate(news.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Center Column (Featured) */}
                    <div className="space-y-4">
                        {/* Featured News */}
                        {newsData[0] && (
                            <Link 
                                href={`/news/${newsData[0].category}/${newsData[0].id}`}
                                className="block group"
                            >
                                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                    <div className="relative h-60 w-full">
                                        <Image
                                            src={newsData[0]?.imageUrl || '/default-news.jpg'}
                                            alt={newsData[0].title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    </div>
                                    <div className="p-5">
                                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                                            {newsData[0].title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {stripHtmlAndLimitForArray(newsData[0].content, 20).short}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <FaClock className="mr-1" />
                                                <span>{formatBengaliDate(newsData[0].createdAt)}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="text-gray-400 hover:text-red-600 transition-colors">
                                                    <FaBookmark size={14} />
                                                </button>
                                                <button className="text-gray-400 hover:text-red-600 transition-colors">
                                                    <FaShareAlt size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Two smaller news cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {newsData.slice(1).map((news, idx) => (
                                <Link 
                                    key={idx} 
                                    href={`/news/${news.category}/${news.id}`}
                                    className="block group"
                                >
                                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
                                        <div className="flex gap-3 p-3">
                                            <div className="relative w-20 h-20 flex-shrink-0">
                                                <Image
                                                    src={news?.imageUrl || '/default-news.jpg'}
                                                    alt={news.title}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                                                    {news.title}
                                                </h3>
                                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                                    <FaClock className="mr-1" />
                                                    <span>{formatBengaliDate(news.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {newsList2.map((news, index) => (
                            <Link 
                                key={index} 
                                href={`/news/${news.category}/${news.id}`}
                                className="block group"
                            >
                                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                                    <div className="flex gap-4 p-4">
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            <Image
                                                src={news?.imageUrl || '/default-news.jpg'}
                                                alt={news.title}
                                                fill
                                                className="object-cover rounded-md group-hover:opacity-90 transition-opacity"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-md font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug">
                                                {news.title}
                                            </h3>
                                            <div className="flex items-center mt-2 text-xs text-gray-500">
                                                <FaClock className="mr-1" />
                                                <span>{formatBengaliDate(news.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecondRandom;