'use client'
import React, { useEffect, useRef, useState } from 'react';

const NavBar = () => {
    const [isDropMenu, setIsDropMenu] = useState<string | null>(null)
    const dropRefs = useRef<Record<string, HTMLLIElement | null>>({})
    console.log(dropRefs);
    console.log(isDropMenu);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <section>
            <div className='bg-black text-white flex gap-4'>
                {
                    menuItems.map(({ key, label, dropdown }) => {
                        return <>
                            <li
                                key={key}
                                className='list-none p-4 relative'
                                ref={el => {
                                    dropRefs.current[key] = el
                                }}
                                onMouseEnter={() => setIsDropMenu(key)}
                            > {label}

                                {isDropMenu === key && <div className='absolute top-[59px] bg-gray-600 w-[60px]'>
                                    <p>hello</p>
                                    <p>hello</p>
                                    <p>hello</p>
                                </div>}

                            </li>
                        </>
                    })
                }
            </div>
        </section>
    );
};


export default NavBar;






const menuItems = [
    {
        key: "pages",
        label: "Pages",
        dropdown: ''
    },
    {
        key: "contact",
        label: "Contact",
        dropdown: ''
    },
    {
        key: "about",
        label: "About",
        dropdown: ''
    },
]