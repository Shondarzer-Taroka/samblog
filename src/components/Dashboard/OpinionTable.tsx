/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useAlert } from '@/hooks/useAlert';

interface Opinion {
  id: string;
  name: string;
  email: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const OpinionTable = ({ userEmail }: { userEmail: string }) => {
  const { showAlert, AlertDialog } = useAlert();
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchOpinions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/opinion/getOpinionByEmail/${userEmail}?page=${page}&limit=${limit}`
      );
      setOpinions(res.data.opinions);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Error fetching opinions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) fetchOpinions();
  }, [userEmail, page]);

  // const handleDelete = async (id: string) => {
  //   if (confirm('Are you sure you want to delete this opinion?')) {
  //     try {
  //       await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/delete/${id}`, {
  //         withCredentials: true
  //       });
  //       fetchOpinions();
  //     } catch (error) {
  //       console.error('Error deleting opinion:', error);
  //     }
  //   }
  // };

  const handleDelete = async (id: string) => {
    showAlert('warning', {
      title: 'নিশ্চিত করুন',
      message: 'আপনি কি নিশ্চিতভাবে এই খবরটি মুছতে চান?',
      confirmText: 'হ্যাঁ, মুছুন',
      cancelText: 'না, বাতিল করুন',
      onConfirm: async () => {
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/delete/${id}`, {
            withCredentials: true
          });
          // setNews(news.filter(item => item.id !== id));

          fetchOpinions()
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

  const totalPages = Math.ceil(total / limit);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Opinions</h2>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {opinions.map((opinion) => (
              <tr key={opinion.id} className="hover:bg-gray-50">
                <td className="p-2 border">{opinion.name}</td>
                <td className="p-2 border">{opinion.email}</td>
                <td className="p-2 border">{opinion.title}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${opinion.status === 'APPROVED'
                      ? 'bg-green-100 text-green-700'
                      : opinion.status === 'REJECTED'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {opinion.status}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  <Link href={`/news/dashboard/myOpinions/update/${opinion.id}`}>
                    <button

                      className="text-blue-600 hover:underline"
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(opinion.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {opinions.length === 0 && (
          <div className="text-center p-4 text-gray-500">No opinions found.</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className=''>

      <div className="flex justify-center flex-wrap mt-4 space-x-2 ">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-gray-200 font-bold' : ''
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </div>
      
      <AlertDialog />

    </div>
  );
};

export default OpinionTable;
