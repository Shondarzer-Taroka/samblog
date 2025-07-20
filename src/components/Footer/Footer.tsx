'use client'
import { englishToBengali } from '@/utils/englishToBengali';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaNewspaper } from 'react-icons/fa';



const Footer = () => {
    const pathname=usePathname()
    if (pathname.startsWith('/news/dashboard')) {
    return null;
  }

  return (
    <footer className="bg-white text-gray-800 pt-12 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <FaNewspaper className="text-blue-600 text-2xl mr-2" />
              <h3 className="text-xl font-bold border-b-2 border-blue-600 pb-2">টিএন নিউজ</h3>
            </div>
            <p className="text-gray-600">
              বাংলাদেশের বিশ্বস্ত ও নির্ভরযোগ্য সংবাদ মাধ্যম। 
              আমরা দ্রুত, সঠিক ও নিরপেক্ষ সংবাদ পরিবেশন করি।
            </p>
            <div className="flex mt-4 space-x-4">
              <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition">
                <FaFacebook size={20} />
              </Link>
              <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition">
                <FaTwitter size={20} />
              </Link>
              <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition">
                <FaYoutube size={20} />
              </Link>
              <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition">
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2">
              <li><Link href={'#'} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></span>
                প্রথম পাতা
              </Link></li>
              <li><Link href={'#'} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></span>
                জাতীয়
              </Link></li>
              <li><Link href={'#'} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></span>
                আন্তর্জাতিক
              </Link></li>
              <li><Link href={'#'} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></span>
                সম্পাদকীয়
              </Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2">খবরের বিভাগ</h3>
            <ul className="space-y-2">
              <li><Link href={'#'} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></span>
                রাজনীতি
              </Link></li>
              <li><Link href={'#'} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></span>
                অর্থনীতি
              </Link></li>
              <li><Link href={'#'} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></span>
                ক্রীড়া
              </Link></li>
              <li><Link href={'#'} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></span>
                বিনোদন
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2">যোগাযোগ করুন</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">১২৩ প্রেস ক্লাব রোড, ঢাকা-১০০০, বাংলাদেশ</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-600" />
                <span className="text-gray-600">+৮৮০ ১৯১২ ৩৪৫৬৭৮</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-600" />
                <span className="text-gray-600">contact@tnnews.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-8 bg-gray-100 rounded-lg p-6">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2 text-gray-800">সর্বশেষ খবর পেতে সাবস্ক্রাইব করুন</h3>
            <p className="text-gray-600 mb-4">আপনার ইমেইলে দৈনিক হেডলাইন ও গুরুত্বপূর্ণ খবর পৌঁছে যাবে</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল ঠিকানা" 
                className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white transition shadow-md">
                সাবস্ক্রাইব
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-500">© {englishToBengali(new Date().getFullYear())} টিএন নিউজ - সর্বস্বত্ব সংরক্ষিত</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition text-sm">গোপনীয়তা নীতি</Link>
            <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition text-sm">ব্যবহারের শর্তাবলী</Link>
            <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition text-sm">আমাদের সম্পর্কে</Link>
            <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition text-sm">যোগাযোগ</Link>
            <Link href={'#'} className="text-gray-500 hover:text-blue-600 transition text-sm">আর্কাইভ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;