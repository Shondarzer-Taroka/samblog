



'use client'
import DropDownItems from '@/components/DropDownItems/DropDownItems';
import React, { useEffect, useRef, useState } from 'react';

const menuItems = [
    { key: 'মূলপাতা', label: 'মূলপাতা' },
    { key: 'বিষয়শ্রেণি', label: 'বিষয়শ্রেণি', dropdown: <><DropDownItems /></> },
    { key: 'জানুন ', label: 'জানুন ', dropdown: <><p>জানুন </p><p>জানুন </p></> },
    { key: 'নোটিশ', label: 'নোটিশ', dropdown: <><p>নোটিশ</p><p>নোটিশ</p></> }
];

const NavBar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<Record<string, HTMLLIElement | null>>({});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // console.log('values',Object.values(dropdownRefs.current));

            const clickedInsideAny = Object.values(dropdownRefs.current).some(ref =>

                ref?.contains(event.target as Node)
            );
            // console.log(clickedInsideAny);

            if (!clickedInsideAny) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section className='bg-black  flex items-center'>
            <div className='flex gap-6 p-4'>
                {menuItems.map(({ key, label, dropdown }) => (
                    <li
                        key={key}
                        className='relative list-none text-white cursor-pointer'
                        ref={el => {
                            dropdownRefs.current[key] = el;
                        }}
                        onMouseEnter={() => setOpenDropdown(key)}
                    >
                        <p>{label}</p>
                        {dropdown && openDropdown === key && (
                            <div className='bg-gray-200 w-max p-3 absolute top-10 -left-9 text-black shadow rounded z-10'>
                                {dropdown}
                            </div>
                        )}
                    </li>
                ))}
            </div>
            <div className='flex w-[77%] justify-end'>
                <button className='text-white'>লগ ইন</button>
            </div>
        </section>
    );
};

export default NavBar;
