'use client';
import { FiHome, FiEdit, FiUsers, FiSettings, FiPaperclip } from 'react-icons/fi';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';

const links = [
    { label: 'মূলপাতা', icon: <FiHome />, href: '/' },
    { label: 'লেখা যুক্ত করুন', icon: <FiEdit />, href: '/news/dashboard/createNews' },
    { label: 'ইউজার', icon: <FiUsers />, href: '/news/dashboard/allUsers' },
    { label: 'সেটিংস', icon: <FiSettings />, href: '#' },
    { label: 'ই-পেপার', icon: <FiPaperclip />, href: '/news/dashboard/epapers/list' },
    { label: 'খবর', icon: <Newspaper />, href: '/news/dashboard/allNews' },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    return (
        <aside
            //   className={`bg-gray-900 text-white w-64 space-y-4 px-4 py-6 fixed md:sticky top-0 left-0 z-50 transform transition-transform duration-300 ${
            //     isOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-full'
            //   } md:translate-x-0`}

            className={`bg-gray-900 text-white w-64 space-y-4 px-4 py-6 
        fixed md:sticky  md:top-0 h-screen z-50 
        transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
            <h2 className="text-2xl font-bold mb-6">ড্যাশবোর্ড</h2>
            <ul className="space-y-4">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition">
                            <span className="text-lg">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
