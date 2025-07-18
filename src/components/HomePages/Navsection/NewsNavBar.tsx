// 'use client'
// import DropDownItems from '@/components/DropDownItems/DropDownItems';
// import { useAuthProvider } from '@/Providers/AuthProvider';
// import { usePathname, useRouter } from 'next/navigation';
// import React, { useState, useEffect, useRef } from 'react';
// import { FiChevronDown, FiUser, FiLogOut, FiHome, FiBookmark, FiSettings, FiBell, FiSearch, FiMenu, FiX } from 'react-icons/fi';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';

// // Organized categories for mobile view
// const mobileCategories = {
//   'রাজনীতি ও ইস্যু': ['চরমান ইস্যু', 'রাজনীতি', 'অর্থনীতি', 'মুক্তিযুদ্ধ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
//   'ধর্ম ও সংস্কৃতি': ['ধর্ম', 'ইসলাম', 'হিন্দু', 'খ্রিস্টান', 'বৌদ্ধ', 'ইতিহাস', 'সংস্কৃতি'],
//   'সাহিত্য ও শিক্ষা': ['সাহিত্য', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'শিক্ষা', 'সমসাময়িক'],
//   'জীবনযাপন': ['রান্নাবান্না', 'স্বাস্থ্যকথা', 'প্রম', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'খেলাধুলা'],
//   'বিবিধ': ['তর্কযুদ্ধ', 'মুক্তচিন্তা', 'অপরাধ', 'শিশুত্ব', 'ছবিরূপ', 'বিবিধ']
// };

// const menuItems = [
//   { key: 'home', label: 'মূলপাতা', href: '/' },
//   {
//     key: 'categories', 
//     label: 'বিষয়শ্রেণি',
//     dropdown: [
//       ['চরমান ইস্যু', 'রাজনীতি', 'অর্থনীতি', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
//       ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
//       ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
//       ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', 'বিবিধ'],
//     ]
//   },
//   {
//     key: 'learn', 
//     label: 'জানুন',
//     dropdown: [
//       ['রাজনীতি', 'চরমান ইস্যু', 'বিবিধ', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
//       ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
//       ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
//       ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', 'অর্থনীতি'],
//     ]
//   },
//   { key: 'notice', label: 'নোটিশ', href: '/notice' },
// ];

// const NewsNavBar: React.FC = () => {
//   const [dropdownContent, setDropdownContent] = useState<string[][] | null>(null);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const profileRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const mobileMenuRef = useRef<HTMLDivElement>(null);
//   const { user, loading, logout } = useAuthProvider();
//   const router = useRouter();
//   const pathname = usePathname();

//   const toggleDropdown = (dropdown?: string[][]) => {
//     setDropdownContent(prev => (prev === dropdown ? null : dropdown || null));
//     setProfileDropdownOpen(false);
//     setSearchOpen(false);
//   };

//   const toggleProfileDropdown = () => {
//     setProfileDropdownOpen(prev => !prev);
//     setDropdownContent(null);
//     setSearchOpen(false);
//   };

//   const toggleSearch = () => {
//     setSearchOpen(prev => !prev);
//     setDropdownContent(null);
//     setProfileDropdownOpen(false);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(prev => !prev);
//     setDropdownContent(null);
//     setProfileDropdownOpen(false);
//     setSearchOpen(false);
//   };

//   const toggleMobileCategory = (category: string) => {
//     setExpandedMobileCategory(prev => prev === category ? null : category);
//   };

//   const handleMenuClick = (href?: string, dropdown?: string[][]) => {
//     if (href) {
//       setDropdownContent(null);
//       router.push(href);
//       setMobileMenuOpen(false);
//     } else {
//       toggleDropdown(dropdown);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery('');
//       setSearchOpen(false);
//       setMobileMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownContent(null);
//       }
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setProfileDropdownOpen(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setSearchOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
//         setMobileMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleNavigate = (path: string) => {
//     router.push(path);
//     setProfileDropdownOpen(false);
//     setMobileMenuOpen(false);
//   };

//   if (pathname.startsWith('/news/dashboard')) {
//     return null;
//   }

//   return (
//     <section className="relative bg-white shadow-sm">
//       <div className="container mx-auto px-4">
//         <nav className='flex items-center justify-between py-3'>
//           {/* Mobile Menu Button */}
//           <button 
//             onClick={toggleMobileMenu}
//             className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
//             aria-label="Menu"
//           >
//             {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>

//           {/* Logo/Brand - Centered on mobile */}
//           <div 
//             className="text-2xl font-bold text-gray-800 cursor-pointer mx-auto md:mx-0" 
//             onClick={() => router.push('/')}
//           >
//             আপনার<span className="text-blue-600">লোগো</span>
//           </div>

//           {/* Desktop Navigation */}
//           <ul className='hidden md:flex gap-8 items-center'>
//             {menuItems.map(({ key, label, href, dropdown }) => (
//               <li
//                 key={key}
//                 className={`relative group ${pathname === href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
//               >
//                 <div
//                   className="flex items-center cursor-pointer py-2"
//                   onClick={() => handleMenuClick(href, dropdown)}
//                 >
//                   {label}
//                   {dropdown && <FiChevronDown className="ml-1 text-sm transition-transform group-hover:rotate-180" />}
//                 </div>
//                 <div className={`absolute h-0.5 bg-blue-600 transition-all duration-300 bottom-0 left-0 ${pathname === href ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
//               </li>
//             ))}
//           </ul>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-4">
//             {/* Search Button */}
//             <div className="relative" ref={searchRef}>
//               <button 
//                 onClick={toggleSearch}
//                 className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
//                 aria-label="Search"
//               >
//                 <FiSearch size={20} />
//               </button>
              
//               <AnimatePresence>
//                 {searchOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 top-full mt-2 w-72 bg-white rounded-md shadow-lg z-50 p-2"
//                   >
//                     <form onSubmit={handleSearch} className="flex">
//                       <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="খোঁজ করুন..."
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoFocus
//                       />
//                       <button 
//                         type="submit"
//                         className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
//                       >
//                         <FiSearch size={18} />
//                       </button>
//                     </form>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {loading ? (
//               <div className="animate-pulse flex items-center gap-2">
//                 <div className="h-8 w-8 rounded-full bg-gray-200"></div>
//               </div>
//             ) : user?.email ? (
//               <>
//                 <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative">
//                   <FiBell size={20} />
//                   <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
//                 </button>

//                 <div ref={profileRef} className="relative">
//                   <div 
//                     className="flex items-center gap-2 cursor-pointer"
//                     onClick={toggleProfileDropdown}
//                   >
//                     {user.image ? (
//                       <Image 
//                         src={user.image} 
//                         alt={user.name || 'Profile'} 
//                         width={36} 
//                         height={36} 
//                         className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors"
//                       />
//                     ) : (
//                       <div className="w-9 h-9 rounded-full bg-gray-100 border-2 border-gray-200 hover:border-blue-500 transition-colors flex items-center justify-center text-gray-700 font-bold">
//                         {user.name?.charAt(0) || 'U'}
//                       </div>
//                     )}
//                     <FiChevronDown className={`text-gray-500 transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} />
//                   </div>

//                   <AnimatePresence>
//                     {profileDropdownOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100"
//                       >
//                         <div className="px-4 py-3 border-b">
//                           <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                           <p className="text-xs text-gray-500 truncate">{user.email}</p>
//                         </div>
//                         <button 
//                           onClick={() => handleNavigate('/dashboard')}
//                           className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <FiUser className="mr-3 text-gray-500" />
//                           ড্যাশবোর্ড
//                         </button>
//                         <button 
//                           onClick={() => handleNavigate('/profile')}
//                           className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <FiSettings className="mr-3 text-gray-500" />
//                           প্রোফাইল সেটিংস
//                         </button>
//                         <button 
//                           onClick={logout}
//                           className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <FiLogOut className="mr-3 text-gray-500" />
//                           লগ আউট
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </>
//             ) : (
//               <button 
//                 onClick={() => router.push('/login')}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
//               >
//                 <FiUser className="mr-2" />
//                 লগ ইন
//               </button>
//             )}
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               ref={mobileMenuRef}
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden overflow-hidden absolute top-full left-0 w-full bg-white shadow-lg z-50 border-t border-gray-200"
//             >
//               <div className="container mx-auto px-4 py-3">
//                 {/* Mobile Search */}
//                 <form onSubmit={handleSearch} className="mb-4 flex">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="খোঁজ করুন..."
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   />
//                   <button 
//                     type="submit"
//                     className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
//                   >
//                     <FiSearch size={18} />
//                   </button>
//                 </form>

//                 {/* Mobile Menu Items */}
//                 <ul className="space-y-2">
//                   {menuItems.filter(item => item.key !== 'categories').map(({ key, label, href }) => (
//                     <li key={key}>
//                       <button
//                         onClick={() => handleMenuClick(href)}
//                         className={`w-full text-left px-3 py-2 rounded-md ${pathname === href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//                       >
//                         {label}
//                       </button>
//                     </li>
//                   ))}

//                   {/* Mobile Categories */}
//                   {Object.entries(mobileCategories).map(([category, items]) => (
//                     <div key={category} className="border-b border-gray-100 last:border-0">
//                       <button
//                         onClick={() => toggleMobileCategory(category)}
//                         className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${expandedMobileCategory === category ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//                       >
//                         {category}
//                         <FiChevronDown className={`transition-transform ${expandedMobileCategory === category ? 'transform rotate-180' : ''}`} />
//                       </button>
//                       <AnimatePresence>
//                         {expandedMobileCategory === category && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.2 }}
//                             className="pl-4 overflow-hidden"
//                           >
//                             <div className="py-2 grid grid-cols-2 gap-2">
//                               {items.map(item => (
//                                 <button
//                                   key={item}
//                                   onClick={() => {
//                                     router.push(`/category/${item}`);
//                                     setMobileMenuOpen(false);
//                                   }}
//                                   className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-left"
//                                 >
//                                   {item}
//                                 </button>
//                               ))}
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   ))}

//                   {/* Mobile Auth Buttons - Same as desktop */}
//                   {user?.email ? (
//                     <>
//                       <button 
//                         onClick={() => handleNavigate('/dashboard')}
//                         className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
//                       >
//                         <FiUser className="mr-3 text-gray-500" />
//                         ড্যাশবোর্ড
//                       </button>
//                       <button 
//                         onClick={logout}
//                         className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
//                       >
//                         <FiLogOut className="mr-3 text-gray-500" />
//                         লগ আউট
//                       </button>
//                     </>
//                   ) : (
//                     <button 
//                       onClick={() => router.push('/login')}
//                       className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
//                     >
//                       <FiUser className="mr-3 text-gray-500" />
//                       লগ ইন
//                     </button>
//                   )}
//                 </ul>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Category Dropdown */}
//       <AnimatePresence>
//         {dropdownContent && (
//           <motion.div
//             ref={dropdownRef}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="relative z-40 bg-white shadow-lg hidden md:block"
//           >
//             <div className="container mx-auto px-4">
//               <DropDownItems categories={dropdownContent} />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default NewsNavBar;

























'use client'
import DropDownItems from '@/components/DropDownItems/DropDownItems';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiUser, FiLogOut, FiHome, FiBookmark, FiSettings, FiBell, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Organized categories for mobile view
const mobileCategories = {
  'রাজনীতি ও ইস্যু': ['চরমান ইস্যু', 'রাজনীতি', 'অর্থনীতি', 'মুক্তিযুদ্ধ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
  'ধর্ম ও সংস্কৃতি': ['ধর্ম', 'ইসলাম', 'হিন্দু', 'খ্রিস্টান', 'বৌদ্ধ', 'ইতিহাস', 'সংস্কৃতি'],
  'সাহিত্য ও শিক্ষা': ['সাহিত্য', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'শিক্ষা', 'সমসাময়িক'],
  'জীবনযাপন': ['রান্নাবান্না', 'স্বাস্থ্যকথা', 'প্রম', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'খেলাধুলা'],
  'বিবিধ': ['তর্কযুদ্ধ', 'মুক্তচিন্তা', 'অপরাধ', 'শিশুত্ব', 'ছবিরূপ', 'বিবিধ']
};

const menuItems = [
  { key: 'home', label: 'মূলপাতা', href: '/' },
  {
    key: 'categories', 
    label: 'বিষয়শ্রেণি',
    dropdown: [
      ['চরমান ইস্যু', 'রাজনীতি', 'অর্থনীতি', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
      ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
      ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
      ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', 'বিবিধ'],
    ]
  },
  {
    key: 'learn', 
    label: 'জানুন',
    dropdown: [
      ['রাজনীতি', 'চরমান ইস্যু', 'বিবিধ', 'ধর্ম', 'ইসলাম', 'ইতিহাস', 'সংস্কৃতি', 'সাহিত্য'],
      ['বিজ্ঞান', 'গল্প', 'কবিতা', 'উপন্যাস', 'বুক রিভিউ', 'ছবিরূপ', 'বাংলাদেশ', 'আন্তর্জাতিক'],
      ['শিক্ষা', 'সমসাময়িক', 'তর্কযুদ্ধ', 'মুক্তচিন্তা', 'খেলাধুলা', 'মুক্তিযুদ্ধ', 'অপরাধ', 'শিশুত্ব'],
      ['প্রম', 'রান্নাবান্না', 'তথ্যপ্রযুক্তি', 'ব্যবস্থা', 'স্বাস্থ্যকথা', 'অর্থনীতি'],
    ]
  },
  { key: 'notice', label: 'নোটিশ', href: '/notice' },
];

const NewsNavBar: React.FC = () => {
  const [dropdownContent, setDropdownContent] = useState<string[][] | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { user, loading, logout } = useAuthProvider();
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (dropdown?: string[][]) => {
    setDropdownContent(prev => (prev === dropdown ? null : dropdown || null));
    setProfileDropdownOpen(false);
    setSearchOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(prev => !prev);
    setDropdownContent(null);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
    setDropdownContent(null);
    setProfileDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
    setDropdownContent(null);
    setProfileDropdownOpen(false);
    setSearchOpen(false);
  };

  const toggleMobileCategory = (category: string) => {
    setExpandedMobileCategory(prev => prev === category ? null : category);
  };

  const handleMenuClick = (href?: string, dropdown?: string[][]) => {
    if (href) {
      setDropdownContent(null);
      router.push(href);
      setMobileMenuOpen(false);
    } else {
      toggleDropdown(dropdown);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownContent(null);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  if (pathname.startsWith('/news/dashboard')) {
    return null;
  }

  return (
    <motion.section 
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <nav className='flex items-center justify-between py-3'>
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo/Brand - Centered on mobile */}
          <div 
            className="text-2xl font-bold text-gray-800 cursor-pointer mx-auto md:mx-0" 
            onClick={() => router.push('/')}
          >
            আপনার<span className="text-blue-600">লোগো</span>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex gap-8 items-center'>
            {menuItems.map(({ key, label, href, dropdown }) => (
              <li
                key={key}
                className={`relative group ${pathname === href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                <div
                  className="flex items-center cursor-pointer py-2"
                  onClick={() => handleMenuClick(href, dropdown)}
                >
                  {label}
                  {dropdown && <FiChevronDown className="ml-1 text-sm transition-transform group-hover:rotate-180" />}
                </div>
                <div className={`absolute h-0.5 bg-blue-600 transition-all duration-300 bottom-0 left-0 ${pathname === href ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={toggleSearch}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
              
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-md shadow-lg z-50 p-2"
                  >
                    <form onSubmit={handleSearch} className="flex">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="খোঁজ করুন..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                      >
                        <FiSearch size={18} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {loading ? (
              <div className="animate-pulse flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              </div>
            ) : user?.email ? (
              <>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative">
                  <FiBell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                <div ref={profileRef} className="relative">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={toggleProfileDropdown}
                  >
                    {user.image ? (
                      <Image 
                        src={user.image} 
                        alt={user.name || 'Profile'} 
                        width={36} 
                        height={36} 
                        className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-100 border-2 border-gray-200 hover:border-blue-500 transition-colors flex items-center justify-center text-gray-700 font-bold">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <FiChevronDown className={`text-gray-500 transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100"
                      >
                        <div className="px-4 py-3 border-b">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <button 
                          onClick={() => handleNavigate('/dashboard')}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiUser className="mr-3 text-gray-500" />
                          ড্যাশবোর্ড
                        </button>
                        <button 
                          onClick={() => handleNavigate('/profile')}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiSettings className="mr-3 text-gray-500" />
                          প্রোফাইল সেটিংস
                        </button>
                        <button 
                          onClick={logout}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiLogOut className="mr-3 text-gray-500" />
                          লগ আউট
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <button 
                onClick={() => router.push('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
              >
                <FiUser className="mr-2" />
                লগ ইন
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white shadow-lg z-50 border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-3">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4 flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="খোঁজ করুন..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button 
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                  >
                    <FiSearch size={18} />
                  </button>
                </form>

                {/* Mobile Menu Items */}
                <ul className="space-y-2">
                  {menuItems.filter(item => item.key !== 'categories').map(({ key, label, href }) => (
                    <li key={key}>
                      <button
                        onClick={() => handleMenuClick(href)}
                        className={`w-full text-left px-3 py-2 rounded-md ${pathname === href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}

                  {/* Mobile Categories */}
                  {Object.entries(mobileCategories).map(([category, items]) => (
                    <div key={category} className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => toggleMobileCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${expandedMobileCategory === category ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {category}
                        <FiChevronDown className={`transition-transform ${expandedMobileCategory === category ? 'transform rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {expandedMobileCategory === category && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 overflow-hidden"
                          >
                            <div className="py-2 grid grid-cols-2 gap-2">
                              {items.map(item => (
                                <button
                                  key={item}
                                  onClick={() => {
                                    router.push(`/category/${item}`);
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-left"
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Mobile Auth Buttons - Same as desktop */}
                  {user?.email ? (
                    <>
                      <button 
                        onClick={() => handleNavigate('/dashboard')}
                        className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiUser className="mr-3 text-gray-500" />
                        ড্যাশবোর্ড
                      </button>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiLogOut className="mr-3 text-gray-500" />
                        লগ আউট
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => router.push('/login')}
                      className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FiUser className="mr-3 text-gray-500" />
                      লগ ইন
                    </button>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category Dropdown */}
      <AnimatePresence>
        {dropdownContent && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-40 bg-white shadow-lg hidden md:block"
          >
            <div className="container mx-auto px-4">
              <DropDownItems categories={dropdownContent} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default NewsNavBar;