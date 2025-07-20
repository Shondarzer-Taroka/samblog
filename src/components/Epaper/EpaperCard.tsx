/* eslint-disable @next/next/no-img-element */
// components/epapers/EpaperCard.tsx
'use client';

import { FaEdit, FaEye } from 'react-icons/fa';
// import { formatDate } from '@/lib/utils';
import { EpaperResponse } from '@/types/epaper';
import { formatDate } from '@/lib/utils';

interface EpaperCardProps {
  epaper: EpaperResponse;
  onEdit: () => void;
  onView: () => void;
  onDelete?: () => void;
}

export default function EpaperCard({ epaper, onEdit, onView }: EpaperCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 bg-gray-100">
        {epaper.mainEpaperImage ? (
          <img 
            src={epaper.mainEpaperImage} 
            alt="E-paper cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button 
            onClick={onEdit}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            aria-label="Edit"
          >
            <FaEdit size={14} />
          </button>
          <button 
            onClick={onView}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            aria-label="View"
          >
            <FaEye size={14} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1">
          {formatDate(epaper.date)}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {epaper.articles.length} articles
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Created: {formatDate(epaper.createdAt)}
          </span>
          {epaper.user && (
            <span className="text-xs text-gray-500">
              By: {epaper.user.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}