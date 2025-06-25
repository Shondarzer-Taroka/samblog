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




export default async function NewsDetailsPage({ params }: { params: { id: string } }) {

    const news = await getSingleNews(params.id)
    console.log(news, 'news');


    if (!news) {
        return <div className="text-center py-10">News not found!</div>;
    }

    return (
        <section className="w-[1190px] mx-auto py-6 font-noto">
            <p className="border-b-2 border-black inline-block pb-1 font-bold text-2xl">{news.category}</p>

            <h1 className='text-[45px] font-bold'>{news.category}</h1>
            {/* <h1 className='text-[45px] font-bold'>অবশেষে মুক্তি পেলেন ফিলিস্তিনি শিক্ষার্থী মাহমুদ খলিল</h1> */}


            <div>
                <div className='grid grid-cols-2'>
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


            <Image
                width={1000}
                height={400}
                alt={news.title}
                src={news.imageUrl || ''} />
            {/* src={'https://cdn.jugantor.com/assets/news_photos/2025/06/21/mahmud-khalil-685639f4acd24.jpg'} /> */}
            <h1 className="text-2xl font-bold mb-4">{news.title}</h1>


            <div>
                <DetailsPageNewsSection />
            </div>
        </section>
    );
}
















// // app/[category]/[id]/page.tsx
// import axios from 'axios';
// import React from 'react';

// interface NewsType {
//   id: string;
//   title: string;
//   image: string;
//   description?: string;
//   // Add more fields as needed
// }

// async function getSingleNews(id: string): Promise<NewsType> {
//   const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/news/getSingleNews/${id}`);
//   return response.data;
// }

// const NewsDetailsPage = async ({
//   params,
// }: {
//   params: { id: string; category: string };
// }) => {
//   const newsData = await getSingleNews(params.id);
// console.log(newsData,'da');

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <img
//         src={newsData.image}
//         alt={newsData.title}
//         className="w-full h-auto rounded mb-4"
//       />
//       <h1 className="text-2xl font-bold mb-2">{newsData.title}</h1>
//       <p className="text-gray-700">{newsData.description}</p>
//     </div>
//   );
// };

// export default NewsDetailsPage;
