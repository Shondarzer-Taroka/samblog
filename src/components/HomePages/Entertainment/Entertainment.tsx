import React from 'react';
import NewsGrid from './NewsGrid';
import TitleNewsOverSection from '@/share/TitleNewsOverSection';
import { NewsItem } from '@/types/news.types';

const Entertainment = ({data}:{data:NewsItem[]}) => {
    return (
        <div className=' px-2 md:px-4 py-6'>
            <div className='mb-8'>
                <TitleNewsOverSection headline='বিনোদন'/>
            </div>
            {/* <h1 className="text-xl font-semibold text-red-600 mb-4">বিনোদন</h1> */}
            <NewsGrid data={data} />
        </div>
    );
};

export default Entertainment;