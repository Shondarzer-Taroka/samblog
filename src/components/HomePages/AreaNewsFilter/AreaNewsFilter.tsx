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
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
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

  const [division, setDivision] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [upazila, setUpazila] = useState<string>('');
  const [union, setUnion] = useState<string>('');

  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazilla[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);

  useEffect(() => {
    const allDivisions = BdAddress.divisions();
    setDivisions(allDivisions);
  }, []);

  useEffect(() => {
    if (searchParams) {
      const divisionParam = searchParams.get('division');
      const districtParam = searchParams.get('district');
      const upazilaParam = searchParams.get('thana');
      const unionParam = searchParams.get('union');

      if (divisionParam) setDivision(divisionParam);
      if (districtParam) setDistrict(districtParam);
      if (upazilaParam) setUpazila(upazilaParam);
      if (unionParam) setUnion(unionParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (division) {
      const selectedDivision = divisions.find(d => d.bn_name === division);
      if (selectedDivision) {
        const divisionDistricts = BdAddress.district(selectedDivision.id);
        setDistricts(divisionDistricts);
      }
    } else {
      setDistricts([]);
      setDistrict('');
    }
    setUpazila('');
    setUnion('');
  }, [division, divisions]);

  useEffect(() => {
    if (district) {
      const selectedDistrict = districts.find(d => d.bn_name === district);
      if (selectedDistrict) {
        const districtUpazilas = BdAddress.upazilla(selectedDistrict.id);
        setUpazilas(districtUpazilas);
      }
    } else {
      setUpazilas([]);
      setUpazila('');
    }
    setUnion('');
  }, [district, districts]);

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
      setUnion('');
    }
  }, [upazila, upazilas]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    
    const params = new URLSearchParams();
    if (division) params.append('division', division);
    if (district) params.append('district', district);
    if (upazila) params.append('thana', upazila);
    if (union) params.append('union', union);
    params.append('page', '1'); 
    if (isHomePage) {
      router.push(`/news/area?${params.toString()}`);
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/area?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        if (onSearch) onSearch(data.data);
        
        // Update URL without page reload
        window.history.pushState({}, '', `?${params.toString()}`);
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
        <div className="flex items-center gap-2 text-blue-700 font-bold whitespace-nowrap min-w-[180px]">
          <FaSearchLocation className="text-2xl" />
          <span className="text-lg">আমার এলাকার খবর</span>
        </div>

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

        <button 
          className=" w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-[9.5px] rounded-[4px] flex items-center justify-center gap-2 text-sm whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed min-w-[100px]"
          onClick={handleSearch}
          disabled={isLoading || !division}
        >
          {isLoading ? (
            
            <FaSpinner className="animate-spin text-xl" />
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