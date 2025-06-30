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

interface NewsCardProps {
  image?: string;
  title: string;
  time: string;
  category?: string; // Added optional category
}

const NewsCard: React.FC<NewsCardProps> = ({ image, title, time, category }) => {
  return (
    <div className="group flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer">
      {/* Image Container with hover effect */}
      <div className="relative flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {category && (
          <span className="inline-block px-2 py-0.5 mb-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
            {category}
          </span>
        )}
        <h2 className="text-sm font-semibold text-gray-800 group-hover:text-primary line-clamp-2 transition-colors duration-200">
          {title}
        </h2>
        <p className="text-xs text-gray-500 mt-1.5 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {time}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;