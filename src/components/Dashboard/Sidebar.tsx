/* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';

// import { FiHome, FiEdit, FiUsers, FiSettings, FiPaperclip } from 'react-icons/fi';
// import Link from 'next/link';
// import { ClipboardPen, Newspaper, UserRoundPen } from 'lucide-react';
// import { useAuthProvider } from '@/Providers/AuthProvider';
// import { FaClosedCaptioning } from 'react-icons/fa';
// import { useState } from 'react';

// const allLinks = [
//     { label: 'মূলপাতা', icon: <FiHome />, href: '/', roles: ['admin', 'editor', 'user'] },
//     { label: 'আমার প্রোফাইল', icon: <UserRoundPen />, href: '/news/dashboard/myProfile', roles: ['admin', 'editor', 'user'] },
//     { label: 'লেখা যুক্ত করুন', icon: <FiEdit />, href: '/news/dashboard/createNews', roles: ['admin', 'editor'] },
//     { label: 'ইউজার', icon: <FiUsers />, href: '/news/dashboard/allUsers', roles: ['admin'] },
//     { label: 'সেটিংস', icon: <FiSettings />, href: '#', roles: ['admin'] },
//     { label: 'ই-পেপার', icon: <FiPaperclip />, href: '/news/dashboard/epapers/list', roles: ['admin'] },
//     { label: 'খবর', icon: <Newspaper />, href: '/news/dashboard/allNews', roles: ['admin', 'editor'] },
//     { label: 'মতামত', icon: <ClipboardPen />, href: '/news/dashboard/opinion', roles: ['admin', 'user'] },
// ];

// export default function Sidebar({ isOpen }: { isOpen: boolean }) {
//     const { loading, user } = useAuthProvider();
//     const [toggle, setToggle] = useState<boolean>(true)

//     function handleToggle() {
//         setToggle(!toggle)
//     }

//     if (loading) {
//         return <div className='bg-gray-900 text-white w-64 space-y-4 px-4 py-6 
//         fixed md:sticky  md:top-0 h-screen z-50 
//         transform transition-transform duration-300'>

//             <p className="mt-4 text-lg font-medium flex justify-center items-center">লোড হচ্ছে...</p>
//         </div>
//     }

//     if (!user) return null;

//     const filteredLinks = allLinks.filter(link => link.roles.includes(user.role));

//     return (
//         <aside
//             className={`bg-gray-900 text-white w-64 space-y-4 px-4 py-6 
//         fixed md:sticky  md:top-0 h-screen z-50 
//         transform transition-transform duration-300 

//         ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
//         >

//             <div className='absolute right-1 top-0'>
//                 <FaClosedCaptioning className='text-white ' />
//             </div>

//             <h2 className="text-2xl font-bold mb-6">ড্যাশবোর্ড</h2>
//             <ul className="space-y-4">
//                 {filteredLinks.map((link) => (
//                     <li key={link.label}>
//                         <Link href={link.href} className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition">
//                             <span className="text-lg">{link.icon}</span>
//                             <span>{link.label}</span>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </aside>
//     );
// }





















'use client';

import { FiHome, FiEdit, FiUsers, FiSettings, FiPaperclip, FiUser } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { ClipboardPen, Newspaper, UserRoundPen } from 'lucide-react';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

const allLinks = [
    { label: 'মূলপাতা', icon: <FiHome size={20} />, href: '/', roles: ['admin', 'editor', 'user'] },
    { label: 'আমার প্রোফাইল', icon: <UserRoundPen size={20} />, href: '/news/dashboard/myProfile', roles: ['admin', 'editor', 'user'] },
    { label: 'লেখা যুক্ত করুন', icon: <FiEdit size={20} />, href: '/news/dashboard/createNews', roles: ['admin', 'editor'] },
    { label: 'ইউজার', icon: <FiUsers size={20} />, href: '/news/dashboard/allUsers', roles: ['admin'] },
    { label: 'সেটিংস', icon: <FiSettings size={20} />, href: '#', roles: ['admin'] },
    { label: 'ই-পেপার', icon: <FiPaperclip size={20} />, href: '/news/dashboard/epapers/list', roles: ['admin'] },
    { label: 'খবর', icon: <Newspaper size={20} />, href: '/news/dashboard/allNews', roles: ['admin', 'editor'] },
    { label: 'মতামত', icon: <ClipboardPen size={20} />, href: '/news/dashboard/opinion', roles: ['admin', 'user'] },
];

export default function Sidebar() {
    const { loading, user } = useAuthProvider();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return (
            <div className={clsx(
                'bg-indigo-900 text-white h-screen fixed md:sticky md:top-0 z-50',
                'transition-all duration-300 ease-in-out',
                isCollapsed ? 'w-20' : 'w-64'
            )}>
                <div className="flex justify-center items-center h-full">
                    <div className="animate-pulse">লোড হচ্ছে...</div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const filteredLinks = allLinks.filter(link => link.roles.includes(user.role));

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={clsx(
            'bg-indigo-900 text-white h-screen fixed md:sticky md:top-0 z-50',
            'transition-all duration-300 ease-in-out',
            'flex flex-col',
            isCollapsed ? 'w-20' : 'w-64'
        )}>
            {/* Sidebar Header */}
            <div className={clsx(
                'p-4 border-b border-indigo-800',
                'flex items-center justify-between',
                isCollapsed ? 'flex-col gap-2' : 'flex-row'
            )}>
                {!isCollapsed && (
                    <h2 className="text-xl font-bold whitespace-nowrap">ড্যাশবোর্ড</h2>
                )}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                </button>
            </div>

            {/* Sidebar Links */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2 p-2">
                    {filteredLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className={clsx(
                                    'flex items-center gap-3 hover:bg-indigo-800 p-3 rounded-lg transition',
                                    'whitespace-nowrap overflow-hidden'
                                )}
                                title={isCollapsed ? link.label : undefined}
                            >
                                <span className="flex-shrink-0">{link.icon}</span>
                                {!isCollapsed && <span>{link.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className={clsx(
                'p-4 border-t border-indigo-800',
                'flex items-center gap-3',
                isCollapsed ? 'justify-center' : 'justify-between'
            )}>
                {!isCollapsed && (
                    <div className="text-sm">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-indigo-300">{user.role}</p>
                    </div>
                )}
                <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full w-[32px] h-[32px]"
                        />
                    ) : (
                        <FiUser size={16} />
                    )}
                </div>
            </div>
        </aside>
    );
}