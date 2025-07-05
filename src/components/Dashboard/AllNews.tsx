/* eslint-disable react-hooks/exhaustive-deps */




'use client';

import { useAlert } from "@/hooks/useAlert";
import { deleteNews, fetchNews } from "@/lib/api/news.api";
import { CATEGORIES, NewsItem, SUB_CATEGORIES } from "@/types/news.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";





const AllNews = () => {
  const router = useRouter();
  const { showAlert, AlertDialog } = useAlert();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

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
          title: 'Error',
          message: 'Failed to load news',
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
      message: 'আপনি কি নিশ্চিতভাবে এই আইটেমটি মুছতে চান?',
      confirmText: 'হ্যাঁ, মুছুন',
      cancelText: 'না, বাতিল করুন',
      onConfirm: async () => {
        try {
          await deleteNews(id);
          setNews(news.filter(item => item.id !== id));
          showAlert('success', {
            title: 'সফল হয়েছে',
            message: 'নিউজটি সফলভাবে মুছে ফেলা হয়েছে',
          });
        } catch (error) {
          console.error('Failed to delete news:', error);
          showAlert('error', {
            title: 'ত্রুটি হয়েছে',
            message: 'নিউজটি মুছতে সমস্যা হয়েছে',
          });
        }
      },
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/news/dashboard/updateNews/${id}`);
  };

  return (
    <div className="container mx-auto lg:p-4">
      <h1 className="text-2xl font-bold mb-6">All News</h1>
      
      <AlertDialog />
      
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <div>
          <label className="block mb-2">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-2">Sub-Category</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedSubCategory}
            onChange={(e) => {
              setSelectedSubCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Sub-Categories</option>
            {SUB_CATEGORIES.map(subCategory => (
              <option key={subCategory} value={subCategory}>{subCategory}</option>
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
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* News Table */}
      {loading ? (
        <div className="text-center py-8">Loading news...</div>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub-Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.subCategory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.author.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between sm:flex-col-reverse">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, news.length)}</span> of{' '}
                  <span className="font-medium">{totalPages * itemsPerPage}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    &gt;
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