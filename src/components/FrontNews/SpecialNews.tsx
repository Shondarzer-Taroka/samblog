import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import Image from 'next/image';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import TopStoriesPage from '@/share/TopStories';
import { FaClock, FaEye } from 'react-icons/fa';
import { MdOutlineArrowForward } from 'react-icons/md';
import FloatingSocial from '@/share/FloatingSocial';
import BookmarkButton from '../Bookmark/BookmarkButton';
import ClientShareTrigger from '../SocialShare/ClientShareTrigger';
import NewsCardWrapper from '@/share/NewsCardWrapper';

const SpecialNews = ({ data }: { data: NewsItem }) => {
    const { short, isTruncated } = stripHtmlAndLimit(data.content, 40);

    return (
        <section className="relative bg-gray-50 pt-4 md:pb-6 px-2 md:px-4">

            <div className="max-w-7xl mx-auto">
                {/* Main News Card with Gradient Overlay */}

                <div className="relative rounded-xl overflow-hidden shadow-lg mb-8 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

                    <Image
                        src={data?.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/65659-685a4c7561e73.jpg'}
                        alt={data.title}
                        width={1200}
                        height={675}
                        className="w-full h-full"
                        priority
                    />


                    <div className="absolute bottom-0 left-0 right-0 z-20 p-3 md:p-8 text-white">

                        <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                            বিশেষ সংবাদ
                        </span>


                        <NewsCardWrapper id={data.id} href={`/news/${data.category}/${data.id}`}>
                            <h2 className="sm:text-2xl md:text-4xl font-bold leading-tight mb-2 md:mb-4 drop-shadow-lg">
                                {data.title}
                            </h2>
                        </NewsCardWrapper>

                        <p className="text-[13px] md:text-xl mb-2 md:mb-6 text-gray-100 line-clamp-2">
                            {short}
                        </p>


                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center text-gray-200  text-[11px] md:text-sm">
                                    <FaClock className="mr-1" /> {formatBengaliDate(data.createdAt)}
                                </span>
                                <span className="flex items-center  text-[11px] md:text-sm text-gray-200">
                                    <FaEye className="mr-1" /> {data.views} বার দেখা
                                </span>
                            </div>


                            <div className="flex space-x-3">
                                <div
                                    className=" rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                // aria-label="Share"
                                >
                                    {/* <FaShareAlt /> */}
                                    <div className='flex justify-center items-center w-[40px] h-[40px]'>

                                        <ClientShareTrigger title={data.title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/news/${data.category}/${data.id}`} />
                                    </div>
                                </div>
                                <div
                                    className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    aria-label="Bookmark"
                                >
                                    {/* <FaBookmark /> */}
                                    <BookmarkButton article={data} />
                                </div>
                                {isTruncated && (
                                    <NewsCardWrapper href={`/news/${data.category}/${data.id}`} id={data.id}>
                                        <button className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium transition-colors">
                                            আরও পড়ুন <MdOutlineArrowForward className="ml-1" />
                                        </button>
                                    </NewsCardWrapper>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Stories */}
                <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden hidden">
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                            সর্বশেষ সংবাদ
                        </h3>
                        <TopStoriesPage />
                    </div>
                </div>


                <FloatingSocial />
            </div>

        </section >
    );
};

export default SpecialNews;