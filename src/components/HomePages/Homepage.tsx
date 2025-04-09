import React from 'react';
import Navsection from './Navsection/Navsection';
import SpecialNews from '../FrontNews/SpecialNews';
import BottomNewsCard from '../FrontNews/BottomNewsCard';
import RandomNews from '../RandomNews/RandomNews';

const Homepage = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navsection />
            <SpecialNews />
            <BottomNewsCard />
            <RandomNews />
        </div>
    );
};

export default Homepage;