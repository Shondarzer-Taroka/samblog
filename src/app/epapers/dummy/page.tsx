
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

interface Article {
  id: number;
  title: string;
  content: string;
  bbox: { x: number; y: number; width: number; height: number };
  category: string;
}

export default function ProthomAloEPaper() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [clickHistory, setClickHistory] = useState<{x: number, y: number, width: number, height: number}[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState({x1: 0, y1: 0, x2: 0, y2: 0});
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Detect mouse down to start selection
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageDimensions.width / rect.width;
    const scaleY = imageDimensions.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsSelecting(true);
    setSelectionBox({ x1: x, y1: y, x2: x, y2: y });
  };

  // Track mouse movement for selection box
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isSelecting || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageDimensions.width / rect.width;
    const scaleY = imageDimensions.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setSelectionBox(prev => ({ ...prev, x2: x, y2: y }));
  };

  // Finalize selection on mouse up
  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    // Calculate article dimensions
    const x = Math.min(selectionBox.x1, selectionBox.x2);
    const y = Math.min(selectionBox.y1, selectionBox.y2);
    const width = Math.abs(selectionBox.x2 - selectionBox.x1);
    const height = Math.abs(selectionBox.y2 - selectionBox.y1);

    // Only consider selections larger than 100x100 pixels
    if (width < 100 || height < 100) return;

    // Create a new article from the selection
    const newArticle: Article = {
      id: Date.now(),
      title: `নতুন খবর ${clickHistory.length + 1}`,
      content: 'এই খবরটি পত্রিকার এই অংশ থেকে নেওয়া হয়েছে। আপনি এখানে বিস্তারিত পড়তে পারেন।',
      bbox: { x, y, width, height },
      category: 'সাধারণ'
    };

    setClickHistory(prev => [...prev, {x, y, width, height}]);
    setSelectedArticle(newArticle);
    cropArticleImage(newArticle);
  };

  // Crop the selected article image
  const cropArticleImage = (article: Article) => {
    if (!imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y, width, height } = article.bbox;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(
      imageRef.current,
      x, y, width, height,
      0, 0, width, height
    );

    setCroppedImage(canvas.toDataURL());
  };

  // Handle zoom functionality
  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    setZoomLevel(prev => {
      if (direction === 'reset') return 1;
      const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2;
      return Math.min(Math.max(newZoom, 0.5), 3);
    });
  };

  // Get actual image dimensions
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#d9232e] text-white py-3 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">প্রথম আলো ই-পেপার</h1>
          <p className="text-sm mt-1">ছবির উপর নির্বাচন করুন (ড্র্যাগ করে আয়তাকার এলাকা বেছে নিন)</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Newspaper image with selection */}
          <div className="relative border-4 border-white shadow-xl bg-white flex-1 overflow-hidden rounded-lg">
            <div 
              className="absolute inset-0 overflow-auto"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: '0 0' }}
            >
              <img
                ref={imageRef}
                src="/download.png"
                alt="Prothom Alo Newspaper"
                className="w-full h-auto select-none"
                draggable="false"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onLoad={handleImageLoad}
              />
              
              {/* Selection box */}
              {isSelecting && (
                <div
                  className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20"
                  style={{
                    left: `${Math.min(selectionBox.x1, selectionBox.x2)}px`,
                    top: `${Math.min(selectionBox.y1, selectionBox.y2)}px`,
                    width: `${Math.abs(selectionBox.x2 - selectionBox.x1)}px`,
                    height: `${Math.abs(selectionBox.y2 - selectionBox.y1)}px`,
                  }}
                />
              )}
              
              {/* Previously selected areas */}
              {clickHistory.map((area, index) => (
                <div
                  key={index}
                  className="absolute border-2 border-[#d9232e] bg-[#d9232e] bg-opacity-10 cursor-pointer"
                  style={{
                    left: `${area.x}px`,
                    top: `${area.y}px`,
                    width: `${area.width}px`,
                    height: `${area.height}px`,
                  }}
                  onClick={() => {
                    const article: Article = {
                      id: index,
                      title: `পূর্বের নির্বাচন ${index + 1}`,
                      content: 'আপনি পূর্বে এই অংশটি নির্বাচন করেছেন। এখানে খবরের বিস্তারিত থাকতে পারে।',
                      bbox: { x: area.x, y: area.y, width: area.width, height: area.height },
                      category: 'সাধারণ'
                    };
                    setSelectedArticle(article);
                    cropArticleImage(article);
                  }}
                />
              ))}
            </div>

            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 bg-white p-1 rounded-full shadow-lg flex flex-col gap-1">
              <button 
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 3}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                +
              </button>
              <button 
                onClick={() => handleZoom('reset')}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button 
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 0.5}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                -
              </button>
            </div>
          </div>

          {/* Article details panel */}
          <div className="lg:w-96">
            {selectedArticle ? (
              <div className="bg-white p-6 shadow-lg rounded-lg h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs bg-[#d9232e] text-white px-2 py-1 rounded-full font-bold">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-2xl font-bold mt-3 mb-2 leading-tight">{selectedArticle.title}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Cropped article image */}
                {croppedImage && (
                  <div className="mb-4 border rounded overflow-hidden">
                    <img 
                      src={croppedImage} 
                      alt="Cropped article" 
                      className="w-full h-auto"
                    />
                    <div className="p-2 bg-gray-100 text-xs text-center">
                      নির্বাচিত এলাকা: {selectedArticle.bbox.width}x{selectedArticle.bbox.height} পিক্সেল
                    </div>
                  </div>
                )}

                <div className="mt-2 text-gray-700 leading-relaxed">
                  {selectedArticle.content}
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 shadow-lg rounded-lg h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p>খবর পড়তে পত্রিকার উপর আয়তাকার এলাকা নির্বাচন করুন</p>
                  <p className="text-sm mt-2">(মাউস দিয়ে ড্র্যাগ করে কোনো খবরের অংশ বেছে নিন)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-[#333] text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} প্রথম আলো ই-পেপার. সর্বস্বত্ব সংরক্ষিত</p>
        </div>
      </footer>
    </div>
  );
}