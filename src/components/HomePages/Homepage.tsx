import React from 'react';
import SpecialNews from '../FrontNews/SpecialNews';
import BottomNewsCard from '../FrontNews/BottomNewsCard';
import RandomNews from '../RandomNews/RandomNews';
import PoliticsSection from './PoliticsSection/PoliticsSection';
import InternationalNewsSection from './InternationalNewsSection/InternationalNewsSection';
import Entertainment from './Entertainment/Entertainment';
import PhotoSlider from '@/swiper/PhotoSlider';
import axios from 'axios';
import SportsNews from './SportsNews/SportsNews';
// import AuthProvider from '@/Providers/AuthProvider';
// import AuthServer from '@/Providers/AuthServer';

// const getHomePageNews = async () => {
//     try {
//         const gettingNews = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/news/homepagenews`)
//         return gettingNews.data
//     } catch (error) {
//         console.log(error);

//     }
// }




const getHomePageNews = async () => {
  try {
    const gettingNews = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/news/homepagenews`,
      {
        headers: {
          'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        params: {
          timestamp: new Date().getTime(), // force unique URL to bust CDN cache
        },
      }
    );
    return gettingNews.data;
  } catch (error) {
    console.error('Error fetching home page news:', error);
  }
};



const Homepage = async () => {

  const news = await getHomePageNews()
  console.log(news);

  return (
    <div className='max-w-7xl mx-auto font-noto'>

      {/* <AuthServer/> */}

      <SpecialNews data={news.specialNews} />
      <BottomNewsCard />
      <RandomNews data={news} />
      <PoliticsSection data={news.politicalNews} />
      <InternationalNewsSection data={news.internationalNews} />
      <Entertainment />
      <SportsNews />
      <PhotoSlider />
    </div>
  );
};

export default Homepage;