/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */





'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import BengaliDatePicker from './BengaliDatePicker';
import LoadingSpinner from '../ui/LoadingSpinner';
import NewsHorizontalCard from '@/share/NewsHorizontalCard';
import { NewsItem } from '@/types/news.types';

const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const bengaliMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

const toBengaliNumber = (num: number): string =>
  num.toString().split('').map(d => bengaliDigits[+d]).join('');


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
    console.log(news);

  const calendarRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  const convertBengaliDateToISO = (bengaliDate: string): string | null => {
    const parts = bengaliDate.split(' ');
    if (parts.length !== 3) return null;
    const day = parts[0].replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
    const month = bengaliMonths.indexOf(parts[1]);
    const year = parts[2].replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
    if (month === -1) return null;
    return new Date(parseInt(year), month, parseInt(day)).toISOString();
  };


  const updateUrlParams = (page = 1) => {
    const params = new URLSearchParams();

    if (searchQuery) params.set('query', searchQuery);
    if (authorFilter) params.set('author', authorFilter);
    if (sectionFilter !== 'সেকশন') params.set('category', sectionFilter);
    if (typeFilter !== 'ধরণ') params.set('type', typeFilter);
    if (selectedDate) params.set('date', selectedDate);
    if (sortBy !== 'প্রাসঙ্গিক') params.set('sort', sortBy);
    if (page !== 1) params.set('page', String(page));

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : '/search', { scroll: false });
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/searchdspk?${queryParams}`);
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


  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams(1);
    fetchNews(1);
  };




  // Trigger search when filters change (except search query)
  useEffect(() => {
    updateUrlParams(currentPage);
    fetchNews(currentPage);
  }, [ sectionFilter, typeFilter, selectedDate, sortBy]);

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
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    
    return (
      <div className="flex justify-center mt-6 items-center flex-wrap ">
        {currentPage > 1 && (
          <button
            onClick={() => {
              const newPage = currentPage - 1;
              setCurrentPage(newPage);
              updateUrlParams(newPage);
              fetchNews(newPage);
            }}
            className="px-3 py-1 border rounded-md mx-1 bg-white border-gray-300"
          >
            পূর্ববর্তী
          </button>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(p => (
          <button
            key={p}
            onClick={() => {
              setCurrentPage(p);
              updateUrlParams(p);
              fetchNews(p);
            }}
            className={`px-3 py-1 border rounded-md mx-1 ${p === currentPage ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'}`}
          >
            {toBengaliNumber(p)}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => {
              const newPage = currentPage + 1;
              setCurrentPage(newPage);
              updateUrlParams(newPage);
              fetchNews(newPage);
            }}
            className="px-3 py-1 border rounded-md mx-1 bg-white border-gray-300"
          >
            পরবর্তী
          </button>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">অনুসন্ধান</h2>

      <form onSubmit={handleSearchSubmit} className="flex border rounded-md overflow-hidden mb-4">
        <input
          className="w-full px-4 py-2"
          placeholder="যা খুঁজতে চান"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4" type="submit">
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
          />
        </div>

        <select 
          className="border rounded px-3 py-2 bg-gray-50" 
          value={sectionFilter} 
          onChange={(e) => setSectionFilter(e.target.value)}
        >
          <option>সেকশন</option>
          <option>জাতীয়</option>
          <option>আন্তর্জাতিক</option>
          <option>খেলাধুলা</option>
          <option>বিনোদন</option>
        </select>

        <select 
          className="border rounded px-3 py-2 bg-gray-50" 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option>ধরণ</option>
          <option>খবর</option>
          <option>ফিচার</option>
          <option>সাক্ষাৎকার</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex justify-between mb-4">
        <p>ফলাফল: {toBengaliNumber(totalResults)}</p>
        <select 
          className="border rounded px-3 py-2" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>প্রাসঙ্গিক</option>
          <option>সর্বশেষ</option>
          <option>জনপ্রিয়</option>
        </select>
      </div>

      {/* Results */}
      {news.length === 0 ? (
        <p>ফলাফল পাওয়া যায়নি।</p>
      ) : (
        <section className=' grid grid-cols-1 gap-4 md:grid-cols-2'>
          {news.map(item => (
        
            
            <NewsHorizontalCard key={item.id} news={item}/>
          ))}
        </section>
      )}

      {/* Pagination */}
      {totalResults > itemsPerPage && <Pagination />}
    </div>
  );
};

export default SearchPanel;