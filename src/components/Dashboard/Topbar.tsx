
import { useAuthProvider } from '@/Providers/AuthProvider';
import Image from 'next/image';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

export default function Topbar({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {

  const { user, loading } = useAuthProvider()
  console.log(user);

  // if (loading) {
  //   return <h1>loading</h1>
  // }

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button className="text-2xl md:hidden" onClick={toggleSidebar}>
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1 className="text-xl font-semibold">স্বাগতম, {user?.role ==='user' && 'ইউজার' || user?.role ==='admin' && "অ্যাডমিন!"}</h1>
      </div>
      {loading ? <h1>loading...</h1> : <button className="flex items-center gap-2 bg-black text-white px-4 py-1 rounded">
        {<> { user?.image ? <Image alt='profile' src={user?.image} width={30} height={30} className='rounded-full w-[30px] h-[30px]' />: <FiUser />} </> }

        {user?.name || 'প্রোফাইল'}
      </button>}
    </div>
  );
}
