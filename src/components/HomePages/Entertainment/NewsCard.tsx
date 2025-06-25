import Image from "next/image";
import React from "react";

interface NewsCardProps {
  image?: string;
  title: string;
  time: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, title, time }) => {
  return (
    <div className="flex mb-4">
      {image && (
        <Image
          src={image}
          alt="news"
          width={112}
          height={80}
          className="w-28 h-20 object-cover mr-4 rounded"
        />
      )}
      <div>
        <h2 className="text-sm font-semibold hover:underline cursor-pointer">
          {title}
        </h2>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default NewsCard;
