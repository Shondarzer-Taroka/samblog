'use client'
import React, { useState, useEffect } from 'react';
import { FaSearchLocation, FaSearch } from 'react-icons/fa';
import BdAddress, { bdUnions, bdPostCodes } from 'bd-address';

type Division = {
  id: string;
  name: string;
  bn_name: string;
  url: string;
};

type District = {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
};

type Upazilla = {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
};

type Union = {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
};

const AreaNewsFilter = () => {
  const [division, setDivision] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [upazila, setUpazila] = useState<string>('');
  const [union, setUnion] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');

  // State for address data
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazilla[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);
  const [postCodes, setPostCodes] = useState<string[]>([]);

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
    setDistrict('');
    setUpazila('');
    setUnion('');
    setPostCode('');
  }, [division, divisions]);

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
    setUpazila('');
    setUnion('');
    setPostCode('');
  }, [district, districts]);

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
    setUnion('');
    setPostCode('');
  }, [upazila, upazilas]);

  // Load post codes when union changes
  useEffect(() => {
    if (union) {
      const selectedUnion = unions.find(u => u.bn_name === union);
      if (selectedUnion) {
        const allPostCodes = bdPostCodes();
        const matchedCodes: string[] = [];
        
        for (const key in allPostCodes) {
          const entry = allPostCodes[key];
          if (entry?.bn?.suboffice?.includes(selectedUnion.bn_name)) {
            matchedCodes.push(entry.bn.postcode.trim());
          }
        }
        
        setPostCodes(matchedCodes);
        if (matchedCodes.length > 0) {
          setPostCode(matchedCodes[0]);
        }
      }
    } else {
      setPostCodes([]);
      setPostCode('');
    }
  }, [union, unions]);

  const handleSearch = () => {
    console.log({
      division,
      district,
      upazila,
      union,
      postCode
    });
    // You can implement your search logic here
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-md w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        {/* Icon and label */}
        <div className="flex items-center gap-2 text-blue-700 font-bold whitespace-nowrap min-w-[180px]">
          <FaSearchLocation className="text-2xl" />
          <span className="text-lg">আমার এলাকার খবর</span>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
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

          <select 
            className="px-4 py-2 rounded-lg border border-blue-300 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            disabled={!union}
          >
            <option value="">পোস্ট কোড নির্বাচন করুন</option>
            {postCodes.map((code, index) => (
              <option key={index} value={code}>{code}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 text-sm whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
          onClick={handleSearch}
          disabled={!postCode}
        >
          <FaSearch />
          খুঁজুন
        </button>
      </div>
    </div>
  );
};

export default AreaNewsFilter;