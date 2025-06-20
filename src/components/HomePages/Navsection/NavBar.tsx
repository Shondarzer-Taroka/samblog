



// 'use client'
// import DropDownItems from '@/components/DropDownItems/DropDownItems';
// import React, { useEffect, useRef, useState } from 'react';

// const menuItems = [
//     { key: 'মূলপাতা', label: 'মূলপাতা' },
//     { key: 'বিষয়শ্রেণি', label: 'বিষয়শ্রেণি', dropdown: <><DropDownItems /></> },
//     { key: 'জানুন ', label: 'জানুন ', },
//     { key: 'নোটিশ', label: 'নোটিশ',  }
// ];

// const NavBar: React.FC = () => {
//     const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//     const dropdownRefs = useRef<Record<string, HTMLLIElement | null>>({});



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
//         <section className='bg-black  flex items-center'>
//             <div className='flex gap-6 p-4'>
//                 {menuItems.map(({ key, label, dropdown }) => (
//                     <li
//                         key={key}
//                         className='relative list-none text-white cursor-pointer'
//                         ref={el => {
//                             dropdownRefs.current[key] = el;
//                         }}
//                         onMouseEnter={() => setOpenDropdown(key)}
//                     >
//                         <p>{label}</p>
//                         {dropdown && openDropdown === key && (
//                             <div className=' md:w-max p-0 absolute top-10 -left-22 md:-left-7 text-black shadow rounded z-10'>
//                                 {dropdown}
//                             </div>
//                         )}
//                     </li>
//                 ))}
//             </div>
//             <div className='flex w-[77%] justify-end mr-5 md:mr-0'>
//                 <button className='text-white'>লগ ইন</button>
//             </div>
//         </section>
//     );
// };

// export default NavBar;











'use client'
import DropDownItems from '@/components/DropDownItems/DropDownItems';
import React, { useEffect, useRef, useState } from 'react';

const menuItems = [
    { key: 'মূলপাতা', label: 'মূলপাতা' },
    { key: 'বিষয়শ্রেণি', label: 'বিষয়শ্রেণি', dropdown: <><DropDownItems /></> },
    { key: 'জানুন ', label: 'জানুন ', },
    { key: 'নোটিশ', label: 'নোটিশ', }
];

const NavBar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<Record<string, HTMLLIElement | null>>({});
    const [showMenuNav, setMenuNav] = useState<boolean>(false)

    function handleChangeShowMenuNavState() {
        // console.log(dropdowns);

        setMenuNav(!showMenuNav)
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Get window dimensions
            // const windowWidth = window.innerWidth;
            // const windowHeight = window.innerHeight;

            // Get the clicked position
            const clickX = event.clientX;
            const clickY = event.clientY;

            // If the click is on the vertical or horizontal scrollbar
            const isScrollbarClick =
                clickX >= document.documentElement.clientWidth ||
                clickY >= document.documentElement.clientHeight;

            if (isScrollbarClick) return; // Don't close the dropdown if scrollbar is clicked

            const clickedInsideAny = Object.values(dropdownRefs.current).some(ref =>
                ref?.contains(event.target as Node)
            );

            if (!clickedInsideAny) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section>
            <div className='bg-black  flex items-center'>
                <div className='flex gap-6 p-4'>
                    {menuItems.map(({ key, label, dropdown }) => (
                        <li
                            key={key}
                            className='relative list-none text-white cursor-pointer'
                            ref={el => {
                                dropdownRefs.current[key] = el;
                            }}
                            onMouseEnter={() => setOpenDropdown(key)}
                            onClick={handleChangeShowMenuNavState

                            }
                        >
                            <p>{label}</p>
                            {/* {dropdown && openDropdown === key && (
                                <div className=' md:w-max p-0 absolute top-10 -left-22 md:-left-7 text-black shadow rounded z-10'>
                                    {dropdown}
                                </div>
                            )} */}
                        </li>
                    ))}
                </div>
                <div className='flex w-[77%] justify-end mr-5 md:mr-0'>
                    <button className='text-white'>লগ ইন</button>
                </div>
            </div>

            {showMenuNav && <div className=''>

                <div className=' '>
                    <DropDownItems />
                </div>

            </div>}
        </section>
    );
};

export default NavBar;