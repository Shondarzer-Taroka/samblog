
'use client';

import Image from 'next/image';
import Advertisement from '@/share/Advertisement';
import TopStoriesPage from '@/share/TopStories';

const Category = () => {
    return (
        <section className="px-2 py-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-6">রাজনীতি</h2>

            {/* --- Main layout: content + right‑side ad --- */}
            <div className="lg:flex lg:gap-6">
                {/* ---------- NEWS GRID ---------- */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Large Card */}
                    <div className="lg:col-span-2 relative">
                        <div className='w-full h-full bg-[#00000072] absolute top-0'></div>
                        <div className="h-full bg-white shadow-md">
                            <Image
                                src="https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg"
                                alt="Main news"
                                width={800}
                                height={450}
                                className="w-full h-full"
                            />
                            <div className="p-4 absolute bottom-0 text-white">
                                <h3 className="text-lg font-semibold leading-snug hover:text-red-600 cursor-pointer ">
                                    ইসলামী আন্দোলনের মহাসমাবেশ: লোহাপট্টনীতে যোগ দিলেন নেতা-কর্মীরা
                                </h3>
                                <p className="text-sm text-white mt-2">২ ঘণ্টা আগে</p>
                            </div>
                        </div>
                    </div>

                    {/* Top‑right two small cards */}
                    <div className="flex flex-col gap-6">
                        {['দৈনন্দিনতা নয় আন্দোলন গুরুত্বের উন্নয়নে ভূমিকা, ফেসবুকে জানালেন আফরিন',
                            'রাজপথের লড়াইয়ে ঝাঁপিয়ে পড়ুন, ছাত্রদলকে বিএনপি'
                        ].map((title, i) => (
                            <div key={i} className="bg-white shadow-md">
                                <Image
                                    src="https://cdn.jugantor.com/assets/news_photos/2025/06/28/congo-rwanda-685f640151cd2.jpg"
                                    alt={title}
                                    width={400}
                                    height={220}
                                    className="w-full h-[140px] object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">২ ঘণ্টা আগে</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom row – 3 cards */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white shadow-md">
                                {/* Swap in real thumbnails ↓ */}
                                <Image
                                    src={`https://picsum.photos/id/${item + 10}/400/200`}
                                    alt="News"
                                    width={400}
                                    height={200}
                                    className="w-full h-[160px] object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-base font-medium hover:text-red-600 cursor-pointer">
                                        {item === 1
                                            ? 'অবৈধ সরকারের ক্ষমতায় টিকে থাকার সুযোগ নেই'
                                            : item === 2
                                                ? 'প্রধান নির্বাচন কমিশনারকে অব্যাহতি দিতে চায় বিএনপি'
                                                : 'ঢাকা-চট্টগ্রাম কর্মসূচি সফল করার আহ্বান'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">২ ঘণ্টা আগে</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------- RIGHT‑SIDE AD ---------- */}
                <aside className="hidden lg:block w-[300px] sticky top-24">
                    <Advertisement
                        src="https://s0.2mdn.net/dfp/366178/288802258/1748751513010/300x250_2.png"
                        href="https://your-advertiser.com"
                        alt="Buy your dream laptop today!"
                        orientation="vertical"   /* 300×600 */
                        className="mx-auto"
                    />

                    <TopStoriesPage />
                </aside>
            </div>

            {/* Optional: banner ad below the section */}
            <div className="mt-10">
                <Advertisement
                    src="/ads/banner-728x90.jpg"
                    href="https://another‑sponsor.com"
                    alt="Special discount — limited time"
                    orientation="horizontal"  /* 728×90 */
                    className="mx-auto"
                />
            </div>




            <div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">আন্তর্জাতিক সংবাদ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {newsItems.map((news) => (
                        <article
                            key={news.id}
                            className="bg-white shadow-sm rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Content */}
                                <div className="p-4 flex-1">
                                    <h3 className="text-md sm:text-lg font-semibold text-gray-800 hover:text-red-600 cursor-pointer leading-snug">
                                        {news.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{news.summary}</p>
                                    <p className="text-xs text-gray-400 mt-2">{news.time}</p>
                                </div>

                                {/* Image */}
                                <div className="min-w-[120px] sm:min-w-[160px] h-[100px] sm:h-auto relative">
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        width={160}
                                        height={120}
                                        className="w-full h-full object-cover rounded-r-md"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                    >
                        আরও
                    </button>
                </div>
                
            </div>
        </section>
    );
};

export default Category;






const newsItems = [
    {
        id: 1,
        title: 'দক্ষিণ আফ্রিকায় ২ বাংলাদেশি অপহরণ, একজনকে হত্যা',
        summary: '২ জুন ইস্টার্ন কেপ প্রদেশের এলিয়ট শহরে রামান্দি প্রবাসীদের অপহরণ করা হয়...',
        time: '৩০ জুন ২০২৫, ১২:৫৫ অপরাহ্ন',
        image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-06-27%2F906oyzbl%2FSYLHETDH077820250627SYLHET-JAMAT-1.JPG.JPG?rect=265%2C0%2C3444%2C2296&w=622&auto=format%2Ccompress&fmt=avif',
    },
    {
        id: 2,
        title: 'দক্ষিণ আফ্রিকায় ভারী বন্যায় ৪৯ জনের মৃত্যু',
        summary: 'দক্ষিণ আফ্রিকার পূর্বাঞ্চলে ব্যাপক বৃষ্টির ফলে বন্যা ও ভূমিধসে বহু মানুষ মারা গেছেন...',
        time: '২৯ জুন ২০২৫, ০৮:৪০ পূর্বাহ্ন',
        image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-06-27%2F906oyzbl%2FSYLHETDH077820250627SYLHET-JAMAT-1.JPG.JPG?rect=265%2C0%2C3444%2C2296&w=622&auto=format%2Ccompress&fmt=avif',
    },
    {
        id: 3,
        title: 'বিস্ময় বাজছে নতুন রাজাধানী গড়ছে মিশর, যা থাকবে শহরজুড়ে',
        summary: 'রাজধানী কায়রোর বাইরে নির্মাণাধীন “নিউ কায়রো” নামক মিশরের নতুন প্রশাসনিক নগরীর ছবি দেখলে চমকে যাবেন...',
        time: '৩০ জুন ২০২৫, ১০:২৫ পূর্বাহ্ন',
        image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-06-27%2F906oyzbl%2FSYLHETDH077820250627SYLHET-JAMAT-1.JPG.JPG?rect=265%2C0%2C3444%2C2296&w=622&auto=format%2Ccompress&fmt=avif',
    },
    {
        id: 4,
        title: 'দক্ষিণ আফ্রিকায় বিমান বিধ্বস্ত, নিহত ৩',
        summary: 'দক্ষিণ আফ্রিকার কেপটাউন-ভিত্তিক একটি ছোট বিমান বিধ্বস্ত হয়ে তিনজন যাত্রী প্রাণ হারিয়েছেন...',
        time: '২৯ জুন ২০২৫, ০৮:২০ পূর্বাহ্ন',
        image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-06-27%2F906oyzbl%2FSYLHETDH077820250627SYLHET-JAMAT-1.JPG.JPG?rect=265%2C0%2C3444%2C2296&w=622&auto=format%2Ccompress&fmt=avif',
    },
    {
        id: 5,
        title: 'তানজানিয়ায় ভয়াবহ সড়ক দুর্ঘটনায় ২৮ জন নিহত',
        summary: 'পূর্ব আফ্রিকার দেশ তানজানিয়ায় যাত্রীবাহী বাস ও ট্রাকের সংঘর্ষে বহু প্রাণহানি ঘটেছে...',
        time: '২৯ জুন ২০২৫, ১০:৩৫ পূর্বাহ্ন',
        image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-06-27%2F906oyzbl%2FSYLHETDH077820250627SYLHET-JAMAT-1.JPG.JPG?rect=265%2C0%2C3444%2C2296&w=622&auto=format%2Ccompress&fmt=avif',
    },
    {
        id: 6,
        title: 'তানজানিয়ায় ভয়াবহ সড়ক দুর্ঘটনায় ২৮ জন নিহত',
        summary: 'পূর্ব আফ্রিকার দেশ তানজানিয়ায় যাত্রীবাহী বাস ও ট্রাকের সংঘর্ষে বহু প্রাণহানি ঘটেছে...',
        time: '২৯ জুন ২০২৫, ১০:৩৫ পূর্বাহ্ন',
        image: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-06-27%2F906oyzbl%2FSYLHETDH077820250627SYLHET-JAMAT-1.JPG.JPG?rect=265%2C0%2C3444%2C2296&w=622&auto=format%2Ccompress&fmt=avif',
    },
];