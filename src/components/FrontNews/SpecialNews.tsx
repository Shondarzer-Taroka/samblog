






// import React from 'react';
// import { NewsItem } from '@/types/news.types';
// import { formatBengaliDate } from '@/utils/formatBengaliDate';
// import Image from 'next/image';
// import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
// import TopStoriesPage from '@/share/TopStories';


// const SpecialNews = ({ data }: { data: NewsItem }) => {
//     console.log('spec', data);
//     const { short, isTruncated } = stripHtmlAndLimit(data.content, 40);

//     return (
//         <section className='flex flex-col md:flex-row gap-4 py-6'>
//             <div className="flex flex-col-reverse md:flex-row gap-6 bg-white px-2  max-w-screen-xl mx-auto">
//                 {/* Left Content */}
//                 <div className="flex-1">
//                     <h2 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-800">
//                         {/* বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় বাংলাদেশ ৪৭তম */}
//                         {data.title}
//                     </h2>

//                     <p className="mt-3 text-gray-700 text-lg">
//                         {short}
//                         {isTruncated && (
//                             <span className="text-blue-500 cursor-pointer ml-2">আরও পড়ুন</span>
//                         )}
//                     </p>


//                     <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
//                         <span>🕒</span> {formatBengaliDate(data.createdAt)}

//                     </p>
//                 </div>

//                 {/* Right Content */}
//                 <div className="flex-shrink-0 w-full md:w-[320px] relative">
//                     <div className="w-full h-full relative">
//                         <Image
//                             src={data?.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/65659-685a4c7561e73.jpg'}
//                             alt={data.title}
//                             width={300}
//                             height={400}
//                             className="rounded-md object-cover w-full"
//                         />

//                     </div>
//                 </div>



//             </div>

//             <div>
//             <TopStoriesPage/>
//             </div>

//         </section>
//     );
// };

// export default SpecialNews;













import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import Image from 'next/image';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import TopStoriesPage from '@/share/TopStories';
import { FaClock, FaShareAlt, FaBookmark, FaEye } from 'react-icons/fa';
import { MdOutlineArrowForward } from 'react-icons/md';
import FloatingSocial from '@/share/FloatingSocial';
import Link from 'next/link';

const SpecialNews = ({ data }: { data: NewsItem }) => {
    const { short, isTruncated } = stripHtmlAndLimit(data.content, 40);

    return (
        <section className="relative bg-gray-50 pt-4 pb-6 px-2 md:px-4">
            <Link href={`/news/${data.category}/${data.id}`}>
                <div className="max-w-7xl mx-auto">
                    {/* Main News Card with Gradient Overlay */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg mb-8 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

                        {/* News Image */}
                        <Image
                            src={data?.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/65659-685a4c7561e73.jpg'}
                            alt={data.title}
                            width={1200}
                            height={675}
                            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                        />

                        {/* News Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 text-white">
                            {/* Category Badge */}
                            <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                                বিশেষ সংবাদ
                            </span>

                            {/* News Title */}
                            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4 drop-shadow-lg">
                                {data.title}
                            </h2>

                            {/* News Excerpt */}
                            <p className="text-lg md:text-xl mb-6 text-gray-100 line-clamp-2">
                                {short}
                            </p>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <span className="flex items-center text-sm text-gray-200">
                                        <FaClock className="mr-1" /> {formatBengaliDate(data.createdAt)}
                                    </span>
                                    <span className="flex items-center text-sm text-gray-200">
                                        <FaEye className="mr-1" /> ১২.৫k বার দেখা
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3">
                                    <button
                                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                        aria-label="Share"
                                    >
                                        <FaShareAlt />
                                    </button>
                                    <button
                                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                        aria-label="Bookmark"
                                    >
                                        <FaBookmark />
                                    </button>
                                    {isTruncated && (
                                        <button className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium transition-colors">
                                            আরও পড়ুন <MdOutlineArrowForward className="ml-1" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Stories Section with Seamless Integration */}
                    <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                                সর্বশেষ সংবাদ
                            </h3>
                            <TopStoriesPage />
                        </div>
                    </div>

                    {/* Floating Social Share (Desktop Only) */}
                    <FloatingSocial />
                </div>
            </Link>
        </section>
    );
};

export default SpecialNews;