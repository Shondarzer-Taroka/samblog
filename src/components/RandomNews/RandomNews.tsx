import React from 'react';
import FirstSectionRandom from './FirstSectionRandom';
import SecondRandom from './SecondRandom';
import { NewsItem } from '@/types/news.types';
import TitleNewsOverSection from '@/share/TitleNewsOverSection';
import AreaNewsFilter from '../HomePages/AreaNewsFilter/AreaNewsFilter';

const RandomNews = ({ data }: { data: { nationalNews: NewsItem[], wholeCountry: NewsItem[] } }) => {
  console.log(data.nationalNews,'rand');

  return (
    <section className=''>

      <aside className='bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-2 md:px-4 font-noto '>
        {/* <h2 className="text-xl font-semibold text-red-600 mb-4">জাতীয়</h2> */}
        <div className='mb-8'>
          <TitleNewsOverSection headline='জাতীয়' />
        </div>

        <FirstSectionRandom data={data.nationalNews} />
      </aside>


      <aside className=' bg-gray-50 py-6 px-2 md:px-4 '>
        {/* <h2 className="text-xl font-semibold text-red-600">সারাদেশ</h2> */}
        <div className='mb-8'>
          <div className='my-4'>
          <AreaNewsFilter isHomePage={true}/>

          </div>
          <TitleNewsOverSection headline='সারাদেশ' />
        </div>

        <SecondRandom data={data.wholeCountry} />
      </aside>
    </section>
  );
};

export default RandomNews;