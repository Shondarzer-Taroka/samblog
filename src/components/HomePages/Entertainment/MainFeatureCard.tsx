// import Image from "next/image";
// import React from "react";

// interface MainFeatureCardProps {
//   image: string;
//   title: string;
//   description: string;
//   time: string;
// }

// const MainFeatureCard: React.FC<MainFeatureCardProps> = ({
//   image,
//   title,
//   description,
//   time,
// }) => {
//   return (
//     <div className="w-full">
//       <Image
//       width={100}
//       height={100}
//         src={image}
//         alt="feature"
//         className="w-full rounded"
//       />
//       <div className="mt-4 lg:mt-0">
//         <h2 className="text-lg font-bold hover:underline cursor-pointer">
//           {title}
//         </h2>
//         <p className="text-sm mt-2">{description}</p>
//         <p className="text-xs text-gray-500 mt-1">{time}</p>
//       </div>
//     </div>
//   );
// };

// export default MainFeatureCard;





















import Image from "next/image";
import React from "react";
import { FiClock, FiShare2, FiBookmark, FiHeart } from "react-icons/fi";

interface MainFeatureCardProps {
  image: string;
  title: string;
  description: string;
  time: string;
  category?: string;
}

const MainFeatureCard: React.FC<MainFeatureCardProps> = ({
  image,
  title,
  description,
  time,
  category,
}) => {
  return (
    <div className="w-full group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Image Container with Hover Effect */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {category}
          </span>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
            <FiBookmark className="text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
            <FiShare2 className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content Container */}
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
  );
};

export default MainFeatureCard;
