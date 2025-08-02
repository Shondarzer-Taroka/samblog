/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaExclamationCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AreaNewsCard from './AreaNewsCard';
import AreaNewsFilter from './AreaNewsFilter';

interface NewsData {
  news: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function NewsAreaPage() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const fetchNews = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/area?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      setNewsData(data.data);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (data: NewsData) => {
    setNewsData(data);
    setCurrentPage(data.pagination.page);
    setIsLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPage = params.get('page') || '1';
    fetchNews(Number(initialPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (page: number) => {
    fetchNews(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-6">
        <FaNewspaper className="text-3xl text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">আঞ্চলিক খবর</h1>
      </div>
      
      <div className="mb-8">
        <AreaNewsFilter onSearch={handleSearch} />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : newsData ? (
        <>
          {newsData.news.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {newsData.news.map((newsItem) => (
                  <AreaNewsCard key={newsItem.id} news={newsItem} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                <div className="text-sm text-gray-600">
                  পৃষ্ঠা {currentPage} / {newsData.pagination.totalPages} - মোট {newsData.pagination.total} টি খবর
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!newsData.pagination.hasPrevPage}
                    className={`px-4 py-2 rounded-md ${
                      newsData.pagination.hasPrevPage 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <FaArrowLeft className="inline mr-1" />
                    পূর্বের
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, newsData.pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (newsData.pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= newsData.pagination.totalPages - 2) {
                        pageNum = newsData.pagination.totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return pageNum;
                    }).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!newsData.pagination.hasNextPage}
                    className={`px-4 py-2 rounded-md ${
                      newsData.pagination.hasNextPage 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    পরবর্তী
                    <FaArrowRight className="inline ml-1" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaExclamationCircle className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">কোন খবর পাওয়া যায়নি</p>
              <p className="text-gray-500">অনুগ্রহ করে অন্য এলাকা নির্বাচন করুন</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">এলাকা নির্বাচন করে খবর খুঁজুন</p>
        </div>
      )}
    </div>
  );
}