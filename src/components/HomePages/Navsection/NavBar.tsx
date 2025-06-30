





'use client'
import DropDownItems from '@/components/DropDownItems/DropDownItems';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

const menuItems = [
  { key: 'মূলপাতা', label: 'মূলপাতা', href:'/' },
  {
    key: 'বিষয়শ্রেণি', label: 'বিষয়শ্রেণি', dropdown: [
      ['চরমান ইস্যু', 'রাজনীতি', 'অর্থনীতি', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
      ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
      ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
      ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', 'বিবিধ'],
    ]
  },
  {
    key: 'জানুন', label: 'জানুন', dropdown: [
      ['রাজনীতি', 'চরমান ইস্যু', 'বিবিধ', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
      ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
      ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
      ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', 'অর্থনীতি'],
    ]
  },
  { key: 'নোটিশ', label: 'নোটিশ' },
];

const NavBar: React.FC = () => {
  const [dropdownContent, setDropdownContent] = useState<string[][] | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, loading, logout } = useAuthProvider()
  const router = useRouter()
  const pathname = usePathname()

  const toggleDropdown = (dropdown?: string[][]) => {
    setDropdownContent(prev => (prev === dropdown ? null : dropdown || null));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownContent(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  function handleNavigateLogInPage() {
    router.push('/login')
  }

  if (pathname.startsWith('/news/dashboard')) {
    return
  }

  return (
    <section>
      <nav className='bg-black flex items-center justify-between p-4'>
        <ul className='flex gap-6'>
          {menuItems.map(({ key, label, dropdown }) => (
            <li
              key={key}
              className='list-none text-white cursor-pointer relative'
              onClick={() => toggleDropdown(dropdown)}
            >
              {label}
            </li>
          ))}
        </ul>

        {loading ? <h1 className='text-white'>লোড হচ্ছে...</h1> : user?.email ? <button onClick={logout} className='text-white cursor-pointer'>লগ আউট</button> : <button onClick={handleNavigateLogInPage} className='text-white cursor-pointer'>লগ ইন</button>}
      </nav>

      {dropdownContent && (
        <div ref={dropdownRef} className='relative z-40'>
          <div className='absolute top-0 left-0 w-full'>
            <DropDownItems categories={dropdownContent} />
          </div>
        </div>
      )}
    </section>
  );
};

export default NavBar;











