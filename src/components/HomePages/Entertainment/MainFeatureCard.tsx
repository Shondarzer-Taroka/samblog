import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiClock, FiShare2, FiBookmark, FiHeart } from "react-icons/fi";

interface MainFeatureCardProps {
  image: string;
  title: string;
  description: string;
  time: string;
  category?: string;
  id:string;
}

const MainFeatureCard: React.FC<MainFeatureCardProps> = ({
  image,
  title,
  description,
  time,
  id,
  category,
}) => {
  return (
    <Link href={`/news/${category}/${id}`} className="block"> 
    <div className="w-full group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">

      <div className="relative h-48 md:h-52 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
      
        {category && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {category}
          </span>
        )}
        
      
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
            <FiBookmark className="text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
            <FiShare2 className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
          {title}
        </h2>
        
        <p className="text-sm md:text-base text-gray-600 line-clamp-3 mb-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <FiClock className="mr-1" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-500 hover:text-red-500 transition-colors">
              <FiHeart size={16} />
            </button>
            <span className="text-xs text-gray-500">24</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default MainFeatureCard;
