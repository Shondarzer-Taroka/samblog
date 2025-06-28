// import React from 'react';

// const SpecialNews = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default SpecialNews;












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
















import React from 'react';
import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import Image from 'next/image';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import TopStoriesPage from '@/share/TopStories';
import { FaClock, FaShareAlt, FaBookmark, FaEye } from 'react-icons/fa';
import { MdOutlineArrowForward } from 'react-icons/md';

const SpecialNews = ({ data }: { data: NewsItem }) => {
    const { short, isTruncated } = stripHtmlAndLimit(data.content, 40);
    
    return (
        <section className="relative bg-gray-50 py-8 px-4 md:px-6 lg:px-8">
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
                <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                            সর্বশেষ সংবাদ
                        </h3>
                        <TopStoriesPage />
                    </div>
                </div>
                
                {/* Floating Social Share (Desktop Only) */}
                <div className="hidden lg:flex flex-col space-y-3 fixed left-4 top-1/2 transform -translate-y-1/2 z-30">
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <span className="sr-only">Facebook</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                        </svg>
                    </button>
                    <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                    </button>
                    <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                        <span className="sr-only">YouTube</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialNews;