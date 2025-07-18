
// import { useAuthProvider } from '@/Providers/AuthProvider';
// import Image from 'next/image';
// import { FiMenu, FiX, FiUser } from 'react-icons/fi';

// export default function Topbar({
//   toggleSidebar,
//   isSidebarOpen,
// }: {
//   toggleSidebar: () => void;
//   isSidebarOpen: boolean;
// }) {

//   const { user, loading } = useAuthProvider()
//   console.log(user);

//   // if (loading) {
//   //   return <h1>loading</h1>
//   // }

//   return (
//     <div className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-30">
//       <div className="flex items-center gap-4">
//         <button className="text-2xl md:hidden" onClick={toggleSidebar}>
//           {isSidebarOpen ? <FiX /> : <FiMenu />}
//         </button>
//         <h1 className="text-xl font-semibold">স্বাগতম, {user?.role ==='user' && 'ইউজার' || user?.role ==='admin' && "অ্যাডমিন!"}</h1>
//       </div>
//       {loading ? <h1>loading...</h1> : <button className="flex items-center gap-2 bg-black text-white px-4 py-1 rounded">
//         {<> { user?.image ? <Image alt='profile' src={user?.image} width={30} height={30} className='rounded-full w-[30px] h-[30px]' />: <FiUser />} </> }

//         {user?.name || 'প্রোফাইল'}
//       </button>}
//     </div>
//   );
// }



















'use client';

import { useAuthProvider } from '@/Providers/AuthProvider';
import Image from 'next/image';
import {  FiUser } from 'react-icons/fi';
import clsx from 'clsx';

export default function Topbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { user, loading } = useAuthProvider();

  return (
    <div className={clsx(
      "bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-40",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="flex items-center gap-4">
        <button 
          className="text-2xl md:hidden text-gray-700 hover:text-indigo-600 transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {/* <FiMenu /> */}
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-2.5 md:ml-0">
          {user?.role === 'user' ? 'স্বাগতম ইউজার!' : 
           user?.role === 'admin' ? 'স্বাগতম অ্যাডমিন!' : 
           'ড্যাশবোর্ড'}
        </h1>
      </div>
      
      {loading ? (
        <div className="animate-pulse bg-gray-200 rounded-full w-32 h-8"></div>
      ) : (
        <button className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
        )}>
          {user?.image ? (
            <Image 
              alt='profile' 
              src={user.image} 
              width={30} 
              height={30} 
              className='rounded-full w-7 h-7 object-cover'
            />
          ) : (
            <FiUser className="text-indigo-600" />
          )}
          <span className="hidden md:inline-block font-medium">
            {user?.name || 'প্রোফাইল'}
          </span>
        </button>
      )}
    </div>
  );
}