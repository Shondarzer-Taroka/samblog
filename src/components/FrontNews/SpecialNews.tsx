// import React from 'react';

// const SpecialNews = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default SpecialNews;












import React from 'react';
import NewsTabs from './NewsTabs';
import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import Image from 'next/image';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';


const SpecialNews = ({ data }: { data: NewsItem }) => {
    console.log('spec', data);
    const { short, isTruncated } = stripHtmlAndLimit(data.content, 40);

    return (
        <section className='flex flex-col md:flex-row gap-4 py-6'>
            <div className="flex flex-col-reverse md:flex-row gap-6 bg-white px-2  max-w-screen-xl mx-auto">
                {/* Left Content */}
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-800">
                        {/* বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় বাংলাদেশ ৪৭তম */}
                        {data.title}
                    </h2>

                    <p className="mt-3 text-gray-700 text-lg">
                        {short}
                        {isTruncated && (
                            <span className="text-blue-500 cursor-pointer ml-2">আরও পড়ুন</span>
                        )}
                    </p>


                    <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                        <span>🕒</span> {formatBengaliDate(data.createdAt)}
                        {/* <span>🕒</span> ০৮ এপ্রিল ২০২৫, ০৬:৪৯ পিএম */}
                        {/* <span>🕒</span> ০৮ এপ্রিল ২০২৫, ০৬:৪৯ পিএম */}
                    </p>
                </div>

                {/* Right Content */}
                <div className="flex-shrink-0 w-full md:w-[320px] relative">
                    <div className="w-full h-full relative">
                        <Image
                            src={data?.imageUrl || 'https://cdn.jugantor.com/assets/news_photos/2025/06/24/65659-685a4c7561e73.jpg'}
                            alt={data.title}
                            width={300}
                            height={400}
                            className="rounded-md object-cover w-full"
                        />

                    </div>
                </div>



            </div>

            <div>
                <NewsTabs />
            </div>

        </section>
    );
};

export default SpecialNews;
