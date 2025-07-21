// import React from 'react';

// const Opinions = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default Opinions;

'use client'



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



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpinionCard from './OpinionCard';

const Opinions: React.FC = () => {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  const fetchOpinions = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/getAllOpinions`, {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm
        }
      });
      
      setOpinions(response.data.data.opinions);
      setPagination({
        ...pagination,
        total: response.data.data.pagination.total,
        totalPages: response.data.data.pagination.totalPages
      });
      setError(null);
    } catch (err) {
      setError('মতামতগুলি লোড করতে ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন।');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpinions();
  }, [pagination.page, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOpinions();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">সম্প্রদায়ের মতামত</h1>
        <p className="text-gray-600">আমাদের সম্প্রদায়ের বিভিন্ন মতামত দেখুন এবং শেয়ার করুন</p>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="মতামত খুঁজুন..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            খুঁজুন
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : opinions.length === 0 ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          কোন মতামত পাওয়া যায়নি। প্রথম মতামত দিতে পারেন আপনি!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {opinions.map((opinion) => (
              <OpinionCard key={opinion.id} opinion={opinion} />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`px-4 py-2 rounded ${pagination.page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              পূর্ববর্তী
            </button>
            
            <span className="text-gray-700">
              পৃষ্ঠা {pagination.page} / {pagination.totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className={`px-4 py-2 rounded ${pagination.page === pagination.totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              পরবর্তী
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Opinions;