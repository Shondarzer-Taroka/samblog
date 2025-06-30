// import Image from "next/image";
// import React from "react";

// interface NewsCardProps {
//   image?: string;
//   title: string;
//   time: string;
// }

// const NewsCard: React.FC<NewsCardProps> = ({ image, title, time }) => {
//   return (
//     <div className="flex mb-4">
//       {image && (
//         <Image
//           src={image}
//           alt="news"
//           width={112}
//           height={80}
//           className="w-28 h-20 object-cover mr-4 rounded"
//         />
//       )}
//       <div>
//         <h2 className="text-sm font-semibold hover:underline cursor-pointer">
//           {title}
//         </h2>
//         <p className="text-xs text-gray-500 mt-1">{time}</p>
//       </div>
//     </div>
//   );
// };

// export default NewsCard;














import Image from "next/image";
import React from "react";
import { FiClock, FiBookmark, FiShare2, FiHeart } from "react-icons/fi";

interface NewsCardProps {
  image?: string;
  title: string;
  time: string;
  category?: string;
  showActions?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  image, 
  title, 
  time, 
  category,
  showActions = true
}) => {
  return (
    <div className="group relative flex items-start gap-4 p-3  hover:bg-gray-50/80 rounded-xl transition-all duration-300 cursor-pointer border  border-gray-200">
      {/* Image Container */}
      <div className="relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <span className="absolute top-2 left-2 bg-white/90 text-primary text-xs font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <h2 className="text-sm font-semibold text-gray-800 group-hover:text-primary line-clamp-2 transition-colors duration-200 leading-snug">
          {title}
        </h2>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <FiClock className="mr-1.5 h-3.5 w-3.5" />
            <span>{time}</span>
          </div>
          
          {showActions && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-1 text-gray-500 hover:text-primary transition-colors">
                <FiBookmark className="h-3.5 w-3.5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-primary transition-colors">
                <FiShare2 className="h-3.5 w-3.5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-red-500 transition-colors">
                <FiHeart className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
    </div>
  );
};

export default NewsCard;