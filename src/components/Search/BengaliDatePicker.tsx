'use client'
import React, { useState } from 'react';

const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const bengaliMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];
const weekdays = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];

function toBengaliNumber(num: number): string {
  return num.toString().split('').map(d => bengaliDigits[+d]).join('');
}

const generateYears = (start: number, end: number): number[] => {
  const years = [];
  for (let i = start; i <= end; i++) {
    years.push(i);
  }
  return years;
};

const BengaliDatePicker = ({ onSelect }: { onSelect: (date: string) => void }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(Number(e.target.value));
  };

  const getDates = () => {
    const dates = Array(startingDay).fill(null);
    for (let i = 1; i <= lastDateOfMonth; i++) {
      dates.push(i);
    }
    return dates;
  };

  const dates = getDates();
  const years = generateYears(2015, 2035);

  return (
    <div className="w-80 p-4 bg-white shadow-md rounded-xl text-center select-none">
      {/* Month + Year Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={handlePrevMonth} className="px-2 text-xl font-bold">‹</button>

        {/* Month and Year Selector */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{bengaliMonths[currentMonth]}</span>
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="bg-white border border-gray-300 rounded-md px-1 py-0.5 focus:outline-none"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {toBengaliNumber(year)}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleNextMonth} className="px-2 text-xl font-bold">›</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-sm font-medium text-gray-600">
        {weekdays.map(day => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 text-sm mt-1">
        {dates.map((date, i) => {
          const isToday = date === today.getDate()
            && currentMonth === today.getMonth()
            && currentYear === today.getFullYear();

          const handleSelect = () => {
            if (date) {
              const formatted = `${toBengaliNumber(date)} ${bengaliMonths[currentMonth]} ${toBengaliNumber(currentYear)}`;
              onSelect(formatted);
            }
          };

          return (
            <div
              key={i}
              onClick={handleSelect}
              className={`h-10 flex items-center justify-center rounded-full cursor-pointer
                ${date ? 'hover:bg-blue-100' : ''}
                ${isToday ? 'bg-blue-600 text-white' : ''}`}
            >
              {date ? toBengaliNumber(date) : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BengaliDatePicker;













