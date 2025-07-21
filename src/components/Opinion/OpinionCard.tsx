import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiClock, FiUser } from 'react-icons/fi';

export interface Author {
    id: string;
    name: string;
    image: string | null;
}

export interface Opinion {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: Author;
    imageUrl:string
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: {
        opinions: Opinion[];
        pagination: Pagination;
    };
}
interface OpinionCardProps {
    opinion: Opinion;
}

const OpinionCard: React.FC<OpinionCardProps> = ({ opinion }) => {
    return (
        // <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        //     <div className="p-6">
        //         <div className="flex items-center mb-4">
        //             {opinion.author.image && (
        //                 <Image
        //                     width={40}
        //                     height={40}
        //                     src={opinion.author.image}
        //                     alt={opinion.author.name}
        //                     className="w-10 h-10 rounded-full object-cover mr-3"
        //                 />
        //             )}
        //             <div>
        //                 <h3 className="font-semibold text-gray-800">{opinion.author.name}</h3>
        //                 <p className="text-xs text-gray-500">
        //                     {new Date(opinion.createdAt).toLocaleDateString()}
        //                 </p>
        //             </div>
        //         </div>

        //         <h2 className="text-xl font-bold text-gray-900 mb-2">{opinion.title}</h2>
        //         <p className="text-gray-600 line-clamp-3">{opinion.content}</p>

        //         <div className="mt-4 flex justify-between items-center">
        //             <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        //                 Read More
        //             </button>
        //             <div className="flex space-x-2">
        //                 <button className="text-gray-500 hover:text-gray-700">
        //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        //                         <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        //                     </svg>
        //                 </button>
        //                 <button className="text-gray-500 hover:text-gray-700">
        //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        //                         <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
        //                     </svg>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <Link
              
              href={`/news/opinions/${opinion.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {opinion.imageUrl ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={opinion.imageUrl}
                    alt={opinion.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <FiUser className="text-gray-400 text-4xl" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                  {opinion.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <FiUser className="mr-1" />
                    {opinion.author.name}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <FiClock className="mr-1" />
                    {formatDate(opinion.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
    );
};

export default OpinionCard;