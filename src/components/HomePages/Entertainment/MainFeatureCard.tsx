import React from "react";

interface MainFeatureCardProps {
  image: string;
  title: string;
  description: string;
  time: string;
}

const MainFeatureCard: React.FC<MainFeatureCardProps> = ({
  image,
  title,
  description,
  time,
}) => {
  return (
    <div className="w-full">
      <img
        src={image}
        alt="feature"
        className="w-full rounded"
      />
      <div className="mt-4 lg:mt-0">
        <h2 className="text-lg font-bold hover:underline cursor-pointer">
          {title}
        </h2>
        <p className="text-sm mt-2">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default MainFeatureCard;
