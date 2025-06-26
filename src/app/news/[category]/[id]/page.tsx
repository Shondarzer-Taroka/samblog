// // app/news/[category]/[id]/page.tsx


import DetailsPageNewsSection from '@/share/DetailsPageNewsSection';
import ShareBar from '@/share/Sharebar';
import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';




async function getSingleNews(id: string): Promise<NewsItem> {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/news/getSingleNews/${id}`)
    return result.data.news
}




export default async function NewsDetailsPage({ params }:{params:Promise<{id:string;category:string}>} ) {
 
    const {category,id}= await params

    const news = await getSingleNews(id)

   

    console.log(category);
    
    if (!news) {
        return <div className="text-center py-10">News not found!</div>;
    }

    return (
        <section className=" max-w-6xl mx-auto   px-2 py-6 font-noto">

            <p className="border-b-2 border-black inline-block pb-1 font-bold text-2xl mt-4">{news.category}</p>

            <h1 className='text-[45px] font-bold mt-4'>{news.title}</h1>
            {/* <h1 className='text-[45px] font-bold'>অবশেষে মুক্তি পেলেন ফিলিস্তিনি শিক্ষার্থী মাহমুদ খলিল</h1> */}


            <div>
                <div className='grid lg:grid-cols-2'>
                    <div className='flex gap-2.5 items-center'>
                        <Image
                            src={news.author?.image || ''}
                            // src={'https://cdn.jugantor.com/uploads/settings/icon_2.jpg'}
                            alt={news.title}
                            width={50}
                            height={50}
                            className='rounded-full'
                        />

                        <div className='text-xl'>
                            <p>আন্তর্জাতিক ডেস্ক</p>
                            <p className='text-[#00000067]'>{formatBengaliDate(news.createdAt)}</p>
                            {/* <p className='text-[#00000067]'>প্রকাশ: ২১ জুন ২০২৫, ১০:৪৯ এএম</p> */}
                        </div>
                    </div>


                    <div>
                        <ShareBar />
                    </div>
                </div>
            </div>



            {/* src={'https://cdn.jugantor.com/assets/news_photos/2025/06/21/mahmud-khalil-685639f4acd24.jpg'} /> */}
            {/* <h1 className="text-2xl font-bold mt-10">{news.title}</h1> */}
            <div className="w-full">
                <Image
                    className='w-full'
                    width={1000}
                    height={400}
                    alt={news.title}
                    src={news.imageUrl || ''} />

                <p className="mt-2 text-center text-base font-medium text-gray-700 w-full">
                    <i>  {news.imageTitle && news.imageTitle}</i>
                </p>

                <p className="mt-1 text-center text-base font-medium text-gray-700 w-full">
                    {news.imageSource && ` ছবি : ${news.imageSource}`}
                </p>
            </div>



            <div>
                <DetailsPageNewsSection category={category} data={news} />
                {/* <DetailsPageNewsSection category={category} data={news} /> */}
            </div>
        </section>
    );
}




