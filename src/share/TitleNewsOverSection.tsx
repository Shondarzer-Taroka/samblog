import React from 'react';

const TitleNewsOverSection = ({ headline }: { headline: string }) => {
    return (
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-red-600 relative pl-4">
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-red-600 rounded-full"></span>
                {headline}
             
            </h2>
        </div>
    );
};

export default TitleNewsOverSection;