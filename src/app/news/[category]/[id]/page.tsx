// import DetailsPageNewsSection from '@/share/DetailsPageNewsSection';
// import ShareBar from '@/share/Sharebar';
// import Image from 'next/image';
// import React from 'react';

// const newsItems = [
//     {
//         id: 6,
//         img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
//         title: 'গাজায় যুদ্ধবিরতি নিয়ে যুক্তরাষ্ট্র-সৌদির শীর্ষ দুই কূটনীতিকের বৈঠক',
//         category: 'international'
//     },
//     {
//         id: 5,
//         img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
//         title: 'মার্কিন সরকারের সঙ্গে বাণিজ্য আলোচনা হয়নি: সুইস অর্থমন্ত্রী',
//         category: 'international'
//     },
//     // (other items)
// ];

// type NewsDetailsPageProps = {
//     params: {
//         category: string,
//         id: string
//     }
// }

// export default function NewsDetailsPage({ params }: NewsDetailsPageProps) {
//     const { category, id } = params;
//     const news = newsItems.find(item => item.category === category && item.id === parseInt(id));

//     if (!news) {
//         return <div className="text-center py-10">News not found!</div>;
//     }

//     return (
//         <section className="w-[1190px] mx-auto py-6 font-noto">
//             <p className="border-b-2 border-black inline-block pb-1 font-bold text-2xl">রাজনীতি</p>

//             <h1 className='text-[45px] font-bold'>অবশেষে মুক্তি পেলেন ফিলিস্তিনি শিক্ষার্থী মাহমুদ খলিল</h1>


//             <div>
//                 <div className='grid grid-cols-2'>
//                     <div className='flex gap-2.5 items-center'>
//                         <Image
//                             src={'https://cdn.jugantor.com/uploads/settings/icon_2.jpg'}
//                             alt='logo'
//                             width={50}
//                             height={50}
//                             className='rounded-full'
//                         />

//                         <div className='text-xl'>
//                             <p>আন্তর্জাতিক ডেস্ক</p>
//                             <p className='text-[#00000067]'>প্রকাশ: ২১ জুন ২০২৫, ১০:৪৯ এএম</p>
//                         </div>
//                     </div>


//                     <div>
//                         <ShareBar />
//                     </div>
//                 </div>
//             </div>


//             <Image
//                 width={1000}
//                 height={400}
//                 alt='details'
//                 src={'https://cdn.jugantor.com/assets/news_photos/2025/06/21/mahmud-khalil-685639f4acd24.jpg'} />
//             <h1 className="text-2xl font-bold mb-4">{news.title}</h1>


//             <div>
//                 <DetailsPageNewsSection />
//             </div>
//         </section>
//     );
// }























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
                    {news.imageTitle && news.imageTitle}
                </p>

                <p className="mt-2 text-center text-base font-medium text-gray-700 w-full">
                    ছবি : সংগ্রহীত
                </p>
            </div>



            <div>
                <DetailsPageNewsSection data={news} />
            </div>
        </section>
    );
}
