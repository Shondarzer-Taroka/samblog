/* eslint-disable prefer-const */
// 'use client'
// import React, { useState, useRef, useEffect } from 'react';
// import { FaSearch, FaUser } from 'react-icons/fa';
// import { FiCalendar } from 'react-icons/fi';
// import BengaliDatePicker from './BengaliDatePicker';

// const SearchPanel = () => {

//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const calendarRef = useRef<HTMLDivElement>(null);

//   // Hide calendar if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         calendarRef.current &&
//         !calendarRef.current.contains(event.target as Node)
//       ) {
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

//   return (
//     <div className="max-w-6xl mx-auto p-4 relative">
//       <h2 className="text-3xl font-bold mb-4">অনুসন্ধান</h2>

//       {/* Search Bar */}
//       <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
//         <input
//           type="text"
//           placeholder="যা খুঁজতে চান"
//           className="w-full px-4 py-2 focus:outline-none"
//         />
//         <button className="bg-blue-600 text-white px-4 py-2">
//           <FaSearch />
//         </button>
//       </div>

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
//                 onSelect={(date: string) => {
//                   setSelectedDate(date);
//                   setShowCalendar(false);
//                 }}
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
//           />
//         </div>

//         {/* Section */}
//         <select className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50">
//           <option>সেকশন</option>
//           <option>জাতীয়</option>
//           <option>আন্তর্জাতিক</option>
//         </select>

//         {/* Type */}
//         <div>
//           {/* <label className="block text-sm text-blue-700 font-bold">ধরণ</label> */}
//           <select className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 w-full">
//             <option>ধরণ</option>
//             <option>সব</option>
//             <option>খবর</option>
//             <option>ফিচার</option>
//           </select>
//         </div>
//       </div>

//       {/* Result and Sort */}
//       <div className="flex items-center justify-between mt-4">
//         <p className="text-gray-600 text-sm">প্রাপ্ত ফলাফল: ১৩৬৩৬৭০</p>
//         <div className="flex items-center gap-2">
//           <p className="font-medium">সাজানো:</p>
//           <select className="border border-gray-300 px-3 py-1.5 rounded-md bg-white">
//             <option>প্রাসঙ্গিক</option>
//             <option>নতুন থেকে পুরোনো</option>
//             <option>পুরোনো থেকে নতুন</option>
//           </select>
//         </div>
//       </div>

//       <hr className="mt-4" />

//       <article>
//         {/* get news */}

          
//       </article>
//     </div>
//   );
// };
// export default SearchPanel;






'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import BengaliDatePicker from './BengaliDatePicker';

// Bengali number and date utilities
const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const bengaliMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const toBengaliNumber = (num: number): string => {
  return num.toString().split('').map(d => bengaliDigits[+d]).join('');
};

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  createdAt: string;
  author: {
    name: string;
  };
  views: number;
}

const SearchPanel = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('সেকশন');
  const [typeFilter, setTypeFilter] = useState('ধরণ');
  const [sortBy, setSortBy] = useState('প্রাসঙ্গিক');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 10;

  // Hide calendar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  // Convert Bengali date to ISO format for backend
  const convertBengaliDateToISO = (bengaliDate: string): string | null => {
    if (!bengaliDate) return null;
    
    const parts = bengaliDate.split(' ');
    if (parts.length !== 3) return null;
    
    const day = parts[0].replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
    const month = bengaliMonths.indexOf(parts[1]);
    const year = parts[2].replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
    
    if (month === -1) return null;
    
    return new Date(parseInt(year), month, parseInt(day)).toISOString();
  };

  // Fetch news with filters
  const fetchNews = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const dateFilter = selectedDate ? convertBengaliDateToISO(selectedDate) : null;
      
      const queryParams = new URLSearchParams({
        query: searchQuery,
        author: authorFilter,
        category: sectionFilter === 'সেকশন' ? '' : sectionFilter,
        type: typeFilter === 'ধরণ' ? '' : typeFilter,
        date: dateFilter || '',
        sort: sortBy === 'প্রাসঙ্গিক' ? 'relevance' : 
              sortBy === 'সর্বশেষ' ? 'latest' : 'popular',
        page: page.toString(),
        limit: itemsPerPage.toString()
      });

      const response = await fetch(`http://localhost:7700/api/news/searchdspk?${queryParams}`);
      const data = await response.json();
      
      setNews(data.news);
      setTotalResults(data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews(1);
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
    fetchNews(1);
  };

  // Pagination controls
  const Pagination = () => {
    const totalPages = Math.ceil(totalResults / itemsPerPage);
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    return (
      <div className="flex justify-center mt-6">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => fetchNews(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
          >
            প্রথম
          </button>
          <button
            onClick={() => fetchNews(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
          >
            পূর্ববর্তী
          </button>
          
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
            <button
              key={page}
              onClick={() => fetchNews(page)}
              className={`px-3 py-1 rounded-md border ${currentPage === page ? 'bg-blue-600 text-white' : 'border-gray-300'}`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => fetchNews(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
          >
            পরবর্তী
          </button>
          <button
            onClick={() => fetchNews(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
          >
            শেষ
          </button>
        </nav>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      <h2 className="text-3xl font-bold mb-4">অনুসন্ধান</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="যা খুঁজতে চান"
          className="w-full px-4 py-2 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          <FaSearch />
        </button>
      </form>

      {/* Filter Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 relative">
        {/* Date Picker */}
        <div className="relative" ref={calendarRef}>
          <div
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex h-full items-center border border-gray-200 px-3 py-2 rounded-md bg-gray-50 cursor-pointer"
          >
            <FiCalendar className="text-gray-500 mr-2" />
            <span className="text-sm">
              {selectedDate || 'তারিখ'}
            </span>
          </div>
          {showCalendar && (
            <div className="absolute z-10 mt-2">
              <BengaliDatePicker
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center border border-gray-200 px-3 py-2 rounded-md bg-gray-50">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="লেখক"
            className="w-full bg-transparent outline-none"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            onBlur={() => fetchNews(1)}
          />
        </div>

        {/* Section */}
        <select 
          className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50"
          value={sectionFilter}
          onChange={(e) => {
            setSectionFilter(e.target.value);
            fetchNews(1);
          }}
        >
          <option>সেকশন</option>
          <option>জাতীয়</option>
          <option>আন্তর্জাতিক</option>
          <option>খেলাধুলা</option>
          <option>বিনোদন</option>
          <option>পরবাস</option>
        </select>

        {/* Type */}
        <select 
          className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 w-full"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            fetchNews(1);
          }}
        >
          <option>ধরণ</option>
          <option>সব</option>
          <option>খবর</option>
          <option>ফিচার</option>
          <option>সাক্ষাৎকার</option>
        </select>
      </div>

      {/* Result and Sort */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-600 text-sm">প্রাপ্ত ফলাফল: {toBengaliNumber(totalResults)}</p>
        <div className="flex items-center gap-2">
          <p className="font-medium">সাজানো:</p>
          <select 
            className="border border-gray-300 px-3 py-1.5 rounded-md bg-white"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              fetchNews(1);
            }}
          >
            <option>প্রাসঙ্গিক</option>
            <option>সর্বশেষ</option>
            <option>জনপ্রিয়</option>
          </select>
        </div>
      </div>

      <hr className="mt-4" />

      {/* Search Results */}
      <div className="mt-6">
        {isLoading ? (
          <div className="text-center py-8">লোড হচ্ছে...</div>
        ) : news.length === 0 ? (
          <div className="text-center py-8">কোন ফলাফল পাওয়া যায়নি</div>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.id} className="border-b pb-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-2 line-clamp-2">{item.content}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{item.author.name}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(item.createdAt).toLocaleDateString('bn-BD')}</span>
                  <span className="mx-2">•</span>
                  <span>{toBengaliNumber(item.views)} বার দেখা</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalResults > itemsPerPage && <Pagination />}
    </div>
  );
};

export default SearchPanel;