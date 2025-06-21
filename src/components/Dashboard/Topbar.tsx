import { FiMenu, FiX, FiUser } from 'react-icons/fi';

export default function Topbar({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button className="text-2xl md:hidden" onClick={toggleSidebar}>
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1 className="text-xl font-semibold">স্বাগতম, অ্যাডমিন!</h1>
      </div>
      <button className="flex items-center gap-2 bg-black text-white px-4 py-1 rounded">
        <FiUser />
        প্রোফাইল
      </button>
    </div>
  );
}
