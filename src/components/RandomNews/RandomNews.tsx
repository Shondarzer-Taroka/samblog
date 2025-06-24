import React from 'react';
import FirstSectionRandom from './FirstSectionRandom';
import SecondRandom from './SecondRandom';

const RandomNews = () => {
    return (
        <section className='mt-24 px-2 py-6'>

            <aside>
                <FirstSectionRandom />
            </aside>


          <aside className='mt-24'>
            <h2 className="text-xl font-semibold text-red-600">সারাদেশ</h2>
            <SecondRandom/>
          </aside>
        </section>
    );
};

export default RandomNews;