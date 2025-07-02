'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EpaperResponse, Article } from '@/types/epaper';

export default function ArticleDetails({ epaper }: { epaper: EpaperResponse }) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const date = new Date(epaper.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find if click is inside any article bbox
    const clickedArticle = epaper.articles.find(article => {
      const bbox = article.bbox;
      return (
        x >= bbox.x && 
        x <= bbox.x + bbox.width && 
        y >= bbox.y && 
        y <= bbox.y + bbox.height
      );
    });
    
    setSelectedArticle(clickedArticle || null);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with controls */}
      <div className="bg-gray-800 text-white p-4 flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-xl font-bold">E-Paper: {formattedDate}</h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsZoomed(!isZoomed)}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
          >
            {isZoomed ? 'Zoom Out' : 'Zoom In'}
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={decreaseFontSize}
              className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
              disabled={fontSize <= 12}
            >
              A-
            </button>
            <span className="text-sm">Font: {fontSize}px</span>
            <button 
              onClick={increaseFontSize}
              className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
              disabled={fontSize >= 24}
            >
              A+
            </button>
          </div>
          
          <a 
            href={epaper.mainEpaperImage} 
            download
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            Download
          </a>
          
          <Link 
            href="/viewer" 
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
          >
            Back to All
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col lg:flex-row">
        {/* E-paper image with clickable areas */}
        <div 
          ref={imageRef}
          className={`relative ${isZoomed ? 'lg:w-full' : 'lg:w-2/3'} cursor-crosshair`}
          onClick={handleImageClick}
        >
          <Image
            src={epaper.mainEpaperImage}
            alt={`E-paper from ${formattedDate}`}
            width={1200}
            height={1600}
            className="w-full h-auto"
          />
          
          {/* Highlight article areas */}
          {epaper.articles.map((article) => (
            <div
              key={article.id}
              className={`absolute border-2 border-transparent hover:border-gray-400 hover:bg-gray-400 hover:bg-opacity-20 ${
                selectedArticle?.id === article.id ? 'border-red-500 bg-gray-400 bg-opacity-30' : ''
              }`}
              style={{
                left: `${article.bbox.x}px`,
                top: `${article.bbox.y}px`,
                width: `${article.bbox.width}px`,
                height: `${article.bbox.height}px`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedArticle(article);
              }}
            />
          ))}
        </div>
        
        {/* Article details panel */}
        {selectedArticle ? (
          <div className={`${isZoomed ? 'hidden' : 'lg:w-1/3'} p-6 bg-gray-50 border-l`}>
            <h2 className="text-2xl font-bold mb-4" style={{ fontSize: `${fontSize + 4}px` }}>
              {selectedArticle.title}
            </h2>
            
            <div className="mb-4">
              <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-sm rounded">
                {selectedArticle.category}
              </span>
              {selectedArticle.isLeading && (
                <span className="inline-block ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                  Leading
                </span>
              )}
            </div>
            
            {selectedArticle.contentImage && (
              <div className="mb-4">
                <Image
                  src={selectedArticle.contentImage}
                  alt={selectedArticle.title}
                  width={400}
                  height={300}
                  className="w-full h-auto rounded"
                />
              </div>
            )}
            
            <div 
              className="text-gray-800 mb-6"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
              
              <a 
                href={selectedArticle.contentImage || epaper.mainEpaperImage} 
                download
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Download Image
              </a>
            </div>
          </div>
        ) : (
          <div className={`${isZoomed ? 'hidden' : 'lg:w-1/3'} p-6 bg-gray-50 border-l flex items-center justify-center`}>
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">Click on any article in the e-paper to view details</p>
              <p>Total articles: {epaper.articles.length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}