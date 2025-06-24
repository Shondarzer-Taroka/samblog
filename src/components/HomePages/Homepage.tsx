import React from 'react';
import SpecialNews from '../FrontNews/SpecialNews';
import BottomNewsCard from '../FrontNews/BottomNewsCard';
import RandomNews from '../RandomNews/RandomNews';
import PoliticsSection from './PoliticsSection/PoliticsSection';
import InternationalNewsSection from './InternationalNewsSection/InternationalNewsSection';
import Entertainment from './Entertainment/Entertainment';
import PhotoSlider from '@/swiper/PhotoSlider';
import axios from 'axios';
// import AuthProvider from '@/Providers/AuthProvider';
// import AuthServer from '@/Providers/AuthServer';

const getHomePageNews = async () => {
    try {
        const gettingNews = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/news/homepagenews`)
        return gettingNews.data
    } catch (error) {
        console.log(error);

    }
}




const Homepage = async () => {

    const news = await getHomePageNews()
    console.log(news);

    return (
        <div className='max-w-7xl mx-auto font-noto'>

            {/* <AuthServer/> */}

            <SpecialNews data={news.specialNews} />
            <BottomNewsCard />
            <RandomNews />
            <PoliticsSection />
            <InternationalNewsSection />
            <Entertainment />
            <PhotoSlider />
        </div>
    );
};

export default Homepage;