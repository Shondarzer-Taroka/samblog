// 'use client'
// import DropDownItems from '@/components/DropDownItems/DropDownItems';
// import React, { useEffect, useRef, useState } from 'react';

// const menuItems = [
//     { key: 'মূলপাতা', label: 'মূলপাতা' },
//     {
//         key: 'বিষয়শ্রেণি', label: 'বিষয়শ্রেণি', dropdown:
//             [
//                 ['চরমান ইস্যু', 'রাজনীতি', 'অর্থনীতি', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
//                 ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
//                 ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
//                 ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', 'বিবিধ'],
//             ]
//     },
//     {
//         key: 'জানুন ', label: 'জানুন ', dropdown:
//             [
//                 ['রাজনীতি', 'চরমান ইস্যু', 'বিবিধ', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
//                 ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
//                 ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
//                 ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', ' অর্থনীতি'],
//             ]
//     },
//     { key: 'নোটিশ', label: 'নোটিশ', }
// ];

// const NavBar: React.FC = () => {
//     const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//     const dropdownRefs = useRef<Record<string, HTMLLIElement | null>>({});
//     const [showMenuNav, setMenuNav] = useState<boolean>(false)


//     const [containerMenues, setContainerMenues] = useState<string[][] | undefined>()
//     function handleChangeShowMenuNavState(menuItems: string[][] | undefined) {
//         // console.log(dropdowns);
//         setContainerMenues(menuItems)
//         setMenuNav(!showMenuNav)
//     }





//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             // Get window dimensions
//             // const windowWidth = window.innerWidth;
//             // const windowHeight = window.innerHeight;

//             // Get the clicked position
//             const clickX = event.clientX;
//             const clickY = event.clientY;

//             // If the click is on the vertical or horizontal scrollbar
//             const isScrollbarClick =
//                 clickX >= document.documentElement.clientWidth ||
//                 clickY >= document.documentElement.clientHeight;

//             if (isScrollbarClick) return; // Don't close the dropdown if scrollbar is clicked

//             const clickedInsideAny = Object.values(dropdownRefs.current).some(ref =>
//                 ref?.contains(event.target as Node)
//             );

//             if (!clickedInsideAny) {
//                 setOpenDropdown(null);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     return (
//         <section>
//             <div className='bg-black  flex items-center'>
//                 <div className='flex gap-6 p-4'>
//                     {menuItems.map(({ key, label, dropdown }) => (
//                         <li
//                             key={key}
//                             className='relative list-none text-white cursor-pointer'
//                             ref={el => {
//                                 dropdownRefs.current[key] = el;
//                             }}
//                             onMouseEnter={() => setOpenDropdown(key)}
//                             onClick={() => handleChangeShowMenuNavState(dropdown)

//                             }
//                         >
//                             <p>{label}</p>

//                         </li>
//                     ))}
//                 </div>
//                 <div className='flex w-[77%] justify-end mr-5 md:mr-0'>
//                     <button className='text-white'>লগ ইন</button>
//                 </div>
//             </div>

//             {showMenuNav && <div className='relative'>

//                 <div className='absolute top-0 left-0 w-full z-40'>
//                     <DropDownItems categories={containerMenues} />
//                 </div>

//             </div>}
//         </section>
//     );
// };

// export default NavBar;













'use client'
import DropDownItems from '@/components/DropDownItems/DropDownItems';
import React, { useState, useEffect, useRef } from 'react';

const menuItems = [
  { key: 'মূলপাতা', label: 'মূলপাতা' },
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
        <button className='text-white'>লগ ইন</button>
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











