
import React from 'react';
import SpecialNews from '../FrontNews/SpecialNews';
import BottomNewsCard from '../FrontNews/BottomNewsCard';
import RandomNews from '../RandomNews/RandomNews';
import PoliticsSection from './PoliticsSection/PoliticsSection';
import InternationalNewsSection from './InternationalNewsSection/InternationalNewsSection';
import Entertainment from './Entertainment/Entertainment';
import PhotoSlider from '@/swiper/PhotoSlider';
import SportsNews from './SportsNews/SportsNews';
import IslamAndLifeSection from './IslamAndLifeSection/IslamAndLifeSection';
import EduMedGrid from './EduMedGrid/EduMedGrid';
import OpinionSection from './OpinionSection/OpinionSection';
import MixedLayout from './MixedLayout/MixedLayout';

// import AuthProvider from '@/Providers/AuthProvider';
// import AuthServer from '@/Providers/AuthServer';

// const getHomePageNews = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/news/homepagenews`,
//       {
//         cache: 'no-store', // 🧨 disables caching
//       }
//     );
//     if (!res.ok) throw new Error('Failed to fetch homepage news');
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching home page news:', error);
//     return null;
//   }
// };


// this is scalable

const getHomePageNews = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/news/homepagenews`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );
    if (!res.ok) throw new Error('Failed to fetch homepage news');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching home page news:', error);
    return null;
  }
};






const Homepage = async () => {

  const news = await getHomePageNews()
  console.log(news, 'home page news');

  return (
    <div className='max-w-7xl mx-auto font-noto mt-12'>

      {/* <AuthServer/> */}

      <SpecialNews data={news.specialNews} />
      <BottomNewsCard data={news.allFunNewsforBottom}/>
      <RandomNews data={news} />
      <PoliticsSection data={news.politicalNews} />
      <InternationalNewsSection data={news.internationalNews} />
      <Entertainment data={news.entertainment} />
      <SportsNews data={news.sports} />
      <PhotoSlider data={news.galleryNews} />
      <IslamAndLifeSection islamicNews={news.islamicNews} maxim={news.maxim} />
      <EduMedGrid data={news.transformed} />
      <OpinionSection data={news?.opinions} />
      <MixedLayout data={news.funNews}/>


      {/* <div>
        <NewsEditor/>
      </div> */}
    </div>
  );
};

export default Homepage;