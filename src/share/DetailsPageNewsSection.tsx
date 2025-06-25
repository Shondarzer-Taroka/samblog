






// DetailsPageNewsSection

import { NewsItem } from '@/types/news.types';
import { stripHtmlAndLimit } from '@/utils/stripAndLimitHtml';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';


const getTitleForDescription = async (category: string): Promise<NewsItem[]> => {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/news/getTitleForDescription/${category}`)
    return result.data.categorizedNews
}

export default async function DetailsPageNewsSection({ data, category }: { data: NewsItem, category: string }) {
    console.log(category, 'cat');

    const newsList = await getTitleForDescription('আন্তর্জাতিক') || []

    const bottomHighlights = newsList.slice(5, 7) || []

    console.log(newsList);



    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="md:col-span-1">
                <h2 className="text-lg font-bold mb-4">আরও পড়ুন</h2>
                <ul className="space-y-3">
                    {newsList.map((item, idx) => (

                        <li key={idx} className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
                            <Link href={`/news/${item.category}/${item.id}`}> ➤ {item.title}</Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Article */}
            <main className="md:col-span-3 space-y-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {/* যুক্তরাষ্ট্রে কোর্টের আদেশে মুক্ত মাহমুদ খালিল */}
                    {data.title}
                </h1>
                <p className="text-gray-700">
                    {stripHtmlAndLimit(data.content, 1000).short}
                </p>

                {/* Highlighted Footer */}
                <div className="bg-red-50 p-4 rounded-lg mt-6">
                    <h3 className="text-md font-semibold mb-3 text-red-700">আরও শিরোনাম</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {bottomHighlights.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-800 hover:text-red-600 cursor-pointer">
                                ★ {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}