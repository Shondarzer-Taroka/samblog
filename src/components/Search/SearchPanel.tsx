/* eslint-disable prefer-const */


// 'use client'
// import React, { useState, useRef, useEffect } from 'react';
// import { FaSearch, FaUser } from 'react-icons/fa';
// import { FiCalendar } from 'react-icons/fi';
// import BengaliDatePicker from './BengaliDatePicker';

// // Bengali number and date utilities
// const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
// const bengaliMonths = [
//   'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
//   'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
// ];

// const toBengaliNumber = (num: number): string => {
//   return num.toString().split('').map(d => bengaliDigits[+d]).join('');
// };

// interface NewsItem {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   subCategory: string;
//   createdAt: string;
//   author: {
//     name: string;
//   };
//   views: number;
// }

// const SearchPanel = () => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [authorFilter, setAuthorFilter] = useState('');
//   const [sectionFilter, setSectionFilter] = useState('সেকশন');
//   const [typeFilter, setTypeFilter] = useState('ধরণ');
//   const [sortBy, setSortBy] = useState('প্রাসঙ্গিক');
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [totalResults, setTotalResults] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const calendarRef = useRef<HTMLDivElement>(null);

//   const itemsPerPage = 10;

//   // Hide calendar if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
//         setShowCalendar(false);
//       }
//     };

//     if (showCalendar) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showCalendar]);

//   useEffect(() => {
//   fetchNews(1);
// }, []);

//   // Convert Bengali date to ISO format for backend
//   const convertBengaliDateToISO = (bengaliDate: string): string | null => {
//     if (!bengaliDate) return null;
    
//     const parts = bengaliDate.split(' ');
//     if (parts.length !== 3) return null;
    
//     const day = parts[0].replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
//     const month = bengaliMonths.indexOf(parts[1]);
//     const year = parts[2].replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
    
//     if (month === -1) return null;
    
//     return new Date(parseInt(year), month, parseInt(day)).toISOString();
//   };

//   // Fetch news with filters
//   const fetchNews = async (page: number = 1) => {
//     setIsLoading(true);
//     try {
//       const dateFilter = selectedDate ? convertBengaliDateToISO(selectedDate) : null;
      
//       const queryParams = new URLSearchParams({
//         query: searchQuery,
//         author: authorFilter,
//         category: sectionFilter === 'সেকশন' ? '' : sectionFilter,
//         type: typeFilter === 'ধরণ' ? '' : typeFilter,
//         date: dateFilter || '',
//         sort: sortBy === 'প্রাসঙ্গিক' ? 'relevance' : 
//               sortBy === 'সর্বশেষ' ? 'latest' : 'popular',
//         page: page.toString(),
//         limit: itemsPerPage.toString()
//       });

//       const response = await fetch(`http://localhost:7700/api/news/searchdspk?${queryParams}`);
//       const data = await response.json();
      
//       setNews(data.news);
//       setTotalResults(data.total);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error('Error fetching news:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle search submit
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     fetchNews(1);
//   };

//   // Handle date selection
//   const handleDateSelect = (date: string) => {
//     setSelectedDate(date);
//     setShowCalendar(false);
//     fetchNews(1);
//   };

//   // Pagination controls
//   const Pagination = () => {
//     const totalPages = Math.ceil(totalResults / itemsPerPage);
//     const maxVisiblePages = 5;
    
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }
    
//     return (
//       <div className="flex justify-center mt-6">
//         <nav className="flex items-center gap-1">
//           <button
//             onClick={() => fetchNews(1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
//           >
//             প্রথম
//           </button>
//           <button
//             onClick={() => fetchNews(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
//           >
//             পূর্ববর্তী
//           </button>
          
//           {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
//             <button
//               key={page}
//               onClick={() => fetchNews(page)}
//               className={`px-3 py-1 rounded-md border ${currentPage === page ? 'bg-blue-600 text-white' : 'border-gray-300'}`}
//             >
//               {page}
//             </button>
//           ))}
          
//           <button
//             onClick={() => fetchNews(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
//           >
//             পরবর্তী
//           </button>
//           <button
//             onClick={() => fetchNews(totalPages)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
//           >
//             শেষ
//           </button>
//         </nav>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 relative">
//       <h2 className="text-3xl font-bold mb-4">অনুসন্ধান</h2>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md overflow-hidden">
//         <input
//           type="text"
//           placeholder="যা খুঁজতে চান"
//           className="w-full px-4 py-2 focus:outline-none"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2">
//           <FaSearch />
//         </button>
//       </form>

//       {/* Filter Row */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 relative">
//         {/* Date Picker */}
//         <div className="relative" ref={calendarRef}>
//           <div
//             onClick={() => setShowCalendar(!showCalendar)}
//             className="flex h-full items-center border border-gray-200 px-3 py-2 rounded-md bg-gray-50 cursor-pointer"
//           >
//             <FiCalendar className="text-gray-500 mr-2" />
//             <span className="text-sm">
//               {selectedDate || 'তারিখ'}
//             </span>
//           </div>
//           {showCalendar && (
//             <div className="absolute z-10 mt-2">
//               <BengaliDatePicker
//                 onSelect={handleDateSelect}
//               />
//             </div>
//           )}
//         </div>

//         {/* Author */}
//         <div className="flex items-center border border-gray-200 px-3 py-2 rounded-md bg-gray-50">
//           <FaUser className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="লেখক"
//             className="w-full bg-transparent outline-none"
//             value={authorFilter}
//             onChange={(e) => setAuthorFilter(e.target.value)}
//             onBlur={() => fetchNews(1)}
//           />
//         </div>

//         {/* Section */}
//         <select 
//           className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50"
//           value={sectionFilter}
//           onChange={(e) => {
//             setSectionFilter(e.target.value);
//             fetchNews(1);
//           }}
//         >
//           <option>সেকশন</option>
//           <option>জাতীয়</option>
//           <option>আন্তর্জাতিক</option>
//           <option>খেলাধুলা</option>
//           <option>বিনোদন</option>
//           <option>পরবাস</option>
//         </select>

//         {/* Type */}
//         <select 
//           className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 w-full"
//           value={typeFilter}
//           onChange={(e) => {
//             setTypeFilter(e.target.value);
//             fetchNews(1);
//           }}
//         >
//           <option>ধরণ</option>
//           <option>সব</option>
//           <option>খবর</option>
//           <option>ফিচার</option>
//           <option>সাক্ষাৎকার</option>
//         </select>
//       </div>

//       {/* Result and Sort */}
//       <div className="flex items-center justify-between mt-4">
//         <p className="text-gray-600 text-sm">প্রাপ্ত ফলাফল: {toBengaliNumber(totalResults)}</p>
//         <div className="flex items-center gap-2">
//           <p className="font-medium">সাজানো:</p>
//           <select 
//             className="border border-gray-300 px-3 py-1.5 rounded-md bg-white"
//             value={sortBy}
//             onChange={(e) => {
//               setSortBy(e.target.value);
//               fetchNews(1);
//             }}
//           >
//             <option>প্রাসঙ্গিক</option>
//             <option>সর্বশেষ</option>
//             <option>জনপ্রিয়</option>
//           </select>
//         </div>
//       </div>

//       <hr className="mt-4" />

//       {/* Search Results */}
//       <div className="mt-6">
//         {isLoading ? (
//           <div className="text-center py-8">লোড হচ্ছে...</div>
//         ) : news.length === 0 ? (
//           <div className="text-center py-8">কোন ফলাফল পাওয়া যায়নি</div>
//         ) : (
//           <div className="space-y-6">
//             {news.map((item) => (
//               <div key={item.id} className="border-b pb-6">
//                 <h3 className="text-xl font-bold mb-2">{item.title}</h3>
//                 <p className="text-gray-700 mb-2 line-clamp-2">{item.content}</p>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <span>{item.author.name}</span>
//                   <span className="mx-2">•</span>
//                   <span>{new Date(item.createdAt).toLocaleDateString('bn-BD')}</span>
//                   <span className="mx-2">•</span>
//                   <span>{toBengaliNumber(item.views)} বার দেখা</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalResults > itemsPerPage && <Pagination />}
//     </div>
//   );
// };

// export default SearchPanel;














'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import BengaliDatePicker from './BengaliDatePicker';

const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const bengaliMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

const toBengaliNumber = (num: number): string =>
  num.toString().split('').map(d => bengaliDigits[+d]).join('');

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  createdAt: string;
  author: { name: string };
  views: number;
}

const SearchPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [authorFilter, setAuthorFilter] = useState(searchParams.get('author') || '');
  const [sectionFilter, setSectionFilter] = useState(searchParams.get('category') || 'সেকশন');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'ধরণ');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'প্রাসঙ্গিক');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [selectedDate, setSelectedDate] = useState(searchParams.get('date') || '');
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  // ISO converter
  const convertBengaliDateToISO = (bengaliDate: string): string | null => {
    const parts = bengaliDate.split(' ');
    if (parts.length !== 3) return null;
    const day = parts[0].replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
    const month = bengaliMonths.indexOf(parts[1]);
    const year = parts[2].replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
    if (month === -1) return null;
    return new Date(parseInt(year), month, parseInt(day)).toISOString();
  };

  // Build URL with filters
  const updateUrlParams = (page = 1) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (authorFilter) params.set('author', authorFilter);
    if (sectionFilter && sectionFilter !== 'সেকশন') params.set('category', sectionFilter);
    if (typeFilter && typeFilter !== 'ধরণ') params.set('type', typeFilter);
    if (sortBy) params.set('sort', sortBy);
    if (selectedDate) params.set('date', selectedDate);
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const fetchNews = async (page = 1) => {
    setIsLoading(true);
    try {
      const dateFilter = selectedDate ? convertBengaliDateToISO(selectedDate) : null;

      const queryParams = new URLSearchParams({
        query: searchQuery,
        author: authorFilter,
        category: sectionFilter === 'সেকশন' ? '' : sectionFilter,
        type: typeFilter === 'ধরণ' ? '' : typeFilter,
        date: dateFilter || '',
        sort: sortBy === 'প্রাসঙ্গিক' ? 'relevance' : sortBy === 'সর্বশেষ' ? 'latest' : 'popular',
        page: page.toString(),
        limit: itemsPerPage.toString()
      });

      const response = await fetch(`http://localhost:7700/api/news/searchdspk?${queryParams}`);
      const data = await response.json();
      setNews(data.news);
      setTotalResults(data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams(1);
    fetchNews(1);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
    updateUrlParams(1);
    fetchNews(1);
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, []);

  // Hide calendar on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  const Pagination = () => {
    const totalPages = Math.ceil(totalResults / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5);
    return (
      <div className="flex justify-center mt-6">
        {pages.map(p => (
          <button
            key={p}
            onClick={() => {
              updateUrlParams(p);
              fetchNews(p);
            }}
            className={`px-3 py-1 border rounded-md mx-1 ${p === currentPage ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'}`}
          >
            {p}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">অনুসন্ধান</h2>

      <form onSubmit={handleSearch} className="flex border rounded-md overflow-hidden mb-4">
        <input
          className="w-full px-4 py-2"
          placeholder="যা খুঁজতে চান"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4">
          <FaSearch />
        </button>
      </form>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <div className="relative" ref={calendarRef}>
          <div onClick={() => setShowCalendar(!showCalendar)} className="cursor-pointer px-3 py-2 border rounded bg-gray-50 flex items-center">
            <FiCalendar className="mr-2" />
            <span>{selectedDate || 'তারিখ'}</span>
          </div>
          {showCalendar && (
            <div className="absolute z-10 bg-white shadow-lg">
              <BengaliDatePicker onSelect={handleDateSelect} />
            </div>
          )}
        </div>

        <div className="flex items-center px-3 py-2 border rounded bg-gray-50">
          <FaUser className="mr-2" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="লেখক"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            onBlur={() => { updateUrlParams(1); fetchNews(1); }}
          />
        </div>

        <select className="border rounded px-3 py-2 bg-gray-50" value={sectionFilter} onChange={(e) => {
          setSectionFilter(e.target.value); updateUrlParams(1); fetchNews(1);
        }}>
          <option>সেকশন</option>
          <option>জাতীয়</option>
          <option>আন্তর্জাতিক</option>
          <option>খেলাধুলা</option>
          <option>বিনোদন</option>
        </select>

        <select className="border rounded px-3 py-2 bg-gray-50" value={typeFilter} onChange={(e) => {
          setTypeFilter(e.target.value); updateUrlParams(1); fetchNews(1);
        }}>
          <option>ধরণ</option>
          <option>খবর</option>
          <option>ফিচার</option>
          <option>সাক্ষাৎকার</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex justify-between mb-4">
        <p>ফলাফল: {toBengaliNumber(totalResults)}</p>
        <select className="border rounded px-3 py-2" value={sortBy} onChange={(e) => {
          setSortBy(e.target.value); updateUrlParams(1); fetchNews(1);
        }}>
          <option>প্রাসঙ্গিক</option>
          <option>সর্বশেষ</option>
          <option>জনপ্রিয়</option>
        </select>
      </div>

      {/* Results */}
      {isLoading ? (
        <p>লোড হচ্ছে...</p>
      ) : news.length === 0 ? (
        <p>ফলাফল পাওয়া যায়নি।</p>
      ) : (
        news.map(item => (
          <div key={item.id} className="mb-6 border-b pb-4">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-700">{item.content}</p>
            <p className="text-sm text-gray-500 mt-1">
              {item.author?.name} • {new Date(item.createdAt).toLocaleDateString('bn-BD')} • {toBengaliNumber(item.views)} বার দেখা
            </p>
          </div>
        ))
      )}

      {/* Pagination */}
      {totalResults > itemsPerPage && <Pagination />}
    </div>
  );
};

export default SearchPanel;
