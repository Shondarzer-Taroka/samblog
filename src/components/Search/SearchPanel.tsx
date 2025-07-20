'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import BengaliDatePicker from './BengaliDatePicker';

const SearchPanel = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Hide calendar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
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

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      <h2 className="text-3xl font-bold mb-4">অনুসন্ধান</h2>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="যা খুঁজতে চান"
          className="w-full px-4 py-2 focus:outline-none"
        />
        <button className="bg-blue-600 text-white px-4 py-2">
          <FaSearch />
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 relative">
        {/* Date Picker */}
        <div className="relative" ref={calendarRef}>
          <div
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center border border-gray-200 px-3 py-2 rounded-md bg-gray-50 cursor-pointer"
          >
            <FiCalendar className="text-gray-500 mr-2" />
            <span className="text-sm">
              {selectedDate || 'তারিখ'}
            </span>
          </div>
          {showCalendar && (
            <div className="absolute z-10 mt-2">
              <BengaliDatePicker
                onSelect={(date: string) => {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }}
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
          />
        </div>

        {/* Section */}
        <select className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50">
          <option>সেকশন</option>
          <option>জাতীয়</option>
          <option>আন্তর্জাতিক</option>
        </select>

        {/* Type */}
        <div>
          <label className="block text-sm text-blue-700 font-bold">ধরণ</label>
          <select className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 w-full">
            <option>সব</option>
            <option>খবর</option>
            <option>ফিচার</option>
          </select>
        </div>
      </div>

      {/* Result and Sort */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-600 text-sm">প্রাপ্ত ফলাফল: ১৩৬৩৬৭০</p>
        <div className="flex items-center gap-2">
          <p className="font-medium">সাজানো:</p>
          <select className="border border-gray-300 px-3 py-1.5 rounded-md bg-white">
            <option>প্রাসঙ্গিক</option>
            <option>সর্বশেষ</option>
            <option>জনপ্রিয়</option>
          </select>
        </div>
      </div>

      <hr className="mt-4" />
    </div>
  );
};

export default SearchPanel;
