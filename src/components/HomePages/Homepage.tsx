import React from 'react';
import Navsection from './Navsection/Navsection';
import SpecialNews from '../FrontNews/SpecialNews';
import BottomNewsCard from '../FrontNews/BottomNewsCard';

const Homepage = () => {
    return (
        <div>
            <Navsection />
            <SpecialNews/>
            <div>
                    <BottomNewsCard/>
                </div>
        </div>
    );
};

export default Homepage;