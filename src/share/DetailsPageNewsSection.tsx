

// DetailsPageNewsSection.tsx
// // with demo advertisement 

import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import LikeCommentWrapper from './LikeCommentWrapper';
import TopStoriesPage from './TopStories';


type Author = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type Count = {
  Like: number;
  Comment: number;
};

type NewsItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  imageSource: string;
  imageTitle: string;
  keywords: string[];
  subKeywords: string[];
  imageUrl: string | null;
  division: string;
  district: string | null;
  thana: string | null;
  union: string | null;
 
  createdAt: string;
  updatedAt: string;
  views: number;
  authorId: string;
  author: Author;
  _count: Count;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
};


const getTitleForDescription = async (category: string): Promise<NewsItem[]> => {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/news/getTitleForDescription/${category}`)
    return result.data.categorizedNews
}

// Advertisement component
export const Advertisement = ({ position }: { position: string }) => {
    return (
        <div className="my-6 p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
            <p className="text-xs text-gray-500 mb-2">Advertisement</p>
            <div className="h-48 md:h-64 w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Ad Space {position}</span>
            </div>
        </div>
    );
};

// Function to split content into parts with ad positions
const splitContentWithAds = (content: string) => {
    const contentLength = content.length;
    if (contentLength <= 700) return [{ content, showAd: false }];

    const parts = [];
    const firstBreak = 700;
    const secondBreak = firstBreak + Math.floor((contentLength - firstBreak) / 2);

    parts.push({
        content: content.substring(0, firstBreak),
        showAd: true,
        adPosition: "After first section"
    });

    parts.push({
        content: content.substring(firstBreak, secondBreak),
        showAd: true,
        adPosition: "Middle of content"
    });

    parts.push({
        content: content.substring(secondBreak),
        showAd: false
    });

    return parts;
};

export default async function DetailsPageNewsSection({ data, category }: { data: NewsItem, category: string }) {
    const newsList = await getTitleForDescription(category) || [];
    const bottomHighlights = newsList.slice(newsList.length - 2, newsList.length + 1) || [];
    const contentParts = splitContentWithAds(data.content);

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
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

                {/* Sidebar Advertisement */}
                <div className="mt-8">
                    <Advertisement position="Sidebar" />

                      <TopStoriesPage />
                </div>
            </aside>

            {/* Main Article */}
            <main className="md:col-span-3 space-y-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {data.title}
                </h1>

                {/* Content with strategically placed ads */}
                {contentParts.map((part, index) => (
                    <React.Fragment key={index}>
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: part.content }}
                        />
                        {part.showAd && (
                            <Advertisement position={part.adPosition || `Position ${index + 1}`} />
                        )}
                    </React.Fragment>
                ))}

                {/* Highlighted Footer */}
                <div>
                    <div className="bg-red-50 p-4 rounded-lg mt-6">
                        <h3 className="text-md font-semibold mb-3 text-red-700">আরও শিরোনাম</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {bottomHighlights.map((item, idx) => (
                                <li key={idx} className="text-sm text-gray-800 hover:text-red-600 cursor-pointer">
                                    <Link href={`/news/${item.category}/${item.id}`}>★ {item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <LikeCommentWrapper

                        entityId={data.id}
                        entityType="news"
                        initialLikes={data.likesCount || 0}
                        initialComments={data.commentsCount || 0}
                        initialIsLiked={data.isLiked || false}
                        text={data.content}
                        title={data.title}
                    />
                </div>

                

            </main>
        </div>
    );
}






