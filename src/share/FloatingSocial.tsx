'use client'
import React, { useEffect, useState } from 'react';

const FloatingSocial = () => {
      const [showSocialIcons, setShowSocialIcons] = useState(true);
        const [lastScrollY, setLastScrollY] = useState(0);
    
        useEffect(() => {
            const handleScroll = () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    setShowSocialIcons(false);
                } else {
                    // Scrolling up
                    setShowSocialIcons(true);
                }
                
                setLastScrollY(currentScrollY);
            };
    
            // Only add event listener on client-side
            if (typeof window !== 'undefined') {
                window.addEventListener('scroll', handleScroll, { passive: true });
                return () => window.removeEventListener('scroll', handleScroll);
            }
        }, [lastScrollY]);
    
    return (
        <div>
            <div className={`hidden lg:flex flex-col space-y-3 fixed left-4 top-1/2 transform -translate-y-1/2 z-30 transition-all duration-300 ${showSocialIcons ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <span className="sr-only">Facebook</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                        </svg>
                    </button>
                    <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                    </button>
                    <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                        <span className="sr-only">YouTube</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                    </button>
                </div>  
        </div>
    );
};

export default FloatingSocial;