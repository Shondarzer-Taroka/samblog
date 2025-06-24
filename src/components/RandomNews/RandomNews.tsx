import React from 'react';
import FirstSectionRandom from './FirstSectionRandom';
import SecondRandom from './SecondRandom';
import { NewsItem } from '@/types/news.types';

const RandomNews = ({data}:{data:{nationalNews:NewsItem[],wholeCountry:NewsItem[]}}) => {
  console.log(data);
  
  return (
    <section className='mt-24 px-2 py-6'>

      <aside>
        <h2 className="text-xl font-semibold text-red-600 mb-4">জাতীয়</h2>
        <FirstSectionRandom data={data.nationalNews}/>
      </aside>


      <aside className='mt-24'>
        <h2 className="text-xl font-semibold text-red-600">সারাদেশ</h2>
        <SecondRandom data={data.wholeCountry} />
      </aside>
    </section>
  );
};

export default RandomNews;