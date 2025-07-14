/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaHome,
  FaCamera,
} from 'react-icons/fa';
import BdAddress, { bdUnions, bdPostCodes } from 'bd-address';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';

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

type PostCodeEntry = {
  en: {
    division: string;
    district: string;
    thana: string;
    suboffice: string;
    postcode: string;
  };
  bn: {
    division: string;
    district: string;
    thana: string;
    suboffice: string;
    postcode: string;
  };
};

type ProfileFormProps = {
  initialData?: {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    division?: string;
    district?: string;
    thana?: string;
    union?: string;
    postCode?: string;
    image?: string;
  };
  onSubmit: (formData: any) => Promise<void>;
  isUpdate?: boolean;
  loadingText?: string;
};

const ProfileForm = ({
  initialData = {},
  onSubmit,
  isUpdate = false,
  loadingText = 'নিবন্ধন করুন',
}: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    password: initialData.password || '',
    phone: initialData.phone || '',
    address: initialData.address || '',
    division: initialData.division || '',
    district: initialData.district || '',
    thana: initialData.thana || '',
    union: initialData.union || '',
    postCode: initialData.postCode || '',
  });

  const [profileImage, setProfileImage] = useState<string | null>(initialData.image || null);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [thanas, setThanas] = useState<Upazilla[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    setDivisions(BdAddress.divisions());
    
    // If initial data has division, load its districts
    if (initialData.division) {
      const selectedDivision = divisions.find(d => d.bn_name === initialData.division);
      if (selectedDivision) {
        const divisionDistricts = BdAddress.district(selectedDivision.id);
        setDistricts(divisionDistricts);
      }
    }

    // If initial data has district, load its thanas
    if (initialData.district) {
      const selectedDistrict = districts.find(d => d.bn_name === initialData.district);
      if (selectedDistrict) {
        const districtThanas = BdAddress.upazilla(selectedDistrict.id);
        setThanas(districtThanas);
      }
    }

    // If initial data has thana, load its unions
    if (initialData.thana) {
      const selectedThana = thanas.find(t => t.bn_name === initialData.thana);
      if (selectedThana) {
        const thanaUnions = bdUnions().filter((u: { upazilla_id: string }) => u.upazilla_id === selectedThana.id);
        setUnions(thanaUnions);
      }
    }
  }, [initialData, divisions, districts, thanas]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'division'
        ? { district: '', thana: '', union: '', postCode: '' }
        : {}),
      ...(name === 'district' ? { thana: '', union: '', postCode: '' } : {}),
      ...(name === 'thana' ? { union: '', postCode: '' } : {}),
      ...(name === 'union' ? { postCode: '' } : {}),
    }));

    if (name === 'division') {
      const selected = divisions.find((d) => d.bn_name === value);
      if (selected) {
        setDistricts(BdAddress.district(selected.id));
        setThanas([]);
        setUnions([]);
      }
    }

    if (name === 'district') {
      const selected = districts.find((d) => d.bn_name === value);
      if (selected) {
        setThanas(BdAddress.upazilla(selected.id));
        setUnions([]);
      }
    }

    if (name === 'thana') {
      const selected = thanas.find((t) => t.bn_name === value);
      if (selected) {
        const u = bdUnions().filter((u: { upazilla_id: string }) => u.upazilla_id === selected.id);
        setUnions(u);
      }
    }

    if (name === 'union') {
      const selectedUnion = unions.find((u) => u.bn_name === value);
      if (selectedUnion) {
        let matchedPostCode = '';

        const allPostCodes = bdPostCodes() as Record<string, PostCodeEntry>;

        for (const key in allPostCodes) {
          const entry = allPostCodes[key];
          if (entry?.bn?.suboffice?.includes(selectedUnion.bn_name)) {
            matchedPostCode = entry.bn.postcode.trim();
            break;
          }
        }

        setFormData((prev) => ({
          ...prev,
          union: value,
          postCode: matchedPostCode,
        }));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');
      formData.append('cloud_name', 'dw72swggv');
      setUploading(true);

      fetch('https://api.cloudinary.com/v1_1/dw72swggv/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.secure_url) {
            setProfileImage(data.secure_url);
            showToast('success', '✅ প্রোফাইল ছবি আপলোড হয়েছে');
          } else {
            showToast('error', '❌ ছবি আপলোড ব্যর্থ হয়েছে');
          }
        })
        .catch(() => {
          showToast('error', '❌ ছবি আপলোডে সমস্যা হয়েছে');
        })
        .finally(() => setUploading(false));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        image: profileImage,
      };

      await onSubmit(payload);
    } catch (err) {
      console.error(err);
      showToast('error', 'একটি সমস্যা হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full h-full max-w-2xl space-y-5"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isUpdate ? 'প্রোফাইল আপডেট' : 'নিবন্ধন ফর্ম'}
        </h2>

        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl">
                <FaUser />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full cursor-pointer">
              <FaCamera />
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>
          <p className="text-sm text-gray-600">প্রোফাইল ছবি আপলোড করুন</p>
        </div>

        {/* Inputs with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="পূর্ণ নাম"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="ইমেইল"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              value={formData.email}
              required
              disabled={isUpdate} // Typically email shouldn't be changed after registration
            />
          </div>

          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="phone"
              placeholder="ফোন নম্বর"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              value={formData.phone}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isUpdate && (
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="পাসওয়ার্ড"
                className="w-full border p-2 pl-10 rounded"
                onChange={handleChange}
                value={formData.password}
                required={!isUpdate}
              />
            </div>
          )}

          <div className="relative">
            <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="address"
              placeholder="বর্তমান ঠিকানা"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              value={formData.address}
              required
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">বিভাগ</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.bn_name}>
                {d.bn_name}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="border p-2 rounded"
            disabled={!formData.division}
            required
          >
            <option value="">জেলা</option>
            {districts.map((d) => (
              <option key={d.id} value={d.bn_name}>
                {d.bn_name}
              </option>
            ))}
          </select>

          <select
            name="thana"
            value={formData.thana}
            onChange={handleChange}
            className="border p-2 rounded"
            disabled={!formData.district}
            required
          >
            <option value="">থানা</option>
            {thanas.map((t) => (
              <option key={t.id} value={t.bn_name}>
                {t.bn_name}
              </option>
            ))}
          </select>
        </div>

        {/* Union and Postcode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="union"
            value={formData.union}
            onChange={handleChange}
            className="border p-2 rounded"
            disabled={!formData.thana}
            required
          >
            <option value="">ইউনিয়ন</option>
            {unions.map((u) => (
              <option key={u.id} value={u.bn_name}>
                {u.bn_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            placeholder="পোস্ট কোড"
            className="border p-2 rounded"
            onChange={handleChange}
           
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold disabled:opacity-50"
          disabled={submitting || uploading}
        >
          {submitting ? 'প্রসেসিং...' : isUpdate ? 'আপডেট করুন' : loadingText}
        </button>
      </form>
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </section>
  );
};

export default ProfileForm;