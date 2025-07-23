/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/opinions/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';
import { FiCheck, FiX } from 'react-icons/fi';

export default function AdminOpinionsPage() {
  const { user } = useAuthProvider();
  const { toast, showToast, hideToast } = useToast();
  const [opinions, setOpinions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;

    const fetchPendingOpinions = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opinions/pending`);
        const data = await res.json();
        if (res.ok) {
          setOpinions(data);
        } else {
          showToast('error', 'Failed to fetch pending opinions');
        }
      } catch (error) {
        showToast('error', 'Error fetching pending opinions');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingOpinions();
  }, [user]);

  const handleStatusChange = async (opinionId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opinions/${opinionId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setOpinions(prev => prev.filter(opinion => opinion.id !== opinionId));
        showToast('success', `Opinion ${status.toLowerCase()} successfully`);
      } else {
        showToast('error', 'Failed to update opinion status');
      }
    } catch (error) {
      showToast('error', 'Error updating opinion status');
      console.error('Error:', error);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don&#39;t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pending Opinions</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : opinions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No pending opinions to review</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {opinions.map((opinion) => (
                  <tr key={opinion.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{opinion.title}</div>
                      <div className="text-sm text-gray-500">{opinion.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{opinion.author.name}</div>
                      <div className="text-sm text-gray-500">{opinion.author.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(opinion.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(opinion.id, 'APPROVED')}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                          title="Approve"
                        >
                          <FiCheck className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(opinion.id, 'REJECTED')}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Reject"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </div>
  );
}