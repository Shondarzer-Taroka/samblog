/* eslint-disable @typescript-eslint/no-unused-vars */
// // app/news/dashboard/layout.tsx
'use client';

import Sidebar from '@/components/Dashboard/Sidebar';
import Topbar from '@/components/Dashboard/Topbar';
import AuthMiddleware from '@/middleware/AuthMiddleware';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthProvider();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
    const router=useRouter()
  console.log(pathname);
  

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(()=>{
    if (pathname.startsWith('/news/dashboard')) {
      
      document.getElementById('mainSection')?.classList.remove('mt-[60px]')
    }
  },[])


//   useEffect(() => {
//   if (!loading && user?.role !== 'admin') {
//     router.push('/news/dashboard/myProfile');
//   }
// }, [loading, user]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }


  
 
  return (
    <AuthMiddleware>
      {user?.email && (
        <div className="flex min-h-screen bg-gray-50 ">
          <Sidebar />
          
          <div className={clsx(
            "flex-1 flex flex-col",
            "transition-all duration-300 ease-in-out",
            "mr-1 lg:ml-0 " // Match sidebar widths
          )}>
            <Topbar toggleSidebar={toggleSidebar} />
            
            <main className="flex-1 p-4 md:p-6 bg-gray-50 w-[90%] ml-auto md:w-full overflow-x-scroll">
              {children}
            </main>
          </div>
        </div>
      )}
    </AuthMiddleware>
  );
}

