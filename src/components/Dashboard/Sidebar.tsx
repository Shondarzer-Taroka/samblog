'use client';

import { FiHome, FiEdit, FiUsers, FiSettings, FiPaperclip } from 'react-icons/fi';
import Link from 'next/link';
import { ClipboardPen, Newspaper, UserRoundPen } from 'lucide-react';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { FaClosedCaptioning } from 'react-icons/fa';
import { useState } from 'react';

const allLinks = [
    { label: 'মূলপাতা', icon: <FiHome />, href: '/', roles: ['admin', 'editor', 'user'] },
    { label: 'আমার প্রোফাইল', icon: <UserRoundPen />, href: '/news/dashboard/myProfile', roles: ['admin', 'editor', 'user'] },
    { label: 'লেখা যুক্ত করুন', icon: <FiEdit />, href: '/news/dashboard/createNews', roles: ['admin', 'editor'] },
    { label: 'ইউজার', icon: <FiUsers />, href: '/news/dashboard/allUsers', roles: ['admin'] },
    { label: 'সেটিংস', icon: <FiSettings />, href: '#', roles: ['admin'] },
    { label: 'ই-পেপার', icon: <FiPaperclip />, href: '/news/dashboard/epapers/list', roles: ['admin'] },
    { label: 'খবর', icon: <Newspaper />, href: '/news/dashboard/allNews', roles: ['admin', 'editor'] },
    { label: 'মতামত', icon: <ClipboardPen />, href: '/news/dashboard/opinion', roles: ['admin', 'user'] },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    const { loading, user } = useAuthProvider();
    const [toggle, setToggle] = useState<boolean>(true)

    function handleToggle() {
        setToggle(!toggle)
    }

    if (loading) {
        return <div className='bg-gray-900 text-white w-64 space-y-4 px-4 py-6 
        fixed md:sticky  md:top-0 h-screen z-50 
        transform transition-transform duration-300'>

            <p className="mt-4 text-lg font-medium flex justify-center items-center">লোড হচ্ছে...</p>
        </div>
    }

    if (!user) return null;

    const filteredLinks = allLinks.filter(link => link.roles.includes(user.role));

    return (
        <aside
            className={`bg-gray-900 text-white w-64 space-y-4 px-4 py-6 
        fixed md:sticky  md:top-0 h-screen z-50 
        transform transition-transform duration-300 
        
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >

            <div className='absolute right-1 top-0'>
                <FaClosedCaptioning className='text-white ' />
            </div>

            <h2 className="text-2xl font-bold mb-6">ড্যাশবোর্ড</h2>
            <ul className="space-y-4">
                {filteredLinks.map((link) => (
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
