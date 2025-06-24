


import React from 'react';

const SecondRandom = () => {
    const newsData = [
        {
            img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2Fe3m253b5%2FFlag.jpg?rect=0%2C0%2C392%2C261&w=420&auto=format%2Ccompress&fmt=avif',
            category: 'বাংলাদেশ ও ভারতের সম্পর্ক',
            title: 'বাংলাদেশের ট্রানশিপমেন্ট সুবিধা বাতিল করল ভারত',
            desc: 'গতকাল সন্ধ্যাবেলা ভারতের সেন্ট্রাল বোর্ড অব ইন্ডিরেক্ট ট্যাক্সেস অ্যান্ড কাস্টমস এই বাণিজ্য বাতিল করার সিদ্ধান্ত নেয়।',
            time: '২১ মিনিট আগে',
        },
        {
            img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-01-29%2Fovetyxbt%2FAhasan-H-mansur-16.jpg?rect=503%2C0%2C3340%2C3340&w=180&auto=format%2Ccompress&fmt=avif',
            category: 'ব্যাংক ও অর্থনীতি',
            title: 'ইসলামী ব্যাংকগুলো ঐক্যবদ্ধ করে দুটি ব্যাংক করা হবে: গভর্নর',
            time: '২ ঘণ্টা আগে',
        },
        {
            img: 'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2Fp812kgyj%2FPratex-players-MOHOR-Sk-reacts-after-taking-wicket-1.jpg?rect=927%2C0%2C3657%2C3657&w=180&auto=format%2Ccompress&fmt=avif',
            category: 'খেলাধুলা',
            title: 'ক্রিকেটারদের ‘গণ্ডগোলের’ পাকিস্তানেই, উঠছে অভিযানের আওয়াজ',
            time: '২ ঘণ্টা আগে',
        },
    ];
    const newsList = [
        {
            img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/09/medium/Aman-Azmi--pic-67f639658c4cc.jpg',
            title: 'বাবাকে বাঁচাতে সেদিন দুজন শহিদ হয়েছিলেন: আমান আহমী',
        },
        {
            img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/09/medium/Aman-Azmi--pic-67f639658c4cc.jpg',
            title: 'ইয়াহিয়া খানের মন্ত্রীর প্রস্তাব প্রত্যাখ্যান করেন গোলাম আযম',
        },
        {
            img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/09/medium/Aman-Azmi--pic-67f639658c4cc.jpg',
            title: 'কাঠগড়ায় জ্যাকবের সঙ্গে আড্ডায় মাতলেন শমী কায়সার',
        },
    ];

    return (
        <section className=' grid grid-cols-1 lg:grid-cols-[2fr_3fr_2fr] gap-4 items-center'>

            <aside>
                <div className="">
                    {newsList.map((news, index) => (
                      <div key={index}>
                        <div className='h-[1px] bg-[#00000018] w-full my-4'></div>
                        <div
                           
                            className="flex gap-4 items-start"
                        >
                            {/* Image */}
                            <img
                                src={news.img}
                                alt="news"
                                className=" h-24 object-cover rounded-md shrink-0"
                            />

                            {/* Text */}
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-red-600 cursor-pointer leading-snug">
                                {news.title}
                            </h3>

                            
                        </div>
                      </div>
                    ))}
                </div>
            </aside>

            <aside>
                <div className="">
                    {/* First news (featured style) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        
                        <img
                            src={newsData[0].img}
                            alt="featured"
                            className="w-full h-auto object-cover rounded"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 leading-snug hover:text-red-600 cursor-pointer">
                                {newsData[0].title}
                            </h2>
                            <p className="text-gray-600 mt-2">{newsData[0].desc}</p>
                            <p className="text-sm text-gray-500 mt-1">{newsData[0].time}</p>
                        </div>
                    </div>

                    {/* Two smaller news cards */}
                    <div className='h-[1px] bg-[#00000018] w-full my-4'></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {newsData.slice(1).map((news, idx) => (
                            <div key={idx} className="flex gap-3">
                                <img
                                    src={news.img}
                                    alt="news"
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div>
                                    <h3 className="text-md font-bold text-gray-800 hover:text-red-600 cursor-pointer">
                                        {news.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">{news.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>


            <aside>
                <div className="">
                    {newsList.map((news, index) => (
                        <div key={index}>
                        <div className='h-[1px] bg-[#00000018] w-full my-4'></div>
                        <div
                           
                            className="flex gap-4 items-start"
                        >
                            {/* Image */}
                            <img
                                src={news.img}
                                alt="news"
                                className=" h-24 object-cover rounded-md shrink-0"
                            />

                            {/* Text */}
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-red-600 cursor-pointer leading-snug">
                                {news.title}
                            </h3>

                            
                        </div>
                      </div>
                    ))}
                </div>
            </aside>
        </section>

    );
};

export default SecondRandom;
