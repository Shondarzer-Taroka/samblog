'use client';
import TitleNewsOverSection from '@/share/TitleNewsOverSection';
import { NewsItem } from '@/types/news.types';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import { stripHtmlAndLimitWithSpace } from '@/utils/stripAndLimitHtml';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PoliticsSection = ({ data }: { data: NewsItem[] }) => {
    const politicalNews = data || [];

    if (!politicalNews.length) return null;

    return (
        <section className="px-2 md:px-4 bg-gradient-to-b from-gray-50 to-gray-100 py-6">

            <div className='mb-8'>
                <TitleNewsOverSection headline='       রাজনীতি' />
            </div>

            <aside className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                {/* Featured News */}
                <Link href={`/news/${politicalNews[0].category}/${politicalNews[0].id}`} className="group">
                    <div className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden p-2">
                        <div className="relative w-full h-[460px] rounded-lg overflow-hidden ">
                            <Image
                                src={politicalNews[0]?.imageUrl || 'https://cdn.jugantor.com/uploads/settings/icon_2.jpg'}
                                alt={politicalNews[0].title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold mt-4 group-hover:text-red-600 transition-colors leading-snug">
                                {politicalNews[0].title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1"> {formatBengaliDate(politicalNews[0].createdAt)}</p>
                        </div>


                        <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">
                            {stripHtmlAndLimitWithSpace(politicalNews[0].content, 1028).short}
                            {/* {politicalNews[0].content} */}
                        </p>
                    </div>
                </Link>

                {/* ---------- List of Other News ---------- */}
                <div className="flex flex-col gap-4">
                    {politicalNews.slice(1).map(({ title, imageUrl, category, createdAt, id }, i) => (
                        <Link
                            href={`/news/${category}/${id}`}
                            key={i}
                            className="flex gap-4 items-start group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden p-2"
                        >
                            <div className="relative w-28 md:h-[96px] flex-shrink-0 overflow-hidden rounded-md">
                                <Image
                                    src={imageUrl || 'https://cdn.jugantor.com/uploads/settings/icon_2.jpg'}
                                    alt={title}
                                    fill
                                    className="object-cover "
                                />
                            </div>
                            <div>
                                <h3 className=" font-semibold mt-4 group-hover:text-red-600 transition-colors leading-snug">
                                    {title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1"> {formatBengaliDate(createdAt)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </aside>
        </section>
    );
};

export default PoliticsSection;
