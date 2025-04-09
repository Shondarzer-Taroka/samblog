import React from 'react';
import FirstSectionRandom from './FirstSectionRandom';
import SecondRandom from './SecondRandom';

const RandomNews = () => {
    return (
        <section>

            <aside>
                <FirstSectionRandom />
            </aside>


          <aside>
            <SecondRandom/>
          </aside>
        </section>
    );
};

export default RandomNews;