
'use client';

import Image from 'next/image';
import Advertisement from '@/share/Advertisement';
import TopStoriesPage from '@/share/TopStories';
import { NewsItem } from '@/types/news.types';
import { useEffect, useState } from 'react';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

const Category = ({ category }: { category: string }) => {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const router=useRouter()

    const fetchNews = async (pageNum: number) => {
        try {
            setLoading(true)
            const skip = (pageNum - 1) * 15
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/getCategorizedNews/${category}?skip=${skip}&take=15`)
            const data = await res.json()

            if (data.success) {
                setNews(prev => [...prev, ...data.data])
                setHasMore(data.hasMore)
            }
        } catch (error) {
            console.error('Error fetching news:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setNews([])
        setPage(1)
        fetchNews(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadMore = () => {
        if (hasMore && !loading) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchNews(nextPage)
        }
    }

    if (loading) {
        return <Loading/>
    }

   
    if (news.length==0) {
        return <div className='flex justify-center items-center h-screen'><h1 >No news available</h1> </div> 
    }
    // console.log(news);

    //   console.log(formatDate('2025-06-24T04:35:29.887Z'));


    return (
        <section className="px-2 py-6 max-w-7xl mx-auto mt-7">
            <h2 className="text-2xl font-bold text-red-600 mb-3">{decodeURIComponent(category)}</h2>

            {/* --- Main layout: content + right‑side ad --- */}
           { loading ? <><div className="mt-8 text-center">
                     <button
                      
                   
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
                    >
                        {loading ? 'লোড হচ্ছে...' : ` আরও দেখুন`}
                    </button>
                </div> </> : <div className="lg:flex lg:gap-6">
                {/* ---------- NEWS GRID ---------- */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 " >

                    
                    {/* Left Large Card */}
                    <div   
                    onClick={()=> router.push(`/news/${news[0].category}/${news[0].id}`)}
                    className="lg:col-span-2 relative">
                        <div className='w-full h-full bg-[#00000072] absolute top-0'></div>
                        <div className="h-full bg-white shadow-md">
                            <Image
                                src={news[0]?.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg'}
                                alt="Main news"
                                width={800}
                                height={450}
                                className="w-full h-full"
                            />
                            <div className="p-4 absolute bottom-0 text-white">
                                <h3 className="text-lg font-semibold leading-snug hover:text-red-600 cursor-pointer ">
                                    {/* ইসলামী আন্দোলনের মহাসমাবেশ: লোহাপট্টনীতে যোগ দিলেন নেতা-কর্মীরা */}
                                    {news[0]?.title}
                                </h3>
                                {/* <p className="text-sm text-white mt-2">২ ঘণ্টা আগে</p> */}
                                <p className="text-sm text-white mt-2">{formatBengaliDate(news[0]?.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Top‑right two small cards */}
                    <div className="flex flex-col gap-6">
                        {news.slice(3, 5).map(({ title, imageUrl, createdAt,category,id }, i) => (
                            <div key={i} className="bg-white shadow-md cursor-pointer" onClick={()=> router.push(`/news/${category}/${id}`)}>
                                <Image
                                    src={imageUrl && imageUrl || "https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg"}
                                    alt={title}
                                    width={400}
                                    height={220}
                                    className="w-full h-[140px] object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">{formatBengaliDate(createdAt)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom row – 3 cards */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
                        {news.slice(4, 7).map(({ id, imageUrl, title ,category}, i) => (
                            <div key={id} className="bg-white shadow-md" onClick={()=> router.push(`/news/${category}/${id}`)}>
                                {/* Swap in real thumbnails ↓ */}
                                <Image
                                    src={imageUrl && imageUrl || `https://picsum.photos/id/${i + 10}/400/200`}
                                    alt={title || 'news'}
                                    width={400}
                                    height={200}
                                    className="w-full h-[160px] object-cover"
                                />
                                <div className="p-3">
                                    {/* <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                                        {item === 1
                                            ? 'অবৈধ সরকারের ক্ষমতায় টিকে থাকার সুযোগ নেই'
                                            : item === 2
                                                ? 'প্রধান নির্বাচন কমিশনারকে অব্যাহতি দিতে চায় বিএনপি'
                                                : 'ঢাকা-চট্টগ্রাম কর্মসূচি সফল করার আহ্বান'}
                                    </h3> */}
                                    <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                                        {title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">২ ঘণ্টা আগে</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------- RIGHT‑SIDE AD ---------- */}
                <aside className="hidden lg:block w-[300px] sticky top-24">
                    <Advertisement
                        src="https://tpc.googlesyndication.com/simgad/16100251881965925614"
                        href="https://your-advertiser.com"
                        alt="Buy your dream laptop today!"
                        orientation="vertical"   /* 300×600 */
                        className="mx-auto"
                    />

                    <TopStoriesPage />
                </aside>
            </div>}

            {/* Optional: banner ad below the section */}
            <div className="mt-10">
                <Advertisement
                    src="https://tpc.googlesyndication.com/simgad/3633464827223362908"
                    href="https://another‑sponsor.com"
                    alt="Special discount — limited time"
                    orientation="horizontal"  /* 728×90 */
                    className="mx-auto"
                />
            </div>




            <div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 mt-10">আরও দেখুন  <span className='underline'>{decodeURIComponent(category)}</span> সংবাদ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {news.length > 0 && news.slice(5, news.length + 1).map((news) => (
                        <article
                            key={news.id+Math.random()}
                            className="bg-white cursor-pointer shadow-sm rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"
                        >
                            <div className="flex flex-col sm:flex-row gap-4" onClick={()=> router.push(`/news/${news.category}/${news.id}`)}>
                                {/* Content */}
                                <div className="p-4 flex-1">
                                    <h3 className="text-md sm:text-lg font-semibold text-gray-800 hover:text-red-600 cursor-pointer leading-snug">
                                        {news.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{stripHtmlAndLimit(news.content, 30).short}</p>
                                    {/* <p className="text-sm text-gray-600 mt-2 line-clamp-2">{news.summary}</p> */}
                                    <p className="text-xs text-gray-400 mt-2">{formatBengaliDate(news.createdAt)}</p>
                                </div>

                                {/* Image */}
                                <div className="min-w-[120px] sm:min-w-[160px] h-[100px] sm:h-auto relative">
                                    <Image
                                        src={news?.imageUrl || 'https://images.dailyamardesh.com/original_images/indestry.jpg'}
                                        alt={news?.title}
                                        width={160}
                                        height={120}
                                        className="w-full h-full object-cover rounded-r-md"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                {/* <div className="flex justify-center mt-8">
                    <button
                        className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                    >
                        আরও
                    </button>
                </div> */}




                <div className="mt-8 text-center">
                    {hasMore && <button
                        onClick={loadMore}
                        disabled={loading}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
                    >
                        {loading ? 'লোড হচ্ছে...' : ` আরও দেখুন`}
                    </button>}
                </div>

            </div>
        </section>
    );
};

export default Category;






