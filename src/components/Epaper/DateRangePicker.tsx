// components/epapers/DateRangePicker.tsx
'use client';

import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  value: { start: Date | null; end: Date | null };
  onChange: (value: { start: Date | null; end: Date | null }) => void;
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-400 mr-2" />
          <span className="text-sm">
            {value.start && value.end
              ? `${value.start.toLocaleDateString()} - ${value.end.toLocaleDateString()}`
              : 'Select date range'}
          </span>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-lg p-4">
          <DatePicker
            selectsRange
            startDate={value.start}
            endDate={value.end}
            onChange={(dates) => {
              const [start, end] = dates;
              onChange({ start, end });
              if (start && end) setIsOpen(false);
            }}
            inline
          />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => {
                onChange({ start: null, end: null });
                setIsOpen(false);
              }}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}