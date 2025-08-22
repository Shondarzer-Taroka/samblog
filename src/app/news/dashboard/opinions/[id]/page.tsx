/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';
import { FiArrowLeft, FiClock, FiCheck, FiX, FiUser, FiMail, FiCalendar } from 'react-icons/fi';
import clsx from 'clsx';
import Toast from '@/share/Toast';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json());

interface Opinion {
  _id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
}

export default function PageDetailsOfUserOpinion() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthProvider();
  const { showToast, hideToast, toast } = useToast();
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, error, mutate } = useSWR<{ data: Opinion }>(
    user?.role === 'admin' 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/opinion/getSingleOpinion/${id}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (data?.data?.rejectionReason) {
      setRejectionReason(data.data.rejectionReason);
    }
  }, [data]);

  const handleStatusChange = async (status: 'APPROVED' | 'REJECTED') => {
    if (status === 'REJECTED' && !rejectionReason.trim()) {
      showToast('error', 'Please provide a reason for rejection');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          status, 
          rejectionReason: status === 'REJECTED' ? rejectionReason : undefined 
        })
      });

      if (!response.ok) throw new Error('Failed to update status');

      mutate();
      showToast('success', `Opinion ${status.toLowerCase()} successfully`);
      
      // Redirect back to admin opinions page after a short delay
      setTimeout(() => {
        router.push('/news/dashboard/opinions');
      }, 1500);
    } catch (error) {
      showToast('error', 'Failed to update opinion status');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <div className="p-6 text-red-500">Failed to load opinion details</div>;
  if (!user || user.role !== 'admin') return <div className="p-6">Unauthorized</div>;

  const opinion = data?.data;

  console.log(opinion);
  
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <FiArrowLeft /> Back to Opinions
      </button>

      {!opinion ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header with status */}
            <div className={clsx(
              "px-6 py-4 border-b flex justify-between items-center",
              opinion.status === 'PENDING' && "bg-yellow-50 border-yellow-200",
              opinion.status === 'APPROVED' && "bg-green-50 border-green-200",
              opinion.status === 'REJECTED' && "bg-red-50 border-red-200"
            )}>
              <div className="flex items-center gap-2">
                <div className={clsx(
                  "w-3 h-3 rounded-full",
                  opinion.status === 'PENDING' && "bg-yellow-500",
                  opinion.status === 'APPROVED' && "bg-green-500",
                  opinion.status === 'REJECTED' && "bg-red-500"
                )} />
                <span className="font-medium capitalize">{opinion.status.toLowerCase()}</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <FiClock />
                {new Date(opinion.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Opinion content */}
            <div className="px-6 py-6">
              <h1 className="text-2xl font-bold mb-4">{opinion.title}</h1>
              <p className="text-gray-700 whitespace-pre-line">{opinion.description}</p>
            </div>

            {/* User info */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Submitted by</h2>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FiUser className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">{opinion.author.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FiMail className="text-xs" />
                    {opinion.author.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin actions */}
            {opinion.status === 'PENDING' && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <h2 className="text-sm font-medium text-gray-500 mb-3">Admin Actions</h2>
                
                <div className="mb-4">
                  <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-1">
                    Rejection Reason (required if rejecting)
                  </label>
                  <textarea
                    id="rejectionReason"
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Provide a clear reason for rejection..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusChange('APPROVED')}
                    disabled={isSubmitting}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 rounded-md",
                      "bg-green-600 text-white hover:bg-green-700",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <FiCheck />
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange('REJECTED')}
                    disabled={isSubmitting || !rejectionReason.trim()}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 rounded-md",
                      "bg-red-600 text-white hover:bg-red-700",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <FiX />
                    Reject
                  </button>
                </div>
              </div>
            )}

            {/* Rejection reason display if already rejected */}
            {opinion.status === 'REJECTED' && opinion.rejectionReason && (
              <div className="px-6 py-4 bg-red-50 border-t">
                <h2 className="text-sm font-medium text-red-700 mb-1">Rejection Reason</h2>
                <p className="text-red-600">{opinion.rejectionReason}</p>
              </div>
            )}

            {/* Timeline */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <h2 className="text-sm font-medium text-gray-500 mb-3">Timeline</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FiCalendar className="text-gray-400" />
                  <span>Created: {new Date(opinion.createdAt).toLocaleString()}</span>
                </div>
                {opinion.updatedAt !== opinion.createdAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <FiClock className="text-gray-400" />
                    <span>Last updated: {new Date(opinion.updatedAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {toast && (
            <Toast type={toast.type} message={toast.message} onClose={hideToast} />
          )}
        </>
      )}
    </div>



    // <div></div>
  );
}