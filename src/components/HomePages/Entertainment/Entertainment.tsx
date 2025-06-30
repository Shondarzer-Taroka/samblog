import React from 'react';
import NewsGrid from './NewsGrid';
import TitleNewsOverSection from '@/share/TitleNewsOverSection';

const Entertainment = () => {
    return (
        <div className=' px-2 md:px-4 py-6'>
            <div>
                <TitleNewsOverSection headline='বিনোদন'/>
            </div>
            {/* <h1 className="text-xl font-semibold text-red-600 mb-4">বিনোদন</h1> */}
            <NewsGrid/>
        </div>
    );
};

export default Entertainment;