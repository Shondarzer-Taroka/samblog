/* eslint-disable @typescript-eslint/no-explicit-any */
// components/epapers/ArticleEditor.tsx
'use client';

import { FaTrash, FaImage } from 'react-icons/fa';
import { categories } from '@/types/epaper';

interface ArticleEditorProps {
  article: any;
  index: number;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
}

export default function ArticleEditor({ article, index, onUpdate, onRemove }: ArticleEditorProps) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Article #{index + 1}
        </h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition"
          title="Remove article"
        >
          <FaTrash />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title*
          </label>
          <input
            type="text"
            placeholder="Headline of the article"
            value={article.title}
            onChange={(e) => onUpdate('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content Image
          </label>
          <div className="flex items-center space-x-4">
            {article.contentImage ? (
              <img 
                src={article.contentImage} 
                alt="Article content" 
                className="h-32 w-32 object-cover rounded-lg"
              />
            ) : (
              <div className="h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <FaImage className="text-gray-400 text-2xl" />
              </div>
            )}
            <input
              type="text"
              placeholder="Image URL"
              value={article.contentImage}
              onChange={(e) => onUpdate('contentImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category*
          </label>
          <select
            value={article.category}
            onChange={(e) => onUpdate('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Number*
          </label>
          <input
            type="number"
            min="1"
            placeholder="1"
            value={article.pageNumber}
            onChange={(e) => onUpdate('pageNumber', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content*
        </label>
        <textarea
          placeholder="Write the article content here..."
          value={article.content}
          onChange={(e) => onUpdate('content', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'X Position', key: 'x' },
          { label: 'Y Position', key: 'y' },
          { label: 'Width', key: 'width' },
          { label: 'Height', key: 'height' }
        ].map((dim) => (
          <div key={dim.key}>
            <label className="block text-xs text-gray-500 mb-1">{dim.label}</label>
            <input
              type="number"
              value={article.bbox[dim.key as keyof typeof article.bbox]}
              onChange={(e) => onUpdate('bbox', {
                [dim.key]: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center">
        <input
          id={`leading-${index}`}
          type="checkbox"
          checked={article.isLeading}
          onChange={(e) => onUpdate('isLeading', e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={`leading-${index}`} className="ml-2 text-sm font-medium text-gray-700">
          Mark as Leading Article
        </label>
      </div>
    </div>
  );
}