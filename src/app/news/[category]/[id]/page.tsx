import React from 'react';

const newsItems = [
    {
        id: 6,
        img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
        title: 'গাজায় যুদ্ধবিরতি নিয়ে যুক্তরাষ্ট্র-সৌদির শীর্ষ দুই কূটনীতিকের বৈঠক',
        category: 'international'
    },
    {
        id: 5,
        img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
        title: 'মার্কিন সরকারের সঙ্গে বাণিজ্য আলোচনা হয়নি: সুইস অর্থমন্ত্রী',
        category: 'international'
    },
    // (other items)
];

type NewsDetailsPageProps = {
    params: {
        category: string,
        id: string
    }
}

export default function NewsDetailsPage({ params }:NewsDetailsPageProps) {
    const { category, id } = params;
    const news = newsItems.find(item => item.category === category && item.id === parseInt(id));

    if (!news) {
        return <div className="text-center py-10">News not found!</div>;
    }

    return (
        <section className="w-[1190px] mx-auto py-6">
            <img src={news.img} alt="news" className="w-full h-80 object-cover rounded mb-6" />
            <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
            <p className="text-gray-700">
                {/* Example description */}
                This is a detailed news page for the &quot;{news.title}&quot; under the &quot;{news.category}&quot; category.
            </p>
        </section>
    );
}
