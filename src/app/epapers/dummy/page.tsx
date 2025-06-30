
// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { createWorker } from 'tesseract.js';

// export default function SmartNewsPage() {
//   const [words, setWords] = useState<any[]>([]);
//   const [selectedText, setSelectedText] = useState<string | null>(null);
//   const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     const runOCR = async () => {
//       const worker = await createWorker('eng'); // বাংলা OCR চাইলে 'ben' ব্যাবহার করো
//       const { data } = await worker.recognize('/patrika.png');
//       setWords(data.words);
//       await worker.terminate();
//     };

//     runOCR();
//   }, []);

//   const handleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
//     const img = imageRef.current;
//     if (!img) return;

//     const rect = img.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const scaleX = img.naturalWidth / rect.width;
//     const scaleY = img.naturalHeight / rect.height;
//     const realX = x * scaleX;
//     const realY = y * scaleY;

//     const foundWord = words.find((word) => {
//       const { x0, y0, x1, y1 } = word.bbox;
//       return realX >= x0 && realX <= x1 && realY >= y0 && realY <= y1;
//     });

//     if (foundWord) {
//       setSelectedText(foundWord.text);
//       setCroppedUrl(null);
//     } else {
//       setSelectedText(null);

//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       if (!context) return;

//       const cropSize = 100;
//       canvas.width = cropSize;
//       canvas.height = cropSize;

//       context.drawImage(
//         img,
//         realX - cropSize / 2,
//         realY - cropSize / 2,
//         cropSize,
//         cropSize,
//         0,
//         0,
//         cropSize,
//         cropSize
//       );

//       setCroppedUrl(canvas.toDataURL());
//     }
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">📰 Smart News Image Detector</h1>

//       <img
//         ref={imageRef}
//         src="/download.png"
//         alt="Patrika"
//         onClick={handleClick}
//         className="w-full border cursor-crosshair"
//       />

//       {selectedText && (
//         <div className="mt-4 p-4 bg-green-100 rounded">
//           <strong>📝 Selected Text:</strong> {selectedText}
//         </div>
//       )}

//       {croppedUrl && (
//         <div className="mt-4">
//           <strong>🖼️ Cropped Image Preview:</strong>
//           <img src={croppedUrl} alt="Cropped Section" className="mt-2 border rounded" />
//         </div>
//       )}
//     </div>
//   );
// }













'use client';

import { useState, useRef, useEffect } from 'react';

interface NewspaperPage {
  id: number;
  imageUrl: string;
  articles: {
    id: number;
    title: string;
    content: string;
    bbox: { x: number; y: number; width: number; height: number };
    category: string;
  }[];
}

export default function ProthomAloEPaper() {
  // Sample data (replace with your actual API fetch)
  const newspaperData: NewspaperPage[] = [
    {
      id: 1,
      imageUrl: '/download.png',
      articles: [
        {
          id: 1,
          title: 'রাজধানীতে যানজট বৃদ্ধি',
          content: 'গত কয়েকদিন ধরে রাজধানীর প্রধান সড়কগুলোতে যানজট অসহনীয় পর্যায়ে পৌঁছেছে...',
          bbox: { x: 120, y: 200, width: 300, height: 150 },
          category: 'জাতীয়'
        },
        {
          id: 2,
          title: 'বাজেট ঘোষণা আজ',
          content: 'আজ জাতীয় সংসদে নতুন অর্থবছরের বাজেট উপস্থাপন করবেন অর্থমন্ত্রী...',
          bbox: { x: 450, y: 180, width: 280, height: 120 },
          category: 'অর্থনীতি'
        }
      ]
    },
    {
      id: 2,
      imageUrl: '/prothom-alo-page2.jpg',
      articles: [
        {
          id: 3,
          title: 'ক্রিকেটে বাংলাদেশের জয়',
          content: 'আইসিসি ট্রফিতে বাংলাদেশ শ্রীলঙ্কাকে ৫ উইকেটে হারিয়েছে...',
          bbox: { x: 150, y: 250, width: 320, height: 100 },
          category: 'খেলা'
        }
      ]
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<NewspaperPage['articles'][0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showCategories, setShowCategories] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Filter articles based on search term
  const filteredArticles = newspaperData[currentPage].articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle article selection
  const handleArticleClick = (article: NewspaperPage['articles'][0]) => {
    setSelectedArticle(article);
  };

  // Handle page navigation
  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < newspaperData.length) {
      setCurrentPage(pageIndex);
      setSelectedArticle(null);
    }
  };

  // Zoom functionality
  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2;
      return Math.min(Math.max(newZoom, 0.5), 3); // Limit zoom between 0.5x and 3x
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white py-3 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">প্রথম আলো ই-পেপার</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="খুঁজুন..."
                className="px-4 py-2 rounded text-gray-800 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-2 text-gray-500"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
            <button 
              className="px-4 py-2 bg-white text-red-600 rounded font-medium"
              onClick={() => setShowCategories(!showCategories)}
            >
              বিভাগ
            </button>
          </div>
        </div>
      </header>

      {/* Category dropdown */}
      {showCategories && (
        <div className="bg-white shadow-lg absolute right-4 mt-1 z-10 w-48 rounded">
          {['জাতীয়', 'আন্তর্জাতিক', 'অর্থনীতি', 'খেলা', 'বিনোদন'].map(category => (
            <div 
              key={category}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => {
                setSearchTerm(category);
                setShowCategories(false);
              }}
            >
              {category}
            </div>
          ))}
        </div>
      )}

      <main className="container mx-auto px-4 py-6">
        {/* Newspaper navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-300' : 'bg-red-600 text-white'}`}
          >
            পূর্বের পাতা
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold">পাতা: {currentPage + 1}/{newspaperData.length}</h2>
            <div className="flex justify-center space-x-2 mt-2">
              {newspaperData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full ${currentPage === index ? 'bg-red-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === newspaperData.length - 1}
            className={`px-4 py-2 rounded ${currentPage === newspaperData.length - 1 ? 'bg-gray-300' : 'bg-red-600 text-white'}`}
          >
            পরের পাতা
          </button>
        </div>

        {/* Newspaper content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Newspaper image with interactive areas */}
          <div 
            ref={imageContainerRef}
            className="relative border shadow-lg bg-white flex-1 overflow-hidden"
            style={{ height: '70vh' }}
          >
            <div 
              className="absolute inset-0 overflow-auto"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: '0 0' }}
            >
              <img
                src={newspaperData[currentPage].imageUrl}
                alt={`Prothom Alo Page ${currentPage + 1}`}
                className="w-full h-auto"
              />
              
              {/* Interactive article areas */}
              {newspaperData[currentPage].articles.map(article => (
                <div
                  key={article.id}
                  className={`absolute border-2 ${selectedArticle?.id === article.id ? 'border-red-600 bg-red-100 bg-opacity-30' : 'border-transparent hover:border-red-400 hover:bg-red-100 hover:bg-opacity-20'} cursor-pointer transition-all`}
                  style={{
                    left: `${article.bbox.x}px`,
                    top: `${article.bbox.y}px`,
                    width: `${article.bbox.width}px`,
                    height: `${article.bbox.height}px`,
                  }}
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </div>

            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow flex gap-2">
              <button 
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 0.5}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                -
              </button>
              <span className="px-2">{(zoomLevel * 100).toFixed(0)}%</span>
              <button 
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 3}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Article sidebar */}
          <div className="lg:w-80 bg-white p-4 shadow-lg rounded-lg overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              {searchTerm ? `Search Results for "${searchTerm}"` : 'আজকের খবর'}
            </h3>
            
            {(searchTerm && filteredArticles.length === 0) ? (
              <p className="text-gray-500">No articles found</p>
            ) : (
              <div className="space-y-4">
                {(searchTerm ? filteredArticles : newspaperData[currentPage].articles).map(article => (
                  <div
                    key={article.id}
                    className={`p-3 rounded cursor-pointer ${selectedArticle?.id === article.id ? 'bg-red-50 border-l-4 border-red-600' : 'hover:bg-gray-50'}`}
                    onClick={() => handleArticleClick(article)}
                  >
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <h4 className="font-medium mt-1">{article.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{article.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected article detail */}
        {selectedArticle && (
          <div className="mt-6 bg-white p-6 shadow-lg rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                  {selectedArticle.category}
                </span>
                <h2 className="text-2xl font-bold mt-2">{selectedArticle.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 text-gray-700 leading-relaxed">
              {selectedArticle.content.repeat(10)} {/* Simulate longer content */}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} প্রথম আলো ই-পেপার. সর্বস্বত্ব সংরক্ষিত</p>
          <div className="flex justify-center space-x-6 mt-3">
            <a href="#" className="hover:text-red-400">যোগাযোগ</a>
            <a href="#" className="hover:text-red-400">গোপনীয়তা নীতি</a>
            <a href="#" className="hover:text-red-400">সাহায্য</a>
          </div>
        </div>
      </footer>
    </div>
  );
}