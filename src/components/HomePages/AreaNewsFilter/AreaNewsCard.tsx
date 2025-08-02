'use client'
import React from 'react';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface Author {
  name: string;
  email: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  division?: string;
  district?: string;
  thana?: string;
  union?: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

const AreaNewsCard = ({ news }: { news: NewsItem }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{news.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{news.content}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {news.division && (
            <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              বিভাগ: {news.division}
            </span>
          )}
          {news.district && (
            <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              জেলা: {news.district}
            </span>
          )}
          {news.thana && (
            <span className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              উপজেলা: {news.thana}
            </span>
          )}
          {news.union && (
            <span className="bg-yellow-50 text-yellow-700 text-xs px-3 py-1 rounded-full flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              ইউনিয়ন: {news.union}
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 border-t pt-3">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaNewsCard;