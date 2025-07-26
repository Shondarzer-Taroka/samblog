/* eslint-disable @typescript-eslint/no-unused-vars */


'use client';

import { FiHome, FiEdit, FiUsers, FiSettings, FiPaperclip, FiUser } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { BookOpenCheck, ClipboardPen, Newspaper, UserRoundPen } from 'lucide-react';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { FaSquarePollVertical } from 'react-icons/fa6';

const allLinks = [
    { label: 'মূলপাতা', icon: <FiHome size={20} />, href: '/', roles: ['admin', 'editor', 'user'] },
    { label: 'আমার প্রোফাইল', icon: <UserRoundPen size={20} />, href: '/news/dashboard/myProfile', roles: ['admin', 'editor', 'user'] },
    { label: 'লেখা যুক্ত করুন', icon: <FiEdit size={20} />, href: '/news/dashboard/createNews', roles: ['admin', 'editor'] },
    { label: 'ইউজার', icon: <FiUsers size={20} />, href: '/news/dashboard/allUsers', roles: ['admin'] },
    { label: 'অনলাইন ভোট যুক্ত করুন', icon: <FaSquarePollVertical size={20} />, href: '/news/dashboard/createPoll', roles: ['admin'] },
    { label: 'সেটিংস', icon: <FiSettings size={20} />, href: '#', roles: ['admin'] },
    { label: 'ই-পেপার', icon: <FiPaperclip size={20} />, href: '/news/dashboard/epapers/list', roles: ['admin'] },
    { label: 'খবর', icon: <Newspaper size={20} />, href: '/news/dashboard/allNews', roles: ['admin', 'editor'] },
    { label: 'মতামত যুক্ত করুন', icon: <ClipboardPen size={20} />, href: '/news/dashboard/createOpinion', roles: ['admin', 'user'] },
    { label: 'মতামত সমূহ', icon: <BookOpenCheck size={20} />, href: '/news/dashboard/opinions', roles: ['admin'] },
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
            isCollapsed ? 'w-[45px] md:w-20' : 'w-64'
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
            <nav className="flex-1 overflow-y-auto custom-scrollbar">
                <ul className="space-y-2 md:p-2">
                    {filteredLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className={clsx(
                                    'flex items-center gap-3 hover:bg-indigo-800 p-2 md:p-3 rounded-lg transition',
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
                'p-1 md:p-4 border-t border-indigo-800',
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