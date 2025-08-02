/* eslint-disable @typescript-eslint/no-explicit-any */



'use client'
import React, { useState, useEffect } from 'react';


import { FaNewspaper, FaExclamationCircle } from 'react-icons/fa';
import AreaNewsCard from './AreaNewsCard';
import AreaNewsFilter from './AreaNewsFilter';

interface NewsData {
  news: any[];
  total: number;
  page: number;
  totalPages: number;
}

export default function NewsAreaPage() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (data: NewsData) => {
    setNewsData(data);
    setIsLoading(false);
  };

  // Initial load based on URL params
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/area?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching initial news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (window.location.search) {
      fetchInitialData();
    } else {
      setIsLoading(false);
    }
  }, []);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {newsData.news.map((newsItem) => (
                <AreaNewsCard key={newsItem.id} news={newsItem} />
              ))}
            </div>
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