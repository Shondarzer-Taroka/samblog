/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { FaSearchLocation, FaSearch } from 'react-icons/fa';
import BdAddress from 'bd-address';

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

const AreaNewsFilter = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazilla[]>([]);

  const [formData, setFormData] = useState({
    division: '',
    district: '',
    upazila: '',
  });

  // Load divisions on mount
  useEffect(() => {
    setDivisions(BdAddress.divisions());
  }, []);

  // Load districts on division change
  useEffect(() => {
    const selected = divisions.find((d) => d.bn_name === formData.division);
    if (selected) {
      setDistricts(BdAddress.district(selected.id));
      setFormData((prev) => ({ ...prev, district: '', upazila: '' }));
      setUpazilas([]);
    }
  }, [formData.division]);

  // Load upazilas on district change
  useEffect(() => {
    const selected = districts.find((d) => d.bn_name === formData.district);
    if (selected) {
      setUpazilas(BdAddress.upazilla(selected.id));
      setFormData((prev) => ({ ...prev, upazila: '' }));
    }
  }, [formData.district]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    alert(
      `আপনি নির্বাচন করেছেন:\nবিভাগ: ${formData.division}\nজেলা: ${formData.district}\nউপজেলা: ${formData.upazila}`
    );
  };

  return (
    <div className="bg-blue-100 p-4 flex flex-wrap gap-4 items-center w-full rounded">
      {/* Icon and label */}
      <div className="flex items-center gap-2 text-red-600 font-semibold whitespace-nowrap">
        <FaSearchLocation className="text-xl" />
        <span className="text-black">আমার এলাকার খবর</span>
      </div>

      {/* Dropdowns */}
      <select
        name="division"
        value={formData.division}
        onChange={handleChange}
        className="px-4 py-2 rounded border text-sm bg-white"
      >
        <option value="">বিভাগ</option>
        {divisions.map((div) => (
          <option key={div.id} value={div.bn_name}>
            {div.bn_name}
          </option>
        ))}
      </select>

      <select
        name="district"
        value={formData.district}
        onChange={handleChange}
        className="px-4 py-2 rounded border text-sm bg-white"
        disabled={!formData.division}
      >
        <option value="">জেলা</option>
        {districts.map((dist) => (
          <option key={dist.id} value={dist.bn_name}>
            {dist.bn_name}
          </option>
        ))}
      </select>

      <select
        name="upazila"
        value={formData.upazila}
        onChange={handleChange}
        className="px-4 py-2 rounded border text-sm bg-white"
        disabled={!formData.district}
      >
        <option value="">উপজেলা</option>
        {upazilas.map((upa) => (
          <option key={upa.id} value={upa.bn_name}>
            {upa.bn_name}
          </option>
        ))}
      </select>

      {/* Search button */}
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded flex items-center gap-2 text-sm whitespace-nowrap"
        onClick={handleSearch}
      >
        <FaSearch />
        খুঁজুন
      </button>
    </div>
  );
};

export default AreaNewsFilter;
