/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React, { useState, useEffect } from 'react';
import { FaSearchLocation, FaSearch, FaSpinner } from 'react-icons/fa';
import BdAddress, { bdUnions } from 'bd-address';
import { useRouter, useSearchParams } from 'next/navigation';

interface Division {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}

interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}

interface Upazilla {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
}

interface Union {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}

interface NewsData {
  news: any[];
  total: number;
  page: number;
  totalPages: number;
}

interface AreaNewsFilterProps {
  onSearch?: (data: NewsData) => void;
  isHomePage?: boolean;
}

const AreaNewsFilter = ({ onSearch, isHomePage = false }: AreaNewsFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [division, setDivision] = useState<string>(searchParams.get('division') || '');
  const [district, setDistrict] = useState<string>(searchParams.get('district') || '');
  const [upazila, setUpazila] = useState<string>(searchParams.get('thana') || '');
  const [union, setUnion] = useState<string>(searchParams.get('union') || '');

  // State for address data
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazilla[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);

  // Load divisions on component mount
  useEffect(() => {
    const allDivisions = BdAddress.divisions();
    setDivisions(allDivisions);
  }, []);

  // Load districts when division changes
  useEffect(() => {
    if (division) {
      const selectedDivision = divisions.find(d => d.bn_name === division);
      if (selectedDivision) {
        const divisionDistricts = BdAddress.district(selectedDivision.id);
        setDistricts(divisionDistricts);
      }
    } else {
      setDistricts([]);
    }
    if (!searchParams.get('district')) setDistrict('');
    setUpazila('');
    setUnion('');
  }, [division, divisions, searchParams]);

  // Load upazilas when district changes
  useEffect(() => {
    if (district) {
      const selectedDistrict = districts.find(d => d.bn_name === district);
      if (selectedDistrict) {
        const districtUpazilas = BdAddress.upazilla(selectedDistrict.id);
        setUpazilas(districtUpazilas);
      }
    } else {
      setUpazilas([]);
    }
    if (!searchParams.get('thana')) setUpazila('');
    setUnion('');
  }, [district, districts, searchParams]);

  // Load unions when upazila changes
  useEffect(() => {
    if (upazila) {
      const selectedUpazila = upazilas.find(u => u.bn_name === upazila);
      if (selectedUpazila) {
        const upazilaUnions = bdUnions().filter((u: { upazilla_id: string }) => 
          u.upazilla_id === selectedUpazila.id
        );
        setUnions(upazilaUnions);
      }
    } else {
      setUnions([]);
    }
    if (!searchParams.get('union')) setUnion('');
  }, [upazila, upazilas, searchParams]);

  // Initialize from URL params
  useEffect(() => {
    if (searchParams.get('division')) setDivision(searchParams.get('division') || '');
    if (searchParams.get('district')) setDistrict(searchParams.get('district') || '');
    if (searchParams.get('thana')) setUpazila(searchParams.get('thana') || '');
    if (searchParams.get('union')) setUnion(searchParams.get('union') || '');
  }, [searchParams]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    
    const params = new URLSearchParams();
    if (division) params.append('division', division);
    if (district) params.append('district', district);
    if (upazila) params.append('thana', upazila);
    if (union) params.append('union', union);

    if (isHomePage) {
      // Navigate to news/area with params
      router.push(`/news/area?${params.toString()}`);
    } else {
      // Fetch data directly
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/area?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        if (onSearch) onSearch(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching news:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-md w-full border border-blue-200">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        {/* Icon and label */}
        <div className="flex items-center gap-2 text-blue-700 font-bold whitespace-nowrap min-w-[180px]">
          <FaSearchLocation className="text-2xl" />
          <span className="text-lg">আমার এলাকার খবর</span>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
          <select 
            className="px-4 py-2 rounded-lg border border-blue-300 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="">বিভাগ নির্বাচন করুন</option>
            {divisions.map((div) => (
              <option key={div.id} value={div.bn_name}>{div.bn_name}</option>
            ))}
          </select>

          <select 
            className="px-4 py-2 rounded-lg border border-blue-300 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!division}
          >
            <option value="">জেলা নির্বাচন করুন</option>
            {districts.map((dis) => (
              <option key={dis.id} value={dis.bn_name}>{dis.bn_name}</option>
            ))}
          </select>

          <select 
            className="px-4 py-2 rounded-lg border border-blue-300 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            disabled={!district}
          >
            <option value="">উপজেলা নির্বাচন করুন</option>
            {upazilas.map((upa) => (
              <option key={upa.id} value={upa.bn_name}>{upa.bn_name}</option>
            ))}
          </select>

          <select 
            className="px-4 py-2 rounded-lg border border-blue-300 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={union}
            onChange={(e) => setUnion(e.target.value)}
            disabled={!upazila}
          >
            <option value="">ইউনিয়ন নির্বাচন করুন</option>
            {unions.map((uni) => (
              <option key={uni.id} value={uni.bn_name}>{uni.bn_name}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 text-sm whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed min-w-[100px]"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <FaSearch />
              খুঁজুন
            </>
          )}
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default AreaNewsFilter;