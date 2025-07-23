// 'use client'
// import { NewsItem } from "@/types/news.types";
// import { getBookmarks } from "@/utils/bookmark.utils";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const BookmarkSidebar = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
//   const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);

//   useEffect(() => {
//     if (show) {
//       setBookmarks(getBookmarks());
//     }
//   }, [show]);

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 p-4 overflow-y-auto ${
//         show ? 'translate-x-0' : 'translate-x-full'
//       }`}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-bold">বুকমার্ক</h2>
//         <button onClick={onClose} className="text-red-500 font-bold text-lg">×</button>
//       </div>
//       {bookmarks.length === 0 ? (
//         <p className="text-gray-500">কোনো বুকমার্ক পাওয়া যায়নি।</p>
//       ) : (
//         <ul className="space-y-3">
//           {bookmarks.map((item) => (
//             <li key={item.id}>
//               <Link
//                 href={`/news/${item.category}/${item.id}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 {item.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default BookmarkSidebar;










'use client';
import { NewsItem } from "@/types/news.types";
import { getBookmarks, removeBookmark } from "@/utils/bookmark.utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';

const BookmarkSidebar = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);

  // Load bookmarks when sidebar opens
  useEffect(() => {
    if (show) {
      setBookmarks(getBookmarks());
    }
  }, [show]);

  // Remove and update list
  const handleRemove = (id: string) => {
    removeBookmark(id);
    setBookmarks(getBookmarks());
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 p-4 overflow-y-auto ${
        show ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">বুকমার্ক</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-lg">×</button>
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">কোনো বুকমার্ক পাওয়া যায়নি।</p>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-1">
              <Link
                href={`/news/${item.category}/${item.id}`}
                className="text-blue-600 hover:underline w-[85%] truncate"
              >
                {item.title}
              </Link>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700"
                title="Remove"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkSidebar;
