// /* eslint-disable react-hooks/exhaustive-deps */
// 'use client';
// import { useAlert } from "@/hooks/useAlert";
// import { deleteNews, fetchNews } from "@/lib/api/news.api";
// import { CATEGORIES, NewsItem, SUB_CATEGORIES } from "@/types/news.types";
// import { stripHtmlAndLimit } from "@/utils/stripAndLimitHtml";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const AllNews = () => {
//   const router = useRouter();
//   const { showAlert, AlertDialog } = useAlert();
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSubCategory, setSelectedSubCategory] = useState('');

//   const itemsPerPage = 10;

//   useEffect(() => {
//     const loadNews = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchNews({
//           page: currentPage,
//           limit: itemsPerPage,
//           search: searchTerm,
//           category: selectedCategory,
//           subCategory: selectedSubCategory,
//         });
//         setNews(data.data);
//         setTotalPages(data.pagination.totalPages);
//       } catch (error) {
//         console.error('Failed to load news:', error);
//         showAlert('error', {
//           title: 'ত্রুটি',
//           message: 'খবর লোড করতে ব্যর্থ হয়েছে',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadNews();
//   }, [currentPage, searchTerm, selectedCategory, selectedSubCategory]);

//   const handleDelete = async (id: string) => {
//     showAlert('warning', {
//       title: 'নিশ্চিত করুন',
//       message: 'আপনি কি নিশ্চিতভাবে এই খবরটি মুছতে চান?',
//       confirmText: 'হ্যাঁ, মুছুন',
//       cancelText: 'না, বাতিল করুন',
//       onConfirm: async () => {
//         try {
//           await deleteNews(id);
//           setNews(news.filter(item => item.id !== id));
//           showAlert('success', {
//             title: 'সফল হয়েছে',
//             message: 'খবরটি সফলভাবে মুছে ফেলা হয়েছে',
//           });
//         } catch (error) {
//           console.error('Failed to delete news:', error);
//           showAlert('error', {
//             title: 'ত্রুটি হয়েছে',
//             message: 'খবরটি মুছতে সমস্যা হয়েছে',
//           });
//         }
//       },
//     });
//   };

//   const handleEdit = (id: string) => {
//     router.push(`/news/dashboard/updateNews/${id}`);
//   };

//   return (
//     <div className=" md:container mx-auto lg:p-4">
//       <h1 className="text-2xl font-bold mb-6">সমস্ত খবর</h1>

//       <AlertDialog />

//       {/* Filters */}
//       <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div>
//           <label className="block mb-2">খোঁজ করুন</label>
//           <input
//             type="text"
//             placeholder="শিরোনাম দ্বারা খোঁজ করুন..."
//             className="w-full p-2 border rounded"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>

//         <div>
//           <label className="block mb-2">বিভাগ</label>
//           <select
//             className="w-full p-2 border rounded"
//             value={selectedCategory}
//             onChange={(e) => {
//               setSelectedCategory(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="">সব বিভাগ</option>
//             {CATEGORIES.map(category => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2">উপ-বিভাগ</label>
//           <select
//             className="w-full p-2 border rounded"
//             value={selectedSubCategory}
//             onChange={(e) => {
//               setSelectedSubCategory(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="">সব উপ-বিভাগ</option>
//             {SUB_CATEGORIES.map(subCategory => (
//               <option key={subCategory} value={subCategory}>{subCategory}</option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-end">
//           <button
//             onClick={() => {
//               setSearchTerm('');
//               setSelectedCategory('');
//               setSelectedSubCategory('');
//               setCurrentPage(1);
//             }}
//             className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
//           >
//             ফিল্টার রিসেট করুন
//           </button>
//         </div>
//       </div>

//       {/* News Table */}
//       {loading ? (
//         <div className="text-center py-8">খবর লোড হচ্ছে...</div>
//       ) : news.length === 0 ? (
//         <div className="text-center py-8">কোন খবর পাওয়া যায়নি</div>
//       ) : (
//         <div className="bg-white rounded shadow overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শিরোনাম</th>
//                 <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">বিভাগ</th>
//                 <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">উপ-বিভাগ</th>
//                 <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">লেখক</th>
//                 <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
//                 <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">কর্ম</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {news.map((item) => (
//                 <tr key={item.id}>
//                   <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     <div className="truncate max-w-xs">{stripHtmlAndLimit(item.title,2).short}</div>
//                   </td>
//                   <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
//                     {item.category}
//                   </td>
//                   <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                     {item.subCategory}
//                   </td>
//                   <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
//                     {item.author.name}
//                   </td>
//                   <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(item.createdAt).toLocaleDateString('bn-BD')}
//                   </td>
//                   <td className="px-3 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                     <button
//                       onClick={() => handleEdit(item.id)}
//                       className="text-indigo-600 hover:text-indigo-900"
//                       title="সম্পাদনা"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="text-red-600 hover:text-red-900"
//                       title="মুছুন"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
//             <div className="flex-1 flex justify-between items-center sm:hidden">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
//               >
//                 পূর্ববর্তী
//               </button>
//               <span className="text-sm text-gray-700 mx-2">
//                 পৃষ্ঠা {currentPage} / {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
//               >
//                 পরবর্তী
//               </button>
//             </div>

//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   দেখানো হচ্ছে <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> থেকে{' '}
//                   <span className="font-medium">{Math.min(currentPage * itemsPerPage, (currentPage - 1) * itemsPerPage + news.length)}</span> এর{' '}
//                   <span className="font-medium">{(currentPage - 1) * itemsPerPage + news.length}</span> খবর
//                 </p>
//               </div>
//               <div>
//                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                   <button
//                     onClick={() => setCurrentPage(1)}
//                     disabled={currentPage === 1}
//                     className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
//                   >
//                     <span className="sr-only">প্রথম</span>
//                     &laquo;
//                   </button>
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
//                   >
//                     <span className="sr-only">পূর্ববর্তী</span>
//                     &lsaquo;
//                   </button>

//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = currentPage - 2 + i;
//                     }

//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === pageNum
//                             ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
//                             : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}

//                   <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
//                   >
//                     <span className="sr-only">পরবর্তী</span>
//                     &rsaquo;
//                   </button>
//                   <button
//                     onClick={() => setCurrentPage(totalPages)}
//                     disabled={currentPage === totalPages}
//                     className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
//                   >
//                     <span className="sr-only">শেষ</span>
//                     &raquo;
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllNews;













/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useAlert } from "@/hooks/useAlert";
import { deleteNews, fetchNews } from "@/lib/api/news.api";
import { CATEGORIES, NewsItem, SUB_CATEGORIES } from "@/types/news.types";
import { stripHtmlAndLimit } from "@/utils/stripAndLimitHtml";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AllNews = () => {
  const router = useRouter();
  const { showAlert, AlertDialog } = useAlert();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  const itemsPerPage = 10;

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNews({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
          category: selectedCategory,
          subCategory: selectedSubCategory,
        });
        setNews(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error('Failed to load news:', error);
        showAlert('error', {
          title: 'ত্রুটি',
          message: 'খবর লোড করতে ব্যর্থ হয়েছে',
        });
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [currentPage, searchTerm, selectedCategory, selectedSubCategory]);

  const handleDelete = async (id: string) => {
    showAlert('warning', {
      title: 'নিশ্চিত করুন',
      message: 'আপনি কি নিশ্চিতভাবে এই খবরটি মুছতে চান?',
      confirmText: 'হ্যাঁ, মুছুন',
      cancelText: 'না, বাতিল করুন',
      onConfirm: async () => {
        try {
          await deleteNews(id);
          setNews(news.filter(item => item.id !== id));
          showAlert('success', {
            title: 'সফল হয়েছে',
            message: 'খবরটি সফলভাবে মুছে ফেলা হয়েছে',
          });
        } catch (error) {
          console.error('Failed to delete news:', error);
          showAlert('error', {
            title: 'ত্রুটি হয়েছে',
            message: 'খবরটি মুছতে সমস্যা হয়েছে',
          });
        }
      },
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/news/dashboard/updateNews/${id}`);
  };

  // CSV DOWNLOAD (full NewsItem)
  const downloadCSV = () => {
    if (!news.length) return;

    const csvData = news.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      category: item.category,
      subCategory: item.subCategory,
      imageSource: item.imageSource,
      imageTitle: item.imageTitle,
      keywords: item.keywords.join(', '),
      subKeywords: item.subKeywords.join(', '),
      imageUrl: item.imageUrl || '',
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      authorId: item.authorId,
      name: item.author?.name || '',
      email: item.author?.email || '',
      image: item.author?.image || '',
      views: item.views
    }));

    const headers = Object.keys(csvData[0]).join(',') + '\n';
    const rows = csvData
      .map((item) =>
        Object.values(item)
          .map((val) => `"${String(val).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    saveAs(blob, `news_${new Date().toISOString().slice(0, 10)}.csv`);
  };


  // EXCEL DOWNLOAD (full NewsItem)
  const downloadExcel = () => {
    if (!news.length) return;

    const excelData = news.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      category: item.category,
      subCategory: item.subCategory,
      imageSource: item.imageSource,
      imageTitle: item.imageTitle,
      keywords: item.keywords.join(', '),
      subKeywords: item.subKeywords.join(', '),
      imageUrl: item.imageUrl || '',
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      authorId: item.authorId,
      name: item.author?.name || '',
      email: item.author?.email || '',
      image: item.author?.image || '',
      views: item.views || 0
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'News');

    XLSX.writeFile(workbook, `news_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };


  return (
    <div className="md:container mx-auto lg:p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">সমস্ত খবর</h1>
        <div className="flex space-x-2">
          <button
            onClick={downloadCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            CSV ডাউনলোড
          </button>
          <button
            onClick={downloadExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Excel ডাউনলোড
          </button>
        </div>
      </div>

      <AlertDialog />

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-2">খোঁজ করুন</label>
          <input
            type="text"
            placeholder="শিরোনাম দ্বারা খোঁজ করুন..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div>
          <label className="block mb-2">বিভাগ</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory('');
              setCurrentPage(1);
            }}
          >
            <option value="">সব বিভাগ</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">উপ-বিভাগ</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedSubCategory}
            onChange={(e) => {
              setSelectedSubCategory(e.target.value);
              setCurrentPage(1);
            }}
            disabled={!selectedCategory}
          >
            <option value="">সব উপ-বিভাগ</option>

            {/* {selectedCategory && SUB_CATEGORIES[selectedCategory]?.map(subCat => (
              <option key={subCat.key} value={subCat.key}>{subCat.value}</option>
            ))} */}
            { selectedCategory && SUB_CATEGORIES.map((subCat) => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}


          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setSelectedSubCategory('');
              setCurrentPage(1);
            }}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded w-full"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      </div>

      {/* News Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">খবর লোড হচ্ছে...</p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-8 bg-white rounded shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2 text-gray-600">কোন খবর পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শিরোনাম</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">বিভাগ</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">উপ-বিভাগ</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">লেখক</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">কর্ম</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{stripHtmlAndLimit(item.title, 2).short}</div>
                    <div className="text-xs text-gray-500 sm:hidden">
                      {item.category} • {item.subCategory}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {item.category}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {item.subCategory}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {item.author.name}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('bn-BD')}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                      title="সম্পাদনা"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="মুছুন"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between items-center sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
              >
                পূর্ববর্তী
              </button>
              <span className="text-sm text-gray-700 mx-2">
                পৃষ্ঠা {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
              >
                পরবর্তী
              </button>
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  দেখানো হচ্ছে <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> থেকে{' '}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, (currentPage - 1) * itemsPerPage + news.length)}</span> এর{' '}
                  <span className="font-medium">{(currentPage - 1) * itemsPerPage + news.length}</span> খবর
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">প্রথম</span>
                    &laquo;
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">পূর্ববর্তী</span>
                    &lsaquo;
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">পরবর্তী</span>
                    &rsaquo;
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">শেষ</span>
                    &raquo;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNews;