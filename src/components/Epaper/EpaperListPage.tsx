/* eslint-disable react-hooks/exhaustive-deps */
// app/(dashboard)/epapers/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaNewspaper, FaPlus, FaSearch } from 'react-icons/fa';
import { getAllEpapers } from '@/lib/api/epaper';
// import EpaperCard from '@/components/epapers/EpaperCard';
import Pagination from '@/components/ui/Pagination';
// import DateRangePicker from '@/components/epapers/DateRangePicker';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { EpaperResponse } from '@/types/epaper';
import DateRangePicker from './DateRangePicker';
import EpaperCard from './EpaperCard';

export default function EpaperListPage() {
  const router = useRouter();
  const [epapers, setEpapers] = useState<EpaperResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ 
    start: null, 
    end: null 
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  const fetchEpapers = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        ...(dateRange.start && { startDate: dateRange.start.toISOString().split('T')[0] }),
        ...(dateRange.end && { endDate: dateRange.end.toISOString().split('T')[0] })
      };

      const response = await getAllEpapers(params);
      setEpapers(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.meta.total,
        totalPages: response.meta.totalPages
      }));
    } catch (error) {
      console.error('Error fetching e-papers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpapers();
  }, [pagination.page, searchTerm, dateRange]);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaNewspaper className="mr-2 text-blue-600" />
              Digital E-Papers
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and view all digital newspaper editions
            </p>
          </div>
          <button
            onClick={() => router.push('/news/dashboard/createEpaper')}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <FaPlus className="mr-2" />
            Create New E-Paper
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search e-papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <DateRangePicker 
              value={dateRange}
              onChange={setDateRange}
            />
            <button
              onClick={() => {
                setSearchTerm('');
                setDateRange({ start: null, end: null });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : epapers.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <h3 className="text-lg font-medium text-gray-700">No e-papers found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm || dateRange.start || dateRange.end 
                ? "Try adjusting your search filters" 
                : "Create your first e-paper to get started"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {epapers.map((epaper) => (
                <EpaperCard 
                  key={epaper.id} 
                  epaper={epaper} 
                  onEdit={() => router.push(`/news/dashboard/epapers/list/${epaper.id}/edit`)}
                  onView={() => router.push(`/news/dashboard/epapers/list/${epaper.id}`)}
                />
              ))}
            </div>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}