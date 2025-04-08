// 'use client'
// import React, { useEffect, useRef, useState } from 'react';

// const NavBar = () => {
//     const [isDropMenu, setIsDropMenu] = useState<string | null>(null)
//     const dropRefs = useRef<Record<string, HTMLLIElement | null>>({})
//     console.log(dropRefs);
//     console.log(isDropMenu);


//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside)
//         }
//     }, [])

//     return (
//         <section>
//             <div className='bg-black text-white flex gap-4'>
//                 {
//                     menuItems.map(({ key, label, dropdown }) => {
//                         return <>
//                             <li
//                                 key={key}
//                                 className='list-none p-4 relative'
//                                 ref={el => {
//                                     dropRefs.current[key] = el
//                                 }}
//                                 onMouseEnter={() => setIsDropMenu(key)}
//                             > {label}

//                                 {isDropMenu === key && <div className='absolute top-[59px] bg-gray-600 w-[60px]'>
//                                     <p>hello</p>
//                                     <p>hello</p>
//                                     <p>hello</p>
//                                 </div>}

//                             </li>
//                         </>
//                     })
//                 }
//             </div>
//         </section>
//     );
// };


// export default NavBar;






// const menuItems = [
//     {
//         key: "pages",
//         label: "Pages",
//         dropdown: ''
//     },
//     {
//         key: "contact",
//         label: "Contact",
//         dropdown: ''
//     },
//     {
//         key: "about",
//         label: "About",
//         dropdown: ''
//     },
// ]














'use client'
import DropDownItems from '@/components/DropDownItems/DropDownItems';
import React, { useEffect, useRef, useState } from 'react';
// import { ServicesItems } from './ServicesItems'; // Assume this is a reusable dropdown component

const menuItems = [
    { key: 'মূলপাতা', label: 'মূলপাতা' },
    { key: 'বিষয়শ্রেণি', label: 'বিষয়শ্রেণি', dropdown: <><DropDownItems/></> },
    // { key: 'services', label: 'Services', dropdown: <ServicesItems /> },
    { key: 'about', label: 'About', dropdown: <><p>Team</p><p>Company</p></> },
    { key: 'contact', label: 'Contact', dropdown: <><p>Email</p><p>Phone</p></> }
];

const HoverPr4: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<Record<string, HTMLLIElement | null>>({});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            console.log('values',Object.values(dropdownRefs.current));

            const clickedInsideAny = Object.values(dropdownRefs.current).some(ref =>

                ref?.contains(event.target as Node)
            );
            console.log(clickedInsideAny);

            if (!clickedInsideAny) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='bg-black flex gap-6 p-4'>
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
                    { dropdown && openDropdown === key && (
                        <div className='bg-gray-200 w-max p-3 absolute top-10 -left-9 text-black shadow rounded z-10'>
                            {dropdown}
                        </div>
                    )}
                </li>
            ))}
        </div>
    );
};

export default HoverPr4;
