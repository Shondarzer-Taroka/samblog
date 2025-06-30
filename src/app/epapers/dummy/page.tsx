/* eslint-disable @next/next/no-img-element */






// 'use client';

// import { useState, useRef } from 'react';

// interface NewspaperPage {
//   id: number;
//   imageUrl: string;
//   date: string;
//   articles: {
//     id: number;
//     title: string;
//     content: string;
//     bbox: { x: number; y: number; width: number; height: number };
//     category: string;
//     isLeading?: boolean;
//   }[];
// }

// export default function ProthomAloEPaper() {
//   // Sample data with more realistic newspaper structure
//   const newspaperData: NewspaperPage[] = [
//     {
//       id: 1,
//       imageUrl: '/download.png',
//       date: '৩০ জুন, ২০২৩',
//       articles: [
//         {
//           id: 1,
//           title: 'রাজধানীতে যানজট বৃদ্ধি',
//           content: 'গত কয়েকদিন ধরে রাজধানীর প্রধান সড়কগুলোতে যানজট অসহনীয় পর্যায়ে পৌঁছেছে। ট্রাফিক পুলিশের মতে, রাস্তা সংস্কার কাজ এবং যানবাহনের সংখ্যা বৃদ্ধিই মূল কারণ...',
//                    bbox: { x:10, y: 20, width: 780, height: 70 }, 
//           category: 'জাতীয়',
//           isLeading: true
//         },
//         {
//           id: 2,
//           title: 'বাজেট ঘোষণা আজ',
//           content: 'আজ জাতীয় সংসদে নতুন অর্থবছরের বাজেট উপস্থাপন করবেন অর্থমন্ত্রী। ৭ লক্ষ কোটি টাকার এই বাজেটে স্বাস্থ্য ও শিক্ষাখাতে বরাদ্দ বৃদ্ধির কথা বলা হচ্ছে...',
       
//    bbox: { x: 10, y: 100, width: 240, height: 215 },
//           category: 'অর্থনীতি'
//         },
//         {
//           id: 3,
//           title: 'মুদ্রাস্ফীতি বেড়ে ৯.৫ শতাংশ',
//           content: 'গত মাসে মুদ্রাস্ফীতি বেড়ে দাঁড়িয়েছে ৯.৫ শতাংশ যা গত দশ বছরের মধ্যে সর্বোচ্চ...',
//           bbox: { x: 5, y: 380, width: 255, height: 480 },
//           category: 'অর্থনীতি'
//         },
//         {
//           id: 4,
//           title: 'Hiril বেড়ে ৯.৫ শতাংশ',
//           content: 'গত মাসে মুদ্রাস্ফীতি বেড়ে দাঁড়িয়েছে ৯.৫ শতাংশ যা গত দশ বছরের মধ্যে সর্বোচ্চ...',
//           bbox: { x: 275, y: 97, width: 526, height: 350 },
//           category: 'অর্থনীতি'
//         }
//       ]
//     },
//     {
//       id: 2,
//       imageUrl: '/prothom-alo-page2.jpg',
//       date: '৩০ জুন, ২০২৩',
//       articles: [
//         {
//           id: 4,
//           title: 'ক্রিকেটে বাংলাদেশের জয়',
//           content: 'আইসিসি ট্রফিতে বাংলাদেশ শ্রীলঙ্কাকে ৫ উইকেটে হারিয়েছে। ম্যাচসেরা হন লিটন দাস যিনি করেন ৯৮ রানের ইনিংস...',
//           bbox: { x: 150, y: 250, width: 320, height: 100 },
//           category: 'খেলা',
//           isLeading: true
//         },
//         {
//           id: 5,
//           title: 'নতুন সিনেমা মুক্তি পাচ্ছে আজ',
//           content: 'প্রখ্যাত পরিচালক তারিক মাসুদ এর নতুন চলচ্চিত্র "মাটির ঠিকানা" আজ থেকে স nationwide মুক্তি পাচ্ছে...',
//           bbox: { x: 500, y: 300, width: 280, height: 120 },
//           category: 'বিনোদন'
//         }
//       ]
//     }
//   ];

//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedArticle, setSelectedArticle] = useState<NewspaperPage['articles'][0] | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [showCategories, setShowCategories] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const imageContainerRef = useRef<HTMLDivElement>(null);

//   // Filter articles based on search term
//   const filteredArticles = newspaperData[currentPage].articles.filter(article => 
//     article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     article.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle article selection
//   const handleArticleClick = (article: NewspaperPage['articles'][0]) => {
//     setSelectedArticle(article);
//     // Scroll to article details
//     setTimeout(() => {
//       document.getElementById('article-detail')?.scrollIntoView({ behavior: 'smooth' });
//     }, 100);
//   };

//   // Handle page navigation
//   const goToPage = (pageIndex: number) => {
//     if (pageIndex >= 0 && pageIndex < newspaperData.length) {
//       setCurrentPage(pageIndex);
//       setSelectedArticle(null);
//       setZoomLevel(1); // Reset zoom on page change
//     }
//   };

//   // Zoom functionality
//   const handleZoom = (direction: 'in' | 'out' | 'reset') => {
//     setZoomLevel(prev => {
//       if (direction === 'reset') return 1;
//       const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2;
//       return Math.min(Math.max(newZoom, 0.5), 3);
//     });
//   };

//   // Calculate date range for date picker
//   const dates = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() - i);
//     return date;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-[#d9232e] text-white py-3 shadow-md">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-6">
//               <h1 className="text-2xl font-bold">প্রথম আলো ই-পেপার</h1>
//               <button 
//                 className="flex items-center space-x-1 px-3 py-1 bg-white bg-opacity-20 rounded"
//                 onClick={() => setShowDatePicker(!showDatePicker)}
//               >
//                 <span>{newspaperData[currentPage].date}</span>
//                 <span>▼</span>
//               </button>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="খবর খুঁজুন..."
//                   className="px-4 py-2 rounded text-gray-800 w-64 focus:outline-none"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 {searchTerm && (
//                   <button 
//                     className="absolute right-3 top-2 text-gray-500"
//                     onClick={() => setSearchTerm('')}
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//               <button 
//                 className="px-4 py-2 bg-white text-[#d9232e] rounded font-medium hover:bg-gray-100"
//                 onClick={() => setShowCategories(!showCategories)}
//               >
//                 বিভাগ
//               </button>
//             </div>
//           </div>
          
//           {/* Date picker dropdown */}
//           {showDatePicker && (
//             <div className="bg-white text-gray-800 mt-2 p-3 rounded shadow-lg absolute z-20 w-64">
//               <h4 className="font-bold mb-2">পুরনো সংস্করণ</h4>
//               <div className="space-y-2">
//                 {dates.map((date, index) => (
//                   <div 
//                     key={index}
//                     className={`p-2 rounded cursor-pointer ${index === 0 ? 'bg-[#d9232e] text-white' : 'hover:bg-gray-100'}`}
//                     onClick={() => {
//                       // In a real app, you would fetch the edition for this date
//                       setShowDatePicker(false);
//                     }}
//                   >
//                     {date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
//                     {index === 0 && <span className="ml-2 text-sm">(আজ)</span>}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Category dropdown */}
//       {showCategories && (
//         <div className="bg-white shadow-lg absolute right-4 mt-1 z-10 w-48 rounded">
//           {['জাতীয়', 'আন্তর্জাতিক', 'অর্থনীতি', 'খেলা', 'বিনোদন', 'সম্পাদকীয়', 'চাকরি'].map(category => (
//             <div 
//               key={category}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
//               onClick={() => {
//                 setSearchTerm(category);
//                 setShowCategories(false);
//               }}
//             >
//               {category}
//             </div>
//           ))}
//         </div>
//       )}

//       <main className="container mx-auto px-4 py-6">
//         {/* Newspaper navigation */}
//         <div className="flex justify-between items-center mb-6 bg-white p-3 rounded shadow">
//           <button
//             onClick={() => goToPage(currentPage - 1)}
//             disabled={currentPage === 0}
//             className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-200 text-gray-500' : 'bg-[#d9232e] text-white hover:bg-[#c11b26]'}`}
//           >
//             ← পূর্বের পাতা
//           </button>
          
//           <div className="text-center">
//             <div className="flex justify-center space-x-1">
//               {newspaperData.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToPage(index)}
//                   className={`w-8 h-1 rounded-full ${currentPage === index ? 'bg-[#d9232e]' : 'bg-gray-300'}`}
//                 />
//               ))}
//             </div>
//             <div className="mt-1 text-sm text-gray-600">
//               পাতা {currentPage + 1}/{newspaperData.length}
//             </div>
//           </div>
          
//           <button
//             onClick={() => goToPage(currentPage + 1)}
//             disabled={currentPage === newspaperData.length - 1}
//             className={`px-4 py-2 rounded ${currentPage === newspaperData.length - 1 ? 'bg-gray-200 text-gray-500' : 'bg-[#d9232e] text-white hover:bg-[#c11b26]'}`}
//           >
//             পরের পাতা →
//           </button>
//         </div>

//         {/* Newspaper content */}
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Newspaper image with interactive areas */}
//           <div 
//             ref={imageContainerRef}
//             className="relative border-4 border-white shadow-xl bg-white flex-1 overflow-hidden rounded"
//             style={{ height: '75vh', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}
//           >
//             <div 
//               className="absolute inset-0 overflow-auto"
//               style={{ transform: `scale(${zoomLevel})`, transformOrigin: '0 0' }}
//             >
//               <img
//                 src={newspaperData[currentPage].imageUrl}
//                 alt={`Prothom Alo Page ${currentPage + 1}`}
//                 className="w-full h-auto select-none"
//                 draggable="false"
//               />
              
//               {/* Interactive article areas */}
//               {newspaperData[currentPage].articles.map(article => (
//                 <div
//                   key={article.id}
//                   className={`absolute border-2 ${selectedArticle?.id === article.id ? 
//                     'border-[#d9232e] bg-[#d9232e] bg-opacity-10' : 
//                     'border-transparent hover:border-[#d9232e] hover:bg-[#d9232e] hover:bg-opacity-5'} 
//                     cursor-pointer transition-all`}
//                   style={{
//                     left: `${article.bbox.x}px`,
//                     top: `${article.bbox.y}px`,
//                     width: `${article.bbox.width}px`,
//                     height: `${article.bbox.height}px`,
//                   }}
//                   onClick={() => handleArticleClick(article)}
//                 />
//               ))}
//             </div>

//             {/* Zoom controls */}
//             <div className="absolute bottom-4 right-4 bg-white p-1 rounded-full shadow-lg flex flex-col gap-1">
//               <button 
//                 onClick={() => handleZoom('in')}
//                 disabled={zoomLevel >= 3}
//                 className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//               >
//                 +
//               </button>
//               <button 
//                 onClick={() => handleZoom('reset')}
//                 className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
//               >
//                 {Math.round(zoomLevel * 100)}%
//               </button>
//               <button 
//                 onClick={() => handleZoom('out')}
//                 disabled={zoomLevel <= 0.5}
//                 className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//               >
//                 -
//               </button>
//             </div>
//           </div>

//           {/* Article sidebar */}
//           <div className="lg:w-96 bg-white p-4 shadow-lg rounded-lg overflow-y-auto" style={{ maxHeight: '75vh' }}>
//             <h3 className="text-lg font-semibold mb-4 border-b-2 border-[#d9232e] pb-2 text-[#d9232e]">
//               {searchTerm ? `"${searchTerm}" এর ফলাফল` : 'আজকের প্রধান খবর'}
//             </h3>
            
//             {(searchTerm && filteredArticles.length === 0) ? (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">কোনো খবর পাওয়া যায়নি</p>
//                 <button 
//                   className="mt-2 px-4 py-2 bg-[#d9232e] text-white rounded"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   সব খবর দেখুন
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {(searchTerm ? filteredArticles : newspaperData[currentPage].articles)
//                   .sort((a, b) => (b.isLeading ? 1 : 0) - (a.isLeading ? 1 : 0))
//                   .map(article => (
//                   <div
//                     key={article.id}
//                     className={`p-3 rounded-lg cursor-pointer transition-all ${selectedArticle?.id === article.id ? 
//                       'bg-[#d9232e] text-white' : 
//                       'hover:bg-[#f8f8f8] border border-gray-100'}`}
//                     onClick={() => handleArticleClick(article)}
//                   >
//                     {article.isLeading && !searchTerm && (
//                       <span className="text-xs bg-white text-[#d9232e] px-2 py-1 rounded-full font-bold mb-1 inline-block">
//                         প্রধান খবর
//                       </span>
//                     )}
//                     <span className={`text-xs px-2 py-1 rounded ${selectedArticle?.id === article.id ? 
//                       'bg-white text-[#d9232e]' : 'bg-[#d9232e] text-white'}`}>
//                       {article.category}
//                     </span>
//                     <h4 className={`font-bold mt-1 ${selectedArticle?.id === article.id ? 'text-white' : 'text-gray-800'}`}>
//                       {article.title}
//                     </h4>
//                     <p className={`text-sm ${selectedArticle?.id === article.id ? 'text-gray-100' : 'text-gray-600'} line-clamp-2`}>
//                       {article.content}
//                     </p>
//                     <div className={`text-xs mt-1 ${selectedArticle?.id === article.id ? 'text-gray-300' : 'text-gray-500'}`}>
//                       বিস্তারিত পড়ুন →
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Selected article detail */}
//         {selectedArticle && (
//           <div id="article-detail" className="mt-8 bg-white p-6 shadow-lg rounded-lg border-t-4 border-[#d9232e]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <span className="text-xs bg-[#d9232e] text-white px-2 py-1 rounded-full font-bold">
//                   {selectedArticle.category}
//                 </span>
//                 <h2 className="text-3xl font-bold mt-3 mb-2 leading-tight">{selectedArticle.title}</h2>
//                 <div className="flex items-center text-sm text-gray-500 mb-4">
//                   <span>প্রথম আলো</span>
//                   <span className="mx-2">•</span>
//                   <span>{newspaperData[currentPage].date}</span>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => setSelectedArticle(null)}
//                 className="text-gray-500 hover:text-gray-700 p-1"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="mt-4 text-gray-700 leading-relaxed text-lg space-y-4">
//               {selectedArticle.content.split('...').map((paragraph, i) => (
//                 <p key={i}>{paragraph.trim()}</p>
//               ))}
//               {/* Simulate longer article content */}
//               <p>প্রথম আলো পত্রিকার সম্পাদকীয় নীতিমালা অনুসরণ করে এই প্রতিবেদনটি তৈরি করা হয়েছে। সংবাদটির সত্যতা নিশ্চিত করতে আমাদের রিপোর্টিং টিম সংশ্লিষ্ট সকল সূত্র থেকে তথ্য যাচাই করেছে।</p>
//               <p>এই বিষয়ে আরও জানতে আমাদের সাথে যোগাযোগ করতে পারেন। প্রথম আলো সর্বদাই সঠিক ও নির্ভরযোগ্য সংবাদ পরিবেশনে প্রতিশ্রুতিবদ্ধ।</p>
//             </div>
//             <div className="mt-6 pt-4 border-t border-gray-200">
//               <button className="px-4 py-2 bg-[#d9232e] text-white rounded hover:bg-[#c11b26]">
//                 শেয়ার করুন
//               </button>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="bg-[#333] text-white py-8 mt-10">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h4 className="text-lg font-bold mb-4">প্রথম আলো</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-[#d9232e]">আমাদের সম্পর্কে</a></li>
//                 <li><a href="#" className="hover:text-[#d9232e]">যোগাযোগ</a></li>
//                 <li><a href="#" className="hover:text-[#d9232e]">ক্যারিয়ার</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-bold mb-4">সেবাসমূহ</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-[#d9232e]">ই-পেপার</a></li>
//                 <li><a href="#" className="hover:text-[#d9232e]">আর্কাইভ</a></li>
//                 <li><a href="#" className="hover:text-[#d9232e]">প্রিন্ট সাবস্ক্রিপশন</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-bold mb-4">নীতিমালা</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-[#d9232e]">গোপনীয়তা নীতি</a></li>
//                 <li><a href="#" className="hover:text-[#d9232e]">শর্তাবলী</a></li>
//                 <li><a href="#" className="hover:text-[#d9232e]">এডভার্টাইজিং</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-bold mb-4">সোশ্যাল মিডিয়া</h4>
//               <div className="flex space-x-4">
//                 <a href="#" className="w-8 h-8 bg-[#d9232e] rounded-full flex items-center justify-center">f</a>
//                 <a href="#" className="w-8 h-8 bg-[#d9232e] rounded-full flex items-center justify-center">t</a>
//                 <a href="#" className="w-8 h-8 bg-[#d9232e] rounded-full flex items-center justify-center">in</a>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
//             <p>© {new Date().getFullYear()} প্রথম আলো ই-পেপার. সর্বস্বত্ব সংরক্ষিত</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

























'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NewspaperPage {
  id: number;
  imageUrl: string;
  date: string;
  articles: {
    id: number;
    title: string;
    content: string;
    bbox: { x: number; y: number; width: number; height: number };
    category: string;
    isLeading?: boolean;
    pageNumber?: number;
  }[];
}

export default function ProthomAloEPaper() {
  const router = useRouter();
  // Sample data with more realistic newspaper structure
  const newspaperData: NewspaperPage[] = [
    {
      id: 1,
      imageUrl: '/download.png',
      date: '৩০ জুন, ২০২৩',
      articles: [
        {
          id: 1,
          title: 'রাজধানীতে যানজট বৃদ্ধি',
          content: 'গত কয়েকদিন ধরে রাজধানীর প্রধান সড়কগুলোতে যানজট অসহনীয় পর্যায়ে পৌঁছেছে। ট্রাফিক পুলিশের মতে, রাস্তা সংস্কার কাজ এবং যানবাহনের সংখ্যা বৃদ্ধিই মূল কারণ...',
          bbox: { x:10, y: 20, width: 780, height: 70 }, 
          category: 'জাতীয়',
          isLeading: true,
          pageNumber: 1
        },
        {
          id: 2,
          title: 'বাজেট ঘোষণা আজ',
          content: 'আজ জাতীয় সংসদে নতুন অর্থবছরের বাজেট উপস্থাপন করবেন অর্থমন্ত্রী। ৭ লক্ষ কোটি টাকার এই বাজেটে স্বাস্থ্য ও শিক্ষাখাতে বরাদ্দ বৃদ্ধির কথা বলা হচ্ছে...',
          bbox: { x: 10, y: 100, width: 240, height: 215 },
          category: 'অর্থনীতি',
          pageNumber: 1
        },
        {
          id: 3,
          title: 'মুদ্রাস্ফীতি বেড়ে ৯.৫ শতাংশ',
          content: 'গত মাসে মুদ্রাস্ফীতি বেড়ে দাঁড়িয়েছে ৯.৫ শতাংশ যা গত দশ বছরের মধ্যে সর্বোচ্চ...',
          bbox: { x: 5, y: 380, width: 255, height: 480 },
          category: 'অর্থনীতি',
          pageNumber: 1
        },
        {
          id: 4,
          title: 'Hiril বেড়ে ৯.৫ শতাংশ',
          content: 'গত মাসে মুদ্রাস্ফীতি বেড়ে দাঁড়িয়েছে ৯.৫ শতাংশ যা গত দশ বছরের মধ্যে সর্বোচ্চ...',
          bbox: { x: 275, y: 97, width: 526, height: 350 },
          category: 'অর্থনীতি',
          pageNumber: 1
        }
      ]
    },
    {
      id: 2,
      imageUrl: '/prothom-alo-page2.jpg',
      date: '৩০ জুন, ২০২৩',
      articles: [
        {
          id: 4,
          title: 'ক্রিকেটে বাংলাদেশের জয়',
          content: 'আইসিসি ট্রফিতে বাংলাদেশ শ্রীলঙ্কাকে ৫ উইকেটে হারিয়েছে। ম্যাচসেরা হন লিটন দাস যিনি করেন ৯৮ রানের ইনিংস...',
          bbox: { x: 150, y: 250, width: 320, height: 100 },
          category: 'খেলা',
          isLeading: true,
          pageNumber: 2
        },
        {
          id: 5,
          title: 'নতুন সিনেমা মুক্তি পাচ্ছে আজ',
          content: 'প্রখ্যাত পরিচালক তারিক মাসুদ এর নতুন চলচ্চিত্র "মাটির ঠিকানা" আজ থেকে স nationwide মুক্তি পাচ্ছে...',
          bbox: { x: 500, y: 300, width: 280, height: 120 },
          category: 'বিনোদন',
          pageNumber: 2
        }
      ]
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<NewspaperPage['articles'][0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showCategories, setShowCategories] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<NewspaperPage['articles'][0][]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Filter articles based on search term
  const filteredArticles = newspaperData[currentPage].articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle article selection
  const handleArticleClick = (article: NewspaperPage['articles'][0]) => {
    setSelectedArticle(article);
    // Find related articles (same category, different pages)
    const related = newspaperData.flatMap(page => 
      page.articles.filter(a => 
        a.category === article.category && 
        a.id !== article.id &&
        a.pageNumber !== article.pageNumber
      )
    );
    setRelatedArticles(related.slice(0, 3)); // Show max 3 related articles
    
    // Scroll to article details
    setTimeout(() => {
      document.getElementById('article-detail')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Navigate to article's page
  const navigateToArticlePage = (article: NewspaperPage['articles'][0]) => {
    if (article.pageNumber) {
      setCurrentPage(article.pageNumber - 1);
      setSelectedArticle(article);
      setZoomLevel(1);
    }
  };

  // Handle page navigation
  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < newspaperData.length) {
      setCurrentPage(pageIndex);
      setSelectedArticle(null);
      setZoomLevel(1); // Reset zoom on page change
    }
  };

  // Zoom functionality
  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    setZoomLevel(prev => {
      if (direction === 'reset') return 1;
      const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2;
      return Math.min(Math.max(newZoom, 0.5), 3);
    });
  };

  // Calculate date range for date picker
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCategories && !(event.target as Element).closest('.category-dropdown')) {
        setShowCategories(false);
      }
      if (showDatePicker && !(event.target as Element).closest('.date-picker')) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategories, showDatePicker]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#d9232e] text-white py-3 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>
                প্রথম আলো ই-পেপার
              </h1>
              <button 
                className="flex items-center space-x-1 px-3 py-1 bg-white bg-opacity-20 rounded date-picker"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <span>{newspaperData[currentPage].date}</span>
                <span>▼</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="খবর খুঁজুন..."
                  className="px-4 py-2 rounded text-gray-800 w-64 focus:outline-none"
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
                className="px-4 py-2 bg-white text-[#d9232e] rounded font-medium hover:bg-gray-100"
                onClick={() => setShowCategories(!showCategories)}
              >
                বিভাগ
              </button>
            </div>
          </div>
          
          {/* Date picker dropdown */}
          {showDatePicker && (
            <div className="bg-white text-gray-800 mt-2 p-3 rounded shadow-lg absolute z-20 w-64 date-picker">
              <h4 className="font-bold mb-2">পুরনো সংস্করণ</h4>
              <div className="space-y-2">
                {dates.map((date, index) => (
                  <div 
                    key={index}
                    className={`p-2 rounded cursor-pointer ${index === 0 ? 'bg-[#d9232e] text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => {
                      // In a real app, you would fetch the edition for this date
                      setShowDatePicker(false);
                    }}
                  >
                    {date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {index === 0 && <span className="ml-2 text-sm">(আজ)</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Category dropdown */}
      {showCategories && (
        <div className="bg-white shadow-lg absolute right-4 mt-1 z-10 w-48 rounded category-dropdown">
          {['জাতীয়', 'আন্তর্জাতিক', 'অর্থনীতি', 'খেলা', 'বিনোদন', 'সম্পাদকীয়', 'চাকরি'].map(category => (
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
        <div className="flex justify-between items-center mb-6 bg-white p-3 rounded shadow">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-200 text-gray-500' : 'bg-[#d9232e] text-white hover:bg-[#c11b26]'}`}
          >
            ← পূর্বের পাতা
          </button>
          
          <div className="text-center">
            <div className="flex justify-center space-x-1">
              {newspaperData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-8 h-1 rounded-full ${currentPage === index ? 'bg-[#d9232e]' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              পাতা {currentPage + 1}/{newspaperData.length}
            </div>
          </div>
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === newspaperData.length - 1}
            className={`px-4 py-2 rounded ${currentPage === newspaperData.length - 1 ? 'bg-gray-200 text-gray-500' : 'bg-[#d9232e] text-white hover:bg-[#c11b26]'}`}
          >
            পরের পাতা →
          </button>
        </div>

        {/* Newspaper content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Newspaper image with interactive areas */}
          <div 
            ref={imageContainerRef}
            className="relative border-4 border-white shadow-xl bg-white flex-1 overflow-hidden rounded"
            style={{ height: '75vh', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}
          >
            <div 
              className="absolute inset-0 overflow-auto"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: '0 0' }}
            >
              <img
                src={newspaperData[currentPage].imageUrl}
                alt={`Prothom Alo Page ${currentPage + 1}`}
                className="w-full h-auto select-none"
                draggable="false"
                style={{ maxHeight: '100%', width: 'auto' }}
              />
              
              {/* Interactive article areas */}
              {newspaperData[currentPage].articles.map(article => (
                <div
                  key={article.id}
                  className={`absolute border-2 ${selectedArticle?.id === article.id ? 
                    'border-[#d9232e] bg-[#d9232e] bg-opacity-20' : 
                    'border-transparent hover:border-[#d9232e] hover:bg-[#d9232e] hover:bg-opacity-10'} 
                    cursor-pointer transition-all`}
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

          {/* Article sidebar */}
          <div className="lg:w-96 bg-white p-4 shadow-lg rounded-lg overflow-y-auto" style={{ maxHeight: '75vh' }}>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-[#d9232e] pb-2 text-[#d9232e]">
              {searchTerm ? `"${searchTerm}" এর ফলাফল` : 'আজকের প্রধান খবর'}
            </h3>
            
            {(searchTerm && filteredArticles.length === 0) ? (
              <div className="text-center py-8">
                <p className="text-gray-500">কোনো খবর পাওয়া যায়নি</p>
                <button 
                  className="mt-2 px-4 py-2 bg-[#d9232e] text-white rounded"
                  onClick={() => setSearchTerm('')}
                >
                  সব খবর দেখুন
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {(searchTerm ? filteredArticles : newspaperData[currentPage].articles)
                  .sort((a, b) => (b.isLeading ? 1 : 0) - (a.isLeading ? 1 : 0))
                  .map(article => (
                  <div
                    key={article.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedArticle?.id === article.id ? 
                      'bg-[#d9232e] text-white' : 
                      'hover:bg-[#f8f8f8] border border-gray-100'}`}
                    onClick={() => handleArticleClick(article)}
                  >
                    {article.isLeading && !searchTerm && (
                      <span className="text-xs bg-white text-[#d9232e] px-2 py-1 rounded-full font-bold mb-1 inline-block">
                        প্রধান খবর
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${selectedArticle?.id === article.id ? 
                      'bg-white text-[#d9232e]' : 'bg-[#d9232e] text-white'}`}>
                      {article.category}
                    </span>
                    <h4 className={`font-bold mt-1 ${selectedArticle?.id === article.id ? 'text-white' : 'text-gray-800'}`}>
                      {article.title}
                    </h4>
                    <p className={`text-sm ${selectedArticle?.id === article.id ? 'text-gray-100' : 'text-gray-600'} line-clamp-2`}>
                      {article.content}
                    </p>
                    <div className={`text-xs mt-1 ${selectedArticle?.id === article.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      বিস্তারিত পড়ুন →
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected article detail */}
        {selectedArticle && (
          <div id="article-detail" className="mt-8 bg-white p-6 shadow-lg rounded-lg border-t-4 border-[#d9232e]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs bg-[#d9232e] text-white px-2 py-1 rounded-full font-bold">
                  {selectedArticle.category}
                </span>
                <h2 className="text-3xl font-bold mt-3 mb-2 leading-tight">{selectedArticle.title}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>প্রথম আলো</span>
                  <span className="mx-2">•</span>
                  <span>{newspaperData[currentPage].date}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 text-gray-700 leading-relaxed text-lg space-y-4">
              {selectedArticle.content.split('...').map((paragraph, i) => (
                <p key={i}>{paragraph.trim()}</p>
              ))}
              {/* Simulate longer article content */}
              <p>প্রথম আলো পত্রিকার সম্পাদকীয় নীতিমালা অনুসরণ করে এই প্রতিবেদনটি তৈরি করা হয়েছে। সংবাদটির সত্যতা নিশ্চিত করতে আমাদের রিপোর্টিং টিম সংশ্লিষ্ট সকল সূত্র থেকে তথ্য যাচাই করেছে।</p>
              <p>এই বিষয়ে আরও জানতে আমাদের সাথে যোগাযোগ করতে পারেন। প্রথম আলো সর্বদাই সঠিক ও নির্ভরযোগ্য সংবাদ পরিবেশনে প্রতিশ্রুতিবদ্ধ।</p>
            </div>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-[#d9232e]">সম্পর্কিত খবর</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedArticles.map(article => (
                    <div 
                      key={article.id}
                      className="p-3 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer transition-all"
                      onClick={() => navigateToArticlePage(article)}
                    >
                      <span className="text-xs bg-[#d9232e] text-white px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <h4 className="font-bold mt-2 text-gray-800">{article.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{article.content}</p>
                      <div className="text-xs mt-2 text-gray-500">
                        পাতা {article.pageNumber} →
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-[#d9232e] text-white rounded hover:bg-[#c11b26]">
                শেয়ার করুন
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#333] text-white py-8 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">প্রথম আলো</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#d9232e]">আমাদের সম্পর্কে</a></li>
                <li><a href="#" className="hover:text-[#d9232e]">যোগাযোগ</a></li>
                <li><a href="#" className="hover:text-[#d9232e]">ক্যারিয়ার</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">সেবাসমূহ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#d9232e]">ই-পেপার</a></li>
                <li><a href="#" className="hover:text-[#d9232e]">আর্কাইভ</a></li>
                <li><a href="#" className="hover:text-[#d9232e]">প্রিন্ট সাবস্ক্রিপশন</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">নীতিমালা</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#d9232e]">গোপনীয়তা নীতি</a></li>
                <li><a href="#" className="hover:text-[#d9232e]">শর্তাবলী</a></li>
                <li><a href="#" className="hover:text-[#d9232e]">এডভার্টাইজিং</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">সোশ্যাল মিডিয়া</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-[#d9232e] rounded-full flex items-center justify-center">f</a>
                <a href="#" className="w-8 h-8 bg-[#d9232e] rounded-full flex items-center justify-center">t</a>
                <a href="#" className="w-8 h-8 bg-[#d9232e] rounded-full flex items-center justify-center">in</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} প্রথম আলো ই-পেপার. সর্বস্বত্ব সংরক্ষিত</p>
          </div>
        </div>
      </footer>
    </div>
  );
}