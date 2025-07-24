/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';

import { FiRefreshCw } from 'react-icons/fi';
import clsx from 'clsx';
import { useSocket } from '@/context/SocketContext';
import OpinionsTable from '@/components/NotificationBell/OpinionsTable';
import Toast from '@/share/Toast';

const fetcher = (url: string) => fetch(url,{credentials:'include'}).then(res => res.json());

export default function AdminOpinionsPage() {
  const { user } = useAuthProvider();
  const { showToast,hideToast,toast } = useToast();
  const { socket } = useSocket();
  const [statusFilter, setStatusFilter] = useState<string>('PENDING');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, mutate } = useSWR(
    user?.role === 'admin' 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/opinion?status=${statusFilter}&page=${page}&limit=${limit}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (!socket || !user || user.role !== 'admin') return;

    const handleNewOpinion = () => {
      mutate();
      showToast('error', 'New opinion submitted');
    };

    socket.on('new_opinion', handleNewOpinion);

    return () => {
      socket.off('new_opinion', handleNewOpinion);
    };
  }, [socket, user, mutate, showToast]);

  const handleStatusChange = async (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ status, rejectionReason: reason })
      });

      if (!response.ok) throw new Error('Failed to update status');

      mutate();
      showToast('success', 'Opinion status updated successfully');
    } catch (error) {
      showToast('error', 'Failed to update opinion status');
    }
  };

  if (error) return <div className="p-6 text-red-500">Failed to load opinions</div>;
  if (!user || user.role !== 'admin') return <div className="p-6">Unauthorized</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Opinions</h1>
        <button
          onClick={() => mutate()}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-md",
            "bg-indigo-600 text-white hover:bg-indigo-700",
            data ? 'opacity-100' : 'opacity-70'
          )}
          disabled={!data}
        >
          <FiRefreshCw className={clsx(!data && "animate-spin")} />
          Refresh
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        {['PENDING', 'APPROVED', 'REJECTED'].map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setStatusFilter(filter);
              setPage(1);
            }}
            className={clsx(
              "px-4 py-2 rounded-md text-sm",
              statusFilter === filter 
                ? "bg-indigo-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {!data ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <OpinionsTable 
            opinions={data?.data || []} 
            onStatusChange={handleStatusChange} 
          />

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {data?.meta?.totalPages || 1}</span>
            <button
              onClick={() => setPage(p => Math.min(data?.meta?.totalPages || 1, p + 1))}
              disabled={page >= (data?.meta?.totalPages || 1)}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>

            {toast && (
      <Toast type={toast.type} message={toast.message} onClose={hideToast} />
    )}
        </>
      )}
    </div>
  );
}